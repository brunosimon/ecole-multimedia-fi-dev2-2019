import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import cloudsAlphaImageSource from './assets/planet/clouds/alpha.jpg'
import globeDiffuseImageSource from './assets/planet/globe/diffuse.jpg'
import globeMetalnessImageSource from './assets/planet/globe/metalness.jpg'
import globeNormalImageSource from './assets/planet/globe/normal.jpg'
import globeRoughnessImageSource from './assets/planet/globe/roughness.jpg'
import rockDiffuseAlphaImageSource from './assets/planet/rock/diffuse-alpha.png'

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
camera.position.z = 20
camera.position.y = 2
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
// controls.enableDamping = true
controls.zoomSpeed = 0.3

/**
 * lights
 */
const ambianteLight = new THREE.AmbientLight(new THREE.Color(0xffcccc),0.2)
scene.add(ambianteLight)
const sunLight = new THREE.DirectionalLight(new THREE.Color(0xffcccc),1)
sunLight.position.x = 10
sunLight.position.z = 4
scene.add(sunLight)


/**
 * asteroide
 */

const particlesGeometry = new THREE.Geometry()

for (let index = 0; index < 100000; index++) {

    const angle = Math.PI * Math.random() *2

    const vertice = new THREE.Vector3(
        Math.sin(angle)*14 + (Math.random()-0.5)*8,
        Math.pow(Math.random(),4) * (Math.random() < 0.5 ? 1: -1),
        Math.cos(angle)*14 + (Math.random()-0.5)*8
    )
    particlesGeometry.vertices.push(vertice)

    const color = new THREE.Color()
    if(vertice.x < 0 && (vertice.z < 5 && vertice.z > - 5))
    {
        color.r *= 0.4
        color.g *= 0.4
        color.b *= 0.4
    }
    else
    {
        const randomDim = Math.random() * 0.5
        color.r -= randomDim
        color.g -= randomDim
        color.b -= randomDim
    }
    particlesGeometry.colors.push(color)
}

const particlesMaterial = new THREE.PointsMaterial({
    map : rockDiffuseAlphaTexture,
    transparent : true,
    size : 0.15,
    vertexColors: true
})


const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)


 /**
  * planet
  */
const globe = new THREE.Mesh(
    new THREE.SphereGeometry(5,64,64),
    new THREE.MeshStandardMaterial({
        map : globeDiffuseTexture,
        metalnessMap : globeMetalnessTexture,
        roughnessMap : globeRoughnessTexture,
        normalMap : globeNormalTexture,
    })
)
scene.add(globe)


// clouds
const clouds = new THREE.Mesh(
    new THREE.SphereGeometry(5.01, 64, 64),
    new THREE.MeshStandardMaterial({
        alphaMap : cloudsAlphaTexture,
        transparent : true,
        depthWrite: false,

    })
)
scene.add(clouds)



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