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
 grove:{name:'your grove',beats:[['forest','Habits are hard…'],['pair','until someone grows with you.'],['grove','Invite your people. Your oaks grow side by side.'],['rain','Send a little rain when someone needs a nudge.'],['weeks','One investment counts for everyone it fits.']],
  t:'Welcome to your grove',s:'Plant someone beside you. You see each other’s oaks and weeks. Nobody sees a balance.',where:'Lives in Streaks: tap your oak or the streak chip on Home, then Grove.',cta:'Open my grove'},
 invite:{name:'invites',beats:[['link','Text a friend your invite.'],['days','You each pick the day you invest.'],['pair','Their first investment plants a tree beside yours.'],['grove','Then you cheer each other on, week by week.']],
  t:'Invite someone',s:'You send it yourself. Their tree plants after their first real investment. Rewards follow the Referrals program.',where:'Lives on Home → “$500”, and any open spot in your grove.',cta:'Invite someone'},
 'money-type':{name:'Money Type',beats:[['forest','Not sure where to start?'],['quiz','Three quick questions…'],['type','find your money type.'],['handoff','Then you set it up in the Recurring or Round-Ups® you already have.']],
  t:'Find your money type',s:'About habits only. It never changes your portfolio or risk.',where:'Right after sign-up, and a banner on Home.',cta:'Start'},
 'skip-and-stash':{name:'Skip and Stash',beats:[['coffee','Skipped coffee today?'],['jar','That’s money you didn’t spend.'],['grow','Stash it in one hold, and your week counts.']],
  t:'Skip it, stash it',s:'Quick Stash, a Skip Jar, or a Skip Week with friends. Works without ever reading your spending.',where:'Lives in a banner on Home, and reminders you set.',cta:'Pick how to skip'},
 split:{name:'Money Manager',beats:[['mm','Your Money Manager split…'],['mm','already works every payday.'],['flour','Now it counts toward your streak.'],['weeks','Investing counts for the week. Saving adds a nest to your oak.']],
  t:'Money Manager, growing',s:'Your split stays exactly the same. Grow Together just shows it growing.',where:'Lives in Money Manager, from the Money Hub tab. One small card explains it.',cta:'Open Money Manager'},
 'future-club':{name:'Future Club',beats:[['note','Some notes…'],['later','are meant for later.'],['sapling','For your kid, every approved note blooms a leaf.']],
  t:'Future Club',s:'A capsule that opens on a date for you, or a sapling for your kid that family can add to.',where:'Lives on Home → Kids, on your kid’s Early account.',cta:'Start a club'},
 year:{name:'Acorns Year',beats:[['forest','This year…'],['weeks','you showed up 48 weeks.'],['cards','Every card tells part of it.'],['cards','Together, they tell your year.']],
  t:'Your Acorns Year',s:'Six cards made to share. Weeks and counts only. Never balances or returns.',where:'Lives on Home in December, with a recap every month.',cta:'Watch my year'},
 challenges:{name:'Challenges',beats:[['forest','Better together…'],['ch','A no-delivery week. 8 weeks side by side.'],['weeks','One investment counts toward every challenge.']],
  t:'Challenges',s:'Run as many as you like with anyone in your grove.',where:'Lives in Streaks → Challenges, and on any tree in your grove.',cta:'See challenges'},
 invited:{name:'invites',beats:[['phone','Sam gets Jordan’s invite.'],['paths','New or already on Acorns, the link takes Sam to the right step.'],['pair','After Sam’s first investment, their trees grow side by side.']],
  t:'Getting invited',s:'Already on Acorns, brand new, signed out, an old link, under 18. Each one is mapped.',where:'Starts from a text, a story or a QR code.',cta:'See every path'}};
