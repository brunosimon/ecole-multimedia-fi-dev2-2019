import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import textureCakeImageSource from './assets/images/particles/cake.jpg'
import textureCake2ImageSource from './assets/images/particles/cake2.jpg'


/**
 * Scene
 */
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const textureCake = textureLoader.load(textureCakeImageSource)
const texturecake2 = textureLoader.load(textureCake2ImageSource)


/**
 *  Materials
 */
 
const materialCake = new THREE.MeshStandardMaterial({
    map: textureCake
})

const materialCake2 = new THREE.MeshStandardMaterial({
   map: texturecake2
})

/**
 * Base
 */
const Base = new THREE.Mesh(
    new THREE.CylinderBufferGeometry( 2, 3, 3, 15 ),
    materialCake2
    
)
Base.position.y = 0
scene.add( Base );

/**
 * Base2
 */

const Base2 = new THREE.Mesh(
    new THREE.CylinderBufferGeometry( 3, 4, 4, 20 ),
    materialCake
    
)
Base2.position.y = -3
scene.add( Base2 );


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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 14
camera.position.y = 0.2
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)

/**
 * Orbit controls
 */
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.zoomSpeed = 0.3

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffcccc, 0.2)
scene.add(ambientLight)

const sunLight = new THREE.DirectionalLight(0xffcccc, 1)
sunLight.position.x = 10
sunLight.position.y = 0
sunLight.position.z = 0
scene.add(sunLight)



/**
 * Loop
 */
const loop = () =>
{
    window.requestAnimationFrame(loop)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)
}

loop()