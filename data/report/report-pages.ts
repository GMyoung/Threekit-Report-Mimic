import canonical from "@/source/canonical-extracted-text.json";
import { chunkText } from "@/lib/report/formatters";
import type { ReportPage, ReportPageType, SceneName } from "@/lib/report/page-types";

type CanonicalSection = {
  number: number;
  text: string;
};

const sourceSections = (canonical as { sections: CanonicalSection[] }).sections;

const pageMeta: Array<{
  pageNumber: number;
  slug: string;
  title: string;
  eyebrow: string;
  subtitle?: string;
  pageType: ReportPageType;
  chapter?: string;
  scene?: SceneName | null;
  dataRefs?: string[];
  templateHints?: string[];
}> = [
  {
    pageNumber: 1,
    slug: "cover",
    title: "The State of Configurable Product Manufacturing Websites",
    eyebrow: "Threekit Research Report",
    subtitle: "How configurable-product manufacturers lose buyers online, a 100-company website audit.",
    pageType: "cover",
    chapter: "Opening",
    scene: "cover",
    dataRefs: ["reportMeta"],
    templateHints: ["satus-shell", "cinematic-cover", "webgl-hero"],
  },
  {
    pageNumber: 2,
    slug: "at-a-glance",
    title: "At a glance",
    eyebrow: "KPI snapshot",
    subtitle: "The condensed version of the report in five numbers and three sentences.",
    pageType: "kpi-summary",
    chapter: "Snapshot",
    scene: "kpi",
    dataRefs: ["atAGlanceMetrics"],
    templateHints: ["dashboard", "stat-cards", "subtle-3d"],
  },
  {
    pageNumber: 3,
    slug: "foreword",
    title: "What We're Seeing",
    eyebrow: "Foreword",
    subtitle: "Matt Gorniak, CEO, Threekit",
    pageType: "foreword",
    chapter: "Editorial",
    dataRefs: ["sources"],
    templateHints: ["prose", "editorial"],
  },
  {
    pageNumber: 4,
    slug: "about-this-research",
    title: "How and Why We Ran This Audit",
    eyebrow: "About this research",
    pageType: "research-method",
    chapter: "Method",
    dataRefs: ["cohortMetrics"],
    templateHints: ["methodology-grid", "disclosure"],
  },
  {
    pageNumber: 5,
    slug: "contents",
    title: "What's In This Report?",
    eyebrow: "Contents",
    subtitle: "Twelve chapters, structured to be read straight through or referenced by intent.",
    pageType: "contents",
    chapter: "Navigation",
    dataRefs: ["reportPages"],
    templateHints: ["toc", "docs-home"],
  },
  {
    pageNumber: 6,
    slug: "executive-summary",
    title: "What 100 Manufacturer Websites Tell You",
    eyebrow: "Executive summary",
    pageType: "executive-summary",
    chapter: "Findings",
    dataRefs: ["atAGlanceMetrics"],
    templateHints: ["dashboard", "finding-cards"],
  },
  {
    pageNumber: 7,
    slug: "definitions",
    title: "Distribution of Primary Buying Paths",
    eyebrow: "Definitions",
    subtitle: "The buying-path categories used throughout the report.",
    pageType: "definitions",
    chapter: "Finding 01",
    dataRefs: ["buyingPaths"],
    templateHints: ["distribution", "definitions"],
  },
  {
    pageNumber: 8,
    slug: "buyer-enablement-score-method",
    title: "One Number That Ranks the Category",
    eyebrow: "Buyer Enablement Score",
    pageType: "score-method",
    chapter: "Score",
    dataRefs: ["scoreComponents"],
    templateHints: ["stepper", "weights"],
  },
  {
    pageNumber: 9,
    slug: "score-distribution",
    title: "How a 7.50 Actually Breaks Down",
    eyebrow: "Score distribution",
    pageType: "score-distribution",
    chapter: "Score",
    dataRefs: ["scoreDistributionMetrics", "leaderboard"],
    templateHints: ["distribution", "worked-example"],
  },
  {
    pageNumber: 10,
    slug: "leaderboard",
    title: "Buyer Enablement Score Leaderboard",
    eyebrow: "Leaderboard",
    pageType: "leaderboard",
    chapter: "Score",
    dataRefs: ["leaderboard", "bottomCohort"],
    templateHints: ["tanstack-table", "ranking"],
  },
  {
    pageNumber: 11,
    slug: "channel-gap",
    title: "A 9x Score Gap Between Channel-Locked and Direct/Hybrid",
    eyebrow: "The channel finding",
    pageType: "channel-gap",
    chapter: "Finding 03",
    scene: "channel-gap",
    dataRefs: ["channelGap"],
    templateHints: ["comparison", "subtle-3d"],
  },
  {
    pageNumber: 12,
    slug: "five-intents",
    title: "Five Intents, Five Data Cuts",
    eyebrow: "Intent map",
    pageType: "intent-cards",
    chapter: "Actionable cuts",
    dataRefs: ["intentCards"],
    templateHints: ["cards", "role-cuts"],
  },
  {
    pageNumber: 13,
    slug: "capability-heatmap",
    title: "Six Core Verticals x Five Capabilities",
    eyebrow: "Capability heatmap",
    pageType: "heatmap",
    chapter: "Capability matrix",
    scene: "heatmap",
    dataRefs: ["verticalCapabilities"],
    templateHints: ["heatmap", "accessible-table"],
  },
  {
    pageNumber: 14,
    slug: "self-audit",
    title: "Run the Same Audit on the Homepage",
    eyebrow: "Self-audit checklist",
    pageType: "self-audit",
    chapter: "Checklist",
    dataRefs: ["selfAudit"],
    templateHints: ["checklist", "score-yourself"],
  },
  {
    pageNumber: 15,
    slug: "doors-windows",
    title: "Six Core Verticals In Depth",
    eyebrow: "Vertical snapshots",
    subtitle: "Doors & Windows",
    pageType: "vertical-snapshot",
    chapter: "Verticals",
    dataRefs: ["verticalSnapshots"],
    templateHints: ["deep-dive", "cards"],
  },
  {
    pageNumber: 16,
    slug: "kitchen-cabinets-contract",
    title: "Kitchen & Bath, Cabinets, and Contract Furniture",
    eyebrow: "Vertical snapshots",
    pageType: "vertical-snapshot",
    chapter: "Verticals",
    dataRefs: ["verticalSnapshots"],
    templateHints: ["deep-dive", "cards"],
  },
  {
    pageNumber: 17,
    slug: "uniforms-medical",
    title: "Custom Uniforms and Medical & Dental Equipment",
    eyebrow: "Vertical snapshots",
    pageType: "vertical-snapshot",
    chapter: "Verticals",
    dataRefs: ["verticalSnapshots"],
    templateHints: ["deep-dive", "cards"],
  },
  {
    pageNumber: 18,
    slug: "pricing-observed",
    title: "15 Manufacturers Showing Prices",
    eyebrow: "Pricing observed",
    pageType: "pricing-table",
    chapter: "Pricing",
    dataRefs: ["pricingObserved"],
    templateHints: ["tanstack-table", "pricing"],
  },
  {
    pageNumber: 19,
    slug: "methodology-limitations",
    title: "How We Audited, What We Measured, What We Didn't",
    eyebrow: "Methodology and limitations",
    pageType: "limitations",
    chapter: "Method",
    dataRefs: ["sources"],
    templateHints: ["prose", "limitations"],
  },
  {
    pageNumber: 20,
    slug: "leader-patterns",
    title: "Three Patterns From The Leaders",
    eyebrow: "Patterns",
    pageType: "patterns",
    chapter: "Conclusion",
    scene: "configurator",
    dataRefs: ["patterns"],
    templateHints: ["pattern-cards", "subtle-3d"],
  },
  {
    pageNumber: 21,
    slug: "forward-looking-questions",
    title: "Forward-Looking Questions",
    eyebrow: "CTA",
    subtitle: "Three questions the public web does not answer.",
    pageType: "cta",
    chapter: "Next research",
    scene: "cta-orbit",
    dataRefs: ["cta"],
    templateHints: ["cta", "cinematic"],
  },
  {
    pageNumber: 22,
    slug: "companies-in-cohort",
    title: "Companies in the Cohort",
    eyebrow: "Appendix",
    subtitle: "Alphabetical list of all 100 enterprise manufacturers included in the May 2026 audit.",
    pageType: "appendix",
    chapter: "Appendix",
    dataRefs: ["companies"],
    templateHints: ["tanstack-table", "appendix"],
  },
];

function sectionText(pageNumber: number) {
  return sourceSections.find((section) => section.number === pageNumber)?.text ?? "";
}

function targetLength(pageNumber: number) {
  if ([10, 12, 18, 19, 22].includes(pageNumber)) return 360;
  if ([1, 2, 5, 21].includes(pageNumber)) return 300;
  return 440;
}

export const reportPages: ReportPage[] = pageMeta.map((meta) => {
  const sourceText = sectionText(meta.pageNumber);
  const body = chunkText(sourceText, targetLength(meta.pageNumber)).map((text, index) => ({
    type: index === 0 ? ("lead" as const) : ("paragraph" as const),
    text,
  }));

  return {
    id: `page-${meta.pageNumber}`,
    sources: ["pdf", ...(meta.scene ? ["r3f-scroll-rig", "r3f", "drei"] : []), ...(meta.dataRefs?.some((ref) => /table|leaderboard|pricing|companies/i.test(ref)) ? ["tanstack-table"] : [])],
    ...meta,
    body,
    sourceText,
  };
});

export const reportPageBySlug = new Map(reportPages.map((page) => [page.slug, page]));
