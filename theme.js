/* Production-styled screens: Streak dashboard, grove world, Sam's join paths, Money Manager split */
const WEEKS={me:()=>S.streak,sam:12,mom:96,dad:24,priya:6,jess:2,marcus:1,leo:1,nina:1};
const RSTAGES=[[0,'Acorn','acorn'],[5,'Mature Acorn','acorn'],[10,'Young Seedling','seedling'],[20,'Mature Seedling','seedling'],[40,'Young Sapling','seedling'],[80,'Young Oak','oak'],[160,'Mature Oak','oak'],[320,'Ancient Oak','oak']];
function rstage(w){let s=RSTAGES[0];RSTAGES.forEach(r=>{if(w>=r[0])s=r});return s}
function wk(id){const v=WEEKS[id];return typeof v==='function'?v():v}
function treeImg(w,h){const s=rstage(w);const hh=h||(s[2]==='acorn'?70:s[2]==='seedling'?96:150);return `<img src="${IMG[s[2]]}" alt="" style="height:${hh}px;width:auto">`}
function nextGoal(w){const n=RSTAGES.find(r=>r[0]>w);return n?n:[w,'',''];}
const FLIMG={roots:'seedling',acorns:'roundup',nest:'moneybag',gold:'later',sapling:'early',flowers:'earn',bird:'learn',water:null,tree:'oak'};
const FLNAME={roots:'Recurring',acorns:'Round-Ups®',nest:'Emergency Fund',gold:'Later',sapling:'Early',flowers:'Earn',bird:'Learn',water:'Rain',tree:'New tree'};
function flTok(k){const on=S.flourishes.indexOf(k)>-1;const im=FLIMG[k]?`<img src="${IMG[FLIMG[k]]}" alt="">`:ic('drop',30,'color:#4da1ef');return `<div class="fl-tok ${on?'':'off'}" onclick="flourishSheet('${k}')"><div class="im">${im}</div><div class="nm">${FLNAME[k]}</div></div>`}
function skHero(w,opt){opt=opt||{};const s=rstage(w);const n=nextGoal(w);const pct=n[0]>w?Math.round((w-s[0])/(n[0]-s[0])*100):100;
  return `<div class="sk-hero" style="height:${opt.h||290}px">${hills({dark:1})}<div class="tree ${opt.grow?'grow-in':''}">${treeImg(w,opt.th)}</div></div>
  <div class="sk-title"><b>${w}</b> Week Streak</div><div class="sk-sub">${opt.sub||`Your weekly $${S.amount} recurring investment keeps your streak alive. Your future self thanks you!`}</div>
  <div class="sk-bar"><i style="width:${pct}%"></i><b style="left:${pct}%">${ic('home',14,'color:#0a1d08')}</b></div><div class="sk-lbl"><span>${s[0]} Weeks</span><span>${n[0]} Weeks</span></div>`}
function skRow(badge,t,s,ck,on){return `<div class="sk-row" ${on?`onclick="${on}"`:''}><div class="sk-badge ${badge?'':'lock'}">${badge||ic('lock',16)}</div><div class="grow"><div class="t">${t}</div><div class="s">${s}</div></div>${ck===null?'':ck==='nav'?ic('chev',16,'color:rgba(255,255,255,.4)'):ck==='drop'?`<div class="sk-ck drop">${ic('drop',13)}</div>`:ck?`<div class="sk-ck">${ic('check',14)}</div>`:'<div class="sk-ck off"></div>'}</div>`}
function tabbarDk(on){return tabbar(on).replace('class="tabbar"','class="tabbar dk"')}

/* ---------- HOME = the real Streak dashboard, extended ---------- */
def('gt-home',()=>{const w=S.streak;const g=S.grove;const inv=g.filter(x=>x.status==='invited');const open=g.find(x=>x.open&&x.status==='growing');
  return {cls:'dark',html:`<div class="top" style="position:absolute;left:0;right:0;z-index:5"><button class="iconbtn" onclick="home('menu')">${ic('close')}</button><div class="row" style="gap:0"><button class="iconbtn" onclick="protoMenu()">${ic('menu',22)}</button></div></div>
  <div class="body" style="padding-top:0">${skHero(w,{sub:S.invested?`This week counts. ${S.recurring?`Next $${S.amount} goes in ${S.day}.`:''}`:'Invest any amount this week to keep it growing.'})}
   ${S.invested?'':`<div class="mt24">${btn('Invest this week',"T={};S.afterCount='gt-home';S.ret='gt-home';go('inv-1')",'wh')}</div>`}
   <div class="sk-sec"><div class="h4">Your grove</div><span class="sm" onclick="home('gt-grove')" style="cursor:pointer">Open ${ic('chev',12)}</span></div>
   <div class="card dk tap" style="padding:0;overflow:hidden" onclick="home('gt-grove')"><div style="position:relative">${(()=>{const gr=g.filter(x=>x.status==='growing');const sz=id=>{const k=rstage(wk(id))[2];return k in OAKS?78:k==='seedling'?58:44};const mk=x=>({html:`<img src="${IMG[rstage(wk(x.id))[2]]}" style="height:${sz(x.id)}px;${x.open?'filter:saturate(.4) brightness(.8)':''}">`,label:nm(x.id)});const L=gr.slice(0,2).map(mk),R=gr.slice(2,4).map(mk);if(inv.length&&R.length<2)R.push({html:spot(),label:'Invited'});return hillRow([...L,{html:`<img src="${IMG[rstage(w)[2]]}" style="height:${rstage(w)[2]==='acorn'?52:84}px">`,label:'You',me:1},...R],{h:190})})()}
     <div style="position:absolute;left:12px;top:12px" class="sk-chip">${ic('grove',14,'color:#74c947')} ${g.filter(x=>x.status==='growing').length} growing${inv.length?` · ${inv.length} invited`:''}</div></div>
     ${open?`<div class="row" style="padding:12px 16px;border-top:1px solid var(--sk-line)">${ic('drop',18,'color:#4da1ef')}<div class="sm grow" style="color:#fff"><b>${nm(open.id)} hasn’t invested yet this week.</b> Send rain as a gentle nudge. It only counts when they invest.</div></div>`:g.length?'':`<div class="sm" style="padding:12px 16px;color:#fff">Invite someone to grow with you.</div>`}</div>
   <div class="sk-sec"><div class="h4">Challenges</div><span class="sm" style="cursor:pointer" onclick="T={};go('gt-ch-new')">+ Start</span></div>
   ${S.invites.map(v=>skRow(av(v.from,'s').replace('class="av s"','class="av s" style="width:48px;height:48px"'),`${nm(v.from)} invited you`,`${v.title} · ${v.len} ${v.unit}`,false,`go('gt-ch-invite',{id:'${v.id}'})`)).join('')}
   ${S.challenges.length?S.challenges.map(c=>{const t=CH_TYPES[c.type];return skRow(`<span style="color:#74c947">${ic(t.icon,22)}</span>`,c.title,`${c.prog.me||0} of ${c.len} ${c.unit} · ${c.people.length} people`,(c.prog.me||0)>=c.len,`go('gt-ch-detail',{id:'${c.id}'})`)}).join(''):`<div class="sm" style="color:var(--sk-sub)">Bring people in on a no-delivery week, a Round-Ups month, or 8 weeks side by side.</div>`}
   <div class="sk-sec"><div class="h4">Oak extras</div><span class="sm">${S.flourishes.length}/9</span></div>
   <div class="row" style="gap:10px;overflow-x:auto;padding-bottom:6px;scrollbar-width:none">${Object.keys(FL).map(flTok).join('')}</div>
   <div class="sk-sec"><div class="h4">Achievements</div><span class="sm">${RSTAGES.filter(r=>r[0]>0&&w>=r[0]).length}/7 Complete</span></div>
   <div class="sk-stats"><div class="sk-stat"><span class="sk-ic">${ic('spark',16)}</span><div class="n">${w}</div><div class="l">Current Streak</div></div><div class="sk-stat"><span class="sk-ic">${ic('flag',16)}</span><div class="n">${Math.max(w,24)}</div><div class="l">Best Streak</div></div></div>
   <div class="mt16">${RSTAGES.slice(1).map(r=>skRow(w>=r[0]?`<img src="${IMG[r[2]]}">`:'',r[1],`${r[0]} Week Streak`,w>=r[0])).join('')}</div>
   <div style="height:80px"></div></div>
  ${S.ffDone?'':`<button class="ff" onclick="jumpAhead();refresh();toast('Jumped ahead 4 weeks')">${ic('ff',12)} Jump ahead 4 weeks</button>`}
  ${tabbarDk('gt-home')}`,
  mount(){const inv=S.grove.find(x=>x.status==='invited'&&PEOPLE[x.id].on);if(inv&&!S.ffDone){setTimeout(()=>{if(cur().dataset.id!=='gt-home')return;inv.status='growing';save();banner(`${nm(inv.id)} planted beside you`,'Their tree is on your hill. Yours is on theirs.',()=>home('gt-grove'));refresh()},2600)}}}});

