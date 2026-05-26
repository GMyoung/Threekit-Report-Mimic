import { scoreComponents } from "@/data/report/score-components";
import type { ReportPage } from "@/lib/report/page-types";
import { TextBlocks } from "@/components/report/TextBlocks";

export function ScoreMethod({ page }: { page: ReportPage }) {
  return (
    <div className="page-layout page-layout--method">
      <div className="score-components" aria-label="Buyer Enablement Score components">
        {scoreComponents.map((component, index) => (
          <article key={component.key}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{component.label}</h3>
            <strong>{component.weight.toFixed(1)} pts</strong>
          </article>
        ))}
      </div>
      <TextBlocks blocks={page.body} />
    </div>
  );
}
