import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { GlitchPass} from 'three/examples/jsm/postprocessing/GlitchPass.js'
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass.js'
import vertexShader from "./shaders/test/vertex.glsl"
import fragmentShader from "./shaders/test/fragment.glsl"
import ParticulesGalaxy from './assets/textures/circle_05.png'
import RockGalaxy from './assets/images/1.png'
import MoonGalaxy from './assets/images/moon.jpg'
import AsteroidGalaxy from './assets/images/1.jpg'
import reactorGalaxy from './assets/images/3.jpg'
import planet_1Galaxy from './assets/images/16.jpg'
import planet_2Galaxy from './assets/images/48.jpg'
import planet_3Galaxy from './assets/images/49.jpg'
import planet_4Galaxy from './assets/images/34.jpg'
import planet_5Galaxy from './assets/images/18.jpg'
import planet_6Galaxy from './assets/images/17.jpg'
import planet_7Galaxy from './assets/images/27.jpg'
import planet_8Galaxy from './assets/images/40.jpg'
import planet_9Galaxy from './assets/images/49.jpg'
import planet_10Galaxy from './assets/images/41.jpg'
import planet_terre from './assets/images/terre.jpg'




/** 
 * GLTFLoader
 */
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')
const gltfLoader =new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)




/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const ParticulesGalaxyTexture = textureLoader.load(ParticulesGalaxy)
const RockGalaxyTexture = textureLoader.load(RockGalaxy)
const MoonGalaxyTexture = textureLoader.load(MoonGalaxy)
const AsteroidGalaxyTexture = textureLoader.load(AsteroidGalaxy)
const reactorGalaxyTexture = textureLoader.load(reactorGalaxy)
const planet_1GalaxyTexture = textureLoader.load(planet_1Galaxy)
const planet_2GalaxyTexture = textureLoader.load(planet_2Galaxy)
const planet_3GalaxyTexture = textureLoader.load(planet_3Galaxy)
const planet_4GalaxyTexture = textureLoader.load(planet_4Galaxy)
const planet_5GalaxyTexture = textureLoader.load(planet_5Galaxy)
const planet_6GalaxyTexture = textureLoader.load(planet_6Galaxy)
const planet_7GalaxyTexture = textureLoader.load(planet_7Galaxy)
const planet_8GalaxyTexture = textureLoader.load(planet_8Galaxy)
const planet_9GalaxyTexture = textureLoader.load(planet_9Galaxy)
const planet_10GalaxyTexture = textureLoader.load(planet_10Galaxy)
const planet_TerreGalaxyTexture = textureLoader.load(planet_terre)



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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 10000000)

scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setClearColor(0x06031B , 1)
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
document.body.appendChild(renderer.domElement)

//Effect Loader
const effectComposer = new EffectComposer(renderer)
const renderPass = new RenderPass(scene,camera)
effectComposer.addPass(renderPass)
const glitchPass = new GlitchPass()
glitchPass.enabled =false
glitchPass.goWild = true
effectComposer.addPass(glitchPass)


/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
scene.add(ambientLight)

const sunLight = new THREE.DirectionalLight(0xffffff, 1)
sunLight.position.x = 10
sunLight.position.y = 0
sunLight.position.z = 0
scene.add(sunLight)

/**
 * Model
 */

//Moon
const moon = new THREE.Mesh( 
    new THREE.SphereBufferGeometry( 20, 32 ),
    new THREE.MeshMatcapMaterial( {matcap: MoonGalaxyTexture} )
 );
moon.position.z  =-250
moon.position.y  =100
moon.position.x =100
scene.add( moon);

//Big asteroid 
const big_asteroid= new THREE.Mesh( 
    new THREE.SphereBufferGeometry( 20, 32 ),
    new THREE.MeshMatcapMaterial( {matcap: AsteroidGalaxyTexture} )
 );
big_asteroid.position.z  =-600
big_asteroid.position.y  =60
big_asteroid.position.x =-50
scene.add( big_asteroid);

//planet 1 
const planet_1= new THREE.Mesh( 
    new THREE.SphereBufferGeometry( 20, 32 ),
    new THREE.MeshMatcapMaterial( {matcap: planet_1GalaxyTexture} )
 );
planet_1.position.z  =-1100
planet_1.position.y  =60
planet_1.position.x =-250
scene.add( planet_1);

