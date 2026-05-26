"use client";

import { Text } from "@react-three/drei";
import { FloatingGroup } from "@/components/webgl/scenes/ScenePrimitives";

export function KpiNumbersScene() {
  return (
    <FloatingGroup speed={0.2}>
      <ambientLight intensity={1} />
      {["26%", "15%", "12%", "9x"].map((value, index) => (
        <Text color={index === 3 ? "#143033" : "#e9836f"} fontSize={0.28} key={value} position={[-0.6 + index * 0.4, 0, 0]}>
          {value}
        </Text>
      ))}
    </FloatingGroup>
  );
}
