import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import particleImageSource from './assets/images/particles/1.png'

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load(particleImageSource)

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
 * Galaxy
 */
const galaxyGeometry = new THREE.Geometry()
const galaxySize = 10

for(let i = 0; i < 500000; i++)
{
    // Vertice
    const progress = Math.pow(Math.random(), 5)
    const spinAngle = progress * 15
    const distance = progress * galaxySize
    let x = Math.sin(spinAngle) * distance
    let y = 0
    let z = Math.cos(spinAngle) * distance

    const distanceRandomness = Math.pow(Math.random(), 2.5)
    const angleRandomness = Math.random() * Math.PI * 2
    x += Math.cos(angleRandomness) * distanceRandomness * 4
    y += (Math.random() - 0.5) * distanceRandomness * 2
    z += Math.sin(angleRandomness) * distanceRandomness * 4

    const vertice = new THREE.Vector3(x, y, z)
    galaxyGeometry.vertices.push(vertice)

    // Color
    const color = new THREE.Color(Math.random(), Math.random(), Math.random())
    galaxyGeometry.colors.push(color)
}

const galaxyMaterial = new THREE.PointsMaterial({
    size: 0.01,
    sizeAttenuation: true,
    alphaMap: particleTexture,
    transparent: true,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
})
const galaxy = new THREE.Points(galaxyGeometry, galaxyMaterial)
scene.add(galaxy)

/**
 * Loop
 */
const loop = () =>
{
    window.requestAnimationFrame(loop)

    // Look at scene center
    camera.lookAt(new THREE.Vector3(0, 0, 0))

    // Update orbit controls
    cameraControls.update()

    // Render
    renderer.render(scene, camera)
}

loop()