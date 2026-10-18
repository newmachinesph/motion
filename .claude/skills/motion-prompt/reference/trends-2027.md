# The 2027 trend set — as spec material, not vocabulary

Twenty named trends, each converted into something a spec can *require*. A trend written as
a noun ("vintage looks") produces nothing. A trend written as a token, a CSS rule, a count
or a state is buildable.

**How this file is used:** it is a **selection matrix**, not a checklist. A page that tries
to carry all twenty is incoherent. Read §1 to route each trend into its tier, take exactly
one Tier 1 direction, apply all of Tier 2 always, add Tier 3 items the brief's signals call
for, and take Tier 4 only when the brief actually asks for the feature.

---

## 1. The four tiers

| Tier | Rule | Trends |
|---|---|---|
| **1 · Form direction** | **Pick exactly one.** Drives structure, type, rhythm, surface, colour-logic. This is the form thesis. | Brutalism · Vintage · Collage/scrapbook · Organic-sustainable · Illustration-led · Experimental navigation · Emotional-narrative |
| **2 · Baseline** | **Always on. Never a "direction."** Already mandatory elsewhere in this skill. | Cognitive-inclusive · Ethical & inclusive · Dark mode · Minimalism · Animation |
| **3 · Interaction layer** | **Add per brief signal.** Composes with any Tier 1. | Micro-interactions · Data-driven/metrics · Real-time content · Gamification · Predictive UX (the design half) |
| **4 · Product feature** | **Only if the brief asks.** Changes what you build, not how it looks. | Conversational UI · Chatbots · Hyper-personalisation · Immersive VR/AR |

**Two traps this file exists to defuse:**

- **"Dark mode" as a direction** is the fastest route back to the banned near-black + acid
  accent default. Dark mode is a *token set that must exist*; it is not a look.
- **"Minimalism"** is the word that produces a 5-section page with no images — the exact
  failure `density.md` measures at 10×. Minimalism means *restraint in the system*, never
  *fewer elements on the page*. Westbridge is minimal and carries 43 images.

---

## 2. Tier 1 — form directions (take one)

Each is specified to the point of being buildable. Whichever is chosen must land in **three
or more** of: structure · type · rhythm · surface · colour-logic · density.

### Brutalism / anti-design
- Type does the work: display at `clamp(64px, 12vw, 180px)`, `letter-spacing: -0.05em`,
  `line-height: 0.86`. Body stays plain — one weight, no niceties.
- **Hairline borders `1px solid` everywhere, radius `0`, shadows banned.** Structure is
  visible as rules, not as elevation.
- Asymmetric grid: `grid-template-columns: 7fr 3fr` and its mirror, alternating.
- Two colours plus paper. High contrast, no tints.
- **Hover reveals the image** — list of titles, photo appears on hover in a fixed slot.
  This is how a brutalist page still hits the density budget: the images exist, revealed.
- **Non-negotiable guard:** nav stays conventional and labelled, focus rings stay visible,
  contrast stays ≥4.5:1. Brutalism is a surface treatment, never an accessibility excuse.

### Vintage
- **Grain is a real layer**, not a filter: a tiled SVG `feTurbulence` at `opacity: 0.06`,
  `mix-blend-mode: multiply`, `pointer-events: none`, fixed over the page.
- Palette off-white and desaturated: `oklch(94% 0.014 85)` paper, ink at `oklch(26% 0.03 60)`.
- Photography graded in CSS so arbitrary placeholders unify:
  `filter: sepia(0.22) saturate(0.82) contrast(1.06)`.
- Type: one high-contrast serif for display, one grotesque for interface. Small caps and
  rules between sections.
- Radius `2px`, borders `1px`, shadows soft and low.

### Collage / scrapbook
- **Overlap is the structure.** Cards break their grid cell by `-24px` to `-48px` and carry
  `rotate(-2deg … 2deg)`, deterministic per index, never random per render.
