import * as THREE from 'three'
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js'
import grassText from './assets/images/grassText.jpg'
import roadText from './assets/images/Roadtexture.jpg'
import buildText from './assets/images/Buildingtexture.jpg'
import sideText from './assets/images/Sidewalk.jpg'
import particleImageSource from './assets/images/particles/1.png'
import { DoubleSide } from 'three'
import skydomeText from './assets/images/skydome.jpg'
import roofText from './assets/images/roof.jpg'


/**
 * Textures
 */

const textureLoader = new THREE.TextureLoader()

// roof
const roofTexture = textureLoader.load(roofText)
roofTexture.wrapS = THREE.RepeatWrapping
roofTexture.wrapT = THREE.RepeatWrapping
roofTexture.repeat.x = 2
roofTexture.repeat.y = 2

// skydome
const skydomeTexture = textureLoader.load(skydomeText)

// snow
const particleTexture = textureLoader.load(particleImageSource)

// grass
const herbeTexture = textureLoader.load(grassText)
herbeTexture.magFilter = THREE.NearestFilters
herbeTexture.wrapS = THREE.RepeatWrapping
herbeTexture.wrapT = THREE.RepeatWrapping
herbeTexture.repeat.x = 8
herbeTexture.repeat.y = 8

// road
const roadTexture = textureLoader.load(roadText)
roadTexture.repeat.z = 30
roadTexture.wrapS = THREE.RepeatWrapping
roadTexture.wrapT = THREE.RepeatWrapping

// building
const buildingTexture = textureLoader.load(buildText)
buildingTexture.repeat.x = 2
buildingTexture.repeat.y = 2
buildingTexture.wrapS = THREE.RepeatWrapping
buildingTexture.wrapT = THREE.RepeatWrapping

//sidewalk
const sidewalkTexture = textureLoader.load(sideText)
sidewalkTexture.repeat.y = 1
sidewalkTexture.repeat.x = 20
sidewalkTexture.wrapS = THREE.RepeatWrapping
sidewalkTexture.wrapT = THREE.RepeatWrapping


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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 9999)
camera.position.z = 50
camera.position.y = 20
scene.add(camera)


/**
 * Lights
 */

 // const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.5, 200)
// directionalLight1.castShadow = true
// directionalLight1.position.x = 100
// directionalLight1.position.y = 100
// directionalLight1.position.z = 50
const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1, 200)
directionalLight2.castShadow = true
directionalLight2.position.x = -250
directionalLight2.position.y = 50
directionalLight2.position.z = -40
const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1.5)
hemisphereLight.castShadow = true
hemisphereLight.position.y = 200
scene.add(hemisphereLight, directionalLight2)


/**
 * Helpers
 */

const dirLightHelp = new THREE.DirectionalLightHelper(directionalLight2)
scene.add(dirLightHelp)


/**
 * City
 */

    // materials
const material = new THREE.MeshStandardMaterial({
    roughness: 0.3,
    metalness: 0.3
})

const skyMat = new THREE.MeshPhongMaterial({
    map: skydomeTexture,
    side: THREE.BackSide
})

const roadMaterial = new THREE.MeshStandardMaterial({
    roughness: 0.6,
    metalness: 0.3,
    map: roadTexture
})

const floorMaterial = new THREE.MeshStandardMaterial({
    side: DoubleSide,
    map: herbeTexture
})

const buildMaterial = [
    new THREE.MeshStandardMaterial({map: buildingTexture}),
    new THREE.MeshStandardMaterial({map: buildingTexture}),
    new THREE.MeshStandardMaterial({map: roofTexture}),
    ,
    new THREE.MeshStandardMaterial({map: buildingTexture}),
    new THREE.MeshStandardMaterial({map: buildingTexture})
]

const sideMaterial = new THREE.MeshStandardMaterial({
    map: sidewalkTexture
})

/**
 * Snow
 */

    const particleMaterial = new THREE.PointsMaterial({
        transparent: true,
        depthWrite: false,
        sizeAttenuation: true,
        alphaMap: particleTexture,
    })
const particleGeometry = new THREE.Geometry()
for(let i = 0; i < 1000; i++)
        // Vertice
{
    const vertice = new THREE.Vector3(
        (Math.random() - 0.5) * 110,
        Math.random() * 25,
        (Math.random() - 0.5) * 110
    )
    particleGeometry.vertices.push(vertice)
}
const snow = new THREE.Points(particleGeometry, particleMaterial)

    // Sky dome

const skydome = new THREE.Mesh(
    new THREE.SphereGeometry(5000, 25, 25),
    skyMat
)

    // floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(110,110,1,1),
    floorMaterial,
)
floor.rotation.x = - Math.PI * 0.5
floor.receiveShadow = true


    // road
const roadX = new THREE.Mesh(
    new THREE.PlaneGeometry(110,5,1,1),
    roadMaterial,
)
roadX.rotation.x = -Math.PI * 0.5
roadX.position.y = 0.02
roadX.receiveShadow = true

const roadY = new THREE.Mesh(
    new THREE.PlaneGeometry(110,5,1,1),
    roadMaterial,
)
roadY.rotation.x = -Math.PI * 0.5
roadY.rotation.z = Math.PI * 0.5
roadY.position.y = 0.01
roadY.receiveShadow = true


    //  SIDEWALKS * 8

