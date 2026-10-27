/* =====================================================================
   Acorns Year + monthly recaps · Wrapped-style card system built from the Figma v2 set.
   Every card is a 360×640 artboard (the Figma size), scaled to fit. Each one stands on its own
   (lockup + link on every card) and the set reads as one system (shared header, numbering, palette).
   Compliance: weeks, counts and ranks only. Never amounts, balances or returns.
   ===================================================================== */
const YART='art/';
function ycLock(w){return `<span class="yc-lock ${w?'w':''}"><img src="${IMG.acorn}" alt="">acorns <em>year</em></span>`}
function ycFoot(w,right){return `<div class="yc-foot ${w?'w':''}"><span class="yc-lock ${w?'w':''}"><img src="${IMG.acorn}" alt="">acorns</span><span>${right||'acorns.com/j/'+S.me.toLowerCase()}</span></div>`}
function ycDots(n,cls,fn){return Array.from({length:n},(_,k)=>`<i class="${fn(k)}" style="animation-delay:${120+k*16}ms"></i>`).join('')}
/* the six Year cards */
function yCard(n,o){o=o||{};const nm=S.me,W=48,RU=312;const miss=new Set([3,9,17,40,48]);const N=k=>`${String(k).padStart(2,'0')} / 06`;
  const C=[
  ()=>`<div class="yc" style="background-image:url(${YART}y-cover.jpg)"><span class="yc-chip" style="left:18px;top:18px">Acorns Year · 2026</span>
     <div class="yc-panel" style="top:430px;height:194px"><div class="yc-h">Your year,<br>grown.</div><div class="yc-s">Six cards on how you showed up.</div>${o.share?ycFoot():`<div class="yc-foot">${ycLock()}<b>Tap to open</b></div>`}</div></div>`,
  ()=>`<div class="yc" style="background-image:url(${YART}y-weeks-bg.jpg)"><div class="yc-hdr">${ycLock()}<span>${N(1)}</span></div>
     <div class="yc-big g" data-count="${W}">${o.anim?0:W}</div><div class="yc-lead">of 52 weeks,<br>you showed up.</div>
     <div class="yc-wk">${ycDots(52,'',k=>miss.has(k)?'ring':(k<16?'dk':'gr'))}</div>
     <div class="yc-legend"><i></i>Longest run: 21 weeks in a row.</div><img class="yc-med" style="left:210px;top:432px;width:124px" src="${YART}y-med-pip-c.png" alt="">${o.share?ycFoot(0,''):''}</div>`,
  ()=>`<div class="yc" style="background-image:url(${YART}y-roundups.jpg)"><span class="yc-chip" style="left:18px;top:18px">Round-Ups®</span><span class="yc-chip" style="right:18px;top:18px">${N(2)}</span>
     <div class="yc-panel" style="top:415px;height:209px"><div class="yc-num" data-count="${RU}">${o.anim?0:RU}</div><div class="yc-s">everyday purchases<br>rounded up into investing.</div><div class="yc-chips"><span>Mostly coffee</span><span>Then groceries</span></div>${o.share?ycFoot():''}</div></div>`,
  ()=>`<div class="yc" style="background-image:url(${YART}y-rank-bg.jpg)"><div class="yc-hdr w">${ycLock(1)}<span>${N(3)}</span></div>
     <div class="yc-big w" style="font-size:76px;top:78px;letter-spacing:-2px">Top 6%</div><div class="yc-lead w" style="top:166px;font-size:19px">most consistent investors on<br>Acorns this year.</div>
     <div class="yc-rank">${ycDots(100,'',k=>k<6?'gold':'lt')}</div>
     <div class="yc-note">Ranked by weeks invested.<br>Never by balance.</div><img class="yc-med" style="left:232px;top:490px;width:104px" src="${YART}y-med-stage-c.png" alt=""></div>`,
  ()=>`<div class="yc" style="background-image:url(${YART}y-type.jpg)"><span class="yc-chip" style="left:18px;top:18px">Your investor type</span><span class="yc-chip" style="right:18px;top:18px">${N(4)}</span>
     <div class="yc-panel" style="top:449px;height:175px"><div class="yc-h" style="font-size:31px">The Steady Oak</div><div class="yc-s">You don’t chase. You show up,<br>rain or shine.</div><div class="yc-chips"><span>1 in 9 investors</span></div>${o.share?ycFoot():''}</div></div>`,
  ()=>`<div class="yc" style="background-image:url(${YART}y-sum-bg.jpg)"><div class="yc-who">${nm}’s 2026</div><div class="yc-title">Acorns Year</div>
     <div class="yc-tiles">${[[`${W}/52`,'weeks invested'],[`${RU}`,'Round-Ups'],['Top 6%','most consistent'],['Steady Oak','investor type']].map(([a,b])=>`<div><b>${a}</b><span>${b}</span></div>`).join('')}</div>
     <img class="yc-photo" src="${YART}y-photo.jpg" alt="Steady Oak, 1 in 9">
     <div class="yc-sfoot"><span class="yc-btn">Start yours</span><span>acorns.com/j/${nm.toLowerCase()}</span></div></div>`];
  return C[n]()}
