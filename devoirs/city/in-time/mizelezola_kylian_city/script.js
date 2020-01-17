import * as THREE from 'three'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js'
import snowImageSource from './assets/images/particles/8.png'
import floorImageSource from './assets/images/floor/floor.jpg'
import roadImageSource from './assets/images/road/road.jpg'
import buildingImageSource from './assets/images/building/building.jpg'
import building2ImageSource from './assets/images/building/building2.jpg'

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const snowTexture = textureLoader.load(snowImageSource)
const floorTexture = textureLoader.load(floorImageSource)
const roadTexture = textureLoader.load(roadImageSource)
const buildingTexture = textureLoader.load(buildingImageSource)
const building2Texture = textureLoader.load(building2ImageSource)


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

window.addEventListener('resize', () => {
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

window.addEventListener('mousemove', (_event) => {
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
const pointLight = new THREE.PointLight(0xffffff, 3, 200)
pointLight.position.x = 50
pointLight.position.y = 100
pointLight.position.z = 50
scene.add(pointLight)

/**
 * City
 */
const material = new THREE.MeshStandardMaterial({
    roughness: 0.3,
    metalness: 0.3
})

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 100, 1, 1),
    new THREE.MeshBasicMaterial({ map: floorTexture })
)
material

floor.rotation.x = -Math.PI * 0.5
scene.add(floor)

const floor2 = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 100, 1, 1),
    new THREE.MeshBasicMaterial({ map: floorTexture })
)
material

floor2.rotation.x = -Math.PI * 0.5
floor2.position.x = -60
scene.add(floor2)

/**
 * Buildings
 */
const buildingGeometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1)
buildingGeometry.translate(0, 0.5, 0)

for (let i = 0; i < 400; i++) {
    const building = new THREE.Mesh(
        buildingGeometry, new THREE.MeshBasicMaterial({ map: buildingTexture })
    )
    material

    building.position.x = (Math.random() - 0.5) * 45
    building.position.z = (Math.random() - 0.5) * 95
    building.scale.x = 1 + Math.random() * 7
    building.scale.z = 1 + Math.random() * 5
    building.scale.y = 1 + Math.random() * 15
    scene.add(building)
}

for (let i = 0; i < 400; i++) {
    const building2 = new THREE.Mesh(
        buildingGeometry, new THREE.MeshBasicMaterial({ map: buildingTexture })
    )
    material

    building2.position.x = ((Math.random() - 0.5) * 45) - 60
    building2.position.z = (Math.random() - 0.5) * 95
    building2.scale.x = 1 + Math.random() * 5
    building2.scale.z = 1 + Math.random() * 5
    building2.scale.y = 1 + Math.random() * 12
    scene.add(building2)
}

/**
 * Road
 */

const road = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 100, 1, 1),
    new THREE.MeshBasicMaterial({ map: roadTexture })
)
material

road.rotation.x = -Math.PI * 0.5
road.position.x = -30
scene.add(road)

/**
 * Snow
 */

// Geometry
const snowGeometry = new THREE.Geometry()

for (let i = 0; i < 100000; i++) {
    const vertice = new THREE.Vector3(
        (Math.random() - 0.5) * 110,
        Math.random() * 20,
        (Math.random() - 0.5) * 100
    )
    snowGeometry.vertices.push(vertice)
}

// Material
const snowMaterial = new THREE.PointsMaterial({
    size: 0.3,
    alphaMap: snowTexture,
    transparent: true,
    depthWrite: false
})

// Points
const snow = new THREE.Points(snowGeometry, snowMaterial)
snow.position.x = -30
scene.add(snow)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)

/**
 * FirstPersonControls
 */
const controls = new FirstPersonControls(camera, renderer.domElement)
controls.lookSpeed = 0.1;
controls.movementSpeed = 10;

/**
 * Loop
 */
let clock = new THREE.Clock()
const loop = () => {
    let delta = clock.getDelta()
    window.requestAnimationFrame(loop)


    // Update snow
    for (const _vertice of snowGeometry.vertices) {
        _vertice.y -= 0.1

        if (_vertice.y < 0) {
            _vertice.y = 20
        }
    }
    snowGeometry.verticesNeedUpdate = true

    //Update control
    controls.update(delta);
    renderer.clear();

    // Render
    renderer.render(scene, camera)
}

loop()