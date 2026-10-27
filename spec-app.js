/* =====================================================================
   Lives inside the real app.
   · Acorns Home (light, current look) is the hub. New ideas attach to existing surfaces.
   · Existing products (Money Manager, Invest, Round-Ups) are shown as-is from Figma, never redesigned.
   · Every idea opens with a splash: what it is, why it's here, where it lives.
   · Streak and Grove stay in the dark Streak world. Setup flows use the current light style.
   ===================================================================== */
var OAKS={oak:1,ancient:1};
IMG.ancient='art/tree-ancient.png';
RSTAGES[7][2]='ancient';
WEEKS.mom=330;
const ACI={money:'$4,812.40',inv:'$4,812.40'};

/* ---------- existing product screens (pixel copies from Figma, unchanged) with tap targets ---------- */
function appShot(img,spots,note){return `<div class="as"><img class="as-img" src="art/${img}" alt="">${spots.map(([x,y,w,h,js,lab])=>`<button class="as-hot" style="left:${x}%;top:${y}%;width:${w}%;height:${h}%" onclick="${js}" aria-label="${lab}"></button>`).join('')}
  ${note?`<div class="as-note">${ic('eye',13)} Existing screen, unchanged</div>`:''}</div>`}
def('ac-mm',()=>({cls:'lt',html:`<div class="as as-scroll"><div class="as-seg" style="aspect-ratio:750/1262;background-image:url(art/app-money-manager.jpg);background-position:top"><button class="as-hot" style="left:2%;top:2.5%;width:14%;height:7%" onclick="back()" aria-label="Close"></button><button class="as-hot" style="left:83%;top:2.5%;width:14%;height:7%" onclick="toast('Money Manager settings (existing)')" aria-label="Settings"></button></div>
  ${S.mmCardHide?'':`<div class="mm-card" role="region" aria-label="Grow Together">
   <div class="mm-card-hd"><div class="mm-card-ic"><img src="${IMG.oak}" alt=""></div><div class="grow"><div class="mm-card-k">Grow Together</div><div class="mm-card-t">Your Investing slice now grows your oak</div></div><button class="iconbtn" style="color:#6b6b6b;width:36px;height:36px;flex:none" onclick="S.mmCardHide=1;save();refresh()" aria-label="Dismiss">${ic('close',16)}</button></div>
   <p class="mm-card-p">Your split stays exactly the same. Each payday, the money that goes to Investing counts as your investment for the week, so your streak and your oak keep growing.</p>
   <p class="mm-card-p">Friends in your grove see your oak grow. They never see amounts.</p>
   <button class="btn pri sm mt12" style="width:100%" onclick="go('mm-oak')">See how it shows on my oak</button></div>`}
  <div class="as-seg" style="aspect-ratio:750/362;background-image:url(art/app-money-manager.jpg);background-position:bottom"></div>
  <div style="height:72px"></div></div><div class="as-note" style="z-index:4">${ic('eye',13)} Existing screen, unchanged</div>`}));
def('mm-oak',()=>{spInit();return {cls:'dark',html:`<div class="hero-wrap mmo-hero">${ldForest({glow:.4})}${ldHill()}<div class="ld-row"><img class="rise" src="${IMG.oak}" style="height:190px" alt="Your oak"></div><div class="mmo-chips"><div class="mmo-chip rise d3"><i style="background:#74c947"></i>Investing: week counted</div><div class="mmo-chip rise d5"><i style="background:#8cc4f7"></i>Saving: nest added</div></div><div class="top" style="position:absolute;left:0;right:0;top:0;z-index:6"><button class="iconbtn" onclick="back()" aria-label="Back">${ic('back')}</button><div class="t" style="color:#fff">Your split, on your oak</div><div style="width:44px"></div></div></div>
  <div class="body" style="padding-top:12px"><p class="p" style="margin-top:0">Your Money Manager split already runs every payday. Grow Together just shows it growing.</p>
  ${[['seedling','Investing · 5%','Counts as your investment for the week. Your streak and oak grow.'],['moneybag','Saving · 10%','Shows on your oak as a nest, so friends see you’re saving too.'],['later','Giving · coming soon','Not on your oak yet.']].map(([im,t,s])=>skRow(`<img src="${IMG[im]}" alt="">`,t,s,null,'')).join('')}
  <p class="sm mt16" style="color:var(--sk-sub)">Your oak only shows that money moved, never how much.</p></div>
  ${foot(btn('Back to Money Manager','back()','wh'))}`}});
def('ac-invest',()=>({cls:'lt',html:appShot('app-invest.jpg',[[2,2,12,6,'back()','Back'],[4,47,92,5,"go('ac-ru')",'Round-Ups Settings'],[4,52,92,5,"T={};go('rec-1')",'Recurring'],[0,90,20,10,"home('ac-home')",'Home'],[80,90,20,10,"toast('Existing Earning tab')",'Earning']],1)}));
def('ac-ru',()=>({cls:'lt',html:`${appShot('app-roundups.jpg',[[2,2,14,6,'back()','Close'],[90,2,9,6,"toast('Round-Ups help (existing)')",'Help'],[88,50,10,4,"S.ru.on=!S.ru.on;save();toast(S.ru.on?'Round-Ups on':'Round-Ups off')",'Set to automatic']],1)}
  ${S.ret==='mt2-reveal'?`<div class="as-add"><div class="as-k">From your Money Type</div><div class="as-t">This is the Round-Ups® you already have</div><p class="as-p">Turn on automatic, then come back. Your first acorns grow on your oak.</p><div class="mt12">${btn('Done, back to my type',"S.ru.on=true;addFlourish('acorns');save();back();toast('Round-Ups on')",'pri')}</div></div>`:''}`}));

