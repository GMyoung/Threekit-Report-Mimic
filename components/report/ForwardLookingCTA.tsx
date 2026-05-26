import type { ReportPage } from "@/lib/report/page-types";
import { TextBlocks } from "@/components/report/TextBlocks";
import { ThreeSceneSlot } from "@/components/webgl/ThreeSceneSlot";

const questions = ["Buyer-side reality", "Dealer-channel impact", "Conversion outcomes"];

export function ForwardLookingCTA({ page, anchorId }: { page: ReportPage; anchorId: string }) {
  return (
    <div className="page-layout page-layout--cta">
      <div className="cta-panel">
        {questions.map((question, index) => (
          <article key={question}>
            <span>Question {String(index + 1).padStart(2, "0")}</span>
            <h3>{question}</h3>
          </article>
        ))}
        <a href="mailto:contact@threekit.com">contact@threekit.com</a>
      </div>
      <ThreeSceneSlot anchorId={anchorId} data={questions} intensity="hero" scene="cta-orbit" />
      <TextBlocks blocks={page.body} />
    </div>
  );
}
