"use client";

import { Button } from "@/components/ui/button";
import type { Density } from "@/lib/report/page-types";

export function DensityToggle({ density, onDensityChange }: { density: Density; onDensityChange: (density: Density) => void }) {
  const options: Density[] = ["compact", "comfortable", "roomy"];
  return (
    <div className="segmented-control" aria-label="Text density">
      {options.map((option) => (
        <Button
          aria-pressed={density === option}
          key={option}
          onClick={() => onDensityChange(option)}
          type="button"
          variant={density === option ? "default" : "ghost"}
        >
          {option[0].toUpperCase() + option.slice(1)}
        </Button>
      ))}
    </div>
  );
}
