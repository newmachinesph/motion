# Verify

Two gates. The numbers gate catches structure; the looking gate catches everything else. **Both
are required** — a build once passed every count while its hero rendered with no words on screen.

---

## Gate 1 — the rendered DOM

**Never grep `dist/index.html` or `src/`.** A client-rendered app ships an empty root: the file
returns **0 images on a page that has 39**, and grepping source counts imports and comments.
Serve the build, scroll the whole page so lazy media and reveals resolve, then evaluate.

```js
// node audit.mjs — playwright
import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:4321/", { waitUntil: "networkidle" });
await p.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 600) {
    window.scrollTo(0, y); await new Promise(r => setTimeout(r, 70));
  }
});
await p.waitForTimeout(2500);

console.log(await p.evaluate(() => {
  const $$ = s => Array.from(document.querySelectorAll(s));
  const imgs = $$("img");
  const css = Array.from(document.styleSheets)
    .flatMap(s => { try { return Array.from(s.cssRules).map(r => r.cssText) } catch { return [] } }).join("\n");
  return {
    blocks: $$("section").length,
    imgs: imgs.length,
    icons: $$("svg").length,
    reveals: $$(".reveal").length,
    missingDims: imgs.filter(i => !i.getAttribute("width") || !i.getAttribute("height")).length,
    noLockedBox: imgs.filter(i => getComputedStyle(i.parentElement).aspectRatio === "auto").length,
    notLoaded: imgs.filter(i => i.dataset.loaded !== "true").length,
    altsNonEmpty: imgs.map(i => i.alt).filter(a => a && a.trim()),
    invisible: $$("main *").filter(e => getComputedStyle(e).opacity === "0" && e.textContent.trim().length > 20).length,
    words: document.body.innerText.trim().split(/\s+/).length,
    families: [...new Set($$("main *").map(e => getComputedStyle(e).fontFamily.split(",")[0].replace(/"/g, "")))],
    breakpoints: [...new Set(Array.from(document.styleSheets)
      .flatMap(s => { try { return Array.from(s.cssRules) } catch { return [] } })
      .filter(r => r.media).map(r => r.conditionText))],
    smoothScroll: (css.match(/scroll-behavior:\s*smooth/g) || []).length,
    lenis: document.documentElement.className,
    h1: $$("h1").length,
    tapTooSmall: $$("a.btn, button, a[href^='tel']")
      .filter(e => { const r = e.getBoundingClientRect(); return r.height < 44 || r.width < 44 }).length,
  };
}));
```

### Checks

| # | Check | Pass |
|---|---|---|
| 1 | blocks / imgs / reveals / icons | at or above the archetype floor in `systems.md` §5 |
| 2 | `missingDims`, `noLockedBox`, `notLoaded` | all **0** |
| 3 | `altsNonEmpty` | empty, or every entry describes an image you looked at |
| 4 | `invisible` | **0** — proves reveals failed open |
| 5 | `words` | at or above the floor |
| 6 | `families` | ≤3 |
| 7 | `breakpoints` | exactly two boundaries |
| 8 | `smoothScroll` | **0** when Lenis is used |
| 9 | `h1` | exactly 1 |
| 10 | `tapTooSmall` | **0** |
| 11 | At 390: `body.scrollWidth <= innerWidth`, no element with `scrollWidth > clientWidth` | |
| 12 | Under `prefers-reduced-motion`: `html` has no `lenis` class | |

### Column alignment, when the design has a figure column

Measure **each figure's** edge, not the container's:

```js
const col = $$(".prow__figs").map(el => Math.round(el.children[0].getBoundingClientRect().right));
new Set(col).size === 1   // must be 1
```
A flex row right-aligned as a group passes a container check and still has `$149` and `$1,780`
ending at different x. That is the failure the check exists for.

### Contrast

Verify the actual pairs against the actual grounds, both themes. Do not assume a ramp is safe:
a neutral one step lighter than the muted floor measured **3.91:1** and failed AA, while
looking entirely fine.

---

## Gate 2 — look at it

Screenshot the hero, two mid blocks, the footer, and **390px**. Open them. Every defect below
came from this gate and none from the numbers:

- a hero with a full-bleed plate above the headline and **no words in the first viewport**
- a nav whose phone number and CTA **wrapped over three lines** at 390px
- tap targets at 40px after a fix that "looked right"
- a reduce-motion toggle rendering as a 20px control
- a `camp` icon that read as a **warning triangle**
- six of seven images depicting something unrelated to their captions

**Capturing a Lenis page:** `window.scrollTo()` is hijacked, so a `scrollTo(0,0)` before a shot
silently lands elsewhere — one capture labelled "hero" was section 4. Drive with
`page.mouse.wheel()`, re-navigate between shots, and assert the resulting `scrollY`.

---

## Gate 3 — the spec itself, before any build

```
grep -n "e\.g\.\|\[brand\]\|your text here\|TODO\|TBD\|Lorem" PROMPT.md
wc -w PROMPT.md
```

`e.g.` is the tell that one example was written where six were required. On the last spec it
caught exactly that — one service body of six, one review of four — and fixing it added 300
words. **Report the `wc -w` number the command returned**, never an estimate: every
self-reported count that was later checked was wrong, by 12% to 46%.

---

## Reporting

State what passed, what failed, and what was not checked. A partial pass is a result. Never
report a check as passing when what was actually measured was something adjacent — five
separate times in this project a check passed by measuring the wrong dimension:

1. a breakpoint regex that passed by **finding nothing**
2. word counts **self-reported** instead of counted
3. a grep against **source** instead of rendered copy
4. **HTTP status** standing in for image content
5. a **container's** right edge standing in for each figure's
