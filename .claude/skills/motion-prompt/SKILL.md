---
name: motion-prompt
description: Turn a brief, reference URL, screenshot, or brand deck into a hyper-fidelity design prompt — a full implementation spec (stack, palette, type scale, section-by-section copy, signature motion mechanic, diagrams, states, assets, responsive, a11y, perf) that another AI or engineer can build pixel-perfect in one shot. Covers editorial/awwwards sites, technical product and YC-startup sites, single sections, and components; composes a custom shape when none fit. Use when the user says "motion prompt", "/motion-prompt", "write me a prompt for a landing page/hero/site", "make a motionsites-style prompt", "build a prompt for a startup site", or hands over a brief, screenshot, reference URL, or an existing prompt to improve — and wants a prompt out rather than code.
---

# motion-prompt

Output is **a prompt, not a website.** You are writing a specification document that a
different AI will implement without asking follow-up questions. Every gap you leave is a
decision that model will improvise — and improvised decisions are what make generated
sites look generic.

## Rule

> If a downstream model would have to guess it, you failed to specify it.

Vague → concrete, always:

**Two columns of "Always" on purpose.** The examples teach faster than any caveat, so both a
dark editorial register and a light restrained one appear side by side. Neither is the house
style — **the brief picks the register, and then every value is concrete either way.** A
clinic, a government service, or a children's product should look nothing like the left
column, and reaching for it because it appears first is the most common way this skill goes
wrong.

| Never | Always — dark / editorial | Always — light / restrained |
|---|---|---|
| "dark background" | `oklch(14% 0.012 60)` → `#1A1613`, raised `oklch(19% 0.014 60)` | `oklch(98.5% 0.008 95)` → `#FBF9F4` warm off-white, never pure white; cards `#FFFFFF` |
| "large headline" | `clamp(3.5rem, 9vw, 11rem)`, `'opsz' 144, 'wght' 300`, `letter-spacing: -0.035em`, `line-height: 0.86` | `clamp(2rem, 4vw, 3rem)`, `wght 600`, `line-height: 1.18` — restraint is a size decision too |
| "readable body text" | `1rem`, `wght 400`, `line-height: 1.68` | `1.125rem`, `line-height: 1.72`, **nothing below `1rem` anywhere**, contrast 7:1 (AAA) |
| "smooth animation" | `620ms cubic-bezier(0.16, 1, 0.3, 1)` | `200ms ease-in-out`, gentle, no overshoot — or **no animation at all**, stated as a rule |
| "modern font" | `Fraunces` variable (`opsz 9..144`, `WONK 0..1`) + `Inter` | one family only — `Source Sans 3` variable, tall x-height, open apertures |
| "a compelling headline" | `"Beyond silence, we build the eternal."` | `"Every child gets there. Some need a hand along the way."` — both verbatim, in quotes |
| "glassmorphic card" | `backdrop-filter: blur(40px) saturate(180%)`, 1px `oklch(100% 0 0 / 0.12)` | `1px` solid border, `border-radius: 12px`, **no shadow** — elevation implies urgency |
| "responsive" | `@container (min-width: 460px)`; `<768px` headline → `clamp(2.5rem, 12vw, 4rem)` | same discipline, plus **48×48px minimum tap targets, 8px apart** |
| "animates on scroll" | a **beat table**: progress range → what moves, how far, over what easing (`anatomy.md` §6) | often the right answer is **nothing animates on scroll** — say so as a rule and list the complete motion inventory instead |

## Steps

**Run them as a pipeline, not a checklist.** `reference/pipeline.md` is the spine: discovery →
art direction → foundations → lo-fi → design system → hi-fi → handoff → QA, each stage gated
by the one before it. The steps below are the stages expanded; the pipeline is what stops them
being answered in the wrong order.

> **Art direction, never randomisation.** A rolled palette and a rolled font pairing are
> arbitrary — the same failure as a trend checklist, one layer down. Every value in stages 2–4
> is **parametric**: the brief fixes the direction, the direction fixes the strategy, the
> strategy generates the values. Variety comes from the direction differing each time.
> **Test: name the input each value was derived from. "It looked nice" means go back.**

