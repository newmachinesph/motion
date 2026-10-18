import { mkdir } from 'node:fs/promises'
import { chromium } from 'playwright'

const screenshots = 'C:\\Users\\Developer\\Desktop\\projects\\prompt-studio-benchmark\\screenshots'
await mkdir(screenshots, { recursive: true })
const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.addInitScript(() => localStorage.clear())
await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' })

const advance = async (label: RegExp) => {
  await page.getByRole('button', { name: label }).click()
  // The stage body exits before the next one enters. Waiting for that short
  // transition keeps automation from clicking the outgoing stage again.
  await page.waitForTimeout(550)
}

await advance(/Continue to Audience/)
await advance(/Continue to Brand/)
if (await page.getByRole('button', { name: /Studio decides/ }).count() !== 1) throw new Error('Logo controls did not render')
await page.getByRole('button', { name: /Responsive set/ }).click()
await page.getByLabel('Logo concept seed').fill('Express one source becoming a defensible decision through a visible trace; avoid sparkles, chat bubbles, brains and generic nodes.')
await page.screenshot({ path: `${screenshots}\\prompt-studio-logo-stage.png`, fullPage: false })

await advance(/Continue to Content/)
await advance(/Continue to Experience/)
await advance(/Continue to Studio/)
if (await page.getByText('11 accountable roles', { exact: true }).count() !== 1) throw new Error('Studio roles did not render')
if (await page.getByText(/No screen goes straight from idea to code/).count() !== 1) throw new Error('Design-gate sequence did not render')
await page.screenshot({ path: `${screenshots}\\prompt-studio-process-stage.png`, fullPage: false })
await advance(/Continue to Direction/)
await page.screenshot({ path: `${screenshots}\\prompt-studio-direction-stage.png`, fullPage: false })
await advance(/Continue to Handoff/)

const pageText = await page.locator('body').innerText()
const normalizedPageText = pageText.toLowerCase()
for (const signal of ['14/14 gates', 'studio operating model', 'similarity veto', 'no implementation begins before', '/design/decisions.md', 'logo and identity pipeline', 'media block may not consume more than 42vh', 'identity swap test', 'do not trace it']) {
  if (!normalizedPageText.includes(signal)) throw new Error(`Prompt Studio UI lost: ${signal}`)
}
const fit = await page.evaluate(`({scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth})`)
if (fit.scrollWidth > fit.clientWidth) throw new Error('Prompt Studio has horizontal overflow at 1440px')
await page.screenshot({ path: `${screenshots}\\prompt-studio-handoff.png`, fullPage: false })

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } })
await mobile.addInitScript(() => localStorage.clear())
await mobile.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' })
const mobileFit = await mobile.evaluate(`({scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth})`)
if (mobileFit.scrollWidth > mobileFit.clientWidth) throw new Error('Prompt Studio has horizontal overflow at 390px')
await mobile.screenshot({ path: `${screenshots}\\prompt-studio-mobile.png`, fullPage: false })

await browser.close()
console.log('Prompt Studio UI passed studio roles, 14/14 gates, compiled design process and desktop/mobile fit.')
