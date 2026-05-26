export type PricingObservedRow = {
  company: string;
  vertical: string;
  pricing: string;
  bes: number;
};

export const pricingObserved: PricingObservedRow[] = [
  { company: "ClosetMaid", vertical: "Cabinets & Closets", pricing: "$149.99 - $602.94", bes: 7.5 },
  { company: "American Standard Brands", vertical: "Kitchen & Bath", pricing: "$387.40 (faucet)", bes: 7.5 },
  { company: "Yale Commercial", vertical: "Doors & Windows", pricing: "$99.99 - $309.99", bes: 7 },
  { company: "Jayco", vertical: "Powersports", pricing: "$17,318 - $407,100", bes: 7 },
  { company: "Schlage", vertical: "Doors & Windows", pricing: "$270 - $400", bes: 7 },
  { company: "Kraus USA", vertical: "Kitchen & Bath", pricing: "$364 - $6,058", bes: 5.5 },
  { company: "fireclay tile", vertical: "Flooring / Surfaces", pricing: "$13 - $34 / sq ft", bes: 6.5 },
  { company: "Waterworks", vertical: "Kitchen & Bath", pricing: "$449.95 - $649.95", bes: 6.5 },
  { company: "Sundance Spas", vertical: "Kitchen & Bath", pricing: "$4,999 - $26,999", bes: 6.5 },
  { company: "Hot Spring Spas", vertical: "Kitchen & Bath", pricing: "$12,798 - $109,390 (MSRP)", bes: 6.5 },
  { company: "The Shade Store", vertical: "Doors & Windows", pricing: "$0 - $16,000+ (5-tier)", bes: 2.5 },
  { company: "California Closets", vertical: "Cabinets & Closets", pricing: "$1,904 - $10,949 (tiered)", bes: 4.5 },
  { company: "Yamaha Motor USA", vertical: "Powersports", pricing: "$911 - $12,500", bes: 4.5 },
  { company: "DXV by American Standard", vertical: "Kitchen & Bath", pricing: "$20.99 - $329", bes: 3 },
  { company: "Kubota Tractor Corporation", vertical: "Heavy Machinery", pricing: "$17,318 - $407,100", bes: 4 },
];
