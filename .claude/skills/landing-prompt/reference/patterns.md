# Patterns — the block library

Eighteen blocks, measured off the reference templates. Pick 9–11. Each entry gives geometry,
assets, states and motion, so a spec entry is a fill-in rather than an invention.

**Every block carries a visual payload. None is type-only.**

---

## The five devices that carry the warm-service register

These are what make the difference between "a page" and "that level". Named first because a
spec that omits all five lands back at generic no matter how good the copy is.

### D1 · Cut-out subject
A person or product photographed against a removed background, **overflowing its container** on
the right and bottom of the hero. Not a rectangular photo — a knock-out with a transparent PNG.

```css
.cutout { position: absolute; right: -2%; bottom: 0; width: min(52%, 720px);
          pointer-events: none; z-index: 1; }
.cutout img { object-fit: contain; object-position: bottom right; }
```
Type sits left, in the clear half. Never let the subject cross the headline's measure.
Placeholder note: a seeded random photo is a rectangle, so state in the spec that the
production asset is a knock-out and render the placeholder inside a rounded plate meanwhile.

### D2 · Rotated photo collage
Three photos, overlapping, each rotated a few degrees, white border, rounded corners.

```css
.collage { position: relative; aspect-ratio: 1/1; }
.collage figure { position: absolute; border: 6px solid #fff; border-radius: 14px;
                  overflow: hidden; box-shadow: <3-stop ramp>; }
.collage figure:nth-child(1){ inset:0 0 22% 18%; transform: rotate(-4deg); z-index:1 }
.collage figure:nth-child(2){ inset:38% 46% 0 0;  transform: rotate(3deg);  z-index:2 }
.collage figure:nth-child(3){ inset:30% 0 6% 44%; transform: rotate(-2deg); z-index:3 }
```
Rotations are **deterministic per index**, never random per render. Cap at ±5°.

### D3 · Hand-drawn doodles
Inline SVG line marks — bubbles, sparkles, arrows, a squiggle underline — scattered near the
headline at low opacity, `stroke-width: 2`, `stroke-linecap: round`, `fill: none`,
`pointer-events: none`, `aria-hidden`. Two to four per hero, never more.

### D4 · Rounded slab sections
A whole block as a `border-radius: 32px` panel in the deep colour, inset from the viewport by
the gutter, sitting on white. Alternate white → slab → white down the page. This single device
does more for the register than any animation.

### D5 · Dot-grid texture
On slab grounds only:
```css
background-image: radial-gradient(currentColor 1px, transparent 1px);
background-size: 22px 22px; opacity: .06;
```

---

## Blocks

### B1 · Nav
72px desktop / 64px mobile, sticky, `backdrop-filter: blur(12px)` over 88% ground.
Wordmark · links (hidden ≤810) · phone or secondary · **accent CTA**.
States: link underline wipes from left; CTA darkens 240ms. Tap targets 48px.

### B2 · Hero — split, cut-out
`grid-template-columns: 1.05fr .95fr`, min-height `clamp(560px, 78svh, 760px)`, slab ground.
Left: eyebrow · h1 (2–3 lines, `max-width: 15ch`) · lede (`≤54ch`) · **accent CTA + text link
with a persistent underline** · optional trust line.
Right: **D1 cut-out** + 2–4 **D3 doodles**.
≤810: single column, cut-out becomes a `4:3` plate below the actions, doodles drop to two.
Motion: eyebrow → h1 → lede → actions at 80ms stagger, `translateY(16px)`, 600ms.

### B3 · Hero — centred, plate below
Centred eyebrow pill · h1 `max-width: 18ch` · lede · one CTA + microcopy under it ·
full-width plate `16:9` beneath. Use when there is no cut-out asset.

### B4 · Trust strip
"Trusted by …" + 6–12 logo SVGs at ~26px height on one or two rows, `opacity: .6 → 1` on hover.
**Sourced marks only** — svgl, Simple Icons, or an official press kit. Never generated.
Static: the measured reference is two rows, **not a marquee**.

### B5 · Services grid
3 across / 2 / 1. Each card: plate `4:3` · 24px accent icon · title 20px · 2–3 line body ·
foot with `from $X` and an arrow.
Hover: card ground lifts one step, plate `scale(1.03)` inside a fixed box, arrow `translateX(4px)`.
**Every card contains an image** — a grid of text-only cards is the fastest route back to generic.

### B6 · About + collage
`grid-template-columns: 1fr 1fr` on a slab. Left: h2 · body · **2–4 check chips** (rounded
square, 40px, accent or dark, white check + two-line label) · CTA. Right: **D2 collage**.

