import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import cakeImageSource from './assets/images/cake/cake.jpg'
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const cakeTextureSource = textureLoader.load(cakeImageSource)
/**
 * Scene
 */
const scene = new THREE.Scene()
/**
 * Plateau
 */
var plateGeometry = new THREE.CylinderGeometry( 40, 10, 17, 64, 64, false, 6, 6.3);
var plateMaterial = new THREE.MeshBasicMaterial( {color: 0xffffff} );
var plateCylinder = new THREE.Mesh( plateGeometry, plateMaterial );
scene.add( plateCylinder );
/**
 * Cake
 */
var cakeGeometry = new THREE.CylinderGeometry( 25, 20, 20, 32 );
var cakeMaterial = new THREE.MeshBasicMaterial( {map: cakeTextureSource} );
var cakeCylinder = new THREE.Mesh( cakeGeometry, cakeMaterial );
scene.add( cakeCylinder );
cakeCylinder.position.y=10

/**
 * Particles
 */ 
/**
 * 
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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 50
camera.position.y = 0.2
scene.add(camera)
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
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffcccc, 0.2)
scene.add(ambientLight)
const sunLight = new THREE.DirectionalLight(0xffcccc, 1)
sunLight.position.x = 10
sunLight.position.y = 0
sunLight.position.z = 0
scene.add(sunLight)
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