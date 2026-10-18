export const meta = {
  name: 'motion-prompt',
  description: 'Turn a design brief into a motionsites-level hyper-fidelity implementation prompt',
  whenToUse:
    'A full landing page (variant B) or a high-stakes section (variant A), where one pass of the motion-prompt skill will not carry it. Registry/library components (C, D) are ~100-word stubs — use the skill, not this. Pass the brief as args (string, or {brief, variant}).',
  phases: [
    { title: 'Reference Audit', detail: 'measure the reference at desktop and mobile; extract section geometry, payload, rails, type, and motion evidence' },
    { title: 'Direction', detail: 'classify variant, lock brand, palette, type scale, stack, signature mechanic' },
    { title: 'Spec', detail: '4 writers in parallel, split by variant, all coding against the same direction' },
    { title: 'Critique', detail: 'adversarial hunt for anything a builder would have to guess' },
    { title: 'Assemble', detail: 'apply fixes, emit the single copy-paste prompt' },
  ],
}

const SKILL = '.claude/skills/motion-prompt'
const brief =
  typeof args === 'string' ? args : args?.brief ?? 'a premium dark landing page hero'

const REFERENCE_SCHEMA = {
  type: 'object',
  required: ['mode', 'source', 'evidence', 'sectionMap', 'designDNA', 'payloadFloor', 'motionInventory', 'translationBoundary', 'qaContract'],
  additionalProperties: false,
  properties: {
    mode: { type: 'string', enum: ['measured-reference', 'derived-benchmark'] },
    source: { type: 'string', description: 'Reference URL/screenshot supplied in the brief, or the named benchmark category when none is supplied.' },
    evidence: {
      type: 'array',
      minItems: 2,
      items: { type: 'string' },
      description: 'Observed facts with viewport and units. For a live URL include at least 1440x900 and 390x844 evidence. Never invent measurements.'
    },
    sectionMap: {
      type: 'array',
      minItems: 5,
      items: { type: 'string' },
      description: 'Ordered sections with measured/estimated y, height, columns, border behavior, and dominant payload.'
    },
    designDNA: {
      type: 'array',
      minItems: 6,
      items: { type: 'string' },
      description: 'Repeatable structural rules: rails, widths, type ratios, surface hierarchy, spacing rhythm, corners, borders, accent discipline.'
    },
    payloadFloor: {
      type: 'array',
      minItems: 5,
      items: { type: 'string' },
      description: 'Per-section minimum visual/content payload. Counts are floors derived from the reference, not generic defaults.'
    },
    motionInventory: {
      type: 'array',
      items: { type: 'string' },
      description: 'Observed motion only: sticky behavior, marquees, state changes, scroll behavior, durations/easing where measurable.'
    },
    translationBoundary: {
      type: 'array',
      minItems: 3,
      items: { type: 'string' },
      description: 'What structure may be translated and which brand assets, trademarks, portrait media, and long-form copy must be replaced.'
    },
    qaContract: {
      type: 'array',
      minItems: 6,
      items: { type: 'string' },
      description: 'Screenshot comparison gates with viewports, loop count, geometry tolerance, overflow check, interaction check, and exit criteria.'
    },
  },
}

