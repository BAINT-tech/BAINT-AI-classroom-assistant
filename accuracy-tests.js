/* Run: node tests/accuracy-tests.js   Checks each question reaches the RIGHT lesson (not just any lesson). Includes every PHY 101 outline sub-topic. */
const vm=require('vm'),fs=require('fs'),path=require('path');
global.window=global;global.localStorage={getItem(){return null},setItem(){}};global.navigator={onLine:false};
const root=path.join(__dirname,'..');
for(const f of ['lessons.js','lessons-extra.js','lessons-aerospace.js','lessons-phy101.js','lessons-core2.js','lessons-approved.js','solver.js','numeric.js','engine.js','blde.js','memory.js','curriculum.js','testbook.js','casestudy.js'])vm.runInThisContext(fs.readFileSync(path.join(root,f),'utf8'),{filename:f});
const E=window.BAINT_ENGINE;
/* [subject, question, expected lesson id(s)] */
const T=[
 ['physics','Units and dimensions',['units_dimensions']],['physics','What are dimensions in physics?',['units_dimensions']],['physics','Measurement errors',['measurement_errors']],['physics','What is percentage error?',['measurement_errors']],
 ['physics','Scalar quantities',['scalars_vectors_physics','vectors']],['physics','Vector quantities',['scalars_vectors_physics','vectors']],['physics','How do I do vector addition?',['scalars_vectors_physics']],
 ['physics','Distance and displacement',['equations_of_motion']],['physics','Speed and velocity',['equations_of_motion']],['physics','What is acceleration?',['equations_of_motion']],['physics','Motion graphs',['motion_graphs']],['physics','velocity time graph',['motion_graphs']],
 ["physics","Explain Newton's laws",['newtons_laws']],['physics','What is friction?',['friction']],['physics','Applications of force',['applications_of_force']],['physics','inclined plane problems',['applications_of_force']],
 ['physics','What is linear momentum?',['momentum']],['physics','Conservation of momentum',['momentum','collisions']],['physics','Types of collision',['collisions']],['physics','elastic and inelastic collision',['collisions']],
 ['physics','Conditions for equilibrium',['equilibrium_moments']],['physics','What are moments and torque?',['equilibrium_moments','rotational_motion']],['physics','principle of moments',['equilibrium_moments']],
 ['physics','Position and reference frames',['reference_frames_relative_motion']],['physics','Time measurement',['reference_frames_relative_motion']],['physics','What is relative motion?',['reference_frames_relative_motion']],
 ['physics','Universal law of gravitation',['universal_gravitation','gravity']],['physics','Acceleration due to gravity',['universal_gravitation','gravity']],['physics','What is a gravitational field?',['universal_gravitation','gravity']],
 ['physics','What is the centre of mass?',['centre_of_mass']],['physics','centre of gravity',['centre_of_mass']],
 ['physics','Angular velocity and angular acceleration',['rotational_motion']],['physics','What is moment of inertia?',['rotational_motion']],['physics','Rotational motion',['rotational_motion']],
 ['biology','What is osmosis?',['diffusion_osmosis']],['biology','Explain mitosis',['cell_division']],['biology','How does the heart pump blood?',['circulatory_system']],['biology','What is a vaccine?',['immunity_vaccines']],['biology','Explain the nervous system',['nervous_system']],['biology','Explain photosynthesis',['photosynthesis']],
 ['chemistry','Explain isomerism',['isomerism']],['chemistry','What is electronegativity?',['electronegativity']],['chemistry','Explain ionic bonding',['chemical_bonding']],['chemistry','What is a mole?',['moles']],
 ['history','What was colonialism in Africa?',['colonialism_africa']],['history','When did Nigeria gain independence?',['nigerian_independence']],['history','Explain the transatlantic slave trade',['transatlantic_slave_trade']],['history','Explain the French Revolution',['french_revolution','revolution']],
 ['geography','What is climate change?',['climate_change']],['geography','Explain how rivers form',['rivers_landforms']],['geography','What is population density?',['population_density']],['geography','What is plate tectonics?',['plate_tectonics']],
 ['government','What is federalism?',['federalism']],['government','What is democracy?',['democracy']],
 ['economics','What is inflation?',['inflation']],['economics','What is GDP?',['gdp']],['economics','What is opportunity cost?',['opportunity_cost']],['economics','What is a monopoly?',['monopoly']],['economics','Explain supply and demand',['supply_demand']],
 ['computer','What is HTML?',['html_basics']],['computer','What is an algorithm?',['algorithm']],['engineering','What is stress and strain?',['stress_strain']],['aerospace','What is Mach number?',['aerodynamics_basics']],['aerospace','How do aeroplanes fly?',['forces_of_flight']],['aerospace','How does a jet engine work?',['aircraft_propulsion']],
 ['math','What is a matrix?',null],['math','Explain the binomial theorem',null]
];
(async()=>{
  let ok=0,bad=[];
  for(const [subj,q,exp] of T){
    E.reset();const r=await Promise.resolve(E.answer(q,{subject:subj,mode:'step',history:[{role:'user',text:q}]}));
    const lf=E.lastFound&&E.lastFound(); const id=lf&&lf.id;
    const good=exp===null?!!id:(exp.indexOf(id)>-1);
    if(good)ok++;else bad.push(subj+' | '+q+'  → got '+(id||('FALLBACK: '+(r.lead||'')))+'  (wanted '+(exp&&exp.join('/'))+')');
  }
  console.log(ok+'/'+T.length+' routed to the correct lesson');
  if(bad.length)console.log('\nMISROUTED:\n'+bad.join('\n'));
  process.exit(bad.length?1:0);
})();
