/* Grow Together · plugged into Streaks */
const PFL={sam:['roots','acorns'],mom:['roots','nest','gold'],dad:['roots'],priya:['bird'],jess:[],marcus:[],leo:[],nina:[]};
function stageFor(w){return w>=20?5:w>=10?4:w>=6?3:w>=3?2:w>=1?1:0}
const STAGE_NAME=['Acorn','Sprout','Sapling','Young oak','Oak','Ancient oak'];
const CH_TYPES={
  side:{t:'Side by side',d:'Invest any amount each week, together.',counts:'invest',unit:'weeks',lens:[4,8,12],icon:'oak',prod:'Invest'},
  skip:{t:'Skip and Stash week',d:'Skip one thing for 7 days. Invest what you didn’t spend.',counts:'checkin',unit:'days',lens:[7],icon:'flag',prod:'Invest'},
  roundups:{t:'Round-Ups month',d:'Everyone keeps Round-Ups® on for 30 days.',counts:'roundups',unit:'days',lens:[30],icon:'card',prod:'Round-Ups®',need:'ru'},
  nest:{t:'Rainy-day starter',d:'Each of you starts an Emergency Fund and adds to it 4 times.',counts:'ef',unit:'deposits',lens:[4],icon:'drop',prod:'Emergency Fund',need:'ef'},
  learn:{t:'Learn together',d:'Finish one 2-minute lesson each week.',counts:'learn',unit:'weeks',lens:[3,6],icon:'spark',prod:'Learn'},
  later:{t:'Future-you month',d:'Everyone contributes to Later this month.',counts:'later',unit:'weeks',lens:[4],icon:'cal',prod:'Later',need:'later'}
};
function tabbar(on){const t=[['gt-home','Home','home'],['gt-grove','Grove','grove'],['gt-ch','Challenges','flag'],['gt-oak','Your oak','oak']];
  return `<div class="tabbar">${t.map(([id,l,i])=>`<button class="tab ${on===id?'on':''}" onclick="home('${id}')">${ic(i)}${l}</button>`).join('')}</div>`}

/* ---------- onboarding: why ---------- */
def('gt-welcome',()=>({cls:'green',html:`${topbar({left:'<div style="width:44px"></div>'})}
  <div class="body center" style="display:flex;flex-direction:column;align-items:center;justify-content:center">
    <div class="eyebrow rise">Account created</div>
    <div class="h1 rise d1 mt12" style="font-size:40px">You’re in, ${S.me}.</div>
    <p class="p rise d2 mt12" style="max-width:280px;font-size:17px">Before you go anywhere, let’s plant something.</p>
    <div class="pop d3 mt24">${squirrel({hold:'wave',w:190})}</div>
  </div>${foot(btn('Let’s go',"go('gt-why1')",'dk'))}`,mount(){confetti($('#screen'),80)}}));

function whyShell(i,html,next){return `${topbar({left:`<div style="width:44px"></div>`,right:`<button class="link" style="padding:0 14px;color:rgba(255,255,255,.7)" onclick="home('gt-home')">Skip</button>`})}
  <div class="body" style="display:flex;flex-direction:column">${html}</div>
  <div class="foot">${dots(i,4)}${btn(i<3?'Continue':'Choose my people',`go('${next}')`,'wh')}</div>`}
def('gt-why1',()=>({cls:'dark',html:whyShell(0,`
  <div class="hero-art" style="height:330px" id="w1art">${oak(0,[],{dark:1,w:260,h:290})}</div>
  <div class="eyebrow rise mt16">Your oak</div><div class="h1 rise d1 mt8">It starts as an acorn. Today.</div>
  <p class="p rise d2 mt12">Every week you invest, it grows: sprout, sapling, oak. It’s your Streak, made visible.</p>`,'gt-why2'),
  mount(el){let s=0;const a=$('#w1art',el);const t=setInterval(()=>{if(!document.body.contains(a)){clearInterval(t);return}s=(s+1)%6;a.innerHTML=`<div class="grow-in">${oak(s,s===5?['roots']:[],{dark:1,w:260,h:290})}</div>`},1100)}}));
def('gt-why2',()=>({cls:'dark',html:whyShell(1,`
  <div class="card dk mt8" style="background:rgba(255,255,255,.06);padding:20px"><div class="row between"><div><div class="sm">Your Streak</div><div class="h1" id="wk" style="font-size:48px">1</div><div class="sm">weeks in a row</div></div><div id="w2art">${oak(1,[],{dark:1,w:130,h:146})}</div></div><div class="mt16" id="w2row">${weeksRow(8,1)}</div></div>
  <div class="eyebrow rise mt32">Built on habit</div><div class="h1 rise d1 mt8">One investment a week keeps it growing.</div>
  <p class="p rise d2 mt12">Any amount counts. $5 counts. Set it once and the weeks add up on their own.</p>`,'gt-why3'),
  mount(el){let w=1;const t=setInterval(()=>{const k=$('#wk',el);if(!k){clearInterval(t);return}w++;if(w>12){clearInterval(t);return}k.textContent=w;$('#w2row',el).innerHTML=weeksRow(8,Math.min(w,8));if([3,6,10].indexOf(w)>-1)$('#w2art',el).innerHTML=`<div class="grow-in">${oak(stageFor(w),[],{dark:1,w:130,h:146})}</div>`},420)}}));
def('gt-why3',()=>({cls:'dark',html:whyShell(2,`
  <div class="scene" style="height:300px;margin:0 calc(-1*var(--pad));border-radius:0">${hills({dark:1})}
    <div style="position:absolute;left:16%;bottom:16px" class="rise d2">${oak(3,['roots'],{dark:1,w:130,h:146})}<div class="center sm" style="color:#fff">Sam</div></div>
    <div style="position:absolute;left:50%;transform:translateX(-50%);bottom:26px" class="rise">${oak(3,['roots','acorns'],{dark:1,w:170,h:190})}<div class="center" style="font-weight:600">You</div></div>
    <div style="position:absolute;right:12%;bottom:16px" class="rise d4">${oak(4,['nest'],{dark:1,w:130,h:146})}<div class="center sm" style="color:#fff">Mom</div></div></div>
  <div class="eyebrow rise mt16">Family first</div><div class="h1 rise d1 mt8">Grow beside the people you love.</div>
  <p class="p rise d2 mt12">Your grove is everyone growing with you. You see their oaks. They see yours. Nobody sees a balance.</p>`,'gt-why4')}));
def('gt-why4',()=>({cls:'dark',html:whyShell(3,`
  <div class="center mt8"><div class="pop" style="display:inline-flex;align-items:center;justify-content:center;width:96px;height:96px;border-radius:48px;background:var(--primaryGreen);color:var(--naturalMidnightForest);font-size:30px;font-weight:700">$5</div></div>
  <div class="mt24" id="w4">${[['Your Streak','Week 6'],['Side by side with Sam','Week 4'],['Side by side with Mom','Week 4'],['Family 12-week oak','5 of 12']].map(([a,b],i)=>`<div class="row rise d${i*2+2}" style="padding:12px 14px;border-radius:14px;background:rgba(255,255,255,.07);margin-bottom:8px"><div style="width:26px;height:26px;border-radius:13px;background:var(--primaryGreen);display:flex;align-items:center;justify-content:center;color:var(--naturalMidnightForest)">${ic('check',16)}</div><div class="grow" style="font-weight:600">${a}</div><div class="sm">${b}</div></div>`).join('')}</div>
  <div class="eyebrow rise mt16">Counted everywhere</div><div class="h1 rise d1 mt8" style="font-size:30px">One investment. Every streak.</div>
  <p class="p rise d2 mt12">You never do the same thing four times. One $5 counts for you and everyone you grow beside.</p>`,'gt-people-intro')}));

