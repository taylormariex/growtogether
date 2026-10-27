/* =====================================================================
   Grove v2 · a calm game world with fixed, non-overlapping slots.
   Front row (near hill): two friends flank your oak. Back row (far ridge): four smaller trees.
   Everything happens in place: select, rain, cheer, invest, invite.
   ===================================================================== */
const GV_FRONT=[16,84];const GV_BACKS={1:[50],2:[28,72],3:[18,50,82],4:[12,37,63,88]};
function gvSlots(){const gr=S.grove.slice(0,6);const out=gr.map((g,i)=>({g,front:i<2}));if(out.length<6&&slotsOpen()>0)out.push({empty:1,front:out.length<2});
  const back=out.filter(s=>!s.front),pos=GV_BACKS[back.length]||[];back.forEach((s,i)=>s.x=pos[i]);out.filter(s=>s.front).forEach((s,i)=>s.x=GV_FRONT[i]);return out}
function gvTree(s){if(s.empty)return `<button class="gv-it ${s.front?'f':'b'}" style="left:${s.x}%" onclick="event.stopPropagation();T={};go('inv-pick')" aria-label="Plant a friend"><div class="gv-plot">${ic('plus',s.front?22:16)}</div><div class="gv-tag">Invite a friend</div></button>`;
  const g=s.g,id=g.id;if(g.status!=='growing')return `<button class="gv-it ${s.front?'f':'b'} ${GSEL===id?'sel':''}" id="gv-${id}" style="left:${s.x}%" onclick="event.stopPropagation();gvSel('${id}')" aria-label="${nm(id)}, invite waiting"><div class="gv-plot seed"><img src="${IMG.acorn}" style="height:${s.front?30:22}px" alt=""></div><div class="gv-tag">${nm(id)} · waiting</div></button>`;
  const W=wk(id),st=rstage(W);const h=s.front?(st[2] in OAKS?118:st[2]==='seedling'?92:56):(st[2] in OAKS?74:st[2]==='seedling'?58:38);const cue=g.open&&!S.watered[id];
  return `<button class="gv-it ${s.front?'f':'b'} ${GSEL===id?'sel':''} ${g.open?'open':''}" id="gv-${id}" style="left:${s.x}%" onclick="event.stopPropagation();gvSel('${id}')" aria-label="${nm(id)}, ${W} weeks${g.open?', has not invested yet this week':''}"><div class="sway" style="animation-delay:-${(s.x%7)}s"><img src="${IMG[st[2]]}" style="height:${h}px" alt=""></div>${cue?`<span class="dropbadge gv-drop">${ic('drop',11,'color:#fff')}</span>`:''}<div class="gv-tag"><i style="background:${g.open?'#4da1ef':'#74c947'}"></i>${nm(id)}</div></button>`}
def('gt-grove',()=>{spInit();const gr=growing();const done=gr.filter(x=>!x.open).length+(S.invested?1:0);const tot=gr.length+1;const st=rstage(S.streak);const meH=st[2] in OAKS?156:st[2]==='seedling'?128:84;
  return {cls:'dark',html:`<div class="gv" onclick="gvSel(null)">
   <div class="gv-sky">${Array.from({length:26}).map((_,i)=>`<i style="left:${(i*37)%100}%;top:${(i*23)%60}%;animation-delay:-${i%5}s"></i>`).join('')}</div>
   <div class="cloud" style="top:22%;width:110px;animation-duration:70s"></div><div class="cloud" style="top:30%;width:70px;animation-duration:95s;animation-delay:-40s"></div>
   <div class="gv-world" id="gvw">
    <div class="gv-ridge"></div><div class="gv-near"></div>
    <div class="gv-row b">${gvSlots().filter(s=>!s.front).map(gvTree).join('')}</div>
    <div class="gv-row f">${gvSlots().filter(s=>s.front).map(gvTree).join('')}
     <button class="gv-it me ${GSEL==='me'?'sel':''}" id="gv-me" style="left:50%" onclick="event.stopPropagation();gvSel('me')" aria-label="Your oak"><div class="sway"><img src="${IMG[st[2]]}" style="height:${meH}px" alt=""></div><div class="gv-tag me">You · ${S.streak}w</div></button></div>
    <div class="gv-fire">${Array.from({length:8}).map((_,i)=>`<i style="left:${8+i*12}%;bottom:${10+(i*13)%40}%;animation-delay:-${i*.7}s"></i>`).join('')}</div>
   </div>
   <div class="gv-hud" onclick="event.stopPropagation()"><button class="iconbtn" style="background:rgba(10,29,8,.6)" onclick="home('gt-home')" aria-label="Back">${ic('back')}</button>
    <div class="center"><div style="font-size:17px;font-weight:600;color:#fff">Your grove</div><div style="font-size:12px;color:var(--sk-sub)">${done} of ${tot} invested this week</div></div>
    <button class="iconbtn" style="background:rgba(10,29,8,.6)" onclick="groveSheet('half')" aria-label="Grove list">${ic('menu',20)}</button></div>
   <div class="gv-dock" id="gvd" onclick="event.stopPropagation()">${gvDock(GSEL)}</div></div>
  ${tabbarDk('gt-grove')}`,
  mount(el){if(GSEL)gvFocus(el,GSEL)}}});
function gvDock(id){const gr=growing();const open=gr.filter(x=>x.open&&!S.watered[x.id]);
  const acts=a=>`<div class="gw-acts">${a.map(([ic_,l,js,cls])=>`<button class="gw-act ${cls||''}" onclick="${js}"><span class="ic">${ic(ic_,18)}</span>${l}</button>`).join('')}</div>`;
  if(!id){const done=gr.filter(x=>!x.open).length+(S.invested?1:0),tot=gr.length+1;
    const notyet=gr.filter(x=>x.open);
    return `<div class="row"><div class="grow"><div class="h4" style="color:#fff">${notyet.length?`${notyet.map(x=>nm(x.id)).join(' and ')} ${notyet.length>1?'haven’t':'hasn’t'} invested yet`:S.invested?'Everyone’s growing this week':'Your week is open'}</div><div class="sm" style="color:var(--sk-sub)">${!open.length&&notyet.length?`Rain sent. It only counts when ${notyet.length===1&&notyet[0].id==='mom'?'she invests':'they invest'}.`:open.length===1?`Tap Rain to send ${nm(open[0].id)==='Mom'?'her':'them'} a gentle nudge. Tap any tree to cheer.`:open.length?'Tap Rain to nudge them, or tap a tree with a drop.':S.invested?'Tap any tree to cheer or start a challenge.':'Invest any amount and your oak counts this week.'}</div></div>${ringSvg(done/Math.max(1,tot),40)}</div>
    ${acts([S.invested?['share','Share',"shareOak()"]:['plus','Invest',"T={};S.afterCount='gt-grove';S.ret='gt-grove';go('inv-1')",'hot'],['drop',open.length?`Rain (${open.length})`:notyet.length?'Sent':'Rain',open.length?`gvRainAll()`:notyet.length?"toast('One rain per friend per week')":"toast('Everyone has invested this week')",open.length?'blue':''],['flag','Challenge',"T={chp:[]};go('gt-ch-new')"],['user','Invite',"T={};go('inv-pick')"]])}`}
  if(id==='me'){const st=rstage(S.streak);return `<div class="row"><img src="${IMG[st[2]]}" style="height:40px" alt=""><div class="grow"><div class="h4" style="color:#fff">You · ${st[1]}</div><div class="sm" style="color:var(--sk-sub)">${S.streak} week streak · ${S.flourishes.length} flourishes</div></div><button class="iconbtn" onclick="gvSel(null)" aria-label="Close">${ic('close',18)}</button></div>
    ${acts([S.invested?['check','Counted',"toast('This week already counts')"]:['plus','Invest',"T={};S.afterCount='gt-grove';S.ret='gt-grove';go('inv-1')",'hot'],['oak','My oak',"home('gt-oak')"],['share','Share',"shareOak()"],['eye','Privacy',"go('gt-privacy')"]])}`}
  const g=inGrove(id),p=PEOPLE[id];if(!g)return gvDock(null);
  if(g.status!=='growing')return `<div class="row">${av(id,'s')}<div class="grow"><div class="h4" style="color:#fff">${p.full}</div><div class="sm" style="color:var(--sk-sub)">Invite sent · ${g.day||'Fri'} · sprouts after their first investment</div></div><button class="iconbtn" onclick="gvSel(null)" aria-label="Close">${ic('close',18)}</button></div>
    ${acts([['chat','Remind',`gsRemind('${id}')`],['cal','Change day',`T={ivp:'${id}',day:'${g.day||'Fri'}'};go('inv-day')`],['ff','Sim: invests',`gvPlant('${id}')`,'hot'],['close','Cancel',`S.grove=S.grove.filter(x=>x.id!=='${id}');GSEL=null;save();refresh();toast('Invite canceled')`]])}`;
  const W=wk(id),st=rstage(W);const can=S.waterOK[id]&&!S.mutedWater[id];const sent=S.watered[id];
  return `<div class="row"><img src="${IMG[st[2]]}" style="height:40px" alt=""><div class="grow"><div class="h4" style="color:#fff">${p.full}</div><div class="sm" style="color:var(--sk-sub)">${st[1]} · ${plw(g.side||0)} side by side</div></div><button class="iconbtn" onclick="gvSel(null)" aria-label="Close">${ic('close',18)}</button></div>
   ${g.open?`<div class="gv-note">${ic('drop',16,'color:#4da1ef')}<div class="grow">${sent?`Rain sent. It only counts when ${p.name} invests.`:can?`${p.name} hasn’t invested yet this week. Send rain as a gentle nudge. It only counts when ${p.name==='Mom'?'she':'they'} invest${p.name==='Mom'?'s':''}.`:`${p.name} hasn’t turned on rain, so you can cheer instead.`}</div></div>`:''}
   ${acts([g.open?(sent?['check','Sent',"toast('One rain per friend per week')"]:can?['drop','Send rain',`gvRain('${id}')`,'blue']:['drop','Rain off',"toast('They haven’t turned on rain')"]):['check','Invested',`toast('${p.name} already invested this week')`],['spark','Cheer',`gvCheer('${id}')`],['flag','Challenge',`T={chp:['${id}']};go('gt-ch-new')`],g.open?['ff','Sim: invests',`gvInvests('${id}')`]:['menu','More',`personSheet('${id}')`]])}`}
