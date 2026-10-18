# Intake — making the builder adapt instead of impose

The rest of this skill is opinionated on purpose. This file is the part that bends, and it
runs **first**. Skip it and the builder imposes its defaults on a brief that needed
something else.

---

## 1. What inputs do we actually have?

The skill accepts more than a one-line brief. Handle whatever arrived; do not silently
ignore it.

| Input | What to do with it |
|---|---|
| **One-line brief** | The default path. Proceed. |
| **Reference URL** | Fetch it. Extract: section order, hero visual type, palette, type pairing, motion techniques, copy voice. State plainly which parts you are borrowing and which you are deliberately not. Never clone — a spec that reproduces someone's site is a legal problem and a boring one. |
| **Screenshot / mockup** | Read it as the source of truth for layout and hierarchy. Name what you can measure (grid columns, relative type scale, spacing rhythm, palette) and flag what you cannot (exact hexes, fonts, motion). Ask for the brand tokens rather than inventing hexes that will be wrong. |
| **Brand deck / design system** | **This overrides every default in this skill.** Their tokens, their fonts, their spacing scale. Your job becomes applying their system with our fidelity discipline — not designing a new one. |
| **Existing prompt to improve** | Run refine mode (§5). Do not regenerate from scratch. |
| **Existing site to redesign** | Fetch it, inventory what must survive (routes, content, SEO equity, integrations), then spec the change — not a greenfield build that quietly deletes half their site. |
| **Competitor set** | Map what they all do, then name what this site will do differently. That difference becomes the "one non-obvious decision" (SKILL.md step 3). |

If a brand deck or existing token set arrives, say so explicitly in §1 of the output:
*"Palette, type, and spacing are inherited from the supplied design system. Values below
are theirs, not proposed."*

## 2. Constraints that change the spec

Ask only when the answer would change the build. Otherwise decide, state the assumption,
and move on.

- **Audience network and device.** A 4.5MB frame sequence is correct for a luxury brand
  targeting desktop and wrong for a product whose users are on 3G. If the brief suggests
  emerging markets, low bandwidth, or mobile-first, the signature mechanic budget drops and
  a CSS-only mechanic replaces the canvas one. **Check this before picking the mechanic,
  not after.**
- **Accessibility target.** WCAG 2.2 AA is the default. AAA changes contrast ratios (7:1),
  bans some motion outright, and rules out several mechanics. Public sector, healthcare,
  education, and EU-facing products often require more than AA — ask.
- **Locale and direction.** English-only is an assumption, not a fact. RTL changes layout
  logic, not just text alignment: asymmetric grids mirror, directional motion reverses,
  icons flip. CJK breaks Latin type scales and line-height assumptions. If the product ships
  in multiple locales, say so in the spec and avoid copy baked into images.
- **Existing stack.** If they run Vue, Svelte, Astro, Rails, or plain HTML, the 2028 baseline
  still applies but the framework line does not. Do not spec React into a Rails shop.
- **Compliance and legal surface.** Fintech, health, and children's products carry
  requirements — cookie consent placement, data-handling disclosures, age gates — that are
  layout decisions, not footnotes.
- **Who builds this.** A senior engineer, an AI coding tool, or a no-code builder. Changes
  the output format (§4), not the rigour.

## 3. When the variant doesn't fit — variant F

The A/B/C/D/E taxonomy came from a corpus and a study. **It is a map, not a fence.**

Surfaces it does not cover: multi-page marketing sites, app UI and dashboards,
documentation sites, email templates, standalone pricing or changelog pages, blog and
editorial layouts, e-commerce product detail pages, app store listings, pitch decks,
onboarding flows.

**Variant F = compose one.** Do not force a bad fit; say what you are doing:

1. Name the surface and why no existing variant fits.
2. Borrow the skeleton from the nearest variant and state which.
3. Add the sections that surface genuinely needs.
4. Set a word floor by scaling from the nearest variant's.
5. **Keep the engine regardless** — this part never bends: concrete values only, one
   non-obvious decision, a choreography table for any timeline mechanic, every state
   specified, every asset routed, copy that passes the swap test, a counted word budget.

The engine is the skill. The variants are just where it has been pointed so far.

Worked example — a docs site: nearest is E; keep §1 design system, §2 technical, §4
section-by-section; drop the diagram system down to code-block conventions; add navigation
architecture, search, versioning, and the code-sample matrix; floor ~1,600.

## 4. Output format — match the consumer

