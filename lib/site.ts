import type { SiteShellProps } from "../components/site/SiteShell";

// Base URL for images hotlinked from the original site.
export const ASSET_BASE = "https://www.trueventures.com";

// Site-wide chrome shared by every page. Kept in code (rather than per-page
// root props) so the header and footer can't drift between pages.
export const site: Omit<SiteShellProps, "children" | "background"> = {
  announcement: {
    enabled: true,
    text: "Explore What We’re Building",
    href: "https://trueventures.ai",
  },
  header: {
    logo: `${ASSET_BASE}/logo.png`,
    logoAlt: "True Ventures",
    links: [
      { label: "About", href: "/about" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Team", href: "/team" },
      { label: "Writings", href: "/writings" },
      { label: "Jobs", href: "https://jobs.trueventures.com/companies" },
    ],
    secondaryCta: { label: "True Connect", href: "https://trueconnect.vc/" },
    primaryCta: { label: "Pitch Us", href: "mailto:pitch@trueventures.com" },
  },
  footer: {
    newsletterLabel: "Subscribe to our newsletter",
    newsletterPlaceholder: "you@example.com",
    newsletterButton: "Subscribe",
    legalLinks: [
      { label: "Terms of Use", href: "/terms-of-use" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
    copyright: "© 2026 True Ventures. All rights reserved.",
    socials: [
      { platform: "linkedin", url: "https://www.linkedin.com/company/true-ventures" },
      { platform: "bluesky", url: "https://bsky.app/profile/trueventures.com" },
      { platform: "x", url: "https://x.com/trueventures" },
      { platform: "instagram", url: "https://www.instagram.com/trueventures" },
    ],
  },
};
