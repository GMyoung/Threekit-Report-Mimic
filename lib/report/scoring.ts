import { scoreComponents } from "@/data/report/score-components";

export function maxScore() {
  return scoreComponents.reduce((sum, item) => sum + item.weight, 0);
}

export function scoreBand(score: number) {
  if (score >= 7) return "leader";
  if (score >= 5) return "top-quartile";
  if (score >= 2.25) return "middle";
  if (score >= 1) return "low";
  return "bottom";
}
