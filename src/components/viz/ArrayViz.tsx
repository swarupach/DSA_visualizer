import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function ArrayViz() {
  const [arr, setArr] = useState<number[]>([12, 7, 23, 4, 19, 31, 8]);
  const [input, setInput] = useState("");
  const [pos, setPos] = useState("");
  const [highlight, setHighlight] = useState<number | null>(null);
  const [msg, setMsg] = useState("Ready. Try insert, delete, search, or update.");

  const insert = () => {
    const v = parseInt(input); if (isNaN(v)) return;
    const p = pos === "" ? arr.length : Math.max(0, Math.min(arr.length, parseInt(pos)));
    const next = [...arr.slice(0, p), v, ...arr.slice(p)];
    setArr(next); setHighlight(p); setMsg(`Inserted ${v} at index ${p}`);
    setTimeout(() => setHighlight(null), 900);
  };
  const del = () => {
    const p = pos === "" ? arr.length - 1 : parseInt(pos);
    if (p < 0 || p >= arr.length) return;
    setHighlight(p); setMsg(`Deleted index ${p} (value ${arr[p]})`);
    setTimeout(() => { setArr(arr.filter((_, i) => i !== p)); setHighlight(null); }, 500);
  };
  const search = async () => {
    const v = parseInt(input); if (isNaN(v)) return;
    for (let i = 0; i < arr.length; i++) {
      setHighlight(i); setMsg(`Checking index ${i}: ${arr[i]}`);
      await new Promise((r) => setTimeout(r, 350));
      if (arr[i] === v) { setMsg(`Found ${v} at index ${i}`); return; }
    }
    setMsg(`${v} not found`); setHighlight(null);
  };
  const update = () => {
    const v = parseInt(input); const p = parseInt(pos);
    if (isNaN(v) || isNaN(p) || p < 0 || p >= arr.length) return;
    const next = [...arr]; next[p] = v; setArr(next);
    setHighlight(p); setMsg(`Updated index ${p} to ${v}`);
    setTimeout(() => setHighlight(null), 900);
  };

  return (
    <div className="surface rounded-xl p-6">
      <div className="min-h-[160px] flex items-center justify-center">
        <div className="flex gap-2 flex-wrap justify-center">
          <AnimatePresence mode="popLayout">
            {arr.map((v, i) => (
              <motion.div
                key={`${i}-${v}`}
                layout
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className={`relative grid place-items-center h-16 w-16 rounded-lg font-mono font-bold text-lg border-2 transition-colors ${
                  highlight === i ? "border-cyan bg-cyan/20 glow" : "border-border bg-card"
                }`}
              >
                {v}
                <span className="absolute -bottom-5 text-[10px] text-muted-foreground font-mono">[{i}]</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="value"
               className="w-24 rounded-md border border-border bg-background px-3 py-2 text-sm font-mono" />
        <input value={pos} onChange={(e) => setPos(e.target.value)} placeholder="index"
               className="w-24 rounded-md border border-border bg-background px-3 py-2 text-sm font-mono" />
        <button onClick={insert} className="rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm font-semibold">Insert</button>
        <button onClick={del} className="rounded-md bg-destructive text-destructive-foreground px-3 py-2 text-sm font-semibold">Delete</button>
        <button onClick={search} className="rounded-md bg-violet text-background px-3 py-2 text-sm font-semibold">Search</button>
        <button onClick={update} className="rounded-md bg-amber text-background px-3 py-2 text-sm font-semibold">Update</button>
      </div>
      <div className="mt-3 text-sm font-mono text-cyan">{msg}</div>
    </div>
  );
}
