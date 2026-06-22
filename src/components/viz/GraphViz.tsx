import { useState } from "react";

const NODES = [
  { id: "A", x: 80, y: 60 }, { id: "B", x: 220, y: 40 }, { id: "C", x: 360, y: 80 },
  { id: "D", x: 100, y: 200 }, { id: "E", x: 240, y: 200 }, { id: "F", x: 380, y: 220 },
  { id: "G", x: 180, y: 320 }, { id: "H", x: 340, y: 320 },
];
const EDGES: [string, string][] = [
  ["A","B"],["A","D"],["B","C"],["B","E"],["C","F"],["D","E"],["D","G"],["E","H"],["F","H"],["G","H"],
];

export function GraphViz() {
  const [visited, setVisited] = useState<string[]>([]);
  const [current, setCurrent] = useState<string | null>(null);
  const [msg, setMsg] = useState("Run BFS or DFS from A.");

  const adj: Record<string, string[]> = {};
  NODES.forEach((n) => (adj[n.id] = []));
  EDGES.forEach(([a, b]) => { adj[a].push(b); adj[b].push(a); });

  const reset = () => { setVisited([]); setCurrent(null); };

  const bfs = async () => {
    reset(); const q = ["A"]; const seen = new Set(["A"]); const order: string[] = [];
    while (q.length) {
      const n = q.shift()!; setCurrent(n); order.push(n); setVisited([...order]);
      setMsg(`Visit ${n}`); await new Promise((r) => setTimeout(r, 500));
      for (const nb of adj[n]) if (!seen.has(nb)) { seen.add(nb); q.push(nb); }
    }
    setMsg(`BFS order: ${order.join(" → ")}`); setCurrent(null);
  };
  const dfs = async () => {
    reset(); const seen = new Set<string>(); const order: string[] = [];
    async function go(n: string) {
      seen.add(n); order.push(n); setCurrent(n); setVisited([...order]);
      setMsg(`Visit ${n}`); await new Promise((r) => setTimeout(r, 500));
      for (const nb of adj[n]) if (!seen.has(nb)) await go(nb);
    }
    await go("A");
    setMsg(`DFS order: ${order.join(" → ")}`); setCurrent(null);
  };

  return (
    <div className="surface rounded-xl p-6">
      <svg viewBox="0 0 460 380" className="w-full max-w-2xl mx-auto">
        {EDGES.map(([a, b], i) => {
          const A = NODES.find((n) => n.id === a)!; const B = NODES.find((n) => n.id === b)!;
          return <line key={i} x1={A.x} y1={A.y} x2={B.x} y2={B.y} className="stroke-border" strokeWidth={1.5} />;
        })}
        {NODES.map((n) => {
          const isCur = current === n.id;
          const isVis = visited.includes(n.id);
          return (
            <g key={n.id}>
              <circle cx={n.x} cy={n.y} r={22}
                      className={isCur ? "fill-violet" : isVis ? "fill-cyan" : "fill-card stroke-border"} strokeWidth={1.5} />
              <text x={n.x} y={n.y + 5} textAnchor="middle"
                    className={`font-mono font-bold text-sm ${isCur || isVis ? "fill-background" : "fill-foreground"}`}>{n.id}</text>
            </g>
          );
        })}
      </svg>
      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={bfs} className="rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm font-semibold">BFS Traversal</button>
        <button onClick={dfs} className="rounded-md bg-violet text-background px-3 py-2 text-sm font-semibold">DFS Traversal</button>
        <button onClick={() => { reset(); setMsg("Ready."); }} className="rounded-md border border-border px-3 py-2 text-sm font-semibold">Reset</button>
      </div>
      <div className="mt-3 text-sm font-mono text-cyan">{msg}</div>
    </div>
  );
}
