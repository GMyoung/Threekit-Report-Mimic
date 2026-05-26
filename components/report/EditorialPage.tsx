import type { ReportPage } from "@/lib/report/page-types";
import { TextBlocks } from "@/components/report/TextBlocks";

export function EditorialPage({ page }: { page: ReportPage }) {
  return (
    <div className="page-layout page-layout--prose">
      <TextBlocks blocks={page.body} />
      {page.pageType === "foreword" ? (
        <aside className="foreword-signature" aria-label="Foreword author">
          <div aria-hidden="true" />
          <strong>Matt Gorniak</strong>
          <span>CEO, Threekit</span>
        </aside>
      ) : null}
    </div>
  );
}
