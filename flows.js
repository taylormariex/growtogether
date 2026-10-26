/* Product setup flows: every selection, entry and connection a habit needs */
let T={};
function cur(){return $$('.scr').pop()}
function pick(el,key,val,multi){
  if(multi){el.classList.toggle('on');const a=T[key]||(T[key]=[]);const i=a.indexOf(val);i<0?a.push(val):a.splice(i,1)}
  else{$$(`[data-k="${key}"]`,cur()).forEach(x=>x.classList.remove('on'));el.classList.add('on');T[key]=val}
  needs();if(window.onPick)onPick(key,val)}
function needs(){$$('[data-need]',cur()).forEach(b=>{const k=b.dataset.need;const v=T[k];b.disabled=!(Array.isArray(v)?v.length:v)})}
function chip(key,val,label,on){if(on&&T[key]===undefined)T[key]=val;return `<button class="chip ${T[key]===val?'on':''}" data-k="${key}" onclick="pick(this,'${key}',${JSON.stringify(val).replace(/"/g,'&quot;')})">${label}</button>`}
function choice(key,val,title,sub,icon,multi){const on=multi?(T[key]||[]).indexOf(val)>-1:T[key]===val;return `<div class="choice ${on?'on':''}" data-k="${key}" onclick="pick(this,'${key}','${val}',${multi?1:0})">${icon||''}<div class="grow"><div class="ttl">${title}</div>${sub?`<div class="sub">${sub}</div>`:''}</div>${multi?'<div class="check"></div>':'<div class="radio"></div>'}</div>`}
function tog(key,label,sub,lock){const on=!!T[key];return `<div class="li" style="cursor:default"><div class="grow"><div class="ttl">${label}</div>${sub?`<div class="sub">${sub}</div>`:''}</div><div class="tog ${on?'on':''} ${lock?'lock':''}" onclick="${lock?`toast('${lock}')`:`T['${key}']=!T['${key}'];this.classList.toggle('on')`}"></div></div>`}
const money=n=>'$'+(Math.round(n*100)/100).toLocaleString(undefined,{minimumFractionDigits:n%1?2:0});

/* keypad sheet */
let KP={v:'',cb:null};
function keypad(init,cb,title){KP={v:String(init||''),cb};
  sheet(`<div class="h4 center">${title||'Amount'}</div><div class="amt" id="kpv">${money(+KP.v||0)}</div>
  <div class="keys">${[1,2,3,4,5,6,7,8,9,'.',0,'⌫'].map(k=>`<button onclick="kp('${k}')">${k}</button>`).join('')}</div>
  <div class="mt12">${btn('Done','kpDone()')}</div>`)}
function kp(k){if(k==='⌫')KP.v=KP.v.slice(0,-1);else if(k==='.'){if(KP.v.indexOf('.')<0)KP.v+=(KP.v?'':'0')+'.'}else if(KP.v.replace('.','').length<6)KP.v+=k;$('#kpv').textContent=money(+KP.v||0)}
function kpDone(){const v=+KP.v||0;closeOv();if(v>0&&KP.cb)KP.cb(v)}

/* generic loading → next */
def('sys-load',p=>({cls:p.dark?'dark':'',html:`<div class="body" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px">
  <svg width="54" height="54" viewBox="0 0 54 54" class="spin"><circle cx="27" cy="27" r="22" stroke="${p.dark?'rgba(255,255,255,.15)':'#eee'}" stroke-width="5" fill="none"/><path d="M27 5a22 22 0 0122 22" stroke="var(--primaryGreen)" stroke-width="5" fill="none" stroke-linecap="round"/></svg>
  <div class="h4">${p.msg||'One moment'}</div></div>`,
  mount(){setTimeout(()=>{stack.pop();go(p.next,p.np,'fade')},1500)}}));