//planet 2
const planet_2= new THREE.Mesh( 
    new THREE.SphereBufferGeometry( 20, 32 ),
    new THREE.MeshMatcapMaterial( {matcap: planet_2GalaxyTexture} )
 );
planet_2.position.z  =-1600
planet_2.position.y  =60
planet_2.position.x =-180
scene.add( planet_2);

//planet 3
const planet_3= new THREE.Mesh( 
    new THREE.SphereBufferGeometry( 20, 32 ),
    new THREE.MeshMatcapMaterial( {matcap: planet_3GalaxyTexture} )
 );
planet_3.position.z  =-2100
planet_3.position.y  =60
planet_3.position.x =-100
scene.add( planet_3);

//planet 4
const planet_4= new THREE.Mesh( 
    new THREE.SphereBufferGeometry( 20, 32 ),
    new THREE.MeshMatcapMaterial( {matcap: planet_4GalaxyTexture} )
 );
planet_4.position.z  =-2600
planet_4.position.y  =60
planet_4.position.x =0
scene.add( planet_4);

//planet 5
const planet_5= new THREE.Mesh( 
    new THREE.SphereBufferGeometry( 20, 32 ),
    new THREE.MeshMatcapMaterial( {matcap: planet_5GalaxyTexture} )
 );
planet_5.position.z  =-3100
planet_5.position.y  =60
planet_5.position.x =50
scene.add( planet_5);

//planet 6
const planet_6= new THREE.Mesh( 
    new THREE.SphereBufferGeometry( 20, 32 ),
    new THREE.MeshMatcapMaterial( {matcap: planet_6GalaxyTexture} )
 );
planet_6.position.z  =-3600
planet_6.position.y  =60
planet_6.position.x =-30
scene.add( planet_6);

//planet 7
const planet_7= new THREE.Mesh( 
    new THREE.SphereBufferGeometry( 20, 32 ),
    new THREE.MeshMatcapMaterial( {matcap: planet_7GalaxyTexture} )
 );
planet_7.position.z  =-4100
planet_7.position.y  =60
planet_7.position.x =70
scene.add( planet_7);

//planet 8
const planet_8= new THREE.Mesh( 
    new THREE.SphereBufferGeometry( 20, 32 ),
    new THREE.MeshMatcapMaterial( {matcap: planet_8GalaxyTexture} )
 );
planet_8.position.z  =-4600
planet_8.position.y  =60
planet_8.position.x =150
scene.add( planet_8);

//planet 9
const planet_9= new THREE.Mesh( 
    new THREE.SphereBufferGeometry( 20, 32 ),
    new THREE.MeshMatcapMaterial( {matcap: planet_9GalaxyTexture} )
 );
planet_9.position.z  =-5100
planet_9.position.y  =60
planet_9.position.x =250
scene.add( planet_9);

//planet 10
const planet_10= new THREE.Mesh( 
    new THREE.SphereBufferGeometry( 20, 32 ),
    new THREE.MeshMatcapMaterial( {matcap: planet_10GalaxyTexture} )
 );
planet_10.position.z  =-5600
planet_10.position.y  =60
planet_10.position.x =50
scene.add( planet_10);

//planet TERRE
const planeet_terre= new THREE.Mesh( 
    new THREE.SphereBufferGeometry( 20, 32 ),
    new THREE.MeshMatcapMaterial( {matcap: planet_TerreGalaxyTexture} )
 );
planeet_terre.position.z  =-6000
planeet_terre.position.y  =60
planeet_terre.position.x =50
scene.add( planeet_terre);



//Load model
const spaceshipGroup = new THREE.Group()
spaceshipGroup.scale.x  =0.1
spaceshipGroup.scale.y  =0.1
spaceshipGroup.scale.z  =0.1
spaceshipGroup.position.z  =-250
spaceshipGroup.rotation.y  =-Math.PI*1
scene.add(spaceshipGroup)



gltfLoader.load(
    'bateau_continue_fin.gltf',
    (gltf)=>{
        console.log('sucess')
        console.log(gltf)

        while(gltf.scene.children.length){
            spaceshipGroup.add(gltf.scene.children[0])
        }
    },
   undefined,
    (error)=>{
        console.log('error')
    }
)
//Particules for spaceship
const reactor = new THREE.Mesh( 
      new THREE.SphereBufferGeometry( 9, 32, 32 ),
      new THREE.MeshBasicMaterial( {map: reactorGalaxyTexture} )
 );
 reactor.position.z  =-150
 reactor.position.y  =1
 reactor.position.x  =-1
