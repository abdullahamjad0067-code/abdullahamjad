import { cn } from "../../lib/utils";

type Props = {
  variant: string;
  className?: string;
};

/**
 * Rich, custom mockups that look like real software products and dashboards.
 */
export function ProjectVisual({ variant, className }: Props) {
  return (
    <div
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border bg-ink-950 p-3 sm:p-4 shadow-xl transition-all duration-300 group-hover:border-accent/40 group-hover:shadow-[0_12px_36px_rgba(0,0,0,0.8)]",
        className,
      )}
      aria-hidden="true"
    >
      {/* Top browser/window chrome */}
      <div className="flex items-center justify-between border-b border-border/80 pb-2.5 mb-3">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-red-500/80" />
          <span className="size-2.5 rounded-full bg-yellow-500/80" />
          <span className="size-2.5 rounded-full bg-green-500/80" />
        </div>
        <div className="rounded-md border border-border/60 bg-surface-2/60 px-3 py-0.5 font-mono text-[10px] text-faint">
          {variant}.app · production
        </div>
        <div className="size-2 rounded-full bg-accent animate-pulse" />
      </div>

      {/* Interface Preview Body */}
      <div className="relative h-[calc(100%-2rem)] w-full overflow-hidden rounded-lg border border-border/60 bg-surface/80 p-3 sm:p-4">
        {uiPreviews[variant] ?? uiPreviews.autobill}
      </div>
    </div>
  );
}

