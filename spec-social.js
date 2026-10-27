/* =====================================================================
   Social layer · shared pieces for Clubs, Friends, Monthly challenges,
   Live rooms and the Server. People, posts, threads, boards, polls, chat.
   ===================================================================== */
const SO={
 me:{n:'Jordan',h:'@jordan',tag:'Phoenix · 5 week streak',c:'#191919'},
 sam:{n:'Sam Rivera',h:'@samr',tag:'Nurse · Phoenix',c:'#2f7a12'},
 mom:{n:'Mom',h:'@linda',tag:'Retired teacher',c:'#7a5af5'},
 jess:{n:'Jess Park',h:'@jessp',tag:'First year investing',c:'#e8a45c'},
 priya:{n:'Priya Nair',h:'@priya',tag:'FIRE by 45',c:'#2a9d8f'},
 marcus:{n:'Marcus Lee',h:'@mlee',tag:'Dad of two',c:'#3a6ea5'},
 leo:{n:'Leo Grant',h:'@leog',tag:'Just started',c:'#b5651d'},
 nina:{n:'Nina Alvarez',h:'@ninaa',tag:'Single mom · Later',c:'#c2185b'},
 ana:{n:'Ana Ruiz',h:'@anar',tag:'Nurse · Tempe',c:'#6d4c41'},
 tom:{n:'Tom Okafor',h:'@tomo',tag:'Teacher',c:'#455a64'},
 dee:{n:'Dee Chen',h:'@deec',tag:'Phoenix FIRE admin',c:'#00897b'},
 ray:{n:'Ray Patel',h:'@rayp',tag:'Round-Ups every day',c:'#5e35b1'},
 kim:{n:'Kim Osei',h:'@kimo',tag:'Acorns coach',c:'#0a1d08'},
 val:{n:'Val Moreno',h:'@valm',tag:'Creator · 41k',c:'#8e24aa'}};
function soAv(id,sz){const p=SO[id]||SO.sam;sz=sz||36;const l=p.n[0];return `<span class="so-av" style="background:${p.c};width:${sz}px;height:${sz}px;font-size:${Math.round(sz*.42)}px">${l}</span>`}
function soN(id){return id==='me'?'You':SO[id].n.split(' ')[0]}
function soAvs(ids,sz){return `<span class="so-avs">${ids.map(i=>soAv(i,sz||24)).join('')}</span>`}
function soState(){if(!S.so)S.so={likes:{},follows:{sam:1,priya:1,mom:1},replies:{},votes:{},joined:{},rsvp:{},posts:[],chat:{},h2h:null,mc:{},live:{},sv:{}};return S.so}

/* ---------- posts, threads, replies ---------- */
const SO_POSTS=[
 {id:'p1',by:'jess',t:'2h',vis:'Everyone',text:'Just put my first $500 in Later. I’m 31 and I feel like I’m late. Am I late?',likes:212,replies:40,club:null},
 {id:'p2',by:'priya',t:'5h',vis:'Everyone',text:'Market’s down 3% and I did my Friday deposit anyway. Holding. Who else?',likes:98,replies:17,att:{k:'streak',w:41}},
 {id:'p3',by:'sam',t:'Yesterday',vis:'Followers',text:'Joined Nurses saving for a house. Night shift money goes to the down payment now.',likes:64,replies:9,att:{k:'club',name:'Nurses saving for a house',n:1284}},
 {id:'p4',by:'mom',t:'Yesterday',vis:'Everyone',text:'Hit Young Oak today. 80 weeks. I started at 61 so don’t tell me it’s too late for anything.',likes:340,replies:52,att:{k:'seal',i:5,w:80}},
 {id:'p5',by:'marcus',t:'2d',vis:'Everyone',text:'Round-Ups every day in December. Kids think it’s a game. It is.',likes:41,replies:6,att:{k:'chal',name:'Round-Up every day'}}];
const SO_REPLIES={p1:[['sam','No. Thirty-one with $500 in Later is ahead of most people I work with.'],['mom','I started at 61. You are not late. You are early for 41-year-old you.'],['priya','Late would be not starting. You started.'],['marcus','My first Later deposit was at 34. Nobody checks the date.'],['nina','Same age, same feeling, same week. We’re not late, we’re on time.'],['ray','The best time was ten years ago. The second best time was today and you did it.'],['tom','Teacher here. Started at 38. It still compounds.'],['dee','Not late. Keep the $500 company next month.']],
 p2:[['sam','Holding. Deposited at lunch.'],['dee','Dips are a sale. Did mine this morning.'],['leo','First dip for me. This thread helped.']],
 p4:[['jess','Mom you are my hero.'],['sam','80 weeks!!'],['priya','This is the post.'],['nina','Screenshotting this for my sister.']]};
