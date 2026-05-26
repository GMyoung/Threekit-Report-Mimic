"use client";

import { Float } from "@react-three/drei";
import { FloatingGroup, Panel } from "@/components/webgl/scenes/ScenePrimitives";

export function CoverScene() {
  return (
    <FloatingGroup>
      <ambientLight intensity={1.2} />
      <directionalLight intensity={1.8} position={[2, 3, 4]} />
      <Float floatIntensity={0.3} rotationIntensity={0.2} speed={1.4}>
        <Panel position={[-0.65, 0.35, 0]} />
        <Panel color="#8fa89f" position={[0.35, 0.1, 0.25]} />
        <Panel color="#36595b" opacity={0.5} position={[0.05, -0.25, -0.15]} />
      </Float>
    </FloatingGroup>
  );
}
