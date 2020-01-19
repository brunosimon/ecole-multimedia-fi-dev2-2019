import * as THREE from 'three'
import { FlyControls} from 'three/examples/jsm/controls/FlyControls.js'
import { Mesh } from 'three'
import buildingColorImageSource from './assets/images/building/1.jpg'
import building_2ColorImageSource from './assets/images/building/2.jpg'
import building_3ColorImageSource from './assets/images/building/2.png'
import building_4ColorImageSource from './assets/images/building/3.png'
import building_5ColorImageSource from './assets/images/building/4.png'
import building_6ColorImageSource from './assets/images/building/5.png'
import roadColorImageSource from './assets/images/road/1.jpg'
import grassColorImageSource from './assets/images/grass/1.jpg'
import brickColorImageSource from './assets/images/bricks/ambientOcclusion.jpg'
import bridgeColorImageSource from './assets/images/bricks/gloss.jpg'
import stadiumColorImageSource from './assets/images/loisir/foot.jpg'
import footColorImageSource from './assets/images/loisir/2_c.jpg'
import lakeColorImageSource from './assets/images/matcaps/6.jpg'
import road_everythingColorImageSource from './assets/images/Road/2.jpg'
import road_everything_2ColorImageSource from './assets/images/Road/3.jpg'
import road_everything_3ColorImageSource from './assets/images/Road/4.jpg'
import road_everything_4ColorImageSource from './assets/images/Road/5.jpg'
import road_everything_5ColorImageSource from './assets/images/Road/6.jpg'
import tunnelColorImageSource from './assets/images/bricks/bump.jpg'
import tunnel_circleColorImageSource from './assets/images/bricks/ambientOcclusion.jpg'


/**
 * Texture
 */

const textureLoader = new THREE.TextureLoader()
const buildingColorTexture = textureLoader.load(buildingColorImageSource)
const building_2ColorTexture = textureLoader.load(building_2ColorImageSource)
const building_3ColorTexture = textureLoader.load(building_3ColorImageSource)
const building_4ColorTexture = textureLoader.load(building_4ColorImageSource)
const building_5ColorTexture = textureLoader.load(building_5ColorImageSource)
const building_6ColorTexture = textureLoader.load(building_6ColorImageSource)
const roadColorTexture = textureLoader.load(roadColorImageSource)
const grassColorTexture = textureLoader.load(grassColorImageSource)
const brickColorTexture = textureLoader.load(brickColorImageSource)
const bridgeColorTexture = textureLoader.load(bridgeColorImageSource)
const stadiumColorTexture = textureLoader.load(stadiumColorImageSource)
stadiumColorTexture.wrapS = THREE.RepeatWrapping
stadiumColorTexture.wrapT = THREE.RepeatWrapping
stadiumColorTexture.repeat.x = 4
stadiumColorTexture.repeat.y = 4
const footColorTexture = textureLoader.load(footColorImageSource)
const lakeColorTexture = textureLoader.load(lakeColorImageSource)
const road_everythingColorTexture = textureLoader.load(road_everythingColorImageSource)
road_everythingColorTexture.wrapS = THREE.RepeatWrapping
road_everythingColorTexture.wrapT = THREE.RepeatWrapping
road_everythingColorTexture.repeat.x = 4
road_everythingColorTexture.repeat.y = 4
const road_everything_2ColorTexture = textureLoader.load(road_everything_2ColorImageSource)
const road_everything_3ColorTexture = textureLoader.load(road_everything_3ColorImageSource)
const road_everything_4ColorTexture = textureLoader.load(road_everything_4ColorImageSource)
road_everything_4ColorTexture.wrapS = THREE.RepeatWrapping
road_everything_4ColorTexture.wrapT = THREE.RepeatWrapping
road_everything_4ColorTexture.repeat.x = 4
road_everything_4ColorTexture.repeat.y = 4
const road_everything_5ColorTexture = textureLoader.load(road_everything_5ColorImageSource)
const tunnelColorTexture = textureLoader.load(tunnelColorImageSource)
const tunnel_circleColorTexture = textureLoader.load(tunnel_circleColorImageSource)
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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 300)
camera.position.z = 50
camera.position.y = 50

scene.add(camera)
 
/**
  * Lights
*/
const pointLight = new THREE.PointLight(0xffffff, 3, 200)
pointLight.position.x = 100
pointLight.position.y = 100
pointLight.position.z = 50
scene.add(pointLight)


