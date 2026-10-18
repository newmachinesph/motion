import {
  fontPairs,
  mechanics as mechanicCatalog,
  mechanicSpecs,
  palettes,
  sectionSets,
  siteTypes,
  studioRoles,
  targetLabels,
} from './data'
import type {
  CreativeDirection,
  DirectionLock,
  LogoSystem,
  MechanicId,
  ProjectData,
  QualityCheck,
  SiteType,
} from './types'

interface DirectionBlueprint {
  name: string
  descriptor: string
  sites: SiteType[]
  traits: string[]
  palette: number
  fonts: number
  hero: string
  structure: string
  signature: string
  formThesis: string
  topology: string
  gridSystem: string
  imageLanguage: string
  shapeLanguage: string
}

const blueprints: DirectionBlueprint[] = [
  {
    name: 'Evidence Field',
    descriptor: 'A working proof surface with one live signal',
    sites: ['saas', 'docs', 'dashboard', 'nonprofit', 'marketing'],
    traits: ['Precise', 'Technical', 'Human', 'Quiet'],
    palette: 0,
    fonts: 0,
    hero: 'An asymmetric claim-and-evidence split: the promise occupies 5 columns; a live proof artifact occupies 7 and crosses the fold.',
    structure: 'A persistent evidence rail, alternating full-bleed exhibits and narrow explanatory passages. Rules group content; cards are reserved for interactive objects.',
    signature: 'The hero proof artifact progressively resolves from source material into a decision, turning the product mechanism into the memorable moment.',
    formThesis: 'The site behaves like an evidence document: every claim is physically paired with the source that makes it believable.',
    topology: 'split evidence field',
    gridSystem: 'A 5/7 evidence split on a 12-column analytical grid; dense proof rows may switch to a ruled single-column ledger.',
    imageLanguage: 'annotated product evidence, source fragments and precise operational diagrams',
    shapeLanguage: 'square frames, hairline rules, registration marks and almost no radius',
  },
  {
    name: 'Editorial Aperture',
    descriptor: 'Measured editorial space around decisive imagery',
    sites: ['portfolio', 'editorial', 'hospitality', 'ecommerce', 'marketing'],
    traits: ['Editorial', 'Luxurious', 'Quiet', 'Tactile'],
    palette: 1,
    fonts: 1,
    hero: 'A narrow text column opens onto one oversized media aperture; the image edge, not a centered container, establishes the grid.',
    structure: 'Long and short sections alternate like a publication. Captions, folios and running labels connect the page without enclosing everything in cards.',
    signature: 'One image aperture changes crop and scale as the visitor moves from the opening statement into the first substantive story.',
    formThesis: 'The website is edited like a physical issue: scale, crop and caption relationships carry the hierarchy before interface chrome does.',
    topology: 'editorial aperture',
    gridSystem: 'A six-column publication grid with one narrow text measure, oversized media bleeds and deliberate blank columns.',
    imageLanguage: 'decisive art-directed photography with captions, folios and materially different crops',
    shapeLanguage: 'rectangular plates, page edges and rules; no soft app-card vocabulary',
  },
  {
    name: 'Kinetic Index',
    descriptor: 'Type as navigation, motion as punctuation',
    sites: ['event', 'portfolio', 'editorial', 'marketing', 'custom'],
    traits: ['Bold', 'Experimental', 'Editorial', 'Playful'],
    palette: 4,
    fonts: 0,
    hero: 'A left-aligned condensed statement shares the first viewport with a live index of page destinations and one sharply cropped visual fragment.',
    structure: 'Sections are introduced by useful running labels and oversized index words. Content blocks vary in width and alignment but stay on one disciplined rail.',
    signature: 'The active section title transfers between the navigation index and the section header as a shared typographic object.',
    formThesis: 'The page is a navigable index rather than a stack of sections; typography tells visitors where they are and what changes next.',
    topology: 'kinetic typographic index',
    gridSystem: 'A narrow fixed index rail plus a flexible poster field; align by baseline bands rather than equal columns.',
    imageLanguage: 'cropped visual fragments, type-led posters and high-contrast documentary details',
    shapeLanguage: 'oversized letterforms, hard cuts, underlines and one directional notch',
  },
  {
    name: 'Quiet Utility',
    descriptor: 'Low-friction clarity with crafted information density',
    sites: ['docs', 'dashboard', 'saas', 'nonprofit', 'custom'],
    traits: ['Quiet', 'Precise', 'Technical', 'Human'],
    palette: 5,
    fonts: 3,
    hero: 'A compact orientation block sits beside an immediately usable search, command or primary task surface. No atmospheric hero media.',
    structure: 'Stable navigation, strong table and list patterns, narrow reading measures and contextual side notes. Density changes by task rather than by section decoration.',
    signature: 'A single command surface responds to real user intent and previews the exact result before navigation.',
    formThesis: 'The site earns trust by letting visitors do the first meaningful task immediately; visual character lives in the information system.',
    topology: 'task-first utility shell',
    gridSystem: 'A compact 3-zone application shell with a stable rail, elastic work surface and contextual inspector.',
    imageLanguage: 'real task states, tabular evidence, search results and instructional diagrams',
    shapeLanguage: 'compact controls, low radii, strong grouping and no atmospheric containers',
  },
  {
    name: 'Living Model',
    descriptor: 'A product world organized around one inspectable object',
    sites: ['ecommerce', 'saas', 'portfolio', 'custom'],
    traits: ['Experimental', 'Technical', 'Luxurious', 'Bold'],
    palette: 2,
    fonts: 4,
    hero: 'The product object owns two-thirds of the viewport while concise copy and controls occupy a narrow anchored column.',
    structure: 'The same object reappears as detail, diagram and proof. Supporting sections use specimen tables and exploded annotations instead of repetitive feature cards.',
    signature: 'One inspectable model changes state to reveal material, configuration or system behavior; every later section references that same visual grammar.',
    formThesis: 'The object is the navigation system: the website is understood by inspecting one model from progressively more useful angles.',
    topology: 'object-centered stage',
    gridSystem: 'A full-bleed spatial stage with one anchored control column; later bands orbit the object instead of returning to a card grid.',
    imageLanguage: 'one authored object shown as whole, detail, cutaway, configuration and proof',
    shapeLanguage: 'object-derived contours, clipped labels and sparse floating controls',
  },
  {
    name: 'Human Dispatch',
    descriptor: 'A direct, tactile account from the people doing the work',
    sites: ['nonprofit', 'marketing', 'hospitality', 'event', 'portfolio'],
    traits: ['Human', 'Tactile', 'Playful', 'Editorial'],
    palette: 3,
    fonts: 2,
    hero: 'A candid subject or authored illustration interrupts a practical two-column brief: what happens, who it helps and what to do now.',
    structure: 'Dispatch-like entries mix portraits, field notes, proof figures and concrete next steps. The rhythm feels assembled but every offset is deterministic.',
    signature: 'A margin note written in the voice of a real participant travels between image and proof, tying emotional and factual content together.',
    formThesis: 'The website reads as a dispatch from the work itself; institutional language is always interrupted by a specific human detail.',
    topology: 'assembled field dispatch',
    gridSystem: 'A loose four-column notebook grid with alternating full-width dispatches, narrow notes and inset proof blocks.',
    imageLanguage: 'candid credited photographs, scans, marginal notes and working artifacts',
    shapeLanguage: 'paper edges, tape-like anchors, stamps and human offsets used with restraint',
  },
  {
    name: 'Ritual Sequence',
    descriptor: 'A sensory sequence organized around anticipation',
    sites: ['hospitality', 'event', 'ecommerce', 'portfolio'],
    traits: ['Luxurious', 'Tactile', 'Quiet', 'Human'],
    palette: 1,
    fonts: 3,
    hero: 'A restrained invitation and booking action sit against an off-axis cinematic plate, leaving a deliberate band of unused space for anticipation.',
    structure: 'The page moves through arrival, detail, ritual and reservation. Media proportions change with the story instead of repeating one gallery grid.',
    signature: 'The transition from arrival to experience uses one slow aperture reveal; all transactional controls remain immediate and still.',
    formThesis: 'The page follows the order a guest experiences the place, so the conversion arrives as the natural final step of the ritual.',
    topology: 'cinematic ritual sequence',
    gridSystem: 'A scene-based vertical sequence with changing media ratios, one quiet booking rail and intentional pauses between acts.',
    imageLanguage: 'cinematic environmental frames, tactile close details and restrained human presence',
    shapeLanguage: 'soft apertures, generous unboxed space and one recurring threshold line',
  },
  {
    name: 'System Cutaway',
    descriptor: 'Technical structure exposed without dashboard theatre',
    sites: ['saas', 'docs', 'dashboard', 'custom'],
    traits: ['Technical', 'Precise', 'Experimental', 'Bold'],
    palette: 14,
    fonts: 5,
    hero: 'A cutaway diagram occupies the right eight columns; the left four state the hard problem, the operating principle and one action.',
    structure: 'Full-width system diagrams alternate with compact evidence rows. Mono labels encode state and provenance, never decoration.',
    signature: 'The primary diagram exposes one hidden system relationship through a short, ordered state change that remains intelligible as a still frame.',
    formThesis: 'The interface is a cutaway: it reveals the mechanism normally hidden behind the product claim and makes that mechanism the visual identity.',
    topology: 'technical system cutaway',
    gridSystem: 'An 8/4 engineering plate that can collapse into diagram, legend and evidence bands; grid lines remain functional.',
    imageLanguage: 'exploded diagrams, connected system states and labeled mechanism details',
    shapeLanguage: 'orthogonal paths, brackets, node joints and measured technical labels',
  },
  {
    name: 'Modular Broadcast',
    descriptor: 'A bright graphic broadcast built from modular headlines and live notices',
    sites: ['event', 'editorial', 'marketing', 'nonprofit', 'custom'],
    traits: ['Bold', 'Playful', 'Experimental', 'Human'],
    palette: 16,
    fonts: 6,
    hero: 'The first viewport behaves like a public notice wall: one monumental message, a compact facts panel and a direct action share the frame without a conventional hero image.',
    structure: 'Modular bands change scale and color by information priority. Programme, proof and actions interlock like a broadcast package rather than floating as cards.',
    signature: 'A live information strip re-composes between page contexts while keeping the same factual payload and reading order.',
    formThesis: 'The identity is a public broadcast system: bold information modules make participation feel immediate and collective.',
    topology: 'modular public broadcast',
    gridSystem: 'A responsive block grid based on 2:3 and 3:5 modules; bands may span the viewport and intentionally break the content rail.',
    imageLanguage: 'direct flash photography, flat graphic fields and oversized factual type',
    shapeLanguage: 'rectangular notices, cut corners and full-bleed color blocks with no shadows',
  },
  {
    name: 'Soft Play Lab',
    descriptor: 'An approachable interactive world with tactile, characterful controls',
    sites: ['saas', 'ecommerce', 'event', 'nonprofit', 'custom'],
    traits: ['Playful', 'Human', 'Tactile', 'Experimental'],
    palette: 12,
    fonts: 11,
    hero: 'A compact plain-language promise is surrounded by two or three functional playful objects that demonstrate the offer when touched, dragged or selected.',
    structure: 'Chunked scenes use varied islands, guided paths and small moments of discovery. Practical copy stays in calm reading blocks between interactive clusters.',
    signature: 'One friendly object reacts to a meaningful user choice and carries that state into the next section.',
    formThesis: 'The product feels learnable because its system is introduced as a set of tactile cause-and-effect relationships.',
    topology: 'playful interactive archipelago',
    gridSystem: 'A six-cell fluid field with controlled overlaps and curved paths; mobile becomes a guided single-path sequence.',
    imageLanguage: 'soft dimensional objects, cut-paper illustrations and candid contextual photography',
    shapeLanguage: 'rounded asymmetric islands, pill-like controls only where tactile, and expressive connector paths',
  },
  {
    name: 'Institutional Standard',
    descriptor: 'Calm public authority expressed through disciplined information design',
    sites: ['nonprofit', 'docs', 'dashboard', 'saas', 'marketing'],
    traits: ['Precise', 'Quiet', 'Human', 'Technical'],
    palette: 15,
    fonts: 13,
    hero: 'A restrained title, service statement and action sit above a useful directory or status summary; there is no oversized marketing poster.',
    structure: 'Clear page titles, section numbering, service indexes, evidence tables and accessible notices create a durable civic rhythm.',
    signature: 'The service index adapts to visitor intent and previews the exact next step without animation theatre.',
    formThesis: 'Trust comes from the site behaving like a dependable public standard: plain language, legible structure and visible accountability.',
    topology: 'institutional service directory',
    gridSystem: 'An eight-column rational grid with a two-column label rail and six-column reading surface; mobile preserves labels above content.',
    imageLanguage: 'documentary service photography, sourced charts and plain operational artifacts',
    shapeLanguage: 'square modules, accessible notice bars, restrained borders and no decorative gradients',
  },
  {
    name: 'Illustrated Folklore',
    descriptor: 'An authored story world built from illustration, symbols and episodic scenes',
    sites: ['hospitality', 'event', 'nonprofit', 'editorial', 'ecommerce'],
    traits: ['Human', 'Playful', 'Tactile', 'Editorial'],
    palette: 13,
    fonts: 8,
    hero: 'An original illustrated scene frames the factual proposition and action as part of the world, with a visible foreground, middle distance and horizon.',
    structure: 'Episodic chapters alternate illustration, practical information and proof. Recurring drawn motifs orient rather than merely decorate.',
    signature: 'A recurring character or object changes role across three scenes, revealing the process or visitor journey.',
    formThesis: 'The website communicates through an authored visual narrative whose symbols belong to this subject and nowhere else.',
    topology: 'episodic illustrated journey',
    gridSystem: 'A storybook spread system with full-scene plates, inset text pages and occasional edge-to-edge transitions.',
    imageLanguage: 'bespoke editorial illustration with repeatable characters, places and subject-specific props',
    shapeLanguage: 'drawn frames, irregular silhouettes and a controlled set of symbolic motifs',
  },
  {
    name: 'Data Mosaic',
    descriptor: 'Dense intelligence made navigable through unequal, live information tiles',
    sites: ['dashboard', 'saas', 'docs', 'editorial', 'custom'],
    traits: ['Technical', 'Bold', 'Precise', 'Experimental'],
    palette: 11,
    fonts: 10,
    hero: 'The opening is a useful mosaic of one dominant live signal, two supporting comparisons and a compact decision control; copy is integrated into the information field.',
    structure: 'Unequal data modules resize by consequence, not by type. Narrative explanations interrupt the mosaic at decision boundaries.',
    signature: 'Selecting one signal reorganizes the mosaic around its consequences while preserving keyboard order and a stable still state.',
    formThesis: 'Hierarchy is data behavior made visible: the most consequential information physically owns the most space.',
    topology: 'adaptive information mosaic',
    gridSystem: 'A dense CSS subgrid of unequal 1x1, 2x1 and 2x2 modules with strict alignment and route-specific density.',
    imageLanguage: 'code-native charts, real tables, state comparisons and compact contextual screenshots',
    shapeLanguage: 'tight modular frames, square status chips and one high-contrast selection outline',
  },
  {
    name: 'Monolithic Poster',
    descriptor: 'A single typographic gesture with unapologetic scale and minimal interface chrome',
    sites: ['portfolio', 'event', 'editorial', 'marketing', 'custom'],
    traits: ['Bold', 'Editorial', 'Experimental', 'Quiet'],
    palette: 14,
    fonts: 9,
    hero: 'One phrase fills most of the opening canvas while navigation, factual description and action occupy precise edge positions like production credits.',
    structure: 'Pages alternate monumental type fields with small, exact evidence plates. There are very few components and no decorative section wrappers.',
    signature: 'The opening phrase changes typographic width once to reveal a hidden image or factual layer beneath it.',
    formThesis: 'One unmistakable typographic gesture carries the identity; everything else is edited down to give it consequence.',
    topology: 'full-canvas typographic poster',
    gridSystem: 'A viewport canvas aligned to edge zones and baseline anchors rather than a centered max-width container.',
    imageLanguage: 'single decisive images, production stills and extreme crops used as interruptions',
    shapeLanguage: 'letterform silhouettes, hard viewport edges and almost no component containers',
  },
  {
    name: 'Spatial Exhibition',
    descriptor: 'A navigable spatial field that treats content as rooms and exhibits',
    sites: ['portfolio', 'ecommerce', 'hospitality', 'event', 'custom'],
    traits: ['Experimental', 'Luxurious', 'Technical', 'Tactile'],
    palette: 2,
    fonts: 4,
    hero: 'A spatial overview gives visitors a meaningful set of places or objects to enter while a fixed legend states the proposition and action.',
    structure: 'Content is grouped into rooms, planes or exhibits with clear exits and an always-available linear alternative. Detail pages change camera logic rather than repeating the home composition.',
    signature: 'Entering one exhibit shifts scale and viewpoint to reveal detail; navigation state remains explicit and reversible.',
    formThesis: 'The website is understood by moving through a spatial model whose architecture mirrors the subject.',
    topology: 'spatial exhibition map',
    gridSystem: 'A full-viewport spatial canvas with a fixed legend and authored scene bounds; the accessible fallback is a linear exhibit index.',
    imageLanguage: '3D spaces, object photography, plan views and precise exhibit labels',
    shapeLanguage: 'planes, portals, depth layers and subject-derived spatial boundaries',
  },
  {
    name: 'Material Catalogue',
    descriptor: 'A tactile product or craft catalogue organized by material facts',
    sites: ['ecommerce', 'portfolio', 'hospitality', 'editorial', 'marketing'],
    traits: ['Tactile', 'Luxurious', 'Precise', 'Quiet'],
    palette: 8,
    fonts: 12,
    hero: 'A close material specimen and a compact catalogue record share the opening; provenance, dimensions or process details appear before lifestyle atmosphere.',
    structure: 'Specimen sheets, process sequences, maker notes and comparison tables vary between full plates and tight records.',
    signature: 'A specimen shifts from macro texture to contextual scale while its factual annotation remains fixed.',
    formThesis: 'Material evidence—not luxury styling—creates desire by making construction, provenance and use inspectable.',
    topology: 'specimen-led catalogue',
    gridSystem: 'A five-column catalogue grid with two-column records and three-column specimen plates; detail pages may become vertical sample sheets.',
    imageLanguage: 'macro material studies, process photography, measured product views and maker documentation',
    shapeLanguage: 'sample cards, crop marks, measured rules and material-derived edge treatments',
  },
]

