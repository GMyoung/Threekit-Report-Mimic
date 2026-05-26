import type { ReportPage } from "@/lib/report/page-types";
import { TextBlocks } from "@/components/report/TextBlocks";

const questions = [
  "Can a buyer understand what you sell within 5 seconds of landing?",
  "Can a buyer get a ballpark price without a sales call?",
  "Is lead time visible on at least one product page?",
  "Do you show recent customers by name?",
  "Can a buyer configure or visualize before talking to anyone?",
  "Is a guided-selling quiz reachable from the homepage?",
  "Does the site explain how AI helps buyers?",
  "Can a buyer request a quote in eight fields or fewer?",
  "Is there a path next to Find a Dealer?",
  "Can the buyer leave with a next step?",
];

export function SelfAuditChecklist({ page }: { page: ReportPage }) {
  return (
    <div className="page-layout page-layout--checklist">
      <ol className="checklist">
        {questions.map((question, index) => (
          <li key={question}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {question}
          </li>
        ))}
      </ol>
      <TextBlocks blocks={page.body} />
    </div>
  );
}