function gvSel(id){GSEL=id;const el=cur();if(!el||el.dataset.id!=='gt-grove'){home('gt-grove');return}haptic(6);
  $$('.gv-it',el).forEach(t=>t.classList.toggle('sel',t.id==='gv-'+id));el.querySelector('.gv').classList.toggle('focus',!!id);$('#gvd',el).innerHTML=gvDock(id);gvFocus(el,id)}
function gvFocus(el,id){const w=$('#gvw',el);const t=id&&$('#gv-'+id,el);if(!t){w.style.transform='';return}const wr=w.getBoundingClientRect(),tr=t.getBoundingClientRect();const z=parseFloat(getComputedStyle(document.getElementById('device')).zoom)||1;
  const dx=(wr.left+wr.width/2-(tr.left+tr.width/2))/z;w.style.transformOrigin=`${(tr.left-wr.left+tr.width/2)/wr.width*100}% 80%`;w.style.transform=`translateX(${Math.max(-60,Math.min(60,dx*.35))}px) scale(1.06)`}
function gvAt(id){const el=cur();const t=$('#gv-'+id+' img',el)||$('#gv-'+id,el);const h=$('.gv',el).getBoundingClientRect();const r=t.getBoundingClientRect();const z=parseFloat(getComputedStyle(document.getElementById('device')).zoom)||1;return {el:$('.gv',el),x:(r.left-h.left+r.width/2)/z,y:(r.top-h.top)/z}}
function gvRain(id){const a=gvAt(id);rain(a.el,a.x,a.y-10);S.watered[id]=Date.now();save();haptic(12);toast(`Rain sent to ${nm(id)}`);setTimeout(()=>{const d=$('#gvd');if(d)d.innerHTML=gvDock(id);const b=$('#gv-'+id+' .gv-drop');if(b)b.remove()},700)}
function gvInvests(id){const g=inGrove(id);g.open=false;g.side=(g.side||0)+1;save();const a=gvAt(id),m=gvAt('me');rain(a.el,a.x,a.y);rain(m.el,m.x,m.y);haptic(20);
  setTimeout(()=>{refresh();banner(`${nm(id)} invested this week`,'It rained on both oaks.')},900)}
function gvPlant(id){const g=inGrove(id);g.status='growing';g.side=1;g.open=false;save();GSEL=null;refresh();setTimeout(()=>{const t=$('#gv-'+id);if(t)t.classList.add('pop');banner(`${nm(id)} planted beside you`,'Their first investment grew a tree on your hill.')},60)}
function gvCheer(id){const a=gvAt(id);const m=document.createElement('div');m.className='float-msg';m.textContent=['Keep going!','Proud of us','See you Friday','Nice one'][Math.floor(Math.random()*4)];m.style.left=(a.x-50)+'px';m.style.top=(a.y-40)+'px';a.el.appendChild(m);setTimeout(()=>m.remove(),1900);haptic(8);toast('Cheer sent to '+nm(id))}

/* ---------- device shell: iPhone 18-size screen (402×874), no light seam, fits any window ---------- */
(function(){const st=document.createElement('style');st.textContent=`#device{width:426px;height:898px;border-radius:66px;padding:12px;box-sizing:border-box}
#screen{border-radius:54px;background:#0b1f09}#screen.lt{background:#fff}
#island{top:12px;width:124px;height:36px;border-radius:20px}
#sbar{height:60px;padding:8px 36px 0 44px}
:root{--safeTop:60px;--safeBot:24px}
@media (max-width:500px){#device{width:100%;height:100%;border-radius:0;padding:0;zoom:1!important}#screen{border-radius:0}:root{--safeTop:env(safe-area-inset-top,20px);--safeBot:env(safe-area-inset-bottom,12px)}}
.scr{inset:-1px}`;document.head.appendChild(st);
  const fit=()=>{const d=document.getElementById('device');if(!d)return;if(innerWidth<=500){d.style.zoom=1;return}d.style.zoom=Math.min(1,(innerHeight-32)/898).toFixed(3)};fit();addEventListener('resize',fit)})();
function render(id,params,dir){const fn=SCR[id];if(!fn){toast('Screen not built: '+id);return}
  const host=$('#screen');const old=$$('.scr',host).pop();const r=fn(params||{});
  const el=document.createElement('div');el.className='scr '+(r.cls||'');el.dataset.id=id;el.innerHTML=r.html;host.insertBefore(el,$('#ov'));
  const light=/\b(dark)\b/.test(r.cls||'')||r.light;$('#sbar').classList.toggle('light',!!light);host.classList.toggle('lt',!/\b(dark|green)\b/.test(r.cls||''));
  if(old){const a=dir==='back'?['in-back','out-back']:dir==='fade'?['in-fade','']:['in-fwd','out-fwd'];if(dir==='back'){el.style.zIndex=0;old.style.zIndex=1}el.classList.add(a[0]);if(a[1])old.classList.add(a[1]);setTimeout(()=>old.remove(),dir==='fade'?460:400)}
  closeOv(true);if(r.mount)setTimeout(()=>r.mount(el),20);const b=$('.body',el);if(b)b.scrollTop=0}

/* ---------- Guide: one pop-up inside the phone (on start, and from ☰). No side panel, works the same on mobile ---------- */
const RV_GO=[['Home','What Jordan sees after sign-up',"jumpAhead();spInit();home('gt-home')"],['Your grove','Trees, rain and cheers',"jumpAhead();spInit();GSEL=null;home('gt-grove')"],['Invite someone','Pick a person and their day',"jumpAhead();spInit();home('gt-home');T={};go('inv-pick')"],['Money Type','Three questions, then a plan',"T={};home('mt2-intro')"],['Skip and Stash','Skip something, invest the difference',"T={};home('ss2-pick')"],['Money Manager','Your existing split, now on your oak',"home('ac-home');go('ac-mm')"],['Future Club','Notes for me or for my kid',"T={};home('fc-types')"],['Acorns Year','Monthly recaps and the year story',"T={si:0};jumpAhead();spInit();home('journal')"],['Getting invited','The friend’s side, every path',"home('sam-hub')"],['Edge states','Empty, locked, failed, expired',"home('states')"]];
const RV_OLD=[['Money Type v1','Quiz and match',"T={};home('mt-why1')"],['Skip Week v1','7-day crew challenge',"T={};home('ss-why1')"],['Future Club capsule','Notes that open in a year',"T={};home('fc-why1')"],['Acorns Year v1','The year as stories',"T={};home('ay-1')"],['Money Manager v1','First split concept',"T={};home('mm-why1')"],['How it all connects','Ways in, products, flourishes',"home('map')"]];
const RV_WEEK=[['todo','Not yet','Home nudges Jordan to invest this week.'],['done','Invested','The week counts. Home turns to friends.'],['reset','Missed last week','Starting over. Flourishes are kept.']];
const RV_MOMENTS=[['Mom invests','Rain falls on both oaks in the grove',"jumpAhead();spInit();GSEL=null;home('gt-grove');setTimeout(()=>gvInvests('mom'),900)"],['Jess signs up','A friend joined, their seed is waiting',"jumpAhead();spInit();S.friendJoined='jess';S.hidden={};save();home('gt-home');setTimeout(()=>banner('Jess signed up','Their tree sprouts after their first investment.',()=>groveSheet('half')),600)"],['Paycheck lands','Home offers to split it',"spInit();S.pay.detected=true;S.hidden={};save();home('gt-home')"],['A skip is spotted','Home offers a one-tap stash',"spInit();S.detect.on=true;S.detect.cats=['Coffee'];S.hidden={};save();home('gt-home')"],['4 weeks later','Grove filled in, challenges running',"jumpAhead();spInit();home('gt-home')"]];
function rvHTML(first){const s=skState();const row=(arr,k)=>arr.map(([t,d],i)=>`<button class="rv-i" onclick="rvRun(${i},'${k}')"><span><b>${t}</b><em>${d}</em></span>${ic('chev',16,'opacity:.35')}</button>`).join('');
  return `${first?`<div class="rv-hero"><img src="${IMG.oak}" alt=""><div><div class="rv-t">Share the wealth</div><div class="rv-d">Invite your people, share your progress, grow side by side.</div></div></div>
   <div class="rv-cta">${btn('Start right after sign-up',"closeOv();setTimeout(startGT,250)",'pri')}${btn('Jump in, 4 weeks later',"closeOv();setTimeout(()=>{jumpAhead();spInit();home('gt-home')},250)",'line')}</div>
   <p class="rv-tip">${ic('menu',14,'vertical-align:-3px')} To come back here, tap your avatar on Home, then Prototype guide.</p>`:`<div class="rv-t" style="margin-bottom:4px">Guide</div><div class="rv-d">Jump anywhere, or make something happen.</div>`}
  <div class="rv-sec">Explore</div><div class="rv-g">${row(RV_GO,'go')}</div>
  <div class="rv-sec">This week, Jordan has…</div><div class="rv-seg">${RV_WEEK.map(([k,l])=>`<button class="${s===k?'on':''}" onclick="closeOv();setTimeout(()=>{demoSet('${k}');home('gt-home')},250)">${l}</button>`).join('')}</div><div class="rv-help">${(RV_WEEK.find(w=>w[0]===s)||RV_WEEK[0])[2]}</div>
  <div class="rv-sec">Make something happen</div><div class="rv-g">${row(RV_MOMENTS,'mo')}</div>
  <div class="rv-sec">Earlier versions</div><div class="rv-g">${row(RV_OLD,'old')}</div>
  <div class="rv-foot"><button onclick="closeOv();setTimeout(()=>{resetAll();toast('Prototype reset')},250)">Start over</button></div>
  <p class="rv-tip" style="margin-top:14px">Build BUILDSTAMP · Placeholder names, brands and prices. Best on a phone: Share → Add to Home Screen.</p>`}
