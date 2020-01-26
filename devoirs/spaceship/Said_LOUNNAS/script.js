import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import particleImageSource from './assets/images/particles/star_07.png'
import StarrImageSource from './assets/images/particles/circle_02.png'

/**
 * GLTFLoader
 */
 
DRACOLoader.setDecoderPath('/draco/')
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(DRACOLoader)

/**
 * Textures
 */

 const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load(particleImageSource)
const StarsTexture = textureLoader.load(StarrImageSource)

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
 * Particles
 */

 // Geometry

const particlesGeometry = new THREE.Geometry()
for(let i = 0; i < 1000; i++)
{
    // Vertice
    const vertice = new THREE.Vector3(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
    )
    particlesGeometry.vertices.push(vertice)

    // Color
  const color = new THREE.Color(
    Math.random(),
    Math.random(), 
    Math.random()
    )
    particlesGeometry.colors.push(color)
}
 
  // Material
  
const particlesMaterial = new THREE.PointsMaterial({
    vertexColors : true,
    size: 1,
    sizeAttenuation: true,
    alphaMap: particleTexture,
    transparent: true,
    depthWrite : false,
    blending : THREE.AdditiveBlending
})
  
   // Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)
  
  // Load model
const shipgroup = new THREE.Group()
shipgroup.scale.set(0.01, 0.01, 0.01)
scene.add(shipgroup)
gltfLoader.load(
    'models/duck/gltf/vaisseau_principal.gltf',
    (gltf) =>
    {
        console.log('success')
        console.log(gltf)
        while(gltf.scene.children.length)
        {
            shipgroup.add(gltf.scene.children[0])
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
 * sounds
 */
   // create an AudioListener and add it to the camera
let listener = new THREE.AudioListener()
scene.add(listener)
  
   // load a sound 
let audioLoader = new THREE.AudioLoader()
audioLoader.load( './audio/Musique sans parole Rap  Rnb  Hip Hop.ogg',
function( buffer ) {
	sound.setBuffer( buffer )
	sound.setLoop( true)
	sound.setVolume( 10 )
	sound.play()
});
/**
 * Loop
 */
    
const loop = () =>
{
    window.requestAnimationFrame(loop)
    if(keyboard.up){
        shipgroup.position.y +=0.1
        shipgroup.rotation.x -= (0.5 + shipgroup.rotation.x) / 10
    }
    else if(keyboard.right){
        shipgroup.position.x -=0.1
        shipgroup.rotation.z += (0.5 - shipgroup.rotation.z) / 10
    }
    else if(keyboard.down){
        shipgroup.position.y -=0.1
        shipgroup.rotation.x += (0.5 - shipgroup.rotation.x) / 10
    }
    else if(keyboard.left){
        shipgroup.position.x +=0.1
        shipgroup.rotation.z -= (0.5 + shipgroup.rotation.z) / 10
    }else{
        shipgroup.rotation.x =0
        shipgroup.rotation.y =0
    }
    //Update star
    for(const _vertice of particlesGeometry.vertices)
    {
        _vertice.z -= 0.90
        if(_vertice.z < -30)
        {
            _vertice.z = +40 +(Math.random()*10)
        }
    }
    particlesGeometry.verticesNeedUpdate = true

    // Render
    renderer.render(scene, camera)
    console.log(shipgroup.position.x)
    camera.position.x = shipgroup.position.x
    camera.position.z = shipgroup.position.z -12
    camera.position.y = shipgroup.position.y +2
    camera.rotation.y = Math.PI
    camera.position.z = (Math.PI) * -5
}
loop()