import { createRequire } from "module";
import fs from "fs/promises";
import path from "path";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const root = path.resolve(".");
const url = `file:///${root.replace(/\\/g, "/")}/index.html`;
const output = {
  ok: true,
  viewports: [],
  interactions: {},
  errors: [],
};

async function inspectViewport(browser, name, viewport) {
  const page = await browser.newPage({ viewport });
  page.on("console", (message) => {
    if (message.type() === "error") output.errors.push(`${name}: ${message.text()}`);
  });
  page.on("pageerror", (error) => output.errors.push(`${name}: ${error.message}`));

  await page.goto(url);
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(1000);

  const data = await page.evaluate(() => {
    const bodyWidth = document.documentElement.scrollWidth;
    const viewportWidth = window.innerWidth;
    return {
      sections: document.querySelectorAll(".chapter-section").length,
      canonicalSources: document.querySelectorAll(".canonical-source").length,
      pretextBlocks: document.querySelectorAll(".pretext-copy").length,
      pretextLines: document.querySelectorAll(".pretext-copy span").length,
      copySeparatorBlocks: Array.from(document.querySelectorAll(".passage-card")).filter((element) =>
        /\n/.test(element.textContent || ""),
      ).length,
      sourceVisible: Array.from(document.querySelectorAll(".source-ledger")).some(
        (element) => getComputedStyle(element).display !== "none",
      ),
      overlaps: Array.from(document.querySelectorAll(".chapter-section"))
        .map((section) => {
          const title = section.querySelector(".chapter-intro");
          const body = section.querySelector(".chapter-body");
          if (!title || !body) return null;
          const a = title.getBoundingClientRect();
          const b = body.getBoundingClientRect();
          const overlapX = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
          const overlapY = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
          return overlapX > 1 && overlapY > 1
            ? { section: Number(section.dataset.section), overlapX, overlapY }
            : null;
        })
        .filter(Boolean),
      bodyWidth,
      viewportWidth,
      overflowX: bodyWidth > viewportWidth + 1,
    };
  });

  await page.screenshot({ path: path.join(root, "source", `smoke-${name}.png`), fullPage: true });
  await page.close();
  output.viewports.push({ name, ...data });
  if (
    data.overflowX ||
    data.overlaps.length ||
    data.sections !== 22 ||
    data.canonicalSources !== 22 ||
    data.pretextLines < 50
  ) {
    output.ok = false;
  }
}

async function inspectInteractions(browser) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  page.on("console", (message) => {
    if (message.type() === "error") output.errors.push(`interactions: ${message.text()}`);
  });
  page.on("pageerror", (error) => output.errors.push(`interactions: ${error.message}`));

  await page.goto(url);
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(800);
  await page.fill("#reportSearch", "pricing");
  await page.click('[data-density="roomy"]');
  await page.click("#toggleSources");
  await page.waitForTimeout(500);

  output.interactions = await page.evaluate(() => ({
    searchCount: document.querySelector("#searchCount")?.textContent,
    density: document.documentElement.dataset.density,
    sourcesOpen: Array.from(document.querySelectorAll(".source-ledger")).filter((element) => element.open).length,
    sourceTogglePressed: document.querySelector("#toggleSources")?.getAttribute("aria-pressed"),
    searchHits: document.querySelectorAll(".chapter-section.is-search-hit").length,
  }));

  await page.close();
  if (
    output.interactions.density !== "roomy" ||
    output.interactions.sourcesOpen !== 22 ||
    output.interactions.sourceTogglePressed !== "true" ||
    output.interactions.searchHits < 1
  ) {
    output.ok = false;
  }
}

const browser = await chromium.launch({ headless: true, channel: "msedge" });
await inspectViewport(browser, "wide", { width: 2048, height: 1100 });
await inspectViewport(browser, "desktop", { width: 1440, height: 1100 });
await inspectViewport(browser, "mobile", { width: 390, height: 1000 });
await inspectInteractions(browser);
await browser.close();

if (output.errors.length) output.ok = false;
await fs.writeFile(path.join(root, "source", "site-smoke.json"), `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify(output, null, 2));
process.exit(output.ok ? 0 : 1);
