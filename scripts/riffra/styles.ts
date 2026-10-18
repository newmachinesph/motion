export const styles = `
@font-face{font-family:Boldonse;src:url('/assets/fonts/Boldonse-Regular.ttf') format('truetype');font-style:normal;font-weight:400;font-display:swap}
@font-face{font-family:Work Sans;src:url('/assets/fonts/WorkSans-Regular.ttf') format('truetype');font-style:normal;font-weight:400;font-display:swap}
@font-face{font-family:Work Sans;src:url('/assets/fonts/WorkSans-Bold.ttf') format('truetype');font-style:normal;font-weight:700;font-display:swap}
@font-face{font-family:Red Hat Mono;src:url('/assets/fonts/RedHatMono-Regular.ttf') format('truetype');font-style:normal;font-weight:400;font-display:swap}
@font-face{font-family:Red Hat Mono;src:url('/assets/fonts/RedHatMono-Bold.ttf') format('truetype');font-style:normal;font-weight:700;font-display:swap}

:root{
  --blush:#F1E2DE;--paper:#FFF9F7;--ink:#16322C;--slate:#4E5F5A;--berry:#A5234D;--line:#C8B5B0;
  --ochre:#E39A37;--green:#4A7B68;--soft-ink:#27443D;--display:Boldonse,Arial Black,sans-serif;
  --body:Work Sans,Arial,sans-serif;--mono:Red Hat Mono,Consolas,monospace;--rail:min(92vw,1400px);
}
*{box-sizing:border-box}
html{scroll-behavior:smooth;background:var(--ink)}
body{margin:0;background:var(--blush);color:var(--ink);font-family:var(--body);font-size:16px;line-height:1.55;overflow-x:hidden}
body[data-theme="paper"]{background:var(--paper)}
body[data-theme="ink"]{background:var(--ink);color:var(--paper)}
button,input,textarea{font:inherit}
button,a{color:inherit}
a{text-decoration:none}
img{display:block;max-width:100%}
svg{display:block;width:18px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
button{cursor:pointer}
::selection{background:var(--berry);color:#fff}
:focus-visible{outline:2px solid var(--berry);outline-offset:4px}
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
.skip-link{position:fixed;top:12px;left:12px;z-index:1000;padding:10px 14px;background:var(--paper);transform:translateY(-150%)}
.skip-link:focus{transform:none}
.reading-progress{position:fixed;top:0;left:0;right:0;height:3px;z-index:200;background:transparent}
.reading-progress span{display:block;width:100%;height:100%;background:var(--berry);transform:scaleX(0);transform-origin:left}

.site-header{position:sticky;top:0;z-index:100;display:grid;grid-template-columns:230px 1fr auto;align-items:center;width:100%;height:72px;padding:0 max(24px,calc((100vw - 1400px)/2 + 30px));border-bottom:1px solid color-mix(in srgb,var(--line) 80%,transparent);background:color-mix(in srgb,var(--blush) 90%,transparent);backdrop-filter:blur(16px)}
body[data-theme="paper"] .site-header{background:color-mix(in srgb,var(--paper) 90%,transparent)}
body[data-theme="ink"] .site-header{background:color-mix(in srgb,var(--ink) 92%,transparent);border-color:#ffffff22}
.brand{display:inline-flex;width:134px;height:42px;align-items:center;overflow:hidden}
.brand img{width:132px;height:auto}
body[data-theme="ink"] .brand img{filter:brightness(0) invert(1)}
#site-nav{display:flex;justify-content:center;gap:28px}
#site-nav a{position:relative;color:var(--slate);font-size:13px;letter-spacing:-.01em}
body[data-theme="ink"] #site-nav a{color:#d9e2df}
#site-nav a::after{position:absolute;right:0;bottom:-7px;left:0;height:2px;background:var(--berry);content:"";transform:scaleX(0);transform-origin:right;transition:transform .2s ease}
#site-nav a:hover::after,#site-nav a[aria-current="page"]::after{transform:scaleX(1);transform-origin:left}
.header-action{display:flex;align-items:center;gap:10px;min-height:40px;padding:0 14px;border:1px solid currentColor;background:var(--ink);color:var(--paper);font:700 11px/1 var(--mono);text-transform:uppercase;letter-spacing:.04em;transition:transform .15s ease,background .15s ease}
.header-action:hover{background:var(--berry);border-color:var(--berry)}
.header-action:active,.button:active{transform:scale(.98)}
body[data-theme="ink"] .header-action{background:var(--paper);color:var(--ink)}
.nav-toggle{display:none}

main,.site-footer{width:100%;max-width:1400px;margin:0 auto;border-right:1px solid var(--line);border-left:1px solid var(--line)}
body[data-theme="ink"] main,body[data-theme="ink"] .site-footer{border-color:#ffffff1f}
.page-hero{position:relative;display:grid;grid-template-columns:repeat(7,minmax(0,1fr));grid-template-rows:auto auto;min-height:720px;border-bottom:1px solid var(--line);overflow:hidden}
body[data-theme="ink"] .page-hero{border-color:#ffffff1f}
.hero-copy{grid-column:1/5;align-self:start;padding:94px 42px 56px}
.hero-copy>span,.section-head>span,.context-copy>span,.selection-copy>span,.pricing-preview>div>span,.journal-feature>a>span,.workflow-case>div>span,.governance-section>div>span,.security-path>span,.team-cta>div>span,.pricing-switch>div>span,.article-meta,.hero-margin>span{font:700 10px/1.35 var(--mono);letter-spacing:.075em;text-transform:uppercase}
.hero-copy>span{display:inline-block;margin-bottom:22px;color:var(--berry)}
body[data-theme="ink"] .hero-copy>span{color:#F4ABBF}
.hero-copy h1{max-width:12ch;margin:0;font:400 clamp(48px,6vw,86px)/.96 var(--display);letter-spacing:-.04em;text-wrap:balance}
.inner-hero .hero-copy h1{font-size:clamp(42px,5.2vw,74px)}
.hero-copy>p{max-width:54ch;margin:30px 0 0;color:var(--slate);font-size:18px;line-height:1.55}
body[data-theme="ink"] .hero-copy>p{color:#c1cfca}
.hero-actions{display:flex;align-items:center;gap:16px;margin-top:32px}
.hero-actions small{color:var(--slate);font:400 9px/1.4 var(--mono);text-transform:uppercase}
body[data-theme="ink"] .hero-actions small{color:#afbfba}
.button{display:inline-flex;align-items:center;justify-content:center;gap:12px;min-height:46px;padding:0 17px;border:1px solid transparent;background:transparent;font:700 11px/1 var(--mono);letter-spacing:.035em;text-transform:uppercase;transition:transform .15s ease,background .15s ease,color .15s ease,border-color .15s ease}
.button-accent{background:var(--berry);color:#fff}
.button-accent:hover{background:var(--ink)}
.button-ink{background:var(--ink);color:var(--paper)}
.button-ink:hover{background:var(--berry)}
.button-paper{border-color:var(--ink);background:var(--paper);color:var(--ink)}
.button-paper:hover{background:var(--ink);color:var(--paper)}
body[data-theme="ink"] .button-accent:hover{background:var(--paper);color:var(--ink)}
.hero-artifact{grid-column:1/-1;align-self:end;padding:0 42px 42px}
.hero-margin{position:absolute;top:108px;right:34px;width:155px;padding-left:14px;border-left:1px solid var(--line)}
.hero-margin p{margin:10px 0 0;color:var(--slate);font-size:11px;line-height:1.5}
body[data-theme="ink"] .hero-margin{border-color:#ffffff33}body[data-theme="ink"] .hero-margin p{color:#afbfba}

.review-strip{border:1px solid var(--ink);background:var(--paper);box-shadow:0 24px 60px #43252b18;color:var(--ink)}
.strip-toolbar{display:grid;grid-template-columns:1fr auto auto;align-items:center;min-height:42px;padding:0 14px;border-bottom:1px solid var(--ink);font:700 9px/1 var(--mono);letter-spacing:.05em}
.strip-toolbar>span{display:flex;align-items:center;gap:8px}.strip-toolbar>span i{width:7px;height:7px;border-radius:50%;background:var(--berry)}
.strip-toolbar small{margin-left:30px;color:var(--green)}
.strip-track{display:grid;grid-template-columns:1fr 160px 1fr;min-height:230px}
.speech-slip{display:flex;flex-direction:column;justify-content:space-between;padding:26px}
.speech-slip>span,.context-stamp>span,.strip-controls{font:700 9px/1.35 var(--mono);letter-spacing:.06em;text-transform:uppercase}
.speech-slip p{max-width:30ch;margin:20px 0;font-size:clamp(18px,2.1vw,29px);line-height:1.24;letter-spacing:-.03em}
.raw-slip{background:var(--blush)}
.raw-slip p{color:var(--slate)}
.final-slip{background:var(--ink);color:var(--paper)}
.final-slip em{font:400 9px/1 var(--mono);color:#cbd7d3}
.context-stamp{display:grid;align-content:center;gap:10px;padding:20px;border-right:1px solid var(--ink);border-left:1px solid var(--ink);background:#ECD39E;text-align:center}
.context-stamp strong{font-size:18px}.context-stamp small{font:400 9px/1.6 var(--mono)}
.strip-controls{display:grid;grid-template-columns:190px 1fr auto;align-items:center;gap:18px;min-height:62px;padding:10px 14px;border-top:1px solid var(--ink)}
.voice-button,.approve-button{display:flex;align-items:center;gap:10px;min-height:38px;padding:0 12px;border:1px solid var(--ink);background:transparent;font:700 9px/1 var(--mono);text-transform:uppercase}
.voice-button i{width:10px;height:10px;border-radius:50%;background:var(--berry);box-shadow:0 0 0 0 #a5234d55;transition:box-shadow .2s ease}
.voice-button.is-recording i{box-shadow:0 0 0 8px #a5234d22;animation:pulse 1s infinite}.voice-button.is-recording{background:var(--blush)}
.strip-controls>p{margin:0;color:var(--slate);font-size:9px}.approve-button{border:0;background:var(--ink);color:var(--paper)}
.review-strip.is-approved .final-slip{background:var(--green)}
@keyframes pulse{50%{box-shadow:0 0 0 13px #a5234d0a}}

.ruled{border-bottom:1px solid var(--line)}
body[data-theme="ink"] .ruled{border-color:#ffffff1f}
.section-head{display:grid;grid-template-columns:150px 1.2fr 1fr;gap:34px;align-items:start;padding:78px 42px 48px}
.section-head>span{padding-top:10px;color:var(--berry)}
.section-head h2,.context-copy h2,.selection-copy h2,.pricing-preview h2,.workflow-case h2,.governance-section h2,.security-path h2,.team-cta h2,.pricing-switch h2,.journal-feature h2{margin:0;font:400 clamp(34px,4.2vw,62px)/1.02 var(--display);letter-spacing:-.045em;text-wrap:balance}
.section-head p{max-width:58ch;margin:8px 0 0;color:var(--slate);font-size:15px;line-height:1.7}
body[data-theme="ink"] .section-head p{color:#b7c7c2}
.intent-strip{display:flex;justify-content:space-between;gap:20px;padding:14px 42px;border-bottom:1px solid var(--line);font:700 9px/1.2 var(--mono);letter-spacing:.06em}

.clarity-layout{display:grid;grid-template-columns:2fr 5fr;min-height:620px;padding:0 42px 84px}
.clarity-layout ol{margin:0;padding:0;border-top:1px solid var(--ink);list-style:none}
.clarity-layout li{display:grid;gap:5px;padding:18px 0;border-bottom:1px solid var(--line);color:var(--slate);cursor:pointer;transition:padding .2s,color .2s}
.clarity-layout li b{font-size:15px}.clarity-layout li span{font-size:11px;line-height:1.45}.clarity-layout li.is-active{padding-left:14px;color:var(--berry)}
.clarity-stage{position:sticky;top:90px;align-self:start;padding:0 0 0 44px}
.clarity-sheet{min-height:430px;border:1px solid var(--ink);background:var(--paper);box-shadow:18px 18px 0 #a5234d;color:var(--ink);transition:transform .45s cubic-bezier(.16,1,.3,1),box-shadow .45s ease}
.clarity-sheet header,.clarity-sheet footer{display:flex;justify-content:space-between;gap:15px;padding:15px 18px;border-bottom:1px solid var(--ink);font:700 9px/1 var(--mono)}
.clarity-copy{display:grid;grid-template-columns:1fr 36px 1fr;align-items:center;gap:16px;min-height:330px;padding:30px}
.clarity-copy p{margin:0;font-size:clamp(19px,2.1vw,31px);line-height:1.25;letter-spacing:-.035em}.clarity-rough{color:var(--slate);text-decoration:line-through;text-decoration-thickness:1px}.clarity-copy i{height:1px;background:var(--berry);position:relative}.clarity-copy i::after{position:absolute;top:-4px;right:0;width:8px;height:8px;border-top:1px solid var(--berry);border-right:1px solid var(--berry);transform:rotate(45deg);content:""}
.clarity-sheet footer{border-top:1px solid var(--ink);border-bottom:0}.clarity-sheet footer strong{color:var(--green)}
.clarity-layout[data-step="1"] .clarity-sheet{transform:translateY(-6px) rotate(.3deg);box-shadow:22px 14px 0 #E39A37}.clarity-layout[data-step="2"] .clarity-sheet{transform:translateY(-10px);box-shadow:14px 22px 0 #4A7B68}.clarity-layout[data-step="3"] .clarity-sheet{transform:translateY(-12px) rotate(-.2deg);box-shadow:20px 20px 0 var(--ink)}

.context-section,.selection-section,.workflow-case,.governance-section,.team-cta,.pricing-preview{display:grid;grid-template-columns:3fr 4fr;min-height:620px}
.context-copy,.selection-copy,.workflow-case>div:first-child,.governance-section>div:first-child,.team-cta>div:first-child,.pricing-preview>div:first-child{padding:84px 42px}
.context-copy>span,.selection-copy>span,.workflow-case>div>span,.governance-section>div>span,.team-cta>div>span,.pricing-preview>div>span{display:block;margin-bottom:18px;color:var(--berry)}
.context-copy p,.selection-copy p,.workflow-case>div>p,.governance-section>div>p,.team-cta>div>p,.pricing-preview>div>p{max-width:48ch;color:var(--slate)}
.text-link{display:inline-flex;align-items:center;gap:10px;margin-top:20px;border-bottom:1px solid currentColor;font:700 10px/2 var(--mono);text-transform:uppercase}.text-link svg{width:15px}
.context-section>div:last-child,.product-context>div:last-child{display:grid;place-items:center;padding:60px 42px;background:var(--ink)}
.context-board{width:100%;max-width:650px;border:1px solid #ffffff44;background:#203F37;color:var(--paper)}
.context-board>header{display:flex;justify-content:space-between;padding:14px;border-bottom:1px solid #ffffff44;font:700 9px/1 var(--mono)}
.context-board>[role="tablist"]{display:grid;grid-template-columns:repeat(3,1fr);border-bottom:1px solid #ffffff44}
.context-board [role="tab"]{display:flex;align-items:center;gap:8px;padding:14px;border:0;border-right:1px solid #ffffff44;background:transparent;color:#dce7e3;font-size:11px}.context-board [role="tab"]:last-child{border-right:0}.context-board [role="tab"] i{width:7px;height:7px;border-radius:50%;background:var(--dot)}.context-board [role="tab"][aria-selected="true"]{background:var(--paper);color:var(--ink)}
.context-panel{display:none;min-height:300px;padding:34px}.context-panel.is-active{display:block}.context-panel>span{font:700 9px/1 var(--mono);color:#F0B5C5}.context-panel h3{max-width:17ch;margin:20px 0 38px;font-size:30px;line-height:1.07;letter-spacing:-.035em}.context-panel dl{margin:0}.context-panel dl div{display:grid;grid-template-columns:110px 1fr;padding:11px 0;border-top:1px solid #ffffff26}.context-panel dt{font:700 9px/1.5 var(--mono);color:#afbfba}.context-panel dd{margin:0;font-size:12px}

.workflow-bands{padding-bottom:76px}.workflow-grid{display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:220px 220px;gap:10px;padding:0 42px}.workflow-card{display:flex;flex-direction:column;justify-content:space-between;padding:24px;border:1px solid var(--ink);background:var(--paper);transition:transform .18s ease}.workflow-card:hover{transform:translateY(-5px)}.workflow-card.tall{grid-column:span 2;grid-row:span 2;background:#ECD39E}.workflow-card.raspberry{grid-column:span 2;background:var(--berry);color:#fff}.workflow-card.ink{background:var(--ink);color:var(--paper)}.workflow-card>span{font:700 9px/1 var(--mono)}.workflow-card h3{max-width:22ch;margin:20px 0;font-size:clamp(22px,2.4vw,36px);line-height:1.08;letter-spacing:-.04em}.workflow-card.tall h3{font:400 clamp(34px,4vw,58px)/1 var(--display)}.workflow-card p{max-width:38ch;color:var(--slate)}.workflow-card em{display:flex;align-items:center;gap:8px;font:700 9px/1 var(--mono);font-style:normal;text-transform:uppercase}.workflow-card em svg{width:14px}
.selection-section{background:var(--paper)}.selection-demo{align-self:center;margin:60px 42px;padding:20px;border:1px solid var(--ink);background:#E8E5FF}.selection-demo>div{padding:22px;border:1px solid var(--ink);background:var(--paper)}.selection-demo span{font:700 8px/1 var(--mono)}.selection-demo p{margin:15px 0 0;font-size:20px;line-height:1.35}.selection-demo>button{display:block;width:86%;margin:-1px auto;padding:14px;border:1px solid var(--ink);background:var(--ink);color:var(--paper);font:700 10px/1.4 var(--mono);text-align:left}.selection-result{opacity:.45;transform:translateY(8px);transition:opacity .3s,transform .3s}.selection-result div{display:flex;justify-content:flex-end;gap:8px;margin-top:20px}.selection-result button{padding:8px 10px;border:1px solid var(--ink);background:transparent;font:700 8px/1 var(--mono)}.selection-result button.active{background:var(--berry);border-color:var(--berry);color:#fff}.selection-demo.is-transformed .selection-result{opacity:1;transform:none}

.privacy-section{padding-bottom:72px;background:var(--ink);color:var(--paper)}.privacy-section .section-head p{color:#bdcbc7}.privacy-section>.button{margin-left:42px}.data-flow{display:grid;grid-template-columns:1fr 54px 1fr 54px 1fr 54px 1fr;align-items:center;padding:10px 42px 48px}.data-flow article{min-height:220px;padding:22px;border:1px solid color-mix(in srgb,currentColor 30%,transparent)}.data-flow article span{font:700 10px/1 var(--mono);color:#F0B5C5}.data-flow article strong{display:block;margin:65px 0 12px;font-size:22px}.data-flow article p{margin:0;color:#b9c8c3;font-size:11px}.data-flow>i{height:1px;background:currentColor;opacity:.4}
.pricing-preview{min-height:500px}.price-note{padding:72px 42px;border-left:1px solid var(--line);background:#ECD39E}.price-note>span{font:700 9px/1 var(--mono)}.price-note>strong{display:block;margin:28px 0 0;font:400 80px/.9 var(--display)}.price-note>small{font:400 10px/1 var(--mono)}.price-note ul{margin:34px 0;padding:0;list-style:none}.price-note li{padding:10px 0;border-top:1px solid #16322c55}.price-note a{display:flex;align-items:center;gap:10px;font:700 10px/1 var(--mono);text-transform:uppercase}
.journal-preview{padding-bottom:78px}.journal-grid{display:grid;grid-template-columns:2fr 1fr 1fr;padding:0 42px;border-top:1px solid var(--ink)}.journal-grid a{min-height:280px;padding:26px;border-right:1px solid var(--line)}.journal-grid a:last-child{border-right:0}.journal-grid span{font:700 9px/1 var(--mono);color:var(--berry)}.journal-grid h3{max-width:18ch;margin:40px 0 16px;font-size:26px;line-height:1.12;letter-spacing:-.035em}.journal-grid a:first-child h3{font:400 40px/1.05 var(--display)}.journal-grid p{color:var(--slate);font-size:12px}
.closing-section{position:relative;display:grid;grid-template-columns:2fr 5fr;min-height:500px;padding:82px 42px;overflow:hidden;background:var(--berry);color:#fff}.closing-section>div:last-child{grid-column:2;position:relative;z-index:2}.closing-section span{font:700 9px/1 var(--mono)}.closing-section h2{max-width:12ch;margin:28px 0 20px;font:400 clamp(42px,5.3vw,76px)/.98 var(--display);letter-spacing:-.05em}.closing-section p{max-width:52ch;margin-bottom:30px}.closing-orbit{position:absolute;inset:-30% auto auto -10%;width:480px;height:480px;border:1px solid #ffffff3a;border-radius:50%}.closing-orbit i{position:absolute;border:1px solid #ffffff3a;border-radius:50%}.closing-orbit i:nth-child(1){inset:18%}.closing-orbit i:nth-child(2){inset:36%}.closing-orbit i:nth-child(3){inset:48%;background:var(--paper)}

.composer-window{position:relative;display:grid;grid-template-columns:52px 1fr;grid-template-rows:42px auto;min-height:390px;border:1px solid var(--ink);background:var(--paper);color:var(--ink);box-shadow:14px 14px 0 #A5234D}.composer-window>header{grid-column:1/-1;display:flex;justify-content:space-between;align-items:center;padding:0 14px;border-bottom:1px solid var(--ink);font:700 8px/1 var(--mono)}.composer-window>header>div{display:flex;gap:4px}.composer-window>header i{width:6px;height:6px;border-radius:50%;background:var(--line)}.composer-window>aside{display:flex;flex-direction:column;align-items:center;gap:7px;padding:10px 6px;border-right:1px solid var(--ink);background:var(--blush)}.composer-window>aside b{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:var(--ink);color:var(--paper)}.composer-window>aside button{width:30px;height:30px;border:0;background:transparent;font:700 9px/1 var(--mono)}.composer-window>aside button.active{background:var(--berry);color:#fff}.composer-main{display:grid;grid-template-columns:1fr 38px 1fr;grid-template-rows:auto 1fr auto;padding:16px}.composer-context{grid-column:1/-1;display:flex;justify-content:space-between;padding-bottom:12px;border-bottom:1px solid var(--line)}.composer-context span,.composer-context button,.composer-raw>span,.composer-final>span{font:700 8px/1 var(--mono)}.composer-context button{border:0;background:transparent}.composer-raw,.composer-final{padding:24px 14px}.composer-raw p,.composer-final p{margin:24px 0 0;font-size:18px;line-height:1.4}.composer-raw p{color:var(--slate)}.composer-final mark{background:#ecd39e;color:inherit}.composer-rule{display:grid;grid-template-rows:1fr auto 1fr;place-items:center}.composer-rule i{width:1px;height:100%;background:var(--berry)}.composer-rule span{padding:8px 0;font:700 7px/1 var(--mono);text-orientation:mixed;writing-mode:vertical-rl;color:var(--berry)}.composer-actions{grid-column:1/-1;display:flex;justify-content:flex-end;gap:8px;border-top:1px solid var(--line);padding-top:12px}
.product-lab{padding-bottom:80px}.product-lab-grid{display:grid;grid-template-columns:5fr 2fr;gap:42px;padding:0 42px}.product-lab-grid aside{padding:20px;border-top:1px solid var(--ink)}.product-lab-grid aside>span{font:700 9px/1 var(--mono);color:var(--berry)}.product-lab-grid aside>p{margin:30px 0;color:var(--slate);font-size:13px}.product-lab-grid dl div{display:flex;justify-content:space-between;padding:10px 0;border-top:1px solid var(--line);font-size:10px}.product-lab-grid dd{margin:0}.review-anatomy{padding-bottom:80px;background:var(--blush)}.anatomy-grid{display:grid;grid-template-columns:repeat(3,1fr);margin:0 42px 34px;border-top:1px solid var(--ink)}.anatomy-grid article{padding:22px 18px;border-right:1px solid var(--line)}.anatomy-grid article:last-child{border-right:0}.anatomy-grid span{font:700 9px/1 var(--mono);color:var(--berry)}.anatomy-grid h3{margin:45px 0 10px;font-size:21px;line-height:1.12}.anatomy-grid p{color:var(--slate);font-size:11px}.review-anatomy>.review-strip{margin:0 42px}.product-context{display:grid;grid-template-columns:3fr 4fr}.actions-section{padding-bottom:80px}.action-ledger{display:grid;grid-template-columns:repeat(2,1fr);margin:0 42px;border-top:1px solid var(--ink)}.action-ledger article{display:grid;grid-template-columns:100px 1fr auto;gap:18px;align-items:center;min-height:110px;padding:18px 0;border-bottom:1px solid var(--line)}.action-ledger article:nth-child(odd){padding-right:20px}.action-ledger article:nth-child(even){padding-left:20px;border-left:1px solid var(--line)}.action-ledger b,.action-ledger em{font:700 9px/1 var(--mono)}.action-ledger p{font-size:14px}.action-ledger em{color:var(--berry);font-style:normal}.state-section{padding-bottom:80px;background:#ECD39E}.state-grid{display:grid;grid-template-columns:repeat(4,1fr);margin:0 42px;border:1px solid var(--ink)}.state-grid article{min-height:220px;padding:20px;border-right:1px solid var(--ink)}.state-grid article:last-child{border-right:0}.state-grid article>span{font:700 9px/1 var(--mono)}.state-grid article>p{margin-top:65px;font-size:11px}.state-grid article>strong{display:block;margin-top:72px;font-size:17px}.mini-bars{display:flex;align-items:center;gap:5px;height:65px;margin-top:28px}.mini-bars i{width:4px;background:var(--berry);animation:bars .8s infinite alternate}.mini-bars i:nth-child(1){height:12px}.mini-bars i:nth-child(2){height:38px}.mini-bars i:nth-child(3){height:22px}.mini-bars i:nth-child(4){height:50px}.mini-bars i:nth-child(5){height:18px}@keyframes bars{to{height:16px}}.state-line{height:4px;margin-top:55px;background:linear-gradient(90deg,var(--berry) 55%,#ffffff00 55%);background-size:18px 100%;animation:move 1s linear infinite}@keyframes move{to{background-position:18px 0}}
.platform-section{padding-bottom:70px}.platform-list{display:grid;grid-template-columns:repeat(4,1fr);margin:0 42px;border-top:1px solid var(--ink);border-left:1px solid var(--ink)}.platform-list span{display:grid;place-items:center;min-height:90px;border-right:1px solid var(--ink);border-bottom:1px solid var(--ink);font:700 10px/1 var(--mono)}.platform-section>p{max-width:70ch;margin:24px 42px;color:var(--slate);font-size:11px}

.hero-index{display:grid;grid-template-columns:150px 1fr;max-width:900px;margin-left:auto;border-top:1px solid var(--ink);background:var(--paper);color:var(--ink)}.hero-index span,.hero-index strong{padding:16px;border-right:1px solid var(--line);border-bottom:1px solid var(--line)}.hero-index span{font:700 9px/1 var(--mono);color:var(--berry)}.hero-index strong{font-size:16px}.workflow-index{padding-bottom:80px}.filter-row{display:flex;gap:7px;padding:0 42px 24px}.filter-row button{min-height:36px;padding:0 12px;border:1px solid var(--ink);background:transparent;font:700 9px/1 var(--mono);text-transform:uppercase}.filter-row button.active{background:var(--ink);color:var(--paper)}.workflow-list{display:grid;grid-template-columns:repeat(3,1fr);margin:0 42px;border-top:1px solid var(--ink);border-left:1px solid var(--ink)}.workflow-list article{min-height:260px;padding:24px;border-right:1px solid var(--ink);border-bottom:1px solid var(--ink);transition:background .2s}.workflow-list article:hover{background:var(--paper)}.workflow-list article.is-hidden,.article-list a.is-hidden{display:none}.workflow-list span,.workflow-list em{font:700 9px/1 var(--mono);font-style:normal}.workflow-list span{color:var(--berry)}.workflow-list h3{margin:62px 0 14px;font-size:26px;line-height:1.05;letter-spacing:-.04em}.workflow-list p{color:var(--slate);font-size:11px}.workflow-list em{display:block;margin-top:20px}.workflow-case{min-height:540px}.workflow-case.reverse>div:first-child{grid-column:2}.workflow-case.reverse>div:last-child{grid-row:1;grid-column:1}.case-flow{align-self:center;margin:50px 42px}.case-flow article,.decision-note,.support-reply{padding:26px;border:1px solid var(--ink);background:var(--paper);color:var(--ink)}.case-flow article span,.decision-note>span,.support-reply>span{font:700 9px/1 var(--mono);color:var(--berry)}.case-flow article p{font-size:19px}.case-flow>i{display:block;width:1px;height:38px;margin:0 auto;background:var(--berry)}.decision-note,.support-reply{align-self:center;margin:50px 42px}.decision-note h3{font-size:32px;letter-spacing:-.04em}.decision-note dl div{display:grid;grid-template-columns:90px 1fr;padding:11px 0;border-top:1px solid var(--line)}.decision-note dt{font:700 8px/1 var(--mono)}.decision-note dd{margin:0;font-size:12px}.support-reply p{margin:50px 0;font-size:21px;line-height:1.45}.support-reply footer{display:flex;justify-content:space-between;border-top:1px solid var(--line);padding-top:14px;font:700 8px/1 var(--mono)}.workflow-builder{padding-bottom:80px}.builder-steps{display:grid;grid-template-columns:repeat(3,1fr);margin:0 42px;border-top:1px solid var(--ink)}.builder-steps article{min-height:250px;padding:24px;border-right:1px solid var(--line)}.builder-steps article:last-child{border-right:0}.builder-steps span{font:700 11px/1 var(--mono);color:var(--berry)}.builder-steps h3{margin-top:70px;font-size:24px}.builder-steps p{color:var(--slate);font-size:12px}

.hero-team{display:grid;grid-template-columns:1fr auto 60px 1fr auto;align-items:center;gap:18px;padding:26px;border:1px solid var(--ink);background:#ECD39E;color:var(--ink)}.hero-team span{font:700 9px/1 var(--mono)}.hero-team strong{font-size:20px}.hero-team i{height:1px;background:var(--ink)}.hero-team em{grid-column:1/-1;padding-top:16px;border-top:1px solid var(--ink);font:700 9px/1 var(--mono);font-style:normal;text-align:right}.team-context{padding-bottom:80px}.team-board{display:grid;grid-template-columns:190px 1fr;margin:0 42px;border:1px solid var(--ink);background:var(--paper);color:var(--ink)}.team-board aside{display:flex;flex-direction:column;padding:18px;border-right:1px solid var(--ink);background:var(--blush)}.team-board aside span,.team-board header span{font:700 8px/1 var(--mono)}.team-board aside strong{margin:14px 0 40px}.team-board aside button{padding:11px;border:0;background:transparent;text-align:left;font-size:11px}.team-board aside button.active{background:var(--ink);color:var(--paper)}.team-board>div>header{display:flex;justify-content:space-between;padding:17px;border-bottom:1px solid var(--ink)}.team-board header button{padding:6px 10px;border:1px solid var(--ink);background:transparent;font:700 8px/1 var(--mono)}.team-board article{display:grid;grid-template-columns:14px 1fr auto;align-items:center;gap:16px;padding:22px;border-bottom:1px solid var(--line)}.team-board article:last-child{border-bottom:0}.team-board article i{width:9px;height:9px;border-radius:50%;background:var(--dot)}.team-board h3,.team-board p{margin:0}.team-board h3{font-size:15px}.team-board p{color:var(--slate);font-size:10px}.team-board em{font:700 8px/1 var(--mono);font-style:normal}.rule-history{align-self:center;margin:50px 42px;border-top:1px solid var(--ink)}.rule-history article{display:grid;grid-template-columns:80px 1fr 40px;gap:16px;padding:16px 0;border-bottom:1px solid var(--line)}.rule-history article>span,.rule-history em{font:700 8px/1 var(--mono)}.rule-history strong{display:block}.rule-history p{grid-column:2;margin:4px 0;color:var(--slate);font-size:11px}.rule-history em{grid-column:3;grid-row:1/3;font-style:normal}.permission-section{padding-bottom:80px}.permission-table{margin:0 42px;border-top:1px solid var(--ink);border-left:1px solid var(--ink)}.permission-table>div{display:grid;grid-template-columns:1.5fr repeat(4,1fr)}.permission-table span,.permission-table strong,.permission-table b{padding:14px;border-right:1px solid var(--ink);border-bottom:1px solid var(--ink);font-size:11px}.permission-table span{font:700 8px/1 var(--mono);background:var(--ink);color:var(--paper)}.permission-table b{font-weight:400}.adoption-section{padding-bottom:80px;background:#ECD39E}.adoption-section ol{margin:0 42px;padding:0;border-top:1px solid var(--ink);list-style:none}.adoption-section li{display:grid;grid-template-columns:150px 1fr;padding:20px 0;border-bottom:1px solid #16322c55}.adoption-section li>b{font:700 10px/1 var(--mono)}.adoption-section li strong{font-size:18px}.adoption-section li p{margin:5px 0;color:var(--slate);font-size:12px}.team-cta{background:var(--paper);color:var(--ink)}form{display:grid;gap:9px;align-self:center;margin:50px 42px}form label{font:700 9px/1 var(--mono);text-transform:uppercase}form input,form textarea{width:100%;border:1px solid var(--ink);border-radius:0;background:transparent;padding:13px;color:var(--ink)}.form-status{min-height:22px;margin:0;color:var(--green);font:700 9px/1.4 var(--mono)}

body[data-route="security"] main{background:var(--ink)}.security-path{padding-bottom:70px}.security-path>.data-flow{padding-top:10px}.control-ledger{padding-bottom:80px}.ledger{display:grid;grid-template-columns:repeat(2,1fr);margin:0 42px;border-top:1px solid #ffffff44}.ledger article{min-height:260px;padding:24px;border-right:1px solid #ffffff33;border-bottom:1px solid #ffffff33}.ledger article:nth-child(even){border-right:0}.ledger span{font:700 9px/1 var(--mono);color:#F0B5C5}.ledger h3{margin:75px 0 10px;font-size:27px}.ledger p{max-width:46ch;color:#b9c8c3;font-size:12px}.ledger em{display:block;margin-top:20px;font:700 8px/1 var(--mono);font-style:normal}.threat-section{display:grid;grid-template-columns:3fr 4fr;min-height:560px;padding:80px 42px}.threat-section>div:first-child{padding-right:60px}.threat-section>div:first-child>span{font:700 9px/1 var(--mono);color:#F0B5C5}.threat-section h2{font:400 clamp(38px,4vw,60px)/1 var(--display);letter-spacing:-.045em}.threat-list{border-top:1px solid currentColor}.threat-list details{border-bottom:1px solid color-mix(in srgb,currentColor 30%,transparent)}.threat-list summary{display:flex;justify-content:space-between;gap:20px;padding:20px 0;list-style:none;font-weight:700;cursor:pointer}.threat-list summary::-webkit-details-marker{display:none}.threat-list summary i{position:relative;width:15px;height:15px}.threat-list summary i::before,.threat-list summary i::after{position:absolute;top:7px;left:1px;width:13px;height:1px;background:currentColor;content:""}.threat-list summary i::after{transform:rotate(90deg);transition:transform .2s}.threat-list details[open] summary i::after{transform:rotate(0)}.threat-list details p{max-width:60ch;margin:0 0 20px;color:#b9c8c3;font-size:12px}.pricing-faq .threat-list details p{color:var(--slate)}.evidence-register{padding-bottom:80px}.evidence-register>div{margin:0 42px;border-top:1px solid #ffffff44}.evidence-register article{display:grid;grid-template-columns:130px 1fr auto;gap:20px;padding:18px 0;border-bottom:1px solid #ffffff33}.evidence-register article span,.evidence-register article em{font:700 9px/1 var(--mono);font-style:normal}.evidence-register article em{color:#F0B5C5}

.hero-price{width:420px;margin-left:auto;padding:28px;border:1px solid var(--ink);background:#ECD39E;color:var(--ink)}.hero-price>span{font:700 9px/1 var(--mono)}.hero-price>strong{display:block;margin:24px 0 0;font:400 100px/.9 var(--display)}.hero-price>small{font:400 10px/1 var(--mono)}.hero-price>p{margin:36px 0 0;padding-top:16px;border-top:1px solid var(--ink);font-size:12px}.pricing-switch{display:flex;justify-content:space-between;align-items:end;padding:70px 42px}.pricing-switch h2{max-width:16ch;margin-top:20px}.billing-toggle{display:flex;border:1px solid var(--ink)}.billing-toggle button{min-height:44px;padding:0 14px;border:0;background:transparent;font:700 9px/1 var(--mono)}.billing-toggle button.active{background:var(--ink);color:var(--paper)}.billing-toggle em{margin-left:8px;color:var(--berry);font-style:normal}.plan-grid{display:grid;grid-template-columns:repeat(3,1fr);padding:0 42px 80px}.plan-grid article{display:flex;flex-direction:column;min-height:560px;padding:26px;border:1px solid var(--ink);border-right:0;background:var(--paper);color:var(--ink)}.plan-grid article:last-child{border-right:1px solid var(--ink)}.plan-grid article.featured{background:#ECD39E;transform:translateY(-18px);box-shadow:0 18px 0 var(--berry)}.plan-grid article>span{font:700 9px/1 var(--mono)}.plan-grid h3{max-width:14ch;margin:35px 0 45px;font-size:29px;line-height:1.06;letter-spacing:-.04em}.plan-grid article>div strong{font:400 68px/.9 var(--display)}.plan-grid article>div small{font:400 9px/1 var(--mono)}.plan-grid article>p{min-height:54px;color:var(--slate);font-size:12px}.plan-grid ul{flex:1;margin:22px 0;padding:0;list-style:none}.plan-grid li{padding:10px 0;border-top:1px solid var(--line);font-size:12px}.pricing-status{min-height:26px;margin:-50px 42px 40px;color:var(--berry);font:700 9px/1 var(--mono)}.comparison-section{padding-bottom:80px}.comparison-table{margin:0 42px;border-top:1px solid var(--ink);border-left:1px solid var(--ink)}.comparison-table>div{display:grid;grid-template-columns:2fr repeat(3,1fr)}.comparison-table span,.comparison-table strong,.comparison-table b{padding:14px;border-right:1px solid var(--ink);border-bottom:1px solid var(--ink);font-size:11px}.comparison-table span{background:var(--ink);color:var(--paper);font:700 8px/1 var(--mono)}.comparison-table b{font-weight:400}.pricing-faq{display:grid;grid-template-columns:3fr 4fr;padding:0 42px 80px}.pricing-faq .section-head{display:block;padding:78px 50px 20px 0}.pricing-faq .section-head h2{margin-top:20px}.pricing-faq .threat-list{padding-top:55px}

.hero-folio{display:grid;grid-template-columns:120px 1fr;max-width:660px;margin-left:auto;border:1px solid var(--ink);background:var(--paper);color:var(--ink)}.hero-folio>*{padding:15px;border-bottom:1px solid var(--line)}.hero-folio>span{grid-column:1/-1;font:700 9px/1 var(--mono);color:var(--berry)}.hero-folio>strong{grid-column:1/-1;font:400 48px/.95 var(--display);letter-spacing:-.04em}.hero-folio>i{font:700 8px/1 var(--mono);font-style:normal}.hero-folio>p{margin:0;font-size:18px}.article-folio{grid-template-columns:1fr}.article-folio>strong{font-size:64px}.article-folio>small{font:700 9px/1 var(--mono)}.journal-feature{display:grid;grid-template-columns:4fr 3fr;min-height:560px}.journal-feature>a{display:flex;flex-direction:column;justify-content:center;padding:70px 42px;border-right:1px solid var(--line)}.journal-feature>a>span{color:var(--berry)}.journal-feature h2{max-width:13ch;margin:36px 0 20px}.journal-feature p{max-width:48ch;color:var(--slate)}.journal-feature em{display:flex;align-items:center;gap:9px;margin-top:28px;font:700 9px/1 var(--mono);font-style:normal;text-transform:uppercase}.editorial-figure{align-self:center;margin:50px 42px;padding:22px;border:1px solid var(--ink);background:#ECD39E}.editorial-figure i,.editorial-figure b{font:700 8px/1 var(--mono);font-style:normal}.editorial-figure p{padding:18px 0;border-bottom:1px solid #16322c55;font-size:21px;line-height:1.35}.editorial-figure b{color:var(--berry)}.journal-index{padding-bottom:80px}.article-list{margin:0 42px;border-top:1px solid var(--ink)}.article-list a{display:grid;grid-template-columns:150px 1fr auto;gap:24px;align-items:center;padding:21px 0;border-bottom:1px solid var(--line)}.article-list span,.article-list time{font:700 8px/1 var(--mono)}.article-list span{color:var(--berry)}.article-list h3{margin:0;font-size:21px;letter-spacing:-.025em}.newsletter-section{display:grid;grid-template-columns:4fr 3fr;min-height:420px;padding:70px 42px;background:#ECD39E}.newsletter-section h2{max-width:15ch;font:400 45px/1 var(--display);letter-spacing:-.04em}.newsletter-section>div>span{font:700 9px/1 var(--mono)}.newsletter-section>div>p{max-width:48ch}.newsletter-section form>div{display:flex}.newsletter-section form input{border-right:0}.newsletter-section form{align-self:center}

.article-shell{display:grid;grid-template-columns:2fr 5fr;padding:70px 42px;background:var(--paper);color:var(--ink)}.article-shell>aside{position:sticky;top:100px;align-self:start;display:grid;gap:12px;padding-right:30px}.article-shell>aside span{margin-bottom:14px;font:700 9px/1 var(--mono);color:var(--berry)}.article-shell>aside a{font-size:11px}.article-body{max-width:760px}.article-deck{margin:0 0 26px;font-size:25px;line-height:1.45;letter-spacing:-.025em}.article-meta{display:flex;justify-content:space-between;gap:20px;padding:14px 0;border-top:1px solid var(--ink);border-bottom:1px solid var(--ink)}.article-body section{padding:70px 0 0}.article-body section h2{margin:0 0 24px;font:400 42px/1 var(--display);letter-spacing:-.04em}.article-body section p{max-width:68ch;font-size:17px;line-height:1.8}.article-body blockquote{margin:55px 0;padding:28px 0;border-top:1px solid var(--ink);border-bottom:1px solid var(--ink);font:400 34px/1.2 var(--display)}.article-transform{display:grid;grid-template-columns:1fr 45px 1fr;align-items:center;margin:60px 0;padding:26px;border:1px solid var(--ink);background:var(--blush)}.article-transform>div span{font:700 8px/1 var(--mono)}.article-transform>div p{font-size:19px}.article-transform>i{height:1px;background:var(--berry)}.article-transform figcaption{grid-column:1/-1;padding-top:14px;border-top:1px solid var(--line);font:400 9px/1 var(--mono)}.article-rule{margin-top:70px;padding:26px;background:var(--ink);color:var(--paper)}.article-rule span{font:700 8px/1 var(--mono);color:#F0B5C5}.article-rule strong{display:block;margin-top:40px;font-size:27px}.article-body>footer{margin-top:80px;padding-top:20px;border-top:1px solid var(--ink)}.article-body>footer span{font:700 8px/1 var(--mono);color:var(--berry)}.article-body>footer a{display:flex;align-items:center;gap:12px;margin-top:14px;font-size:22px}.article-body>footer svg{width:20px}

.site-footer{display:grid;grid-template-columns:2fr repeat(3,1fr);gap:30px;padding:72px 42px 24px;background:var(--ink);color:var(--paper)}.footer-identity img{width:145px;filter:brightness(0) invert(1)}.footer-identity p{margin-top:26px;color:#b7c7c2}.site-footer>div:not(.footer-identity){display:flex;flex-direction:column;gap:9px}.site-footer>div>span{margin-bottom:14px;color:#F0B5C5;font:700 9px/1 var(--mono)}.site-footer a{width:max-content;color:#dce7e3;font-size:12px}.site-footer a:hover{color:#fff}.site-footer>small{grid-column:1/-1;margin-top:50px;padding-top:18px;border-top:1px solid #ffffff26;color:#90a39d;font:400 8px/1.4 var(--mono)}
.reveal{opacity:0;transform:translateY(18px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)}.reveal.is-visible{opacity:1;transform:none}

@media(max-width:1050px){
  .site-header{grid-template-columns:165px 1fr auto;padding:0 24px}.header-action{font-size:9px}#site-nav{gap:16px}
  .hero-copy{grid-column:1/6;padding-left:28px}.hero-artifact{padding-right:28px;padding-left:28px}.hero-margin{display:none}
  .section-head{grid-template-columns:120px 1fr;padding-right:28px;padding-left:28px}.section-head p{grid-column:2}
  .clarity-layout,.workflow-grid,.journal-grid,.data-flow,.product-lab-grid,.anatomy-grid,.review-anatomy>.review-strip,.action-ledger,.state-grid,.platform-list,.workflow-list,.builder-steps,.team-board,.permission-table,.adoption-section ol,.ledger,.evidence-register>div,.plan-grid,.comparison-table,.article-list{margin-right:28px;margin-left:28px}
  .clarity-layout,.data-flow,.product-lab-grid,.plan-grid{padding-right:0;padding-left:0}
  .strip-track{grid-template-columns:1fr 130px 1fr}.speech-slip p{font-size:19px}.workflow-grid{grid-template-columns:repeat(2,1fr)}
  .context-section,.selection-section,.workflow-case,.governance-section,.team-cta,.pricing-preview{grid-template-columns:1fr 1fr}
  .data-flow{grid-template-columns:1fr 24px 1fr 24px 1fr 24px 1fr}.data-flow article{padding:14px}.data-flow article strong{font-size:18px}
}

@media(max-width:760px){
  body{font-size:15px}.site-header{height:62px;grid-template-columns:1fr auto;padding:0 16px}.brand{width:110px}.brand img{width:108px}.header-action{display:none}.nav-toggle{display:grid;place-items:center;width:42px;height:42px;border:0;background:transparent}.nav-toggle i{display:block;width:18px;height:1px;margin:3px;background:currentColor;transition:transform .2s}.nav-toggle[aria-expanded="true"] i:first-child{transform:translateY(3.5px) rotate(45deg)}.nav-toggle[aria-expanded="true"] i:nth-child(2){transform:translateY(-3.5px) rotate(-45deg)}
  #site-nav{position:absolute;top:62px;right:0;left:0;display:none;flex-direction:column;gap:0;padding:8px 16px 18px;border-bottom:1px solid var(--ink);background:var(--paper);color:var(--ink)}#site-nav.is-open{display:flex}#site-nav a{padding:12px 0;border-bottom:1px solid var(--line);color:var(--ink)!important}
  main,.site-footer{border:0}.page-hero{display:block;min-height:auto}.hero-copy{padding:58px 18px 34px}.hero-copy h1,.inner-hero .hero-copy h1{font-size:clamp(40px,13vw,56px);max-width:10ch}.hero-copy>p{margin-top:22px;font-size:16px}.hero-actions{align-items:flex-start;flex-direction:column}.hero-artifact{padding:0 18px 24px}.hero-margin{display:none}
  .review-strip{box-shadow:8px 8px 0 #a5234d}.strip-toolbar{grid-template-columns:1fr auto}.strip-toolbar small{display:none}.strip-track{display:block}.speech-slip{min-height:180px;padding:20px}.context-stamp{border:0;border-top:1px solid var(--ink);border-bottom:1px solid var(--ink);text-align:left}.context-stamp small{display:none}.strip-controls{grid-template-columns:1fr}.strip-controls>p{display:none}.approve-button{justify-content:center}
  .intent-strip{overflow-x:auto;padding:12px 18px;white-space:nowrap}.section-head{display:block;padding:58px 18px 32px}.section-head>span{display:block;margin-bottom:22px}.section-head h2,.context-copy h2,.selection-copy h2,.pricing-preview h2,.workflow-case h2,.governance-section h2,.security-path h2,.team-cta h2,.pricing-switch h2,.journal-feature h2{font-size:clamp(34px,10vw,48px)}.section-head p{margin-top:20px}
  .clarity-layout{display:block;min-height:0;padding:0 18px 64px;margin:0}.clarity-layout ol{display:grid;grid-template-columns:repeat(2,1fr);margin-bottom:26px}.clarity-layout li{padding:12px}.clarity-layout li.is-active{padding-left:12px;background:var(--paper)}.clarity-stage{position:static;padding:0}.clarity-sheet{min-height:0;box-shadow:8px 8px 0 #a5234d}.clarity-copy{display:block;min-height:0;padding:22px}.clarity-copy i{display:block;margin:20px 0}.clarity-sheet footer{flex-wrap:wrap}
  .context-section,.selection-section,.product-context,.workflow-case,.governance-section,.team-cta,.pricing-preview,.journal-feature,.newsletter-section,.threat-section,.pricing-faq{display:block;min-height:0}.context-copy,.selection-copy,.workflow-case>div:first-child,.governance-section>div:first-child,.team-cta>div:first-child,.pricing-preview>div:first-child{padding:58px 18px 34px}.context-section>div:last-child,.product-context>div:last-child{padding:30px 18px}.context-board>[role="tablist"]{grid-template-columns:1fr}.context-board [role="tab"]{border-right:0;border-bottom:1px solid #ffffff44}.context-panel{padding:24px}.context-panel h3{font-size:26px}
  .workflow-bands{padding-bottom:52px}.workflow-grid{display:block;margin:0;padding:0 18px}.workflow-card{min-height:260px;margin-bottom:10px}.workflow-card.tall h3{font-size:42px}.selection-demo,.case-flow,.decision-note,.support-reply,.rule-history,form{margin:20px 18px 58px}.selection-demo>button{width:100%}
  .privacy-section{padding-bottom:52px}.privacy-section>.button{margin-left:18px}.data-flow{display:block;margin:0;padding:0 18px 32px}.data-flow article{min-height:180px}.data-flow article strong{margin-top:48px}.data-flow>i{display:block;width:1px;height:24px;margin:0 auto}
  .pricing-preview>div:first-child{min-height:300px}.price-note{padding:48px 18px;border-top:1px solid var(--line);border-left:0}.journal-grid{display:block;margin:0;padding:0 18px;border:0}.journal-grid a{display:block;min-height:240px;border-top:1px solid var(--ink);border-right:0}.journal-grid a:first-child h3{font-size:34px}.closing-section{display:block;min-height:500px;padding:70px 18px}.closing-section h2{font-size:48px}.closing-orbit{opacity:.5}
  .composer-window{grid-template-columns:38px 1fr;box-shadow:8px 8px 0 #a5234d}.composer-main{display:block}.composer-rule{display:flex;gap:8px}.composer-rule i{width:100%;height:1px}.composer-rule span{writing-mode:horizontal-tb}.composer-actions{display:flex;margin-top:14px}.product-lab-grid{display:block;margin:0;padding:0 18px}.product-lab-grid aside{margin-top:35px}.review-anatomy>.review-strip{margin:0 18px}.anatomy-grid,.action-ledger,.state-grid,.platform-list{grid-template-columns:1fr;margin:0 18px}.anatomy-grid article,.state-grid article{border-right:0;border-bottom:1px solid var(--ink)}.action-ledger article,.action-ledger article:nth-child(odd),.action-ledger article:nth-child(even){grid-template-columns:70px 1fr;padding:18px 0;border-left:0}.action-ledger em{grid-column:2}.platform-list{grid-template-columns:repeat(2,1fr)}
  .hero-index,.hero-team,.hero-price,.hero-folio{width:100%;margin:0}.hero-index{grid-template-columns:100px 1fr}.hero-team{grid-template-columns:1fr auto}.hero-team i{display:none}.hero-team em{grid-column:1/-1}.workflow-index{padding-bottom:58px}.filter-row{padding:0 18px 20px;overflow-x:auto}.filter-row button{white-space:nowrap}.workflow-list{display:block;margin:0 18px;border-top:1px solid var(--ink)}.workflow-list article{min-height:230px;border-left:1px solid var(--ink)}.workflow-case.reverse>div:first-child,.workflow-case.reverse>div:last-child{grid-column:auto;grid-row:auto}.builder-steps{display:block;margin:0 18px}.builder-steps article{min-height:200px;border-right:0;border-bottom:1px solid var(--line)}
  .team-board{display:block;margin:0 18px}.team-board aside{border-right:0;border-bottom:1px solid var(--ink)}.team-board aside strong{margin-bottom:18px}.permission-table,.comparison-table{margin:0 18px;overflow-x:auto}.permission-table>div,.comparison-table>div{min-width:700px}.adoption-section ol{margin:0 18px}.adoption-section li{grid-template-columns:90px 1fr}.team-cta form{padding-bottom:10px}
  .ledger{display:block;margin:0 18px}.ledger article{min-height:220px;border-right:0}.threat-section{padding:58px 18px}.threat-section>div:first-child{padding:0 0 30px}.evidence-register>div{margin:0 18px}.evidence-register article{grid-template-columns:100px 1fr}.evidence-register article em{grid-column:2}
  .pricing-switch{display:block;padding:58px 18px}.billing-toggle{margin-top:28px}.plan-grid{display:block;margin:0;padding:0 18px 60px}.plan-grid article{min-height:520px;border-right:1px solid var(--ink);border-bottom:0}.plan-grid article.featured{margin:18px 0 36px;transform:none}.pricing-status{margin:-30px 18px 36px}.pricing-faq .section-head{padding:58px 0 20px}.pricing-faq{padding:0 18px 60px}
  .journal-feature>a{padding:58px 18px;border-right:0;border-bottom:1px solid var(--line)}.editorial-figure{margin:30px 18px}.article-list{margin:0 18px}.article-list a{grid-template-columns:1fr}.article-list time{color:var(--slate)}.newsletter-section{padding:58px 18px}.newsletter-section form{margin:40px 0 0}.article-folio>strong{font-size:48px}.article-shell{display:block;padding:48px 18px}.article-shell>aside{position:static;margin-bottom:50px}.article-deck{font-size:21px}.article-meta{align-items:flex-start;flex-direction:column}.article-body section h2{font-size:36px}.article-body blockquote{font-size:29px}.article-transform{display:block}.article-transform>i{display:block;margin:20px 0}.article-transform figcaption{margin-top:20px}.article-body>footer a{font-size:18px}
  .site-footer{grid-template-columns:1fr 1fr;padding:60px 18px 24px}.footer-identity{grid-column:1/-1}.site-footer>small{grid-column:1/-1}
}

@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*,*::before,*::after{animation-duration:.001ms!important;animation-iteration-count:1!important;transition-duration:.001ms!important}.reveal{opacity:1;transform:none}.clarity-sheet{transform:none!important}}

/* Journal index supports complete linked stories and clearly non-clickable forthcoming entries. */
.article-list>article{display:grid;grid-template-columns:150px 1fr auto;gap:24px;align-items:center;padding:21px 0;border-bottom:1px solid var(--line);opacity:.68}.article-list [data-kind].is-hidden{display:none}
.hero-security{max-width:760px;margin-left:auto;border:1px solid #ffffff55;background:#193b33;color:var(--paper)}.hero-security header,.hero-security>div{display:grid;grid-template-columns:130px 1fr auto;gap:20px;align-items:center;padding:16px 18px;border-bottom:1px solid #ffffff33}.hero-security>div:last-child{border-bottom:0}.hero-security header{grid-template-columns:1fr auto;font:700 9px/1 var(--mono)}.hero-security b,.hero-security em{font:700 9px/1 var(--mono);font-style:normal}.hero-security p{margin:0;color:#d0dcd8;font-size:13px}.hero-security em{color:#F4ABBF}
@media(max-width:760px){.article-list>article{grid-template-columns:1fr}.hero-security{width:100%;margin:0}.hero-security>div{grid-template-columns:82px 1fr;padding:14px}.hero-security>div em{grid-column:2}.hero-security header{display:flex;justify-content:space-between}}
`

