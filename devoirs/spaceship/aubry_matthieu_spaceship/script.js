import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

import asteroidColorTextureSource from './assets/images/asteroid/color.jpg'
import sunColorTextureSource from './assets/images/sun/color.jpg'
import planet_1ColorTextureSource from './assets/images/planets/color-1.png'
import planet_2ColorTextureSource from './assets/images/planets/color-2.png'
import planet_3ColorTextureSource from './assets/images/planets/color-3.png'
import rockDiffuseAlphaImageSource from './assets/images/rock/diffuse-alpha.png'


import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'



/**
 * GLTFLoader
 */
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)



/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const asteroidColorTexture = textureLoader.load(asteroidColorTextureSource)

const sunColorTexture = textureLoader.load(sunColorTextureSource)
    sunColorTexture.wrapS = THREE.RepeatWrapping;
    sunColorTexture.wrapT = THREE.RepeatWrapping;
    sunColorTexture.repeat.x = 10;
    sunColorTexture.repeat.y = 10;

const planet_1ColorTexture = textureLoader.load(planet_1ColorTextureSource)
    planet_1ColorTexture.wrapS = THREE.RepeatWrapping;
    planet_1ColorTexture.wrapT = THREE.RepeatWrapping;

const planet_2ColorTexture = textureLoader.load(planet_2ColorTextureSource)
    planet_2ColorTexture.wrapS = THREE.RepeatWrapping;
    planet_2ColorTexture.wrapT = THREE.RepeatWrapping;

const planet_3ColorTexture = textureLoader.load(planet_3ColorTextureSource)
    planet_3ColorTexture.wrapS = THREE.RepeatWrapping;
    planet_3ColorTexture.wrapT = THREE.RepeatWrapping;

    const rockDiffuseAlphaTexture = textureLoader.load(rockDiffuseAlphaImageSource)
rockDiffuseAlphaTexture.center.x = 0.5
rockDiffuseAlphaTexture.center.y = 0.5
rockDiffuseAlphaTexture.rotation = - Math.PI * 0.5



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

    // Update effect composer
    effectComposer.setSize(sizes.width, sizes.height)
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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 2000)

camera.position.x = 0
camera.position.y = 0
camera.position.z = 30

scene.add(camera)



/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()

renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))



/**
 * Effect composer
 */
const effectComposer = new EffectComposer(renderer)

const renderPass = new RenderPass(scene, camera)
effectComposer.addPass(renderPass)



/**
 * Glitch effect
 */
const glitchPass = new GlitchPass()

glitchPass.enabled = false
glitchPass.goWild = true

effectComposer.addPass(glitchPass)



/**
 * Bloob effect
 */
const unrealPass = new UnrealBloomPass(new THREE.Vector2(sizes.width, sizes.height))

unrealPass.strength = 1
unrealPass.radius = 0.4
unrealPass.threshold = 0.05

effectComposer.addPass(unrealPass)


/**
 * Debug
 */
const debug = window.location.hash == "#debug"

if(debug)
{
    /**
     * Orbit controls
     */
    const controls = new OrbitControls(camera, renderer.domElement)

    controls.enableDamping = true
    controls.zoomSpeed = 0.3

    // Update Orbit Controls
    controls.update()
}


/**
 * Light
 */
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)

directionalLight.position.x = 10
directionalLight.position.y = 0
directionalLight.position.z =  50

scene.add(directionalLight)
// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
// scene.add(directionalLightHelper)



/**
 * Spaceship 
 */
//spaceship radius = 4

const spaceshipGroup = new THREE.Group()
    spaceshipGroup.scale.set(0.015, 0.015, 0.015)

// Model loadeer
gltfLoader.load(
    'models/spaceship/spaceship.gltf',
    (gltf)=>{
        while(gltf.scene.children.length)
        {
            const child = gltf.scene.children[0]
            spaceshipGroup.add(child)
            spaceshipGroup.rotation.y = Math.PI
        }
    },
    undefined,
    (error)=>{
        console.log("error")
        console.log(error)
    }
)


/**
 * Life
 */
//lite radius = 2
const lifeGroup = new THREE.Group()
    lifeGroup.scale.set(0.015, 0.015, 0.015)

