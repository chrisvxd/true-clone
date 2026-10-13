import type { ReactNode } from "react";
import { formatLongDate } from "../../lib/writings";
import { ArrowLeft } from "../site/icons";

export type PostArticleProps = {
  title: ReactNode;
  date: string;
  authors: { name: string }[];
  body: ReactNode;
  sourceUrl: string;
};

const slugify = (name: string) =>
  name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export function PostArticle({ title, date, authors = [], body, sourceUrl }: PostArticleProps) {
  return (
    <article className="px-4 pt-40 pb-24 lg:px-14">
      <div className="mx-auto max-w-[680px]">
        <a
          href="/writings"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.12em] text-muted-foreground uppercase transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> All writings
        </a>
        <p className="mt-10 font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
          {date && /^\d{4}-\d{2}-\d{2}$/.test(date) ? formatLongDate(date) : date}
          {authors.length > 0 && (
            <>
              <span className="mx-2">/</span>
              {authors.map((a, i) => (
                <span key={a.name}>
                  {i > 0 && " & "}
                  <a href={`/team/${slugify(a.name)}`} className="hover:text-foreground">
                    {a.name}
                  </a>
                </span>
              ))}
            </>
          )}
        </p>
        <h1 className="mt-5 font-serif text-[clamp(34px,4.5vw,52px)] leading-[1.08] font-extralight tracking-[-0.03em] text-balance text-foreground">
          {title}
        </h1>
        <div className="tv-prose mt-10 text-[18px] leading-[1.75] text-foreground/85">{body}</div>
        {sourceUrl && (
          <p className="mt-12 border-t border-border pt-6 text-sm text-muted-foreground">
            Originally published at{" "}
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline decoration-foreground/25 underline-offset-4 hover:text-brand-blue"
            >
              {sourceUrl.replace(/^https?:\/\//, "")}
            </a>
          </p>
        )}
      </div>
    </article>
  );
}
