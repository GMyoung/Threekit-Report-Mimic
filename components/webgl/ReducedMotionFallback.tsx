export function ReducedMotionFallback({ label = "Static report visual" }: { label?: string }) {
  return (
    <div className="scene-fallback" aria-hidden="true">
      <span />
      <strong>{label}</strong>
    </div>
  );
}
