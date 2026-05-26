"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { ReportPage } from "@/lib/report/page-types";
import { searchPages } from "@/lib/report/search-index";

export function ReportSearch({
  pages,
  query,
  onQueryChange,
  onSelect,
}: {
  pages: ReportPage[];
  query: string;
  onQueryChange: (query: string) => void;
  onSelect?: (page: ReportPage) => void;
}) {
  const hits = searchPages(pages, query);
  return (
    <div className="report-search">
      <label>
        <span className="sr-only">Search report sections</span>
        <Search aria-hidden="true" size={16} />
        <Input aria-label="Search report sections" value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search report" />
      </label>
      <span aria-live="polite">{query ? `${hits.length} / ${pages.length} sections` : `${pages.length} sections`}</span>
      {query ? (
        <div className="report-search__results" role="listbox" aria-label="Search results">
          {hits.slice(0, 6).map((hit) => (
            <button key={hit.page.id} onClick={() => onSelect?.(hit.page)} type="button">
              <span>{String(hit.page.pageNumber).padStart(2, "0")}</span>
              {hit.page.title}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
