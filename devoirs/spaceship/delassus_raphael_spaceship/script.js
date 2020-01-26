import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { gsap } from "gsap"
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js'
import { Lensflare, LensflareElement} from 'three/examples/jsm/objects/Lensflare.js'
import { DoubleSide, FontLoader } from 'three'

import planetMatcapSource from './assets/matcap/planet2.jpg'
import selectorTextureSource from './assets/maps/selector.png'
import particulesStarsTextureSource from './assets/particles/9.png'
import lensFlareTextureSource from './assets/particles/1.png'
import sunTextureSource from './assets/maps/sunMap.jpg'
import ReacteurTextureSource from './assets/maps/reactorMap.png'
import rotateMapTextureSource from './assets/maps/rotateMap.jpg'
import rotateAlphaMapTextureSource from './assets/maps/rotateAlphaMap.jpg'

import vertexShader from './assets/shader/vertex.glsl'
import fragmentShader from './assets/shader/fragment.glsl'



/**
 * GLTFLoader
 */
const gltfLoader = new GLTFLoader()

/**
 * fontloader
 */
const fontLoader = new FontLoader()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particulesStarsTexture = textureLoader.load(particulesStarsTextureSource)
const lensFlareTexture2 = textureLoader.load(lensFlareTextureSource)
const planetMatcap = textureLoader.load(planetMatcapSource)
const sunTexture = textureLoader.load(sunTextureSource)
const ReacteurTexture = textureLoader.load(ReacteurTextureSource)
const selector1Texture = textureLoader.load(selectorTextureSource)
const rotateMapTexture = textureLoader.load(rotateMapTextureSource)
const rotateAlphaMapTexture = textureLoader.load(rotateAlphaMapTextureSource)

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
 * Camera
 */
const camera = new THREE.PerspectiveCamera(80, sizes.width / sizes.height, 0.1, 10000)
camera.position.z = -420
camera.position.x = -200
camera.position.y = -400
scene.add(camera)

/**
 * sound
 */
const listener = new THREE.AudioListener();
camera.add( listener );

const backgroundMusic = new THREE.Audio( listener );

const audioLoader = new THREE.AudioLoader();

audioLoader.load( 'sound/ftl.mp3', function( buffer ) {
    backgroundMusic.setBuffer( buffer );
    backgroundMusic.setLoop(true);
    backgroundMusic.setVolume(0.5);
    backgroundMusic.play();
});




/**
 * Cursor
 */
const cursor = {}
cursor.x = 0
cursor.y = 0

var raycasterMouse = new THREE.Vector2()
window.addEventListener('mousemove', (_event) =>
{
    cursor.x = _event.clientX / sizes.width - 0.5
    cursor.y = _event.clientY / sizes.height - 0.5

    raycasterMouse.x = ( _event.clientX / window.innerWidth ) * 2 - 1
    raycasterMouse.y = - ( _event.clientY / window.innerHeight ) * 2 + 1
})

const backgroundGroup = new THREE.Group()
scene.add(backgroundGroup)

/**
 *animation 
 */
gsap.to(camera.position,{duration: 2, z: -70,x: 0,y: 0})



/**
 * raycaster
 */
var raycaster = new THREE.Raycaster();
const iris = document.getElementsByClassName("iris")[0]
const weapons = document.getElementsByClassName("weapons")[0]
const reactor = document.getElementsByClassName("reactor")[0]
const foot = document.getElementsByClassName("foot")[0]
const wigs = document.getElementsByClassName("wigs")[0]
const cockpit = document.getElementsByClassName("cockpit")[0]
const hold = document.getElementsByClassName("hold")[0]
let hoverButtonRotate = false



const ray = () =>{
    raycaster.setFromCamera( raycasterMouse, camera )
    let intersects = raycaster.intersectObjects( scene.children );
    if (intersects.length != 0) {
        switch (intersects[0].object.name) {
        case "weaponsSelector":
            weapons.style.display = 'inline'
            break

        case "IrisSelector":
            iris.style.display = 'inline'            
            break

        case "reactorSelector":
            reactor.style.display = 'inline'            
            break

        case "footSelector":
            foot.style.display = 'inline'            
            break

        case "wigsSelector":
            wigs.style.display = 'inline'            
            break

        case "cockpitSelector":
            cockpit.style.display = 'inline'            
            break

        case "holdSelector":
            hold.style.display = 'inline'            
            break
        
        case "buttonRotate":
            document.body.classList.add("changeCursor")
            hoverButtonRotate = true
            break
        }
    }
    else{
        iris.style.display = 'none'
        weapons.style.display = 'none'
        reactor.style.display = 'none'
        foot.style.display = 'none'
        wigs.style.display = 'none'
        cockpit.style.display = 'none'
        hold.style.display = 'none'
        hoverButtonRotate = false
        document.body.classList.remove("changeCursor")
    }
}


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setClearColor(0x00182f, 1)
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
document.body.appendChild(renderer.domElement)

