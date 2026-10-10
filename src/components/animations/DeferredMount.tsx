import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  placeholder?: ReactNode;
  rootMargin?: string;
};

/**
 * Renders children only once the wrapper approaches the viewport. Used to keep
 * below-the-fold JavaScript (form validation libraries) out of the initial
 * bundle and off the main thread until it is actually needed.
 */
export function DeferredMount({
  children,
  placeholder = null,
  rootMargin = "300px",
}: Props) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShow(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return <div ref={ref}>{show ? children : placeholder}</div>;
}
