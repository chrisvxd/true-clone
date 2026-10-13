"use client";

import { useState } from "react";
import { socialIcons, type SocialPlatform } from "./icons";

export type SiteFooterProps = {
  newsletterLabel: string;
  newsletterPlaceholder: string;
  newsletterButton: string;
  legalLinks: { label: string; href: string }[];
  copyright: string;
  socials: { platform: SocialPlatform; url: string }[];
};

export function SiteFooter({
  newsletterLabel,
  newsletterPlaceholder,
  newsletterButton,
  legalLinks = [],
  copyright,
  socials = [],
}: SiteFooterProps) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <footer className="relative border-t border-border bg-background px-4 lg:px-14">
      <div className="relative z-[2] mx-auto flex max-w-site flex-col gap-10 py-10 md:flex-row md:items-start md:justify-between md:py-14">
        <form
          className="relative flex w-full max-w-[360px] flex-col gap-3 md:items-start"
          onSubmit={(e) => {
            // Newsletter delivery isn't wired up in the clone.
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <p className="font-mono text-xs tracking-[0.05em] text-muted-foreground">
            {submitted ? "Thanks — you're on the list." : newsletterLabel}
          </p>
          <div className="flex h-11 w-full focus-within:ring-3 focus-within:ring-brand-blue/20">
            <input
              type="email"
              required
              placeholder={newsletterPlaceholder}
              autoComplete="email"
              className="min-w-0 flex-1 border border-border bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-brand-blue/60"
            />
            <button
              type="submit"
              className="-ml-px inline-flex h-11 shrink-0 items-center justify-center bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {newsletterButton}
            </button>
          </div>
        </form>

        <div className="flex flex-col gap-5 md:items-end">
          <div className="flex flex-col gap-1.5 font-mono text-xs tracking-[0.05em] text-muted-foreground md:items-end">
            <div className="flex gap-6 md:justify-end">
              {legalLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <p>{copyright}</p>
          </div>
          <div className="flex gap-x-4 md:justify-end">
            {socials.map(({ platform, url }) => {
              const Icon = socialIcons[platform] ?? socialIcons.x;
              return (
                <a
                  key={platform + url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={platform}
                  className="inline-flex size-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icon className="size-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