- Layer with `z-index` in a declared ladder (paper 0, media 1, tape 2, type 3).
- Mixed media per section: photo + flat colour block + a hand-drawn SVG mark + typed label.
- `filter: drop-shadow()` on cut-outs, not `box-shadow` — the edges are irregular.
- **Guard:** every overlapping element must still tab in reading order; test focus order.

### Organic / sustainable
- Palette from `oklch` greens and earths only, no pure black:
  `oklch(31% 0.05 150)`, `oklch(88% 0.03 95)`, `oklch(58% 0.09 55)`.
- **Organic shapes as real geometry:** `border-radius: 42% 58% 61% 39% / 47% 43% 57% 53%`
  on media boxes, and `clip-path` arcs between sections instead of straight edges.
- Section transitions curve; nothing meets at 90°.
- Efficiency shown, not claimed: page-weight budget in the footer, `≤ 900KB` total.

### Illustration-led
- SVG only, inline, themed by `currentColor` so one asset serves light and dark.
- **Every illustration is authored, never generated** — it carries labels, must translate,
  must be readable by a screen reader (`role="img"` + `<title>`).
- Illustration replaces the section-lead photograph in 3–4 sections; the density floor still
  applies, illustrations count toward it.
- Interactive where it earns it: one illustration responds to hover or scroll progress.

### Experimental navigation
- **Only ever an addition to a conventional nav, never a replacement.** The top bar with
  labelled links stays. The experiment is a second path.
- Buildable forms: a horizontal-scroll section inside a vertical page
  (`overflow-x: auto; scroll-snap-type: x mandatory`); an index overlay that maps the page
  by section with live scroll position; a keyboard-driven jump list.
- Horizontal sections must respond to vertical wheel input, expose scroll-snap, and remain
  operable by keyboard `Tab` and arrow keys.

### Emotional / narrative
- **Section order carries an arc**, and the spec states it in one line: *tension → evidence
  → resolution*. Each section is named for its beat, not its content type.
- The display scale changes across the arc — largest at the emotional peak, not at the hero.
- One passage of long-form prose (120+ words) set at reading width, in the display serif,
  breaking the card rhythm deliberately.
- Photography grade shifts warm-to-cool (or the reverse) across the page.

---

## 3. Tier 2 — baseline (always on, never announced)

### Cognitive-inclusive
Concrete requirements, all checkable:
- Headings form a correct outline — one `h1`, no skipped levels.
- Nav labels are literal nouns. No invented section names for wayfinding.
- Forms: fewest possible fields, labels above inputs and never placeholder-only, inline hints,
  errors in text next to the field with `aria-live="polite"`, never colour-only.
- **A visible "Reduce motion" toggle** in the footer that sets a `data-motion="off"` attribute
  on `<html>` — in addition to honouring `prefers-reduced-motion`, not instead of it.
- Progressive disclosure for anything over ~120 words: `<details>` or a real disclosure
  button with `aria-expanded`.

### Ethical & inclusive
- WCAG 2.2 AA as a floor: contrast ≥4.5:1 body / ≥3:1 large, target size ≥24px, focus never
  obscured.
- No dark patterns: no fake scarcity, no pre-ticked consent, decline as prominent as accept.
- Weight budget is an ethical requirement, not just performance: state it and meet it.
- Inclusive copy — no gendered defaults, no ableist idiom.

### Dark mode
- A **token set**, defined as `:root` light, `:root:not([data-theme="light"])` under
  `@media (prefers-color-scheme: dark)`, and `:root[data-theme="dark"]`. Never a colour
  defined only inside a media query.
- Dark is not `--paper` inverted. Surfaces lift with lightness (`14% → 18% → 22%`), never
  with white overlays. Accent chroma drops ~15% on dark or it vibrates.
- Photography gets a separate overlay value per theme.
- **Do not default to dark** because it looks designed. Pick the theme the product wants.

