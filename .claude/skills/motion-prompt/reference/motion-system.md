# Motion system — timing, easing, choreography, and fit

The choreography table (`anatomy.md` §6) says **what happens when**. This file says **how
long it takes, what curve it rides, and whether that personality suits the product at all.**

Motion applied strategically is not polish — it is comprehension and perceived performance.
Applied by default, it is latency the user did not ask for.

---

## 1. Motion profiles by product type

Motion has a personality, and the wrong personality actively damages trust. A bouncy spring
on a wire transfer says "this software is not serious about your money."

| Product type | Personality | Duration bias | Easing | Never |
|---|---|---|---|---|
| **Banking / fintech** | controlled, precise, inevitable | short (`120–250ms`) | `ease-out`, no overshoot | bounce, spring overshoot, playful stagger |
| **Healthcare / clinical** | calm, steady, unhurried | medium (`200–350ms`) | gentle `ease-in-out` | fast snaps, aggressive parallax, anything startling |
| **E-commerce** | snappy, never blocking | very short (`100–200ms`) | `ease-out` | anything that delays add-to-cart; modal entrances over `250ms` |
| **Dev tools / infra** | efficient, informative | short (`120–250ms`) | `ease-out`, linear for progress | decorative motion; anything that moves while code is being read |
| **Kids / education** | playful, elastic, rewarding | long (`400–700ms`) | springs with real overshoot | flat linear motion, sterile fades |
| **Luxury / editorial** | slow, deliberate, weighted | long (`600–900ms`) | `cubic-bezier(0.16, 1, 0.3, 1)` | snappy UI-kit timings, bounce |
| **Enterprise SaaS** | invisible, quick, out of the way | short (`100–200ms`) | `ease-out` | any motion a user sees 200×/day and cannot skip |
| **Games / entertainment** | expressive, physical | varied | springs, custom curves | restraint for its own sake |

**Pick the profile before the durations.** It is the constraint the whole table below gets
filtered through — variant E (`technical-product.md`) almost always lands on dev tools or
enterprise, which is why its motion budget is so much tighter than variant A's.

## 2. Timing — duration by element type

Larger surfaces need longer; frequently-repeated interactions need shorter. Both rules at
once.

| Element | Duration | Notes |
|---|---|---|
| Micro-feedback (hover, focus, active) | `80–120ms` | Below `80ms` reads as instant, which is fine — never above `150ms` |
| Button / small control | `100–150ms` | Seen constantly. Every ms is a tax |
| Toggle, checkbox, radio | `120–180ms` | |
| Tooltip, popover | `150–200ms` in, `100ms` out | Exits are ~2/3 of entrances, always |
| Dropdown, select menu | `180–250ms` | |
| Accordion, expand/collapse | `250–350ms` | Scale with content height |
| Card, list item entrance | `250–400ms` | |
| Modal, dialog, sheet | `300–500ms` | The largest common surface |
| Page / route transition | `400–600ms` | Above `600ms` users think it broke |
| Full-screen takeover, preloader exit | `600–900ms` | Only with something to look at |
| Ambient / looping | `3–8s` | Slow enough to be ignorable |

**Exits are faster than entrances.** Roughly 2/3. Users have already decided to leave —
making them wait for a symmetrical exit is the single most common timing mistake.

## 3. Easing

```css
--ease-out:        cubic-bezier(0.0,  0.0, 0.2,  1);    /* default for entrances */
--ease-in:         cubic-bezier(0.4,  0.0, 1,    1);    /* exits only */
--ease-in-out:     cubic-bezier(0.4,  0.0, 0.2,  1);    /* moves between two on-screen points */
--ease-out-expo:   cubic-bezier(0.16, 1,   0.3,  1);    /* editorial, weighted, luxurious */
--ease-out-back:   cubic-bezier(0.34, 1.56, 0.64, 1);   /* deliberate overshoot — playful only */
--ease-linear:     linear;                              /* progress, marquees, packet flow */
```

**The rule:**
- **`ease-out` for anything entering.** Fast start, gentle settle. Feels responsive because
  the movement begins immediately.
- **`ease-in` for anything leaving**, and never for entrances — a slow start reads as lag.
- **`ease-in-out` only for movement between two visible positions** (a card sliding across,
  a carousel).
- **`linear` for progress and continuous loops.** Eased progress bars lie about progress.

### Springs

Use when motion should feel physical or is interruptible mid-flight — dragging, pointer
tracking, gesture dismissal. Springs are defined by feel, not duration, which is exactly
why they're wrong for anything that needs a predictable end time.

