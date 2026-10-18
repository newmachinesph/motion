# Variant E — Technical product site

The YC / dev-tool / technical-startup site. Stripe, Supabase, PostHog, Vanta, Retool,
Mintlify, Clerk, and the several hundred companies in the YC directory that look like them.

**Scope note:** this is not a "YC style" — Stripe (S09) and Supabase (S20) are YC, Vercel
and Linear are not, and they all share the language. It is the *technical product* style.
YC's directory just skews heavily technical B2B, so it reads as the YC look.

---

## What makes E different from A and B

| | A / B (motionsites, awwwards) | E (technical product) |
|---|---|---|
| Job | make an impression | **explain a hard thing, fast** |
| Motion serves | atmosphere and drama | **comprehension** |
| Success | "that was beautiful" | "oh — I get it, and I trust them" |
| Hero carries | a cinematic mechanic | **a diagram or the product itself** |
| Copy | evocative | **specific, technical, unhedged** |
| Audience | anyone | an engineer who will close the tab if you waste their time |

The consequence: **every animation must be load-bearing.** In variant A, a scroll-pinned
entry sequence justifies itself by being beautiful. Here, if a motion does not make the
product easier to understand, it is a tax on someone evaluating your infrastructure at
11pm. Cut it.

## The governing rule: the one hard thing

Every technical product exists because one concept is hard. Find it before writing a line.

- Supabase: *"a real Postgres database, not a proprietary abstraction over one"*
- Vanta: *"compliance evidence collects itself continuously instead of in a Q4 panic"*
- Stripe: *"money movement is an API call, not a six-month bank integration"*

**The main diagram exists to explain that one thing.** Every other section supports it.
If you cannot state the hard thing in one sentence, you are not ready to spec the site —
and neither is the company.

This is variant E's equivalent of the "one non-obvious decision" (SKILL.md step 3). State
it in §1 and hold it.

---

## Canonical section order

