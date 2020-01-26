import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import planetImagesource from './assets/images/planet/globe/diffuse.jpg'
import fragmentShader from './shader/fragment.glsl'
import vertexShader from './shader/vertex.glsl'
import sunImageSource from './assets/images/planet/sun.jpeg'
import merImageSource from './assets/images/planet/mer.jpeg'
import venImageSource from './assets/images/planet/ven.jpg'
import marsImageSource from './assets/images/planet/mars.png'
import feuImageSource from './assets/images/planet/feu.jpg'
import globeMetalnessImageSource from './assets/images/planet/globe/metalness.jpg'
import globeNormalImageSource from './assets/images/planet/globe/normal.jpg'
import globeRoughnessImageSource from './assets/images/planet/globe/roughness.jpg'
import globeAlphaImageSource from './assets/images/planet/clouds/alpha.jpg'
import particulesImageSource from './assets/images/particule/star_06.png'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { DotScreenShader } from 'three/examples/jsm/shaders/DotScreenShader.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'







/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const gltfLoader = new GLTFLoader()
const sunTexture = textureLoader.load(sunImageSource)
const merTexture = textureLoader.load(merImageSource)
const venTexture = textureLoader.load(venImageSource)
const planetTexture = textureLoader.load(planetImagesource)
const globeMetalnessTexture = textureLoader.load(globeMetalnessImageSource)
const globeNormalTexture = textureLoader.load(globeNormalImageSource)
const globeRoughnessTexture = textureLoader.load(globeRoughnessImageSource)
const cloudsAlphaTexture = textureLoader.load(globeAlphaImageSource)
const particuleTexture = textureLoader.load(particulesImageSource)
const marsTexture = textureLoader.load(marsImageSource)
const feuTexture = textureLoader.load(feuImageSource)
sunTexture.wrapS = THREE.RepeatWrapping;
sunTexture.wrapT = THREE.RepeatWrapping;
sunTexture.repeat.set(8, 8);
/**
 * Scene
 */
const scene = new THREE.Scene()

// Globe
const sun = new THREE.Mesh(
    new THREE.SphereGeometry(50, 100, 100),
    new THREE.MeshBasicMaterial({
        map: sunTexture,
        alphaMap: cloudsAlphaTexture,
        transparent: false,

    })

)
scene.add(sun)

const terre = new THREE.Mesh(
    new THREE.SphereGeometry(20, 100, 100),
    new THREE.MeshStandardMaterial({
        map: planetTexture,
        metalnessMap: globeMetalnessTexture,
        roughnessMap: globeRoughnessTexture,
        normalMap: globeNormalTexture,
        transparent: false,

    })

)

scene.add(terre)


const clouds = new THREE.Mesh(
    new THREE.SphereGeometry(21, 100, 100),
    new THREE.MeshStandardMaterial({
        alphaMap: cloudsAlphaTexture,
        transparent: true
    }))
clouds.position.z = terre.position.z
clouds.position.y = terre.position.y
clouds.position.x = terre.position.x

scene.add(clouds)

const mercure = new THREE.Mesh(
    new THREE.SphereGeometry(15, 100, 100),
    new THREE.MeshStandardMaterial({
        map: merTexture,


    })

)

scene.add(mercure)

const venus = new THREE.Mesh(
    new THREE.SphereGeometry(20, 100, 100),
    new THREE.MeshStandardMaterial({
        map: venTexture,


    })


)

scene.add(venus)

const mars = new THREE.Mesh(
    new THREE.SphereGeometry(15, 100, 100),
    new THREE.MeshStandardMaterial({
        map: marsTexture,


    })


)

scene.add(mars)

const geometry = new THREE.RingBufferGeometry(80.5, 80, 100, 30, 0, 6.3);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
const mesh = new THREE.Mesh(geometry, material);
mesh.rotation.x = Math.PI * 0.5
scene.add(mesh);

const geometry1 = new THREE.RingBufferGeometry(110.5, 110, 100, 30, 0, 6.3);
const material1 = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
const mesh1 = new THREE.Mesh(geometry1, material1);
mesh1.rotation.x = Math.PI * 0.5
scene.add(mesh1);

