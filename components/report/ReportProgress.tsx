"use client";

export function ReportProgress({ progress }: { progress: number }) {
  return (
    <div className="report-progress" aria-hidden="true">
      <span style={{ transform: `scaleX(${Math.max(0, Math.min(1, progress))})` }} />
    </div>
  );
}
