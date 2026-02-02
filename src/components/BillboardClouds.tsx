import { useRef, useMemo } from 'react';
import { Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

function AtmosphericGlow({ position, color, size, opacity }: { position: [number, number, number], color: string, size: number, opacity: number }) {

    // Create a very soft, diffuse gradient texture
    const texture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 128; // Higher res for smoother gradient
        canvas.height = 128;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            // Radial gradient that fades out very slowly
            const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
            // Core is brighter
            gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
            // Midpoint is still quite soft
            gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.2)');
            // Fades to completely invisible well before the edge
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 128, 128);
        }
        return new THREE.CanvasTexture(canvas);
    }, []);

    const brightColor = useMemo(() => {
        // Boost intensity for that neon "light" feel, but keep it soft
        return new THREE.Color(color).multiplyScalar(3);
    }, [color]);

    return (
        <Billboard position={position}>
            <mesh>
                <planeGeometry args={[size, size]} />
                <meshBasicMaterial
                    map={texture}
                    transparent
                    opacity={opacity}
                    color={brightColor}
                    depthWrite={false} // Important: prevents blocking other objects
                    blending={THREE.AdditiveBlending} // Merges colors together like light
                    toneMapped={false} // Keeps colors bright/neon
                />
            </mesh>
        </Billboard>
    );
}

const clouds = [
    // Massive, room-filling washes of color
    // SIZES are huge (40-60) to prevent looking like "circles"

    // Passionate Pink Glow
    { position: [-10, 5, -5] as [number, number, number], color: "#FF1493", size: 20, opacity: 0.11 },
    { position: [-15, -5, -8] as [number, number, number], color: "#FF69B4", size: 20, opacity: 0.1 },

    // Dreamy Purple Haze
    { position: [10, -5, -5] as [number, number, number], color: "#DA70D6", size: 25, opacity: 0.11 },
    { position: [15, 2, -10] as [number, number, number], color: "#EE82EE", size: 20, opacity: 0.1 },

    // Warm Ambient Light
    { position: [0, 10, -10] as [number, number, number], color: "#FFD700", size: 20, opacity: 0.11 },

    // Deep Background Atmosphere (The Void)
    { position: [0, 0, -20] as [number, number, number], color: "#4B0082", size: 20, opacity: 0.11 },

    // Green Hints
    { position: [12, 8, -12] as [number, number, number], color: "#98FB98", size: 20, opacity: 0.1 },
];

export default function BillboardClouds() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (groupRef.current) {
            // Slower rotation because the clouds are huge now
            groupRef.current.rotation.y += delta * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            {clouds.map((cloud, index) => (
                <AtmosphericGlow
                    key={index}
                    position={cloud.position}
                    color={cloud.color}
                    size={cloud.size}
                    opacity={cloud.opacity}
                />
            ))}
        </group>
    );
}