The default is one fenced ```text block. That is right for a human and for most agents. It
is not always right.

| Target | Adjust |
|---|---|
| **Human engineer** | Default. Keep the file tree and the mandate. |
| **Claude Code / Cursor** | Default, plus explicit file paths per section so it can scaffold directly. |
| **v0 / Lovable / Bolt** | Shorter. These do better with one surface at a time — split a variant B spec into per-section prompts and say so. Name the component library they default to. |
| **Figma Make / design tools** | Lead with the visual system; drop the file tree, the perf budget, and the build gotchas. |
| **A design team, not a builder** | Reorder: art direction and references first, implementation detail to an appendix. |

Ask which tool only if the brief gives no signal. Otherwise assume a competent engineer.

## 5. Refine mode

When an existing prompt arrives with feedback, **do not regenerate.** Regeneration loses
the decisions that were already right and rerolls the ones the user approved.

1. Run the current checklist against it and report what actually fails.
2. Map vague feedback to concrete changes — `motion-system.md` §5 has the translator for
   motion complaints ("feels sluggish" → cut durations 30–50%).
3. Change only what the feedback and the failures touch. Preserve locked decisions:
   the brand, the one non-obvious decision, the mechanic, and any approved copy.
4. Report the diff: what changed, what you deliberately left, and why.

## 6. Known limitations — say these out loud rather than pretending

Honesty here is worth more than false confidence, and every one of these is a real gap.

### What has evidence behind it, and what does not

Six calibration runs (see `test-runs/REVIEW.md`) exercised variant routing across A, B, D, E
and F, the motion profiles, the states discipline, the logo/testimonial refusal, and the
non-obvious-decision step. Those parts have been observed working.

**Verified:** the **brand-deck override path** was tested against a deck built to clash with
this skill's defaults on eight points, two of which contradicted the skill's own written
rules (verb-first CTAs, both-themes-required). All eight inherited; both rule conflicts
resolved in the deck's favour. See `test-runs/07-klangwerk/REVIEW.md`.

Three behaviours from that run are worth repeating whenever a deck is supplied:
- **Note the disagreement, don't silently absorb it.** State the conflict, name standard
  practice, record that the deck overrules it. The engineer then knows the constraint is
  deliberate and stops "fixing" it.
- **Mark provenance.** Say plainly that §1 was inherited, and label any conversion (hex →
  OKLCH) as derived rather than proposed.
- **Honour the deck's own exceptions, and never obey it into an accessibility regression.**
  A brand rule of "always lowercase" is a `text-transform`, not markup — screen readers and
  search engines must still receive normal casing.

**These have never executed even once and should still be treated as unproven:**

- **Reference URL and screenshot intake (§1).** Never run.
- **Competitor-set intake (§1).** Never run.
- **Refine mode (§5).** Never invoked.
- **Output-format matching (§4).** Every run emitted the default shape.
- **The Codex image bridge** (`assets.md`). Documented, never executed end to end.

Say so when using them. A confident spec built on an untested path is worse than a hedged one.

### Standing gaps

- **No visual verification.** The skill writes specs; it never sees the result. Nothing in
  the loop catches "this looked wrong when built." Run `/run` or a screenshot pass
  separately.
- **The mechanics catalog is finite** — twelve entries. It is a starting set, not the space
  of possible ideas. A brief that deserves something not in the catalog should get it, with
  the same specification rigour applied.
- **Aesthetic bias toward dark and editorial — partially corrected, still real.** The
  Never/Always table in `SKILL.md` now carries a light/restrained column beside the dark one,
  because a caveat in file eight cannot outvote the example in file one. But the mechanics
  catalog still skews cinematic and most worked examples are dark. For a clinic, a government
  service, or a children's product: take the method, ignore the register, and expect to
  choose **no timeline mechanic at all**.
- **Word floors are calibrated on landing pages.** They are guesses for anything else, and
  variant F floors are extrapolation.
- **The Codex image bridge is unverified end-to-end** (`assets.md`). Test before depending.
- **Copy quality is process, not guarantee.** `copy.md` plus the anti-slop skill raise the
  floor; they do not make a headline good.
- **No performance measurement.** Budgets are specified and never verified. A spec claiming
  LCP < 2.0s is a target, not a result.
- **English-first.** Everything about type scale, line-height, and copy length assumes Latin
  script unless told otherwise.

## Intake checklist

- [ ] Every supplied input used — URL fetched, screenshot read, brand deck honoured
- [ ] Inherited brand tokens marked as inherited, not presented as proposed
- [ ] Network and device context checked **before** choosing the mechanic
- [ ] Accessibility target set (AA default, AAA stated if required)
- [ ] Locale and direction assumption stated
- [ ] Existing stack respected
- [ ] Variant chosen — or F composed and its derivation explained
- [ ] Output format matched to who or what consumes it
- [ ] Refine mode used instead of regeneration when a prior prompt exists
