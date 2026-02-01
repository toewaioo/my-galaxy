import { Cloud } from '@react-three/drei';
import * as THREE from 'three';

export default function Nebula() {
    return (
        <group>
            {/* Pink Nebula - Closer and denser */}
            <Cloud
                opacity={0.5}
                speed={0.4}
                bounds={[10, 2, 2]} // Smaller bounds for denser look
                segments={40} // More particles
                volume={10} // Larger particles
                position={[-5, 2, -5]} // Closer to planet
                color="#ff00cc"
            />
            {/* Cyan Nebula - Right */}
            <Cloud
                opacity={0.5}
                speed={0.4}
                bounds={[10, 2, 2]}
                segments={40}
                volume={10}
                position={[5, -2, -5]}
                color="#00ffff"
            />

            {/* Global Ambient Mist */}
            <Cloud
                opacity={0.2}
                speed={0.1}
                bounds={[30, 30, 5]} // Huge flat backdrop
                segments={80} // Lots of particles
                volume={20} // Giant puffs
                position={[0, 0, -10]} // Behind planet
                color="#d913ebff" // Deep Purple
            />
        </group>
    );
}
