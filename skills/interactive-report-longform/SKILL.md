---
name: interactive-report-longform
description: Convert extracted report text and a design-language brief into a long, interactive, copyable website using Pretext for readable typography and exact source-text verification.
metadata:
  short-description: Build interactive report websites from source text
---

# Interactive Report Longform

Use this skill when the task is to turn a report, PDF extraction, TSV, Word document, or other long source text into a presentable interactive website while preserving every source word.

## Inputs

Require two inputs:

1. Source text: canonical extracted text, TSV, DOCX export, Markdown, JSON manifest, or PDF-derived text.
2. Design language: colors, typography, layout motifs, interaction tone, and examples or screenshots when available.

If the source is a PDF, create a canonical text file first and treat that file as the source of truth.

## Workflow

1. Read the source text and design-language brief before editing UI.
2. Create or update a project system file for typography, Pretext usage, interaction rules, and verification.
3. Build the site as a longform article, not as page-image mimicry.
4. Render every source section in a readable layer and keep canonical source text in a verification layer.
5. Use Pretext for paragraph line layout. Keep CSS font, line-height, and letter-spacing synchronized with Pretext inputs.
6. Add useful presentation interactions: section rail, active section state, progress, search, density control, source toggle, and copy-all.
7. Verify exact text preservation against the canonical file.
8. Run desktop and mobile browser smoke checks for overflow, script errors, and readable text.

## Typography Contract

Load `references/typography-system.md` when implementing or reviewing the website typography.

Core rules:

- running text target measure: about 66 characters
- acceptable longform range: 45-90 characters
- body size: at least 16px effective size
- body line-height: at least 1.5 for long text
- left aligned, ragged right
- no viewport-driven font-size scaling
- no multi-column flow for canonical body text
- Pretext-rendered line spans must remain copyable

## Verification Contract

Exact source preservation is non-negotiable. A hidden or collapsed verification layer is acceptable only when the full source also appears in the readable layer.

Verification should report:

- source section count
- rendered canonical section count
- missing section IDs
- mismatched section IDs and first diff
- browser console/page errors

Do not finish while mismatches remain.