// Contract-first: every writer codes against this, so the four halves actually fit together.
const DIRECTION_SCHEMA = {
  type: 'object',
  required: ['variant', 'brand', 'surface', 'mood', 'stack', 'palette', 'typography', 'mechanic', 'copy', 'referenceTranslation'],
  additionalProperties: false,
  properties: {
    variant: {
      type: 'string',
      enum: ['A', 'B', 'E'],
      description: 'A = single Section, deep (11-section anatomy). B = consumer/service full landing page, wide. E = technical product site (dev tool, API, infra, AI, B2B SaaS, YC startup) — 8-section shape with a diagram system and conversion architecture, per technical-product.md. B vs E: does the buyer already understand the product (B) or does it need explaining (E)?',
    },
    brand: { type: 'string', description: 'Brand name used throughout' },
    surface: { type: 'string', description: 'e.g. "full landing page", "hero section"' },
    mood: { type: 'string', description: 'One sentence of visual direction' },
    decision: {
      type: 'string',
      description: 'THE one non-obvious decision, as a rule the whole spec obeys. Not a mood word — a rule. e.g. "every specimen fact is set in mono, so the site speaks with a scientific voice"; "no section may centre its content"; "the accent appears at most four times per viewport". If this could apply to any site in the category, it is not the decision.',
    },
    stack: { type: 'array', items: { type: 'string' }, description: 'Exact packages, one per line. 2028 baseline per anatomy.md: native CSS scroll-driven motion by default, JS motion libraries only where justified.' },
    palette: {
      type: 'object',
      description: 'Token name -> "oklch(...) -> #hex" fallback pair. Background, surfaces, primary, accent, 3 text tiers.',
      additionalProperties: { type: 'string' },
    },
    typography: {
      type: 'object',
      required: ['families', 'scale'],
      properties: {
        families: { type: 'array', items: { type: 'string' } },
        scale: { type: 'object', additionalProperties: { type: 'string' } },
      },
    },
    mechanic: {
      type: 'object',
      required: ['name', 'why', 'spec', 'choreography'],
      properties: {
        name: { type: 'string' },
        why: { type: 'string' },
        spec: { type: 'string', description: 'Every config value + the gotchas, verbatim from mechanics.md, tuned to brand' },
        choreography: {
          type: 'array',
          minItems: 6,
          maxItems: 8,
          description: 'The beat table (anatomy.md §6). Contiguous ranges covering 0.00-1.00, no gaps. Exactly one row is the climax and must say so.',
          items: {
            type: 'object',
            required: ['range', 'beat'],
            properties: {
              range: { type: 'string', description: 'e.g. "0.38-0.60"' },
              beat: { type: 'string', description: 'What moves, by how much, driven by what' },
              climax: { type: 'boolean' },
            },
          },
        },
        reducedMotion: {
          type: 'string',
          description: 'Concrete collapse: which frame or final state renders, and that the track height collapses so the page does not scroll through nothing.',
        },
      },
    },
    copy: {
      type: 'object',
      description: 'Real strings: headline, subtitle, nav labels, CTA labels, badge, meta description',
      additionalProperties: true,
    },
    sections: {
      type: 'array',
      items: { type: 'string' },
      description: 'Ordered section list with component filenames, e.g. "Navbar (Navbar.tsx)". Variant B: 6-9 page sections. Variant A: 3-5 blocks.',
    },
    assets: {
      type: 'array',
      items: { type: 'string' },
      description: 'Variant B: every image/video URL needed, each labeled with the section that consumes it. Mark "supply your own" where no real URL exists.',
    },
    referenceTranslation: {
      type: 'object',
      required: ['preserve', 'replace', 'fidelityRisks'],
      properties: {
        preserve: { type: 'array', items: { type: 'string' }, description: 'Measured layout/quality traits retained from the audit.' },
        replace: { type: 'array', items: { type: 'string' }, description: 'Reference-specific copy, identity, media, and product surfaces replaced with brand-authentic equivalents.' },
        fidelityRisks: { type: 'array', items: { type: 'string' }, description: 'Likely ways the build could become generic or lose the reference cadence.' },
      },
    },
  },
}

const PROSE_SCHEMA = {
  type: 'object',
  required: ['markdown'],
  additionalProperties: false,
  properties: { markdown: { type: 'string', description: 'The finished section(s), markdown, no preamble or commentary' } },
}

const CRITIQUE_SCHEMA = {
  type: 'object',
  required: ['gaps'],
  additionalProperties: false,
  properties: {
    gaps: {
      type: 'array',
      items: {
        type: 'object',
        required: ['section', 'vague', 'fix'],
        properties: {
          section: { type: 'string' },
          vague: { type: 'string', description: 'The exact phrase a builder would have to guess at' },
          fix: { type: 'string', description: 'The concrete value that replaces it' },
        },
      },
    },
  },
}

const house = `Read ${SKILL}/SKILL.md, ${SKILL}/reference/reference-fidelity.md, ${SKILL}/reference/variants.md, ${SKILL}/reference/anatomy.md and ${SKILL}/reference/mechanics.md first — they are the house style and they are binding.

Absolute rule: if a downstream model would have to guess it, it is not specified. Every color is OKLCH with a hex fallback. Every size is a token or a unit value. Every animation carries duration and easing. All copy is written out verbatim in quotes. No placeholders, no "e.g.", no adjectives standing in for values.

The bar is Awwwards Site of the Day in 2028, not the motionsites corpus average. Two consequences:
- Use the 2028 platform baseline in anatomy.md §1 — native CSS scroll-driven motion, @property registration, container queries, View Transitions, variable-font axes, svh/dvh. Anything older is an exception you justify in the spec.
- Word floors in variants.md are FLOORS, not targets. Under the floor means you left something to guesswork. Do not pad to reach one — find the thing you skipped.`

