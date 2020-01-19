import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import cakeImageSource from "./Texture.jpg"
import particleImageSource from './assets/images/particles/1.png' 

const textureLoader = new THREE.TextureLoader()

const cakeTexture = textureLoader.load(cakeImageSource)
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
camera.position.z = 5
scene.add(camera)

/**
 * cake
 */
const cakeGroup = new THREE.Group()
scene.add(cakeGroup)

 //base
const baseGeometry = new THREE.CylinderGeometry(1, 1, 0.75, 50)
const baseMaterial = new THREE.MeshBasicMaterial({map: cakeTexture})
const base = new THREE.Mesh(baseGeometry, baseMaterial)
cakeGroup.add(base)

//base2
const base2Geometry = new THREE.CylinderGeometry(0.4, 0.4, 1, 50)
const base2Material = new THREE.MeshBasicMaterial({map: cakeTexture})
const base2 = new THREE.Mesh(base2Geometry, base2Material)
base2.position.y = 0.75
base2.position.z = -0.55
cakeGroup.add(base2)

//candle
const candleGeometry = new THREE.CylinderGeometry(1, 1, 1, 1, 1, 1)
const candleMaterial = new THREE.MeshBasicMaterial({color: 0x0000ff})
for(let i = 0; i < 30; i++)
{
    const angle = i / 30 * Math.PI * 2

    //group
    const candleGroup = new THREE.Mesh(candleGeometry, candleMaterial)

    candleGroup.position.x = Math.cos(angle) * 3
    candleGroup.position.y = 2 + 1
    candleGroup.position.z = Math.sin(angle) * 3
    cakeGroup.add(candleGroup)
}

/**
 * Particles
 */
// Geometry
const particlesGeometry = new THREE.Geometry()
const galaxyRadius = 1

for(let i = 0; i < 50000; i++)
{
    // Vertice
    const progress = Math.random()
    const angle = progress * 15
    const distance = progress * galaxyRadius
    let x = Math.sin(angle) * distance
    let y = 0
    let z = Math.cos(angle) * distance


    const randomAngle = Math.random() * Math.PI * 2
    const randomRadius = Math.random() * Math.random() * 3 


    x += (Math.random() - 0.5) * Math.random() * 5
    y += (Math.random() - 0.5) * Math.random() * 2
    z += (Math.random() - 0.5) * Math.random() * 5

    const vertice = new THREE.Vector3(x, y, z)
    particlesGeometry.vertices.push(vertice)



const innerColor = new THREE.Color(0xffae33)
const outerColor = new THREE.Color(0xff0000)
const color = new THREE.Color()
color.r = innerColor.r + (outerColor.r - innerColor.r) * progress
color.g = innerColor.g+ (outerColor.g - innerColor.g) * progress
color.b = innerColor.b + (outerColor.b - innerColor.b) * progress

particlesGeometry.colors.push(color)
}

// Material
const particlesMaterial = new THREE.PointsMaterial({
    vertexColors: true,
    size: 0.02,
    sizeAttenuation: true,
    // color: new THREE.Color(0xff0000),
    // map: particleTexture
    alphaMap: particleTexture,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
})

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)


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