const uiPreviews: Record<string, React.ReactNode> = {
  autobill: (
    <div className="flex h-full flex-col justify-between text-xs">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div>
          <span className="font-mono text-[10px] text-faint uppercase">Invoice #AB-2025-089</span>
          <h4 className="font-display font-semibold text-text">AutoBill Mobile & Web POS</h4>
        </div>
        <span className="rounded-full bg-accent/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-accent">
          Paid · WhatsApp Sent
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 my-auto">
        <div className="rounded-lg border border-border bg-surface-2 p-2">
          <span className="text-[10px] text-faint">Total Invoiced</span>
          <p className="font-mono text-sm font-bold text-text mt-0.5">$14,850</p>
        </div>
        <div className="rounded-lg border border-border bg-surface-2 p-2">
          <span className="text-[10px] text-faint">PDF Generated</span>
          <p className="font-mono text-sm font-bold text-accent mt-0.5">142 Files</p>
        </div>
        <div className="rounded-lg border border-border bg-surface-2 p-2">
          <span className="text-[10px] text-faint">Active Customers</span>
          <p className="font-mono text-sm font-bold text-text mt-0.5">38 Clients</p>
        </div>
      </div>

      <div className="flex items-center justify-between rounded border border-border/80 bg-ink-950 px-3 py-2 font-mono text-[11px] text-muted">
        <span>React Native · Expo PDF Engine · Instant Export</span>
        <span className="text-accent">Ready</span>
      </div>
    </div>
  ),

  "sugarcane-ai": (
    <div className="flex h-full flex-col justify-between text-xs">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div>
          <span className="font-mono text-[10px] text-faint uppercase">Punjab Agricultural Research</span>
          <h4 className="font-display font-semibold text-text">Sugarcane Disease Computer Vision</h4>
        </div>
        <span className="rounded-full bg-accent/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-accent">
          Model Accuracy 94.2%
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 my-auto">
        <div className="flex flex-col justify-center rounded-lg border border-border bg-surface-2 p-3">
          <span className="text-[10px] text-faint">Leaf Scan Target: Red Rot</span>
          <div className="mt-2 flex items-center justify-between">
            <span className="font-mono text-xs text-text font-semibold">Confidence</span>
            <span className="font-mono text-xs text-accent">96.8%</span>
          </div>
          <div className="mt-1 h-1.5 w-full rounded-full bg-ink-950">
            <div className="h-full w-[96%] rounded-full bg-accent" />
          </div>
        </div>

        <div className="flex flex-col justify-center rounded-lg border border-border bg-surface-2 p-3">
          <span className="text-[10px] text-faint">Yield Risk Evaluation</span>
          <div className="mt-2 flex items-center justify-between">
            <span className="font-mono text-xs text-text font-semibold">Weather Impact</span>
            <span className="font-mono text-xs text-yellow-400">Moderate</span>
          </div>
          <div className="mt-1 h-1.5 w-full rounded-full bg-ink-950">
            <div className="h-full w-[65%] rounded-full bg-yellow-400" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between rounded border border-border/80 bg-ink-950 px-3 py-2 font-mono text-[11px] text-muted">
        <span>scikit-learn · Python · CNN Vision Pipeline</span>
        <span className="text-accent">Live Model</span>
      </div>
    </div>
  ),

  palettesnap: (
    <div className="flex h-full flex-col justify-between text-xs">
      <div className="flex items-center justify-between border-b border-border pb-2">
        <h4 className="font-display font-semibold text-text">PaletteSnap K-Means Cluster</h4>
        <span className="font-mono text-[10px] text-accent">5 Swatches Extracted</span>
      </div>

      <div className="grid grid-cols-5 gap-1.5 my-2">
        {[
          { hex: "#C6FF00", label: "Accent Lime" },
          { hex: "#0E0E0D", label: "Charcoal" },
          { hex: "#A3E635", label: "Olive" },
          { hex: "#F1F0EA", label: "Warm White" },
          { hex: "#3D3B35", label: "Neutral Fog" },
        ].map((c) => (
          <div key={c.hex} className="flex flex-col items-center rounded border border-border p-1 bg-surface-2">
            <div className="size-6 sm:size-8 rounded w-full" style={{ backgroundColor: c.hex }} />
            <span className="font-mono text-[9px] text-text mt-1">{c.hex}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between rounded border border-border bg-ink-950 px-3 py-1.5 font-mono text-[10px] text-muted">
        <span>FastAPI Backend · Pillow & Scikit-Learn</span>
        <span className="text-accent">0.14s</span>
      </div>
    </div>
  ),

  securevault: (
    <div className="flex h-full flex-col justify-between text-xs">
      <div className="flex items-center justify-between border-b border-border pb-2">
        <h4 className="font-display font-semibold text-text">SecureVault AES-256 Storage</h4>
        <span className="font-mono text-[10px] text-accent">Encrypted at Rest</span>
      </div>

      <div className="space-y-1.5 my-1 font-mono text-[11px]">
        <div className="flex items-center justify-between rounded border border-border bg-surface-2 px-2.5 py-1.5">
          <span className="text-text">database_backup.sql.enc</span>
          <span className="text-accent">AES-256 · Valid</span>
        </div>
        <div className="flex items-center justify-between rounded border border-border bg-surface-2 px-2.5 py-1.5">
          <span className="text-text">expiring_share_link_72h</span>
          <span className="text-faint">SHA-256 Checksum OK</span>
        </div>
      </div>

      <div className="flex items-center justify-between rounded border border-border bg-ink-950 px-3 py-1.5 font-mono text-[10px] text-muted">
        <span>PHP · MySQL · Expiring Auth Tokens</span>
        <span className="text-accent">Encrypted</span>
      </div>
    </div>
  ),

  ascend: (
    <div className="flex h-full flex-col justify-between text-xs">
      <div className="flex items-center justify-between border-b border-border pb-2">
        <h4 className="font-display font-semibold text-text">Ascend JWT Authentication Flow</h4>
        <span className="font-mono text-[10px] text-accent">CSRF Protected</span>
      </div>

      <div className="grid grid-cols-3 gap-2 my-2 font-mono text-[10px]">
        <div className="rounded border border-border bg-surface-2 p-2 text-center">
          <span className="text-faint block">Access Token</span>
          <span className="text-accent font-bold">15m Expiry</span>
        </div>
        <div className="rounded border border-border bg-surface-2 p-2 text-center">
          <span className="text-faint block">Refresh Token</span>
          <span className="text-text font-bold">7d HTTP-Only</span>
        </div>
        <div className="rounded border border-border bg-surface-2 p-2 text-center">
          <span className="text-faint block">Rate Limiting</span>
          <span className="text-text font-bold">60 req/min</span>
        </div>
      </div>

      <div className="flex items-center justify-between rounded border border-border bg-ink-950 px-3 py-1.5 font-mono text-[10px] text-muted">
        <span>FastAPI · React · Leaderboard Engine</span>
        <span className="text-accent">Active</span>
      </div>
    </div>
  ),

  cinvault: (
    <div className="flex h-full flex-col justify-between text-xs">
      <div className="flex items-center justify-between border-b border-border pb-2">
        <h4 className="font-display font-semibold text-text">CinVault Movie Explorer</h4>
        <span className="font-mono text-[10px] text-accent">TMDB Live Sync</span>
      </div>

      <div className="grid grid-cols-4 gap-2 my-2">
        {["Dune: Part Two", "Oppenheimer", "Interstellar", "Inception"].map((film, i) => (
          <div key={film} className="rounded border border-border bg-surface-2 p-2 text-center">
            <div className="h-6 rounded bg-surface border border-border/80 flex items-center justify-center font-mono text-[9px] text-accent">
              ★ {8.6 + i * 0.2}
            </div>
            <span className="font-mono text-[9px] text-text block truncate mt-1">{film}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between rounded border border-border bg-ink-950 px-3 py-1.5 font-mono text-[10px] text-muted">
        <span>Next.js · React · Dynamic Search & Filters</span>
        <span className="text-accent">Connected</span>
      </div>
    </div>
  ),
};
