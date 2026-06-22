import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "../components/Visualizer";

export const Route = createFileRoute("/complexity")({
  head: () => ({
    meta: [
      { title: "Complexity Cheat Sheet — DSA Visualizer" },
      { name: "description", content: "Time and space complexity for every common data structure and algorithm." },
    ],
  }),
  component: Page,
});

const dsRows = [
  ["Array", "O(1)", "O(n)", "O(n)", "O(n)", "O(n)"],
  ["Stack", "O(n)", "O(n)", "O(1)", "O(1)", "O(n)"],
  ["Queue", "O(n)", "O(n)", "O(1)", "O(1)", "O(n)"],
  ["Singly Linked List", "O(n)", "O(n)", "O(1)", "O(1)", "O(n)"],
  ["Doubly Linked List", "O(n)", "O(n)", "O(1)", "O(1)", "O(n)"],
  ["Hash Table", "—", "O(1)*", "O(1)*", "O(1)*", "O(n)"],
  ["BST (avg)", "O(log n)", "O(log n)", "O(log n)", "O(log n)", "O(n)"],
  ["BST (worst)", "O(n)", "O(n)", "O(n)", "O(n)", "O(n)"],
  ["AVL Tree", "O(log n)", "O(log n)", "O(log n)", "O(log n)", "O(n)"],
  ["Heap", "—", "O(n)", "O(log n)", "O(log n)", "O(n)"],
  ["Trie", "—", "O(L)", "O(L)", "O(L)", "O(N·L)"],
];

const algoRows = [
  ["Bubble Sort", "O(n)", "O(n²)", "O(n²)", "O(1)"],
  ["Selection Sort", "O(n²)", "O(n²)", "O(n²)", "O(1)"],
  ["Insertion Sort", "O(n)", "O(n²)", "O(n²)", "O(1)"],
  ["Merge Sort", "O(n log n)", "O(n log n)", "O(n log n)", "O(n)"],
  ["Quick Sort", "O(n log n)", "O(n log n)", "O(n²)", "O(log n)"],
  ["Heap Sort", "O(n log n)", "O(n log n)", "O(n log n)", "O(1)"],
  ["Linear Search", "O(1)", "O(n)", "O(n)", "O(1)"],
  ["Binary Search", "O(1)", "O(log n)", "O(log n)", "O(1)"],
  ["BFS", "O(V+E)", "O(V+E)", "O(V+E)", "O(V)"],
  ["DFS", "O(V+E)", "O(V+E)", "O(V+E)", "O(V)"],
];

function Page() {
  return (
    <div>
      <PageHeader kicker="Reference" title="Complexity Cheat Sheet"
        subtitle="Quick lookup for time and space complexity. * = average case." />

      <Section className="pb-8">
        <h2 className="text-2xl font-display font-bold mb-4">Data Structures</h2>
        <div className="surface rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                {["Structure", "Access", "Search", "Insert", "Delete", "Space"].map((h) => (
                  <th key={h} className="p-3 font-display text-xs uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dsRows.map((r) => (
                <tr key={r[0]} className="border-b border-border/60">
                  <td className="p-3 font-semibold">{r[0]}</td>
                  {r.slice(1).map((c, i) => <td key={i} className="p-3 font-mono text-cyan">{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section className="pb-16">
        <h2 className="text-2xl font-display font-bold mb-4">Algorithms</h2>
        <div className="surface rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                {["Algorithm", "Best", "Average", "Worst", "Space"].map((h) => (
                  <th key={h} className="p-3 font-display text-xs uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {algoRows.map((r) => (
                <tr key={r[0]} className="border-b border-border/60">
                  <td className="p-3 font-semibold">{r[0]}</td>
                  {r.slice(1).map((c, i) => <td key={i} className="p-3 font-mono text-cyan">{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}
