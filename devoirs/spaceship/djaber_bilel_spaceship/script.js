import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import particleImageSource from './assets/images/particles/fire_01.png'
import globeDiffuseImageSource from './planet/globe/diffuse.jpg'
import globeMetalnessImageSource from './planet/globe/metalness.jpg'
import globeNormalImageSource from './planet/globe/normal.jpg'
import globeRoughnessImageSource from './planet/globe/roughness.jpg'
import cloudsAlphaImageSource from './planet/clouds/alpha.jpg'
import rockDiffuseAlphaImageSource from './planet/rock/diffuse-alpha.png'
//import venusImageSource from './planet/venus.jpg'


/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load(particleImageSource)
//const venusColorTexture = textureLoader.load(venusImageSource)
const globeDiffuseTexture = textureLoader.load(globeDiffuseImageSource)
const globeMetalnessTexture = textureLoader.load(globeMetalnessImageSource)
const globeNormalTexture = textureLoader.load(globeNormalImageSource)
const globeRoughnessTexture = textureLoader.load(globeRoughnessImageSource)
const cloudsAlphaTexture = textureLoader.load(cloudsAlphaImageSource)
const rockDiffuseAlphaTexture = textureLoader.load(rockDiffuseAlphaImageSource)
rockDiffuseAlphaTexture.center.x = 0.5
rockDiffuseAlphaTexture.center.y = 0.5
rockDiffuseAlphaTexture.rotation = - Math.PI * 0.5


/**
 * GLTFLoader
 */
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')
const gltfLoader = new GLTFLoader()


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
camera.position.z = 2000
camera.position.y = 0.2
camera.position.x = Math.PI
scene.add(camera)

/**
 * Keyboard
 */
const keyboard = {}
keyboard.up = false
keyboard.right = false
keyboard.down = false
keyboard.left = false

document.addEventListener('keyup', (_event) => {
    console.log(_event.code)
    switch (_event.code) {
        case 'KeyW':
        case 'ArrowUp':
            keyboard.up = false
            break
        case 'KeyD':
        case 'ArrowRight':
            keyboard.left = false
            break
        case 'KeyS':
        case 'ArrowDown':
            keyboard.down = false
            break
        case 'KeyA':
        case 'ArrowLeft':
            keyboard.right = false
            break
    }
})
document.addEventListener('keydown', (_event) => {
    console.log(_event.code)
    switch (_event.code) {
        case 'ArrowUp':
            keyboard.up = true
            break
            case 'ArrowRight':
            keyboard.left = true
            break
            case 'ArrowDown':
            keyboard.down = true
            break
        case 'ArrowLeft':
            keyboard.right = true
            break
    }
})
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setClearColor(0x000000, 1)
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)

// Globe
const globe = new THREE.Mesh(
    new THREE.SphereGeometry(5, 64, 64),
    new THREE.MeshStandardMaterial({
        map: globeDiffuseTexture,
        metalnessMap: globeMetalnessTexture,
        roughnessMap: globeRoughnessTexture,
        normalMap: globeNormalTexture
    })
)
globe.position.z = 50
scene.add(globe)

/* Venus
const venus = new THREE.Mesh(
    new THREE.SphereGeometry(5, 64, 64),
    new THREE.MeshStandardMaterial({
        map: venusDiffuseTexture,
)
venus.position.z = 50
venus.position.x = -50
scene.add(venus)
 

/**
 * Orbit controls
 */
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.zoomSpeed = 0.3

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
 * Model
 */

// Test
/*const test = new THREE.Mesh(
    new THREE.SphereGeometry(5, 32, 32),
    new THREE.MeshStandardMaterial({ wireframe: true })
)
scene.add(test)*/

//vaisseau group
const spaceshipGroup = new THREE.Group()
spaceshipGroup.scale.x=0.01
spaceshipGroup.scale.z=0.01
spaceshipGroup.scale.y=0.01
scene.add(spaceshipGroup)

// Load model
gltfLoader.load(
    'models/duck/vaisseau.gltf',
    (gltf) =>
    {
        console.log('success')
        console.log(gltf)

        while(gltf.scene.children.length)
        {
            spaceshipGroup.add(gltf.scene.children[0])
        }
    },
    undefined,
    (error) =>
    {
        console.log('error')
        console.log(error)
    }
)


/**
 * Particles
 */
// Geometry
const particlesGeometry = new THREE.Geometry()
const galaxyRadius = 10

for(let i = 0; i < 500000; i++)
{
    // Vertice
    const progress = Math.pow(Math.random(), 4)
    const angle = progress * 15
    const distance = progress * galaxyRadius
    let x = Math.sin(angle) * distance
    let y = 0
    let z = Math.cos(angle) * distance

    x += (Math.random() - 0.5) * Math.random() * 5
    y += (Math.random() - 0.5) * Math.random() * 1
    z += (Math.random() - 0.5) * Math.random() * 5

    const vertice = new THREE.Vector3(x, y, z)
    particlesGeometry.vertices.push(vertice)

    // Color
    const innerColor = new THREE.Color(0xffae33)
    const outerColor = new THREE.Color(0x6033ff)
    const color = new THREE.Color()
    color.r = innerColor.r + (outerColor.r - innerColor.r) * progress
    color.g = innerColor.g + (outerColor.g - innerColor.g) * progress
    color.b = innerColor.b + (outerColor.b - innerColor.b) * progress

    particlesGeometry.colors.push(color)
}

// Material
const particlesMaterial = new THREE.PointsMaterial({
    vertexColors: true,
    size: 0.03,
    sizeAttenuation: true,
    // color: new THREE.Color(0xff0000),
    // map: particleTexture
    alphaMap: particleTexture,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
})


/**
 * Loop
 */
const loop = () =>
{
    window.requestAnimationFrame(loop)

    // Update controls
    controls.update()
    /**
     * 
     */
    if (keyboard.up== true) spaceshipGroup.position.y += 2
    if (keyboard.right== true)  spaceshipGroup.position.x += 2
    if (keyboard.down== true)  spaceshipGroup.position.y += -2
    if (keyboard.left== true)  spaceshipGroup.position.x += -2
    if (keyboard.up== true) spaceshipGroup.position.z += -0.2 
    if (keyboard.up== true) spaceshipGroup.position.z += 2
    
    //control camera
    camera.position.x = spaceshipGroup.position.x 
    camera.position.y = spaceshipGroup.position.y + 10
    camera.position.z = spaceshipGroup.position.z -20


    camera.lookAt(spaceshipGroup.position)
    // Render
    renderer.render(scene, camera)
    keyboard
}

loop()