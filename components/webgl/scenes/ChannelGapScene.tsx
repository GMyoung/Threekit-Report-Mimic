"use client";

import { Text } from "@react-three/drei";
import { FloatingGroup } from "@/components/webgl/scenes/ScenePrimitives";

export function ChannelGapScene() {
  return (
    <FloatingGroup speed={0.18}>
      <ambientLight intensity={1} />
      <mesh position={[-0.45, 0, 0]}>
        <boxGeometry args={[0.22, 0.12, 0.22]} />
        <meshStandardMaterial color="#f1b2a3" />
      </mesh>
      <mesh position={[0.45, 0.32, 0]}>
        <boxGeometry args={[0.22, 0.82, 0.22]} />
        <meshStandardMaterial color="#36595b" />
      </mesh>
      <Text color="#143033" fontSize={0.12} position={[0, -0.38, 0]}>
        0.50 vs 4.50
      </Text>
    </FloatingGroup>
  );
}
