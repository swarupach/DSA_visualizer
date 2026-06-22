import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { PageHeader, Section } from "../components/Visualizer";
import { Search } from "lucide-react";

export const Route = createFileRoute("/glossary")({
  head: () => ({
    meta: [
      { title: "DSA Glossary — DSA Visualizer" },
      { name: "description", content: "Definitions of important DSA terms — from amortized analysis to vertex cover." },
    ],
  }),
  component: Page,
});

const TERMS: { term: string; def: string }[] = [
  { term: "Algorithm", def: "A finite sequence of well-defined steps to solve a problem." },
  { term: "Amortized Analysis", def: "Average time per operation over a sequence of operations, even if some are slow." },
  { term: "Array", def: "A collection of elements stored in contiguous memory locations." },
  { term: "AVL Tree", def: "A self-balancing BST where heights of subtrees differ by at most 1." },
  { term: "BFS", def: "Breadth-First Search — explores graph level by level using a queue." },
  { term: "Big-O Notation", def: "Upper bound on the growth rate of an algorithm's running time." },
  { term: "Binary Search", def: "Search in a sorted array by repeatedly halving the search interval." },
  { term: "Binary Tree", def: "A tree where each node has at most two children." },
  { term: "BST", def: "Binary Search Tree — left subtree values < node < right subtree values." },
  { term: "Collision", def: "When two keys hash to the same index in a hash table." },
  { term: "Complexity", def: "Resources (time/space) an algorithm consumes as a function of input size." },
  { term: "Deque", def: "Double-ended queue — insert/remove from both ends." },
  { term: "DFS", def: "Depth-First Search — explores as deep as possible before backtracking." },
  { term: "Dynamic Programming", def: "Solve problems by combining optimal solutions of overlapping subproblems." },
  { term: "Edge", def: "A connection between two vertices in a graph." },
  { term: "FIFO", def: "First-In, First-Out — the queue ordering." },
  { term: "Greedy Algorithm", def: "Makes the locally optimal choice at each step." },
  { term: "Graph", def: "A set of vertices connected by edges; can be directed or undirected." },
  { term: "Hash Function", def: "Maps arbitrary keys to fixed-size integers used as indexes." },
  { term: "Hash Table", def: "Stores key/value pairs with O(1) average access via hashing." },
  { term: "Heap", def: "Complete binary tree satisfying the heap property; backs priority queues." },
  { term: "LIFO", def: "Last-In, First-Out — the stack ordering." },
  { term: "Linked List", def: "Linear sequence of nodes connected by pointers." },
  { term: "Memoization", def: "Caching results of expensive function calls for reuse." },
  { term: "Node", def: "A fundamental element of trees, graphs, and linked lists." },
  { term: "NP-Complete", def: "Decision problems for which no polynomial-time algorithm is known." },
  { term: "Pointer", def: "A variable holding the address of another variable." },
  { term: "Priority Queue", def: "Queue where elements are dequeued by priority, not insertion order." },
  { term: "Recursion", def: "A function calling itself to solve smaller subproblems." },
  { term: "Stack", def: "LIFO data structure with push, pop, peek operations." },
  { term: "Trie", def: "Tree where each node represents a character of a string; great for prefix queries." },
  { term: "Vertex", def: "A node in a graph." },
];

function Page() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() =>
    TERMS.filter((t) => t.term.toLowerCase().includes(q.toLowerCase()) || t.def.toLowerCase().includes(q.toLowerCase())),
    [q]);

  return (
    <div>
      <PageHeader kicker="Reference" title="DSA Glossary"
        subtitle="Bookmark this. Quick definitions for the terms you'll see everywhere." />

      <Section className="pb-20">
        <div className="relative mb-6 max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search terms or definitions..."
                 className="w-full rounded-lg border border-border bg-card pl-10 pr-3 py-3 font-mono text-sm focus:outline-none focus:border-cyan" />
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {filtered.map((t) => (
            <div key={t.term} className="surface rounded-lg p-4">
              <div className="font-display font-semibold text-cyan">{t.term}</div>
              <div className="text-sm text-muted-foreground mt-1">{t.def}</div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && <p className="text-center text-muted-foreground py-10">No matches.</p>}
      </Section>
    </div>
  );
}
