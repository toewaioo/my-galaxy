import { useRef, useMemo } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { Sphere, Stars, Float, Sparkles, Ring, Torus, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// 1. Define the Fresnel Shader Material
const FresnelMaterial = shaderMaterial(
    {
        uColor: new THREE.Color("#d30ac9ff"), // Core color (Black/Empty for holographic feel)
        uFresnelColor: new THREE.Color("#f714b3ff"), // Edge glow color
        uFresnelPower: 2.0, // How sharp the rim is
        uIntensity: 1.5,
    },
    // Vertex Shader
    `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    
    void main() {
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vec4 mvPosition = viewMatrix * worldPosition;
      gl_Position = projectionMatrix * mvPosition;
      
      vNormal = normalize(normalMatrix * normal);
      vViewPosition = -mvPosition.xyz;
    }
    `,
    // Fragment Shader
    `
    uniform vec3 uColor;
    uniform vec3 uFresnelColor;
    uniform float uFresnelPower;
    uniform float uIntensity;
    
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    
    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);
      
      // Calculate Fresnel Term
      float fresnelTerm = dot(viewDir, normal);
      fresnelTerm = clamp(1.0 - fresnelTerm, 0.0, 1.0);
      fresnelTerm = pow(fresnelTerm, uFresnelPower);
      
      // Combine
      vec3 finalColor = mix(uColor, uFresnelColor, fresnelTerm * uIntensity);
      
      // Holographic transparency: simple additive alpha based on fresnel
      gl_FragColor = vec4(finalColor, fresnelTerm * uIntensity); 
    }
    `
);

// Register the material so R3F knows about it
extend({ FresnelMaterial });

// Add TypeScript support for the new element
declare module '@react-three/fiber' {
    interface ThreeElements {
        fresnelMaterial: any; // Relaxed type to avoid import issues
    }
}

export default function Planet() {
    const planetRef = useRef<THREE.Mesh>(null);
    const ringRef = useRef<THREE.Group>(null);
    const particlesRef = useRef<THREE.Points>(null);

    useFrame((state) => {
        const time = state.clock.elapsedTime;

        if (planetRef.current) {
            planetRef.current.rotation.y = time * 0.1;
        }

        if (ringRef.current) {
            ringRef.current.rotation.z = time * 0.05;
            ringRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
        }

        if (particlesRef.current) {
            particlesRef.current.rotation.y = time * 0.02;
        }

        // Pulse effects
        const pulse = 1 + Math.sin(time * 2) * 0.02;
        if (planetRef.current) planetRef.current.scale.setScalar(pulse);
    });

    return (
        <group>
            {/* Background Stars - Dense Field */}
            <Stars radius={300} depth={60} count={3000} factor={6} saturation={0.5} fade speed={1} />

            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>

                {/* 1. HOLOGRAPHIC PLANET CORE (Fresnel) */}
                <Sphere ref={planetRef} args={[1.5, 64, 64]}>
                    <fresnelMaterial
                        uColor="#ff1493" // Deep Pink Core
                        uFresnelColor="#f30b7fff" // Pale Pink/White Rim for max contrast
                        uFresnelPower={3.8}
                        uIntensity={3.5} // Blinding Neon
                        transparent
                        blending={THREE.AdditiveBlending}
                        depthWrite={false}
                    />
                </Sphere>

                {/* 2. INNER GLOW SPHERE */}
                <Sphere args={[1.4, 32, 32]}>
                    <meshBasicMaterial color="#ff007f" /> {/* Bright Rose backing */}
                </Sphere>



                {/* 4. ATMOSPHERIC GLOW (Outer Halo) */}
                <Sphere args={[1.8, 32, 32]}>
                    <meshBasicMaterial
                        color="#ff1493" // Deep Pink Glow
                        transparent
                        opacity={0.25}
                        blending={THREE.AdditiveBlending}
                        side={THREE.BackSide}
                    />
                </Sphere>

                {/* Sparkles on surface */}
                <Sparkles count={50} scale={1.8} size={2} speed={0.4} color="#ffe6f2" />
            </Float>
        </group>
    );
}