/* ---------- GROVE WORLD: game-like, everything from one screen ---------- */
let GSEL=null;
const PLOTS=[[200,338],[340,370],[660,370],[800,338],[90,294],[910,294],[500,300]];
def('gt-grove',()=>{const g=S.grove;const grow=g.filter(x=>x.status==='growing');const done=grow.filter(x=>!x.open).length+(S.invested?1:0);const tot=grow.length+1;
  const trees=g.map((x,i)=>{const [l,b]=PLOTS[i%PLOTS.length];const W=wk(x.id);const st=rstage(W);const h=st[2] in OAKS?150:st[2]==='seedling'?100:66;
    if(x.status!=='growing')return `<div class="gw-plot" style="left:${l}px;bottom:${b+10}px" onclick="groveSel('${x.id}')">${av(x.id,'s')}</div><div style="position:absolute;left:${l}px;bottom:${b-18}px;transform:translateX(-50%)" class="gw-tag"><span class="pip" style="background:rgba(255,255,255,.12)">${ic('cal',11)}</span>Waiting for ${nm(x.id)}</div>`;
    return `<div class="gw-tree ${GSEL===x.id?'sel':''}" id="gt-${x.id}" style="left:${l}px;bottom:${b}px" onclick="groveSel('${x.id}')"><img src="${IMG[st[2]]}" style="height:${h}px;${x.open?'filter:saturate(.4) brightness(.8)':''}"><div class="gw-tag"><span class="pip" style="background:${x.open?'#4da1ef':'#74c947'}">${x.open?ic('drop',11,'color:#fff'):ic('check',11,'color:#0a1d08')}</span>${nm(x.id)} · ${W}w</div></div>`}).join('');
  const meH=rstage(S.streak)[2] in OAKS?180:rstage(S.streak)[2]==='seedling'?130:110;
  const empty=[0,1].map(k=>{const i=g.length+k;if(i>=PLOTS.length)return '';const [l,b]=PLOTS[i];return `<div class="gw-plot" style="left:${l}px;bottom:${b+10}px" onclick="T={};go('gt-add')">${ic('plus',22)}</div>`}).join('');
  const sel=GSEL&&inGrove(GSEL);
  return {cls:'dark',html:`<div class="gw"><div class="gw-scroll" id="gws"><div class="gw-world">
    <svg viewBox="0 0 1000 200" preserveAspectRatio="none" style="position:absolute;left:0;top:0;width:1000px;height:46%">${Array.from({length:30}).map((_,i)=>`<circle cx="${(i*97)%1000}" cy="${(i*37)%180+10}" r="1.3" fill="#fff" opacity=".45"/>`).join('')}</svg>
     <svg viewBox="0 0 1000 120" preserveAspectRatio="none" style="position:absolute;left:0;bottom:350px;width:1000px;height:150px"><g fill="#123a0f">${Array.from({length:44}).map((_,i)=>`<circle cx="${i*24}" cy="${60-((i*53)%14)}" r="${26+((i*31)%12)}"/>`).join('')}<rect x="0" y="60" width="1000" height="60"/></g><g fill="#195016">${Array.from({length:34}).map((_,i)=>`<circle cx="${i*31+8}" cy="${84-((i*41)%10)}" r="${22+((i*17)%9)}"/>`).join('')}<rect x="0" y="84" width="1000" height="36"/></g></svg>
     <div style="position:absolute;left:-100px;width:1200px;bottom:-260px;height:650px;border-radius:50%;background:radial-gradient(ellipse 55% 50% at 50% 3%,#7fd450 0%,#4c9e2c 22%,#2c6e1c 48%,#17420f 75%);box-shadow:inset 0 4px 0 rgba(188,234,163,.28)"></div>
    <div class="cloud" style="top:110px;width:120px;animation-duration:60s"></div><div class="cloud" style="top:170px;width:80px;animation-duration:90s;animation-delay:-30s"></div>
    ${trees}${empty}
    <div class="gw-tree ${GSEL==='me'?'sel':''}" id="gt-me" style="left:500px;bottom:382px" onclick="groveSel('me')"><img src="${IMG[rstage(S.streak)[2]]}" style="height:${meH}px"><div class="gw-tag" style="background:#74c947;color:#0a1d08;border:0"><span class="pip" style="background:#0a1d08">${ic('spark',11,'color:#74c947')}</span>You · ${S.streak}w</div></div>
    <div class="gw-squirrel" id="gsq" style="left:560px;bottom:382px"><img src="${IMG.acorn}" style="height:34px"></div>
  </div></div>
  <div class="gw-hud"><button class="iconbtn" style="background:rgba(10,29,8,.6)" onclick="home('gt-home')">${ic('back')}</button>
    <div class="row" style="gap:6px"><span class="sk-chip">${ic('spark',14,'color:#74c947')} ${S.streak} weeks</span><span class="sk-chip">${ic('check',14,'color:#74c947')} ${done}/${tot} this week</span><button class="iconbtn" style="background:rgba(10,29,8,.6)" onclick="protoMenu()">${ic('menu',20)}</button></div></div>
  <div style="position:absolute;left:0;right:0;top:calc(var(--safeTop) + 52px);text-align:center;z-index:6"><div style="font-size:22px;font-weight:600;color:#fff">Your grove</div><div class="sm" style="color:var(--sk-sub)">Tap a tree. Drag to look around.</div></div>
  <div class="gw-dock" id="gdock">${sel||GSEL==='me'?dockFor(GSEL):dockIdle(grow,done,tot)}</div></div>
  ${tabbarDk('gt-grove')}`,
  mount(el){const s=$('#gws',el);if(s)s.scrollLeft=(1000-s.clientWidth)/2+(GSEL&&GSEL!=='me'?((PLOTS[S.grove.findIndex(x=>x.id===GSEL)]||[500])[0]-500):0)}}});
