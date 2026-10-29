/* Reply-delay survey: language picker → guide chatbot → 16 messenger trials → submit.
   Reads SURVEY_CONFIG (config.js), SURVEY_I18N (i18n.js) and SURVEY_COUNTRIES (countries.js). */
(function(){
"use strict";
const CFG=window.SURVEY_CONFIG,I18N=window.SURVEY_I18N;
const {ENDPOINT,VERSION,DONE_KEY,LANG_KEY,PROGRESS_KEY}=CFG;
const PROGRESS_MAX_MS=(CFG.PROGRESS_MAX_DAYS||7)*864e5;

/* ================= study definition =================
   Canonical (stored) values only; everything shown on screen comes from I18N[lang]. */
const RELS=["friend","partner","family","professor"].map(key=>({key}));
// Fixed fictional clock shared by every respondent (display text per language in i18n.js → sits).
const SITS=[
  {n:1,elapsed:"2h",read:true},
  {n:2,elapsed:"2h",read:false},
  {n:3,elapsed:"1d",read:false},
  {n:4,elapsed:"1d",read:true}
];
const REASONS={
  read:["busy","deliberating","postponed_forgot","unwilling","unsure","other"],
  unread:["not_seen","busy_unopened","preview_later","avoid_opening","unsure","other"]
};
const TRIALS=[];SITS.forEach(s=>RELS.forEach(r=>TRIALS.push({s,r})));
const UNIT_MIN={"분":1,"시간":60,"일":1440};
const GENDERS=["여성","남성","응답하지 않음"];
const NO_ANSWER="응답하지 않음";

/* ================= state ================= */
const S={phase:"pick",lang:"ko",anonId:makeId(),startedAt:new Date().toISOString(),demo:{},trials:{},idx:0};
let t=I18N.ko;
const store={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}},del(k){try{localStorage.removeItem(k)}catch(e){}}};
if(/[?&]reset=1/.test(location.search)){store.del(DONE_KEY);store.del(PROGRESS_KEY)}
try{history.scrollRestoration="manual"}catch(e){}

function makeId(){
  const a="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";let s="R-";
  const b=new Uint8Array(8);(crypto.getRandomValues?crypto.getRandomValues(b):b.forEach((_,i)=>b[i]=Math.random()*256|0));
  b.forEach(x=>s+=a[x%a.length]);return s;
}
const $=(t,a,...k)=>{const e=document.createElement(t);if(a)for(const n in a){if(n==="class")e.className=a[n];else if(n==="html")e.innerHTML=a[n];else if(n.startsWith("on"))e.addEventListener(n.slice(2),a[n]);else if(a[n]!==false&&a[n]!=null)e.setAttribute(n,a[n]===true?"":a[n]);}k.flat().forEach(c=>c!=null&&e.append(c.nodeType?c:document.createTextNode(c)));return e};
// i18n templates may return arrays of strings and {b:"bold"} / {who:"relationship name"} parts
const parts=a=>a.map(p=>p==null||p===""?null:typeof p==="string"?p:p.who!=null?$("b",{class:"who"},p.who):$("b",null,p.b));
const app=document.getElementById("app");
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
const WIDE=matchMedia("(min-width: 880px), (min-width: 640px) and (max-height: 500px)");
const wait=ms=>new Promise(r=>setTimeout(r,reduce?Math.min(ms,120):ms));
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const rel=key=>Object.assign({key},t.rels[key]);
const relChip=r=>r.chip||r.label;
const trialKey=i=>"s"+TRIALS[i].s.n+"_"+TRIALS[i].r.key;
const fmtNum=v=>Number.isInteger(v)?String(v):String(Math.round(v*100)/100);
const durText=d=>t.durEcho(fmtNum(d.value),d.unit);
const natText=v=>v===NO_ANSWER?t.natPrefer:v;
const hintEl=text=>$("div",{class:"hint"},text);
function setApp(cls){
  if(ro){ro.disconnect();ro=null}
  document.documentElement.style.scrollPaddingTop="";
  app.className="app"+(cls?" "+cls:"");app.innerHTML="";
}

const ICON={
  back:'<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>',
  search:'<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/></svg>',
  menu:'<svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  bot:'<svg viewBox="0 0 24 24"><rect x="5" y="8" width="14" height="11" rx="3"/><path d="M12 4v4M9.5 13h.01M14.5 13h.01"/></svg>',
  check:'<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  plus:'<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
  globe:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/></svg>',
  battery:'<svg viewBox="0 0 26 13" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="1" y="1.5" width="21" height="10" rx="2.5"/><rect x="3" y="3.5" width="14" height="6" rx="1" fill="currentColor" stroke="none"/><path d="M24 5v3"/></svg>'
};

/* ================= where responses go (URL lives in js/config.js) ================= */
async function callEndpoint(method,body){
  const ctl=new AbortController();const tm=setTimeout(()=>ctl.abort(),60000);
  try{
    const url=method==="GET"?ENDPOINT+(ENDPOINT.includes("?")?"&":"?")+"ping="+Date.now():ENDPOINT;
    const res=await fetch(url,method==="GET"?{signal:ctl.signal,cache:"no-store"}:{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(body),signal:ctl.signal,cache:"no-store"});
    if(!res.ok)throw new Error("HTTP "+res.status);
    return await res.json();
  }finally{clearTimeout(tm)}
}
function warmUp(){if(ENDPOINT)callEndpoint("GET").catch(()=>{})}
const errText=e=>e&&e.name==="AbortError"?t.errTimeout:(e&&e.message)||t.errNetwork;

