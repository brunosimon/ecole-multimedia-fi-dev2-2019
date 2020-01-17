import * as THREE from 'three'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';
import RoadColorImageSource from './assets/images/Road.jpg'
import BuildingsColorImageSource from './assets/images/Buildings.jpg'
import particleImageSource from './assets/images/Snow.png'


/**
 * Bouttons
 */
let activate_snow = true
let activate_cars = true
let activate_lights = false

document.getElementById("activate_snow").onclick = function () { activate_snow = !activate_snow };
document.getElementById("activate_cars").onclick = function () { activate_cars = !activate_cars };
document.getElementById("activate_lights").onclick = function () { activate_lights = !activate_lights };

/**
 * Variables
 */

const clock = new THREE.Clock();

const size_ville = 4
const speed_cars = 1
const number_of_cars_X2 = 3

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const RoadColorTexture = textureLoader.load(RoadColorImageSource)
const BuildingsColorTexture = textureLoader.load(BuildingsColorImageSource)
const particleTexture = textureLoader.load(particleImageSource)

// Road Texture
RoadColorTexture.magFilter = THREE.NearestFilter
RoadColorTexture.wrapS = THREE.RepeatWrapping
RoadColorTexture.wrapT = THREE.RepeatWrapping
RoadColorTexture.repeat.x = 2
RoadColorTexture.repeat.y = 20

// Buildings
BuildingsColorTexture.magFilter = THREE.NearestFilter
BuildingsColorTexture.wrapS = THREE.RepeatWrapping
BuildingsColorTexture.wrapT = THREE.RepeatWrapping
BuildingsColorTexture.repeat.x = 1
BuildingsColorTexture.repeat.y = 5


/**
 * Scene
 */
const scene = new THREE.Scene()

/**
 * Sizes
 */
const sizes = {}
sizes.width = window.innerWidth / 3 * 2
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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 200)
camera.position.z = 1
camera.position.y = 1
scene.add(camera)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
scene.add(ambientLight)















/**
 * Objets
 */


////////////////////Grass
// const grass = new THREE.Mesh(
//     new THREE.BoxGeometry(1000, 1000, 0.2, 0, 0, 0).translate(0, 0, 0),
//     new THREE.MeshLambertMaterial
//         ({
//             color: 0x2f2f2f
//         })
// )
// grass.rotation.x = - Math.PI * 0.5
// grass.position.y = -0.2
// scene.add(grass)



////////////////////Road

//Textures
const RoadGeometry = new THREE.PlaneGeometry(5, size_ville * 25, 1, 1)
const RoadMaterials = new THREE.MeshPhongMaterial({ map: RoadColorTexture })

//Init Objects
let lol = 4 - size_ville
if (lol > 0) lol = 1
else lol = -lol

for (let i = 0; i < size_ville - 1; i++) {

    const Road = new THREE.Mesh(
        RoadGeometry,
        RoadMaterials
    )
    Road.rotation.x = - Math.PI * 0.5
    Road.rotation.z = Math.PI / 2
    Road.position.z = i * 25 - 25
    Road.position.x = (25 / 2) * lol
    scene.add(Road)
}

for (let i = 0; i < size_ville - 1; i++) {

    const Road = new THREE.Mesh(
        RoadGeometry,
        RoadMaterials
    )
    Road.rotation.x = - Math.PI * 0.5
    Road.position.x = i * 25 - 25
    Road.position.z = (25 / 2) * lol
    Road.position.y = 0.01
    scene.add(Road)
}


////////////////////Lamps

const points = [];
for (let k = 0; k < 8; k++) {
    points.push(new THREE.Vector2(Math.sin(k * 0.2) * 10 + 0.1, (k - 5) * 2));
}

//Textures
const LampGeometry = new THREE.CylinderGeometry(0.1, 0.1, 3, 16).translate(0, 0.5, 0)
const LampMaterials = new THREE.MeshLambertMaterial({ color: 0x232528 })
const LatheGeomerty = new THREE.LatheGeometry(points);
const LatheMaterials = new THREE.MeshLambertMaterial({ color: 0x232528 });


