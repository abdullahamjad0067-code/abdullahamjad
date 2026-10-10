import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Optional leading node rendered before the label. */
  leading?: ReactNode;
  /** Show the trailing arrow. Defaults to true. */
  arrow?: boolean;
  external?: boolean;
  ariaLabel?: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

const base =
  "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-control font-medium tracking-tight transition-transform duration-150 ease-[var(--ease-spring)] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-45";

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-ink hover:brightness-[1.08]",
  secondary:
    "border border-border-strong text-text hover:border-accent hover:text-accent",
  ghost: "text-muted hover:text-text",
};

export function AnimatedButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  leading,
  arrow = true,
  external = false,
  ariaLabel,
  type = "button",
  disabled = false,
}: Props) {
  const content = (
    <>
      {variant === "secondary" && (
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 origin-left scale-x-0 bg-accent/10 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
        />
      )}
      {leading}
      <span className="relative">{children}</span>
      {arrow && (
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  );

  const classes = cn(base, sizes[size], variants[variant], className);

  if (href) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        className={classes}
        {...(external
          ? { target: "_blank", rel: "noreferrer noopener" }
          : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      className={classes}
    >
      {content}
    </button>
  );
}
