/* Main menu + the other ways in. Each one feeds the same grove. */

/* ---------- menu ---------- */
def('menu',()=>({cls:'ivory',html:`<div style="background:var(--primaryGreen);padding:calc(var(--safeTop) + 12px) var(--pad) 26px;position:relative;overflow:hidden;flex-shrink:0">
   <div style="position:absolute;right:-18px;bottom:-18px">${squirrel({hold:'flowers',w:150})}</div>
   <div class="eyebrow" style="color:var(--naturalDarkForest)">Share the wealth · prototype</div>
   <div class="h1 mt8" style="max-width:230px">Grow together.</div>
   <p class="mt8" style="font-size:14px;max-width:210px;color:rgba(23,29,25,.75);line-height:1.4">Every way in leads to one grove, plugged into Streaks.</p>
  </div>
  <div class="body" style="padding-top:18px">
   <div class="mcard" style="background:var(--naturalDarkForest);color:#fff" onclick="startGT()"><div class="tag">Hero · right after sign-up</div><div class="art">${oak(3,['roots','acorns'],{dark:1,w:130,h:146})}</div><div class="ttl">Grow Together</div><div class="sub">Why screens, pick your people, first week, grove, challenges.</div></div>
   <div class="mcard mt12" style="background:#2f4434;color:#fff;min-height:110px" onclick="jumpAhead();home('gt-home')"><div class="tag">Jump in</div><div class="art" style="width:110px;height:110px">${oak(2,['roots'],{dark:1,w:100,h:112})}</div><div class="ttl">The app, 4 weeks in</div><div class="sub">Full grove, 3 challenges, water Mom, invest once.</div></div>
   <div class="eyebrow mt24">More ways in</div>
   <div class="grid2 mt12">
    ${[['mt-why1','Money Type','3 taps, a type, a next step',squirrel({hold:'heart',w:96}),'var(--naturalMoss)'],
       ['ss-why1','Skip and Stash','A week-long challenge with friends',squirrel({hold:'acorn',w:96}),'var(--naturalBeige)'],
       ['fc-why1','Future Club','Notes that open in a year',envelope(84),'#e8e0f7'],
       ['ay-1','Acorns Year','Your year as shareable stories',oak(3,['gold'],{w:84,h:94,ground:false}),'#fbe7c6']].map(([id,t,s,a,bg])=>`<div class="mcard" style="background:${bg};min-height:178px;padding:14px" onclick="T={};home('${id}')"><div class="art" style="width:96px;height:96px;right:-4px;bottom:-4px">${a}</div><div class="ttl" style="font-size:17px;max-width:100%">${t}</div><div class="sub" style="max-width:70%;font-size:12px">${s}</div><div style="height:60px"></div></div>`).join('')}
   </div>
   <div class="eyebrow mt24">Other side and the system</div>
   <div class="card mt12" style="padding:4px 16px">
    <div class="li" onclick="home('sam-lock')">${av('sam','s')}<div class="grow"><div class="ttl">Getting invited</div><div class="sub">What Sam sees: text, web page, joining</div></div>${ic('chev',18,'opacity:.35')}</div>
    <div class="li" onclick="T={};go('map')"><div class="lockic">${ic('grove',18)}</div><div class="grow"><div class="ttl">How it all connects</div><div class="sub">Ways in, products, flourishes, grove</div></div>${ic('chev',18,'opacity:.35')}</div>
    <div class="li" onclick="alertBox('Reset the prototype?','Clears your grove, challenges and flourishes on this device.',[{t:'Cancel'},{t:'Reset',b:1,fn:()=>{resetAll();toast('Reset')}}])"><div class="lockic">${ic('close',18)}</div><div class="grow"><div class="ttl">Reset</div><div class="sub">Start fresh</div></div></div>
   </div>
   <p class="sm center mt24">Tip: Share → Add to Home Screen opens this full screen.<br>Placeholder names, prices and brands throughout.</p>
   <div style="height:20px"></div>
  </div>`}));
function startGT(){const keep=S.perm;S=FRESH();S.perm={contacts:null,notif:null};save();T={};home('gt-welcome')}
function envelope(w){return `<svg viewBox="0 0 100 80" width="${w}" height="${w*.8}" aria-hidden="true"><rect x="6" y="14" width="88" height="60" rx="8" fill="#fff" stroke="#5f253d" stroke-width="2.5"/><path d="M8,18 L50,48 L92,18" fill="none" stroke="#5f253d" stroke-width="2.5" stroke-linejoin="round"/><circle cx="50" cy="48" r="9" fill="#74c947"/><path d="M46,48 l3,3 6,-6" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round"/></svg>`}
function whyIdea(o){ // generic why screen for ideas
  return {cls:o.cls||'green',html:`${topbar({left:`<button class="iconbtn" onclick="${o.i===0?"home('menu')":'back()'}">${ic(o.i===0?'close':'back')}</button>`,right:`<button class="link" style="padding:0 14px;${o.cls==='dark'?'color:rgba(255,255,255,.7)':'color:var(--naturalDarkForest)'}" onclick="go('${o.skip}')">Skip</button>`})}
  <div class="body" style="display:flex;flex-direction:column"><div class="hero-art pop" style="height:300px;align-items:center">${o.art}</div>
  <div class="eyebrow rise mt16">${o.eyebrow}</div><div class="h1 rise d1 mt8">${o.title}</div><p class="p rise d2 mt12">${o.sub}</p></div>
  <div class="foot">${dots(o.i,o.n)}${btn(o.cta||'Continue',`go('${o.next}')`,o.cls==='dark'?'wh':'dk')}</div>`,mount:o.mount}}

