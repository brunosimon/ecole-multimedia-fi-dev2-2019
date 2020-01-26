varying vec3 vModelPosition;
varying float vRandom;

uniform float uTime;
uniform float uFrequency;

attribute float aRandom;


void main()
{
    vRandom = aRandom;
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
     modelPosition.x += sin(modelPosition.y * 1.0 + uTime * 0.002)*0.5;

    vModelPosition = modelPosition.xyz;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
}