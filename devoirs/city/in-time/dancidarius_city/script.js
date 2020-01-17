import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import roadTextureSource from './assets/img/roadtexture.jpg'
import { Mesh, Wrapping, Color } from 'three'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
import trashTextureSource from './assets/img/trash.jpg'
import buildingTextureSource from './assets/img/building.jpg'
import buildingTextureSource2 from './assets/img/building2jpg.jpg'
import particleImageSource from './assets/img/snow.png'



/**
 * textures
 */


const textureLoader = new THREE.TextureLoader()
const roadTexture = textureLoader.load(roadTextureSource , function ( Rtexture ) {
    roadTexture.wrapT =  THREE.RepeatWrapping,
    Rtexture.repeat.set (1,30)
})
const trashTexture = textureLoader.load(trashTextureSource)
const buildingTexture = textureLoader.load(buildingTextureSource, function (Btexture){
    buildingTexture.wrapT =  THREE.RepeatWrapping,
    Btexture.repeat.set (1,2)
})
const buildingTexture2 = textureLoader.load(buildingTextureSource2, function (Btexture2){
    buildingTexture2.wrapT =  THREE.RepeatWrapping,
    Btexture2.repeat.set (1,2)
})
const particleTexture = textureLoader.load(particleImageSource)
/**
 * scene
 */

 const scene = new THREE.Scene



 /**
  * sizes
  */

  const sizes = {}

    sizes.width = window.innerWidth
    sizes.height = window.innerHeight 

    window.addEventListener('resize', () =>
    {
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight
        renderer.setSize(sizes.width,sizes.height)
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()
    })
  
    /**
     * cursor
     */
    const cursor= {}
    cursor.x = 0
    cursor.y = 0

window.addEventListener('mousemove', (_event) =>
{
    cursor.x = _event.clientX / sizes.width -0.5
    cursor.y = _event.clientY / sizes.height -0.5
})




/**
 * camera
 */

 const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height,0.1,200)
camera.position.z = 9
camera.position.y = 1
scene.add(camera)



/**
 * ville
 */

 const material = new THREE.MeshStandardMaterial({
     roughness : 0.3,
     metalness : 0.3,

 })



 const floor = new THREE.Mesh(
new THREE.PlaneGeometry( 100 , 100 , 1 , 1),
material 

 )

 
 floor.rotation.x = -Math.PI * 0.5
 scene.add(floor)

//buildings
const buildingGeometry = new THREE.BoxGeometry(1,1,1,1,1,1)
buildingGeometry.translate(0,0.5,0)


for ( let i = 0 ; i < 300 ; i++)
{
const building = new THREE.Mesh(
    buildingGeometry,
    new THREE.MeshStandardMaterial({
        map : buildingTexture})
)
building.position.x = (Math.random() -1.1) *43
building.position.z = (Math.random() -0.5) *95
building.scale.x = 1 + Math.random() *5
building.scale.z = 1 + Math.random() *5
building.scale.y = 1 + Math.random() *12
scene.add(building)
}



const buildingGeometry2 = new THREE.BoxGeometry(1,1,1,1,1,1)
buildingGeometry2.translate(0,0.5,0)


for ( let i = 0 ; i < 300 ; i++)
{
const building2 = new THREE.Mesh(
    buildingGeometry2,
    new THREE.MeshStandardMaterial({
        map : buildingTexture2})
)
building2.position.x = (Math.random() +0.1) *43
building2.position.z = (Math.random() -0.5) *95
building2.scale.x = 1 + Math.random() *5
building2.scale.z = 1 + Math.random() *5
building2.scale.y = 1 + Math.random() *12
scene.add(building2)
}


//road
const roadMaterial = new THREE.MeshStandardMaterial({
    map: roadTexture,
    
})


const road =new THREE.Mesh(
new THREE.PlaneGeometry(2,100,1,1),
roadMaterial,

)

road.position.y = 0.01
road.rotation.x = -Math.PI * 0.5
road.position.z = 0

scene.add(road)


//lights


for (let  i= 0 ; i< 8 ; i++){
    const lamp = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04,0.04,5,64),
        new THREE.MeshBasicMaterial({color : 0x000000})
    )
    
    lamp.position.x = -1.2
    lamp.position.z = 1*i*13 -45
    scene.add(lamp)
}

