// attribute vec2 a_position;
uniform float uFrequency ;
uniform float uTime;
attribute float aRandom;
varying float vRandom;
varying vec3 vModelPosition;
uniform vec2 u_resolution;
// uniform vec2 u_translation;
// uniform vec2 u_rotation;







void main ()
{

    // rotation
    // vec2 position = vec2(a_position.x*u_rotation.y+a_position.y*u_rotation.x,a_position.y*u_rotation.y-a_position.x*u_rotation.x);

    //  ajoute translation

    // vec2 position2 = position +u_translation

    vRandom=aRandom;
    vec4 modelPosition = modelMatrix*vec4(position,6);
        modelPosition.x += sin(modelPosition.x * 8.0)*1.5;
        modelPosition.y += sin(modelPosition.x * 5.0)*0.5;
        modelPosition.z += sin(modelPosition.x * 9.0)*0.2;
        vModelPosition=modelPosition.xyz;
    vec4 viewPosition = viewMatrix*modelPosition;
    vec4 projectedPosition = projectionMatrix*viewPosition;

    gl_Position = projectedPosition;
}