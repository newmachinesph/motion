# The form thesis — the fix for generic output

## The problem, stated plainly

The variant E playbook in `technical-product.md` was derived by studying 100+ dev-tool
landing pages and the YC portfolio pattern. It therefore encodes **the median of what those
sites already do**: centred max-width container, technical grid, Inter or Geist plus a mono,
neutral palette with one accent, cards in a row, logo wall after the hero.

Following it produces a competent site that looks like every other site in the category.
That is not a failure of execution — it is what codifying an average does.

Evidence from the calibration set: TOMBSTONE (run 08) got its content thesis right and still
came out visually indistinguishable from any YC dev tool. KLANGWERK (run 07) looked
distinctive — but every distinctive property came from a supplied brand deck, not from this
skill. **Strip the deck and the system outputs the median.**

## Why the existing rule did not catch it

The "one non-obvious decision" (SKILL.md step 3) can be satisfied by a rule with no visual
consequence at all. TOMBSTONE's was *"every surface states what we cannot delete before what
we can"* — a genuine, load-bearing editorial decision that reorders sections and leaves the
page looking exactly as it would have anyway.

**A content thesis governs what the page says. It does not govern what the page is.**

## The rule

> Every spec carries **two** theses: one content, one form. The form thesis is a structural
> decision about the page as an object, and every section obeys it.

The form thesis must survive this test: **describe the page in one sentence without naming
the product. If the sentence could describe a competitor, there is no form thesis.**

- ✗ "A dark technical landing page with a hero, feature cards, and a pricing table." — that
  is every site in the category.
- ✓ "The page is a legal exhibit: numbered sections in a ruled margin, mono metadata running
  down the gutter, hairline rules instead of cards, nothing rounded, nothing raised."
- ✓ "The page is a terminal session you scroll through — every section is a command and its
  output, and the copy is the output."
- ✓ "Two fixed columns that never scroll together: claims on the left, the counter-evidence
  on the right, permanently in view."

## The counterweight — the thesis must not displace the job

**This rule exists because the form thesis, unchecked, produced a worse failure than the one
it was written to fix.**

Given "landing page for seven architect-designed houses", the thesis *the page is a drawing
sheet* was chosen and held everywhere. The result was distinctive and unusable as a business
page: no navigation, no photography in the hero, no interiors, no floor plans, no agent, no
map, no footer. Measured against two real property sites: **13 images against 43 and 84**,
zero rounded corners against 189 and 102, a grotesk where both references used a
characterful serif.

The diagnosis: the thesis was allowed to pick the *category's conventions* instead of the
*buyer's needs*. A landing page has a commercial job. Distinctiveness that costs the job is
a failure with better taste.

### The rule

> The form thesis governs **how** the page presents what the category requires. It never
> decides **whether** the page contains it.

Before writing, list what a buyer in this category came for. For property: photography in
volume, interiors, floor plans, price, location, a named agent with a phone number, and a
way to book. For a restaurant: the menu, the room, the address, the booking. For a SaaS
product: the interface, the price, the proof. **That list is non-negotiable and the thesis
must accommodate all of it.**

Then apply the test:

- **Does the thesis force the removal of anything on that list?** Then it is the wrong
  thesis. Not a bolder one — the wrong one.
- **Does the thesis make the required things better?** Then it is right.

### The strongest theses *demand* what the category needs

A thesis that fights the category is a concept piece. A thesis that amplifies it is design.

| Category needs | Fighting thesis | Amplifying thesis |
|---|---|---|
| Property: lots of photography | "the page is a drawing sheet" — banishes photos | "the page is a single day" — sections are hours, so light and photography *become* the structure |
| Restaurant: the menu | "the page is a receipt" — reduces food to line items | "the page is the pass" — dishes arrive as they would in service |
| Dev tool: the interface | "the page is a legal exhibit" — hides the product | "the page is a diff" — the product's own idiom, showing the interface |

The right-hand column requires *more* of what the buyer came for, not less. **If your thesis
lets you ship fewer photographs of the thing being sold, it is the wrong thesis.**

## Where a form thesis comes from

Not from taste, and not from a moodboard. From **the product's own logic**, made structural.

