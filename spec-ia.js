/* =====================================================================
   The IA · one pill, three places.
   Oak = you (streak, the Friday count, your witnesses, your cards, acorns).
   Grove = people you know (trees, rain, challenges with the Bloom pinned,
   shared goals, family watching). Forest = everyone (the room, the question,
   nurse trees on duty, Canopy on red days).
   Roots / Family Tree hubs stay as story landings, but the product lives here.
   ===================================================================== */
/* ---- Oak: the Friday count, your witnesses, your cards ---- */
function oakWitness(){const r=rtSt();const ws=r.witnesses;
 if(!ws.length)return `<div class="ia-card"><div class="ia-q">Who would notice if you stopped?</div><p>One person, or a few. They see your goal’s name and a yes or no every Friday. Never the balance. They decide if they’re in.</p><button class="btn sg-cta" style="height:46px" onclick="go('rt-pick')">Pick someone</button><button class="rt-alt" onclick="home('fo-grove')">Nobody comes to mind</button></div>`;
 return `<div class="ia-card"><div class="ia-h"><div><b>${ws.length===1?ws[0].name+' sees you show up':ws.length+' people see you show up'}</b><em>A yes or no each Friday · never the balance</em></div><button class="sgx-edit" onclick="go('rt-pick')">${ic('plus',12)} Add</button></div>
  ${ws.map(w=>`<div class="rt-w">${soAv(w.id,36)}<div class="grow"><b>${w.name}</b><em>${w.state==='asked'?'Reading what they’d get…':w.last?(w.last.sticker?'Saw Friday · sent a sticker':'Saw Friday'):'In'}</em></div>${w.state==='asked'?'<span class="rt-wait"><i></i><i></i><i></i></span>':w.last?(w.last.sticker?`<span class="rt-stk pop">${w.last.sticker}</span>`:`<span class="rt-stk wait">…</span>`):'<span class="so-chip">In</span>'}</div>${w.note?`<div class="rt-note">${soAv(w.id,22)}<p>“${w.note}”</p></div>`:''}`).join('')}
  <div class="rt-wacts"><button onclick="${r.goal.paused?'rtResume()':'rtPause()'}">${r.goal.paused?'Restart at $5':'Pause the goal'}</button><button onclick="rtStop()">Stop sharing</button></div></div>`}
function oakRings(){const r=rtSt();const i=stageIdx(S.streak);const w=r.witnesses.filter(x=>x.state==='in').map(x=>x.name);
 return `<div class="ia-sec" data-ia="rings"><b>Your cards</b><button onclick="go('rt-guest',{who:'jess'})">See one as a guest</button></div>
  <div class="ia-rings">${[['Your stage',sealImg(i,64),RSTAGES[i][1],`${S.streak} weeks in a row`,"rtShareRing()"],['Every January',svgSeal({top:'2026',bottom:'47 of 52',glyph:'trophy',size:64}),'The Year Ring',w.length?`Witnessed by ${w.join(' and ')}`:'Add a witness and their name goes on it',"go('rt-year')"]].map(([k,im,t,d,js])=>`<button class="ia-ring" onclick="${js}"><em>${k}</em>${im}<b>${t}</b><span>${d}</span><i>${ic('share',14)} Share</i></button>`).join('')}</div>
  <button class="ia-acorn" onclick="${r.acorns.have?"go('rt-acorn')":"toast('The next milestone hands you one')"}"><span class="rt-acorn ${r.acorns.have?'':'dim'}">${stageImg(0,40)}</span><div class="grow"><b>${r.acorns.have?'You’ve got an acorn':r.acorns.sent.length?`${r.acorns.sent.filter(a=>a.goal).length} of ${r.acorns.sent.length} acorns became goals`:'No acorn right now'}</b><em>${r.acorns.have?'$5 you can only plant in someone’s first goal':'Milestones hand you one · 4 a year'}</em></div>${r.acorns.have?`<span class="so-join">Plant it</span>`:ic('chev',16,'opacity:.4')}</button>`}
