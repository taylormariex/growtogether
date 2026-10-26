/* Swap hand-drawn art for production Acorns assets (Streak stage art + Brand Component Library). */
(function(){
const STAGE_IMG=['acorn','acorn','seedling','seedling','oak','oak'];
const STAGE_SCALE=[.62,.8,.78,.95,.9,1.05];
ART.oak=function(stage,fl,opt){opt=opt||{};stage=Math.max(0,Math.min(5,stage|0));const w=opt.w||200,h=opt.h||224;
  const k=STAGE_IMG[stage];const ih=Math.round(h*STAGE_SCALE[stage]*(k==='acorn'?.62:.86));
  return `<span style="display:inline-flex;align-items:flex-end;justify-content:center;width:${w}px;height:${h}px;${opt.dim?'filter:saturate(.35) brightness(.85);opacity:.7':''}"><img src="${IMG[k]}" alt="" style="height:${ih}px;width:auto;filter:drop-shadow(0 8px 8px rgba(0,0,0,.3))"></span>`};
ART.squirrel=function(opt){opt=opt||{};const w=opt.w||120;if(opt.hold==='can')return `<div style="width:${w*.7}px;height:${w*.7}px;border-radius:50%;background:radial-gradient(circle at 40% 35%,#8cc4f7,#2f7fc8);display:flex;align-items:center;justify-content:center;box-shadow:0 10px 24px rgba(47,127,200,.45)"><svg width="${w*.36}" height="${w*.36}" viewBox="0 0 24 24"><path d="M12 3c4 5 6 8 6 11a6 6 0 01-12 0c0-3 2-6 6-11z" fill="#fff"/></svg></div>`;const k=opt.hold==='flowers'?'earn':opt.hold==='heart'?'roundup':opt.hold==='can'?'learn':'acorn';
  return `<img src="${IMG[k==='acorn'?'acorn':k]}" alt="" style="height:${Math.round(w*.8)}px;width:auto;filter:drop-shadow(0 10px 14px rgba(0,0,0,.25))">`};
ART.hills=function(opt){opt=opt||{};const dark=!!opt.dark;
  if(!dark)return `<div style="position:absolute;inset:0;overflow:hidden;background:linear-gradient(180deg,#f4fbef,#e2f5d6)" aria-hidden="true"><div style="position:absolute;left:-30%;width:90%;bottom:-40%;height:85%;border-radius:50%;background:#c9efb3"></div><div style="position:absolute;right:-30%;width:95%;bottom:-45%;height:88%;border-radius:50%;background:#b2e595"></div><div style="position:absolute;left:-35%;right:-35%;bottom:-64%;height:98%;border-radius:50%;background:radial-gradient(ellipse 60% 55% at 50% 4%,#9be06f,#74c947 45%,#5aa832)"></div></div>`;
  let t1='',t2='';for(let i=0;i<22;i++){t1+=`<circle cx="${i*19}" cy="${34-((i*53)%10)}" r="${14+((i*37)%8)}"/>`}for(let i=0;i<17;i++){t2+=`<circle cx="${i*25+6}" cy="${44-((i*41)%8)}" r="${13+((i*29)%7)}"/>`}
  return `<div style="position:absolute;inset:0;overflow:hidden;background:linear-gradient(180deg,#0b1f09 0%,#0d2a0a 55%,#12350e 100%)" aria-hidden="true">
   <div style="position:absolute;left:10%;right:10%;bottom:22%;height:60%;border-radius:50%;background:radial-gradient(closest-side,rgba(116,201,71,.22),transparent)"></div>
   <svg viewBox="0 0 400 60" preserveAspectRatio="none" style="position:absolute;left:0;bottom:30%;width:100%;height:20%"><g fill="#123a0f">${t1}<rect x="0" y="34" width="400" height="26"/></g><g fill="#195016">${t2}<rect x="0" y="44" width="400" height="16"/></g></svg>
   <div style="position:absolute;left:-35%;right:-35%;bottom:-64%;height:98%;border-radius:50%;background:radial-gradient(ellipse 60% 55% at 50% 4%,#79cf4c 0%,#4a9a2b 28%,#2a6a1b 55%,#17420f 80%);box-shadow:inset 0 3px 0 rgba(188,234,163,.25)"></div>
   <div style="position:absolute;left:0;right:0;bottom:0;height:24%;background:linear-gradient(180deg,rgba(11,31,9,0),#0b1f09)"></div>
  </div>`};
ART.STAGE_IMG=STAGE_IMG;
})();
/* Calm money: no confetti. A few leaves drift up instead. */
ART.confettiBurst=ART.confetti;ART.drift=function(el,n){const box=document.createElement('div');box.className='drift';const k=Math.min(14,Math.round((n||40)/5));for(let i=0;i<k;i++){const l=document.createElement('i');l.style.left=(8+Math.random()*84)+'%';l.style.animationDuration=(2.2+Math.random()*1.6)+'s';l.style.animationDelay=(Math.random()*.5)+'s';l.style.transform=`scale(${.6+Math.random()*.7})`;if(i%3==0)l.style.background='#74c947';if(i%4==0)l.style.background='#bceaa3';box.appendChild(l)}el.appendChild(box);setTimeout(()=>box.remove(),4200)};
