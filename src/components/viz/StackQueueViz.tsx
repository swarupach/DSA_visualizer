import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function StackViz() {
  const [stack, setStack] = useState<number[]>([5, 12, 8]);
  const [val, setVal] = useState("");
  const [msg, setMsg] = useState("Push, pop, peek, check empty.");
  const [pulse, setPulse] = useState<number | null>(null);

  const push = () => {
    const v = parseInt(val); if (isNaN(v)) return;
    setStack([...stack, v]); setPulse(stack.length); setMsg(`Pushed ${v}`);
    setTimeout(() => setPulse(null), 700);
  };
  const pop = () => {
    if (!stack.length) { setMsg("Stack underflow"); return; }
    const top = stack[stack.length - 1];
    setMsg(`Popped ${top}`); setPulse(stack.length - 1);
    setTimeout(() => { setStack(stack.slice(0, -1)); setPulse(null); }, 400);
  };
  const peek = () => {
    if (!stack.length) { setMsg("Empty"); return; }
    setPulse(stack.length - 1); setMsg(`Top: ${stack[stack.length - 1]}`);
    setTimeout(() => setPulse(null), 900);
  };
  const isEmpty = () => setMsg(stack.length ? "Not empty" : "isEmpty: true");

  return (
    <div className="surface rounded-xl p-6">
      <div className="min-h-[260px] flex flex-col-reverse items-center gap-1.5 justify-start">
        <div className="w-40 border-b-2 border-x-2 border-cyan rounded-b-lg h-3" />
        <AnimatePresence>
          {stack.map((v, i) => (
            <motion.div
              key={`${i}-${v}`}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40, scale: 0.8 }}
              className={`w-40 h-12 grid place-items-center rounded-md font-mono font-bold border-2 ${
                pulse === i ? "border-cyan bg-cyan/20 glow" : "border-border bg-card"
              }`}
            >
              {v} {i === stack.length - 1 && <span className="ml-2 text-[10px] text-cyan">TOP</span>}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <input value={val} onChange={(e) => setVal(e.target.value)} placeholder="value"
               className="w-24 rounded-md border border-border bg-background px-3 py-2 text-sm font-mono" />
        <button onClick={push} className="rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm font-semibold">Push</button>
        <button onClick={pop} className="rounded-md bg-destructive text-destructive-foreground px-3 py-2 text-sm font-semibold">Pop</button>
        <button onClick={peek} className="rounded-md bg-violet text-background px-3 py-2 text-sm font-semibold">Peek</button>
        <button onClick={isEmpty} className="rounded-md border border-border px-3 py-2 text-sm font-semibold">isEmpty</button>
      </div>
      <div className="mt-3 text-sm font-mono text-cyan">{msg}</div>
    </div>
  );
}

export function QueueViz({ circular = false }: { circular?: boolean }) {
  const SIZE = 7;
  const [items, setItems] = useState<(number | null)[]>([3, 7, 12, null, null, null, null]);
  const [front, setFront] = useState(0);
  const [rear, setRear] = useState(2);
  const [val, setVal] = useState("");
  const [msg, setMsg] = useState(circular ? "Circular queue: indices wrap around." : "FIFO queue: enqueue rear, dequeue front.");

  const isEmpty = () => items.every((x) => x === null);
  const isFull = () => items.every((x) => x !== null);

  const enqueue = () => {
    const v = parseInt(val); if (isNaN(v)) return;
    if (isFull()) { setMsg("Overflow"); return; }
    const newRear = isEmpty() ? 0 : (circular ? (rear + 1) % SIZE : Math.min(SIZE - 1, rear + 1));
    const next = [...items]; next[newRear] = v;
    setItems(next); setRear(newRear);
    if (isEmpty()) setFront(0);
    setMsg(`Enqueued ${v} at index ${newRear}`);
  };
  const dequeue = () => {
    if (isEmpty()) { setMsg("Underflow"); return; }
    const removed = items[front];
    const next = [...items]; next[front] = null;
    const newFront = circular ? (front + 1) % SIZE : front + 1;
    setItems(next);
    if (next.every((x) => x === null)) { setFront(0); setRear(0); }
    else setFront(newFront);
    setMsg(`Dequeued ${removed} from index ${front}`);
  };

  return (
    <div className="surface rounded-xl p-6">
      <div className={`min-h-[160px] grid place-items-center`}>
        <div className={circular ? "relative w-72 h-72" : "flex gap-2"}>
          {circular ? (
            items.map((v, i) => {
              const angle = (i / SIZE) * 2 * Math.PI - Math.PI / 2;
              const x = 110 + 100 * Math.cos(angle);
              const y = 110 + 100 * Math.sin(angle);
              return (
                <div key={i} className={`absolute h-14 w-14 grid place-items-center rounded-lg font-mono font-bold border-2 ${
                  v !== null ? "border-cyan bg-cyan/20" : "border-border bg-card text-muted-foreground"
                } ${front === i ? "ring-2 ring-violet" : ""} ${rear === i && v !== null ? "ring-2 ring-amber" : ""}`}
                  style={{ left: x, top: y }}>
                  {v ?? "·"}
                </div>
              );
            })
          ) : items.map((v, i) => (
            <div key={i} className={`relative h-14 w-14 grid place-items-center rounded-lg font-mono font-bold border-2 ${
              v !== null ? "border-cyan bg-cyan/20" : "border-border bg-card text-muted-foreground"
            }`}>
              {v ?? "·"}
              {front === i && v !== null && <span className="absolute -top-5 text-[10px] text-violet font-mono">FRONT</span>}
              {rear === i && v !== null && <span className="absolute -bottom-5 text-[10px] text-amber font-mono">REAR</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <input value={val} onChange={(e) => setVal(e.target.value)} placeholder="value"
               className="w-24 rounded-md border border-border bg-background px-3 py-2 text-sm font-mono" />
        <button onClick={enqueue} className="rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm font-semibold">Enqueue</button>
        <button onClick={dequeue} className="rounded-md bg-destructive text-destructive-foreground px-3 py-2 text-sm font-semibold">Dequeue</button>
        <div className="px-3 py-2 rounded-md border border-border text-sm font-mono">Front: <span className="text-violet">{items[front] ?? "—"}</span></div>
        <div className="px-3 py-2 rounded-md border border-border text-sm font-mono">Rear: <span className="text-amber">{items[rear] ?? "—"}</span></div>
      </div>
      <div className="mt-3 text-sm font-mono text-cyan">{msg}</div>
    </div>
  );
}