/* ---------- flourish catalog ---------- */
const FL={
  roots:{name:'Roots',habit:'Recurring investment',line:'Your oak puts down roots when you invest on a schedule.',how:'Set a weekly recurring investment',start:"startFlow('rec-1')"},
  acorns:{name:'Acorns',habit:'Round-Ups®',line:'Spare change from everyday buys grows acorns on your branches.',how:'Turn on Round-Ups®',start:"startFlow('ru-1')"},
  nest:{name:'Nest',habit:'Emergency Fund',line:'A nest appears when you start a rainy-day cushion.',how:'Start an Emergency Fund',start:"startFlow('ef-0')"},
  gold:{name:'Gold leaves',habit:'Acorns Later',line:'Investing for retirement turns a few leaves gold.',how:'Open a Later account',start:"startFlow('later-1')"},
  sapling:{name:'Sapling',habit:'Acorns Early',line:'Start investing for a kid and a sapling grows beside you.',how:'Add a kid with Early',start:"startFlow('early-0')"},
  flowers:{name:'Wildflowers',habit:'Earn rewards',line:'Rewards from brands you already shop bloom at your roots.',how:'Activate an Earn offer',start:"startFlow('earn-1')"},
  bird:{name:'Songbird',habit:'Learn',line:'Finish a short lesson and a songbird lands in your oak.',how:'Read a 2-minute lesson',start:"startFlow('learn-1')"},
  water:{name:'Rain',habit:'Water someone',line:'A gentle nudge for someone who hasn’t invested yet this week. When they invest, it rains on both oaks.',how:'Water someone in your grove',start:"go('gt-grove')"},
  tree:{name:'New tree',habit:'Grow your grove',line:'Every person who joins plants a tree on your hill.',how:'Add someone to your grove',start:"go('gt-add')"}
};
function startFlow(id){S.ret=stack.length?stack[stack.length-1].id:'gt-home';T={};closeOv();setTimeout(()=>go(id),closeOv?200:0)}
function flourishSheet(k){const f=FL[k];const has=S.flourishes.indexOf(k)>-1;
  sheet(`<div class="center"><div style="display:flex;justify-content:center;margin:-6px 0 4px">${oak(Math.max(S.stage,3),[k],{w:150,h:168})}</div>
  <div class="eyebrow">${f.habit}</div><div class="h2 mt8">${f.name}</div><p class="p mt8">${f.line}</p>
  <p class="sm mt12">Your grove sees the ${f.name.toLowerCase()} on your oak. Never an amount.</p></div>
  <div class="mt24">${has?btn('Share your oak',"closeOv();setTimeout(shareOak,250)"):btn(f.how,f.start)}</div>`)}

/* flourish unlocked */
def('fl-unlock',p=>{const f=FL[p.k];return {cls:'dark',html:`
  <div style="position:absolute;inset:0">${hills({dark:1})}</div>
  ${topbar({left:'<div style="width:44px"></div>'})}
  <div class="body" style="position:relative;display:flex;flex-direction:column;align-items:center;text-align:center;padding-top:10px">
    <div class="eyebrow rise">New flourish</div>
    <div class="h1 rise d1 mt8">${f.name}</div>
    <p class="p rise d2 mt8" style="max-width:290px">${f.line}</p>
    <div class="grow-in d3" style="margin-top:18px" id="flo">${oak(Math.max(S.stage,2),S.flourishes,{dark:1,w:250,h:280})}</div>
    <div class="card dk rise d5" style="width:100%;text-align:left;background:rgba(255,255,255,.08)"><div class="row"><div class="stack">${growing().slice(0,3).map(g=>av(g.id,'xs')).join('')||av('sam','xs')}</div><div class="sm grow">${growing().length?`${growing().slice(0,2).map(g=>nm(g.id)).join(' and ')} will see this on your oak.`:'People in your grove will see this on your oak.'}</div></div></div>
  </div>
  ${foot(btn(`${ic('share',20)} Share`,'shareOak()','wh'),btn('Continue','finish()','ghost'))}`,
  mount(el){confetti($('#screen'),60);const o=$('#flo',el).getBoundingClientRect(),h=$('#screen').getBoundingClientRect();setTimeout(()=>sparkles($('#screen'),o.left-h.left+o.width/2,o.top-h.top+o.height/2,10),700)}}});
function shareOak(){share({title:'My oak on Acorns',story:storyCard({eyebrow:`Week ${S.streak||1} streak`,title:`My oak has ${S.flourishes.length} flourish${S.flourishes.length===1?'':'es'}.`,sub:'Grow yours beside mine.',art:oak(Math.max(S.stage,2),S.flourishes,{dark:1,w:200,h:224})})})}

/* ---------- recurring investment ---------- */
def('rec-1',()=>{if(T.amt===undefined)T.amt=S.amount;if(!T.freq)T.freq='Weekly';if(!T.day)T.day=S.day;return {html:`${topbar({title:'Recurring investment'})}${progress(1,3)}
  <div class="body"><div class="h2 mt8">How much each week?</div><p class="p mt8">Any amount keeps your streak going. You can change or stop it anytime.</p>
  <div class="chips mt24" id="amts">${[5,10,20,50].map(a=>chip('amt',a,'$'+a)).join('')}<button class="chip ${[5,10,20,50].indexOf(T.amt)<0?'on':''}" data-k="amt" onclick="keypad(T.amt,v=>{T.amt=v;refresh()},'Custom amount')">${[5,10,20,50].indexOf(T.amt)<0?money(T.amt):'Custom'}</button></div>
  <div class="h4 mt32">How often</div><div class="chips mt12">${['Daily','Weekly','Monthly'].map(f=>chip('freq',f,f)).join('')}</div>
  <p class="sm mt8">Streaks count weeks. Weekly keeps it simple.</p>
  <div class="h4 mt24">Which day</div><div class="chips mt12">${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d=>chip('day',d,d)).join('')}</div>
  <p class="sm mt8">Pick the day you get paid, or any day that’s easy to remember.</p></div>
  ${foot(btn('Continue',"go('rec-2')"))}`}});
