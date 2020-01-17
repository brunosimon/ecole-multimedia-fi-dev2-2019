import * as THREE from 'three'
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js'

import streetColorImageSource from './assets/images/street/color1.jpg'
import streetAmbientOcclusionImageSource from './assets/images/street/ambiantOcclusion.jpg'
import streetNormalImageSource from './assets/images/street/normal.jpg'
import streetroadImageSource from './assets/images/street/color5.jpg'


import polesColorImageSource from './assets/images/poles/poles.jpg'
import matcapSource from './assets/images/matcaps/7.png'

import grassImageSource from './assets/images/parc/grass.jpg'
import grassDisplacementImageSource from './assets/images/parc/displacement.jpg'


import buildingsColorImageSource from './assets/images/buildings/color3.jpg'
import buildingsAmbientOcclusionImageSource from './assets/images/buildings/ambiantOcclusion.jpg'
import buildingsNormalImageSource from './assets/images/buildings/normal.jpg'
import buildingsDisplacementImageSource from './assets/images/buildings/displacement.jpg'

import snowImageSource from './assets/images/particles/8.png'


import { Mesh } from 'three'

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

/**
 * Street Textures and road texture (2 last)
 */
const streetColorTexture = textureLoader.load(streetColorImageSource);
const streetAmbientOcclusionTexture = textureLoader.load(streetAmbientOcclusionImageSource);
const streetNormalTexture = textureLoader.load(streetNormalImageSource);
const streetRoadTexture = textureLoader.load(streetroadImageSource);


/**
 * poles texture roads
 */
const polesNormalTexture = textureLoader.load(polesColorImageSource);
const matcapTexture = textureLoader.load(matcapSource);

/**
 * Parc
 */
const grassTexture = textureLoader.load(grassImageSource)
const grassDisplacementTexture = textureLoader.load(grassDisplacementImageSource)



/**
 * Buildings texture
 */
const buildingsColorTexture = textureLoader.load(buildingsColorImageSource);
const buildingsAmbientOcclusionTexture = textureLoader.load(buildingsAmbientOcclusionImageSource);
const buildingsNormalTexture = textureLoader.load(buildingsNormalImageSource);
const buildingsDisplacementTexture = textureLoader.load(buildingsDisplacementImageSource);

/**
 * Snow Textures
 */
const snowTexture = textureLoader.load(snowImageSource)

/**
 * Repeat street texture
 */
streetColorTexture.wrapS = THREE.RepeatWrapping
streetColorTexture.wrapT = THREE.RepeatWrapping
streetColorTexture.repeat.x = 100
streetColorTexture.repeat.y = 100


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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 200)
camera.position.z = 50
camera.position.y = 10
scene.add(camera)




/**
 * Lights Sun
 */
const pointLight = new THREE.PointLight(0xe69138, 2, 300)
pointLight.position.x = 100
pointLight.position.y = 100
pointLight.position.z = 50
scene.add(pointLight)


/**
 * City
 */

// MaterialFloor
const materialFloor = new THREE.MeshStandardMaterial({
    roughness: 0.3,
    metalness: 0.3,
    map: streetColorTexture,
    aoMAP: streetAmbientOcclusionTexture,
    normalMap: streetNormalTexture,
})


// MaterialRoad
const materialRoad = new THREE.MeshStandardMaterial({
    roughness: 0.3,
    metalness: 0.3,
    map: streetRoadTexture,

})

// Material_buildings brick + windows (2 textures)
const materialBuildings = new THREE.MeshStandardMaterial({
    roughness: 0.6,
    metalness: 0.6,
    map: buildingsColorTexture,
    aoMAP: buildingsAmbientOcclusionTexture,
    normalMap: buildingsNormalTexture,
})

// Material carWheel
const materialWheel = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0x000000),
    side: THREE.DoubleSide
})

// MaterialCar
const materialCar = new THREE.MeshStandardMaterial({
    roughness: 0.2,
    metalness: 0.2
})

// Parc texture
const materialGrass = new THREE.MeshStandardMaterial({
    map: grassTexture,
    displacementMap: grassDisplacementTexture,
    displacementScale: -20
})

// Material Water
const materialWater = new THREE.MeshStandardMaterial({
    roughness: 0.3,
    metalness: 0.3,
    color: new THREE.Color(0x00ccff)
})

// MaterialSnow
const snowMaterial = new THREE.PointsMaterial({
    size: 0.1,
    alphaMap: snowTexture,
    transparent: true,
    depthWrite: false
})





// GeometrySnow
const snowGeometry = new THREE.Geometry()

for (let i = 0; i < 100000; i++) {
    const vertice = new THREE.Vector3(
        (Math.random() - 0.5) * 100,
        Math.random() * 20,
        (Math.random() - 0.5) * 100
    )
    snowGeometry.vertices.push(vertice)
}

