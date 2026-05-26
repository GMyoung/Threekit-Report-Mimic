import type { ReportPage } from "@/lib/report/page-types";
import { pageTypeFit, templateRegistry, type TemplateCandidate } from "@/lib/report/template-registry";

function hashSeed(seed: string) {
  let hash = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash >>> 0);
}

function seededNoise(seed: string, id: string) {
  return (hashSeed(`${seed}:${id}`) % 1000) / 1000;
}

function desiredBias(page: ReportPage): TemplateCandidate["componentBias"] {
  if (["foreword", "research-method", "limitations"].includes(page.pageType)) return "prose";
  if (["leaderboard", "pricing-table", "appendix"].includes(page.pageType)) return "table";
  if (page.pageType === "heatmap") return "heatmap";
  if (["cover", "cta"].includes(page.pageType)) return "cinematic";
  return "dashboard";
}

function desiredThree(page: ReportPage) {
  if (["cover", "cta"].includes(page.pageType)) return 3;
  if (["channel-gap", "heatmap", "patterns"].includes(page.pageType)) return 2;
  if (page.pageType === "kpi-summary") return 1;
  return 0;
}

export function scoreTemplate(page: ReportPage, candidate: TemplateCandidate) {
  const pageFit = pageTypeFit(candidate, page.pageType);
  const densityFit = 1 - Math.abs(candidate.contentDensity - (page.body && page.body.length > 5 ? 3 : 2)) / 2;
  const componentCoverage = candidate.componentBias === desiredBias(page) ? 1 : 0.45;
  const threeFit = 1 - Math.abs(candidate.threeIntensity - desiredThree(page)) / 3;
  const implementationEase = (4 - candidate.implementationRisk) / 3;
  const licenseSafety = candidate.licenseSafety / 3;

  return (
    0.3 * pageFit +
    0.2 * densityFit +
    0.15 * componentCoverage +
    0.15 * threeFit +
    0.1 * implementationEase +
    0.1 * licenseSafety
  );
}

export function pickTemplate(page: ReportPage, reportSlug = "threekit-report-may-2026") {
  const candidates = templateRegistry.filter((candidate) => {
    if (["leaderboard", "pricing-table", "appendix"].includes(page.pageType)) {
      return candidate.threeIntensity <= 1;
    }
    if (["foreword", "research-method", "limitations"].includes(page.pageType)) {
      return candidate.componentBias === "prose" || candidate.pageTypes.includes(page.pageType);
    }
    return true;
  });

  return [...candidates]
    .map((candidate) => ({
      candidate,
      score: scoreTemplate(page, candidate) + seededNoise(reportSlug, candidate.id) * 0.001,
    }))
    .sort((a, b) => b.score - a.score)[0]?.candidate;
}