const hashString = (value: string) => {
  let hash = 2166136261
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

const randomFrom = (seed: number) => {
  let value = seed >>> 0
  return () => {
    value += 0x6d2b79f5
    let result = value
    result = Math.imul(result ^ (result >>> 15), result | 1)
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61)
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296
  }
}

const projectKey = (project: ProjectData, seed: number) =>
  `${project.siteType}|${project.traits.join(',')}|${project.mediaSubject}|${project.motionIntensity}|${project.categoryCliches}|${project.heroEvidence}|${seed}`

const templateRiskProfiles: Record<string, { description: string; tags: string[] }> = {
  'Evidence Field': { description: 'Can collapse into the familiar SaaS broadsheet: hairline rules, mono labels and a dashboard-shaped proof panel with no real product depth.', tags: ['broadsheet', 'hairline', 'mono label', 'dashboard', 'evidence field'] },
  'Editorial Aperture': { description: 'Can become a warm, tasteful editorial template whose oversized typography and soft palette say more than the subject.', tags: ['warm cream', 'editorial', 'oversized display', 'terracotta', 'luxury'] },
  'Kinetic Index': { description: 'Can become an awards-site poster where giant condensed type and animated labels overpower comprehension and evidence.', tags: ['poster', 'giant type', 'condensed', 'kinetic type', 'oversized'] },
  'Quiet Utility': { description: 'Can become anonymous product documentation: competent, dense and interchangeable unless the primary task is unusually specific.', tags: ['generic utility', 'dashboard', 'documentation', 'anonymous'] },
  'Living Model': { description: 'Can become a floating 3D-object spectacle with tiny supporting copy and no credible product or commercial explanation.', tags: ['3d', 'floating object', 'spatial', 'spectacle'] },
  'Human Dispatch': { description: 'Can become a scrapbook editorial cliché built from taped notes, stamps and staged documentary imagery.', tags: ['scrapbook', 'editorial', 'tape', 'stamp', 'warm cream'] },
  'Ritual Sequence': { description: 'Can become a beige luxury-hospitality moodboard where slow reveals and atmospheric imagery postpone useful facts.', tags: ['beige', 'luxury', 'editorial', 'slow reveal', 'warm cream'] },
  'System Cutaway': { description: 'Can become generic technical theatre: connected nodes, pseudo-diagrams and mono annotations that explain nothing real.', tags: ['system diagram', 'connected nodes', 'mono label', 'technical', 'dashboard'] },
  'Modular Broadcast': { description: 'Can become a fashionable poster system of loud blocks and oversized notices with little hierarchy between messages.', tags: ['poster', 'oversized', 'block grid', 'kinetic type'] },
  'Soft Play Lab': { description: 'Can become the rounded pastel SaaS archipelago: floating islands, pill controls and friendly objects detached from product truth.', tags: ['pastel', 'floating island', 'rounded', 'pill', 'soft saas'] },
  'Institutional Standard': { description: 'Can become a generic broadsheet or civic portal whose numbering, rules and directories function as decorative credibility.', tags: ['broadsheet', 'numbering', 'hairline', 'institutional', 'directory'] },
  'Illustrated Folklore': { description: 'Can become a decorative storybook world whose characters add charm without clarifying the offer or action.', tags: ['illustration', 'storybook', 'decorative', 'character'] },
  'Data Mosaic': { description: 'Can become a bento dashboard of unequal cards, invented metrics and neon selection states masquerading as product depth.', tags: ['bento', 'dashboard', 'metric card', 'dark', 'neon'] },
  'Monolithic Poster': { description: 'Can become a one-line portfolio poster where enormous display type consumes the viewport and the actual proposition disappears.', tags: ['poster', 'oversized display', 'giant type', 'kinetic type'] },
  'Spatial Exhibition': { description: 'Can become an inaccessible WebGL showroom whose camera movement and floating labels substitute for information architecture.', tags: ['3d', 'webgl', 'floating', 'spatial', 'showroom'] },
  'Material Catalogue': { description: 'Can become a tasteful specimen catalogue of crop marks, serif type and neutral surfaces that could sell anything premium.', tags: ['specimen', 'crop mark', 'luxury', 'editorial', 'neutral'] },
}

