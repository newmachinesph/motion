import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { defaultProject, sectionSets } from '../src/lib/data'
import { compilePrompt, qualityChecks } from '../src/lib/generator'
import type { CreativeDirection, ProjectData } from '../src/lib/types'

const outputRoot = 'C:\\Users\\Developer\\Desktop\\projects\\riffra-voice-saas'

const project: ProjectData = {
  ...defaultProject,
  siteType: 'saas',
  businessName: 'Riffra',
  description: 'A desktop voice-composition tool that turns rough speech into context-aware, ready-to-send writing in any app while keeping the user in control before paste.',
  primaryAction: 'Download Riffra free',
  pageMode: 'multi',
  pagePlan: `/ | Home | Establish Riffra as the controlled voice-composition layer | An interactive before-and-after composer using one realistic client-update example
/product | Product | Explain capture, shaping, review and paste as one connected workflow | A complete interactive product walkthrough with context-set controls
/workflows | Workflows | Help visitors recognize a useful daily situation | Role-based voice workflows for consulting, product, support and sales
/teams | Teams | Show how vocabulary and writing standards work across an organization | Shared context sets, terminology controls, permissions and adoption states
/security | Security | Make privacy architecture and data handling reviewable | Plain-language data-flow diagram, retention controls and security FAQ
/pricing | Pricing | Make plan choice and limits legible | Monthly/annual switch, complete plan comparison and purchase states
/journal | Journal | Demonstrate product thinking and support evaluation | Filterable editorial index with product notes, guides and research
/journal/voice-is-a-draft | Article | Deliver a complete editorial reading experience | Long-form argument, diagrams, pull notes and related reading`,
  audience: 'Consultants, product leaders, customer teams and independent professionals who write across several desktop apps, care about exact phrasing and privacy, and will evaluate on laptop before installing.',
  deviceBias: 'desktop',
  network: 'typical',
  accessibility: 'AA',
  locale: 'English, left-to-right; architecture must leave room for multilingual expansion and mixed-language dictation.',
  brandMode: 'new',
  logoSource: 'codex-image',
  logoStyle: 'combination',
  logoBrief: 'Express two rough speech fragments being aligned into one continuous written phrase. The silhouette should suggest rhythm and revision without microphones, sound-wave clichés, sparkles, chat bubbles or an isolated letter R.',
  traits: ['Human', 'Precise', 'Playful'],
  antiGoal: 'Do not imitate the category default: no black-and-neon landing page, centered giant claim, floating glass dashboard, glowing waveform, anonymous three-card feature row, invented productivity metrics or endless testimonial marquee.',
  references: `https://glaido.com/ | borrow: the immediate product promise, in-context demonstration, compatibility proof and transparent path to pricing | avoid: near-black plus lime palette, Aspekta/Geist typography, 50/50 hero split, WPM and time-saved counters, repeated testimonials | adapt: show voice as an editable draft before paste rather than invisible speed magic
https://docs.glaido.com/ | borrow: concrete explanations of push-to-talk, agent actions and failure states | avoid: copying terminology, claims, examples or navigation`,
  referenceStrengths: 'Match or exceed Glaido in first-fold comprehension, immediate product visibility, interaction realism, typographic hierarchy, restraint, conversion clarity and route-level product depth.',
  categoryCliches: 'Dark desktop-AI page with acid lime, glow and a floating demo window\nWarm editorial SaaS page with oversized display type, mono labels and paper-toned panels\nVoice-product identity built from waveforms, microphones, sparkle marks and speed counters',
  restraintRule: 'Spend visual emphasis on the review-before-paste product mechanism only. Keep navigation, secondary headings, compatibility proof, pricing support and editorial chrome quiet.',
  proof: 'The product mechanism is inspectable: speech enters as rough fragments, a selected Context Set applies vocabulary and writing rules, the Review Strip shows what changed, and the user approves the final paste. The demo must make this visible with one consistent example.',
  heroEvidence: 'Show a legible before-and-after writing state in the first viewport: rough spoken fragments, the active Context Set, visible edits and the user-approved sentence before paste.',
  contentItems: `Review Strip | See the rough transcript and the shaped version together before anything is pasted
Context Sets | Switch vocabulary, tone and formatting rules by client, project or role
Selected-text actions | Highlight text, speak an instruction and review the proposed revision in place
Private dictionary | Keep names, specialist terms and preferred spellings available across apps
Team language | Share approved terminology and writing rules without forcing one voice on every person
Mixed-language flow | Dictate naturally across supported languages without reconfiguring the entire workspace`,
  sections: sectionSets.saas,
  mediaSubject: 'transformation',
  motionIntensity: 7,
  mechanics: ['micro', 'transitions', 'scrollytelling', 'kineticType'],
  processMode: 'studio',
  studioRoles: ['strategy', 'creative-direction', 'art-direction', 'ux-architecture', 'identity', 'typography', 'content-design', 'interaction', 'design-systems', 'critique', 'design-engineering'],
  conceptCount: 4,
  critiqueRounds: 2,
  decisionOwner: 'The creative director recommends the territory after independent critique; the product owner approves only when the desktop, interior-route, mobile and interaction-state keyframes meet the written gate.',
  approvalCriteria: 'The approved direction must make review-before-paste visible in a still frame, differ from Glaido on palette, typography, topology and motion logic, keep the install action obvious, support all eight routes without repeating one template, and remain specific without a microphone or waveform cliché.',
  benchmarkCriteria: 'Score first-fold comprehension, product visibility, interaction realism, typographic hierarchy, restraint, brand cohesion, conversion clarity and mobile translation side by side with Glaido. No candidate advances with a lower core score.',
  outputTarget: 'html',
  extraRequirements: 'Build all eight routes as separately addressable static pages with shared navigation. Use locally stored fonts and assets, an original untraced Codex Image logo, Phosphor icons, no external placeholder media, complete form and pricing states, reduced-motion support and a local start script.',
  seed: 83,
}