def('rec-2',()=>{if(!T.src)T.src=S.accounts[0].id;return {html:`${topbar({title:'Recurring investment'})}${progress(2,3)}
  <div class="body"><div class="h2 mt8">Fund it from</div><p class="p mt8">We’ll move ${money(T.amt)} from this account every ${T.day}.</p>
  <div class="mt24">${S.accounts.map(a=>choice('src',a.id,`${a.name} ••${a.mask}`,`${a.bank} · ${a.type}`,`<div class="lockic">${ic('bank',18)}</div>`)).join('')}</div>
  <div class="li" onclick="S.bankRet='rec-2';T={...T};go('bank-1')"><div class="lockic">${ic('plus',18)}</div><div class="grow ttl">Link a new account</div>${ic('chev',18,'opacity:.35')}</div></div>
  ${foot(btn('Review',"go('rec-3')",'pri','data-need="src"'))}`,mount:needs}});
def('rec-3',()=>{const a=S.accounts.find(x=>x.id===T.src)||S.accounts[0];return {html:`${topbar({title:'Review'})}${progress(3,3)}
  <div class="body"><div class="h2 mt8">Review your recurring investment</div>
  <div class="card mt24"><div class="kv"><span>Amount</span><b>${money(T.amt)}</b></div><div class="kv"><span>Repeats</span><b>${T.freq}${T.freq==='Weekly'?' on '+T.day:''}</b></div><div class="kv"><span>First one</span><b>This ${T.day}</b></div><div class="kv"><span>From</span><b>${a.name} ••${a.mask}</b></div><div class="kv"><span>Into</span><b>Invest account</b></div></div>
  <div class="card flat mt16"><div class="row">${oak(1,['roots'],{w:44,h:50,ground:false})}<div class="sm grow"><b style="color:var(--primarySlate)">Counts everywhere.</b> Each one adds a week to your streak, every side-by-side, and every challenge that counts investing.</div></div></div>
  <p class="sm mt16">Investing involves risk, including loss of principal. You can pause or cancel anytime in Settings.</p></div>
  ${foot(btn('Start recurring investment',"recConfirm()"))}`}});
function recConfirm(){S.amount=T.amt;S.day=T.day;S.recurring=true;if(!S.invested){S.invested=true;S.streak=Math.max(S.streak,1)}save();go('sys-load',{msg:'Setting it up',next:'rec-done'})}
def('rec-done',()=>({cls:'green',html:`${topbar({left:'<div style="width:44px"></div>'})}<div class="body center" style="display:flex;flex-direction:column;align-items:center;justify-content:center">
  <div class="pop">${squirrel({hold:'acorn',w:150})}</div><div class="h1 mt16 rise d1">You’re set.</div><p class="p mt8 rise d2" style="max-width:290px">${money(S.amount)} every ${S.day}. This week already counts.</p></div>
  ${foot(btn('Continue',`S.flourishes.indexOf('roots')<0?(addFlourish('roots'),replace('fl-unlock',{k:'roots'})):finish()`,'dk'))}`}));

/* ---------- bank linking ---------- */
const BANKS=['Harbor Bank','Summit Credit Union','Northside Bank','Pioneer Savings','Lakeview Federal','Granite Trust'];
def('bank-1',()=>({html:`${topbar({title:'Link an account'})}<div class="body"><div class="h2 mt8">Find your bank</div><p class="p mt8">Connect securely. Acorns never sees your bank sign-in.</p>
  <div class="search mt16">${ic('search',18,'opacity:.4')}<input placeholder="Search banks" oninput="$$('.bk').forEach(b=>b.style.display=b.textContent.toLowerCase().includes(this.value.toLowerCase())?'':'none')"></div>
  <div class="mt12">${BANKS.map(b=>`<div class="li bk" onclick="T.bank='${b}';go('bank-2')"><div class="lockic">${ic('bank',18)}</div><div class="grow ttl">${b}</div>${ic('chev',18,'opacity:.35')}</div>`).join('')}</div>
  <p class="sm mt16">Placeholder bank names for the prototype.</p></div>`}));