/* ---------- Acorns Home (current look) with the new entry points attached ---------- */
function acTabs(on){const t=[['ac-home','Home','home'],['ac-invest','Investing','card'],['ac-mm','Money Hub',''],['learn','Learning','spark'],['earn','Earning','flag']];
  return `<nav class="ac-tabs" aria-label="Main">${t.map(([id,l,i])=>i===''?`<button class="ac-hub" onclick="go('ac-mm')" aria-label="Money Hub"><span>$</span><em>${l}</em></button>`:`<button class="${on===id?'on':''}" onclick="${id==='ac-home'?"home('ac-home')":id==='ac-invest'?"go('ac-invest')":`toast('Existing ${l} tab, unchanged')`}">${ic(i,22)}<em>${l}</em></button>`).join('')}</nav>`}
const FORYOU=[['grove','Your grove','Grow beside your people. Rain, cheers, trees.','oak'],['money-type','Find your money type','Three questions. The right first habit.','seedling'],['skip-and-stash','Skip it, stash it','Skipped coffee? Invest the difference.','roundup'],['invite','Invite someone','Their first investment plants a tree beside yours.','learn'],['future-club','Future Club','Notes for later, from people who care.','early'],['year','Your Acorns Year','Six cards on how you showed up.','later']];
const IC2={};IC2.flame='<path d="M12 2c.5 3-1.6 4.6-3 6.4C7.6 10.2 7 11.7 7 13.5A5 5 0 0 0 17 14c0-2.4-1.2-3.7-2-4.6.1 1.5-.5 2.6-1.5 3 .4-3.6-.6-7.6-1.5-10.4z" fill="currentColor"/>';
IC2.bars='<rect x="3.5" y="3.5" width="17" height="17" rx="8.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M9 15.5v-4M12 15.5v-7M15 15.5v-2.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>';
IC2.sun='<circle cx="12" cy="13" r="4" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M12 4v2M4.5 13h-2M21.5 13h-2M6.2 7.2 4.8 5.8M17.8 7.2l1.4-1.4M3 19h18" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>';
IC2.prof='<circle cx="12" cy="12" r="9.2" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="10" r="3.2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M6.3 18.4c1.3-2 3.3-3 5.7-3s4.4 1 5.7 3" fill="none" stroke="currentColor" stroke-width="1.7"/>';
function ic2(n,sz,st){return IC2[n]?`<svg width="${sz||24}" height="${sz||24}" viewBox="0 0 24 24" style="${st||''}" aria-hidden="true">${IC2[n]}</svg>`:ic(n,sz,st)}
function homeBanner(){const c=typeof heroCard==='function'?heroCard():null;if(!c)return '';
  return `<button class="hb" onclick="${c.a}" aria-label="${c.e}. ${c.t.replace(/<[^>]+>/g,'')}"><span class="hb-ic"><img src="${IMG[c.img]}" alt=""></span><span class="hb-tx"><em>${c.e}</em><b>${c.t}</b></span><span class="hb-go">${ic('chev',16)}</span></button>`}
def('ac-home',()=>{spInit();const st=rstage(S.streak);const th={acorn:70,seedling:96,oak:128,ancient:148}[st[2]];
  return {cls:'lt ach',html:`<div class="ach-scroll"><div class="ah">
   <div class="ah-top"><div class="ah-yk" role="tablist"><button class="on" role="tab" aria-selected="true">You</button><button role="tab" aria-selected="false" onclick="go('kids')">Kids</button></div>
    <button class="ah-ask" onclick="toast('Ask Acorns (existing)')">Ask <img src="${IMG.acorn}" alt=""></button>
    <div class="ah-r"><button class="ah-ref" onclick="go('splash',{k:'invite'})" aria-label="Refer a friend, $500">$500</button><button class="ah-prof" onclick="protoMenu()" aria-label="Profile and prototype guide">${ic2('prof',26)}</button></div></div>
   <div class="ah-val"><div>Welcome ${S.me}</div><b>Your Acorns value<br>is ${ACI.money}</b></div>
   <div class="ah-art"><button class="ah-tree" onclick="home('gt-home')" aria-label="Your oak, ${plw(S.streak)} streak. Open Streaks."><img src="${IMG[st[2]]}" style="height:${th}px" alt=""></button></div>
   ${homeBanner()}
   <button class="ah-pot" onclick="toast('Potential (existing)')" aria-label="Potential, existing"><span class="ah-knob"><img src="${IMG.acorn}" alt=""></span><span class="ah-line"></span><span class="ah-pv"><i>›››</i> Potential $566K</span></button>
  </div>
  <div class="ah-sheet">
   <div class="ah-acct" onclick="go('ac-invest')" role="button" tabindex="0"><div class="ah-row"><span class="ah-ic">${ic2('bars',24)}</span><b class="grow">Invest</b><b>${ACI.inv}</b>${ic('chev',16,'opacity:.35')}</div>
    <div class="ah-chips"><button onclick="event.stopPropagation();home('gt-home')" class="g" aria-label="${plw(S.streak)} streak. Open Streaks.">${ic2('flame',14)}${plw(S.streak)}</button><span>Recurring: ${S.recurring?`<g>$${S.amount}/${S.day}</g>`:'<o>Off</o>'}</span><span>Round-Ups™: ${S.ru.on?'<g>On</g>':'<o>Off</o>'}</span><span>One-Time</span></div></div>
   <div class="ah-acct" role="button" tabindex="0" onclick="toast('Existing Later account')"><div class="ah-row"><span class="ah-ic">${ic2('sun',24)}</span><b class="grow">Later</b><b>$2,172.03</b>${ic('chev',16,'opacity:.35')}</div></div>
   <p class="ach-legal">Placeholder names and values. Investing involves risk, including loss of principal.</p><div style="height:96px"></div></div></div>
  ${acTabs('ac-home')}`}});
