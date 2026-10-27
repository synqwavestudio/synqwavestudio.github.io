(function(){
"use strict";
var d=document,root=d.documentElement;
root.classList.add("js");
var RM=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
var C=window.SYNQWAVE_CONTENT||{};
var WA="919209339989",EMAIL="synqwave.business@gmail.com";
function el(tag,cls,txt){var e=d.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}
var WA_PRE="\uD83C\uDF10 From synqwave.co website \u2014 ";
function waLink(t){return "https://wa.me/"+WA+"?text="+encodeURIComponent(WA_PRE+t);}


/* ---------- media that fails to load is fetched again ----------
   On a weak or switching connection (mobile data <-> Wi-Fi) the browser can drop every request in flight; an image
   that failed then shows a broken icon for good. Here a failed image is hidden (its placeholder shows) and fetched
   again up to 4 times (1.5/4/9/20 s apart, at once when the connection comes back). */
function mBust(u,n){u=String(u).replace(/[?&]r=\d+$/,"");return u+(u.indexOf("?")<0?"?":"&")+"r="+n;}
function imgRetry(im){
  var n=im._rt||0,u=im._rtSrc||im.currentSrc||im.getAttribute("src");
  if(!u||/^data:|\.svg(\?|$)/.test(u))return;
  im._rtSrc=u;im.classList.add("rt");
  if(n>=4)return;im._rt=n+1;
  clearTimeout(im._rtT);
  im._rtT=setTimeout(function(){im.removeAttribute("srcset");im.removeAttribute("sizes");im.loading="eager";im.src=mBust(u,n+1);},navigator.onLine===false?600000:[1500,4000,9000,20000][n]);
}
d.addEventListener("error",function(e){var t=e.target;if(t&&t.tagName==="IMG")imgRetry(t);},true);
d.addEventListener("load",function(e){var t=e.target;if(t&&t.tagName==="IMG"&&t._rtSrc){t.classList.remove("rt");t._rtSrc=null;}},true);
function imgScan(){[].forEach.call(d.images,function(im){if(im.complete&&im.getAttribute("src")&&!im.naturalWidth)imgRetry(im);});}
imgScan();
addEventListener("online",function(){[].forEach.call(d.images,function(im){if(im._rtSrc&&im._rt<4){clearTimeout(im._rtT);im.removeAttribute("srcset");im.src=mBust(im._rtSrc,++im._rt);}});
  svVids.forEach(function(v){if(v.error&&v._src){v.src=mBust(v._src,9);v.load();svPlay(v);}});});
/* posters: if a poster failed, fetch it again */
function posterCheck(v){var u=v.getAttribute("poster");if(!u)return;var k=0;
  (function tryP(src){var p=new Image();p.onload=function(){if(src!==u)v.setAttribute("poster",src);};
    p.onerror=function(){if(k<4){k++;setTimeout(function(){tryP(mBust(u,k));},[1500,4000,9000,20000][k-1]);}};p.src=src;})(u);}

/* ---------- content drop-ins (content.js) ---------- */
/* founder photo */
if(C.founderPhoto&&!d.querySelector(".founder-photo")){var ff=d.getElementById("founder-frame");if(ff){ff.innerHTML="";var fi=el("img","founder-photo");fi.src=C.founderPhoto;fi.alt="Talmeez Ahmad, founder of SYNQWAVE";fi.loading="lazy";fi.decoding="async";ff.appendChild(fi);ff.classList.add("has-photo");}}
/* service videos: 4 tiles, lazy. Source by width: <900px the light phone file (srcM, 810px), >=900px the desktop file (src, 1080px).
   Tiles are at most ~300 CSS px wide on desktop and ~78vw on phones, so these sizes stay sharp; no 4K download.
   No src at page load (poster only, preload=none); src is set near the viewport after window load (see "service videos: lazy load" below). */
var SV=(C.serviceVideos||[]).filter(function(v){return v&&v.src;});
var svRow=d.getElementById("svc-row");
var svVids=[];
var cn=navigator.connection||{};
var svLite=!!(cn.saveData||/(^|-)2g$/.test(cn.effectiveType||""));
var vw=window.innerWidth||root.clientWidth;
var svMob=vw<900;
/* perf (v4r): the desktop grid tile is ~300 CSS px, so the 810px file is already sharper than the screen shows (even on 2x retina);
   decode 4x 810px instead of 4x 1080px (about 45% fewer pixels to decode every frame), same picture */
var svFr=svRow&&svRow.querySelector(".svc-frame"),svTileW=svFr?svFr.getBoundingClientRect().width:0;
var svSmall=svMob||svLite||(svTileW>0&&svTileW*(window.devicePixelRatio||1)<=820);
if(svRow&&svRow.querySelector("video")){
  /* tiles are written in index.html (poster shows without JS); pick the file by width; Data Saver / 2G: the light file everywhere */
  [].forEach.call(svRow.querySelectorAll("video"),function(v){
    v._src=svSmall?(v.getAttribute("data-src-m")||v.getAttribute("data-src")):v.getAttribute("data-src");
    svVids.push(v);
  });
  svRow.hidden=false;
}else if(SV.length&&svRow){
  SV.forEach(function(s,i){
    var f=el("figure","svc rv"),fr=el("div","svc-frame"),v=d.createElement("video");
    v.muted=true;v.defaultMuted=true;v.loop=true;v.playsInline=true;v.preload="none";
    ["muted","loop","playsinline"].forEach(function(a){v.setAttribute(a,"");});
    v.setAttribute("preload","none");v.setAttribute("aria-hidden","true");v.width=1080;v.height=1080;
    if(s.poster)v.poster=s.poster;
    v._src=svSmall?(s.srcM||s.src):s.src;
    fr.appendChild(v);f.appendChild(fr);f.appendChild(el("figcaption",null,s.label||""));svRow.appendChild(f);
    svVids.push(v);
  });
  svRow.hidden=false;
}

/* case studies: card grid + case study dialog */
var CS=(C.caseStudies||[]).filter(function(c){return c&&c.client;});
var csOpen=null;
var box=d.getElementById("cases");
var staticCards=box?[].slice.call(box.querySelectorAll(".case")):[];
if(CS.length&&box){
  if(!staticCards.length)CS.forEach(function(c,n){
    var imgs=(c.images||[]).filter(function(i){return i&&i.src;});
    var a=el("article","case panel rv");
    if(imgs.length){var cv=el("div","case-cover");var im=el("img");im.src=imgs[0].src;im.alt=imgs[0].alt||(c.client+" project by SYNQWAVE");im.width=1200;im.height=800;im.loading="lazy";im.decoding="async";cv.appendChild(im);a.appendChild(cv);}
    var b=el("div","case-body");
    if(c.tag)b.appendChild(el("span","tag tag-c",c.tag));
    b.appendChild(el("h3",null,c.client));
    if(c.industry)b.appendChild(el("p","case-ind",c.industry));
    var btn=el("button","case-open");btn.type="button";btn.setAttribute("aria-haspopup","dialog");btn.setAttribute("aria-label",((c.problem||c.whatWeDid||c.outcome||c.result)?"View case study: ":"View project: ")+c.client);
    btn.appendChild(el("span",null,(c.problem||c.whatWeDid||c.outcome||c.result)?"View case study":"View project"));var ar=el("span","case-ar","\u2192");ar.setAttribute("aria-hidden","true");btn.appendChild(ar);
    btn.addEventListener("click",function(){openCase(n,btn);});
    b.appendChild(btn);a.appendChild(b);box.appendChild(a);
  });
  /* cards written in index.html (images load without JS): wire their buttons to the case study viewer */
  staticCards.forEach(function(a,n){var btn=a.querySelector(".case-open");if(btn&&CS[n])btn.addEventListener("click",function(){openCase(n,btn);});});
  box.hidden=false;var we=d.getElementById("work-empty");if(we)we.remove();
  var wi=d.getElementById("work-intro");if(wi&&CS.some(function(c){return /concept/i.test(c.tag||"");}))wi.hidden=false;

  var dlg=d.getElementById("cs"),dsc=dlg&&dlg.querySelector(".cs-scroll"),lastBtn=null,pushed=false;
  function openCase(n,from){
    if(!dlg)return;var c=CS[n];lastBtn=from||null;
    var hd=dlg.querySelector(".cs-head");hd.innerHTML="";
    if(c.logo&&c.logo.src){var lg=el("img","cs-logo");lg.src=c.logo.src;lg.alt=c.logo.alt||(c.client+" logo");lg.width=600;lg.height=600;hd.appendChild(lg);}
    var ht=el("div","cs-ht");
    if(c.tag)ht.appendChild(el("span","tag tag-c",c.tag));
    var h=el("h3",null,c.client);h.id="cs-title";ht.appendChild(h);
    if(c.industry)ht.appendChild(el("p","case-ind",c.industry));
    hd.appendChild(ht);
    var g=dlg.querySelector(".cs-imgs");g.innerHTML="";
    (c.images||[]).filter(function(i){return i&&i.src;}).forEach(function(i){var im=el("img",(i.w&&i.h)?"nat":null);im.src=i.src;im.alt=i.alt||(c.client+" project by SYNQWAVE");im.width=i.w||1200;im.height=i.h||800;im.decoding="async";g.appendChild(im);});
    var dl=dlg.querySelector(".cs-dl");dl.innerHTML="";
    [["Problem",c.problem],["What we did",c.whatWeDid],[c.result?"Result":"Outcome",c.result||c.outcome]].forEach(function(p){if(!p[1])return;var w=el("div");w.appendChild(el("dt",null,p[0]));w.appendChild(el("dd",null,p[1]));dl.appendChild(w);});
    csOpen=n;
    if(!dlg.open){if(dlg.showModal)dlg.showModal();else dlg.setAttribute("open","");d.body.classList.add("lock");
      try{history.pushState({cs:1},"");pushed=true;}catch(e){pushed=false;}}
    dsc.scrollTop=0;
    var x=dlg.querySelector(".cs-x");if(x)x.focus({preventScroll:true});
  }
  function closeCase(fromPop){
    if(!dlg||csOpen===null)return;csOpen=null;
    if(dlg.open){if(dlg.close)dlg.close();else dlg.removeAttribute("open");}
    d.body.classList.remove("lock");
    if(pushed&&!fromPop){pushed=false;history.back();}pushed=false;
    if(lastBtn)lastBtn.focus({preventScroll:true});
  }
  if(dlg){
    dlg.querySelector(".cs-x").addEventListener("click",function(){closeCase(false);});
    dlg.addEventListener("cancel",function(e){e.preventDefault();closeCase(false);});
    dlg.addEventListener("click",function(e){if(e.target===dlg)closeCase(false);});
    var cta=dlg.querySelector(".cs-cta");if(cta)cta.addEventListener("click",function(e){e.preventDefault();closeCase(false);setTimeout(function(){var t=d.getElementById("contact");if(t)t.scrollIntoView({behavior:RM?"auto":"smooth"});},250);});
    addEventListener("popstate",function(){if(csOpen!==null)closeCase(true);});
  }
}
/* testimonials */
var TS=(C.testimonials||[]).filter(function(t){return t&&t.quote&&t.name;});
if(TS.length){var tg=d.getElementById("t-grid");
  TS.forEach(function(t){var f=el("figure","testi panel rv");var q=el("blockquote");q.appendChild(el("p",null,"\u201C"+t.quote+"\u201D"));f.appendChild(q);var fc=el("figcaption");fc.appendChild(el("b",null,t.name));if(t.business)fc.appendChild(el("span",null,t.business));f.appendChild(fc);tg.appendChild(f);});
  d.getElementById("testimonials").hidden=false;
}
/* package prices: an empty price keeps "On request" */
var PP=C.packagePrices||{};
[].forEach.call(d.querySelectorAll(".pkg[data-tier]"),function(p){
  var k=p.getAttribute("data-tier"),v=(PP[k]||"").replace(/[^\d,]/g,"");
  if(!v||k==="starter")return;
  var bx=p.querySelector("[data-price]");bx.innerHTML="";
  bx.appendChild(el("p","pfrom","Starting from"));var big=el("p","big");var cn=el("span","cnt","\u20B9"+v);big.appendChild(cn);big.appendChild(d.createTextNode(" "));big.appendChild(el("small",null,"/ month"));bx.appendChild(big);
});

/* ---------- nav ---------- */
var nav=d.getElementById("nav"),burger=d.getElementById("burger"),menu=d.getElementById("menu");
function onScroll(){nav.classList.toggle("scrolled",scrollY>20);}
addEventListener("scroll",onScroll,{passive:true});onScroll();
function setMenu(open){
  nav.classList.toggle("open",open);
  burger.setAttribute("aria-expanded",open?"true":"false");
  burger.setAttribute("aria-label",open?"Close menu":"Open menu");
  d.body.classList.toggle("lock",open);
  if(open){menu.hidden=false;}else{setTimeout(function(){if(!nav.classList.contains("open"))menu.hidden=true;},320);}
}
burger.addEventListener("click",function(){setMenu(!nav.classList.contains("open"));});
menu.addEventListener("click",function(e){if(e.target.closest("a"))setMenu(false);});
addEventListener("keydown",function(e){if(e.key==="Escape"&&nav.classList.contains("open")){setMenu(false);burger.focus();}});
addEventListener("resize",function(){if(innerWidth>=1140&&nav.classList.contains("open"))setMenu(false);});

var IO="IntersectionObserver" in window;
var links=[].slice.call(d.querySelectorAll(".links a"));
if(IO){
  var secIO=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var id=e.target.id;links.forEach(function(a){a.classList.toggle("act",a.getAttribute("href")==="#"+id);});}});},{rootMargin:"-45% 0px -50% 0px"});
  ["about","work","services","packages","process","testimonials","faq","contact"].forEach(function(id){var s=d.getElementById(id);if(s)secIO.observe(s);});
}

