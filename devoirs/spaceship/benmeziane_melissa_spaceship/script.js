import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
//import {camera} from 'three/build/three.module'
import StarsImageSource from './assets/images/particles/8.png'
import RockImageSource from './assets/images/rock/diffuse-alpha.png'
import particlesImageSource from './assets/images/particles/1.png'

/**
 * GLTFLoader
 */
const dracoLoader = new  DRACOLoader() 
 DRACOLoader.setDecoderPath('/draco/')

 const gltfLoader = new GLTFLoader()
 gltfLoader.setDRACOLoader(DRACOLoader)


/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const StarsTexture = textureLoader.load(StarsImageSource)

const particlesTexture = textureLoader.load(particlesImageSource)
particlesTexture.center.x = 0.5
particlesTexture.center.y = 0.5
particlesTexture.rotation = - Math.PI * 0.5

const RockTexture = textureLoader.load(RockImageSource)


/**
 * Scene
 */
const scene = new THREE.Scene()
/**
 * Sizes
 */
const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight
window.addEventListener('resize', () =>
{
    // Save sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
})
/**
 * Cursor
 */
const cursor = {}
cursor.x = 0
cursor.y = 0
window.addEventListener('mousemove', (_event) =>
{
    cursor.x = _event.clientX / sizes.width - 0.5
    cursor.y = _event.clientY / sizes.height - 0.5
})
/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 10000)
camera.position.z = -30
camera.position.y = -30
camera.position.x = 30
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setClearColor(0x000000, 1)
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
document.body.appendChild(renderer.domElement)
/**
 * Orbit controls
 */
// const controls = new OrbitControls(camera, renderer.domElement)
// controls.enableDamping = true
// controls.zoomSpeed = 0.3
/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
scene.add(ambientLight)
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.x = 5
directionalLight.position.y = 5
directionalLight.position.z = 5
scene.add(directionalLight)

/**
 * Stars
 */

// Geometry

const particlesGeometry = new THREE.Geometry()

for(let i = 0; i < 10000; i++)
{
    const vertice = new THREE.Vector3(
        ((Math.random() - 0.5 ) *  300 ) , 
        ((Math.random() - 0.5 ) * 300 ) , 
        ((Math.random() - 0.5 ) * 300)
    )

    particlesGeometry.vertices.push(vertice)


// color 

const color = new THREE.Color(
    Math.random()  , 
    Math.random() , 
    Math.random() , 
)

particlesGeometry.colors.push(color) 

}

//const particlesGeometry = new THREE.SphereGeometry(3 , 8 , 8)

// Material
const particlesMaterial = new THREE.PointsMaterial({
    vertexColors : true , 
    size: 2,
    sizeAttenuation: true,
    //color: new THREE.Color(0xff0000),
     //map: particleTexture , 
    alphaMap: StarsTexture,
    transparent: true , 
    depthWrite : false , 
    blending: THREE.AdditiveBlending

})

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)


/** 
 * Asteroids
*/

//Material

const AsteriodsMaterial = new THREE.PointsMaterial({
    transparent: true,
    depthWrite: false,
    sizeAttenuation: true,
    map : RockTexture , 
    size : 3
})
const AsteriodsGeometry = new THREE.Geometry()
for(let i = 0; i < 200; i++)

    // Vertice
 {
    const vertice = new THREE.Vector3(
    (Math.random() - 0.5) * 100,
    Math.random() * 25,
    (Math.random() - 0.5) * 100
)

AsteriodsGeometry.vertices.push(vertice)
}

const asteriods = new THREE.Points(AsteriodsGeometry, AsteriodsMaterial)
scene.add(asteriods)



 /**
  * ParticlesCercle
  */

const Particle1Geometry = new THREE.Geometry()

