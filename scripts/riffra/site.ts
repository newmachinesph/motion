export interface RiffraPage {
  slug: string
  nav?: string
  title: string
  description: string
  eyebrow: string
  headline: string
  lede: string
  artifact: string
  body: string
  theme?: 'blush' | 'ink' | 'paper'
}

const arrow = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg>'
const spark = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v18M3 12h18M6 6l12 12M18 6 6 18"/></svg>'

const sectionHead = (label: string, title: string, copy = '') => `
  <header class="section-head reveal">
    <span>${label}</span>
    <h2>${title}</h2>
    ${copy ? `<p>${copy}</p>` : ''}
  </header>`

const close = (title: string, copy: string, href = '/product/', label = 'Explore the product') => `
  <section class="closing-section ruled">
    <div class="closing-orbit" aria-hidden="true"><i></i><i></i><i></i></div>
    <div><span>NEXT DRAFT</span><h2>${title}</h2><p>${copy}</p><a class="button button-ink" href="${href}">${label}${arrow}</a></div>
  </section>`

const reviewStrip = `
  <div class="review-strip" data-voice-demo>
    <div class="strip-toolbar"><span><i></i> REVIEW STRIP</span><b>CONTEXT / NORTHLINE</b><small>READY</small></div>
    <div class="strip-track">
      <article class="speech-slip raw-slip"><span>ROUGH SPEECH</span><p data-rough>“Could you uh send the revised proposal to Maya and mention we can start on Monday?”</p></article>
      <div class="context-stamp"><span>CONTEXT SET</span><strong>Northline</strong><small>Tone · concise<br>Terms · 18</small></div>
      <article class="speech-slip final-slip"><span>READY TO PASTE</span><p data-final>“Send Maya the revised proposal and confirm that we can start Monday.”</p><em>3 changes reviewed</em></article>
    </div>
    <div class="strip-controls"><button type="button" class="voice-button" data-record aria-pressed="false"><i></i><span>Hold to speak</span></button><p data-demo-status aria-live="polite">Try the product mechanism. Hold, speak, release, review.</p><button type="button" class="approve-button" data-approve>Approve paste${arrow}</button></div>
  </div>`

const composer = `
  <div class="composer-window" data-composer>
    <header><span>RIFFRA / COMPOSE</span><div><i></i><i></i><i></i></div></header>
    <aside><b>R</b><button class="active" aria-label="Compose">C</button><button aria-label="Context sets">S</button><button aria-label="History">H</button></aside>
    <div class="composer-main">
      <div class="composer-context"><span>CONTEXT SET</span><button type="button" data-context-name>Northline / Client update</button></div>
      <div class="composer-raw"><span>CAPTURE</span><p>“Hey Maya quick update the prototype is done and uh we can run the working session Monday if that suits.”</p></div>
      <div class="composer-rule"><i></i><span>4 context rules applied</span><i></i></div>
      <div class="composer-final"><span>REVIEW</span><p><mark>Hi Maya —</mark> the prototype is ready. We can run the working session on Monday if that works for you.</p></div>
      <div class="composer-actions"><button type="button" class="button button-paper" data-copy-sample>Copy draft</button><button type="button" class="button button-accent">Paste into app${arrow}</button></div>
    </div>
  </div>`

const contextBoard = `
  <div class="context-board" data-context-board>
    <header><span>CONTEXT SETS</span><strong>3 ACTIVE</strong></header>
    <div role="tablist" aria-label="Example context sets">
      <button role="tab" aria-selected="true" data-context="northline"><i style="--dot:#A5234D"></i>Northline</button>
      <button role="tab" aria-selected="false" data-context="product"><i style="--dot:#E39A37"></i>Product team</button>
      <button role="tab" aria-selected="false" data-context="personal"><i style="--dot:#4A7B68"></i>Personal</button>
    </div>
    <section class="context-panel is-active" data-context-panel="northline"><span>CLIENT UPDATE</span><h3>Clear, brief, no internal shorthand.</h3><dl><div><dt>Vocabulary</dt><dd>Northline · Maya · Working session</dd></div><div><dt>Tone</dt><dd>Direct and warm</dd></div><div><dt>Format</dt><dd>Short paragraphs</dd></div></dl></section>
    <section class="context-panel" data-context-panel="product"><span>PRODUCT NOTE</span><h3>Decision first, evidence immediately after.</h3><dl><div><dt>Vocabulary</dt><dd>Release · owner · evidence</dd></div><div><dt>Tone</dt><dd>Precise and plain</dd></div><div><dt>Format</dt><dd>Decision log</dd></div></dl></section>
    <section class="context-panel" data-context-panel="personal"><span>PERSONAL WRITING</span><h3>Keep my phrasing. Remove the verbal clutter.</h3><dl><div><dt>Vocabulary</dt><dd>Personal dictionary</dd></div><div><dt>Tone</dt><dd>Natural</dd></div><div><dt>Format</dt><dd>Contextual</dd></div></dl></section>
  </div>`

const dataFlow = `
  <div class="data-flow" aria-label="Riffra data path">
    <article><span>01</span><strong>Capture</strong><p>Audio begins only while the chosen shortcut is active.</p></article>
    <i></i>
    <article><span>02</span><strong>Shape</strong><p>Transcription and selected context rules produce a proposed draft.</p></article>
    <i></i>
    <article><span>03</span><strong>Review</strong><p>The user sees the text and approves what enters the active app.</p></article>
    <i></i>
    <article><span>04</span><strong>Release</strong><p>Session content follows the workspace retention choice.</p></article>
  </div>`

