import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import vertexShader from './shaders/test/vertex.glsl'
import fragmentShader from './shaders/test/fragment.glsl'

//Post-Processing
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js'

//Stars Particles
import starImageSource from './assets/images/particles/12.png';


//Asteroid
import asteroidColorImageSource from './assets/images/meteor/meteoColor.jpg';
import asteroidNormalImageSource from './assets/images/meteor/normal.jpg';

//Sun
import sunColorImageSource from './assets/images/sun/color.jpg'
import sunNormalImageSource from './assets/images/sun/normal.jpg'
import { VertexColors } from 'three';


const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

//Star texture
const starTexture = textureLoader.load(starImageSource);


//Asteroid texture
const asteroidColorTexture = textureLoader.load(asteroidColorImageSource);

//Sun texture
const sunColorTexture = textureLoader.load(sunColorImageSource);
const sunNormalTexture = textureLoader.load(sunNormalImageSource);




/**
 * Repeat asteroids texture
 */
asteroidColorTexture.wrapS = THREE.RepeatWrapping;
asteroidColorTexture.wrapT = THREE.RepeatWrapping;
asteroidColorTexture.repeat.x = 3;
asteroidColorTexture.repeat.y = 3;

/**
 * Sizes
 */
const sizes = {};
sizes.width = window.innerWidth;
sizes.height = window.innerHeight;

window.addEventListener('resize', () => {
    // Save sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    effectComposer.setSize(sizes.width, sizes.height)

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
})


/**
 * Scene
 */
const scene = new THREE.Scene()

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 200);
camera.position.z = 56;
camera.position.y = 20;
scene.add(camera);

/**
 * endScene = Game Over
 */
const endScene = new THREE.Scene()

/**
 * Camera endScene
 */
const endCamera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 200)
endCamera.position.z = 56;
endCamera.position.y = 20;
endScene.add(endCamera);

//first scene = game scene
let currentScene = scene
let currentCamera = camera

/**
 * Cursor
 */
const cursor = {};
cursor.x = 0;
cursor.y = 0;

window.addEventListener('mousemove', (_event) => {
    cursor.x = _event.clientX / sizes.width - 0.5;
    cursor.y = _event.clientY / sizes.height - 0.5;
});

const bulletArray = []

//Keyboard control

const keyboard = {};
keyboard.up = false;
keyboard.right = false;
keyboard.down = false;
keyboard.left = false;
keyboard.speed = false;
keyboard.bullet = false;
keyboard.restart = false;

document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'KeyW':
        case 'ArrowUp':
            keyboard.up = true;
            break;

        case 'KeyD':
        case 'ArrowRight':
            keyboard.right = true;
            break;

        case 'KeyS':
        case 'ArrowDown':
            keyboard.down = true;
            break;

        case 'KeyA':
        case 'ArrowLeft':
            keyboard.left = true;
            break;

        case 'KeyQ':
            keyboard.speed = true;
            break;

        case 'Space':
            keyboard.bullet = true;
            const bullet = new THREE.SphereBufferGeometry(0.1, 0.1, 5)
            bullet.mesh = new THREE.Mesh(bullet)
            bulletArray.push(bullet)
            break;

        case 'Enter':
            keyboard.restart = true;
            currentScene = scene;
            currentCamera = camera;

            //Restart speed
            speedAsteroid = 0.04

            //Restart Life
            lifeLeft = 3
            scene.add(life)
            scene.add(life1)
            scene.add(life3)

            // Restart Spaceship
            spaceshipGroup.position.x = 0
            spaceshipGroup.position.y = 5
            spaceshipGroup.position.z = 30

            spaceshipGroup.rotation.x = 0
            spaceshipGroup.rotation.y = 0
            spaceshipGroup.rotation.z = 0

            // Restart renderPass
            renderPass.scene = currentScene
            renderPass.camera = currentCamera

            //Remove "Press enter"
            document.querySelector(".restart").style.display = "none";

            //Position Asteroid
            for (let i = 0; i < asteroidArray.length; i++) {
                asteroidArray[i].mesh.position.x = (Math.random() - 0.5) * 30;
                asteroidArray[i].mesh.position.y = (Math.random() + 0.5) * 10;
                asteroidArray[i].mesh.position.z = - 100 + (Math.random() + 0.5) * 10;
            }

            //Remove timer and score
            document.querySelector(".timer").style.display = "flex";
            document.querySelector(".score").style.display = "flex";

            //Restart score
            score = 0
            
            break;

    };
});


