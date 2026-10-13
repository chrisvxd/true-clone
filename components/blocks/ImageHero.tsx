import type { ReactNode } from "react";
import { ButtonLink } from "../site/button";
import { LogoRotator, type Logo } from "./LogoRotator";

export type ImageHeroProps = {
  image: string;
  imagePosition: "center" | "center 30%" | "top";
  tone: "warm" | "neutral";
  align: "center" | "left";
  title: ReactNode;
  titleWeight: "light" | "regular";
  subtitle: string;
  cta: { label: string; href: string };
  logoCells: { logos: Logo[] }[];
  spacingBottom: "tight" | "normal" | "none";
};

const spacing = {
  tight: "pb-8",
  normal: "pb-12 md:pb-16",
  none: "pb-0",
};

export function ImageHero({
  image,
  imagePosition = "center",
  tone = "warm",
  align = "center",
  title,
  titleWeight = "light",
  subtitle,
  cta,
  logoCells = [],
  spacingBottom = "tight",
}: ImageHeroProps) {
  const cells = logoCells.filter((c) => c.logos?.length);
  const centered = align === "center";

  return (
    <section className={`px-4 pt-32 lg:px-14 ${spacing[spacingBottom]}`}>
      <div className="relative mx-auto aspect-[4/5] max-w-site overflow-hidden rounded-[32px] bg-[#393024] md:aspect-video">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt=""
          className="absolute inset-0 z-0 h-full w-full object-cover"
          style={{ objectPosition: imagePosition }}
        />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/45 via-black/15 to-black/45" />
        <div
          className={`pointer-events-none absolute inset-x-0 top-0 z-[1] h-[65%] bg-gradient-to-b ${
            tone === "warm" ? "from-[#393024] to-[#393024]/0" : "from-black/20 to-transparent"
          }`}
        />

        <div
          className={`absolute inset-x-0 top-[30%] z-[2] -translate-y-1/2 md:top-24 md:translate-y-0 ${
            centered ? "px-4 text-center lg:px-14" : "px-6 text-left md:px-12 lg:px-14"
          }`}
        >
          {centered ? (
            <h1
              className={`mx-auto max-w-[22ch] font-serif whitespace-pre-line text-[min(48px,calc(15vw_-_0.6rem))] leading-[1.05] tracking-[-0.03em] text-balance text-white [text-shadow:2px_2px_0_rgb(0_0_0_/_0.1)] md:text-[clamp(48px,6.6vw,76.8px)] ${
                titleWeight === "light" ? "font-extralight" : "font-normal"
              }`}
            >
              {title}
            </h1>
          ) : (
            <div>
              <h1
                className={`max-w-[760px] font-serif whitespace-pre-line text-[clamp(40px,5.5vw,64px)] leading-none tracking-[-0.03em] text-balance text-white [text-shadow:2px_2px_0_rgb(0_0_0_/_0.1)] ${
                  titleWeight === "light" ? "font-extralight" : "font-normal"
                }`}
              >
                {title}
              </h1>
              {subtitle && (
                <p className="mt-5 max-w-[720px] text-lg leading-[1.55] text-pretty text-white [text-shadow:2px_2px_0_rgb(0_0_0_/_0.1)] md:text-2xl">
                  {subtitle}
                </p>
              )}
              {cta?.label && (
                <div className="mt-6">
                  <ButtonLink href={cta.href}>{cta.label}</ButtonLink>
                </div>
              )}
            </div>
          )}
          {centered && subtitle && (
            <p className="mx-auto mt-5 max-w-[720px] text-lg leading-[1.55] text-white md:text-2xl">
              {subtitle}
            </p>
          )}
          {centered && cta?.label && (
            <div className="mt-6">
              <ButtonLink href={cta.href}>{cta.label}</ButtonLink>
            </div>
          )}
        </div>

        {cells.length > 0 && (
          <div className="absolute inset-x-0 bottom-0 z-[2] mx-auto w-full px-5 pb-5 md:px-10 md:pb-8 lg:px-14">
            <div className="grid grid-cols-6 gap-x-7 gap-y-3 md:grid-cols-5 md:gap-10 [&>div]:col-span-2 md:[&>div]:col-span-1 [&>div:nth-child(4)]:col-start-2 md:[&>div:nth-child(4)]:col-start-auto">
              {cells.map((cell, i) => (
                <div key={i}>
                  <LogoRotator logos={cell.logos} index={i} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
