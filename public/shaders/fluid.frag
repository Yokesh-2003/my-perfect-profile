precision mediump float;
precision mediump sampler2D;

varying vec2 vTextureCoord;

uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uResolution;

void main() {
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    st.x *= uResolution.x / uResolution.y;

    // Add your fluid simulation logic here
    // This is a placeholder
    vec3 color = vec3(st.x, st.y, 0.5 + 0.5 * sin(uTime));

    gl_FragColor = vec4(color, 1.0);
}