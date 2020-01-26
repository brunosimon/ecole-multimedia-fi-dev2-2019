import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import spaceImageSource from './textures/space2.jpg'
import asteroidImageSource from './textures/rock.png'
import starsImageSource from './textures/8.png'

/**
 * GLTFLoader
 */
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const spaceTexture = textureLoader.load(spaceImageSource)
const asteroidTexture = textureLoader.load(asteroidImageSource)
const starsTexture = textureLoader.load(starsImageSource)

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

window.addEventListener('resize', () => {
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

window.addEventListener('mousemove', (_event) => {
    cursor.x = _event.clientX / sizes.width - 0.5
    cursor.y = _event.clientY / sizes.height - 0.5
})

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 10000)
camera.position.z = -35
camera.rotation.x = Math.PI
scene.add(camera)

/**
 * Keyboard
 */

const keyboard = {}

keyboard.up = false
keyboard.right = false
keyboard.down = false
keyboard.left = false
keyboard.forward = false
keyboard.retreat = false

document.addEventListener('keyup', (_event) => {
    console.log(_event.code)
    switch (_event.code) {
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

        case 'KeyQ':
            keyboard.forward = false
            break

        case 'KeyZ':
            keyboard.retreat = false
            break

    }

})

document.addEventListener('keydown', (_event) => {
    console.log(_event.code)
    switch (_event.code) {
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

        case 'KeyQ':
            keyboard.forward = true
            break

        case 'KeyZ':
            keyboard.retreat = true
            break

    }

})

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setClearColor(0x000000, 1)
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
document.body.appendChild(renderer.domElement)

/**
 * Effect composer
 */
const effectComposer = new EffectComposer(renderer)

const renderPass = new RenderPass(scene, camera)
effectComposer.addPass(renderPass)

const unrealBloomPass = new UnrealBloomPass(new THREE.Vector2(sizes.width, sizes.height))
unrealBloomPass.strength = 0.4
unrealBloomPass.radius = 0.5
unrealBloomPass.threshold = 0.005
effectComposer.addPass(unrealBloomPass)

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

const test = new THREE.Mesh(
    new THREE.SphereBufferGeometry(50, 32, 32),
    new THREE.MeshBasicMaterial({ map: spaceTexture, side: THREE.BackSide })
)
scene.add(test)

// Load model

const spaceshipGroup = new THREE.Group()
spaceshipGroup.scale.set(0.02, 0.02, 0.02)
scene.add(spaceshipGroup)

gltfLoader.load(
    'models/ship.gltf',
    (gltf) => {

        while (gltf.scene.children.length) {
            spaceshipGroup.add(gltf.scene.children[0])
        }
    },
    undefined,
    (error) => {
        console.log('error')
        console.log(error)
    }
)

/**
 * Asteroid
 */

// Geometry
const asteroidGeometry = new THREE.Geometry()

for (let i = 0; i < 70; i++) {
    const vertice = new THREE.Vector3(
        (Math.random() - 0.5) * 100,
        Math.random() * 20,
        (Math.random() - 0.5) * 100
    )
    asteroidGeometry.vertices.push(vertice)
}

// Material
const asteroidMaterial = new THREE.PointsMaterial({
    size: 2.5,
    alphaMap: asteroidTexture,
    transparent: true,
    depthWrite: false
})

// Points
const asteroid = new THREE.Points(asteroidGeometry, asteroidMaterial)
asteroid.position.z = -25
asteroid.rotation.x += -250
scene.add(asteroid)

/**
 * Stars
 */

const starsGeometry = new THREE.Geometry()

for (let i = 0; i < 1000; i++) {
    const vertice = new THREE.Vector3(
        (Math.random() - 0.5) * 100,
        Math.random() * 20,
        (Math.random() - 0.5) * 100
    )
    starsGeometry.vertices.push(vertice)
}

// Material
const starsMaterial = new THREE.PointsMaterial({
    size: 0.5,
    alphaMap: starsTexture,
    transparent: true,
    depthWrite: false
})

// Points
const stars = new THREE.Points(starsGeometry, starsMaterial)
stars.position.z = -25
stars.rotation.x += -250
scene.add(stars)


/**
 * Loop
 */
const loop = () => {
    window.requestAnimationFrame(loop)

    // Update asteroid
    for (const _vertice of asteroidGeometry.vertices) {
        _vertice.y -= 0.1

        if (_vertice.y < 0) {
            _vertice.y = 20
        }
    }
    asteroidGeometry.verticesNeedUpdate = true

    //Update Stars
    for (const _vertice of starsGeometry.vertices) {
        _vertice.y -= 0.5

        if (_vertice.y < 0) {
            _vertice.y = 20
        }
    }
    starsGeometry.verticesNeedUpdate = true

    //Keyboard
    if (keyboard.up) {
        spaceshipGroup.position.y -= 0.5

    }

    if (keyboard.right) {
        spaceshipGroup.position.x += 0.5

    }

    if (keyboard.down) {
        spaceshipGroup.position.y += 0.5

    }
    if (keyboard.left) {
        spaceshipGroup.position.x -= 0.5

    }
    if (keyboard.forward) {
        spaceshipGroup.position.z += 0.5
    }
    if (keyboard.retreat) {
        spaceshipGroup.position.z -= 0.5
    }

    // Render
    effectComposer.render(scene, camera)
}

loop()