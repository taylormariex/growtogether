/* =====================================================================
   Focus builds · one experience on its own, for review.
   Each standalone page sets window.FOCUS to a lander key before the app
   boots (see build.py). Without it, this file does nothing and the full
   prototype behaves as before.
   The page opens on the story lander, the CTA goes straight into the
   experience, and any exit to the rest of the app (Home, Streaks, the
   menu…) lands on a small end card with Replay. Everything else in the
   experience, including share sheets and invites, works as it does in
   the full build.
   ===================================================================== */
const FOCUS_SPEC={
 'skip-and-stash':{title:'Skip and Stash',hub:'ss-hub',hubLabel:'Open Skip and Stash',
   go:"go('ss-hub')",
   side:'Skip something (coffee, takeout, a ride) and invest what you didn’t spend. Fill a jar to stash later, run a Skip Week with friends, and share the skips, never the amounts.'},
 split:{title:'Shared goals',hub:'sg-list',hubLabel:'Open shared goals',
   go:"T.sg=null;go('sg-list')",allow:['sg-list'],
   side:'Save for a trip or a first apartment with someone. Add a paycheck slice, a recurring transfer, or money anytime. Invite them by text, watch the journey fill in together, and share milestones. You both see progress, never each other’s dollars.'},
 year:{title:'Acorns Year',hub:'ac-home',hubLabel:'Start my year',
   go:"yrGo()",allow:['ac-home'],
   side:'The story introduces it, then you’re back on Home. Use the prototype clock to move time: at six months a halfway card arrives on its own, at twelve a notification says your Acorns Year is ready. Seven cards about the year you showed up. Weeks and counts only. Never balances or returns.'},
 'money-type':{title:'Know yourself',hub:'qz-hub',hubLabel:'Open Know yourself',
   go:"T={};go('qz-hub')",
   side:'Four short quizzes about how you actually are with money: your Money Type, Saver Style, Spending Triggers, and how you like company. Each one ends with a type, one thing to learn, and one thing in the app to try. Your types show up on your Acorns Year.'},
 invite:{title:'Invite to your grove',hub:'gt-grove',hubLabel:'Open my grove',allow:['gt-ch'],
   go:"jumpAhead();spInit();T={};go('inv-pick')",
   side:'Invite one person, pick the day you’ll both invest, and send it from your own phone. Their seed is planted when they sign up and sprouts beside your oak after their first investment.'}};

/* screens that belong to the rest of the app: reaching one ends the experience */
const FOCUS_HUBS=new Set(['menu','states','sam-hub']); /* the Acorns tabs and the surfaces behind them stay reachable in every build */

function focusBoot(){const k=window.FOCUS;const F=FOCUS_SPEC[k];if(!F)return;
 /* lander CTA goes straight into the experience */
 if(typeof SPL!=='undefined'&&SPL[k])SPL[k].go=F.go;
 /* side panel: what this page is */
 const side=document.getElementById('side');if(side){const sw=side.querySelector('.demo-sw');if(sw)sw.remove();
  side.innerHTML=`<h1>${F.title}</h1><div>${F.side}</div><div class="mt16">One experience from the Grow Together prototype, on its own. Tap through the story, then try it end to end.</div><div class="mt16">Best on a phone: open this page, then Share → Add to Home Screen.</div><div class="mt16">The ☰ in each screen replays the story or resets this experience.</div><span class="k">Placeholder names, brands and prices</span><div class="mt16"><a href="../" style="color:#74c947;font-size:13px">All experiences →</a></div>`}
 /* the lander's "Even better with" row points at other experiences: hide it here */
 const spl=SCR.splash;SCR.splash=p=>{const r=spl(Object.assign({k},p));if((p.k||k)===k)r.html=r.html.replace(/<div class="lf-with">[\s\S]*?(?=<p class="lf-where">)/,'');return r};
 /* exits to the rest of the app land on the end card */
 const _home=home;home=function(id,params,dir){
  if(k==='invite'&&id==='gt-home'){const c=cur();if(!c||c.dataset.id!=='gt-grove'){id='gt-grove';GSEL=null}}
  if((FOCUS_HUBS.has(id)&&!(F.allow||[]).includes(id))||!SCR[id]){id='focus-end';params={}}
  _home(id,params,dir)};
 const _back2=back2;back2=function(id){if(FOCUS_HUBS.has(id)){home('focus-end');return}_back2(id)};
 const _go=go;go=function(id,params,dir){if(id==='splash'&&!(params&&params.k)){params=Object.assign({},params,{k});}if(FOCUS_HUBS.has(id)&&!(F.allow||[]).includes(id)){home('focus-end');return}_go(id,params,dir)};
 protoMenu=function(){sheet(`<div class="h3">Prototype</div><p class="sm mt8">For walkthroughs. Not part of the product.</p>
  <div class="mt16">
  <div class="li" onclick="closeOv();setTimeout(focusStart,200)">${ic('ff')}<div class="grow"><div class="ttl">Replay the story</div><div class="sub">Back to the first card</div></div></div>
  <div class="li" onclick="closeOv();setTimeout(()=>{S=FRESH();spInit();save();focusStart();toast('Reset')},200)">${ic('close')}<div class="grow"><div class="ttl">Reset this experience</div><div class="sub">Start fresh</div></div></div>
  <div class="li" onclick="location.href='../'">${ic('menu')}<div class="grow ttl">All experiences</div>${ic('chev',18,'opacity:.35')}</div></div>`)};
 resetAll=function(){S=FRESH();spInit();save();focusStart()};
 def('focus-end',()=>({cls:'dark',html:`<div class="body center" style="display:flex;flex-direction:column;justify-content:center;align-items:center;padding-top:calc(var(--safeTop) + 20px)">
   <div style="position:relative;width:100%;height:220px;overflow:hidden;border-radius:24px">${hills({dark:1})}<img src="${IMG.oak}" style="position:absolute;left:50%;bottom:22%;height:120px;transform:translateX(-50%)" alt=""></div>
   <div class="eyebrow mt24">Grow Together · prototype</div><div class="h1 mt8" style="color:#fff">${F.title}</div>
   <p class="p mt12" style="max-width:320px">${(LANDERS[k]||{}).s||''}</p></div>
   ${foot(btn('Replay the story','focusStart()','wh'),btn(F.hubLabel,`focusHub()`,'ghost'))}`}));
 focusStart()}
function focusStart(){const k=window.FOCUS;if(k==='invite'){S.grove=[];S.notThem={}}jumpAhead();spInit();T={};stack=[{id:'focus-end',params:{}}];go('splash',{k,b:0},'fade')}
function focusHub(){const k=window.FOCUS,F=FOCUS_SPEC[k];stack=[{id:'focus-end',params:{}}];
 if(k==='split'){sgAll()}
 if(k==='year'){yrGo();return}
 if(k==='invite'){jumpAhead();spInit();GSEL=null}
 go(F.hub,{},'fwd')}