/* monthly recap cards: same system, four cards */
const RC=[{m:9,w:4,of:4,fl:'acorns',tr:1,cap:'Two leaves, one bird.'},{m:8,w:4,of:5,fl:'roots',tr:2,cap:'Roots went deep.'},{m:7,w:0,of:4,quiet:1},{m:6,w:3,of:4,fl:null,tr:1,cap:'A first friend.'},{m:5,w:2,of:5,fl:null,tr:0,cap:'An acorn, planted.'}];
function rCard(n,j,o){o=o||{};const M=MONTHS[j.m];const N=k=>`${String(k).padStart(2,'0')} / 04`;const flN=j.fl?FLNAME[j.fl]:'Steady growth';
  const C=[
  ()=>`<div class="yc" style="background-image:url(${YART}y-cover.jpg)"><span class="yc-chip" style="left:18px;top:18px">${M} recap</span>
     <div class="yc-panel" style="top:430px;height:194px"><div class="yc-h">${M},<br>grown.</div><div class="yc-s">${j.cap}</div>${ycFoot()}</div></div>`,
  ()=>`<div class="yc" style="background-image:url(${YART}y-weeks-bg.jpg)"><div class="yc-hdr">${ycLock()}<span>${N(1)}</span></div>
     <div class="yc-big g" data-count="${j.w}">${o.anim?0:j.w}</div><div class="yc-lead">of ${j.of} weeks in ${M},<br>you showed up.</div>
     <div class="yc-mo">${Array.from({length:j.of},(_,k)=>`<i class="${k<j.w?'gr':'ring'}" style="animation-delay:${200+k*120}ms"></i>`).join('')}</div>
     <img class="yc-med" style="left:210px;top:432px;width:124px" src="${YART}y-med-pip-c.png" alt="">${ycFoot()}</div>`,
  ()=>`<div class="yc" style="background-image:url(${YART}y-type.jpg)"><span class="yc-chip" style="left:18px;top:18px">New this month</span><span class="yc-chip" style="right:18px;top:18px">${N(2)}</span>
     <div class="yc-panel" style="top:449px;height:175px"><div class="yc-row"><div class="yc-fl">${j.fl?`<img src="${IMG[FLIMG[j.fl]]}" alt="">`:`<img src="${IMG.seedling}" alt="">`}</div><div><div class="yc-h" style="font-size:28px">${j.fl?flN:'Steady growth'}</div><div class="yc-s" style="margin-top:4px">${j.fl?'A new flourish on your oak.':'No new flourish. Still growing.'}</div></div></div>${ycFoot()}</div></div>`,
  ()=>`<div class="yc" style="background-image:url(${YART}y-sum-bg.jpg)"><div class="yc-who">${S.me}’s ${M}</div><div class="yc-title">Monthly recap</div>
     <div class="yc-tiles">${[[`${j.w}/${j.of}`,'weeks invested'],[j.fl?'1':'0','new flourish'],[`${j.tr}`,'tree'+(j.tr===1?'':'s')+' in your grove'],[rstage(Math.max(S.streak,5))[1],'your oak']].map(([a,b])=>`<div><b>${a}</b><span>${b}</span></div>`).join('')}</div>
     <img class="yc-photo" src="${YART}y-photo.jpg" alt="">
     <div class="yc-sfoot"><span class="yc-btn">Start yours</span><span>acorns.com/j/${S.me.toLowerCase()}</span></div></div>`];
  return C[n]()}