const geometry2 = new THREE.RingBufferGeometry(150.5, 150, 100, 30, 0, 6.3);
const material2 = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
const mesh2 = new THREE.Mesh(geometry2, material2);
mesh2.rotation.x = Math.PI * 0.5
scene.add(mesh2);

const geometry3 = new THREE.RingBufferGeometry(200.5, 200, 100, 30, 0, 6.3);
const material3 = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
const mesh3 = new THREE.Mesh(geometry3, material3);
mesh3.rotation.x = Math.PI * 0.5
scene.add(mesh3);






/**
 * Sizes
 */
const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight

window.addEventListener('resize', () => {
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

window.addEventListener('mousemove', (_event) => {
    cursor.x = _event.clientX / sizes.width - 0.5
    cursor.y = _event.clientY / sizes.height - 0.5
})




/**
 * Lights
 */
const sunLight = new THREE.PointLight(0xffcccc, 0.3)
sunLight.position.x = 0
sunLight.position.z = 0

scene.add(sunLight)





/**
 * keybord
 */

const keyboard = {}
keyboard.up = false
keyboard.down = false
keyboard.left = false
keyboard.right = false
keyboard.space = false

document.addEventListener('keydown', (_event) => {
    // console.log(_event)
    switch (_event.code) {
        case 'KeyQ':
        case 'ArrowUp':
            keyboard.up = true
            break;
        case 'KeyD':
        case 'ArrowRight':
            keyboard.right = true
            break;
        case 'KeyS':
        case 'ArrowLeft':
            keyboard.left = true
            break;
        case 'KeyA':
        case 'ArrowDown':
            keyboard.down = true
            break;
        case 'Space':
            keyboard.space = true
    }
})

document.addEventListener('keyup', (_event) => {
    console.log(_event)
    switch (_event.code) {
        case 'keyQ':
        case 'ArrowUp':
            keyboard.up = false
            break;
        case 'keyD':
        case 'ArrowRight':
            keyboard.right = false
            break;
        case 'keyS':
        case 'ArrowLeft':
            keyboard.left = false
            break;
        case 'keyA':
        case 'ArrowDown':
            keyboard.down = false
            break;
        case 'Space':
            keyboard.space = false
    }
})


/**
 * Asteroid
 */
const shaderGeometry = new THREE.SphereBufferGeometry(0.6, 12, 12)
const shaderMaterial = new THREE.ShaderMaterial({
    // wireframe: true,
    vertexShader,
    fragmentShader,
    uniforms: {
        uFrequency: { value: 80 },
        form2: { value: 2 },
        uTime: { value: 0 }
    },


})

const Asteroid = new THREE.Group()

for (let k = 0; k < 6000; k++) {

    const shaderMesh = new THREE.Mesh(shaderGeometry, shaderMaterial)
    shaderMesh.position.y = (Math.random() - 0.5) * 800
    shaderMesh.position.x = (Math.random() - 0.5) * 800
    shaderMesh.position.z = (Math.random() - 0.5) * 800


    Asteroid.add(shaderMesh)
    scene.add(Asteroid)
}


const spaceshipGroup = new THREE.Group()
spaceshipGroup.scale.set(0.02, 0.02, 0.02)
spaceshipGroup.rotation.y = Math.PI
spaceshipGroup.position.z = 500
spaceshipGroup.position.y = 0
scene.add(spaceshipGroup)

const spaceshipLight = new THREE.PointLight(0xff8888, 0.5)
spaceshipLight.position.x = spaceshipGroup.position.x
spaceshipLight.position.z = spaceshipGroup.position.z
scene.add(spaceshipLight)


/**
 * Particules
 */
const particulesGeometry = new THREE.Geometry()
const galaxyRadius = 30
for (let k = 0; k < 100; k++) {

    const x = (Math.random() - 0.5) * 300
    const y = Math.random() + 20
    const z = Math.random() * Math.PI * 100 + 5

    const vertice = new THREE.Vector3(x, y, z)

    particulesGeometry.vertices.push(vertice)

}
const particulesMaterial = new THREE.PointsMaterial({
        size: 40,
        color: 0xff0000,
        alphaMap: particuleTexture,
        transparent: true,

    }

)

const particules = new THREE.Points(particulesGeometry, particulesMaterial)


spaceshipGroup.add(particules)
    /**
     * Camera
     */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100000)

camera.position.z = -500
camera.position.y = 250
camera.lookAt(new THREE.Vector3())
spaceshipGroup.add(camera)
    // scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setClearColor(0x000000, 1)
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)