document.addEventListener('keyup', (event) => {
    switch (event.code) {
        case 'KeyW':
        case 'ArrowUp':
            keyboard.up = false
            break;

        case 'KeyD':
        case 'ArrowRight':
            keyboard.right = false
            break;

        case 'KeyS':
        case 'ArrowDown':
            keyboard.down = false
            break;

        case 'KeyA':
        case 'ArrowLeft':
            keyboard.left = false
            break;

        case 'KeyQ':
            keyboard.speed = false;
            break;

        case 'Space':
            keyboard.bullet = false;
            break;

        case 'Enter':
            keyboard.restart = false;
            break;
    };
});


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio), 2)
document.body.appendChild(renderer.domElement);


const effectComposer = new EffectComposer(renderer)

const renderPass = new RenderPass(currentScene, currentCamera)
effectComposer.addPass(renderPass);

// Effect in game scene and gameOver scene
const unrealBloomPass = new UnrealBloomPass(new THREE.Vector2(sizes.width, sizes.height))
unrealBloomPass.strength = 0.6
unrealBloomPass.radius = 0.4
unrealBloomPass.threshold = 0.03
effectComposer.addPass(unrealBloomPass)

// Glitch pass Collsion Spaceship and asteroid
const glitchPass = new GlitchPass();
effectComposer.addPass(glitchPass);
glitchPass.enabled = false
glitchPass.goWild = true

/**
 Orbit controls*/
/*
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.zoomSpeed = 0.3*/


/**
 * Game Lights
 */
const ambientLight = new THREE.AmbientLight(0xffcccc, 0.2);
scene.add(ambientLight);

// endScene Light
const helmetAmbientLight = new THREE.DirectionalLight(0xffcccc, 1);
endScene.add(helmetAmbientLight);


// Light for Sun
const sunLight = new THREE.DirectionalLight(0xffcccc, 1);
sunLight.position.x = 10;
sunLight.position.y = 0;
sunLight.position.z = 0;
scene.add(sunLight);


/**
 * Material
 */

// MaterialStars
const starMaterial = new THREE.PointsMaterial({
    size: 0.1,
    alphaMap: starTexture,
    transparent: true,
    depthWrite: false,
});

// MaterialReactors
const reactorMaterial = new THREE.PointsMaterial({
    size: 0.01,
    alphaMap: starTexture,
    transparent: true,
    depthWrite: false,
    color: new THREE.Color(0xffffff),
});

// MaterialShaderAsteroids
const asteroidShaderMaterial = new THREE.ShaderMaterial({
    // map: asteroidColorTexture,
    // normalMap: asteroidNormalTexture,
    vertexShader,
    fragmentShader,
    uniforms: {
        tDiffuse: {
            value: asteroidColorTexture
        }
    }
});

// Material Sun Particle
const sunMaterial = new THREE.PointsMaterial({
    size: 0.02,
    VertexColors: true,
    transparent: true,
    color: new THREE.Color(0xFDB813)
})

// Material Sun
const sunMaterialSphere = new THREE.MeshBasicMaterial({
    map: sunColorTexture,
    normalMap: sunNormalTexture,
})

 // Material Background
const backgroundMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0xffffff)
})



/**
 * Building Geometry
 */

//Build Star
const starGeometry = new THREE.Geometry();

//Build Reactor
const reactorGeometry = new THREE.Geometry();

//Build Reactor
const reactor1Geometry = new THREE.Geometry();

//Build Reactor
const reactor2Geometry = new THREE.Geometry();


