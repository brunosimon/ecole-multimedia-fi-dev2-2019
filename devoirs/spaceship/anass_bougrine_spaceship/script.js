import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import globeDiffuseImageSource from './assets/images/globe/diffuse.jpg'
import globeMetalnessImageSource from './assets/images/globe/metalness.jpg'
import globeNormalImageSource from './assets/images/globe/normal.jpg'
import SunNormalImageSource from './assets/images/globe/sunn.jpg'
import marsNormalImageSource from './assets/images/globe/mars.jpg'
import jeputerNormalImageSource from './assets/images/globe/jeputer.jpg'
import saturneNormalImageSource from './assets/images/globe/saturne.jpg'
import globeRoughnessImageSource from './assets/images/globe/roughness.jpg'
import asteroidsnormalImageSource from './assets/images/particles/8.png'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'




/**
 * Textures
 */
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)
const textureLoader = new THREE.TextureLoader()
const globeSunDiffuseTexture = textureLoader.load(SunNormalImageSource)
const globesaturneDiffuseTexture = textureLoader.load(saturneNormalImageSource)
const globemarsDiffuseTexture = textureLoader.load(marsNormalImageSource)
const globejeputerDiffuseTexture = textureLoader.load(jeputerNormalImageSource)
const asteroidsnormalImage = textureLoader.load(asteroidsnormalImageSource)
const globeDiffuseTexture = textureLoader.load(globeDiffuseImageSource)
const globeMetalnessTexture = textureLoader.load(globeMetalnessImageSource)
const globeNormalTexture = textureLoader.load(globeNormalImageSource)
const globeRoughnessTexture = textureLoader.load(globeRoughnessImageSource)


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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 300)
scene.add(camera)

/**
 * Renderer
 */


const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)
renderer.setClearColor(0x09090f , 1)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffcccc, 0.2)
scene.add(ambientLight)

const sunLight = new THREE.PointLight(0xffcccc, 1)
sunLight.position.x = 0
sunLight.position.y = 0
sunLight.position.z = 0
scene.add(sunLight)

/**
 * poste procing effect
 */



// Globes
{
const globe = new THREE.Mesh(
    new THREE.SphereBufferGeometry(10, 64, 64),
    new THREE.MeshBasicMaterial({
        map: globeSunDiffuseTexture,
    })
)
scene.add(globe)
}
{
    const globe = new THREE.Mesh(
        new THREE.SphereBufferGeometry(4, 64, 64),
        new THREE.MeshStandardMaterial({
            map: globeDiffuseTexture,
            metalnessMap: globeMetalnessTexture,
            roughnessMap: globeRoughnessTexture,
            normalMap: globeNormalTexture
        })
    )
    globe.position.x =-20
    globe.position.y =0
    globe.position.z =20
    scene.add(globe)
}
{
    const globe = new THREE.Mesh(
        new THREE.SphereBufferGeometry(9, 64, 64),
        new THREE.MeshStandardMaterial({
            map: globemarsDiffuseTexture,
        })
    )
    globe.position.x =-50
    globe.position.y =0
    globe.position.z =-15
    scene.add(globe)
}
{
    const globe = new THREE.Mesh(
        new THREE.SphereBufferGeometry(5, 64, 64),
        new THREE.MeshStandardMaterial({
            map: globejeputerDiffuseTexture,
        })
    )
    globe.position.x =40
    globe.position.y =0
    globe.position.z =10
    scene.add(globe)
}
{
    const globe = new THREE.Mesh(
        new THREE.SphereBufferGeometry(7, 64, 64),
        new THREE.MeshStandardMaterial({
            map: globesaturneDiffuseTexture,
        })
    )
    globe.position.x =-45
    globe.position.y =0
    globe.position.z =-120
    scene.add(globe)
}

//Asteroids
const asteroidsGeometry = new THREE.Geometry()


for(let i = 0; i < 2000; i++)
{
    const angle = Math.random() * Math.PI *2

    // Vertice
    const radius = 15 + Math.random() * 300
    const x = Math.cos(angle) * radius
    const y = Math.pow(Math.random(), 2) * (Math.random() < 0.5 ? 1 : - 1) * 100
    const z = Math.sin(angle) * radius

    const vertice = new THREE.Vector3(x, y, z)
    asteroidsGeometry.vertices.push(vertice)

    // Color
    const color = new THREE.Color(0xffffff)
    asteroidsGeometry.colors.push(color)
}

const asteroidsMaterial = new THREE.PointsMaterial({
    size: 0.9,
    transparent: true,
    vertexColors: true,
    alphaMap: asteroidsnormalImage
})

const asteroids = new THREE.Points(asteroidsGeometry, asteroidsMaterial)
scene.add(asteroids)

/**
 * Loop
 */
const loop = () =>
{
    window.requestAnimationFrame(loop)

    // Render
    renderer.render(scene, camera)
    // effectComposer.render(scene, camera)


    //eventskeys
    if (keyboard.z == true) spaceshipGroup.position.y += -0.1
    if (keyboard.s == true) spaceshipGroup.position.y += 0.1
    if (keyboard.up == true) spaceshipGroup.position.z += -0.1
    if (keyboard.down == true) spaceshipGroup.position.z += 0.1
    if (keyboard.right == true) spaceshipGroup.position.x += 0.1
    if (keyboard.left == true) spaceshipGroup.position.x += -0.1
    if (keyboard.left == true) spaceshipGroup.rotation.z += 0.005
    if (keyboard.right == true) spaceshipGroup.rotation.z += -0.005

    //camera
    camera.position.z = spaceshipGroup.position.z + 10
    camera.position.y = spaceshipGroup.position.y +10 - 10
    camera.position.x = spaceshipGroup.position.x +10 - 10 

    //globe events
    const angle = 0
    const radius = 50
    let x = Math.sin(angle) * radius
    let z = Math.cos(angle) * radius
}
/**
 * Spaceship
 */
const spaceshipGroup = new THREE.Group()
spaceshipGroup.scale.set(0.005, 0.005, 0.005)
spaceshipGroup.position.x =0
spaceshipGroup.position.y =0
spaceshipGroup.position.z =40

gltfLoader.load(
    'vesseau/spaceship.gltf',
    (gltf) =>
    {
        //console.log(gltf)
        while(gltf.scene.children.length)
        {
            const child = gltf.scene.children[0]
            spaceshipGroup.add(child)
        }
    },
    undefined,
    (error)=>{
    console.log("error")
    console.log(error)
},
scene.add(spaceshipGroup)
/**
 * keyevents
 */
)
const keyboard = {}
keyboard.z = false
keyboard.s = false
keyboard.up = false
keyboard.right = false
keyboard.down = false
keyboard.left = false
document.addEventListener('keydown', (_event) =>
{
    switch(_event.code) {
        case 'KeyW':
            keyboard.z = true
            break;
    
        case 'KeyS':
            keyboard.s = true
            break;

        case 'ArrowUp':
            keyboard.up = true
            break;
    
        case 'ArrowRight':
            keyboard.right = true
            break; 

        case 'ArrowDown':
            keyboard.down = true
            break;

        case 'ArrowLeft':
            keyboard.left = true
    }
})
document.addEventListener('keyup', (_event) =>
{
    switch(_event.code)
    {
        case 'KeyW':
        keyboard.z = false
        break;

    
        case 'KeyS':
        keyboard.s = false
        break; 

        case 'ArrowUp':
            keyboard.up = false
        break;

        case 'ArrowRight':
            keyboard.right = false
         break;
        case 'ArrowDown':
            keyboard.down = false
        break;

        case 'ArrowLeft':
            keyboard.left = false
    }
})

loop()