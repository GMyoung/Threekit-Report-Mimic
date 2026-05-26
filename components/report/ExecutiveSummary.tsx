import { atAGlanceMetrics } from "@/data/report/report-metrics";
import type { ReportPage } from "@/lib/report/page-types";
import { MetricGrid } from "@/components/report/MetricGrid";
import { TextBlocks } from "@/components/report/TextBlocks";

export function ExecutiveSummary({ page }: { page: ReportPage }) {
  return (
    <div className="page-layout page-layout--dashboard">
      <MetricGrid metrics={atAGlanceMetrics} />
      <TextBlocks blocks={page.body} />
    </div>
  );
}