/* stagger indexes */
[].forEach.call(d.querySelectorAll("[data-stagger],#cases,#t-grid"),function(p){[].forEach.call(p.children,function(c,i){c.style.setProperty("--i",i);});});

/* count-up on package prices (ends on the exact original text) */
function fmt(n){var s=String(n),o="";while(s.length>3){o=","+s.slice(-3)+o;s=s.slice(0,-3);}return s+o;}
function countUp(e){
  var txt=e.textContent,target=parseInt(txt.replace(/[^\d]/g,""),10);
  if(!target)return;
  var t0=null,dur=1100;
  e.style.minWidth=e.offsetWidth+"px";e.style.display="inline-block";e.style.textAlign="right";
  function step(t){if(!t0)t0=t;var p=Math.min(1,(t-t0)/dur),k=1-Math.pow(1-p,3);
    e.textContent="\u20B9"+fmt(Math.round(target*k));
    if(p<1)requestAnimationFrame(step);else{e.textContent=txt;}}
  requestAnimationFrame(step);
}

/* scroll reveal */
var rvs=[].slice.call(d.querySelectorAll(".rv"));
function reveal(x){x.classList.add("in");
  /* phone swipe row (v4r): tiles to the right are clipped by the row, so they never "enter" the screen and stayed invisible (opacity 0)
     until swiped, then faded in: an empty box while swiping. Reveal the whole row together with the first tile. */
  if(x.parentNode&&x.parentNode.id==="svc-row")[].forEach.call(x.parentNode.children,function(s){if(s!==x&&s.classList.contains("rv")&&!s.classList.contains("in")){s.classList.add("in");if(typeof rIO!=="undefined"&&rIO)rIO.unobserve(s);}});if(x.classList.contains("pkg")){var c=x.querySelector(".cnt");if(c)setTimeout(function(){countUp(c);},350);}}
