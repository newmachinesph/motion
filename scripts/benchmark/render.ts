import type { BenchmarkFixture } from './fixtures'

export const marks: Record<string, string> = {
  northline: '<path d="M6 8v32M42 8v32M6 17h23v14h13"/><path d="M24 13l5 4-5 4"/>',
  orbito: '<circle cx="24" cy="24" r="16"/><path d="M8 24c7-9 21-9 32 0M24 8v10l6 6-6 6"/><path d="M34 10l4 4"/>',
  forge: '<path d="M8 10h32v8H18v8h17v8H18v8H8z"/><path d="M35 26h5v16h-5"/>',
  mara: '<path d="M6 40V9l18 22L42 9v31M6 9l18 12L42 9"/><path d="M21 28h6"/>',
  pelagic: '<path d="M5 13h38M5 24h27M16 35h27"/><path d="M32 20l8 4-8 4"/>',
  kiteframe: '<path d="M18 7H8v34h10M30 7h10v34H30"/><path d="M14 16h12l8 8-8 8H14"/><circle cx="14" cy="16" r="2" fill="currentColor" stroke="none"/>',
  relayboard: '<path d="M7 10v28M41 10v28M7 15c13 0 21 7 34 18M7 33c13 0 21-7 34-18"/><path d="M23 18v12"/>',
  afterimage: '<path d="M7 11h24v28H7z"/><path d="M17 7h24v28H17" opacity=".48"/><path d="M7 25h34"/>',
  aster: '<path d="M8 9h27v27H8zM29 30l11 10"/><path d="M8 31h9v-8h9v-8h9"/>',
  secondbell: '<path d="M6 15h24v18H6zM30 20h12v18H18v-5"/><path d="M11 10h14M23 38h14"/>',
}

export const logoSvg = (fixture: BenchmarkFixture, title = true) => `<svg class="brand-mark" viewBox="0 0 48 48" role="img" aria-label="${fixture.project.businessName} mark" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="square" stroke-linejoin="miter">${marks[fixture.theme]}</svg>${title ? `<span class="brand-name">${fixture.project.businessName}</span>` : ''}`

export const markDocument = (fixture: BenchmarkFixture) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" aria-labelledby="title" fill="none" stroke="#111" stroke-width="3" stroke-linecap="square" stroke-linejoin="miter"><title id="title">${fixture.project.businessName} mark</title>${marks[fixture.theme]}</svg>`

export const primaryLogoDocument = (fixture: BenchmarkFixture) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 56" role="img" aria-labelledby="title"><title id="title">${fixture.project.businessName}</title><g transform="translate(4 4)" fill="none" stroke="#111" stroke-width="3" stroke-linecap="square" stroke-linejoin="miter">${marks[fixture.theme]}</g><text x="68" y="37" fill="#111" font-family="Arial, sans-serif" font-size="26" font-weight="700" letter-spacing="-0.8">${fixture.project.businessName}</text></svg>`

const image = (fixture: BenchmarkFixture, alt: string, eager = false) => fixture.image
  ? `<img src="assets/images/${fixture.image}" alt="${alt}" width="1536" height="1024" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'}>`
  : ''

const northline = (f: BenchmarkFixture) => `
  <main id="main" class="northline-page">
    <section class="hero hero-northline">
      <div class="hero-copy"><p class="eyebrow">Independent practice / London + remote</p><h1>${f.headline}</h1><p class="lede">${f.lede}</p><a class="cta" href="#case-path">${f.project.primaryAction}<span>↗</span></a></div>
      <div class="case-path" id="case-path" aria-label="Mediation case pathway">
        <div class="case-path-head"><span>Case pathway</span><strong>Four bounded stages</strong></div>
        <ol><li><i>01</i><span>Separate intake<small>Private context and fit</small></span></li><li><i>02</i><span>Shared issue map<small>Decisions, terms, dependencies</small></span></li><li class="active"><i>03</i><span>Working session<small>One room, one agreed agenda</small></span></li><li><i>04</i><span>Decision record<small>Owned by the participants</small></span></li></ol>
        <p>Northline does not decide the outcome. It makes a workable decision possible.</p>
      </div>
    </section>
    <section class="northline-proof"><p>Confidential by design</p><p>Scope agreed before session</p><p>No invented success-rate claims</p></section>
  </main>`