/**
 * postProcess
 */

const effectComposer = new EffectComposer(renderer)
const renderPass = new RenderPass(scene,camera)
effectComposer.addPass(renderPass)

const rgbShiftPass = new ShaderPass(RGBShiftShader)
rgbShiftPass.uniforms.amount.value = 0.0015
effectComposer.addPass(rgbShiftPass)

const glitchPass = new GlitchPass()
glitchPass.enabled = false
glitchPass.goWild = true
effectComposer.addPass(glitchPass)

const unrealPass = new UnrealBloomPass(new THREE.Vector2(sizes.width, sizes.height))
unrealPass.strength = 0.4
unrealPass.radius = 0.2
unrealPass.threshold = 0.15
effectComposer.addPass(unrealPass)


/**
 * Orbit controls
 */
const controls = new OrbitControls(camera, renderer.domElement)
controls.zoomSpeed = 0.3
controls.enabled = false

///////////   OBJECTS   ////////////////

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
directionalLight.position.x = 250
directionalLight.position.y = -50
directionalLight.position.z = -100
backgroundGroup.add(directionalLight)

//lensflare

const LensFlare = new Lensflare()
LensFlare.addElement( new LensflareElement(lensFlareTexture2,100,0,))
LensFlare.addElement( new LensflareElement(lensFlareTexture2,100,0.1,))
LensFlare.addElement( new LensflareElement(lensFlareTexture2,60,0.13))
LensFlare.addElement( new LensflareElement(lensFlareTexture2,90,0.18))
LensFlare.addElement( new LensflareElement(lensFlareTexture2,30,0.25))
directionalLight.add(LensFlare)

/**
 * Model
 */
// load model
const odysseusGroup = new THREE.Group()
odysseusGroup.scale.set(0.1,0.1,0.1)


const leRequinGroup = new THREE.Group()
leRequinGroup.scale.set(0.11,0.11,0.11)


gltfLoader.load(
    'models/Spaceship/Odysseus.glb',
    (gltf) => {
        while(gltf.scene.children.length)
        {
            odysseusGroup.add(gltf.scene.children[0])
        }
    },
    undefined,
    (error) => {
        console.log("error")
        console.log(error)
    }
)

gltfLoader.load(
    'models/Spaceship/LeRequin.glb',
    (gltf) => {
        while(gltf.scene.children.length)
        {
            leRequinGroup.add(gltf.scene.children[0])
        }
    },
    undefined,
    (error) => {
        console.log("error")
        console.log(error)
    }
)

/**
 * reacteurlight
 */

// odysseusGroup

const reacteurlightGeo = new THREE.PlaneBufferGeometry(100,100)
const reacteurlightMat = new THREE.MeshBasicMaterial({map: ReacteurTexture,transparent:true,opacity:0.6,depthWrite:false,side:DoubleSide,blending: THREE.AdditiveBlending})

const reacteurL1 = new THREE.Mesh(reacteurlightGeo,reacteurlightMat)
reacteurL1.position.x = -450
reacteurL1.position.y = 0
reacteurL1.position.z = 82
reacteurL1.scale.set(1.6,1.6,1.6)
odysseusGroup.add(reacteurL1)
const reacteurL2 = new THREE.Mesh(reacteurlightGeo,reacteurlightMat)
reacteurL2.position.x = -367
reacteurL2.position.y = 0
reacteurL2.position.z = 82.1
reacteurL2.scale.set(1.8,1.8,1.8)
odysseusGroup.add(reacteurL2)


const reacteurR1 = new THREE.Mesh(reacteurlightGeo,reacteurlightMat)
reacteurR1.position.x = 450
reacteurR1.position.y = 0
reacteurR1.position.z = 82
reacteurR1.scale.set(1.8,1.8,1.8)
odysseusGroup.add(reacteurR1)
const reacteurR2 = new THREE.Mesh(reacteurlightGeo,reacteurlightMat)
reacteurR2.position.x = 367
reacteurR2.position.y = 0
reacteurR2.position.z = 82.1
reacteurR2.scale.set(1.8,1.8,1.8)
odysseusGroup.add(reacteurR2)


