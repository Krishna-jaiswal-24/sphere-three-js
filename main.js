import * as THREE from 'three'; //three js
import { Mesh } from 'three';
import './style.css'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap';

const scene =new THREE.Scene();

const geometry = new THREE.SphereGeometry( 3,64,64 );  //its just the shape
const material = new THREE.MeshStandardMaterial( { color: "#00ff83",roughness:0.5 } ); //how it looks like 
const sphere = new THREE.Mesh( geometry, material ); //it combines the geometry and the material to get a final mesh
scene.add( sphere );

//sizes
const sizes={
  width:window.innerWidth,
  height:window.innerHeight
}


//light
const light= new THREE.PointLight(0xffffff,1,100)
light.position.set(0,10,10)
light.intensity=1.25
scene.add(light)



//Camera
const camera = new THREE.PerspectiveCamera( 45 ,sizes.width/sizes.height,0.1,100 );  // parameters are field of view and aspect ratio --the width and height
camera.position.z=20
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
    gsap.to(sphere.material.color,{r:newColor.r, g:newColor.g,b:newColor.b})
  }
})