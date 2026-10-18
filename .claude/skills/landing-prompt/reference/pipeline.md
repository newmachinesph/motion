# Pipeline — the nine stages, in the order a studio actually works

A real project runs discovery → content → art direction → UX → visual design → handoff → build
→ QA → launch, and **each stage constrains the next**. That constraint chain is what makes
output feel designed rather than assembled. Writing the hi-fi spec first — which this skill
used to do — is writing the last document first.

Every stage below **stands in for a real role**, produces **one file**, and passes **one gate**.
Do not start a stage until the previous gate passes.

## Output as a folder

```
<project>/
  00-brief.md        discovery
  01-content.md      content matrix          ← the stage most often skipped
  02-direction.md    art direction + sign-off ← the gate we had no equivalent of
  03-composition.md  IA, variants, lo-fi
  04-system.md       DESIGN.md
  05-PROMPT.md       the buildable spec
  06-build/          the project
  07-audit.md        QA
  08-launch.md       launch checklist
```

## The one correction up front: art direction, not randomisation

Rolling a random palette and font pairing produces arbitrary output — the same failure as a
trend checklist, one layer down. Every choice in stages 2–4 is **parametric**: the brief fixes
the direction, the direction fixes the strategy, the strategy generates the values.

> **The test for every value in stages 2–4:** name the input it was derived from. If the answer
> is "it looked nice", it is arbitrary. Go back to the direction and derive it.

---

## Stage 0 — Brief

**Stands in for** discovery: strategist + account manager, stakeholder interviews.
**In** the user's request, plus any reference URL or screenshot.
**Out** `00-brief.md`

```
Business     what it sells, in the buyer's words
Buyer        who decides, what they fear, phone or desktop
Action       the one thing the page must produce
Proof        the evidence that makes the claim believable
Reference    a URL or a named category convention to match
Anti-goal    the thing this page must NOT look like
```

**Anti-goal is the highest-value line and the most skipped.** "Must not look like a hospital."
"Must not look like a crypto site." One sentence kills more bad directions than a page of
positive description.

**Gate** every line answered. Ask **at most one** question; decide the rest and say what you
decided. A real studio bills for discovery because the client cannot answer these unprompted —
so answer them and have them corrected, rather than asking six questions and stalling.

---

## Stage 1 — Content matrix

**Stands in for** the content strategist. In real projects **late content is the single largest
cause of slipped launches**, and designing against lorem ipsum is why layouts break when the
real words arrive at twice the length.

**In** the brief. **Out** `01-content.md` — every piece of content the page needs, before any
layout exists:

| Block | Purpose | Longest string | Source | Status |
|---|---|---|---|---|
| Hero h1 | the claim | 52ch | invented | placeholder |
| Metrics ×4 | scale proof | "1,200+" | invented | placeholder |
| Reviews ×3 | trust | 180ch | invented | placeholder |
| Services ×6 | the menu | 140ch body | invented | placeholder |

Three columns matter and one is new:

- **Longest string** — the design must survive the worst case, not the demo case. A card grid
  tuned to "Gutter Clearing" breaks on "Emergency Boiler Repair & Certification".
- **Source** — `client` · `researched` · `invented`. Everything invented is a placeholder.
- **Status** — anything `invented` that reads as a fact (a licence number, an award, a named
  person, a review count) is **a claim the business cannot back**. Mark it, and either soften
  it to something true-by-construction or flag it for the client to fill.

**Gate** every block has a longest-string figure and a source. No invented string states a
verifiable fact. This is the rule that would have caught six wrong-subject images on Halstead
and every fake credential since.

---

## Stage 2 — Art direction · **sign-off gate**

**Stands in for** the art director presenting to the client. In a real project this is where
the money is earned and where the project can still be cheaply redirected. Nothing downstream
is cheap to change.

**In** the brief. **Out** `02-direction.md` — **three** directions, one chosen, two recorded
as declined with the reason.

```
Chosen     "ledger on kraft paper, one ink"
           why: the buyer is checking legitimacy before price; a document register
           reads as accountable where a photographic hero reads as advertising

Declined   "midnight control room, one live wire"
           why: correct for a dispatch product, wrong for a household purchase

Declined   "warm schoolyard notebook in soft crayon"
           why: friendly, but undercuts a £4,000 job
```

