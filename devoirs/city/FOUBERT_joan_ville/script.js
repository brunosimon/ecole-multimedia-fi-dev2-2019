import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js'
import { Color } from 'three'
import RouteColor from './assets/images/matcaps/6.jpg'
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const routeBitune = textureLoader.load(RouteColor)

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
const pointLight = new THREE.PointLight(0xffffff, 2, 200)
pointLight.position.x = 100
pointLight.position.y = 100
pointLight.position.z = 50
scene.add(pointLight)

/**
 * City
 */
const material = new THREE.MeshStandardMaterial({
    roughness: 0.5,
    metalness: 0.5
})
// Road scene 
const road = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 125, 5, 100),

    new THREE.MeshBasicMaterial({ color: 0x00000 }),

)
road.rotation.x = -Math.PI * 0.5
road.position.y += 0.1
scene.add(road)

/**
 * White feature
 */
let traits = []
const trait = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1)
trait.translate(0, 0.5, 0)
for (let i = 0; i < 25; i++) {
    const trait2 = new THREE.Mesh(
        trait,
        new THREE.MeshBasicMaterial({ color: 0xffffff })
    )
    trait2.position.x = 0.1
    trait2.position.z = i * 2 * Math.PI 
    trait2.position.y += 1
    trait2.scale.z = 4
    trait2.scale.y = 0.1
    traits.push(trait2)

}
for (let index = 0; index < traits.length; index++) {

    scene.add(traits[index])
}
// car 

const car = new THREE.Mesh(
    new THREE.CylinderGeometry(10, 1, 1, 12),

    new THREE.MeshBasicMaterial({ color: 0xffeecc })
)
car.position.z = 1 + Math.random() * 5

scene.add(car)
/**
 * bulding
 */

let tour = []
const buildingGeometry2 = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1)
buildingGeometry2.translate(0, 0.5, 0)
for (let i = 0; i < 90; i++) {
    const building2 = new THREE.Mesh(
        buildingGeometry2,
        new THREE.MeshBasicMaterial({ color: 0xf8888 })
    )
    building2.position.x = (-Math.random() - 0.2) * -70
    building2.position.z = (Math.random() + 0.5) * -30
    building2.scale.x = 1 + Math.random() * 5
    building2.scale.z = 1 + Math.random() * 5
    building2.scale.y = 1 + Math.random() * 12

    tour.push(building2)

}
for (let index = 0; index < tour.length; index++) {
    scene.add(tour[index])

}
let tour2 = []
const buildingGeometry3 = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1)
buildingGeometry3.translate(0, 0.5, 0)
for (let i = 0; i < 80; i++) {
    const building3 = new THREE.Mesh(
        buildingGeometry3,
        new THREE.MeshBasicMaterial({ color: 0xf8888 })
    )
    building3.position.x = (-Math.random() - 0.2) * -70
    building3.position.z = (-Math.random() - 0.2) * -40
    building3.scale.x = 1 + Math.random() * 5
    building3.scale.z = 1 + Math.random() * 5
    building3.scale.y = 1 + Math.random() * 12

    tour2.push(building3)
    for (let index = 0; index < tour2.length; index++) {
        scene.add(tour2[index])

    }
}

let tour3 = []
const buildingGeometry4 = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1)
buildingGeometry4.translate(0, 0.5, 0)
for (let i = 0; i < 80; i++) {
    const building4 = new THREE.Mesh(
        buildingGeometry4,
        new THREE.MeshBasicMaterial({ color: 0x00000 })
    )
    building4.position.x = (-Math.random() - 0.2) * 70
    building4.position.z = (Math.random() - 0.5) * 90
    building4.scale.x = 1 + Math.random() * 5
    building4.scale.z = 1 + Math.random() * 5
    building4.scale.y = 1 + Math.random() * 12
    tour3.push(building4)
    for (let index = 0; index < tour3.length; index++) {
        scene.add(tour3[index])

    }
}


// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(200, 125, 1, 1),
    material
)
floor.rotation.x = -Math.PI * 0.5
scene.add(floor)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)


/**
 * fly controls
 */
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.zoomSpeed = 0.3
/**
 * Loop
 */
// let clock = new THREE.Clock()
const loop = () => {
    // let delta = clock.getDelta()
    window.requestAnimationFrame(loop)

    // Update controls
    controls.update()
    for (let index = 0; index < traits.length; index++) {

        if (traits[index].position.z > 45) {
            traits[index].position.z = -45
        }
        traits[index].position.z += 0.1
    }

    for (let index = 0; index < tour.length; index++) {

        if (tour[index].position.z > 65) {
            tour[index].position.z = -45
        }
        tour[index].position.z += 0.1
    }
    for (let index = 0; index < tour2.length; index++) {

        if (tour2[index].position.z > 65) {
            tour2[index].position.z = -45
        }
        tour2[index].position.z += 0.1
    }

    for (let index = 0; index < tour3.length; index++) {

        if (tour3[index].position.z > 45) {
            tour3[index].position.z = -45
        }
        tour3[index].position.z += 0.1
    }

    // Render
    renderer.render(scene, camera)
}

loop()