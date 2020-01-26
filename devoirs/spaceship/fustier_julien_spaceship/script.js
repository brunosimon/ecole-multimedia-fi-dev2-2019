import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DARCOLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

/**
 * GLTFLoader
 */
/*const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')*/

const gltfLoader = new GLTFLoader()

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
 * Keyboard
 */
const keyboard = {}
keyboard.a = false
keyboard.w = false
keyboard.up = false
keyboard.right = false
keyboard.down = false
keyboard.left = false

document.addEventListener('keydown', (_event) =>
{
    switch(_event.code)
    {
        case 'KeyQ':
        keyboard.a = true
    }

    switch(_event.code)
    {
        case 'KeyW':
        keyboard.w = true
    }

    switch(_event.code)
    {
        case 'ArrowUp':
            keyboard.up = true
    }

    switch(_event.code)
    {
        case 'ArrowRight':
            keyboard.right = true
    }

    switch(_event.code)
    {
        case 'ArrowDown':
            keyboard.down = true
    }

    switch(_event.code)
    {
        case 'ArrowLeft':
            keyboard.left = true
    }
})

document.addEventListener('keyup', (_event) =>
{
    switch(_event.code)
    {
        case 'ArrowUp':
            keyboard.up = false
    }

    switch(_event.code)
    {
        case 'ArrowRight':
            keyboard.right = false
    }

    switch(_event.code)
    {
        case 'ArrowDown':
            keyboard.down = false
    }

    switch(_event.code)
    {
        case 'ArrowLeft':
            keyboard.left = false
    }
})

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 10000)
scene.add(camera)
//camera.position.z = 2000
//camera.position.y = 35

camera.rotation.y = Math.PI

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setClearColor(0x000000, 1)
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
document.body.appendChild(renderer.domElement)

/**
 * Orbit controls
 */
/*const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.zoomSpeed = 2*/

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

// Test
/*const test = new THREE.Mesh(
    new THREE.SphereGeometry(40, 32, 32),
    new THREE.MeshStandardMaterial({ wireframe: true })
)

test.position.z -= 20
scene.add(test)*/

/**
 * Load Mode
 */
const SpaceShipGroup = new THREE.Group()
gltfLoader.load(
    "modele/Space ship/U wing final.gltf",
    (gltf) =>
    {
        console.log('sucess')
        console.log(gltf)
        while(gltf.scene.children.length)
        {
            SpaceShipGroup.add(gltf.scene.children[0])
        }
    },
    (progress) =>
    {
        console.log('progress')
        console.log(progress)
    },
    (error) =>
    {
        console.log('error')
        console.log(error)
    }
)

scene.add(SpaceShipGroup)
SpaceShipGroup.scale.set(0.2, 0.2, 0.2)

SpaceShipGroup.position.y = 28
SpaceShipGroup.position.z = 0
//47500

SpaceShipGroup.rotation.order = 'YXZ'
SpaceShipGroup.rotation.y = Math.PI / 2

/**
 * Map
 */

//Border
const ground = new THREE.Mesh(
    new THREE.BoxBufferGeometry(300, 100000, 10),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
)

ground.position.z = 0
ground.rotation.x = -Math.PI * 0.5

const borderLeft = new THREE.Mesh(
    new THREE.CylinderBufferGeometry(15, 15, 100000, 32),
    new THREE.MeshBasicMaterial({ color: 0xff0000})
)

borderLeft.rotation.x = -Math.PI / 2
borderLeft.position.x = -150

const borderRight = new THREE.Mesh(
    new THREE.CylinderBufferGeometry(15, 15, 100000, 32),
    new THREE.MeshBasicMaterial({ color: 0xff0000})
)

borderRight.rotation.x = Math.PI / 2
borderRight.position.x = 150

const mapGroup = new THREE.Group()
mapGroup.add(ground, borderLeft, borderRight)

scene.add(mapGroup)

//Collision debug
const sphereGeometry = new THREE.SphereBufferGeometry(6, 6, 20)
const sphereMaterial = new THREE.MeshBasicMaterial({color: 0xff0000})


//Obstacle

//Wall
let positionListWall = {}
positionListWall.x = []
positionListWall.z = []

const wallGeometry = new THREE.BoxBufferGeometry(120, 5, 45, 32)
const wallMaterial = new THREE.MeshStandardMaterial()
for(let i = 0; i < 20; i++)
{
    const wall = new THREE.Mesh(
        wallGeometry,
        wallMaterial
    )

    wall.position.x = (Math.random() - 0.5) * 200
    wall.position.y = 25
    wall.position.z = 500 + i * 1000
    wall.rotation.x = Math.PI * 0.5

    scene.add(wall)
    positionListWall.x[i] = wall.position.x
    positionListWall.z[i] = wall.position.z
}

