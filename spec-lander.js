/* =====================================================================
   Story Landers · the pattern from 2026 Registration Experiments (MM Onboarding, Variant 1).
   Beats: illustration up top, one line of a sentence that carries across beats, round arrow to advance,
   segmented progress, Skip intro. Ends on a "Welcome to …" lander with where it lives and one CTA.
   ===================================================================== */
const LV={
 forest:()=>`<div class="lv-forest">${hills({dark:1})}<div class="lv-glow"></div><img class="lv-c rise" src="${IMG.acorn}" style="height:86px;bottom:30%" alt=""></div>`,
 pair:(a,b)=>`<div class="lv-forest">${hills({dark:1})}<div class="lv-glow"></div><div class="lv-row"><img class="rise" src="${IMG[a||'seedling']}" style="height:110px" alt=""><img class="rise d2" src="${IMG[b||'oak']}" style="height:150px" alt=""></div></div>`,
 grove:()=>`<div class="lv-forest">${hills({dark:1})}<div class="lv-glow"></div><div class="lv-row" style="gap:6px">${[['seedling',78],['oak',120],['ancient',150],['oak',104],['acorn',52]].map(([k,h],i)=>`<img class="rise d${i}" src="${IMG[k]}" style="height:${h}px" alt="">`).join('')}</div></div>`,
 rain:()=>`<div class="lv-forest">${hills({dark:1})}<div class="lv-glow" style="background:radial-gradient(closest-side,rgba(77,161,239,.25),transparent)"></div><div class="lv-drops">${Array.from({length:16},(_,i)=>`<i style="left:${30+(i*37)%40}%;animation-delay:${(i%8)*.18}s"></i>`).join('')}</div><img class="lv-c" src="${IMG.ancient}" style="height:170px;bottom:29%;filter:saturate(.6) brightness(.85)" alt=""></div>`,
 weeks:()=>`<div class="lv-mid"><div class="lv-weeks">${Array.from({length:8},(_,i)=>`<i style="animation-delay:${i*.12}s">${ic('check',14)}</i>`).join('')}</div><div class="lv-pill rise d4">${ic('spark',14,'color:#74c947')} Counted for you, Mom and Sam</div></div>`,
 link:()=>`<div class="lv-mid"><div class="lv-phone rise"><div class="lv-bub">Saved you a spot in my grove. One small investment a week and we both grow.</div><div style="width:150px;margin:10px 0 0 auto">${ycFrame(storyCard({eyebrow:'Grow with me',title:`${S.me} saved you a spot.`,sub:'Pick your day too.'}),150).replace('class="ycf"','class="ycf" style="width:150px"')}</div></div></div>`,
 days:()=>`<div class="lv-mid"><div class="lv-days rise">${['M','T','W','T','F','S','S'].map((d,i)=>`<i class="${i===4?'on':''}">${d}</i>`).join('')}</div><div class="lv-row" style="position:relative;margin-top:30px;gap:40px"><img class="rise d2" src="${IMG.oak}" style="height:110px" alt=""><div class="lv-seed rise d4"><img src="${IMG.acorn}" alt=""></div></div></div>`,
 quiz:()=>`<div class="lv-mid">${['Every paycheck','Card swipes','I like to see it work'].map((t,i)=>`<div class="lv-q rise d${i*2}" style="transform:rotate(${[-4,3,-2][i]}deg)">${t}<span>${ic('check',14)}</span></div>`).join('')}</div>`,
 type:()=>`<div class="lv-mid"><div style="width:170px" class="rise">${ycFrame(yCard(4,{}),170)}</div></div>`,
 handoff:()=>`<div class="lv-mid"><div class="lv-shot rise"><img src="art/app-roundups.jpg" alt=""></div></div>`,
 coffee:()=>`<div class="lv-mid"><div class="lv-chip rise">Coffee · $6</div><div class="lv-arrow rise d2">${ic('chev',22,'transform:rotate(90deg)')}</div><img class="rise d4" src="${IMG.acorn}" style="height:80px" alt=""></div>`,
 jar:()=>`<div class="lv-mid"><div class="rise">${jarViz({name:'Coffee jar',coins:7},1)}</div></div>`,
 grow:()=>`<div class="lv-forest">${hills({dark:1})}<div class="lv-glow"></div><img class="lv-c rise" src="${IMG.seedling}" style="height:130px;bottom:30%" alt=""><div class="lv-pill rise d3" style="position:absolute;left:50%;transform:translateX(-50%);top:18%">${ringSvg(1,20)} This week counts</div></div>`,
 mm:()=>`<div class="lv-mid"><div class="lv-shot clover rise"><img src="art/app-money-manager.jpg" alt=""></div></div>`,
 flour:()=>`<div class="lv-forest">${hills({dark:1})}<div class="lv-glow"></div>${oakStage({h:520,flush:1,fl:['roots','nest'],weeks:24}).replace('class="os sk-hero"','class="os sk-hero" style="position:absolute;inset:0;height:100%!important"')}</div>`,
 note:()=>`<div class="lv-mid"><div class="lv-notes">${[['Grandma','For your first bike, and every adventure after.',-6],['Priya','Happy birthday, little one!',5],['Sam','Here’s to the long game.',-2]].map(([n,t,r],i)=>`<div class="lv-note rise d${i*2}" style="transform:rotate(${r}deg)"><p>${t}</p><b>${n}</b></div>`).join('')}</div></div>`,
 sapling:()=>`<div class="lv-forest">${hills({dark:1})}<div class="lv-glow"></div><div class="lv-row" style="gap:36px"><img class="rise" src="${IMG.oak}" style="height:140px" alt=""><div style="position:relative"><img class="rise d2" src="${IMG.seedling}" style="height:96px" alt="">${[0,1,2].map(i=>`<i class="leaf new" style="position:absolute;width:18px;height:18px;left:${10+i*22}px;top:-14px;animation-delay:${.6+i*.3}s"></i>`).join('')}</div></div></div>`,
 cards:()=>`<div class="lv-mid"><div class="lv-fan">${[0,1,3].map((k,i)=>`<div class="lv-fc rise d${i*2}" style="transform:rotate(${[-10,0,10][i]}deg) translateY(${[14,0,14][i]}px)">${ycFrame(yCard(k,{}),132)}</div>`).join('')}</div></div>`,
 ch:()=>`<div class="lv-mid">${[['No-delivery week','4 of 7 days'],['8 weeks side by side','4 of 8 weeks'],['Round-Ups month','12 of 30 days']].map(([t,s],i)=>`<div class="lv-q rise d${i*2}" style="justify-content:space-between;width:250px">${t}<em>${s}</em></div>`).join('')}</div>`,
 phone:()=>`<div class="lv-mid"><div class="lv-phone rise"><div class="lv-bub" style="margin-left:0;margin-right:auto;background:#e9e9eb;color:#191919">Jordan saved you a spot in her grove</div><div class="lv-bub" style="font-size:12px;opacity:.8">acorns.com/j/jordan</div></div></div>`,
 paths:()=>`<div class="lv-mid">${['Already on Acorns','New to Acorns','Signed out','Old link'].map((t,i)=>`<div class="lv-q rise d${i}" style="width:220px">${t}<span>${ic('chev',14)}</span></div>`).join('')}</div>`};
const LANDERS={
 grove:{name:'your grove',beats:[['forest','Habits are easier with company.'],['pair','Invite someone, and your trees grow side by side.'],['grove','You see each other’s weeks, never each other’s balances.'],['rain','If someone hasn’t invested yet, send a little rain as a nudge.'],['weeks','One investment counts for you and everyone you grow with.']],
  t:'Welcome to your grove',s:'Invite the people you want to grow with. You see each other’s trees and weeks. Nobody sees a balance.',where:'Lives in Streaks: the streak chip on Invest or the streak card in Profile, then Grove.',cta:'Open my grove'},
 invite:{name:'invites',beats:[['alone','Starting with money is hard, and harder when nobody around you talks about it.'],['pair','So bring someone. A little each week, side by side, is easier than a lot alone.'],['grove','You’ll see each other’s weeks, never each other’s money. There’s nothing to be embarrassed about here.'],['ivways','On an off week, send a little rain. Or a cheer. Or a dare: eight weeks, no skipping.'],['link','If you love someone, help them grow. Save them a spot.']],
  t:'Invite someone',s:'Growing money is easier with company. You see each other’s weeks, never a balance. Rewards follow the Referrals program.',where:'Lives in Profile → Invite friends, and any open spot in your grove.',cta:'Invite someone'},
 'money-type':{name:'Money Type',beats:[['forest','Not sure where to start?'],['quiz','Answer three quick questions.'],['type','We’ll match you with a first habit.'],['handoff','Then set it up in Recurring or Round-Ups®, tools you already have.']],
  t:'Find your money type',s:'Based on your habits only. It never changes your portfolio or risk.',where:'Right after sign-up, and a banner on Home.',cta:'Start'},
 'skip-and-stash':{name:'Skip and Stash',beats:[['coffee','Skipped coffee today?'],['jar','That’s $6 you didn’t spend.'],['skipinv','One tap, and it’s invested. This week counts.']],
  t:'Skip it, stash it',s:'Invest a skip right away, save skips in a jar, or do a Skip Week with friends. We never need to read your spending.',where:'Lives in a banner on Home, and in reminders you set.',cta:'Start stashing'},
 split:{name:'Shared goals',beats:[['mm','Money Manager already splits every paycheck for you.'],['goalpick','Now add a slice for a goal you share with someone.'],['goalways','Or add to it your way: a recurring transfer, or money anytime.'],['goalinvite','Not on Acorns yet? They join from your invite.'],['goalring','You both see progress as a percent, never each other’s dollars.']],
  t:'Shared goals',s:'Save for a trip or a first apartment with someone. Add a paycheck slice, a recurring transfer, or money anytime. You both see progress, never each other’s dollars.',where:'Lives in Money Manager, from the Money Hub tab. One small card explains it.',cta:'Start a shared goal'},
 'future-club':{name:'Future Club',beats:[['note','Family can write your kid notes to read when they’re older.'],['later','Each note stays sealed until a date you pick, like their 18th birthday.'],['sapling','Every note you approve adds a leaf to their sapling.']],
  t:'Future Club',s:'Notes from family, saved for your kid to read later. Family can add a gift to their Early account too.',where:'Lives on Home → Kids, on your kid’s Early account.',cta:'Start a club'},
 year:{name:'Acorns Year',beats:[['yrwin','Every milestone gets its moment. We celebrate each one with you.'],['yrrecap','Every month, a recap of how you showed up.'],['yrwrap','In December, it all adds up. Your Acorns Year, in seven cards.'],['yrpride','How many weeks you showed up. How consistent you were. Something to be proud of.'],['yrinvite','Show it off. Friends start their own from your link.']],
  t:'Your Acorns Year',s:'Milestones along the way, a recap every month, and in December seven cards about the year you showed up. Share any of it. Every card carries your link.',where:'Lives on Home in December, with a recap every month.',cta:'Watch my year'},
 challenges:{name:'Challenges',beats:[['forest','Some goals are easier together.'],['ch','Try a no-delivery week, or invest side by side for 8 weeks.'],['weeks','One investment counts toward every challenge you’re in.']],
  t:'Challenges',s:'Run as many as you like with anyone in your grove.',where:'Lives in Streaks → Challenges, and on any tree in your grove.',cta:'See challenges'},
 invited:{name:'invites',beats:[['phone','Sam gets Jordan’s invite.'],['paths','New or already on Acorns, the link takes Sam to the right step.'],['pair','After Sam’s first investment, their trees grow side by side.']],
  t:'Getting invited',s:'What Sam sees in every case: already on Acorns, brand new, signed out, an old link, or under 18.',where:'Starts from a text, a story or a QR code.',cta:'See every path'}};
def('splash',p=>{const k=p.k in LANDERS?p.k:'grove';const L=LANDERS[k],S0=SPL[k]||SPL.grove;const n=L.beats.length;const b=Math.min(p.b||0,n);const fin=b===n;
  const bars=`<div class="ld-bars">${Array.from({length:n},(_,i)=>`<i class="${i<b||fin?'on':''}"></i>`).join('')}</div>`;
  const top=`<div class="ld-top"><button class="iconbtn" onclick="${b>0&&!fin?`ldGo(${b-1})`:'back()'}" aria-label="${b>0&&!fin?'Previous':'Close'}" style="color:#fff">${ic(b>0&&!fin?'back':'close')}</button>${fin?'<div style="flex:1"></div>':bars}<button class="ld-skip" onclick="ldGo(${fin?0:n})">${fin?'Replay':'Skip intro'}</button></div>`;
  if(fin)return ldFinal(k,L,S0);
  const [v,line]=L.beats[b];return {cls:'dark ldr',html:`${top}<div class="ld-tap" onclick="ldGo(${b+1})"><div class="ld-art ${LD_MOCK.has(v)?'mock':''}" key="${b}">${LV[v]()}</div><div class="ld-line">${line}</div></div>
   <div class="ld-next"><button onclick="ldGo(${b+1})" aria-label="Next">${ic('back',20,'transform:rotate(180deg)')}</button></div>`,mount(){haptic(4)}}});
function ldThread(o){const lp=`<div class="ld-lp"><div class="ld-lp-img"><img src="${IMG.oak}" alt=""></div><div class="ld-lp-tx"><b>Join ${S.me}’s grove</b><span>acorns.com/j/${S.me.toLowerCase()}</span></div></div>`;
 return `${ldGlow()}<div class="lv-mid"><div class="ld-msg rise"><div class="ld-msg-hd"><span class="av-c" style="background:${o.c}">${o.who[0]}</span><div><b>${o.who}</b><em>Text message</em></div></div><div class="ld-msg-body ${o.in?'in':''}"><div class="lv-bub">${o.text}</div>${lp}<div class="ld-msg-meta">${o.in?'Just now':'Delivered'}</div></div></div></div>`}
const LD_MOCK=new Set(['ivways','yrwin','yrrecap','yrwrap','yrpride','yrinvite','goalways','goalinvite','skipinv','goalpick','goalsplit','goalring','payday','mmflow','mmnest','days','later','link','quiz','type','handoff','coffee','mm','note','cards','ch','phone','paths','weeks']);
function ldGo(b){const t=stack[stack.length-1];t.params=Object.assign({},t.params,{b});refresh()}
(function(){const st=document.createElement('style');st.textContent=`
.scr.ldr{background:#222a20!important}
.ld-top{display:flex;align-items:center;gap:10px;padding:var(--safeTop) 8px 0 4px;height:calc(var(--safeTop) + 52px);position:relative;z-index:5}
.ld-bars{flex:1;display:flex;gap:6px;padding:0 6px}.ld-bars i{flex:1;height:3px;border-radius:2px;background:rgba(255,255,255,.22);display:block;transition:background .3s}.ld-bars i.on{background:#fff}
.ld-skip{font-size:13px;font-weight:600;color:#fff;height:44px;padding:0 10px;white-space:nowrap}
.ld-tap{flex:1;display:flex;flex-direction:column;cursor:pointer;-webkit-user-select:none;user-select:none;min-height:0}
.ld-art{position:relative;height:56%;margin-top:-4px;overflow:hidden;animation:fadeIn .5s ease both}.ld-art.fin{height:34%;opacity:.9}
.ld-line{padding:22px 28px 0;text-align:center;font-size:27px;font-weight:600;line-height:1.24;letter-spacing:-.3px;color:#fff;animation:ldUp .55s cubic-bezier(.2,.9,.25,1) both}
@keyframes ldUp{from{opacity:0;transform:translateY(14px)}}
.ld-next{display:flex;justify-content:center;padding:0 0 calc(var(--safeBot) + 26px)}.ld-next button{width:52px;height:52px;border-radius:26px;background:rgba(255,255,255,.12);color:#fff;display:flex;align-items:center;justify-content:center}
.ld-fin{flex:1;padding:8px 28px 0;text-align:center;display:flex;flex-direction:column;align-items:center}
.ld-h{font-size:32px;font-weight:600;letter-spacing:-.5px;line-height:1.15;color:#fff;margin:0}.ld-s{font-size:15px;color:rgba(255,255,255,.75);line-height:1.45;margin:12px 0 0;max-width:320px}
.ld-info{margin-top:auto;margin-bottom:18px;width:100%;display:flex;gap:12px;align-items:flex-start;text-align:left;padding:14px 16px;border-radius:18px;border:1.5px dashed rgba(255,255,255,.22);color:#bceaa3}.ld-info b{display:block;color:#fff;font-size:14px}.ld-info span{display:block;font-size:13px;color:rgba(255,255,255,.7);margin-top:2px;line-height:1.4}
.lv-forest{position:absolute;inset:0}.lv-glow{position:absolute;left:15%;right:15%;top:18%;bottom:20%;border-radius:50%;background:radial-gradient(closest-side,rgba(188,234,163,.28),transparent)}
.lv-c{position:absolute;left:50%;transform:translateX(-50%);filter:drop-shadow(0 12px 14px rgba(0,0,0,.4))}
.lv-row{position:absolute;left:0;right:0;bottom:30%;display:flex;justify-content:center;align-items:flex-end;gap:20px}.lv-row img{filter:drop-shadow(0 10px 12px rgba(0,0,0,.4))}
.lv-drops i{position:absolute;top:8%;width:3px;height:16px;border-radius:2px;background:linear-gradient(#8cc4f7,rgba(140,196,247,0));animation:lvRain 1.4s linear infinite;z-index:2}@keyframes lvRain{from{transform:translateY(-30px);opacity:0}20%{opacity:1}to{transform:translateY(150px);opacity:0}}
.lv-mid{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:20px}
.lv-weeks{display:flex;gap:8px}.lv-weeks i{width:30px;height:30px;border-radius:9px;background:#74c947;color:#0a1d08;display:flex;align-items:center;justify-content:center;animation:orbIn .45s cubic-bezier(.3,1.6,.5,1) both}
.lv-pill{display:inline-flex;align-items:center;gap:8px;height:36px;padding:0 14px;border-radius:18px;background:rgba(255,255,255,.1);color:#fff;font-size:13px;font-weight:600;margin-top:10px}
.lv-phone{width:250px;padding:16px;border-radius:24px;background:#fff}.lv-bub{background:#1a8cff;color:#fff;border-radius:18px;padding:10px 12px;font-size:14px;line-height:1.35;margin-left:30px}.lv-bub+.lv-bub{margin-top:8px}
.lv-days{display:flex;gap:6px}.lv-days i{width:34px;height:40px;border-radius:10px;background:rgba(255,255,255,.1);color:#fff;font-style:normal;font-weight:600;font-size:13px;display:flex;align-items:center;justify-content:center}.lv-days i.on{background:#74c947;color:#0a1d08}
.lv-seed{width:64px;height:64px;border-radius:32px;border:2px dashed rgba(116,201,71,.7);display:flex;align-items:center;justify-content:center}.lv-seed img{height:34px}
.lv-q{display:flex;align-items:center;gap:12px;height:56px;padding:0 18px;border-radius:16px;background:#2f3a2c;border:1px solid rgba(116,201,71,.35);color:#fff;font-weight:600;font-size:15px}.lv-q span{width:24px;height:24px;border-radius:7px;background:#74c947;color:#0a1d08;display:flex;align-items:center;justify-content:center;margin-left:auto}.lv-q em{font-style:normal;font-size:12px;color:#bceaa3}
.lv-shot{width:220px;height:300px;border-radius:24px;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,.4)}.lv-shot img{width:100%;display:block}.lv-shot.clover img{margin-top:-30px}
.lv-chip{height:54px;padding:0 22px;border-radius:27px;background:#fff;color:#191919;font-weight:600;font-size:18px;display:flex;align-items:center}.lv-arrow{color:rgba(255,255,255,.6)}
.lv-notes{position:relative;width:240px;height:260px}.lv-note{position:absolute;left:0;right:0;background:#f9f8f1;color:#191919;border-radius:14px;padding:14px 16px;box-shadow:0 12px 24px rgba(0,0,0,.35)}.lv-note:nth-child(1){top:0}.lv-note:nth-child(2){top:84px}.lv-note:nth-child(3){top:168px}.lv-note p{margin:0;font-size:14px;line-height:1.4}.lv-note b{display:block;margin-top:6px;font-size:12px;color:#2f7a12}
.lv-fan{display:flex;align-items:center;justify-content:center}.lv-fc{margin:0 -22px}`;document.head.appendChild(st)})();