/**
 * City 
 */
 const material = new THREE.MeshStandardMaterial({
     roughness:0.3,
      metalness:0.6
})
 //floor
 const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100, 1, 1),
    material
 )
 floor.rotation.x =-Math.PI *0.5
 scene.add(floor)
 

 //Park
 const park = new THREE.Mesh(
    new THREE.PlaneGeometry(45, 45, 1, 1),
    new THREE.MeshBasicMaterial({ map: grassColorTexture})
 )
 park.rotation.x =-Math.PI *0.5
 park.position.x =28
 park.position.z = -27
 park.position.y = 1
 scene.add(park)

 const lack = new THREE.Mesh( 
    new THREE.CircleGeometry( 10, 32 ),
    new THREE.MeshMatcapMaterial( { matcap : lakeColorTexture } ) 
);
lack.position.x= 28
lack.position.z = -27
lack.position.y = 1.2
lack.rotation.x = -Math.PI*0.5
scene.add( lack );

const lack_2 = new THREE.Mesh( 
    new THREE.CircleGeometry( 5, 32 ),
    new THREE.MeshMatcapMaterial( { matcap : lakeColorTexture } ) 
);
lack_2.position.x= 28
lack_2.position.z = -37
lack_2.position.y = 1.2
lack_2.rotation.x = -Math.PI*0.5
scene.add( lack_2 );

const rock = new THREE.Mesh(
    new THREE.IcosahedronGeometry(2, 0),
    new THREE.MeshBasicMaterial({ color : 0XB3B3B3})
 )
 rock.position.y = 1
 rock.position.x = 34
 rock.position.z = -37
 scene.add(rock)

 const rock_2 = new THREE.Mesh(
    new THREE.IcosahedronGeometry(2, 0),
    new THREE.MeshBasicMaterial({ color : 0XB3B3B3})
 )
 rock_2.position.y = 1
 rock_2.position.x = 22
 rock_2.position.z = -37
 scene.add(rock_2)

 //wood

 //first three
 const Wood = new THREE.Group()
 Wood.position.x =10
 Wood.position.z =-10
scene.add(Wood)

 const wood = new THREE.Mesh(
    new THREE.CylinderGeometry(1, 1, 5, 32),
    new THREE.MeshBasicMaterial({ color :0x664515 })
 )
 wood.position.y =3
Wood.add(wood)

const leef = new THREE.Mesh(
    new THREE.IcosahedronGeometry(3, 0),
    new THREE.MeshBasicMaterial({ color : 0X1E8336})
 )
 leef.position.y = 8
Wood.add(leef)

//second three
const wood_2 = new THREE.Group()
wood_2.position.x =48
wood_2.position.z =-10
scene.add(wood_2)

const woood_2 = new THREE.Mesh(
   new THREE.CylinderGeometry(1, 1, 5, 32),
   new THREE.MeshBasicMaterial({ color :0x664515 })
)
woood_2.position.y =3
wood_2.add(woood_2)

const leef_2 = new THREE.Mesh(
   new THREE.IcosahedronGeometry(3, 0),
   new THREE.MeshBasicMaterial({ color : 0X1E8336})
)
leef_2.position.y = 8
wood_2.add(leef_2)

// Stade
const Stade= new THREE.Group()
Stade.position.x =-28
Stade.position.z =-27
Stade.position.y= 3
scene.add(Stade)

const stade = new THREE.Mesh( 
    new THREE.CylinderBufferGeometry( 10, 20, 10, 32, 8, true ),
    new THREE.MeshBasicMaterial( {color: 0xFFFFFF,  side: THREE.DoubleSide} )
 );
 stade.rotation.x = -Math.PI*1
Stade.add( stade );

const stade_2 = new THREE.Mesh( 
    new THREE.CylinderBufferGeometry( 9, 19, 10, 32, 8, true ),
    new THREE.MeshBasicMaterial( {map : stadiumColorTexture, side: THREE.DoubleSide} )
 );
 stade_2.rotation.x = -Math.PI*1
Stade.add( stade_2 );

const circle_stade = new THREE.Mesh( 
    new THREE.CircleGeometry( 12, 32 ),
    new THREE.MeshBasicMaterial( { map : footColorTexture } ) 
);
circle_stade.position.x= -28
circle_stade.position.z = -27
circle_stade.position.y = 1
circle_stade.rotation.x = -Math.PI*0.5
scene.add( circle_stade );

