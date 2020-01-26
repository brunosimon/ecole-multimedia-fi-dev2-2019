import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { TweenLite } from "gsap"
import starsTextureImageSource from './assets/particles/1.png'
import reactorTextureImageSource from './assets/particles/reactor.png'

/**
 * GTLFLoader
 */

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

/**
 * Textures
 */

const textureLoader = new THREE.TextureLoader()

const starsTexureImage = new textureLoader.load(starsTextureImageSource)
const reactorTextureImage = new textureLoader.load(reactorTextureImageSource)

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
    effectComposer.setSize(sizes.width, sizes.height)

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

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 10000)
camera.position.z = 200
camera.position.y = 3
camera.position.x = 0
camera.rotation.y = 50
scene.add(camera)

/**
 * Camera animation
 */

TweenLite.to(camera.position, {duration: 3, z: -19, x: -15, y: 4})

//Raycaster
let raycaster = new THREE.Raycaster(),
    mouse = new THREE.Vector2(),
    hover = false,
    hover2 = false,
    hover3= false,
    hover4= false

function onMouseMove(_event){
    mouse.x = ( _event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( _event.clientY / window.innerHeight ) * 2 + 1;
}

function testIntersect()
{
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(sphereArray)

    if(intersects.length)
    {
        if(intersects[0].object == sphereArray[0])
        {
            document.body.style.cursor = 'pointer'
            hover = true
        }
        if(intersects[0].object == sphereArray[1])
        {
            document.body.style.cursor = 'pointer'
            hover2 = true
        }
        if(intersects[0].object == sphereArray[2])
        {
            document.body.style.cursor = 'pointer'
            hover3 = true
        }
        if(intersects[0].object == sphereArray[3])
        {
            document.body.style.cursor = 'pointer'
            hover4 = true
        }
        
    }
    else
    {
        document.body.style.cursor = 'default'
        hover = false
        hover2 = false
        hover3= false
        hover4 = false
    }
}

document.addEventListener('click', (_event ) =>
{


    if(hover == true)
    {
        TweenLite.to(camera.position, {duration: 3, z: 0, x: -11, y: 1})
        sphereArray[0].visible = false
        sphereArray[1].visible = true
        sphereArray[2].visible = true
    }
    if(hover2 == true)
    {
        TweenLite.to(camera.position, {duration: 3, z: -3, x: 0, y: 2})
        sphereArray[1].visible = false
        sphereArray[0].visible = true
        sphereArray[2].visible = true
    }
    if(hover3 == true)
    {
        TweenLite.to(camera.position, {duration: 3, z: 15, x: 0, y: 1})
        sphereArray[2].visible = false
        sphereArray[1].visible = true
        sphereArray[0].visible = true
    }
    if(hover4 == true)
    {
        TweenLite.to(camera.position, {duration: 3, z: -19, x: -15, y: 4})
        sphereArray[0].visible = true
        sphereArray[1].visible = true
        sphereArray[2].visible = true
    }
})


window.addEventListener('mousemove', onMouseMove, false)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setClearColor(0x000000, 1)
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
document.body.appendChild(renderer.domElement)

const effectComposer = new EffectComposer(renderer)

const renderPass = new RenderPass(scene, camera)
effectComposer.addPass(renderPass)

const unrealPass = new UnrealBloomPass(new THREE.Vector2(sizes.width, sizes.height))
unrealPass.strength = 0.4
unrealPass.radius = 0.1
unrealPass.threshold = 0.1
effectComposer.addPass(unrealPass)

/**
 * Lights
 */

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.x = 5
directionalLight.position.y = 5
directionalLight.position.z = 5
scene.add(directionalLight)

/**
 * Model
 */

//Load model
const spaceshipGroup = new THREE.Group()
spaceshipGroup.scale.set(0.01, 0.01, 0.01)
spaceshipGroup.rotation.y = Math.PI
scene.add(spaceshipGroup)
gltfLoader.load(
    'models/spaceship/twing.gltf',
    (gltf) =>
    {
        // console.log('sucess')
        // console.log(gltf)
        while(gltf.scene.children.length)
        {
            const child = gltf.scene.children[0]
            spaceshipGroup.add(child)
        }
    },
    undefined,
    (error) =>
    {
        console.log('error')
        console.log(error)
    }
)

//Stars
const starsGeometry = new THREE.Geometry()

for (let i=0; i< 1000; i++)
{
    const vertice = new THREE.Vector3(
        (Math.random() - 0.5) * 150,
        (Math.random() - 0.5) * 100,
        -Math.random() * 300
    )
    starsGeometry.vertices.push(vertice)
}

//Material stars
const starsMaterial = new THREE.PointsMaterial({
    size: 0.5,
    alphaMap: starsTexureImage,
    transparent: true,
    depthWrite: false
})


//Points stars
const stars = new THREE.Points(starsGeometry, starsMaterial)
scene.add(stars)

//Reactor

const sphereReactorMaterial = new THREE.MeshBasicMaterial({
    map: reactorTextureImage,
    transparent: true
})

const reactorGeometry = new THREE.CylinderBufferGeometry(1, 1, 0.5, 20)

const sphereReactor1 = new THREE.Mesh(reactorGeometry, sphereReactorMaterial)
sphereReactor1.position.x -= 0
sphereReactor1.position.z = 10
sphereReactor1.rotation.x = -Math.PI * 0.5
scene.add(sphereReactor1)

const reactorGeometry2 = new THREE.CylinderBufferGeometry(1, 1, 0.5, 20)

const sphereReactor2 = new THREE.Mesh(reactorGeometry2, sphereReactorMaterial)
sphereReactor2.position.x -= 1.5
sphereReactor2.position.z = 6
sphereReactor2.rotation.x = -Math.PI * 0.5
scene.add(sphereReactor2)

const reactorGeometry3 = new THREE.CylinderBufferGeometry(1, 1, 0.5, 20)

const sphereReactor3 = new THREE.Mesh(reactorGeometry3, sphereReactorMaterial)
sphereReactor3.position.x = 1.5
sphereReactor3.position.z = 6
sphereReactor3.rotation.x = -Math.PI * 0.5
scene.add(sphereReactor3)



/**
 * Sphere info 1, 2, 3, 4
 */

const sphereArray = []

//Sphere info
const sphereInfoMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    opacity: 0.8,
    transparent: true
})

