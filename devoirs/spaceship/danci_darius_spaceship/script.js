import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import marsMaterialSource from './assets/Sedna.png'
import purpleMaterialSource from './assets/purpletexture2.jpg'
import starsMaterialSource from './assets/star_07.png'
import floorMaterialSource from './assets/marsfloor.jpg'
import xwingMaterialSource from './assets/xwing.png'
import waterTextureSource from './assets/water.jpg'
import meteoriteTextureSource from './assets/meteorite.jpg'
import futureTextureSource from './assets/textTexture.png'
import portalTextureSource from './assets/portalTexture.jpg'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'



/**
 * effect composer
 */



/**
 * DracoLoader
 */
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')




/**
 * GLTFLoader
 */
const gltfLoader = new GLTFLoader()
//gltfLoader.setDRACOLoader(dracoLoader)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const marsMaterial = textureLoader.load(marsMaterialSource)
const purpleTexture = textureLoader.load(purpleMaterialSource)
const starsTexture = textureLoader.load(starsMaterialSource)
const floorTexture = textureLoader.load(floorMaterialSource, function ( Ftexture ) {
    floorTexture.wrapT =  THREE.RepeatWrapping,
    Ftexture.repeat.set (10,10)
    floorTexture.wrapS =  THREE.RepeatWrapping,
    Ftexture.repeat.set (10,10)
})
const xwingMaterial = textureLoader.load(xwingMaterialSource)
const waterMaterial = textureLoader.load(waterTextureSource)
const meteoriteMaterial = textureLoader.load(meteoriteTextureSource)
const futurTexture = textureLoader.load(futureTextureSource)
const portalTexture = textureLoader.load(portalTextureSource)

const loader = new THREE.FontLoader();

loader.load( '/blanka.json', function ( font )  {

 
    const geometry = new THREE.TextGeometry( 'Click to enter Sedna', {
		font: font,
		size: 100,
		height: 5,
		curveSegments: 22,
		
    } )
    
    const text = new THREE.Mesh(geometry,
       new THREE.MeshStandardMaterial({
    color : 0xffffff
    })
    )
    scene.add(text)
    text.position.z = 3600
    text.position.y = 1800
    text.position.x = 0
    text.rotation.y = 50
} )

loader.load( '/blanka.json', function ( font )  {

 
    const geometry2 = new THREE.TextGeometry( 'Exit', {
		font: font,
		size: 10,
		height: 2,
		curveSegments: 22,
		
    } )
    
    const text2 = new THREE.Mesh(geometry2,
       new THREE.MeshStandardMaterial({
    color : 0xffffff
    })
    )
    scene.add(text2)
    text2.position.z = -300
    text2.position.y = 50
    text2.position.x = 20
    text2.rotation.y = 50
} )


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
    // Update effect composer
    effectComposer.setSize(sizes.width, sizes.height)
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
 * Keyboard
 */
const keyboard = {}
keyboard.up = false
keyboard.right = false
keyboard.down = false
keyboard.left = false

document.addEventListener('keydown', (_event) =>
{
    console.log(_event.code)
    switch(_event.code)
    {
        case 'KeyQ' :
        case 'ArrowUp':
            keyboard.up = true
    }

    switch(_event.code)
    {
        case 'KeyS' :
        case 'ArrowRight':
            keyboard.right = true
    }

    switch(_event.code)
    {
        case 'KeyD' :
        case 'ArrowDown':
            keyboard.down = true
    }

    switch(_event.code)
    {
        case 'KeyA' :
        case 'ArrowLeft':
            keyboard.left = true
    }
})

document.addEventListener('keyup', (_event) =>
{
    console.log(_event.code)
    switch(_event.code)
    {
        case 'KeyQ' :
        case 'ArrowUp':
            keyboard.up = false
    }

    switch(_event.code)
    {
        case 'KeyS' :
        case 'ArrowRight':
            keyboard.right = false
    }

    switch(_event.code)
    {
        case 'KeyD' :
        case 'ArrowDown':
            keyboard.down = false
    }

    switch(_event.code)
    {
        case 'KeyA' :
        case 'ArrowLeft':
            keyboard.left = false
    }
})






