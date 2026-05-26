import fs from "fs/promises";
import path from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { createCanvas } = require("@napi-rs/canvas");

const pdfjs = await import(
  "file:///C:/Users/Harvey/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/.pnpm/pdfjs-dist@5.6.205/node_modules/pdfjs-dist/legacy/build/pdf.mjs"
);

const root = path.resolve(".");
const pdfPath = path.join(root, "source", "Threekit_Report_May2026.pdf");
const pagesDir = path.join(root, "assets", "pages");
const dataDir = path.join(root, "assets", "data");
const scale = 2;

await fs.mkdir(pagesDir, { recursive: true });
await fs.mkdir(dataDir, { recursive: true });

const data = new Uint8Array(await fs.readFile(pdfPath));
const loadingTask = pdfjs.getDocument({
  data,
  disableWorker: true,
  useSystemFonts: true,
});
const pdf = await loadingTask.promise;
const manifest = {
  title: "The State of Configurable Product Manufacturing Websites",
  source: "Threekit_Report_May2026.pdf",
  pageCount: pdf.numPages,
  scale,
  pages: [],
};

for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
  const page = await pdf.getPage(pageNumber);
  const viewport = page.getViewport({ scale });
  const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
  const canvasContext = canvas.getContext("2d");

  canvasContext.fillStyle = "#f7f7f0";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  await page.render({ canvasContext, viewport }).promise;

  const filename = `page-${String(pageNumber).padStart(2, "0")}.png`;
  await fs.writeFile(path.join(pagesDir, filename), canvas.toBuffer("image/png"));

  const textContent = await page.getTextContent({ includeMarkedContent: false });
  manifest.pages.push({
    number: pageNumber,
    width: viewport.width,
    height: viewport.height,
    image: `assets/pages/${filename}`,
    text: textContent.items
      .filter((item) => item.str && item.str.trim())
      .map((item) => ({
        value: item.str,
        x: item.transform[4] * scale,
        y: viewport.height - item.transform[5] * scale,
        width: item.width * scale,
        height: item.height * scale,
        fontName: item.fontName,
      })),
  });

  console.log(`Rendered page ${pageNumber}/${pdf.numPages}`);
}

await fs.writeFile(
  path.join(dataDir, "report-manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
);