/* =================== Story Lander v2: full-bleed scenes, bigger subjects, text anchored low =================== */
function ldForest(o){o=o||{};let back='',front='',rays='';
  for(let i=0;i<11;i++){const x=(i*97+13)%420-10,w=10+(i*7)%14;back+=`<rect x="${x}" y="0" width="${w}" height="600" fill="url(#tb)" opacity="${.35+((i*13)%30)/100}"/>`}
  for(let i=0;i<7;i++){const x=(i*131+40)%430-20,w=22+(i*11)%22;front+=`<rect x="${x}" y="0" width="${w}" height="600" fill="url(#tf)"/>`}
  for(let i=0;i<4;i++){const x=90+i*70;rays+=`<polygon points="${x},0 ${x+26},0 ${x+90},600 ${x+30},600" fill="url(#ray)" opacity="${.18+i*.04}"/>`}
  return `<svg class="ldf" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>
   <linearGradient id="tb" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#3d5a33"/><stop offset="1" stop-color="#22331d"/></linearGradient>
   <linearGradient id="tf" x1="0" x2="1"><stop offset="0" stop-color="#0f1a0d"/><stop offset=".6" stop-color="#1b2a17"/><stop offset="1" stop-color="#0c150a"/></linearGradient>
   <linearGradient id="ray" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#e8ffd2" stop-opacity=".9"/><stop offset="1" stop-color="#e8ffd2" stop-opacity="0"/></linearGradient>
   <radialGradient id="lglow" cx=".5" cy=".55" r=".5"><stop offset="0" stop-color="#bdf08f" stop-opacity="${o.glow||.55}"/><stop offset="1" stop-color="#bdf08f" stop-opacity="0"/></radialGradient></defs>
   <rect width="400" height="600" fill="#1b2817"/><ellipse cx="200" cy="300" rx="230" ry="280" fill="url(#lglow)"/>${back}${rays}${front}
   <g fill="#0e170c">${Array.from({length:26},(_,i)=>`<ellipse cx="${(i*37)%420-10}" cy="${560+(i*13)%30}" rx="${30+(i*7)%26}" ry="${26+(i*5)%16}"/>`).join('')}</g></svg>
   <div class="ldf-flies">${Array.from({length:12},(_,i)=>`<i style="left:${6+(i*29)%88}%;top:${20+(i*17)%55}%;animation-delay:-${(i*.7).toFixed(1)}s"></i>`).join('')}</div>`}
function ldGlow(){return `<div class="ldg"><i style="left:-10%;top:-10%"></i><i style="right:-20%;top:30%;background:radial-gradient(closest-side,rgba(116,201,71,.35),transparent)"></i></div><div class="ldf-flies">${Array.from({length:10},(_,i)=>`<i style="left:${8+(i*31)%84}%;top:${12+(i*19)%70}%;animation-delay:-${(i*.6).toFixed(1)}s"></i>`).join('')}</div>`}
function ldHill(){return `<div class="ldh"></div>`}
Object.assign(LV,{
 forest:()=>`${ldForest()}<img class="ld-sub fl" src="${IMG.acorn}" style="height:150px;bottom:16%" alt="">`,
 pair:(a,b)=>`${ldForest({glow:.4})}${ldHill()}<div class="ld-row"><img class="rise" src="${IMG[a||'seedling']}" style="height:170px" alt=""><img class="rise d2" src="${IMG[b||'oak']}" style="height:250px" alt=""></div>`,
 grove:()=>`${ldForest({glow:.45})}${ldHill()}<div class="ld-row" style="gap:0">${[['seedling',110],['oak',190],['ancient',250],['oak',170],['acorn',70]].map(([k,h],i)=>`<img class="rise d${i}" src="${IMG[k]}" style="height:${h}px;margin:0 -10px" alt="">`).join('')}</div>`,
 rain:()=>`${ldForest({glow:.3})}${ldHill()}<div class="lv-drops">${Array.from({length:28},(_,i)=>`<i style="left:${18+(i*37)%64}%;animation-delay:${((i%10)*.14).toFixed(2)}s"></i>`).join('')}</div><img class="ld-sub" src="${IMG.ancient}" style="height:270px;bottom:13%;filter:saturate(.6) brightness(.85)" alt=""><div class="ld-badge" style="right:22%;top:30%">${ic('drop',22,'color:#fff')}</div>`,
 weeks:()=>`${ldGlow()}<div class="lv-mid"><div class="ld-ring">${ringSvg(1,120)}</div><div class="ld-weeks">${Array.from({length:8},(_,i)=>`<i style="animation-delay:${i*.12}s">${ic('check',16)}</i>`).join('')}</div><div class="ld-avs rise d4">${['me','mom','sam'].map(id=>av(id,'s')).join('')}<span>Counted for you, Mom and Sam</span></div></div>`,
 link:()=>ldThread({who:'Sam',c:'#2f7a12',text:'Want to grow with me? We each invest a little, once a week.'}),
 days:()=>`${ldGlow()}<div class="lv-mid"><div class="ld-dcard rise">${[[S.me,'#7a5af5',4,'Fridays'],['Sam','#2f7a12',0,'Mondays']].map(([n,c,d,l],k)=>`<div class="ld-drow ${k?'rise d3':''}"><div class="ld-dwho"><span style="background:${c}">${n[0]}</span><b>${k?n:'You'}</b><em>${l}</em></div><div class="ld-dpills">${['M','T','W','T','F','S','S'].map((x,i)=>`<i class="${i===d?'on':''}">${x}</i>`).join('')}</div></div>`).join('')}<div class="ld-dfoot">${ic('check',14)} Different days, same week</div></div></div>`,
 quiz:()=>`${ldGlow()}<div class="lv-mid" style="gap:14px">${[['Every paycheck','Same days, every time'],['Card swipes','Coffee, groceries, rides'],['I like to see it work','Show me it adding up']].map(([t,s],i)=>`<div class="ld-q rise d${i*2}" style="transform:rotate(${[-3,2,-1.5][i]}deg)"><div><b>${t}</b><span>${s}</span></div><i>${ic('check',16)}</i></div>`).join('')}</div>`,
 type:()=>`${ldGlow()}<div class="lv-mid"><div class="ld-card rise">${ycFrame(yCard(4,{}),232)}</div></div>`,
 handoff:()=>`${ldGlow()}<div class="lv-mid"><div class="ld-shot rise"><img src="art/app-roundups.jpg" alt=""></div><div class="ld-tagx rise d3">${ic('eye',14)} The Round-Ups® you already have</div></div>`,
 coffee:()=>`${ldGlow()}<div class="lv-mid"><div class="ld-coffee rise"><div class="ld-cup"><span></span></div><div><b>Coffee</b><em>$6 · skipped</em></div><i class="ld-strike"></i></div><div class="ld-fall"><img src="${IMG.acorn}" alt=""></div></div>`,
 jar:()=>`${ldForest({glow:.35})}${ldHill()}<div class="ld-sub" style="bottom:12%">${jarViz({name:'Coffee jar',coins:9},1).replace('width:168px;height:200px','width:210px;height:250px')}</div>`,
 grow:()=>`${ldForest({glow:.6})}${ldHill()}<img class="ld-sub rise" src="${IMG.seedling}" style="height:210px;bottom:13%" alt=""><div class="ld-chip2 rise d3">${ringSvg(1,22)} This week counts</div>`,
 mm:()=>`${ldGlow()}<div class="lv-mid"><div class="ld-shot tall clover rise"><img src="art/app-money-manager.jpg" alt=""></div></div>`,
 flour:()=>`${ldForest({glow:.4})}<div class="ld-stage">${oakStage({h:560,flush:1,fl:['roots','nest'],weeks:96})}</div>`,
 note:()=>`${ldGlow()}<div class="lv-mid"><div class="ld-notes2">${[['G','Grandma','For your first bike, and every adventure after.','#7a5af5',-2.5],['P','Priya','Happy birthday, little one!','#c2410c',1.8],['S','Sam','Here’s to the long game.','#2f7a12',-1.2]].map(([a,n,t,c,r],i)=>`<div class="ld-nw" style="transform:rotate(${r}deg)"><div class="ld-note2 rise d${i*2}"><p>${t}</p><div class="ld-nfrom"><span style="background:${c}">${a}</span><b>${n}</b><em>to Ava</em></div></div></div>`).join('')}</div></div>`,
 later:()=>`${ldGlow()}<div class="lv-mid"><div class="ld-env rise"><div class="ld-env-flap"></div><div class="ld-seal"><i class="leaf"></i></div><div class="ld-env-in"><div class="ld-env-eye">For Ava</div><div class="ld-env-t">Opens on her 18th birthday</div><div class="ld-env-av"><span style="background:#7a5af5">G</span><span style="background:#c2410c">P</span><span style="background:#2f7a12">S</span><em>3 notes from family</em></div></div></div></div>`,
 sapling:()=>`${ldForest({glow:.45})}${ldHill()}<div class="ld-row" style="gap:50px"><img class="rise" src="${IMG.oak}" style="height:220px" alt=""><div style="position:relative"><img class="rise d2" src="${IMG.seedling}" style="height:150px" alt="">${[0,1,2].map(i=>`<i class="leaf new" style="position:absolute;width:24px;height:24px;left:${8+i*30}px;top:-22px;animation-delay:${.6+i*.3}s"></i>`).join('')}</div></div>`,
 cards:()=>`${ldGlow()}<div class="lv-mid"><div class="lv-fan">${[0,1,3].map((k,i)=>`<div class="lv-fc rise d${i*2}" style="transform:rotate(${[-12,0,12][i]}deg) translateY(${[22,0,22][i]}px);z-index:${[1,3,2][i]}">${ycFrame(yCard(k,{}),170)}</div>`).join('')}</div></div>`,
 ch:()=>`${ldGlow()}<div class="lv-mid" style="gap:14px">${[['No-delivery week','4 of 7 days',57],['8 weeks side by side','4 of 8 weeks',50],['Round-Ups month','12 of 30 days',40]].map(([t,s,p],i)=>`<div class="ld-q rise d${i*2}"><div style="flex:1"><b>${t}</b><span>${s}</span><div class="ld-bar"><i style="width:${p}%"></i></div></div></div>`).join('')}</div>`,
 phone:()=>ldThread({who:S.me,c:'#7a5af5',in:1,text:'Saved you a spot in my grove. Want to grow with me?'}),
 paths:()=>`${ldGlow()}<div class="lv-mid" style="gap:10px">${[['Already on Acorns','Opens the app'],['New to Acorns','Sign up, then plant'],['Signed out','Sign in, then plant'],['Old link','A fresh spot']].map(([t,s],i)=>`<div class="ld-q rise d${i}"><div><b>${t}</b><span>${s}</span></div><i style="background:rgba(255,255,255,.12);color:#fff">${ic('chev',16)}</i></div>`).join('')}</div>`});
(function(){const st=document.createElement('style');st.textContent=`
.scr.ldr{background:#1b2817!important}
.ld-tap{position:absolute;inset:0;display:block}
.ld-top{position:absolute;left:0;right:0;top:0;background:linear-gradient(180deg,rgba(14,22,12,.7),transparent)}
.ld-art{position:absolute;left:0;right:0;top:0;height:70%;margin:0;overflow:hidden}
.ld-art::after{content:"";position:absolute;left:0;right:0;bottom:0;height:38%;background:linear-gradient(180deg,rgba(27,40,23,0),#1b2817);pointer-events:none;z-index:4}
.ld-art.fin{height:46%}
.ld-line{position:absolute;left:0;right:0;bottom:calc(var(--safeBot) + 118px);padding:0 30px;font-size:31px;line-height:1.2;z-index:5;text-wrap:balance}
.ld-next{position:absolute;left:0;right:0;bottom:0;z-index:6}
.ldf{position:absolute;inset:0;width:100%;height:100%}
.ldf-flies{position:absolute;inset:0;pointer-events:none;z-index:2}.ldf-flies i{position:absolute;width:5px;height:5px;border-radius:3px;background:#f2ffb8;box-shadow:0 0 10px 2px rgba(232,255,158,.8);animation:ffly 5s ease-in-out infinite}
.ldg{position:absolute;inset:0;background:radial-gradient(120% 70% at 50% 40%,#2d4426 0%,#1b2817 70%)}.ldg i{position:absolute;width:70%;height:60%;border-radius:50%;background:radial-gradient(closest-side,rgba(188,234,163,.25),transparent)}
.ldh{position:absolute;left:-30%;right:-30%;bottom:-40%;height:62%;border-radius:50%;background:radial-gradient(ellipse 50% 30% at 50% 6%,#6cc444 0%,#3f8e25 30%,#24561a 60%,#152d10 100%);box-shadow:inset 0 3px 0 rgba(188,234,163,.3);z-index:1}
.ld-sub{position:absolute;left:50%;transform:translateX(-50%);z-index:3;filter:drop-shadow(0 16px 18px rgba(0,0,0,.45))}.ld-sub.fl{animation:ldFloat 4s ease-in-out infinite}@keyframes ldFloat{50%{transform:translate(-50%,-10px)}}
.ld-row{position:absolute;left:0;right:0;bottom:13%;display:flex;justify-content:center;align-items:flex-end;gap:24px;z-index:3}.ld-row img{filter:drop-shadow(0 14px 16px rgba(0,0,0,.45))}
.ld-badge{position:absolute;width:44px;height:44px;border-radius:22px;background:#4da1ef;display:flex;align-items:center;justify-content:center;z-index:4;box-shadow:0 0 0 4px rgba(77,161,239,.25);animation:pulse 1.6s ease-in-out infinite}
.lv-drops{z-index:3}.lv-drops i{width:3px;height:22px}
.ld-ring{position:relative;margin-bottom:6px}
.ld-weeks{display:flex;gap:9px}.ld-weeks i{width:34px;height:34px;border-radius:10px;background:#74c947;color:#0a1d08;display:flex;align-items:center;justify-content:center;animation:orbIn .45s cubic-bezier(.3,1.6,.5,1) both}
.ld-avs{display:flex;align-items:center;margin-top:16px;height:40px;padding:0 14px 0 6px;border-radius:20px;background:rgba(255,255,255,.08)}.ld-avs .av{margin-right:-6px;box-shadow:0 0 0 2px #24361f}.ld-avs span{margin-left:14px;font-size:13px;font-weight:600;color:#fff}
.ld-phone{width:290px;padding:14px 16px 18px;border-radius:30px;background:#fff;box-shadow:0 24px 50px rgba(0,0,0,.45)}.ld-ph-top{display:flex;justify-content:center;margin-bottom:12px}.ld-ph-top span{width:70px;height:6px;border-radius:3px;background:#e3e3e3}
.ld-linkp{display:flex;gap:10px;align-items:center;margin-top:10px;background:#f1f1f3;border-radius:14px;padding:8px}.ld-linkp b{display:block;font-size:14px;color:#191919}.ld-linkp span{font-size:12px;color:#777}
.ld-days{position:absolute;left:0;right:0;top:22%;display:flex;justify-content:center;gap:7px;z-index:4}.ld-days i{width:40px;height:48px;border-radius:12px;background:rgba(255,255,255,.12);backdrop-filter:blur(6px);color:#fff;font-style:normal;font-weight:600;font-size:15px;display:flex;align-items:center;justify-content:center}.ld-days i.on{background:#74c947;color:#0a1d08}
.lv-seed.big{width:96px;height:96px;border-radius:48px;margin-bottom:6px}.lv-seed.big img{height:50px}
.ld-q{display:flex;align-items:center;gap:14px;width:310px;min-height:72px;padding:12px 18px;border-radius:20px;background:rgba(255,255,255,.08);border:1px solid rgba(116,201,71,.35);backdrop-filter:blur(8px);color:#fff;text-align:left}
.ld-q b{display:block;font-size:17px}.ld-q span{display:block;font-size:13px;color:rgba(255,255,255,.65);margin-top:2px}.ld-q i{width:28px;height:28px;border-radius:8px;background:#74c947;color:#0a1d08;display:flex;align-items:center;justify-content:center;margin-left:auto;flex-shrink:0}
.ld-bar{height:6px;border-radius:3px;background:rgba(255,255,255,.12);margin-top:10px;overflow:hidden}.ld-bar i{display:block;height:100%;width:0;border-radius:3px;background:#74c947;margin:0;animation:none}
.ld-card .yc,.lv-fc .yc{box-shadow:0 24px 50px rgba(0,0,0,.5)}
.ld-shot{width:260px;height:360px;border-radius:30px;overflow:hidden;box-shadow:0 24px 50px rgba(0,0,0,.5);border:5px solid #0f170d}.ld-shot img{width:100%;display:block}.ld-shot.tall{height:400px}.ld-shot.clover img{margin-top:-40px}
.ld-tagx{display:inline-flex;align-items:center;gap:6px;height:34px;padding:0 14px;border-radius:17px;background:rgba(255,255,255,.1);font-size:13px;font-weight:600;color:#fff;margin-top:4px}
.ld-coffee{position:relative;display:flex;align-items:center;gap:16px;width:280px;padding:18px 20px;border-radius:24px;background:#fff;color:#191919;box-shadow:0 24px 50px rgba(0,0,0,.45)}
.ld-coffee b{display:block;font-size:22px}.ld-coffee em{display:block;font-style:normal;font-size:14px;color:#5d655f;margin-top:2px}
.ld-cup{width:58px;height:58px;border-radius:16px;background:#f3e7da;display:flex;align-items:flex-end;justify-content:center;padding-bottom:12px;flex-shrink:0}.ld-cup span{width:28px;height:24px;border-radius:0 0 10px 10px;background:#8a6446;position:relative}.ld-cup span::after{content:"";position:absolute;right:-9px;top:4px;width:9px;height:11px;border:3px solid #8a6446;border-left:0;border-radius:0 8px 8px 0}
.ld-strike{position:absolute;left:92px;top:34px;height:3px;width:0;background:#d1492e;border-radius:2px;animation:ldStrike .5s .6s ease-out forwards}@keyframes ldStrike{to{width:76px}}
.ld-fall{margin-top:22px;animation:ldPop .7s 1s cubic-bezier(.3,1.6,.5,1) both}.ld-fall img{height:120px;filter:drop-shadow(0 14px 16px rgba(0,0,0,.45))}@keyframes ldPop{from{opacity:0;transform:translateY(-40px) scale(.4)}}
.ld-chip2{position:absolute;left:50%;top:24%;transform:translateX(-50%);z-index:4;display:inline-flex;align-items:center;gap:8px;height:42px;padding:0 16px 0 10px;border-radius:21px;background:rgba(10,29,8,.6);border:1px solid var(--sk-line);backdrop-filter:blur(8px);color:#fff;font-weight:600;font-size:15px;white-space:nowrap}
.ld-stage{position:absolute;inset:0;z-index:2}.ld-stage .os{height:100%!important;background:none}.ld-stage .os>div:first-child{opacity:.0}
.ld-notes{position:relative;width:290px;height:330px}.ld-note{position:absolute;left:0;right:0;background:#f9f8f1;color:#191919;border-radius:18px;padding:16px 18px;box-shadow:0 18px 34px rgba(0,0,0,.4)}.ld-note:nth-child(1){top:0}.ld-note:nth-child(2){top:110px}.ld-note:nth-child(3){top:220px}.ld-note p{margin:0;font-size:16px;line-height:1.4}.ld-note b{font-size:13px;color:#2f7a12}
.lv-fan{margin-top:10px}.lv-fc{margin:0 -34px}`;document.head.appendChild(st)})();

/* Final lander screen, after the Streaks “Introducing” pattern: big word, plain explanation, a zoomed crop of where it lives */
const LF={grove:['Introducing','Grove','streak'],invite:['Introducing','Invites','refer'],'money-type':['Introducing','Money Type','banner'],'skip-and-stash':['Introducing','Skip & Stash','banner'],
 split:['New in Money Manager','Shared goals','mm'],'future-club':['Introducing','Future Club','kids'],year:['Introducing','Acorns Year','banner'],challenges:['Introducing','Challenges','tabs'],invited:['When a friend invites you','Invites','link']};
