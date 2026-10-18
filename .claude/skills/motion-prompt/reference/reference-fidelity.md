# Reference Fidelity: Measure Before You Design

A reference URL or screenshot is evidence, not a mood board. The common failure is to extract adjectives ("dark," "premium," "minimal") while discarding the actual composition that made the reference feel expensive. This protocol turns the reference into a measurable build contract.

## 1. Evidence hierarchy

Use the strongest available source in this order:

1. Live reference URL inspected in a browser at desktop and mobile widths.
2. Full-page desktop and mobile screenshots with known viewport sizes.
3. A single screenshot with unknown dimensions; mark all geometry as estimated.
4. A named benchmark category when no reference exists; mark the audit `derived-benchmark`.

Never present an estimate as an observation. Never infer motion from a still screenshot. If the live page cannot be opened, say so inside the prompt and lower the geometry tolerance requirement to the values that can actually be evidenced.

## 2. Capture the reference twice

For a live URL, inspect at these minimum viewports:

- Desktop: `1440 × 900`, device scale factor 1.
- Mobile: `390 × 844`, device scale factor 1, touch enabled.

Dismiss cookie banners only when necessary to reveal the page. Capture the top of the page and every section boundary. Record:

- document title and total scroll height;
- header height and whether it is static, sticky, or fixed;
- outer rail width and centered content width;
- ordered section list with `y`, `height`, column count, column ratio, and dominant payload;
- desktop-to-mobile reorder, collapse, hide, crop, and overflow behavior;
- exact headline size/line-height when measurable, plus line breaks at both viewports;
- colors from computed styles, border alpha, corner radii, shadows, and backdrop filters;
- number of cards, rows, logos, portraits, diagrams, screenshots, and interactive controls;
- all actual motion: CSS animation name/duration, sticky behavior, autoplay media, marquee, caret, accordion, carousel, or state loop.

Do not inspect source code to copy implementation. Use the rendered page and computed behavior to understand design decisions.

## 3. Write the section map

Every full-page prompt with a reference must contain a table like this:

| # | Section / component | Desktop geometry | Mobile geometry | Dominant payload | Border / surface rule |
|---|---|---|---|---|---|
| 1 | Hero (`HeroSection.tsx`) | y 65, h 681, 50/50 split | single column, copy before media | editorial H1 + product stage | bottom rule, split rule |

Fill it with observed or explicitly estimated numbers. This table is the page silhouette. If the resulting build would produce a materially different silhouette, the prompt has lost the reference before styling begins.

## 4. Extract the design DNA

Translate observations into six to twelve repeatable rules. Good rules are structural:

- “The page lives inside a centered 1336px rail with 1px vertical rules; readable content is inset another 60px.”
- “Primary sections are separated by full-width 1px low-alpha rules, not isolated floating cards.”
- “The only saturated surface is the hero product stage and final CTA.”
- “Large copy alternates one bright line with one muted line to create hierarchy without extra decoration.”
- “Corner radii are 0–8px on layout surfaces and 14–18px only on product-message cards.”

Bad rules are moods: “clean,” “modern,” “premium,” “futuristic,” “sleek.” They cannot be tested.

## 5. Preserve structure, replace identity

Reference fidelity is not brand cloning. The final prompt must include two lists.

Preserve:

- section order and approximate height rhythm;
- column ratios and responsive reorder;
- content density and dominant-media silhouette;
- typography ratios, rail logic, border system, and whitespace cadence;
- interaction pattern and motion intensity.

Replace:

- logo, wordmark, color ownership, trademarked shapes, and brand phrases;
- portraits, licensed photography, illustrations, videos, and product screenshots;
- long-form marketing copy, testimonials, release notes, FAQ answers, and pricing language;
- any product-specific interaction that would misrepresent the new product.

Create authored equivalents that do the same compositional job. A reference’s bright image stage can become an original CSS/SVG environment containing the new product UI. A portrait testimonial can become an authored avatar treatment. A branded logo marquee can become a set of clearly labeled integration glyphs.

## 6. Set the payload floor

For each section, count the elements doing visual or informational work. The new build may exceed that count but must not quietly collapse it into a title and three generic cards.

Example floor:

- Hero: eyebrow, two-line H1, body, primary CTA, secondary action, full-height visual stage, credible product console with at least 12 internal UI elements, two annotations.
- Trust strip: labeled marquee and at least eight distinct integrations.
- Workflow: section title, request card, transformation mark, result card, connector path, caption, three ruled feature cells.
- Proof: one editorial quote, attributed person, three navigable cards, previous/next controls, position counter.
- Pricing: title, billing toggle, savings state, three complete plans, at least five features each, visible featured-plan treatment.

Counts are a floor, not a demand for decoration. Every element must help the product story, credibility, navigation, or conversion.

## 7. Specify the product stage as a real composition

The dominant media area is usually where reference-quality prompts fail. “Add a dashboard mockup” is not a specification.

For every product stage name:

- outer stage geometry and crop behavior;
- background art method (authored SVG, CSS geometry, generated bitmap, video);
- product surface dimensions, perspective/rotation, and shadow;
- the exact UI hierarchy inside the surface;
- at least one readable primary state and one state transition;
- foreground annotations, connection lines, or contextual objects;
- mobile crop or recomposition;
- reduced-motion final state.

The product surface must be credible at screenshot time without relying on animation.

## 8. Componentization contract

For Next.js builds, the prompt must require:

- App Router and the latest stable Next.js version resolved at implementation time;
- one component file per major section;
- `components/layout/` for header/footer, `components/sections/` for page sections, `components/ui/` for reusable primitives, `components/visuals/` for authored product/diagram stages, and `data/` for enumerated copy;
- server components by default;
- `'use client'` only for interactive islands such as menus, tabs, carousels, pricing toggles, accordions, and animated demos;
- no monolithic page component and no global client wrapper merely to animate reveals.

## 9. Mandatory visual QA loop

The final prompt must contain this loop as implementation work, not an optional checklist:

1. Build and capture full-page desktop (`1440 × 900`) and mobile (`390 × 844`) screenshots.
2. Compare reference and build side by side. Score: silhouette/section rhythm, rail geometry, typography and line breaks, density, dominant-media credibility, responsive reorder, and color/border hierarchy.
3. List the five largest visible deltas in pixels or concrete terms.
4. Fix those deltas in code.
5. Capture again and repeat for at least three passes, or until all exit gates pass.

Exit gates:

- zero horizontal overflow at both target viewports;
- no missing section, card, row, control, or required product-stage element;
- major measured rail and section boundaries within 8px desktop and 6px mobile where the reference provides exact geometry;
- headline line count and dominant-media silhouette match the intended reference composition;
- sticky header, menu, carousel/tabs, pricing toggle, FAQ accordion, CTAs, and keyboard focus work;
- no console errors or failed network requests required for the rendered design;
- reduced-motion renders a complete static state and removes nonessential loops;
- production build, TypeScript, and lint checks pass.

Do not stop after the first pleasant screenshot. The first pass reveals composition errors; the second resolves hierarchy; the third is where spacing, crop, and polish converge.
