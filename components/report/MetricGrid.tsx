import type { Metric } from "@/lib/report/page-types";

export function MetricGrid({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="metric-grid">
      {metrics.map((metric) => (
        <article className={`metric-card metric-card--${metric.emphasis ?? "neutral"}`} key={metric.label}>
          <div className="metric-card__value">
            {metric.value}
            {metric.suffix ? <span>{metric.suffix}</span> : null}
          </div>
          <h3>{metric.label}</h3>
          {metric.description ? <p>{metric.description}</p> : null}
          {metric.footnote ? <small>{metric.footnote}</small> : null}
        </article>
      ))}
    </div>
  );
}