const sidewalk1 = new THREE.Mesh(
    new THREE.BoxGeometry(50.5,1,1,1),
    sideMaterial
)
sidewalk1.position.z = -3
sidewalk1.position.x = -28

const sidewalk2 = new THREE.Mesh(
    new THREE.BoxGeometry(50.5,1,1,1),
    sideMaterial
)
sidewalk2.position.z = -3
sidewalk2.position.x = 28

const sidewalk3 = new THREE.Mesh(
    new THREE.BoxGeometry(50.5,1,1,1),
    sideMaterial
)
sidewalk3.position.z = 3
sidewalk3.position.x = 28

const sidewalk4 = new THREE.Mesh(
    new THREE.BoxGeometry(50.5,1,1,1),
    sideMaterial
)
sidewalk4.position.z = 3
sidewalk4.position.x = -28

const sidewalk5 = new THREE.Mesh(
    new THREE.BoxGeometry(50.5,1,1,1),
    sideMaterial
)
sidewalk5.rotation.y = Math.PI * 0.5
sidewalk5.position.z = 28
sidewalk5.position.x = 3

const sidewalk6 = new THREE.Mesh(
    new THREE.BoxGeometry(50.5,1,1,1),
    sideMaterial
)
sidewalk6.rotation.y = Math.PI * 0.5
sidewalk6.position.z = 28
sidewalk6.position.x = -3

const sidewalk7 = new THREE.Mesh(
    new THREE.BoxGeometry(50.5,1,1,1),
    sideMaterial
)
sidewalk7.rotation.y = Math.PI * 0.5
sidewalk7.position.z = -28
sidewalk7.position.x = -3

const sidewalk8 = new THREE.Mesh(
    new THREE.BoxGeometry(50.5,1,1,1),
    sideMaterial
)
sidewalk8.rotation.y = Math.PI * 0.5
sidewalk8.position.z = -28
sidewalk8.position.x = 3
    

    // Scene add
scene.add(floor, roadX, roadY, sidewalk1, sidewalk2, sidewalk3, sidewalk4, sidewalk5, sidewalk6, sidewalk7, sidewalk8, snow, skydome)


    // buildings
const buildingGeometry = new THREE.BoxGeometry(1,1,1,1,1,1,1)
buildingGeometry.translate(0, 0.5, 0)

for( let i = 0; i < 30; i++){
    const buildingRB = new THREE.Mesh(
        buildingGeometry,
        buildMaterial,
    )
    buildingRB.position.x = (Math.random()+0.15) *45
    buildingRB.position.z = (Math.random()+0.15) *45
    buildingRB.scale.x = (Math.random() + 0.3) * 5
    buildingRB.scale.z = (Math.random() + 0.3) * 5
    buildingRB.scale.y = (Math.random() + 0.5) * 12
    buildingRB.castShadow = true
    buildingRB.receiveShadow = true
    const buildingRT = new THREE.Mesh(
        buildingGeometry,
        buildMaterial,
    )
    buildingRT.position.x = (Math.random()+0.15) *45
    buildingRT.position.z = (Math.random()-1.15) *45
    buildingRT.scale.x = (Math.random() + 0.3) * 5
    buildingRT.scale.z = (Math.random() + 0.3) * 5
    buildingRT.scale.y = (Math.random() + 0.5) * 12
    buildingRT.castShadow = true
    buildingRT.receiveShadow = true
    const buildingLB = new THREE.Mesh(
        buildingGeometry,
        buildMaterial,
    )
    buildingLB.position.x = (Math.random()-1.15) *45
    buildingLB.position.z = (Math.random()+0.15) *45
    buildingLB.scale.x = (Math.random() + 0.3) * 5
    buildingLB.scale.z = (Math.random() + 0.3) * 5
    buildingLB.scale.y = (Math.random() + 0.5) * 12
    buildingLB.castShadow = true
    buildingLB.receiveShadow = true
    const buildingLT = new THREE.Mesh(
        buildingGeometry,
        buildMaterial,
    )
    buildingLT.position.x = (Math.random()-1.15) *45
    buildingLT.position.z = (Math.random()-1.15) *45
    buildingLT.scale.x = (Math.random() + 0.3) * 5
    buildingLT.scale.z = (Math.random() + 0.3) * 5
    buildingLT.scale.y = (Math.random() + 0.5) * 12
    buildingLT.castShadow = true
    buildingLT.receiveShadow = true
    scene.add(buildingLB,buildingLT,buildingRB,buildingRT)
}

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.shadowMap.enabled = true
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)

/**
 * Cam Controls
 */
const controls = new FlyControls(camera, renderer.domElement)
controls.movementSpeed = 10;
controls.domElement = renderer.domElement;
controls.rollSpeed = 1.2;
controls.autoForward = false;

/**
 * Loop
 */

let clock = new THREE.Clock()

const loop = () =>
{
    let delta = clock.getDelta()
    window.requestAnimationFrame(loop)
      // Update snow
      for(const vertice of particleGeometry.vertices)
      {
          vertice.y -= 0.05
  
          if(vertice.y < 0)
          {
              vertice.y = 25
          }
      }
      particleGeometry.verticesNeedUpdate = true

    // Update controls
    controls.update(delta)

    // Render
    renderer.render(scene, camera)
}

loop()