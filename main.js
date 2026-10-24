(function(){
"use strict";
var d=document,root=d.documentElement;
root.classList.add("js");
var RM=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
var C=window.SYNQWAVE_CONTENT||{};
var WA="919209339989",EMAIL="synqwave.business@gmail.com";
function el(tag,cls,txt){var e=d.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}
function waLink(t){return "https://wa.me/"+WA+"?text="+encodeURIComponent(t);}

/* ---------- content drop-ins (content.js) ---------- */
/* founder photo */
if(C.founderPhoto){var ff=d.getElementById("founder-frame");if(ff){ff.innerHTML="";var fi=el("img","founder-photo");fi.src=C.founderPhoto;fi.alt="Talmeez Ahmad, founder of SYNQWAVE";fi.loading="lazy";fi.decoding="async";ff.appendChild(fi);ff.classList.add("has-photo");}}
/* promo video */
var PV=C.promoVideo||{};
if(PV.src){var pf=d.getElementById("promo"),pv=d.getElementById("promo-video");
  if(pf&&pv){pv.src=PV.src;if(PV.poster)pv.poster=PV.poster;pv.setAttribute("autoplay","");pf.hidden=false;pf.classList.toggle("wide",PV.vertical===false);
    var pc=d.getElementById("promo-cap");if(PV.caption)pc.textContent=PV.caption;else pc.remove();}}
/* case studies: card grid + case study dialog */
var CS=(C.caseStudies||[]).filter(function(c){return c&&c.client;});
var csOpen=null;
if(CS.length){var box=d.getElementById("cases");
  CS.forEach(function(c,n){
    var imgs=(c.images||[]).filter(function(i){return i&&i.src;});
    var a=el("article","case panel rv");
    if(imgs.length){var cv=el("div","case-cover");var im=el("img");im.src=imgs[0].src;im.alt=imgs[0].alt||(c.client+" project by SYNQWAVE");im.width=1200;im.height=800;im.loading="lazy";im.decoding="async";cv.appendChild(im);a.appendChild(cv);}
    var b=el("div","case-body");
    if(c.tag)b.appendChild(el("span","tag tag-c",c.tag));
    b.appendChild(el("h3",null,c.client));
    if(c.industry)b.appendChild(el("p","case-ind",c.industry));
    var btn=el("button","case-open");btn.type="button";btn.setAttribute("aria-haspopup","dialog");btn.setAttribute("aria-label","View case study: "+c.client);
    btn.appendChild(el("span",null,"View case study"));var ar=el("span","case-ar","\u2192");ar.setAttribute("aria-hidden","true");btn.appendChild(ar);
    btn.addEventListener("click",function(){openCase(n,btn);});
    b.appendChild(btn);a.appendChild(b);box.appendChild(a);
  });
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
    (c.images||[]).filter(function(i){return i&&i.src;}).forEach(function(i){var im=el("img");im.src=i.src;im.alt=i.alt||(c.client+" project by SYNQWAVE");im.width=1200;im.height=800;im.decoding="async";g.appendChild(im);});
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
  if(!target||RM)return;
  var t0=null,dur=1100;
  e.style.minWidth=e.offsetWidth+"px";e.style.display="inline-block";e.style.textAlign="right";
  function step(t){if(!t0)t0=t;var p=Math.min(1,(t-t0)/dur),k=1-Math.pow(1-p,3);
    e.textContent="\u20B9"+fmt(Math.round(target*k));
    if(p<1)requestAnimationFrame(step);else{e.textContent=txt;}}
  requestAnimationFrame(step);
}

/* scroll reveal */
var rvs=[].slice.call(d.querySelectorAll(".rv"));
function reveal(x){x.classList.add("in");if(x.classList.contains("pkg")){var c=x.querySelector(".cnt");if(c)setTimeout(function(){countUp(c);},350);}}
if(IO&&!RM){
  var rIO=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){reveal(e.target);rIO.unobserve(e.target);}});},{rootMargin:"0px 0px -8% 0px",threshold:.12});
  rvs.forEach(function(x){rIO.observe(x);});
}else{rvs.forEach(function(x){x.classList.add("in");});}

/* tap glow for touch */
d.addEventListener("touchstart",function(e){var t=e.target.closest&&e.target.closest(".card,.pkg,.step,.case");if(!t)return;t.classList.add("tap");setTimeout(function(){t.classList.remove("tap");},700);},{passive:true});

/* promo video: play only when on screen */
var vids=[].slice.call(d.querySelectorAll(".promo:not([hidden]) video"));
vids.forEach(function(v){v.muted=true;if(RM){v.removeAttribute("autoplay");v.pause();v.controls=true;}});
if(IO&&!RM){
  var vIO=new IntersectionObserver(function(es){es.forEach(function(e){var v=e.target;if(e.isIntersecting){var p=v.play();if(p&&p.catch)p.catch(function(){v.controls=true;});}else{v.pause();}});},{threshold:.25});
  vids.forEach(function(v){vIO.observe(v);});
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
  function waURL(){return "https://wa.me/"+WA+"?text="+encodeURIComponent(compose());}
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

/* hero waves canvas */
var cv=d.getElementById("waves");
if(cv&&cv.getContext){
  var ctx=cv.getContext("2d"),W=0,H=0,DPR=1,run=true,vis=true,last=0,t=0;
  function size(){var r=cv.getBoundingClientRect();DPR=Math.min(window.devicePixelRatio||1,innerWidth<700?1.5:1.25);W=r.width;H=r.height;cv.width=Math.round(W*DPR);cv.height=Math.round(H*DPR);ctx.setTransform(DPR,0,0,DPR,0,0);if(!run||RM)draw();}
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
  function draw(){
    ctx.clearRect(0,0,W,H);
    ctx.lineWidth=1;ctx.globalCompositeOperation="lighter";
    var m=W<700,amp=Math.min(H*.09,m?44:80);
    ribbon(H*.86,amp,m?22:34,m?70:110,.55,.55,1);
    ribbon(H*.12,amp*.7,m?14:22,m?44:70,.4,.32,-1);
    ctx.globalCompositeOperation="source-over";
  }
  function frame(ts){if(!run)return;requestAnimationFrame(frame);if(!vis)return;if(ts-last<(W<700?33:16))return;var dt=last?Math.min(ts-last,50):16;last=ts;t+=dt/1000;draw();}
  addEventListener("resize",size);size();
  if(RM){run=false;draw();}
  else{
    requestAnimationFrame(frame);
    if(IO){new IntersectionObserver(function(es){vis=es[0].isIntersecting;},{threshold:0}).observe(cv);}
    d.addEventListener("visibilitychange",function(){vis=!d.hidden;});
  }
}
})();
