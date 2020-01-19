import * as THREE from 'three'

import buildingColorImageSource from './assets/images/building/color2.jpg'

import tilesColorImageSource from './assets/images/tiles/color.jpg'
import tilesNormalImageSource from './assets/images/tiles/normal.jpg'

import roadColorImageSource from './assets/images/road/color.jpg'
import roadAmbientOcclusionImageSource from './assets/images/road/ambientOcclusion.jpg'
import roadNormalImageSource from './assets/images/road/normal.jpg'

import rainImageSource from './assets/images/particles/12.png'


/**
 * Textures
 */

//Instantiate a texture loader
const textureLoader = new THREE.TextureLoader();

//Create rain texture
const rainTexture = textureLoader.load(rainImageSource)

//Create building texture
const buildingColorTexture = textureLoader.load(buildingColorImageSource)

// Create road texture
const roadColorTexture = textureLoader.load(roadColorImageSource)
const roadAmbientOcclusionTexture = textureLoader.load(roadAmbientOcclusionImageSource)
const roadNormalTexture = textureLoader.load(roadNormalImageSource)

roadColorTexture.wrapS = THREE.RepeatWrapping;
roadColorTexture.wrapT = THREE.RepeatWrapping;
roadColorTexture.repeat.z = 100;
roadColorTexture.repeat.x = 10;
roadColorTexture.rotation = Math.PI/2
roadAmbientOcclusionTexture.repeat.z = 100;
roadAmbientOcclusionTexture.repeat.x = 10;
roadAmbientOcclusionTexture.rotation = Math.PI/2
roadNormalTexture.repeat.z = 100;
roadNormalTexture.repeat.x = 10;
roadNormalTexture.rotation = Math.PI/2

// Create tiles texture
const tilesColorTexture = textureLoader.load(tilesColorImageSource)
const tilesNormalTexture = textureLoader.load(tilesNormalImageSource)

tilesColorTexture.wrapS = THREE.RepeatWrapping;
tilesColorTexture.wrapT = THREE.RepeatWrapping;
tilesColorTexture.repeat.x = 50
tilesColorTexture.repeat.y = 50


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
camera.position.y = 1.5
camera.position.z = 50

document.addEventListener('keypress',function(event){
    switch (event.key){
        case "z":
            camera.position.z -= 0.3
            break;
        case "s":
            camera.position.z += 0.3
            break;
        case "q":
            camera.rotation.y += Math.PI/30
            break;
        case "d":
            camera.rotation.y -= Math.PI/30
            break;
        }
    })

scene.add(camera)


/**
 * Light
 */
const pointLight = new THREE.PointLight(0xffffff, 1, 300)
pointLight.position.x = 100
pointLight.position.y = 100
pointLight.position.z = 50
scene.add(pointLight)


/**
 * City
 */

//rain
    // Geometry
    const rainGeometry = new THREE.Geometry()

    for(let i = 0; i < 100000; i++)
    {
        const vertice = new THREE.Vector3(
            (Math.random() - 0.5) * 20,
            Math.random() * 20,
            (Math.random() - 0.5) * 100
        )
        rainGeometry.vertices.push(vertice)
    }

    // Material
    const rainMaterial = new THREE.PointsMaterial({
        color: new THREE.Color(0xC9FFFD),
        size: 0.1,
        alphaMap: rainTexture,
        transparent: true,
        depthWrite: false
    })

    // Points
    const rain = new THREE.Points(rainGeometry, rainMaterial)
    scene.add(rain)

// Floor
const floorMaterial = new THREE.MeshStandardMaterial({
    map: tilesColorTexture,
    normalMap: tilesNormalTexture,
})

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100, 1, 1),
    floorMaterial
)
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

//Buildings
const buildingMaterial = new THREE.MeshStandardMaterial({
    map: buildingColorTexture,
})

const buildingGeometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1)
buildingGeometry.translate(0, 0.5, 0)

for (let i = 0; i < 1000; i++)
{
    //pas d'immeuble sur les routes
    const x = (Math.random() - 0.5) * 100
    const z = (Math.random() - 0.5) * 100

    if(x<-3.5 || x>3.5){
        const building = new THREE.Mesh(
            buildingGeometry,
            buildingMaterial
        )
        building.position.x = x
        building.position.z = z
        building.scale.x = 1 + Math.random()*3
        building.scale.z = 1 + Math.random()*3
        building.scale.y = 1 + Math.random()*5
        scene.add(building);
    }
}

//Road
const roadGeometry = new THREE.BoxGeometry(3, 0.001, 100, 1, 1, 1)
roadGeometry.translate(0, 0.004, 0)

const roadMaterial = new THREE.MeshStandardMaterial({
    map: roadColorTexture,
    aoMap: roadAmbientOcclusionTexture,
    normalMap: roadNormalTexture,
})

const road = new THREE.Mesh(
    roadGeometry,
    roadMaterial
)
scene.add(road)

//Car
let xcar = 0.7

