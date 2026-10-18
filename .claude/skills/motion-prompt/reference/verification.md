# Verification — making a spec checkable

Two sites have now been built from specs this skill produced. **Every defect in both was
found by building. None was found by reading the spec.** That is the single strongest signal
in the whole calibration set, and it is what this file exists to fix.

The defects, for reference:

| Defect | Why reading missed it |
|---|---|
| `animation-range: entry 15% cover 35%` left content permanently invisible | The technique was right, the range values wrong. Nothing in prose distinguishes them. |
| Tailwind's preflight shipped a `cubic-bezier` token into a brand that bans easing | It was never authored — it arrived as a framework default. |
| An element the spec called "deliberately the loudest" was specified at 11px | The prose and the values contradicted each other, and both read fine alone. |
| "Astro 5" was two majors stale by build time | A version looks like a fact, not a decision that expires. |
| "Exactly one Client Component" contradicted two required stateful features | The two claims sat in different sections. |

None is a writing failure. All five are **claims nobody could test**.

---

## The rule

> Every spec ends with checks a builder can run. If a requirement cannot be checked, either
> make it checkable or delete it — an unverifiable requirement is decoration.

Put them in a final `## Acceptance checks` section, before the execution mandate. Six to ten
lines. They are for the builder, not for you.

## What a good check looks like

Concrete, runnable, and failing loudly when the spec was ignored.

```
## Acceptance checks

Run these before calling the build done. Each one exists because a spec like this has
been got wrong before.

1. `grep -c "cubic-bezier" dist/**/*.css` returns 0.
   Framework preflight ships an easing token; overriding the authored value is not enough.
2. `grep -oE "border-radius:[^;]*" dist/**/*.css | grep -v "0"` returns nothing.
3. Screenshot the primary diagram at scroll progress 1.0. Every node label and both state
   captions must be legible with all motion disabled.
4. Load the page with JS disabled. The hero headline, lead, both CTAs, and the diagram's
   end state must all render.
5. Toggle to the light theme and re-check contrast for the three state colours against
   `--bg`. The amber fails at its dark value and must be darkened.
6. Scroll to the bottom, then to the top. No section may be left below full opacity.
7. `wc -w` on the built copy: the hero lead is 40–60 words.
8. Tab through the page. Every interactive element shows a visible focus ring, and the
   diagram's nodes are reachable in order.
```

Notice what these have in common: **a machine or a five-second human action decides**, not a
judgement call.

## Check categories worth including

- **Greps against the built output.** Banned properties, banned words, required tokens.
  Catches framework defaults, which authoring alone never does.
- **The static-screenshot test.** Every diagram, at its end state, with motion off. If it
  stops explaining, the motion was carrying meaning the layout should encode.
- **The no-JS test.** What survives when the island fails to hydrate.
- **Contrast pairs, named explicitly.** Not "check contrast" — *"`--text-2` on `--bg` in
  both themes; `--tombstoned` on light `--bg` is the one that fails."*
- **The scroll round-trip.** Down then up. Catches reveal animations stuck mid-range.
- **A count.** Word count, section count, node count — anything the spec asserted numerically.
- **The keyboard pass.** Tab order and focus visibility.

## Three claim types that need special handling

### 1. Comparative claims — "the loudest", "the focal point", "the climax"

Emphasis is relative, so it cannot be satisfied by a value in isolation. **State the
comparison.**

- Wrong: *"the caption is deliberately the loudest moment on the page"* (specified at 11px)
- Right: *"the caption is `1.75rem`, `wght 600`, in `--unreachable`, centred directly beneath
  the diagram. It must be the largest non-heading text in that viewport — larger than any
  node label and larger than the summary bar."*

Then the check: *"screenshot the diagram section; the caption is visibly the largest text
that is not a heading."*

### 2. Ambiguous defaults — especially themes

**"Default" is a banned word for themes.** It supports two incompatible builds.

- Wrong: *"Dark (default)"*
- Right, pick one and say it:
  - *"Dark always. `prefers-color-scheme` is ignored; only the toggle changes it."*
  - *"Dark unless `prefers-color-scheme: light`, then light. The toggle overrides both and
    persists to `localStorage`."*

Same discipline for any "default": sort order, tab, currency, locale, expanded/collapsed.

### 3. Derived counts — "exactly one Client Component"

A count asserted in one section can contradict requirements in another. **Specify the
property, let the count follow.**

- Wrong: *"Exactly one Client Component — the diagram."* (while also requiring a theme
  toggle and a copy button, both of which need state)
- Right: *"Client Components are limited to surfaces that genuinely need state: the diagram's
  inspector, the theme toggle, and the copy button. Everything else is a Server Component."*

## Framework defaults — check before writing, not after

Three of the five defects came from the framework rather than the author. Add to §2 of any
spec:

- **Do not pin a major version.** *"Current Next.js, App Router, static-first"* beats
  *"Next.js 16"*, which is stale the moment a major ships. Pin only when a specific version
  is genuinely required, and say why.
- **Read the framework's own agent instructions first.** Next.js writes an `AGENTS.md`
  telling agents its conventions have changed. Astro ships a `CLAUDE.md`. Read them before
  writing, not after the build fails.
- **Audit the reset for tokens that violate a brand rule.** Tailwind's preflight declares
  `--default-transition-timing-function: cubic-bezier(...)`. For a brand banning easing, the
  authored value is not enough — the token itself must be overridden, or the first utility
  class anyone adds reintroduces it.

**The general form: "no X anywhere" cannot be satisfied by authoring alone when the framework
ships X as a default.** Any absolute prohibition in a spec needs a corresponding override of
the framework default, plus a grep proving it.

## What this does not do

It does not verify taste, and it does not replace looking at the thing. It catches the class
of defect that is objectively wrong and invisible in prose — which, on the evidence of two
builds, is most of them.
