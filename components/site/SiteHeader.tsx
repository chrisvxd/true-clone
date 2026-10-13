"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ButtonLink, buttonClass, isExternal } from "./button";

export type NavLink = { label: string; href: string };

export type SiteHeaderProps = {
  logo: string;
  logoAlt: string;
  links: NavLink[];
  secondaryCta: NavLink;
  primaryCta: NavLink;
  offsetTop: boolean;
};

function useActivePath() {
  const pathname = usePathname() ?? "/";
  // Inside the editor the URL ends in /edit; strip it so the nav still highlights.
  return pathname.replace(/\/edit$/, "") || "/";
}

export function SiteHeader({
  logo,
  logoAlt,
  links = [],
  secondaryCta,
  primaryCta,
  offsetTop,
}: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const active = useActivePath();

  useEffect(() => setOpen(false), [active]);

  const isActive = (href: string) =>
    !isExternal(href) && href !== "/" && (active === href || active.startsWith(`${href}/`));

  return (
    <>
      <header
        className={`fixed inset-x-0 z-[100] w-full bg-background px-4 lg:px-14 ${
          offsetTop ? "top-11" : "top-0"
        }`}
      >
        <nav className="mx-auto flex h-16 w-full max-w-site items-center justify-between md:h-14">
          <a href="/" aria-label="Home" className="transition-opacity hover:opacity-80">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo} alt={logoAlt} className="h-[28px] w-auto" />
          </a>

          <div className="hidden items-center gap-2 md:flex">
            {links.map((link) => (
              <a
                key={link.href + link.label}
                href={link.href}
                target={isExternal(link.href) ? "_blank" : undefined}
                rel={isExternal(link.href) ? "noopener noreferrer" : undefined}
                className={buttonClass(
                  "ghost",
                  isActive(link.href) ? "!text-foreground" : ""
                )}
              >
                {link.label}
              </a>
            ))}
            {secondaryCta?.label && (
              <ButtonLink variant="outline" href={secondaryCta.href}>
                {secondaryCta.label}
              </ButtonLink>
            )}
            {primaryCta?.label && (
              <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
            )}
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative inline-flex size-10 items-center justify-center border border-border bg-background hover:bg-muted md:hidden"
          >
            <svg
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              className="size-5"
              aria-hidden="true"
            >
              {open ? (
                <>
                  <path d="M8 8l16 16" />
                  <path d="M24 8L8 24" />
                </>
              ) : (
                <>
                  <path d="M6 11h20" />
                  <path d="M6 21h20" />
                </>
              )}
            </svg>
          </button>
        </nav>
      </header>

      <div
        className={`fixed right-0 bottom-0 left-0 z-50 flex-col overflow-hidden border-y bg-background/90 backdrop-blur md:hidden ${
          offsetTop ? "top-27" : "top-16"
        } ${open ? "flex" : "hidden"}`}
      >
        <div className="flex h-full w-full flex-col justify-between gap-y-2 p-4">
          <div className="grid gap-y-2">
            {links.map((link) => (
              <a
                key={link.href + link.label}
                href={link.href}
                className="inline-flex h-11 items-center px-3 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="grid gap-y-2">
            {secondaryCta?.label && (
              <ButtonLink variant="outline" href={secondaryCta.href} className="h-11">
                {secondaryCta.label}
              </ButtonLink>
            )}
            {primaryCta?.label && (
              <ButtonLink href={primaryCta.href} className="h-11">
                {primaryCta.label}
              </ButtonLink>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
