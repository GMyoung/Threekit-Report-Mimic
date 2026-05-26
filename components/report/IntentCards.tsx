import type { ReportPage } from "@/lib/report/page-types";
import { TextBlocks } from "@/components/report/TextBlocks";

const intents = [
  ["Improve conversion", "Marketing / demand gen leaders"],
  ["Reduce time-to-quote", "Commercial / sales leaders"],
  ["Show product availability", "Product / CX leaders"],
  ["Modernize commerce", "Digital / transformation leaders"],
  ["Prioritize AI and configuration", "Executive and innovation teams"],
];

export function IntentCards({ page }: { page: ReportPage }) {
  return (
    <div className="page-layout page-layout--cards">
      <div className="intent-grid">
        {intents.map(([title, owner], index) => (
          <article key={title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{title}</h3>
            <p>{owner}</p>
          </article>
        ))}
      </div>
      <TextBlocks blocks={page.body} />
    </div>
  );
}
