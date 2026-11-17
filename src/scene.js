import * as THREE from 'three';
export function mountOffice(canvas,journey){
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 if(reduced.matches||new URLSearchParams(location.search).has('no3d'))return null;
 let renderer;
 try{renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});}catch{return null;}
 const scene=new THREE.Scene();scene.background=new THREE.Color('#c7d5d1');scene.fog=new THREE.Fog('#c7d5d1',45,130);
 const camera=new THREE.PerspectiveCamera(43,1,.08,180);
 renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<700?1.25:1.7));renderer.shadowMap.enabled=innerWidth>700;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;
 const ambient=new THREE.HemisphereLight('#e6f2ff','#59634a',2.8);scene.add(ambient);
 const sun=new THREE.DirectionalLight('#fff0cd',3.5);sun.position.set(-12,22,18);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-30,right:30,top:30,bottom:-30});sun.shadow.bias=-.0003;scene.add(sun);
 const mat=c=>new THREE.MeshStandardMaterial({color:c,roughness:.88});
 const white=mat('#e7e5d5'),blue=mat('#6b9cac'),roof=mat('#b4a254'),trim=mat('#665742'),glass=mat('#41635e'),wood=mat('#6f5741'),floor=mat('#c2bca6'),leaf=mat('#496545'),dark=mat('#1e3234');
 function box(w,h,d,x,y,z,m){const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;scene.add(mesh);return mesh;}
 function gable(w,d,x,z,base=4.6,height=2.8,endMaterial=roof){
  const s=new THREE.Shape();s.moveTo(-w/2,0);s.lineTo(w/2,0);s.lineTo(0,height);s.closePath();
  const geo=new THREE.ExtrudeGeometry(s,{depth:d,bevelEnabled:false});const mesh=new THREE.Mesh(geo,[endMaterial,roof]);mesh.position.set(x,base,z-d/2);mesh.castShadow=true;scene.add(mesh);
  // Tile courses and narrow dark roof edges define the roof rather than a flat wedge.
  for(let side of [-1,1]){
   const angle=Math.atan2(height,w/2),len=Math.hypot(w/2,height);
   const panel=box(len,.12,d+.18,x+side*w/4,base+height/2,z,roof);panel.rotation.z=-side*angle;
   for(let row=0;row<13;row++){const t=(row+.5)/13;const line=box(.045,.045,d+.22,x+side*w/2*t,base+height*(1-t)+.1,z,trim);line.castShadow=false;}
   const edge=box(len,.16,.15,x+side*w/4,base+height/2+.05,z+d/2+.13,trim);edge.rotation.z=-side*angle;
  }
 }
 box(200,.2,160,0,-.2,0,mat('#8d9b7e'));box(51,.12,43,0,-.04,12,mat('#b3b6a7'));
 // Broad wings with a projecting central entrance, estimated from supplied photography.
 box(24,4.2,9,0,2.3,0,white);box(24,1.15,9.08,0,.85,0,blue);box(24,.38,9.2,0,.2,0,mat('#777f79'));
 // Broad hipped main roof, matching the new front photograph: the long
 // yellow front plane reaches the eaves; there are no large side gable walls.
 const eaveY=4.55,ridgeY=6.65,halfWidth=12.7,halfDepth=5.5,ridgeHalf=7.2;
 const roofPoints=[[-halfWidth,eaveY,halfDepth],[halfWidth,eaveY,halfDepth],
  [halfWidth,eaveY,-halfDepth],[-halfWidth,eaveY,-halfDepth],
  [-ridgeHalf,ridgeY,0],[ridgeHalf,ridgeY,0]];
 const roofGeo=new THREE.BufferGeometry();
 roofGeo.setAttribute('position',new THREE.Float32BufferAttribute(roofPoints.flat(),3));
 roofGeo.setIndex([0,1,5,0,5,4,1,2,5,2,3,4,2,4,5,3,0,4]);
 roofGeo.computeVertexNormals();
 const hipRoof=new THREE.Mesh(roofGeo.toNonIndexed(),roof);roofGeo.dispose();
 hipRoof.geometry.computeVertexNormals();hipRoof.castShadow=true;hipRoof.receiveShadow=true;scene.add(hipRoof);
 function roofLine(a,b,thickness=.045){
  const start=new THREE.Vector3(...a),end=new THREE.Vector3(...b),delta=end.clone().sub(start);
  const line=box(thickness,delta.length(),thickness,...start.clone().add(end).multiplyScalar(.5).toArray(),trim);
  line.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());line.castShadow=false;
 }
 // Courses wrap around all four slopes, including the diagonal hip edges.
 for(let row=0;row<21;row++){
  const t=row/21,y=eaveY+(ridgeY-eaveY)*t+.025,x=halfWidth-(halfWidth-ridgeHalf)*t,z=halfDepth*(1-t);
  roofLine([-x,y,z],[x,y,z],.025);roofLine([-x,y,-z],[x,y,-z],.025);
  roofLine([-x,y,-z],[-x,y,z],.025);roofLine([x,y,-z],[x,y,z],.025);
 }
 roofLine(roofPoints[0],roofPoints[4],.11);roofLine(roofPoints[3],roofPoints[4],.11);
 roofLine(roofPoints[1],roofPoints[5],.11);roofLine(roofPoints[2],roofPoints[5],.11);
 roofLine(roofPoints[4],roofPoints[5],.13);
 box(25.4,.15,.16,0,4.52,5.5,trim);
 // Two small raised triangular accents sit within the roof, not on the walls.
 for(const x of [-7,7])gable(3.2,2.8,x,1.7,5.65,.85,white);
 for(const x of [-2.15,2.15]){box(1.7,4.2,4,x,2.3,5,white);box(1.7,1.15,4,x,.85,5,blue);}box(2.6,.65,4,0,4.05,5,white);box(2.6,.15,4,0,.42,5,floor);
 // Open doorway and dark interior; camera travels through its plane.
 box(2.6,3.4,.12,0,1.95,4.58,dark);box(2.8,.16,.22,0,3.65,7.12,wood);
 for(const x of [-1.4,1.4])box(.15,3.5,.22,x,1.9,7.15,wood);
 for(const x of [-2.9,2.9]){box(.32,3.8,.32,x,2.25,10.2,white);box(.48,1.05,.48,x,.85,10.2,mat('#87998b'));}
 box(6.2,.3,3.5,0,.42,8.65,floor);box(6.7,.16,1,0,.17,10.5,floor);box(6.4,.17,.8,0,.31,10.1,floor);
 // Continuous central cross-gable: the porch roof runs back into the main
 // building. The previous short roof ended ahead of the wings, leaving a gap.
 // Use white end caps as in the reference; a separate facade behind an opaque
 // yellow cap also hid the facade and office sign in the original model.
 gable(7.2,13.4,0,3.85,4.35,3.1,white);
 box(.2,.16,13.65,0,7.5,3.85,trim); // continuous ridge cap
 // Tile joints make both sloping surfaces legible from the approach camera.
 for(const side of [-1,1]){
  const slope=Math.atan2(3.1,3.6),length=Math.hypot(3.6,3.1);
  for(let z=-2.65;z<10.5;z+=.55){
   const joint=box(length,.025,.025,side*1.8,5.96,z,trim);
   joint.rotation.z=-side*slope;joint.castShadow=false;
  }
 }
 box(6.2,.38,.35,0,4.12,10.2,white);
 function windowAt(x,z){box(1.8,2.1,.18,x,2.45,z,wood);box(1.57,1.9,.2,x,2.45,z+.02,glass);box(.07,1.95,.24,x,2.45,z+.13,wood);box(1.6,.07,.24,x,2.8,z+.13,wood);}
 for(const x of [-10,-7,-4,4,7,10])windowAt(x,4.59);
 for(const x of [-2.15,2.15]){box(.75,2,.2,x,2.4,7.1,wood);box(.6,1.8,.22,x,2.4,7.12,glass);}
 const sign=document.createElement('canvas');sign.width=512;sign.height=200;const ctx=sign.getContext('2d');ctx.fillStyle='#f5f4e8';ctx.fillRect(0,0,512,200);ctx.fillStyle='#25668a';ctx.font='bold 33px sans-serif';ctx.textAlign='center';ctx.fillText('DISKOMINFOSTANDI',256,85);ctx.font='24px sans-serif';ctx.fillText('KABUPATEN PULANG PISAU',256,128);
 const plaque=new THREE.Mesh(new THREE.PlaneGeometry(2.2,.86),new THREE.MeshStandardMaterial({map:new THREE.CanvasTexture(sign)}));plaque.position.set(0,5.45,10.57);scene.add(plaque);
 let seed=42;const rnd=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
 function tree(x,z,s){const trunk=new THREE.Mesh(new THREE.CylinderGeometry(.15*s,.24*s,3.8*s,7),wood);trunk.position.set(x,1.9*s,z);scene.add(trunk);for(let i=0;i<5;i++){const crown=new THREE.Mesh(new THREE.IcosahedronGeometry((1.6+rnd()*.6)*s,2),leaf);crown.position.set(x+(rnd()-.5)*2*s,(4+rnd()*1.5)*s,z+(rnd()-.5)*2*s);crown.scale.y=.8;crown.castShadow=true;scene.add(crown);}}
 for(const [x,z,s] of [[-17,0,1.6],[15,8,1],[-15,14,1.2],[-10,-10,1.7],[11,-9,1.8],[22,-7,2],[-23,-9,2]])tree(x,z,s);
 for(const x of [-4.4,4.4]){box(1.8,.35,1.5,x,.2,9,white);tree(x,9,.48);}
 for(let i=0;i<10;i++){box(.025,.005,27,-18+i*4,.04,17,mat('#929b91'));}
 const lamp=new THREE.PointLight('#ffd483',110,14,2);lamp.position.set(0,3.5,8.7);scene.add(lamp);
 const blueLamp=new THREE.PointLight('#4ca9d7',55,12,2);blueLamp.position.set(-2,2,7.8);scene.add(blueLamp);
 const bulb=new THREE.Mesh(new THREE.SphereGeometry(.09,12,8),new THREE.MeshBasicMaterial({color:'#ffe5ac'}));bulb.position.copy(lamp.position);scene.add(bulb);
 const haloCanvas=document.createElement('canvas');haloCanvas.width=haloCanvas.height=128;
 const haloContext=haloCanvas.getContext('2d'),gradient=haloContext.createRadialGradient(64,64,0,64,64,64);
 gradient.addColorStop(0,'rgba(255,226,163,.85)');gradient.addColorStop(.16,'rgba(255,209,120,.35)');gradient.addColorStop(1,'rgba(255,209,120,0)');haloContext.fillStyle=gradient;haloContext.fillRect(0,0,128,128);
 const halo=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(haloCanvas),transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));halo.position.copy(lamp.position);halo.scale.set(2.4,2.4,1);scene.add(halo);
 const fireflies=new THREE.Group();scene.add(fireflies);
 for(let i=0;i<(innerWidth<700?24:55);i++){const f=new THREE.Sprite(new THREE.SpriteMaterial({map:halo.material.map,color:'#dcff87',transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));f.userData={x:(rnd()-.5)*30,y:.7+rnd()*4,z:8+rnd()*18,phase:rnd()*Math.PI*2};f.scale.setScalar(.22+rnd()*.2);fireflies.add(f);}
 const movingGlow=halo.clone();movingGlow.material=halo.material.clone();movingGlow.material.color.set('#76cfff');movingGlow.scale.setScalar(.8);scene.add(movingGlow);
 let night=false;function theme(){night=document.documentElement.dataset.theme==='night';scene.background.set(night?'#081526':'#c7d5d1');scene.fog.color.copy(scene.background);ambient.intensity=night?.35:2.8;sun.intensity=night?.25:3.5;glass.emissive.set(night?'#ffc15c':'#000000');glass.emissiveIntensity=night?.65:0;fireflies.visible=night;}
 addEventListener('komi-theme',theme);theme();
 const clock=new THREE.Clock();let frameId=0,disposed=false,active=true,progress=0;
 function resize(){const w=canvas.clientWidth,h=canvas.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();schedule();}
 function render(){if(disposed)return;const rect=journey.getBoundingClientRect();const target=THREE.MathUtils.clamp(-rect.top/(journey.offsetHeight-innerHeight),0,1);progress=target;const p=progress;const ease=p*p*(3-2*p);const mobile=innerWidth<700;
 camera.position.set(THREE.MathUtils.lerp(mobile?7:11,0,Math.min(1,ease*2)),THREE.MathUtils.lerp(8,2.3,ease),THREE.MathUtils.lerp(mobile?49:38,5.8,ease));camera.lookAt(0,THREE.MathUtils.lerp(2.7,2.3,ease),4);
 canvas.style.opacity=String(1-THREE.MathUtils.smoothstep(p,.91,1));document.documentElement.style.setProperty('--journey',p);lamp.intensity=(100+progress*90)*(1+.06*Math.sin(performance.now()*.0015));blueLamp.intensity=45+progress*35;const t=performance.now()*.001;movingGlow.position.set(Math.sin(t*.35)*10,1.6+Math.sin(t*.6)*.7,12+Math.cos(t*.35)*5);blueLamp.position.copy(movingGlow.position);for(const f of fireflies.children){const d=f.userData;f.position.set(d.x+Math.sin(t*.5+d.phase)*1.2,d.y+Math.sin(t*.8+d.phase)*.4,d.z+Math.cos(t*.4+d.phase));f.material.opacity=.25+.65*(.5+.5*Math.sin(t*1.7+d.phase));}renderer.render(scene,camera);clock.getDelta();frameId=active&&!document.hidden?requestAnimationFrame(render):0;}
 function schedule(){if(!disposed&&active&&!frameId)frameId=requestAnimationFrame(render);}addEventListener('scroll',schedule,{passive:true});
 const observer=new IntersectionObserver(entries=>{active=entries[0].isIntersecting;if(active){cancelAnimationFrame(frameId);render();}else {cancelAnimationFrame(frameId);frameId=0;}});observer.observe(journey);
 function visibility(){active=!document.hidden&&journey.getBoundingClientRect().bottom>0;if(active){cancelAnimationFrame(frameId);render();}else {cancelAnimationFrame(frameId);frameId=0;}}
 function lost(e){e.preventDefault();canvas.hidden=true;journey.classList.add('static-scene');dispose();}
 function motion(){if(reduced.matches){canvas.hidden=true;journey.classList.add('static-scene');dispose();}}
 function dispose(){disposed=true;removeEventListener('komi-theme',theme);cancelAnimationFrame(frameId);observer.disconnect();removeEventListener('resize',resize);removeEventListener('scroll',schedule);document.removeEventListener('visibilitychange',visibility);reduced.removeEventListener('change',motion);canvas.removeEventListener('webglcontextlost',lost);scene.traverse(o=>{o.geometry?.dispose();if(o.material){for(const m of Array.isArray(o.material)?o.material:[o.material]){m.map?.dispose();m.dispose();}}});renderer.dispose();}
 canvas.addEventListener('webglcontextlost',lost);reduced.addEventListener('change',motion);document.addEventListener('visibilitychange',visibility);addEventListener('resize',resize);resize();render();return dispose;
}
