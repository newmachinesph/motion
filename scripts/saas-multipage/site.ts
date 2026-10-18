export interface SaaSPage {
  slug: string
  label: string
  title: string
  description: string
  eyebrow: string
  headline: string
  lede: string
  body: string
  artifact: string
}

const pathIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h12M13 7l5 5-5 5"/></svg>'

const dossier = `
  <div class="change-dossier" data-artifact="revision dossier">
    <div class="dossier-top"><span>CR-284</span><strong>Motor bracket / REV D</strong><em>IN REVIEW</em></div>
    <div class="drawing-field">
      <svg viewBox="0 0 620 330" role="img" aria-label="Annotated motor bracket drawing with a revision path">
        <g class="drawing-geometry"><path d="M72 245V90h130v65h170V82h118v163H72Z"/><circle cx="140" cy="168" r="27"/><circle cx="431" cy="165" r="39"/><path d="M202 155h170M202 202h170M98 110h72M403 106h57"/></g>
        <g class="dimension-lines"><path d="M72 274h418M72 265v18M490 265v18"/><path d="M36 90v155M28 90h18M28 245h18"/><text x="270" y="300">418.0 ± 0.2</text><text x="16" y="184" transform="rotate(-90 16 184)">155.0</text></g>
        <path class="revision-path" d="M102 65C190 28 268 54 285 109s82 90 161 40"/>
        <circle class="revision-node" cx="102" cy="65" r="8"/><circle class="revision-node end" cx="446" cy="149" r="11"/>
      </svg>
      <div class="annotation a-one"><span>01</span> Hole pattern moved +2.4mm</div>
      <div class="annotation a-two"><span>02</span> Supplier tooling affected</div>
    </div>
    <div class="dossier-foot"><span>OWNER / M. CHEN</span><span>SUPPLIER / KOVA-03</span><strong>2 approvals remain</strong></div>
  </div>`

const chainArtifact = `
  <div class="chain-artifact" data-artifact="release chain">
    <div class="chain-rail"><span class="is-done">REQUEST</span><span class="is-done">IMPACT</span><span class="is-live">REVIEW</span><span>RELEASE</span></div>
    <div class="chain-card"><small>ACTIVE DECISION</small><strong>Approve revised mounting tolerance?</strong><p>Drawing, affected parts, supplier acknowledgement and test note stay attached.</p><div><span>ME</span><span>QE</span><span>SC</span><b>2 / 3</b></div></div>
    <div class="chain-meta"><span>Drawing vD</span><span>4 affected parts</span><span>Supplier seen</span></div>
  </div>`

const productArtifact = `
  <div class="product-artifact" data-artifact="product workflow">
    <div class="product-sidebar"><b>RL</b><span class="active"></span><span></span><span></span><span></span></div>
    <div class="product-main">
      <div class="product-bar"><span>CHANGE / CR-284</span><em>REVIEW</em></div>
      <div class="product-columns">
        <div class="product-list"><small>IMPACT REGISTER</small><button class="selected">Motor bracket <span>REV D</span></button><button>Cable guide <span>CHECK</span></button><button>Pack drawing <span>CLEAR</span></button><button>Supplier tool <span>RISK</span></button></div>
        <div class="product-detail"><small>CHANGE TRACE</small><h3>Mounting tolerance revised</h3><p>Source drawing D-1042, note 06</p><div class="trace-line"><i></i><span>Request opened</span><time>08:42</time></div><div class="trace-line active"><i></i><span>Supplier impact attached</span><time>10:18</time></div><div class="trace-line"><i></i><span>Quality review pending</span><time>—</time></div></div>
      </div>
    </div>
  </div>`

const pricingArtifact = `
  <div class="pricing-artifact" data-artifact="pricing estimator">
    <span>ESTIMATED ACTIVE PROGRAMMES</span><strong id="program-count">12</strong>
    <input id="program-slider" type="range" min="2" max="40" value="12" aria-label="Active programmes">
    <div><small>RECOMMENDED</small><b id="recommended-plan">Programme</b></div>
    <p>Seats are not the unit. Pay for the hardware programmes that need controlled change.</p>
  </div>`

const resourceArtifact = `
  <div class="resource-artifact" data-artifact="revision index">
    <div><small>FIELD GUIDE / 07</small><span>18 MIN READ</span></div>
    <h3>The release packet that suppliers will actually use.</h3>
    <ol><li><span>01</span> One decision owner</li><li><span>02</span> Affected-part register</li><li><span>03</span> Supplier receipt</li><li><span>04</span> Effective serial boundary</li></ol>
  </div>`