const homeBody = `
  <section class="intent-strip"><span>VOICE COMPOSITION / MACOS + WINDOWS</span><span>REVIEW BEFORE PASTE</span><span>FICTIONAL PRODUCT / REAL INTERACTIONS</span></section>
  <section class="clarity-section ruled">
    ${sectionHead('01 / THE CLARITY PRESS', 'Watch one thought become usable language.', 'The same rough client update moves through capture, context, review and approval. Nothing disappears behind an AI sparkle.')}
    <div class="clarity-layout" data-clarity>
      <ol>
        <li class="is-active" data-clarity-step="0"><b>Capture</b><span>Keep the whole thought, including the pauses.</span></li>
        <li data-clarity-step="1"><b>Context</b><span>Apply the right vocabulary and writing rules.</span></li>
        <li data-clarity-step="2"><b>Review</b><span>See what changed before text leaves Riffra.</span></li>
        <li data-clarity-step="3"><b>Approve</b><span>Paste the sentence you actually intend to send.</span></li>
      </ol>
      <div class="clarity-stage">
        <div class="clarity-sheet" data-clarity-sheet>
          <header><span>NORTHLINE / CLIENT UPDATE</span><em>STEP 01</em></header>
          <div class="clarity-copy"><p class="clarity-rough">could you uh send the revised proposal to maya and mention we can start monday</p><i></i><p class="clarity-clean">Send Maya the revised proposal and confirm that we can start Monday.</p></div>
          <footer><span>7 speech fragments</span><span>3 reviewed changes</span><strong>USER APPROVED</strong></footer>
        </div>
      </div>
    </div>
  </section>
  <section class="context-section ruled">
    <div class="context-copy reveal"><span>02 / CONTEXT SETS</span><h2>One voice. Different rooms.</h2><p>Client names, specialist terms and writing rules should change with the work—not flatten everyone into one synthetic tone.</p><a class="text-link" href="/product/#context">See how Context Sets work${arrow}</a></div>
    <div class="reveal">${contextBoard}</div>
  </section>
  <section class="workflow-bands ruled">
    ${sectionHead('03 / DAILY WORK', 'Start with the sentence you need to finish.')}
    <div class="workflow-grid reveal">
      <a class="workflow-card tall" href="/workflows/#consulting"><span>CONSULTING</span><h3>Turn the spoken debrief into the client update.</h3><p>Names, dates and next steps stay visible before send.</p><em>Open workflow${arrow}</em></a>
      <a class="workflow-card raspberry" href="/workflows/#product"><span>PRODUCT</span><h3>Talk through the decision while the evidence is fresh.</h3><em>Open workflow${arrow}</em></a>
      <a class="workflow-card ink" href="/workflows/#support"><span>SUPPORT</span><h3>Reply in the product’s language, not a canned voice.</h3><em>Open workflow${arrow}</em></a>
      <a class="workflow-card paper" href="/workflows/#sales"><span>SALES</span><h3>Move from call note to clean follow-up.</h3><em>Open workflow${arrow}</em></a>
    </div>
  </section>
  <section class="selection-section ruled">
    <div class="selection-copy"><span>04 / SELECTED-TEXT ACTIONS</span><h2>Speak to the sentence already on screen.</h2><p>Highlight a draft in any app, say what should change, and review the proposed revision before it replaces anything.</p></div>
    <div class="selection-demo reveal" data-selection-demo>
      <div class="selection-source"><span>SELECTED IN MAIL</span><p>We need the feedback soon because the timeline is getting tight.</p></div>
      <button type="button" data-transform>“Make this direct without sounding impatient.”</button>
      <div class="selection-result"><span>RIFFRA PROPOSES</span><p>Please send your feedback by Thursday so we can keep the current timeline.</p><div><button>Keep original</button><button class="active">Use revision</button></div></div>
    </div>
  </section>
  <section class="privacy-section ruled">
    ${sectionHead('05 / DATA PATH', 'Control is easier to trust when the path is visible.', 'This fictional product specification makes its intended data flow inspectable. A production service would publish substantiated retention, subprocessors and certification evidence.')}
    <div class="reveal">${dataFlow}</div>
    <a class="button button-paper" href="/security/">Review the security model${arrow}</a>
  </section>
  <section class="pricing-preview ruled"><div><span>06 / PLANS</span><h2>Start with the draft. Add shared language when the work gets bigger.</h2></div><div class="price-note"><span>PERSONAL</span><strong>$12</strong><small>per month · annual billing</small><ul><li>Unlimited personal dictation</li><li>Five Context Sets</li><li>Review Strip and actions</li></ul><a href="/pricing/">Compare every plan${arrow}</a></div></section>
  <section class="journal-preview ruled">${sectionHead('07 / FIELD NOTES', 'Writing starts before the keyboard.')}
    <div class="journal-grid"><a href="/journal/voice-is-a-draft/"><span>THESIS / 8 MIN</span><h3>Voice is not a shortcut. It is a first draft.</h3><p>Why review is the product—not friction around it.</p></a><a href="/journal/"><span>FIELD NOTE / 6 MIN</span><h3>A personal dictionary should know when to stay quiet.</h3><p>Context beats one enormous list of terms.</p></a><a href="/journal/"><span>PRODUCT / 4 MIN</span><h3>Designing the pause between speaking and sending.</h3><p>The half-second where control becomes visible.</p></a></div>
  </section>
  ${close('Say it in rough. Send it in your voice.', 'Download the fictional Riffra desktop app and try the complete review-before-paste flow.', '/product/', 'Explore Riffra')}`