/* ---------- onboarding: people ---------- */
def('gt-people-intro',()=>({html:`${topbar({})}
  <div class="body">
    <div class="scene mt8" style="height:250px">${hills({})}
      <div style="position:absolute;left:50%;bottom:20px;transform:translateX(-50%)" class="pop">${oak(0,[],{w:110,h:124})}<div class="center" style="font-weight:600;font-size:13px">You</div></div>
      ${[[16,34],[78,30],[30,14],[66,12]].map(([l,b],i)=>`<div class="rise d${i+2}" style="position:absolute;left:${l}%;bottom:${b+20}px;width:54px;height:54px;border-radius:27px;border:2px dashed rgba(23,29,25,.3);display:flex;align-items:center;justify-content:center;color:rgba(23,29,25,.45)">${ic('plus',20)}</div>`).join('')}
    </div>
    <div class="h2 mt24">Who do you want to grow beside?</div>
    <p class="p mt8">Pick family and friends. They get a spot on your hill, and you get one on theirs.</p>
    <div class="mt16"><div class="row" style="padding:8px 0">${ic('eye',20,'color:var(--primaryForest)')}<div class="sm grow" style="color:var(--primarySlate)">They see your oak and your weeks. Never amounts or balances.</div></div>
    <div class="row" style="padding:8px 0">${ic('lock',20,'color:var(--primaryForest)')}<div class="sm grow" style="color:var(--primarySlate)">Only you see your grove. Remove anyone quietly, anytime.</div></div></div>
  </div>${foot(btn('Choose from contacts',"askContacts(()=>go(S.perm.contacts==='denied'?'gt-manual':'gt-people'))"),btn('Share a link instead',"inviteLink()",'ghost'))}`}));
function inviteLink(){share({title:`${S.me} saved you a spot`,story:inviteStory(),done:()=>{if(!S.grove.length)S.grove.push({id:'sam',status:'invited',side:0});save();setTimeout(()=>go('gt-sent'),700)}})}
function inviteStory(){return storyCard({bg:'linear-gradient(180deg,#74c947,#38860e)',eyebrow:'Grow with me',title:`${S.me} saved you a spot in her grove.`,sub:'One small investment a week. We both grow.',art:`<div style="display:flex;align-items:flex-end;gap:6px">${oak(2,['roots'],{w:120,h:134,ground:false})}<div style="width:70px;height:70px;border-radius:35px;border:2.5px dashed rgba(255,255,255,.7);margin-bottom:8px"></div></div>`})}
def('gt-people',p=>{if(!T.ppl)T.ppl=(p.pre||[]).slice();const lim=S.perm.contacts==='limited';const on=['sam','mom','dad','priya'],off=lim?['jess']:['jess','marcus','leo','nina'];
  const row=id=>{const g=inGrove(id);const sel=T.ppl.indexOf(id)>-1;return `<div class="choice ${sel?'on':''} pr" data-k="ppl" data-n="${PEOPLE[id].full.toLowerCase()}" onclick="${g?`toast('${PEOPLE[id].name} is already in your grove')`:`pick(this,'ppl','${id}',1);pplBar()`}" style="background:transparent;padding:10px 4px;margin:0;border-radius:0;box-shadow:none;border-bottom:1px solid #f0f0f0">${av(id)}<div class="grow"><div class="ttl">${PEOPLE[id].full}</div><div class="sub">${g?'In your grove':PEOPLE[id].on?'On Acorns':PEOPLE[id].phone}</div></div>${g?'<span class="badge">Added</span>':PEOPLE[id].on?'<span class="badge">On Acorns</span>':''}${g?'':'<div class="check"></div>'}</div>`};
  return {html:`${topbar({title:p.add?'Add to your grove':'Choose your people'})}
  <div style="padding:0 var(--pad) 10px"><div class="search">${ic('search',18,'opacity:.4')}<input placeholder="Search name or number" oninput="$$('.pr').forEach(r=>r.style.display=r.dataset.n.includes(this.value.toLowerCase())?'':'none')"></div><div id="pplbar" class="row mt12" style="min-height:32px;gap:6px;flex-wrap:wrap"></div></div>
  <div class="body">${lim?`<div class="note">You shared a few contacts. <span class="link" style="font-size:13px" onclick="toast('Opens iOS contact picker')">Add more</span></div>`:''}
    <div class="eyebrow mt16">Already on Acorns</div>${on.map(row).join('')}
    <div class="eyebrow mt24">Contacts</div>${off.map(row).join('')}
    <div class="li mt8" onclick="go('gt-manual',{add:${p.add?1:0}})"><div class="lockic">${ic('plus',18)}</div><div class="grow"><div class="ttl">Add by phone or email</div></div>${ic('chev',18,'opacity:.35')}</div>
    <div class="li" onclick="inviteLink()"><div class="lockic">${ic('link',18)}</div><div class="grow"><div class="ttl">Share your link anywhere</div><div class="sub">Instagram, WhatsApp, group chats</div></div>${ic('chev',18,'opacity:.35')}</div>
  </div>${foot(`<button class="btn pri" id="pplcta" data-need="ppl" onclick="go('gt-invite',{add:${p.add?1:0}})">Continue</button>`)}`,mount(){needs();pplBar()}}});
function pplBar(){const b=$('#pplbar',cur());if(!b)return;const a=T.ppl||[];b.innerHTML=a.length?a.map(id=>`<span class="chip on" style="height:32px;font-size:13px;padding:0 12px">${PEOPLE[id].name} ${ic('close',12)}</span>`).join(''):'<span class="sm">Pick one person or a few. You can add more later.</span>';const c=$('#pplcta',cur());if(c)c.textContent=a.length?`Plant beside ${a.length===1?PEOPLE[a[0]].name:a.length+' people'}`:'Continue'}
def('gt-manual',p=>({html:`${topbar({title:'Add someone'})}<div class="body"><div class="h2 mt8">Who should we invite?</div>
  <div class="field mt24"><label>Name</label><input id="mn" placeholder="First name" oninput="T.mn=this.value;needs()"></div>
  <div class="field mt12"><label>Phone or email</label><input id="mp" placeholder="(555) 000-0000" inputmode="tel" oninput="T.mp=this.value"></div>
  <p class="sm mt12">We only use this to send your invite.</p></div>
  ${foot(btn('Add','manualAdd('+(p.add?1:0)+')','pri','data-need="mn"'))}`,mount:needs}));
