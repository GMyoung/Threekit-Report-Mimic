# Typography and Pretext System

## External References

- Pretext: https://github.com/chenglou/pretext
- GitHub Primer typography: https://primer.style/product/getting-started/foundations/typography/
- U.S. Web Design System typography: https://designsystem.digital.gov/components/typography/
- IBM typography scale guidance: https://www.ibm.com/design/language/typography/type-scale/

## Pretext Implementation Rules

- Use a named font family in CSS and in the canvas font string. Avoid `system-ui` for Pretext measurement accuracy.
- Use `prepareWithSegments(text, font, { whiteSpace: "normal", letterSpacing })` for each block.
- Cache prepared text by original text plus font and letter-spacing.
- On resize or density changes, call `layoutWithLines(prepared, width, lineHeight)`.
- Pass the computed CSS `line-height` to Pretext.
- Pass computed CSS `letter-spacing` to Pretext.
- Render lines as block spans with newline separators between spans so selected/copy text is not concatenated.
- Do not run Pretext on the canonical verification text. Keep that text plain.

## Readability Rules

- Running text width: `min(100%, 66ch)`.
- Body font size: 17-20px for a presentation report, never below 16px.
- Body line height: 1.5-1.66.
- Paragraph spacing: 0.75-1.25rem depending on density.
- Tables can be wider than prose, but prose should return to measure.
- Headings can be condensed and oversized, but should use discrete breakpoint sizes.
- Do not set body text in justified alignment.
- Do not make long report prose flow across multiple CSS columns.

## Interaction Rules

- Long reports need orientation: floating or sticky rail, active chapter, progress indicator.
- Long reports need control: search, density, source toggle, copy-all.
- Controls should not hide or delete content during search; dim non-matches instead.
- Motion should be fast and functional. Respect reduced motion.

## QA Checklist

- Source and rendered canonical sections match exactly after normalization.
- Readable layer includes every canonical section.
- No horizontal overflow at 390px and 1440px.
- Search works without removing content from the DOM.
- Density changes rerun Pretext line layout.
- Copy-all returns canonical text, not visually rearranged text.
