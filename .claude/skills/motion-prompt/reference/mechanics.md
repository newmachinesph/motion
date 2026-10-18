# Signature mechanics catalog

The recurring effects across the corpus, with the exact values that make them land. Pick
**one** per surface, paste its block into §7, and tune to the brand.

Rule of thumb: pick by mood, not by novelty. A payments brand wants clip-path precision,
not a particle butterfly.

Every scroll-driven entry here needs a **choreography table** (`anatomy.md` §6) on top of
its config values. The values say what is possible; the table says what actually happens.

---

## 0. Scroll-scrubbed frame sequence

*Mood: cinematic, narrative, product reveal, anything with a transformation to show. The
highest-impact scroll technique there is, and the one most associated with award-winning
work. Present in the corpus (`demos/Big_Bang_Origin/` ships two 121-frame sequences).*

- **Track**: outer `height: 400–600vh; position: relative`. Inner `position: sticky; top: 0;
  height: 100svh; overflow: clip`.
- **Frames**: 100–150 WebP, `1920×1080`, `q=70–75`, zero-padded names
  (`frame_0001.webp` … `frame_0121.webp`). Total budget ≤ 4.5MB.
- **Preload all of them before the scrub is reachable** — during a preloader, into an
  `HTMLImageElement[]`. Cap at 8 concurrent requests. Call `img.decode()` before counting
  one as loaded, so the first scrub frame never janks.
- **Index**: `index = Math.round(progress * (frameCount - 1))`, progress from one
  `getBoundingClientRect().top` read per rAF tick. Never a raw `scroll` listener.
- **Draw**: inside `requestAnimationFrame`, and **only when `index` changed** since the last
  paint. Size the canvas to `innerWidth * devicePixelRatio`, capped at `2` — do not render
  at `3×` on phones.
- `object-fit: cover` does not apply to canvas content; implement the source-rect math in
  `drawImage` yourself and recompute on resize.
- **Gotcha**: `overflow: clip`, not `hidden` — `hidden` on an ancestor disables `sticky`.
- **Gotcha**: cheaper than WebGL for a fixed camera path, and ships ~400KB lighter than a
  Three.js scene. Reach for 3D only when the camera or lighting must respond to input.
- **Reduced motion**: render one representative frame, collapse the outer track to
  `100svh`, reveal all content immediately.

## 1. Three.js light-crater grid

*Mood: AI, developer tools, infrastructure. The cursor drags a glowing dent through a dark tile field.*

- **Source**: `https://cdn.jsdelivr.net/npm/threejs-components@0.0.16/build/backgrounds/grid1.cdn.min.js`
- **Peer dep**: native ESM `https://cdn.jsdelivr.net/npm/three@0.170.0/+esm`
- **Config**: `type: 'circle'`, `colors: [0x222222, 0x222222]`, `depthScale: 3`
- **Light 1** (global fill): `0xFFFFFF`, intensity `10000`, `positionZ: 50`
- **Light 2** (the crater color): `0x0066FF`, intensity `15000`, `positionZ: -20`
- **Material**: `metalness 0.5`, `roughness 0.5`, `clearcoat 1.0`, `clearcoatRoughness 0.2`
- **Scene**: `scene.background = new THREE.Color('#0A0A0A')`
- **Gotcha**: create the `<canvas>` with `document.createElement('canvas')` inside the
  `useEffect` and destroy it in cleanup — React Strict Mode double-mounts and the script's
  internal cache breaks otherwise.
- **Gotcha**: `/* @vite-ignore */` on the dynamic HTTP import or the build fails.

## 2. Video background with manual fade loop

*Mood: editorial, studio, luxury. Native `loop` shows a visible seam; this hides it.*

- Video: `autoPlay muted playsInline`, **no** `loop` attribute
- `requestAnimationFrame` watches `currentTime` against `duration`
- Fade in `opacity 0→1` over the first `0.5s`; fade out `1→0` over the final `0.5s`
- On `ended`: set `opacity: 0`, wait `100ms`, `currentTime = 0`, `play()`
- Overlay: `absolute inset-0 bg-gradient-to-b from-background via-transparent to-background`
- Positioning when the video sits below a text block: `top: 300px; inset: auto 0 0 0`
- **Gotcha**: iOS refuses autoplay without both `muted` and `playsInline`.

## 3. Liquid glass surface

*Mood: premium SaaS, fintech overlays, floating consultation cards.*

```css
backdrop-filter: blur(40px) saturate(180%);
background: linear-gradient(135deg, rgb(255 255 255 / 0.12), rgb(255 255 255 / 0.02));
border: 1px solid rgb(255 255 255 / 0.12);
box-shadow:
  inset 0 1px 0 rgb(255 255 255 / 0.18),
  0 24px 48px -12px rgb(0 0 0 / 0.45);
```

- Add a diagonal shine: a `::before` at `rotate(35deg)`, white→transparent, `opacity 0.06`
- **Gotcha**: needs something behind it. Glass over flat color reads as a grey box.

## 4. Clipped-corner geometry

*Mood: logistics, motorsport, security. Sharp and industrial, zero rounding.*

```css
clip-path: polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px);
```

