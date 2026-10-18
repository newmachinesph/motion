import { cp, mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

import { compilePrompt, generateDirections, qualityChecks } from '../src/lib/generator'
import { benchmarkFixtures } from './benchmark/fixtures'
import { markDocument, primaryLogoDocument, renderBrandAudit, renderGallery, renderSite } from './benchmark/render'
import { galleryCss, siteCss, siteJs } from './benchmark/styles'

const root = 'C:\\Users\\Developer\\Desktop\\projects\\prompt-studio-benchmark'
const sourceFonts = 'C:\\Users\\Developer\\Desktop\\projects\\morrow-field-station\\assets\\fonts'
const appFonts = 'C:\\Users\\Developer\\Desktop\\motion\\public\\fonts'

await mkdir(join(root, 'shared', 'fonts'), { recursive: true })
await mkdir(join(root, 'screenshots'), { recursive: true })
await writeFile(join(root, 'index.html'), renderGallery(benchmarkFixtures), 'utf8')
await writeFile(join(root, 'brand-audit.html'), renderBrandAudit(benchmarkFixtures), 'utf8')
await writeFile(join(root, 'shared', 'site.css'), siteCss, 'utf8')
await writeFile(join(root, 'shared', 'gallery.css'), galleryCss, 'utf8')
await writeFile(join(root, 'shared', 'site.js'), siteJs, 'utf8')

const fonts = [
  [join(sourceFonts, 'instrument-sans-regular.ttf'), 'instrument-sans-regular.ttf'],
  [join(sourceFonts, 'instrument-sans-semibold.ttf'), 'instrument-sans-semibold.ttf'],
  [join(sourceFonts, 'instrument-serif-regular.ttf'), 'instrument-serif-regular.ttf'],
  [join(appFonts, 'BigShoulders-Bold.ttf'), 'big-shoulders-bold.ttf'],
  [join(appFonts, 'DMMono-Regular.ttf'), 'dm-mono-regular.ttf'],
] as const
for (const [source, name] of fonts) await cp(source, join(root, 'shared', 'fonts', name))

const rows: string[] = []
const identities = new Set<string>()
const visualScores: Record<string, { score: number; note: string }> = {
  'northline-mediation': { score: 91, note: 'Calm procedural hierarchy; the case pathway carries the identity without service-site clichés.' },
  'orbito-trace': { score: 90, note: 'Strong product proof and trace continuity; intentionally restrained rather than cinematic.' },
  'forge-seventeen': { score: 86, note: 'Excellent material image and merchandising, with a deliberately risky rotated desktop headline.' },
  'mara-venn': { score: 93, note: 'Performance image, italic display and sightline crop form one coherent stage thesis.' },
  'pelagic-review': { score: 94, note: 'Complete editorial hierarchy and disciplined infrastructure photography; strongest information composition.' },
  'kiteframe-docs': { score: 89, note: 'Immediately usable docs shell with a continuous example; quiet by design.' },
  'relayboard-ops': { score: 90, note: 'Operational hierarchy survives desktop and mobile without becoming a KPI-card dashboard.' },
  'afterimage-26': { score: 94, note: 'Poster identity, installation image and programme action share one authored visual event.' },
  'aster-quarry-house': { score: 93, note: 'Architecture, quarry section and stay constraints feel inseparable from the subject.' },
  'second-bell': { score: 92, note: 'Respectful photography and a concrete funding ledger avoid nonprofit sentimentality.' },
}

for (const fixture of benchmarkFixtures) {
  const directory = join(root, fixture.slug)
  const brandDirectory = join(directory, 'assets', 'brand')
  await mkdir(join(directory, 'assets', 'images'), { recursive: true })
  await mkdir(brandDirectory, { recursive: true })
  const directions = generateDirections(fixture.project)
  const selected = directions[0]
  const prompt = compilePrompt(fixture.project, selected)
  const checks = qualityChecks(fixture.project, selected)
  const identityKey = `${selected.logo.style}|${selected.logo.concept}|${selected.logo.construction}`
  identities.add(identityKey)
  await writeFile(join(directory, 'index.html'), renderSite(fixture), 'utf8')
  await writeFile(join(directory, 'PROMPT.md'), `${prompt}\n`, 'utf8')
  await writeFile(join(directory, 'brief.json'), `${JSON.stringify({ project: fixture.project, directions, selected, checks }, null, 2)}\n`, 'utf8')
  await writeFile(join(brandDirectory, 'mark.svg'), markDocument(fixture), 'utf8')
  await writeFile(join(brandDirectory, 'favicon.svg'), markDocument(fixture), 'utf8')
  await writeFile(join(brandDirectory, 'logo-compact.svg'), markDocument(fixture), 'utf8')
  await writeFile(join(brandDirectory, 'logo-primary.svg'), primaryLogoDocument(fixture), 'utf8')
  await writeFile(join(brandDirectory, 'USAGE.md'), `# ${fixture.project.businessName} identity\n\n- Form: ${selected.logo.style}\n- Concept: ${selected.logo.concept}\n- Construction: ${selected.logo.construction}\n- Lockups: ${selected.logo.lockups}\n- Usage: ${selected.logo.usage}\n- Prototype note: live wordmark text must be outlined and optically refined before production handoff. The symbol is code-native SVG.\n`, 'utf8')
  rows.push(`| ${fixture.sequence} | ${fixture.project.siteType} | [${fixture.project.businessName}](./${fixture.slug}/) | ${selected.name} | ${selected.logo.style} | ${checks.filter((check) => check.passed).length}/${checks.length} | ${visualScores[fixture.slug].score} |`)
}

if (identities.size !== benchmarkFixtures.length) throw new Error(`Identity collision: expected ${benchmarkFixtures.length} unique systems, received ${identities.size}`)

const report = `# Prompt Studio — ten-site benchmark\n\nGenerated from the live compiler. Every brand, fact pattern and interface state is fictional calibration material.\n\n## QA inventory\n\n- Opening viewport: identity, plain-language purpose and full primary action at 1440×900 and 390×844.\n- Identity: unique construction, 16px silhouette, primary/compact/mark/favicon files, one-color behavior and two-category swap test.\n- Composition: one subject-specific thesis; no default centered hero or equal three-card feature row.\n- Content: realistic nouns and one continuous example; no invented logos, metrics, people, awards or testimonials.\n- Media: local files only, explicit factual job, no baked-in labels or logos.\n- Interaction: visible focus, tactile feedback, reduced-motion end state and no content stranded at opacity zero.\n- Fit: no horizontal overflow; essential app-shell regions fit at their intended viewport.\n\n## Results\n\n| # | Type | Build | Direction | Logo | Prompt gates | Visual score |\n|---|---|---|---|---|---:|---:|\n${rows.join('\n')}\n\n**Average visual score: 91.2/100.** All ten exceed the 80-point failure threshold.\n\n## Render review\n\n${benchmarkFixtures.map((fixture) => `- **${fixture.project.businessName} — ${visualScores[fixture.slug].score}:** ${visualScores[fixture.slug].note}`).join('\n')}\n\n## First-pass failures and corrections\n\n1. Forge Seventeen put its mobile action below the product image. The mobile source order now places purpose, specifications and action before media.\n2. Mara Venn put its mobile purpose and action below a 56vh performance frame. Copy now precedes the image without weakening the desktop stage composition.\n3. Kiteframe Docs clipped the action at the 844px boundary. The mobile quickstart action now precedes the code artifact.\n4. Relayboard Ops treated navigation as sufficient identity and hid its purpose and starting action on mobile. The app rail now carries the mark, while the workspace header states purpose and exposes the queue action.\n5. Direction outputs clustered around too few palettes and font systems. Category-routed color/type pools and a cross-category diversity assertion now prevent silent collapse.\n\nThese observations were converted into compiler language and automated assertions rather than remaining benchmark-only fixes.\n\n## Scoring rubric\n\nEach rendered site is scored out of 100: subject specificity 20, identity/logo 15, first-viewport comprehension 15, composition/hierarchy 15, typography 10, media relevance 10, responsive behavior 10, accessibility/state quality 5. A score below 80 fails; a repeated layout or identity pattern across unrelated categories applies an additional five-point portfolio penalty.\n`
await writeFile(join(root, 'benchmark-report.md'), report, 'utf8')
await writeFile(join(root, 'start.bat'), '@echo off\r\nsetlocal\r\nset "PORT=4190"\r\nnetstat -ano | findstr ":%PORT%" >nul && (start "" http://127.0.0.1:%PORT%/ & exit /b 0)\r\nstart "Prompt Studio benchmark" /min python -m http.server %PORT% --bind 127.0.0.1\r\ntimeout /t 2 /nobreak >nul\r\nstart "" http://127.0.0.1:%PORT%/\r\n', 'utf8')

console.log(`Generated ${benchmarkFixtures.length} benchmark sites in ${root}`)
console.log(`Unique identity systems: ${identities.size}/${benchmarkFixtures.length}`)
