"use client";

import { useFrame } from "@react-three/fiber";
import * as React from "react";
import type { Group } from "three";

export function CTAOrbitScene() {
  const ref = React.useRef<Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * 0.18;
  });
  return (
    <group ref={ref}>
      <ambientLight intensity={1.2} />
      {[0, 1, 2].map((item) => (
        <mesh key={item} position={[Math.cos(item * 2.1) * 0.45, Math.sin(item * 2.1) * 0.45, 0]}>
          <sphereGeometry args={[0.07, 24, 24]} />
          <meshStandardMaterial color={item === 0 ? "#e9836f" : item === 1 ? "#8fa89f" : "#143033"} />
        </mesh>
      ))}
      <mesh>
        <torusGeometry args={[0.45, 0.006, 12, 80]} />
        <meshBasicMaterial color="#36595b" opacity={0.55} transparent />
      </mesh>
    </group>
  );
}
