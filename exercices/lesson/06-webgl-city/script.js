import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import snowImageSource from './assets/images/particles/8.png'

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const snowTexture = textureLoader.load(snowImageSource)

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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 200)
camera.position.z = 50
camera.position.y = 50
scene.add(camera)

/**
 * Lights
 */
const pointLight = new THREE.PointLight(0xffffff, 2, 200)
pointLight.position.x = 100
pointLight.position.y = 100
pointLight.position.z = 50
scene.add(pointLight)

/**
 * City
 */
const material = new THREE.MeshStandardMaterial({
    roughness: 0.3,
    metalness: 0.6
})

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100, 1, 1),
    material
)
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

// Buildings
const buildingGeometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1)
buildingGeometry.translate(0, 0.5, 0)

for(let i = 0; i < 1000; i++)
{
    const x = (Math.random() - 0.5) * 100
    const z = (Math.random() - 0.5) * 100

    if(x < - 4 || x > 4)
    {
        const building = new THREE.Mesh(
            buildingGeometry,
            material
        )
        building.position.x = x
        building.position.z = z
        building.scale.x = 1 + Math.random() * 5
        building.scale.z = 1 + Math.random() * 5
        building.scale.y = 1 + Math.random() * 12
        scene.add(building)
    }
}

/**
 * Snow
 */

// Geometry
const snowGeometry = new THREE.Geometry()

for(let i = 0; i < 100000; i++)
{
    const vertice = new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        Math.random() * 20,
        (Math.random() - 0.5) * 100
    )
    snowGeometry.vertices.push(vertice)
}

// Material
const snowMaterial = new THREE.PointsMaterial({
    size: 0.1,
    alphaMap: snowTexture,
    transparent: true,
    depthWrite: false
})

// Points
const snow = new THREE.Points(snowGeometry, snowMaterial)
scene.add(snow)

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

    // Update snow
    for(const _vertice of snowGeometry.vertices)
    {
        _vertice.y -= 0.002

        if(_vertice.y < 0)
        {
            _vertice.y = 20
        }
    }
    snowGeometry.verticesNeedUpdate = true

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)
}

loop()