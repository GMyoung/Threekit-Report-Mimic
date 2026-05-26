export const scoreComponents = [
  { key: "cfg", label: "Configurator presence", weight: 2.0 },
  { key: "pri", label: "Pricing visibility", weight: 1.5 },
  { key: "ptp", label: "Path-to-price", weight: 0.5 },
  { key: "bpa", label: "Primary buying path", weight: 1.5 },
  { key: "qff", label: "Quote-form friction", weight: 1.0 },
  { key: "ai", label: "AI features", weight: 1.0 },
  { key: "gs", label: "Guided selling flow", weight: 1.0 },
  { key: "lc", label: "Live chat / AI assistant", weight: 0.5 },
  { key: "cl", label: "Customer logos visible", weight: 0.5 },
  { key: "lt", label: "Lead-time disclosed", weight: 0.5 },
];

export function totalScore(parts: Record<string, number>) {
  return scoreComponents.reduce((sum, component) => sum + (parts[component.key] || 0), 0);
}
