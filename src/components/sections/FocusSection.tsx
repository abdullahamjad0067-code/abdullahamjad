import { SectionContainer } from "../layout/SectionContainer";
import { SectionHeading } from "../layout/SectionHeading";
import { Reveal } from "../animations/Reveal";

const themes = [
  {
    id: "web",
    title: "Web engineering",
    items: ["React", "APIs", "Databases", "Application security"],
  },
  {
    id: "ai",
    title: "AI & machine learning",
    items: ["Python", "Data preparation", "Model evaluation", "Computer vision"],
  },
];

export function FocusSection() {
  return (
    <SectionContainer id="beyond" labelledBy="beyond-title" space="lg">
      <SectionHeading
        index="04"
        kicker="Beyond code"
        id="beyond-title"
        title="Engineering quality and intelligent systems."
        lead="Full-stack development is where I build and test ideas today. What I care about beyond shipping features is the thinking underneath: maintainable structure, sound data, and honest engineering."
      />

      <div className="mt-16 grid gap-x-16 gap-y-12 lg:grid-cols-2">
        {themes.map((theme, i) => (
          <Reveal key={theme.id} delay={i * 0.08}>
            <div className="border-t border-border pt-6">
              <h3 className="font-display text-xl font-medium sm:text-2xl">
                {theme.title}
              </h3>
              <ul className="mt-6 space-y-3">
                {theme.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-muted"
                  >
                    <span className="h-px w-5 bg-border-strong" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.15} className="mt-16">
        <p className="max-w-2xl text-base text-muted sm:text-lg">
          I&apos;m particularly interested in applied AI that addresses practical
          problems — including agriculture and other challenges relevant to
          Pakistan, where I live and study.
        </p>
      </Reveal>
    </SectionContainer>
  );
}
