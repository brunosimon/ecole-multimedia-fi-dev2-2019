import * as THREE from 'three'
import roadTextureImageSource from './assets/images/city/road.jpg'
import floorTextureImageSource from './assets/images/city/floor.jpg'
import buildingTextureImageSource from './assets/images/city/building.jpg'
import lightBotTextureImageSource from './assets/images/city/lightBot.jpg'
import rainImageSource from './assets/images/particles/12.png'
import starsImageSource from './assets/images/particles/8.png'
import { BooleanKeyframeTrack } from 'three'

/**
 *Texture
 */

const textureLoader = new THREE.TextureLoader()

//Road texture
const roadTexture = textureLoader.load(roadTextureImageSource)
roadTexture.repeat.y = 15
roadTexture.wrapT = THREE.ReapeatWrapping

//Floor texture
const floorTexture = textureLoader.load(floorTextureImageSource)
floorTexture.repeat.x = 20
floorTexture.repeat.y = 20
floorTexture.wrapT = THREE.ReapeatWrapping
floorTexture.wrapS = THREE.ReapeatWrapping

//Building texture
const buildingTexture = textureLoader.load(buildingTextureImageSource)
buildingTexture.repeat.x = 1
buildingTexture.repeat.y = 1
buildingTexture.wrapT = THREE.ReapeatWrapping
buildingTexture.wrapS = THREE.ReapeatWrapping



const lightBotTexture = textureLoader.load(lightBotTextureImageSource)

const rainTexture = textureLoader.load(rainImageSource)

const starsTexture = textureLoader.load(starsImageSource)

/**
 * Scene
 */

const scene = new THREE.Scene()

/**
 * Alert
 */

alert('Use ZQSD keys to moove around')

/**
 * Sizes
 */

const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight

window.addEventListener('resize', () => 
{
    //Save sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //Update renderer
    renderer.setSize(sizes.width, sizes.height)

    //Update camera
    camera.aspect = sizes.width / sizes.height
    camera.left = - 3
    camera.right = 3
    camera.top = 3 * sizes.height / sizes.width
    camera.bottom = - 3 * sizes.height / sizes.width
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
camera.position.y = 2
scene.add(camera)

/**
 * Light
 */

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
ambientLight.position.x = 100
ambientLight.position.y = 100
ambientLight.position.z = 50
scene.add(ambientLight)

/**
 * City
 */

const material = new THREE.MeshStandardMaterial({ 
    roughness: 0.3,
    metalness: 0.3
})


//floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100, 1, 1),
    new THREE.MeshStandardMaterial({ map: floorTexture }),
    material
)
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

//Buildings
const buildingGeometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1)
buildingGeometry.translate(0, 0.5, 0)

for(let i=0; i<300; i++)
{ 
    const buildingLeft =new THREE.Mesh(
        buildingGeometry,
        new THREE.MeshStandardMaterial({ map: buildingTexture }),
        material
    )
    buildingLeft.position.x = (Math.random() - 0.5) * 100 - 58
    buildingLeft.position.z = (Math.random() - 0.5) * 100
    buildingLeft.scale.x = 1 + Math.random() * 5
    buildingLeft.scale.z = 1 + Math.random() * 5
    buildingLeft.scale.y = 6 + Math.random() * 15

    if(buildingLeft.position.x >= - 50)
    {
        scene.add(buildingLeft)
    }

    
}

for(let i=0; i<300; i++)
{ 
    const buildingRight =new THREE.Mesh(
        buildingGeometry,
        new THREE.MeshStandardMaterial({ map: buildingTexture }),
        material
    )
    buildingRight.position.x = (Math.random() - 0.5) * 100 + 58
    buildingRight.position.z = (Math.random() - 0.5) * 100
    buildingRight.scale.x = 1 + Math.random() * 5
    buildingRight.scale.z = 1 + Math.random() * 5
    buildingRight.scale.y = 6 + Math.random() * 15

    if(buildingRight.position.x <= 50)
    {
        scene.add(buildingRight)
    }
    
}

