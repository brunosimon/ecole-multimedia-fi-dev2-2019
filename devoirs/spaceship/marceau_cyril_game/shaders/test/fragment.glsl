varying vec2 vUv;
varying vec3 vNormal;
varying float noise;
uniform sampler2D tDiffuse;

void main() {

  // compose the colour using the UV coordinate
  // and modulate it with the noise like ambient occlusion
  vec4 colorTexture = texture2D(tDiffuse, vUv);
  colorTexture.rgb *= 0.8;
  colorTexture.rgb *= dot(vNormal, vec3(1.0, 0.0, 0.0));
  //vec3 color = vec3( vUv * ( 1. - 2. * noise ), 0.0 );
  gl_FragColor = vec4(colorTexture);
}