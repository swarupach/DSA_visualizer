import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Section, ComplexityCard, InfoCard, CodeBlock } from "../components/Visualizer";
import { ArrayViz } from "../components/viz/ArrayViz";
import { StackViz, QueueViz } from "../components/viz/StackQueueViz";
import { LinkedListViz } from "../components/viz/LinkedListViz";
import { BSTViz } from "../components/viz/BSTViz";
import { GraphViz } from "../components/viz/GraphViz";

export const Route = createFileRoute("/data-structures")({
  head: () => ({
    meta: [
      { title: "Data Structures — DSA Visualizer" },
      { name: "description", content: "Interactive visualizations for arrays, linked lists, stacks, queues, trees, graphs, heaps, hash tables and tries." },
    ],
  }),
  component: DataStructures,
});

type Key =
  | "array" | "linked" | "stack" | "queue" | "circular-queue" | "deque" | "priority"
  | "tree" | "binary" | "bst" | "avl" | "heap" | "trie" | "graph" | "hash";

const LINEAR: { key: Key; label: string }[] = [
  { key: "array", label: "Array" },
  { key: "linked", label: "Linked List" },
  { key: "stack", label: "Stack" },
  { key: "queue", label: "Queue" },
  { key: "circular-queue", label: "Circular Queue" },
  { key: "deque", label: "Deque" },
  { key: "priority", label: "Priority Queue" },
];
const NONLINEAR: { key: Key; label: string }[] = [
  { key: "tree", label: "Tree" },
  { key: "binary", label: "Binary Tree" },
  { key: "bst", label: "Binary Search Tree" },
  { key: "avl", label: "AVL Tree" },
  { key: "heap", label: "Heap" },
  { key: "trie", label: "Trie" },
  { key: "graph", label: "Graph" },
  { key: "hash", label: "Hash Table" },
];

