/* =====================================================================
   Witnessed Habit · the stories. Three bets and nine concepts, each its
   own link. Written to the customer: what this is, why it's worth it.
   One idea per card. One picture per card, sized to the box.
   ===================================================================== */
const WH_STORIES={
 /* ---- bets ---- */
 roots:{name:'Roots',t:'Roots',cta:'Open Home',s:'One person who sees you show up.',where:'Your oak, your witnesses, your cards, right on Home.',go:"T={};go('rt-home')",beats:[
  ['fcnum','Every Friday, Home opens on one number: how many of us kept a promise this week. If you did, it says so.'],
  ['witask','You’ve been showing up for your goal, and nobody knows. So we ask: who would notice if you stopped?'],
  ['blbar','Once a month the whole room takes on one target. Every skip is a tap toward your goal. Nobody is ranked.'],
  ['rgcard','Cross a milestone and we make you the card. Goal, club, one line of math. Never the balance.'],
  ['acdrop','Milestones hand you an acorn: $5 you can only plant in someone’s first goal. You’re their witness from Friday one.']]},
 family:{name:'Family Tree',t:'Family Tree',cta:'Open my grove',s:'Seedling and Same Tree, in your grove.',where:'Your grove: shared goals and family, in the dock.',go:"T={};go('ft-home')",beats:[
  ['sdgift','Grandpa taps the gift link and $25 goes to Ava’s bike fund. This year, one more line: want to see how Ava’s doing?'],
  ['sdmonth','Once a month his phone says Ava added to her bike fund. He taps the sticker. He never downloads anything.'],
  ['sdcap','When she’s close, he leaves her a message for the day she gets there. Locked until she does. Then you hand her the phone.'],
  ['stgoal','One goal, two accounts, nothing pooled. Share it, they say yes, and it adds up what each of you put in.'],
  ['ststk','When they add without saying anything, your phone tells you first. Send the sticker. That’s the money talk.']]},
 forest:{name:'The Forest',t:'The Forest',cta:'Find my forest',s:'The Grove and Canopy, for when nobody comes to mind.',where:'The Forest square on Home. Red on red days.',go:"T={};go('fo-grove')",beats:[
  ['grnobody','Who would notice if you stopped? If the honest answer is nobody, you’re not alone in that either.'],
  ['grspread','So we put you with a few thousand people your age with your goal, on handles nobody can trace. A spread, never a rank.'],
  ['grask','Ask the question you’ve been embarrassed about since the download. If someone already answered it, you’ll see that first.'],
  ['cnbench','Some of the people answering have a year in and a streak. They’re on duty, and paid when the people they help keep going.'],
  ['cnred','On the day the market drops, that bench moves to the top of Home. Ask instead of selling, and a badge stays on your goal.']]},
 /* ---- Roots concepts ---- */
 witness:{name:'Witness',t:'Witness',cta:'Pick who’d notice',s:'One person who sees you show up.',where:'When you name a goal, and every Friday after.',go:"T={};go('rt-home',{focus:'wit'})",beats:[
  ['witgoal','Fourteen weeks in a row on your goal. Nobody knows. There’s just nobody it would occur to you to tell.'],
  ['witask','So we ask one thing. Who would notice if you stopped? Not the most supportive person. The one who’d actually say something.'],
  ['witsms','They see exactly what they’d get: your goal’s name, and a yes or no every Friday. Never the balance. They decide if they’re in.'],
  ['witfri','Friday your $10 moves. They tap a sticker. That’s the whole thing, and it’s more than it sounds.'],
  ['witpause','Rough month? Pause. Your streak freezes instead of breaking, and they get one note they can send.']]},
 bloom:{name:'Bloom',t:'Bloom',cta:'Join this month’s Bloom',s:'A month, a target, all of us.',where:'The first of every month.',go:"T={};go('rt-home',{focus:'bloom'})",beats:[
  ['blnov','One a month. The whole room takes on one target together. November: 300,000 skipped purchases, 48,000 of us.'],
  ['bltap','Every skip is one tap. The money moves to your goal, and the bar moves a little.'],
  ['bldare','Dare your witness in. It only counts if you both finish.'],
  ['blroom','Nobody is ranked. Nobody sees who slipped. You see how the room is doing, never where you are in it.'],
  ['blfin','Hit it together and $5 lands in every finisher’s goal. Your card says who you finished with.']]},
 rings:{name:'Rings',t:'Rings',cta:'See a card',s:'The card, not the balance.',where:'At a milestone, and every January.',go:"T={};go('rt-home',{focus:'rings'})",beats:[
  ['rgcross','When your goal crosses a line the ledger can prove, we make you a card before you ask.'],
  ['rgcard','Goal, club, start date, cadence. One line of math. No balance unless you turn it on.'],
  ['rgguest','Post it anywhere. Whoever taps it lands on your goal as a guest. Two buttons: ask to witness, or start their own.'],
  ['rgtwo','Only you see this part: how many people started from your card.'],
  ['rgyear','Every January, the big one. Your year of Fridays, your comeback, who saw it. A year of behavior, never a number.']]},
 acorn:{name:'Drop an Acorn',t:'Drop an Acorn',cta:'Plant one',s:'$5 you can’t keep.',where:'Every milestone.',go:"T={};go('rt-home',{focus:'acorn'})",beats:[
  ['acget','Every milestone hands you an acorn. $5 of our money that you can’t keep.'],
  ['acwho','You can only plant it in someone’s first goal. The person who keeps saying “I should do that.”'],
  ['acdrop','They open a link. No account, no code. Your name and five dollars, held for them. They name a goal to claim it.'],
  ['acfri','Their first Friday, you’re the witness. You tap the sticker. Nobody paid you, and nobody will.']]},
 fridaycount:{name:'The Friday Count',t:'The Friday Count',cta:'See this Friday’s count',s:'How many of us kept a promise this week.',where:'Home, every Friday.',go:"T={};go('rt-home')",beats:[
  ['fcnum','Every Friday, Home opens on one number: how many of us kept a promise this week.'],
  ['fcyou','If you deposited, it says you’re one of them. If you didn’t, it says nothing about you. No one is named or nudged.'],
  ['fcq','Under it, one question a day. You only see the answer by answering.'],
  ['fcans','Did your family talk about money growing up? 61% said no. For once the answer to a money question isn’t embarrassing.']]},
 /* ---- Family Tree concepts ---- */
 seedling:{name:'Seedling',t:'Seedling',cta:'See Grandpa’s side',s:'The gift link grows two lines.',where:'Every gift to an Early account.',go:"T={};go('ft-home',{focus:'seed'})",beats:[
  ['sdgift','Grandpa taps the gift link. $25 goes to Ava’s bike fund, with a note that says he’s proud. Then it’s gone.'],
  ['sdline','This year, one more line under the gift: want to see how Ava’s doing?'],
  ['sdmonth','Once a month his phone says Ava added to her bike fund. He taps the sticker. He never downloads anything.'],
  ['sdcap','When she’s close: leave Ava a message for the day she gets there. Locked until she does.'],
  ['sdplay','The day she gets the bike, you hand her the phone. It’s Grandpa, from four months ago, telling her he knew she’d do it.']]},
 sametree:{name:'Same Tree',t:'Same Tree',cta:'Share a goal',s:'One goal. Separate accounts. Everyone in.',where:'Any goal → Share this goal.',go:"T={};go('ft-home',{focus:'same'})",beats:[
  ['stgoal','You’ve never merged your money. You don’t have to. One goal, your account, their account, nothing pooled.'],
  ['stshare','Share this goal. They say yes. It shows in both apps and adds up what each of you put in.'],
  ['stsee','You each decide what the other sees. Your part, or only the total. Nothing else.'],
  ['ststk','When they add without saying anything, your phone tells you first. Send the sticker.'],
  ['stfive','Stretch it to five for a trip. Anyone can leave and keep their own money and history.']]},
 /* ---- Forest concepts ---- */
 grove:{name:'The Grove',t:'The Grove',cta:'Find my grove',s:'Grow alongside people with your goal. No names, no rankings.',where:'When nobody comes to mind.',go:"T={};go('fo-grove')",beats:[
  ['grnobody','Nobody to name as a witness? A few thousand people your age have your goal, and most of them had nobody either.'],
  ['grhandle','Everyone’s on a random handle. Share a percent and a streak, never a dollar, to see the room.'],
  ['grspread','The spread shows where the group is, never where you are in it. Most are between 10% and 40%. A lot missed a week in October too.'],
  ['grask','Ask the question you’ve been sitting on. If someone already answered it, you’ll see that before you post.'],
  ['grmark','Answer well and you earn a mark. Marks build toward a Canopy shift.']]},
 canopy:{name:'Canopy',t:'Canopy',cta:'Ask someone',s:'Ask someone who’s been through it.',where:'Inside your grove, and on top of Home on red days.',go:"T={};go('fo-canopy')",beats:[
  ['cnbench','Inside your grove, a few people have a year in and a streak. They’re on duty. Ask them anything about the habit.'],
  ['cnred','On the day the market drops, your group chat is asking whether to sell. The bench moves to the top of Home.'],
  ['cnmath','Ask one question. The answer comes with your own math in it: your drop is $36, your next three weeks cover it.'],
  ['cnbadge','Ask instead of selling and a badge stays on your goal. Whoever answered gets paid if you’re still depositing a month later.']]}};
