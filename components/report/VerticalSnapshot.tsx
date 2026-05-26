import { verticalSnapshots } from "@/data/report/vertical-snapshots";
import type { ReportPage } from "@/lib/report/page-types";
import { TextBlocks } from "@/components/report/TextBlocks";

export function VerticalSnapshot({ page }: { page: ReportPage }) {
  const groups =
    page.pageNumber === 15
      ? verticalSnapshots.slice(0, 1)
      : page.pageNumber === 16
        ? verticalSnapshots.slice(1, 4)
        : verticalSnapshots.slice(4);

  return (
    <div className="page-layout page-layout--cards">
      <div className="vertical-grid">
        {groups.map((snapshot) => (
          <article key={snapshot.group}>
            <p>{snapshot.audited}</p>
            <h3>{snapshot.group}</h3>
            <strong>Median BES {snapshot.median}</strong>
            <span>Best: {snapshot.leader} ({snapshot.bestScore})</span>
            <ul>
              {snapshot.stats.map((stat) => (
                <li key={stat}>{stat}</li>
              ))}
            </ul>
            <p>{snapshot.insight}</p>
          </article>
        ))}
      </div>
      <TextBlocks blocks={page.body} />
    </div>
  );
}