const productBody = `
  <section class="product-lab ruled">${sectionHead('01 / PRODUCT LAB', 'Compose one message from capture to paste.', 'Every control in this demonstration has a defined state. Switch context, copy the draft and inspect the review step.')}
    <div class="product-lab-grid"><div class="reveal">${composer}</div><aside><span>USE THE SAME EXAMPLE</span><p>The Northline update appears across capture, Context Sets and review so the mechanism—not a collage of screens—carries the product story.</p><dl><div><dt>Capture</dt><dd>Rough but complete</dd></div><div><dt>Shape</dt><dd>Rules are named</dd></div><div><dt>Review</dt><dd>Changes stay visible</dd></div></dl></aside></div>
  </section>
  <section id="review" class="review-anatomy ruled">${sectionHead('02 / REVIEW STRIP', 'The pause before paste is part of the product.')}
    <div class="anatomy-grid reveal"><article><span>ROUGH</span><h3>Keep the original thought available.</h3><p>Nothing is silently overwritten while the proposal is being shaped.</p></article><article><span>RULES</span><h3>Name the context that changed it.</h3><p>Vocabulary, tone and format are inspectable product objects.</p></article><article><span>FINAL</span><h3>Approve the sentence, not the model.</h3><p>The user releases the exact text that enters the active app.</p></article></div>
    ${reviewStrip}
  </section>
  <section id="context" class="product-context ruled"><div class="context-copy"><span>03 / CONTEXT SETS</span><h2>Your client update should not sound like your product decision.</h2><p>Riffra keeps terminology and formatting rules scoped to the work that needs them.</p></div><div>${contextBoard}</div></section>
  <section class="actions-section ruled">${sectionHead('04 / ACTIONS', 'Transform selected text without opening another workspace.')}
    <div class="action-ledger reveal"><article><b>REFINE</b><p>“Make this shorter and preserve the deadline.”</p><em>ONE REVISION</em></article><article><b>STRUCTURE</b><p>“Turn these notes into decisions and open questions.”</p><em>TWO SECTIONS</em></article><article><b>TRANSLATE</b><p>“Reply in French, keep the product names unchanged.”</p><em>TERMS LOCKED</em></article><article><b>CONTINUE</b><p>“Finish the paragraph in the same register.”</p><em>CONTEXT ATTACHED</em></article></div>
  </section>
  <section class="state-section ruled">${sectionHead('05 / SYSTEM STATES', 'A voice tool must be calm when the network is not.')}
    <div class="state-grid reveal"><article><span>LISTENING</span><div class="mini-bars"><i></i><i></i><i></i><i></i><i></i></div><p>Release the shortcut to review.</p></article><article><span>PROCESSING</span><div class="state-line"></div><p>Keeping the full capture available.</p></article><article><span>OFFLINE</span><strong>Draft saved locally.</strong><p>Retry shaping when the connection returns.</p></article><article><span>READY</span><strong>3 changes reviewed.</strong><p>Approve paste or keep the rough transcript.</p></article></div>
  </section>
  <section class="platform-section ruled">${sectionHead('06 / WHERE IT WORKS', 'Text field first. App brand second.')}
    <div class="platform-list"><span>MAIL</span><span>DOCS</span><span>MESSAGING</span><span>CRM</span><span>CODE EDITORS</span><span>BROWSERS</span><span>PROJECT TOOLS</span><span>DESIGN TOOLS</span></div><p>Riffra is specified as a desktop input layer for macOS and Windows. Compatibility claims would be verified app by app before launch.</p></section>
  ${close('Choose the workflow that sounds like your day.', 'See complete examples for consulting, product, support and sales writing.', '/workflows/', 'Explore workflows')}`

