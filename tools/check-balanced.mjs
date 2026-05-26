import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

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

  await page.goto("file:///E:/CodeX/Threekit-Report-Mimic/index.html");
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(1800);

  const data = await page.evaluate(() => ({
    hasPretext: Boolean(window.Pretext),
    pages: document.querySelectorAll(".report-page").length,
    pretextLines: document.querySelectorAll(".pretext-line").length,
    scale2: getComputedStyle(document.querySelector("#page-2"))
      .getPropertyValue("--content-scale")
      .trim(),
    scale18: getComputedStyle(document.querySelector("#page-18"))
      .getPropertyValue("--content-scale")
      .trim(),
    firstParagraphFont: getComputedStyle(document.querySelector("#page-2 .pretext-paragraph")).fontSize,
    bodyHeight: document.body.scrollHeight,
    fills: Array.from(document.querySelectorAll(".report-page")).map((page) => {
      const article = page.querySelector(".article-report");
      const canvas = page.querySelector(".page-canvas");
      return {
        page: page.dataset.page,
        scale: getComputedStyle(page).getPropertyValue("--content-scale").trim(),
        fill: article && canvas ? Number((article.scrollHeight / canvas.clientHeight).toFixed(3)) : null,
      };
    }),
  }));

  console.log(item.name, JSON.stringify({ data, errors }));
  await page.screenshot({
    path: `E:/CodeX/Threekit-Report-Mimic/source/${item.name}.png`,
    fullPage: false,
  });
  await page.close();
}

await browser.close();