function manualAdd(add){const id='nina';PEOPLE.nina.name=T.mn;PEOPLE.nina.full=T.mn;T.ppl=T.ppl||[];if(T.ppl.indexOf(id)<0)T.ppl.push(id);toast(T.mn+' added');setTimeout(()=>{stack.pop();go('gt-invite',{add})},400)}
def('gt-invite',p=>{const ids=T.ppl||[];return {html:`${topbar({title:'Your invite'})}<div class="body">
  <div style="width:62%;margin:8px auto 0" class="pop">${inviteStory()}</div>
  <div class="field mt24"><label>Add a note</label><textarea rows="2" oninput="S.note=this.value;save()">${S.note}</textarea></div>
  <div class="h4 mt24">Send to ${ids.map(i=>PEOPLE[i].name).join(', ')}</div>
  <div class="mt12">${choice('via','text','Text each person','From your Messages app','<div class="lockic">'+ic('chat',18)+'</div>')}${choice('via','share','Share anywhere','Instagram, WhatsApp, Snapchat, and more','<div class="lockic">'+ic('share',18)+'</div>')}</div>
  </div>${foot(btn('Send invites',`sendInvites(${p.add?1:0})`,'pri','data-need="via"'))}`,mount(){if(!T.via){T.via='text'};refreshChoice();needs()}}});
function refreshChoice(){$$('[data-k="via"]',cur()).forEach(x=>x.classList.toggle('on',x.getAttribute('onclick').indexOf("'"+T.via+"'")>-1))}
function sendInvites(add){const ids=T.ppl||[];const done=()=>{ids.forEach(id=>{if(!inGrove(id))S.grove.push({id,status:'invited',side:0})});save();setTimeout(()=>{if(add){toast('Invites sent');back2('gt-grove')}else go('gt-sent')},650)};
  SHARE={title:`${S.me} saved you a spot`,story:inviteStory(),to:ids.map(i=>PEOPLE[i].full).join(', '),text:S.note,done};
  if(T.via==='text')go('sys-msg',{kind:'msg'});else share(SHARE)}
def('gt-sent',()=>{const inv=S.grove.filter(g=>g.status==='invited');return {html:`${topbar({left:'<div style="width:44px"></div>'})}<div class="body">
  <div class="scene" style="height:280px">${hills({})}
    <div style="position:absolute;left:50%;bottom:20px;transform:translateX(-50%)">${oak(0,[],{w:110,h:124})}<div class="center" style="font-weight:600;font-size:13px">You</div></div>
    ${inv.slice(0,4).map((g,i)=>{const pos=[[12,40],[74,36],[30,110],[60,112]][i];return `<div class="pop d${i+1}" style="position:absolute;left:${pos[0]}%;bottom:${pos[1]}px;text-align:center"><div class="pulse" style="width:56px;height:56px;border-radius:28px;border:2px dashed rgba(23,29,25,.35);display:flex;align-items:center;justify-content:center">${av(g.id,'s')}</div><div style="font-size:11px;font-weight:600;margin-top:4px">Waiting for ${nm(g.id)}</div></div>`}).join('')}
  </div>
  <div class="h2 mt24">Invites sent.</div><p class="p mt8">When they plant, their tree shows up on your hill and yours on theirs.</p>
  <div class="card flat mt16"><div class="row">${ic('cal',22)}<div class="sm grow" style="color:var(--primarySlate)">No reply in 14 days? The spot quietly turns back into “Invite someone.” Nobody gets nagged.</div></div></div></div>
  ${foot(btn('Next: make this week count',"go('gt-habit')"))}`}});
def('gt-habit',()=>({cls:'dark',html:`${topbar({})}<div class="body">
  <div class="card dk mt8" style="background:rgba(255,255,255,.06);padding:20px"><div class="row between"><div><div class="sm">Your Streak</div><div class="h1" style="font-size:44px">0</div><div class="sm">weeks</div></div>${oak(0,[],{dark:1,w:120,h:134})}</div>${weeksRow(8,0,1)}</div>
  <div class="h1 mt32">Make this week count.</div><p class="p mt12">Set a weekly investment and this week counts for you and for everyone you invited.</p>
  <div class="row mt16" style="padding:12px 14px;border-radius:14px;background:rgba(116,201,71,.14)">${oak(1,['roots'],{w:40,h:46,ground:false,dark:1})}<div class="sm grow" style="color:#fff">Bonus: a recurring investment gives your oak <b>roots</b>.</div></div></div>
  ${foot(btn('Set a weekly investment',"S.ret='gt-ready';T={};go('rec-1')",'wh'),btn('Just invest once',"S.ret='gt-ready';T={};S.afterCount='gt-ready';go('inv-1')",'ghost'))}`}));
def('gt-ready',()=>({html:`${topbar({left:'<div style="width:44px"></div>'})}<div class="body center" style="display:flex;flex-direction:column;align-items:center;justify-content:center">
  <div class="pop" style="position:relative">${squirrel({hold:'heart',w:170})}<div style="position:absolute;top:0;right:-10px;width:44px;height:44px;border-radius:22px;background:var(--primarySunrise);color:#fff;display:flex;align-items:center;justify-content:center" class="pulse">${ic('bell',24)}</div></div>
  <div class="h2 mt24">Know when ${S.grove[0]?nm(S.grove[0].id):'they'} plants</div><p class="p mt8" style="max-width:300px">We’ll tell you when someone joins your grove, cheers you on, or needs a little water. Never more than a couple a week.</p></div>
  ${foot(btn('Turn on notifications',"askNotif(()=>home('gt-home'))"),btn('Not now',"S.perm.notif='later';save();home('gt-home')",'ghost'))}`}));