const orbito = (f: BenchmarkFixture) => `
  <main id="main" class="orbito-page">
    <section class="hero hero-orbito">
      <div class="hero-copy"><p class="eyebrow">Calibration trace / SP-204</p><h1>${f.headline}</h1><p class="lede">${f.lede}</p><a class="cta" href="#trace">${f.project.primaryAction}<span>→</span></a></div>
      <div class="trace-panel" id="trace">
        <div class="trace-top"><span>TRACE / SP-204</span><span class="status">Ready for review</span></div>
        <div class="trace-reading"><small>Current reading</small><strong>438.2<sup>nm</sup></strong><span>+0.3 nm from reference</span></div>
        <div class="trace-chain"><div><i>01</i><span>Reading<small>16 Aug · 08:42</small></span></div><div><i>02</i><span>Standard<small>SRM-1931 / valid</small></span></div><div><i>03</i><span>Technician note<small>Temperature corrected</small></span></div><div class="selected"><i>04</i><span>Approval<small>Pending / A. Chen</small></span></div></div>
        <button type="button" class="trace-button" data-reveal="trace-source" aria-expanded="false">Inspect source certificate</button><p class="trace-source" id="trace-source" hidden>SRM-1931 · fictional reference · valid through 31 Oct 2026</p>
      </div>
    </section>
    <section class="orbito-proof"><span>One example, end to end</span><h2>Evidence stays attached to the decision it produced.</h2></section>
  </main>`

const forge = (f: BenchmarkFixture) => `
  <main id="main" class="forge-page">
    <section class="hero hero-forge">
      <div class="forge-title"><p class="eyebrow">Edition 01 / 2026</p><h1>${f.headline}</h1></div>
      <figure class="forge-plate">${image(f, 'Three folded and machined steel desk objects arranged on a workshop surface', true)}<figcaption>Fold tray 01 / blued steel / cork feet</figcaption></figure>
      <div class="forge-buy"><p class="lede">${f.lede}</p><dl><div><dt>Material</dt><dd>2mm blued steel</dd></div><div><dt>Size</dt><dd>280 × 180mm</dd></div><div><dt>Repair</dt><dd>Replaceable feet</dd></div></dl><a class="cta" href="#edition">${f.project.primaryAction}<span>$124</span></a></div>
    </section>
    <section class="forge-index" id="edition"><span>Current objects</span><ol><li><b>01</b> Fold tray <em>Available</em></li><li><b>02</b> Rail stand <em>September</em></li><li><b>03</b> Block weight <em>October</em></li></ol></section>
  </main>`

const mara = (f: BenchmarkFixture) => `
  <main id="main" class="mara-page">
    <section class="hero hero-mara">
      <figure class="mara-stage">${image(f, 'A contemporary performer crossing a sharply defined field of amber stage light', true)}<figcaption>Borrowed Weather / fictional work / 2026</figcaption></figure>
      <div class="mara-copy"><p class="eyebrow">Choreography / light / installation</p><h1>${f.headline}</h1><p class="lede">${f.lede}</p><a class="cta" href="#works">${f.project.primaryAction}<span>↓</span></a></div>
      <div class="mara-folio">MV / 04</div>
    </section>
    <section class="mara-index" id="works"><span>Selected work</span><ol><li><b>Borrowed Weather</b><em>Choreography + light / 2026</em></li><li><b>Third Bell</b><em>Performance / 2024</em></li><li><b>Soft Quarry</b><em>Installation / 2022</em></li></ol></section>
  </main>`

const pelagic = (f: BenchmarkFixture) => `
  <main id="main" class="pelagic-page">
    <header class="issue-head"><span>Issue 07</span><h1>Pelagic Review</h1><span>August 2026 / fictional edition</span></header>
    <section class="hero hero-pelagic">
      <div class="pelagic-lead"><p class="eyebrow">Infrastructure / lead story</p><h2>${f.headline}</h2><p class="lede">${f.lede}</p><div class="byline">By Rowan Vale · 12 min read</div><a class="cta" href="#issue">${f.project.primaryAction}<span>→</span></a></div>
      <figure>${image(f, 'A weathered tidal barrier at low water with maintenance ladders and rusted steel details', true)}<figcaption>Annual inspection, fictional site / image created for this benchmark</figcaption></figure>
      <aside><span>Also in issue 07</span><p>Night shift, outer harbor</p><p>Six details that make a waterfront public</p></aside>
    </section>
    <section class="pelagic-rule" id="issue"><span>REPORTING</span><span>FIELD GUIDES</span><span>PHOTO ESSAYS</span></section>
  </main>`