/* ================= saved progress (resume after reload) ================= */
function saveProgress(){
  if(S.phase!=="scenario")return;
  store.set(PROGRESS_KEY,JSON.stringify({v:1,savedAt:new Date().toISOString(),lang:S.lang,anonId:S.anonId,startedAt:S.startedAt,consentAt:S.consentAt,
    scenarioStartedAt:S.scenarioStartedAt,demo:S.demo,trials:S.trials,idx:S.idx}));
}
const complete=a=>!!a&&Number.isInteger(a.concern)&&!!a.reason&&(a.reason!=="other"||!!String(a.other||"").trim());
const doneCount=trials=>TRIALS.filter((_,i)=>complete(trials[trialKey(i)])).length;
function loadProgress(){
  const raw=store.get(PROGRESS_KEY);if(raw==null)return null;
  let p=null;try{p=JSON.parse(raw)}catch(e){}
  if(!p||typeof p!=="object"||!validProgress(p)){store.del(PROGRESS_KEY);return null}
  let first=TRIALS.findIndex((_,i)=>!complete(p.trials[trialKey(i)]));if(first<0)first=TRIALS.length-1;
  p.idx=Math.min(p.idx,first);
  return p;
}
function validProgress(p){
  try{
    const age=Date.now()-Date.parse(p.savedAt),d=p.demo;
    const dur=x=>!!x&&typeof x.value==="number"&&UNIT_MIN.hasOwnProperty(x.unit)&&typeof x.minutes==="number";
    const ans=a=>!!a&&typeof a==="object"&&(a.concern===null||Number.isInteger(a.concern)&&a.concern>=1&&a.concern<=10)&&(a.reason===null||typeof a.reason==="string")&&typeof a.other==="string";
    return p.v===1&&age<PROGRESS_MAX_MS&&age>-864e5&&(p.lang==="ko"||p.lang==="en")&&/^R-[A-Z0-9]{8}$/.test(p.anonId)&&typeof p.startedAt==="string"&&typeof p.consentAt==="string"
      &&Number.isInteger(p.idx)&&p.idx>=0&&p.idx<TRIALS.length&&!!d&&typeof d.age==="number"&&GENDERS.includes(d.gender)&&typeof d.major==="string"
      &&(d.nationality==null||typeof d.nationality==="string")&&dur(d.replyHabit)&&!!d.threshold&&RELS.every(r=>dur(d.threshold[r.key]))
      &&!!p.trials&&typeof p.trials==="object"&&Object.values(p.trials).every(ans);
  }catch(e){return false}
}

/* ================= LANGUAGE PICKER (first screen on every load) ================= */
function pickerScreen(){
  S.phase="pick";setApp("bare");
  const P=I18N.picker;
  const q=/[?&]lang=(ko|en)(?:&|$)/.exec(location.search),saved=store.get(LANG_KEY);
  let cur=q?q[1]:saved==="en"||saved==="ko"?saved:"ko";
  const go=$("button",{type:"submit",class:"btn main",id:"pick-go",lang:cur},P.go[cur]);
  const opts=["ko","en"].map(v=>$("label",{class:"lang"+(v===cur?" on":"")},
    $("input",{type:"radio",name:"lang",value:v,checked:v===cur}),
    $("span",null,$("b",{lang:v},P.options[v].name),$("small",{lang:v==="ko"?"en":"ko"},P.options[v].sub))));
  const card=$("form",{class:"card",id:"picker-card",role:"dialog","aria-modal":"true","aria-labelledby":"pick-h","aria-describedby":"pick-sub",tabindex:"-1",
      onchange:e=>{cur=e.target.value;opts.forEach(l=>l.classList.toggle("on",l.querySelector("input").checked));go.textContent=P.go[cur];go.lang=cur},
      onsubmit:e=>{e.preventDefault();chooseLang(cur)}},
    $("div",{class:"head"},
      $("div",{class:"globe",html:ICON.globe,"aria-hidden":"true"}),
      $("h1",{id:"pick-h"},$("span",{lang:"en"},P.heading.en)," · ",$("span",{lang:"ko"},P.heading.ko)),
      $("p",{id:"pick-sub"},$("span",{lang:"en"},P.sub.en)," / ",$("span",{lang:"ko"},P.sub.ko))),
    $("fieldset",{class:"langs"},$("legend",{class:"sr"},P.heading.en+" / "+P.heading.ko),opts),
    go);
  app.append($("section",{class:"screen",id:"picker"},$("div",{class:"dialog-wrap"},card)));
  card.focus({preventScroll:true});
}
function setLang(v){S.lang=v;t=I18N[v];document.documentElement.lang=v;document.title=t.title;store.set(LANG_KEY,v)}
function chooseLang(v){
  setLang(v);
  if(store.get(DONE_KEY))return introScreen(async()=>{S.phase="done";await bot(t.already);composer().append(hintEl(t.ended))});
  const p=loadProgress();
  if(p)return resumeScreen(p);
  introScreen();
}

