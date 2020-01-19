import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import snowImageSource from './assets/images/particles/circle_02.png'
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const snowTexture = textureLoader.load(snowImageSource)
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
const pointLight = new THREE.PointLight(0xffffff, 3, 400)
pointLight.position.x = 100
pointLight.position.y = 100
pointLight.position.z = 50
scene.add(pointLight)
/**
 * City
 */
const materialRoad = new THREE.MeshStandardMaterial({
     color : 0x000000
})
const material = new THREE.MeshStandardMaterial({
    roughness: 0.3,
    metalness: 0.3
})
const materialRoadlines = new THREE.MeshStandardMaterial({
    metalness: 0.3,
    roughness: 0.3
})
// road 
const road = new THREE.Mesh(
    new THREE.PlaneGeometry(6,100,1,1),
    materialRoad
)
 road.rotation.x = - Math.PI * 0.5
 road.position.x = 0
 road.position.y = 0.05
 scene.add(road)
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
// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100, 1, 1),
    material
)
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)
// Buildings
const buildingGeometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1)
buildingGeometry.translate(0, 0.5, 0)
for(let i = 0; i < 1000; i++)
{
    const x = (Math.random() - 0.5) * 100
    const z = (Math.random() - 0.5) * 100
    if(x < - 5 || x > 5)
    {
        const building = new THREE.Mesh(
            buildingGeometry,
            material
        )
        building.position.x = x
        building.position.z = z
        building.scale.x = 1 + Math.random() * 5
        building.scale.z = 1 + Math.random() * 5
        building.scale.y = 1 + Math.random() * 12
        scene.add(building)
    }
}
// road
// const roadX = new THREE.Mesh(
//     new THREE.PlaneGeometry(100,5,1,1),
//     roadMaterial,
// )
// roadX.rotation.x = -Math.PI * 0.5
// roadX.position.y = 0.02
// const roadY = new THREE.Mesh(
//     new THREE.PlaneGeometry(100,5,1,1),
//     roadMaterial,
// )
// roadY.rotation.x = -Math.PI * 0.5
// roadY.rotation.z = Math.PI * 0.5
// roadY.position.y = 0.01
// scene.add(roadX, roadY)
/**
 * Snow
 */
// Geometry
const snowGeometry = new THREE.Geometry()
for(let i = 0; i < 300000; i++)
{
    const vertice = new THREE.Vector3(
        (Math.random() - 0.5) * 100,
        Math.random() * 100,
        (Math.random() - 0.5) * 100
    )
    snowGeometry.vertices.push(vertice)
}
// Material
const snowMaterial = new THREE.PointsMaterial({
    size: 0.1,
    alphaMap: snowTexture,
    transparent: true,
    depthWrite: false
})
// Points
const snow = new THREE.Points(snowGeometry, snowMaterial)
scene.add(snow)
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)
/**
 * Orbit controls
 */
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.zoomSpeed = 0.3
/**
 * Loop
 */
const loop = () =>
{
    window.requestAnimationFrame(loop)
    // Update snow
    for(const _vertice of snowGeometry.vertices)
    {
        _vertice.y -= 0.05
        if(_vertice.y < 0)
        {
            _vertice.y = 20
        }
    }
    snowGeometry.verticesNeedUpdate = true
    // Update controls
    controls.update()
    // Render
    renderer.render(scene, camera)
}
loop()





