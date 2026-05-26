"use client";

import { useFrame } from "@react-three/fiber";
import * as React from "react";
import type { Group } from "three";

export function FloatingGroup({
  children,
  speed = 0.35,
  enabled = true,
}: {
  children: React.ReactNode;
  speed?: number;
  enabled?: boolean;
}) {
  const ref = React.useRef<Group>(null);
  useFrame((state) => {
    if (!enabled || !ref.current) return;
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * speed) * 0.08;
    ref.current.rotation.x = Math.cos(state.clock.elapsedTime * speed * 0.7) * 0.04;
  });
  return <group ref={ref}>{children}</group>;
}

export function Panel({ position, color = "#e9836f", opacity = 0.62 }: { position: [number, number, number]; color?: string; opacity?: number }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[1.2, 0.08, 0.7]} />
      <meshStandardMaterial color={color} opacity={opacity} transparent roughness={0.6} />
    </mesh>
  );
}
