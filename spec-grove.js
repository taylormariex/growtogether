/* =====================================================================
   Grove v2 · a calm game world with fixed, non-overlapping slots.
   Front row (near hill): two friends flank your oak. Back row (far ridge): four smaller trees.
   Everything happens in place: select, rain, cheer, invest, invite.
   ===================================================================== */
const GV_FRONT=[16,84];const GV_BACKS={1:[50],2:[28,72],3:[18,50,82],4:[12,37,63,88]};
function gvSlots(){const gr=S.grove.slice(0,6);const out=gr.map((g,i)=>({g,front:i<2}));if(out.length<6&&slotsOpen()>0)out.push({empty:1,front:out.length<2});
  const back=out.filter(s=>!s.front),pos=GV_BACKS[back.length]||[];back.forEach((s,i)=>s.x=pos[i]);out.filter(s=>s.front).forEach((s,i)=>s.x=GV_FRONT[i]);return out}
function gvTree(s){if(s.empty)return `<button class="gv-it ${s.front?'f':'b'}" style="left:${s.x}%" onclick="event.stopPropagation();T={};go('inv-pick')" aria-label="Plant a friend"><div class="gv-plot">${ic('plus',s.front?22:16)}</div><div class="gv-tag">Plant a friend</div></button>`;
  const g=s.g,id=g.id;if(g.status!=='growing')return `<button class="gv-it ${s.front?'f':'b'} ${GSEL===id?'sel':''}" id="gv-${id}" style="left:${s.x}%" onclick="event.stopPropagation();gvSel('${id}')" aria-label="${nm(id)}, invite waiting"><div class="gv-plot seed"><img src="${IMG.acorn}" style="height:${s.front?30:22}px" alt=""></div><div class="gv-tag">${nm(id)} · waiting</div></button>`;
  const W=wk(id),st=rstage(W);const h=s.front?(st[2]==='oak'?118:st[2]==='seedling'?92:56):(st[2]==='oak'?74:st[2]==='seedling'?58:38);const cue=g.open&&!S.watered[id];
  return `<button class="gv-it ${s.front?'f':'b'} ${GSEL===id?'sel':''} ${g.open?'open':''}" id="gv-${id}" style="left:${s.x}%" onclick="event.stopPropagation();gvSel('${id}')" aria-label="${nm(id)}, ${W} weeks${g.open?', has not invested yet this week':''}"><div class="sway" style="animation-delay:-${(s.x%7)}s"><img src="${IMG[st[2]]}" style="height:${h}px" alt=""></div>${cue?`<span class="dropbadge gv-drop">${ic('drop',11,'color:#fff')}</span>`:''}<div class="gv-tag"><i style="background:${g.open?'#4da1ef':'#74c947'}"></i>${nm(id)}</div></button>`}
