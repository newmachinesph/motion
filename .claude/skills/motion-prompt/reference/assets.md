# Asset pipeline — where every asset actually comes from

A spec that says "hero image" has specified nothing. Every asset in a prompt must name its
**origin**, and the origin is not a matter of taste — it follows one rule.

## The rule

> **Author what must be true. Source what belongs to someone else. Generate what is only yours.**

| Route | Asset types | Why |
|---|---|---|
| **AUTHOR** (write code) | diagrams, abstracted UI, charts, technical grid, wordmarks you own, loading states | Must be labelled, themed for light/dark, translatable, accessible, and *truthful*. A generated PNG of a diagram cannot be any of those. |
| **SOURCE** (download) | third-party brand logos, customer logos, integration marks, framework icons | They represent a real entity. A generated approximation is both visibly wrong and a trademark problem. |
| **GENERATE** (Codex bridge) | hero art, textures, backgrounds, abstract illustration, frame sequences, OG images, spot art | Original, non-factual, yours. Nothing depends on it being accurate to a real thing. |

Getting this wrong is the most common asset failure: teams generate logos (wrong and
illegal), generate diagrams (unlabelled, untranslatable, inaccessible), and hand-author
textures (slow and worse). Route each asset once, at spec time.

---

## PLACEHOLDER — the fourth route, and the one that unblocks everything

**A page with no images is not a design.** `density.md` measures the cost: 43 images on the
reference, 0 on our last build. Waiting for real photography is how a build ships as a
specimen sheet.

> **Fill every image slot with a free placeholder from the start. The layout, the locked
> box, the overlay, the hover state and the blur-up are the deliverable — the subject of the
> photograph is not.**

A placeholder does not need to depict the topic. It needs to be the right **aspect, weight,
tonal range and count** so the composition is real.

### Verified sources

| Source | URL pattern | Status |
|---|---|---|
| **Picsum** | `https://picsum.photos/seed/<seed>/1200/800` | ✅ 200, JPEG. **Default.** `seed` makes it deterministic — same build, same picture |
| **Pravatar** | `https://i.pravatar.cc/160?img=12` | ✅ 200. People slots, `img=1..70` |
| **Unsplash direct** | `https://images.unsplash.com/photo-<id>?auto=format&fit=crop&w=1600&q=80` | ✅ when you have a real photo ID and have looked at it |
| ~~`source.unsplash.com/random`~~ | — | ❌ **Dead — returns 503.** Was the common default. Do not specify it. |

Use `?grayscale` or `?blur=2` on Picsum when the art direction wants the photography
subordinate to type. Seed from the item's own id (`/seed/case-04/`) so the page is stable
across rebuilds and diffs stay clean.

### The one hard rule

**A placeholder may never carry a factual claim.** The image is arbitrary, so anything
asserting what it shows is false.

| | |
|---|---|
| ❌ `alt="PR106 vermilion specimen, 22µm"` | Claims a fact about an arbitrary photo |
| ❌ caption "The mill floor, four wheels" | Same |
| ✅ `alt=""` + `role="presentation"` | Decorative — correct for most placeholder slots |
| ✅ caption "Fig. 04" / "Northside" | Nominal label, asserts nothing |

This is not a style preference. Seven images were verified `HTTP 206` on the last build and
six of them showed something unrelated to their caption — a crayon table labelled as a
pigment specimen, a Renaissance painting labelled as malachite. **A status code proves a
file exists; it proves nothing about what is in it.** Either look at the image, or say
nothing about it.

Three slots are **never** placeholders, because they are claims by nature:
**brand and customer logos** (source them), **testimonial faces attached to a named
person**, and **charts or diagrams** (author them).

---

## SOURCE — third-party logos

**Never generate a brand logo.** Not as an image, not as hand-written SVG paths, not "close
enough". Every engineer recognises their own stack's logos and a wrong one destroys the
credibility the logo wall exists to build.

### Where to get them