/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(70, sizes.width / sizes.height, 0.1, 10000000)
camera.position.z = 5000
camera.position.y = 2000
camera.position.x = 0
camera.rotation.x = -Math.PI /9 


scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setClearColor(0x000000, 1)
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)
const effectComposer = new EffectComposer(renderer)
const renderPass = new RenderPass(scene, camera)
effectComposer.addPass(renderPass)
const rgbShiftPass = new ShaderPass(RGBShiftShader)
rgbShiftPass.uniforms.amount.value = 0.001
effectComposer.addPass(rgbShiftPass)
/**
 * Orbit controls
 */
/*const controls = new OrbitControls(camera, renderer.domElement)
 controls.enableDamping = true
 controls.zoomSpeed = 0.3*/

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
 * stars
 */


const particlesGeometry_2 = new THREE.Geometry()
for (let i = 0; i < 10000; i++) {
    // Vertice
    const vertice = new THREE.Vector3(
           Math.random() * 100000 - 50000,
        (Math.random() - 0.5) * 100000,
           Math.random() * 100000 - 50000
    )
    particlesGeometry_2.vertices.push(vertice)
    // Color
    const color2 = new THREE.Color(0xffffff)
    particlesGeometry_2.colors.push(color2)
}


// Material
const particles_2Material = new THREE.PointsMaterial({
    size: 0.05,
    sizeAttenuation: true,
    alphaMap: starsTexture,
    depthWrite: false,
    color : 0xffffff
})

const particles_2 = new THREE.Points(particlesGeometry_2,particles_2Material)
scene.add(particles_2)


/**
 * planetFloor
 */
const floorMaterial = new THREE.MeshStandardMaterial({
    map: floorTexture,
    
})
 const floor = new THREE.Mesh(
     new THREE.PlaneGeometry(2825,2825),
     floorMaterial

 )

 floor.rotation.x = - Math.PI*0.5
scene.add(floor)






/**
 * text
 */






/**
 * planet
 */


const planet = new THREE.SphereGeometry(2000,128,128)

const planetT = new THREE.Mesh(
    planet ,
    new THREE.MeshStandardMaterial({
        map : marsMaterial
    })
)


scene.add(planetT)

const planet2 = new THREE.SphereGeometry(500,128,128)

const planetT2 = new THREE.Mesh(
    planet2 ,
    new THREE.MeshStandardMaterial({
        map : purpleTexture
    })
)


scene.add(planetT2)

planetT2.position.x = -2000
planetT2.position.y = 1800




// Load model
gltfLoader.load(
    '/visseau.glb',
    (gltf) =>
    {
        console.log('success')
        console.log(gltf)

        while(gltf.scene.children.length)
        {
            vaisseau.add(gltf.scene.children[0])
        }
    },
    undefined,
    (error) =>
    {
        console.log('error')
        console.log(error)
    }
)

const vaisseau = new THREE.Group(

 )

scene.add(vaisseau)
vaisseau.rotation.y = Math.PI /1
vaisseau.position.y = 30
vaisseau.scale.set(0.02,0.02,0.02)
vaisseau.position.z = 1400



gltfLoader.load(
    '/visseau.glb',
    (gltf) =>
    {
        console.log('success')
        console.log(gltf)

        while(gltf.scene.children.length)
        {
            vaisseau2.add(gltf.scene.children[0])
        }
    },
    undefined,
    (error) =>
    {
        console.log('error')
        console.log(error)
    }
)

