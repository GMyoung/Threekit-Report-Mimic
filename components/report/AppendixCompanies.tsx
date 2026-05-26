import { companies, type CompanyRow } from "@/data/report/companies";
import type { Density, ReportPage } from "@/lib/report/page-types";
import { TextBlocks } from "@/components/report/TextBlocks";

export function AppendixCompanies({ page }: { page: ReportPage; density: Density }) {
  return (
    <div className="page-layout page-layout--appendix">
      <div className="company-panel" aria-label="Companies in the cohort">
        <ul className="company-grid">
          {companies.map((row: CompanyRow) => (
            <li data-excluded={row.excluded ? "true" : "false"} key={row.company}>
              {row.company}
            </li>
          ))}
        </ul>
      </div>
      <p className="appendix-note">* = company excluded from quantitative findings due to bot-block, JS-rendered shell, redirect, or SSL/connectivity error during the audit period.</p>
      <TextBlocks blocks={page.body?.slice(0, 2)} />
      <footer className="appendix-footer">
        <div>
          <strong>threekit</strong>
          <em>The State of Configurable Product Manufacturing Websites</em>
        </div>
        <div>
          <span>Contact</span>
          <a href="mailto:contact@threekit.com">contact@threekit.com</a>
          <a href="https://threekit.com">threekit.com</a>
        </div>
      </footer>
    </div>
  );
}