const companyArtifact = `
  <div class="company-artifact" data-artifact="operating principles">
    <span class="company-axis x"></span><span class="company-axis y"></span>
    <div class="company-point p1"><b>01</b><span>The drawing is not the decision.</span></div>
    <div class="company-point p2"><b>02</b><span>Context should survive the handoff.</span></div>
    <div class="company-point p3"><b>03</b><span>Release is a human promise.</span></div>
  </div>`

const sectionHead = (index: string, label: string, title: string, intro = '') => `
  <header class="section-head reveal"><span>${index} / ${label}</span><h2>${title}</h2>${intro ? `<p>${intro}</p>` : ''}</header>`

const cta = (title: string, body: string, link = '/product/', label = 'See the product') => `
  <section class="closing-cta ruled-section">
    <div class="closing-index">NEXT / RELEASE</div>
    <div><h2>${title}</h2><p>${body}</p><a class="button button-dark" href="${link}">${label}${pathIcon}</a></div>
  </section>`

const homeBody = `
  <section class="signal-strip"><span>Fictional product benchmark</span><span>Hardware change control</span><span>Designed for engineering operations</span></section>
  <section class="chain-section ruled-section">
    ${sectionHead('01', 'THE CHANGE CHAIN', 'From redline to release, without losing the reason.', 'Rivetline keeps the drawing, affected parts, supplier response, approvals and effective serial boundary in one continuous change record.')}
    <div class="chain-steps reveal"><article><span>REQUEST</span><h3>Start with the actual change.</h3><p>Attach the marked drawing, source issue and decision owner before work spreads into chat.</p></article><article><span>IMPACT</span><h3>See what the revision touches.</h3><p>Parts, programmes, tooling, validation and suppliers share one affected-item register.</p></article><article><span>REVIEW</span><h3>Route only the decisions needed.</h3><p>Mechanical, quality and supply reviewers receive the evidence relevant to their approval.</p></article><article><span>RELEASE</span><h3>Close with an effective boundary.</h3><p>Every packet states exactly when the new definition becomes buildable.</p></article></div>
  </section>
  <section class="cutaway-section ruled-section">
    <div class="cutaway-copy reveal"><span>02 / ONE RECORD</span><h2>A change request is not a ticket. It is a technical argument.</h2><p>Rivetline lets teams inspect what changed, why it changed, who reviewed the impact and which build first receives it. No tab tour. No floating metrics. One record, progressively resolved.</p><a class="text-link" href="/product/">Inspect the complete workflow${pathIcon}</a></div>
    ${productArtifact}
  </section>
  <section class="role-section ruled-section">
    ${sectionHead('03', 'DIFFERENT QUESTIONS', 'One change record. Three operational views.')}
    <div class="role-switcher reveal" data-tabs>
      <div role="tablist" aria-label="Operational roles"><button role="tab" aria-selected="true" data-tab="engineering">ENGINEERING</button><button role="tab" aria-selected="false" data-tab="quality">QUALITY</button><button role="tab" aria-selected="false" data-tab="supply">SUPPLY</button></div>
      <div class="role-panel is-active" data-panel="engineering"><small>ENGINEERING PROGRAMME</small><h3>Which definitions moved?</h3><p>Review the redline, the rationale and every downstream item before the approval request leaves engineering.</p><ul><li>Drawing and model revision pair</li><li>Requirement and test impact</li><li>Release boundary proposal</li></ul></div>
      <div class="role-panel" data-panel="quality"><small>QUALITY ENGINEERING</small><h3>What evidence closes the risk?</h3><p>See changed characteristics, validation notes and required dispositions without reconstructing context from attachments.</p><ul><li>Characteristic-level impact</li><li>Validation plan and result</li><li>Auditable sign-off history</li></ul></div>
      <div class="role-panel" data-panel="supply"><small>SUPPLY OPERATIONS</small><h3>Can the change enter production?</h3><p>Supplier acknowledgement, tooling effect and inventory disposition remain tied to the released definition.</p><ul><li>Supplier receipt state</li><li>Tooling and lead-time response</li><li>Use-up and cut-in instruction</li></ul></div>
    </div>
  </section>
  <section class="proof-section ruled-section">
    <div class="proof-statement reveal"><span>04 / THE OPERATING TEST</span><h2>If a supplier receives only the PDF, the system has failed.</h2></div>
    <div class="proof-ledger reveal"><div><span>DRAWING</span><strong>D-1042 / REV D</strong><em>ATTACHED</em></div><div><span>AFFECTED PARTS</span><strong>4 linked records</strong><em>REVIEWED</em></div><div><span>SUPPLIER</span><strong>KOVA-03</strong><em>ACKNOWLEDGED</em></div><div><span>EFFECTIVITY</span><strong>Serial 6A-0184</strong><em>PROPOSED</em></div></div>
  </section>
  <section class="integration-section ruled-section">
    ${sectionHead('05', 'FITS THE DEFINITION STACK', 'Connect the systems that already own the work.')}
    <div class="integration-map reveal"><span>CAD / PLM</span><i></i><strong>RIVETLINE CHANGE RECORD</strong><i></i><span>ERP / MES</span><b>Drawing versions</b><b>Decision context</b><b>Effective releases</b></div>
    <a class="text-link" href="/product/#integrations">Review integration boundaries${pathIcon}</a>
  </section>
  <section class="trust-section ruled-section"><div><span>06 / TRUST</span><h2>Approval history that reads like engineering work—not surveillance.</h2></div><ul><li>Role-scoped access</li><li>Exportable release packet</li><li>Immutable decision events</li><li>Documented retention controls</li></ul></section>
  ${cta('Open a change record before you book a call.', 'Follow CR-284 from marked drawing to supplier acknowledgement and release boundary.', '/product/', 'Open the sample change')}`