/* ================= RESUME CARD ================= */
// One instrument language per respondent: a session continues in the language it was started in
// (the card says so when another language was picked); "start over" uses the language just picked.
function resumeScreen(p){
  S.phase="resume";setApp("bare");
  const other=p.lang!==S.lang;
  const card=$("div",{class:"card",id:"resume-card",role:"dialog","aria-modal":"true","aria-labelledby":"res-h","aria-describedby":"res-p",tabindex:"-1"},
    $("div",{class:"head"},$("h1",{id:"res-h"},t.resumeTitle(doneCount(p.trials),TRIALS.length)),
      $("p",{id:"res-p"},other?t.resumeOther+" ":null,t.resumeNote)),
    $("div",{class:"btns"},
      $("button",{type:"button",class:"btn main",id:"resume-go",onclick:()=>{
        if(other)setLang(p.lang);
        Object.assign(S,{anonId:p.anonId,startedAt:p.startedAt,consentAt:p.consentAt,scenarioStartedAt:p.scenarioStartedAt,demo:p.demo,trials:p.trials,idx:p.idx});
        warmUp();startScenario();}},other?t.resumeGoOther:t.resumeGo),
      $("button",{type:"button",class:"btn ghost",id:"resume-restart",onclick:()=>{store.del(PROGRESS_KEY);introScreen()}},t.resumeRestart)));
  app.append($("section",{class:"screen",id:"resume"},$("div",{class:"dialog-wrap"},card)));
  card.focus({preventScroll:true});
}

/* ================= INTRO: guide chatbot ================= */
let log,pill,ro,pinned=true,autoTop=0,lastBotGroup=null,anchor=null;
function introScreen(run=runIntro){
  S.phase="intro";setApp("fill");
  const scr=$("section",{class:"screen",id:"intro"});
  const bar=$("header",{class:"chatbar"},$("span",{class:"title"},t.chatTitle),$("span",{class:"deco",html:ICON.menu,"aria-hidden":"true"}));
  log=$("div",{class:"chatarea",role:"log","aria-live":"polite"},$("div",{class:"daypill"},t.dayPill));
  pill=$("button",{type:"button",class:"newpill",hidden:true,onclick:follow},t.newMsg);
  const comp=$("div",{class:"composer",id:"composer"});
  scr.append(bar,log,$("div",{class:"dock"},pill,comp));app.append(scr);
  pinned=true;autoTop=0;lastBotGroup=null;anchor=null;
  // "pinned" = the reader is at the bottom; only then do new bot messages / layout changes scroll the log.
  // Our own jumps (autoTop) never unpin, even if the composer grew before the scroll event arrived.
  log.addEventListener("scroll",()=>{pinned=log.scrollTop>=autoTop-1||log.scrollHeight-log.scrollTop-log.clientHeight<48;if(pinned)pill.hidden=true;else autoTop=Infinity});
  if(window.ResizeObserver){ro=new ResizeObserver(()=>{if(pinned)follow()});ro.observe(log);ro.observe(comp)}
  run();
}
// Scroll to the bottom, but never past the top of the newest bot bubble (anchor): a bubble taller than
// the log (e.g. the summary on a landscape phone) is shown from its first line.
function follow(){
  let y=log.scrollHeight;
  if(anchor&&anchor.isConnected)y=Math.min(y,log.scrollTop+anchor.getBoundingClientRect().top-log.getBoundingClientRect().top-8);
  log.scrollTop=y;autoTop=log.scrollTop;pinned=true;pill.hidden=true;
}
const settle=()=>requestAnimationFrame(()=>{if(pinned&&log)follow()});
if(window.visualViewport)visualViewport.addEventListener("resize",()=>{if(S.phase==="intro"&&log&&pinned)follow()});
async function bot(text,delay){
  let grp=lastBotGroup;
  if(!grp){
    const stack=$("div",{class:"stack"});
    grp=$("div",{class:"row them"},$("div",{class:"avatar",html:ICON.bot,"aria-hidden":"true"}),$("div",{class:"them-col"},$("span",{class:"name"},t.botName),stack));
    grp.stack=stack;log.append(grp);lastBotGroup=grp;
  }
  const ty=$("div",{class:"row them"},$("div",{class:"bubble typing","aria-label":t.typing},$("i"),$("i"),$("i")));
  anchor=null;grp.stack.append(ty);if(pinned)follow();
  await wait(delay??Math.min(1100,350+text.length*12));
  const row=$("div",{class:"row them"},$("div",{class:"bubble"},text),$("div",{class:"meta"},$("span",null,nowLabel())));
  ty.replaceWith(row);anchor=row;
  if(pinned)follow();else pill.hidden=false;
}
function me(text){
  lastBotGroup=null;anchor=null;
  log.append($("div",{class:"row me"},$("div",{class:"meta"},$("span",null,nowLabel())),$("div",{class:"bubble"},text)));
  follow();
}
function nowLabel(){const d=new Date();return t.clock(d.getHours(),String(d.getMinutes()).padStart(2,"0"))}
function composer(){return document.getElementById("composer")}

