import { motion } from "framer-motion";
import { SectionContainer } from "../layout/SectionContainer";
import { SectionHeading } from "../layout/SectionHeading";
import { Reveal } from "../animations/Reveal";
import rawIcons from "../../data/techIcons.json";

type IconEntry = { title: string; hex: string; path: string };
const iconMap: Record<string, IconEntry> = rawIcons as Record<string, IconEntry>;

// The core main skills only — concise, real colored logos, verified proficiency
const coreSkills = [
  { name: "React", iconKey: "siReact", level: 92, defaultHex: "61DAFB" },
  { name: "JavaScript", iconKey: "siJavascript", level: 90, defaultHex: "F7DF1E" },
  { name: "Tailwind CSS", iconKey: "siTailwindcss", level: 95, defaultHex: "06B6D4" },
  { name: "Python", iconKey: "siPython", level: 88, defaultHex: "3776AB" },
  { name: "FastAPI", iconKey: "siFastapi", level: 85, defaultHex: "009688" },
  { name: "PostgreSQL", iconKey: "siPostgresql", level: 84, defaultHex: "4169E1" },
  { name: "scikit-learn", iconKey: "siScikitlearn", level: 80, defaultHex: "F7931E" },
  { name: "C++", iconKey: "siCplusplus", level: 85, defaultHex: "00599C" },
  { name: "Git & GitHub", iconKey: "siGit", level: 90, defaultHex: "F03C2E" },
  { name: "Linux", iconKey: "siLinux", level: 84, defaultHex: "FCC624" },
  { name: "PHP & MySQL", iconKey: "siPhp", level: 82, defaultHex: "777BB4" },
  { name: "Figma UI/UX", iconKey: "siFigma", level: 86, defaultHex: "F24E1E" },
];

export function SkillsSection() {
  return (
    <SectionContainer id="skills" labelledBy="skills-title" space="lg">
      <SectionHeading
        index="03"
        kicker="Stack & Capabilities"
        id="skills-title"
        title="Tools, Technology & Proficiency"
        lead="Core technical stack with real-world proficiency, daily tools, and engineering fluency."
      />

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {coreSkills.map((skill, idx) => {
          const icon = iconMap[skill.iconKey];
          const colorHex = `#${icon?.hex || skill.defaultHex}`;

          return (
            <Reveal key={skill.name} delay={idx * 0.04} y={16}>
              <div className="group relative flex flex-col justify-between rounded-xl border border-border/80 bg-surface/70 p-5 transition-all duration-300 hover:border-accent hover:bg-surface hover:-translate-y-1 hover:shadow-[0_10px_26px_rgba(0,0,0,0.5)]">
                {/* Header row: Real colored logo + Name + Percentage */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div
                      className="flex size-11 items-center justify-center rounded-xl border border-border-strong/70 bg-ink-900 transition-all duration-300 group-hover:scale-110 group-hover:border-border group-hover:bg-ink-850"
                    >
                      {icon ? (
                        <svg
                          role="img"
                          viewBox="0 0 24 24"
                          className="size-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                          style={{ fill: colorHex }}
                          aria-hidden="true"
                        >
                          <path d={icon.path} />
                        </svg>
                      ) : (
                        <span className="size-2 rounded-full bg-accent" />
                      )}
                    </div>

                    <div>
                      <h4 className="font-display text-base font-medium text-text group-hover:text-accent transition-colors">
                        {skill.name}
                      </h4>
                      <span className="font-mono text-[11px] text-faint">
                        Production Proficiency
                      </span>
                    </div>
                  </div>

                  <span className="font-mono text-sm font-semibold text-accent">
                    {skill.level}%
                  </span>
                </div>

                {/* Animated Percentage Progress Bar */}
                <div className="mt-5">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2/80">
                    <motion.div
                      className="h-full rounded-full bg-accent"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.85,
                        delay: 0.15 + idx * 0.03,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      style={{
                        boxShadow: "0 0 8px rgba(198, 255, 0, 0.4)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </SectionContainer>
  );
}