def('bank-2',()=>({html:`${topbar({title:''})}<div class="body center" style="display:flex;flex-direction:column;justify-content:center;align-items:center">
  <div class="row" style="gap:16px"><div class="av l" style="background:var(--primaryGreen)">${acorn(22)}</div><div style="width:40px;border-top:2px dashed #ccc"></div><div class="av l" style="background:#1f3a5f">${ic('bank',28)}</div></div>
  <div class="h2 mt24">Acorns uses a secure connection to link ${T.bank}</div>
  <div class="mt24" style="text-align:left;width:100%"><div class="li" style="cursor:default">${ic('lock',20)}<div class="grow"><div class="ttl">Private</div><div class="sub">You sign in on ${T.bank}’s page. We never see your password.</div></div></div><div class="li" style="cursor:default">${ic('eye',20)}<div class="grow"><div class="ttl">Read-only for linking</div><div class="sub">Used to move money you choose and to calculate Round-Ups.</div></div></div></div></div>
  ${foot(btn('Continue',"go('bank-3')"))}`}));
def('bank-3',()=>({cls:'ivory',html:`${topbar({title:T.bank,close:'back()'})}<div class="body center" style="display:flex;flex-direction:column;justify-content:center;align-items:center">
  <div class="av l" style="background:#1f3a5f">${ic('bank',28)}</div><div class="h3 mt16">${T.bank}</div><p class="p mt8">This is where your bank’s own sign-in appears.</p>
  <div class="card mt24" style="width:100%;text-align:left"><div class="sim">${ic('lock',14)} Simulated bank sign-in</div><p class="sm mt12">In production, the bank handles sign-in and multi-factor checks here. The prototype skips this step.</p></div></div>
  ${foot(btn('Simulate sign-in',"go('sys-load',{msg:'Connecting',next:'bank-4'})",'dk'))}`}));
def('bank-4',()=>{if(!T.accs)T.accs=['n1'];return {html:`${topbar({title:'Choose accounts'})}<div class="body"><div class="h2 mt8">Which accounts?</div><p class="p mt8">Pick the ones you want to use with Acorns.</p>
  <div class="mt24">${choice('accs','n1','Checking ••7710','Available for transfers and Round-Ups','<div class="lockic">'+ic('bank',18)+'</div>',1)}${choice('accs','n2','Savings ••2290','Available for transfers','<div class="lockic">'+ic('bank',18)+'</div>',1)}</div></div>
  ${foot(btn('Link accounts','bankDone()','pri','data-need="accs"'))}`,mount:needs}});
function bankDone(){(T.accs||[]).forEach(a=>{const id=T.bank.split(' ')[0].toLowerCase()+a;if(!S.accounts.find(x=>x.id===id))S.accounts.push({id,name:a==='n1'?'Checking':'Savings',mask:a==='n1'?'7710':'2290',type:a==='n1'?'Checking':'Savings',bank:T.bank});if(a==='n1'&&!S.cards.find(c=>c.id==='c'+id))S.cards.splice(2,0,{id:'c'+id,name:T.bank+' Debit',mask:'7710',linked:true})});save();T.src=S.accounts[S.accounts.length-1].id;toast(T.bank+' linked');back2(S.bankRet||'rec-2')}

/* ---------- Round-Ups ---------- */
def('ru-1',()=>({html:`${topbar({title:'Round-Ups®'})}<div class="body">
  <div class="card dk mt8" style="padding:22px;position:relative;overflow:hidden"><div class="eyebrow" style="color:var(--naturalMoss)">Invest your spare change</div><div class="h2 mt8">Turn on Round-Ups®</div><p class="sm mt8" style="max-width:220px">Buy a coffee for $4.80 and we round up $0.20 to invest.</p><div style="position:absolute;right:-8px;bottom:-10px">${oak(3,['acorns'],{w:120,h:134,dark:1})}</div><div style="height:30px"></div></div>
  <div class="mt24"><div class="li" style="cursor:default"><div class="lockic">1</div><div class="grow"><div class="ttl">Link the cards you use</div><div class="sub">Purchases on linked cards round up to the next dollar.</div></div></div><div class="li" style="cursor:default"><div class="lockic">2</div><div class="grow"><div class="ttl">Pick where it comes from</div><div class="sub">Round-Ups move from your primary checking once they reach $5.</div></div></div><div class="li" style="cursor:default"><div class="lockic">3</div><div class="grow"><div class="ttl">Watch acorns grow on your oak</div><div class="sub">Your grove sees acorns. Never what you bought or how much.</div></div></div></div></div>
  ${foot(btn('Turn on',"go('ru-2')"))}`}));
