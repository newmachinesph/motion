# Anatomy of a motionsites-level prompt

**This file is the Section (variant A) shape — one surface, specified deep.** For a full
landing page, a registry component, or a library component, read `variants.md` first and
use that skeleton instead. Getting the variant wrong is a bigger error than any amount of
missing detail.

Distilled from the 661-prompt corpus: a short **preamble** that sets the implementer's
role, then a **titled specification** of 8–11 numbered sections.

---

## Preamble (always first, verbatim shape)

```
**System Role & Instructions:**
You are an elite frontend developer and UI/UX engineering expert. Your objective is to
build a premium, highly interactive, and pixel-perfect <surface> strictly following the
specification provided below.

When generating the code, you must:
1. **Adhere to the Tech Stack:** Use <stack> exactly as outlined.
2. **Follow the Design System:** Strictly apply the specified color palette, typography
   scales, spacing, and visual effects.
3. **Implement Animations & Effects:** Carefully integrate the described <motion summary>
   to ensure a dynamic, high-end feel.
4. **Deliver Complete, Runnable Code:** Output the full, production-ready code for all
   necessary components without using placeholders or skipping details.

Read through the following `<Brand> — <Surface> Specification` carefully before beginning
your implementation.

***

# <Brand> — <Surface> Specification

This document provides a highly detailed, comprehensive specification required to recreate
the "<Brand>" <surface> with 100% accuracy.
```

---

## §1. Technical Architecture & Stack

Bulleted, one line each, package names as they appear in `package.json`.

```
- **Framework**: React 19 (Vite 6), TypeScript strict
- **Styling**: Tailwind CSS v4 — CSS-first `@theme`, no `tailwind.config.js`
- **Motion**: native CSS `animation-timeline: scroll()` / `view()` as the default.
  Motion (`motion/react`) only where JS state is genuinely required.
- **Icons**: `lucide-react`
- **Utilities**: `clsx`
```

Pick a stack and commit. Mixing "React or Vue" guarantees a mediocre result.

Also state the **one non-obvious decision** here as a rule (SKILL.md step 3), and the
palette/typography sections below must visibly obey it.

### The 2028 platform baseline

The corpus is frozen around 2024 — hex colors, `md:` breakpoints, `whileInView` on
everything, static font weights. That was correct then. It is now the difference between a
competent spec and a current one. **These are the defaults; anything older is an exception
you have to justify in the spec itself.**

| Use | Not |
|---|---|
| OKLCH color tokens, hex given as fallback | hex as the source of truth |
| `@property` registration, so custom properties interpolate | unregistered vars that snap instead of animating |
| `animation-timeline: scroll()` / `view()` + `animation-range` | JS scroll listeners, `whileInView` for simple reveals |
| Container queries (`container-type: inline-size`) on cards and panels | viewport breakpoints for component-level layout |
| View Transitions API (`document.startViewTransition()`) for filters, sorts, route changes | fade-out/fade-in reimplemented by hand |
| Variable fonts with the axes wired (`opsz`, `wght`, and any custom axis) | three static weight files |
| `content-visibility: auto` + `contain-intrinsic-size` below the fold | manual virtualisation, or nothing |
| `svh` / `dvh` for full-height surfaces | `vh`, which is wrong on mobile |
| `:focus-visible` with a stated outline value | `outline: none` |

JS motion libraries still win for: pointer-driven physics, sequenced state machines,
`AnimatePresence`-style exit animations, and canvas work. Use them there and say why.
Everywhere else, native CSS is fewer bytes and runs off the main thread.

## §2. Visual Design System

Two subsections, both exhaustive.

**Color Palette** — every token named and hexed. Include background, one or two surface
elevations, primary + one shade either side, accent, and the three text tiers:

```
- **Background**: `#000000`
- **Surface / Raised**: `#0F0F0F`
- **Primary**: `primary-500` `#3B82F6`, `primary-400` `#60A5FA`
- **Accent**: `cyan-400` `#22D3EE`
- **Text Primary**: `#FFFFFF`
- **Text Secondary**: `rgba(255,255,255,0.70)`
- **Text Tertiary**: `rgba(255,255,255,0.40)`
```

**Typography** — families with the exact weights loaded, then a scale entry per role
carrying size, weight, tracking, and leading:

```
- **Display**: 'Instrument Serif' (400)
- **Body**: 'Inter' (300, 400, 500, 600, 800)
- **h1**: `clamp(3rem, 5vw, 4.5rem)`, weight 800, `tracking-tight`, `leading-[0.95]`
- **Subtitle**: `text-lg` → `text-xl`, weight 300, `max-w-xl`
- **Badge / small**: `text-sm`, weight 500, `tracking-[0.08em]`, uppercase
```

## §3. Layout Structure & Grid System

The skeleton, as classes or CSS. Root element, each stacking layer with its `z-index`,
the content container, max widths, and the section rhythm.

```
- **Root**: `min-h-screen bg-[#000] overflow-hidden relative`
- **Background layer**: `fixed inset-0 w-full h-full z-0 pointer-events-none`
- **Content container**: `relative z-10 min-h-screen flex flex-col items-center justify-center pt-20 pb-10`
- **Inner wrapper**: `w-full max-w-5xl mx-auto px-4 md:px-8 text-center`
- **Section rhythm**: `py-[clamp(4rem,8vw,10rem)]`
```

## §4. Section-by-Section Content & Hierarchy

The longest section. One `###` block per component, named with its filename. Inside each:
layout classes, then the **actual copy in quotes**, then per-element styling and states.

```
### Navbar (`Navbar.tsx`)
- **Layout**: fixed top, `w-full px-6 py-4 flex justify-between items-center z-50`
- **Logo**: "Exon AI", `font-semibold text-lg`, beside a 28px blue→cyan gradient circle
- **Links** (hidden `<md`, `gap-8 text-sm text-white/70`): Products, Solutions,
  Developers, Enterprise, Pricing. Hover → `text-white transition-colors duration-200`
- **Actions**: "Login" text link (hidden `<md`) + "Start Free" gradient pill
```

Repeat for hero content, feature grid, testimonial, pricing, CTA band, footer — whatever
the surface actually has. Real strings everywhere.

## §5. UI Components & Micro-Interactions

The reusable pieces. Per component: behavior in one sentence, each variant's classes, and
the physics or timing of its states.

```
### MagneticButton (`MagneticButton.tsx`)
- **Behavior**: on hover, translates toward the cursor — `x = (clientX - centerX) / width * 20`, same for y
- **Variants**: `primary` → `bg-gradient-to-r from-primary-600 to-primary-500 rounded-full`;
  `glass` → `bg-white/5 backdrop-blur-md border border-white/10 rounded-full`
- **Release**: Framer Motion spring, `stiffness: 150, damping: 15, mass: 0.1`
```

## §6. Animations — and the choreography table

Two halves. The page-wide rules, then **a beat table for the signature mechanic.**

**Page-wide rules** — entrance and reveal motion, stated once and reused. Never "fade in
nicely".

```
- **Default reveal**: `opacity 0→1`, `translateY 20px→0`, `620ms`,
  `cubic-bezier(0.16, 1, 0.3, 1)`, via
  `animation-timeline: view(); animation-range: entry 10% cover 30%`
- **Stagger**: siblings delay `90ms` apart, never more than five in a chain
- **Hover discipline**: every interactive element states its transition. Nothing is
  instant, nothing exceeds `700ms`.
- **Animate only**: `transform`, `opacity`, `clip-path`, `filter`, registered custom
  properties. Animating `width`/`height`/`top`/`left`/`margin`/`font-size` is a defect.
- **Reduced motion**: all of the above inside
  `@media (prefers-reduced-motion: no-preference)`; under `reduce`, final state immediately.
```

### The choreography table — required

A list of animation values describes how a site *looks*. A beat table describes how it
*unfolds*, and unfolding is what the work is judged on. **Any scroll-driven, pinned, or
timeline mechanic must carry one.** This is the single highest-value block in the whole
spec — without it, the implementer invents the pacing, and pacing is the design.

Map progress range → beat. Every row names what moves, by how much, and what drives it.

| Progress | Beat |
|---|---|
| `0.00–0.12` | Void. Frames 1–15, near-black. Headline holds full opacity, stroke unfilled. Nav transparent. |
| `0.12–0.38` | Approach. `--glow` `0 → 0.35`. Radial gradient at `52% 34%`, accent at `calc(var(--glow) * 0.5)` alpha, blends `screen`. |
| `0.38–0.60` | Ablation. `--glow` `0.35 → 1`. `--burn` drives `filter: contrast(calc(1 + var(--burn) * 0.35))`. Headline tracking opens `-0.035em → -0.012em`. |
| `0.60–0.63` | **The one violent moment.** White overlay hits `0.9` for exactly `70ms`, drops to `0` over `240ms`. Same frame: `--stroke-fill` snaps `0 → 1`, headline goes outlined → solid. |
| `0.63–0.86` | Cooling. `--glow` `1 → 0.15`. Lead paragraph and CTAs fade up `y: 24px → 0`, staggered `90ms`, `620ms`. |
| `0.86–1.00` | Impact. Sticky wrapper scales `1 → 0.94`, `border-radius: 0 → 28px`; next section slides over at `margin-top: -14vh`. |