phase('Reference Audit')
const reference = await agent(
  `${house}

Brief: ${brief}

Run the reference-fidelity.md audit before choosing a creative direction.

If the brief includes a URL or screenshot, inspect it directly. For a URL, capture or inspect at 1440x900 and 390x844. Record observable evidence: page height, sticky/fixed chrome, content rail width, section y/height, column ratios, type scale, borders, corner radii, surface colors, dominant media, number of cards/rows, and motion actually present. Do not claim pixels you did not measure. If live inspection is unavailable, say so in mode/source and use explicit estimates from the supplied screenshot only.

If no reference is supplied, derive a benchmark for the product species, but mark the mode derived-benchmark and never present estimates as observations.

Separate structure from protected identity: layout rules and interaction patterns may be translated; logos, portraits, branded product screenshots, trademarked shapes, and long-form copy must be replaced with authored, product-specific equivalents.

End with a screenshot QA contract: desktop 1440x900, mobile 390x844, at least three compare-adjust-capture loops, no horizontal overflow, working interactions, reduced-motion check, and explicit visual exit criteria.`,
  { label: 'reference', schema: REFERENCE_SCHEMA, effort: 'high' }
)

phase('Direction')
const dir = await agent(
  `${house}

Brief: ${brief}
REFERENCE AUDIT — evidence and floors, not optional inspiration:
${JSON.stringify(reference, null, 2)}
${args?.variant ? `Variant is pre-set to ${args.variant} — use it, do not re-classify.` : ''}

First classify the variant per variants.md — A (single Section, deep) or B (full landing page, wide). A section noun means A; a page or business noun means B. This decision governs everything downstream.

Then name THE one non-obvious decision (SKILL.md step 3) before anything else. Skeletons produce skeleton-shaped output; this rule is what stops the spec being a template. State it as a rule the whole build obeys, not as a mood. If it could apply to any site in this category, it is not the decision — try again.

Then lock the creative direction. Preserve the reference's measured composition, density, and rhythm while replacing its identity and product surface. Fill referenceTranslation with explicit preserve/replace/risk lists. Pick ONE signature mechanic from mechanics.md and tune its values to this brand — do not invent a second one. For variant B that mechanic belongs to the hero; the rest of the page stays at bullet depth.

Then write its choreography table: 6-8 contiguous beats covering 0.00-1.00 with no gaps, exactly one flagged as the climax, plus the concrete reduced-motion collapse. A table where everything is a beat has no beats.

Finally write the real copy (headline, subtitle, nav labels, CTA labels, badge, meta description) and list the sections in page order with their component filenames. Everything downstream quotes this verbatim.`,
  { label: 'direction', schema: DIRECTION_SCHEMA, effort: 'high' }
)

const variant = args?.variant ?? dir?.variant ?? 'A'
const VARIANT_LABEL = {
  A: 'single section (deep)',
  B: 'consumer landing page (wide)',
  E: 'technical product site (diagram-led)',
}
log(`variant ${variant} — ${VARIANT_LABEL[variant] ?? VARIANT_LABEL.A}`)

const ctx = `Brief: ${brief}

REFERENCE AUDIT — binding fidelity floor:
${JSON.stringify(reference, null, 2)}

LOCKED DIRECTION — treat as contract, do not deviate, do not re-decide:
${JSON.stringify(dir, null, 2)}`

phase('Spec')

