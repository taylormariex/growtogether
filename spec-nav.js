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
  if(!S.mt2||!S.mt2.done)c.push({k:'mt',e:'Find your money type',t:'Not sure where to start? <g>Take a 1-minute quiz</g>',img:'seedling',a:"go('splash',{k:'money-type'})"});
  if(open.length)c.push({k:'rain',e:'Grow together',t:`${nm(open[0].id)} hasn’t invested this week. <g>Send a nudge</g>`,img:'learn',a:"home('gt-grove')"});
  c.push({k:'skip',e:'Skip and stash',t:'Skipped a coffee today? <g>Invest what you saved</g>',img:'roundup',a:"go('splash',{k:'skip-and-stash'})"});
  c.push({k:'yr',e:'Monthly recap',t:'Your October recap <g>is ready to view</g>',img:'later',a:"T={si:0};go('recap',{m:9})"});
  const hid=S.heroHide||{};const l=c.filter(x=>!hid[x.k]);return l[(S.heroIdx||0)%Math.max(1,l.length)]||null}
/* Kids (existing) → Acorns Early → Future Club lives on the kid’s page */
def('kids',()=>({cls:'lt',html:`${topbar({title:'Kids'})}<div class="body"><div class="kid-card"><div class="row"><div class="ach-av" style="background:#e7f3df;color:#2f7a12">A</div><div class="grow"><b>Ava’s Early account</b><span>Acorns Early · existing</span></div>${ic('chev',16,'opacity:.4')}</div></div>
  <div class="kid-new" onclick="go('splash',{k:'future-club'})"><div class="as-k">Future Club</div><div class="row mt8" style="gap:14px"><img src="${IMG.seedling}" style="height:56px" alt=""><div class="grow"><b style="font-size:16px">Start Ava’s Future Club</b><div class="sm" style="color:#5d655f;margin-top:2px">Family writes Ava notes to read when she’s older. Each note you approve adds a leaf to her sapling.</div></div></div></div>
  <p class="sm mt16" style="color:#5d655f">Everything else on Kids is the existing Acorns Early experience.</p></div>`}));
/* Streaks keeps the app nav. Grove and Challenges sit behind an in-page pill, like Community’s Explore | Stats */
function tabbarDk(on){const t=[['gt-home','Oak'],['gt-grove','Grove'],['gt-ch','Challenges']];const cur0=on==='gt-oak'?'gt-home':on;
  return `<div class="sk-pill" role="tablist" aria-label="Grow Together">${t.map(([id,l])=>`<button class="${cur0===id?'on':''}" role="tab" aria-selected="${cur0===id}" onclick="home('${id}')">${l}</button>`).join('')}</div>`}
(function(){const st=document.createElement('style');st.textContent=`
.ach-yk{display:flex;background:rgba(255,255,255,.2);border-radius:18px;padding:3px}.ach-yk button{height:30px;padding:0 12px;border-radius:15px;font-weight:600;font-size:13px;color:#fff}.ach-yk button.on{background:#fff;color:#2f7a12}
.ach-banner{position:absolute;left:16px;right:16px;top:calc(var(--safeTop) + 160px);display:flex;align-items:center;background:rgba(10,40,6,.55);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-radius:18px;border:1px solid rgba(255,255,255,.18);z-index:3}
.ach-bn{flex:1;display:flex;align-items:center;gap:12px;padding:12px 4px 12px 12px;text-align:left;color:#fff}.ach-bn img{height:40px;flex-shrink:0}.ach-bn b{display:block;font-size:15px}.ach-bn em{display:block;font-style:normal;font-size:13px;opacity:.85;margin-top:1px}
.ach-bx{width:44px;height:44px;color:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.ach-val{top:calc(var(--safeTop) + 58px)!important}
.kid-card{padding:16px;border-radius:18px;background:#f6f8f4;border:1px solid #e4e9e1}.kid-card b{display:block;font-size:16px}.kid-card span{font-size:13px;color:#5d655f}
.kid-new{margin-top:12px;padding:16px;border-radius:18px;background:#edf8e6;border:1px solid #cde9bd;cursor:pointer}
.sk-pill{order:-1;flex:none;margin:0 16px 10px;display:flex;gap:4px;padding:4px;border-radius:18px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.08)}.scr>.top{order:-2}
.gvs .sk-pill{position:absolute;left:16px;right:16px;top:calc(var(--safeTop) + 52px);margin:0;z-index:9;background:rgba(8,22,7,.5);backdrop-filter:blur(10px)}
.sk-pill button{flex:1;height:36px;border-radius:14px;font-weight:600;font-size:14px;color:rgba(255,255,255,.75)}.sk-pill button.on{background:#74c947;color:#0a1d08}
.scr:has(>.sk-pill)>.body>.p:first-child,.scr:has(>.sk-pill)>.body>.sk-sub:first-child{margin-top:0}
.gv-dock{bottom:calc(var(--safeBot) + 70px)!important}`;document.head.appendChild(st)})();