/* ---------- home ---------- */
def('gt-home',()=>{const g=growing(),inv=S.grove.filter(x=>x.status==='invited');const open=S.grove.find(x=>x.open&&x.status==='growing');const done=S.invested;
  return {cls:'ivory',html:`<div class="top" style="background:transparent"><div class="row" style="padding-left:12px">${av('me','s')}<div><div class="sm">Good morning</div><div class="h4">${S.me}</div></div></div><button class="iconbtn" onclick="protoMenu()">${ic('menu',22)}</button></div>
  <div class="body" style="padding-top:4px">
   <div class="card dk tap" onclick="home('gt-oak')" style="padding:20px;position:relative;overflow:hidden">
     <div class="row between" style="align-items:flex-start"><div><div class="sm">Your Streak</div><div class="h1" style="font-size:44px">${S.streak}</div><div class="sm">week${S.streak===1?'':'s'} in a row · ${STAGE_NAME[S.stage]}</div></div><div style="margin:-14px -10px -10px 0">${oak(S.stage,S.flourishes,{dark:1,w:130,h:146})}</div></div>
     <div class="mt12">${weeksRow(8,Math.min(S.streak,8),!done)}</div>
     <div class="mt16">${done?`<div class="row" style="gap:8px;color:var(--primaryGreen);font-weight:600">${ic('check',20)} This week counts${S.recurring?` · next one ${S.day}`:''}</div>`:`<button class="btn wh" style="height:46px" onclick="event.stopPropagation();T={};S.afterCount='gt-home';S.ret='gt-home';go('inv-1')">Invest this week</button>`}</div>
   </div>
   <div class="card mt16 tap" onclick="home('gt-grove')">
     <div class="row between"><div class="h4">Your grove</div><span class="sm">${g.length} growing${inv.length?` · ${inv.length} invited`:''}</span></div>
     <div class="row mt16" style="gap:10px;overflow-x:auto;padding-bottom:4px">${S.grove.length?S.grove.map(x=>`<div class="center" style="flex-shrink:0;width:60px">${x.status==='growing'?`<div style="height:64px;display:flex;align-items:flex-end;justify-content:center">${oak(PEOPLE[x.id].stage,PFL[x.id],{w:58,h:64,dim:x.open})}</div>`:`<div style="height:64px;display:flex;align-items:center;justify-content:center"><div style="width:44px;height:44px;border-radius:22px;border:2px dashed #ccc"></div></div>`}<div style="font-size:12px;font-weight:600;margin-top:4px">${nm(x.id)}</div></div>`).join(''):`<div class="sm">No one yet. Add someone to grow beside.</div>`}</div>
     ${open?`<div class="row mt12" style="padding:10px 12px;border-radius:12px;background:#eef6ff">${ic('drop',18,'color:var(--primarySky)')}<div class="sm grow" style="color:var(--primarySlate)"><b>${nm(open.id)} hasn’t invested yet this week.</b> Send rain as a gentle nudge?</div></div>`:''}
   </div>
   <div class="card mt16">
     <div class="row between"><div class="h4">Challenges</div><button class="link" onclick="go('gt-ch-new')">+ Start</button></div>
     ${S.invites.length?S.invites.map(v=>`<div class="row mt12" style="padding:12px;border-radius:14px;background:#f4f9ef" onclick="go('gt-ch-invite',{id:'${v.id}'})">${av(v.from,'s')}<div class="grow"><div style="font-weight:600;font-size:14px">${nm(v.from)} invited you</div><div class="sm">${v.title} · ${v.len} ${v.unit}</div></div><span class="badge">View</span></div>`).join(''):''}
     ${S.challenges.length?S.challenges.slice(0,3).map(chRow).join(''):`<p class="sm mt8">Bring people in on something specific: a no-delivery week, Round-Ups month, or 8 weeks side by side.</p>`}
     ${S.challenges.length>3?`<div class="link mt12" onclick="home('gt-ch')">See all ${S.challenges.length}</div>`:''}
   </div>
   <div class="card mt16 tap" onclick="home('gt-oak')"><div class="row between"><div class="h4">Flourishes</div><span class="sm">${S.flourishes.length} of 9</span></div>
     <div class="row mt12" style="flex-wrap:wrap;gap:6px">${Object.keys(FL).map(k=>`<span class="badge ${S.flourishes.indexOf(k)>-1?'':'gray'}">${FL[k].name}</span>`).join('')}</div></div>
   <div style="height:60px"></div>
  </div>
  ${S.ffDone?'':`<button class="ff" onclick="jumpAhead();refresh();toast('Jumped ahead 4 weeks')">${ic('ff',12)} Jump ahead 4 weeks</button>`}
  ${tabbar('gt-home')}`,
  mount(){const inv=S.grove.find(x=>x.status==='invited'&&PEOPLE[x.id].on);if(inv&&!S.ffDone){setTimeout(()=>{if(cur().dataset.id!=='gt-home')return;inv.status='growing';inv.side=0;save();banner(`${nm(inv.id)} planted beside you`,'Their tree is on your hill. Yours is on theirs.',()=>home('gt-grove'));refresh()},2600)}}}});
function chRow(c){const t=CH_TYPES[c.type];const me=c.prog.me||0;return `<div class="row mt12" style="padding:12px 0;border-top:1px solid #f0f0f0;cursor:pointer" onclick="go('gt-ch-detail',{id:'${c.id}'})"><div class="lockic" style="width:40px;height:40px;border-radius:12px;background:#eef6e8;color:var(--primaryForest)">${ic(t.icon,20)}</div><div class="grow"><div style="font-weight:600;font-size:15px">${c.title}</div><div class="bar mt8" style="height:6px"><i style="width:${Math.round(me/c.len*100)}%"></i></div></div><div style="text-align:right">${stackAv(c.people.slice(0,3))}<div class="sm mt8" style="font-size:11px">${me}/${c.len} ${c.unit}</div></div></div>`}

