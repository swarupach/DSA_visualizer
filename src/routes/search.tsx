import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { PageHeader, Section } from "../components/Visualizer";
import { Search as SearchIcon, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Search — DSA Visualizer" },
      { name: "description", content: "Find data structures, algorithms, complexity topics, and interview questions." },
    ],
  }),
  component: Page,
});

const INDEX = [
  { title: "Array", to: "/data-structures", category: "Data Structure", tags: ["linear", "index", "O(1) access"] },
  { title: "Linked List", to: "/data-structures", category: "Data Structure", tags: ["singly", "doubly", "circular"] },
  { title: "Stack", to: "/data-structures", category: "Data Structure", tags: ["LIFO", "push", "pop"] },
  { title: "Queue", to: "/data-structures", category: "Data Structure", tags: ["FIFO", "enqueue", "dequeue"] },
  { title: "Circular Queue", to: "/data-structures", category: "Data Structure", tags: ["ring buffer"] },
  { title: "Deque", to: "/data-structures", category: "Data Structure", tags: ["double-ended"] },
  { title: "Priority Queue", to: "/data-structures", category: "Data Structure", tags: ["heap"] },
  { title: "Binary Search Tree", to: "/data-structures", category: "Data Structure", tags: ["BST", "logarithmic"] },
  { title: "AVL Tree", to: "/data-structures", category: "Data Structure", tags: ["balanced"] },
  { title: "Heap", to: "/data-structures", category: "Data Structure", tags: ["min", "max"] },
  { title: "Trie", to: "/data-structures", category: "Data Structure", tags: ["prefix", "autocomplete"] },
  { title: "Graph", to: "/data-structures", category: "Data Structure", tags: ["vertex", "edge"] },
  { title: "Hash Table", to: "/data-structures", category: "Data Structure", tags: ["hashing", "collision"] },

  { title: "Bubble Sort", to: "/algorithms", category: "Algorithm" },
  { title: "Selection Sort", to: "/algorithms", category: "Algorithm" },
  { title: "Insertion Sort", to: "/algorithms", category: "Algorithm" },
  { title: "Merge Sort", to: "/algorithms", category: "Algorithm" },
  { title: "Quick Sort", to: "/algorithms", category: "Algorithm" },
  { title: "Heap Sort", to: "/algorithms", category: "Algorithm" },
  { title: "Linear Search", to: "/algorithms", category: "Algorithm" },
  { title: "Binary Search", to: "/algorithms", category: "Algorithm" },
  { title: "BFS", to: "/algorithms", category: "Algorithm" },
  { title: "DFS", to: "/algorithms", category: "Algorithm" },

  { title: "Complexity Cheat Sheet", to: "/complexity", category: "Reference" },
  { title: "Linear vs Non-Linear", to: "/comparison", category: "Reference" },
  { title: "Glossary", to: "/glossary", category: "Reference" },
  { title: "Learning Roadmap", to: "/roadmap", category: "Reference" },

  { title: "Interview Questions", to: "/interview", category: "Interview" },
  { title: "DSA Quiz", to: "/quiz", category: "Practice" },
];

function Page() {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    if (!q.trim()) return INDEX;
    const s = q.toLowerCase();
    return INDEX.filter((i) =>
      i.title.toLowerCase().includes(s) ||
      i.category.toLowerCase().includes(s) ||
      (i.tags && i.tags.some((t) => t.toLowerCase().includes(s)))
    );
  }, [q]);

  return (
    <div>
      <PageHeader kicker="Search" title="Find anything"
        subtitle="Data structures, algorithms, complexity topics, interview content — all indexed." />
      <Section className="pb-20">
        <div className="relative max-w-2xl mb-8">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)}
                 placeholder="Search 'binary', 'sort', 'BFS', 'O(log n)'..."
                 className="w-full rounded-lg border border-border bg-card pl-10 pr-3 py-3 font-mono text-sm focus:outline-none focus:border-cyan" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {results.map((r) => (
            <Link key={r.title} to={r.to} className="surface rounded-lg p-4 group hover:border-cyan transition">
              <div className="text-[10px] uppercase tracking-wider font-mono text-cyan">{r.category}</div>
              <div className="mt-1 flex items-center justify-between gap-2">
                <span className="font-semibold">{r.title}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-cyan group-hover:translate-x-0.5 transition" />
              </div>
            </Link>
          ))}
        </div>
        {results.length === 0 && <p className="text-muted-foreground text-center py-10">No matches.</p>}
      </Section>
    </div>
  );
}