const vaisseau2 = new THREE.Group()
    vaisseau2.position.z = 4400
    vaisseau2.position.y = 1800
    vaisseau2.position.x = -500
    vaisseau2.rotation.y = -50
    vaisseau2.rotation.y = Math.PI /1
    vaisseau2.scale.set(0.2,0.2,0.2)
    scene.add(vaisseau2)



const tree = new THREE.Group()

gltfLoader.load(
    '/lowpolytree.glb',
    (gltf) =>
    {
        console.log('success2')
        console.log(gltf)

        while(gltf.scene.children.length)
        {
            tree.add(gltf.scene.children[0])
        }
    },
    undefined,
    (error) =>
    {
        console.log('error')
        console.log(error)
    }
) 


tree.position.x = -400
tree.position.y = -30
tree.position.z = -600
tree.scale.set(30,30,30)
scene.add(tree)

    
const tree2 = new THREE.Group()

gltfLoader.load(
    '/lowpolytree.glb',
    (gltf) =>
    {
        console.log('success2')
        console.log(gltf)

        while(gltf.scene.children.length)
        {
            tree2.add(gltf.scene.children[0])
        }
    },
    undefined,
    (error) =>
    {
        console.log('error')
        console.log(error)
    }
) 


tree2.position.x = -400
tree2.position.y = -30
tree2.position.z = -500
tree2.scale.set(30,30,30)
scene.add(tree2)

const tree3 = new THREE.Group()

gltfLoader.load(
    '/lowpolytree.glb',
    (gltf) =>
    {
        console.log('success2')
        console.log(gltf)

        while(gltf.scene.children.length)
        {
            tree3.add(gltf.scene.children[0])
        }
    },
    undefined,
    (error) =>
    {
        console.log('error')
        console.log(error)
    }
) 


tree3.position.x = -400
tree3.position.y = -30
tree3.position.z = -500
tree3.scale.set(50,50,50)
scene.add(tree3)

const tree4 = new THREE.Group()

gltfLoader.load(
    '/lowpolytree.glb',
    (gltf) =>
    {
        console.log('success2')
        console.log(gltf)

        while(gltf.scene.children.length)
        {
            tree4.add(gltf.scene.children[0])
        }
    },
    undefined,
    (error) =>
    {
        console.log('error')
        console.log(error)
    }
) 


tree4.position.x = -300
tree4.position.y = -30
tree4.position.z = -400
tree4.scale.set(50,50,50)
scene.add(tree4)

const tree5 = new THREE.Group()

gltfLoader.load(
    '/lowpolytree.glb',
    (gltf) =>
    {
        console.log('success2')
        console.log(gltf)

        while(gltf.scene.children.length)
        {
            tree5.add(gltf.scene.children[0])
        }
    },
    undefined,
    (error) =>
    {
        console.log('error')
        console.log(error)
    }
) 


tree5.position.x = -200
tree5.position.y = -30
tree5.position.z = -300
tree5.scale.set(50,50,50)
scene.add(tree5)

const tree6 = new THREE.Group()

gltfLoader.load(
    '/lowpolytree.glb',
    (gltf) =>
    {
        console.log('success2')
        console.log(gltf)

        while(gltf.scene.children.length)
        {
            tree6.add(gltf.scene.children[0])
        }
    },
    undefined,
    (error) =>
    {
        console.log('error')
        console.log(error)
    }
) 


tree6.position.x = -100
tree6.position.y = -30
tree6.position.z = -500
tree6.scale.set(50,50,50)
scene.add(tree3)

const tree7 = new THREE.Group()

gltfLoader.load(
    '/lowpolytree.glb',
    (gltf) =>
    {
        console.log('success2')
        console.log(gltf)

        while(gltf.scene.children.length)
        {
            tree7.add(gltf.scene.children[0])
        }
    },
    undefined,
    (error) =>
    {
        console.log('error')
        console.log(error)
    }
) 


