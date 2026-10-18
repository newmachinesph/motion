# Pipeline — the seven stages, in the order a studio actually works

The skill has been writing the *last* document first. A real project runs discovery → strategy
→ art direction → foundations → wireframe → visual design → build → QA, and each stage
**constrains** the next. That constraint chain is what makes the output feel designed rather
than assembled.

## The one correction to make up front: art direction, not randomisation

Rolling a random palette and a random font pairing produces arbitrary output, which is the
same failure as a trend checklist one layer down. Every choice below is **parametric**: the
brief fixes the direction, the direction fixes the strategy, the strategy generates the values.
Variety comes from the direction being different each time, not from a dice roll.

> **The test for every value in stages 2–4:** can you name the input it was derived from? If
> the answer is "it looked nice", it is arbitrary — go back to the direction and derive it.

Each stage has a **gate**. Do not start the next stage until the gate passes.

---

## Stage 0 — Discovery brief

**In:** the user's request, plus any reference URL, screenshot, or brand deck (`intake.md`).
**Out:** a 6-line brief.

```
Product        what it is, in the buyer's words
Audience       who decides, what they already know, device + network
Job of page    the one thing a visitor must do or understand
Proof          what makes the claim believable — numbers, names, craft, scale
Constraints    stack, locale, a11y target, brand assets that already exist
Anti-goal      the thing this page must NOT look like
```

**Anti-goal is the highest-value line and the most often skipped.** "Must not look like a
crypto site." "Must not look like a hospital." It kills more bad directions in one sentence
than any amount of positive description.

**Gate:** every line answered. Ask at most 2 questions; decide the rest and say so.

---

## Stage 1 — Art direction

**In:** the brief. **Out:** a direction statement of 4 lines, written before any value exists.

```
Species        photographic · product-SaaS · illustrated · type-led   → species.md
Form thesis    the structural rule a competitor would not have made   → form-thesis.md
Direction      one Tier 1 trend direction + the two declined          → trends-2027.md
Register       the adjective pair the page must earn, e.g.
               "quiet and exact", "loud and generous", "cold and precise"
```

The **register** is what stages 2–4 are actually derived from. "Quiet and exact" produces a
narrow chroma range, a single family, a tight scale, small radii and 200ms motion. "Loud and
generous" produces two accents, a display face with character, a 1.5 ratio, pill radii and
600ms motion. Same pipeline, opposite output, neither arbitrary.

**Gate:** describe the page in one sentence without naming the product. If that sentence could
describe a competitor, there is no direction yet — go again.

---

## Stage 2 — Foundations (parametric)

**In:** species + register. **Out:** palette, type, space, radius, shadow, motion — all as
values, none by taste.

### 2.1 Colour — OKLCH, one ramp per role

OKLCH is perceptually uniform: equal L steps look equally spaced across hues, which HSL does
not do. Generate a ramp by **varying L only** and holding H, with C on a curve.

```
L anchors (12 steps):  97 · 94 · 90 · 84 · 76 · 66 · 58 · 50 · 42 · 34 · 24 · 15
C curve:               low at both ends, peak at steps 8–9
                       e.g. .012 .02 .04 .07 .10 .13 .16 .17 .16 .13 .08 .04
H:                     constant per ramp
```

