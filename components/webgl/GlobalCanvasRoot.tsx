"use client";

import dynamic from "next/dynamic";

const GlobalCanvas = dynamic(() => import("@14islands/r3f-scroll-rig").then((mod) => mod.GlobalCanvas), {
  ssr: false,
});

export function GlobalCanvasRoot() {
  return (
    <GlobalCanvas
      camera={{ position: [0, 0, 10], fov: 20 }}
      dpr={[1, 1.25]}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      globalRender
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      }}
      scaleMultiplier={0.01}
      style={{
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
