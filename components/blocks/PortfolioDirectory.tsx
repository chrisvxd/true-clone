"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, ChevronDown, SearchIcon } from "../site/icons";

export type Company = {
  name: string;
  url: string;
  description: string;
  categories: string;
  highlight: boolean;
  exit: boolean;
};

export type PortfolioDirectoryProps = {
  tabs: { highlights: string; exits: string; all: string };
  defaultTab: "highlights" | "exits" | "all";
  searchPlaceholder: string;
  companies: Company[];
};

type Tab = PortfolioDirectoryProps["defaultTab"];

export const splitCategories = (value = "") =>
  value
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);

export function PortfolioDirectory({
  tabs,
  defaultTab = "all",
  searchPlaceholder,
  companies = [],
}: PortfolioDirectoryProps) {
  const [tab, setTab] = useState<Tab>(defaultTab);
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const inTab = useMemo(
    () =>
      companies.filter((c) =>
        tab === "highlights" ? c.highlight : tab === "exits" ? c.exit : !c.exit
      ),
    [companies, tab]
  );

  const categories = useMemo(
    () =>
      Array.from(new Set(inTab.flatMap((c) => splitCategories(c.categories)))).sort(),
    [inTab]
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return inTab
      .filter((c) => !category || splitCategories(c.categories).includes(category))
      .filter(
        (c) =>
          !q ||
          c.name.toLowerCase().includes(q) ||
          c.description?.toLowerCase().includes(q) ||
          c.categories?.toLowerCase().includes(q)
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [inTab, category, query]);

  const tabOrder: Tab[] = ["highlights", "exits", "all"];

  return (
    <div className="px-4 lg:px-14">
      <div className="mx-auto max-w-site">
        <section className="mt-16 md:mt-24">
          <div className="flex flex-col gap-3 border-y border-border bg-muted/35 px-3 py-3 sm:px-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <div className="flex shrink-0 gap-6 md:gap-8" role="tablist">
              {tabOrder.map((key) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={tab === key}
                  onClick={() => {
                    setTab(key);
                    setCategory("");
                  }}
                  className={`relative min-h-[44px] min-w-[44px] cursor-pointer font-mono text-[11px] tracking-[0.12em] uppercase transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:bg-foreground after:transition-transform after:duration-200 ${
                    tab === key
                      ? "text-foreground after:scale-x-100"
                      : "text-muted-foreground after:scale-x-0 hover:text-foreground"
                  }`}
                >
                  {tabs?.[key]}
                </button>
              ))}
            </div>

            <div className="grid min-w-0 grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-center border border-border bg-background max-[380px]:grid-cols-1 lg:w-[470px]">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMenuOpen((v) => !v)}
                  aria-expanded={menuOpen}
                  disabled={!categories.length}
                  className="group flex min-h-[56px] w-full min-w-0 cursor-pointer items-center justify-between gap-2 px-3 py-2 text-left text-[13px] leading-snug text-foreground transition-colors hover:bg-muted/50 disabled:cursor-default disabled:opacity-40 sm:px-4 sm:text-[14px]"
                >
                  <span className="flex min-w-0 flex-col">
                    <span className="font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
                      Category
                    </span>
                    <span className="truncate">{category || "All categories"}</span>
                  </span>
                  <ChevronDown
                    className={`size-4 shrink-0 text-muted-foreground transition-transform ${
                      menuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {menuOpen && (
                  <ul className="absolute top-full left-[-1px] z-20 mt-px w-[calc(100%+2px)] border border-border bg-background py-1 shadow-lg">
                    {["", ...categories].map((c) => (
                      <li key={c || "all"}>
                        <button
                          type="button"
                          onClick={() => {
                            setCategory(c);
                            setMenuOpen(false);
                          }}
                          className={`w-full px-4 py-2.5 text-left text-[14px] hover:bg-muted ${
                            c === category ? "text-foreground" : "text-muted-foreground"
                          }`}
                        >
                          {c || "All categories"}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <label className="relative flex min-h-[56px] min-w-0 items-center gap-2 self-stretch border-l border-border px-3 focus-within:bg-muted/30 max-[380px]:border-t max-[380px]:border-l-0 sm:px-4">
                <span className="sr-only">Search companies</span>
                <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="min-h-[44px] w-full min-w-0 bg-transparent text-[16px] text-foreground outline-none placeholder:text-[13px] placeholder:text-muted-foreground md:text-[14px] md:placeholder:text-[14px]"
                />
              </label>
            </div>
          </div>

          <div>
            {visible.map((c) => {
              const cats = splitCategories(c.categories);
              const body = (
                <>
                  <div className="min-w-0 pr-6 lg:pr-0">
                    <div className="text-[17px] font-semibold tracking-[-0.015em] text-foreground transition-colors group-hover:text-brand-blue md:text-[19px]">
                      {c.name}
                    </div>
                    {c.description && (
                      <div className="mt-1.5 max-w-[66ch] text-[14px] leading-relaxed text-muted-foreground">
                        {c.description}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 pr-6 lg:pr-0">
                    {cats.map((cat) => (
                      <span
                        key={cat}
                        className="font-mono text-[11px] tracking-[0.1em] text-muted-foreground uppercase"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                  {c.url ? (
                    <ArrowUpRight className="absolute top-7 right-3 size-5 text-muted-foreground transition-all duration-200 group-hover:-translate-y-0.5 group-hover:text-brand-blue sm:right-5 lg:static lg:opacity-0 lg:group-hover:opacity-100" />
                  ) : (
                    <span />
                  )}
                </>
              );
              const rowClass =
                "group relative grid gap-3 border-b border-border px-3 py-7 transition-colors duration-200 sm:px-5 lg:grid-cols-[minmax(0,1fr)_280px_20px] lg:items-center lg:gap-10";
              return c.url ? (
                <a
                  key={c.name}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${rowClass} cursor-pointer hover:bg-muted/25`}
                >
                  {body}
                </a>
              ) : (
                <div key={c.name} className={rowClass}>
                  {body}
                </div>
              );
            })}
            {!visible.length && (
              <p className="border-b border-border px-3 py-12 text-center text-sm text-muted-foreground sm:px-5">
                No companies match your filters.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
