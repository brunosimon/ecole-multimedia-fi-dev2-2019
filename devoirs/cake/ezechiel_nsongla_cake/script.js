import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import TexturesImageSource from './assets/images/texture/1.jpg'
import particleImageSource from './assets/images/particles/circle_02.png'

 
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load(TexturesImageSource)
const particleTexture = textureLoader.load(particleImageSource)
//const globeDiffuseTexture = textureLoader.load(globeDiffuseImageSource)
//const globeMetalnessTexture = textureLoader.load(globeMetalnessImageSource)
//const globeNormalTexture = textureLoader.load(globeNormalImageSource)
//const globeRoughnessTexture = textureLoader.load(globeRoughnessImageSource)
// const cloudsAlphaTexture = textureLoader.load(cloudsAlphaImageSource)
// const rockDiffuseAlphaTexture = textureLoader.load(rockDiffuseAlphaImageSource)
// rockDiffuseAlphaTexture.center.x = 0.5
// rockDiffuseAlphaTexture.center.y = 0.5
// rockDiffuseAlphaTexture.rotation = - Math.PI * 0.5

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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 14
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
// cake

const cake = new THREE.CylinderGeometry(4,4,5,32)

var geometry = new THREE.CylinderGeometry( 4, 4, 5, 32 );
var material = new THREE.MeshBasicMaterial( {map: texture} );
var cylinder = new THREE.Mesh( geometry, material );
scene.add( cylinder );



//candles
var candleGeometry = new THREE.CylinderGeometry( 0.2, 0.2, 5, 8 );
var candleMaterial = new THREE.MeshBasicMaterial();
for(let i = 0; i<30; i++){
    var candleCylinder = new THREE.Mesh( candleGeometry, candleMaterial );
    scene.add( candleCylinder );
    candleCylinder.position.y= 5
    candleCylinder.position.x = (Math.random() - 0.5) * 6
    candleCylinder.position.z = (Math.random() - 0.5) * 6
}
/**
 * fire
 */
//const candleFireGeometry = new THREE.Geometry()
//for(let i=0;i<10;i++)
//{
  //  const vertice 
//}

/**
 * particles
 */

const particlesGeometry = new THREE.Geometry()

for(let i = 0; i < 10000; i++)
{
    // Vertice
    const vertice = new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
    )
    particlesGeometry.vertices.push(vertice)

    // Color
    const color = new THREE.Color(
        Math.random(),
        Math.random(),
        Math.random()
    )
    particlesGeometry.colors.push(color)
}


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