const manifest = window.REPORT_MANIFEST;
const {
  layoutWithLines,
  measureLineStats,
  prepareWithSegments,
} = window.Pretext;

const longform = document.querySelector("#reportLongform");
const chapterRail = document.querySelector("#chapterRail");
const siteNav = document.querySelector("#siteNav");
const copyReport = document.querySelector("#copyReport");
const densityButtons = Array.from(document.querySelectorAll("[data-density]"));
const toggleSources = document.querySelector("#toggleSources");
const reportSearch = document.querySelector("#reportSearch");
const searchCount = document.querySelector("#searchCount");
const readingProgress = document.querySelector("#readingProgress");
const preparedText = new WeakMap();

const chapterTitles = [
  "Cover",
  "At a glance",
  "Foreword",
  "How and why we ran this audit",
  "What's in this report?",
  "What 100 manufacturer websites tell you",
  "What 100 manufacturer websites tell you",
  "One number that ranks the category",
  "How a 7.50 actually breaks down",
  "Buyer Enablement Score leaderboard",
  "A 9x score gap",
  "Five intents, five data cuts",
  "Six core verticals x five capabilities",
  "Run the same audit on the homepage",
  "Six core verticals in depth",
  "Kitchen & bath / plumbing",
  "Medical & dental equipment",
  "15 manufacturers showing prices",
  "How we audited",
  "Three patterns from the leaders",
  "Forward-looking questions",
  "Companies in the cohort",
];

const pageBlueprints = [
  { type: "cover", refs: ["A1", "A2", "A3"], selected: "A2", components: ["hero", "title block", "subtitle", "date", "logo"] },
  { type: "kpi-summary", refs: ["B1", "B3", "E3"], selected: "B1", components: ["stat cards", "trend chart", "highlight list"] },
  { type: "foreword", refs: ["C1", "C2", "C3"], selected: "C1", components: ["author meta", "lead paragraph", "long copy"] },
  { type: "research-method", refs: ["D1", "D2", "D3"], selected: "D2", components: ["hero intro", "feature grid", "notes"] },
  { type: "contents", refs: ["D2", "H2", "B2"], selected: "D2", components: ["chapter nav", "subsection list", "progress marker"] },
  { type: "executive-summary", refs: ["B1", "I3", "J1"], selected: "I3", components: ["summary cards", "main chart", "key bullets"] },
  { type: "definition-explainer", refs: ["G3", "G5", "G2"], selected: "G3", components: ["bar chart", "callout notes", "definitions"] },
  { type: "scoring-method", refs: ["E2", "G4", "E1"], selected: "E2", components: ["stepper", "methodology diagram", "radar"] },
  { type: "distribution-example", refs: ["G3", "G6", "G2"], selected: "G3", components: ["chart", "annotation", "worked example"] },
  { type: "ranking-table", refs: ["F1", "F2", "F3"], selected: "F1", components: ["table", "filters", "sort", "pagination"] },
  { type: "comparison", refs: ["B1", "G3", "J1"], selected: "G3", components: ["kpi cards", "comparison bars", "insight callout"] },
  { type: "intent-cards", refs: ["A2", "D1", "B2"], selected: "B2", components: ["grouped cards", "icons", "short copy"] },
  { type: "heatmap", refs: ["G1", "G2", "J1"], selected: "G2", components: ["heatmap", "legend", "tooltip", "explanation panel"] },
  { type: "self-audit", refs: ["E2", "I1", "E3"], selected: "E2", components: ["checklist", "progress state", "sticky summary"] },
  { type: "vertical-deep-dive", refs: ["F1", "H4", "H3"], selected: "H3", components: ["ranked table", "filters", "detail pane"] },
  { type: "vertical-deep-dive", refs: ["J1", "C3", "E1"], selected: "J1", components: ["section intro", "infographic", "ranked callouts"] },
  { type: "vertical-deep-dive", refs: ["J1", "H3", "C3"], selected: "J1", components: ["deep-dive modules", "comparison cards"] },
  { type: "price-table", refs: ["J2", "F3", "B3"], selected: "F3", components: ["chapter opener", "price table", "notes"] },
  { type: "limitations", refs: ["D2", "D1", "C1"], selected: "D2", components: ["prose", "inline lists", "note blocks"] },
  { type: "conclusion", refs: ["A3", "A2", "J1"], selected: "A3", components: ["conclusion headline", "insight cards"] },
  { type: "future-cta", refs: ["A2", "J2", "D1"], selected: "A2", components: ["future questions", "CTA block", "contact link"] },
  { type: "appendix", refs: ["D2", "H1", "F3"], selected: "D2", components: ["appendix nav", "searchable table", "footer"] },
];

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[character];
  });
}