const reacteurU1 = new THREE.Mesh(reacteurlightGeo,reacteurlightMat)
reacteurU1.position.x = -51
reacteurU1.position.y = 205
reacteurU1.position.z = 90.1
reacteurU1.scale.set(0.7,0.7,0.7)
odysseusGroup.add(reacteurU1)
const reacteurU2 = new THREE.Mesh(reacteurlightGeo,reacteurlightMat)
reacteurU2.position.x = -17
reacteurU2.position.y = 205
reacteurU2.position.z = 90
reacteurU2.scale.set(0.7,0.7,0.7)
odysseusGroup.add(reacteurU2)
const reacteurU3 = new THREE.Mesh(reacteurlightGeo,reacteurlightMat)
reacteurU3.position.x = 17
reacteurU3.position.y = 205
reacteurU3.position.z = 90.1
reacteurU3.scale.set(0.7,0.7,0.7)
odysseusGroup.add(reacteurU3)
const reacteurU4 = new THREE.Mesh(reacteurlightGeo,reacteurlightMat)
reacteurU4.position.x = 51
reacteurU4.position.y = 205
reacteurU4.position.z = 90
reacteurU4.scale.set(0.7,0.7,0.7)
odysseusGroup.add(reacteurU4)

const reacteurB1 = new THREE.Mesh(reacteurlightGeo,reacteurlightMat)
reacteurB1.position.x = -35
reacteurB1.position.y = -195
reacteurB1.position.z = 75.1
reacteurB1.scale.set(1.2,1.2,1.2)
odysseusGroup.add(reacteurB1)
const reacteurB2 = new THREE.Mesh(reacteurlightGeo,reacteurlightMat)
reacteurB2.position.x = 35
reacteurB2.position.y = -195
reacteurB2.position.z = 75
reacteurB2.scale.set(1.2,1.2,1.2)
odysseusGroup.add(reacteurB2)

//leRequinGroup

const reacteurL1Req1 = new THREE.Mesh(reacteurlightGeo,reacteurlightMat)
reacteurL1Req1.position.x = -60
reacteurL1Req1.position.y = -34
reacteurL1Req1.position.z = 5.4
reacteurL1Req1.scale.set(0.4,0.4,0.4)
leRequinGroup.add(reacteurL1Req1)
const reacteurL2Req1 = new THREE.Mesh(reacteurlightGeo,reacteurlightMat)
reacteurL2Req1.position.x = -80
reacteurL2Req1.position.y = -47
reacteurL2Req1.position.z = 4
reacteurL2Req1.scale.set(0.4,0.4,0.4)
leRequinGroup.add(reacteurL2Req1)

const reacteurR1Req1 = new THREE.Mesh(reacteurlightGeo,reacteurlightMat)
reacteurR1Req1.position.x = 60
reacteurR1Req1.position.y = -34
reacteurR1Req1.position.z = 5.4
reacteurR1Req1.scale.set(0.4,0.4,0.4)
leRequinGroup.add(reacteurR1Req1)
const reacteurR2Req1 = new THREE.Mesh(reacteurlightGeo,reacteurlightMat)
reacteurR2Req1.position.x = 80
reacteurR2Req1.position.y = -47
reacteurR2Req1.position.z = 4
reacteurR2Req1.scale.set(0.4,0.4,0.4)
leRequinGroup.add(reacteurR2Req1)

/**
 * font
 */
const textMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
        uTime: {value: 0}
    }
})
fontLoader.load( '/font/font.json', function ( font ) {
    const textGeometry = new THREE.TextGeometry( 'odysseus', {
        font: font,
        size: 60,
        height: 9,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 2,
        bevelSize: 2,
        bevelOffset: 0.4,
        bevelSegments: 2
    })
    const text = new THREE.Mesh(textGeometry,textMaterial)
    text.position.x = 240
    text.position.y = 340
    text.rotation.y = Math.PI
    odysseusGroup.add(text)

    const textGeometry2 = new THREE.TextGeometry( 'Le Requin', {
        font: font,
        size: 60,
        height: 9,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 2,
        bevelSize: 2,
        bevelOffset: 0.4,
        bevelSegments: 2
    })
    const text2 = new THREE.Mesh(textGeometry2,textMaterial)
    text2.position.x = 240
    text2.position.y = 340
    text2.rotation.y = Math.PI
    leRequinGroup.add(text2)

    const textGeometry3 = new THREE.TextGeometry( 'CONTROLES :\nA : change spaceship \nclique : zoom', {
        font: font,
        size: 4.5,
        height: 0.7,
        curveSegments: 1,
    })
    const text3 = new THREE.Mesh(textGeometry3,new THREE.MeshBasicMaterial({}))
    text3.position.x = -25
    text3.position.y = -30
    text3.rotation.y = Math.PI
    backgroundGroup.add(text3)
})

