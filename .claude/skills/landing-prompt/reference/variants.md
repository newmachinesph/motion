# Variants — how two briefs in the same archetype come out different

The archetype fixes the *language* (palette family, type weight, motion, density). Without a
second layer, every warm-service brief lands on the same page: split hero, slab, services grid,
collage, metrics, steps. That is the failure this file prevents.

**Variants are selected from the brief, never rolled.** Each table below has a decision column.
Answer it from the brief and the variant is determined. Two different businesses answer
differently and get different pages; the same business answers the same way twice, which is
what makes the output reproducible.

Record the choices in §0 of the spec as a **variant line**:

```
Variants  hero:split-cutout · rhythm:alternating · cards:photo-top · proof:tiles ·
          pricing:plans · close:form-split
```

---

## 1 · Hero shape — pick by what the business can show

| Variant | Choose when | Shape |
|---|---|---|
| **split-cutout** | there is a person or product worth photographing against a plain background | copy left 58%, knock-out subject bleeding to the slab floor and past the right edge, 2–4 doodles |
| **centred-plate** | the work is the subject, not a person — interiors, gardens, food, finished jobs | centred eyebrow pill, h1 at 18ch, one CTA, full-bleed `16:9` plate below the fold line |
| **full-bleed-scrim** | the location or scale is the sell — property, venues, travel, outdoor | photograph fills the slab, gradient scrim bottom-left, copy over it, no separate media column |
| **stat-split** | the proof is numeric and better than the competition's | copy left, a 2×2 of metric tiles right instead of an image, one plate below |
| **collage-hero** | the business is many small jobs rather than one big one | copy left, 3–5 rotated photos right, arranged as the collage device |
| **list-hero** | the offer *is* a price list — trades with published rates | copy left, first four price rows right, live in the hero |

Six shapes. A cleaner takes `split-cutout`; a landscaper takes `centred-plate` because the
garden is the subject; a boiler-service company with published prices takes `list-hero`.

## 2 · Section rhythm — pick by page length

| Variant | Choose when | Pattern |
|---|---|---|
| **alternating** | 10–12 blocks | white · slab · white · slab — the default warm-service cadence |
| **bookend** | 8–9 blocks | slab hero, all-white middle, slab close. Calmer, more corporate |
| **banded** | 12+ blocks | two whites between each slab, so slabs mark the three acts |
| **inverted** | the brand is dark-first | slab is the default ground, white blocks are the accents |

## 3 · Card shape — pick by whether the offer needs a picture

| Variant | Choose when | Shape |
|---|---|---|
| **photo-top** | the service has a visible result | plate `4:3` · icon · title · body · foot with price + arrow |
| **icon-lead** | the service is abstract — insurance, advice, cover, plans | 48px accent icon on a tinted square · title · body · arrow. **No photo** |
| **numbered** | the offer is a sequence, not a menu | large mono number · rule · title · body |
| **wide-row** | there are more than eight offers | full-width rows, media left 200px, copy right, hairline between |

## 4 · Proof block — pick by the strongest evidence

| Variant | Choose when | Shape |
|---|---|---|
| **tiles** | 3–4 strong numbers | heading left, tiles right, count-up on enter |
| **bento** | numbers *and* quotes are both good | 6-cell asymmetric grid, colour-blocked, quotes and figures interleaved |
| **logo-wall** | the customers are recognisable | sourced marks, two rows, muted until hover |
| **before-after** | the result is visual | paired plates with a draggable or static split |
| **credential-row** | the buyer is checking legitimacy | licence, bond, insurance badges in mono |

## 5 · Commercial block — pick by how the business charges

| Variant | Choose when | Shape |
|---|---|---|
| **plans** | recurring, tiered | 2–3 cards, middle raised, toggle |
| **price-rows** | per-job flat rates | rows with a right-aligned mono figure column |
| **from-grid** | prices vary too much to publish | service grid with "from £X" in the foot, plus a quote CTA |
| **quote-only** | genuinely bespoke | no prices; a scoping form and an explicit sentence saying why |

## 6 · Close — pick by the action

| Variant | Choose when | Shape |
|---|---|---|
| **form-split** | the action is a booking or quote | form left, plate right, on a slab |
| **calendar** | the action is a slot | day/time picker with real states |
| **call-first** | the buyer is older or the job is urgent | oversized tappable number, form secondary |
| **single-cta** | the action lives off-site | one line, one button, a lot of space |

---

## 7 · The selection procedure

Answer these six from the brief. Nothing here is a preference.

```
1  Is there a person or object worth photographing on a plain ground?   → hero shape
2  How many blocks does the content actually justify?                   → rhythm
3  Does each offer have a visible result?                               → card shape
4  What is the single strongest piece of evidence?                      → proof block
5  How does the business charge?                                        → commercial block
6  What exactly is the action, and who takes it?                        → close
```

Then pick the **accent pair** (`systems.md` §2) by the emotional register of the category, and
the **type pairing** by whether the brand should feel geometric, humanist or editorial.

### Worked contrast — three warm-service briefs

| | Cleaning co. | Landscaper | Emergency boiler repair |
|---|---|---|---|
| 1 person to shoot? | yes → **split-cutout** | no, the garden is → **centred-plate** | no, prices are → **list-hero** |
| 2 blocks | 12 → **banded** | 9 → **bookend** | 9 → **bookend** |
| 3 visible result? | yes → **photo-top** | yes → **photo-top** | no → **icon-lead** |
| 4 evidence | reviews + numbers → **bento** | the work → **before-after** | response time → **tiles** |
| 5 charging | recurring → **plans** | bespoke → **quote-only** | flat per job → **price-rows** |
| 6 action | booking → **form-split** | survey → **single-cta** | urgent → **call-first** |
| accent | ink / citrus | forest / clay | slate / sky |

Same archetype. Three pages that share a language and no layout.

---

## 8 · What must NOT vary

Variation is in composition, never in the floors. These hold in every variant:

- the density floor for the archetype
- no block is type-only
- fail-open reveals, locked media boxes, blur-up
- two breakpoint boundaries, ≤3 families, one radius ladder, one motion ladder
- 48px tap targets, `:focus-visible` everywhere, labels above inputs
- placeholders carry no factual claim

## 9 · Acceptance

1. The spec carries a **variant line** in §0 naming all six choices.
2. Each choice is traceable to its question in §7 — a reader can ask "why `list-hero`?" and get
   "the offer is a published price list", not a preference.
3. Two specs from this skill in the same archetype **differ in at least three of the six**. If
   they do not, the briefs were not read closely enough — go back to question 1.
