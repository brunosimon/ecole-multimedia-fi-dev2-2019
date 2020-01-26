varying vec3 vModelPosition;
varying float vRandom;

uniform float uFrequency;
uniform float uTime;

void main()
    {

        gl_FragColor = vec4(0.50 + sin(uTime * 0.002)*0.04,0.1,0.1, 10.0);
    }