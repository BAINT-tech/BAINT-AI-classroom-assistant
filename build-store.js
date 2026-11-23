/* OKE BUILD MODE - PROJECT STORE (build-store.js)
   Isolated storage: its own IndexedDB database "oke_projects". It never touches the lesson app's data
   (localStorage chats, "baint_blde" database, caches). If IndexedDB is unavailable it falls back to a
   separate localStorage key, so the workspace still works. */
(function(root){
"use strict";
const DB="oke_projects",STORE="projects",FB="oke_projects_fallback";
let dbp=null;const mem=new Map();let fbLoaded=false;
const ls=()=>{try{return root.localStorage||null}catch(e){return null}};
function loadFB(){if(fbLoaded)return;fbLoaded=true;try{const a=JSON.parse((ls()&&ls().getItem(FB))||"[]");a.forEach(p=>mem.set(p.id,p))}catch(e){}}
function saveFB(){try{ls()&&ls().setItem(FB,JSON.stringify([...mem.values()]))}catch(e){}}
function db(){
  if(dbp)return dbp;
  dbp=new Promise((res,rej)=>{
    if(typeof indexedDB==="undefined"||!indexedDB)return rej(new Error("no-idb"));
    const r=indexedDB.open(DB,1);
    r.onupgradeneeded=()=>{r.result.createObjectStore(STORE,{keyPath:"id"})};
    r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error);r.onblocked=()=>rej(new Error("blocked"));
  });
  return dbp;
}
function run(mode,fn){return db().then(d=>new Promise((res,rej)=>{const t=d.transaction(STORE,mode),req=fn(t.objectStore(STORE));t.oncomplete=()=>res(req&&"result" in req?req.result:undefined);t.onerror=()=>rej(t.error);t.onabort=()=>rej(t.error)}))}
const newId=()=>"p"+Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const clean=p=>({id:p.id,name:String(p.name||"Untitled").slice(0,60),created:p.created,updated:p.updated,active:p.active,files:Object.assign({},p.files)});
async function list(){
  let rows;try{rows=await run("readonly",s=>s.getAll())}catch(e){loadFB();rows=[...mem.values()]}
  return rows.map(p=>({id:p.id,name:p.name,updated:p.updated,created:p.created,count:Object.keys(p.files||{}).length})).sort((a,b)=>b.updated-a.updated);
}
async function get(id){let p;try{p=await run("readonly",s=>s.get(id))}catch(e){loadFB();p=mem.get(id)}return p?clean(p):null}
async function save(p){
  p=clean(Object.assign({created:Date.now()},p,{id:p.id||newId()}));p.updated=Date.now();
  try{await run("readwrite",s=>s.put(p))}catch(e){loadFB();mem.set(p.id,p);saveFB()}
  return p;
}
async function remove(id){try{await run("readwrite",s=>s.delete(id))}catch(e){loadFB();mem.delete(id);saveFB()}}
const API={list,get,save,remove,newId,storageName:DB};
if(typeof module!=="undefined"&&module.exports)module.exports=API;else root.OKE_STORE=API;
})(typeof window!=="undefined"?window:globalThis);