const espace_stadium_2 = new THREE.Mesh(
    new THREE.PlaneGeometry(45, 45, 1, 1),
    new THREE.MeshBasicMaterial({ map: road_everything_4ColorTexture})
 )
 espace_stadium_2.rotation.x =-Math.PI *0.5
 espace_stadium_2.position.x =-27
 espace_stadium_2.position.z = -27
 espace_stadium_2.position.y = 0.2
 scene.add(espace_stadium_2)



const door = new THREE.Mesh( 
    new THREE.CylinderBufferGeometry( 5, 1, 6, 8,1, true, 0,3.5 ),
    new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide} )
);
door.rotation.x =-Math.PI *0.5
door.rotation.z =-Math.PI *1
door.rotation.y = -Math.PI*1.5
door.position.x = -27
door.position.z = -11
door.position.y = 1.2
scene.add( door );

const door_2 = new THREE.Mesh( 
    new THREE.CylinderBufferGeometry( 4.8, 1, 6, 8,1, true, 0,3.4 ),
    new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide} )
);
door_2.rotation.x =-Math.PI *0.5
door_2.rotation.z =-Math.PI *1
door_2.rotation.y = -Math.PI*1.5
door_2.position.x = -27
door_2.position.z = -11
door_2.position.y = 0.9
scene.add( door_2 );
 //Fence
 const fence = new THREE.Mesh(
    new THREE.BoxGeometry(45, 1, 3, 1, 1, 1),
    new THREE.MeshBasicMaterial({ map : brickColorTexture })
 )

fence.rotation.x = -Math.PI*0.5
fence.position.x = 28
fence.position.z = -5
fence.position.y = 2
 scene.add(fence)
 

const fence_3 = new THREE.Mesh(
    new THREE.BoxGeometry(45, 1, 3, 1, 1, 1),
    new THREE.MeshBasicMaterial({ map : brickColorTexture })
)

fence_3.rotation.z = -Math.PI *0.5
fence_3.rotation.x = -Math.PI *0.5
fence_3.position.x = 6
fence_3.position.z = -28
fence_3.position.y = 2
 scene.add(fence_3)




//Road
const road = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 100, 1, 1),
    new THREE.MeshBasicMaterial({ map : roadColorTexture})
 )
 road.position.y =0.5
 road.position.x =0.5
 road.rotation.x =-Math.PI *0.5
 scene.add(road)

 const road_2 = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 100, 1, 1),
    new THREE.MeshBasicMaterial({ map : roadColorTexture})
 )
 road_2.position.y =0.7
 road_2.position.x =0.5
 road_2.rotation.z = -Math.PI *0.5
 road_2.rotation.x = -Math.PI *0.5
 scene.add(road_2)

 const axesHelper = new THREE.AxesHelper( 5 );
 scene.add( axesHelper );

 const crossway = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 1.2, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xFFFFFF})
 )
 crossway.rotation.x =-Math.PI *0.5
 crossway.rotation.z =-Math.PI *0.5
 crossway.position.x =4
 crossway.position.z = 8
 crossway.position.y = 0.6
 scene.add(crossway)

 const crossway_1 = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 1.2, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xFFFFFF})
 )
 crossway_1.rotation.x =-Math.PI *0.5
 crossway_1.rotation.z =-Math.PI *0.5
 crossway_1.position.x =0.8
 crossway_1.position.z = 8
 crossway_1.position.y = 0.6
 scene.add(crossway_1)

 const crossway_2 = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 1.2, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xFFFFFF})
 )
 crossway_2.rotation.x =-Math.PI *0.5
 crossway_2.rotation.z =-Math.PI *0.5
 crossway_2.position.x =-3
 crossway_2.position.z = 8
 crossway_2.position.y = 0.6
 scene.add(crossway_2)



 //tunnel 

var tunnel = new THREE.Mesh( 
    new THREE.CylinderBufferGeometry( 7, 7, 2, 8,1,true,0,3.1 ),
    new THREE.MeshBasicMaterial( {map: tunnelColorTexture, side: THREE.DoubleSide} )
);
tunnel.position.z =49
tunnel.position.x =0.6
tunnel.rotation.x =-Math.PI *0.5
tunnel.rotation.z =-Math.PI *1
tunnel.rotation.y = -Math.PI*1.5
scene.add(tunnel)

const circle_tunnel = new THREE.Mesh( 
    new THREE.CircleBufferGeometry( 7, 32, 0, 3.1 ),
    new THREE.MeshBasicMaterial( { map : tunnel_circleColorTexture, side : THREE.DoubleSide} )

 );
 circle_tunnel.position.z = 50
 circle_tunnel.position.x = 0.6
