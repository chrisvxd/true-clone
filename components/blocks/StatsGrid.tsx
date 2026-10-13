import type { ReactNode } from "react";

export type StatsGridProps = {
  stats: { value: ReactNode; label: ReactNode }[];
};

export function StatsGrid({ stats = [] }: StatsGridProps) {
  return (
    <section className="px-4 pb-12 lg:px-14">
      <div className="mx-auto max-w-site">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="group flex min-h-[132px] flex-col items-center justify-center rounded-[24px] border border-foreground/5 bg-card px-4 py-8 text-center sm:min-h-[184px] sm:px-6 sm:py-10"
            >
              <div className="text-[clamp(36px,5vw,56px)] leading-none font-extralight tracking-tight text-foreground tabular-nums transition-colors duration-300 group-hover:text-[var(--tv-blue)]">
                {stat.value}
              </div>
              <div className="mt-3 font-sans text-xs font-medium tracking-[0.16em] text-balance text-muted-foreground uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
