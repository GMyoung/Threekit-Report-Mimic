import { companies, type CompanyRow } from "@/data/report/companies";
import type { Density, ReportPage, TableColumnSpec } from "@/lib/report/page-types";
import { ReportDataTable } from "@/components/report/ReportDataTable";
import { TextBlocks } from "@/components/report/TextBlocks";

const columns: TableColumnSpec<CompanyRow>[] = [
  { id: "company", header: "Company" },
  { id: "excluded", header: "Excluded", accessor: (row) => (row.excluded ? "Yes" : "No") },
];

export function AppendixCompanies({ page, density }: { page: ReportPage; density: Density }) {
  return (
    <div className="page-layout page-layout--table">
      <ReportDataTable data={companies} columns={columns} density={density} label="Companies in the cohort" />
      <TextBlocks blocks={page.body?.slice(0, 2)} />
    </div>
  );
}