function soPost(p,o){o=o||{};const st=soState();const liked=!!st.likes[p.id];const likes=p.likes+(liked?1:0);const extra=(st.replies[p.id]||[]).length;
 const att=p.att?soAtt(p.att):'';
 return `<div class="so-post" ${o.open?'':`onclick="go('fd-post',{id:'${p.id}'})"`}><div class="so-ph">${soAv(p.by,40)}<div class="grow"><b>${p.by==='me'?S.me:SO[p.by].n}</b><em>${p.t} · ${p.vis==='Everyone'?'Everyone':p.vis==='Followers'?'Followers':'Only you'}</em></div>${p.by==='me'?'':soFollowBtn(p.by,1)}</div>
  <p class="so-tx">${p.text}</p>${att}
  <div class="so-acts"><button class="${liked?'on':''}" onclick="event.stopPropagation();soLike('${p.id}',this)">${ic2('flame',16)} ${likes}</button><button onclick="event.stopPropagation();go('fd-post',{id:'${p.id}'})">${ic('chat',16)} ${p.replies+extra}</button><button onclick="event.stopPropagation();soSharePost('${p.id}')">${ic('share',16)}</button></div></div>`}
function soAtt(a){if(a.k==='seal')return `<div class="so-att seal">${sealImg(a.i,56)}<div><b>${RSTAGES[a.i][1]}</b><em>${a.w} week streak</em></div></div>`;
 if(a.k==='streak')return `<div class="so-att"><span class="so-ai">${ic2('flame',18)}</span><div><b>${a.w} weeks in a row</b><em>Deposited this week</em></div></div>`;
 if(a.k==='club')return `<div class="so-att" onclick="event.stopPropagation();go('cl-club',{id:'nurses'})"><span class="so-ai" style="background:#e3f0ff;color:#1d5fa8">${ic('user',18)}</span><div><b>${a.name}</b><em>${a.n.toLocaleString()} members · Joined</em></div>${ic('chev',16,'opacity:.4')}</div>`;
 if(a.k==='chal')return `<div class="so-att"><span class="so-ai" style="background:#fff1dc;color:#b26a00">${ic('flag',18)}</span><div><b>${a.name}</b><em>December challenge · Day 12</em></div></div>`;return ''}
function soLike(id,el){const st=soState();st.likes[id]=!st.likes[id];save();haptic(6);refresh()}
function soFollowBtn(id,small){const on=!!soState().follows[id];return `<button class="so-fb ${on?'on':''} ${small?'sm':''}" onclick="event.stopPropagation();soFollow('${id}')">${on?'Following':'Follow'}</button>`}
function soFollow(id){const st=soState();st.follows[id]=!st.follows[id];save();haptic(6);toast(st.follows[id]?`Following ${soN(id)}`:`Unfollowed ${soN(id)}`);refresh()}
function soSharePost(id){const p=SO_POSTS.find(x=>x.id===id)||soState().posts.find(x=>x.id===id);progressShare({head:'Share this post',sub:`${p.by==='me'?'Your':soN(p.by)+'’s'} post, with your link`,title:p.text.slice(0,60),card:dkCard({seal:`<div class="dkc-quote">“${p.text}”</div>`,title:p.by==='me'?S.me:SO[p.by].n,sub:'on Acorns'})})}
function soReply(id,input){const v=input.value.trim();if(!v)return;const st=soState();(st.replies[id]=st.replies[id]||[]).push(['me',v]);save();input.value='';haptic(8);refresh();setTimeout(()=>{const b=$('.so-thread');if(b)b.scrollTop=99999},50)}
def('fd-post',p=>{const post=SO_POSTS.find(x=>x.id===p.id)||soState().posts.find(x=>x.id===p.id);const rs=(SO_REPLIES[p.id]||[]).concat(soState().replies[p.id]||[]);
 return {cls:'lt sgs sgx so',html:`<div class="sg-top"><button class="iconbtn" onclick="back()" aria-label="Back">${ic('back',24)}</button><b>Post</b><span style="width:44px"></span></div>
 <div class="sg-body sgx-body so-thread">${soPost(post,{open:1})}
  <div class="so-rh">${post.replies+rs.length-(SO_REPLIES[p.id]||[]).length+((SO_REPLIES[p.id]||[]).length)} replies</div>
  ${rs.map(([id,t])=>`<div class="so-re">${soAv(id,32)}<div><b>${id==='me'?'You':SO[id].n.split(' ')[0]}</b><p>${t}</p></div></div>`).join('')}
  ${post.replies>rs.length?`<div class="so-more">+ ${post.replies-(SO_REPLIES[p.id]||[]).length} more replies</div>`:''}</div>
 <div class="so-comp"><input id="soIn" placeholder="Say something back…" onkeydown="if(event.key==='Enter')soReply('${p.id}',this)"><button onclick="soReply('${p.id}',document.getElementById('soIn'))" aria-label="Send">${ic('back',18,'transform:rotate(180deg)')}</button></div>`}});

