/* Core: state, router, UI kit, system sheets */
const {oak,squirrel,hills,ic,confetti,sparkles,rain,acorn,AV_COL}=ART;
const SCR={};
function def(id,fn){SCR[id]=fn}
const $=(s,r)=>(r||document).querySelector(s);
const $$=(s,r)=>Array.from((r||document).querySelectorAll(s));

/* ---------- people (placeholder names only) ---------- */
const PEOPLE={
  sam:{name:'Sam',full:'Sam Rivera',rel:'Friend',on:true,stage:3,c:0,phone:'(555) 201-4432'},
  mom:{name:'Mom',full:'Mom',rel:'Family',on:true,stage:4,c:1,phone:'(555) 310-8890'},
  dad:{name:'Dad',full:'Dad',rel:'Family',on:true,stage:2,c:3,phone:'(555) 310-8891'},
  jess:{name:'Jess',full:'Jess Park',rel:'Friend',on:false,stage:1,c:2,phone:'(555) 447-1209'},
  priya:{name:'Priya',full:'Priya Nair',rel:'Coworker',on:true,stage:2,c:4,phone:'(555) 618-3321'},
  marcus:{name:'Marcus',full:'Marcus Lee',rel:'Friend',on:false,stage:1,c:5,phone:'(555) 772-0045'},
  leo:{name:'Leo',full:'Leo Grant',rel:'Brother',on:false,stage:1,c:6,phone:'(555) 903-5567'},
  nina:{name:'Nina',full:'Nina Alvarez',rel:'Friend',on:false,stage:1,c:7,phone:'(555) 120-9932'}
};
function av(id,cls){const p=PEOPLE[id];if(id==='me')return `<div class="av ${cls||''}" style="background:var(--naturalMidnightForest)">J</div>`;return `<div class="av ${cls||''}" style="background:${AV_COL[p.c%AV_COL.length]}">${p.name[0]}</div>`}
const nm=id=>id==='me'?'You':PEOPLE[id].name;

/* ---------- state ---------- */
const FRESH=()=>({
  me:'Jordan',week:1,streak:0,stage:0,flourishes:[],invested:false,
  day:'Fri',amount:5,recurring:false,fund:'Everyday Checking ••4821',
  accounts:[{id:'chk',name:'Everyday Checking',mask:'4821',type:'Checking',bank:'Harbor Bank'}],
  cards:[{id:'c1',name:'Harbor Bank Debit',mask:'4821',linked:false},{id:'c2',name:'Summit Rewards Visa',mask:'0917',linked:false},{id:'c3',name:'Acorns Visa™ debit',mask:'—',linked:false,needs:true}],
  ru:{on:false,mult:'Off',whole:false,auto:true,primary:'chk'},
  plan:'Bronze',perm:{contacts:null,notif:null},
  grove:[], // {id,status:'invited'|'growing',side:n,open:bool}
  challenges:[], invites:[{id:'inv1',from:'jess',type:'learn',title:'Learn together',len:3,unit:'weeks'}],
  mt:{answers:[],type:null}, ss:{pick:null,crew:[],day:0,skips:[]}, fc:{line:'',ask:[],notes:0,opened:false},
  ef:false,later:false,early:false,earn:false,learn:0,
  ffDone:false,ret:'gt-home',note:'Saved you a spot in my grove. One $5 a week and we both grow.'
});
let S;
const SKEY=window.STATE_KEY||'gt-state'; // focus builds keep their own saved state
try{S=JSON.parse(localStorage.getItem(SKEY))||FRESH()}catch(e){S=FRESH()}
function save(){try{localStorage.setItem(SKEY,JSON.stringify(S))}catch(e){}}
function resetAll(){S=FRESH();save();home('menu')}
const inGrove=id=>S.grove.find(g=>g.id===id);
const growing=()=>S.grove.filter(g=>g.status==='growing');
function addFlourish(k){if(S.flourishes.indexOf(k)<0){S.flourishes.push(k);save();return true}return false}

/* rich demo state: "4 weeks later" */
function jumpAhead(){
  const chosen=S.grove.length?S.grove.map(g=>g.id):['sam','mom','dad'];
  ['sam','mom','dad'].forEach(id=>{if(chosen.indexOf(id)<0)chosen.push(id)});
  S.grove=chosen.map((id,i)=>({id,status:PEOPLE[id].on||i<4?'growing':'invited',side:id==='sam'?4:id==='mom'?3:2,open:id==='mom'}));
  S.week=5;S.streak=5;S.stage=2;S.invested=false;S.recurring=true;addFlourish('roots');
  if(!S.challenges.length){
    S.challenges=[
      {id:'c-side',type:'side',title:'8 weeks side by side',people:['me','sam'],len:8,unit:'weeks',prog:{me:4,sam:4},counts:'invest'},
      {id:'c-skip',type:'skip',title:'No-delivery week',people:['me','sam','jess','priya'],len:7,unit:'days',prog:{me:4,sam:5,jess:3,priya:4},counts:'checkin',thing:'Delivery'},
      {id:'c-fam',type:'side',title:'Family 12-week oak',people:['me','mom','dad'],len:12,unit:'weeks',prog:{me:4,mom:3,dad:4},counts:'invest'}
    ];
  }
  S.ffDone=true;save();
}