//Build Asteroids
const asteroidsGeometry = new THREE.SphereBufferGeometry(0.75,16,16);

// Build Sun Particles
const sunGeometry = new THREE.Geometry();

// Build Sun
const sunGeometrySphere = new THREE.SphereBufferGeometry(5, 64, 64)

const backgroundGeometry = new THREE.PlaneBufferGeometry(500, 500, 10,10)



// Build Life

const background = new THREE.Mesh(backgroundGeometry, backgroundMaterial)
background.position.z = -30
endScene.add(background)

//const lifeArray = []
let lifeLeft = 3
const life = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 0.3, 0.2))
life.position.y = 3.33;
life.position.z = 45;
life.position.x = 1.5;
scene.add(life)

const life1 = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 0.3, 0.2))
life1.position.y = 3.33;
life1.position.z = 45;
life1.position.x = 2.5;
scene.add(life1)

const life3 = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 0.3, 0.2))
life3.position.y = 3.33;
life3.position.z = 45;
life3.position.x = 1.5;
scene.add(life3)


const sun = new THREE.Mesh(sunGeometrySphere, sunMaterialSphere)
sun.position.z = -100;
sun.position.y = 15;
sun.position.x = -10
scene.add(sun);



// Sun particles
for (let i = 0; i < 30000; i++) {

    //let angle = Math.random() * Math.PI *2;
    let radius = Math.random() * 5 + 0.5;

    const x = Math.random() - 0.5;
    const y = Math.random() - 0.5;
    const z = Math.random() - 0.5;

    const vertice = new THREE.Vector3(x, y, z).normalize()
    let randomParticle = vertice.multiplyScalar(radius)
    sunGeometry.vertices.push(vertice);
}

const sunParticle = new THREE.Points(sunGeometry, sunMaterial);
sunParticle.position.z = -100
sunParticle.position.y = 15
sunParticle.position.x = -10
scene.add(sunParticle);



// Stars Particles
for (let i = 0; i < 30000; i++) {
    const vertice = new THREE.Vector3(
        Math.random() * 100 - 50,
        Math.random() * 20,
        (Math.random() - 0.5) * 100,
    );
    starGeometry.vertices.push(vertice);
};

// Points
const star = new THREE.Points(starGeometry, starMaterial);
scene.add(star);




/**
 * Reactor Particles
 */
for (let i = 0; i < 10000; i++) {
    const angle = Math.random() * Math.PI *2
    const radius = Math.random() * 0.03

    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const vertice = new THREE.Vector3(
        x,
        Math.random() * 1.4,
        z,
    );
    reactorGeometry.vertices.push(vertice);
};

/**
 * Reactor 1 Particles
 */
for (let i = 0; i < 10000; i++) {
    const angle = Math.random() * Math.PI *2
    const radius = Math.random() * 0.03

    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const vertice = new THREE.Vector3(
        x,
        Math.random() * 1.4,
        z,
    );
    reactor1Geometry.vertices.push(vertice);
};

/**
 * Reactor 2 Particles
 */
for (let i = 0; i < 10000; i++) {
    const angle = Math.random() * Math.PI *2
    const radius = Math.random() * 0.03

    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const vertice = new THREE.Vector3(
        x,
        Math.random() * 1.4,
        z,
    );
    reactor2Geometry.vertices.push(vertice);
};



/**
 * GeometryAsteroids
 */

//Aray for moove in loop
let asteroidArray = [];

for (let i = 0; i < 80; i++) {
    const asteroid = {}
    asteroid.radius = Math.random() * 1.5
    asteroid.mesh = new THREE.Mesh(asteroidsGeometry, asteroidShaderMaterial, asteroid.radius);
    asteroid.mesh.position.x = (Math.random() - 0.5) * 30;
    asteroid.mesh.position.y = (Math.random() + 0.5) * 10;
    asteroid.mesh.position.z = -20 * (Math.random() + 0.5) * 10;
    asteroidArray.push(asteroid);

    scene.add(asteroid.mesh);
}