function rvRun(i,k){const js=(k==='go'?RV_GO:k==='old'?RV_OLD:RV_MOMENTS)[i][2];closeOv();setTimeout(()=>{const x=document.createElement('button');x.setAttribute('onclick',js);x.click()},250)}
function protoMenu(){sheet(rvHTML(false),{cls:'rvs'})}
function demoPaint(){}
(function(){const st=document.createElement('style');st.textContent=`#side{display:none!important}#stage{justify-content:center}
.sheet.rvs{max-height:90%;padding-top:10px}
.rv-hero{display:flex;gap:14px;align-items:center;padding:4px 0 14px}.rv-hero img{height:64px;flex-shrink:0}
.rv-t{font-size:22px;font-weight:600;letter-spacing:-.2px;color:#191919}.rv-d{font-size:14px;color:#555;margin-top:2px;line-height:1.4}
.rv-cta{display:flex;flex-direction:column;gap:8px}.rv-tip{font-size:12px;color:#777;margin:10px 0 0;line-height:1.4}
.rv-sec{font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#6b7a70;font-weight:700;margin:20px 0 8px}
.rv-g{border-radius:16px;background:#f4f6f3;overflow:hidden}.rv-i{display:flex;align-items:center;justify-content:space-between;width:100%;text-align:left;padding:11px 14px;border-bottom:1px solid #e6eae5;color:#191919}.rv-i:last-child{border-bottom:0}.rv-i:active{background:#e9efe6}
.rv-i b{display:block;font-size:15px;font-weight:600}.rv-i em{display:block;font-style:normal;font-size:12px;color:#6b7a70;margin-top:1px}
.rv-seg{display:flex;gap:4px;background:#f4f6f3;border-radius:14px;padding:4px}.rv-seg button{flex:1;height:38px;border-radius:10px;font-size:13px;font-weight:600;color:#3c4a40}.rv-seg button.on{background:#74c947;color:#0a1d08}
.rv-help{font-size:12px;color:#6b7a70;margin-top:6px}
.rv-foot{display:flex;gap:8px;margin-top:20px}.rv-foot button{flex:1;height:44px;border-radius:22px;background:#f4f6f3;font-weight:600;font-size:14px;color:#191919}`;document.head.appendChild(st);
  let seen=false;try{seen=sessionStorage.getItem('gt-guide')==='1';sessionStorage.setItem('gt-guide','1')}catch(e){}
})();

/* ---------- Timeline v2: art contained, one action per card, neutral copy for nudges ---------- */
const plw=n=>`${n} week${n===1?'':'s'}`;
function tlItems(){const w=S.streak,st=rstage(w);const it=[];
  if(w>0)it.push({k:'streak',lab:'Your Streak',t:`${plw(w)} · ${st[1]}`,d:'This week',hero:st[2],n:4});
  growing().forEach(g=>{const W=wk(g.id),s2=rstage(W);it.push(g.open?{k:'g-'+g.id,lab:nm(g.id),t:'Hasn’t invested yet this week',tone:'n',s:`Rain is a gentle nudge. It only counts when ${g.id==='mom'?'she invests':'they invest'}.`,side:s2[2],water:g.id}:{k:'g-'+g.id,lab:nm(g.id),t:`${plw(W)} · ${s2[1]}`,d:'Invested this week',side:s2[2],n:g.id==='sam'?3:2})});
  const FT={roots:'Roots planted',acorns:'Round-Ups® activated',nest:'A nest for rainy days',gold:'A gold leaf',sapling:'A sapling planted',flowers:'A wildflower bloomed',bird:'A songbird landed'};
  S.flourishes.slice(-3).reverse().forEach(k=>FLIMG[k]&&FT[k]&&it.push({k:'f-'+k,lab:FLNAME[k],t:FT[k],d:'Your oak',sideImg:FLIMG[k],n:3}));
  it.push({k:'start',lab:'Welcome to Acorns',t:'Started my journey',d:'Oct 2026',side:'acorn',n:5});
  return TLV==='hi'?it.filter(x=>x.k==='streak'||x.k.indexOf('f-')===0||x.water||x.k==='start').slice(0,5):it}
function tlCard(x){const on=CHEER[x.k];const art=x.side||x.sideImg;const ah=x.side in OAKS?56:x.side==='seedling'?52:44;
  const heart=x.n!==undefined?`<button class="tl-h ${on?'on':''}" type="button" onpointerdown="event.preventDefault()" onclick="event.preventDefault();event.stopPropagation();tlCheer(this,'${x.k}',${x.n})" aria-label="Cheer">${on?'♥':'♡'} ${x.n+(on?1:0)}</button>`:'';
  if(x.hero){const hh=x.hero in OAKS?96:x.hero==='seedling'?84:64;return `<div class="tl"><div class="tl-ring"><img src="${IMG[x.hero]}" style="height:${hh}px" alt=""></div><div class="lab">${x.lab}</div><div class="ttl">${x.t}</div><div class="meta"><span>${x.d}</span>${heart}</div></div>`}
  return `<div class="tl"><div class="tl-row"><div class="grow"><div class="lab">${x.lab}</div><div class="ttl ${x.tone==='n'?'n':''}">${x.t}</div>${x.s?`<div class="tl-s">${x.s}</div>`:''}</div>${art?`<div class="tl-art"><img src="${IMG[art]}" style="height:${ah}px;${x.water?'filter:saturate(.55) brightness(.85)':''}" alt=""></div>`:''}</div>
   ${x.water?`<button class="tl-rain" onclick="T={};go('gt-water',{id:'${x.water}'})">${ic('drop',15)} Send rain</button>`:`<div class="meta"><span>${x.d}</span>${heart}</div>`}</div>`}
(function(){const st=document.createElement('style');st.textContent=`.tl{padding:16px 16px 14px}
.tl-ring{width:112px;height:112px;border-radius:56px;border:2px solid rgba(116,201,71,.7);margin:4px auto 16px;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 50% 60%,rgba(116,201,71,.14),transparent 70%)}
.tl-ring img{display:block;filter:drop-shadow(0 6px 8px rgba(0,0,0,.35))}
.tl-row{display:flex;align-items:center;gap:14px}.tl-art{width:60px;display:flex;justify-content:center;flex-shrink:0}
.tl .lab{font-size:12px;color:var(--sk-sub);opacity:1}.tl .ttl{font-size:17px;line-height:1.3}.tl .ttl.n{color:#fff}
.tl-s{font-size:13px;color:var(--sk-sub);margin-top:4px;line-height:1.4}
.tl .meta{margin-top:12px}.tl-h{display:flex;align-items:center;gap:4px;color:#fff;font-size:12px}.tl-h.on{color:#74c947}
.tl-rain{margin-top:12px;height:36px;padding:0 14px;border-radius:18px;background:rgba(77,161,239,.18);color:#8cc4f7;font-weight:600;font-size:13px;display:inline-flex;align-items:center;gap:6px}`;document.head.appendChild(st)})();

/* ---------- Your oak tab v2: stage hero, streak tiles (profile reference), flourish grid ---------- */
def('gt-oak',()=>{spInit();const w=S.streak,st=rstage(w),nx=nextGoal(w);const pct=nx[0]>w?Math.max(4,Math.round(w/nx[0]*100)):100;const best=Math.max(w,S.best||8);
  const tile=k=>{const on=S.flourishes.indexOf(k)>-1;const im=FLIMG[k]?`<img src="${IMG[FLIMG[k]]}" alt="">`:ic('drop',30,'color:#4da1ef');return `<button class="ofl ${on?'on':''}" onclick="flourishSheet('${k}')"><div class="im">${im}</div><b>${FLNAME[k]}</b><span>${on?'Growing':FL[k].how}</span></button>`};
  return {cls:'dark',html:`<div class="hero-wrap">${oakStage({h:330,flush:1})}<div class="top"><button class="iconbtn" onclick="home('gt-home')" aria-label="Back">${ic('back')}</button><button class="iconbtn" onclick="shareOak()" aria-label="Share">${ic('share',22)}</button></div></div>
  <div class="body" style="padding-top:8px"><div class="center"><div class="eyebrow">${st[1]}</div><div class="h1 mt8" style="color:#fff">${plw(w)} in a row</div>
   ${nx[1]?`<div class="osbar mt16"><i style="width:${pct}%"></i></div><div class="row between mt8"><span class="sm" style="color:var(--sk-sub)">${st[1]}</span><span class="sm" style="color:var(--sk-sub)">${nx[1]} at ${nx[0]} weeks</span></div>`:''}</div>
   <div class="bento mt24"><div class="ostat">${ringSvg(Math.min(1,pct/100),44)}<div><b>${plw(w)}</b><span>Current streak</span></div></div><div class="ostat"><img src="${IMG.oak}" style="height:40px" alt=""><div><b>${plw(best)}</b><span>Best streak</span></div></div></div>
   <div class="sk-sec"><div class="h4">Oak extras</div><span class="sm">${S.flourishes.length} of 9</span></div>
   <p class="sm" style="color:var(--sk-sub);margin:-6px 0 12px">Your streak sets how tall your oak grows. Other Acorns habits add extras, like roots for Recurring or a nest for an Emergency Fund. Your grove sees the extras, never amounts.</p>
   <div class="oflg">${Object.keys(FL).map(tile).join('')}</div><div style="height:90px"></div></div>${tabbarDk('gt-oak')}`}});