/* ---- Home is a dashboard of squares. Tap one to go deeper; deeper pages have a back button, no tabs. ---- */
function iaTile(cls,title,vis,meta,js){return `<button class="bnt ia-t ${cls||''}" onclick="${js}"><div class="bh">${title}</div><div class="ia-v">${vis}</div><div class="bs">${meta}</div></button>`}
function iaAvs(ids,sz){return `<span class="ia-avs">${ids.map(id=>sgAv(id,sz||36)).join('')}</span>`}
function iaBento(){const r=rtSt();const ws=r.witnesses.filter(w=>w.state==='in');const gr=growing();const open=gr.filter(x=>x.open);const i=stageIdx(S.streak);const s=r.season;const fo=foSt();
 return `<div class="bento ia-grid">
  ${iaTile('',`Your oak`,stageImg(S.streak,60),`${RSTAGES[i][1]} · ${S.streak} weeks`,"home('gt-oak')")}
  ${iaTile('grove',`Your grove`,`<span class="ia-trees">${gr.slice(0,4).map((g,k)=>`<span class="${g.open?'open':''}">${stageImg(wk(g.id),[34,46,30,40][k%4])}</span>`).join('')}</span>`,open.length?`<span class="ia-blue">${nm(open[0].id)} hasn’t invested yet</span>`:'Everyone invested this week',"GSEL=null;home('gt-grove')")}
  ${iaTile('',`Witnesses`,ws.length?iaAvs(ws.slice(0,4).map(w=>w.id)):`<span class="ia-empty">${ic('user',18)}</span>`,ws.length?`${ws.map(w=>w.name).join(', ')} see your Fridays`:`<span class="ia-green">Pick who’d notice if you stopped</span>`,"go('rt-home',{only:'you'})")}
  ${iaTile('',`This month’s Bloom`,`<div class="ia-tbar"><i style="width:${Math.min(100,Math.round(s.bar/s.target*100))}%"></i></div>`,`No-Spend November · ${s.done?'finished':s.joined?'you’re in':'48,000 of us'}`,"go('rt-home',{only:'bloom'})")}
  ${iaTile('',`Your cards`,sealImg(i,60),r.acorns.have?`<span class="ia-green">An acorn to plant</span>`:'Milestones and the Year Ring',"go('rt-home',{only:'rings'})")}
  ${iaTile(fo.red?'red':'',`The Forest`,`<span class="ia-forest">${[7,5,6,7,5,6,7,5,6].map((t,k)=>`<img src="${stageSrc(t)}" style="height:${[30,24,27,32,22,26,30,23,27][k]}px;margin-left:${k?-10:0}px;z-index:${k%2?2:1}" alt="">`).join('')}</span>`,fo.red?'Red day · Canopy is open':'3,100 people with your goal',"go('fo-grove')")}
 </div>`}
(function(){const f=SCR['gt-oak'];if(!f)return;SCR['gt-oak']=p=>{const r=f(p);const keys=Object.keys(ORB_SLOTS);const on=keys.filter(k=>(S.flourishes||[]).indexOf(k)>-1);const off=keys.filter(k=>on.indexOf(k)<0);
 const row=(k,has)=>{const x=FL[k];const im=FLIMG[k]?`<img src="${IMG[FLIMG[k]]}" alt="">`:'';return `<button class="ox-row ${has?'on':''}" onclick="flourishSheet('${k}')"><span class="ox-ic">${im}</span><span class="grow"><b>${x.name}<small>· ${x.habit}</small></b><em>${x.line}</em></span>${has?`<span class="ox-ok">${ic('check',12)} Growing</span>`:ic('chev',16,'opacity:.35')}</button>`};
 r.html=r.html.replace(/<div class="body" style="padding-top:8px">[\s\S]*?<div class="oflg">[\s\S]*?<\/div><div style="height:90px"><\/div><\/div>/,`<div class="body" style="padding-top:8px"><div class="row between" style="align-items:baseline"><div class="h2">Your oak</div><span class="sm" style="color:var(--sk-sub)">${on.length} of ${keys.length} growing</span></div><p class="sm" style="color:var(--sk-sub);margin:6px 0 14px;line-height:1.45">Your streak sets the height. Other habits grow things on it. Your grove sees what’s growing, never amounts.</p>
  ${on.length?`<div class="ox-sec">Growing</div><div class="ox-list">${on.map(k=>row(k,true)).join('')}</div>`:''}
  <div class="ox-sec">Not yet</div><div class="ox-list">${off.map(k=>row(k,false)).join('')}</div><div style="height:90px"></div></div>`);
 return r}})();
