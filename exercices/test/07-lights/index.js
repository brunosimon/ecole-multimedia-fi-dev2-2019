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
const doorColorRoughnessTexture = textureLoader.load(doorColorRoughnessSource)
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

const ambientLight = new THREE.AmbientLight(0xffffff, 0.15)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3)
directionalLight.position.x = 5
directionalLight.position.z = 5
scene.add(directionalLight)

const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3)
scene.add(hemisphereLight)

const pointLight = new THREE.PointLight(0xff9000, 0.5)
pointLight.position.x = - 5
pointLight.position.y = 2
pointLight.position.z = 2
scene.add(pointLight)

const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 3, 5, 5)
rectAreaLight.position.x = 5
rectAreaLight.position.z = 5
rectAreaLight.position.y = - 3
rectAreaLight.lookAt(new THREE.Vector3())
scene.add(rectAreaLight)

const spotLight = new THREE.SpotLight(0x00ff9c, 1, 0, Math.PI * 0.2, 0.5)
spotLight.position.z = 5
spotLight.position.x = - 5
spotLight.position.y = 2
scene.add(spotLight)

spotLight.target.position.z = 0
spotLight.target.position.x = - 1
scene.add(spotLight.target)

/**
 * Lights helpers
 */
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
scene.add(directionalLightHelper)

const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight)
scene.add(hemisphereLightHelper)

const pointLightHelper = new THREE.PointLightHelper(pointLight)
scene.add(pointLightHelper)

const spotLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLightHelper)

/**
 * Objects
 */

// Material
const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.3,
    metalness: 0.3
})

// Sphere
const sphere = new THREE.Mesh(new THREE.SphereGeometry(2, 16, 16), material)
sphere.position.x = - 6
scene.add(sphere)

// Plane
const plane = new THREE.Mesh(new THREE.PlaneGeometry(4, 4, 100, 100), material)
scene.add(plane)

// Torus Knot
const torusKnot = new THREE.Mesh(new THREE.TorusKnotGeometry(1.5, 0.5, 128, 16), material)
torusKnot.position.x = 6
scene.add(torusKnot)

// Floor
const floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(20, 20, 1, 1), material)
floor.position.y = - 3
floor.rotation.x -= Math.PI * 0.5
scene.add(floor)

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

// /**
//  * Shadows
//  */
// renderer.shadowMap.enabled = true

// sphere.castShadow = true
// sphere.receiveShadow = true
// plane.castShadow = true
// plane.receiveShadow = true
// torusKnot.castShadow = true
// torusKnot.receiveShadow = true
// floor.receiveShadow = true

// directionalLight.castShadow = true
// pointLight.castShadow = true
// spotLight.castShadow = true

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