//Init Objects
for (let i = 0; i < size_ville; i++) {
    for (let j = 0; j < size_ville; j++) {

        const Lamp = new THREE.Mesh(
            LampGeometry,
            LampMaterials
        )
        Lamp.position.y = 1
        Lamp.position.x = 2.5 + i * 25 - 50
        Lamp.position.z = 2.5 + j * 25 - 50
        scene.add(Lamp)

        const lathe = new THREE.Mesh(LatheGeomerty, LatheMaterials);
        lathe.rotation.x = Math.PI
        lathe.scale.x = 0.05
        lathe.scale.z = 0.05
        lathe.scale.y = 0.05
        lathe.position.x = 2.5 + i * 25 - 50
        lathe.position.z = 2.5 + j * 25 - 50
        lathe.position.y = 2.5
        scene.add(lathe);

        // // Light lamp OTHER METHOD SPOTLIGHTS
        // let spotLight = new THREE.SpotLight(0xF7B32B, 7, 7, Math.PI * 0.3, 0.5)
        // spotLight.position.y = 2.5

        // spotLight.position.x += 2.5 + i * 25 - 25
        // spotLight.position.z += 2.5 + j * 25 - 25
        // scene.add(spotLight)

        // spotLight.target.position.x = 2.5 + i * 25 - 25
        // spotLight.target.position.z = 2.5 + j * 25 - 25
        // scene.add(spotLight.target)
    }
}


////////////////////Floor

//Textures
const FloorGeometry = new THREE.BoxGeometry(20, 20, 0.2, 0, 0, 0).translate(0, 0.5, 0)
const FloorMaterials = new THREE.MeshPhongMaterial({ color: 0xffffff })

//Init Objects
for (let i = 0; i < size_ville; i++) {
    for (let j = 0; j < size_ville; j++) {

        const floor = new THREE.Mesh(
            FloorGeometry,
            FloorMaterials
        )
        floor.rotation.x = - Math.PI * 0.5
        floor.position.x = i * 25 + 5 / 2 - 40 // Je suis pas très bon en Maths, désolé
        floor.position.z = j * 25 + 5 / 2 - 39.5 // Je suis pas très bon en Maths, désolé
        scene.add(floor)
    }
}

//////////////////// Buildings

//Textures
const BuildingsGeometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1).translate(0, 0.5, 0)
const BuildingsMaterials = new THREE.MeshLambertMaterial({ map: BuildingsColorTexture })

const RoofGeometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1).translate(0, 0.5, 0)
const RoofMaterials = new THREE.MeshLambertMaterial({ color: 0xffffff })

//Init Objects
for (let i = 0; i < 10; i++) {
    for (let j = 0; j < size_ville; j++) {
        for (let k = 0; k < size_ville; k++) {

            let lol = 4 - size_ville
            if (lol > 0) lol = 0
            else lol = -lol

            const scale_y = Math.random() * 20
            const position_x_buildings = Math.random() * (24 - 10) + 30 - (j * 25) + 25 * lol
            const position_z_buildings = Math.random() * (24 - 10) + 30 - (k * 25) + 25 * lol
            const largeur_x_buildings = 1 + Math.random() * 2 + 3
            const largeur_z_buildings = 1 + Math.random() * 2 + 3
            const hauteur_buildings = scale_y

            // Box_Buildings
            const building = new THREE.Mesh(
                BuildingsGeometry,
                BuildingsMaterials
            )
            building.position.x = position_x_buildings
            building.position.z = position_z_buildings
            building.scale.x = largeur_x_buildings
            building.scale.z = largeur_z_buildings
            building.scale.y = hauteur_buildings
            scene.add(building)

            // Roof_Buildings
            const Roof = new THREE.Mesh(
                RoofGeometry,
                RoofMaterials
            )
            Roof.position.x = position_x_buildings
            Roof.position.z = position_z_buildings
            Roof.scale.x = largeur_x_buildings
            Roof.scale.z = largeur_z_buildings
            Roof.position.y = hauteur_buildings
            Roof.scale.y = 0.1
            scene.add(Roof)
        }
    }
}

////////////////////Cars

//Textures
const CarGeometry = new THREE.BoxGeometry(3, 2, 1, 0, 0, 0).translate(0, 0.5, 0)
const CarMaterials = new THREE.MeshLambertMaterial({ color: 0xff0000 })

//Init Objects
const cars = []
const cars_directions = []

for (let j = 0; j < number_of_cars_X2; j++) {
    for (let i = 0; i < number_of_cars_X2; i++) {
        const Car = new THREE.Mesh(
            CarGeometry,
            CarMaterials
        )
        cars_directions.push('up')
        Car.position.z = (i * 25) - (35 * (0.5 + 0.5 / 2))
        Car.position.x = (i * 25) - (35 * (0.5 + 0.5 / 2)) - 10 + (j * 15)
        cars.push(Car)
    }
}
for (let i = 0; i < cars.length; i++) scene.add(cars[i])


/**
 * Particles
 */
// Geometry
const particlesGeometry = new THREE.Geometry()
const particlesGeometry_2 = new THREE.Geometry()

