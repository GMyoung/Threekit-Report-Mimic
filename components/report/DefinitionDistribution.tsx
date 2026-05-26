import { buyingPaths } from "@/data/report/buying-paths";
import type { ReportPage } from "@/lib/report/page-types";
import { TextBlocks } from "@/components/report/TextBlocks";

export function DefinitionDistribution({ page }: { page: ReportPage }) {
  return (
    <div className="page-layout page-layout--split">
      <div className="distribution-list" aria-label="Distribution of primary buying paths">
        {buyingPaths.map((path) => (
          <article key={path.path}>
            <strong>{path.percent}%</strong>
            <div>
              <h3>{path.path}</h3>
              <p>{path.description}</p>
            </div>
          </article>
        ))}
      </div>
      <TextBlocks blocks={page.body} />
    </div>
  );
}
