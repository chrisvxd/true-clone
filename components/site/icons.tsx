import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function ArrowUpRight(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function ArrowLeft(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M19 12H5" />
      <path d="m11 18-6-6 6-6" />
    </svg>
  );
}

export function ChevronDown(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4.5 3A1.5 1.5 0 0 0 3 4.5v15A1.5 1.5 0 0 0 4.5 21h15a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 19.5 3h-15Zm2.2 3.4a1.45 1.45 0 1 1 0 2.9 1.45 1.45 0 0 1 0-2.9ZM5.5 10h2.4v8H5.5v-8Zm4 0h2.3v1.1c.4-.7 1.3-1.3 2.6-1.3 2.4 0 2.9 1.6 2.9 3.6V18h-2.4v-4.1c0-1-.1-2.1-1.4-2.1-1.4 0-1.6 1-1.6 2V18H9.5v-8Z" />
    </svg>
  );
}

export function BlueskyIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M6.3 4.6c2.1 1.6 4.3 4.7 5.2 6.4.9-1.7 3.1-4.8 5.2-6.4 1.5-1.1 3.9-2 3.9.8 0 .5-.3 4.6-.5 5.3-.6 2.3-2.9 2.9-5 2.5 3.6.6 4.5 2.6 2.5 4.6-3.8 3.9-5.4-1-5.9-2.2l-.2-.5-.2.5c-.4 1.2-2.1 6.1-5.9 2.2-2-2-1.1-4 2.5-4.6-2.1.4-4.4-.2-5-2.5-.2-.7-.5-4.8-.5-5.3 0-2.8 2.4-1.9 3.9-.8Z" />
    </svg>
  );
}

export function XIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.2 3.5h2.9l-6.4 7.3 7.5 9.7h-5.9l-4.6-6-5.3 6H2.5l6.8-7.8-7.2-9.2h6l4.2 5.5 4.9-5.5Zm-1 15.3h1.6L7.9 5.1H6.2l10 13.7Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export const socialIcons = {
  linkedin: LinkedInIcon,
  bluesky: BlueskyIcon,
  x: XIcon,
  instagram: InstagramIcon,
};

export type SocialPlatform = keyof typeof socialIcons;