if(IO){
  var rIO=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){reveal(e.target);rIO.unobserve(e.target);}});},{rootMargin:"0px 0px 10% 0px",threshold:0});
  rvs.forEach(function(x){rIO.observe(x);});
}else{rvs.forEach(function(x){x.classList.add("in");});}

/* tap glow for touch */
d.addEventListener("touchstart",function(e){var t=e.target.closest&&e.target.closest(".card,.pkg,.step,.case");if(!t)return;t.classList.add("tap");setTimeout(function(){t.classList.remove("tap");},700);},{passive:true});

/* service videos: lazy load + play only while on screen (also under reduced motion / battery saver).
   - nothing downloads before window "load"
   - one file at a time: the next tile's file starts only when the current one can play (or after 5 s), so the first video
     starts fast and images further down are not starved of bandwidth
   - grid (>=900px): a tile joins the queue when it comes within ~200px of the viewport
   - phone swipe row (<900px): only the tile that is actually showing in the row (>=55% visible) joins, once the row is near the viewport;
     off-screen tiles pause and keep their src (no reload on swipe back)
   - Data Saver / 2G: no automatic download; the poster shows with play controls */
function svPlay(v){if(!v._on||!v.getAttribute("src"))return;var p=v.play();if(p&&p.catch)p.catch(function(){if(v._on&&v.paused)v.controls=true;});}
var svQ=[],svCur=null,svT=0;
function svNext(){
  if(svCur)return;
  var v=svQ.shift();if(!v)return;
  svCur=v;
  function done(){if(svCur!==v)return;clearTimeout(svT);svCur=null;svNext();}
  v.addEventListener("canplaythrough",done,{once:true});v.addEventListener("error",done,{once:true});
  v.addEventListener("error",function(){svRetry(v);});
  svT=setTimeout(done,5000);
  v.preload="auto";v.setAttribute("preload","auto");v.src=v._src;svPlay(v);
}
/* a failed video file (dropped connection, network switch) is fetched again: up to 4 times, 2/5/10/20 s apart; the poster stays meanwhile */
function svRetry(v){var n=v._rt||0;if(n>=4||!v._src)return;v._rt=n+1;
  setTimeout(function(){v.src=mBust(v._src,n+1);v.load();svPlay(v);},[2000,5000,10000,20000][n]);}
