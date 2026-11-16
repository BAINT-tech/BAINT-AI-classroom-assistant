/* ══════════════════════════════════════════════════════════════════════════
   BAINT LEARNING DISCOVERY ENGINE (BLDE)  -  blde.js
   Loads AFTER engine.js. Wraps BAINT_ENGINE.answer; maths, greetings and exact lessons pass straight through.
   1 Local lesson search first (existing engine)      2 Concept recognition (subject, topic, concept)
   3 Discovery in OPEN resources (Wikipedia/Wikibooks API - no key, no cost, CORS-enabled)
   4 Honest status when offline / slow / nothing found  5 IndexedDB: query cache + review queue
   Nothing discovered is added to the permanent library without approval (see review.html).
   ══════════════════════════════════════════════════════════════════════════ */
(function(){
"use strict";
const DAY=864e5, TIMEOUT=6500, DB_NAME="baint_blde";

/* ---------- storage (IndexedDB, with in-memory fallback so nothing ever crashes) ---------- */
const mem={discoveries:new Map(),qcache:new Map()};
let dbp=null;
function db(){
  if(dbp)return dbp;
  dbp=new Promise((res,rej)=>{
    if(typeof indexedDB==="undefined"||!indexedDB)return rej(new Error("no-idb"));
    const r=indexedDB.open(DB_NAME,1);
    r.onupgradeneeded=()=>{const d=r.result;d.createObjectStore("discoveries",{keyPath:"id"});d.createObjectStore("qcache",{keyPath:"key"})};
    r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error);
  });
  return dbp;
}
function run(store,mode,fn){
  return db().then(d=>new Promise((res,rej)=>{
    const t=d.transaction(store,mode),s=t.objectStore(store),req=fn(s);
    t.oncomplete=()=>res(req&&"result" in req?req.result:undefined);t.onerror=()=>rej(t.error);t.onabort=()=>rej(t.error);
  }));
}
const keyOf=s=>s==="discoveries"?"id":"key";
const put=(s,o)=>run(s,"readwrite",x=>x.put(o)).catch(()=>{mem[s].set(o[keyOf(s)],o)});
const get=(s,k)=>run(s,"readonly",x=>x.get(k)).catch(()=>mem[s].get(k));
const all=s=>run(s,"readonly",x=>x.getAll()).catch(()=>[...mem[s].values()]);
const del=(s,k)=>run(s,"readwrite",x=>x.delete(k)).catch(()=>{mem[s].delete(k)});

/* ---------- text helpers ---------- */
const norm=v=>String(v||"").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[’‘]/g,"'").replace(/[^a-z0-9 ]/g," ").replace(/\s+/g," ").trim();
const stem=w=>w.replace(/ies$/,"y").replace(/(es|s)$/,"");
const STOP=new Set("the and for with what how why does did you can please tell about explain give show this that are was were from into have has its their them they than then when which who whom also much many some any more most very just like between relationship relation connection link related effect effects affect affects role importance work works working happen happens meaning mean define definition describe describe state outline example examples step steps simple simply easy detail detailed advantages advantage disadvantages disadvantage uses used student students class grade school exam question answer notes topic lesson short long brief understand learn teach help need want know thing things way make makes made does using use between different difference compare comparison versus".split(" "));
const toks=s=>norm(s).split(" ").filter(w=>w.length>2).map(stem);
const content=q=>{const seen=new Set(),out=[];for(const w of norm(q).split(" ")){if(w.length<4)continue;const s=stem(w);if(STOP.has(w)||STOP.has(s)||seen.has(s))continue;seen.add(s);out.push({w,s})}return out};
const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
const sentences=t=>String(t||"").replace(/\s+/g," ").split(/(?<=[.!?])\s+(?=[A-Z0-9])/).map(s=>s.trim()).filter(s=>s.length>3);
const NAMES={math:"Mathematics",english:"English",biology:"Biology",chemistry:"Chemistry",history:"History",computer:"Computer Science",biochemistry:"Biochemistry",histology:"Histology",enzymology:"Advanced Enzymology",purine_pyrimidine:"Purine & Pyrimidine Biosynthesis",cholesterol:"Cholesterol Biosynthesis",engineering:"Engineering",physics:"Physics",economics:"Economics",geography:"Geography",government:"Government"};
const SEEDS={math:"equation algebra geometry trigonometry calculus derivative integral matrix vector probability statistics fraction percentage logarithm sine cosine triangle polynomial function graph",
english:"grammar noun verb adjective adverb tense sentence paragraph essay comprehension vocabulary synonym antonym metaphor simile poem novel character theme plot",
biology:"cell organism photosynthesis respiration genetics dna evolution ecosystem habitat reproduction nervous digestion circulation plant animal bacteria virus vaccine immune",
chemistry:"atom molecule element compound reaction acid base salt bond ionic covalent periodic mole oxidation reduction organic solution",
history:"war revolution empire colonial independence treaty ancient medieval dynasty civilization king battle century",
computer:"algorithm programming code variable loop function database network internet software hardware binary python javascript",
biochemistry:"protein enzyme amino carbohydrate lipid metabolism glycolysis atp vitamin membrane glucose",
histology:"tissue epithelium connective muscle stain microscope slide section",
enzymology:"enzyme substrate kinetics inhibitor michaelis menten catalysis cofactor active site",
purine_pyrimidine:"purine pyrimidine nucleotide adenine guanine cytosine thymine uracil nucleic",
cholesterol:"cholesterol lipoprotein ldl hdl statin steroid bile",
engineering:"design stress strain load beam circuit mechanical electrical civil tolerance material",
physics:"force motion velocity acceleration energy momentum gravity wave light electricity magnetism pressure quantum",
economics:"demand supply price market inflation gdp trade scarcity monopoly budget tax",
geography:"climate weather map continent river mountain population erosion latitude plate volcano earthquake",
government:"democracy constitution parliament election law rights citizen legislature judiciary"};