scene.add( circle_tunnel );


 //street_lamp
 //1e lamp
 const LAMP_street = new THREE.Group()
 LAMP_street.position.x = -10
 LAMP_street.position.z = -7

scene.add(LAMP_street)

const street_lamp = new THREE.Mesh(
    new THREE.CylinderGeometry( 0.3, 0.3, 5, 32 ),
    new THREE.MeshBasicMaterial( {color: 0xFFFFFF} )
      );
street_lamp.position.y = 3
LAMP_street.add( street_lamp );

const street_lamp_horizontal = new THREE.Mesh(
    new THREE.CylinderGeometry( 0.3, 0.3, 5, 32 ),
    new THREE.MeshBasicMaterial( {color: 0x000000} )
      );
street_lamp_horizontal.position.y = 6
street_lamp_horizontal.position.x = 0
street_lamp_horizontal.position.z = 1
street_lamp_horizontal.rotation.x = 20
// street_lamp_horizontal.rotation.x = -Math.random*0.2
LAMP_street.add( street_lamp_horizontal );


const lamp = new THREE.Mesh( 
    new THREE.SphereBufferGeometry( 0.5, 32, 32 ),
    new THREE.MeshBasicMaterial( {color: 0xE50000} )
 );
lamp.position.z = 3
lamp.position.y = 6.3
LAMP_street.add( lamp );

const lamp_2 = new THREE.Mesh( 
    new THREE.SphereBufferGeometry( 0.5, 32, 32 ),
    new THREE.MeshBasicMaterial( {color: 0xE56F00} )
 );
lamp_2.position.z = 3
lamp_2.position.y = 5.6
LAMP_street.add( lamp_2 );

const lamp_3 = new THREE.Mesh( 
    new THREE.SphereBufferGeometry( 0.5, 32, 32 ),
    new THREE.MeshBasicMaterial( {color: 0x0AB901} )
 );
lamp_3.position.z = 3
lamp_3.position.y = 4.9
LAMP_street.add( lamp_3 );

//2e lamp

const LAMp_street = new THREE.Group()
LAMp_street.position.x = 10
LAMp_street.position.z = 6
LAMp_street.rotation.y = -Math.PI *1

scene.add(LAMp_street)

const street_lamp_3 = new THREE.Mesh(
   new THREE.CylinderGeometry( 0.3, 0.3, 5, 32 ),
   new THREE.MeshBasicMaterial( {color: 0xFFFFFF} )
     );
street_lamp_3.position.y = 3
LAMp_street.add( street_lamp_3 );

const street_lamp_horizontal_1 = new THREE.Mesh(
   new THREE.CylinderGeometry( 0.3, 0.3, 5, 32 ),
   new THREE.MeshBasicMaterial( {color: 0x000000} )
     );
street_lamp_horizontal_1.position.y = 6
street_lamp_horizontal_1.position.x = 0
street_lamp_horizontal_1.position.z = 1
street_lamp_horizontal_1.rotation.x = 20
// street_lamp_horizontal.rotation.x = -Math.random*0.2
LAMp_street.add( street_lamp_horizontal_1 );


const lamp4 = new THREE.Mesh( 
   new THREE.SphereBufferGeometry( 0.5, 32, 32 ),
   new THREE.MeshBasicMaterial( {color: 0xE50000} )
);
lamp4.position.z = 3
lamp4.position.y = 6.3
LAMp_street.add( lamp4 );

const lamp_5 = new THREE.Mesh( 
   new THREE.SphereBufferGeometry( 0.5, 32, 32 ),
   new THREE.MeshBasicMaterial( {color: 0xE56F00} )
);
lamp_5.position.z = 3
lamp_5.position.y = 5.6
LAMp_street.add( lamp_5 );

const lamp_6 = new THREE.Mesh( 
   new THREE.SphereBufferGeometry( 0.5, 32, 32 ),
   new THREE.MeshBasicMaterial( {color: 0x0AB901} )
);
lamp_6.position.z = 3
lamp_6.position.y = 4.9
LAMp_street.add( lamp_6 );


//Car 
const car_principal = new THREE.Group()
car_principal.position.x = 0.7
car_principal.position.z = 0.4
car_principal.position.y = -0.3
car_principal.scale.z = 1
car_principal.scale.x = 0.7
scene.add(car_principal)

