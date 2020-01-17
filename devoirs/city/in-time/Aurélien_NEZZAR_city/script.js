import * as THREE from 'three'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js'
import grassColorImageSource from './assets/images/groundforest/color.jpg'
import grassAmbientOcclusionImageSource from './assets/images/groundforest/ambientOcclusion.jpg'
import roadColorImageSource from './assets/images/road/color.jpeg'
import rainImageSource from './assets/images/particles/trace_01.png'
import { Mesh } from 'three';
//Textures loads
const textureLoader = new THREE.TextureLoader()
const grassColorTexture = textureLoader.load(grassColorImageSource)
const grassAmbientOcclusionTexture = textureLoader.load(grassAmbientOcclusionImageSource)
const roadColorTexture = textureLoader.load(roadColorImageSource)
const rainImageTexture = textureLoader.load(rainImageSource)
grassColorTexture.wrapS = THREE.RepeatWrapping
grassColorTexture.wrapT = THREE.RepeatWrapping
grassColorTexture.repeat.x = 8
grassColorTexture.repeat.y = 8
roadColorTexture.wrapS = THREE.RepeatWrapping
roadColorTexture.wrapT = THREE.RepeatWrapping
roadColorTexture.repeat.x = 2
roadColorTexture.repeat.y = 2
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
camera.position.z = 100
camera.position.y = 25

scene.add(camera)

/**
 * Point light
 */
const pointLight = new THREE.DirectionalLight(0xffffff,2,200)
pointLight.position.x = 100
pointLight.position.y = 200
pointLight.position.z = 50
scene.add(pointLight)

/**
 * City
 */

const materialFloor = new THREE.MeshStandardMaterial({
    roughness: 0.3,
    metalness: 0.3,
    map: grassColorTexture,
    aoMap: grassAmbientOcclusionTexture
 })
const materialBuildings = new THREE.MeshStandardMaterial({
    roughness: 0.3,
    metalness: 0.3,
    color: '#bdbdbd'
 })

const materialRoad = new THREE.MeshStandardMaterial({
    roughness: 0.3,
    metalness: 0.3,
    map: roadColorTexture
})
const materialRoadlines = new THREE.MeshStandardMaterial({
   roughness: 0.3,
   metalness: 0.3,
   color: '#ffffff'
})

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(100,100,1,1),
    materialFloor

 )
 floor.rotation.x = -Math.PI * 0.5
 scene.add(floor)

//road
const road = new THREE.Mesh(
    new THREE.PlaneGeometry(6,100,1,1),
    materialRoad

)
road.rotation.x = -Math.PI * 0.5
road.position.x = 0
road.position.y = 0.05
scene.add(road)

// rain
const rainGeometry = new THREE.Geometry()
for(let i = 0;i<1000;i++)
{
    const vertice = new THREE.Vector3(
      ( Math.random()-0.5) *100,
      Math.random() * 50,
      (Math.random() - 0.5) * 100
    )
    rainGeometry.vertices.push(vertice)
}

//Material
const rainMaterial = new THREE.PointsMaterial({
    alphaMap: rainImageTexture,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
})
const roadLinesGeometry = new THREE.PlaneGeometry(0.5,3,1,1)
for(let i = -45;i<50;i+=8)
{
    const roadLines = new THREE.Mesh( 
       roadLinesGeometry,
       materialRoadlines
    )
    roadLines.rotation.x = -Math.PI * 0.5
    roadLines.position.x = 0;
    roadLines.position.z = i;
    roadLines.position.y = 0.1;
    scene.add(roadLines)

}

 /**
  * Buildings
  */
const buildingGeometry = new THREE.BoxGeometry(1,1,1,1,1,1)
buildingGeometry.translate(0,0.5,0)
for(let i = 0;i<500;i++)
{
    const building = new THREE.Mesh(
        buildingGeometry,
        materialBuildings
    )
    building.position.x = (Math.random() - 0.5) * 100
    building.position.z = (Math.random() - 0.5) * 100
    building.scale.x = 1+ Math.random() * 5
    building.scale.z = 1+ Math.random() * 5
    building.scale.y = 1+ Math.random() * 12
    if(building.position.x<=-7||building.position.x>=7) scene.add(building)
}


const particles = new THREE.Points(rainGeometry, rainMaterial)
scene.add(particles)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)


/**
 * First person Controls
 */
const control = new FirstPersonControls(camera)
control.lookSpeed = 0.1;
control.movementSpeed = 15;

/**
 * Loop
 */
//Clock initialization
let clock = new THREE.Clock();

const loop = () =>
{
    //Get delta value
    let delta = clock.getDelta();

    window.requestAnimationFrame(loop);

    //Update camera
    control.update(delta);

    //Rain animation
    for(const _vertice of rainGeometry.vertices)
    {
       _vertice.y-= 0.5
       if(_vertice.y<0)
       {
         _vertice.y=30
       }
    }
    rainGeometry.verticesNeedUpdate = true

    // Render
    renderer.render(scene, camera);
    renderer.clear();
}

loop()