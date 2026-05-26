"use client";

import * as React from "react";
import { layoutWithLines, prepareWithSegments } from "@chenglou/pretext";

type PretextTextProps = {
  text: string;
  className?: string;
  lineClassName?: string;
  wordBreak?: "normal" | "keep-all";
};

function cssNumber(value: string, fallback = 0) {
  if (!value || value === "normal") return fallback;
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function computedFont(style: CSSStyleDeclaration) {
  return style.font || `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
}

export function PretextText({ text, className, lineClassName, wordBreak = "normal" }: PretextTextProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [lines, setLines] = React.useState<string[] | null>(null);

  React.useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    const layout = () => {
      const style = window.getComputedStyle(node);
      const width = Math.floor(node.getBoundingClientRect().width);
      if (!width) {
        setLines(null);
        return;
      }

      try {
        const prepared = prepareWithSegments(text, computedFont(style), {
          letterSpacing: cssNumber(style.letterSpacing),
          whiteSpace: "normal",
          wordBreak,
        });
        const result = layoutWithLines(prepared, width, cssNumber(style.lineHeight, cssNumber(style.fontSize, 16) * 1.4));
        setLines(result.lines.map((line) => line.text).filter(Boolean));
      } catch {
        setLines(null);
      }
    };

    layout();
    const resizeObserver = new ResizeObserver(layout);
    resizeObserver.observe(node);
    document.fonts?.ready.then(layout).catch(() => undefined);

    return () => resizeObserver.disconnect();
  }, [text, wordBreak]);

  return (
    <span className={`pretext-root${className ? ` ${className}` : ""}`} ref={ref} suppressHydrationWarning>
      {lines?.length
        ? lines.map((line, index) => (
            <React.Fragment key={`${line}-${index}`}>
              <span className={`pretext-line${lineClassName ? ` ${lineClassName}` : ""}`}>{line}</span>
              {index < lines.length - 1 ? "\n" : null}
            </React.Fragment>
          ))
        : text}
    </span>
  );
}