/**
 * selectors
 */
const selectorGeometry = new THREE.PlaneGeometry(7,7)
const selectorMaterial = new THREE.MeshMatcapMaterial({map:selector1Texture,transparent:true})

const weaponsSelector = new THREE.Mesh(
    selectorGeometry,
    selectorMaterial
)
weaponsSelector.name = "weaponsSelector"
weaponsSelector.position.x = 43
weaponsSelector.position.z = -24
weaponsSelector.rotation.y = -3.14


const IrisSelector = new THREE.Mesh(
    selectorGeometry,
    selectorMaterial
    )
IrisSelector.name = "IrisSelector"
IrisSelector.position.x = -10
IrisSelector.position.y = -3
IrisSelector.position.z = -7


const reactorSelector = new THREE.Mesh(
    selectorGeometry,
    selectorMaterial
    )
reactorSelector.name = "reactorSelector"
reactorSelector.position.x = -53
reactorSelector.position.y = 8
reactorSelector.position.z = -9


const footSelector = new THREE.Mesh(
    selectorGeometry,
    selectorMaterial
    )
footSelector.name = "footSelector"
footSelector.position.x = 5
footSelector.position.y = -45
footSelector.position.z = 0

const wigsSelector = new THREE.Mesh(
    selectorGeometry,
    selectorMaterial
    )
wigsSelector.name = "wigsSelector"
wigsSelector.position.x = 7
wigsSelector.position.y = -5
wigsSelector.position.z = -10

const cockpitSelector = new THREE.Mesh(
    selectorGeometry,
    selectorMaterial
    )
cockpitSelector.name = "cockpitSelector"
cockpitSelector.position.x = -6
cockpitSelector.position.y = 6
cockpitSelector.position.z = -8

const holdSelector = new THREE.Mesh(
    selectorGeometry,
    selectorMaterial
    )
holdSelector.name = "holdSelector"
holdSelector.position.x = -3
holdSelector.position.y = -5
holdSelector.position.z = -5


const updateSelectors = () =>{
    if (isOdysseus) {
        scene.add(footSelector)
        scene.remove(wigsSelector)
        scene.remove(cockpitSelector)
        scene.remove(holdSelector)
        if (isFrontVue == true) {
            scene.add(weaponsSelector)
            scene.add(IrisSelector)
            scene.remove(reactorSelector)
        }else{
            scene.remove(weaponsSelector)
            scene.remove(IrisSelector)
            scene.add(reactorSelector)
        }
    }else{
        scene.remove(weaponsSelector)
        scene.remove(IrisSelector)
        scene.remove(reactorSelector)
        scene.remove(footSelector)
        if (isFrontVue == true) {
            scene.add(wigsSelector)
            scene.add(cockpitSelector)
            scene.remove(holdSelector)
        }else{
            scene.add(holdSelector)
            scene.remove(wigsSelector)
            scene.remove(cockpitSelector)
        }
    }
}


/**
 * chose spaceship
 */
let isOdysseus = true
let isFrontVue = true


scene.add(odysseusGroup)

window.addEventListener('keypress',(_event) => {
    if (_event.keyCode == 97) {
        controls.target.set(0,0,0)
        glitchPass.enabled = true
        setTimeout( () => {glitchPass.enabled = false},500)
        if (isOdysseus == true) {
            isOdysseus = false
            scene.remove(odysseusGroup)
            scene.add(leRequinGroup)
        }
        else if (isOdysseus == false) {
            isOdysseus = true
            scene.remove(leRequinGroup)
            scene.add(odysseusGroup)
        }
    }else if(_event.keyCode == 101){
        if( customShaderPass == false){
            RandColorR = Math.random()
            RandColorG = Math.random()
            RandColorB = Math.random()

            customShaderPass = true
        }else{
            customShaderPass = false
        }
    }
})

/**
 * button
 */
