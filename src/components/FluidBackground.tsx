import { useRef, useMemo, useCallback, useEffect } from "react";
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
  precision highp float;

  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uMouseVelocity;
  uniform float uDistortionStrength;
  uniform float uSpeed;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec3 uColor4;
  varying vec2 vUv;

  //
  // 3D Simplex noise (Stefan Gustavson)
  //
  vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  float mod289(float x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  // Fractal Brownian Motion for turbulence
  float fbm(vec3 p, int octaves) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    float lacunarity = 2.0;
    float persistence = 0.5;
    for (int i = 0; i < 8; i++) {
      if (i >= octaves) break;
      value += amplitude * snoise(p * frequency);
      frequency *= lacunarity;
      amplitude *= persistence;
    }
    return value;
  }

  // Domain warping for fluid viscosity
  float domainWarp(vec3 p, float strength) {
    vec3 q = vec3(
      fbm(p + vec3(0.0, 0.0, 0.0), 4),
      fbm(p + vec3(5.2, 1.3, 2.8), 4),
      fbm(p + vec3(1.7, 9.2, 4.1), 4)
    );
    vec3 r = vec3(
      fbm(p + strength * q + vec3(1.7, 9.2, 0.0), 4),
      fbm(p + strength * q + vec3(8.3, 2.8, 3.1), 4),
      fbm(p + strength * q + vec3(3.1, 4.7, 7.2), 4)
    );
    return fbm(p + strength * r, 5);
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * uSpeed;
    float distStr = uDistortionStrength;

    // Aspect-corrected coordinates
    vec2 aspect = vec2(1.0, 1.0);

    // --- Cursor interaction ---
    vec2 mouse = uMouse;
    vec2 mVel = uMouseVelocity;
    float mSpeed = length(mVel);

    // Distance to cursor with smooth falloff
    float mouseDist = length((uv - mouse) * aspect);
    float cursorRadius = 0.28 + mSpeed * 0.5;
    float cursorInfluence = smoothstep(cursorRadius, 0.0, mouseDist);
    cursorInfluence = pow(cursorInfluence, 1.5); // sharper falloff

    // Cursor creates a directional push
    vec2 cursorPush = normalize(uv - mouse + 0.001) * cursorInfluence * 0.12 * distStr;
    cursorPush += mVel * cursorInfluence * 0.4; // velocity-based swirl

    // --- Fluid base with domain warping ---
    vec3 pos = vec3(uv + cursorPush, t * 0.3);

    // Primary fluid - deep domain-warped noise
    float fluid1 = domainWarp(pos * 2.0, 4.0 * distStr);

    // Secondary turbulence layer
    float fluid2 = domainWarp(pos * 3.0 + vec3(10.0, 0.0, t * 0.1), 3.0 * distStr);

    // Micro turbulence for viscosity feel
    float micro = fbm(vec3(uv * 12.0 + cursorPush * 3.0, t * 0.5), 3) * 0.15;

    // Combine layers
    float fluid = fluid1 * 0.6 + fluid2 * 0.3 + micro;

    // Cursor adds extra swirl turbulence
    float cursorTurb = snoise(vec3((uv + cursorPush * 2.0) * 6.0, t * 0.8)) * cursorInfluence * 0.4;
    fluid += cursorTurb;

    // --- UV distortion for smoke wisps ---
    vec2 warpedUv = uv + vec2(
      snoise(vec3(uv * 2.5, t * 0.2)) * 0.1 * distStr + cursorPush.x * 2.0,
      snoise(vec3(uv * 2.5 + 100.0, t * 0.15)) * 0.1 * distStr + cursorPush.y * 2.0
    );

    float smokeDensity = domainWarp(vec3(warpedUv * 2.5, t * 0.25), 3.5 * distStr);
    smokeDensity = smokeDensity * 0.5 + 0.5; // normalize to 0-1

    // --- Color composition ---
    float colorDriver = smoothstep(-0.6, 0.8, fluid);
    colorDriver = colorDriver * smokeDensity;

    // Remap with smooth gradient stops
    vec3 color = mix(uColor1, uColor2, smoothstep(0.0, 0.25, colorDriver));
    color = mix(color, uColor3, smoothstep(0.2, 0.5, colorDriver));
    color = mix(color, uColor4, smoothstep(0.45, 0.75, colorDriver));

    // Highlight hotspots near cursor
    float highlight = pow(cursorInfluence, 3.0) * 0.3;
    color += uColor4 * highlight;

    // Smoke density modulation - creates wispy edges
    float wisps = smoothstep(0.15, 0.55, smokeDensity);
    float edges = smoothstep(0.3, 0.6, abs(fluid)) * 0.6 + 0.4;
    color *= wisps * edges * 2.2 + 0.02;

    // Soft inner glow
    float glow = exp(-mouseDist * 3.0) * cursorInfluence * 0.15;
    color += uColor3 * glow;

    // Vignette - darker at edges
    float vignette = 1.0 - smoothstep(0.2, 1.1, length(uv - 0.5) * 1.4);
    color *= vignette;

    // Subtle film grain for cinematic feel
    float grain = (snoise(vec3(uv * 400.0, t * 10.0)) * 0.5 + 0.5) * 0.03;
    color += grain;

    // Tone mapping for richness
    color = color / (color + 0.8);
    color = pow(color, vec3(0.95));

    gl_FragColor = vec4(color, 1.0);
  }
