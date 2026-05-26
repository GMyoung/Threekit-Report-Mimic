import { pricingObserved, type PricingObservedRow } from "@/data/report/pricing-observed";
import type { Density, ReportPage, TableColumnSpec } from "@/lib/report/page-types";
import { ReportDataTable } from "@/components/report/ReportDataTable";
import { TextBlocks } from "@/components/report/TextBlocks";

const columns: TableColumnSpec<PricingObservedRow>[] = [
  { id: "company", header: "Company" },
  { id: "vertical", header: "Vertical" },
  { id: "pricing", header: "Pricing observed" },
  { id: "bes", header: "BES", align: "right" },
];

export function PricingObservedTable({ page, density }: { page: ReportPage; density: Density }) {
  return (
    <div className="page-layout page-layout--table">
      <ReportDataTable data={pricingObserved} columns={columns} density={density} label="Pricing observed table" leaderPredicate={(row) => row.bes >= 7} />
      <TextBlocks blocks={page.body} />
    </div>
  );
}