scene.add( reactor );

const reactor_left = new THREE.Mesh( 
    new THREE.SphereBufferGeometry( 4, 32, 32 ),
    new THREE.MeshBasicMaterial( {map: reactorGalaxyTexture} )
);
reactor_left.position.z  =-150
reactor_left.position.y  =4
reactor_left.position.x  =-30
scene.add( reactor_left );

const reactor_right = new THREE.Mesh( 
    new THREE.SphereBufferGeometry( 4, 32, 32 ),
    new THREE.MeshBasicMaterial( {map: reactorGalaxyTexture} )
);
reactor_right.position.z  =-150
reactor_right.position.y  =4
reactor_right.position.x  =30
scene.add( reactor_right );

//Life
let lifee = 3;
const x = 0, y = 0;

const heartShape = new THREE.Shape();

heartShape.moveTo( x + 5, y + 5 );
heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

const geometry = new THREE.ShapeGeometry( heartShape );
const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
const mesh_shape = new THREE.Mesh( geometry, material ) ;
mesh_shape.position.z  =-150
mesh_shape.position.y  =110
mesh_shape.position.x  =-217
mesh_shape.rotation.z = -Math.PI*1
scene.add( mesh_shape );

//Life2
const heartShape2 = new THREE.Shape();

heartShape2.moveTo( x + 5, y + 5 );
heartShape2.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
heartShape2.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
heartShape2.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
heartShape2.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
heartShape2.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
heartShape2.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );


const mesh_shape_2 = new THREE.Mesh( 
    new THREE.ShapeGeometry( heartShape2 ),
    new THREE.MeshBasicMaterial( { color: 0xff0000 } )
) ;
mesh_shape_2.position.z  =-150
mesh_shape_2.position.y  =110
mesh_shape_2.position.x  =-187
mesh_shape_2.rotation.z = -Math.PI*1
scene.add( mesh_shape_2 );

//life 3
const heartShape3 = new THREE.Shape();

heartShape3.moveTo( x + 5, y + 5 );
heartShape3.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
heartShape3.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
heartShape3.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
heartShape3.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
heartShape3.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
heartShape3.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );


const mesh_shape_3 = new THREE.Mesh( 
    new THREE.ShapeGeometry( heartShape3 ),
    new THREE.MeshBasicMaterial( { color: 0xff0000 } )
) ;
mesh_shape_3.position.z  =-150
mesh_shape_3.position.y  =110
mesh_shape_3.position.x  =-157
mesh_shape_3.rotation.z = -Math.PI*1
scene.add( mesh_shape_3 );


/**
 * Asteroid
 */

const rainGeometry = new THREE.Geometry()
for(let i = 0; i < 600; i++)
{
    const vertice = new THREE.Vector3(
        (Math.random() - 0.5) * 2000,
        Math.random() * 800,
        (Math.random() - 0.5) * 10000
    )
    rainGeometry.vertices.push(vertice)
}
// Material
const rainMaterial = new THREE.PointsMaterial({
    color: new THREE.Color(0xffffff),
    size: 5,
    alphaMap: RockGalaxyTexture,
    transparent: true,
    depthWrite: false
})
// Points
const rain = new THREE.Points(rainGeometry, rainMaterial)
rain.position.y =-500
rain.position.z =-100
scene.add(rain)

//Sounds
// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add( listener );
const sound = new THREE.Audio( listener );
const audioLoader = new THREE.AudioLoader();
audioLoader.load( './assets/music/1.mp3', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( true );
	sound.setVolume( 1 );
	sound.play();
});
scene.add(sound)



/**
 * Keyboard
 */
const keyboard ={}
keyboard.up =false
keyboard.down =false
keyboard.right =false
keyboard.left =false
keyboard.enter = false


