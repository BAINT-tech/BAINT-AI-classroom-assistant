/* Run: node tests/memory-tests.js   Simulates the app's chat loop (history passed to the engine, saved and restored as JSON). */
const vm=require('vm'),fs=require('fs'),path=require('path');
global.window=global;global.localStorage={getItem(){return null},setItem(){}};global.navigator={onLine:false};
const root=path.join(__dirname,'..');
for(const f of ['lessons.js','lessons-extra.js','lessons-approved.js','solver.js','numeric.js','engine.js','blde.js','memory.js'])vm.runInThisContext(fs.readFileSync(path.join(root,f),'utf8'),{filename:f});
const E=window.BAINT_ENGINE;let messages=[],subject='biology',mode='step';
async function ask(text){
  messages.push({role:'user',text});
  const r=await Promise.resolve(E.answer(text,{subject,mode,history:messages}));
  if(r&&r._action==='clear'){messages=[];return r}
  if(r&&r.subject)subject=r.subject;
  messages.push({role:'baint',...r});return r;
}
const reload=()=>{messages=JSON.parse(JSON.stringify(messages));E.reset()};   // simulate closing and reopening the app
const rows=[];let fail=0;
const T=(name,q,ok)=>{rows.push([name,q,ok?'PASS':'FAIL']);if(!ok)fail++};
const blob=r=>[r.lead,r.text,(r.steps||[]).map(s=>s.text).join(' | ')].join(' | ');
(async()=>{
  let r=await ask('Explain enzymes');
  T('Reply stamped with topic','Explain enzymes',r.mem&&r.mem.topic==='Enzymes');
  r=await ask('what are its disadvantages?');
  T('Follow-up keeps topic','what are its disadvantages?',/Enzymes/.test(r.lead)&&/disadvantages/i.test(blob(r))&&/Continuing with Enzymes/.test(r.lead));
  r=await ask('and an example?');
  T('Follow-up: example','and an example?',/Enzymes/.test(blob(r))&&/Example/i.test(blob(r)));
  r=await ask('hi');
  T('Greeting not hijacked','hi',/Hello/.test(blob(r))&&!/Continuing/.test(r.lead));
  r=await ask('Explain photosynthesis');
  r=await ask('what did I ask earlier?');
  T('Recall previous question','what did I ask earlier?',/Explain photosynthesis/.test(blob(r)));
  r=await ask('what was my first question');
  T('Recall first question','what was my first question',/Explain enzymes/.test(blob(r)));
  r=await ask('what have we covered so far?');
  T('Recap lists questions and topics','what have we covered so far?',/Enzymes/.test(blob(r))&&/Photosynthesis/.test(blob(r))&&r.steps.length>=3);
  r=await ask('did I ask about photosynthesis?');
  T('Find earlier message','did I ask about photosynthesis?',/Found in this conversation/.test(r.lead)&&/photosynthesis/i.test(blob(r)));
  r=await ask('did I ask about volcanoes?');
  T('Honest when not found','did I ask about volcanoes?',/do not see that/.test(r.lead));
  r=await ask('repeat that');
  T('Repeat last answer (recall)','repeat that',/Again:/.test(r.lead||''));
  /* reload: memory survives */
  reload();
  r=await ask('Explain photosynthesis');            // topic stamped again after reload
  r=await ask('what are the advantages?');
  T('After reload: follow-up still works','what are the advantages?',/Photosynthesis/.test(blob(r)));
  r=await ask('what did I ask first');
  T('After reload: recall works','what did I ask first',/Explain enzymes/.test(blob(r)));
  /* maths untouched */
  r=await ask('Solve 2x + 3 = 11');
  T('Maths untouched','Solve 2x + 3 = 11',/x = 4/.test(blob(r))&&!r.mem);
  r=await ask('Calculate 25% of 800');
  T('Numeric untouched','Calculate 25% of 800',/200/.test(blob(r)));
  r=await ask('clear history');
  T('Clear command','clear history',r._action==='clear'&&messages.length===0);
  r=await ask('what did I ask earlier?');
  T('Nothing after clearing','what did I ask earlier?',/No earlier question/.test(r.lead));
  console.log("| Test | Question | Status |\n|---|---|---|");rows.forEach(x=>console.log("| "+x.join(" | ")+" |"));
  console.log("\n"+(rows.length-fail)+"/"+rows.length+" passed");process.exit(fail?1:0);
})();
