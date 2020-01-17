import * as THREE from 'three'
import { OctahedronGeometry } from 'three'
import RoadColorSource from './asset/Textures/Road_color.jpg'
import sidewalkSource from './asset/Textures/sidewalk.jpg'
import building1Source from './asset/Textures/building1.jpg'
import building2Source from './asset/Textures/building2.jpg'
import building3Source from './asset/Textures/building3.jpg'
import potSource from './asset/Textures/pot.jpg'
import particleImageSource from './asset/particles/4.png'

const textureLoader = new THREE.TextureLoader()
const RoadColorTexture = textureLoader.load(RoadColorSource)
const sidewalkTexture = textureLoader.load(sidewalkSource)
const building1Texture = textureLoader.load(building1Source)
const building2Texture = textureLoader.load(building2Source)
const building3Texture = textureLoader.load(building3Source)
const potTexture = textureLoader.load(potSource)
const particleTexture = textureLoader.load(particleImageSource)


RoadColorTexture.wrapS = THREE.RepeatWrapping
RoadColorTexture.wrapT = THREE.RepeatWrapping
RoadColorTexture.repeat.x = 1
RoadColorTexture.repeat.y = 10

sidewalkTexture.wrapS = THREE.RepeatWrapping
sidewalkTexture.wrapT = THREE.RepeatWrapping
sidewalkTexture.repeat.x = 5
sidewalkTexture.repeat.y = 50

/**
 * Scene
 */
const scene = new THREE.Scene()

/**
 * Sizes
 */
const sizes = {
    width : window.innerWidth,
    height : window.innerHeight
}
window.addEventListener('resize', () =>{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    renderer.setSize(sizes.width, sizes.height)

    camera.aspect = sizes.width/sizes.height
    camera.updateProjectionMatrix()
})


/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(90, sizes.width / sizes.height, 0.1,100)
camera.position.z = 1
camera.position.y = 1
scene.add(camera)

/**
 * controls
 */
document.addEventListener('keypress', (e) => { 
switch (e.key) {
    case "z":
        camera.position.z -= 0.1
        break;
    case "a":
        CreatCar()
        break;
    case "s":
        camera.position.z += 0.1
        break;
    }
});
document.addEventListener("mousemove", (e) =>{
    camera.rotation.y = -(e.clientX/sizes.width-0.5)*1.3
    camera.rotation.x = -(e.clientY/sizes.height-0.5)*1.3
})


/**
 * Light
 */
const pointLight = new THREE.AmbientLight(0x333333)
scene.add(pointLight)


/**
 * objects
 */

// --- road --- //

const road_mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 100, 100, 100),
    new THREE.MeshStandardMaterial(
        {
            map: RoadColorTexture,
        }))
scene.add(road_mesh)
road_mesh.rotation.x = -Math.PI/2
road_mesh.position.z = -48

// --- sidewalks --- //

const sidewalk_meshR = new THREE.Mesh(
    new THREE.BoxGeometry(5,0.1,100),
    new THREE.MeshStandardMaterial(
        {
            map: sidewalkTexture,
        }))
scene.add(sidewalk_meshR)
sidewalk_meshR.position.x = 3.5
sidewalk_meshR.position.z = -48

const sidewalk_meshL = new THREE.Mesh(
    new THREE.BoxGeometry(5,0.1,100),
    new THREE.MeshStandardMaterial(
        {
            map: sidewalkTexture,
        }))
scene.add(sidewalk_meshL)
sidewalk_meshL.position.x = -3.5
sidewalk_meshL.position.z = -48

// --- Buldings --- //

function CreatBulding(number,side) {
    let pos_z = 0
    let mainBuilding = new THREE.BoxGeometry( 0.9, 1, 0.9,)
    let height = 0
    for (let index = 0; index < number; index++) {  
        let pos_x = side
        if (Math.random()>0.85) {
            pos_z -= 1
            CreatThree(side,pos_z)
            pos_z -= 1
        }else{
            pos_z -=1
        }
        
        height = Math.round(Math.random() * 5)+2

        let chooseBuilding = ""

        switch (Math.round(Math.random() * 2)) {
            case 0:
                chooseBuilding = building1Texture
            break;
            case 1:
                chooseBuilding = building2Texture
            break;
            default:
                chooseBuilding = building3Texture
            break;
        }

        const building_mesh = new THREE.Mesh(
            mainBuilding,
            new THREE.MeshStandardMaterial({map : chooseBuilding})
            )

        building_mesh.scale.y = height
        building_mesh.position.x = pos_x
        building_mesh.position.z = pos_z
        building_mesh.position.y = height/2
        scene.add(building_mesh)
    
        chooseBuilding.wrapT = THREE.RepeatWrapping
        chooseBuilding.wrapS = THREE.RepeatWrapping
        chooseBuilding.repeat.y = 5
    }
}

// --- Three --- //

