# Density — the actual gap between our builds and a commercial template

> **Read `species.md` first.** The floors below were measured on **two corporate photographic
> sites** and were written here as if universal. They are not. A product-SaaS reference
> (`salix`) runs 3 images per section with **three sections at zero**, and its central
> contradiction of this file — *"every card is a picture with words under it"* — is simply
> false for that species. Use `species.md` to pick the row, then use this file for everything
> species-independent: locked boxes, blur-up, hover states, fail-open reveals, `text-wrap`,
> breakpoints, and the verification method.
>
> The floor that survives every species is **"no section is type-only"**, not a number.

Measured from `westbridge.framer.media` (544KB of served HTML) against `halstead`, the most
recent build produced by this skill. Read with `production-polish.md`: that file says how to
make each element credible, this one says **how many elements there must be**.

## The finding

Nine builds have now been executed from specs written by this skill. Every one was told to
add a signature mechanic, a form thesis, a scroll system. None of that was the problem.

| | Westbridge | Halstead (ours) | Gap |
|---|---|---|---|
| `<section>` | 9 | 5 | 1.8× |
| `<img>` | **43** | **0** | ∞ |
| `<svg>` | 34 | 3 | 11× |
| Choreographed reveal targets | **43** | ~4 | 11× |
| `aspect-ratio` locks | 119 | 3 | 40× |
| `will-change` declarations | 71 | 4 | 18× |
| `text-wrap` | 146 | 0 | ∞ |
| `position: absolute` (layering) | 115 | few | — |
| Visible words | 1022 | ~600 | 1.7× |

**The gap is roughly 10× in element count, and it is not a gap in sophistication.**
Westbridge uses no canvas, no WebGL, no blend modes, no `clip-path`, and exactly three
sticky elements. Its cleverest move is a `translateY(20px)` fade. It looks finished because
there are **43 pictures on it** and every one of them is in a locked box with a hover state.

Our pages have been well-typeset arrangements of headings and colour fields. That reads as a
*specimen sheet*, not a website. No scroll mechanic closes a 10× density gap, and this is
why nine consecutive builds have come back "not the level of the reference."

---

## The budget — mandatory in every variant A / B / E spec

Derived from the measured page (9 sections carrying 43 images, 43 reveal targets, 34 icons,
1022 words). Per section, a landing page must average:

| Per section | Minimum | Westbridge actual |
|---|---|---|
| Images | **4** | 4.8 |
| Independently revealed elements | **4** | 4.8 |
| Icons / SVG marks | **3** | 3.8 |
| Words of real copy | **100** | 114 |

**Page floors for variant B (full landing page):**

- **8 sections minimum.** Nine is the measured norm. Five is a hero plus notes.
- **30 images minimum.** This is the single most-violated floor and the most load-bearing.
- **30 independently choreographed reveal targets**, each with its own delay in the stagger
  ladder — not 5 sections that each fade in as one block.
- **20 icon marks**, one family throughout.
- **900 words** of real copy.

A spec that does not state these counts will not get them. Write the number into the spec.

## Where 43 images actually go

The count sounds absurd until you name the slots. It is not 43 hero shots — it is:

| Slot | Count | Note |
|---|---|---|
| Hero plate | 1 | full-bleed or locked box |
| Section-lead media | 6–8 | one per major section |
| Card thumbnails | 8–12 | services, case studies, articles |
| People | 4–8 | team, testimonial authors, article bylines |
| Logo wall | 6–12 | **sourced, never placeholder** — see `assets.md` |
| Inline / detail | 4–8 | pull-quote portraits, feature insets, footer plate |

Any grid of cards without an image in each card is the fastest way back to the specimen
sheet. **A card is a picture with words under it.**

## Composition — how the reference actually builds a section

`display: flex` × 148 versus `display: grid` × 5. Westbridge is **nested flex stacks with
`place-content`**, not a CSS grid system, and `position: relative` × 234 / `absolute` × 115
means roughly a third of elements are layered rather than flowed.

The repeating unit, from the reference's own component names:

```
Section
├── Intro          (Label • Heading • Subtitle)      ← eyebrow, then 2-line display, then 1 line
├── Content        (grid of Cards, 2 or 3 columns)
│   └── Card       (Image Wrapper → Image, Title, Content, Arrow)
└── Bottom         (CTA or Metrics row)
```