console.log(SpaceShipGroup.position)

//Fence
let positionListFence = {}
positionListFence.x = []
positionListFence.z = []

const leftFence = new THREE.Mesh(
    new THREE.BoxBufferGeometry(100, 5, 80, 32),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
)

leftFence.position.x = 100
leftFence.position.z = 20500
leftFence.position.y = 50
leftFence.rotation.x = Math.PI * 0.5

positionListFence.x.push(leftFence.position.x)
positionListFence.z.push(leftFence.position.z)

scene.add(leftFence)

const rightFence = new THREE.Mesh(
    new THREE.BoxBufferGeometry(100, 5, 80, 32),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
)

rightFence.position.x = -100
rightFence.position.z = 20500
rightFence.position.y = 50
rightFence.rotation.x = Math.PI * 0.5

positionListWall.x.push(rightFence.position.x)
positionListWall.z.push(rightFence.position.z)

scene.add(rightFence)

//Cone
let positionListCone = {}
positionListCone.x = []
positionListCone.z = []

const coneGeometry = new THREE.CylinderBufferGeometry(2, 2, 30, 10)
const coneMaterial = new THREE.MeshBasicMaterial({color: 0xff0000})
for(let i = 0; i < 30; i++)
{
    const leftCone = new THREE.Mesh(
        coneGeometry,
        coneMaterial
    )

    leftCone.position.x = 50
    leftCone.position.y = 25
    leftCone.position.z = 20600 - i * -50

    positionListCone.x.push(leftCone.position.x)
    positionListCone.z.push(leftCone.position.z)

    scene.add(leftCone)

    const rightCone = new THREE.Mesh(
        coneGeometry,
        coneMaterial
    )

    rightCone.position.x = -50
    rightCone.position.y = 25
    rightCone.position.z = 20600 - i * -50

    positionListCone.x.push(rightCone.position.x)
    positionListCone.z.push(rightCone.position.z)

    scene.add(rightCone)
}

//Tower
let positionListTower = {}
positionListTower.x = []
positionListTower.z = []

const towerGeometry = new THREE.CylinderBufferGeometry(40, 40, 500, 10)
const towerMaterial = new THREE.MeshBasicMaterial({color: 0x0000ff})
for(let i = 0; i < 10; i ++)
{
    const tower = new THREE.Mesh(
        towerGeometry,
        towerMaterial
    )

    tower.position.x = (Math.random() - 0.5) * 200
    tower.position.y = 25
    tower.position.z = 23000 + i * 1000

    positionListTower.x.push(tower.position.x)
    positionListTower.z.push(tower.position.z)

    scene.add(tower)
}

//Tunnel

const tunnelGeometry = new THREE.TorusGeometry( 200, 30, 10, 10)
const tunnelMaterial1 = new THREE.MeshBasicMaterial({color: 0xffff00})
const tunnelMaterial2 = new THREE.MeshBasicMaterial({color: 0x008000})
const tunnelMaterial3 = new THREE.MeshBasicMaterial({color: 0x0000ff})

for(let i = 0; i < 20; i++)
{
    const tunnel1 = new THREE.Mesh(
        tunnelGeometry,
        tunnelMaterial1
    )

    tunnel1.position.x = 0
    tunnel1.position.y = 25
    tunnel1.position.z = 34000 + i * 50

    scene.add(tunnel1)

    const tunnel2 = new THREE.Mesh(
        tunnelGeometry,
        tunnelMaterial2
    )

    tunnel2.position.x = 0
    tunnel2.position.y = 25
    tunnel2.position.z = 35000 + i * 50

    scene.add(tunnel2)

    const tunnel3 = new THREE.Mesh(
        tunnelGeometry,
        tunnelMaterial3
    )

    tunnel3.position.x = 0
    tunnel3.position.y = 25
    tunnel3.position.z = 36000 + i * 50

    scene.add(tunnel3)
}

const finishLine = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(300, 20, 10),
    new THREE.MeshBasicMaterial({color: 0xff0000, side: THREE.DoubleSide})
)

finishLine.position.z = 38000
// finishLine.rotation.x = Math.PI * 0.5

scene.add(finishLine)

/**
 * Loop
 */

let speed = 0
let lag = 0.001
let elapsedTime = 0
let finishTime = 0
let showTime = document.querySelector("#chronotime")