function dockIdle(grow,done,tot){const open=S.grove.filter(x=>x.open&&x.status==='growing');
  return `<div class="row between"><div><div class="h4" style="color:#fff">This week in your grove</div><div class="sm" style="color:var(--sk-sub)">${done} of ${tot} have invested${open.length?` · ${open.map(x=>nm(x.id)).join(', ')} not yet`:''}</div></div>
   <svg width="44" height="44" viewBox="0 0 44 44"><circle cx="22" cy="22" r="18" stroke="rgba(255,255,255,.12)" stroke-width="5" fill="none"/><circle cx="22" cy="22" r="18" stroke="#74c947" stroke-width="5" fill="none" stroke-linecap="round" stroke-dasharray="${Math.round(113*done/Math.max(tot,1))} 113" transform="rotate(-90 22 22)"/></svg></div>
   <div class="gw-acts">
    ${S.invested?`<div class="gw-act" onclick="shareOak()"><div class="ic">${ic('share',18)}</div>Share</div>`:`<div class="gw-act hot" onclick="T={};S.afterCount='gt-grove';S.ret='gt-grove';go('inv-1')"><div class="ic">${ic('plus',18)}</div>Invest</div>`}
    <div class="gw-act ${open.length?'blue':''}" onclick="${open.length?`go('gt-water',{id:'${open[0].id}'})`:`toast('Everyone’s week is covered')`}"><div class="ic">${ic('drop',18)}</div>Water${open.length?` (${open.length})`:''}</div>
    <div class="gw-act" onclick="T={chp:[]};go('gt-ch-new')"><div class="ic">${ic('flag',18)}</div>Challenge</div>
    <div class="gw-act" onclick="T={};go('gt-add')"><div class="ic">${ic('user',18)}</div>Invite</div></div>`}
function dockFor(id){if(id==='me')return `<div class="row"><img src="${IMG[rstage(S.streak)[2]]}" style="height:44px"><div class="grow"><div class="h4" style="color:#fff">You · ${rstage(S.streak)[1]}</div><div class="sm" style="color:var(--sk-sub)">${S.streak} week streak · ${S.flourishes.length} flourishes</div></div><button class="iconbtn" onclick="groveSel(null)">${ic('close',18)}</button></div>
   <div class="gw-acts"><div class="gw-act" onclick="home('gt-oak')"><div class="ic">${ic('oak',18)}</div>My oak</div><div class="gw-act" onclick="shareOak()"><div class="ic">${ic('share',18)}</div>Share</div><div class="gw-act" onclick="T={chp:[]};go('gt-ch-new')"><div class="ic">${ic('flag',18)}</div>Challenge</div><div class="gw-act" onclick="go('gt-privacy')"><div class="ic">${ic('eye',18)}</div>Privacy</div></div>`;
  const g=inGrove(id),p=PEOPLE[id];if(g.status!=='growing')return `<div class="row">${av(id)}<div class="grow"><div class="h4" style="color:#fff">${p.full}</div><div class="sm" style="color:var(--sk-sub)">Invite sent · spot saved 14 days</div></div><button class="iconbtn" onclick="groveSel(null)">${ic('close',18)}</button></div>
   <div class="gw-acts"><div class="gw-act" onclick="SHARE={title:'${S.me} saved you a spot',story:inviteStory(),to:'${p.full}',text:S.note};go('sys-msg',{kind:'msg'})"><div class="ic">${ic('chat',18)}</div>Resend</div><div class="gw-act hot" onclick="inGrove('${id}').status='growing';save();groveSel('${id}');banner('${p.name} planted beside you','Their tree is on your hill now.')"><div class="ic">${ic('ff',16)}</div>Sim: plants</div><div class="gw-act" onclick="S.grove=S.grove.filter(x=>x.id!=='${id}');GSEL=null;save();refresh();toast('Invite canceled')"><div class="ic">${ic('close',18)}</div>Cancel</div><div class="gw-act" onclick="home('sam-hub')"><div class="ic">${ic('eye',18)}</div>Their view</div></div>`;
  const ch=S.challenges.filter(c=>c.people.indexOf(id)>-1).length;const W=wk(id);
  return `<div class="row"><img src="${IMG[rstage(W)[2]]}" style="height:44px"><div class="grow"><div class="h4" style="color:#fff">${p.full} · ${rstage(W)[1]}</div><div class="sm" style="color:var(--sk-sub)">${g.side||0} weeks side by side${ch?` · ${ch} challenge${ch>1?'s':''} together`:''}</div></div><button class="iconbtn" onclick="groveSel(null)">${ic('close',18)}</button></div>
   ${g.open?`<div class="row mt12" style="padding:10px 12px;border-radius:14px;background:rgba(77,161,239,.14)">${ic('drop',16,'color:#4da1ef')}<div class="sm grow" style="color:#fff">${p.name} hasn’t invested yet this week. Send rain as a gentle nudge. No amounts, ever.</div></div>`:''}
   <div class="gw-acts">
    <div class="gw-act ${g.open?'blue':''}" onclick="${g.open?`go('gt-water',{id:'${id}'})`:`toast('${p.name} already invested this week')`}"><div class="ic">${ic('drop',18)}</div>Water</div>
    <div class="gw-act" onclick="groveCheer('${id}')"><div class="ic">${ic('spark',18)}</div>Cheer</div>
    <div class="gw-act" onclick="T={chp:['${id}']};go('gt-ch-new')"><div class="ic">${ic('flag',18)}</div>Challenge</div>
    <div class="gw-act" onclick="personSheet('${id}')"><div class="ic">${ic('menu',18)}</div>More</div></div>`}
