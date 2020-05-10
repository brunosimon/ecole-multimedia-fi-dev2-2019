#define M_PI 3.1415926535897932384626433832795

uniform float uTime;
uniform vec2 uFrequency;

varying vec3 vColor;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float poleProximity = pow(abs((uv.y - 0.5) * 2.0), 3.0);

    float intensity = sin(uv.x * M_PI * uFrequency.x) * sin(uv.y * M_PI * uFrequency.y - uTime * 0.002);
    intensity *= 1.0 - poleProximity;
    modelPosition.xyz += normal * intensity;

    vec3 startColor = vec3(0.4, 0.0, 0.2);
    vec3 endColor = vec3(1.0, 1.0, 0.6);

    vColor = mix(startColor, endColor, intensity);

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
}