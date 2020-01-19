import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Mesh, DoubleSide } from 'three'
import roadsImageSource from './assets/images/door/roadsImageSource.jpg'
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const roadsTextureSource = textureLoader.load(roadsImageSource)

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
    const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)

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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 300)
camera.position.z = 50
camera.position.x = 50
camera.position.y = 50
scene.add(camera)

/**
 * Lights
 */
const pointLight = new THREE.PointLight(0xffffff, 2, 400)
pointLight.position.x = 100
pointLight.position.y = 100
pointLight.position.z = 50
scene.add(pointLight)

/**
 * City
 */
const material = new THREE.MeshStandardMaterial({
     roughness : 0.3,
    metalness : 0.6
    })
const materialRoad = new THREE.MeshStandardMaterial({
     roughness : 0.3,
    metalness : 0.6,
    map: roadsTextureSource,
    side: DoubleSide
    })

//Floor
 const floor = new THREE.Mesh(
     new THREE.PlaneGeometry(150,150,1,1),
     material
 )

 floor.rotation.x =- Math.PI * 0.5
 scene.add(floor)


 //Road
 const road = new THREE.Mesh(
    new THREE.PlaneGeometry(150,20,1,1),
    materialRoad
)
road.rotation.x = -Math.PI * 0.5
road.rotation.z = Math.PI * 0.5
road.position.x = 1
road.position.y= 1
scene.add(road)

 //Buildings

 const buildingGeometry = new THREE.BoxGeometry(1,1,1,1,1,1)
 buildingGeometry.translate(0, 0.5, 0)
 for(let i = 0; i< 100; i++)
 {
    const building = new THREE.Mesh(
        buildingGeometry,
        material
    )
    building.position.x = (Math.random() + 0.5) * 45
    building.position.z = (Math.random() - 0.5) * -150
    building.scale.x = 1 + Math.random() * 10
    building.scale.z = 1 + Math.random() * 5
    building.scale.y = 1 + Math.random() * 20
    scene.add(building)
 }

 //Buildings2

 const buildingsGeometry2 = new THREE.BoxGeometry(1,1,1,1,1,1)
 buildingsGeometry2.translate(0, 0.5, 0)
 for(let i = 0; i< 200; i++)
 {
    const buildings2 = new THREE.Mesh(
        buildingGeometry,
        material
    )
    buildings2.position.x = (Math.random() + 0.5) * -45
    buildings2.position.z = (Math.random() - 0.5) * 150
    buildings2.scale.x = 1 + Math.random() * 10
    buildings2.scale.z = 1 + Math.random() * 5
    buildings2.scale.y = 1 + Math.random() * 12
    scene.add(buildings2)
 }


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