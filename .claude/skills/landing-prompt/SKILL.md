---
name: landing-prompt
description: Write a complete, buildable landing-page specification from a brief. Produces a prompt in a fixed format that another model or engineer builds in one shot — measured design system, section-by-section blocks with verbatim copy, asset manifest, motion, states, and runnable acceptance checks. Use when the user asks for a landing page prompt, a website spec, "build me a prompt for X", hands over a reference URL or screenshot, or wants a marketing site specified rather than coded.
---

# landing-prompt

**Output is a prompt, not a website.** You are writing the document an engineer builds from
without asking a single question.

Built from three measured commercial templates — `homemaster` (local services),
`salix` (product SaaS), `westbridge` (corporate). Every number in `reference/systems.md` and
`reference/patterns.md` came off one of them with a browser, not from memory.

---

## The two failures this skill exists to prevent

**1. Underbuilt.** A page of headline + paragraph + three text cards. The reference pages carry
**33 to 64 images** and 8 to 11 blocks. Density is not decoration; it *is* the design.

**2. Category-blind.** Refusing a category's visual language because it looks familiar. A local
services site *should* have a friendly photograph of a person, an orange CTA and a warm ground —
executed well. "Anti-slop" means doing the convention properly, not inventing a convention
nobody in the category uses. A cleaning company laid out like a legal brief is not
sophisticated, it is wrong.

> The job is the **best version of what this category should look like**, not the most unusual
> thing you can defend.

---

## Process

**The full spine is `reference/pipeline.md`** — nine stages, each standing in for a real studio
role, each producing one file in the project folder, each with a gate that must pass before the
next begins. Two of those gates are the ones an automated pipeline usually skips and a studio
never does: the **content matrix** (stage 1) and the **art-direction sign-off** (stage 2, where
three directions are presented and two are recorded as declined).

The steps below are stages 0–5 condensed. Run the pipeline when the job is a project; run these
when the job is only the document.

### 1 · Brief (5 lines, ask at most one question)

```
Business     what it sells, in the buyer's words
Buyer        who decides, what they fear, phone or desktop
Action       the one thing the page must produce
Proof        the evidence that makes the claim believable
Reference    a URL or a named category convention to match
```

### 2 · Pick the archetype — `reference/systems.md` §1

| Archetype | Category | Ground | Display | Body | Signature |
|---|---|---|---|---|---|
| **Warm service** | trades, cleaning, home, local, health, care | deep colour slabs on white | 700 weight, 60px | 16/1.7 | cut-out subject, photo collage, doodles |
| **Product SaaS** | dev tools, dashboards, B2B | white, one dark slab | 500 weight, 64px | 14–15/1.7 | product UI renders, pill eyebrows, sticky index |
| **Corporate** | consultancy, property, finance | photographic full-bleed | 400–500, 62px | 15/1.3 | locked plates, restraint, translate-only reveals |
| **Editorial** | agency, portfolio, culture | paper, type-led | variable, 80px+ | 16/1.5 | rules, asymmetry, scale contrast |

**The archetype is chosen by category, not by taste.** Then take that row's whole system from
`systems.md` — palette, type, radius, motion. Do not mix rows.

### 3 · Pick the style — `reference/design-md.md`

**A four-to-six word image naming a thing, not a feeling.** `midnight control room, one live
wire` · `ledger on kraft paper, one ink` · `cathedral of white space, hairline grid`. It fixes
ground, mood, accent and density in one line, and every later value defends it. "Calm and
accountable" is a feeling and under-determines the system; "ledger on kraft paper" determines it.

Then take the whole style: **a named colour table** (name · hex · token · **role sentence
saying where it is used and why it exists**), **per-size letter-spacing**, substitute stacks for
every licensed face, **radius per element type** with the two structural radii named, elevation
named by purpose, and **4–6 Do / 2–3 Don't rules each carrying the reason it is the signature**.

A rule without its reason gets overridden by the next person who thinks bold looks stronger.