/* ---------- router ---------- */
let stack=[];let busy=false;
function render(id,params,dir){
  const fn=SCR[id];if(!fn){toast('Screen not built: '+id);return}
  const host=$('#screen');const old=$$('.scr',host).pop();
  const r=fn(params||{});
  const el=document.createElement('div');el.className='scr '+(r.cls||'');el.dataset.id=id;el.innerHTML=r.html;
  host.insertBefore(el,$('#ov'));
  const light=/\b(dark)\b/.test(r.cls||'')||r.light;
  $('#sbar').classList.toggle('light',!!light);
  if(old){
    const a=dir==='back'?['in-back','out-back']:dir==='fade'?['in-fade','']:['in-fwd','out-fwd'];
    if(dir==='back'){el.style.zIndex=0;old.style.zIndex=1}
    el.classList.add(a[0]);if(a[1])old.classList.add(a[1]);
    setTimeout(()=>old.remove(),dir==='fade'?460:400);
  }
  closeOv(true);
  if(r.mount)setTimeout(()=>r.mount(el),20);
  const b=$('.body',el);if(b)b.scrollTop=0;
}
function go(id,params,dir){stack.push({id,params});render(id,params,dir||'fwd');save()}
function back(){if(stack.length<2){home('menu');return}stack.pop();const t=stack[stack.length-1];render(t.id,t.params,'back')}
function home(id,params,dir){stack=[{id,params}];render(id,params,dir||'fade')}
function replace(id,params,dir){stack.pop();stack.push({id,params});render(id,params,dir||'fwd')}
function back2(id){ // pop back to a screen id in the stack
  let i=stack.map(s=>s.id).lastIndexOf(id);if(i<0){home(id);return}stack=stack.slice(0,i+1);render(id,stack[i].params,'back')}
function refresh(){const t=stack[stack.length-1];const host=$('#screen');const old=$$('.scr',host).pop();const r=SCR[t.id](t.params||{});old.className='scr '+(r.cls||'');old.innerHTML=r.html;if(r.mount)r.mount(old)}
function finish(){const r=S.ret||'gt-home';back2(r)}

/* ---------- UI kit ---------- */
function topbar(o){o=o||{};
  const left=o.left!==undefined?o.left:(o.close?`<button class="iconbtn" onclick="${o.close===true?'back()':o.close}">${ic('close')}</button>`:`<button class="iconbtn" onclick="back()">${ic('back')}</button>`);
  const right=o.right!==undefined?o.right:`<button class="iconbtn" onclick="protoMenu()" aria-label="Prototype menu">${ic('menu',22)}</button>`;
  return `<div class="top">${left}<div class="t">${o.title||''}</div>${right}</div>`}
function progress(i,n){return `<div style="padding:0 var(--pad) 8px"><div class="bar" style="height:4px"><i style="width:${Math.round(i/n*100)}%"></i></div></div>`}
function dots(i,n){let s='';for(let k=0;k<n;k++)s+=`<i class="${k===i?'on':''}"></i>`;return `<div class="dots">${s}</div>`}
function btn(label,onclick,cls,extra){return `<button class="btn ${cls||'pri'}" onclick="${onclick}" ${extra||''}>${label}</button>`}
function foot(...b){return `<div class="foot">${b.join('')}</div>`}
function weeksRow(n,done,now){let s='';for(let i=0;i<n;i++)s+=`<i class="${i<done?'on':''} ${i===done&&now?'now':''}"></i>`;return `<div class="weeks">${s}</div>`}
function stackAv(ids,cls){return `<div class="stack">${ids.map(i=>av(i,cls||'xs')).join('')}</div>`}