def('ru-2',()=>{if(!T.cards)T.cards=S.cards.filter(c=>c.linked).map(c=>c.id);return {html:`${topbar({title:'Round-Ups®'})}${progress(1,3)}<div class="body"><div class="h2 mt8">Which cards should round up?</div><p class="p mt8">Pick the cards you use most.</p>
  <div class="mt24">${S.cards.map(c=>c.needs?`<div class="choice" onclick="sheet('<div class=&quot;h3&quot;>Acorns Visa™ debit</div><p class=&quot;p mt8&quot;>Real-Time Round-Ups® need Acorns Checking. You can add it later from Home.</p><div class=&quot;mt24&quot;>'+btn('Got it','closeOv()','dk')+'</div>')"><div class="lockic">${ic('card',18)}</div><div class="grow"><div class="ttl">${c.name}</div><div class="sub">Needs Acorns Checking</div></div><span class="badge gray">Later</span></div>`:choice('cards',c.id,`${c.name} ••${c.mask}`,'Rounds up every purchase','<div class="lockic">'+ic('card',18)+'</div>',1)).join('')}</div>
  <div class="li" onclick="S.bankRet='ru-2';go('bank-1')"><div class="lockic">${ic('plus',18)}</div><div class="grow ttl">Link another card</div>${ic('chev',18,'opacity:.35')}</div></div>
  ${foot(btn('Continue',"go('ru-3')",'pri','data-need="cards"'))}`,mount:needs}});
def('ru-3',()=>{if(!T.prim)T.prim=S.ru.primary;return {html:`${topbar({title:'Round-Ups®'})}${progress(2,3)}<div class="body"><div class="h2 mt8">Where should Round-Ups come from?</div><p class="p mt8">This is your primary checking. We withdraw once your Round-Ups reach at least $5.</p>
  <div class="mt24">${S.accounts.filter(a=>a.type==='Checking').map(a=>choice('prim',a.id,`${a.name} ••${a.mask}`,a.bank,'<div class="lockic">'+ic('bank',18)+'</div>')).join('')}</div>
  <div class="note mt16">Your primary checking may charge overdraft fees if you don’t have enough money when Round-Ups are withdrawn.</div></div>
  ${foot(btn('Continue',"go('ru-4')",'pri','data-need="prim"'))}`,mount:needs}});
def('ru-4',()=>{if(T.auto===undefined)T.auto=true;if(!T.mult)T.mult='Off';return {html:`${topbar({title:'Round-Ups® settings'})}${progress(3,3)}<div class="body">
  <div class="h3 mt8">Automatic Round-Ups®</div>${tog('auto','Invest Round-Ups® automatically','When your Round-Up change reaches the minimum $5, we transfer it for you.')}
  <div class="divider mt16"></div>
  <div class="h3 mt24">Multiplier</div><p class="sm mt8">Ex: buy a coffee for $4.80 with 2x on and we invest $0.40.</p><div class="chips mt12">${['Off','2x','3x','10x'].map(m=>chip('mult',m,m)).join('')}</div>
  <div class="divider mt24"></div>
  <div class="h3 mt24">Whole Dollar Round-Ups®</div>${tog('whole','Round up whole-dollar buys too','Ex: buy lunch for $10 and we invest $1.')}</div>
  ${foot(btn('Turn on Round-Ups®','ruConfirm()'))}`}});
function ruConfirm(){S.ru={on:true,mult:T.mult,whole:!!T.whole,auto:!!T.auto,primary:T.prim};S.cards.forEach(c=>c.linked=(T.cards||[]).indexOf(c.id)>-1);save();go('sys-load',{msg:'Updating settings',next:'ru-done'})}
def('ru-done',()=>({html:`${topbar({left:'<div style="width:44px"></div>'})}<div class="body center" style="display:flex;flex-direction:column;justify-content:center;align-items:center">
  <div class="pop" style="width:84px;height:84px;border-radius:42px;background:var(--primaryGreen);display:flex;align-items:center;justify-content:center;color:#fff">${ic('check',44)}</div>
  <div class="h2 mt24">Round-Ups® are on</div><p class="p mt8">${(T.cards||[]).length} card${(T.cards||[]).length===1?'':'s'} linked · Multiplier ${S.ru.mult}</p></div>
  ${foot(btn('Done',"addFlourish('acorns')?replace('fl-unlock',{k:'acorns'}):finish()"))}`}));

/* ---------- plans (for products that need Silver or Gold) ---------- */
function planScreen(id,need,next,why){def(id,()=>{if(S.plan==='Gold'||(need==='Silver'&&S.plan==='Silver'))return {html:'',mount(){replace(next)}};if(!T.plan)T.plan=need;return {html:`${topbar({title:'Your plan'})}<div class="body"><div class="h2 mt8">${why}</div><p class="p mt8">You’re on Bronze. Pick a plan to keep going. Change anytime.</p>
  <div class="mt24">${choice('plan','Silver','Silver · $8/mo','Invest, Later, Checking, Emergency Fund, and more')}${choice('plan','Gold','Gold · $12/mo','Everything in Silver, plus Early for your kids and higher match')}</div>
  <p class="sm mt12">Placeholder pricing for the prototype. Confirm current plan details before testing.</p></div>
  ${foot(btn('Continue',`S.plan=T.plan;save();(T.plan==='Gold'||'${need}'==='Silver')?go('${next}'):toast('${need} is needed for this')`,'pri','data-need="plan"'),btn('Not now','back()','ghost'))}`,mount:needs}})}