/* ---------- boards ---------- */
function soBoard(rows,o){o=o||{};const max=Math.max(...rows.map(r=>r.v));return `<div class="so-board">${o.head?`<div class="so-bh"><b>${o.head}</b><em>${o.sub||''}</em></div>`:''}
 ${rows.map((r,i)=>`<div class="so-br ${r.id==='me'?'me':''}"><i>${i+1}</i>${soAv(r.id,32)}<div class="grow"><b>${r.id==='me'?'You':SO[r.id].n.split(' ')[0]}</b><u><s style="width:${Math.round(r.v/max*100)}%"></s></u></div><em>${o.fmt?o.fmt(r.v):r.v}</em>${r.extra?`<span class="so-bx">${r.extra}</span>`:''}</div>`).join('')}</div>`}
/* ---------- polls ---------- */
function soPoll(id,q,opts){const st=soState();const v=st.votes[id];const tot=opts.reduce((a,o)=>a+o[1],0)+(v!=null?1:0);
 return `<div class="so-poll"><b>${q}</b>${opts.map((o,i)=>{const n=o[1]+(v===i?1:0);const pc=Math.round(n/tot*100);return `<button class="${v===i?'on':''} ${v!=null?'done':''}" onclick="event.stopPropagation();soVote('${id}',${i})"><s style="width:${v!=null?pc:0}%"></s><span>${o[0]}</span>${v!=null?`<em>${pc}%</em>`:''}</button>`}).join('')}<small>${tot} votes${v!=null?' · you voted':''}</small></div>`}
function soVote(id,i){const st=soState();if(st.votes[id]!=null)return;st.votes[id]=i;save();haptic(8);refresh()}
/* ---------- chat ---------- */
function soChat(key,seed){const st=soState();const msgs=seed.concat(st.chat[key]||[]);return `<div class="so-chat" id="soChat">${msgs.map(([id,t,me])=>`<div class="so-m ${id==='me'?'me':''}">${id==='me'?'':soAv(id,28)}<div><em>${id==='me'?'':SO[id].n.split(' ')[0]}</em><p>${t}</p></div></div>`).join('')}</div>`}
function soSend(key,input,reply){const v=input.value.trim();if(!v)return;const st=soState();(st.chat[key]=st.chat[key]||[]).push(['me',v]);save();input.value='';haptic(8);refresh();
 if(reply)setTimeout(()=>{const s=soState();(s.chat[key]=s.chat[key]||[]).push(reply);save();if(cur()&&$('#soChat'))refresh()},1400)}
function soComp(key,ph,reply){return `<div class="so-comp"><input id="soIn" placeholder="${ph||'Message'}" onkeydown="if(event.key==='Enter')soSend('${key}',this,${reply?JSON.stringify(reply).replace(/"/g,'&quot;'):'null'})"><button onclick="soSend('${key}',document.getElementById('soIn'),${reply?JSON.stringify(reply).replace(/"/g,'&quot;'):'null'})" aria-label="Send">${ic('back',18,'transform:rotate(180deg)')}</button></div>`}
/* ---------- visibility ---------- */
const SO_VIS=[['Everyone','Anyone on Acorns'],['Followers','People who follow you'],['Only me','A private note on your timeline']];
function soVisSheet(cb){sheet(`<div class="h3">Who can see this?</div><div class="mt12">${SO_VIS.map(([k,d])=>`<div class="li" onclick="closeOv();(${cb})('${k}')">${ic(k==='Everyone'?'eye':k==='Followers'?'user':'lock',20)}<div class="grow"><div class="ttl">${k}</div><div class="sub">${d}</div></div></div>`).join('')}</div><p class="sm mt12">Your starting amount and balance are never shown, whatever you pick.</p>`)}

