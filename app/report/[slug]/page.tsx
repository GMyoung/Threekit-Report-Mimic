import { notFound } from "next/navigation";
import { reportPageBySlug, reportPages } from "@/data/report/report-pages";
import { ReportShell } from "@/components/report/ReportShell";

export function generateStaticParams() {
  return reportPages.map((page) => ({ slug: page.slug }));
}

export default async function ReportSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = reportPageBySlug.get(slug);
  if (!page) notFound();
  return <ReportShell initialPageId={page.id} pages={reportPages} />;
}
