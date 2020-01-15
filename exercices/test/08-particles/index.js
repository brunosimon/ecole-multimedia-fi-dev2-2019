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
 * Particles
 */

// Geometry
const particlesGeometry = new THREE.Geometry()

for(let i = 0; i < 5000; i++)
{
    // Vertice
    const vertice = new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
    )
    particlesGeometry.vertices.push(vertice)

    // Color
    const color = new THREE.Color(Math.random(), Math.random(), Math.random())
    particlesGeometry.colors.push(color)
}

// Material
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.2,
    sizeAttenuation: true,
    alphaMap: particleTexture,
    transparent: true,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
})

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)

/**
 * Loop
 */
const loop = () =>
{
    window.requestAnimationFrame(loop)

    // Particles
    // particles.rotation.y += 0.002

    for(const _vertice of particlesGeometry.vertices)
    {
        _vertice.y += Math.sin(Date.now() * 0.001 + _vertice.x) * 0.01
    }
    particlesGeometry.verticesNeedUpdate = true

    // Look at scene center
    camera.lookAt(new THREE.Vector3(0, 0, 0))

    // Update orbit controls
    cameraControls.update()

    // Render
    renderer.render(scene, camera)
}

loop()