const workflowsBody = `
  <section class="workflow-index ruled">${sectionHead('01 / WORKFLOW INDEX', 'Different writing jobs need different context.', 'Filter by role. Each scenario starts with a concrete spoken draft and ends with a reviewable output.')}
    <div class="filter-row" data-filter-group><button class="active" data-filter="all">All</button><button data-filter="client">Client work</button><button data-filter="product">Product</button><button data-filter="service">Service</button></div>
    <div class="workflow-list" data-filter-list>
      <article data-kind="client" id="consulting"><span>CONSULTING</span><h3>Debrief → client update</h3><p>Capture findings while the conversation is fresh. Keep names, commitments and dates visible.</p><em>NORTHLINE SET</em></article>
      <article data-kind="product" id="product"><span>PRODUCT</span><h3>Discussion → decision note</h3><p>Separate the decision, evidence and unresolved questions without losing the spoken reasoning.</p><em>PRODUCT SET</em></article>
      <article data-kind="service" id="support"><span>SUPPORT</span><h3>Case context → customer reply</h3><p>Use product terminology and a direct next step without sounding like a canned macro.</p><em>SUPPORT SET</em></article>
      <article data-kind="client" id="sales"><span>SALES</span><h3>Call memory → follow-up</h3><p>Turn commitments into a concise recap before the next meeting begins.</p><em>ACCOUNT SET</em></article>
      <article data-kind="product"><span>RESEARCH</span><h3>Observation → field note</h3><p>Keep participant language intact and label interpretation separately.</p><em>STUDY SET</em></article>
      <article data-kind="service"><span>OPERATIONS</span><h3>Walkthrough → procedure</h3><p>Convert a spoken sequence into ordered instructions with owners and exceptions.</p><em>OPS SET</em></article>
    </div>
  </section>
  <section class="workflow-case ruled"><div><span>02 / CONSULTING</span><h2>A client update that still sounds like the person who led the work.</h2><p>Northline Context Set protects the client name, the working-session terminology and a direct-but-warm register.</p></div><div class="case-flow"><article><span>SPOKEN</span><p>“Maya the prototype is ready and we can do Monday just ask which time is best.”</p></article><i></i><article><span>READY</span><p>“Hi Maya — the prototype is ready. We can run the working session Monday; which time works best for you?”</p></article></div></section>
  <section class="workflow-case reverse ruled"><div><span>03 / PRODUCT</span><h2>A decision record without meeting-transcript sludge.</h2><p>The Product Set knows the structure—decision, evidence, owner, open question—but does not invent what was not spoken.</p></div><div class="decision-note"><span>DECISION / EXPORT FORMAT</span><h3>Ship structured PDF first.</h3><dl><div><dt>Evidence</dt><dd>Three pilot teams need client-ready review files.</dd></div><div><dt>Owner</dt><dd>Lina / Product</dd></div><div><dt>Open</dt><dd>Whether editable export belongs in v1.</dd></div></dl></div></section>
  <section class="workflow-case ruled"><div><span>04 / SUPPORT</span><h2>Direct resolution without erasing the human reply.</h2><p>The Support Set locks product names and expected troubleshooting order while leaving phrasing personal.</p></div><div class="support-reply"><span>CASE / HOTKEY CONFLICT</span><p>Thanks for the screen recording. Riffra is opening, but the shortcut is already assigned to your window manager. Choose a new shortcut under Settings → Capture, then run the test again.</p><footer><b>NEXT STEP INCLUDED</b><b>2 TERMS LOCKED</b></footer></div></section>
  <section class="workflow-builder ruled">${sectionHead('05 / BUILD A SET', 'Start with language your team already uses.')}
    <div class="builder-steps"><article><span>01</span><h3>Add real terms.</h3><p>Names, products, acronyms and spellings.</p></article><article><span>02</span><h3>Name the writing job.</h3><p>Client update, decision note or case reply.</p></article><article><span>03</span><h3>Review actual output.</h3><p>Change the rule, not every final sentence.</p></article></div>
  </section>
  ${close('Shared language without one corporate voice.', 'Teams can distribute terminology and writing rules while every person keeps control of the final phrase.', '/teams/', 'Explore Riffra for teams')}`

const teamsBody = `
  <section class="team-context ruled">${sectionHead('01 / TEAM LANGUAGE', 'Share the terms. Keep the person.', 'Riffra for Teams separates approved vocabulary from personal voice so consistency does not become sameness.')}
    <div class="team-board reveal"><aside><span>WORKSPACE</span><strong>Northline Studio</strong><button class="active">Shared sets</button><button>People</button><button>Permissions</button></aside><div><header><span>SHARED CONTEXT SETS</span><button>New set</button></header><article><i style="--dot:#A5234D"></i><div><h3>Client delivery</h3><p>42 terms · 3 rules · 18 people</p></div><em>ACTIVE</em></article><article><i style="--dot:#E39A37"></i><div><h3>Product decisions</h3><p>28 terms · 4 rules · 12 people</p></div><em>ACTIVE</em></article><article><i style="--dot:#4A7B68"></i><div><h3>Support replies</h3><p>63 terms · 5 rules · 7 people</p></div><em>DRAFT</em></article></div></div>
  </section>
  <section class="governance-section ruled"><div><span>02 / GOVERNANCE</span><h2>Rules should show who changed them and why.</h2><p>Shared Context Sets behave like controlled language assets, not invisible prompt fragments.</p></div><div class="rule-history"><article><span>AUG 14</span><strong>“Working session” added</strong><p>Use instead of “workshop” for Northline delivery.</p><em>LM</em></article><article><span>AUG 09</span><strong>Deadline rule revised</strong><p>Put the date in the first paragraph when action is required.</p><em>RS</em></article><article><span>JUL 28</span><strong>Product names locked</strong><p>Preserve capitalization in mixed-language dictation.</p><em>AK</em></article></div></section>
  <section class="permission-section ruled">${sectionHead('03 / PERMISSIONS', 'Give control to the people who own the language.')}
    <div class="permission-table"><div><span>ROLE</span><span>USE SET</span><span>EDIT TERMS</span><span>PUBLISH RULES</span><span>VIEW HISTORY</span></div><div><strong>Member</strong><b>Yes</b><b>Personal only</b><b>—</b><b>Own changes</b></div><div><strong>Language editor</strong><b>Yes</b><b>Yes</b><b>Propose</b><b>Workspace</b></div><div><strong>Admin</strong><b>Yes</b><b>Yes</b><b>Approve</b><b>Workspace</b></div></div>
  </section>
  <section class="adoption-section ruled">${sectionHead('04 / ADOPTION', 'Start with one repeated writing job, not an enterprise rollout.')}
    <ol><li><b>Week 01</b><span><strong>Choose one workflow.</strong><p>Find a message people already write several times a day.</p></span></li><li><b>Week 02</b><span><strong>Review real corrections.</strong><p>Add the terms and rules that remove repeated editing.</p></span></li><li><b>Week 03</b><span><strong>Publish one shared set.</strong><p>Keep personal phrasing outside the controlled layer.</p></span></li><li><b>Week 04</b><span><strong>Decide whether to expand.</strong><p>Use quality and adoption evidence, not a vanity WPM counter.</p></span></li></ol>
  </section>
  <section class="team-cta ruled"><div><span>05 / WORKING SESSION</span><h2>Bring ten messages your team already sends.</h2><p>A useful evaluation begins with vocabulary, corrections and workflow—not a generic demo deck.</p></div><form data-demo-form><label for="team-email">Work email</label><input id="team-email" type="email" required placeholder="you@company.com"><label for="team-note">Which writing job should improve first?</label><textarea id="team-note" required rows="4" placeholder="Client updates, product decisions, support replies…"></textarea><button class="button button-ink" type="submit">Request a team session</button><p class="form-status" aria-live="polite"></p></form></section>`

