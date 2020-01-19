import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js'
import { Color } from 'three'
import particulesImageSource from './assets/images/particul/trace_01.png'
import buldingImageSource from './assets/images/matcaps/7.png'
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particulesTexture = textureLoader.load(particulesImageSource)
const buldingTexture = textureLoader.load(buldingImageSource)



/**
 * Scene
 */
const scene = new THREE.Scene()
const particlesGeometry = new THREE.Geometry()
for (let k = 0; k < 100000; k++) {

    // vertice 
    const vertice = new THREE.Vector3(

        (Math.random() * 0.5) * 200,
        (Math.random() * 0.5) * 200,
        (Math.random() * 0.5) * 200,

    )
    particlesGeometry.vertices.push(vertice)

    // color 
    const color = new THREE.Color(Math.random(), Math.random(), Math.random())
    particlesGeometry.colors.push(color)
}
const particlesMaterial = new THREE.PointsMaterial({
        size: 0.4,
        alphaMap: particulesTexture,
        transparent: true,
        vertexColors: true,
        depthWrite: false
    }

)
const particules = new THREE.Points(particlesGeometry, particlesMaterial)

scene.add(particules)


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
camera.position.y = 50
scene.add(camera)

const controlss = new FirstPersonControls(camera);

controlss.movementSpeed = 70;
controlss.lookSpeed = 0.05;
// controlss.noFly = true;
// controlss.lookVertical = false;

scene.add(controlss)
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
    roughness: 0.5,
    metalness: 0.5
})

/**
 * trais blanc
 */
let traits = []
const trait = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1)
trait.translate(0, 0.5, 0)
for (let k = 0; k < 10; k++) {
    const trait2 = new THREE.Mesh(
        trait,
        new THREE.MeshBasicMaterial({ bumpMap: buldingTexture })
    )
    trait2.position.x = 0.1
    trait2.position.z = k / 10 * 100 - 50
    trait2.position.y += 0.1
        // trait2.scale.x = 1 + Math.random() * 5
    trait2.scale.z = 4
    trait2.scale.y = 0.1
    traits.push(trait2)

}
for (let index = 0; index < traits.length; index++) {

    scene.add(traits[index])
}

/**
 * bulding
 */




let tour = []
const buildingGeometry2 = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1)
buildingGeometry2.translate(0, 0.5, 0)
for (let k = 0; k < 30; k++) {
    const building2 = new THREE.Mesh(
        buildingGeometry2,
        new THREE.MeshToonMaterial({ emissiveMap: buldingTexture })
    )
    building2.position.x = (-Math.random() - 0.5) * -30
    building2.position.z = (Math.random() + 0.5) * -30
    building2.scale.x = 1 + Math.random() * 5
    building2.scale.z = 1 + Math.random() * 5
    building2.scale.y = 1 + Math.random() * 12

    tour.push(building2)

}
for (let index = 0; index < tour.length; index++) {
    scene.add(tour[index])

}
let tour2 = []
const buildingGeometry3 = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1)
buildingGeometry3.translate(0, 0.5, 0)
for (let k = 0; k < 30; k++) {
    const building3 = new THREE.Mesh(
        buildingGeometry3,
        new THREE.MeshPhysicalMaterial({ bumpMap: buldingTexture })
    )
    building3.position.x = (-Math.random() - 0.5) * -30
    building3.position.z = (-Math.random() - 0.5) * -30
    building3.scale.x = 1 + Math.random() * 5
    building3.scale.z = 1 + Math.random() * 5
    building3.scale.y = 1 + Math.random() * 12

    tour2.push(building3)
    for (let index = 0; index < tour2.length; index++) {
        scene.add(tour2[index])

    }
}