const car_middle = new THREE.Mesh( 
    new THREE.BoxBufferGeometry( 4, 2, 4 ),
    new THREE.MeshBasicMaterial( {color: 0x006CBA} )
 );
 car_middle.position.z =28
 car_middle.position.x =3
 car_middle.position.y=2.4
 car_principal.add( car_middle );

const car_top = new THREE.Mesh( 
    new THREE.BoxBufferGeometry( 2, 1, 4 ),
    new THREE.MeshBasicMaterial( {color: 0x929292} )
 );
 car_top.position.z =28
 car_top.position.x =3
 car_top.position.y=3.5
 car_principal.add( car_top );

const car_top_front = new THREE.Mesh( 
    new THREE.BoxBufferGeometry( 2, 2, 4 ),
    new THREE.MeshBasicMaterial( {color: 0x929292} )
 );
 car_top_front.position.z =27
 car_top_front.position.x =3
 car_top_front.position.y=2.5
 car_principal.add( car_top_front );


const valve_top_left = new THREE.Mesh( 
    new THREE.CylinderBufferGeometry( 0.7, 0.7, 0.5, 18 ),
    new THREE.MeshBasicMaterial( {color: 0x929292} )
);
valve_top_left.position.z = 26
valve_top_left.position.y = 1.5
valve_top_left.position.x = 1
valve_top_left.rotation.x = 4.7
valve_top_left.rotation.z = 4.7
car_principal.add( valve_top_left );

const valve_bottom_left = new THREE.Mesh( 
    new THREE.CylinderBufferGeometry( 0.7, 0.7, 0.5, 18 ),
    new THREE.MeshBasicMaterial( {color: 0x929292} )
);
valve_bottom_left.position.z = 29.7
valve_bottom_left.position.y = 1.5
valve_bottom_left.position.x = 1
valve_bottom_left.rotation.x = 4.7
valve_bottom_left.rotation.z = 4.7
car_principal.add( valve_bottom_left );

const valve_bottom_right = new THREE.Mesh( 
    new THREE.CylinderBufferGeometry( 0.7, 0.7, 0.5, 18 ),
    new THREE.MeshBasicMaterial( {color: 0x929292} )
);
valve_bottom_right.position.z = 26
valve_bottom_right.position.y = 1.5
valve_bottom_right.position.x = 5
valve_bottom_right.rotation.x = 4.7
valve_bottom_right.rotation.z = 4.7
car_principal.add( valve_bottom_right );

const valve_top_right = new THREE.Mesh( 
    new THREE.CylinderBufferGeometry( 0.7, 0.7, 0.5, 18 ),
    new THREE.MeshBasicMaterial( {color: 0x929292} )
);
valve_top_right.position.z = 29.7
valve_top_right.position.y = 1.5
valve_top_right.position.x = 5
valve_top_right.rotation.x = 4.7
valve_top_right.rotation.z = 4.7
car_principal.add( valve_top_right );


const lamp_car = new THREE.Mesh( 
    new THREE.SphereBufferGeometry( 0.2, 32, 32 ),
    new THREE.MeshBasicMaterial( {color: 0xE50000} )
 );
lamp_car.position.z = 30.1
lamp_car.position.x = 2
lamp_car.position.y = 2
car_principal.add( lamp_car );

const lamp_car_left = new THREE.Mesh( 
    new THREE.SphereBufferGeometry( 0.2, 32, 32 ),
    new THREE.MeshBasicMaterial( {color: 0xE50000} )
 );
lamp_car_left.position.z = 30.1
lamp_car_left.position.x = 4
lamp_car_left.position.y = 2
car_principal.add( lamp_car_left );

const lamp_car_top = new THREE.Mesh( 
    new THREE.SphereBufferGeometry( 0.2, 32, 32 ),
    new THREE.MeshBasicMaterial( {color: 0xFF7700} )
 );
lamp_car_top.position.z = 26
lamp_car_top.position.x = 4.4
lamp_car_top.position.y = 2
car_principal.add( lamp_car_top );

const lamp_car_top_left = new THREE.Mesh( 
    new THREE.SphereBufferGeometry( 0.2, 32, 32 ),
    new THREE.MeshBasicMaterial( {color: 0XFF7700} )
 );
