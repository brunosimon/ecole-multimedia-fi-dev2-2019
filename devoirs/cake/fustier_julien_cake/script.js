import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gateauColorImageSource from "./assets/images/gateau.jpg"
import particlesColorImageSource from "./assets/images/particles/9.png"

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const gateauColortexture = textureLoader.load(gateauColorImageSource)
const particlesColortexture = textureLoader.load(particlesColorImageSource)

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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 40
camera.position.y = 0.2
scene.add(camera)

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
 * Tray
 */
const trayBottom = new THREE.Mesh(
    new THREE.CylinderGeometry(5, 5, 1, 32),
    new THREE.MeshBasicMaterial({ color: 0x582900 })
)
trayBottom.scale.x += 0.5
trayBottom.scale.z += 0.5
scene.add(trayBottom)

const trayMiddle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.8, 0.8, 10, 32),
    new THREE.MeshBasicMaterial({ color: 0x582900 })
)
trayMiddle.position.y += 5
scene.add(trayMiddle)

const trayTop = new THREE.Mesh(
    new THREE.CylinderGeometry(6, 6, 0.8, 32),
    new THREE.MeshBasicMaterial({ color: 0x582900})
)
trayTop.position.y += 10
scene.add(trayTop)

/**
 * Cake
 */

//Floor
const basement = new THREE.Mesh(

    new THREE.CylinderGeometry(6, 6, 3.5, 32),
    new THREE.MeshBasicMaterial({map: gateauColortexture})
)
basement.position.y += 12.3
scene.add(basement)

const first_Floor = new THREE.Mesh(
    new THREE.CylinderGeometry(5, 5, 3, 32),
    new THREE.MeshBasicMaterial({map: gateauColortexture})
)
first_Floor.position.y += 15
scene.add(first_Floor)

const second_Floor = new THREE.Mesh(
    new THREE.CylinderGeometry(4, 4, 2, 32),
    new THREE.MeshBasicMaterial({map: gateauColortexture})
)
second_Floor.position.y += 17
scene.add(second_Floor)

/**
 * Decoration
 */

//Biscuit
const biscuit1 = new THREE.Mesh(
    new THREE.CylinderGeometry(1, 1, 0.2, 32),
    new THREE.MeshBasicMaterial({color: 0x000000})
)
    
biscuit1.rotation.x += 1.6 
    
scene.add(biscuit1)
    
const biscuit2 = new THREE.Mesh(
    new THREE.CylinderGeometry(1, 1, 0.2, 32),
    new THREE.MeshBasicMaterial({color: 0x000000})
)
    
biscuit2.position.z += 0.6
biscuit2.rotation.x += 1.6

scene.add(biscuit2)

const biscuitCream = new THREE.Mesh(
    new THREE.TorusGeometry(0.9, 0.2, 16, 100),
    new THREE.MeshBasicMaterial({color: 0xffffff})
)
biscuitCream.position.z += 0.3

const biscuit = new THREE.Group()
biscuit.add(biscuit1)
biscuit.add(biscuit2)
biscuit.add(biscuitCream)

biscuit.position.x += 4
biscuit.position.y += 18

scene.add(biscuit)

/**
 * Confetits
 */
const particlesGeometry = new THREE.Geometry()

for(let i = 0; i < 1000; i++)
{
    const vertice = new THREE.Vector3(
        (Math.random() - 0.5) * 100,
        Math.random() * 30,
        (Math.random() - 0.5) * 100
    )
    particlesGeometry.vertices.push(vertice)
}

//Material
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.5,
    alphaMap: particlesColortexture,
    transparent: true,
    depthWrite: false
})

//points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)

/**
 * Loop
 */
const loop = () =>
{
    window.requestAnimationFrame(loop)

    for(const _vertice of particlesGeometry.vertices)
    {
        _vertice.y -= 0.008

        if(_vertice.y < 0)
        {
            _vertice.y = 30
        }
    }

    // Update controls
    controls.update()

    particlesGeometry.verticesNeedUpdate = true

    // Render
    renderer.render(scene, camera)
}

loop()