/* ---------- invest counted everywhere ---------- */
def('gt-counted',()=>{const before=S.streak,stBefore=S.stage;const firstThisWeek=!S.invested;
  if(firstThisWeek){S.streak++;S.invested=true}
  const after=S.streak;S.stage=stageFor(after);const grew=S.stage>stBefore;
  const rows=[[`Your Streak`,`Week ${before} → ${after}`]];
  growing().forEach(g=>{if(firstThisWeek)g.side=(g.side||0)+1;rows.push([`Side by side with ${nm(g.id)}`,`Week ${g.side}`])});
  S.challenges.filter(c=>c.counts==='invest').forEach(c=>{if(firstThisWeek)c.prog.me=Math.min(c.len,(c.prog.me||0)+1);rows.push([c.title,`${c.prog.me} of ${c.len}`])});
  save();
  return {cls:'dark',html:`${topbar({left:'<div style="width:44px"></div>'})}<div class="body">
  <div class="center"><div class="pop" style="display:inline-flex;align-items:center;justify-content:center;width:84px;height:84px;border-radius:42px;background:var(--primaryGreen);color:var(--naturalMidnightForest);font-size:24px;font-weight:700">${money(T.inv||S.amount)}</div></div>
  <div class="h1 center mt16 rise">One investment.<br>Counted for everyone.</div>
  <div class="mt24">${rows.map(([a,b],i)=>`<div class="row rise d${Math.min(i+2,8)}" style="padding:12px 14px;border-radius:14px;background:rgba(255,255,255,.07);margin-bottom:8px"><div style="width:26px;height:26px;border-radius:13px;background:var(--primaryGreen);display:flex;align-items:center;justify-content:center;color:var(--naturalMidnightForest)">${ic('check',16)}</div><div class="grow" style="font-weight:600">${a}</div><div class="sm">${b}</div></div>`).join('')}</div>
  ${grew?`<div class="card dk rise d8 mt8" style="background:rgba(116,201,71,.14)"><div class="row"><div class="grow-in d8">${oak(S.stage,S.flourishes,{dark:1,w:84,h:94})}</div><div class="grow"><div class="h4">Your oak grew</div><div class="sm">It’s a ${STAGE_NAME[S.stage].toLowerCase()} now. Everyone in your grove will see it.</div></div></div></div>`:''}
  ${!S.recurring?`<div class="card dk rise d8 mt8" style="background:rgba(255,255,255,.07)"><div class="row"><div class="grow"><div class="h4">Make it weekly?</div><div class="sm">Never think about it again, and give your oak roots.</div></div><button class="btn wh sm" onclick="T={};go('rec-1')">Set it</button></div></div>`:''}
  </div>${foot(btn(`${ic('share',20)} Share week ${after}`,`share({title:'Week ${after}',story:storyCard({eyebrow:'Acorns Streak',title:'${after} weeks in a row.',sub:'Growing beside ${growing().slice(0,2).map(g=>nm(g.id)).join(' and ')||'my people'}.',art:oak(${S.stage},${JSON.stringify(S.flourishes).replace(/"/g,"'")},{dark:1,w:200,h:224})})})`,'wh'),btn('Done',`back2(S.afterCount||'gt-home')`,'ghost'))}`,
  mount(){confetti($('#screen'),50)}}});

/* ---------- grove ---------- */
const GPOS=[[20,70],[80,68],[8,92],[92,90],[34,52],[66,50],[50,96],[24,40]];
def('gt-grove',()=>{const all=S.grove;return {cls:'ivory',html:`<div class="top"><div class="h3" style="padding-left:14px">Your grove</div><div class="row" style="gap:0"><button class="iconbtn" onclick="go('gt-privacy')">${ic('eye',22)}</button><button class="iconbtn" onclick="protoMenu()">${ic('menu',22)}</button></div></div>
  <div class="body flush">
   <div class="scene" style="height:360px;border-radius:0">${hills({})}
     ${all.map((g,i)=>{const [l,b]=GPOS[i%GPOS.length];const p=PEOPLE[g.id];const z=Math.round(100-b);return `<div style="position:absolute;left:${l}%;bottom:${b}px;transform:translateX(-50%);text-align:center;z-index:${z};cursor:pointer" onclick="personSheet('${g.id}')">${g.status==='growing'?`<div class="grow-in d${i%6+1}">${oak(p.stage,PFL[g.id],{w:86,h:96,dim:g.open})}</div>`:`<div style="width:56px;height:56px;border-radius:28px;border:2px dashed rgba(23,29,25,.3);margin:0 auto 8px;display:flex;align-items:center;justify-content:center">${av(g.id,'s')}</div>`}<div style="font-size:12px;font-weight:600;background:rgba(255,255,255,.85);border-radius:10px;padding:2px 8px;display:inline-block">${nm(g.id)}${g.open?' '+ic('drop',11,'color:#4da1ef;vertical-align:-1px'):''}</div></div>`}).join('')}
     <div style="position:absolute;left:50%;bottom:20px;transform:translateX(-50%);text-align:center;z-index:50" onclick="home('gt-oak')">${oak(S.stage,S.flourishes,{w:150,h:168})}<div style="font-size:13px;font-weight:700;background:#fff;border-radius:10px;padding:3px 10px;display:inline-block">You</div></div>
   </div>
   <div style="padding:16px var(--pad)">
    <p class="sm">Only you see this grove. Everyone you add has their own.</p>
    <div class="card mt12" style="padding:6px 16px">${all.length?all.map(g=>`<div class="li" onclick="personSheet('${g.id}')">${av(g.id)}<div class="grow"><div class="ttl">${nm(g.id)}</div><div class="sub">${g.status==='invited'?'Invite sent · waiting to plant':g.open?'Hasn’t invested yet this week':`${g.side||0} weeks side by side`}</div></div>${g.open?`<span class="badge" style="background:#eef6ff;color:#1f6fb8">Water</span>`:g.status==='invited'?'<span class="badge gray">Invited</span>':''}${ic('chev',18,'opacity:.35')}</div>`).join(''):'<p class="sm" style="padding:12px 0">Your hill is waiting for someone.</p>'}</div>
    <div class="mt16">${btn(`${ic('plus',20)} Add to your grove`,"T={};go('gt-add')",'dk')}</div>
   </div><div style="height:30px"></div></div>${tabbar('gt-grove')}`}});
def('gt-add',()=>SCR['gt-people']({add:1}));
function personSheet(id){const g=inGrove(id);const p=PEOPLE[id];const ch=S.challenges.filter(c=>c.people.indexOf(id)>-1);
  if(g.status==='invited'){sheet(`<div class="row">${av(id,'l')}<div><div class="h3">${p.full}</div><div class="sm">Invite sent · ${p.phone}</div></div></div>
   <p class="p mt16">Their spot stays on your hill for 14 days. Nothing is sent again unless you choose to.</p>
   <div class="mt24">${btn('Resend invite',`closeOv();SHARE={title:'${S.me} saved you a spot',story:inviteStory(),to:'${p.full}',text:S.note};setTimeout(()=>go('sys-msg',{kind:'msg'}),250)`)}${btn('Simulate: '+p.name+' plants',`closeOv();inGrove('${id}').status='growing';save();refresh();banner('${p.name} planted beside you','Their tree is on your hill now.')`,'ghost')}${btn('Cancel invite',`closeOv();S.grove=S.grove.filter(x=>x.id!=='${id}');save();refresh();toast('Invite canceled')`,'ghost')}</div>`);return}
  sheet(`<div class="row">${av(id,'l')}<div class="grow"><div class="h3">${p.full}</div><div class="sm">${p.rel} · ${STAGE_NAME[p.stage]}</div></div><div>${oak(p.stage,PFL[id],{w:70,h:78,dim:g.open})}</div></div>
   <div class="card flat mt16"><div class="row between"><div class="h4">${g.side||0} weeks side by side</div><span class="sm">Both invested</span></div><div class="mt12">${weeksRow(8,Math.min(g.side||0,8),g.open)}</div></div>
   ${g.open?`<div class="row mt12" style="padding:12px;border-radius:14px;background:#eef6ff">${ic('drop',20,'color:var(--primarySky)')}<div class="sm grow" style="color:var(--primarySlate)">${p.name} hasn’t invested yet this week. Rain is a gentle nudge. It only counts when they invest. No amounts, ever.</div></div>`:''}
   ${ch.length?`<div class="eyebrow mt24">Challenges together</div>${ch.map(c=>`<div class="li" onclick="closeOv();setTimeout(()=>go('gt-ch-detail',{id:'${c.id}'}),220)"><div class="grow"><div class="ttl" style="font-size:15px">${c.title}</div><div class="sub">${p.name}: ${c.prog[id]||0}/${c.len} · You: ${c.prog.me||0}/${c.len}</div></div>${ic('chev',18,'opacity:.35')}</div>`).join('')}`:''}
   <div class="mt24" style="display:flex;flex-direction:column;gap:8px">
    ${g.open?btn(`${ic('drop',20)} Water ${p.name}’s oak`,`closeOv();setTimeout(()=>go('gt-water',{id:'${id}'}),220)`):''}
    ${btn('Start a challenge with '+p.name,`closeOv();T={chp:['${id}']};setTimeout(()=>go('gt-ch-new'),220)`,g.open?'line':'pri')}
    ${btn(`${ic('share',20)} Share our ${g.side||0} weeks`,`closeOv();setTimeout(()=>share({title:'${g.side||0} weeks side by side',story:storyCard({bg:'linear-gradient(180deg,#74c947,#38860e)',eyebrow:'Side by side',title:'${p.name} and me: ${g.side||0} weeks growing together.',art:'<div style=&quot;display:flex;align-items:flex-end&quot;>'+oak(${S.stage},[],{w:110,h:124,ground:false})+oak(${p.stage},[],{w:110,h:124,ground:false})+'</div>'})}),250)`,'line')}
    ${btn('Remove from grove',`closeOv();setTimeout(()=>alertBox('Remove ${p.name}?','${p.name} won’t be told. Your tree quietly leaves their hill too.',[{t:'Cancel'},{t:'Remove',b:1,fn:()=>{S.grove=S.grove.filter(x=>x.id!=='${id}');save();refresh();toast('Removed')}}]),260)`,'ghost','style="color:var(--primaryError)"')}
   </div>`)}
def('gt-water',p=>{const per=PEOPLE[p.id];if(!T.wn)T.wn='Thinking of you this week';return {cls:'dark',html:`${topbar({close:true,title:'Water '+per.name+'’s oak'})}
  <div class="body"><div class="scene" style="height:300px;margin:0 calc(-1*var(--pad));border-radius:0" id="wscene">${hills({dark:1})}<div style="position:absolute;left:50%;bottom:24%;transform:translateX(-50%)" id="wtree">${oak(per.stage,PFL[p.id],{dark:1,w:200,h:224,dim:1})}</div><div style="position:absolute;right:20px;bottom:120px" class="float">${squirrel({hold:'can',w:96,flip:1})}</div></div>
  <div class="h2 mt16" id="wt">Send ${per.name} a little rain</div><p class="p mt8" id="wp">${per.name} hasn’t invested yet this week. Rain is a soft nudge: a little rain on their oak and your note. It only counts when they invest. They never see amounts, and neither do you.</p>
  <div class="chips mt16" id="wchips">${['Thinking of you this week','Your oak looks thirsty','We’ve got this','Same time Friday?'].map(n=>chip('wn',n,n)).join('')}</div></div>
  <div class="foot" id="wfoot">${btn(`${ic('drop',20)} Send rain`,`waterSend('${p.id}')`,'wh')}</div>`}});
function waterSend(id){const el=cur();const s=$('#wscene',el).getBoundingClientRect(),h=$('#screen').getBoundingClientRect();rain($('#screen'),s.left-h.left+s.width/2,s.top-h.top+30);
  $('#wt',el).textContent='Rain sent.';$('#wp',el).textContent=`${PEOPLE[id].name} will see it next time they open Acorns. No follow-ups from us.`;$('#wchips',el).innerHTML=`<div class="sim">${ic('ff',12)} Prototype</div>`;
  $('#wfoot',el).innerHTML=btn(`Simulate: ${PEOPLE[id].name} invests`,`waterWorked('${id}')`,'wh')+btn('Done',"back()",'ghost');S.watered=id;save()}
function waterWorked(id){const g=inGrove(id);g.open=false;g.side=(g.side||0)+1;save();replace('gt-water-ok',{id})}
def('gt-water-ok',p=>{const per=PEOPLE[p.id];return {cls:'dark',html:`${topbar({left:'<div style="width:44px"></div>'})}<div class="body center">
  <div class="scene" style="height:320px;margin:0 calc(-1*var(--pad));border-radius:0" id="wo">${hills({dark:1})}<div style="position:absolute;left:50%;bottom:24%;transform:translateX(-50%)"><div class="grow-in">${oak(per.stage,PFL[p.id].concat(['water']),{dark:1,w:210,h:236})}</div></div></div>
  <div class="eyebrow mt16 rise">${per.name} invested</div><div class="h1 mt8 rise d1">Your rain worked.</div><p class="p mt8 rise d2">${per.name}’s week counts. That’s ${inGrove(p.id).side} weeks side by side.</p></div>
  ${foot(btn('Continue',"addFlourish('water')?(S.ret='gt-grove',replace('fl-unlock',{k:'water'})):back2('gt-grove')",'wh'))}`,
  mount(el){const o=$('#wo',el).getBoundingClientRect(),h=$('#screen').getBoundingClientRect();sparkles($('#screen'),o.left-h.left+o.width/2,o.top-h.top+150,12)}}});
def('gt-privacy',()=>{if(T.pv===undefined){T.pv=1;T.pvw=true;T.pvf=true;T.pvq=false}return {html:`${topbar({title:'What your grove sees'})}<div class="body">
  <div class="card flat mt8"><div class="row"><div>${oak(S.stage,S.flourishes,{w:70,h:78,ground:false})}</div><div class="sm grow" style="color:var(--primarySlate)">People in your grove see your oak, your weeks, and your flourishes. That’s it.</div></div></div>
  <div class="mt16">${tog('pvw','Streak weeks','How many weeks in a row')}${tog('pvf','Flourishes','Roots, acorns, nest and the rest')}${tog('pva','Amounts and balances','Never shared, for anyone','Amounts are never shared')}${tog('pvq','Quiet mode','Pause cheers and rain notifications')}</div>
  <div class="divider mt16"></div><div class="h4 mt24">Who can find you</div>${tog('pvc','People in my contacts on Acorns','They can invite you to their grove')}
  </div>`}});

/* ---------- your oak ---------- */
def('gt-oak',()=>({cls:'dark',html:`<div style="position:absolute;inset:0 0 auto 0;height:430px">${hills({dark:1})}</div>
  <div class="top" style="position:relative"><div class="h3" style="padding-left:14px;color:#fff">Your oak</div><div class="row" style="gap:0"><button class="iconbtn" onclick="shareOak()">${ic('share',22)}</button><button class="iconbtn" onclick="protoMenu()">${ic('menu',22)}</button></div></div>
  <div class="body" style="position:relative">
   <div class="center" style="height:300px;display:flex;align-items:flex-end;justify-content:center">${oak(S.stage,S.flourishes,{dark:1,w:270,h:300})}</div>
   <div class="center mt8"><div class="h2">${STAGE_NAME[S.stage]}</div><p class="sm mt8">${S.streak} week streak · ${S.flourishes.length} of 9 flourishes</p></div>
   <p class="p mt24">Your Streak sets how tall it grows. Flourishes come from other healthy habits.</p>
   <div class="grid2 mt16">${Object.keys(FL).map(k=>{const on=S.flourishes.indexOf(k)>-1;return `<div class="card dk tap" style="padding:14px;background:${on?'rgba(116,201,71,.16)':'rgba(255,255,255,.06)'}" onclick="flourishSheet('${k}')"><div style="height:56px;display:flex;align-items:flex-end;${on?'':'filter:grayscale(1);opacity:.45'}">${oak(3,[k],{w:56,h:62,ground:false})}</div><div style="font-weight:600;margin-top:8px">${FL[k].name}</div><div class="sm" style="font-size:12px">${on?'Growing':FL[k].habit}</div></div>`}).join('')}</div>
   <div style="height:20px"></div></div>${tabbar('gt-oak')}`}));

/* ---------- challenges ---------- */
def('gt-ch',()=>({cls:'ivory',html:`<div class="top"><div class="h3" style="padding-left:14px">Challenges</div><button class="iconbtn" onclick="protoMenu()">${ic('menu',22)}</button></div>
  <div class="body">
   <p class="sm">Run as many as you like. One investment counts toward every one it fits.</p>
   ${S.invites.length?`<div class="eyebrow mt24">Invitations</div>${S.invites.map(v=>`<div class="card mt12 tap" onclick="go('gt-ch-invite',{id:'${v.id}'})"><div class="row">${av(v.from)}<div class="grow"><div class="h4">${v.title}</div><div class="sm">${nm(v.from)} invited you · ${v.len} ${v.unit}</div></div><span class="badge">New</span></div></div>`).join('')}`:''}
   <div class="eyebrow mt24">Running · ${S.challenges.length}</div>
   ${S.challenges.length?S.challenges.map(c=>{const t=CH_TYPES[c.type];return `<div class="card mt12 tap" onclick="go('gt-ch-detail',{id:'${c.id}'})"><div class="row between"><div class="row"><div class="lockic" style="width:40px;height:40px;border-radius:12px;background:#eef6e8;color:var(--primaryForest)">${ic(t.icon,20)}</div><div><div class="h4">${c.title}</div><div class="sm">${t.prod} · counts ${t.counts==='invest'?'any investment':t.counts==='checkin'?'daily check-ins':t.counts}</div></div></div></div>
     <div class="mt16">${c.people.map(id=>`<div class="row" style="margin-top:8px">${av(id,'xs')}<div style="width:54px;font-size:13px;font-weight:600">${nm(id)}</div><div class="bar grow" style="height:6px"><i style="width:${Math.round((c.prog[id]||0)/c.len*100)}%"></i></div><div class="sm" style="width:44px;text-align:right">${c.prog[id]||0}/${c.len}</div></div>`).join('')}</div></div>`}).join(''):`<div class="card mt12"><p class="p">Nothing running yet.</p></div>`}
   <div class="mt24">${btn(`${ic('plus',20)} Start a challenge`,"T={};go('gt-ch-new')",'dk')}</div><div style="height:20px"></div>
  </div>${tabbar('gt-ch')}`}));
def('gt-ch-new',()=>({html:`${topbar({title:'Start a challenge'})}<div class="body"><div class="h2 mt8">What do you want to do together?</div><p class="p mt8">Each one ties to a real habit. Nobody sees amounts.</p>
  <div class="mt16">${Object.keys(CH_TYPES).map(k=>{const t=CH_TYPES[k];const ready=!t.need||S[t.need]||(t.need==='ru'&&S.ru.on);return `<div class="choice" onclick="T.cht='${k}';T.chlen=${t.lens[0]};go('gt-ch-people')"><div class="lockic" style="width:44px;height:44px;border-radius:14px;background:#eef6e8;color:var(--primaryForest)">${ic(t.icon,22)}</div><div class="grow"><div class="ttl">${t.t}</div><div class="sub">${t.d}</div>${ready?'':`<div class="badge gold mt8" style="display:inline-block">Needs ${t.prod}</div>`}</div>${ic('chev',18,'opacity:.35')}</div>`}).join('')}</div></div>`}));
def('gt-ch-people',()=>{if(!T.chp)T.chp=[];const g=S.grove.map(x=>x.id);const others=Object.keys(PEOPLE).filter(i=>g.indexOf(i)<0).slice(0,3);
  const row=(id,sub)=>`<div class="choice ${T.chp.indexOf(id)>-1?'on':''}" data-k="chp" onclick="pick(this,'chp','${id}',1)" style="padding:12px">${av(id,'s')}<div class="grow"><div class="ttl">${PEOPLE[id].full}</div><div class="sub">${sub}</div></div><div class="check"></div></div>`;
  return {html:`${topbar({title:CH_TYPES[T.cht].t})}${progress(1,3)}<div class="body"><div class="h2 mt8">Who’s in?</div><p class="p mt8">Pick as many as you like. People not on Acorns get a link.</p>
  ${g.length?`<div class="eyebrow mt24">Your grove</div><div class="mt8">${g.map(id=>row(id,inGrove(id).status==='growing'?'In your grove':'Invited')).join('')}</div>`:''}
  <div class="eyebrow mt16">Contacts</div><div class="mt8">${others.map(id=>row(id,PEOPLE[id].on?'On Acorns':'Gets a link to join')).join('')}</div>
  <div class="li" onclick="T.chlink=!T.chlink;this.querySelector('.tog').classList.toggle('on')"><div class="lockic">${ic('link',18)}</div><div class="grow"><div class="ttl">Anyone with the link</div><div class="sub">Post it to a group chat or your story</div></div><div class="tog ${T.chlink?'on':''}"></div></div></div>
  ${foot(btn('Continue',"go('gt-ch-set')",'pri','data-need="chp"'))}`,mount:needs}});
def('gt-ch-set',()=>{const t=CH_TYPES[T.cht];if(!T.chstart)T.chstart='Today';if(T.cht==='skip'&&!T.thing)T.thing='Delivery';if(!T.chname)T.chname=T.cht==='skip'?`No-${T.thing.toLowerCase()} week`:t.t;
  return {html:`${topbar({title:t.t})}${progress(2,3)}<div class="body"><div class="h2 mt8">Set it up</div>
  ${T.cht==='skip'?`<div class="h4 mt24">What are you skipping?</div><div class="chips mt12">${['Delivery','Coffee out','Rideshare','Impulse buys','Takeout lunch'].map(x=>chip('thing',x,x)).join('')}</div>`:''}
  <div class="h4 mt24">How long</div><div class="chips mt12">${t.lens.map(l=>chip('chlen',l,`${l} ${t.unit}`)).join('')}</div>
  <div class="h4 mt24">Starts</div><div class="chips mt12">${['Today','Next Monday'].map(x=>chip('chstart',x,x)).join('')}</div>
  <div class="field mt24"><label>Name</label><input value="${T.chname}" oninput="T.chname=this.value"></div>
  <div class="mt16">${tog('chdollars','Show dollars to the group','Off by default. Only progress is shared.',T.cht==='skip'?'':'Only progress is shared for this one')}</div></div>
  ${foot(btn('Review',"go('gt-ch-review')"))}`}});
window.onPick=(k,v)=>{if(k==='thing'){T.chname=`No-${v.toLowerCase()} week`;const i=$('input',cur());if(i&&cur().dataset.id==='gt-ch-set')i.value=T.chname}};
def('gt-ch-review',()=>{const t=CH_TYPES[T.cht];const ready=!t.need||(t.need==='ru'?S.ru.on:S[t.need]);const inv=S.challenges.filter(c=>c.counts==='invest').length;
  const setup={ru:"S.ret='gt-ch-review';T2=T;go('ru-1')",ef:"S.ret='gt-ch-review';go('ef-0')",later:"S.ret='gt-ch-review';go('later-1')"}[t.need];
  return {html:`${topbar({title:'Review'})}${progress(3,3)}<div class="body"><div class="h2 mt8">${T.chname}</div><p class="p mt8">${t.d}</p>
  <div class="card mt24"><div class="kv"><span>With</span><b>${T.chp.map(nm).join(', ')}${T.chlink?' + link':''}</b></div><div class="kv"><span>Length</span><b>${T.chlen} ${t.unit}</b></div><div class="kv"><span>Starts</span><b>${T.chstart}</b></div><div class="kv"><span>Shared</span><b>${T.chdollars?'Progress and dollars':'Progress only'}</b></div></div>
  ${t.counts==='invest'?`<div class="card flat mt16"><div class="row">${ic('check',22,'color:var(--primaryForest)')}<div class="sm grow" style="color:var(--primarySlate)">Your weekly ${money(S.amount)} already counts toward ${inv} challenge${inv===1?'':'s'}. This makes ${inv+1}. Nothing extra to do.</div></div></div>`:''}
  ${ready?'':`<div class="card mt16" style="box-shadow:inset 0 0 0 2px var(--primarySunrise)"><div class="row"><div class="grow"><div class="h4">You’ll need ${t.prod}</div><div class="sm">Takes about a minute.</div></div><button class="btn dk sm" onclick="T2=T;${setup}">Set up</button></div></div>`}
  </div>${foot(btn('Start and invite',"chStart()",'pri',ready?'':'disabled'))}`}});
let T2=null;
function chStart(){const t=CH_TYPES[T.cht];const c={id:'c'+Date.now(),type:T.cht,title:T.chname,people:['me'].concat(T.chp),len:T.chlen,unit:t.unit,prog:{me:0},counts:t.counts,thing:T.thing,fresh:1};
  share({title:`Join my challenge: ${c.title}`,story:storyCard({bg:'linear-gradient(180deg,#263027,#171d19)',eyebrow:'Challenge',title:c.title,sub:`${c.len} ${c.unit} · ${c.people.length} people · progress only`,art:squirrel({hold:'acorn',w:150})}),people:T.chp,done:()=>{S.challenges.unshift(c);c.people.forEach(i=>{if(i!=='me'&&!inGrove(i))S.grove.push({id:i,status:'invited',side:0})});save();setTimeout(()=>go('gt-ch-started',{id:c.id}),650)}})}
def('gt-ch-started',p=>{const c=S.challenges.find(x=>x.id===p.id);return {cls:'green',html:`${topbar({left:'<div style="width:44px"></div>'})}<div class="body center" style="display:flex;flex-direction:column;justify-content:center;align-items:center">
  <div class="pop">${squirrel({hold:'wave',w:170})}</div><div class="eyebrow mt16">Challenge started</div><div class="h1 mt8">${c.title}</div><p class="p mt8">${stackNames(c.people)} are in. You’re running ${S.challenges.length} at once.</p></div>
  ${foot(btn('See challenge',`home('gt-ch');setTimeout(()=>go('gt-ch-detail',{id:'${c.id}'}),420)`,'dk'))}`,mount(){confetti($('#screen'),70)}}});
function stackNames(ids){const n=ids.map(nm);return n.length>2?n.slice(0,-1).join(', ')+' and '+n[n.length-1]:n.join(' and ')}
def('gt-ch-detail',p=>{const c=S.challenges.find(x=>x.id===p.id);if(!c)return {html:''};const t=CH_TYPES[c.type];const left=c.len-(c.prog.me||0);
  return {html:`${topbar({title:'',right:`<button class="iconbtn" onclick="share({title:'${c.title.replace(/'/g,'')}',story:storyCard({eyebrow:'Challenge',title:'${c.title.replace(/'/g,'')}',sub:'${c.prog.me||0} of ${c.len} ${c.unit} done',art:squirrel({hold:'flowers',w:150})})})">${ic('share',22)}</button>`})}
  <div class="body"><div class="row"><div class="lockic" style="width:52px;height:52px;border-radius:16px;background:#eef6e8;color:var(--primaryForest)">${ic(t.icon,26)}</div><div><div class="h2">${c.title}</div><div class="sm">${left} ${c.unit} to go · ${t.prod}</div></div></div>
   ${c.type==='skip'?`<div class="card dk mt24"><div class="h4">Day ${Math.min((c.prog.me||0)+1,7)} of 7</div><p class="sm mt8">Skipped ${(c.thing||'it').toLowerCase()} today?</p><div class="row mt16" style="gap:8px"><button class="btn wh" style="height:46px;flex:1" onclick="chCheck('${c.id}')">Skipped it today</button><button class="btn line" style="height:46px;flex:.6;color:#fff" onclick="toast('Tomorrow’s a new day')">Not today</button></div></div>`:''}
   <div class="card mt16"><div class="h4">Progress</div><p class="sm mt8">What counts: ${t.counts==='invest'?'any investment that week, recurring or one-time':t.counts==='checkin'?'a daily check-in, on your honor':t.d}</p>
    <div class="mt16">${c.people.map(id=>`<div style="margin-top:12px"><div class="row" style="gap:8px">${av(id,'xs')}<div class="grow" style="font-size:14px;font-weight:600">${nm(id)}</div><div class="sm">${c.prog[id]||0}/${c.len}</div></div><div class="mt8">${c.len<=12?weeksRow(c.len,c.prog[id]||0):`<div class="bar"><i style="width:${Math.round((c.prog[id]||0)/c.len*100)}%"></i></div>`}</div></div>`).join('')}</div></div>
   <div class="card mt16"><div class="h4">Cheer them on</div><div class="chips mt12">${['Nice one','Keep going','Proud of us','See you Friday'].map(x=>`<button class="chip" onclick="this.classList.add('on');toast('Cheer sent')">${x}</button>`).join('')}</div>
    <div class="mt16">${c.people.filter(i=>i!=='me').slice(0,3).map((id,i)=>`<div class="row" style="padding:8px 0">${av(id,'xs')}<div class="sm grow" style="color:var(--primarySlate)">${[`<b>${nm(id)}</b> checked in`,`<b>${nm(id)}</b> cheered you: “Keep going”`,`<b>${nm(id)}</b> joined`][i%3]}</div><div class="sm">${i+1}h</div></div>`).join('')}</div></div>
   <div class="mt16" style="display:flex;flex-direction:column;gap:8px">${btn(`${ic('plus',20)} Invite more people`,`T={chp:[]};share({title:'Join: ${c.title.replace(/'/g,'')}',story:storyCard({eyebrow:'Challenge',title:'${c.title.replace(/'/g,'')}',art:squirrel({hold:'acorn',w:150})})})`,'line')}${btn('Leave challenge',`alertBox('Leave ${c.title.replace(/'/g,'')}?','Others keep going. Nobody gets a notification.',[{t:'Stay'},{t:'Leave',b:1,fn:()=>{S.challenges=S.challenges.filter(x=>x.id!=='${c.id}');save();back();toast('You left the challenge')}}])`,'ghost','style="color:var(--primaryError)"')}</div>
  </div>`}});
function chCheck(id){const c=S.challenges.find(x=>x.id===id);c.prog.me=Math.min(c.len,(c.prog.me||0)+1);save();if(c.prog.me>=c.len){replace('ss-end',{ch:id})}else{refresh();toast('Checked in · day '+c.prog.me)}}
def('gt-ch-invite',p=>{const v=S.invites.find(x=>x.id===p.id);const t=CH_TYPES[v.type];return {html:`${topbar({title:''})}<div class="body center">
  <div class="mt16 pop"><img src="${IMG.learn}" style="height:110px"></div><div class="row mt16" style="justify-content:center">${av(v.from,'s')}<span class="sm">${PEOPLE[v.from].full} invited you</span></div>
  <div class="h1 mt12">${v.title}</div><p class="p mt8">${t.d}</p>
  <div class="card mt24" style="text-align:left"><div class="kv"><span>Length</span><b>${v.len} ${v.unit}</b></div><div class="kv"><span>Who’s in</span><b>${PEOPLE[v.from].name}, Priya</b></div><div class="kv"><span>Shared</span><b>Progress only</b></div><div class="kv"><span>Counts</span><b>${t.counts==='learn'?'One lesson a week':'Any investment'}</b></div></div></div>
  ${foot(btn('Join challenge',`chAccept('${v.id}')`),btn('No thanks',`S.invites=S.invites.filter(x=>x.id!=='${v.id}');save();back();toast('Declined quietly')`,'ghost'))}`}});
function chAccept(id){const v=S.invites.find(x=>x.id===id);S.invites=S.invites.filter(x=>x.id!==id);S.challenges.unshift({id:'c'+Date.now(),type:v.type,title:v.title,people:['me',v.from,'priya'],len:v.len,unit:v.unit,prog:{me:0,[v.from]:1,priya:1},counts:CH_TYPES[v.type].counts});if(!inGrove(v.from))S.grove.push({id:v.from,status:'growing',side:0});save();toast(`You’re in. ${S.challenges.length} challenges running`);back()}