0. **Intake — run this before anything else.** `reference/intake.md`. Use every input that
   arrived: fetch a reference URL, read a screenshot, honour a supplied brand deck as an
   override rather than inventing a palette over it. Capture the constraints that change the
   build — **audience network and device (check before choosing the mechanic, not after)**,
   accessibility target, locale and direction, existing stack. If a prior prompt is being
   improved, use refine mode, not regeneration.
0b. **Audit reference fidelity before art direction.** `reference/reference-fidelity.md`.
   For a live reference, inspect desktop `1440×900` and mobile `390×844`, write the measured
   section map, extract structural design DNA, set per-section payload floors, and define the
   preserve/replace boundary. The finished prompt must include a three-pass screenshot
   compare-adjust-capture loop. A URL is evidence, not a bag of mood adjectives.
1. **Classify the surface first.** `reference/variants.md` — A Section, B Full landing
   page, **E Technical product site**, C Registry component, D Library component. The
   variant picks the skeleton, the word budget, and where the detail goes. **Getting this
   wrong costs more than any amount of missing detail**: a landing page written in the
   Section shape is a bloated hero with eight afterthoughts, and a dev-tool site written in
   the B shape is a beautiful page that never explains the product.
   - *section noun* ("hero", "pricing", "footer") → **A**
   - *consumer or service business* (restaurant, travel, portfolio, agency) → **B**
   - *technical product* (dev tool, API, infra, AI, B2B SaaS, security, biotech, fintech),
     or the brief mentions YC / a startup / selling to engineers → **E**, and read
     `reference/technical-product.md` instead of the A/B anatomy
   - C and D are ~100-word stubs; write them and stop, do not inflate them.
   - *nothing fits* (docs site, dashboard, email, PDP, changelog, onboarding flow) →
     **compose variant F** per `intake.md` §3. Borrow the nearest skeleton, say which, add
     what the surface needs. **The taxonomy is a map, not a fence** — but the engine never
     bends: concrete values, one non-obvious decision, choreography table, states, routed
     assets, counted budget.

   **B vs E is the call that matters.** Ask: is there something here that is genuinely hard
   to explain? If the buyer already understands the product and the job is to make them
   *feel* something → B. If the buyer does not understand it yet and the job is
   comprehension then trust → E.
2. **Ask at most 2 questions — only if the answer changes the whole spec.** Missing brand
   name, industry, or the light/dark call are worth asking. Everything else: decide, state
   the decision, move on. Never block on taste.
2b. **Name the FORM thesis.** `reference/form-thesis.md`. A content decision can be entirely
   correct and leave the page looking like every competitor — that is exactly how a spec
   whose thesis was "state limits before capabilities" produced a page indistinguishable
   from any other dev-tool site. The form thesis is a structural decision about the page
   *as an object*, and it must land in **three or more** of: structure, type, rhythm,
   surface, colour-logic, density.

   Test: describe the page in one sentence without naming the product. If that sentence
   could describe a competitor, there is no form thesis yet.
3. **Name the ONE non-obvious decision — before writing a single spec line.** Skeletons
   produce skeleton-shaped output. What saves a spec from being a template is one rule a
   competitor would not have made, applied consistently everywhere. Write it as a sentence
   and hold it: *"every specimen fact is set in mono, so the whole site speaks with a
   scientific voice."* *"no section may centre its content."* *"the accent colour appears
   at most four times per viewport."* If you cannot name it, you are about to write a
   template. It goes into §1 as a stated rule, and the rest of the spec obeys it.
   **Variant E's version is "the one hard thing"** — the single concept the product exists
   because nobody understands. Same slot, different question. See `technical-product.md`.
3a. **Name the SPECIES and the register — the two inputs everything downstream derives from.**
   `reference/species.md` + `pipeline.md` §1.

   **Species** — photographic · product-SaaS · illustrated · type-led. It sets the density
   floor, the body line-height (**1.3 corporate · 1.6–1.7 SaaS · 1.5 illustrated**), the family
   count, the type ratio, and whether a pinned scrub belongs at all. The floors in `density.md`
   were measured on two corporate photographic sites and are **not universal** — a product-SaaS
   reference runs 3 images per section with three sections at zero and reads as finished. The
   floor that survives every species is not a number: **no section is type-only.**

   **Register** — the adjective pair the page must earn.
   *"quiet and exact"*, *"loud and generous"*, *"cold and precise"*. This is the single input
   the whole foundation layer is derived from: it sets chroma range, family count, scale
   ratio, radius ladder and motion duration. Also capture the brief's **anti-goal** — the one
   thing the page must not look like. It kills more bad directions in a sentence than any
   amount of positive description, and it is the line most often skipped.

