/* =====================================================================
   Spec build · shared systems (storyboard §3, §5, §6b, §6c)
   Oak Stage · Growth Moment · Hold to confirm · Grove Sheet · Streak chip
   Next Best Growth · Share Card builder · Momentum states · prompt budget
   ===================================================================== */
function spInit(){const d={reset:false,jars:[{id:'j1',name:'Coffee jar',est:6,coins:3,last:Date.now()}],habits:[{id:'h1',name:'Coffee',est:6,time:'Weekdays · 8am',remind:true}],
  skipLog:[],stashThisWeek:0,detect:{on:false,cats:[],asked:false},sap:null,pay:{amt:1800,freq:'Every 2 weeks',next:'Fri, Nov 6',detected:false,remind:false},
  split:{i:60,l:25,s:15},hidden:{},waterOK:{mom:true,dad:true,sam:true,priya:false},watered:{},mutedWater:{},invite:null,mt2:{},resume:null,failed:false,commit:12,
  acornCount:7,friendJoined:null,recapSeen:false,reviewDone:false,mtShared:false,slots:5,offline:false};
  for(const k in d)if(S[k]===undefined)S[k]=d[k];return S}
function resetAll(){S=FRESH();spInit();save();home('menu')}
function startGT(){S=FRESH();spInit();S.perm={contacts:null,notif:null};save();T={};home('gt-welcome')}
spInit();

/* ---------- helpers ---------- */
const haptic=(ms)=>{try{navigator.vibrate&&navigator.vibrate(ms||10)}catch(e){}};
const OAK_ORDER=['roots','acorns','nest','gold','sapling','flowers','bird'];
const ORB_SLOTS={roots:[50,14],acorns:[27,52],nest:[73,52],bird:[14,72],gold:[86,72],sapling:[12,32],flowers:[88,32]};
const ORB_TIP={roots:()=>`Roots · ${S.commit||12} weeks of recurring`,acorns:()=>`Acorns · ${S.acornCount||0} from Round-Ups`,nest:()=>'Nest · Emergency Fund growing',gold:()=>'Gold leaves · one per month to Later',sapling:()=>`Sapling · ${(typeof S.early==='string'&&S.early)||'Ava'}’s Early account`,flowers:()=>'Wildflowers · one per Earn bonus',bird:()=>`Songbird · ${Math.max(1,S.learn||1)} course finished`};
function skState(){spInit();if(S.reset)return 'reset';return S.invested?'done':'todo'}
function weekLabel(){const s=skState();return s==='reset'?'Plant this week':`Week ${Math.max(1,S.streak+(s==='todo'?1:0))}`}