const kiteframe = (f: BenchmarkFixture) => `
  <main id="main" class="docs-shell">
    <aside class="docs-side"><div class="docs-version">v0.8 / fictional</div><label>Search documentation<input aria-label="Search documentation" placeholder="Search or jump…"></label><nav><a class="active" href="#quickstart">Quickstart</a><a href="#concepts">Core concepts</a><a href="#concepts">Operators</a><a href="#concepts">Provenance</a><a href="#concepts">Reference</a></nav></aside>
    <section class="docs-main" id="quickstart"><p class="eyebrow">Quickstart / 4 minutes</p><h1>${f.headline}</h1><p class="lede">${f.lede}</p><div class="code-pair" id="concepts"><div><span>query.kf <button type="button" data-copy-code aria-live="polite">Copy</button></span><pre><code><b>from</b> orders_a, orders_b\n<b>window</b> 15m\n<b>match</b> order.id\n<b>emit</b> changed(price, status)</code></pre></div><div><span>result / 2 changes</span><pre><code>order_204  price   <i>+4.20</i>\n  ↳ source b:1842\norder_311  status  <i>held</i>\n  ↳ source a:928</code></pre></div></div><a class="cta" href="#concepts">${f.project.primaryAction}<span>→</span></a></section>
    <aside class="docs-toc"><span>On this page</span><a href="#quickstart">Install</a><a href="#quickstart">First query</a><a href="#quickstart">Inspect provenance</a></aside>
  </main>`

const relayboard = (f: BenchmarkFixture) => `
  <main id="main" class="ops-shell">
    <aside class="ops-rail"><a class="ops-brand" href="../index.html" aria-label="${f.project.businessName} benchmark home">${logoSvg(f, false)}</a><button type="button" aria-label="Overview" class="active">OV</button><button type="button" aria-label="Incidents">IN</button><button type="button" aria-label="Crews">CR</button><button type="button" aria-label="Settings">ST</button></aside>
    <section class="ops-main"><header><div><p class="eyebrow">Sunday / 16 Aug / 05:42</p><h1>${f.headline}</h1><p class="ops-purpose">${f.lede}</p></div><a class="cta ops-header-action" href="#queue">${f.project.primaryAction}<span>→</span></a></header><div class="ops-grid" id="queue"><section class="incident-list"><div class="panel-head"><span>Overnight incidents</span><b>5 open</b></div><article class="critical"><i>R4</i><span><b>Signal cabinet moisture</b><small>North branch · affects first release</small></span><time>04:18</time></article><article><i>R2</i><span><b>Points heater current</b><small>East junction · crew assigned</small></span><time>03:52</time></article><article><i>R7</i><span><b>Platform edge lighting</b><small>Civic station · evidence pending</small></span><time>02:36</time></article></section><section class="route-map"><div class="panel-head"><span>Line context</span><b>North branch</b></div><svg viewBox="0 0 600 300" role="img" aria-label="Schematic line map"><path d="M42 225H190L286 130H548"/><path d="M190 225l88 42h270"/><g><circle cx="42" cy="225" r="8"/><circle cx="190" cy="225" r="8"/><circle class="alert" cx="286" cy="130" r="13"/><circle cx="418" cy="130" r="8"/><circle cx="548" cy="130" r="8"/><circle cx="278" cy="267" r="8"/><circle cx="548" cy="267" r="8"/></g></svg><p><strong>R4 blocks release 05:58</strong><span>Owner / Mira O. · evidence 3 of 4</span></p></section></div></section>
    <aside class="ops-inspector"><span>Selected / R4</span><h2>Release condition</h2><p>Cabinet humidity below threshold for two consecutive readings.</p><dl><div><dt>Owner</dt><dd>Mira O.</dd></div><div><dt>Window</dt><dd>05:28–05:48</dd></div><div><dt>Evidence</dt><dd>3 / 4 received</dd></div></dl></aside>
  </main>`

