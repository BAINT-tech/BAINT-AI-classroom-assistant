/* ══════════════════════════════════════════════════════════════════════════
   OKE BUILD MODE - CORE   (build-core.js)   independent of the BAINT lesson app; no network, no API.
   Pure functions, so they can be tested outside a browser:
   check() · explainError() · applyFix() · explainCode() · improve() · generate() · docs · makeZip() · buildPreview()
   Honest scope: rule-based help for HTML, CSS and JavaScript. It is not a language model.
   ══════════════════════════════════════════════════════════════════════════ */
(function(root){
"use strict";
const ext=n=>(String(n).split(".").pop()||"").toLowerCase();
const lines=s=>String(s).split("\n");
function lev(a,b){if(a===b)return 0;if(Math.abs(a.length-b.length)>3)return 9;let p=[...Array(b.length+1).keys()];for(let i=1;i<=a.length;i++){const c=[i];for(let j=1;j<=b.length;j++)c[j]=Math.min(p[j]+1,c[j-1]+1,p[j-1]+(a[i-1]===b[j-1]?0:1));p=c}return p[b.length]}
const nearest=(w,list,max)=>{let best=null,bd=(max==null?2:max)+1;for(const x of list){const d=lev(String(w).toLowerCase(),String(x).toLowerCase());if(d<bd&&x!==w){bd=d;best=x}}return best};
const esc=s=>String(s).replace(/[.*+?^${}()|[\]\\]/g,"\\$&");

/* ---------- helpers that read a project ---------- */
const jsFiles=F=>Object.keys(F).filter(n=>ext(n)==="js");
const htmlIds=F=>{const ids=new Set();Object.keys(F).filter(n=>ext(n)==="html").forEach(n=>{String(F[n]).replace(/\bid\s*=\s*["']([^"']+)["']/g,(m,i)=>{ids.add(i)})});return [...ids]};
function declaredNames(F){
  const s=new Set(["window","document","console","Math","JSON","Date","Number","String","Array","Object","parseInt","parseFloat","isNaN","setTimeout","setInterval","clearInterval","clearTimeout","alert","prompt","confirm","localStorage","fetch","Promise","Map","Set","undefined","NaN","Infinity","event","navigator","location","history","requestAnimationFrame"]);
  jsFiles(F).forEach(n=>{const t=String(F[n]);
    t.replace(/\b(?:let|const|var)\s+([A-Za-z_$][\w$]*(?:\s*,\s*[A-Za-z_$][\w$]*)*)/g,(m,a)=>{a.split(",").forEach(x=>s.add(x.trim()))});
    t.replace(/\bfunction\s*([A-Za-z_$][\w$]*)?\s*\(([^)]*)\)/g,(m,f,p)=>{if(f)s.add(f);p.split(",").forEach(x=>{x=x.trim().replace(/=.*$/,"");if(x)s.add(x)})});
    t.replace(/\(([^()]*)\)\s*=>/g,(m,p)=>{p.split(",").forEach(x=>{x=x.trim().replace(/=.*$/,"");if(x)s.add(x)})});
    t.replace(/\b([A-Za-z_$][\w$]*)\s*=>/g,(m,p)=>{s.add(p)});
    t.replace(/\bcatch\s*\(\s*([A-Za-z_$][\w$]*)/g,(m,p)=>{s.add(p)});
  });
  return [...s];
}
/* strip strings, template literals and comments but keep line structure, so bracket checks are reliable */
function maskJS(src){
  let out="",i=0,n=src.length,st=null;
  while(i<n){
    const c=src[i],d=src[i+1];
    if(st==="line"){if(c==="\n"){st=null;out+=c}else out+=" ";i++;continue}
    if(st==="block"){if(c==="*"&&d==="/"){st=null;out+="  ";i+=2}else{out+=c==="\n"?"\n":" ";i++}continue}
    if(st==="'"||st==='"'||st==="`"){
      if(c==="\\"){out+="  ";i+=2;continue}
      if(c===st){st=null;out+=" ";i++;continue}
      if(c==="\n"&&st!=="`"){st=null;out+=c;i++;continue}
      out+=c==="\n"?"\n":" ";i++;continue;
    }
    if(c==="/"&&d==="/"){st="line";out+="  ";i+=2;continue}
    if(c==="/"&&d==="*"){st="block";out+="  ";i+=2;continue}
    if(c==="'"||c==='"'||c==="`"){st=c;out+=" ";i++;continue}
    out+=c;i++;
  }
  return out;
}
function brackets(src){
  const m=maskJS(src),stack=[],pairs={")":"(","]":"[","}":"{"},issues=[];let line=1;
  for(let i=0;i<m.length;i++){const c=m[i];
    if(c==="\n")line++;
    else if("([{".includes(c))stack.push({c,line});
    else if(")]}".includes(c)){const t=stack.pop();if(!t){issues.push({line,msg:"Closing "+c+" has no matching opening bracket."});}
      else if(t.c!==pairs[c]){issues.push({line,msg:"Found "+c+" but the bracket opened on line "+t.line+" was "+t.c+"."});}}
  }
  stack.forEach(t=>issues.push({line:t.line,msg:"The "+t.c+" opened on line "+t.line+" is never closed.",open:t.c}));
  return issues;
}
const VOID=new Set("area base br col embed hr img input link meta param source track wbr".split(" "));
function htmlTags(src){
  const issues=[],stack=[],ln=lines(src);
  ln.forEach((text,i)=>{text.replace(/<\/?([a-zA-Z][\w-]*)([^>]*)>/g,(m,tag,rest)=>{
    tag=tag.toLowerCase();if(m.startsWith("<!--")||VOID.has(tag)||/\/\s*>$/.test(m))return m;
    if(m.startsWith("</")){const t=stack.pop();if(!t)issues.push({line:i+1,msg:"Closing </"+tag+"> has no opening tag."});else if(t.tag!==tag){issues.push({line:i+1,msg:"Found </"+tag+"> but <"+t.tag+"> (line "+t.line+") is still open."});}}
    else stack.push({tag,line:i+1});return m})});
  stack.forEach(t=>issues.push({line:t.line,msg:"<"+t.tag+"> opened on line "+t.line+" is never closed.",tag:t.tag}));
  return issues;
}

/* ---------- 1. check(): problems found WITHOUT running the code ---------- */
function check(F){
  const out=[],ids=htmlIds(F),names=Object.keys(F);
  names.forEach(n=>{
    const t=String(F[n]),e=ext(n);
    if(e==="js"){
      brackets(t).forEach(b=>out.push({file:n,line:b.line,level:"error",msg:b.msg,kind:"brackets",open:b.open}));
      lines(t).forEach((L,i)=>{
        let m;
        const re=/getElementById\(\s*['"]([^'"]+)['"]\s*\)/g;
        while((m=re.exec(L))){if(ids.length&&ids.indexOf(m[1])<0){const g=nearest(m[1],ids,3);
          out.push({file:n,line:i+1,level:"error",kind:"missing-id",msg:"No element with id “"+m[1]+"” exists in your HTML, so this will return null."+(g?" Did you mean “"+g+"”?":""),
            fix:g?{file:n,line:i+1,find:m[1],replace:g,label:"Change the id “"+m[1]+"” to “"+g+"”"}:null})}}
        const q=/querySelector\(\s*['"]#([\w-]+)['"]\s*\)/g;
        while((m=q.exec(L))){if(ids.length&&ids.indexOf(m[1])<0){const g=nearest(m[1],ids,3);out.push({file:n,line:i+1,level:"error",kind:"missing-id",msg:"No element with id “"+m[1]+"” exists in your HTML."+(g?" Did you mean “"+g+"”?":""),fix:g?{file:n,line:i+1,find:"#"+m[1],replace:"#"+g,label:"Change #"+m[1]+" to #"+g}:null})}}
        if(/\bif\s*\([^)=!<>]*[^=!<>]=[^=][^)]*\)/.test(maskJS(L)))out.push({file:n,line:i+1,level:"warning",kind:"assign-in-if",msg:"This if-statement uses = (assign). To compare values use == or ===."});
      });
    }
    if(e==="html"){
      htmlTags(t).forEach(b=>out.push({file:n,line:b.line,level:"warning",msg:b.msg,kind:"html-tags"}));
      const js=jsFiles(F).map(x=>String(F[x])).join("\n")+"\n"+t;
      lines(t).forEach((L,i)=>{let m;const re=/\bon(?:click|change|input|submit|keyup|keydown)\s*=\s*["']\s*([A-Za-z_$][\w$]*)\s*\(/g;
        while((m=re.exec(L))){if(!new RegExp("(function\\s+"+esc(m[1])+"\\b|(?:let|const|var)\\s+"+esc(m[1])+"\\b|\\b"+esc(m[1])+"\\s*=\\s*(?:function|\\())").test(js)){
          const g=nearest(m[1],[...js.matchAll(/function\s+([A-Za-z_$][\w$]*)/g)].map(x=>x[1]),3);
          out.push({file:n,line:i+1,level:"error",kind:"missing-fn",msg:"The button calls “"+m[1]+"()” but no function with that name exists."+(g?" Did you mean “"+g+"”?":""),fix:g?{file:n,line:i+1,find:m[1]+"(",replace:g+"(",label:"Call “"+g+"()” instead"}:null})}}
        const s=L.match(/<script[^>]*\ssrc\s*=\s*["']([^"']+)["']/i),l=L.match(/<link[^>]*\shref\s*=\s*["']([^"']+)["']/i);
        [s,l].forEach(x=>{if(x&&!/^(https?:|data:|\/\/)/.test(x[1])&&names.indexOf(x[1].replace(/^\.\//,""))<0)out.push({file:n,line:i+1,level:"error",kind:"missing-file",msg:"The file “"+x[1]+"” is not in this project, so it will not load."})});});
    }
    if(e==="css"){const o=(t.match(/{/g)||[]).length,c=(t.match(/}/g)||[]).length;if(o!==c)out.push({file:n,line:1,level:"error",kind:"css-braces",msg:"Your CSS has "+o+" opening { but "+c+" closing }. A rule is missing a brace."})}
  });
  return out;
}

/* ---------- 2. explainError(): plain-language explanation and, where possible, a fix ---------- */
const METHODS="addEventListener removeEventListener getElementById getElementsByClassName querySelector querySelectorAll appendChild removeChild createElement setAttribute getAttribute preventDefault stopPropagation parseInt parseFloat toFixed toString toUpperCase toLowerCase trim split join slice splice push pop shift unshift map filter reduce forEach includes indexOf find some every sort reverse replace padStart concat classList remove add toggle contains stringify parse log random floor ceil round max min".split(" ");
function lineOf(F,file,line){const t=F[file];return t?lines(t)[line-1]||"":""}
function explainError(err,F){
  const msg=String(err.message||err).replace(/^Uncaught\s+/,""), file=err.file||jsFiles(F)[0]||"script.js", line=err.line||0, m=m=>msg.match(m);
  const out={title:"",plain:"",why:[],how:[],fix:null,confidence:"medium",line,file,message:msg};
  let r;
  if((r=m(/^(?:ReferenceError:\s*)?([\w$]+) is not defined/))){
    const name=r[1], names=declaredNames(F), g=nearest(name,names,2);
    out.title="“"+name+"” is not defined";out.plain="JavaScript met the name “"+name+"” but nothing with that name has been created.";
    out.why=["The name is spelled differently from where it was created (JavaScript is case-sensitive: Result and result are different).","It was never declared with let, const or var.","It was declared inside another function or block, so it cannot be seen here."];
    out.how=g?["Your code has “"+g+"”. If that is what you meant, change “"+name+"” to “"+g+"”."]:["Declare it first, for example: let "+name+" = 0;","Check the spelling and capital letters."];
    if(g)out.fix={file,line,find:name,replace:g,label:"Rename “"+name+"” to “"+g+"”",wholeWord:true};
    out.confidence=g?"high":"medium";return out;
  }
  if((r=m(/Cannot (?:read|set) propert(?:y|ies) of (null|undefined)(?: \((?:reading|setting) '([^']+)'\))?/))){
    const prop=r[2]||"", dom=/addEventListener|value|innerText|innerHTML|textContent|style|classList|appendChild|checked|click|focus/.test(prop);
    out.title="Cannot use “"+(prop||"a property")+"” of "+r[1];
    out.plain=r[1]==="null"&&dom?"The code tried to use a page element that was not found, so it got null instead of the element.":"The code tried to use a value that does not exist yet ("+r[1]+").";
    const ids=htmlIds(F);let found=null;
    if(dom){jsFiles(F).forEach(n=>lines(F[n]).forEach((L,i)=>{const re=/getElementById\(\s*['"]([^'"]+)['"]\s*\)/g;let x;while((x=re.exec(L))){if(!found&&ids.indexOf(x[1])<0){found={n,i:i+1,id:x[1]}}}}))}
    out.why=dom?["The id in getElementById('...') does not match any id in your HTML (check spelling).","The script runs before the element is on the page (a <script> in <head> runs too early).","The element is created later by your code."]:["A variable was never given a value (undefined).","A function returned nothing, and the result was used anyway."];
    if(found){const g=nearest(found.id,ids,3);
      out.how=["Line "+found.i+" of "+found.n+" looks for “"+found.id+"”, but your HTML has: "+(ids.join(", ")||"no ids")+"."].concat(g?["Change it to “"+g+"”."]:[]);
      if(g)out.fix={file:found.n,line:found.i,find:found.id,replace:g,label:"Change the id “"+found.id+"” to “"+g+"”"};
      out.line=found.i;out.file=found.n;out.confidence=g?"high":"medium";
    }else{
      out.how=dom?["Move the <script> tag to just before </body>, or wrap your code in document.addEventListener('DOMContentLoaded', () => { ... });"]:["Check where the value should have been set before this line."];
      const html=Object.keys(F).filter(n=>ext(n)==="html").map(n=>String(F[n])).join("\n");
      const head=html.match(/<head[\s\S]*?<\/head>/i);
      if(dom&&head&&/<script[^>]*src/i.test(head[0])&&!/defer|DOMContentLoaded/.test(html+jsFiles(F).map(n=>F[n]).join("")))
        out.how.unshift("Your script is loaded in <head> before the page elements exist.");
    }
    return out;
  }
  if((r=m(/^(?:TypeError:\s*)?([\w$.]+) is not a function/))){
    const last=r[1].split(".").pop(), g=nearest(last,METHODS,2);
    out.title="“"+r[1]+"” is not a function";out.plain="The code tried to call “"+r[1]+"” like a function, but it is not one.";
    out.why=["The method name is misspelled.","The thing before the dot is a different type than expected (for example calling a string method on a number).","A variable has the same name as the function and replaced it."];
    out.how=g?["Did you mean “"+g+"”?"]:["Check the spelling and the type of the value."];
    if(g)out.fix={file,line,find:last,replace:g,label:"Change “"+last+"” to “"+g+"”",wholeWord:true};
    out.confidence=g?"high":"low";return out;
  }
  if(/Assignment to constant variable/.test(msg)){
    let name=null;const t=jsFiles(F).map(n=>String(F[n])).join("\n");const cs=[...t.matchAll(/\bconst\s+([A-Za-z_$][\w$]*)/g)].map(x=>x[1]);
    for(const c of cs){if(new RegExp("\\b"+esc(c)+"\\s*(?:\\+\\+|--|[-+*/]?=(?!=))").test(t.replace(new RegExp("\\bconst\\s+"+esc(c)+"\\s*="),"")))name=c}
    out.title="A constant was changed";out.plain="A variable created with const cannot be given a new value after it is created.";
    out.why=["const means the value is fixed.","Use let for values that change (counters, totals)."];
    out.how=name?["“"+name+"” is declared with const but changed later. Declare it with let instead."]:["Change const to let for the variable you update."];
    if(name){const f=jsFiles(F).find(n=>new RegExp("\\bconst\\s+"+esc(name)).test(F[n]));out.fix={file:f,find:"const "+name,replace:"let "+name,label:"Change “const "+name+"” to “let "+name+"”"};out.confidence="high"}
    return out;
  }
  if(/Unexpected end of input|missing \) after argument list|Unexpected token|Unexpected identifier|Invalid or unexpected token|Unexpected string|Unexpected number|SyntaxError/.test(msg)){
    out.title="Syntax error: "+msg.replace(/^SyntaxError:\s*/,"");out.plain="JavaScript could not read your code because something is written in the wrong shape, usually a missing or extra bracket, quote or comma.";
    out.why=["A bracket ( [ { is missing its partner.","A quote mark was opened but not closed.","A comma or operator is missing between two things."];
    let b=[];for(const n of jsFiles(F)){const bb=brackets(F[n]);if(bb.length){b=bb.map(x=>Object.assign({file:n},x));break}}
    if(b.length){const x=b[0];out.line=x.line;out.file=x.file;out.how=["Line "+x.line+" of "+x.file+": "+x.msg];
      const need={"(":")","[":"]","{":"}"};
      if(x.open){const close=need[x.open];out.fix={file:x.file,appendEnd:close,label:"Add a closing “"+close+"” at the end of "+x.file};out.confidence="medium"}
      else out.confidence="medium";
    }else{
      out.how=["Check the line shown in the error and the line before it.","Look for a missing comma, quote or closing bracket."];
      const L=lineOf(F,file,line);
      if(/missing \) after argument list/.test(msg)&&L&&(L.match(/\(/g)||[]).length>(L.match(/\)/g)||[]).length){out.fix={file,line,lineAppend:")",label:"Add a missing “)” at the end of line "+line};out.confidence="medium"}
    }
    return out;
  }
  if(/Maximum call stack size exceeded/.test(msg)){out.title="Too many function calls";out.plain="A function keeps calling itself without stopping (infinite recursion).";out.why=["The function has no stopping condition (base case).","The stopping condition is never reached."];out.how=["Add an if-statement that returns when the work is finished."];out.confidence="medium";return out}
  if(/is not iterable/.test(msg)){out.title="Not iterable";out.plain="A loop or spread expected a list (array) but got something else.";out.why=["The value is undefined, null, a number or an object, not an array."];out.how=["Check that the variable is an array before looping over it."];out.confidence="low";return out}
  if(/JSON/.test(msg)&&/Unexpected/.test(msg)){out.title="Invalid JSON";out.plain="JSON.parse got text that is not valid JSON.";out.why=["JSON needs double quotes around names and strings, and no trailing commas."];out.how=["Check the text being parsed."];return out}
  out.title=msg;out.plain="I do not have a specific explanation for this error yet, so I will not guess.";out.why=["Read the message and note the line number."];out.how=["Check the line shown, then the line before it.","Use console.log to print values just before the error.","Search the offline docs in the Learn tab."];out.confidence="low";return out;
}

/* apply a fix (returns a NEW files object; the caller decides whether to keep it) */
function applyFix(F,fix){
  if(!fix||!F[fix.file])return null;
  const G=Object.assign({},F);let t=String(G[fix.file]);
  if(fix.appendEnd){G[fix.file]=t.replace(/\s*$/,"")+"\n"+fix.appendEnd+"\n";return G}
  if(fix.lineAppend&&fix.line){const L=lines(t);if(!L[fix.line-1])return null;L[fix.line-1]=L[fix.line-1].replace(/\s*$/,"")+fix.lineAppend;G[fix.file]=L.join("\n");return G}
  const swap=(s,find)=>{if(fix.wholeWord){const re=new RegExp("(?<![\\w$])"+esc(find)+"(?![\\w$])");return re.test(s)?s.replace(re,fix.replace):null}
    const i=s.indexOf(find);return i<0?null:s.slice(0,i)+fix.replace+s.slice(i+find.length)};
  if(fix.line){const L=lines(t);let done=false;for(const find of [fix.find,fix.altFind].filter(Boolean)){const r=swap(L[fix.line-1]||"",find);if(r!==null){L[fix.line-1]=r;done=true;break}}
    if(done){G[fix.file]=L.join("\n");return G}}
  for(const find of [fix.find,fix.altFind].filter(Boolean)){const r=swap(t,find);if(r!==null){G[fix.file]=r;return G}}
  return null;
}

/* ---------- 3. explainCode(): line-by-line meaning ---------- */
const EV={click:"is clicked",input:"receives typing",change:"changes",submit:"is submitted",keydown:"has a key pressed",keyup:"has a key released",mouseover:"has the mouse over it",load:"finishes loading",DOMContentLoaded:"the page has finished loading"};
function rhs(v){
  v=v.trim().replace(/;$/,"");let m;
  if((m=v.match(/^document\.getElementById\(\s*['"]([^'"]+)['"]\s*\)$/)))return "finds the page element with id “"+m[1]+"”";
  if((m=v.match(/^document\.querySelector(All)?\(\s*['"]([^'"]+)['"]\s*\)$/)))return "finds "+(m[1]?"all page elements":"the first page element")+" matching “"+m[2]+"”";
  if(/^\d+(\.\d+)?$/.test(v))return "the number "+v;
  if(/^['"`].*['"`]$/.test(v))return "the text "+v;
  if(/^\[.*\]$/.test(v))return "a list (array) "+v;
  if(/^(true|false)$/.test(v))return "the value "+v;
  if(/=>|^function/.test(v))return "a function";
  if((m=v.match(/^parse(Int|Float)\((.+)\)$/)))return "the number found in "+m[2];
  if(/^new Date/.test(v))return "the current date and time";
  return "the result of "+v;
}
function explainJS(src){
  const out=[];
  lines(src).forEach((raw,i)=>{
    const L=raw.trim();if(!L||/^[})\]];?,?$/.test(L)||/^}\s*\)?;?$/.test(L))return;let m,t=null;
    if((m=L.match(/^\/\/\s*(.*)$/)))t="A comment for humans: “"+m[1]+"”. JavaScript ignores it.";
    else if((m=L.match(/^(const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(.+)$/)))t="Creates "+(m[1]==="const"?"a fixed":"a")+" variable called “"+m[2]+"” and stores "+rhs(m[3])+".";
    else if((m=L.match(/^(const|let|var)\s+([A-Za-z_$][\w$]*)\s*;?$/)))t="Creates a variable called “"+m[2]+"” with no value yet.";
    else if((m=L.match(/^(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(([^)]*)\)/)))t="Defines a function called “"+m[1]+"”"+(m[2].trim()?" that receives: "+m[2].trim():" with no inputs")+". It only runs when called.";
    else if((m=L.match(/^([\w$.]+)\.addEventListener\(\s*['"](\w+)['"]/)))t="When “"+m[1].replace(/^document\.getElementById\(.*\)$/,"the element")+"” "+(EV[m[2]]||"gets the “"+m[2]+"” event")+", run the code inside.";
    else if((m=L.match(/^if\s*\((.*)\)\s*{?$/)))t="Checks whether “"+m[1]+"” is true. If so, the block below runs.";
    else if(/^}\s*else\s+if\s*\((.*)\)/.test(L)){m=L.match(/else\s+if\s*\((.*)\)/);t="Otherwise, checks whether “"+m[1]+"” is true.";}
    else if(/^}?\s*else\s*{?$/.test(L)||/^}\s*else\s*{$/.test(L))t="Otherwise (if the earlier checks were false), run this block.";
    else if((m=L.match(/^for\s*\((.*)\)\s*{?$/)))t="A loop: repeats the block below. The setup is “"+m[1]+"”.";
    else if((m=L.match(/^while\s*\((.*)\)\s*{?$/)))t="A loop: repeats the block below while “"+m[1]+"” stays true.";
    else if((m=L.match(/^return\s*(.*?);?$/)))t=m[1]?"Gives back “"+m[1]+"” as the result of the function and stops it.":"Stops the function.";
    else if((m=L.match(/^console\.(log|error|warn)\((.*)\);?$/)))t="Prints "+m[2]+" to the console (the Test tab shows it).";
    else if((m=L.match(/^alert\((.*)\);?$/)))t="Shows a pop-up message: "+m[1]+".";
    else if((m=L.match(/^([\w$.\[\]'"()]+)\.(innerText|textContent|innerHTML|value)\s*=\s*(.*?);?$/)))t="Sets the "+(m[2]==="value"?"value":"text")+" of "+m[1].replace(/^document\.getElementById\(\s*['"](.+)['"]\s*\)$/,"the element “$1”")+" to "+m[3]+".";
    else if((m=L.match(/^setInterval\((.*)/)))t="Runs a function again and again on a timer.";
    else if((m=L.match(/^setTimeout\((.*)/)))t="Runs a function once after a delay.";
    else if((m=L.match(/^([A-Za-z_$][\w$]*)\s*([+\-*/]?=)\s*(.+?);?$/)))t=(m[2]==="="?"Stores "+rhs(m[3])+" in":"Updates")+" “"+m[1]+"”"+(m[2]==="="?".":" using "+m[2]+" "+m[3]+".");
    else if((m=L.match(/^([A-Za-z_$][\w$]*)\+\+;?$/)))t="Adds 1 to “"+m[1]+"”.";
    else t="Runs: "+L.replace(/\s+/g," ").slice(0,80);
    out.push({line:i+1,code:raw.trim(),meaning:t});
  });
  return out;
}
const CSSP={color:"text colour","background":"background","background-color":"background colour","font-size":"text size","font-family":"font","font-weight":"how bold the text is",margin:"space outside the box",padding:"space inside the box",border:"border line","border-radius":"rounded corners",display:"how the element is laid out",flex:"how a flex item grows","justify-content":"horizontal alignment in flex/grid","align-items":"vertical alignment in flex/grid",width:"width",height:"height","max-width":"largest allowed width","text-align":"text alignment",position:"positioning method","box-shadow":"shadow",cursor:"mouse pointer shape",gap:"space between flex/grid items","grid-template-columns":"the columns of a grid",transition:"smooth animation of changes",opacity:"transparency",overflow:"what happens when content is too big","flex-direction":"row or column layout","min-height":"smallest allowed height","line-height":"space between lines of text"};
function explainCSS(src){
  const out=[],re=/([^{}]+)\{([^{}]*)\}/g;let m;
  while((m=re.exec(src))){
    const sel=m[1].trim(),pre=src.slice(0,m.index+m[0].indexOf(sel)),line=pre.split("\n").length;
    if(!sel||sel[0]==="@")continue;
    out.push({line,code:sel+" { … }",meaning:"A style rule for "+(sel[0]==="."?"every element with class “"+sel.slice(1)+"”":sel[0]==="#"?"the element with id “"+sel.slice(1)+"”":sel==="*"?"every element":"every <"+sel+"> element")+"."});
    let off=0;m[2].split(";").forEach(d=>{const x=d.match(/^\s*([\w-]+)\s*:\s*([\s\S]+?)\s*$/);if(!x)return;
      const dl=line+(src.slice(m.index,m.index+m[0].indexOf(d,off)).split("\n").length-1);off=m[0].indexOf(d,off)+d.length;
      out.push({line:dl,code:x[1]+": "+x[2].replace(/\s+/g," "),meaning:"Sets the "+(CSSP[x[1]]||x[1])+" to "+x[2].replace(/\s+/g," ")+"."})});
  }
  return out;
}
const TAGS={html:"the whole web page",head:"information about the page (not shown)",title:"the name shown on the browser tab",meta:"page settings",link:"connects an outside file such as a stylesheet",style:"CSS styling inside the page",script:"JavaScript code",body:"everything you see on the page",h1:"the main heading",h2:"a sub-heading",h3:"a smaller heading",p:"a paragraph",div:"a box used to group things",span:"a small piece of text inside a line",a:"a link",img:"a picture",ul:"a bullet list",ol:"a numbered list",li:"one list item",button:"a clickable button",input:"a box to type in",form:"a form that collects information",label:"a caption for an input",table:"a table",tr:"a table row",td:"a table cell",th:"a table heading cell",section:"a section of the page",header:"the top part of the page",footer:"the bottom part of the page",nav:"navigation links",main:"the main content",textarea:"a large typing box",select:"a drop-down list",option:"one choice in a drop-down",canvas:"a drawing area",br:"a line break",hr:"a horizontal line"};
function explainHTML(src){
  const out=[];
  lines(src).forEach((raw,i)=>{const L=raw.trim();if(!L)return;let m;
    if(/^<!doctype/i.test(L))out.push({line:i+1,code:L,meaning:"Tells the browser this is a modern HTML5 page."});
    else if((m=L.match(/^<([a-zA-Z][\w-]*)([^>]*)>/))&&TAGS[m[1].toLowerCase()]){
      const id=(m[2].match(/\bid\s*=\s*["']([^"']+)["']/)||[])[1],cls=(m[2].match(/\bclass\s*=\s*["']([^"']+)["']/)||[])[1];
      out.push({line:i+1,code:L.length>90?L.slice(0,90)+"…":L,meaning:"Opens <"+m[1].toLowerCase()+">: "+TAGS[m[1].toLowerCase()]+(id?" (id “"+id+"”)":"")+(cls?" (class “"+cls+"”)":"")+"."})}
  });
  return out;
}
function explainCode(name,src){const e=ext(name);return e==="css"?explainCSS(src):e==="html"?explainHTML(src):explainJS(src)}

/* ---------- 4. improve(): suggestions, with a patch only where it is safe ---------- */
function improve(F){
  const out=[];
  Object.keys(F).forEach(n=>{const t=String(F[n]),e=ext(n);
    if(e==="html"){
      if(!/<meta[^>]*viewport/i.test(t))out.push({file:n,msg:"Add a viewport tag so the page fits phone screens.",patch:{file:n,find:"<head>",replace:'<head>\n<meta name="viewport" content="width=device-width, initial-scale=1">',label:"Add the viewport tag"}});
      if(/<html(?![^>]*\blang=)/i.test(t))out.push({file:n,msg:'Add lang="en" to <html> so screen readers use the right language.',patch:{file:n,find:"<html",replace:'<html lang="en"',label:'Add lang="en"'}});
      lines(t).forEach((L,i)=>{if(/<img(?![^>]*\balt=)/i.test(L))out.push({file:n,line:i+1,msg:"This image has no alt text. Describe it for people who cannot see it."});
        if(/<input(?![^>]*type=["']?(button|submit|hidden))[^>]*>/i.test(L)&&!/aria-label|placeholder|id=/.test(L))out.push({file:n,line:i+1,msg:"Give this input a label or placeholder so users know what to type."})});
    }
    if(e==="js"){
      lines(t).forEach((L,i)=>{if(/\bvar\s+[A-Za-z_$]/.test(maskJS(L)))out.push({file:n,line:i+1,msg:"Prefer let or const instead of var.",patch:{file:n,line:i+1,find:"var ",replace:"let ",label:"Change var to let"}});
        if(/\.innerHTML\s*=\s*['"][^<'"]*['"]/.test(L))out.push({file:n,line:i+1,msg:"For plain text, textContent is safer and simpler than innerHTML."});
        if(/(?<![=!])==(?!=)/.test(maskJS(L)))out.push({file:n,line:i+1,msg:"Prefer === over == to avoid surprising type conversions."});
        if(/\beval\s*\(/.test(maskJS(L)))out.push({file:n,line:i+1,msg:"Avoid eval(): it runs any text as code and is unsafe."})});
      if(/\.addEventListener/.test(t)&&!/DOMContentLoaded/.test(t)&&!/defer/.test(Object.values(F).join("")))out.push({file:n,msg:"Make sure this script loads after the page elements (put <script> before </body>)."});
    }
  });
  return out;
}

/* ---------- 5. generate(): working starter projects (templates, not a language model) ---------- */
const CALC_JS=(eq)=>`const display = document.getElementById('display');
let expr = '';
function show() { display.textContent = expr || '0'; }
document.querySelectorAll('[data-key]').forEach(function (btn) {
  btn.addEventListener('click', function () { expr += btn.dataset.key; show(); });
});
document.getElementById('clear').addEventListener('click', function () { expr = ''; show(); });
document.getElementById('${eq}').addEventListener('click', function () {
  try { expr = String(calculate(expr)); } catch (e) { expr = ''; display.textContent = 'Error'; return; }
  show();
});
/* a small safe calculator: handles + - * / and brackets, no eval */
function calculate(text) {
  var s = text.replace(/\\s+/g, ''), i = 0;
  function num() { var m = /^-?\\d+(\\.\\d+)?/.exec(s.slice(i)); if (!m) throw new Error('number expected'); i += m[0].length; return parseFloat(m[0]); }
  function factor() { if (s[i] === '(') { i++; var v = expression(); if (s[i] !== ')') throw new Error('missing )'); i++; return v; } return num(); }
  function term() { var v = factor(); while (s[i] === '*' || s[i] === '/') { var op = s[i++]; var r = factor(); v = op === '*' ? v * r : v / r; } return v; }
  function expression() { var v = term(); while (s[i] === '+' || s[i] === '-') { var op = s[i++]; var r = term(); v = op === '+' ? v + r : v - r; } return v; }
  var result = expression(); if (i < s.length) throw new Error('unexpected ' + s[i]); return result;
}
show();
`;
const CALC_HTML=`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Calculator</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<div class="calc">
  <div id="display" class="display">0</div>
  <div class="keys">
    <button data-key="7">7</button><button data-key="8">8</button><button data-key="9">9</button><button data-key="/">÷</button>
    <button data-key="4">4</button><button data-key="5">5</button><button data-key="6">6</button><button data-key="*">×</button>
    <button data-key="1">1</button><button data-key="2">2</button><button data-key="3">3</button><button data-key="-">−</button>
    <button data-key="0">0</button><button data-key=".">.</button><button id="equals">=</button><button data-key="+">+</button>
    <button id="clear" class="wide">Clear</button><button data-key="(">(</button><button data-key=")">)</button>
  </div>
</div>
<script src="script.js"></script>
</body>
</html>
`;
const CALC_CSS=`body { font-family: system-ui, sans-serif; background: #f1f5f9; display: flex; justify-content: center; padding: 24px; }
.calc { width: 100%; max-width: 320px; background: #fff; border-radius: 16px; padding: 16px; box-shadow: 0 4px 16px rgba(0,0,0,.12); }
.display { background: #0f172a; color: #fff; font-size: 32px; text-align: right; padding: 16px; border-radius: 12px; min-height: 40px; overflow-x: auto; }
.keys { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-top: 12px; }
button { font-size: 20px; padding: 14px 0; border: 0; border-radius: 12px; background: #e2e8f0; cursor: pointer; }
button:active { background: #cbd5e1; }
#equals { background: #2563eb; color: #fff; }
.wide { grid-column: span 2; background: #fee2e2; }
`;
const T={
 hello:{name:"My first page",words:["hello","first page","starter","blank","website","web page","webpage"],files:{
  "index.html":'<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>My first page</title>\n<link rel="stylesheet" href="style.css">\n</head>\n<body>\n<h1 id="title">Hello, world!</h1>\n<p>This is my first web page.</p>\n<button id="greet">Click me</button>\n<script src="script.js"></script>\n</body>\n</html>\n',
  "style.css":"body { font-family: system-ui, sans-serif; text-align: center; padding: 32px; }\nh1 { color: #2563eb; }\nbutton { font-size: 18px; padding: 10px 20px; border: 0; border-radius: 10px; background: #2563eb; color: #fff; }\n",
  "script.js":"const button = document.getElementById('greet');\nconst title = document.getElementById('title');\nbutton.addEventListener('click', function () {\n  title.textContent = 'You clicked the button!';\n  console.log('Button clicked');\n});\n"}},
 calculator:{name:"Calculator",words:["calculator","calc"],files:{"index.html":CALC_HTML,"style.css":CALC_CSS,"script.js":CALC_JS("equals")}},
 calc_bug:{name:"Calculator (find the bug)",words:["bug","debug practice","broken calculator"],files:{"index.html":CALC_HTML,"style.css":CALC_CSS,"script.js":CALC_JS("equalz")}},
 counter:{name:"Counter",words:["counter","count","clicker"],files:{
  "index.html":'<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>Counter</title>\n<link rel="stylesheet" href="style.css">\n</head>\n<body>\n<h1 id="count">0</h1>\n<button id="minus">−</button> <button id="reset">Reset</button> <button id="plus">+</button>\n<script src="script.js"></script>\n</body>\n</html>\n',
  "style.css":"body { font-family: system-ui, sans-serif; text-align: center; padding: 40px; }\n#count { font-size: 72px; margin: 0 0 20px; }\nbutton { font-size: 22px; padding: 12px 22px; border: 0; border-radius: 12px; background: #2563eb; color: #fff; }\n",
  "script.js":"let count = 0;\nconst label = document.getElementById('count');\nfunction update() { label.textContent = count; }\ndocument.getElementById('plus').addEventListener('click', function () { count++; update(); });\ndocument.getElementById('minus').addEventListener('click', function () { count--; update(); });\ndocument.getElementById('reset').addEventListener('click', function () { count = 0; update(); });\n"}},
 todo:{name:"To-do list",words:["todo","to-do","to do","task list","tasks","checklist"],files:{
  "index.html":'<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>To-do list</title>\n<link rel="stylesheet" href="style.css">\n</head>\n<body>\n<h1>To-do list</h1>\n<input id="task" placeholder="New task">\n<button id="add">Add</button>\n<ul id="list"></ul>\n<script src="script.js"></script>\n</body>\n</html>\n',
  "style.css":"body { font-family: system-ui, sans-serif; max-width: 420px; margin: 24px auto; padding: 0 16px; }\ninput { font-size: 16px; padding: 10px; width: 60%; }\nbutton { font-size: 16px; padding: 10px 14px; border: 0; border-radius: 10px; background: #2563eb; color: #fff; }\nli { padding: 10px 0; cursor: pointer; }\nli.done { text-decoration: line-through; color: #94a3b8; }\n",
  "script.js":"const input = document.getElementById('task');\nconst list = document.getElementById('list');\nfunction addTask() {\n  const text = input.value.trim();\n  if (text === '') { return; }\n  const item = document.createElement('li');\n  item.textContent = text;\n  item.addEventListener('click', function () { item.classList.toggle('done'); });\n  list.appendChild(item);\n  input.value = '';\n}\ndocument.getElementById('add').addEventListener('click', addTask);\n"}},
 clock:{name:"Digital clock",words:["clock","time","timer"],files:{
  "index.html":'<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>Clock</title>\n<link rel="stylesheet" href="style.css">\n</head>\n<body>\n<div id="clock">--:--:--</div>\n<script src="script.js"></script>\n</body>\n</html>\n',
  "style.css":"body { background: #0f172a; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }\n#clock { color: #38bdf8; font: 700 15vw system-ui, sans-serif; }\n",
  "script.js":"const clock = document.getElementById('clock');\nfunction tick() {\n  const now = new Date();\n  clock.textContent = now.toLocaleTimeString();\n}\ntick();\nsetInterval(tick, 1000);\n"}},
 bmi:{name:"BMI calculator",words:["bmi","body mass"],files:{
  "index.html":'<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>BMI calculator</title>\n<link rel="stylesheet" href="style.css">\n</head>\n<body>\n<h1>BMI calculator</h1>\n<label>Weight (kg) <input id="weight" type="number"></label>\n<label>Height (m) <input id="height" type="number" step="0.01"></label>\n<button id="go">Calculate</button>\n<p id="result"></p>\n<script src="script.js"></script>\n</body>\n</html>\n',
  "style.css":"body { font-family: system-ui, sans-serif; max-width: 360px; margin: 24px auto; padding: 0 16px; }\nlabel { display: block; margin: 12px 0; }\ninput { font-size: 16px; padding: 8px; width: 100%; box-sizing: border-box; }\nbutton { font-size: 16px; padding: 10px 18px; border: 0; border-radius: 10px; background: #2563eb; color: #fff; }\n",
  "script.js":"document.getElementById('go').addEventListener('click', function () {\n  const weight = parseFloat(document.getElementById('weight').value);\n  const height = parseFloat(document.getElementById('height').value);\n  const out = document.getElementById('result');\n  if (!weight || !height) { out.textContent = 'Enter weight and height.'; return; }\n  const bmi = weight / (height * height);\n  let group = 'healthy range';\n  if (bmi < 18.5) { group = 'underweight range'; } else if (bmi >= 25) { group = 'above healthy range'; }\n  out.textContent = 'BMI: ' + bmi.toFixed(1) + ' (' + group + ')';\n});\n"}}
};
function generate(prompt){
  const q=String(prompt||"").toLowerCase();
  const order=["calc_bug","calculator","todo","counter","clock","bmi","hello"];
  for(const k of order){if(T[k].words.some(w=>q.indexOf(w)>-1))return {key:k,name:T[k].name,files:Object.assign({},T[k].files)}}
  return null;
}
const templateList=()=>Object.keys(T).map(k=>({key:k,name:T[k].name}));
const template=k=>T[k]?{key:k,name:T[k].name,files:Object.assign({},T[k].files)}:null;

/* ---------- 6. offline docs ---------- */
const DOCS=[
 ["HTML","Page structure","html head body doctype structure skeleton","Every page starts with <!DOCTYPE html>, then <html> containing <head> (title, settings) and <body> (what people see).","<!DOCTYPE html>\n<html>\n<head><title>My page</title></head>\n<body><h1>Hello</h1></body>\n</html>"],
 ["HTML","Headings and paragraphs","h1 h2 heading paragraph p text","Use <h1> for the main heading, <h2> to <h6> for smaller ones, and <p> for paragraphs.","<h1>Title</h1>\n<p>Some text.</p>"],
 ["HTML","Links and images","link a href image img src alt","<a href=\"...\"> makes a link. <img src=\"...\" alt=\"...\"> shows a picture; alt describes it.","<a href=\"page.html\">Go</a>\n<img src=\"cat.png\" alt=\"A cat\">"],
 ["HTML","Lists","list ul ol li bullets numbered","<ul> is a bullet list, <ol> a numbered list, and each item is an <li>.","<ul>\n  <li>One</li>\n  <li>Two</li>\n</ul>"],
 ["HTML","Buttons and inputs","button input form textbox type placeholder","<button> is clickable. <input> is a box to type in (type can be text, number, password...).","<input id=\"name\" placeholder=\"Your name\">\n<button id=\"go\">Go</button>"],
 ["HTML","Forms","form submit label input select textarea","A <form> groups inputs. Use <label> to describe each input.","<form>\n  <label>Name <input></label>\n  <button>Send</button>\n</form>"],
 ["HTML","Tables","table tr td th row cell","A <table> has rows <tr> containing cells <td> or heading cells <th>.","<table><tr><th>Name</th></tr><tr><td>Ada</td></tr></table>"],
 ["CSS","Selectors","selector class id tag target style","A selector says which elements a rule styles: tag (p), class (.card) or id (#title).",".card { color: blue; }\n#title { font-size: 24px; }"],
 ["CSS","Colours and text","color background font size family weight text-align","color sets text colour, background sets the background, font-size the size, text-align the alignment.","p { color: #2563eb; font-size: 18px; }"],
 ["CSS","Box model: margin and padding","margin padding border box spacing space","Padding is space inside the border; margin is space outside. border draws the edge.",".box { padding: 12px; margin: 8px; border: 1px solid #ccc; }"],
 ["CSS","Flexbox","flex flexbox justify align center row column layout","display: flex lays children in a row. justify-content aligns along the row, align-items across it.",".row { display: flex; justify-content: center; align-items: center; gap: 8px; }"],
 ["CSS","Grid","grid columns rows template layout","display: grid with grid-template-columns makes rows and columns.",".grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }"],
 ["CSS","Responsive design","responsive media query mobile phone screen viewport","Add the viewport meta tag, use percentages or max-width, and @media queries for small screens.","@media (max-width: 600px) { .card { width: 100%; } }"],
 ["JS","Variables","variable let const var declare value","let creates a variable that can change; const creates one that cannot be reassigned.","let score = 0;\nconst name = 'Ada';"],
 ["JS","Functions","function call parameter return arrow","A function is a named block of code. Give it inputs (parameters) and return a result.","function add(a, b) { return a + b; }\nconsole.log(add(2, 3));"],
 ["JS","If statements","if else condition compare equal","if runs code only when a condition is true. Use === to compare values.","if (age >= 18) { console.log('Adult'); } else { console.log('Minor'); }"],
 ["JS","Loops","loop for while repeat iterate","for repeats code a set number of times; while repeats as long as a condition is true.","for (let i = 1; i <= 3; i++) { console.log(i); }"],
 ["JS","Arrays","array list push pop map filter index","An array is a list. push adds, pop removes the last item, map and filter build new arrays.","const nums = [1, 2, 3];\nnums.push(4);\nconsole.log(nums.map(n => n * 2));"],
 ["JS","The DOM: find and change elements","dom getelementbyid queryselector textcontent innerhtml element page change","document.getElementById finds an element by id. textContent changes its text.","const t = document.getElementById('title');\nt.textContent = 'New text';"],
 ["JS","Events","event click addeventlistener listener button handle","addEventListener runs a function when something happens, like a click.","btn.addEventListener('click', function () { alert('Hi'); });"],
 ["JS","console.log and debugging","console log debug print error bug find","console.log prints values so you can see what the code is doing. Read the line number in any error.","console.log('value is', x);"],
 ["JS","Common errors","error undefined null not defined typeerror syntaxerror referenceerror","ReferenceError: a name does not exist. TypeError: wrong kind of value. SyntaxError: the code is written incorrectly.","// 'x is not defined' means x was never created"],
 ["JS","Numbers and parseFloat","number parseint parsefloat nan tofixed convert string","Input values are text. Convert with parseFloat() before doing maths. toFixed(2) rounds for display.","const n = parseFloat('3.5');\nconsole.log(n.toFixed(1));"],
 ["JS","Timers","settimeout setinterval timer delay repeat clock","setTimeout runs code once after a delay; setInterval repeats it.","setInterval(function () { console.log('tick'); }, 1000);"],
 ["Python","Print and variables (text only)","python print variable input","Python runs only after the optional Python pack is installed (not installed yet). The syntax: print() shows text; variables need no let or const.","name = 'Ada'\nprint('Hello', name)"],
 ["Python","Loops and functions (text only)","python for loop def function range","Python uses indentation instead of braces. def defines a function; for ... in range() loops.","def square(n):\n    return n * n\nfor i in range(3):\n    print(square(i))"]
].map((d,i)=>({id:i,cat:d[0],title:d[1],keys:d[2],text:d[3],example:d[4]}));
function searchDocs(q){
  const w=String(q||"").toLowerCase().split(/\W+/).filter(x=>x.length>1);if(!w.length)return [];
  return DOCS.map(d=>{const hay=(d.title+" "+d.keys+" "+d.cat).toLowerCase();let s=0;w.forEach(x=>{if(hay.indexOf(x)>-1)s+=d.title.toLowerCase().indexOf(x)>-1?3:1;});return {d,s}}).filter(x=>x.s>0).sort((a,b)=>b.s-a.s).slice(0,4).map(x=>x.d);
}

/* ---------- 7. ZIP export (stored, no compression; opens in any unzip tool) ---------- */
const CRC=(()=>{const t=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;t[n]=c>>>0}return t})();
const crc32=b=>{let c=0xFFFFFFFF;for(let i=0;i<b.length;i++)c=CRC[(c^b[i])&255]^(c>>>8);return (c^0xFFFFFFFF)>>>0};
function makeZip(F,folder){
  const enc=new TextEncoder(),parts=[],central=[];let offset=0;
  const d=new Date(),time=(d.getHours()<<11)|(d.getMinutes()<<5)|(d.getSeconds()>>1),date=((d.getFullYear()-1980)<<9)|((d.getMonth()+1)<<5)|d.getDate();
  const u16=(v)=>[v&255,(v>>8)&255],u32=(v)=>[v&255,(v>>8)&255,(v>>16)&255,(v>>>24)&255];
  Object.keys(F).forEach(name=>{
    const path=(folder?String(folder).replace(/[^\w.-]+/g,"_")+"/":"")+name.replace(/^\/+/,""), nb=enc.encode(path), data=enc.encode(String(F[name])), crc=crc32(data);
    const head=Uint8Array.from([0x50,0x4b,3,4,...u16(20),...u16(0x0800),...u16(0),...u16(time),...u16(date),...u32(crc),...u32(data.length),...u32(data.length),...u16(nb.length),...u16(0)]);
    parts.push(head,nb,data);
    central.push(Uint8Array.from([0x50,0x4b,1,2,...u16(20),...u16(20),...u16(0x0800),...u16(0),...u16(time),...u16(date),...u32(crc),...u32(data.length),...u32(data.length),...u16(nb.length),...u16(0),...u16(0),...u16(0),...u16(0),...u32(0),...u32(offset)]),nb);
    offset+=head.length+nb.length+data.length;
  });
  const cdSize=central.reduce((a,b)=>a+b.length,0), n=Object.keys(F).length;
  const end=Uint8Array.from([0x50,0x4b,5,6,...u16(0),...u16(0),...u16(n),...u16(n),...u32(cdSize),...u32(offset),...u16(0)]);
  const all=parts.concat(central,[end]),out=new Uint8Array(all.reduce((a,b)=>a+b.length,0));let p=0;all.forEach(b=>{out.set(b,p);p+=b.length});return out;
}

/* ---------- 8. preview document for the sandboxed frame ---------- */
const CAPTURE="(function(){var P=function(m){try{parent.postMessage(m,'*')}catch(e){}};['log','info','warn','error'].forEach(function(k){var o=console[k];console[k]=function(){var a=[].slice.call(arguments).map(function(x){try{return typeof x==='object'?JSON.stringify(x):String(x)}catch(e){return String(x)}});P({oke:1,type:'console',level:k,text:a.join(' ')});try{o.apply(console,arguments)}catch(e){}}});window.addEventListener('error',function(e){P({oke:1,type:'error',message:e.message,line:e.lineno,col:e.colno})});window.addEventListener('unhandledrejection',function(e){P({oke:1,type:'error',message:'Unhandled promise error: '+(e.reason&&e.reason.message||e.reason),line:0})})})();";
function buildPreview(F,entry){
  entry=entry||(F["index.html"]!==undefined?"index.html":Object.keys(F).find(n=>ext(n)==="html"));
  if(!entry)return {html:"<p style=\"font-family:sans-serif\">No HTML file to preview. Add index.html.</p>",map:[]};
  let h=String(F[entry]);const used=[];
  const safe=s=>String(s).replace(/<\/(script)/gi,"<\\/$1").replace(/<\/(style)/gi,"<\\/$1");
  h=h.replace(/<link\b[^>]*\bhref\s*=\s*["']([^"']+)["'][^>]*>/gi,(m,href)=>{const k=href.replace(/^\.\//,"");if(F[k]!==undefined&&ext(k)==="css"&&/stylesheet/i.test(m))return "<style>\n"+safe(F[k])+"\n</style>";return m});
  h=h.replace(/<script\b([^>]*)\bsrc\s*=\s*["']([^"']+)["']([^>]*)>\s*<\/script>/gi,(m,a,src,b)=>{const k=src.replace(/^\.\//,"");if(F[k]!==undefined&&ext(k)==="js"){used.push(k);return "<script"+a+b+">"+safe(F[k])+"</script>"}return m});
  const cap="<script>"+CAPTURE+"</script>";
  h=/<head[^>]*>/i.test(h)?h.replace(/<head[^>]*>/i,m=>m+"\n"+cap):cap+"\n"+h;
  const map=[];used.forEach(k=>{const idx=h.indexOf(safe(F[k]));if(idx>=0){const start=h.slice(0,idx).split("\n").length;map.push({file:k,start,end:start+String(F[k]).split("\n").length-1})}});
  return {html:h,map};
}
function mapLine(map,line){for(const m of map){if(line>=m.start&&line<=m.end)return {file:m.file,line:line-m.start+1}}return null}
const workerSource=code=>"var __l=function(k){return function(){var a=[].slice.call(arguments).map(function(x){try{return typeof x==='object'?JSON.stringify(x):String(x)}catch(e){return String(x)}});postMessage({type:'console',level:k,text:a.join(' ')})}};var console={log:__l('log'),info:__l('info'),warn:__l('warn'),error:__l('error')};self.onerror=function(m,s,l,c){postMessage({type:'error',message:String(m),line:l-1,col:c});return true};\n"+code+"\npostMessage({type:'done'});";

const API={check,explainError,applyFix,explainCode,improve,generate,template,templateList,docs:DOCS,searchDocs,makeZip,crc32,buildPreview,mapLine,workerSource,brackets,htmlTags,declaredNames,maskJS,ext};
if(typeof module!=="undefined"&&module.exports)module.exports=API;else root.OKE_BUILD=API;
})(typeof window!=="undefined"?window:globalThis);
