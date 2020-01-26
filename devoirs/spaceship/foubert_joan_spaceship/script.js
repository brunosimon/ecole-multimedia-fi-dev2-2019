import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import rockDiffuseAlphaImageSource from './assets/images/planet/rock/diffuse-alpha.png'
import ParticulesImageSource from './assets/images/particul/circle_05.png' 
import globeDiffuseImageSource from './assets/images/planet/globe/diffuse.jpg'
import globeMetalnessImageSource from './assets/images/planet/globe/metalness.jpg'
import globeNormalImageSource from './assets/images/planet/globe/normal.jpg'
import globeRoughnessImageSource from './assets/images/planet/globe/roughness.jpg'
import cloudsAlphaImageSource from './assets/images/planet/clouds/alpha.jpg'


/**
 * GLTFLOADER
 */
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco/')

    const gltfLoader = new GLTFLoader()
    gltfLoader.setDRACOLoader(dracoLoader)


/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const globeDiffuseTexture = textureLoader.load(globeDiffuseImageSource)
const globeMetalnessTexture = textureLoader.load(globeMetalnessImageSource)
const globeNormalTexture = textureLoader.load(globeNormalImageSource)
const globeRoughnessTexture = textureLoader.load(globeRoughnessImageSource)
const cloudsAlphaTexture = textureLoader.load(cloudsAlphaImageSource)
const rockDiffuseAlphaTexture = textureLoader.load(rockDiffuseAlphaImageSource)
rockDiffuseAlphaTexture.center.x = 0.5 
rockDiffuseAlphaTexture.center.y = 0.5
rockDiffuseAlphaTexture.center.z = - Math.PI * 0.5
const particlesTexture = textureLoader.load(ParticulesImageSource)

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
camera.position.z = 0.005
camera.position.x = 2
camera.position.y = 0.001

camera.lookAt(new THREE.Vector3())
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setClearColor(0x000000, 1)
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);
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
// Load modle

const spaceshipGroup = new THREE.Group()
    spaceshipGroup.scale.set(0.02,0.02,0.02);
    scene.add(spaceshipGroup);

