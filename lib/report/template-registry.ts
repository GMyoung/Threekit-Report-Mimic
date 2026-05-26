import type { ReportPage, ReportPageType } from "@/lib/report/page-types";

export type TemplateCandidate = {
  id: string;
  name: string;
  source: "satus" | "r3f-scroll-rig" | "shadcn" | "tanstack" | "custom";
  pageTypes: ReportPage["pageType"][];
  componentBias: "prose" | "dashboard" | "table" | "heatmap" | "cinematic" | "cta";
  threeIntensity: 0 | 1 | 2 | 3;
  contentDensity: 1 | 2 | 3;
  implementationRisk: 1 | 2 | 3;
  licenseSafety: 1 | 2 | 3;
};

export const templateRegistry: TemplateCandidate[] = [
  {
    id: "satus-report-shell",
    name: "Content-driven report shell",
    source: "satus",
    pageTypes: ["cover", "contents", "foreword", "limitations", "cta"],
    componentBias: "prose",
    threeIntensity: 1,
    contentDensity: 2,
    implementationRisk: 1,
    licenseSafety: 3,
  },
  {
    id: "scroll-rig-cinematic",
    name: "Tracked DOM with global WebGL",
    source: "r3f-scroll-rig",
    pageTypes: ["cover", "kpi-summary", "channel-gap", "heatmap", "patterns", "cta"],
    componentBias: "cinematic",
    threeIntensity: 3,
    contentDensity: 1,
    implementationRisk: 2,
    licenseSafety: 2,
  },
  {
    id: "shadcn-dashboard-cards",
    name: "Report cards and controls",
    source: "shadcn",
    pageTypes: ["kpi-summary", "executive-summary", "intent-cards", "self-audit", "patterns"],
    componentBias: "dashboard",
    threeIntensity: 1,
    contentDensity: 2,
    implementationRisk: 1,
    licenseSafety: 3,
  },
  {
    id: "tanstack-data-table",
    name: "Sortable searchable table",
    source: "tanstack",
    pageTypes: ["leaderboard", "pricing-table", "appendix"],
    componentBias: "table",
    threeIntensity: 0,
    contentDensity: 3,
    implementationRisk: 1,
    licenseSafety: 3,
  },
  {
    id: "custom-heatmap",
    name: "Accessible 2D matrix plus optional 3D scene",
    source: "custom",
    pageTypes: ["heatmap"],
    componentBias: "heatmap",
    threeIntensity: 2,
    contentDensity: 3,
    implementationRisk: 1,
    licenseSafety: 3,
  },
];

export function pageTypeFit(candidate: TemplateCandidate, pageType: ReportPageType) {
  return candidate.pageTypes.includes(pageType) ? 1 : 0;
}
