# Scroll craft — the pinned parallax we have not been building

Measured from the source of a commercial property template. Read with
`mechanics.md`: that file catalogues effects, this one explains the **scroll
system** they sit inside, which is the part every build in this project has
skipped.

> **Scope, corrected at n=3.** A third measured reference (`salix`, product-SaaS — see
> `species.md`) has **zero scroll-linked transforms across 341 elements**, no pin, no scrub,
> no parallax and no marquee, and it is a well-regarded template. The diagnosis below is
> **correct for narrative and product-reveal briefs and wrong for feature-dense SaaS**, where
> the visitor is scanning for what the product does and a pin gets in the way.
>
> Treat the pin as **one option in a menu**, not the mark of quality. What Salix has that none
> of our builds has ever had is **character-level text reveal** — h1 split into 45 spans by
> word *and* character, staggered ~18ms each. That is specified in `species.md` §4, including
> the `aria-label` without which the headline is announced one letter at a time.

## The honest diagnosis

Across eight builds, every page used **native scroll** and every reveal was
`opacity + translateY`. Not one used a pin, a scroll-linked transform, or a
smooth-scroll runtime. That is why the results read as *well-made pages* rather
than *designed scroll experiences*, and no amount of typography fixes it.

The reference does three things we have never done:

| | Reference | Every build here |
|---|---|---|
| Scroll driver | **Lenis** — interpolated, RAF-driven | Native wheel |
| Pinned sections | **`2500px` track + `sticky top:0` viewport** | None |
| Enter transform | `translateY(20px) scale(0.9)` → rest | `translateY(10px)` only |
| Depth | `perspective(1200px)` on a mask layer | None |
| Pinned media | Video scaling out of a `20px`-radius card | Static images |

---

## 1. Lenis — the thing that changes the feel

The single largest difference, and the cheapest to adopt. Native scroll moves in
wheel-sized steps; Lenis interpolates toward the target every frame, so anything
driven by scroll position moves continuously rather than in jumps.

Detected in the reference as class-based state on `<html>`:

```
html.lenis              { height: auto }
.lenis.lenis-smooth     { scroll-behavior: auto !important }
.lenis.lenis-stopped    { overflow: hidden }
.lenis.lenis-scrolling iframe { pointer-events: none }
[data-lenis-prevent]    { overscroll-behavior: contain }
```

Two of those are load-bearing and easy to miss:

- **`scroll-behavior: auto !important`** — Lenis and CSS smooth scrolling fight
  each other. If you leave `scroll-behavior: smooth` in your reset, anchor jumps
  become unpredictable. Every one of my builds set `scroll-behavior: smooth`.
- **`[data-lenis-prevent]`** — modals, dropdowns and code blocks must opt out or
  the page scrolls behind them.

```ts
import Lenis from "lenis";

const lenis = new Lenis({
  duration: 1.05,          // 0.8 snappy · 1.2 luxurious. Above 1.4 feels broken.
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
  smoothWheel: true,
  touchMultiplier: 1.6,
  autoRaf: false,
});

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
```

**Mandatory guards:**
- `prefers-reduced-motion: reduce` → do not instantiate Lenis at all. Hijacked
  scroll is a vestibular trigger, and this is the most common accessibility
  failure on sites that use it.
- Destroy on unmount, and call `lenis.stop()` when a modal opens.
- Anchor links go through `lenis.scrollTo(target, { offset: -80 })`, not native.

## 2. The pin — the geometry, exactly

Measured: outer track `height: 2500px; position: relative`, inner stage
`height: 100vh; position: sticky; top: 0; overflow: hidden`.

```html
<section style="height: 2500px; position: relative">
  <div style="height: 100vh; position: sticky; top: 0; overflow: hidden">
    <!-- the stage: everything animates here -->
  </div>
</section>
```

**Track height sets the pace.** `2500px` on a `1000px` viewport gives ~1500px of
scroll to play one beat — roughly two flicks of a trackpad. Shorter than ~1.8×
viewport feels rushed; longer than ~4× feels like the page has frozen.

**Gotchas that cost real time:**
- `overflow: hidden` on any ancestor kills `sticky`. Use `overflow: clip`.
- The sticky element cannot have a `transform` on an ancestor — it creates a
  containing block and sticky silently stops working.
- Give the track an explicit height in `px` or `vh`, not `%`.

Other sticky uses in the reference, both worth stealing:
- `top: 100px` — a sidebar that parks under a `68px` nav with breathing room.
- `top: 310px` — a heading that holds while its content scrolls past it.

## 3. The scale-in enter state