// Model loadeer
gltfLoader.load(
    'models/3D_heart/3D_heart.gltf',
    (gltf)=>{
        while(gltf.scene.children.length)
        {
            const child = gltf.scene.children[0]
            lifeGroup.add(child)
            scene.add(lifeGroup)
            lifeGroup.rotation.y = Math.PI*0.45
            lifeGroup.position.z = -1000
        }
    },
    undefined,
    (error)=>{
        console.log("error")
        console.log(error)
    }
)

const lifes = document.querySelectorAll(".life")



/**
 * Keyboard
 */
const keyboard = {}
    keyboard.up = false
    keyboard.right = false
    keyboard.down = false
    keyboard.left = false
    keyboard.enter = false
    keyboard.restart = false

document.addEventListener('keydown', (_event ) =>
{
    switch(_event.code)
    {
        case 'Enter' : 
            keyboard.enter = true
            gameStart = true
            canShoot = true
            break;
        case 'KeyR' :
            keyboard.restart = true
            
            if(keyboard.restart == true && gameOver == true)
            {
                //Reset music
                music.currentTime = 0

                //Reset timer
                startTime = Date.now()
                
                //Reset speed
                speed = 0.5

                //Reset score
                score = 0

                //Reset life
                life = 4
                lifeGroup.position.z = -1000

                for(let i=0; i<4; i++)
                {
                    lifes[i].style.display = "block"
                }

                //Reset spaceship position
                spaceshipGroup.position.x = 0
                spaceshipGroup.position.y = 0
                spaceshipGroup.position.z = 0

                //Reset asteroids position
                for(let i=0; i<asteroids.length; i++)
                {
                    asteroids[i].mesh.position.x = (Math.random() - 0.5)*50
                    asteroids[i].mesh.position.y = (Math.random() - 0.5)*50
                    asteroids[i].mesh.position.z =  -800 - (Math.random()*1000)
                }

                gameStart = true

                canShoot = true

                gameOver = false

                document.querySelector("#game-over").style.display = "none"
            }
            break;
        case 'KeyO' :
        case ' mute' :
            if(mute == false)
            {
                mute = true
            }
            else
            {
                mute = false
            }
            break;
        case 'KeyW' : 
        case 'Up' : 
            keyboard.up = true
            break;
        case 'KeyS' : 
        case 'Down' : 
            keyboard.down = true
            break;
        case 'KeyD' : 
        case 'Right' : 
            keyboard.right = true
            break;
        case 'KeyA' : 
        case 'Left' : 
            keyboard.left = true
            break;
        case 'Space' :
        case 'space' :
            shooldShoot = true
            break
    }
})


document.addEventListener('keyup', (_event ) =>
{
    switch(_event.code)
    {
        case 'KeyW' : 
        case 'Up' : 
            keyboard.up = false
            break;
        case 'KeyR' :
        case ' restart' :
            keyboard.restart = false
            break;
        case 'KeyM' :
        case 'KeyS' : 
        case 'Down' : 
            keyboard.down = false
            break;
        case 'KeyD' : 
        case 'Right' : 
            keyboard.right = false
            
            break;
        case 'KeyA' : 
        case 'Left' : 
            keyboard.left = false
            break;
        case 'Space' :
        case 'space' :
            shooldShoot = false
            break
    }
})



/**
 * Asteroids
 */
const asteroidMaterial = new THREE.MeshStandardMaterial({
    map: asteroidColorTexture
});

const asteroids = []

for(let i =0; i< 50; i++)
{
    const asteroid = {}
    asteroid.radius = Math.random()*5

    const asteroidGeometry = new THREE.SphereBufferGeometry( 1 + asteroid.radius, 8, 6)

    asteroid.mesh = new THREE.Mesh(
        asteroidGeometry,
        asteroidMaterial
    )

    asteroid.mesh.position.x = (Math.random() - 0.5)*50
    asteroid.mesh.position.y = (Math.random() - 0.5)*50
    asteroid.mesh.position.z = -800 - (Math.random()*1000)

    asteroids.push(asteroid)
}

/**
 * Solar system
 */
const solarSystem = new THREE.Group()
solarSystem.position.z = - 1200
solarSystem.rotation.x = 0.1
scene.add(solarSystem)