| Feel | stiffness | damping | mass | Use |
|---|---|---|---|---|
| Snappy, no overshoot | 400 | 40 | 1 | Enterprise UI, dev tools |
| Default balanced | 260 | 26 | 1 | General product UI |
| Gentle | 170 | 26 | 1 | Healthcare, calm surfaces |
| Bouncy | 180 | 12 | 1 | Kids, games, celebration |
| Magnetic snap-back | 150 | 15 | 0.1 | Cursor-following elements |

Damping below ~10 oscillates visibly. Damping above ~40 is a `cubic-bezier` with extra
runtime — just use the curve.

## 4. Choreography

- **The whole sequence completes in under 700ms.** Not each element — the *entire*
  entrance, last item included. Past 700ms the user has started reading and your animation
  is now interrupting them.
- **Stagger `50–120ms`.** Under 50ms reads as simultaneous; over 120ms reads as a queue.
  `90ms` is the safe default.
- **Cap the chain at 5.** Ten staggered cards at 100ms means the last one arrives at 1s —
  over budget. For longer lists, stagger the first 4–5 and bring the rest in together, or
  stagger by *row* rather than by item.
- **Overlap, don't sequence.** Start the second element at ~60% of the first, not at 100%.
  Sequential feels slow; overlapped feels choreographed. (This is the same rule the
  preloader exit uses in `mechanics.md` #10.)
- **Follow the reading order.** Stagger order teaches sequence. A diagram whose paths draw
  in the wrong order teaches the wrong architecture — see `technical-product.md`.
- **One focal point.** If three things animate for attention simultaneously, none has it.
- **Motion has a direction and it should mean something.** Entering from below = arriving.
  Exiting downward = dismissed. Sliding left = forward in a flow. Pick a spatial logic and
  never contradict it.

## 5. "When motion feels wrong" — the translator

Vague feedback, real fixes. Use this to convert a client note into a spec change.

| They say | It actually is | Fix |
|---|---|---|
| "feels sluggish" / "slow" | durations too long | Cut 30–50%. Check the *total* sequence, not per-element |
| "feels janky" / "stuttery" | animating layout properties | You're on `width`/`height`/`top`/`margin`. Move to `transform`/`opacity` |
| "feels robotic" / "mechanical" | linear or symmetric easing | Switch to `ease-out`, or to springs if it should feel physical |
| "feels cheap" / "template-y" | default `0.3s ease` everywhere | Differentiate by element type (table §2). One duration for everything is the tell |
| "too much" / "distracting" | too many focal points | Cut to one. Delete ambient loops competing with content |
| "doesn't feel premium" | too fast, no weight | Lengthen to `500–800ms` and switch to `ease-out-expo` |
| "feels laggy on click" | animating before responding | Give feedback in `<100ms`, run the transition after. Never make the user wait to learn the click registered |
| "jumps" / "pops" | no exit animation, or `display: none` | Add an exit at ~2/3 the entrance. Use `AnimatePresence` or `@starting-style` |
| "hard to follow" | wrong stagger order, or none | Stagger in reading order at `90ms` |
| "feels off on mobile" | desktop timings, hover-dependent | Shorten 20%, replace hover states with active states |

## 6. Implementation

**Default to native CSS.** It runs on the compositor, needs no runtime, and cannot be
blocked by a hydration delay. Reach for a library only where the row says so.

**1. CSS transitions** — state changes: hover, focus, open/closed
```css
.btn { transition: transform 120ms var(--ease-out), background-color 120ms var(--ease-out); }
.btn:hover { transform: translateY(-1px); }
```

**2. CSS keyframes** — self-running and looping motion
```css
@keyframes fade-up { from { opacity: 0; translate: 0 20px; } to { opacity: 1; translate: 0 0; } }
.reveal { animation: fade-up 400ms var(--ease-out) both; }
```

**3. Scroll-driven animations** — reveals and scrubs, zero JS. **The 2028 default.**
```css
.reveal { animation: fade-up linear both;
          animation-timeline: view(); animation-range: entry 10% cover 30%; }
.progress { animation: grow linear both; animation-timeline: scroll(root block); }
```

**4. Framer Motion / `motion/react`** — orchestration, exits, gestures, layout animation
```jsx
<motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
  transition={{duration:0.4, ease:[0,0,0.2,1], staggerChildren:0.09}} />
```
Its real advantages are `AnimatePresence` (exit animations) and `layout` (FLIP for free).
Using it for a plain scroll reveal is 40KB for something CSS does natively.

**5. GSAP** — complex timelines, ScrollTrigger pinning, morphing, SVG path work
```js
gsap.timeline({scrollTrigger:{trigger:'.hero', start:'top top', end:'+=500%', scrub:1, pin:true}})
   .to('.a',{opacity:1,duration:0.3}).to('.b',{scale:1.2},'-=0.15')
```
Best-in-class for multi-element scrubbed sequences. Check the license for commercial use.

**6. React Spring** — physics-based, interruptible
```jsx
const s = useSpring({ from:{y:20,opacity:0}, to:{y:0,opacity:1}, config:{tension:260,friction:26} })
```

**7. Lottie** — designer-authored After Effects motion
```jsx
<DotLottieReact src="/anim/hero.lottie" autoplay loop />
```
~250KB runtime — must be justified. Lazy-load below the fold. Prefer `.lottie` over `.json`.

**8. Rive** — *interactive* motion with a state machine; responds to input at runtime
```jsx
<Rive src="/hero.riv" stateMachines="State Machine 1" />
```
Smaller than Lottie and genuinely interactive. Correct choice for a character or control
that reacts to the user; overkill for a linear play-once animation.

**9. View Transitions API** — morph between DOM states or routes
```js
if (!document.startViewTransition) return update()
document.startViewTransition(() => update())
```
Unique `view-transition-name` per element; duplicates abort the transition silently.

**10. Intersection Observer** — trigger when native scroll-driven timelines aren't enough
```js
new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add('in')),
  { rootMargin: '-100px', threshold: 0.1 }).observe(el)
```
Mostly superseded by `animation-timeline: view()`. Still needed when entry must fire JS.

**11. 3D transforms** — depth, cards, carousels
```css
.scene { perspective: 1200px; }
.card  { transform-style: preserve-3d; transform: rotateY(25deg) translateZ(-100px); }
```
Always pair `perspective` on the parent with `preserve-3d` on the child, or it flattens.

## 7. Performance

- **Animate only**: `transform`, `opacity`, `filter`, `clip-path`, and registered custom
  properties. These run on the compositor.
- **Never animate**: `width`, `height`, `top`, `left`, `margin`, `padding`, `border-width`,
  `font-size`. Each triggers layout on every frame — this is the whole cause of "janky".
- `background-color` and `box-shadow` trigger paint, not layout. Acceptable in small doses;
  for a large moving shadow, animate the `opacity` of a pre-rendered shadow layer instead.
- **`will-change` is a scalpel.** Apply just before the animation, remove after. Left on
  permanently it holds a compositor layer per element and exhausts GPU memory.
- Prefer `translate` / `scale` / `rotate` as individual properties over a composed
  `transform` string — they compose without clobbering each other.
- **60fps = 16.7ms per frame.** Anything on the main thread during an animation eats that
  budget. Do not animate while parsing, hydrating, or fetching.
- `content-visibility: auto` with `contain-intrinsic-size` below the fold keeps off-screen
  animations from costing anything.

## 8. Accessibility

Non-negotiable. `prefers-reduced-motion` is a medical accommodation — for vestibular
disorders, motion sickness, and migraine triggers — not a preference toggle.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

That global reset is the floor, not the answer. **Author the reduced path deliberately:**

- **Reduce, don't remove.** Opacity fades are almost always safe. Replace *movement* with a
  cross-fade rather than deleting the transition and making state changes invisible.
- **What triggers vestibular symptoms**: large-area movement, parallax, scaling/zooming,
  spinning, and scroll-hijacking. Those go first.
- **Show the end state, never the start state.** A scroll-scrub sequence under `reduce`
  renders a representative completed frame and collapses its track — not an empty
  container the user scrolls through for 500vh.
- **WCAG checkpoints**: 2.3.1 nothing flashes more than 3×/second; 2.2.2 any auto-playing
  motion over 5s can be paused; 2.3.3 (AAA) all non-essential motion is disableable.
- Respect it in JS too: `matchMedia('(prefers-reduced-motion: reduce)').matches` — and
  listen for changes, don't just read it once at mount.
- Under `reduce`: don't mount a custom cursor, mute sound, and stop ambient loops.
- Motion must never be the *only* channel. A state change signalled purely by animation is
  invisible to a reduced-motion user and to a screen reader both.

---

## Checklist additions

- [ ] Motion profile chosen by product type, and the durations obey it
- [ ] Every duration justified by element type — not one global `0.3s`
- [ ] Exits at ~2/3 of entrances
- [ ] Entire entrance sequence completes under 700ms
- [ ] Stagger 50–120ms, chain capped at 5, ordered by reading order
- [ ] Overlaps at ~60%, not sequential
- [ ] Only `transform`/`opacity`/`filter`/`clip-path` animated — audited, not assumed
- [ ] `will-change` applied narrowly and removed after
- [ ] Reduced-motion path authored deliberately, not just the global kill-switch
- [ ] Under `reduce`: end state shown, tracks collapsed, cursor unmounted, sound muted
- [ ] Every implementation choice is the cheapest tier that works — CSS before library