def('gt-grove',()=>{spInit();const gr=growing();const done=gr.filter(x=>!x.open).length+(S.invested?1:0);const tot=gr.length+1;const st=rstage(S.streak);const meH=st[2]==='oak'?156:st[2]==='seedling'?128:84;
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
    return `<div class="row"><div class="grow"><div class="h4" style="color:#fff">${open.length?`${open.map(x=>nm(x.id)).join(' and ')} ${open.length>1?'haven’t':'hasn’t'} invested yet`:S.invested?'Everyone’s growing this week':'Your week is open'}</div><div class="sm" style="color:var(--sk-sub)">${open.length?'Tap their tree to send rain as a gentle nudge.':S.invested?'Tap any tree to cheer or start a challenge.':'Invest any amount and your oak counts this week.'}</div></div>${ringSvg(done/Math.max(1,tot),40)}</div>
    ${acts([S.invested?['share','Share',"shareOak()"]:['plus','Invest',"T={};S.afterCount='gt-grove';S.ret='gt-grove';go('inv-1')",'hot'],['drop',open.length?`Rain (${open.length})`:'Rain',open.length?`gvSel('${open[0].id}')`:"toast('Everyone has invested this week')",open.length?'blue':''],['flag','Challenge',"T={chp:[]};go('gt-ch-new')"],['user','Invite',"T={};go('inv-pick')"]])}`}
  if(id==='me'){const st=rstage(S.streak);return `<div class="row"><img src="${IMG[st[2]]}" style="height:40px" alt=""><div class="grow"><div class="h4" style="color:#fff">You · ${st[1]}</div><div class="sm" style="color:var(--sk-sub)">${S.streak} week streak · ${S.flourishes.length} flourishes</div></div><button class="iconbtn" onclick="gvSel(null)" aria-label="Close">${ic('close',18)}</button></div>
    ${acts([S.invested?['check','Counted',"toast('This week already counts')"]:['plus','Invest',"T={};S.afterCount='gt-grove';S.ret='gt-grove';go('inv-1')",'hot'],['oak','My oak',"home('gt-oak')"],['share','Share',"shareOak()"],['eye','Privacy',"go('gt-privacy')"]])}`}
  const g=inGrove(id),p=PEOPLE[id];if(!g)return gvDock(null);
  if(g.status!=='growing')return `<div class="row">${av(id,'s')}<div class="grow"><div class="h4" style="color:#fff">${p.full}</div><div class="sm" style="color:var(--sk-sub)">Invite sent · ${g.day||'Fri'} · sprouts after their first investment</div></div><button class="iconbtn" onclick="gvSel(null)" aria-label="Close">${ic('close',18)}</button></div>
    ${acts([['chat','Remind',`gsRemind('${id}')`],['cal','Change day',`T={ivp:'${id}',day:'${g.day||'Fri'}'};go('inv-day')`],['ff','Sim: invests',`gvPlant('${id}')`,'hot'],['close','Cancel',`S.grove=S.grove.filter(x=>x.id!=='${id}');GSEL=null;save();refresh();toast('Invite canceled')`]])}`;
  const W=wk(id),st=rstage(W);const can=S.waterOK[id]&&!S.mutedWater[id];const sent=S.watered[id];
  return `<div class="row"><img src="${IMG[st[2]]}" style="height:40px" alt=""><div class="grow"><div class="h4" style="color:#fff">${p.full}</div><div class="sm" style="color:var(--sk-sub)">${st[1]} · ${g.side||0} weeks side by side</div></div><button class="iconbtn" onclick="gvSel(null)" aria-label="Close">${ic('close',18)}</button></div>
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
const RV_GO=[['Home','What Alex sees after sign-up',"jumpAhead();spInit();home('gt-home')"],['Your grove','Trees, rain and cheers',"jumpAhead();spInit();GSEL=null;home('gt-grove')"],['Invite someone','Pick a person and their day',"jumpAhead();spInit();home('gt-home');T={};go('inv-pick')"],['Money Type','Three questions, then a plan',"T={};home('mt2-intro')"],['Skip and Stash','Skip something, invest the difference',"T={};home('ss2-pick')"],['Split a paycheck','Invest, Later and Savings at once',"T={};home('mm2-pay')"],['Future Club','Notes for me or for my kid',"T={};home('fc-types')"],['Acorns Year','Monthly recaps and the year story',"T={si:0};jumpAhead();spInit();home('journal')"],['Getting invited','The friend’s side, every path',"home('sam-hub')"],['Edge states','Empty, locked, failed, expired',"home('states')"]];
const RV_OLD=[['Money Type v1','Quiz and match',"T={};home('mt-why1')"],['Skip Week v1','7-day crew challenge',"T={};home('ss-why1')"],['Future Club capsule','Notes that open in a year',"T={};home('fc-why1')"],['Acorns Year v1','The year as stories',"T={};home('ay-1')"],['Money Manager v1','First split concept',"T={};home('mm-why1')"],['How it all connects','Ways in, products, flourishes',"home('map')"]];
const RV_WEEK=[['todo','Not yet','Home nudges Alex to invest this week.'],['done','Invested','The week counts. Home turns to friends.'],['reset','Missed last week','Starting over. Flourishes are kept.']];
const RV_MOMENTS=[['Mom invests','Rain falls on both oaks in the grove',"jumpAhead();spInit();GSEL=null;home('gt-grove');setTimeout(()=>gvInvests('mom'),900)"],['Jess signs up','A friend joined, their seed is waiting',"jumpAhead();spInit();S.friendJoined='jess';S.hidden={};save();home('gt-home');setTimeout(()=>banner('Jess signed up','Their tree sprouts after their first investment.',()=>groveSheet('half')),600)"],['Paycheck lands','Home offers to split it',"spInit();S.pay.detected=true;S.hidden={};save();home('gt-home')"],['A skip is spotted','Home offers a one-tap stash',"spInit();S.detect.on=true;S.detect.cats=['Coffee'];S.hidden={};save();home('gt-home')"],['4 weeks later','Grove filled in, challenges running',"jumpAhead();spInit();home('gt-home')"]];
function rvHTML(first){const s=skState();const row=(arr,k)=>arr.map(([t,d],i)=>`<button class="rv-i" onclick="rvRun(${i},'${k}')"><span><b>${t}</b><em>${d}</em></span>${ic('chev',16,'opacity:.35')}</button>`).join('');
  return `${first?`<div class="rv-hero"><img src="${IMG.oak}" alt=""><div><div class="rv-t">Share the wealth</div><div class="rv-d">Invite your people, share your progress, grow side by side.</div></div></div>
   <div class="rv-cta">${btn('Start right after sign-up',"closeOv();setTimeout(startGT,250)",'pri')}${btn('Jump in, 4 weeks later',"closeOv();setTimeout(()=>{jumpAhead();spInit();home('gt-home')},250)",'line')}</div>
   <p class="rv-tip">${ic('menu',14,'vertical-align:-3px')} Tap the menu in the top corner anytime to come back here.</p>`:`<div class="rv-t" style="margin-bottom:4px">Guide</div><div class="rv-d">Jump anywhere, or make something happen.</div>`}
  <div class="rv-sec">Explore</div><div class="rv-g">${row(RV_GO,'go')}</div>
  <div class="rv-sec">This week, Alex has…</div><div class="rv-seg">${RV_WEEK.map(([k,l])=>`<button class="${s===k?'on':''}" onclick="closeOv();setTimeout(()=>{demoSet('${k}');home('gt-home')},250)">${l}</button>`).join('')}</div><div class="rv-help">${(RV_WEEK.find(w=>w[0]===s)||RV_WEEK[0])[2]}</div>
  <div class="rv-sec">Make something happen</div><div class="rv-g">${row(RV_MOMENTS,'mo')}</div>
  <div class="rv-sec">Earlier versions</div><div class="rv-g">${row(RV_OLD,'old')}</div>
  <div class="rv-foot"><button onclick="closeOv();setTimeout(()=>{resetAll();toast('Prototype reset')},250)">Start over</button></div>
  <p class="rv-tip" style="margin-top:14px">Placeholder names, brands and prices. Best on a phone: Share → Add to Home Screen.</p>`}
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
function tlCard(x){const on=CHEER[x.k];const art=x.side||x.sideImg;const ah=x.side==='oak'?56:x.side==='seedling'?52:44;
  const heart=x.n!==undefined?`<button class="tl-h ${on?'on':''}" onclick="CHEER['${x.k}']=!CHEER['${x.k}'];haptic(6);refresh()" aria-label="Cheer">${on?'♥':'♡'} ${x.n+(on?1:0)}</button>`:'';
  if(x.hero){const hh=x.hero==='oak'?96:x.hero==='seedling'?84:64;return `<div class="tl"><div class="tl-ring"><img src="${IMG[x.hero]}" style="height:${hh}px" alt=""></div><div class="lab">${x.lab}</div><div class="ttl">${x.t}</div><div class="meta"><span>${x.d}</span>${heart}</div></div>`}
  return `<div class="tl"><div class="tl-row"><div class="grow"><div class="lab">${x.lab}</div><div class="ttl ${x.tone==='n'?'n':''}">${x.t}</div>${x.s?`<div class="tl-s">${x.s}</div>`:''}</div>${art?`<div class="tl-art"><img src="${IMG[art]}" style="height:${ah}px;${x.water?'filter:saturate(.55) brightness(.85)':''}" alt=""></div>`:''}</div>
   ${x.water?`<button class="tl-rain" onclick="groveSheet('full')">${ic('drop',15)} Send rain</button>`:`<div class="meta"><span>${x.d}</span>${heart}</div>`}</div>`}
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
   <div class="sk-sec"><div class="h4">Flourishes</div><span class="sm">${S.flourishes.length} of 9</span></div>
   <p class="sm" style="color:var(--sk-sub);margin:-6px 0 12px">Streaks set how tall your oak grows. Other healthy habits add flourishes your grove can see. Never amounts.</p>
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