const securityBody = `
  <section class="security-path ruled">${sectionHead('01 / INTENDED DATA PATH', 'A product promise should be inspectable as a system.', 'Riffra is fictional; this page specifies the evidence a production company must publish and avoids claiming audits or certifications that do not exist.')}
    ${dataFlow}
  </section>
  <section class="control-ledger ruled">${sectionHead('02 / CONTROL LEDGER', 'The workspace chooses what persists.')}
    <div class="ledger"><article><span>AUDIO</span><h3>Capture boundary</h3><p>Audio begins only during an active capture mode and is not used to train shared models.</p><em>PRODUCT REQUIREMENT</em></article><article><span>TRANSCRIPT</span><h3>Session retention</h3><p>Workspace policy chooses history off, local-only or synced history.</p><em>USER CONTROL</em></article><article><span>CONTEXT</span><h3>Scoped language</h3><p>Context Sets are separated by workspace, role and explicit membership.</p><em>ACCESS CONTROL</em></article><article><span>EXPORT</span><h3>Portable record</h3><p>People can export their dictionary, rules and approved writing history.</p><em>PORTABILITY</em></article></div>
  </section>
  <section class="threat-section ruled"><div><span>03 / FAILURE QUESTIONS</span><h2>Security review starts with the uncomfortable cases.</h2></div><div class="threat-list"><details><summary>What happens if shaping fails after capture?<i></i></summary><p>The rough transcript remains available locally, nothing is pasted automatically and retry is a deliberate action.</p></details><details><summary>Can a team rule silently replace personal language?<i></i></summary><p>Published team rules are labeled in the Review Strip. A person can inspect which rule changed the proposal before approval.</p></details><details><summary>What happens when access to a shared set is removed?<i></i></summary><p>The set is no longer available for new drafts. Personal content and exported records follow the workspace retention policy.</p></details><details><summary>Which evidence would be required before launch?<i></i></summary><p>Data-flow diagrams, subprocessor list, retention schedule, encryption details, incident process and any verified audit reports.</p></details></div></section>
  <section class="evidence-register ruled">${sectionHead('04 / EVIDENCE REGISTER', 'No badge without the document behind it.')}
    <div><article><span>DATA FLOW</span><strong>Architecture and regional processing</strong><em>REQUIRED</em></article><article><span>RETENTION</span><strong>Workspace modes and deletion windows</strong><em>REQUIRED</em></article><article><span>SUBPROCESSORS</span><strong>Purpose, region and change notice</strong><em>REQUIRED</em></article><article><span>AUDIT</span><strong>Verified report, scope and period</strong><em>NOT CLAIMED</em></article></div>
  </section>
  ${close('Evaluate the product with the security model in view.', 'The product walkthrough keeps capture, context, review and release visible as one connected path.', '/product/', 'Inspect the product')}`