/* ---------- overlay: sheets, alerts, toasts, banners ---------- */
function ov(){return $('#ov')}
function closeOv(instant){const o=ov();const parts=$$('.sheet,.alert',o);$$('.scrim',o).forEach(s=>s.classList.remove('on'));parts.forEach(p=>p.classList.remove('on'));setTimeout(()=>{o.innerHTML=''},instant?0:360)}
function sheet(html,o){o=o||{};const host=ov();host.innerHTML=`<div class="scrim" onclick="${o.lock?'':'closeOv()'}"></div><div class="sheet ${o.cls||''}">${o.nograb?'':'<div class="grab"></div>'}${html}</div>`;requestAnimationFrame(()=>{$('.scrim',host).classList.add('on');$('.sheet',host).classList.add('on')});if(o.mount)setTimeout(()=>o.mount($('.sheet',host)),30)}
function alertBox(title,msg,buttons){ // buttons:[{t,fn,b}]
  const host=ov();window.__ab=buttons.map(b=>b.fn);
  const bs=buttons.length===2?`<div class="two">${buttons.map((b,i)=>`<button class="${b.b?'b':''}" onclick="closeOv();setTimeout(()=>__ab[${i}]&&__ab[${i}](),250)">${b.t}</button>`).join('')}</div>`:buttons.map((b,i)=>`<button class="${b.b?'b':''}" onclick="closeOv();setTimeout(()=>__ab[${i}]&&__ab[${i}](),250)">${b.t}</button>`).join('');
  host.innerHTML=`<div class="scrim"></div><div class="alert"><div class="ab"><div class="at">${title}</div><div class="am">${msg}</div></div>${bs}</div>`;
  requestAnimationFrame(()=>{$('.scrim',host).classList.add('on');$('.alert',host).classList.add('on')})}
let tt;function toast(msg){let t=$('#toast');t.innerHTML=ic('check',18,'color:var(--primaryGreen)')+msg;t.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('on'),2200)}
let bt;function banner(title,msg,onclick){const b=$('#banner');b.innerHTML=`<div class="ai">${acorn(18)}</div><div class="grow"><div class="bt">${title}</div><div class="bm">${msg}</div></div><div class="bw">now</div>`;b.onclick=()=>{b.classList.remove('on');onclick&&onclick()};b.classList.add('on');clearTimeout(bt);bt=setTimeout(()=>b.classList.remove('on'),4200)}

function protoMenu(){sheet(`<div class="h3">Prototype</div><p class="sm mt8">For walkthroughs. Not part of the product.</p>
  <div class="mt16">
  <div class="li" onclick="closeOv();setTimeout(()=>home('menu'),200)">${ic('menu')}<div class="grow ttl">All experiences</div>${ic('chev',18,'opacity:.35')}</div>
  <div class="li" onclick="closeOv();jumpAhead();setTimeout(()=>home('gt-home'),200);toast('Jumped ahead 4 weeks')">${ic('ff')}<div class="grow"><div class="ttl">Jump ahead 4 weeks</div><div class="sub">Grove filled in, 3 challenges running</div></div></div>
  <div class="li" onclick="closeOv();resetAll()">${ic('close')}<div class="grow"><div class="ttl">Reset everything</div><div class="sub">Start fresh, right after sign-up</div></div></div>
  </div>`)}

/* ---------- system permission prompts ---------- */
function askContacts(then){
  if(S.perm.contacts){then&&then();return}
  alertBox('“Acorns” Would Like to Access Your Contacts','Acorns uses contacts so you can pick who to grow beside. Nothing is uploaded until you send an invite.',[
    {t:'Allow Full Access',b:1,fn:()=>{S.perm.contacts='full';save();then&&then()}},
    {t:'Select Contacts…',fn:()=>{S.perm.contacts='limited';save();then&&then()}},
    {t:'Don’t Allow',fn:()=>{S.perm.contacts='denied';save();then&&then()}}
  ]);
  // stack three buttons vertically
}
function askNotif(then){
  if(S.perm.notif){then&&then();return}
  alertBox('“Acorns” Would Like to Send You Notifications','Notifications may include alerts, sounds, and icon badges. These can be configured in Settings.',[
    {t:'Don’t Allow',fn:()=>{S.perm.notif='denied';save();then&&then()}},
    {t:'Allow',b:1,fn:()=>{S.perm.notif='on';save();then&&then()}}
  ])}

/* ---------- share sheet (iOS style) ---------- */
let SHARE={};
function share(o){ // {title, sub, story(html), link, people:[ids]}
  SHARE=o;const ppl=(o.people||['sam','mom','jess','priya','dad']).slice(0,5);
  sheet(`<div class="sh-prev">${miniStory(o.story||'',46)}<div class="grow"><div style="font-weight:600;font-size:15px">${o.title||'Share'}</div><div class="sm">${o.link||'acorns.com/g/jordan'}</div></div><button class="iconbtn" onclick="closeOv()">${ic('close',20)}</button></div>
  <div class="sh-people">${ppl.map(id=>`<div class="p1" onclick="shareTo('msg','${id}')">${av(id,'l')}<span>${PEOPLE[id].full.split(' ')[0]}</span></div>`).join('')}</div>
  <div class="sh-apps">
    <div class="sh-app" onclick="shareTo('msg')"><i style="background:#34c759">${ic('chat',28)}</i>Messages</div>
    <div class="sh-app" onclick="shareTo('ig')"><i style="background:linear-gradient(45deg,#f9a03f,#e1306c,#8a3ab9)">${ic('cam',28)}</i>Instagram Stories</div>
    <div class="sh-app" onclick="shareTo('wa')"><i style="background:#25d366">${ic('chat',28)}</i>WhatsApp</div>
    <div class="sh-app" onclick="shareTo('snap')"><i style="background:#fffc00;color:#111">${ic('cam',28)}</i>Snapchat</div>
    <div class="sh-app" onclick="shareTo('tt')"><i style="background:#111">${ic('spark',26)}</i>TikTok</div>
    <div class="sh-app" onclick="shareTo('mail')"><i style="background:#1a8cff">@</i>Mail</div>
  </div>
  <div class="sh-acts"><div onclick="shareTo('copy')">Copy link ${ic('link',20)}</div><div onclick="shareTo('save')">Save image ${ic('share',20)}</div></div>`,{cls:'ios'})}
