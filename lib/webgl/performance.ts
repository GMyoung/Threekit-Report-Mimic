export function getPreferredDpr() {
  if (typeof window === "undefined") return 1;
  const mobile = window.matchMedia("(max-width: 760px)").matches;
  return Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.25);
}

export function shouldUseHeavyScene() {
  if (typeof window === "undefined") return false;
  return !window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 640px)").matches;
}
