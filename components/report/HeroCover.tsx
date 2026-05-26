import { reportMeta } from "@/data/report/report-meta";
import type { ReportPage } from "@/lib/report/page-types";
import { PretextText } from "@/components/report/PretextText";
import { ThreeSceneSlot } from "@/components/webgl/ThreeSceneSlot";

export function HeroCover({ page, anchorId }: { page: ReportPage; anchorId: string }) {
  return (
    <div className="page-layout page-layout--hero">
      <div className="hero-copy">
        <p>{reportMeta.date}</p>
        <h1>
          <PretextText text={reportMeta.title} wordBreak="keep-all" />
        </h1>
        <span>
          <PretextText text={reportMeta.subtitle} />
        </span>
        <small>
          {reportMeta.sponsor} | {reportMeta.website} | {reportMeta.contact}
        </small>
      </div>
      <ThreeSceneSlot
        anchorId={anchorId}
        data={{ title: page.title }}
        fallback={<div className="scene-fallback">Configurable product panels</div>}
        intensity="hero"
        scene="cover"
      />
    </div>
  );
}