### 3a · Accent pairs, if composing a style from scratch — `systems.md` §2

One deep ground + one saturated accent. Named presets, all measured, all AA-checked. Vary the
pair per project; never vary the *structure* of the system.

### 3b · Pick the six variants — `reference/variants.md`

The archetype fixes the *language*. Without this step every brief in one archetype lands on the
same page — same split hero, same slab rhythm, same block order. Answer six questions **from the
brief**, and the composition is determined:

```
1  Is there a person or object worth photographing on a plain ground?  → hero shape (6 options)
2  How many blocks does the content actually justify?                  → rhythm (4)
3  Does each offer have a visible result?                              → card shape (4)
4  What is the single strongest piece of evidence?                     → proof block (5)
5  How does the business charge?                                       → commercial block (4)
6  What exactly is the action, and who takes it?                       → close (4)
```

> A cleaner, a landscaper and an emergency boiler firm are all warm service, and they answer
> these differently: `split-cutout / banded / photo-top / bento / plans / form-split` versus
> `centred-plate / bookend / photo-top / before-after / quote-only / single-cta` versus
> `list-hero / bookend / icon-lead / tiles / price-rows / call-first`. Same language, no shared
> layout.

Record the result as a **variant line** in §0. **Two specs in the same archetype must differ in
at least three of the six** — if they do not, the brief was not read closely enough.

### 4 · Choose blocks — `reference/patterns.md`

Pick 9–11 from the block library. Each entry gives exact geometry, the asset it needs, its
states and its motion. **Every block carries a visual payload; none is type-only.**

Standard warm-service order:

```
1  Nav              8  Team or process
2  Hero             9  Testimonials
3  Trust strip      10 Pricing or FAQ
4  Services         11 CTA + footer
5  About + collage
6  Metrics
7  How it works
```

### 4b · Rule every mechanic — `reference/trends.md`

Each carries a verdict. **Adopt** (agent-readable structure, performance budget, accessibility
as acceptance criteria, dark mode from system preference, motion that explains, View
Transitions, prefetch, bento done carefully, 3D only for things you rotate). **Watch** (glass,
ask-box, scrollytelling, kinetic type, grain, light personalisation) — the condition that
justifies it must be named. **Skip** (scrolljack, hero video, carousels, auto-chat, custom
cursors, voice UI, emotion-sensing) — present only if the brief demanded it, and the spec says so.

For anything not listed, three questions decide it:

```
1  Does it help a first-time visitor understand and ACT faster?
2  What does it cost the slowest phone in the audience?
3  Would it survive the page being read by a machine?
```

Two requirements this adds to every spec: **agent-readability** (one h1, correct outline, real
text never baked into images, JSON-LD for services/prices/area/rating, an llms.txt) and a
**performance budget stated in KB**. A page an agent can parse is a page a tired human on a
phone can parse.

### 5 · Write the spec in the fixed format below

**Or run `builder.html`** — it walks the pipeline as **six gated stages** and will not open the
next until the current gate passes. Copy is written *into* stage 1 rather than invented
downstream, so the spec carries it verbatim. It emits the numbered bundle plus `DESIGN.md`, a
Tailwind v4 `@theme` block and plain CSS custom properties: the system is data, the format is a
view.

### 6 · Verify — `reference/verify.md`

Run the audit against the **rendered DOM**, then screenshot and look. Report both.

---

## The output format — mandatory, in this order

Emit inside one fenced ```text block.

```
# <NAME> — landing page specification

## 0 · System
Archetype · accent pair (with hex) · type (families, sizes, weights, line-heights) ·
radius ladder · shadow rule · motion ladder · breakpoints. All values.
Plus a **variant line**: hero · rhythm · cards · proof · commercial · close.

## 1 · Stack
Framework, CSS, fonts (self-hosted), animation approach, what is banned.

## 2 · Density budget
Blocks · images · reveal targets · icons · words. As numbers.

