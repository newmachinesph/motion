# Surface variants

The corpus is not one prompt shape. Measured across all 661 prompts:

```
n=661   min=1   p25=112   median=639   p75=1074   p90=1377   max=7359  (words)
```

That bimodal split is two populations: ~190 short registry/library stubs and ~470
full-fidelity specs. **Classify the surface before writing — the variant decides the
skeleton, the word budget, and where the detail goes.**

---

## The four variants

| Variant | Corpus label | n | Word floor | Corpus avg | Skeleton |
|---|---|---|---|---|---|
| **A. Section** | `category: Sections` | 60 labeled / ~200 est. | **1,400** (ceiling 2,200) | ~1,050 | 8–11 numbered sections, DEEP |
| **B. Template** | `category: Templates` | 34 labeled / ~270 est. | **1,800** (ceiling 3,200) | ~1,100 | 5–6 numbered, §3 carries 6–9 page sections, WIDE |
| **C. Registry component** | `21st.dev Registry` | 93 | 90–150 | ~100 | CLI anchor + 4 requirements |
| **D. Library component** | `HorizonX Library` | 93 | **100**–180 | ~130 | concept + aesthetic + motion + 4 requirements |
| **E. Technical product site** | not in corpus | — | **2,000** (ceiling **3,900**) | — | 8 numbered, §3 is a diagram system, §5 is conversion. See `technical-product.md`. |

**Calibrated against 6 test runs, not guessed.** E's ceiling was raised from 3,600 after a
run landed at 3,717 with no padding — E carries a diagram system *and* a conversion
architecture that B has no equivalent for, so deriving its ceiling from B's was wrong. D's
floor dropped from 110 after a format-complete stub came in at 106.

**Variant E is not derived from the corpus.** The motionsites collection contains no
technical product sites — no diagram systems, no code blocks, no credibility architecture,
no conversion sections. E was built from a study of 100+ devtool landing pages and from
the YC portfolio pattern. It reuses this skill's fidelity engine (concrete values,
choreography tables, states, counted budgets) and replaces the content architecture.

**Floors, not targets.** The corpus average is the quality level we are beating, not the
one we are aiming at — see the calibration note in `anatomy.md`. The gap between floor and
average is where the choreography table, the states, and the reduced-motion paths live.

The headline finding: **A and B cost roughly the same words (~1,050 vs ~1,100) and carry
roughly the same heading count (11.5 vs 12.2).** They are not "short spec vs long spec".
They spend the same budget differently — A goes deep on one surface, B goes wide across a
page. Writing a Template in the Section shape produces a bloated hero with eight
afterthoughts. Writing a Section in the Template shape produces a thin page.

---

## A. Section — go DEEP

`subCategory`: Hero (32), Features (11), Pricing (6), Footer (5), Testimonials (3),
Faq (2), Carousel (1). Hero is over half.

One surface, specified to mechanism level. Use the full 11-section anatomy in
`anatomy.md`. The budget goes into §5–§8: component physics, the signature mechanic's
every config key, and cause→effect interaction narration.

```
§1  Technical Architecture & Stack
§2  Visual Design System            (palette, typography)
§3  Layout Structure & Grid System  (z-index strategy matters here)
§4  Section-by-Section Content      (3–5 blocks only — nav, the surface, its parts)
§5  UI Components & Micro-Interactions
§6  Animations                       ← budget
§7  The Signature Centerpiece        ← budget: every config key + gotchas
§8  Interaction Details              ← budget: cause → effect → why it reads that way
§9  Responsive Behavior              (per-breakpoint values)
§10 Performance
§11 SEO & Accessibility
```

**Content-bearing sections need their data written out.** Pricing → all three tiers with
real prices, real feature bullets, which one is highlighted. FAQ → every question and its
answer. Testimonials → every quote with name, role, company. Carousel → every slide.
Describing "three tiers" and stopping is the most common failure in this variant.

## B. Template — go WIDE

`subCategory`: Agency (7), Portfolio (4), SaaS (4), Travel (4), Restaurant (3),
E-commerce (4), Real-estate (2), plus Auto, Corporate, Courses, Finance, Product,
Resort, Web3, Investor Presentations.

A whole landing page. Collapse the deep sections and spend the budget on page flow.

```
§1  Visual Design System            (1.1 palette, 1.2 typography, 1.3 layout & grid,
                                     + the one non-obvious decision, stated as a rule)
§2  Technical Implementation        (stack, 2028 baseline, file tree as an ASCII block,
                                     @property registrations)
§3  Section-by-Section Implementation   ← the bulk, 6–9 subsections
      3.1 Navbar        3.2 Hero          3.3 Features
      3.4 About         3.5 Services      3.6 Pricing
      3.7 Contact       3.8 Footer
    The hero subsection carries the CHOREOGRAPHY TABLE (anatomy.md §6). Any subsection
    with a form, filter, or feed carries its loading / empty / error / success states.
§4  Animations & Micro-Interactions  (page-wide rules, not per-element)
§5  Asset Manifest                   (exact URLs grouped by section; "supply your own"
                                      entries must state the spec the asset must meet)
§6  Performance & SEO
    Execution Mandate                (closing paragraph — see below)
```

