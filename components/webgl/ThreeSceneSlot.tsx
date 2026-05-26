"use client";

import dynamic from "next/dynamic";
import * as React from "react";
import { ScrollScene, UseCanvas } from "@14islands/r3f-scroll-rig";
import type { SceneName } from "@/lib/report/page-types";
import { ReducedMotionFallback } from "@/components/webgl/ReducedMotionFallback";
import { SceneBoundary } from "@/components/webgl/SceneBoundary";

type SlotProps = {
  scene: SceneName;
  anchorId: string;
  data?: unknown;
  intensity?: "none" | "subtle" | "standard" | "hero";
  fallback?: React.ReactNode;
};

type Vectorish = [number, number, number] | { toArray?: () => number[] };
type ScrollProps = {
  scale?: Vectorish;
  position?: Vectorish;
};

type SceneComponentProps = {
  data?: unknown;
  intensity?: SlotProps["intensity"];
};

const sceneMap: Record<SceneName, React.ComponentType<SceneComponentProps>> = {
  cover: dynamic<SceneComponentProps>(() => import("@/components/webgl/scenes/CoverScene").then((mod) => mod.CoverScene), { ssr: false }),
  kpi: dynamic<SceneComponentProps>(() => import("@/components/webgl/scenes/KpiNumbersScene").then((mod) => mod.KpiNumbersScene), { ssr: false }),
  "channel-gap": dynamic<SceneComponentProps>(() => import("@/components/webgl/scenes/ChannelGapScene").then((mod) => mod.ChannelGapScene), { ssr: false }),
  heatmap: dynamic<SceneComponentProps>(() => import("@/components/webgl/scenes/HeatmapScene").then((mod) => mod.HeatmapScene), { ssr: false }),
  configurator: dynamic<SceneComponentProps>(() => import("@/components/webgl/scenes/ConfiguratorScene").then((mod) => mod.ConfiguratorScene), { ssr: false }),
  "cta-orbit": dynamic<SceneComponentProps>(() => import("@/components/webgl/scenes/CTAOrbitScene").then((mod) => mod.CTAOrbitScene), { ssr: false }),
};

function toVector(value: Vectorish | undefined, fallback: [number, number, number]) {
  if (!value) return fallback;
  if (Array.isArray(value)) return value;
  const array = value.toArray?.();
  if (array && array.length >= 3) return [array[0], array[1], array[2]] as [number, number, number];
  return fallback;
}

function useReducedMotion() {
  const [reduced, setReduced] = React.useState(true);
  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);
  return reduced;
}

export function ThreeSceneSlot({ scene, anchorId, data, intensity = "standard", fallback }: SlotProps) {
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const Scene = sceneMap[scene];
  const disable = intensity === "none" || reduced;

  return (
    <div className={`three-scene-slot three-scene-slot--${intensity}`} ref={anchorRef} data-anchor-id={anchorId} data-scene-slot={scene}>
      {disable ? (fallback ?? <ReducedMotionFallback label={scene} />) : null}
      {!disable ? (
        <SceneBoundary label={scene}>
          <UseCanvas>
            <ScrollScene track={anchorRef as React.MutableRefObject<HTMLElement>} inViewportMargin="20%">
              {(props: ScrollProps) => {
                const scale = toVector(props.scale, [1, 1, 1]);
                const position = toVector(props.position, [0, 0, 0]);
                return (
                  <group position={position} scale={scale}>
                    <Scene data={data} intensity={intensity} />
                  </group>
                );
              }}
            </ScrollScene>
          </UseCanvas>
        </SceneBoundary>
      ) : null}
    </div>
  );
}
