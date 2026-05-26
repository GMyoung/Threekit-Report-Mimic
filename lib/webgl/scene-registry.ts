import type { SceneName } from "@/lib/report/page-types";

export const sceneRegistry: Record<SceneName, { label: string; maxDpr: number; mobileParticles: number; desktopParticles: number }> = {
  cover: { label: "Configurable product panels", maxDpr: 1.25, mobileParticles: 18, desktopParticles: 42 },
  kpi: { label: "KPI number planes", maxDpr: 1.25, mobileParticles: 10, desktopParticles: 24 },
  "channel-gap": { label: "Channel score planes", maxDpr: 1.25, mobileParticles: 8, desktopParticles: 16 },
  heatmap: { label: "Capability grid", maxDpr: 1, mobileParticles: 0, desktopParticles: 0 },
  configurator: { label: "Configurator layers", maxDpr: 1.25, mobileParticles: 8, desktopParticles: 18 },
  "cta-orbit": { label: "CTA orbit", maxDpr: 1.25, mobileParticles: 12, desktopParticles: 28 },
};
