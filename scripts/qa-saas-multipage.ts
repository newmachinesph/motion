import { spawn } from 'node:child_process'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { chromium, type Page } from 'playwright'

const root = 'C:\\Users\\Developer\\Desktop\\projects\\rivetline-saas'
const base = 'http://127.0.0.1:4290'
const routes = JSON.parse(await readFile(`${root}\\routes.json`, 'utf8')) as Array<{ path: string; title: string }>
const screenshots = `${root}\\screenshots`
await mkdir(screenshots, { recursive: true })

let server: ReturnType<typeof spawn> | null = null
try {
  await fetch(base, { signal: AbortSignal.timeout(1200) })
} catch {
  server = spawn('python', ['-m', 'http.server', '4290', '--bind', '127.0.0.1'], { cwd: root, stdio: 'ignore', windowsHide: true })
  for (let attempt = 0; attempt < 20; attempt += 1) {
    await new Promise((resolve) => setTimeout(resolve, 250))
    try { if ((await fetch(base)).ok) break } catch { /* server is starting */ }
  }
}

const browser = await chromium.launch({ headless: true })
const failures: string[] = []
const results: Array<Record<string, unknown>> = []

const inspect = async (page: Page, route: string, width: number, height: number) => {
  const response = await page.goto(`${base}${route}`, { waitUntil: 'networkidle' })
  const label = `${route} @ ${width}`
  if (response?.status() !== 200) failures.push(`${label}: HTTP ${response?.status()}`)
  const facts = await page.evaluate(() => ({
    title: document.title,
    h1: document.querySelectorAll('h1').length,
    sections: document.querySelectorAll('main > section').length,
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    logoLoaded: Boolean((document.querySelector('.brand img') as HTMLImageElement | null)?.complete && (document.querySelector('.brand img') as HTMLImageElement | null)?.naturalWidth),
    emptyHref: Array.from(document.querySelectorAll('a')).some((link) => !link.getAttribute('href') || link.getAttribute('href') === '#'),
  }))
  if (facts.h1 !== 1) failures.push(`${label}: expected one h1, found ${facts.h1}`)
  if (facts.sections < 6) failures.push(`${label}: shallow route with only ${facts.sections - 1} body sections`)
  if (facts.overflow > 1) failures.push(`${label}: horizontal overflow ${facts.overflow}px`)
  if (!facts.logoLoaded) failures.push(`${label}: Codex Image logo did not load`)
  if (facts.emptyHref) failures.push(`${label}: empty or placeholder href`)
  if (width === 390) {
    const cta = await page.locator('.hero-actions .button').boundingBox()
    if (!cta || cta.y + cta.height > height - 12) failures.push(`${label}: complete primary action is outside the first viewport`)
  }
  await page.evaluate(async () => {
    const step = Math.max(360, Math.floor(innerHeight * 0.72))
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      scrollTo(0, y)
      await new Promise((resolve) => setTimeout(resolve, 28))
    }
    scrollTo(0, 0)
    document.querySelectorAll('.reveal').forEach((node) => node.classList.add('is-visible'))
  })
  await page.waitForTimeout(760)
  const filename = `${route === '/' ? 'home' : route.replaceAll('/', '')}-${width}.png`
  await page.screenshot({ path: `${screenshots}\\${filename}`, fullPage: true })
  results.push({ route, width, ...facts })
}

const context = await browser.newContext()
const consoleErrors: string[] = []
for (const route of routes) {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    const page = await context.newPage()
    await page.setViewportSize(viewport)
    page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(`${route.path}: ${message.text()}`) })
    page.on('pageerror', (error) => consoleErrors.push(`${route.path}: ${error.message}`))
    await inspect(page, route.path, viewport.width, viewport.height)
    await page.close()
  }
}

const auditPage = await context.newPage()
await auditPage.goto(base, { waitUntil: 'networkidle' })
const internalLinks = await auditPage.locator('a').evaluateAll((links) => Array.from(new Set(links.map((link) => (link as HTMLAnchorElement).href).filter((href) => href.startsWith(location.origin)))))
for (const link of internalLinks) {
  const url = new URL(link)
  const target = await context.newPage()
  const response = await target.goto(`${url.origin}${url.pathname}`, { waitUntil: 'domcontentloaded' })
  if (response?.status() !== 200) failures.push(`Broken internal link: ${link}`)
  if (url.hash && await target.locator(url.hash).count() === 0) failures.push(`Missing anchor target: ${link}`)
  await target.close()
}

const pricing = await context.newPage()
await pricing.goto(`${base}/pricing/`, { waitUntil: 'networkidle' })
await pricing.locator('#program-slider').fill('20')
if (await pricing.locator('#recommended-plan').innerText() !== 'Portfolio') failures.push('Pricing estimator did not update')
await pricing.getByRole('button', { name: 'Monthly' }).click()
if (await pricing.locator('[data-annual]').first().innerText() !== '$1,100') failures.push('Billing toggle did not update')
await pricing.close()

const resources = await context.newPage()
await resources.goto(`${base}/resources/`, { waitUntil: 'networkidle' })
await resources.getByRole('button', { name: 'Templates' }).click()
if (await resources.locator('[data-kind]:not(.is-hidden)').count() !== 2) failures.push('Resource filter did not produce two templates')
await resources.locator('#resource-email').fill('reviewer@example.com')
await resources.getByRole('button', { name: 'Subscribe' }).click()
if (!(await resources.locator('.form-status').innerText()).includes('Subscribed')) failures.push('Newsletter success state did not render')
await resources.close()

const titles = results.filter((result) => result.width === 1440).map((result) => result.title)
if (new Set(titles).size !== routes.length) failures.push('Page titles are not unique')
if (consoleErrors.length) failures.push(...consoleErrors.map((error) => `Console: ${error}`))

await writeFile(`${root}\\qa-results.json`, JSON.stringify({ passed: failures.length === 0, routes: routes.length, renders: results.length, failures, results }, null, 2), 'utf8')
await browser.close()
if (server) server.kill()

if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}
console.log(`Passed ${results.length}/${results.length} responsive route renders across ${routes.length} real pages.`)
console.log('Passed internal-link crawl, unique metadata, Codex Image logo, first-viewport CTA, controls and form states.')
