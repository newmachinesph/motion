# Web copy

Every string in the spec is written verbatim, which means **you are the copywriter**, not
just the spec writer. A perfect design system carrying dead copy produces a beautiful site
nobody converts on.

## Delegate the prose mechanics

**Load the `anti-ai-slop-writing` skill before writing any copy.** It owns the sentence-level
rules and this file does not repeat them:

- the banned words and phrases list
- no rule of three; no uniform sentence length; no parataxis
- no hedging seesaw, no corporate pep talk
- structural variety across paragraphs

This file covers what that skill does not: **web copy specifically** — the patterns, the
lengths, and the per-section jobs.

---

## The two tests

**1. The swap test.** Replace the product name with a competitor's. If the sentence still
reads true, it is dead copy. *"Empowering teams to do their best work"* survives any swap
and therefore says nothing.

**2. The screenshot test.** Show someone only the hero, for five seconds. Can they say what
the product does and who it is for? If not, the headline is decoration.

Copy that fails either goes back. No exceptions, and no amount of typography rescues it.

---

## Headlines

**Length: 3–9 words.** Past twelve it stops being a headline and starts being a paragraph
set in display type.

### Patterns that work

| Pattern | Shape | Example |
|---|---|---|
| **Capability + scale** | do X, at Y | *"Build in a weekend. Scale to millions."* (Supabase) |
| **Named outcome** | the state the user reaches | *"Ship faster with fewer incidents"* |
| **Contrarian claim** | the thing everyone else won't say | *"Your CI is slow because it's rebuilding everything"* |
| **Category redefinition** | X, but the Y way | *"Postgres, not a proprietary abstraction over it"* |
| **Concrete image** (editorial/B) | evocative, tied to the product | *"Older than the ground"* |
| **Direct address** | speaks to the reader's situation | *"You've been paged three times this week"* |

### Rules

- **Specific beats clever.** A headline the buyer can repeat to their boss beats one they
  admire.
- **Numbers in the headline are strong** when true and material: *"Deploy in 40ms"*.
- **Never a question** unless you answer it in the next line. Rhetorical questions in heroes
  read as an ad from 2009.
- **Never two ideas.** One claim. The subhead carries the second.
- **Sentence case** unless the brand has a stated reason for title case. Title Case In A
  Headline Reads As A Press Release.

## Subheads

**Length: 12–28 words. One sentence, or two short ones.**

The subhead's only job is to answer the question the headline provoked. It is where the
mechanism goes — *how* the claim is true.

- Headline claims, subhead proves. Never restate the headline in longer words.
- Name the audience if it isn't obvious from the headline.
- This is the correct place for the hedge, the qualifier, or the "for teams who…" clause —
  not the headline.

## CTAs

**Length: 2–4 words.** Start with a verb.

| Instead of | Write | Why |
|---|---|---|
| "Submit" | "Create account" | Says what happens next |
| "Learn more" | "See how it works" | Names the destination |
| "Get started" | "Start free" / "Deploy your first app" | Removes ambiguity about cost and effort |
| "Contact us" | "Talk to an engineer" | Says who answers |
| "Sign up" | "Start free — no card" | Kills the objection in the button |

- **Primary and secondary must differ in commitment**, not just in color. "Start free" +
  "Read the docs" is a real pair. "Get started" + "Get started free" is not.
- **First person converts** in some contexts: *"Start my trial"*. Test it, don't assume it.
- **Never more than two CTAs** in a hero. Three is a decision the user won't make.
- The microcopy under the button does the de-risking: *"Free forever for up to 3 projects.
  No card required."*

## Section-level jobs

Every section's copy has exactly one job. Write to the job.

