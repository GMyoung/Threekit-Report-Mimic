"use client";

import { FloatingGroup } from "@/components/webgl/scenes/ScenePrimitives";

const colors = ["#f8f5ec", "#f1b2a3", "#e9836f", "#8fa89f", "#36595b"];

export function HeatmapScene() {
  return (
    <FloatingGroup speed={0.12}>
      <ambientLight intensity={1.2} />
      {Array.from({ length: 30 }).map((_, index) => {
        const x = (index % 5) * 0.22 - 0.44;
        const y = Math.floor(index / 5) * -0.18 + 0.45;
        return (
          <mesh key={index} position={[x, y, 0]}>
            <boxGeometry args={[0.17, 0.12, 0.03 + (index % 5) * 0.015]} />
            <meshStandardMaterial color={colors[index % colors.length]} />
          </mesh>
        );
      })}
    </FloatingGroup>
  );
}
