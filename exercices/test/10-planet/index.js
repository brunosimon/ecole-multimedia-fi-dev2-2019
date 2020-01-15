import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import cloudsAlphaImageSource from './assets/images/clouds/alpha.jpg'
import globeDiffuseImageSource from './assets/images/globe/diffuse.jpg'
import globeNormalImageSource from './assets/images/globe/normal.jpg'
import globeMetalnessImageSource from './assets/images/globe/metalness.jpg'
import globeRoughnessImageSource from './assets/images/globe/roughness.jpg'
import rockDiffuseAlphaImageSource from './assets/images/rock/diffuse-alpha.png'

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const cloudsAlphaTexture = textureLoader.load(cloudsAlphaImageSource)
const globeDiffuseTexture = textureLoader.load(globeDiffuseImageSource)
const globeNormalTexture = textureLoader.load(globeNormalImageSource)
const globeMetalnessTexture = textureLoader.load(globeMetalnessImageSource)
const globeRoughnessTexture = textureLoader.load(globeRoughnessImageSource)
const rockDiffuseAlphaTexture = textureLoader.load(rockDiffuseAlphaImageSource)
rockDiffuseAlphaTexture.center.set(0.5, 0.5)
rockDiffuseAlphaTexture.rotation = - Math.PI * 0.5

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

/**
 * Resize
 */
window.addEventListener('resize', () =>
{
    // Update sizes object
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
})

/**
 * Cursor
 */
const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (_event) =>
{
    // Update cursor position with values between -0.5 and +0.5
    cursor.x = _event.clientX / sizes.width - 0.5
    cursor.y = _event.clientY / sizes.height - 0.5
})

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
// const camera = new THREE.OrthographicCamera(- 10, 10, 10 * (sizes.height / sizes.width), - 10 * (sizes.height / sizes.width))
camera.position.y = 2
camera.position.z = 10
camera.rotation.x = - 0.2
scene.add(camera)

const cameraControls = new OrbitControls(camera, renderer.domElement)
cameraControls.zoomSpeed = 0.3
cameraControls.enableDamping = true

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffcccc, 0.02)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffcccc, 1)
directionalLight.position.x = 10
directionalLight.position.z = 3
scene.add(directionalLight)

/**
 * Planet
 */
const globe = new THREE.Mesh(
    new THREE.SphereGeometry(5, 64, 64),
    new THREE.MeshStandardMaterial({
        map: globeDiffuseTexture,
        normalMap: globeNormalTexture,
        metalnessMap: globeMetalnessTexture,
        roughnessMap: globeRoughnessTexture
    })
)
scene.add(globe)

const clouds = new THREE.Mesh(
    new THREE.SphereGeometry(5.03, 64, 64),
    new THREE.MeshStandardMaterial({
        color: 0xffffff,
        alphaMap: cloudsAlphaTexture,
        transparent: true
    })
)
scene.add(clouds)

/**
 * Asteroids
 */
const asteroidsGeometry = new THREE.Geometry()

for(let i = 0; i < 100000; i++)
{
    const angle = Math.random() * Math.PI * 2
    const radius = 6 + Math.random() * 6
    const x = Math.cos(angle) * radius
    const y = Math.pow(Math.random(), 10) * (Math.random() < 0.5 ? 1 : - 1)
    const z = Math.sin(angle) * radius
    
    const vertice = new THREE.Vector3(x, y, z)
    asteroidsGeometry.vertices.push(vertice)
}

const asteroidsMaterial = new THREE.PointsMaterial({
    size: 0.03,
    depthWrite: false,
    map: rockDiffuseAlphaTexture,
    transparent: true
})

const asteroids = new THREE.Points(asteroidsGeometry, asteroidsMaterial)
scene.add(asteroids)

/**
 * Loop
 */
const loop = () =>
{
    window.requestAnimationFrame(loop)

    globe.rotation.y += 0.0005
    clouds.rotation.y += 0.00054

    // Look at scene center
    camera.lookAt(new THREE.Vector3(0, 0, 0))

    // Update orbit controls
    cameraControls.update()

    // Render
    renderer.render(scene, camera)
}

loop()