/* Framing: this is a feature concept inside the existing app, not a redesign */
RV_GO[0]=['Start in the Acorns app','Today’s Home, unchanged, with the concept built in',RV_GO[0][2]];
RV_GO.splice(1,0,['Your first week','The existing Streaks intro after funding',"jumpAhead();spInit();home('ac-home');go('f30-sheet')"]);
(function(){const f=rvHTML;rvHTML=function(first){let h=f(first);
  h=h.replace('<div class="rv-t">Share the wealth</div><div class="rv-d">Invite your people, share your progress, grow side by side.</div>','<div class="rv-t">Share the wealth</div><div class="rv-d">A feature concept that lives inside the current Acorns app. Start on Home and tap into it the way a customer would.</div>');
  h=h.replace('>Jump in, 4 weeks later<','>Open the app, 4 weeks in<');return h}})();
(function(){const f=SCR['ac-home'];SCR['ac-home']=p=>{const r=f(p);let h=r.html;
  r.html=h;return r}})();
(function(){const st=document.createElement('style');st.textContent=`
.nw-tag{position:absolute;left:12px;top:-9px;height:18px;padding:0 8px;border-radius:9px;background:#fff;color:#2f7a12;font-size:10px;font-weight:800;letter-spacing:.6px;text-transform:uppercase;display:flex;align-items:center;z-index:2;box-shadow:0 2px 6px rgba(0,0,0,.15)}
.ach-banner{overflow:visible}
.nw-dot{position:absolute;right:-3px;top:-3px;width:12px;height:12px;border-radius:6px;background:#ffd24a;box-shadow:0 0 0 2px #fff}.nw-dot.sm{position:relative;display:inline-block;right:auto;top:-6px;margin-left:3px;width:8px;height:8px;box-shadow:none}
.ach-pill,.ach-yk button{position:relative}
.nw-legend{position:absolute;left:12px;right:12px;top:calc(var(--safeTop) + 112px);z-index:7;display:none}
.ach-scroll>.nw-legend{position:sticky;top:0;display:flex;align-items:center;gap:8px;margin:0;left:auto;right:auto;padding:calc(var(--safeTop) + 6px) 14px 8px;background:#191919;color:#fff;font-size:12px;line-height:1.35}
.nw-legend span{flex:1}.nw-legend b{color:#ffd24a}.nw-legend button{width:32px;height:32px;color:#fff;display:flex;align-items:center;justify-content:center}`;document.head.appendChild(st)})();
/* Guide → Explore lists only the new ideas */
(function(){const keep=[['Money Type','Money Type','Three habit questions set up Recurring or Round-Ups'],['Skip and Stash','Skip and Stash','Skip a spend, invest it right away'],['Future Club','Future Club','Family adds notes; gifts go to kids through Giftlinks'],['Acorns Year','Acorns Year and share cards','Shows weeks and oak extras, never amounts'],['Invite someone','Invite to your grove','One person, one weekly day. Their first investment plants a tree'],['Money Manager, growing','Shared goals','Save for a goal with someone, your way']];
  const m={};RV_GO.forEach(x=>m[x[0]]=x);RV_GO.length=0;keep.forEach(([k,t,d])=>m[k]&&RV_GO.push([t,d,m[k][2]]))})();
