"use client";

import * as React from "react";
import { ReducedMotionFallback } from "@/components/webgl/ReducedMotionFallback";

export class SceneBoundary extends React.Component<{ children: React.ReactNode; label?: string }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return <ReducedMotionFallback label={this.props.label} />;
    return this.props.children;
  }
}
