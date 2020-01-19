import * as THREE from 'three'
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js'
import roadImageSource from './assets/images/road/route.jpg'
import buildingImageSource from './assets/images/immeuble/immeuble.jpg'
import snowImageSource from './assets/images/textures/particles/8.png'
import floorImageSource from './assets/images/immeuble/sol.jpg'

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const roadColorTexture = textureLoader.load(roadImageSource)
const buildingColorTexture = textureLoader.load(buildingImageSource)
const snowTexture = textureLoader.load(snowImageSource)
const floorTexture = textureLoader.load(floorImageSource)


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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 200)
camera.position.z = 50
camera.position.y = 50
scene.add(camera)

/**
 * Lights
 */
const pointLight = new THREE.PointLight(0xffffff, 2, 200)
pointLight.position.x = 100
pointLight.position.y = 100
pointLight.position.z = 50
scene.add(pointLight)

/**
 * City
 */
const material = new THREE.MeshStandardMaterial({
    roughness: 0.3,
    metalness: 0.6
})

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100, 1, 1),
    //material
    new THREE.MeshBasicMaterial({ map : floorTexture })
)
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

//road
const road = new THREE.Mesh(
    new THREE.BoxGeometry (5,100 , 1),
    new THREE.MeshBasicMaterial({ map : roadColorTexture  }),
    roadColorTexture.wrapS = THREE.RepeatWrapping,
    roadColorTexture.wrapT = THREE.RepeatWrapping,
    roadColorTexture.repeat.y = 12
)
road.rotation.x = Math.PI * 0.5
scene.add(road)

// Buildings
const buildingGeometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1)
buildingGeometry.translate(0, 0.5, 0)
new THREE.MeshBasicMaterial({ map : buildingColorTexture})


for(let i = 0; i < 100; i++)
{
    const building = new THREE.Mesh(
        buildingGeometry,
        new THREE.MeshBasicMaterial({ map : buildingColorTexture})
    )
    //coté gauche
    building.position.x = (Math.random() - 1.2) * 40
    building.position.z = (Math.random() - 0.5) * 100

    
    building.scale.x = 1 + Math.random() * 5
    building.scale.z = 1 + Math.random() * 5
    building.scale.y = 1 + Math.random() * 15
    
    scene.add(building)
}

// Buildings2
const building2Geometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1)
building2Geometry.translate(0, 0.5, 0)


for(let i = 0; i < 100; i++)
{
    const building2 = new THREE.Mesh(
        building2Geometry,
        new THREE.MeshBasicMaterial({ map : buildingColorTexture})
    )
    //coté gauche
    building2.position.x = (Math.random() - 0) * 40 + 5
    building2.position.z = (Math.random() - 0.5) * 100

    
    building2.scale.x = 1 + Math.random() * 5
    building2.scale.z = 1 + Math.random() * 5
    building2.scale.y = 1 + Math.random() * 15
    
    scene.add(building2)
}

//bushPop
const bushGeometry = new THREE.SphereGeometry(0.5, 16, 16)
    
    for(let i = 0; i < 20; i++)
{
    const bush = new THREE.Mesh(
        bushGeometry,
        new THREE.MeshBasicMaterial({ color: 0x228833 })
    )
    //coté gauche
    bush.position.x = (Math.random() - 0) * 4
    bush.position.z = (Math.random() - 0.5) * 100
    scene.add(bush)
}
//snow
const snowGeometry = new THREE.Geometry()

for(let i = 0; i < 1000; i++)
{
    const vertice = new THREE.Vector3(
        (Math.random() - 0.5) * 100,
        Math.random() * 20,
        (Math.random() - 0.5) * 100
    )
    snowGeometry.vertices.push(vertice)
}

// Material
const snowMaterial = new THREE.PointsMaterial({
    alphaMap: snowTexture,
    transparent: true,
    depthWrite: false
})

// Points
const snow = new THREE.Points(snowGeometry, snowMaterial)
scene.add(snow)

//bush2
const bush2Geometry = new THREE.SphereGeometry(0.5, 16, 16)
    
    for(let i = 0; i < 30; i++)
{
    const bush2 = new THREE.Mesh(
        bushGeometry,
        new THREE.MeshBasicMaterial({ color: 0x228833 })
    )
    //coté gauche
    bush2.position.x = (Math.random() - 1.2) * 4
    bush2.position.z = (Math.random() - 0.5) * 100
    scene.add(bush2)
}

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)

/**
 * fly controls
 */
const controls = new FlyControls(camera, renderer.domElement)
controls.movementSpeed = 10
controls.domElemet = renderer.domElement
controls.rollSpeed = 1.2


/**
 * Loop
 */

 let clock = new THREE.Clock ()
const loop = () =>
{
    let delta = clock.getDelta()
    window.requestAnimationFrame(loop)

    //Udapte snow
    for(const _vertice of snowGeometry.vertices)
    {
        _vertice.y -= 0.1
        
        if (_vertice.y < 0)
        {
            _vertice.y = 20
        }
    }
    snowGeometry.verticesNeedUpdate = true

    // Update controls
    controls.update(delta)

    // Render
    renderer.render(scene, camera)
}

loop()