function normalizeText(value) {
  return String(value)
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .replace(/\s+-\s+/g, "-")
    .replace(/quote-\s+request/g, "quote-request")
    .replace(/100-\s*company/g, "100-company")
    .trim();
}

function pageText(page) {
  return normalizeText(page.text.map((item) => item.value).join(" "));
}

function metricValues(page) {
  const candidates = page.text
    .map((item) => item.value.trim())
    .filter((value) =>
      /^(?:100|84|16|26%|15%|12%|67%|72%|46%|31%|23%|14%|9x|3\.6x|2\.25|2\.56|7\.50|0\.50|4\.50|5\.83|59%|90-day)$/i.test(
        value,
      ),
    );

  return Array.from(new Set(candidates)).slice(0, 6);
}

function targetLengthFor(page) {
  if (page.number === 22) return 300;
  if ([10, 12, 13, 18, 19].includes(page.number)) return 360;
  if ([1, 2, 5, 21].includes(page.number)) return 280;
  return 430;
}

function structuralSegments(text) {
  return text
    .replace(/\s+(P\.\s+\d\s+\d(?:\s+C\s+H\s+A\s+P\s+T\s+E\s+R)?)/g, " [[BLOCK]] $1")
    .split("[[BLOCK]]")
    .map((segment) => segment.trim())
    .filter(Boolean);
}

function splitReadableChunks(text, target) {
  const words = text.split(/\s+/).filter(Boolean);
  const chunks = [];
  let current = "";

  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;
    const canBreak = /[.!?)]$/.test(word) || /^P\.$/.test(word) || next.length >= target * 1.18;

    if (current && next.length >= target && canBreak) {
      chunks.push(current);
      current = word;
      return;
    }

    current = next;
  });

  if (current) chunks.push(current);
  return chunks;
}

function passageBlocks(page) {
  const target = targetLengthFor(page);
  return structuralSegments(pageText(page)).flatMap((segment) => splitReadableChunks(segment, target));
}

function passageClass(block) {
  if (/^(?:\d+%|9x|3\.6x|2\.\d+|7\.50|0\.50|4\.50|5\.83)\b/i.test(block) && block.length < 260) {
    return " passage-card--metric";
  }
  if (
    block.length < 180 &&
    /(?:P\.\s+\d\s+\d|C H A P T E R|F I N D I N G|Q U E S T I O N|C O N T A C T|(?:[A-Z0-9]\s+){6,}[A-Z0-9])/.test(
      block,
    )
  ) {
    return " passage-card--label";
  }
  return "";
}

function renderMetricStrip(page) {
  const metrics = metricValues(page);
  if (!metrics.length) return "";

  return `
    <div class="metric-strip" aria-label="Key figures">
      ${metrics.map((metric) => `<span>${escapeHtml(metric)}</span>`).join("")}
    </div>
  `;
}