for (let  i= 0 ; i< 8 ; i++){
    const lamp2 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04,0.04,5,64),
        new THREE.MeshBasicMaterial({color : 0x000000})
    )
    
    lamp2.position.x = 1.2
    lamp2.position.z = 1*i*13 -45
    scene.add(lamp2)
}


for (let  i= 0 ; i< 8 ; i++){
const lampLight = new THREE.Mesh(
    new THREE.SphereGeometry(0.3,128,128),
    new THREE.MeshBasicMaterial({color : 0xffffff})
)
lampLight.position.x = 1.2
lampLight.position.z = 1*i*13 -45
lampLight.position.y = 2.5
scene.add(lampLight)
}


for (let  i= 0 ; i< 8 ; i++){
    const lampLight2 = new THREE.Mesh(
        new THREE.SphereGeometry(0.3,128,128),
        new THREE.MeshBasicMaterial({color : 0xffffff})
    )
    lampLight2.position.x = -1.2
    lampLight2.position.z = 1*i*13 -45
    lampLight2.position.y = 2.5
    scene.add(lampLight2)
    }


    for (let  i= 0 ; i< 8 ; i++){
    const pointLight = new THREE.PointLight(0xffffff, 0.02)
    pointLight.position.x = 1.2
    pointLight.position.y = 2.5
    pointLight.position.z = 1*i*13 -45
    scene.add(pointLight)
    }

     for (let  i= 0 ; i< 8 ; i++){
    const pointLight2 = new THREE.PointLight(0xffffff, 0.02)
    pointLight2.position.x = -1.2
    pointLight2.position.y = 2.5
    pointLight2.position.z = 1*i*13 -45
    scene.add(pointLight2)
    }

//trashcan
for (let  i= 0 ; i< 8 ; i++){
const trashcan = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1,0.1,0.9,64),
    new THREE.MeshStandardMaterial({
        map : trashTexture})
)
trashcan.position.x = 1.2
trashcan.position.z = 1*i*13 -45.4
scene.add(trashcan)
    }

/**
 * Particles
 */
// Geometry
const particlesGeometry = new THREE.Geometry()
const particlesGeometry_2 = new THREE.Geometry()
for (let i = 0; i < 100000; i++) {
    // Vertice
    const vertice = new THREE.Vector3(
           Math.random() * 100 - 50,
        (Math.random() - 0.5) * 100,
           Math.random() * 100 - 50
    )
    particlesGeometry_2.vertices.push(vertice)
    // Color
    const color = new THREE.Color(
        1,
        1,
        1
    )
    particlesGeometry_2.colors.push(color)
}
for (let i = 0; i < 500000; i++) {
    // Vertice
    const vertice = new THREE.Vector3(
           Math.random() * 100 - 50,
        (Math.random() - 0.5) * 100,
           Math.random() * 100 - 50
    )
    particlesGeometry.vertices.push(vertice)
    // Color
    const color = new THREE.Color(
        1,
        1,
        1
    )
    particlesGeometry.colors.push(color)
}
// Material
const particlesMaterial = new THREE.PointsMaterial({
    vertexColors: true,
    size: 0.05,
    sizeAttenuation: true,
   
    alphaMap: particleTexture,
    transparent: true,
    depthWrite: false
})
// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
const particles_2 = new THREE.Points(particlesGeometry_2, particlesMaterial)
scene.add(particles_2)
scene.add(particles)
particles.position.y = 15

/*const pointLight = new THREE.PointLight(0xffffff,1, 300)
pointLight.position.x = 100
pointLight.position.y = 100
pointLight.position.z = 50
scene.add(pointLight)*/








 /**
  * renderer
  */

  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(sizes.width,sizes.height)
  document.body.appendChild(renderer.domElement)
  


/**
 * orbitcontrols
 */



renderer.domElement.addEventListener( 'click' , function () {
    controls.lock()
})


const controls = new PointerLockControls( camera, document.body )

	controls.isLocked = true
    

  /**
   * loop
   */

  const loop = () =>
  {
      window.requestAnimationFrame(loop)
  


    
    particles.position.y -= 0.03
    particles_2.position.y -= 0.03
    if (particles_2.position.y < -100) particles_2.position.y = 25
    if (particles.position.y < -100) particles.position.y = 25
      

      renderer.render(scene, camera)
  }
  
  loop()

   