let tour3 = []
const buildingGeometry4 = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1)
buildingGeometry4.translate(0, 0.5, 0)
for (let k = 0; k < 50; k++) {
    const building4 = new THREE.Mesh(
        buildingGeometry4,
        new THREE.MeshPhongMaterial({ map: buldingTexture })
    )
    building4.position.x = (-Math.random() - 0.5) * 30
    building4.position.z = (Math.random() - 0.5) * 90
    building4.scale.x = 1 + Math.random() * 5
    building4.scale.z = 1 + Math.random() * 5
    building4.scale.y = 1 + Math.random() * 12
    tour3.push(building4)
    for (let index = 0; index < tour3.length; index++) {
        scene.add(tour3[index])

    }
}

// Route scene 
const Route = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 150, 5, 100),

    new THREE.MeshLambertMaterial({ color: 0x00000 }),

)
Route.rotation.x = -Math.PI * 0.5
Route.position.y += 0.1
scene.add(Route)

// route 2 




var length = 12,
    width = 8;

var shape = new THREE.Shape();
shape.moveTo(0, 0);
shape.lineTo(0, width);
shape.lineTo(length, width);
shape.lineTo(length, 0);
shape.lineTo(0, 0);

var extrudeSettings = {
    steps: 10,
    depth: 10,
    bevelEnabled: 5,
    bevelThickness: 5,
    bevelSize: 1,
    bevelOffset: -4,
    bevelSegments: 1
};

var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
var materiall = new THREE.MeshNormalMaterial({ color: 0x00ff00 });
var mesh = new THREE.Mesh(geometry, materiall);
scene.add(mesh);

var length = 12,
    width = 8;

var shape = new THREE.Shape();
shape.moveTo(0, 0);
shape.lineTo(0, width);
shape.lineTo(length, width);
shape.lineTo(length, 0);
shape.lineTo(0, 0);

var extrudeSettingss = {
    steps: 10,
    depth: 10,
    bevelEnabled: 5,
    bevelThickness: 5,
    bevelSize: 1,
    bevelOffset: -4,
    bevelSegments: 1
};

var geometry2 = new THREE.ExtrudeGeometry(shape, extrudeSettingss);
var materiall2 = new THREE.MeshNormalMaterial({ color: 0x00ff00 });
var mesh2 = new THREE.Mesh(geometry2, materiall2);

scene.add(mesh2);

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 150, 1, 1),
    material
)
floor.rotation.x = -Math.PI * 0.5
scene.add(floor)

/**
 * Renderer
 */





const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)

/**
 * Light
 */
const directionLight = new THREE.DirectionalLight(0xff888, 0.3)
directionLight.castShadow = true
directionLight.position.x = 1
directionLight.position.y = 1
scene.add(directionLight)

/**
 * Loop
 */

const clok = new THREE.Clock()

const loop = () => {
    let delta = clok.getDelta()
    window.requestAnimationFrame(loop)

    // Update controls
    controlss.update(delta);
    for (let index = 0; index < traits.length; index++) {

        if (traits[index].position.z > 70) {
            traits[index].position.z = -45
        }
        traits[index].position.z += 0.1
    }

    for (let index = 0; index < tour.length; index++) {

        if (tour[index].position.z > 65) {
            tour[index].position.z = -45
        }
        tour[index].position.z += 0.1
    }
    for (let index = 0; index < tour2.length; index++) {

        if (tour2[index].position.z > 65) {
            tour2[index].position.z = -45
        }
        tour2[index].position.z += 0.1
    }

    for (let index = 0; index < tour3.length; index++) {

        if (tour3[index].position.z > 65) {
            tour3[index].position.z = -45
        }
        tour3[index].position.z += 0.1
    }

    mesh.position.x = Math.sin(Date.now() / 1000)
    mesh.position.y = Math.sin(Date.now() / 1200)


    mesh2.position.x = Math.PI * -4

    mesh2.position.z += 0.08



    particules.position.x = Math.PI * -5


    particules.position.y += 0.05
    particules.position.z += 0.05
    if (particules.position.y || particules.position.z > 10) {
        particules.position.y -= 0.05
        particules.position.z -= 0.05
    }

    // Render
    renderer.render(scene, camera)
}

loop()