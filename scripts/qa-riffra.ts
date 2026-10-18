import { chromium, type Page } from 'playwright'
import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const root = 'C:\\Users\\Developer\\Desktop\\projects\\riffra-voice-saas'
const base = 'http://127.0.0.1:4390'
const routes = ['/', '/product/', '/workflows/', '/teams/', '/security/', '/pricing/', '/journal/', '/journal/voice-is-a-draft/']

type RouteResult = {
  route: string
  status: number | null
  title: string
  h1: string
  sections: number
  widthOverflow: number
  errors: string[]
}

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' })
const results: RouteResult[] = []
const allErrors: string[] = []

for (const route of routes) {
  const page = await context.newPage()
  const errors: string[] = []
  page.on('console', (message) => { if (message.type() === 'error') errors.push(`console: ${message.text()}`) })
  page.on('pageerror', (error) => errors.push(`page: ${error.message}`))
  const response = await page.goto(base + route, { waitUntil: 'networkidle' })
  const title = await page.title()
  const h1 = await page.locator('h1').first().innerText()
  const sections = await page.locator('main section, main article section').count()
  const dimensions = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }))
  const safeName = route === '/' ? 'home' : route.replaceAll('/', '-') .replace(/^-|-$/g, '')
  await page.screenshot({ path: join(root, 'screenshots', `${safeName}-desktop.png`), fullPage: true })
  results.push({ route, status: response?.status() ?? null, title, h1, sections, widthOverflow: dimensions.scroll - dimensions.client, errors })
  if (response?.status() !== 200) allErrors.push(`${route}: HTTP ${response?.status()}`)
  if (!title || !h1) allErrors.push(`${route}: missing title or H1`)
  if (dimensions.scroll > dimensions.client) allErrors.push(`${route}: ${dimensions.scroll - dimensions.client}px horizontal overflow`)
  if (errors.length) allErrors.push(`${route}: ${errors.join(' | ')}`)
  await page.close()
}

const titles = results.map((result) => result.title)
if (new Set(titles).size !== titles.length) allErrors.push('Route titles are not unique')

const testPage = await context.newPage()
await testPage.goto(base + '/', { waitUntil: 'networkidle' })
const ctaInDesktopViewport = await testPage.locator('.hero-actions .button').evaluate((element) => element.getBoundingClientRect().bottom <= window.innerHeight)
if (!ctaInDesktopViewport) allErrors.push('Home primary action is below the desktop first viewport')

await testPage.locator('[data-voice-demo] [data-record]').dispatchEvent('pointerdown')
const recordingStatus = await testPage.locator('[data-demo-status]').innerText()
await testPage.locator('[data-voice-demo] [data-record]').dispatchEvent('pointerup')
const reviewStatus = await testPage.locator('[data-demo-status]').innerText()
await testPage.locator('[data-voice-demo] [data-approve]').click()
const approved = await testPage.locator('[data-voice-demo]').evaluate((element) => element.classList.contains('is-approved'))
if (!recordingStatus.toLowerCase().includes('listening') || !reviewStatus.toLowerCase().includes('review') || !approved) allErrors.push('Review Strip state sequence failed')

await testPage.locator('[data-context="product"]').click()
if (!await testPage.locator('[data-context-panel="product"]').evaluate((element) => element.classList.contains('is-active'))) allErrors.push('Context Set tabs failed')
await testPage.locator('[data-transform]').click()
if (!await testPage.locator('[data-selection-demo]').evaluate((element) => element.classList.contains('is-transformed'))) allErrors.push('Selected-text transformation failed')

await testPage.goto(base + '/workflows/', { waitUntil: 'networkidle' })
await testPage.locator('[data-filter="client"]').click()
const visibleWorkflows = await testPage.locator('[data-filter-list] article:not(.is-hidden)').count()
if (visibleWorkflows !== 2) allErrors.push(`Workflow filter expected 2 results, received ${visibleWorkflows}`)

await testPage.goto(base + '/pricing/', { waitUntil: 'networkidle' })
const annualPrice = await testPage.locator('[data-price][data-annual="12"]').innerText()
await testPage.locator('[data-billing="monthly"]').click()
const monthlyPrice = await testPage.locator('[data-price][data-annual="12"]').innerText()
await testPage.locator('[data-plan="Personal"]').click()
const planStatus = await testPage.locator('[data-pricing-status]').innerText()
if (annualPrice === monthlyPrice || !planStatus.includes('Personal selected')) allErrors.push('Pricing interaction failed')