def('splash',p=>{const k=p.k in LANDERS?p.k:'grove';const L=LANDERS[k],S0=SPL[k]||SPL.grove;const n=L.beats.length;const b=Math.min(p.b||0,n);const fin=b===n;
  const bars=`<div class="ld-bars">${Array.from({length:n},(_,i)=>`<i class="${i<b||fin?'on':''}"></i>`).join('')}</div>`;
  const top=`<div class="ld-top"><button class="iconbtn" onclick="${b>0&&!fin?`ldGo(${b-1})`:'back()'}" aria-label="${b>0&&!fin?'Previous':'Close'}" style="color:#fff">${ic(b>0&&!fin?'back':'close')}</button>${fin?'<div style="flex:1"></div>':bars}<button class="ld-skip" onclick="ldGo(${fin?0:n})">${fin?'Replay':'Skip intro'}</button></div>`;
  if(fin)return {cls:'dark ldr',html:`${top}<div class="ld-art fin">${LV[L.beats[n-1][0]]()}</div>
    <div class="ld-fin"><h1 class="ld-h">${L.t}</h1><p class="ld-s">${L.s}</p>
     <div class="ld-info">${ic('home',18)}<div><b>Where it lives</b><span>${L.where}</span></div></div></div>
    <div class="foot">${btn(L.cta,`(function(){${S0.go.replace(/"/g,'&quot;')}})()`,'pri','style="background:#3f8f1f;color:#fff"')}</div>`};
  const [v,line]=L.beats[b];return {cls:'dark ldr',html:`${top}<div class="ld-tap" onclick="ldGo(${b+1})"><div class="ld-art ${LD_MOCK.has(v)?'mock':''}" key="${b}">${LV[v]()}</div><div class="ld-line">${line}</div></div>
   <div class="ld-next"><button onclick="ldGo(${b+1})" aria-label="Next">${ic('back',20,'transform:rotate(180deg)')}</button></div>`,mount(){haptic(4)}}});
function ldThread(o){const lp=`<div class="ld-lp"><div class="ld-lp-img"><img src="${IMG.oak}" alt=""></div><div class="ld-lp-tx"><b>Join ${S.me}’s grove</b><span>acorns.com/j/${S.me.toLowerCase()}</span></div></div>`;
 return `${ldGlow()}<div class="lv-mid"><div class="ld-msg rise"><div class="ld-msg-hd"><span class="av-c" style="background:${o.c}">${o.who[0]}</span><div><b>${o.who}</b><em>Text message</em></div></div><div class="ld-msg-body ${o.in?'in':''}"><div class="lv-bub">${o.text}</div>${lp}<div class="ld-msg-meta">${o.in?'Just now':'Delivered'}</div></div></div></div>`}
const LD_MOCK=new Set(['days','later','link','quiz','type','handoff','coffee','mm','note','cards','ch','phone','paths','weeks']);
function ldGo(b){const t=stack[stack.length-1];t.params=Object.assign({},t.params,{b});refresh()}
(function(){const st=document.createElement('style');st.textContent=`
.scr.ldr{background:#222a20!important}
.ld-top{display:flex;align-items:center;gap:10px;padding:var(--safeTop) 8px 0 4px;height:calc(var(--safeTop) + 52px);position:relative;z-index:5}
.ld-bars{flex:1;display:flex;gap:6px;padding:0 6px}.ld-bars i{flex:1;height:3px;border-radius:2px;background:rgba(255,255,255,.22);display:block;transition:background .3s}.ld-bars i.on{background:#fff}
.ld-skip{font-size:13px;font-weight:600;color:#fff;height:44px;padding:0 10px;white-space:nowrap}
.ld-tap{flex:1;display:flex;flex-direction:column;cursor:pointer;-webkit-user-select:none;user-select:none;min-height:0}
.ld-art{position:relative;height:56%;margin-top:-4px;overflow:hidden;animation:fadeIn .5s ease both}.ld-art.fin{height:34%;opacity:.9}
.ld-line{padding:26px 32px 0;text-align:center;font-size:29px;font-weight:600;line-height:1.24;letter-spacing:-.3px;color:#fff;animation:ldUp .55s cubic-bezier(.2,.9,.25,1) both}
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