const templateRiskFor = (blueprint: DirectionBlueprint) => templateRiskProfiles[blueprint.name] ?? {
  description: 'Can become a polished category shell if its visual devices are not tied to a specific product fact and user decision.',
  tags: ['generic', 'template'],
}

const directionScore = (blueprint: DirectionBlueprint, project: ProjectData, noise: number) => {
  const site = blueprint.sites.includes(project.siteType) ? 3 : 0
  const traits = blueprint.traits.filter((trait) => project.traits.includes(trait)).length * 1.2
  const media =
    project.mediaSubject === 'physical' && ['Living Model', 'Spatial Exhibition', 'Material Catalogue'].includes(blueprint.name)
      ? 2
      : project.mediaSubject === 'product' && ['Evidence Field', 'System Cutaway', 'Data Mosaic', 'Soft Play Lab'].includes(blueprint.name)
        ? 2
        : project.mediaSubject === 'narrative' && ['Human Dispatch', 'Ritual Sequence', 'Illustrated Folklore'].includes(blueprint.name)
          ? 2
          : 0
  const clichéText = project.categoryCliches.toLowerCase()
  const clichéPenalty = templateRiskFor(blueprint).tags.filter((tag) => clichéText.includes(tag)).length * 2.4
  return site + traits + media + noise * 6 - clichéPenalty
}

const motionProfile = (project: ProjectData, blueprint: DirectionBlueprint) => {
  if (project.accessibility === 'AAA' || project.network === 'constrained' || project.motionIntensity <= 2) {
    return 'Restrained: direct state feedback only, 120–220ms, no large-area scroll motion.'
  }
  if (project.motionIntensity >= 8) {
    return `Cinematic but singular: ${blueprint.signature} carries the only timeline-level motion; all controls stay under 180ms.`
  }
  if (project.motionIntensity >= 5) {
    return 'Expressive utility: one choreographed centerpiece, 420–680ms entrances, tactile 120–180ms controls.'
  }
  return 'Quiet: short opacity and transform transitions, no pinning, no ambient loops.'
}

const densityFor = (blueprint: DirectionBlueprint): CreativeDirection['density'] => {
  if (['Quiet Utility', 'System Cutaway', 'Data Mosaic', 'Institutional Standard'].includes(blueprint.name)) return 'dense'
  if (['Editorial Aperture', 'Ritual Sequence', 'Monolithic Poster', 'Spatial Exhibition', 'Material Catalogue'].includes(blueprint.name)) return 'airy'
  return 'balanced'
}

const automaticLogoStyles: Record<SiteType, LogoSystem['style']> = {
  marketing: 'combination',
  saas: 'symbol',
  ecommerce: 'wordmark',
  portfolio: 'monogram',
  editorial: 'wordmark',
  docs: 'symbol',
  dashboard: 'responsive',
  event: 'responsive',
  hospitality: 'monogram',
  nonprofit: 'combination',
  custom: 'combination',
}

const logoMotifs: Record<SiteType, string[]> = {
  marketing: ['an exchange between two unequal parts', 'a threshold made from offset planes', 'a directional handoff with a visible return path'],
  saas: ['a source path resolving into one decision', 'two linked states sharing one trace', 'a system boundary with one verified passage'],
  ecommerce: ['a maker registration notch', 'a material joint reduced to one counterform', 'a product silhouette expressed through spacing rather than illustration'],
  portfolio: ['a monogram with one interrupted stroke', 'initials sharing a single counterform', 'a compact maker stamp built on one unusual axis'],
  editorial: ['a masthead with one editorial cut', 'a reading rhythm expressed by unequal rules', 'a ligature that behaves like a page turn'],
  docs: ['an opening bracket becoming a route', 'a reference anchor with one navigable branch', 'a modular sign built from code punctuation without resembling a terminal icon'],
  dashboard: ['an operational frame with one live edge', 'a status change encoded in negative space', 'a compact control-state sign that remains legible at 16px'],
  event: ['two time intervals colliding', 'a venue boundary opened by sound or movement', 'a date-driven modular sign that can change across programme tracks'],
  hospitality: ['a location contour meeting a threshold', 'a room key reduced to an architectural counterform', 'an arrival path folded into the initials'],
  nonprofit: ['a reciprocal handoff between unequal parts', 'a shared resource circulating through one open boundary', 'a community network expressed without hands, hearts or generic leaves'],
  custom: ['the core content object reduced to one structural relationship', 'a distinctive constraint from the brief translated into negative space', 'one repeatable gesture taken from how the subject actually works'],
}

