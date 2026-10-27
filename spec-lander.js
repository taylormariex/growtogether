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
 invite:{name:'invites',beats:[['link','Text a friend your invite.'],['days','You each pick the day you invest.'],['pair','Their first investment plants a tree beside yours.'],['grove','Then you cheer each other on, week by week.']],
  t:'Invite someone',s:'You send the invite yourself. Their tree appears after their first investment. Rewards follow the Referrals program.',where:'Lives in Profile → Invite friends, and any open spot in your grove.',cta:'Invite someone'},
 'money-type':{name:'Money Type',beats:[['forest','Not sure where to start?'],['quiz','Answer three quick questions.'],['type','We’ll match you with a first habit.'],['handoff','Then set it up in Recurring or Round-Ups®, tools you already have.']],
  t:'Find your money type',s:'Based on your habits only. It never changes your portfolio or risk.',where:'Right after sign-up, and a banner on Home.',cta:'Start'},
 'skip-and-stash':{name:'Skip and Stash',beats:[['coffee','Skipped coffee today?'],['jar','That’s money you didn’t spend.'],['skipinv','Invest it in one tap, and this week counts toward your streak.']],
  t:'Skip it, stash it',s:'Invest a skip right away, save skips in a jar, or do a Skip Week with friends. We never need to read your spending.',where:'Lives in a banner on Home, and reminders you set.',cta:'Pick how to skip'},
 split:{name:'Shared goals',beats:[['mm','Money Manager already splits every paycheck for you.'],['goalpick','Now add a slice for a goal you share with someone.'],['goalways','Or add to it your way: a recurring transfer, or money anytime.'],['goalinvite','Not on Acorns yet? They join from your invite.'],['goalring','You both see progress as a percent, never each other’s dollars.']],
  t:'Shared goals',s:'Save for a trip or a first apartment with someone. Add a paycheck slice, a recurring transfer, or money anytime. You both see progress, never each other’s dollars.',where:'Lives in Money Manager, from the Money Hub tab. One small card explains it.',cta:'Start a shared goal'},
 'future-club':{name:'Future Club',beats:[['note','Family can write your kid notes to read when they’re older.'],['later','Each note stays sealed until a date you pick, like their 18th birthday.'],['sapling','Every note you approve adds a leaf to their sapling.']],
  t:'Future Club',s:'Notes from family, saved for your kid to read later. Family can add a gift to their Early account too.',where:'Lives on Home → Kids, on your kid’s Early account.',cta:'Start a club'},
 year:{name:'Acorns Year',beats:[['forest','Your year at Acorns, in six cards.'],['weeks','Like the 48 weeks you invested.'],['cards','Each card works on its own when you share it.'],['cards','Together, they tell the story of your year.']],
  t:'Your Acorns Year',s:'Six cards made to share. Weeks and counts only. Never balances or returns.',where:'Lives on Home in December, with a recap every month.',cta:'Watch my year'},
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
const LD_MOCK=new Set(['goalways','goalinvite','skipinv','goalpick','goalsplit','goalring','payday','mmflow','mmnest','days','later','link','quiz','type','handoff','coffee','mm','note','cards','ch','phone','paths','weeks']);
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
 invite:['inv-pick',{},'Pick one person and a day you’ll both invest. You send the invite from your own phone, and their tree joins yours after their first investment.',()=>`<div class="lx lx-card"><span class="lx-av" style="background:#e8a45c">J</span><div><b>Jess Park</b><em>Invest on Fridays together</em></div><i class="lx-btn">Invite</i></div>`],
 'money-type':['mt2-reveal',{},'Answer three questions about how you get paid and how you spend. You get a money type and one habit to start, like Round-Ups® or $5 every Friday, set up with the tools you already have.',()=>`<div class="lx lx-card"><span class="lx-img"><img src="${IMG.roundup}" alt=""></span><div><em class="lx-k">Recommended for you</em><b>Round-Ups® on your card</b><em>Spare change, invested</em></div></div>`],
 'skip-and-stash':['jar',{id:'j1'},'Skipped coffee or takeout? Invest what you would have spent in one tap, drop skips in a jar to invest later, or do a 7-day Skip Week with friends.',()=>`<div class="lx lx-card"><div class="ld-cup" style="transform:scale(.75);margin:-6px"><span></span></div><div><b>Coffee · skipped</b><em>Invest the $6 you saved</em></div></div>`],
 split:['ac-mm',{},'Your Money Manager split doesn’t change. Each payday, the Investing slice counts as your investment for the week, so your streak keeps growing.',()=>`<div class="lx lx-card"><span class="lx-img"><img src="${IMG.oak}" alt=""></span><div><em class="lx-k">Grow Together</em><b>Your Investing slice now grows your oak</b></div></div>`],
 'future-club':['sap-home',{},'Family writes notes for your kid to read when they’re older. You approve each one, and every approved note adds a leaf to their sapling.',()=>`<div class="lx lx-note"><p>For your first bike, and every adventure after.</p><div><span style="background:#7a5af5">G</span><b>Grandma</b><em>to Ava</em></div></div>`],
 year:['journal',{},'Every December you get six cards about your year, like weeks invested and your longest streak. Share one or all six. They never show balances or returns.',()=>`<div class="lx lx-card"><span class="lx-big">48</span><div><b>weeks invested</b><em>Your Acorns Year · 2026</em></div></div>`],
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
 return {cls:'lt sgs',html:`<div class="sg-top"><button class="iconbtn" onclick="back()" aria-label="Back">${ic('back',24)}</button><b>Shared goal</b><span style="width:44px"></span></div>
 <div class="sg-body"><h1 class="sg-h">What are you saving for together?</h1>
  <div class="sg-chips">${SG_KINDS.map(([k,n])=>`<button class="${g.kind===k?'on':''}" onclick="T.sg.kind='${k}';T.sg.name='${n}';refresh()">${k}</button>`).join('')}</div>
  <label class="sg-lbl">Name</label><input class="sg-inp" value="${g.name}" oninput="T.sg.name=this.value" aria-label="Goal name">
  <label class="sg-lbl">Who’s in with you?</label>
  <div class="sg-list">${people.map(([id,n,sub])=>`<button class="sg-who ${g.who===id?'on':''}" onclick="T.sg.who='${id}';refresh()">${sgAv(id)}<span class="grow"><b>${n}</b><em>${sub}</em></span><i>${g.who===id?ic('check',14):''}</i></button>`).join('')}</div>
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
 <div class="sg-foot"><button class="btn sg-cta" onclick="S.sg=Object.assign({},T.sg,{pct:0,joined:false,log:[]});save();${isNew?"replace('sg-sent')":`replace('sg-home');toast('Invite sent to ${who}')`}">${isNew?`Start goal and send ${who} a link`:`Start goal and invite ${who}`}</button></div>`}});
def('sg-sent',()=>{const g=S.sg||T.sg;const who=nm(g.who);
 return {cls:'lt sgs',html:`<div class="sg-top"><button class="iconbtn" onclick="replace('sg-home')" aria-label="Close">${ic('close',22)}</button><b>Invite ${who}</b><span style="width:44px"></span></div>
 <div class="sg-body"><div class="sg-msg"><div class="sg-bub">Want to save for ${g.name} with me? We each add our own way, and only see progress.</div>
  <div class="sg-lp"><div class="sg-lp-img">${sgRing(0,70)}<span>${sgIcon(22)}</span></div><div><b>${S.me} started a goal: ${g.name}</b><em>acorns.com/goal/${S.me.toLowerCase()}</em></div></div></div>
  <p class="sg-note" style="text-align:center">You send it from your own Messages. ${who} can join without being on Acorns yet.</p>
  <button class="sg-link" onclick="go('sg-join')">Prototype: see what ${who} sees ${ic('chev',14)}</button></div>
 <div class="sg-foot"><button class="btn sg-cta" onclick="toast('Opens your Messages (simulated)');replace('sg-home')">Send</button></div>`}});
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