(function(){const st=document.createElement('style');st.textContent=`.osbar{height:8px;border-radius:4px;background:rgba(255,255,255,.1);overflow:hidden}.osbar i{display:block;height:100%;border-radius:4px;background:#74c947}
.ostat{display:flex;align-items:center;gap:12px;padding:14px;border-radius:18px;background:#0a1a08;border:1px solid rgba(116,201,71,.14)}.ostat b{display:block;font-size:17px;color:#fff}.ostat span{font-size:12px;color:var(--sk-sub)}
.oflg{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.ofl{display:flex;flex-direction:column;align-items:center;text-align:center;padding:14px 8px 12px;border-radius:18px;background:#0a1a08;border:1px solid rgba(116,201,71,.12);color:#fff}
.ofl .im{height:52px;display:flex;align-items:center;justify-content:center}.ofl .im img{height:46px;filter:grayscale(1) brightness(.6);opacity:.55}
.ofl.on{border-color:rgba(116,201,71,.5);background:linear-gradient(180deg,rgba(116,201,71,.14),#0a1a08)}.ofl.on .im img{filter:none;opacity:1}
.ofl b{font-size:13px;margin-top:8px;line-height:1.2}.ofl span{font-size:11px;color:var(--sk-sub);margin-top:3px;line-height:1.3}.ofl.on span{color:#bceaa3}`;document.head.appendChild(st)})();

/* ---------- final copy pass on every screen: singular/plural ---------- */
(function(){const F=[[/(^|[^\d.])1 weeks/g,'$11 week'],[/(^|[^\d.])1 skips/g,'$11 skip'],[/(^|[^\d.])1 notes\b/g,'$11 note'],[/(^|[^\d.])1 flourishes/g,'$11 flourish'],[/(^|[^\d.])1 trees planted/g,'$11 tree planted']];
  Object.keys(SCR).forEach(id=>{const f=SCR[id];SCR[id]=p=>{const r=f(p);if(r&&typeof r.html==='string')F.forEach(([a,b])=>{r.html=r.html.replace(a,b)});return r}})})();

/* ---------- Challenge flow joins the dark grove world (was the only light island) ---------- */
['gt-ch-new','gt-ch-people','gt-ch-set','gt-ch-review','gt-ch-started','gt-ch-detail','gt-ch-invite'].forEach(id=>{const f=SCR[id];if(!f)return;SCR[id]=p=>{const r=f(p);if(r&&!/\b(dark|green)\b/.test(r.cls||''))r.cls=((r.cls||'')+' dark chd').trim();return r}});
(function(){const st=document.createElement('style');st.textContent=`.scr.chd .choice{background:var(--sk-card);box-shadow:inset 0 0 0 1px var(--sk-line);color:#fff}.scr.chd .choice.on{box-shadow:inset 0 0 0 2px #74c947;background:rgba(116,201,71,.12)}
.scr.chd .choice .sub,.scr.chd .p,.scr.chd .sm{color:var(--sk-sub)}.scr.chd .choice .lockic{background:rgba(116,201,71,.14)!important;color:#74c947!important}
.scr.chd .card:not(.dk){background:var(--sk-card);border:1px solid var(--sk-line);box-shadow:none;color:#fff}.scr.chd .h1,.scr.chd .h2,.scr.chd .h3,.scr.chd .h4,.scr.chd .ttl{color:#fff}
.scr.chd .check{box-shadow:inset 0 0 0 2px rgba(255,255,255,.3)}.scr.chd .btn.pri{background:#74c947;color:#0a1d08}.scr.chd .btn.line{color:#fff;box-shadow:inset 0 0 0 1px var(--sk-line)}
.scr.chd .chip{background:rgba(255,255,255,.08);color:#fff}.scr.chd .chip.on{background:#74c947;color:#0a1d08}.scr.chd .badge.gold{background:rgba(245,196,81,.16);color:#f5c451}
.scr.chd .kv span{color:var(--sk-sub)}.scr.chd .kv b{color:#fff}.scr.chd input{background:rgba(255,255,255,.06);color:#fff;border-color:var(--sk-line)}`;document.head.appendChild(st)})();

/* why screens: the scene sits fully below the top bar (body clips negative margins, which cut the tree off) */
function whyScene(inner,h){return `<div class="sk-hero" style="height:${h||330}px;border-radius:0">${hills({dark:1})}${inner}</div>`}
['gt-privacy','ss-why1','ss-why2','ss-why3','ss-pick','ss-est','ss-crew','ss-day','ss-end'].forEach(id=>{const f=SCR[id];if(!f)return;SCR[id]=p=>{const r=f(p);if(r)r.cls='dark chd';return r}});
(function(){const st=document.createElement('style');st.textContent=`.scr.chd .top .link{color:rgba(255,255,255,.7)!important}.scr.chd .btn.dk{background:#74c947;color:#0a1d08}.scr.chd .amt{color:#fff}.scr.chd .link{color:#74c947}
.scr.chd .li{border-color:rgba(255,255,255,.08)}.scr.chd .li .ttl{color:#fff}.scr.chd .li .sub{color:var(--sk-sub)}.scr.chd .eyebrow{color:#74c947}.scr.chd .bar{background:rgba(255,255,255,.1)}
.scr.chd [style*="background:#fff"]{background:var(--sk-card)!important;color:#fff!important}.scr.chd [style*="color:rgba(23,29,25"]{color:var(--sk-sub)!important}.scr.chd [style*="background:#eef6e8"],.scr.chd [style*="background:#f7f7f2"],.scr.chd [style*="background:var(--primaryIvory)"]{background:rgba(255,255,255,.06)!important}`;document.head.appendChild(st)})();

/* The white guide is the start. The old dark menu becomes a quiet backdrop that always reopens it. */
def('menu',()=>({cls:'dark',html:`<div class="sk-hero" style="height:62%;margin:0">${hills({dark:1})}<div class="tree"><img src="${IMG.oak}" style="height:150px" alt=""></div></div>
  <div class="body center" style="display:flex;flex-direction:column;justify-content:flex-end;padding-bottom:calc(var(--safeBot) + 20px)">${btn('Open the guide',"protoMenu0()",'wh')}</div>`,mount(){setTimeout(()=>{if(cur()&&cur().dataset.id==='menu')protoMenu0()},350)}}));
function protoMenu0(){sheet(rvHTML(true),{cls:'rvs'})}

/* "You're in": the one moment that gets real confetti (not a money action, so no calm-money rule) */
(function(){const f=SCR['gt-welcome'];if(!f)return;SCR['gt-welcome']=p=>{const r=f(p);r.mount=el=>{const b=ART.confettiBurst||ART.confetti;const s=$('#screen');b(s,120);setTimeout(()=>b(s,70),700);haptic(30)};return r}})();
/* main user is Jordan (she/her); migrate any saved state */
(function(){if(S&&S.me==='Alex'){S.me='Jordan';save()}})();
['gt-people','gt-invite','gt-add','gt-manual'].forEach(id=>{const f=SCR[id];if(!f)return;SCR[id]=p=>{const r=f(p);if(r&&!/\b(dark|green)\b/.test(r.cls||''))r.cls=((r.cls||'')+' dark chd').trim();return r}});

/* ---------- refresh keeps your place: scroll positions survive in-place updates (likes, toggles, steppers, chips) ---------- */
function refresh(){const t=stack[stack.length-1];const host=$('#screen');const old=$$('.scr',host).pop();if(!old)return;
  const sig=e=>e.tagName+'.'+(typeof e.className==='string'?e.className:'');const keep=[];const cnt={};
  old.querySelectorAll('*').forEach(e=>{const s=sig(e);cnt[s]=(cnt[s]||0)+1;if(e.scrollTop||e.scrollLeft)keep.push([s,cnt[s]-1,e.scrollTop,e.scrollLeft])});
  const r=SCR[t.id](t.params||{});old.className='scr '+(r.cls||'');old.innerHTML=r.html;
  if(keep.length){const idx={};old.querySelectorAll('*').forEach(e=>{const s=sig(e);(idx[s]=idx[s]||[]).push(e)});keep.forEach(([s,i,top,left])=>{const e=(idx[s]||[])[i];if(e){e.scrollTop=top;e.scrollLeft=left}})}
  if(r.mount)r.mount(old)}
