import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "../components/Visualizer";

export const Route = createFileRoute("/comparison")({
  head: () => ({
    meta: [
      { title: "Linear vs Non-Linear — DSA Visualizer" },
      { name: "description", content: "Side-by-side comparison of linear and non-linear data structures with visual diagrams." },
    ],
  }),
  component: Page,
});

const rows = [
  ["Structure", "Sequential", "Hierarchical / network"],
  ["Data Organization", "Elements in order", "Parent/child or vertex/edge"],
  ["Memory Usage", "Often contiguous", "Pointer-heavy"],
  ["Traversal Method", "Single pass", "Multiple paths (in/pre/post/level, BFS, DFS)"],
  ["Complexity", "Simpler logic", "More complex"],
  ["Performance", "Fast linear ops, slow search", "Logarithmic search, complex inserts"],
  ["Applications", "Lists, queues, stacks", "File systems, social networks, indexes"],
  ["Advantages", "Easy to implement and reason", "Models real-world hierarchies/networks"],
  ["Disadvantages", "Limited to sequential access", "Higher overhead, harder to balance"],
];

function Page() {
  return (
    <div>
      <PageHeader kicker="Compare" title="Linear vs Non-Linear"
        subtitle="Two families of data structures, two ways of organizing information. Use the table to pick the right tool for the job." />

      <Section className="grid lg:grid-cols-2 gap-4 mb-8">
        <DiagramCard title="Linear" color="text-cyan">
          <div className="flex gap-2 justify-center py-8">
            {[1, 2, 3, 4, 5].map((n, i) => (
              <div key={n} className="flex items-center gap-2">
                <div className="h-12 w-12 grid place-items-center rounded-lg bg-cyan/20 border-2 border-cyan font-mono font-bold">{n}</div>
                {i < 4 && <span className="text-cyan">→</span>}
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground text-center">Arrays · Lists · Stacks · Queues</p>
        </DiagramCard>

        <DiagramCard title="Non-Linear" color="text-violet">
          <svg viewBox="0 0 300 160" className="w-full h-44">
            <g stroke="currentColor" className="text-border" strokeWidth="1.5" fill="none">
              <line x1="150" y1="30" x2="80" y2="90" />
              <line x1="150" y1="30" x2="220" y2="90" />
              <line x1="80" y1="90" x2="40" y2="140" />
              <line x1="80" y1="90" x2="120" y2="140" />
              <line x1="220" y1="90" x2="180" y2="140" />
              <line x1="220" y1="90" x2="260" y2="140" />
            </g>
            {[[150, 30], [80, 90], [220, 90], [40, 140], [120, 140], [180, 140], [260, 140]].map(([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r="14" className="fill-violet" />
                <text x={x} y={y + 4} textAnchor="middle" className="fill-background text-[11px] font-bold font-mono">{i + 1}</text>
              </g>
            ))}
          </svg>
          <p className="text-sm text-muted-foreground text-center">Trees · Graphs · Heaps · Tries</p>
        </DiagramCard>
      </Section>

      <Section className="pb-16">
        <div className="surface rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-display text-xs uppercase tracking-wider text-muted-foreground">Aspect</th>
                <th className="text-left p-4 font-display text-cyan">Linear</th>
                <th className="text-left p-4 font-display text-violet">Non-Linear</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r[0]} className="border-b border-border/60">
                  <td className="p-4 font-semibold">{r[0]}</td>
                  <td className="p-4 text-muted-foreground">{r[1]}</td>
                  <td className="p-4 text-muted-foreground">{r[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

function DiagramCard({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
  return (
    <div className="surface rounded-xl p-6">
      <h3 className={`font-display font-bold text-xl ${color} mb-2`}>{title}</h3>
      {children}
    </div>
  );
}
