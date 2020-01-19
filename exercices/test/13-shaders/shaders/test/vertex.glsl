#define M_PI 3.1415926535897932384626433832795

uniform float uTime;

varying vec3 vColor;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float intensity = sin(uv.x * 14.0 * M_PI) * sin(uv.y * 10.0 * M_PI - uTime * 0.001);

    float proximityToPoles = 1.0 - pow(abs(uv.y - 0.5) * 2.0, 3.0);
    intensity *= proximityToPoles;

    modelPosition.xyz += normal * intensity;

    vec3 startColor = vec3(0.4, 0.0, 0.2);
    vec3 endColor = vec3(1.0, 1.0, 0.6);
    vColor = mix(startColor, endColor, intensity);
    // vColor = vec3(proximityToPoles);

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
}