gltfLoader.load(


    'models/vaiseau/Uwing.glb',
    (gltf) => 
    {
        console.log('success')
        console.log(gltf)

        while(gltf.scene.children.length){
            const child = gltf.scene.children[0]
            child.scale.set(0.5, 0.5, 0.5)
            spaceshipGroup.add(child)
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
 * Movement Keyboard
 */
const keyboard = {}
keyboard.up = false
keyboard.down = false
keyboard.left = false
keyboard.right = false
keyboard.restard = false

document.addEventListener('keydown', (_event) =>{
    console.log(_event.code)
     switch(_event.code){
         case 'keyQ':
         case 'ArrowUp':
                    keyboard.up = true;
                    break;
        case 'keyD':
        case 'ArrowRight':
                   keyboard.right = true;
                   break;
        case 'keyS':
        case 'ArrowDown':
                    keyboard.down = true;
                    break;
        case 'keyA':
        case 'ArrowLeft':
                    keyboard.left = true;
                    break;
        case 'KeyR': 
                    keyboard.restart = true;
                    break;
     }
})
document.addEventListener('keyup', (_event) =>{
    console.log(_event.code)
     switch(_event.code){
         case 'keyQ':
         case 'ArrowUp':
                    console.log('up')
                    keyboard.up = false;
                    break;
        case 'keyD':
        case 'ArrowRight':
                   console.log('right')
                   keyboard.right = false;
                   break;
        case 'keyS':
        case 'ArrowDown':
                    console.log('donw')
                    keyboard.down = false;
                    break;
        case 'keyA':
        case 'ArrowLeft':
                    console.log('left')
                    keyboard.left = false;
                    break;
        case 'KeyR':
                    keyboard.restart = false;
                    break;
     }
     console.log(_event.code)
})

/**
 * Particules
 */
const particlesGeometry = new THREE.Geometry(3, 0.5, 64, 8)
for (let i = 0; i < 5000; i++) {
    // vertice
    const x = (Math.random() -0.5) * 500
    const y = (Math.random() -0.5) * 30
    const z = (Math.random() -0.5) * 50

    const particlesVertice = new THREE.Vector3(x, y, z)
    particlesGeometry.vertices.push(particlesVertice)

    // Color
    const color = new THREE.Color(0xffffff)
    particlesGeometry.colors.push(color)
}
const particlesMaterial = new THREE.PointsMaterial({
    vertexColors: true,
    size: 0.4,
    alphaMap: particlesTexture,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
})

let particles = new THREE.Points(particlesGeometry, particlesMaterial)

scene.add(particles)
/**
 * asteroid
 */
const asteroidsGeometry = new THREE.Geometry(3, 0.5, 64, 8)
for (let i = 0; i < 70; i++) {
    // Vertice
    
    const x = (Math.random() -0.5) * 450
    const y = (Math.random() -0.5) * 30
    const z = (Math.random() -0.5) * 50

    const asteroidsVertice = new THREE.Vector3(x, y, z)
    asteroidsGeometry.vertices.push(asteroidsVertice)

    //Color
    const color = new THREE.Color(0xffffff)
    if(x < 0 && (z < 5 && z > -5)){
        // color.r *= 0.1
        // color.g *= 0.1
        // color.b *= 0.1
    }else{
        const randomDim = Math.random() * 0.5
        color.r -= randomDim 
        color.g -= randomDim 
        color.b -= randomDim 
    }
    asteroidsGeometry.colors.push(color)
    
}

const asteroidsMaterial = new THREE.PointsMaterial({
    size: 2,
    map: rockDiffuseAlphaTexture,
    transparent: true,
    vertexColors: true
})

const asteroids = new THREE.Points(asteroidsGeometry, asteroidsMaterial)
scene.add(asteroids)
/**
 * speed movement
 */
let speed = -0.1;
let up = +0.1;
let down = +0.1;
let left = +0.1;
let right = +0.1;
/**
 * Loop
 */
const loop = () =>
{
    window.requestAnimationFrame(loop)
    // Updates controls
    if(keyboard.up){
        spaceshipGroup.position.y += up;
        spaceshipGroup.rotation.z -= up
    }
    if(keyboard.right){
        spaceshipGroup.position.z -= right;
        spaceshipGroup.rotation.x -= right;
    }
    if(keyboard.down){
        spaceshipGroup.position.y -= down;
        spaceshipGroup.rotation.z += down;
    }
    if(keyboard.left){
        spaceshipGroup.position.z += left;
        spaceshipGroup.rotation.x += left;
    }

    // rotation system
    if(keyboard.left == false && spaceshipGroup.rotation.x > 0){
        spaceshipGroup.rotation.x -= 0.01;
     }
    if(keyboard.right == false && spaceshipGroup.rotation.x < 0){
        spaceshipGroup.rotation.x += 0.01;
    }
    if(keyboard.up == false && spaceshipGroup.rotation.z < 0){
         spaceshipGroup.rotation.z += 0.01;
    }
    if(keyboard.down == false && spaceshipGroup.rotation.z > 0){
         spaceshipGroup.rotation.z -= 0.01;
     }
    // stop rotation
    if(spaceshipGroup.rotation.x > 0.4)
    {
        spaceshipGroup.rotation.x = 0.4;
    }
    if(spaceshipGroup.rotation.x < -0.4)
    {
       spaceshipGroup.rotation.x = -0.4
    }
    if(spaceshipGroup.rotation.z > 0.3){
        spaceshipGroup.rotation.z = 0.3;
    }
    if(spaceshipGroup.rotation.z < -0.3){
        spaceshipGroup.rotation.z = -0.3;
    }
    if(keyboard.restart){
        spaceshipGroup.position.x = +150;
    }
    spaceshipGroup.position.x += speed
    if(spaceshipGroup.position.x < -150){
        spaceshipGroup.position.x = +150;
        asteroids.position.x = (Math.random() -0.5) * 450;
        asteroids.position.y = (Math.random() -0.5) * 30;
        asteroids.position.z = (Math.random() -0.5) * 50
    }
    //  camera = spaceship
    camera.position.x = spaceshipGroup.position.x + 0.2;
    camera.position.z = spaceshipGroup.position.z - 0.4 ;
    camera.position.y = spaceshipGroup.position.y + 0.3;

    //  asteroids
    for(const asteroidsVertice of asteroidsGeometry.vertices)
    {
        // movement asteroids
        asteroidsVertice.y += Math.sin(Date.now() * 0.00001 + asteroidsVertice.x * 1000) * 0.01;
        // colition
        const distance = asteroidsVertice.distanceTo(spaceshipGroup.position);
        if(distance < 1.5){
            speed = 0;
            up = 0;
            right = 0;
            left = 0;
            down = 0;
            alert('colision')
        }
    }
    asteroidsGeometry.verticesNeedUpdate = true;

    for(const particlesVertice of particlesGeometry.vertices){
        // movement particles
        particlesVertice.x += Math.sin(Date.now() * 0.001 + particlesVertice.y * 1000) * 0.01;
    }
    particlesGeometry.verticesNeedUpdate = true

    // Render
    renderer.render(scene, camera);
}

loop()