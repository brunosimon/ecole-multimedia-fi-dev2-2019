import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

import laserImageSource from './assets/red.png'
import planetImageSource from './assets/planet.jpg'
import goldImageSource from './assets/gold.png'
import asteroidImageSource from './assets/asteroid.jpg'




let score = 0

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const matcapLaserSourceTexture = textureLoader.load(laserImageSource)
const asteroidSourceTexture = textureLoader.load(asteroidImageSource)
const matcapGoldSourceTexture = textureLoader.load(goldImageSource)
const planetSourceTexture = textureLoader.load(planetImageSource)

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


/**
 * Scene
 */
const scene = new THREE.Scene()

/**
 * Sizes
 */
const sizes = {}
sizes.width = window.innerWidth / 3 * 2 - 25
sizes.height = window.innerHeight - 50

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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setClearColor(0x000000, 1)
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)



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
 * INITIALIZE TEXTURES AND GEOMETRY
 */


const ringsGeometry = new THREE.TorusGeometry(0.3, 0.04, 16, 100)
// const ringsMaterial = new THREE.MeshMatcapMaterial({
//     matcap: matcapGoldSourceTexture
// }) 
// Chaque anneau doit avoir son material pour l'animation

const asteroidsGeometry = new THREE.SphereGeometry(0.2, 6, 5)
const asteroidsMaterial = new THREE.MeshLambertMaterial({
    map: asteroidSourceTexture
})

const shotGeometry = new THREE.CylinderGeometry(0.01, 0.01, 1, 8)
const shotMaterial = new THREE.MeshMatcapMaterial({
    matcap: matcapLaserSourceTexture
})



/**
 * Models
 */

// PLANET BACKGROUND
const planet = new THREE.Mesh(
    new THREE.PlaneGeometry(300, 200, 1),
    new THREE.MeshLambertMaterial({
        map: planetSourceTexture
    }))
planet.position.z = -800
scene.add(planet)
planet.matrixAutoUpdate = false
planet.updateMatrix()


// RINGS

//position rings
let ringsGroup = []
const ringsPositionsX = [
    1,
    1.3258568329717968,
    -2.9813015184381824,
    - 0.3079392624728823,
    3.525249457700656,
    3.7338394793926333,
    -1.6293275488069485,
    -1.049154013015181]
const ringsPositionsY = [
    1,
    0.5849858356940493,
    2.473087818696888,
    2.2875354107648667,
    -0.1,
    1.45949008498583,
    2.1932011331444903,
    1.684702549575066]
const ringsPositionsZ = [
    -220,
    -96.52999999999945,
    -180.32000000000014,
    - 49.51000000000016,
    -250,
    -356.3099999999951,
    -392.48999999998784,
    -272.5799999999971]

// create rings
for (let i = 0; i < 8; i++) {
    const ring = new THREE.Mesh(ringsGeometry,
        new THREE.MeshMatcapMaterial({
            matcap: matcapGoldSourceTexture
        }))
    ring.position.x = ringsPositionsX[i]
    ring.position.y = ringsPositionsY[i]
    ring.position.z = ringsPositionsZ[i]

    ringsGroup.push(ring)
}

// add rings to scene
for (let i = 0; i < ringsGroup.length; i++) {
    scene.add(ringsGroup[i])
}


// ASTEROIDS

// create asteroids
let asteroids = []
for (let i = 0; i < 200; i++) {

    let globe = new THREE.Mesh(asteroidsGeometry, asteroidsMaterial)

    globe.position.y = (Math.random()) * 10 - 0.5
    globe.position.x = (Math.random() - 0.5) * 30
    globe.position.z = Math.random() * 500 - 500

    asteroids.push(globe)
}

// add asteroids to scene
for (let i = 0; i < asteroids.length; i++) {
    scene.add(asteroids[i])
    asteroids[i].matrixAutoUpdate = false
    asteroids[i].updateMatrix()
}


// LOAD MODELS GLTF

// Load SpaceShip
let load = 0;
const spaceshipGroup = new THREE.Group()
spaceshipGroup.scale.set(0.001, 0.001, 0.001)
scene.add(spaceshipGroup)

gltfLoader.load(
    'Vaisseau_final.gltf',
    (gltf) => {
        console.log('success')
        console.log(gltf)
        load++
        while (gltf.scene.children.length) {
            const child = gltf.scene.children[0]
            spaceshipGroup.add(child)
        }


    },
    undefined,
    (error) => {
        console.log('error')
        console.log(error)
    }
)
// Place spaceship
spaceshipGroup.position.y = -0.2
spaceshipGroup.position.z = -1