document.head.insertAdjacentHTML('beforeend',`<style>
.ox-sec{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#6b706c;margin:16px 4px 8px}
.ox-list{background:#fff;border:1px solid #e3e8df;border-radius:20px;padding:4px 8px}
.ox-row{display:flex;align-items:center;gap:14px;width:100%;text-align:left;padding:13px 6px 13px 8px;color:#191919}.ox-row+.ox-row{border-top:1px solid #f0f2ee}
.ox-ic{width:46px;height:46px;border-radius:14px;background:#f3f6f0;display:flex;align-items:center;justify-content:center;flex:none}.ox-ic img{height:30px;width:auto;filter:grayscale(1);opacity:.55}.ox-row.on .ox-ic{background:#edf8e6}.ox-row.on .ox-ic img{filter:none;opacity:1}
.ox-row b{display:block;font-size:16px;letter-spacing:-.2px}.ox-row b small{font-size:13px;font-weight:500;color:#6b706c;margin-left:4px}.ox-row em{display:block;font-style:normal;font-size:13px;color:#6b706c;line-height:1.35;margin-top:3px}
.ox-ok{display:inline-flex;align-items:center;gap:4px;font-size:12px;font-weight:700;color:#2f7a12;background:#e3f4d8;padding:5px 10px;border-radius:13px;flex:none}
</style>`);
/* Home: four pivots, You · People · Everyone. One hero and a few rows each. No bento, no row of squares. */
window.HPIV=window.HPIV||'you';
function hpRow(vis,t,sub,js,cls){return `<button class="hp-row ${cls||''}" onclick="${js}"><span class="hp-ic">${vis}</span><span class="grow"><b>${t}</b><em>${sub}</em></span>${ic('chev',16,'opacity:.35')}</button>`}
function hpYou(){const r=rtSt();const i=stageIdx(S.streak);const nx=nextGoal(S.streak);const ff=(S.flourishes||[]).length;
 return `<button class="hp-hero" onclick="go('streaks')"><div class="hp-hsc"><img src="${stageSrc(i)}" alt=""></div><div class="hp-ht"><em>${RSTAGES[i][1]}</em><b>${S.streak} week streak</b><span>Best ${Math.max(S.streak,S.best||24)} weeks · open Streaks</span><div class="hp-hbar"><i style="width:${Math.min(100,Math.round(S.streak/(nx[0]||S.streak)*100))}%"></i></div></div></button>
  <div class="mt12" id="nbgW">${nbgBlock()}</div>
  <div class="hp-list mt16">
   ${(()=>{const g=r.goal;const ws=r.witnesses.filter(w=>w.state==='in');return hpRow(`<img src="${stageSrc(stageIdx(g.weeks))}" alt="">`,'Your goal',`${g.name} · $${g.amt} a week · ${ws.length?`${ws.map(w=>w.name).join(' and ')} witness${ws.length===1?'es':''}`:'no witness yet'}`,"go('rt-home',{only:'you'})")})()}
   ${hpRow(sealImg(i,40),'Your achievements',`${RSTAGES[i][1]} card · the Year Ring · recaps`,"go('journal')")}
   ${hpRow(`<img src="${IMG.seedling}" alt="">`,'Your oak',ff?`${ff} of 7 growing`:'What grows on it',"home('gt-oak')")}
   ${hpRow(`<img src="${IMG.roundup}" alt="">`,'Skip and Invest','Skip a spend, invest it right away',"go('ss2-pick')")}
   ${hpRow(`<img src="${IMG.learn}" alt="">`,'Know yourself','Short quizzes, a minute each',"go('qz-hub')")}
  </div>
  <div class="hp-sec row between"><span>Timeline</span><span class="seg"><button class="${TLV==='hi'?'on':''}" onclick="TLV='hi';refresh()">Highlights</button><button class="${TLV==='la'?'on':''}" onclick="TLV='la';refresh()">Latest</button></span></div>
  <div class="hp-tl">${tlItems().map(tlCard).join('')}</div>`}
function hpPeople(){const r=rtSt();const ws=r.witnesses.filter(w=>w.state==='in');const gr=growing(),inv=S.grove.filter(x=>x.status==='invited');const open=gr.filter(x=>x.open);const ft=ftSt();const sh=ft.shared;const tot=sh.members.reduce((a,m)=>a+m.part,0);const ch=(typeof chRunning==='function'?chRunning():3);
 return `<div class="hp-list">
   ${hpRow(`<img src="${stageSrc(6)}" alt="">`,'Your grove',open.length?`<i class="hp-blue">${nm(open[0].id)} hasn’t invested yet</i>`:gr.length||inv.length?`${gr.length+inv.length} growing with you · ${ch} challenges`:'Invite someone to grow with you',"GSEL=null;home('gt-grove')")}
   ${hpRow(`<span class="hp-avs">${sgAv('priya',24)}${sgAv('sam',24)}</span>`,'Shared goals',`${sgAll().length} goals · with Priya and Sam`,"go('sg-list')")}
   ${hpRow(`<img src="${stageSrc(2)}" alt="">`,'Family',`${ft.kid.name}’s ${ft.kid.goal.toLowerCase()} · ${Object.keys(ft.rel).length||2} relatives watching`,"go('ft-home',{only:'seed'})")}
   ${hpRow(`<img src="${IMG.learn}" alt="">`,'Learn together','A two-minute lesson, read with someone',"go('fo-learn')")}
   ${r.acorns.have?hpRow(`<img src="${stageSrc(0)}" alt="">`,'Drop an acorn','$5 to give someone starting out',"go('rt-acorn')"):''}
  </div>`}
