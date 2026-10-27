/* =====================================================================
   Acorns Year, lived forward · the story introduces it, then the person is
   back on Home. A prototype clock moves time: at 6 months a halfway card
   arrives on its own; at 12 months a notification says the year is ready.
   ===================================================================== */
function yrGo(){jumpAhead();spInit();S.yrClock=1;S.yrMonth=1;S.recapSeen=true;save();home('ac-home');setTimeout(()=>toast('Your year starts now. Use the clock to move ahead.'),500)}
if(typeof SPL!=='undefined'&&SPL.year){SPL.year.go="yrGo()";SPL.year.cta='Start my year'}
if(typeof LANDERS!=='undefined'&&LANDERS.year)LANDERS.year.cta='Start my year';

/* the halfway card: one card on its own, no deck yet */
function yMidCard(o){o=o||{};return `<div class="yc" style="background-image:url(${YART}y-weeks-bg.jpg)"><div class="yc-hdr">${ycLock()}<span>Halfway</span></div>
  <div class="yc-big g" data-count="24">${o.anim?0:24}</div><div class="yc-lead">of 26 weeks,<br>you showed up.</div>
  <div class="yc-wk">${ycDots(26,'',k=>k===9||k===17?'ring':'gr')}</div>
  <div class="yc-legend"><i></i>Six months in. Keep going.</div><img class="yc-med" style="left:210px;top:432px;width:124px" src="${YART}y-med-pip-c.png" alt="">${ycFoot()}</div>`}
def('yr-mid',()=>({cls:'dark',html:`<div class="wr" style="background:#16330f"><div class="wr-top"><div class="wr-row"><span class="wr-brand"><img src="${IMG.acorn}" alt="">Six months in</span><button class="iconbtn" style="color:#fff" onclick="back()" aria-label="Close">${ic('close')}</button></div></div>
  <div class="wr-stage"><div class="wr-card" id="wrc">${yMidCard({anim:1})}</div></div>
  <div class="wr-bottom">${btn(`${ic('share',18)} Share`,"ycShare(yMidCard({}),'Six months on Acorns')",'wh','style="background:#fff;color:#0a1d08;width:auto;padding:0 28px"')}<div class="wr-hint">Your Acorns Year arrives in December</div></div></div>`,
  mount(el){wrFit(el);$$('[data-count]',el).forEach(x=>countUp(x,+x.dataset.count,1200));setTimeout(()=>{ART.confetti($('#screen'),40);haptic(14)},400)}}));

/* the clock: a prototype control pinned above the tab bar on Home */
function yrClock(){const m=S.yrMonth||1;
  const next=m<6?['6 months','yrJump(6)']:m<12?['12 months','yrJump(12)']:null;
  return `<div class="yr-clock"><span>Prototype</span><b>Month ${m}</b>${next?`<button onclick="${next[1]}">${ic('ff',12)} Jump to ${next[0]}</button>`:`<button onclick="T={si:0,wsel:0};go('year')">${ic('ff',12)} Watch my year</button>`}</div>`}
function yrJump(m){S.yrMonth=m;S.heroIdx=0;save();
  if(m===6){go('yr-mid');return}
  if(m===12){refresh();setTimeout(()=>banner('Your Acorns Year is ready','Your year, card by card. Tap to watch.',()=>{T={si:0,wsel:0};go('year')}),500)}}
(function(){const f=SCR['ac-home'];SCR['ac-home']=p=>{const r=f(p);if(S.yrClock)r.html+=yrClock();return r}})();
/* Home banner: the halfway card at 6 months, the year at 12 */
(function(){const f=heroCard;heroCard=function(){const c=f();if(!S.yrClock)return c;const m=S.yrMonth||1;
  if(m>=12)return {k:'yr12',e:'Acorns Year',t:'Your 2026 <g>is ready to watch</g>',img:'later',a:"T={si:0,wsel:0};go('year')"};
  if(m>=6)return {k:'yr6',e:'Six months in',t:'24 of 26 weeks. <g>See your halfway card</g>',img:'seedling',a:"go('yr-mid')"};
  return c}})();
document.head.insertAdjacentHTML('beforeend',`<style>
.yr-clock{position:absolute;left:16px;right:16px;bottom:calc(var(--safeBot) + 74px);z-index:4;display:flex;align-items:center;gap:8px;padding:8px 10px 8px 14px;border-radius:18px;border:1.5px dashed #e6d9a8;background:rgba(255,251,234,.97);box-shadow:0 10px 24px rgba(0,0,0,.12)}
.yr-clock span{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#8a6d12}.yr-clock b{font-size:14px;color:#191919}
.yr-clock button{margin-left:auto;display:flex;align-items:center;gap:6px;height:34px;padding:0 12px;border-radius:17px;background:#fdf0c2;color:#5e4a0c;font-size:13px;font-weight:600}
</style>`);