for (let i = 0; i < 2000; i++) {
    // Vertice
    const vertice = new THREE.Vector3(
        Math.random() * 100 - 50,
        (Math.random() - 0.5) * 50,
        Math.random() * 100 - 50
    )
    particlesGeometry_2.vertices.push(vertice)

    // Color
    const color = new THREE.Color(0xffffff)
    particlesGeometry_2.colors.push(color)
}

for (let i = 0; i < 2000; i++) {
    // Vertice
    const vertice = new THREE.Vector3(
        Math.random() * 100 - 50,
        (Math.random() - 0.5) * 50,
        Math.random() * 100 - 50
    )
    particlesGeometry.vertices.push(vertice)

    // Color
    const color = new THREE.Color(0xffffff)
    particlesGeometry.colors.push(color)
}



// Material
const particlesMaterial = new THREE.PointsMaterial({
    vertexColors: true,
    size: 0.4,
    sizeAttenuation: true,
    // color: new THREE.Color(0xff0000),
    // map: particleTexture
    alphaMap: particleTexture,
    transparent: true
})

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
const particles_2 = new THREE.Points(particlesGeometry_2, particlesMaterial)
scene.add(particles_2)
scene.add(particles)
particles.position.y = 50


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)

/**
 * FirstPersonControls
 */
let controls = new FirstPersonControls(camera, renderer.domElement);
controls.movementSpeed = 5;
controls.lookSpeed = 0.2;

/**
 * Loop
 */
const loop = () => {
    window.requestAnimationFrame(loop)

    // Update controls
    controls.update(clock.getDelta());

    //Object update

    //Snow Update
    if (activate_snow == true) {
        particles.position.y -= 0.5
        particles_2.position.y -= 0.5
        if (particles_2.position.y < -25) particles_2.position.y = 75
        if (particles.position.y < -25) particles.position.y = 75
    }
    ////////Cars Update
    // Moves Cars
    if (activate_cars == true) {
        for (let i = 0; i < cars.length; i++) {

            switch (cars_directions[i]) {
                case 'up':
                    cars[i].position.x += speed_cars
                    break;
                case 'down':
                    cars[i].position.x -= speed_cars
                    break;
                case 'left':
                    cars[i].position.z += speed_cars
                    break;
                case 'right':
                    cars[i].position.z -= speed_cars
                    break;
            }

            //Respawn Cars
            if (cars[i].position.x > (size_ville - 2) * 25
                || cars[i].position.x < -50
                || cars[i].position.z > (size_ville - 2) * 25
                || cars[i].position.z < -50) {

                const nb_direction = Math.random() * 10
                let nb_place = Math.floor(Math.random() * Math.floor(size_ville - 1))
                nb_place -= 1
                nb_place *= 25


                if (nb_direction < 2.5) {
                    cars_directions[i] = 'down'
                    cars[i].position.z = nb_place - 1.5
                    cars[i].position.x = (size_ville - 2) * 25 - 5
                    cars[i].rotation.y = 0
                }
                else if (nb_direction < 5) {
                    cars_directions[i] = 'up'
                    cars[i].position.z = nb_place + 1.5
                    cars[i].position.x = -50
                    cars[i].rotation.y = 0
                }
                else if (nb_direction < 7.5) {
                    cars_directions[i] = 'left'
                    cars[i].position.z = -50
                    cars[i].position.x = nb_place - 1.5
                    cars[i].rotation.y = Math.PI / 2
                }
                else {
                    cars_directions[i] = 'right'
                    cars[i].position.z = (size_ville - 2) * 25 - 5
                    cars[i].position.x = nb_place + 1.5
                    cars[i].rotation.y = Math.PI / 2
                }

            }



        }
    }
    // Activate Light lamp
    if (activate_lights == true) {
        for (let i = 0; i < size_ville; i++) {
            for (let j = 0; j < size_ville; j++) {
                const pointLight = new THREE.PointLight(0xff9000, 1, 10)
                pointLight.position.x = 2.5 + i * 25 - 25
                pointLight.position.y = 3
                pointLight.position.z = 2.5 + j * 25 - 25
                scene.add(pointLight)
            }
        }
        activate_lights = false

    }

    // Cursor Borders
    if (cursor.x > 0.48) controls.lookSpeed = 0;
    else if (cursor.y > 0.48) controls.lookSpeed = 0;
    else if (cursor.x < -0.48) controls.lookSpeed = 0;
    else if (cursor.y < -0.48) controls.lookSpeed = 0;
    else controls.lookSpeed = 0.2;

    // Render
    renderer.render(scene, camera)
}

loop()