The descriptor is `<mood or place> <object> on/in <ground>` and must name a **thing**, not a
feeling — see `design-md.md` §1. Then name the **register** (the adjective pair the page must
earn) because stages 3–4 are derived from it: *quiet and exact* produces narrow chroma, one
family, a tight scale, small radii, 200ms motion. *Loud and generous* produces two accents, a
display face with character, a 1.5 ratio, pill radii, 600ms motion. Same pipeline, opposite
output, neither arbitrary.

**Gate — the sign-off.** Describe the page in one sentence without naming the business. If that
sentence could describe a competitor, there is no direction yet. **Stop here and present the
three before spending stages 3–8.** This is the gate a studio has and an automated pipeline
usually does not, which is why automated pipelines produce plausible pages nobody chose.

---

## Stage 3 — Composition: IA, variants, lo-fi

**Stands in for** the UX designer. **In** brief + direction. **Out** `03-composition.md`

**3a · Archetype** — `systems.md` §1. Chosen by category, not taste. Take the whole row.

**3b · The six axes** — `variants.md`. Answer from the brief; nothing here is a preference:

```
1  Is there a person or object worth photographing on a plain ground?  → hero shape
2  How many blocks does the content actually justify?                  → rhythm
3  Does each offer have a visible result?                              → card shape
4  What is the single strongest piece of evidence?                     → proof block
5  How does the business charge?                                       → commercial block
6  What exactly is the action, and who takes it?                       → close
```

**3c · Section order as beats**, not content types — the order carries the argument:

```
1 Hero        claim + proof-of-scale + primary action
2 Trust       borrowed credibility, before anything is explained
3 Services    claim → mechanism → proof
4 About       who is doing this, and why they can
5 Method      how it works, because they now want to know
6 Evidence    metrics + quotes
7 Objection   pricing / FAQ — the last thing between them and acting
8 Close       one action, restated
```

**3d · Lo-fi, in ASCII, at 1440 *and* 390.** Block types only, no copy, no colour:

```
┌──────────────────────────────────────────────┐
│ NAV  wordmark ······ links ······ [CTA]      │
├──────────────────────────────────────────────┤
│   [eyebrow]                                  │
│   ██████████████████  H1 2 lines             │
│   ────────────────    lede 2 lines           │
│   [CTA] [ghost]          ▓▓▓▓▓▓▓ media       │
└──────────────────────────────────────────────┘
```

Thirty seconds here catches structural mistakes for free. **The Northbound hero shipped with no
words above the fold** — a plate and a thumb strip pushed the h1 to y≈1100. A lo-fi would have
shown a full viewport of media before a single line of type.

**Gate** the lo-fi shows the first viewport at 1440 and 390, and the primary claim plus one
action are visible in both without scrolling. Variant line recorded; **two specs in one
archetype differ in at least three of the six axes**.

---

## Stage 4 — Design system

**Stands in for** the visual designer producing the UI kit. Post-2013 you stop comping pages
and start designing components; this stage is that kit.

**In** direction + archetype. **Out** `04-system.md`, in the `DESIGN.md` format —
descriptor · **named colour table** (name · hex · token · role sentence) · type block with
**per-size letter-spacing** and substitute stacks · **radius per element type** with the two
structural radii named · elevation named by purpose · **4–6 Do and 2–3 Don't**, each carrying
the reason it is the signature.

**Tokens in three tiers**, and components written against the middle one:

```
primitive   --kraft-9: oklch(58% .17 62)     what it IS      never referenced by a component
semantic    --color-accent: var(--kraft-9)   what it's FOR   the theming switchboard
component   --btn-bg: var(--color-accent)    where it's USED only when a component diverges
```

Every interactive component ships **five states as values**: rest · hover · active ·
focus-visible · disabled, plus loading/empty/error for anything async.

**Gate** `design-md.md` §8 acceptance: descriptor names a thing and would not fit a competitor;
every colour has a role sentence; tracking stated per size above 32px; structural radii named;
Do/Don't carry their rationale. Contrast measured, not eyeballed — **sage-7 came out at 3.91:1
and failed**, which only a measurement finds.