// Load first map
const map_1 = new THREE.Group()
map_1.scale.set(0.002, 0.002, 0.005)
scene.add(map_1)

gltfLoader.load(
    'map_1.gltf',
    (gltf) => {
        load++
        console.log('success')
        console.log(gltf)

        while (gltf.scene.children.length) {
            const child = gltf.scene.children[0]
            map_1.add(child)
        }

        // for (let i = 1; i < map_1.children.length; i++) {
        //     map_1.children[i].material = THREE.NearestFilter
        //     map_1.children[i].material.wrapS = THREE.RepeatWrapping
        //     map_1.children[i].material.wrapT = THREE.RepeatWrapping
        //     map_1.children[i].material.repeat.x = 200
        //     map_1.children[i].material.repeat.y = 200
        //     map_1.children[i].material.repeat.z = 200
        // }

    },
    undefined,
    (error) => {
        console.log('error')
        console.log(error)
    }
)
// place first map
map_1.position.z = -110
map_1.position.y = -1
map_1.matrixAutoUpdate = false
map_1.updateMatrix()

// Load second map
const map_2 = new THREE.Group()
map_2.scale.set(0.002, 0.002, 0.005)
scene.add(map_2)

gltfLoader.load(
    'map_2.gltf',
    (gltf) => {
        load++
        console.log('success')
        console.log(gltf)

        while (gltf.scene.children.length) {
            const child = gltf.scene.children[0]
            map_2.add(child)
        }
    },
    undefined,
    (error) => {
        console.log('error')
        console.log(error)
    }
)
// place second map
map_2.position.z = -300
map_2.position.y = -1
map_2.matrixAutoUpdate = false
map_2.updateMatrix()


// SET THE MOUSE POSITION
const mouse2D = new THREE.Vector3(0, 1, 0.5);

document.addEventListener('mousemove', onDocumentMouseMove, false);
function onDocumentMouseMove(event) {

    event.preventDefault();
    mouse2D.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse2D.y = -(event.clientY / window.innerHeight) * 2 + 1;

}


// CREATINS SHOTS

let shots = []
document.addEventListener('click', onDocumentMouseClick, false);


function onDocumentMouseClick(event) {


    for (let i = 0; i < 0.3; i += 0.2) {
        let shot = new THREE.Mesh(shotGeometry, shotMaterial)

        shot.position.x = spaceshipGroup.position.x - 0.1 + i
        shot.position.z = spaceshipGroup.position.z - 2
        shot.position.y = spaceshipGroup.position.y - 0.1
        shot.rotation.x = mouse2D.y + Math.PI / 2 + 0.05
        shot.rotation.z = mouse2D.x + 0.32

        shots.push(shot)
    }
    event.preventDefault();

}


// INITIALIZE START / STOP / BOOST
let go = false;
let speed = 1
let activate_boost = false

//  when a touch is pressed
document.addEventListener('keypress', goPress, false);
function goPress(event) {
    if (event.key == 'a') {
        console.log(spaceshipGroup.position.x)
        console.log(spaceshipGroup.position.z)
        console.log(spaceshipGroup.position.y)
        go = !go
    }
    if (event.key == 'z') {
        speed += 5
        if (speed > 50) speed = 50
        activate_boost = true
    }
}

// desactivate boost
document.addEventListener('keyup', activate, false);
function activate(event) {
    if (event.key == 'z') {

        activate_boost = false
    }
}



// /**
//  * Orbit controls au cas où
//  */
// const controls = new OrbitControls(camera, renderer.domElement)
// controls.enableDamping = true
// controls.zoomSpeed = 0.3



/****************************************************************************************************************************
 * Loop
 *****************************************************************************************************************************/