const afterimage = (f: BenchmarkFixture) => `
  <main id="main" class="afterimage-page">
    <section class="hero hero-afterimage">
      <figure>${image(f, 'An immersive light installation in a civic hall with amber planes cutting through haze', true)}</figure>
      <div class="afterimage-date"><b>17</b><span>—</span><b>18</b><small>OCT / 26</small></div>
      <div class="afterimage-copy"><p class="eyebrow">Civic Hall / rooms 1—4</p><h1>${f.headline}</h1><p class="lede">${f.lede}</p><a class="cta" href="#programme">${f.project.primaryAction}<span>+</span></a></div>
      <div class="afterimage-word">AFTER<br>IMAGE</div>
    </section>
    <section class="programme" id="programme"><span>Night one / sequence A</span><ol><li><time>19:10</time><b>Residual Room</b><em>42 min / room 2</em></li><li><time>20:05</time><b>Black Sun Index</b><em>continuous / room 4</em></li><li><time>21:20</time><b>Borrowed Wall</b><em>55 min / room 1</em></li></ol></section>
  </main>`

const aster = (f: BenchmarkFixture) => `
  <main id="main" class="aster-page">
    <section class="hero hero-aster">
      <div class="aster-copy"><p class="eyebrow">Quarry edge / four rooms / fictional place</p><h1>${f.headline}</h1><p class="lede">${f.lede}</p><div class="stay-facts"><span>Autumn stays<small>3 or 6 nights</small></span><span>Arrival<small>Thu / 16:00–18:00</small></span></div><a class="cta" href="#stay">${f.project.primaryAction}<span>→</span></a></div>
      <figure>${image(f, 'A restrained stone and timber guesthouse built into the edge of a granite quarry at late afternoon', true)}<figcaption>South elevation / quarry bench 01</figcaption></figure>
      <svg class="quarry-section" viewBox="0 0 220 130" aria-label="Quarry section diagram"><path d="M5 115h55V88h54V56h48V28h53"/><path d="M5 120h210"/><circle cx="93" cy="88" r="4"/><text x="101" y="84">HOUSE</text></svg>
    </section>
    <section class="aster-note" id="stay"><span>Before you request</span><p>There is no spa, room service or quarry access after weather closure. There is a desk, a field library and a marked dusk route.</p></section>
  </main>`

const secondbell = (f: BenchmarkFixture) => `
  <main id="main" class="secondbell-page">
    <section class="hero hero-secondbell">
      <div class="secondbell-copy"><p class="eyebrow">Neighborhood kitchen fund / fictional programme</p><h1>${f.headline}</h1><p class="lede">${f.lede}</p><a class="cta" href="#shift">${f.project.primaryAction}<span>$86</span></a></div>
      <figure>${image(f, 'Overhead documentary-style view of vegetables, sheet pans and utensils prepared for a community kitchen shift, no identifiable people', true)}<figcaption>One prepared shift / staged benchmark image</figcaption></figure>
      <div class="shift-ledger" id="shift"><span>What one shift funds</span><dl><div><dt>Ingredients</dt><dd>$42</dd></div><div><dt>Paid prep / 4h</dt><dd>$36</dd></div><div><dt>Transport + ledger</dt><dd>$8</dd></div><div class="total"><dt>Total</dt><dd>$86</dd></div></dl></div>
    </section>
    <section class="bell-proof" id="ledger"><p>Every funded shift closes with a public ledger entry: purchases, paid hours, service capacity and remaining balance.</p><a href="#shift">View a sample ledger →</a></section>
  </main>`

const bodies: Record<string, (fixture: BenchmarkFixture) => string> = { northline, orbito, forge, mara, pelagic, kiteframe, relayboard, afterimage, aster, secondbell }