tree7.position.x = -400
tree7.position.y = -30
tree7.position.z = -100
tree7.scale.set(25,25,25)
scene.add(tree7)

  
const portalGround = new THREE.Mesh(
    new THREE.ConeGeometry(12,13,12),
    new THREE.MeshBasicMaterial({
        map : futurTexture
    })
)
portalGround.position.z = -300
portalGround.position.x =0
scene.add(portalGround)

const portalGate = new THREE.Mesh(
    new THREE.RingGeometry(18,20,10),
    new THREE.MeshBasicMaterial({
        map: futurTexture
    })
)
portalGate.position.z = -300
portalGate.position.y = 30
portalGate.position.x = 0
scene.add(portalGate)

const portalInner = new THREE.Mesh(
    new THREE.RingGeometry(1,18,10),
    new THREE.MeshBasicMaterial({
        map: portalTexture
    })
)
portalInner.position.z = -300
portalInner.position.y = 30
portalInner.position.x = 0
scene.add(portalInner)







    const waterplant = new THREE.Mesh(
        new THREE.CircleGeometry(600,12,),
        new THREE.MeshMatcapMaterial({
            map : waterMaterial
        })
    )

    waterplant.position.x = 800
    waterplant.position.y = 1
    waterplant.position.z = -600
    waterplant.rotation.x = - Math.PI*0.5
    scene.add(waterplant)
   
const meteorite = new THREE.Mesh(
    new THREE.SphereGeometry(300,11,11),
    new THREE.MeshMatcapMaterial({
        map : meteoriteMaterial
    })
)

meteorite.position.x =-600
meteorite.position.z = 600

scene.add(meteorite)
        
        



/**
 * Particles
 */
// Geometry
const particlesGeometry = new THREE.Geometry()
const galaxyRadius = 2200

for(let i = 0; i < 50000; i++)
{
    // Vertice
    const progress = Math.pow(Math.random(), 4)
    const angle = progress *15
    const distance = progress * galaxyRadius
    let x = Math.sin(angle) * galaxyRadius
    let y = Math.sin(angle) * galaxyRadius
    let z = Math.cos(angle) * galaxyRadius

    const randomAngle = Math.random() * Math.PI * 2
    const randomRadius = Math.random() * Math.random() * 3

    x += Math.cos(randomAngle) 
    y += (Math.random() - 0.5) * Math.random() * 1
    z += Math.sin(randomAngle) 

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
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
})

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)



renderer.domElement.addEventListener( 'click' , function () {
    camera.position.z = 1440
    camera.position.y = 100
    camera.rotation.x = 24.44
})




 

let cameraMoved = false



/**
 * Loop
 */
const loop = () =>
{
    window.requestAnimationFrame(loop)

    // Update controls
    //controls.update()

    if(keyboard.up)
    {
        vaisseau.position.z -= 2
        camera.position.z = vaisseau.position.z +40
    }
    if(keyboard.right)
    {
        vaisseau.position.x += 1.5
        vaisseau.rotation.z += 0.008
    }
    if(keyboard.down)
    {
        vaisseau.position.z += 0.7
        camera.position.z = vaisseau.position.z +40
    }
    if(keyboard.left)
    {
        vaisseau.position.x -= 1.5
        vaisseau.rotation.z -= 0.008
    }

    if(keyboard.left == false && vaisseau.rotation.z < 0)
    {
        vaisseau.rotation.z += 0.05
    }
    if(keyboard.right == false && vaisseau.rotation.z > 0)
    {
        vaisseau.rotation.z -= 0.05
    }


    //camera
    if (vaisseau.position.z < -280 && vaisseau.position.x>-20 && vaisseau.position.x<20 && cameraMoved==false)

    {
        vaisseau.position.z = 1400
        keyboard.up = false
        cameraMoved = true
        camera.position.z = 5000
        camera.position.y = 2000
        camera.position.x = 0
        camera.rotation.x = -Math.PI /9 
    }



    // Render
    effectComposer.render(scene, camera)
}

loop()