function renderPriceTable() {
  const rows = [
    ["ClosetMaid", "Cabinets & Closets", "$149.99 - $602.94", "7.50"],
    ["American Standard Brands", "Kitchen & Bath", "$387.40 (faucet)", "7.50"],
    ["Yale Commercial", "Doors & Windows", "$99.99 - $309.99", "7.00"],
    ["Jayco", "Powersports", "$17,318 - $407,100", "7.00"],
    ["Schlage", "Doors & Windows", "$270 - $400", "7.00"],
    ["Kraus USA", "Kitchen & Bath", "$364 - $6,058", "5.50"],
    ["fireclay tile", "Flooring / Surfaces", "$13 - $34 / sq ft", "6.50"],
    ["Waterworks", "Kitchen & Bath", "$449.95 - $649.95", "6.50"],
    ["Sundance Spas", "Kitchen & Bath", "$4,999 - $26,999", "6.50"],
    ["Hot Spring Spas", "Kitchen & Bath", "$12,798 - $109,390 (MSRP)", "6.50"],
    ["The Shade Store", "Doors & Windows", "$0 - $16,000+ (5-tier)", "2.50"],
    ["California Closets", "Cabinets & Closets", "$1,904 - $10,949 (tiered)", "4.50"],
    ["Yamaha Motor USA", "Powersports", "$911 - $12,500", "4.50"],
    ["DXV by American Standard", "Kitchen & Bath", "$20.99 - $329", "3.00"],
    ["Kubota Tractor Corporation", "Heavy Machinery", "$17,318 - $407,100", "4.00"],
  ];

  return `
    <div class="price-table" role="table" aria-label="15 manufacturers showing prices">
      <div class="price-row price-head" role="row">
        <span role="columnheader">Company</span>
        <span role="columnheader">Vertical</span>
        <span role="columnheader">Pricing observed</span>
        <span role="columnheader">BES</span>
      </div>
      ${rows
        .map(
          (row) => `
            <div class="price-row" role="row">
              ${row.map((cell) => `<span role="cell">${escapeHtml(cell)}</span>`).join("")}
            </div>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderBlueprintMeta(blueprint) {
  return `
    <div class="template-meta" aria-label="Template mapping">
      <span>${escapeHtml(blueprint.type)}</span>
      <strong>${escapeHtml(blueprint.selected)}</strong>
      <em>${blueprint.refs.map(escapeHtml).join(" / ")}</em>
    </div>
    <div class="component-priority" aria-label="Component priority">
      ${blueprint.components.map((component) => `<span>${escapeHtml(component)}</span>`).join("")}
    </div>
  `;
}

function renderChapter(page) {
  const title = chapterTitles[page.number - 1] || `Section ${page.number}`;
  const blocks = passageBlocks(page);
  const fullText = pageText(page);
  const blueprint = pageBlueprints[page.number - 1] || {
    type: "article",
    refs: ["C1", "D2", "B2"],
    selected: "C1",
    components: ["prose", "notes", "source text"],
  };

  return `
    <section class="chapter-section chapter-section--${escapeHtml(blueprint.type)}" id="section-${page.number}" data-section="${page.number}" data-page-type="${escapeHtml(
      blueprint.type,
    )}" data-template="${escapeHtml(blueprint.selected)}" data-source="${escapeHtml(
      fullText.toLowerCase(),
    )}">
      <div class="chapter-intro">
        <div class="chapter-kicker">Section ${String(page.number).padStart(2, "0")}</div>
        <h2>${escapeHtml(title)}</h2>
        ${renderMetricStrip(page)}
        ${renderBlueprintMeta(blueprint)}
      </div>

      <div class="chapter-body">
        ${page.number === 18 ? renderPriceTable() : ""}
        <div class="passage-stack">
          ${blocks
            .map(
              (block, index) => `
                <p class="passage-card pretext-copy${passageClass(block)}" data-copy="${escapeHtml(block)}" data-block="${
                  index + 1
                }">${escapeHtml(block)}</p>
              `,
            )
            .join("")}
        </div>
        <details class="source-ledger">
          <summary>Canonical extracted text</summary>
          <p class="canonical-source" data-section="${page.number}">${escapeHtml(fullText)}</p>
        </details>
      </div>
    </section>
  `;
}

function renderNavigation() {
  const primary = [
    [2, "Findings"],
    [8, "Score"],
    [12, "Intents"],
    [18, "Pricing"],
    [19, "Method"],
    [22, "Cohort"],
  ];

  siteNav.innerHTML = primary
    .map(([number, label]) => `<a href="#section-${number}">${label}</a>`)
    .join("");

  chapterRail.innerHTML = chapterTitles
    .map(
      (title, index) => `
        <a href="#section-${index + 1}" data-rail="${index + 1}">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <strong>${escapeHtml(title)}</strong>
        </a>
      `,
    )
    .join("");
}

function renderLongform() {
  longform.innerHTML = manifest.pages.map(renderChapter).join("");
}

function fontFor(element) {
  const style = window.getComputedStyle(element);
  const family = style.fontFamily.includes("system-ui") ? "Arial, Helvetica, sans-serif" : style.fontFamily;
  return `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${family}`;
}

function lineHeightFor(element) {
  const value = Number.parseFloat(window.getComputedStyle(element).lineHeight);
  return Number.isFinite(value) ? value : 24;
}

function letterSpacingFor(element) {
  const value = Number.parseFloat(window.getComputedStyle(element).letterSpacing);
  return Number.isFinite(value) ? value : 0;
}