function groveSel(id){GSEL=id;const el=cur();if(!el||el.dataset.id!=='gt-grove'){home('gt-grove');return}
  $$('.gw-tree',el).forEach(t=>t.classList.toggle('sel',t.id==='gt-'+id));$('#gdock',el).innerHTML=id?dockFor(id):dockIdle(S.grove.filter(x=>x.status==='growing'),S.grove.filter(x=>x.status==='growing'&&!x.open).length+(S.invested?1:0),S.grove.filter(x=>x.status==='growing').length+1);
  const t=id&&$('#gt-'+id,el);const sq=$('#gsq',el);if(t&&sq){sq.style.left=(parseFloat(t.style.left)+46)+'px';sq.style.bottom=t.style.bottom;sq.classList.remove('hop');void sq.offsetWidth;sq.classList.add('hop');const s=$('#gws',el);s.scrollTo({left:parseFloat(t.style.left)-s.clientWidth/2,behavior:'smooth'})}}
function groveCheer(id){const el=cur();const t=$('#gt-'+id,el);if(!t){toast('Cheer sent');return}const m=document.createElement('div');m.className='float-msg';m.textContent=['Keep going!','Proud of us','See you Friday','Nice one'][Math.floor(Math.random()*4)];m.style.left=t.style.left;m.style.bottom=(parseFloat(t.style.bottom)+170)+'px';m.style.position='absolute';$('.gw-world',el).appendChild(m);setTimeout(()=>m.remove(),1900);toast('Cheer sent to '+nm(id))}

/* ---------- Your oak (production list) ---------- */
def('gt-oak',()=>({cls:'dark',html:`<div class="top" style="position:absolute;left:0;right:0;z-index:5"><button class="iconbtn" onclick="home('gt-home')">${ic('back')}</button><button class="iconbtn" onclick="shareOak()">${ic('share',22)}</button></div>
  <div class="body" style="padding-top:0">${skHero(S.streak,{sub:'Streaks sets how tall it grows. Every other healthy habit adds a flourish your grove can see.'})}
  <div class="sk-sec"><div class="h4">Oak extras</div><span class="sm">${S.flourishes.length}/9</span></div>
  ${Object.keys(FL).map(k=>{const on=S.flourishes.indexOf(k)>-1;const im=FLIMG[k]?`<img src="${IMG[FLIMG[k]]}">`:ic('drop',22,'color:#4da1ef');return skRow(on?im:'',FLNAME[k],on?'Growing on your oak':FL[k].how,on,`flourishSheet('${k}')`)}).join('')}
  <div style="height:80px"></div></div>${tabbarDk('gt-oak')}`}));
def('fl-unlock',p=>{const f=FL[p.k];const im=FLIMG[p.k]?`<img src="${IMG[FLIMG[p.k]]}" style="height:110px">`:ic('drop',90,'color:#4da1ef');return {cls:'green',html:`${topbar({left:'<div style="width:44px"></div>'})}
  <div class="body center" style="display:flex;flex-direction:column;align-items:center;justify-content:center">
   <div class="pop" style="width:170px;height:170px;border-radius:85px;background:rgba(255,255,255,.18);display:flex;align-items:center;justify-content:center">${im}</div>
   <div class="eyebrow mt24 rise">New on your oak</div><div class="h1 mt8 rise d1">${FLNAME[p.k]}</div><p class="p mt12 rise d2" style="max-width:300px">${f.line}</p>
   <p class="sm mt16 rise d3" style="color:rgba(255,255,255,.85)">${growing().length?`${growing().slice(0,2).map(g=>nm(g.id)).join(' and ')} will see it on your oak.`:'Your grove will see it on your oak.'} Never an amount.</p></div>
  ${foot(btn('Continue','finish()','dk'),btn(`${ic('share',20)} Share`,'shareOak()','ghost','style="color:#fff"'))}`,mount(){confetti($('#screen'),60)}}});
function flourishSheet(k){const f=FL[k];const has=S.flourishes.indexOf(k)>-1;const im=FLIMG[k]?`<img src="${IMG[FLIMG[k]]}" style="height:84px">`:ic('drop',60,'color:#4da1ef');
  sheet(`<div class="center"><div style="width:120px;height:120px;border-radius:60px;margin:0 auto;background:#eef6e8;display:flex;align-items:center;justify-content:center">${im}</div>
  <div class="eyebrow mt16">${f.habit}</div><div class="h2 mt8">${FLNAME[k]}</div><p class="p mt8">${f.line}</p><p class="sm mt12">Your grove sees this flourish. Never an amount.</p></div>
  <div class="mt24">${has?btn('Share your oak',"closeOv();setTimeout(shareOak,250)",'dk'):btn(f.how,f.start,'dk')}</div>`)}
function shareOak(){share({title:'My oak on Acorns',story:storyCard({bg:'linear-gradient(180deg,#0a1d08,#174512)',eyebrow:`${rstage(S.streak)[1]}`,title:`${S.streak} weeks in a row.`,sub:'Grow yours beside mine.',art:`<img src="${IMG[rstage(S.streak)[2]]}" style="height:170px">`})})}

/* ---------- Sam's side: every path ---------- */
const CASES={A:['Sam already has Acorns','App installed, signed in'],C1:['Signed out','Has the app, needs to sign in'],B:['New to Acorns','No app, no account'],C2:['Has Acorns, new phone','Account, but no app here'],C3:['Link expired','Opened after 14 days'],C4:['Already side by side','Taps an old invite again'],C5:['Under 18','Can’t open Invest yet']};
def('sam-hub',()=>({cls:'dark',html:`${topbar({close:"home('menu')",title:'Getting invited'})}<div class="body"><div class="h2 mt8" style="color:#fff">Sam gets Jordan’s link.</div><p class="p mt8">One link handles every case. Pick Sam’s situation.</p>
  <div class="mt16">${Object.keys(CASES).map(k=>skRow(`<b style="color:#74c947">${k}</b>`,CASES[k][0],CASES[k][1],'nav',`T={c:'${k}'};go('sam-msg',{c:'${k}'})`)).join('')}</div></div>`}));
def('sam-msg',p=>{const c=p.c||'A';const route={A:"go('sam-tray',{c:'A'})",C1:"go('sam-signin',{c:'C1'})",B:"go('sam-web',{c:'B'})",C2:"go('sam-web',{c:'C2'})",C3:"go('sam-tray',{c:'C3'})",C4:"go('sam-tray',{c:'C4'})",C5:"go('sam-web',{c:'C5'})"}[c];
  return {html:`${topbar({title:'Jordan'})}<div class="body"><p class="sm center">iMessage · Today 9:38 AM</p>
  <div class="mt16" style="width:250px;border-radius:18px;overflow:hidden;background:#e9e9eb;cursor:pointer" onclick="${route}"><div style="height:150px;position:relative">${hills({dark:1})}<div style="position:absolute;left:50%;bottom:28%;transform:translateX(-50%)"><img src="${IMG.oak}" style="height:100px"></div></div><div style="padding:10px 12px"><div style="font-weight:600;font-size:14px">Jordan saved you a spot in her grove</div><div style="font-size:12px;color:#666">acorns.com</div></div></div>
  <div class="bub them mt8" style="max-width:250px">${S.note}</div>
  <p class="sm mt24 center">${CASES[c][0]} · tap the link</p></div>`}});