---

## Stage 5 — The spec

**Stands in for** design handoff: redlines, asset export, font licensing.
**In** everything above. **Out** `05-PROMPT.md` in the ten-section format in `SKILL.md`.

Stages 0–4 are now inputs rather than assumptions. Section by section: exact geometry at both
breakpoints, **verbatim copy in quotes**, the asset manifest with real URLs and dimensions,
states, motion, a11y, gotchas, acceptance checks.

**Gate** `wc -w` ≥ 2,000, reported as what the command returned — never estimated, because
self-reported counts have been wrong every time they were checked. Zero `e.g.` Zero
placeholders. A builder could start without asking a question.

---

## Stage 6 — Build

**Stands in for** the frontend developer. **In** `05-PROMPT.md` alone — if the build needs a
question answered, stage 5 failed and the answer goes back into the spec.

**Gate** builds clean, no console errors, every route in the asset manifest resolves.

---

## Stage 7 — QA

**Stands in for** QA + accessibility + SEO + performance, and this is where every real defect
has appeared. Not one of the failures below was catchable by reading the spec.

Run `verify.md` against the **rendered DOM**, then **screenshot and look**. Both get reported.

The recurring meta-failure, five times over: **a check passed by measuring the wrong thing.**
A breakpoint regex passed by finding nothing. HTTP 206 stood in for image content, and six of
seven images depicted the wrong subject. A container's right edge stood in for each figure's,
and the price column was not a column. Source was grepped instead of rendered copy. A
screenshot labelled "hero" was section 4, because Lenis hijacks `window.scrollTo`.

**Every check names the thing it measures, and that thing is the thing that breaks.**

**Gate** audit clean against rendered DOM; hero, two mid sections, footer and 390px looked at
with eyes.

---

## Stage 8 — Launch

**Stands in for** DevOps and the go/no-go call. **Out** `08-launch.md`.

```
Redirects     old URL → new URL, one row each
robots.txt    unblocked — shipping staging's robots.txt to prod is the classic disaster
Sitemap       generated, submitted
JSON-LD       organisation, services, prices, area served, aggregate rating — validated
llms.txt      page map for agent readers
Analytics     tag fires, goal recorded
Performance   measured against the budget in §2, in KB — not asserted
Monitoring    uptime, error reporting
Backups       verified restorable, not just configured
```

**Gate** every line checked, not intended. Nobody launches on a Friday.

---

## §0 of every emitted spec — the derivation chain

So a reader can see that no value is arbitrary:

```
## How this spec was derived

Brief        <business · buyer · action · proof · reference · anti-goal>
Direction    "<descriptor>" · register "<x and y>" · declined: <two, with why>
Archetype    <row> — chosen by category
Variants     hero:<x> · rhythm:<x> · cards:<x> · proof:<x> · commercial:<x> · close:<x>
System       <n> named colours, ground <x> · <type strategy>, ratio <n> (<reason>)
             radius <structural pair> · motion <ladder> <easing>
Structure    <n> blocks as beats, lo-fi verified at 1440 and 390
Content      <n> strings, longest <n>ch, <n> invented and marked
```

## Where the automated pipeline is still weaker than the studio

Worth stating rather than hiding:

| Real process | Here | Gap |
|---|---|---|
| Content gathered from the client | Stage 1 invents it and marks it | Copy is plausible, not true |
| Art direction presented, client chooses | Stage 2 presents three, **you choose** | No independent taste rejecting a direction |
| Two rounds of revision, then a change order | No commercial pressure | Nothing forces convergence |
| Photography commissioned | Sourced free stock | The most common reason quality is capped |
| UAT by someone who did not build it | Same context audits its own work | Confirmation bias — hence "name what each check measures" |

## Acceptance

1. Nine files exist, in order, and each names the stage's gate as passed.
2. The anti-goal is stated, and nothing in the spec violates it.
3. The two declined directions are recorded with reasons.
4. Every invented string that reads as a fact is marked in `01-content.md`.
5. The lo-fi predates any hi-fi copy and covers both breakpoints.
6. The derivation chain is §0 of `05-PROMPT.md`.
7. Stage 7 reports what each check measured, not only that it passed.
