const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

scene.background = new THREE.Color(0x000a29);

function crearPlaneta(radio, color) {
  const geo = new THREE.SphereGeometry(radio, 64, 64);
  const mat = new THREE.MeshBasicMaterial({ color });
  return new THREE.Mesh(geo, mat);
}

const sol = crearPlaneta(1.5, 0xffee2e);
scene.add(sol);

const planetas = [
  {radio:0.3, color:0x9b2c2c, distancia:2.5, vel:0.08, lunas:[]},
  {radio:0.4, color:0xb57f35, distancia:3.3, vel:0.06, lunas:[]},
  {radio:0.45, color:0x008a55, distancia:4.2, vel:0.05, lunas:[{radio:0.15, color:0xb3b4b3, distancia:0.8, vel:0.07}]},
  {radio:0.35, color:0xc0392b, distancia:5.0, vel:0.045, 
    lunas:[{radio:0.1, color:0x888888, distancia:0.6, vel:0.08}, {radio:0.08, color:0xaaaaaa, distancia:0.9, vel:0.06}]},
  {radio:0.8, color:0xaa7745, distancia:6.0, vel:0.035,
    lunas:[{radio:0.12, color:0xffffff, distancia:1.0, vel:0.05}, {radio:0.15, color:0xcccccc, distancia:1.4, vel:0.04}, {radio:0.1, color:0xaaaaaa, distancia:1.8, vel:0.06 }]},
  {radio:0.7, color:0xcc9966, distancia:7.0, vel:0.03,
    lunas:[{radio:0.15, color:0xdddddd, distancia:1.0, vel:0.05}, {radio:0.1, color:0x999999, distancia:1.5, vel:0.04}]},
  {radio:0.5, color:0x33ccff, distancia:7.8, vel:0.025, lunas:[{radio:0.1, color:0xbbbbbb, distancia:0.9, vel:0.045}]},
  {radio:0.45, color:0x3333cc, distancia:8.5, vel:0.02, lunas:[{radio:0.12, color:0xaaaaaa, distancia:1.0, vel:0.035}]},
];

planetas.forEach(p =>{
  p.malla= crearPlaneta(p.radio, p.color);
  p.angulo= Math.random()*Math.PI*2;
  p.lunas.forEach(l =>{
    l.malla= crearPlaneta(l.radio, l.color);
    l.angulo= Math.random()*Math.PI*2;});
  scene.add(p.malla);
});

camera.position.z = 18;
let t = 0;

function animate() {
  sol.position.set(0, 0, 0);
  planetas.forEach(p => {
    p.angulo += p.vel*0.5;
    const px= p.distancia*Math.cos(p.angulo);
    const py= p.distancia*Math.sin(p.angulo);
    p.malla.position.set(px, py, 0);

    p.lunas.forEach(l => {
      l.angulo += l.vel * 0.5;
      const lx= px+l.distancia*Math.cos(l.angulo);
      const ly= py+l.distancia*Math.sin(l.angulo);
      l.malla.position.set(lx, ly, 0);
      scene.add(l.malla);
    });
  });

  t += 0.1;
  renderer.render(scene, camera);
}
