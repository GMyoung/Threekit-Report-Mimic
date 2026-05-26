export function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function normalizeText(value: string) {
  return value
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .trim();
}

export function chunkText(text: string, targetLength = 440) {
  const normalized = normalizeText(text);
  const words = normalized.split(/\s+/).filter(Boolean);
  const chunks: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    const canBreak = /[.!?)]$/.test(word) || next.length >= targetLength * 1.18;
    if (current && next.length >= targetLength && canBreak) {
      chunks.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) chunks.push(current);
  return chunks.length ? chunks : [normalized];
}

export function formatPercent(value: number) {
  return `${value}%`;
}

export function pageAnchor(pageNumber: number, slug: string) {
  return `page-${pageNumber}-${slug}`;
}