const pricingBody = `
  <section class="pricing-switch ruled"><div><span>01 / BILLING</span><h2>Price the writing layer you actually need.</h2></div><div class="billing-toggle" role="group" aria-label="Billing frequency"><button class="active" data-billing="annual">Annual <em>save 20%</em></button><button data-billing="monthly">Monthly</button></div></section>
  <section class="plan-grid ruled" data-pricing>
    <article><span>STARTER</span><h3>Review before paste.</h3><div><strong data-price data-annual="0" data-monthly="0">$0</strong><small>/ month</small></div><p>For trying the complete personal workflow.</p><ul><li>2,500 words / week</li><li>2 Context Sets</li><li>Review Strip</li><li>Selected-text actions</li></ul><button class="button button-paper" data-plan="Starter">Download free</button></article>
    <article class="featured"><span>PERSONAL</span><h3>Your working language, everywhere.</h3><div><strong data-price data-annual="12" data-monthly="15">$12</strong><small>/ month</small></div><p>For professionals who write across several apps.</p><ul><li>Unlimited dictation</li><li>5 Context Sets</li><li>Personal dictionary</li><li>Priority shaping</li></ul><button class="button button-accent" data-plan="Personal">Choose Personal</button></article>
    <article><span>TEAM</span><h3>Shared terms. Personal voice.</h3><div><strong data-price data-annual="24" data-monthly="30">$24</strong><small>/ person / month</small></div><p>For controlled language across a working team.</p><ul><li>Everything in Personal</li><li>Shared Context Sets</li><li>Roles and publishing</li><li>Language change history</li></ul><button class="button button-ink" data-plan="Team">Choose Team</button></article>
  </section>
  <p class="pricing-status" data-pricing-status aria-live="polite"></p>
  <section class="comparison-section ruled">${sectionHead('02 / COMPARE', 'The limit should be visible before checkout.')}
    <div class="comparison-table"><div><span>CAPABILITY</span><span>STARTER</span><span>PERSONAL</span><span>TEAM</span></div><div><strong>Weekly words</strong><b>2,500</b><b>Unlimited</b><b>Unlimited</b></div><div><strong>Context Sets</strong><b>2</b><b>5</b><b>Unlimited shared</b></div><div><strong>Review Strip</strong><b>Included</b><b>Included</b><b>Included</b></div><div><strong>Shared terminology</strong><b>—</b><b>—</b><b>Included</b></div><div><strong>Rule approvals</strong><b>—</b><b>—</b><b>Included</b></div><div><strong>Security review</strong><b>Public docs</b><b>Public docs</b><b>Workspace review</b></div></div>
  </section>
  <section class="pricing-faq ruled">${sectionHead('03 / BUYING QUESTIONS', 'Know what changes before you commit.')}
    <div class="threat-list"><details><summary>Can I use Starter without a card?<i></i></summary><p>Yes. Starter is specified as a complete free workflow with a weekly word limit and no card requirement.</p></details><details><summary>What counts as a team member?<i></i></summary><p>Anyone assigned access to shared Context Sets. Billing would follow active members, with deactivated accounts removed at the next cycle.</p></details><details><summary>Can I export my dictionary and rules?<i></i></summary><p>Yes. Portability is a product requirement across every paid plan.</p></details><details><summary>Are these prices real?<i></i></summary><p>No. Riffra is a fictional competitor build. Prices are part of the product and design demonstration.</p></details></div>
  </section>
  ${close('Start with your own rough draft.', 'The product lab shows the complete capture, context, review and paste loop before any signup.', '/product/', 'Open the product lab')}`

const journalBody = `
  <section class="journal-feature ruled"><a href="/journal/voice-is-a-draft/"><span>FEATURED THESIS / 8 MIN</span><h2>Voice is not a shortcut. It is a first draft.</h2><p>The best voice tool is not the one that removes revision. It is the one that makes revision fast, visible and yours.</p><em>Read the thesis${arrow}</em></a><div class="editorial-figure"><i>ROUGH</i><p>thought is faster than the sentence but the sentence still needs a shape</p><b>REVIEW</b><p>Thought moves faster than a sentence. The sentence still needs shape.</p></div></section>
  <section class="journal-index ruled">${sectionHead('01 / INDEX', 'Notes on voice, writing and product control.')}
    <div class="filter-row" data-filter-group><button class="active" data-filter="all">All</button><button data-filter="thesis">Thesis</button><button data-filter="product">Product</button><button data-filter="practice">Practice</button></div>
    <div class="article-list" data-filter-list><a href="/journal/voice-is-a-draft/" data-kind="thesis"><span>THESIS / 8 MIN</span><h3>Voice is not a shortcut. It is a first draft.</h3><time>August 14, 2026</time></a><article data-kind="practice"><span>PRACTICE / 6 MIN</span><h3>Build a dictionary that knows when to stay quiet.</h3><time>August 08, 2026</time></article><article data-kind="product"><span>PRODUCT / 4 MIN</span><h3>The pause between speaking and sending.</h3><time>July 29, 2026</time></article><article data-kind="practice"><span>PRACTICE / 7 MIN</span><h3>Client language belongs to the client context.</h3><time>July 19, 2026</time></article><article data-kind="thesis"><span>THESIS / 5 MIN</span><h3>Speed is a weak substitute for control.</h3><time>July 11, 2026</time></article><article data-kind="product"><span>PRODUCT / 9 MIN</span><h3>Why the rough transcript should remain available.</h3><time>June 26, 2026</time></article></div>
  </section>
  <section class="newsletter-section ruled"><div><span>02 / RIFFRA NOTE</span><h2>One useful observation about writing by voice.</h2><p>No growth tips or invented research. Product notes, interface decisions and working-language practice.</p></div><form data-demo-form><label for="journal-email">Email address</label><div><input id="journal-email" type="email" required placeholder="you@example.com"><button class="button button-ink" type="submit">Subscribe</button></div><p class="form-status" aria-live="polite"></p></form></section>
  ${close('Put the thesis beside the product.', 'See how review-before-paste behaves with an actual client update.', '/product/', 'Open the product lab')}`

