
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
//import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js'
import buildingImageSource from '../benmeziane_melissa_city/assets /images/Glass.jpg'
import RoadImageSource from '../benmeziane_melissa_city/assets /images/road.jpg'
import FloorImageSource from '../benmeziane_melissa_city/assets /images/sol.jpg'

/**
 * Textures
 */

const textureLoader = new THREE.TextureLoader() 

const buildingTexture = textureLoader.load(buildingImageSource) 
buildingTexture.wrapS = THREE.RepeatWrapping
buildingTexture.wrapT = THREE.RepeatWrapping
buildingTexture.repeat.x = 3
buildingTexture.repeat.y = 3
buildingTexture.magFilter = THREE.NearestFilter


const roadTexture = textureLoader.load(RoadImageSource) 
roadTexture.wrapS = THREE.RepeatWrapping
roadTexture.wrapT = THREE.RepeatWrapping
roadTexture.repeat.x = 4
roadTexture.repeat.y = 1
roadTexture.magFilter = THREE.NearestFilter

const FloorTexture = textureLoader.load(FloorImageSource)
FloorTexture.wrapS = THREE.RepeatWrapping
FloorTexture.wrapT = THREE.RepeatWrapping
FloorTexture.repeat.x = 4
FloorTexture.repeat.y = 4
FloorTexture.magFilter = THREE.NearestFilter
FloorTexture.minFilter = THREE.LinearMipmapLinearFilter


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
const pointLight = new THREE.PointLight(0xffffff, 2, 300)
pointLight.position.x = 50
pointLight.position.y = 100
pointLight.position.z = 50
scene.add(pointLight)


/**
 * City
 */ 


 //material

const materialFloor = new THREE.MeshStandardMaterial({
    roughness: 0.3,
    metalness: 0.6 , 
    map : FloorTexture
})
const materialBuilding = new THREE.MeshStandardMaterial({
    roughness: 0.3,
    metalness: 0.6,
    map: buildingTexture 
})

const roadMaterial1 = new THREE.MeshStandardMaterial({
    roughness: 0.3,
    metalness: 0.6,
    map: roadTexture
})


// Floor

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100, 1, 1),
    materialFloor
)
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)




// Buildings

const buildingGeometry = new THREE.BoxGeometry(1, 1 , 1 , 1 ,1)



for(let i = 0; i < 80; i++)
{
    const building = new THREE.Mesh(
        buildingGeometry,
        materialBuilding
    )
    building.position.x = (Math.random()  + 0.5) * 30
    building.position.z = (Math.random() - 0.5) * -90
    building.scale.x = 1 + Math.random() * 5
    building.scale.z = 1 + Math.random() * 5
    building.scale.y = 1 + Math.random() * 40
    
    
    scene.add(building)
   
    
}

//Building 2

const buildingGeometry2 = new THREE.BoxGeometry(1, 1,1, 1, 1, 1)

for(let i = 0; i < 80 ; i++)
{
    const building2 = new THREE.Mesh(
        buildingGeometry2,
        materialBuilding
    )
    building2.position.x = (Math.random() + 0.5) * -30
    building2.position.z = (Math.random() - 0.5) * 90
    building2.scale.x = 1 + Math.random() * 5
    building2.scale.z = 1 + Math.random() * 5
    building2.scale.y = 1 + Math.random() * 40
    scene.add(building2)
}


//road 

const roadMaterial= new THREE.MeshStandardMaterial({
    map : roadTexture 
})

const roadY = new THREE.Mesh(
    new THREE.PlaneGeometry(100,10,1,1),
    roadMaterial1
)
roadY.rotation.x = -Math.PI * 0.5
roadY.rotation.z = Math.PI * 0.5
roadY.position.y = 0.01
scene.add(roadY)



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