/* =====================================================================
   Placement inside the CURRENT app navigation (no new tabs, no new nav):
   · Home hero banner slot (exists) → one contextual card at a time
   · “Get $250” pill (exists) → Invite
   · You | Kids toggle (exists) → Kids → Future Club
   · Your oak / streak chip (exist) → Streaks, which now holds Grove + Challenges behind an in-page pill
   · Money Manager tab on Home (exists) → existing Money Manager + one card
   · Registration (exists) → Money Type right after sign-up
   ===================================================================== */
function heroCard(){spInit();const c=[];const gr=growing();const open=gr.filter(x=>x.open&&!S.watered[x.id]);
  if(!S.mt2||!S.mt2.done)c.push({k:'mt',t:'Find your money type',s:'Three questions. The right first habit.',img:'seedling',a:"go('splash',{k:'money-type'})"});
  if(open.length)c.push({k:'rain',t:`${nm(open[0].id)} hasn’t invested yet`,s:'Send rain as a gentle nudge.',img:'learn',a:"home('gt-grove')"});
  c.push({k:'skip',t:'Skipped something today?',s:'Stash it and your week counts.',img:'roundup',a:"go('splash',{k:'skip-and-stash'})"});
  c.push({k:'yr',t:'Your October recap is ready',s:'4 weeks, 1 new flourish.',img:'later',a:"T={si:0};go('recap',{m:9})"});
  const hid=S.heroHide||{};const l=c.filter(x=>!hid[x.k]);return l[(S.heroIdx||0)%Math.max(1,l.length)]||null}
(function(){const f=SCR['ac-home'];SCR['ac-home']=p=>{const r=f(p);let h=r.html;
  h=h.replace(/<div class="ach-sec" style="margin-top:26px">New ways to grow<\/div>[\s\S]*?<\/div>\s*<p class="ach-legal">/,'<p class="ach-legal">');
  h=h.replace('<div class="ach-av" aria-hidden="true">','<div class="ach-yk" role="tablist"><button class="on" role="tab" aria-selected="true">You</button><button role="tab" aria-selected="false" onclick="go(\'kids\')">Kids</button></div><div class="ach-av" aria-hidden="true" style="display:none">');
  const c=heroCard();
  if(c)h=h.replace('<button class="ach-streak"',`<div class="ach-banner" role="region" aria-label="${c.t}"><button class="ach-bn" onclick="${c.a}"><img src="${IMG[c.img]}" alt=""><span><b>${c.t}</b><em>${c.s}</em></span></button><button class="ach-bx" onclick="event.stopPropagation();S.heroHide=S.heroHide||{};S.heroHide['${c.k}']=Date.now();save();refresh()" aria-label="Hide this">${ic('close',14)}</button></div><button class="ach-streak"`);
  r.html=h;return r}})();
/* Kids (existing) → Acorns Early → Future Club lives on the kid’s page */
def('kids',()=>({cls:'lt',html:`${topbar({title:'Kids'})}<div class="body"><div class="kid-card"><div class="row"><div class="ach-av" style="background:#e7f3df;color:#2f7a12">A</div><div class="grow"><b>Ava’s Early account</b><span>Acorns Early · existing</span></div>${ic('chev',16,'opacity:.4')}</div></div>
  <div class="kid-new" onclick="go('splash',{k:'future-club'})"><div class="as-k">New · Future Club</div><div class="row mt8" style="gap:14px"><img src="${IMG.seedling}" style="height:56px" alt=""><div class="grow"><b style="font-size:16px">Start Ava’s Future Club</b><div class="sm" style="color:#5d655f;margin-top:2px">Family adds notes for later. Each approved note blooms a leaf.</div></div></div></div>
  <p class="sm mt16" style="color:#5d655f">Everything else on Kids is the existing Acorns Early experience.</p></div>`}));
/* Streaks keeps the app nav. Grove and Challenges sit behind an in-page pill, like Community’s Explore | Stats */
function tabbarDk(on){const t=[['gt-home','Streak'],['gt-grove','Grove'],['gt-ch','Challenges']];const cur0=on==='gt-oak'?'gt-home':on;
  return `<div class="sk-pill" role="tablist" aria-label="Streaks">${t.map(([id,l])=>`<button class="${cur0===id?'on':''}" role="tab" aria-selected="${cur0===id}" onclick="home('${id}')">${l}</button>`).join('')}</div>`}
(function(){const st=document.createElement('style');st.textContent=`
.ach-yk{display:flex;background:rgba(255,255,255,.2);border-radius:18px;padding:3px}.ach-yk button{height:30px;padding:0 12px;border-radius:15px;font-weight:600;font-size:13px;color:#fff}.ach-yk button.on{background:#fff;color:#2f7a12}
.ach-banner{position:absolute;left:16px;right:16px;top:calc(var(--safeTop) + 160px);display:flex;align-items:center;background:rgba(10,40,6,.55);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-radius:18px;border:1px solid rgba(255,255,255,.18);z-index:3}
.ach-bn{flex:1;display:flex;align-items:center;gap:12px;padding:12px 4px 12px 12px;text-align:left;color:#fff}.ach-bn img{height:40px;flex-shrink:0}.ach-bn b{display:block;font-size:15px}.ach-bn em{display:block;font-style:normal;font-size:13px;opacity:.85;margin-top:1px}
.ach-bx{width:44px;height:44px;color:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.ach-val{top:calc(var(--safeTop) + 58px)!important}
.kid-card{padding:16px;border-radius:18px;background:#f6f8f4;border:1px solid #e4e9e1}.kid-card b{display:block;font-size:16px}.kid-card span{font-size:13px;color:#5d655f}
.kid-new{margin-top:12px;padding:16px;border-radius:18px;background:#edf8e6;border:1px solid #cde9bd;cursor:pointer}
.sk-pill{position:absolute;left:50%;transform:translateX(-50%);bottom:calc(var(--safeBot) + 12px);z-index:9;display:flex;gap:4px;padding:4px;border-radius:26px;background:rgba(8,22,7,.82);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid rgba(116,201,71,.25);box-shadow:0 10px 30px rgba(0,0,0,.4)}
.sk-pill button{height:44px;padding:0 18px;border-radius:22px;font-weight:600;font-size:14px;color:rgba(255,255,255,.75)}.sk-pill button.on{background:#74c947;color:#0a1d08}
.gv-dock{bottom:calc(var(--safeBot) + 70px)!important}`;document.head.appendChild(st)})();