lamp_car_top_left.position.z = 26
lamp_car_top_left.position.x = 1.7
lamp_car_top_left.position.y = 2
car_principal.add( lamp_car_top_left );

 //Building

 const espace_bulding_1 = new THREE.Mesh(
    new THREE.PlaneGeometry(45, 45, 1, 1),
    new THREE.MeshBasicMaterial({ map: road_everything_2ColorTexture})
 )
 espace_bulding_1.rotation.x =-Math.PI *0.5
 espace_bulding_1.position.x =-27
 espace_bulding_1.position.z = 27
 espace_bulding_1.position.y = 0.2
 scene.add(espace_bulding_1)


 const espace_bulding_2 = new THREE.Mesh(
    new THREE.PlaneGeometry(45, 45, 1, 1),
    new THREE.MeshBasicMaterial({ map: road_everything_2ColorTexture})
 )
 espace_bulding_2.rotation.x =-Math.PI *0.5
 espace_bulding_2.position.x =27
 espace_bulding_2.position.z = 27
 espace_bulding_2.position.y = 0.2
 scene.add(espace_bulding_2)


 const BuilDing = new THREE.Group()
 BuilDing.position.x = 26
 BuilDing.position.z = 26 

scene.add(BuilDing)

const buildingGeometry = new THREE.BoxGeometry(1,1,1,1,1,1)
// const roofBuildingGeometry = new THREE.PlaneGeometry(1,1,1,1)
buildingGeometry.translate(0,0.5,0)

for (let j=0; j<50; j++){

    let textureofbuilding = ""
    switch (Math.round(Math.random()*4)){
        case 0 :
            textureofbuilding = building_3ColorTexture
        break
        case 1 : 
            textureofbuilding = building_4ColorTexture
        break
        case 2 : 
        textureofbuilding = building_5ColorTexture
        break
        case 3 : 
        textureofbuilding = building_6ColorTexture
        break
        default:
            textureofbuilding = building_4ColorTexture
        break
    }
    const building = new THREE.Mesh(
        buildingGeometry,
        new THREE.MeshBasicMaterial({ map : textureofbuilding })
    )
    building.position.x = (Math.random()-0.5)*35
    building.position.z = (Math.random()-0.5)*35
    building.scale.x = 2 + Math.random() *6
    building.scale.z = 2 + Math.random() *6
    building.scale.y = 2 + Math.random() *40
    // const roofBuilding = new THREE.Mesh(
    //     roofBuildingGeometry,
    //     new THREE.MeshBasicMaterial({ color : 0xffffff })
    // )
    // roofBuilding.position.x =building.position.x 
    // roofBuilding.position.z =building.position.z 
    // roofBuilding.position.y =building.position.y +10 
    
 
    // scene.add(roofBuilding)    
    BuilDing.add(building)
}

const BuilDing_2 = new THREE.Group()
 BuilDing_2.position.x = -25
 BuilDing_2.position.z = 26 

scene.add(BuilDing_2)

const buildingGeometry_2 = new THREE.BoxGeometry(1,1,1,1,1,1)
buildingGeometry_2.translate(0,0.5,0)

for (let j=0; j<80; j++){
    let textureofbuildingg = ""
    switch (Math.round(Math.random()*3)){
        case 0 :
            textureofbuildingg = building_3ColorTexture
        break
        case 1 : 
            textureofbuildingg = building_4ColorTexture
        break
        case 2 : 
        textureofbuildingg = building_5ColorTexture
        break
        default:
            textureofbuildingg = building_4ColorTexture
        break
    }
    const building_2 = new THREE.Mesh(
        buildingGeometry_2,
        new THREE.MeshBasicMaterial({ map : textureofbuildingg})
    )
    building_2.position.x = (Math.random()-0.5)*35
    building_2.position.z = (Math.random()-0.5)*35
    building_2.scale.x = 2 + Math.random() *5
    building_2.scale.z = 2 + Math.random() *5
    building_2.scale.y = 2 + Math.random() *35

    BuilDing_2.add(building_2)
}
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)
renderer.setClearColor(0x008AD1, 0.2)
/**
 * Fly controls
 */
// const controls = new OrbitControls(camera, renderer.domElement)
// controls.enableDamping = true
const controls = new FlyControls(camera, renderer.domElement)
controls.movementSpeed = 10
controls.domElemet = renderer.domElement
controls.rollSpeed = 1.2


/**
 * Loop
 */
let clock = new THREE.Clock ()
const loop = () =>
{
    let delta = clock.getDelta()
    window.requestAnimationFrame(loop)

    controls.update(delta)
    // Render
    car_principal.position.z -= 0.1

    renderer.render(scene, camera)
    if(car_principal.position.z < -75){
        car_principal.position.z = 18
    }
}

loop()