const initialsFor = (name: string) => name.trim().split(/\s+/).filter(Boolean).slice(0, 2).map((word) => word[0]?.toUpperCase()).join('') || 'ID'

const buildLogoSystem = (project: ProjectData, direction: DirectionBlueprint, seed: number): LogoSystem => {
  const style = project.logoStyle === 'auto' ? automaticLogoStyles[project.siteType] : project.logoStyle
  const motifs = logoMotifs[project.siteType]
  const motif = project.logoBrief.trim() || motifs[Math.abs(seed + direction.name.length) % motifs.length]
  const initials = initialsFor(project.businessName)
  const constructions: Record<LogoSystem['style'], string> = {
    wordmark: `Customize the ${direction.name} display treatment with one restrained intervention tied to the concept; preserve the full name and test the wordmark before considering a symbol.`,
    monogram: `Construct ${initials} from a shared grid and one meaningful counterform; it must read as ${initials} at 24px without enclosing the letters in a generic badge.`,
    symbol: 'Reduce the concept to one ownable silhouette built from two or three geometric operations; it must not depend on the name to be recognized at favicon scale.',
    combination: `Pair one compact symbol with an optically adjusted ${project.businessName || 'brand'} wordmark; the symbol and wordmark must also work independently.`,
    responsive: 'Build a related wide lockup, compact lockup and 16px micro-mark from the same construction rule rather than shrinking one complex logo.',
  }
  return {
    style,
    concept: project.brandMode === 'existing' ? `Preserve the supplied identity: ${motif}` : `Express ${motif}.`,
    construction: constructions[style],
    lockups: 'Deliver primary horizontal, stacked or compact where appropriate, symbol-only, one-color, reversed, favicon and social-avatar lockups.',
    usage: 'Define clear space, minimum size, background control, incorrect uses and optical alignment with navigation type.',
  }
}

const toDirection = (
  blueprint: DirectionBlueprint,
  project: ProjectData,
  index: number,
  seed: number,
): CreativeDirection => ({
  id: `${seed}-${index}-${blueprint.name.toLowerCase().replace(/\s+/g, '-')}`,
  name: blueprint.name,
  descriptor: blueprint.descriptor,
  rationale: `${project.businessName || 'This project'} needs to feel ${project.traits.slice(0, 3).join(', ').toLowerCase() || 'specific and credible'}. ${blueprint.name} translates that into a ${blueprint.formThesis.toLowerCase()}`,
  palette: palettes[blueprint.palette % palettes.length],
  fonts: fontPairs[blueprint.fonts % fontPairs.length],
  hero: blueprint.hero,
  structure: blueprint.structure,
  signature: blueprint.signature,
  motionProfile: motionProfile(project, blueprint),
  density: densityFor(blueprint),
  formThesis: blueprint.formThesis,
  topology: blueprint.topology,
  gridSystem: blueprint.gridSystem,
  imageLanguage: blueprint.imageLanguage,
  shapeLanguage: blueprint.shapeLanguage,
  templateRisk: templateRiskFor(blueprint).description,
  logo: buildLogoSystem(project, blueprint, seed + index),
})

export const generateDirections = (project: ProjectData, seed = project.seed): CreativeDirection[] => {
  const random = randomFrom(hashString(projectKey(project, seed)))
  const ranked = blueprints
    .map((blueprint) => ({ blueprint, score: directionScore(blueprint, project, random()) }))
    .sort((a, b) => b.score - a.score)
  const count = Math.max(3, Math.min(5, project.conceptCount || 3))
  const selected: DirectionBlueprint[] = []

  while (selected.length < count && ranked.length) {
    const choice = ranked
      .map((candidate) => {
        const minimumDistance = selected.length
          ? Math.min(...selected.map((current) => [
              current.palette !== candidate.blueprint.palette,
              current.fonts !== candidate.blueprint.fonts,
              current.topology !== candidate.blueprint.topology,
              current.imageLanguage !== candidate.blueprint.imageLanguage,
              current.shapeLanguage !== candidate.blueprint.shapeLanguage,
            ].filter(Boolean).length))
          : 5
        return { ...candidate, adjusted: candidate.score + minimumDistance * 1.8 }
      })
      .sort((a, b) => b.adjusted - a.adjusted)[0]
    selected.push(choice.blueprint)
    ranked.splice(ranked.findIndex((candidate) => candidate.blueprint.name === choice.blueprint.name), 1)
  }

  return selected.map((blueprint, index) => toDirection(blueprint, project, index, seed))
}

export const rerollDirection = (
  project: ProjectData,
  current: CreativeDirection,
  locks: DirectionLock[],
  seed: number,
) => {
  const next = generateDirections({ ...project, seed }, seed)[0]
  return {
    ...next,
    palette: locks.includes('palette') ? current.palette : next.palette,
    fonts: locks.includes('type') ? current.fonts : next.fonts,
    logo: locks.includes('identity') ? current.logo : next.logo,
    hero: locks.includes('composition') ? current.hero : next.hero,
    structure: locks.includes('composition') ? current.structure : next.structure,
    formThesis: locks.includes('composition') ? current.formThesis : next.formThesis,
    topology: locks.includes('composition') ? current.topology : next.topology,
    gridSystem: locks.includes('composition') ? current.gridSystem : next.gridSystem,
    imageLanguage: locks.includes('composition') ? current.imageLanguage : next.imageLanguage,
    shapeLanguage: locks.includes('composition') ? current.shapeLanguage : next.shapeLanguage,
    templateRisk: locks.includes('composition') ? current.templateRisk : next.templateRisk,
    signature: locks.includes('motion') ? current.signature : next.signature,
    motionProfile: locks.includes('motion') ? current.motionProfile : next.motionProfile,
  }
}

export interface MechanicRecommendation {
  id: MechanicId
  recommended: boolean
  reason: string
}

export const recommendMechanics = (project: ProjectData): MechanicRecommendation[] => {
  const constrained = project.network === 'constrained' || project.accessibility === 'AAA'
  return [
    { id: 'micro', recommended: project.motionIntensity > 1, reason: 'Every interactive site benefits from immediate, accessible feedback.' },
    { id: 'transitions', recommended: project.pageMode === 'multi' && project.motionIntensity >= 3, reason: 'Useful when visitors move between related pages or cases.' },
    { id: 'parallax', recommended: !constrained && project.motionIntensity >= 5 && ['portfolio', 'editorial', 'event', 'hospitality'].includes(project.siteType), reason: 'Fits image-led storytelling when depth supports the composition.' },
    { id: 'scrollVideo', recommended: !constrained && project.motionIntensity >= 6 && ['product', 'transformation', 'narrative'].includes(project.mediaSubject), reason: 'Best when a process or change is easier to understand as a sequence.' },
    { id: 'threeD', recommended: !constrained && project.motionIntensity >= 6 && project.mediaSubject === 'physical', reason: 'Only recommended when spatial inspection changes understanding or purchase confidence.' },
    { id: 'scrollytelling', recommended: !constrained && project.motionIntensity >= 7 && ['narrative', 'transformation', 'product'].includes(project.mediaSubject), reason: 'Use for an ordered story with distinct beats, not as site-wide decoration.' },
    { id: 'kineticType', recommended: project.motionIntensity >= 6 && project.traits.some((trait) => ['Bold', 'Experimental', 'Editorial'].includes(trait)), reason: 'Works when typography is part of the brand voice and stays readable.' },
  ]
}

const targetInstructions = (project: ProjectData) => {
  const conditionalLibraries = [
    project.mechanics.includes('scrollytelling') ? 'Use GSAP ScrollTrigger only for the pinned narrative.' : '',
    project.mechanics.includes('threeD') ? 'Use React Three Fiber in a lazy-loaded client island for the 3D scene.' : '',
  ].filter(Boolean)

  const instructions: Record<ProjectData['outputTarget'], string[]> = {
    framer: [
      'Build this in Framer with semantic stacks, grids, reusable components and named variants.',
      'Use Framer CMS for repeatable content and native scroll effects for ordinary reveals. Use code components only when the required behavior cannot be expressed natively.',
      'Name layers and component variants by function. Create desktop, tablet and phone layouts; do not rely on automatic stacking for the primary composition.',
    ],
    code: [
      'Use the latest stable Next.js App Router, TypeScript and Tailwind CSS available at implementation time.',
      'Keep the page server-rendered and isolate interactive client components to leaf islands. Use Motion for UI state and layout transitions.',
      ...conditionalLibraries,
    ],
    lovable: [
      'Build one complete responsive surface at a time. Preserve the design tokens and section contracts between prompts.',
      'Use React, TypeScript and Tailwind. Create reusable components rather than one monolithic page component.',
      'Do not substitute a default component-library aesthetic for the specified type, spacing, radius and surface rules.',
    ],
    figma: [
      'Create a variables-first Figma system with color, type, spacing, radius and motion tokens before composing screens.',
      'Build desktop 1440px and mobile 390px frames plus component variants for hover, focus, active, disabled, loading, error and success.',
      'Keep every content string editable and every visual payload in a named, replaceable frame.',
    ],
    webflow: [
      'Build with Webflow components, variables and CMS collections. Keep class naming semantic and component-scoped.',
      'Use native interactions for state changes and reveals; introduce custom code only for the named signature mechanic.',
      'Author desktop, tablet and mobile compositions explicitly and verify CMS content at longest realistic lengths.',
    ],
    html: [
      'Build with semantic HTML, modern CSS, custom properties and minimal progressive JavaScript.',
      'Use native CSS transitions and scroll-driven animation where supported; every enhancement must fail open.',
      'No framework, no external component kit and no decorative dependency that does not serve the signature mechanic.',
    ],
  }
  return instructions[project.outputTarget]
}