planScreen('ef-0','Silver','ef-1','Emergency Fund is part of Silver');
planScreen('early-0','Gold','early-1','Early is part of Gold');

/* ---------- Emergency Fund ---------- */
def('ef-1',()=>({html:`${topbar({title:'Emergency Fund'})}${progress(1,3)}<div class="body"><div class="h2 mt8">Pick a starting goal</div><p class="p mt8">Only you see this. Your grove sees a nest, never an amount.</p>
  <div class="mt24">${choice('goal','500','Starter cushion','$500')}${choice('goal','1000','One month of breathing room','$1,000')}${choice('goal','3m','Three months of expenses','We’ll help you estimate it')}${choice('goal','none','No goal yet','Just start saving')}</div></div>
  ${foot(btn('Continue',"go('ef-2')",'pri','data-need="goal"'))}`,mount:needs}));
def('ef-2',()=>({html:`${topbar({title:'Emergency Fund'})}${progress(2,3)}<div class="body"><div class="h2 mt8">Add to it automatically?</div>
  <div class="chips mt24">${chip('efamt','10','$10 / week')}${chip('efamt','25','$25 / week')}${chip('efamt','50','$50 / week')}${chip('efamt','0','I’ll add as I go')}</div>
  <div class="h4 mt32">From</div><div class="mt12">${S.accounts.map(a=>choice('efsrc',a.id,`${a.name} ••${a.mask}`,a.bank,'<div class="lockic">'+ic('bank',18)+'</div>')).join('')}</div></div>
  ${foot(btn('Review',"go('ef-3')",'pri','data-need="efamt"'))}`,mount:needs}));
def('ef-3',()=>({html:`${topbar({title:'Review'})}${progress(3,3)}<div class="body"><div class="h2 mt8">Your Emergency Fund</div>
  <div class="card mt24"><div class="kv"><span>Goal</span><b>${{500:'$500',1000:'$1,000','3m':'3 months','none':'None yet'}[T.goal]}</b></div><div class="kv"><span>Auto-deposit</span><b>${T.efamt==='0'?'Off':'$'+T.efamt+' weekly'}</b></div><div class="kv"><span>Plan</span><b>${S.plan}</b></div></div>
  <p class="sm mt16">Emergency Fund balances are held at partner banks. Placeholder disclosure for the prototype.</p></div>
  ${foot(btn('Start Emergency Fund',"S.ef=true;save();go('sys-load',{msg:'Building your nest',next:'ef-done'})"))}`}));
def('ef-done',()=>({cls:'green',html:`${topbar({left:'<div style="width:44px"></div>'})}<div class="body center" style="display:flex;flex-direction:column;justify-content:center;align-items:center"><div class="pop"><img src="${IMG.moneybag}" style="height:150px;filter:drop-shadow(0 14px 18px rgba(0,0,0,.25))"></div><div class="h1 mt8">Rainy days, covered.</div><p class="p mt8">Your Emergency Fund is open.</p></div>
  ${foot(btn('Continue',"addFlourish('nest')?replace('fl-unlock',{k:'nest'}):finish()",'dk'))}`}));

/* ---------- Later ---------- */
def('later-1',()=>({html:`${topbar({title:'Acorns Later'})}${progress(1,3)}<div class="body"><div class="h2 mt8">Choose an account type</div><p class="p mt8">Both are IRAs for retirement. They differ in when you pay taxes.</p>
  <div class="mt24">${choice('ira','roth','Roth IRA','Pay taxes now, withdraw tax-free in retirement')}${choice('ira','trad','Traditional IRA','Contributions may lower taxes now, taxed later')}</div>
  <div class="li" onclick="sheet('<div class=&quot;h3&quot;>Not sure?</div><p class=&quot;p mt8&quot;>A tax professional can help you decide. This is general information, not tax advice.</p><div class=&quot;mt24&quot;>'+btn('Got it','closeOv()','dk')+'</div>')">${ic('spark',20)}<div class="grow ttl">Help me choose</div>${ic('chev',18,'opacity:.35')}</div></div>
  ${foot(btn('Continue',"go('later-2')",'pri','data-need="ira"'))}`,mount:needs}));
def('later-2',()=>({html:`${topbar({title:'Acorns Later'})}${progress(2,3)}<div class="body"><div class="h2 mt8">Contribute on a schedule</div>
  <div class="chips mt24">${chip('lamt','5','$5 / week')}${chip('lamt','10','$10 / week')}${chip('lamt','25','$25 / week')}${chip('lamt','100','$100 / month')}</div>
  <p class="sm mt16">Annual IRA limits apply.</p></div>${foot(btn('Review',"go('later-3')",'pri','data-need="lamt"'))}`,mount:needs}));
