import fs from "fs/promises";
import path from "path";

const root = path.resolve(".");
const files = [
  "vendor/pretext/dist/generated/bidi-data.js",
  "vendor/pretext/dist/analysis.js",
  "vendor/pretext/dist/measurement.js",
  "vendor/pretext/dist/line-break.js",
  "vendor/pretext/dist/line-text.js",
  "vendor/pretext/dist/bidi.js",
  "vendor/pretext/dist/layout.js",
];

function toScript(source) {
  return source
    .replace(/import[\s\S]*?from\s+['"][^'"]+['"];?\r?\n/g, "")
    .replace(/\bexport\s+(function|const|let|var|class)\s+/g, "$1 ")
    .replace(/\bexport\s*\{[^}]*\};?\s*/g, "");
}

function avoidModuleLocalCollisions(file, source) {
  if (file.endsWith("measurement.js")) {
    return source
      .replaceAll("sharedGraphemeSegmenter", "measurementSharedGraphemeSegmenter")
      .replaceAll("getSharedGraphemeSegmenter", "getMeasurementSharedGraphemeSegmenter");
  }

  if (file.endsWith("line-text.js")) {
    return source
      .replaceAll("sharedGraphemeSegmenter", "lineTextSharedGraphemeSegmenter")
      .replaceAll("getSharedGraphemeSegmenter", "getLineTextSharedGraphemeSegmenter");
  }

  return source;
}

let output = `/* Bundled from @chenglou/pretext 0.0.7 for file:// static use. */\n`;
output += `(function () {\n`;
output += `"use strict";\n`;

for (const file of files) {
  const source = avoidModuleLocalCollisions(file, await fs.readFile(path.join(root, file), "utf8"));
  output += `\n/* ${file} */\n`;
  output += toScript(source);
  output += "\n";
}

output += `
window.Pretext = {
  prepareWithSegments,
  layoutWithLines,
  measureLineStats,
  measureNaturalWidth,
  clearCache,
};
})();\n`;

await fs.mkdir(path.join(root, "assets/js"), { recursive: true });
await fs.writeFile(path.join(root, "assets/js/pretext.bundle.js"), output);
console.log("Wrote assets/js/pretext.bundle.js");
