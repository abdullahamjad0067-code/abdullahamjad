import type { ReactNode } from "react";
import { Reveal } from "../animations/Reveal";
import { cn } from "../../lib/utils";

type Props = {
  /** Section index, e.g. "01". Rendered in the left gutter column. */
  index: string;
  /** Short section name shown beside the index. */
  kicker: string;
  title: ReactNode;
  id?: string;
  lead?: ReactNode;
  className?: string;
};

/**
 * Editorial section header: a small index + name anchored in a narrow left
 * column, with the title and optional lead set in the wide right column.
 * The asymmetry is intentional — sections never begin with a centred stack.
 */
export function SectionHeading({
  index,
  kicker,
  title,
  id,
  lead,
  className,
}: Props) {
  return (
    <div className={cn("grid gap-8 lg:grid-cols-12 lg:gap-12", className)}>
      <Reveal className="lg:col-span-3" y={12}>
        <p className="mono-label text-faint">
          <span className="text-muted">{index}</span>
          <span className="mx-2 opacity-40">/</span>
          {kicker}
        </p>
      </Reveal>

      <div className="lg:col-span-9">
        <Reveal delay={0.06}>
          <h2 id={id} className="max-w-3xl font-display text-2xl font-medium tracking-tight text-text sm:text-3xl">
            {title}
          </h2>
        </Reveal>
        {lead && (
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-base text-muted sm:text-lg">
              {lead}
            </p>
          </Reveal>
        )}
      </div>
    </div>
  );
}
