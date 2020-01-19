import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import globeDiffuseImageSource from './assets/images/globe/diffuse.jpg'
import globeMetalnessImageSource from './assets/images/globe/metalness.jpg'
import globeNormalImageSource from './assets/images/globe/normal.jpg'
import globeRoughnessImageSource from './assets/images/globe/roughness.jpg'
import cloudsAlphaImageSource from './assets/images/clouds/alpha.jpg'
import rockDiffuseAlphaImageSource from './assets/images/rock/diffuse-alpha.png'
import textureCake from './assets/images/rock/cake.jpg'
import textureFemme from './assets/images/femme.jpg'
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const cake = textureLoader.load(textureCake)
const femme = textureLoader.load(textureFemme)
const globeDiffuseTexture = textureLoader.load(globeDiffuseImageSource)
const globeMetalnessTexture = textureLoader.load(globeMetalnessImageSource)
const globeNormalTexture = textureLoader.load(globeNormalImageSource)
const globeRoughnessTexture = textureLoader.load(globeRoughnessImageSource)
const cloudsAlphaTexture = textureLoader.load(cloudsAlphaImageSource)
const rockDiffuseAlphaTexture = textureLoader.load(rockDiffuseAlphaImageSource)
rockDiffuseAlphaTexture.center.x = 0.5
rockDiffuseAlphaTexture.center.y = 0.5
rockDiffuseAlphaTexture.rotation = - Math.PI * 0.5

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
var cakeMaterial = new THREE.MeshBasicMaterial( {map: cake} );
var cakeCylinder = new THREE.Mesh( cakeGeometry, cakeMaterial );
scene.add( cakeCylinder );
cakeCylinder.position.y=10

/**
 * Candle
 */

var candleGeometry = new THREE.CylinderGeometry( 1, 1, 10, 8 );
var candleMaterial = new THREE.MeshBasicMaterial( {map: femme} );

for(let i = 0; i<30; i++){
    var candleCylinder = new THREE.Mesh( candleGeometry, candleMaterial );
    scene.add( candleCylinder );
    candleCylinder.position.y=25
    candleCylinder.position.x = (Math.random() - 0.5) * 35
    candleCylinder.position.z = (Math.random() - 0.5) * 35
}
/**
 * Particles
 */
// Geometry
const particlesGeometry = new THREE.Geometry()
const galaxyRadius = 10

for(let i = 0; i < 500000; i++)
{
    // Vertice
    const progress = Math.pow(Math.random(), 4)
    const angle = progress * 15
    const distance = progress * galaxyRadius
    let x = Math.sin(angle) * distance
    let y = 0
    let z = Math.cos(angle) * distance

    const randomAngle = Math.random() * Math.PI * 2
    const randomRadius = Math.random() * Math.random() * 3

    x += Math.cos(randomAngle) * randomRadius
    y += (Math.random() - 0.5) * Math.random() * 1
    z += Math.sin(randomAngle) * randomRadius

    const vertice = new THREE.Vector3(x, y, z)
    particlesGeometry.vertices.push(vertice)

    // Color
    const innerColor = new THREE.Color(0xffae33)
    const outerColor = new THREE.Color(0x6033ff)
    const color = new THREE.Color()
    color.r = innerColor.r + (outerColor.r - innerColor.r) * progress
    color.g = innerColor.g + (outerColor.g - innerColor.g) * progress
    color.b = innerColor.b + (outerColor.b - innerColor.b) * progress

    particlesGeometry.colors.push(color)
}

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