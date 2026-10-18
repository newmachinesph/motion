# Systems — four archetypes, measured

Pick a row by **category**, then take that whole system. Do not mix rows: a warm-service page
with corporate type reads as a template someone half-rebranded.

Sources: `homemaster.framer.website/home-01` (warm service),
`salix.framer.website` (product SaaS), `westbridge.framer.media` (corporate).
Every figure below was read out of a live browser.

---

## 1 · The four systems

### Warm service — trades, cleaning, home, care, local, health

The category convention, done properly. Friendly, saturated, human.

| | Measured |
|---|---|
| Ground | **White page, deep-colour rounded slabs** — `#113D3C` teal, radius 24–40px, inset from the viewport edge |
| Accent | **`#F3752B` orange** — CTA, quote marks, highlights. One accent, used often |
| Neutral | `#F5F8F6` off-white tiles, `rgba(52,78,65,.2)` hairlines |
| Display | **Satoshi 700** · h1 `60px/1.25` tracking `-0.042em` · h2 `48px/1.3` tracking `-0.031em` |
| Body | **Inter 400** · `16px/1.7` · tracking normal |
| Images | **64** — 35 PNG, 29 SVG |
| Signature | cut-out subject PNG · rotated photo collage · hand-drawn doodles · dot-grid texture |

**Bold 700 display is not optional here.** A 400-weight display on a warm-service page reads as
a law firm. The whole register depends on the type having weight.

### Product SaaS — dev tools, dashboards, B2B software

| | Measured |
|---|---|
| Ground | White dominant, `#fafafa` secondary, **one near-black slab** `#030303` with rounded top corners |
| Accent | Two — `rgb(70,108,243)` blue and `rgb(248,61,105)` pink |
| Display | **Geist 500** · h1 `64px/1.1` tracking `-0.055em` · h2 `44px/1.2` |
| Body | **Inter 500** · `14px/1.7` |
| Radius | **100px pills (43 uses)**, 16px cards, 8px, 2px |
| Images | **33** — product UI renders, brand SVGs, 44px avatars. **Zero photography** |
| Signature | pill eyebrow on a rule · sticky index + scrolling detail · tab-switched showcase · metric/quote bento |

Three of its eleven blocks contain **no images at all** and it does not read as unfinished —
the payload there is 48px stroked accent icons and colour-blocked tiles.

### Corporate — consultancy, property, finance, institutional

| | Measured |
|---|---|
| Ground | Photographic full-bleed, `#f2f4f7` paper, `#26384f` inverted sections |
| Accent | One, used sparingly |
| Display | Inter or a serif, 400–500 · `62px/1.1` tracking `-0.03 to -0.04em` |
| Body | **`15px/1.3`** — tight, because it is read not scanned |
| Images | **43**, all photographic, 4.8 per section |
| Signature | locked plates · gradient overlays · restraint · no scale in enter states |

### Editorial — agency, portfolio, culture, manifesto

| | |
|---|---|
| Ground | Paper, one ink, rules instead of borders |
| Display | 80px+, variable weight and optical size |
| Body | `16px/1.5`, measure ≤ 68ch |
| Images | Fewer, larger, deliberately placed |
| Signature | asymmetric grid · scale contrast · type as the payload |

---

## 2 · Accent pairs — presets, all AA-checked

One deep ground, one saturated accent. Vary the pair per project; keep the structure.

| Preset | Ground | Accent | Off-white | Reads as |
|---|---|---|---|---|
| **Teal / ember** | `#113D3C` | `#F3752B` | `#F5F8F6` | warm, trustworthy, domestic — *the measured homemaster pair* |
| Ink / citrus | `#14261F` | `#D9E021` | `#F7F8F4` | energetic, young, high-visibility trades |
| Navy / coral | `#0F2440` | `#FF6B5A` | `#F4F6FA` | care, health, family |
| Plum / apricot | `#2A1B33` | `#F2A65A` | `#F8F5F2` | premium home, interiors |
| Forest / clay | `#1B2E22` | `#C5643C` | `#F5F4F0` | landscaping, outdoor, craft |
| Slate / sky | `#1C2430` | `#3B82F6` | `#F2F4F7` | technical, inspection, security |

Rules that hold across all of them:

- **Accent on ground and accent on white must both clear 4.5:1** for text, 3:1 for UI borders.
  Check it; do not assume — a measured neutral at 58% lightness came out at **3.91:1** and
  failed, one step below what looked fine.
- The accent appears on: primary CTA, quote marks, active states, one or two highlights per
  section. **Not** on body text, not as a section ground.
- Neutrals are **tinted with the ground's hue** at very low chroma. Pure grey beside a
  saturated accent reads as a generated palette.
- Ship OKLCH with a hex fallback in `@supports not (color: oklch(0 0 0))`.

### Generating a ramp when a preset does not fit

