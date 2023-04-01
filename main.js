import * as THREE from 'three'; //three js
import { Mesh } from 'three';
import './style.css'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap';
const scene =new THREE.Scene();

// const Geometry = new THREE.TorusGeometry( 5, 2, 27, 100 );
// const Material = new THREE.MeshBasicMaterial( { color: '00ff83',roughness:0.5 } );
// const torus = new THREE.Mesh( Geometry, Material );
// scene.add( torus );
const verticesOfCube = [
  -2,-2,-2,    2,-2,-2,    2, 2,-2,    -2, 2,-2,
  -2,-2, 2,    2,-2, 2,    2, 2, 2,    -2, 2, 2,
];

const indicesOfFaces = [
  2,1,0,    0,3,2,
  0,4,7,    7,3,0,
  0,1,5,    5,4,0,
  1,2,6,    6,5,1,
  2,3,7,    7,6,2,
  4,5,6,    6,7,4
];

const geometry = new THREE.PolyhedronGeometry( verticesOfCube, indicesOfFaces, 6,3 );

// const geometry = new THREE.SphereGeometry( 3,64,64 );  //its just the shape
const material = new THREE.MeshStandardMaterial( { color: "#fff",roughness:0 ,wireframe: true } ); //how it looks like 
const polyhedron = new THREE.Mesh( geometry, material ); //it combines the geometry and the material to get a final mesh
scene.add( polyhedron );

//sizes
const sizes={
  width:window.innerWidth,
  height:window.innerHeight
}



//light
const light= new THREE.PointLight(0xffffff,1,100)
light.position.set(20,20,20)
light.intensity=5
scene.add(light)
// const light2=new THREE.PointLight(0xffffff,1,100)
// light2.position.set(-20,-20,-20)
// light2.intensity=5
// scene.add(light2)

//Camera
const camera = new THREE.PerspectiveCamera( 45 ,sizes.width/sizes.height,0.1,100 );  // parameters are field of view and aspect ratio --the width and height
camera.position.z=30
scene.add( camera );

//renderer
const canvas= document.querySelector('.webgl');
const renderer= new THREE.WebGLRenderer({canvas});
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene,camera)

//controls
const controls=new OrbitControls(camera,canvas)
controls.enableDamping=true
controls.enablePan=false
controls.enableZoom=false

controls.autoRotate=true
controls.autoRotateSpeed=10



//resize
window.addEventListener('resize',()=>{

  //update sizes
  sizes.width=window.innerWidth
  sizes.height=window.innerHeight

  //update camera
  
  camera.aspect=sizes.width/sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width,sizes.height)
})

const loop =()=>{
  controls.update()
  renderer.render(scene,camera)
  window.requestAnimationFrame(loop)
}
loop()

const t1= gsap.timeline({
  defaults:{duration:1}
})

t1.fromTo(sphere.scale,{z:0,y:0,x:0},{z:1,y:1,x:1})
t1.fromTo('nav',{y:"-100%"},{y:"0%"})
t1.fromTo('.title',{opacity:0},{opacity:1})

let mouseDown=false
let rgb=[]
window.addEventListener("mousedown",()=>(mouseDown=true))
window.addEventListener("mouseup",()=>(mouseDown=false))

window.addEventListener('mousemove',(e)=>{
  if(mouseDown){
    rgb=[
      Math.round((e.pageX/sizes.width)*255),
      Math.round((e.pageY/sizes.height)*255),
      150,
    ]
    let newColor= new THREE.Color(`rgb(${rgb.join(",")})`)
    gsap.to(polyhedron.material.color,{r:newColor.r, g:newColor.g,b:newColor.b})
  }
})