"use client";

import * as React from "react";
import type { Density, ReportPage } from "@/lib/report/page-types";
import { pageAnchor } from "@/lib/report/formatters";
import { FullReportDrawer } from "@/components/report/FullReportDrawer";
import { ReportHeader } from "@/components/report/ReportHeader";
import { ReportNav } from "@/components/report/ReportNav";
import { ReportProgress } from "@/components/report/ReportProgress";
import { ReportSection } from "@/components/report/ReportSection";

export function ReportShell({ pages, initialPageId }: { pages: ReportPage[]; initialPageId?: string }) {
  const [density, setDensity] = React.useState<Density>("comfortable");
  const [showSources, setShowSources] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [activePageId, setActivePageId] = React.useState(initialPageId ?? pages[0]?.id);
  const [progress, setProgress] = React.useState(0);
  const [fullReportOpen, setFullReportOpen] = React.useState(false);

  React.useEffect(() => {
    document.documentElement.dataset.density = density;
  }, [density]);

  React.useEffect(() => {
    if (!initialPageId) return;
    const page = pages.find((item) => item.id === initialPageId);
    if (!page) return;
    window.requestAnimationFrame(() => {
      document.getElementById(pageAnchor(page.pageNumber, page.slug))?.scrollIntoView({ block: "start" });
    });
  }, [initialPageId, pages]);

  React.useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>(".report-section"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const id = visible?.target.getAttribute("data-page-id");
        if (id) setActivePageId(id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.2, 0.4, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pages]);

  React.useEffect(() => {
    const syncProgress = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total <= 0 ? 0 : window.scrollY / total);
    };
    syncProgress();
    window.addEventListener("scroll", syncProgress, { passive: true });
    window.addEventListener("resize", syncProgress);
    return () => {
      window.removeEventListener("scroll", syncProgress);
      window.removeEventListener("resize", syncProgress);
    };
  }, []);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (query) params.set("q", query);
    else params.delete("q");
    const next = params.toString() ? `?${params.toString()}` : window.location.pathname;
    window.history.replaceState(null, "", next);
  }, [query]);

  function navigate(page: ReportPage) {
    document.getElementById(pageAnchor(page.pageNumber, page.slug))?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function copyReport() {
    await navigator.clipboard.writeText(pages.map((page) => `${page.pageNumber}. ${page.title}\n${page.sourceText}`).join("\n\n"));
  }

  return (
    <div className="report-app" id="top">
      <ReportProgress progress={progress} />
      <ReportHeader
        density={density}
        onCopy={copyReport}
        onDensityChange={setDensity}
        onOpenFullReport={() => setFullReportOpen(true)}
        onQueryChange={setQuery}
        onSearchSelect={navigate}
        onSourceToggle={() => setShowSources((value) => !value)}
        pages={pages}
        query={query}
        showSources={showSources}
      />
      <div className="report-frame">
        <ReportNav activePageId={activePageId} onNavigate={navigate} pages={pages} />
        <main className="report-main" aria-label="Threekit report sections">
          {pages.map((page) => (
            <ReportSection
              context={{
                activePageId,
                density,
                query,
                showSources,
              }}
              key={page.id}
              page={page}
            />
          ))}
        </main>
      </div>
      <FullReportDrawer onOpenChange={setFullReportOpen} open={fullReportOpen} pages={pages} />
    </div>
  );
}