/* card frame: scales a 360×640 artboard into any box */
function ycFrame(html,w){const s=w/360;return `<div class="ycf" style="width:${w}px;height:${Math.round(640*s)}px"><div class="ycs" style="transform:scale(${s})">${html}</div></div>`}
function ycShare(html,title){share({title,story:ycFrame(html,300),done:()=>{}})}
/* Wrapped-style player: card centered, Share under each card, a carousel of every card at the end */
function wrapped(o){const n=o.count;const i=Math.min(T.si||0,n);const end=i===n;
  const bars=`<div class="wr-bars">${Array.from({length:n+1},(_,k)=>`<i class="${k<i?'done':k===i?'on':''}"><b></b></i>`).join('')}</div>`;
  const top=`<div class="wr-top">${bars}<div class="wr-row"><span class="wr-brand"><img src="${IMG.acorn}" alt="">${o.label}</span><button class="iconbtn" style="color:#fff" onclick="event.stopPropagation();T.si=0;back()" aria-label="Close">${ic('close')}</button></div></div>`;
  if(end){const sel=T.wsel||0;return {cls:'dark',html:`<div class="wr">${top}<div class="wr-end"><div class="wr-endt">${o.endTitle}</div>
     <div class="wr-car" id="wrcar" onscroll="wrSnap(this)">${Array.from({length:n},(_,k)=>`<div class="wr-slot" onclick="T.wsel=${k};wrFocus(${k})">${ycFrame(o.card(k,{share:1}),Math.min(228,innerWidth*.56))}</div>`).join('')}</div>
     <div class="wr-dots">${Array.from({length:n},(_,k)=>`<i class="${k===sel?'on':''}"></i>`).join('')}</div>
     <div class="wr-acts">${btn(`${ic('share',18)} Share this card`,`ycShare(${o.cardFn}(T.wsel||0,{share:1}${o.arg||''}),'${o.shareTitle}')`,'wh','style="background:#fff;color:#0a1d08"')}
      <button class="wr-link" onclick="toast('All ${n} cards saved to Photos')">${ic('share',16)} Save all ${n}</button><button class="wr-link" onclick="T.si=0;refresh()">↺ Replay from beginning</button></div>
     <p class="wr-legal">Cards show weeks and counts only. Never balances, amounts or returns.</p></div></div>`,mount(el){const c=$('#wrcar',el);if(c)c.scrollLeft=sel*(c.firstElementChild.offsetWidth+14)}}}
  return {cls:'dark',html:`<div class="wr" style="background:${o.bg?o.bg(i):'#0b1f09'}">${top}
   <div class="wr-stage" onpointerdown="stHold(1)" onpointerup="stHold(0,event)" onpointerleave="stHold(0)"><div class="wr-card" id="wrc">${o.card(i,{anim:1})}</div></div>
   <div class="wr-bottom">${btn(`${ic('share',18)} Share`,`event.stopPropagation();ycShare(${o.cardFn}(${i},{share:1}${o.arg||''}),'${o.shareTitle}')`,'wh','style="background:#fff;color:#0a1d08;width:auto;padding:0 28px"')}<div class="wr-hint">Tap for next</div></div></div>`,
   mount(el){wrFit(el);clearTimeout(STP);STP=setTimeout(()=>{if(cur()===el){T.si=i+1;refresh()}},6500);$$('[data-count]',el).forEach(x=>countUp(x,+x.dataset.count,1200));haptic(4)}}}
