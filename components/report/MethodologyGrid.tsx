import { cohortMetrics } from "@/data/report/report-metrics";
import type { ReportPage } from "@/lib/report/page-types";
import { MetricGrid } from "@/components/report/MetricGrid";
import { TextBlocks } from "@/components/report/TextBlocks";

export function MethodologyGrid({ page }: { page: ReportPage }) {
  return (
    <div className="page-layout page-layout--method">
      <MetricGrid metrics={cohortMetrics} />
      <TextBlocks blocks={page.body} />
    </div>
  );
}
