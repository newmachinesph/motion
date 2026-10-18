# Trends — with verdicts, not a list

A trend list that praises all twenty items takes a position on none of them. Every entry here
carries a ruling: **adopt · watch · skip**. When a new trend appears that is not listed, run the
three questions in §4 and it will sort itself.

---

## 1 · Adopt

| Trend | What it actually means in a spec |
|---|---|
| **Agent-readable structure** | The next visitor may be an AI assistant reading on someone's behalf. Correct heading outline, real text never baked into images, schema for services/prices/locations/reviews, and the plain answers — what you do, where, what it costs, how to contact — stated as text. A page an agent can parse is a page a tired human on a phone can parse. |
| **Type-led layout** | One oversized characterful display face, wide size contrast to body, little decoration competing with the words. Loads fast, scales anywhere, cannot be mistaken for a template. |
| **Variable fonts** | One file covers every weight and width. Cheaper than four static files and the reason type-led is now affordable. |
| **Performance budget** | Total page weight, AVIF/WebP, font count, and what runs before first tap. INP punishes exactly what maximalist trend lists celebrate. A designer who cannot state the weight of their homepage is a decorator. |
| **Accessibility as a requirement** | Contrast checked not eyeballed, visible keyboard focus, real tap targets, labels not placeholders, alt text written by someone who saw the image, motion behind a reduced-motion check. It has legal force now, and it is the same discipline agents need. |
| **Dark mode done properly** | Honour the system preference automatically; design the dark palette deliberately rather than inverting the light one. Accent chroma drops on dark or it vibrates. |
| **Motion that explains** | A panel that arrives from where you tapped. A number that counts up on entry. Section transitions that fade rather than flash. Every animation answers "what does this help the reader understand?" or it goes. |
| **View Transitions API** | Native, cheap, replaces a heavy JS library for the one thing most sites used one for. |
| **Speculation rules prefetch** | The invisible half of "predictive UX". Highest return per line of code on this list. |
| **Bento grids — carefully** | One screen holding six messages without reading as a spreadsheet. Fails when tiles get filled because the grid has holes. Every tile earns its spot. |
| **3D — for things you rotate** | A configurator where a shopper spins the actual product pays rent. A polygonal blob orbiting the headline charges rent, in megabytes and battery. |
| **Real-time that builds trust** | Live stock, delivery estimates, the price that checkout will actually charge. |
| **AI in the workflow** | Generation handles scaffolding; the saved hours go to message, hierarchy and what to cut. The floor rose and the ceiling did not move — competent-looking is now worth nothing. |

## 2 · Watch

| Trend | The condition |
|---|---|
| **Glass surfaces** | Genuinely premium, and a contrast trap. Decorative glass yes; **load-bearing glass careful**. Test every panel against the lightest and darkest content that can sit behind it, and keep body text on solid ground. |
| **Conversational / ask-box search** | Worth it on a 400-product store or a documentation set. On a five-page brochure site it is a costume. |
| **Personalisation** | The version that ships is boring: remember a returning visitor, resume a half-finished form, show the local number to a local visitor. Do the boring version. |
| **Scrollytelling** | One flagship page for one complex product, a case study, an annual report — good. As the site-wide default it is slow to build, heavy to load, and exhausting by page three. |
| **Kinetic typography** | A little goes a long way. Type that never sits still is a gimmick by week two. |
| **Grain, texture, hand-drawn marks** | Reads as proof a human was here, *because* AI output is polished by default. Used as costume by a brand with nothing behind it, visitors smell it immediately. |
| **Maximalism / neo-brutalism** | Real directions for the right brand. Both fail hard on accessibility if the contrast and focus work is skipped. |

## 3 · Skip

| Trend | Why |
|---|---|
| **Emotion-sensing / biometric UI** | Privacy liability wearing a futurism badge. Nobody turns a camera on for a brochure site. |
| **VR / metaverse sites** | Nobody straps on a headset to read a services page. |
| **Scrolljacking** | The visitor owns their scroll wheel. |
| **Auto-opening chat widgets** | The fastest way to simulate a pushy salesman. |
| **Heavy hero video** | A 12MB hero purrs on agency fibre and spins on a bus. |
| **Carousels in the hero** | Slide two has been the least-read content on the internet for a decade. |
| **Infinite scroll on content sites** | Fine for feeds, hostile anywhere someone is trying to finish. |
| **Voice interfaces on websites** | People talk to their assistant, not to your homepage. Build the agent-readable structure instead. |
| **Custom cursors** | Friction cosplaying as delight. Narrow carve-out for studio and portfolio sites whose product is flair. |
| **Gamification on a business site** | Progress bars on long forms yes. Points, badges and streaks no. |
| **Preloaders with a percentage** | On a five-page site, in 2027. |
| **Raw AI illustration** | Six-fingered hands tell every visitor you did not look. |
| **Four-click cookie rejection** | A dark pattern, increasingly regulated, always remembered. |
| **Shape-shifting "predictive" layouts** | Interfaces that rearrange while someone reads do not feel smart. They feel haunted. |

## 4 · The three questions — for any trend not listed above

```
1  Does it help a first-time visitor understand and ACT faster?
   Not feel impressed. Book, buy, call, read.

2  What does it cost the slowest phone in the audience?
   Every trend has a price in kilobytes and script time, paid by the
   worst-connected visitor — who is often the next customer.

3  Would it survive the page being read by a machine?
   Video-only messaging, text locked in images, meaning carried entirely
   by animation — all of it evaporates in an agent's summary.
```

If a trend makes the page prettier to humans and blanker to machines, it now costs twice.

## 5 · What this means for every spec

Four requirements, added to the density and system floors, non-negotiable:

**Agent-readable.** One `h1`, a correct heading outline, every claim as real text. `JSON-LD`
for the organisation, services, prices, area served and aggregate rating. An `llms.txt` listing
the page map. The spec states the plain answers — what, where, how much, how to contact — as
copy, not as an image.

**Performance budget, stated as numbers.** Total transferred weight, image format, font file
count, and the third-party script list (ideally empty). If a mechanic cannot fit the budget, it
is cut at spec time rather than discovered at launch.

**Accessibility as acceptance criteria**, not a paragraph of intent. Contrast pairs listed with
measured ratios, focus rings specified as values, tap targets ≥48px, labels above inputs,
reduced-motion path written as a rest state.

**Every mechanic carries its verdict.** If the spec calls for glass, scrollytelling or 3D, it
names the condition from §2 that makes it the right call here. Anything in §3 requires the brief
to have asked for it explicitly, and the spec says so.

## 6 · Acceptance

1. The spec includes a performance budget with numbers, and a JSON-LD block.
2. No §3 trend is present unless the brief demanded it and the spec records that.
3. Any §2 trend present names the condition that justifies it.
4. Contrast pairs are listed with ratios; focus, tap targets and reduced motion are values.
5. Every claim needed to answer "what, where, how much, how to contact" exists as real text.