/* ---------- Money Type ---------- */
const MT={
  oak:{n:'Steady Oak',s:'You show up. Consistency is the whole game, and you already play it.',step:'Set a weekly recurring investment',go:'rec-1',k:'roots',bg:'linear-gradient(180deg,#38860e,#263027)'},
  squirrel:{n:'Squirrel',s:'You stash before you spend. Future you is grateful.',step:'Start an Emergency Fund',go:'ef-0',k:'nest',bg:'linear-gradient(180deg,#be752e,#5f3b1c)'},
  sunseeker:{n:'Sunseeker',s:'You chase goals and get there.',step:'Open Later for future you',go:'later-1',k:'gold',bg:'linear-gradient(180deg,#f5a623,#be752e)'},
  wildflower:{n:'Wildflower',s:'You live in the moment. That’s a strength, and it can invest for you.',step:'Turn on Round-Ups so spending invests',go:'ru-1',k:'acorns',bg:'linear-gradient(180deg,#f39bb6,#5f253d)'},
  rooted:{n:'Rooted',s:'Security first. You build the foundation everyone leans on.',step:'Start an Emergency Fund',go:'ef-0',k:'nest',bg:'linear-gradient(180deg,#486b4d,#171d19)'},
  sprout:{n:'Sprout',s:'Just starting, which is the best time to start.',step:'Read a 2-minute lesson',go:'learn-1',k:'bird',bg:'linear-gradient(180deg,#74c947,#38860e)'}
};
const MTIMG=new Proxy({},{get:(o,k)=>IMG[{oak:'oak',squirrel:'moneybag',sunseeker:'later',wildflower:'roundup',rooted:'acorn',sprout:'seedling'}[k]||'seedling']});
const MTQ=[{q:'Payday hits. You…',a:[['Plan where it goes','oak'],['Treat yourself first','wildflower'],['Don’t really think about it','sprout']]},
  {q:'A surprise $20. You…',a:[['Stash it','squirrel'],['Spend it','wildflower'],['Split it','sunseeker']]},
  {q:'With friends, you’re the one who…',a:[['Picks the place','sunseeker'],['Splits the bill','rooted'],['Forgets their wallet','sprout']]}];
def('mt-why1',()=>whyIdea({i:0,n:3,next:'mt-why2',skip:'mt-q',eyebrow:'Money Type',title:'Three taps. Thirty seconds.',sub:'Answer three quick questions about habits. No money questions, no account details.',
  art:`<div style="display:flex;flex-direction:column;gap:10px;width:260px">${['Payday hits. You…','A surprise $20. You…','With friends, you’re the one who…'].map((q,i)=>`<div class="rise d${i*2+1}" style="background:#fff;border-radius:18px;padding:14px 16px;font-weight:600;box-shadow:0 6px 16px rgba(0,0,0,.08);${i==1?'margin-left:24px':''}">${q}</div>`).join('')}</div>`}));
def('mt-why2',()=>whyIdea({i:1,n:3,next:'mt-why3',skip:'mt-q',eyebrow:'It does something',title:'Your type picks your first small step.',sub:'A Wildflower gets Round-Ups. A Steady Oak gets a weekly investment. Every type is a good one.',
  art:`<div style="width:150px" class="float">${storyCard({bg:MT.wildflower.bg,eyebrow:'My money type',title:'Wildflower',art:`<img src="${IMG.roundup}">`})}</div>`}));
def('mt-why3',()=>whyIdea({i:2,n:3,next:'mt-q',skip:'mt-q',cta:'Find my type',eyebrow:'Made to share',title:'Then see how you match.',sub:'Send it to someone. They take it free on the web, and you both get a match card. No winners, no rankings.',
  art:`<div style="display:flex;gap:10px"><div style="width:162px;transform:rotate(-6deg)">${storyCard({bg:MT.oak.bg,title:'Steady Oak',art:oak(3,[],{dark:1,w:90,h:100,ground:false})})}</div><div style="width:162px;transform:rotate(6deg);margin-top:26px;margin-left:-22px">${storyCard({bg:MT.wildflower.bg,title:'Wildflower',art:`<img src="${IMG.roundup}">`})}</div></div>`}));
def('mt-q',p=>{const i=p.i||0;const q=MTQ[i];return {cls:'green',html:`${topbar({})}<div style="padding:0 var(--pad)">${dots(i,3)}</div>
  <div class="body" style="display:flex;flex-direction:column;justify-content:center"><div class="eyebrow">Question ${i+1} of 3</div><div class="h1 mt12">${q.q}</div>
  <div class="mt32">${q.a.map(([t,v],k)=>`<button class="btn wh rise d${k+1}" style="height:62px;justify-content:flex-start;padding:0 22px;margin-bottom:12px;font-size:17px" onclick="mtAns(${i},'${v}')">${t}</button>`).join('')}</div></div>`}});
function mtAns(i,v){S.mt.answers[i]=v;save();if(i<2)go('mt-q',{i:i+1});else{const a=S.mt.answers;let t=a[0];const c={};a.forEach(x=>c[x]=(c[x]||0)+1);Object.keys(c).forEach(k=>{if(c[k]>1)t=k});if(a[1]==='squirrel'&&a[2]==='rooted')t='rooted';S.mt.type=t;save();go('sys-load',{msg:'Finding your type',next:'mt-result'})}}
def('mt-result',()=>{const t=MT[S.mt.type||'sprout'];const card=storyCard({bg:t.bg,eyebrow:'My money type',title:t.n,sub:t.s,art:`<img src="${MTIMG[S.mt.type||'sprout']}">`,foot:'What’s yours? · acorns.com/type'});
  return {cls:'ivory',html:`${topbar({close:"home('menu')"})}<div class="body"><div class="eyebrow">You’re a</div><div class="h1 mt8">${t.n}</div>
  <div style="width:56%;margin:18px auto 0" class="pop">${card}</div>
  <div class="card mt24"><div class="eyebrow">Your next small step</div><div class="h3 mt8">${t.step}</div><p class="sm mt8">Matched to your type. Also gives your oak ${FL[t.k].name.toLowerCase()}.</p><div class="mt16">${btn('Do it now',`S.ret='mt-result';T={};go('${t.go}')`)}</div></div>
  <p class="sm mt16">This is about habits only. It doesn’t change your portfolio or risk settings.</p>
  <div class="row mt16" style="gap:10px"><button class="btn line" style="flex:1" onclick="mtShare()">${ic('share',20)} Share</button><button class="btn dk" style="flex:1" onclick="mtCompare()">Compare</button></div>
  <div class="li mt8" onclick="S.mt={answers:[],type:null};save();home('mt-q')"><div class="grow ttl" style="font-size:15px">Retake, or pick my own</div>${ic('chev',18,'opacity:.35')}</div>
  <div style="height:20px"></div></div>`}});
