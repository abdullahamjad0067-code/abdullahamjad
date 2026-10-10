import { ArrowRight } from "lucide-react";
import { AnimatedButton } from "../animations/AnimatedButton";

export function HeroActions() {
  return (
    <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
      <AnimatedButton href="#work" variant="primary" size="lg" arrow={false}>
        View selected work
      </AnimatedButton>

      <a
        href="#contact"
        className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-text"
      >
        Get in touch
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
        />
      </a>
    </div>
  );
}
