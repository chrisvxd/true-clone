import type { ReactNode } from "react";
import type { SlotComponent } from "@puckeditor/core";

export type TextSectionProps = {
  eyebrow: string;
  heading: ReactNode;
  headingStyle: "serif" | "label";
  body: ReactNode;
  spacingTop: "md" | "lg";
  content: SlotComponent;
};

export function TextSection({
  eyebrow,
  heading,
  headingStyle = "serif",
  body,
  spacingTop = "md",
  content: Content,
}: TextSectionProps) {
  return (
    <section
      className={`mx-auto max-w-[680px] px-4 lg:px-0 ${spacingTop === "lg" ? "mt-20" : "mt-16"}`}
    >
      {eyebrow && (
        <p className="mb-4 font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase">
          {eyebrow}
        </p>
      )}
      {heading &&
        (headingStyle === "serif" ? (
          <h2 className="font-serif text-[clamp(30px,3.5vw,40px)] leading-[1.1] font-extralight tracking-[-0.025em] text-balance text-foreground">
            {heading}
          </h2>
        ) : (
          <h2 className="text-[18px] font-semibold text-foreground">{heading}</h2>
        ))}
      {body && (
        <div className="mt-4 text-[18px] leading-[1.75] text-foreground/85 [&_p+p]:mt-4 [&_strong]:font-semibold [&_strong]:text-foreground">
          {body}
        </div>
      )}
      {Content && <Content className="mt-8" />}
    </section>
  );
}
