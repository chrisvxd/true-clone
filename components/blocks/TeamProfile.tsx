import type { ReactNode } from "react";
import { formatLongDate, postsByAuthor } from "../../lib/writings";
import { ArrowLeft, ArrowRight } from "../site/icons";

export type TeamProfileProps = {
  name: string;
  role: ReactNode;
  photo: string;
  links: { label: string; url: string }[];
  bio: ReactNode;
  showWriting: boolean;
  writingLimit: number;
};

export function TeamProfile({
  name,
  role,
  photo,
  links = [],
  bio,
  showWriting = true,
  writingLimit = 6,
}: TeamProfileProps) {
  const posts = showWriting ? postsByAuthor(name) : [];
  const [lead, ...rest] = posts;
  const more = rest.slice(0, Math.max(writingLimit - 1, 0));

  return (
    <div className="px-4 pt-40 pb-24 lg:px-14">
      <div className="mx-auto max-w-3xl">
        <a
          href="/team"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.12em] text-muted-foreground uppercase transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> All team
        </a>

        <div className="mt-8 grid grid-cols-1 gap-8 md:mt-12 md:grid-cols-[280px_1fr] md:gap-14">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[280px] overflow-hidden bg-white md:mx-0 md:max-w-none">
            {photo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photo} alt={name} className="absolute inset-0 h-full w-full object-cover" />
            )}
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-center font-serif text-[clamp(32px,4.5vw,56px)] leading-none font-extralight tracking-[-0.03em] text-foreground md:text-left">
              {name}
            </h1>
            {role && (
              <p className="mt-3 font-mono text-xs tracking-[0.12em] text-muted-foreground uppercase">
                {role}
              </p>
            )}
            {links.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-medium md:mt-6 md:justify-start">
                {links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-foreground transition-colors hover:text-brand-blue"
                  >
                    {link.label} ↗
                  </a>
                ))}
              </div>
            )}
            {posts.length > 0 && (
              <a
                href="#writing"
                className="mt-8 inline-flex min-h-[44px] items-center gap-4 border-b border-border text-base transition-colors hover:text-brand-blue"
              >
                Read my writing <ArrowRight className="size-4" />
              </a>
            )}
          </div>
        </div>

        {bio && <div className="tv-prose mt-14 max-w-2xl text-lg leading-[1.7] text-muted-foreground">{bio}</div>}

        {lead && (
          <section id="writing" className="mt-16 scroll-mt-36 border-t border-foreground pt-8 md:mt-20 md:pt-9">
            <div className="mb-9 flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="font-serif text-[33px] leading-tight font-normal tracking-[-0.035em] md:text-[38px]">
                Writing
              </h2>
              <p className="text-sm text-muted-foreground">By {name}</p>
            </div>
            <a href={`/writings/${lead.slug}`} className="group block pb-9">
              <p className="font-mono text-xs leading-relaxed text-muted-foreground">
                {formatLongDate(lead.date)} / {lead.authors.join(" & ")}
              </p>
              <h3 className="mt-4 max-w-2xl font-serif text-[32px] leading-[1.15] font-normal tracking-[-0.025em] transition-colors group-hover:text-brand-blue md:text-[38px]">
                {lead.title}
              </h3>
              <span className="mt-4 inline-flex items-center gap-2 text-sm">
                Read article <ArrowRight className="size-4" />
              </span>
            </a>
            {more.length > 0 && (
              <div className="border-b border-border">
                {more.map((post) => (
                  <a
                    key={post.slug}
                    href={`/writings/${post.slug}`}
                    className="group grid grid-cols-[minmax(0,1fr)_24px] gap-x-5 gap-y-2 border-t border-border py-7 md:grid-cols-[112px_minmax(0,1fr)_28px] md:gap-x-6 md:py-8"
                  >
                    <time className="col-span-2 font-mono text-xs leading-relaxed text-muted-foreground md:col-span-1 md:pt-1">
                      {formatLongDate(post.date)}
                    </time>
                    <div className="min-w-0">
                      <h3 className="text-[22px] leading-[1.3] font-medium tracking-[-0.025em] transition-colors group-hover:text-brand-blue">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">{post.authors.join(" & ")}</p>
                    </div>
                    <ArrowRight className="size-5 self-center text-muted-foreground group-hover:text-foreground" />
                  </a>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
