/* Run: node tests/build-tests.js    Build Mode logic: the 10 required tests, as far as they can be tested outside a browser.
   NOT covered here (needs a real phone): the editor screen, sandboxed iframe, Web Worker, IndexedDB, service worker. */
const vm=require('vm'),fs=require('fs'),path=require('path'),cp=require('child_process'),os=require('os');
const B=require('../build-core.js'),S=require('../build-store.js');
const rows=[];let fail=0;const T=(n,ok,d)=>{rows.push([n,ok?'PASS':'FAIL']);if(!ok){fail++;console.log('FAIL detail:',n,'\n',String(typeof d==='string'?d:JSON.stringify(d)).slice(0,500))}};

/* a tiny fake DOM so project scripts can really run in Node */
function dom(html){
  const els={},handlers={};
  (html.match(/id="([^"]+)"/g)||[]).forEach(m=>{const id=m.slice(4,-1);els[id]={id,textContent:'',value:'',dataset:{},classList:{toggle(){},add(){},remove(){}},addEventListener(e,f){(handlers[id+':'+e]=handlers[id+':'+e]||[]).push(f)},appendChild(){}}});
  const keys=[];(html.match(/<button data-key="([^"]+)"/g)||[]).forEach(m=>{const k=m.match(/data-key="([^"]+)"/)[1];const b={dataset:{key:k},addEventListener(e,f){(handlers['key'+k+':'+e]=handlers['key'+k+':'+e]||[]).push(f)}};keys.push(b)});
  const document={getElementById:id=>els[id]||null,querySelectorAll:()=>keys,createElement:()=>({classList:{toggle(){}},addEventListener(){}}),addEventListener(){}};
  const fire=(id,e)=>(handlers[id+':'+(e||'click')]||[]).forEach(f=>f());
  return {document,els,fire,keys,handlers};
}
function run(F,{htmlName='index.html'}={}){
  const d=dom(F[htmlName]),logs=[];
  try{vm.runInNewContext(F['script.js'],{document:d.document,console:{log:(...a)=>logs.push(a.join(' ')),error:(...a)=>logs.push(a.join(' '))},setInterval(){},parseFloat,Date,String,Error,Math},{filename:'script.js'});return {ok:true,d,logs}}
  catch(e){
    // line number inside script.js from the stack, like the browser reports it
    const m=String(e.stack||'').match(/script\.js:(\d+)/);return {ok:false,error:{message:e.message,line:m?+m[1]:0,file:'script.js'},d,logs}}
}
const click=(d,key)=>{const b=d.keys.find(k=>k.dataset.key===key);(d.handlers['key'+key+':click']||[]).forEach(f=>f())};

