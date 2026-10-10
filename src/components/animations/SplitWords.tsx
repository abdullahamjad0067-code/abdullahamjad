import { motion, useReducedMotion } from "framer-motion";

type SplitWordsProps = {
  text: string;
  className?: string;
  delay?: number;
  /** Words (case-insensitive) rendered with the accent colour. */
  highlight?: string[];
  /** Accent class applied to highlighted words. */
  highlightClassName?: string;
};

/**
 * Word-by-word masked reveal. Each word rises out of a clipping box so the
 * type reveals rather than fades. Falls back to static text for reduced motion.
 */
export function SplitWords({
  text,
  className,
  delay = 0,
  highlight = [],
  highlightClassName = "text-accent",
}: SplitWordsProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const highlightSet = new Set(highlight.map((w) => w.toLowerCase()));

  if (reduce) {
    return (
      <span className={className}>
        {words.map((word, i) => {
          const isHi = highlightSet.has(
            word.toLowerCase().replace(/[^a-z]/g, ""),
          );
          return (
            <span key={`${word}-${i}`} className={isHi ? highlightClassName : undefined}>
              {word}
              {i < words.length - 1 ? " " : ""}
            </span>
          );
        })}
      </span>
    );
  }

  return (
    <span className={className}>
      {words.map((word, i) => {
        const clean = word.toLowerCase().replace(/[^a-z]/g, "");
        const isHi = highlightSet.has(clean);
        return (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden align-bottom pt-[0.08em] pb-[0.12em]"
          >
            <motion.span
              className={`inline-block ${isHi ? highlightClassName : ""}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: delay + i * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        );
      })}
    </span>
  );
}