document.head.insertAdjacentHTML('beforeend',`<style>
.ah{position:relative;background:#55b530 url(art/home-hero.jpg) center -20px/100% auto no-repeat;color:#fff;padding:calc(var(--safeTop) + 6px) 0 22px}
.ah-top{display:flex;align-items:center;justify-content:space-between;padding:0 16px 0 18px;height:44px;position:relative}
.ah-yk{display:flex;gap:16px}.ah-yk button{position:relative;font-size:15px;font-weight:600;color:rgba(255,255,255,.88);height:36px}.ah-yk button.on{color:#fff}
.ah-yk button.on::after{content:'';position:absolute;left:50%;bottom:-3px;margin-left:-4px;border:4px solid transparent;border-top:5px solid #fff}
.ah-ask{position:absolute;left:50%;transform:translateX(-50%);height:36px;padding:0 14px 0 18px;border-radius:18px;background:rgba(255,255,255,.16);box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.6);color:#fff;font-size:15px;font-weight:600;display:flex;align-items:center;gap:6px}.ah-ask img{height:18px}
.ah-r{display:flex;align-items:center;gap:12px}.ah-ref{height:30px;padding:0 12px;border-radius:15px;background:rgba(30,90,10,.28);color:#fff;font-size:13px;font-weight:600}.ah-prof{width:36px;height:36px;display:flex;align-items:center;justify-content:center;color:#fff}
.ah-val{padding:22px 24px 0}.ah-val div{font-size:16px;font-weight:500}.ah-val b{display:block;margin-top:6px;font-size:28px;line-height:1.22;font-weight:600;letter-spacing:-.3px}
.ah-art{position:relative;height:150px}.ah-tree{position:absolute;right:18%;bottom:0;transform:translateX(50%)}.ah-tree img{display:block;filter:drop-shadow(0 10px 12px rgba(0,60,0,.3))}
.hb{display:flex;align-items:center;gap:12px;width:calc(100% - 60px);margin:22px 30px 0;min-height:88px;padding:14px 14px 14px 12px;border-radius:20px;text-align:left;color:#fff;background:linear-gradient(100deg,rgba(26,46,22,.92),rgba(40,58,34,.78));box-shadow:0 10px 24px rgba(0,40,0,.25)}
.hb-ic{width:48px;height:48px;border-radius:24px;background:rgba(116,201,71,.18);display:flex;align-items:center;justify-content:center;flex:none}.hb-ic img{height:34px}
.hb-tx{flex:1;min-width:0}.hb-tx em{display:block;font-style:normal;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;opacity:.85}.hb-tx b{display:block;margin-top:5px;font-size:16px;line-height:1.3;font-weight:600}.hb-tx b g{color:#a6e27e}
.hb-go{width:32px;height:32px;border-radius:16px;background:rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;flex:none}
.ah-pot{display:flex;align-items:center;gap:0;width:calc(100% - 44px);margin:26px 22px 0;height:56px;color:#fff}
.ah-knob{width:52px;height:52px;border-radius:26px;background:#fff;box-shadow:0 0 0 6px rgba(255,255,255,.28);display:flex;align-items:center;justify-content:center;flex:none}.ah-knob img{height:28px}
.ah-line{flex:1;height:2px;margin:0 10px;background:linear-gradient(90deg,#fff,rgba(255,255,255,.15))}.ah-pv{font-size:15px;font-weight:600;white-space:nowrap}.ah-pv i{font-style:normal;opacity:.6;letter-spacing:-1px;margin-right:6px}
.ah-sheet{background:#fff;padding:14px 20px 0}
.ah-acct{padding:16px 0;border-bottom:1px solid #eceeea;cursor:pointer}.ah-acct:last-of-type{border-bottom:0}.ah-row{display:flex;align-items:center;gap:12px}.ah-row b{font-size:16px;font-weight:600;color:#191919}.ah-ic{width:28px;height:28px;color:#191919;display:flex;align-items:center;justify-content:center}
.ah-chips{display:flex;gap:8px;margin-top:14px;overflow-x:auto;scrollbar-width:none;margin-right:-20px;padding-right:20px}.ah-chips::-webkit-scrollbar{display:none}
.ah-chips span,.ah-chips button{flex:none;height:32px;padding:0 12px;border-radius:16px;background:#f0f2ee;font-size:13px;font-weight:600;color:#3d453f;display:flex;align-items:center;gap:5px}
.ah-chips o{color:#c2620b}.ah-chips g{color:#2f7a12}.ah-chips button.g{background:#3d9a1f;color:#fff}
</style>`);
/* ---------- splash: what it is, why it's here, where it lives ---------- */
const SPL={
 grove:{t:'Your grove',e:'Grow Together · Streaks',img:'oak',what:'A shared hill where your oak grows beside the people you invite. Everyone keeps their own streak.',why:'People stick with habits they share. Seeing Mom’s oak, or sending a little rain when she hasn’t invested yet, keeps both of you going.',where:'Home → tap your oak, or the streak chip on Invest. Then the Grove tab.',go:"jumpAhead();spInit();GSEL=null;home('gt-grove')",cta:'Open my grove'},
 invite:{t:'Invite someone',e:'Grow Together · Referrals',img:'learn',what:'Invite one person at a time. Pick their day so you invest in rhythm. Their first investment plants a tree beside yours.',why:'Turns the existing “$500” referral into a relationship, not a link. Rewards still follow the Referrals program.',where:'Home → “$500”, or an empty spot in your grove.',go:"jumpAhead();spInit();T={};go('inv-pick')",cta:'Invite someone'},
 'money-type':{t:'Find your money type',e:'Post sign-up',img:'seedling',what:'Three quick questions about how money reaches you and how you spend. You get a type and the first habit that fits.',why:'New investors stall at “where do I start?”. This picks Recurring or Round-Ups for them, then hands off to the setup they already have.',where:'Right after sign-up, and a banner on Home.',go:"T={};home('mt2-intro')",cta:'Start'},
 'skip-and-stash':{t:'Skip it, stash it',e:'Everyday wins',img:'roundup',what:'Skip something (coffee, takeout, a ride) and invest what you didn’t spend. Quick Stash, a Skip Jar, or a 7-day Skip Week with friends.',why:'It turns a small choice into a real investment, and a real investment counts toward your streak. Works without reading your spending.',where:'A banner on Home, and reminders you set.',go:"T={};home('ss2-pick')",cta:'Pick how to skip'},
 split:{t:'Money Manager, growing',e:'Existing product · new layer',img:'later',what:'Your Money Manager split stays exactly as it is. Each payday, the Investing slice counts as your investment for the week, so your streak keeps going. The Saving slice adds a nest to your oak.',why:'People set a split once and forget it. Seeing it grow gives them a reason to keep it.',where:'Money Hub tab → Money Manager. One small card explains it. Nothing else changes.',go:"home('ac-home');go('ac-mm')",cta:'Open Money Manager'},
 'future-club':{t:'Future Club',e:'Acorns Early · Gold',img:'early',what:'Friends and family write notes for later. For you, they open on a date. For your kid, each approved note blooms a leaf, and family can add a gift.',why:'Gives people a reason to bring family in, and gives kids something more than a balance.',where:'Home → Kids, on your kid’s Early account.',go:"T={};home('fc-types')",cta:'Start a club'},
 year:{t:'Your Acorns Year',e:'Every December',img:'later',what:'Six cards on how you showed up: weeks invested, Round-Ups, how consistent you were, your type. Each card works on its own, and together they tell your year.',why:'Made to share. Every card carries your link, and never shows a balance or return.',where:'Home banner in December, and a monthly recap the rest of the year.',go:"T={si:0};jumpAhead();spInit();home('journal')",cta:'Watch my year'},
 challenges:{t:'Challenges',e:'Grow Together · Streaks',img:'earn',what:'Bring people in on a no-delivery week, a Round-Ups month, or 8 weeks side by side. Run several at once.',why:'One investment counts toward every challenge it fits, so doing more never means doing more work.',where:'Streaks → Challenges tab, or any tree in your grove.',go:"jumpAhead();spInit();home('gt-ch')",cta:'See challenges'},
 invited:{t:'Getting invited',e:'The friend’s side',img:'acorn',what:'What Sam sees when Jordan’s link lands: already on Acorns, brand new, signed out, an old link, under 18.',why:'Every path has to end in one place: planted beside Jordan.',where:'A text, a story or a QR code, opening the app or the web.',go:"home('sam-hub')",cta:'See every path'}};
