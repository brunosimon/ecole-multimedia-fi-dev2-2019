uniform float uFrequency;
uniform float uTime;
 attribute float aRandom;
varying vec3 vModelPosition;
varying float vRandom;

 
 void main()
    {
        vRandom = aRandom;
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        modelPosition.z +=sin(modelPosition.y*uFrequency+uTime*0.01);

        vModelPosition = modelPosition.xyz; //vModelPosition est un vec3 alors que modelposition est un vec4 on recupere juste 
        
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectPosition = projectionMatrix * viewPosition;

        gl_Position = projectPosition;
    }
        // float foo = 1.0;
        // int foo = 1;
        // bool foo = true;
        // vec2 foo = vec2(1.0,2.0);
        // float toto = foo.x; 
        // vec3 foo = vec3(1.0,2.0,3.0);
        // vec2 toto = foo.xz; peut etre aussi rgb x=r y=g z=b
        // vec2 tata = foo.xy;
        // float tutu = foo.z;
        // vec4 foo = vec3(1.0,2.0,3.0,4.0);
        // vec2 titi = vec2(3.0,4.0);
        // vec4 foo = vec4(1.0,2.0,titi);