Rules for a good table:
- **6–8 rows.** Fewer and you have not choreographed anything; more and you are animating
  noise.
- **Exactly one row is the climax.** Name it as such. A timeline where everything is a beat
  has no beats.
- **Ranges are contiguous and cover `0.00–1.00`.** Gaps are dead scroll, and dead scroll is
  the most common failure of pinned sections.
- **State the reduced-motion collapse underneath**: which single frame or final state
  renders, and that the track height collapses so the page does not scroll through nothing.

## §7. The Signature Centerpiece

One section for the single effect the page is remembered for. Source URL if third-party,
every config key with its value, scene adjustments, and the mounting strategy. See
`mechanics.md` for ready-made blocks.

Omit only when the surface genuinely has none — and say "No 3D or video centerpiece; the
type scale and grid carry the page."

## §8. Interaction Details

Cause → effect → why it looks the way it looks. This is what separates a spec from a
feature list.

> As the cursor moves, raycasting from camera to the Z=0 plane pushes tiles within radius
> back on Z by `depthScale: 3`. Receding tiles catch `light2` (`0x0066FF`, intensity
> 15000, at `Z=-20`), so the cursor drags an electric-blue crater across the grid.

## §9. Responsive Behavior

Per breakpoint, the values that change. Not "it adapts".

```
- **< 768px**: nav links + "Login" hidden; h1 → `text-5xl`; subtitle → `text-base`;
  container padding → `px-4`; section padding `64px → 32px`; CTAs stack full-width
- **768–1279px**: two-column grids collapse to one; h1 → `text-6xl`
- **≥ 1280px**: full layout, h1 `text-7xl`, container `max-w-5xl`
```

## §10. Performance

```
- Heavy 3D/video deps load in a `useEffect` via dynamic `import()` with `/* @vite-ignore */`
- Canvas wrapper is `pointer-events-none` to skip main-thread hit testing
- Animate `transform` and `opacity` only — no width/height/top/left
- Background video: `muted playsinline preload="metadata"`, poster frame set
- Fonts: `display=swap`, preload the single critical weight
```

## §11. SEO & Accessibility

```
- **Title**: `<title>Exon AI — Build, Automate & Scale</title>`
- **Meta description**: "<one real sentence>"
- **Semantics**: `<nav> <main> <section> <h1>`, one h1, no heading level skipped
- **Contrast**: body text ≥ 4.5:1 against `#000000`
- **ARIA**: icon-only buttons carry `aria-label`; decorative canvas `aria-hidden="true"`
- **Motion**: all entrance animation wrapped in `@media (prefers-reduced-motion: no-preference)`
```

---

## Length calibration

**These are floors, not targets.** The corpus average is context — it describes the
quality level we are trying to beat, not the one we are aiming at. Writing to the average
produces the average.

| Variant | Floor | Ceiling | Corpus average (context only) |
|---|---|---|---|
| C — Registry component | 90 | 150 | ~100 |
| D — Library component | 110 | 180 | ~130 |
| A — Section | **1,400** | 2,200 | ~1,050 |
| B — Full landing page | **1,800** | 3,200 | ~1,100 |

Corpus of 661, measured: `median=639  p75=1,074  p90=1,377  max=7,359`.

Two things that table encodes:

**A full landing page is not proportionally longer than a hero.** B's floor is only ~30%
above A's. B spreads the same depth over more surface — wider, not deeper. If your landing
page is three times your hero, you are writing eight heroes.

**The gap between floor and corpus average is deliberate.** ~700 extra words on a landing
page buys the choreography table, the states, the reduced-motion paths, and the container
query rules — every one of which the corpus omits and every one of which is the difference
between a site that works and a site that wins something. That is where the words go.

Above the ceiling you are almost always pasting code rather than specifying it —
`016-aerocore` is 72KB of raw HTML, which is a file, not a prompt.

Long because it is dense with values, never because it is padded with adjectives. If a
sentence contains no number, no token, no class name, and no quoted string — cut it. Do
not pad to reach a floor: if you are under it, you left something to guesswork, and the
fix is to find that thing, not to add prose.