function askChoice(options,o={}){
  return new Promise(res=>{
    const c=composer();c.innerHTML="";
    if(o.hint)c.append(hintEl(o.hint));
    const chips=$("div",{class:"chips"});
    options.forEach(x=>chips.append($("button",{type:"button",class:"chip"+(x.primary?" primary":"")+(x.quiet?" quiet":""),onclick:()=>{c.innerHTML="";me(x.label);res(x.value)}},x.label)));
    c.append(chips);
    if(o.focus!==false)chips.querySelector("button").focus({preventScroll:true});
    settle();
  });
}
function askText({placeholder,type="text",validate,id,hint}){
  return new Promise(res=>{
    const c=composer();c.innerHTML="";
    const inp=$("input",{class:"field",id,type:"text",placeholder,autocomplete:"off",inputmode:type==="int"?"numeric":null,enterkeyhint:"send"});
    const err=$("div",{class:"err",role:"alert"});
    const go=()=>{const v=inp.value.trim();const r=validate(v);if(r.error){err.textContent=r.error;inp.focus();return}c.innerHTML="";me(r.display);res(r.value)};
    inp.addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.isComposing){e.preventDefault();go()}});
    c.append($("div",{class:"inline"},inp,$("button",{type:"button",class:"send",onclick:go},t.send)));
    if(hint)c.append(hintEl(hint));
    c.append(err);inp.focus({preventScroll:true});settle();
  });
}
// No unit is preselected: a number > 0 needs an explicit unit; 0 (reply habit only) is stored as 0분.
function askDuration({id,allowZero,hint}){
  return new Promise(res=>{
    const c=composer();c.innerHTML="";
    let unit=null;
    const inp=$("input",{class:"field num",id,type:"text",inputmode:"decimal",placeholder:t.durPh,autocomplete:"off",enterkeyhint:"send","aria-label":t.durLabel});
    const err=$("div",{class:"err",role:"alert"});
    const seg=$("div",{class:"seg",role:"group","aria-label":t.unitGroup});
    Object.keys(UNIT_MIN).forEach(u=>seg.append($("button",{type:"button","data-unit":u,"aria-pressed":"false",onclick:()=>{
      unit=u;seg.querySelectorAll("button").forEach(x=>x.setAttribute("aria-pressed",String(x.dataset.unit===u)));err.textContent="";}},t.units[u])));
    const go=()=>{
      const raw=inp.value.trim().replace(",",".");const v=Number(raw);
      if(raw===""||!isFinite(v)){err.textContent=t.durErrNum;inp.focus();return}
      if(v<0||(!allowZero&&v===0)){err.textContent=allowZero?t.durErrMin0:t.durErrPos;inp.focus();return}
      if(v>0&&!unit){err.textContent=t.durErrUnit;return}
      const u=v===0?"분":unit;
      const minutes=Math.round(v*UNIT_MIN[u]*100)/100;
      if(minutes>60*24*60){err.textContent=t.durErrMax;inp.focus();return}
      c.innerHTML="";me(t.durEcho(fmtNum(v),u));res({value:v,unit:u,minutes});
    };
    inp.addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.isComposing){e.preventDefault();go()}});
    c.append($("div",{class:"inline"},inp,seg,$("button",{type:"button",class:"send",onclick:go},t.send)));
    if(hint)c.append(hintEl(hint));
    c.append(err);inp.focus({preventScroll:true});settle();
  });
}

/* ---------- nationality (English only): type to filter the country list, tap a match ---------- */
const norm=s=>String(s).normalize("NFD").replace(/\p{M}/gu,"").toLowerCase().replace(/[.'’]/g,"").replace(/[^a-z0-9]+/g," ").trim();
const COUNTRIES=(window.SURVEY_COUNTRIES||[]).map((names,i)=>({name:names[0],i,keys:names.map(norm)}));
// rank: exact name 0, exact alias 1, name starts with 2, a word in the name starts with 3, alias prefix 4/5
function findCountries(raw){
  const q=norm(raw);if(!q)return[];
  const out=[];
  COUNTRIES.forEach(c=>{
    let s=9,n=0;
    c.keys.forEach((k,j)=>{const m=k===q?(j?1:0):k.startsWith(q)?(j?4:2):k.includes(" "+q)?(j?5:3):9;if(m<9){n++;s=Math.min(s,m)}});
    if(s<9)out.push({name:c.name,s,n,i:c.i});
  });
  return out.sort((a,b)=>a.s-b.s||b.n-a.n||a.i-b.i);
}
function askCountry(){
  return new Promise(res=>{
    const c=composer();c.innerHTML="";
    const sugs=$("div",{class:"sugs",id:"nat-sugs",role:"group","aria-label":t.natGroup});
    const inp=$("input",{class:"field",id:"in-nat",type:"text",placeholder:t.natPh,autocomplete:"off",autocapitalize:"words",spellcheck:"false",maxlength:"60",enterkeyhint:"send","aria-describedby":"nat-hint"});
    const live=$("div",{class:"hint",id:"nat-hint","aria-live":"polite"},t.natHintEmpty);
    const err=$("div",{class:"err",role:"alert"});
    let found=[];
    const pick=(value,display)=>{c.innerHTML="";me(display);res(value)};
    const sug=(label,value,display)=>$("button",{type:"button",class:"sug",onclick:()=>pick(value,display)},label);
    const update=()=>{
      const raw=inp.value.trim();found=findCountries(raw);sugs.innerHTML="";err.textContent="";
      if(!raw)live.textContent=t.natHintEmpty;
      else if(!found.length){const v=raw.slice(0,60);sugs.append(sug(t.natUse(v),v,v));live.textContent=t.natNone}
      else{found.slice(0,6).forEach(m=>sugs.append(sug(m.name,m.name,m.name)));live.textContent=found.length>6?t.natMore(found.length):t.natCount(found.length)}
    };
    const go=()=>{
      if(!inp.value.trim()){err.textContent=t.natErrEmpty;inp.focus();return}
      const exact=found.filter(m=>m.s<=1);
      if(exact.length===1)return pick(exact[0].name,exact[0].name);
      if(found.length===1)return pick(found[0].name,found[0].name);
      err.textContent=t.natErrPick;inp.focus();
    };
    inp.addEventListener("input",update);
    inp.addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.isComposing){e.preventDefault();go()}});
    c.append($("label",{class:"sr",for:"in-nat"},t.natLabel),sugs,
      $("div",{class:"inline"},inp,$("button",{type:"button",class:"send",onclick:go},t.send)),
      $("div",{class:"chips"},$("button",{type:"button",class:"chip",id:"nat-prefer",onclick:()=>pick(NO_ANSWER,t.natPrefer)},t.natPrefer)),
      live,err);
    inp.focus({preventScroll:true});settle();
  });
}