Role assignment (Radix's semantics, which are worth copying exactly):

| Steps | Role |
|---|---|
| 1–2 | page and app backgrounds |
| 3–5 | component backgrounds: rest · hover · active |
| 6–8 | borders: subtle · interactive · strong |
| 9–10 | solid fills — **9 is the accent everyone means by "the brand colour"** |
| 11–12 | text on the page ground: secondary · primary |

**Which hues, derived not picked:**

- **Primary hue** comes from the register and the anti-goal, and both get stated.
  Cold/precise → 220–260. Warm/human → 30–70. Organic → 120–160. Editorial neutral →
  a near-achromatic ink at C ≤ 0.02.
- **Secondary hue** is a stated relationship, never a second favourite:
  analogous `+30°` (harmonious, low tension) · split-complementary `+150°/210°`
  (the safest high-contrast pair) · complementary `+180°` (loud, use once) ·
  triadic `+120°` (playful, hard to control).
- **Neutral ramp** is the primary hue at `C 0.004–0.015` — a **tinted** neutral. Pure grey
  (`C 0`) next to a saturated accent reads as dead, and it is one of the clearest tells of a
  generated palette.
- **Semantic** success/warning/danger get their own ramps at the conventional hues
  (145 / 85 / 25) tuned to the same L anchors, or the page looks like two design systems.

**Always ship a hex fallback** in `@supports not (color: oklch(0 0 0))`.

**Contrast gate:** body text ≥ 4.5:1 and large text ≥ 3:1 (WCAG 2.2 AA), checked against the
actual ground it sits on, both themes. Step 11 on step 2 and step 12 on step 1 should pass by
construction — verify rather than assume.

### 2.2 Type — modular scale + a pairing strategy

**Base 16px.** Below that fails the practical readability floor for body copy.

**Ratio, chosen by species, not by taste:**

| Ratio | Name | Use |
|---|---|---|
| 1.2 | Minor third | dense UI, dashboards, docs |
| 1.25 | Major third | product-SaaS marketing — the safe choice for complex pages |
| 1.333 | Perfect fourth | the general web default; clear heading contrast without giant mobile type |
| 1.5 | Perfect fifth | editorial, type-led, display-driven |

**Two scales in one system is normal and correct**: a tight ratio (1.2) for UI text and a wide
one (1.333–1.5) for editorial display. Say which applies where.

**Pairing — pick one of three strategies and name it:**

1. **Superfamily** (safest). One design, several classifications — shared metrics and
   proportions guarantee they sit together. `IBM Plex Sans + IBM Plex Serif + IBM Plex Mono`.
   Also `Source Serif 4 + Source Sans 3`, `Noto Serif + Noto Sans`.
2. **Contrast of classification.** A display face against a neutral text face. The two must
   differ in *classification* but share **x-height and stroke-weight range**, or the body
   looks smaller than it is. `Bricolage Grotesque + Lora` · `Instrument Serif + Inter` ·
   `Fraunces + Inter` · `Playfair Display + Source Sans 3` · `Geist + Inter`.
3. **Single family, full range.** One variable family carrying the whole page on weight,
   width and optical size. `Inter` alone, or `Geist` alone. The most restrained option and
   correct for "quiet and exact".

**Rules that make a pairing work, all checkable:**
- **Contrast, not similarity** — two geometric sans faces read as a mistake, not a system.
- **Matching x-heights.** Sans faces usually run larger; if the serif has a small x-height,
  size it up rather than accepting a mismatch.
- **Never more than 3 families**, and the third is a mono with a job (data, labels, code).
- Test them **stacked**, at real sizes, in the real page — not side by side in a specimen.

Set the display tracking from the size: display above 32px takes `−0.02 to −0.055em`; body
takes `0` or `−0.01em`. Never track body loose.

**Line-height by species:** 1.3 corporate/editorial · 1.6–1.7 product-SaaS · 1.5 illustrated.

### 2.3 Space, radius, shadow, motion

- **Space: 8pt grid**, with 4pt allowed for sub-component gaps.
  `4 · 8 · 12 · 16 · 24 · 32 · 40 · 64 · 96 · 128`. Section padding is its own scale.
- **Radius: one ladder, three rungs.** Register decides: quiet → `2 / 8 / 12`;
  generous → `8 / 16 / 100` (pill). Mixing five radii is the clearest generated-UI tell.
- **Shadow: one ramp, 3 fractional stops**, or none at all. A single `0 4px 12px rgba(0,0,0,.1)`
  is the default look — either build the ramp or commit to borders.
- **Motion: one duration ladder + one easing.** `150 / 240 / 600 / 1000ms`, easing from the
  register (`cubic-bezier(.44,0,.56,1)` neutral, expo-out for arrival). See `motion-system.md`.

**Gate:** every token has a stated derivation. A reader can ask "why 1.25?" and get "product-
SaaS, dense feature grid" — not silence.

---

## Stage 3 — Information architecture, then low-fidelity layout

**In:** brief + foundations. **Out:** section order with a reason, then an ASCII wireframe.

Write the section list as **beats**, not content types — the order carries the argument:

```
1  Hero            claim + proof-of-scale + primary action
2  Logo strip      borrowed credibility, before anything is explained
3  Problem         name the reader's situation in their words
4  Capability ×N   claim → mechanism → proof
5  Method          how it works, because they now want to know
6  Evidence        metrics + quotes, fused (bento) or split
7  Objection       pricing / FAQ / security — the last thing between them and acting
8  Close           one action, restated
```

Then the **lo-fi**, in ASCII, with block types only — no copy, no colour:

```
┌──────────────────────────────────────────────┐
│ NAV  wordmark ······ links ······ [CTA]      │
├──────────────────────────────────────────────┤
│                                              │
│   [eyebrow]                                  │
│   ██████████████████  H1 2 lines             │
│   ────────────────    lede 2 lines           │
│   [CTA] [ghost]                              │
│                                              │
│   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  media 21:9             │
└──────────────────────────────────────────────┘
```

This is the stage that catches structural mistakes for free. **The Northbound hero shipped
with no words above the fold** — a 30-second lo-fi would have shown a full viewport of media
before a single line of type.

**Gate:** the lo-fi shows the first viewport at desktop *and* at 390px, and the primary claim
plus one action are visible in both without scrolling.

---

## Stage 4 — Design system: tokens and components

**Tokens in three tiers.** This is the standard architecture and it is what makes theming and
handoff work:

```
primitive   --blue-9: oklch(58% .17 255)      what it IS. stable, never referenced by a component.
semantic    --color-accent: var(--blue-9)     what it's FOR. the theming switchboard.
component   --btn-bg: var(--color-accent)     where it's USED. optional; only when a component
                                              needs to diverge.
```

**Components are written 90% against the semantic tier.** A component referencing
`--blue-9` directly cannot be themed, and that is the single most common token-architecture
failure.

**Component specs, atomic order** — atoms (button, input, badge, icon, link) → molecules
(card, field, metric, quote, tab) → organisms (nav, section header, grid, footer, form).

Every interactive component ships **five states** written out: rest · hover · active ·
focus-visible · disabled. Plus loading/empty/error for anything async. `frontend-design` and
`ui-ux-pro-max` are worth loading here if the component set is large.

**Gate:** no component references a primitive token. Every interactive component has all five
states specified as values.

---

## Stage 5 — High-fidelity spec

The document this skill has always produced, now with stages 0–4 above it as inputs rather
than as assumptions. Section by section: verbatim copy, the density payload for the species,
the choreography table, states, responsive, a11y.

Follow `SKILL.md` steps 5–9b unchanged. Everything there still applies — it is now
*downstream* of a direction instead of standing in for one.

**Gate:** `wc -w` at or above the variant floor, and zero placeholders.

---

## Stage 6 — Handoff

File tree · asset manifest with every route (author / source / generate / placeholder) ·
implementation gotchas · the execution mandate naming the two or three things most easily lost.

**Gate:** a builder could start without asking a question.

---

## Stage 7 — Verification

`verification.md` + `density.md` §acceptance. Run against the **rendered DOM**, then
**screenshot and look**. Counts passing is not the same as the page working — Northbound
passed every count while its hero rendered with no words on screen.

**Gate:** rendered-DOM audit clean, and hero / two mid sections / footer / mobile looked at.

---

## The stage table, for a spec's opening page

Every prompt this skill emits should carry this as §0, so the reader can see the chain:

```
## How this spec was derived

Brief        <product · audience · job · proof · constraints · anti-goal>
Direction    <species> · <form thesis> · <trend direction, 2 declined> · register "<x and y>"
Palette      OKLCH, primary H<n> (from register), secondary <relationship>,
             tinted neutral C<n>, 12-step L ramp, AA verified both themes
Type         <strategy>: <families>, ratio <n> (<reason>), LH <n> (<species>)
Space        8pt grid · radius <a/b/c> · shadow <ramp|none> · motion <ladder> <easing>
Structure    <n> sections as beats, lo-fi verified at 1440 and 390
```

Six lines, and every value in the spec below traces to one of them.

## Acceptance checks

1. Stage 0's anti-goal is stated, and nothing in the spec violates it.
2. The register is named, and palette + type + radius + motion all trace to it.
3. Every colour is OKLCH with a hex fallback; the neutral is tinted, not `C 0`.
4. The type ratio is named with its reason; the pairing strategy is one of the three.
5. No component token references a primitive.
6. The lo-fi was written before any hi-fi copy, and shows both breakpoints.
7. The derivation table is §0 of the emitted prompt.

Sources for the stage model and the parametric rules: OKLCH scale construction and the 12-step
role assignment follow the approach used by Radix, Tailwind and Material 3; the modular-scale
ratios, the 16px base and the two-scale split follow standard type-system practice; the
three-tier token architecture and atomic component order follow Brad Frost's design-tokens
model; the seven-stage sequence follows the conventional agency discovery → strategy →
wireframe → visual → build → QA → launch workflow.