function wrFit(el){const st=$('.wr-stage',el),c=$('#wrc',el);if(!st||!c)return;const z=zf();const r=st.getBoundingClientRect();const w=r.width/z-32,h=r.height/z-8;const s=Math.min(w/360,h/640);c.style.transform=`scale(${s})`;c.style.width='360px';c.style.height='640px'}
function wrSnap(c){const w=c.firstElementChild.offsetWidth+14;const k=Math.round(c.scrollLeft/w);if(k!==T.wsel){T.wsel=k;$$('.wr-dots i',cur()).forEach((d,j)=>d.classList.toggle('on',j===k))}}
function wrFocus(k){const c=$('#wrcar',cur());if(c)c.scrollTo({left:k*(c.firstElementChild.offsetWidth+14),behavior:'smooth'})}
def('year',p=>{p=p||{};return wrapped({count:6,label:'Acorns Year',card:(k,o)=>yCard(k,o),cardFn:'yCard',shareTitle:'My Acorns Year',endTitle:'Your 2026, in six cards.',bg:k=>['#0d2a0b','#16330f','#0d2a0b','#1d4a12','#0d2a0b','#1d4a12'][k]||'#0b1f09'})});
def('recap',p=>{const j=RC.find(x=>x.m===(p.m===undefined?9:p.m))||RC[0];const M=MONTHS[j.m];
  if(j.quiet)return {cls:'dark',html:`<div class="wr"><div class="wr-top"><div class="wr-row"><span class="wr-brand"><img src="${IMG.acorn}" alt="">${M} recap</span><button class="iconbtn" style="color:#fff" onclick="back()" aria-label="Close">${ic('close')}</button></div></div>
    <div class="wr-stage"><div class="wr-card" id="wrc"><div class="yc" style="background-image:url(${YART}y-cover.jpg)"><span class="yc-chip" style="left:18px;top:18px">${M}</span><div class="yc-panel" style="top:448px;height:176px"><div class="yc-h" style="font-size:34px">Quiet month.</div><div class="yc-s">Your oak is still here, with every flourish. Nothing to share this time, and that’s okay.</div></div></div></div></div>
    <div class="wr-bottom">${btn('Back to Journal','back()','wh','style="background:#fff;color:#0a1d08;width:auto;padding:0 28px"')}</div></div>`,mount(el){wrFit(el)}};
  return wrapped({count:4,label:`${M} recap`,card:(k,o)=>rCard(k,j,o),cardFn:'rCardAt',arg:`,${j.m}`,shareTitle:`My ${M} on Acorns`,endTitle:`Your ${M}, in four cards.`})});
function rCardAt(k,o,m){const j=RC.find(x=>x.m===m)||RC[0];return rCard(k,j,o)}
/* journal uses the same months */
def('journal',()=>({cls:'dark',html:`${topbar({title:'Journal'})}<div class="body"><p class="p" style="margin-top:0">A recap of your oak every month. In December they add up to your Acorns Year.</p>
  <div class="jy" onclick="T.si=0;T.wsel=0;go('year')">${ycFrame(yCard(0,{}),110)}<div class="grow"><div class="eyebrow">December</div><div style="font-weight:600;font-size:18px;color:#fff;margin-top:4px">Your Acorns Year</div><div class="sm" style="color:var(--sk-sub);margin-top:2px">Six cards · ready to watch</div><div class="mt12">${btn('Watch',"event.stopPropagation();T.si=0;T.wsel=0;go('year')",'wh','style="height:40px;width:auto;padding:0 18px;font-size:14px"')}</div></div></div>
  <div class="sk-sec"><div class="h4">Monthly recaps</div></div>
  <div class="jl">${RC.map(j=>`<div class="e ${j.quiet?'q':''}" onclick="T.si=0;T.wsel=0;go('recap',{m:${j.m}})" style="cursor:pointer"><div class="card dk" style="padding:12px 14px"><div class="row"><img src="${IMG[j.quiet?'seedling':j.m>7?'seedling':'acorn']}" style="height:44px;${j.quiet?'opacity:.5':''}" alt=""><div class="grow"><div style="font-weight:600;color:#fff">${MONTHS[j.m]}</div><div class="sm" style="color:var(--sk-sub)">${j.quiet?'Quiet month. Your oak is still here.':`${j.w} of ${j.of} weeks · ${j.cap}`}</div></div>${ic('chev',16,'color:rgba(255,255,255,.4)')}</div></div></div>`).join('')}</div></div>`}));