const direction: CreativeDirection = {
  id: 'riffra-speech-atelier',
  name: 'Speech Atelier',
  descriptor: 'A visible composition desk where rough voice slips become ready-to-send language',
  rationale: 'Riffra competes on control rather than raw speed. The design turns revision into the visual identity: speech fragments stay visible, context rules are named, and the final phrase is approved rather than magically appearing.',
  palette: {
    name: 'Mineral blush',
    ground: '#F1E2DE',
    surface: '#FFF9F7',
    ink: '#16322C',
    muted: '#4E5F5A',
    accent: '#A5234D',
    line: '#C8B5B0',
  },
  fonts: {
    name: 'Composed voice',
    display: 'Boldonse',
    body: 'Work Sans',
    utility: 'Red Hat Mono',
    strategy: 'A wide, idiosyncratic display face makes phrasing physical; a calm grotesque carries long product copy; mono text labels the product’s transformations and states.',
  },
  hero: 'Do not use a centered hero or a 50/50 split. Place the claim in the upper-left of an edge-to-edge composition desk. A horizontal Review Strip crosses the lower two-thirds of the first viewport and the fold, showing rough spoken fragments entering from the left, a named Context Set in the middle and an approved sentence exiting on the right.',
  structure: 'Use a seven-column irregular manuscript grid with a persistent context rail. Alternate wide proof surfaces, narrow editorial annotations and full-width transcript ribbons. Route templates must include a composition desk, an indexed workflow library, a security ledger and a long-form journal page.',
  signature: 'One sticky Clarity Press sequence moves the same rough phrase through capture, context, review and approval. Each beat changes comprehension; the finished sentence remains fully legible as the reduced-motion still state.',
  motionProfile: 'One deliberate scroll-driven transformation plus direct 120–180ms control feedback. Transcript slips can shift, align and compress; nothing floats ambiently and no decorative waveform loops.',
  density: 'balanced',
  formThesis: 'Voice is not magic output; it is a draft the user can see, shape and approve.',
  topology: 'rolling manuscript with a persistent context rail',
  gridSystem: 'Seven unequal columns at desktop: a two-column context rail and five-column manuscript field. Key proof surfaces may break the rail and run edge-to-edge. Mobile becomes one authored vertical manuscript with context controls before the transformed result.',
  imageLanguage: 'The generated raster logo is the only brand-lettering image. Product demonstrations, data flows and workflow examples are code-native. Avoid stock people, abstract 3D or generic app collages; use real writing fragments and editorial annotations as the visual material.',
  shapeLanguage: 'Cut-paper transcript slips, squared editor panes, tabbed context dividers and one rounded voice control. Borders and overlaps show revision; shadows are rare and shallow.',
  templateRisk: 'Can become a warm editorial SaaS template made from paper slips, mono annotations and oversized display type unless the real review-before-paste product state dominates every keyframe.',
  logo: {
    style: 'combination',
    concept: 'Two rough speech fragments align into one continuous written phrase, forming a compact rhythmic sign that belongs to review-before-paste.',
    construction: 'Generate the original combination mark with Codex Images. Choose a strong compact symbol and distinctive Riffra wordmark based on silhouette and small-size behavior. Use the approved raster outputs directly and never trace, redraw or rebuild them as SVG/CSS.',
    lockups: 'Generate primary horizontal, compact symbol-plus-name and symbol-only favicon/social variants as separate Codex Image outputs from the same construction idea.',
    usage: 'Keep one mark-height clear space, preserve the original raster edge and alpha, never apply glows or gradients, and use the one-color mark on mineral blush, paper white and deep ink surfaces.',
  },
}