const sectionPurpose = (section: string, project: ProjectData) => {
  const name = section.toLowerCase()
  if (name.includes('hero') || name.includes('opening')) return `State what ${project.businessName} does, who it is for and why it is credible within the first viewport. Place “${project.primaryAction}” as the single dominant action.`
  if (name.includes('trust') || name.includes('proof') || name.includes('impact')) return `Turn “${project.proof}” into concrete, sourceable evidence. Do not invent logos, reviews, metrics or people.`
  if (name.includes('navigation') || name.includes('masthead')) return 'Orient visitors immediately, expose the primary destinations and keep the main action available without overwhelming the opening composition.'
  if (name.includes('footer')) return 'Act as a complete navigation surface: key routes, contact, legal, accessibility controls and a concise restatement of the primary action.'
  if (name.includes('faq')) return 'Resolve the four to six objections that could prevent the primary action. Write every answer in full.'
  if (name.includes('pricing') || name.includes('tickets') || name.includes('booking')) return 'Make the commercial decision legible: scope, price or booking expectation, inclusions, constraints and a complete success/error path.'
  if (name.includes('diagram') || name.includes('demo') || name.includes('workspace')) return 'Explain the hardest concept with an authored interface or diagram that remains understandable as a still image.'
  return `Advance the visitor from understanding to confidence using content specific to ${project.businessName}; give this section its own visual payload and interaction state.`
}

const parseContent = (value: string) =>
  value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.split('|').map((part) => part.trim()))

const parseRoutePlan = (value: string) =>
  value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [path = '', name = '', job = '', payload = ''] = line.split('|').map((part) => part.trim())
      return { path, name, job, payload }
    })

const performanceBudget = (project: ProjectData) => {
  if (project.network === 'constrained') return '≤700KB initial transfer; no autoplay media; static fallback is the primary mobile experience.'
  if (project.network === 'fast' && project.motionIntensity >= 8) return '≤2.5MB initial transfer; defer all signature media until interaction or viewport proximity.'
  return '≤1.4MB initial transfer; critical CSS and hero media prioritized; heavy mechanics lazy-loaded below the fold.'
}

const mediaPlans: Record<SiteType, string[]> = {
  marketing: [
    'Hero proof plate — one image, illustration or working artifact that makes the offer concrete; preserve copy-safe negative space for both wide and narrow crops.',
    'Method evidence — a diagram, annotated process or before/after pair that explains how the result is produced.',
    'Case-study payload — one sourceable outcome, real interface or authored photograph per featured case; no generic mockup collage.',
  ],
  saas: [
    'Hero product artifact — a legible interface state or system diagram showing the core mechanism, not a perspective dashboard collage.',
    'Workflow sequence — three to five connected states using one consistent data example and realistic content lengths.',
    'Proof payload — source-linked evidence, audit trail or comparison rendered as a still-readable interface before animation.',
  ],
  ecommerce: [
    'Campaign plate — a product-led composition with a deliberate crop job for desktop and mobile; the product remains identifiable without copy.',
    'Material detail — macro or cutaway media that answers a purchase question about construction, scale, texture or use.',
    'Merchandising set — varied but related product frames with consistent lighting and no duplicated placeholder image.',
  ],
  portfolio: [
    'Opening project plate — one decisive work sample with an explicit crop relationship to the opening statement.',
    'Case-study evidence — process, final outcome and contextual application; each image advances the project story.',
    'Practice detail — an authored studio, material or working image that adds a human fact rather than atmosphere alone.',
  ],
  editorial: [
    'Lead-story image — art-directed for headline coexistence with distinct desktop and mobile focal points.',
    'Feature package — a varied sequence of portrait, landscape and detail crops with captions and source credit.',
    'Data or context plate — a code-native chart, map or annotated document that adds reporting value.',
  ],
  docs: [
    'Quickstart artifact — a complete code or command example with expected output visible in the first useful state.',
    'Concept diagram — code-native SVG showing one relationship; it must remain understandable without animation.',
    'State examples — realistic success, empty, loading and error outputs using the same sample domain.',
  ],
  dashboard: [
    'Primary workspace — realistic operational data with the dominant task visible, not a grid of decorative KPIs.',
    'Exception detail — a connected master/detail or timeline state that demonstrates investigation depth.',
    'System states — loading, empty, partial, error and resolved views using stable dimensions and complete copy.',
  ],
  event: [
    'Event identity plate — a bold type, photo or illustration system that keeps date, venue and ticket action legible.',
    'Programme artifact — a useful schedule, track map or time-based index rather than equal speaker cards.',
    'Experience gallery — candid, credited media with varied crop ratios and no invented crowd or sponsor proof.',
  ],
  hospitality: [
    'Arrival plate — one wide environmental image with a location-specific focal point and safe crops for 1440px and 390px.',
    'Human dispatch — one candid, unposed image that shows an activity, ritual or scale relationship.',
    'Tactile detail — one close or overhead image of a material, room, dish or working object with an editorial caption.',
    'Orientation graphic — a code-native map, route, plan or sequence; do not bake labels into generated raster media.',
  ],
  nonprofit: [
    'Mission evidence — a sourced field image or authored illustration attached to one specific programme and caption.',
    'Impact mechanism — a code-native flow or allocation diagram that explains how support becomes an outcome.',
    'Human account — consented, attributed media and a concrete story; never invent a beneficiary portrait or quote.',
  ],
  custom: [
    'Opening payload — one visual object that proves what this site is about and shares the first viewport with the primary action.',
    'Explanatory payload — a code-native diagram, interface, object view or narrative sequence for the hardest concept.',
    'Detail payload — one authored image or illustration that contributes a new fact rather than repeating the opening mood.',
  ],
}

const referenceContract = (project: ProjectData) => {
  const performanceBar = project.referenceStrengths.trim()
  if (!project.references.trim()) return `No visual reference supplied. Use this internal performance bar: ${performanceBar} Derive the identity from the brief and do not imitate a named site.`
  return `${project.references.trim()}\n\nReference performance bar: ${performanceBar}\n\nBefore layout, translate every useful reference into a short “borrow / avoid / adapt” note. Borrow relationships such as hierarchy, pacing, crop behavior or interaction logic; never copy brand identity, text, proprietary assets or a component wholesale. The candidate direction may depart visually, but it may not perform worse than the strongest reference on the named criteria. If it does, reject or mutate the direction—the reference performance bar wins.`
}

const motionHierarchy = (project: ProjectData, direction: CreativeDirection) => {
  if (!project.mechanics.length) return ['There is no timeline-level motion. Use only direct state feedback.']
  const complex = project.mechanics.filter((id) => mechanicCatalog.find((item) => item.id === id)?.cost !== 'light')
  const combined = project.mechanics.includes('scrollytelling') && project.mechanics.includes('kineticType')
  return [
    `The direction signature — ${direction.signature} — is the sole timeline-level centerpiece. Selected mechanics are implementation tools for that same moment, not separate attractions.`,
    complex.length > 1 ? `The ${complex.length} non-light mechanics must share one narrative stage or one visual object. Do not give each mechanic its own showcase section.` : '',
    combined ? 'Kinetic type may introduce, label or conclude the pinned story; it must not become an unrelated second sequence.' : '',
    'If the signature is already clear in a still screenshot, remove secondary movement before adding another effect.',
  ].filter(Boolean)
}