/**
 * Sun
 */
const sunGeometry = new THREE.SphereBufferGeometry( 50, 20, 20)

const sunMaterial = new THREE.MeshBasicMaterial({
    map: sunColorTexture
});

const sun = new THREE.Mesh(
    sunGeometry,
    sunMaterial
)

sun.position.x = 0
sun.position.y = 0
sun.position.z = 0

solarSystem.add(sun)



/**
 * Planet-1
 */
const planet_1Geometry = new THREE.SphereBufferGeometry( 18, 20, 20)

const planet_1Material = new THREE.MeshBasicMaterial({
    map: planet_1ColorTexture
});

const planet_1 = new THREE.Mesh(
    planet_1Geometry,
    planet_1Material
)

planet_1.position.x = 0
planet_1.position.y = 0
planet_1.position.z = -150

solarSystem.add(planet_1)



/**
 * Planet-2
 */
const planet_2Geometry = new THREE.SphereBufferGeometry( 15, 20, 20)

const planet_2Material = new THREE.MeshBasicMaterial({
    map: planet_2ColorTexture
});

const planet_2 = new THREE.Mesh(
    planet_2Geometry,
    planet_2Material
)

planet_2.position.x = -200
planet_2.position.y = 0
planet_2.position.z = 0

solarSystem.add(planet_2)



/**
 * Planet-2
 */
const planet_3Geometry = new THREE.SphereBufferGeometry( 16, 20, 20)

const planet_3Material = new THREE.MeshBasicMaterial({
    map: planet_3ColorTexture
});

const planet_3 = new THREE.Mesh(
    planet_3Geometry,
    planet_3Material
)

planet_3.position.x = 150
planet_3.position.y = 0
planet_3.position.z = 200

solarSystem.add(planet_3)


// Asteroids belt
const asteroid_beltGeometry = new THREE.Geometry()

for(let i = 0; i < 10000; i++)
{
    const angle1 = Math.random()*Math.PI*2 
    const radius1 = 400 + Math.random() * 200
    const x1 = Math.cos(angle1)*radius1
    const y1 = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : - 1) * 8
    const z1 = Math.sin(angle1)*radius1

    const vertice = new THREE.Vector3(x1, y1, z1)

    asteroid_beltGeometry.vertices.push(vertice)
}



const asteroid_beltMaterial = new THREE.PointsMaterial({
    size: 5,
    map: rockDiffuseAlphaTexture,
    transparent: true,
    depthWrite: false
})

const asteroid_belt = new THREE.Points(asteroid_beltGeometry, asteroid_beltMaterial)


solarSystem.add(asteroid_belt)


/**
 * Missile
 */
let shooldShoot = false

setInterval(function(){
    if(shooldShoot == true && canShoot == true)
    {
        const missile = {}

        missile.mesh = new THREE.Mesh(
            missileGeometry,
            missileMaterial
        )

        missile.mesh.position.x = spaceshipGroup.position.x
        missile.mesh.position.y = spaceshipGroup.position.y
        missile.mesh.position.z = spaceshipGroup.position.z - 2
        missiles.push(missile)

        scene.add(missile.mesh)
        missileSound.volume = 0.2
        missileSound.play()
        missileSound.currentTime = 0

        canShoot = false
        setTimeout(function(){canShoot = true}, 100);
    }
},100)

let canShoot = false

const missiles = []

const missileGeometry = new THREE.BoxBufferGeometry(1, 1, 1)

const missileMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xff0000)
})



/**
 * Mouving stars
 */
// Geometry
const starGeometry = new THREE.Geometry()

for(let i = 0; i < 1000; i++)
{
    const vertice = new THREE.Vector3(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        (-(Math.random()) * 100) + 50
    )
    starGeometry.vertices.push(vertice)
}

// Material
const starMaterial = new THREE.PointsMaterial({
    color: new THREE.Color(0xffffff),
    size: 0.1,
    transparent: true,
    depthWrite: false
})

// Points
const star = new THREE.Points(starGeometry, starMaterial)
star.position.z = 3.5
scene.add(star)



/**
 * Reactor
 */
// Geometry
const reactorGeometry = new THREE.Geometry()