function mtShare(){const t=MT[S.mt.type||'sprout'];share({title:`I’m a ${t.n}. What are you?`,story:storyCard({bg:t.bg,eyebrow:'My money type',title:t.n,sub:t.s,art:squirrel({hold:'flowers',w:150}),foot:'What’s yours? · acorns.com/type'})})}
function mtCompare(){const t=MT[S.mt.type||'sprout'];share({title:'Take my money type quiz',story:storyCard({bg:t.bg,eyebrow:'What’s yours?',title:`I’m a ${t.n}.`,art:squirrel({hold:'heart',w:150})}),people:['sam','mom','jess','priya','dad'],done:()=>setTimeout(()=>{banner('Sam took your quiz','Sam’s a Steady Oak. See your match.',()=>go('mt-match'));setTimeout(()=>{if(cur().dataset.id==='mt-result')go('mt-match')},2600)},300)})}
def('mt-match',()=>{const t=MT[S.mt.type||'sprout'];return {cls:'dark',html:`${topbar({})}<div class="body center">
  <div class="eyebrow">Your match</div><div class="h1 mt8">${S.me} + Sam</div><p class="p mt8">${t.n} & Steady Oak. You balance each other out.</p>
  <div style="display:flex;gap:10px;justify-content:center;margin-top:22px"><div style="width:50%;transform:rotate(-4deg)" class="rise">${storyCard({bg:t.bg,title:t.n,art:`<img src="${MTIMG[S.mt.type||'sprout']}">`})}</div><div style="width:50%;transform:rotate(4deg);margin-top:24px;margin-left:-18px" class="rise d2">${storyCard({bg:MT.oak.bg,title:'Steady Oak',art:oak(3,[],{dark:1,w:90,h:100,ground:false})})}</div></div>
  <div class="card dk mt24" style="text-align:left;background:rgba(255,255,255,.07)"><div class="h4">Grow beside Sam?</div><p class="sm mt8">Add Sam to your grove. Your weeks count side by side, and you each keep your own next step.</p></div></div>
  ${foot(btn('Grow beside Sam',"if(!inGrove('sam'))S.grove.push({id:'sam',status:'growing',side:0});save();toast('Sam is in your grove');home('gt-grove')",'wh'),btn(`${ic('share',20)} Share our match`,`share({title:'Our money types',story:storyCard({bg:'linear-gradient(180deg,#263027,#171d19)',eyebrow:'Money type match',title:'${t.n} + Steady Oak',sub:'We balance each other out.',art:squirrel({hold:'heart',w:140})})})`,'ghost'))}`}});

/* ---------- Skip and Stash ---------- */
const SKIPS=[['Delivery',15],['Coffee out',6],['Rideshare',14],['Takeout lunch',13],['Impulse buys',20]];
def('ss-why1',()=>whyIdea({i:0,n:3,next:'ss-why2',skip:'ss-pick',cls:'ecru',eyebrow:'Skip and Stash',title:'Start with one small win this week.',sub:'Skip one thing for 7 days. No delivery, coffee at home, walk instead of a ride.',art:`<div style="position:relative">${squirrel({hold:'acorn',w:190})}</div>`}));
def('ss-why2',()=>whyIdea({i:1,n:3,next:'ss-why3',skip:'ss-pick',cls:'ecru',eyebrow:'Better with friends',title:'Bring a crew. Or go solo.',sub:'One tap a day to check in. Friends send cheers. It’s on your honor. Acorns never reads your spending to check.',
  art:`<div style="width:280px">${['sam','jess','priya'].map((id,i)=>`<div class="row rise d${i*2+1}" style="background:#fff;border-radius:16px;padding:12px 14px;margin-bottom:10px;box-shadow:0 4px 12px rgba(0,0,0,.06)">${av(id,'s')}<div class="grow" style="font-weight:600">${nm(id)} skipped it</div><div class="sm">Day ${4+i%2}</div></div>`).join('')}</div>`}));
def('ss-why3',()=>whyIdea({i:2,n:3,next:'ss-pick',skip:'ss-pick',cls:'ecru',cta:'Pick my challenge',eyebrow:'The payoff',title:'Invest what you didn’t spend.',sub:'At the end: “You skipped 4 times. That’s about $60.” You set the amount and confirm. Nothing moves on its own.',
  art:`<div class="card" style="width:250px;text-align:center;padding:24px"><div class="sm">Day 7</div><div class="h1 mt8" style="font-size:44px">$60</div><div class="sm">about, from 4 skips</div><div class="btn pri mt16" style="height:44px">Invest it</div></div>`}));
def('ss-pick',()=>({html:`${topbar({title:'Skip and Stash'})}${progress(1,4)}<div class="body"><div class="h2 mt8">What will you skip for 7 days?</div>
  <div class="mt24">${SKIPS.map(([t,e])=>choice('sspick',t,t,`Usually about $${e} each time`)).join('')}</div></div>
  ${foot(btn('Continue',"S.ss.pick=T.sspick;S.ss.est=SKIPS.find(s=>s[0]===T.sspick)[1];save();go('ss-est')",'pri','data-need="sspick"'))}`,mount:needs}));
def('ss-est',()=>({html:`${topbar({title:'Skip and Stash'})}${progress(2,4)}<div class="body"><div class="h2 mt8">About how much is one skip?</div><p class="p mt8">Your estimate. Only you see it. It sets the “about” at the end.</p>
  <div class="amt mt24" onclick="keypad(S.ss.est,v=>{S.ss.est=v;save();refresh()},'One skip')">${money(S.ss.est)}</div>
  <div class="chips" style="justify-content:center">${[5,10,15,20].map(a=>`<button class="chip ${S.ss.est===a?'on':''}" onclick="S.ss.est=${a};save();refresh()">$${a}</button>`).join('')}<button class="chip" onclick="keypad(S.ss.est,v=>{S.ss.est=v;save();refresh()},'One skip')">Other</button></div></div>
  ${foot(btn('Continue',"go('ss-crew')"))}`}));