function svLoad(v){if(v.getAttribute("src")||!v._src||v._queued)return;v._queued=true;svQ.push(v);svNext();}
function svBusy(){for(var i=0;i<svVids.length;i++){if(!svVids[i].paused)return true;}return false;}
if(svVids.length){
  svVids.forEach(function(v){v.muted=true;v.defaultMuted=true;v.playsInline=true;});
  var svRowNear=false,svGo=false;
  function svStart(){
    if(svGo)return;svGo=true;
    svVids.forEach(posterCheck);
    if(!IO){svVids.forEach(function(v){v._on=true;svLoad(v);});return;}
    /* play/pause by on-screen visibility (clipped by the swipe row, so hidden tiles read as off screen) */
    var vIO=new IntersectionObserver(function(es){es.forEach(function(e){var v=e.target;v._on=e.isIntersecting;if(v._on)svPlay(v);else if(!v.paused)v.pause();});},{threshold:.35});
    svVids.forEach(function(v){vIO.observe(v);});
    if(svMob){
      var seen=[];
      var hIO=new IntersectionObserver(function(es){es.forEach(function(e){var v=e.target;seen[svVids.indexOf(v)]=e.isIntersecting;if(e.isIntersecting&&svRowNear)svLoad(v);});},{root:svRow,threshold:.55});
      svVids.forEach(function(v){hIO.observe(v);});
      new IntersectionObserver(function(es){svRowNear=es[es.length-1].isIntersecting;if(svRowNear)svVids.forEach(function(v,i){if(seen[i])svLoad(v);});},{rootMargin:"200px 0px"}).observe(svRow);
    }else{
      var lIO=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){svLoad(e.target);lIO.unobserve(e.target);}});},{rootMargin:"200px 0px"});
      svVids.forEach(function(v){lIO.observe(v);});
    }
  }
  /* start at window load, or 1.5 s after the page is parsed if load is slow (a stuck request elsewhere must not hold the videos back) */
  if(d.readyState==="complete")setTimeout(svStart,0);else{addEventListener("load",function(){setTimeout(svStart,0);});setTimeout(svStart,1500);}
}

