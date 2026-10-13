import type { ReactNode } from "react";

export type TimelineProps = {
  items: { year: ReactNode; name: ReactNode; url: string; note: string; exit: string }[];
};

export function Timeline({ items = [] }: TimelineProps) {
  return (
    <ol className="border-t border-border">
      {items.map((item, i) => (
        <li
          key={i}
          className="grid grid-cols-[3.5rem_1fr] gap-x-4 border-b border-border py-3 text-[16px] leading-[1.6]"
        >
          <span className="font-mono text-sm text-muted-foreground tabular-nums">{item.year}</span>
          <span className="text-foreground/85">
            {item.url ? (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-foreground underline decoration-foreground/25 underline-offset-4 hover:text-brand-blue"
              >
                {item.name}
              </a>
            ) : (
              <strong className="font-semibold text-foreground">{item.name}</strong>
            )}
            .{item.note && <> {item.note}</>}
            {item.exit && (
              <span className="ml-2 font-mono text-[11px] tracking-[0.08em] whitespace-nowrap text-muted-foreground uppercase">
                {item.exit}
              </span>
            )}
          </span>
        </li>
      ))}
    </ol>
  );
}