/* TEST 1: basic HTML page */
const hello=B.template('hello');
T('1. Create a basic HTML page (starter has no problems)',B.check(hello.files).filter(x=>x.level==='error').length===0&&/<h1/.test(hello.files['index.html']));
/* TEST 2: CSS styling + preview */
const pv=B.buildPreview(hello.files);
T('2. CSS is applied in the preview (stylesheet inlined, console capture added)',/<style>[\s\S]*color: #2563eb[\s\S]*<\/style>/.test(pv.html)&&/oke:1/.test(pv.html)&&pv.map.length===1&&!/href="style\.css"/.test(pv.html));
T('2b. Preview line mapping points back to script.js',(()=>{const m=pv.map[0];const r=B.mapLine(pv.map,m.start+2);return r&&r.file==='script.js'&&r.line===3})());
/* TEST 3: JavaScript that performs a calculation */
const calc=B.template('calculator');
let r=run(calc.files);
T('3. Calculator script loads and runs without error',r.ok);
click(r.d,'2');click(r.d,'+');click(r.d,'3');click(r.d,'*');click(r.d,'4');r.d.fire('equals');
T('3b. It calculates 2+3*4 = 14 (operator precedence)',r.d.els.display.textContent==='14',r.d.els.display.textContent);
const calcFn=(()=>{const code=calc.files['script.js'];const seg=code.slice(code.indexOf('function calculate'),code.lastIndexOf('show();'));const c={};vm.runInNewContext(seg+';this.calculate=calculate;',c);return c.calculate})();
T('3c. calculate(): brackets, division, decimals and errors',calcFn('(1+2)*3')===9&&calcFn('10/4')===2.5&&calcFn('2.5*2')===5&&(()=>{try{calcFn('2+');return false}catch(e){return true}})());
/* TEST 4: deliberate errors are identified */
const bug=B.template('calc_bug');
const chk=B.check(bug.files);
T('4a. Static check finds the wrong id BEFORE running (equalz → equals)',chk.some(x=>x.kind==='missing-id'&&/equalz/.test(x.msg)&&x.fix&&x.fix.replace==='equals'),chk);
r=run(bug.files);
T('4b. Running the buggy calculator throws the real browser-style error',!r.ok&&/Cannot read properties of null \(reading 'addEventListener'\)/.test(r.error.message),r.error);
const typo=Object.assign({},calc.files,{'script.js':calc.files['script.js'].replace("display.textContent = expr || '0';","display.textContent = exprr || '0';")});
r=run(typo);setTimeout(()=>{},0);
T('4c. A misspelt variable fails at run time',(()=>{const rr=run(typo);if(rr.ok){const d=rr.d;try{click(d,'2')}catch(e){return /exprr is not defined/.test(e.message)}return false}return /exprr is not defined/.test(rr.error.message)})());
/* TEST 5: explain the error */
const e1=B.explainError(r.ok?{message:"exprr is not defined",file:'script.js',line:5}:r.error,typo);
T('5a. ReferenceError explained in plain language with a fix',/not defined/.test(e1.title)&&e1.plain.length>20&&e1.why.length>=2&&e1.fix&&e1.fix.replace==='expr',e1);
const e2=B.explainError({message:"Cannot read properties of null (reading 'addEventListener')",file:'script.js',line:13},bug.files);
T('5b. Null-element error explained; points at the exact id mismatch',/element that was not found/.test(e2.plain)&&/equalz/.test(e2.how.join(' '))&&e2.fix&&e2.fix.replace==='equals'&&e2.confidence==='high',e2);
/* TEST 6: apply the correction and rerun */
const fixed=B.applyFix(bug.files,e2.fix);
r=run(fixed);
T('6a. Fix applied (new files object; original untouched)',fixed&&fixed['script.js'].includes("getElementById('equals')")&&bug.files['script.js'].includes("equalz"));
click(r.d,'6');click(r.d,'*');click(r.d,'7');r.d.fire('equals');
T('6b. After the fix the project runs and 6*7 = 42',r.ok&&r.d.els.display.textContent==='42',r.d&&r.d.els.display.textContent);
const e1fix=B.applyFix(typo,e1.fix);const rr2=run(e1fix);click(rr2.d,'5');
T('6c. Variable-typo fix works and the page responds again',rr2.ok&&rr2.d.els.display.textContent==='5');
T('6d. After fixing, the static check is clean',B.check(fixed).filter(x=>x.level==='error').length===0);
/* more error families */
const src1="function go() {\n  if (x > 1) {\n    console.log('hi');\n}\n";
let se=null;try{new vm.Script(src1)}catch(e){se=e}
const e3=B.explainError({message:se.message,file:'script.js',line:1},{'script.js':src1,'index.html':''});
T('7a. Missing brace: located and fix offered',/Syntax error/.test(e3.title)&&e3.fix&&e3.fix.appendEnd==='}'&&/never closed/.test(e3.how.join(' ')),e3);
T('7b. Brace fix produces balanced code',B.brackets(B.applyFix({'script.js':src1},e3.fix)['script.js']).length===0);
const e4=B.explainError({message:"Assignment to constant variable.",file:'script.js'},{'script.js':"const total = 0;\nfunction add(n) { total += n; }\n",'index.html':''});
T('7c. const reassigned → suggests let',e4.fix&&e4.fix.replace==='let total'&&B.applyFix({'script.js':"const total = 0;\nfunction add(n) { total += n; }\n"},e4.fix)['script.js'].startsWith('let total'),e4);
const e5=B.explainError({message:"btn.addEventListner is not a function",file:'script.js',line:2},{'script.js':"const btn = document.getElementById('b');\nbtn.addEventListner('click', f);",'index.html':'<button id="b">'});
T('7d. Misspelt method → suggests addEventListener',e5.fix&&e5.fix.replace==='addEventListener',e5);
const e6=B.explainError({message:"Something odd happened in a way nobody planned"},{});
T('7e. Unknown error: says so honestly, no invented fix',e6.confidence==='low'&&!e6.fix&&/will not guess/.test(e6.plain));
const e7=B.explainError({message:"Maximum call stack size exceeded"},{});
T('7f. Infinite recursion explained',/calling itself/.test(e7.plain));
/* static checks */
const html2='<html><body><div><p>Hi</div><button onclick="sendd()">Go</button><script src="app.js"></script></body></html>';
const c2=B.check({'index.html':html2,'script.js':"function send(){ alert(1) }"});
T('8a. Static check: unclosed tag, undefined onclick function (with suggestion), missing file',c2.some(x=>x.kind==='html-tags')&&c2.some(x=>x.kind==='missing-fn'&&x.fix&&x.fix.replace==='send(')&&c2.some(x=>x.kind==='missing-file'&&/app\.js/.test(x.msg)),c2);
T('8b. Static check: bracket problems and = inside if',B.check({'script.js':"if (a = 5) { go(;\n"}).some(x=>x.kind==='assign-in-if')&&B.check({'script.js':"function f( {\n"}).length>0);
T('8c. Brackets ignore strings and comments',B.brackets("const s = '{ ( [';\n// } ) ]\nconst t = `${'}'}`;\n").length===0);
/* explain code */
const ex=B.explainCode('script.js',hello.files['script.js']);
T('9a. Explain JavaScript line by line',ex.length>=4&&ex.some(x=>/finds the page element with id “greet”/.test(x.meaning))&&ex.some(x=>/is clicked/.test(x.meaning)),ex);
T('9b. Explain CSS and HTML',B.explainCode('style.css',hello.files['style.css']).some(x=>/text colour|colour/.test(x.meaning))&&B.explainCode('index.html',hello.files['index.html']).some(x=>/main heading/.test(x.meaning)));
const imp=B.improve({'index.html':'<html><head></head><body><img src="a.png"></body></html>','script.js':"var x = 1;\nif (x == 1) {}\n"});
T('9c. Improve: viewport, lang, alt text, var→let, ===',imp.length>=5&&imp.some(x=>x.patch&&/viewport/.test(x.patch.label))&&imp.some(x=>/alt/.test(x.msg))&&imp.some(x=>/===/.test(x.msg)),imp);
/* generate, docs */
T('9d. Generate from a request (calculator, counter, to-do, clock, BMI) or say not supported',['make me a calculator','build a todo list','a counter app','digital clock','bmi calculator'].every(q=>B.generate(q))&&B.generate('write me a banking system with login')===null);
T('9e. Every template has no static errors except the deliberate bug',B.templateList().every(t=>{const e=B.check(B.template(t.key).files).filter(x=>x.level==='error');return t.key==='calc_bug'?e.length>0:e.length===0}));
T('9f. Offline docs search',B.searchDocs('flexbox center')[0].title==='Flexbox'&&B.searchDocs('addEventListener click')[0].cat==='JS'&&B.searchDocs('how do i loop')[0].title==='Loops'&&B.docs.length>=25);
/* TEST 7: save and reopen (memory/fallback path; IndexedDB itself needs a browser) */
(async()=>{
  const p=await S.save({name:'My calc',files:calc.files,active:'index.html'});
  const list=await S.list(),back=await S.get(p.id);
  T('7. Save a project and reopen it (fallback storage path)',list.length===1&&back.name==='My calc'&&back.files['script.js']===calc.files['script.js']);
  back.files['script.js']+='// edited';await S.save(back);const again=await S.get(p.id);
  T('7b. Edits are saved over the same project',again.files['script.js'].endsWith('// edited')&&(await S.list()).length===1);
  await S.remove(p.id);T('7c. Delete removes only that project',(await S.list()).length===0);
  /* TEST 8: export a copy as a real ZIP and verify it with an external tool */
  const z=B.makeZip(calc.files,'My calc');const f=path.join(os.tmpdir(),'oke-test.zip');fs.writeFileSync(f,Buffer.from(z));
  let test='',list2='',same=false;
  try{test=cp.execSync('unzip -t '+f).toString();list2=cp.execSync('unzip -Z1 '+f).toString();same=cp.execSync('unzip -p '+f+' "My_calc/script.js"').toString()===calc.files['script.js']}catch(e){test=String(e.stdout||e.message)}
  T('8. Exported ZIP is valid (unzip -t), has all files, contents identical',/No errors detected/.test(test)&&list2.trim().split('\n').length===3&&same,test);
  T('8b. Export does not change the original project',Object.keys(calc.files).length===3&&calc.files['index.html'].length>100);
  /* the Web Worker body: console capture works (the real Worker/terminate needs a browser) */
  {const msgs=[];const ctx={postMessage:m=>msgs.push(m),self:{}};vm.runInNewContext(B.workerSource("console.log('sum', 1+1); console.warn({a:1});"),ctx);
   T('Safe runner source: captures console output and finishes',msgs.some(m=>m.type==='console'&&m.text==='sum 2')&&msgs.some(m=>m.level==='warn'&&m.text==='{"a":1}')&&msgs[msgs.length-1].type==='done',msgs);}
  /* TEST 9 (partial): nothing in Build Mode makes network calls */
  const src=['build-core.js','build-store.js'].map(x=>fs.readFileSync(path.join(__dirname,'..',x),'utf8')).join('\n');
  T('9. Core and store contain no network calls (fetch/XMLHttpRequest/WebSocket)',!/\bfetch\s*\(|XMLHttpRequest|WebSocket|importScripts\s*\(/.test(src));
  console.log("| Test | Status |\n|---|---|");rows.forEach(x=>console.log("| "+x.join(" | ")+" |"));
  console.log("\n"+(rows.length-fail)+"/"+rows.length+" passed");process.exit(fail?1:0);
})();