export const qualityChecks = (
  project: ProjectData,
  direction: CreativeDirection | null,
): QualityCheck[] => {
  const complexMechanics = project.mechanics.filter((id) => mechanicCatalog.find((item) => item.id === id)?.cost !== 'light')
  const referencesAreBounded = !project.references.trim() || /\b(borrow|use|keep|avoid|not|adapt|structure|pacing|hierarchy)\b/i.test(project.references)
  const cliches = project.categoryCliches.split(/\n|;/).map((item) => item.trim()).filter(Boolean)
  const restraintIsActionable = project.restraintRule.trim().length >= 50 && /\b(one|only|reserve|quiet|limit|restrain|secondary)\b/i.test(project.restraintRule)
  const benchmarkTerms = ['clarity', 'comprehension', 'product', 'realism', 'hierarchy', 'restraint', 'cohesion', 'conversion', 'mobile']
  const benchmarkCoverage = benchmarkTerms.filter((term) => project.benchmarkCriteria.toLowerCase().includes(term)).length
  const routes = parseRoutePlan(project.pagePlan)
  const pageSystemIsComplete = project.pageMode === 'single' || (
    routes.length >= 5
    && routes.some((route) => route.path === '/')
    && routes.every((route) => route.path && route.name && route.job && route.payload)
    && new Set(routes.map((route) => route.path)).size === routes.length
  )
  const requiredStudioRoles = ['creative-direction', 'art-direction', 'ux-architecture', 'critique', 'design-engineering']
  const studioIsAccountable = project.studioRoles.length >= 7 && requiredStudioRoles.every((role) => project.studioRoles.includes(role as ProjectData['studioRoles'][number]))
  return [
    { label: 'Brief has a job', detail: 'Product, audience and primary action are concrete.', passed: Boolean(project.businessName.trim() && project.description.trim() && project.primaryAction.trim() && project.audience.trim()) },
    { label: 'Direction has a boundary', detail: 'An anti-goal prevents category drift.', passed: project.antiGoal.trim().length >= 20 },
    { label: 'References have intent', detail: 'References say what to borrow, adapt or avoid rather than naming a vibe.', passed: referencesAreBounded },
    { label: 'Reference bar is explicit', detail: 'The strongest reference is translated into performance criteria, not a mood.', passed: project.referenceStrengths.trim().length >= 60 },
    { label: 'Category defaults are vetoed', detail: 'At least three recognizable trend bundles are named before concepts are generated.', passed: cliches.length >= 3 },
    { label: 'Restraint has an owner', detail: 'One focal move is protected and secondary surfaces are instructed to stay quiet.', passed: restraintIsActionable },
    { label: 'Content can shape layout', detail: 'Real content objects and proof are present.', passed: parseContent(project.contentItems).length >= 2 && project.proof.trim().length >= 20 },
    { label: 'First fold proves the subject', detail: 'The exact evidence or product state required in the opening viewport is named.', passed: project.heroEvidence.trim().length >= 60 },
    { label: 'Page system is complete', detail: project.pageMode === 'multi' ? 'Every route has a distinct job and payload.' : 'The single-page narrative has an ordered section plan.', passed: pageSystemIsComplete },
    { label: 'Composition is intentional', detail: 'A coherent direction has been selected.', passed: Boolean(direction) },
    { label: 'Identity has a subject', detail: 'The logo brief names a relationship or rule rooted in this project.', passed: project.logoBrief.trim().length >= 20 },
    { label: 'Identity is buildable', detail: 'Logo form, concept, lockups and usage rules are defined.', passed: Boolean(direction?.logo.style && direction.logo.concept && direction.logo.lockups && direction.logo.usage) },
    { label: 'Motion is accountable', detail: 'Selected mechanics include cost and fallback instructions.', passed: project.mechanics.every((id) => mechanicSpecs[id]?.length > 1) },
    { label: 'Motion has a hierarchy', detail: 'No more than three non-light mechanics compete for the timeline.', passed: complexMechanics.length <= 3 },
    { label: 'Studio is accountable', detail: 'Authorship, critique and production have named owners.', passed: studioIsAccountable },
    { label: 'Divergence is commissioned', detail: 'At least three concepts must differ across four or more design axes.', passed: project.conceptCount >= 3 },
    { label: 'Design gate precedes build', detail: 'Decision rights and approval criteria stop premature implementation.', passed: project.decisionOwner.trim().length >= 20 && project.approvalCriteria.trim().length >= 40 },
    { label: 'Parity gate is testable', detail: 'Reference comparison covers at least five concrete design-performance dimensions.', passed: project.benchmarkCriteria.trim().length >= 120 && benchmarkCoverage >= 5 },
    { label: 'Handoff is targeted', detail: 'The prompt matches the tool that will consume it.', passed: Boolean(project.outputTarget) },
  ]
}