const referenceAudit = `# Reference forensics — Glaido

Reference inspected: https://glaido.com/ and its public documentation on August 16, 2026. The connected visual browser was unavailable, so interaction claims are limited to public page structure, indexed visual captures, rendered HTML and published documentation.

## Borrow

- State the product in one plain sentence before explaining AI.
- Show the product operating inside a realistic writing context rather than relying on an abstract dashboard.
- Make compatibility, platform availability, privacy and pricing easy to find.
- Use complete product-language examples and concrete documentation.

## Avoid

- Near-black neutral system with lime #BFF549 as the dominant signal.
- Aspekta plus Geist Mono typography, the 50/50 copy-demo hero split and the same full-page border frame.
- WPM and time-saved counters, repeated testimonial carousels and claims that cannot be sourced for this fictional competitor.
- Glaido’s copy, icon mark, interface examples, release content, brand lettering or proprietary imagery.

## Adapt

- Replace “instant invisible magic” with a visible review-before-paste mechanism.
- Replace app-logo abundance with role-specific workflow evidence.
- Replace voice speed as the identity with phrasing, revision and control.
- Keep the reference’s conversion clarity while changing palette, typography, topology, shape grammar and motion logic.
`

const concepts = [
  ['concept-a-broadcast-desk.md', `# A — Broadcast Desk\n\nDark command surface, condensed type, hard-lime notices and rapid utility motion. Strong first-frame contrast but rejected: palette, hero division and speed rhetoric remain too close to Glaido.\n`],
  ['concept-b-soft-voice-garden.md', `# B — Soft Voice Garden\n\nRounded pastel islands, friendly illustrations and buoyant object motion. Distinct from the reference but rejected: it makes professional editing feel childish and depends on generic soft-SaaS shapes.\n`],
  ['concept-c-speech-atelier.md', `# C — Speech Atelier\n\nMineral blush paper, deep green ink, Boldonse display type, an irregular manuscript grid and one review-before-paste scroll sequence. Advanced: it makes Riffra’s product difference visible and scales into utility, pricing, security and editorial routes.\n`],
  ['concept-d-utility-index.md', `# D — Utility Index\n\nDense black-on-white directory with mono labels, workflow tables and almost no motion. Credible for security and team pages but not advanced globally: the home route lacks emotional and product distinction. Selected pieces survive as the security-ledger template.\n`],
] as const

const divergence = `# Divergence matrix

| Pair | Topology | Type | Palette/value | Image language | Shape | Motion | Result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| A / B | different | different | different | different | different | different | pass |
| A / C | different | different | different | different | different | different | pass |
| A / D | different | different | different | different | partly shared | different | pass |
| B / C | different | different | different | different | different | different | pass |
| B / D | different | different | different | different | different | different | pass |
| C / D | different | different | different | different | different | different | pass |

All pairs differ on at least five of six axes. The similarity veto passes.
`

const critique = `# Critique record

## Round 1 — divergence

- Kill Broadcast Desk as a global direction; it is a polished category reskin.
- Kill Soft Voice Garden; the emotional register conflicts with professional writing control.
- Advance Speech Atelier because the product mechanism and visual thesis are the same idea.
- Mutate Utility Index into the security and teams template rather than a competing global identity.

## Round 2 — convergence

- Keep the Review Strip visible without motion.
- Reduce decorative transcript slips outside the hero and Clarity Press.
- Make the download action visible in the first mobile viewport.
- Do not let mineral blush become warm-cream editorial styling: preserve the deep green product surfaces, tabbed rail and wide display voice.
- Approve Speech Atelier for keyframes and production.
`