document.addEventListener('keydown', (_event)=>{
    console.log(_event.code)
    switch(_event.code){
        case 'KeyQ':
        case 'ArrowUp':
            keyboard.up = true
            break
        case 'KeyD':
        case 'ArrowLeft':
            keyboard.left = true
            break
        case 'KeyS':
        case 'ArrowDown':
            keyboard.down = true
            break
        case 'KeyA':
        case 'ArrowRight':
            keyboard.right = true
            break
        case 'KeyEnter':
        case 'Enter':
            keyboard.enter=true
            break
        
    }
})
document.addEventListener('keyup', (_event)=>{
    console.log(_event.code)
    switch(_event.code){
        case 'KeyQ':
        case 'ArrowUp':
            keyboard.up = false
            break
        case 'KeyD':
        case 'ArrowLeft':
            keyboard.left = false
            break
        case 'KeyS':
        case 'ArrowDown':
            keyboard.down = false
            break
        case 'KeyA':
        case 'ArrowRight':
            keyboard.right = false
            break 
        case 'KeyEnter':
        case 'Enter':
            keyboard.enter=false
            break
            
    }
})
planet_1.setColor = function(color){
    planet_1.material.color.set(color);
}
function remove(id){
    scene.remove(scene.getObjectByName(id))
}
let play = true
remove(moon)
/**
 * Loop
 */
