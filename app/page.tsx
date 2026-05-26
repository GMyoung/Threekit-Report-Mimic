import { reportPages } from "@/data/report/report-pages";
import { ReportShell } from "@/components/report/ReportShell";

export default function HomePage() {
  return <ReportShell pages={reportPages} />;
}
