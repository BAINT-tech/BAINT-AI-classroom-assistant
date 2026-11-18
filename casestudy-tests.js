/* Run: node tests/casestudy-tests.js   Simulates the app chat loop for the guided case-study builder. */
const vm=require('vm'),fs=require('fs'),path=require('path');
global.window=global;global.localStorage={getItem(){return null},setItem(){}};global.navigator={onLine:false};
const root=path.join(__dirname,'..');
for(const f of ['lessons.js','lessons-extra.js','lessons-approved.js','solver.js','numeric.js','engine.js','blde.js','memory.js','casestudy.js'])vm.runInThisContext(fs.readFileSync(path.join(root,f),'utf8'),{filename:f});
const E=window.BAINT_ENGINE;let messages=[],subject='economics',mode='step';
async function ask(text){messages.push({role:'user',text});const r=await Promise.resolve(E.answer(text,{subject,mode,history:messages}));if(r&&r._action==='clear'){messages=[];return r}if(r&&r.subject)subject=r.subject;messages.push({role:'baint',...r});return r}
const reload=()=>{messages=JSON.parse(JSON.stringify(messages));E.reset()};
const blob=r=>[r.lead,r.text,(r.steps||[]).map(s=>s.text).join(' | '),r.hint].join(' | ');
const rows=[];let fail=0;const T=(n,q,ok)=>{rows.push([n,q.slice(0,46),ok?'PASS':'FAIL']);if(!ok){fail++}};
const Q=`GROUP 8 QUESTIONS

A leading Nigerian bank is planning to sponsor a major reality TV show, similar to big brother naija.As the banks PR consultant,advise the management on the potential benefits and risks of the sponsorship.
In your analysis, consider the potential for both brand dilution , and recommend a PR and advertising campaign that would run alongside the sponsorship to maximize its positive impact and mitigate it's risks`;
(async()=>{
  let r=await ask(Q);
  T('Detects the case study',"GROUP 8 question",/Step 1 of 7/.test(r.lead)&&r.cs&&r.cs.step==='understand');
  T('Breaks question down',"requirements",r.steps.length>=3&&/benefits and risks/i.test(blob(r))&&/recommend a PR and advertising/i.test(blob(r)));
  T('Finds role',"role",/PR consultant/i.test(r.text));
  T('Explains key terms',"glossary",/brand dilution/i.test(r.hint)&&/sponsorship/i.test(r.hint));
  r=await ask('Next step'); T('Step 2 prompt','Next step',/Step 2 of 7/.test(r.lead)&&/Who is affected/.test(r.lead));
  r=await ask('customers, the bank management, regulators like CBN'); T('Feedback on stakeholders','answer',/covered: .*Customers/.test(blob(r))&&/Regulators/.test(blob(r)));
  r=await ask('Next step'); T('Benefits step','Next step',/Benefits/.test(r.lead));
  r=await ask('It gives wide reach and awareness to young people on social media.');
  T('Feedback: covered + missing','benefit answer',/Reach and awareness/.test(blob(r))&&/Also consider/.test(blob(r)));
  r=await ask('Hint'); T('Hint','Hint',/reach, customers, image/i.test(blob(r)));
  r=await ask('Show example points'); T('Example points are ideas, not an essay','Show example points',r.steps.length>=4&&/own words/.test(r.text));
  r=await ask('what is brand equity?'); T('Side question keeps session','side question',/value a brand has/i.test(blob(r))&&r.cs&&r.cs.step==='benefit');
  reload();
  r=await ask('It can raise customer growth and new accounts too.'); T('Survives reload, still at Benefits','after reload',/Benefits/.test(r.lead));
  r=await ask('Next step'); r=await ask('Brand dilution could make the bank look frivolous, and controversy from contestants could hurt reputation. Cost is also high.');
  T('Risks feedback','risk answer',/Brand dilution/.test(blob(r))&&/Controversy/.test(blob(r))&&/Cost/.test(blob(r)));
  r=await ask('Next step'); r=await ask('I recommend the bank sponsors, because reach outweighs risk, provided there is an exit clause.');
  T('Recommendation feedback','recommend',/A clear decision/.test(blob(r))&&/Conditions/.test(blob(r))&&/Justification/.test(blob(r)));
  r=await ask('Next step'); T('Plan step (campaign question)','Next step',/Supporting plan/.test(r.lead));
  r=await ask('Finish');
  T('Answer frame uses MY words','Finish',/wide reach and awareness/.test(r.text)&&/exit clause/.test(r.text)&&/Brand dilution could make/.test(r.text)&&/skipped this part/.test(r.text)&&r.cs.ended);
  r=await ask('Explain photosynthesis'); T('Session ended: lessons work again','Explain photosynthesis',/glucose/i.test(blob(r)));
  r=await ask('Solve 2x + 3 = 11'); T('Maths untouched','Solve',/x = 4/.test(blob(r)));
  r=await ask('Explain the difference between fixed cost and variable cost in a business'); T('Normal question not hijacked','short question',!/Case study/.test(r.lead||''));
  r=await ask(Q); r=await ask('Exit case study'); T('Exit works','Exit case study',/closed/i.test(r.lead)&&r.cs.ended);
  console.log("| Test | Input | Status |\n|---|---|---|");rows.forEach(x=>console.log("| "+x.join(" | ")+" |"));
  console.log("\n"+(rows.length-fail)+"/"+rows.length+" passed");process.exit(fail?1:0);
})();