/* ---------- the questions (each one re-askable from the review step) ---------- */
const Q={
  async age(again){
    await bot(again?t.ageAgain:t.age);
    S.demo.age=await askText({id:"in-age",type:"int",placeholder:t.agePh,validate:v=>{
      if(!/^\d{1,3}$/.test(v))return{error:t.ageErrNum};
      const n=+v;if(n<15||n>99)return{error:t.ageErrRange};
      return{value:n,display:t.ageEcho(n)};}});
  },
  async gender(){
    await bot(t.gender);
    S.demo.gender=await askChoice(GENDERS.map(g=>({label:t.genders[g],value:g})));
  },
  async nationality(){
    await bot(t.nat);
    S.demo.nationality=await askCountry();
  },
  async major(){
    await bot(t.major);
    S.demo.major=await askText({id:"in-major",placeholder:t.majorPh,validate:v=>{
      if(!v)return{error:t.majorErrEmpty};if(v.length>40)return{error:t.majorErrLong};return{value:v,display:v};}});
  },
  async habit(){
    await bot(t.habit);
    S.demo.replyHabit=await askDuration({id:"in-habit",allowZero:true,hint:t.habitHint});
  },
  async thr(r,again){
    if(again)await bot(t.thrAgain);
    await bot(t.thrAsk(rel(r.key)),500);
    S.demo.threshold[r.key]=await askDuration({id:"in-thr-"+r.key,allowZero:false});
  }
};

async function runIntro(){
  await bot(t.hello);
  await bot(t.about);
  await bot(t.steps);
  await bot(t.privacy);
  await askConsent();
  S.consentAt=new Date().toISOString();
  if(!await serverGate())return;

  await Q.age();
  await Q.gender();
  if(S.lang==="en")await Q.nationality();
  await Q.major();
  await Q.habit();
  await bot(t.thrIntro);
  await bot(t.thrAssume,600);
  S.demo.threshold={};
  for(const r of RELS)await Q.thr(r);
  await review();
  await bot(t.toScenario);
  await bot(t.fourSits,500);
  if(t.oneHint)await bot(t.oneHint);
  await askChoice([{label:t.startScen,value:true,primary:true}]);
  S.idx=0;S.scenarioStartedAt=new Date().toISOString();
  startScenario();
}
// Both consent options look the same and neither is focused; declining can be reconsidered (nothing is stored).
async function askConsent(){
  for(;;){
    await bot(t.consentQ,500);
    if(await askChoice([{label:t.agree,value:true},{label:t.disagree,value:false}],{focus:false}))return;
    S.phase="declined";
    await bot(t.declined);
    await askChoice([{label:t.reconsider,value:true}],{hint:t.declinedHint,focus:false});
    S.phase="intro";
  }
}
// Make sure this view can actually save before asking anything else.
async function serverGate(){
  const h=hintEl(t.connecting);composer().append(h);settle();
  const t0=Date.now();const tick=setInterval(()=>{h.textContent=t.connectingSec(Math.round((Date.now()-t0)/1000))},1000);
  let chk=await checkSaving();clearInterval(tick);h.remove();
  while(!chk.ok&&chk.retry){
    await bot(t.slowServer);
    await askChoice([{label:t.retry,value:true,primary:true}],{hint:t.errDetail(chk.detail)});
    const w=hintEl(t.reconnecting);composer().append(w);settle();
    chk=await checkSaving();w.remove();
  }
  if(!chk.ok){await bot(chk.message);composer().append(hintEl(t.ended));return false}
  return true;
}
// Long wait for a slow-but-alive server (cold start); stop early when offline or after two network errors in a row.
async function checkSaving(){
  if(!ENDPOINT)return{ok:false,message:t.serverFail};
  let lastErr="",netFails=0;
  const start=Date.now();
  while(Date.now()-start<120000){
    if(navigator.onLine===false)return{ok:false,retry:true,message:t.serverFail,detail:t.errOffline};
    try{const r=await callEndpoint("GET");if(r&&r.ok===true)return{ok:true};lastErr=t.errFormat;netFails=0}
    catch(e){lastErr=errText(e);if(e&&e.name==="TypeError"){if(++netFails>=2)return{ok:false,retry:true,message:t.serverFail,detail:lastErr}}else netFails=0}
    await sleep(3000);
  }
  return{ok:false,retry:true,message:t.serverFail,detail:lastErr};
}