//Rain
const rainGeometry = new THREE.Geometry()

for (let i=0; i< 10000; i++)
{
    const vertice = new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        Math.random()* 20,
        (Math.random() - 0.5) * 100
    )
    rainGeometry.vertices.push(vertice)
}

//Material rain
const rainMaterial = new THREE.PointsMaterial({
    size: 0.2,
    alphaMap: rainTexture,
    transparent: true,
    depthWrite: false
})


//Points rain
const rain = new THREE.Points(rainGeometry, rainMaterial)
scene.add(rain)

//Stars 
const starsGeometry = new THREE.Geometry()

for (let i=0; i<1000; i++)
{
    const vertice = new THREE.Vector3(
        (Math.random() -0.5) * 100,
        Math.random()* 20,
        (Math.random() - 0.5) * 100
    )
    starsGeometry.vertices.push(vertice)
}

//Material stars
const starsMaterial = new THREE.PointsMaterial({
    size: 0.7,
    alphaMap: starsTexture,
    transparent: true,
    depthWrite: false
})

//Points stars
const stars = new THREE.Points(starsGeometry, starsMaterial)
stars.position.y = 30
scene.add(stars)

//Road
const road = new THREE.Mesh(
    new THREE.BoxGeometry(6, 0.2, 100),
    new THREE.MeshStandardMaterial({ map: roadTexture })
)
scene.add(road)

// Light right
const lightGroupRight = new THREE.Group()
scene.add(lightGroupRight)

for (let i=0; i<10; i++)
{
const lightCylinder = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.1, 15),
    new THREE.MeshStandardMaterial({ map:lightBotTexture })
)
lightCylinder.position.x = 3.1
lightCylinder.position.z = 45 - i*10
lightGroupRight.add(lightCylinder)

const lightSphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.6, 10, 10),
    new THREE.MeshStandardMaterial({ color:0xffff000 }),
)
lightSphere.position.x = 3.1
lightSphere.position.y = 8
lightSphere.position.z = 45 - i*10
lightGroupRight.add(lightSphere)

const externalLight = new THREE.PointLight( 0x888004, 1, 20 );
externalLight.position.set( 3.1, 2.3, 50 - i*10);
lightGroupRight.add(externalLight);
}

//Light left
const lightGroupLeft = new THREE.Group()
scene.add(lightGroupLeft)

for (let i=0; i<10; i++)
{
const lightCylinder = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.1, 15),
    new THREE.MeshStandardMaterial({ map:lightBotTexture })
)
lightCylinder.position.x = - 3.1
lightCylinder.position.z = 45 - i*10
lightGroupLeft.add(lightCylinder)

const lightSphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.6, 10, 10),
    new THREE.MeshStandardMaterial({ color:0xffff000 })
)
lightSphere.position.x = - 3.1
lightSphere.position.y = 8
lightSphere.position.z = 45 - i*10
lightGroupRight.add(lightSphere)

const externalLight = new THREE.PointLight( 0x888004, 1, 20 );
externalLight.position.set( -3.1, 2.3, 50 - i*10);
lightGroupRight.add(externalLight);
}

/**
 * Renderer
 */

const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)

/**
 * Controls
 */

document.addEventListener('keypress',function(_event){
switch (event.key){
    case "z":
        camera.position.z -= 0.2
        break;
    case "s":
        camera.position.z += 0.2
        break;
    case "q":
        camera.rotation.y += Math.PI * 0.02
        break;
    case "d":
        camera.rotation.y -= Math.PI * 0.02
        break;
    }
})




/**
 * Loop
 */

const loop = () =>
{
    window.requestAnimationFrame(loop)

    //update rain
    for(const vertice of rainGeometry.vertices)
    {
        vertice.y -= 0.4

        if(vertice.y < 0)
        {
            vertice.y = 20
        }
    }
    rainGeometry.verticesNeedUpdate = true

    // Update controls
    //controls.update()

    //Render
    renderer.render(scene, camera)
}

loop()