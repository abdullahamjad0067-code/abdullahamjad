import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

type Props = {
  id: string;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  /** Extra vertical rhythm tiers. */
  space?: "sm" | "md" | "lg";
  labelledBy?: string;
  as?: "section" | "div";
};

const spacing = {
  sm: "py-[clamp(3rem,7vw,5rem)]",
  md: "py-[clamp(4.5rem,10vw,8rem)]",
  lg: "py-[clamp(6rem,13vw,11rem)]",
};

export function SectionContainer({
  id,
  children,
  className,
  innerClassName,
  space = "md",
  labelledBy,
  as = "section",
}: Props) {
  const Tag = as;
  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      className={cn("relative scroll-mt-24", spacing[space], className)}
    >
      <div className={cn("shell", innerClassName)}>{children}</div>
    </Tag>
  );
}