| Source | Coverage | License | Use for |
|---|---|---|---|
| [**svgl**](https://github.com/pheralb/svgl) | ~600 popular brands | MIT | **Default.** Full-color, well-maintained, CDN + API |
| [**Simple Icons**](https://simpleicons.org) | 3,000+ | CC0 | Monochrome rows — a footer of 20 social/tech marks at one size, smallest bundle |
| [**theSVG**](https://thesvg.org) | 6,400+ | free | Widest coverage, and the only library currently handling **dark-mode variants at scale** |
| **Official press / brand kit** | 1 | per brand | **Customer logos — always.** Also the only correct source for a partner's exact lockup |

### Domain → logo APIs

Clearbit's free Logo API — the old default — **was sunset on 8 December 2025**. Do not
specify it. Current successors, in the order Clearbit itself pointed at:

- **Logo.dev** — Clearbit's officially recommended successor, same URL-in/image-out shape
- **Logo Link** — closest drop-in to the old Clearbit pattern; public client ID, safe in
  frontend code
- **LogoKit** — widest stock coverage

Use these only for dynamic, long-tail logos (a customer directory, an integrations page
with hundreds of entries). For a fixed hero logo wall of 8–12, **commit the SVGs to the
repo** — no runtime dependency, no layout shift, no third party watching your traffic.

### Rules for the spec

- Name the **exact source and file** per logo, not "get the logos"
- Specify the **dark-theme treatment**: most brand SVGs are dark-on-light and vanish on a
  dark background. Either source a light variant, or state the treatment
  (`filter: brightness(0) invert(1)` for monochrome walls) — and say which
- Normalise on **optical size, not bounding box**. Logos have wildly different aspect
  ratios; setting them all to `height: 32px` makes wide wordmarks dominate. Specify a
  per-logo scale factor or a fixed optical area
- **Legal**: naming a framework or integration you support is nominative fair use. A
  **customer** logo needs their permission — and marketing teams do get asked to remove
  them. The spec should say `"customer logos: written permission on file"` so nobody
  assumes otherwise
- `alt` text is the company name. `aria-hidden` on a logo wall is wrong — it is a claim
  about who uses the product

---

## GENERATE — the Codex bridge

Original imagery goes through Codex CLI, which reaches GPT Image 2. This is the pattern
[scroll-world](https://github.com/oso95/scroll-world) uses for its diorama stills.

### Verified about the local install

```
codex-cli 0.147.0-alpha.1.2   at ~/.local/bin/codex
codex exec [OPTIONS] [PROMPT]     run non-interactively
  -i, --image <FILE>...           attach image(s) to the prompt  ← INPUT, not output
  -m, --model <MODEL>
```

**There is no output-image flag.** The bridge is *agent delegation*, not a render command:
you hand Codex a prompt describing the image and the destination path, and Codex uses its
own image tooling to write the file.

```bash
codex exec "Generate a 1920x1080 image and save it to ./public/hero/plate-01.png.
Subject: <full art direction>. Style: <...>. No text, no logos, no watermarks."
```

> **Unverified:** I confirmed the CLI, the version, and the flags above by running them. I
> have **not** executed an image generation end-to-end, so the exact prompt shape Codex
> needs to reliably write a file is untested. Run one before depending on it.

### Rules for generated assets

- **Never generate**: logos, real people, real products, screenshots of real UI, maps of
  real places, charts of real data, anything with legible text. Image models produce
  broken text and plausible-but-false detail — both are worse than nothing on a technical
  site
- **Prompt for a plate, not a picture.** Specify aspect ratio, subject, lighting direction,
  color constraint (name the palette hexes), negative space where copy will sit, and an
  explicit "no text, no logos, no watermark"
- **Generate at 2×** the largest rendered size, then downscale. Upscaling a generated
  image reveals the artefacts
- Post-process to the palette. Raw model output rarely matches a locked brand palette —
  state the grade (`saturate(0.55) contrast(1.08)`, or a duotone map to two brand tokens)
- Commit generated assets to the repo. Never generate at build time or runtime

### Frame sequences

For the scroll-scrub mechanic (`mechanics.md` #0), the sequence is generated as **video,
then decomposed**:

```bash
ffmpeg -i source.mp4 -vf "fps=24,scale=1920:-1" -q:v 3 frames/frame_%04d.webp
```

Target 100–150 frames, ≤4.5MB total. [scroll-world](https://github.com/oso95/scroll-world)
automates the whole path — GPT Image 2 stills → Seedance/Kling camera clips → connector
clips frame-locked to neighbours → a vanilla-JS scrub engine. Install it as a plugin rather
than rebuilding it:

```
/plugin marketplace add oso95/scroll-world
/plugin install scroll-world@scroll-world
```

Use it when the brief wants a continuous camera flight through scenes (the Apple product
page move). It is video-based, so it costs bandwidth — budget it against the 4.5MB frame
sequence, not against a CSS animation.

---

## RENDER — HTML motion graphics to video

[**HyperFrames**](https://hyperframes.video/) renders an HTML composition to video via
headless Chromium + FFmpeg. This is the bridge from "we can animate it in the browser" to
"we can put it in a video edit, an ad, or an OG preview".

```bash
npx hyperframes lint                                   # validate structure
npx hyperframes check                                  # browser check: runtime, layout, motion, contrast
npx hyperframes render --output final.mp4              # → renders/ if --output omitted

npx hyperframes render --format webm --output overlay.webm   # transparent overlay
npx hyperframes render --quality draft --output review.mp4   # fast iteration
npx hyperframes render --quality high  --output master.mp4
npx hyperframes render --fps 60 --output final-60fps.mp4
npx hyperframes render --composition compositions/intro.html --output intro.mp4
npx hyperframes render --docker --output final.mp4     # reproducible env
```

| Format | Alpha | Use for |
|---|---|---|
| MP4 | no | sharing, publishing, delivery |
| MOV (ProRes 4444) | **yes** | editorial handoff, Premiere/Resolve |
| WebM | **yes** | transparent web overlays |
| GIF | limited | short previews |
| PNG sequence | yes | frame-by-frame compositing handoff |

- Transparency: **leave the composition background unpainted**. MP4 encodes opaque pixels
  only, so an alpha deliverable must be MOV or WebM
- FPS comes from the composition's `data-fps` attribute, defaulting to 30
- `--quality standard` is the default and correct for finished work
- On failure: `npx hyperframes doctor`, then `lint`, then `check` — and **keep the first
  error**, not the final "render failed"

The [full workflow](https://www.thecreativehaven.com/insights/how-to-create-motion-graphics-amp-animation-with-claude-code-full-workflow)
is: brief with brand deck → proof each graphic as a single HTML file at production
dimensions → animate and give notes on easing, timing, holds → add HyperFrames metadata →
render → drop into the edit with the alpha channel intact.

**Why this matters for our prompts:** an animated SVG diagram authored for the site is the
*same artifact* that HyperFrames renders to a ProRes Alpha overlay for a launch video.
Specify diagrams as HTML/SVG compositions and the marketing video comes free. Specify them
as PNGs and it does not.

---

## Everything else

| Asset | Route | Spec |
|---|---|---|
| **Icons** | source | `lucide-react`. Never mix icon families — it reads as unfinished |
| **Fonts** | source, **self-host** | Variable `.woff2` in `/fonts`. Never link Google's CDN: privacy, a third-party TTFB in the critical path, and it breaks under a strict CSP |
| **Product screenshots** | author | Build abstracted UI in DOM. A real screenshot dates instantly, cannot be themed, and cannot be translated |
| **Photography** | **placeholder** | `picsum.photos/seed/<id>/<w>/<h>` for every slot, from the first commit. Locked box, gradient overlay, blur-up, hover — all real. `alt=""`, no factual caption. Swap for commissioned work later; the layout does not change. Never `source.unsplash.com` (dead, 503) |
| **People / avatars** | placeholder | `i.pravatar.cc/160?img=<1-70>`. If the person is **named**, it is a claim — leave the slot as initials on a colour field instead |
| **Charts** | author | Real-shaped data with axis labels and units |
| **OG / social card** | generate or author | `1200×630`. Author it as HTML if it needs live data; generate a plate if it is static |
| **Favicon** | author | SVG favicon + `apple-touch-icon` 180×180 |

## Manifest requirements

Every asset entry in the spec's manifest carries four things:

1. **Route** — author / source / generate
2. **Exact location** — the committed path, the source URL, or the generation prompt
3. **Spec it must meet** — dimensions, format, aspect, weight budget
4. **Dark-theme variant** — or an explicit "same asset works in both"

A manifest line reading `hero image — supply your own` fails all four. It should read:

```
/hero/plate-01.webp — GENERATE via codex bridge, 3840×2160 → served at 1920w.
  Prompt: <full art direction>. Grade: saturate(0.55) contrast(1.08).
  Negative space in the left third for the headline. Budget ≤ 280KB.
  Dark theme: same plate, overlay oklch(14% 0.012 60 / 0.55).
```