- Cut top-right and bottom-left, 10–12px, on **every** button and badge — consistency is the effect
- Pair with `Rubik` or `Chakra Petch`, uppercase, `letter-spacing: -0.04em`
- **Gotcha**: `clip-path` kills `box-shadow`. Use a slightly larger clipped parent as the border.

## 5. Magnetic cursor button

*Mood: agency, portfolio, anything that wants to feel hand-built.*

- On `mousemove` within bounds: `x = (clientX - centerX) / width * 20`, same for `y`
- On `mouseleave`: spring home — `stiffness: 150, damping: 15, mass: 0.1`
- Inner label counter-translates at `0.4×` for parallax depth
- **Gotcha**: disable under `pointer: coarse` — it does nothing but cost frames on touch.

## 6. Scroll-pinned hero

*Mood: aerospace, product reveal, anything with a story beat.*

- Hero is `height: 180vh; overflow: clip` with an inner `position: sticky; top: 0; height: 100vh`
- The next section pulls up with `margin-top: -12vh` and a higher `z-index` to overlap
- Drive the pinned content with `useScroll` + `useTransform`, `offset: ["start start", "end start"]`
- **Gotcha**: `overflow: clip`, not `hidden` — `hidden` on an ancestor disables `sticky`.

## 7. Canvas particle field

*Mood: biotech, data, generative brands.*

- Plain HTML5 canvas 2D — 3D is not worth the bundle here
- 60–300 particles, radius `0.8–2.4px`, velocity `0.15–0.6 px/frame`
- Cursor repulsion: within `120px`, push along the normal by `(120 - dist) / 120 * 3`
- Trails: repaint with `rgba(bg, 0.08)` each frame instead of clearing
- **Gotcha**: scale by `devicePixelRatio` or it is blurry on retina.

## 8. Gradient text on a single line

*The cheapest high-impact move in the corpus. Not a centerpiece on its own — pair it with one above.*

```
bg-gradient-to-r from-primary-400 to-cyan-400 bg-clip-text text-transparent
```

- Apply to **one** line of a multi-line headline, never the whole block
- **Gotcha**: gradient text against a busy background fails contrast. Keep the panel behind it flat.

---

# Layer mechanics

Not centerpieces. These sit *on top of* a mechanic from above and are a large part of what
separates award-winning work from competent work. None appear anywhere in the corpus.

## 9. View Transitions

*For filters, sorts, tab switches, and route changes. Elements morph between states instead
of popping.*

- Wrap the state change: `document.startViewTransition(() => setFilter(next))`
- Give each participating element a unique `view-transition-name` (`lot-003`, not `card`) —
  duplicate names in one snapshot abort the transition silently
- Style the pseudo-elements to control it:
  `::view-transition-old(root) { animation: 240ms ease-out both fade-out; }`
- **Gotcha**: the callback must be synchronous-ish. If your state update is async, await the
  data *first*, then start the transition.
- **Gotcha**: guard it — `if (!document.startViewTransition) { setFilter(next); return }`

## 10. Entry sequence (preloader)

*The first three seconds are part of the design, not a delay to be hidden.*

- Bind the counter to **real** progress — loaded-asset count, not a fake timer. Users can
  tell.
- Exit on a `clip-path` wipe: `inset(0 0 0 0)` → `inset(0 0 100% 0)` over `900ms`,
  `cubic-bezier(0.76, 0, 0.24, 1)`
- **Overlap the exit with the hero's entrance** — start the headline at ~`600ms` into a
  `900ms` wipe. Sequential feels slow; overlapped feels designed.
- Session-gate it: `sessionStorage`, returning visitors get a `200ms` fade instead.
- **Gotcha**: if there is nothing real to preload, do not build one. A preloader that waits
  on nothing is a hostile animation.

## 11. Custom cursor

- Mount only under `(pointer: fine)` **and** `prefers-reduced-motion: no-preference`
- Lerp toward the pointer at `0.15–0.2` per frame. Visible lag is the effect; glued to the
  pointer is pointless.
- Contextual states earn it: default `10px` ring → `72px` filled disc with a label over a
  card → `28px` accent ring over a link. Transition `260ms cubic-bezier(0.16, 1, 0.3, 1)`.
- `mix-blend-mode: difference` makes one cursor legible on every background.
- **Gotcha**: hide the native cursor *only while this is mounted*, and restore on unmount.
  A page that loses its cursor on a touch device is broken.

## 12. Sound design

*Common in Site of the Day winners, absent from every prompt in the corpus.*

- **Default muted, always.** A persistent toggle in the nav, state in `localStorage`.
  Autoplaying audio is disqualifying.
- Budget: 3–5 samples, ≤ 40KB total, WebAudio not `<audio>` tags. A hover tick (~8ms), a
  click, and one event tied to the signature mechanic's climax beat.
- Tie the mechanic's sound to the **choreography table's climax row** so it lands with the
  visual, not near it.
- **Gotcha**: WebAudio needs a user gesture to unlock the context. Unlock on the first
  click, not on load.
- **Gotcha**: mute under `prefers-reduced-motion: reduce` too — that signal often means
  vestibular or sensory sensitivity, not just motion.
