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
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
scene.add(ambientLight)

const sunLight = new THREE.DirectionalLight(0xffffff, 1)
sunLight.position.x = 10
sunLight.position.y = 10
sunLight.position.z = 5
scene.add(sunLight)

/**
 * Cake
 */
const cakeGroup = new THREE.Group()
scene.add(cakeGroup)

// Base
const base = new THREE.Mesh(
    new THREE.CylinderGeometry(5, 5, 4, 32, 1),
    new THREE.MeshStandardMaterial({ color: 0xccccff })
)
cakeGroup.add(base)

// Candles
const candleGeometry = new THREE.CylinderGeometry(0.15, 0.15, 2, 8, 1)
const candleMaterial = new THREE.MeshStandardMaterial({ color: 0xffcccc })

const candlesFires = []
const candleFireMaterial = new THREE.PointsMaterial({
    size: 0.5,
    color: 0xffaa85,
    alphaMap: particleTexture,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    opacity: 0.5
})

for(let i = 0; i < 30; i++)
{
    const angle = i / 30 * Math.PI * 2

    // Group
    const candleGroup = new THREE.Group()
    candleGroup.position.x = Math.cos(angle) * 3
    candleGroup.position.y = 2 + 1
    candleGroup.position.z = Math.sin(angle) * 3
    cakeGroup.add(candleGroup)

    // Base
    const candleBase = new THREE.Mesh(candleGeometry, candleMaterial)
    candleGroup.add(candleBase)

    // Fire
    const candleFireGeometry = new THREE.Geometry()

    for(let i = 0; i< 10; i++)
    {
        const vertice = new THREE.Vector3()
        vertice.x = (Math.random() - 0.5) * 0.1
        vertice.y = Math.random() * 0.35
        vertice.z = (Math.random() - 0.5) * 0.1
        candleFireGeometry.vertices.push(vertice)
    }
    
    const candleFire = new THREE.Points(candleFireGeometry, candleFireMaterial)
    candleFire.position.y = 1
    candleGroup.add(candleFire)

    candlesFires.push(candleFire)
}

/**
 * Loop
 */
const loop = () =>
{
    window.requestAnimationFrame(loop)

    // Candle fires
    for(const candleFire of candlesFires)
    {
        for(const vertice of candleFire.geometry.vertices)
        {
            vertice.y += 0.003

            if(vertice.y > 0.35)
            {
                vertice.y = 0
            }
        }
        candleFire.geometry.verticesNeedUpdate = true
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)
}

loop()