import { pricingObserved, type PricingObservedRow } from "@/data/report/pricing-observed";
import type { Density, ReportPage, TableColumnSpec } from "@/lib/report/page-types";
import { ReportDataTable } from "@/components/report/ReportDataTable";

const columns: TableColumnSpec<PricingObservedRow>[] = [
  { id: "company", header: "Company" },
  { id: "vertical", header: "Vertical" },
  { id: "pricing", header: "Pricing observed" },
  { id: "bes", header: "BES", align: "right" },
];

export function PricingObservedTable({ page, density }: { page: ReportPage; density: Density }) {
  return (
    <div className="page-layout page-layout--table">
      <p className="price-intro">
        Of 84 audited manufacturer websites, 15 (15% of the 100-company cohort) display at least one product price without a transactional barrier. The
        67 others gate every dollar figure behind a quote form, dealer locator, or designer relationship.
      </p>
      <ReportDataTable data={pricingObserved} columns={columns} density={density} label="Pricing observed" leaderPredicate={(row) => row.bes >= 7} />
      <aside className="price-insight" aria-label="What the 15 share">
        <span>What the 15 share</span>
        <p>
          Across products that span $20 door locks and $407,100 motorhomes, the 15 price-visible manufacturers behave differently from the 67 that gate
          pricing in three respects. <em>They treat price as a confidence signal rather than an objection.</em>
        </p>
      </aside>
    </div>
  );
}