export const siteScript = `
(() => {
  const qs = (selector, root = document) => root.querySelector(selector)
  const qsa = (selector, root = document) => [...root.querySelectorAll(selector)]

  const navToggle = qs('.nav-toggle')
  const nav = qs('#site-nav')
  if (navToggle && nav) {
    const closeNav = () => { navToggle.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open') }
    navToggle.addEventListener('click', () => {
      const open = navToggle.getAttribute('aria-expanded') !== 'true'
      navToggle.setAttribute('aria-expanded', String(open))
      nav.classList.toggle('is-open', open)
    })
    nav.addEventListener('click', closeNav)
    document.addEventListener('keydown', event => event.key === 'Escape' && closeNav())
  }

  const progress = qs('.reading-progress span')
  const updateProgress = () => {
    if (!progress) return
    const max = document.documentElement.scrollHeight - innerHeight
    progress.style.transform = 'scaleX(' + (max > 0 ? scrollY / max : 0) + ')'
  }
  addEventListener('scroll', updateProgress, { passive: true })
  updateProgress()

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  const reveals = qsa('.reveal')
  if (reduced || !('IntersectionObserver' in window)) reveals.forEach(item => item.classList.add('is-visible'))
  else {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) }
    }), { threshold: .12 })
    reveals.forEach(item => observer.observe(item))
  }

  qsa('[data-voice-demo]').forEach(demo => {
    const record = qs('[data-record]', demo)
    const status = qs('[data-demo-status]', demo)
    const approve = qs('[data-approve]', demo)
    let timer
    const begin = event => {
      if (event.type === 'pointerdown') event.preventDefault()
      record?.setAttribute('aria-pressed', 'true')
      record?.classList.add('is-recording')
      if (status) status.textContent = 'Listening — keep holding until the thought is complete.'
      clearTimeout(timer)
    }
    const end = () => {
      if (record?.getAttribute('aria-pressed') !== 'true') return
      record.setAttribute('aria-pressed', 'false')
      record.classList.remove('is-recording')
      if (status) status.textContent = 'Draft shaped with Northline. Review the three visible changes.'
    }
    record?.addEventListener('pointerdown', begin)
    record?.addEventListener('pointerup', end)
    record?.addEventListener('pointercancel', end)
    record?.addEventListener('keydown', event => { if (event.key === ' ' || event.key === 'Enter') begin(event) })
    record?.addEventListener('keyup', event => { if (event.key === ' ' || event.key === 'Enter') end() })
    approve?.addEventListener('click', () => {
      demo.classList.add('is-approved')
      if (status) status.textContent = 'Approved. The reviewed sentence is ready to paste.'
    })
  })

  qsa('[data-clarity]').forEach(block => {
    const items = qsa('[data-clarity-step]', block)
    const setStep = index => {
      block.dataset.step = String(index)
      items.forEach((item, itemIndex) => item.classList.toggle('is-active', itemIndex === index))
      const label = qs('.clarity-sheet header em', block)
      if (label) label.textContent = 'STEP 0' + (index + 1)
    }
    items.forEach((item, index) => {
      item.tabIndex = 0
      item.addEventListener('click', () => setStep(index))
      item.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') setStep(index) })
    })
    setStep(0)
  })

  qsa('[data-context-board]').forEach(board => {
    const tabs = qsa('[data-context]', board)
    const panels = qsa('[data-context-panel]', board)
    tabs.forEach(tab => tab.addEventListener('click', () => {
      tabs.forEach(item => item.setAttribute('aria-selected', String(item === tab)))
      panels.forEach(panel => panel.classList.toggle('is-active', panel.dataset.contextPanel === tab.dataset.context))
    }))
  })

  qsa('[data-copy-sample]').forEach(button => button.addEventListener('click', async () => {
    const text = 'Hi Maya — the prototype is ready. We can run the working session on Monday if that works for you.'
    try { await navigator.clipboard.writeText(text) } catch {}
    button.textContent = 'Draft copied'
    setTimeout(() => { button.textContent = 'Copy draft' }, 1400)
  }))

  qsa('[data-selection-demo]').forEach(demo => qs('[data-transform]', demo)?.addEventListener('click', () => demo.classList.add('is-transformed')))

  qsa('[data-filter-group]').forEach(group => {
    const list = group.nextElementSibling
    const buttons = qsa('[data-filter]', group)
    buttons.forEach(button => button.addEventListener('click', () => {
      buttons.forEach(item => item.classList.toggle('active', item === button))
      qsa('[data-kind]', list).forEach(item => item.classList.toggle('is-hidden', button.dataset.filter !== 'all' && item.dataset.kind !== button.dataset.filter))
    }))
  })

  const billingButtons = qsa('[data-billing]')
  billingButtons.forEach(button => button.addEventListener('click', () => {
    billingButtons.forEach(item => item.classList.toggle('active', item === button))
    qsa('[data-price]').forEach(price => { price.textContent = '$' + price.dataset[button.dataset.billing] })
  }))
  qsa('[data-plan]').forEach(button => button.addEventListener('click', () => {
    const status = qs('[data-pricing-status]')
    if (status) status.textContent = button.dataset.plan + ' selected. This fictional checkout stops before payment.'
  }))

  qsa('[data-demo-form]').forEach(form => form.addEventListener('submit', event => {
    event.preventDefault()
    const status = qs('.form-status', form)
    if (status) status.textContent = 'Received for this prototype. No information was sent.'
    form.reset()
  }))
})()
`
