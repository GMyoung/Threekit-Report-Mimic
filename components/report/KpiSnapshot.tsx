import { atAGlanceMetrics } from "@/data/report/report-metrics";
import type { ReportPage } from "@/lib/report/page-types";
import { MetricGrid } from "@/components/report/MetricGrid";
import { TextBlocks } from "@/components/report/TextBlocks";
import { ThreeSceneSlot } from "@/components/webgl/ThreeSceneSlot";

export function KpiSnapshot({ page, anchorId }: { page: ReportPage; anchorId: string }) {
  return (
    <div className="page-layout page-layout--dashboard">
      <MetricGrid metrics={atAGlanceMetrics} />
      <ThreeSceneSlot anchorId={anchorId} data={atAGlanceMetrics} intensity="subtle" scene="kpi" />
      <TextBlocks blocks={page.body} />
    </div>
  );
}