| Section | The job | Failure mode |
|---|---|---|
| Hero | State what it is and who it's for | Poetry with no product in it |
| Trust block | Borrow credibility | An unlabelled logo grid with no claim attached |
| Feature | One claim → one proof | Three features crammed into one block |
| Social proof | A specific outcome, attributed | *"Great product!" — Anonymous* |
| Pricing | Remove the fear of the wrong choice | Tiers named Bronze/Silver/Gold that describe nothing |
| FAQ | Answer the real objection | Questions nobody asked, engineered to sound good |
| Final CTA | Restate the hard thing, one action | A second homepage |

### Feature copy

The shape is **claim → mechanism → proof**, and most sites skip the middle.

> **Claim:** "Catch regressions before they ship."
> **Mechanism:** "Every PR runs against a snapshot of last week's production traffic."
> **Proof:** "Teams on Replay catch 4× more regressions in review."

A claim with no mechanism is marketing. A mechanism with no claim is documentation.

### Testimonials

- Full name, role, company. Always. An anonymous quote is worth less than no quote.
- Pick quotes with a **number or a specific before/after** in them. *"We cut onboarding from
  three weeks to two days"* beats *"the team loves it"*.
- Two strong quotes beat eight weak ones.
- Never edit a quote into marketing voice. The tonal mismatch is the proof it's real.

## Microcopy

The small strings nobody specs, which is why generated sites feel unfinished:

- **Empty state**: say what will appear here and how to make it appear. Never "No data."
- **Error**: what went wrong, and what to do. *"That address didn't parse"* beats *"Invalid
  input."* Never blame the user.
- **Loading**: if over ~2s, say what is happening. Skeletons for content, spinners for
  actions.
- **Success**: confirm what happened and what's next.
- **Form labels**: always visible. Placeholder-as-label fails accessibility and disappears
  the moment someone types.
- **Helper text**: pre-empt the error. Password rules go *above* the field, not after
  rejection.

## Scannability

Nobody reads a landing page. They scan it, decide, then read one section.

- **The page must make sense from headings alone.** Read only the H1 and H2s top to bottom —
  that sequence is your real pitch. If it doesn't hold together, rewrite the headings.
- Front-load the meaningful word: *"40ms cold starts"* not *"We're proud to offer 40ms cold
  starts"*.
- One idea per paragraph, 2–4 sentences at web widths.
- Bold sparingly and only on the load-bearing phrase. Bold everywhere is bold nowhere.
- `65–75ch` measure for body copy. Longer and the eye loses the line.

## Voice by variant

| Variant | Voice | Register |
|---|---|---|
| **A / B** — editorial, consumer | Evocative, confident, sensory. Metaphor is allowed. | Can be literary. *"Older than the ground."* |
| **E** — technical product | Specific, unhedged, numbers over adjectives. Metaphor is a liability. | Talks to a skeptical engineer. Humour only on top of precision — PostHog earns it because everything around it is exact. |
| **C / D** — components | Neutral, instructional. | No voice at all. It's a build order. |

## Banned, on top of the anti-slop list

Category killers for web copy specifically: **revolutionary, seamless, cutting-edge,
game-changing, leverage, empower, unlock, robust, best-in-class, next-generation,
world-class, effortless, supercharge, elevate, transform your**, and any sentence beginning
*"In today's fast-paced…"*.

Also drop: **"We believe…"** (nobody asked), **"Simply…"** (it isn't), and **"Just…"**
(minimises the user's difficulty).

## Checklist

- [ ] `anti-ai-slop-writing` loaded before any copy was written
- [ ] Headline 3–9 words, one idea, passes the swap test
- [ ] Subhead 12–28 words, carries the mechanism, doesn't restate the headline
- [ ] CTAs 2–4 words, verb-first, primary and secondary differ in commitment
- [ ] Every feature block has claim → mechanism → proof, all three
- [ ] Testimonials attributed with name, role, company, and contain a specific outcome
- [ ] Empty, error, loading, and success microcopy all written
- [ ] The H1 + H2 sequence alone reads as a coherent pitch
- [ ] Zero banned words; no sentence survives the swap test
