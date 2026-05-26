# Threekit Research Microsite

Interactive research microsite based on the May 2026 Threekit report.

Open `index.html` directly in a browser. The site no longer tries to reproduce the PDF page count or layout. The PDF is treated as source material for a redesigned editorial research website using the same design language: warm paper, deep teal ink, coral emphasis, condensed editorial type, scorecards, tables, and quiet research panels.

## Text System

The readable text layer follows the project system in `REPORT_SITE_SYSTEM.md`: clear hierarchy, left-aligned ragged-right text, readable line lengths around 66 characters, and fixed breakpoint-based type sizes.

Paragraph line breaking is driven by a vendored local copy of `@chenglou/pretext` 0.0.7. The site calls `prepareWithSegments()` once per paragraph and `layoutWithLines()` on resize or density changes, then renders copyable HTML line spans with newline separators.

The interaction model follows an Emil design-engineering pass: minimal motion, precise press states, sticky navigation, progress, search, density controls, source toggles, and compact components that privilege reading over spectacle.

## Canonical Text Verification

The extracted PDF text is stored in:

- `source/canonical-extracted-text.txt`
- `source/canonical-extracted-text.json`

The rendered website keeps every section in `.canonical-source` nodes for exact comparison. Run:

```powershell
$env:NODE_PATH='C:\Users\Harvey\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules\.pnpm\playwright-core@1.60.0\node_modules;C:\Users\Harvey\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules\.pnpm\playwright@1.60.0\node_modules'
& 'C:\Users\Harvey\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' '.\tools\verify-rendered-text.mjs'
```

The current expected result is `ok: true` with 22 rendered sections and 22 canonical sections.

## Files

- `index.html` - website entry point
- `assets/styles.css` - report viewer styling
- `assets/js/site.js` - microsite interactions and Pretext text layout
- `assets/js/report-data.js` - browser-ready copy of the extracted report manifest, retained as source material
- `assets/js/pretext.bundle.js` - local browser bundle of `@chenglou/pretext`
- `assets/pages/` - high-resolution rendered report pages
- `assets/data/report-manifest.json` - extracted page text and coordinate manifest
- `DESIGN_LANGUAGE.md` - extracted design language notes
- `REPORT_SITE_SYSTEM.md` - typography, Pretext, interaction, and verification rules
- `skills/interactive-report-longform/` - reusable skill distilled from this project
- `tools/render-report.mjs` - repeatable PDF render/extraction script
- `tools/bundle-pretext.mjs` - repeatable local Pretext bundling script

## Re-render Pages

From this folder:

```powershell
$env:NODE_PATH='C:\Users\Harvey\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules\.pnpm\pdfjs-dist@5.6.205\node_modules;C:\Users\Harvey\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules\.pnpm\@napi-rs+canvas@0.1.100\node_modules'
& 'C:\Users\Harvey\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' '.\tools\render-report.mjs'
```