const LF_BN={'money-type':['Find your money type','Not sure where to start? <g>Take a 1-minute quiz</g>','seedling'],'skip-and-stash':['Skip and stash','Skipped a coffee today? <g>Invest what you saved</g>','roundup'],year:['Acorns Year','Your 2026 <g>is ready to watch</g>','later']};
function lfCrop(k,kind){const ph=(inner,cls)=>`<div class="lf-ph ${cls||''}">${inner}</div>`;
 const row=(ic0,t)=>`<div class="lf-row"><span>${ic0}</span><b>${t}</b><i></i></div>`;
 if(kind==='streak')return ph(`<div class="lf-band"></div>${row(ic2('bars',18),'Invest')}<div class="lf-gap"></div>${row(ic2('sun',18),'Later')}${row(ic('card',18),'Checking')}`)+`<div class="lf-pop lf-chip">${ic2('flame',26)}${plw(S.streak)}</div>`;
 if(kind==='refer')return ph(`<div style="height:22px"></div>${row(ic2('bell2',18),'Message Center')}<div class="lf-gap"></div>${row(ic2('gift',18),'Benefits')}${row(ic2('gear2',18),'Settings')}`)+`<div class="lf-pop lf-ref"><span>${ic2('uplus',22)}</span><b>Invite friends</b><em>Get $500</em></div>`;
 if(kind==='banner'){const B=LF_BN[k];return ph(`<div class="lf-hero"></div>`,'g')+`<div class="lf-pop lf-bn"><span><img src="${IMG[B[2]]}" alt=""></span><div><em>${B[0]}</em><b>${B[1]}</b></div></div>`}
 if(kind==='kids')return ph(`<div class="lf-hero"><div class="lf-yk"><b>You</b></div></div>`,'g')+`<div class="lf-pop lf-kids"><b>Kids</b><span>${ic('chev',16)}</span></div>`;
 if(kind==='mm')return ph(`<div class="lf-mmbg"></div>`,'mmg')+`<div class="lf-pop lf-mm"><span><img src="${IMG.oak}" alt=""></span><div><em>Grow Together</em><b>Your Investing slice now grows your oak</b></div></div>`;
 if(kind==='tabs')return ph(`<div class="lf-dk"></div>`,'dk')+`<div class="lf-pop lf-tabs"><i>Streak</i><i>Grove</i><i class="on">Challenges</i></div>`;
 return ph(`<div style="height:24px"></div><div class="lf-bub">Saved you a spot in my grove.</div>`,'msg')+`<div class="lf-pop lf-link"><span><img src="${IMG.oak}" alt=""></span><div><b>Join ${S.me}’s grove</b><em>acorns.com/j/${S.me.toLowerCase()}</em></div></div>`}
const LFX={
 grove:['gt-grove',{},'Invite the people you want to grow with. Your trees sit side by side, you each see the other’s weekly streak, and you can send a nudge when someone hasn’t invested yet. Nobody sees a balance.',()=>`<div class="lx lx-card"><span class="lx-drop">${ic('drop',18)}</span><div><b>Mom hasn’t invested yet</b><em>Send a little rain as a nudge</em></div></div>`],
 invite:['inv-pick',{},'Pick someone you’d like to grow with, and a day you’ll both invest. You send it from your own phone. Their first investment plants a tree beside yours, and from then on, you cheer each other on.',()=>`<div class="lx lx-card"><span class="lx-av" style="background:#e8a45c">J</span><div><b>Jess Park</b><em>Invest on Fridays together</em></div><i class="lx-btn">Invite</i></div>`],
 'money-type':['mt2-reveal',{},'Answer three questions about how you get paid and how you spend. You get a money type and one habit to start, like Round-Ups® or $5 every Friday, set up with the tools you already have.',()=>`<div class="lx lx-card"><span class="lx-img"><img src="${IMG.roundup}" alt=""></span><div><em class="lx-k">Recommended for you</em><b>Round-Ups® on your card</b><em>Spare change, invested</em></div></div>`],
 'skip-and-stash':['jar',{id:'j1'},'Skipped coffee or takeout? Invest what you would have spent in one tap, drop skips in a jar to invest later, or do a 7-day Skip Week with friends.',()=>`<div class="lx lx-card"><div class="ld-cup" style="transform:scale(.75);margin:-6px"><span></span></div><div><b>Coffee · skipped</b><em>Invest the $6 you saved</em></div></div>`],
 split:['ac-mm',{},'Your Money Manager split doesn’t change. Each payday, the Investing slice counts as your investment for the week, so your streak keeps growing.',()=>`<div class="lx lx-card"><span class="lx-img"><img src="${IMG.oak}" alt=""></span><div><em class="lx-k">Grow Together</em><b>Your Investing slice now grows your oak</b></div></div>`],
 'future-club':['sap-home',{},'Family writes notes for your kid to read when they’re older. You approve each one, and every approved note adds a leaf to their sapling.',()=>`<div class="lx lx-note"><p>For your first bike, and every adventure after.</p><div><span style="background:#7a5af5">G</span><b>Grandma</b><em>to Ava</em></div></div>`],
 year:['journal',{},'Milestones as you hit them, a recap every month, and in December your Acorns Year: seven cards about the year you showed up, like how many weeks you invested, how consistent you were and the trees in your grove. Share any of it. Friends who tap your link start their own.',()=>`<div class="lx lx-card"><span class="lx-img"><img src="${IMG.acorn}" alt=""></span><div><em class="lx-k">December</em><b>Your Acorns Year</b><em>Seven cards, ready to share</em></div></div>`],
 challenges:['gt-ch',{},'Start a challenge with people in your grove, like a no-delivery week or 8 weeks of investing side by side. One investment counts toward every challenge you’re in.',()=>`<div class="lx lx-ch"><b>8 weeks side by side</b>${[['J','#191919','You',4],['S','#2f7a12','Sam',4]].map(([a,c,n,v])=>`<div class="lx-pr"><span style="background:${c}">${a}</span><em>${n}</em><i><u style="width:${v/8*100}%"></u></i><small>${v}/8</small></div>`).join('')}</div>`],
 invited:['sam-web',{},'When Sam taps Jordan’s link, Acorns sends Sam to the right next step, whether Sam is new to Acorns, already a customer, or signed out.',()=>`<div class="lx lx-card"><span class="lx-img"><img src="${IMG.oak}" alt=""></span><div><b>Join ${S.me}’s grove</b><em>acorns.com/j/${S.me.toLowerCase()}</em></div></div>`]};
function lfShot(k){const x=LFX[k];if(!x||!SCR[x[0]])return '';const bS=JSON.stringify(S),bT=JSON.stringify(T);let r;
 try{jumpAhead();spInit();if(k==='split')S.sg={name:'Lisbon trip',who:'sam',slice:5,pct:62,joined:true,ways:{pay:true,any:true}};r=SCR[x[0]](x[1])}catch(e){r=null}finally{Object.keys(S).forEach(q=>delete S[q]);Object.assign(S,JSON.parse(bS));T=JSON.parse(bT)}
 if(!r)return '';return `<div class="lf-ph2"><div class="lf-scrw"><div class="scr ${r.cls||''}" aria-hidden="true">${r.html}</div></div></div>${x[3]()}`}
function ldFinal(k,L,S0){const f=LF[k]||LF.grove;const w=f[1];const fs=w.length<=7?70:w.length<=10?58:w.length<=12?50:44;const X=LFX[k];
 return {cls:'lt lfin',html:`<div class="lf-top"><button class="iconbtn" style="color:#191919" onclick="back()" aria-label="Close">${ic('close',24)}</button><button class="lf-replay" onclick="ldGo(0)">Replay</button></div>
  <div class="lf-body"><div class="lf-eye">${f[0]}</div><div class="lf-word" style="font-size:${fs}px">${w}</div><p class="lf-p">${X?X[2]:L.s}</p>
   <div class="lf-crop">${X?lfShot(k):lfCrop(k,f[2])}</div>
   <p class="lf-where">${L.where}</p></div>
  <div class="lf-foot"><button class="btn lf-cta" onclick="(function(){${S0.go.replace(/"/g,'&quot;')}})()">${L.cta}</button></div>`}}
document.head.insertAdjacentHTML('beforeend',`<style>
.scr.lfin{background:linear-gradient(180deg,#b9e3a0 0%,#dff2d3 38%,#f3f6f1 70%)!important}
.lf-top{display:flex;align-items:center;justify-content:space-between;padding:calc(var(--safeTop) + 6px) 12px 0 8px}
.lf-replay{height:40px;padding:0 10px;font-size:14px;font-weight:600;color:#2f5c1a}
.lf-body{position:absolute;left:0;right:0;top:calc(var(--safeTop) + 58px);bottom:calc(var(--safeBot) + 92px);display:flex;flex-direction:column;align-items:center;padding:0 28px;overflow:hidden}
.lf-eye{font-size:12px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#191919}
.lf-word{margin-top:6px;font-weight:700;letter-spacing:-.03em;line-height:1.02;text-align:center;background:linear-gradient(180deg,#3d9a1f 0%,#7cc35a 70%,#b6e39c 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.lf-p{margin:14px 0 0;text-align:center;font-size:16px;line-height:1.45;color:#2a2f2b;max-width:330px}
.lf-crop{position:relative;flex:1;width:calc(100% + 56px);margin-top:22px;min-height:200px;max-height:400px}
.lf-ph{position:absolute;left:30%;right:-20px;top:0;bottom:0;background:#fff;border-left:8px solid #1c2a19;border-top:8px solid #1c2a19;border-radius:38px 0 0 0;overflow:hidden;-webkit-mask:linear-gradient(180deg,#000 70%,transparent);mask:linear-gradient(180deg,#000 70%,transparent)}
.lf-ph.g{background:linear-gradient(180deg,#5fb83a,#3d9a1f)}.lf-ph.dk{background:#0b1f09}.lf-ph.mmg{background:linear-gradient(#c9ecd0,#f4f4f4)}.lf-ph.msg{background:#f7f7f8}
.lf-band{height:56px;background:linear-gradient(180deg,#3d9a1f,#4fae2c)}
.lf-row{display:flex;align-items:center;gap:10px;padding:16px 18px;border-bottom:1px solid #eef0ec}.lf-row span{color:#191919;display:flex}.lf-row b{font-size:15px;font-weight:600;color:#191919}.lf-row i{margin-left:auto;width:70px;height:14px;border-radius:7px;background:#eef0ec}
.lf-gap{height:62px}
.lf-hero{height:100%;background:radial-gradient(circle at 80% 30%,rgba(255,255,255,.45),transparent 55%)}
.lf-yk{padding:22px 20px;color:#fff;font-size:16px}
.lf-dk{height:100%;background:radial-gradient(circle at 70% 20%,rgba(116,201,71,.25),transparent 60%)}
.lf-mmbg{height:100%}
.lf-bub{margin:0 18px 0 auto;max-width:200px;padding:10px 14px;border-radius:18px 18px 18px 4px;background:#e9e9eb;font-size:14px;color:#191919}
.lf-pop{position:absolute;left:8%;top:50%;transform:translateY(-50%);z-index:2;box-shadow:0 18px 40px rgba(20,60,10,.28);animation:lfPop .6s .15s cubic-bezier(.2,1.4,.4,1) both}
@keyframes lfPop{from{transform:translateY(-50%) scale(.7);opacity:0}}
.lf-chip{display:flex;align-items:center;gap:12px;height:76px;padding:0 30px 0 24px;border-radius:38px;background:linear-gradient(90deg,#5fb83a,#2f7a12);color:#fff;font-size:30px;font-weight:600;box-shadow:0 0 0 4px rgba(255,255,255,.6),0 18px 40px rgba(20,60,10,.3)}
.lf-ref{display:flex;align-items:center;gap:12px;height:72px;padding:0 16px 0 18px;border-radius:24px;background:#fff;color:#191919}.lf-ref b{font-size:19px;font-weight:600}.lf-ref em{font-style:normal;height:34px;padding:0 14px;border-radius:17px;background:#6944ff;color:#fff;font-size:15px;font-weight:600;display:flex;align-items:center;margin-left:14px}
.lf-bn,.lf-mm,.lf-link{display:flex;align-items:center;gap:12px;width:300px;padding:16px;border-radius:22px;text-align:left}
.lf-bn{background:linear-gradient(100deg,#1a2e16,#2e4428);color:#fff}.lf-bn span,.lf-mm span,.lf-link span{width:48px;height:48px;border-radius:24px;background:rgba(116,201,71,.2);display:flex;align-items:center;justify-content:center;flex:none;overflow:hidden}.lf-bn img{height:34px}
.lf-bn em,.lf-mm em{display:block;font-style:normal;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;opacity:.8}.lf-bn b,.lf-mm b{display:block;margin-top:4px;font-size:16px;line-height:1.3;font-weight:600}.lf-bn b g{color:#a6e27e}
.lf-mm{background:#fff;color:#191919}.lf-mm em{color:#2f7a12;opacity:1}.lf-mm span{border-radius:14px;background:linear-gradient(#e4f5d4,#c4e8a6);align-items:flex-end}.lf-mm img,.lf-link img{height:42px}
.lf-kids{display:flex;align-items:center;gap:10px;height:68px;padding:0 18px 0 28px;border-radius:34px;background:#fff;color:#2f7a12;font-size:26px;font-weight:600}
.lf-tabs{display:flex;gap:4px;padding:5px;border-radius:30px;background:#0b1f09;border:1px solid rgba(116,201,71,.35)}.lf-tabs i{font-style:normal;height:50px;padding:0 18px;border-radius:25px;display:flex;align-items:center;font-size:17px;font-weight:600;color:rgba(255,255,255,.7)}.lf-tabs i.on{background:#74c947;color:#0a1d08}
.lf-link{background:#fff;color:#191919}.lf-link span{border-radius:12px;background:linear-gradient(#cfeab0,#8fcf5b);align-items:flex-end}.lf-link b{display:block;font-size:16px}.lf-link em{display:block;font-style:normal;font-size:13px;color:#6b6b6b;margin-top:2px}
.lf-where{margin:10px 0 0;text-align:center;font-size:12px;line-height:1.4;color:#6b706c;max-width:320px}
.lf-foot{position:absolute;left:20px;right:20px;bottom:calc(var(--safeBot) + 18px)}
.lf-cta{width:100%;height:56px;border-radius:28px;background:#74c947;color:#0a1d08;font-size:17px;font-weight:600}
</style>`);

document.head.insertAdjacentHTML('beforeend',`<style>
.lf-ph2{position:absolute;left:26%;top:0;bottom:0;width:300px;border-left:8px solid #1c2a19;border-top:8px solid #1c2a19;border-radius:40px 0 0 0;overflow:hidden;background:#fff;-webkit-mask:linear-gradient(180deg,#000 72%,transparent);mask:linear-gradient(180deg,#000 72%,transparent);pointer-events:none}
.lf-scrw{width:402px;height:874px;transform:scale(.73);transform-origin:0 0;position:relative}
.lf-scrw>.scr{position:absolute;inset:0;--safeTop:44px;--safeBot:20px}
.lf-scrw .rise,.lf-scrw [class*="rise"]{animation:none!important;opacity:1!important;transform:none}
.lx{position:absolute;left:6%;bottom:4%;z-index:3;width:268px;border-radius:22px;background:#fff;color:#191919;box-shadow:0 20px 44px rgba(20,60,10,.30);animation:lfPop .6s .2s cubic-bezier(.2,1.4,.4,1) both;text-align:left}
@keyframes lfPop{from{transform:scale(.7);opacity:0}}
.lx-card{display:flex;align-items:center;gap:12px;padding:14px 16px}.lx-card b{display:block;font-size:16px;line-height:1.25}.lx-card em{display:block;font-style:normal;font-size:13px;color:#6b6b6b;margin-top:2px}.lx-card em.lx-k{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#2f7a12;margin:0 0 3px}
.lx-drop{width:44px;height:44px;border-radius:22px;background:#4da1ef;color:#fff;display:flex;align-items:center;justify-content:center;flex:none}
.lx-av{width:44px;height:44px;border-radius:22px;color:#fff;font-weight:700;display:flex;align-items:center;justify-content:center;flex:none}
.lx-btn{margin-left:auto;font-style:normal;height:34px;padding:0 14px;border-radius:17px;background:#74c947;color:#0a1d08;font-size:14px;font-weight:600;display:flex;align-items:center}
.lx-img{width:48px;height:48px;border-radius:14px;background:linear-gradient(#e4f5d4,#c4e8a6);display:flex;align-items:flex-end;justify-content:center;overflow:hidden;flex:none}.lx-img img{height:42px}
.lx-big{font-size:40px;font-weight:700;color:#2f7a12;letter-spacing:-1px;line-height:1}
.lx-note{padding:16px 18px;background:#fbfaf4;transform:rotate(-2deg)}.lx-note p{margin:0;font-size:16px;line-height:1.4;font-weight:500}.lx-note div{display:flex;align-items:center;gap:8px;margin-top:10px}.lx-note span{width:24px;height:24px;border-radius:12px;color:#fff;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center}.lx-note b{font-size:13px}.lx-note em{font-style:normal;font-size:13px;color:#6b6b6b}
.lx-ch{padding:14px 16px}.lx-ch>b{display:block;font-size:16px;margin-bottom:8px}.lx-pr{display:flex;align-items:center;gap:8px;margin-top:8px}.lx-pr span{width:22px;height:22px;border-radius:11px;color:#fff;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center}.lx-pr em{font-style:normal;font-size:13px;width:34px}.lx-pr i{flex:1;height:8px;border-radius:4px;background:#eceeea;overflow:hidden}.lx-pr u{display:block;height:100%;background:#74c947;border-radius:4px}.lx-pr small{font-size:12px;color:#6b6b6b}
.lf-crop{min-height:210px!important}
</style>`);

Object.assign(LV,{
 payday:()=>`${ldGlow()}<div class="lv-mid"><div class="mf-note rise"><div class="mf-nh"><span class="mf-app"><img src="${IMG.acorn}" alt=""></span><b>Acorns</b><em>now</em></div><b class="mf-nt">Payday split done</b><div class="mf-rows">${[['Investing','5%','#2f9a1c'],['Saving','10%','#5dbb3a'],['Spending','85%','#1f7a12']].map(([n,p,c])=>`<div><i style="background:${c}"></i><span>${n}</span><em>${p}</em></div>`).join('')}</div><div class="mf-same">${ic('check',14)} Same split as always</div></div></div>`,
 mmflow:()=>`${ldGlow()}<div class="lv-mid"><div class="mf-flow">
   <div class="mf-leaf rise"><em>Investing</em><b>5%</b></div>
   <div class="mf-arrow rise d2">${ic('back',18,'transform:rotate(-90deg)')}</div>
   <div class="mf-week rise d3"><span>${ic('check',16)}</span><b>This week counts</b></div>
   <div class="mf-arrow rise d4">${ic('back',18,'transform:rotate(-90deg)')}</div>
   <div class="mf-chip rise d5">${ic2('flame',22)}${plw(S.streak+1)}</div></div></div>`,
 mmnest:()=>`${ldGlow()}<div class="lv-mid"><div class="mf-flow">
   <div class="mf-leaf sv rise"><em>Saving</em><b>10%</b></div>
   <div class="mf-arrow rise d2">${ic('back',18,'transform:rotate(-90deg)')}</div>
   <div class="mf-oak rise d3"><img class="t" src="${IMG.oak}" alt=""><span class="mf-nest"><img src="${IMG.moneybag}" alt=""></span><b>A nest on your oak</b><em>Friends see the nest, never the amount</em></div></div></div>`});
document.head.insertAdjacentHTML('beforeend',`<style>
.mf-note{width:300px;padding:14px 16px 16px;border-radius:24px;background:rgba(245,245,245,.96);color:#191919;box-shadow:0 24px 50px rgba(0,0,0,.45)}
.mf-nh{display:flex;align-items:center;gap:8px}.mf-app{width:26px;height:26px;border-radius:7px;background:#74c947;display:flex;align-items:center;justify-content:center}.mf-app img{height:18px}.mf-nh b{font-size:13px}.mf-nh em{margin-left:auto;font-style:normal;font-size:12px;color:#8e8e93}
.mf-nt{display:block;margin-top:10px;font-size:16px}
.mf-rows{margin-top:10px;display:flex;flex-direction:column;gap:8px}.mf-rows div{display:flex;align-items:center;gap:10px;font-size:14px}.mf-rows i{width:12px;height:12px;border-radius:4px 12px 4px 12px}.mf-rows em{margin-left:auto;font-style:normal;font-weight:600}
.mf-same{margin-top:12px;padding-top:10px;border-top:1px solid #e3e3e3;display:flex;align-items:center;gap:6px;font-size:13px;font-weight:600;color:#2f7a12}
.mf-flow{display:flex;flex-direction:column;align-items:center;gap:10px}
.mf-leaf{width:150px;height:118px;padding:16px 18px;border-radius:60px 14px 60px 14px;background:linear-gradient(135deg,#6dd040,#2f9a1c);color:#fff;display:flex;flex-direction:column;justify-content:flex-end;box-shadow:0 16px 34px rgba(0,0,0,.4)}.mf-leaf.sv{background:linear-gradient(135deg,#8ad85f,#4fae2c)}
.mf-leaf em{font-style:normal;font-size:14px;opacity:.9}.mf-leaf b{font-size:30px;font-weight:600;line-height:1.1}
.mf-arrow{color:rgba(255,255,255,.55)}
.mf-week{display:flex;align-items:center;gap:10px;height:52px;padding:0 20px 0 10px;border-radius:26px;background:#fff;color:#191919;font-size:16px;font-weight:600;box-shadow:0 12px 26px rgba(0,0,0,.35)}.mf-week span{width:32px;height:32px;border-radius:16px;background:#c9ecb3;color:#2f7a12;display:flex;align-items:center;justify-content:center}
.mf-chip{display:flex;align-items:center;gap:10px;height:58px;padding:0 26px 0 20px;border-radius:29px;background:linear-gradient(90deg,#5fb83a,#2f7a12);color:#fff;font-size:22px;font-weight:600;box-shadow:0 0 0 4px rgba(255,255,255,.18),0 16px 34px rgba(0,0,0,.4)}
.mf-oak{position:relative;width:260px;padding:16px 16px 18px;border-radius:24px;background:#fff;color:#191919;text-align:center;box-shadow:0 20px 44px rgba(0,0,0,.4)}.mf-oak .t{height:120px;display:block;margin:0 auto}
.mf-nest{position:absolute;left:58%;top:44px;width:44px;height:44px;border-radius:22px;background:#fff;box-shadow:0 0 0 3px #74c947,0 6px 14px rgba(0,0,0,.2);display:flex;align-items:center;justify-content:center;animation:pulse 1.6s ease-in-out infinite}.mf-nest img{height:28px}
.mf-oak b{display:block;margin-top:8px;font-size:16px}.mf-oak em{display:block;font-style:normal;font-size:13px;color:#6b6b6b;margin-top:2px}
</style>`);

