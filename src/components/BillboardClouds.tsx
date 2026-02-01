import { useRef, useMemo } from 'react';
import { Billboard, Instance, Instances } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

// Simple soft glow texture data URI to avoid external asset dependency
const glowTexture = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAGXVTIPH2WAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAPUExURQAAAP///////////////////66wV+sAAAAFdFJOUzs7Ozs7O05mZnUAAACSSURBVFhH7dIxDsMwDATB5P7/l40qg0iCC6x4A2XpWwDufq/7k9+f/P7k9ye/P/n9ye9Pfn/y+5Pfn/z+5Pcnvz/5/cnvT35/8vuT35/8/uT3J78/+f3J709+f/L7k9+f/P7k9ye/P/n9ye9Pfn/y+5Pfn/z+5Pcnvz/5/cnvT35/8vuT35/8/uT3J78/+f3J709+f/L7k7c5H57yH+QK83cAAAAASUVORK5CYII=";
// That was a placeholder. Let's strictly use a procedural material or a simpler approach.
// Using a simple meshBasicMaterial with a radial gradient map created via canvas is better.

function CloudSprite({ position, color, size, opacity }: { position: [number, number, number], color: string, size: number, opacity: number }) {
    // Use a simple textured plane that always faces camera via Billboard
    // We can use the 'cloud.png' if available, but fallback to a generated texture approach if possible in a real app.
    // For now, let's assume standard billboard behavior with a soft texture.

    // Since we can't easily generate a complex texture here without canvas, we will use a circular gradient on a canvas texture.
    const texture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 64, 64);
        }
        const tex = new THREE.CanvasTexture(canvas);
        return tex;
    }, []);

    return (
        <Billboard position={position} follow={true} lockX={false} lockY={false} lockZ={false}>
            <mesh>
                <planeGeometry args={[size, size]} />
                <meshBasicMaterial
                    map={texture}
                    transparent
                    opacity={opacity}
                    color={color}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
        </Billboard>
    );
}

export default function BillboardClouds() {
    return (
        <group>
            {/* Rich Gradient Atmosphere - Overlapping colors for depth */}

            {/* Magenta/Pink Sector */}
            <CloudSprite position={[-10, 5, -5]} color="#ff0066" size={10} opacity={0.1} />
            <CloudSprite position={[-15, -5, -8]} color="#ff66cc" size={10} opacity={0.1} />
            <CloudSprite position={[-8, 10, -10]} color="#db00cc" size={15} opacity={0.1} />

            {/* Lavender/Purple Sector (Was Cyan) */}
            <CloudSprite position={[10, -5, -5]} color="#d810df" size={10} opacity={0.1} />
            <CloudSprite position={[15, 2, -10]} color="#e056fd" size={12} opacity={0.1} />
            <CloudSprite position={[5, -10, -8]} color="#9900ff" size={10} opacity={0.1} />

            {/* Gold/Orange Warmth */}
            <CloudSprite position={[0, 15, -15]} color="#ffaa00" size={10} opacity={0.1} />
            <CloudSprite position={[-5, 8, -5]} color="#ffdd00" size={10} opacity={0.1} />

            {/* Deep Cosmic Background Background */}
            <CloudSprite position={[0, 0, -25]} color="#2a004d" size={10} opacity={0.1} />
            <CloudSprite position={[20, 20, -30]} color="#4b0082" size={10} opacity={0.1} />
            <CloudSprite position={[-20, -20, -30]} color="#E100FF" size={10} opacity={0.1} />
        </group>
    );
}
