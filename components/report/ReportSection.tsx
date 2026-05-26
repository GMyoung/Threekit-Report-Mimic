"use client";

import type { ReportPage, ReportRenderContext } from "@/lib/report/page-types";
import { pageAnchor } from "@/lib/report/formatters";
import { pickTemplate } from "@/lib/report/template-picker";
import { sectionTheme } from "@/lib/report/section-theme";
import { PretextText } from "@/components/report/PretextText";
import { ReportPageRenderer } from "@/components/report/ReportPageRenderer";

export function ReportSection({ page, context }: { page: ReportPage; context: ReportRenderContext }) {
  const template = pickTemplate(page);
  const anchorId = pageAnchor(page.pageNumber, page.slug);
  const theme = sectionTheme(page.pageNumber);

  return (
    <section
      className={`report-section report-section--${page.pageType} report-section--theme-${theme}`}
      data-page-id={page.id}
      data-page-type={page.pageType}
      data-search={page.sourceText.toLowerCase()}
      data-theme={theme}
      id={anchorId}
    >
      <div className="section-intro">
        <span className="section-kicker">Section {String(page.pageNumber).padStart(2, "0")}</span>
        <p className="section-eyebrow">{page.eyebrow}</p>
        <h2>
          <PretextText text={page.title} wordBreak="keep-all" />
        </h2>
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