`;

interface FluidBackgroundProps {
  color1?: [number, number, number];
  color2?: [number, number, number];
  color3?: [number, number, number];
  color4?: [number, number, number];
  distortionStrength?: number;
  speed?: number;
}

function FluidPlane({
  color1 = [0.0, 0.0, 0.0],
  color2 = [0.12, 0.06, 0.0],
  color3 = [0.55, 0.3, 0.04],
  color4 = [0.9, 0.7, 0.15],
  distortionStrength = 1.0,
  speed = 0.12,
}: FluidBackgroundProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef(new THREE.Vector2(0.5, 0.5));
  const smoothMouseRef = useRef(new THREE.Vector2(0.5, 0.5));
  const prevMouseRef = useRef(new THREE.Vector2(0.5, 0.5));
  const velocityRef = useRef(new THREE.Vector2(0.0, 0.0));
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseVelocity: { value: new THREE.Vector2(0.0, 0.0) },
      uDistortionStrength: { value: distortionStrength },
      uSpeed: { value: speed },
      uColor1: { value: new THREE.Vector3(...color1) },
      uColor2: { value: new THREE.Vector3(...color2) },
      uColor3: { value: new THREE.Vector3(...color3) },
      uColor4: { value: new THREE.Vector3(...color4) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Update uniform values when props change
  useEffect(() => {
    uniforms.uDistortionStrength.value = distortionStrength;
    uniforms.uSpeed.value = speed;
    uniforms.uColor1.value.set(...color1);
    uniforms.uColor2.value.set(...color2);
    uniforms.uColor3.value.set(...color3);
    uniforms.uColor4.value.set(...color4);
  }, [uniforms, color1, color2, color3, color4, distortionStrength, speed]);

  const handlePointerMove = useCallback((e: THREE.Event & { uv?: THREE.Vector2 }) => {
    if (e.uv) {
      mouseRef.current.copy(e.uv);
    }
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial;

    mat.uniforms.uTime.value += delta;

    // Smooth mouse interpolation (viscous feel)
    smoothMouseRef.current.lerp(mouseRef.current, 0.08);
    mat.uniforms.uMouse.value.copy(smoothMouseRef.current);

    // Compute velocity with damping
    velocityRef.current.subVectors(smoothMouseRef.current, prevMouseRef.current);
    velocityRef.current.multiplyScalar(1.0 / Math.max(delta, 0.008));
    // Dampen velocity smoothly
    mat.uniforms.uMouseVelocity.value.lerp(velocityRef.current, 0.1);

    prevMouseRef.current.copy(smoothMouseRef.current);
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

const FluidBackground = (props: FluidBackgroundProps) => {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        style={{ background: "black" }}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <FluidPlane {...props} />
      </Canvas>
    </div>
  );
};

export default FluidBackground;
