export type BottomCohortRow = {
  vertical: string;
  audited: number;
  underOne: number;
  percent: number;
};

export const bottomCohort: BottomCohortRow[] = [
  { vertical: "Doors & Windows (corporate-only sites)", audited: 26, underOne: 9, percent: 35 },
  { vertical: "Kitchen & Bath / Plumbing", audited: 21, underOne: 2, percent: 10 },
  { vertical: "Cabinets & Closets (corporate-only sites)", audited: 7, underOne: 2, percent: 29 },
  { vertical: "Powersports", audited: 7, underOne: 2, percent: 29 },
  { vertical: "Heavy Machinery", audited: 5, underOne: 5, percent: 100 },
  { vertical: "Foodservice Equipment", audited: 5, underOne: 5, percent: 100 },
  { vertical: "Medical Equipment", audited: 4, underOne: 2, percent: 50 },
  { vertical: "Other verticals", audited: 4, underOne: 2, percent: 50 },
];
