export type Density = "compact" | "comfortable" | "roomy";

export type ReportBlock = {
  type: "lead" | "paragraph" | "note" | "list";
  text: string;
};

export type ReportPageType =
  | "cover"
  | "kpi-summary"
  | "foreword"
  | "research-method"
  | "contents"
  | "executive-summary"
  | "definitions"
  | "score-method"
  | "score-distribution"
  | "leaderboard"
  | "channel-gap"
  | "intent-cards"
  | "heatmap"
  | "self-audit"
  | "vertical-snapshot"
  | "pricing-table"
  | "limitations"
  | "patterns"
  | "cta"
  | "appendix";

export type SceneName = "cover" | "kpi" | "channel-gap" | "heatmap" | "configurator" | "cta-orbit";

export type ReportPage = {
  id: string;
  pageNumber: number;
  slug: string;
  chapter?: string;
  title: string;
  eyebrow?: string;
  subtitle?: string;
  pageType: ReportPageType;
  body?: ReportBlock[];
  sourceText: string;
  dataRefs?: string[];
  sources?: string[];
  scene?: SceneName | null;
  templateHints?: string[];
};

export type ReportRenderContext = {
  density: Density;
  showSources: boolean;
  activePageId?: string;
  query?: string;
};

export type Metric = {
  label: string;
  value: string | number;
  suffix?: string;
  description?: string;
  footnote?: string;
  emphasis?: "primary" | "secondary" | "danger" | "neutral";
};

export type TableColumnSpec<T> = {
  id: keyof T | string;
  header: string;
  accessor?: (row: T) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  align?: "left" | "center" | "right";
};
