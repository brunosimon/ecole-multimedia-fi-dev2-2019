import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

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
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.y = 1.5
camera.position.z = 10
scene.add(camera)

/**
 * House
 */
const houseGroup = new THREE.Group()
scene.add(houseGroup)

const grass = new THREE.Mesh(
    new THREE.PlaneGeometry(15, 15, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x66bb66 })
)
grass.rotation.x = - Math.PI * 0.5
houseGroup.add(grass)

const walls = new THREE.Mesh(
    new THREE.BoxGeometry(5, 2.5, 5, 1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xffcc99 })
)
walls.position.y = 1.25
houseGroup.add(walls)

const roof = new THREE.Mesh(
    new THREE.ConeGeometry(4.1, 1, 4),
    new THREE.MeshBasicMaterial({ color: 0x885522 })
)
roof.position.y += 2.5 + 1 * 0.5
roof.rotation.y += Math.PI * 0.25
houseGroup.add(roof)

const door = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 2, 1),
    new THREE.MeshBasicMaterial({ color: 0xff8866 })
)
door.position.x = - 2.5
door.position.y = 1
houseGroup.add(door)

const bush1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0x228833 })
)
bush1.position.x = - 2.8
bush1.position.z = 1
bush1.position.y = 0.2
houseGroup.add(bush1)

const bush2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.4, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0x228833 })
)
bush2.position.x = - 2.8
bush2.position.z = - 0.8
bush2.position.y = 0.15
houseGroup.add(bush2)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)

/**
 * Controls
 */
const cameraControls = new OrbitControls(camera, renderer.domElement)
cameraControls.zoomSpeed = 0.3
cameraControls.enableDamping = true

/**
 * Loop
 */
const loop = () =>
{
    window.requestAnimationFrame(loop)

    // // Update mesh
    // houseGroup.rotation.y += 0.01

    // Update orbit controls
    cameraControls.update()

    // Render
    renderer.render(scene, camera)
}

loop()