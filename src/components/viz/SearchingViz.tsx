import { useState } from "react";

export function SearchingViz() {
  const [arr] = useState<number[]>([3, 7, 11, 18, 23, 29, 34, 41, 50, 58, 64, 72]);
  const [target, setTarget] = useState("29");
  const [highlight, setHighlight] = useState<number[]>([]);
  const [found, setFound] = useState<number | null>(null);
  const [msg, setMsg] = useState("Choose linear or binary search.");

  const reset = () => { setHighlight([]); setFound(null); };

  const linear = async () => {
    reset(); const v = parseInt(target);
    for (let i = 0; i < arr.length; i++) {
      setHighlight([i]); setMsg(`Check index ${i}: ${arr[i]}`);
      await new Promise((r) => setTimeout(r, 400));
      if (arr[i] === v) { setFound(i); setMsg(`Found ${v} at index ${i}`); return; }
    }
    setMsg(`${v} not found`);
  };
  const binary = async () => {
    reset(); const v = parseInt(target); let lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      setHighlight([lo, mid, hi]); setMsg(`lo=${lo}, mid=${mid}, hi=${hi}; check ${arr[mid]}`);
      await new Promise((r) => setTimeout(r, 700));
      if (arr[mid] === v) { setFound(mid); setMsg(`Found ${v} at index ${mid}`); return; }
      if (arr[mid] < v) lo = mid + 1; else hi = mid - 1;
    }
    setMsg(`${v} not found`);
  };

  return (
    <div className="surface rounded-xl p-6">
      <div className="flex flex-wrap gap-2 justify-center min-h-[100px] items-center">
        {arr.map((v, i) => (
          <div key={i} className={`relative grid place-items-center h-14 w-14 rounded-lg border-2 font-mono font-bold transition-all ${
            found === i ? "border-emerald bg-emerald/30 glow" :
            highlight.includes(i) ? "border-cyan bg-cyan/20" : "border-border bg-card"
          }`}>
            {v}
            <span className="absolute -bottom-5 text-[10px] text-muted-foreground font-mono">[{i}]</span>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-2">
        <input value={target} onChange={(e) => setTarget(e.target.value)} placeholder="target"
               className="w-24 rounded-md border border-border bg-background px-3 py-2 text-sm font-mono" />
        <button onClick={linear} className="rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm font-semibold">Linear Search</button>
        <button onClick={binary} className="rounded-md bg-violet text-background px-3 py-2 text-sm font-semibold">Binary Search</button>
        <button onClick={() => { reset(); setMsg("Ready."); }} className="rounded-md border border-border px-3 py-2 text-sm font-semibold">Reset</button>
      </div>
      <div className="mt-3 text-sm font-mono text-cyan">{msg}</div>
    </div>
  );
}