export const compilePrompt = (project: ProjectData, direction: CreativeDirection | null) => {
  const selected = direction ?? generateDirections(project)[0]
  const type = siteTypes.find((item) => item.id === project.siteType)
  const content = parseContent(project.contentItems)
  const target = targetLabels[project.outputTarget]
  const sections = project.sections.length ? project.sections : sectionSets[project.siteType]
  const routes = parseRoutePlan(project.pagePlan)
  const mechanicLines = project.mechanics.length
    ? project.mechanics.flatMap((id) => [
        `### ${mechanicCatalog.find((item) => item.id === id)?.label ?? id}`,
        ...mechanicSpecs[id].map((line) => `- ${line}`),
        '',
      ])
    : ['No timeline or atmospheric motion. Specify only direct 120–180ms state feedback and focus changes.']

  const architectureBlock = project.pageMode === 'multi'
    ? `This is a real multi-page website, not a long landing page divided into route-shaped anchors. Implement every route below as a separately addressable page with its own title, metadata, h1, page job, opening composition and unique payload. Shared navigation and footer do not count toward a route's content depth.

### Route manifest

| Path | Page | Page job | Unique payload |
| --- | --- | --- | --- |
${routes.map((route) => `| ${route.path} | ${route.name} | ${route.job} | ${route.payload} |`).join('\n')}

### Depth and template rules

- Give the home route 7–10 substantive sections, product and solution routes 5–8, and pricing, resource or company routes 4–7. Count neither global navigation nor the footer.
- A section only counts when it introduces new information, proof, a useful interaction or a decision. Do not inflate page length with repeated slogans, logo strips or renamed feature cards.
- Define the shared shell, then at least three genuinely different page templates: narrative overview, deep product/solution detail, and index/decision page. Do not reuse one hero and one equal-card grid across every route.
- Keep global vocabulary, tokens, identity and control behavior consistent while allowing route-specific rhythm and information density.
- Model three connected journeys before styling: first-time evaluator, proof/security reviewer and ready-to-convert buyer. Each must reach the next useful page without returning to home.
- Mark the active navigation item, support keyboard traversal, provide breadcrumbs on nested routes, and ensure every internal link resolves. No dead-end pages or # placeholders.

### Home route section plan

${sections.map((section, index) => `#### ${index + 1}. ${section}\n\n${sectionPurpose(section, project)}`).join('\n\n')}`
    : `Build these sections in this order. Each section needs a distinct information job, a visual payload appropriate to the site type, and complete responsive behavior.

${sections.map((section, index) => `### ${index + 1}. ${section}\n\n${sectionPurpose(section, project)}`).join('\n\n')}`

  const logoProduction = project.brandMode === 'existing'
    ? 'Inventory the supplied identity files and usage guidance before layout. If an asset is missing, label the temporary treatment clearly; never hallucinate a replacement master.'
    : project.logoSource === 'codex-image'
      ? 'Use Codex Images to generate three materially different identity candidates from the concept. Select one based on subject specificity, silhouette and small-size behavior. Use the selected generated raster output as the source of truth: do not trace it, redraw it as SVG, approximate its curves in CSS or silently replace its lettering. Preserve the original alpha channel when supplied, crop only transparent padding, and create separate Codex Image outputs for materially different lockups rather than reconstructing them.'
      : 'Before polishing the website, sketch three materially different black-and-white candidates that express the concept through structure rather than decoration. Select one, explain why it wins, then construct the final master as editable SVG with clean paths and intentional optical correction.'

  const logoDeliverables = project.brandMode === 'new' && project.logoSource === 'codex-image'
    ? 'Save the untouched selected source as /assets/brand/logo-primary.png, an independently generated compact mark as /assets/brand/logo-compact.png when needed, /assets/brand/favicon.png, the exact final image-generation prompt in /assets/brand/PROMPT.md, and /assets/brand/USAGE.md. Do not create traced SVG copies.'
    : 'Save /assets/brand/logo-primary.svg, /assets/brand/logo-compact.svg, /assets/brand/mark.svg where applicable, /assets/brand/favicon.svg, and a short /assets/brand/USAGE.md.'

  const multiPageAcceptance = project.pageMode === 'multi'
    ? '\n28. Crawl every internal link and fail the build on missing routes, placeholder hrefs, duplicate page titles or incorrect active-navigation states.\n29. Capture every route at 1440×900 and 390×844. A polished home page cannot compensate for a shallow interior route.\n30. Confirm the evaluator, proof-reviewer and buyer journeys each traverse at least three useful pages and end in a complete action or decision.'
    : ''

  const assignedRoles = studioRoles.filter((role) => project.studioRoles.includes(role.id))
  const studioWorkflowBlock = `This project uses the **${project.processMode}** operating model with ${project.conceptCount} independent concept commissions and ${project.critiqueRounds} formal critique round${project.critiqueRounds === 1 ? '' : 's'}. Treat the roles below as separate hats with explicit handoffs, even if one person performs more than one role. Do not let one model silently collapse research, authorship, critique and approval into a single unreviewed pass.

### Responsibility matrix

| Role | Specific task | Required deliverable | Authority |
| --- | --- | --- | --- |
${assignedRoles.map((role) => `| ${role.label} | ${role.task} | ${role.deliverable} | ${role.authority} |`).join('\n')}

### Decision rights

${project.decisionOwner}

Design-gate criteria: ${project.approvalCriteria}

Reference-parity criteria: ${project.benchmarkCriteria}

### Studio sequence and gates

0. **Brief intake — no styling.** Strategy writes the problem, audience tension, content risks, category conventions and ranked design principles. Save the signed-off brief before producing a moodboard.
1. **Reference forensics — no imitation.** Capture each reference at the same 1440×900 and 390×844 viewports used for candidate review. Record the relationship worth borrowing, what must be avoided, how it changes for this subject and where the reference currently performs better. Audit at least five category peers for repeated visual defaults.
2. **Independent concept commissions.** Produce ${project.conceptCount} territories from the same signed-off brief. Each author begins from the brief—not another concept—and returns a one-page thesis, topology sketch, type specimen, palette/value study, image-language sample, shape grammar, motion premise and explicit template-risk statement.
3. **Divergence audit and similarity veto.** Compare every pair across six axes: page topology/grid, typography class, palette temperature/value, image/asset language, shape grammar and motion logic. Each pair must differ on at least four axes. If not, reject the later concept as a reskin and recommission it before critique.
4. **Critique I — diverge before converging.** The independent critic writes keep, change, kill and unresolved-risk notes. The creative director records advance, mutate or stop decisions in the decision log; popularity is not a rationale.
5. **Art-direction studies.** For the advancing ideas, create actual-copy typography tests, color relationships, logo candidates, image treatments and two composition keyframes. Do not jump straight to a component library.
6. **Responsive keyframe gate.** Review a 1440px home opening, one deep interior route, a 390px mobile translation and one meaningful interactive state. Judge still screenshots first; imagined animation cannot rescue weak hierarchy.
7. **Reference parity gate.** Place candidate and reference captures side by side and score each from 1–5 for first-fold comprehension, subject/product visibility, evidence realism, typographic hierarchy, restraint, brand cohesion, conversion clarity and mobile translation. The candidate cannot advance when it scores below the strongest reference on any core dimension. Visual distinctiveness cannot compensate for weaker design performance.
8. **Critique II and approval.** Test against the brief, anti-goal, content lengths, accessibility, category-cliché veto and reference scorecard. Record the chosen territory, the reasons rejected concepts lost and any mutation required to clear parity.
9. **Systemization.** Only after approval, translate the keyframes into tokens, primitives, component states and at least three page-template families without flattening their intended rhythm.
10. **Implementation and visual QA.** Build against approved keyframes, capture responsive comparisons and log every intentional deviation. Deployment is a production gate, not a chance to redesign silently.

**No implementation begins before the responsive keyframe gate is approved.** Technical spikes may test feasibility in isolation, but they cannot become the visual source of truth.

### Required design-room files

- \`/design/00-brief.md\` — signed problem, audience, constraints and principles
- \`/design/01-reference-scorecard.md\` — same-viewport reference captures, baseline scores and explicit performance bar
- \`/design/01-category-audit.md\` — conventions, opportunities, cliché clusters and reference forensics
- \`/design/02-concepts/concept-a.md\` through all ${project.conceptCount} commissions — thesis and six-axis studies
- \`/design/03-divergence-matrix.md\` — pairwise axis comparison and similarity-veto result
- \`/design/04-critique.md\` — keep/change/kill notes from every round
- \`/design/05-art-direction.md\` — type, color, image, identity and composition studies
- \`/design/06-keyframes/reference/\` — baseline reference captures at the exact review viewports
- \`/design/06-keyframes/candidate/\` — candidate desktop, interior, mobile and state frames
- \`/design/07-system.md\` — tokens, primitives, templates, exceptions and state coverage
- \`/design/08-handoff.md\` — implementation rules and visual-QA plan
- \`/design/DECISIONS.md\` — dated author, reviewer, rationale and status for every gate`

  return `# ${project.businessName || 'Untitled'} — ${type?.label ?? 'Website'} build specification

You are the project lead coordinating a traditional design studio and, only after design approval, the production build in ${target}. Treat every value and content string below as a contract. Keep authorship, critique, approval and implementation explicit; never simulate collaboration by letting one undifferentiated pass make every decision. The generated creative direction is a candidate hypothesis, not pre-approved authority: preserve it only after it clears the brief, reference-parity and anti-template gates.

## 0. Derivation

- **Business:** ${project.description}
- **Audience:** ${project.audience}
- **Primary outcome:** “${project.primaryAction}”
- **Site scope:** ${project.pageMode === 'multi' ? `${routes.length}-route multi-page website` : 'single-page experience'}
- **Candidate direction:** ${selected.name} — ${selected.descriptor}
- **Form thesis:** ${selected.formThesis}
- **Anti-goal:** ${project.antiGoal}
- **Device and network:** ${project.deviceBias}; ${project.network} network profile
- **Accessibility and locale:** WCAG 2.2 ${project.accessibility}; ${project.locale}

Every design decision must be traceable to one of these inputs. Do not add generic trends that the brief does not justify.

## 1. Studio operating model

${studioWorkflowBlock}

## 2. Candidate creative direction

**${selected.name}: ${selected.descriptor}.** ${selected.rationale}

- **Hero:** ${selected.hero}
- **Structure:** ${selected.structure}
- **Signature:** ${selected.signature}
- **Density:** ${selected.density}; vary rhythm by section purpose rather than repeating one padding value.
- **Page topology:** ${selected.topology}
- **Grid system:** ${selected.gridSystem}
- **Image language:** ${selected.imageLanguage}
- **Shape grammar:** ${selected.shapeLanguage}
- **Motion profile:** ${selected.motionProfile}
- **Known template risk:** ${selected.templateRisk}
- **Required opening evidence:** ${project.heroEvidence}
- **Restraint rule:** ${project.restraintRule}
- **References:** ${referenceContract(project)}

This is a falsifiable territory, not an approval. Make the form thesis visible in structure, typography, rhythm and surface treatment—not as decoration added after layout—then reject or mutate it if the still keyframes cannot meet the reference performance bar.

### Opening viewport budget

- At both 1440×900 and 390×844, the opening viewport must visibly contain: the project identity, one plain-language sentence answering what this is and who it serves, and the complete “${project.primaryAction}” action.
- The first viewport must also prove the subject with this exact content requirement: ${project.heroEvidence}
- For SaaS, product and dashboard work, render one realistic, legible product state at actual content length before any abstract diagram, floating device collage or mood-only media. A diagram cannot stand in for the product when the product itself can be shown.
- Reserve at least 160px of vertical space for the factual sentence and action. The display statement may be expressive, but it cannot push either item below the fold or hide them behind media.
- Treat the hero as a comprehension test before treating it as a poster. If the first screenshot is atmospheric but ambiguous, reduce display scale or reposition the media before changing copy.
- On image-led mobile openings, place identity, factual sentence and complete action before the media unless a tested overlay keeps all three fully legible. A media block may not consume more than 42vh before the primary action.
- For dashboards, docs and other app shells, persistent navigation does not satisfy orientation by itself. Expose the product identity, a one-sentence purpose and the starting action or dominant task in the initial shell.
- Measure the full bounds of the action: its bottom edge must remain at least 12px inside the 390×844 viewport. Partial intersection with the viewport is a failure.

## 3. Visual system

### Logo and identity pipeline

- **Brand mode:** ${project.brandMode === 'new' ? 'Create a new identity system as part of this build.' : 'Use the supplied identity; do not redesign or approximate it.'}
- **Logo form:** ${selected.logo.style}
- **Concept:** ${selected.logo.concept}
- **Construction:** ${selected.logo.construction}
- **Required lockups:** ${selected.logo.lockups}
- **Usage rules:** ${selected.logo.usage}

${logoProduction}

- Run the swap test: if this mark could be placed on an unrelated ${type?.label.toLowerCase()} site without contradiction, return to the subject and revise the concept.
- Generate photography, texture or illustrative brand worlds with image tools when useful. Interface icons and explanatory diagrams remain code-native; the logo follows the production source chosen above.
- ${logoDeliverables}

### Color

- Ground — ${selected.palette.ground}
- Surface — ${selected.palette.surface}
- Ink — ${selected.palette.ink}
- Muted text — ${selected.palette.muted}
- Accent — ${selected.palette.accent}; reserve it for actions, live states and one signature moment
- Rules — ${selected.palette.line}

Create semantic tokens for these roles. Verify body text at 4.5:1 minimum and large text at 3:1 minimum against the actual surface used. Do not introduce a second accent.

### Typography

- Display: **${selected.fonts.display}**
- Body/UI: **${selected.fonts.body}**
- Utility/data: **${selected.fonts.utility}**
- Pairing strategy: ${selected.fonts.strategy}
- Body floor: 16px; default line-height 1.6; long-form reading width 62–68 characters.
- Display scale: use a 1.25 ratio for product/UI surfaces, 1.333 for general marketing and 1.5 only for editorial statements. Cap the mobile headline at 14 characters per line where possible.
- Reserve the display face for one decisive identity moment per viewport. Supporting h2 headings must return to body/display medium scale; if every section heading could serve as the hero, the hierarchy has failed.
- Numbering, mono labels and running indices are allowed only when they encode real sequence, status or navigation. Never add them as decorative evidence of “design.”

Use no more than these three families. Self-host variable WOFF2 files where licensing permits and define metric-compatible fallbacks.

### Layout and shape

- Direction-owned grid: ${selected.gridSystem}
- Direction-owned shape grammar: ${selected.shapeLanguage}
- Do not normalize this into a universal 12-column marketing grid, centered max-width hero, three equal cards or a default rounded-panel system.
- At 810px and 390px, translate the topology by preserving hierarchy, relationships and reading order—not by mechanically stacking desktop columns.
- Radius, shadow, border and container rules must be derived from the shape grammar. If the direction calls for hard edges or unboxed space, a component-library default radius is a defect.
- Produce a one-page visual grammar sheet showing alignment anchors, spatial intervals, edge behavior, image crops and exceptions before building components.

### Anti-slop veto

Reject these category-default bundles before keyframes:

${project.categoryCliches.split(/\n|;/).map((item) => item.trim()).filter(Boolean).map((item) => `- ${item}`).join('\n')}

- Do not stack a recognizable trend bundle simply because each ingredient is individually attractive. A warm ground, huge display face, mono eyebrow, hairline rules and numbered modules still form one familiar template.
- Difference from a reference is not proof of quality. Preserve the reference's successful comprehension, evidence and conversion relationships while authoring a different identity.
- Spend emphasis according to this restraint rule: ${project.restraintRule}
- Permit one dominant visual move per viewport. Navigation, supporting headings, metadata, proof rows and secondary actions must support it quietly.
- Reject generic equal-card rows, decorative labels, fake dashboards, invented metrics, floating app windows and customer-facing copy that describes the design process instead of the product.

## 4. Content contract

Use this copy and source material as the basis of the build. Tighten for clarity without inventing facts. Claims, logos, testimonials and statistics require a supplied source.

**Proof:** ${project.proof}

**Required first-fold evidence:** ${project.heroEvidence}

${content.map(([title, body], index) => `${index + 1}. **${title || `Content item ${index + 1}`}** — ${body || 'Write the full, specific content before layout approval.'}`).join('\n')}

**Additional requirements:** ${project.extraRequirements.trim() || 'None beyond this specification.'}

### Asset and media plan

${mediaPlans[project.siteType].map((line, index) => `${index + 1}. ${line}`).join('\n')}

- ${project.logoSource === 'codex-image' && project.brandMode === 'new' ? 'The approved Codex Image logo is the only raster asset allowed to contain brand lettering. All other generated raster assets contain no baked-in interface text, labels, proof or navigation.' : 'Generated raster assets contain no baked-in interface text, logos, labels, proof or navigation.'} Put factual labels and captions in semantic HTML or code-native SVG.
- Give every visual a section job, aspect ratio, focal point, desktop crop, mobile crop, loading behavior, alt-text decision and source/fiction status before generation.
- Use one consistent, real icon family for interface symbols. Draw bespoke diagrams, maps and simple illustrations as editable SVG when precision matters more than texture.

## 5. Page architecture

${architectureBlock}

For every form, filter, feed, search, cart, booking surface or async embed, implement loading, empty, error and success states with real interface copy. Never use placeholder-only labels.

## 6. Motion and media

Motion intensity is **${project.motionIntensity}/10**. The media subject is **${project.mediaSubject}**.

### Choreography hierarchy

${motionHierarchy(project, selected).map((line) => `- ${line}`).join('\n')}

${mechanicLines.join('\n')}
Animate transform and opacity by default. Never strand content at opacity 0. Under prefers-reduced-motion, render the useful end state, collapse spacer tracks and replace large-area movement with a short cross-fade. Auto-playing motion over five seconds needs a pause control.

## 7. ${target} implementation

${targetInstructions(project).map((line) => `- ${line}`).join('\n')}

- Build reusable primitives separately from page sections.
- Name every major section and state clearly enough for another designer to navigate the project without inspecting implementation details.
- Use real icons from one consistent family; no emoji, improvised Unicode symbols or mismatched icon styles.

## 8. Responsive behavior

- **1440px:** express the selected ${selected.topology} topology and its complete visual payload; do not force asymmetry when the chosen system is modular, spatial, centered or edge-aligned.
- **810px:** preserve the governing relationship from the approved keyframe, simplify only what cannot remain legible and keep the claim, proof and action in the first viewport.
- **390px:** create an authored mobile translation with its own composition keyframe. Reorder by comprehension, not desktop source order. Disable hover-dependent communication, parallax and pinning. Keep tap targets at least 48×48px with 8px separation.
- Test the longest supplied content, 200% text zoom and keyboard navigation without horizontal overflow.

## 9. Accessibility, performance and SEO

- Target WCAG 2.2 ${project.accessibility}. Use visible 2px focus outlines with 3px offset on every focusable element.
- Use semantic landmarks, one h1, a correct heading outline and descriptive page titles.
- Every meaningful image receives accurate alternative text; decorative media uses empty alt text. Never describe a placeholder as if it were factual content.
- Media boxes declare dimensions and aspect ratio. Use responsive AVIF/WebP images, authored posters and lazy loading below the fold.
- Performance budget: ${performanceBudget(project)}
- Add metadata, Open Graph assets, canonical URLs, sitemap and structured data that is actually supported by the content.

## 10. Acceptance checks

1. The first viewport states what ${project.businessName} does, who it is for and exposes “${project.primaryAction}”.
2. Screenshot at 1440×900, 810×1080 and 390×844; compare composition, line breaks, density and section order across all three.
3. Zero horizontal overflow at 390px and 200% text zoom.
4. Every selected mechanic has its documented loading, mobile and reduced-motion fallback.
5. No section is a generic title plus three equal cards unless the content genuinely has three equal choices.
6. Keyboard-test all controls; undersized tap targets, missing focus states and unlabeled inputs must be zero.
7. Verify contrast against the final rendered surfaces, not token values in isolation.
8. Run a production build and measure the transferred page against the stated budget.
9. Replace or explicitly mark every unsourced factual claim before launch.
10. Perform three visual compare-adjust-capture passes. Counts passing is not the same as the design working.
11. Confirm the factual sentence and primary action are fully visible in the initial 1440×900 and 390×844 screenshots.
12. Name the one timeline-level signature. If a reviewer can point to two unrelated showpieces, remove or merge one.
13. Audit every image and illustration against the asset plan; reject mood-only media that adds no new information.
14. Inspect every required logo lockup at 16px, 24px and 160px on light and dark surfaces; reject it if the silhouette collapses or the name becomes ambiguous. ${project.logoSource === 'codex-image' ? 'Confirm the deployed files are the selected Codex Image outputs and no traced or redrawn substitute exists.' : 'Confirm the vector paths remain clean in one color.'}
15. Run the identity swap test against two unrelated benchmark categories. A mark that still feels equally plausible has failed the subject-specificity gate.
16. For image-led mobile heroes, confirm copy and action precede the media in reading order unless a reviewed overlay is equally clear.
17. For app shells, confirm identity, purpose and starting action are visible without opening a menu or scrolling.
18. Verify all commissioned concepts exist and the divergence matrix proves every pair differs on at least four of the six named axes.
19. Reject any concept whose difference is primarily palette, font substitution or decorative surface treatment over the same topology.
20. Confirm the approved desktop, deep-route, mobile and interaction-state keyframes predate production components and remain the visual source of truth.
21. Audit /design/DECISIONS.md: every gate has an author, reviewer, rationale and status; no silent approval or implementation-led redesign remains.
22. Build the reference scorecard from same-viewport screenshots. Score first-fold comprehension, subject/product visibility, evidence realism, typographic hierarchy, restraint, brand cohesion, conversion clarity and mobile translation from 1–5.
23. Reject or mutate the candidate if it scores below the strongest reference on any core dimension. Visual distinctiveness cannot compensate for weaker design performance.
24. Confirm the required first-fold evidence is legible without animation: ${project.heroEvidence}
25. Reject customer-facing meta-copy such as “fictional product,” “working premise,” “design system,” “AI sparkle” or commentary about how the page was made. The site speaks to the buyer, not to its evaluator.
26. Run a heading-scale audit: one dominant opening statement is allowed, while supporting headings establish a visibly quieter information hierarchy.
27. Inspect product and evidence realism at 100% zoom. Placeholder diagrams, tiny unreadable UI, repeated lorem-length text and invented proof fail even when the composition is attractive.
${multiPageAcceptance}

## 11. Execution mandate

The candidate direction is not authority. Reject or mutate **${selected.formThesis}** if it fails the reference scorecard, first-fold evidence requirement, category-cliché veto or restraint rule. Preserve the composition—${selected.hero}—only after written approval. If it passes, keep ${selected.signature.toLowerCase()} as the one orchestrated moment and cut secondary effects before weakening it.`
}