Three things Template prompts carry that Section prompts do not:

1. **File tree**, as a literal ASCII block under §2 — `src/components/Navbar.tsx`,
   `Hero.tsx`, `Features.tsx`… This is what makes the output modular instead of one
   2,000-line `App.tsx`.
2. **Asset manifest** as its own numbered section — every image and video URL, grouped
   and labeled by the section that consumes it. Inline URLs get lost at this length.
3. **Execution mandate** — a closing directive naming the specific things not to skip:
   > "Do not cut corners. Do not simplify the Bento Box overlaps. Do not skip the video
   > masking or the scroll-linked mouse tracking. Implement the design exactly as
   > detailed above."

   Name the two or three hardest details. A generic "be thorough" does nothing.

Per-page-section depth in §3 is 4–8 bullets: placement, real copy, styling, hover. One
mechanic gets §7-grade depth (usually the hero's); the rest stay at bullet depth.

## C. Registry component — CLI anchor

For a component that already exists in a registry. ~100 words. Do not inflate it.

```
Build and wire the "<Name>" React component authored by <author> for a modern web application.

### Specifications:
- Component: <Name> (<slug>)
- Author / Style Reference: <author>
- Installation / CLI Anchor: npx shadcn@latest add https://21st.dev/r/<author>/<slug>
- Requirements:
  1. Use Tailwind CSS and Lucide React icons.
  2. Implement responsive container layout with customizable props.
  3. Follow shadcn/ui design tokens and theme variables.
  4. Clean TSX code ready for v0, Lovable, Bolt, and Cursor.
```

## D. Library component — concept-led

A single high-craft component with no registry entry. ~130 words.

```
Create a senior-grade, production-ready React and Tailwind CSS UI component for "<Name>".

### Design & Aesthetic Guidelines:
- Title: <Name>
- Concept: <one sentence naming the visual idea and its interaction>
- Styling: <the surface language — gradients, glass, contrast, typography>
- Motion & Animation: <library + what moves on scroll, hover, entrance>
- Code Requirements:
  1. Clean, modular TypeScript React component.
  2. Integrated interactive controls (buttons, tabs, state hooks).
  3. Responsive across mobile (375px), tablet (768px), and desktop (1440px).
  4. Production-ready structure compatible with Cursor, Lovable, Bolt.new, and v0.
```

---

## Routing

| The brief says | Variant |
|---|---|
| "hero", "pricing section", "footer", "FAQ", "testimonials", "features grid" | **A** |
| "landing page", "website", "portfolio site", a consumer/service business (restaurant, travel, agency) | **B** |
| a **technical product**: dev tool, API, SDK, CLI, database, infra, AI product, B2B SaaS, security/compliance, biotech, fintech — or the brief names YC, a startup, a seed round, or "we sell to engineers" | **E** |
| names a 21st.dev / shadcn registry entry, or gives an `npx shadcn add` URL | **C** |
| "a component that does X", no page around it | **D** |

Ambiguous between A and B: **"page" or a business noun → B; a section noun → A.** "A hero
for a restaurant site" is A. "A restaurant site" is B.

**Ambiguous between B and E — the important one.** Both are full sites; they are different
design problems. Ask: *is there something here that is genuinely hard to explain?*

- A restaurant, a travel brand, a portfolio, a property developer → **B.** The buyer
  already understands the product. The site's job is to make them feel something.
- A database, an observability platform, a compliance engine, an AI agent framework → **E.**
  The buyer does not yet understand the product. The site's job is to make them understand
  it and trust you, in that order.

A luxury watch e-commerce site is B even though watches are technical. An AI company
selling to non-technical buyers is still E, because the *product* needs explaining. The
test is comprehension difficulty, not industry.

## Openers, by variant

The corpus varies the role framing. Match it to the variant:

- **A**: "You are an elite frontend developer and UI/UX engineering expert…"
- **B**: "You are an award-winning elite designer and expert web developer. Your objective
  is to build a premium, highly responsive, and visually stunning React + Tailwind CSS
  landing page from scratch."
- **B**, heavier: "Act as an award-winning Senior UI/UX Designer and Lead Frontend
  Engineer… with absolutely no compromises on design, animation quality, or
  responsiveness."
- **C / D**: no role framing. Straight to "Build and wire…" / "Create a senior-grade…".

## A caution on the corpus labels

The labels are noisy — `341-pricing-brutalist` is filed under `Sections/Pricing` but its
body is a full portfolio site, and `418-testimonials-dual-marquee` is a complete EdTech
landing page. Classify from the brief in front of you, not from what a similarly-named
prompt was tagged.