await testPage.goto(base + '/journal/', { waitUntil: 'networkidle' })
await testPage.locator('[data-filter="practice"]').click()
const visibleNotes = await testPage.locator('[data-filter-list] [data-kind]:not(.is-hidden)').count()
if (visibleNotes !== 2) allErrors.push(`Journal filter expected 2 results, received ${visibleNotes}`)

await testPage.locator('#journal-email').fill('reader@example.com')
await testPage.locator('[data-demo-form]').last().locator('button[type="submit"]').click()
const journalFormStatus = await testPage.locator('[data-demo-form] .form-status').last().innerText()
if (!journalFormStatus.includes('Received')) allErrors.push('Journal form completion state failed')

await testPage.goto(base + '/teams/', { waitUntil: 'networkidle' })
await testPage.locator('#team-email').fill('team@example.com')
await testPage.locator('#team-note').fill('Client updates and product decisions')
await testPage.locator('[data-demo-form] button[type="submit"]').click()
const teamFormStatus = await testPage.locator('[data-demo-form] .form-status').innerText()
if (!teamFormStatus.includes('Received')) allErrors.push('Team form completion state failed')

await testPage.setViewportSize({ width: 390, height: 844 })
await testPage.goto(base + '/', { waitUntil: 'networkidle' })
const ctaInMobileViewport = await testPage.locator('.hero-actions .button').evaluate((element) => element.getBoundingClientRect().bottom <= window.innerHeight)
const mobileDimensions = await testPage.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }))
await testPage.locator('.nav-toggle').click()
const navExpanded = await testPage.locator('.nav-toggle').getAttribute('aria-expanded')
await testPage.locator('.nav-toggle').click()
await testPage.screenshot({ path: join(root, 'screenshots', 'home-mobile.png'), fullPage: true })
if (!ctaInMobileViewport) allErrors.push('Home primary action is below the mobile first viewport')
if (mobileDimensions.scroll > mobileDimensions.client) allErrors.push(`Mobile home has ${mobileDimensions.scroll - mobileDimensions.client}px horizontal overflow`)
if (navExpanded !== 'true') allErrors.push('Mobile navigation did not open')

const mobileRoutes: Array<{ route: string, overflow: number }> = []
for (const route of routes) {
  await testPage.goto(base + route, { waitUntil: 'networkidle' })
  const dimensions = await testPage.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }))
  const overflow = dimensions.scroll - dimensions.client
  mobileRoutes.push({ route, overflow })
  if (overflow > 0) allErrors.push(`${route}: ${overflow}px mobile horizontal overflow`)
}

const internalLinks = await testPage.locator('a[href^="/"]').evaluateAll((links) => [...new Set(links.map((link) => (link as HTMLAnchorElement).pathname))])
for (const path of internalLinks) {
  const response = await context.request.get(base + path)
  if (!response.ok()) allErrors.push(`Internal link ${path}: HTTP ${response.status()}`)
}

const placeholders = await testPage.locator('a[href="#"], img[src*="placeholder"], [style*="linear-gradient"]').count()
if (placeholders) allErrors.push(`Found ${placeholders} placeholder or prohibited gradient references on home`)

await testPage.close()
await context.close()
await browser.close()

const report = {
  generatedAt: new Date().toISOString(),
  passed: allErrors.length === 0,
  routes: results,
  interactions: {
    reviewStrip: { recordingStatus, reviewStatus, approved },
    workflowFilterVisible: visibleWorkflows,
    journalFilterVisible: visibleNotes,
    forms: { journalFormStatus, teamFormStatus },
    pricing: { annualPrice, monthlyPrice, planStatus },
    mobile: { ctaInFirstViewport: ctaInMobileViewport, navExpanded, overflow: mobileDimensions.scroll - mobileDimensions.client, routes: mobileRoutes },
  },
  errors: allErrors,
}

await writeFile(join(root, 'qa-results.json'), JSON.stringify(report, null, 2), 'utf8')
console.log(JSON.stringify(report, null, 2))
if (allErrors.length) process.exitCode = 1