//Load model Spaceship
const spaceshipGroup = new THREE.Group();
spaceshipGroup.scale.set(0.004, 0.004, 0.004);
spaceshipGroup.position.z = 30
scene.add(spaceshipGroup);

gltfLoader.load(
    'models/xwing/x_wing.glb',
    (gltf) => {
        console.log('sucess')
        console.log(gltf)
        while (gltf.scene.children.length) {
            const child = gltf.scene.children[0];
            spaceshipGroup.add(child);
        }
    },

    undefined,

    (error) => {
        console.log('erreur');
        console.log(error);
    }
)


//Load helmet
const helmet = new THREE.Group();
helmet.scale.set(20, 20, 20);
endScene.add(helmet);

gltfLoader.load(
    'models/helmet/DamagedHelmet.glb',
    (gltf) => {
        console.log('sucess')
        console.log(gltf)
        while (gltf.scene.children.length) {
            const child = gltf.scene.children[0];
            helmet.add(child);
        }
    },

    undefined,

    (error) => {
        console.log('erreur');
        console.log(error);
    }
)


// Points Reactor
const reactor = new THREE.Points(reactorGeometry, reactorMaterial);
reactor.scale.x /= 0.004
reactor.scale.y /= 0.004
reactor.scale.z /= 0.004

reactor.position.z = 250
reactor.position.y = -30

reactor.rotation.z = Math.PI / 2;
reactor.rotation.y = Math.PI / 2;
spaceshipGroup.add(reactor)

// Points Reactor 1
const reactor1 = new THREE.Points(reactor1Geometry, reactorMaterial);
reactor1.scale.x /= 0.004
reactor1.scale.y /= 0.004
reactor1.scale.z /= 0.004

reactor1.position.x = - 38
reactor1.position.y = - 5
reactor1.position.z = 250


reactor1.rotation.z = Math.PI / 2;
reactor1.rotation.y = Math.PI / 2;
//reactorArray.push(reactor);
spaceshipGroup.add(reactor1)


// Points Reactor 2
const reactor2 = new THREE.Points(reactor2Geometry, reactorMaterial);
reactor2.scale.x /= 0.004
reactor2.scale.y /= 0.004
reactor2.scale.z /= 0.004

reactor2.position.x = + 30
reactor2.position.y = - 5
reactor2.position.z = 250


reactor2.rotation.z = Math.PI / 2;
reactor2.rotation.y = Math.PI / 2;
spaceshipGroup.add(reactor2)




// Start Game speed asteroid
let speedAsteroid = 0.04
let score = 0

