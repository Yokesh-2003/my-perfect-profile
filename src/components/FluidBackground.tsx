import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  varying vec2 vUv;

  // Simplex-like noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                            + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                            dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.15;

    // Mouse influence
    vec2 mouse = uMouse;
    float mouseDist = length(uv - mouse);
    float mouseInfluence = smoothstep(0.4, 0.0, mouseDist) * 0.3;

    // Layered noise for fluid look
    float n1 = snoise(uv * 3.0 + vec2(t, t * 0.7)) * 0.5;
    float n2 = snoise(uv * 5.0 - vec2(t * 0.8, t * 0.5)) * 0.3;
    float n3 = snoise(uv * 8.0 + vec2(t * 0.3, -t * 0.6)) * 0.2;
    float n4 = snoise((uv + mouse * 0.2) * 4.0 + vec2(t * 0.5)) * mouseInfluence;

    float noise = n1 + n2 + n3 + n4;

    // Distort UVs
    vec2 distortedUv = uv + vec2(
      snoise(uv * 3.0 + t) * 0.08 + mouseInfluence * 0.05,
      snoise(uv * 3.0 - t * 0.7) * 0.08 + mouseInfluence * 0.05
    );

    float pattern = snoise(distortedUv * 4.0 + t * 0.3);
    pattern = pattern * 0.5 + 0.5;

    // Color palette - golden amber smoke on black
    vec3 black = vec3(0.0);
    vec3 darkAmber = vec3(0.15, 0.08, 0.0);
    vec3 amber = vec3(0.6, 0.35, 0.05);
    vec3 gold = vec3(0.85, 0.65, 0.12);
    vec3 brightGold = vec3(1.0, 0.85, 0.3);

    // Build color from noise
    float colorMix = smoothstep(-0.2, 0.8, noise + pattern * 0.3);
    vec3 color = mix(black, darkAmber, smoothstep(0.0, 0.3, colorMix));
    color = mix(color, amber, smoothstep(0.3, 0.55, colorMix));
    color = mix(color, gold, smoothstep(0.55, 0.75, colorMix));
    color = mix(color, brightGold, smoothstep(0.75, 1.0, colorMix));

    // Smoke-like wisps
    float wisps = smoothstep(0.3, 0.7, pattern) * smoothstep(0.1, 0.5, noise + 0.5);
    color *= wisps * 1.8 + 0.05;

    // Vignette
    float vignette = 1.0 - smoothstep(0.3, 1.0, length(uv - 0.5) * 1.2);
    color *= vignette;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function FluidPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef(new THREE.Vector2(0.5, 0.5));
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    }),
    []
  );

  const handlePointerMove = useCallback((e: THREE.Event & { uv?: THREE.Vector2 }) => {
    if (e.uv) {
      mouseRef.current.lerp(e.uv, 0.1);
    }
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.ShaderMaterial;
      mat.uniforms.uTime.value += delta;
      mat.uniforms.uMouse.value.lerp(mouseRef.current, 0.05);
    }
  });

  return (
    <mesh ref={meshRef} onPointerMove={handlePointerMove} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

const FluidBackground = () => {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        style={{ background: "black" }}
        gl={{ antialias: false, alpha: false }}
        dpr={[1, 1.5]}
      >
        <FluidPlane />
      </Canvas>
    </div>
  );
};

export default FluidBackground;