function shareTo(kind,person){
  closeOv();
  setTimeout(()=>{
    if(kind==='copy'){toast('Link copied');SHARE.done&&SHARE.done(kind);return}
    if(kind==='save'){toast('Saved to Photos');SHARE.done&&SHARE.done(kind);return}
    if(kind==='ig'||kind==='snap'||kind==='tt'){go('sys-story',{kind});return}
    go('sys-msg',{kind,person})
  },260)}
function shareSent(kind,person,msg){toast(msg);const d=SHARE.done;SHARE.done=null;setTimeout(()=>{back();if(d)setTimeout(()=>d(kind,person),430)},450)}
function miniStory(html,w){return `<div style="width:${w}px;height:${Math.round(w*16/9)}px;overflow:hidden;border-radius:${Math.max(6,w/14)}px;flex-shrink:0"><div style="width:300px;transform:scale(${w/300});transform-origin:0 0">${html}</div></div>`}
def('sys-story',p=>({cls:'dark',light:1,html:`
  <div class="top"><button class="iconbtn" onclick="back()">${ic('close')}</button><div class="t">${p.kind==='ig'?'Your story':p.kind==='snap'?'Snap':'Post'}</div><div style="width:44px"></div></div>
  <div class="body" style="display:flex;align-items:center;justify-content:center"><div style="width:84%;max-width:300px" class="pop">${SHARE.story||''}</div></div>
  <div class="foot"><div class="row" style="gap:10px"><button class="btn line" style="flex:1" onclick="shareSent('story','','Sent to close friends')">Close friends</button><button class="btn wh" style="flex:1" onclick="shareSent('story','','Shared to your story')">Your story</button></div><p class="sm center">Simulated. Nothing posts from the prototype.</p></div>`}));
def('sys-msg',p=>{const to=p.person?PEOPLE[p.person].full:(SHARE.to||'');const app=p.kind==='wa'?'WhatsApp':p.kind==='mail'?'Mail':'Messages';
  return {cls:'',html:`
  <div class="top"><button class="iconbtn" onclick="back()">${ic('close')}</button><div class="t">${app}</div><div style="width:44px"></div></div>
  <div style="padding:0 16px 10px;border-bottom:1px solid #eee" class="row"><span class="sm">To:</span><span style="font-weight:600">${to||'Choose a contact'}</span></div>
  <div class="body" style="padding-top:20px;background:#fff">
    <div class="bub me" style="padding:0;overflow:hidden;max-width:none;width:170px;background:#e9e9eb;color:#111">${miniStory(SHARE.story||'',170).replace('border-radius','data-r')}<div style="padding:10px 12px"><div style="font-weight:600;font-size:14px">${SHARE.title||''}</div><div style="font-size:12px;color:#666">${SHARE.link||'acorns.com/g/jordan'}</div></div></div>
    <div class="bub me mt8" id="msgtxt">${SHARE.text||S.note}</div>
  </div>
  <div class="foot"><button class="btn pri" onclick="shareSent('msg','${p.person||''}','Sent')">Send</button><p class="sm center">Simulated. Nothing is sent from the prototype.</p></div>`}});

/* ---------- story card templates (shareable) ---------- */
function storyCard(o){ // {bg, eyebrow, title, sub, art, foot}
  return `<div class="story" style="background:${o.bg||'linear-gradient(180deg,#0a1d08,#174512)'};${o.dark?'color:var(--naturalMidnightForest);':''}${o.css||''}">
    <div class="st-brand"><img src="${IMG.acorn}" alt="">Acorns</div>
    <div class="st-art"><div>${o.art||''}</div></div>
    ${o.eyebrow?`<div class="st-eye">${o.eyebrow}</div>`:''}
    <div class="st-title">${o.title||''}</div>
    ${o.sub?`<div class="st-sub">${o.sub}</div>`:''}
    <div class="st-foot">${o.foot||'acorns.com/g/jordan'}</div>
  </div>`}