3b. **Run the trend selection matrix.** `reference/trends-2027.md`. The 2027 trend set is
   embedded there as four tiers, converted from vocabulary into tokens, CSS, counts and
   states. Route dynamically, never as a checklist:

   > **One Tier 1 form direction** (brutalism · vintage · collage · organic · illustration-led ·
   > experimental navigation · emotional-narrative), justified in one sentence that would
   > **not** be true of a competitor. **All of Tier 2 always** (cognitive-inclusive, ethical,
   > dark-mode tokens, minimalism, animation) — as requirements, never announced as features.
   > **Up to three Tier 3 interaction layers** matched to brief signals (micro-interactions
   > and a metrics row match nearly always; real-time, gamification, predictive rarely).
   > **Tier 4 product features only on an explicit ask** — an unrequested chat bubble is the
   > clearest signal a page was assembled from a trend list.

   Then **state the two declines**. A spec that names what it refused is the thing that stops
   the next brief in the same category producing the same page.

   > Two traps the file exists to defuse: **"dark mode" as a direction** is the fastest route
   > back to the banned near-black + acid default — it is a token set, not a look. And
   > **"minimalism"** is the word that produces a 5-section page with no images. Minimalism
   > means restraint in the *system* (≤3 families, one icon set, one radius ladder), never
   > fewer elements on the page. The measured reference is minimal and carries 43 images.
3c. **Generate the foundations parametrically, then the lo-fi — before any copy.**
   `pipeline.md` §2–3.

   - **Colour:** OKLCH 12-step ramps, **vary L only** on the anchors `97·94·90·84·76·66·58·50·
     42·34·24·15` with chroma peaking at steps 8–9. Roles follow Radix semantics: 1–2 grounds,
     3–5 component fills, 6–8 borders, **9–10 solid (9 is "the brand colour")**, 11–12 text.
     Primary hue derives from the register; the secondary is a **stated relationship**
     (analogous +30° · split-complementary +150/210° · complementary +180° · triadic +120°),
     never a second favourite. **The neutral ramp is the primary hue at C 0.004–0.015** — a
     pure-grey neutral beside a saturated accent is one of the clearest generated-palette tells.
   - **Type:** base 16px. Ratio by species — 1.2 dense UI · 1.25 product-SaaS · 1.333 general
     web · 1.5 editorial — and two ratios in one system is normal. Pairing is one of three
     named strategies: **superfamily** (shared metrics, safest), **contrast of classification**
     (differ in class, *match x-height*), or **single family, full range**. Never more than 3
     families; the third is a mono with a job.
   - **Space 8pt grid · one radius ladder of three rungs · one shadow ramp or none · one
     duration ladder and one easing.** Five radii is a tell; a single `0 4px 12px rgba(0,0,0,.1)`
     is the default look.
   - **Then the lo-fi**, in ASCII, block types only, at **1440 and 390**. This is a 30-second
     step that catches structural mistakes for free — Northbound shipped a hero with **no words
     above the fold**, and a lo-fi would have shown a full viewport of media before any type.

4. **Pick ONE signature mechanic — or deliberately none.** The single memorable thing the
   page does. See `reference/mechanics.md` for the catalog with exact values. One mechanic,
   specified to mechanism level. Three half-described effects read as noise. (Variant B: one
   mechanic gets full depth — usually the hero's — the rest stays at bullet depth.
   **Variant E: the mechanic is the primary diagram, and every motion must be justified as
   comprehension, not atmosphere.**)

   **"No timeline mechanic" is a legitimate, sometimes correct answer.** Healthcare, clinical,
   government, children's, accessibility-first, and documentation surfaces are often *better*
   without one. If you choose none, say so explicitly and replace the mechanic section with a
   **complete motion inventory** — every transition on the site, listed, each one a direct
   response to something the visitor did. That inventory is the spec. Silence is an omission;
   a stated refusal with a list is a decision.
