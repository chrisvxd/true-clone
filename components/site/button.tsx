import type { AnchorHTMLAttributes } from "react";

export type ButtonVariant = "default" | "outline" | "ghost";

const base =
  "inline-flex shrink-0 items-center justify-center gap-1.5 border bg-clip-padding text-sm font-medium whitespace-nowrap outline-none select-none transition-transform duration-150 ease-out focus-visible:ring-3 focus-visible:ring-ring/30 active:scale-[0.96] h-9 px-3";

const variants: Record<ButtonVariant, string> = {
  default:
    "border-transparent bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground",
  outline: "border-border bg-background hover:bg-muted hover:text-foreground",
  ghost:
    "border-transparent text-base text-muted-foreground hover:bg-muted hover:text-foreground",
};

export function buttonClass(variant: ButtonVariant = "default", extra = "") {
  return `${base} ${variants[variant]} ${extra}`.trim();
}

export function isExternal(href = "") {
  return /^(https?:)?\/\//.test(href);
}

export function ButtonLink({
  variant = "default",
  className = "",
  href = "#",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: ButtonVariant }) {
  const external = isExternal(href);
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={buttonClass(variant, className)}
      {...props}
    />
  );
}