const articleBody = `
  <article class="article-shell ruled">
    <aside><span>CONTENTS</span><a href="#draft">The spoken draft</a><a href="#control">Control is not friction</a><a href="#context">Context is scoped</a><a href="#product">The product test</a></aside>
    <div class="article-body"><p class="article-deck">The keyboard is not the only place writing begins. But removing the keyboard does not remove the need to decide what a sentence means.</p>
      <div class="article-meta"><span>RIFFRA PRODUCT STUDIO</span><time>August 14, 2026</time><span>8 minute read</span></div>
      <section id="draft"><h2>The spoken draft</h2><p>Speech arrives with more than words. It carries hesitation, sequence, emphasis and the memory of what happened just before the sentence began. A useful voice tool should preserve the thought without pretending every spoken fragment belongs in the final message.</p><p>That makes voice less like a finished output and more like a first draft: fast enough to catch the whole idea, rough enough to deserve review.</p><blockquote>Faster capture matters. Visible revision matters more.</blockquote></section>
      <figure class="article-transform"><div><span>SPOKEN</span><p>the prototype is ready and maya can choose monday or tuesday just make sure we mention the review first</p></div><i></i><div><span>COMPOSED</span><p>The prototype is ready. After the review, Maya can choose a working session on Monday or Tuesday.</p></div><figcaption>One thought, shaped without hiding its source.</figcaption></figure>
      <section id="control"><h2>Control is not friction</h2><p>Product teams often describe every pause as friction. That is a mistake when the action is irreversible or social. Sending a message, replacing selected text or publishing a decision deserves a moment where the person can see what will happen.</p><p>The right pause is short, informative and reversible. It shows the rough phrase, the proposed phrase and the reason a rule changed it. It does not ask the user to become an editor of model internals.</p></section>
      <section id="context"><h2>Context is scoped</h2><p>A single global prompt cannot represent how one person writes to a client, records a product decision and answers a support case. Context should belong to a named working room with explicit vocabulary and format rules.</p><p>That scope protects both consistency and voice. The team can agree that a product name must keep its capitalization without deciding that every person must write with the same cadence.</p></section>
      <div class="article-rule"><span>PRODUCT PRINCIPLE</span><strong>Share terminology. Keep authorship personal.</strong></div>
      <section id="product"><h2>The product test</h2><p>Take one rough client update and follow it through the whole system. Can you see what was captured? Can you tell which context was active? Can you understand what changed? Can you keep the original? Can you approve the exact final text?</p><p>If any answer is no, speed has become theatre. The product is asking the user to trust a result they cannot inspect.</p></section>
      <footer><span>Next note</span><a href="/journal/">A dictionary that knows when to stay quiet${arrow}</a></footer>
    </div>
  </article>`

const artifacts = {
  home: reviewStrip,
  product: composer,
  workflows: '<div class="hero-index"><span>CLIENT</span><strong>DEBRIEF → UPDATE</strong><span>PRODUCT</span><strong>DISCUSSION → DECISION</strong><span>SERVICE</span><strong>CASE → REPLY</strong></div>',
  teams: '<div class="hero-team"><span>SHARED LANGUAGE</span><strong>42 approved terms</strong><i></i><span>PERSONAL VOICE</span><strong>18 individual profiles</strong><i></i><em>ONE REVIEW STEP</em></div>',
  security: '<div class="hero-security"><header><span>LAUNCH EVIDENCE</span><strong>SPECIFICATION / NOT CLAIMS</strong></header><div><b>DATA FLOW</b><p>Architecture + regions</p><em>REQUIRED</em></div><div><b>RETENTION</b><p>Modes + deletion windows</p><em>REQUIRED</em></div><div><b>AUDIT</b><p>Verified scope + period</p><em>NOT CLAIMED</em></div></div>',
  pricing: '<div class="hero-price"><span>PERSONAL / ANNUAL</span><strong>$12</strong><small>per month</small><p>Unlimited dictation<br>Five Context Sets<br>Review before paste</p></div>',
  journal: '<div class="hero-folio"><span>FIELD NOTE / 07</span><strong>VOICE IS A DRAFT</strong><i>ROUGH</i><p>think it through out loud</p><i>READY</i><p>Think it through out loud.</p></div>',
  article: '<div class="hero-folio article-folio"><span>THESIS / 01</span><strong>ROUGH<br>→<br>READY</strong><small>8 MINUTE READ</small></div>',
}