/* ---------- review / edit step ---------- */
function summaryText(){
  const d=S.demo;
  return t.summary({age:t.ageEcho(d.age),gender:t.genders[d.gender],nationality:natText(d.nationality||""),major:d.major,
    habit:durText(d.replyHabit),thr:RELS.map(r=>[relChip(rel(r.key)),durText(d.threshold[r.key])])});
}
async function review(){
  for(;;){
    await bot(summaryText(),700);
    if(await askChoice([{label:t.confirmYes,value:true,primary:true},{label:t.confirmEdit,value:false}]))return;
    await bot(t.whichEdit,400);
    const items=["age","gender"].concat(S.lang==="en"?["nationality"]:[],["major","habit"]).map(k=>({label:t.editItems[k],value:k}))
      .concat(RELS.map(r=>({label:t.editThr(relChip(rel(r.key))),value:"thr:"+r.key})),[{label:t.editCancel,value:"",quiet:true}]);
    const k=await askChoice(items);
    if(k.startsWith("thr:"))await Q.thr(RELS.find(r=>"thr:"+r.key===k),true);
    else if(k)await Q[k](true);
  }
}

/* ================= SCENARIO: messenger + survey sheet ================= */
// One extra history entry so the phone's back gesture goes to the previous trial instead of leaving.
// guarded = the current entry is that guard (also true after a reload while on it).
const onGuard=()=>!!(history.state&&history.state.survey==="guard");
let guarded=onGuard(),submitting=false,live=null;
function ensureGuard(){if(!guarded){try{history.pushState({survey:"guard"},"")}catch(e){}guarded=true}}
addEventListener("popstate",()=>{
  const was=guarded;guarded=onGuard();
  // a guard left over from a reload mid-scenario: one Back press leaves (instead of only popping the guard)
  if(S.phase!=="scenario"){if(was&&!guarded&&S.phase!=="done")history.back();return}
  if(guarded)return;
  if(submitting){ensureGuard();return}
  if(S.idx>0){S.idx--;saveProgress();scenarioScreen(true)}
  else history.back();
});
function startScenario(){S.phase="scenario";saveProgress();scenarioScreen(false)}
function announce(text){
  if(!live){live=$("div",{class:"sr",role:"status","aria-live":"polite"});document.body.append(live)}
  live.textContent="";setTimeout(()=>{live.textContent=text},60);
}