Object.keys(WH_STORIES).forEach(k=>{const w=WH_STORIES[k];LANDERS[k]={name:w.name,beats:w.beats,t:w.t,s:w.s,where:w.where,cta:w.cta};SPL[k]={t:w.t,e:'Witnessed Habit',img:'oak',what:w.s,why:'',where:w.where,go:w.go,cta:w.cta};w.beats.forEach(b=>LD_MOCK.add(b[0]))});
Object.assign(LF,{roots:['Someone who notices','Roots','banner'],family:['The goal is the thing you share','Family Tree','banner'],forest:['For when nobody comes to mind','The Forest','banner'],witness:['Someone who notices','Witness','banner'],bloom:['A month, a target, all of us','Bloom','banner'],rings:['The card, not the balance','Rings','banner'],acorn:['$5 you can’t keep','Drop an Acorn','banner'],fridaycount:['You’re one of them','The Friday Count','banner'],seedling:['Grandpa never downloads anything','Seedling','banner'],sametree:['Nothing pooled, everyone in','Same Tree','banner'],grove:['No names, no rankings','The Grove','banner'],canopy:['Ask, don’t sell','Canopy','banner']});
const WH_LX={roots:()=>`<div class="lx lx-card"><span class="lx-av" style="background:#e8a45c">J</span><div><em class="lx-k">Your witness</em><b>Jess said yes</b><em>Sees “Car fund” · a yes or no each Friday</em></div></div>`,
 family:()=>`<div class="lx lx-card"><span class="lx-img" style="background:#fff1dc;align-items:center;justify-content:center;font-size:22px">🚲</span><div><em class="lx-k">Ava’s bike fund</em><b>Grandpa is watching</b><em>0:40 saved for the day she gets there</em></div></div>`,
 forest:()=>`<div class="lx lx-card"><span class="lx-img" style="background:#0a1d08;align-items:center;justify-content:center">${sgGlyph('peak',22,'#bceaa3')}</span><div><em class="lx-k">Canopy · on duty</em><b>@tasha_holds is on</b><em>“Your drop today is $36.”</em></div></div>`};
