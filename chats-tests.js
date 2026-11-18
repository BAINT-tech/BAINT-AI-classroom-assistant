/* Run: node tests/chats-tests.js   Tests the conversations store (recent list, new chat, open, delete, search, migration, quota). */
const vm=require('vm'),fs=require('fs'),path=require('path');
function fresh(initial,limit){
  const data=Object.assign({},initial||{});let size=()=>Object.values(data).join('').length;
  global.window=global;
  global.localStorage={getItem:k=>(k in data?data[k]:null),setItem:(k,v)=>{if(limit&&v.length>limit)throw new Error('QuotaExceeded');data[k]=v}};
  delete global.BAINT_CHATS;
  vm.runInThisContext(fs.readFileSync(path.join(__dirname,'..','chats.js'),'utf8'));
  return {C:global.BAINT_CHATS,data};
}
const U=t=>({role:'user',text:t}),B=t=>({role:'baint',lead:t,text:t+' answer'});
const rows=[];let fail=0;const T=(n,ok)=>{rows.push([n,ok?'PASS':'FAIL']);if(!ok)fail++};
{
  let {C,data}=fresh();
  T('Starts empty, nothing to restore',C.load()===null&&C.list().length===0);
  C.save({subject:'math',mode:'step',messages:[U('Explain algebra'),B('Algebra')]});
  T('First chat is saved with a title',C.list().length===1&&C.list()[0].title==='Explain algebra'&&C.list()[0].active);
  C.save({subject:'math',mode:'step',messages:[U('Explain algebra'),B('Algebra'),U('and an example?'),B('Example')]});
  T('Saving again updates the SAME chat',C.list().length===1&&C.list()[0].count===4);
  C.newChat();
  T('New chat: nothing active yet',C.activeId()===null);
  C.save({subject:'biology',mode:'simple',messages:[U('What is photosynthesis?'),B('Photosynthesis')]});
  T('Second chat is a separate conversation',C.list().length===2&&C.list()[0].title==='What is photosynthesis?');
  T('Most recent chat is first',C.list()[0].subject==='biology'&&C.list()[1].subject==='math');
  const first=C.list()[1].id, o=C.open(first);
  T('Open returns that chat messages, subject and mode',o&&o.messages.length===4&&o.subject==='math'&&o.mode==='step'&&C.activeId()===first);
  C.save({subject:'math',mode:'logic',messages:o.messages.concat([U('thanks'),B('ok')])});
  T('Continuing an opened chat updates it, no duplicate',C.list().length===2&&C.list().find(x=>x.id===first).count===6);
  T('Search finds a word inside answers',C.list('photosynthesis').length===1&&C.list('algebra').length===1);
  T('Search with no match is empty',C.list('volcano').length===0);
  /* reload simulation */
  ({C}=fresh(data));
  const r=C.load();
  T('Reload restores the last active chat',r&&r.messages.length===6&&r.mode==='logic'&&C.list().length===2);
  const del=C.remove(C.list()[0].id);
  T('Delete active chat reports it and clears active',del===true&&C.activeId()===null&&C.list().length===1);
  C.save({subject:'math',mode:'step',messages:[]});
  T('Saving an empty chat keeps nothing',C.list().length===1);
  C.clearAll();T('Clear all',C.list().length===0);
}
{
  const old=JSON.stringify({subject:'biology',mode:'simple',messages:[U('Explain cells'),B('Cells')]});
  const {C}=fresh({baint_chat_v1:old});
  const r=C.load();
  T('Migrates the old single saved chat (v9)',r&&r.messages.length===2&&C.list().length===1&&C.list()[0].title==='Explain cells');
}
{
  const {C}=fresh();
  for(let i=0;i<30;i++){C.newChat();C.save({subject:'math',mode:'step',messages:[U('question '+i),B('a'+i)]})}
  T('Keeps at most 25 chats',C.list().length===25&&C.list()[0].title==='question 29');
}
{
  const {C}=fresh({},3000);                               // tiny storage: forces the oldest chats to be dropped
  for(let i=0;i<12;i++){C.newChat();C.save({subject:'math',mode:'step',messages:[U('q'+i+' '+'x'.repeat(300)),B('a')]})}
  T('Storage full: drops oldest, never crashes, keeps newest',C.list().length>=1&&C.list().length<12&&C.list()[0].title.startsWith('q11'));
}
{
  const {C}=fresh();const long=U('a'.repeat(200));
  C.save({subject:'math',mode:'step',messages:[long]});
  T('Long titles are shortened',C.list()[0].title.length<=48&&C.list()[0].title.endsWith('…'));
  const m=Array.from({length:70},(_,i)=>U('m'+i));C.save({subject:'math',mode:'step',messages:m});
  T('Keeps only the last 40 messages of a chat',C.list()[0].count===40);
  T('relTime wording',C.relTime(Date.now())==='Just now'&&/min ago/.test(C.relTime(Date.now()-5*60000))&&/h ago/.test(C.relTime(Date.now()-3*3600000))&&C.relTime(Date.now()-30*3600000)==='Yesterday');
}
console.log("| Test | Status |\n|---|---|");rows.forEach(x=>console.log("| "+x.join(" | ")+" |"));
console.log("\n"+(rows.length-fail)+"/"+rows.length+" passed");process.exit(fail?1:0);
