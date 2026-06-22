import { Play, Pause, RotateCcw, SkipForward, SkipBack, Square } from "lucide-react";

export interface ControlsProps {
  playing: boolean;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  speed: number;
  onSpeed: (n: number) => void;
  step?: number;
  totalSteps?: number;
  description?: string;
}

export function VisualizerControls(p: ControlsProps) {
  return (
    <div className="surface rounded-xl p-4 flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        {p.onPrev && (
          <button onClick={p.onPrev} className="grid h-9 w-9 place-items-center rounded-md border border-border hover:bg-secondary" aria-label="Previous">
            <SkipBack className="h-4 w-4" />
          </button>
        )}
        {p.playing ? (
          <button onClick={p.onPause} className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground" aria-label="Pause">
            <Pause className="h-4 w-4" />
          </button>
        ) : (
          <button onClick={p.onPlay} className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground" aria-label="Play">
            <Play className="h-4 w-4" />
          </button>
        )}
        {p.onNext && (
          <button onClick={p.onNext} className="grid h-9 w-9 place-items-center rounded-md border border-border hover:bg-secondary" aria-label="Next">
            <SkipForward className="h-4 w-4" />
          </button>
        )}
        <button onClick={p.onReset} className="grid h-9 w-9 place-items-center rounded-md border border-border hover:bg-secondary" aria-label="Reset">
          <RotateCcw className="h-4 w-4" />
        </button>

        <div className="ml-auto flex items-center gap-3">
          <label className="text-xs text-muted-foreground font-mono">SPEED</label>
          <input
            type="range" min={0.25} max={3} step={0.25}
            value={p.speed} onChange={(e) => p.onSpeed(parseFloat(e.target.value))}
            className="w-28 accent-[var(--cyan)]"
          />
          <span className="text-xs font-mono w-10">{p.speed}x</span>
        </div>
      </div>

      {p.totalSteps !== undefined && (
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan to-violet transition-all"
                 style={{ width: `${((p.step ?? 0) / Math.max(1, p.totalSteps - 1)) * 100}%` }} />
          </div>
          <span className="text-xs font-mono text-muted-foreground">
            {(p.step ?? 0) + 1}/{p.totalSteps}
          </span>
        </div>
      )}

      {p.description && (
        <div className="text-sm bg-secondary/60 rounded-md px-3 py-2 font-mono">
          <Square className="inline h-3 w-3 mr-2 text-cyan" />
          {p.description}
        </div>
      )}
    </div>
  );
}

export function ComplexityCard({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <div className="surface rounded-xl p-4">
      <h4 className="font-display font-semibold mb-2 text-sm uppercase tracking-wider text-muted-foreground">Complexity</h4>
      <ul className="space-y-1.5">
        {rows.map((r) => (
          <li key={r.label} className="flex justify-between text-sm font-mono">
            <span className="text-muted-foreground">{r.label}</span>
            <span className="text-cyan">{r.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function InfoCard({ title, items, tone = "emerald" }: { title: string; items: string[]; tone?: "emerald" | "rose" | "amber" }) {
  const color = tone === "emerald" ? "text-emerald" : tone === "rose" ? "text-rose" : "text-amber";
  return (
    <div className="surface rounded-xl p-4">
      <h4 className={`font-display font-semibold mb-2 text-sm uppercase tracking-wider ${color}`}>{title}</h4>
      <ul className="space-y-1.5 text-sm text-muted-foreground list-disc pl-4">
        {items.map((i) => <li key={i}>{i}</li>)}
      </ul>
    </div>
  );
}

export function CodeBlock({ code, lang = "js" }: { code: string; lang?: string }) {
  return (
    <pre className="surface rounded-xl p-4 overflow-auto text-xs font-mono leading-relaxed">
      <div className="text-muted-foreground mb-1 text-[10px] uppercase tracking-wider">{lang}</div>
      <code>{code}</code>
    </pre>
  );
}

export function PageHeader({ kicker, title, subtitle }: { kicker?: string; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-8">
      {kicker && <div className="text-xs font-mono uppercase tracking-[0.2em] text-cyan mb-3">{kicker}</div>}
      <h1 className="text-4xl md:text-5xl font-display font-bold">{title}</h1>
      {subtitle && <p className="mt-3 text-muted-foreground max-w-2xl">{subtitle}</p>}
    </div>
  );
}

export function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</section>;
}
