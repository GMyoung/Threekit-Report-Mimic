"use client";

import { FloatingGroup, Panel } from "@/components/webgl/scenes/ScenePrimitives";

export function ConfiguratorScene() {
  return (
    <FloatingGroup speed={0.16}>
      <ambientLight intensity={1} />
      <directionalLight intensity={1.3} position={[2, 2, 2]} />
      <Panel position={[-0.35, 0.22, 0]} />
      <Panel color="#8fa89f" position={[0.25, 0, 0.12]} />
      <Panel color="#143033" opacity={0.45} position={[0.05, -0.24, -0.1]} />
    </FloatingGroup>
  );
}
