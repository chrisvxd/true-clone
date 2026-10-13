import type { ReactNode } from "react";

export type DisclaimerProps = { text: ReactNode };

export function Disclaimer({ text }: DisclaimerProps) {
  return (
    <div className="px-4 py-16 lg:px-14">
      <div className="mx-auto max-w-site">
        <p className="text-[11px] leading-relaxed text-muted-foreground/60">{text}</p>
      </div>
    </div>
  );
}
