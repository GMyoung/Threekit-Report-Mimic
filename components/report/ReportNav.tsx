"use client";

import type { ReportPage } from "@/lib/report/page-types";

export function ReportNav({ pages, activePageId, onNavigate }: { pages: ReportPage[]; activePageId?: string; onNavigate: (page: ReportPage) => void }) {
  return (
    <nav className="report-nav" aria-label="Report sections">
      <span className="report-nav__label">Sections</span>
      {pages.map((page) => (
        <button
          className={activePageId === page.id ? "is-active" : undefined}
          key={page.id}
          onClick={() => onNavigate(page)}
          type="button"
        >
          <span>{String(page.pageNumber).padStart(2, "0")}</span>
          <strong>{page.title}</strong>
        </button>
      ))}
    </nav>
  );
}
