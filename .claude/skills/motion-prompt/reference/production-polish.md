# Production polish — measured across 5 commercial templates

What makes a page look *produced* rather than merely designed. Read alongside
`form-thesis.md`: that file stops output being generic, this one stops it looking
unfinished. Different failures, different fixes.

**Method.** Raw HTML pulled from five independent Framer SaaS templates and measured for
technique only. The question was not "what does one good site do" but **what do five
independent teams all do the same way** — because that is discipline worth encoding, and
everything else is taste that must not become a rule.

| | agenio | finexis | hypersonic | docly | alytics |
|---|---|---|---|---|---|
| HTML | 2,092kb | 1,921kb | 739kb | 414kb | 818kb |
| `<img>` with `width`+`height` | 198/198 | 81/81 | 24/24 | 5/5 | 141/141 |
| `object-fit` | 196 | 81 | 24 | 5 | 139 |
| `aspect-ratio` | 239 | 123 | 261 | 39 | 104 |
| `will-change` | 296 | 123 | 247 | 58 | 199 |
| breakpoint boundaries | 3 | 2 | 3 | 2 | 2 |
| font families | 2 | 4 | 4 | 3 | 3 |
| `animation-timeline` | 0 | 0 | 0 | 0 | 0 |
| `<canvas>` / `<video>` | 0 | 0 | 0 | 0 | 0 |
| `clip-path` / `mix-blend-mode` | 0 | 0 | 0 | 0 | 0 |
| `display:grid` vs `display:flex` | 9 / 349 | 7 / 155 | 3 / 119 | 1 / 118 | 2 / 147 |

---

> **Read `density.md` first.** This file makes each element credible. That one says how many
> elements there must be — and a 10× shortfall in count is not fixable by polish. Note the
> figure below: **449 images across five templates ≈ 90 per template.** Our builds have
> shipped with 0–3.

## The five things all five do — these are rules

### 1. Every single image is a locked box. No exceptions in 449 images.

`width` and `height` on **100% of `<img>` tags in all five sites**, plus `object-fit` on
effectively all of them, plus `aspect-ratio` in the hundreds. Not one unlocked media slot
across five independent codebases.

CLS is zero by construction. **In a spec: no image, video, embed, or chart may be specified
without explicit dimensions and an object-fit.** An unlocked media slot is a defect, not an
oversight.

### 2. Every animated element declares its layer

`will-change` counts (296 / 123 / 247 / 58 / 199) run roughly level with the number of moving
elements. Layers are declared deliberately rather than left to the browser to guess.

Pair it with our existing rule — apply narrowly, remove after — but **do apply it.**

### 3. Two or three breakpoint boundaries, at conventional values

Every site: `810px` and `1200px`, occasionally `1440px`. One used `900px` instead of `810px`.
That is the entire responsive strategy.

**Default to two boundaries; a third needs a stated reason.** Our specs have been listing
four and five. Fewer breakpoints means each is designed rather than patched.

### 4. Polish comes from discipline, not effects

Across five templates: **zero `<canvas>`, zero `<video>`, zero `clip-path`, zero
`mix-blend-mode`.** `backdrop-filter` appears in two of five, twelve times each.

These pages look expensive with none of the techniques in `mechanics.md`. The impression
comes entirely from locked boxes, consistent motion, restrained type, and even rhythm.

**The implication for us is uncomfortable and worth stating plainly:** a signature mechanic
is not what makes a page look professional. It is what makes it *memorable*. A page can be
memorable and unfinished at the same time, and ours have been. Mechanic buys distinctiveness;
this file buys credibility. A spec needs both.

### 5. Nobody uses scroll-driven CSS animations

`animation-timeline` appears **zero times in all five**. Every reveal is JavaScript-driven.

This is the most useful finding in the set, because our specs mandate
`animation-timeline: view()` and it has produced the same invisible-content bug in four
separate builds — an unreachable `cover` range, `entry 100%` on an element taller than the
viewport, and a timeline resolving late.

**We keep it** — it runs off the main thread and needs no runtime, which is a genuine
advantage. But it is *not* the production default, it is newer than the tooling these teams
ship, and our own build history shows it fails closed. So the fail-open rule is not
belt-and-braces, it is mandatory:

```css
[data-rise] { opacity: 1; }                    /* visible by default, always */

@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    [data-rise] {
      animation: rise 620ms var(--ease-out) both;
      animation-timeline: view();
      animation-range: entry 0% entry 40%;     /* reachable at any element height */
    }
  }
}
```

---

## Three claims I made from one site that the data killed

Recorded because the correction matters more than the original claim, and because it is a
warning about method.

| Claim from n=1 | What five sites show | Status |
|---|---|---|
| "One typeface, weight carries hierarchy" | Range is **2–4 families**. Inter is the near-universal workhorse; the others pair it with a display or mono face. | **Wrong.** Real rule: fewer than four, and any second family needs a semantic job. |
| "Enter states ship inline as `opacity: 0.001`" | Counts: 190, 763, 13, **1**, 11. Two sites barely use it. | **Not a rule.** A good technique, one team's house style. |
| "Direction encodes position — X for side elements, Y for stacked" | One site is 755 X-axis starts to 1 Y. The other four are ~0 X. | **Wrong.** That is finexis's signature, not an industry practice. |

The `opacity: 0.001` detail is still worth keeping as *technique* — a truly-zero element can
leave the compositor and pop on return, and a hydration failure leaves faint content rather
than blank. But it is an option, not a standard.

**The method lesson: one site is an anecdote.** Measure across independent implementations
before promoting anything to a rule, and say which is which.

---

## What not to copy

Framer's export is a canvas tool's output, and three properties are artifacts:

- **Absolute positioning as the layout system** — 355 / 149 / 157 / 47 / 268 instances of
  `position:absolute` against 9 / 7 / 3 / 1 / 2 grids. Brittle, and the reason each
  breakpoint variant must be rendered separately.
- **Every breakpoint variant shipped and hidden** — a 2MB HTML document for one landing page.
- **Zero container queries in all five.** Everything is viewport-driven.

We keep grid, container queries, and one DOM. **Take the discipline, not the architecture.**

Also note `docly` ships **two** `<section>` elements for a whole landing page. Visual polish
and semantic quality are independent, and these tools optimise only the first.

---

## Add to every spec

```
## Production discipline

- Every image, video, embed and chart: explicit `width`/`height`, an `aspect-ratio`, and an
  `object-fit`. No unlocked media slots — CLS must be 0 by construction.
- `srcset` + `sizes` on any image rendered above 400px wide.
- `loading="lazy"` on everything below the fold; `fetchpriority="high"` on the LCP image only.
- `will-change` declared on every animated element, applied before and removed after.
- Two breakpoint boundaries (810px, 1200px). A third requires a written reason.
- At most three font families, and every family beyond the first states its semantic job.
```

## Acceptance checks

1. Count `<img>` tags; count those with both `width` and `height`. Must be equal.
2. `grep -c "object-fit" dist/**/*.css` ≥ number of media slots.
3. Count distinct breakpoint boundaries in the compiled CSS. More than three fails.
4. Count font families. More than three fails; each beyond the first must have a stated job.
5. Disable JavaScript. Nothing sits at `opacity: 0` — the fail-open rule holds.
6. Throttle to slow 3G, reload, watch for layout shift as images arrive. Any shift fails.