export const pages: RiffraPage[] = [
  { slug: '', nav: 'Home', title: 'Riffra — Speak in rough. Send in your voice.', description: 'Riffra is a fictional desktop voice-composition tool with visible review before paste.', eyebrow: 'VOICE COMPOSITION / REVIEW BEFORE PASTE', headline: 'Speak in rough. Send in your voice.', lede: 'Riffra turns natural speech into context-aware writing you can see, shape and approve before it enters any app.', artifact: artifacts.home, body: homeBody, theme: 'blush' },
  { slug: 'product', nav: 'Product', title: 'Product — Riffra', description: 'Explore Riffra capture, Context Sets, Review Strip and selected-text actions.', eyebrow: 'PRODUCT / ONE COMPLETE DRAFT', headline: 'The whole thought. Then the right sentence.', lede: 'Capture naturally, apply the working context, inspect the revision and approve the exact text that leaves Riffra.', artifact: artifacts.product, body: productBody, theme: 'paper' },
  { slug: 'workflows', nav: 'Workflows', title: 'Workflows — Riffra', description: 'Voice-composition workflows for consulting, product, support, sales, research and operations.', eyebrow: 'WORKFLOWS / START WITH THE WRITING JOB', headline: 'Different rooms need different language.', lede: 'Riffra scopes vocabulary and structure to the work in front of you without replacing your personal phrasing.', artifact: artifacts.workflows, body: workflowsBody, theme: 'blush' },
  { slug: 'teams', nav: 'Teams', title: 'Teams — Riffra', description: 'Shared terminology and writing rules without one synthetic corporate voice.', eyebrow: 'TEAMS / SHARED TERMS, PERSONAL VOICE', headline: 'Consistency without sameness.', lede: 'Publish approved terminology and writing rules while every person keeps control of the sentence they send.', artifact: artifacts.teams, body: teamsBody, theme: 'paper' },
  { slug: 'security', nav: 'Security', title: 'Security — Riffra', description: 'Inspect the intended Riffra data path, controls, retention choices and evidence requirements.', eyebrow: 'SECURITY / NO BADGE WITHOUT EVIDENCE', headline: 'Trust the path, not the badge.', lede: 'This fictional security model makes capture, shaping, review, retention and required launch evidence explicit.', artifact: artifacts.security, body: securityBody, theme: 'ink' },
  { slug: 'pricing', nav: 'Pricing', title: 'Pricing — Riffra', description: 'Compare fictional Riffra Starter, Personal and Team plans.', eyebrow: 'PRICING / COMPLETE LIMITS', headline: 'Start with your draft. Add the shared layer later.', lede: 'Try the complete review flow for free, then pay for personal context or controlled team language.', artifact: artifacts.pricing, body: pricingBody, theme: 'blush' },
  { slug: 'journal', nav: 'Journal', title: 'Journal — Riffra', description: 'Notes on writing by voice, review, context and product control.', eyebrow: 'JOURNAL / PRODUCT STUDIO NOTES', headline: 'Writing starts before the keyboard.', lede: 'Theses, product decisions and practical notes from a fictional studio building review-before-paste.', artifact: artifacts.journal, body: journalBody, theme: 'paper' },
  { slug: 'journal/voice-is-a-draft', title: 'Voice is not a shortcut. It is a first draft. — Riffra', description: 'A Riffra thesis on voice capture, visible revision and user control.', eyebrow: 'THESIS / AUGUST 14, 2026', headline: 'Voice is not a shortcut. It is a first draft.', lede: 'The best voice tool does not remove revision. It makes revision fast, visible and yours.', artifact: artifacts.article, body: articleBody, theme: 'paper' },
]

const primaryNav = pages.filter((page) => page.nav && page.slug)
const pathFor = (slug: string) => slug ? `/${slug}/` : '/'

export const renderPage = (page: RiffraPage) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${page.description}">
  <meta name="theme-color" content="${page.theme === 'ink' ? '#16322C' : '#F1E2DE'}">
  <link rel="canonical" href="http://127.0.0.1:4390${pathFor(page.slug)}">
  <link rel="icon" type="image/png" href="/assets/brand/logo-mark.png">
  <link rel="stylesheet" href="/assets/site.css">
  <title>${page.title}</title>
</head>
<body data-route="${page.slug || 'home'}" data-theme="${page.theme || 'blush'}">
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="reading-progress" aria-hidden="true"><span></span></div>
  <header class="site-header">
    <a class="brand" href="/" aria-label="Riffra home"><img src="/assets/brand/logo-primary.png" alt="Riffra"></a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav"><i></i><i></i><span class="sr-only">Menu</span></button>
    <nav id="site-nav" aria-label="Primary navigation">
      ${primaryNav.map((item) => `<a href="${pathFor(item.slug)}"${page.slug === item.slug || (item.slug === 'journal' && page.slug.startsWith('journal/')) ? ' aria-current="page"' : ''}>${item.nav}</a>`).join('')}
    </nav>
    <a class="header-action" href="/product/">Download free${arrow}</a>
  </header>
  <main id="main">
    <section class="page-hero ${page.slug ? 'inner-hero' : 'home-hero'}">
      <div class="hero-copy"><span>${page.eyebrow}</span><h1>${page.headline}</h1><p>${page.lede}</p><div class="hero-actions"><a class="button button-accent" href="/product/">Download Riffra free${arrow}</a><small>Fictional product · no card</small></div></div>
      <div class="hero-artifact reveal">${page.artifact}</div>
      <aside class="hero-margin"><span>WORKING PREMISE</span><p>Voice is not magic output. It is a draft you can see, shape and approve.</p></aside>
    </section>
    ${page.body}
  </main>
  <footer class="site-footer">
    <div class="footer-identity"><img src="/assets/brand/logo-primary.png" alt="Riffra"><p>Speak in rough.<br>Send in your voice.</p></div>
    <div><span>PRODUCT</span><a href="/product/">Product</a><a href="/workflows/">Workflows</a><a href="/pricing/">Pricing</a></div>
    <div><span>ORGANIZATION</span><a href="/teams/">Teams</a><a href="/security/">Security</a><a href="/journal/">Journal</a></div>
    <div><span>TRY THE IDEA</span><a href="/product/">Product lab</a><a href="/pricing/">Download free</a><a href="mailto:hello@riffra.example">Contact</a></div>
    <small>FICTIONAL COMPETITOR CONCEPT / DESIGNED AND BUILT FROM THE APPROVED PROMPT / 2026</small>
  </footer>
  <script src="/assets/site.js" defer></script>
</body>
</html>`

export { arrow, spark }
