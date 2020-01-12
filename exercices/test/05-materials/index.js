import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import doorColorImageSource from './assets/images/door/color.jpg'
import doorAmbientOcclusionImageSource from './assets/images/door/ambientOcclusion.jpg'
import doorHeightImageSource from './assets/images/door/height.png'
import doorMetalnessImageSource from './assets/images/door/metalness.jpg'
import doorNormalImageSource from './assets/images/door/normal.jpg'
import doorAlphaImageSource from './assets/images/door/alpha.jpg'
import doorColorRoughnessSource from './assets/images/door/roughness.jpg'
import matcapSource from './assets/images/matcaps/1.jpg'

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const doorColorTexture = textureLoader.load(doorColorImageSource)
const doorAmbientOcclusionTexture = textureLoader.load(doorAmbientOcclusionImageSource)
const doorHeightTexture = textureLoader.load(doorHeightImageSource)
const doorMetalnessTexture = textureLoader.load(doorMetalnessImageSource)
const doorNormalTexture = textureLoader.load(doorNormalImageSource)
const doorAlphaTexture = textureLoader.load(doorAlphaImageSource)
const doorColorRougTexture = textureLoader.load(doorColorRoughnessSource)
const matcapSourceTexture = textureLoader.load(matcapSource)

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
const pointLight = new THREE.PointLight(0xffffff, 1, 10)
pointLight.position.x = 10
pointLight.position.y = 3
pointLight.position.z = 5
scene.add(pointLight)


/**
 * Objects
 */
// // Mesh basic material
// const material = new THREE.MeshBasicMaterial()

// material.color = new THREE.Color(0x8888ff)
// material.map = doorColorTexture
// material.alphaMap = doorAlphaTexture
// material.transparent = true
// material.opacity = 0.8
// material.wireframe = false
// material.side = THREE.DoubleSide

// // Mesh normal material
// const material = new THREE.MeshNormalMaterial()

// // Mesh matcap material
// const material = new THREE.MeshMatcapMaterial({
//     matcap: matcapSourceTexture
// })

// // Mesh lambert material
// const material = new THREE.MeshLambertMaterial({
//     color: new THREE.Color(0xffffff)
// })

// // Mesh phong material
// const material = new THREE.MeshPhongMaterial({
//     color: new THREE.Color(0xffffff),
//     shininess: 100,
//     specular: new THREE.Color(0x1188ff)
// })

// Mesh toon material
const toonGradient = textureLoader.load('https://threejs.org/examples/textures/gradientMaps/threeTone.jpg')
toonGradient.magFilter = THREE.NearestFilter
toonGradient.minFilter = THREE.NearestFilter

const material = new THREE.MeshToonMaterial({
    color: new THREE.Color(0xffffff),
    shininess: 100,
    specular: new THREE.Color(0x1188ff),
    gradientMap: toonGradient
})

// Sphere
const sphere = new THREE.Mesh(new THREE.SphereGeometry(2, 16, 16), material)
sphere.position.x = - 6
scene.add(sphere)

// Plane
const plane = new THREE.Mesh(new THREE.PlaneGeometry(4, 4, 4, 4), material)
scene.add(plane)

// Torus Knot
const torusKnot = new THREE.Mesh(new THREE.TorusKnotGeometry(1.5, 0.5, 128, 16), material)
torusKnot.position.x = 6
scene.add(torusKnot)



/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
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

    // Update objects
    sphere.rotation.y += 0.002
    plane.rotation.y += 0.002
    torusKnot.rotation.y += 0.002

    // Look at scene center
    camera.lookAt(new THREE.Vector3(0, 0, 0))

    // Update orbit controls
    cameraControls.update()

    // Render
    renderer.render(scene, camera)
}

loop()