(function(){const st=document.createElement('style');st.textContent=`
.yc{position:relative;width:360px;height:640px;border-radius:22px;overflow:hidden;background-size:cover;background-position:center;color:#191919;font-family:inherit;box-shadow:0 20px 50px rgba(0,0,0,.35)}
.ycf{position:relative;flex-shrink:0}.ycs{position:absolute;left:0;top:0;width:360px;height:640px;transform-origin:0 0}
.yc-chip{position:absolute;height:36px;padding:0 16px;border-radius:18px;background:rgba(255,255,255,.82);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);color:#2f7a12;font-size:13px;font-weight:600;display:flex;align-items:center;white-space:nowrap}
.yc-panel{position:absolute;left:16px;width:328px;background:#fff;border-radius:22px;padding:20px 20px 18px;box-sizing:border-box;box-shadow:0 10px 30px rgba(30,70,15,.12);display:flex;flex-direction:column}
.yc-h{font-size:40px;font-weight:600;letter-spacing:-.9px;line-height:1.02}.yc-s{font-size:14px;color:#5d655f;margin-top:10px;line-height:1.38}
.yc-foot{display:flex;justify-content:space-between;align-items:center;margin-top:auto;font-size:12px;color:#3c4a40}.yc-foot b{font-weight:600;color:#191919}.yc-foot.w{color:rgba(255,255,255,.9)}
.yc>.yc-foot{position:absolute;left:26px;right:26px;bottom:22px}
.yc-lock{display:inline-flex;align-items:center;gap:6px;font-weight:700;font-size:13px;color:#2f7a12}.yc-lock img{height:17px}.yc-lock em{font-style:normal;font-weight:500;opacity:.7}.yc-lock.w{color:#fff}
.yc-hdr{position:absolute;left:26px;right:26px;top:28px;display:flex;justify-content:space-between;align-items:center;font-size:12px;font-weight:600;color:#3c4a40}.yc-hdr.w{color:rgba(255,255,255,.9)}
.yc-big{position:absolute;left:24px;top:70px;font-size:150px;font-weight:600;letter-spacing:-7px;line-height:1;font-variant-numeric:tabular-nums}.yc-big.g{color:#3f9a1a}.yc-big.w{color:#fff}
.yc-lead{position:absolute;left:26px;top:233px;font-size:27px;font-weight:600;letter-spacing:-.4px;line-height:1.2}.yc-lead.w{color:#fff}
.yc-wk{position:absolute;left:26px;top:327px;width:308px;display:grid;grid-template-columns:repeat(13,1fr);gap:5px}
.yc-wk i,.yc-rank i,.yc-mo i{display:block;aspect-ratio:1;border-radius:50%;animation:orbIn .4s cubic-bezier(.3,1.6,.5,1) both}
.yc-wk i.dk{background:#191919}.yc-wk i.gr,.yc-mo i.gr{background:#5fb33a}.yc-wk i.ring,.yc-mo i.ring{box-shadow:inset 0 0 0 1.6px #8a9a8e}
.yc-mo{position:absolute;left:26px;top:330px;width:220px;display:grid;grid-template-columns:repeat(5,1fr);gap:10px}
.yc-legend{position:absolute;left:26px;top:594px;font-size:13px;font-weight:600;display:flex;align-items:center;gap:8px}.yc-legend i{width:10px;height:10px;border-radius:5px;background:#5fb33a}
.yc-med{position:absolute;height:auto;filter:drop-shadow(0 10px 18px rgba(0,0,0,.18))}
.yc-rank{position:absolute;left:26px;top:246px;width:232px;display:grid;grid-template-columns:repeat(10,1fr);gap:6px}.yc-rank i.gold{background:#f5c451;box-shadow:inset 0 0 0 2px #e0a92c}.yc-rank i.lt{background:rgba(255,255,255,.32)}
.yc-note{position:absolute;left:26px;top:578px;font-size:12px;color:rgba(255,255,255,.92);line-height:1.45}
.yc-num{font-size:64px;font-weight:600;letter-spacing:-2px;line-height:1;font-variant-numeric:tabular-nums}
.yc-chips{display:flex;gap:8px;margin-top:14px}.yc-chips span{height:32px;padding:0 14px;border-radius:16px;background:#f1f4ef;font-size:13px;font-weight:600;display:inline-flex;align-items:center}
.yc-row{display:flex;gap:14px;align-items:center}.yc-fl{width:64px;height:64px;border-radius:18px;background:#eef6e8;display:flex;align-items:center;justify-content:center;flex-shrink:0}.yc-fl img{height:46px}
.yc-who{position:absolute;left:26px;top:28px;font-size:13px;font-weight:600;color:rgba(255,255,255,.88)}.yc-title{position:absolute;left:26px;top:52px;font-size:40px;font-weight:600;letter-spacing:-.8px;color:#fff}
.yc-tiles{position:absolute;left:26px;top:124px;width:308px;display:grid;grid-template-columns:1fr 1fr;gap:10px}
.yc-tiles div{height:124px;box-sizing:border-box;padding:16px;border-radius:18px;background:rgba(255,255,255,.17);box-shadow:inset 0 0 0 1px rgba(255,255,255,.3);display:flex;flex-direction:column;justify-content:space-between;color:#fff}
.yc-tiles b{font-size:26px;font-weight:600;letter-spacing:-.5px;line-height:1.05}.yc-tiles span{font-size:11px;color:rgba(255,255,255,.85)}
.yc-photo{position:absolute;left:26px;top:398px;width:308px;height:154px;border-radius:16px;object-fit:cover}
.yc-sfoot{position:absolute;left:26px;right:26px;top:568px;height:48px;display:flex;justify-content:space-between;align-items:center;font-size:12px;color:rgba(255,255,255,.92)}.yc-btn{height:44px;padding:0 20px;border-radius:22px;background:#111;color:#fff;font-weight:600;font-size:14px;display:inline-flex;align-items:center}
.wr{position:absolute;inset:0;display:flex;flex-direction:column;background:#0b1f09;color:#fff;transition:background .5s}
.wr-top{padding:calc(var(--safeTop) + 4px) 14px 0;flex-shrink:0}
.wr-bars{display:flex;gap:4px}.wr-bars i{flex:1;height:3px;border-radius:2px;background:rgba(255,255,255,.25);overflow:hidden;display:block}.wr-bars i b{display:block;height:100%;width:0;background:#fff}.wr-bars i.done b{width:100%}.wr-bars i.on b{animation:stbar 6.5s linear forwards}
.wr-row{display:flex;justify-content:space-between;align-items:center;margin-top:6px}.wr-brand{display:flex;align-items:center;gap:8px;font-weight:600;font-size:14px}.wr-brand img{height:20px}
.wr-stage{flex:1;display:flex;align-items:center;justify-content:center;min-height:0;-webkit-user-select:none;user-select:none}
.wr-card{transform-origin:50% 50%;flex-shrink:0;animation:wrIn .5s cubic-bezier(.2,.9,.25,1) both}@keyframes wrIn{from{opacity:0;transform:translateY(16px) scale(.96)}}
.wr-bottom{flex-shrink:0;display:flex;flex-direction:column;align-items:center;gap:8px;padding:6px 0 calc(var(--safeBot) + 14px)}.wr-hint{font-size:12px;color:rgba(255,255,255,.5)}
.wr-end{flex:1;display:flex;flex-direction:column;min-height:0;padding-top:8px}.wr-endt{font-size:24px;font-weight:600;text-align:center;letter-spacing:-.3px;padding:0 24px}
.wr-car{display:flex;gap:14px;overflow-x:auto;scroll-snap-type:x mandatory;padding:18px calc(50% - 114px);scrollbar-width:none;flex-shrink:0}.wr-car::-webkit-scrollbar{display:none}.wr-slot{scroll-snap-align:center;cursor:pointer}
.wr-dots{display:flex;justify-content:center;gap:6px}.wr-dots i{width:6px;height:6px;border-radius:3px;background:rgba(255,255,255,.3);transition:all .2s}.wr-dots i.on{width:18px;background:#fff}
.wr-acts{display:flex;flex-direction:column;align-items:center;gap:6px;margin-top:auto;padding:12px 24px 0}.wr-acts .btn{width:auto;padding:0 30px}
.wr-link{display:flex;align-items:center;gap:6px;height:40px;font-weight:600;font-size:14px;color:#fff}
.wr-legal{font-size:11px;color:rgba(255,255,255,.45);text-align:center;padding:4px 24px calc(var(--safeBot) + 10px);margin:0}
.jy{display:flex;gap:16px;align-items:center;padding:14px;border-radius:20px;background:var(--sk-card);border:1px solid var(--sk-line);margin-top:16px;cursor:pointer}.jy .yc{box-shadow:0 8px 20px rgba(0,0,0,.35)}`;document.head.appendChild(st)})();

