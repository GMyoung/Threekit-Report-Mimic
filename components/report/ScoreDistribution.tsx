import { scoreDistributionMetrics } from "@/data/report/report-metrics";
import type { ReportPage } from "@/lib/report/page-types";
import { MetricGrid } from "@/components/report/MetricGrid";
import { TextBlocks } from "@/components/report/TextBlocks";

export function ScoreDistribution({ page }: { page: ReportPage }) {
  return (
    <div className="page-layout page-layout--dashboard">
      <MetricGrid metrics={scoreDistributionMetrics} />
      <TextBlocks blocks={page.body} />
    </div>
  );
}
