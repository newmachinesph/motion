import { copyFile, mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { defaultProject, routePlanSets, sectionSets } from '../src/lib/data'
import { compilePrompt, generateDirections } from '../src/lib/generator'
import type { ProjectData } from '../src/lib/types'
import { pages, renderPage } from './saas-multipage/site'
import { siteScript, styles } from './saas-multipage/styles'

const root = 'C:\\Users\\Developer\\Desktop\\projects\\rivetline-saas'
const brandRoot = join(root, 'assets', 'brand')
const screenshotRoot = join(root, 'screenshots')
const logoSource = join(process.cwd(), 'scripts', 'saas-multipage', 'assets', 'rivetline-logo-codex.png')

const logoPrompt = `Use case: logo-brand
Asset type: primary website logo, used directly as a raster PNG without SVG tracing
Primary request: Create an original combination logo for a fictional SaaS company named “RIVETLINE”, software for hardware engineering change control. The symbol should express a drawing revision moving through review into a released manufacturing decision: one continuous technical redline bends around an offset plate and terminates in a solid registration point. It must feel like engineering notation, not generic technology.
Style/medium: extremely crisp flat graphic identity, minimal two-color mark, strong silhouette, production brand-system quality
Composition/framing: horizontal lockup, symbol on the left and exact wordmark on the right, generous transparent padding, no presentation mockup
Color palette: near-black #17201D and safety orange #D84A2B only
Text (verbatim): “RIVETLINE” in uppercase, condensed industrial grotesk lettering with deliberate spacing
Constraints: genuinely transparent background; exact wordmark once; no gradients; no shadows; no 3D; no texture; no mockup; no watermark; no tagline; no extra text; preserve clear edges at small sizes
Avoid: letter R monogram, gears, wrenches, hexagons, shields, checkmarks, chain links, circuits, generic connected nodes, sparkles, brains, chat bubbles`

const project: ProjectData = {
  ...defaultProject,
  siteType: 'saas',
  businessName: 'Rivetline',
  description: 'A hardware engineering change-control workspace that keeps drawing revisions, downstream impact, approvals, supplier acknowledgement and effectivity in one release record.',
  primaryAction: 'Open the sample change',
  pageMode: 'multi',
  pagePlan: routePlanSets.saas,
  audience: 'Engineering programme leaders, quality engineers and supply operations teams evaluating on desktop who need to trust that release context survives manufacturing handoff.',
  brandMode: 'new',
  logoSource: 'codex-image',
  logoStyle: 'combination',
  logoBrief: 'A continuous engineering redline moves around an offset plate and terminates in a registered release point; avoid gears, wrenches, hexagons and generic network nodes.',
  traits: ['Precise', 'Technical', 'Tactile'],
  antiGoal: 'Do not make this look like a generic AI SaaS launch: no gradient headline, dashboard collage, floating metric cards, glowing grid, purple accent or invented customer proof.',
  references: '21st.dev component studies | borrow: interaction clarity and authored component density | avoid: copying any brand identity or exact composition\nEngineering revision drawings | adapt: redlines, title blocks and registration metadata into navigation and structure',
  referenceStrengths: 'Match the strongest reference in first-fold comprehension, product visibility, interaction realism, typographic hierarchy, restraint, brand cohesion and conversion clarity.',
  categoryCliches: 'Dark AI SaaS page with glow, acid accent and floating dashboard collage\nWarm editorial broadsheet with mono labels, rules and decorative numbering\nGeneric engineering brand built from hexagons, nodes, gears and condensed industrial type',
  restraintRule: 'Spend visual emphasis on the continuous change-record artifact only. Keep global navigation, supporting headings, proof metadata and secondary interactions quiet.',
  proof: 'One source example, CR-284, remains continuous from marked drawing through impact register, approval questions, supplier acknowledgement and effective serial boundary.',
  heroEvidence: 'Show CR-284 in a legible first-fold product state: marked drawing, affected item, open approval question and release status connected without scrolling or animation.',
  contentItems: 'Change record | One technical argument carrying source, impact, review and release\nRevision overlay | Changed geometry with a direct link to the approval question\nAffected-item register | Parts, tools, documents and validation work connected to one revision\nSupplier receipt | Seen, acknowledged, constrained and accepted states\nRelease packet | Definitions, dispositions and effective boundary another team can execute',
  sections: ['Navigation', 'Hero', 'Product diagram', 'Feature system', 'Use cases', 'Proof', 'Integrations', 'Security', 'Final CTA', 'Footer'],
  mediaSubject: 'product',
  motionIntensity: 5,
  mechanics: ['micro', 'transitions'],
  outputTarget: 'html',
  extraRequirements: 'Build seven separately addressable routes. Use the Codex Images logo PNG directly without tracing. Keep every claim explicitly fictional or demonstrative. All internal links and interactive controls must work.',
  benchmarkCriteria: 'Score first-fold comprehension, product visibility, engineering-data realism, typographic hierarchy, restraint, brand cohesion, conversion clarity and mobile translation; no core result may regress from the strongest reference.',
  seed: 114,
}

await mkdir(brandRoot, { recursive: true })
await mkdir(screenshotRoot, { recursive: true })
await copyFile(logoSource, join(brandRoot, 'logo-primary.png'))
await copyFile(logoSource, join(brandRoot, 'favicon.png'))
await writeFile(join(brandRoot, 'PROMPT.md'), `${logoPrompt}\n`, 'utf8')
await writeFile(join(brandRoot, 'USAGE.md'), `# Rivetline identity usage

- Source: Codex Images built-in generation.
- The deployed PNG is the selected generated output and remains untraced.
- Do not redraw, vectorize, approximate or replace the lettering.
- Keep the original aspect ratio and at least 12% of the image height as clear space.
- On dark surfaces, use CSS brightness inversion only in the footer prototype; commission a separate Codex Image reverse lockup before production.
- The favicon uses the same original raster asset for this benchmark. A separate compact Codex Image generation is required before a production launch.
`, 'utf8')

await writeFile(join(root, 'assets', 'styles.css'), styles, 'utf8')
await writeFile(join(root, 'assets', 'site.js'), siteScript, 'utf8')

for (const page of pages) {
  const routeRoot = page.slug ? join(root, page.slug) : root
  await mkdir(routeRoot, { recursive: true })
  await writeFile(join(routeRoot, 'index.html'), renderPage(page), 'utf8')
}

const direction = generateDirections(project, project.seed)[0]
await writeFile(join(root, 'PROMPT.md'), compilePrompt(project, direction), 'utf8')
await writeFile(join(root, 'brief.json'), JSON.stringify(project, null, 2), 'utf8')
await writeFile(join(root, 'routes.json'), JSON.stringify(pages.map((page) => ({ path: page.slug ? `/${page.slug}/` : '/', title: page.title, description: page.description })), null, 2), 'utf8')
await writeFile(join(root, 'robots.txt'), 'User-agent: *\nAllow: /\nSitemap: http://127.0.0.1:4290/sitemap.xml\n', 'utf8')
await writeFile(join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((page) => `  <url><loc>http://127.0.0.1:4290${page.slug ? `/${page.slug}/` : '/'}</loc></url>`).join('\n')}\n</urlset>\n`, 'utf8')
await writeFile(join(root, 'start.bat'), '@echo off\nstart "Rivetline SaaS" /min python -m http.server 4290 --bind 127.0.0.1\ntimeout /t 2 /nobreak >nul\nstart "" http://127.0.0.1:4290/\n', 'utf8')
await writeFile(join(root, 'README.md'), `# Rivetline multi-page SaaS benchmark

Seven real routes generated to calibrate Prompt Studio beyond landing-page depth:

- Home
- Product
- Solutions
- Scenarios
- Pricing
- Resources
- Company

Run \`start.bat\` or serve this folder on port 4290. All product, customer and pricing content is explicitly fictional.

The logo at \`assets/brand/logo-primary.png\` is the original Codex Images output. It has not been traced or reconstructed as vector.
`, 'utf8')

console.log(`Generated ${pages.length} Rivetline routes in ${root}`)
console.log('Logo source: Codex Images PNG, untraced')
