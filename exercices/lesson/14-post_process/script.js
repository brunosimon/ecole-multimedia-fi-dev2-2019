import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { DotScreenShader } from 'three/examples/jsm/shaders/DotScreenShader.js'
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js'
import { PixelShader } from 'three/examples/jsm/shaders/PixelShader.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js'

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

    pixelPass.uniforms.resolution.value.x = sizes.width
    pixelPass.uniforms.resolution.value.y = sizes.height

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
camera.position.y = 0.2
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setClearColor(0xffffff, 1)
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)

/**
 * Effect composer
 */
const effectComposer = new EffectComposer(renderer)

const renderPass = new RenderPass(scene, camera)
effectComposer.addPass(renderPass)

const dotScreenPass = new ShaderPass(DotScreenShader)
dotScreenPass.uniforms.scale.value = 3
// effectComposer.addPass(dotScreenPass)

const rgbShiftPass = new ShaderPass(RGBShiftShader)
rgbShiftPass.uniforms.amount.value = 0.003
effectComposer.addPass(rgbShiftPass)

const pixelPass = new ShaderPass(PixelShader)
pixelPass.uniforms.pixelSize.value = 10
pixelPass.uniforms.resolution.value = new THREE.Vector2(sizes.width, sizes.height)
// effectComposer.addPass(pixelPass)

const unrealBloomPass = new UnrealBloomPass(new THREE.Vector2(sizes.width, sizes.height))
unrealBloomPass.strength = 0.6
unrealBloomPass.radius = 0.4
unrealBloomPass.threshold = 0.05
effectComposer.addPass(unrealBloomPass)

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

            // // Tint
            // color.r *= 1.5;

            // Vignette
            float vignette = 1.0 - distance(vUv, vec2(0.5, 0.5));
            color.rgb *= vec3(vignette);

            // Noise
            color.r += (random(vUv + 0.0) - 0.5) * 0.25;
            color.g += (random(vUv + 0.4) - 0.5) * 0.25;
            color.b += (random(vUv + 0.9) - 0.5) * 0.25;

            // // Black and white
            // float grey = (color.r + color.g + color.b) / 3.0;
            // color.r = grey;
            // color.g = grey;
            // color.b = grey;

            gl_FragColor = color;
        }
    `,
    uniforms:
    {
        tDiffuse: { value: null }
    }
})
// effectComposer.addPass(customPass)

const glitchPass = new GlitchPass()
// glitchPass.goWild = true
// glitchPass.enabled = false
effectComposer.addPass(glitchPass)

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

/**
 * Model
 */

// Load model
const spaceshipGroup = new THREE.Group()
scene.add(spaceshipGroup)

gltfLoader.load(
    'models/DamagedHelmet.glb',
    (gltf) =>
    {
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