def('later-3',()=>({html:`${topbar({title:'Review'})}${progress(3,3)}<div class="body"><div class="h2 mt8">Open your Later account</div>
  <div class="card mt24"><div class="kv"><span>Account</span><b>${T.ira==='roth'?'Roth IRA':'Traditional IRA'}</b></div><div class="kv"><span>Contribution</span><b>${T.lamt==='100'?'$100 monthly':'$'+T.lamt+' weekly'}</b></div><div class="kv"><span>From</span><b>${S.accounts[0].name} ••${S.accounts[0].mask}</b></div></div></div>
  ${foot(btn('Open Later account',"S.later=true;save();go('sys-load',{msg:'Opening your account',next:'later-done'})"))}`}));
def('later-done',()=>({cls:'green',html:`${topbar({left:'<div style="width:44px"></div>'})}<div class="body center" style="display:flex;flex-direction:column;justify-content:center;align-items:center"><div class="pop"><img src="${IMG.later}" style="height:150px;filter:drop-shadow(0 14px 18px rgba(0,0,0,.25))"></div><div class="h1 mt8">Future you says thanks.</div></div>
  ${foot(btn('Continue',"addFlourish('gold')?replace('fl-unlock',{k:'gold'}):finish()",'dk'))}`}));

/* ---------- Early ---------- */
def('early-1',()=>({html:`${topbar({title:'Acorns Early'})}${progress(1,3)}<div class="body"><div class="h2 mt8">Who are you investing for?</div>
  <div class="field mt24"><label>Kid’s first name</label><input id="kidname" placeholder="First name" value="${T.kid||''}" oninput="T.kid=this.value;needs()"></div>
  <div class="h4 mt24">Birth year</div><div class="chips mt12">${['2024','2022','2020','2018','2016','2013'].map(y=>chip('kyear',y,y)).join('')}</div>
  <p class="sm mt16">You’ll add their details securely before the account opens.</p></div>
  ${foot(btn('Continue',"go('early-2')",'pri','data-need="kid"'))}`,mount:needs}));
def('early-2',()=>({html:`${topbar({title:'Acorns Early'})}${progress(2,3)}<div class="body"><div class="h2 mt8">Invest for ${T.kid||'them'} each week</div>
  <div class="chips mt24">${chip('eamt','5','$5')}${chip('eamt','10','$10')}${chip('eamt','20','$20')}${chip('eamt','0','Not yet')}</div>
  <div class="card flat mt24"><div class="row"><img src="${IMG.early}" style="height:40px"><div class="sm grow">Family can add to ${T.kid||'their'} account with a gift link later.</div></div></div></div>
  ${foot(btn('Review',"go('early-3')",'pri','data-need="eamt"'))}`,mount:needs}));
def('early-3',()=>({html:`${topbar({title:'Review'})}${progress(3,3)}<div class="body"><div class="h2 mt8">Start ${T.kid}’s account</div>
  <div class="card mt24"><div class="kv"><span>For</span><b>${T.kid}</b></div><div class="kv"><span>Born</span><b>${T.kyear||'—'}</b></div><div class="kv"><span>Weekly</span><b>${T.eamt==='0'?'Not yet':'$'+T.eamt}</b></div></div></div>
  ${foot(btn('Open Early account',"S.early=T.kid;save();go('sys-load',{msg:'Planting a sapling',next:'early-done'})"))}`}));
def('early-done',()=>({cls:'green',html:`${topbar({left:'<div style="width:44px"></div>'})}<div class="body center" style="display:flex;flex-direction:column;justify-content:center;align-items:center"><div class="pop"><img src="${IMG.early}" style="height:150px;filter:drop-shadow(0 14px 18px rgba(0,0,0,.25))"></div><div class="h1 mt8">${(typeof S.early==='string'&&S.early)||T.kid||'Their'}’s sapling is planted.</div></div>
  ${foot(btn('Continue',"addFlourish('sapling')?replace('fl-unlock',{k:'sapling'}):finish()",'dk'))}`}));

/* ---------- Earn ---------- */
const OFFERS=[{n:'Pine & Co.',r:'4% back',c:'#486b4d'},{n:'Maple Market',r:'2% back',c:'#be752e'},{n:'Trailhead Outdoor',r:'6% back',c:'#0676dc'},{n:'Bright Bean Coffee',r:'$2 back',c:'#5f253d'}];
def('earn-1',()=>({html:`${topbar({title:'Earn'})}<div class="body"><div class="h2 mt8">Rewards that invest</div><p class="p mt8">Shop brands you already use. Rewards land in your Invest account.</p>
  <div class="grid2 mt24">${OFFERS.map((o,i)=>`<div class="card tap" style="padding:14px" onclick="T.offer=${i};go('earn-2')"><div class="av" style="background:${o.c};border-radius:12px">${o.n[0]}</div><div style="font-weight:600;margin-top:10px">${o.n}</div><div class="badge mt8" style="display:inline-block">${o.r}</div></div>`).join('')}</div>
  <p class="sm mt16">Placeholder brands for the prototype.</p></div>`}));