// Points
const snow = new THREE.Points(snowGeometry, snowMaterial)
    scene.add(snow)


//BuildingsBox
const buildingGeometry = new THREE.BoxGeometry(1, 1, 1, 4, 4, 1)
    buildingGeometry.translate(0, 0.5, 0)


// floorPlane
const floor = new THREE.Mesh(new THREE.PlaneGeometry(50, 100, 1000, 1), materialFloor)
    floor.position.x = 25
    floor.rotation.x = - Math.PI * 0.5;
    scene.add(floor)

// floor Left
const floor1 = new THREE.Mesh(new THREE.PlaneGeometry(50, 50, 1000, 1), materialFloor)
    floor1.position.x = -25
    floor1.position.z = -25
    floor1.rotation.x = - Math.PI * 0.5;
    scene.add(floor1)

//LightRoad
let lightsRoad = 35

for (let i = 0; i < 5; i++) {

    const lightsGroup = new THREE.Group(2, 16, 16)

    const cylinderLight = new THREE.Mesh
        (new THREE.CylinderGeometry(0.2, 0.2, 5, 10, 1, 1),
            new THREE.MeshBasicMaterial({ map: polesNormalTexture })
        )
    cylinderLight.position.y = +2.5
    lightsGroup.add(cylinderLight)

    const sphereLight = new THREE.Mesh(new THREE.SphereGeometry(0.30, 0.30),
        new THREE.MeshBasicMaterial({ matCap: matcapTexture })
    )
    sphereLight.position.y = 5
    lightsGroup.add(sphereLight)

    lightsGroup.position.z = lightsRoad;
    lightsGroup.position.x = 1.30
    lightsRoad -= 18;
    scene.add(lightsGroup)
}

// Light Position road
let lightPositionZ = 35

for (let i = 0; i < 5; i++) {
    const pointLights = new THREE.PointLight(0xffffff, 0.03)
        pointLights.castShadow = true
        pointLights.position.x = 1
        pointLights.position.y = 8
        pointLights.position.z = lightPositionZ
        lightPositionZ -= 18
        scene.add(pointLights)
}




/**
 * Vertical Road
 */
for (let i = 0; i < 200; i++) {

    let positions_x = (Math.random() - 0.5) * 100
    let positions_z = (Math.random() - 0.5) * 100

    if ((positions_x > 6 || positions_x < - 6 && positions_z < 5) && (positions_z > 7 || positions_z < - 7)) {

        const building = new THREE.Mesh(
            buildingGeometry, materialBuildings
        )

        building.position.x = positions_x
        building.position.z = positions_z
        building.scale.x = 1 + Math.random() * 8
        building.scale.y = 1 + Math.random() * 10
        building.scale.z = 1 + Math.random() * 12
        scene.add(building)
    }
}

// Road right x-axe background-black
const roadLeft = new THREE.Mesh(
    new THREE.BoxGeometry(49.2, 0.1, 2, 1, 1, 1), materialRoad
)
    roadLeft.position.x = 25.83
    scene.add(roadLeft)

// Road middle z-axe background-black
const road = new THREE.Mesh(
    new THREE.BoxGeometry(2.5, 0.1, 100, 1, 1, 1), materialRoad
)
    scene.add(road)


// white treaty middle road
let treaty = 49

for (let i = 0; i < 21; i++) {

    const treatyWhite = new THREE.Mesh(
        new THREE.BoxGeometry(0.05, 0.01, 2, 1, 1, 1),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
    )
        treatyWhite.position.z = treaty
        treaty -= 4.9
        treatyWhite.position.y = 0.09
        scene.add(treatyWhite)
}




/**
 * Fire stop
 */
const fireStop = new THREE.Group()
    scene.add(fireStop)

const cylinderLight = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.1, 3, 6, 1, 1),
    new THREE.MeshBasicMaterial({ map: polesNormalTexture }))
    cylinderLight.position.z = 1.3
    cylinderLight.position.x = 1.5
    fireStop.add(cylinderLight)

// Hinge
const boxFire = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.1, 0.3, 1, 1, 1),
    new THREE.MeshBasicMaterial({ map: polesNormalTexture })
)
    boxFire.position.y = 1.4
    boxFire.position.z = 1.2
    boxFire.position.x = 1.5
    fireStop.add(boxFire)

// Hinge
const boxFire1 = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.1, 0.3, 1, 1, 1),
    new THREE.MeshBasicMaterial({ map: polesNormalTexture })
)
    boxFire1.position.y = 1.2
    boxFire1.position.z = 1.2
    boxFire1.position.x = 1.5
    fireStop.add(boxFire1)