Object.keys(WH_STORIES).forEach(k=>{const w=WH_STORIES[k];const target=w.go.match(/go\('([^']+)'(?:,(\{[^}]*\}))?\)/);const WH_P={roots:'Witness, Bloom, Rings, Drop an Acorn and the Friday Count. Never the balance, never a rank, nothing shared until both of you say yes.',family:'Seedling and Same Tree. Relatives watch a kid’s goal through the gift link; a goal shared across separate accounts, up to five people, nothing pooled.',forest:'An anonymous grove with your goal and your age, with Canopy, the people who’ve been through it, on duty inside it.',witness:'They see your goal’s name and a yes or no every Friday. Never the balance. Either side can stop. If they say no, you aren’t told.',bloom:'Every skip is a Skip and Invest tap toward your own goal. Nobody is ranked. Finish together and $5 lands in every finisher’s goal.',rings:'Only what the ledger can prove, and one line of math. Tapping it opens your goal as a guest. Every January, the Year Ring.',acorn:'Four a year. Unclaimed after 30 days, it comes back. Nobody is paid to recruit, so nobody spams.',fridaycount:'No names, no rank. The week the number drops, it shows anyway. One question a day, answered to be seen.',seedling:'Relatives follow through the same link, no app, one update a month and a sticker. Mom decides whether relatives can watch at all.',sametree:'No joint account, no custody question. If it ends, each keeps their own money and history.',grove:'A percentage and a streak, never a dollar. A daily question, and a Q&A where the answer already written appears before you post.',canopy:'Answers are about the habit, never what to buy. Helpers are paid for the outcome, not the volume.'};LFX[k]=[target[1],target[2]?eval('('+target[2]+')'):{},w.s+' '+WH_P[k],WH_LX[k]||WH_LX[{witness:'roots',bloom:'roots',rings:'roots',acorn:'roots',fridaycount:'roots',seedling:'family',sametree:'family',grove:'forest',canopy:'forest'}[k]]]});
Object.assign(LF_WITH,{roots:[['family','Family Tree','A witness can be family'],['forest','The Forest','When nobody comes to mind']],family:[['roots','Roots','Same Tree members can witness'],['forest','The Forest','Ask the grove together']],forest:[['roots','Roots','Grove members can become witnesses'],['family','Family Tree','Bring the family in']],
 witness:[['bloom','Bloom','Dare your witness in'],['acorn','Drop an Acorn','Become someone’s first witness'],['fridaycount','Friday Count','Fridays are the moment']],bloom:[['witness','Witness','The dare needs one'],['rings','Rings','Finishing goes on your card']],rings:[['witness','Witness','Guests can ask to witness'],['acorn','Drop an Acorn','Milestones hand you one']],acorn:[['witness','Witness','You’re theirs from Friday one'],['rings','Rings','Acorns planted go on the Year Ring']],fridaycount:[['witness','Witness','Who sees your Friday'],['grove','The Grove','The daily question lives there too']],
 seedling:[['sametree','Same Tree','Save for your kid with a partner'],['rings','Rings','Ava’s goal gets a card']],sametree:[['seedling','Seedling','Let family watch'],['witness','Witness','Partners can witness too']],grove:[['canopy','Canopy','On duty inside your grove'],['fridaycount','Friday Count','Same question, your grove’s answers']],canopy:[['grove','The Grove','Where the bench lives'],['witness','Witness','Ask your witness first']]});

/* ---------- art: one picture per card ---------- */
const lvOne=(html,cls)=>`${ldGlow()}<div class="lv-mid"><div class="wh-one ${cls||''}">${html}</div></div>`;
const whCard=(inner,cls)=>`<div class="so-lvc rise ${cls||''}" style="width:300px">${inner}</div>`;
const whRow=(av,b,em,right)=>`<div class="so-row" style="border:0;padding:0">${av}<div class="grow"><b style="font-size:14px">${b}</b><em style="font-size:12px">${em}</em></div>${right||''}</div>`;
const whGoal=(label,sub)=>`<div class="rt-goal rise" style="width:300px;margin:0;box-shadow:0 20px 44px rgba(0,0,0,.4)"><div class="rt-gi">${stageImg(14,54)}</div><div class="grow"><em>${label}</em><b>Car fund</b><span>${sub}</span></div></div>`;
/* Friday Count */
LV.fcnum=()=>lvOne(`<div class="rt-fc rise" style="width:300px;margin:0;box-shadow:0 20px 44px rgba(0,0,0,.45)"><div class="rt-fcn"><b>41,206</b><span>people kept their promise this week.</span></div><div class="rt-fcy rise d3">${ic('check',14)} You’re one of them.</div></div>`);
LV.fcyou=()=>lvOne(`<div class="rt-fc rise" style="width:300px;margin:0;box-shadow:0 20px 44px rgba(0,0,0,.45)"><div class="rt-fcn"><b>38,912</b><span>people kept their promise this week.</span></div><div class="rt-fcy" style="color:rgba(255,255,255,.45)">${ic('lock',14)} Nothing about you. No name, no nudge.</div></div>`);
LV.fcq=()=>lvOne(`<div class="rt-fc rise" style="width:300px;margin:0;box-shadow:0 20px 44px rgba(0,0,0,.45)"><div class="rt-fcq" style="margin:0"><em>Today’s question</em><b>Did your family talk about money growing up?</b><div class="rt-fcbtn"><button>Yes</button><button style="background:#74c947;color:#0a1d08">No</button></div><small>You only see the answer by answering.</small></div></div>`);
LV.fcans=()=>lvOne(`<div class="rt-fc rise" style="width:300px;margin:0;box-shadow:0 20px 44px rgba(0,0,0,.45)"><div class="rt-fcq" style="margin:0"><em>Today’s question</em><b>Did your family talk about money growing up?</b><div class="rt-fca"><div class="rt-fcb"><i style="width:61%"></i></div><span><b>61%</b> said no. You said no.</span></div></div></div>`);
/* Witness */
LV.witgoal=()=>lvOne(`${whGoal('Your goal','$10 a week · 14 weeks in a row')}<div class="wh-under rise d3">${ic('eye',12)} Seen by nobody</div>`);
LV.witask=()=>lvOne(whCard(`<div class="rt-q" style="font-size:19px">Who would notice if you stopped?</div><div style="margin-top:10px">${[['jess','Jess','Your sister',1],['sam','Sam','Best friend',0],['mom','Mom','',0]].map(([id,n,r,on],i)=>`<div class="so-row" style="padding:8px 0" >${soAv(id,34)}<div class="grow"><b style="font-size:14px">${n}</b>${r?`<em style="font-size:12px">${r}</em>`:''}</div><span class="cl-radio ${on?'on':''}"></span></div>`).join('')}</div>`));
LV.witsms=()=>lvOne(`<div class="rt-phone rise" style="width:300px;margin:0"><div class="rt-sms"><em>Acorns</em><p>Jordan asked you to be the one person who sees them show up for “Car fund.” Every Friday: they did, or they didn’t. Never the amount. Stop any time.</p><div class="rt-smsb"><span>I’m in</span><span>No thanks</span></div></div></div>`);
LV.witfri=()=>lvOne(whCard(`<div class="rt-fri" style="padding:0;background:none"><div class="rt-fl"><span>${ic('check',14)}</span><b>Friday · $10 moved</b><em>Jess saw it</em></div><span class="rt-stk pop" style="animation-delay:.7s">👏</span></div>`));
LV.witpause=()=>lvOne(whCard(`<div class="rt-fri" style="padding:0;background:none"><div class="rt-fl"><span>${ic('lock',14)}</span><b>Paused · streak frozen</b><em>Jess sees “taking a break”</em></div></div><div class="rt-note rise d3" style="margin-top:12px">${soAv('jess',24)}<p>“Rough month? The car fund’s still here.”</p></div>`));
/* Bloom */
LV.blnov=()=>lvOne(whCard(`<em class="so-lvk">November · Bloom</em><b style="display:block;font-size:20px;margin-top:4px">No-Spend November</b><em style="display:block;font-style:normal;font-size:12px;color:#6b706c;margin-top:2px">48,000 of us · going for 300,000 skipped purchases</em><div class="rt-bar" style="margin-top:24px"><i style="width:4%"></i><b style="left:4%">Day 1</b></div>`));
LV.bltap=()=>lvOne(whCard(`${whRow(`<span class="so-ai">${ic('check',16)}</span>`,'Skipped coffee · $6 invested','Car fund · the bar moved')}<div class="rt-bar" style="margin-top:18px"><i style="width:71%"></i><b style="left:71%">71%</b></div>`));
LV.bldare=()=>lvOne(whCard(`${whRow(soAv('jess',36),'Dare Jess','It only counts if you both finish',`<span class="so-join on">${ic('check',12)} She’s in</span>`)}<div class="rt-note rise d3" style="margin-top:12px">${soAv('jess',22)}<p>📷 the shoes I didn’t buy</p></div>`));
LV.blroom=()=>lvOne(whCard(`<div class="rt-spread" style="margin:0"><em>Where the room is · skips so far</em><div class="rt-hist">${[4,9,16,24,21,13,8,5].map((v,i)=>`<i style="height:${v*3.2}px" class="${i>=2&&i<=4?'hi':''}"></i>`).join('')}</div><div class="rt-hl"><span>0</span><span>Most of us are here</span><span>40+</span></div><small>Never where you are in it.</small></div>`));
LV.blfin=()=>lvOne(whCard(`<div class="rt-fin" style="margin:0">${svgSeal({top:'Finished',bottom:'November',glyph:'star',size:64})}<div><b>$5 landed in Car fund</b><em>Finished with Jess · 34,080 of us</em></div></div>`));
LV.blbar=()=>lvOne(whCard(`<b style="display:block;font-size:17px">No-Spend November</b><em style="display:block;font-style:normal;font-size:12px;color:#6b706c;margin-top:2px">48,000 of us · one target</em><div class="rt-bar" style="margin-top:24px"><i style="width:71%"></i><b style="left:71%">71%</b></div><div class="mc-pl"><span>212,480 skipped</span><span>300,000</span></div>`));
/* Rings */
LV.rgcross=()=>lvOne(`${whGoal('Your goal','$15 a day · just crossed $1,000')}<div class="wh-under rise d3" style="background:#e3f4d8;color:#2f7a12">${ic('check',12)} Your card is ready</div>`);
LV.rgcard=()=>lvOne(`<div class="rise" style="width:300px">${rtRingCard({name:'Move out',club:'$1k club',start:'Started August',cad:'$15 a day',math:'$15 a day is $5,475 a year, before it grows.',by:'me'})}</div>`);
LV.rgguest=()=>lvOne(whCard(`<div class="rt-guestnote" style="margin:0 0 10px">${ic('eye',14)} Guest · no account</div><b style="display:block;font-size:18px">Move out · $1k club</b><em style="display:block;font-style:normal;font-size:12px;color:#6b706c;margin-top:2px">Balance not shared</em><div style="display:flex;gap:8px;margin-top:14px"><span class="so-join" style="flex:1;justify-content:center;background:#eef1ec;color:#191919">Ask to witness</span><span class="so-join" style="flex:1;justify-content:center">Start my own</span></div>`));
LV.rgtwo=()=>lvOne(whCard(`${whRow(`<span class="so-ai">${ic('eye',16)}</span>`,'2 people started from this','Only you see this')}<div style="display:flex;gap:6px;margin-top:12px">${soAv('nina',28)}${soAv('leo',28)}<span class="so-chip" style="margin-left:auto">Ring at 3</span></div>`));
LV.rgyear=()=>lvOne(`<div class="rise" style="transform:scale(.76);transform-origin:50% 50%;margin:-50px 0">${dkCard({cls:'tall',seal:svgSeal({top:'2026',bottom:'47 of 52',glyph:'trophy',size:140}),title:'47 of 52 Fridays',sub:'One comeback · witnessed by Jess'})}</div>`,'tight');
/* Drop an Acorn */
LV.acget=()=>lvOne(whCard(`${whRow(`<span class="rt-acorn">${stageImg(0,40)}</span>`,'You’ve got an acorn','$5 of our money. You can’t keep it.',`<span class="so-chip">1 of 4</span>`)}`));
LV.acwho=()=>lvOne(whCard(`<b style="display:block;font-size:17px">Who gets it?</b>${[['nina','Dani','Has said “I should do that” for a year',1],['marcus','Marcus','First real job',0]].map(([id,n,d,on])=>`<div class="so-row" style="padding:8px 0">${soAv(id,34)}<div class="grow"><b style="font-size:14px">${n}</b><em style="font-size:12px">${d}</em></div><span class="cl-radio ${on?'on':''}"></span></div>`).join('')}`));
LV.acdrop=()=>lvOne(whCard(`<div style="display:flex;align-items:center;gap:12px;justify-content:center">${soAv('me',36)}${stageImg(0,52)}</div><b style="display:block;font-size:17px;text-align:center;margin-top:10px">$5 from Jordan, waiting for your first goal.</b><div class="cl-in" style="margin-top:12px;display:flex;align-items:center;height:46px;font-size:16px">Vegas</div>`));
LV.acfri=()=>lvOne(whCard(`<div class="rt-fri" style="padding:0;background:none"><div class="rt-fl"><span>${ic('check',14)}</span><b>Dani · first Friday · $5 moved</b><em>You’re her witness</em></div><span class="rt-stk pop" style="animation-delay:.6s">🌱</span></div><div class="rt-note rise d3" style="margin-top:12px">${soAv('nina',22)}<p>“ok that was weirdly nice.”</p></div>`));
/* Seedling */
LV.sdgift=()=>lvOne(whCard(`${whRow(`<span class="ft-kid">🚲</span>`,'Ava’s bike fund','Gift link · no app')}<div class="ft-sent">${ic('check',16)} $25 sent · “Proud of you.”</div>`));
LV.sdline=()=>lvOne(whCard(`${whRow(`<span class="ft-kid">🚲</span>`,'Want to see how Ava’s doing?','One update a month. Never the balance.',`<span class="so-join">Yes</span>`)}`));
LV.sdmonth=()=>lvOne(whCard(`<em class="so-lvk">October</em><div class="ft-upd" style="margin-top:8px"><div class="ft-ul"><b>Ava added to her bike fund</b><em>3 of 3 weeks</em></div><span class="rt-stk pop" style="animation-delay:.6s">👏</span></div>`));
LV.sdcap=()=>lvOne(whCard(`${whRow(`<span class="ft-rav">L</span>`,'Leave Ava a message for the day she gets there','Locked until she does',ic('lock',18,'color:#6b706c'))}<div class="ft-wave" style="height:40px;margin-top:12px">${Array.from({length:22},(_,i)=>`<i style="--h:${6+((i*37)%18)}px;background:#9bd77a"></i>`).join('')}</div>`));
LV.sdplay=()=>lvOne(`<div class="so-lvhost rise"><span class="ft-rav big">L</span><b>Grandpa Lou · Thanksgiving</b><em>0:40</em><div class="ft-wave on" style="margin-top:14px">${Array.from({length:22},(_,i)=>`<i style="--h:${8+((i*37)%22)}px;animation-delay:${i*.08}s"></i>`).join('')}</div><p>“I knew you’d do it.”</p></div>`);
/* Same Tree */
LV.stgoal=()=>lvOne(whCard(`<div class="sgx-ch" style="margin-bottom:10px"><div><b>Wedding · 31%</b><em>$3,700 of $12,000 · 2 accounts, nothing pooled</em></div>${svgSeal({top:'Same tree',bottom:'Wedding',glyph:'rings',size:44})}</div><div class="ft-stack"><i style="width:17%;background:#2f7a12"></i><i style="width:13%;background:#7a5af5"></i></div>`));
LV.stshare=()=>lvOne(whCard(`${whRow(soAv('priya',36),'Share “Wedding” with Priya','She accepts from her own app',`<span class="so-join on">${ic('check',12)} Yes</span>`)}`));
LV.stsee=()=>lvOne(whCard(`<b style="display:block;font-size:15px">Priya sees</b>${[['Your part · $2,100',1],['Only the total',0]].map(([t,on])=>`<div class="so-row" style="padding:10px 0"><b style="font-size:14px;flex:1">${t}</b><span class="cl-radio ${on?'on':''}"></span></div>`).join('')}`));
LV.ststk=()=>lvOne(whCard(`${whRow(soAv('priya',36),'Priya added $800 to Wedding','Thursday · 4:12 PM',`<span class="rt-stk pop" style="animation-delay:.7s">💚</span>`)}`));
LV.stfive=()=>lvOne(whCard(`<div class="sgx-ch" style="margin-bottom:10px"><div><b>Lisbon · 5 of us</b><em>Each from their own account</em></div></div><div class="ft-stack">${['#2f7a12','#7a5af5','#e8a45c','#2a9d8f','#3a6ea5'].map((c,i)=>`<i style="width:${[14,11,9,8,6][i]}%;background:${c}"></i>`).join('')}</div><div style="display:flex;gap:4px;margin-top:12px">${['me','priya','sam','mom','leo'].map(id=>soAv(id,28)).join('')}</div><div class="so-chip" style="margin-top:10px">${ic('lock',12)} Anyone can leave, with their own money</div>`));
/* Grove + Canopy */
LV.grnobody=()=>lvOne(whCard(`<div class="rt-q" style="font-size:19px">Who would notice if you stopped?</div><div class="so-row" style="margin-top:10px;padding:8px 0"><span class="so-ai" style="background:#f3f6f0;color:#9aa69c">${ic('user',16)}</span><div class="grow"><b style="font-size:14px">Nobody</b><em style="font-size:12px">The honest answer</em></div><span class="cl-radio on"></span></div>`));
LV.grhandle=()=>lvOne(whCard(`${whRow(`<span class="fo-anon">${['#2f7a12','#7a5af5','#e8a45c','#2a9d8f'].map(c=>`<i style="background:${c}"></i>`).join('')}</span>`,'First job · 20 to 25 · Emergency fund','3,100 people · you’re @quiet_otter')}<div class="so-join on" style="margin-top:12px;display:inline-flex">${ic('check',12)} Shared · 38%, 5 weeks</div>`));
LV.grspread=()=>lvOne(whCard(`<div class="rt-spread" style="margin:0"><em>Where the room is</em><div class="rt-hist">${[6,11,18,22,17,11,8,4,2,1].map((v,i)=>`<i style="height:${v*3.4}px" class="${i>=1&&i<=4?'hi':''}"></i>`).join('')}</div><div class="rt-hl"><span>0%</span><span>Most are between 10% and 40%</span><span>100%</span></div><small>Never where you are in it.</small></div>`));
LV.grask=()=>lvOne(whCard(`<em class="fo-by">@quiet_otter · 23</em><b style="display:block;font-size:16px;line-height:1.3;margin-top:4px">Is $10 a week even worth the $4 fee?</b><div class="fo-ans rise d3"><span class="fo-anonav"></span><div><em>@tasha_holds · six years in</em><p>Yes, if you’d otherwise do $0. The fee matters less every month you keep going.</p></div></div>`));
LV.grmark=()=>lvOne(whCard(`${whRow(`<span class="so-ai">${ic('spark',16)}</span>`,'Your answer helped 48 people','A mark toward a Canopy shift',`<span class="fo-mark">${ic('spark',10)} 1 of 3</span>`)}`));
LV.cnbench=()=>lvOne(whCard(`<em class="so-lvk" style="text-align:center">Canopy · on duty in the forest</em><div class="wh-people">${[['kim','@tasha_holds','6 years in'],['dee','@dee_since_2018','8 years in']].map(([id,n,y])=>`<span>${soAv(id,44)}<b>${n}</b><em>${y}</em></span>`).join('')}</div><span class="btn sg-cta wh-btn">Ask them</span>`));
LV.cnred=()=>lvOne(`<div class="fo-red rise" style="width:300px;margin:0"><span class="so-chip live" style="background:rgba(229,57,53,.9);color:#fff"><i></i>Red day · −6%</span><b>Canopy moved to the top of Home</b><em>The whole bench is on</em></div>`);
LV.cnmath=()=>lvOne(whCard(`<div class="fo-ans" style="margin:0">${soAv('kim',28)}<div><em>@tasha_holds · 11 min</em><p>“Your drop today is $36. Your next three weeks of $10 cover it. I’d leave it, and I did.”</p></div></div>`));
LV.cnbadge=()=>lvOne(whCard(`<div style="display:flex;align-items:center;gap:12px">${svgSeal({top:'Asked',bottom:'Not sold',glyph:'peak',size:64})}<div><b style="font-size:15px">Asked instead of selling</b><em style="display:block;font-style:normal;font-size:12px;color:#6b706c">Stays on your goal</em></div></div>`));

/* hubs are tabbed, like Oak · Grove: no endless scroll */
const WH_TABS={'rt-home':{key:'rtTab',tabs:[['you','Your goal'],['bloom','Bloom'],['rings','Achievements']],secs:['wit','bloom','rings','acorn'],map:{you:['head','goal','wit'],bloom:['bloom'],rings:['rings','acorn']}},
 'ft-home':{key:'ftTab',tabs:[['seed','Seedling'],['same','Same Tree'],['learn','Learn']],secs:['seed','same','learn'],map:{seed:['seed'],same:['same'],learn:['learn']}}};
Object.keys(WH_TABS).forEach(id=>{const C=WH_TABS[id];const f=SCR[id];if(!f)return;SCR[id]=p=>{const r=f(p);if(p&&p.focus){T[C.key]={seed:'seed',same:'same',learn:'learn',wit:'you',bloom:'bloom',rings:'rings',acorn:'rings',canopy:'canopy',ask:'ask'}[p.focus]||C.tabs[0][0]}const tab=T[C.key]||C.tabs[0][0];
  const open=r.html.indexOf('<div class="sg-body sgx-body">');if(open<0)return r;const bodyStart=open+'<div class="sg-body sgx-body">'.length;const bodyEnd=r.html.lastIndexOf('</div>');let body=r.html.slice(bodyStart,bodyEnd);const tail=r.html.slice(bodyEnd);
  /* the privacy line goes on every tab */
  let priv='';const pm=body.match(/<p class="sgx-priv">[\s\S]*?<\/p>\s*$/);if(pm){priv=pm[0];body=body.slice(0,pm.index)}
  const chunks={};let rest=body;let cur='head';const re=/<div class="so-sec"[^>]*data-sec="([a-z]+)"|<div data-sec="([a-z]+)"><\/div>|<div class="so-card fo-bench" data-sec="([a-z]+)">/g;let m,last=0;const parts=[];while((m=re.exec(body))){parts.push([cur,body.slice(last,m.index)]);cur=m[1]||m[2]||m[3];last=m.index}parts.push([cur,body.slice(last)]);
  parts.forEach(([k,h])=>{chunks[k]=(chunks[k]||'')+h});
  /* the goal card lives in the head chunk for Roots; share it with the Witness tab */
  if(id==='rt-home'){const gm=chunks.head.match(/<div class="rt-goal">[\s\S]*?<\/button><\/div>/);if(gm){chunks.goal=gm[0];chunks.head=chunks.head.replace(gm[0],'')}}
  const seg=`<div class="ssx-seg wh-seg" style="width:300px">${C.tabs.map(([k,l])=>`<button class="${tab===k?'on':''}" onclick="T.${C.key}='${k}';refresh()">${l}</button>`).join('')}</div>`;
  const content=(C.map[tab]||[]).map(k=>chunks[k]||'').join('');
  r.html=r.html.slice(0,open)+seg+'<div class="sg-body sgx-body" style="top:calc(var(--safeTop) + 104px)"><div class="ssx-sec" key="'+tab+'">'+content+priv+'</div>'+tail;
  const m0=r.mount;r.mount=el=>{if(m0)m0(el);if(p&&p.focus)delete p.focus};return r}});
/* the prototype clock, the same yellow pill as the Year: demo moves live here, never in the product UI */
function whClock(list){list=list.filter(Boolean);if(!list.length)return '';return `<div class="yr-clock wh-clock"><span>Prototype</span>${list.map(([l,js])=>`<button onclick="${js}">${ic('ff',12)} ${l}</button>`).join('')}</div>`}
const WH_DEMOS={'rt-home':()=>{const r=rtSt();const t=T.rtTab||'you';return [t==='you'&&['It’s Friday','rtFriday()'],t==='bloom'&&(rtSt().season.done?['Reset the Bloom','rtSt().season.done=false;rtSt().season.bar=212480;rtSt().season.mine=0;save();refresh()']:['Jump to Nov 30','rtFinishSeason()']),t==='rings'&&!r.acorns.have&&['New milestone','rtSt().acorns.have=1;save();refresh();toast(\'Milestone. You’ve got an acorn.\')']]},
 'ft-home':()=>{const f=ftSt();const t=T.ftTab||'seed';return [t==='seed'&&!f.reached&&['Ava reaches the goal','ftReach()'],t==='same'&&['Priya’s bonus lands','ftTheirs()']]},
 'fo-grove':()=>{const f=foSt();return [!f.red&&['Market drops 6%','foRed()'],f.red&&['Market recovers','foSt().red=false;save();refresh()']]}};
Object.keys(WH_DEMOS).forEach(id=>{const f=SCR[id];if(!f)return;SCR[id]=p=>{const r=f(p);r.html+=whClock(WH_DEMOS[id]());return r}});
document.head.insertAdjacentHTML('beforeend',`<style>.wh-clock{bottom:calc(var(--safeBot) + 74px)!important;z-index:6}.scr:has(.wh-clock) .sg-body{padding-bottom:84px!important}.wh-clock button{margin-left:6px}.wh-clock button:first-of-type{margin-left:auto}.wh-seg button{font-size:13px}.ssx-sec>.so-sec:first-child{margin-top:4px}.ssx-sec>.rt-fc{margin-top:4px}</style>`);
if(typeof RV_GO!=='undefined')RV_GO.push(['Roots','Witness, Bloom, Rings, Drop an Acorn, Friday Count',"go('splash',{k:'roots'})"],['Family Tree','Seedling, Same Tree, Learn Together',"go('splash',{k:'family'})"],['The Forest','The Grove, with Canopy inside',"go('splash',{k:'forest'})"]);
if(typeof FORYOU!=='undefined')FORYOU.push(['roots','Roots','One person who sees you show up.','oak'],['family','Family Tree','The relationships Acorns already holds.','oak'],['forest','The Forest','For when nobody comes to mind.','oak']);
document.head.insertAdjacentHTML('beforeend',`<style>
.so-lvc{width:300px;padding:14px 16px;border-radius:20px;background:rgba(255,255,255,.96);color:#191919;box-shadow:0 20px 44px rgba(0,0,0,.4)}
.so-lvk{display:block;font-style:normal;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#5d655f}
.so-lvhost{display:flex;flex-direction:column;align-items:center;text-align:center;color:#fff}.so-lvhost b{display:block;font-size:18px;margin-top:16px}.so-lvhost em{font-style:normal;font-size:12px;color:rgba(255,255,255,.65)}.so-lvhost p{margin:14px 0 0;max-width:280px;font-size:15px;line-height:1.45;color:rgba(255,255,255,.9)}
.scr.ldr .rt-sms p,.scr.ldr .so-lvc p,.scr.ldr .rt-note p,.scr.ldr .fo-ans p{color:#191919}.scr.ldr .rt-sms em{color:#6b706c}
.scr.ldr .rt-ring,.scr.ldr .rt-ring b,.scr.ldr .rt-ring p{color:#163d0c}.scr.ldr .rt-ring .rt-rm span{color:#3d453f}
.so-lvc{padding:18px}.so-lvc>b:first-child,.so-lvc>.rt-q{font-size:18px;line-height:1.2;letter-spacing:-.2px}.so-lvc .so-row{padding:10px 0}.so-lvc .so-row b{font-size:15px}.so-lvc .so-row em{font-size:12px;margin-top:1px}
.wh-people{display:flex;justify-content:center;gap:36px;margin:16px 0 18px}.wh-people span{display:flex;flex-direction:column;align-items:center;gap:6px}.wh-people b{font-size:13px}.wh-people em{font-style:normal;font-size:12px;color:#6b706c;margin-top:-2px}
.wh-btn{display:flex;align-items:center;justify-content:center;height:46px;font-size:15px}
.wh-one{display:flex;flex-direction:column;align-items:center;gap:12px;max-height:100%;transform:scale(1.12)}.scr.ldr .rt-goal b,.scr.ldr .rt-goal span{color:#191919}.scr.ldr .rt-goal span{color:#6b706c}.wh-one.tight{gap:0}
.wh-under{display:inline-flex;align-items:center;gap:6px;height:28px;padding:0 12px;border-radius:14px;background:rgba(255,255,255,.12);color:rgba(255,255,255,.75);font-size:12px;font-weight:600}
.scr.ldr .ld-art .lv-mid{justify-content:center}
</style>`);

/* ---------- two groves: yours (people you know, trees, rain, challenges) and the Grove (everyone with your goal, no names) ---------- */
tabbarDk=function(on){if(on==='gt-ch')return '';const t=[['gt-home','Oak'],['gt-grove','Grove'],['fo-grove','Forest']];const cur0=on==='gt-oak'?'gt-home':on;
  return `<div class="sk-pill three" role="tablist" aria-label="Grow Together">${t.map(([id,l])=>`<button class="${cur0===id?'on':''}" role="tab" aria-selected="${cur0===id}" onclick="home('${id}')">${l}</button>`).join('')}</div>`};
(function(){const f=SCR['fo-grove'];SCR['fo-grove']=p=>{const r=f(p);r.cls=(r.cls||'')+' fog';r.html=r.html.replace('<div class="sg-top">','<div class="sg-top fog-top">')+tabbarDk('fo-grove');return r}})();
document.head.insertAdjacentHTML('beforeend',`<style>
.sk-pill.three{width:300px}
.fog .sk-pill{position:absolute;left:50%;transform:translateX(-50%);top:calc(var(--safeTop) + 6px);margin:0;z-index:9;background:#e9ede4;border:0}.fog .sk-pill button{color:#5d655f}.fog .sk-pill button.on{background:#fff;color:#191919;box-shadow:0 2px 8px rgba(0,0,0,.08)}
.fog .wh-seg{top:calc(var(--safeTop) + 56px)}.fog .sg-body{top:calc(var(--safeTop) + 106px)!important}
</style>`);

/* ---------- one mechanic, two sizes: the Bloom is the challenge everyone is in this month; grove challenges are the ones you start with your people. A dare is a grove challenge pinned to the Bloom. ---------- */
function blCard(){const s=rtSt().season;const pc=Math.min(100,Math.round(s.bar/s.target*100));const dared=Object.keys(s.dared||{});
 return `<button class="bl-card" onclick="T.rtTab='bloom';go('rt-home',{focus:'bloom'})"><div class="bl-k">This month · everyone</div><div class="row between"><div><b>No-Spend November</b><em>${s.people.toLocaleString()} of us · one target · ${s.done?'finished':'day 12'}</em></div>${s.joined?`<span class="so-chip">${ic('check',12)} In</span>`:`<span class="so-join">Join</span>`}</div><div class="rt-bar" style="margin-top:14px"><i style="width:${pc}%"></i></div>${dared.length?`<div class="bl-dare">${soAvs(dared,20)}<span>Dared ${dared.map(id=>soN(id)).join(' and ')} · counts only if you all finish</span></div>`:`<div class="bl-dare muted">${ic('user',12)} Dare your people in from the Bloom tab</div>`}</button>`}

(function(){const f=SCR['gt-ch-new'];SCR['gt-ch-new']=p=>{const r=f(p);r.html=r.html.replace('<div class="mt16">','<div class="mt16"><div class="choice" onclick="T.rtTab=\'bloom\';go(\'rt-home\',{focus:\'bloom\'})"><div class="lockic" style="width:44px;height:44px;border-radius:14px;background:#163d0c;color:#bceaa3">'+sgGlyph('star',22,'#bceaa3')+'</div><div class="grow"><div class="ttl">This month’s Bloom, with your people</div><div class="sub">No-Spend November. Dare them in; it counts only if you all finish.</div></div>'+ic('chev',18,'opacity:.35')+'</div><div class="eyebrow mt16" style="margin-bottom:4px">Or start your own</div>');return r}})();
/* a dare from the Bloom also shows up as a grove challenge */
(function(){const f=rtDare;rtDare=function(id){f(id);if(!S.challenges.some(c=>c.id==='c-bloom')){S.challenges.unshift({id:'c-bloom',type:'skip',title:'No-Spend November · dare',len:7,unit:'days',people:['me',id],prog:{me:rtSt().season.mine||0,[id]:1},bloom:1});save()}}})();
document.head.insertAdjacentHTML('beforeend',`<style>
.bl-card{display:block;width:100%;margin-top:12px;padding:16px;border-radius:22px;background:linear-gradient(160deg,#163d0c,#0a1d08);color:#fff;text-align:left}.bl-k{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#bceaa3;margin-bottom:8px}.bl-card b{display:block;font-size:17px}.bl-card em{display:block;font-style:normal;font-size:12px;color:rgba(255,255,255,.7);margin-top:2px}.bl-card .rt-bar{background:rgba(255,255,255,.12)}.bl-card .so-chip{background:rgba(255,255,255,.14);color:#fff}
.bl-dare{display:flex;align-items:center;gap:8px;margin-top:12px;font-size:12px;color:#bceaa3;font-weight:600}.bl-dare.muted{color:rgba(255,255,255,.55)}
</style>`);