| The product's logic | The page becomes |
|---|---|
| Proves deletion with evidence | a certificate |
| Deterministic replay | a diff — two columns, identical geometry |
| A step sequencer | a grid of 16, and the layout is measured in sixteenths |
| Continuous compliance monitoring | a status board that never stops updating |
| Version control for X | a changelog, read bottom-up |
| Observability | a trace waterfall |

The test for whether it is load-bearing: **if the product changed, would this form become
wrong?** If the layout would work just as well for a different company, it is decoration.

## Where the risk has to be taken

A form thesis must show up in at least **three** of these. One is styling; three is a design.

1. **Structure** — the page's spatial logic. Fixed columns, a gutter, a ledger margin, an
   asymmetric split, a fixed rail. Not "a centred container with sections stacked in it".
2. **Type** — a real pairing decision with a reason. Mono-dominant. A serif for UI. One
   family at six weights. Not Inter plus a mono because that is what everyone uses.
3. **Rhythm** — the vertical system. Numbered exhibits, hairline rules, a running index,
   deliberate asymmetry. Not `padding-block: clamp(...)` repeated eight times.
4. **Surface** — how depth is expressed. Rules only, no cards. Or overlap. Or inset. Cards
   with a 1px border on a neutral ground is the default and therefore the tell.
5. **Colour logic** — what colour *means*, stated as a rule. "Accent appears at most four
   times per viewport." "These three colours are data and never decoration."
6. **Density** — deliberately denser or airier than the category. Dev-tool sites cluster at
   one density; moving off it is instantly legible.

## Banned defaults for variant E

These are the category median. Using one is fine. Using all of them means there is no form
thesis:

- A centred `max-width` container as the only spatial idea
- Inter / Geist + a mono, chosen without a stated reason
- Three feature cards in a row, `1px` border, `border-radius: 6–12px`
- A masked technical grid behind the hero
- Neutral palette + exactly one accent used for the CTA and nothing else
- Logo wall immediately after the hero, grayscale-to-colour on hover
- Section padding identical for every section

`technical-product.md` describes these because they are what the category does. **They are
the floor to clear, not the target to hit.** Read that file for the content architecture —
credibility, conversion, the diagram system — and take the form from here.

## In the spec

State it in §1, immediately after the content thesis, and name the three-plus places it
shows up:

```
### 1.2 The form thesis

The page is an evidence document, not a landing page.

- **Structure:** a fixed 132px left margin carries running mono metadata — exhibit number,
  timestamp, hash fragment — the way a filing carries a case number. Content sits in a
  single 62ch column beside it. Nothing is centred.
- **Rhythm:** every section is a numbered exhibit (`EXHIBIT 01 — SUBJECT`), separated by a
  single hairline rule that runs the full bleed, not the container.
- **Surface:** there are no cards and no shadows anywhere. Grouping is done with rules and
  indentation, the way a printed document groups.
- **Type:** mono is the primary voice, not the accent — it carries all labels, all data, and
  every heading. The serif appears only in the three prose passages.

If the product were not about evidence, this form would be wrong. That is the test it passes.
```

## Trend lists — how to use one without inheriting its slop

Trend round-ups ("20 web design trends in 2027") are mostly SEO filler, and treating one as
a checklist is a reliable way to produce the generic output this file exists to prevent.
Roughly a quarter of any such list is a usable **form direction**; the rest is either a
baseline you should already meet, or a product feature that has nothing to do with design.

**`trends-2027.md` is the routing table.** It sorts the 20-item 2027 set into four tiers —
one form direction to take, a baseline that is always on, an interaction layer matched to
brief signals, and product features to take only when asked — and converts each into tokens,
CSS, counts and states rather than adjectives.

The part that belongs here: **a Tier 1 direction is a form thesis and obeys every rule in
this file.** It must land in three or more of structure / type / rhythm / surface /
colour-logic / density, it must be justified by a sentence that would not be true of a
competitor, and it must not displace the page's job (see the counterweight section above).
Naming the two directions you *declined* is what stops the next brief in the same category
producing the same page.

## Acceptance check

Add to the spec's acceptance checks (`verification.md`):

> Screenshot the page at 1440px and show it beside two competitors in the same category. It
> must be identifiable at a glance without reading the wordmark. If it is not, the form
> thesis was decorative.