const productBody = `
  <section class="product-overview ruled-section">${sectionHead('01', 'PRODUCT MODEL', 'One record holds the complete change argument.', 'The product is organized around a change chain, not around departments. Each role sees the same technical event through the evidence it owns.')}<div class="wide-artifact reveal">${productArtifact}</div></section>
  <section class="workflow-section ruled-section">${sectionHead('02', 'WORKFLOW', 'The record becomes more certain at every gate.')}<div class="workflow-controls reveal" data-workflow><div role="tablist" aria-label="Workflow steps"><button aria-selected="true" data-step="request">01 Request</button><button aria-selected="false" data-step="impact">02 Impact</button><button aria-selected="false" data-step="review">03 Review</button><button aria-selected="false" data-step="release">04 Release</button></div><article data-step-panel="request" class="is-active"><span>REQUEST</span><h3>Bind the redline to an owner and reason.</h3><p>Required fields change with the source: drawing revision, supplier deviation, test failure or cost-down proposal.</p></article><article data-step-panel="impact"><span>IMPACT</span><h3>Build the affected-item register.</h3><p>Parts, tools, documents and validation tasks become reviewable objects rather than a list buried in prose.</p></article><article data-step-panel="review"><span>REVIEW</span><h3>Ask each function one answerable question.</h3><p>Approval routes stay small because the record already exposes which decision belongs to whom.</p></article><article data-step-panel="release"><span>RELEASE</span><h3>Publish a packet with an effective boundary.</h3><p>The released definition includes acknowledgement and implementation state, not only a signed PDF.</p></article></div></section>
  <section class="diff-section ruled-section">${sectionHead('03', 'REVISION VIEW', 'Read the change, not two entire drawings.')}<div class="diff-viewer reveal"><div class="diff-toolbar"><span>REV C</span><b>OVERLAY / 62%</b><span>REV D</span></div><svg viewBox="0 0 900 420" role="img" aria-label="Revision overlay showing one changed mounting feature"><g class="old-geometry"><path d="M90 320V100h190v80h300v-72h190v212H90Z"/><circle cx="195" cy="220" r="42"/><circle cx="650" cy="211" r="54"/></g><g class="new-geometry"><path d="M90 320V100h190v80h300v-72h190v212H90Z"/><circle cx="214" cy="220" r="42"/><circle cx="650" cy="211" r="54"/></g><path class="diff-callout" d="M214 174C243 118 316 87 387 80"/><text x="397" y="84">HOLE CENTRE +2.4</text></svg><div class="diff-note"><span>NOTE 06</span><p>Shift mounting feature to clear revised harness path. Supplier confirms no new tool.</p></div></div></section>
  <section class="approval-section ruled-section">${sectionHead('04', 'APPROVAL LOGIC', 'Route questions, not documents.')}<div class="approval-rows reveal"><article><span>ME</span><div><h3>Does the revised geometry meet the requirement?</h3><p>Owner / Mechanical engineering</p></div><em>APPROVED</em></article><article><span>QE</span><div><h3>Does the validation plan close the changed characteristic?</h3><p>Owner / Quality engineering</p></div><em class="pending">IN REVIEW</em></article><article><span>SC</span><div><h3>Can the supplier cut in at the proposed boundary?</h3><p>Owner / Supply operations</p></div><em>ACKNOWLEDGED</em></article></div></section>
  <section class="release-section ruled-section">${sectionHead('05', 'RELEASE PACKET', 'Publish something another team can execute.')}<div class="release-packet reveal"><header><span>RELEASE / CR-284</span><strong>READY AFTER QE APPROVAL</strong></header><div><b>01</b><span>Released definitions</span><em>2 files</em></div><div><b>02</b><span>Affected-item disposition</span><em>4 records</em></div><div><b>03</b><span>Supplier acknowledgement</span><em>Received</em></div><div><b>04</b><span>Effective serial boundary</span><em>6A-0184</em></div></div></section>
  <section id="integrations" class="integration-section ruled-section">${sectionHead('06', 'INTEGRATIONS', 'Rivetline carries decisions between systems of record.')}<div class="integration-table reveal"><div><span>SOURCE</span><strong>CAD / PLM</strong><p>Revision metadata, files and affected structures.</p></div><div><span>DECISION</span><strong>RIVETLINE</strong><p>Reason, impact, review, acknowledgement and release.</p></div><div><span>EXECUTION</span><strong>ERP / MES</strong><p>Effectivity, inventory disposition and build instruction.</p></div></div></section>
  <section class="states-section ruled-section">${sectionHead('07', 'PRODUCT STATES', 'The incomplete state is part of the workflow.')}<div class="state-grid reveal"><div><span>LOADING</span><i class="skeleton"></i><i class="skeleton short"></i></div><div><span>EMPTY</span><strong>No affected items yet.</strong><p>Add the first part, drawing or tool this change may touch.</p></div><div><span>ERROR</span><strong>PLM revision unavailable.</strong><p>Keep editing the record. Retry the source link when the connector returns.</p></div><div><span>RESOLVED</span><strong>Release packet published.</strong><p>Supplier receipt recorded for serial 6A-0184.</p></div></div></section>
  ${cta('See where Rivetline fits your hardware programme.', 'Compare engineering, quality and supply workflows using the same change record.', '/solutions/', 'Explore solutions')}`

