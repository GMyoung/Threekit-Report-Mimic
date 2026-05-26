import type { ReportPage } from "@/lib/report/page-types";
import { TextBlocks } from "@/components/report/TextBlocks";
import { ThreeSceneSlot } from "@/components/webgl/ThreeSceneSlot";

const patterns = [
  "Tools, not just product pages",
  "A self-serve path next to the dealer path",
  "Price as a confidence signal, not an obstacle",
];

export function PatternCards({ page, anchorId }: { page: ReportPage; anchorId: string }) {
  return (
    <div className="page-layout page-layout--cards">
      <div className="pattern-grid">
        {patterns.map((pattern, index) => (
          <article key={pattern}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{pattern}</h3>
          </article>
        ))}
      </div>
      <ThreeSceneSlot anchorId={anchorId} data={patterns} intensity="subtle" scene="configurator" />
      <TextBlocks blocks={page.body} />
    </div>
  );
}