/* ---------- Shared goals (Money Manager): standalone idea ---------- */
function sgIcon(sz){return `<svg width="${sz}" height="${sz}" viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="12" r="6.2" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="15" cy="12" r="6.2" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>`}
const SG_KINDS=[['Trip','Lisbon trip'],['Wedding','Our wedding'],['First apartment','First apartment'],['Car','New car'],['Something else','Our goal']];
function sgInit(){if(!T.sg)T.sg={kind:'Trip',name:'Lisbon trip',who:'sam',slice:5}}
function sgAv(id,sz){const c={me:'#191919',sam:'#2f7a12',mom:'#7a5af5',jess:'#e8a45c'}[id]||'#6b6b6b';const l=id==='me'?S.me[0]:nm(id)[0];return `<span class="sg-av" style="background:${c};width:${sz||32}px;height:${sz||32}px;font-size:${(sz||32)*.42}px">${l}</span>`}
def('sg-new',()=>{sgInit();const g=T.sg;
 return {cls:'lt sgs',html:`<div class="sg-top"><button class="iconbtn" onclick="back()" aria-label="Back">${ic('back',24)}</button><b>Shared goal</b><span style="width:44px"></span></div>
 <div class="sg-body"><h1 class="sg-h">What are you saving for together?</h1>
  <div class="sg-chips">${SG_KINDS.map(([k,n])=>`<button class="${g.kind===k?'on':''}" onclick="T.sg.kind='${k}';T.sg.name='${n}';refresh()">${k}</button>`).join('')}</div>
  <label class="sg-lbl">Name</label><input class="sg-inp" value="${g.name}" oninput="T.sg.name=this.value" aria-label="Goal name">
  <label class="sg-lbl">Who’s in with you?</label>
  <div class="sg-list">${[['sam','Sam Rivera','On Acorns'],['mom','Mom','On Acorns']].map(([id,n,sub])=>`<button class="sg-who ${g.who===id?'on':''}" onclick="T.sg.who='${id}';refresh()">${sgAv(id)}<span class="grow"><b>${n}</b><em>${sub}</em></span><i>${g.who===id?ic('check',14):''}</i></button>`).join('')}
   <button class="sg-who" onclick="go('splash',{k:'invite'})"><span class="sg-av add">${ic('plus',16)}</span><span class="grow"><b>Invite someone</b><em>They can join when they open Acorns</em></span>${ic('chev',16,'opacity:.4')}</button></div>
  <label class="sg-lbl">Your slice of each paycheck</label>
  <div class="sg-seg">${[2,5,10].map(v=>`<button class="${g.slice===v?'on':''}" onclick="T.sg.slice=${v};refresh()">${v}%</button>`).join('')}</div>
  <p class="sg-note">Comes out of your Spending slice. Your other slices stay the same. You can change it anytime.</p></div>
 <div class="sg-foot"><button class="btn sg-cta" onclick="go('sg-review')">Continue</button></div>`}});
def('sg-review',()=>{sgInit();const g=T.sg;const who=nm(g.who);
 const row=(k,v)=>`<div class="sg-r"><span>${k}</span><b>${v}</b></div>`;
 return {cls:'lt sgs',html:`<div class="sg-top"><button class="iconbtn" onclick="back()" aria-label="Back">${ic('back',24)}</button><b>Review</b><span style="width:44px"></span></div>
 <div class="sg-body"><h1 class="sg-h">${g.name||'Your goal'}, with ${who}</h1>
  <div class="sg-box">${row('Your slice',`${g.slice}% of each paycheck`)}${row('From','Your Money Manager split')}${row('Goes to','Your own Acorns account, set aside for this goal')}${row(`${who} sees`,'Progress together, as a percent')}${row(`${who} never sees`,'Your dollars or your balance')}</div>
  <p class="sg-note">${who} picks their own slice when they say yes. Each of you can leave the goal anytime and keep what you saved.</p>
  <p class="sg-note" style="margin-top:6px">Placeholder disclosure for the prototype.</p></div>
 <div class="sg-foot"><button class="btn sg-cta" onclick="S.sg=Object.assign({},T.sg,{pct:0,joined:false});save();replace('sg-home');toast('Invite sent to ${who}')">Start goal and invite ${who}</button></div>`}});
def('sg-home',()=>{const g=S.sg||{name:'Lisbon trip',who:'sam',slice:5,pct:62,joined:true};const who=nm(g.who);const p=g.pct||0;
 return {cls:'lt sgs',html:`<div class="sg-top"><button class="iconbtn" onclick="back()" aria-label="Back">${ic('back',24)}</button><b>Shared goal</b><span style="width:44px"></span></div>
 <div class="sg-body"><div class="sg-hero"><div class="sg-ring">${sgRing(p,180)}<div class="sg-rc"><b>${p}%</b><em>together</em></div></div><h1 class="sg-h c">${g.name}</h1>
  <div class="sg-pair">${sgAv('me',36)}${sgAv(g.who,36)}</div></div>
  <div class="sg-box">
   <div class="sg-m">${sgAv('me',30)}<span class="grow"><b>You</b><em>${g.slice}% of each paycheck</em></span><i class="ok">On track</i></div>
   <div class="sg-m">${sgAv(g.who,30)}<span class="grow"><b>${who}</b><em>${g.joined?'Their own slice, each payday':'Invite sent'}</em></span><i class="${g.joined?'ok':''}">${g.joined?'On track':'Waiting'}</i></div></div>
  <p class="sg-note">Percent of the goal you’ve saved together. Neither of you sees the other’s dollars.</p>
  <div class="sg-acts">${g.joined?`<button onclick="toast('Cheer sent to ${who}')">Cheer ${who}</button>`:`<button onclick="S.sg.joined=true;save();refresh();toast('${who} joined your goal')">Prototype: ${who} joins</button>`}<button onclick="S.sg.pct=Math.min(100,(S.sg.pct||0)+18);save();refresh();toast('Payday: both slices landed')">Prototype: payday</button></div></div>
 <div class="sg-foot"><button class="btn sg-cta ghost" onclick="T.sg=Object.assign({},S.sg);go('sg-new')">Edit my slice</button></div>`}});
function sgRing(p,sz){const r=sz/2-10,c=2*Math.PI*r;return `<svg width="${sz}" height="${sz}" viewBox="0 0 ${sz} ${sz}" aria-hidden="true"><circle cx="${sz/2}" cy="${sz/2}" r="${r}" fill="none" stroke="#e6eee0" stroke-width="14"/><circle cx="${sz/2}" cy="${sz/2}" r="${r}" fill="none" stroke="#74c947" stroke-width="14" stroke-linecap="round" stroke-dasharray="${c*p/100} ${c}" transform="rotate(-90 ${sz/2} ${sz/2})"/></svg>`}
Object.assign(LV,{
 goalpick:()=>`${ldGlow()}<div class="lv-mid"><div class="sg-lcard rise"><span class="sg-lic">${sgIcon(26)}</span><div class="grow"><em>New slice</em><b>Lisbon trip</b><span class="sg-pair sm">${sgAv('me',24)}${sgAv('sam',24)}<small>with Sam</small></span></div></div>
   <div class="sg-lrows rise d3">${[['Investing','5%','#2f9a1c'],['Saving','10%','#5dbb3a'],['Lisbon trip','5%','#a6e27e'],['Spending','80%','#1f7a12']].map(([n,v,c],i)=>`<div class="${i===2?'hi':''}"><i style="background:${c}"></i><span>${n}</span><em>${v}</em></div>`).join('')}</div></div>`,
 goalsplit:()=>`${ldGlow()}<div class="lv-mid"><div class="sg-two">${[['me','Your paycheck'],['sam','Sam’s paycheck']].map(([id,l],i)=>`<div class="sg-pc rise d${i*2}">${sgAv(id,34)}<b>${l}</b><span class="sg-sl">5% slice</span></div>`).join('')}</div>
   <div class="sg-arrows rise d3">${ic('back',18,'transform:rotate(-90deg)')}${ic('back',18,'transform:rotate(-90deg)')}</div>
   <div class="sg-goalpill rise d4">${sgIcon(20)} Lisbon trip</div></div>`,
 goalring:()=>`${ldGlow()}<div class="lv-mid"><div class="sg-lring rise"><div class="sg-ring">${sgRing(62,170)}<div class="sg-rc"><b>62%</b><em>together</em></div></div><b class="sg-lt">Lisbon trip</b><div class="sg-toast">${sgAv('sam',22)} Sam’s slice landed this payday</div></div></div>`,
 skipinv:()=>`${ldGlow()}<div class="lv-mid"><div class="mf-flow"><div class="ld-coffee rise"><div class="ld-cup"><span></span></div><div><b>Coffee</b><em>$6 · invested</em></div></div>
   <div class="mf-arrow rise d2">${ic('back',18,'transform:rotate(-90deg)')}</div><div class="mf-week rise d3"><span>${ic('check',16)}</span><b>This week counts</b></div>
   <div class="mf-arrow rise d4">${ic('back',18,'transform:rotate(-90deg)')}</div><div class="mf-chip rise d5">${ic2('flame',22)}${plw(S.streak+1)}</div></div></div>`});
LFX.split=['sg-home',{},'Save for a trip or a first apartment with someone. Add a paycheck slice, a recurring transfer, or money anytime. You both see progress, never each other’s dollars.',()=>`<div class="lx lx-card"><span class="lx-img" style="background:#eef7e6;align-items:center;color:#2f7a12">${sgIcon(26)}</span><div><b>Lisbon trip · 62%</b><em>Saving together with Sam</em></div></div>`];
/* Works with: each idea stands alone, and names how it plays with the others */
const LF_WITH={
 'money-type':[['skip-and-stash','Skip and Stash','Spenders get skip ideas that fit them'],['year','Acorns Year','Your type becomes one of your cards'],['invite','Invites','Share your type and compare']],
 'skip-and-stash':[['invite','Invites','Do a Skip Week with people you invite'],['year','Acorns Year','Your skips become a card'],['money-type','Money Type','Suggests what to skip']],
 'future-club':[['invite','Invites','Bring family in to write notes'],['year','Acorns Year','Notes show up in your year'],['split','Shared goals','Save for your kid with a partner']],
 year:[['money-type','Money Type','Adds your type card'],['skip-and-stash','Skip and Stash','Adds your skips card'],['split','Shared goals','Adds a card when you reach one']],
 invite:[['split','Shared goals','Save for something with them'],['skip-and-stash','Skip and Stash','Do a Skip Week together'],['year','Acorns Year','A card for your weeks side by side']],
 split:[['invite','Invites','Invite someone new to share a goal'],['future-club','Future Club','A goal for your kid'],['year','Acorns Year','A card when you reach it']],
 grove:[],challenges:[],invited:[]};
(function(){const f=ldFinal;ldFinal=function(k,L,S0){const r=f(k,L,S0);const w=LF_WITH[k]||[];if(!w.length)return r;
 const html=`<div class="lf-with"><div class="lf-wk">Works on its own. Even better with</div><div class="lf-wl">${w.map(([kk,t,d])=>`<button onclick="go('splash',{k:'${kk}'})"><b>${t}</b><em>${d}</em></button>`).join('')}</div></div>`;
 r.html=r.html.replace('<p class="lf-where">',html+'<p class="lf-where">');return r}})();
document.head.insertAdjacentHTML('beforeend',`<style>
.scr.sgs{background:#fff!important;color:#191919}
.sg-top{display:flex;align-items:center;justify-content:space-between;padding:calc(var(--safeTop) + 4px) 8px 0;height:calc(var(--safeTop) + 52px)}.sg-top b{font-size:16px}.sg-top .iconbtn{color:#191919}
.sg-body{position:absolute;left:0;right:0;top:calc(var(--safeTop) + 56px);bottom:calc(var(--safeBot) + 90px);overflow-y:auto;padding:6px 20px 20px}
.sg-h{margin:0;font-size:26px;line-height:1.2;font-weight:600}.sg-h.c{text-align:center;margin-top:12px;font-size:24px}
.sg-chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}.sg-chips button{height:38px;padding:0 16px;border-radius:19px;background:#f0f2ee;font-size:14px;font-weight:600;color:#191919}.sg-chips button.on{background:#74c947;color:#0a1d08}
.sg-lbl{display:block;margin-top:22px;font-size:14px;font-weight:600;color:#5d655f}
.sg-inp{width:100%;margin-top:8px;height:50px;padding:0 16px;border-radius:14px;border:1px solid #e1e5de;background:#f7f8f6;font:inherit;font-size:16px;color:#191919}
.sg-list{margin-top:8px;border-radius:16px;background:#f7f8f6;overflow:hidden}.sg-who{display:flex;align-items:center;gap:12px;width:100%;padding:12px 14px;text-align:left;border-bottom:1px solid #eceeea;color:#191919}.sg-who:last-child{border-bottom:0}
.sg-who b{display:block;font-size:15px}.sg-who em{display:block;font-style:normal;font-size:13px;color:#6b6b6b;margin-top:1px}.sg-who i{width:24px;height:24px;border-radius:12px;border:1.5px solid #cfd6ca;display:flex;align-items:center;justify-content:center;color:#fff}.sg-who.on i{background:#3d9a1f;border-color:#3d9a1f}
.sg-av{border-radius:50%;color:#fff;font-weight:700;display:inline-flex;align-items:center;justify-content:center;flex:none;box-shadow:0 0 0 2px #fff}.sg-av.add{width:32px;height:32px;background:#e8f5df;color:#2f7a12}
.sg-seg{display:flex;gap:4px;margin-top:8px;padding:4px;border-radius:16px;background:#f0f2ee}.sg-seg button{flex:1;height:44px;border-radius:12px;font-size:16px;font-weight:600;color:#191919}.sg-seg button.on{background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.08)}
.sg-note{margin:12px 0 0;font-size:13px;line-height:1.45;color:#6b6b6b}
.sg-box{margin-top:18px;padding:4px 16px;border-radius:18px;background:#f7f8f6}.sg-r{display:flex;justify-content:space-between;gap:14px;padding:13px 0;border-bottom:1px solid #eceeea;font-size:14px}.sg-r:last-child{border-bottom:0}.sg-r span{color:#6b6b6b;flex:none}.sg-r b{text-align:right;font-weight:600}
.sg-hero{display:flex;flex-direction:column;align-items:center;padding-top:6px}.sg-ring{position:relative;display:inline-flex}.sg-rc{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}.sg-rc b{font-size:40px;font-weight:700;letter-spacing:-1px;line-height:1}.sg-rc em{font-style:normal;font-size:13px;color:#6b6b6b;margin-top:4px}
.sg-pair{display:flex;justify-content:center;margin-top:10px}.sg-pair .sg-av+.sg-av{margin-left:-8px}.sg-pair.sm{justify-content:flex-start;align-items:center;margin-top:6px}.sg-pair small{margin-left:8px;font-size:13px;color:#6b6b6b}
.sg-m{display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid #eceeea}.sg-m:last-child{border-bottom:0}.sg-m b{display:block;font-size:15px}.sg-m em{display:block;font-style:normal;font-size:13px;color:#6b6b6b}.sg-m i{font-style:normal;font-size:12px;font-weight:600;height:26px;padding:0 10px;border-radius:13px;background:#f0f2ee;color:#6b6b6b;display:flex;align-items:center}.sg-m i.ok{background:#e3f4d8;color:#2f7a12}
.sg-acts{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}.sg-acts button{height:38px;padding:0 14px;border-radius:19px;background:#fdf3d3;color:#6b5310;font-size:13px;font-weight:600}.sg-acts button:first-child{background:#e3f4d8;color:#2f7a12}
.sg-foot{position:absolute;left:20px;right:20px;bottom:calc(var(--safeBot) + 18px)}.sg-cta{width:100%;height:56px;border-radius:28px;background:#74c947;color:#0a1d08;font-size:17px;font-weight:600}.sg-cta.ghost{background:#fff;box-shadow:inset 0 0 0 1.5px #d3d9cf}
.mm-card-ic.sg-ic{align-items:center;color:#2f7a12}
.sg-lcard{display:flex;align-items:center;gap:14px;width:290px;padding:16px;border-radius:22px;background:#fff;color:#191919;box-shadow:0 20px 44px rgba(0,0,0,.4)}.sg-lcard em{display:block;font-style:normal;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#2f7a12}.sg-lcard b{display:block;font-size:18px;margin-top:2px}
.sg-lic{width:52px;height:52px;border-radius:16px;background:#eef7e6;color:#2f7a12;display:flex;align-items:center;justify-content:center;flex:none}
.sg-lrows{margin-top:14px;width:290px;padding:12px 16px;border-radius:20px;background:rgba(255,255,255,.95);color:#191919;display:flex;flex-direction:column;gap:2px}.sg-lrows div{display:flex;align-items:center;gap:10px;font-size:14px;padding:6px 8px;border-radius:10px}.sg-lrows div.hi{background:#eaf7e0;font-weight:600}.sg-lrows i{width:12px;height:12px;border-radius:4px 12px 4px 12px}.sg-lrows em{margin-left:auto;font-style:normal;font-weight:600}
.sg-two{display:flex;gap:12px}.sg-pc{width:140px;padding:14px;border-radius:20px;background:#fff;color:#191919;display:flex;flex-direction:column;align-items:center;gap:8px;box-shadow:0 16px 34px rgba(0,0,0,.4)}.sg-pc b{font-size:14px}.sg-sl{height:28px;padding:0 12px;border-radius:14px;background:#e3f4d8;color:#2f7a12;font-size:13px;font-weight:600;display:flex;align-items:center}
.sg-arrows{display:flex;gap:100px;margin:10px 0;color:rgba(255,255,255,.55)}
.sg-goalpill{display:flex;align-items:center;gap:8px;height:54px;padding:0 22px;border-radius:27px;background:linear-gradient(90deg,#5fb83a,#2f7a12);color:#fff;font-size:18px;font-weight:600;box-shadow:0 16px 34px rgba(0,0,0,.4)}
.sg-lring{width:280px;padding:20px 16px 18px;border-radius:26px;background:#fff;color:#191919;display:flex;flex-direction:column;align-items:center;box-shadow:0 20px 44px rgba(0,0,0,.4)}.sg-lt{margin-top:10px;font-size:18px}
.sg-toast{margin-top:12px;display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:14px;background:#f0f6ec;font-size:13px;color:#2f4a26}
.lf-with{width:calc(100% + 16px);margin-top:12px}.lf-wk{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#5d655f;text-align:center}
.lf-wl{display:flex;gap:8px;margin-top:8px;overflow-x:auto;scrollbar-width:none;padding-bottom:2px}.lf-wl::-webkit-scrollbar{display:none}
.lf-wl button{flex:none;width:150px;padding:10px 12px;border-radius:14px;background:rgba(255,255,255,.85);border:1px solid #dbe6d3;text-align:left}.lf-wl b{display:block;font-size:13px;color:#191919}.lf-wl em{display:block;font-style:normal;font-size:12px;line-height:1.3;color:#6b706c;margin-top:2px}
</style>`);

