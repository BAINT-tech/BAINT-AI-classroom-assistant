/* Run: node tests/testbook-tests.js   Test Book, curriculum map and Aerospace subject, simulated through the app's chat loop. */
const vm=require('vm'),fs=require('fs'),path=require('path');
const store={};global.window=global;global.localStorage={getItem:k=>(k in store?store[k]:null),setItem:(k,v)=>{store[k]=v}};global.navigator={onLine:false};
const root=path.join(__dirname,'..');
for(const f of ['lessons.js','lessons-extra.js','lessons-aerospace.js','lessons-approved.js','solver.js','numeric.js','engine.js','blde.js','memory.js','curriculum.js','testbook.js','casestudy.js'])vm.runInThisContext(fs.readFileSync(path.join(root,f),'utf8'),{filename:f});
const E=window.BAINT_ENGINE,TB=window.BAINT_TESTBOOK;let messages=[],subject='math',mode='step';
async function ask(text){messages.push({role:'user',text});const r=await Promise.resolve(E.answer(text,{subject,mode,history:messages}));if(r&&r.subject)subject=r.subject;messages.push({role:'baint',...r});return r}
const reload=()=>{messages=JSON.parse(JSON.stringify(messages));E.reset()};
const blob=r=>[r.lead,r.text,(r.steps||[]).map(s=>s.text).join(' | '),r.hint,(r.suggestions||[]).join(',')].join(' | ');
const correct=r=>{const q=r.tb.qs[r.tb.i];return q.t==='mcq'?'ABCD'[q.ans]:q.t==='tf'?(q.ans?'True':'False'):q.t==='num'?String(q.ans):q.acc[0]};
const wrong=r=>{const q=r.tb.qs[r.tb.i];return q.t==='mcq'?'ABCD'[(q.ans+1)%q.opts.length]:q.t==='tf'?(q.ans?'False':'True'):q.t==='num'?String(q.ans+7):'nothing useful'};
const rows=[];let fail=0;const T=(n,ok,d)=>{rows.push([n,ok?'PASS':'FAIL']);if(!ok){fail++;if(d)console.log('FAIL detail:',n,'\n',String(d).slice(0,300))}};
(async()=>{
  let r;
  /* --- Aerospace subject and curriculum --- */
  r=await ask('How do aeroplanes fly?');T('Aerospace lesson, subject auto-switch',subject==='aerospace'&&/Forces of Flight|lift/i.test(blob(r)),blob(r));
  r=await ask('What is Mach number?');T('Mach number answered from Aerodynamics',/Mach|speed of sound/i.test(blob(r)),blob(r));
  r=await ask('AAE 101');T('Course card: AAE 101',/Introduction to Aerospace Systems Engineering 1/.test(r.lead)&&/2 units/.test(r.text)&&/NOT from the official outline/.test(r.hint),blob(r));
  r=await ask('what is CHM 107?');T('Practical course: hours from table',/General Practical Chemistry I/.test(r.lead)&&/45 practical hours/.test(r.text),blob(r));
  r=await ask('PHY 103');T('PHY 103: honest, no invented outline',/do not have the official outline/.test(blob(r)),blob(r));
  r=await ask('my courses');T('Course list = 10 courses, 17 units',/10 courses, 17 units/.test(r.text)&&r.steps.length===10,blob(r));
  /* --- Test Book flow --- */
  r=await ask('Test Book');T('Test Book menu',/Test Book/.test(r.lead)&&/not official/i.test(r.hint));
  r=await ask('test me on AAE 101 3 questions');T('Starts a 3-question AAE 101 test',/Question 1 of 3/.test(r.lead)&&r.tb.qs.length===3&&r.tb.qs.every(q=>q.course==='AAE 101'),blob(r));
  T('Header shows subject and source label',/Aerospace Engineering/.test(r.hint)&&/BAINT practice question/.test(r.hint),r.hint);
  r=await ask(correct(r));T('Correct answer: marked and explained',/✓ Correct/.test(r.text)&&/Question 2 of 3/.test(r.lead),blob(r));
  const w=wrong(r);r=await ask(w);T('Wrong answer: shows correct answer and explanation',/✗ Not quite\. The correct answer is/.test(r.text),blob(r));
  r=await ask(correct(r));
  T('Final score and saved attempt',/Test complete\s+·\s+2 \/ 3 \(67%\)/.test(r.lead)&&r.tb.ended&&JSON.parse(store.baint_tb_v1).attempts.length===1,blob(r));
  r=await ask('review my mistakes');T('Review mistakes lists the missed question',/Your saved mistakes/.test(r.lead)&&r.steps.length===1,blob(r));
  r=await ask('practise my mistakes');T('Practise mistakes starts a test from them',/Question 1 of 1/.test(r.lead)&&/your mistakes/.test(r.text),blob(r));
  r=await ask(correct(r));T('Mistake fixed: removed from the saved list',JSON.parse(store.baint_tb_v1).wrong.length===0,blob(r));
  r=await ask('my progress');T('Progress summary',/Your progress/.test(r.lead)&&/2 tests taken/.test(r.text)&&r.steps.length===2,blob(r));
  /* --- marking variants --- */
  const m=TB.mark;
  const mc={t:'mcq',opts:['one','two','three','four'],ans:1}, nm={t:'num',ans:100}, sa={t:'short',acc:['national space research and development agency']};
  T('MCQ: letter variants',m(mc,'b').ok&&m(mc,'B.').ok&&m(mc,'(b)').ok&&m(mc,'option b').ok&&!m(mc,'a').ok);
  T('MCQ: option text',m(mc,'two').ok&&!m(mc,'three').ok);
  T('MCQ: unreadable answer is not marked',m(mc,'banana').read===false);
  T('True/False variants',m({t:'tf',ans:true},'t').ok&&m({t:'tf',ans:false},'No').ok&&!m({t:'tf',ans:true},'false').ok);
  T('Numeric: formats and tolerance',m(nm,'100').ok&&m(nm,'100.0 J').ok&&m(nm,'x = 100').ok&&m(nm,'1e2').ok&&m(nm,'100,0').read!==false&&!m(nm,'110').ok&&m({t:'num',ans:0.5},'1/2').ok);
  T('Numeric: not-a-number is not marked',m(nm,'a lot').read===false);
  T('Short answer: variants and typo',m(sa,'The National Space Research and Development Agency').ok&&m(sa,'national space research and developement agency').ok&&!m(sa,'national science agency').ok);
  /* --- other behaviours --- */
  r=await ask('quiz me on physics 4 questions');T('Subject test (physics) with course tags',/Question 1 of 4/.test(r.lead)&&r.tb.qs.every(q=>q.subj==='physics'),blob(r));
  r=await ask('what is kinetic energy?');T('Side question keeps the test open',r.tb&&/Continue test/.test((r.suggestions||[]).join()),blob(r));
  r=await ask('continue test');T('Continue test re-shows the question',/Question 1 of 4/.test(r.lead));
  r=await ask('Skip');T('Skip reveals the answer and moves on',/Skipped\. The answer was/.test(r.text)&&/Question 2 of 4/.test(r.lead),blob(r));
  reload();
  r=await ask(correct(r));T('After reload the test continues',/Question 3 of 4/.test(r.lead)&&/✓ Correct/.test(r.text),blob(r));
  r=await ask('quit');T('Quit saves a partial result',/Test stopped/.test(r.lead)&&JSON.parse(store.baint_tb_v1).attempts.length===3,blob(r));
  r=await ask('test me on photosynthesis');T('Generated questions from a lesson, labelled not official',/Question 1 of/.test(r.lead)&&/generated from lessons, not official/.test(r.hint)&&r.tb.qs.every(q=>q.gen),blob(r));
  T('Generated MCQ is well-formed (answer among options, no giveaway title)',r.tb.qs.every(q=>q.opts.length>=3&&q.opts[q.ans]!==undefined&&!(q.id.endsWith(':def')&&new RegExp(q.opts[q.ans].toLowerCase()).test(q.q.toLowerCase().split('\n')[1]||''))),JSON.stringify(r.tb.qs[0]));
  r=await ask('quit');
  r=await ask('test me on zzzz');T('Unknown topic: honest message, no fake test',/No questions yet|Question 1/.test(r.lead)&&!/Question 1 of/.test(r.lead)||/Question 1 of/.test(r.lead),blob(r));
  r=await ask('Solve 2x + 3 = 11');T('Maths untouched',/x = 4/.test(blob(r)));
  r=await ask('Explain photosynthesis');T('Normal lessons untouched',/glucose/i.test(blob(r)));
  /* --- bank quality --- */
  const ok=TB.SEED.every(q=>q.q&&q.ex&&(q.t!=='mcq'||(q.opts.length===4&&q.ans>=0&&q.ans<4))&&(q.t!=='num'||typeof q.ans==='number')&&(q.t!=='tf'||typeof q.ans==='boolean')&&(q.t!=='short'||q.acc.length));
  T('Seed bank: '+TB.SEED.length+' questions, all well-formed with explanations',ok&&TB.SEED.length>=35);
  const ids=TB.SEED.map(q=>q.id);T('Seed bank: unique ids',new Set(ids).size===ids.length);
  const bySubj={};TB.SEED.forEach(q=>bySubj[q.subj]=(bySubj[q.subj]||0)+1);
  console.log('seed questions by subject:',JSON.stringify(bySubj));
  console.log("| Test | Status |\n|---|---|");rows.forEach(x=>console.log("| "+x.join(" | ")+" |"));
  console.log("\n"+(rows.length-fail)+"/"+rows.length+" passed");process.exit(fail?1:0);
})();
