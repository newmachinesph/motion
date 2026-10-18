import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'

const output = 'C:\\Users\\Developer\\Desktop\\projects\\riffra-voice-saas\\design\\references'
await mkdir(output, { recursive: true })

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 })
const captures = [
  { name: 'glaido-home', url: 'https://glaido.com/' },
  { name: '21st-landing-collection', url: 'https://21st.dev/community/components/s/landing-page' },
]

const results: Array<{ name: string, url: string, title: string, screenshot: string }> = []
for (const capture of captures) {
  await page.goto(capture.url, { waitUntil: 'domcontentloaded', timeout: 60_000 })
  await page.waitForTimeout(2500)
  const screenshot = `${output}\\${capture.name}.png`
  await page.screenshot({ path: screenshot, fullPage: false })
  results.push({ ...capture, title: await page.title(), screenshot })
}

await browser.close()
await writeFile(`${output}\\AUDIT.md`, `# Component-reference audit

These captures are forensic references only; no source component or proprietary asset was copied into Riffra.

## Glaido

- Borrowed: immediate category promise, an in-context product example, visible app/privacy/pricing paths.
- Avoided: the black-and-lime brand system, the same split hero, speed counters, app-logo abundance and exact interface language.
- Adapted: speed became visible review-before-paste; the product proof uses one recurring client sentence.

## 21st.dev SaaS component reference

- Borrowed: a legible first-frame hierarchy and a product artifact close to the claim.
- Avoided: dark-gradient hero, glowing dashboard preview, announcement pill and generic two-column SaaS shell.
- Adapted: the hero artifact became the Review Strip; bento cards became role-specific manuscript panels with square rules and real copy.

## Production consequence

Riffra components were coded from the approved Speech Atelier grammar: editorial typography, ruled manuscript sections, named context states and direct interaction feedback. The screenshots remain outside the shipped asset tree.
`, 'utf8')

console.log(JSON.stringify(results, null, 2))
