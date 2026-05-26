import type { ReportPage } from "@/lib/report/page-types";
import { TextBlocks } from "@/components/report/TextBlocks";
import { ThreeSceneSlot } from "@/components/webgl/ThreeSceneSlot";

const gapData = [
  { label: "Channel-locked", median: 0.5, mean: 1.28, cohort: "N=46" },
  { label: "Direct / hybrid", median: 4.5, mean: 4.21, cohort: "N=37" },
];

export function ChannelGapPanel({ page, anchorId }: { page: ReportPage; anchorId: string }) {
  return (
    <div className="page-layout page-layout--split">
      <div className="gap-panel">
        {gapData.map((item) => (
          <article key={item.label}>
            <span>{item.cohort}</span>
            <h3>{item.label}</h3>
            <strong>{item.median.toFixed(2)} / 10</strong>
            <p>Mean = {item.mean.toFixed(2)}</p>
          </article>
        ))}
        <ThreeSceneSlot anchorId={anchorId} data={gapData} intensity="standard" scene="channel-gap" />
      </div>
      <TextBlocks blocks={page.body} />
    </div>
  );
}
