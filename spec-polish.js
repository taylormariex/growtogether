/* =====================================================================
   Polish pass · the Acorns Streaks visual system, applied everywhere.
   One stage art set (acorn → ancient oak), one seal set for milestones,
   one dark share card, one "Share your progress" sheet, real photographs
   in the Skip & Invest polaroids, and the invite story opens on a time-lapse
   instead of a still.
   ===================================================================== */
const STAGE_SLUG=['acorn','mature-acorn','young-seedling','mature-seedling','young-sapling','young-oak','mature-oak','ancient-oak'];
const STAGE_H=[50,52,48,62,100,138,164,200]; /* the strip's own proportions, scaled to the phone */
function stageIdx(w){let i=0;RSTAGES.forEach((r,k)=>{if(w>=r[0])i=k});return i}
function stageSrc(i){return `${YART}stage-${STAGE_SLUG[i]}.png`}
function sealSrc(i){return `${YART}seal-${STAGE_SLUG[i]}.png`}
function stageImg(w,h,cls){const i=stageIdx(w);return `<img class="stg ${cls||''}" src="${stageSrc(i)}" alt="" style="height:${h||STAGE_H[i]}px;width:auto">`}
function sealImg(i,sz,cls){return `<img class="seal-im ${cls||''}" src="${sealSrc(i)}" alt="" style="width:${sz||96}px;height:${sz||96}px">`}
/* every tree in the product uses the same eight stages */
function treeImg(w,h){const i=stageIdx(w);const old=i<2?70:i<5?96:150;const k=h?Math.min(1.35,h/old):1;return stageImg(w,Math.round(STAGE_H[i]*k))}

