/* ══════════════════════════════════════════════════════════════════════════
   BAINT ANSWER ENGINE v2  (engine.js)  - loads AFTER lessons.js, solver.js and the bridge.
   Fixes: same answer for every alias, wrong subject, modes that looked identical,
   chips that were just alias spellings, and empty Economics / Geography / Government.
   Needs no network. Still uses baintSolve() for maths problems.
   ══════════════════════════════════════════════════════════════════════════ */
(function(){
"use strict";

/* ---------- extra lessons for subjects that had none ---------- */
if(typeof eduAdd==="function"){
eduAdd("supply_demand","economics",[],"Supply and Demand",
 ["supply and demand","supply","demand","price","market","scarcity","equilibrium","law of demand","law of supply"],
 "Demand is how much of something buyers want at each price. Supply is how much sellers offer at each price. Where the two meet, the market settles on a price and a quantity.",
 "Think of a market stall: if everyone wants mangoes and few are on sale, the seller raises the price. If mangoes pile up, the price drops.",
 ["Higher price: buyers want less (law of demand).","Higher price: sellers offer more (law of supply).","If demand is greater than supply, there is a shortage and prices rise.","If supply is greater than demand, there is a surplus and prices fall until the market balances (equilibrium)."],
 "Rice costs $2 per kg. A drought halves the harvest, so supply falls and the price rises to $3. Some buyers switch to cassava, so the quantity bought falls.",
 "Pricing of food, rent, fuel, wages, tickets and exchange rates; also used by governments to judge taxes and subsidies.",
 ["Explains why prices change","Helps businesses decide what to produce","Helps governments predict the effect of taxes or shortages"],
 ["Assumes buyers and sellers act rationally","Real markets have monopolies and information gaps","Prices alone ignore fairness and need"],
 "Price moves until the quantity buyers want equals the quantity sellers offer.");
eduAdd("plate_tectonics","geography",["science"],"Plate Tectonics",
 ["plate tectonics","tectonic plates","earthquake","earthquakes","volcano","volcanoes","continental drift","fold mountains","plate boundaries"],
 "The Earth's outer shell is broken into large moving plates. Their slow movement builds mountains and causes earthquakes and volcanoes, mostly at the plate edges.",
 "Picture a cracked eggshell floating on a soft egg. The pieces drift, bump and slide past each other.",
 ["Plates move a few centimetres a year, driven by heat currents in the mantle.","Plates collide (convergent): mountains form or one plate sinks.","Plates pull apart (divergent): new crust forms, as on the mid-Atlantic ridge.","Plates slide past (transform): stress builds, then an earthquake releases it."],
 "The Indian plate pushing into the Eurasian plate is still raising the Himalayas. The Pacific 'Ring of Fire' has most of the world's volcanoes.",
 "Predicting earthquake and volcano risk, building codes, choosing safe sites for cities and finding minerals and geothermal energy.",
 ["Explains mountains, oceans, earthquakes and volcanoes in one theory","Guides hazard planning and construction"],
 ["Exact timing of earthquakes cannot be predicted","Movements are too slow to observe directly"],
 "Moving plates explain where mountains, earthquakes and volcanoes happen.");
eduAdd("democracy","government",["history"],"Democracy",
 ["democracy","democratic","election","elections","voting","vote","separation of powers","rule of law","citizenship","constitution"],
 "Democracy is a system of government in which power comes from the people, who choose their leaders through free and fair elections and keep the right to remove them.",
 "Think of a class choosing a monitor: everyone votes, the majority decides, and the monitor can be replaced next term.",
 ["Citizens have equal votes and rights.","Elections choose representatives for a fixed term.","Power is divided between the executive, legislature and judiciary so no one branch controls everything.","A constitution and independent courts protect rights, including those of minorities."],
 "In a presidential election, voters in each area cast ballots, votes are counted, and the winner governs until the next election. Courts can strike down laws that break the constitution.",
 "National and local elections, parliaments and councils, school councils, unions and clubs, and referendums on big decisions.",
 ["Leaders are accountable to citizens","Peaceful change of government","Protects rights and freedom of speech"],
 ["Decisions can be slow","Majority rule can overlook minorities","Voters can be misled by misinformation"],
 "In a democracy the people choose, and can change, those who govern.");
}

/* ---------- small focused answers for popular sub-terms ---------- */
const FACETS=[
 {t:["algebraic expression","algebraic expressions","expression","expressions"],id:"algebra",title:"Algebraic Expression",
  text:"An algebraic expression is a combination of numbers, variables and operations with no equals sign, such as 3x + 5. Its parts are terms (3x and 5), a coefficient (the 3), a variable (x) and a constant (5). You simplify or evaluate an expression; you only solve an equation.",
  ex:"Evaluate 3x + 5 when x = 4: 3 × 4 + 5 = 17. Simplify 2x + 3x = 5x."},
 {t:["linear equation","linear equations"],id:"algebra",title:"Linear Equations",
  text:"A linear equation has a variable raised only to the power 1, like 2x + 3 = 11, and its graph is a straight line. You solve it by undoing the operations in reverse order while keeping both sides balanced.",
  ex:"2x + 3 = 11 → 2x = 8 → x = 4. Check: 2(4) + 3 = 11."},
 {t:["variable","variables","coefficient","constant"],id:"algebra",title:"Variables, coefficients and constants",
  text:"A variable is a letter standing for a number that can change or is unknown. A coefficient is the number multiplying it, and a constant is a number on its own. In 5x + 2: x is the variable, 5 the coefficient, 2 the constant.",
  ex:"In a phone plan 10 + 2m, m is minutes used, 2 is the rate per minute, 10 is the fixed fee."},
 {t:["chlorophyll","chloroplast","chloroplasts"],id:"photosynthesis",title:"Chlorophyll",
  text:"Chlorophyll is the green pigment inside chloroplasts. It absorbs mostly red and blue light and reflects green, which is why leaves look green. The light energy it captures powers the change of carbon dioxide and water into glucose.",
  ex:"In autumn chlorophyll breaks down, so the yellow and orange pigments that were hidden become visible."}
];

/* ---------- text helpers ---------- */
const norm=v=>String(v||"").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"")
  .replace(/[’‘]/g,"'").replace(/[^a-z0-9²³%+\-*/×÷=:. ]/g," ").replace(/\s+/g," ").trim();
const stem=w=>w.replace(/ies$/,"y").replace(/(es|s)$/,"");
const toks=s=>norm(s).split(" ").filter(w=>w.length>2).map(stem);
const STOP=new Set("the and for with what how why does did you can please tell about explain give show me this that are was were from into have has its his her their them they than then when which who whom whose also much many some any more most very just like".split(" "));
const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
const sentences=t=>String(t||"").split(/(?<=[.!?])\s+|\n+/).map(s=>s.trim()).filter(Boolean);
const list=a=>a.map(x=>String(x).replace(/[.]+$/,"")).join("; ");
function lev(a,b){
  if(a===b)return 0; if(Math.abs(a.length-b.length)>2)return 9;
  let p=[...Array(b.length+1).keys()];
  for(let i=1;i<=a.length;i++){const c=[i];for(let j=1;j<=b.length;j++)c[j]=Math.min(p[j]+1,c[j-1]+1,p[j-1]+(a[i-1]===b[j-1]?0:1));p=c}
  return p[b.length];
}
const close=(a,b)=>a===b||(a.length>=5&&b.length>=5&&lev(a,b)<=(a.length>=10?2:1));
const lessons=()=>(typeof EDU_LESSONS!=="undefined"&&Array.isArray(EDU_LESSONS))?EDU_LESSONS:[];
const inSubject=(l,s)=>l.subject===s||(Array.isArray(l.also)&&l.also.indexOf(s)>-1);

/* strip question wording so "what are the advantages of algebra" scores on "algebra" */
function core(q){
  return norm(q).replace(/^(please |can you |could you |kindly )+/,"")
    .replace(/^(explain|define|describe|tell me about|tell me|what is|what are|what's|whats|what does|how does|how do|how to|why is|why do|give me|give|show me|teach me|help me with|i want to learn|i don't understand|i dont understand)\s+/,"")
    .replace(/\b(advantages?|disadvantages?|benefits?|drawbacks?|examples?|uses?|meaning|definition|summary|steps?)\s+(of|for|in)\s+/g,"")
    .replace(/\b(an?|the)\s+/g," ").replace(/\s+/g," ").trim();
}

/* score one lesson; also report which phrase matched best */
function score(l,q){
  const cq=core(q), sets=[norm(q),cq], qt=new Set(toks(q).concat(toks(cq)));
  const need=Math.max(1,toks(cq).filter(w=>!STOP.has(w)).length);
  const phrases=[l.title].concat(l.aliases||[]).map(norm).filter(Boolean);
  let best=0,term=null,cov=0;
  for(const ph of phrases){
    const sp=ph.split(" ").map(stem).join(" "), plen=ph.split(" ").filter(w=>w.length>2).length||1;
    let s=0,c=0;
    for(const x of sets){
      const sx=x.split(" ").map(stem).join(" ");
      if(sx===sp){s=Math.max(s,150+ph.length);c=1}
      else if(ph.length>=4&&(" "+sx+" ").includes(" "+sp+" ")){if(110+ph.length>s){s=110+ph.length;c=Math.min(1,plen/need)}}
    }
    if(!s){
      const pt=ph.split(" ").filter(w=>w.length>2).map(stem);
      if(pt.length){
        const hits=pt.filter(w=>qt.has(w)||[...qt].some(z=>close(z,w))).length, ratio=hits/pt.length;
        if(hits>=1&&(pt.length===1||ratio>=0.66)){s=30+hits*12+ratio*15+Math.min(ph.length,30)/10;c=Math.min(1,hits/need)*0.9}
      }
    }
    if(s>best){best=s;term=ph;cov=c}
  }
  return {score:best,term,cov};
}

function detect(q,subject){
  let top=null;
  for(const l of lessons()){
    const r=score(l,q); if(r.score<30)continue;
    const here=inSubject(l,subject);
    if(!here&&(r.score<105||r.cov<0.6))continue;      // only jump to another subject on a clear, full match
    const adj=r.score+(here?10:0);
    if(!top||adj>top.adj)top={l,adj,raw:r.score,term:r.term};
  }
  return top;
}

/* last-resort: find the lesson whose full text uses the student's words most */
function looseMatch(q,subject){
  const w=toks(core(q)).filter(x=>!STOP.has(x));
  if(!w.length)return null;
  let top=null;
  for(const l of lessons()){
    const txt=new Set(toks([l.title,l.meaning,l.think,(l.steps||[]).join(" "),l.example,l.uses,l.summary,(l.adv||[]).join(" "),(l.dis||[]).join(" ")].join(" ")));
    const hits=w.filter(x=>txt.has(x)).length;
    const s=hits/w.length+(inSubject(l,subject)?.05:0);
    if(w.length>=2&&hits>=2&&s>=.5&&(!top||s>top.s))top={l,s};
  }
  return top&&top.l;
}

/* ---------- intent: what is the student really asking for? ---------- */
const INTENTS=[
 ["advdis",/\b(advantages?\s+(and|&)\s+disadvantages?|pros?\s+(and|&)\s+cons?)\b/],
 ["dis",/\b(disadvantages?|drawbacks?|cons?|limitations?|weakness(es)?|downsides?)\b/],
 ["adv",/\b(advantages?|benefits?|pros?|strengths?)\b/],
 ["example",/\b(examples?|sample|illustrat\w*|worked)\b/],
 ["uses",/\b(uses?|used|applications?|real life|real world|importance|why (do|should) i (learn|study))\b/],
 ["steps",/\b(steps?|procedure|how (do|to|can) (i|you|we|one))\b/],
 ["simple",/\b(simple|simply|eli5|in plain|analogy|for a child|easy way)\b/],
 ["summary",/\b(summary|summari[sz]e|in short|key points?|recap|brief(ly)?)\b/]
];
const intentsOf=q=>{const s=norm(q),out=[];for(const [k,re] of INTENTS)if(re.test(s)){out.push(k);if(k==="advdis")break}return out};

/* ---------- build the reply ---------- */
const seen={};   // lesson id -> list of sections already shown, so repeats give NEW information
function focusSentences(l,term){
  const tt=toks(term).filter(x=>!toks(l.title).includes(x));
  if(!tt.length)return [];
  const pool=[].concat(sentences(l.meaning),sentences(l.think),(l.steps||[]),sentences(l.example),sentences(l.uses),sentences(l.summary));
  return pool.filter(s=>{const st=toks(s);return tt.some(x=>st.includes(x))}).slice(0,3);
}
function build(l,ctx,found,q){
  let mode=ctx.mode||"step", it=intentsOf(q);
  const rec=seen[l.id]=seen[l.id]||[], term=found&&found.term&&norm(found.term);
  const facet=FACETS.find(f=>f.id===l.id&&term&&f.t.some(x=>norm(x)===term||core(q)===norm(x)));
  const focus=!facet&&term&&norm(l.title)!==term&&stem(term)!==stem(norm(l.title))?focusSentences(l,term):[];
  const tk=(facet?facet.title:term||"")+"|"+mode+"|";
  let more=false;
  if(!it.length&&rec.indexOf(tk)>-1){                      // same question, same mode again: give NEW information instead of repeating
    const order=["example","uses","advdis","simple","steps"];
    const used=rec.filter(k=>k.indexOf(tk)===0).map(k=>k.slice(tk.length));
    it=[order.find(o=>used.indexOf(o)<0)||"summary"];more=true;
  }
  rec.push(tk+it.join(","));
  if(it.indexOf("simple")>-1)mode="simple";
  const T=l.title, adv=l.adv||[], dis=l.dis||[], steps=(l.steps||[]).map(x=>({text:String(x)}));
  const r={suggestions:[]};
  const base=facet?facet.title:(focus.length&&term?cap(term):T);

  if(it.length){
    const k=it[0];
    r.lead=(more?"More on ":"")+T+(more?"":": ")+(more?"":({adv:"advantages",dis:"disadvantages",advdis:"advantages and disadvantages",example:"a worked example",uses:"where it is used",steps:"how to do it",simple:"in simple words",summary:"the key points"}[k]||"overview"));
    if(k==="adv"){r.text="Why "+T.toLowerCase()+" is worth learning:";r.steps=adv.map(x=>({text:x}))}
    else if(k==="dis"){r.text="Things to watch out for with "+T.toLowerCase()+":";r.steps=dis.map(x=>({text:x}))}
    else if(k==="advdis"){r.text=cap(l.meaning.split(/(?<=\.)\s/)[0]);r.steps=adv.map(x=>({text:"Advantage: "+x})).concat(dis.map(x=>({text:"Limitation: "+x})))}
    else if(k==="example"){r.text="Here is "+T.toLowerCase()+" in action.";r.quote=l.example;r.quoteLabel="Example"}
    else if(k==="uses"){r.text="Where "+T.toLowerCase()+" shows up: "+l.uses;if(l.example){r.quote=l.example;r.quoteLabel="Example"}}
    else if(k==="steps"){r.text="Here is how it works, one step at a time.";r.steps=steps}
    else if(k==="simple"){r.text=(l.think?l.think+"\n\n":"")+"In short: "+l.meaning}
    else {r.text=sentences(l.meaning)[0]||l.meaning;r.steps=[]}
    r.check=l.summary;
  } else if(facet){
    r.lead=facet.title+"  ·  part of "+T;
    r.text=facet.text; r.quote=facet.ex; r.quoteLabel="Example";
    if(mode==="step"||mode==="logic")r.hint="Where it fits: "+(l.meaning||"");
    r.check=l.summary;
  } else if(focus.length){
    r.lead=cap(term)+"  ·  part of "+T;
    r.text="About "+term+": "+focus.join(" ")+"\n\nWhere it fits: "+l.meaning;
    if(mode==="step"||mode==="logic")r.steps=steps;
    r.quote=l.example;r.quoteLabel="Example";r.check=l.summary;
  } else if(mode==="simple"){
    r.lead=T+", in simple words";
    r.text=(l.think?l.think+"\n\n":"")+"In short: "+(sentences(l.meaning)[0]||l.meaning);
    r.check=l.summary;
  } else if(mode==="logic"){
    r.lead=T+": the reasoning";
    r.text=l.meaning+"\n\nWhy this works, step by step:";
    r.steps=steps;
    r.hint=(adv.length?"Strengths: "+list(adv)+". ":"")+(dis.length?"Limits: "+list(dis)+".":"");
    r.check=l.summary;
  } else if(mode==="context"){
    r.lead=T+" in real life";
    r.text=(l.uses?"You meet this in: "+l.uses:l.meaning)+"\n\n"+(l.think||"");
    r.quote=l.example;r.quoteLabel="Real case";
    r.hint=(adv.length?"Helps because: "+list(adv)+". ":"")+(dis.length?"Be careful: "+list(dis)+".":"");
  } else if(mode==="human"){
    r.lead="Let’s talk about "+T.toLowerCase();
    r.text=(l.think?l.think+"\n\n":"")+l.meaning;
    r.quote=l.example;r.quoteLabel="For example";
    r.hint="Which part feels unclear? Tell me and I will explain just that part.";
  } else {                                              // step-by-step (default)
    r.lead=T;
    r.text=l.meaning;r.steps=steps;
    r.quote=l.example;r.quoteLabel="Example";
    r.check=l.summary;
    r.hint=l.uses?"Where it is used: "+l.uses:"";
  }
  /* meaningful follow-ups: other angles on this topic + neighbouring topics, never alias spellings */
  const ask=[], hist=l.subject==="history"||l.subject==="english";
  const used=rec.join(" ");
  if(!/example/.test(used)&&l.example)ask.push("Give an example of "+base);
  if(mode!=="simple"&&!/simple/.test(used))ask.push("Explain "+base+" in simple words");
  if(!hist&&!/adv|dis/.test(used)&&(adv.length||dis.length))ask.push("Advantages and disadvantages of "+T);
  if(!hist&&!/uses/.test(used)&&l.uses)ask.push("Where is "+T+" used?");
  const all=lessons().filter(x=>x.subject===l.subject&&x.id!==l.id);
  const at=all.findIndex(x=>x.id>l.id), st=Math.max(0,at<0?0:at);
  all.slice(st,st+2).forEach(x=>ask.push("Explain "+x.title));
  r.suggestions=ask.slice(0,4);
  return r;
}


/* ---------- basic problems the solver skips: ax + b = c, and plain arithmetic ---------- */
const fmt=n=>String(Math.round(n*1e5)/1e5);
function basicMath(q){
  const c=q.replace(/^\s*(please\s+)?(how do i solve|solve|find x in|what is x in|what is|calculate|work out|evaluate)\s*/i,"").replace(/[?.!]+\s*$/,"").replace(/\s+/g,"").replace(/−/g,"-").replace(/×/g,"*").replace(/÷/g,"/");
  let m=c.match(/^([+-]?\d*\.?\d*)x([+-]\d+\.?\d*)?=([+-]?\d+\.?\d*)$/i);
  if(m){
    const a=(m[1]===""||m[1]==="+")?1:(m[1]==="-"?-1:parseFloat(m[1])), b=m[2]?parseFloat(m[2]):0, r=parseFloat(m[3]);
    if(!a)return null;
    const v=(r-b)/a, out=[];
    if(b)out.push((b>0?"Subtract "+fmt(b):"Add "+fmt(-b))+" on both sides: "+(a===1?"":a===-1?"-":fmt(a))+"x = "+fmt(r-b));
    if(a!==1)out.push("Divide both sides by "+fmt(a)+": x = "+fmt(v));
    if(!out.length)out.push("x is already alone: x = "+fmt(v));
    return {text:"Equation: "+c.replace("=", " = ")+"\n\n"+out.map((x,i)=>(i+1)+". "+x).join("\n")+"\n\nCheck: "+fmt(a)+"("+fmt(v)+")"+(b?(b>0?" + ":" - ")+fmt(Math.abs(b)):"")+" = "+fmt(r)+" ✓",topic:"linear"};
  }
  if(/^[\d().+\-*/]+$/.test(c)&&/\d[+\-*/]\(?\d/.test(c)){
    try{const v=Function('"use strict";return ('+c+')')();
      if(isFinite(v))return {text:c.replace(/\*/g," × ").replace(/\//g," ÷ ")+" = "+fmt(v)+"\n\nTip: work out brackets first, then × and ÷, then + and -.",topic:"arithmetic"}}catch(e){}
  }
  return null;
}

/* ---------- main entry ---------- */
const prev=window.BAINT_ENGINE||{};
const subjName=s=>({math:"Mathematics",english:"English",biology:"Biology",chemistry:"Chemistry",history:"History",computer:"Computer Science",biochemistry:"Biochemistry",histology:"Histology",enzymology:"Enzymology",purine_pyrimidine:"Purine & Pyrimidine",cholesterol:"Cholesterol Biosynthesis",engineering:"Engineering",physics:"Physics",economics:"Economics",geography:"Geography",government:"Government"})[s]||s;
function suggest(subject){
  return lessons().filter(x=>inSubject(x,subject)).slice(0,6).map(x=>"Explain "+x.title);
}
let lastQ=null;
function answer(question,ctx){
  const r=answer0(question,ctx);
  if(r&&!r._follow&&question&&String(question).trim().length>2&&!/^I do not have/.test(r.lead||""))lastQ=String(question).trim();
  if(r)delete r._follow;
  return r;
}
function answer0(question,ctx){
  ctx=ctx||{};
  const subject=ctx.subject||"math", q=String(question||"").trim();
  if(!q)return {text:"Type a topic or question and I will explain it."};
  const n=norm(q);
  if(/^(hi|hello|hey|good (morning|afternoon|evening))\b/.test(n)&&n.split(" ").length<4)
    return {lead:"Hello! I am BAINT AI.",text:"Ask me about any topic in "+subjName(subject)+" or switch subject on the left. I explain step by step.",suggestions:suggest(subject).slice(0,3)};
  if(/^(thanks?|thank you|ok(ay)?|great|cool)\b/.test(n)&&n.split(" ").length<4)
    return {text:"You are welcome! Ask another question or tell me which part to explain differently.",suggestions:suggest(subject).slice(0,3)};

  /* follow-ups: "explain differently" / "another example" act on the previous question */
  if(/\b(explain|say|put)\b.*\b(differently|again|another way|simpler)\b|\b(don'?t|do not) (get|understand)\b|\bnot clear\b|\bsimpler\b/.test(n)){
    if(!lastQ)return {text:"Ask me a question first, then I can explain it another way.",_follow:1};
    const alt=ctx.mode==="simple"?"human":"simple";
    const r=answer0(lastQ,Object.assign({},ctx,{mode:alt}));r.lead="Let me try another way. "+(r.lead||"");r._follow=1;return r;
  }
  if(/\b(another|more|different) (example|one|problem)\b/.test(n)&&lastQ&&/\d\s*x|\d\s*[-+*/×÷]/.test(lastQ)){
    const a=2+Math.floor(Math.random()*8),x=2+Math.floor(Math.random()*8),b=1+Math.floor(Math.random()*9),eq=a+"x + "+b+" = "+(a*x+b);
    const r=answer0("Solve "+eq,ctx);r.lead="Here is another one: "+eq;r._follow=1;return r;
  }
  if(/\b(another|more|different) (example|one|problem)\b/.test(n)&&lastQ){
    const r=answer0("example of "+lastQ,ctx);r._follow=1;return r;
  }
  /* 1. a real maths problem goes to the solver, from any subject */
  const looksMath=/\d\s*[-+*/^=×÷]|[-+*/^=×÷]\s*\d|\bx\s*=|\bsolve\b|\bcalculate\b|\bsimplify\b|\bfactori[sz]e\b/i.test(q);
  if((subject==="math"||looksMath)&&typeof window.baintSolve==="function"){
    try{const s=window.baintSolve(q);
      if(s&&s.text){const o={lead:"Let’s solve it step by step.",text:s.text,suggestions:["Explain it differently","Explain Algebra"],topic:s.topic||"math"};if(subject!=="math")o.subject="math";return o}
    }catch(e){console.warn("BAINT solver error",e)}
  }
  if(looksMath){const b=basicMath(q);if(b){const o={lead:"Let’s solve it step by step.",text:b.text,suggestions:["Explain it differently","Solve 4x + 8 = 24","Explain Algebra"],topic:b.topic};if(subject!=="math")o.subject="math";return o}}
  /* 2. subject + topic detection across the whole library */
  const found=detect(q,subject)||(()=>{const l=looseMatch(q,subject);return l?{l,term:null,loose:true}:null})();
  if(found){
    const r=build(found.l,ctx,found,q);
    if(found.loose)r.lead="Closest lesson: "+(r.lead||found.l.title);
    if(!inSubject(found.l,subject))r.subject=found.l.subject;     // auto-switch subject; the app shows a "Subject switched" note
    return r;
  }
  /* 3. honest fallback with useful next steps */
  const here=suggest(subject);
  return {lead:"I do not have that one yet",
    text:here.length?"I could not match that to a lesson in "+subjName(subject)+". Try the topic name or one key term, or pick one of these:":
      subjName(subject)+" has very few lessons so far. Try a different subject, or ask about its main ideas in simple words.",
    suggestions:here.length?here.slice(0,4):["Explain Algebra","Explain Photosynthesis","Explain Democracy"]};
}
window.BAINT_ENGINE={answer,suggest,solverLoaded:prev.solverLoaded};
window.BAINT_LOCAL_STATUS=Object.assign(window.BAINT_LOCAL_STATUS||{},{lessonsLoaded:lessons().length,engine:"v2"});
})();