/* Shared goals v2: three ways to add, and an invite that brings new people to Acorns */
const SG_WAYS=[['pay','Paycheck slice','A % of each paycheck, through Money Manager'],['rec','Recurring transfer','A set amount from your bank, weekly or monthly'],['any','Add money anytime','One-time, whenever you want']];
function sgInit(){if(!T.sg)T.sg={kind:'Trip',name:'Lisbon trip',who:'sam',slice:5,ways:{pay:true,rec:false,any:true},recAmt:25,recFreq:'Weekly'};if(!T.sg.ways)T.sg.ways={pay:true,rec:false,any:true}}
function sgWaysTxt(g){const w=g.ways||{pay:true};const o=[];if(w.pay)o.push(`${g.slice||5}% of each paycheck`);if(w.rec)o.push(`$${g.recAmt||25} ${String(g.recFreq||'Weekly').toLowerCase()}`);if(w.any)o.push('Anytime');return o.join(' · ')||'Anytime'}
def('sg-new',()=>{sgInit();const g=T.sg;const w=g.ways;
 const people=[['sam','Sam Rivera','On Acorns'],['mom','Mom','On Acorns'],['jess','Jess Park','Not on Acorns yet · gets a link to join']];
 return {cls:'lt sgs',html:`<div class="sg-top"><button class="iconbtn" onclick="back()" aria-label="Back">${ic('back',24)}</button><b>${g.edit?'Goal settings':'Shared goal'}</b><span style="width:44px"></span></div>
 <div class="sg-body"><h1 class="sg-h">${g.edit?'Change your goal':'What are you saving for together?'}</h1>
  <div class="sg-chips">${SG_KINDS.map(([k,n])=>`<button class="${g.kind===k?'on':''}" onclick="T.sg.kind='${k}';T.sg.name='${n}';refresh()">${k}</button>`).join('')}</div>
  <label class="sg-lbl">Name</label><input class="sg-inp" value="${g.name}" oninput="T.sg.name=this.value" aria-label="Goal name">
  ${g.edit?'':`<label class="sg-lbl">Who’s in with you?</label>
  <div class="sg-list">${people.map(([id,n,sub])=>`<button class="sg-who ${g.who===id?'on':''}" onclick="T.sg.who='${id}';refresh()">${sgAv(id)}<span class="grow"><b>${n}</b><em>${sub}</em></span><i>${g.who===id?ic('check',14):''}</i></button>`).join('')}</div>`}
  <label class="sg-lbl">How will you add to it?</label><p class="sg-note" style="margin-top:4px">Pick any. ${nm(g.who)} picks their own.</p>
  <div class="sg-list">${SG_WAYS.map(([k,t,d])=>`<button class="sg-who ${w[k]?'on':''}" role="checkbox" aria-checked="${!!w[k]}" onclick="T.sg.ways['${k}']=!T.sg.ways['${k}'];refresh()"><span class="sg-wic">${k==='pay'?sgIcon(18):k==='rec'?ic2('sun',18):ic('plus',16)}</span><span class="grow"><b>${t}</b><em>${d}</em></span><i>${w[k]?ic('check',14):''}</i></button>`).join('')}</div>
  ${w.pay?`<label class="sg-lbl">Paycheck slice</label><div class="sg-seg">${[2,5,10].map(v=>`<button class="${g.slice===v?'on':''}" onclick="T.sg.slice=${v};refresh()">${v}%</button>`).join('')}</div><p class="sg-note">Comes out of your Spending slice. Your other slices stay the same.</p>`:''}
  ${w.rec?`<label class="sg-lbl">Recurring transfer</label><div class="sg-seg">${[10,25,50].map(v=>`<button class="${g.recAmt===v?'on':''}" onclick="T.sg.recAmt=${v};refresh()">$${v}</button>`).join('')}</div><div class="sg-seg" style="margin-top:8px">${['Weekly','Monthly'].map(v=>`<button class="${g.recFreq===v?'on':''}" onclick="T.sg.recFreq='${v}';refresh()">${v}</button>`).join('')}</div><p class="sg-note">From Everyday Checking ••4821. Pause or change it anytime.</p>`:''}
 </div>
 <div class="sg-foot"><button class="btn sg-cta" ${!(w.pay||w.rec||w.any)?'disabled':''} onclick="go('sg-review')">Continue</button></div>`}});
def('sg-review',()=>{sgInit();const g=T.sg;const who=nm(g.who);const isNew=g.who==='jess';
 const row=(k,v)=>`<div class="sg-r"><span>${k}</span><b>${v}</b></div>`;
 return {cls:'lt sgs',html:`<div class="sg-top"><button class="iconbtn" onclick="back()" aria-label="Back">${ic('back',24)}</button><b>Review</b><span style="width:44px"></span></div>
 <div class="sg-body"><h1 class="sg-h">${g.name||'Your goal'}, with ${who}</h1>
  <div class="sg-box">${row('You’ll add',sgWaysTxt(g))}${row('Goes to','Your own Acorns account, set aside for this goal')}${row(`${who} sees`,'Progress together, as a percent')}${row(`${who} never sees`,'Your dollars or your balance')}</div>
  <p class="sg-note">${isNew?`${who} isn’t on Acorns yet. They get a link, sign up, then pick how they’ll add.`:`${who} picks how they’ll add when they say yes.`} Either of you can leave anytime and keep what you saved.</p>
  <p class="sg-note" style="margin-top:6px">Placeholder disclosure for the prototype.</p></div>
 <div class="sg-foot"><button class="btn sg-cta" onclick="${g.edit?"delete T.sg.edit;S.sg=Object.assign(S.sg||{},T.sg);save();back2('sg-home');toast('Saved')":"S.sg=Object.assign({},T.sg,{pct:0,joined:false,log:[]});save();replace('sg-sent')"}">${g.edit?'Save changes':isNew?`Start goal and send ${who} a link`:`Start goal and invite ${who}`}</button></div>`}});
def('sg-sent',()=>{const g=S.sg||T.sg;const who=nm(g.who);
 return {cls:'lt sgs',html:`<div class="sg-top"><button class="iconbtn" onclick="replace('sg-home')" aria-label="Close">${ic('close',22)}</button><b>Invite ${who}</b><span style="width:44px"></span></div>
 <div class="sg-body"><div class="sg-msg"><div class="sg-bub">Want to save for ${g.name} with me? We each add our own way, and only see progress.</div>
  <div class="sg-lp"><div class="sg-lp-img">${sgRing(0,70)}<span>${sgIcon(22)}</span></div><div><b>${S.me} started a goal: ${g.name}</b><em>acorns.com/goal/${S.me.toLowerCase()}</em></div></div></div>
  <p class="sg-note" style="text-align:center">You send it from your own Messages. ${g.who==='jess'?`${who} can join without being on Acorns yet.`:`${who} is already on Acorns, so the link opens the goal in their app.`}</p>
  <button class="sg-link" onclick="go('sg-join')">Prototype: see what ${who} sees ${ic('chev',14)}</button></div>
 <div class="sg-foot"><button class="btn sg-cta" onclick="sgSend()">${ic('share',18)} Send to ${who}</button></div>`}});
function sgSend(){const g=S.sg||T.sg;const who=nm(g.who);
 const card=storyCard({eyebrow:'Shared goal',title:`Save for ${g.name} with me?`,sub:'We each add our own way. We only see progress, never each other’s dollars.',art:`<div class="sgx-shart">${sgRing(0,120)}<span>${sgIcon(34)}</span></div>`,foot:`acorns.com/goal/${S.me.toLowerCase()}`});
 share({title:`${S.me} started a goal: ${g.name}`,link:`acorns.com/goal/${S.me.toLowerCase()}`,story:card,people:[g.who],text:`Want to save for ${g.name} with me? We each add our own way, and only see progress.`,done:()=>{replace('sg-home');toast(`Sent to ${who}`)}})}
document.head.insertAdjacentHTML('beforeend','<style>.sgx-shart{position:relative;display:inline-flex}.sgx-shart span{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#2f7a12}</style>');
def('sg-join',()=>{const g=S.sg||{name:'Lisbon trip',who:'jess'};
 return {cls:'lt sgs sgj',html:`<div class="sg-web">${ic('lock',12)} acorns.com/goal/${S.me.toLowerCase()}</div><div class="sg-top" style="padding-top:8px;height:auto"><span style="width:44px"></span><span></span><button class="iconbtn" onclick="back()" aria-label="Close">${ic('close',22)}</button></div>
 <div class="sg-body" style="top:calc(var(--safeTop) + 84px)"><div class="sg-hero"><div class="sg-pair">${sgAv('me',44)}<span class="sg-av add" style="width:44px;height:44px">${ic('plus',18)}</span></div>
  <h1 class="sg-h c">${S.me} invited you to save for ${g.name}</h1><p class="sg-note" style="text-align:center;font-size:15px">Save together on Acorns. You each add your own way, and you only see progress, never each other’s dollars.</p></div>
  <div class="sg-box">${SG_WAYS.map(([k,t,d])=>`<div class="sg-m"><span class="sg-wic">${k==='pay'?sgIcon(18):k==='rec'?ic2('sun',18):ic('plus',16)}</span><span class="grow"><b>${t}</b><em>${d}</em></span></div>`).join('')}</div>
  <p class="sg-note" style="text-align:center">Takes about 5 minutes. Investing involves risk. Placeholder copy.</p></div>
 <div class="sg-foot"><button class="btn sg-cta" onclick="S.sg&&(S.sg.joined=true,S.sg.pct=Math.max(S.sg.pct||0,8));save();replace('sg-home');toast('${nm(g.who)} signed up and joined')">Sign up and join</button></div>`}});
def('sg-add',()=>{const g=S.sg;if(!T.sga)T.sga=25;
 return {cls:'lt sgs',html:`<div class="sg-top"><button class="iconbtn" onclick="back()" aria-label="Back">${ic('back',24)}</button><b>Add money</b><span style="width:44px"></span></div>
 <div class="sg-body"><h1 class="sg-h">Add to ${g?g.name:'your goal'}</h1><div class="sg-amt">$${T.sga}</div>
  <div class="sg-seg">${[10,25,50,100].map(v=>`<button class="${T.sga===v?'on':''}" onclick="T.sga=${v};refresh()">$${v}</button>`).join('')}</div>
  <div class="sg-box">${[['From','Everyday Checking ••4821'],['Goes to','Your own Acorns account, set aside for this goal'],[`${g?nm(g.who):'They'} sees`,'The goal’s progress go up, not this amount']].map(([k,v])=>`<div class="sg-r"><span>${k}</span><b>${v}</b></div>`).join('')}</div></div>
 <div class="sg-foot"><button class="btn sg-cta" onclick="S.sg.pct=Math.min(100,(S.sg.pct||0)+Math.round(T.sga/40*4));(S.sg.log=S.sg.log||[]).unshift('You added money');save();back();toast('Added to ${g?g.name:'your goal'}')">Add $${T.sga}</button></div>`}});
def('sg-home',()=>{const g=S.sg||{name:'Lisbon trip',who:'sam',slice:5,pct:62,joined:true,ways:{pay:true,any:true}};const who=nm(g.who);const p=g.pct||0;
 return {cls:'lt sgs',html:`<div class="sg-top"><button class="iconbtn" onclick="back()" aria-label="Back">${ic('back',24)}</button><b>Shared goal</b><span style="width:44px"></span></div>
 <div class="sg-body"><div class="sg-hero"><div class="sg-ring">${sgRing(p,170)}<div class="sg-rc"><b>${p}%</b><em>together</em></div></div><h1 class="sg-h c">${g.name}</h1>
  <div class="sg-pair">${sgAv('me',34)}${sgAv(g.who,34)}</div></div>
  <button class="btn sg-cta" style="margin-top:16px;height:50px" onclick="${S.sg?"T.sga=25;go('sg-add')":"toast('Start a goal first')"}">${ic('plus',16)} Add money</button>
  <div class="sg-box">
   <div class="sg-m">${sgAv('me',30)}<span class="grow"><b>You</b><em>${sgWaysTxt(g)}</em></span><i class="ok">On track</i></div>
   <div class="sg-m">${sgAv(g.who,30)}<span class="grow"><b>${who}</b><em>${g.joined?'Adds their own way':g.who==='jess'?'Link sent · not on Acorns yet':'Invite sent'}</em></span><i class="${g.joined?'ok':''}">${g.joined?'On track':'Waiting'}</i></div></div>
  <p class="sg-note">Percent of the goal you’ve saved together. Neither of you sees the other’s dollars.</p>
  <div class="sg-acts">${g.joined?`<button onclick="toast('Cheer sent to ${who}')">Cheer ${who}</button>`:g.who==='jess'?`<button onclick="go('sg-join')">Prototype: ${who} gets the link</button>`:`<button onclick="S.sg.joined=true;save();refresh();toast('${who} joined your goal')">Prototype: ${who} joins</button>`}<button onclick="S.sg.pct=Math.min(100,(S.sg.pct||0)+12);save();refresh();toast('Payday: slices landed')">Prototype: payday</button></div></div>
 <div class="sg-foot"><button class="btn sg-cta ghost" onclick="T.sg=Object.assign({},S.sg);go('sg-new')">Change how I add</button></div>`}});
Object.assign(LV,{
 goalways:()=>`${ldGlow()}<div class="lv-mid" style="gap:10px">${SG_WAYS.map(([k,t,d],i)=>`<div class="ld-q rise d${i*2}" style="width:290px"><span class="sg-wic dk">${k==='pay'?sgIcon(18):k==='rec'?ic2('sun',18):ic('plus',16)}</span><div style="flex:1"><b>${t}</b><span>${d}</span></div></div>`).join('')}</div>`,
 goalinvite:()=>ldThread({who:'Jess',c:'#e8a45c',text:'Want to save for Lisbon with me? We each add our own way.'}).replace(/Join [^<]*’s grove/,'Jordan started a goal: Lisbon trip').replace(/acorns\.com\/j\/[a-z]+/,'acorns.com/goal/jordan').replace(/<div class="ld-lp-img"><img[^>]*><\/div>/,`<div class="ld-lp-img" style="align-items:center">${sgRing(40,80)}</div>`)});
document.head.insertAdjacentHTML('beforeend',`<style>
.sg-wic{width:32px;height:32px;border-radius:16px;background:#eef7e6;color:#2f7a12;display:inline-flex;align-items:center;justify-content:center;flex:none}.sg-wic.dk{background:rgba(116,201,71,.2);color:#bceaa3;margin-right:12px}
.sg-msg{margin-top:10px;padding:16px;border-radius:22px;background:#f4f4f6;display:flex;flex-direction:column;align-items:flex-end;gap:8px}
.sg-bub{max-width:250px;padding:10px 14px;border-radius:18px 18px 4px 18px;background:#1a8cff;color:#fff;font-size:15px;line-height:1.35}
.sg-lp{width:250px;border-radius:16px;background:#fff;border:1px solid #e6e6ea;overflow:hidden}.sg-lp-img{position:relative;height:110px;background:linear-gradient(#e4f5d4,#c4e8a6);display:flex;align-items:center;justify-content:center}.sg-lp-img span{position:absolute;color:#2f7a12}
.sg-lp>div:last-child{padding:10px 12px}.sg-lp b{display:block;font-size:14px}.sg-lp em{display:block;font-style:normal;font-size:12px;color:#6b6b6b;margin-top:2px}
.sg-link{display:flex;align-items:center;gap:4px;margin:16px auto 0;height:36px;padding:0 14px;border-radius:18px;background:#fdf3d3;color:#6b5310;font-size:13px;font-weight:600}
.scr.sgj{background:linear-gradient(#e2f5d6,#fff 45%)!important}.sg-web{position:absolute;left:16px;right:16px;top:calc(var(--safeTop) + 4px);height:34px;border-radius:12px;background:rgba(255,255,255,.8);display:flex;align-items:center;justify-content:center;gap:6px;font-size:13px;color:#4a524c}
.sg-amt{margin:18px 0 14px;text-align:center;font-size:56px;font-weight:600;letter-spacing:-1.5px}
.sg-cta[disabled]{opacity:.4}
</style>`);

/* ================= Shared goals v3: the goal dashboard as a whole experience ================= */
const SG_MS=[[10,'First step','sprout'],[25,'Quarter way','star'],[50,'Halfway','flag'],[75,'Almost there','peak'],[100,'Made it','trophy']];
const SG_KIND={Trip:{ic:'plane',bg:'linear-gradient(160deg,#d7ecff 0%,#eef7ff 55%,#f6fbef 100%)',dest:'Lisbon'},Wedding:{ic:'rings',bg:'linear-gradient(160deg,#fde7ea,#fff5f1 55%,#f6fbef)',dest:'The big day'},'First apartment':{ic:'house',bg:'linear-gradient(160deg,#fff0d9,#fff8ee 55%,#f6fbef)',dest:'Move-in day'},Car:{ic:'car',bg:'linear-gradient(160deg,#dcf3ec,#f1fbf7 55%,#f6fbef)',dest:'Keys in hand'},'Something else':{ic:'star',bg:'linear-gradient(160deg,#e3f4d8,#f6fbef)',dest:'Done'}};
function sgGlyph(k,sz,col){const c=col||'currentColor',st=`fill="none" stroke="${c}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"`;
 const d={plane:`<path ${st} d="M21 4 3 11l7 2.6L12.6 21z"/><path ${st} d="M10 13.6 21 4"/>`,rings:`<circle ${st} cx="9" cy="14" r="5.5"/><circle ${st} cx="15.5" cy="12" r="5.5"/><path ${st} d="M13.5 4.5l2 2.2 2-2.2"/>`,house:`<path ${st} d="M3.5 11 12 4l8.5 7v9h-5.5v-5.5h-6V20H3.5z"/>`,car:`<path ${st} d="M4 16v-3.5L6.3 8h11.4L20 12.5V16z"/><circle ${st} cx="7.5" cy="16.5" r="1.8"/><circle ${st} cx="16.5" cy="16.5" r="1.8"/>`,star:`<path ${st} d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.6l1-5.8-4.3-4.1 5.9-.9z"/>`,
 sprout:`<path ${st} d="M12 20v-8"/><path ${st} d="M12 12c0-4 3-6 7-6 0 4-3 6-7 6zM12 14c0-3-2.5-5-6-5 0 3 2.5 5 6 5z"/>`,flag:`<path ${st} d="M6 21V4"/><path ${st} d="M6 4.5h11l-2.5 4 2.5 4H6"/>`,peak:`<path ${st} d="M3 19 9.5 8l3.5 6 2-3 6 8z"/><path ${st} d="m8 10.5 1.5 1 1.5-1"/>`,trophy:`<path ${st} d="M7.5 4h9v5a4.5 4.5 0 0 1-9 0z"/><path ${st} d="M7.5 6H4.5a3 3 0 0 0 3 4M16.5 6h3a3 3 0 0 1-3 4M12 13.5V17M8.5 20h7M9.5 17h5"/>`};
 return `<svg width="${sz}" height="${sz}" viewBox="0 0 24 24" aria-hidden="true">${d[k]||d.star}</svg>`}
function sgDemo(){return {name:'Lisbon trip',kind:'Trip',who:'sam',slice:5,ways:{pay:true,rec:true,any:true},recAmt:25,recFreq:'Weekly',pct:62,joined:true,by:'June 2027',weeks:[2,2,1,2,2,0,2,2,1,2,2,2],
 log:[{w:'sam',t:'Sam’s paycheck slice landed',d:'Fri'},{w:'me',t:'You added money',d:'Wed'},{w:'ms',t:'You hit Halfway together',d:'Last week'},{w:'me',t:'Your recurring transfer landed',d:'Last Mon'}]}}
function sgG(){const g=S.sg||sgDemo();if(!g.weeks)g.weeks=[];if(!g.log)g.log=[];if(!g.kind)g.kind='Trip';if(!g.by)g.by='June 2027';return g}
/* journey path: two cubic segments, sampled for even spacing */
const SGP=[[28,160],[96,162],[100,104],[170,104],[238,104],[246,50],[310,48]];
function sgPathD(){const p=SGP;return `M${p[0]} C${p[1]} ${p[2]} ${p[3]} C${p[4]} ${p[5]} ${p[6]}`}
const SGPT=(function(){const p=SGP,pts=[];const bz=(a,b,c,d,t)=>{const u=1-t;return [u*u*u*a[0]+3*u*u*t*b[0]+3*u*t*t*c[0]+t*t*t*d[0],u*u*u*a[1]+3*u*u*t*b[1]+3*u*t*t*c[1]+t*t*t*d[1]]};
 for(let i=0;i<=60;i++)pts.push(bz(p[0],p[1],p[2],p[3],i/60));for(let i=1;i<=60;i++)pts.push(bz(p[3],p[4],p[5],p[6],i/60));
 const L=[0];for(let i=1;i<pts.length;i++)L.push(L[i-1]+Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]));const tot=L[L.length-1];
 return f=>{const want=tot*Math.max(0,Math.min(1,f));let i=L.findIndex(v=>v>=want);if(i<1)i=1;const r=(want-L[i-1])/((L[i]-L[i-1])||1);return [pts[i-1][0]+(pts[i][0]-pts[i-1][0])*r,pts[i-1][1]+(pts[i][1]-pts[i-1][1])*r]}})();
