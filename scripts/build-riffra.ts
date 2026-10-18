import { copyFile, mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { pages, renderPage } from './riffra/site'
import { siteScript, styles } from './riffra/styles'

const outputRoot = 'C:\\Users\\Developer\\Desktop\\projects\\riffra-voice-saas'
const imageRoot = 'C:\\Users\\Developer\\.codex\\generated_images\\01a0044d-d050-7a13-8f26-11380f821cd0'
const fontRoot = 'C:\\Users\\Developer\\Desktop\\motion\\.claude\\skills\\ui-styling\\canvas-fonts'

const assetDirs = [
  join(outputRoot, 'assets'),
  join(outputRoot, 'assets', 'brand'),
  join(outputRoot, 'assets', 'fonts'),
  join(outputRoot, 'screenshots'),
]
await Promise.all(assetDirs.map((directory) => mkdir(directory, { recursive: true })))

const brandAssets = [
  ['exec-1182ff01-0bd9-4cae-b1ed-83f0d63fdc0e.png', 'logo-primary.png'],
  ['exec-7f948b25-13a9-4a5a-b79b-846147ce2b1d.png', 'logo-mark.png'],
] as const

const fonts = [
  'Boldonse-Regular.ttf',
  'WorkSans-Regular.ttf',
  'WorkSans-Bold.ttf',
  'RedHatMono-Regular.ttf',
  'RedHatMono-Bold.ttf',
] as const

await Promise.all([
  ...brandAssets.map(([source, destination]) => copyFile(join(imageRoot, source), join(outputRoot, 'assets', 'brand', destination))),
  ...fonts.map((font) => copyFile(join(fontRoot, font), join(outputRoot, 'assets', 'fonts', font))),
])

await Promise.all([
  writeFile(join(outputRoot, 'assets', 'site.css'), styles, 'utf8'),
  writeFile(join(outputRoot, 'assets', 'site.js'), siteScript, 'utf8'),
  writeFile(join(outputRoot, 'assets', 'brand', 'PROMPT.md'), `# Riffra identity generation prompts

Both assets were created with the built-in Codex ImageGen tool as original raster PNG files. They are used directly and were never traced or rebuilt as vectors.

## Primary horizontal combination logo

Use case: logo-brand  
Asset type: primary horizontal combination logo on a genuinely transparent background  
Primary request: original logo for “Riffra,” a desktop voice-composition tool; two rough speech fragments align into one continuous written phrase, producing a compact rhythmic symbol and a distinctive lowercase wordmark  
Style/medium: flat editorial identity, strong silhouette, precise but human, slightly wide custom lettering  
Composition/framing: symbol on the left, exact text “riffra” on the right, generous transparent padding  
Color palette: deep ink #16322C only; one color  
Text (verbatim): “riffra”  
Constraints: original design only; clear at 24px; no gradients; no mockup; no 3D; no microphone; no waveform; no chat bubble; no sparkle; no isolated letter R; no watermark; preserve actual transparency

## Compact symbol

Create a symbol-only companion for the approved Riffra identity: two compact, horizontal speech fragments brought into alignment as one continuous written phrase. Flat editorial mark, deep ink #16322C only, precise but human, unmistakable at favicon scale, centered on a genuinely transparent square canvas with generous clear space. No text, letter R, microphone, waveform, chat bubble, sparkle, gradient, 3D, mockup or watermark. Preserve actual transparency.
`, 'utf8'),
  writeFile(join(outputRoot, 'assets', 'brand', 'USAGE.md'), `# Identity usage

- Source of truth: the two original PNG files produced by the built-in Codex ImageGen tool.
- Do not trace, redraw, vectorize, recolor, sharpen or synthesize the lettering with HTML/CSS.
- Primary lockup: \`logo-primary.png\` on mineral blush, paper or quiet dark surfaces.
- Compact mark: \`logo-mark.png\` for favicon and square placements.
- Preserve the original alpha channel and at least one mark-height of clear space.
`, 'utf8'),
])

for (const page of pages) {
  const routeDirectory = page.slug ? join(outputRoot, ...page.slug.split('/')) : outputRoot
  await mkdir(routeDirectory, { recursive: true })
  await writeFile(join(routeDirectory, 'index.html'), renderPage(page), 'utf8')
}

const routePaths = pages.map((page) => page.slug ? `/${page.slug}/` : '/')
await Promise.all([
  writeFile(join(outputRoot, 'routes.json'), JSON.stringify(routePaths, null, 2), 'utf8'),
  writeFile(join(outputRoot, 'robots.txt'), 'User-agent: *\nAllow: /\n', 'utf8'),
  writeFile(join(outputRoot, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routePaths.map((route) => `  <url><loc>http://127.0.0.1:4390${route}</loc></url>`).join('\n')}
</urlset>
`, 'utf8'),
  writeFile(join(outputRoot, 'start.bat'), `@echo off
cd /d "%~dp0"
start "Riffra" /min python -m http.server 4390 --bind 127.0.0.1
timeout /t 2 /nobreak >nul
start "" http://127.0.0.1:4390/
`, 'utf8'),
  writeFile(join(outputRoot, 'README.md'), `# Riffra — voice composition SaaS concept

An original eight-route competitor concept created from the written brief in \`PROMPT.md\` before implementation.

## Run

Double-click \`start.bat\`, or from this folder:

\`\`\`powershell
python -m http.server 4390 --bind 127.0.0.1
\`\`\`

Then open http://127.0.0.1:4390/.

## Routes

${routePaths.map((route) => `- \`${route}\``).join('\n')}

## Design source of truth

- \`PROMPT.md\` — generated build prompt
- \`design/\` — audit, four divergent concepts, critique and approved direction
- \`assets/brand/\` — original Codex ImageGen raster identity and source prompts
`, 'utf8'),
])

console.log(`Built ${pages.length} routes in ${outputRoot}`)
console.log(routePaths.join('\n'))