OKLCH, **vary L only**, hold H, chroma on a curve peaking at steps 8–9:

```
L:  97  94  90  84  76  66  58  50  42  34  24  15
C: .012 .020 .036 .056 .078 .098 .112 .118 .110 .092 .062 .036
```

Roles: 1–2 grounds · 3–5 component fills · 6–8 borders · **9–10 solid, 9 is "the brand colour"**
· 11–12 text.

---

## 3 · Type

**Base 16px.** Ratio by archetype: warm service **1.25**, SaaS **1.25**, corporate **1.333**,
editorial **1.5**.

| Token | Warm service | SaaS | Corporate |
|---|---|---|---|
| label | 13px mono/caps | 13px mono | 12px caps |
| body | **16/1.7** | 14–15/1.7 | **15/1.3** |
| lede | 18/1.6 | 17/1.5 | 17/1.4 |
| card title | 20/1.3 | 19/1.25 | 19/1.25 |
| h2 | `clamp(32px, 4vw, 48px)` w700 | `clamp(28px, 3.4vw, 44px)` w500 | `clamp(28px, 3.4vw, 39px)` |
| h1 | `clamp(36px, 5.6vw, 60px)` w700 | `clamp(34px, 5vw, 64px)` w500 | `clamp(31px, 5vw, 62px)` |

**Pairing — one of three strategies, named in the spec:**

1. **Superfamily** — shared metrics, safest. `IBM Plex Sans + Mono`, `Source Serif 4 + Sans 3`.
   Mandatory when a mono column must align to a sans column row after row.
2. **Contrast of classification** — differ in class, **match x-height**.
   `Satoshi + Inter` (the measured warm-service pair) · `Bricolage Grotesque + Inter` ·
   `Instrument Serif + Inter` · `Geist + Inter`.
3. **Single family, full range** — one variable family on weight and size alone.

Free substitutes when a licensed face is unavailable: Satoshi → **Manrope** or **Plus Jakarta
Sans** (same geometric-humanist register, both on Google Fonts, both variable).

Display tracking: `-0.03 to -0.05em` above 32px. Body: `0`. Mono figures: **`0` always** —
tracking figures breaks column alignment. `text-wrap: balance` on headings, `pretty` on body.

---

## 4 · Space, radius, shadow, motion

**Space — 8pt grid:** `4 · 8 · 12 · 16 · 24 · 32 · 40 · 64 · 96 · 128`.
Block padding `clamp(56px, 8vw, 112px)`. Content max 1200px, page max 1920px,
gutter 40 / 32 / 20.

**Radius — one ladder, three rungs plus one exception.**

| Archetype | sm | md | lg | exception |
|---|---|---|---|---|
| Warm service | 8 | 16 | **32 (slabs)** | pill on CTA |
| SaaS | 2 | 16 | 20 | **100px pills everywhere** |
| Corporate | 4 | 12 | 20 | none |

**Shadow — pick one and hold it.** Either *none, borders only* (corporate, editorial), or a
**3-stop fractional ramp**:

```css
box-shadow:
  0 .6px 1.6px -1.5px rgb(0 0 0/.16),
  0 2.3px 5.9px -2.2px rgb(0 0 0/.13),
  0 7.7px 19.7px -3px  rgb(0 0 0/.08);
```

A lone `0 4px 12px rgba(0,0,0,.1)` is the default look and reads as unfinished.

**Motion — one ladder, one easing.**

| | Warm service | SaaS | Corporate |
|---|---|---|---|
| state | 150ms | 150ms | 150ms |
| hover | 240ms | 200ms | 240ms |
| entrance | **600ms** | 600ms | **1000ms** |
| easing | `cubic-bezier(.44,0,.56,1)` | same | same |
| enter transform | `translateY(16px)` | `translateY(10px)` | `translateY(20px)`, no scale |
| stagger | 80ms | 80ms | 100–150ms |

Smooth scroll: **Lenis**, `duration 1.05`, expo-out, never constructed under
`prefers-reduced-motion`, and `scroll-behavior: smooth` removed from the reset — the two fight.

**Scroll-linked transforms: none, by default.** Two of the three measured references have zero.
A pin belongs to narrative and product-reveal briefs only, and its absence is stated as a
decision so it reads as intent.

---

## 5 · Density floors by archetype

| | Blocks | Images | Reveal targets | Icons | Words |
|---|---|---|---|---|---|
| Warm service | 10 | **45** | 45 | 25 | 1,000 |
| SaaS | 10 | 30 | 30 | 25 | 900 |
| Corporate | 9 | 40 | 40 | 20 | 950 |
| Editorial | 8 | 18 | 25 | 12 | 1,200 |

The floor that holds across all four: **no block is type-only.** Every block carries a media
plate, a cut-out, a product render, a collage, a 48px icon per card, a colour-blocked tile, a
chart, or a bento cell.
