"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import type { ReportPage } from "@/lib/report/page-types";

export function FullReportDrawer({
  pages,
  open,
  onOpenChange,
}: {
  pages: ReportPage[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent title="Full report text">
        <div className="full-report-drawer">
          {pages.map((page) => (
            <article key={page.id}>
              <h3>
                {String(page.pageNumber).padStart(2, "0")} {page.title}
              </h3>
              <p>{page.sourceText}</p>
            </article>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
