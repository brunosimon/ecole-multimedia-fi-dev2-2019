import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import particuleImageSource from './assets/images/particul/circle_05.png'
import cakeImageSource from './assets/images/gateau/gateaux.jpg'
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particuleTexture = textureLoader.load(particuleImageSource)
const cakeTexture = textureLoader.load(cakeImageSource)

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

window.addEventListener('resize', () => {
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

window.addEventListener('mousemove', (_event) => {
    cursor.x = _event.clientX / sizes.width - 0.5
    cursor.y = _event.clientY / sizes.height - 0.5
})

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 14
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
 *  Cake 1 floor
 */

    let cake1Geometry = new THREE.CylinderBufferGeometry(5, 5, 2, 20);
    let cake1Material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: cakeTexture
    })
    let cake1= new THREE.Mesh(cake1Geometry, cake1Material);
    scene.add(cake1);

/**
 * cadle
 */
    
     let cadleGeometry = new THREE.CylinderBufferGeometry(0.2, 0.2, 3, 20);
     let cadleMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});

     for(let i = 0; i < 30; i++){ 
        
     let cadle = new THREE.Mesh(cadleGeometry, cadleMaterial);
     cadle.position.x = (Math.random() -0.5) * 7
     cadle.position.y = 1
     cadle.position.z = (Math.random() -0.5) * 7
     scene.add(cadle);
     
      
     }
     /**
     * Particls
     */
     const particlesGeometry = new THREE.Geometry(3, 0.5, 64, 8)
    for (let i = 0; i < 10000; i++) {
    // Vertice
    const vertice = new THREE.Vector3(
        (Math.random() - 0.5) * 100,
        (Math.random()  * 20),
        (Math.random() - 0.5) * 100,
    )
    particlesGeometry.vertices.push(vertice)
    // Color
    const color = new THREE.Color(
    Math.random(),
    Math.random(),
    Math.random()
    )
    particlesGeometry.colors.push(color)
}
const particlesMaterial = new THREE.PointsMaterial({
    vertexColors: true,
    size: 0.4,
    alphaMap: particuleTexture,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
}

)

const particles = new THREE.Points(particlesGeometry, particlesMaterial)

scene.add(particles)
/**
 * Tray
 */

    // let trayGeometry = new THREE.CircleBufferGeometry( 5, 32 );
    // let trayMaterial = new THREE.MeshBasicMaterial( { 
    //     color: 0xffff00,
    //     tra

    // });
    // let tray = new THREE.Mesh( trayGeometry, trayMaterial );
    // scene.add(tray)

/**
 * LIGHTS
 */

    const ambientLight = new THREE.AmbientLight(0xffcccc, 0.2 )
    scene.add(ambientLight)

     const sunLight = new THREE.DirectionalLight(0xffcccc, 1)
     sunLight.position.y = 0
     sunLight.position.x = 10
     sunLight.position.z = 0
     scene.add(sunLight)



/**
 * Loop
 */
const loop = () => {
    window.requestAnimationFrame(loop)

    for(const vertice of particlesGeometry.vertices){
        vertice.y -= 0.1
        
        if (vertice.y < -5)
        {
            vertice.y = 10
        }
    }
    particlesGeometry.verticesNeedUpdate = true

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)
}

loop()