import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import tabelImageSource from './assets/images/tabl.jpg'
import platImageSource from './assets/images/pplat.jpg'
import gateauImageSource from './assets/images/10709459-chocolate-cake-texture.jpg'
import bougImageSource from './assets/images/SoilMud0027_1_download600.jpg'
import { Texture, TextureLoader } from 'three'


/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
 
const tabelTexture =  textureLoader.load(tabelImageSource)

const platTexture = textureLoader.load(platImageSource)

const gateauTexture = textureLoader.load(gateauImageSource)

const bougTexture = textureLoader.load(bougImageSource)




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
camera.position.z = 10
scene.add(camera)

/**
 * cake
 */
const cakeGroup = new THREE.Group()
scene.add(cakeGroup)


const geometry = new THREE.CylinderGeometry( 5, 5, 3, 70 )
const material = new THREE.MeshBasicMaterial( {
    
      map : gateauTexture
      
} );
const cylinder = new THREE.Mesh( geometry, material )
cylinder.position.y = 0.2
scene.add( cylinder )

const geometry1 = new THREE.CylinderGeometry( 7, 5, 0.4, 70 )
const material1 = new THREE.MeshBasicMaterial( {
    
      map : platTexture
      
} );
const cylinder1 = new THREE.Mesh( geometry1, material1 )
cylinder.position.y = 1.7
scene.add( cylinder1 )




const grass = new THREE.Mesh(
    new THREE.PlaneGeometry(15, 15, 1, 1),
    new THREE.MeshBasicMaterial({ 
        map : tabelTexture
    })
)
grass.rotation.x = - Math.PI * 0.5
cakeGroup.add(grass)


// bougie
const bougMaterial = new THREE.MeshStandardMaterial({
    map: bougTexture
})
for(let i = 0; i < 30; i++){
    const candles = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1,0.2,2,70),
        bougMaterial
    )
    candles.position.y = 4
    candles.position.z = (Math.random() - 0.5) * 8
    candles.position.x = (Math.random() - 0.5) * 8
    scene.add(candles)}

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