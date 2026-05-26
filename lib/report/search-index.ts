import type { ReportPage } from "@/lib/report/page-types";

export type SearchHit = {
  page: ReportPage;
  score: number;
};

export function searchPages(pages: ReportPage[], query: string): SearchHit[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return pages.map((page) => ({ page, score: 1 }));

  const tokens = normalized.split(/\s+/).filter(Boolean);
  return pages
    .map((page) => {
      const haystack = [
        page.title,
        page.subtitle,
        page.eyebrow,
        page.chapter,
        page.sourceText,
        ...(page.dataRefs ?? []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const score = tokens.reduce((sum, token) => sum + (haystack.includes(token) ? 1 : 0), 0);
      return { page, score };
    })
    .filter((hit) => hit.score > 0)
    .sort((a, b) => b.score - a.score || a.page.pageNumber - b.page.pageNumber);
}
