import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, X } from "lucide-react";
import type { Project } from "../../data/projects";
import { ProjectVisual } from "./ProjectVisual";
import { TechList } from "./ProjectCard";

type Props = {
  project: Project;
  onClose: () => void;
};

export function ProjectDetails({ project, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6">
      <motion.button
        type="button"
        aria-label="Close project details"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-bg/80 backdrop-blur-sm"
      />

      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`pd-title-${project.id}`}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-surface border border-border bg-surface sm:rounded-surface"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-border bg-surface/95 px-5 py-4 backdrop-blur sm:px-7">
          <div className="min-w-0">
            <p className="mono-label text-accent">{project.category}</p>
            <h3
              id={`pd-title-${project.id}`}
              className="mt-1 truncate font-display text-xl font-semibold sm:text-2xl"
            >
              {project.title}
            </h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-control border border-border text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        </div>

        <div className="px-5 py-6 sm:px-7 sm:py-8">
          <ProjectVisual variant={project.id} />

          <p className="mt-6 text-base text-muted sm:text-lg">{project.body}</p>

          <div className="mt-8 grid gap-8 sm:grid-cols-5">
            <div className="sm:col-span-3">
              <p className="mono-label mb-4 text-faint">Highlights</p>
              <ul className="space-y-2.5">
                {project.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm text-muted"
                  >
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="sm:col-span-2">
              <p className="mono-label mb-4 text-faint">Stack</p>
              <TechList tech={project.tech} className="gap-y-2" />

              {(project.links.demo || project.links.repo) && (
                <div className="mt-6 flex flex-col gap-3">
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
                    >
                      Live demo <ArrowUpRight className="size-4" />
                    </a>
                  )}
                  {project.links.repo && (
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
                    >
                      <Github className="size-4" /> Source code
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          {project.status && (
            <p className="mono-label mt-8 border-t border-border pt-5 text-faint">
              Status · {project.status}
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