/* Split a paycheck: the "why" before any numbers */
def('mm2-intro',()=>({cls:'dark',html:`${topbar({close:true,title:''})}<div class="body"><div class="eyebrow">Money Manager</div><div class="h1 mt8" style="color:#fff">Split your paycheck.<br>Grow three ways.</div>
  <p class="p mt12">Choose how much of each paycheck goes where, once. Every payday, Acorns moves the slices for you, so investing, retirement and a safety net all happen without thinking about it.</p>
  <div class="mt24">${[['seedling','Invest','Your everyday investing. Keeps your streak going and grows Roots on your oak.'],['later','Later','Retirement (IRA). A gold leaf for every month you add to it.'],['moneybag','Savings','A rainy-day cushion. Builds a nest on your oak.']].map(([im,t,s])=>`<div class="qcard" style="cursor:default"><div class="qi"><img src="${IMG[im]}" alt=""></div><div class="grow"><div class="ql">${t}</div><div class="qs">${s}</div></div></div>`).join('')}</div>
  <p class="sm mt12" style="color:var(--sk-sub)">Your grove sees the flourishes, never the amounts. You can change or pause the split anytime.</p></div>
  ${foot(btn('Set up my split',"go('mm2-pay')",'wh'),btn('Not now','back()','ghost'))}`}));
(function(){const f=SCR['mm2-pay'];SCR['mm2-pay']=p=>{const r=f(p);r.html=r.html.replace('<div class="h2" style="color:#fff">One paycheck, three habits.</div><p class="p mt8">Tell us about your pay. Only you see these numbers.</p>','<div class="eyebrow">Step 1 of 3 · Your paycheck</div><div class="h2 mt8" style="color:#fff">How much, and how often?</div><p class="p mt8">We use this to work out each slice. Only you see these numbers.</p>');return r}})();