function sgScene(g,p,o){o=o||{};const K=SG_KIND[g.kind]||SG_KIND.Trip;const [mx,my]=SGPT(p/100);const d=sgPathD();
 const flags=SG_MS.slice(1,4).map(([v,l])=>{const [x,y]=SGPT(v/100);const on=p>=v;return `<g transform="translate(${x} ${y})"><circle r="7" fill="${on?'#3d9a1f':'#fff'}" stroke="${on?'#fff':'#c9d6c0'}" stroke-width="2"/>${on?'<path d="M-3 0l2 2 4-4" stroke="#fff" stroke-width="1.8" fill="none" stroke-linecap="round"/>':''}<text y="22" text-anchor="middle" font-size="10" font-weight="600" fill="${on?'#2f5c1a':'#8a958c'}">${v}%</text></g>`}).join('');
 return `<div class="sgx-scene" style="background:${K.bg}">
  <svg class="sgx-clouds" viewBox="0 0 360 190" aria-hidden="true"><g fill="#fff" opacity=".85"><ellipse cx="70" cy="40" rx="26" ry="9"/><ellipse cx="88" cy="34" rx="16" ry="9"/><ellipse cx="250" cy="120" rx="22" ry="7"/><ellipse cx="266" cy="115" rx="13" ry="7"/></g><g fill="#74c947" opacity=".18"><ellipse cx="60" cy="196" rx="120" ry="34"/><ellipse cx="300" cy="200" rx="140" ry="30"/></g></svg>
  <svg class="sgx-path" viewBox="0 0 360 190" aria-hidden="true"><path d="${d}" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#d5e3cc" stroke-width="3" stroke-dasharray="2 7" stroke-linecap="round"/>
   <path class="sgx-prog" d="${d}" pathLength="100" fill="none" stroke="#5fb83a" stroke-width="8" stroke-linecap="round" stroke-dasharray="${p} 100" style="--p:${p}"/>${flags}
   <circle cx="${SGP[0][0]}" cy="${SGP[0][1]}" r="5" fill="#3d9a1f"/></svg>
  <div class="sgx-dest" style="left:${SGP[6][0]/360*100}%;top:${SGP[6][1]/190*100}%"><span>${sgGlyph(K.ic,22,'#2f7a12')}</span><em>${K.dest}</em></div>
  <div class="sgx-me ${o.anim?'anim':''}" style="left:${mx/360*100}%;top:${my/190*100}%"><span class="sgx-av2">${sgAv('me',26)}${sgAv(g.who,26)}</span></div>
  ${o.noLabel?'':`<div class="sgx-kind">${sgGlyph(K.ic,14)} ${g.kind} · by ${g.by}</div>`}</div>`}
function sgCount(el,from,to,ms){const n=el&&el.querySelector('[data-count]');if(!n)return;const t0=performance.now();const step=t=>{const k=Math.min(1,(t-t0)/(ms||900));const e=1-Math.pow(1-k,3);n.textContent=Math.round(from+(to-from)*e)+'%';if(k<1)requestAnimationFrame(step)};requestAnimationFrame(step)}
function sgWeeks(g){const w=g.weeks.slice(-12);while(w.length<12)w.unshift(-1);const both=w.filter(v=>v===2).length,any=w.filter(v=>v>0).length;
 return `<div class="sgx-card"><div class="sgx-ch"><div><b>Your rhythm</b><em>${any?`You both added ${both} of the last ${w.filter(v=>v>=0).length} weeks`:'Your first weeks show up here'}</em></div><span class="sgx-fire">${ic2('flame',14)} ${both}</span></div>
  <div class="sgx-wk">${w.map((v,i)=>`<i class="w${v}" title="Week ${i+1}">${v===2?ic('check',11):''}</i>`).join('')}</div>
  <div class="sgx-wl"><span>12 weeks ago</span><span>This week</span></div>
  <div class="sgx-leg"><span><i class="w2"></i>You both added</span><span><i class="w1"></i>One of you</span><span><i class="w0"></i>No one yet</span></div></div>`}
function sgBadges(p){return `<div class="sgx-card"><div class="sgx-ch"><div><b>Milestones</b><em>${SG_MS.filter(m=>p>=m[0]).length} of ${SG_MS.length} reached</em></div></div>
  <div class="sgx-bd">${SG_MS.map(([v,l,ic0])=>`<div class="sgx-b ${p>=v?'on':''}"><span>${sgGlyph(ic0,22,p>=v?'#fff':'#9aa69c')}</span><b>${l}</b><em>${v}%</em></div>`).join('')}</div></div>`}
function sgFeed(g){const ico=e=>e.w==='ms'?`<span class="sgx-fi ms">${sgGlyph('flag',16,'#fff')}</span>`:sgAv(e.w,34);
 return `<div class="sgx-card"><div class="sgx-ch"><div><b>Activity</b><em>What’s happened, never how much</em></div></div>
  ${g.log.length?g.log.slice(0,5).map((e,i)=>`<div class="sgx-f">${ico(e)}<span class="grow"><b>${e.t}</b><em>${e.d}</em></span>${e.w!=='me'?`<button class="sgx-cheer ${e.ch?'on':''}" onclick="sgG().log[${i}].ch=!sgG().log[${i}].ch;save();refresh()" aria-label="Cheer">${e.ch?'🎉':'Cheer'}</button>`:''}</div>`).join(''):`<div class="sgx-empty">Your first contribution will show up here.</div>`}</div>`}
def('sg-home',()=>{const g=sgG();const who=nm(g.who);const p=g.pct||0;const next=SG_MS.find(m=>p<m[0]);const prev=T.sgPrev!=null?T.sgPrev:Math.max(0,p-12);
 const ways=w=>[w.pay&&`${g.slice||5}% of each paycheck`,w.rec&&`$${g.recAmt||25} ${String(g.recFreq||'Weekly').toLowerCase()}`,w.any&&'Anytime'].filter(Boolean);
 return {cls:'lt sgs sgx',html:`<div class="sg-top"><button class="iconbtn" onclick="back()" aria-label="Back">${ic('back',24)}</button><b>${g.name}</b><button class="iconbtn" onclick="T.sg=Object.assign({},sgG(),{edit:1});go('sg-new')" aria-label="Goal settings">${ic('gear',20)}</button></div>
 <div class="sg-body sgx-body">
  <div class="sgx-hero">${sgScene(g,p,{anim:1})}<div class="sgx-num"><b data-count>${p}%</b><em>saved together</em></div></div>
  <div class="sgx-next">${next?`<div class="sgx-nl"><span>${sgGlyph(next[2],16,'#2f7a12')}</span><div class="grow"><b>Next: ${next[1]}</b><em>${next[0]-p}% to go</em></div></div><div class="sgx-nb"><i style="width:${Math.round((p-(SG_MS[SG_MS.indexOf(next)-1]||[0])[0])/(next[0]-(SG_MS[SG_MS.indexOf(next)-1]||[0])[0])*100)}%"></i></div>`:`<div class="sgx-nl"><span>${sgGlyph('trophy',16,'#2f7a12')}</span><div class="grow"><b>You made it, together</b><em>Time to book ${(SG_KIND[g.kind]||{}).dest||'it'}</em></div></div>`}</div>
  <div class="sgx-acts"><button class="sgx-add" onclick="T.sga=25;go('sg-add')">${ic('plus',18)} Add money</button><button class="sgx-cb" onclick="toast('Cheer sent to ${who}')">${sgAv(g.who,24)} Cheer ${who}</button></div>
  ${sgBadges(p)}${sgWeeks(g)}
  <div class="sgx-card"><div class="sgx-ch"><div><b>Who’s adding</b><em>Each of you adds your own way</em></div></div>
   <div class="sgx-p">${sgAv('me',38)}<div class="grow"><b>You</b><div class="sgx-chips">${ways(g.ways||{}).map(x=>`<span>${x}</span>`).join('')}</div></div><button class="sgx-edit" onclick="T.sg=Object.assign({},sgG(),{edit:1});go('sg-new')">Edit</button></div>
   <div class="sgx-p">${sgAv(g.who,38)}<div class="grow"><b>${who}</b><div class="sgx-chips">${g.joined?'<span>Paycheck slice</span><span>Anytime</span>':`<span class="wait">${g.who==='jess'?'Link sent · not on Acorns yet':'Invite sent'}</span>`}</div></div>${g.joined?'':`<button class="sgx-edit" onclick="${g.who==='jess'?"go('sg-join')":`S.sg&&(S.sg.joined=true);save();refresh();toast('${who} joined')`}">${g.who==='jess'?'Preview':'Remind'}</button>`}</div></div>
  ${sgFeed(g)}
  <p class="sgx-priv">${ic('lock',12)} ${who} sees progress and activity, never your dollars or balance. Either of you can leave anytime and keep what you saved.</p>
  <div class="sgx-proto"><span>Prototype</span><button onclick="sgPayday()">Payday lands</button><button onclick="sgFriendAdds()">${who} adds money</button></div>
 </div>`,mount(el){sgCount(el,prev,p,1000);T.sgPrev=null}}});
function sgBump(n,entry){const g=S.sg||(S.sg=sgDemo());const from=g.pct||0;g.pct=Math.min(100,from+n);g.log.unshift(entry);const crossed=SG_MS.find(m=>from<m[0]&&g.pct>=m[0]);if(crossed)g.log.unshift({w:'ms',t:`You hit ${crossed[1]} together`,d:'Just now'});save();return [from,g.pct,crossed]}
function sgPayday(){const g=S.sg||(S.sg=sgDemo());g.weeks.push(g.joined?2:1);const [f,t,c]=sgBump(g.joined?6:3,{w:g.joined?g.who:'me',t:g.joined?`Paydays landed for you and ${nm(g.who)}`:'Your paycheck slice landed',d:'Just now'});T.sgPrev=f;if(c){replace('sg-added',{from:f,to:t,ms:c[0],auto:1})}else{refresh();toast('Payday: slices landed')}}
function sgFriendAdds(){const g=S.sg||(S.sg=sgDemo());if(!g.joined){toast(`${nm(g.who)} hasn’t joined yet`);return}const [f,t,c]=sgBump(4,{w:g.who,t:`${nm(g.who)} added money`,d:'Just now'});T.sgPrev=f;if(c){replace('sg-added',{from:f,to:t,ms:c[0],friend:1})}else{refresh();toast(`${nm(g.who)} added money`)}}
def('sg-add',()=>{const g=sgG();if(!T.sga)T.sga=25;const p=g.pct||0;const step=v=>Math.max(1,Math.round(v/8));const to=Math.min(100,p+step(T.sga));const cross=SG_MS.find(m=>p<m[0]&&to>=m[0]);
 return {cls:'lt sgs sgx',html:`<div class="sg-top"><button class="iconbtn" onclick="back()" aria-label="Back">${ic('back',24)}</button><b>Add money</b><span style="width:44px"></span></div>
 <div class="sg-body sgx-body"><div class="sgx-addh">${sgScene(g,to,{noLabel:1})}</div>
  <div class="sgx-amt"><span>$</span>${T.sga}</div><div class="sgx-amts">${[10,25,50,100].map(v=>`<button class="${T.sga===v?'on':''}" onclick="T.sga=${v};refresh()">$${v}</button>`).join('')}</div>
  <div class="sgx-move"><div><em>Now</em><b>${p}%</b></div><span>${ic('back',16,'transform:rotate(180deg)')}</span><div class="to"><em>After</em><b>${to}%</b></div></div>
  ${cross?`<div class="sgx-unlock"><span>${sgGlyph(cross[2],18,'#fff')}</span><div><b>This unlocks ${cross[1]}</b><em>${nm(g.who)} gets to celebrate it with you</em></div></div>`:''}
  <div class="sgx-card" style="padding:4px 16px">${[['From','Everyday Checking ••4821'],['Goes to','Your Acorns account, set aside for this goal'],[`${nm(g.who)} sees`,'The goal move, not this amount']].map(([k,v])=>`<div class="sg-r"><span>${k}</span><b>${v}</b></div>`).join('')}</div>
  <p class="sgx-priv" style="margin-top:12px">Placeholder disclosure. Transfers usually arrive in 1–3 business days.</p></div>
 <div class="sg-foot"><button class="btn sg-cta" onclick="sgAddGo()">Add $${T.sga}</button></div>`}});
function sgAddGo(){const g=S.sg||(S.sg=sgDemo());const n=Math.max(1,Math.round(T.sga/8));const [f,t,c]=sgBump(n,{w:'me',t:'You added money',d:'Just now'});if(g.weeks.length)g.weeks[g.weeks.length-1]=Math.max(g.weeks[g.weeks.length-1],1);else g.weeks.push(1);save();replace('sg-added',{from:f,to:t,ms:c?c[0]:0})}
/* Share progress: a percent and a milestone, never dollars */
function sgShare(pct,ms){const g=sgG();const who=nm(g.who);const m=SG_MS.find(x=>x[0]===ms);
 const card=storyCard({eyebrow:m?'Milestone':'Shared goal',title:m?`${m[1]} to ${g.name}.`:`${pct}% of the way to ${g.name}.`,sub:`Saving with ${who}. We each add our own way.`,art:`<div class="sgx-shart">${sgRing(pct,120)}<span style="font-size:26px;font-weight:700;color:#163d0c">${pct}%</span></div>`,foot:`acorns.com/goal/${S.me.toLowerCase()}`});
 share({title:m?`${m[1]} to ${g.name}`:`${pct}% to ${g.name}`,link:`acorns.com/goal/${S.me.toLowerCase()}`,story:card,people:[g.who,'mom','priya','sam','dad'].filter((x,i,a)=>a.indexOf(x)===i),text:m?`We just hit ${m[1].toLowerCase()} on ${g.name}!`:`${pct}% of the way to ${g.name}.`})}
def('sg-added',p=>{const g=sgG();const m=SG_MS.find(x=>x[0]===p.ms);const who=nm(g.who);
 return {cls:'lt sgs sgx sgx-cel',html:`<div class="sg-top"><span style="width:44px"></span><span></span><button class="iconbtn" onclick="T.sgPrev=${p.to};back()" aria-label="Close">${ic('close',22)}</button></div>
 <div class="sgx-celb">${m?`<div class="sgx-badge pop"><span>${sgGlyph(m[2],44,'#fff')}</span></div><div class="sgx-ek">Milestone unlocked</div><h1>${m[1]}!</h1><p>${p.friend?`${who} just added to ${g.name}, and you crossed ${m[0]}% together.`:`You and ${who} are ${m[0]}% of the way to ${g.name}.`}</p>`:`<div class="sgx-ring2">${sgRing(p.to,190)}<div class="sg-rc"><b data-count>${p.to}%</b><em>together</em></div></div><div class="sgx-ek">Added to ${g.name}</div><h1>+${p.to-p.from}% closer</h1><p>${who} gets a heads-up that the goal grew. Not the amount.</p>`}
  <div class="sgx-mini">${sgScene(g,p.to,{noLabel:1})}</div>${(()=>{const nx=SG_MS.find(x=>p.to<x[0]);return nx?`<div class="sgx-next" style="width:100%;text-align:left"><div class="sgx-nl"><span>${sgGlyph(nx[2],16,'#2f7a12')}</span><div class="grow"><b>Next: ${nx[1]}</b><em>${nx[0]-p.to}% to go</em></div></div></div>`:''})()}</div>
 <div class="sg-foot sgx-two"><button class="btn sg-cta ghost" onclick="sgShare(${p.to},${p.ms||0})">${ic('share',16)} Share</button><button class="btn sg-cta" onclick="T.sgPrev=${p.to};back()">Done</button></div>`,
 mount(el){sgCount(el,p.from,p.to,900);if(m)setTimeout(()=>{ART.confetti($('#screen'),110);haptic(30)},250)}}});
