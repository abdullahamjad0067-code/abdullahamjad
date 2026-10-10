import { Github, Linkedin, ArrowUp, Mail, ExternalLink } from "lucide-react";
import { navItems } from "../../data/navigation";
import { site } from "../../data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/80 bg-ink-950">
      <div className="shell py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Column 1: Identity & focus */}
          <div className="lg:col-span-5">
            <span className="block font-display text-lg font-semibold text-text">
              {site.name}
            </span>
            <span className="block font-mono text-xs text-muted mt-1">
              Full-Stack Developer & Software Engineering Student
            </span>

            <p className="mt-4 max-w-sm font-sans text-sm leading-relaxed text-muted">
              Building web applications, applied machine learning projects, and real tools with clean code and practical performance.
            </p>

            <p className="mt-4 font-mono text-xs text-faint">
              Based in {site.location} · University of Sargodha
            </p>
          </div>

          {/* Column 2: Index sitemap */}
          <div className="lg:col-span-3 lg:col-start-7">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-text">
              Index
            </h4>
            <ul className="mt-4 space-y-2.5 font-mono text-xs text-muted">
              {navItems.map((item, idx) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="group inline-flex items-center gap-2 transition-colors hover:text-accent"
                  >
                    <span className="text-[10px] text-faint group-hover:text-accent">
                      0{idx + 1}
                    </span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Direct contact & channels */}
          <div className="lg:col-span-3">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-text">
              Channels
            </h4>
            <ul className="mt-4 space-y-2.5 font-mono text-xs text-muted">
              <li>
                <a
                  href={site.socials.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-2 transition-colors hover:text-text"
                >
                  <Github className="size-3.5 text-accent" />
                  <span>GitHub</span>
                  <ExternalLink className="size-3 text-faint group-hover:text-text" />
                </a>
              </li>
              <li>
                <a
                  href={site.socials.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-2 transition-colors hover:text-text"
                >
                  <Linkedin className="size-3.5 text-accent" />
                  <span>LinkedIn</span>
                  <ExternalLink className="size-3 text-faint group-hover:text-text" />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="group inline-flex items-center gap-2 transition-colors hover:text-accent"
                >
                  <Mail className="size-3.5 text-accent" />
                  <span>{site.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Colophon & back to top */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-8 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-faint">
            © {year} {site.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-faint">
              {site.location}
            </span>
            <a
              href="#home"
              aria-label="Scroll back to top"
              className="inline-flex size-7 items-center justify-center rounded border border-border-strong bg-surface text-muted transition-all duration-200 hover:border-accent hover:text-accent hover:-translate-y-0.5"
            >
              <ArrowUp className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