function scenarioScreen(moved){
  ensureGuard();setApp("wide");
  const tr=TRIALS[S.idx],s=tr.s,r=rel(tr.r.key),sd=t.sits[s.n],key=trialKey(S.idx),ri=RELS.indexOf(tr.r);
  const ans=S.trials[key]||(S.trials[key]={concern:null,reason:null,other:""});
  const scr=$("section",{class:"screen",id:"scenario"});

  // phone
  const phone=$("div",{class:"phone",role:"group","aria-label":t.phoneLabel(r.contact)});
  phone.append(
    $("div",{class:"status"},$("span",null,sd.nowTime),$("span",{class:"right"},$("span",null,sd.nowDate),$("span",{html:ICON.battery,"aria-hidden":"true"}))),
    $("header",{class:"chatbar"},$("span",{class:"deco",html:ICON.back,"aria-hidden":"true"}),$("span",{class:"title fade"},r.contact),$("span",{class:"deco",html:ICON.search,"aria-hidden":"true"}),$("span",{class:"deco",html:ICON.menu,"aria-hidden":"true"})),
    $("div",{class:"chatarea"},
      $("div",{class:"daypill"},sd.sentDay),
      $("div",{class:"row me fade"},
        $("div",{class:"meta"},s.read?null:$("span",{class:"unread","aria-label":t.unread},"1"),$("span",null,sd.sentTime)),
        $("div",{class:"bubble"},r.msg))),
    $("div",{class:"fakeinput","aria-hidden":"true"},$("span",{html:ICON.plus}),$("span",null,t.fakeInput)));

  // sheet
  const sheet=$("form",{class:"sheet",novalidate:true,onsubmit:e=>{e.preventDefault();next()}});
  const head=$("h2",{tabindex:"-1"},t.progSit(s.n));
  sheet.append($("div",{class:"progress"},
    $("div",{class:"top"},head,$("span",null,t.progCount(S.idx+1,TRIALS.length))),
    $("div",{class:"track","aria-hidden":"true"},$("i",{style:"width:"+(S.idx/TRIALS.length*100)+"%"})),
    $("div",{class:"rels"},RELS.map((x,i)=>$("span",{class:"rel"+(i<ri?" done":"")+(i===ri?" now":"")},(i<ri?"✓ ":"")+relChip(rel(x.key)))))));
  if(ri===0)sheet.append($("div",{class:"notice"},s.n===1?t.notice1:t.noticeNew));
  sheet.append($("div",{class:"sit"},
    $("div",{class:"sit-time"},
      $("div",null,$("span",null,t.sentAt),$("b",null,sd.sentShort)),
      $("div",{class:"arrow","aria-hidden":"true"},"→"),
      $("div",null,$("span",null,t.now),$("b",null,t.nowValue(sd.nowTime)))),
    $("div",{class:"sit-sum"},parts(t.sitSum({dur:sd.dur,read:s.read})))));
  const guide=$("p",{class:"guide"},parts(t.guide({label:r.label,key:r.key,rel:r,dur:sd.dur,elapsed:s.elapsed,read:s.read})));
  sheet.append(guide);

  // Q1
  const q1=$("fieldset",{class:"q"});
  const scale=$("div",{class:"scale",role:"radiogroup","aria-labelledby":"q1h"});
  for(let i=1;i<=10;i++){
    scale.append($("button",{type:"button",role:"radio","aria-checked":String(ans.concern===i),"aria-label":t.scaleLabel(i),onclick:()=>{
      ans.concern=i;scale.querySelectorAll("button").forEach((b,j)=>b.setAttribute("aria-checked",String(j+1===i)));clearErr(q1);saveProgress()}},String(i)));
  }
  q1.append($("h3",{id:"q1h"},$("span",{class:"ctx"},t.q1ctx({dur:sd.dur,read:s.read})),t.q1),scale,$("div",{class:"ends"},$("span",null,t.anchorLow),$("span",null,t.anchorHigh)));

  // Q2
  const q2=$("fieldset",{class:"q"});
  const grp=s.read?"read":"unread";
  const opts=$("div",{class:"opts",role:"radiogroup","aria-labelledby":"q2h"});
  const other=$("input",{class:"other",id:"other-"+key,type:"text",maxlength:"200",placeholder:t.otherPh,"aria-label":t.otherPh,value:ans.other,hidden:ans.reason!=="other"});
  other.addEventListener("input",()=>{ans.other=other.value;if(other.value.trim())clearErr(q2);saveProgress()});
  REASONS[grp].forEach(code=>{
    opts.append($("button",{type:"button",class:"opt",role:"radio","aria-checked":String(ans.reason===code),"data-code":code,onclick:()=>{
      ans.reason=code;opts.querySelectorAll(".opt").forEach(b=>b.setAttribute("aria-checked",String(b.dataset.code===code)));
      other.hidden=code!=="other";if(code==="other")other.focus();clearErr(q2);saveProgress();}},$("span",{class:"dot"}),$("span",null,t.reasons[grp][code])));
  });
  q2.append($("h3",{id:"q2h"},t.q2,$("small",null,t.q2small)),opts,other);
  radioGroup(scale);radioGroup(opts);

  const last=S.idx===TRIALS.length-1;
  const status=$("div",{class:"msg",role:"status"});
  const nextBtn=$("button",{type:"submit",class:"btn main",id:"nextbtn"},last?t.submit:t.next);
  const nav=$("div",{class:"nav"},S.idx>0?$("button",{type:"button",class:"btn ghost",id:"prevbtn",onclick:()=>go(-1)},t.prev):null,nextBtn);
  sheet.append(q1,q2,nav,status);
  // a focused text field un-sticks the phone so the keyboard doesn't squeeze the sheet under it
  sheet.addEventListener("focusin",e=>{if(e.target.tagName==="INPUT")scr.classList.add("kbd")});
  sheet.addEventListener("focusout",e=>{if(e.target.tagName==="INPUT")scr.classList.remove("kbd")});
  scr.append(phone,sheet);app.append(scr);

  place(phone,guide);
  head.focus({preventScroll:true});
  announce(t.live(S.idx+1,TRIALS.length,relChip(r)));
  if(moved){guide.querySelector(".who").classList.add("pulse");sheet.querySelector(".rel.now").classList.add("pulse")}

  function clearErr(q){q.classList.remove("invalid");const e=q.querySelector(".qerr");if(e)e.remove()}
  function setErr(q,msg){clearErr(q);q.classList.add("invalid");q.append($("div",{class:"qerr",role:"alert"},msg))}
  function go(d){if(submitting)return;S.idx+=d;saveProgress();scenarioScreen(true)}
  async function next(){
    if(submitting)return;
    let bad=null;
    if(ans.concern==null){setErr(q1,t.errQ1);bad=bad||q1}
    if(!ans.reason){setErr(q2,t.errQ2);bad=bad||q2}
    else if(ans.reason==="other"&&!ans.other.trim()){setErr(q2,t.errOther);bad=bad||q2}
    if(bad){bad.scrollIntoView({behavior:reduce?"auto":"smooth",block:"center"});return}
    if(!last)return go(1);
    const btns=[...nav.querySelectorAll("button")];
    submitting=true;btns.forEach(b=>b.disabled=true);q1.disabled=q2.disabled=true;
    nextBtn.textContent=t.saving;status.className="msg";status.textContent=t.savingHint;
    status.scrollIntoView({block:"nearest"});  // submit is tapped at the bottom: keep the hint/error on screen
    const res=await submit();
    submitting=false;
    if(res.ok){
      S.phase="done";store.del(PROGRESS_KEY);endScreen();
      if(guarded){guarded=false;history.back()}  // drop the guard entry so Back leaves normally
    }else{btns.forEach(b=>b.disabled=false);q1.disabled=q2.disabled=false;nextBtn.textContent=t.resubmit;status.className="msg bad";status.textContent=res.message;status.scrollIntoView({block:"nearest"})}
  }
}
// After 다음/이전 (instant, no smooth scroll).
// Phone layout, phone sticky on top: new situation → top (on short phones only as far as the Q1 scale needs,
// never past the notice); otherwise the guide sentence right under the phone.
// Wide layout (phone in its own sticky column): top, unless the Q1 scale doesn't fit (landscape phones):
// then only as far as it needs, never past the notice / guide.
// Short screens (phone not sticky): top, so the phone (the stimulus that just changed) stays in view.
function place(phone,guide){
  const abs=el=>el.getBoundingClientRect().top+window.scrollY,ends=document.querySelector(".ends"),need=abs(ends)+ends.offsetHeight+8-window.innerHeight;
  const wide=WIDE.matches,overlay=!wide&&getComputedStyle(phone).position==="sticky",off=overlay?phone.getBoundingClientRect().height:0;
  const first=S.idx%4===0,n=document.querySelector(".notice");
  // keyboard focus moving up must not land under the sticky phone
  document.documentElement.style.scrollPaddingTop=overlay?off+12+"px":"";
  const y=overlay?(first?Math.min(need,abs(n)-off-6):abs(guide)-off-12)
    :wide?Math.min(need,abs(first?n:guide)-12):0;
  window.scrollTo(0,Math.max(0,y));
}
// ARIA radio group: one Tab stop (the checked option, else the first); arrow keys move and select.
function radioGroup(group){
  const radios=()=>[...group.querySelectorAll("[role=radio]")];
  const rove=()=>{const b=radios(),c=b.find(x=>x.getAttribute("aria-checked")==="true")||b[0];b.forEach(x=>x.tabIndex=x===c?0:-1)};
  group.addEventListener("click",rove);
  group.addEventListener("keydown",e=>{
    const d={ArrowRight:1,ArrowDown:1,ArrowLeft:-1,ArrowUp:-1}[e.key];if(!d)return;
    const b=radios(),i=b.indexOf(document.activeElement);if(i<0)return;
    e.preventDefault();const n=b[(i+d+b.length)%b.length];n.focus();n.click();
  });
  rove();
}