//for(let i=0; i<8; i++) {

    //Random position
    //zcar = zcar + 5 + Math.random()*10

    //left or right
    xcar = xcar*-1
    
    const car = new THREE.Group()

    let r = Math.random()
    let g = Math.random()
    let b = Math.random()
    
    const carBodyBottomGeometry = new THREE.BoxGeometry(0.5, 0.2, 0.9, 1, 1, 1)
    carBodyBottomGeometry.translate(0, 0.4, 0)

    const carBodyBottomMaterial = new THREE.MeshStandardMaterial({
        color : new THREE.Color(r, g, b),
        roughness: 0.5,
        metalness: 0.5
    })
    
    const carBodyBottom = new THREE.Mesh(
        carBodyBottomGeometry,
        carBodyBottomMaterial
    )
    car.add(carBodyBottom)
    
    const carBodyTopGeometry = new THREE.BoxGeometry(0.5, 0.16, 0.35, 1, 1, 1)
    carBodyTopGeometry.translate(0, 0.56, 0)
    
    const carBodyTopMaterial = new THREE.MeshStandardMaterial({
        color : new THREE.Color(r, g, b),
        roughness: 0.5,
        metalness: 0.5
    })
    
    const carBodyTop = new THREE.Mesh(
        carBodyTopGeometry,
        carBodyTopMaterial
    )
    car.add(carBodyTop)
    
    const weel1Geometry = new THREE.CylinderGeometry(0.1, 0.1, 0.05)
    
    const weel1Material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x000000),
    })
    
    const weel1 = new THREE.Mesh(
        weel1Geometry,
        weel1Material
    )
    weel1.position.x = 0.27
    weel1.position.y = 0.32
    weel1.position.z = 0.2
    weel1.rotation.z = -Math.PI/2
    car.add(weel1)
    
    const weel2Geometry = new THREE.CylinderGeometry(0.1, 0.1, 0.05)
    
    const weel2Material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x000000),
    })
    
    const weel2 = new THREE.Mesh(
        weel2Geometry,
        weel2Material
    )
    weel2.position.x = -0.27
    weel2.position.y = 0.32
    weel2.position.z = 0.2
    weel2.rotation.z = -Math.PI/2
    car.add(weel2)
    
    const weel3Geometry = new THREE.CylinderGeometry(0.1, 0.1, 0.05)
    
    const weel3Material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x000000),
    })
    
    const weel3 = new THREE.Mesh(
        weel3Geometry,
        weel3Material
    )
    weel3.position.x = 0.27
    weel3.position.y = 0.32
    weel3.position.z = -0.2
    weel3.rotation.z = -Math.PI/2
    car.add(weel3)
    
    const weel4Geometry = new THREE.CylinderGeometry(0.1, 0.1, 0.05)
    
    const weel4Material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x000000),
    })
    
    const weel4 = new THREE.Mesh(
        weel4Geometry,
        weel4Material
    )
    weel4.position.x = -0.27
    weel4.position.y = 0.32
    weel4.position.z = -0.2
    weel4.rotation.z = -Math.PI/2
    car.add(weel4)
    
    car.position.x = xcar
    car.position.y = -0.2
    car.position.z = -48

    scene.add(car)
//}

//Lights
const lightBodyGeometry = new THREE.CylinderGeometry(0.025, 0.08, 0.8)
lightBodyGeometry.translate(0, 0.45, 0)

const lightBodyMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xffffff)
})

const lightHeadGeometry = new THREE.SphereGeometry(0.15, 5, 8)
lightHeadGeometry.translate(0, 0.9, 0)

const lightHeadMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xFFFF00),
    roughness: 0,
    metalness: 0.5
})

let zlight = -50
let xlight = 1.7

for (let i = 0; i < 10; i++)
{
    const light = new THREE.Group()

    zlight=zlight+10

    xlight = xlight*-1


    const lightBody = new THREE.Mesh(
        lightBodyGeometry,
        lightBodyMaterial
    )
    light.add(lightBody);

    const lightHead = new THREE.Mesh(
        lightHeadGeometry,
        lightHeadMaterial
    )
    light.add(lightHead);
        
    light.position.z = zlight
    light.position.x = xlight
    
    scene.add(light);

    const pointLight = new THREE.PointLight(0xFFFDC8, 0.2)
    pointLight.position.x = xlight
    pointLight.position.y = 1
    pointLight.position.z = zlight
    pointLight.castShadow = true
    scene.add(pointLight)

    /*const pointLightHelper = new THREE.PointLightHelper(pointLight)
    scene.add(pointLightHelper)*/

}


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)
//renderer.setClearColor (0x8ed2ff, 1);


/**
 * Loop
 */
const loop = () =>
{
    window.requestAnimationFrame(loop)

    //Render
    renderer.render(scene, camera)

    //Update rain
    for(const _vertice of rainGeometry.vertices)
    {
        _vertice.y -= 0.02

        if(_vertice.y < 0)
        {
            _vertice.y = 20
        }
    }
    rainGeometry.verticesNeedUpdate = true

    //Update car
    car.position.z += 0.1

    if (car.position.z>50){
        car.position.z = -48
        
        carBodyTopMaterial.color.r = Math.random()
        carBodyTopMaterial.color.g = Math.random()
        carBodyTopMaterial.color.b = Math.random()

        carBodyBottomMaterial.color.r = carBodyTopMaterial.color.r
        carBodyBottomMaterial.color.g = carBodyTopMaterial.color.g
        carBodyBottomMaterial.color.b = carBodyTopMaterial.color.b
    }
}

loop()