import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Environment, Sphere } from "@react-three/drei";
import { Suspense } from "react";
import Planet from "./Planet";
import TextRing from "./TextRing";
import StarField from "./StarField";
import Comet from "./Comet";
import ShootingStars from "./ShootingStar";
import MeteorShower from "./MeteorShower";
import Nebula from "./Nebula";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GradientTexture } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import BillboardClouds from "./BillboardClouds";

function IntroCamera({ onFinish }: { onFinish: () => void }) {
  useFrame((state) => {
    // Linear interpolation or smoothstep could work, but let's use a simple damp effect
    // Target Z is 16, Start Z is around 3.
    // We want this to happen over time. using clamp to ensure it stops.

    // Let's use standard lerp for smoothness based on global time to ensure consistency
    // But simple convergence is easier: move current toward target.
    const targetZ = 25;

    if (state.camera.position.z < targetZ - 0.1) {
      state.camera.position.z = THREE.MathUtils.lerp(
        state.camera.position.z,
        targetZ,
        0.05,
      );
      state.camera.updateProjectionMatrix();
    } else {
      // Finished
      onFinish();
    }
  });
  return null;
}

export default function Scene({
  onSelectMemory,
}: {
  onSelectMemory: (memory: any) => void;
}) {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <Canvas
      camera={{ position: [0, 0, 2], fov: 45 }} // Start text camera CLOSE (z=2)
      dpr={[1, 1.5]}
      gl={{ antialias: true, preserveDrawingBuffer: true, alpha: false }}
    >
      <Suspense fallback={null}>
        <ShootingStars />
        {/* <color attach="background" args={['#050505']} /> Removed for gradient sphere */}
        {/* Animation Controller */}
        {!introFinished && (
          <IntroCamera onFinish={() => setIntroFinished(true)} />
        )}
        {/* Cinematic Controls - Enabled only after intro */}
        <OrbitControls
          enabled={introFinished}
          enablePan={false}
          enableZoom={true}
          maxDistance={55}
          minDistance={3}
          autoRotate={introFinished} // Only auto rotate after intro
          autoRotateSpeed={0.3}
          zoomSpeed={0.6}
          rotateSpeed={0.8}
          dampingFactor={0.05}
        />
        <ambientLight intensity={0.5} color="#c716eb" />
        {/* Cinematic Galaxy Lighting - Multi-colored rim lights */}
        <pointLight
          position={[10, 10, 5]}
          intensity={2}
          color="#ff3366"
          distance={50}
          decay={2}
        />
        <pointLight
          position={[-10, -10, 5]}
          intensity={2}
          color="#d810df"
          distance={50}
          decay={2}
        />{" "}
        {/* Was Cyan, now Magenta */}
        <pointLight
          position={[0, 5, -10]}
          intensity={2}
          color="#9900ff"
          distance={50}
          decay={2}
        />
        {/* <Environment preset="city" /> */}
        {/* Galaxy Gradient Background */}
        <Sphere args={[100, 64, 64]} rotation={[0, 0, Math.PI / 2]}>
          <meshBasicMaterial side={THREE.BackSide}>
            <GradientTexture
              attach="map"
              stops={[0, 0.4, 1]}
              colors={["#140206ff", "#1a0b2e", "#2e003e"]} // Deep cosmic gradient
              size={1024}
            />
          </meshBasicMaterial>
        </Sphere>
        {/* Core Elements */}
        <Planet />
        <TextRing />
        {/* Sprite Billboards (Clouds) */}
        <BillboardClouds />
        {/* Background Stars - Note: Additional Stars are in Planet.tsx */}
        <StarField />
        {/* <Stars /> removed to prevent duplication overload */}
        {/* Shooting Stars (Random) */}
        <ShootingStars />
        {/* One-time Meteor Shower Event
                <MeteorShower /> */}
        {/* Memory Comets */}
        {Array.from({ length: 1000 }).map((_, i) => {
          // Define your list of memory images here
          const memories = [
            { image: "/cp-1.jpeg", message: "Our first date..." },
            { image: "/cp-2.jpeg", message: "That time we got lost..." },
            { image: "/cp-3.jpeg", message: "Forever and always." },
            // Add more filenames here as you add them to the public folder
            // "/photo1.jpg",
            // "/photo2.jpg"
          ];

          const randomMemory = memories[i % memories.length]; // Cycle through images

          return (
            <Comet
              key={i}
              radiusX={6 + Math.random() * 6}
              radiusZ={6 + Math.random() * 6}
              speed={0.05 + Math.random() * 0.001}
              startAngle={Math.random() * Math.PI * 2}
              color={
                ["#73ff66ff", "#07010cff", "#d6dddfff", "#ffcc00"][
                  Math.floor(Math.random() * 4)
                ]
              }
              image={randomMemory.image}
              onClick={() => onSelectMemory(randomMemory)}
              orbitRotation={[
                (Math.random() - 0.5) * 0.1,
                9,
                (Math.random() - 0.5) * 0.2 + 0.3,
              ]}
            />
          );
        })}
      </Suspense>

      {/* Post-Processing Effects - Enhanced Glow */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.2} // Lower threshold to make more things glow
          luminanceSmoothing={0.9}
          intensity={2.0} // Stronger glow
          radius={0.9} // Wider blur for dreamy effect
          mipmapBlur // High quality blur
        />
      </EffectComposer>
    </Canvas>
  );
}
