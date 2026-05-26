"use client";

import type { ReportPage, ReportRenderContext } from "@/lib/report/page-types";
import { pageAnchor } from "@/lib/report/formatters";
import { pickTemplate } from "@/lib/report/template-picker";
import { sectionTheme } from "@/lib/report/section-theme";
import { PretextText } from "@/components/report/PretextText";
import { ReportPageRenderer } from "@/components/report/ReportPageRenderer";

const chapterNumbers = new Map([
  [18, "08"],
  [19, "09"],
  [20, "10"],
  [21, "11"],
  [22, "12"],
]);

const visualClassByType = {
  foreword: "chapter-section--foreword",
  leaderboard: "chapter-section--ranking-table",
  heatmap: "chapter-section--heatmap",
  "pricing-table": "chapter-section--price-table",
  appendix: "chapter-section--appendix",
  cta: "chapter-section--future-cta",
} as Partial<Record<ReportPage["pageType"], string>>;

function renderTitle(page: ReportPage) {
  const titleParts: Record<string, [string, string]> = {
    "pricing-observed": ["15 Manufacturers", "Showing Prices"],
    "companies-in-cohort": ["Companies", "in the Cohort"],
    "leader-patterns": ["Three Patterns", "From The Leaders"],
    "forward-looking-questions": ["Forward-Looking", "Questions"],
    "methodology-limitations": ["How We Audited,", "What We Measured, What We Didn't"],
  };
  const parts = titleParts[page.slug];
  if (!parts) return <PretextText text={page.title} wordBreak="keep-all" />;
  return (
    <>
      <span>{parts[0]}</span>
      <em>{parts[1]}</em>
    </>
  );
}

export function ReportSection({ page, context }: { page: ReportPage; context: ReportRenderContext }) {
  const template = pickTemplate(page);
  const anchorId = pageAnchor(page.pageNumber, page.slug);
  const theme = sectionTheme(page.pageNumber);
  const chapterNumber = chapterNumbers.get(page.pageNumber);
  const visualClass = visualClassByType[page.pageType] ?? "";

  return (
    <section
      className={`report-section chapter-section report-section--${page.pageType} report-section--theme-${theme} ${visualClass}`}
      data-page-id={page.id}
      data-page-type={page.pageType}
      data-search={page.sourceText.toLowerCase()}
      data-theme={theme}
      id={anchorId}
    >
      <div className="section-intro">
        <span className="section-kicker">{chapterNumber ? "Chapter" : `Section ${String(page.pageNumber).padStart(2, "0")}`}</span>
        {chapterNumber ? <span className="section-number">{chapterNumber}</span> : null}
        <p className="section-eyebrow">{page.eyebrow}</p>
        <h2>{renderTitle(page)}</h2>
        {page.subtitle ? <p className="section-subtitle">{page.subtitle}</p> : null}
        {template ? (
          <div className="template-note" aria-label="Template reference">
            <span>{template.source}</span>
            <strong>{template.name}</strong>
            <em>Three intensity {template.threeIntensity}</em>
          </div>
        ) : null}
      </div>
      <ReportPageRenderer anchorId={anchorId} page={page} context={context} />
      {context.showSources ? (
        <details className="source-ledger" open>
          <summary>Canonical extracted text and sources</summary>
          <p>{page.sourceText}</p>
          {page.sources?.length ? <small>Source refs: {page.sources.join(", ")}</small> : null}
        </details>
      ) : null}
    </section>
  );
}