export const renderSite = (fixture: BenchmarkFixture) => `<!doctype html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="${fixture.project.description}"><title>${fixture.project.businessName} — benchmark</title><link rel="icon" href="assets/brand/favicon.svg"><link rel="stylesheet" href="../shared/site.css"></head>
<body class="theme-${fixture.theme}"><a class="skip-link" href="#main">Skip to content</a><nav class="site-nav"><a class="brand" href="../index.html" aria-label="${fixture.project.businessName} benchmark home">${logoSvg(fixture)}</a><div class="nav-meta"><span>${fixture.eyebrow}</span><a href="#main">${fixture.project.primaryAction}</a></div></nav>${bodies[fixture.theme](fixture)}<footer><div>${logoSvg(fixture)}</div><p>${fixture.detail}</p><span>${fixture.sequence} / 10 · prompt-studio benchmark</span></footer><script src="../shared/site.js"></script></body></html>`

export const renderGallery = (fixtures: BenchmarkFixture[]) => `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Prompt Studio — 10-site benchmark</title><link rel="stylesheet" href="shared/gallery.css"></head><body><header><p>Prompt Studio / calibration run 02</p><h1>Ten briefs.<br>Ten identities.</h1><div><span>Rendered at 1440 + 390</span><span>Logo pipeline included</span><span>All content fictional</span></div></header><main>${fixtures.map((f) => `<a class="case case-${f.theme}" href="${f.slug}/"><span>${f.sequence}</span><div class="case-logo">${logoSvg(f)}</div><p>${f.eyebrow}</p><h2>${f.headline}</h2><em>Open case →</em></a>`).join('')}</main><footer><p>The benchmark rejects interchangeable identity, generic card stacks, unbounded motion and mood-only media.</p><div><a href="brand-audit.html">Inspect logo audit →</a><a href="benchmark-report.md">Read calibration report →</a></div></footer></body></html>`

export const renderBrandAudit = (fixtures: BenchmarkFixture[]) => `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Logo audit — Prompt Studio benchmark</title><style>*{box-sizing:border-box}body{margin:0;background:#ecece7;color:#171917;font-family:Arial,sans-serif}header{padding:42px;border-bottom:1px solid #999;display:flex;justify-content:space-between}header h1{margin:0;font-size:48px}header a{color:inherit}main{display:grid;grid-template-columns:1fr 1fr}.logo-case{padding:30px 40px;border-right:1px solid #aaa;border-bottom:1px solid #aaa;min-height:230px}.logo-case:nth-child(even){border-right:0}.logo-case header{padding:0 0 22px;border:0}.logo-case header span{font:11px monospace;text-transform:uppercase}.logo-case header b{font-size:15px}.logo-row{display:grid;grid-template-columns:80px 1fr 120px;align-items:center;gap:30px}.sizes{display:flex;align-items:end;gap:14px}.sizes img:nth-child(1){width:16px;height:16px}.sizes img:nth-child(2){width:24px;height:24px}.sizes img:nth-child(3){width:48px;height:48px}.primary{background:white;padding:22px}.primary img{width:100%;height:44px;object-fit:contain;object-position:left}.reverse{height:88px;background:#171917;display:grid;place-items:center}.reverse img{width:48px;height:48px;filter:invert(1)}@media(max-width:700px){header{padding:24px 18px;display:block}header h1{font-size:36px;margin-bottom:16px}main{grid-template-columns:1fr}.logo-case{border-right:0;padding:26px 18px}.logo-row{grid-template-columns:1fr}.reverse{width:120px}}</style></head><body><header><h1>Identity stress test</h1><a href="index.html">Back to ten sites</a></header><main>${fixtures.map((fixture) => `<section class="logo-case"><header><span>${fixture.sequence} / ${fixture.project.siteType}</span><b>${fixture.project.businessName}</b></header><div class="logo-row"><div class="sizes"><img src="${fixture.slug}/assets/brand/mark.svg" alt="${fixture.project.businessName} mark at 16 pixels"><img src="${fixture.slug}/assets/brand/mark.svg" alt="" aria-hidden="true"><img src="${fixture.slug}/assets/brand/mark.svg" alt="" aria-hidden="true"></div><div class="primary"><img src="${fixture.slug}/assets/brand/logo-primary.svg" alt="${fixture.project.businessName} primary logo"></div><div class="reverse"><img src="${fixture.slug}/assets/brand/mark.svg" alt="${fixture.project.businessName} mark reversed"></div></div></section>`).join('')}</main></body></html>`