4b. **Specify the scroll system.** `reference/scroll-craft.md`. Across eight builds this skill
   produced, every page used native scroll and every reveal was `opacity + translateY`. Not
   one used a pin, a scroll-linked transform, or a smooth-scroll runtime — which is why they
   read as well-made pages rather than designed scroll experiences.
   Any A or B page with a hero worth remembering states: **Lenis** (duration ~1.05, expo-out,
   never instantiated under `prefers-reduced-motion`, `scroll-behavior` removed from the
   reset), the **pin geometry** (`height: 280vh` track, `100svh` sticky stage, ancestors
   `overflow: clip` never `hidden` and carrying no transform), and enter states that carry
   **scale as well as translate** — `translateY(20px) scale(0.94)`, because translate alone
   reads as a list loading rather than an object arriving.
5. **Write the choreography table for that mechanic.** Progress range → beat. This is what
   separates a spec for a site that *looks* designed from one that *unfolds*. Non-negotiable
   for any scroll-driven or timeline mechanic. Format and worked example in `anatomy.md` §6.
   Then set the **motion profile** from `reference/motion-system.md` — the product type
   dictates the personality (banking is controlled and never bounces; kids apps spring;
   dev tools stay out of the way), and every duration and curve on the page follows from it.
   The hard budget: **the whole entrance sequence completes under 700ms.**