const loop = () =>
{
    if (play==true){
        window.requestAnimationFrame(loop)
    
        //movement 
            big_asteroid.position.z +=3
            big_asteroid.scale.z  +=0.001
            big_asteroid.scale.y  +=0.001
            big_asteroid.scale.x  +=0.001
        
            planet_1.position.z +=3 
            planet_1.scale.z  +=0.001
            planet_1.scale.y  +=0.001
            planet_1.scale.x  +=0.001

            planet_2.position.z +=3
            planet_2.scale.z  +=0.001
            planet_2.scale.y  +=0.001
            planet_2.scale.x  +=0.001

            planet_3.position.z +=3
            planet_3.scale.z  +=0.001
            planet_3.scale.y  +=0.001
            planet_3.scale.x  +=0.001

            planet_4.position.z +7 
            planet_4.scale.z  +=0.001
            planet_4.scale.y  +=0.001
            planet_4.scale.x  +=0.001

            planet_5.position.z +=7
            planet_5.scale.z  +=0.001
            planet_5.scale.y  +=0.001
            planet_5.scale.x  +=0.001
            
            planet_6.position.z +=7
            planet_6.scale.z  +=0.001
            planet_6.scale.y  +=0.001
            planet_6.scale.x  +=0.001

            planet_7.position.z +=7
            planet_7.scale.z  +=0.001
            planet_7.scale.y  +=0.001
            planet_7.scale.x  +=0.001

            planet_8.position.z +=7
            planet_8.scale.z  +=0.001
            planet_8.scale.y  +=0.001
            planet_8.scale.x  +=0.001

            planet_9.position.z +=7
            planet_9.scale.z  +=0.001
            planet_9.scale.y  +=0.001
            planet_9.scale.x  +=0.001

            planet_10.position.z +=7
            planet_10.scale.z  +=0.001
            planet_10.scale.y  +=0.001
            planet_10.scale.x  +=0.001

            moon.position.z  +=0.01
            moon.position.x  +=0.1
            moon.scale.z  +=0.001
            moon.scale.y  +=0.001
            moon.scale.x  +=0.001

            if( planet_10.position.z >0){
                play = false
            }

            const distance_1 = spaceshipGroup.position.distanceTo( big_asteroid.position);
            const distance_2 = spaceshipGroup.position.distanceTo( planet_1.position);
            const distance_3 = spaceshipGroup.position.distanceTo( planet_2.position);
            const distance_4 = spaceshipGroup.position.distanceTo( planet_3.position);
            const distance_5 = spaceshipGroup.position.distanceTo( planet_4.position);
            const distance_6 = spaceshipGroup.position.distanceTo( planet_5.position);
            const distance_7 = spaceshipGroup.position.distanceTo( planet_6.position);
            const distance_8 = spaceshipGroup.position.distanceTo( planet_7.position);
            const distance_9 = spaceshipGroup.position.distanceTo( planet_8.position);
            const distance_10 = spaceshipGroup.position.distanceTo( planet_9.position);
            const distance_11 = spaceshipGroup.position.distanceTo( planet_10.position);

        // for life 
                console.log(lifee)
                if(distance_1<50){
                    // big_asteroid.visible = false
                    glitchPass.enabled=true
                    setTimeout(() =>{glitchPass.enabled=false},500)
                    big_asteroid.position.z  =-600
                    big_asteroid.position.y  =60
                    big_asteroid.position.z +=7
                    big_asteroid.position.x =-50
                    if(lifee ==3){
                        mesh_shape_3.visible =false
                        lifee -=1
                    }
                    else if(lifee ==2){
                            mesh_shape_2.visible=false
                            lifee -=1
                    } else if(lifee ==1){
                            mesh_shape.visible=false
                            play = false 
                            lifee -=1
                    }
                }
            
        

                if(distance_2<50){
                    glitchPass.enabled=true
                    setTimeout(() =>{glitchPass.enabled=false},500)
                    planet_1.position.z  =-1100
                    planet_1.position.z +=7
                    planet_1.position.y  =50
                    planet_1.position.x =-250
                    if(lifee ==3){
                        mesh_shape_3.visible =false
                        lifee -=1
                    }
                     else if(lifee ==2){
                        lifee -=1
                            mesh_shape_2.visible=false
                    }
                    else if(lifee ==1){
                            mesh_shape.visible=false
                            play = false 
                            lifee -=1
                    }
                }

                if(distance_3<50){ 
                        glitchPass.enabled=true
                        setTimeout(() =>{glitchPass.enabled=false},500)
                        planet_2.position.z  =-1600
                        planet_2.position.z +=7
                        planet_2.position.y  =10
                        planet_2.position.x =-180
                        if(lifee ==3){
                            mesh_shape_3.visible =false
                            lifee -=1
                        }
                        else if(lifee ==2){
                                mesh_shape_2.visible=false
                                lifee -=1
                        } else if(life ==1){
                                mesh_shape.visible=false
                                play = false 
                                lifee -=1
                        }
                    
                }

                if(distance_4<50){
                    glitchPass.enabled=true
                    setTimeout(() =>{glitchPass.enabled=false},500)
                    planet_3.position.z  =-2100
                    planet_3.position.z +=7
                    planet_3.position.y  =40
                    planet_3.position.x =-100
                    if(lifee ==3){
                        mesh_shape_3.visible =false
                        lifee -=1
                    }
                    else if(lifee ==2){
                            mesh_shape_2.visible=false
                            lifee -=1
                    } else if(lifee==1){
                            mesh_shape.visible=false
                            play = false 
                            lifee -=1
                    }
                }

                if(distance_5<50){
                    glitchPass.enabled=true
                    setTimeout(() =>{glitchPass.enabled=false},500)
                    planet_4.position.z  =-2600
                    planet_4.position.z +=7
                    planet_4.position.y  =20
                    planet_4.position.x =0
                    if(lifee == 3){
                        mesh_shape_3.visible =false
                        lifee -=1
                    }
                    else if(lifee==2){
                            mesh_shape_2.visible=false
                            lifee -=1
                    } else if(lifee==1){
                            mesh_shape.visible=false
                            play = false 
                            lifee -=1
                    }
                }

                if(distance_6<50){
                    glitchPass.enabled=true
                    setTimeout(() =>{glitchPass.enabled=false},500)
                    planet_5.position.z  =-3100
                    planet_5.position.y  =70
                    planet_5.position.z +=7
                    planet_5.position.x =50
                    if(lifee ==3){
                        mesh_shape_3.visible =false
                        lifee -=1
                    }
                    else if(lifee ==2){
                        mesh_shape_2.visible=false
                        lifee -=1
                    }else if(lifee ==1){
                            mesh_shape.visible=false
                            play = false 
                            lifee -=1
                    }
                }

                if(distance_7<50){
                    glitchPass.enabled=true
                    setTimeout(() =>{glitchPass.enabled=false},500)
                    planet_6.position.z  =-3600
                    planet_6.position.y  =60
                    planet_6.position.z +=7
                    planet_6.position.x =-30
                    if(lifee==3){
                        mesh_shape_3.visible =false
                        lifee -=1
                    }
                    else if(lifee ==2){
                            mesh_shape_2.visible=false
                            lifee -=1
                    } else if(lifee ==1){
                            mesh_shape.visible=false
                            play = false 
                            lifee -=1
                    }
                }

                if(distance_8<50){
                    glitchPass.enabled=true
                    setTimeout(() =>{glitchPass.enabled=false},500)
                    planet_7.position.z  =-4100
                    planet_7.position.y  =20
                    planet_7.position.z +=7
                    planet_7.position.x =70
                    if(lifee==3){
                        mesh_shape_3.visible =false
                        lifee -=1
                    }
                    else if(lifee==2){
                            mesh_shape_2.visible=false
                            lifee -=1
                    } else if(lifee==1){
                            mesh_shape.visible=false
                            lifee -=1
                            play = false 
                    }
                }

                if(distance_9<50){
                    glitchPass.enabled=true
                    setTimeout(() =>{glitchPass.enabled=false},500)
                    planet_8.position.z  =-4600
                    planet_8.position.y  =30
                    planet_8.position.z +=7
                    planet_8.position.x =150
                    if(lifee==3){
                        mesh_shape_3.visible =false
                        lifee -=1
                    }
                    else if(lifee==2){
                            mesh_shape_2.visible=false
                            lifee -=1
                    } else if(lifee ==1){
                            mesh_shape.vilifee==3
                            play = false 
                    }
                }

                if(distance_10<50){
                    glitchPass.enabled=true
                    setTimeout(() =>{glitchPass.enabled=false},500)
                    planet_9.position.z  =-5100
                    planet_9.position.y  =50
                    planet_9.position.z +=7
                    planet_9.position.x =250
                    if(lifee==3){
                        mesh_shape_3.visible =false
                        lifee -=1
                    }
                    else if(lifee ==2){
                            mesh_shape_2.visible=false
                            lifee -=1
                    } else if(lifee ==1){
                            mesh_shape.visible=false
                            lifee -=1
                            play = false 
                    }
                }
                if(distance_11<50){
                    glitchPass.enabled=true
                    setTimeout(() =>{glitchPass.enabled=false},500)
                    planet_10.position.z  =-5600
                    planet_10.position.y  =10
                    planet_10.position.z +=7
                    planet_10.position.x =50
                    if(lifee==3){
                        mesh_shape_3.visible =false
                        lifee -=1
                    }
                    else if(lifee==2){
                            mesh_shape_2.visible=false
                            lifee -=1
                    } else if(lifee ==1){
                            mesh_shape.visible=false
                            lifee -=1
                            play = false 
                    }
                }
            
        
    //for constrols
        

            if(keyboard.up){
                spaceshipGroup.position.y +=1.5
                reactor.position.y +=0.01
                reactor_left.position.y +=1
                reactor_right.position.y +=1
                reactor.position.y +=1
                reactor.rotation.z +=0.5
                reactor_left.rotation.z +=0.5
                reactor_right.rotation.z +=0.5
            }
            if(keyboard.right){
                spaceshipGroup.position.x +=1.5
                reactor.position.x +=0.01
                reactor_left.position.x +=1
                reactor_right.position.x +=1
                reactor.position.x +=1
                reactor.rotation.z +=0.5
                reactor_left.rotation.z +=0.5
                reactor_right.rotation.z +=0.5
                
            }
            if(keyboard.down){
                spaceshipGroup.position.y -=1.5
                reactor.position.y -=1
                reactor_left.position.y -=1
                reactor_right.position.y -=1
                reactor.rotation.z -=0.5
                reactor_left.rotation.z +=0.5
                reactor_right.rotation.z +=0.5

            }
            if(keyboard.left){
                spaceshipGroup.position.x -=1.5
                reactor.position.x -=0.01
                reactor_left.position.x -=1
                reactor_right.position.x -=1
                reactor.position.x -=1
                reactor.rotation.z -=0.5
                reactor_left.rotation.z +=0.5
                reactor_right.rotation.z +=0.5
                
            }
        
        // Update controls
        // controls.update()

        // Render
        effectComposer.render(scene, camera)
        //Update meteroid
        for(const _vertice of rainGeometry.vertices)
        {
            _vertice.z +=7
            if(_vertice.z > 1000)
            {
                _vertice.z = -500
            }
        }
        rainGeometry.verticesNeedUpdate = true
    }
    else{
        if(lifee ==0){
            const body_clear= document.getElementsByTagName("canvas")[0]
            const h3_clear= document.getElementsByTagName("h3")[0]
            body_clear.style.display="none"
            h3_clear.style.display="none"
        }
        if(lifee >0){
            const body_clear= document.getElementsByTagName("canvas")[0]
            const h1_clear= document.getElementsByTagName("h1")[0]
            body_clear.style.display="none"
            h1_clear.style.display="none"
        }
    }
}

loop()