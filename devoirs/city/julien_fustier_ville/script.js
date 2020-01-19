import * as THREE from 'three'
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js'
import roadColorImageSource from "./assets/images/road.png"
import buildingColorImageSource from "./assets/images/building.jpg"
import floorColorImageSource from "./assets/images/floor.jpg"
import snowColorImageSource from "./assets/images/particles/8.png"

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const roadColorTexture = textureLoader.load(roadColorImageSource)
const buildingColorTexture = textureLoader.load(buildingColorImageSource)
const floorColorTexture = textureLoader.load(floorColorImageSource)
const snowColorTexture = textureLoader.load(snowColorImageSource)

roadColorTexture.wrapS = THREE.RepeatWrapping
roadColorTexture.wrapT = THREE.RepeatWrapping
roadColorTexture.repeat.y = 12;

floorColorTexture.wrapS = THREE.RepeatWrapping
floorColorTexture.wrapT = THREE.RepeatWrapping
floorColorTexture.repeat.y = 12;
floorColorTexture.repeat.x = 12;


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
    metalness: 0.3
})

/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100, 1, 1),
    new THREE.MeshBasicMaterial({ map: floorColorTexture })
)
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * Building
 */
const buildingGeometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1)
buildingGeometry.translate(0, 0.5, 0)

for(let i = 0; i < 500; i++)
{
    const building_Right = new THREE.Mesh(
        buildingGeometry,
        new THREE.MeshBasicMaterial({ map: buildingColorTexture })
    )
    building_Right.position.x = ((Math.random() - 0.5) * 100) + 60
    building_Right.position.z = (Math.random() - 0.5) * 100
    building_Right.scale.x = 1 + Math.random() * 5
    building_Right.scale.z = 1 + Math.random() * 5
    building_Right.scale.y = 5 + Math.random() * 16

    if(building_Right.position.x <= 50){
        scene.add(building_Right)
    }

    const building_Left = new THREE.Mesh(
        buildingGeometry,
        new THREE.MeshBasicMaterial({ map: buildingColorTexture })
    )
    building_Left.position.x = ((Math.random() - 0.5) * 100) - 60
    building_Left.position.z = (Math.random() - 0.5) * 100
    building_Left.scale.x = 1 + Math.random() * 5
    building_Left.scale.z = 1 + Math.random() * 5
    building_Left.scale.y = 5 + Math.random() * 16

    if(building_Left.position.x >= - 50){
        scene.add(building_Left)
    }
}

/**
 * Road
 */
const road = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 100, 1, 1),
    new THREE.MeshBasicMaterial({ map: roadColorTexture })
)

road.position.y += 0.01
road.rotation.x = - Math.PI * 0.5
scene.add(road)

/**
 * Lamp post
 */
for(let i = 0; i < 10; i++)
{
    const lamp_Post_Right = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.1, 5),
        material
    )

    lamp_Post_Right.position.x += 6
    lamp_Post_Right.position.y = 2
    lamp_Post_Right.position.z += 45 - i * 10

    scene.add(lamp_Post_Right)

    const light_Sphere_Right = new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 10, 10),
        new THREE.MeshBasicMaterial({ color: 0xffff00 })
    );
    
    light_Sphere_Right.position.x += 6
    light_Sphere_Right.position.y += 4.5
    light_Sphere_Right.position.z += 45 - i * 10
    
    scene.add(light_Sphere_Right);

    const lamp_Post_Left = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.1, 5),
        material
    )

    lamp_Post_Left.position.x -= 6
    lamp_Post_Left.position.y = 2
    lamp_Post_Left.position.z += 45 - i * 10

    scene.add(lamp_Post_Left)

    const light_Sphere_Left = new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 10, 10),
        new THREE.MeshBasicMaterial({ color: 0xffff00 })
    );
    
    light_Sphere_Left.position.x -= 6
    light_Sphere_Left.position.y += 4.5
    light_Sphere_Left.position.z += 45 - i * 10
    
    scene.add(light_Sphere_Left);
}

/**
 * Snow
 */
const snowGeometry = new THREE.Geometry()

for(let i = 0; i < 100000; i++)
{
    const vertice = new THREE.Vector3(
        (Math.random() - 0.5) * 100,
        Math.random() * 30,
        (Math.random() - 0.5) * 100
    )
    snowGeometry.vertices.push(vertice)
}

//Material
const snowMaterial = new THREE.PointsMaterial({
    size: 0.1,
    alphaMap: snowColorTexture,
    transparent: true,
    depthWrite: false
})

//points
const snow = new THREE.Points(snowGeometry, snowMaterial)
scene.add(snow)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)

/**
 * Fly Controls
 */

/* Control settings 
 W: move forward
 S: move backward

 A: move left
 D: move right

 R: move up
 F: move down

 Q: rotation left
 E: rotation right
 (ps: you can also rotate by using left or right click and draging your mouse)*/
const controls = new FlyControls(camera, renderer.domElement)
controls.movementSpeed = 10
controls.domElement = renderer.domElement
controls.rollSpeed = 1.2
controls.autoForward = false
controls.dragToLook = true

/**
 * Loop
 */
let clock = new THREE.Clock()
const loop = () =>
{
    let delta = clock.getDelta()
    window.requestAnimationFrame(loop)

    for(const _vertice of snowGeometry.vertices)
    {
        _vertice.y -= 0.008

        if(_vertice.y < 0)
        {
            _vertice.y = 30
        }
    }

    // Update controls
    controls.update(delta)

    snowGeometry.verticesNeedUpdate = true

    // Render
    renderer.render(scene, camera)
}

loop()