function hpEveryone(){const r=rtSt();const s=r.season;const fo=foSt();const pc=Math.min(100,Math.round(s.bar/s.target*100));
 return `<div class="hp-fc">${rtFridayCount({q:true})}</div>
  <button class="hp-hero bloom" onclick="go('rt-home',{only:'bloom'})"><div class="hp-ht wide"><em>This month’s Bloom · day 12 of 30</em><b>No-Spend November</b><span>${s.done?'Finished. $5 landed.':s.joined?'You’re in · '+s.people.toLocaleString()+' of us':s.people.toLocaleString()+' of us, going for '+s.target.toLocaleString()}</span><div class="hp-hbar"><i style="width:${pc}%"></i></div></div><img class="hp-bart" src="${stageSrc(4)}" alt=""></button>
  <div class="hp-list mt16">
   ${hpRow(`<img src="${stageSrc(7)}" alt="">`,'Your room',fo.shared?'3,100 with your goal · no names':'3,100 with your goal · see the spread',"go('fo-grove')")}
   ${hpRow(`<span class="hp-avs">${soAv('kim',22)}${soAv('dee',22)}</span>`,'Canopy',fo.red?'Red day · the whole bench is on':'Tasha and Dee are on · ask, don’t sell',"go('fo-canopy')",fo.red?'red':'')}
  </div>`}
(function(){SCR['gt-home']=p=>{spInit();NBG_LOADED=true;const P=window.HPIV;const fo=foSt();
 const piv=[['you','You'],['people','People'],['everyone','Everyone']].map(([k,t])=>`<button class="${P===k?'on':''}" role="tab" aria-selected="${P===k}" onclick="HPIV='${k}';refresh()">${t}</button>`).join('');
 return {cls:'dark hp',html:`<div class="top"><button class="iconbtn" onclick="home('menu')" aria-label="Close">${ic('close')}</button><div style="flex:1"></div><button class="iconbtn" onclick="go('gt-notes')" aria-label="Notifications">${ic('bell',22)}</button><button class="iconbtn" onclick="protoMenu()" aria-label="Prototype menu">${ic('menu',22)}</button></div>
  <div class="body hp-body" style="padding-top:4px">
   <div class="hm-av">${S.me[0]}</div>
   <div class="hm-hello mt16">Hello, ${S.me}<br>${(()=>{const s=skState();const W=['zero','one','two','three','four','five','six','seven','eight','nine','ten'];const n=w=>W[w]||w;const w=S.streak;if(s==='reset')return 'A new acorn. <em>This Friday counts.</em>';if(s==='done')return `${n(w)[0].toUpperCase()+n(w).slice(1)} Friday${w===1?'':'s'} in a row. <em>See you next week.</em>`;return `${n(w)[0].toUpperCase()+n(w).slice(1)} Friday${w===1?'':'s'} in a row. <em>This one’s open.</em>`})()}</div>
   <div class="mt16">${streakChip()}</div>
   <div class="hp-piv mt24" role="tablist">${piv}</div>
   ${fo.red?`<button class="fo-red hp-red" onclick="go('fo-canopy')"><span class="so-chip live"><i></i>Red day · −6%</span><b>Canopy is open</b><em>Ask one question. Someone who held through three drops answers within the hour.</em>${ic('chev',16,'opacity:.5')}</button>`:''}
   ${P==='people'?hpPeople():P==='everyone'?hpEveryone():hpYou()}<div style="height:110px"></div></div>${whClock([['It’s Friday','rtFriday()']])}`,
  mount(el){const iv=S.grove.find(x=>x.status==='invited'&&PEOPLE[x.id].on);if(iv&&!S.ffDone&&!iv.seen){iv.seen=1;setTimeout(()=>{if(cur().dataset.id!=='gt-home')return;S.friendJoined=iv.id;save();banner(`${nm(iv.id)} signed up`,'Their tree sprouts after their first investment.',()=>groveSheet('half'));refresh()},2600)}}}}})();