function samDash(w,extra){return `<div class="top" style="position:absolute;left:0;right:0;z-index:5"><button class="iconbtn">${ic('close')}</button><button class="iconbtn" onclick="protoMenu()">${ic('menu',22)}</button></div><div class="body" style="padding-top:0">${skHero(w,{sub:w?'Your weekly $10 recurring investment keeps your streak alive.':'Invest any amount this week to start your streak.'})}${extra||''}
  <div class="sk-sec"><div class="h4">Achievements</div><span class="sm">${RSTAGES.filter(r=>r[0]>0&&w>=r[0]).length}/7 Complete</span></div>${RSTAGES.slice(1,5).map(r=>skRow(w>=r[0]?`<img src="${IMG[r[2]]}">`:'',r[1],`${r[0]} Week Streak`,w>=r[0])).join('')}<div style="height:40px"></div></div>`}
const TRAYC={A:['Jordan saved you a spot in her grove.','You keep your own Streak. You’ll also see each other’s oaks and weeks. Never balances.','Grow with Jordan','Not now',"go('sam-side',{c:'A'})"],
 C1:['Jordan saved you a spot in her grove.','Welcome back. You keep your own Streak and grow beside Jordan.','Grow with Jordan','Not now',"go('sam-side',{c:'A'})"],
 B:['Jordan’s spot is ready.','Invest any amount this week to plant your acorn beside Jordan.','Make my first investment','Later',"S.ret='sam-planted';T={};go('rec-1')"],
 C3:['This spot expired.','Jordan’s invite was open for 14 days. Ask for a new link, or start your own grove.','Invite Jordan instead','Not now',"SHARE={title:'Grow beside me',story:inviteStory(),to:'Jordan',text:'Your link expired. Grow beside me instead?'};go('sys-msg',{kind:'msg'})"],
 C4:['You and Jordan are already side by side.','Nothing to do. Your weeks are already counting together.','See your grove','Close',"go('sam-side',{c:'A'})"]};
def('sam-tray',p=>{const c=p.c||'A';const t=TRAYC[c];const w=c==='B'?0:7;return {cls:'dark',html:`${samDash(w)}<div class="scrim on" style="position:absolute;inset:0;z-index:40"></div>
  <div class="tray" id="tr"><div class="x" onclick="go('sam-quiet')">${ic('close',14)}</div><div class="badge-l"><img src="${IMG[c==='C3'?'acorn':'oak']}"></div><h3>${t[0]}</h3><p>${t[1]}</p><div class="pill" onclick="${t[4]}">${t[2]}</div><span class="sec" onclick="go('sam-quiet')">${t[3]}</span></div>`,mount(el){setTimeout(()=>$('#tr',el).classList.add('on'),120)}}});
def('sam-quiet',()=>({cls:'dark',html:`${topbar({})}<div class="body center" style="display:flex;flex-direction:column;justify-content:center;align-items:center"><div class="sk-badge" style="width:80px;height:80px;border-radius:40px"><img src="${IMG.acorn}"></div><div class="h2 mt24" style="color:#fff">Nothing was sent.</div><p class="p mt8" style="max-width:300px">Jordan’s spot shows “Waiting for Sam” for 14 days, then opens up for someone else. No reminders to Sam.</p></div>${foot(btn('Back to cases',"home('sam-hub')",'wh'))}`}));
def('sam-side',()=>({cls:'dark',html:`${samDash(7,`<div class="sk-sec"><div class="h4">Your grove</div><span class="sm">1 person</span></div>${skRow(`<img src="${IMG.oak}">`,'Jordan','Young Oak · side by side this week',true,"home('gt-grove')")}`)}`,mount(){confetti($('#screen'),60);toast('You’re side by side with Jordan')}}));
def('sam-signin',p=>({cls:'ivory',html:`${topbar({title:'Sign in'})}<div class="body"><div class="center mt24"><img src="${IMG.acorn}" style="height:64px"></div><div class="h2 center mt16">Welcome back</div><p class="sm center mt8">Existing Acorns sign-in. The invite waits for you.</p>
  <div class="field mt24"><label>Email</label><input value="sam@example.com"></div><div class="field mt12"><label>Password</label><input type="password" value="prototype"></div><p class="sm mt12">Placeholder sign-in. Nothing is checked.</p></div>${foot(btn('Sign in',"go('sys-load',{msg:'Signing in',next:'sam-tray',np:{c:'C1'}})",'dk'))}`}));
def('sam-web',p=>{const c=p.c||'B';const head={B:['Jordan invited you','Jordan saved you a spot in her grove.','Start investing with as little as $5 and your oak grows beside Jordan’s. You’ll see each other’s oaks and weeks. Never balances.','Get Acorns',"go('sam-join')"],C2:['Already have Acorns?','Open the app to plant beside Jordan.','Download Acorns on this phone and sign in. Jordan’s spot is saved for 14 days.','Open Acorns',"go('sam-signin',{c:'C1'})"],C5:['Acorns Invest is for adults 18+','A parent can invest for you with Acorns Early.','Their tree can still grow beside Jordan’s.','Send to a parent',"share({title:'Acorns Early',story:inviteStory()})"]}[c];
  return {html:`<div class="body flush" style="padding:0"><div class="lander-hero"><div class="urlbar">${ic('lock',11)} acorns.com/g/jordan</div>
   <div style="font-size:13px;font-weight:600">${head[0]}</div><div style="font-size:30px;font-weight:600;line-height:1.1;margin-top:8px;letter-spacing:-.3px">${head[1]}</div><p class="p mt12" style="font-size:15px">${head[2]}</p>
   <div class="pill" style="display:inline-flex;height:40px;padding:0 18px;border-radius:20px;background:#111;color:#fff;font-weight:600;align-items:center;margin-top:16px;cursor:pointer" onclick="${head[4]}">${head[3]}</div>
   <div style="position:relative;height:170px;margin:20px -24px 0">${hills({dark:false})}<div style="position:absolute;left:34%;bottom:10px;transform:translateX(-50%)"><img src="${IMG.oak}" style="height:130px"><div class="center sm" style="color:#191919;font-weight:600">Jordan</div></div><div style="position:absolute;left:68%;bottom:30px;transform:translateX(-50%);text-align:center"><div class="gw-plot" style="position:static;transform:none;border-color:#38860e;color:#38860e">${ic('plus',20)}</div><div class="sm" style="color:#191919;font-weight:600;margin-top:4px">Your spot</div></div></div></div>
   <div style="padding:20px 24px"><div style="display:flex;gap:18px;border-bottom:1px solid #eee;font-size:13px;font-weight:600"><span style="border-bottom:2px solid #111;padding-bottom:8px">How it works</span><span style="color:#999">FAQ’s</span></div>
   <div class="step mt12"><div class="n">1</div><div><b style="font-size:14px">Sign up</b><div class="sm">A few minutes. Jordan’s spot is saved for 14 days.</div></div></div>
   <div class="step"><div class="n">2</div><div><b style="font-size:14px">Invest any amount</b><div class="sm">Your first investment starts your Streak and puts your tree next to Jordan’s.</div></div></div>
   <div class="step"><div class="n">3</div><div><b style="font-size:14px">Grow side by side</b><div class="sm">Every week you both invest counts. Remove each other anytime.</div></div></div>
   <p class="sm mt16" style="font-size:11px">Investing involves risk. Placeholder disclosure. Jordan may earn a referral bonus under the current referral program terms.</p></div></div>`}});
