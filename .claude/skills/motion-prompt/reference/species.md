# Species — the density budget is not universal

Measured from `salix.framer.website` (a product-SaaS template) against `westbridge.framer.media`
(a corporate-consultancy template). Read **before** `density.md`: that file states floors, this
one states which floors apply.

## The error this file corrects

`density.md` was measured on two corporate photographic sites and its floors were written as
universal. They are not. Its central rule — *"every card is a picture with words under it"* —
is **false** for a product site. Salix is a well-regarded template with **three sections that
contain zero images**, and it does not read as unfinished for one second.

| | Westbridge (corporate) | Salix (product-SaaS) |
|---|---|---|
| Sections | 9 | 11 |
| `<img>` | 43 | **33** |
| Images per section | 4.8 | **3.0** |
| Sections with 0 images | 0 | **3** (Core Features, Pricing, FAQ) |
| Photography | all of it | **none. zero.** |
| Body line-height | **1.3** | **1.7** |
| Font families | 1 (Inter) | 2 (Geist display + Inter body) |
| Display tracking | −0.03 to −0.04em | **−0.055em** |
| Dominant radius | 20px cards | **100px pills (43 uses)** |
| Scroll-linked transforms | some | **zero, verified** |
| Pinned/scrubbed sequence | — | **none** |

Both are good. They are different **species**, and a spec must pick one before it can state a
single number.

---

## 1. Pick the species at step 1, with the variant

| Species | Visual payload is… | Typical | Body LH | Families |
|---|---|---|---|---|
| **Photographic** — property, hospitality, expedition, agency, editorial | commissioned or stock photography | 40+ images, 4–5/section | 1.3 | 1–2 |
| **Product-SaaS** — dev tools, dashboards, B2B software | **product UI renders + icon sets + colour-blocked tiles** | 30ish images, 3/section, several sections at zero | **1.6–1.7** | 2 |
| **Illustrated** — fintech, health, education, consumer | authored SVG scenes and spot art | 20–30 SVG, 2–4/section | 1.5 | 2 |
| **Type-led** — brutalist, editorial, portfolio, manifesto | type itself, rules, colour fields | <15 images | 1.2–1.4 | 1–2 |

**The floor that survives all four species** is not an image count. It is this:

> **Every section carries a dense visual payload. The payload's *type* is species-specific;
> its *presence* is not.** A section of headline + paragraph + three text cards is
> underbuilt in every species there is.

Per section, at least one of: a media plate · a product render · a 48px accent icon per card ·
a colour-blocked tile · a chart or table · a bento cell. **Never a section made only of type.**

---

## 2. What the payload actually is in a product-SaaS build

Salix's 33 images break down as:

| Kind | Count | Spec |
|---|---|---|
| **Product UI render** (PNG) | 12 | The hero mockup, the tool shots, the dashboards. 536–900px wide, in a rounded bordered frame. **This is the hero image of a SaaS site.** |
| **Brand logo** (SVG file) | 16 | Logo strip, ~26px tall, two rows |
| **Avatar** (PNG) | 5 | 44×44, testimonials and table rows |
| **Decorative vector** (SVG file) | 1 | 1194×608 background graphic |
| **Photography** | **0** | — |

Plus **15 inline SVG icons**, of which 7 are the oversized (48px) accent-coloured feature marks.

Three things worth stealing exactly:

- **The product render bleeds off the container edge.** The Key Tools screenshots are wider
  than their column and are cropped by the viewport. It reads as "the product is bigger than
  this frame". A neatly contained screenshot reads as a thumbnail.
- **The decorative vector is a *canvas motif*, not an illustration.** A faint rising line
  chart, thin vertical rules, axis labels (`70K`, `60K`, `50K`), and small circular selection
  handles at the corners — the page dresses itself as an analytics/design surface. The same
  crosshair marks reappear at the corners of the dark slab. It costs one SVG and it is the
  page's entire visual identity.
- **Feature icons are 48px, stroked, single-accent, and abstract** — not 20px literal
  glyphs. At that size an icon is the card's image.

**Route for a product-SaaS build:** product UI is **authored** (build abstracted UI in the
DOM — themeable, translatable, does not date), logos are **sourced**, decorative vector and
icons are **authored**, avatars are **placeholder**. Photography is usually **absent**, not
placeholder. See `assets.md`.

---

## 3. Section patterns this skill had no entry for

### Sticky index + scrolling detail
The strongest section on the page, and structurally cheap.

```
grid: 1fr 1.4fr
├── left  position: sticky; top: 80px
│         eyebrow pill · h2 · vertical list of N items,
│         active item accent-coloured with a 2px left bar
└── right N stacked blocks: title · 2-line body · product render,
          separated by hairlines
```
The active item updates from an IntersectionObserver on the right-hand blocks. **This is not
a pin-and-scrub** — nothing is transformed, the rail simply sticks. Section height ~2200px for
three items.

### Tab-switched showcase
Three pill tabs, each with a coloured circular icon chip in its own hue (cyan / blue / pink);
the active pill takes a coloured outline. Below, one large product render swaps. State, not
scroll. Requires: active state, focus state, keyboard arrow navigation, and `aria-selected`.