/* ---------- 2. intelligent recognition: subject, topic, concept ---------- */
let IX=null;
function lessons(){return (typeof EDU_LESSONS!=="undefined"&&Array.isArray(EDU_LESSONS))?EDU_LESSONS:[]}
function index(){
  if(IX&&IX.n===lessons().length)return IX;
  const docs=lessons().map(l=>({l,title:new Set(toks([l.title].concat(l.aliases||[]).join(" "))),
    body:new Set(toks([l.meaning,l.think,(l.steps||[]).join(" "),l.example,l.uses,l.summary,(l.adv||[]).join(" "),(l.dis||[]).join(" ")].join(" ")))}));
  const df={};docs.forEach(d=>new Set([...d.title,...d.body]).forEach(t=>df[t]=(df[t]||0)+1));
  const N=docs.length||1, idf=t=>Math.log(1+N/(df[t]||.5));
  const seeds={};for(const k in SEEDS)seeds[k]=new Set(toks(SEEDS[k]));
  IX={n:lessons().length,docs,idf,seeds};return IX;
}
const dscore=(d,qs,ix)=>qs.reduce((a,t)=>a+ix.idf(t)*(d.title.has(t)?3:d.body.has(t)?1:0),0);
function recognize(q,current){
  const ix=index(), cw=content(q), qs=cw.map(x=>x.s);
  const per={};let top=null;
  for(const d of ix.docs){
    const s=dscore(d,qs,ix); if(!s)continue;
    (per[d.l.subject]=per[d.l.subject]||[]).push(s);
    if(!top||s>top.s)top={d,s};
  }
  const sc={};
  for(const k in ix.seeds)sc[k]=qs.filter(t=>ix.seeds[k].has(t)).length*3;
  for(const k in per){const a=per[k].sort((x,y)=>y-x);sc[k]=(sc[k]||0)+a[0]+(a[1]||0)*.5}
  const ranked=Object.entries(sc).filter(x=>x[1]>0).sort((a,b)=>b[1]-a[1]);
  const subject=ranked.length?ranked[0][0]:current||null;
  const conf=ranked.length?ranked[0][1]/(ranked[0][1]+(ranked[1]?ranked[1][1]:0)+1):0;
  const topic=top&&top.s>=6?top.d.l:null;
  const tt=topic?index().docs.find(d=>d.l===topic).title:new Set();
  const concept=cw.filter(x=>!tt.has(x.s)).map(x=>x.w);
  return {subject,conf,topic,topicScore:top?top.s:0,concept,words:cw.map(x=>x.w)};
}
const recogLine=r=>{
  const bits=[r.subject&&NAMES[r.subject],r.topic&&r.topic.title,r.concept.length&&(r.topic?r.concept.slice(0,2).join(" and "):r.concept.slice(0,3).join(" "))].filter(Boolean);
  return bits.length>1?"I recognised this as "+bits.join(" › ")+".":"";
};