for(let i = 0; i < 50000; i++)
{
    const angle = Math.random() * Math.PI * 2 

    //vertice
    const radius = 8 + Math.random() * 6 
    const x = Math.cos(angle) * radius
    const y = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : - 1) * 0.3
    const z = Math.sin(angle) * radius

    const vertice = new THREE.Vector3(x, y, z)
    Particle1Geometry.vertices.push(vertice)

   // Color
    const color = new THREE.Color(0xffffff)
    if(x < 0 && (z < 5 && z > - 5))
    {
        color.r *= 0.1
        color.g *= 0.1
        color.b *= 0.1
    }


    Particle1Geometry.colors.push(color)

    
}

const Particle1Material = new THREE.PointsMaterial({
    size : 0.1,
    map : particlesTexture , 
    transparent: true,
    vertexColors : true ,
    blending: THREE.AdditiveBlending,
    depthWrite: false

})

const Particles = new THREE.Points(Particle1Geometry, Particle1Material)
scene.add(Particles)




// Load model

/**
 * vaisseau 
 */



const spacecraftGroup = new THREE.Group()
spacecraftGroup.scale.set(0.01, 0.01, 0.01)
scene.add(spacecraftGroup)
gltfLoader.load(
    'models/vaisseau/vaisseau1.gltf',
    (gltf) =>
    {
        console.log('success')
        console.log(gltf)
        while(gltf.scene.children.length)
        {
            spacecraftGroup.add(gltf.scene.children[0])
        }
    },
    undefined,
    (error) =>
    {
        console.log('error')
        console.log(error)
    }
)
// Keyboard
const keyboard ={}
keyboard.up =false
keyboard.down =false
keyboard.right =false
keyboard.left =false
document.addEventListener('keydown', (_event)=>{
    console.log(_event.code)
    switch(_event.code){
        case 'KeyW':
        case 'ArrowUp':
            keyboard.up = true
            break
        case 'KeyD':
        case 'ArrowRight':
            keyboard.right = true
            break
        case 'KeyS':
        case 'ArrowDown':
            keyboard.down = true
            break
        case 'KeyA':
        case 'ArrowLeft':
            keyboard.left = true
            break
    }
})
document.addEventListener('keyup', (_event)=>{
    console.log(_event.code)
    switch(_event.code){
        case 'KeyW':
        case 'ArrowUp':
            keyboard.up = false
            break
        case 'KeyD':
        case 'ArrowRight':
            keyboard.right = false
            break
        case 'KeyS':
        case 'ArrowDown':
            keyboard.down = false
            break
        case 'KeyA':
        case 'ArrowLeft':
            keyboard.left = false
            break 
    }
})
/**
 * Loop
 */
    
const loop = () =>
{
    window.requestAnimationFrame(loop)
    if(keyboard.up){
        spacecraftGroup.position.y +=0.1
        spacecraftGroup.rotation.x -= (0.5 + spacecraftGroup.rotation.x) / 10
    }
    else if(keyboard.right){
        spacecraftGroup.position.x -=0.1
        spacecraftGroup.rotation.z += (0.5 - spacecraftGroup.rotation.z) / 10
    }
    else if(keyboard.down){
        spacecraftGroup.position.y -=0.1
        spacecraftGroup.rotation.x += (0.5 - spacecraftGroup.rotation.x) / 10
    }
    else if(keyboard.left){
        spacecraftGroup.position.x +=0.1
        spacecraftGroup.rotation.z -= (0.5 + spacecraftGroup.rotation.z) / 10
    }else{
        spacecraftGroup.rotation.x =0
        spacecraftGroup.rotation.y =0
    }
    //Update Asteriods
    for(const _vertice of AsteriodsGeometry.vertices)
    {
        _vertice.z -= 0.35
        if(_vertice.z < -30)
        {
            _vertice.z = +40 +(Math.random()*10)
        }
    }
    AsteriodsGeometry.verticesNeedUpdate = true
    
    // Update controls
    //controls.update()


    // Render


    renderer.render(scene, camera)
    console.log(spacecraftGroup.position.x)
    camera.position.x = spacecraftGroup.position.x  - 5
    camera.position.z = spacecraftGroup.position.z - 14
    camera.position.y = spacecraftGroup.position.y +4
    camera.rotation.y = Math.PI 
    camera.rotation.z = (Math.PI) * (-2)
}
loop()