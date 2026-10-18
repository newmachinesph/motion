import { defaultProject, mechanics, palettes, sectionSets, siteTypes, targetLabels } from '../src/lib/data'
import { compilePrompt, generateDirections, qualityChecks } from '../src/lib/generator'
import type { OutputTarget, ProjectData } from '../src/lib/types'

const assert = (condition: unknown, message: string) => {
  if (!condition) throw new Error(message)
}

const luminance = (hex: string) => {
  const channels = hex.match(/[A-Fa-f0-9]{2}/g)?.map((value) => Number.parseInt(value, 16) / 255) ?? []
  const [red, green, blue] = channels.map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4)
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue
}

const contrast = (first: string, second: string) => {
  const a = luminance(first)
  const b = luminance(second)
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
}

for (const palette of palettes) {
  assert(contrast(palette.ink, palette.ground) >= 4.5, `${palette.name}: ink fails body contrast`)
  assert(contrast(palette.muted, palette.ground) >= 4.5, `${palette.name}: muted text fails body contrast`)
  assert(contrast(palette.accent, palette.ground) >= 4.5, `${palette.name}: accent fails text contrast`)
}

const diversity = new Set<string>()

for (const [index, site] of siteTypes.entries()) {
  const project: ProjectData = {
    ...defaultProject,
    siteType: site.id,
    businessName: `${site.label} test`,
    description: `A complete ${site.label.toLowerCase()} experience used to verify dynamic routing and prompt compilation.`,
    sections: sectionSets[site.id],
    seed: 100 + index,
  }
  const directions = generateDirections(project)
  assert(directions.length === project.conceptCount, `${site.id}: expected ${project.conceptCount} commissioned directions`)
  assert(new Set(directions.map((direction) => direction.name)).size === directions.length, `${site.id}: directions must be unique`)
  for (let first = 0; first < directions.length; first += 1) {
    for (let second = first + 1; second < directions.length; second += 1) {
      const a = directions[first]
      const b = directions[second]
      const axisDistance = [
        a.topology !== b.topology,
        a.fonts.name !== b.fonts.name,
        a.palette.name !== b.palette.name,
        a.imageLanguage !== b.imageLanguage,
        a.shapeLanguage !== b.shapeLanguage,
        a.motionProfile !== b.motionProfile || a.signature !== b.signature,
      ].filter(Boolean).length
      assert(axisDistance >= 4, `${site.id}: ${a.name} and ${b.name} differ on only ${axisDistance} design axes`)
    }
  }
  const prompt = compilePrompt(project, directions[0])
  assert(directions.every((direction) => direction.templateRisk.length > 40), `${site.id}: directions do not disclose their template risk`)
  diversity.add(`${directions[0].name}|${directions[0].palette.name}|${directions[0].fonts.name}|${directions[0].logo.style}`)
  assert(prompt.includes(project.businessName), `${site.id}: prompt lost the business name`)
  assert(prompt.includes(sectionSets[site.id][0]), `${site.id}: prompt lost the site-specific architecture`)
  assert(prompt.includes('Opening viewport budget'), `${site.id}: prompt lost the first-viewport comprehension contract`)
  assert(prompt.includes('Asset and media plan'), `${site.id}: prompt emitted no authored asset plan`)
  assert(prompt.includes('Logo and identity pipeline'), `${site.id}: prompt emitted no logo pipeline`)
  assert(prompt.includes('/assets/brand/logo-primary.png'), `${site.id}: prompt emitted no Codex Image logo deliverables`)
  assert(prompt.includes('do not trace it'), `${site.id}: prompt lost the no-tracing logo contract`)
  assert(prompt.includes('identity swap test'), `${site.id}: prompt emitted no logo specificity test`)
  assert(prompt.includes('media block may not consume more than 42vh'), `${site.id}: prompt emitted no image-led mobile ordering rule`)
  assert(prompt.includes('persistent navigation does not satisfy orientation'), `${site.id}: prompt emitted no app-shell orientation rule`)
  assert(prompt.includes('sole timeline-level centerpiece'), `${site.id}: prompt emitted no motion hierarchy`)
  assert(prompt.includes('Studio operating model'), `${site.id}: prompt emitted no studio operating model`)
  assert(prompt.includes('Reference parity gate'), `${site.id}: prompt emitted no side-by-side reference gate`)
  assert(prompt.includes('Visual distinctiveness cannot compensate'), `${site.id}: prompt lets novelty compensate for weak design performance`)
  assert(prompt.includes('Anti-slop veto'), `${site.id}: prompt emitted no recognizable-template veto`)
  assert(prompt.includes(project.heroEvidence), `${site.id}: prompt lost the required first-fold evidence`)
  assert(prompt.includes('The candidate direction is not authority'), `${site.id}: generated direction is still treated as unquestionable authority`)
  assert(prompt.includes('Independent concept commissions'), `${site.id}: prompt emitted no independent commissions`)
  assert(prompt.includes('similarity veto'), `${site.id}: prompt emitted no similarity veto`)
  assert(prompt.includes('No implementation begins before'), `${site.id}: prompt emitted no design-before-build gate`)
  assert(prompt.includes('/design/DECISIONS.md'), `${site.id}: prompt emitted no design decision log`)
  assert(prompt.includes('Direction-owned grid'), `${site.id}: prompt emitted no direction-owned layout system`)
  assert(!prompt.includes('Global grid: 12 columns'), `${site.id}: prompt retained the universal grid that caused style convergence`)
  assert(!prompt.includes('\u00e2\u20ac'), `${site.id}: prompt contains mojibake`)
  assert(prompt.trim().split(/\s+/).length > 900, `${site.id}: prompt is underspecified`)
  assert(qualityChecks(project, directions[0]).every((check) => check.passed), `${site.id}: a complete fixture failed quality gates`)
}