/* ================= submit ================= */
// Stored values stay canonical Korean whatever the display language (reason_label from the Korean table).
function buildRecord(){
  const K=I18N.ko.reasons;
  const trials=TRIALS.map((tr,i)=>{const a=S.trials[trialKey(i)];const g=tr.s.read?"read":"unread";
    return{order:i+1,situation:tr.s.n,elapsed:tr.s.elapsed,read_status:g,relation:tr.r.key,
      concern:a.concern,reason_code:a.reason,reason_label:(a.reason&&K[g][a.reason])||"",reason_other:a.reason==="other"?a.other.trim():""}});
  const now=new Date();
  return{anon_id:S.anonId,version:VERSION,lang:S.lang,consent:true,consent_at:S.consentAt,started_at:S.startedAt,submitted_at:now.toISOString(),
    duration_sec:Math.round((now-new Date(S.startedAt))/1000),
    age:S.demo.age,gender:S.demo.gender,nationality:S.lang==="en"?S.demo.nationality||"":"",major:S.demo.major,reply_habit:S.demo.replyHabit,threshold:S.demo.threshold,trials};
}
async function submit(){
  const rec=buildRecord();
  let lastErr="";
  for(let attempt=0;attempt<3;attempt++){
    try{
      const r=await callEndpoint("POST",rec);
      if(r&&r.ok===true&&r.anon_id===rec.anon_id){store.set(DONE_KEY,rec.anon_id);return{ok:true}}
      if(r&&r.error==="invalid")return{ok:false,message:t.submitInvalid};
      lastErr=(r&&r.error)||t.errConfirm;
    }catch(e){lastErr=errText(e)}
    if(attempt<2)await sleep(1500*(attempt+1)+Math.random()*800);
  }
  return{ok:false,message:t.submitFail(lastErr)};
}

/* ================= end ================= */
function endScreen(){
  setApp("");
  app.append($("section",{class:"screen",id:"end"},$("div",{class:"center"},
    $("div",{class:"mark",html:ICON.check,"aria-hidden":"true"}),
    $("h1",null,t.thanks),
    $("p",null,t.saved),
    $("div",{class:"idbox"},t.respId(S.anonId)),
    $("p",{style:"font-size:13px"},t.deleteNote))));
  window.scrollTo(0,0);
}

/* ================= boot ================= */
function start(){pickerScreen();warmUp()}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);else start();
})();
