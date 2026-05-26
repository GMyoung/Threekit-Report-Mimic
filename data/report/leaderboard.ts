export type LeaderboardRow = {
  company: string;
  vertical: string;
  cfg: number;
  pri: number;
  ptp: number;
  bpa: number;
  qff: number;
  ai: number;
  gs: number;
  lc: number;
  cl: number;
  lt: number;
  total: number;
};

export const leaderboard: LeaderboardRow[] = [
  { company: "Yale Commercial", vertical: "Doors & Windows", cfg: 1, pri: 1.5, ptp: 0.5, bpa: 1.5, qff: 1, ai: 0, gs: 1, lc: 0.5, cl: 0.5, lt: 0, total: 7.5 },
  { company: "ClosetMaid", vertical: "Cabinets & Closets", cfg: 2, pri: 1.5, ptp: 0.5, bpa: 1.5, qff: 1, ai: 0, gs: 1, lc: 0, cl: 0, lt: 0, total: 7.5 },
  { company: "Schlage", vertical: "Doors & Windows", cfg: 1, pri: 1.5, ptp: 0.5, bpa: 1.5, qff: 1, ai: 0, gs: 1, lc: 0.5, cl: 0, lt: 0, total: 7 },
  { company: "American Standard Brands", vertical: "Kitchen & Bath", cfg: 1, pri: 1.5, ptp: 0.5, bpa: 1, qff: 1, ai: 0, gs: 1, lc: 0.5, cl: 0.5, lt: 0, total: 7 },
  { company: "Kraus USA", vertical: "Kitchen & Bath", cfg: 0, pri: 1.5, ptp: 0.5, bpa: 1.5, qff: 1, ai: 0, gs: 1, lc: 0.5, cl: 0.5, lt: 0, total: 6.5 },
  { company: "fireclay tile", vertical: "Flooring / Surfaces", cfg: 2, pri: 1.5, ptp: 0.5, bpa: 1, qff: 1, ai: 0, gs: 0, lc: 0.5, cl: 0, lt: 0, total: 6.5 },
  { company: "Hot Spring Spas", vertical: "Kitchen & Bath", cfg: 1, pri: 1.5, ptp: 0.5, bpa: 1.5, qff: 1, ai: 0, gs: 1, lc: 0, cl: 0, lt: 0, total: 6.5 },
];