// effect

const effectComposer = new EffectComposer(renderer)
window.addEventListener('resize', () => {
    /* ... */

    // Update effect composer
    effectComposer.setSize(sizes.width, sizes.height)

    /* ... */
})
const renderPass = new RenderPass(scene, camera)
effectComposer.addPass(renderPass)


const unrealPass = new UnrealBloomPass(new THREE.Vector2(sizes.width, sizes.height))
unrealPass.strength = 0.6
unrealPass.radius = 0.4
unrealPass.threshold = 0.05
effectComposer.addPass(unrealPass)

const pointLight = new THREE.PointLight(0xffcccc, 0.9)


scene.add(pointLight)

const spaceshipMoove = new THREE.Group()
spaceshipMoove.position.x = spaceshipGroup.position.x = Math.sin(Date.now() / 1000)
spaceshipMoove.position.y = spaceshipGroup.position.y = Math.sin(Date.now() / 2000)

spaceshipGroup.add(spaceshipMoove)

gltfLoader.load(
    '/helmet/LeRequin.glb',
    (gltf) => {
        // console.log('success')
        // console.log(gltf)
        while (gltf.scene.children.length) {
            const child = gltf.scene.children[0]
            child.scale.set(0.5, 0.5, 0.5)
                // spaceshipGroup.add(child)
            spaceshipMoove.add(child)
        }
    },
    (progress) => {
        // console.log('progress')
        // console.log(progress)
    },
    (error) => {
        // console.log('error')
        // console.log(error)
    },
)




// RotationSun
let planetAngle = 0
const systemeSolaire = new THREE.Group()
systemeSolaire.position.x = 0
systemeSolaire.position.z = 0
systemeSolaire.add(terre, venus, mercure, sun, clouds, mesh, mesh1, mesh2, mars, mesh3)
systemeSolaire.rotation.x = 0.5
scene.add(systemeSolaire)



/**
 * Loop
 */
const startTime = Date.now()



const loop = () => {
    window.requestAnimationFrame(loop)
    const elaspedTime = Date.now() - startTime
    planetAngle += 0.005
    terre.position.x = Math.sin(planetAngle) * -110
    terre.position.z = Math.cos(planetAngle) * -110
    clouds.position.x = Math.sin(planetAngle) * -110
    clouds.position.z = Math.cos(planetAngle) * -110
    mercure.position.x = Math.cos(planetAngle) * 70
    mercure.position.z = Math.sin(planetAngle) * 70
    venus.position.x = Math.sin(planetAngle) * 150
    venus.position.z = Math.cos(planetAngle) * 150
    mars.position.x = Math.cos(planetAngle) * -200
    mars.position.z = Math.sin(planetAngle) * -200
    Asteroid.position.x = Math.sin(planetAngle) * 10
    Asteroid.position.z = Math.cos(planetAngle) * 10

    // Update controls
    const speed = keyboard.space ? 5 : 1
    const speedX = Math.sin(spaceshipGroup.rotation.y) * speed
    const speedZ = Math.cos(spaceshipGroup.rotation.y) * speed

    if (keyboard.down) {
        spaceshipGroup.position.x -= speedX
        spaceshipGroup.position.z -= speedZ
    }
    if (keyboard.up) {
        spaceshipGroup.position.x += speedX
        spaceshipGroup.position.z += speedZ
    }
    if (keyboard.left) {
        spaceshipGroup.rotation.y += 0.005
    }
    if (keyboard.right) {

        spaceshipGroup.rotation.y += -0.005
    }

    spaceshipMoove.position.x = Math.sin(Date.now() / 1000)
    spaceshipMoove.position.y = Math.sin(Date.now() / 2000)
        // for (let k = 0; k < particules.rotation.x; k++) {

    //     particules.position.x = Math.sin(Date.now() / 1000)
    //     particules.position.y = Math.sin(Date.now() / 2000)
    // }



    sun.rotation.y += -0.005
    mercure.rotation.y += 0.005
    venus.rotation.y += 0.005




    clouds.rotation.y += 0.005
    terre.rotation.y += -0.0005

    // Render
    effectComposer.render(scene, camera)

}

loop()