Two details worth copying exactly:

- **`Arrow` appears 40 times.** Every card, every link, every CTA carries a directional mark
  that moves on hover. It is the cheapest possible "this is interactive" signal and it is
  everywhere.
- **`Metrics` ×18, `Metric Card` ×8, `Amount` ×8.** Numbers are a first-class layout
  element with their own component, not a sentence containing a figure. A landing page
  should carry **one dedicated metrics row** — 3–4 figures, each with a large `Amount` and a
  small `Metric Description` beneath.
- **`Hover In` ×14** — hover is a declared component variant, not an afterthought. Every
  card and button needs its hover state written into the spec.
- **`Gradient Overlay` ×8** — every image that carries text over it has a declared overlay
  layer. This is how you get legible type on a photograph you did not choose.

## Type constants, measured

These are the numbers that make it read as a 2020s commercial site rather than a document.
Our builds have consistently been looser on all four.

| Property | Reference | Note |
|---|---|---|
| Body line-height | **1.3em** (65 occurrences) | Not 1.5, not 1.6. Tight. |
| Display line-height | 1.1–1.2em | |
| Display letter-spacing | **−0.03 to −0.05em** | Negative tracking on everything large |
| Body font-size | **14–15px** (50 occurrences) | 13px for labels. Not 16–18px. |
| Display font-size | 58–62px desktop | With 32/36px section headings |
| Font families | 1 (Inter) | The whole page. Restraint, not pairing. |
| `text-wrap` | 146 occurrences | `balance` on headings, `pretty` on body |

**Small tight text next to very large tight text** is the entire typographic idea. The
contrast ratio between display and body is ~4×, and both are tracked in.

## Motion constants, measured

| Property | Reference |
|---|---|
| Enter duration | **1s** (14×) and **0.6s** (9×) |
| Stagger delays | 0.1 · 0.15 · 0.3 · 0.5 · 0.55 · 0.6 |
| Easing | `cubic-bezier(.44, 0, .56, 1)` — symmetric, near-sine |
| Enter transform | `translateY(10px / 12px / 20px / 40px)`, `opacity: 0.001` → 1 |
| Image load | `transition: filter .2s ease-out, opacity .2s ease-out` (**120×**) |
| Smooth scroll | Lenis (present) |
| Sticky elements | 3 |

Two corrections to what this skill previously said:

1. **Enter durations are ~1s, not 400–600ms.** Our specs have been calling for snappier
   motion than the references actually use. At 4 elements per section staggered 0.1s apart,
   a 1s duration is what makes a section feel like it *arrives* rather than *pops*.
2. **`scale` is not in Westbridge's enter states** — `scroll-craft.md` measured scale on
   `homy` and generalised from n=1. Both are correct for their own type: scale reads
   *product*, pure translate reads *editorial/corporate*. Pick per brief; do not assume.

**The blur-up is non-optional.** 120 declarations of `filter .2s, opacity .2s` means every
image on the page loads by resolving from blurred+transparent to sharp+opaque. It costs
almost nothing and it is most of why the page feels expensive:

```css
img { filter: blur(12px); opacity: 0; transition: filter .2s ease-out, opacity .2s ease-out; }
img[data-loaded="true"] { filter: blur(0); opacity: 1; }
```

## Geometry constants, measured

| Property | Reference |
|---|---|
| Page max-width | **1920px**, centred |
| Content max-width | 1200px |
| Gutter | `0 40px` |
| Breakpoints | **3** — `≥1200` · `810–1199` · `≤809` |
| Gap scale | 10 · 20 · 24 · 32 · 36 · 40 · 60 (10px dominant) |
| Radius | 8px (small) · 20px (cards) · 45px (pill buttons) |
| Shadows | multi-stop fractional ramps, never a single blur |

The shadow detail matters more than it looks. A real shadow is 3–5 stops with fractional
offsets and a negative spread, not `0 4px 12px rgba(0,0,0,.1)`:

```css
box-shadow:
  0 0.6px 1.6px -1.5px rgb(0 0 0 / .17),
  0 2.3px 5.9px -2.2px rgb(0 0 0 / .14),
  0 7.7px 19.7px -3px  rgb(0 0 0 / .09);
```

