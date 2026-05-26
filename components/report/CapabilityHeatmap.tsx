import { capabilityColumns, heatScale, verticalCapabilities } from "@/data/report/vertical-capabilities";
import type { ReportPage } from "@/lib/report/page-types";
import { TextBlocks } from "@/components/report/TextBlocks";
import { ThreeSceneSlot } from "@/components/webgl/ThreeSceneSlot";

function heatClass(value: number) {
  return heatScale.find((scale) => value >= scale.min && value <= scale.max)?.className ?? "heat-zero";
}

export function CapabilityHeatmap({ page, anchorId }: { page: ReportPage; anchorId: string }) {
  return (
    <div className="page-layout page-layout--heatmap">
      <div className="heatmap-shell">
        <table aria-label="Six core verticals by five capabilities heatmap">
          <thead>
            <tr>
              <th>Vertical</th>
              {capabilityColumns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {verticalCapabilities.map((row) => (
              <tr key={row.vertical}>
                <th>{row.vertical}</th>
                {capabilityColumns.map((column) => {
                  const value = row[column.key];
                  return (
                    <td className={`heatmap-cell ${heatClass(value)}`} key={column.key}>
                      <span>{value}%</span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="heatmap-legend" aria-label="Heat scale">
          {heatScale.map((scale) => (
            <span className={scale.className} key={scale.label}>
              {scale.label}
            </span>
          ))}
        </div>
      </div>
      <ThreeSceneSlot anchorId={anchorId} data={verticalCapabilities} intensity="standard" scene="heatmap" />
      <TextBlocks blocks={page.body} />
    </div>
  );
}