def('splash',p=>{const s=SPL[p.k]||SPL.grove;return {cls:'lt',html:`<div class="spl-hero" style="background-image:url(art/home-hero.jpg)"><div class="top" style="position:absolute;left:0;right:0;top:0"><button class="iconbtn" style="color:#fff" onclick="back()" aria-label="Back">${ic('back')}</button><div style="flex:1"></div><button class="iconbtn" style="color:#fff" onclick="protoMenu()" aria-label="Prototype guide">${ic('menu',22)}</button></div>
   <img class="spl-art" src="${IMG[s.img]}" alt=""></div>
  <div class="body spl-body"><div class="spl-e">${s.e}</div><h1 class="spl-t">${s.t}</h1>
   ${[['What it is',s.what],['Why it’s here',s.why],['Where it lives',s.where]].map(([h,b])=>`<div class="spl-row"><b>${h}</b><p>${b}</p></div>`).join('')}</div>
  <div class="foot">${btn(s.cta,`(function(){${s.go.replace(/"/g,'&quot;')}})()`,'pri')}${btn('Back to Home',"home('ac-home')",'ghost','style="color:#191919"')}</div>`}});

/* ---------- light theme for setup flows (matches the current app) ---------- */
const LIGHT_IDS=/^(mt2-|ss2-|qs-|jar|ss-review|ss-detect|ss-delta|ss-settings|ss-log|ss-lock|fc-types|sap-|sapf-|inv-pick|inv-perm|inv-contacts|inv-day|inv-review|inv-existing|inv-expired|inv-waiting|states|water-set)/;
Object.keys(SCR).forEach(id=>{if(!LIGHT_IDS.test(id)||id==='ss-lock')return;const f=SCR[id];SCR[id]=p=>{window.__LIGHT=true;let r;try{r=f(p)}finally{window.__LIGHT=false}if(r)r.cls=(r.cls||'').replace(/\bdark\b|\bchd\b/g,'').trim()+' acl';return r}});
/* Money Type hands off to the products people already have */
(function(){const f=SCR['mt2-reveal'];SCR['mt2-reveal']=p=>{const r=f(p);const t=MT2[S.mt2.type||'steady'];const plan=t.plan;
  const cta=plan==='ru'?btn('Turn on Round-Ups®',"S.ret='mt2-reveal';go('ac-ru')",'pri'):btn('Set up Recurring',"S.ret='mt2-reveal';T={};go('rec-1')",'pri');
  const alt=plan==='both'?btn('Turn on Round-Ups® too',"S.ret='mt2-reveal';go('ac-ru')",'line','style="color:#191919"'):'';
  r.html=r.html.replace(/<div class="foot">[\s\S]*$/,`<div class="foot">${cta}${alt}${btn(`${ic('share',18)} Share my type`,"S.mtShared=true;T.sbT=undefined;T.sbName=undefined;go('share-b',{kind:'type'})",'ghost','style="color:#191919"')}</div>`);
  r.html=r.html.replace('About habits only. It doesn’t change your portfolio or risk.','About habits only. It doesn’t change your portfolio or risk. Setup happens in the Recurring and Round-Ups® you already have.');return r}})();
/* paycheck prompt goes to the real Money Manager */
(function(){const n=nbgCands;nbgCands=function(){return n().map(c=>c.k==='pay'?Object.assign(c,{t:'Your paycheck landed.',s:'Money Manager will split it the way you set. Tap to see it grow your oak.',cta:'Open',act:"go('ac-mm')"}):c)}})();

/* ---------- navigation: Acorns Home is home; nobody gets stuck ---------- */
function back(){if(stack.length<2){home('ac-home');return}stack.pop();const t=stack[stack.length-1];render(t.id,t.params,'back')}
(function(){const NOEXIT=new Set(['sys-load','menu','ac-home','gt-home','gt-grove','gt-ch','gt-oak']);
  Object.keys(SCR).forEach(id=>{const f=SCR[id];SCR[id]=p=>{const r=f(p);if(!r||typeof r.html!=='string')return r;let h=r.html;
    h=h.replace(/home\('menu'\)/g,"home('ac-home')");
    h=h.replace(/<button class="iconbtn"([^>]*)onclick="back\(\)"(?![^>]*aria-label)/g,'<button class="iconbtn"$1onclick="back()" aria-label="Back"');
    h=h.replace(/<button class="iconbtn"([^>]*)onclick="protoMenu\(\)"(?![^>]*aria-label)/g,'<button class="iconbtn"$1onclick="protoMenu()" aria-label="Prototype guide"');
    if(!NOEXIT.has(id)&&!/back\(\)|home\(|back2\(|finish\(\)|shareSent/.test(h))h=`<button class="x-float" onclick="back()" aria-label="Close">${ic('close',20)}</button>`+h;
    r.html=h;return r}})})();
/* Streak world: the close goes back to Acorns Home */
(function(){const f=SCR['gt-home'];SCR['gt-home']=p=>{const r=f(p);r.html=r.html.replace(`<button class="iconbtn" onclick="home('ac-home')" aria-label="Close">${ic('close')}</button>`,`<button class="iconbtn" onclick="home('ac-home')" aria-label="Back to Acorns Home">${ic('back')}</button>`);return r}})();

/* ---------- guide v3: no earlier versions; every idea opens on its splash ---------- */
const RV_GO2=[['Acorns Home','Where everything lives',"jumpAhead();spInit();home('ac-home')"],['Your grove','Trees, rain and cheers',"home('ac-home');go('splash',{k:'grove'})"],['Invite someone','From “$500” to a new tree',"home('ac-home');go('splash',{k:'invite'})"],['Money Type','Three questions, then the right habit',"home('ac-home');go('splash',{k:'money-type'})"],['Skip and Stash','Skip something, invest the difference',"home('ac-home');go('splash',{k:'skip-and-stash'})"],['Money Manager, growing','Existing split, new layer on your oak',"home('ac-home');go('splash',{k:'split'})"],['Future Club','Notes for me or for my kid',"home('ac-home');go('splash',{k:'future-club'})"],['Acorns Year','Six cards, made to share',"home('ac-home');go('splash',{k:'year'})"],['Challenges','Several at once',"home('ac-home');go('splash',{k:'challenges'})"],['Getting invited','The friend’s side, every path',"home('ac-home');go('splash',{k:'invited'})"],['Edge states','Empty, locked, failed, expired',"home('states')"]];
RV_GO.length=0;RV_GO2.forEach(x=>RV_GO.push(x));RV_OLD.length=0;
(function(){const f=rvHTML;rvHTML=function(first){let h=f(first);h=h.replace(/<div class="rv-sec">Earlier versions<\/div><div class="rv-g"><\/div>/,'');
  h=h.replace("closeOv();setTimeout(()=>{jumpAhead();spInit();home('gt-home')},250)","closeOv();setTimeout(()=>{jumpAhead();spInit();home('ac-home')},250)");
  h=h.replace(/demoSet\('(\w+)'\);home\('gt-home'\)/g,"demoSet('$1');home('ac-home')");return h}})();
def('menu',()=>({cls:'lt',html:`<div class="spl-hero" style="background-image:url(art/home-hero.jpg);height:62%"><img class="spl-art" src="${IMG.oak}" alt="" style="height:150px"></div>
  <div class="body center" style="display:flex;flex-direction:column;justify-content:flex-end;padding-bottom:calc(var(--safeBot) + 20px)">${btn('Open the guide',"protoMenu0()",'pri')}</div>`,mount(){setTimeout(()=>{if(cur()&&cur().dataset.id==='menu')protoMenu0()},350)}}));

(function(){const st=document.createElement('style');st.textContent=`
:focus-visible{outline:2px solid #74c947;outline-offset:2px;border-radius:8px}
.scr.lt{background:#fff;color:#191919}
.as{position:absolute;inset:0;background:#fff;overflow:hidden}.as-img{width:100%;display:block}
.as-hot{position:absolute;background:transparent;border:0;border-radius:12px}.as-hot:active{background:rgba(0,0,0,.06)}
.as-note{position:absolute;left:50%;transform:translateX(-50%);bottom:calc(var(--safeBot) + 12px);background:rgba(25,25,25,.78);color:#fff;font-size:12px;font-weight:600;padding:6px 12px;border-radius:14px;display:flex;align-items:center;gap:6px;white-space:nowrap}
.as-add{position:absolute;left:12px;right:12px;bottom:calc(var(--safeBot) + 46px);background:#fff;border-radius:22px;padding:16px;box-shadow:0 14px 40px rgba(20,60,10,.22);z-index:3;transition:transform .3s}
.as-add.min{transform:translateY(calc(100% - 64px))}
.as-k{font-size:11px;font-weight:700;letter-spacing:.8px;text-transform:uppercase;color:#2f7a12}.as-t{font-size:17px;font-weight:600;color:#191919;margin-top:2px}.as-p{font-size:14px;color:#4a524c;line-height:1.45;margin:10px 0 0}
.btn.sm{height:44px!important}
.ach{background:#fff}.ach-scroll{position:absolute;inset:0;overflow-y:auto;scrollbar-width:none}.ach-scroll::-webkit-scrollbar{display:none}
.ach-hero{position:relative;height:470px;background-size:cover;background-position:center top;color:#fff}
.ach-top{position:absolute;left:16px;right:8px;top:calc(var(--safeTop) + 4px);display:flex;align-items:center;gap:8px}
.ach-av{width:36px;height:36px;border-radius:18px;background:#fff;color:#2f7a12;font-weight:700;display:flex;align-items:center;justify-content:center}
.ach-pill{height:34px;padding:0 14px;border-radius:17px;background:rgba(255,255,255,.22);box-shadow:inset 0 0 0 1px rgba(255,255,255,.5);color:#fff;font-weight:600;font-size:14px;display:flex;align-items:center;gap:6px}.ach-pill img{height:16px}
.ach-val{position:absolute;left:24px;top:calc(var(--safeTop) + 70px)}.ach-val div{font-size:22px;font-weight:600}.ach-val b{display:block;font-size:44px;font-weight:600;letter-spacing:-1px;margin-top:2px}
.ach-tree{position:absolute;right:16%;bottom:132px;transform:translateX(50%);background:none;border:0;padding:0}.ach-tree img{display:block;filter:drop-shadow(0 10px 12px rgba(0,60,0,.3))}
.ach-streak{position:absolute;left:16px;bottom:56px;height:52px;padding:0 14px 0 8px;border-radius:26px;background:rgba(255,255,255,.95);color:#191919;display:flex;align-items:center;gap:10px;box-shadow:0 8px 20px rgba(0,60,0,.15)}
.ach-streak .ring svg circle:first-child{stroke:rgba(0,0,0,.12)}.ach-streak b{display:block;font-size:14px;text-align:left}.ach-streak em{display:block;font-style:normal;font-size:12px;color:#5d655f;text-align:left}
.ach-sheet{position:relative;margin-top:-28px;background:#fff;border-radius:26px 26px 0 0;padding:16px 20px 0}
.ach-seg{display:flex;background:#f1f3ef;border-radius:22px;padding:4px}.ach-seg button{flex:1;height:40px;border-radius:18px;font-weight:600;font-size:15px;color:#191919}.ach-seg button.on{background:#fff;box-shadow:0 1px 4px rgba(0,0,0,.08)}
.ach-sec{font-size:15px;font-weight:600;color:#5d655f;margin:22px 0 10px}
.ach-acct{padding:12px 0;border-bottom:1px solid #eef0ec;cursor:pointer}.ach-acct b{font-size:16px;font-weight:600}.ach-ic{width:28px;height:28px;border-radius:14px;display:flex;align-items:center;justify-content:center;color:#191919}
.ach-chips{display:flex;gap:6px;margin-top:10px;flex-wrap:wrap}.ach-chips span,.ach-chips button{height:30px;padding:0 10px;border-radius:15px;background:#f1f3ef;font-size:12px;font-weight:600;color:#3c4a40;display:inline-flex;align-items:center;gap:5px}.ach-chips .g{background:#e5f5d8;color:#2f7a12}.ach-chips img{height:18px}
.ach-start{height:36px;padding:0 16px;border-radius:18px;background:#6944ff;color:#fff;font-weight:600;font-size:14px}
.ach-fy{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.ach-card{display:flex;flex-direction:column;align-items:flex-start;text-align:left;padding:14px;border-radius:20px;background:#f4f8f1;border:1px solid #e4ece0;min-height:150px}.ach-card img{height:44px;margin-bottom:10px}.ach-card b{font-size:15px;color:#191919;line-height:1.25}.ach-card span{font-size:13px;color:#5d655f;margin-top:4px;line-height:1.35}
.ach-legal{font-size:12px;color:#7a837c;margin-top:18px;line-height:1.4}
.ac-tabs{position:absolute;left:0;right:0;bottom:0;height:calc(var(--safeBot) + 64px);padding-bottom:var(--safeBot);background:#fff;border-top:1px solid #eef0ec;display:flex;align-items:flex-start;z-index:6}
.ac-tabs>button{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;padding-top:9px;color:#8a938c;min-height:56px}.ac-tabs>button.on{color:#191919}.ac-tabs em{font-style:normal;font-size:11px;font-weight:600}
.ac-hub{position:relative}.ac-hub span{width:46px;height:46px;margin-top:-14px;border-radius:23px;background:#111;color:#fff;font-weight:700;font-size:20px;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 4px #fff}
.spl-hero{position:relative;height:300px;background-size:cover;background-position:center top}.spl-art{position:absolute;left:50%;bottom:28px;transform:translateX(-50%);height:120px;filter:drop-shadow(0 12px 14px rgba(0,60,0,.25))}
.spl-body{padding-top:22px}.spl-e{font-size:12px;font-weight:700;letter-spacing:.9px;text-transform:uppercase;color:#2f7a12}.spl-t{font-size:32px;font-weight:600;letter-spacing:-.6px;margin:6px 0 4px;color:#191919}
.spl-row{padding:14px 0;border-bottom:1px solid #eef0ec}.spl-row:last-child{border-bottom:0}.spl-row b{font-size:14px;color:#191919}.spl-row p{font-size:15px;color:#4a524c;line-height:1.45;margin:4px 0 0}
.x-float{position:absolute;right:12px;top:calc(var(--safeTop) + 4px);z-index:20;width:44px;height:44px;border-radius:22px;background:rgba(0,0,0,.35);color:#fff;display:flex;align-items:center;justify-content:center}
/* light Acorns theme for setup flows */
.scr.acl{background:#fff!important;color:#191919}
.scr.acl .top,.scr.acl .top .t,.scr.acl .iconbtn{color:#191919}
.scr.acl .hero-wrap .top .iconbtn,.scr.acl .hero-wrap .top .t{color:#191919!important}
.scr.acl [style*="color:#fff"]{color:#191919!important}
.scr.acl .h1,.scr.acl .h2,.scr.acl .h3,.scr.acl .h4,.scr.acl .mtq,.scr.acl .ql,.scr.acl .ttl,.scr.acl .amt{color:#191919}
.scr.acl .p,.scr.acl .sm,.scr.acl .qs,.scr.acl .sub,.scr.acl [style*="color:var(--sk-sub)"]{color:#5d655f!important}
.scr.acl .eyebrow{color:#2f7a12}
.scr.acl .qcard{background:#f6f8f4;border:1px solid #e4e9e1;color:#191919}.scr.acl .qcard.on{background:#edf8e6;border-color:#74c947;box-shadow:0 8px 20px rgba(60,120,30,.12)}
.scr.acl .qcard .qi,.scr.acl .sk-badge{background:#e7f3df;box-shadow:none;color:#2f7a12}.scr.acl .cbox{border-color:#c5cdc1}
.scr.acl .sk-list,.scr.acl .vis div,.scr.acl .card.dk,.scr.acl .card.flat,.scr.acl .gfriend,.scr.acl .st-tile{background:#f6f8f4!important;border:1px solid #e4e9e1!important;color:#191919}
.scr.acl .sk-list .li{border-color:#e8ebe5;color:#191919}.scr.acl .sk-list .k{color:#5d655f}.scr.acl .sk-list .v,.scr.acl .vis b,.scr.acl .st-tile .n{color:#191919}
.scr.acl .sk-row .t{color:#191919}.scr.acl .sk-row .s{color:#5d655f}
.scr.acl .seg{background:#f1f3ef}.scr.acl .seg button{color:#3c4a40}.scr.acl .seg button.on{background:#74c947;color:#0a1d08}
.scr.acl .chip,.scr.acl .days button,.scr.acl .stepper button,.scr.acl .scrub button{background:#f1f3ef;color:#191919}.scr.acl .chip.on,.scr.acl .days button.on,.scr.acl .scrub button.on{background:#74c947;color:#0a1d08}
.scr.acl .btn.line{box-shadow:inset 0 0 0 1.5px #d3d9cf;color:#191919!important}.scr.acl .btn.ghost{color:#191919!important}
.scr.acl .inp,.scr.acl .msgbox{background:#f6f8f4;border-color:#dfe5da;color:#191919}
.scr.acl .lockrow{background:#fff4e0;color:#6b4c00}
.scr.acl .nbg{background:#edf8e6;border-color:#cde9bd;color:#191919}.scr.acl .nbg .k{color:#2f7a12}.scr.acl .nbg .s{color:#5d655f}.scr.acl .nbg .sbtn{color:#3c4a40}
.scr.acl .sk-chip{background:#eef6e8;color:#2f7a12;border-color:#cfe6c1}
.scr.acl .jl::before{background:#dbe7d3}.scr.acl .jl .e::before{box-shadow:0 0 0 3px #fff}
.scr.acl .leaf{color:#fff}.scr.acl .ghostroots i{background:#e3ecdd}.scr.acl .ghostroots i.on{background:#74c947}
.scr.acl .tog{background:#d9ddd6}.scr.acl .tog.on{background:#74c947}
.scr.acl .swipe .fg{background:#f6f8f4;border-color:#e4e9e1}
.scr.acl .divider{background:#eef0ec!important}
.scr.acl .hold{background:#74c947;color:#0a1d08}
.scr.acl .bento .bnt{background:#f6f8f4;border-color:#e4e9e1}
/* accessibility: bigger hit areas and readable minimums */
.tl-h{min-width:44px;min-height:44px;justify-content:flex-end}
.chip{min-height:40px}.sk-row{min-height:52px}
.sm{font-size:max(13px,1em)}`;document.head.appendChild(st)})();

/* ---------- Skip Jar v2: a glass jar that fills with real acorns, on the Home hill ---------- */
function jarSlots(n){const out=[];const per=[4,3,4,3,4,3];let k=0,row=0;while(k<n&&row<6){const c=per[row];for(let i=0;i<c&&k<n;i++,k++){const x=(c===4?12:24)+i*25+((k*7)%5)-2;const y=6+row*21;out.push([x,y,((k*37)%30)-15])}row++}return out}
function jarViz(j,big){const n=Math.min(22,j.coins||0);const w=big?168:72,h=big?200:86;const full=j.coins>=8;
  const acorns=jarSlots(n).map(([x,y,r],i)=>`<img src="${IMG.acorn}" style="left:${x}%;bottom:${y}%;transform:rotate(${r}deg)${i===n-1&&big?';animation:acDrop .5s cubic-bezier(.4,0,.6,1.4)':''}" alt="">`).join('');
  return `<div class="jr ${full?'full':''}" style="width:${w}px;height:${h}px" ${big?'id="bigjar"':''} role="img" aria-label="${j.name||'Skip jar'}: ${j.coins} skips">
   <svg class="jr-glass" viewBox="0 0 168 200" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="jg" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".5" stop-color="#fff" stop-opacity=".18"/><stop offset="1" stop-color="#fff" stop-opacity=".45"/></linearGradient></defs>
    <path d="M44 34 h80 v14 c22 6 34 22 34 44 v78 c0 16 -12 26 -28 26 h-92 c-16 0 -28 -10 -28 -26 v-78 c0 -22 12 -38 34 -44 z" fill="url(#jg)" stroke="#fff" stroke-opacity=".9" stroke-width="2.5"/>
    <path d="M24 98 c0 -14 6 -24 16 -30" stroke="#fff" stroke-opacity=".85" stroke-width="5" stroke-linecap="round" fill="none"/></svg>
   <div class="jr-in">${acorns}</div>
   <svg class="jr-lid" viewBox="0 0 168 40" aria-hidden="true"><rect x="38" y="4" width="92" height="30" rx="9" fill="#8a6446"/><rect x="38" y="4" width="92" height="12" rx="6" fill="#a37b58"/><rect x="38" y="26" width="92" height="8" rx="3" fill="#6f4f36"/></svg>
   ${big?`<div class="jr-tag">${j.name}</div>`:''}</div>`}
function jarDrop(id){const j=S.jars.find(x=>x.id===id);j.coins++;j.last=Date.now();S.skipLog.unshift({t:j.name,amt:j.est,src:'self',when:'Today',stash:false});save();haptic(10);refresh()}
(function(){const f=SCR['jar'];SCR['jar']=p=>{const r=f(p);const j=S.jars.find(x=>x.id===(p&&p.id))||S.jars[0];
  r.html=r.html.replace('<div style="display:flex;justify-content:center;margin-top:10px">'+jarViz(j,1)+'</div>','');
  r.html=r.html.replace(/<div class="body center">/,`<div class="body center" style="padding-top:0"><div class="jr-hero" style="background-image:url(art/home-hero.jpg)">${jarViz(j,1)}</div>`);
  return r}})();
(function(){const st=document.createElement('style');st.textContent=`
.jr{position:relative;flex-shrink:0;margin:0 auto}.jr-glass{position:absolute;inset:0;width:100%;height:100%;z-index:2;filter:drop-shadow(0 10px 18px rgba(20,70,10,.25))}
.jr-in{position:absolute;left:13%;right:13%;bottom:4%;top:24%;z-index:1;overflow:hidden;border-radius:0 0 22% 22%}
.jr-in img{position:absolute;width:24%;height:auto;filter:drop-shadow(0 2px 2px rgba(0,0,0,.2))}
.jr-lid{position:absolute;left:0;top:0;width:100%;height:20%;z-index:3}
.jr-tag{position:absolute;left:50%;top:27%;transform:translateX(-50%) rotate(-3deg);z-index:4;background:#fff;color:#2f7a12;font-weight:700;font-size:13px;padding:5px 12px;border-radius:10px;box-shadow:0 4px 10px rgba(0,0,0,.12);white-space:nowrap}
.jr.full .jr-glass{animation:pulse 1.8s ease-in-out infinite}
@keyframes acDrop{0%{transform:translateY(-160px) rotate(0)}70%{transform:translateY(6px) rotate(8deg)}100%{transform:translateY(0)}}
.jr-hero{height:300px;margin:0 calc(-1*var(--pad)) 8px;background-size:cover;background-position:center 60%;display:flex;align-items:flex-end;justify-content:center;padding-bottom:30px;border-radius:0 0 28px 28px}
.scr.acl .jar-mini{display:none}.scr.acl [style*="color:#bceaa3"]{color:#2f7a12!important}.scr.acl [style*="color:#8cc4f7"]{color:#1f6fb8!important}`;document.head.appendChild(st)})();

document.head.insertAdjacentHTML('beforeend',`<style>
.as.as-scroll{overflow-y:auto;background:#f4f4f4}.as-seg{position:relative;width:100%;background-size:100% auto;background-repeat:no-repeat}
.mmo-hero{position:relative;height:340px;overflow:hidden}.mmo-chips{position:absolute;left:0;right:0;bottom:16px;z-index:5;display:flex;justify-content:center;gap:8px}.mmo-chip{display:flex;align-items:center;gap:6px;padding:7px 12px;border-radius:16px;background:rgba(10,29,8,.72);backdrop-filter:blur(6px);color:#fff;font-size:12px;font-weight:600}.mmo-chip i{width:8px;height:8px;border-radius:4px}
.mm-card{margin:4px 20px 8px;background:#fff;border-radius:24px;padding:16px 16px 18px;box-shadow:0 8px 24px rgba(20,60,10,.10)}
.mm-card-hd{display:flex;align-items:flex-start;gap:12px}.mm-card-ic{width:48px;height:48px;border-radius:14px;background:linear-gradient(#e4f5d4,#c4e8a6);display:flex;align-items:flex-end;justify-content:center;overflow:hidden;flex:none}.mm-card-ic img{height:42px}
.mm-card-k{font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#2f7a12}.mm-card-t{font-size:17px;line-height:1.3;font-weight:600;color:#191919;margin-top:3px}
.mm-card-p{font-size:15px;line-height:1.45;color:#4a524c;margin:12px 0 0}.mm-card-p+.mm-card-p{margin-top:8px}
</style>`);