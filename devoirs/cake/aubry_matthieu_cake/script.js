import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import cakeColorImageSource  from './assets/images/cake/color.jpg'
import plateColorImageSource  from './assets/images/plate/color.jpg'
import plateNormalImageSource  from './assets/images/plate/color.jpg'


/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const cakeColorTexture = textureLoader.load(cakeColorImageSource)

cakeColorTexture.wrapS = THREE.RepeatWrapping;
cakeColorTexture.wrapT = THREE.RepeatWrapping;
cakeColorTexture.repeat.z = 10;
cakeColorTexture.repeat.x = 10;


const plateColorTexture = textureLoader.load(plateColorImageSource)
const plateNormalTexture = textureLoader.load(plateNormalImageSource)

plateColorTexture.wrapS = THREE.RepeatWrapping;
plateColorTexture.wrapT = THREE.RepeatWrapping;
plateColorTexture.repeat.z = 10;
plateColorTexture.repeat.x = 10;

plateNormalTexture.wrapS = THREE.RepeatWrapping;
plateNormalTexture.wrapT = THREE.RepeatWrapping;
plateNormalTexture.repeat.z = 10;
plateNormalTexture.repeat.x = 10;


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
camera.position.z = 13
camera.position.y = 4
scene.add(camera)


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)
renderer.setClearColor (0x8ed2ff, 1);


/**
 * Orbit controls
 */
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.zoomSpeed = 0.3


/**
 * Light
 */
const pointLight = new THREE.PointLight(0xffffff, 2, 300)
pointLight.position.x = 20
pointLight.position.y = 10
scene.add(pointLight)

//Plate
const plateGeometry = new THREE.CylinderGeometry( 4, 3.5, 0.5, 30, 60);
const plateMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0xffffff),
    map: plateColorTexture,
    alphaMap: plateNormalTexture
});
const plate = new THREE.Mesh(plateGeometry, plateMaterial);
plate.position.y = -1
scene.add(plate);


/**
 * Confetti
 */
// Geometry
const confettiGeometry = new THREE.Geometry()

for(let i = 0; i < 1000; i++)
{
    // Verice
    const vertice = new THREE.Vector3(
        (Math.random() - 0.5) * 100,
        Math.random() * 20,
        (Math.random() - 0.5) * 100
    )
    confettiGeometry.vertices.push(vertice)

     // Color
     const color = new THREE.Color(
        Math.random(),
        Math.random(),
        Math.random()
    )
    confettiGeometry.colors.push(color)
}

// Material
const confettiMaterial = new THREE.PointsMaterial({
    vertexColors: true,
    size: 0.1,
    transparent: true,
    depthWrite: false
})

// Points
const confetti = new THREE.Points(confettiGeometry, confettiMaterial)
scene.add(confetti)


/**
 * Cake
 */
let radiusCake = 3
let height = 1.5
let ycake = 0

for(let i=0; i<3; i++)
{
    //Cake body
    const cakeGeometry = new THREE.CylinderGeometry( radiusCake, radiusCake, height, 30);
    const cakeMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x4A212A),
        map: cakeColorTexture
    });
    const cake = new THREE.Mesh(cakeGeometry, cakeMaterial)
    cake.position.y = ycake
    scene.add(cake);

    ycake += 1
    radiusCake-= 0.8
    height -= 0.3
}

//candle

    //body
    const candleBodyGeometry = new THREE.CylinderGeometry(0.025, 0.025, 0.4, 30)
    const candleBodyMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xf5e9dc)
    })

    //Foot
    const candleFootGeometry = new THREE.ConeGeometry(0.05, 0.04, 30)
    const candleFootMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x00ff00)
    })

    //Fire
    const fireGeometry = new THREE.ConeGeometry(0.025, 0.1, 0.1)
    const fireMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xFFDB7A)
    })


    for(let i=0; i<30; i++){

        const radiusCandle = radiusCake + 0.5
        const angleCandle = i/30*(Math.PI*2)
        const xcandle = Math.cos(angleCandle)*radiusCandle
        const ycandle = 2.65
        const zcandle = Math.sin(angleCandle)*radiusCandle

        const candle = new THREE.Group()
        candle.position.y = ycandle
        candle.position.x = xcandle
        candle.position.z = zcandle
        scene.add(candle)

        const candleBody = new THREE.Mesh(candleBodyGeometry, candleBodyMaterial)
        candle.add(candleBody)

        const candleFoot = new THREE.Mesh(candleFootGeometry, candleFootMaterial)
        candle.add(candleFoot)
        candleFoot.rotation.z = Math.PI
        candleFoot.position.y = -0.2

        const fire = new THREE.Mesh(fireGeometry, fireMaterial)
        candle.add(fire)
        fire.position.y = 0.25
    }

//Smarties base top
for(let i=0; i<30; i++)
{
    const smartiesRadius = 1.8
    const smartiesAngle = i/30*(Math.PI*2)
    const xsmarties = Math.cos(smartiesAngle) * smartiesRadius
    const ysmarties = 1.6
    const zsmarties = Math.sin(smartiesAngle) * smartiesRadius
    const smarties = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 21, 21),
        new THREE.MeshStandardMaterial({
            color: new THREE.Color(Math.random(), Math.random(), Math.random())
        })
            
    )
    smarties.position.x = xsmarties
    smarties.position.y = ysmarties
    smarties.position.z = zsmarties
    scene.add(smarties)
}

//Smarties base bottom
for(let i=0; i<30; i++)
{
     const smartiesRadius = 2.5
     const smartiesAngle = i/30*(Math.PI*2)
     const xsmarties = Math.cos(smartiesAngle) * smartiesRadius
     const ysmarties = 0.75
     const zsmarties = Math.sin(smartiesAngle) * smartiesRadius
     const smarties = new THREE.Mesh(
            new THREE.SphereGeometry(0.1, 21, 21),
            new THREE.MeshStandardMaterial({
            color: new THREE.Color(Math.random(), Math.random(), Math.random())
        })

    )
    smarties.position.x = xsmarties
    smarties.position.y = ysmarties
    smarties.position.z = zsmarties
    scene.add(smarties)
}


/**
 * Loop
 */
const loop = () =>
{
    window.requestAnimationFrame(loop)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    //Update confetti
    for(const _vertice of confettiGeometry.vertices)
    {
        _vertice.y -= 0.04
        if(_vertice.y < -1)
        {
            _vertice.y = 20
        }
    }
    confettiGeometry.verticesNeedUpdate = true
}

loop()