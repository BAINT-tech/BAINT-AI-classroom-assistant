/* ══════════════════════════════════════════════════════════════════════════
   BAINT CONVERSATION MEMORY  -  memory.js     (loads AFTER blde.js, before the app script)
   - Follow-ups keep the topic:  "what are its disadvantages?" after "Explain enzymes".
   - Recall:  "what did I ask earlier?", "what did we cover?", "repeat that",
              "did I ask about photosynthesis?", "clear history".
   - The app saves the chat on this device (localStorage) so it survives reloads.
   Works fully offline. Maths and numeric answers pass through untouched.
   ══════════════════════════════════════════════════════════════════════════ */
(function(){
"use strict";
const E=window.BAINT_ENGINE; if(!E||E.__mem)return;
const inner=E.answer.bind(E);
const norm=v=>String(v||"").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[’‘]/g,"'").replace(/[^a-z0-9' ]/g," ").replace(/\s+/g," ").trim();
const stem=w=>w.replace(/ies$/,"y").replace(/(es|s)$/,"");
const STOP=new Set("the and for with what how why does did you can please tell about explain give show this that are was were from into have has its their them they than then when which who also much many some any more most very just like asked ask said say earlier before previous last first question questions answer message messages did chat conversation talk talked discuss discussed cover covered learn learned advantages advantage disadvantages disadvantage benefits benefit drawbacks drawback limitations limitation examples example steps summary summarize summarise simple simply analogy importance uses used application applications continue more".split(" "));
const words=s=>norm(s).split(" ").filter(w=>w.length>=4&&!STOP.has(w)&&!STOP.has(stem(w))).map(stem);
const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
const short=(s,n)=>{s=String(s||"").replace(/\s+/g," ").trim();return s.length>n?s.slice(0,n-1)+"…":s};

/* what the student typed earlier, excluding the question being asked right now */
function past(hist,q){
  const h=(hist||[]).slice();
  const last=h[h.length-1];
  if(last&&last.role==="user"&&norm(last.text)===norm(q))h.pop();
  return h;
}
const userQs=h=>h.filter(m=>m.role==="user"&&m.text).map(m=>m.text);
const lastTopic=h=>{for(let i=h.length-1;i>=0;i--){const m=h[i];if(m.role==="baint"&&m.mem&&m.mem.topic)return m.mem.topic}return null};

/* ---------- recall of earlier messages ---------- */
const RX={
  clear:/^(clear|delete|erase|reset) (my |the |this |our )?(chat|history|conversation|messages?)$|^(start|begin) (a )?(new|fresh) (chat|conversation)$|^new chat$|^forget (this|our|the) (chat|conversation)$/,
  last:/\b(what|which) (was|is) (my|the) (last|previous|latest) (question|message)\b|\bwhat did i (just )?ask( you)?( (before|earlier|last))?$|\bmy (last|previous) question\b/,
  first:/\b(what was|what is) my (first|earliest) (question|message)\b|\bwhat did i ask first\b|\bhow did we start\b/,
  recap:/\bwhat (have )?(we|i) (discussed|covered|learned|talked about|done)\b|\b(summari[sz]e|recap) (of )?(our|this|the) (chat|conversation|session)\b|\brecap\b|\blist (all )?(my )?questions\b|\bmy questions so far\b|\bwhat have we covered\b/,
  repeat:/^(can you |could you )?(please )?(repeat|say) (that|it|this|the last (answer|reply|message))( again)?$|^what did you (just )?say$|^show (me )?(your |the )?(last|previous) (answer|reply)$|^repeat$/,
  find:/\b(did i (ever )?ask (you )?(about|on)|have i (ever )?asked (about|on)|what did (you|we) (say|discuss|explain) (about|on)|go back to|remind me (about|of)|find (my|the) (message|question|answer) (about|on)|earlier (about|on))\s+(.+)$/
};
function recall(q,hist){
  const n=norm(q), h=past(hist,q), qs=userQs(h);
  if(RX.clear.test(n))return {_action:"clear",lead:"Conversation cleared",text:"I cleared this conversation from this device."};
  if(RX.repeat.test(n)){
    for(let i=h.length-1;i>=0;i--){const m=h[i];if(m.role==="baint"){const c={...m};delete c.mem;c._follow=1;c.lead=(c.lead?"Again: "+c.lead:"Here it is again");return c}}
    return {lead:"Nothing to repeat yet",text:"We have not talked about anything yet in this conversation. Ask me a question to begin."};
  }
  if(RX.last.test(n)){
    return qs.length?{lead:"Your previous question",text:"You asked: “"+qs[qs.length-1]+"”.",suggestions:[qs[qs.length-1]]}:{lead:"No earlier question",text:"This is the first question in this conversation."};
  }
  if(RX.first.test(n)){
    return qs.length?{lead:"Your first question",text:"You started with: “"+qs[0]+"”.",suggestions:[qs[0]]}:{lead:"No earlier question",text:"This is the first question in this conversation."};
  }
  if(RX.recap.test(n)){
    if(!qs.length)return {lead:"Nothing yet",text:"We have not covered anything yet. Ask me a question to begin."};
    const topics=[...new Set(h.filter(m=>m.role==="baint"&&m.mem&&m.mem.topic).map(m=>m.mem.topic))];
    return {lead:"What we have covered",text:"You have asked "+qs.length+" question"+(qs.length>1?"s":"")+(topics.length?" so far, covering "+topics.join(", ")+".":" so far."),
      steps:qs.slice(-8).map(x=>({text:x})),suggestions:topics.slice(-2).map(t=>"Explain "+t)};
  }
  const f=n.match(RX.find);
  if(f){
    const term=words(f[f.length-1]);
    if(!term.length)return null;
    const hits=[];
    for(let i=0;i<h.length;i++){const m=h[i];
      if(m.role==="user"&&m.text){const bag=new Set(words(m.text));
        const nxt=h.slice(i+1).find(x=>x.role==="baint");
        const bag2=new Set(words((nxt&&((nxt.lead||"")+" "+(nxt.text||"")))||""));
        if(term.every(t=>bag.has(t)||bag2.has(t)))hits.push({q:m.text,a:nxt&&nxt.lead})}}
    if(!hits.length)return {lead:"I do not see that in this conversation",text:"I could not find anything about “"+f[f.length-1]+"” in what we have said so far. Ask me about it and I will explain."};
    return {lead:"Found in this conversation",text:"You asked about this "+(hits.length>1?hits.length+" times":"earlier")+".",
      steps:hits.slice(-3).map(x=>({text:"“"+short(x.q,90)+"”"+(x.a?"  →  "+short(x.a,60):"")})),suggestions:[hits[hits.length-1].q]};
  }
  return null;
}

/* ---------- follow-ups that keep the topic ---------- */
const GREET=/^(hi|hello|hey|thanks?|thank you|ok(ay)?|great|cool|good (morning|afternoon|evening))\b/;
const PRON=/\b(it|its|this|that|these|those|they|their|them|there)\b/;
const INTENT=/\b(advantages?|disadvantages?|benefits?|drawbacks?|pros|cons|limitations?|examples?|uses?|used|applications?|steps?|summary|summari[sz]e|simple|simply|analogy|importance)\b/;
const CONT=/^(and |but |so |also |then )?(why|how come|how|more|tell me more|go on|continue|explain more|what about|how about|and)\b/;
function followUp(q,topic){
  const n=norm(q);
  if(!topic||GREET.test(n)||n.split(" ").length>9||words(q).length)return null;
  if(!(PRON.test(n)||INTENT.test(n)||CONT.test(n)))return null;
  if(INTENT.test(n))return n.replace(/\b(it|its|this|that|these|those|they|their|them|there)\b/g," ").replace(/\s+/g," ").trim()+" of "+topic;
  return "explain "+topic;
}

/* ---------- main wrapper ---------- */
E.answer=function(question,ctx){
  ctx=ctx||{};
  const q=String(question||"").trim(), hist=Array.isArray(ctx.history)?ctx.history:[];
  const rc=recall(q,hist); if(rc)return rc;
  const topic=lastTopic(past(hist,q)), fq=followUp(q,topic);
  const r0=inner(fq||q,ctx);
  const lf=E.lastFound&&E.lastFound(), L=lf&&typeof EDU_LESSONS!=="undefined"?EDU_LESSONS.find(l=>l.id===lf.id):null;
  const finish=r=>{
    if(!r||typeof r!=="object")return r;
    if(L&&!r.topic&&!r._follow)r.mem={topic:L.title,q};
    if(fq&&r.lead&&!/^Continuing/.test(r.lead))r.lead="Continuing with "+topic+"  ·  "+r.lead;
    return r;
  };
  return r0&&typeof r0.then==="function"?r0.then(finish):finish(r0);
};
E.__mem=true;
window.BAINT_MEMORY={recall,followUp,lastTopic};
})();
