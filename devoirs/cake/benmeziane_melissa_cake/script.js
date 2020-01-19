
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
//import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js'
/*import buildingImageSource from '../city/assets/images/Glass.jpg'
import RoadImageSource from '../city/assets/images/road.jpg'*/
// import FloorImageSource from '../city/assets/images/sol.jpg'
import CakeImageSource from './assets/images/chocolat.jpg'
import CakeImageSource2 from './assets/images/cake.jpg'
//import CandelImageSource from '../gateau/assets/images/cake.jpg'

/**
 * Textures
 */

const textureLoader = new THREE.TextureLoader() 



/*
const CandelTexture = textureLoader.load(CandleImageSource) 
CandelTexture.wrapS = THREE.RepeatWrapping
CandelTexture.wrapT = THREE.RepeatWrapping
CandelTexture.repeat.x = 5
CandelTexture.repeat.y = 1
CandelTexture.magFilter = THREE.NearestFilter*/


const CakeTexture = textureLoader.load(CakeImageSource)
CakeTexture.wrapS = THREE.RepeatWrapping
CakeTexture.wrapT = THREE.RepeatWrapping
CakeTexture.repeat.x = 4
CakeTexture.repeat.y = 4

const CakeTexture2 = textureLoader.load(CakeImageSource2)
CakeTexture.wrapS = THREE.RepeatWrapping
CakeTexture.wrapT = THREE.RepeatWrapping
CakeTexture.repeat.x = 4
CakeTexture.repeat.y = 4

// const FloorTexture = textureLoader.load(FloorImageSource)
/*
FloorTexture.wrapS = THREE.RepeatWrapping
FloorTexture.wrapT = THREE.RepeatWrapping
FloorTexture.repeat.x = 4
FloorTexture.repeat.y = 4
FloorTexture.magFilter = THREE.NearestFilter
FloorTexture.minFilter = THREE.LinearMipmapLinearFilter*/


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

/*
const materialFloor = new THREE.MeshStandardMaterial({
    roughness: 0.3,
    metalness: 0.6 , 
    map : FloorTexture
})

*/


const MaterialCake = new THREE.MeshBasicMaterial( {
    map : CakeTexture 
} );
const MaterialCake2 = new THREE.MeshBasicMaterial( {
    map : CakeTexture2
} );

// Floor

/*const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100, 1, 1),
    materialFloor , 
   
)
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)*/


//gateau 



const cakeGeometry = new THREE.CylinderBufferGeometry(25,25,10,30)
const  CakeCylinder = new THREE.Mesh( cakeGeometry, MaterialCake );
scene.add( CakeCylinder )





const cakeGeometry2= new THREE.CylinderGeometry(30,30,10,30)
const  CakeCylinder2 = new THREE.Mesh( 
    
    cakeGeometry2, 
    MaterialCake2 ) ;
    CakeCylinder2.position.y = -5 , 

scene.add( CakeCylinder2 );



/*
// Candle
for(let i = 0; i < 30; i++){
    const candles = new THREE.Mesh(
        new THREE.CylinderGeometry(1,1,8,30),
        new THREE.MeshStandardMaterial({
            map: CandleTexture
        })
    )
    candles.position.y = 14
    candles.position.z = (Math.random() - 0.5) * 42
    candles.position.x = (Math.random() - 0.5) * 42
    scene.add(candles)}


    
    
}*/


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