const solutionsBody = `
  <section class="solution-roles ruled-section">${sectionHead('01', 'ROLE VIEWS', 'Same record. Different decisions.')}<div class="role-ledger reveal"><a href="#engineering"><span>ENGINEERING PROGRAMME</span><strong>Control definition and downstream impact.</strong><em>01</em></a><a href="#quality"><span>QUALITY ENGINEERING</span><strong>Close changed characteristics with evidence.</strong><em>02</em></a><a href="#supply"><span>SUPPLY OPERATIONS</span><strong>Make supplier cut-in executable.</strong><em>03</em></a></div></section>
  <section id="engineering" class="role-detail ruled-section"><div><span>01 / ENGINEERING PROGRAMME</span><h2>Keep the decision attached to the definition.</h2><p>Programme leads can see which change is waiting, which system owns the next answer and what release boundary remains unresolved.</p></div><div class="decision-board reveal"><header><span>PROGRAMME / AX-6</span><b>7 OPEN CHANGES</b></header><article><i>CR-284</i><strong>Motor bracket tolerance</strong><em>QE REVIEW</em></article><article><i>CR-279</i><strong>Harness strain relief</strong><em>SUPPLIER</em></article><article><i>CR-271</i><strong>Pack label substrate</strong><em>READY</em></article></div></section>
  <section id="quality" class="role-detail reverse ruled-section"><div><span>02 / QUALITY ENGINEERING</span><h2>Review the characteristic, not the attachment pile.</h2><p>Changed dimensions, validation tasks, deviations and dispositions appear as connected decisions with explicit owners.</p></div><div class="quality-plate reveal"><span>CHARACTERISTIC / MOUNT CENTRE</span><strong>418.0 ± 0.2</strong><div><b>PLAN</b><p>First article + fixture repeatability</p></div><div><b>RESULT</b><p>Pending revised sample</p></div><em>1 OPEN EVIDENCE ITEM</em></div></section>
  <section id="supply" class="role-detail ruled-section"><div><span>03 / SUPPLY OPERATIONS</span><h2>Turn acknowledgement into a production boundary.</h2><p>Supplier response, tooling effect, inventory disposition and cut-in point live beside the released drawing definition.</p></div><div class="supplier-plate reveal"><header><span>KOVA-03</span><em>ACKNOWLEDGED</em></header><div><b>TOOLING</b><p>No new tool / fixture insert only</p></div><div><b>LEAD TIME</b><p>12 working days after release</p></div><div><b>BOUNDARY</b><p>First build / serial 6A-0184</p></div></div></section>
  <section class="hardware-matrix ruled-section">${sectionHead('04', 'PROGRAMME SHAPES', 'Use one operating model across different hardware rhythms.')}<div class="matrix reveal"><div></div><b>LOW VOLUME</b><b>SERIES</b><b>REGULATED</b><span>CHANGE SOURCE</span><p>Build learning</p><p>Cost and supply</p><p>Controlled evidence</p><span>RELEASE UNIT</span><p>Build packet</p><p>Serial boundary</p><p>Validated baseline</p><span>SUPPLIER LOOP</span><p>Direct receipt</p><p>Tool + inventory</p><p>Qualified change</p></div></section>
  <section class="journey-section ruled-section">${sectionHead('05', 'CONNECTED JOURNEY', 'An evaluator should not need the home page twice.')}<div class="journey reveal"><a href="/product/"><span>01</span><strong>Inspect CR-284</strong><p>Understand the record model.</p></a><a href="/customers/"><span>02</span><strong>Review scenarios</strong><p>See programme patterns.</p></a><a href="/pricing/"><span>03</span><strong>Choose scope</strong><p>Price by active programme.</p></a></div></section>
  ${cta('Choose the scope that matches your programme.', 'Pricing follows active hardware programmes—not the number of people who need context.', '/pricing/', 'Review pricing')}`