document.head.insertAdjacentHTML('beforeend',`<style>
.scr.sgx{background:#f5f7f2!important}.sgx .sg-top{background:#f5f7f2}
.sgx-body{padding:4px 16px 32px!important}.sgx .ac-tabs~*{display:none}.sgx:has(.ac-tabs) .sg-body{bottom:calc(var(--safeBot) + 64px)}
.sgx-hero{position:relative}
.sgx-scene{position:relative;height:210px;border-radius:28px;overflow:hidden;box-shadow:0 1px 0 rgba(0,0,0,.04)}
.sgx-clouds,.sgx-path{position:absolute;inset:0;width:100%;height:100%}
.sgx-prog{animation:sgxDraw 1.1s .15s cubic-bezier(.3,.8,.3,1) both}@keyframes sgxDraw{from{stroke-dasharray:0 100}}
.sgx-dest{position:absolute;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:4px}.sgx-dest span{width:46px;height:46px;border-radius:23px;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 16px rgba(30,60,20,.15)}.sgx-dest em{font-style:normal;font-size:11px;font-weight:700;color:#2f5c1a;background:rgba(255,255,255,.85);padding:2px 8px;border-radius:8px}
.sgx-me{position:absolute;transform:translate(-50%,-50%)}.sgx-me.anim{animation:sgxIn .9s .25s cubic-bezier(.2,1.3,.4,1) both}@keyframes sgxIn{from{opacity:0;transform:translate(-50%,-30%) scale(.6)}}
.sgx-av2{display:flex;padding:3px;border-radius:20px;background:#fff;box-shadow:0 6px 16px rgba(30,60,20,.2)}.sgx-av2 .sg-av+.sg-av{margin-left:-6px}
.sgx-kind{position:absolute;left:14px;top:14px;display:flex;align-items:center;gap:6px;height:28px;padding:0 10px;border-radius:14px;background:rgba(255,255,255,.85);font-size:12px;font-weight:600;color:#2f4a26}
.sgx-num{position:absolute;left:18px;top:50px}.sgx-num b{display:block;font-size:46px;font-weight:700;letter-spacing:-1.5px;line-height:1;color:#163d0c}.sgx-num em{display:block;font-style:normal;font-size:13px;font-weight:600;color:#3f5a37;margin-top:2px}
.sgx-next{margin-top:12px;padding:14px 16px;border-radius:20px;background:#fff}.sgx-nl{display:flex;align-items:center;gap:12px}.sgx-nl>span{width:36px;height:36px;border-radius:18px;background:#e8f5df;display:flex;align-items:center;justify-content:center;flex:none}.sgx-nl b{display:block;font-size:15px}.sgx-nl em{display:block;font-style:normal;font-size:13px;color:#6b706c;margin-top:1px}
.sgx-nb{margin-top:12px;height:8px;border-radius:4px;background:#eceeea;overflow:hidden}.sgx-nb i{display:block;height:100%;border-radius:4px;background:linear-gradient(90deg,#9bd77a,#3d9a1f);animation:sgxBar 1s .3s both}@keyframes sgxBar{from{width:0}}
.sgx-acts{display:flex;gap:10px;margin-top:12px}.sgx-add{flex:1;height:54px;border-radius:27px;background:#74c947;color:#0a1d08;font-size:17px;font-weight:600;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 6px 16px rgba(80,160,40,.3)}
.sgx-cb{height:54px;padding:0 16px 0 10px;border-radius:27px;background:#fff;font-size:15px;font-weight:600;display:flex;align-items:center;gap:8px;color:#191919}
.sgx-card{margin-top:12px;padding:16px;border-radius:22px;background:#fff}.sgx-ch{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:12px}.sgx-ch b{display:block;font-size:16px}.sgx-ch em{display:block;font-style:normal;font-size:13px;color:#6b706c;margin-top:2px}
.sgx-fire{display:flex;align-items:center;gap:4px;height:26px;padding:0 10px;border-radius:13px;background:#3d9a1f;color:#fff;font-size:13px;font-weight:600}
.sgx-bd{display:flex;gap:6px}.sgx-b{flex:1;display:flex;flex-direction:column;align-items:center;text-align:center;gap:6px}.sgx-b span{width:48px;height:48px;border-radius:24px;background:#eef1ec;display:flex;align-items:center;justify-content:center;box-shadow:inset 0 0 0 1.5px #e1e6dd}
.sgx-b.on span{background:linear-gradient(145deg,#7cd14e,#2f8a14);box-shadow:0 6px 14px rgba(60,140,30,.3)}.sgx-b b{font-size:11px;line-height:1.2;color:#8a958c}.sgx-b.on b{color:#191919}.sgx-b em{font-style:normal;font-size:10px;color:#9aa69c;margin-top:-4px}
.sgx-wk{display:grid;grid-template-columns:repeat(12,1fr);gap:5px}.sgx-wk i,.sgx-leg i{aspect-ratio:1;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff}
.w2{background:#3d9a1f}.w1{background:#b8e29c}.w0{background:#eef1ec;box-shadow:inset 0 0 0 1.5px #e1e6dd}.w-1{background:transparent;box-shadow:inset 0 0 0 1.5px dashed #e1e6dd;border:1.5px dashed #e1e6dd}
.sgx-wl{display:flex;justify-content:space-between;margin-top:8px;font-size:11px;color:#9aa69c}
.sgx-leg{display:flex;gap:14px;margin-top:12px;padding-top:12px;border-top:1px solid #f0f2ee;font-size:12px;color:#6b706c}.sgx-leg span{display:flex;align-items:center;gap:6px}.sgx-leg i{width:12px;height:12px}
.sgx-p{display:flex;align-items:center;gap:12px;padding:10px 0}.sgx-p+.sgx-p{border-top:1px solid #f0f2ee}.sgx-p b{display:block;font-size:15px}
.sgx-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}.sgx-chips span{height:24px;padding:0 9px;border-radius:12px;background:#eef6e8;color:#2f5c1a;font-size:12px;font-weight:600;display:flex;align-items:center}.sgx-chips span.wait{background:#fdf3d3;color:#6b5310}
.sgx-edit{height:32px;padding:0 12px;border-radius:16px;background:#f0f2ee;font-size:13px;font-weight:600;color:#191919}
.sgx-f{display:flex;align-items:center;gap:12px;padding:10px 0}.sgx-f+.sgx-f{border-top:1px solid #f0f2ee}.sgx-f b{display:block;font-size:14px;font-weight:600}.sgx-f em{display:block;font-style:normal;font-size:12px;color:#8a958c;margin-top:1px}
.sgx-fi{width:34px;height:34px;border-radius:17px;display:flex;align-items:center;justify-content:center;flex:none}.sgx-fi.ms{background:linear-gradient(145deg,#7cd14e,#2f8a14)}
.sgx-cheer{height:30px;padding:0 12px;border-radius:15px;background:#f0f2ee;font-size:12px;font-weight:600;color:#191919}.sgx-cheer.on{background:#fff4d6}
.sgx-empty{padding:12px 0;font-size:14px;color:#8a958c}
.sgx-priv{display:flex;gap:6px;margin:16px 4px 0;font-size:12px;line-height:1.45;color:#7a837c}.sgx-priv svg{flex:none;margin-top:2px}
.sgx-proto{display:flex;align-items:center;flex-wrap:wrap;gap:6px;margin:14px 0 0;padding:10px 12px;border-radius:16px;border:1.5px dashed #e6d9a8;background:#fffbea}.sgx-proto span{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#8a6d12;margin-right:4px}.sgx-proto button{height:30px;padding:0 12px;border-radius:15px;background:#fdf0c2;color:#5e4a0c;font-size:12px;font-weight:600}
.sgx-addh .sgx-scene{height:150px}
.sgx-amt{margin-top:18px;text-align:center;font-size:60px;font-weight:600;letter-spacing:-2px;line-height:1}.sgx-amt span{font-size:32px;vertical-align:22px;margin-right:2px;color:#6b706c}
.sgx-amts{display:flex;gap:8px;margin-top:16px}.sgx-amts button{flex:1;height:46px;border-radius:14px;background:#fff;font-size:16px;font-weight:600;color:#191919;box-shadow:inset 0 0 0 1.5px #e3e7df}.sgx-amts button.on{background:#191919;color:#fff;box-shadow:none}
.sgx-move{display:flex;align-items:center;justify-content:center;gap:18px;margin-top:16px;padding:14px;border-radius:20px;background:#fff}.sgx-move div{text-align:center}.sgx-move em{display:block;font-style:normal;font-size:12px;color:#8a958c}.sgx-move b{display:block;font-size:26px;font-weight:700;color:#8a958c}.sgx-move .to b{color:#2f8a14}.sgx-move span{color:#b5bdb2}
.sgx-unlock{display:flex;align-items:center;gap:12px;margin-top:12px;padding:12px 14px;border-radius:18px;background:linear-gradient(100deg,#2f7a12,#4fae2c);color:#fff}.sgx-unlock>span{width:38px;height:38px;border-radius:19px;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;flex:none}.sgx-unlock b{display:block;font-size:15px}.sgx-unlock em{display:block;font-style:normal;font-size:12px;opacity:.85}
.scr.sgx-cel{background:radial-gradient(circle at 50% 30%,#e6f7d9,#f5f7f2 60%)!important}
.sgx-celb{position:absolute;left:0;right:0;top:calc(var(--safeTop) + 50px);bottom:calc(var(--safeBot) + 92px);display:flex;flex-direction:column;align-items:center;padding:20px 28px 0;text-align:center;overflow:hidden}
.sgx-badge{width:120px;height:120px;border-radius:60px;background:linear-gradient(145deg,#8ad85f,#2f8a14);display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 10px rgba(116,201,71,.18),0 18px 40px rgba(60,140,30,.35)}.sgx-badge.pop{animation:sgxPop .7s cubic-bezier(.2,1.5,.4,1) both}@keyframes sgxPop{from{transform:scale(.3) rotate(-20deg);opacity:0}}
.sgx-ring2{position:relative;display:inline-flex;animation:sgxPop .6s both}
.sgx-ek{margin-top:22px;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#3d8a1b}
.sgx-celb h1{margin:6px 0 0;font-size:34px;line-height:1.1;font-weight:700;letter-spacing:-.5px;color:#163d0c}.sgx-celb p{margin:10px 0 0;font-size:16px;line-height:1.45;color:#4a524c;max-width:300px}
.sgx-mini{width:100%;margin-top:30px}.sgx-mini .sgx-scene{height:140px}
.sgx-two{display:flex;gap:10px}.sgx-two .sg-cta{flex:1;display:flex;align-items:center;justify-content:center;gap:6px}
</style>`);

LV.goalring=()=>{const g=sgDemo();return `${ldGlow()}<div class="lv-mid"><div class="sgx-lcard rise"><div class="sgx-hero">${sgScene(g,62,{})}<div class="sgx-num"><b>62%</b><em>saved together</em></div></div><div class="sgx-bd" style="margin-top:14px">${SG_MS.map(([v,l,i0])=>`<div class="sgx-b ${62>=v?'on':''}"><span style="width:38px;height:38px">${sgGlyph(i0,18,62>=v?'#fff':'#9aa69c')}</span><b>${l}</b></div>`).join('')}</div></div></div>`};
document.head.insertAdjacentHTML('beforeend',`<style>.sgx-lcard{width:320px;padding:10px 10px 14px;border-radius:30px;background:#f5f7f2;box-shadow:0 24px 50px rgba(0,0,0,.45)}.sgx-lcard .sgx-scene{height:190px;border-radius:22px}.sgx-lcard .sgx-num b{font-size:38px}</style>`);
LFX.split[3]=()=>`<div class="lx lx-card"><span class="lx-img" style="background:linear-gradient(145deg,#7cd14e,#2f8a14);align-items:center">${sgGlyph('flag',22,'#fff')}</span><div><em class="lx-k">Milestone unlocked</em><b>Halfway, together</b><em>You and Sam crossed 50%</em></div></div>`;

/* ================= Skip and Stash v3: a home for your skips ================= */
const SS_MS=[[1,'First skip','sprout'],[5,'Five skips','star'],[10,'Ten skips','flag'],[25,'25 skips','peak'],[50,'50 skips','trophy']];
function ssStats(){if(!S.ssStats)S.ssStats={skips:14,stashed:84,days:{2:'s',5:'k',6:'s',8:'k',9:'s',12:'k',13:'s',15:'s',19:'k',20:'s',22:'k',23:'s',26:'k'}};return S.ssStats}
function ssCup(sz){return `<div class="ld-cup" style="transform:scale(${sz||.7})"><span></span></div>`}
const SS_QUICK=[['Coffee',6,'cup'],['Takeout',14,'bag'],['Rideshare',14,'car'],['Something else',10,'plus']];
function ssQIc(k){return k==='cup'?ssCup(.55):k==='car'?sgGlyph('car',22,'#2f7a12'):k==='bag'?`<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l-1.2 12H6.2z M9 8V6a3 3 0 0 1 6 0v2" fill="none" stroke="#2f7a12" stroke-width="1.8" stroke-linejoin="round"/></svg>`:ic('plus',20)}
function ssCal(st){const first=4,days=31,today=26;const cells=[];for(let i=0;i<first;i++)cells.push('<i class="e"></i>');
 for(let d=1;d<=days;d++){const v=st.days[d];cells.push(`<i class="${v==='s'?'st':v==='k'?'sk':''} ${d===today?'td':''} ${d>today?'fu':''}">${v==='s'?ic('check',11):d}</i>`)}
 const nSt=Object.values(st.days).filter(v=>v==='s').length,nSk=Object.values(st.days).length;
 return `<div class="sgx-card"><div class="sgx-ch"><div><b>October</b><em>${nSk} skip days · ${nSt} stashed</em></div><span class="sgx-fire">${ic2('flame',14)} ${plw(S.streak)}</span></div>
  <div class="ssx-dow">${['S','M','T','W','T','F','S'].map(x=>`<span>${x}</span>`).join('')}</div><div class="ssx-cal">${cells.join('')}</div>
  <div class="sgx-leg"><span><i class="w2"></i>Stashed</span><span><i class="w1"></i>Skipped, not stashed yet</span></div></div>`}
function ssBadges(n,nx){return `<div class="sgx-card"><div class="sgx-ch"><div><b>Milestones</b><em>${nx?`${nx[0]-n} more skip${nx[0]-n===1?'':'s'} to ${nx[1]}`:'All five reached'}</em></div></div>
  <div class="sgx-bd">${SS_MS.map(([v,l,i0])=>`<div class="sgx-b ${n>=v?'on':''}"><span>${sgGlyph(i0,22,n>=v?'#fff':'#9aa69c')}</span><b>${l}</b></div>`).join('')}</div>${nx?`<div class="sgx-nb" style="margin-top:14px"><i style="width:${Math.round(n/nx[0]*100)}%"></i></div>`:''}</div>`}
/* the app's tab bar under the hub: shown for context, taps are inert */
function ssTabs(){return acTabs('ac-home').replace(/onclick="[^"]*"/g,'onclick="toast(\'Existing app tabs, unchanged\')"')}
const SS_TABS=[['stash','Stash'],['together','Together'],['progress','Progress']];
def('ss-hub',()=>{spInit();const st=ssStats();const prev=T.ssPrev!=null?T.ssPrev:Math.max(0,st.stashed-18);const nx=SS_MS.find(m=>st.skips<m[0]);const tab=T.ssTab||'stash';
 const jars=S.jars&&S.jars.length?S.jars:[{id:'j1',name:'Coffee jar',est:6,coins:3}];
 const log=(S.skipLog&&S.skipLog.length?S.skipLog:[{t:'Coffee',amt:6,src:'quick',when:'Today',stash:true},{t:'Coffee jar',amt:6,src:'self',when:'Fri',stash:false},{t:'Takeout',amt:14,src:'quick',when:'Wed',stash:true}]).slice(0,4);
 const sec={
  stash:`<div class="ssx-q"><div class="ssx-qh"><b>Skipped something today?</b><em>Tap it and invest what you didn’t spend</em></div>
   <div class="ssx-qg">${SS_QUICK.map(([n,a,k])=>`<button onclick="T={qsItem:'${n==='Something else'?'Other':n}',qsAmt:${a}};S.ret='ss-hub';go('qs-lt')"><span>${ssQIc(k)}</span><b>${n}</b><em>${n==='Something else'?'Pick it':'About $'+a}</em></button>`).join('')}</div></div>
   <div class="sgx-card"><div class="sgx-ch"><div><b>Not ready to invest it yet?</b><em>Drop a coin in a jar. Stash the jar when it’s full.</em></div></div>
   ${jars.map(j=>`<div class="ssx-jr" onclick="go('jar',{id:'${j.id}'})" role="button"><div class="ssx-mj">${jarViz(j,0)}</div><div class="grow"><b>${j.name}</b><em>${j.coins} skip${j.coins===1?'':'s'} · about $${j.coins*j.est}</em></div><button onclick="event.stopPropagation();T={jar:'${j.id}',qsItem:'${j.name.replace(' jar','')}',qsAmt:${Math.max(5,j.coins*j.est)}};S.ret='ss-hub';go('qs-lt')">Stash</button></div>`).join('')}
   <button class="ssx-new" onclick="go('jar-new')">${ic('plus',16)} New jar</button></div>
   <p class="sgx-priv">${ic('lock',12)} Only you see amounts. We never read your spending unless you turn on Spot my skips.</p>`,
  together:`<div class="sgx-card ssx-week" onclick="go('gt-ch-detail',{id:'c-skip'})" role="button"><div class="sgx-ch"><div><b>No-delivery week</b><em>Skip Week · Day 5 of 7 · with Sam, Jess and Priya</em></div>${ic('chev',16,'opacity:.4')}</div>
   <div class="ssx-days">${[1,1,1,1,0,0,0].map((v,i)=>`<i class="${v?'on':i===4?'td':''}">${v?ic('check',12):['M','T','W','T','F','S','S'][i]}</i>`).join('')}</div>
   <div class="ssx-crew">${['me','sam','jess','priya'].map(id=>sgAv(id,26)).join('')}<span>Check in today</span></div></div>
   <div class="sgx-card"><div class="sgx-ch"><div><b>Start a Skip Week</b><em>Pick one thing to skip for 3 or 7 days. Go solo or bring a crew. They see check-ins, never dollars.</em></div></div>
   <button class="btn sg-cta" style="height:50px" onclick="T={};S.ret='ss-hub';go('ss-why1')">${ic('plus',16)} New Skip Week</button></div>
   <p class="sgx-priv">${ic('lock',12)} People in a Skip Week only see the check-ins you confirm.</p>`,
  progress:`${ssCal(st)}${ssBadges(st.skips,nx)}
   <div class="sgx-card"><div class="sgx-ch"><div><b>Recent</b><em>Only you see amounts</em></div><button class="sgx-edit" onclick="go('ss-log')">All</button></div>
   ${log.map(e=>`<div class="sgx-f"><span class="ssx-li ${e.stash?'on':''}">${e.stash?ic('check',14):ssCup(.45)}</span><span class="grow"><b>${e.stash?'Stashed':'Skipped'} · ${e.t}</b><em>${e.when}</em></span><b class="ssx-amt ${e.stash?'':'muted'}">${e.stash?'':'~'}$${e.amt}</b></div>`).join('')}</div>`};
 return {cls:'lt sgs sgx',html:`<div class="sg-top"><button class="iconbtn" onclick="back()" aria-label="Back">${ic('back',24)}</button><b>Skip and Stash</b><button class="iconbtn" onclick="ssMore()" aria-label="More ways to skip">${ic('menu',22)}</button></div>
 <div class="sg-body sgx-body">
  <div class="ssx-hero"><div class="ssx-sky"></div><div class="ssx-hill"></div><div class="ssx-jar">${jarViz({name:'Your skips',coins:Math.min(12,Math.round(st.skips*.7))},1)}</div>
   <div class="ssx-num"><b data-count>$${st.stashed}</b><em>invested from skips</em><span>${st.skips} skips this month</span></div></div>
  <div class="ssx-seg">${SS_TABS.map(([k,l])=>`<button class="${tab===k?'on':''}" onclick="T.ssTab='${k}';refresh()">${l}</button>`).join('')}</div>
  <div class="ssx-sec" key="${tab}">${sec[tab]}</div>
 </div>${ssTabs()}`,mount(el){const n=el.querySelector('[data-count]');if(n){const to=st.stashed,t0=performance.now();const f=t=>{const k=Math.min(1,(t-t0)/1000),e=1-Math.pow(1-k,3);n.textContent='$'+Math.round(prev+(to-prev)*e);if(k<1)requestAnimationFrame(f)};requestAnimationFrame(f)}T.ssPrev=st.stashed}}});
/* everything optional lives behind the menu: rules, review, detection, reminders, settings */
function ssMore(){sheet(`<div class="h3">More ways to skip</div><p class="sm mt8">Skip and Stash works with a tap. These are optional.</p><div class="mt12">
  ${[['Skip Rules','Stash automatically when you check in “Skipped it”',"go('sr-intro')",'gear'],['Sunday review','Count the week’s skips in one place',"go('ss-review')",'cal'],['Spot my skips',S.detect&&S.detect.on?`On · ${S.detect.cats.join(', ')}`:'Off. We never read spending unless you turn this on',"go(S.detect&&S.detect.on?'ss-settings':'ss-detect')",'spark'],['Reminder preview','What a check-in looks like on your lock screen',"T.lk=null;go('ss-lock')",'bell'],['Settings','Reminders, jars and detection',"go('ss-settings')",'gear']].map(([t,d,a,i])=>`<div class="li" onclick="closeOv();setTimeout(()=>{${a.replace(/"/g,'&quot;')}},200)">${ic(i,20)}<div class="grow"><div class="ttl">${t}</div><div class="sub">${d}</div></div>${ic('chev',18,'opacity:.35')}</div>`).join('')}</div>`)}
document.head.insertAdjacentHTML('beforeend',`<style>
.ssx-seg{position:sticky;top:-4px;z-index:3;display:flex;gap:4px;margin:12px 0 0;padding:4px;border-radius:18px;background:#e9ede4}.ssx-seg button{flex:1;height:40px;border-radius:14px;font-size:14px;font-weight:600;color:#5d655f}.ssx-seg button.on{background:#fff;color:#191919;box-shadow:0 2px 8px rgba(0,0,0,.08)}
.ssx-sec{animation:ssxSec .35s cubic-bezier(.2,.8,.2,1) both}@keyframes ssxSec{from{opacity:0;transform:translateY(8px)}}
.ssx-sec>.ssx-q{margin-top:12px}
</style>`);
def('qs-lt',()=>{if(!T.qsItem){T.qsItem='Coffee';T.qsAmt=6}const a=T.qsAmt,jar=T.jar&&S.jars.find(j=>j.id===T.jar);const name=jar?jar.name:T.qsItem;const counts=!S.invested||S.reset;
 return {cls:'lt sgs sgx',html:`<div class="sg-top"><button class="iconbtn" onclick="back()" aria-label="Back">${ic('back',24)}</button><b>${jar?jar.name:'Quick Stash'}</b><span style="width:44px"></span></div>
 <div class="sg-body sgx-body">
  <div class="qsl-stage"><div class="qsl-cup"><div class="ld-cup"><span></span></div><div><b>${name}</b><em>${jar?`${jar.coins} skips`:'Skipped today'}</em></div></div><img class="qsl-acorn" src="${IMG.acorn}" alt=""><div class="qsl-hint">Hold the button and it turns into an investment</div></div>
  ${jar?'':`<div class="qsl-chips">${SS_QUICK.slice(0,3).concat([['Impulse buy',20,'plus'],['Other',10,'plus']]).map(([c,e])=>`<button class="${T.qsItem===c?'on':''}" onclick="T.qsItem='${c}';T.qsAmt=${e};refresh()">${c}</button>`).join('')}</div>`}
  <div class="qsl-amt" onclick="keypad(T.qsAmt,v=>{T.qsAmt=v;refresh()},'Stash')"><span>$</span>${a}</div><div class="qsl-est">${jar?`${jar.coins} skips × about $${jar.est}`:'Your estimate'} · <u onclick="keypad(T.qsAmt,v=>{T.qsAmt=v;refresh()},'Stash')">Edit</u></div>
  ${a<5?`<div class="qsl-min">${ic('lock',14)} The minimum stash is $5. <u onclick="T.qsAmt=5;refresh()">Make it $5</u></div>`:''}
  <div class="sgx-card" style="padding:4px 16px">${[['From',`${S.accounts[0].name} ••${S.accounts[0].mask}`],['Into','Invest account · today'],['Streak',counts?'Counts this week':'Already counted this week']].map(([k,v])=>`<div class="sg-r"><span>${k}</span><b>${v}</b></div>`).join('')}</div>
  <p class="sgx-priv" style="margin-top:12px">A real one-time investment. Nothing moves until you hold.</p></div>
 <div class="sg-foot" style="text-align:center">${a<5?`<button class="btn sg-cta" disabled>Hold to stash $${a}</button>`:holdBtn('stash $'+a,'qsStash()','light')}</div>`}});