6. **Write real copy — you are the copywriter here, not just the spec writer.**
   **Load the `anti-ai-slop-writing` skill first**, then follow `reference/copy.md` for the
   web-specific patterns it doesn't cover: headline 3–9 words and one idea, subhead carrying
   the mechanism, CTAs verb-first at 2–4 words, every feature block as claim → mechanism →
   proof. Headline, subtitle, nav labels, CTA text, badge text, footer links — actual strings
   in quotes, never `[Your Headline Here]`. Content-bearing sections need their **data
   written out in full**: every pricing tier with its real price and bullets, every FAQ
   question *and answer*, every testimonial with name, role, and a specific outcome.
   Two gates: the **swap test** (put a competitor's name in — if it still reads true, it's
   dead copy) and the **screenshot test** (five seconds of hero only — can they say what it
   does and who it's for?).
7. **Fill the variant's skeleton.** A → the 11 sections of `reference/anatomy.md`. B → the
   6-section shape in `variants.md`, and it must carry the three things Sections don't:
   an ASCII **file tree**, a grouped **asset manifest**, and a closing **execution mandate**
   naming the two or three hardest details not to skip. E → the 8-section shape in
   `technical-product.md`, which adds a **diagram system** (§3) and a **conversion
   architecture** (§5) that A and B have no equivalent for.
7a. **Apply the species' visual payload to every section.** Species was named at 3a; this is
   where it is spent. Every section carries a dense payload and **none is type-only** — the
   payload's *type* is species-specific, its *presence* is not. Product-SaaS: authored product
   UI, 48px stroked accent icons, colour-blocked bento tiles — **not photography**, where a
   stock photo reads as a product that does not exist yet. Photographic: locked media plates.
   Illustrated: authored SVG scenes. Type-led: rules, colour fields and the type itself.

7b. **State the density budget as explicit counts.** `reference/density.md`. Measured against
   a commercial template: **43 images, 43 choreographed reveal targets, 34 icons and 9
   sections**, versus **0 / 4 / 3 / 5** on our last build. A ~10× element-count gap, with no
   canvas, no WebGL and no blend modes anywhere in the reference.

   > This is the finding nine builds were missing. Every one had a signature mechanic and a
   > form thesis; every one came back "not the level of the reference." The reference is not
   > more sophisticated — it is **ten times denser**. Its cleverest move is a
   > `translateY(20px)` fade. It looks finished because there are 43 pictures on it and
   > every one sits in a locked box with an overlay and a hover state.

   Write the numbers into the spec — a floor that is not stated is not met. Variant B:
   ≥8 sections, ≥30 images, ≥30 reveal targets, ≥20 icons, ≥900 words; per section ≥4 / ≥4 /
   ≥3 / ≥100. **Every card is a picture with words under it.** One metrics row. An arrow
   mark on every card and link. A gradient overlay on every image carrying text.

   Carry the measured constants too: body `15px/1.3em` and display `60px` at `-0.04em`,
   `text-wrap: balance`, enter `1s cubic-bezier(.44,0,.56,1)` with a `0.1s` stagger, blur-up
   on every image, page `1920px` / content `1200px` / gutter `40px`, 3-stop fractional
   shadows. Two prior claims corrected there: enter durations are **~1s, not 400–600ms**, and
   **scale in enter states is product-type, not universal** — it was generalised from n=1.
8. **Specify the states.** Loading, empty, error, success — for every surface that has them
   (forms, filters, feeds, async media). The corpus specifies happy paths and leaves failure
   to the implementer, which is why generated sites break the moment anything goes wrong.
8b. **Add the production-discipline block.** `reference/production-polish.md`. Measured across
   five commercial templates: **449 of 449 images carried explicit `width`+`height`**, all had
   `object-fit`, all used two or three breakpoints, and none used canvas, video, `clip-path`
   or blend modes. Polish is locked boxes and restraint, not effects.

   > A signature mechanic makes a page **memorable**. This block makes it **credible**. Our
   > builds have repeatedly had the first and lacked the second. A spec needs both.

   Mandatory in every spec: reveals **fail open** — `opacity: 1` by default, the animation
   only ever adds, guarded by `@supports`, and never a range that can't complete. Four of our
   builds shipped content stranded invisible before this rule existed.
9. **Route every asset.** `reference/assets.md`. Each one is **authored** (diagrams,
   abstracted UI, charts — anything needing labels, themes, or truth), **sourced**
   (third-party logos — never generated: wrong-looking and a trademark problem),
   **generated** via the Codex bridge (original, non-factual imagery), or **placeholder**
   (`picsum.photos/seed/<id>/<w>/<h>`, `i.pravatar.cc` for people). Manifest entries carry
   route, exact location, the spec the asset must meet, and its dark-theme variant.

   **Fill every image slot with a placeholder from the first commit.** The subject does not
   need to match the topic — the aspect, count, locked box, overlay, blur-up and hover state
   are the deliverable, and waiting for real photography is how a build ships with zero
   images. `source.unsplash.com` is **dead (503)**; do not specify it.

   > **A placeholder may never carry a factual claim.** `alt=""` and a nominal caption
   > ("Fig. 04"), never "PR106 vermilion specimen, 22µm". Seven images were verified
   > `HTTP 206` on the last build and six showed something unrelated to their caption. A
   > status code proves a file exists; it proves nothing about what is in it. Logos, named
   > testimonial faces, and charts are never placeholders — they are claims by nature.
9b. **Write the acceptance checks.** The spec's last section, before the mandate, is a short
   list of things a builder can *run* to prove the spec was followed — greps, contrast
   pairs, a screenshot test per diagram, a word or count assertion. See `verification.md`.

   > Two full builds were executed from specs written by this skill. **Every defect in both
   > was found by building, none by reading** — a scroll-range that left content permanently
   > invisible, a framework token that silently violated a brand rule, an element the spec
   > called "the loudest" and specified at 11px. Prose review does not catch these. A spec
   > that cannot be checked is a spec that will be wrong in ways nobody notices.
10. **Emit** the whole thing inside one fenced ```text block so the user can copy it in a
   single click. Role opener (matched to the variant) → `***` → the spec. **Match the format
   to whoever consumes it** (`intake.md` §4): default suits a human engineer or Claude Code;
   v0/Lovable/Bolt do better with one surface per prompt; a design tool wants the visual
   system first and the file tree dropped.
11. **Count the words with a tool. Never by estimating.**
   Write the prompt to a file, then run `wc -w` on it and report the number that command
   returned. Do not write a count you arrived at by looking at the text.

   > This is not pedantry. Across five calibration runs, every self-reported count was
   > wrong — by 12%, 12%, 17%, 31%, and 46%. An earlier version of this step said "actually
   > count them" and it failed five times out of five, because **an instruction to verify is
   > satisfied by assertion unless it names the tool.** The same trap applies to any check
   > you might be tempted to answer from memory: measure it or do not claim it.

   Compare the returned number against the variant's range in `variants.md`. Under the floor
   means underspecified — find what you left to guesswork rather than padding. Then run the
   checklist.

## Checklist

- [ ] Variant classified, and the skeleton matches it (A deep / B wide / C, D short)
- [ ] **The one non-obvious decision is named in §1 and obeyed everywhere**
- [ ] **If there is a timeline mechanic**, a choreography table is present (progress range → beat). **If there is deliberately none**, that refusal is stated and a complete motion inventory replaces it
- [ ] **Scroll system specified** — Lenis config, pin geometry, and enter states carrying scale not just translate
- [ ] **Motion profile matches the product type**; entrance sequence completes under 700ms; exits ~2/3 of entrances
- [ ] **Counts verified against the rendered DOM, not `dist/index.html` or `src/`** — a client-rendered page ships an empty root and greps to 0
- [ ] **Hero, two mid sections, footer and mobile screenshotted and actually looked at** — counts passing is not the same as the page working
- [ ] **Exactly one Tier 1 trend direction taken**, justified in a sentence untrue of a competitor, with two declines stated
- [ ] **No Tier 2 item written as a feature**; no unrequested Tier 4 feature present
- [ ] **Derivation table is §0 of the emitted prompt** — brief · direction · palette · type · space · structure, six lines, every value below traceable to one
- [ ] **Register named**, and palette, type, radius and motion all trace to it; **anti-goal stated and not violated**
- [ ] **Palette generated, not picked** — OKLCH L-only ramp, roles assigned, secondary a stated hue relationship, **neutral tinted (C 0.004–0.015), never pure grey**
- [ ] **Type ratio named with its reason**; pairing is one of the three strategies; x-heights compatible; ≤3 families
- [ ] **One radius ladder, one shadow ramp (or none), one duration ladder** — no fifth radius, no lone default shadow
- [ ] **Lo-fi written before any hi-fi copy**, shown at 1440 and 390, with claim + one action visible in the first viewport at both
- [ ] **No component token references a primitive**; every interactive component has all five states as values
- [ ] **Species named** (photographic / product-SaaS / illustrated / type-led) with the payload type justified in one sentence
- [ ] **No section is type-only** — every section carries its species' visual payload
- [ ] **Body line-height matches the species**; pin/scrub either justified by the brief or its absence stated as a decision
- [ ] **Density budget stated as numbers** — sections, images, reveal targets, icons, words; page floors and per-section floors both present
- [ ] **Every image slot filled with a placeholder URL** (`picsum.photos/seed/…`), none left "supply your own"
- [ ] **No placeholder carries a factual claim** — `alt=""` or a nominal caption, never a description of what the photo shows
- [ ] **Every card contains an image**; arrow mark on every card and link; one metrics row; gradient overlay on every image carrying text
- [ ] **Measured constants carried** — body 15px/1.3em, display −0.04em tracking, `text-wrap`, enter 1s + 0.1s stagger, blur-up on load, 3-stop shadows
- [ ] **Every asset routed** — authored / sourced / generated / placeholder — with location, spec, and dark variant
- [ ] **No brand logo is generated.** Sourced from svgl, Simple Icons, theSVG, or an official press kit
- [ ] **Every supplied input used** — URL fetched, screenshot read, brand deck honoured as an override
- [ ] **Copy passes the swap test and the screenshot test**; `anti-ai-slop-writing` was loaded before writing it
- [ ] Headline 3–9 words / one idea; CTAs verb-first; features are claim → mechanism → proof
- [ ] Zero placeholders — no `[brand]`, no "your text here", no "e.g."
- [ ] Every color is OKLCH with a hex fallback. Every size is a token or a unit value.
- [ ] All headline, subtitle, nav, and CTA copy is written verbatim
- [ ] Exactly one signature mechanic, specified at mechanism level (what moves, how far, over how long, driven by what)
- [ ] Named component files (`Nav.tsx`, `EntrySequence.tsx`) so the output is structured
- [ ] Asset URLs present — media, CDN script, self-hosted variable fonts — or explicitly marked "supply your own" **with the spec it must meet**
- [ ] Container queries on cards and panels; viewport breakpoints only for the global grid and nav
- [ ] **States specified: loading, empty, error, success** wherever they exist
- [ ] Content data written out in full — every tier, every FAQ answer, every quote
- [ ] `prefers-reduced-motion` path is concrete, not a mention — say what renders instead
- [ ] Focus-visible specified with a real outline value, on every focusable element
- [ ] Variant B only: file tree, asset manifest, execution mandate all present
- [ ] Implementation gotchas called out (`overflow: clip` not `hidden` under sticky, `@property` registration before interpolating, Strict Mode double-mount, `/* @vite-ignore */`, `pointer-events-none` on canvas wrappers)
- [ ] **Word count produced by `wc -w` on the written file**, reported as that command returned it, and at or above the variant's floor
- [ ] **Form thesis named**, landing in 3+ of structure / type / rhythm / surface / colour-logic / density
- [ ] **Production discipline block present** — locked media boxes, 2 breakpoints, ≤3 font families, `will-change`
- [ ] **Reveals fail open** — `opacity: 1` default, `@supports` guard, reachable range
- [ ] **Acceptance checks present** — 6–10 runnable checks, before the execution mandate
- [ ] **No comparative claim left unspecified** — "the loudest" names the element it must beat
- [ ] **No ambiguous default** — themes state which signal wins; "default" is banned for themes
- [ ] **No pinned framework major**; the framework's agent instructions and reset tokens are accounted for
- [ ] Counts are derived from stated properties, never asserted against other requirements
- [ ] Reads as a spec handed to a senior engineer, not as a wish

## Files

- `reference/intake.md` — **run first.** Input handling (URL, screenshot, brand deck), constraints, variant F, output-format matching, refine mode, and the skill's known limitations
- `reference/reference-fidelity.md` — **run after intake whenever visual quality matters.** Desktop/mobile evidence capture, measured section maps, design-DNA extraction, preserve/replace boundaries, payload floors, Next.js componentization, and the mandatory three-pass screenshot QA loop
- `reference/copy.md` — web copy: headline/subhead/CTA patterns, section jobs, microcopy, scannability. Pairs with the `anti-ai-slop-writing` skill
- `reference/variants.md` — the 5 surface types, word floors, routing
- `reference/anatomy.md` — the 11-section deep template (variant A), the 2028 platform baseline, and the choreography table format
- `reference/mechanics.md` — signature effect catalog: exact CSS, configs, and gotchas
- `reference/technical-product.md` — **variant E.** Dev-tool / YC / technical product sites: the diagram system, the technical grid, credibility and conversion architecture, and the voice rules. Replaces the A/B anatomy when the variant is E.
- `reference/motion-system.md` — motion profiles by product type, duration and easing tables, choreography rules, the 11-tool implementation cookbook, the "when motion feels wrong" translator, a11y and performance
- `reference/assets.md` — the author/source/generate routing rule, logo sourcing, the Codex image bridge, HyperFrames HTML→video, scroll-world
- `reference/form-thesis.md` — **read with variants.md.** The form thesis: the structural decision that stops output being generic. Banned category defaults.
- `reference/scroll-craft.md` — the scroll system: Lenis config, pin geometry, scale-in enter states, the expand-out-of-card beat, and which of CSS / Framer Motion / Lenis does which job
- `reference/trends-2027.md` — **the trend set as spec material.** All 20 named 2027 trends converted into tokens, CSS, counts and states, sorted into four tiers with a dynamic selection procedure. Read at step 3b, with `form-thesis.md`.
- `reference/pipeline.md` — **the spine. Read first.** The seven stages a studio actually works in — discovery → art direction → parametric foundations → lo-fi → tokens/components → hi-fi → handoff → QA — each with its gate. Contains the OKLCH ramp construction, the modular-scale ratios, the three pairing strategies, and the three-tier token architecture.
- `reference/species.md` — **read before density.md.** Photographic / product-SaaS / illustrated / type-led: which floors apply, what the visual payload is per species, four section patterns the skill had no entry for (sticky index, tab showcase, metric bento, pill-eyebrow-on-a-rule), and the character-level text reveal with its a11y requirement.
- `reference/density.md` — **the 10× gap.** Measured element counts from a commercial template vs. our own build (43 images to 0). The per-section budget, the composition unit, and the measured type / motion / geometry constants. Read this before writing any variant B spec.
- `reference/production-polish.md` — measured across 5 commercial templates: locked media boxes, 2 breakpoints, ≤3 families, fail-open reveals. What makes a page credible rather than merely memorable.
- `reference/verification.md` — **acceptance checks.** Every defect across two real builds was found by building, none by reading. Covers comparative claims, ambiguous defaults, derived counts, and framework defaults.

## Escalate

For a full multi-page site, or when the brief is high-stakes and one pass will not carry
it, run the workflow at `.claude/workflows/motion-prompt.js` — four spec writers in
parallel, an adversarial vagueness critic, then assembly. Costs ~6 agents. The skill alone
is right for a hero or a single landing page.