/* likes update in place with a little pop, no re-render */
function tlCheer(b,k,n){CHEER[k]=!CHEER[k];const on=CHEER[k];b.classList.toggle('on',on);b.innerHTML=`${on?'♥':'♡'} ${n+(on?1:0)}`;haptic(6);if(on){b.classList.remove('pop1');void b.offsetWidth;b.classList.add('pop1')}}
(function(){const st=document.createElement('style');st.textContent=`.tl-h.pop1{animation:hpop .35s cubic-bezier(.3,1.6,.5,1)}@keyframes hpop{40%{transform:scale(1.3)}}`;document.head.appendChild(st)})();
/* edge state "no bank linked" is only for that one review screen; everywhere else gets the account back */
(function(){const base=spInit;spInit=function(){const r=base();const id=cur&&cur()&&cur().dataset&&cur().dataset.id;if((!S.accounts||!S.accounts.length)&&id!=='mt2-review'&&id!=='states')S.accounts=FRESH().accounts;return r}})();

/* Why 2: one clear story. 8 weeks fill one by one, the number counts with them, the tree grows acorn → seedling → oak. Plays once. */
def('gt-why2',()=>({cls:'dark',html:whyShell(1,`
  <div class="card dk mt8 w2c"><div class="row between" style="align-items:flex-end"><div><div class="sm" style="color:var(--sk-sub)">Your Streak</div><div class="w2n" id="wk">1</div><div class="sm" style="color:var(--sk-sub)" id="wkl">week in a row</div></div>
   <div class="w2art" id="w2art"><img src="${IMG.acorn}" style="height:64px" alt=""></div></div>
   <div class="w2row" id="w2row">${Array.from({length:8},(_,i)=>`<i class="${i<1?'on':''}"></i>`).join('')}</div></div>
  <div class="eyebrow rise mt32">Built on habit</div><div class="h1 rise d1 mt8">One investment a week keeps it growing.</div>
  <p class="p rise d2 mt12">Any amount counts. $5 counts. Set it once and the weeks add up on their own.</p>`,'gt-why3'),
  mount(el){let w=1;const art={1:['acorn',64],4:['seedling',96],8:['oak',128]};const tick=()=>{const k=$('#wk',el);if(!k||!document.body.contains(k))return;w++;if(w>8)return;
    k.textContent=w;$('#wkl',el).textContent=`week${w===1?'':'s'} in a row`;const b=$$('#w2row i',el)[w-1];if(b)b.classList.add('on');haptic(4);
    if(art[w]){$('#w2art',el).innerHTML=`<img class="grow-in" src="${IMG[art[w][0]]}" style="height:${art[w][1]}px" alt="">`}setTimeout(tick,w===8?0:460)};setTimeout(tick,700)}}));
(function(){const st=document.createElement('style');st.textContent=`.w2c{padding:20px!important;background:rgba(255,255,255,.05)!important}
.w2n{font-size:52px;font-weight:600;line-height:1.05;color:#fff;font-variant-numeric:tabular-nums}
.w2art{height:132px;width:130px;display:flex;align-items:flex-end;justify-content:center}.w2art img{display:block;filter:drop-shadow(0 8px 8px rgba(0,0,0,.35))}
.w2row{display:flex;gap:6px;margin-top:18px}.w2row i{flex:1;height:28px;border-radius:8px;background:rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;transition:background .25s}
.w2row i.on{background:#74c947;animation:orbIn .4s cubic-bezier(.3,1.6,.5,1)}.w2row i.on::after{content:"";width:9px;height:5px;border-left:2px solid #0a1d08;border-bottom:2px solid #0a1d08;transform:rotate(-45deg) translateY(-1px)}
.dark .weeks i.on{background:#74c947}`;document.head.appendChild(st)})();

function gvRainAll(){const open=growing().filter(x=>x.open&&!S.watered[x.id]&&S.waterOK[x.id]!==false&&!S.mutedWater[x.id]);if(!open.length){toast('They haven’t turned on rain');return}
  open.forEach((g,i)=>setTimeout(()=>{const a=gvAt(g.id);rain(a.el,a.x,a.y-10);S.watered[g.id]=Date.now();const b=$('#gv-'+g.id+' .gv-drop');if(b)b.remove()},i*350));save();haptic(12);
  toast(open.length===1?`Rain sent to ${nm(open[0].id)}. It only counts when ${open[0].id==='mom'?'she invests':'they invest'}.`:`Rain sent to ${open.length} people`);setTimeout(()=>{const d=$('#gvd');if(d)d.innerHTML=gvDock(null)},800)}
(function(){const st=document.createElement('style');st.textContent='.gv .cloud{display:none}';document.head.appendChild(st)})();

/* Money Type quiz v3: pick all that fit, Back and Continue in the footer, no auto-advance */
function mtHas(a,k,v){a=a||{};const x=a[k];return Array.isArray(x)?x.indexOf(v)>-1:x===v}
function mtScore(a){a=a||{};const card=mtHas(a,'spend','card'),auto=mtHas(a,'feel','auto'),when=mtHas(a,'feel','when'),here=mtHas(a,'rhythm','here'),pay=mtHas(a,'rhythm','pay');
  if(card&&(when||mtHas(a,'feel','see'))&&!auto&&!pay)return 'spare';if(card&&!auto&&!pay)return 'spare';if(when||here)return 'moment';if(card&&pay&&!auto)return 'moment';return 'steady'}
def('mt2-q',p=>{const i=p.i||0;const q=MTQ2[i];if(!T.mq)T.mq={};let v=T.mq[q.k];if(v!==undefined&&!Array.isArray(v))v=T.mq[q.k]=[v];v=v||[];
  return {cls:'dark',html:`${topbar({close:`mtExit(${i})`,title:''})}<div class="body"><div style="padding:6px 0 0">${mtDots(i)}</div>
  ${p.pre?`<div class="sk-chip mt16" style="display:inline-flex">${ic('spark',14,'color:#74c947')} Pre-filled from your patterns. Change what’s wrong.</div>`:''}
  <div class="eyebrow mt24">Question ${i+1} of 3</div><div class="mtq mt8">${q.q}</div><div class="sm mt8" style="color:var(--sk-sub)">Pick all that fit.</div>
  <div class="mt16">${q.o.map(([k,l,s])=>{const on=v.indexOf(k)>-1;return `<div class="qcard ${on?'on':''}" role="checkbox" aria-checked="${on}" onclick="mtTog(${i},'${k}')"><div class="grow"><div class="ql">${l}</div><div class="qs">${s}</div></div><div class="cbox ${on?'on':''}">${on?ic('check',14):''}</div></div>`}).join('')}</div></div>
  <div class="foot"><div class="row" style="gap:10px">${btn(i===0?'Back':`${ic('back',18)} Back`,i===0?'back()':`back()`,'line','style="color:#fff;flex:1"')}${btn(i<2?'Continue':'See my type',`mtNext(${i},${p.pre?1:0})`,'wh',`style="flex:1.6" ${v.length?'':'disabled'}`)}</div></div>`}});
function mtTog(i,k){const q=MTQ2[i];let v=T.mq[q.k];if(!Array.isArray(v))v=T.mq[q.k]=v?[v]:[];const j=v.indexOf(k);j>-1?v.splice(j,1):v.push(k);haptic(6);refresh()}
function mtNext(i,pre){if(i<2){go('mt2-q',{i:i+1,pre});return}S.mt2={a:JSON.parse(JSON.stringify(T.mq)),type:mtScore(T.mq)};S.resume=null;save();go('mt2-reveal')}

/* ---------- Stories v2: full-bleed slides, overlaid header, no seams ---------- */
function stories(id,slides,o){o=o||{};const i=Math.min(T.si||0,slides.length-1);const s=slides[i];
  return {cls:'dark',html:`<div class="stp2" style="background:${s.bg||'#0b1f09'}"><div class="stc2" onpointerdown="stHold(1)" onpointerup="stHold(0,event)" onpointerleave="stHold(0)">${s.html}</div>
  <div class="st-top"><div class="stbars">${slides.map((_,k)=>`<i class="${k<i?'done':k===i?'on':''}"><b></b></i>`).join('')}</div>
   <div class="row" style="padding:10px 12px 0;justify-content:space-between"><div class="st-lab">${o.label||'Acorns'}</div><button class="iconbtn" onclick="T.si=0;back()" aria-label="Close">${ic('close')}</button></div></div>
  ${s.foot||(i<slides.length-1?`<div class="st-hint">Tap to continue</div>`:'')}</div>`,
  mount(el){clearTimeout(STP);if(i<slides.length-1&&!o.manual)STP=setTimeout(()=>{if(cur()===el){T.si=i+1;refresh()}},6000);if(s.mount)s.mount(el)}}}
