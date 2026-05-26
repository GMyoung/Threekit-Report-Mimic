import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const browser = await chromium.launch({ headless: true, channel: "msedge" });
const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
await page.goto("file:///E:/CodeX/Threekit-Report-Mimic/index.html");
await page.locator("#page-2").scrollIntoViewIfNeeded();
await page.waitForTimeout(700);

const data = await page.evaluate(() => ({
  lines: Array.from(document.querySelectorAll("#page-2 .pretext-line"))
    .slice(0, 12)
    .map((line) => line.textContent),
  maxLine: Math.max(
    ...Array.from(document.querySelectorAll("#page-2 .pretext-line")).map(
      (line) => line.textContent.length,
    ),
  ),
}));

console.log(JSON.stringify(data));
await page.screenshot({
  path: "E:/CodeX/Threekit-Report-Mimic/source/pretext-page-2.png",
  fullPage: false,
});

await page.goto("file:///E:/CodeX/Threekit-Report-Mimic/index.html#page-18");
await page.waitForTimeout(700);
await page.locator("#searchInput").fill("pricing");
await page.waitForTimeout(400);
const smoke = await page.evaluate(() => ({
  hasPretext: Boolean(window.Pretext),
  pages: document.querySelectorAll(".report-page").length,
  pretextLines: document.querySelectorAll(".pretext-line").length,
  pageMatches: document.querySelectorAll(".search-page-match").length,
  active: document.querySelector("#pageCount").value,
  copyButtons: document.querySelectorAll(".copy-page").length,
}));
console.log(JSON.stringify(smoke));
await browser.close();
