import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { DoubleSide, Mesh, VertexColors } from 'three'
import cakeImageSource from './assets/images/cake/normal.jpg'
import floorImageSource from './assets/images/floor/color.jpg'
import donutsImageSource from './assets/images/donuts/donuts.jpg'


/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const cakeTexture = textureLoader.load(cakeImageSource);
const floorTexture = textureLoader.load(floorImageSource);
const donutsTexture = textureLoader.load(donutsImageSource);


cakeTexture.wrapS = THREE.RepeatWrapping
cakeTexture.wrapT = THREE.RepeatWrapping
cakeTexture.repeat.x = 5
cakeTexture.repeat.y = 5

floorTexture.wrapS = THREE.RepeatWrapping
floorTexture.wrapT = THREE.RepeatWrapping
floorTexture.repeat.x = 1

donutsTexture.wrapS = THREE.RepeatWrapping
donutsTexture.wrapT = THREE.RepeatWrapping
donutsTexture.repeat.x = 1
donutsTexture.repeat.y = 1


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

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 14
camera.position.y = 0.2
scene.add(camera)

const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)


/**
 * Cake
 */


// Material floor cake
const materialFloor = new THREE.MeshStandardMaterial({
    roughness: 0.3,
    metalness: 0.3,
    color: new THREE.Color(0xffffff),
    map: floorTexture
})

const materialBaseCake = new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,
    color: new THREE.Color(0XAB7B70),
    map: cakeTexture,
})

const materialBaseCake1 = new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,
    color: new THREE.Color(0XD69789),
    map: cakeTexture,
})

// MaterialSnow
const materialConfetti = new THREE.PointsMaterial({
    size: 0.2,
    transparent: true,
    depthWrite: false,
    vertexColors: true
})

const materialDonuts = new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,
    map: donutsTexture,
})


//donuts

const donuts = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.5, 35,1,1), materialDonuts)
    //buildingGeometry.translate(0, 0.5, 0)
    donuts.position.y = 5
    donuts.rotation.x = 0.5
scene.add(donuts)

//Candles
for (let i = 0; i < 30; i++) {

    const candleGroup = new THREE.Group()
    const candle = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 1, 20))
    const basement = new THREE.Mesh(new THREE.ConeGeometry( 0.1, 0.3, 7 ))
    basement.position.y = -0.5
    basement.rotation.x = -Math.PI

    candleGroup.add(candle)
    candleGroup.add(basement)

    let angle = (Math.PI * 2) * i / 30
    const radius = 2 - 0.5

    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius
    candleGroup.position.y = 4.8
    candleGroup.position.x = x
    candleGroup.position.z = z
    scene.add(candleGroup)
}

//Smarties
for (let i = 0; i < 30; i++) {

    const smarties = new THREE.Mesh(new THREE.SphereGeometry(0.1, 0.1, 1, 20))

    let angle = (Math.PI * 2) * i / 30
    const radius = 3 - 0.5

    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius
    smarties.position.y = 2.25
    smarties.position.x = x
    smarties.position.z = z
    scene.add(smarties)
}

/**
 * Confetti
 */
const confetti = new THREE.Geometry()

for (let i = 0; i < 100; i++) {
    const vertice = new THREE.Vector3(
        (Math.random() - 0.5) * 30,
        Math.random() * 20,
        (Math.random() - 0.5) * 30
    )
    confetti.vertices.push(vertice)

    const color = new THREE.Color(Math.random(), Math.random(), Math.random())
    confetti.colors.push(color)
}

// Points
const conf = new THREE.Points(confetti, materialConfetti)
scene.add(conf)






// Base cake
// floorPlane
const floor = new THREE.Mesh(new THREE.CylinderGeometry(4, 4, 1, 20), materialFloor)
scene.add(floor)


const baseCake = new THREE.Mesh(new THREE.CylinderGeometry(3, 3, 2, 100), materialBaseCake)
baseCake.position.y = 1.25
scene.add(baseCake)

const baseCake1 = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 2, 100), materialBaseCake1)
baseCake1.position.y = 3.25
scene.add(baseCake1)





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
 * Loop
 */
const loop = () => {

    for (const _vertice of confetti.vertices) {
        _vertice.y -= 0.1

        if (_vertice.y < 0) {
            _vertice.y = 20
        }
    }

    confetti.verticesNeedUpdate = true

    window.requestAnimationFrame(loop)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)
}

loop()