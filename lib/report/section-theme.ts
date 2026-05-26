export type ReportSectionTheme = "cool" | "warm" | "light" | "dark";

export function sectionTheme(pageNumber: number): ReportSectionTheme {
  if (pageNumber >= 20 && pageNumber <= 21) return "dark";
  if ([5, 6, 7, 8, 14, 15, 16, 17, 18].includes(pageNumber)) return "warm";
  if ([9, 10, 11, 12, 13, 19].includes(pageNumber)) return "light";
  return "cool";
}
