import { SectionContainer } from "../layout/SectionContainer";
import { SectionHeading } from "../layout/SectionHeading";
import { Reveal } from "../animations/Reveal";
import BounceCards from "../BounceCards";

const projectCards = [
  {
    title: "CinVault Movie Discovery",
    src: "/images/cinvault.png",
    link: "https://github.com/abdullahamjad0067-code",
    alt: "CinVault Movie discovery platform web app screenshot"
  },
  {
    title: "Mealora Recipe & Meal Platform",
    src: "/images/mealora.png",
    link: "https://github.com/abdullahamjad0067-code",
    alt: "Mealora recipe and meal planning platform screenshot"
  },
  {
    title: "SecureVault Cryptographic Storage",
    src: "/images/securevault.png",
    link: "https://github.com/abdullahamjad0067-code",
    alt: "SecureVault AES-256 encrypted file sharing web platform screenshot"
  },
  {
    title: "TubeFetch Media Downloader",
    src: "/images/tubefetch.png",
    link: "https://github.com/abdullahamjad0067-code",
    alt: "TubeFetch media downloader application screenshot"
  },
  {
    title: "Hostel Management System",
    src: "/images/hostelmanagementsystem.png",
    link: "https://github.com/abdullahamjad0067-code",
    alt: "Hostel Management System administration portal screenshot"
  }
];

export function ProjectsSection() {
  return (
    <SectionContainer id="work" labelledBy="work-title" space="lg">
      <SectionHeading
        index="02"
        kicker="Featured Work"
        id="work-title"
        title="Production Applications & Engineering Work"
        lead="Interactive web applications and shipped products. Click any screenshot card to inspect the repository on GitHub."
      />

      <div className="mt-12 flex flex-col items-center justify-center">
        <Reveal y={24} className="w-full flex justify-center py-6 overflow-hidden">
          <BounceCards
            images={projectCards}
            containerWidth={620}
            containerHeight={360}
            cardSize={300}
            aspectRatio="16 / 10"
            spread={105}
            rotation={8}
            arc={0}
            pushDistance={210}
            hoverScale={1.08}
            bounciness={0.65}
            animationDelay={0.4}
            animationStagger={0.06}
            borderWidth={3}
            borderColor="#ffffff"
            radius={18}
            shadow
            enableHover
          />
        </Reveal>

        <p className="mt-6 flex items-center gap-2 font-mono text-xs text-muted text-center">
          <span className="size-1.5 rounded-full bg-accent" />
          <span>Click any screenshot to view code on GitHub · Interactive spring physics</span>
        </p>
      </div>
    </SectionContainer>
  );
}
