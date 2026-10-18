import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

import { defaultProject } from '../src/lib/data'
import { compilePrompt, generateDirections, qualityChecks } from '../src/lib/generator'
import type { ProjectData } from '../src/lib/types'

const outputDirectory = 'C:\\Users\\Developer\\Desktop\\projects\\morrow-field-station'

const project: ProjectData = {
  ...defaultProject,
  version: 1,
  siteType: 'hospitality',
  businessName: 'Morrow Field Station',
  description: 'A fictional North Sea field station offering week-long research residencies and design-minded stays beside a tidal salt marsh.',
  primaryAction: 'Request a field stay',
  pageMode: 'single',
  audience: 'Independent researchers, artists and curious travellers who value serious fieldwork, quiet architecture and transparent expectations before they enquire.',
  deviceBias: 'balanced',
  network: 'typical',
  accessibility: 'AA',
  locale: 'English, left-to-right',
  brandMode: 'new',
  logoStyle: 'combination',
  logoBrief: 'Combine a tidal datum line with the threshold of a field station; avoid compass roses, waves and generic lodge crests.',
  traits: ['Editorial', 'Tactile', 'Quiet', 'Human'],
  antiGoal: 'No beige luxury-resort cliches, generic wellness language, floating glass cards, gradient text, fake awards or frictionless booking theatre.',
  references: 'Use the supplied 21st.dev screenshots only for structural inspiration: one dominant animated hero aperture, disciplined editorial cards and strong component states. Do not reproduce a component, brand identity or source code.',
  referenceStrengths: 'Match the reference level of opening confidence, image direction, component-state clarity, typographic hierarchy, restraint and a visible enquiry path.',
  categoryCliches: 'Beige luxury retreat with oversized serif type and slow fades\nEditorial broadsheet with mono folios, hairline rules and decorative numbering\nFull-bleed cinematic hero that postpones practical stay information',
  restraintRule: 'Spend visual emphasis on the tidal sequence and one decisive environmental image only. Keep booking facts, field notes, navigation and supporting headings quiet.',
  proof: 'This is a fictional calibration project. Treat all names, dates and programmes as clearly authored sample content; do not invent awards, occupancy figures, testimonials or scientific claims.',
  heroEvidence: 'Show the current tide, weather condition, next safe marsh route and the complete field-stay action together in the first viewport at realistic content length.',
  contentItems: [
    'The tidal table | A daily field briefing that pairs water level, light and wind with one practical route into the marsh',
    'West room | A compact timber-lined room for one or two guests with a writing desk facing the reed beds',
    'Survey walk | A low-tide route led by a named field guide, ending with specimen notes in the chart room',
    'Night watch | A quiet observation session from the weather deck with red task lighting and an authored sky guide',
    'Field kitchen | A shared evening table built around local produce, preserved coastal plants and the day\'s notes',
  ].join('\n'),
  sections: ['Navigation', 'Atmosphere hero', 'Field conditions', 'Tide sequence', 'Rooms and rituals', 'Field notes', 'Location', 'Request form', 'Footer'],
  mediaSubject: 'narrative',
  motionIntensity: 7,
  mechanics: ['micro', 'parallax', 'scrollytelling', 'kineticType'],
  benchmarkCriteria: 'Score first-fold comprehension, subject visibility, evidence realism, typographic hierarchy, restraint, brand cohesion, conversion clarity and mobile translation against the strongest reference; no core score may regress.',
  outputTarget: 'html',
  extraRequirements: 'Use original Codex-generated photography, one consistent outline icon family and code-native SVG tide diagrams. The first viewport must feel like a publication cover, not a hotel booking template.',
  seed: 64,
}

const directions = generateDirections(project)
const selected = directions[0]
const checks = qualityChecks(project, selected)

await mkdir(outputDirectory, { recursive: true })
await writeFile(join(outputDirectory, 'brief.json'), `${JSON.stringify({ project, directions, selected, checks }, null, 2)}\n`, 'utf8')
await writeFile(join(outputDirectory, 'PROMPT.md'), `${compilePrompt(project, selected)}\n`, 'utf8')

console.log(`Generated ${join(outputDirectory, 'PROMPT.md')}`)
console.log(`Selected direction: ${selected.name}`)
console.log(`Quality gates: ${checks.filter((check) => check.passed).length}/${checks.length}`)