const customersBody = `
  <section class="scenario-intro ruled-section">${sectionHead('01', 'EVALUATION SCENARIOS', 'Proof without invented customers.', 'Rivetline is fictional, so this benchmark uses transparent operating scenarios instead of fabricated logos, quotes or performance metrics.')}</section>
  <section class="scenario-index ruled-section"><div class="scenario-row reveal"><span>01 / INDUSTRIAL ROBOTICS</span><h2>Configuration changes across long-lead suppliers.</h2><p>Scenario: connect drawing revisions, tool impact and effective unit boundary.</p><a href="#robotics">Read scenario${pathIcon}</a></div><div class="scenario-row reveal"><span>02 / ENERGY STORAGE</span><h2>Validation evidence across pack variants.</h2><p>Scenario: preserve quality rationale while a change branches across programmes.</p><a href="#energy">Read scenario${pathIcon}</a></div><div class="scenario-row reveal"><span>03 / LAB INSTRUMENTS</span><h2>Controlled release in a regulated build.</h2><p>Scenario: route changed characteristics and supplier qualification.</p><a href="#laboratory">Read scenario${pathIcon}</a></div></section>
  <section id="robotics" class="case-narrative ruled-section"><header><span>SCENARIO 01</span><h2>One bracket. Three cells. Two suppliers.</h2><p>The programme needs to revise a mounting feature without breaking configuration clarity across equipment already in assembly.</p></header><div class="case-sequence reveal"><article><b>CONSTRAINT</b><h3>Inventory already exists.</h3><p>The old part remains usable on two cells but not the new high-payload configuration.</p></article><article><b>RIVETLINE MODEL</b><h3>Split the effective boundary.</h3><p>One change record carries separate use-up instructions by programme and supplier receipt state.</p></article><article><b>RELEASE TEST</b><h3>Every builder sees the same answer.</h3><p>The packet names the first affected unit, drawing revision and disposition for remaining stock.</p></article></div></section>
  <section id="energy" class="case-compact ruled-section"><div><span>SCENARIO 02 / ENERGY STORAGE</span><h2>Change evidence branches without losing its source.</h2></div><div><p>A validation note applies to two pack families, while the physical cut-in dates differ. The shared rationale remains attached to two explicit release boundaries.</p><ul><li>Shared changed characteristic</li><li>Variant-specific validation</li><li>Separate supplier acknowledgement</li></ul></div></section>
  <section id="laboratory" class="case-compact ruled-section"><div><span>SCENARIO 03 / LAB INSTRUMENTS</span><h2>The audit trail follows the technical question.</h2></div><div><p>Reviewers can reconstruct why a characteristic changed, which evidence closed it and who released the controlled definition.</p><ul><li>Requirement link</li><li>Validation disposition</li><li>Immutable release event</li></ul></div></section>
  <section class="implementation-section ruled-section">${sectionHead('05', 'IMPLEMENTATION', 'Start with one programme and one release type.')}<div class="implementation-track reveal"><article><span>WEEK 01</span><h3>Map the current release packet.</h3></article><article><span>WEEK 02</span><h3>Connect the definition source.</h3></article><article><span>WEEK 03</span><h3>Run one live change.</h3></article><article><span>WEEK 04</span><h3>Review the operating fit.</h3></article></div></section>
  ${cta('Use the sample change as your evaluation script.', 'CR-284 exposes the data model, approval route and release packet without requiring a sales call.', '/product/', 'Inspect CR-284')}`

