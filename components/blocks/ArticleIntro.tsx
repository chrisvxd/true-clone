import type { ReactNode } from "react";

export type ArticleIntroProps = {
  title: ReactNode;
  accent: ReactNode;
  intro: ReactNode;
};

export function ArticleIntro({ title, accent, intro }: ArticleIntroProps) {
  return (
    <header className="mx-auto max-w-[680px] px-4 pt-36 md:pt-44 lg:px-0">
      <h1 className="font-serif text-[clamp(32px,4vw,48px)] leading-[1.1] font-extralight tracking-[-0.025em] text-balance text-foreground">
        {title}
        {accent && (
          <>
            {" "}
            <span className="text-brand-blue italic">{accent}</span>
          </>
        )}
      </h1>
      {intro && (
        <p className="mt-8 text-[18px] leading-[1.75] text-foreground/85">{intro}</p>
      )}
    </header>
  );
}