## Add to every variant B spec

```
## Density budget

8 sections minimum. Across the page: ≥30 images, ≥30 independently choreographed
reveal targets, ≥20 icon marks from one family, ≥900 words of real copy.
Per section: ≥4 images, ≥4 reveal targets, ≥3 icons, ≥100 words.

Every card is a picture with words under it. Every card and link carries a
directional arrow mark that translates 4px on hover. One dedicated metrics row
of 3–4 figures. Every image with text over it declares a gradient overlay layer.

Type: body 15px / 1.3em, labels 13px, section headings 34px, display 60px,
letter-spacing −0.04em on everything above 32px. `text-wrap: balance` on all
headings, `pretty` on all body. One font family.

Motion: enter 1s / cubic-bezier(.44,0,.56,1), translateY(20px) + opacity 0.001→1,
stagger 0.1s within a group and 0.15s between groups. All images blur-up on load
via `filter .2s ease-out, opacity .2s ease-out`.

Geometry: page max-width 1920px, content 1200px, gutter 40px. Breakpoints at
1200 and 810. Radius 8 / 20 / 45. Shadows are 3-stop fractional ramps.
```

## Acceptance checks

**Run these against the rendered DOM, never against `dist/index.html`.** A client-rendered
app ships an empty `<div id="root">`; grepping the HTML file returns **0 images on a page
that has 39**, and grepping `src/` counts imports and comments instead. Serve the build and
evaluate in a real browser:

```js
// playwright, after scrolling the full page so lazy images and reveals resolve
const $$ = (s) => Array.from(document.querySelectorAll(s));
({ sections: $$("section").length, imgs: $$("img").length, reveals: $$(".reveal").length,
   missingDims: $$("img").filter(i => !i.width || !i.height).length,
   noLockedBox: $$("img").filter(i => getComputedStyle(i.parentElement).aspectRatio === "auto").length,
   altsNonEmpty: $$("img").map(i => i.alt).filter(Boolean),
   invisible: $$("main *").filter(e => getComputedStyle(e).opacity === "0" && e.textContent.trim().length > 20).length })
```

1. `sections` ≥ 8 · `imgs` ≥ 30 · `reveals` ≥ 30 · icon marks ≥ 20.
2. `missingDims` and `noLockedBox` both 0 — except a deliberately full-bleed hero, whose box
   is `inset: 0` on a `100svh` section rather than an aspect ratio. Say so, don't force it.
3. `altsNonEmpty` is empty, or every entry is a real description of an image you have looked at.
4. `invisible` is 0 — proves reveals failed open.
5. `text-wrap` present; `scroll-behavior: smooth` absent when Lenis is used.
6. Hover a card, a link and a button. All three change, and the arrow moves 4px.
7. A metrics row with at least three figures.
8. At 390px: no element with `scrollWidth > clientWidth`, and `body.scrollWidth <= innerWidth`.

**Screenshots are the other half, and the numbers do not replace them.** This build passed
every count above while the hero rendered with no words on screen at all. Capture the hero,
two mid sections, the footer and one mobile view, and **look at them**.

> **Capturing a Lenis page:** `window.scrollTo()` is hijacked, so a `scrollTo(0,0)` before a
> screenshot silently lands somewhere else — the first capture of this build was labelled
> "hero" and showed section 4. Drive it with `page.mouse.wheel()` and re-navigate between
> shots, then assert the resulting `scrollY` is where you meant to be.

## Two gotchas that cost real time here

- **A full-bleed hero plate loses to the base rule on source order.** `.hero__plate
  { position: absolute }` and `.plate { position: relative }` are both single-class
  selectors, so whichever is declared *later* wins. Written after the hero block, the base
  `.plate` rule quietly kept the hero image `relative` and it collapsed to a corner. Write
  `.plate.hero__plate`, and check `getComputedStyle().position` rather than assuming.
- **Two adjacent sections on the same ground stack two full paddings** — 152px + 152px reads
  as a 300px hole in the page. Collapse the boundary:
  `.sec + .sec:not(.sec--deep) { padding-top: clamp(40px, 4.5vh, 64px) }`.
