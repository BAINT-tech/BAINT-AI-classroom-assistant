/* BAINT numeric router (numeric.js): local, offline word-problem helpers that work from ANY subject.
   Returns {text, topic, subject} or null. Loaded before engine.js. */
(function(){
"use strict";
const f=n=>String(Math.round(n*1e6)/1e6);
const N="(-?\\d+(?:\\.\\d+)?)";
const UNITS={km:["length",1000],m:["length",1],cm:["length",.01],mm:["length",.001],kg:["mass",1000],g:["mass",1],mg:["mass",.001],
  h:["time",3600],hr:["time",3600],hour:["time",3600],hours:["time",3600],min:["time",60],minute:["time",60],minutes:["time",60],s:["time",1],sec:["time",1],second:["time",1],seconds:["time",1]};
function solve(q){
  const s=String(q||"").toLowerCase().replace(/,/g,"").replace(/\s+/g," ").trim();
  let m;
  if((m=s.match(new RegExp(N+"\\s*(?:%|percent|per cent) of "+N)))){
    const p=+m[1],b=+m[2];
    return {topic:"percentage",subject:"math",text:"Find "+f(p)+"% of "+f(b)+".\n\n1. Turn the percent into a fraction: "+f(p)+"% = "+f(p)+"/100.\n2. Multiply by the whole: "+f(p)+"/100 × "+f(b)+" = "+f(p*b/100)+".\n\nAnswer: "+f(p*b/100)};
  }
  if((m=s.match(new RegExp("(?:what )?(?:percent|percentage|%)\\s*(?:is|of)?\\s*"+N+" (?:of|out of) "+N))||s.match(new RegExp(N+" is what (?:percent|percentage|%) of "+N)))){
    const a=+m[1],b=+m[2]; if(!b)return null;
    return {topic:"percentage",subject:"math",text:"What percent is "+f(a)+" of "+f(b)+"?\n\n1. Divide the part by the whole: "+f(a)+" ÷ "+f(b)+" = "+f(a/b)+".\n2. Multiply by 100: "+f(a/b)+" × 100 = "+f(a/b*100)+"%.\n\nAnswer: "+f(a/b*100)+"%"};
  }
  if((m=s.match(new RegExp("(increase|decrease|reduce|raise|discount)\\s+"+N+"\\s+by\\s+"+N+"\\s*%")))){
    const up=/increase|raise/.test(m[1]),b=+m[2],p=+m[3],ch=b*p/100;
    return {topic:"percentage",subject:"math",text:(up?"Increase ":"Decrease ")+f(b)+" by "+f(p)+"%.\n\n1. Find the change: "+f(p)+"% of "+f(b)+" = "+f(ch)+".\n2. "+(up?"Add":"Subtract")+" it: "+f(b)+(up?" + ":" - ")+f(ch)+" = "+f(up?b+ch:b-ch)+".\n\nAnswer: "+f(up?b+ch:b-ch)};
  }
  if((m=s.match(new RegExp("(?:convert\\s+)?"+N+"\\s*([a-z]+)\\s+(?:to|in|into)\\s+([a-z]+)")))){
    const a=UNITS[m[2]],b=UNITS[m[3]];
    if(a&&b&&a[0]===b[0]){const v=+m[1]*a[1]/b[1];
      return {topic:"unit conversion",subject:"physics",text:"Convert "+f(+m[1])+" "+m[2]+" to "+m[3]+".\n\n1. Both are units of "+a[0]+".\n2. 1 "+m[2]+" = "+f(a[1]/b[1])+" "+m[3]+".\n3. "+f(+m[1])+" × "+f(a[1]/b[1])+" = "+f(v)+" "+m[3]+".\n\nAnswer: "+f(v)+" "+m[3]};}
  }
  return null;
}
window.BAINT_NUMERIC={solve};
})();