assert(diversity.size >= 8, `Cross-category diversity collapsed to ${diversity.size} selected systems`)

const repeatedBriefDirections = new Set<string>()
const repeatedBriefSystems = new Set<string>()
for (let seed = 1; seed <= 30; seed += 1) {
  const direction = generateDirections({ ...defaultProject, seed }, seed)[0]
  repeatedBriefDirections.add(direction.name)
  repeatedBriefSystems.add(`${direction.topology}|${direction.palette.name}|${direction.fonts.name}`)
}
assert(repeatedBriefDirections.size >= 5, `Same-brief rerolls collapsed to ${repeatedBriefDirections.size} lead directions`)
assert(repeatedBriefSystems.size >= 5, `Same-brief rerolls collapsed to ${repeatedBriefSystems.size} structural systems`)

const multiPageProject: ProjectData = {
  ...defaultProject,
  pageMode: 'multi',
}
const multiPagePrompt = compilePrompt(multiPageProject, generateDirections(multiPageProject)[0])
assert(multiPagePrompt.includes('Route manifest'), 'multi-page: prompt emitted no route manifest')
assert(multiPagePrompt.includes('7-route multi-page website'), 'multi-page: prompt lost route count')
assert(multiPagePrompt.includes('A polished home page cannot compensate for a shallow interior route'), 'multi-page: prompt emitted no interior-page QA')
assert(multiPagePrompt.includes('Crawl every internal link'), 'multi-page: prompt emitted no route crawl')
assert(qualityChecks(multiPageProject, generateDirections(multiPageProject)[0]).every((check) => check.passed), 'multi-page: complete route fixture failed quality gates')

const slopProneProject: ProjectData = {
  ...defaultProject,
  references: 'https://glaido.com/ | borrow: clarity | avoid: copying identity',
  referenceStrengths: '',
  categoryCliches: 'Dark page with a glowing dashboard',
  restraintRule: '',
  heroEvidence: '',
  benchmarkCriteria: 'Make it look premium.',
}
const slopChecks = qualityChecks(slopProneProject, generateDirections(slopProneProject)[0])
for (const label of ['Reference bar is explicit', 'Category defaults are vetoed', 'Restraint has an owner', 'First fold proves the subject', 'Parity gate is testable']) {
  assert(slopChecks.some((check) => check.label === label && !check.passed), `anti-slop: ${label} incorrectly passed`)
}
assert(!slopChecks.every((check) => check.passed), 'anti-slop: a complete-looking but unbenchmarked brief passed export gates')

for (const mechanic of mechanics) {
  const project = { ...defaultProject, mechanics: [mechanic.id] }
  const prompt = compilePrompt(project, generateDirections(project)[0])
  assert(prompt.includes(`### ${mechanic.label}`), `${mechanic.id}: selected mechanic emitted no implementation block`)
  assert(/reduced[- ]motion/i.test(prompt), `${mechanic.id}: selected mechanic emitted no reduced-motion contract`)
}

const targetSignals: Record<OutputTarget, string> = {
  framer: 'Framer CMS',
  code: 'Next.js App Router',
  lovable: 'one complete responsive surface',
  figma: 'Figma system',
  webflow: 'Webflow components',
  html: 'semantic HTML',
}

for (const target of Object.keys(targetLabels) as OutputTarget[]) {
  const project = { ...defaultProject, outputTarget: target }
  const prompt = compilePrompt(project, generateDirections(project)[0])
  assert(prompt.includes(targetSignals[target]), `${target}: target adapter did not change the handoff`)
}

console.log(`Verified ${siteTypes.length} website species, ${mechanics.length} mechanics, ${Object.keys(targetLabels).length} output adapters and the identity pipeline.`)
