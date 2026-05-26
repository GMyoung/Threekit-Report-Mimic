export const heatScale = [
  { label: "0%", min: 0, max: 0, className: "heat-zero" },
  { label: "1-15%", min: 1, max: 15, className: "heat-low" },
  { label: "16-40%", min: 16, max: 40, className: "heat-mid" },
  { label: "41-70%", min: 41, max: 70, className: "heat-high" },
  { label: "71-100%", min: 71, max: 100, className: "heat-top" },
];

export const verticalCapabilities = [
  { vertical: "Doors & Windows", configurator: 19, pricing: 12, ai: 8, guidedSelling: 12, channelLocked: 54 },
  { vertical: "Kitchen & Bath / Plumbing", configurator: 38, pricing: 38, ai: 10, guidedSelling: 29, channelLocked: 33 },
  { vertical: "Cabinets & Closets", configurator: 71, pricing: 29, ai: 14, guidedSelling: 43, channelLocked: 29 },
  { vertical: "Contract Furniture", configurator: 100, pricing: 0, ai: 0, guidedSelling: 100, channelLocked: 50 },
  { vertical: "Custom Uniforms / PPE", configurator: 33, pricing: 0, ai: 0, guidedSelling: 33, channelLocked: 0 },
  { vertical: "Medical & Dental", configurator: 25, pricing: 0, ai: 25, guidedSelling: 25, channelLocked: 75 },
];

export const capabilityColumns = [
  { key: "configurator", label: "Configurator" },
  { key: "pricing", label: "Visible pricing" },
  { key: "ai", label: "AI / chat" },
  { key: "guidedSelling", label: "Guided selling" },
  { key: "channelLocked", label: "Channel-locked" },
] as const;