function CreatThree(actualX,actualZ) {
    for (let index = 0; index < 1; index++) {  
        let pos_x = actualX
        let pos_z = actualZ

        const pot_geometry2 = new THREE.BoxGeometry( 0.4, 0.4, 0.4)
        const pot_material2 = new THREE.MeshStandardMaterial({map: potTexture})
        const pot_mesh = new THREE.Mesh(pot_geometry2,pot_material2)
        pot_mesh.position.x = pos_x
        pot_mesh.position.z = pos_z
        pot_mesh.position.y = -0.12
        scene.add(pot_mesh)

        const trunk_geometry2 = new THREE.CylinderGeometry( 0.03, 0.07, 0.7, 20 )
        const trunk_material2 = new THREE.MeshStandardMaterial({color: 0x442211})
        const trunk_mesh2 = new THREE.Mesh(trunk_geometry2,trunk_material2)
        trunk_mesh2.position.x = pos_x
        trunk_mesh2.position.z = pos_z
        trunk_mesh2.position.y = 0.4

        scene.add(trunk_mesh2)
    
        const leaves_geometry2 = new OctahedronGeometry(0.4,1)
        const leaves_material2 = new THREE.MeshStandardMaterial({color: 0x115511})
        const leaves_mesh2 = new THREE.Mesh(leaves_geometry2,leaves_material2)
        leaves_mesh2.position.x = pos_x
        leaves_mesh2.position.z = pos_z
        leaves_mesh2.position.y = 0.9
        scene.add(leaves_mesh2)
    }
}

// --- cars --- //


const allRightCars = []
const mainBoxGeometry = new THREE.BoxGeometry( 0.55, 0.4, 0.7)
const mainBoxMaterial = new THREE.MeshStandardMaterial({color: 0xCC3434})
const wheelGeometry = new THREE.CylinderGeometry( 0.1,0.1,0.7)
const wheelMaterial = new THREE.MeshStandardMaterial({color: 0x333333})

function CreatCar(){
    const groupCar = new THREE.Group()
    scene.add(groupCar)

    const Car_main = new THREE.Mesh(
        mainBoxGeometry,
        mainBoxMaterial
        )
    Car_main.position.x = 0.4
    Car_main.position.y = 0.25
    groupCar.add(Car_main)

    const front_wheel = new THREE.Mesh(
        wheelGeometry,
        wheelMaterial
        )
    front_wheel.position.x = 0.4
    front_wheel.position.y = 0.1
    front_wheel.position.z = 0.2
    front_wheel.rotation.z = Math.PI/2
    groupCar.add(front_wheel)

    const back_wheel = new THREE.Mesh(
        wheelGeometry,
        wheelMaterial
        )
    back_wheel.position.x = 0.4
    back_wheel.position.y = 0.1
    back_wheel.position.z = -0.2
    back_wheel.rotation.z = Math.PI/2
    groupCar.add(back_wheel)

    allRightCars.push(groupCar)
}
// -movecars- //
const moveCarRight = () =>{
    for (let index = 0; index < allRightCars.length; index++) {
        allRightCars[index].position.z -= 0.1
        if (allRightCars[index].position.z <= -100) {
            scene.remove(allRightCars[index]);
            allRightCars.splice(0,index);
        }
    }
}

// --- stars --- //

const CreatStars = (number) =>{
    const particlesGeometry = new THREE.Geometry()
    for (let index = 0; index < number; index++) {
        const vertices = new THREE.Vector3(
            (Math.random()-0.5)*50,
            20,
            (Math.random()-0.5)*500)
        particlesGeometry.vertices.push(vertices)
    }
    const star = new THREE.Points(
        particlesGeometry, 
        new THREE.PointsMaterial({
            color: 0xFFFFFF,
            size: Math.random()/2+0.3,
            alphaMap : particleTexture,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        }))
        scene.add(star)
}

// --- street lamps --- //


function CreatLamp(number,side){
    let posZ = 0
    const lampBarGeometry = new THREE.CylinderGeometry(0.05,0.05,0.8,8)
    const lampBarMaterial = new THREE.MeshStandardMaterial({color: 0x666666})
    const lampSphereGeometry = new THREE.IcosahedronGeometry(0.15,2)
    const lampSphereMaterial = new THREE.MeshBasicMaterial({color: 0xFFFF55})
    
    for (let index = 0; index < number; index++) { 
        const lampLight = new THREE.PointLight(0xFFFFFF,0.8,8)
        const lampBar = new THREE.Mesh(lampBarGeometry,lampBarMaterial)
        const lampSphere = new THREE.Mesh(lampSphereGeometry,lampSphereMaterial)
        lampBar.position.x = side
        lampBar.position.z = posZ
        lampBar.position.y = 0.4
        lampSphere.position.x = side
        lampSphere.position.z = posZ
        lampSphere.position.y = 0.8
        lampLight.position.x = side
        lampLight.position.z = posZ
        lampLight.position.y = 0.8
        
        posZ -= 10
        scene.add(lampBar)
        scene.add(lampLight)
        scene.add(lampSphere)
    }
    
}

// --- Creation --- //

CreatBulding(83,2)
CreatBulding(83,3)
CreatBulding(83,4)
CreatBulding(83,-2)
CreatBulding(83,-3)
CreatBulding(83,-4)

CreatLamp(10,1.1)
CreatLamp(10,-1.1)

CreatStars(1500)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)


/**
 * Loop
 */
const loop = () =>
{
    window.requestAnimationFrame(moveCarRight)
    window.requestAnimationFrame(loop)
    
    renderer.render(scene, camera)
}
loop()