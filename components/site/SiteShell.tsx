import type { ReactNode } from "react";
import { fontVariables } from "../../lib/fonts";
import { SiteHeader, type SiteHeaderProps } from "./SiteHeader";
import { SiteFooter, type SiteFooterProps } from "./SiteFooter";

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export type SiteShellProps = {
  announcement: { enabled: boolean; text: string; href: string };
  header: Omit<SiteHeaderProps, "offsetTop">;
  footer: SiteFooterProps;
  background: "gradient" | "plain";
  children: ReactNode;
};

export function SiteShell({
  announcement,
  header,
  footer,
  background,
  children,
}: SiteShellProps) {
  const showAnnouncement = Boolean(announcement?.enabled && announcement.text);

  return (
    <div className={`${fontVariables} font-sans text-foreground`}>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.04]"
        style={{ backgroundImage: NOISE, backgroundRepeat: "repeat", backgroundSize: 128 }}
      />

      {showAnnouncement && (
        <div className="fixed inset-x-0 top-0 z-[110] flex items-center justify-center gap-x-6 bg-primary px-6 py-2.5 sm:px-3.5">
          <p className="text-sm/6 text-primary-foreground">
            <a href={announcement.href} target="_blank" rel="noopener noreferrer">
              <strong className="font-semibold">{announcement.text}</strong>
              <span aria-hidden="true"> →</span>
            </a>
          </p>
        </div>
      )}

      <SiteHeader {...header} offsetTop={showAnnouncement} />

      <main
        className={
          background === "gradient"
            ? "bg-gradient-to-b from-background to-muted"
            : "bg-background"
        }
      >
        {children}
      </main>

      <SiteFooter {...footer} />
    </div>
  );
}
