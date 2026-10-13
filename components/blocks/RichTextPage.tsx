import type { ReactNode } from "react";

export type RichTextPageProps = {
  title: ReactNode;
  updated: string;
  body: ReactNode;
};

export function RichTextPage({ title, updated, body }: RichTextPageProps) {
  return (
    <div className="px-4 pt-40 pb-24 lg:px-14">
      <div className="mx-auto max-w-[680px]">
        <h1 className="font-serif text-[clamp(36px,4.5vw,56px)] leading-none font-extralight tracking-[-0.03em] text-foreground">
          {title}
        </h1>
        {updated && (
          <p className="mt-5 font-mono text-xs tracking-[0.12em] text-muted-foreground uppercase">
            {updated}
          </p>
        )}
        <div className="tv-prose mt-10 text-[16px] leading-[1.75] text-foreground/85">{body}</div>
      </div>
    </div>
  );
}
