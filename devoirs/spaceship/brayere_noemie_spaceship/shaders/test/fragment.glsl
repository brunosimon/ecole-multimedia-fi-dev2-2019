 uniform float uFrequency;
 uniform float uTime;
 varying vec3 vModelPosition;
 varying float vRandom;

void main()
    {
        gl_FragColor = vec4(sin(vModelPosition.y*uFrequency+uTime*0.01)*vRandom,0.5, 0.5, 0.5);
    }