const loop = () => {
    window.requestAnimationFrame(loop)


    // UPDATE SCORE
    document.getElementById("score").innerHTML = 'Score : ' + score;
    if (load != 3) {
        renderer.domElement.style.display = "none"
    }
    else {
        renderer.domElement.style.display = "initial"
    }



    //  ROTATION SPACESHIP AND CAMERA
    spaceshipGroup.rotation.y = -mouse2D.x - 0.32
    spaceshipGroup.rotation.x = mouse2D.y

    camera.rotation.y += -mouse2D.x - 0.32
    camera.rotation.y /= 5
    camera.rotation.x += mouse2D.y
    camera.rotation.x /= 5

    // update start / stop  + MOVE FORWARD SPACESHIP AND CAMERA 
    if ((go == true) && (load == 3)) {
        spaceshipGroup.position.z -= 0.2 + 0.01 * speed
        camera.position.z -= 0.2 + 0.01 * speed
    }
    // update boost
    if (activate_boost == false) speed -= 5
    if (speed < 1) speed = 1


    // VERTICAL AND HORIZONTAL MOVES SPACESHIP AND CAMERA
    if (mouse2D.y > 0) {
        spaceshipGroup.position.y += mouse2D.y / 2
        camera.position.y += mouse2D.y / 2
    }
    else if (mouse2D.y < 0) {
        spaceshipGroup.position.y += mouse2D.y / 2
        camera.position.y += mouse2D.y / 2
    }

    if (mouse2D.x > -0.32) {
        spaceshipGroup.position.x += (mouse2D.x + 0.32) / 2
        camera.position.x += (mouse2D.x + 0.32) / 2
    }
    else if (mouse2D.x < - 0.32) {
        spaceshipGroup.position.x += (mouse2D.x + 0.32) / 2
        camera.position.x += (mouse2D.x + 0.32) / 2
    }

    // LIMIT OF POSTIONS OF SPACESHIP/CAMERA
    if (spaceshipGroup.position.y >= 4) {
        spaceshipGroup.position.y = 4;
        camera.position.y = 4.2
    }
    if (spaceshipGroup.position.y <= -0.1) {
        spaceshipGroup.position.y = -0.1;
        camera.position.y = 0.1
    }
    if (spaceshipGroup.position.x >= 5.5) {
        spaceshipGroup.position.x = 5.5;
        camera.position.x = 5.5
    }
    if (spaceshipGroup.position.x <= -5.5) {
        spaceshipGroup.position.x = -5.5;
        camera.position.x = -5.5
    }

    // SHOTS MOVES
    for (let i = 0; i < shots.length; i++) {
        scene.add(shots[i])
        shots[i].position.z -= 1
        shots[i].position.x += shots[i].rotation.z * 1.1
        shots[i].position.y += shots[i].rotation.x - Math.PI / 2
        if (shots[i].position.z < spaceshipGroup.position.z - 20) {
            scene.remove(shots[i])
            shots.splice(i, 1)
        }
    }

    // COLLISION SHOTS WITH ASTEROIDS
    for (let i = 0; i < shots.length; i++) {
        for (let j = 0; j < asteroids.length; j++) {

            if ((shots[i].position.y < asteroids[j].position.y + 0.1)
                && (shots[i].position.y > asteroids[j].position.y - 0.1)
                && (shots[i].position.x < asteroids[j].position.x + 0.1)
                && (shots[i].position.x > asteroids[j].position.x - 0.1)
                && (shots[i].position.z < asteroids[j].position.z + 5)
                && (shots[i].position.z > asteroids[j].position.z)
            ) {
                score += 20

                scene.remove(asteroids[j])
                asteroids.splice(j, 1)
            }
        }
    }

    // COLLISION SPACESHIP WITH RINGS
    for (let j = 0; j < ringsGroup.length; j++) {
        if ((spaceshipGroup.position.y < ringsGroup[j].position.y + 0.5)
            && (spaceshipGroup.position.y > ringsGroup[j].position.y - 0.5)
            && (spaceshipGroup.position.x < ringsGroup[j].position.x + 0.5)
            && (spaceshipGroup.position.x > ringsGroup[j].position.x - 0.5)
            && (spaceshipGroup.position.z < ringsGroup[j].position.z + 0.2)
            && (spaceshipGroup.position.z > ringsGroup[j].position.z - 0.5)
        ) {
            // Animation when collide
            ringsGroup[j].material.color.r = 0
            ringsGroup[j].material.color.g = 1
            setInterval(ringsGroup[j].scale.y -= 0.2)
            setInterval(ringsGroup[j].scale.x -= 0.2)
            ringsGroup[j].position.z -= 0.2 + 0.01 * speed



        }
        //  when animation is finished
        if (ringsGroup[j].scale.y <= 0) {
            score += 200
            scene.remove(ringsGroup[j])
            ringsGroup.splice(j, 1)

        }
    }


    // Render
    renderer.render(scene, camera)
}

loop()