document.head.insertAdjacentHTML('beforeend',`<style>
.hp-piv{display:flex;gap:24px;border-bottom:1px solid rgba(255,255,255,.1);margin-bottom:16px}.hp-piv button{position:relative;font-size:15px;font-weight:600;color:rgba(255,255,255,.55);height:40px;background:none;padding:0}.hp-piv button.on{color:#fff}.hp-piv button.on::after{content:'';position:absolute;left:0;right:0;bottom:-1px;height:2px;border-radius:2px 2px 0 0;background:#74c947}
.hp-hero{display:flex;align-items:center;gap:14px;width:100%;text-align:left;padding:16px;border-radius:22px;background:linear-gradient(160deg,#17411a,#0b2110);border:1px solid rgba(116,201,71,.18);color:#fff;overflow:hidden;position:relative}
.hp-hsc{width:92px;height:92px;border-radius:50%;background:radial-gradient(circle at 50% 70%,#3b7a2a,#143a12 70%);display:flex;align-items:flex-end;justify-content:center;flex:none;overflow:hidden}.hp-hsc img{height:72px;width:auto;margin-bottom:8px}
.hp-ht{flex:1;min-width:0}.hp-ht em{display:block;font-style:normal;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#bceaa3}.hp-ht b{display:block;font-size:22px;letter-spacing:-.4px;line-height:1.1;margin-top:4px}.hp-ht span{display:block;font-size:13px;color:rgba(255,255,255,.75);margin-top:4px}.hp-ht .hp-blue{font-style:normal;color:#8cc4f7}
.hp-hbar{height:6px;border-radius:3px;background:rgba(255,255,255,.14);margin-top:12px;overflow:hidden;width:100%}.hp-hbar i{display:block;height:100%;border-radius:3px;background:#8fd867}
.hp-hero.grove{background:linear-gradient(160deg,#1c4a1b,#0b2110)}.hp-trees{display:flex;align-items:flex-end;gap:2px;flex:none;width:112px;justify-content:center;height:72px}
.hp-hero.bloom{background:linear-gradient(165deg,#17411a 0%,#0b2110 60%,#081a0c 100%);padding-right:96px}.hp-bart{position:absolute;right:-4px;top:-4px;height:100px;width:auto;opacity:.95}
.hp-list{background:#0f1f0d;border:1px solid rgba(116,201,71,.14);border-radius:20px;padding:4px 8px}.hp-row{display:flex;align-items:center;gap:14px;width:100%;text-align:left;padding:14px 6px 14px 8px;color:#fff}.hp-row+.hp-row{border-top:1px solid rgba(255,255,255,.07)}.hp-row .grow{min-width:0}
.hp-ic{width:46px;height:46px;border-radius:14px;background:rgba(255,255,255,.07);display:flex;align-items:center;justify-content:center;flex:none;overflow:hidden}.hp-ic img{height:30px;width:auto;max-width:36px;object-fit:contain}.hp-ic .seal{height:34px}.hp-row.red .hp-ic{background:rgba(229,57,53,.22)}
.hp-avs{display:inline-flex;gap:2px}.hp-avs .sg-av,.hp-avs .so-av{width:22px!important;height:22px!important;font-size:10px!important;margin:0!important;box-shadow:none}.hp-seat{width:26px;height:26px;border-radius:50%;border:1.5px dashed rgba(255,255,255,.4)}
.hp-row b{display:block;font-size:16px;letter-spacing:-.2px;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.hp-row em{display:block;font-style:normal;font-size:13px;color:rgba(255,255,255,.62);margin-top:3px;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.hp-row em .hp-blue{font-style:normal;color:#8cc4f7}
.hp-n{font-size:18px;font-weight:700;color:#bceaa3}
.hp-sec{font-size:17px;font-weight:700;margin:22px 0 10px;color:#fff}.hp-sec .seg{display:inline-flex;gap:2px;background:rgba(255,255,255,.08);border-radius:16px;padding:2px}.hp-sec .seg button{font-size:12px;font-weight:600;padding:5px 10px;border-radius:14px;color:rgba(255,255,255,.6);background:none}.hp-sec .seg button.on{background:#fff;color:#191919}
.hp-scroll{gap:10px;overflow-x:auto;padding-bottom:6px;scrollbar-width:none;align-items:flex-start}
.hp .ia-avs .sg-av{box-shadow:0 0 0 2px #0f1f0d}
.hp-fc{margin-bottom:12px}.hp-fc .rt-fc{margin:0}
.hp-q .rt-fcq{margin:0;background:#0f1f0d;border:1px solid rgba(116,201,71,.14);border-radius:20px;padding:14px 16px}.hp-red{margin:0 0 16px}.hp-hero.learn{background:linear-gradient(160deg,#1a3f2a,#0b2110)}.hp .ia-empty{background:rgba(255,255,255,.1);color:rgba(255,255,255,.7)}
</style>`);
tabbarDk=function(){return ''};
/* deeper pages: one section, a back button, no tabs */
['rt-home','ft-home'].forEach(id=>{const f=SCR[id];SCR[id]=p=>{if(p&&p.only){T[id==='rt-home'?'rtTab':'ftTab']=p.only}const r=f(p);if(p&&p.only){r.html=r.html.replace(/<div class="ssx-seg wh-seg"[\s\S]*?<\/div>/,'').replace(/<div class="so-sec"[^>]*data-sec="[a-z]+"><b>[^<]*<\/b>(<button[^>]*>[^<]*<\/button>)?<\/div>/,(m,btn)=>btn?`<div class="so-sec ia-only">${btn}</div>`:'').replace('style="top:calc(var(--safeTop) + 104px)"','').replace(/<b>(Roots|Family Tree)<\/b>/,`<b>${{you:'Your goal',bloom:'Bloom',rings:'Your achievements',seed:'Family',same:'Shared goals',learn:'Learn together'}[p.only]||''}</b>`).replace('onclick="home(\'ac-home\')"','onclick="back()"')}return r}});
(function(){const f=SCR['fo-grove'];SCR['fo-grove']=p=>{const r=f(p);r.html=r.html.replace('onclick="home(\'ac-home\')" aria-label="Home"','onclick="home(\'gt-home\')" aria-label="Back"').replace(/<div class="sk-pill[\s\S]*?<\/div>/,'');r.cls=(r.cls||'').replace(' fog','');return r}})();
/* ---- Grove: shared goals and family watching live in the dock ---- */
/* ---- Forest: nurse trees ---- */
/* ---- the stories land in the new places ---- */
Object.assign(SPL.witness,{go:"T={};home('gt-home');go('rt-home',{only:'you'})"});Object.assign(SPL.fridaycount,{go:"T={};HPIV='everyone';home('gt-home')"});Object.assign(SPL.rings,{go:"T={};home('gt-home');go('rt-home',{only:'rings'})"});Object.assign(SPL.acorn,{go:"T={};home('gt-home');go('rt-home',{only:'rings'})"});Object.assign(SPL.roots,{go:"T={};home('gt-home')"});
Object.assign(SPL.bloom,{go:"T={};home('gt-home');go('rt-home',{only:'bloom'})"});Object.assign(SPL.family,{go:"T={};GSEL=null;home('gt-grove')"});Object.assign(SPL.forest,{go:"T={};go('fo-grove')"});
LFX.fridaycount=['rt-home',{only:'you'}].concat(LFX.fridaycount.slice(2));LFX.acorn=['rt-home',{only:'rings'}].concat(LFX.acorn.slice(2));LFX.witness=[ 'rt-home',{only:'you'}].concat(LFX.witness.slice(2));LFX.rings=['rt-home',{only:'rings'}].concat(LFX.rings.slice(2));LFX.bloom=['rt-home',{only:'bloom'}].concat(LFX.bloom.slice(2));LFX.family[0]='gt-grove';LFX.forest[0]='fo-grove';
window.__iaFocus=function(){Object.assign(FOCUS_SPEC.witness,{hub:'rt-home',hubLabel:'Open Witnesses',go:"T={};home('gt-home');go('rt-home',{only:'you'})",allow:['gt-home']});Object.assign(FOCUS_SPEC.fridaycount,{hub:'rt-home',hubLabel:'See the count',go:"T={};home('gt-home');go('rt-home',{only:'you'})",allow:['gt-home']});Object.assign(FOCUS_SPEC.rings,{hub:'rt-home',hubLabel:'Open my cards',go:"T={};home('gt-home');go('rt-home',{only:'rings'})",allow:['gt-home']});Object.assign(FOCUS_SPEC.acorn,{hub:'rt-home',hubLabel:'Open my cards',go:"T={};home('gt-home');go('rt-home',{only:'rings'})",allow:['gt-home']});Object.assign(FOCUS_SPEC.roots,{hub:'gt-home',hubLabel:'Open Home',go:"T={};home('gt-home')",allow:['gt-home']});Object.assign(FOCUS_SPEC.forest,{hub:'fo-grove',hubLabel:'Find my forest',go:"T={};go('fo-grove')",allow:['gt-home']});
Object.assign(FOCUS_SPEC.bloom,{hub:'rt-home',hubLabel:'Open the Bloom',go:"T={};home('gt-home');go('rt-home',{only:'bloom'})",allow:['gt-home']});Object.assign(FOCUS_SPEC.family,{hub:'gt-grove',hubLabel:'Open my grove',go:"T={};GSEL=null;home('gt-grove')",allow:['gt-home']});
['seedling','sametree','grove','canopy'].forEach(k=>{FOCUS_SPEC[k].allow=['gt-home']});FOCUS_HUBS.delete('gt-home');};
document.head.insertAdjacentHTML('beforeend',`<style>
.ia-card{margin-top:12px;padding:16px;border-radius:22px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:#fff}.ia-card p{margin:8px 0 14px;font-size:14px;line-height:1.45;color:rgba(255,255,255,.7)}.ia-q{font-size:20px;font-weight:600;letter-spacing:-.3px;line-height:1.15}.ia-card .rt-alt{color:#bceaa3}
.ia-h{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;margin-bottom:6px}.ia-h b{display:block;font-size:16px}.ia-h em{display:block;font-style:normal;font-size:12px;color:rgba(255,255,255,.6);margin-top:2px}.ia-card .sgx-edit{background:rgba(255,255,255,.1);color:#fff}
.ia-card .rt-w b{color:#fff}.ia-card .rt-w em{color:rgba(255,255,255,.6)}.ia-card .rt-wacts button{background:rgba(255,255,255,.1);color:#fff}.ia-card .rt-note{background:rgba(255,255,255,.08)}.ia-card .rt-note p{color:#fff}.ia-card .so-chip{background:rgba(255,255,255,.12);color:#fff}
.ia-sec{display:flex;align-items:center;justify-content:space-between;margin:24px 2px 8px}.ia-sec b{font-size:17px;color:#fff}.ia-sec button{font-size:13px;font-weight:600;color:#bceaa3}
.ia-rings{display:flex;gap:10px}.ia-ring{flex:1;display:flex;flex-direction:column;align-items:center;text-align:center;gap:6px;padding:14px 10px 12px;border-radius:20px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:#fff}.ia-ring em{font-style:normal;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.5)}.ia-ring b{font-size:14px;margin-top:4px}.ia-ring span{font-size:12px;color:rgba(255,255,255,.6);line-height:1.35}.ia-ring i{display:inline-flex;align-items:center;gap:4px;margin-top:10px;height:28px;padding:0 10px;border-radius:14px;background:rgba(255,255,255,.1);font-style:normal;font-size:12px;font-weight:600}.ia-ring .seal-im,.ia-ring .seal{margin-top:4px}
.ia-acorn{display:flex;align-items:center;gap:12px;width:100%;margin-top:10px;padding:12px 14px;border-radius:18px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:#fff;text-align:left}.ia-acorn b{display:block;font-size:14px}.ia-acorn em{display:block;font-style:normal;font-size:12px;color:rgba(255,255,255,.6)}.ia-acorn .rt-acorn{background:rgba(255,255,255,.1)}
.gv-fam{display:flex;flex-direction:column;gap:6px;margin-bottom:8px}
.scr.dark .rt-fc{box-shadow:0 0 0 1px rgba(116,201,71,.25)}
.scr:has(.wh-clock)>.body{padding-bottom:calc(var(--safeBot) + 150px)!important}
.ia-acorn .so-join{flex:none}
</style>`);

/* ---------- the front screen: one list, grouped the way the prototype is built ---------- */
(function(){const S0=[['You',[['Your goal','What you invest toward, and who sees your Fridays',"go('splash',{k:'witness'})"],['Your achievements','The card, not the balance · the Year Ring · recaps',"go('splash',{k:'rings'})"],['Acorns Year','Your year as a film, every December',"go('splash',{k:'year'})"],['Your oak','What grows on it, and the habits that grow it',"T={};home('gt-home');home('gt-oak')"],['Skip and Invest','Skip a spend, invest it right away',"go('splash',{k:'skip-and-stash'})"],['Know yourself','Short quizzes, a minute each',"go('splash',{k:'money-type'})"]]],
 ['People',[['Your grove','Their first investment plants a tree',"go('splash',{k:'invite'})"],['Shared goals','One goal, separate accounts, up to five',"go('splash',{k:'split'})"],['Family','Grandpa never downloads anything',"go('splash',{k:'seedling'})"],['Learn together','One lesson, two of you',"T={};home('gt-home');go('fo-learn')"],['Drop an acorn','$5 you can’t keep',"go('splash',{k:'acorn'})"]]],
 ['Everyone',[['The Friday Count','How many of us kept a promise this week',"go('splash',{k:'fridaycount'})"],['Bloom','A month, a target, all of us',"go('splash',{k:'bloom'})"],['Your room','Everyone with your goal, no names',"go('splash',{k:'grove'})"],['Canopy','Ask, don’t sell',"go('splash',{k:'canopy'})"]]]];
 window.__RVG=S0;RV_GO.length=0;S0.forEach(([g,items])=>items.forEach(x=>RV_GO.push(x)));
 const f=rvHTML;rvHTML=function(first){let h=f(first);
  const idx={};let n=0;const html=S0.map(([g,items])=>`<div class="rv-sec">${g}</div><div class="rv-g">${items.map(x=>{const i=n++;return `<button class="rv-i" onclick="rvRun(${i},'go')"><span><b>${x[0]}</b><em>${x[1]}</em></span>${ic('chev',16,'opacity:.35')}</button>`}).join('')}</div>`).join('');
  h=h.replace(/<div class="rv-sec">(The ideas|Explore)<\/div><div class="rv-g">[\s\S]*?<\/div>\s*(?=<div class="rv-sec">|<div class="rv-foot">)/,html);
  h=h.replace('A feature concept that lives inside the current Acorns app. Start on Home and tap into it the way a customer would.','Community at Acorns, a layer in front of Streaks. Three tabs on Home: You, People, Everyone. Start there and tap in the way a customer would, or jump to one piece below.');
  return h}})();
document.head.insertAdjacentHTML('beforeend','<style>.gvs .sk-pill{z-index:60;top:calc(var(--safeTop) + 58px)}.gvs .gv-hud{z-index:61}</style>');

document.head.insertAdjacentHTML('beforeend',`<style>
.ia-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:20px}.ia-grid .bnt{margin:0}
.ia-t{height:156px;display:flex;flex-direction:column;align-items:flex-start;text-align:left;padding:16px;border-radius:22px}.ia-t .bh{font-size:15px;font-weight:600;letter-spacing:-.1px}
.ia-v{flex:1;display:flex;align-items:center;width:100%;padding:6px 0}.ia-v img.stg{height:60px;width:auto}.ia-v .seal-im{width:60px;height:60px}
.ia-avs{display:inline-flex;align-items:center}.ia-avs .so-av,.ia-avs .sg-av,.ia-avs i{width:36px!important;height:36px!important;font-size:14px!important;border-radius:50%;margin-left:-8px;box-shadow:0 0 0 2px #fff;display:inline-flex;align-items:center;justify-content:center;flex:none}.ia-avs .so-av:first-child,.ia-avs .sg-av:first-child,.ia-avs i:first-child{margin-left:0}
.ia-trees{display:flex;align-items:flex-end;gap:2px;width:100%;height:60px;padding:0 4px 4px;border-radius:14px;background:linear-gradient(180deg,rgba(116,201,71,0),rgba(116,201,71,.22))}.ia-trees span{display:flex;align-items:flex-end}.ia-trees span.open img{filter:saturate(.4) brightness(.9);opacity:.7}.ia-trees img{width:auto}
.ia-forest{display:flex;align-items:flex-end;width:100%;height:60px;padding:0 6px 4px;border-radius:14px;background:linear-gradient(180deg,rgba(116,201,71,0),rgba(116,201,71,.22));overflow:hidden}.ia-forest img{width:auto;filter:saturate(.85)}
.ia-empty{width:36px;height:36px;border-radius:50%;background:#eef1ec;color:#9aa69c;display:inline-flex;align-items:center;justify-content:center}
.ia-t .bs{font-size:13px;line-height:1.3;color:#6b706c;margin:0}.ia-blue{color:#1d5fa8}.ia-green{color:#2f7a12;font-weight:600}
.ia-tbar{width:100%;height:10px;border-radius:5px;background:#eef1ec;overflow:hidden}.ia-tbar i{display:block;height:100%;border-radius:5px;background:linear-gradient(90deg,#9bd77a,#3d9a1f)}
.ia-t.red{background:#fdecea;border-color:#f5c6c2}.ia-t.red .bs{color:#c62828}
.so-sec.ia-only{justify-content:flex-end;margin-top:6px}
.scr:has(.wh-clock)>.body{padding-bottom:calc(var(--safeBot) + 150px)!important}
.bento .bnt.red{background:#2a0f0f}.bento .ia-tbar{background:rgba(255,255,255,.12)}
</style>`);



/* ---------- the Streaks entry on Profile opens the whole dashboard now, so it says what's inside ---------- */
(function(){const f=SCR['profile'];if(!f)return;SCR['profile']=p=>{const r=f(p);try{const ws=rtSt().witnesses.filter(w=>w.state==='in');const gr=growing();const open=gr.filter(x=>x.open);const i=stageIdx(S.streak);
 r.html=r.html.replace(/<button class="pf-pill2" onclick="[^"]*"/,'<button class="pf-pill2" onclick="go(\'streaks\')"');
 r.html=r.html.replace(/<button class="pf-stk"[\s\S]*?<\/button>/,`<button class="pf-stk ia-pf" onclick="home('gt-home')" aria-label="Your oak and your people. Open Streaks."><span class="pf-stk-ic">${stageImg(S.streak,40)}</span><span class="grow"><b>${RSTAGES[i][1]} · ${S.streak} week${S.streak===1?'':'s'}</b><span class="pf-bar"><i style="width:${Math.max(4,Math.round(S.streak/(nextGoal(S.streak)[0]||1)*100))}%"></i></span><em>${[gr.length?`${gr.length} in your grove${open.length?' · '+nm(open[0].id)+' hasn’t invested yet':''}`:'Your grove is empty',ws.length?`${ws.length} witness${ws.length===1?'':'es'}`:'No witness yet',rtSt().season.joined?'In this month’s Bloom':'A Bloom this month'].join(' · ')}</em></span><span class="ia-pfavs">${gr.slice(0,3).map(g=>sgAv(g.id,22)).join('')}</span>${ic('chev',16,'opacity:.5')}</button>`)}catch(e){}
 return r}})();
document.head.insertAdjacentHTML('beforeend',`<style>.ia-pf .pf-stk-ic{display:flex;align-items:flex-end;justify-content:center;overflow:hidden}.ia-pf em{white-space:normal;line-height:1.35}.ia-pfavs{display:inline-flex;margin-right:4px}.ia-pfavs .sg-av{margin-left:-6px;box-shadow:0 0 0 2px #fff;width:22px!important;height:22px!important;font-size:10px!important}.ia-pfavs .sg-av:first-child{margin-left:0}</style>`);
