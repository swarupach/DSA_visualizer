import { useEffect, useRef, useState } from "react";

type Algo = "bubble" | "selection" | "insertion" | "merge" | "quick" | "heap";

function* bubble(a: number[]): Generator<{ a: number[]; i: number; j: number; done?: number[] }> {
  const arr = [...a]; const n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      yield { a: [...arr], i, j };
      if (arr[j] > arr[j + 1]) { [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; yield { a: [...arr], i, j }; }
    }
  }
  yield { a: arr, i: -1, j: -1, done: arr.map((_, k) => k) };
}
function* selection(a: number[]): Generator<{ a: number[]; i: number; j: number }> {
  const arr = [...a]; const n = arr.length;
  for (let i = 0; i < n; i++) {
    let m = i;
    for (let j = i + 1; j < n; j++) {
      yield { a: [...arr], i: m, j };
      if (arr[j] < arr[m]) m = j;
    }
    [arr[i], arr[m]] = [arr[m], arr[i]];
    yield { a: [...arr], i, j: m };
  }
}
function* insertion(a: number[]): Generator<{ a: number[]; i: number; j: number }> {
  const arr = [...a];
  for (let i = 1; i < arr.length; i++) {
    let j = i;
    while (j > 0 && arr[j - 1] > arr[j]) {
      yield { a: [...arr], i, j };
      [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]]; j--;
    }
    yield { a: [...arr], i, j };
  }
}
function* quick(a: number[], lo = 0, hi = a.length - 1): Generator<{ a: number[]; i: number; j: number }> {
  if (lo < hi) {
    const pivot = a[hi]; let i = lo - 1;
    for (let j = lo; j < hi; j++) {
      yield { a: [...a], i: hi, j };
      if (a[j] < pivot) { i++; [a[i], a[j]] = [a[j], a[i]]; yield { a: [...a], i, j }; }
    }
    [a[i + 1], a[hi]] = [a[hi], a[i + 1]]; yield { a: [...a], i: i + 1, j: hi };
    yield* quick(a, lo, i);
    yield* quick(a, i + 2, hi);
  }
}
function* merge(a: number[]): Generator<{ a: number[]; i: number; j: number }> {
  function* ms(l: number, r: number): Generator<{ a: number[]; i: number; j: number }> {
    if (l >= r) return;
    const m = (l + r) >> 1;
    yield* ms(l, m); yield* ms(m + 1, r);
    const tmp: number[] = []; let i = l, j = m + 1;
    while (i <= m && j <= r) {
      yield { a: [...a], i, j };
      if (a[i] <= a[j]) tmp.push(a[i++]); else tmp.push(a[j++]);
    }
    while (i <= m) tmp.push(a[i++]);
    while (j <= r) tmp.push(a[j++]);
    for (let k = 0; k < tmp.length; k++) { a[l + k] = tmp[k]; yield { a: [...a], i: l + k, j: l + k }; }
  }
  yield* ms(0, a.length - 1);
}
function* heapsort(a: number[]): Generator<{ a: number[]; i: number; j: number }> {
  const n = a.length;
  function* sift(i: number, end: number): Generator<{ a: number[]; i: number; j: number }> {
    let max = i, l = 2 * i + 1, r = 2 * i + 2;
    if (l < end && a[l] > a[max]) max = l;
    if (r < end && a[r] > a[max]) max = r;
    if (max !== i) { [a[i], a[max]] = [a[max], a[i]]; yield { a: [...a], i, j: max }; yield* sift(max, end); }
  }
  for (let i = (n >> 1) - 1; i >= 0; i--) yield* sift(i, n);
  for (let end = n - 1; end > 0; end--) {
    [a[0], a[end]] = [a[end], a[0]]; yield { a: [...a], i: 0, j: end };
    yield* sift(0, end);
  }
}

const ALGOS: Record<Algo, (a: number[]) => Generator<{ a: number[]; i: number; j: number }>> = {
  bubble, selection, insertion, merge, quick, heap: heapsort,
};

export function SortingViz() {
  const [algo, setAlgo] = useState<Algo>("bubble");
  const [arr, setArr] = useState<number[]>(() => Array.from({ length: 18 }, () => Math.floor(Math.random() * 90) + 10));
  const [snap, setSnap] = useState<{ a: number[]; i: number; j: number }>({ a: arr, i: -1, j: -1 });
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1.5);
  const genRef = useRef<Generator<{ a: number[]; i: number; j: number }> | null>(null);

  const start = () => {
    genRef.current = ALGOS[algo]([...arr]);
    setPlaying(true);
  };

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => {
      const next = genRef.current?.next();
      if (!next || next.done) { setPlaying(false); return; }
      setSnap(next.value);
    }, 200 / speed);
    return () => clearTimeout(t);
  }, [playing, snap, speed]);

  const reset = () => {
    setPlaying(false); genRef.current = null;
    const a = Array.from({ length: 18 }, () => Math.floor(Math.random() * 90) + 10);
    setArr(a); setSnap({ a, i: -1, j: -1 });
  };

  const max = Math.max(...snap.a);
  return (
    <div className="surface rounded-xl p-6">
      <div className="flex flex-wrap gap-2 mb-4">
        {(Object.keys(ALGOS) as Algo[]).map((k) => (
          <button key={k} onClick={() => { setAlgo(k); setSnap({ a: arr, i: -1, j: -1 }); setPlaying(false); }}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono uppercase ${algo === k ? "bg-primary text-primary-foreground" : "border border-border"}`}>
            {k}
          </button>
        ))}
      </div>

      <div className="flex items-end gap-1 h-64 bg-background/40 rounded-lg p-3 border border-border">
        {snap.a.map((v, k) => (
          <div key={k}
               className={`flex-1 rounded-t transition-all duration-150 ${
                 k === snap.i ? "bg-violet" : k === snap.j ? "bg-cyan" : "bg-muted-foreground/40"
               }`}
               style={{ height: `${(v / max) * 100}%` }} />
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button onClick={playing ? () => setPlaying(false) : (genRef.current ? () => setPlaying(true) : start)}
                className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold">
          {playing ? "Pause" : genRef.current ? "Resume" : "Start"}
        </button>
        <button onClick={reset} className="rounded-md border border-border px-4 py-2 text-sm font-semibold">Shuffle & Reset</button>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-mono">SPEED</span>
          <input type="range" min={0.25} max={4} step={0.25} value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))}
                 className="w-28 accent-[var(--cyan)]" />
          <span className="text-xs font-mono w-10">{speed}x</span>
        </div>
      </div>
    </div>
  );
}