const pricingBody = `
  <section class="pricing-estimator ruled-section">${sectionHead('01', 'SCOPE ESTIMATOR', 'Price the change surface, not access to context.', 'Every person who needs the released answer should be able to see it. Rivetline pricing follows active programmes and integration depth.')}<div class="estimator-wrap reveal">${pricingArtifact}<div class="price-summary"><span>ILLUSTRATIVE PRICE</span><strong id="price-output">$2,400</strong><small>/ month, billed annually</small><p>Fictional benchmark pricing. No purchasing claim is implied.</p></div></div></section>
  <section class="plans-section ruled-section">${sectionHead('02', 'PLANS', 'Choose the operating boundary.')}<div class="billing-toggle"><button data-billing="annual" aria-pressed="true">Annual</button><button data-billing="monthly" aria-pressed="false">Monthly</button></div><div class="plan-rows reveal"><article><span>START</span><div><h3>Pilot</h3><p>One programme, one source connector and guided release mapping.</p></div><strong data-annual="$900" data-monthly="$1,100">$900</strong><a href="/product/">Evaluate first</a></article><article class="featured"><span>RUN</span><div><h3>Programme</h3><p>Up to twelve active programmes, approval routing and supplier receipt.</p></div><strong data-annual="$2,400" data-monthly="$2,900">$2,400</strong><a href="/company/#contact">Discuss scope</a></article><article><span>SCALE</span><div><h3>Portfolio</h3><p>Multi-division governance, advanced integration and controlled retention.</p></div><strong>Custom</strong><a href="/company/#contact">Map requirements</a></article></div></section>
  <section class="comparison-section ruled-section">${sectionHead('03', 'COMPARISON', 'The difference is operating depth.')}<div class="comparison-table reveal"><div><b>CAPABILITY</b><b>PILOT</b><b>PROGRAMME</b><b>PORTFOLIO</b></div><div><span>Active programmes</span><span>1</span><span>12</span><span>Custom</span></div><div><span>Source connectors</span><span>1</span><span>4</span><span>Custom</span></div><div><span>Supplier receipt</span><span>Manual</span><span>Included</span><span>Included</span></div><div><span>Retention policy</span><span>Standard</span><span>Standard</span><span>Configured</span></div><div><span>Implementation mapping</span><span>Guided</span><span>Guided</span><span>Dedicated</span></div></div></section>
  <section class="procurement-section ruled-section"><div><span>04 / PROCUREMENT</span><h2>Questions your security and finance reviewers can answer here.</h2></div><div class="procurement-list"><details><summary>What counts as an active programme?</summary><p>A programme with at least one open or released change during the billing period. Archived programmes remain readable.</p></details><details><summary>Are suppliers licensed as seats?</summary><p>No in this fictional pricing model. External reviewers receive scoped access to the change records assigned to them.</p></details><details><summary>How does a pilot become a programme?</summary><p>The existing change history and release packet remain in place; the operating boundary expands.</p></details><details><summary>Is this pricing final?</summary><p>No. Rivetline is a fictional benchmark and every amount on this page is demonstrative.</p></details></div></section>
  ${cta('Evaluate the operating model before discussing price.', 'Open the product record, then use the programme estimator to frame the right boundary.', '/product/', 'Open the product')}`

const resourcesBody = `
  <section class="featured-resource ruled-section"><div class="resource-copy"><span>01 / FEATURED FIELD GUIDE</span><h2>The release packet that suppliers will actually use.</h2><p>A practical anatomy of decision context, affected items, acknowledgement and effectivity.</p><a class="button button-dark" href="#library">Browse the library${pathIcon}</a></div>${resourceArtifact}</section>
  <section id="library" class="library-section ruled-section">${sectionHead('02', 'LIBRARY', 'Useful material for operating change.')}<div class="resource-filters" role="group" aria-label="Filter resources"><button class="active" data-filter="all">All</button><button data-filter="guide">Guides</button><button data-filter="template">Templates</button><button data-filter="release">Release notes</button></div><div class="resource-list reveal"><article data-kind="guide"><span>GUIDE / 18 MIN</span><h3>Map an engineering change before choosing software.</h3><p>Questions for programme, quality and supply owners.</p></article><article data-kind="template"><span>TEMPLATE / XLSX</span><h3>Affected-item register.</h3><p>A practical starting structure for one live change.</p></article><article data-kind="guide"><span>GUIDE / 11 MIN</span><h3>Write one answerable approval question.</h3><p>Reduce broad sign-offs to explicit technical decisions.</p></article><article data-kind="release"><span>RELEASE / AUG 2026</span><h3>Supplier receipt states.</h3><p>Added explicit seen, acknowledged and constrained states.</p></article><article data-kind="template"><span>TEMPLATE / PDF</span><h3>Release packet review sheet.</h3><p>Check definition, disposition and effective boundary.</p></article><article data-kind="release"><span>RELEASE / JUL 2026</span><h3>Split effectivity.</h3><p>Publish separate cut-in points from one shared rationale.</p></article></div></section>
  <section class="changelog-section ruled-section">${sectionHead('03', 'CHANGELOG', 'The product release should explain operational impact.')}<div class="changelog reveal"><article><time>2026.08</time><div><h3>Supplier receipt states</h3><p>External review now distinguishes viewed, acknowledged, constrained and accepted.</p></div><span>WORKFLOW</span></article><article><time>2026.07</time><div><h3>Split effectivity</h3><p>One rationale can release to multiple programme boundaries without duplicating the record.</p></div><span>RELEASE</span></article><article><time>2026.06</time><div><h3>Drawing overlay notes</h3><p>Changed geometry can be linked directly to an approval question.</p></div><span>REVIEW</span></article></div></section>
  <section class="newsletter-section ruled-section"><div><span>04 / OPERATIONS NOTE</span><h2>One useful change-control pattern each month.</h2><p>No generic product newsletter. Each note explains one field-tested operating structure.</p></div><form id="newsletter-form"><label for="resource-email">Work email</label><div><input id="resource-email" type="email" required placeholder="you@company.com"><button class="button button-dark" type="submit">Subscribe</button></div><p class="form-status" aria-live="polite"></p></form></section>
  ${cta('Move from reading to one complete record.', 'The sample product workflow uses the same CR-284 data across every state.', '/product/', 'Open CR-284')}`