def('sam-join',()=>({html:`${topbar({title:'Create account'})}${progress(1,3)}<div class="body"><div class="h2 mt8">Let’s start your oak</div><p class="p mt8">This is today’s registration flow. The invite rides along.</p>
  <div class="field mt24"><label>First name</label><input value="Sam"></div><div class="field mt12"><label>Email</label><input value="sam@example.com"></div>
  <div class="card flat mt16"><div class="row"><img src="${IMG.oak}" style="height:40px"><div class="sm grow" style="color:#191919">Joining from Jordan’s invite.</div></div></div>
  <p class="sm mt16">Identity and funding steps follow, unchanged. The prototype skips ahead.</p></div>${foot(btn('Continue',"go('sys-load',{msg:'Creating your account',next:'sam-tray',np:{c:'B'}})",'dk'))}`}));
def('sam-planted',()=>({cls:'dark',html:`${samDash(1,`<div class="sk-sec"><div class="h4">Your grove</div><span class="sm">1 person</span></div>${skRow(`<img src="${IMG.oak}">`,'Jordan','Young Oak · side by side since today',true)}`)}${foot(btn('See Jordan’s side',"jumpAhead();if(!inGrove('sam'))S.grove.push({id:'sam',status:'growing',side:1});save();home('gt-grove');setTimeout(()=>banner('Sam planted beside you','Your oaks are side by side. This week counts for both of you.'),900)",'wh'))}`,mount(){confetti($('#screen'),70);toast('Planted beside Jordan')}}));

/* ---------- Money Manager split (way in) ---------- */
def('mm-why1',()=>({cls:'green',html:`${topbar({close:"home('menu')",right:''})}<div class="body center" style="display:flex;flex-direction:column;justify-content:center;align-items:center">
  <div class="row pop" style="justify-content:center;gap:10px"><img src="${IMG.seedling}" style="height:80px"><img src="${IMG.later}" style="height:80px"><img src="${IMG.moneybag}" style="height:80px"></div>
  <div class="eyebrow mt32">Money Manager</div><div class="h1 mt8">One paycheck. Three habits.</div><p class="p mt12" style="max-width:300px">Split each paycheck into Invest, Later and Emergency Fund at once. Three oak extras from one setup.</p></div>
  ${foot(btn('Set up my split',"T={mi:50,ml:30,me:20};go('mm-split')",'dk'))}`}));
def('mm-split',()=>{if(T.mi===undefined){T.mi=50;T.ml=30;T.me=20}const r=(k,l,img)=>`<div class="card mt12"><div class="row"><img src="${IMG[img]}" style="height:36px"><div class="grow"><div class="h4">${l}</div><div class="sm">of each paycheck</div></div><b style="font-size:20px" id="l-${k}">${T[k]}%</b></div><input id="r-${k}" type="range" min="0" max="100" step="5" value="${T[k]}" style="width:100%;margin-top:12px;accent-color:#74c947" oninput="mmSet('${k}',+this.value)"></div>`;
  return {html:`${topbar({title:'Money Manager'})}${progress(1,2)}<div class="body"><div class="h2 mt8">How should we split it?</div><p class="p mt8">Of the part you set aside. Adds up to 100%.</p>${r('mi','Invest','seedling')}${r('ml','Later','later')}${r('me','Emergency Fund','moneybag')}
  <div class="sm mt12 center" id="mmsum">${T.mi+T.ml+T.me}% total</div></div>${foot(btn('Review',"go('mm-review')",'dk'))}`}});
function mmSet(k,v){T[k]=v;const o=['mi','ml','me'].filter(x=>x!==k);let rest=100-v;const tot=T[o[0]]+T[o[1]]||1;T[o[0]]=Math.round(rest*T[o[0]]/tot/5)*5;T[o[1]]=rest-T[o[0]];['mi','ml','me'].forEach(x=>{const l=$('#l-'+x,cur()),r=$('#r-'+x,cur());if(l)l.textContent=T[x]+'%';if(r&&x!==k)r.value=T[x]})}
def('mm-review',()=>{if(T.mi===undefined){T.mi=50;T.ml=30;T.me=20}return {html:`${topbar({title:'Review'})}${progress(2,2)}<div class="body"><div class="h2 mt8">Your split</div><div class="card mt24"><div class="kv"><span>From</span><b>Direct deposit to Acorns Checking</b></div><div class="kv"><span>Invest</span><b>${T.mi}%</b></div><div class="kv"><span>Later</span><b>${T.ml}%</b></div><div class="kv"><span>Emergency Fund</span><b>${T.me}%</b></div></div>
  <div class="card flat mt16"><div class="row"><div class="sm grow" style="color:#191919"><b>Counts everywhere.</b> Each paycheck adds a week to your Streak and every side-by-side.</div></div></div></div>${foot(btn('Turn on my split',"['roots','gold','nest'].forEach(addFlourish);S.recurring=true;save();go('sys-load',{msg:'Setting up your split',next:'mm-done'})",'dk'))}`}});
def('mm-done',()=>({cls:'green',html:`${topbar({left:'<div style="width:44px"></div>',right:''})}<div class="body center" style="display:flex;flex-direction:column;justify-content:center;align-items:center"><div class="row pop" style="gap:8px"><img src="${IMG.seedling}" style="height:70px"><img src="${IMG.later}" style="height:70px"><img src="${IMG.moneybag}" style="height:70px"></div>
  <div class="h1 mt24">Three oak extras at once.</div><p class="p mt12" style="max-width:300px">Recurring, Later and Emergency Fund now grow on your oak. Split with a partner too?</p></div>
  ${foot(btn('Invite my partner to the grove',"T={};go('gt-add')",'dk'),btn('See my oak',"home('gt-oak')",'ghost','style="color:#fff"'))}`,mount(){confetti($('#screen'),60)}}));

