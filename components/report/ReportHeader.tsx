"use client";

import { Copy, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { reportMeta } from "@/data/report/report-meta";
import type { Density, ReportPage } from "@/lib/report/page-types";
import { DensityToggle } from "@/components/report/DensityToggle";
import { ReportSearch } from "@/components/report/ReportSearch";
import { SourceToggle } from "@/components/report/SourceToggle";

export function ReportHeader({
  pages,
  query,
  density,
  showSources,
  onQueryChange,
  onDensityChange,
  onSourceToggle,
  onCopy,
  onOpenFullReport,
  onSearchSelect,
}: {
  pages: ReportPage[];
  query: string;
  density: Density;
  showSources: boolean;
  onQueryChange: (query: string) => void;
  onDensityChange: (density: Density) => void;
  onSourceToggle: () => void;
  onCopy: () => void;
  onOpenFullReport: () => void;
  onSearchSelect: (page: ReportPage) => void;
}) {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Threekit report home">
        <span className="brand-mark" aria-hidden="true" />
        <span>Threekit</span>
      </a>
      <div className="site-header__meta">
        <strong>{reportMeta.title}</strong>
        <span>{reportMeta.date}</span>
      </div>
      <ReportSearch pages={pages} query={query} onQueryChange={onQueryChange} onSelect={onSearchSelect} />
      <div className="site-header__actions">
        <Button onClick={onCopy} type="button" variant="outline">
          <Copy aria-hidden="true" size={16} />
          Copy report text
        </Button>
        <SourceToggle showSources={showSources} onToggle={onSourceToggle} />
        <DensityToggle density={density} onDensityChange={onDensityChange} />
        <Button onClick={onOpenFullReport} type="button">
          <FileText aria-hidden="true" size={16} />
          Full report
        </Button>
      </div>
    </header>
  );
}
