/* Day: every layer below Home is light. Home and Streaks stay dark; the Acorns Year film stays dark because it is a film. */
const DAY_KEEP=new Set(['gt-home','streaks','year','yr-mid','menu','splash','focus-end','sys-load','states','gt-why2','rt-preview','sswhy','alone','rt-year','rt-claim']);
(function(){const f=render;render=function(id,params,dir){const fn=SCR[id];if(fn&&!DAY_KEEP.has(id)&&!fn.__day){const g=fn;const w=p=>{window.__LIGHT=true;let r;try{r=g(p)}finally{window.__LIGHT=false}if(r&&/\bdark\b/.test(r.cls||'')){r.cls=r.cls.replace(/\bdark\b/,'dark day');r.light=false}return r};w.__day=true;SCR[id]=w}return f(id,params,dir)}})();
/* share cards stay night, whatever screen they sit on */
(function(){const f=dkCard;dkCard=function(o){const L=window.__LIGHT;window.__LIGHT=false;try{return f(o)}finally{window.__LIGHT=L}}})();
/* status bar: dark text on day screens */
(function(){const f=render;render=function(id,params,dir){f(id,params,dir);const el=[...document.querySelectorAll('.scr')].pop();if(el&&el.classList.contains('day')){const sb=document.getElementById('sbar');if(sb)sb.classList.remove('light')}}})();
document.head.insertAdjacentHTML('beforeend',`<style>
.scr.day{--sk-bg:#f4f6f1;--sk-card:#fff;--sk-line:#e3e8df;--sk-sub:#6b706c;--sk-text:#191919;--sk-green:#2f7a12;background:#f4f6f1!important;color:#191919}
.scr.day [style*="color:#fff"],.scr.day [style*="color: #fff"],.scr.day [style*="color:#bceaa3"],.scr.day [style*="color:rgba(255,255,255"]{color:#191919!important}
.scr.day .h1,.scr.day .h2,.scr.day .h3,.scr.day .h4,.scr.day b,.scr.day .ttl{color:#191919}
.scr.day .sm,.scr.day .p,.scr.day .sub,.scr.day .lab{color:#6b706c}
.scr.day .eyebrow{color:#2f7a12}
.scr.day .iconbtn{color:#191919}.scr.day .top .iconbtn{color:#191919}
.scr.day .sk-sec .h4{color:#191919}.scr.day .sk-sec .sm{color:#6b706c}
.scr.day .tile,.scr.day .bnt,.scr.day .ostat,.scr.day .jy,.scr.day .tl,.scr.day .nbg,.scr.day .li,.scr.day .card{background:#fff;border-color:#e3e8df;color:#191919;box-shadow:0 1px 2px rgba(20,40,16,.04)}
.scr.day .tl .ttl,.scr.day .tl .ttl.n{color:#191919}.scr.day .tl .lab,.scr.day .tl .meta,.scr.day .tl .meta *{color:#6b706c}
.scr.day .nbg .k{color:#2f7a12}.scr.day .nbg .s{color:#5d655f}.scr.day .nbg .sbtn{color:#3c4a40}.scr.day .nbg .ico{background:#edf8e6}
.scr.day .btn.wh{background:#74c947;color:#0a1d08}.scr.day .btn.ghost{background:#fff;color:#191919;border:1px solid #dfe5da}
.scr.day .seg{background:#e8ece4}.scr.day .seg button{color:#6b706c}.scr.day .seg button.on{background:#fff;color:#191919}
.scr.day .ofl{background:#fff;border-color:#e3e8df;color:#191919}.scr.day .ofl.on{border-color:#74c947;background:linear-gradient(180deg,#edf8e6,#fff)}.scr.day .ofl span{color:#6b706c}.scr.day .ofl.on span{color:#2f7a12}
.scr.day .osbar,.scr.day .osbar2{background:#e3e8df}
.scr.day .achv-r b{color:#191919}.scr.day .achv-r em{color:#6b706c}
/* Your year */
.scr.day .jy{border:1px solid #e3e8df}.scr.day .jy-ring .seal{filter:none}
.scr.day .jl,.scr.day .j-row{background:#fff;border-color:#e3e8df}
/* notifications */
.scr.day .nt,.scr.day .nt-row{background:#fff;border-color:#e3e8df}
/* challenges */
.scr.day .ch,.scr.day .chc,.scr.day .ch-card{background:#fff;border-color:#e3e8df;color:#191919}
.scr.day .chbar{background:#e3e8df}
/* the grove: daylight */
.scr.day.gvs .gv{background:linear-gradient(180deg,#dff0fa 0%,#eaf4f0 22%,#cfe9c0 40%,#9ed37a 100%)}
.scr.day.gvs .gv-sky{background:radial-gradient(130% 100% at 55% 100%,rgba(255,255,255,.7),rgba(255,255,255,.2) 48%,transparent 70%)}
.scr.day.gvs .gv-far{background:linear-gradient(180deg,#a9d98c,#8ccb6e)}
.scr.day.gvs .gv-slope{background:radial-gradient(ellipse 60% 40% at 50% 0%,#bfe89a 0%,#8fd45f 22%,#6cbb45 48%,#55a338 72%,#478c30 100%);box-shadow:inset 0 2px 0 rgba(255,255,255,.35)}
.scr.day.gvs .gv-dock{background:rgba(255,255,255,.92);border:1px solid #e3e8df;box-shadow:0 12px 32px rgba(20,50,16,.14);color:#191919}
.scr.day.gvs .gv-dock b,.scr.day.gvs .gv-dock .ttl{color:#191919}.scr.day.gvs .gv-dock .sm,.scr.day.gvs .gv-dock em{color:#6b706c}
.scr.day.gvs .gw-act{background:#f3f6f0;color:#191919;border-color:#e3e8df}.scr.day.gvs .gw-act.pri{background:#74c947;color:#0a1d08}
.scr.day.gvs .gv-top b,.scr.day.gvs .gv-top .sm,.scr.day.gvs .gv-top .iconbtn,.scr.day.gvs .gv-title,.scr.day.gvs .gv-sub{color:#191919!important;text-shadow:none}
.scr.day.gvs .gw-ch,.scr.day.gvs .gw-row{background:#f3f6f0;border-color:#e3e8df}
/* oak hero: the light hills */
.scr.day .hero-wrap .top .iconbtn{color:#191919}
.scr.day .sk-hero .tree{filter:drop-shadow(0 8px 10px rgba(20,50,16,.22))}
/* grove HUD */
.scr.day.gvs .gv-ht{color:#191919;text-shadow:none}.scr.day.gvs .gv-hs{color:#3d453f}.scr.day.gvs .gv-hb{background:rgba(255,255,255,.7)!important;color:#191919}
.scr.day.gvs .gv-tag{background:#fff;color:#191919}
.scr.day.gvs .gv-note{color:#191919;background:rgba(77,161,239,.14)}.scr.day.gvs .gv-note.ok{background:rgba(116,201,71,.16)}
/* list rows (notifications and the like) */
.scr.day .li .ttl,.scr.day .li b{color:#191919}.scr.day .li .sub,.scr.day .li .sm{color:#6b706c}.scr.day .li{border-color:#e3e8df}
.scr.day .shimmer{background:#e9ede5}
.scr.day .dkc,.scr.day .dkc *{color:#fff}.scr.day .dkc .dkc-txt em{color:rgba(255,255,255,.72)}.scr.day .dkc-dt,.scr.day .dkc-lk{color:rgba(255,255,255,.8)}
.scr.day .sk-row .t{color:#191919}.scr.day .sk-row .s{color:#5d655f}.scr.day .sk-row .ic{background:#edf8e6}
.scr.day .card{background:#fff;border:1px solid #e3e8df}.scr.day .card .h4{color:#191919}.scr.day .badge{background:#e3f4d8;color:#2f7a12}
.scr.day .ttl{color:#2f7a12}
.scr.day .amt{color:#191919}.scr.day .big{color:#2f7a12}
.scr.day .chip{background:#fff;color:#191919;border:1px solid #dfe5da}.scr.day .chip.on{background:#74c947;color:#0a1d08;border-color:#74c947}
.scr.day .inp,.scr.day textarea,.scr.day input{background:#fff;color:#191919;border-color:#dfe5da}
.scr.day .kv,.scr.day .kv b{color:#191919}.scr.day .kv span{color:#6b706c}
.scr.day .sheet{background:#fff;color:#191919}
</style>`);
