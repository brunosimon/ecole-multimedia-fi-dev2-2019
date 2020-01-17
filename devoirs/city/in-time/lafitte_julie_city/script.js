import * as THREE from 'three'
// import buildingImageSource from './assets/images/buildings/Textures_buildings.jpg'
import groundImageSource from './assets/images/ground/color.png'
import roadImageSource from './assets/images/road/road_texture.jpg'
import {FirstPersonControls} from 'three/examples/jsm/controls/FirstPersonControls.js'

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const groundTextureSource = textureLoader.load(groundImageSource)
groundTextureSource.wrapS = THREE.RepeatWrapping
groundTextureSource.wrapT = THREE.RepeatWrapping
groundTextureSource.repeat.x = 4
groundTextureSource.repeat.y = 4
const roadTextureSource = textureLoader.load(roadImageSource)
roadTextureSource.wrapS = THREE.RepeatWrapping
roadTextureSource.wrapT = THREE.RepeatWrapping
roadTextureSource.repeat.x = 4
roadTextureSource.repeat.y = 1
roadTextureSource.rotation = Math.PI * 0.5
// const buildingTextureSource = textureLoader.load(buildingImageSource)

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
camera.position.z = 100
camera.position.y = 30
scene.add(camera)
/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight(0xffffff, 2,200)
directionalLight.position.y = 10
directionalLight.position.x = 10
directionalLight.castShadow = true
scene.add(directionalLight)
/**
 * City
 */
const material = new THREE.MeshStandardMaterial({
    roughness: 0.3,
    metalness: 0.6,
    // map: buildingTextureSource
})
const materialGround = new THREE.MeshStandardMaterial({
    roughness: 0.3,
    metalness: 0.6,
    map: groundTextureSource
})
const materialRoad = new THREE.MeshStandardMaterial({
    roughness: 0.3,
    metalness: 0.6,
    map: roadTextureSource
})
// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100, 1, 1),
    materialGround
)
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)
// road
const road = new THREE.Mesh(
    new THREE.PlaneGeometry(6, 100, 1, 1),
    materialRoad
)
road.rotation.x = - Math.PI * 0.5
road.position.x = 0,
road.position.y = 0.05

scene.add(road)
// Buildings
const buildingGeometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1)
buildingGeometry.translate(0,0.5,0)
for(let i = 0; i < 500; i++)
{
    const building = new THREE.Mesh(
        buildingGeometry,
        material
    )
    building.position.x = (Math.random() - 0.5) * 100
    building.position.z = (Math.random() - 0.5) * 100
    building.scale.x = 1 + Math.random() * 5
    building.scale.z = 1 + Math.random() * 5
    building.scale.y = 1 + Math.random() * 12
    if(building.position.x<=-7||building.position.x>=7) scene.add(building)
}
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)

/**
 * Pointer lock controls
 */
const controls = new FirstPersonControls(camera);
controls.lookSpeed = 0.1;
controls.movementSpeed = 15;


// initialisation clock
let clock = new THREE.Clock();

 /**
 * Loop
 */

const loop = () =>
{
    let delta = clock.getDelta();
    window.requestAnimationFrame(loop)
    // Update controls
    controls.update(delta)
    // Render
    renderer.render(scene, camera)
}
loop()