import { lazy, Suspense } from "react";
import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { SectionContainer } from "../layout/SectionContainer";
import { SectionHeading } from "../layout/SectionHeading";
import { Reveal } from "../animations/Reveal";
import { DeferredMount } from "../animations/DeferredMount";
import { site } from "../../data/site";

const ContactForm = lazy(() => import("./ContactForm"));

const links = [
  { label: "GitHub", value: "abdullahamjad0067-code", href: site.socials.github },
  { label: "LinkedIn", value: "Abdullah Amjad", href: site.socials.linkedin },
];

function FormPlaceholder() {
  return (
    <div aria-hidden="true" className="space-y-8">
      {[0, 1, 2].map((i) => (
        <div key={i}>
          <div className="mb-3 h-3 w-16 rounded-full bg-border" />
          <div className="h-10 rounded-control border-b border-border bg-surface-2/40" />
        </div>
      ))}
    </div>
  );
}

export function ContactSection() {
  return (
    <SectionContainer id="contact" labelledBy="contact-title" space="lg">
      <SectionHeading
        index="05"
        kicker="Contact"
        id="contact-title"
        title="Let's build something worth using."
        lead="I'm open to internships, collaborations, and interesting projects. If you're building something and think we'd work well together, I'd like to hear about it."
      />

      <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <a
              href={`mailto:${site.email}`}
              className="group block border-t border-border pt-6"
            >
              <span className="mono-label text-faint">Email</span>
              <span className="mt-3 flex items-center gap-3 font-display text-xl font-medium transition-colors group-hover:text-accent sm:text-2xl">
                {site.email}
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-5 shrink-0 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </span>
            </a>
          </Reveal>

          <Reveal delay={0.08} className="mt-8">
            <ul className="divide-y divide-border border-y border-border">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex items-center justify-between gap-4 py-4"
                  >
                    <span className="flex items-center gap-3 text-sm text-muted transition-colors group-hover:text-text">
                      {link.label === "GitHub" ? (
                        <Github aria-hidden="true" className="size-4" strokeWidth={1.6} />
                      ) : (
                        <Linkedin aria-hidden="true" className="size-4" strokeWidth={1.6} />
                      )}
                      {link.value}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 text-faint transition-colors group-hover:text-accent"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.14} className="mt-8">
            <p className="mono-label text-faint">
              {site.location} · {site.session}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
          <DeferredMount placeholder={<FormPlaceholder />}>
            <Suspense fallback={<FormPlaceholder />}>
              <ContactForm />
            </Suspense>
          </DeferredMount>
        </Reveal>
      </div>
    </SectionContainer>
  );
}
