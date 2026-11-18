/* ══════════════════════════════════════════════════════════════════════════
   BAINT CONVERSATIONS STORE  -  chats.js
   Keeps many chats on this device (localStorage): recent list, new chat, open, delete, search.
   Pure logic with no DOM, so it can be tested on its own. Each chat holds its own messages,
   so memory.js (follow-ups, recall) and the case-study builder stay inside one conversation.
   ══════════════════════════════════════════════════════════════════════════ */
(function(){
"use strict";
const KEY="baint_chats_v2", OLD="baint_chat_v1", MAX_CHATS=25, MAX_MSGS=40;
let store={active:null,chats:[]};
const ls=()=>{try{return window.localStorage}catch(e){return null}};
const uid=()=>"c"+Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const flat=s=>String(s||"").replace(/\s+/g," ").trim();
function titleOf(messages){
  const u=(messages||[]).find(m=>m.role==="user"&&m.text);
  const t=u?flat(u.text):"";
  return t?(t.length>48?t.slice(0,47)+"…":t):"New chat";
}
function persist(){
  const s=ls(); if(!s)return;
  for(let n=0;n<MAX_CHATS+2;n++){
    try{s.setItem(KEY,JSON.stringify(store));return}
    catch(e){ if(store.chats.length<=1)return; store.chats.pop(); }   // storage full: drop the oldest chat
  }
}
function load(){
  const s=ls(); store={active:null,chats:[]};
  try{
    const cur=JSON.parse(s&&s.getItem(KEY)||"null");
    if(cur&&Array.isArray(cur.chats)){store=cur}
    else{                                                              // migrate the single saved chat from v9
      const old=JSON.parse(s&&s.getItem(OLD)||"null");
      if(old&&Array.isArray(old.messages)&&old.messages.length){
        const c={id:uid(),title:titleOf(old.messages),subject:old.subject,mode:old.mode,updated:Date.now(),messages:old.messages.slice(-MAX_MSGS)};
        store={active:c.id,chats:[c]};persist();
      }
    }
  }catch(e){store={active:null,chats:[]}}
  const c=store.chats.find(x=>x.id===store.active);
  return c?{id:c.id,subject:c.subject,mode:c.mode,messages:c.messages.slice()}:null;
}
function save(snap){
  const msgs=(snap&&snap.messages)||[];
  let c=store.chats.find(x=>x.id===store.active);
  if(!msgs.length){                                                    // an empty chat is never kept
    if(c)store.chats=store.chats.filter(x=>x!==c);
    store.active=null;persist();return;
  }
  if(!c){c={id:uid(),title:"",subject:snap.subject,mode:snap.mode,updated:0,messages:[]};store.chats.unshift(c);store.active=c.id}
  const top=store.chats.reduce((m,x)=>Math.max(m,x.updated||0),0);   // strictly increasing, so two saves in one millisecond keep their order
  c.messages=msgs.slice(-MAX_MSGS);c.subject=snap.subject;c.mode=snap.mode;c.updated=Math.max(Date.now(),top+1);c.title=titleOf(c.messages);
  store.chats.sort((a,b)=>b.updated-a.updated);store.chats=store.chats.slice(0,MAX_CHATS);
  persist();
}
function newChat(){store.active=null;persist()}
function open(id){
  const c=store.chats.find(x=>x.id===id); if(!c)return null;
  store.active=id;persist();
  return {id:c.id,subject:c.subject,mode:c.mode,messages:c.messages.slice()};
}
function remove(id){
  const was=store.active===id;
  store.chats=store.chats.filter(x=>x.id!==id);
  if(was)store.active=null;
  persist();return was;
}
function clearAll(){store={active:null,chats:[]};persist()}
const textOf=m=>[m.text,m.lead,(m.steps||[]).map(s=>s.text).join(" ")].join(" ").toLowerCase();
function list(query){
  const q=flat(query).toLowerCase();
  return store.chats.filter(c=>!q||c.title.toLowerCase().includes(q)||c.messages.some(m=>textOf(m).includes(q)))
    .map(c=>({id:c.id,title:c.title,subject:c.subject,mode:c.mode,updated:c.updated,count:c.messages.length,active:c.id===store.active}));
}
function relTime(t){
  const d=Date.now()-t,m=60000;
  if(d<m)return "Just now"; if(d<60*m)return Math.floor(d/m)+" min ago"; if(d<24*60*m)return Math.floor(d/(60*m))+" h ago";
  if(d<48*60*m)return "Yesterday";
  return new Date(t).toLocaleDateString(undefined,{day:"numeric",month:"short"});
}
window.BAINT_CHATS={load,save,newChat,open,remove,clearAll,list,relTime,titleOf,activeId:()=>store.active};
})();