// A and B cost the same words (~1,050 vs ~1,100) but spend them differently, so the
// four-way split has to differ too: A splits by spec depth, B splits the page flow.
const SPLITS = {
  A: [
    {
      key: 'foundation',
      task: 'Write §1 Technical Architecture & Stack, §2 Visual Design System, §3 Layout Structure & Grid System. Include the z-index strategy in §3.',
    },
    {
      key: 'sections',
      task: 'Write §4 Section-by-Section Content & Hierarchy — 3–5 blocks only (nav, the surface itself, its parts). One ### block per component, named with its filename. Layout classes, then the real copy in quotes, then per-element styling and hover/focus/active states. If this section carries content data (pricing tiers, FAQ items, testimonials, slides), write every row out in full — real prices, real answers, real names and roles.',
    },
    {
      key: 'motion',
      task: 'Write §5 UI Components & Micro-Interactions, §6 Animations, §7 The Signature Centerpiece, §8 Interaction Details. This is where the budget goes for variant A. §6 must render the locked choreography table verbatim as a markdown table, with the reduced-motion collapse stated under it. §7 carries every config key of the mechanic plus its gotchas. §8 explains cause → effect → why it reads the way it does.',
    },
    {
      key: 'hardening',
      task: 'Write §9 Responsive Behavior, §10 Performance, §11 SEO & Accessibility. Container queries for components, viewport breakpoints only for the global grid and nav — state real values, never "it adapts". Specify every state that exists: loading, empty, error, success. Give the prefers-reduced-motion path concretely, and name the framework gotchas for this stack (overflow: clip under sticky, @property before interpolating, Strict Mode double-mount).',
    },
  ],
  B: [
    {
      key: 'foundation',
      task: 'Write §1 Visual Design System (1.1 Color Palette, 1.2 Typography, 1.3 Layout Structure & Grid) and §2 Technical Implementation Details (stack, then the component file tree as a literal ASCII block under src/).',
    },
    {
      key: 'page-upper',
      task: 'Write the first half of §3 Section-by-Section Implementation — Navbar through the mid-page sections (hero, features, about). Number them 3.1, 3.2, … One block each: placement, real copy in quotes, styling, hover state. 4–8 bullets per section. The hero owns the signature mechanic and gets the deepest treatment — render the locked choreography table verbatim as a markdown table inside its subsection, with the reduced-motion collapse under it. The others stay at bullet depth.',
    },
    {
      key: 'page-lower',
      task: 'Write the second half of §3 Section-by-Section Implementation — the lower page through the footer (services, pricing, testimonials, contact, footer as applicable). Continue the 3.x numbering from where the upper half ends. Write content data out in full: every pricing tier with real price and bullets, every FAQ answer, every testimonial with name and role. Any subsection with a form, filter, or feed must specify its loading, empty, error, and success states — build every one. 4–8 bullets per section.',
    },
    {
      key: 'closing',
      task: 'Write §4 Animations & Micro-Interactions (page-wide rules, not per-element), §5 Asset Manifest (every image and video URL grouped and labeled by the section that consumes it — mark "supply your own: 16:9, muted, ~8s loop" where no real URL exists), §6 Performance & SEO, and the closing Execution Mandate. The mandate must name the two or three specific hardest details not to skip — a generic "be thorough" does nothing.',
    },
  ],
  // E's bulk is the diagram system, not the page flow — so one writer owns it outright.
  E: [
    {
      key: 'foundation',
      task: 'Write §1 Product Thesis & Design System (1.1 the one hard thing as a single sentence, 1.2 color for BOTH light and dark themes with accent discipline stated, 1.3 typography — sans + mono, and what mono means semantically, 1.4 layout, grid, and the technical-grid treatment with its mask) and §2 Technical Implementation (stack, 2028 baseline, file tree, @property registrations). Headline scale ceiling is clamp(2.5rem, 5vw, 4rem) — this is infrastructure, not a fashion brand.',
    },
    {
      key: 'diagrams',
      task: 'Write §3 The Diagram System. This is the section that makes variant E what it is. 3.1: the primary diagram — name its type from the eight in technical-product.md, label every node and edge, give the choreography table for its animation, its static fallback, and its aria-label stating the CONCLUSION not the parts. It must explain the one hard thing and nothing else. 3.2: secondary diagrams, one block each, same rigour at lower depth. 3.3: code block and terminal conventions — languages, copy-button behaviour with in-place confirmation, type-out timing. Every diagram must survive being screenshotted; if it does not, the motion was carrying meaning the layout should encode.',
    },
    {
      key: 'page',
      task: 'Write §4 Section-by-Section in the canonical devtool order: hero (state which of the six hero visual types and why) → trust block immediately after → 2-5 feature blocks each claim/diagram/proof → curated testimonials with full name, role and company → supporting sections → final CTA. Real copy throughout. Every form, embed, and demo carries its loading, empty, error, and success states. Voice rules are binding: numbers over adjectives, no banned words, and no sentence may survive swapping the product name out.',
    },
    {
      key: 'conversion',
      task: 'Write §5 Conversion Architecture (YC/investor badge with exact placement AND its dark-theme variant, quantified before/after in the buyer\'s own units, inline booking scheduler rather than a callback form, the pricing decision — inline for self-serve or linked for usage-based/enterprise, stating which and why, and if inline then every tier with real prices and trial terms and most-popular flag and annual toggle, FAQ with answers written out, footer as a navigation surface), §6 Animations (page-wide; every motion justified as comprehension, not atmosphere), §7 Asset Manifest, §8 Performance/SEO/Accessibility including diagram a11y and contrast in both themes, then the Execution Mandate.',
    },
  ],
}
const WRITERS = SPLITS[variant] ?? SPLITS.A

