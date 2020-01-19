import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { DoubleSide } from 'three'
import colorfullImageSource from './assets/images/cake/9.jpg'
import glowImageSource from './assets/images/cake/11.jpg'
import candleImageSource from './assets/images/cake/5.jpg'
import candle_fireImageSource from './assets/images/cake/6.jpg'
import trayImageSource from './assets/images/cake/15.jpg'
import supportImageSource from './assets/images/cake/16.jpg'
import starImageSource from './assets/images/textures/1.png'
import star_2ImageSource from './assets/images/textures/2.png'
import star_3ImageSource from './assets/images/textures/4.png'


/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const colorfullColorTexture = textureLoader.load(colorfullImageSource)
colorfullColorTexture.wrapS = THREE.RepeatWrapping
colorfullColorTexture.wrapT = THREE.RepeatWrapping
colorfullColorTexture.repeat.x = 2
const glowColorTexture = textureLoader.load(glowImageSource)
const candleColorTexture = textureLoader.load(candleImageSource)
const candle_fireColorTexture = textureLoader.load(candle_fireImageSource)
const trayColorTexture = textureLoader.load(trayImageSource)
const supportColorTexture = textureLoader.load(supportImageSource)
const starColorTexture = textureLoader.load(starImageSource)
const star_2ColorTexture = textureLoader.load(star_2ImageSource)
const star_3ColorTexture = textureLoader.load(star_3ImageSource)



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
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0x333333, 0.4)
scene.add(ambientLight)



const light_fire = new THREE.PointLight( 0xffffff, 1, 100 );
light_fire.position.set( -17, 15, -5 );
scene.add( light_fire );

const light_fire_2 = new THREE.PointLight( 0xffffff, 1, 100 );
light_fire_2.position.set( -1, 5, 8 );
scene.add( light_fire_2 );
/**
 * 3
 */

const threee = new THREE.Group()
threee.position.z =1
threee.position.x =1

scene.add(threee)
const three = new THREE.Mesh( 
      new THREE.TorusGeometry( 10, 3, 16, 100,4 ),
    new THREE.MeshStandardMaterial( { 
        map: glowColorTexture,
        side: THREE.DoubleSide
     })
 ); 
 three.rotation.z = 3.5
 three.rotation.x = 5
 three.position.x = -8
 three.position.y = -1.2
 three.rotation.x = 8
threee.add(three)

//three_middle
const three_middle = new THREE.Mesh( 
    new THREE.TorusGeometry( 10, 3, 16, 100,4 ),
    new THREE.MeshStandardMaterial( { 
        map: glowColorTexture,
        side: THREE.DoubleSide
    })
);
three_middle.position.x = 3.5
three_middle.position.z = 12
three_middle.position.y = -1.8
three_middle.rotation.z = 4.5
three_middle.rotation.x = 1.60
threee.add(three_middle)

//zero

const zero = new THREE.Mesh( 
    new THREE.TorusGeometry( 8, 3, 16, 100 ),
    new THREE.MeshStandardMaterial( { map : colorfullColorTexture} )
);
zero.position.x = 20
zero.position.y = -1.8
zero.position.z = -5
zero.rotation.z =4.5
zero.rotation.x =1.6
threee.add( zero );


//Candle


const Candle_1 = new THREE.Mesh( 
    new THREE.CylinderGeometry( 1, 1, 4, 8 ),
    new THREE.MeshBasicMaterial( {map : candleColorTexture} )
 );
Candle_1.position.x = -1
Candle_1.position.y = 2
Candle_1.position.z = 8
threee.add( Candle_1 );

const fire_candle = new THREE.Mesh( 
    new THREE.SphereBufferGeometry( 1, 3, 7,0,6.3,0,3.1 ),
    new THREE.MeshBasicMaterial( {map: candle_fireColorTexture} )
);
fire_candle.position.y = 5
fire_candle.position.x = -1
fire_candle.position.z = 8

threee.add( fire_candle );

//candle_2
const Candle_ = new THREE.Mesh( 
    new THREE.CylinderGeometry( 1, 1, 4, 8 ),
    new THREE.MeshBasicMaterial( {map : candleColorTexture} )
 );
Candle_.position.x = -17
Candle_.position.y = 4
Candle_.position.z = -5
threee.add( Candle_ );

const fire_candle_2 = new THREE.Mesh( 
    new THREE.SphereBufferGeometry( 1, 3, 7,0,6.3,0,3.1 ),
    new THREE.MeshBasicMaterial( {map: candle_fireColorTexture} )
);
fire_candle_2.position.y = 7
fire_candle_2.position.x = -17
fire_candle_2.position.z = -5

