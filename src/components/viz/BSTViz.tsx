import { useState, useMemo } from "react";
import { motion } from "motion/react";

type Node = { v: number; l: Node | null; r: Node | null };

function insert(n: Node | null, v: number): Node {
  if (!n) return { v, l: null, r: null };
  if (v < n.v) n.l = insert(n.l, v);
  else if (v > n.v) n.r = insert(n.r, v);
  return n;
}
function remove(n: Node | null, v: number): Node | null {
  if (!n) return null;
  if (v < n.v) { n.l = remove(n.l, v); return n; }
  if (v > n.v) { n.r = remove(n.r, v); return n; }
  if (!n.l) return n.r;
  if (!n.r) return n.l;
  let s = n.r; while (s.l) s = s.l;
  n.v = s.v; n.r = remove(n.r, s.v); return n;
}

interface Positioned { v: number; x: number; y: number; depth: number; parent?: Positioned }

function layout(root: Node | null): { nodes: Positioned[]; edges: [Positioned, Positioned][] } {
  if (!root) return { nodes: [], edges: [] };
  const nodes: Positioned[] = []; const edges: [Positioned, Positioned][] = [];
  let i = 0;
  function dfs(n: Node, depth: number, parent?: Positioned) {
    if (n.l) dfs(n.l, depth + 1);
    const p: Positioned = { v: n.v, x: i++ * 60 + 30, y: depth * 70 + 30, depth, parent };
    nodes.push(p);
    if (parent) edges.push([parent, p]);
    if (n.r) dfs(n.r, depth + 1, p);
    // re-link last left child's parent: simpler: skip for simplicity; will fix below
  }
  // simpler inorder x; do BFS for parent edges
  function fillEdges(n: Node, pPos?: Positioned) {
    const my = nodes.find((nn) => nn.v === n.v)!;
    if (pPos) edges.push([pPos, my]);
    if (n.l) fillEdges(n.l, my);
    if (n.r) fillEdges(n.r, my);
  }
  function inorder(n: Node, depth: number) {
    if (n.l) inorder(n.l, depth + 1);
    nodes.push({ v: n.v, x: i++ * 60 + 30, y: depth * 70 + 30, depth });
    if (n.r) inorder(n.r, depth + 1);
  }
  // reset and use inorder positioning
  nodes.length = 0; edges.length = 0; i = 0;
  inorder(root, 0);
  fillEdges(root);
  return { nodes, edges };
}

export function BSTViz() {
  const [root, setRoot] = useState<Node | null>(() => {
    let r: Node | null = null;
    [50, 30, 70, 20, 40, 60, 80, 10].forEach((v) => { r = insert(r, v); });
    return r;
  });
  const [val, setVal] = useState("");
  const [highlight, setHighlight] = useState<number | null>(null);
  const [msg, setMsg] = useState("Insert, delete, search, or traverse.");

  const { nodes, edges } = useMemo(() => layout(root), [root]);
  const width = Math.max(360, nodes.length * 60 + 30);
  const height = Math.max(200, Math.max(0, ...nodes.map((n) => n.y)) + 60);

  const ins = () => {
    const v = parseInt(val); if (isNaN(v)) return;
    setRoot(insert(root ? { ...root } : null, v)); setMsg(`Inserted ${v}`); setHighlight(v);
    setTimeout(() => setHighlight(null), 800);
  };
  const del = () => {
    const v = parseInt(val); if (isNaN(v)) return;
    setRoot(remove(root, v)); setMsg(`Deleted ${v}`);
  };
  const search = async () => {
    const v = parseInt(val); if (isNaN(v)) return;
    let cur = root;
    while (cur) {
      setHighlight(cur.v); setMsg(`Visit ${cur.v}`);
      await new Promise((r) => setTimeout(r, 500));
      if (v === cur.v) { setMsg(`Found ${v}`); return; }
      cur = v < cur.v ? cur.l : cur.r;
    }
    setMsg(`${v} not found`); setHighlight(null);
  };
  const traverse = async (order: "in" | "pre" | "post" | "level") => {
    const seq: number[] = [];
    if (order === "level") {
      const q: Node[] = root ? [root] : [];
      while (q.length) { const n = q.shift()!; seq.push(n.v); if (n.l) q.push(n.l); if (n.r) q.push(n.r); }
    } else {
      function go(n: Node | null) {
        if (!n) return;
        if (order === "pre") seq.push(n.v);
        go(n.l);
        if (order === "in") seq.push(n.v);
        go(n.r);
        if (order === "post") seq.push(n.v);
      }
      go(root);
    }
    for (const v of seq) {
      setHighlight(v); setMsg(`${order.toUpperCase()}-order: visit ${v}`);
      await new Promise((r) => setTimeout(r, 450));
    }
    setMsg(`${order}-order traversal: ${seq.join(" → ")}`);
    setHighlight(null);
  };

  return (
    <div className="surface rounded-xl p-6">
      <div className="overflow-x-auto">
        <svg width={width} height={height} className="mx-auto">
          {edges.map(([a, b], i) => (
            <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} className="stroke-border" strokeWidth={1.5} />
          ))}
          {nodes.map((n) => (
            <motion.g key={n.v} initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <circle cx={n.x} cy={n.y} r={18}
                      className={highlight === n.v ? "fill-cyan" : "fill-card stroke-cyan"}
                      strokeWidth={2} />
              <text x={n.x} y={n.y + 4} textAnchor="middle"
                    className={`text-[12px] font-bold font-mono ${highlight === n.v ? "fill-background" : "fill-foreground"}`}>{n.v}</text>
            </motion.g>
          ))}
        </svg>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <input value={val} onChange={(e) => setVal(e.target.value)} placeholder="value"
               className="w-24 rounded-md border border-border bg-background px-3 py-2 text-sm font-mono" />
        <button onClick={ins} className="rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm font-semibold">Insert</button>
        <button onClick={del} className="rounded-md bg-destructive text-destructive-foreground px-3 py-2 text-sm font-semibold">Delete</button>
        <button onClick={search} className="rounded-md bg-violet text-background px-3 py-2 text-sm font-semibold">Search</button>
        <button onClick={() => traverse("in")} className="rounded-md border border-border px-3 py-2 text-sm font-semibold">Inorder</button>
        <button onClick={() => traverse("pre")} className="rounded-md border border-border px-3 py-2 text-sm font-semibold">Preorder</button>
        <button onClick={() => traverse("post")} className="rounded-md border border-border px-3 py-2 text-sm font-semibold">Postorder</button>
        <button onClick={() => traverse("level")} className="rounded-md border border-border px-3 py-2 text-sm font-semibold">Level</button>
      </div>
      <div className="mt-3 text-sm font-mono text-cyan">{msg}</div>
    </div>
  );
}
