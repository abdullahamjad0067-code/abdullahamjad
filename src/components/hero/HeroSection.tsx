import { motion, useReducedMotion } from "framer-motion";
import { SplitWords } from "../animations/SplitWords";
import { AvatarScene } from "./AvatarScene";
import { HeroActions } from "./HeroActions";

const ease = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease },
        };

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-12 pb-12 sm:pt-14 lg:min-h-[84svh] lg:pt-16 lg:pb-12"
    >
      <div className="shell flex h-full flex-col justify-center">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* ---- Editorial column ---- */}
          <div className="lg:col-span-7 xl:col-span-7">
            <h1
              id="hero-title"
              className="mt-2 font-display text-hero font-medium"
            >
              <motion.span className="block">
                <SplitWords text="I build digital" delay={0.2} />
              </motion.span>
              <motion.span className="block">
                <SplitWords text="things that" delay={0.31} />
              </motion.span>
              <motion.span className="block">
                <SplitWords
                  text="do more."
                  highlight={["more"]}
                  delay={0.42}
                />
              </motion.span>
            </h1>

            <motion.p
              {...rise(0.55)}
              className="mt-9 max-w-[34rem] text-base text-muted sm:text-lg"
            >
              I&apos;m Abdullah — a software engineering student and full-stack
              developer. I build web products end to end, from interface to
              database, and I&apos;m developing expertise in applied AI and
              machine learning.
            </motion.p>

            <motion.div {...rise(0.68)} className="mt-10">
              <HeroActions />
            </motion.div>
          </div>

          {/* ---- 3D subject ---- */}
          <motion.div
            className="relative lg:col-span-5 xl:col-span-5"
            {...(reduce
              ? {}
              : {
                  initial: { opacity: 0, scale: 0.96 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { duration: 1.2, delay: 0.25, ease },
                })}
          >
            <AvatarScene />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