From a study of 100+ devtool landing pages ([Evil Martians,
2025](https://evilmartians.com/chronicles/we-studied-100-devtool-landing-pages-here-is-what-actually-works-in-2025)).
Deviate deliberately, not accidentally.

```
1. Hero                 headline + subhead + dual CTA + THE primary visual
2. Trust block          logo wall, immediately after the hero — the majority place it here
3. Feature blocks       2–5, each: claim → diagram/abstracted UI → proof
4. Social proof         curated testimonials with name, role, company. Nearly all
                        studied sites curate; almost none auto-pull tweets.
5. Supporting           docs teaser, security/compliance, integrations, comparison,
                        pricing (only a handful show it inline), FAQ (common)
6. Final CTA            restate the hard thing, one action
```

Also from the study:
- **Almost all use a centered, max-width container.** A few go full-bleed. Only a handful
  use a side-by-side hero with text left, visual right — it is the minority choice, so
  take it on purpose or not at all.
- **About half** use an auto-scrolling logo carousel for the trust block. The other half
  use a static grid. A static grid reads as more confident when the logos are strong.

## Hero visual — pick exactly one of six

The study's taxonomy. This choice is the single biggest decision on the page.

| Type | Use when | Cost |
|---|---|---|
| **Animated product UI** | the product is visual and the value shows in ~4s | high |
| **Static product UI** | the interface is the point and it is dense | low |
| **Switchable product UI** | one product genuinely serves 2–4 distinct jobs | medium |
| **Live product embed** | it is safe, fast, and cannot break in public | very high |
| **Code snippet** | *"common for tools without much UI"* — APIs, SDKs, CLIs | low |
| **Abstract illustration** | the product is invisible infrastructure | medium |

**Decision rule:** if the product has an interface a user stares at, show it (abstracted).
If it has no interface — an API, a database, a compliance engine, a model host — show a
diagram or a code snippet. Never show an abstract illustration for a product with a good
UI; you are hiding your best asset behind decoration.

**The AI-era exception — the interactive demo.** For AI products (2023 onward), the live
embed has moved from "very high cost, rarely worth it" to close to mandatory. Chatbase puts
a working chatbot in the hero; the visitor types and gets a real answer before reading a
word of copy. If the product can demonstrate itself in under ten seconds with no signup, a
working demo beats every other hero type, because it converts skepticism directly into
evidence. Specify it fully: the seeded example prompts, the empty state, the loading state,
the rate limit, and what happens when the backend is down.

---

## The diagram system

This is the heart of variant E and the part the corpus of A/B prompts has no vocabulary
for. Name the type, then specify it at mechanism level like any other mechanic.

### Vocabulary — say which one you mean

- **Technical illustration** — static vector artwork depicting the system
- **Abstracted UI** — an idealized, simplified *fake* product screenshot. Not a real one.
- **Architecture / data-flow diagram** — nodes and edges, showing how data moves
- **Explanatory motion graphics** — the animated form, usually animated SVG or Lottie
- **Spot illustration** — small, beside feature copy
- **Isometric illustration** — 2.5D projection, for physical/spatial systems

### The eight diagram types

**1. Node-edge flow** — boxes and connectors. The default for infrastructure.
- 3–7 nodes maximum. Eight is a system architecture doc, not a marketing diagram.
- Nodes: `border-radius: 6px`, `1px` border, mono label at `0.7rem`, `letter-spacing: 0.06em`.
- Edges: SVG `<path>`, `1px`, `stroke-linecap: round`. Orthogonal routing with `8px` corner
  radii reads as engineered; bezier curves read as decorative.
- **Animate: packets travelling the wire.** A second `<path>` over the first with
  `stroke-dasharray: 6 220` and `stroke-dashoffset` animating `226 → 0`, `2.4s linear
  infinite`. Stagger each edge by `180ms` so the system pulses rather than marching.
- Runs on the compositor and needs no JS at all.

**2. Self-drawing diagram** — the diagram draws itself as it scrolls into view.
- `stroke-dasharray` set to the path's exact `getTotalLength()`, `stroke-dashoffset`
  animating from that length to `0`.
- Drive with `animation-timeline: view(); animation-range: entry 20% cover 45%` — no JS.
- Stagger paths in the order a reader should follow, `140ms` apart. **The stagger order is
  the explanation** — get it wrong and the diagram teaches the wrong sequence.

**3. Abstracted UI** — the fake screenshot.
- Build it in DOM, never ship a PNG. It stays sharp, themeable, animatable, and
  translatable.
- Simplify hard: real chrome, real type scale, **fake but plausible data**. Row counts of
  4–6. Never lorem ipsum — use data that reads like a real customer's.
- One element does something: a row streams in, a status flips `pending → passed`, a
  number counts. One. Not four.
- **Gotcha**: if it drifts from the real product, it becomes a lie users discover at
  signup. Specify it as "abstracted, must remain truthful to current behavior."

**4. Layer stack** — horizontal slabs, `your app` on top, `infrastructure` at the bottom.
- For products that slot into an existing stack. Answers "where does this sit?" in one look.
- 3–5 layers. The company's layer is the only one in the accent color; every other layer is
  neutral. That single color decision *is* the message.

**5. Sequence / lifecycle** — left to right, a request's journey.
- For latency, retries, webhooks, queues, auth handshakes.
- Include real numbers — `12ms`, `p99 40ms`. A sequence diagram without timings is a
  cartoon.

**6. Isometric system illustration** — 2.5D scene.
- For hardware, robotics, biotech, logistics, energy — anything with physical extent.
- 30° projection, consistent light source, `2px` outlines. Expensive to produce and dated
  when done badly. Commission it or do not use it.

**7. Terminal / code-to-result** — a command and its real output.
- The highest-trust element available to a dev-tool site. An engineer reads this before
  they read the headline.
- Type-out animation at `28–40ms` per character, then output appears after a `400ms` beat.
  Loop only once, then hold. A looping terminal is unreadable.
- **Every code block must be copyable**, syntax-highlighted, and show the language. The
  copy button confirms in place: `Copy` → `Copied` for `1.6s`.
- Never fake output that the real command would not produce.

**8. Metric / telemetry visualization** — charts as product proof.
- Real-shaped data: a latency chart with a plausible p99 tail, not a smooth sine wave.
- Axis labels with units. An unlabeled chart on a technical site reads as a stock photo.

### Implementation, by cost

| Technique | Use for | Notes |
|---|---|---|
| **Animated SVG + CSS** | 90% of cases | `stroke-dashoffset`, `offset-path`, `@property`. Compositor-thread, no runtime, no library. **Default to this.** |
| **DOM + CSS** | abstracted UI | Themeable, accessible, translatable. Beats an image every time. |
| **Lottie** | complex character or organic motion | ~250KB runtime — must be justified. Lazy-load below the fold. |
| **Canvas 2D** | particle fields, many-element scenes | When SVG node count exceeds ~500. |
| **WebGL** | genuinely 3D product surfaces | Rare and usually wrong. Ask what it buys. |

### Rules that stop diagrams becoming decoration

- **One idea per diagram.** Two ideas means two diagrams.
- **It must survive being static.** Screenshot it. If it no longer explains anything, the
  motion was carrying meaning it should have encoded in layout.
- **Label everything.** Unlabeled nodes are wallpaper.
- **Loop or trigger, never both.** Scroll-triggered plays once on entry. Ambient loops run
  continuously and quietly. A diagram that does both is noise.
- **Reduced motion**: show the completed end state — all paths drawn, all packets removed.
  Never the empty start state, which explains nothing.
- **Accessibility**: `role="img"` with a real `aria-label` stating the conclusion
  (*"Requests route through the edge cache before reaching your origin"*), not the parts.

---

## Visual language

### The technical grid

The "blueprint grid" / "Vercel aesthetic" — a near-subliminal grid behind hero and section
backgrounds. You feel it before you see it.

```css
.grid-bg {
  background-image:
    linear-gradient(rgb(0 0 0 / 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgb(0 0 0 / 0.05) 1px, transparent 1px);
  background-size: 24px 24px;
}
.dot-bg {
  background-image: radial-gradient(circle, rgb(0 0 0 / 0.1) 1px, transparent 1px);
  background-size: 16px 16px;
}
```

- `16px` or `24px` cells, `1px` lines, **10–20% opacity and no more**
- Always masked — `mask-image: radial-gradient(ellipse at center, black 20%, transparent 75%)`.
  An unmasked full-bleed grid looks like a wireframe someone forgot to remove.
- Optional: `1px` corner ticks or crosshairs at section boundaries. Sparingly.

### Color

- **2–3 colors total.** Predominantly neutral, one accent.
- The accent means "this is ours" — it marks the company's layer in a stack diagram, the
  active node in a flow, the primary CTA. Nothing else.
- Semantic states are the exception and must be distinguishable without color:
  `passed / failed / pending` carry an icon or a shape too.
- Both themes are effectively required — engineers browse in dark mode and will judge you
  for not having one. Specify tokens for both, and check diagram contrast in each.

### Typography

- **Sans**: Geist Sans, or Inter. **Mono**: Geist Mono, or JetBrains Mono.
- Mono is not decoration here — it is a semantic signal. Use it for code, terminal output,
  API fields, metrics, version numbers, diagram node labels. Never for body copy.
- Headline scale is *smaller* than variant A. `clamp(2.5rem, 5vw, 4rem)` is the ceiling. A
  `9vw` display headline on an infrastructure site reads as a fashion brand.
- Generous whitespace, precise alignment, systematic spacing.

---

## Credibility architecture

Engineers evaluate trust before value. Specify these explicitly — the A/B anatomy has no
slot for them.

- **Logo wall** directly after the hero. 6–12 logos, single row or two. Grayscale at rest,
  full color on hover, or committed grayscale throughout. Never a mix.
- **Curated testimonials** with full name, role, and company. The study found nearly all
  sites curate rather than auto-pull. Two strong quotes beat eight weak ones.
- **Compliance and security**: SOC 2 Type II, HIPAA, GDPR, ISO 27001 — as badges plus a
  link to a real trust center. Supabase surfaces SOC 2 on the landing page itself.
- **Open-source signals** where they apply: live GitHub star count, license, link to the
  repo. Fetch the count at build time, not on every page view.
- **Scale numbers** with units and a date: *"500,000+ teams"*, *"1.2B requests/day"*.
  An undated number is a number from an unknown year.
- **Docs link in the primary nav.** Not in the footer. A dev-tool site that buries its docs
  is telling engineers it has none worth reading.
- **Investor and accelerator signals.** For a YC company the **"Backed by Y Combinator"
  badge** is the single highest-leverage trust element on the page, and it is nearly
  universal in the directory — orange `#FF6600` wordmark or the official lockup, placed
  under the hero CTAs or in the trust block. Alongside it, name the lead investors and the
  round if it is announced. Early-stage companies with no logo wall yet should lean on this
  hardest: it is the credibility they have before they have customers.
  Specify the exact lockup, its placement, and its dark-theme variant — a badge that
  disappears on dark is the most common implementation failure here.
- **Community**, where one exists: live Discord member count, GitHub contributors, a link
  to the public roadmap. For open-source and developer products this substitutes for a
  logo wall in the earliest stage.

## Conversion architecture

The A/B anatomy has no slot for these either, and for a startup they are the point of the
site. YC's own portfolio track record — 45% reach Series A, 10% exit, 4.5% become
unicorns — means most of these sites are arguing for their existence, not coasting on a
brand. Every one of these is a section to specify, with real copy and every state.

- **Quantified before/after.** Not "saves time" — a two-column block with the current cost
  and the cost with the product, in the buyer's units: hours per week, dollars per month,
  headcount. Artisan frames it as savings; the number is the argument.
- **Booking without a callback.** If the motion is sales-led, embed the scheduler inline —
  the visitor picks a slot on the page. A "request a demo" form that promises contact
  "within 2 business days" loses to a competitor with a calendar. Specify the embed, its
  loading skeleton, and its fallback if the third-party script is blocked.
- **Pricing.** There is a genuine split here, and you must pick a side deliberately:
  the 100-page devtool study found *only a handful show pricing directly*, while
  self-serve YC companies almost all do. The rule: **usage-based infrastructure and
  enterprise-sales products link to a pricing page; self-serve and PLG products show the
  tiers inline.** When shown inline, specify all of it — every tier with its real price,
  the free tier or trial terms, one tier flagged most-popular with a visual treatment, an
  enterprise "contact us" tier, and the monthly/annual toggle with the discount stated.
- **FAQ**, common enough to be expected. Write every question *and its answer*. Pair it
  with a docs-trained support bot if one exists, and specify that widget's states too.
- **Final CTA** restating the hard thing in one sentence, with exactly one action.
- **Footer** carrying documentation, status page, changelog, security/legal, careers, and
  contact. On a technical site the footer is a navigational surface, not a legal dumping
  ground.

## Voice

Technical products earn trust through specificity, and lose it instantly to marketing
language.

- **Say what it does.** *"Build in a weekend. Scale to millions."* (Supabase) — a claim with
  a shape. *"Empowering the future of innovation"* is a resignation.
- **Numbers over adjectives.** "p99 under 40ms" not "blazing fast".
- **Name the competitor's model, not the competitor.** "Not a proprietary abstraction over
  Postgres" is fine. "Unlike Firebase" invites an argument you cannot win on your own site.
- **A distinct voice is an asset.** PostHog's own social proof section reads *"Yes they
  actually use us, no it's not just some random engineer who tried us out 2+ years ago."*
  That is a company confident enough to be funny. It works because everything around it is
  precise. Do not attempt it on top of vague copy.
- **Never**: "revolutionary", "seamless", "cutting-edge", "game-changing", "leverage",
  "empower", "unlock". Any sentence surviving with the product name swapped out is dead copy.

---

## Skeleton

```
§1  Product Thesis & Design System
      1.1 The one hard thing (one sentence — governs everything)
      1.2 Color (both themes, accent discipline stated)
      1.3 Typography (sans + mono, and what mono means semantically)
      1.4 Layout, grid, and the technical-grid treatment
§2  Technical Implementation      stack, 2028 baseline, file tree, @property registrations
§3  The Diagram System            ← the section A/B has no equivalent for
      3.1 The primary diagram: type, every node and edge labelled, the choreography
          table for its animation, its static fallback, its aria-label
      3.2 Secondary diagrams, one block each
      3.3 Code block and terminal conventions: languages, copy behavior, type-out timing
§4  Section-by-Section            hero → trust → features → social proof → supporting → CTA
                                   real copy throughout; testimonials with names and roles;
                                   loading / empty / error / success on every form and embed
§5  Conversion Architecture       YC/investor badge, quantified before-after, booking embed,
                                   pricing (linked or inline — state which and why), FAQ
                                   with real answers, final CTA, footer as navigation
§6  Animations & Micro-Interactions   page-wide; every motion justified as comprehension
§7  Asset Manifest                logos, diagram source, fonts, OG image, YC lockup (both themes)
§8  Performance, SEO & Accessibility  budgets, both themes, diagram a11y
    Execution Mandate
```

**Word floor: 2,000. Ceiling: 3,600.** Higher than B because the diagram system (§3) is a
whole extra dimension of specification, and because content data — testimonials, logos,
code samples, metrics — is heavier here than anywhere else.

## Checklist additions for E

- [ ] The one hard thing is stated in §1 in a single sentence, and the primary diagram explains *that thing*
- [ ] Hero visual is one of the six types, chosen by the decision rule, not by default
- [ ] Every diagram: type named, all nodes and edges labelled, choreography table, static fallback, `aria-label` stating the conclusion
- [ ] Each diagram survives being screenshotted
- [ ] Code blocks: language shown, copy button with in-place confirmation, output real
- [ ] Both light and dark themes specified, including diagram contrast in each
- [ ] Trust block placed immediately after the hero
- [ ] Testimonials carry full name, role, and company — no anonymous quotes
- [ ] Compliance and open-source signals present where they apply, with links
- [ ] YC / investor badge specified with exact placement **and its dark-theme variant**
- [ ] Docs link in the primary nav
- [ ] Scale numbers carry units and a date
- [ ] Quantified before/after in the buyer's own units, not "saves time"
- [ ] Pricing decision made deliberately — inline for self-serve, linked for usage-based/enterprise — and the reason stated
- [ ] If inline: every tier, real prices, trial terms, most-popular flag, enterprise tier, annual toggle with the discount
- [ ] Booking is an inline scheduler, not a form promising a callback
- [ ] FAQ answers written out, not just the questions
- [ ] Footer works as navigation: docs, status, changelog, security, careers, contact
- [ ] Zero words from the banned list; no sentence survives swapping the product name out