const sphereInfoGeometry = new THREE.SphereBufferGeometry(0.4, 9, 9)

const sphereInfo = new THREE.Mesh(sphereInfoGeometry, sphereInfoMaterial)
sphereInfo.position.x -= 7.5
sphereInfo.position.z = 2
sphereArray.push(sphereInfo)

//Sphere info 2
const sphereInfoGeometry2 = new THREE.SphereBufferGeometry(0.4, 9, 9)

const sphereInfo2 = new THREE.Mesh(sphereInfoGeometry2, sphereInfoMaterial)
sphereArray.push(sphereInfo2)

//Sphere info 3
const sphereInfoGeometry3 = new THREE.SphereBufferGeometry(0.4, 9, 9)

const sphereInfo3 = new THREE.Mesh(sphereInfoGeometry3, sphereInfoMaterial)
sphereInfo3.position.z = 9
sphereArray.push(sphereInfo3)

//Sphere info 4
const sphereInfoGeometry4 = new THREE.SphereBufferGeometry(0.4, 9, 9)

const sphereInfo4 = new THREE.Mesh(sphereInfoGeometry4, sphereInfoMaterial)
sphereInfo4.position.x = 2.5
sphereInfo4.position.z = 2.5
sphereArray.push(sphereInfo4)

for(let i=0; i<sphereArray.length; i++)
{
    scene.add(sphereArray[i])
}

/**
 * Shooting
 */

//Shooting Left
const cylinderShootingGeometryLeft = new THREE.CylinderBufferGeometry(0.05, 0.05, 4)

const cylinderShootingMaterialLeft = new THREE.MeshBasicMaterial({
    color: 0xff0000,
})

const cylinderShootingLeft = new THREE.Mesh(cylinderShootingGeometryLeft, cylinderShootingMaterialLeft)
cylinderShootingLeft.position.x = 7.5
cylinderShootingLeft.position.z = -6
cylinderShootingLeft.rotation.x = Math.PI / 2
scene.add(cylinderShootingLeft)

