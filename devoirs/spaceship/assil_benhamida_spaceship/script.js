import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { MapControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { Camera } from 'three/build/three.module'
import ParticulesImageSource from './assets/images/particles/1.png'


import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { DotScreenShader } from 'three/examples/jsm/shaders/DotScreenShader.js'
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js'
import { PixelShader } from 'three/examples/jsm/shaders/PixelShader.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'




/**
 * GLTFLoader
 */
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

/**
 * Textures (au cas ou j'en ai besoin)
 */
const textureLoader = new THREE.TextureLoader()
const particlesTexture = textureLoader.load(ParticulesImageSource)


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
const cameraGroup = new THREE.Group()
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 10000)
camera.position.z = -20
camera.position.y = 10
cameraGroup.add(camera)
scene.add(cameraGroup)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setClearColor(0x000000, 1)
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
document.body.appendChild(renderer.domElement)

/**
 * Effect composer
 */
const effectComposer = new EffectComposer(renderer)

const renderPass = new RenderPass(scene, camera)
effectComposer.addPass(renderPass)

const dotScreenPass = new ShaderPass(DotScreenShader)
dotScreenPass.uniforms.scale.value = 3

//post process (pas réussi)

/*const pixelPass = new ShaderPass(PixelShader)
pixelPass.uniforms.pixelSize.value = 10
pixelPass.uniforms.resolution.value = new THREE.Vector2(sizes.width, sizes.height)
effectComposer.addPass(pixelPass)*/



/**
 * Orbit controls
 */
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.zoomSpeed = 0.5



/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.x = 5
directionalLight.position.y = 5
directionalLight.position.z = 5
scene.add(directionalLight)

/**
 * Model
 */

// Test
/*const test = new THREE.Mesh(
    new THREE.SphereGeometry(5, 32, 32),
    new THREE.MeshStandardMaterial({ wireframe: true })
)
scene.add(test)*/

/**
 * vaisseau spatial group
 */
const spacecraftGroup = new THREE.Group()
spacecraftGroup.scale.x = 0.02
spacecraftGroup.scale.y = 0.02
spacecraftGroup.scale.z = 0.02
cameraGroup.add(spacecraftGroup)


/**
 * control vaisseau test
 */
//init des touches

const keyboard = {}
keyboard.up = false
keyboard.right = false
keyboard.down = false
keyboard.left = false
keyboard.space = false
keyboard.w = false


document.addEventListener('keydown', (_event) =>
{
    console.log(_event.code)
    switch(_event.code)
    {
        case 'ArrowUp':
            keyboard.up = true
    }
    switch(_event.code)
    {
        case 'ArrowRight':
            keyboard.right = true
    }
    switch(_event.code)
    {
        case 'ArrowDown':
            keyboard.down = true
    }
    switch(_event.code)
    {
        case 'ArrowLeft':
            keyboard.left = true
    }
    switch(_event.code)
    {
        case 'Space':
            keyboard.space = true
    }
    switch(_event.code)
    {
        case 'KeyZ':
            keyboard.w = true
    }
    
})

document.addEventListener('keyup', (_event) =>
{
    console.log(_event.code)

    switch(_event.code)
    {
        case 'ArrowUp':
            keyboard.up = false
    }
    switch(_event.code)
    {
        case 'ArrowRight':
            keyboard.right = false
    }
    switch(_event.code)
    {
        case 'ArrowDown':
            keyboard.down = false
    }
    switch(_event.code)
    {
        case 'ArrowLeft':
            keyboard.left = false
    }
    switch(_event.code)
    {
        case 'Space':
            keyboard.space = false
    }
    switch(_event.code)
    {
        case 'KeyZ':
            keyboard.w = false
    }
})