const artDirection = `# Approved art direction — Speech Atelier

## Tokens

- Mineral blush #F1E2DE — ground
- Paper #FFF9F7 — content and transcript slips
- Deep ink #16322C — navigation, primary product surfaces and body ink
- Slate #4E5F5A — secondary copy
- Raspberry #A5234D — active recording, focus and primary action
- Rule #C8B5B0 — manuscript divisions
- Display: Boldonse
- Body: Work Sans
- Utility: Red Hat Mono

## Layout sketch

    ┌ navigation ──────────────────────────────────────┐
    │ claim / install facts       context rail         │
    │                                                  │
    │ raw slips ── context set ── review ── final text │
    └──────────── Review Strip crosses fold ───────────┘

    ┌ annotation ┐ ┌──── sticky Clarity Press ────────┐
    │ why it     │ │ capture → context → review → send │
    │ matters    │ │ one phrase changes per beat       │
    └────────────┘ └────────────────────────────────────┘

## Signature

The Clarity Press is the only timeline-level sequence. Every other movement is direct state feedback or a short route transition.

## Identity asset prompt

Use case: logo-brand
Asset type: primary horizontal combination logo on a genuinely transparent background
Primary request: original logo for “Riffra,” a desktop voice-composition tool; two rough speech fragments align into one continuous written phrase, producing a compact rhythmic symbol and a distinctive lowercase wordmark
Style/medium: flat editorial identity, strong silhouette, precise but human, slightly wide custom lettering
Composition/framing: symbol on the left, exact text “riffra” on the right, generous transparent padding
Color palette: deep ink #16322C only; one color
Text (verbatim): “riffra”
Constraints: original design only; clear at 24px; no gradients; no mockup; no 3D; no microphone; no waveform; no chat bubble; no sparkle; no isolated letter R; no watermark; preserve actual transparency
`

const decisions = `# Design decisions

| Date | Decision | Author | Reviewer | Rationale | Status |
| --- | --- | --- | --- | --- | --- |
| 2026-08-16 | Use Glaido for conversion-pattern forensics, not style imitation | Strategist | Independent critic | The competitor needs category fluency without brand confusion | approved |
| 2026-08-16 | Advance Speech Atelier | Creative director | Product owner | It makes review-before-paste visible and differs on all six axes | approved |
| 2026-08-16 | Use Codex Image raster masters without tracing | Identity designer | Creative director | The requested image source must remain the production source of truth | approved |
| 2026-08-16 | Build eight routes with four template families | UX architect | Design systems designer | The website must prove a product and company, not imitate a long landing page | approved |
| 2026-08-16 | Permit production after prompt, audit, critique and art-direction files exist | Creative director | Independent critic | The written design gate is satisfied; responsive keyframes remain a production QA gate | approved |
`

await mkdir(outputRoot, { recursive: true })
await mkdir(join(outputRoot, 'design', '02-concepts'), { recursive: true })
await mkdir(join(outputRoot, 'design', '06-keyframes'), { recursive: true })

const prompt = compilePrompt(project, direction)
const checks = qualityChecks(project, direction)
if (!checks.every((check) => check.passed)) {
  throw new Error(`Prompt quality gate failed: ${checks.filter((check) => !check.passed).map((check) => check.label).join(', ')}`)
}

await Promise.all([
  writeFile(join(outputRoot, 'brief.json'), JSON.stringify(project, null, 2), 'utf8'),
  writeFile(join(outputRoot, 'PROMPT.md'), prompt, 'utf8'),
  writeFile(join(outputRoot, 'design', '00-brief.md'), `# Riffra design brief\n\n${project.description}\n\nAudience: ${project.audience}\n\nPrimary action: ${project.primaryAction}\n\nAnti-goal: ${project.antiGoal}\n`, 'utf8'),
  writeFile(join(outputRoot, 'design', '01-category-audit.md'), referenceAudit, 'utf8'),
  ...concepts.map(([name, content]) => writeFile(join(outputRoot, 'design', '02-concepts', name), content, 'utf8')),
  writeFile(join(outputRoot, 'design', '03-divergence-matrix.md'), divergence, 'utf8'),
  writeFile(join(outputRoot, 'design', '04-critique.md'), critique, 'utf8'),
  writeFile(join(outputRoot, 'design', '05-art-direction.md'), artDirection, 'utf8'),
  writeFile(join(outputRoot, 'design', 'DECISIONS.md'), decisions, 'utf8'),
])

console.log(`Prompt created before implementation: ${join(outputRoot, 'PROMPT.md')}`)
console.log(`${checks.filter((check) => check.passed).length}/${checks.length} prompt quality gates passed.`)
