import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import globeDiffuseImageSource from './assets/images/globe/diffuse.jpg'
import globeMetalnessImageSource from './assets/images/globe/metalness.jpg'
import globeNormalImageSource from './assets/images/globe/normal.jpg'
import globeRoughnessImageSource from './assets/images/globe/roughness.jpg'
import cloudsAlphaImageSource from './assets/images/clouds/alpha.jpg'
import rockDiffuseAlphaImageSource from './assets/images/rock/diffuse-alpha.png'

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

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

const floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(20, 20, 1, 1), material)
floor.position.y = -0.5
floor.rotation.x -= Math.PI * 0.5
scene.add(floor)

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
const ambientLight = new THREE.AmbientLight(0xffffff, 2)
scene.add(ambientLight)
ambientLight.position.x = 0
ambientLight.position.y = 0
ambientLight.position.z = 10

const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
directionalLight.position.x = 5
directionalLight.position.z = 5
scene.add(directionalLight)

/**
 * crise
 */


for (let i = 0; i < 30; i++)
{ const geometry = new THREE.CylinderGeometry( 0.050, 0.090 , 0.2 , 30);
    const material = new THREE.MeshStandardMaterial( {color: 0x3e1568} );
    const cylinder = new THREE.Mesh( geometry, material );
    const angle = i / 30 * Math.PI * 2
    cylinder.position.x = Math.cos(angle) * 3.5
    cylinder.position.y = 4.5
    cylinder.position.z = Math.sin(angle) * 3.5
    scene.add( cylinder )}



/**
 * bougie
 */
for (let i = 0; i < 30; i++)
{ const geometry = new THREE.CylinderGeometry( 0.09, 0.09, 1, 30);
    const material = new THREE.MeshStandardMaterial( {color: 0xff0000} );
    const cylinder = new THREE.Mesh( geometry, material );
    const angle = i / 30 * Math.PI * 2
    cylinder.position.x = Math.cos(angle) * 3.5
    cylinder.position.y = 4
    cylinder.position.z = Math.sin(angle) * 3.5
    scene.add( cylinder )}  




// cylender
const geometry = new THREE.CylinderGeometry( 5, 5, 1, 60 );
const material = new THREE.MeshStandardMaterial( {color: 0x372b44} );
const cylinder = new THREE.Mesh( geometry, material );
scene.add( cylinder )
{
const geometry = new THREE.CylinderGeometry( 4, 4, 3, 60 );
const material = new THREE.MeshStandardMaterial( {color: 0x511f85} );
const cylinder = new THREE.Mesh( geometry, material );
cylinder.position.x = 0
cylinder.position.y = 2
cylinder.position.z = 0
scene.add( cylinder )
}

{
    const geometry = new THREE.CylinderGeometry( 3, 3, 2, 60 );
    const material = new THREE.MeshStandardMaterial( {color: 0x500964} );
    const cylinder = new THREE.Mesh( geometry, material );
    cylinder.position.x = 0
    cylinder.position.y = 4
    cylinder.position.z = 0
    scene.add( cylinder )
    }

    {
        const geometry = new THREE.CylinderGeometry( 2, 2, 4, 60 );
        const material = new THREE.MeshStandardMaterial( {color: 0x481058} );
        const cylinder = new THREE.Mesh( geometry, material );
        cylinder.position.x = 0
        cylinder.position.y = 5
        cylinder.position.z = 0
        scene.add( cylinder )


/**
 * torus geometry
 */
{  
const geometry = new THREE.TorusGeometry( 0.91, 0.18, 0.21, 100 );
const material = new THREE.MeshStandardMaterial( { color: 0x2b6c9e } );
const torus = new THREE.Mesh( geometry, material );
scene.add( torus );
torus.position.x = 0
torus.position.y = 7.5
torus.position.z = 0
}

        }
// Asteroids
const asteroidsGeometry = new THREE.Geometry()

for(let i = 0; i < 500000; i++)
{
    const angle = Math.random() * Math.PI * 2

    // Vertice
    const radius = 8 + Math.random() * 6
    const x = Math.cos(angle) * radius
    const y = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : - 1) * 0.3
    const z = Math.sin(angle) * radius

    const vertice = new THREE.Vector3(x, y, z)
    asteroidsGeometry.vertices.push(vertice)
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