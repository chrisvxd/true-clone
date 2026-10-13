import type { ReactNode } from "react";

// `name` and group `title` are inline-editable, so inside the editor they
// arrive as elements rather than strings.
export type TeamMember = { name: ReactNode; slug: string; photo: string };

export type TeamGridProps = {
  groups: { title: ReactNode; members: TeamMember[] }[];
};

export function TeamGrid({ groups = [] }: TeamGridProps) {
  return (
    <section className="px-4 pb-20 md:pb-[160px] lg:px-14">
      <div className="relative z-[2] mx-auto mt-8 max-w-site md:mt-12">
        <div className="space-y-16 md:space-y-24">
          {groups.map((group, gi) => (
            <div key={gi}>
              <h3 className="mb-10 border-b border-border pb-4 font-mono text-xs tracking-[0.12em] text-muted-foreground uppercase">
                {group.title}
              </h3>
              <div className="grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7">
                {(group.members ?? []).map((member, mi) => (
                  <a
                    key={member.slug || mi}
                    href={member.slug ? `/team/${member.slug}` : undefined}
                    className="group block no-underline outline-none"
                  >
                    <div className="relative aspect-square overflow-hidden rounded-sm bg-white">
                      {member.photo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={member.photo}
                          alt={typeof member.name === "string" ? member.name : ""}
                          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-muted font-serif text-3xl text-muted-foreground">
                          {typeof member.name === "string" ? member.name[0] : ""}
                        </div>
                      )}
                    </div>
                    <p className="mt-3 font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase transition-colors group-hover:text-foreground">
                      {member.name}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
