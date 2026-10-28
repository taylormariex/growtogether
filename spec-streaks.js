/* Streaks — the Streaks team's page, as they designed it. Nothing of ours is injected here. */
def('streaks',()=>{spInit();const w=S.streak,i=stageIdx(w),nx=nextGoal(w),best=Math.max(w,S.best||24);
  const pct=nx[1]?Math.min(100,Math.max(6,Math.round(w/nx[0]*100))):100;
  const done=RSTAGES.filter((r,k)=>k>0&&k<=i).length;
  const row=(r,k)=>{const on=k<=i;return `<div class="stk-r ${on?'on':''}"><span class="stk-ic">${on?`<img src="${stageSrc(k)}" alt="">`:ic('lock',16)}</span><div class="grow"><b>${r[1]}</b><em>${r[0]} Week Streak</em></div><span class="stk-ck">${on?ic('check',12):''}</span></div>`};
  return {cls:'dark',html:`<div class="stk-hero"><div class="stk-sky"></div><div class="stk-pines">${[[6,38,90],[16,48,120],[28,30,70],[70,44,110],[82,34,84],[92,42,100]].map(([x,wd,h])=>`<i style="left:${x}%;width:${wd}px;height:${h}px"></i>`).join('')}</div><div class="stk-hill"></div><img class="stk-stage" src="${stageSrc(i)}" alt="">
   <div class="top"><button class="iconbtn" onclick="back()" aria-label="Close">${ic('close')}</button><button class="iconbtn" onclick="toast('Invest every week to grow your streak')" aria-label="Help"><span class="stk-q">?</span></button></div></div>
  <div class="body stk-body">
   <div class="center"><div class="stk-h1"><span>${w}</span> Week Streak</div><p class="stk-sub">Your daily $5 recurring investment keeps your streak alive. Your future self thanks you!</p></div>
   <div class="stk-bar"><i style="width:${pct}%"></i><span class="stk-pip" style="left:${pct}%">${ic2('flame',12)}</span></div>
   <div class="row between stk-labs"><span>${w} Weeks</span><span>${nx[1]?`${nx[0]} Weeks`:'Ancient Oak'}</span></div>
   <div class="row between stk-ach"><b>Achievements</b><span>${done}/${RSTAGES.length-1} Complete</span></div>
   <div class="stk-tiles"><div class="stk-t"><span class="stk-tic">${ic2('flame',18)}</span><b>${w}</b><em>Current Streak</em></div><div class="stk-t"><span class="stk-tic">${sgGlyph('trophy',18,'#fff')}</span><b>${best}</b><em>Best Streak</em></div></div>
   <div class="stk-list">${RSTAGES.slice(1).map((r,k)=>row(r,k+1)).join('')}</div><div style="height:40px"></div></div>`}});
document.head.insertAdjacentHTML('beforeend',`<style>
.stk-hero{position:relative;height:300px;overflow:hidden;background:#0d1f0d;flex:none}
.stk-sky{position:absolute;inset:0;background:radial-gradient(120% 70% at 50% 92%,#2d5a1f 0%,#163416 38%,#0b1a0b 72%,#07120a 100%)}
.stk-pines{position:absolute;inset:0;opacity:.28}.stk-pines i{position:absolute;bottom:88px;background:#0a1c0a;clip-path:polygon(50% 0,100% 100%,0 100%);filter:blur(.6px)}
.stk-hill{position:absolute;left:-20%;right:-20%;bottom:-120px;height:220px;border-radius:50%;background:radial-gradient(60% 60% at 50% 20%,#3b7a2a 0%,#1f4a18 55%,#13300f 100%);box-shadow:0 -10px 40px rgba(116,201,71,.18)}
.stk-stage{position:absolute;left:50%;bottom:76px;transform:translateX(-50%);height:118px;width:auto;filter:drop-shadow(0 14px 18px rgba(0,0,0,.45))}
.stk-hero .top{position:absolute;top:0;left:0;right:0;display:flex;justify-content:space-between;padding:14px 16px 0}
.stk-q{font-size:17px;font-weight:700;color:#fff;line-height:1}
.stk-body{padding:12px 24px 0!important}
.stk-h1{font-size:30px;font-weight:700;letter-spacing:-.6px;color:#fff;margin-top:4px}.stk-h1 span{color:#8fd867}
.stk-sub{font-size:12.5px;line-height:1.45;color:rgba(255,255,255,.85);margin:10px auto 0;max-width:300px}
.stk-bar{position:relative;height:12px;border-radius:7px;background:rgba(255,255,255,.1);margin-top:26px}.stk-bar i{display:block;height:100%;border-radius:7px;background:#74c947}
.stk-pip{position:absolute;top:50%;transform:translate(-50%,-50%);width:24px;height:24px;border-radius:50%;background:#8fd867;display:flex;align-items:center;justify-content:center;color:#fff;box-shadow:0 0 0 3px #0d1f0d}
.stk-labs{font-size:11px;font-weight:700;color:#fff;margin-top:10px}
.stk-ach{margin-top:30px;align-items:baseline}.stk-ach b{font-size:16px;color:#fff}.stk-ach span{font-size:11.5px;color:rgba(255,255,255,.7)}
.stk-tiles{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:16px}.stk-t{border:1px solid rgba(255,255,255,.14);border-radius:14px;padding:18px 12px 14px;text-align:center;display:flex;flex-direction:column;align-items:center}
.stk-tic{width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;color:#fff}.stk-t b{font-size:22px;color:#fff;margin-top:10px}.stk-t em{font-style:normal;font-size:10.5px;color:rgba(255,255,255,.7);margin-top:2px}
.stk-list{margin-top:18px}.stk-r{display:flex;align-items:center;gap:14px;padding:12px 0;position:relative}.stk-r+.stk-r:before{content:'';position:absolute;left:25px;top:-14px;height:18px;border-left:1.5px dotted rgba(255,255,255,.35)}
.stk-ic{width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.75);flex:none;overflow:hidden}.stk-r.on .stk-ic{background:#0d1f0d;box-shadow:0 0 0 2px #74c947}.stk-r.on .stk-ic img{height:44px;width:auto}
.stk-r b{display:block;font-size:14px;color:#fff}.stk-r em{display:block;font-style:normal;font-size:10.5px;color:rgba(255,255,255,.7);margin-top:2px}.stk-r:not(.on) b{color:rgba(255,255,255,.8)}
.stk-ck{width:22px;height:22px;border-radius:50%;border:1.5px dashed rgba(255,255,255,.35);display:flex;align-items:center;justify-content:center;flex:none}.stk-r.on .stk-ck{border:0;background:#74c947;color:#0d1f0d}
</style>`);