### Minimalism
Restraint in the **system**, density on the **page**:
- ≤3 font families · ≤2 accent colours · one icon family · one radius ladder · one shadow ramp.
- Never fewer sections, never fewer images. See `density.md`.

### Animation
Covered fully in `motion-system.md` and `density.md`. The floor: enter `1s`
`cubic-bezier(.44,0,.56,1)`, `0.1s` stagger, ≥30 independently choreographed targets,
blur-up on every image, a declared hover state on every interactive element.

---

## 4. Tier 3 — interaction layer (add on brief signal)

| Trend | Add when the brief… | What the spec requires |
|---|---|---|
| **Micro-interactions** | always, in practice | Every interactive element declares idle/hover/active/focus/disabled. Arrow marks translate `4px`. Buttons have a fill panel that rises. Inputs animate their label. Copy-to-clipboard swaps to a check for 1.4s. |
| **Data-driven / metrics** | has numbers, results, scale, or credibility to prove | **One dedicated metrics row**: 3–4 figures in mono at `clamp(38px, 4vw, 52px)`, each with a `13px` description. Count-up on enter, `prefers-reduced-motion` shows final value immediately. Any chart is authored with axis labels and units — never an image. |
| **Real-time content** | shows status, availability, prices, activity | A live region with `aria-live="polite"`, a relative timestamp ("updated 4m ago"), and **all four states specified**: connecting, live, stale, disconnected. A pulsing dot is not a state. |
| **Gamification** | has progress, tiers, streaks, onboarding | Progress made visible as real geometry — a stepped bar with `aria-valuenow`, a tier ladder with the current rung marked. Never a leaderboard on a marketing page. |
| **Predictive UX** (design half) | has a multi-step journey | Next-best-action inline prompts, resumable state, prefetch on hover-dwell inside `requestIdleCallback`. **Guardrail required:** a visible "reduce personalisation" control. |

---

## 5. Tier 4 — product features (only when asked)

Conversational UI · chatbots · hyper-personalisation · VR/AR. These change what the product
*is*. If the brief asks for one, it gets a specified surface like any other feature —
entry point, empty state, loading state, error state, escalation path, and a keyboard path.
If the brief does not ask, **do not add one to look current.** An unrequested chat bubble is
the clearest possible signal that the page was assembled from a trend list.

---

## 6. The dynamic selection procedure

Run this at step 2b, after the variant is classified and before any spec line is written.

1. **Read the brief for signals** — the product's category, its proof (numbers? craft?
   scale?), its audience, and any reference URL or brand deck supplied.
2. **Pick one Tier 1 direction** whose logic the *product itself* justifies. Write one
   sentence saying why this brief demands it. If that sentence would be equally true of a
   competitor, the direction is decorative — pick again.
3. **Apply all of Tier 2.** Do not name them in the spec's design rationale; they are
   requirements, and announcing them reads as padding.
4. **Score Tier 3** against the signals in §4 and take every row that matches. Metrics and
   micro-interactions match nearly always; the other three rarely.
5. **Take Tier 4 only on an explicit ask.**
6. **State the declines.** The spec names the one direction taken and, in a single line,
   the two nearest directions declined and why. This is what stops the next brief in the
   same category producing the same page.

Combination is allowed but bounded: **one Tier 1 + all Tier 2 + up to three Tier 3.** A
second Tier 1 direction is not a combination, it is an unresolved argument, and it shows.

## 7. Acceptance checks

1. The spec names exactly one Tier 1 direction, with a one-sentence justification specific
   to this product.
2. It names two declined directions and why.
3. The direction lands in ≥3 of structure / type / rhythm / surface / colour-logic / density.
4. No Tier 2 item appears in the spec as a *feature* — they appear only as requirements.
5. No Tier 4 feature is present that the brief did not ask for.
6. Screenshot at 1440px beside two competitors in the same category: identifiable at a
   glance without reading the wordmark.