### B7 · Metric tiles
Heading left, 3 tiles right — or 4 across full width. Tile: `#F5F8F6` ground, radius 16,
padding 28, **number 48px w700**, caption 15px muted.
Count-up on enter; `prefers-reduced-motion` shows the final value immediately.

### B8 · How it works
3–4 steps. Each: step number in mono or accent · icon or plate `16:10` · title · 60–90 words.
Optional connector line between steps on desktop, dropped ≤810.

### B9 · Price rows
Row: `1fr auto` — job + scope left, **price and duration right in a mono column**.
`font-variant-numeric: tabular-nums`, tracking `0`, and each figure in its **own fixed track**
so the column has one right edge. Hairline between rows, hover lifts the ground.
≤810 the figures move in-row, left-aligned under the title.
> Right-aligning a flex row is not enough: `$149` and `$1,780` end at different x. Use
> `grid-template-columns: 1fr 76px` and check each figure's edge, not the container's.

### B10 · Pricing cards
2–3 plans, the middle one raised: accent border, a "most chosen" pill, larger padding.
Monthly/yearly toggle with a saving badge. Feature list with accent checks.

### B11 · Testimonials on a slab
Slab ground, centred white h2, 3 white cards. Card: **accent quote glyph 40px** · bold one-line
verdict · 2–3 line quote · avatar 44px + name + role.
Attach the job and what it cost where the category has prices — a rating with nothing attached
is worth little in a service trade.

### B12 · Team
4–5 portraits `1:1`, name, role, one credential in mono.
**A named person gets initials on a colour field** unless there is a real photograph — an
arbitrary stock face attached to a real name is a false claim.

### B13 · Gallery strip
6–12 square plates, 10px gap, nominal captions only (`Job 4471`). Cheap density that is honest.

### B14 · Coverage / area
Map plate + a 3-column list of place names with a pin icon. State the honest limit of coverage.

### B15 · FAQ
Accordion, `<button aria-expanded>` + region, chevron rotates 180° in 240ms, first item open.
Answers written in full — an FAQ with summarised answers is a placeholder.

### B16 · Credentials
3 badge tiles: hairline, radius 8, label in mono + value. Licence, bond, insurance, guarantee.

### B17 · CTA + form
`1fr 1fr`: form left, plate or cut-out right, on a slab.
Fields: label **above** the input, never placeholder-only, 48px min height, interactive border
one step darker than a hairline.
**Four states written as values:** idle · submitting (`aria-busy`, label swaps) · error
(inline, `aria-live="polite"`, never colour alone) · success (form replaced, focus moved with
`tabIndex={-1}`).

### B18 · Footer
4 columns: services, company, areas, contact. Hours block. Legal line. Reduce-motion toggle
setting `data-motion="off"` on `<html>`. Tappable phone.

---

## Motion, applied

Entrance on every block: `opacity: .001 → 1` + `translateY(16px) → 0`, 600ms,
`cubic-bezier(.44,0,.56,1)`, 80ms stagger, capped at 6 per group.

**Fail open — the rule that has bitten four builds:**

```css
.reveal { opacity: 1; transform: none; }        /* default is the REST state */
@keyframes arrive { from { opacity:.001; transform: translateY(16px) } to { opacity:1; transform:none } }
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    :root[data-motion="on"] .reveal {
      animation: arrive 600ms cubic-bezier(.44,0,.56,1) both;
      animation-timeline: view(); animation-range: entry 0% entry 40%;
    }
  }
}
```

Blur-up on every raster, set from `onLoad` **and** `img.complete` on mount or cached images
stay blurred:

```css
.plate img { filter: blur(12px); opacity: 0; transition: filter .2s ease-out, opacity .2s ease-out }
.plate img[data-loaded="true"] { filter: blur(0); opacity: 1 }
```

---

## Assets

| Kind | Source | Note |
|---|---|---|
| Photo / plate | `picsum.photos/seed/<id>/<w>/<h>` | seeded so rebuilds are deterministic |
| Avatar | `i.pravatar.cc/240?img=<1-70>` | only for unnamed people |
| Cut-out subject | production asset | spec it as a knock-out PNG; render a plate meanwhile |
| Doodles, icons | authored inline SVG | one family, `currentColor` |
| Brand logos | svgl · Simple Icons · press kit | **never generated** |
| Product UI | authored in the DOM | themeable, translatable, does not date |

`source.unsplash.com` is **dead — 503**. Do not specify it.

**No placeholder carries a factual claim.** `alt=""` + `role="presentation"` on decorative
plates; captions nominal only. A status code proves a file exists, not what is in it — seven
images once verified `HTTP 206` and six showed something unrelated to their caption.