def('ss-crew',()=>{if(!T.ssc)T.ssc=[];return {html:`${topbar({title:'Skip and Stash'})}${progress(3,4)}<div class="body"><div class="h2 mt8">Who’s skipping with you?</div><p class="p mt8">Up to 5 people. They see check-ins, not dollars.</p>
  <div class="mt16">${['sam','jess','priya','marcus','leo'].map(id=>choice('ssc',id,PEOPLE[id].full,PEOPLE[id].on?'On Acorns':'Gets a link to join',av(id,'s'),1)).join('')}</div></div>
  ${foot(btn('Invite and start',"ssStart()"),btn('Go solo',"T.ssc=[];ssGo()",'ghost'))}`}});
function ssStart(){if(!T.ssc.length){ssGo();return}share({title:`Skip ${S.ss.pick.toLowerCase()} with me this week`,people:T.ssc,story:storyCard({bg:'linear-gradient(180deg,#f2e3b8,#f0a763)',dark:1,eyebrow:'7-day challenge',title:`No ${S.ss.pick.toLowerCase()} this week. You in?`,art:squirrel({hold:'acorn',w:150})}),done:()=>setTimeout(ssGo,300)})}
function ssGo(){S.ss.crew=T.ssc.slice();S.ss.day=1;S.ss.skips=[];save();go('ss-day')}
def('ss-day',()=>{const d=S.ss.day;const checked=S.ss.skips[d-1]===true;const crew=S.ss.crew;
  return {cls:'ecru',html:`${topbar({close:"home('menu')",title:`No ${S.ss.pick.toLowerCase()} week`})}<div class="body">
  <div class="row mt8" style="justify-content:space-between">${[1,2,3,4,5,6,7].map(i=>`<div style="text-align:center"><div style="width:38px;height:38px;border-radius:19px;display:flex;align-items:center;justify-content:center;font-weight:700;${S.ss.skips[i-1]===true?'background:var(--primaryGreen);color:#fff':S.ss.skips[i-1]===false?'background:#eee;color:#aaa':i===d?'box-shadow:inset 0 0 0 2px var(--naturalMidnightForest)':'background:#fff;color:#bbb'}">${S.ss.skips[i-1]===true?ic('check',18):i}</div></div>`).join('')}</div>
  <div class="card mt24 center" style="padding:24px"><div class="eyebrow">Day ${d} of 7</div><div class="h2 mt8">${checked?'Nice. Checked in.':`Skipped ${S.ss.pick.toLowerCase()} today?`}</div>
   ${checked?`<p class="p mt8">${S.ss.skips.filter(x=>x).length} skips so far.</p>`:`<div class="row mt16" style="gap:8px"><button class="btn pri" style="flex:1" onclick="S.ss.skips[${d-1}]=true;save();refresh();confetti($('#screen'),30)">Skipped it</button><button class="btn line" style="flex:.7" onclick="S.ss.skips[${d-1}]=false;save();refresh();toast('Tomorrow’s a new day')">Not today</button></div>`}</div>
  ${crew.length?`<div class="card mt16"><div class="h4">Your crew</div>${crew.map((id,i)=>`<div class="row" style="padding:10px 0;border-bottom:1px solid #f2f2f2">${av(id,'s')}<div class="grow"><div style="font-weight:600">${nm(id)}</div><div class="sm">${Math.max(0,d-1-(i%2))} skips</div></div><button class="chip" style="height:34px" onclick="this.classList.add('on');this.textContent='Cheered';toast('Cheer sent to ${nm(id)}')">Cheer</button></div>`).join('')}</div>`:`<div class="card mt16"><div class="row"><div class="grow sm" style="color:var(--primarySlate)">Going solo. Add someone anytime.</div><button class="link" onclick="T={ssc:[]};go('ss-crew')">Invite</button></div></div>`}
  <div class="mt16 center"><button class="sim" onclick="ssNext()">${ic('ff',12)} Prototype: next day</button></div></div>`}});
function ssNext(){if(S.ss.skips[S.ss.day-1]===undefined)S.ss.skips[S.ss.day-1]=Math.random()>.35;if(S.ss.day>=7){save();go('ss-end');return}S.ss.day++;save();refresh()}
def('ss-end',p=>{const c=p.ch?S.challenges.find(x=>x.id===p.ch):null;const n=c?c.prog.me:S.ss.skips.filter(x=>x).length||4;const est=S.ss.est||15;if(T.ssamt===undefined)T.ssamt=n*est;
  return {cls:'green',html:`${topbar({close:"home('menu')"})}<div class="body center"><div class="eyebrow mt8">Day 7 · you did it</div><div class="h1 mt8">You skipped ${n} time${n===1?'':'s'}.</div><p class="p mt8">That’s about ${money(n*est)}. Invest it?</p>
  <div class="card mt24" style="text-align:center;padding:22px"><div class="sm">Amount</div><div class="amt" style="margin:4px 0" onclick="keypad(T.ssamt,v=>{T.ssamt=v;refresh()},'Invest')">${money(T.ssamt)}</div><div class="link" onclick="keypad(T.ssamt,v=>{T.ssamt=v;refresh()},'Invest')">Edit amount</div>
   <div class="kv mt16" style="text-align:left"><span>From</span><b>${S.accounts[0].name} ••${S.accounts[0].mask}</b></div></div>
  <p class="sm mt12" style="color:rgba(23,29,25,.7)">An estimate you control. Nothing moves until you confirm.</p></div>
  ${foot(btn('Invest '+money(T.ssamt),"T.inv=T.ssamt;S.afterCount='ss-done';go('sys-load',{msg:'Investing',next:'ss-done'})",'dk'),btn('Not this time','go(\'ss-done\',{skip:1})','ghost'))}`}});