/* ---------- 3.5 Streak chip + week ring ---------- */
function ringSvg(p,sz){sz=sz||24;if(p>=1)return `<svg width="${sz}" height="${sz}" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#74c947"/><path d="M7 12.5l3.2 3.2L17 9" stroke="#0a1d08" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;const r=sz/2-3,c=2*Math.PI*r;return `<svg width="${sz}" height="${sz}" viewBox="0 0 ${sz} ${sz}" aria-hidden="true"><circle cx="${sz/2}" cy="${sz/2}" r="${r}" stroke="rgba(255,255,255,.18)" stroke-width="3" fill="none"/><circle cx="${sz/2}" cy="${sz/2}" r="${r}" stroke="#74c947" stroke-width="3" fill="none" stroke-linecap="round" stroke-dasharray="${c*p} ${c}" transform="rotate(-90 ${sz/2} ${sz/2})"/></svg>`}
function streakChip(){const s=skState();if(s==='reset')return `<button class="schip reset" onclick="go('plant')" aria-label="Plant this week">${ic('oak',18)}Plant this week</button>`;
  return `<button class="schip" onclick="${s==='done'?"toast('This week counts. See you next week.')":"T={};S.afterCount='gt-home';go('inv-1')"}" aria-label="${weekLabel()}">${ringSvg(s==='done'?1:0)}${weekLabel()}</button>`}

/* ---------- 3.1 Oak Stage ---------- */
let LP=null;
function oakStage(o){o=o||{};spInit();const w=o.weeks!==undefined?o.weeks:S.streak;const st=rstage(w);const H=o.h||300;
  const th=st[2]==='acorn'?Math.round(Math.min(78,H*.21)):st[2]==='seedling'?Math.round(Math.min(124,H*.34)):Math.round(Math.min(180,H*.52));
  const fl=(o.fl||S.flourishes).filter(k=>ORB_SLOTS[k]);
  const ghosts=[].concat(o.ghost||[]).filter(k=>ORB_SLOTS[k]&&fl.indexOf(k)<0);
  const ymax=Math.min(72,(H-150)/H*100),kk=Math.max(.3,(ymax-14)/56);const orb=(k,g)=>{const x=ORB_SLOTS[k][0],y=14+(ORB_SLOTS[k][1]-14)*kk;const cnt=k==='acorns'&&!g?`<span class="cnt">${S.acornCount||1}</span>`:'';return `<div class="orb ${g?'ghost':''}" id="orb-${k}" data-k="${k}" style="left:${x}%;bottom:${y}%" onclick="event.stopPropagation();orbTip(this,'${k}',${g?1:0})" role="button" aria-label="${FLNAME[k]||k}${g?', about to grow':''}"><img src="${IMG[FLIMG[k]]}" alt="">${cnt}</div>`};
  return `<div class="os sk-hero" style="height:${H}px;margin:${o.flush?'0':'0 calc(-1*var(--pad))'}" aria-label="Oak, stage ${RSTAGES.indexOf(st)+1}, ${fl.length} flourishes">${hills({dark:1})}
   <div class="tree" id="${o.id||'oakT'}" onpointerdown="lpStart(event)" onpointerup="lpEnd(event,'${st[1]} · ${w} week${w===1?'':'s'}')" onpointerleave="lpCancel()" role="button" aria-label="Your oak. Press and hold to open your grove."><div class="sway"><img src="${IMG[st[2]]}" style="height:${th}px" alt=""></div></div>
   ${fl.map(k=>orb(k,0)).join('')}${ghosts.map(k=>orb(k,1)).join('')}${o.over||''}</div>`}
function lpStart(e){const el=e.currentTarget;LP={el,t:setTimeout(()=>{LP.fired=1;haptic(15);groveSheet('half')},520)}}
function lpEnd(e,label){if(!LP)return;clearTimeout(LP.t);if(!LP.fired)orbTipAt(LP.el,label+' · hold to open your grove');LP=null}
function lpCancel(){if(LP){clearTimeout(LP.t);LP=null}}
function orbTip(el,k,g){orbTipAt(el,g?`${FLNAME[k]} · grows when you finish setup`:ORB_TIP[k]());haptic(6)}
function orbTipAt(el,text){const host=el.closest('.os');if(!host)return;$$('.tip',host).forEach(t=>t.remove());const r=el.getBoundingClientRect(),h=host.getBoundingClientRect();const t=document.createElement('div');t.className='tip';t.textContent=text;
  const z=zf();let x=(r.left-h.left+r.width/2)/z;x=Math.max(90,Math.min(h.width-90,x));t.style.left=x+'px';t.style.top=((r.top-h.top)/z+6)+'px';host.appendChild(t);setTimeout(()=>t.remove(),2000)}
function solidifyGhosts(root,list,gap){list.forEach((k,i)=>setTimeout(()=>{const o=$('#orb-'+k,root);if(o){o.classList.remove('ghost');o.classList.add('solidify');haptic(8)}},i*(gap||300)))}

/* ---------- streak crediting (only real investing moves the streak) ---------- */
function creditWeek(){spInit();const from=S.reset?0:S.streak;let counted=false;
  if(S.reset){S.reset=false;S.streak=1;S.invested=true;counted=true}else if(!S.invested){S.streak+=1;S.invested=true;counted=true}
  S.stage=stageFor(S.streak);if(counted){growing().forEach(g=>g.side=(g.side||0)+1);S.challenges.filter(c=>c.counts==='invest').forEach(c=>c.prog.me=Math.min(c.len,(c.prog.me||0)+1))}
  S.failed=false;save();return {from,to:S.streak,counted}}

/* ---------- 3.3 Hold to confirm ---------- */
const HOLD={};let HOLDN=0;
function holdBtn(label,js,cls){const id='h'+(++HOLDN);HOLD[id]=js;return `<div class="hold ${cls||''}" data-h="${id}" onpointerdown="holdDown(this,event)" onpointerup="holdUp(this)" onpointerleave="holdUp(this)" onpointercancel="holdUp(this)" oncontextmenu="return false" role="button" aria-label="Press and hold to ${label}"><div class="fill"></div><span class="ring"></span><span>Hold to ${label}</span></div><span class="hold-alt" role="button" onclick="holdRun('${id}')">Or tap to ${label}</span>`}
function holdDown(el,e){e.preventDefault();if(el._done)return;const dur=900;const start=performance.now()-(el._p||0)*dur;el._holding=true;haptic(6);let q=0;
  const step=t=>{if(!el._holding)return;const p=Math.min(1,(t-start)/dur);el._p=p;el.style.setProperty('--p',p);const sc=el.closest('.scr');if(sc)sc.style.setProperty('--p',p);el.firstChild.style.width=(p*100)+'%';const nq=Math.floor(p*4);if(nq>q){q=nq;haptic(4+q*3)}
    if(p>=1){el._done=true;el._holding=false;haptic(25);setTimeout(()=>holdRun(el.dataset.h),120);return}requestAnimationFrame(step)};requestAnimationFrame(step)}
function holdUp(el){if(!el._holding)return;el._holding=false;const from=el._p||0;const st=performance.now();const back=t=>{if(el._holding||el._done)return;const p=Math.max(0,from-(t-st)/260);el._p=p;el.style.setProperty('--p',p);const sc=el.closest('.scr');if(sc)sc.style.setProperty('--p',p);el.firstChild.style.width=(p*100)+'%';if(p>0)requestAnimationFrame(back)};requestAnimationFrame(back)}
function holdRun(id){const js=HOLD[id];if(!js)return;const b=document.createElement('button');b.setAttribute('onclick',js);b.style.display='none';document.body.appendChild(b);b.click();b.remove()}

/* ---------- 3.2 Growth Moment ---------- */
/* p: {ks:[flourishes], cap, sub, list:[[label,value]], invest:bool, next:'screen'|'finish', np, share:'oak'|..., chipTo, notice} */
def('growth',p=>{p=p||{};spInit();const ks=(p.ks||[]).filter(k=>ORB_SLOTS[k]);const fl=S.flourishes.filter(k=>ks.indexOf(k)<0);
  const done=p.next==='finish'||!p.next?'finish()':`back2('${p.next}')`;
  return {cls:'dark',html:`<div class="gm-skip" onclick="gmSkip()"></div>
  <div style="position:relative;z-index:3">${oakStage({h:360,fl,ghost:ks,flush:1,id:'gmT'})}<div style="position:absolute;left:0;right:0;top:calc(var(--safeTop) + 6px);display:flex;justify-content:center"><div id="gmChip">${p.invest?`<span class="schip">${ringSvg(0)}Week ${p.from+1}</span>`:`<span class="schip">${ringSvg(S.invested?1:0)}${weekLabel()}</span>`}</div></div></div>
  <div class="gm-cap" id="gmCap" style="opacity:0;transition:opacity .4s;position:relative;z-index:3"><div class="eyebrow">${p.eyebrow||(p.invest?'This week counts':'New on your oak')}</div><div class="h1 mt8">${p.cap||'Your oak grew.'}</div>${p.sub?`<p class="p mt8">${p.sub}</p>`:''}
   ${p.list?`<div class="mt16" style="text-align:left">${p.list.map(([a,b])=>`<div class="row" style="padding:9px 12px;border-radius:12px;background:rgba(255,255,255,.05);margin-bottom:6px"><span class="sk-ck" style="width:20px;height:20px">${ic('check',12)}</span><div class="grow" style="font-weight:600;font-size:14px">${a}</div><div class="sm">${b}</div></div>`).join('')}</div>`:''}
   ${p.notice?`<p class="sm mt12" style="color:var(--sk-sub)">${p.notice}</p>`:''}</div>
  <div style="flex:1"></div>
  <div class="gm-row" id="gmRow" style="position:relative;z-index:3">${btn(`${ic('share',18)} Share`,`go('share-b',{kind:'${p.share||'oak'}'})`,'line','style="color:#fff;flex:1"')}${btn(`${ic('user',18)} Add to grove`,"T={};go('inv-pick')",'line','style="color:#fff;flex:1"')}</div>
  <div class="gm-row" id="gmRow2" style="position:relative;z-index:3;padding-top:0">${btn('Done',done,'wh')}</div>`,
  mount(el){const tree=$('#gmT',el);const run=()=>{if(el._skipped)return;
    if(p.invest&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const host=$('#screen').getBoundingClientRect();const tr=tree.getBoundingClientRect();const c=document.createElement('div');c.className='gmcoin';c.innerHTML=`<img src="${IMG.acorn}" alt="">`;el.appendChild(c);
      const z=zf();const sx=host.width/z/2-15,sy=host.height/z-120,ex=(tr.left-host.left+tr.width/2)/z-15,ey=(tr.top-host.top+tr.height*.55)/z;c.style.left='0px';c.style.top='0px';
      c.animate([{transform:`translate(${sx}px,${sy}px) scale(.8)`},{transform:`translate(${(sx+ex)/2}px,${Math.min(sy,ey)-90}px) scale(1)`,offset:.5},{transform:`translate(${ex}px,${ey}px) scale(.5)`,opacity:.2}],{duration:620,easing:'cubic-bezier(.4,0,.6,1)',fill:'forwards'}).onfinish=()=>c.remove()}
    setTimeout(()=>{tree.classList.add('breathe');haptic(30);solidifyGhosts(el,ks,300);ART.confetti($('#screen'),90)},p.invest?600:150);
    setTimeout(()=>{const ch=$('#gmChip',el);if(ch&&p.invest)ch.innerHTML=`<span class="schip">${ringSvg(1)}Week ${p.to}</span>`;$('#gmCap',el).style.opacity=1},p.invest?900:500);
    setTimeout(()=>{$('#gmRow',el).classList.add('on');$('#gmRow2',el).classList.add('on');const sk=$('.gm-skip',el);if(sk)sk.remove()},1500)};
    setTimeout(run,180);window.gmSkip=()=>{el._skipped=true;solidifyGhosts(el,ks,0);if(p.invest){const ch=$('#gmChip',el);if(ch)ch.innerHTML=`<span class="schip">${ringSvg(1)}Week ${p.to}</span>`}$('#gmCap',el).style.opacity=1;$('#gmRow',el).classList.add('on');$('#gmRow2',el).classList.add('on');const sk=$('.gm-skip',el);if(sk)sk.remove()}}}});
/* every success routes here */
function growthFor(k,cap,sub,opt){opt=opt||{};const isNew=addFlourish(k);go('growth',Object.assign({ks:isNew?[k]:[],cap,sub,next:'finish'},opt))}
def('rec-done',()=>{const c=creditWeek();S.recurring=true;const isNew=addFlourish('roots');save();return SCR.growth({invest:true,from:c.from,to:c.to,ks:isNew?['roots']:[],eyebrow:c.counted?'This week counts':'Recurring is set',cap:'Your oak grew roots.',sub:`Roots mean you invest on a schedule. $${S.amount} every ${S.day} counts toward your streak.`,next:'finish'})});
def('ru-done',()=>{const isNew=addFlourish('acorns');return SCR.growth({ks:isNew?['acorns']:[],cap:'Round-Ups® are on.',sub:'Every 10 Round-Ups add an acorn to your oak. They count toward your streak once they’re invested.',next:'finish'})});
def('ef-done',()=>{const isNew=addFlourish('nest');return SCR.growth({ks:isNew?['nest']:[],cap:'Your oak got a nest.',sub:'A nest means you’re saving for a rainy day. Your grove sees the nest, never the amount.',next:'finish'})});
def('later-done',()=>{const isNew=addFlourish('gold');return SCR.growth({ks:isNew?['gold']:[],cap:'Your oak got a gold leaf.',sub:'You get one for each month you add to Later, your retirement account.',next:'finish'})});
def('early-done',()=>{const isNew=addFlourish('sapling');return SCR.growth({ks:isNew?['sapling']:[],cap:`${(typeof S.early==='string'&&S.early)||T.kid||'Your kid'}’s sapling is planted.`,sub:'It grows beside your oak each week you or family invest for them.',next:'finish'})});
def('earn-done',()=>{const isNew=addFlourish('flowers');return SCR.growth({ks:isNew?['flowers']:[],cap:'Offer activated.',sub:'A wildflower blooms on your hill each time an Earn reward lands.',next:'finish'})});
def('learn-done',()=>{const isNew=addFlourish('bird');return SCR.growth({ks:isNew?['bird']:[],cap:'A songbird joined your oak.',sub:'You get one for every lesson you finish.',next:'finish'})});
def('fl-unlock',p=>SCR.growth({ks:[],cap:FLNAME[p.k]+'.',sub:(FL[p.k]||{}).line,next:'finish'}));

/* ---------- one-time invest: visible-first + hold to confirm (§6c.5) ---------- */
def('inv-1',()=>{spInit();if(!T.inv)T.inv=S.amount;const a=S.accounts[0];const counts=!S.invested||S.reset;
  return {cls:'dark',html:`${topbar({title:S.reset?'Plant this week':'Invest',close:true})}<div class="body">
  <div class="center mt8"><div class="amt" style="color:#fff" onclick="keypad(T.inv,v=>{T.inv=v;refresh()})">${money(T.inv)}</div>
  <div class="chips" style="justify-content:center">${[5,10,25,50].map(v=>`<button class="chip ${T.inv===v?'on':''}" onclick="T.inv=${v};refresh()">$${v}</button>`).join('')}<button class="chip" onclick="keypad(T.inv,v=>{T.inv=v;refresh()})">Other</button></div></div>
  <div class="vis mt24"><div><span>Moves</span><b>Today</b></div><div><span>Funds</span><b>Invest account</b></div><div><span>From</span><b>${a.name} ••${a.mask}</b></div><div><span>Streak</span><b>${counts?'Counts this week':'Already counted ✓'}</b></div></div>
  ${T.inv<5?`<div class="lockrow mt12">${ic('lock',16)}The minimum one-time investment is $5.</div>`:''}
  <p class="sm mt16" style="color:var(--sk-sub)">Investing involves risk, including loss of principal. <span class="link" style="font-size:13px">Disclosures</span></p>
  <p class="center mt16"><span class="sim" onclick="go('fund-fail')">${ic('ff',12)} Prototype: funding fails</span></p></div>
  <div class="foot">${T.inv<5?btn('Invest '+money(T.inv),'','wh','disabled'):holdBtn('invest '+money(T.inv),"investNow()",'light')}</div>`}});
function investNow(){const c=creditWeek();const rows=[[`Your Streak`,c.counted?`Week ${c.from} → ${c.to}`:'Already counted']];growing().forEach(g=>rows.push([`Side by side with ${nm(g.id)}`,`Week ${g.side}`]));S.challenges.filter(x=>x.counts==='invest').forEach(x=>rows.push([x.title,`${x.prog.me} of ${x.len}`]));
  stack.pop();go('growth',{invest:true,from:c.from,to:c.to,ks:[],eyebrow:c.counted?'This week counts':'Invested',cap:c.counted?'One investment. Counted everywhere.':'Invested. Your week was already counted.',list:rows.slice(0,5),next:S.afterCount||'gt-home'})}
def('fund-fail',()=>{S.failed=true;save();return {cls:'dark',html:`${topbar({close:"back()"})}<div class="body center" style="display:flex;flex-direction:column;justify-content:center;align-items:center">
  <div class="sk-badge lock" style="width:72px;height:72px;border-radius:36px">${ic('bank',30)}</div><div class="h2 mt24" style="color:#fff">That transfer didn’t go through.</div>
  <p class="p mt8" style="max-width:300px">Nothing moved and nothing was charged. Your week isn’t counted yet, and there’s still time.</p></div>
  ${foot(btn('Try again',"S.failed=false;save();back()",'wh'),btn('Use a different account',"S.bankRet='inv-1';go('bank-1')",'ghost'))}`}});
def('plant',()=>{spInit();if(!T.inv)T.inv=S.amount;return {cls:'dark',html:`${heroTop(oakStage({h:320,flush:1}),'')}
  <div class="body" style="padding-top:14px"><div class="eyebrow">A fresh start</div><div class="h2 mt8" style="color:#fff">Plant this week.</div>
  <p class="p mt8">Your oak kept all its extras. One investment starts your streak again.</p>
  <div class="vis mt16"><div><span>Amount</span><b onclick="keypad(T.inv,v=>{T.inv=v;refresh()})">${money(T.inv)} · edit</b></div><div><span>Moves</span><b>Today</b></div><div><span>From</span><b>${S.accounts[0].name} ••${S.accounts[0].mask}</b></div><div><span>Streak</span><b>Starts Week 1</b></div></div></div>
  <div class="foot">${holdBtn('plant '+money(T.inv),"investNow()",'light')}</div>`}});

/* ---------- 3.3 Grove Sheet (peek · half · full) ---------- */
let GS=null;
function groveSheet(det){spInit();const host=ov();host.innerHTML=`<div class="scrim" onclick="gsClose()"></div><div class="gsheet" id="gs"><div class="handle" id="gsh"><i></i></div><div class="gs-body" id="gsb">${gsBody()}</div></div>`;
  const sh=$('#gs',host),H=$('#screen').clientHeight*.88;const Y={peek:H-170,half:H*.45,full:0};GS={sh,Y,cur:det||'half'};sh.style.transform=`translateY(${H}px)`;
  requestAnimationFrame(()=>{$('.scrim',host).classList.add('on');sh.style.transform=`translateY(${Y[GS.cur]}px)`});
  const hd=$('#gsh',host);let sy=0,base=0,drag=false;
  hd.onpointerdown=e=>{drag=true;sy=e.clientY;base=Y[GS.cur];sh.style.transition='none';hd.setPointerCapture(e.pointerId)};
  hd.onpointermove=e=>{if(!drag)return;sh.style.transform=`translateY(${Math.max(0,base+(e.clientY-sy)/zf())}px)`};
  hd.onpointerup=e=>{if(!drag)return;drag=false;sh.style.transition='';const y=base+(e.clientY-sy)/zf();if(Math.abs(e.clientY-sy)<6){GS.cur=GS.cur==='peek'?'half':GS.cur==='half'?'full':'half'}else if(y>H-90){gsClose();return}else{GS.cur=Object.keys(Y).reduce((a,k)=>Math.abs(Y[k]-y)<Math.abs(Y[a]-y)?k:a,'half')}sh.style.transform=`translateY(${Y[GS.cur]}px)`;haptic(8)}}
function gsClose(){const host=ov();const sh=$('#gs',host);if(sh)sh.style.transform='translateY(110%)';$$('.scrim',host).forEach(s=>s.classList.remove('on'));setTimeout(()=>{host.innerHTML=''},380);GS=null}
function gsRefresh(){const b=$('#gsb');if(b)b.innerHTML=gsBody()}
function waterCue(g){return g.status==='growing'&&g.open&&S.waterOK[g.id]&&!S.mutedWater[g.id]}
function gsBody(){const gr=S.grove.filter(g=>g.status==='growing'),inv=S.grove.filter(g=>g.status==='invited');const free=Math.max(0,(S.slots||5)-S.grove.length);
  if(!S.grove.length)return `<div class="center" style="padding:30px 10px"><div class="spot" style="margin:0 auto;width:72px;height:72px;border-radius:36px">${ic('plus',26)}</div><div class="h3 mt16" style="color:#fff">Plant your first friend</div><p class="sm mt8" style="color:var(--sk-sub)">Invite one person. Grow beside them.</p><div class="mt24">${btn('Invite someone',"gsClose();T={};setTimeout(()=>go('inv-pick'),250)",'wh')}</div></div>`;
  return `<div class="row between"><div><div class="h3" style="color:#fff">Your grove</div><div class="sm" style="color:var(--sk-sub)">${gr.length} growing${inv.length?` · ${inv.length} waiting`:''} · only you see this</div></div>${free?`<button class="btn wh sm" onclick="gsClose();T={};setTimeout(()=>go('inv-pick'),250)">${ic('plus',16)} Invite</button>`:''}</div>
  <div class="row mt16" style="gap:14px;overflow-x:auto;padding-bottom:12px;scrollbar-width:none">${gr.map(g=>`<div class="center" style="flex-shrink:0;width:58px"><div style="height:62px;display:flex;align-items:flex-end;justify-content:center;position:relative">${treeImg(wk(g.id),rstage(wk(g.id))[2] in OAKS?60:rstage(wk(g.id))[2]==='seedling'?48:36)}${waterCue(g)?`<span class="dropbadge">${ic('drop',11,'color:#fff')}</span>`:''}</div><div style="font-size:11px;font-weight:600;margin-top:4px">${nm(g.id)}</div></div>`).join('')}${inv.map(g=>`<div class="center" style="flex-shrink:0;width:58px"><div style="height:62px;display:flex;align-items:flex-end;justify-content:center"><div class="spot">${av(g.id,'s')}</div></div><div style="font-size:11px;font-weight:600;margin-top:4px;color:var(--sk-sub)">${nm(g.id)}</div></div>`).join('')}</div>
  <p class="sm" style="color:var(--sk-sub)">Watering encourages them. It only counts when they invest.</p>
  <div class="mt12">${gr.map(g=>{const W=wk(g.id),st=rstage(W),cue=waterCue(g),sent=S.watered[g.id];return `<div class="gfriend"><div class="tr">${treeImg(W,st[2] in OAKS?70:st[2]==='seedling'?56:40)}${cue?`<span class="dropbadge">${ic('drop',11,'color:#fff')}</span>`:''}</div>
     <div class="grow"><div style="font-weight:600">${PEOPLE[g.id].full}</div><div class="sm" style="color:var(--sk-sub)">${st[1]} · ${W} weeks${cue?' · hasn’t invested yet this week':''}</div><div class="fls">${(PFL[g.id]||[]).filter(k=>FLIMG[k]).map(k=>`<img src="${IMG[FLIMG[k]]}" alt="${FLNAME[k]}">`).join('')}</div></div>
     ${cue?(sent?`<span class="wbtn off">${ic('check',14)} Sent</span>`:`<button class="wbtn" onclick="gsWater('${g.id}',this)">${ic('drop',14)} Water</button>`):''}</div>`}).join('')}
   ${inv.map(g=>`<div class="gfriend"><div class="tr"><div class="spot">${ic('oak',18)}</div></div><div class="grow"><div style="font-weight:600">${PEOPLE[g.id].full}</div><div class="sm" style="color:var(--sk-sub)">Invite sent · ${g.day||'Fri'} · sprouts after their first investment</div>
     <div class="row mt8" style="gap:6px"><button class="chip" style="height:30px;font-size:12px" onclick="gsRemind('${g.id}')">Remind</button><button class="chip" style="height:30px;font-size:12px" onclick="gsClose();T={ivp:'${g.id}',day:'${g.day||'Fri'}',change:1};setTimeout(()=>go('inv-day'),250)">Change day</button><button class="chip" style="height:30px;font-size:12px" onclick="S.grove=S.grove.filter(x=>x.id!=='${g.id}');save();gsRefresh();toast('Invite canceled')">Cancel</button></div></div></div>`).join('')}
   ${free?`<div class="gfriend" style="border-style:dashed;cursor:pointer" onclick="gsClose();T={};setTimeout(()=>go('inv-pick'),250)"><div class="tr"><div class="spot">${ic('plus',18)}</div></div><div class="grow"><div style="font-weight:600">Plant a friend</div><div class="sm" style="color:var(--sk-sub)">${free} open spot${free===1?'':'s'}</div></div></div>`:''}</div>`}
function gsWater(id,btnEl){S.watered[id]=Date.now();save();haptic(12);const r=btnEl.getBoundingClientRect(),h=$('#screen').getBoundingClientRect();rain($('#screen'),r.left-h.left,r.top-h.top-60);toast(`Rain sent to ${nm(id)}`);setTimeout(gsRefresh,500)}
function gsRemind(id){const g=inGrove(id);if(g.reminded){toast('You can remind once every 3 days');return}g.reminded=Date.now();save();SHARE={title:`${S.me} saved you a spot`,story:inviteStory(),to:PEOPLE[id].full,text:'Your spot beside me is still saved.'};gsClose();setTimeout(()=>go('sys-msg',{kind:'msg'}),250)}

/* ---------- 3.4b Next Best Growth card ---------- */
let NBG_LOADED=false,NBG_MORE=false;
function nbgCands(){spInit();const c=[];const s=skState();
  if(S.failed)c.push({k:'fail',p:1,kick:'Needs a look',t:'Your last transfer didn’t go through.',s:'Nothing moved. Try again to count this week.',img:'acorn',cta:'Try again',act:"T={};go('inv-1')"});
  if(s==='reset')c.push({k:'plant',p:2,kick:'Fresh start',t:'Plant this week.',s:'Your oak kept all its extras. One investment starts it growing again.',img:'acorn',cta:'Plant',act:"T={};go('plant')"});
  else if(s==='todo'&&S.streak>0)c.push({k:'grow',p:2,kick:'Grow your week',t:`Week ${S.streak+1} is open.`,s:S.recurring?`Your $${S.amount} lands ${S.day}. Or invest now.`:'Any amount counts this week.',img:'seedling',cta:'Invest',act:"T={};S.afterCount='gt-home';go('inv-1')"});
  if(S.friendJoined)c.push({k:'joined',p:3,kick:'Your grove',t:`${nm(S.friendJoined)} signed up.`,s:'Their tree sprouts after their first investment.',img:'oak',cta:'See grove',act:"S.friendJoined=null;save();groveSheet('half')"});
  if(S.detect.on)c.push({k:'dskip',p:4,kick:'Spotted a skip',t:'Looks like you skipped coffee today.',s:`Stash your usual $${S.habits[0].est}? You confirm. Nothing moves on its own.`,img:'roundup',cta:'Stash $'+S.habits[0].est,act:"T={qsItem:'Coffee',qsAmt:S.habits[0].est,src:'detected'};go('qs-1')"});
  if(S.pay.detected)c.push({k:'pay',p:4,kick:'Paycheck landed',t:'Your paycheck just landed. Split it?',s:'Your last split is ready to confirm.',img:'later',cta:'Split it',act:"T={};go('mm2-split',{pre:1})"});
  const cue=S.grove.find(g=>waterCue(g)&&!S.watered[g.id]);if(cue)c.push({k:'water',p:4,kick:'Your grove',t:`${nm(cue.id)} hasn’t invested yet.`,s:'Hasn’t invested yet this week. Send rain as a gentle nudge? It only counts when they invest.',img:'learn',cta:'Water',act:`groveSheet('full')`});
  if(!S.recapSeen&&S.ffDone)c.push({k:'recap',p:5,kick:'October recap',t:'Your oak’s October.',s:'4 weeks, 1 new oak extra, 1 tree planted.',img:'later',cta:'View',act:"S.recapSeen=true;save();go('recap',{m:9})"});
  if(S.sap&&S.sap.pending&&S.sap.pending.length)c.push({k:'sap',p:5,kick:'Future Club',t:`${S.sap.pending.length} note${S.sap.pending.length>1?'s':''} waiting for approval.`,s:`For ${S.sap.kid}’s club.`,img:'early',cta:'Review',act:"go('sap-mod')"});
  if(S.resume)c.push({k:'resume',p:6,kick:'Pick up where you left off',t:S.resume.t,s:S.resume.s,img:'seedling',cta:'Continue',act:S.resume.act});
  if(S.jars.some(j=>j.coins>=5))c.push({k:'jar',p:6,kick:'Skip Jar',t:'Your coffee jar is full.',s:`${S.jars[0].coins} skips · about ${money(S.jars[0].coins*S.jars[0].est)}. Stash it when you’re ready.`,img:'roundup',cta:'Stash it',act:"go('jar',{id:'j1'})"});
  if(!S.reviewDone&&S.ffDone)c.push({k:'review',p:6,kick:'Weekly review',t:'Anything you skipped this week?',s:'Count your skips in one place, then stash or drop them in a jar.',img:'earn',cta:'Review',act:"go('ss-review')"});
  const now=Date.now();return c.filter(x=>!(S.hidden[x.k]&&now-S.hidden[x.k]<7*864e5)).sort((a,b)=>a.p-b.p)}
function nbgCard(x){return `<div class="nbg"><div class="ico"><img src="${IMG[x.img]}" alt=""></div><div class="k">${x.kick}</div><div class="t" style="padding-right:56px">${x.t}</div><div class="s" style="padding-right:40px">${x.s}</div><div class="acts"><button class="pbtn" onclick="${x.act}">${x.cta}</button><button class="sbtn" onclick="nbgHide('${x.k}')">Hide this</button></div></div>`}
function nbgBlock(){if(!NBG_LOADED)return `<div class="shimmer" id="nbgS"></div>`;const c=nbgCands();
  if(!c.length)return `<div class="nbg" style="display:flex;gap:14px;align-items:center"><img src="${IMG[rstage(S.streak)[2]]}" style="height:54px"><div><div class="t" style="margin:0">You’re all grown for today.</div><div class="s">Nothing needs you right now.</div></div></div>`;
  return nbgCard(c[0])+(c.length>1?(NBG_MORE?c.slice(1,3).map(x=>`<div class="mt8">${nbgCard(x)}</div>`).join('')+`<div class="nbg-more" onclick="NBG_MORE=false;refresh()">Show less ${ic('chev',12,'transform:rotate(-90deg)')}</div>`:`<div class="nbg-more" onclick="NBG_MORE=true;refresh()">See more (${Math.min(2,c.length-1)}) ${ic('chev',12,'transform:rotate(90deg)')}</div>`):'')}
function nbgHide(k){S.hidden[k]=Date.now();save();toast('Hidden for 7 days');refresh()}

/* ---------- Home: streak chip in the header, one Next Best Growth slot, Oak Stage hero ---------- */
def('gt-home',()=>{spInit();const w=S.streak;const g=S.grove;const inv=g.filter(x=>x.status==='invited');const s=skState();
  return {cls:'dark',html:`<div class="hero-wrap">${oakStage({h:330,flush:1})}<div class="top"><button class="iconbtn" onclick="home('menu')" aria-label="Close">${ic('close')}</button>${streakChip()}<button class="iconbtn" onclick="protoMenu()" aria-label="Prototype menu">${ic('menu',22)}</button></div></div>
  <div class="body" style="padding-top:4px">
   ${s==='reset'?`<div class="sk-title" style="font-size:26px">Your oak kept all its extras.</div><div class="sk-sub">A missed week starts the count again. Plant this week and it grows from here.</div><div class="mt16">${btn('Plant this week',"T={};go('plant')",'wh')}</div>`
   :`<div class="sk-title"><b>${w}</b> Week Streak</div><div class="sk-sub">${s==='done'?`This week counts.${S.recurring?` Next $${S.amount} lands ${S.day}.`:''}`:'Invest any amount this week to keep it growing.'}</div>`}
   <div class="mt24" id="nbgW">${nbgBlock()}</div>
   <div class="sk-sec"><div class="h4">Your grove</div><span class="sm" onclick="groveSheet('half')" style="cursor:pointer">Open ${ic('chev',12)}</span></div>
   <div class="card dk tap" style="padding:0;overflow:hidden" onclick="home('gt-grove')"><div style="position:relative">${(()=>{const gr=g.filter(x=>x.status==='growing');const sz=id=>{const k=rstage(wk(id))[2];return k in OAKS?78:k==='seedling'?58:44};const mk=x=>({html:`<div style="position:relative"><img src="${IMG[rstage(wk(x.id))[2]]}" style="height:${sz(x.id)}px">${waterCue(x)&&!S.watered[x.id]?'<span class="dropbadge">'+ic('drop',11,'color:#fff')+'</span>':''}</div>`,label:nm(x.id)});const L=gr.slice(0,2).map(mk),R=gr.slice(2,4).map(mk);if(inv.length&&R.length<2)R.push({html:spot(),label:'Waiting'});if(!gr.length&&!inv.length){L.push({html:spot(),label:'Invite'})}return hillRow([...L,{html:`<img src="${IMG[rstage(w)[2]]}" style="height:${rstage(w)[2]==='acorn'?52:84}px">`,label:'You',me:1},...R],{h:190})})()}
    <div style="position:absolute;left:12px;top:12px" class="sk-chip">${ic('grove',14,'color:#74c947')} ${g.filter(x=>x.status==='growing').length} growing${inv.length?` · ${inv.length} waiting`:''}</div></div></div>
   <div class="sk-sec"><div class="h4">Ways to grow</div></div>
   <div class="row" style="gap:10px;overflow-x:auto;padding-bottom:6px;scrollbar-width:none">${[['Skip and Stash','roundup',"go('ss2-pick')"],['Money Type','seedling',"T={};go('mt2-intro')"],['Money Manager','later',"go('ac-mm')"],['Future Club','learn',"go('fc-types')"],['Journal','oak',"go('journal')"]].map(([t,im,a])=>`<div class="fl-tok" style="width:84px" onclick="${a}"><div class="im" style="width:84px"><img src="${IMG[im]}" alt=""></div><div class="nm">${t}</div></div>`).join('')}</div>
   <div class="sk-sec"><div class="h4">Challenges</div><span class="sm" style="cursor:pointer" onclick="T={};go('gt-ch-new')">+ Start</span></div>
   ${S.challenges.length?S.challenges.slice(0,3).map(c=>{const t=CH_TYPES[c.type];return skRow(`<span style="color:#74c947">${ic(t.icon,22)}</span>`,c.title,`${c.prog.me||0} of ${c.len} ${c.unit} · ${c.people.length} people`,(c.prog.me||0)>=c.len,`go('gt-ch-detail',{id:'${c.id}'})`)}).join(''):`<div class="sm" style="color:var(--sk-sub)">Bring people in on a no-delivery week, a Round-Ups month, or 8 weeks side by side.</div>`}
   <div class="sk-sec"><div class="h4">Oak extras</div><span class="sm">${S.flourishes.length}/9</span></div>
   <div class="row" style="gap:10px;overflow-x:auto;padding-bottom:6px;scrollbar-width:none">${Object.keys(FL).map(flTok).join('')}</div>
   <div style="height:80px"></div></div>
  ${S.ffDone?'':`<button class="ff" onclick="jumpAhead();spInit();refresh();toast('Jumped ahead 4 weeks')">${ic('ff',12)} Jump ahead 4 weeks</button>`}
  ${tabbarDk('gt-home')}`,
  mount(el){if(!NBG_LOADED)setTimeout(()=>{NBG_LOADED=true;const wv=$('#nbgW',el);if(wv)wv.innerHTML=nbgBlock()},650);
    const inv=S.grove.find(x=>x.status==='invited'&&PEOPLE[x.id].on);if(inv&&!S.ffDone&&!inv.seen){inv.seen=1;setTimeout(()=>{if(cur().dataset.id!=='gt-home')return;S.friendJoined=inv.id;save();banner(`${nm(inv.id)} signed up`,'Their tree sprouts after their first investment.',()=>groveSheet('half'));refresh()},2600)}}}});

/* ---------- 3.4 Share Card builder ---------- */
function shareCardFor(kind,o){o=o||{};const name=o.name?S.me:'';const stg=o.stage?rstage(S.streak)[1]:'';const fls=o.fl?S.flourishes.filter(k=>FLIMG[k]&&k!=='tree').slice(0,5):[];
  const flRow=fls.length?`<div style="display:flex;gap:2.5cqw;margin-top:3cqw">${fls.map(k=>`<img src="${IMG[FLIMG[k]]}" style="height:8cqw" alt="">`).join('')}</div>`:'';
  const art=`<img src="${IMG[rstage(S.streak)[2]]}" alt="">`;
  const K={oak:{eyebrow:stg||'Acorns Streak',title:`${S.streak} weeks in a row.`,sub:'Grow yours beside mine.'},
   type:{eyebrow:'My money type',title:(MT2[S.mt2.type]||MT2.steady).n,sub:(MT2[S.mt2.type]||MT2.steady).line},
   year:{eyebrow:'My Acorns Year',title:'41 weeks invested.',sub:`${S.flourishes.length} flourishes. ${growing().length} friends grew beside me.`},
   recap:{eyebrow:'My October',title:'Two new leaves and a songbird.',sub:'4 weeks invested this month.'},
   invite:{eyebrow:'Grow with me',title:`${S.me} saved you a spot in her grove.`,sub:'One small investment a week. We both grow.'}}[kind]||{};
  const foot=`${name?name+' · ':''}acorns.com/g/jordan`;return {o:K,art,flRow,foot}}
def('share-b',p=>{spInit();const kind=p.kind||'oak';if(!T.sbT)T.sbT='story';if(T.sbName===undefined){T.sbName=false;T.sbStage=true;T.sbFl=true}
  const c=shareCardFor(kind,{name:T.sbName,stage:T.sbStage,fl:T.sbFl});const card=storyCard(Object.assign({},c.o,{art:c.art,sub:(c.o.sub||'')+c.flRow,foot:c.foot,css:T.sbT==='square'?'aspect-ratio:1/1':''}));
  const preview=T.sbT==='link'?`<div class="linkcard"><div style="height:150px;position:relative">${hills({dark:1})}<div style="position:absolute;left:50%;bottom:30%;transform:translateX(-50%)">${c.art.replace('alt=""','style="height:90px" alt=""')}</div></div><div style="padding:10px 12px"><div style="font-weight:600;font-size:14px">${c.o.title}</div><div style="font-size:12px;color:#666">acorns.com</div></div></div>`:`<div style="width:${T.sbT==='square'?250:210}px">${card}</div>`;
  return {cls:'dark',html:`${topbar({title:'Share'})}<div class="body"><div class="sb-tpl">${[['story','Story'],['square','Square'],['link','Link']].map(([k,l])=>`<button class="${T.sbT===k?'on':''}" onclick="T.sbT='${k}';refresh()">${l}</button>`).join('')}</div>
  <div class="sb-prev">${preview}</div>
  <div class="card dk" style="padding:4px 16px">${[['sbName','Show my first name'],['sbStage','Show my stage'],['sbFl','Show my oak extras']].map(([k,l])=>`<div class="li" style="cursor:default;border-color:rgba(255,255,255,.08)"><div class="grow ttl" style="color:#fff;font-size:15px">${l}</div><div class="tog ${T[k]?'on':''}" onclick="T['${k}']=!T['${k}'];refresh()"></div></div>`).join('')}</div>
  <p class="sm mt12" style="color:var(--sk-sub)">Every card carries your link. Never amounts, balances, or returns. You choose where it goes.</p></div>
  ${foot(btn(`${ic('share',18)} Share`,`share({title:${JSON.stringify(c.o.title).replace(/"/g,'&quot;')},story:${JSON.stringify(card).replace(/"/g,'&quot;')}})`,'wh'),btn('Save image',"toast('Saved to Photos')",'ghost'))}`}});
function shareOak(){T.sbT=undefined;T.sbName=undefined;go('share-b',{kind:'oak'})}

/* ---------- §6b Momentum states: demo switcher (outside the phone) ---------- */
function demoSet(st){spInit();if(st==='done'){S.reset=false;if(!S.invested){S.invested=true;if(S.streak<1)S.streak=1}}else if(st==='todo'){S.reset=false;S.invested=false;if(S.streak<1)S.streak=5}else{S.reset=true;S.streak=0;S.invested=false}
  S.stage=stageFor(S.streak);save();demoPaint();const id=cur()&&cur().dataset.id;if(id)refresh();toast(st==='reset'?'Streak reset · flourishes kept':st==='done'?'Week done':'Week not done')}
function demoPaint(){const s=skState();$$('.demo-sw button').forEach(b=>b.classList.toggle('on',b.dataset.s===s))}
(function(){const side=document.getElementById('side');if(!side)return;const d=document.createElement('div');d.className='demo-sw';d.innerHTML=`<div class="lab">Review mode · streak state</div>${[['todo','Week not done'],['done','Week done'],['reset','Streak reset']].map(([k,l])=>`<button data-s="${k}" onclick="demoSet('${k}')">${l}</button>`).join('')}<div class="lab" style="margin-top:14px">Simulate</div><button onclick="S.pay.detected=true;save();home('gt-home');toast('Paycheck landed')">Paycheck lands</button><button onclick="S.detect.on=true;S.detect.cats=['Coffee'];save();home('gt-home');toast('A skip was spotted')">A skip is spotted</button><button onclick="jumpAhead();spInit();home('gt-home')">Jump ahead 4 weeks</button>`;side.appendChild(d);setTimeout(demoPaint,300)})();
function protoMenu(){spInit();const s=skState();sheet(`<div class="h3">Prototype</div><p class="sm mt8">For walkthroughs. Not part of the product.</p>
  <div class="eyebrow mt16">Streak state</div><div class="seg mt8" style="background:#f2f2f2">${[['todo','Not done'],['done','Done'],['reset','Reset']].map(([k,l])=>`<button style="color:${s===k?'#0a1d08':'#555'};${s===k?'background:#74c947':''}" onclick="closeOv();setTimeout(()=>demoSet('${k}'),200)">${l}</button>`).join('')}</div>
  <div class="mt12">
  <div class="li" onclick="closeOv();setTimeout(()=>home('menu'),200)">${ic('menu')}<div class="grow ttl">All experiences</div>${ic('chev',18,'opacity:.35')}</div>
  <div class="li" onclick="closeOv();jumpAhead();spInit();setTimeout(()=>home('gt-home'),200);toast('Jumped ahead 4 weeks')">${ic('ff')}<div class="grow"><div class="ttl">Jump ahead 4 weeks</div><div class="sub">Grove filled in, challenges running</div></div></div>
  <div class="li" onclick="closeOv();S.pay.detected=true;save();setTimeout(()=>home('gt-home'),200)">${ic('bank')}<div class="grow"><div class="ttl">Simulate: paycheck lands</div></div></div>
  <div class="li" onclick="closeOv();S.detect.on=true;S.detect.cats=['Coffee'];save();setTimeout(()=>home('gt-home'),200)">${ic('spark')}<div class="grow"><div class="ttl">Simulate: a skip is spotted</div><div class="sub">Turns on opt-in detection for coffee</div></div></div>
  <div class="li" onclick="closeOv();setTimeout(()=>go('states'),200)">${ic('eye')}<div class="grow"><div class="ttl">Edge states</div><div class="sub">Empty, locked, error, expired…</div></div>${ic('chev',18,'opacity:.35')}</div>
  <div class="li" onclick="closeOv();resetAll()">${ic('close')}<div class="grow"><div class="ttl">Reset everything</div></div></div></div>`)}

/* ---------- Share card v2: matches the Figma card set (light scene, white content card, lockup + link) ---------- */
function storyCard(o){o=o||{};return `<div class="story v2 ${/1\s*\/\s*1/.test(o.css||'')?'sq':''}" style="${o.css||''}"><div class="st2-scene">${hills({})}<div class="st2-art">${o.art||`<img src="${IMG[rstage(S.streak)[2]]}" alt="">`}</div></div>
  ${o.eyebrow?`<div class="st2-chip">${o.eyebrow}</div>`:''}
  <div class="st2-card"><div class="st2-title">${o.title||''}</div>${o.sub?`<div class="st2-sub">${o.sub}</div>`:''}<div class="st2-foot"><span class="lk"><img src="${IMG.acorn}" alt="">acorns</span><span>${(o.foot||'acorns.com/j/jordan').replace('acorns.com/g/','acorns.com/j/')}</span></div></div></div>`}

/* ---------- Home v3: layout from the Home reference (greeting hero → one NBG slot → bento → timeline) ---------- */
function hmHello(){const s=skState(),w=S.streak,st=rstage(w);const nx=RSTAGES.find(r=>r[0]>w);const img=`<img src="${IMG[st[2]]}" alt="">`;
  if(s==='reset')return `Hello, ${S.me}<br>Your oak ${img} kept every flourish. <em>Plant this week</em> and it grows from here.`;
  if(w===0)return `Hello, ${S.me}<br>Your oak starts ${img} <em>as an acorn</em>. One investment this week plants it.`;
  return `Hello, ${S.me}<br>Your ${img} <em>${w} week streak</em> is ${s==='done'?'growing. This week counts.':'growing.'}${nx?` <em>${nx[0]-w} week${nx[0]-w===1?'':'s'}</em> to ${nx[1]}.`:''}`}
function ringAv(id,p){const r=19,c=2*Math.PI*r;return `<div class="r"><svg width="44" height="44" viewBox="0 0 44 44"><circle cx="22" cy="22" r="${r}" stroke="rgba(255,255,255,.12)" stroke-width="2.5" fill="none"/><circle cx="22" cy="22" r="${r}" stroke="#74c947" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-dasharray="${c*p} ${c}" transform="rotate(-90 22 22)"/></svg>${av(id)}</div>`}
let TLV='hi';const CHEER={};
function tlItems(){const w=S.streak,st=rstage(w);const it=[];
  if(w>0)it.push({k:'streak',lab:'Your Streak',t:`${w} weeks. ${st[1]}`,d:'This week',art:`<div class="hero"><div class="ringart"><img src="${IMG[st[2]]}" alt=""></div></div>`,n:4,c:1});
  growing().forEach(g=>{const W=wk(g.id);it.push({k:'g-'+g.id,lab:nm(g.id),t:g.open?`Hasn’t invested yet this week`:`${W} weeks. ${rstage(W)[1]}`,d:g.open?'Send rain as a gentle nudge':'Invested this week',side:`<img src="${IMG[rstage(W)[2]]}" alt="">`,n:g.id==='mom'?6:2,c:0,water:g.open?g.id:null})});
  S.flourishes.slice(-3).reverse().forEach(k=>FLIMG[k]&&it.push({k:'f-'+k,lab:FLNAME[k],t:k==='roots'?'Roots planted':k==='acorns'?'Round-Ups® activated':k==='nest'?'A nest for rainy days':k==='gold'?'A gold leaf':k==='sapling'?'A sapling planted':k==='flowers'?'A wildflower bloomed':'A songbird landed',d:'Your oak',side:`<img src="${IMG[FLIMG[k]]}" alt="">`,n:3,c:0}));
  it.push({k:'start',lab:'Welcome to Acorns',t:'Started my journey',d:'Oct 2026',side:`<img src="${IMG.acorn}" alt="">`,n:5,c:2});
  return TLV==='hi'?it.filter(x=>x.k==='streak'||x.k.indexOf('f-')===0||x.water||x.k==='start').slice(0,5):it}
function tlCard(x){const on=CHEER[x.k];return `<div class="tl">${x.art||''}<div class="${x.side?'side':''}"><div><div class="lab">${x.lab}</div><div class="ttl">${x.t}</div></div>${x.side||''}</div>
  <div class="meta"><span>${x.d}</span><div class="rx">${x.water?`<button style="color:#8cc4f7" onclick="groveSheet('full')">${ic('drop',14)} Send rain</button>`:''}<button class="${on?'on':''}" onclick="CHEER['${x.k}']=!CHEER['${x.k}'];haptic(6);refresh()" aria-label="Cheer">${on?'♥':'♡'} ${x.n+(on?1:0)}</button><button onclick="toast('Cheers only. No comments in the prototype.')">${ic('chat',14)} ${x.c}</button></div></div></div>`}
def('gt-home',()=>{spInit();const s=skState();const gr=growing(),inv=S.grove.filter(x=>x.status==='invited');const open=gr.filter(x=>x.open);
  const shown=gr.slice(0,3);const more=gr.length+inv.length-shown.length;
  return {cls:'dark',html:`<div class="top"><button class="iconbtn" onclick="home('menu')" aria-label="Close">${ic('close')}</button><div style="flex:1"></div><button class="iconbtn" onclick="go('gt-notes')" aria-label="Notifications">${ic('bell',22)}</button><button class="iconbtn" onclick="protoMenu()" aria-label="Prototype menu">${ic('menu',22)}</button></div>
  <div class="body" style="padding-top:4px">
   <div class="hm-av">${S.me[0]}</div>
   <div class="hm-hello mt16">${hmHello()}</div>
   <div class="mt16">${streakChip()}</div>
   <div class="mt24" id="nbgW">${nbgBlock()}</div>
   <div class="bento mt16">
    <div class="bnt" onclick="home('gt-grove')"><div class="bh">Your grove</div>
     ${gr.length||inv.length?`<div class="avr">${shown.map(g=>`<div style="position:relative">${ringAv(g.id,g.open?0:1)}${g.open?`<span class="dropbadge" style="position:absolute;right:-3px;top:-3px">${ic('drop',11,'color:#fff')}</span>`:''}</div>`).join('')}${more>0?`<div class="more">+${more}</div>`:''}</div>
     ${open.length?`<div class="bs" style="margin-top:10px;color:#8cc4f7">${nm(open[0].id)} hasn’t invested yet</div>`:`<div class="bs" style="margin-top:10px">Everyone invested</div>`}`:`<div class="bb"><div class="spot" style="margin:0 0 8px">${ic('plus',18)}</div><div class="bs">Plant someone beside you</div></div>`}</div>
    <div class="bnt" onclick="home('gt-ch')"><div class="bh">Challenges</div><div class="bb"><div class="big">${S.challenges.length||'Start one'}</div><div class="bs">${S.challenges.length?'running at once':'Bring people in'}</div></div></div>
    <div class="bnt" onclick="home('gt-oak')"><div class="bh">Your oak</div><div style="position:absolute;left:0;right:0;bottom:8px;display:flex;justify-content:center"><img src="${IMG[rstage(S.streak)[2]]}" style="height:${rstage(S.streak)[2]==='acorn'?60:96}px" alt=""></div></div>
    <div class="bnt" onclick="home('gt-oak')"><div class="bh">Oak extras</div><div class="bb"><div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px">${S.flourishes.filter(k=>FLIMG[k]).slice(0,4).map(k=>`<img src="${IMG[FLIMG[k]]}" style="height:30px" alt="${FLNAME[k]}">`).join('')||`<img src="${IMG.seedling}" style="height:30px;filter:grayscale(1);opacity:.4" alt="">`}</div><div class="bs">${S.flourishes.length} of 9 added</div></div></div>
   </div>
   <div class="sk-sec"><div class="h4">Ways to grow</div></div>
   <div class="row" style="gap:10px;overflow-x:auto;padding-bottom:6px;scrollbar-width:none;align-items:flex-start">${[['Skip and Stash','roundup',"go('ss2-pick')"],['Money Type','seedling',"T={};go('mt2-intro')"],['Money Manager','later',"go('ac-mm')"],['Future Club','learn',"go('fc-types')"],['Journal','oak',"go('journal')"]].map(([t,im,a])=>`<div class="fl-tok" style="width:78px" onclick="${a}"><div class="im" style="width:78px"><img src="${IMG[im]}" alt=""></div><div class="nm">${t}</div></div>`).join('')}</div>
   <div class="sk-sec" style="align-items:center"><div class="h4">Timeline</div><div class="tl-seg"><button class="${TLV==='hi'?'on':''}" onclick="TLV='hi';refresh()">Highlights</button><button class="${TLV==='la'?'on':''}" onclick="TLV='la';refresh()">Latest</button></div></div>
   ${tlItems().map(tlCard).join('')}
   <div style="height:80px"></div></div>
  ${S.ffDone?'':`<button class="ff" onclick="jumpAhead();spInit();refresh();toast('Jumped ahead 4 weeks')">${ic('ff',12)} Jump ahead 4 weeks</button>`}
  ${tabbarDk('gt-home')}`,
  mount(el){if(!NBG_LOADED)setTimeout(()=>{NBG_LOADED=true;const wv=$('#nbgW',el);if(wv)wv.innerHTML=nbgBlock()},650);
    const iv=S.grove.find(x=>x.status==='invited'&&PEOPLE[x.id].on);if(iv&&!S.ffDone&&!iv.seen){iv.seen=1;setTimeout(()=>{if(cur().dataset.id!=='gt-home')return;S.friendJoined=iv.id;save();banner(`${nm(iv.id)} signed up`,'Their tree sprouts after their first investment.',()=>groveSheet('half'));refresh()},2600)}}}});
def('gt-notes',()=>({cls:'dark',html:`${topbar({title:'Notifications'})}<div class="body">${[['learn','Mom hasn’t invested yet this week','Send rain as a gentle nudge. It only counts when she invests.',"groveSheet('full')"],['seedling','Sam invested this week','12 weeks side by side',"home('gt-grove')"],['roundup','Skipped coffee today?','Drop a coin in your Coffee jar',"go('jar',{id:'j1'})"],['later','Your October recap is ready','4 weeks, 1 new oak extra',"go('recap',{m:9})"]].map(([im,t,s,a])=>skRow(`<img src="${IMG[im]}" alt="">`,t,s,'nav',a)).join('')}
  <p class="sm mt16" style="color:var(--sk-sub)">At most 2 pushes a week across everything. None between 9pm and 8am.</p></div>`}));

function zf(){const d=document.getElementById('device');return d&&parseFloat(getComputedStyle(d).zoom)||1}