## 3 · Assets
Every slot: kind (cut-out PNG / photo / SVG doodle / icon / logo / product render),
dimensions, and the exact placeholder URL. Plus the rule on factual claims.

## 4 · Blocks
One numbered entry per block. Each one carries, in this order:
  Layout      grid, spans, gaps, at 1440 / 810 / 390
  Assets      which slots, what size
  Copy        every word, verbatim, in quotes
  States      hover, focus, active, empty, error — whichever apply
  Motion      what enters, offset, duration, delay

## 5 · Motion system
Scroll driver, entrance rule, stagger, hover rules, reduced-motion path.

## 6 · Responsive
What changes at each of the two breakpoints. Specific, not "it stacks".

## 7 · Accessibility
Contrast pairs, focus, tap targets, labels, live regions, reduced motion.

## 8 · Gotchas
The three or four things that will break if not said.

## 9 · Acceptance checks
6–12 runnable checks against the rendered DOM.

## 10 · Mandate
The three things most easily lost, in order.
```

**Word floor: 2,000.** Count with `wc -w` on the written file and report what the command
returned. Never estimate — self-reported counts have been wrong every time they were checked.

---

## Hard rules

- **Every value concrete.** `oklch(42% .11 152)` / `#015d2d`, not "dark green". `600ms
  cubic-bezier(.44,0,.56,1)`, not "smooth".
- **All copy verbatim, in quotes.** Every heading, every card body, every FAQ answer, every
  label, every error string. **No `e.g.`** — it is how a spec hides a gap and still looks
  finished. Write all six, not one and an "e.g.".
- **Reveals fail open.** Rest state is the default; the animation only ever adds, guarded by
  `@supports`. Content stranded invisible is worse than no motion.
- **Every image in a locked box** with `width`, `height`, `loading`, and a blur-up.
- **Placeholders never carry a factual claim.** `alt=""`, nominal captions only. A named person
  gets initials on a colour field, never a stock face. Logos are sourced, never generated.
- **Two breakpoint boundaries**, 1200 and 810. Not five.
- **≤3 font families**, one radius ladder, one shadow rule, one motion ladder.
- **48px minimum tap targets**, 8px apart, `:focus-visible` on everything focusable.
- **No pinned scroll-scrub** unless the brief is narrative or a product reveal. Two of the
  three measured references have none.

## Files

- `reference/pipeline.md` — **the spine.** Nine stages from brief to launch, each mapped to the studio role it stands in for, each emitting one numbered file, each gated. Includes the content matrix and the art-direction sign-off, and an honest table of where this is still weaker than a studio.
- `reference/systems.md` — the four archetypes as complete measured systems: palette presets, type scales, space, radius, shadow, motion. Pick a row and take all of it.
- `reference/patterns.md` — the block library. 18 blocks with exact geometry, assets, states and motion, measured off the references.
- `builder.html` — **the pipeline, as a gated stepper.** Open in any browser, no build step. Six stages — brief · content matrix · direction with the sign-off · composition · mechanics · handoff — and **each gate is checked before the next opens**: the anti-goal must be substantive, the content matrix must carry enough real strings, both declined directions must have reasons, a skip-rated mechanic needs its justification, and the spec must clear 2,000 words with no `e.g.` Emits the numbered bundle (`00-brief` … `05-PROMPT`) plus `DESIGN.md`, Tailwind `@theme` and CSS variables.
- `reference/trends.md` — every trend with a ruling: adopt · watch · skip. Plus the three questions that sort anything unlisted, and the agent-readable + performance requirements.
- `reference/design-md.md` — **the system format**, adapted from Refero Styles (2,000+ systems extracted from real product sites). The descriptor, the named colour role table, per-size tracking, radius per element, and the Do/Don't rules that make a style reproducible.
- `reference/variants.md` — **the layer that stops two briefs in one archetype looking alike.** Six axes, 27 named variants, each selected by a question answered from the brief. Includes a worked three-way contrast.
- `reference/verify.md` — the rendered-DOM audit script, the check list, and what each check catches.