def('ss-done',p=>{if(!p.skip&&!S.invested){S.invested=true;S.streak++;S.stage=stageFor(S.streak);save()}const crew=S.ss.crew.length?S.ss.crew:['sam','jess'];const total=crew.length*4+S.ss.skips.filter(x=>x).length;
  return {cls:'dark',html:`${topbar({left:'<div style="width:44px"></div>'})}<div class="body center">
  <div class="pop mt8">${squirrel({hold:'flowers',w:150})}</div><div class="eyebrow mt16">Week complete</div><div class="h1 mt8">Your crew logged ${total} skips.</div><p class="p mt8">${p.skip?'Still counts as done. No reminders after this.':'Your investment counts toward your Streak too.'}</p>
  <div class="row mt16" style="justify-content:center">${stackAv(['me'].concat(crew))}</div>
  <div class="card dk mt24" style="text-align:left;background:rgba(255,255,255,.07)"><div class="h4">Keep the crew together?</div><p class="sm mt8">Add them to your grove. Then start your next challenge with one tap.</p></div></div>
  ${foot(btn('Add crew to my grove',`${JSON.stringify(crew).replace(/"/g,"'")}.forEach(id=>{if(!inGrove(id))S.grove.push({id,status:PEOPLE[id].on?'growing':'invited',side:1})});save();toast('Crew added');home('gt-grove')`,'wh'),btn(`${ic('share',20)} Share our week`,`share({title:'Our skip week',story:storyCard({bg:'linear-gradient(180deg,#f2e3b8,#f0a763)',dark:1,eyebrow:'Skip and Stash',title:'${total} skips. One crew.',sub:'Skips, not dollars.',art:squirrel({hold:'heart',w:150})})})`,'ghost'))}`,mount(){confetti($('#screen'),60)}}});

/* ---------- Future Club ---------- */
const FC_DATE='October 26, 2027';
def('fc-why1',()=>whyIdea({i:0,n:3,next:'fc-why2',skip:'fc-write',cls:'dark',eyebrow:'Future Club',title:'Write one line to you, a year from now.',sub:'Why you started. What you hope changes. It stays sealed until your first Acorns anniversary.',art:`<div class="float">${envelope(200)}</div>`}));
def('fc-why2',()=>whyIdea({i:1,n:3,next:'fc-why3',skip:'fc-write',cls:'dark',eyebrow:'Sign my capsule',title:'Your people add a note too.',sub:'Ask a few people. They write on the web, no account needed. You can’t peek.',
  art:`<div style="position:relative;width:240px;height:220px">${['mom','sam','priya'].map((id,i)=>`<div class="rise d${i*2+1}" style="position:absolute;left:${i*30}px;top:${i*40}px;width:180px;background:#fff;color:var(--primarySlate);border-radius:16px;padding:14px;transform:rotate(${(i-1)*5}deg);box-shadow:0 10px 24px rgba(0,0,0,.3)"><div class="row">${av(id,'xs')}<b style="font-size:13px">${nm(id)}</b>${ic('lock',14,'margin-left:auto;opacity:.4')}</div><div style="height:8px;background:#eee;border-radius:4px;margin-top:12px"></div><div style="height:8px;width:70%;background:#eee;border-radius:4px;margin-top:6px"></div></div>`).join('')}</div>`}));
def('fc-why3',()=>whyIdea({i:2,n:3,next:'fc-write',skip:'fc-write',cls:'dark',cta:'Write mine',eyebrow:'Opens on your anniversary',title:'A year from today, it opens.',sub:'With every note, plus how you showed up: weeks invested and your longest streak. Never your balance.',
  art:`<div class="card" style="width:220px;text-align:center;padding:22px;color:var(--primarySlate)"><div class="eyebrow">Opens</div><div class="h2 mt8">${FC_DATE}</div><div class="sm mt8">365 days</div></div>`}));
def('fc-write',()=>({cls:'dark',html:`${topbar({title:'Future Club'})}${progress(1,3)}<div class="body"><div class="h2 mt8">Dear me, a year from now…</div>
  <div class="field mt24" style="min-height:160px"><textarea id="fcl" rows="5" placeholder="Write one line, or a few" oninput="S.fc.line=this.value;save();T.fcl=this.value;needs()">${S.fc.line}</textarea></div>
  <div class="chips mt16">${['I started because…','By now I hope…','Proud of you for…'].map(s=>`<button class="chip" onclick="const t=$('#fcl');t.value=(t.value?t.value+' ':'')+'${s}';t.oninput();t.focus()">${s}</button>`).join('')}</div></div>
  ${foot(btn('Seal it',"go('fc-date')",'wh','data-need="fcl"'))}`,mount(){T.fcl=S.fc.line;needs()}}));
def('fc-date',()=>{if(!T.fcd)T.fcd='anniv';return {cls:'dark',html:`${topbar({title:'Future Club'})}${progress(2,3)}<div class="body"><div class="h2 mt8">When should it open?</div>
  <div class="mt24">${choice('fcd','anniv','Your first Acorns anniversary',FC_DATE)}${choice('fcd','bday','Your next birthday','Uses the birthday on your account')}${choice('fcd','ny','New Year’s Day','January 1, 2027')}</div></div>
  ${foot(btn('Continue',"go('fc-ask')",'wh'))}`}});
def('fc-ask',()=>{if(!T.fca)T.fca=[];return {cls:'dark',html:`${topbar({title:'Future Club'})}${progress(3,3)}<div class="body"><div class="h2 mt8">Ask someone to add a note</div><p class="p mt8">Optional. Your note alone is enough.</p>
  <div class="mt16">${['mom','sam','priya','dad','jess'].map(id=>choice('fca',id,PEOPLE[id].full,'Writes on the web · no account needed',av(id,'s'),1)).join('')}</div></div>
  ${foot(btn('Send asks',"fcSend()",'wh'),btn('Just mine for now',"T.fca=[];go('fc-wait')",'ghost'))}`}});
function fcSend(){if(!T.fca.length){go('fc-wait');return}S.fc.ask=T.fca.slice();save();share({title:`Add a note to ${S.me}’s capsule`,people:T.fca,story:storyCard({bg:'linear-gradient(180deg,#5f253d,#171d19)',eyebrow:'Future Club',title:`Sign ${S.me}’s capsule.`,sub:`It opens ${FC_DATE}.`,art:envelope(160)}),done:()=>setTimeout(()=>go('fc-friend'),300)})}
def('fc-friend',()=>({cls:'ivory',html:`<div style="padding:calc(var(--safeTop)) 12px 8px;background:#f2f2f7;border-bottom:1px solid #ddd;flex-shrink:0"><div class="row" style="background:#e3e3e8;border-radius:10px;height:36px;justify-content:center;font-size:14px">${ic('lock',12)} acorns.com/capsule/alex</div><div class="sm center mt8">What ${PEOPLE[S.fc.ask[0]||'mom'].name} sees · web, no account</div></div>
  <div class="body"><div class="center mt24">${envelope(110)}</div><div class="h2 center mt16">${S.me} asked you to sign their capsule</div><p class="p center mt8">It opens ${FC_DATE}. ${S.me} can’t read it until then.</p>
  <div class="field mt24"><label>Your note</label><textarea rows="4" id="fn">So proud of you for starting. Remember: small steps. Love, ${PEOPLE[S.fc.ask[0]||'mom'].name}</textarea></div>
  <div class="li" onclick="toast('Video notes come later')">${ic('cam',20)}<div class="grow ttl">Record a 15-second video instead</div><span class="badge gray">Later</span></div></div>
  ${foot(btn('Add my note',"S.fc.notes=Math.max(S.fc.ask.length,1);save();go('fc-friend-done')",'dk'))}`}));
def('fc-friend-done',()=>({cls:'green',html:`${topbar({left:'<div style="width:44px"></div>'})}<div class="body center" style="display:flex;flex-direction:column;justify-content:center;align-items:center"><div class="pop">${envelope(150)}</div><div class="h2 mt16">Sealed. ${S.me} sees it in a year.</div><p class="p mt8">Want a capsule of your own?</p>
  <div class="card mt24" style="width:100%;text-align:left"><div class="row">${oak(1,[],{w:44,h:50,ground:false})}<div class="sm grow" style="color:var(--primarySlate)">Start yours and you’ll be planted in ${S.me}’s grove too.</div></div></div></div>
  ${foot(btn('Start my own capsule',"toast('Opens sign-up');setTimeout(()=>go('fc-wait'),600)",'dk'),btn('Back to '+S.me+'’s view',"go('fc-wait')",'ghost'))}`}));
def('fc-wait',()=>({cls:'dark',html:`${topbar({close:"home('menu')",title:'Future Club'})}<div class="body center">
  <div class="mt16 float">${envelope(170)}</div><div class="h2 mt16">Your capsule is sealed</div><p class="p mt8">Opens ${FC_DATE}</p>
  <div class="card dk mt24" style="text-align:left;background:rgba(255,255,255,.07)"><div class="row between"><div class="h4">${(S.fc.notes||0)+1} note${(S.fc.notes||0)?'s':''} waiting</div>${ic('lock',18)}</div><div class="row mt12">${stackAv(['me'].concat(S.fc.ask))}<div class="sm">${S.fc.ask.length?`From you and ${stackNames(S.fc.ask)}`:'Just yours, for now'}</div></div></div>
  <div class="card dk mt12" style="text-align:left;background:rgba(255,255,255,.07)"><div class="row">${ic('cal',20)}<div class="sm grow">Every 90 days we’ll send one quiet check-in: “3 notes waiting. 275 days to go.”</div></div></div>
  <div class="mt24"><button class="sim" onclick="go('fc-open')">${ic('ff',12)} Prototype: jump to ${FC_DATE}</button></div></div>
  ${foot(btn('Ask one more person',"T={fca:[]};go('fc-ask')",'line'))}`}));
def('fc-open',()=>({cls:'dark',html:`${topbar({left:'<div style="width:44px"></div>'})}<div class="body center" style="display:flex;flex-direction:column;justify-content:center;align-items:center">
  <div class="eyebrow">${FC_DATE}</div><div class="h1 mt8">Happy one year, ${S.me}.</div><div class="mt24 pop pulse" style="cursor:pointer" onclick="replace('fc-notes')">${envelope(200)}</div><p class="p mt16">Tap to open</p></div>`,mount(){confetti($('#screen'),80)}}));
def('fc-notes',()=>{const notes=[['me',S.fc.line||'I started because I want to stop worrying about money.']].concat((S.fc.ask.length?S.fc.ask:['mom']).map((id,i)=>[id,['So proud of you for starting. Small steps. Love you.','Told you you’d stick with it. Same time next year?','A year! Your oak must be huge by now.','Keep going. Seriously proud.','We did it together.'][i%5]]));
  return {cls:'ecru',html:`${topbar({close:"home('menu')",title:'Your capsule'})}<div class="body">
  ${notes.map(([id,t],i)=>`<div class="card mt12 rise d${i+1}"><div class="row">${av(id,'s')}<b>${id==='me'?'You, a year ago':PEOPLE[id].name}</b></div><p class="mt12" style="font-size:17px;line-height:1.45;margin-bottom:0">${t}</p></div>`).join('')}
  <div class="card dk mt16 rise d6"><div class="eyebrow" style="color:var(--naturalMoss)">How you showed up</div><div class="grid2 mt12"><div><div class="h2">41</div><div class="sm">weeks invested</div></div><div><div class="h2">18</div><div class="sm">longest streak</div></div><div><div class="h2">5</div><div class="sm">in your grove</div></div><div><div class="h2">4</div><div class="sm">flourishes</div></div></div><p class="sm mt12">Your balance stays private unless you choose to add it.</p></div>
  <div style="height:16px"></div></div>
  ${foot(btn(`${ic('share',20)} Share a keepsake`,`share({title:'One year',story:storyCard({bg:'linear-gradient(180deg,#5f253d,#171d19)',eyebrow:'Future Club',title:'One year. ${notes.length} notes. 41 weeks.',art:envelope(150)})})`,'line'),btn('Start next year’s capsule',"S.fc={line:'',ask:[],notes:0};save();home('fc-write')",'dk'))}`}});

/* ---------- Acorns Year (stories) ---------- */
const AY=[
  {bg:'linear-gradient(180deg,#74c947,#38860e)',e:'Your Acorns Year',t:`${S?S.me:'Alex'}, what a year.`,s:'Tap to see how you grew.',a:()=>squirrel({hold:'wave',w:170})},
  {bg:'linear-gradient(180deg,#263027,#171d19)',e:'You showed up',t:'41 weeks invested.',s:'That’s 4 out of 5 weeks.',a:()=>`<div style="display:grid;grid-template-columns:repeat(8,1fr);gap:5px;width:220px">${Array.from({length:52}).map((_,i)=>`<i style="height:18px;border-radius:5px;background:${[3,9,10,17,22,23,30,31,38,44,45].indexOf(i)>-1?'rgba(255,255,255,.12)':'#74c947'}"></i>`).join('')}</div>`},
  {bg:'linear-gradient(180deg,#38860e,#263027)',e:'Longest streak',t:'18 weeks in a row.',s:'Your oak grew from an acorn to an oak.',a:()=>oak(4,['roots'],{dark:1,w:200,h:224,ground:false})},
  {bg:'linear-gradient(180deg,#f5a623,#be752e)',e:'Flourishes',t:'Roots, acorns, a nest and a songbird.',s:'Four habits beyond investing.',a:()=>oak(4,['roots','acorns','nest','bird'],{w:200,h:224,ground:false})},
  {bg:'linear-gradient(180deg,#bceaa3,#74c947)',dark:1,e:'Your grove',t:'You grew beside 5 people.',s:'Sam, Mom, Dad, Priya and Jess.',a:()=>`<div style="display:flex;align-items:flex-end">${[2,4,3,2,1].map((s,i)=>`<div style="margin-left:-14px">${oak(s,[],{w:70,h:78,ground:false})}</div>`).join('')}</div>`},
  {bg:'linear-gradient(180deg,#263027,#171d19)',e:'Next year',t:'Who are you growing with next?',s:'Share your year and save them a spot.',a:()=>oak(4,['roots','acorns','nest','bird','tree'],{dark:1,w:210,h:236,ground:false})}
];
let ayT;
def('ay-1',p=>{const i=p.i||0;const s=AY[i];const o={bg:s.bg,dark:s.dark,eyebrow:s.e,title:s.t,sub:s.s,art:s.a(),foot:'My Acorns Year'};const card=storyCard(o);const big=storyCard(Object.assign({},o,{css:'aspect-ratio:auto;height:min(640px,calc(100vh - 210px))'}));
  return {cls:'dark',html:`<div style="position:absolute;inset:0;background:#000"></div>
  <div style="position:relative;padding:calc(var(--safeTop) - 6px) 12px 0;display:flex;gap:4px;z-index:3">${AY.map((_,k)=>`<div style="flex:1;height:3px;border-radius:2px;background:rgba(255,255,255,.3);overflow:hidden"><i style="display:block;height:100%;background:#fff;width:${k<i?100:0}%;${k===i?'animation:ayp 5s linear forwards':''}"></i></div>`).join('')}</div>
  <style>@keyframes ayp{to{width:100%}}</style>
  <div style="position:relative;flex:1;display:flex;align-items:center;justify-content:center;padding:12px" onclick="ayTap(event,${i})"><div style="width:100%;max-width:360px" class="${p.dir==='b'?'':'pop'}">${big}</div></div>
  <div class="foot" style="position:relative;flex-direction:row">${btn(ic('close',20),"clearTimeout(ayT);home('menu')",'line','style="width:52px;flex-shrink:0;color:#fff"')}${btn(`${ic('share',20)} Share this`,`clearTimeout(ayT);share({title:'My Acorns Year',story:${JSON.stringify(card).replace(/"/g,'&quot;')}})`,'wh')}${i===AY.length-1?btn('Invite',"clearTimeout(ayT);T={};go('gt-add')",'pri','style="width:110px;flex-shrink:0"'):''}</div>`,
  mount(){clearTimeout(ayT);if(i<AY.length-1)ayT=setTimeout(()=>{if(cur().dataset.id==='ay-1')replace('ay-1',{i:i+1},'fade')},5000)}}});
function ayTap(e,i){clearTimeout(ayT);const r=e.currentTarget.getBoundingClientRect();if(e.clientX-r.left<r.width/3){if(i>0)replace('ay-1',{i:i-1,dir:'b'},'fade')}else if(i<AY.length-1)replace('ay-1',{i:i+1},'fade')}

/* ---------- the other side: getting invited ---------- */
def('sam-lock',()=>({cls:'dark',html:`<div style="position:absolute;inset:0;background:linear-gradient(180deg,#38860e,#171d19)"></div>
  <div class="body" style="position:relative;padding-top:calc(var(--safeTop) + 30px)"><div class="center" style="color:#fff"><div style="font-size:18px;font-weight:600;opacity:.8">Monday, October 26</div><div style="font-size:84px;font-weight:300;line-height:1">9:41</div></div>
  <div class="rise d3 mt32" style="background:rgba(245,245,245,.85);backdrop-filter:blur(20px);border-radius:22px;padding:12px 14px;color:var(--primarySlate);cursor:pointer" onclick="go('sam-web')"><div class="row"><div style="width:38px;height:38px;border-radius:9px;background:#34c759;display:flex;align-items:center;justify-content:center;color:#fff">${ic('chat',22)}</div><div class="grow"><div class="row between"><b>Alex</b><span class="sm">now</span></div><div style="font-size:14px;line-height:1.3">${S.note} acorns.com/g/alex</div></div></div></div>
  <p class="sm center mt16" style="color:rgba(255,255,255,.7)">You’re Sam now. Tap the message.</p></div>
  <div class="foot" style="position:relative">${btn('Back to menu',"home('menu')",'ghost')}</div>`}));
def('sam-web',()=>({html:`<div style="padding:calc(var(--safeTop)) 12px 8px;background:#f2f2f7;border-bottom:1px solid #ddd;flex-shrink:0"><div class="row" style="background:#e3e3e8;border-radius:10px;height:36px;justify-content:center;font-size:14px">${ic('lock',12)} acorns.com/g/alex</div></div>
  <div class="body flush"><div class="scene" style="height:300px;border-radius:0">${hills({})}<div style="position:absolute;left:30%;bottom:20px;transform:translateX(-50%);text-align:center">${oak(3,['roots','acorns'],{w:150,h:168})}<div style="font-weight:700;font-size:13px">Alex</div></div><div style="position:absolute;left:70%;bottom:34px;transform:translateX(-50%);text-align:center"><div class="pulse" style="width:74px;height:74px;border-radius:37px;border:2.5px dashed rgba(23,29,25,.4);display:flex;align-items:center;justify-content:center">${ic('plus',26)}</div><div style="font-weight:700;font-size:13px;margin-top:6px">Your spot</div></div></div>
  <div style="padding:20px var(--pad)"><div class="h1">Alex saved you a spot in their grove.</div><p class="p mt12">Invest a little each week and your oak grows beside theirs. You’ll see each other’s weeks. Never balances.</p>
  <div class="card flat mt16"><div class="kv"><span>Start with</span><b>As little as $5</b></div><div class="kv"><span>Alex sees</span><b>Your oak and weeks</b></div><div class="kv"><span>Alex never sees</span><b>Amounts or balances</b></div></div>
  <p class="sm mt16">Investing involves risk. Placeholder disclosure for the prototype.</p></div></div>
  ${foot(btn('Plant my acorn',"go('sam-join')"))}`}));
def('sam-join',()=>({html:`${topbar({title:'Join Acorns'})}<div class="body"><div class="h2 mt8">Let’s plant your acorn</div><p class="p mt8">You’ll grow beside Alex as soon as you’re in.</p>
  <div class="field mt24"><label>First name</label><input value="Sam" oninput="T.sn=this.value"></div><div class="field mt12"><label>Email</label><input placeholder="sam@example.com" type="email"></div>
  <div class="card flat mt16"><div class="row">${av('me','s')}<div class="sm grow" style="color:var(--primarySlate)">Joining from Alex’s invite. You can remove each other anytime.</div></div></div>
  <p class="sm mt16">The real sign-up continues here (identity, funding). The prototype skips ahead.</p></div>
  ${foot(btn('Continue',"go('sys-load',{msg:'Planting you beside Alex',next:'sam-planted'})"))}`}));
def('sam-planted',()=>({cls:'green',html:`${topbar({left:'<div style="width:44px"></div>'})}<div class="body">
  <div class="scene mt8" style="height:300px">${hills({})}<div style="position:absolute;left:32%;bottom:20px;transform:translateX(-50%);text-align:center">${oak(3,['roots','acorns'],{w:140,h:156})}<div style="font-weight:700;font-size:13px">Alex</div></div><div style="position:absolute;left:70%;bottom:26px;transform:translateX(-50%);text-align:center" class="grow-in d3">${oak(0,[],{w:100,h:112})}<div style="font-weight:700;font-size:13px">You</div></div></div>
  <div class="h1 mt24">You’re planted beside Alex.</div><p class="p mt8">Invest this week and your acorn sprouts. Alex’s tree is on your hill too.</p></div>
  ${foot(btn('Invest this week',"toast('Sam’s first investment flow');setTimeout(()=>home('menu'),900)",'dk'),btn('Back to menu',"home('menu')",'ghost'))}`,mount(){confetti($('#screen'),60)}}));

/* ---------- system map ---------- */
def('map',()=>{const box=(t,s,bg,col)=>`<div style="background:${bg};color:${col||'var(--primarySlate)'};border-radius:14px;padding:10px 12px;font-size:13px;font-weight:600;line-height:1.25">${t}${s?`<div style="font-weight:500;opacity:.7;font-size:11px;margin-top:2px">${s}</div>`:''}</div>`;
  const arrow=l=>`<div class="center" style="padding:6px 0;color:var(--primaryStone)"><svg width="20" height="26" viewBox="0 0 20 26"><path d="M10 0v22M3 15l7 8 7-8" stroke="currentColor" stroke-width="2" fill="none"/></svg>${l?`<div class="sm" style="font-size:11px">${l}</div>`:''}</div>`;
  return {html:`${topbar({title:'How it all connects'})}<div class="body">
  <div class="eyebrow mt8">Ways in</div><div class="grid2 mt8">${[['Grow Together','After sign-up'],['Money Type','From social'],['Skip and Stash','Friends challenge'],['Future Club','Goals, family'],['Acorns Year','Yearly share'],['Invite link','Anywhere']].map(([a,b])=>box(a,b,'var(--naturalMoss)')).join('')}</div>
  ${arrow('everyone you bring in lands in')}
  <div class="card dk" style="padding:16px"><div class="h4">Your grove</div><p class="sm mt8">One per person. Only you see yours. Connections are mutual.</p>
   <div class="grid2 mt12">${box('Streak','Sets your oak’s height','rgba(255,255,255,.1)','#fff')}${box('Your oak','Stage + flourishes','rgba(255,255,255,.1)','#fff')}${box('Side by side','Weeks with each person','rgba(255,255,255,.1)','#fff')}${box('Challenges','Many at once','rgba(255,255,255,.1)','#fff')}</div>
   <p class="sm mt12" style="color:var(--naturalMoss)">One investment counts everywhere it fits.</p></div>
  ${arrow('other healthy habits add')}
  <div class="eyebrow">Flourishes ← products</div><div class="mt8">${Object.keys(FL).map(k=>`<div class="row" style="padding:8px 0;border-bottom:1px solid #f0f0f0"><div style="width:44px">${oak(3,[k],{w:40,h:44,ground:false})}</div><div class="grow"><b style="font-size:14px">${FL[k].name}</b><div class="sm">${FL[k].habit}</div></div><button class="link" style="font-size:13px" onclick="${FL[k].start}">Try</button></div>`).join('')}</div>
  ${arrow('loops back')}
  ${box('Add to your grove → new tree on both hills','Every flow ends with a way to bring someone in','#fbe7c6')}
  <div class="card flat mt24"><div class="h4">Rules</div><p class="sm mt8">Never amounts or balances. No streak freezes or pauses. Self-reported check-ins, never spending surveillance. Remove anyone quietly.</p></div>
  <div style="height:20px"></div></div>`}});
