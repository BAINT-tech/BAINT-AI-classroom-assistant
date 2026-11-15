/* Run: node tests/router-tests.js   (from the project folder). Prints a results table; exit code 1 if any FAIL. */
const vm=require('vm'),fs=require('fs'),path=require('path');global.window=global;global.localStorage={getItem(){return null},setItem(){}};
const root=path.join(__dirname,'..');
for(const f of ['lessons.js','solver.js','numeric.js','engine.js'])vm.runInThisContext(fs.readFileSync(path.join(root,f),'utf8'),{filename:f});
const E=window.BAINT_ENGINE;
// [category, question, current subject, expected subject after routing, expected text/lead contains (regex), mode]
const T=[
["Numerical","Calculate 25% of 800","biology","math",/200/],
["Numerical","What percent is 30 of 120?","history","math",/25%/],
["Numerical","Increase 200 by 15%","english","math",/230/],
["Numerical","Solve 2x + 3 = 11","biology","math",/x = 4/],
["Numerical","What is 12 × 7 + 4?","physics","math",/88/],
["Numerical","Convert 5 km to m","physics","physics",/5000/],
["Definition","What is photosynthesis?","biology","biology",/glucose/i],
["Definition","What is democracy?","government","government",/people/i],
["Definition","What is a catalyst?","chemistry","chemistry",/rate|reaction/i],
["Definition","What is a metaphor?","english","english",/compar/i],
["Detail","Explain supply and demand","economics","economics",/price/i],
["Detail","Explain plate tectonics","geography","geography",/plate/i],
["Application","Where is calculus used?","math","math",/used|use|engineering|physics/i],
["Comparison","Advantages and disadvantages of democracy","government","government",/Advantage:/],
["Subject switch","Photosynthesis","math","biology",/glucose/i],
["Subject switch","What is democracy","biology","government",/people/i],
["Subject switch","supply and demand","history","economics",/price/i],
["Focused","chlorophyll","biology","biology",/chlorophyll/i],
["Focused","algebraic expression","math","math",/terms|coefficient/i],
["Typo","photosinthesis","biology","biology",/glucose|photosynthesis/i],
["Unsupported","blah qwerty zorp","economics","economics",/do not have|could not match/i],
["Unsupported","Who will win the 2030 World Cup?","history","history",/do not have|could not match/i],
["Unsupported","inflation","economics","economics",/do not have|could not match/i],
["Unsupported","population density","geography","geography",/do not have|could not match/i],
];
let fail=0;const rows=[];
for(const [cat,q,subj,expSub,re] of T){
  E.reset();   // every case starts a fresh conversation
  const r=E.answer(q,{subject:subj,mode:"step"});
  const gotSub=r.subject||subj, blob=(r.lead||"")+" "+(r.text||"")+" "+(r.steps||[]).map(s=>s.text).join(" ")+" "+(r.quote||"");
  const ok=gotSub===expSub&&re.test(blob);if(!ok)fail++;
  rows.push([cat,q,subj+"→"+expSub,gotSub+" | "+(r.lead||"").slice(0,32),ok?"PASS":"FAIL"]);
}
// follow-up context + repeat-gives-new-info + modes differ
E.reset();E.answer("Explain Photosynthesis",{subject:"biology",mode:"step"});
const d=E.answer("I do not understand",{subject:"biology",mode:"step"});
const fu=/Photosynthesis/i.test((d.lead||"")+(d.text||""));rows.push(["Follow-up","I do not understand (after Photosynthesis)","keeps topic",(d.lead||"").slice(0,40),fu?"PASS":"FAIL"]);if(!fu)fail++;
E.reset();const a1=E.answer("Explain Algebra",{subject:"math",mode:"step"}).text,a2=E.answer("Explain Algebra",{subject:"math",mode:"step"});
const rep=(a2.lead||"").startsWith("More on");rows.push(["Repeat","Same question twice","new info",(a2.lead||"").slice(0,40),rep?"PASS":"FAIL"]);if(!rep)fail++;
E.reset();const modes=["step","simple","logic","context","human"].map(m=>E.answer("Explain Probability",{subject:"math",mode:m}).lead);
const distinct=new Set(modes).size===5;rows.push(["Modes","5 modes, Probability","5 different replies",[...new Set(modes)].length+" distinct leads",distinct?"PASS":"FAIL"]);if(!distinct)fail++;
console.log("| Category | Question | Subject (current→expected) | Actual | Status |\n|---|---|---|---|---|");
rows.forEach(r=>console.log("| "+r.join(" | ")+" |"));
console.log("\n"+(rows.length-fail)+"/"+rows.length+" passed");
process.exit(fail?1:0);
