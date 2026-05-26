import type { ReportPage } from "@/lib/report/page-types";
import { reportPages } from "@/data/report/report-pages";
import { pageAnchor } from "@/lib/report/formatters";
import { TextBlocks } from "@/components/report/TextBlocks";

export function ContentsGrid({ page }: { page: ReportPage }) {
  return (
    <div className="page-layout page-layout--contents">
      <div className="contents-grid">
        {reportPages.slice(1).map((item) => (
          <a href={`#${pageAnchor(item.pageNumber, item.slug)}`} key={item.id}>
            <span>{String(item.pageNumber).padStart(2, "0")}</span>
            <strong>{item.title}</strong>
            <em>{item.chapter}</em>
          </a>
        ))}
      </div>
      <TextBlocks blocks={page.body?.slice(0, 2)} />
    </div>
  );
}