/* ---------- a seal in the same family, for milestones that aren't streak stages ---------- */
let SEALN=0;
function svgSeal(o){o=o||{};const id='sl'+(++SEALN);const s=o.size||96;const on=o.on!==false;const g=on?'#5aa235':'#b4bbb1';
 const hatch=(a0)=>{let out='';for(let a=a0-14;a<=a0+14;a+=4.7){const r=a*Math.PI/180;out+=`<line x1="${(100+56*Math.cos(r)).toFixed(1)}" y1="${(100+56*Math.sin(r)).toFixed(1)}" x2="${(100+84*Math.cos(r)).toFixed(1)}" y2="${(100+84*Math.sin(r)).toFixed(1)}"/>`}return out};
 return `<svg class="seal ${on?'':'off'}" width="${s}" height="${s}" viewBox="0 0 200 200" aria-hidden="true">
  <defs><radialGradient id="${id}g" cx="50%" cy="38%" r="62%"><stop offset="0" stop-color="${on?'#f3f9ea':'#eef0ec'}"/><stop offset="1" stop-color="${on?'#c9e3ae':'#dfe3dc'}"/></radialGradient>
   <path id="${id}t" d="M35 100 A65 65 0 0 1 165 100"/><path id="${id}b" d="M22 100 A78 78 0 0 0 178 100"/></defs>
  <circle cx="100" cy="100" r="97" fill="${on?'#f5f6ee':'#eceeea'}" stroke="${g}" stroke-width="2.4"/>
  <circle cx="100" cy="100" r="89" fill="none" stroke="${g}" stroke-width="1.1" stroke-dasharray="2.5 4.5"/>
  <g stroke="${g}" stroke-width="1.1" opacity=".9">${hatch(0)}${hatch(180)}</g>
  <circle cx="100" cy="100" r="52" fill="url(#${id}g)" stroke="${g}" stroke-width="2.4"/>
  <text font-family="Avenir Next,Avenir,Inter,system-ui,sans-serif" font-size="17.5" font-weight="800" letter-spacing="2" fill="${g}"><textPath href="#${id}t" startOffset="50%" text-anchor="middle">${(o.top||'').toUpperCase()}</textPath></text>
  <text font-family="Avenir Next,Avenir,Inter,system-ui,sans-serif" font-size="17.5" font-weight="800" letter-spacing="2" fill="${g}"><textPath href="#${id}b" startOffset="50%" text-anchor="middle">${(o.bottom||o.top||'').toUpperCase()}</textPath></text>
  <g transform="translate(72 72)">${on?sgGlyph(o.glyph||'star',56,'#2f7a12'):`<svg width="56" height="56" viewBox="0 0 24 24"><rect x="5.5" y="10.5" width="13" height="9" rx="2" fill="none" stroke="#9aa39b" stroke-width="1.8"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" fill="none" stroke="#9aa39b" stroke-width="1.8"/></svg>`}</g></svg>`}

/* ---------- milestone rows: Skip & Invest and shared goals ---------- */
function sealRow(list,reached,o){o=o||{};return `<div class="sgx-card"><div class="sgx-ch"><div><b>Milestones</b><em>${o.sub||''}</em></div><span class="sl-cnt">${reached.length}/${list.length}</span></div>
  <div class="sl-row">${list.map(([v,l,gl],i)=>{const on=reached.indexOf(v)>-1;return `<div class="sl-it ${on?'on':''}" style="animation-delay:${i*60}ms">${svgSeal({top:l,glyph:gl,size:90,on})}<b>${l}</b><em>${o.unit?o.unit(v):v+'%'}</em></div>`}).join('')}</div>${o.bar||''}</div>`}
sgBadges=function(p){return sealRow(SG_MS,SG_MS.filter(m=>p>=m[0]).map(m=>m[0]),{sub:`${SG_MS.filter(m=>p>=m[0]).length} of ${SG_MS.length} reached, together`})};
ssBadges=function(n,nx){return sealRow(SS_MS,SS_MS.filter(m=>n>=m[0]).map(m=>m[0]),{sub:nx?`${nx[0]-n} more skip${nx[0]-n===1?'':'s'} to ${nx[1]}`:'All five reached',unit:v=>`${v} skip${v===1?'':'s'}`,bar:nx?`<div class="sgx-nb" style="margin-top:14px"><i style="width:${Math.round(n/nx[0]*100)}%"></i></div>`:''})};
/* celebration screens: the round gradient badge becomes a seal */
['sg-added','ss-stashed'].forEach(id=>{const f=SCR[id];if(!f)return;SCR[id]=p=>{const r=f(p);const MS=id==='sg-added'?SG_MS:SS_MS;const m=MS.find(x=>x[0]===p.ms);
  if(m)r.html=r.html.replace(/<div class="sgx-badge pop">[\s\S]*?<\/span><\/div>/,`<div class="sl-pop pop">${svgSeal({top:m[1],glyph:m[2],size:150})}</div>`);return r}});

/* ---------- the dark share card (brand lockup · date · seal on a lit hill · title) ---------- */
function dkDate(){return new Date().toLocaleDateString('en-US',{day:'numeric',month:'long'})}
function dkCard(o){o=o||{};return `<div class="dkc ${o.cls||''}"><div class="dkc-top"><span class="dkc-lk"><img src="${IMG.acorn}" alt="">acorns</span><span class="dkc-dt">${o.date||dkDate()}</span></div>
  <div class="dkc-stage">${hills({dark:1})}<div class="dkc-glow"></div><div class="dkc-ring">${o.seal||''}</div></div>
  <div class="dkc-txt"><b style="${(o.title||'').length>20?'font-size:17px':''}">${o.title||''}</b><em>${o.sub||''}</em></div>${o.foot?`<div class="dkc-foot">${o.foot}</div>`:''}</div>`}
/* streak card: the stage seal */
function streakCard(w){const i=stageIdx(w||S.streak);return dkCard({seal:sealImg(i,140),title:RSTAGES[i][1],sub:`${plw(w||S.streak)} streak`})}

/* ---------- "Share your progress": one sheet for every share in the product ---------- */
const PS_IC={save:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v11m0 0 4-4m-4 4-4-4M5 19h14"/></svg>',copy:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>'};
function progressShare(o){o=o||{};SHARE=Object.assign({},o,{story:o.card});
 sheet(`<div class="ps-h"><div><b>${o.head||'Share your progress'}</b><em>${o.sub||'Show off how far you’ve come'}</em></div><button class="iconbtn" onclick="closeOv()" aria-label="Close">${ic('close',20)}</button></div>
  <div class="ps-card"><div class="ps-in">${o.card}</div></div>
  <div class="ps-acts"><button onclick="psAct('save')"><span>${PS_IC.save}</span>Save image</button><button onclick="psAct('copy')"><span>${PS_IC.copy}</span>Copy image</button><button onclick="psAct('via')"><span>${ic('share',22)}</span>Share via…</button></div>`,{cls:'ps'})}
function psAct(k){const o=SHARE;closeOv();if(k==='via'){setTimeout(()=>share(o),300);return}setTimeout(()=>{toast(k==='save'?'Saved to Photos':'Image copied');o.done&&o.done(k)},260)}
/* route the existing share entry points through it */
shareOak=function(){progressShare({card:streakCard(S.streak),title:`${plw(S.streak)} in a row`,text:`${plw(S.streak)} in a row on Acorns. Grow yours beside mine.`})};
personShare=function(id){const g=inGrove(id),p=PEOPLE[id];const n=g.side||0;
 progressShare({head:'Share your grove',sub:`You and ${p.name}, side by side`,people:[id],title:`${plw(n)} side by side`,card:dkCard({seal:`<div class="dkc-pair">${stageImg(S.streak,Math.min(120,STAGE_H[stageIdx(S.streak)]*.8))}${stageImg(wk(id),Math.min(110,STAGE_H[stageIdx(wk(id))]*.75))}</div>`,title:`${p.name} and me`,sub:`${plw(n)} growing together`}),text:`${plw(n)} growing side by side on Acorns.`})};
sgShare=function(pct,ms){const g=sgG();const who=nm(g.who);const m=SG_MS.find(x=>x[0]===ms);
 progressShare({head:m?'Share the milestone':'Share your progress',sub:m?`${m[1]}, with ${who}`:`${pct}% of the way, with ${who}`,title:m?`${m[1]} to ${g.name}`:`${pct}% to ${g.name}`,link:`acorns.com/goal/${S.me.toLowerCase()}`,people:[g.who,'mom','priya','sam','dad'].filter((x,i,a)=>a.indexOf(x)===i),text:m?`We just hit ${m[1].toLowerCase()} on ${g.name}!`:`${pct}% of the way to ${g.name}.`,
  card:dkCard({seal:m?svgSeal({top:m[1],glyph:m[2],size:140}):`<div class="dkc-pct"><b>${pct}%</b><em>together</em></div>`,title:g.name,sub:m?`${m[1]} · with ${who}`:`${pct}% saved · with ${who}`})})};
ssShare=function(item,ms){const st=ssStats();const m=SS_MS.find(x=>x[0]===ms);const it=String(item||'it').replace(/ jar$/i,'').toLowerCase();
 progressShare({head:m?'Share the milestone':'Share the skip',sub:m?`${m[1]}, every one invested`:`You skipped ${it} and invested it`,title:m?m[1]:`Skipped ${it}`,text:m?`${m[1]} on Acorns, every one invested.`:`Skipped ${it} today and invested it instead.`,
  card:dkCard({seal:m?svgSeal({top:m[1],glyph:m[2],size:140}):`<div class="dkc-pct"><b>${st.skips}</b><em>skips this month</em></div>`,title:m?m[1]:'Skipped it. Invested it.',sub:m?`${st.skips} skips, all invested`:`${st.skips} skips this month, every one invested`})})};
ycShare=function(html,title){progressShare({head:'Share your year',sub:title||'',title:title||'My Acorns Year',card:ycFrame(html,300),cls:'tall'})};

/* Year, "Grown together": the grove in the same stage art */
(function(){const f=yCard;yCard=function(n,o){let h=f(n,o);if(n===4)h=h.replace(/<div class="yc-trees">[\s\S]*?<\/div><\/div>/,`<div class="yc-trees">${[[7,118,'Mom'],[5,150,'You'],[5,132,'Sam'],[2,84,'Jess']].map(([st,hh,l],i)=>`<div class="yc-tree" style="animation-delay:${200+i*140}ms"><img src="${stageSrc(st)}" style="height:${Math.round(STAGE_H[st]*hh/150)}px" alt=""><b>${l}</b></div>`).join('')}</div>`);return h}})();

/* ---------- the milestone card in the Year story: a stage seal, not a flag ---------- */
LV.yrten=()=>`${ldGlow()}<div class="lv-mid"><div class="yt-cel rise"><div class="yt-seal">${sealImg(2,132)}</div><em>Young Seedling</em><b>Ten weeks<br>in a row</b><p>Most people don’t make it past four.</p><div class="yt-acts"><span>${ic('share',14)} Share</span><span class="ok">${ic('check',14)} Nice</span></div></div></div>`;

/* ---------- Skip & Invest story, card one: three skips become three sprouts ---------- */
/* the coffee jar: each thing you skip becomes an acorn in the jar */
const SKJ=[['cup','Coffee at home','$6'],['car','Walked instead','$14'],['bag','Cooked instead','$22']];
LV.sswhy=()=>`${ldGlow()}<div class="skj" id="skj">
  <div class="skj-items">${SKJ.map(([k,t,a],i)=>`<div class="skj-it" style="--i:${i}"><span class="skj-ic">${ssQIc(k)}</span><b>${t}</b><em>${a}</em></div>`).join('')}</div>
  <div class="skj-jar"><div class="skj-jw"><div class="tl-ground"></div>${jarViz({coins:3,name:'Coffee jar'},1)}</div><div class="skj-ct"><em>in the jar</em><b>$<span id="skjn">0</span></b></div></div></div>`;
(function(){const f=SCR.splash;if(!f)return;SCR.splash=p=>{const r=f(p);const m=r.mount;r.mount=el=>{if(m)m(el);const w=$('#skj',el);if(!w||w._on)return;w._on=1;const n=$('#skjn',w);const fit=()=>{const H=w.parentElement.clientHeight;w.style.setProperty('--sk',Math.max(.5,Math.min(1,(H-36)/400)).toFixed(2))};fit();setTimeout(fit,350);const tot=[6,20,42];let raf=0;
  const roll=(from,to)=>{cancelAnimationFrame(raf);const t0=performance.now();const st=t=>{const q=Math.min(1,(t-t0)/600),e=1-Math.pow(1-q,3);n.textContent=Math.round(from+(to-from)*e);if(q<1)raf=requestAnimationFrame(st)};raf=requestAnimationFrame(st)};
  const run=()=>{if(!document.contains(w))return;w.classList.remove('go','out');n.textContent='0';void w.offsetWidth;w.classList.add('go');
    tot.forEach((v,i)=>setTimeout(()=>{if(!document.contains(w))return;roll(i?tot[i-1]:0,v);const jr=$('.jr',w);jr.classList.remove('bump');void jr.offsetWidth;jr.classList.add('bump');haptic(6)},i*2400+1750));
    setTimeout(()=>{if(document.contains(w))w.classList.add('out')},9400);setTimeout(run,10100)};run()};return r}})();

/* ---------- Invite story, card one: an acorn is planted, then a time-lapse to the oak ---------- */
LV.alone=()=>`${ldGlow()}<div class="tlp" id="tl"><div class="tl-ground"></div><div class="tl-rays"></div>${STAGE_SLUG.map((s,i)=>`<img class="tl-s" data-i="${i}" src="${YART}stage-${s}.png" alt="" style="height:${Math.round(STAGE_H[i]*1.3)}px">`).join('')}<div class="tl-soil"></div><div class="tl-motes">${Array.from({length:9},(_,k)=>`<i style="left:${18+(k*23)%66}%;animation-delay:-${(k*.7).toFixed(1)}s;animation-duration:${(3+(k%3)).toFixed(1)}s"></i>`).join('')}</div><div class="tl-yrs" id="tlyr"><em>Week</em><b id="tlyn">1</b></div></div>`;
(function(){const f=SCR.splash;if(!f)return;SCR.splash=p=>{const r=f(p);const m=r.mount;r.mount=el=>{if(m)m(el);const tl=$('#tl',el);if(!tl||tl._on)return;tl._on=1;
  const imgs=$$('.tl-s',tl),yr=$('#tlyr',tl),yn=$('#tlyn',tl);const wk=[1,5,10,20,40,80,160,320];let k=0,raf=0;
  const roll=(from,to,ms)=>{cancelAnimationFrame(raf);const t0=performance.now();const st=t=>{const q=Math.min(1,(t-t0)/ms),e=1-Math.pow(1-q,3);yn.textContent=Math.round(from+(to-from)*e);if(q<1)raf=requestAnimationFrame(st)};raf=requestAnimationFrame(st)};
  const show=(i,prev)=>{imgs.forEach((im,j)=>{im.classList.toggle('on',j===i);im.classList.toggle('was',j===prev)});roll(wk[prev==null?0:prev],wk[i],700);tl.classList.toggle('big',i>=5)};
  const run=()=>{if(!document.contains(tl))return;k=0;tl.classList.remove('plant','big');imgs.forEach(im=>im.classList.remove('on','was'));yr.classList.remove('on');void tl.offsetWidth;
    tl.classList.add('plant');setTimeout(()=>{show(0,null);yr.classList.add('on')},850);
    const step=()=>{if(!document.contains(tl))return;const prev=k;k++;if(k>=imgs.length){setTimeout(run,3800);return}show(k,prev);setTimeout(step,k<3?820:k<6?760:1000)};setTimeout(step,1900)};
  run()};return r}})();

/* ---------- grove: every tree from the stage set ---------- */
gvTree=function(s){const g=s.g,id=s.g.id;const d=s.depth;const sc=.40+d*.52;const y=30+d*62;
  const base=`style="left:${s.x}%;top:${y}%;--sc:${sc.toFixed(2)};z-index:${Math.round(d*100)}"`;
  if(g.status!=='growing')return `<button class="gv-it ${GSEL===id?'sel':''}" id="gv-${id}" ${base} onclick="event.stopPropagation();gvSel('${id}')" aria-label="${nm(id)}, invite waiting"><div class="gv-seed"><img src="${stageSrc(0)}" alt=""></div><div class="gv-tag">${nm(id)} · waiting</div></button>`;
  const W=wk(id),i=stageIdx(W);const cue=g.open&&!S.watered[id];
  return `<button class="gv-it ${GSEL===id?'sel':''} ${g.open?'open':''}" id="gv-${id}" ${base} onclick="event.stopPropagation();gvSel('${id}')" aria-label="${nm(id)}, ${W} weeks${g.open?', has not invested yet this week':''}"><div class="sway" style="animation-delay:-${(s.x%7)}s"><img src="${stageSrc(i)}" style="height:${Math.round(STAGE_H[i]*1.1)}px" alt=""></div>${cue?`<span class="dropbadge gv-drop">${ic('drop',11,'color:#fff')}</span>`:''}<div class="gv-tag">${nm(id)}</div></button>`};
(function(){const f=SCR['gt-grove'];if(!f)return;SCR['gt-grove']=p=>{const r=f(p);const i=stageIdx(S.streak);
  r.html=r.html.replace(/(id="gv-me"[\s\S]*?<img )src="[^"]*" style="height:\d+px"/,`$1src="${stageSrc(i)}" style="height:${Math.round(STAGE_H[i]*1.25)}px"`);
  /* the ridge behind the grove: real trees, far and near, instead of blobs */
  const seeds=k=>((Math.sin(k*12.9898)*43758.5453)%1+1)%1;
  const row=(n,cls,top,h0,h1)=>`<div class="gv-tl ${cls}" style="top:${top}%">${Array.from({length:n},(_,k)=>{const x=-4+(k+seeds(k)*.8)*(108/n);const h=h0+seeds(k+7)*(h1-h0);const t=[5,6,6,7,5,6,7][k%7];return `<img src="${stageSrc(t)}" style="left:${x.toFixed(1)}%;height:${Math.round(h)}px;z-index:${Math.round(h)}" alt="">`}).join('')}</div>`;
  r.html=r.html.replace('<div class="gv-forest far"></div>',row(16,'far',4,44,66)+row(13,'mid',11,58,86)).replace('<div class="gv-forest mid"></div>','');
  return r}})();

/* the oak hero everywhere: the same eight stages */
(function(){const f=oakStage;oakStage=function(o){o=o||{};const w=o.weeks!==undefined?o.weeks:S.streak;const i=stageIdx(w);const H=o.h||300;const th=Math.round(Math.min(STAGE_H[i]*1.7,H*(i<2?.28:i<5?.48:.66)));
  return f(o).replace(/(<div class="sway"><img )src="[^"]*" style="height:\d+px"/,`$1src="${stageSrc(i)}" style="height:${th}px"`)}})();

/* ---------- Oak tab: stage seal, stat tiles, the achievements list ---------- */
(function(){const f=SCR['gt-oak'];if(!f)return;SCR['gt-oak']=p=>{const r=f(p);const w=S.streak,i=stageIdx(w),best=Math.max(w,S.best||8);
  const list=`<div class="sk-sec"><div class="h4">Achievements</div><span class="sm">${i+1}/${RSTAGES.length} complete</span></div>
   <div class="achv">${RSTAGES.map((r,k)=>{const on=k<=i;return `<div class="achv-r ${on?'on':''}">${on?sealImg(k,46):`<span class="achv-lk">${svgSeal({top:'',size:46,on:false})}</span>`}<div class="grow"><b>${r[1]}</b><em>${r[0]?`${r[0]} week streak`:'Your first week'}</em></div><span class="achv-ck">${on?ic('check',14,'color:#0a1d08'):''}</span></div>`}).join('')}</div>`;
  r.html=r.html.replace(/<div class="osbar mt16"><i style="width:(\d+)%"><\/i><\/div><div class="row between mt8">([\s\S]*?)<\/div>/,(m,pc,labs)=>{const nx=nextGoal(w);return `<div class="osbar2" style="margin-top:22px"><i style="width:${pc}%"></i><span class="os-pip" style="left:${pc}%">${ic2('flame',12)}</span></div><div class="row between os-labs" style="margin:14px 10px 0"><span class="sm">${w} week${w===1?'':'s'}</span><span class="sm">${nx[0]} weeks · ${nx[1]}</span></div>`});
  r.html=r.html.replace(/<div class="bento mt24">[\s\S]*?<\/div><\/div><\/div>/,`<div class="bento mt24"><div class="ostat tile"><span class="ost-ic">${ic2('flame',18)}</span><b>${w}</b><span>Current streak</span></div><div class="ostat tile"><span class="ost-ic">${sgGlyph('trophy',18,'#bceaa3')}</span><b>${best}</b><span>Best streak</span></div></div>${list}`);
  return r}})();

document.head.insertAdjacentHTML('beforeend',`<style>
/* seals */
.seal{display:block;filter:drop-shadow(0 6px 14px rgba(20,60,10,.18))}.seal.off{filter:none;opacity:.7}.seal-im{display:block;object-fit:contain}
.sl-cnt{font-size:12px;font-weight:700;color:#2f7a12;background:#e6f4dc;padding:4px 9px;border-radius:12px}
.sl-row{display:flex;gap:8px;margin:0 -16px;overflow-x:auto;scrollbar-width:none;padding:6px 16px 4px}.sl-row::-webkit-scrollbar{display:none}
.sl-it{flex:none;width:96px;display:flex;flex-direction:column;align-items:center;text-align:center;animation:slIn .5s cubic-bezier(.2,1.2,.3,1) both}.sl-it b{font-size:12px;margin-top:6px;color:#191919;line-height:1.15}.sl-it em{font-style:normal;font-size:11px;color:#6b706c;margin-top:2px}.sl-it:not(.on) b{color:#8a958c}
@keyframes slIn{from{opacity:0;transform:translateY(8px) scale(.94)}}
.sl-pop{filter:drop-shadow(0 20px 40px rgba(40,110,20,.35))}.sl-pop.pop{animation:sgxPop .7s cubic-bezier(.2,1.5,.4,1) both}
/* milestone card in the Year story */
.yt-cel .yt-seal{margin-top:-6px;filter:drop-shadow(0 14px 24px rgba(40,110,20,.28))}
/* dark share card */
.dkc{position:relative;width:300px;height:340px;border-radius:18px;overflow:hidden;background:linear-gradient(180deg,#0e2a0c,#0a1d08);color:#fff;font-family:inherit;box-shadow:0 24px 50px rgba(0,0,0,.35)}
.dkc.tall{height:420px}
.dkc-top{position:absolute;left:0;right:0;top:0;z-index:3;display:flex;justify-content:space-between;align-items:center;padding:14px 16px;font-size:12px;color:rgba(255,255,255,.75)}
.dkc-lk{display:flex;align-items:center;gap:5px;font-weight:700;font-size:14px;letter-spacing:-.2px;color:#fff}.dkc-lk img{height:16px}
.dkc-stage{position:absolute;left:0;right:0;top:0;height:72%}.dkc-stage>div:first-child{opacity:.95}
.dkc-glow{position:absolute;left:50%;top:54%;width:220px;height:220px;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(closest-side,rgba(116,201,71,.42),rgba(116,201,71,.12) 55%,transparent)}
.dkc-ring{position:absolute;left:50%;top:54%;transform:translate(-50%,-50%);display:flex;align-items:center;justify-content:center;width:168px;height:168px;border-radius:50%;box-shadow:0 0 0 2px rgba(116,201,71,.55),0 0 40px rgba(116,201,71,.35),inset 0 0 30px rgba(116,201,71,.2)}
.dkc-ring .seal-im,.dkc-ring .seal{filter:drop-shadow(0 12px 24px rgba(0,0,0,.45))}
.dkc-pair{display:flex;align-items:flex-end;gap:12px;transform:translateY(16px)}.dkc-pair img{filter:drop-shadow(0 10px 14px rgba(0,0,0,.45))}
.dkc-pct{text-align:center}.dkc-pct b{display:block;font-size:46px;font-weight:700;letter-spacing:-1.5px;line-height:1}.dkc-pct em{display:block;font-style:normal;font-size:12px;color:rgba(255,255,255,.7);margin-top:4px}
.dkc-txt{position:absolute;left:0;right:0;bottom:0;padding:0 16px 20px;text-align:center}.dkc-txt b{display:block;font-size:22px;font-weight:700;letter-spacing:-.3px}.dkc-txt em{display:block;font-style:normal;font-size:13px;color:rgba(255,255,255,.72);margin-top:4px}
/* share your progress */
.sheet.ps{padding:10px 20px calc(var(--safeBot) + 16px)}
.ps-h{display:flex;align-items:flex-start;justify-content:space-between;margin-top:4px}.ps-h b{display:block;font-size:20px;letter-spacing:-.3px;color:#191919}.ps-h em{display:block;font-style:normal;font-size:13px;color:#6b706c;margin-top:3px}
.ps-card{display:flex;justify-content:center;margin:16px 0 18px}.ps-in{transform:scale(.86);transform-origin:50% 0;margin-bottom:calc(-340px * .14)}.ps-in:has(.ycf){transform:scale(.6);margin-bottom:calc(-533px * .4)}
.ps-acts{display:flex;gap:10px}.ps-acts button{flex:1;display:flex;flex-direction:column;align-items:center;gap:8px;padding:12px 4px 10px;border-radius:18px;background:#f4f6f1;color:#191919;font-size:12px;font-weight:600}.ps-acts button span{width:44px;height:44px;border-radius:22px;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 1px 0 rgba(0,0,0,.06)}
/* the coffee jar */
.skj{position:absolute;left:0;right:0;bottom:14%;height:400px;transform:scale(var(--sk,1));transform-origin:50% 100%;pointer-events:none;transition:opacity .6s}.skj.out{opacity:0}
.skj-jw{position:relative;width:184px;height:220px}.skj-jw .jr{position:absolute;left:0;bottom:0;transform:scale(1.1);transform-origin:50% 100%;margin:0 8px}.skj-jw .tl-ground{width:300px;height:80px;bottom:-30px}
.skj-jar{position:absolute;left:50%;bottom:0;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;z-index:2}
.skj-jar .jr{filter:drop-shadow(0 24px 30px rgba(0,0,0,.45))}.skj-jar .jr-tag{display:none}
.skj-jar .jr.bump{animation:skjBump .5s cubic-bezier(.3,1.6,.5,1)}@keyframes skjBump{0%{transform:scale(1.1)}40%{transform:translateY(5px) scale(1.14,1.06)}100%{transform:scale(1.1)}}
.skj-jar .jr-in img{opacity:0;width:30%}
.skj.go .jr-lid{animation:skjLid 7.2s linear both}
@keyframes skjLid{0%,17%{transform:none}21%{transform:translateY(-16px) rotate(-7deg)}31%{transform:translateY(-16px) rotate(-7deg)}36%,51%{transform:none}55%{transform:translateY(-16px) rotate(-7deg)}65%{transform:translateY(-16px) rotate(-7deg)}70%,84%{transform:none}88%{transform:translateY(-16px) rotate(-7deg)}97%{transform:translateY(-16px) rotate(-7deg)}100%{transform:none}}
.skj.go .jr-in img:nth-child(1){animation:skjDrop .8s 1.5s cubic-bezier(.4,0,.6,1.35) both}
.skj.go .jr-in img:nth-child(2){animation:skjDrop .8s 3.9s cubic-bezier(.4,0,.6,1.35) both}
.skj.go .jr-in img:nth-child(3){animation:skjDrop .8s 6.3s cubic-bezier(.4,0,.6,1.35) both}
@keyframes skjDrop{0%{opacity:1;transform:translateY(-170px) rotate(-30deg)}70%{opacity:1;transform:translateY(6px) rotate(6deg)}100%{opacity:1;transform:translateY(0)}}
.skj-ct{margin-top:18px;display:flex;align-items:baseline;gap:8px;padding:8px 16px;border-radius:18px;background:rgba(10,29,8,.6);box-shadow:inset 0 0 0 1px rgba(188,234,163,.25);color:#bceaa3;font-variant-numeric:tabular-nums}
.skj-ct em{font-style:normal;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase}.skj-ct b{font-size:20px;color:#fff}
.skj-items{position:absolute;left:0;right:0;top:0;height:46%;z-index:1}
.skj-it{position:absolute;left:50%;top:0;transform:translateX(-50%) translateY(14px);display:flex;align-items:center;gap:10px;width:230px;padding:11px 14px 11px 11px;border-radius:18px;background:#fff;color:#191919;box-shadow:0 16px 34px rgba(0,0,0,.35);opacity:0}
.skj-it b{flex:1;font-size:15px;font-weight:600;line-height:1.15;white-space:nowrap}.skj-it em{font-style:normal;font-size:14px;font-weight:700;color:#2f7a12}
.skj-ic{width:34px;height:34px;border-radius:17px;background:#eef3e8;display:flex;align-items:center;justify-content:center;flex:none}.skj-ic svg{width:18px;height:18px}
.skj.go .skj-it{animation:skjIt 2.4s calc(var(--i) * 2.4s + .2s) ease both}
@keyframes skjIt{0%{opacity:0;transform:translateX(-50%) translateY(14px) scale(.96)}12%{opacity:1;transform:translateX(-50%)}52%{opacity:1;transform:translateX(-50%)}68%{opacity:0;transform:translateX(-50%) translateY(120px) scale(.4)}100%{opacity:0;transform:translateX(-50%) translateY(120px) scale(.4)}}
/* polaroids: real photographs */
.pol-ph img{width:100%;height:100%;object-fit:cover;display:block}
/* time-lapse */
.tlp{position:absolute;left:0;right:0;bottom:22%;height:64%;pointer-events:none}
.tl-ground{position:absolute;left:50%;bottom:-26px;width:300px;height:80px;transform:translateX(-50%);border-radius:50%;background:radial-gradient(closest-side,rgba(116,201,71,.45),rgba(116,201,71,.12) 60%,transparent)}
.tl-rays{position:absolute;left:50%;bottom:0;width:360px;height:360px;transform:translateX(-50%);border-radius:50%;background:radial-gradient(closest-side,rgba(188,234,163,.16),transparent);opacity:0;transition:opacity 1.2s}.tlp.big .tl-rays{opacity:1}
.tl-s{position:absolute;left:50%;bottom:0;transform:translateX(-50%) scaleY(.88) scaleX(.96);transform-origin:50% 100%;opacity:0;transition:opacity .5s ease,transform .8s cubic-bezier(.2,1.1,.3,1);filter:drop-shadow(0 14px 16px rgba(0,0,0,.45))}
.tl-s.on{opacity:1;transform:translateX(-50%) scale(1)}.tl-s.was{opacity:0;transform:translateX(-50%) scale(1.04);transition-duration:.4s}
.tlp.plant .tl-s[data-i="0"].on{animation:tlDrop .9s cubic-bezier(.3,1.4,.4,1) both}
@keyframes tlDrop{0%{opacity:0;transform:translateX(-50%) translateY(-160px) rotate(-12deg)}60%{opacity:1;transform:translateX(-50%) translateY(8px) rotate(2deg)}100%{opacity:1;transform:translateX(-50%)}}
.tl-soil{position:absolute;left:50%;bottom:-4px;width:120px;height:26px;transform:translateX(-50%);border-radius:50%;background:radial-gradient(closest-side,rgba(60,40,20,.55),transparent);opacity:0}.tlp.plant .tl-soil{animation:tlSoil 1s .9s ease both}
@keyframes tlSoil{0%{opacity:0;transform:translateX(-50%) scale(.3)}40%{opacity:1}100%{opacity:0;transform:translateX(-50%) scale(1.7)}}
.tl-motes{position:absolute;inset:0;opacity:0;transition:opacity 1s}.tlp.big .tl-motes{opacity:1}.tl-motes i{position:absolute;bottom:10%;width:4px;height:4px;border-radius:2px;background:#d6f0c2;opacity:0;animation:tlMote 4s linear infinite}
@keyframes tlMote{0%{opacity:0;transform:translateY(0)}20%{opacity:.9}100%{opacity:0;transform:translateY(-240px) translateX(14px)}}
.tl-yrs{position:absolute;left:50%;bottom:-54px;transform:translateX(-50%);display:flex;align-items:baseline;gap:6px;padding:7px 14px;border-radius:16px;background:rgba(10,29,8,.6);box-shadow:inset 0 0 0 1px rgba(188,234,163,.25);color:#bceaa3;opacity:0;transition:opacity .5s;white-space:nowrap;font-variant-numeric:tabular-nums}.tl-yrs.on{opacity:1}
.tl-yrs em{font-style:normal;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase}.tl-yrs b{font-size:15px;font-weight:700;color:#fff;min-width:28px;text-align:left}
/* grove ridge */
.gv-tl{position:absolute;left:0;right:0;height:1px;pointer-events:none}.gv-tl img{position:absolute;bottom:0;transform:translateX(-50%);width:auto}
.gv-tl.far img{filter:brightness(.36) saturate(.55) blur(.4px)}.gv-tl.mid img{filter:brightness(.52) saturate(.7)}
/* oak tab */
.osbar2{position:relative;height:10px;border-radius:5px;background:rgba(255,255,255,.12);margin:0 10px}.osbar2 i{display:block;height:100%;border-radius:5px;background:linear-gradient(90deg,#4da62b,#8fd45f)}
.os-pip{position:absolute;top:50%;width:24px;height:24px;margin-left:-12px;transform:translateY(-50%);border-radius:12px;background:#bceaa3;color:#0a1d08;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 4px rgba(188,234,163,.25),0 4px 10px rgba(0,0,0,.4)}
.os-labs .sm{font-size:12px!important;font-weight:600;color:rgba(255,255,255,.6)!important}
.scr .body .eyebrow+.h1{margin-top:6px}
.ostat.tile{flex-direction:column;align-items:center;text-align:center;gap:6px;padding:16px 10px 14px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:20px}
.ost-ic{width:36px;height:36px;border-radius:18px;background:rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;color:#bceaa3}
.ostat.tile b{font-size:24px;letter-spacing:-.5px}.ostat.tile span:last-child{font-size:12px}
.achv{display:flex;flex-direction:column;margin-bottom:22px}.achv-r{display:flex;align-items:center;gap:14px;padding:10px 0;position:relative}.achv-r+.achv-r:before{content:"";position:absolute;left:22px;top:-18px;height:18px;border-left:1.5px dotted rgba(255,255,255,.22)}
.achv-r b{display:block;font-size:15px;color:#fff}.achv-r em{display:block;font-style:normal;font-size:12px;color:var(--sk-sub);margin-top:2px}.achv-r:not(.on) b{color:rgba(255,255,255,.55)}
.achv-lk{width:46px;height:46px;border-radius:23px;background:rgba(255,255,255,.06);display:flex;align-items:center;justify-content:center}.achv-lk .seal{width:46px;height:46px;opacity:.35}
.achv-ck{width:22px;height:22px;border-radius:11px;background:rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center}.achv-r.on .achv-ck{background:#74c947}
.achv-r .seal-im{filter:drop-shadow(0 4px 10px rgba(0,0,0,.4))}
/* quiz footer sits above the tab bar with air */
.scr.has-actabs .qz-foot{bottom:calc(var(--safeBot) + 80px)}.scr.has-actabs:has(>.qz-foot) .sg-body{bottom:calc(var(--safeBot) + 150px)!important}
.scr.has-actabs .sg-foot.sgx-two{bottom:calc(var(--safeBot) + 80px)}
</style>`);

/* ---------- Skip & Invest: the ☰ is the prototype menu everywhere. The extras live in the product. ---------- */
(function(){const f=SCR['ss-hub'];if(!f)return;SCR['ss-hub']=p=>{const r=f(p);const det=S.detect&&S.detect.on;const rules=(S.rules||[]).length;
  const row=(i,t,d,js)=>`<button class="ssx-row" onclick="${js}"><span class="ssx-ri">${ic(i,18)}</span><span class="grow"><b>${t}</b><em>${d}</em></span>${ic('chev',16,'opacity:.35')}</button>`;
  const setup=`<div class="sgx-card ssx-setup"><div class="sgx-ch"><div><b>Make skipping effortless</b><em>Optional. A tap always works on its own.</em></div></div>
   ${row('gear','Skip Rules',rules?`${rules} rule${rules===1?'':'s'} on · invest on check-in`:'Invest automatically when you check in “Skipped it”',"go('sr-intro')")}
   ${row('spark','Spot my skips',det?`On · ${S.detect.cats.join(', ')}`:'Off. We never read spending unless you turn this on',det?"go('ss-settings')":"go('ss-detect')")}
   ${row('bell','Reminders','A check-in on your lock screen. See one.',"T.lk=null;go('ss-lock')")}</div>`;
  const review=`<button class="ssx-review" onclick="go('ss-review')"><span class="ssx-ri cal">${ic('cal',18)}</span><span class="grow"><b>Sunday review</b><em>Count the week’s skips in one place</em></span>${ic('chev',16,'opacity:.4')}</button>`;
  r.html=r.html.replace(/<button class="iconbtn" onclick="ssMore\(\)"[^>]*>[\s\S]*?<\/button>/,`<span class="ssx-hr"><button class="iconbtn" onclick="go('ss-settings')" aria-label="Settings">${ic('gear',20)}</button><button class="iconbtn" onclick="protoMenu()" aria-label="Prototype menu">${ic('menu',22)}</button></span>`);
  r.html=r.html.replace('<button class="ssx-total"',setup+'<button class="ssx-total"');
  r.html=r.html.replace('<div class="sgx-card"><div class="sgx-ch"><div><b>Recent</b>',review+'<div class="sgx-card"><div class="sgx-ch"><div><b>Recent</b>');
  return r}})();
document.head.insertAdjacentHTML('beforeend',`<style>
.ssx-hr{display:flex;align-items:center;gap:0;margin-right:-6px}
.ssx-row{display:flex;align-items:center;gap:12px;width:100%;padding:12px 0;text-align:left;color:#191919}.ssx-row+.ssx-row{border-top:1px solid #f0f2ee}.ssx-row b{display:block;font-size:15px}.ssx-row em{display:block;font-style:normal;font-size:12px;color:#6b706c;margin-top:2px}
.ssx-ri{flex:none;width:38px;height:38px;border-radius:19px;background:#eef3e8;color:#2f7a12;display:flex;align-items:center;justify-content:center}.ssx-ri.cal{background:#e3f4d8}
.ssx-setup{margin-top:12px}.ssx-setup .sgx-ch{margin-bottom:2px}
.ssx-review{display:flex;align-items:center;gap:12px;width:100%;margin-top:12px;padding:12px 14px;border-radius:18px;background:#fff;text-align:left;color:#191919}.ssx-review b{display:block;font-size:15px}.ssx-review em{display:block;font-style:normal;font-size:12px;color:#6b706c;margin-top:2px}
</style>`);