function DataStructures() {
  const [active, setActive] = useState<Key>("array");
  return (
    <div>
      <PageHeader kicker="Module 01" title="Data Structures"
        subtitle="Two families: Linear and Non-Linear. Pick a structure to see definitions, complexity, real-world uses, and an interactive visualization." />

      <Section className="grid lg:grid-cols-[260px_1fr] gap-6 pb-16">
        <aside className="surface rounded-xl p-4 h-fit lg:sticky lg:top-20">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan mb-2">Linear</div>
          <ul className="space-y-1 mb-4">
            {LINEAR.map((i) => (
              <li key={i.key}>
                <button onClick={() => setActive(i.key)}
                        className={`w-full text-left px-3 py-1.5 text-sm rounded-md ${active === i.key ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/60"}`}>
                  {i.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="text-xs font-mono uppercase tracking-wider text-violet mb-2">Non-Linear</div>
          <ul className="space-y-1">
            {NONLINEAR.map((i) => (
              <li key={i.key}>
                <button onClick={() => setActive(i.key)}
                        className={`w-full text-left px-3 py-1.5 text-sm rounded-md ${active === i.key ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/60"}`}>
                  {i.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div>{renderContent(active)}</div>
      </Section>
    </div>
  );
}

function renderContent(k: Key) {
  switch (k) {
    case "array": return <ArrayPage />;
    case "linked": return <LinkedPage />;
    case "stack": return <StackPage />;
    case "queue": return <QueuePage />;
    case "circular-queue": return <CircularQueuePage />;
    case "deque": return <DequePage />;
    case "priority": return <PriorityQueuePage />;
    case "tree": return <TreePage />;
    case "binary": return <BinaryTreePage />;
    case "bst": return <BSTPage />;
    case "avl": return <AVLPage />;
    case "heap": return <HeapPage />;
    case "trie": return <TriePage />;
    case "graph": return <GraphPage />;
    case "hash": return <HashPage />;
  }
}

function DSLayout({
  title, definition, apps, adv, dis, complexity, space, viz, code,
}: {
  title: string; definition: string;
  apps: string[]; adv: string[]; dis: string[];
  complexity: { label: string; value: string }[]; space: string;
  viz: React.ReactNode; code: string;
}) {
  return (
    <div className="space-y-6">
      <div className="surface rounded-xl p-6">
        <h2 className="text-3xl font-display font-bold mb-2">{title}</h2>
        <p className="text-muted-foreground">{definition}</p>
      </div>

      <div>
        <h3 className="font-display font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">Interactive Visualization</h3>
        {viz}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <ComplexityCard rows={[...complexity, { label: "Space", value: space }]} />
        <InfoCard title="Advantages" items={adv} tone="emerald" />
        <InfoCard title="Disadvantages" items={dis} tone="rose" />
      </div>

      <InfoCard title="Real-World Applications" items={apps} tone="amber" />

      <div>
        <h3 className="font-display font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">Code Example</h3>
        <CodeBlock code={code} />
      </div>
    </div>
  );
}

// ---------- pages ----------
function ArrayPage() {
  return <DSLayout
    title="Array"
    definition="An array stores elements of the same type at contiguous memory locations, accessed in O(1) by index."
    viz={<ArrayViz />}
    apps={["Lookup tables and matrices", "Dynamic lists in apps (todo, cart)", "Buffers in audio/video", "Backing storage for stacks, queues, heaps"]}
    adv={["O(1) random access", "Cache-friendly contiguous memory", "Simple to implement"]}
    dis={["Fixed size (static arrays)", "O(n) insert/delete in middle", "Resize cost in dynamic arrays"]}
    complexity={[
      { label: "Access", value: "O(1)" },
      { label: "Search", value: "O(n)" },
      { label: "Insert (end)", value: "O(1) amortized" },
      { label: "Insert (mid)", value: "O(n)" },
      { label: "Delete", value: "O(n)" },
    ]}
    space="O(n)"
    code={`// Array operations\nconst arr = [12, 7, 23, 4];\narr.push(19);            // insert at end\narr.splice(2, 0, 99);    // insert at index 2\narr.splice(1, 1);        // delete index 1\nconst idx = arr.indexOf(23); // search\narr[0] = 100;            // update`}
  />;
}

function LinkedPage() {
  const [variant, setVariant] = useState<"singly" | "doubly" | "circular">("singly");
  return <div className="space-y-6">
    <div className="surface rounded-xl p-6">
      <h2 className="text-3xl font-display font-bold mb-2">Linked List</h2>
      <p className="text-muted-foreground">A linear collection of nodes, each pointing to the next. Variants: Singly, Doubly, Circular, Circular Doubly.</p>
      <div className="mt-4 flex gap-2 flex-wrap">
        {(["singly", "doubly", "circular"] as const).map((v) => (
          <button key={v} onClick={() => setVariant(v)}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono uppercase ${variant === v ? "bg-primary text-primary-foreground" : "border border-border"}`}>
            {v} linked list
          </button>
        ))}
      </div>
    </div>
    <LinkedListViz variant={variant} />
    <div className="grid md:grid-cols-3 gap-4">
      <ComplexityCard rows={[
        { label: "Access", value: "O(n)" },
        { label: "Search", value: "O(n)" },
        { label: "Insert (head)", value: "O(1)" },
        { label: "Insert (tail*)", value: "O(1)" },
        { label: "Delete (node*)", value: "O(1)" },
        { label: "Space", value: "O(n)" },
      ]} />
      <InfoCard title="Advantages" items={["Dynamic size", "Efficient insert/delete at head", "No memory wastage"]} tone="emerald" />
      <InfoCard title="Disadvantages" items={["No random access", "Extra pointer memory", "Poor cache locality"]} tone="rose" />
    </div>
    <InfoCard title="Real-World Applications" items={["Undo history (doubly)", "Music playlists (circular)", "Hash table chaining", "Memory allocators"]} tone="amber" />
    <CodeBlock code={`class Node { constructor(v){ this.v=v; this.next=null; } }\nclass List {\n  constructor(){ this.head=null; }\n  insertHead(v){ const n=new Node(v); n.next=this.head; this.head=n; }\n  reverse(){ let p=null,c=this.head;\n    while(c){ const n=c.next; c.next=p; p=c; c=n; }\n    this.head=p;\n  }\n}`} />
  </div>;
}

function StackPage() {
  return <DSLayout
    title="Stack"
    definition="A LIFO (Last-In, First-Out) structure. Push and pop happen at the same end — the top."
    viz={<StackViz />}
    apps={["Function call stack", "Undo/redo", "Browser history", "Expression evaluation (postfix)"]}
    adv={["O(1) push/pop", "Simple, predictable", "Useful for backtracking"]}
    dis={["No random access", "Limited to top element"]}
    complexity={[
      { label: "Push", value: "O(1)" }, { label: "Pop", value: "O(1)" },
      { label: "Peek", value: "O(1)" }, { label: "Search", value: "O(n)" },
    ]}
    space="O(n)"
    code={`class Stack {\n  constructor(){ this.data=[]; }\n  push(v){ this.data.push(v); }\n  pop(){ return this.data.pop(); }\n  peek(){ return this.data[this.data.length-1]; }\n  isEmpty(){ return this.data.length===0; }\n}`}
  />;
}

function QueuePage() {
  return <DSLayout
    title="Queue"
    definition="FIFO (First-In, First-Out). Enqueue at the rear, dequeue from the front."
    viz={<QueueViz />}
    apps={["Task scheduling", "Printer queues", "BFS traversal", "Message queues"]}
    adv={["Fair ordering", "O(1) enqueue & dequeue (with proper impl)"]}
    dis={["No random access", "Front-only removal"]}
    complexity={[
      { label: "Enqueue", value: "O(1)" }, { label: "Dequeue", value: "O(1)" },
      { label: "Front", value: "O(1)" }, { label: "Search", value: "O(n)" },
    ]}
    space="O(n)"
    code={`class Queue {\n  constructor(){ this.q=[]; }\n  enqueue(v){ this.q.push(v); }\n  dequeue(){ return this.q.shift(); }\n  front(){ return this.q[0]; }\n  rear(){ return this.q[this.q.length-1]; }\n}`}
  />;
}

function CircularQueuePage() {
  return <DSLayout
    title="Circular Queue"
    definition="A queue where the rear connects back to the front, reusing freed slots. Avoids the wasted-space problem of linear queues."
    viz={<QueueViz circular />}
    apps={["CPU scheduling (round-robin)", "Traffic light systems", "Ring buffers in streaming"]}
    adv={["Efficient memory reuse", "Fixed-size predictable", "Constant-time ops"]}
    dis={["Complex index handling", "Fixed capacity"]}
    complexity={[
      { label: "Enqueue", value: "O(1)" }, { label: "Dequeue", value: "O(1)" },
      { label: "Front", value: "O(1)" }, { label: "Rear", value: "O(1)" },
    ]}
    space="O(n)"
    code={`class CircularQueue {\n  constructor(k){ this.q=new Array(k); this.k=k; this.f=this.r=-1; }\n  enqueue(v){\n    if((this.r+1)%this.k===this.f) return false;\n    if(this.f===-1) this.f=0;\n    this.r=(this.r+1)%this.k; this.q[this.r]=v; return true;\n  }\n}`}
  />;
}

function DequePage() {
  return <DSLayout
    title="Deque (Double-Ended Queue)"
    definition="Insert and delete from both front and rear. Hybrid of stack + queue."
    viz={<QueueViz />}
    apps={["Browser history (forward+back)", "Sliding window problems", "Palindrome checks"]}
    adv={["Flexible: O(1) at both ends", "Generalizes stack and queue"]}
    dis={["More complex implementation", "Higher memory overhead"]}
    complexity={[
      { label: "Insert Front", value: "O(1)" }, { label: "Insert Rear", value: "O(1)" },
      { label: "Delete Front", value: "O(1)" }, { label: "Delete Rear", value: "O(1)" },
    ]}
    space="O(n)"
    code={`class Deque {\n  constructor(){ this.d=[]; }\n  pushFront(v){ this.d.unshift(v); }\n  pushBack(v){ this.d.push(v); }\n  popFront(){ return this.d.shift(); }\n  popBack(){ return this.d.pop(); }\n}`}
  />;
}

function PriorityQueuePage() {
  return <DSLayout
    title="Priority Queue"
    definition="Each element has a priority; highest-priority element is dequeued first. Usually backed by a binary heap."
    viz={<PriorityQueueDemo />}
    apps={["Dijkstra's shortest path", "Task scheduling by priority", "Huffman coding", "Event-driven simulation"]}
    adv={["Fast access to highest priority", "Logarithmic insert and remove"]}
    dis={["Not FIFO for equal priorities (unless stabilized)", "Heap implementation is non-trivial"]}
    complexity={[
      { label: "Insert", value: "O(log n)" },
      { label: "Delete Max/Min", value: "O(log n)" },
      { label: "Peek", value: "O(1)" },
    ]}
    space="O(n)"
    code={`// Max-heap based PQ\nclass PQ {\n  constructor(){ this.h=[]; }\n  insert(v){ this.h.push(v); this._up(this.h.length-1); }\n  pop(){ const t=this.h[0]; const e=this.h.pop();\n    if(this.h.length){ this.h[0]=e; this._down(0); }\n    return t;\n  }\n  _up(i){ while(i>0){ const p=(i-1)>>1; if(this.h[p]<this.h[i]){ [this.h[p],this.h[i]]=[this.h[i],this.h[p]]; i=p;} else break; } }\n  _down(i){ const n=this.h.length;\n    while(true){ const l=2*i+1,r=2*i+2; let m=i;\n      if(l<n&&this.h[l]>this.h[m]) m=l;\n      if(r<n&&this.h[r]>this.h[m]) m=r;\n      if(m===i) break; [this.h[m],this.h[i]]=[this.h[i],this.h[m]]; i=m; } }\n}`}
  />;
}

function PriorityQueueDemo() {
  const [items, setItems] = useState<{ v: string; p: number }[]>([
    { v: "Build", p: 3 }, { v: "Test", p: 1 }, { v: "Deploy", p: 5 }, { v: "Review", p: 2 },
  ]);
  const [val, setVal] = useState(""); const [pri, setPri] = useState("");
  const sorted = [...items].sort((a, b) => b.p - a.p);
  return (
    <div className="surface rounded-xl p-6">
      <div className="flex gap-2 flex-wrap min-h-[100px] items-center">
        {sorted.map((it, i) => (
          <div key={it.v + i} className={`px-4 py-2 rounded-lg font-mono border-2 ${i === 0 ? "border-cyan bg-cyan/20 glow" : "border-border bg-card"}`}>
            <span className="font-bold">{it.v}</span>
            <span className="ml-2 text-xs text-muted-foreground">p={it.p}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        <input value={val} onChange={(e) => setVal(e.target.value)} placeholder="task"
               className="w-28 rounded-md border border-border bg-background px-3 py-2 text-sm font-mono" />
        <input value={pri} onChange={(e) => setPri(e.target.value)} placeholder="priority"
               className="w-24 rounded-md border border-border bg-background px-3 py-2 text-sm font-mono" />
        <button onClick={() => { const p = parseInt(pri); if (val && !isNaN(p)) { setItems([...items, { v: val, p }]); setVal(""); setPri(""); } }}
                className="rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm font-semibold">Insert</button>
        <button onClick={() => setItems(items.filter((_, i) => i !== items.indexOf(sorted[0])))}
                className="rounded-md bg-destructive text-destructive-foreground px-3 py-2 text-sm font-semibold">Pop Highest</button>
      </div>
    </div>
  );
}

function TreePage() {
  return <DSLayout
    title="Tree"
    definition="A hierarchical structure of nodes with a root, parents, and children. No cycles."
    viz={<BSTViz />}
    apps={["File systems", "DOM tree", "Org charts", "Decision trees in ML"]}
    adv={["Hierarchical relationships", "Efficient search variants (BST, AVL)"]}
    dis={["Complex implementation", "Can degrade to O(n) if unbalanced"]}
    complexity={[
      { label: "Search", value: "O(log n) avg" },
      { label: "Insert", value: "O(log n) avg" },
      { label: "Delete", value: "O(log n) avg" },
      { label: "Worst", value: "O(n)" },
    ]}
    space="O(n)"
    code={`class TreeNode { constructor(v){ this.v=v; this.children=[]; } }\nfunction dfs(n, visit){ visit(n.v); n.children.forEach(c=>dfs(c,visit)); }`}
  />;
}

function BinaryTreePage() {
  return <DSLayout
    title="Binary Tree"
    definition="A tree where each node has at most two children: left and right."
    viz={<BSTViz />}
    apps={["Expression trees", "Huffman coding", "Routing tables"]}
    adv={["Foundation for BST, heap, etc.", "Simple traversal patterns"]}
    dis={["No ordering guarantee", "Can be unbalanced"]}
    complexity={[
      { label: "Traversal", value: "O(n)" },
      { label: "Search", value: "O(n)" },
    ]}
    space="O(n)"
    code={`class Node { constructor(v){ this.v=v; this.l=this.r=null; } }\nfunction inorder(n){ if(!n) return; inorder(n.l); console.log(n.v); inorder(n.r); }`}
  />;
}

function BSTPage() {
  return <DSLayout
    title="Binary Search Tree (BST)"
    definition="A binary tree where left subtree < node < right subtree. Enables O(log n) search on balanced trees."
    viz={<BSTViz />}
    apps={["Database indexing", "Symbol tables", "Auto-completion"]}
    adv={["Fast search/insert/delete (avg)", "In-order traversal yields sorted order"]}
    dis={["Worst case O(n) when unbalanced", "Requires self-balancing for guarantees"]}
    complexity={[
      { label: "Search", value: "O(log n) avg / O(n) worst" },
      { label: "Insert", value: "O(log n) avg" },
      { label: "Delete", value: "O(log n) avg" },
    ]}
    space="O(n)"
    code={`function insert(root, v){\n  if(!root) return { v, l:null, r:null };\n  if(v < root.v) root.l = insert(root.l, v);\n  else root.r = insert(root.r, v);\n  return root;\n}`}
  />;
}

function AVLPage() {
  return <DSLayout
    title="AVL Tree"
    definition="A self-balancing BST where the height difference between left and right subtrees is at most 1. Rotations restore balance after insert/delete."
    viz={<BSTViz />}
    apps={["Databases needing strict balance", "In-memory indexes"]}
    adv={["Guaranteed O(log n) operations", "Strict balance"]}
    dis={["More rotations than red-black tree", "Higher implementation complexity"]}
    complexity={[
      { label: "Search", value: "O(log n)" },
      { label: "Insert", value: "O(log n)" },
      { label: "Delete", value: "O(log n)" },
    ]}
    space="O(n)"
    code={`// rotation example\nfunction rotateRight(y){\n  const x = y.l, T2 = x.r;\n  x.r = y; y.l = T2;\n  return x;\n}`}
  />;
}

function HeapPage() {
  return <DSLayout
    title="Heap (Min / Max)"
    definition="A complete binary tree satisfying the heap property: parent ≤ children (min-heap) or parent ≥ children (max-heap). Implemented in an array."
    viz={<HeapDemo />}
    apps={["Priority queues", "Heap sort", "Dijkstra / Prim", "K-largest problems"]}
    adv={["O(log n) insert and pop", "Array-backed, cache-friendly"]}
    dis={["No efficient search by value", "Only root is fast"]}
    complexity={[
      { label: "Insert", value: "O(log n)" },
      { label: "Pop Root", value: "O(log n)" },
      { label: "Peek", value: "O(1)" },
      { label: "Build Heap", value: "O(n)" },
    ]}
    space="O(n)"
    code={`function siftUp(h, i){\n  while(i>0){ const p=(i-1)>>1;\n    if(h[p] < h[i]){ [h[p],h[i]]=[h[i],h[p]]; i=p; } else break;\n  }\n}`}
  />;
}

function HeapDemo() {
  const [heap, setHeap] = useState<number[]>([50, 30, 40, 10, 20, 35]);
  const [val, setVal] = useState("");
  const insert = () => {
    const v = parseInt(val); if (isNaN(v)) return;
    const h = [...heap, v]; let i = h.length - 1;
    while (i > 0) { const p = (i - 1) >> 1; if (h[p] < h[i]) { [h[p], h[i]] = [h[i], h[p]]; i = p; } else break; }
    setHeap(h);
  };
  const positions = heap.map((v, i) => {
    const depth = Math.floor(Math.log2(i + 1));
    const idxInLevel = i - (Math.pow(2, depth) - 1);
    const total = Math.pow(2, depth);
    const x = ((idxInLevel + 0.5) / total) * 460;
    const y = depth * 60 + 30;
    return { v, x, y, i };
  });
  return (
    <div className="surface rounded-xl p-6">
      <svg viewBox="0 0 460 260" className="w-full">
        {positions.map((n) => {
          if (n.i === 0) return null;
          const p = positions[(n.i - 1) >> 1];
          return <line key={`e${n.i}`} x1={p.x} y1={p.y} x2={n.x} y2={n.y} className="stroke-border" strokeWidth={1.5} />;
        })}
        {positions.map((n) => (
          <g key={n.i}>
            <circle cx={n.x} cy={n.y} r={18} className={n.i === 0 ? "fill-violet" : "fill-card stroke-cyan"} strokeWidth={2} />
            <text x={n.x} y={n.y + 4} textAnchor="middle" className={`font-mono text-[12px] font-bold ${n.i === 0 ? "fill-background" : "fill-foreground"}`}>{n.v}</text>
          </g>
        ))}
      </svg>
      <div className="mt-4 flex flex-wrap gap-2">
        <input value={val} onChange={(e) => setVal(e.target.value)} placeholder="value"
               className="w-24 rounded-md border border-border bg-background px-3 py-2 text-sm font-mono" />
        <button onClick={insert} className="rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm font-semibold">Insert</button>
        <button onClick={() => { if (!heap.length) return; const h = [...heap]; h[0] = h[h.length - 1]; h.pop();
          let i = 0; while (true) { const l = 2 * i + 1, r = 2 * i + 2; let m = i;
            if (l < h.length && h[l] > h[m]) m = l;
            if (r < h.length && h[r] > h[m]) m = r;
            if (m === i) break; [h[m], h[i]] = [h[i], h[m]]; i = m; } setHeap(h); }}
                className="rounded-md bg-destructive text-destructive-foreground px-3 py-2 text-sm font-semibold">Extract Max</button>
      </div>
      <div className="mt-3 text-xs font-mono text-muted-foreground">Array: [{heap.join(", ")}]</div>
    </div>
  );
}

function TriePage() {
  return <DSLayout
    title="Trie"
    definition="A tree where each node represents a character. Words share common prefixes, making prefix search extremely efficient."
    viz={<TrieDemo />}
    apps={["Autocomplete", "Spell check", "IP routing", "Word games"]}
    adv={["Fast prefix search", "Sorted traversal", "Saves space on shared prefixes"]}
    dis={["High memory overhead per node", "More complex than hash map"]}
    complexity={[
      { label: "Insert", value: "O(L)" },
      { label: "Search", value: "O(L)" },
      { label: "Delete", value: "O(L)" },
    ]}
    space="O(N·L)"
    code={`class Trie {\n  constructor(){ this.root={}; }\n  insert(w){ let n=this.root; for(const c of w){ n[c] = n[c] || {}; n=n[c]; } n.$=true; }\n  search(w){ let n=this.root; for(const c of w){ if(!n[c]) return false; n=n[c]; } return !!n.$; }\n}`}
  />;
}
function TrieDemo() {
  const [words, setWords] = useState<string[]>(["cat", "car", "cart", "dog", "dot"]);
  const [w, setW] = useState(""); const [q, setQ] = useState(""); const [matches, setMatches] = useState<string[]>([]);
  const search = () => setMatches(words.filter((x) => x.startsWith(q)));
  return (
    <div className="surface rounded-xl p-6">
      <div className="flex flex-wrap gap-2 mb-4">
        {words.map((w) => <span key={w} className="px-3 py-1 rounded-md bg-secondary text-sm font-mono">{w}</span>)}
      </div>
      <div className="flex flex-wrap gap-2">
        <input value={w} onChange={(e) => setW(e.target.value)} placeholder="word"
               className="rounded-md border border-border bg-background px-3 py-2 text-sm font-mono" />
        <button onClick={() => { if (w) { setWords([...words, w]); setW(""); } }} className="rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm font-semibold">Insert</button>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="prefix"
               className="rounded-md border border-border bg-background px-3 py-2 text-sm font-mono" />
        <button onClick={search} className="rounded-md bg-violet text-background px-3 py-2 text-sm font-semibold">Prefix Search</button>
      </div>
      {matches.length > 0 && <div className="mt-3 text-sm font-mono text-cyan">Matches: {matches.join(", ")}</div>}
    </div>
  );
}

function GraphPage() {
  return <DSLayout
    title="Graph"
    definition="A set of vertices connected by edges. Can be directed/undirected, weighted/unweighted."
    viz={<GraphViz />}
    apps={["Social networks", "Maps & routing", "Web crawling", "Recommendation systems"]}
    adv={["Models any relational data", "Rich algorithm library (BFS, DFS, Dijkstra...)"]}
    dis={["Memory hungry (adjacency matrix)", "Complex algorithms"]}
    complexity={[
      { label: "BFS / DFS", value: "O(V + E)" },
      { label: "Dijkstra", value: "O((V+E) log V)" },
    ]}
    space="O(V + E)"
    code={`// adjacency list\nconst adj = { A:['B','D'], B:['A','C','E'], ... };\nfunction bfs(start){ const q=[start], seen=new Set([start]);\n  while(q.length){ const n=q.shift(); console.log(n);\n    for(const nb of adj[n]) if(!seen.has(nb)){ seen.add(nb); q.push(nb); } } }`}
  />;
}

function HashPage() {
  return <DSLayout
    title="Hash Table"
    definition="Maps keys to values using a hash function. Average O(1) access. Collisions are resolved via chaining or open addressing."
    viz={<HashDemo />}
    apps={["Caches", "Database indexes", "Symbol tables in compilers", "Sets & maps"]}
    adv={["O(1) average ops", "Flexible keys"]}
    dis={["Worst case O(n) with bad hash", "No ordering", "Memory overhead"]}
    complexity={[
      { label: "Insert", value: "O(1) avg / O(n) worst" },
      { label: "Search", value: "O(1) avg" },
      { label: "Delete", value: "O(1) avg" },
    ]}
    space="O(n)"
    code={`function hash(key, size){ let h=0; for(const c of key) h=(h*31+c.charCodeAt(0))%size; return h; }\n// chaining\nconst table = Array.from({length:8}, ()=>[]);\nfunction put(k,v){ const i=hash(k,8); const b=table[i];\n  const e=b.find(x=>x[0]===k); if(e) e[1]=v; else b.push([k,v]); }`}
  />;
}

function HashDemo() {
  const SIZE = 7;
  const [buckets, setBuckets] = useState<[string, string][][]>(() => Array.from({ length: SIZE }, () => [] as [string, string][]));
  const [k, setK] = useState(""); const [v, setV] = useState("");
  const hash = (s: string) => { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) % SIZE; return h; };
  const put = () => { if (!k) return; const i = hash(k); const next = buckets.map((b) => [...b]);
    const e = next[i].find((x) => x[0] === k); if (e) e[1] = v; else next[i].push([k, v]); setBuckets(next); setK(""); setV(""); };
  const del = () => { if (!k) return; const i = hash(k); const next = buckets.map((b) => b.filter((x) => x[0] !== k)); setBuckets(next); setK(""); };
  return (
    <div className="surface rounded-xl p-6">
      <div className="space-y-2">
        {buckets.map((b, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-10 text-xs font-mono text-muted-foreground">[{i}]</div>
            <div className="flex-1 flex gap-2 flex-wrap min-h-[36px] p-1 rounded border border-border bg-background/40">
              {b.map(([key, val], j) => (
                <span key={j} className={`px-2 py-1 rounded text-xs font-mono ${b.length > 1 ? "bg-rose/30 text-rose" : "bg-cyan/20 text-cyan"}`}>
                  {key}: {val}
                </span>
              ))}
              {b.length > 1 && <span className="text-[10px] font-mono text-rose ml-1">collision (chaining)</span>}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <input value={k} onChange={(e) => setK(e.target.value)} placeholder="key"
               className="w-28 rounded-md border border-border bg-background px-3 py-2 text-sm font-mono" />
        <input value={v} onChange={(e) => setV(e.target.value)} placeholder="value"
               className="w-28 rounded-md border border-border bg-background px-3 py-2 text-sm font-mono" />
        <button onClick={put} className="rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm font-semibold">Put</button>
        <button onClick={del} className="rounded-md bg-destructive text-destructive-foreground px-3 py-2 text-sm font-semibold">Delete</button>
      </div>
    </div>
  );
}
