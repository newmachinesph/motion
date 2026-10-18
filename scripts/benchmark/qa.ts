import { mkdir, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright'
import { benchmarkFixtures } from './fixtures'

const baseUrl = 'http://127.0.0.1:4190'
const output = 'C:\\Users\\Developer\\Desktop\\projects\\prompt-studio-benchmark\\screenshots'
await mkdir(output, { recursive: true })

const browser = await chromium.launch({ headless: true })
const results: Array<Record<string, any>> = []

for (const fixture of benchmarkFixtures) {
  for (const viewport of [{ name: 'desktop', width: 1440, height: 900 }, { name: 'mobile', width: 390, height: 844 }]) {
    const page = await browser.newPage({ viewport })
    const errors: string[] = []
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()) })
    page.on('pageerror', (error) => errors.push(error.message))
    const response = await page.goto(`${baseUrl}/${fixture.slug}/`, { waitUntil: 'networkidle' })
    await page.keyboard.press('Tab')
    const focusReachedControl = await page.evaluate(`document.activeElement !== document.body && Boolean(document.activeElement)`)
    await page.screenshot({ path: `${output}\\${fixture.sequence}-${fixture.slug}-${viewport.name}.png`, fullPage: false })
    const metrics = await page.evaluate(`(() => {
      const isVisible = (selector) => {
        const element = document.querySelector(selector);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < innerHeight && style.visibility !== 'hidden' && style.display !== 'none' && Number(style.opacity) > 0;
      };
      const bounds = (selector) => {
        const element = document.querySelector(selector);
        if (!element) return null;
        const rect = element.getBoundingClientRect();
        return { top: Math.round(rect.top), bottom: Math.round(rect.bottom), left: Math.round(rect.left), right: Math.round(rect.right) };
      };
      return {
        title: document.title,
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        identityVisible: isVisible('.brand') || isVisible('.ops-brand'),
        headingVisible: isVisible('h1'),
        ledeVisible: isVisible('.lede') || isVisible('.ops-purpose'),
        ctaVisible: isVisible('.cta'),
        identityBounds: isVisible('.brand') ? bounds('.brand') : bounds('.ops-brand'),
        headingBounds: bounds('h1'),
        ledeBounds: bounds('.lede') || bounds('.ops-purpose'),
        ctaBounds: bounds('.cta'),
        missingImages: [...document.images].filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.getAttribute('src')),
        missingTargets: [...document.querySelectorAll('a[href^="#"]')].map((link) => link.getAttribute('href')).filter((href) => href && !document.querySelector(href)),
      };
    })()`)
    let interactionPassed = true
    const copyButton = page.locator('[data-copy-code]')
    if (await copyButton.count()) {
      await copyButton.click()
      interactionPassed = (await copyButton.innerText()) === 'Copied'
    }
    const revealButton = page.locator('[data-reveal]')
    if (await revealButton.count()) {
      await revealButton.click()
      interactionPassed = interactionPassed && await revealButton.getAttribute('aria-expanded') === 'true' && await page.locator('#trace-source').isVisible()
    }
    const opsButtons = page.locator('.ops-rail button')
    if (await opsButtons.count()) {
      await opsButtons.nth(1).click()
      interactionPassed = interactionPassed && await opsButtons.nth(1).getAttribute('aria-pressed') === 'true'
    }
    results.push({ slug: fixture.slug, viewport, status: response?.status(), errors, interactionPassed, focusReachedControl, ...metrics })
    await page.close()
  }
}

const gallery = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await gallery.goto(`${baseUrl}/`, { waitUntil: 'networkidle' })
await gallery.screenshot({ path: `${output}\\gallery-desktop.png`, fullPage: false })
await gallery.close()

const brandAudit = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await brandAudit.goto(`${baseUrl}/brand-audit.html`, { waitUntil: 'networkidle' })
await brandAudit.screenshot({ path: `${output}\\brand-audit.png`, fullPage: true })
await brandAudit.close()

await browser.close()
await writeFile(`${output}\\qa-results.json`, `${JSON.stringify(results, null, 2)}\n`, 'utf8')
const failures = results.filter((result) =>
  result.status !== 200 || result.errors.length || result.hasOverflow || result.missingImages.length || result.missingTargets.length ||
  !result.identityVisible || !result.headingVisible || !result.ledeVisible || !result.ctaVisible || !result.interactionPassed || !result.focusReachedControl ||
  !result.ctaBounds || result.ctaBounds.bottom > result.viewport.height - 12 || result.ctaBounds.left < 0 || result.ctaBounds.right > result.viewport.width
)
if (failures.length) throw new Error(`Benchmark QA failed for: ${failures.map((failure) => `${failure.slug}/${failure.viewport.name}`).join(', ')}`)
console.log(`Passed ${results.length}/${results.length} responsive renders: identity, purpose, full CTA, overflow, media, anchor targets, focus and implemented controls.`)