function stScene(inner,opt){opt=opt||{};return `<div class="sl-scene">${hills({dark:1})}${inner||''}</div>`}
function countUp(el,to,ms){if(!el)return;const t0=performance.now();const f=t=>{const p=Math.min(1,(t-t0)/ms);el.textContent=Math.round(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)}
def('year',p=>{p=p||{};const nu=p.newUser;const weeks=nu?3:41;const fl=nu?['roots']:['roots','acorns','nest','gold','bird'];const showN=!!T.yn;const trees=nu?1:4;
  const sl=[
   {html:`${stScene(`<div class="sl-tree" style="bottom:30%"><div class="sway"><img class="grow-in" src="${IMG[nu?'acorn':'oak']}" style="height:${nu?96:210}px" alt=""></div></div><div class="gv-fire">${Array.from({length:10}).map((_,k)=>`<i style="left:${6+k*9}%;bottom:${34+(k*17)%40}%;animation-delay:-${k*.6}s"></i>`).join('')}</div>`)}
     <div class="sl-text"><div class="eyebrow">2026</div><div class="sl-h">Your Acorns Year</div><p class="sl-p">${nu?'It’s just getting started. Here’s your first chapter.':`${weeks} weeks. ${fl.length} flourishes. ${trees} trees beside you.`}</p></div>`},
   {html:`<div class="sl-mid"><div class="eyebrow">You showed up</div><div class="sl-big"><span id="ycnt">0</span></div><div class="sl-h2">weeks invested</div>
     <div class="cal52 y52">${Array.from({length:52},(_,k)=>`<i data-k="${k}"></i>`).join('')}</div><p class="sl-p">${nu?'Every one counts.':'Including a fresh start in July. Every week counted.'}</p></div>`,
    mount(el){countUp($('#ycnt',el),weeks,1400);const on=nu?[49,50,51]:Array.from({length:52},(_,k)=>k).filter(k=>!(k>=26&&k<=36));on.forEach((k,n)=>setTimeout(()=>{const d=$(`.y52 i[data-k="${k}"]`,el);if(d)d.classList.add('on')},120+n*28))}},
   {html:`<div class="sl-full"><div class="sl-cap"><div class="eyebrow">Your oak’s year</div><div class="sl-h2" id="ymon">January</div></div>
     <div class="sl-stage">${oakStage({h:520,flush:1,weeks:0,fl:[],ghost:[],id:'yT'})}</div></div>`,
    mount(el){const seq=nu?[[0,'January'],[4,'March']]:[[0,'January'],[6,'March'],[14,'June'],[26,'September'],[41,'December']];const host=$('.sl-stage',el);
     seq.forEach(([w,m],n)=>setTimeout(()=>{if(!host||!document.body.contains(host))return;const flN=fl.slice(0,Math.min(fl.length,n+ (nu?1:0)));host.innerHTML=oakStage({h:520,flush:1,weeks:w,fl:flN,id:'yT'});const t=$('#yT',host);if(t)t.classList.add('breathe');$('#ymon',el).textContent=m;haptic(6)},n*1000))}}];
  if(!nu)sl.push({html:`<div class="sl-mid" style="justify-content:center"><div class="eyebrow">Highlights</div><div class="sl-h2" style="margin-bottom:18px">Three things you did</div>
    ${[['seedling','Most roots','26 weeks of recurring in a row'],['roundup','Most acorns','March: 4 acorns from Round-Ups®'],['learn','A first','Your first songbird landed']].map(([im,t,s],n)=>`<div class="yhl rise d${n*2+1}"><div class="yi"><img src="${IMG[im]}" alt=""></div><div><b>${t}</b><span>${s}</span></div></div>`).join('')}</div>`});
  sl.push({html:`${stScene(`<div class="hr-row" style="bottom:30%">${(nu?[{h:`<img src="${IMG.acorn}" style="height:64px">`,l:'You',me:1},{h:spot(),l:'Invite'}]:[{h:`<img src="${IMG.seedling}" style="height:92px">`,l:showN?'Sam':'Friend'},{h:`<img src="${IMG.oak}" style="height:150px">`,l:'You',me:1},{h:`<img src="${IMG.oak}" style="height:118px">`,l:showN?'Mom':'Family'}]).map(x=>`<div class="hr-it">${x.h}<div class="hr-lbl ${x.me?'me':''}">${x.l}</div></div>`).join('')}</div>`)}
    <div class="sl-text"><div class="eyebrow">Your grove</div><div class="sl-h">${trees} tree${trees===1?'':'s'} planted</div><p class="sl-p">${nu?'Invite one person. Grow together.':'You grew side by side, week after week.'}</p>
    <div class="row mt12" style="justify-content:center;gap:10px" onpointerdown="event.stopPropagation()" onpointerup="event.stopPropagation()"><span class="sm" style="color:var(--sk-sub)">Show names</span><div class="tog ${showN?'on':''}" onclick="event.stopPropagation();T.yn=!T.yn;refresh()"></div></div></div>`});
  sl.push({html:`<div class="sl-mid" style="justify-content:center"><div class="eyebrow">Share your year</div><div style="width:58%;margin:14px auto 0">${storyCard({eyebrow:'My Acorns Year',title:`${weeks} weeks invested.`,sub:`${fl.length} flourishes. ${trees} trees beside me.`})}</div><p class="sl-p" style="margin-top:14px">No amounts, ever. Your name stays off unless you add it.</p></div>`,
    foot:`<div class="foot" style="position:relative;z-index:3">${btn(`${ic('share',18)} Share`,"T.sbT=undefined;T.sbName=undefined;go('share-b',{kind:'year'})",'wh')}${btn('Save image',"toast('Saved to Photos')",'ghost')}</div>`});
  return stories('year',sl,{label:'Acorns Year'})});
(function(){const st=document.createElement('style');st.textContent=`.stp2{position:absolute;inset:0;overflow:hidden;color:#fff}
.stc2{position:absolute;inset:0;-webkit-user-select:none;user-select:none;display:flex;flex-direction:column}
.st-top{position:absolute;left:0;right:0;top:0;z-index:4;padding-top:calc(var(--safeTop) + 2px);background:linear-gradient(180deg,rgba(6,20,8,.55),transparent)}
.st-lab{height:30px;padding:0 12px;border-radius:15px;background:rgba(10,29,8,.55);border:1px solid var(--sk-line);font-size:12px;font-weight:600;display:flex;align-items:center;backdrop-filter:blur(8px)}
.st-hint{position:absolute;left:0;right:0;bottom:calc(var(--safeBot) + 14px);text-align:center;font-size:12px;color:rgba(255,255,255,.55);z-index:3;animation:fadeIn 1.2s 1.6s both}
.sl-scene{position:absolute;inset:0}.sl-scene .gv-fire{z-index:1}
.sl-tree{position:absolute;left:50%;transform:translateX(-50%)}.sl-tree img{display:block;filter:drop-shadow(0 12px 12px rgba(0,0,0,.4))}
.sl-text{position:absolute;left:0;right:0;bottom:calc(var(--safeBot) + 50px);padding:0 28px;text-align:center;z-index:2}
.sl-h{font-size:38px;font-weight:600;letter-spacing:-.6px;line-height:1.08;margin-top:8px}.sl-h2{font-size:24px;font-weight:600;letter-spacing:-.3px;margin-top:6px}
.sl-p{font-size:15px;color:rgba(255,255,255,.72);line-height:1.45;margin:10px auto 0;max-width:300px}
.sl-mid{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:calc(var(--safeTop) + 70px) 28px calc(var(--safeBot) + 60px)}
.sl-big{font-size:132px;font-weight:600;color:#74c947;line-height:.95;letter-spacing:-4px;font-variant-numeric:tabular-nums;margin-top:6px}
.y52{width:100%;margin-top:26px}.y52 i{transition:background .3s,transform .3s}.y52 i.on{transform:scale(1.08)}
.sl-full{flex:1;display:flex;flex-direction:column}.sl-cap{padding:calc(var(--safeTop) + 78px) 28px 0;text-align:center;position:relative;z-index:2}
.sl-stage{position:absolute;left:0;right:0;bottom:0;height:72%}.sl-stage .os{height:100%!important}
.yhl{display:flex;gap:14px;align-items:center;text-align:left;width:100%;padding:14px;border-radius:20px;background:rgba(255,255,255,.05);border:1px solid var(--sk-line);margin-top:10px}
.yhl .yi{width:56px;height:56px;border-radius:16px;background:rgba(116,201,71,.12);display:flex;align-items:center;justify-content:center;flex-shrink:0}.yhl .yi img{height:40px}
.yhl b{display:block;font-size:16px}.yhl span{display:block;font-size:13px;color:var(--sk-sub);margin-top:2px}
.stp2 .hr-row{z-index:1}.stp2 .hr-it img{filter:drop-shadow(0 10px 10px rgba(0,0,0,.4))}`;document.head.appendChild(st)})();

/* ---------- Acorns Year v3: the six light cards from the Figma set, as tappable stories ---------- */
function yLock(){return `<span class="y-lock"><img src="${IMG.acorn}" alt="">acorns <em>year</em></span>`}
function yMed(img){return `<div class="y-med"><img src="${IMG[img]}" alt=""></div>`}
function yDots(n,fill,cls){return `<div class="y-dots ${cls||''}">${Array.from({length:n},(_,k)=>`<i class="${fill(k)}" style="animation-delay:${k*18}ms"></i>`).join('')}</div>`}
def('year',p=>{p=p||{};const nu=p.newUser;const W=nu?3:48,RU=nu?12:312,tp=nu?'':'Top 6%';const st=rstage(S.streak||48);const name=S.me;
  const miss=new Set([3,9,17,40,48]);
  const sl=[
   {tone:'lt',html:`<div class="y-card y-white">${'<div class="y-top"><span class="y-chip">Acorns Year · 2026</span></div>'}<div class="y-scene">${hills({})}<div class="sl-tree" style="bottom:22%"><div class="sway"><img class="grow-in" src="${IMG.oak}" style="height:230px" alt=""></div></div></div>
     <div class="y-panel"><div class="y-h">${nu?'Your year, started.':'Your year, grown.'}</div><div class="y-s">${nu?'Three cards on how you began.':'Seven cards about the year you showed up.'}</div><div class="y-foot">${yLock()}<b>Tap to open</b></div></div></div>`},
   {tone:'lt',html:`<div class="y-card y-pale"><div class="y-top">${yLock()}<span class="y-n">01 / 06</span></div>
     <div class="y-num" id="ycnt">0</div><div class="y-lead">of 52 weeks,<br>you showed up.</div>
     ${yDots(52,k=>k<W?(miss.has(k)?'ring':(k<20?'dk':'gr')):'ring','y-wk')}
     <div class="y-bot"><span><i class="y-pip"></i>Longest run: 21 weeks in a row.</span></div>${yMed('seedling')}</div>`,
    mount(el){countUp($('#ycnt',el),W,1300)}},
   {tone:'lt',html:`<div class="y-card y-white"><div class="y-top"><span class="y-chip">Round-Ups®</span><span class="y-n pill">02 / 06</span></div><div class="y-scene">${hills({})}<div class="sl-tree" style="bottom:24%"><img class="grow-in" src="${IMG.roundup}" style="height:190px" alt=""></div></div>
     <div class="y-panel"><div class="y-num sm" id="yru">0</div><div class="y-s">everyday purchases<br>rounded up into investing.</div><div class="y-chips"><span>Mostly coffee</span><span>Then groceries</span></div></div></div>`,
    mount(el){countUp($('#yru',el),RU,1200)}},
   {tone:'dk',html:`<div class="y-card y-green"><div class="y-top">${yLock()}<span class="y-n">03 / 06</span></div>
     <div class="y-num w">${tp||'Week 3'}</div><div class="y-lead w">${nu?'and counting. Every week counts.':'most consistent investors on Acorns this year.'}</div>
     ${yDots(60,k=>k<6?'gold':'lt','y-rank')}
     <div class="y-bot w"><span>Ranked by weeks invested.<br>Never by balance.</span></div>${yMed('oak')}</div>`},
   {tone:'lt',html:`<div class="y-card y-white"><div class="y-top"><span class="y-chip">Your investor type</span><span class="y-n pill">04 / 06</span></div><div class="y-scene">${hills({})}<div class="sl-tree" style="bottom:22%"><div class="sway"><img class="grow-in" src="${IMG.oak}" style="height:250px" alt=""></div></div></div>
     <div class="y-panel"><div class="y-h">The Steady Oak</div><div class="y-s">You don’t chase. You show up, rain or shine.</div><div class="y-chips"><span>1 in 9 investors</span></div></div></div>`},
   {tone:'dk',html:`<div class="y-card y-green y-sum"><div class="y-top"><span class="y-who">${name}’s 2026</span><span class="y-n">05 / 06</span></div><div class="y-h w" style="margin-top:2px">Acorns Year</div>
     <div class="y-grid">${[[`${W}/52`,'weeks invested'],[`${RU}`,'Round-Ups'],[tp||'Week 3','most consistent'],['Steady Oak','investor type']].map(([a,b],n)=>`<div class="rise d${n+1}"><b>${a}</b><span>${b}</span></div>`).join('')}</div>
     <div class="y-pic">${hills({})}<div class="sl-tree" style="bottom:18%"><img src="${IMG.oak}" style="height:96px" alt=""></div><span>Steady Oak · 1 in 9</span></div>
     <div class="y-sfoot"><span class="y-btn">Start yours</span><span>acorns.com/j/${name.toLowerCase()}</span></div></div>`,
    foot:`<div class="foot y-actions">${btn(`${ic('share',18)} Share my year`,"T.sbT=undefined;T.sbName=undefined;go('share-b',{kind:'year'})",'wh')}${btn('Save image',"toast('Saved to Photos')",'ghost')}</div>`}];
  return stories('year',sl,{label:''})});
/* stories v2: light/dark header per slide */
(function(){const base=stories;stories=function(id,slides,o){const r=base(id,slides,o);const i=Math.min(T.si||0,slides.length-1);if(slides[i].tone==='lt')r.html=r.html.replace('class="stp2"','class="stp2 lt"');if(o&&o.label==='')r.html=r.html.replace(/<div class="st-lab">[^<]*<\/div>/,'<div></div>');return r}})();
(function(){const st=document.createElement('style');st.textContent=`
.stp2.lt .st-top{background:none}.stp2.lt .stbars i{background:rgba(0,0,0,.12)}.stp2.lt .stbars i b{background:#2f7a12}.stp2.lt .iconbtn{color:#191919}.stp2.lt .st-hint{color:rgba(0,0,0,.45)}
.y-card{position:absolute;inset:0;display:flex;flex-direction:column;padding:calc(var(--safeTop) + 62px) 22px calc(var(--safeBot) + 40px);overflow:hidden;color:#191919}
.y-white{background:#fbfdf8}.y-pale{background:radial-gradient(120% 80% at 80% 0%,#ffffff 0%,#e9f6df 45%,#d8efc6 100%)}.y-green{background:linear-gradient(160deg,#7fcf52,#5fb33a);color:#fff}
.y-top{display:flex;justify-content:space-between;align-items:center;position:relative;z-index:3}
.y-chip{height:30px;padding:0 12px;border-radius:15px;background:rgba(255,255,255,.85);color:#2f7a12;font-weight:600;font-size:12px;display:inline-flex;align-items:center;box-shadow:0 1px 0 rgba(0,0,0,.04)}
.y-n{font-size:12px;font-weight:600;color:#3c4a40}.y-n.pill{height:30px;padding:0 12px;border-radius:15px;background:rgba(255,255,255,.85);display:inline-flex;align-items:center}.y-green .y-n{color:rgba(255,255,255,.85)}
.y-lock{display:inline-flex;align-items:center;gap:6px;font-weight:700;font-size:13px;color:#2f7a12}.y-lock img{height:16px}.y-lock em{font-style:normal;font-weight:500;opacity:.75}.y-green .y-lock{color:#fff}
.y-scene{position:absolute;left:0;right:0;top:0;height:68%}.y-scene .sk-hero{height:100%!important;margin:0!important}
.y-panel{position:absolute;left:14px;right:14px;bottom:calc(var(--safeBot) + 34px);background:#fff;border-radius:22px;padding:20px 20px 18px;box-shadow:0 10px 30px rgba(0,0,0,.08);z-index:2}
.y-h{font-size:40px;font-weight:600;letter-spacing:-.8px;line-height:1.04}.y-h.w{color:#fff}
.y-s{font-size:15px;color:#555;margin-top:8px;line-height:1.4}
.y-foot{display:flex;justify-content:space-between;align-items:center;margin-top:18px;font-size:13px}.y-foot b{font-weight:600}
.y-num{font-size:150px;font-weight:600;letter-spacing:-6px;line-height:.92;color:#3f9a1a;margin-top:26px;font-variant-numeric:tabular-nums}.y-num.sm{font-size:70px;letter-spacing:-2px;margin:0;color:#191919}.y-num.w{color:#fff;font-size:92px;letter-spacing:-3px}
.y-lead{font-size:26px;font-weight:600;line-height:1.2;margin-top:10px;letter-spacing:-.3px}.y-lead.w{color:#fff;font-size:22px}
.y-dots{display:grid;grid-template-columns:repeat(13,1fr);gap:6px;margin-top:22px}.y-dots i{aspect-ratio:1;border-radius:50%;display:block;animation:orbIn .45s cubic-bezier(.3,1.6,.5,1) both}
.y-dots i.dk{background:#191919}.y-dots i.gr{background:#5fb33a}.y-dots i.ring{box-shadow:inset 0 0 0 1.5px #8a9a8e}
.y-rank{grid-template-columns:repeat(10,1fr);gap:7px}.y-dots i.gold{background:#f5c451;box-shadow:inset 0 0 0 2px #e0a92c}.y-dots i.lt{background:rgba(255,255,255,.35)}
.y-bot{margin-top:auto;font-size:13px;font-weight:600;position:relative;z-index:2}.y-bot.w{color:rgba(255,255,255,.9);font-weight:500}.y-pip{display:inline-block;width:10px;height:10px;border-radius:5px;background:#5fb33a;margin-right:8px;vertical-align:-1px}
.y-med{position:absolute;right:22px;bottom:calc(var(--safeBot) + 70px);width:104px;height:104px;border-radius:52px;background:radial-gradient(circle at 50% 40%,#fff,#e7f4dc);box-shadow:0 0 0 5px rgba(255,255,255,.9),0 12px 24px rgba(0,0,0,.15);display:flex;align-items:center;justify-content:center}.y-med img{height:70px}
.y-chips{display:flex;gap:8px;margin-top:14px;flex-wrap:wrap}.y-chips span{height:32px;padding:0 14px;border-radius:16px;background:#f1f4ef;font-size:13px;font-weight:600;display:inline-flex;align-items:center}
.y-who{font-size:13px;font-weight:600;color:rgba(255,255,255,.85)}
.y-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:18px}.y-grid div{padding:14px;border-radius:16px;background:rgba(255,255,255,.16);box-shadow:inset 0 0 0 1px rgba(255,255,255,.25);min-height:84px;display:flex;flex-direction:column;justify-content:space-between}
.y-grid b{font-size:24px;font-weight:600;letter-spacing:-.4px}.y-grid span{font-size:11px;color:rgba(255,255,255,.85);margin-top:10px}
.y-pic{position:relative;height:130px;border-radius:16px;overflow:hidden;margin-top:10px;box-shadow:0 0 0 3px rgba(255,255,255,.9)}.y-pic .sk-hero{height:100%!important;margin:0!important}
.y-pic span{position:absolute;left:10px;bottom:10px;height:28px;padding:0 12px;border-radius:14px;background:rgba(10,29,8,.55);color:#fff;font-size:12px;font-weight:600;display:flex;align-items:center;backdrop-filter:blur(6px);z-index:2}
.y-sfoot{display:flex;justify-content:space-between;align-items:center;margin-top:14px;font-size:12px;color:rgba(255,255,255,.9)}.y-btn{height:40px;padding:0 18px;border-radius:20px;background:#111;color:#fff;font-weight:600;font-size:14px;display:inline-flex;align-items:center}
.y-sum{padding-bottom:calc(var(--safeBot) + 150px)}.y-actions{position:absolute;left:0;right:0;bottom:0;z-index:5;background:linear-gradient(180deg,transparent,rgba(60,140,30,.9) 30%)}`;document.head.appendChild(st)})();

/* Year cards: one header row only. Bars sit at the very top; the card's own top row carries the counter and the close button. */
(function(){const f=SCR['year'];SCR['year']=p=>{const r=f(p);
  r.html=r.html.replace(/<div class="row" style="padding:10px 12px 0;justify-content:space-between">[\s\S]*?<\/button><\/div><\/div>/,'</div>');
  r.html=r.html.replace(/(<div class="y-top">[\s\S]*?)(<\/div>)/g,(m,a,b)=>a+`<button class="y-x" onclick="event.stopPropagation();T.si=0;back()" onpointerdown="event.stopPropagation()" onpointerup="event.stopPropagation()" aria-label="Close">${ic('close',18)}</button>`+b);
  r.html=r.html.replace('<span class="y-n">','<span class="y-n" style="margin-left:auto;margin-right:8px">').replace(/<span class="y-n pill">/g,'<span class="y-n pill" style="margin-left:auto;margin-right:8px">');
  return r}})();
(function(){const st=document.createElement('style');st.textContent=`
.stp2 .st-top{padding-top:calc(var(--safeTop) + 4px)!important;background:none!important}
.y-card{padding:calc(var(--safeTop) + 22px) 20px calc(var(--safeBot) + 28px)!important}
.y-top{margin-top:0!important;gap:0}.y-top>*:first-child{margin-right:auto}
.y-top .y-n[style]{margin-left:0!important}
.y-x{width:32px;height:32px;border-radius:16px;background:rgba(255,255,255,.85);color:#191919;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.y-green .y-x{background:rgba(255,255,255,.2);color:#fff}
.y-scene{top:0!important;height:64%!important}
.y-panel{left:16px;right:16px;bottom:calc(var(--safeBot) + 24px);padding:20px}
.y-h{font-size:36px}
.y-num{font-size:132px;margin-top:22px}.y-num.w{font-size:84px;margin-top:22px}
.y-lead{font-size:24px}
.y-dots{gap:5px;margin-top:20px}.y-rank{gap:8px;margin-top:22px}
.y-med{width:92px;height:92px;bottom:calc(var(--safeBot) + 64px);right:20px}.y-med img{height:62px}
.y-bot{padding-right:110px}
.y-sum{padding-bottom:calc(var(--safeBot) + 140px)!important}
.y-grid{margin-top:14px}.y-grid div{min-height:76px}.y-pic{height:118px}
.y-actions{padding-top:28px}`;document.head.appendChild(st)})();


/* ================= Rain, end to end =================
   Home → Send rain → rain falls on their tree → (prototype) they invest → it rains on both oaks → back home, their card updated.
   Also reachable from the grove sheet and the grove dock. One rain per friend per week. */
const RAIN_NOTES=['Thinking of you this week','Your oak looks thirsty','We’ve got this','Same time Friday?'];
def('gt-water',p=>{const id=p.id||'mom';const per=PEOPLE[id];const g=inGrove(id)||{side:0,open:true};const W=wk(id);if(!T.wn)T.wn=RAIN_NOTES[0];const sent=!!(S.watered&&S.watered[id]);
  const mine={html:treeImg(S.streak,rstage(S.streak)[2] in OAKS?120:rstage(S.streak)[2]==='seedling'?90:60),label:`You · ${S.invested?'invested':'this week'}`,me:1};
  const theirs={html:`<div id="wtree" style="${sent?'':'filter:saturate(.55) brightness(.85)'};transition:filter .6s">${treeImg(W,rstage(W)[2] in OAKS?130:96)}</div>`,label:`${per.name} · ${sent?'rain sent':'hasn’t invested yet'}`};
  return {cls:'dark',html:`${topbar({close:true,title:''})}<div class="body">${hillRow([mine,theirs],{h:260})}
   <div class="h2 mt16" id="wt" style="color:#fff">${sent?'Rain sent.':`Send ${per.name} a little rain`}</div>
   <p class="p mt8" id="wp">${sent?`${per.name} sees it next time they open Acorns, with your note. No follow-ups from us. It only counts when ${id==='mom'?'she invests':'they invest'}.`:`${per.name} hasn’t invested yet this week. Rain is a gentle nudge: it falls on ${per.name}’s tree with a short note from you. Neither of you ever sees amounts.`}</p>
   ${sent?`<div class="card dk mt16" style="padding:12px 14px"><div class="row">${ic('drop',18,'color:#4da1ef')}<div class="grow sm" style="color:#fff">“${T.wn}”</div><span class="sm" style="color:var(--sk-sub)">Sent</span></div></div>
   <div class="mt24 center"><span class="sim" onclick="waterWorked('${id}')">${ic('ff',12)} Prototype: ${per.name} invests</span></div>`
   :`<div class="sm mt16" style="color:var(--sk-sub)">Add a note</div><div class="chips mt8" id="wchips">${RAIN_NOTES.map(n=>chip('wn',n,n)).join('')}</div>
   <p class="sm mt16" style="color:var(--sk-sub)">One rain per friend per week. ${per.name} can turn rain off anytime.</p>`}</div>
   <div class="foot" id="wfoot">${sent?btn('Done','back()','wh'):btn(`${ic('drop',20)} Send rain`,`waterSend('${id}')`,'wh')}</div>`}});
function waterSend(id){const el=cur();const t=$('#wtree',el);if(t){const r=t.getBoundingClientRect(),h=$('#screen').getBoundingClientRect();const z=zf();rain($('#screen'),(r.left-h.left+r.width/2)/z,(r.top-h.top-20)/z)}
  if(!S.watered||typeof S.watered!=='object')S.watered={};S.watered[id]=Date.now();save();haptic(12);setTimeout(refresh,900)}
function waterWorked(id){const g=inGrove(id);if(g){g.open=false;g.side=(g.side||0)+1}save();replace('gt-water-ok',{id})}
def('gt-water-ok',p=>{const id=p.id||'mom';const per=PEOPLE[id];const g=inGrove(id)||{side:1};const W=wk(id);
  return {cls:'dark',html:`${topbar({left:'<div style="width:44px"></div>'})}<div class="body center">
   ${hillRow([{html:`<div id="wo-me">${treeImg(S.streak,rstage(S.streak)[2] in OAKS?120:rstage(S.streak)[2]==='seedling'?90:60)}</div>`,label:'You',me:1},{html:`<div id="wo-them" class="grow-in">${treeImg(W,rstage(W)[2] in OAKS?130:96)}</div>`,label:`${per.name} · invested`}],{h:290})}
   <div class="eyebrow mt16 rise">${per.name} invested this week</div><div class="h1 mt8 rise d1" style="color:#fff">Your rain worked.</div>
   <p class="p mt8 rise d2">It rained on both oaks. ${per.name}’s week counts, and that’s ${g.side||1} week${(g.side||1)===1?'':'s'} side by side.</p></div>
   ${foot(btn('Done',"back2('gt-home')",'wh'),btn('Open my grove',"home('gt-grove')",'ghost'))}`,
   mount(el){const h=$('#screen').getBoundingClientRect(),z=zf();['#wo-me','#wo-them'].forEach((q,i)=>{const t=$(q,el);if(!t)return;const r=t.getBoundingClientRect();setTimeout(()=>rain($('#screen'),(r.left-h.left+r.width/2)/z,(r.top-h.top-20)/z),200+i*350)});haptic(20);setTimeout(()=>banner(`${per.name} invested this week`,'It rained on both oaks.'),1100)}}});
/* grove sheet: after Water, offer the prototype follow-through */
function gsWater(id,btnEl){if(!S.watered||typeof S.watered!=='object')S.watered={};S.watered[id]=Date.now();save();haptic(12);const r=btnEl.getBoundingClientRect(),h=$('#screen').getBoundingClientRect();const z=zf();rain($('#screen'),(r.left-h.left)/z,(r.top-h.top-60)/z);toast(`Rain sent to ${nm(id)}. It only counts when ${id==='mom'?'she invests':'they invest'}.`);
  setTimeout(()=>{gsRefresh();const b=$('#gsb');if(!b)return;const row=[...b.querySelectorAll('.gfriend')].find(x=>x.textContent.indexOf(PEOPLE[id].full)>-1);if(row){const d=document.createElement('div');d.className='mt8';d.innerHTML=`<span class="sim" onclick="gsClose();setTimeout(()=>{T={};go('gt-water',{id:'${id}'});setTimeout(()=>waterWorked('${id}'),300)},300)">${ic('ff',12)} Prototype: ${nm(id)} invests</span>`;row.appendChild(d)}},600)}
