/* ══════════════════════════════════════════════════════════════════════════
   BAINT TEST BOOK  -  testbook.js     (loads after curriculum.js; works inside the chat, offline, no API)
   Say: "Test Book", "test me on AAE 101", "quiz me on physics", "test me on photosynthesis 10 questions".
   Question bank = hand-written practice questions + practice questions generated from the lesson library.
   Marks MCQ, true/false, numeric (tolerance) and short answers, explains every answer, keeps progress on the device.
   Practice material only: nothing here is an official examination question.
   ══════════════════════════════════════════════════════════════════════════ */
(function(){
"use strict";
const E=window.BAINT_ENGINE; if(!E||E.__tb)return;
const inner=E.answer.bind(E), KEY="baint_tb_v1";
const norm=s=>String(s||"").toLowerCase().replace(/[’‘]/g,"'").replace(/\s+/g," ").trim();
const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
const SN={math:"Mathematics",english:"English",biology:"Biology",chemistry:"Chemistry",history:"History",computer:"Computer Science",biochemistry:"Biochemistry",histology:"Histology",enzymology:"Advanced Enzymology",purine_pyrimidine:"Purine & Pyrimidine Biosynthesis",cholesterol:"Cholesterol Biosynthesis",engineering:"Engineering",aerospace:"Aerospace Engineering",physics:"Physics",economics:"Economics",geography:"Geography",government:"Government"};

/* ---------- 1. hand-written practice questions ---------- */
let n=0;
const base=o=>Object.assign({id:"s"+(++n),gen:false,src:"BAINT practice question"},o);
const M=(subj,course,topic,tags,q,opts,ans,ex)=>base({t:"mcq",subj,course,topic,tags,q,opts,ans,ex});
const N=(subj,course,topic,tags,q,ans,ex,unit)=>base({t:"num",subj,course,topic,tags,q,ans,ex,unit});
const TF=(subj,course,topic,tags,q,ans,ex)=>base({t:"tf",subj,course,topic,tags,q,ans,ex});
const SA=(subj,course,topic,tags,q,acc,ex)=>base({t:"short",subj,course,topic,tags,q,acc,ex});
const SEED=[
 M("math","MTH 101","Quadratic equations",["quadratic","equation","algebra"],"Solve x² − 5x + 6 = 0.",["x = 2 or x = 3","x = −2 or x = −3","x = 1 or x = 6","x = −1 or x = −6"],0,"Factorise: (x − 2)(x − 3) = 0, so x = 2 or x = 3."),
 N("math","MTH 101","Trigonometry",["trigonometry","sine","cosine"],"Evaluate sin 30° + cos 60°.",1,"sin 30° = 0.5 and cos 60° = 0.5, so the sum is 1."),
 M("math","MTH 101","Sequences and series",["series","sequence","arithmetic"],"Find the sum of the first 10 terms of the arithmetic series 2, 4, 6, …",["100","110","120","90"],1,"S = n/2 × (2a + (n − 1)d) = 5 × (4 + 18) = 110."),
 N("math","MTH 101","Logarithms",["logarithm","log","indices"],"If log₁₀ x = 3, find x.",1000,"log₁₀ x = 3 means x = 10³ = 1000."),
 M("math","MTH 101","Quadratic equations",["quadratic","discriminant"],"What is the discriminant of ax² + bx + c = 0?",["b² − 4ac","b² + 4ac","√(b² − 4ac)","−b ÷ 2a"],0,"The discriminant is b² − 4ac. It tells you how many real roots the equation has."),
 M("math","MTH 103","Vectors",["vector","dot product","scalar product"],"Find the dot product of a = (1, 2, 3) and b = (4, 5, 6).",["28","32","36","15"],1,"1×4 + 2×5 + 3×6 = 4 + 10 + 18 = 32."),
 N("math","MTH 103","Vectors",["vector","magnitude"],"Find the magnitude of the vector (3, 4).",5,"√(3² + 4²) = √25 = 5."),
 TF("math","MTH 103","Vectors",["vector","cross product"],"The cross product of two vectors is a scalar.",false,"The cross product of two vectors is another vector, perpendicular to both. The dot product is the scalar."),
 N("math","MTH 103","Dynamics",["dynamics","kinematics","projectile","motion"],"A ball is thrown straight up at 20 m/s. Taking g = 10 m/s², how many seconds does it take to reach its highest point?",2,"At the top v = 0, so t = (v − u) ÷ a = 20 ÷ 10 = 2 s.","s"),
 N("physics","PHY 101","Kinematics",["kinematics","motion","acceleration"],"A car starts from rest and accelerates at 2 m/s² for 5 s. How far does it travel (in metres)?",25,"s = ut + ½at² = 0 + ½ × 2 × 5² = 25 m.","m"),
 M("physics","PHY 101","Units",["unit","force","newton"],"What is the SI unit of force?",["Joule","Newton","Watt","Pascal"],1,"Force is measured in newtons (N). 1 N = 1 kg·m/s²."),
 N("physics","PHY 101","Energy",["energy","kinetic"],"Find the kinetic energy (in joules) of a 4 kg body moving at 3 m/s.",18,"KE = ½mv² = ½ × 4 × 3² = 18 J.","J"),
 M("physics","PHY 101","Newton's laws",["newton","force","motion"],"Which equation expresses Newton's second law?",["F = ma","F = mv","F = m ÷ a","F = a ÷ m"],0,"Net force = mass × acceleration (F = ma)."),
 TF("physics","PHY 101","Heat",["heat","thermal","temperature"],"Heat flows spontaneously from a colder object to a hotter object.",false,"Heat flows from hot to cold, not the other way, unless work is done (as in a refrigerator)."),
 N("physics","PHY 101","Waves",["wave","frequency","period"],"A wave has a period of 0.02 s. What is its frequency in hertz?",50,"f = 1 ÷ T = 1 ÷ 0.02 = 50 Hz.","Hz"),
 M("physics","PHY 101","Momentum",["momentum","collision"],"When is the total momentum of a system conserved?",["When no external force acts","When kinetic energy is constant","When the objects are heavy","Only in elastic collisions"],0,"Momentum is conserved when no external net force acts on the system, in elastic or inelastic collisions."),
 N("physics","PHY 101","Work",["work","energy","force"],"A force of 20 N moves an object 5 m in the direction of the force. How much work is done (in joules)?",100,"W = F × d = 20 × 5 = 100 J.","J"),
 M("chemistry","CHM 101","Atomic structure",["atom","atomic number","proton"],"The atomic number of an element is the number of its…",["protons","neutrons","protons plus neutrons","electron shells"],0,"Atomic number = number of protons in the nucleus."),
 N("chemistry","CHM 101","Mole concept",["mole","molar mass","stoichiometry"],"Calculate the molar mass of water, H₂O (H = 1, O = 16) in g/mol.",18,"2 × 1 + 16 = 18 g/mol.","g/mol"),
 M("chemistry","CHM 101","Chemical bonding",["bond","covalent","bonding"],"Which bond is formed by sharing pairs of electrons?",["Ionic","Covalent","Metallic","Hydrogen"],1,"A covalent bond forms when atoms share pairs of electrons."),
 TF("chemistry","CHM 101","Periodic table",["periodic","group","valence"],"Elements in the same group of the periodic table have the same number of valence electrons.",true,"Elements in a group have the same outer-shell electron count, which is why they react similarly."),
 N("chemistry","CHM 101","Mole concept",["mole","stoichiometry"],"How many moles are in 36 g of water (molar mass 18 g/mol)?",2,"moles = mass ÷ molar mass = 36 ÷ 18 = 2 mol.","mol"),
 M("chemistry","CHM 101","Acids and bases",["acid","base","ph"],"What is the pH of a neutral solution at 25 °C?",["0","7","10","14"],1,"Pure water at 25 °C has pH 7. Below 7 is acidic, above 7 is basic."),
 M("aerospace","AAE 101","Forces of flight",["drag","thrust","forces","flight"],"Which force opposes thrust in steady level flight?",["Lift","Weight","Drag","Torque"],2,"Drag opposes thrust. In steady level flight thrust equals drag, and lift equals weight."),
 M("aerospace","AAE 101","Aircraft controls",["elevator","pitch","control","aircraft"],"Which control surface controls pitch?",["Aileron","Elevator","Rudder","Flap"],1,"The elevator on the horizontal tail controls pitch. Ailerons control roll and the rudder controls yaw."),
 N("aerospace","AAE 101","Aerodynamics",["mach","speed","aerodynamics"],"An aircraft flies at 680 m/s where the speed of sound is 340 m/s. What is its Mach number?",2,"M = V ÷ a = 680 ÷ 340 = 2, so the flight is supersonic."),
 TF("aerospace","AAE 101","Forces of flight",["lift","weight","flight"],"In steady level flight, lift equals weight.",true,"For steady level flight the forces balance: lift = weight and thrust = drag."),
 M("aerospace","AAE 101","History of flight",["history","wright","flight"],"In what year did the Wright brothers make the first powered, controlled aeroplane flight?",["1783","1903","1927","1957"],1,"The Wright brothers flew at Kitty Hawk on 17 December 1903."),
 M("aerospace","AAE 101","Atmosphere",["atmosphere","troposphere","lapse","temperature"],"In the troposphere, temperature falls by about how much per kilometre of altitude?",["0.65 °C","6.5 °C","65 °C","0 °C"],1,"The ISA lapse rate in the troposphere is about 6.5 °C per km."),
 N("aerospace","AAE 101","Aerodynamics",["lift","aerodynamics","equation"],"Use L = ½ρV²S·C_L to find the lift (in newtons) for ρ = 1.2 kg/m³, V = 50 m/s, S = 10 m² and C_L = 0.6.",9000,"L = 0.5 × 1.2 × 50² × 10 × 0.6 = 9000 N.","N"),
 M("aerospace","AAE 101","Propulsion",["propulsion","turbofan","engine","jet"],"Which engine type sends part of its air around the core (bypass)?",["Turbojet","Turbofan","Ramjet","Piston engine"],1,"A turbofan uses a large fan to send bypass air around the engine core, which makes airliners quieter and more efficient."),
 M("aerospace","AAE 101","Aircraft controls",["rudder","yaw","control"],"The rudder controls motion about which axis?",["Roll (longitudinal)","Pitch (lateral)","Yaw (vertical)","None of these"],2,"The rudder controls yaw about the vertical axis."),
 SA("aerospace","AAE 101","History of flight",["nasrda","space","nigeria"],"What does NASRDA stand for?",["national space research and development agency"],"NASRDA is the National Space Research and Development Agency of Nigeria."),
 M("english","GST 111","Grammar",["grammar","subject verb","agreement"],"Choose the correct sentence.",["Neither of the boys are here.","Neither of the boys is here.","Neither of the boys were here.","Neither of the boys have here."],1,"“Neither” is singular, so it takes “is”."),
 M("english","GST 111","Spelling",["spelling","vocabulary"],"Choose the correct spelling.",["acommodate","accomodate","accommodate","acomodate"],2,"The correct spelling is accommodate, with a double c and a double m."),
 TF("english","GST 111","Sentences",["sentence","grammar"],"A complete sentence needs a subject and a verb.",true,"A complete sentence expresses a full thought and normally has a subject and a verb."),
 M("engineering","GET 101","Engineering profession",["coren","engineer","regulation","nigeria"],"Which body registers and regulates engineers in Nigeria?",["NSE","COREN","NUC","NASRDA"],1,"COREN, the Council for the Regulation of Engineering in Nigeria, registers and regulates engineers. The NSE is the professional society."),
 TF("engineering","GET 101","Ethics",["ethics","safety","engineer"],"An engineer's first duty is to protect public safety.",true,"Engineering codes of ethics place public safety above cost, deadlines and loyalty to an employer."),
 M("physics","PHY 101","1. Measurements",["dimensions","units","measurements"],"What are the dimensions of force?",["MLT⁻²","ML²T⁻²","MLT⁻¹","ML⁻¹T⁻²"],0,"Force = mass × acceleration = M × LT⁻² = MLT⁻²."),
 N("physics","PHY 101","1. Measurements",["errors","measurement","error"],"A length is measured as 50.0 cm with an absolute error of 0.5 cm. What is the percentage error?",1,"Percentage error = 0.5 ÷ 50 × 100 = 1%.","%"),
 N("physics","PHY 101","2. Scalars & Vectors",["vector","resultant","vectors"],"Forces of 3 N east and 4 N north act on a body. What is the magnitude of the resultant force (in newtons)?",5,"R = √(3² + 4²) = 5 N.","N"),
 N("physics","PHY 101","3. Motion",["motion","acceleration","kinematics"],"A car accelerates uniformly from rest to 20 m/s in 5 s. What is its acceleration (m/s²)?",4,"a = (v − u) ÷ t = 20 ÷ 5 = 4 m/s².","m/s²"),
 M("physics","PHY 101","3. Motion",["motion","graph","graphs","velocity"],"The area under a velocity–time graph represents…",["acceleration","displacement","force","power"],1,"The gradient of a v–t graph is acceleration; the area under it is displacement."),
 N("physics","PHY 101","4. Forces & Laws of Motion",["newton","force","laws"],"A net force of 50 N acts on a 10 kg mass. Find its acceleration (m/s²).",5,"a = F ÷ m = 50 ÷ 10 = 5 m/s².","m/s²"),
 N("physics","PHY 101","4. Forces & Laws of Motion",["friction","force"],"A 20 kg box rests on a floor with μ = 0.3. Taking g = 9.8 m/s², what is the maximum friction force (in newtons)?",58.8,"N = mg = 20 × 9.8 = 196 N; friction = μN = 0.3 × 196 = 58.8 N.","N"),
 TF("physics","PHY 101","4. Forces & Laws of Motion",["newton","force","action"],"Newton's third-law action and reaction forces act on the same body.",false,"Action and reaction forces are equal and opposite but act on different bodies, so they do not cancel."),
 N("physics","PHY 101","5. Momentum & Collision",["collision","momentum"],"A 2 kg trolley moving at 3 m/s hits a stationary 1 kg trolley and they stick together. What is their common speed (m/s)?",2,"Momentum is conserved: (2 × 3) = (2 + 1) × v, so v = 2 m/s.","m/s"),
 N("physics","PHY 101","6. Equilibrium of Forces",["moments","equilibrium","torque"],"A 400 N child sits 1.5 m from the pivot of a uniform seesaw. What weight placed 2 m from the pivot on the other side balances it (in newtons)?",300,"Clockwise moment = anticlockwise moment: W × 2 = 400 × 1.5, so W = 300 N.","N"),
 N("physics","PHY 101","7. Space & Time",["relative","reference","motion"],"Car A travels at 80 km/h and car B at 60 km/h in the opposite direction on the same road. What is their relative speed (km/h)?",140,"Moving in opposite directions, speeds add: 80 + 60 = 140 km/h.","km/h"),
 M("physics","PHY 101","8. Gravitational Force",["gravitation","gravity","gravitational"],"If the distance between two masses is doubled, the gravitational force between them becomes…",["four times larger","half as large","one quarter as large","unchanged"],2,"F ∝ 1 ÷ r², so doubling r divides the force by 2² = 4."),
 N("physics","PHY 101","9. Centre of Mass",["centre","mass","gravity"],"A 2 kg mass is at x = 0 and a 3 kg mass is at x = 5 m. Find the x-coordinate of the centre of mass (in metres).",3,"x = (2 × 0 + 3 × 5) ÷ (2 + 3) = 3 m.","m"),
 N("physics","PHY 101","10. Rotational Motion",["rotation","rotational","torque","inertia"],"A torque of 10 N·m acts on a wheel with moment of inertia 2 kg·m². Find its angular acceleration (rad/s²).",5,"α = τ ÷ I = 10 ÷ 2 = 5 rad/s².","rad/s²"),
 M("chemistry","CHM 101","1. Atoms, molecules, elements, compounds and mixtures",["compound","element","mixture","elements","compounds"],"Which of these is a compound?",["Oxygen gas (O₂)","Water (H₂O)","Air","Iron (Fe)"],1,"Water is made of hydrogen and oxygen chemically combined in a fixed ratio. Oxygen and iron are elements, and air is a mixture."),
 N("chemistry","CHM 101","2. Modern atomic theory",["atomic","atom","isotopes","mass"],"An atom has 17 protons and 18 neutrons. What is its mass number?",35,"Mass number = protons + neutrons = 17 + 18 = 35."),
 M("chemistry","CHM 101","2. Modern atomic theory",["rutherford","nucleus","atomic","models"],"Whose gold-foil experiment showed that an atom has a small, dense, positive nucleus?",["Dalton","Thomson","Rutherford","Bohr"],2,"Rutherford's gold-foil scattering experiment (1911) showed the nuclear atom."),
 N("chemistry","CHM 101","3. Electronic theory of atoms",["electron","configuration","subshell","electronic"],"How many electrons can a d subshell hold?",10,"A d subshell has 5 orbitals, and each orbital holds 2 electrons, so it holds 10 electrons."),
 M("chemistry","CHM 101","4. Chemical bonding and intermolecular forces",["hydrogen","intermolecular","forces","bonding"],"Which intermolecular force is mainly responsible for the high boiling point of water?",["London dispersion forces","Hydrogen bonding","Ionic bonding","Metallic bonding"],1,"Hydrogen bonds form between H bonded to O and a lone pair on a neighbouring O, so water needs a lot of energy to boil."),
 M("chemistry","CHM 101","5. Chemical kinetics",["kinetics","rate","order","reaction"],"For a first-order reaction, what happens to the rate if the reactant concentration is doubled?",["It doubles","It quadruples","It stays the same","It halves"],0,"For a first-order reaction rate = k[A], so rate is directly proportional to concentration."),
 N("chemistry","CHM 101","6. Kinetic theory of matter and gas laws",["gas","ideal","pressure","laws","kinetic"],"2.0 mol of an ideal gas occupies 10 L at 300 K. Find its pressure in atm (R = 0.0821 L·atm/(mol·K)).",4.93,"P = nRT ÷ V = 2.0 × 0.0821 × 300 ÷ 10 ≈ 4.93 atm.","atm"),
 TF("chemistry","CHM 101","11. Kinetic theory of matter",["kinetic","gas","pressure","theory"],"According to the kinetic theory, gas pressure is caused by collisions of gas particles with the walls of the container.",true,"Particles in constant random motion hit the walls, and the force of many collisions per unit area is the pressure."),
 N("chemistry","CHM 101","7. Thermochemistry and thermodynamics",["heat","enthalpy","thermochemistry","calorimetry"],"How much heat (in joules) is needed to raise the temperature of 100 g of water by 10 °C? (c = 4.18 J/g°C)",4180,"q = mcΔT = 100 × 4.18 × 10 = 4180 J.","J"),
 N("chemistry","CHM 101","7. Thermochemistry and thermodynamics",["gibbs","free","energy","thermodynamics","entropy"],"For ΔH = −100 kJ and ΔS = −0.2 kJ/K at 300 K, calculate ΔG in kJ.",-40,"ΔG = ΔH − TΔS = −100 − (300 × −0.2) = −100 + 60 = −40 kJ, so the reaction is spontaneous.","kJ"),
 M("chemistry","CHM 101","8. Redox reaction and electrochemistry",["oxidation","number","redox","oxidation numbers"],"What is the oxidation number of manganese in KMnO₄?",["+2","+4","+6","+7"],3,"K is +1 and four O atoms are −8, so Mn must be +7 for the compound to be neutral."),
 N("chemistry","CHM 101","8. Redox reaction and electrochemistry",["electrochemistry","cell","electrode","potential"],"Calculate E°cell for a Zn/Cu galvanic cell given E°(Cu²⁺/Cu) = +0.34 V and E°(Zn²⁺/Zn) = −0.76 V (in volts).",1.1,"E°cell = E°cathode − E°anode = 0.34 − (−0.76) = 1.10 V.","V"),
 M("chemistry","CHM 101","9. Chemical equilibrium",["equilibrium","constant","temperature"],"Which change alters the value of the equilibrium constant K?",["Adding a catalyst","Changing the temperature","Changing the pressure","Adding more reactant"],1,"K depends only on temperature. Concentration, pressure and catalysts do not change K."),
 M("chemistry","CHM 101","10. Wave–particle duality (Quantum and atomic number)",["duality","wave","particle","quantum","broglie"],"Which equation gives the de Broglie wavelength of a particle?",["λ = h ÷ mv","λ = mv ÷ h","λ = hf","λ = c ÷ f"],0,"de Broglie: λ = h ÷ (mv), where h is Planck's constant."),
 M("chemistry","CHM 101","12. Chemical reaction",["reaction","reactions","displacement","types"],"What type of reaction is Zn + CuSO₄ → ZnSO₄ + Cu?",["Synthesis","Decomposition","Single displacement","Neutralisation"],2,"Zinc is more reactive than copper, so it displaces copper from its compound."),
 N("chemistry","CHM 101","14. Stoichiometry",["stoichiometry","mole","ratio","reacting","masses"],"For 2H₂ + O₂ → 2H₂O, what mass of water (in grams) forms from 4 g of hydrogen with excess oxygen? (H = 1, O = 16)",36,"4 g of H₂ is 2 mol; the ratio H₂ : H₂O is 1 : 1, so 2 mol of water forms: 2 × 18 = 36 g.","g")
];

/* ---------- 2. practice questions generated from the lesson library ---------- */
const lessons=()=>(typeof EDU_LESSONS!=="undefined"&&Array.isArray(EDU_LESSONS))?EDU_LESSONS:[];
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const firstSentence=t=>String(t||"").split(/(?<=[.!?])\s+/)[0]||"";
const cut=(t,m)=>{t=String(t||"").replace(/\.$/,"");return t.length>m?t.slice(0,m-1)+"…":t};
function gen(l){
  const mates=lessons().filter(x=>x.subject===l.subject&&x.id!==l.id);
  if(mates.length<3)return [];
  const out=[], oth=shuf(mates).slice(0,3);
  const hide=[l.title].concat((l.aliases||[]).filter(a=>a.length>=5&&a.indexOf(" ")>-1)).sort((a,b)=>b.length-a.length)
    .reduce((s,w)=>s.replace(new RegExp(w.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"gi"),"____"),firstSentence(l.meaning));
  const defOpts=shuf([l.title].concat(oth.map(x=>x.title)));
  out.push({id:"g:"+l.id+":def",t:"mcq",gen:true,subj:l.subject,course:"",topic:l.title,tags:[l.id],src:"BAINT lesson: "+l.title,
    q:"Which topic is described here?\n“"+hide+"”",opts:defOpts,ans:defOpts.indexOf(l.title),ex:"This describes "+l.title+". "+(l.summary||"")});
  if(l.uses){
    const useOpts=shuf([cut(l.uses,95)].concat(oth.filter(x=>x.uses).map(x=>cut(x.uses,95))));
    if(useOpts.length>=3)out.push({id:"g:"+l.id+":use",t:"mcq",gen:true,subj:l.subject,course:"",topic:l.title,tags:[l.id],src:"BAINT lesson: "+l.title,
      q:"Which of these describes where "+l.title+" is used?",opts:useOpts,ans:useOpts.indexOf(cut(l.uses,95)),ex:l.title+" is used in: "+l.uses});
  }
  return out;
}

/* ---------- 3. marking ---------- */
function lev(a,b){if(a===b)return 0;if(Math.abs(a.length-b.length)>2)return 9;let p=[...Array(b.length+1).keys()];for(let i=1;i<=a.length;i++){const c=[i];for(let j=1;j<=b.length;j++)c[j]=Math.min(p[j]+1,c[j-1]+1,p[j-1]+(a[i-1]===b[j-1]?0:1));p=c}return p[b.length]}
function parseNum(s){
  s=String(s).replace(/,/g,"").toLowerCase();
  if(s.indexOf("=")>-1)s=s.slice(s.lastIndexOf("=")+1);
  const f=s.match(/(-?\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)/); if(f&&+f[2])return +f[1]/ +f[2];
  const m=s.replace(/−/g,"-").match(/-?\d+(?:\.\d+)?(?:e-?\d+)?/); return m?parseFloat(m[0]):null;
}
function mark(q,raw){
  const s=norm(raw);
  if(q.t==="mcq"){
    let i=-1; const L=s.match(/^(?:option\s*|answer\s*)?\(?([a-d])\)?[.):]?$/);
    if(L)i="abcd".indexOf(L[1]);
    else i=q.opts.findIndex(o=>norm(o)===s||(s.length>=3&&norm(o).startsWith(s)));
    if(i<0||i>=q.opts.length)return {read:false};
    return {read:true,ok:i===q.ans,given:q.opts[i]};
  }
  if(q.t==="tf"){
    const T=/^(true|t|yes|correct|right)$/.test(s),F=/^(false|f|no|incorrect|wrong)$/.test(s);
    if(!T&&!F)return {read:false};
    return {read:true,ok:T===q.ans,given:T?"True":"False"};
  }
  if(q.t==="num"){
    const v=parseNum(raw); if(v===null||isNaN(v))return {read:false};
    const tol=Math.max(Math.abs(q.ans)*0.01,0.005);
    return {read:true,ok:Math.abs(v-q.ans)<=tol,given:String(v)};
  }
  if(!s)return {read:false};
  const ok=(q.acc||[]).some(a=>{a=norm(a);return s===a||s.includes(a)||(a.length>=6&&lev(s,a)<=2)});
  return {read:true,ok,given:raw};
}
const answerText=q=>q.t==="mcq"?"ABCD"[q.ans]+". "+q.opts[q.ans]:q.t==="tf"?(q.ans?"True":"False"):q.t==="num"?q.ans+(q.unit?" "+q.unit:""):q.acc[0];

/* ---------- 4. progress (stored on this device) ---------- */
function load(){try{const v=JSON.parse(localStorage.getItem(KEY)||"null");if(v&&Array.isArray(v.attempts))return v}catch(e){}return {attempts:[],wrong:[]}}
function store(v){try{localStorage.setItem(KEY,JSON.stringify(v))}catch(e){}}
function record(tb){
  const v=load(), answered=tb.res.filter(r=>!r.skip);
  if(!tb.res.length)return;
  v.attempts.push({date:Date.now(),scope:tb.scope,score:tb.score,total:tb.qs.length,res:tb.res.map(r=>({q:r.id,topic:r.topic,ok:r.ok}))});
  v.attempts=v.attempts.slice(-50);
  tb.res.forEach(r=>{const q=tb.qs.find(x=>x.id===r.id);if(!q)return;v.wrong=v.wrong.filter(w=>w.id!==q.id);if(!r.ok)v.wrong.push(q)});
  v.wrong=v.wrong.slice(-40);store(v);
}
const pct=(a,b)=>b?Math.round(100*a/b):0;
function weakTopics(attempts){
  const t={};attempts.slice(-15).forEach(a=>a.res.forEach(r=>{const k=r.topic||"General";(t[k]=t[k]||[0,0]);t[k][1]++;if(r.ok)t[k][0]++}));
  return Object.entries(t).filter(e=>e[1][1]>=2&&e[1][0]/e[1][1]<0.6).sort((a,b)=>a[1][0]/a[1][1]-b[1][0]/b[1][1]).map(e=>e[0]+" ("+pct(e[1][0],e[1][1])+"%)");
}

/* ---------- 5. building a test ---------- */
const SUBJ_WORDS=[["mathematics|maths|math","math"],["physics","physics"],["chemistry","chemistry"],["biology","biology"],["english","english"],["aerospace|aeronautic","aerospace"],["engineering","engineering"],["computer science|computing","computer"],["history","history"],["economics","economics"],["geography","geography"],["government","government"]];
function buildPool(text,ctx){
  const cur=ctx.subject||"math", C=window.BAINT_COURSES;
  const cm=text.match(/\b(GST|CHM|MTH|PHY|GET|AAE)\s?-?\s?(\d{3})\b/i);
  let subj=null,lesson=null,course=null,label="";
  if(cm&&C){const c=C.find(cm[1]+cm[2]);if(c){course=c[0];subj=c[7];label=c[0]+" · "+c[1]}}
  if(!course&&text){
    const sw=SUBJ_WORDS.find(x=>new RegExp("^(the )?("+x[0]+")( questions?| subject)?$","i").test(text));
    if(sw){subj=sw[1];label=SN[subj]}
    else if(window.BLDE){const r=window.BLDE.recognize(text,cur);if(r&&r.topic){lesson=r.topic;subj=r.topic.subject;label=r.topic.title}}
  }
  if(!subj&&!text){subj=cur;label=SN[cur]||cur}
  if(!subj)return {qs:[],label:text};
  let seeds=SEED.filter(q=>q.subj===subj&&(!course||q.course===course));
  if(lesson){const tg=new Set([lesson.id].concat(String(lesson.title+" "+(lesson.aliases||[]).join(" ")).toLowerCase().split(/\W+/).filter(w=>w.length>3)));
    const sc=q=>q.tags.filter(t=>tg.has(t)).length;
    seeds=seeds.filter(q=>sc(q)>0).sort((a,b)=>sc(b)-sc(a))}   // best topic match first
  let gens=[];
  const ls=lessons().filter(l=>l.subject===subj);
  (lesson?[lesson]:ls).forEach(l=>{gens=gens.concat(gen(l))});
  return {qs:(lesson?seeds:shuf(seeds)).concat(shuf(gens)),label,subj,course};
}
function pick(pool,N){const out=[];const seen=new Set();for(const q of pool){if(out.length>=N)break;if(seen.has(q.id))continue;seen.add(q.id);out.push(q)}return out}

/* ---------- 6. messages ---------- */
const CHIPS=q=>q.t==="mcq"?q.opts.map((_,i)=>"ABCD"[i]).concat(["Skip"]):q.t==="tf"?["True","False","Skip"]:["Skip","Quit test"];
function showQ(tb){
  const q=tb.qs[tb.i], lines=[q.q];
  if(q.t==="mcq")lines.push("",...q.opts.map((o,i)=>"ABCD"[i]+". "+o));
  if(q.t==="tf")lines.push("","True or false?");
  if(q.t==="num")lines.push("","Type your answer as a number"+(q.unit?" (in "+q.unit+")":"")+".");
  if(q.t==="short")lines.push("","Type a short answer.");
  return lines.join("\n");
}
function qMsg(tb,pre){
  const q=tb.qs[tb.i], tag=(q.gen?"Practice (generated from lessons, not official)":"BAINT practice question");
  return {lead:"Test Book  ·  Question "+(tb.i+1)+" of "+tb.qs.length,text:(pre?pre+"\n\n":"")+showQ(tb),
    hint:(SN[q.subj]||q.subj)+(q.course?" · "+q.course:"")+(q.topic?" · "+q.topic:"")+"  |  "+tag+".",suggestions:CHIPS(q),tb};
}
function finish(tb,pre,quit){
  record(tb);
  const total=tb.qs.length, answered=tb.res.length, p=pct(tb.score,total);
  const weak=weakTopics(load().attempts);
  const wrongNow=tb.res.filter(r=>!r.ok);
  const note=p>=80?"Strong work.":p>=50?"Good effort. Review the explanations below.":"Keep practising. Study the topics below, then try again.";
  return {lead:(quit?"Test stopped":"Test complete")+"  ·  "+tb.score+" / "+total+" ("+p+"%)",
    text:(pre?pre+"\n\n":"")+note+(quit&&answered<total?" You answered "+answered+" of "+total+".":""),
    steps:tb.res.map((r,i)=>({text:(r.ok?"✓ ":r.skip?"– skipped: ":"✗ ")+(i+1)+". "+(r.topic||"Question")})),
    hint:weak.length?"Topics to improve: "+weak.slice(0,3).join(", ")+".":(wrongNow.length?"Say “review my mistakes” to see the answers again.":"All correct this time."),
    suggestions:(wrongNow.length?["Review my mistakes","Practise my mistakes"]:[]).concat(["My progress","Test Book"]).slice(0,4),
    tb:Object.assign({},tb,{ended:true})};
}
function start(pool,N,label,ctx,subj){
  const qs=pick(pool,N);
  if(!qs.length)return {lead:"No questions yet",text:"I do not have practice questions for “"+label+"” yet. Try a subject name (for example Physics), a course code such as AAE 101, or a lesson topic.",suggestions:["Test me on AAE 101","Test me on Physics","Test Book"]};
  const tb={scope:label,qs,i:0,score:0,res:[]};
  const r=qMsg(tb,"Let’s begin: "+qs.length+" question"+(qs.length>1?"s":"")+" on "+label+". Answer each one, and I will mark it and explain.");
  if(subj&&ctx.subject!==subj)r.subject=subj;
  return r;
}
const MENU=()=>({lead:"Test Book",text:"Practise and check what you know. Tell me what to test you on, for example “test me on AAE 101”, “quiz me on physics” or “test me on photosynthesis”. Add a number for more questions, like “10 questions”. I mark your answers, explain mistakes and keep your scores on this device.",
  suggestions:["Test me on AAE 101","Test me on Physics","Test me on MTH 101","My progress"],hint:"Practice questions only: these are not official examination questions."});
function progressMsg(){
  const v=load(), a=v.attempts;
  if(!a.length)return {lead:"No tests yet",text:"You have not finished a test yet. Say “Test Book” to start one.",suggestions:["Test Book"]};
  const avg=Math.round(a.reduce((s,x)=>s+pct(x.score,x.total),0)/a.length), weak=weakTopics(a);
  return {lead:"Your progress",text:a.length+" test"+(a.length>1?"s":"")+" taken, average "+avg+"%, best "+Math.max(...a.map(x=>pct(x.score,x.total)))+"%.",
    steps:a.slice(-5).reverse().map(x=>({text:new Date(x.date).toLocaleDateString(undefined,{day:"numeric",month:"short"})+"  ·  "+x.scope+"  ·  "+x.score+"/"+x.total})),
    hint:weak.length?"Topics to improve: "+weak.slice(0,4).join(", ")+".":"No weak topics yet. Keep going.",suggestions:(v.wrong.length?["Review my mistakes"]:[]).concat(["Test Book"])};
}
function mistakesMsg(){
  const w=load().wrong;
  if(!w.length)return {lead:"No mistakes saved",text:"You have no saved mistakes. Take a test and I will keep the ones you miss.",suggestions:["Test Book"]};
  return {lead:"Your saved mistakes",text:"Here are the questions you missed, with the correct answers:",
    steps:w.slice(-8).reverse().map(q=>({text:String(q.q).split("\n")[0]+"  →  "+answerText(q)})),suggestions:["Practise my mistakes","My progress"]};
}

/* ---------- 7. session handling ---------- */
function active(hist,q){
  const h=(hist||[]).slice(),last=h[h.length-1];
  if(last&&last.role==="user"&&norm(last.text)===norm(q))h.pop();
  for(let i=h.length-1;i>=0;i--)if(h[i].role==="baint")return h[i].tb&&!h[i].tb.ended?h[i].tb:null;
  return null;
}
const SIDE=/^(what|who|why|how|explain|define|solve|calculate)\b/i;
const START=/^(test book|testbook)\b|^(test|quiz|examine) (me|us)\b|^(please )?(give me|set|make) (me )?(a |some )?(\d+ )?(practice )?(test|quiz|questions?)\b|^practi[sc]e (questions? )?(on|for)\b|^(start|begin) (a )?(test|quiz)\b/i;
function step(tb,q,ctx){
  const n=norm(q).replace(/[.!?]+$/,"");
  if(/^(quit|stop|exit|end)( the)?( test)?$|^quit test$/.test(n))return finish(tb,"",true);
  if(/^(continue( test)?|repeat|show( the)? question)$/.test(n))return qMsg(tb);
  const cur=tb.qs[tb.i];
  if(/^skip$/.test(n)){
    tb.res.push({id:cur.id,topic:cur.topic,ok:false,skip:true});
    const pre="Skipped. The answer was "+answerText(cur)+".\n"+cur.ex;
    tb.i++;return tb.i>=tb.qs.length?finish(tb,pre):qMsg(tb,pre);
  }
  const m=mark(cur,q);
  if(!m.read){
    if(SIDE.test(q.trim())&&q.split(/\s+/).length>2){                      // a side question: answer it and keep the test
      const keep=r=>{if(r&&typeof r==="object"){r.tb=tb;r.suggestions=(r.suggestions||[]).slice(0,2).concat(["Continue test","Quit test"])}return r};
      const r0=inner(q,ctx);return r0&&typeof r0.then==="function"?r0.then(keep):keep(r0);
    }
    const how=cur.t==="mcq"?"Choose one of the options by typing its letter (A, B, C or D).":cur.t==="tf"?"Please answer True or False.":cur.t==="num"?"I could not read a number. Type just the number, for example 25.":"Type a short answer.";
    return Object.assign(qMsg(tb),{text:how+"\n\n"+showQ(tb)});
  }
  if(m.ok)tb.score++;
  tb.res.push({id:cur.id,topic:cur.topic,ok:m.ok});
  const fb=(m.ok?"✓ Correct.":"✗ Not quite. The correct answer is "+answerText(cur)+".")+"\n"+cur.ex;
  tb.i++;
  return tb.i>=tb.qs.length?finish(tb,fb):qMsg(tb,fb);
}
E.answer=function(question,ctx){
  ctx=ctx||{};const q=String(question||"").trim(),hist=Array.isArray(ctx.history)?ctx.history:[];
  const tb=active(hist,q);
  if(tb)return step(JSON.parse(JSON.stringify(tb)),q,ctx);
  const nq=norm(q).replace(/[.!?]+$/,"");
  if(/^(my )?(progress|test results|results|scores?|test history|show my progress)$/.test(nq))return progressMsg();
  if(/^(review|show|see) (my )?(mistakes|wrong answers|errors)$/.test(nq))return mistakesMsg();
  if(/^practi[sc]e (my )?(mistakes|wrong answers)$/.test(nq)){
    const w=load().wrong;if(!w.length)return mistakesMsg();
    return start(shuf(w),Math.min(w.length,10),"your mistakes",ctx,null);
  }
  if(/^(test book|testbook)$/.test(nq))return MENU();
  if(START.test(q)){
    const N=Math.min(20,Math.max(1,+((q.match(/\b(\d{1,2})\s*(questions?|qs?)\b/i)||[])[1]||5)));
    let text=q.replace(/^(test book|testbook)\s*(on|for)?/i,"").replace(/^(test|quiz|examine) (me|us)( on| about| in| for)?/i,"").replace(/^(please )?(give me|set|make) (me )?(a |some )?(\d+ )?(practice )?(test|quiz|questions?)( on| about| for)?/i,"")
      .replace(/^practi[sc]e (questions? )?(on|for)\s*/i,"").replace(/^(start|begin) (a )?(test|quiz)( on| about| for)?/i,"").replace(/\b\d{1,2}\s*(questions?|qs?)\b/ig,"").replace(/[?.!]+$/,"").trim();
    const P=buildPool(text,ctx);
    return start(P.qs,N,P.label||text,ctx,P.subj);
  }
  return inner(question,ctx);
};
E.__tb=true;
window.BAINT_TESTBOOK={SEED,gen,mark,parseNum,answerText};
})();