Measured inline start states: `translateY(20px) scale(0.9)`,
`translateY(15px) scale(0.95)`, `translateY(60px)`.

**Scale reads as an object arriving**; `opacity + translateY` alone reads as a
list loading. The scale delta is small — never below `0.88`, or it reads as a zoom.

> **Corrected at n=2.** This section generalised from a single template. A second
> measured reference (`westbridge`, see `density.md`) uses **no scale at all** — 43
> reveal targets, every one a pure `translateY(10–40px)` with `opacity: 0.001 → 1`.
> Scale reads *product*; pure translate reads *editorial / corporate*. **Pick per
> brief, do not assume.** Both were also measured at a **~1s** enter duration —
> slower than the 400–600ms specified elsewhere in this skill.

```css
@keyframes arrive {
  from { opacity: 0; transform: translateY(20px) scale(0.94); }
  to   { opacity: 1; transform: translateY(0)    scale(1); }
}
```

Larger offsets (`40–60px`) for big media blocks; `10–16px` for text.

## 4. The signature move — media that expands out of its card

The reference pins a video inside a `perspective(1200px)` mask layer, with a
`20px` radius that resolves to `0` as it fills the frame. This is the "Apple
product page" beat, and it is the effect the whole page is remembered for.

```
| Progress | Beat |
|---|---|
| 0.00–0.15 | Card sits at scale .72, radius 20px, centred. Caption at full opacity. |
| 0.15–0.62 | Scale .72 → 1, radius 20px → 0, caption opacity → 0. Media fills the stage. |
| 0.62–0.85 | Held at full bleed. Overlay copy rises, translateY(24px) → 0. |
| 0.85–1.00 | Stage scales to .94 and the next section slides over at margin-top: -12vh. |
```

Implemented with scroll-driven CSS — no runtime:

```css
@property --p { syntax: "<number>"; inherits: false; initial-value: 0; }

.stage-media {
  --p: 0;
  transform: perspective(1200px) scale(calc(0.72 + var(--p) * 0.28));
  border-radius: calc(20px - var(--p) * 20px);
  animation: drive 1ms linear both;
  animation-timeline: scroll(nearest block);
  animation-range: entry 0% cover 62%;
}
@keyframes drive { to { --p: 1 } }
```

Or with Framer Motion, when the beats need JS state:

```tsx
const ref = useRef(null);
const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
const scale  = useTransform(scrollYProgress, [0, 0.62], [0.72, 1]);
const radius = useTransform(scrollYProgress, [0, 0.62], [20, 0]);
```

`useScroll`'s `offset` is the equivalent of `animation-range` and is the value
people get wrong. `["start start", "end start"]` means: begin when the target's
top hits the viewport top, end when its bottom does.

## 5. Which tool for which job

| Need | Use |
|---|---|
| Smooth scroll feel | **Lenis.** Nothing else substitutes. |
| Reveal on enter | Native `animation-timeline: view()` — no runtime |
| Scroll-linked transform, no state | Native `animation-timeline: scroll()` + `@property` |
| Pinned sequence with branching or state | **Framer Motion** `useScroll`/`useTransform` |
| Exit animations, layout shifts | **Framer Motion** — `AnimatePresence`, `layout` |
| Everything else | CSS |

Lenis and native scroll timelines **do work together** — Lenis moves real scroll
position, so `scroll()` and `view()` timelines track it. You do not need Framer
Motion for a pin unless the beats carry state.

## Add to a spec

Any variant A/B page with a hero worth remembering should carry:

```
## Scroll system

Lenis, duration 1.05, expo-out easing, `smoothWheel: true`. Not instantiated
under `prefers-reduced-motion: reduce`. `scroll-behavior` removed from the reset.
Anchors routed through `lenis.scrollTo(target, { offset: -80 })`.
Modals and code blocks carry `data-lenis-prevent`.

## The pinned beat

Track `height: 280vh; position: relative`. Stage `height: 100svh;
position: sticky; top: 0; overflow: clip`. Ancestors use `overflow: clip`, never
`hidden`, and carry no transform.

[choreography table]

Reduced motion: no pin. The track collapses to `100svh` and the stage renders at
its end state.
```

## Acceptance checks

1. `grep -c "scroll-behavior" dist/**/*.css` returns 0 when Lenis is used.
2. With `prefers-reduced-motion: reduce`, Lenis is not constructed — verify in
   devtools that `html` has no `lenis` class.
3. No ancestor of a sticky stage has `overflow: hidden` or a `transform`.
4. Scroll the pinned section to its end, then back to the top. The stage returns
   to its start state — no stuck transform.
5. Tab into an element inside a pinned stage. Focus does not scroll the page to
   a broken position.