// Remove Display Menu
document.querySelector(".display-menu").addEventListener("click", (event) => {

    document.querySelector(".title").style.display = "none";
    document.querySelector(".control").style.display = "none";
    document.querySelector(".start").style.display = "none";

    // 01/01/1970
    const startTime = Date.now()

    // Initialisation speed Helmet
    let speedHelmetX = 0.25
    let speedHelmetY = 0.25

    /**
     * Loop
     */
    const loop = () => {

        //Update Speed Asteroid
        speedAsteroid *= 1.001


        //Helmet Position
        helmet.position.x += speedHelmetX
        helmet.position.y += speedHelmetY
        helmet.rotation.x += 0.01
        helmet.rotation.y += 0.01

        if (helmet.position.x > 100 || helmet.position.x < -100) {
           speedHelmetX *= -1 
        }
        if (helmet.position.y > 50 || helmet.position.y < -50) {
            speedHelmetY *= -1 
         }

        /**
        * Timer
        */
        //Time declared
        let elapsedTime = Date.now() - startTime
        let ms = elapsedTime
        let secondes = 0
        let minutes = 0

        //Convert millisec to secondes and secondes to minutes
        for (let i = 0; i < elapsedTime; i++) {

            if (ms >= 1000) {
                secondes += 1
                ms -= 1000
            }

            if (secondes >= 59) {
                minutes += 1
                secondes = 0
                ms -= 1000
            }
        }

        // Write Time
        let time = document.querySelector(".timer")
        time.textContent = minutes + ' minutes et ' + secondes + ' sec'




        /**
         * Mooves Control
         */

        //Up
        if (keyboard.up) {
            spaceshipGroup.position.y += 0.1;
            spaceshipGroup.rotation.x += 0.02;


            //Rotation Up
            if (spaceshipGroup.rotation.x > + 0.4) {
                spaceshipGroup.rotation.x = + 0.4;
            }
        }

        //Right
        if (keyboard.right) {
            spaceshipGroup.position.x += 0.1;
            spaceshipGroup.rotation.z -= 0.03;

            //Rotation right
            if (spaceshipGroup.rotation.z < - 0.4) {
                spaceshipGroup.rotation.z = - 0.4;
            }
        }

        //Down
        if (keyboard.down) {
            spaceshipGroup.position.y -= 0.1;
            spaceshipGroup.rotation.x -= 0.03;

            //Rotation Down
            if (spaceshipGroup.rotation.x < - 0.4) {
                spaceshipGroup.rotation.x = - 0.4
            }
        }

        //Left
        if (keyboard.left) {
            spaceshipGroup.position.x -= 0.1;
            spaceshipGroup.rotation.z += 0.03;

            //Rotation left
            if (spaceshipGroup.rotation.z > + 0.4) {
                spaceshipGroup.rotation.z = + 0.4;
            }
        }


        /**
         * Block
         */

        //Block Right
        if (spaceshipGroup.position.x > 14) {
            spaceshipGroup.position.x = 14;
        }

        //Block left
        if (spaceshipGroup.position.x < -14) {
            spaceshipGroup.position.x = -14;
        }

        //Block Up
        if (spaceshipGroup.position.y > 15) {
            spaceshipGroup.position.y = 15
        }

        //Block backward
        if (spaceshipGroup.position.y < 5) {
            spaceshipGroup.position.y = 5
        }



        //Update Sun particles
        for (const vertice of sunGeometry.vertices) {
            vertice.y += Math.sin(Date.now() * 0.001 + vertice.x * 1000) * 0.01;
        }
        sunGeometry.verticesNeedUpdate = true;


        // Update star
        for (const _vertice of starGeometry.vertices) {
            _vertice.z += 0.3;

            if (_vertice.z > 60) {
                _vertice.z = -50;
            }
        }
        starGeometry.verticesNeedUpdate = true;


        // Update reactor
        for (const vertice of reactorGeometry.vertices) {
            vertice.y += 0.02;
            reactorGeometry.x -= 1;
            reactorGeometry.z -= 1;
            if (vertice.y > 0.7) {
                vertice.y = 0.1;
            }
        }
        reactorGeometry.verticesNeedUpdate = true;

        // Update reactor 1
        for (const vertice of reactor1Geometry.vertices) {
            vertice.y += 0.02;
            reactor1Geometry.x -= 1;
            reactor1Geometry.z -= 1;

            if (vertice.y > 0.7) {
                vertice.y = 0.1;
            }
        }
        reactor1Geometry.verticesNeedUpdate = true;

        // Update reactor 2
        for (const vertice of reactor2Geometry.vertices) {
            vertice.y += 0.02;
            reactor2Geometry.x -= 1;
            reactor2Geometry.z -= 1;

            if (vertice.y > 0.7) {
                vertice.y = 0.1;
            }
        }
        reactor2Geometry.verticesNeedUpdate = true;


        // Update Asteroids
        for (let i = 0; i < asteroidArray.length; i++) {
            const asteroid = asteroidArray[i]
            asteroid.mesh.position.z += speedAsteroid;
            asteroid.mesh.rotation.x += Math.random() * 0.05
            asteroid.mesh.rotation.y -= Math.random() * 0.05

            if (asteroidArray[i].mesh.position.z > 60) {
                asteroidArray[i].mesh.position.z = -50;
            }


            // Collision spaceShip / Asteroid
            if (asteroid.mesh.position.distanceTo(spaceshipGroup.position) < asteroidArray[i].radius + 0.80) {
                scene.remove(asteroid.mesh)
                speedAsteroid *= 0.5;

                //Enabled Glitch
                glitchPass.enabled = true;
                setTimeout(() => {
                    glitchPass.enabled = false;
                }, 500);

                asteroidArray.splice(i, 1);
                i--;

                lifeLeft--;
                switch (lifeLeft) {
                    case 2:
                        scene.remove(life3);
                        break;
                    case 1:
                        scene.remove(life1);
                        break;
                    case 0:
                        scene.remove(life);
                        break;
                }

                //Life
                if (lifeLeft == 0) {
                    currentScene = endScene;
                    currentCamera = endCamera;
                    renderPass.scene = currentScene;
                    renderPass.camera = currentCamera;

                    document.querySelector(".score").style.display = "none";

                    // Helmet Position
                    helmet.position.x = -50
                    helmet.position.y = 30

                    // Display message
                    document.querySelector(".restart").style.display = "flex";
                    document.querySelector(".timer").style.display = "none";

                    glitchPass.enabled = false
                    speedAsteroid = 0

                } else {
                    currentScene = scene
                    currentCamera = camera
                }
            }
            // Bullet collision width asteroid
            for (let j = 0; j < bulletArray.length; j++) {

                if (asteroid.mesh.position.distanceTo(bulletArray[j].mesh.position) < asteroid.radius + 0.80) {
                    score += 1
                    speedAsteroid *= 1.001

                    let Totalscore = document.querySelector(".score")
                    Totalscore.textContent = 'le score est de ' + score

                    scene.remove(asteroid.mesh);
                    scene.remove(bulletArray[j].mesh);
                    bulletArray.splice(j, 1);
                    j--

                    asteroidArray[i].mesh.position.z = 100
                }
            }
        }

        // Bullet Position
        for (let i = 0; i < bulletArray.length; i++) {
            if (keyboard.bullet) {
                bulletArray[i].mesh.position.x = spaceshipGroup.position.x;
                bulletArray[i].mesh.position.y = spaceshipGroup.position.y;
                bulletArray[i].mesh.position.z = spaceshipGroup.position.z;

                bulletArray[i].mesh.rotation.x = spaceshipGroup.rotation.x;
                bulletArray[i].mesh.rotation.y = spaceshipGroup.rotation.y;
                bulletArray[i].mesh.rotation.z = spaceshipGroup.rotation.z;
                scene.add(bulletArray[i].mesh);
            }

            bulletArray[i].mesh.position.z -= 1;
        }



        window.requestAnimationFrame(loop);

        // Update controls
        //controls.update()


        //Camera follow spaceShip

        camera.position.x += (spaceshipGroup.position.x - camera.position.x) / 10;
        camera.position.y += (spaceshipGroup.position.y + 2 - camera.position.y) / 10;
        camera.position.z += (spaceshipGroup.position.z + 5 - camera.position.z) / 10;


        life.position.x += (spaceshipGroup.position.x - 12 - life.position.x) / 10;
        life.position.y += (spaceshipGroup.position.y - 3 - life.position.y) / 10;
        life.position.z += (spaceshipGroup.position.z - 4 - life.position.z) / 10;

        life1.position.x += (spaceshipGroup.position.x - 10 - life1.position.x) / 10;
        life1.position.y += (spaceshipGroup.position.y - 3 - life1.position.y) / 10;
        life1.position.z += (spaceshipGroup.position.z - 4 - life1.position.z) / 10;

        life3.position.x += (spaceshipGroup.position.x - 8 - life3.position.x) / 10;
        life3.position.y += (spaceshipGroup.position.y - 3 - life3.position.y) / 10;
        life3.position.z += (spaceshipGroup.position.z - 4 - life3.position.z) / 10;

        // Render
        effectComposer.render(currentScene, currentCamera);
    };

    loop();

})