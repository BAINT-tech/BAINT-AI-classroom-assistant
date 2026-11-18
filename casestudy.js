/* ══════════════════════════════════════════════════════════════════════════
   BAINT GUIDED CASE-STUDY BUILDER  -  casestudy.js   (loads AFTER memory.js, so it sees messages first)
   For long written questions ("As the bank's PR consultant, advise ... benefits and risks ... recommend a campaign").
   BAINT does not write the essay. It breaks the question down, guides the student through the stages,
   checks each answer against concept banks, then assembles THEIR OWN points into a write-up frame.
   Offline, no API, no running cost. The session lives in the saved chat (message field `cs`), so it survives reloads.
   ══════════════════════════════════════════════════════════════════════════ */
(function(){
"use strict";
const E=window.BAINT_ENGINE; if(!E||E.__cs)return;
const inner=E.answer.bind(E);
const norm=v=>String(v||"").toLowerCase().replace(/[’‘]/g,"'").replace(/\s+/g," ").trim();
const clean=s=>String(s||"").replace(/\s+/g," ").replace(/\s+([,.;:])/g,"$1").replace(/^[\s,;:.-]+|[\s,;:.-]+$/g,"").trim();
const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
const nwords=s=>(String(s).match(/[A-Za-z0-9']+/g)||[]).length;

/* ---------- concept banks: what a strong answer usually covers ---------- */
const B={
 stake:[["Customers","customer|client|account holder|public|consumer|audience","Existing and new customers: how will they react?"],
  ["Management and shareholders","management|shareholder|owner|board|executive|investor","Who decides, and who carries the financial risk?"],
  ["Regulators and government","regulat|government|law|compliance|nbc|arcon|cbn|authority","Which rules or regulators apply?"],
  ["Employees","employee|staff|worker|team","How are staff affected or involved?"],
  ["Partners and competitors","competitor|rival|partner|supplier|sponsor","What are rivals and partners doing?"],
  ["Media and the public","media|press|social media|public opinion|society|community","How will the media and public see it?"]],
 pr_benefit:[["Reach and awareness","reach|aware|visib|exposure|audience|attention|coverage","How many people will see the brand, and for how long?"],
  ["Engagement with young or target customers","engag|youth|young|social media|interact|follow|viral","Which customers does the show connect the brand to?"],
  ["Positive brand association","associat|image|reputation|likab|trust|love|positive|modern|relevant","What feelings or image will the brand gain?"],
  ["Customer growth and sales","customer|account|acquisition|sales|growth|revenue|download|market share","How could reach turn into business results?"],
  ["Content and media value","content|clip|hashtag|publicity|free|airtime|media value","What free or low-cost content does the sponsorship create?"]],
 pr_risk:[["Brand dilution","dilut|identity|frivol|serious|credib|image|lose (its|their)","Could a serious brand look frivolous or lose its identity?"],
  ["Controversy and misconduct","controvers|scandal|misconduct|indecen|offens|behaviou?r|reputation","What if contestants or content cause outrage?"],
  ["Regulation and legal","regulat|broadcast|arcon|nbc|law|legal|complian|ban","Which rules could affect the show or advert?"],
  ["Cost against return","cost|roi|return|budget|expens|invest|value for money","Will the spend be repaid?"],
  ["Customer backlash","backlash|older|conservative|disapprov|complain|boycott|leave","Which customers may dislike it?"],
  ["Loss of control","control|storyline|unpredict|no say|cannot (predict|influence)","The bank does not control the content."]],
 pr_plan:[["PR (storytelling and relations)","\\bpr\\b|press|story|csr|education|empower|relations|partnership|influencer|interview","What story does the bank tell, and to whom?"],
  ["Advertising channels","\\bad\\b|advert|tv|radio|billboard|social media|digital|online|media","Which channels, and what message?"],
  ["Risk mitigation / crisis plan","crisis|mitigat|monitor|statement|spokes|exit|clause|contingen|response","What is the plan if something goes wrong?"],
  ["Measurement","measur|kpi|track|metric|sentiment|roi|evaluat|survey|analytic","How will you know it worked?"]],
 rec:[["A clear decision","recommend|should|go ahead|proceed|sponsor|not sponsor|advise|decid|approve|reject","State plainly what you advise."],
  ["Conditions or safeguards","clause|condition|safeguard|exit|terminate|only if|provided|limit|control|review","Under what terms?"],
  ["Justification","because|since|therefore|so that|as a result|justif|outweigh|reason|evidence","Why is this the best choice?"]],
 biz_benefit:[["Revenue or growth","revenue|growth|sales|profit|market share|expan|income","How could the business gain?"],
  ["Efficiency or cost savings","cost|saving|efficien|productiv|reduce","Where are savings made?"],["Competitive advantage","compet|advantage|differenti|innovat|position","What edge does it give?"],
  ["Customer value","customer|satisf|loyal|experience|service","How are customers better off?"]],
 biz_risk:[["Financial risk","cost|loss|invest|debt|cash|financ|budget|return","What if money is lost?"],["Operational risk","operat|staff|capacity|supply|implement|skills|process","Can it be delivered?"],
  ["Market or competitor risk","market|compet|demand|rival|trend|price","What if the market changes?"],["Legal or reputation risk","legal|regulat|reputation|image|compliance|trust","Any rules or reputational damage?"]],
 pol_benefit:[["Public benefit","citizen|public|welfare|society|people|community|service","Who gains?"],["Economic effect","econom|growth|job|income|revenue|investment|cost","What is the economic impact?"],
  ["Fairness and rights","equal|fair|right|justice|inclusion|access","Is it fair?"]],
 pol_risk:[["Cost and funding","cost|fund|budget|tax|debt|afford","Who pays?"],["Implementation problems","implement|corrupt|capacity|enforce|delay|institution","Can it be delivered?"],
  ["Public reaction or unintended effects","opposition|protest|unintended|side effect|reaction|resist","Who may object, and what could go wrong?"]]
};
const GLOSS=[["brand dilution","brand dilution","When a brand’s image or meaning gets weaker or blurred, for example by linking it to things that do not fit what it stands for."],
 ["sponsor","sponsorship","Paying to be linked with an event or programme in return for exposure and goodwill."],
 ["\\bpr\\b|public relations","public relations (PR)","Managing how an organisation is seen by the public and the media, usually without paying for adverts."],
 ["stakeholder","stakeholders","Anyone affected by, or able to affect, a decision: customers, staff, owners, regulators, the public."],
 ["\\broi\\b|return on investment","return on investment (ROI)","What you gain compared with what you spent."],
 ["crisis","crisis communication","A prepared plan for what to say and do quickly when something damages the organisation’s reputation."],
 ["mitigat","mitigation","Steps taken to reduce the harm or likelihood of a risk."],
 ["brand equity","brand equity","The extra value a brand has because people know and trust it."],
 ["swot","SWOT analysis","Listing Strengths, Weaknesses, Opportunities and Threats."],
 ["\\bcsr\\b|corporate social","corporate social responsibility (CSR)","A company’s efforts to benefit society beyond making profit."]];

/* ---------- detecting and breaking down a case-study question ---------- */
const CUE=/\b(advise|recommend|analy[sz]e|analysis|evaluate|discuss|assess|propose|consultant|management|case study|strategy|campaign|benefits and risks|pros and cons|justify|critically|as the|as a)\b/gi;
function isCase(q){
  const w=nwords(q), cues=new Set((q.match(CUE)||[]).map(x=>x.toLowerCase()));
  return /^\s*case study\b/i.test(q)||(w>=22&&cues.size>=2);
}
function parse(q){
  let t=String(q).replace(/\r/g," ").replace(/^\s*group\s*\d+\s*/i,"").replace(/^\s*(questions?|assignment|case study)\s*:?\s*/i,"");
  const sents=t.split(/(?<=[.!?])\s*(?=[A-Z])/).map(clean).filter(Boolean);
  const situation=sents[0]||t;
  const reqs=[];
  sents.slice(1).forEach(s=>s.split(/\s*,?\s*and\s+(?=recommend|advise|propose|evaluate|analy[sz]e|discuss|suggest|outline|explain|assess)/i)
    .forEach(p=>{p=clean(p.replace(/^as (the |a |an )?[^,]{3,60},\s*/i,"").replace(/^in your (analysis|answer|report|discussion),?\s*/i,""));if(nwords(p)>=3)reqs.push(cap(p))}));
  const rm=t.match(/\bas (?:the |a |an )?([A-Za-z' -]{4,45}?)(?=\s*[,.]|\s+you\b|\s+and\b)/i);
  const L=norm(t);
  const type=/sponsor|campaign|brand|advertis|public relations|\bpr\b|marketing/.test(L)?"pr":/government|policy|ministry|minister|legislat|regulat|public sector/.test(L)?"pol":"biz";
  const plan=/campaign|\bplan\b|strategy|implement|propose|action|measures|programme/.test(L);
  const terms=GLOSS.filter(g=>new RegExp(g[0],"i").test(t)).slice(0,4);
  return {situation,reqs,role:rm?clean(rm[1]):"",type,plan,terms};
}
const STAGES=cs=>["understand","stake","benefit","risk","rec"].concat(cs.plan?["plan"]:[]).concat(["write"]);
const NAME={understand:"Understand the question",stake:"Who is affected?",benefit:"Benefits",risk:"Risks",rec:"Recommendation",plan:"Supporting plan",write:"Your answer frame"};
const bankFor=(cs,k)=>k==="stake"?B.stake:k==="rec"?B.rec:k==="plan"?(cs.type==="pr"?B.pr_plan:B.pr_plan.slice(2).concat([B.pr_plan[0]]))
  :k==="benefit"?(cs.type==="pr"?B.pr_benefit:cs.type==="pol"?B.pol_benefit:B.biz_benefit):(cs.type==="pr"?B.pr_risk:cs.type==="pol"?B.pol_risk:B.biz_risk);
const PROMPT={
 stake:"Who is affected by this decision? Write the people or groups you can think of, and one line on how each is affected.",
 benefit:"List the potential benefits. Write at least three points, each with a short reason.",
 risk:"List the risks. Write at least three points, each with how it could harm the organisation.",
 rec:"What do you advise? State your decision, say why it is the best choice, and give any conditions.",
 plan:"Design the supporting plan: what will you do (PR, advertising, safeguards) and how will you measure success?"};
const HINT={
 stake:"Think: customers, owners, staff, regulators, media, competitors.",
 benefit:"Think about reach, customers, image, money and extra value. One reason per point makes it a strong point.",
 risk:"Think about what could damage the brand, break rules, cost too much or go out of your control.",
 rec:"Use this pattern: “I recommend … because … provided that …”.",
 plan:"Cover: the message, the channels, the safeguards if things go wrong, and how you will measure results."};

/* ---------- reply helpers ---------- */
const CHIPS=["Next step","Hint","Show example points","Exit case study"];
const head=(cs,k)=>"Case study  ·  Step "+(STAGES(cs).indexOf(k)+1)+" of "+STAGES(cs).length+": "+NAME[k];
function reply(cs,k,o){return Object.assign({lead:head(cs,k),suggestions:CHIPS.slice(),cs:Object.assign({},cs,{step:k})},o)}
function prompt(cs,k){
  if(k==="understand"){
    const bits=[];
    if(cs.role)bits.push("Your role: "+cs.role+".");
    bits.push("The situation: "+cs.situation+".");
    return reply(cs,k,{text:bits.join("\n\n")+"\n\nYour answer must cover these points. Tick each one off as you go:",
      steps:cs.reqs.map(x=>({text:x})).concat(cs.reqs.length?[]:[{text:"Read the question again and underline what you are asked to do."}]),
      hint:cs.terms.length?"Key terms: "+cs.terms.map(g=>g[1]+" = "+g[2]).join("  •  "):"Say Next step when you are ready to build your answer.",
      suggestions:["Next step","Hint","Exit case study"]});
  }
  if(k==="write")return writeup(cs);
  return reply(cs,k,{text:PROMPT[k],hint:"Type your points, then I will check them. "+HINT[k]});
}
function feedback(cs,k,text){
  const bank=bankFor(cs,k), covered=bank.filter(c=>new RegExp(c[1],"i").test(text)), missing=bank.filter(c=>covered.indexOf(c)<0);
  const w=nwords(text), lines=[];
  if(w<8)lines.push("That is a start, but add more detail: give each point a reason.");
  if(covered.length)lines.push("You have covered: "+covered.map(c=>c[0]).join(", ")+".");
  else lines.push("I could not spot the main ideas yet. Look at the prompts below.");
  return reply(cs,k,{text:lines.join("\n\n"),steps:missing.slice(0,3).map(c=>({text:"Also consider "+c[0]+". "+c[2]})),
    hint:"Add more points in a new message, or tap Next step."});
}
function examples(cs,k){
  if(k==="understand"||k==="write")return reply(cs,k,{text:"Tap Next step to start building your answer."});
  return reply(cs,k,{text:"Ideas that strong answers often include (use only what fits, and write them in your own words):",
    steps:bankFor(cs,k).map(c=>({text:c[0]+": "+c[2]}))});
}
function writeup(cs){
  const a=cs.answers||{}, sec=(n,t,k)=>{const v=clean(a[k]);return n+". "+t+"\n"+(v||"[You skipped this part. Write your points here.]")};
  const parts=["Introduction\n[Write 2 sentences: who you are advising, what the decision is, and what your answer will cover.]\nSituation: "+cs.situation+"."];
  let n=2;
  if(a.stake)parts.push(sec(n++,"Who is affected","stake"));
  parts.push(sec(n++,"Benefits","benefit"));parts.push(sec(n++,"Risks","risk"));parts.push(sec(n++,"Recommendation","rec"));
  if(cs.plan)parts.push(sec(n++,"Supporting plan","plan"));
  parts.push(n+". Conclusion\n[Write 2 sentences repeating your recommendation and the main reason for it.]");
  const gaps=["benefit","risk","rec"].concat(cs.plan?["plan"]:[]).filter(k=>!clean(a[k])).map(k=>NAME[k]);
  return {lead:"Case study  ·  Your answer frame",cs:Object.assign({},cs,{step:"write",ended:true}),
    text:"Here is your answer frame, built from your own points. Improve the wording, add examples (local ones score well), and connect each paragraph to the question.\n\n"+parts.join("\n\n"),
    hint:gaps.length?"Still empty: "+gaps.join(", ")+". Ask me to start the case study again to fill them in.":"Check every point in the question is answered before you submit.",
    suggestions:["Explain differently","Exit case study"]};
}

/* ---------- session handling ---------- */
function active(hist,q){
  const h=(hist||[]).slice(), last=h[h.length-1];
  if(last&&last.role==="user"&&norm(last.text)===norm(q))h.pop();
  for(let i=h.length-1;i>=0;i--)if(h[i].role==="baint")return h[i].cs&&!h[i].cs.ended?h[i].cs:null;
  return null;
}
const CMD={
 next:/^(next( step)?|continue|go on|done|ok(ay)? next|move on)$/,
 hint:/^(hint|help me|give me a hint)$/,
 ex:/^(show )?(example points|examples?|ideas|show ideas|show me ideas)$/,
 exit:/^(exit|stop|cancel|quit)( the)?( case study)?$|^end case study$/,
 back:/^(back|previous( step)?|go back)$/,
 finish:/^(finish|write( my)? (answer|outline|up)|show my answer( frame)?|build my answer)$/,
 skip:/^skip( this( step)?)?$/
};
const SIDE=/^(what|who|define|explain|solve|calculate|how)\b/i;
function step(cs,q,ctx,hist){
  const n=norm(q).replace(/[?.!]+$/,""), k=cs.step, st=STAGES(cs), i=st.indexOf(k);
  if(CMD.exit.test(n))return {lead:"Case study closed",text:"No problem. Say “case study” and paste a question whenever you want to build another one.",cs:Object.assign({},cs,{ended:true}),suggestions:[]};
  if(CMD.finish.test(n))return writeup(cs);
  if(CMD.hint.test(n))return reply(cs,k,{text:HINT[k]||"Read the question again and make sure each requirement is answered."});
  if(CMD.ex.test(n))return examples(cs,k);
  if(CMD.back.test(n))return prompt(cs,st[Math.max(0,i-1)]);
  if(CMD.next.test(n)||CMD.skip.test(n))return prompt(cs,st[Math.min(st.length-1,i+1)]);
  if(k==="understand"||k==="write")return prompt(cs,k);
  if(SIDE.test(q.trim())&&nwords(q)<=12){                                  // a quick side question: answer it, keep the session
    const g=GLOSS.find(x=>new RegExp(x[0],"i").test(q));
    if(g)return {lead:cap(g[1]),text:g[2],hint:"Back to your case study when you are ready.",cs:cs,suggestions:["Next step","Hint","Exit case study"]};
    const r0=inner(q,ctx), keep=r=>{if(r&&typeof r==="object"){r.cs=cs;r.suggestions=(r.suggestions||[]).slice(0,2).concat(["Next step","Exit case study"])}return r};
    return r0&&typeof r0.then==="function"?r0.then(keep):keep(r0);
  }
  const a=Object.assign({},cs.answers),prev=a[k]?a[k]+"\n":"";a[k]=prev+q.trim();
  return feedback(Object.assign({},cs,{answers:a}),k,a[k]);
}
E.answer=function(question,ctx){
  ctx=ctx||{};const q=String(question||"").trim(), hist=Array.isArray(ctx.history)?ctx.history:[];
  const cs=active(hist,q);
  if(cs)return step(cs,q,ctx,hist);
  if(/^(case study|help me with (a |my )?case study|start (a )?case study)$/i.test(q))
    return {lead:"Case study builder",text:"Paste your case-study question and I will break it down, guide you through the stages and check your points. You write the answer; I make sure you cover what the question asks.",suggestions:[]};
  if(isCase(q)){
    const p=parse(q), cs0={type:p.type,plan:p.plan,role:p.role,situation:p.situation,reqs:p.reqs,terms:p.terms,answers:{},step:"understand"};
    const r=prompt(cs0,"understand");r.text="This looks like a case-study question, so let me guide you through it step by step.\n\n"+r.text;return r;
  }
  return inner(question,ctx);
};
E.__cs=true;
window.BAINT_CASESTUDY={isCase,parse};
})();