const companyBody = `
  <section class="manifesto ruled-section"><div><span>01 / WHY RIVETLINE</span><h2>Hardware teams deserve decision history that survives manufacturing.</h2></div><p>Most change systems store approval events but lose the technical argument. Rivetline starts from a different premise: release is not a signature on a file. It is a promise that another team can build the right definition at the right boundary.</p></section>
  <section class="origin-section ruled-section">${sectionHead('02', 'ORIGIN', 'Built around the handoff, not the inbox.')}<div class="origin-line reveal"><article><span>OBSERVE</span><h3>Release context collapses into attachments.</h3></article><article><span>MODEL</span><h3>Treat impact and effectivity as first-class records.</h3></article><article><span>TEST</span><h3>Ask whether a supplier can execute the packet alone.</h3></article></div></section>
  <section class="principles-section ruled-section">${sectionHead('03', 'OPERATING PRINCIPLES', 'Three rules shape the product.')}<div class="principle-rows reveal"><article><span>01</span><h3>The drawing is not the decision.</h3><p>The reason, risk and boundary must travel with the revised definition.</p></article><article><span>02</span><h3>Context should survive the handoff.</h3><p>A supplier or factory should not need the meeting history to understand the release.</p></article><article><span>03</span><h3>Release is a human promise.</h3><p>Software should make ownership and uncertainty visible, not pretend they disappeared.</p></article></div></section>
  <section class="security-section ruled-section"><div><span>04 / SECURITY MODEL</span><h2>Trust begins with legible boundaries.</h2><p>This fictional benchmark does not claim certifications. It demonstrates where a production site would publish substantiated security, privacy, retention and access-control evidence.</p></div><div class="security-register reveal"><div><span>ACCESS</span><strong>Role + programme scope</strong></div><div><span>EVENTS</span><strong>Immutable decision history</strong></div><div><span>EXPORT</span><strong>Portable release packets</strong></div><div><span>RETENTION</span><strong>Configured by policy</strong></div></div></section>
  <section class="careers-section ruled-section">${sectionHead('05', 'WORK WITH THE PROBLEM', 'Open roles would be published with real scope.')}<div class="job-list reveal"><article><span>PRODUCT</span><h3>Product designer / technical workflows</h3><em>ROLE EXAMPLE</em></article><article><span>ENGINEERING</span><h3>Frontend engineer / document systems</h3><em>ROLE EXAMPLE</em></article><article><span>FIELD</span><h3>Implementation lead / hardware operations</h3><em>ROLE EXAMPLE</em></article></div></section>
  <section id="contact" class="contact-section ruled-section"><div><span>06 / CONTACT</span><h2>Bring one real change packet.</h2><p>The best evaluation starts with the drawing, affected items and release instruction your team already uses.</p></div><form id="contact-form"><label for="contact-email">Work email</label><input id="contact-email" type="email" required placeholder="you@company.com"><label for="programme-note">What kind of hardware programme?</label><textarea id="programme-note" required rows="4" placeholder="Describe the release boundary and supplier model."></textarea><button type="submit" class="button button-dark">Request a working session</button><p class="form-status" aria-live="polite"></p></form></section>`

