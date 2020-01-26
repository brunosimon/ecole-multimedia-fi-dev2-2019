import * as THREE from 'three'
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { DoubleSide, Vector3 } from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { DotScreenShader } from 'three/examples/jsm/shaders/DotScreenShader.js'
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js'
import { PixelShader } from 'three/examples/jsm/shaders/PixelShader.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import spaceImageSource from './assets/images/space/space.jpg'
import earthImageSource from './assets/images/space/earth.jpg'
import venusImageSource from './assets/images/space/venus.jpg'
import mercuryImageSource from './assets/images/space/mercury.jpg'
import sunImageSource from './assets/images/space/sun.jpg'
import marsImageSource from './assets/images/space/mars.jpg'
import earthFogImageSource from './assets/images/space/earthFog.jpg'
console.log(UnrealBloomPass)

/**
 * GLTFLoader
 */
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')
const gltfLoader = new GLTFLoader()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const spaceTextureSource = textureLoader.load(spaceImageSource)
const earthTextureSource = textureLoader.load(earthImageSource)
const marsTextureSource = textureLoader.load(marsImageSource)
const sunTextureSource = textureLoader.load(sunImageSource)
const mercuryTextureSource = textureLoader.load(mercuryImageSource)
const venusTextureSource = textureLoader.load(venusImageSource)
const earthFogTextureSource = textureLoader.load(earthFogImageSource)

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

// Load model
const spaceshipgroup = new THREE.Group()
spaceshipgroup.scale.set(0.001, 0.001, 0.001)
gltfLoader.load(
    'models/ship/glTF/vaisseau.gltf',
    (gltf) => {
        console.log('success')
        console.log(gltf)

        while (gltf.scene.children.length) {
            const child = gltf.scene.children[0]
            spaceshipgroup.add(child)
        }
    },
    undefined,
    (error) => {
        console.log('error')
        console.log(error)
    }
)
/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 120000)

spaceshipgroup.position.set(0, 0, -5)
camera.position.z = 0
camera.position.x = 360
camera.position.y = 0.2
spaceshipgroup.rotation.y = Math.PI
camera.add(spaceshipgroup)
scene.add(camera)
camera.lookAt(new THREE.Vector3(0,0,0))

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setClearColor(0xffffff, 1)
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)
/**
 * pLANETS
 */
const planetGeometry = new THREE.SphereGeometry(1, 32, 32)
const planetSizes = [250, 250, 100, 150, 30000];
const planetPosZ = [0, 2000, 4000, -2000, 60000]
const planetTextures = [earthTextureSource, venusTextureSource, mercuryTextureSource, marsTextureSource, sunTextureSource];
for (let i = 0; i < planetSizes.length; i++) {
    const planet = new THREE.Mesh(
        planetGeometry,
        new THREE.MeshStandardMaterial({
            side: DoubleSide,
            map: planetTextures[i]
        })
    )
    planet.scale.x = planetSizes[i];
    planet.scale.y = planetSizes[i];
    planet.scale.z = planetSizes[i];
    planet.position.z = planetPosZ[i];
    scene.add(planet)
}
const earthFog = new THREE.Mesh(
    new THREE.SphereGeometry(253, 32, 32),
    new THREE.MeshStandardMaterial({
        side: DoubleSide,
        alphaMap: earthFogTextureSource,
        transparent: true
    })
)
scene.add(earthFog)

const space = new THREE.Mesh(
    new THREE.SphereGeometry(100000, 32, 32),
    new THREE.MeshStandardMaterial({
        map: spaceTextureSource,
        side: DoubleSide
    })
)
scene.add(space)

/**
 * Effect composer
 */
const effectComposer = new EffectComposer(renderer)
const renderPass = new RenderPass(scene, camera)
effectComposer.addPass(renderPass)

//  const dotScreenPass = new ShaderPass(DotScreenShader)
//  console.log(dotScreenPass)
//  dotScreenPass.uniforms.scale.value = 5
//  effectComposer.addPass(dotScreenPass)

const rgbShiftPass = new ShaderPass(RGBShiftShader)
rgbShiftPass.uniforms.amount.value = 0.0003
effectComposer.addPass(rgbShiftPass)

// const pixelPass = new ShaderPass(PixelShader)
// pixelPass.uniforms.pixelSize.value = 5
// pixelPass.uniforms.resolution.value = new THREE.Vector2(sizes.width, sizes.height)
// effectComposer.addPass(pixelPass)

const unrealBloomPass = new UnrealBloomPass(new THREE.Vector2(sizes.width, sizes.height))
unrealBloomPass.strength = 0.8
unrealBloomPass.radius = 0.4
unrealBloomPass.threshold = 0.05
effectComposer.addPass(unrealBloomPass)

/**
 * Fly controls
 */
const controls = new FlyControls(camera, renderer.domElement)
controls.rollSpeed = 1
controls.movementSpeed = 20

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.x = 5
directionalLight.position.y = 5
directionalLight.position.z = 60000
scene.add(directionalLight)
directionalLight.lookAt(new THREE.Vector3(0, 0, 0))


/**
 * Loop
 */
const clock = new THREE.Clock
const loop = () => {
    window.requestAnimationFrame(loop)
    let delta = clock.getDelta()

    // Update controls
    controls.update(delta)

    //Animation
    earthFog.rotation.y += 0.0001

    // Update Spaceship
    spaceshipgroup.rotation.x -= (cursor.y + spaceshipgroup.rotation.x) / 15
    spaceshipgroup.rotation.y -= (cursor.x + spaceshipgroup.rotation.y + Math.PI) / 15

    // Render
    effectComposer.render(scene, camera)

}

loop()