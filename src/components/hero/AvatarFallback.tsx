import { cn } from "../../lib/utils";

type Props = {
  className?: string;
  message?: string;
};

/**
 * Deliberate, on-brand fallback shown when the 3D capture cannot load
 * (no WebGL, network failure). It is an abstract contour "portrait" built
 * from wireframe rings — never a broken image or a blank canvas.
 */
export function AvatarFallback({ className, message }: Props) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center",
        className,
      )}
      role="img"
      aria-label="Abstract wireframe illustration standing in for the 3D character model"
    >
      <svg
        viewBox="0 0 400 460"
        className="h-full w-full max-h-[70vh]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="fallback-glow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C6FF00" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#C6FF00" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#C6FF00" stopOpacity="0" />
          </linearGradient>
        </defs>

        <ellipse cx="200" cy="210" rx="150" ry="190" fill="url(#fallback-glow)" />

        {Array.from({ length: 9 }).map((_, i) => (
          <ellipse
            key={i}
            cx="200"
            cy="200"
            rx={54 + i * 15}
            ry={74 + i * 18}
            fill="none"
            stroke="#303030"
            strokeWidth="1"
          />
        ))}

        <path
          d="M200 96c34 0 58 24 58 62 0 22-6 40-6 58 0 26 22 40 22 66 0 40-34 68-74 68s-74-28-74-68c0-26 22-40 22-66 0-18-6-36-6-58 0-38 24-62 58-62z"
          fill="none"
          stroke="#737373"
          strokeWidth="1.25"
        />

        {[
          [150, 168],
          [250, 168],
          [200, 232],
          [172, 300],
          [228, 300],
          [200, 130],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="3.5" fill="#C6FF00" />
            <circle
              cx={x}
              cy={y}
              r="10"
              fill="none"
              stroke="#C6FF00"
              strokeOpacity="0.35"
            />
          </g>
        ))}

        <line
          x1="40"
          y1="358"
          x2="360"
          y2="358"
          stroke="#C6FF00"
          strokeWidth="1"
          strokeDasharray="2 6"
        />
      </svg>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
        <p className="mono-label text-faint">
          {message ?? "Static representation · 3D capture unavailable"}
        </p>
      </div>
    </div>
  );
}
