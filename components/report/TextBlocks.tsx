import type { ReportBlock } from "@/lib/report/page-types";

export function TextBlocks({ blocks }: { blocks?: ReportBlock[] }) {
  if (!blocks?.length) return null;
  return (
    <div className="text-blocks">
      {blocks.map((block, index) => (
        <p className={`text-block text-block--${block.type}`} key={`${block.type}-${index}`}>
          {block.text}
        </p>
      ))}
    </div>
  );
}
