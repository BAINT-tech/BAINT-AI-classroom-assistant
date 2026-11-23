/* Run: node tests/build-ui-smoke.js
   SMOKE test of build.html's script against a fake DOM: proves it loads, opens/creates projects, draws files, runs every toolbar
   action and handles an iframe error message WITHOUT exceptions. It cannot test real layout, touch, iframe sandboxing, Workers or IndexedDB. */
const vm=require('vm'),fs=require('fs'),path=require('path');
const html=fs.readFileSync(path.join(__dirname,'..','build.html'),'utf8');
const script=[...html.matchAll(/<script>\n([\s\S]*?)<\/script>/g)].pop()[1];
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
class El{constructor(id){this.id=id;this.children=[];this.textContent='';this.value='';this.className='';this.style={};this.dataset={};this.handlers={};this.srcdoc='';this.scrollTop=0;this.selectionStart=0;this.selectionEnd=0;this.contentWindow={};this.selectedOptions=[{text:'My first page'}];this.classList={add:c=>{this.cls=(this.cls||[]).concat(c)},remove(){},toggle(){}}}
 append(...a){a.forEach(x=>{if(typeof x==='string')this.textContent+=x;else this.children.push(x)})}prepend(x){this.children.unshift(x)}remove(){}click(){if(this.onclick)this.onclick()}focus(){}setSelectionRange(){}dispatchEvent(){}setAttribute(){}
 addEventListener(e,f){(this.handlers[e]=this.handlers[e]||[]).push(f)}set textContent(v){this._t=v;if(v==='')this.children=[]}get textContent(){return this._t||''}}
const els={};ids.forEach(i=>els[i]=new El(i));
const winHandlers={};let errors=[];
const ctx={document:{getElementById:i=>els[i]||(els[i]=new El(i)),createElement:t=>new El(t),head:new El('head'),body:new El('body')},navigator:{onLine:true},location:{protocol:'file:',hostname:''},
 localStorage:{_d:{},getItem(k){return this._d[k]||null},setItem(k,v){this._d[k]=v}},Blob:class{constructor(p){this.p=p}},URL:{createObjectURL:()=>'blob:x'},Event:class{},
 prompt:q=>/What do you want/.test(q)?'calculator':'My project',confirm:()=>true,setTimeout,clearTimeout,console,Date,Math,JSON,String,Promise};
ctx.window=ctx;ctx.window.addEventListener=(e,f)=>{(winHandlers[e]=winHandlers[e]||[]).push(f)};
ctx.OKE_BUILD=require('../build-core.js');ctx.OKE_STORE=require('../build-store.js');
const rows=[];let fail=0;const T=(n,ok,d)=>{rows.push([n,ok?'PASS':'FAIL']);if(!ok){fail++;console.log('FAIL detail:',n,String(d||'').slice(0,300))}};
process.on('unhandledRejection',e=>errors.push(String(e&&e.stack||e)));
(async()=>{
  try{vm.runInNewContext(script,ctx,{filename:'build.html'})}catch(e){errors.push(String(e.stack||e))}
  await new Promise(r=>setTimeout(r,80));
  T('Page script loads without errors',errors.length===0,errors.join('\n'));
  T('First start creates "My first page" and draws its 3 files',els.pname.textContent==='My first page'&&els.files.children.length>=4,els.pname.textContent+' '+els.files.children.length);
  T('Editor shows the file and the line numbers',/<!DOCTYPE html>/.test(els.ed.value)&&els.gut.textContent.split('\n').length>10);
  els.ed.value+='\n<!-- edit -->';(els.ed.handlers.input||[]).forEach(f=>f());
  els.save.onclick();await new Promise(r=>setTimeout(r,40));
  T('Typing then Save stores the edit',(await ctx.OKE_STORE.list()).length===1&&(await ctx.OKE_STORE.get((await ctx.OKE_STORE.list())[0].id)).files['index.html'].includes('<!-- edit -->'));
  for(const b of ['check','expl','impr']){try{els[b].onclick()}catch(e){errors.push(b+': '+e.stack)}}
  T('Check, Explain code and Improve buttons run',errors.length===0&&els.assist.children.length>0,errors.join('\n'));
  els.run.onclick();
  T('Run switches to TEST and sets the sandboxed preview document',/oke:1/.test(els.frame.srcdoc)&&/<h1 id="title">/.test(els.frame.srcdoc)&&/sandbox="allow-scripts"/.test(html)&&!/allow-same-origin/.test(html),els.frame.srcdoc.slice(0,100));
  const msg=(winHandlers.message||[])[0];
  msg({source:els.frame.contentWindow,data:{oke:1,type:'console',level:'log',text:'hello from the page'}});
  T('Console messages from the page are shown',els.con.children.some(c=>/hello from the page/.test(c.textContent)));
  msg({source:els.frame.contentWindow,data:{oke:1,type:'error',message:"Cannot read properties of null (reading 'addEventListener')",line:5}});
  T('A page error is mapped, explained and an explanation card appears',els.tassist.children.length===1&&els.con.children.some(c=>/Error/.test(c.textContent)),errors.join('\n'));
  msg({source:{},data:{oke:1,type:'error',message:'spoofed',line:1}});
  T('Messages from other windows are ignored',els.tassist.children.length===1);
  els.gen.onclick();await new Promise(r=>setTimeout(r,60));
  T('Generate (calculator) creates a NEW project; the first is unchanged',els.pname.textContent==='Calculator'&&(await ctx.OKE_STORE.list()).length===2);
  els.exp.onclick();T('Export ZIP runs without error',errors.length===0,errors.join('\n'));
  els.dq.value='flexbox';(els.dq.handlers.input||[]).forEach(f=>f());
  T('Offline docs search shows a Flexbox card',els.dout.children.length>=1&&/Flexbox/.test(els.dout.children[0].children[0].textContent));
  ctx.prompt=q=>'a banking system';els.gen.onclick();await new Promise(r=>setTimeout(r,30));
  T('Generate says honestly when it cannot build something',/cannot build that yet/.test(els.assist.children[0].children[0].textContent)&&els.pname.textContent==='Calculator');
  els.projBtn.onclick();await new Promise(r=>setTimeout(r,30));
  T('Project list shows both projects',els.projList.children.length===2);
  T('No exceptions during the whole session',errors.length===0,errors.join('\n'));
  console.log("| Test | Status |\n|---|---|");rows.forEach(x=>console.log("| "+x.join(" | ")+" |"));
  console.log("\n"+(rows.length-fail)+"/"+rows.length+" passed");process.exit(fail?1:0);
})();
