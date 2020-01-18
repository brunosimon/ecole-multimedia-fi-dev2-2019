import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import globeDiffuseImageSource from './assets/images/globe/diffuse.jpg'
import globeMetalnessImageSource from './assets/images/globe/metalness.jpg'
import globeNormalImageSource from './assets/images/globe/normal.jpg'
import globeRoughnessImageSource from './assets/images/globe/roughness.jpg'
import cloudsAlphaImageSource from './assets/images/clouds/alpha.jpg'
import rockDiffuseAlphaImageSource from './assets/images/rock/diffuse-alpha.png'

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
renderer.setClearColor(0x000000, 1)
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
 * Planet
 */

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
scene.add(globe)

// Clouds
const clouds = new THREE.Mesh(
    new THREE.SphereGeometry(5.01, 64, 64),
    new THREE.MeshStandardMaterial({
        alphaMap: cloudsAlphaTexture,
        transparent: true
    })
)
scene.add(clouds)

// Asteroids
const asteroidsGeometry = new THREE.Geometry()

for(let i = 0; i < 500000; i++)
{
    const angle = Math.random() * Math.PI * 2

    // Vertice
    const radius = 8 + Math.random() * 6
    const x = Math.cos(angle) * radius
    const y = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : - 1) * 0.3
    const z = Math.sin(angle) * radius

    const vertice = new THREE.Vector3(x, y, z)
    asteroidsGeometry.vertices.push(vertice)

    // Color
    const color = new THREE.Color(0xffffff)

    if(x < 0 && (z < 5 && z > - 5))
    {
        color.r *= 0.1
        color.g *= 0.1
        color.b *= 0.1
    }
    else
    {
        const randomDim = Math.random() * 0.5
        color.r -= randomDim
        color.g -= randomDim
        color.b -= randomDim
    }

    asteroidsGeometry.colors.push(color)
}

const asteroidsMaterial = new THREE.PointsMaterial({
    size: 0.02,
    map: rockDiffuseAlphaTexture,
    transparent: true,
    vertexColors: true
})

const asteroids = new THREE.Points(asteroidsGeometry, asteroidsMaterial)
scene.add(asteroids)

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