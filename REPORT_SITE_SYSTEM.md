# Interactive Report Website System

This project converts a source report text file plus a design-language brief into a longform, interactive, copyable website.

## Source Principles

- Pretext is the text engine. Use `prepareWithSegments()` once per paragraph/text block and rerun `layoutWithLines()` on resize. Keep CSS `font`, `line-height`, and `letter-spacing` synchronized with the values passed to Pretext. Reference: https://github.com/chenglou/pretext
- Longform reading should use controlled measure, not full-width text. Keep most running lines near 66 characters, with a practical range of 45-90 characters. Reference: https://designsystem.digital.gov/components/typography/
- Product/research typography should be left-aligned with a ragged right edge, use semantic heading order, and avoid using color as the only hierarchy cue. Reference: https://primer.style/product/getting-started/foundations/typography/
- Use a fixed type scale, not viewport-driven font scaling. Adjust sizes at breakpoints only when the layout changes.

## Design Language Contract

The Threekit report language is:

- warm paper background
- deep green-teal ink
- coral emphasis
- condensed editorial headings
- compact research panels
- thin rules and low-contrast fields
- large numeric callouts
- minimal motion with fast press feedback

Do not reproduce PDF pages as page images for the primary experience. Treat the PDF as source material, then build a long website whose rhythm is section-based and readable.

## Text Layout Rules

- Every extracted section must exist in two places:
  - readable flow blocks rendered in the longform article
  - canonical source text in `.canonical-source` for exact verification
- Readable copy uses `.pretext-copy` and must be rendered with Pretext line spans.
- Pretext-rendered spans must be joined with newline separators so selected text remains copyable instead of joining line-end words.
- Continuous body copy uses `width: min(100%, 66ch)` and `line-height >= 1.5`.
- Large tables and data blocks can be wider, but surrounding explanations should return to the reading measure.
- Do not use multi-column body text for canonical report content; columns make extraction artifacts and footers harder to read.
- Keep source ledgers available through a toggle. They can be hidden by default only if the readable layer already includes the full canonical text.

## Interaction Rules

- Keep interactions in service of presenting the report: floating section rail, active section state, reading progress, source toggle, density control, search, and copy all text.
- Use fast, property-specific transitions. Buttons should have a subtle active scale.
- Avoid decorative motion. Scroll and resize must not trigger visible layout jumps.
- Respect `prefers-reduced-motion`.

## Verification Rules

Run these after content or layout changes:

```powershell
$env:NODE_PATH='C:\Users\Harvey\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules\.pnpm\playwright-core@1.60.0\node_modules;C:\Users\Harvey\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules\.pnpm\playwright@1.60.0\node_modules'
& 'C:\Users\Harvey\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' '.\tools\verify-rendered-text.mjs'
```

The result must be:

- `ok: true`
- rendered section count equals canonical section count
- no missing sections
- no mismatches
- no browser errors

Then run a browser smoke pass at desktop and mobile widths:

- no horizontal overflow
- all controls exist
- `.pretext-copy` has rendered line spans
- search and density controls do not remove content
