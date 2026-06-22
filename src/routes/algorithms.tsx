import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Section, ComplexityCard, InfoCard, CodeBlock } from "../components/Visualizer";
import { SortingViz } from "../components/viz/SortingViz";
import { SearchingViz } from "../components/viz/SearchingViz";
import { GraphViz } from "../components/viz/GraphViz";

export const Route = createFileRoute("/algorithms")({
  head: () => ({
    meta: [
      { title: "Algorithms — DSA Visualizer" },
      { name: "description", content: "Visualize sorting, searching and graph algorithms with step-by-step animation, complexity analysis and code." },
    ],
  }),
  component: Algorithms,
});

type Group = "sort" | "search" | "graph";

function Algorithms() {
  const [group, setGroup] = useState<Group>("sort");
  return (
    <div>
      <PageHeader kicker="Module 02" title="Algorithms"
        subtitle="Sorting, searching, and graph traversals — each with animated step-by-step visualization, complexity table, and code example." />

      <Section className="pb-16">
        <div className="flex gap-2 mb-6 flex-wrap">
          {[
            { k: "sort", l: "Sorting" }, { k: "search", l: "Searching" }, { k: "graph", l: "Graph" },
          ].map((g) => (
            <button key={g.k} onClick={() => setGroup(g.k as Group)}
                    className={`px-4 py-2 rounded-md text-sm font-semibold ${group === g.k ? "bg-primary text-primary-foreground" : "border border-border"}`}>
              {g.l}
            </button>
          ))}
        </div>

        {group === "sort" && <SortPage />}
        {group === "search" && <SearchPage />}
        {group === "graph" && <GraphPage />}
      </Section>
    </div>
  );
}

function SortPage() {
  return (
    <div className="space-y-6">
      <div className="surface rounded-xl p-6">
        <h2 className="text-3xl font-display font-bold mb-2">Sorting Algorithms</h2>
        <p className="text-muted-foreground">Choose an algorithm above the bars. Violet = pivot/current; Cyan = comparison.</p>
      </div>
      <SortingViz />
      <div className="grid lg:grid-cols-2 gap-4">
        <ComplexityCard rows={[
          { label: "Bubble — best", value: "O(n)" }, { label: "Bubble — worst", value: "O(n²)" },
          { label: "Selection", value: "O(n²)" }, { label: "Insertion — best", value: "O(n)" },
          { label: "Insertion — worst", value: "O(n²)" },
          { label: "Merge", value: "O(n log n)" }, { label: "Quick — avg", value: "O(n log n)" },
          { label: "Quick — worst", value: "O(n²)" }, { label: "Heap", value: "O(n log n)" },
        ]} />
        <InfoCard title="Use Cases" tone="amber" items={[
          "Bubble / Insertion: teaching, tiny inputs",
          "Selection: when writes are very expensive",
          "Merge: stable sort, linked lists, external sort",
          "Quick: general purpose in-memory sort",
          "Heap: priority-queue-driven, in-place, no recursion",
        ]} />
      </div>
      <CodeBlock code={`// Quicksort (Lomuto partition)\nfunction quicksort(a, lo=0, hi=a.length-1){\n  if(lo>=hi) return;\n  const pivot=a[hi]; let i=lo-1;\n  for(let j=lo;j<hi;j++){\n    if(a[j]<pivot){ i++; [a[i],a[j]]=[a[j],a[i]]; }\n  }\n  [a[i+1],a[hi]]=[a[hi],a[i+1]];\n  quicksort(a,lo,i); quicksort(a,i+2,hi);\n}`} />
    </div>
  );
}

function SearchPage() {
  return (
    <div className="space-y-6">
      <div className="surface rounded-xl p-6">
        <h2 className="text-3xl font-display font-bold mb-2">Searching Algorithms</h2>
        <p className="text-muted-foreground">Linear scans every element. Binary search needs a sorted array but halves the range each step.</p>
      </div>
      <SearchingViz />
      <div className="grid md:grid-cols-2 gap-4">
        <ComplexityCard rows={[
          { label: "Linear — best", value: "O(1)" },
          { label: "Linear — avg/worst", value: "O(n)" },
          { label: "Binary — best", value: "O(1)" },
          { label: "Binary — worst", value: "O(log n)" },
        ]} />
        <InfoCard title="Practical Applications" tone="amber" items={[
          "Linear: unsorted lists, small data",
          "Binary: sorted arrays, lower bound queries, search in answer space",
          "Real-world: database B-tree indexes use binary search principles",
        ]} />
      </div>
      <CodeBlock code={`function binarySearch(a, target){\n  let lo=0, hi=a.length-1;\n  while(lo<=hi){\n    const mid=(lo+hi)>>1;\n    if(a[mid]===target) return mid;\n    if(a[mid]<target) lo=mid+1; else hi=mid-1;\n  }\n  return -1;\n}`} />
    </div>
  );
}

function GraphPage() {
  return (
    <div className="space-y-6">
      <div className="surface rounded-xl p-6">
        <h2 className="text-3xl font-display font-bold mb-2">Graph Traversal: BFS & DFS</h2>
        <p className="text-muted-foreground">BFS explores neighbors level-by-level using a queue. DFS dives deep using recursion (or a stack).</p>
      </div>
      <GraphViz />
      <div className="grid md:grid-cols-2 gap-4">
        <ComplexityCard rows={[
          { label: "BFS time", value: "O(V + E)" },
          { label: "DFS time", value: "O(V + E)" },
          { label: "Space", value: "O(V)" },
        ]} />
        <InfoCard title="Applications" tone="amber" items={[
          "BFS: shortest path in unweighted graphs, web crawling",
          "DFS: cycle detection, topological sort, connected components, maze solving",
        ]} />
      </div>
      <CodeBlock code={`function bfs(graph, start){\n  const seen=new Set([start]); const q=[start];\n  while(q.length){\n    const n=q.shift(); console.log(n);\n    for(const nb of graph[n]) if(!seen.has(nb)){ seen.add(nb); q.push(nb); }\n  }\n}\nfunction dfs(graph, n, seen=new Set()){\n  seen.add(n); console.log(n);\n  for(const nb of graph[n]) if(!seen.has(nb)) dfs(graph, nb, seen);\n}`} />
    </div>
  );
}
