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
  t:'Welcome to your grove',s:'Plant someone beside you. You see each other’s oaks and weeks. Nobody sees a balance.',where:'Lives in Streaks → Grove, and your oak on Home.',cta:'Open my grove'},
 invite:{name:'invites',beats:[['link','One link…'],['pair','can plant a whole tree.'],['days','Pick one person, and the day you both invest.'],['grove','Their first investment plants a tree beside yours.']],
  t:'Invite someone',s:'You send it yourself. Their tree plants after their first real investment. Rewards follow the Referrals program.',where:'Lives on Home → “Get $250”, and any open plot in your grove.',cta:'Invite someone'},
 'money-type':{name:'Money Type',beats:[['forest','Not sure where to start?'],['quiz','Three quick questions…'],['type','find your money type.'],['handoff','Then you set it up in the Recurring or Round-Ups® you already have.']],
  t:'Find your money type',s:'About habits only. It never changes your portfolio or risk.',where:'Right after sign-up, and “New ways to grow” on Home.',cta:'Start'},
 'skip-and-stash':{name:'Skip and Stash',beats:[['coffee','Skipped coffee today?'],['jar','That’s money you didn’t spend.'],['grow','Stash it in one hold, and your week counts.']],
  t:'Skip it, stash it',s:'Quick Stash, a Skip Jar, or a Skip Week with friends. Works without ever reading your spending.',where:'Lives on Home → “New ways to grow”, and reminders you set.',cta:'Pick how to skip'},
 split:{name:'Money Manager',beats:[['mm','Your Money Manager split…'],['mm','already works every payday.'],['flour','Now each slice grows your oak.'],['weeks','Investing keeps your streak. Saving builds a nest.']],
  t:'Money Manager, growing',s:'Your split stays exactly the same. Grow Together just shows it growing.',where:'Lives in Money Manager. One small card explains the new layer.',cta:'Open Money Manager'},
 'future-club':{name:'Future Club',beats:[['note','Some notes…'],['note','are meant for later.'],['sapling','For your kid, every approved note blooms a leaf.']],
  t:'Future Club',s:'A capsule that opens on a date for you, or a sapling for your kid that family can add to.',where:'Lives on Home → “New ways to grow”, and the Early account.',cta:'Start a club'},
 year:{name:'Acorns Year',beats:[['forest','This year…'],['weeks','you showed up 48 weeks.'],['cards','Every card tells part of it.'],['cards','Together, they tell your year.']],
  t:'Your Acorns Year',s:'Six cards made to share. Weeks and counts only. Never balances or returns.',where:'Lives on Home in December, with a recap every month.',cta:'Watch my year'},
 challenges:{name:'Challenges',beats:[['forest','Better together…'],['ch','A no-delivery week. 8 weeks side by side.'],['weeks','One investment counts toward every challenge.']],
  t:'Challenges',s:'Run as many as you like with anyone in your grove.',where:'Lives in Streaks → Challenges, and on any tree in your grove.',cta:'See challenges'},
 invited:{name:'invites',beats:[['phone','A link lands…'],['paths','on Sam’s phone. Every path is different…'],['pair','and every one ends planted beside Jordan.']],
  t:'Getting invited',s:'Already on Acorns, brand new, signed out, an old link, under 18. Each one is mapped.',where:'Starts from a text, a story or a QR code.',cta:'See every path'}};
def('splash',p=>{const k=p.k in LANDERS?p.k:'grove';const L=LANDERS[k],S0=SPL[k]||SPL.grove;const n=L.beats.length;const b=Math.min(p.b||0,n);const fin=b===n;
  const bars=`<div class="ld-bars">${Array.from({length:n},(_,i)=>`<i class="${i<b||fin?'on':''}"></i>`).join('')}</div>`;
  const top=`<div class="ld-top"><button class="iconbtn" onclick="${b>0&&!fin?`ldGo(${b-1})`:'back()'}" aria-label="${b>0&&!fin?'Previous':'Close'}" style="color:#fff">${ic(b>0&&!fin?'back':'close')}</button>${fin?'<div style="flex:1"></div>':bars}<button class="ld-skip" onclick="ldGo(${fin?0:n})">${fin?'Replay':'Skip intro'}</button></div>`;
  if(fin)return {cls:'dark ldr',html:`${top}<div class="ld-art fin">${LV[L.beats[n-1][0]]()}</div>
    <div class="ld-fin"><h1 class="ld-h">${L.t}</h1><p class="ld-s">${L.s}</p>
     <div class="ld-info">${ic('home',18)}<div><b>Where it lives</b><span>${L.where}</span></div></div></div>
    <div class="foot">${btn(L.cta,`(function(){${S0.go.replace(/"/g,'&quot;')}})()`,'pri','style="background:#3f8f1f;color:#fff"')}</div>`};
  const [v,line]=L.beats[b];return {cls:'dark ldr',html:`${top}<div class="ld-tap" onclick="ldGo(${b+1})"><div class="ld-art" key="${b}">${LV[v]()}</div><div class="ld-line">${line}</div></div>
   <div class="ld-next"><button onclick="ldGo(${b+1})" aria-label="Next">${ic('back',20,'transform:rotate(180deg)')}</button></div>`,mount(){haptic(4)}}});
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
