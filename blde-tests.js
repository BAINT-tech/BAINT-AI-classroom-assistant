/* Run: node tests/blde-tests.js   BLDE behaviour with a MOCK network (online / slow / offline) and in-memory storage. */
const vm=require('vm'),fs=require('fs'),path=require('path');
global.window=global;global.localStorage={getItem(){return null},setItem(){}};
global.navigator={onLine:true};
let calls=[],mode="ok";
global.fetch=async(url,opt)=>{
  calls.push(url);
  if(mode==="slow"){const e=new Error("aborted");e.name="AbortError";throw e}
  const q=decodeURIComponent((url.match(/gsrsearch=([^&]+)/)||[])[1]||"").toLowerCase();
  const wp=url.includes("wikipedia");
  let pages={};
  if(wp&&/black hole/.test(q))pages={1:{pageid:1,title:"Black hole",index:1,fullurl:"https://en.wikipedia.org/wiki/Black_hole",extract:"A black hole is a region of spacetime where gravity is so strong that nothing, not even light, can escape from it. The boundary of no escape is called the event horizon. Black holes form when massive stars collapse at the end of their life. They can grow by absorbing mass from their surroundings."}};
  if(wp&&/zzzz/.test(q))pages={};
  return {ok:true,json:async()=>({query:{pages}})};
};
const root=path.join(__dirname,'..');
for(const f of ['lessons.js','lessons-extra.js','lessons-approved.js','solver.js','numeric.js','engine.js','blde.js'])vm.runInThisContext(fs.readFileSync(path.join(root,f),'utf8'),{filename:f});
const E=window.BAINT_ENGINE,N0=EDU_LESSONS.length;
const rows=[];let fail=0;
async function T(name,q,subj,check){
  E.reset();const before=calls.length;
  const r=await Promise.resolve(E.answer(q,{subject:subj,mode:'step'}));
  const blob=[r.lead,r.text,(r.steps||[]).map(s=>s.text).join(' '),r.hint,r.check].join(' | ');
  const ok=!!check(r,blob,calls.length-before);if(!ok)fail++;
  rows.push([name,q.slice(0,52),(r.lead||'').slice(0,34),ok?'PASS':'FAIL']);
  if(!ok)console.log('FAIL detail:',name,'\n',blob.slice(0,400));
  return r;
}
(async()=>{
  await T('Exact lesson untouched','Explain photosynthesis','biology',(r,b,c)=>/glucose/i.test(b)&&c===0);
  await T('Maths untouched','Solve 2x + 3 = 11','math',(r,b,c)=>/x = 4/.test(b)&&c===0);
  await T('Percent untouched','Calculate 25% of 800','biology',(r,b,c)=>/200/.test(b)&&c===0);
  await T('Out of scope: no search','Who was the first president of Nigeria','history',(r,b,c)=>/outside BAINT/.test(b)&&c===0);
  await T('Concept inside lesson (verified)','What is the relationship between enzymes and temperature?','biochemistry',(r,b,c)=>/temperature/i.test(b)&&/verified/i.test(b)&&c===0&&/Biochemistry|Enzymes/.test(b));
  mode="ok";
  const w=await T('Discovery online','What is a black hole?','physics',(r,b,c)=>c>0&&/Black hole/.test(b)&&/UNVERIFIED/.test(b)&&/wikipedia\.org/.test(b)&&/CC BY-SA/.test(b));
  rows.push(['Pending, not in library','',((await BLDE.list('pending')).length+' pending / lessons '+N0+'→'+EDU_LESSONS.length),(await BLDE.list('pending')).length===1&&EDU_LESSONS.length===N0?'PASS':'FAIL']);if(rows[rows.length-1][3]==='FAIL')fail++;
  navigator.onLine=false;
  await T('Offline + saved copy','What is a black hole?','physics',(r,b,c)=>c===0&&/Saved copy/.test(b));
  await T('Offline, never searched','What is a quasar zzzz?','physics',(r,b,c)=>c===0&&/offline/i.test(b)&&/will not guess/.test(b)&&!/UNVERIFIED/.test(b));
  navigator.onLine=true;mode="slow";
  await T('Weak connection','What is a quasar zzzz?','physics',(r,b,c)=>/too weak/i.test(b)&&!/UNVERIFIED/.test(b));
  mode="ok";
  await T('Online, nothing relevant','What is a zzzz quark?','physics',(r,b,c)=>/found nothing relevant/.test(b));
  const id=(await BLDE.list('pending'))[0].id;await BLDE.setStatus(id,'approved');
  navigator.onLine=false;
  await T('Approved item served','Tell me about black holes','physics',(r,b,c)=>/approved/i.test(b)&&c===0);
  navigator.onLine=true;
  const js=await BLDE.exportLessonsJS();
  vm.runInThisContext(js);
  const ok2=EDU_LESSONS.length===N0+1&&/eduAdd\("disc_black_hole"/.test(js);
  rows.push(['Export → lessons file','',ok2?'1 lesson added':'failed',ok2?'PASS':'FAIL']);if(!ok2)fail++;
  await T('Approved lesson now local','Explain black hole','physics',(r,b,c)=>/black hole/i.test(b)&&c===0);
  await T('Forced search chip','Search open resources for black hole formation','physics',(r,b,c)=>c>0||/approved/i.test(b));
  console.log("| Test | Question | Result | Status |\n|---|---|---|---|");rows.forEach(r=>console.log("| "+r.join(" | ")+" |"));
  console.log("\n"+(rows.length-fail)+"/"+rows.length+" passed");process.exit(fail?1:0);
})();