const drafts = await parallel(
  WRITERS.map((w) => () =>
    agent(`${house}

${ctx}

Your assignment: ${w.task}

Output only those sections as markdown, numbered and titled exactly as anatomy.md specifies. No preamble, no closing commentary.`, {
      label: `write:${w.key}`,
      phase: 'Spec',
      schema: PROSE_SCHEMA,
    }).then((r) => ({ key: w.key, markdown: r?.markdown ?? '' }))
  )
)

const merged = drafts
  .filter(Boolean)
  .filter((d) => d.markdown)
  .map((d) => d.markdown)
  .join('\n\n')

const dropped = WRITERS.map((w) => w.key).filter(
  (k) => !drafts.some((d) => d && d.key === k && d.markdown)
)
if (dropped.length) log(`DROPPED writers (returned empty): ${dropped.join(', ')}`)

phase('Critique')
const critique = await agent(
  `${house}

You are an adversarial reviewer. Your only job is to find every place a builder would have to GUESS.

Hunt for: adjectives standing in for values ("smooth", "modern", "large", "subtle"), colors that are not hex/rgba, animations missing duration or easing, copy that is described rather than written, content data summarised instead of enumerated ("three tiers", "several FAQs"), breakpoints without numbers, components without filenames, missing hover/focus/active states, and contradictions between sections.

Then hunt the 2028-bar failures, which are gaps even when every value is concrete:
- the reference audit is absent from the implementation spec, or its measured rails, section cadence, type ratio, payload floor, and responsive reorder are reduced to mood adjectives
- the output matches category conventions but not the supplied reference's composition: generic centered hero, repetitive card grid, uniform section padding, no dominant product stage, or materially fewer payload elements than the measured floor
- branded reference assets, portrait media, product screenshots, or long-form copy are copied instead of translated into authored brand-specific equivalents
- there is no explicit screenshot compare-adjust-capture loop at 1440x900 and 390x844, fewer than three loops, or no numeric exit criteria
- the implementation is not sectionized and componentized, or client-side code is applied to the whole page when only isolated interactions require it
- the choreography table is missing, has fewer than 6 beats, leaves gaps in 0.00-1.00, or flags no climax
- the one non-obvious decision is absent from §1, or is a mood word rather than a rule, or is stated and then contradicted later
- a state that exists is unspecified: loading, empty, error, success
- prefers-reduced-motion is mentioned but not made concrete (which frame, which final state, does the track collapse)
- colors given as bare hex rather than OKLCH with fallback
- viewport breakpoints used for component-level layout where a container query belongs
- static font weights where variable axes were locked
- a JS motion library used for a reveal that native animation-timeline would do

${
  {
    B: 'This is variant B (consumer landing page). Also flag: a missing or incomplete component file tree, an asset manifest that is absent or has unlabelled URLs or "supply your own" entries with no spec attached, a missing Execution Mandate, a mandate that is generic rather than naming specific hard details, and any 3.x page section thinner than 4 bullets.',
    E: 'This is variant E (technical product site). Also flag: the one hard thing missing from §1 or stated as marketing rather than a concept; a primary diagram that explains something OTHER than the hard thing; any diagram with unlabelled nodes or edges, no static fallback, or an aria-label listing parts instead of stating the conclusion; a diagram that would explain nothing if screenshotted; a hero visual type not chosen by the decision rule; a trust block not immediately after the hero; anonymous testimonials; a missing YC/investor badge dark-theme variant; a pricing decision made by default rather than stated; a booking form that promises a callback instead of embedding a scheduler; FAQ questions without answers; only one theme specified; any animation that is atmosphere rather than comprehension; and any banned marketing word ("revolutionary", "seamless", "cutting-edge", "leverage", "empower", "unlock") or any sentence that would survive swapping the product name out.',
    A: 'This is variant A (single section, deep). Also flag: any config key of the signature mechanic left unspecified, missing implementation gotchas for the chosen mechanic, §8 that lists effects without explaining cause and why it reads that way, and any breakpoint in §9 without concrete values.',
  }[variant] ?? ''
}

For each gap give the exact offending phrase and the concrete value that replaces it. Be ruthless — an empty list means you did not look hard enough. Do not rewrite the document.

DRAFT:
${merged}`,
  { label: 'critique', schema: CRITIQUE_SCHEMA, effort: 'high' }
)