document.head.insertAdjacentHTML('beforeend',`<style>
.scr.so{background:#f5f7f2!important}
.so-av{display:inline-flex;align-items:center;justify-content:center;border-radius:50%;color:#fff;font-weight:700;flex:none;box-shadow:0 0 0 2px #fff}
.so-avs{display:inline-flex}.so-avs .so-av{margin-left:-8px}.so-avs .so-av:first-child{margin-left:0}
.so-post{background:#fff;border-radius:22px;padding:16px;margin-top:12px}.so-ph{display:flex;align-items:center;gap:10px}.so-ph b{display:block;font-size:15px}.so-ph em{display:block;font-style:normal;font-size:12px;color:#6b706c;margin-top:1px}
.so-tx{margin:12px 0 0;font-size:16px;line-height:1.45;color:#191919}
.so-att{display:flex;align-items:center;gap:12px;margin-top:12px;padding:12px;border-radius:16px;background:#f3f6f0}.so-att b{display:block;font-size:14px}.so-att em{display:block;font-style:normal;font-size:12px;color:#6b706c}.so-att .grow,.so-att>div{flex:1}
.so-ai{width:40px;height:40px;border-radius:20px;background:#e3f4d8;color:#2f7a12;display:flex;align-items:center;justify-content:center;flex:none}
.so-acts{display:flex;gap:8px;margin-top:12px}.so-acts button{display:flex;align-items:center;gap:6px;height:34px;padding:0 12px;border-radius:17px;background:#f3f6f0;font-size:13px;font-weight:600;color:#3d453f}.so-acts button.on{background:#e3f4d8;color:#2f7a12}
.so-fb{height:32px;padding:0 14px;border-radius:16px;background:#191919;color:#fff;font-size:13px;font-weight:600}.so-fb.on{background:#eef1ec;color:#191919}.so-fb.sm{height:28px;padding:0 10px;font-size:12px}
.so-rh{margin:18px 4px 6px;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#5d655f}
.so-re{display:flex;gap:10px;padding:10px 4px}.so-re b{font-size:13px}.so-re p{margin:2px 0 0;font-size:15px;line-height:1.4}.so-more{padding:12px 4px;font-size:14px;color:#2f7a12;font-weight:600}
.so-comp{position:absolute;left:12px;right:12px;bottom:calc(var(--safeBot) + 72px);display:flex;gap:8px;padding:6px 6px 6px 14px;border-radius:26px;background:#fff;box-shadow:0 10px 30px rgba(0,0,0,.12);z-index:5}.so-comp input{flex:1;border:0;outline:0;font:inherit;font-size:15px;background:none}.so-comp button{width:40px;height:40px;border-radius:20px;background:#74c947;color:#0a1d08;display:flex;align-items:center;justify-content:center}
.scr:has(.so-comp) .sg-body{bottom:calc(var(--safeBot) + 130px)!important}
.so-board{background:#fff;border-radius:22px;padding:6px 16px;margin-top:12px}.so-bh{padding:12px 0 6px}.so-bh b{display:block;font-size:16px}.so-bh em{display:block;font-style:normal;font-size:12px;color:#6b706c}
.so-br{display:flex;align-items:center;gap:10px;padding:10px 0;border-top:1px solid #f0f2ee}.so-br:first-child,.so-bh+.so-br{border-top:0}.so-br i{width:18px;font-style:normal;font-size:13px;font-weight:700;color:#8a958c;text-align:center}.so-br b{display:block;font-size:14px}.so-br u{display:block;height:6px;border-radius:3px;background:#eef1ec;margin-top:6px;text-decoration:none}.so-br s{display:block;height:100%;border-radius:3px;background:#74c947;text-decoration:none}.so-br em{font-style:normal;font-size:14px;font-weight:700;min-width:44px;text-align:right}.so-br.me{background:#f3f9ee;margin:0 -16px;padding:10px 16px;border-radius:14px}.so-br.me b{color:#2f7a12}.so-bx{font-size:11px;color:#6b706c;display:flex;align-items:center;gap:3px}
.so-poll{background:#fff;border-radius:22px;padding:16px;margin-top:12px}.so-poll>b{display:block;font-size:16px;margin-bottom:10px}.so-poll button{position:relative;display:flex;align-items:center;width:100%;height:44px;margin-top:8px;padding:0 14px;border-radius:14px;background:#f3f6f0;overflow:hidden;font-size:14px;font-weight:600;color:#191919;text-align:left}.so-poll button s{position:absolute;left:0;top:0;bottom:0;background:#dff0d3;text-decoration:none;transition:width .6s cubic-bezier(.2,.8,.2,1)}.so-poll button span,.so-poll button em{position:relative}.so-poll button em{margin-left:auto;font-style:normal}.so-poll button.on{box-shadow:inset 0 0 0 2px #74c947}.so-poll small{display:block;margin-top:10px;font-size:12px;color:#6b706c}
.so-chat{display:flex;flex-direction:column;gap:10px;padding:6px 0}.so-m{display:flex;gap:8px;align-items:flex-end;max-width:86%}.so-m.me{align-self:flex-end;flex-direction:row-reverse}.so-m em{display:block;font-style:normal;font-size:11px;color:#6b706c;margin:0 0 3px 6px}.so-m p{margin:0;padding:10px 14px;border-radius:18px 18px 18px 6px;background:#fff;font-size:15px;line-height:1.35}.so-m.me p{background:#74c947;color:#0a1d08;border-radius:18px 18px 6px 18px}
.dkc-quote{max-width:230px;font-size:17px;line-height:1.35;font-weight:600;text-align:center;text-shadow:0 2px 10px rgba(0,0,0,.4)}
/* generic social surfaces */
.so-sec{display:flex;align-items:center;justify-content:space-between;margin:22px 4px 8px}.so-sec b{font-size:17px}.so-sec button{font-size:13px;font-weight:600;color:#2f7a12}
.so-search{display:flex;align-items:center;gap:10px;height:48px;padding:0 16px;border-radius:24px;background:#fff;color:#6b706c;font-size:15px;margin-top:4px}
.so-hero{position:relative;margin:4px -20px 0;height:190px;overflow:hidden;color:#fff}.so-hero .so-hc{position:absolute;left:20px;right:20px;bottom:16px}.so-hero h1{margin:0;font-size:26px;line-height:1.1;letter-spacing:-.5px}.so-hero em{display:block;font-style:normal;font-size:13px;opacity:.85;margin-top:6px}
.so-seg{display:flex;gap:4px;padding:4px;border-radius:18px;background:#e9ede4;margin-top:14px}.so-seg button{flex:1;height:36px;border-radius:14px;font-size:14px;font-weight:600;color:#5d655f}.so-seg button.on{background:#fff;color:#191919;box-shadow:0 2px 8px rgba(0,0,0,.08)}
.so-tile{display:flex;align-items:center;gap:12px;width:100%;padding:12px;border-radius:18px;background:#fff;text-align:left;color:#191919;margin-top:10px}.so-tile .so-ti{width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;flex:none;color:#fff;font-size:20px}.so-tile b{display:block;font-size:15px}.so-tile em{display:block;font-style:normal;font-size:12px;color:#6b706c;margin-top:2px}
.so-join{height:34px;padding:0 14px;border-radius:17px;background:#74c947;color:#0a1d08;font-size:13px;font-weight:700;flex:none}.so-join.on{background:#eef1ec;color:#191919}
.so-chip{display:inline-flex;align-items:center;gap:5px;height:26px;padding:0 10px;border-radius:13px;background:#eef1ec;font-size:12px;font-weight:600;color:#3d453f}.so-chip.live{background:#ffe3e3;color:#c62828}.so-chip.live i{width:7px;height:7px;border-radius:4px;background:#e53935;animation:soPulse 1.2s infinite}@keyframes soPulse{50%{opacity:.3}}
.so-row{display:flex;align-items:center;gap:12px;padding:12px 0;border-top:1px solid #f0f2ee}.so-row:first-child{border-top:0}.so-row b{display:block;font-size:15px}.so-row em{display:block;font-style:normal;font-size:12px;color:#6b706c;margin-top:2px}
.so-card{background:#fff;border-radius:22px;padding:16px;margin-top:12px}
.so-kv{display:flex;justify-content:space-between;padding:10px 0;border-top:1px solid #f0f2ee;font-size:14px}.so-kv:first-child{border-top:0}.so-kv span{color:#6b706c}
.so-badge{display:inline-flex;align-items:center;gap:4px;height:22px;padding:0 8px;border-radius:11px;font-size:11px;font-weight:700;background:#fff1dc;color:#b26a00}.so-badge.lock{background:#eef1ec;color:#6b706c}.so-badge.gold{background:#fff3c4;color:#8a6d12}
.so-fab{position:absolute;right:16px;bottom:calc(var(--safeBot) + 80px);height:48px;padding:0 18px 0 14px;border-radius:24px;background:#191919;color:#fff;font-size:14px;font-weight:600;display:flex;align-items:center;gap:6px;box-shadow:0 10px 24px rgba(0,0,0,.25);z-index:5}
</style>`);
