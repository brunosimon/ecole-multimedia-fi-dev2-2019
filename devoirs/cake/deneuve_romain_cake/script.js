import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import cakeTextureImageSource from './assets/images/cake/cake.jpg'
import fireTextureImageSource from './assets/images/particles/3.png'
//import confettisTextureSource from './assets/images/particles/1.png'

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const cakeTextureImage = textureLoader.load(cakeTextureImageSource)
const fireTextureImage = textureLoader.load(fireTextureImageSource)
//const confettisTexture = textureLoader.load(confettisTextureSource)



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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 20
camera.position.y = 3
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)

/**
 * Orbit controls
 */
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.zoomSpeed = 0.3

/**
 * Light
 */
const ambientLight = new THREE.AmbientLight(0xffcccc, 0.2)
scene.add(ambientLight)

const sunLight = new THREE.DirectionalLight(0xffcccc, 1)
sunLight.position.x = 10
sunLight.position.y = 10
sunLight.position.z = 0
scene.add(sunLight)

/**
 * Cake
 */

 //Plate
const plate = new THREE.Mesh(
    new THREE.CylinderGeometry(10, 12, 1.5, 35),
    new THREE.MeshStandardMaterial({ color:0x5B5B5B })
)
scene.add(plate)

//1st part Cake
const firstPart = new THREE.Mesh(
    new THREE.CylinderGeometry(8, 8, 3.5, 35),
    new THREE.MeshStandardMaterial({ color:0xce3d3d })
)
firstPart.position.y = 2
scene.add(firstPart)

//2nd part cake
const secondPart = new THREE.Mesh(
    new THREE.CylinderGeometry(6, 6, 3, 35),
    new THREE.MeshStandardMaterial({ color:0xce3d3d })
)
secondPart.position.y = 5
scene.add(secondPart)

//3rd part cake
const thirdPart = new THREE.Mesh(
    new THREE.CylinderGeometry(4, 4, 2.5, 35),
    new THREE.MeshStandardMaterial({ color:0xce3d3d })
)
thirdPart.position.y = 7.5
scene.add(thirdPart)

//Fruit base 1

for(let i=0; i<30; i++)
{
     const fruitRadius = 7.5
     const fruitAngle = i/30*(Math.PI*2)
     const xfruit = Math.cos(fruitAngle) * fruitRadius
     const yfruit = 3.8
     const zfruit = Math.sin(fruitAngle) * fruitRadius

    const fruit = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 21, 21),
        new THREE.MeshStandardMaterial({ color:0x651d1d })
    )
    fruit.position.x = xfruit
    fruit.position.y = yfruit
    fruit.position.z = zfruit
    scene.add(fruit)
}

//Fruit base 2

for(let i=0; i<30; i++)
{
     const fruitRadius = 5
     const fruitAngle = i/30*(Math.PI*2)
     const xfruit = Math.cos(fruitAngle) * fruitRadius
     const yfruit = 6.6
     const zfruit = Math.sin(fruitAngle) * fruitRadius

    const fruit = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 21, 21),
        new THREE.MeshStandardMaterial({ color:0x651d1d })
    )
    fruit.position.x = xfruit
    fruit.position.y = yfruit
    fruit.position.z = zfruit
    scene.add(fruit)
}

//Fruit base 3

for(let i=0; i<20; i++)
{
     const fruitRadius = 3
     const fruitAngle = i/20*(Math.PI*2)
     const xfruit = Math.cos(fruitAngle) * fruitRadius
     const yfruit = 8.8
     const zfruit = Math.sin(fruitAngle) * fruitRadius

    const fruit = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 21, 21),
        new THREE.MeshStandardMaterial({ color:0x651d1d })
    )
    fruit.position.x = xfruit
    fruit.position.y = yfruit
    fruit.position.z = zfruit
    scene.add(fruit)
}

//Candle

    //Body
    const candleBodyGeometry = new THREE.CylinderGeometry(0.03, 0.025, 0.4, 30)
    const candleBodyMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x0ffffff)
    })

    //Top
    const candleTopGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.1, 30)
    const candleTopMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x0ffffff)
    })

    //Bottom
    const candleBottomGeometry = new THREE.ConeGeometry(0.05, 0.04, 30)
    const candleBottomMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x34a2cf)
    })

//Candle rotation
for(let i=0; i<30; i++)
{
    const radiusCandle =  2
    const angleCandle = i/30*(Math.PI*2)
    const xcandle = Math.cos(angleCandle)*radiusCandle
    const ycandle = 9
    const zcandle = Math.sin(angleCandle)*radiusCandle

    const candle = new THREE.Group()
        candle.position.x = xcandle
        candle.position.y = ycandle
        candle.position.z = zcandle
    scene.add(candle)

    const candleBody = new THREE.Mesh(candleBodyGeometry, candleBodyMaterial)
    candle.add(candleBody)

    const candleTop = new THREE.Mesh(candleTopGeometry, candleTopMaterial)
    candle.add(candleTop)
    candleTop.position.y = 0.2

    const candleFoot = new THREE.Mesh(candleBottomGeometry, candleBottomMaterial)
    candle.add(candleFoot)
    candleFoot.rotation.z = Math.PI
    candleFoot.position.y = -0.2
}

//Confettis

const confettisGeometry = new THREE.Geometry()

for (let i=0; i< 1000; i++)
{
    const vertice = new THREE.Vector3(
        (Math.random() - 0.5) * 100,
        Math.random()* 20,
        (Math.random() - 0.5) * 100
    )
    confettisGeometry.vertices.push(vertice)

    // Color
    const color = new THREE.Color(
        Math.random(),
        Math.random(),
        Math.random()
    )
    confettisGeometry.colors.push(color)
}

//Material confettis
const confettisMaterial = new THREE.PointsMaterial({
    vertexColors: true,
    size: 0.1,
    transparent: true,
    depthWrite: false
})



//Points confettis
const confettis = new THREE.Points(confettisGeometry, confettisMaterial)
scene.add(confettis)

/**
 * Loop
 */
const loop = () =>
{
    window.requestAnimationFrame(loop)

    // Update controls
    controls.update()

    //update confettis
    for(const vertice of confettisGeometry.vertices)
    {
        vertice.y -= 0.05

        if(vertice.y < -1)
        {
            vertice.y = 20
        }
    }
    confettisGeometry.verticesNeedUpdate = true
    // Render
    renderer.render(scene, camera)
}

loop()