const blockFire = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.5, 0.3, 1, 1, 1),
    new THREE.MeshBasicMaterial({ map: polesNormalTexture })
)
    blockFire.position.y = 1.2
    blockFire.position.z = 0.9
    blockFire.position.x = 1.6
    fireStop.add(blockFire)

const redFire = new THREE.Mesh(
    new THREE.SphereGeometry(0.05, 0.05),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
    redFire.position.y = 1.35
    redFire.position.z = 0.9
    redFire.position.x = 1.65
    fireStop.add(redFire)

const orangeFire = new THREE.Mesh(
    new THREE.SphereGeometry(0.05, 0.05),
    new THREE.MeshBasicMaterial({ color: 0xff7f00 })
)
    orangeFire.position.y = 1.20
    orangeFire.position.z = 0.9
    orangeFire.position.x = 1.65
    fireStop.add(orangeFire)

const greenFire = new THREE.Mesh(
    new THREE.SphereGeometry(0.05, 0.05),
    new THREE.MeshBasicMaterial({ color: 0x77dd77 })
)
    greenFire.position.y = 1.05
    greenFire.position.z = 0.9
    greenFire.position.x = 1.65
    fireStop.add(greenFire)



/**
 * Create Car
 */

let carGroupPositionX = 35
for (let i = 0; i < 10; i++) {

    const carGroup = new THREE.Group(2, 16, 16)

    //TopCar
    const carTop = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, 0.2, 0.5, 1, 1, 1),
        new THREE.MeshBasicMaterial({ color: 0x3498DB }), materialCar,
    )
        carTop.position.x = 0.7
        carTop.position.y = 0.4
        carGroup.add(carTop)

    //MiddleCar
    const carMiddle = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, 0.1, 0.8, 1, 1, 1),
        new THREE.MeshBasicMaterial({ color: 0x2E86C1 }), materialCar
    )
        carMiddle.position.x = 0.7
        carMiddle.position.y = 0.25
        carGroup.add(carMiddle)

    const carWheel1 = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.09, 20, 1, 1), materialWheel)
        carWheel1.position.x = 0.55
        carWheel1.position.y = 0.15
        carWheel1.position.z = 0.25
        carWheel1.rotation.z = Math.PI / 2
        carGroup.add(carWheel1)

    const carWheel2 = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.09, 20, 1, 1), materialWheel)
        carWheel2.position.x = 0.85
        carWheel2.position.y = 0.15
        carWheel2.position.z = 0.25
        carWheel2.rotation.z = Math.PI / 2
        carGroup.add(carWheel2)

    const carWheel3 = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.09, 20, 1, 1), materialWheel)
        carWheel3.position.x = 0.85
        carWheel3.position.y = 0.15
        carWheel3.position.z = - 0.25
        carWheel3.rotation.z = Math.PI / 2
        carGroup.add(carWheel3)

    const carWheel4 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.1, 0.09, 20, 1, 1), materialWheel
    )
        carWheel4.position.x = 0.55
        carWheel4.position.y = 0.15
        carWheel4.position.z = - 0.25
        carWheel4.rotation.z = Math.PI / 2
        carGroup.add(carWheel4)

        carGroup.position.z = carGroupPositionX
        //carGroup.position.x = -1.30
        carGroupPositionX -= Math.floor(Math.random() * 15);
        scene.add(carGroup)
}




/**
 * Parc
 */
const parc = new THREE.Mesh(new THREE.PlaneGeometry(50, 50, 100, 100), materialGrass)
    parc.rotation.x = - Math.PI / 2
    parc.position.x = - 25
    parc.position.z = 25
    scene.add(parc)

const water = new THREE.Mesh(new THREE.PlaneGeometry(50, 50, 10, 10), materialWater)
    water.rotation.x = - Math.PI / 2
    water.position.x = - 25
    water.position.z = 25
    water.position.y = -5
    scene.add(water)


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
    renderer.setSize(sizes.width, sizes.height)
    document.body.appendChild(renderer.domElement)



/**
 * Fly Controls
 */

const controls = new FlyControls(camera, renderer.domElement)
    controls.movementSpeed = 10
    controls.domElemet = renderer.domElement
    controls.rollSpeed = 1.2


/**
 * Loop
 */

let fly = new THREE.Clock()
const loop = () => {

    // Update Fly control
    let flyControl = fly.getDelta()
    window.requestAnimationFrame(loop)
    controls.update(flyControl)

    // Update snow
    for (const _vertice of snowGeometry.vertices) {
        _vertice.y -= 0.002

        if (_vertice.y < 0) {
            _vertice.y = 20
        }
    }
    snowGeometry.verticesNeedUpdate = true


    // Render
    renderer.render(scene, camera)
}
loop()

