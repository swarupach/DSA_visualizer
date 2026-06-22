import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "../components/Visualizer";
import { Lightbulb, AlertTriangle, Target } from "lucide-react";

export const Route = createFileRoute("/interview")({
  head: () => ({
    meta: [
      { title: "Interview Prep — DSA Visualizer" },
      { name: "description", content: "Most asked DSA interview questions, tips, common mistakes, and problem-solving strategies." },
    ],
  }),
  component: Page,
});

const questions = [
  { q: "Reverse a linked list", topic: "Linked List", diff: "Easy" },
  { q: "Detect a cycle in a linked list", topic: "Linked List", diff: "Easy" },
  { q: "Two Sum", topic: "Array / Hashing", diff: "Easy" },
  { q: "Valid Parentheses", topic: "Stack", diff: "Easy" },
  { q: "Implement Queue using Stacks", topic: "Stack / Queue", diff: "Easy" },
  { q: "Maximum Subarray (Kadane's)", topic: "Array / DP", diff: "Medium" },
  { q: "Merge Intervals", topic: "Sorting / Array", diff: "Medium" },
  { q: "Lowest Common Ancestor (BST)", topic: "BST", diff: "Medium" },
  { q: "Number of Islands", topic: "Graph (BFS/DFS)", diff: "Medium" },
  { q: "Course Schedule (Topological Sort)", topic: "Graph", diff: "Medium" },
  { q: "Top K Frequent Elements", topic: "Heap / Hash", diff: "Medium" },
  { q: "Word Break", topic: "DP / Trie", diff: "Medium" },
  { q: "Trapping Rain Water", topic: "Array / Two-Pointer", diff: "Hard" },
  { q: "Median of Two Sorted Arrays", topic: "Binary Search", diff: "Hard" },
  { q: "Serialize / Deserialize Binary Tree", topic: "Tree", diff: "Hard" },
];

const tips = [
  "Clarify input/output and edge cases before writing code.",
  "Talk through your approach — interviewers grade thought process.",
  "State complexity for time AND space.",
  "Pick the simplest correct approach first, then optimize.",
  "Use named helpers, not one giant function.",
];

const mistakes = [
  "Diving into code before understanding the problem.",
  "Forgetting empty input, single-element, or negative numbers.",
  "Mutating input arrays unintentionally.",
  "Off-by-one errors in two-pointer / binary search.",
  "Not testing your code by walking through an example.",
];

const strategies = [
  "Hashing → counting, dedup, lookup in O(1).",
  "Two pointers → sorted arrays, pair sums, partitioning.",
  "Sliding window → contiguous subarray problems.",
  "BFS → shortest path in unweighted graph.",
  "DFS / recursion → exhaustive search, trees, graphs.",
  "Heap → top-K, scheduling, k-way merge.",
  "DP → overlapping subproblems + optimal substructure.",
];

function Page() {
  const diffColor = (d: string) => d === "Easy" ? "text-emerald" : d === "Medium" ? "text-amber" : "text-rose";
  return (
    <div>
      <PageHeader kicker="Crush It" title="Interview Preparation"
        subtitle="The questions you'll see, the tips you need, the mistakes to dodge, and the patterns to recognize." />

      <Section className="grid lg:grid-cols-3 gap-4 mb-10">
        <Box icon={Lightbulb} title="Interview Tips" tone="cyan" items={tips} />
        <Box icon={AlertTriangle} title="Common Mistakes" tone="rose" items={mistakes} />
        <Box icon={Target} title="Problem-Solving Strategies" tone="violet" items={strategies} />
      </Section>

      <Section className="pb-20">
        <h2 className="text-2xl font-display font-bold mb-4">Most-Asked Questions</h2>
        <div className="surface rounded-xl overflow-hidden">
          {questions.map((q, i) => (
            <div key={q.q} className={`flex items-center justify-between gap-4 px-5 py-4 ${i < questions.length - 1 ? "border-b border-border/60" : ""}`}>
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xs font-mono text-muted-foreground w-6">{String(i + 1).padStart(2, "0")}</span>
                <div className="min-w-0">
                  <div className="font-semibold truncate">{q.q}</div>
                  <div className="text-xs text-muted-foreground">{q.topic}</div>
                </div>
              </div>
              <span className={`text-xs font-mono uppercase ${diffColor(q.diff)} shrink-0`}>{q.diff}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Box({ icon: Icon, title, tone, items }: { icon: any; title: string; tone: "cyan" | "violet" | "rose"; items: string[] }) {
  const color = tone === "cyan" ? "text-cyan" : tone === "violet" ? "text-violet" : "text-rose";
  return (
    <div className="surface rounded-xl p-5">
      <div className={`flex items-center gap-2 mb-3 ${color}`}>
        <Icon className="h-5 w-5" />
        <h3 className="font-display font-semibold">{title}</h3>
      </div>
      <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-4">
        {items.map((i) => <li key={i}>{i}</li>)}
      </ul>
    </div>
  );
}
