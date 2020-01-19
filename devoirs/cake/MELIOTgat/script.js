import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GatTextureSource from './assets/gat.jpg'
import etoileSource from './assets/particles/9.png'
import { VertexColors } from 'three'
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const GatTexture = textureLoader.load(GatTextureSource)
const etoileTexture = textureLoader.load(etoileSource)
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
camera.position.z = 10
scene.add(camera)

/**
 * cadle
 */
    
let cadleGeometry = new THREE.CylinderBufferGeometry(0.1, 0.1, 2, 20);
let cadleMaterial = new THREE.MeshBasicMaterial({color: 0xD8BFD8});

for(let i = 0; i < 30; i++){ 
   
let cadle = new THREE.Mesh(cadleGeometry, cadleMaterial);
cadle.position.x = (Math.random() -0.5) * 6
cadle.position.y = 4
cadle.position.z = (Math.random() -0.5) * 5
scene.add(cadle);

 
}

//elements
const base = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 5, 3),
    new THREE.MeshBasicMaterial({ color: 0xff8866 })
)
scene.add(base)

const plat = new THREE.Mesh(
    new THREE.CircleGeometry( 5, 20 , 1),
    new THREE.MeshBasicMaterial( { color: 0xffff00 , side : THREE.DoubleSide} )
)
    plat.rotation.x = Math.PI * -0.50
    plat.position.y = 1.2
scene.add(plat)

const gat = new THREE.Mesh(
    new THREE.CylinderBufferGeometry( 4, 4, 2, 50 ),
    new THREE.MeshBasicMaterial( {color: GatTexture} )
)
gat.position.y = 2.2
scene.add(gat)

//bonbonPop
const OctaGeometry = new THREE.OctahedronBufferGeometry(0.5, 0)
    
    for(let i = 0; i < 15; i++)
{
    const Octa = new THREE.Mesh(
         OctaGeometry,
        new THREE.MeshBasicMaterial({ color: 0x228833 })
    )
    //coté gauche
    Octa.position.x = (Math.random() - 0.4) * 5
    Octa.position.z = (Math.random() - 0.4) * 4
    Octa.position.y = 3.5

    scene.add(Octa)
}

//bonbonPop
const Octa2Geometry = new THREE.OctahedronBufferGeometry(0.5, 0)
    
    for(let i = 0; i < 15; i++)
{
    const Octa2 = new THREE.Mesh(
        Octa2Geometry,
        new THREE.MeshBasicMaterial({ color: 0xFA8072 })
    )
    //coté gauche
    Octa2.position.x = (Math.random() - 0.6) * 4
    Octa2.position.z = (Math.random() - 0.6) * 3
    Octa2.position.y = 3.5

    scene.add(Octa2)
}

//etoile
const etoileGeometry = new THREE.Geometry()

for(let i = 0; i < 1000; i++)
{
    const vertice = new THREE.Vector3(
        (Math.random() - 0.5) * 100,
        Math.random() * 20,
        (Math.random() - 0.5) * 100
    )
    etoileGeometry.vertices.push(vertice)

    // Color
    const color = new THREE.Color(
        Math.random(),
        Math.random(),
        Math.random()
    )
    etoileGeometry.colors.push(color)
}

// Material
const etoileMaterial = new THREE.PointsMaterial({
    alphaMap: etoileTexture,
    transparent: true,
    depthWrite: false , 
    vertexColors : true
})

// Points
const etoile = new THREE.Points(etoileGeometry, etoileMaterial)
scene.add(etoile)




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

    //Udapte etoile
    for(const _vertice of etoileGeometry.vertices)
    {
        _vertice.y -= 0.1
        
        if (_vertice.y < 0)
        {
            _vertice.y = 20
        }
    }
    etoileGeometry.verticesNeedUpdate = true

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)
}

loop()