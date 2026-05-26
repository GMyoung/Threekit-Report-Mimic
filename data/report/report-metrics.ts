import type { Metric } from "@/lib/report/page-types";

export const atAGlanceMetrics: Metric[] = [
  {
    label: "Visible pricing",
    value: "26",
    suffix: "%",
    description: "display product pricing without a transactional barrier.",
    emphasis: "primary",
  },
  {
    label: "Low-friction quote form",
    value: "15",
    suffix: "%",
    description: "have a quote-request form reachable without heavy friction.",
    emphasis: "secondary",
  },
  {
    label: "Homepage configurator",
    value: "12",
    suffix: "%",
    description: "have a fully interactive product configurator on the homepage.",
    emphasis: "secondary",
  },
  {
    label: "Median score gap",
    value: "9",
    suffix: "x",
    description: "channel-locked vs. direct/hybrid median Buyer Enablement Score gap.",
    emphasis: "danger",
  },
];

export const cohortMetrics: Metric[] = [
  { label: "Manufacturers", value: 100, description: "large configurable-product manufacturers in cohort." },
  { label: "Usable audits", value: 84, description: "sites yielding usable audit data." },
  { label: "Excluded sites", value: 16, description: "bot-blocks, JS shells, redirects, SSL errors." },
  { label: "Data points/site", value: 10, description: "weighted score inputs per audited website." },
];

export const scoreDistributionMetrics: Metric[] = [
  { label: "Mean score", value: "2.56", description: "audited cohort mean." },
  { label: "Median score", value: "2.25", description: "center of the cohort distribution." },
  { label: "Under 1.0", value: 29, description: "companies scored under 1.0." },
  { label: "6.0 or higher", value: 9, description: "the top 11% of the cohort." },
  { label: "Highest score", value: "7.50", description: "Yale Commercial and ClosetMaid tied." },
];