// Load model
gltfLoader.load(
    'models/vaisseau.gltf',
    (gltf) =>
    {
        console.log('success')
        console.log(gltf)

        while(gltf.scene.children.length)
        {
            spacecraftGroup.add(gltf.scene.children[0])
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
 * environnement
 */
const material = new THREE.MeshStandardMaterial({
    color : 0xff0000,
    roughness: 0.3,
    metalness: 0.6
})



// obstacle
const obstacleGeometry = new THREE.BoxBufferGeometry(1, 1, 1, 1, 1, 1)
obstacleGeometry.translate(0, 0.5, 0)

for(let i = 0; i < 300; i++)
{
    const obstacle = new THREE.Mesh(
        obstacleGeometry,
        material,
    )
    obstacle.position.x = (Math.random() + 0.1) * 45
    obstacle.position.z = (Math.random()) * 1000
    obstacle.position.y = (Math.random() - 0.5) * 50
    obstacle.scale.x = 1 + Math.random() * 5
    obstacle.scale.z = 1 + Math.random() * 5
    obstacle.scale.y = 1 + Math.random() * 12
    scene.add(obstacle)
}

for(let i = 0; i < 300; i++)
{
    const obstacle = new THREE.Mesh(
        obstacleGeometry,
        material
    )
    obstacle.position.x = (Math.random() - 1.1) * 45
    obstacle.position.z = (Math.random()) * 1000
    obstacle.position.y = (Math.random() - 0.5) * 50
    obstacle.scale.x = 1 + Math.random() * 5
    obstacle.scale.z = 1 + Math.random() * 5
    obstacle.scale.y = 1 + Math.random() * 12
    scene.add(obstacle)
}



/**
 * Particules
 */
const particlesGeometry = new THREE.Geometry()
for (let k = 0; k < 100000; k++) {
    // Vertice
    const vertice = new THREE.Vector3(
        (Math.random() - 0.5) * 1000,
        (Math.random() - 0.5) * 1000,
        (Math.random() - 0.5) * 1000,
    )
    particlesGeometry.vertices.push(vertice)
    // Color
    const color = new THREE.Color(0xffffff)
    particlesGeometry.colors.push(color)
}
const particlesMaterial = new THREE.PointsMaterial({
    vertexColors: true,
    size: 0.5,
    alphaMap: particlesTexture,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
}

)

const particles = new THREE.Points(particlesGeometry, particlesMaterial)

scene.add(particles)




/**
 * Loop
 */
const loop = () =>
{
    window.requestAnimationFrame(loop)

    // Update controls
    controls.update()

    

    //condition pour les touches
    

    if(keyboard.up == true && keyboard.down == false && keyboard.left == false && keyboard.right == false){
        spacecraftGroup.rotation.x = -0.2;
        spacecraftGroup.position.y += 2
    }
    else if (keyboard.up == false && keyboard.down == true && keyboard.left == false && keyboard.right == false){
        spacecraftGroup.rotation.x = 0.2;
        spacecraftGroup.position.y += -2
    }
    else if (keyboard.up == false && keyboard.down == false && keyboard.left == true && keyboard.right == false){
        spacecraftGroup.rotation.z = -0.4;
        spacecraftGroup.position.x += 2
        
    }
    else if (keyboard.up == false && keyboard.down == false && keyboard.left == false && keyboard.right == true){
        spacecraftGroup.rotation.z = 0.4;
        spacecraftGroup.position.x += -2
    }
    else{
        spacecraftGroup.rotation.x = 0
        spacecraftGroup.rotation.y = 0
        spacecraftGroup.rotation.z = 0
    }
    if(keyboard.w == true){
        spacecraftGroup.position.z += -3
    }
    if(keyboard.space == true){
        spacecraftGroup.position.z += 3
    }

    //control camera
    camera.position.x =  spacecraftGroup.position.x 
    camera.position.y = spacecraftGroup.position.y + 10
    camera.position.z = spacecraftGroup.position.z - 20
    camera.lookAt(spacecraftGroup.position)


//animation particule
    for(const vertice of particlesGeometry.vertices){
        vertice.y += Math.sin(Date.now() * 0.001 + vertice.x * 100) * 0.05
    }
    particlesGeometry.verticesNeedUpdate = true

    //animation shader (pas réussi)


    // Render
    renderer.render(scene, camera)
}

loop()