/* ---------- menu: Acorns style ---------- */
def('menu',()=>({cls:'dark',html:`<div class="body" style="padding-top:0">
  <div class="sk-hero" style="height:250px">${hills({dark:1})}<div class="tree"><img src="${IMG.oak}" style="height:150px"></div></div>
  <div class="sk-title" style="font-size:28px">Share the wealth</div><div class="sk-sub">Grow Together, plugged into Streaks. Every way in leads to one grove.</div>
  <div class="mt24">${btn('Start right after sign-up','startGT()','wh')}</div><div class="mt8">${btn('Jump into the app, 4 weeks in',"jumpAhead();home('gt-home')",'line','style="color:#fff"')}</div>
  <div class="sk-sec"><div class="h4">Ways in</div></div>
  ${skRow(`<img src="${IMG.roundup}">`,'Money Type','3 habit questions, a type, a next step','nav',"T={};home('mt-why1')")}
  ${skRow(`<img src="${IMG.earn}">`,'Skip and Invest','A 7-day challenge with friends','nav',"T={};home('ss-why1')")}
  ${skRow(`<img src="${IMG.learn}">`,'Future Club','Notes that open in a year','nav',"T={};home('fc-why1')")}
  ${skRow(`<img src="${IMG.later}">`,'Acorns Year','Your year as shareable stories','nav',"T={};home('ay-1')")}
  ${skRow(`<img src="${IMG.seedling}">`,'Money Manager split','One paycheck feeds three habits','nav',"T={};home('mm-why1')")}
  <div class="sk-sec"><div class="h4">The other side</div></div>
  ${skRow(`<img src="${IMG.acorn}">`,'Getting invited','Every path: has Acorns, new, signed out, expired…','nav',"home('sam-hub')")}
  ${skRow(`<img src="${IMG.oak}">`,'Your grove','The interactive world','nav',"jumpAhead();home('gt-grove')")}
  ${skRow('',"How it all connects",'Ways in, products, flourishes',false,"go('map')")}
  <p class="sm center mt24" style="color:var(--sk-sub)">Share → Add to Home Screen for full screen. Placeholder names and prices.</p>
  <div class="center mt8"><button class="link" onclick="resetAll();toast('Reset')">Reset prototype</button></div><div style="height:30px"></div></div>`}));

/* ---------- onboarding why screens on the real Streak scene ---------- */
function whyScene(inner,h){return `<div class="sk-hero" style="height:${h||330}px;margin-top:calc(-1 * (var(--safeTop) + 52px))">${hills({dark:1})}${inner}</div>`}
def('gt-why1',()=>({cls:'dark',html:whyShell(0,`${whyScene(`<div class="tree" id="w1t"><img src="${IMG.acorn}" style="height:90px"></div>`)}
  <div class="eyebrow rise mt16">Your oak</div><div class="h1 rise d1 mt8">It starts as an acorn. Today.</div>
  <p class="p rise d2 mt12">Every week you invest, it grows: seedling, sapling, oak. It’s your streak, shown as a tree.</p>`,'gt-why2'),
  mount(el){const seq=[['acorn',90],['seedling',110],['oak',170]];let i=0;const t=setInterval(()=>{const a=$('#w1t',el);if(!a||!document.body.contains(a)){clearInterval(t);return}i=(i+1)%seq.length;a.innerHTML=`<img class="grow-in" src="${IMG[seq[i][0]]}" style="height:${seq[i][1]}px">`},1300)}}));
def('gt-why3',()=>({cls:'dark',html:whyShell(2,`${whyScene(`
   <div style="position:absolute;left:20%;bottom:31%;transform:translateX(-50%);text-align:center" class="rise d2"><img src="${IMG.seedling}" style="height:96px"><div class="gw-tag">Sam</div></div>
   <div style="position:absolute;left:50%;bottom:30%;transform:translateX(-50%);text-align:center" class="rise"><img src="${IMG.oak}" style="height:160px"><div class="gw-tag" style="background:#74c947;color:#0a1d08;border:0">You</div></div>
   <div style="position:absolute;left:79%;bottom:31%;transform:translateX(-50%);text-align:center" class="rise d4"><img src="${IMG.oak}" style="height:120px"><div class="gw-tag">Mom</div></div>`)}
  <div class="eyebrow rise mt16">Family first</div><div class="h1 rise d1 mt8">Grow alongside the people you love.</div>
  <p class="p rise d2 mt12">Your grove is everyone growing with you. You see their oaks. They see yours. Nobody sees a balance.</p>`,'gt-why4')}));

/* ---------- Challenges tab in the Streak world ---------- */
def('gt-ch',()=>({cls:'dark',html:`<div class="top"><button class="iconbtn" onclick="home('gt-grove')" aria-label="Back to grove">${ic('back')}</button><div class="h3" style="flex:1;text-align:center;color:#fff">Challenges</div><button class="iconbtn" onclick="protoMenu()">${ic('menu',22)}</button></div>
  <div class="body"><p class="sk-sub" style="text-align:left;margin:0;max-width:none">Run as many as you like. One investment counts toward every one it fits.</p>
  ${S.invites.length?`<div class="sk-sec"><div class="h4">Invitations</div></div>${S.invites.map(v=>skRow(`<img src="${IMG.learn}">`,`${v.title}`,`${nm(v.from)} invited you · ${v.len} ${v.unit}`,'nav',`go('gt-ch-invite',{id:'${v.id}'})`)).join('')}`:''}
  <div class="sk-sec"><div class="h4">Running</div><span class="sm">${S.challenges.length}</span></div>
  ${S.challenges.length?S.challenges.map(c=>{const t=CH_TYPES[c.type];return `<div class="card dk tap mt12" onclick="go('gt-ch-detail',{id:'${c.id}'})"><div class="row"><div class="sk-badge" style="color:#74c947">${ic(t.icon,22)}</div><div class="grow"><div class="t" style="font-weight:600;color:#fff">${c.title}</div><div class="sm" style="color:var(--sk-sub)">${t.prod} · ${c.len} ${c.unit}</div></div>${ic('chev',16,'color:rgba(255,255,255,.4)')}</div>
    <div class="mt12">${c.people.map(id=>`<div class="row" style="margin-top:8px;gap:10px">${av(id,'xs')}<div style="width:48px;font-size:12px;font-weight:600;color:#fff">${nm(id)}</div><div class="sk-bar grow" style="height:8px;margin:0"><i style="width:${Math.round((c.prog[id]||0)/c.len*100)}%"></i></div><div class="sm" style="width:34px;text-align:right;color:var(--sk-sub)">${c.prog[id]||0}/${c.len}</div></div>`).join('')}</div></div>`}).join(''):`<div class="card dk mt12"><p class="sk-sub" style="text-align:left;margin:0">Nothing running yet.</p></div>`}
  <div class="mt24">${btn(`${ic('plus',20)} Start a challenge`,"T={};go('gt-ch-new')",'wh')}</div><div style="height:30px"></div></div>${tabbarDk('gt-ch')}`}));
