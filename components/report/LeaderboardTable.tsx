import { bottomCohort, type BottomCohortRow } from "@/data/report/bottom-cohort";
import { leaderboard, type LeaderboardRow } from "@/data/report/leaderboard";
import type { Density, ReportPage, TableColumnSpec } from "@/lib/report/page-types";
import { ReportDataTable } from "@/components/report/ReportDataTable";
import { TextBlocks } from "@/components/report/TextBlocks";

const columns: TableColumnSpec<LeaderboardRow>[] = [
  { id: "company", header: "Company" },
  { id: "vertical", header: "Vertical" },
  { id: "cfg", header: "Cfg", align: "right" },
  { id: "pri", header: "Pri", align: "right" },
  { id: "ptp", header: "Ptp", align: "right" },
  { id: "bpa", header: "Bpa", align: "right" },
  { id: "qff", header: "Qff", align: "right" },
  { id: "total", header: "Total", align: "right" },
];

const bottomColumns: TableColumnSpec<BottomCohortRow>[] = [
  { id: "vertical", header: "Vertical" },
  { id: "audited", header: "Audited", align: "right" },
  { id: "underOne", header: "Under 1.0", align: "right" },
  {
    id: "percent",
    header: "% under 1.0",
    align: "right",
    accessor: (row) => `${row.percent}%`,
  },
];

export function LeaderboardTable({ page, density }: { page: ReportPage; density: Density }) {
  return (
    <div className="page-layout page-layout--table">
      <ReportDataTable data={leaderboard} columns={columns} density={density} label="Buyer Enablement Score leaderboard" leaderPredicate={(row) => row.total >= 7} />
      <ReportDataTable data={bottomCohort} columns={bottomColumns} density={density} label="Bottom cohort by vertical" leaderPredicate={(row) => row.percent >= 50} />
      <TextBlocks blocks={page.body} />
    </div>
  );
}