for(let i = 0; i < 1000; i++)
{
    const angle = Math.random()*Math.PI*2 
    const radius = Math.random()*0.3
    
    const x = Math.cos(angle)*radius
    const y = Math.sin(angle)*radius
    const z = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : - 1) * 0.3

    const vertice1 = new THREE.Vector3(x, y, z)

    reactorGeometry.vertices.push(vertice1)
}

// Material
const reactorMaterial = new THREE.PointsMaterial({
    color: new THREE.Color(0xFF9E00),
    size: 0.1,
    transparent: true,
    depthWrite: false
})

// Points
const reactor = new THREE.Points(reactorGeometry, reactorMaterial)
reactor.scale.x /= 0.015
reactor.scale.y /= 0.015
reactor.scale.z /= 0.015
reactor.position.z = - 5

spaceshipGroup.add(reactor)



/**
 * Loop
 */
let gameStart = false

const music = document.querySelector('#space-theme')
const asteroidExplosionSound = document.querySelector('#asteroid_explosion')
const spaceShipExplosionSound = document.querySelector('#spaceship_explosion')
const missileSound = document.querySelector('#missile_sound')
const spaceshipAlert = document.querySelector('#spaceship_alert')

let mute = false

let gameOver = false

let speed = 0.5

let score = 0

let life = 4

let startTime = Date.now()

function timer(time) 
{
    let sec_num = parseInt(time, 10)
    let hours   = Math.floor(sec_num / 3600)
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60)
    let seconds = sec_num - (hours * 3600) - (minutes * 60)
    

    if (hours   < 10) {hours   = "0"+ hours}
    if (minutes < 10) {minutes = "0"+ minutes}
    if (seconds < 10) {seconds = "0"+ seconds}

    return minutes +':'+ seconds
}