/* ---------- 3. discovery in open educational resources ---------- */
const SOURCES=[{id:"Wikipedia",host:"en.wikipedia.org"},{id:"Wikibooks",host:"en.wikibooks.org"}];
async function fetchJSON(url,ms){
  const ctl=typeof AbortController!=="undefined"?new AbortController():null, timer=setTimeout(()=>ctl&&ctl.abort(),ms);
  try{const r=await fetch(url,{signal:ctl&&ctl.signal});if(!r.ok)throw new Error("http "+r.status);return await r.json()}
  finally{clearTimeout(timer)}
}
function wikiUrl(host,query){
  return "https://"+host+"/w/api.php?action=query&format=json&origin=*&generator=search&gsrnamespace=0&gsrlimit=4&gsrsearch="+encodeURIComponent(query)+
    "&prop=extracts%7Cinfo&exintro=1&explaintext=1&exlimit=4&exsentences=6&inprop=url";
}
async function searchSource(src,query){
  const j=await fetchJSON(wikiUrl(src.host,query),TIMEOUT), pages=j&&j.query&&j.query.pages?Object.values(j.query.pages):[];
  return pages.filter(p=>p.extract&&p.extract.length>60&&!/may refer to|disambiguation/i.test(p.extract.slice(0,300)))
    .map(p=>({title:p.title,explanation:p.extract.trim(),source:src.id,url:p.fullurl||("https://"+src.host+"/wiki/"+encodeURIComponent(p.title.replace(/ /g,"_"))),
      license:"CC BY-SA 4.0",index:p.index||9}));
}
function relevance(item,words){
  const bag=new Set(toks(item.title+" "+item.explanation)), tt=new Set(toks(item.title));
  const ws=words.map(stem); if(!ws.length)return 0;
  const hit=ws.filter(w=>bag.has(w)).length/ws.length, th=ws.filter(w=>tt.has(w)).length/ws.length;
  return hit*0.7+th*0.3-(item.index-1)*0.02;
}
const keyFor=words=>words.map(stem).sort().join("+");
async function discover(q,rec){
  const words=rec.words.length?rec.words:content(q).map(x=>x.w);
  if(!words.length)return {status:"none",items:[]};
  const key=keyFor(words), cached=await get("qcache",key);
  const online=typeof navigator==="undefined"||navigator.onLine!==false;
  if(!online)return cached?{status:"cache",items:cached.items,date:cached.date}:{status:"offline",items:[]};
  if(cached&&Date.now()-cached.date<7*DAY)return {status:"cache",items:cached.items,date:cached.date,fresh:true};
  const query=words.slice(0,6).join(" ")+(rec.topic&&!words.some(w=>stem(w)===stem(norm(rec.topic.title)))?" "+rec.topic.title:"");
  const res=await Promise.allSettled(SOURCES.map(s=>searchSource(s,query)));
  const ok=res.filter(r=>r.status==="fulfilled");
  if(!ok.length){
    const slow=res.some(r=>r.reason&&(r.reason.name==="AbortError"||/abort|timeout/i.test(String(r.reason))));
    return cached?{status:"cache",items:cached.items,date:cached.date}:{status:slow?"slow":"failed",items:[]};
  }
  const items=[].concat(...ok.map(r=>r.value)).map(i=>({...i,rel:relevance(i,words)})).filter(i=>i.rel>=0.4).sort((a,b)=>b.rel-a.rel).slice(0,3);
  if(!items.length)return {status:"none",items:[]};
  await put("qcache",{key,query:q,items,date:Date.now()});
  for(const i of items){
    const id=norm(i.source+" "+i.title).replace(/ /g,"-"), old=await get("discoveries",id);
    if(!old)await put("discoveries",{id,subject:rec.subject||"",topic:rec.topic?rec.topic.title:i.title,title:i.title,explanation:i.explanation,source:i.source,url:i.url,license:i.license,date:Date.now(),query:q,status:"pending"});
  }
  return {status:"ok",items};
}
async function approvedMatch(words){
  const ws=words.map(stem); if(ws.length<1)return null;
  const rows=(await all("discoveries")).filter(r=>r.status==="approved");
  let best=null;
  for(const r of rows){const bag=new Set(toks(r.title+" "+r.topic+" "+r.explanation));
    const cov=ws.filter(w=>bag.has(w)).length/ws.length;if(cov>=0.6&&(!best||cov>best.cov))best={r,cov}}
  return best&&best.r;
}

