/* ══════════════════════════════════════════════════════════════════════════
   BAINT CURRICULUM MAP  -  curriculum.js    (loads after memory.js; before testbook.js)
   Part I Harmattan Semester: CCMAS core courses + OAU courses (read from the course table the founder supplied).
   Course codes, titles, units, status and hours come from that table.
   "Typical topics" are NOT from the official outlines: they are marked as unconfirmed until the real outlines are loaded.
   ══════════════════════════════════════════════════════════════════════════ */
(function(){
"use strict";
const E=window.BAINT_ENGINE; if(!E||E.__curr)return;
const inner=E.answer.bind(E);
/* [code, title, units, status, lectureHours, practicalHours, source, subject, typical topics (unconfirmed)] */
const C=[
 ["GST 111","Communication in English",2,"C",15,45,"CCMAS","english",["Grammar and sentence structure","Paragraph and essay writing","Comprehension and summary","Vocabulary and punctuation"]],
 ["CHM 101","General Chemistry I",2,"C",30,0,"CCMAS","chemistry",["Atomic structure","Periodic table","Chemical bonding","States of matter","Stoichiometry and the mole","Acids, bases and pH"]],
 ["CHM 107","General Practical Chemistry I",1,"C",0,45,"CCMAS","chemistry",["Laboratory safety","Measurement and errors","Titration","Qualitative tests"]],
 ["MTH 101","Elementary Mathematics I",2,"C",30,0,"CCMAS","math",["Sets and real numbers","Algebraic equations and quadratics","Binomial theorem","Sequences and series","Trigonometry"]],
 ["PHY 101","General Physics I",2,"C",30,0,"CCMAS","physics",["Units and dimensions","Kinematics","Newton's laws","Work, energy and power","Momentum","Heat and temperature","Waves"]],
 ["PHY 107","General Practical Physics I",1,"C",0,45,"CCMAS","physics",["Measurement and error analysis","Vernier callipers and micrometer","Simple pendulum","Graph plotting"]],
 ["GET 101","Engineer in Society",1,"C",15,0,"CCMAS","engineering",["Engineering profession and history","Ethics and safety","COREN and the NSE","Sustainability"]],
 ["AAE 101","Introduction to Aerospace Systems Engineering 1",2,"C",30,0,"CCMAS","aerospace",["History of flight","Atmosphere","Forces of flight","Aircraft components and controls","Propulsion","Spaceflight basics"]],
 ["MTH 103","Elementary Mathematics III (Vectors, Geometry and Dynamics)",2,"C",30,0,"OAU","math",["Vectors","Dot and cross product","Coordinate geometry","Kinematics of a particle","Dynamics and Newton's laws"]],
 ["PHY 103","General Physics III",2,"C",30,0,"OAU","physics",[]]
];
const norm=s=>String(s||"").toLowerCase();
const find=code=>C.find(c=>c[0].replace(" ","")===code.replace(/\s|-/g,"").toUpperCase());
const SUBJ_NAME={english:"English",chemistry:"Chemistry",math:"Mathematics",physics:"Physics",engineering:"Engineering",aerospace:"Aerospace Engineering"};
function card(c){
  const [code,title,units,status,lh,ph,src,subject,topics]=c;
  const hrs=[lh?lh+" lecture hours":"",ph?ph+" practical hours":""].filter(Boolean).join(", ");
  return {lead:code+"  ·  "+title,
    text:units+" unit"+(units>1?"s":"")+", "+(status==="C"?"compulsory":status)+(hrs?", "+hrs:"")+". Source: "+src+". Part I, Harmattan semester. Subject in BAINT: "+SUBJ_NAME[subject]+".",
    steps:topics.length?topics.map(t=>({text:t})):[{text:"I do not have the official outline for this course yet. Send it and I will add it."}],
    hint:topics.length?"These topics are typical for this course and are NOT from the official outline. Confirm with your lecturer’s course outline.":"Course title, units and hours are from your course table.",
    subject,suggestions:["Test me on "+code,"Explain "+(topics[0]||SUBJ_NAME[subject])].slice(0,3),curriculum:code};
}
E.answer=function(question,ctx){
  const q=String(question||"").trim();
  const m=q.match(/\b(GST|CHM|MTH|PHY|GET|AAE)\s?-?\s?(\d{3})\b/i);
  const testIntent=/\b(test|quiz|practi[sc]e|examine)\b/i.test(q);
  if(m&&!testIntent){const c=find(m[1]+m[2]);if(c)return card(c)}
  if(/^(my |the |show (me )?(my |the )?)?(courses|curriculum|course list|course table|harmattan( semester)?( courses)?|part i( courses)?)\??$/i.test(q)){
    const tot=C.reduce((a,c)=>a+c[2],0);
    return {lead:"Part I · Harmattan semester",text:C.length+" courses, "+tot+" units in total (from your course table). Tap a course code to see more.",
      steps:C.map(c=>({text:c[0]+"  "+c[1]+"  ("+c[2]+(c[2]>1?" units":" unit")+")"})),suggestions:["AAE 101","MTH 101","PHY 101","CHM 101"]};
  }
  return inner(question,ctx);
};
E.__curr=true;
window.BAINT_COURSES={list:C,find,subjectOf:code=>{const c=find(code);return c&&c[7]}};
})();
