import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import fireTextureImageSource from './assets/images/trace_06.png'
import cakeTextureImageSource from './assets/images/interieur_gateau.jpg'
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const fireTexture = textureLoader.load(fireTextureImageSource)
const cakeTexture = textureLoader.load(cakeTextureImageSource)

cakeTexture.magFilter = THREE.NearestFilter
cakeTexture.wrapS = THREE.RepeatWrapping
cakeTexture.wrapT = THREE.RepeatWrapping
cakeTexture.repeat.x = 10
cakeTexture.repeat.y = 1
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
camera.position.z = 60
camera.position.y = 30

scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setClearColor(0x000000, 1)
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)
//0x91F9E5

/**
 * Orbit controls
 */
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.zoomSpeed = 1

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffcccc, 0.2)
scene.add(ambientLight)

const sunLight = new THREE.DirectionalLight(0xffcccc, 1)
sunLight.position.x = 10
sunLight.position.y = 20
sunLight.position.z = 0
scene.add(sunLight)

/**
 * Objects
 */






// Ballon


function CustomSinCurve(scale) {

    THREE.Curve.call(this);

    this.scale = (scale === undefined) ? 1 : scale;

}

CustomSinCurve.prototype = Object.create(THREE.Curve.prototype);
CustomSinCurve.prototype.constructor = CustomSinCurve;

CustomSinCurve.prototype.getPoint = function (t) {

    var tx = t * 3 - 1.5;
    var ty = Math.sin(3 * Math.PI * t / 2);
    var tz = 0;

    return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);

};

var path = new CustomSinCurve(10);
const fil = new THREE.Mesh(
    new THREE.TubeGeometry(path, 20, 0.1, 8, false),
    new THREE.MeshPhongMaterial({ color: 0x84E296 }));
fil.position.y = 15
fil.position.x = 18
fil.rotation.z = Math.PI / 2 + 0.5
fil.rotation.y = Math.PI
scene.add(fil);



const ballon = new THREE.Mesh(
    new THREE.DodecahedronGeometry(5, 2),
    new THREE.MeshPhongMaterial({ color: 0x0000ff }));
ballon.position.y = 35
ballon.position.x = 16
scene.add(ballon);

//Cerise

const cherry = new THREE.Mesh(
    new THREE.DodecahedronGeometry(1, 2),
    new THREE.MeshPhongMaterial({ color: 0x93032E }));
cherry.position.y = 18
scene.add(cherry);


function CustomSinCurve(scale) {

    THREE.Curve.call(this);

    this.scale = (scale === undefined) ? 1 : scale;

}

CustomSinCurve.prototype = Object.create(THREE.Curve.prototype);
CustomSinCurve.prototype.constructor = CustomSinCurve;

CustomSinCurve.prototype.getPoint = function (t) {

    var tx = t * 2 - 1.5;
    var ty = Math.sin(2 * Math.PI * t);
    var tz = 0;

    return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);

};

var path = new CustomSinCurve(1);
const queue = new THREE.Mesh(
    new THREE.TubeGeometry(path, 20, 0.1, 8, false),
    new THREE.MeshPhongMaterial({ color: 0x84E296 }));
queue.position.y = 18.5
queue.position.x = 0.1
queue.rotation.z = -1
scene.add(queue);

//Base ( Plateau )
const plate = new THREE.Mesh(
    new THREE.CylinderGeometry(15, 5, 5, 10),
    new THREE.MeshStandardMaterial({
        color: 0xF61067,
        roughness: 0.5,
        metalness: 0.5
    }));

scene.add(plate);


//Base
const base = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 40),
    new THREE.MeshPhongMaterial({ color: 0x00F0B5 }));
base.rotation.x = -Math.PI / 2
base.position.y = -2.5
scene.add(base);

const base_2 = new THREE.Mesh(
    new THREE.PlaneGeometry(1000, 1000),
    new THREE.MeshPhongMaterial({ color: 0xA2A392 }));
base_2.rotation.x = -Math.PI / 2
base_2.position.y = -2.8
scene.add(base_2);



let active_color = true

for (let i = 0; i < 3; i++) {


    const etage = new THREE.Mesh(
        new THREE.CylinderGeometry(10, 10, 5, 10),
        new THREE.MeshPhongMaterial({ map: cakeTexture }));

    etage.position.y = i * 5 + 5
    etage.scale.x -= 0.25 * i
    etage.scale.z -= 0.25 * i

    active_color = !active_color
    scene.add(etage);

    const napp = new THREE.Mesh(
        new THREE.CylinderGeometry(10, 10, 0.1, 10),
        new THREE.MeshPhongMaterial({ color: 0x502419 }));

    napp.position.y = i * 5 + 7.55
    napp.scale.x -= 0.25 * i
    napp.scale.z -= 0.25 * i

    scene.add(napp);
}

const particlesGeometry = new THREE.Geometry()

for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 3; j++) {


        const candle = new THREE.Mesh(
            new THREE.CylinderGeometry(0.1, 0.1, 2, 10),
            new THREE.MeshPhongMaterial((
                Math.random(),
                Math.random(),
                Math.random()
            )));

        const Angle = i / 10 * Math.PI * 2
        const radius = 9 - (3 * j)
        candle.position.x = Math.cos(Angle) * radius
        candle.position.z = Math.sin(Angle) * radius
        candle.position.y = 8 + 5 * j

        scene.add(candle);


        //Particles


        const x = Math.cos(Angle) * radius
        const y = 8 + 5 * j + 1.5
        const z = Math.sin(Angle) * radius

        const vertice = new THREE.Vector3(x, y, z)
        particlesGeometry.vertices.push(vertice)

        // Color
        const color = new THREE.Color(0xFF7F11)
        particlesGeometry.colors.push(color)


    }
}


const particlesMaterial = new THREE.PointsMaterial({
    vertexColors: true,
    size: 2,
    sizeAttenuation: true,
    // color: new THREE.Color(0xff0000),
    // map: particleTexture
    alphaMap: fireTexture,
    transparent: true
})

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)

scene.add(particles)






let particles_animation = 0

/**
 * Loop
 */
const loop = () => {
    window.requestAnimationFrame(loop)

    // Update controls
    controls.update()


    //Update Objects

    if (particles_animation >= 4) particles_animation = 0
    if (particles_animation >= 2) particles.position.y -= 0.05
    else { particles.position.y += 0.05 }
    particles_animation++

    // Render
    renderer.render(scene, camera)
}

loop()