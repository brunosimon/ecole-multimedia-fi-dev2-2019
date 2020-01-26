import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import particleImageSource from './assets/images/textures/particles/4.png'


import globeDiffuseImageSource from './assets/images/textures/planet/globe/diffuse.jpg'
import globeMetalnessImageSource from './assets/images/textures/planet/globe/metalness.jpg'
import globeNormalImageSource from './assets/images/textures/planet/globe/normal.jpg'
import globeRoughnessImageSource from './assets/images/textures/planet/globe/roughness.jpg'
import sunImageSource from './assets/images/textures/planet/sun.jpg'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

/**
 * GLTFLoader
 */
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load(particleImageSource)

const globeDiffuseTexture = textureLoader.load(globeDiffuseImageSource)
const globeMetalnessTexture = textureLoader.load(globeMetalnessImageSource)
const globeNormalTexture = textureLoader.load(globeNormalImageSource)
const globeRoughnessTexture = textureLoader.load(globeRoughnessImageSource)
const sunTexture = textureLoader.load(sunImageSource)




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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 10000)
camera.position.x = 5000


camera.position.y = 70//1000
scene.add(camera)

/**
 * Keyboard
 */
const keyboard = {}
keyboard.up = false

document.addEventListener('keydown', (_event) =>
{
    console.log(_event.code)
    switch(_event.code)
    {
        case 'ArrowUp':
            keyboard.up = true
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
})



/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setClearColor(0x000000, 1)
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
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
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.x = 5
directionalLight.position.y = 5
directionalLight.position.z = 5
scene.add(directionalLight)



// Load model
const vs = new THREE.Group()
vs.rotation.y = -Math.PI * 0.5
vs.position.x = 4500
vs.scale.x = 0.5
vs.scale.y = 0.5
vs.scale.z = 0.5

scene.add(vs)

gltfLoader.load(
    './space/myship_texture_4_export.glb',
    (gltf) =>
    {
        console.log('success')
        console.log(gltf)

        while(gltf.scene.children.length)
        {
            const child = gltf.scene.children[0]
            vs.add(child)
        }
    },
    undefined,
    (error) =>
    {
        console.log('error')
        console.log(error)
    }
    
)



// stars
const starsGeometry = new THREE.Geometry()

for(let i = 0; i < 20000; i++)
{
    // Vertice
    const vertice = new THREE.Vector3(
        (Math.random() - 0.5) * 25000,
        (Math.random() - 0.5) * 25000,
        (Math.random() - 0.5) * 25000
    )
    starsGeometry.vertices.push(vertice)


}

// Material
const starsMaterial = new THREE.PointsMaterial({
    //vertexColors: true,
    size: 80,
    sizeAttenuation: true,
     color: new THREE.Color(0xFFFFFF),
    // map: particleTexture
    alphaMap: particleTexture,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
})

// Points
const stars = new THREE.Points(starsGeometry, starsMaterial)
scene.add(stars)

/**
 * Planet
 */

// Globe
const globe = new THREE.Mesh(
    new THREE.SphereGeometry(300, 64, 64),
    new THREE.MeshStandardMaterial({
        map: globeDiffuseTexture,
        metalnessMap: globeMetalnessTexture,
        roughnessMap: globeRoughnessTexture,
        normalMap: globeNormalTexture
        
    })
    
)
globe.position.z = -1000
globe.position.x = 3000
scene.add(globe)

 

// SUN
const sun = new THREE.Mesh(
    new THREE.SphereGeometry(1000, 64, 64),
    new THREE.MeshBasicMaterial({
        map: sunTexture,
        metalnessMap: globeMetalnessTexture,
        roughnessMap: globeRoughnessTexture,
        normalMap: globeNormalTexture,
        
        
    })
    
)
sun.position.z = 800
sun.position.x = 2000
scene.add(sun)


/**
 * galaxy light
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

    x += (Math.random() - 0.5) * Math.random() * 5000
    y += (Math.random() - 0.5) * Math.random() * 3000
    z += (Math.random() - 0.5) * Math.random() * 5000

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

// Material
const particlesMaterial = new THREE.PointsMaterial({
    vertexColors: true,
    size: 0.03,
    sizeAttenuation: true,
    // color: new THREE.Color(0xff0000),
    // map: particleTexture
    alphaMap: particleTexture,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
})

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)


/**
 * GALAXY
 */
// Geometry
const particlesGeometry2 = new THREE.Geometry()
const galaxyRadius2 = 1000

for(let i = 0; i < 500000; i++)
{
    // Vertice2
    const progress = Math.pow(Math.random(), 4)
    const angle = progress * 15
    const distance = progress * galaxyRadius2
    let x = Math.sin(angle) * distance
    let y = 0
    let z = Math.cos(angle) * distance

    x += (Math.random() - 0.5) * Math.random() * 200
    y += (Math.random() - 0.5) * Math.random() * 50
    z += (Math.random() - 0.5) * Math.random() * 200

    const vertice2 = new THREE.Vector3(x, y, z)
    particlesGeometry2.vertices.push(vertice2)

    // Color
    const innerColor = new THREE.Color(0xffae33)
    const outerColor = new THREE.Color (0x6033ff)
    const color = new THREE.Color()
    color.r = innerColor.r + (outerColor.r - innerColor.r) * progress
    color.g = innerColor.g + (outerColor.g - innerColor.g) * progress
    color.b = innerColor.b + (outerColor.b - innerColor.b) * progress

    particlesGeometry2.colors.push(color)
    
}

// Material
const particlesMaterial2 = new THREE.PointsMaterial({
    vertexColors: true,
    size: 0.03,
    sizeAttenuation: true,
    // color: new THREE.Color(0xff0000),
    // map: particleTexture
    alphaMap: particleTexture,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
})

// Points
const particles2 = new THREE.Points(particlesGeometry2, particlesMaterial2)
particles2.rotation.z = Math.PI * -0.2
scene.add(particles2)




/**
 * Loop
 */
const loop = () =>
{
    window.requestAnimationFrame(loop)

    // // Particles
    // stars

    for(const vertice of starsGeometry.vertices)
    {
        vertice.y += Math.sin(Date.now() * 0.001 + vertice.x * 1000) * 0.01
    }

    // Update controls

    controls.update()

    //stars//galaxy

    particles.rotation.y -= 0.001
    particles2.rotation.y -= 0.001
    
    if (keyboard.up ){
        stars.position.x += 200
        globe.position.x +=100
        sun.position.x +=100
        particles2.scale.y += 0.02 
        particles2.scale.x += 0.02
        particles2.scale.z += 0.02
    }

    if (keyboard.down ){
        stars.position.x -= 200
        globe.position.x -=100
        sun.position.x -=100
        particles2.scale.x -= 0.02
        particles2.scale.z -= 0.02
        particles2.scale.y -= 0.02

    }
    //planet
    globe.rotation.y -= 0.001

    //vs
    vs.position.y = Math.sin(Date.now() / 500)

    // Render
    renderer.render(scene, camera)
}    

loop()