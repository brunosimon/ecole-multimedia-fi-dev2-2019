import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { DotScreenShader } from 'three/examples/jsm/shaders/DotScreenShader.js'
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js'
import { PixelShader } from 'three/examples/jsm/shaders/PixelShader.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

/**
 * GLTF Loader
 */
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

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

    // Update effect composer
    effectComposer.setSize(sizes.width, sizes.height)

    // // Update passes
    // pixelPass.uniforms.resolution.value.x = sizes.width
    // pixelPass.uniforms.resolution.value.y = sizes.height

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
camera.position.z = 2
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
renderer.setClearColor(0xffffff, 1)
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
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
directionalLight.position.x = 5
directionalLight.position.y = 5
directionalLight.position.z = 5
scene.add(directionalLight)

/**
 * Model
 */
const modelGroup = new THREE.Group()
modelGroup.scale.set(1, 1, 1)
modelGroup.rotation.y = - Math.PI * 0.5
scene.add(modelGroup)

gltfLoader.load(
    'models/DamagedHelmet.glb',
    (gltf) =>
    {
        console.log('success')
        while(gltf.scene.children.length)
        {
            const child = gltf.scene.children[0]
            modelGroup.add(child)
        }
    }
)

/**
 * Postprocess
 */
const effectComposer = new EffectComposer(renderer)

const renderPass = new RenderPass(scene, camera)
effectComposer.addPass(renderPass)

// // Dot pass
// const dotPass = new ShaderPass(DotScreenShader)
// dotPass.uniforms.scale.value = 2
// effectComposer.addPass(dotPass)

// // RGB Shift pass
// const rgbShiftPass = new ShaderPass(RGBShiftShader)
// rgbShiftPass.uniforms.amount.value = 0.005
// effectComposer.addPass(rgbShiftPass)

// // Pixel pass
// const pixelPass = new ShaderPass(PixelShader)
// pixelPass.uniforms.pixelSize.value = 10
// pixelPass.uniforms.resolution.value = new THREE.Vector2(sizes.width, sizes.height)
// effectComposer.addPass(pixelPass)

// // Unreal pass
// const unrealPass = new UnrealBloomPass(new THREE.Vector2(sizes.width, sizes.height))
// unrealPass.strength = 0.6
// unrealPass.radius = 0.4
// unrealPass.threshold = 0.05
// effectComposer.addPass(unrealPass)

// Custom pass
const customPass = new ShaderPass({
    vertexShader: `
        varying vec2 vUv;

        void main()
        {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform sampler2D tDiffuse;

        varying vec2 vUv;

        float random(vec2 st)
        {
            return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }

        void main()
        {
            vec4 color = texture2D(tDiffuse, vUv);

            color.r += (random(vUv + 0.0) - 0.5) * 0.35;
            color.g += (random(vUv + 0.1) - 0.5) * 0.35;
            color.b += (random(vUv + 0.2) - 0.5) * 0.35;

            gl_FragColor = color;
        }
    `,
    uniforms:
    {
        tDiffuse: { value: null }
    }
})
effectComposer.addPass(customPass)

/**
 * Loop
 */
const loop = () =>
{
    window.requestAnimationFrame(loop)

    // Update controls
    controls.update()

    // Render
    effectComposer.render(scene, camera)
}

loop()