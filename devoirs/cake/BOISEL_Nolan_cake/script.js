import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { DoubleSide } from 'three'
import assietteText from './textures/images/assiette.jpg'
import gateauSideText from './textures/images/gateauSide.jpg'
import gateauTopText from './textures/images/gateautop.jpg'
import candleText from './textures/images/candle.jpg'
import fireText from './textures/images/fire1.png'

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const assietteTexture = textureLoader.load(assietteText)
const gateauSideTexture = textureLoader.load(gateauSideText)
gateauSideTexture.wrapS = THREE.RepeatWrapping
gateauSideTexture.wrapT = THREE.RepeatWrapping
gateauSideTexture.repeat.x = 10
gateauSideTexture.repeat.y = 1
const gateauTopTexture = textureLoader.load(gateauTopText)
const candleTexture = textureLoader.load(candleText)
const fireTexture = textureLoader.load(fireText)

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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.z = 30
camera.position.y = 30
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

 const ambientLight = new THREE.AmbientLight(0xffcccc, 0.5)
 scene.add(ambientLight)

/**
 * Objets
 */

// Material

// Mesh

const particleGeometry = new THREE.Geometry()
for(let i = 0; i < 30; i++){

    const candles = new THREE.Mesh(
        new THREE.CylinderGeometry(1,1,8,30),
        new THREE.MeshStandardMaterial({
            map: candleTexture
        })
    )
    candles.position.y = 14
    candles.position.z = (Math.random() - 0.5) * 42
    candles.position.x = (Math.random() - 0.5) * 42
    scene.add(candles)
    
    const vertice = new THREE.Vector3(
        candles.position.x,
        candles.position.y + 5,
        candles.position.z
    )

    particleGeometry.vertices.push(vertice)
}
const particles = new THREE.Points(
    particleGeometry,
    new THREE.PointsMaterial({
        size: 2,
        map: fireTexture,
        transparent: true,
        depthWrite: false,
        sizeAttenuation: true
    })
)

scene.add(particles)

const assiette = new THREE.Mesh(
    new THREE.PlaneGeometry(100,100, 1, 1),
    new THREE.MeshStandardMaterial({
        map: assietteTexture,
        side: DoubleSide
    })
)
assiette.rotation.x = Math.PI * 0.5
scene.add(assiette)

const cakeMaterial = [
    new THREE.MeshStandardMaterial({map: gateauSideTexture}),
    new THREE.MeshStandardMaterial({map: gateauTopTexture})
]
const gateau = new THREE.Mesh(
    new THREE.CylinderGeometry(30,30,10,60),
    cakeMaterial
)
scene.add(gateau)
gateau.position.y = 5

/**
 * Loop
 */

const loop = () =>
{
    window.requestAnimationFrame(loop)
    
    // Update object
    
    for ( let i = 0; i < particleGeometry.vertices.length; i++){
        particleGeometry.vertices[i].y = (Math.sin(Date.now() *0.005) + 20)
    }
    particleGeometry.verticesNeedUpdate = true

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)
}

loop()