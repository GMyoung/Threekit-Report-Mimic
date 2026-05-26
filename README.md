# Threekit Report Mimic

可扩展的交互式报告网站，基于 Threekit May 2026 PDF：**The State of Configurable Product Manufacturing Websites**。

当前实现已从静态 HTML 重构为 Next.js App Router 静态导出项目。内容、指标、表格、热力图、来源、模板选择器与 Three.js 场景都拆到 `data/`、`components/`、`lib/` 分层，后续替换 `data/report/*` 即可生成同类长报告站点。

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS v4 + CSS variables design tokens
- shadcn-style local UI primitives
- TanStack Table for leaderboard, bottom cohort, pricing, appendix
- React Three Fiber + drei + `@14islands/r3f-scroll-rig`
- Static export for GitHub Pages

## Commands

```powershell
npm.cmd install
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build

$env:GITHUB_PAGES='true'
npm.cmd run build
New-Item -ItemType File -Force -Path out\.nojekyll
npm.cmd run deploy
```

Local preview:

```powershell
npm.cmd run dev
```

Production export is written to `out/`.

## Architecture

- `app/` - App Router pages and global styles.
- `components/report/` - report shell, navigation, search, density/source toggles, full report drawer, page renderers, tables and page-type components.
- `components/webgl/` - one global canvas, scene slots, reduced-motion fallback and Three scenes.
- `components/ui/` - local shadcn-style primitives.
- `data/report/` - report metadata, 22 page definitions, metrics, tables, heatmap, companies and sources.
- `lib/report/` - page types, search index, scoring helpers, template registry and deterministic template picker.
- `lib/webgl/` - scene registry, performance and reduced-motion helpers.
- `source/` - canonical extracted PDF text and extraction artifacts retained for audit.
- `public/assets/report/` - static report assets used by the exported site.

## Report Features

- 22 sections mapped from the source PDF.
- Copy report text.
- Search across section titles, subtitles, body text, labels and company names.
- Compact / Comfortable / Roomy density.
- Show sources toggle.
- Full report drawer.
- Sticky navigation with active section tracking.
- Accessible HTML tables and heatmap values.
- A single global WebGL canvas with scene slots for cover, KPI, channel gap, heatmap, configurator and CTA.
- Reduced-motion fallback and mobile DPR/performance limits.

## Deployment

GitHub Pages build uses `GITHUB_PAGES=true` so `next.config.ts` applies:

- `output: "export"`
- `images.unoptimized: true`
- `trailingSlash: true`
- `basePath: "/Threekit-Report-Mimic"`
- `assetPrefix: "/Threekit-Report-Mimic/"`

The `deploy` script publishes `out/` to the `gh-pages` branch.
