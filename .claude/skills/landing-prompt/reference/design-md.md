# DESIGN.md — the system format, adapted from Refero Styles

`styles.refero.design` publishes 2,000+ design systems extracted from real product sites, each
as a `DESIGN.md` an agent can read before it builds. Studied: the index taxonomy and the
**Steep** system (`steep.app`) in full.

Three things in that format are sharper than what this skill was emitting. All three are now
required.

---

## 1 · The descriptor — a four-to-six word image, not an abstract register

Every Refero style opens with one line:

```
Steep         serif analytics on warm paper
Linear        midnight precision instrument
Raycast       midnight command center, coral neon
Mercury       alpine banking at blue hour
Superr        warm schoolyard notebook in soft crayon
ORYZO AI      darkroom product editorial
Factory       terminal war room at midnight
Apple (ES)    cathedral of white space
monopo saigon liquid iridescence behind glass
```

Read those again. **"Midnight command center, coral neon" specifies more of a design system in
four words than a paragraph of adjectives does** — it fixes the ground (near-black), the mood
(operational, precise), the accent (one hot coral), and by implication the density and the type
weight.

The shape is `<mood or place> <object> on/in <ground>`. It must name a **thing**, not a feeling.
"Calm and accountable" is a feeling and it under-determines the system. "Ledger on kraft paper,
one ink" is a thing and it determines it.

Write the descriptor **before** any token. Every later value defends it.

## 2 · Colour is a named table with roles, not a pair of hexes

Refero gives every colour a human name, a token, and a **role sentence that says where it is
used and why it exists**:

| Name | Value | Token | Role |
|---|---|---|---|
| Blush Peach | `#fbe1d1` | `--color-blush-peach` | Accent card background, warm highlight wash — **the only chromatic surface in the system**; creates editorial warmth against monochrome |
| Sienna Brown | `#5d2a1a` | `--color-sienna-brown` | Text and stroke on peach surfaces — a warm deep brown that pairs with Blush Peach **like ink on kraft paper** |
| Ink Black | `#17191c` | `--color-ink-black` | Primary text, filled button background — **the only dark surface**; every CTA resolves to this near-black |
| Paper White | `#ffffff` | `--color-paper-white` | Page canvas — the dominant tone **carrying ~76 frequency points** |
| Mist Gray | `#f2f2f3` | `--color-mist-gray` | Card surfaces, input fills — the quiet layer **beneath** paper for nested content |

What to copy exactly:

- **A human name per colour.** "Blush Peach" is memorable and reviewable; `--green-3` is not.
- **The role sentence carries the constraint.** "The only chromatic surface in the system" is a
  rule disguised as a description, and it survives handoff.
- **Frequency.** Naming which tone dominates settles a hundred later decisions.
- **Neutrals get names and roles too** — Steep has five greys, each with a distinct job (link ·
  tertiary label · placeholder · card fill · alternating band). Five greys with jobs beats
  twelve steps without.

## 3 · Type: per-size tracking, weight lists, and a substitute stack

```
Signifier — display and headline serif, H1/H2 only, three sizes
  Weights        400
  Sizes          44px, 64px, 90px
  Line height    1.30
  Letter spacing −2.25px at 90px · −0.96px at 64px · −0.66px at 44px
  Substitute     GT Sectra, Tiempos Headline, Source Serif 4, ui-serif/Georgia
  Role           the serif whispers authority rather than shouting in bold

Sohne — body, UI and navigation sans
  Weights        400, 430, 450, 480, 500
  Sizes          14 · 15 · 16 · 17 · 18 · 20 · 22 · 26px
  Letter spacing −0.234px at 26px · −0.162px at 18px · 0 at body sizes
  Substitute     Inter, Söhne, ui-sans-serif/system-ui
```

Three lessons:

- **Letter-spacing is stated per size, not as one blanket rule.** This is what "tighter tracking
  at larger sizes" actually means in numbers, and it is the difference between type that looks
  set and type that looks defaulted.
- **Half-step weights.** 430/450/480 give hierarchy without jumping to bold. Variable fonts make
  this free and almost nobody uses it.
- **Every licensed face ships a substitute stack.** A spec naming Signifier with no fallback is
  unbuildable by anyone without the licence.

Also state the scale as a **named ratio from a base**: *"Minor Third (1.2) from 15px base"* —
not a list of sizes with no logic.

## 4 · Shape and elevation, per element type

Not one three-rung ladder. Refero enumerates:

```
Density        comfortable
Base unit      4px
Max width      1200px
Section gap    80px
Card padding   20px
Element gap    8px

Radius   images 12 · inputs 16 · smallCards 16 · elevatedCards 20 · cards 24
Elevation  Floating Product Artifact · Modal/Overlay · Card · Dropdown/Popover
```

**Elevation named by purpose**, not by blur radius. "Floating product artifact" tells a builder
what the shadow is *for*.

## 5 · Do / Don't — the part that makes a style reproducible

This is the highest-value section and the one this skill was missing entirely. Refero's rules
are specific enough to check, and each carries **why**:

> **Do** — Use the peach card surface *at most once per page* and only for editorial emphasis;
> treat it as a rare accent, not a background.
>
> **Do** — Set `border-radius: 9999px` on all buttons and `24px` on all content cards; **these
> are the two structural radii of the system.**
>
> **Do** — Use Söhne half-step weights (430, 450, 480) for body hierarchy *before* reaching 500.
>
> **Don't** — Use chromatic colours beyond the peach/brown pair. The system is intentionally
> **97% achromatic**; introducing blue, green or purple breaks the editorial restraint.
>
> **Don't** — Use bold or semibold in Signifier. The serif stays at 400 across all sizes —
> **that restraint is the signature.**

The pattern: **rule + scope + the reason it is the signature.** A rule without the reason gets
overridden by the next person who thinks bold looks stronger.

Every spec now emits **4–6 Do and 2–3 Don't**, each naming what breaks if ignored.

## 6 · One system, several exports

Refero emits the same system as `DESIGN.md`, Tailwind v4 `@theme`, CSS variables and DTCG
tokens, in Compact and Extended. The lesson: **the system is data, the format is a view.**

`builder.html` now emits four views of one selection — the page spec, `DESIGN.md`, a Tailwind v4
`@theme` block, and plain CSS custom properties.

## 7 · What this changes in this skill

| Was | Now |
|---|---|
| Register as an adjective pair | **Descriptor**: a four-to-six word image naming a thing |
| Accent pair: two hexes | **Named colour table**: name · hex · token · role sentence, neutrals included |
| "Display tracking −0.03 to −0.05em above 32px" | **Per-size letter-spacing**, in the type block |
| Weights 400/500/700 | **Half-steps allowed** — 430/450/480 where the face supports it |
| One radius ladder, three rungs | **Radius per element type**, plus the two named *structural* radii |
| Shadow ramp or none | **Elevation named by purpose** |
| — | **Do / Don't with the signature rationale** |
| Prompt only | **Four exports** from one selection |

## 8 · Acceptance

1. The spec opens with a descriptor that names a thing, and would not fit a competitor.
2. Every colour has a name, a token and a role sentence; the dominant ground is identified.
3. Letter-spacing is stated per size for every face above 32px.
4. Every licensed face has a substitute stack.
5. The two structural radii are named as such.
6. 4–6 Do rules and 2–3 Don't rules, each with the reason it is the signature.
