import { useEffect, useRef } from "react";
import gsap from "gsap";

export type BounceCardsProps = {
  className?: string;
  images?: string[];
  containerWidth?: number;
  containerHeight?: number;
  cardSize?: number;
  spread?: number;
  rotation?: number;
  arc?: number;
  pushDistance?: number;
  hoverScale?: number;
  bounciness?: number;
  animationDelay?: number;
  animationStagger?: number;
  borderWidth?: number;
  borderColor?: string;
  radius?: number;
  shadow?: boolean;
  enableHover?: boolean;
};

export default function BounceCards({
  className = "",
  images = [],
  containerWidth = 500,
  containerHeight = 320,
  cardSize = 200,
  spread = 85,
  rotation = 10,
  arc = 0,
  pushDistance = 160,
  hoverScale = 1.06,
  bounciness = 0.6,
  animationDelay = 0.5,
  animationStagger = 0.06,
  borderWidth = 5,
  borderColor = "#ffffff",
  radius = 25,
  shadow = true,
  enableHover = true,
}: BounceCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll<HTMLDivElement>(".bounce-card");
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        {
          scale: 0,
          y: 100,
          opacity: 0,
        },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 1.2,
          delay: animationDelay,
          stagger: animationStagger,
          ease: `elastic.out(1, ${bounciness})`,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [images, bounciness, animationDelay, animationStagger]);

  const count = images.length;

  return (
    <div
      ref={containerRef}
      className={`relative mx-auto flex items-center justify-center select-none ${className}`}
      style={{
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
        maxWidth: "100%",
      }}
    >
      {images.map((img, i) => {
        // Calculate spread position from center
        const offset = (i - (count - 1) / 2) * spread;
        // Arc offset along Y
        const norm = (i - (count - 1) / 2) / (count > 1 ? (count - 1) / 2 : 1);
        const yOffset = arc * (norm * norm);
        // Tilt rotation angle
        const rot = norm * rotation;

        return (
          <div
            key={img + i}
            className="bounce-card absolute overflow-hidden transition-transform duration-300 ease-out"
            style={{
              width: `${cardSize}px`,
              height: `${cardSize}px`,
              borderRadius: `${radius}px`,
              border: `${borderWidth}px solid ${borderColor}`,
              boxShadow: shadow
                ? "0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 20px rgba(198, 255, 0, 0.15)"
                : "none",
              transform: `translate3d(${offset}px, ${yOffset}px, 0) rotate(${rot}deg)`,
              zIndex: i + 1,
            }}
            onMouseEnter={(e) => {
              if (!enableHover) return;
              gsap.to(e.currentTarget, {
                scale: hoverScale,
                y: yOffset - pushDistance * 0.15,
                zIndex: count + 10,
                duration: 0.35,
                ease: "power2.out",
              });
            }}
            onMouseLeave={(e) => {
              if (!enableHover) return;
              gsap.to(e.currentTarget, {
                scale: 1,
                y: yOffset,
                zIndex: i + 1,
                duration: 0.45,
                ease: `elastic.out(1, ${bounciness})`,
              });
            }}
          >
            <img
              src={img}
              alt={`Project Showcase ${i + 1}`}
              className="h-full w-full object-cover pointer-events-none"
              loading="lazy"
            />
          </div>
        );
      })}
    </div>
  );
}