(function(){const f=rvHTML;rvHTML=function(first){return f(first).replace(/<div class="rv-sec">This week, Jordan has…<\/div>[\s\S]*?(?=<div class="rv-foot">)/,'').replace('>Explore<','>The ideas<').replace('Jump anywhere, or make something happen.','Pick an idea to see how it works.')}})();

/* ===== The Acorns tab bar is always there. Every screen in these experiences gets it, and each tab
   goes where it really goes: Home, Investing (streaks, grove, year, skips), Money Hub (shared goals). ===== */
const AC_TAB_FOR=id=>{if(!id)return null;if(/^(ac-home|kids|profile|gt-notes)$/.test(id))return 'ac-home';if(/^(ac-mm|sg-|mm)/.test(id))return 'ac-mm';if(/^ac-invest$/.test(id))return 'ac-invest';
  if(/^(gt-|inv-|fr-|year|journal|recap|yr-|ss|qs-|jar|sr-|st-|plant|growth|share-b|water|fl-|mt|rec-|ru-)/.test(id))return 'ac-invest';return null};
(function(){const f=render;render=function(id,params,dir){f(id,params,dir);const el=$$('.scr').pop();if(!el||el.dataset.id!==id)return;const tab=AC_TAB_FOR(id);if(!tab)return;
  if(el.querySelector('.ac-tabs')||/^(splash|focus-end|sys-|menu|states|year|recap|yr-mid|share-b|growth|fl-unlock|gt-water-ok|ss-stashed|sg-added|inv-tree|fr-beside)/.test(id))return;
  const old=el.querySelector('.tabbar');if(old)old.remove();
  el.insertAdjacentHTML('beforeend',acTabs(tab));el.classList.add('has-actabs')}})();
(function(){const f=refresh;refresh=function(){f();const el=$$('.scr').pop();if(!el)return;const id=el.dataset.id;const tab=AC_TAB_FOR(id);if(!tab||el.querySelector('.ac-tabs')||/^(splash|focus-end|sys-|menu|states|year|recap|yr-mid|share-b|growth|fl-unlock|gt-water-ok|ss-stashed|sg-added|inv-tree|fr-beside)/.test(id))return;const old=el.querySelector('.tabbar');if(old)old.remove();el.insertAdjacentHTML('beforeend',acTabs(tab));el.classList.add('has-actabs')}})();
(function(){const st=document.createElement('style');st.textContent=`
.scr.has-actabs .body,.scr.has-actabs .sg-body,.scr.has-actabs .sgx-body{bottom:calc(var(--safeBot) + 64px)}
.scr.has-actabs .foot,.scr.has-actabs .sg-foot,.scr.has-actabs .gm-row:last-of-type{bottom:calc(var(--safeBot) + 64px)}
.scr.has-actabs .foot{position:absolute;left:0;right:0;padding-bottom:12px}
.scr.has-actabs .wr-bottom{padding-bottom:calc(var(--safeBot) + 76px)}.scr.has-actabs .wr-legal{padding-bottom:calc(var(--safeBot) + 70px)}
.scr.has-actabs.dark .ac-tabs{background:#0a1d08;border-top-color:rgba(255,255,255,.08)}.scr.has-actabs.dark .ac-tabs>button{color:rgba(255,255,255,.6)}.scr.has-actabs.dark .ac-tabs>button.on{color:#fff}.scr.has-actabs.dark .ac-tabs em{color:inherit}
.scr.has-actabs .ac-tabs .ac-hub span{box-shadow:0 0 0 3px #0a1d08}
.scr.has-actabs .yr-clock{bottom:calc(var(--safeBot) + 74px)}`;document.head.appendChild(st)})();
