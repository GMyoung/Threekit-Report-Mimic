"use client";

import { Button } from "@/components/ui/button";

export function SourceToggle({ showSources, onToggle }: { showSources: boolean; onToggle: () => void }) {
  return (
    <Button aria-pressed={showSources} onClick={onToggle} type="button" variant={showSources ? "default" : "outline"}>
      {showSources ? "Hide sources" : "Show sources"}
    </Button>
  );
}
