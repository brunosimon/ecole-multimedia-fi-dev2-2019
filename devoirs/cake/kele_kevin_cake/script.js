import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import donutImageSource from './assets/images/matcaps/6.jpg'
import donutImageSources from './assets/images/matcaps/7.jpg'
import gateauImageSources from './assets/images/matcaps/8.jpg'




/**
 * Textures
 */

const textureLoader = new THREE.TextureLoader()
const DonutTexture = textureLoader.load(donutImageSource)
const DonutTextures = textureLoader.load(donutImageSources)
const gateauTextures = textureLoader.load(gateauImageSources)

gateauTextures.wrapS = THREE.RepeatWrapping
gateauTextures.wrapT = THREE.RepeatWrapping
gateauTextures.repeat.x = 10
    // gateauTextures.repeat.y = 20



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
camera.position.z = 10
scene.add(camera)


// 
/**
 * Lights
 */

const ambienLight = new THREE.AmbientLight(0xffffff, 0.3)
scene.add(ambienLight)

const directionLight = new THREE.DirectionalLight(0xff888, 0.3)
directionLight.castShadow = true
directionLight.position.x = 1
directionLight.position.y = 1
scene.add(directionLight)

const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0xff8f8, 0.4)
scene.add(hemisphereLight)

const pointLight = new THREE.PointLight(0xffff00, 0.5)
pointLight.castShadow = true
pointLight.position.x = -5
pointLight.position.y = 2
pointLight.position.z = 2
scene.add(pointLight)



// const pointLightHelper = new THREE.PointLightHelper(pointLight)
// scene.add(pointLightHelper)

// const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight)
// scene.add(hemisphereLightHelper)

// const directionalLightHelper = new THREE.DirectionalLightHelper(directionLight)

// scene.add(directionalLightHelper)


// const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 3, 5, 5)
// rectAreaLight.position.x = 5
// rectAreaLight.position.z = 5
// rectAreaLight.position.y = -3
// rectAreaLight.lookAt(new THREE.Vector3(0, 0, 0))
// scene.add(rectAreaLight)

const spotLight = new THREE.SpotLight(0x00ff9c, 1, 0, Math.PI * 0.2, 0.9)
spotLight.position.z = 3
spotLight.position.y = 2
scene.add(spotLight)

spotLight.target.position.z = -2
scene.add(spotLight.target)

// const spotLightHelper = new THREE.SpotLightHelper(spotLight)
// scene.add(spotLightHelper)
/**
 * Objet
 */



// const x = 0,
//     y = 0;

// const heartShape = new THREE.Shape();

// heartShape.moveTo(x + 5, y + 5);
// heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
// heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
// heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
// heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
// heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
// heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

// const geometry = new THREE.ShapeBufferGeometry(heartShape);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);


const geometry = new THREE.BoxBufferGeometry(40, 6, 30);
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);


const geometryy = new THREE.CylinderBufferGeometry(15, 15, 8, 18);
const materiall = new THREE.MeshBasicMaterial({ map: gateauTextures });
const cylinder2 = new THREE.Mesh(geometryy, materiall);
scene.add(cylinder2);

cylinder2.position.y = 7

/**
 * cone table
 */

const geometry1 = new THREE.ConeBufferGeometry(5, 10, 10);
const material1 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const cone = new THREE.Mesh(geometry1, material1);
scene.add(cone);

cone.position.x = -7
cone.position.y = -7
cone.position.z = -7

const geometry2 = new THREE.ConeBufferGeometry(5, 10, 8);
const material2 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const cone2 = new THREE.Mesh(geometry2, material2);
scene.add(cone2);

cone2.position.x = 7
cone2.position.y = -7
cone2.position.z = 7

const geometry3 = new THREE.ConeBufferGeometry(5, 10, 8);
const material3 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const cone3 = new THREE.Mesh(geometry3, material2);
scene.add(cone3);

cone3.position.x = -7
cone3.position.y = -7
cone3.position.z = 7

const geometry4 = new THREE.ConeBufferGeometry(5, 10, 8);
const material4 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const cone4 = new THREE.Mesh(geometry4, material2);
scene.add(cone4);

cone4.position.x = 7
cone4.position.y = -7
cone4.position.z = -7