const buttonRotate = new THREE.Mesh(
    new THREE.PlaneGeometry(30,30),
    new THREE.MeshBasicMaterial({map: rotateMapTexture, alphaMap: rotateAlphaMapTexture,transparent:true,depthWrite:false})
)

scene.add(buttonRotate)
buttonRotate.position.x = 45
buttonRotate.position.y = 30
buttonRotate.position.z = -10
buttonRotate.name = "buttonRotate"

let zoom = false

window.addEventListener("mousedown", (_event)=>{
    if (hoverButtonRotate == true){
        if (isFrontVue == true) {
            gsap.to(backgroundGroup.rotation,{duration: 0.6, y:Math.PI})
            gsap.to(odysseusGroup.rotation,{duration: 0.6,y: Math.PI})
            gsap.to(leRequinGroup.rotation,{duration: 0.6,y: Math.PI})
            isFrontVue = false
        }else{
            gsap.to(odysseusGroup.rotation,{duration: 0.6,y: 0})
            gsap.to(backgroundGroup.rotation,{duration: 0.6, y:0})
            gsap.to(leRequinGroup.rotation,{duration: 0.6, y:0})
            isFrontVue = true
        }
    }else if(zoom == false){
        gsap.to(camera,{duration:0.7,zoom:2.5})
        zoom = true
    }else{
        zoom = false
        gsap.to(camera,{duration:0.7,zoom:1})
        gsap.to(controls.target,{duration:0.7,x:0,y:0})

    }
})



// ------------   Background  -----------//



/**
 * stars
 */
const particlesGeometry = new THREE.Geometry()

for (let index = 0; index < 2000; index++) {    
    var u = Math.random();
    var v = Math.random();
    var theta = 2 * Math.PI * u;
    var phi = Math.acos(2 * v - 1);

    const vertice = new THREE.Vector3(
        (400 * Math.sin(phi) * Math.cos(theta)),
        (400 * Math.sin(phi) * Math.sin(theta)),
        (400 * Math.cos(phi))
    )
    particlesGeometry.vertices.push(vertice)

    const color = new THREE.Color()
    const randomlight = Math.random()/2 + 0.5

    color.r = randomlight
    color.g = randomlight
    color.b = randomlight
    particlesGeometry.colors.push(color)

}

const particlesMaterial = new THREE.PointsMaterial({
    alphaMap: particulesStarsTexture,
    transparent : true,
    size : 10,
    vertexColors: true
})

const particles = new THREE.Points(particlesGeometry, particlesMaterial)
backgroundGroup.add(particles)


/**
 * planet
 */
const planet = new THREE.Mesh(
    new THREE.IcosahedronBufferGeometry(50,3),
    new THREE.MeshMatcapMaterial({
        matcap:planetMatcap
    })
)
planet.position.z = 300
planet.position.x = -150
planet.position.y = 100
planet.rotation.z = Math.PI
backgroundGroup.add(planet)


/**
 * sun
 */
const star = new THREE.Mesh(
    new THREE.IcosahedronBufferGeometry(50,3),
    new THREE.MeshBasicMaterial({
        map:sunTexture
    })
)
star.position.x = 500
star.position.y = -100
star.position.z = -200
backgroundGroup.add(star)

/**
 * Loop
 */
const startTime = Date.now()

const loop = () =>
{
    window.requestAnimationFrame(loop)


    // Update controls
    controls.update()

    // Update Selectors
    updateSelectors()

    // Render
    effectComposer.render(scene, camera)

    // rayCaster
    ray()

    // Update mouse move
    camera.position.x += ((cursor.x * 100) - camera.position.x) * 0.1  
    camera.position.y += ((cursor.y * 100) - camera.position.y) * 0.1   

    //update camera
    camera.updateProjectionMatrix()

    //update selectors
    weaponsSelector.lookAt(camera.position)
    IrisSelector.lookAt(camera.position)
    reactorSelector.lookAt(camera.position)
    footSelector.lookAt(camera.position)
    wigsSelector.lookAt(camera.position)
    cockpitSelector.lookAt(camera.position)
    holdSelector.lookAt(camera.position)
    buttonRotate.lookAt(camera.position)


    // zoom in onclick
    if (zoom){
        gsap.to(controls.target,{duration:0.7,x:-raycasterMouse.x * 50,y:raycasterMouse.y * 50})
    }

    //update time in custome shader
    textMaterial.uniforms.uTime.value = Date.now() - startTime
}

loop()