function layoutCopy(element) {
  const original = element.dataset.copy || element.textContent.trim();
  if (!original) return;

  element.dataset.copy = original;
  const maxWidth = element.clientWidth;
  if (maxWidth <= 0) return;

  const font = fontFor(element);
  const lineHeight = lineHeightFor(element);
  const letterSpacing = letterSpacingFor(element);
  const cacheKey = `${font}|${letterSpacing}`;
  const cached = preparedText.get(element);
  const prepared =
    cached && cached.text === original && cached.key === cacheKey
      ? cached.prepared
      : prepareWithSegments(original, font, { whiteSpace: "normal", letterSpacing });

  if (!cached || cached.text !== original || cached.key !== cacheKey) {
    preparedText.set(element, { text: original, key: cacheKey, prepared });
  }

  const stats = measureLineStats(prepared, maxWidth);
  element.style.setProperty("--line-count", stats.lineCount);
  element.style.setProperty("--max-line-width", `${Math.ceil(stats.maxLineWidth)}px`);

  const { lines } = layoutWithLines(prepared, maxWidth, lineHeight);
  let cursor = 0;
  element.innerHTML = lines
    .map((line, index) => {
      const text = line.text;
      const start = original.indexOf(text, cursor);
      const resolvedStart = start >= 0 ? start : cursor;
      const end = resolvedStart + text.length;
      const nextText = lines[index + 1]?.text || "";
      const nextStart = nextText ? original.indexOf(nextText, end) : -1;
      const between = nextStart >= 0 ? original.slice(end, nextStart) : "";
      const separator = /\s/.test(between) ? "\n" : "";
      cursor = end;
      return `<span>${escapeHtml(text)}</span>${separator}`;
    })
    .join("");
}

function layoutAllCopy() {
  document.querySelectorAll(".pretext-copy").forEach(layoutCopy);
}

function setDensity(value) {
  document.documentElement.dataset.density = value;
  densityButtons.forEach((button) => {
    const active = button.dataset.density === value;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  window.requestAnimationFrame(layoutAllCopy);
}

function setSourcesVisible(visible) {
  document.body.classList.toggle("show-sources", visible);
  toggleSources.setAttribute("aria-pressed", String(visible));
  toggleSources.textContent = visible ? "Hide sources" : "Show sources";
  document.querySelectorAll(".source-ledger").forEach((details) => {
    details.open = visible;
  });
}

function setActiveNav() {
  const sections = Array.from(document.querySelectorAll(".chapter-section"));
  const current = sections
    .map((section) => ({ section, top: Math.abs(section.getBoundingClientRect().top - 120) }))
    .sort((a, b) => a.top - b.top)[0]?.section;

  document.querySelectorAll(".site-nav a, .chapter-rail a").forEach((link) => {
    link.classList.toggle("is-active", current && link.hash === `#${current.id}`);
  });
}

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
  readingProgress.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
}

function applySearch() {
  const query = normalizeText(reportSearch.value).toLowerCase();
  const sections = Array.from(document.querySelectorAll(".chapter-section"));
  let hits = 0;

  sections.forEach((section) => {
    const matched = !query || section.dataset.source.includes(query);
    section.classList.toggle("is-search-miss", !matched);
    section.classList.toggle("is-search-hit", Boolean(query && matched));
    if (matched) hits += 1;
  });

  searchCount.textContent = query ? `${hits} / ${sections.length} sections` : `${sections.length} sections`;
}

function scheduleLayout() {
  if (scheduleLayout.frame) window.cancelAnimationFrame(scheduleLayout.frame);
  scheduleLayout.frame = window.requestAnimationFrame(() => {
    layoutAllCopy();
    scheduleLayout.frame = 0;
  });
}

copyReport.addEventListener("click", async () => {
  const allText = manifest.pages.map(pageText).join("\n\n");
  try {
    await navigator.clipboard.writeText(allText);
    copyReport.textContent = "Copied";
  } catch {
    copyReport.textContent = "Select text";
  }

  window.setTimeout(() => {
    copyReport.textContent = "Copy report text";
  }, 1200);
});

densityButtons.forEach((button) => {
  button.addEventListener("click", () => setDensity(button.dataset.density));
});

toggleSources.addEventListener("click", () => {
  setSourcesVisible(!document.body.classList.contains("show-sources"));
});

reportSearch.addEventListener("input", applySearch);

renderNavigation();
renderLongform();
setDensity("comfortable");
setSourcesVisible(false);
layoutAllCopy();
setActiveNav();
updateProgress();
applySearch();

if (window.location.hash) {
  window.requestAnimationFrame(() => {
    document.querySelector(window.location.hash)?.scrollIntoView({ block: "start" });
    setActiveNav();
    updateProgress();
  });
}

if ("ResizeObserver" in window) {
  const observer = new ResizeObserver(scheduleLayout);
  document.querySelectorAll(".pretext-copy").forEach((element) => observer.observe(element));
}

window.addEventListener("resize", scheduleLayout);
window.addEventListener(
  "scroll",
  () => {
    setActiveNav();
    updateProgress();
  },
  { passive: true },
);
window.addEventListener("load", scheduleLayout);