### Metric + quote bento
Replaces "metrics row" and "testimonials section" with **one** asymmetric grid of six tiles —
three metric tiles, two quote tiles, mixed sizes. **Colour is the differentiator, not
imagery**: one saturated accent tile, one near-black tile, one second-accent tile, the rest
white or grey with a hairline. Metrics at ~64px with the unit set smaller and spaced
(`60 %`, `$45 M`). Only images in the section are two 44×44 avatars.

### Pill eyebrow on a rule
Every section opens with a centred pill (radius 100px, hairline border, small icon + 2–3
words) sitting **on** a full-width hairline that runs to the viewport edges. It is the
section divider and the section label in one element.

---

## 4. Motion — measured, and much simpler than this skill assumed

Probed three ways: transforms over time at fixed scroll (entrance and loops), transforms
against scroll deltas with time settled (scroll-linked), and the logo strip over 900ms at rest
(marquee).

| | Result |
|---|---|
| Smooth scroll | **Lenis** — `html.lenis.lenis-smooth` |
| Entrance | `translateY(10px)` + `opacity 0.001 → 1`, **duration 0.6s** |
| **Headline split** | **h1 contains 45 spans — split by word *and* by character**, each staggered |
| Scroll-linked transforms | **0 of 341 elements.** No parallax, no scrub |
| Pinned/scrubbed sequence | **none** |
| Marquee | **none** — the 16 logos are two static rows, not a ticker |
| `@keyframes` | one, a loading spinner |
| canvas / video / WebGL / blend modes / perspective | **zero** |
| `position: sticky` | **1** (`top: 80px`) |
| `will-change` | 88 |

> **The correction.** `scroll-craft.md` treats a pinned, scrubbed sequence as the thing
> separating a *designed scroll experience* from a *well-made page*. Salix has none and is
> not a lesser page for it. The pin is **one option in a menu**, correct for narrative and
> product-reveal briefs and wrong for a feature-dense SaaS page where the user is scanning for
> what the product does.
>
> What Salix has that none of our builds have ever had is **character-level text reveal**.

### The text split — specify it like this

```
h1 is split into words, and each word into characters, each in its own inline-block span.
Each span: opacity 0.001 → 1, translateY(10px) → 0, 0.6s cubic-bezier(.44,0,.56,1),
stagger 18ms per character, capped so a 45-character headline completes inside ~900ms.
Word spans never break across lines (the word wrapper stays whitespace: nowrap).

Reduced motion: no split at all. Render the plain heading. Screen readers must read one
continuous string — put aria-label on the h1 and aria-hidden on the span layer, or the
headline is announced letter by letter.
```

That last line is not optional. A character-split headline with no `aria-label` is read out
one letter at a time.

---

## 5. Type and colour, product-SaaS

| | Salix |
|---|---|
| Display | **Geist 500**, h1 `64px/1.1` tracking **−0.055em**, h2 `44px/1.2` tracking −0.057em |
| Body | **Inter 500**, `14px/1.7`, tracking normal |
| Ink | `#181818` |
| Ground | `#ffffff` dominant, `#fafafa` secondary, `#030303` for the inverted slab |
| Accents | **two** — blue `rgb(70,108,243)` and pink `rgb(248,61,105)` |
| Neutral fill | `rgba(108,111,118,0.06)` |
| Radius | **100px pills (43×)**, 16px cards (28×), 20px, 8px, 2px |
| Shadows | none, except a blurred gradient glow under the primary CTA |

Two departures from the corporate constants in `density.md`, both deliberate:

- **Body line-height 1.7, not 1.3.** SaaS copy is scanned; corporate copy is read. Tight
  leading on a feature grid makes it look cramped.
- **Two families, not one.** A geometric display face against a neutral UI face. The display
  face carries −0.055em, which is heavier than anything the corporate species uses.
- **Weight 500 everywhere**, display and body. No 400, no 700. Very characteristic.

---

## 6. Procedure

At step 1, after the variant, **name the species in one line and say what the payload is**:

```
Species: product-SaaS. Visual payload is authored product UI, a two-accent colour system,
and 48px stroked feature icons. No photography anywhere — a stock photo on this page
would read as a marketing site for a product that does not exist yet.
```

Then take that species' row from §1 for the density floor, line-height and family count, and
`density.md` for everything species-independent (locked boxes, blur-up on any raster, hover
states, fail-open reveals, breakpoints, `text-wrap`).

## Acceptance checks

1. The spec names a species and justifies the payload type in one sentence.
2. **No section is type-only.** Every section carries its species' payload.
3. Image count meets that species' row, not the corporate floor.
4. Body line-height matches the species (1.3 corporate · 1.6–1.7 SaaS · 1.5 illustrated).
5. If a pinned scrub is specified, the brief justifies it — narrative or product reveal. If
   the brief is feature-dense SaaS, **the absence of a pin is a decision, and stated as one**.
6. If the headline is character-split, the `h1` carries `aria-label` and the span layer
   `aria-hidden`, and reduced motion renders the plain heading.