const loop = () =>
{
    window.requestAnimationFrame(loop)

    //Update controls
    //controls.update()

    if(keyboard.right && SpaceShipGroup.position.x > - 110)
    {
        SpaceShipGroup.position.x -= 6
        SpaceShipGroup.rotation.x += ((Math.PI * -0.07) - SpaceShipGroup.rotation.x) * 0.1
    }

    if(keyboard.left && SpaceShipGroup.position.x < 110)
    {
        SpaceShipGroup.position.x += 6
        SpaceShipGroup.rotation.x += ((Math.PI * 0.07) - SpaceShipGroup.rotation.x) * 0.1
    }

    if(!(keyboard.left) && !(keyboard.right))
    {
        SpaceShipGroup.rotation.x += (0 - SpaceShipGroup.rotation.x) * 0.1
    }

    if(!(keyboard.up) && !(keyboard.down))
    {
        SpaceShipGroup.rotation.z += (0 - SpaceShipGroup.rotation.z) * 0.1
    }

    camera.position.x += (SpaceShipGroup.position.x - camera.position.x) * 0.1
    camera.position.y += (SpaceShipGroup.position.y - camera.position.y) * 0.1 + 4
    camera.position.z += (SpaceShipGroup.position.z - camera.position.z) * 0.5 - 25

    if(keyboard.down)
    {
        SpaceShipGroup.rotation.z = ((-Math.PI * 0.5) - SpaceShipGroup.rotation.z) * 0.1
        lag += (0.1 - lag) * 0.001
    }

    if(keyboard.up)
    {
        SpaceShipGroup.rotation.z += ((Math.PI * 0.07) - SpaceShipGroup.rotation.z) * 0.1
        lag = 0.001
        speed += (2.5 - speed) * 0.005
        SpaceShipGroup.position.z += 20 * speed
    }

    else
    {
        if(speed > 0)
        {
            speed += (-0.9 - speed) * lag
            SpaceShipGroup.position.z += 10 * speed
        }
    }

    //Collision Wall Systeme
    for(let i = 0; i < positionListWall.z.length; i++)
    {
        if(SpaceShipGroup.position.x >= positionListWall.x[i] - 80 && SpaceShipGroup.position.x <= positionListWall.x[i] + 100)
        {
            if(SpaceShipGroup.position.z >= positionListWall.z[i] - 80 && SpaceShipGroup.position.z <= positionListWall.z[i] + 5)
            {
                speed = 0
                console.log("debug")
            }
        }
    }

    //Collision Fence Systeme
    for(let i = 0; i < positionListCone.z.length; i++)
    {
        if(SpaceShipGroup.position.x >= positionListCone.x[i] - 5 && SpaceShipGroup.position.x <= positionListCone.x[i] + 5)
        {
            if(SpaceShipGroup.position.z >= positionListCone.z[i] - 5 && SpaceShipGroup.position.z <= positionListCone.z[i] + 5)
            {
                speed = 0
                console.log("debug")
            }
        }
    }

     //Collision Cone Systeme
     for(let i = 0; i < positionListCone.z.length; i++)
     {
         if(SpaceShipGroup.position.x <= positionListCone.x[i] - 5 && SpaceShipGroup.position.x >= positionListCone.x[i] + 5)
         {
             if(SpaceShipGroup.position.z <= positionListCone.z[i] - 5 && SpaceShipGroup.position.z <= positionListCone.z[i] + 5)
             {
                 speed = 0
                 console.log("debug")
             }
         }
     }

    //Collision Tower Systeme
    for(let i = 0; i < positionListCone.z.length; i++)
    {
        if(SpaceShipGroup.position.x >= positionListTower.x[i] - 40 && SpaceShipGroup.position.x <= positionListTower.x[i] + 10)
        {
            if(SpaceShipGroup.position.z >= positionListTower.z[i] - 80 && SpaceShipGroup.position.z <= positionListTower.z[i] + 2)
            {
                speed = 0
                console.log("debug")
            }
        }
    }

    console.log(SpaceShipGroup.position.z)

    // Render
    renderer.render(scene, camera)
    
    function timer(time)
    {
        let sec_num = parseInt(time, 10)
        let hours   = Math.floor(sec_num / 3600)
        let minutes = Math.floor((sec_num - (hours * 3600)) / 60)
        let seconds = sec_num - (hours * 3600) - (minutes * 60)
        if (hours   < 10) {hours   = "0"+ hours}
        if (minutes < 10) {minutes = "0"+ minutes}
        if (seconds < 10) {seconds = "0"+ seconds}
        return minutes +':'+ seconds
    }

    if(keyboard.a == true)
    {
        document.getElementById("introduction").style.display = "none"

        elapsedTime += Date.now() - (Date.now() - 1)
        showTime.textContent = "Time : " + timer(elapsedTime)
    }

    if(SpaceShipGroup.position.z >= 38000)
    {
        document.getElementById("chronotime").style.display = "none"
        finishTime = timer(elapsedTime)
        showTime.textContent = "Congratulation: " + finishTime
    }

}
loop()