/* ---------- 4. presenting answers: structured, sourced, honest ---------- */
const hintFor=(it,extra)=>"Source: "+it.source+" – “"+it.title+"” ("+it.url.replace(/^https?:\/\//,"")+", "+it.license+"). UNVERIFIED: not checked by BAINT, so confirm with your teacher or textbook."+(extra?" "+extra:"");
function webReply(d,rec,q){
  const it=d.items[0], ss=sentences(it.explanation), rl=recogLine(rec);
  const r={lead:it.title+"  ·  from open resources",
    text:(rl?rl+"\n\n":"")+(ss[0]||it.explanation),
    steps:ss.slice(1,4).map(x=>({text:x})),
    hint:hintFor(it,d.status==="cache"?"Saved copy from "+new Date(d.date).toLocaleDateString()+".":""),
    suggestions:[]};
  if(d.items[1])r.hint+=" Also see: "+d.items[1].source+" – “"+d.items[1].title+"”.";
  if(rec.topic)r.suggestions.push("Explain "+rec.topic.title);
  if(rec.subject&&rec.conf>.55)r.subject=rec.subject;
  return r;
}
function noSearchReply(kind,rec,E,cur){
  const rl=recogLine(rec);
  const msg={
    offline:"You are offline, so I could not search open educational resources, and I will not guess. When you are back online, ask this again.",
    slow:"The connection is too weak to search open resources right now. Try again in a moment.",
    failed:"I could not reach the open educational resources just now. Try again shortly.",
    none:"I searched open educational resources and found nothing relevant enough, so I will not guess. Try the topic name or one key term."}[kind];
  const sg=[];
  if(rec.topic)sg.push("Explain "+rec.topic.title);
  (E.suggest?E.suggest(rec.subject||cur):[]).slice(0,3).forEach(x=>{if(sg.indexOf(x)<0)sg.push(x)});
  return {lead:kind==="offline"?"I can’t search online right now":"I could not find that in the library",text:(rl?rl+"\n\n":"")+msg,suggestions:sg.slice(0,4)};
}

/* ---------- main wrapper ---------- */
function install(E){
  if(!E||E.__blde)return;
  const base=E.answer.bind(E);
  E.answer=function(question,ctx){
    ctx=ctx||{};
    const raw=String(question||"").trim(), cur=ctx.subject||"math";
    const forced=/^search (online|open) resources for\s+/i.test(raw);
    const q=raw.replace(/^search (online|open) resources for\s+/i,"");
    const r=base(q,ctx);
    try{
      if(!r||r.topic)return r;                                         // maths / numeric solver: untouched
      const lf=E.lastFound&&E.lastFound();
      const fallback=r.lead==="I do not have that one yet";
      if(r.lead==="That is outside BAINT’s lessons")return r;           // live news / trivia: never searched, never guessed
      if(!lf&&!fallback&&!forced)return r;                              // greetings, follow-ups etc.
      const rec=recognize(q,cur);
      /* A. a lesson matched: does the student ask about a concept the lesson covers? */
      if(lf&&!forced){
        const L=lessons().find(l=>l.id===lf.id); if(!L)return r;
        const d=index().docs.find(x=>x.l===L), term=new Set(toks(lf.term||""));
        const C=content(q).filter(x=>!d.title.has(x.s)&&!term.has(x.s)&&x.w.length>=4);
        if(!C.length)return r;
        const cov=C.filter(x=>d.body.has(x.s)), unc=C.filter(x=>!d.body.has(x.s));
        if(cov.length){
          const set=new Set(cov.map(x=>x.s));
          const pool=[].concat(sentences(L.meaning),sentences(L.think),(L.steps||[]).map(String),sentences(L.example),sentences(L.uses),(L.adv||[]),(L.dis||[]),sentences(L.summary));
          const hit=[...new Set(pool.filter(s=>toks(s).some(t=>set.has(t))))].slice(0,4);
          if(hit.length){
            const out={lead:L.title+": "+cov.map(x=>x.w).slice(0,2).join(" and "),
              text:(recogLine({...rec,topic:L,concept:cov.map(x=>x.w)})||"")+"\n\n"+hit.join(" "),
              check:L.summary,hint:"From the BAINT library (verified)."+(unc.length?" The lesson does not mention: "+unc.map(x=>x.w).join(", ")+".":""),
              suggestions:(unc.length?["Search open resources for "+q]:[]).concat(r.suggestions||[]).slice(0,4)};
            return out;
          }
        }
        if(!unc.length)return r;
        return discoverAsync(q,{...rec,topic:L,concept:unc.map(x=>x.w),words:unc.map(x=>x.w).concat(L.title.toLowerCase().split(" "))},E,cur,r,L);
      }
      /* B. no lesson matched (or student asked to search): discover */
      return discoverAsync(q,rec,E,cur,null,null);
    }catch(e){console.warn("BLDE error",e);return r}
  };
  E.__blde=true;
}
async function discoverAsync(q,rec,E,cur,lessonReply,L){
  try{
    const ap=await approvedMatch(rec.words);
    if(ap){const ss=sentences(ap.explanation);
      return {lead:ap.title+"  ·  approved resource",text:(recogLine(rec)?recogLine(rec)+"\n\n":"")+(ss[0]||ap.explanation),steps:ss.slice(1,4).map(x=>({text:x})),
        hint:"Approved by the BAINT team. Source: "+ap.source+" – “"+ap.title+"” ("+ap.url.replace(/^https?:\/\//,"")+", "+ap.license+").",suggestions:rec.topic?["Explain "+rec.topic.title]:[]}}
    const d=await discover(q,rec);
    if(d.items.length&&(d.status==="ok"||d.status==="cache"))return webReply(d,rec,q);
    if(lessonReply){const o={...lessonReply};
      o.hint=(o.hint?o.hint+" ":"")+(d.status==="offline"?"Offline: I could not search for “"+rec.concept.join(", ")+"”, which this lesson does not cover.":d.status==="slow"?"The connection was too weak to search for “"+rec.concept.join(", ")+"”.":"This lesson does not cover “"+rec.concept.join(", ")+"”, and I found no reliable open resource.");
      return o}
    return noSearchReply(d.status,rec,E,cur);
  }catch(e){console.warn("BLDE discovery error",e);return noSearchReply("failed",rec,E,cur)}
}

/* ---------- 5. review API (used by review.html) ---------- */
const API={
  version:"1.0",
  list:async status=>(await all("discoveries")).filter(r=>!status||r.status===status).sort((a,b)=>b.date-a.date),
  setStatus:async(id,status,edits)=>{const r=await get("discoveries",id);if(!r)return null;Object.assign(r,edits||{},{status,reviewed:Date.now()});await put("discoveries",r);return r},
  remove:id=>del("discoveries",id),
  exportJSON:async()=>JSON.stringify(await all("discoveries"),null,1),
  importJSON:async text=>{const a=JSON.parse(text);let n=0;for(const r of Array.isArray(a)?a:[]){if(!r||!r.id||!r.title)continue;const old=await get("discoveries",r.id);if(!old){await put("discoveries",r);n++}}return n},
  /* approved items -> a lessons file you commit to GitHub (permanent library) */
  exportLessonsJS:async()=>{
    const rows=await API.list("approved");
    const q=s=>JSON.stringify(String(s||""));
    const body=rows.map(r=>{
      const id="disc_"+norm(r.title).replace(/ /g,"_").slice(0,40), ss=sentences(r.explanation);
      return "eduAdd("+q(id)+","+q(r.subject||"biology")+",[],"+q(r.title)+","+JSON.stringify([norm(r.title)].concat(norm(r.topic)!==norm(r.title)?[norm(r.topic)]:[]))+",\n "+
        q(ss.slice(0,2).join(" "))+",\"\","+JSON.stringify(ss.slice(2,6))+",\"\",\"\",[],[],"+q(ss[0]||"")+"); /* source: "+r.source+" "+r.url+" ("+r.license+"), approved */";
    }).join("\n");
    return "/* BAINT lessons-approved.js - generated from approved BLDE discoveries (review.html). Attribution: text from Wikipedia/Wikibooks, CC BY-SA 4.0. */\n(function(){ if(typeof eduAdd!==\"function\")return;\n"+body+"\n})();\n";
  },
  recognize:(q,cur)=>recognize(q,cur),
  discover:(q,cur)=>discover(q,recognize(q,cur))
};
window.BLDE=API;
if(window.BAINT_ENGINE)install(window.BAINT_ENGINE);
})();