def('earn-2',()=>{const o=OFFERS[T.offer||0];return {html:`${topbar({title:o.n})}<div class="body center"><div class="av l mt24" style="background:${o.c};border-radius:18px;margin:24px auto 0">${o.n[0]}</div><div class="h2 mt16">${o.r} at ${o.n}</div><p class="p mt8">Use a linked card. Rewards usually arrive in 60–120 days.</p>
  <div class="card flat mt24" style="text-align:left"><div class="kv"><span>Pay with</span><b>${S.cards.find(c=>c.linked)?S.cards.find(c=>c.linked).name:'A linked card'}</b></div><div class="kv"><span>Offer</span><b>${o.r}</b></div></div></div>
  ${foot(btn('Activate offer',"S.earn=true;save();go('earn-done')"))}`}});
def('earn-done',()=>({cls:'green',html:`${topbar({left:'<div style="width:44px"></div>'})}<div class="body center" style="display:flex;flex-direction:column;justify-content:center;align-items:center"><div class="pop">${squirrel({hold:'flowers',w:170})}</div><div class="h1 mt8">Offer activated.</div><p class="p mt8">When your first reward lands, wildflowers bloom.</p><div class="sim mt16">Prototype: reward lands now</div></div>
  ${foot(btn('Continue',"addFlourish('flowers')?replace('fl-unlock',{k:'flowers'}):finish()",'dk'))}`}));

/* ---------- Learn ---------- */
const LESSON=[{t:'Time does the heavy lifting',b:'Small amounts invested often can add up. The habit matters more than the size.'},{t:'Diversify',b:'Spreading money across many investments can lower the risk of any one going down.'},{t:'Stay steady',b:'Markets go up and down. Investing on a schedule means you keep going through both.'}];
def('learn-1',()=>({html:`${topbar({title:'Learn'})}<div class="body"><div class="h2 mt8">Two-minute lessons</div>
  <div class="mt16">${['Why small and steady works','What a diversified portfolio is','What to do when markets dip'].map((t,i)=>`<div class="li" onclick="T.slide=0;go('learn-2')"><div class="lockic">${ic('spark',16)}</div><div class="grow"><div class="ttl">${t}</div><div class="sub">2 min · ${i===0?'Start here':'Next up'}</div></div>${ic('chev',18,'opacity:.35')}</div>`).join('')}</div></div>`}));
def('learn-2',()=>{const i=T.slide||0;const l=LESSON[i];return {cls:'ecru',html:`${topbar({title:'Lesson',close:true})}<div style="padding:0 var(--pad)">${dots(i,3)}</div>
  <div class="body" style="display:flex;flex-direction:column;justify-content:center"><div class="eyebrow">${i+1} of 3</div><div class="h1 mt12 rise">${l.t}</div><p class="p mt16 rise d1" style="font-size:18px">${l.b}</p></div>
  ${foot(btn(i<2?'Next':'Finish lesson',i<2?"T.slide++;refresh()":"S.learn++;save();go('learn-done')"))}`}});
def('learn-done',()=>({cls:'green',html:`${topbar({left:'<div style="width:44px"></div>'})}<div class="body center" style="display:flex;flex-direction:column;justify-content:center;align-items:center"><div class="pop"><img src="${IMG.learn}" style="height:150px;filter:drop-shadow(0 14px 18px rgba(0,0,0,.25))"></div><div class="h1 mt8">Lesson done.</div></div>
  ${foot(btn('Continue',"addFlourish('bird')?replace('fl-unlock',{k:'bird'}):finish()",'dk'))}`}));

/* ---------- one-time invest (counts everywhere) ---------- */
def('inv-1',()=>{if(!T.inv)T.inv=S.amount;return {html:`${topbar({title:'Invest',close:true})}<div class="body center" style="display:flex;flex-direction:column;justify-content:center">
  <p class="p">One-time investment</p><div class="amt" id="invamt" onclick="keypad(T.inv,v=>{T.inv=v;refresh()})">${money(T.inv)}</div>
  <div class="chips" style="justify-content:center">${[5,10,25].map(a=>`<button class="chip ${T.inv===a?'on':''}" onclick="T.inv=${a};refresh()">$${a}</button>`).join('')}<button class="chip" onclick="keypad(T.inv,v=>{T.inv=v;refresh()})">Other</button></div>
  <div class="card flat mt32" style="text-align:left"><div class="kv"><span>From</span><b>${S.accounts[0].name} ••${S.accounts[0].mask}</b></div><div class="kv"><span>Into</span><b>Invest account</b></div></div></div>
  ${foot(btn('Invest '+money(T.inv),"go('sys-load',{msg:'Investing',next:'gt-counted'})"))}`}});