const loop = () =>
{
    solarSystem.rotation.y += 0.001

    if(gameStart == true && gameOver == false)
    {
        document.querySelector(".welcome-ctnr").style.display ="none"

        document.querySelector('#life-ctnr').style.display = "flex"
        
        music.play()

        if(mute == true)
        {
            music.volume = 0
        }else{
            music.volume = 0.5
        }

        scene.add(spaceshipGroup)

        // Update timer

        let showTime = document.querySelector("#chronotime")
        let elapsedTime = ((Date.now() - startTime)/1000)
        showTime.textContent = "Time : " + timer(elapsedTime)

        

        let ShowSpeed = document.querySelector("#speed")
        ShowSpeed.textContent ="Speed : " + (speed*2).toFixed(2)

        let showScore = document.querySelector("#score")
        showScore.textContent = "Score : " + score

        

        //Update star
        for(const _vertice of starGeometry.vertices)
        {
            _vertice.z += 0.35

            if(_vertice.z > 30)
            {
                _vertice.z = -40 -(Math.random()*10)
            }
        }
        starGeometry.verticesNeedUpdate = true


        //Update reactor
        for(const _vertice1 of reactorGeometry.vertices)
        {
            _vertice1.z -= 0.5

            if(_vertice1.z < -3)
            {
                _vertice1.z = - 3 + Math.random()*2
            }
        }
        reactorGeometry.verticesNeedUpdate = true


        //Update control
        if(keyboard.up)
        {
            spaceshipGroup.position.y += 0.2
            spaceshipGroup.rotation.x += Math.PI*0.01
            if(spaceshipGroup.rotation.x > Math.PI*0.2)
            {
                spaceshipGroup.rotation.x = Math.PI*0.2
            }
            if(spaceshipGroup.position.y > 20){
                spaceshipGroup.position.y = 20
            }
        }

        if(keyboard.down)
        {
            spaceshipGroup.position.y -= 0.2
            spaceshipGroup.rotation.x -= Math.PI*0.01
            if(spaceshipGroup.rotation.x < -Math.PI*0.2)
            {
                spaceshipGroup.rotation.x = -Math.PI*0.2
            }
            if(spaceshipGroup.position.y < -20){
                spaceshipGroup.position.y = -20
            }
        }

        if(keyboard.right)
        {
            spaceshipGroup.position.x += 0.2
            spaceshipGroup.rotation.z += Math.PI*0.01
            if(spaceshipGroup.rotation.z > Math.PI*0.2)
            {
                spaceshipGroup.rotation.z = +Math.PI*0.2
            }

            if(spaceshipGroup.position.x > 40){
                spaceshipGroup.position.x = 40
            }
        }

        if(keyboard.left)
        {
            spaceshipGroup.position.x -= 0.2
            spaceshipGroup.rotation.z -=Math.PI*0.01
            if(spaceshipGroup.rotation.z < -Math.PI*0.2)
            {
                spaceshipGroup.rotation.z = -Math.PI*0.2
            }

            if(spaceshipGroup.position.x < -40){
                spaceshipGroup.position.x = -40
            }
        }

        if(keyboard.right == false && keyboard.left == false)
        {
            spaceshipGroup.rotation.z = 0
        }

        if(keyboard.up == false && keyboard.down == false)
        {
            spaceshipGroup.rotation.x = 0
        }


        //Life update
        lifeGroup.position.z += 0.5
        lifeGroup.rotation.y += Math.PI*0.01

        //Life respawn
        if(lifeGroup.position.z >30)
        {
            lifeGroup.position.x = (Math.random() - 0.5)*40
            lifeGroup.position.y = (Math.random() - 0.5)*40
            lifeGroup.position.z = - 2000
        }

        if(lifeGroup.position.distanceTo(spaceshipGroup.position) < 7 && life < 4)
        {
            lifes[life].style.display = "block"
            life++
            lifeGroup.position.z = -1000
        }

        //Missile update
        for(let j=0; j<missiles.length; j++)
        {
            missiles[j].mesh.position.z -= 4

            if(missiles[j].mesh.position.z < -800)
            {
                scene.remove(missiles[j].mesh)
                missiles.splice(j, 1)
            }
        }

        speed *= 1.00005

        // Asteroids update
        for(let i=0; i<asteroids.length; i++)
        {
            scene.add(asteroids[i].mesh)

            asteroids[i].mesh.position.z += speed
            asteroids[i].mesh.rotation.y += Math.PI*0.0025

            if(asteroids[i].mesh.position.z > 30)
            {
                asteroids[i].mesh.position.x = (Math.random() - 0.5)*50
                asteroids[i].mesh.position.y = (Math.random() - 0.5)*50
                asteroids[i].mesh.position.z =  -800 - (Math.random()*1000)
            }

            //Collisions
                //asteroids-spaceShip
                if(asteroids[i].mesh.position.distanceTo(spaceshipGroup.position) < asteroids[i].radius + 3.6)
                {
                    spaceshipAlert.volume = 0.4
                    spaceshipAlert.play()

                    asteroids[i].mesh.position.z = -800 - (Math.random()*1000)
                    speed *= 0.5

                    glitchPass.enabled = true
                    setTimeout(function(){glitchPass.enabled = false}, 300);
                    
                    life -= 1
                    lifes[life].style.display = "none"

                    switch(life)
                    {
                        case 0 :
                            gameOver = true
                            shooldShoot = false
                            canShoot = false
                            spaceShipExplosionSound.play()
                            scene.remove(spaceshipGroup)

                            //Delete missiles
                            for(let j=0; j<missiles.length; j++)
                            {
                                scene.remove(missiles[j].mesh)
                                missiles.splice(j, 1)
                                j--
                            }
                            if(gameOver == true)
                            {
                                gameStart = false
                                document.querySelector("#game-over").style.display = "flex"
                            }
                        break;
                    }
                }


                //asteroids-missile
                for(let j=0; j<missiles.length; j++)
                {
                    if(asteroids[i].mesh.position.distanceTo(missiles[j].mesh.position) < asteroids[i].radius + 0.8)
                    {
                        asteroidExplosionSound.play()
                        asteroidExplosionSound.volume = 0.25
                        asteroidExplosionSound.currentTime = 0

                        score++

                        asteroids[i].mesh.position.z = -800 - (Math.random()*1000)

                        scene.remove(missiles[j].mesh)

                        missiles.splice(j, 1)
                        j--
                       
                        speed += 0.025
                    }
                }
        }
    }

    // Render
    effectComposer.render(scene, camera)

    window.requestAnimationFrame(loop)
}

loop()