//Shooting right
const cylinderShootingGeometryRight = new THREE.CylinderBufferGeometry(0.05, 0.05, 4)

const cylinderShootingMaterialRight = new THREE.MeshBasicMaterial({
    color: 0xff0000,
})

const cylinderShootingRight = new THREE.Mesh(cylinderShootingGeometryRight, cylinderShootingMaterialRight)
cylinderShootingRight.position.x -= 7.5
cylinderShootingRight.position.z = -6
cylinderShootingRight.rotation.x = Math.PI / 2
scene.add(cylinderShootingRight)

//Shooting Front right
const cylinderShootingGeometryFrontRight = new THREE.CylinderBufferGeometry(0.05, 0.05, 4)

const cylinderShootingMaterialFrontRight = new THREE.MeshBasicMaterial({
    color: 0xff0000,
})

const cylinderShootingFrontRight = new THREE.Mesh(cylinderShootingGeometryFrontRight, cylinderShootingMaterialFrontRight)
cylinderShootingFrontRight.position.x -= 0.7
cylinderShootingFrontRight.position.z = -11
cylinderShootingFrontRight.rotation.x = Math.PI / 2
scene.add(cylinderShootingFrontRight)

//Shooting Front Left
const cylinderShootingGeometryFrontLeft = new THREE.CylinderBufferGeometry(0.05, 0.05, 4)

const cylinderShootingMaterialFrontLeft = new THREE.MeshBasicMaterial({
    color: 0xff0000,
})

const cylinderShootingFrontLeft = new THREE.Mesh(cylinderShootingGeometryFrontLeft, cylinderShootingMaterialFrontLeft)
cylinderShootingFrontLeft.position.x = 0.7
cylinderShootingFrontLeft.position.z = -11
cylinderShootingFrontLeft.rotation.x = Math.PI / 2
scene.add(cylinderShootingFrontLeft)

/**
 * Loop
 */

const loop = () =>
{
    window.requestAnimationFrame(loop)

    // Stars Update
    for(const vertice of starsGeometry.vertices)
    {
        vertice.z += 1

        if(vertice.z > 100 )
        {
            vertice.z = -100
        }
    }
    starsGeometry.verticesNeedUpdate = true

    //Shooting Update
    cylinderShootingLeft.position.z -= 1
    if(cylinderShootingLeft.position.z == -485)
    {
        cylinderShootingLeft.position.z = -6
    }

    cylinderShootingRight.position.z -= 1
    if(cylinderShootingRight.position.z == -485)
    {
        cylinderShootingRight.position.z = -6
    }

    cylinderShootingFrontRight.position.z -= 1
    if(cylinderShootingFrontRight.position.z == -250)
    {
        cylinderShootingFrontRight.position.z = -11
    }

    cylinderShootingFrontLeft.position.z -= 1
    if(cylinderShootingFrontLeft.position.z == -250)
    {
        cylinderShootingFrontLeft.position.z = -11
    }

    //Ship variation Y
    spaceshipGroup.position.y = Math.sin(Date.now() / 900)
    sphereInfo.position.y = Math.sin(Date.now() / 900) + 1.5
    sphereInfo2.position.y = Math.sin(Date.now() / 900) + 2.3
    sphereInfo3.position.y = Math.sin(Date.now() / 900) + 1.5
    sphereInfo4.position.y = Math.sin(Date.now() / 900) + 1.2
    cylinderShootingLeft.position.y = Math.sin(Date.now() / 900) + 0.6
    cylinderShootingRight.position.y = Math.sin(Date.now() / 900) + 0.6
    cylinderShootingFrontRight.position.y = Math.sin(Date.now() / 900) + 0.01
    cylinderShootingFrontLeft.position.y = Math.sin(Date.now() / 900) + 0.01
    sphereReactor1.position.y = Math.sin(Date.now() / 900) + 0.1
    sphereReactor2.position.y = Math.sin(Date.now() / 900) + 0.75
    sphereReactor3.position.y = Math.sin(Date.now() / 900) + 0.75
    
    //Camera
    camera.lookAt(spaceshipGroup.position)
    // Render
    effectComposer.render(scene, camera)
    //Test intersect
    testIntersect()
}

loop()