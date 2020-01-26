import * as THREE from 'three'
import { FlyControls } from 'three/examples/jsm/controls/FlyControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { DoubleSide } from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import rockDiffuseAlphaImageSource from './assets/images/rock/diffuse-alpha.png'
import starsText from './assets/images/stars2.jpg'
import partText from './assets/images/particles/4.png'

/**
 *      GLTFLoader
 */

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

/**
 *      Textures
 */

const textureLoader = new THREE.TextureLoader()

const starsTexture = textureLoader.load(starsText)
const partTexture = textureLoader.load(partText)
const rockDiffuseAlphaTexture = textureLoader.load(rockDiffuseAlphaImageSource)
rockDiffuseAlphaTexture.center.x = 0.5
rockDiffuseAlphaTexture.center.y = 0.5
rockDiffuseAlphaTexture.rotation = -Math.PI * 0.5

/**
 *      Scene
 */

const scene = new THREE.Scene()

/**
 *      Sizes
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
 *      Cursor
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
 *      Camera  + spaceShipGroup
 */

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 10000)
camera.position.z = 30
const spaceShipGroup = new THREE.Group()
spaceShipGroup.rotation.y += Math.PI
spaceShipGroup.position.set(0,0,-20)
spaceShipGroup.scale.x = 0.008
spaceShipGroup.scale.y = 0.008
spaceShipGroup.scale.z = 0.008
camera.add(spaceShipGroup)
scene.add(camera)

/**
 *      Renderer
 */

const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
document.body.appendChild(renderer.domElement)

/**
 * Effect composer
 */
const effectComposer = new EffectComposer(renderer)

const renderPass = new RenderPass(scene, camera)
effectComposer.addPass(renderPass)

const unrealBloomPass = new UnrealBloomPass(new THREE.Vector2(sizes.width, sizes.height))
unrealBloomPass.strength = 0.5
unrealBloomPass.radius = 1
unrealBloomPass.threshold = 0.1
effectComposer.addPass(unrealBloomPass)

/**
 *      Fly Control
 */

const controls = new FlyControls(camera, renderer.domElement)
controls.rollSpeed = 1
controls.movementSpeed = 50

/**
 *      Sounds
 */

const pass = document.getElementById("pass")

/**
 *      Objects
 */

    // Asteroids

const asteroGeometry = new THREE.Geometry()

const asteroMaterial = new THREE.PointsMaterial({
    size: 5,
    map: rockDiffuseAlphaTexture,
    transparent: true
})
const asteroPart = new THREE.Points(asteroGeometry, asteroMaterial)

function asteroids(){
    
    for( let i = 0; i < 2; i++){
        
        const x = (Math.random() - 0.5) * 40
        const y = (Math.random() - 0.5) * 30
        const z = -1000
        const vertice = new THREE.Vector3(x,y,z)

        asteroGeometry.vertices.push(vertice)
        camera.add(asteroPart)
    }
    
}
setInterval(asteroids, 5000)

    // Rings

const portalMaterial = new THREE.PointsMaterial({
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    sizeAttenuation: true,
    alphaMap: partTexture,
    size: 3
})

const portalGeometry = new THREE.Geometry()


for(let i = 0; i < 500; i++)
{
    const angle = Math.random() * Math.PI * 2
    const radius = 15 + Math.random() * 4

    const x = Math.pow(Math.random(), 3) * (Math.random() < 0.55 ? 1 : -1)
    const y = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius
    const vertice = new THREE.Vector3(x, y, z)

    portalGeometry.vertices.push(vertice)
    const ringsColor = new THREE.Color(
        0.5 + Math.random() * 0.2, 0.5 + Math.random() * 0.2, 0
    )
    
    portalGeometry.colors.push(ringsColor)

}

    // First Portal

const portal = new THREE.Points(
    portalGeometry,
    portalMaterial
)
portal.rotation.y += Math.PI * 0.5
scene.add(portal)

    // Next Portals

const nextPor = new THREE.Points(
    portalGeometry,
    portalMaterial
)
nextPor.rotation.y += Math.PI * 0.5

function nextPorPos(){
    nextPor.position.x = Math.random() * 750
    nextPor.position.y = Math.random() * 750
    nextPor.position.z = Math.random() * 750
}
nextPorPos()

    // Arrow

let arrow = new THREE.ArrowHelper(new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z), new THREE.Vector3(0, 0, 0), 2.2, 0x00ff00)
arrow.position.z = -20
arrow.position.y = 10
camera.add(arrow)

    // Skydome

const skydome = new THREE.Mesh(
    new THREE.SphereBufferGeometry(9999, 22, 22),
    new THREE.MeshBasicMaterial({
        map: starsTexture,
        side: THREE.BackSide
    })
)
scene.add(skydome)

/**
 *      Lights
 */

const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 2)
hemisphereLight.position.y = 950
scene.add(hemisphereLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.x = 250
directionalLight.position.y = 30
directionalLight.position.z = -100
scene.add(directionalLight)

/**
 *      Helpers
 */

// const hemiHelper = new THREE.HemisphereLightHelper(hemisphereLight)
// const dirHelper = new THREE.DirectionalLightHelper(directionalLight)
// scene.add(dirHelper, hemiHelper)

/**
 * Model
 */

    // Load model

gltfLoader.load(
    'models/vaisseausaid.gltf',
    (gltf) =>
    {
        console.log('success')
        console.log(gltf)

        while(gltf.scene.children.length)
        {
            const child = gltf.scene.children[0]
            spaceShipGroup.add(child)
        }
    },
    undefined,
    (error) =>
    {
        console.log('error')
        console.log(error)
    }
)

/**
 * Console Logs
 */

// const checkpos = () =>{
//     console.log(sizes.width, camera.position,camera.position.x + sizes.wdith)
// }
// setInterval(checkpos, 5000)

/**
 * Loop
 */

let dir = 0 

const clock = new THREE.Clock()
let distance = 0
let distance2 = 0
let points = 0

const loop = () =>
{
    window.requestAnimationFrame(loop)

    // Update Camera
    let delta = clock.getDelta()
    
    // Update Arrow
    dir = new THREE.Vector3(nextPor.position.x, nextPor.position.y, nextPor.position.z).normalize(); // Ne fonctionne pas
    arrow.setDirection(dir);

    // Update asteroids
    asteroPart.position.z += 1
    if(asteroPart.position.z < 20){
        scene.remove(asteroPart)
    }
    
    // Update Spaceship
    spaceShipGroup.rotation.x -= (cursor.y + spaceShipGroup.rotation.x) / 15
    spaceShipGroup.rotation.y -= (cursor.x + spaceShipGroup.rotation.y + Math.PI) / 15

    // Update Portals
    for ( let i = 0; i < portalGeometry.vertices.length; i++){
        portalGeometry.vertices[i].y += (Math.sin(Date.now() * 0.002) / 10)
    }
    portalGeometry.verticesNeedUpdate = true
    
    distance = portal.position.distanceTo(camera.position)
    distance2 = nextPor.position.distanceTo(camera.position)
    if(distance < 20){
        scene.remove(portal)
        scene.add(nextPor)
    }
    if(distance2 < 22){
        points++
        pass.play()
        scene.remove(nextPor)
        nextPorPos()
        scene.add(nextPor)
    }
    
    // Update controls
    controls.update(delta)

    effectComposer.render(scene, camera)
}
loop()