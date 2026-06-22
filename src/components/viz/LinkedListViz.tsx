import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type Variant = "singly" | "doubly" | "circular";

export function LinkedListViz({ variant = "singly" }: { variant?: Variant }) {
  const [list, setList] = useState<number[]>([10, 20, 30, 40]);
  const [val, setVal] = useState("");
  const [pos, setPos] = useState("");
  const [highlight, setHighlight] = useState<number | null>(null);
  const [msg, setMsg] = useState("Insert, delete, search, or reverse.");

  const insertBegin = () => {
    const v = parseInt(val); if (isNaN(v)) return;
    setList([v, ...list]); setMsg(`Inserted ${v} at head`); setHighlight(0);
    setTimeout(() => setHighlight(null), 800);
  };
  const insertEnd = () => {
    const v = parseInt(val); if (isNaN(v)) return;
    setList([...list, v]); setHighlight(list.length); setMsg(`Inserted ${v} at tail`);
    setTimeout(() => setHighlight(null), 800);
  };
  const insertAt = () => {
    const v = parseInt(val); const p = parseInt(pos);
    if (isNaN(v) || isNaN(p)) return;
    const i = Math.max(0, Math.min(list.length, p));
    setList([...list.slice(0, i), v, ...list.slice(i)]);
    setHighlight(i); setMsg(`Inserted ${v} at position ${i}`);
    setTimeout(() => setHighlight(null), 800);
  };
  const del = () => {
    const p = parseInt(pos);
    if (isNaN(p) || p < 0 || p >= list.length) return;
    setHighlight(p); setMsg(`Deleting node at ${p}`);
    setTimeout(() => { setList(list.filter((_, i) => i !== p)); setHighlight(null); }, 500);
  };
  const search = async () => {
    const v = parseInt(val); if (isNaN(v)) return;
    for (let i = 0; i < list.length; i++) {
      setHighlight(i); setMsg(`Visiting node ${i}: ${list[i]}`);
      await new Promise((r) => setTimeout(r, 400));
      if (list[i] === v) { setMsg(`Found ${v} at node ${i}`); return; }
    }
    setMsg(`${v} not found`); setHighlight(null);
  };
  const reverse = () => { setList([...list].reverse()); setMsg("List reversed"); };

  const arrow = variant === "doubly" ? "↔" : "→";

  return (
    <div className="surface rounded-xl p-6">
      <div className="min-h-[140px] overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max py-4">
          <span className="text-xs font-mono text-violet">HEAD →</span>
          <AnimatePresence mode="popLayout">
            {list.map((v, i) => (
              <motion.div key={`${i}-${v}`} layout
                          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.5 }}
                          className="flex items-center gap-2">
                <div className={`grid place-items-center h-14 w-20 rounded-lg border-2 font-mono font-bold ${
                  highlight === i ? "border-cyan bg-cyan/20 glow" : "border-border bg-card"
                }`}>{v}</div>
                {i < list.length - 1 && <span className="text-cyan text-xl font-mono">{arrow}</span>}
              </motion.div>
            ))}
          </AnimatePresence>
          {variant === "circular" && list.length > 0 && (
            <span className="text-xs font-mono text-amber">⟲ back to HEAD</span>
          )}
          {variant !== "circular" && <span className="text-xs font-mono text-muted-foreground">NULL</span>}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <input value={val} onChange={(e) => setVal(e.target.value)} placeholder="value"
               className="w-24 rounded-md border border-border bg-background px-3 py-2 text-sm font-mono" />
        <input value={pos} onChange={(e) => setPos(e.target.value)} placeholder="pos"
               className="w-24 rounded-md border border-border bg-background px-3 py-2 text-sm font-mono" />
        <button onClick={insertBegin} className="rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm font-semibold">Insert Head</button>
        <button onClick={insertEnd} className="rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm font-semibold">Insert Tail</button>
        <button onClick={insertAt} className="rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm font-semibold">Insert @ Pos</button>
        <button onClick={del} className="rounded-md bg-destructive text-destructive-foreground px-3 py-2 text-sm font-semibold">Delete</button>
        <button onClick={search} className="rounded-md bg-violet text-background px-3 py-2 text-sm font-semibold">Search</button>
        <button onClick={reverse} className="rounded-md bg-amber text-background px-3 py-2 text-sm font-semibold">Reverse</button>
      </div>
      <div className="mt-3 text-sm font-mono text-cyan">{msg}</div>
    </div>
  );
}