document.head.insertAdjacentHTML('beforeend',`<style>
.qsl-stage{position:relative;height:210px;border-radius:28px;overflow:hidden;background:radial-gradient(circle at 50% 110%,#cfe9b8,#e9f7dc 55%,#f3faec);display:flex;align-items:center;justify-content:center}
.qsl-cup{position:absolute;display:flex;align-items:center;gap:12px;padding:12px 18px 12px 12px;border-radius:20px;background:#fff;box-shadow:0 10px 24px rgba(20,60,10,.10);transform:scale(calc(1 - var(--p,0)*.85)) translateY(calc(var(--p,0)*-20px));opacity:calc(1 - var(--p,0)*1.2)}
.qsl-cup b{display:block;font-size:17px}.qsl-cup em{display:block;font-style:normal;font-size:13px;color:#5d655f;margin-top:1px}
.qsl-acorn{position:absolute;height:120px;transform:scale(calc(.25 + var(--p,0)*.75)) rotate(calc(-14deg + var(--p,0)*14deg));opacity:calc(var(--p,0)*1.4);filter:drop-shadow(0 12px 18px rgba(20,60,10,.22))}
.qsl-hint{position:absolute;left:0;right:0;bottom:14px;text-align:center;font-size:12px;font-weight:600;color:#3f5a37;opacity:calc(.9 - var(--p,0)*1.5)}
.qsl-chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}.qsl-chips button{height:38px;padding:0 15px;border-radius:19px;background:#fff;font-size:14px;font-weight:600;color:#191919}.qsl-chips button.on{background:#191919;color:#fff}
.qsl-amt{margin-top:22px;text-align:center;font-size:64px;font-weight:600;letter-spacing:-2.5px;line-height:1;color:#163d0c}.qsl-amt span{font-size:32px;vertical-align:24px;margin-right:2px;color:#6b706c;letter-spacing:0}
.qsl-est{margin-top:8px;text-align:center;font-size:13px;color:#6b706c}.qsl-est u,.qsl-min u{text-decoration:none;color:#2f7a12;font-weight:600;cursor:pointer}
.qsl-min{display:flex;align-items:center;gap:6px;margin-top:14px;padding:10px 14px;border-radius:14px;background:#fdf3d3;color:#6b5310;font-size:13px}
.sgx .hold.light{height:56px;border-radius:28px;font-size:17px}.sgx .hold-alt{color:#2f7a12;opacity:1}
</style>`);
function qsStash(){if(S.offline){go('qs-offline');return}const a=T.qsAmt,item=T.qsItem,jar=T.jar&&S.jars.find(j=>j.id===T.jar);const c=creditWeek();S.qsUsed=true;S.stashThisWeek=(S.stashThisWeek||0)+1;
 S.skipLog.unshift({t:jar?jar.name:item,amt:a,src:T.src||(jar?'jar':'quick'),when:'Today',stash:true});if(jar){jar.coins=0;jar.last=Date.now()}if(T.combo){T.combo.forEach(id=>{const j=S.jars.find(x=>x.id===id);if(j)j.coins=0})}
 const st=ssStats();const from=st.stashed,sk0=st.skips;st.stashed+=a;st.skips+=jar?Math.max(1,Math.round(a/(jar.est||6))):1;st.days[26]='s';const ms=SS_MS.find(m=>sk0<m[0]&&st.skips>=m[0]);save();
 stack.pop();go('ss-stashed',{amt:a,item:jar?jar.name:item,from,to:st.stashed,counted:c.counted,wk:c.to,ms:ms?ms[0]:0})}
def('ss-stashed',p=>{const m=SS_MS.find(x=>x[0]===p.ms);
 return {cls:'lt sgs sgx sgx-cel',html:`<div class="sg-top"><span style="width:44px"></span><span></span><button class="iconbtn" onclick="T.ssPrev=${p.to};back()" aria-label="Close">${ic('close',22)}</button></div>
 <div class="sgx-celb"><div class="ssx-cjar">${m?`<div class="sgx-badge pop"><span>${sgGlyph(m[2],44,'#fff')}</span></div>`:`<div class="ssx-acorn"><span class="ssx-was">${ssCup(.5)}<b>${String(p.item).replace(/ jar$/i,'')}</b></span><img class="pop" src="${IMG.acorn}" alt=""></div>`}</div>
  <div class="sgx-ek">${m?'Milestone unlocked':'Skipped it. Stashed it.'}</div><h1>${m?m[1]+'!':'$'+p.amt+' invested'}</h1>
  <p>${m?`${m[0]} skip${m[0]===1?'':'s'} turned into investments. The $${p.amt} from ${String(p.item).toLowerCase()} just went to Invest.`:`The ${String(p.item).toLowerCase()} you didn’t buy is now in your Invest account.`}</p>
  <div class="ssx-tot"><div><em>Invested from skips</em><b data-count>$${p.to}</b></div><div class="ssx-wkc">${ic2('flame',18)}<span><b>${p.counted?`Week ${p.wk}`:'This week'}</b><em>${p.counted?'This week counts':'Already counted'}</em></span></div></div></div>
 <div class="sg-foot sgx-two"><button class="btn sg-cta ghost" onclick="ssShare('${String(p.item).replace(/'/g,'')}',${p.ms||0})">${ic('share',16)} Share</button><button class="btn sg-cta" onclick="T.ssPrev=${p.to};back()">Done</button></div>`,
 mount(el){const n=el.querySelector('[data-count]');if(n){const t0=performance.now();const f=t=>{const k=Math.min(1,(t-t0)/900),e=1-Math.pow(1-k,3);n.textContent='$'+Math.round(p.from+(p.to-p.from)*e);if(k<1)requestAnimationFrame(f)};requestAnimationFrame(f)}setTimeout(()=>{ART.confetti($('#screen'),m?80:28);haptic(m?30:12)},250)}}});
/* Share a stash: skips and milestones only, never amounts */
function ssShare(item,ms){const st=ssStats();const m=SS_MS.find(x=>x[0]===ms);const it=String(item||'it').replace(/ jar$/i,'').toLowerCase();
 const card=storyCard({eyebrow:m?'Milestone':'Skip and Stash',title:m?`${m[1]}, turned into investments.`:`Skipped ${it}. Invested it instead.`,sub:`${st.skips} skips this month, every one invested.`,art:`<img src="${IMG.acorn}" alt="">`});
 share({title:m?`${m[1]} on Acorns`:'Skipped it. Stashed it.',story:card,text:m?`${m[0]} skips turned into investments. Skip something with me this week?`:`Skipped ${it} today and invested it instead. Skip something with me this week?`})}
LFX['skip-and-stash']=['ss-hub',{},'Skipped coffee? Tap it, and the $6 you didn’t spend is invested. Save skips in a jar, or run a Skip Week with friends. Every stash counts toward your streak.',()=>`<div class="lx lx-card"><div class="ld-cup" style="transform:scale(.75);margin:-6px"><span></span></div><div><em class="lx-k">Milestone unlocked</em><b>Ten skips</b><em>$84 invested from skips</em></div></div>`];
document.head.insertAdjacentHTML('beforeend',`<style>
.ssx-hero{position:relative;height:230px;border-radius:28px;overflow:hidden;background:linear-gradient(170deg,#e9f7dc,#d5efc2)}
.ssx-sky{position:absolute;inset:0;background:radial-gradient(circle at 78% 18%,rgba(255,255,255,.9),transparent 45%)}
.ssx-hill{position:absolute;left:-20%;right:-20%;bottom:-60px;height:130px;border-radius:50%;background:linear-gradient(#8fd068,#5fb83a)}
.ssx-jar{position:absolute;right:6%;bottom:14px;transform:scale(.82);transform-origin:bottom right}
.ssx-num{position:absolute;left:18px;top:20px}.ssx-num b{display:block;font-size:46px;font-weight:700;letter-spacing:-1.5px;line-height:1;color:#163d0c}.ssx-num em{display:block;font-style:normal;font-size:13px;font-weight:600;color:#3f5a37;margin-top:4px}
.ssx-num span{display:inline-flex;margin-top:12px;height:28px;padding:0 10px;border-radius:14px;background:rgba(255,255,255,.85);font-size:12px;font-weight:600;color:#2f4a26;align-items:center}
.ssx-q{margin-top:12px;padding:16px;border-radius:22px;background:#fff}.ssx-qh b{display:block;font-size:16px}.ssx-qh em{display:block;font-style:normal;font-size:13px;color:#6b706c;margin-top:2px}
.ssx-qg{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:12px}.ssx-qg button{display:flex;flex-direction:column;align-items:center;gap:6px;padding:12px 4px 10px;border-radius:18px;background:#f4f7f1;color:#191919}.ssx-qg button:active{transform:scale(.96)}
.ssx-qg span{width:44px;height:44px;border-radius:22px;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,.06);overflow:hidden}.ssx-qg b{font-size:12px;font-weight:600;line-height:1.2;text-align:center}.ssx-qg em{font-style:normal;font-size:11px;color:#8a958c}
.ssx-week{cursor:pointer}.ssx-days{display:flex;gap:6px}.ssx-days i{flex:1;aspect-ratio:1;border-radius:12px;background:#eef1ec;color:#8a958c;font-style:normal;font-size:12px;font-weight:600;display:flex;align-items:center;justify-content:center}.ssx-days i.on{background:#3d9a1f;color:#fff}.ssx-days i.td{box-shadow:inset 0 0 0 2px #3d9a1f;background:#fff;color:#2f7a12}
.ssx-crew{display:flex;align-items:center;margin-top:12px}.ssx-crew .sg-av+.sg-av{margin-left:-6px}.ssx-crew span{margin-left:auto;height:32px;padding:0 14px;border-radius:16px;background:#74c947;color:#0a1d08;font-size:13px;font-weight:600;display:flex;align-items:center}
.ssx-dow,.ssx-cal{display:grid;grid-template-columns:repeat(7,1fr);gap:5px}.ssx-dow span{text-align:center;font-size:11px;font-weight:600;color:#9aa69c;margin-bottom:4px}
.ssx-cal i{aspect-ratio:1;border-radius:50%;display:flex;align-items:center;justify-content:center;font-style:normal;font-size:11px;color:#6b706c;background:#f4f6f2}.ssx-cal i.e{background:transparent}.ssx-cal i.fu{color:#c3cac0;background:transparent}
.ssx-cal i.sk{background:#b8e29c;color:#1f4d12;font-weight:600}.ssx-cal i.st{background:#3d9a1f;color:#fff}.ssx-cal i.td{box-shadow:0 0 0 2px #fff,0 0 0 4px #3d9a1f}
.ssx-jr{display:flex;align-items:center;gap:12px;padding:8px 0;cursor:pointer}.ssx-mj{width:64px;height:76px;display:flex;align-items:flex-end;justify-content:center;overflow:hidden}.ssx-mj>*{transform:scale(.7);transform-origin:bottom center}
.ssx-jr b{display:block;font-size:15px}.ssx-jr em{display:block;font-style:normal;font-size:13px;color:#6b706c;margin-top:2px}.ssx-jr button{height:34px;padding:0 14px;border-radius:17px;background:#74c947;color:#0a1d08;font-size:13px;font-weight:600}
.ssx-new{display:flex;align-items:center;justify-content:center;gap:6px;width:100%;height:42px;margin-top:8px;border-radius:14px;border:1.5px dashed #cfd8ca;color:#2f7a12;font-size:14px;font-weight:600}
.ssx-ways{display:grid;grid-template-columns:1fr 1fr;gap:8px}.ssx-ways button{padding:12px;border-radius:16px;background:#f4f7f1;text-align:left;color:#191919}.ssx-ways b{display:block;font-size:14px}.ssx-ways em{display:block;font-style:normal;font-size:12px;color:#6b706c;margin-top:2px}
.ssx-li{width:34px;height:34px;border-radius:17px;background:#f4f6f2;display:flex;align-items:center;justify-content:center;flex:none;overflow:hidden}.ssx-li.on{background:#3d9a1f;color:#fff}
.ssx-amt{font-size:14px;color:#2f7a12}.ssx-amt.muted{color:#8a958c}
.ssx-cjar{height:150px;display:flex;align-items:center;justify-content:center}.ssx-acorn{position:relative;display:flex;align-items:center;justify-content:center}.ssx-acorn img{height:130px;filter:drop-shadow(0 14px 22px rgba(20,60,10,.22))}.ssx-was{position:absolute;z-index:2;left:-104px;top:-12px;display:flex;align-items:center;gap:2px;padding:4px 10px 4px 4px;border-radius:14px;background:#fff;box-shadow:0 6px 16px rgba(20,60,10,.12);font-size:12px;font-weight:600;color:#5d655f;transform:rotate(-8deg);animation:ssxWas .6s .3s cubic-bezier(.2,1.4,.4,1) both;text-decoration:line-through;text-decoration-color:#c7cfc3}@keyframes ssxWas{from{opacity:0;transform:rotate(-8deg) translateY(10px)}}.ssx-drop{width:110px;height:110px;border-radius:55px;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 10px rgba(116,201,71,.18),0 16px 36px rgba(60,140,30,.25);animation:sgxPop .6s cubic-bezier(.2,1.5,.4,1) both}
.ssx-tot{width:100%;margin-top:22px;display:flex;gap:10px}.ssx-tot>div{flex:1;padding:14px;border-radius:20px;background:#fff;text-align:left}.ssx-tot em{display:block;font-style:normal;font-size:12px;color:#6b706c}.ssx-tot b{display:block;font-size:26px;font-weight:700;color:#2f7a12;margin-top:2px}
.ssx-wkc{display:flex;align-items:center;gap:10px;color:#3d9a1f}.ssx-wkc b{font-size:16px!important;color:#191919!important}.ssx-wkc em{margin-top:2px}
</style>`);


/* Acorns Year story: the cards themselves are the beats */
Object.assign(LV,{
 yrwin:()=>`${ldGlow()}<div class="lv-mid"><div class="yr-ms">${[[sgGlyph('sprout',28,'#fff'),'First investment','Your streak starts'],[`<div class="ld-cup" style="transform:scale(.6);margin:-14px"><span></span></div>`,'Ten skips stashed','Skip and Stash'],[sgGlyph('flag',28,'#fff'),'Halfway to a shared goal','Saving with someone'],[`<img src="${IMG.seedling}" style="height:34px" alt="">`,'A friend plants beside you','Your grove']].map(([g,t,w],i)=>`<div class="yr-m rise d${Math.min(5,i*2)}"><span class="sgx-badge" style="width:60px;height:60px">${g}</span><div><b>${t}</b><em>${w}</em></div></div>`).join('')}</div></div>`,
 yrrecap:()=>`${ldGlow()}<div class="lv-mid"><div class="rise" style="width:210px">${ycFrame(`<div class="yc" style="background-image:url(${YART}y-cover.jpg)"><span class="yc-chip" style="left:18px;top:18px">Monthly recap</span><div class="yc-panel" style="top:430px;height:194px"><div class="yc-h">Your month,<br>grown.</div><div class="yc-s">How many weeks you showed up, and what’s new on your oak.</div>${ycFoot()}</div></div>`,210)}</div></div>`,
 yrwrap:()=>`${ldGlow()}<div class="lv-mid"><div class="lv-fan">${[1,0,2].map((k,i)=>`<div class="lv-fc rise d${i*2}" style="transform:rotate(${[-10,0,10][i]}deg) translateY(${[14,0,14][i]}px)">${ycFrame(k===0?yCard(0,{share:1}):yBack(k===1?'Weeks':'Consistency'),132)}</div>`).join('')}</div></div>`,
 yrpride:()=>`${ldGlow()}<div class="lv-mid"><div class="lv-fan" style="gap:0"><div class="lv-fc rise" style="margin:0 -6px;transform:rotate(-5deg) translateY(10px)">${ycFrame(yBack('Weeks you showed up'),168)}</div><div class="lv-fc rise d2" style="margin:0 -6px;transform:rotate(5deg)">${ycFrame(yBack('How consistent you were'),168)}</div></div></div>`,
 yrinvite:()=>`${ldGlow()}<div class="lv-mid"><div class="ld-msg rise"><div class="ld-msg-hd"><span class="av-c" style="background:#e8a45c">J</span><div><b>Jess</b><em>Text message</em></div></div><div class="ld-msg-body"><div class="lv-bub">my acorns year is in 🌳</div><div style="width:150px;margin:8px 0 0 auto">${ycFrame(yCard(0,{share:1}),150)}</div><div class="ld-msg-meta">Delivered</div></div><div class="ld-msg-body in" style="margin-top:8px"><div class="lv-bub" style="background:#e9e9eb;color:#191919">ok starting mine today</div><div class="ld-msg-meta">Just now</div></div></div></div>`});
document.head.insertAdjacentHTML('beforeend','<style>.ld-art.mock .ycf .yc{box-shadow:0 30px 60px rgba(0,0,0,.55)}.yr-ms{display:flex;flex-direction:column;gap:10px;max-height:100%;justify-content:center}.yr-m{display:flex;align-items:center;gap:14px;width:290px;padding:9px 14px 9px 9px;border-radius:20px;background:rgba(255,255,255,.96);color:#191919;box-shadow:0 20px 44px rgba(0,0,0,.4)}.yr-m b{display:block;font-size:16px}.yr-m em{display:block;font-style:normal;font-size:12px;color:#6b706c;margin-top:1px}.yr-m .sgx-badge{width:48px!important;height:48px!important;font-size:22px!important}.yr-m .sgx-badge svg{width:22px;height:22px}.yr-m .sgx-badge{box-shadow:0 0 0 5px rgba(116,201,71,.18)}</style>');

/* a face-down Year card: the story runs before the year is in */
function yBack(label){return `<div class="yc yc-back"><div class="yc-back-in"><img src="${IMG.acorn}" alt=""><b>${label}</b><em>Unlocks in December</em></div></div>`}
document.head.insertAdjacentHTML('beforeend','<style>.yc-back{background:linear-gradient(160deg,#2f7a12,#174512 70%,#0f2e0b)!important;display:flex;align-items:center;justify-content:center;box-shadow:inset 0 0 0 10px rgba(255,255,255,.08)}.yc-back-in{display:flex;flex-direction:column;align-items:center;gap:12px;text-align:center;padding:0 40px}.yc-back-in img{height:110px;filter:drop-shadow(0 14px 22px rgba(0,0,0,.35));opacity:.95}.yc-back-in b{font-size:30px;line-height:1.1;color:#fff;letter-spacing:-.5px}.yc-back-in em{font-style:normal;font-size:14px;color:#bceaa3;font-weight:600}</style>');
/* the Year story celebrates as it goes: confetti on the milestone and pride beats */
(function(){const f=SCR.splash;SCR.splash=p=>{const r=f(p);if(p.k==='year'&&p.b===0){const m=r.mount;r.mount=el=>{if(m)m(el);setTimeout(()=>{ART.confetti($('#screen'),24);haptic(8)},350)}}return r}})();

/* Invite story: rain on a friend's tree, then on yours */
LV.ivrain=()=>`<div class="lv-forest">${hills({dark:1})}<div class="lv-glow" style="background:radial-gradient(closest-side,rgba(77,161,239,.25),transparent)"></div><div class="lv-drops">${Array.from({length:14},(_,i)=>`<i style="left:${18+(i*23)%64}%;animation-delay:${(i%7)*.2}s"></i>`).join('')}</div><div class="lv-row" style="gap:30px;position:relative;z-index:1"><img class="rise" src="${IMG.oak}" style="height:180px" alt=""><img class="rise d2" src="${IMG.seedling}" style="height:120px;filter:saturate(.7)" alt=""></div></div>`;

/* Invite story: the ways you help, three cards */
LV.ivways=()=>`${ldGlow()}<div class="lv-mid"><div class="yr-ms">${[[ic('drop',26,'color:#fff'),'#4da1ef','Send rain','A gentle nudge on an off week'],['♥','#e8a45c','Cheer','“Proud of us.” “See you Friday.”'],[sgGlyph('flag',26,'#fff'),'#2f8a14','Dare them','8 weeks side by side, no skipping']].map(([g,c,t,w],i)=>`<div class="yr-m rise d${i*2}"><span class="sgx-badge" style="width:60px;height:60px;background:${c};font-size:26px;color:#fff">${g}</span><div><b>${t}</b><em>${w}</em></div></div>`).join('')}</div></div>`;
/* Invite story, beat 1: one small seedling on a wide, empty hill, with an open spot beside it */
LV.alone=()=>`<div class="lv-forest">${hills({dark:1})}<div class="lv-glow" style="opacity:.5"></div><div class="lv-row" style="gap:44px;align-items:flex-end"><img class="rise" src="${IMG.seedling}" style="height:86px;filter:saturate(.75)" alt=""><div class="rise d3" style="margin-bottom:6px;opacity:.55">${spot('')}</div></div></div>`;