export const pages: SaaSPage[] = [
  { slug: '', label: 'Home', title: 'Rivetline — Hardware change control', description: 'Rivetline keeps drawing revisions, impact, approvals and supplier effectivity in one engineering change record.', eyebrow: 'HARDWARE CHANGE CONTROL / REV 01', headline: 'Every revision needs a release path.', lede: 'Rivetline gives hardware programme teams one defensible chain from marked drawing to supplier acknowledgement and effective build.', body: homeBody, artifact: dossier },
  { slug: 'product', label: 'Product', title: 'Product — Rivetline', description: 'Inspect the complete Rivetline engineering change workflow.', eyebrow: 'PRODUCT / CR-284', headline: 'The change record, resolved in sequence.', lede: 'Bind the technical reason, downstream impact, approval questions and effective boundary to the same record.', body: productBody, artifact: productArtifact },
  { slug: 'solutions', label: 'Solutions', title: 'Solutions — Rivetline', description: 'Rivetline workflows for engineering programme, quality and supply operations.', eyebrow: 'SOLUTIONS / ROLE VIEWS', headline: 'Different owners. One released answer.', lede: 'Engineering, quality and supply operations work from the same change record without flattening their decisions into one generic approval.', body: solutionsBody, artifact: chainArtifact },
  { slug: 'customers', label: 'Scenarios', title: 'Evaluation scenarios — Rivetline', description: 'Transparent hardware change-control scenarios without invented customer claims.', eyebrow: 'SCENARIOS / NO INVENTED PROOF', headline: 'Test the operating model against real programme shapes.', lede: 'These fictional evaluation scenarios show what the product must carry across robotics, energy storage and controlled lab instruments.', body: customersBody, artifact: dossier },
  { slug: 'pricing', label: 'Pricing', title: 'Pricing — Rivetline', description: 'Illustrative Rivetline pricing based on active hardware programmes.', eyebrow: 'PRICING / PROGRAMME SCOPE', headline: 'Pay for controlled programmes, not seats.', lede: 'Price follows the number of active change surfaces and required integrations. Everyone who needs the released answer can see it.', body: pricingBody, artifact: chainArtifact },
  { slug: 'resources', label: 'Resources', title: 'Resources — Rivetline', description: 'Guides, templates and product changes for hardware engineering operations.', eyebrow: 'FIELD LIBRARY / CHANGE PRACTICE', headline: 'Practical material for releasing hardware.', lede: 'Guides, templates and release notes organized around the work: impact, review, supplier acknowledgement and effectivity.', body: resourcesBody, artifact: resourceArtifact },
  { slug: 'company', label: 'Company', title: 'Company — Rivetline', description: 'The operating principles behind the fictional Rivetline product benchmark.', eyebrow: 'COMPANY / OPERATING PREMISE', headline: 'The technical argument should survive the handoff.', lede: 'Rivetline is a fictional benchmark built around one conviction: release context should remain usable after the meeting ends.', body: companyBody, artifact: companyArtifact },
]

const nav = pages.filter((page) => page.slug && !['customers'].includes(page.slug))

const linkFor = (slug: string) => slug ? `/${slug}/` : '/'

export const renderPage = (page: SaaSPage) => {
  const current = page.slug
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${page.description}">
  <link rel="canonical" href="http://127.0.0.1:4290${linkFor(page.slug)}">
  <link rel="icon" type="image/png" href="/assets/brand/favicon.png">
  <link rel="stylesheet" href="/assets/styles.css">
  <title>${page.title}</title>
</head>
<body data-route="${page.slug || 'home'}">
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <a class="brand" href="/" aria-label="Rivetline home"><img src="/assets/brand/logo-primary.png" alt="Rivetline"></a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav"><span></span><span></span><span class="sr-only">Menu</span></button>
    <nav id="site-nav" aria-label="Primary navigation">
      ${nav.map((item) => `<a href="${linkFor(item.slug)}"${current === item.slug ? ' aria-current="page"' : ''}>${item.label}</a>`).join('')}
      <a href="/customers/"${current === 'customers' ? ' aria-current="page"' : ''}>Scenarios</a>
    </nav>
    <a class="header-action" href="/product/">Open sample change</a>
  </header>
  <main id="main">
    <section class="page-hero ${page.slug ? 'inner-hero' : 'home-hero'}">
      <div class="hero-copy"><span>${page.eyebrow}</span><h1>${page.headline}</h1><p>${page.lede}</p><div class="hero-actions"><a class="button button-accent" href="/product/">Open sample change${pathIcon}</a><a class="text-link" href="/pricing/">Review pricing${pathIcon}</a></div></div>
      <div class="hero-artifact reveal">${page.artifact}</div>
      <aside class="hero-note"><span>SYSTEM NOTE</span><p>One source example—CR-284—continues across the entire site.</p></aside>
    </section>
    ${page.body}
  </main>
  <footer class="site-footer">
    <div class="footer-brand"><img src="/assets/brand/logo-primary.png" alt="Rivetline"><p>Change control for hardware teams who need the reason to survive release.</p></div>
    <div><span>PRODUCT</span><a href="/product/">Workflow</a><a href="/solutions/">Solutions</a><a href="/pricing/">Pricing</a></div>
    <div><span>EVALUATE</span><a href="/customers/">Scenarios</a><a href="/resources/">Resources</a><a href="/company/#contact">Contact</a></div>
    <div><span>COMPANY</span><a href="/company/">Principles</a><a href="/company/#contact">Security</a><a href="/company/#contact">Careers</a></div>
    <small>FICTIONAL PRODUCT BENCHMARK / ALL CLAIMS AND PRICES ARE DEMONSTRATIVE</small>
  </footer>
  <script src="/assets/site.js" defer></script>
</body>
</html>`
}
