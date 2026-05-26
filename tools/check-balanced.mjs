import { createRequire } from "module";
import path from "path";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const root = path.resolve(".");
const url = `file:///${root.replace(/\\/g, "/")}/index.html`;

const browser = await chromium.launch({ headless: true, channel: "msedge" });

for (const item of [
  { name: "balanced-desktop", width: 1440, height: 1200 },
  { name: "balanced-mobile", width: 390, height: 900 },
]) {
  const errors = [];
  const page = await browser.newPage({ viewport: { width: item.width, height: item.height } });
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await page.goto(url);
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(1800);

  const data = await page.evaluate(() => ({
    hasPretext: Boolean(window.Pretext),
    sections: document.querySelectorAll(".chapter-section").length,
    citationLists: document.querySelectorAll(".citation-list").length,
    citations: document.querySelectorAll(".citation-list li").length,
    pretextBlocks: document.querySelectorAll(".pretext-copy").length,
    pretextLines: document.querySelectorAll(".pretext-copy span").length,
    firstParagraphFont: getComputedStyle(document.querySelector(".passage-card")).fontSize,
    bodyHeight: document.body.scrollHeight,
    fills: Array.from(document.querySelectorAll(".chapter-section")).map((section) => {
      const intro = section.querySelector(".chapter-intro");
      const body = section.querySelector(".chapter-body");
      return {
        section: section.dataset.section,
        pageType: section.dataset.pageType,
        introHeight: intro ? Math.round(intro.getBoundingClientRect().height) : null,
        bodyHeight: body ? Math.round(body.getBoundingClientRect().height) : null,
      };
    }),
  }));

  console.log(item.name, JSON.stringify({ data, errors }));
  await page.screenshot({
    path: path.join(root, "source", `${item.name}.png`),
    fullPage: false,
  });
  await page.close();
}

await browser.close();