log(`${critique?.gaps?.length ?? 0} gaps found`)

phase('Assemble')
const final = await agent(
  `${house}

${ctx}

DRAFT SECTIONS:
${merged}

GAPS TO CLOSE (apply every fix):
${JSON.stringify(critique?.gaps ?? [], null, 2)}

REFERENCE AUDIT TO PRESERVE IN THE FINAL PROMPT:
${JSON.stringify(reference, null, 2)}

Assemble the final deliverable as variant ${variant}:
1. The role opener matched to the variant (variants.md, "Openers"), then \`***\`, then the "# ${dir?.brand ?? 'Brand'} — ${dir?.surface ?? 'Surface'} Specification" title line.
2. ${
    {
      B: 'The 6-section landing-page shape: §1 Visual Design System, §2 Technical Implementation (with the file tree), §3 Section-by-Section (continuous 3.x numbering across both page halves), §4 Animations, §5 Asset Manifest, §6 Performance & SEO, then the Execution Mandate as the closing paragraph.',
      E: 'The 8-section technical-product shape: §1 Product Thesis & Design System, §2 Technical Implementation, §3 The Diagram System, §4 Section-by-Section, §5 Conversion Architecture, §6 Animations, §7 Asset Manifest, §8 Performance/SEO/Accessibility, then the Execution Mandate.',
      A: 'All 11 sections of the anatomy in order.',
    }[variant] ?? 'All 11 sections of the anatomy in order.'
  } Gaps closed, duplicates between writers merged, numbering continuous with no repeats or jumps.
3. Every choreography table survives assembly intact, as a markdown table. They are the highest-value blocks in the spec — do not summarise them into prose.
4. ${variant === 'E' ? 'The one hard thing appears in §1.1 as a single sentence' : 'The one non-obvious decision appears in §1 as a stated rule'}: "${dir?.decision ?? '(none locked — flag this)'}"
5. Word floor is ${{ B: '1,800', E: '2,000', A: '1,400' }[variant] ?? '1,400'}, ceiling ${{ B: '3,200', E: '3,600', A: '2,200' }[variant] ?? '2,200'}. The floor is a floor, not a target — under it means something was left to guesswork. Do not pad to reach it.
6. Add a final "Reference Fidelity & Visual QA" section that includes the observed section map, preserve/replace boundary, the per-section payload floors, and a mandatory three-pass screenshot loop at 1440x900 and 390x844. Each pass must compare composition, geometry, typography, density, product-stage credibility, responsive order, and interaction state. Exit only when: zero horizontal overflow; all required sections and payload elements exist; major rail/section geometry is within 8px desktop and 6px mobile where the reference supplies measurements; type line breaks and dominant media silhouette match the reference intent; keyboard, reduced-motion, and interactive states pass.
7. Require the builder to use the latest stable requested framework version resolved at implementation time, structure each major page section as its own component, keep shared primitives separate, and isolate client components to interactive islands.
8. Wrap the WHOLE thing in a single fenced \`\`\`text block so it is one copy-paste.

Output the fenced block and nothing else.`,
  { label: 'assemble', schema: PROSE_SCHEMA, effort: 'high' }
)

// The v1 skill drifted 2x over budget because nothing ever counted. This counts.
const words = (final?.markdown ?? '').split(/\s+/).filter(Boolean).length
const [floor, ceiling] = { B: [1800, 3200], E: [2000, 3600], A: [1400, 2200] }[variant] ?? [1400, 2200]
const beats = dir?.mechanic?.choreography?.length ?? 0
const underFloor = words < floor
const overCeiling = words > ceiling

if (underFloor) log(`UNDER FLOOR: ${words} words vs floor ${floor} — something was left to guesswork`)
if (overCeiling) log(`OVER CEILING: ${words} words vs ceiling ${ceiling} — likely pasting code, not specifying it`)
if (beats < 6) log(`WARN: choreography table has ${beats} beats, expected 6-8`)
if (!dir?.decision) log('WARN: no non-obvious decision locked — output is likely template-shaped')

return {
  variant,
  brand: dir?.brand,
  decision: dir?.decision,
  mechanic: dir?.mechanic?.name,
  choreographyBeats: beats,
  words,
  budget: { floor, ceiling, underFloor, overCeiling },
  gapsClosed: critique?.gaps?.length ?? 0,
  referenceMode: reference?.mode,
  referenceSource: reference?.source,
  droppedWriters: dropped,
  prompt: final?.markdown ?? merged,
}