/* ---------- contact form: compose WhatsApp / email ---------- */
var form=d.getElementById("enquiry");
if(form){
  var err=d.getElementById("f-err");
  function val(n){var f=form.elements[n];return f&&f.value?f.value.trim():"";}
  function compose(){
    var lines=["Hi SYNQWAVE, I'd like to start a project.",""];
    lines.push("Name: "+val("name"));
    if(val("business"))lines.push("Business: "+val("business"));
    lines.push("Service needed: "+val("service"));
    if(val("budget"))lines.push("Budget range: "+val("budget"));
    lines.push("","Message:",val("message"));
    return lines.join("\n");
  }
  function check(){
    var bad=["name","service","message"].filter(function(n){return !val(n);});
    ["name","service","message"].forEach(function(n){form.elements[n].setAttribute("aria-invalid",bad.indexOf(n)>-1?"true":"false");});
    err.hidden=!bad.length;
    if(bad.length){form.elements[bad[0]].focus();return false;}
    return true;
  }
  function waURL(){return "https://wa.me/"+WA+"?text="+encodeURIComponent(WA_PRE+compose());}
  function mailURL(){
    var subj="Project enquiry"+(val("business")?" from "+val("business"):(val("name")?" from "+val("name"):""));
    return "mailto:"+EMAIL+"?subject="+encodeURIComponent(subj)+"&body="+encodeURIComponent(compose().replace(/\n/g,"\r\n"));
  }
  form.addEventListener("input",function(e){if(!err.hidden&&e.target.value)e.target.setAttribute("aria-invalid","false");});
  form.addEventListener("submit",function(e){
    e.preventDefault();
    if(!check())return;
    var u=waURL();form.setAttribute("data-last-url",u);
    var w=window.open(u,"_blank");
    if(w){try{w.opener=null;}catch(_){}}else{location.href=u;}
  });
  d.getElementById("send-mail").addEventListener("click",function(){
    if(!check())return;
    var u=mailURL();form.setAttribute("data-last-url",u);
    location.href=u;
  });
  window.SYNQWAVE_FORM={compose:compose,waURL:waURL,mailURL:mailURL};
}

