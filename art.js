/* Original SVG art for the prototype. Swap in production assets later. */
(function(){
const C={trunk:'#785e46',trunkHi:'#9f8160',bark:'#b7895f',leafDk:'#38860e',leaf:'#529f46',leafHi:'#74c947',leafLt:'#bceaa3',soil:'#bceaa3',soilDk:'#3a563e',gold:'#dca613',goldDk:'#a0720b',sky:'#4da1ef',dusk:'#f0a763',sun:'#f5a623',beige:'#f2e3b8',plum:'#5f253d'};

function circles(list,dim){
  let s='';
  list.forEach(([x,y,r])=>{s+=`<circle cx="${x}" cy="${y+5}" r="${r}" fill="${C.leafDk}"/>`});
  list.forEach(([x,y,r])=>{s+=`<circle cx="${x}" cy="${y}" r="${r}" fill="${C.leaf}"/>`});
  list.forEach(([x,y,r])=>{s+=`<circle cx="${x-r*.22}" cy="${y-r*.25}" r="${r*.62}" fill="${C.leafHi}"/>`});
  return s;
}
const STAGES=[
  {name:'Acorn'},{name:'Sprout'},{name:'Sapling'},{name:'Young oak'},{name:'Oak'},{name:'Ancient oak'}
];
const ANCH={
  2:{top:[100,92],nest:[86,122],acorns:[[88,116],[112,114],[100,100]],gold:[[84,108],[116,110],[100,96],[108,124]],bird:[100,90]},
  3:{top:[100,40],nest:[72,104],acorns:[[80,96],[120,92],[100,70],[136,108]],gold:[[70,88],[128,80],[104,52],[86,66],[140,104]],bird:[104,36]},
  4:{top:[100,24],nest:[62,104],acorns:[[70,86],[128,78],[100,58],[146,104],[88,108]],gold:[[56,80],[140,70],[100,36],[80,52],[156,100],[120,104]],bird:[112,22]},
  5:{top:[100,14],nest:[52,100],acorns:[[60,80],[138,74],[100,50],[160,98],[84,104],[118,100]],gold:[[44,78],[152,64],[96,26],[72,44],[170,94],[126,40],[110,96]],bird:[118,12]}
};
function acornShape(x,y,s){ // s=scale, centered
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="4" rx="6" ry="7.5" fill="${C.bark}"/><ellipse cx="-2" cy="2" rx="2" ry="3.2" fill="#d6ad83"/><path d="M-7.5,-1 Q0,-9 7.5,-1 Q0,2 -7.5,-1Z" fill="${C.trunk}"/><rect x="-.9" y="-9" width="1.8" height="4" rx=".9" fill="${C.trunk}"/></g>`;
}
function oak(stage,fl,opt){
  fl=fl||[];opt=opt||{};const dark=opt.dark;const has=k=>fl.indexOf(k)>-1;
  let g='';
  // ground
  if(opt.ground!==false) g+=`<ellipse cx="100" cy="200" rx="${stage>=4?84:66}" ry="11" fill="${dark?C.soilDk:C.soil}"/>`;
  if(has('tree')) g+=`<g transform="translate(18,92) scale(.42)" opacity=".95">${oakInner(3,false)}</g>`;
  if(has('roots')) g+=`<g stroke="${C.trunk}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".9"><path d="M100,198 C88,206 72,206 58,212"/><path d="M100,198 C112,207 128,206 144,212"/><path d="M100,199 C98,208 94,212 90,218"/><path d="M100,199 C104,208 110,212 116,217"/></g>`;
  g+=oakInner(stage,true);
  const a=ANCH[stage];
  if(a){
    if(has('gold')) a.gold.forEach(([x,y],i)=>{g+=`<ellipse cx="${x}" cy="${y}" rx="5.5" ry="3.2" transform="rotate(${i*37-30} ${x} ${y})" fill="${C.gold}" stroke="${C.goldDk}" stroke-width=".8"/>`});
    if(has('acorns')) a.acorns.forEach(([x,y])=>{g+=acornShape(x,y,.75)});
    if(has('nest')){const [x,y]=a.nest;g+=`<g transform="translate(${x},${y})"><ellipse cx="0" cy="-3" rx="4" ry="3.6" fill="#cfe6f7"/><ellipse cx="6" cy="-3.5" rx="3.6" ry="3.3" fill="#e8f3fb"/><ellipse cx="-6" cy="-2.5" rx="3.4" ry="3.1" fill="#d8ecf8"/><path d="M-13,-2 Q0,12 13,-2 Z" fill="${C.trunkHi}"/><path d="M-13,-2 Q0,6 13,-2" stroke="${C.trunk}" stroke-width="1.4" fill="none"/></g>`}
    if(has('bird')){const [x,y]=a.bird;g+=`<g transform="translate(${x},${y})"><ellipse cx="0" cy="0" rx="8" ry="6" fill="${C.sky}"/><circle cx="7" cy="-4" r="4.4" fill="${C.sky}"/><circle cx="8.4" cy="-5" r="1" fill="#10202c"/><path d="M11,-4 l4,1 -4,1.2z" fill="${C.sun}"/><path d="M-4,-1 Q-1,-8 4,-2 Z" fill="#2f7fc8"/><path d="M-8,0 l-6,-3 1,5z" fill="#2f7fc8"/></g>`}
  }
  if(has('water')){g+=`<g fill="${C.sky}" opacity=".9"><path d="M40,70 q4,7 0,10 q-4,-3 0,-10z"/><path d="M160,56 q4,7 0,10 q-4,-3 0,-10z"/><path d="M150,130 q3.4,6 0,8.5 q-3.4,-2.5 0,-8.5z"/></g>`}
  if(has('sapling')) g+=`<g transform="translate(160,196)"><path d="M0,0 C0,-8 1,-14 0,-20" stroke="${C.leafDk}" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M0,-14 C-8,-18 -11,-12 -10,-9 C-6,-9 -2,-10 0,-14Z" fill="${C.leafHi}"/><path d="M0,-19 C7,-25 11,-19 10,-16 C6,-15 2,-16 0,-19Z" fill="${C.leaf}"/></g>`;
  if(has('flowers')){const cols=['#f0a763','#f5a623','#ffffff','#b9a6ff','#f39bb6'];[54,70,128,142,150].forEach((x,i)=>{const h=10+(i%3)*4;g+=`<path d="M${x},199 L${x},${199-h}" stroke="${C.leafDk}" stroke-width="1.6"/><g transform="translate(${x},${199-h})">${[0,72,144,216,288].map(r=>`<ellipse cx="0" cy="-3" rx="2" ry="3" transform="rotate(${r})" fill="${cols[i]}"/>`).join('')}<circle r="1.6" fill="${i==2?C.sun:'#fff7d6'}"/></g>`})}
  const w=opt.w||200,h=opt.h||224;
  return `<svg viewBox="0 0 200 224" width="${w}" height="${h}" style="overflow:visible;${opt.dim?'filter:saturate(.25) brightness(1.05);opacity:.55':''}" aria-hidden="true">${g}</svg>`;
}
function oakInner(stage){
  if(stage===0) return `<g class="float">${acornShape(100,180,2.4)}</g>`;
  if(stage===1) return `<g class="sway"><path d="M100,198 C100,186 101,176 100,162" stroke="${C.leafDk}" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M100,176 C86,168 78,176 80,182 C88,184 96,182 100,176Z" fill="${C.leafHi}"/><path d="M100,166 C112,154 124,160 122,168 C114,172 106,171 100,166Z" fill="${C.leaf}"/>${acornShape(92,196,1.1)}</g>`;
  if(stage===2) return `<g class="sway"><path d="M97,198 L98,124 L102,124 L103,198Z" fill="${C.trunk}"/><path d="M100,150 L86,128" stroke="${C.trunk}" stroke-width="3"/><path d="M100,140 L116,124" stroke="${C.trunk}" stroke-width="3"/>${circles([[100,108,20],[84,124,15],[116,122,16]])}</g>`;
  if(stage===3) return `<g class="sway"><path d="M92,198 C95,170 96,130 97,100 L103,100 C104,130 105,170 108,198Z" fill="${C.trunk}"/><path d="M99,140 C90,130 80,124 72,112" stroke="${C.trunk}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M101,130 C112,120 122,112 128,100" stroke="${C.trunk}" stroke-width="5" fill="none" stroke-linecap="round"/>${circles([[100,72,34],[70,100,26],[132,96,28],[100,104,26],[84,62,20],[118,58,20]])}</g>`;
  if(stage===4) return `<g class="sway"><path d="M88,198 C92,170 94,130 95,96 L105,96 C106,130 108,170 112,198Z" fill="${C.trunk}"/><path d="M98,150 C86,136 70,126 56,112" stroke="${C.trunk}" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M102,136 C116,124 132,114 146,100" stroke="${C.trunk}" stroke-width="7" fill="none" stroke-linecap="round"/>${circles([[100,58,40],[62,90,30],[140,84,32],[100,100,30],[78,48,24],[124,42,24],[160,104,20],[44,108,18]])}</g>`;
  return `<g class="sway"><path d="M82,198 C88,168 90,128 92,92 L108,92 C110,128 112,168 118,198Z" fill="${C.trunk}"/><path d="M88,198 C78,200 70,202 62,206" stroke="${C.trunk}" stroke-width="6" stroke-linecap="round"/><path d="M112,198 C122,200 130,202 138,206" stroke="${C.trunk}" stroke-width="6" stroke-linecap="round"/><path d="M97,150 C80,134 60,124 40,110" stroke="${C.trunk}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M103,136 C120,122 142,110 162,96" stroke="${C.trunk}" stroke-width="9" fill="none" stroke-linecap="round"/>${circles([[100,48,44],[56,84,34],[146,76,36],[100,96,34],[70,40,26],[130,32,26],[172,100,24],[30,104,22],[100,16,22]])}</g>`;
}

function squirrel(opt){
  opt=opt||{};const hold=opt.hold||'acorn';const flip=opt.flip;const w=opt.w||120;
  let paws='';
  if(hold==='acorn') paws=`${acornShape(90,80,1.25)}<ellipse cx="84" cy="80" rx="4.5" ry="3.5" fill="${C.bark}"/><ellipse cx="94" cy="83" rx="4.5" ry="3.5" fill="${C.bark}"/>`;
  else if(hold==='flowers') paws=`<g transform="translate(92,74)"><path d="M0,10 L-6,-16 M0,10 L2,-20 M0,10 L9,-14" stroke="${C.leafDk}" stroke-width="2"/>${[[-6,-16,'#f39bb6'],[2,-20,'#f5a623'],[9,-14,'#b9a6ff'],[-2,-10,'#ffffff']].map(([x,y,c])=>`<g transform="translate(${x},${y})">${[0,72,144,216,288].map(r=>`<ellipse cx="0" cy="-3.4" rx="2.4" ry="3.4" transform="rotate(${r})" fill="${c}"/>`).join('')}<circle r="2" fill="#fff2b8"/></g>`).join('')}</g><ellipse cx="88" cy="84" rx="4.5" ry="3.5" fill="${C.bark}"/><ellipse cx="96" cy="84" rx="4.5" ry="3.5" fill="${C.bark}"/>`;
  else if(hold==='wave') paws=`<path d="M82,80 C90,72 96,60 98,50" stroke="${C.bark}" stroke-width="8" stroke-linecap="round" fill="none"/><ellipse cx="80" cy="86" rx="4.5" ry="3.5" fill="${C.bark}"/>`;
  else if(hold==='heart') paws=`<path d="M92,88 C80,78 84,68 92,74 C100,68 104,78 92,88Z" fill="#f39bb6"/><ellipse cx="84" cy="82" rx="4.5" ry="3.5" fill="${C.bark}"/><ellipse cx="100" cy="82" rx="4.5" ry="3.5" fill="${C.bark}"/>`;
  else if(hold==='can') paws=`<g transform="translate(86,70)"><rect x="0" y="0" width="18" height="14" rx="3" fill="${C.sky}"/><path d="M18,3 L28,-4" stroke="${C.sky}" stroke-width="3.5" stroke-linecap="round"/><path d="M3,0 Q9,-8 15,0" stroke="#2f7fc8" stroke-width="2" fill="none"/></g><ellipse cx="84" cy="82" rx="4.5" ry="3.5" fill="${C.bark}"/>`;
  const body=`
  <path d="M46,104 C14,102 4,66 18,42 C28,24 52,16 62,30 C50,32 42,44 46,60 C50,76 62,84 58,102Z" fill="#d6ad83"/>
  <path d="M46,100 C22,96 14,70 24,50 C30,38 44,30 54,34" stroke="${C.bark}" stroke-width="3" fill="none" opacity=".5" stroke-linecap="round"/>
  <ellipse cx="68" cy="86" rx="21" ry="24" fill="${C.bark}"/>
  <ellipse cx="74" cy="90" rx="11" ry="15" fill="${C.beige}"/>
  <ellipse cx="60" cy="108" rx="9" ry="4.5" fill="${C.trunk}"/><ellipse cx="80" cy="109" rx="9" ry="4.5" fill="${C.trunk}"/>
  <path d="M68,40 L64,24 L78,34Z" fill="${C.bark}"/><path d="M68,38 L66,29 L74,35Z" fill="#e7b9a0"/>
  <circle cx="76" cy="52" r="17" fill="${C.bark}"/>
  <ellipse cx="90" cy="57" rx="8" ry="6.5" fill="${C.beige}"/>
  <circle cx="96.5" cy="55" r="2.4" fill="#3a2a1d"/>
  <circle cx="82" cy="48" r="3" fill="#1d1410"/><circle cx="83" cy="47" r="1" fill="#fff"/>
  <circle cx="85" cy="60" r="3.2" fill="${C.dusk}" opacity=".55"/>
  <path d="M88,62 q3,2 6,0" stroke="#3a2a1d" stroke-width="1.2" fill="none" stroke-linecap="round"/>`;
  return `<svg viewBox="0 0 120 120" width="${w}" height="${w}" style="overflow:visible${flip?';transform:scaleX(-1)':''}" aria-hidden="true">${body}${paws}</svg>`;
}

function hills(opt){ // wide backdrop
  opt=opt||{};const dark=opt.dark;
  const sky=dark?['#171d19','#263027']:['#eaf7e1','#ffffff'];
  return `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice" width="100%" height="100%" style="position:absolute;inset:0" aria-hidden="true">
  <defs><linearGradient id="sk${dark?1:0}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[1]}"/><stop offset="1" stop-color="${sky[0]}"/></linearGradient></defs>
  <rect width="400" height="300" fill="url(#sk${dark?1:0})"/>
  ${dark?[[40,40],[90,22],[160,50],[230,18],[300,44],[360,26],[330,80],[60,90]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.4" fill="#fff" opacity=".5"/>`).join(''):`<circle cx="320" cy="64" r="26" fill="#fbe7a6" opacity=".8"/>`}
  <path d="M0,210 C80,170 160,190 220,200 C290,212 340,180 400,186 L400,300 L0,300Z" fill="${dark?'#2f4434':'#bceaa3'}"/>
  <path d="M0,240 C90,214 170,236 250,230 C320,224 360,236 400,232 L400,300 L0,300Z" fill="${dark?'#3a563e':'#9fdc7e'}"/>
  <path d="M0,270 C100,256 200,266 400,258 L400,300 L0,300Z" fill="${dark?'#486b4d':'#74c947'}"/>
  </svg>`;
}

const ICONS={
  back:'<path d="M15 5l-7 7 7 7" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  close:'<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
  chev:'<path d="M9 5l7 7-7 7" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  share:'<path d="M12 3v12M7 8l5-5 5 5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>',
  plus:'<path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>',
  home:'<path d="M4 11l8-7 8 7v9a1 1 0 01-1 1h-5v-6h-4v6H5a1 1 0 01-1-1z" fill="currentColor"/>',
  grove:'<circle cx="8" cy="9" r="4.5" fill="currentColor"/><circle cx="16.5" cy="8" r="5" fill="currentColor"/><path d="M8 13v8M16.5 13v8" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
  flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  oak:'<path d="M12 21v-7" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><circle cx="12" cy="9" r="6.5" fill="currentColor"/>',
  bell:'<path d="M6 16V11a6 6 0 1112 0v5l2 2H4z" fill="currentColor"/><path d="M10 20a2 2 0 004 0" stroke="currentColor" stroke-width="2" fill="none"/>',
  lock:'<rect x="5" y="11" width="14" height="10" rx="2.5" fill="currentColor"/><path d="M8 11V8a4 4 0 018 0v3" stroke="currentColor" stroke-width="2.2" fill="none"/>',
  search:'<circle cx="11" cy="11" r="6.5" stroke="currentColor" stroke-width="2.2" fill="none"/><path d="M16 16l4 4" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
  link:'<path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>',
  gear:'<circle cx="12" cy="12" r="3.2" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  drop:'<path d="M12 3c4 5 6 8 6 11a6 6 0 01-12 0c0-3 2-6 6-11z" fill="currentColor"/>',
  check:'<path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  menu:'<path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
  card:'<rect x="3" y="6" width="18" height="13" rx="2.5" stroke="currentColor" stroke-width="2" fill="none"/><path d="M3 10h18" stroke="currentColor" stroke-width="2"/>',
  bank:'<path d="M3 9l9-5 9 5M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  cal:'<rect x="4" y="5" width="16" height="15" rx="2.5" stroke="currentColor" stroke-width="2" fill="none"/><path d="M4 10h16M9 3v4M15 3v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  user:'<circle cx="12" cy="8" r="4" fill="currentColor"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7" fill="currentColor"/>',
  spark:'<path d="M12 2l2.2 6.6L21 11l-6.8 2.4L12 20l-2.2-6.6L3 11l6.8-2.4z" fill="currentColor"/>',
  eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="12" cy="12" r="3" fill="currentColor"/>',
  chat:'<path d="M4 5h16v11H9l-5 4z" fill="currentColor"/>',
  cam:'<rect x="3" y="7" width="18" height="13" rx="3" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="12" cy="13.5" r="3.5" stroke="currentColor" stroke-width="2" fill="none"/><path d="M8 7l1.5-3h5L16 7" stroke="currentColor" stroke-width="2" fill="none"/>',
  ff:'<path d="M4 6l8 6-8 6zM12 6l8 6-8 6z" fill="currentColor"/>'
};
function ic(name,size,style){return `<svg width="${size||24}" height="${size||24}" viewBox="0 0 24 24" style="${style||''}" aria-hidden="true">${ICONS[name]||''}</svg>`}

function confetti(el,n){
  const box=document.createElement('div');box.className='confetti';
  const cols=['#74c947','#bceaa3','#f5a623','#dca613','#ffffff','#4da1ef','#f39bb6'];
  for(let i=0;i<(n||70);i++){const p=document.createElement('i');p.style.left=Math.random()*100+'%';p.style.background=cols[i%cols.length];p.style.animationDuration=(1.8+Math.random()*1.8)+'s';p.style.animationDelay=(Math.random()*.6)+'s';p.style.transform=`rotate(${Math.random()*360}deg)`;if(i%3==0){p.style.borderRadius='50%';p.style.width='8px';p.style.height='8px'}box.appendChild(p)}
  el.appendChild(box);setTimeout(()=>box.remove(),4200);
}
function sparkles(el,x,y,n){
  for(let i=0;i<(n||8);i++){const s=document.createElement('div');s.className='sparkle';s.innerHTML=ic('spark',14,'color:#f5a623');s.style.left=(x+(Math.random()-.5)*120)+'px';s.style.top=(y+(Math.random()-.5)*120)+'px';s.style.animationDelay=(i*.08)+'s';el.appendChild(s);setTimeout(()=>s.remove(),1800)}
}
function rain(el,x,y){
  for(let i=0;i<14;i++){const d=document.createElement('div');d.className='drop';d.style.left=(x+(Math.random()-.5)*110)+'px';d.style.top=(y+Math.random()*30)+'px';d.style.animationDelay=(i*.07)+'s';el.appendChild(d);setTimeout(()=>d.remove(),2200)}
}
const AV_COL=['#38860e','#6944ff','#f0a763','#4da1ef','#5f253d','#486b4d','#be752e','#0676dc'];
window.ART={oak,squirrel,hills,ic,confetti,sparkles,rain,acorn:(s)=>`<svg viewBox="-10 -12 20 24" width="${s||20}" height="${(s||20)*1.2}" aria-hidden="true">${acornShape(0,0,1)}</svg>`,STAGES,AV_COL};
})();
