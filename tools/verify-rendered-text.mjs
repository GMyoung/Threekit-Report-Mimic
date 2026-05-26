import { createRequire } from "module";
import fs from "fs/promises";
import path from "path";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const root = path.resolve(".");
const canonical = JSON.parse(
  await fs.readFile(path.join(root, "source", "canonical-extracted-text.json"), "utf8"),
);

function normalizeText(value) {
  return String(value)
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .replace(/\s+-\s+/g, "-")
    .replace(/quote-\s+request/g, "quote-request")
    .replace(/100-\s*company/g, "100-company")
    .trim();
}

function firstDiff(a, b) {
  const max = Math.max(a.length, b.length);
  for (let index = 0; index < max; index += 1) {
    if (a[index] !== b[index]) {
      return {
        index,
        expected: a.slice(Math.max(0, index - 90), index + 160),
        actual: b.slice(Math.max(0, index - 90), index + 160),
      };
    }
  }
  return null;
}

const browser = await chromium.launch({ headless: true, channel: "msedge" });
const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
const errors = [];
page.on("console", (message) => {
  if (message.type() === "error") errors.push(message.text());
});
page.on("pageerror", (error) => errors.push(error.message));

await page.goto("file:///E:/CodeX/Threekit-Report-Mimic/index.html");
await page.waitForLoadState("domcontentloaded");
await page.waitForTimeout(1200);

const rendered = await page.evaluate(() =>
  Array.from(document.querySelectorAll(".canonical-source"))
    .map((element) => ({
      number: Number(element.dataset.section),
      text: element.textContent || "",
    })),
);

const readable = await page.evaluate(() =>
  Array.from(document.querySelectorAll(".chapter-section"))
    .map((section) => ({
      number: Number(section.dataset.section),
      text: Array.from(section.querySelectorAll(".passage-card"))
        .map((element) => element.textContent || "")
        .join(" "),
    })),
);

await browser.close();

const missing = [];
const mismatches = [];
const readableMissing = [];
const readableMismatches = [];

for (const section of canonical.sections) {
  const renderedSection = rendered.find((item) => item.number === section.number);
  if (!renderedSection) {
    missing.push(section.number);
    continue;
  }

  const expected = normalizeText(section.text);
  const actual = normalizeText(renderedSection.text);
  if (expected !== actual) {
    mismatches.push({
      section: section.number,
      expectedLength: expected.length,
      actualLength: actual.length,
      diff: firstDiff(expected, actual),
    });
  }

  const readableSection = readable.find((item) => item.number === section.number);
  if (!readableSection) {
    readableMissing.push(section.number);
    continue;
  }

  const readableActual = normalizeText(readableSection.text);
  if (expected !== readableActual) {
    readableMismatches.push({
      section: section.number,
      expectedLength: expected.length,
      actualLength: readableActual.length,
      diff: firstDiff(expected, readableActual),
    });
  }
}

const result = {
  ok:
    missing.length === 0 &&
    mismatches.length === 0 &&
    readableMissing.length === 0 &&
    readableMismatches.length === 0 &&
    errors.length === 0,
  renderedSections: rendered.length,
  readableSections: readable.length,
  canonicalSections: canonical.sections.length,
  missing,
  mismatches,
  readableMissing,
  readableMismatches,
  errors,
};

await fs.writeFile(
  path.join(root, "source", "rendered-text-verify.json"),
  `${JSON.stringify(result, null, 2)}\n`,
);

console.log(JSON.stringify(result, null, 2));
process.exit(result.ok ? 0 : 1);
