import fs from "fs/promises";
import path from "path";

const root = path.resolve(".");
const manifest = JSON.parse(
  await fs.readFile(path.join(root, "assets/data/report-manifest.json"), "utf8"),
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

const sections = manifest.pages.map((page) => {
  const raw = page.text.map((item) => item.value).join(" ");
  return {
    number: page.number,
    text: normalizeText(raw),
  };
});

const canonical = sections
  .map((section) => `[[SECTION ${String(section.number).padStart(2, "0")}]]\n${section.text}`)
  .join("\n\n");

await fs.writeFile(path.join(root, "source", "canonical-extracted-text.txt"), `${canonical}\n`);
await fs.writeFile(
  path.join(root, "source", "canonical-extracted-text.json"),
  `${JSON.stringify({ sections }, null, 2)}\n`,
);

console.log(`Wrote ${sections.length} canonical sections`);