/* FAQ accordion: smooth open/close, one open at a time */
[].forEach.call(d.querySelectorAll(".q"),function(q){
  var s=q.querySelector("summary"),a=q.querySelector(".ans");
  s.addEventListener("click",function(e){
    if(RM||!a.animate)return;
    e.preventDefault();
    if(q.open){var h=a.offsetHeight;var an=a.animate([{height:h+"px",opacity:1},{height:"0px",opacity:0}],{duration:280,easing:"ease"});an.onfinish=function(){q.open=false;};}
    else{[].forEach.call(d.querySelectorAll(".q[open]"),function(o){if(o!==q)o.open=false;});q.open=true;var h2=a.offsetHeight;a.animate([{height:"0px",opacity:0},{height:h2+"px",opacity:1}],{duration:340,easing:"cubic-bezier(.2,.7,.1,1)"});}
  });
});

/* hero waves canvas
   Always alive: under reduced motion it keeps drifting, just slower (decorative, no layout movement).
   Time-based motion (t from real elapsed time), drawn on every display frame (60 fps on phones too),
   paused when off-screen or the tab is hidden, DPR capped for phones.
   perf (v4r): the drawing runs in a background worker (OffscreenCanvas), so the 60 fps waves no longer occupy the page's
   main thread (measured: they kept it ~75% busy at the top of the page on a mid-range phone, making taps, scrolling and
   video start feel slow). Same drawing code, same look. Browsers without OffscreenCanvas draw on the page as before. */
