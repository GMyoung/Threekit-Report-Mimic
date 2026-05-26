# Multi-Page Report Template Refactor Blueprint

This file turns the 22-page PDF analysis into an executable frontend blueprint for Codex. The goal is not to copy third-party templates. Use the references as component and layout archetypes, while preserving the Threekit report design language already extracted in `DESIGN_LANGUAGE.md`.

## Global Assumptions

- Source report: `source/canonical-extracted-text.txt`
- Page count: 22
- Framework: unspecified
- Current implementation: static HTML/CSS/JS with vendored Pretext
- Design system: report-specific tokens in `assets/styles.css`
- Deployment target: GitHub Pages when GitHub authentication is available

## Page Mapping

| Page | Page Type | Reference IDs | Selected | Component Priority |
|---|---|---|---|---|
| 1 | cover | A1 / A2 / A3 | A2 | hero, title block, subtitle, date, logo |
| 2 | kpi-summary | B1 / B3 / E3 | B1 | stat cards, trend chart, highlight list |
| 3 | foreword | C1 / C2 / C3 | C1 | author meta, lead paragraph, long copy |
| 4 | research-method | D1 / D2 / D3 | D2 | hero intro, feature grid, notes |
| 5 | contents | D2 / H2 / B2 | D2 | chapter nav, subsection list, progress marker |
| 6 | executive-summary | B1 / I3 / J1 | I3 | summary cards, main chart, key bullets |
| 7 | definition-explainer | G3 / G5 / G2 | G3 | bar chart, callout notes, definitions |
| 8 | scoring-method | E2 / G4 / E1 | E2 | stepper, methodology diagram, radar |
| 9 | distribution-example | G3 / G6 / G2 | G3 | chart, annotation, worked example |
| 10 | ranking-table | F1 / F2 / F3 | F1 | table, filters, sort, pagination |
| 11 | comparison | B1 / G3 / J1 | G3 | kpi cards, comparison bars, insight callout |
| 12 | intent-cards | A2 / D1 / B2 | B2 | grouped cards, icons, short copy |
| 13 | heatmap | G1 / G2 / J1 | G2 | heatmap, legend, tooltip, explanation panel |
| 14 | self-audit | E2 / I1 / E3 | E2 | checklist, progress state, sticky summary |
| 15 | vertical-deep-dive | F1 / H4 / H3 | H3 | ranked table, filters, detail pane |
| 16 | vertical-deep-dive | J1 / C3 / E1 | J1 | section intro, infographic, ranked callouts |
| 17 | vertical-deep-dive | J1 / H3 / C3 | J1 | deep-dive modules, comparison cards |
| 18 | price-table | J2 / F3 / B3 | F3 | chapter opener, price table, notes |
| 19 | limitations | D2 / D1 / C1 | D2 | prose, inline lists, note blocks |
| 20 | conclusion | A3 / A2 / J1 | A3 | conclusion headline, insight cards |
| 21 | future-cta | A2 / J2 / D1 | A2 | future questions, CTA block, contact link |
| 22 | appendix | D2 / H1 / F3 | D2 | appendix nav, searchable table, footer |

## Reference Pool

- A-series: annual-report/marketing hero and narrative references.
- B-series: dashboard/document-workspace references.
- C-series: editorial/blog/article references.
- D-series: docs/home/research explanation references.
- E-series: enterprise pro layout and stepper references.
- F-series: data table references.
- G-series: chart and heatmap references.
- H-series: navigation/table/pro dashboard references.
- I-series: Next.js dashboard learning references.
- J-series: data-storytelling and microsite visual references.

Use Awwwards and Dribbble only for visual rhythm. Do not copy visual assets, illustrations, animation, or text. Prefer open-source/official implementation patterns for code structure.

## Implementation Rules

1. Keep one global shell and one design language.
2. Use page archetypes to vary layout density, not to create 22 unrelated pages.
3. Preserve every source section in the readable layer and canonical source layer.
4. Keep Pretext as the text layout engine.
5. Keep the floating rail, search, density control, source toggle, and copy-all controls.
6. Verify with `tools/verify-rendered-text.mjs` and `tools/smoke-report-site.mjs` after every refactor.

## Current Static Implementation

The page blueprint is encoded in `assets/js/site.js` as `pageBlueprints`. Each rendered section receives:

- `data-page-type`
- `data-template`
- `chapter-section--{type}` class
- visible template metadata
- visible component-priority chips

CSS in `assets/styles.css` then maps specific page archetypes to different presentation treatments, while preserving the same tokens and typography system.
