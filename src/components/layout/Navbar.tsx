import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navItems } from "../../data/navigation";
import { site } from "../../data/site";
import { useActiveSection } from "../../hooks/useActiveSection";
import { cn } from "../../lib/utils";

const sectionIds = ["home", ...navItems.map((item) => item.id)];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) panelRef.current?.querySelector("a")?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 transition-all duration-300">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-3.5">
        <div
          className={cn(
            "relative flex h-12 items-center justify-between rounded-full border px-4 transition-all duration-300",
            scrolled
              ? "border-border-strong/90 bg-ink-950/90 shadow-[0_12px_32px_rgba(0,0,0,0.8)] backdrop-blur-xl"
              : "border-border/60 bg-ink-950/60 shadow-[0_4px_24px_rgba(0,0,0,0.4)] backdrop-blur-md",
          )}
        >
          {/* Brand Name */}
          <a
            href="#home"
            className="group flex items-center font-display tracking-tight text-text"
            aria-label={`${site.name} — home`}
          >
            <span className="font-display text-sm font-semibold tracking-tight text-text group-hover:text-accent transition-colors">
              {site.name}
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1 rounded-full border border-border/40 bg-surface/50 p-1 backdrop-blur-sm">
              {navItems.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative block rounded-full px-4 py-1 font-mono text-[11px] tracking-wider transition-all duration-200",
                        isActive
                          ? "bg-accent text-accent-ink font-semibold shadow-sm"
                          : "text-muted hover:text-text hover:bg-surface-2",
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Direct Contact */}
          <div className="flex items-center gap-2.5">
            <a
              href="#contact"
              className="group inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-surface-2 px-3.5 py-1.5 font-mono text-xs font-medium text-text transition-all duration-200 hover:border-accent hover:text-accent hover:bg-surface active:scale-95"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="size-3 text-accent transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex size-7 items-center justify-center rounded-full border border-border bg-surface text-text md:hidden"
            >
              {open ? <X className="size-3.5" /> : <Menu className="size-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-40 rounded-2xl border border-border bg-ink-950/95 p-6 shadow-2xl backdrop-blur-2xl lg:hidden"
          >
            <ul className="flex flex-col gap-2">
              {navItems.map((item, i) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-3 font-display text-lg font-medium text-text transition-colors hover:bg-surface hover:text-accent"
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-xs text-faint">
                      0{i + 1}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-border pt-4">
              <a
                href={`mailto:${site.email}`}
                onClick={() => setOpen(false)}
                className="font-mono text-xs text-accent"
              >
                {site.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
