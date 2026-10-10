import { SectionContainer } from "../layout/SectionContainer";
import { SectionHeading } from "../layout/SectionHeading";
import { Reveal } from "../animations/Reveal";
import { site } from "../../data/site";

const facts = [
  { label: "Education", value: `${site.degree}, ${site.university}` },
  { label: "Session", value: site.session },
  { label: "Focus", value: "Full-stack development · AI/ML" },
  { label: "Based in", value: site.location },
];

export function AboutSection() {
  return (
    <SectionContainer id="about" labelledBy="about-title" space="lg">
      <SectionHeading
        index="01"
        kicker="About"
        id="about-title"
        title="A student developer who learns the craft by shipping real work."
      />

      <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="space-y-6 text-base text-muted sm:text-lg lg:col-span-7">
          <Reveal>
            <p>
              I&apos;m Abdullah Amjad, a Software Engineering student at the{" "}
              <span className="text-text">University of Sargodha</span>. I build
              applications from the ground up — shaping the interface, writing
              the backend, and designing the data behind it.
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <p>
              My work spans web applications, APIs, database-backed systems, and
              security-focused projects. Alongside that, I&apos;m developing
              expertise in AI and machine learning, with an interest in applying
              it to practical problems.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="text-text">
              I care about considered interfaces, maintainable code, and
              software that solves a real problem.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
          <dl className="divide-y divide-border border-y border-border">
            {facts.map((fact) => (
              <div key={fact.label} className="py-4">
                <dt className="text-xs text-faint">{fact.label}</dt>
                <dd className="mt-1 text-sm text-text">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </SectionContainer>
  );
}
