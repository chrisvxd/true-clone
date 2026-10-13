import type { CSSProperties } from "react";

export type LogoMarqueeProps = {
  logos: { name: string; src: string; url: string }[];
  speed: "slow" | "medium" | "fast";
};

const SECONDS_PER_LOGO = { slow: 3.2, medium: 2.2, fast: 1.4 };

export function LogoMarquee({ logos = [], speed = "medium" }: LogoMarqueeProps) {
  if (!logos.length) return null;

  const duration = `${Math.max(logos.length * SECONDS_PER_LOGO[speed], 10)}s`;
  // The track holds the list twice and slides by half its width, so the loop is seamless.
  const groups = [0, 1];

  return (
    <div className="tv-marquee relative mx-auto mt-10 max-w-site overflow-hidden px-4 md:mt-14 lg:px-0">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-16 bg-gradient-to-r from-background to-transparent md:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-16 bg-gradient-to-l from-background to-transparent md:w-28" />
      <div
        className="tv-marquee-track flex w-max"
        style={{ "--tv-marquee-duration": duration } as CSSProperties}
      >
        {groups.map((g) => (
          <ul key={g} className="flex shrink-0 items-center" aria-hidden={g === 1}>
            {logos.map((logo, i) => (
              <li key={`${g}-${i}`} className="flex h-16 w-[150px] shrink-0 items-center justify-center px-6 md:h-20 md:w-[190px]">
                <a
                  href={logo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={g === 1 ? -1 : undefined}
                  className="flex h-full w-full items-center justify-center opacity-70 transition-opacity hover:opacity-100"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="max-h-9 max-w-full object-contain brightness-0 md:max-h-10"
                  />
                </a>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