function wavesDraw(ctx,W,H,t){
  function ribbon(cy,amp,n,spread,speed,alpha,flip){
    var g=ctx.createLinearGradient(0,0,W,0);
    g.addColorStop(0,"rgba(30,212,255,"+alpha+")");g.addColorStop(.38,"rgba(24,110,255,"+alpha+")");g.addColorStop(.72,"rgba(138,61,255,"+alpha+")");g.addColorStop(1,"rgba(196,60,255,"+alpha+")");
    ctx.strokeStyle=g;
    var step=W<700?10:12,k1=(Math.PI*2)/(W*1.1),k2=(Math.PI*2)/(W*.55);
    for(var i=0;i<n;i++){
      var f=i/(n-1),off=(f-.5)*spread,ph=f*1.6;
      ctx.globalAlpha=.25+.75*Math.sin(f*Math.PI);
      ctx.beginPath();
      for(var x=-step;x<=W+step;x+=step){
        var y=cy+off+Math.sin(x*k1+t*speed+ph)*amp+Math.sin(x*k2-t*speed*.7+ph*1.7)*amp*.35*flip;
        if(x<0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
      }
      ctx.stroke();
    }
    ctx.globalAlpha=1;
  }
  if(!W||!H)return;
  ctx.clearRect(0,0,W,H);
  ctx.lineWidth=1;ctx.globalCompositeOperation="lighter";
  var m=W<700,amp=Math.min(H*.09,m?44:80);
  ribbon(H*.86,amp,m?22:34,m?70:110,.55,.55,1);
  ribbon(H*.12,amp*.7,m?14:22,m?44:70,.4,.32,-1);
  ctx.globalCompositeOperation="source-over";
}
/* the worker: owns the canvas, runs its own frame loop; the page only tells it the size, on/off and "a video is playing" */
function wavesWorker(){
  var cv,ctx,W=0,H=0,on=false,raf=0,last=0,t=0,fc=0,SPEED=1,busy=false;
  var rAF=self.requestAnimationFrame?function(f){return self.requestAnimationFrame(f);}:function(f){return setTimeout(function(){f(performance.now());},16);};
  var cAF=self.cancelAnimationFrame?function(h){self.cancelAnimationFrame(h);}:clearTimeout;
  function frame(ts){
    raf=rAF(frame);
    var dt=last?ts-last:0;last=ts;
    if(dt>100)dt=100;
    t+=dt/1000*SPEED;
    if(W<900&&busy&&(fc++&1))return; /* phones: 30 fps while a service video plays */
    wavesDraw(ctx,W,H,t);
  }
  self.onmessage=function(e){var m=e.data;
    if(m.cv){cv=m.cv;ctx=cv.getContext("2d");SPEED=m.speed;}
    if(!ctx)return;
    if(m.w){W=m.w;H=m.h;var bw=Math.round(W*m.dpr),bh=Math.round(H*m.dpr);
      if(cv.width!==bw||cv.height!==bh){cv.width=bw;cv.height=bh;}
      ctx.setTransform(m.dpr,0,0,m.dpr,0,0);wavesDraw(ctx,W,H,t);}
    if("busy" in m)busy=m.busy;
    if("on" in m){if(m.on&&!raf){last=0;raf=rAF(frame);}else if(!m.on&&raf){cAF(raf);raf=0;}}
  };
}
var cv=d.getElementById("waves");
if(cv&&cv.getContext){
  var SPEED=RM?.4:1,onScreen=true,wvGo=d.readyState==="complete";
  function dims(){var r=cv.getBoundingClientRect();return {w:r.width,h:r.height,dpr:Math.min(window.devicePixelRatio||1,r.width<700?1.5:1.25)};}
  var wk=null;
  try{
    if(cv.transferControlToOffscreen&&window.Worker&&window.OffscreenCanvas&&new OffscreenCanvas(1,1).getContext("2d")){
      var wurl=URL.createObjectURL(new Blob([wavesDraw.toString()+"\n("+wavesWorker.toString()+")();"],{type:"text/javascript"}));
      wk=new Worker(wurl);
      var off=cv.transferControlToOffscreen();
      wk.postMessage({cv:off,speed:SPEED},[off]);
    }
  }catch(e){wk=null;}
  /* page-thread drawing: used when there is no worker, or if the worker fails (a fresh canvas replaces the transferred one) */
  function local(){
    var ctx=cv.getContext("2d"),W=0,H=0,BW=0,BH=0,raf=0,last=0,t=0,fc=0;
    function frame(ts){
      raf=requestAnimationFrame(frame);
      if(!W&&!size())return;
      var dt=last?ts-last:0;last=ts;
      if(dt>100)dt=100; /* after a hitch, resume smoothly instead of jumping */
      t+=dt/1000*SPEED;
      if(W<900&&svBusy()&&(fc++&1))return; /* phones: 30 fps while a service video plays */
      wavesDraw(ctx,W,H,t);
    }
    function size(){
      var r=dims();if(!r.w||!r.h)return false;
      var bw=Math.round(r.w*r.dpr),bh=Math.round(r.h*r.dpr);
      W=r.w;H=r.h;
      /* only touch the backing store when its size really changes (mobile URL-bar resizes would otherwise blank it) */
      if(bw!==BW||bh!==BH){BW=bw;BH=bh;cv.width=bw;cv.height=bh;}
      ctx.setTransform(r.dpr,0,0,r.dpr,0,0);
      wavesDraw(ctx,W,H,t);
      return true;
    }
    return {size:size,run:function(on){if(on&&!raf){last=0;raf=requestAnimationFrame(frame);}else if(!on&&raf){cancelAnimationFrame(raf);raf=0;}},busy:function(){}};
  }
  function remote(){
    var lw=0,lh=0,ld=0,lb=null;
    return {size:function(){var r=dims();if(!r.w||!r.h)return false;if(r.w!==lw||r.h!==lh||r.dpr!==ld){lw=r.w;lh=r.h;ld=r.dpr;wk.postMessage(r);}return true;},
      run:function(on){wk.postMessage({on:on});},
      busy:function(){var b=svBusy();if(b!==lb){lb=b;wk.postMessage({busy:b});}}};
  }
  var drv=wk?remote():local();
  if(wk)wk.onerror=function(){ /* worker could not start: draw on the page instead, nothing visible changes */
    wk.terminate();var n=cv.cloneNode(false);cv.parentNode.replaceChild(n,cv);cv=n;if(rso){rso.disconnect();rso.observe(cv);}if(wio){wio.disconnect();wio.observe(cv);}drv=local();drv.size();update();};
  function update(){drv.run(!!(wvGo&&onScreen&&!d.hidden));}
  var rsT=0;function onResize(){clearTimeout(rsT);drv.size();rsT=setTimeout(function(){drv.size();},200);}
  addEventListener("resize",onResize);
  addEventListener("orientationchange",function(){setTimeout(function(){drv.size();},250);});
  var rso=window.ResizeObserver?new ResizeObserver(function(){drv.size();}):null;if(rso)rso.observe(cv);
  drv.size();
  /* the first frame is drawn at once; the animation loop starts after window "load",
     so the page's own loading and first paint are not competing with 60 fps canvas drawing on phones */
  var wio=IO?new IntersectionObserver(function(es){onScreen=es[es.length-1].isIntersecting;update();},{threshold:0}):null;if(wio)wio.observe(cv);
  d.addEventListener("visibilitychange",update);
  addEventListener("pageshow",update);
  svVids.forEach(function(v){v.addEventListener("play",function(){drv.busy();});v.addEventListener("pause",function(){drv.busy();});});
  if(wvGo)update();else addEventListener("load",function(){wvGo=true;update();});
}

/* perf (v4r): looping CSS effects (wave bands, glowing package border, gradient headline, button pulse, scroll cue) pause
   while they are off screen and resume where they were when they come back, so nothing visible changes;
   before, all of them kept the page busy every frame even when you were looking at another section */
if(IO){
  var aIO=new IntersectionObserver(function(es){es.forEach(function(e){e.target.classList.toggle("anim-off",!e.isIntersecting);});},{rootMargin:"100px 0px"});
  [].forEach.call(d.querySelectorAll(".drift,.pkg.feat,.grad-anim,.hero-glow,.pulse,.scroll"),function(x){aIO.observe(x);});
}
})();