/**
 * deco
 */

const geometry5 = new THREE.TorusBufferGeometry(3, 3, 16, 100);
const material5 = new THREE.MeshBasicMaterial({ map: DonutTexture });
const torus = new THREE.Mesh(geometry5, material5);
scene.add(torus);
torus.position.y = 17

torus.position.x = -8

const geometr6 = new THREE.TorusBufferGeometry(3, 3, 16, 100);
const material8 = new THREE.MeshBasicMaterial({ map: DonutTexture });
const tor = new THREE.Mesh(geometr6, material8);
scene.add(tor);
tor.position.y = 17
tor.position.z = 7
tor.rotation.y = Math.PI * 0.5
tor.rotation.x = -Math.PI * 0.5
const geometry7 = new THREE.TorusBufferGeometry(3, 3, 16, 100);
const material7 = new THREE.MeshBasicMaterial({ map: DonutTextures });
const torr = new THREE.Mesh(geometry7, material7);
scene.add(torr);
torr.position.y = 17
torr.position.z = -7
torr.rotation.y = Math.PI * 0.5






const geometry6 = new THREE.TorusBufferGeometry(3, 3, 16, 100);
const material6 = new THREE.MeshBasicMaterial({ map: DonutTextures });
const torus2 = new THREE.Mesh(geometry6, material6);
scene.add(torus2);
torus2.position.y = 17

torus2.position.x = 8


// const geome = new THREE.SphereBufferGeometry(100, 100, 100);

// const wireframe = new THREE.WireframeGeometry(geome);

// const line = new THREE.LineSegments(wireframe);
// line.material.depthTest = false;
// line.material.opacity = 0.25;
// line.material.transparent = true;

// scene.add(line);
for (let i = 0; i < 9; i++) {
    const angle = i / 9 * Math.PI * 2
    const geomet = new THREE.TorusKnotGeometry(0.1, 3, 40, 8, 16, 3);
    const mat = new THREE.MeshPhysicalMaterial({ color: 0xff0000 });
    const torusKnot = new THREE.Mesh(geomet, mat);

    torusKnot.position.x = Math.cos(angle) * 17

    torusKnot.position.y = 8
    torusKnot.position.z = Math.sin(angle) * 17
    scene.add(torusKnot)
}

/**
 * bougie
 */

for (let k = 0; k < 31; k++) {
    const angleB = k / 31 * Math.PI * 20
    const bougie = new THREE.CylinderGeometry(0.5, 0.5, 5, 8);
    const materialBougie = new THREE.MeshLambertMaterial({ color: 0xffff00 });
    const cylinderBougie = new THREE.Mesh(bougie, materialBougie);

    cylinderBougie.position.x = Math.cos(angleB) * 14
    cylinderBougie.position.y = 12
    cylinderBougie.position.z = Math.sin(angleB) * 14
    scene.add(cylinderBougie);

}


/**
 * Particules
 */
const asteroidGeometry = new THREE.Geometry()
const galaxyRadius = 30
for (let k = 0; k < 31; k++) {
    const angle = Math.random() * Math.PI * 2
    const radius = 10 + Math.random() * 6
    const x = Math.cos(angle) * 14
    const y = 15
    const z = Math.sin(angle) * 14

    const vertice = new THREE.Vector3(x, y, z)

    asteroidGeometry.vertices.push(vertice)
    const color = new THREE.Color(0xff00)
    if (x < 0 && (z < 5 && z > -5)) {
        color.r += 0.1
        color.g *= 0.1
        color.b *= 0.1
    } else {
        const randomDim = Math.random() * 0.5
        color.r -= randomDim
        color.g -= randomDim
        color.b -= randomDim
    }
    asteroidGeometry.colors.push(color)

}
const asteroidMaterial = new THREE.PointsMaterial({
        size: 0.5,
        // alphaMap: rockDiffuseAlphaTexture,
        transparent: true,
        vertexColors: true
    }

)
const particules = new THREE.Points(asteroidGeometry, asteroidMaterial)

scene.add(particules)


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.shadowMap.enabled = true
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
const loop = () => {
    window.requestAnimationFrame(loop)

    // Update controls
    controls.update()

    renderer.render(scene, camera)
}

loop()