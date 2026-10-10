import { useEffect, useRef } from "react";

/**
 * Lenis smooth scrolling, wired into requestAnimationFrame and gracefully
 * disabled for users who prefer reduced motion. Anchor clicks are intercepted
 * and delegated to Lenis so in-page navigation stays smooth.
 */
export function useSmoothScroll(enabled: boolean) {
  const lenisRef = useRef<import("lenis").default | null>(null);

  useEffect(() => {
    if (!enabled) return;

    let frame = 0;
    let lenis: import("lenis").default | null = null;
    let cancelled = false;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({
        duration: 1.05,
        lerp: 0.09,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      });
      lenisRef.current = lenis;

      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);

      const onClick = (event: MouseEvent) => {
        const target = (event.target as HTMLElement | null)?.closest(
          'a[href^="#"]',
        ) as HTMLAnchorElement | null;
        if (!target) return;
        const hash = target.getAttribute("href");
        if (!hash || hash === "#") return;
        const el = document.querySelector(hash);
        if (!el) return;
        event.preventDefault();
        lenis?.scrollTo(el as HTMLElement, { offset: -72 });
        history.replaceState(null, "", hash);
      };

      document.addEventListener("click", onClick);
      return () => document.removeEventListener("click", onClick);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, [enabled]);

  return lenisRef;
}
