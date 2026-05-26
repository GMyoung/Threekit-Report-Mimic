# Cited Template Refactor Blueprint

This blueprint is derived from `C:/Users/Harvey/Downloads/deep-research-report (1).md`.
It replaces the earlier A/B/C reference scheme with the cited U/M/S/D/V/N/A/TD/X/T/G/E/SE scheme from that report.

The implementation target is still this static longform site. The PDF text remains the canonical content source, and each web section now exposes both:

- a readable, copyable Pretext-driven passage layer
- a per-section template citation list with clickable source references

## Global Direction

- `U1` is always the global shell: current Threekit report mimic, floating rail, canonical source ledger, search, density controls, and source toggle.
- Each page uses two additional local references from the research report.
- Third-party references are archetypes only. Do not copy their prose, images, or proprietary visual assets.
- Prefer official/open implementation sources: MUI, shadcn/ui, Docusaurus, VitePress, Next.js, Ant Design Pro, TDesign, MUI X, DataTables, AG Grid, Apache ECharts, and Semi Design.
- Keep the extracted Threekit design language: warm paper, deep teal ink, coral accent, condensed editorial headings, restrained cards, and table/chart-ready panels.

## Reference Registry

| ID | Reference | URL | Use |
|---|---|---|---|
| U1 | Threekit Report Mimic | `https://gmyoung.github.io/Threekit-Report-Mimic/` | Global shell and interaction model |
| M1 | MUI Dashboard Template | `https://mui.com/material-ui/getting-started/templates/dashboard/` | KPI/dashboard sections |
| M2 | MUI Marketing Page | `https://mui.com/material-ui/getting-started/templates/marketing-page/` | Hero, conclusion, CTA rhythm |
| M3 | MUI Blog Template | `https://mui.com/material-ui/getting-started/templates/blog/` | Editorial/foreword prose |
| M4 | MUI Checkout Template | `https://mui.com/material-ui/getting-started/templates/checkout/` | Method, stepper, audit process |
| S1 | shadcn/ui Blocks | `https://ui.shadcn.com/blocks` | Card clusters and dashboard blocks |
| D1 | Docusaurus Docs Layout | `https://docusaurus.io/docs/styling-layout` | Docs prose, limitations, footer structure |
| V1 | VitePress Home Theme | `https://vitepress.dev/reference/default-theme-home-page` | TOC, docs-home, appendix navigation |
| N1 | Next.js Dashboard App | `https://nextjs.org/learn/dashboard-app` | App structure, search, pagination patterns |
| A1 | Ant Design Pro | `https://preview.pro.ant.design` | Enterprise method/process affordances |
| TD1 | TDesign React Starter | `https://tdesign.tencent.com/starter/react/` | Chinese enterprise cards and tokens |
| X1 | MUI X Data Grid Inventory | `https://mui.com/x/react-data-grid/demos/inventory/` | Ranking and dense table sections |
| X2 | MUI X Charts | `https://mui.com/x/react-charts/` | Charts, heatmaps, legends, tooltips |
| T1 | DataTables | `https://datatables.net/examples/index` | Lightweight sortable/searchable tables |
| G1 | AG Grid React Data Grid | `https://www.ag-grid.com/react-data-grid/getting-started/` | Heavy data-grid model |
| E1 | Apache ECharts | `https://echarts.apache.org/examples/en/index.html` | Open chart stack for heatmaps and distributions |
| SE1 | Semi Design Table | `https://semi.design/en-US/show/table` | Appendix table and navigation cues |

## Page Mapping

| Page | Page Type | References | Local Reference | Component Priority |
|---|---|---|---|---|
| 1 | cover | U1 / M2 / V1 | M2 | shell, hero, actions, footer |
| 2 | summary | U1 / M1 / N1 | M1 | stats, dashboard cards, search-ready data |
| 3 | foreword | U1 / M3 / D1 | M3 | lead card, article body, docs aside |
| 4 | method | U1 / M4 / A1 | M4 | stepper, method summary, enterprise status |
| 5 | toc | U1 / V1 / D1 | V1 | toc, search rail, progress marker |
| 6 | summary | U1 / M1 / N1 | M1 | stats, executive cards, dashboard chart |
| 7 | chart | U1 / X2 / E1 | E1 | chart frame, bar/heatmap, annotation |
| 8 | method | U1 / M4 / A1 | M4 | score stepper, weights, rules |
| 9 | chart | U1 / X2 / E1 | X2 | distribution chart, worked example, source note |
| 10 | ranking-table | U1 / X1 / G1 | X1 | ranking table, filters, sort, pagination |
| 11 | summary | U1 / M1 / N1 | M1 | comparison KPIs, gap narrative, insight callout |
| 12 | card-cluster | U1 / S1 / TD1 | S1 | grouped cards, section cards, enterprise tokens |
| 13 | heatmap | U1 / X2 / E1 | E1 | heatmap, legend, tooltip, explanation |
| 14 | method | U1 / M4 / A1 | M4 | checklist, progress state, self-audit |
| 15 | card-cluster | U1 / S1 / TD1 | TD1 | vertical cards, deep dive modules, detail panes |
| 16 | chart | U1 / X2 / E1 | E1 | chart wrapper, vertical breakdown, callouts |
| 17 | chart | U1 / X2 / E1 | E1 | chart wrapper, comparison cards, notes |
| 18 | lite-table | U1 / T1 / SE1 | T1 | price table, light filters, notes |
| 19 | foreword | U1 / M3 / D1 | D1 | method prose, limitations, callouts |
| 20 | conclusion | U1 / M2 / V1 | M2 | summary cards, CTA rhythm, footer |
| 21 | conclusion | U1 / M2 / V1 | M2 | future questions, CTA block, contact |
| 22 | appendix | U1 / V1 / SE1 | SE1 | appendix nav, searchable list, footer |

## Citation Behavior

Every rendered section includes an ordered `.citation-list` after its component-priority chips.
The visible reference IDs map to `referenceRegistry` in `assets/js/site.js`, so the page can render:

- citation number
- reference ID
- reference name
- clickable official URL
- implementation note
- license or usage caution

This keeps the citations adjacent to the section that uses them, instead of burying all sources in a single appendix.

## Verification Rules

Run these before deployment:

```powershell
$env:NODE_PATH='C:\Users\Harvey\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules\.pnpm\playwright-core@1.60.0\node_modules;C:\Users\Harvey\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules\.pnpm\playwright@1.60.0\node_modules'
& 'C:\Users\Harvey\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' '.\tools\verify-rendered-text.mjs'
& 'C:\Users\Harvey\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' '.\tools\smoke-report-site.mjs'
```

Expected checks:

- 22 visible report sections
- 22 canonical source sections
- no missing canonical text
- all visible passage text remains copyable
- 66 section citations rendered, three per section
- no browser console errors during smoke test
