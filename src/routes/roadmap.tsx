import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Section } from "../components/Visualizer";
import { Check } from "lucide-react";

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: "Learning Roadmap — DSA Visualizer" },
      { name: "description", content: "An 11-step roadmap from arrays to advanced problem solving. Interactive timeline." },
    ],
  }),
  component: Page,
});

const steps = [
  { n: 1, t: "Arrays", d: "Indexing, iteration, two-pointer, sliding window.", to: "/data-structures" },
  { n: 2, t: "Linked Lists", d: "Pointers, head/tail, reversal, fast/slow pointer.", to: "/data-structures" },
  { n: 3, t: "Stacks", d: "LIFO, parentheses, monotonic stacks.", to: "/data-structures" },
  { n: 4, t: "Queues", d: "FIFO, circular queue, deque.", to: "/data-structures" },
  { n: 5, t: "Priority Queues", d: "Heap-backed, top-K problems.", to: "/data-structures" },
  { n: 6, t: "Trees", d: "Recursion, traversals, BST property.", to: "/data-structures" },
  { n: 7, t: "Heaps", d: "Sift up/down, build heap, heap sort.", to: "/data-structures" },
  { n: 8, t: "Hash Tables", d: "Hashing, collision handling, set/map.", to: "/data-structures" },
  { n: 9, t: "Graphs", d: "Adjacency list, BFS, DFS, shortest paths.", to: "/data-structures" },
  { n: 10, t: "Algorithms", d: "Sorting, searching, divide & conquer, greedy, DP intro.", to: "/algorithms" },
  { n: 11, t: "Problem Solving", d: "Patterns, mock interviews, edge cases.", to: "/interview" },
];

function Page() {
  return (
    <div>
      <PageHeader kicker="Path" title="11-Step Learning Roadmap"
        subtitle="Follow this order. Each step builds on the last. Click a node to jump in." />

      <Section className="pb-20">
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan via-violet to-emerald" />
          <div className="space-y-8">
            {steps.map((s, i) => (
              <div key={s.n} className={`relative grid md:grid-cols-2 gap-4 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <div className="hidden md:block" />
                <Link to={s.to} className="relative ml-12 md:ml-0 group">
                  <div className="absolute -left-12 md:-left-12 top-4 grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-cyan to-violet font-mono font-bold text-background text-sm border-4 border-background"
                       style={{ left: undefined }}>
                    {s.n}
                  </div>
                  <div className="surface rounded-xl p-5 hover:border-cyan/60 transition">
                    <div className="text-xs font-mono uppercase tracking-wider text-cyan mb-1">Step {s.n}</div>
                    <h3 className="font-display font-bold text-xl mb-1">{s.t}</h3>
                    <p className="text-sm text-muted-foreground">{s.d}</p>
                    <div className="mt-3 inline-flex items-center gap-1 text-xs text-cyan group-hover:gap-2 transition-all">
                      Open <Check className="h-3 w-3" />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