threee.add( fire_candle_2 );
const threeee = new THREE.Group()
threeee.position.z =26
threeee.position.x =25
threeee.position.y =-2

scene.add(threeee)
const Candle_3 = new THREE.Mesh( 
    new THREE.CylinderGeometry( 1, 1, 4, 8 ),
    new THREE.MeshBasicMaterial( {map : candleColorTexture} )
 );
Candle_3.position.x = -17
Candle_3.position.y = 4
Candle_3.position.z = -5
threeee.add( Candle_3 );

const fire_candle_3 = new THREE.Mesh( 
    new THREE.SphereBufferGeometry( 1, 3, 7,0,6.3,0,3.1 ),
    new THREE.MeshBasicMaterial( {map: candle_fireColorTexture} )
);
fire_candle_3.position.y = 7
fire_candle_3.position.x = -17
fire_candle_3.position.z = -5

threeee.add( fire_candle_3 );

//tray
const tray = new THREE.Mesh( 
    new THREE.CircleGeometry( 30, 32 ),
    new THREE.MeshBasicMaterial( { map: trayColorTexture, side: THREE.DoubleSide} ),
 );
 tray.rotation.x = -Math.PI*0.5
 tray.position.y =-5
 tray.position.x =5
scene.add( tray );

const cake = new THREE.Mesh( 
    new THREE.CylinderBufferGeometry( 5, 2, 2, 32 ),
    new THREE.MeshBasicMaterial( {map :colorfullColorTexture } )
);
cake.position.z =14
cake.position.x =25
cake.position.y =-5
scene.add(cake)

const candleMainGeometry = new THREE.CylinderGeometry(0.1,0.1,2)
const candleMainMaterial = new THREE.MeshStandardMaterial()
let angle = 0
const particlesGeometry = new THREE.Geometry
const candllle = new THREE.Group()
candllle.position.z =14
candllle.position.x =25
candllle.position.y =-4

scene.add(candllle)
for (let index = 0; index < 28; index++) {
    
    const candleMain = new THREE.Mesh(
        candleMainGeometry,
        candleMainMaterial
    )
    candleMain.position.x = Math.sin(angle)*4
    candleMain.position.z = Math.cos(angle)*4
    candleMain.position.y = 0.5
    candllle.add(candleMain)
    const vertice = new THREE.Vector3(
        Math.sin(angle)*8,
        0.75,
        Math.cos(angle)*8
        )
    particlesGeometry.vertices.push(vertice)
    angle += (Math.PI*2)/28
    const candleLight = new THREE.PointLight(0xFFFFFF,1,5)
    candleLight.position.z = candleMain.position.z
    candleLight.position.x = candleMain.position.x
    candleLight.position.y = 1
    candllle.add(candleLight)

}


const points = [];
for ( let i = 0; i < 10; i ++ ) {
	points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
}
let geometry = new THREE.LatheBufferGeometry( points );
let material = new THREE.MeshBasicMaterial( { map: supportColorTexture, side: THREE.DoubleSide } );
let lathe = new THREE.Mesh( geometry, material );
lathe.rotation.x=-Math.PI*1
lathe.position.y=-16
lathe.position.x=6
scene.add( lathe );


//rain
// Geometry
const rainGeometry = new THREE.Geometry()
let textureofglow = ""
for(let i = 0; i < 100000; i++)
{
    switch (Math.round(Math.random()*2)){
        case 0 :
            textureofglow = starColorTexture
        break
        case 1 :
            textureofglow = star_2ColorTexture
        break
        default : 
            textureofglow = star_3ColorTexture
        break
    }
    const vertice = new THREE.Vector3(
        (Math.random() - 0.5) * 10000,
        Math.random() * 20,
        (Math.random() - 0.5) * 100
    )
    rainGeometry.vertices.push(vertice)
}
// Material
const rainMaterial = new THREE.PointsMaterial({
    color: new THREE.Color(0xC9FFFD),
    size: 1,
    alphaMap: textureofglow,
    transparent: true,
    depthWrite: false
});
// Points
const rain = new THREE.Points(rainGeometry, rainMaterial)
scene.add(rain)


/**
 * Loop
 */
const loop = () =>
{
    window.requestAnimationFrame(loop)
    fire_candle.rotation.y += 0.01
    fire_candle_2.rotation.y += 0.01
    fire_candle_3.rotation.y += 0.01
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)
   // Update rain
    for(const _vertice of rainGeometry.vertices)
    {
        _vertice.y -= 0.02
        if(_vertice.y < 0)
        {
            _vertice.y = 20
        }
    }
    rainGeometry.verticesNeedUpdate = true
}

loop()