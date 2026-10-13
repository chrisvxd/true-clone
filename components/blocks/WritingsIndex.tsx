"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  allPosts,
  formatLongDate,
  formatShortDate,
  type Post,
  type PostType,
} from "../../lib/writings";
import { ArrowRight, SearchIcon } from "../site/icons";

export type WritingsIndexProps = {
  eyebrow: ReactNode;
  title: ReactNode;
  filters: { all: string; opinions: string; announcements: string };
  searchPlaceholder: string;
  featuredCount: number;
  archiveLabel: ReactNode;
  openYears: number;
};

type Filter = "all" | PostType;

function Byline({ post }: { post: Post }) {
  return (
    <>
      {post.authors.map((a, i) => (
        <span key={a}>
          {i > 0 && " & "}
          {a}
        </span>
      ))}
    </>
  );
}

export function WritingsIndex({
  eyebrow,
  title,
  filters,
  searchPlaceholder,
  featuredCount = 12,
  archiveLabel,
  openYears = 1,
}: WritingsIndexProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const posts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allPosts
      .filter((p) => filter === "all" || p.type === filter)
      .filter(
        (p) =>
          !q ||
          p.title.toLowerCase().includes(q) ||
          p.authors.some((a) => a.toLowerCase().includes(q))
      );
  }, [filter, query]);

  const featured = posts.slice(0, featuredCount);
  const archive = useMemo(() => {
    const byYear = new Map<string, Post[]>();
    for (const post of posts.slice(featuredCount)) {
      const year = post.date.slice(0, 4);
      byYear.set(year, [...(byYear.get(year) ?? []), post]);
    }
    return Array.from(byYear.entries());
  }, [posts, featuredCount]);

  const filterOrder: Filter[] = ["all", "opinions", "announcements"];

  return (
    <div className="pt-40 pb-24">
      <section className="border-t border-border px-4 py-20 lg:px-14">
        <div className="mx-auto max-w-site">
          {eyebrow && (
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
              <div className="size-1.5 rounded-full bg-primary" />
              {eyebrow}
            </div>
          )}
          <h1 className="mt-6 max-w-[760px] font-serif text-[clamp(40px,5.5vw,64px)] leading-[0.95] font-extralight tracking-[-0.03em] text-balance text-foreground">
            {title}
          </h1>
          <nav className="mt-10">
            <ul className="flex flex-wrap gap-x-6 md:gap-x-8">
              {filterOrder.map((key) => (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() => setFilter(key)}
                    className={`relative inline-flex min-h-[44px] min-w-[44px] cursor-pointer items-center font-mono text-[11px] tracking-[0.12em] uppercase transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:bg-foreground after:transition-transform after:duration-200 ${
                      filter === key
                        ? "text-foreground after:scale-x-100"
                        : "text-muted-foreground after:scale-x-0 hover:text-foreground"
                    }`}
                  >
                    {filters?.[key]}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-6">
            <label className="relative flex w-full max-w-2xl items-center border border-border focus-within:border-ring">
              <span className="sr-only">Search blog posts</span>
              <SearchIcon className="ml-3 size-4 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="h-9 w-full min-w-0 bg-transparent px-2 py-1 text-sm outline-none placeholder:text-muted-foreground"
              />
            </label>
          </div>
        </div>
      </section>

      <section className="px-4 lg:px-14">
        <div className="mx-auto grid max-w-site grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((post) => (
            <a
              key={post.slug}
              href={`/writings/${post.slug}`}
              className="group flex min-h-[320px] flex-col justify-between bg-card p-6 text-card-foreground transition-colors hover:bg-muted/60 sm:p-8 lg:p-10"
            >
              <div>
                <div className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
                  {formatLongDate(post.date)} <span className="mx-1">/</span> <Byline post={post} />
                </div>
                <h2 className="mt-5 text-2xl leading-snug font-medium text-foreground">
                  {post.title}
                </h2>
              </div>
              <div className="mt-8 flex items-center justify-end">
                <ArrowRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
              </div>
            </a>
          ))}
        </div>
        {!featured.length && (
          <p className="mx-auto max-w-site py-16 text-center text-sm text-muted-foreground">
            No posts match your search.
          </p>
        )}
      </section>

      {archive.length > 0 && (
        <section className="px-4 pt-20 lg:px-14">
          <div className="mx-auto max-w-site border-t border-border pt-12">
            <h2 className="font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase">
              {archiveLabel}
            </h2>
            <div className="mt-8 divide-y divide-border">
              {archive.map(([year, yearPosts], i) => (
                <details key={year} className="group/year" open={i < openYears || !!query}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-8 outline-none transition-colors hover:text-primary [&::-webkit-details-marker]:hidden">
                    <h3 className="font-serif text-4xl leading-none font-extralight tracking-[-0.03em] text-foreground">
                      {year}
                    </h3>
                    <span className="font-mono text-xs tracking-[0.08em] text-muted-foreground">
                      {yearPosts.length} {yearPosts.length === 1 ? "post" : "posts"}
                      <span className="ml-3 inline-block transition-transform group-open/year:rotate-45">+</span>
                    </span>
                  </summary>
                  <div className="grid gap-4 pb-10 sm:grid-cols-2">
                    {yearPosts.map((post) => (
                      <a
                        key={post.slug}
                        href={`/writings/${post.slug}`}
                        className="group flex gap-4 border-l border-border pl-4 transition-colors hover:border-primary"
                      >
                        <time className="w-20 shrink-0 font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase">
                          {formatShortDate(post.date)}
                        </time>
                        <span className="min-w-0">
                          <span className="block text-[15px] leading-snug text-foreground group-hover:text-primary">
                            {post.title}
                          </span>
                          <span className="mt-1 block text-xs text-muted-foreground">
                            <Byline post={post} />
                          </span>
                        </span>
                      </a>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