function envelope(w){return `<div style="width:${w}px;height:${Math.round(w*.72)}px;border-radius:${Math.round(w*.12)}px;background:#f9f8f1;box-shadow:0 14px 30px rgba(0,0,0,.3);display:inline-flex;vertical-align:middle;align-items:center;justify-content:center;position:relative;overflow:hidden"><div style="position:absolute;inset:0;background:linear-gradient(160deg,transparent 49%,rgba(0,0,0,.05) 50%,transparent 51%),linear-gradient(20deg,transparent 49%,rgba(0,0,0,.05) 50%,transparent 51%)"></div><img src="${IMG.acorn}" style="height:${Math.round(w*.34)}px;position:relative"></div>`}

/* ---------- deterministic hill compositions ---------- */
function hillRow(items,o){o=o||{};return `<div class="sk-hero" style="height:${o.h||280}px;margin:0">${hills({dark:1})}<div class="hr-row">${items.map(it=>`<div class="hr-it">${it.html}<div class="hr-lbl ${it.me?'me':''}">${it.label||''}</div></div>`).join('')}</div>${o.over||''}</div>`}
const spot=(inner)=>`<div class="spot">${inner||ic('plus',18)}</div>`;
function heroTop(hero,right){return `<div class="hero-wrap">${hero}<div class="top"><button class="iconbtn" onclick="back()">${ic('back')}</button>${right!==undefined?right:`<button class="iconbtn" onclick="protoMenu()">${ic('menu',22)}</button>`}</div></div>`}

def('gt-why3',()=>({cls:'dark',html:whyShell(2,`${whyScene(`<div class="hr-row">
   <div class="hr-it rise d2"><img src="${IMG.seedling}" style="height:92px"><div class="hr-lbl">Sam</div></div>
   <div class="hr-it rise"><img src="${IMG.oak}" style="height:150px"><div class="hr-lbl me">You</div></div>
   <div class="hr-it rise d4"><img src="${IMG.oak}" style="height:118px"><div class="hr-lbl">Mom</div></div></div>`)}
  <div class="eyebrow rise mt24">Family first</div><div class="h1 rise d1 mt8">Grow alongside the people you love.</div>
  <p class="p rise d2 mt12">Your grove is everyone growing with you. You see their oaks. They see yours. Nobody sees a balance.</p>`,'gt-why4')}));

def('gt-people-intro',()=>({cls:'dark',html:`${heroTop(hillRow([{html:spot(),label:'Family'},{html:spot(),label:'Friend'},{html:`<img src="${IMG.acorn}" style="height:78px">`,label:'You',me:1},{html:spot(),label:'Partner'},{html:spot(),label:'Anyone'}],{h:300}))}
  <div class="body" style="padding-top:20px"><div class="eyebrow">Your grove</div><div class="h2 mt8" style="color:#fff">Who do you want to grow with?</div>
  <p class="p mt8">They get a spot in your grove, and you get one in theirs.</p>
  <div class="mt16">${skRow(`<span style="color:#74c947">${ic('eye',20)}</span>`,'They see your oak and your weeks','Never amounts or balances',null)}${skRow(`<span style="color:#74c947">${ic('lock',18)}</span>`,'Only you see your grove','Remove anyone, anytime. They aren’t notified.',null)}</div></div>
  ${foot(btn('Choose from contacts',"askContacts(()=>go(S.perm.contacts==='denied'?'gt-manual':'gt-people'))",'wh'),btn('Share a link instead',"inviteLink()",'ghost'))}`}));

def('gt-sent',()=>{const inv=S.grove.filter(g=>g.status==='invited').slice(0,4);const L=inv.slice(0,2),R=inv.slice(2,4);
  const it=g=>({html:spot(av(g.id)),label:nm(g.id)});
  return {cls:'dark',html:`${heroTop(hillRow([...L.map(it),{html:`<img src="${IMG.acorn}" style="height:78px">`,label:'You',me:1},...R.map(it)],{h:300}),'')}
  <div class="body" style="padding-top:20px"><div class="eyebrow">Invites sent</div><div class="h2 mt8" style="color:#fff">Their spots are saved.</div>
  <p class="p mt8">After their first investment, their tree shows up next to yours, and yours next to theirs.</p>
  <div class="mt16">${inv.map(g=>skRow(av(g.id).replace('class="av"','class="av" style="width:48px;height:48px"'),PEOPLE[g.id].full,'Text sent · spot saved for 14 days',false).replace('<div class="sk-ck off"></div>','<span class="badge dk">Waiting</span>')).join('')}</div>
  <p class="sm mt12" style="color:var(--sk-sub)">No reply in 14 days? The spot opens up again. Nobody gets reminders.</p></div>
  ${foot(btn('Next: make this week count',"go('gt-habit')",'wh'))}`}});

def('gt-ready',()=>{const who=S.grove[0]?nm(S.grove[0].id):'Sam';return {cls:'dark',html:`<div class="hero-wrap"><div class="sk-hero" style="height:380px;margin:0">${hills({dark:1})}
   <div style="position:absolute;left:16px;right:16px;top:calc(var(--safeTop) + 40px);display:flex;flex-direction:column;gap:8px">
    <div class="nt rise"><div class="ai"><img src="${IMG.acorn}"></div><div class="grow"><b>${who} planted beside you</b><span>Your oaks are side by side. This week counts for both of you.</span></div><i>now</i></div>
    <div class="nt rise d2" style="opacity:.94;transform:scale(.97)"><div class="ai"><img src="${IMG.acorn}"></div><div class="grow"><b>Mom hasn’t invested yet this week</b><span>Send rain as a gentle nudge. No amounts, ever.</span></div><i>Fri</i></div>
    <div class="nt rise d4" style="opacity:.86;transform:scale(.94)"><div class="ai"><img src="${IMG.acorn}"></div><div class="grow"><b>Your grove: 4 of 4 this week</b><span>Everyone invested. Your oaks all grew.</span></div><i>Sun</i></div>
   </div></div></div>
  <div class="body" style="padding-top:8px"><div class="eyebrow">Notifications</div><div class="h2 mt8" style="color:#fff">Know when your grove grows.</div>
  <p class="p mt8">When someone plants, cheers you on, or needs a little rain. Never more than a couple a week.</p></div>
  ${foot(btn('Turn on notifications',"askNotif(()=>home('gt-home'))",'wh'),btn('Not now',"S.perm.notif='later';save();home('gt-home')",'ghost'))}`}});
