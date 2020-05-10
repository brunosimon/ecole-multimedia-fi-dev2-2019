import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import particleImageSource from './assets/images/particle.png'

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
 * Lights
 */
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3)
directionalLight.shadow.mapSize.width = 2048
directionalLight.shadow.mapSize.height = 2048
directionalLight.shadow.camera.top = 100
directionalLight.shadow.camera.bottom = -100
directionalLight.shadow.camera.left = -100
directionalLight.shadow.camera.right = 100
directionalLight.castShadow = true
directionalLight.position.x = 30
directionalLight.position.z = 100
directionalLight.position.y = 100
scene.add(directionalLight)

const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6)
scene.add(hemisphereLight)

/**
 * Objects
 */

// Material
const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.3,
    metalness: 0.3
})

const floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(100, 100, 1, 1), material)
floor.receiveShadow = true
floor.position.y = 0
floor.rotation.x -= Math.PI * 0.5
scene.add(floor)

// Buildings
const buildingGeometry = new THREE.BoxBufferGeometry(1, 1, 1, 1, 1, 1)
buildingGeometry.translate(0, 0.5, 0)

for(let i = 0; i < 20; i++)
{
    const buildingRight = new THREE.Mesh(buildingGeometry, material)
    buildingRight.position.z = (i / 20 - 0.5) * 100
    buildingRight.position.x = 10
    buildingRight.scale.x = 5 + Math.random() * 2
    buildingRight.scale.y = 3 + Math.random() * 40
    buildingRight.scale.z = 2 + Math.random() * 5
    buildingRight.castShadow = true
    buildingRight.receiveShadow = true
    scene.add(buildingRight)

    const buildingLeft = new THREE.Mesh(buildingGeometry, material)
    buildingLeft.position.z = (i / 20 - 0.5) * 100
    buildingLeft.position.x = - 10
    buildingLeft.scale.x = 5 + Math.random() * 2
    buildingLeft.scale.y = 3 + Math.random() * 40
    buildingLeft.scale.z = 2 + Math.random() * 5
    buildingLeft.castShadow = true
    buildingLeft.receiveShadow = true
    scene.add(buildingLeft)
}

/**
 * Snow
 */
const snowGeometry = new THREE.Geometry()

for(let i = 0; i < 500000; i++)
{
    const vertice = new THREE.Vector3(
        (Math.random() - 0.5) * 100,
        Math.random() * 50,
        (Math.random() - 0.5) * 100
    )
    snowGeometry.vertices.push(vertice)
}

const snowMaterial = new THREE.PointsMaterial({
    size: 0.1,
    alphaMap: particleTexture,
    transparent: true,
    depthWrite: false
})

const snow = new THREE.Points(snowGeometry, snowMaterial)
scene.add(snow)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.shadowMap.enabled = true
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
 * Loop
 */
const loop = () =>
{
    window.requestAnimationFrame(loop)

    // Snow
    for(const _vertice of snowGeometry.vertices)
    {
        _vertice.y -= 0.01

        if(_vertice.y < 0)
        {
            _vertice.y = 50
        }

        _vertice.x += Math.sin(_vertice.y * 1 + _vertice.z * 0.1) * 0.01
    }
    snowGeometry.verticesNeedUpdate = true

    // Look at scene center
    camera.lookAt(new THREE.Vector3(0, 0, 0))

    // Update orbit controls
    cameraControls.update()

    // Render
    renderer.render(scene, camera)
}

loop()