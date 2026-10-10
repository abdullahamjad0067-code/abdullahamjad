import { ArrowUpRight } from "lucide-react";
import type { Project } from "../../data/projects";
import { ProjectVisual } from "./ProjectVisual";
import { cn } from "../../lib/utils";

type Props = {
  project: Project;
  featured?: boolean;
  reverse?: boolean;
  onOpen: (project: Project) => void;
};

export function ProjectCard({
  project,
  featured = false,
  reverse = false,
  onOpen,
}: Props) {
  const ctaLabel =
    project.status === "RESEARCH DIRECTION"
      ? "View research direction"
      : "View case study";

  const openButton = (size: "featured" | "grid") => (
    <button
      type="button"
      onClick={() => onOpen(project)}
      aria-label={`${ctaLabel}: ${project.title}`}
      className={cn(
        "group/cta inline-flex items-center gap-2 font-medium text-text transition-colors hover:text-accent",
        size === "featured" ? "text-base" : "text-sm",
      )}
    >
      {ctaLabel}
      <span className="grid size-6 place-items-center rounded-full border border-border-strong transition-colors group-hover/cta:border-accent">
        <ArrowUpRight
          aria-hidden="true"
          className="size-3.5 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
        />
      </span>
    </button>
  );

  if (featured) {
    return (
      <article className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
        <div
          className={cn(
            "overflow-hidden lg:col-span-7",
            reverse && "lg:order-2",
          )}
        >
          <div className="transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.015]">
            <ProjectVisual variant={project.id} />
          </div>
        </div>

        <div className={cn("lg:col-span-5", reverse && "lg:order-1")}>
          <div className="flex items-center gap-3 text-xs text-faint">
            <span className="text-muted">{project.index}</span>
            <span className="h-px w-6 bg-border" />
            <span className="mono-label">{project.category}</span>
          </div>

          <h3 className="mt-5 font-display text-2xl font-medium sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-4 max-w-prose text-base text-muted">
            {project.summary}
          </p>
          <TechList tech={project.tech} className="mt-6" />
          <div className="mt-8">{openButton("featured")}</div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col">
      <div className="overflow-hidden">
        <div className="transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.02]">
          <ProjectVisual variant={project.id} />
        </div>
      </div>

      <div className="mt-6 flex flex-1 flex-col border-t border-border pt-5">
        <div className="flex items-center justify-between gap-3 text-xs text-faint">
          <span className="text-muted">{project.index}</span>
          <span className="mono-label">{project.category}</span>
        </div>

        <h3 className="mt-4 font-display text-xl font-medium sm:text-2xl">
          {project.title}
        </h3>
        <p className="mt-3 text-sm text-muted">{project.summary}</p>
        <TechList tech={project.tech} className="mt-5" />
        <div className="mt-6 pt-1">{openButton("grid")}</div>
      </div>
    </article>
  );
}

export function TechList({
  tech,
  className,
}: {
  tech: string[];
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-wrap gap-x-4 gap-y-1", className)}>
      {tech.map((item) => (
        <li key={item} className="font-mono text-xs tracking-wide text-faint">
          {item}
        </li>
      ))}
    </ul>
  );
}
