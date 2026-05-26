import type * as React from "react";
import type { ReportPage, ReportRenderContext } from "@/lib/report/page-types";
import { AppendixCompanies } from "@/components/report/AppendixCompanies";
import { CapabilityHeatmap } from "@/components/report/CapabilityHeatmap";
import { ChannelGapPanel } from "@/components/report/ChannelGapPanel";
import { ContentsGrid } from "@/components/report/ContentsGrid";
import { DefinitionDistribution } from "@/components/report/DefinitionDistribution";
import { EditorialPage } from "@/components/report/EditorialPage";
import { ExecutiveSummary } from "@/components/report/ExecutiveSummary";
import { ForwardLookingCTA } from "@/components/report/ForwardLookingCTA";
import { HeroCover } from "@/components/report/HeroCover";
import { IntentCards } from "@/components/report/IntentCards";
import { KpiSnapshot } from "@/components/report/KpiSnapshot";
import { LeaderboardTable } from "@/components/report/LeaderboardTable";
import { LimitationsPage } from "@/components/report/LimitationsPage";
import { MethodologyGrid } from "@/components/report/MethodologyGrid";
import { PatternCards } from "@/components/report/PatternCards";
import { PricingObservedTable } from "@/components/report/PricingObservedTable";
import { ScoreDistribution } from "@/components/report/ScoreDistribution";
import { ScoreMethod } from "@/components/report/ScoreMethod";
import { SelfAuditChecklist } from "@/components/report/SelfAuditChecklist";
import { VerticalSnapshot } from "@/components/report/VerticalSnapshot";

type RendererProps = {
  page: ReportPage;
  context: ReportRenderContext;
  anchorId: string;
};

type PageComponent = (props: RendererProps) => React.ReactNode;

const pageComponentMap: Record<ReportPage["pageType"], PageComponent> = {
  cover: ({ page, anchorId }) => <HeroCover page={page} anchorId={anchorId} />,
  "kpi-summary": ({ page, anchorId }) => <KpiSnapshot page={page} anchorId={anchorId} />,
  foreword: ({ page }) => <EditorialPage page={page} />,
  "research-method": ({ page }) => <MethodologyGrid page={page} />,
  contents: ({ page }) => <ContentsGrid page={page} />,
  "executive-summary": ({ page }) => <ExecutiveSummary page={page} />,
  definitions: ({ page }) => <DefinitionDistribution page={page} />,
  "score-method": ({ page }) => <ScoreMethod page={page} />,
  "score-distribution": ({ page }) => <ScoreDistribution page={page} />,
  leaderboard: ({ page, context }) => <LeaderboardTable page={page} density={context.density} />,
  "channel-gap": ({ page, anchorId }) => <ChannelGapPanel page={page} anchorId={anchorId} />,
  "intent-cards": ({ page }) => <IntentCards page={page} />,
  heatmap: ({ page, anchorId }) => <CapabilityHeatmap page={page} anchorId={anchorId} />,
  "self-audit": ({ page }) => <SelfAuditChecklist page={page} />,
  "vertical-snapshot": ({ page }) => <VerticalSnapshot page={page} />,
  "pricing-table": ({ page, context }) => <PricingObservedTable page={page} density={context.density} />,
  limitations: ({ page }) => <LimitationsPage page={page} />,
  patterns: ({ page, anchorId }) => <PatternCards page={page} anchorId={anchorId} />,
  cta: ({ page, anchorId }) => <ForwardLookingCTA page={page} anchorId={anchorId} />,
  appendix: ({ page, context }) => <AppendixCompanies page={page} density={context.density} />,
};

export function ReportPageRenderer({ page, context, anchorId }: RendererProps) {
  const Component = pageComponentMap[page.pageType] ?? ((props: RendererProps) => <EditorialPage page={props.page} />);
  return <>{Component({ page, context, anchorId })}</>;
}
