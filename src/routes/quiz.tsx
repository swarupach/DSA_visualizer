import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Section } from "../components/Visualizer";
import { Check, X, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "DSA Quiz — DSA Visualizer" },
      { name: "description", content: "Test your knowledge with multiple-choice questions on data structures and algorithms." },
    ],
  }),
  component: Page,
});

type Q = { q: string; opts: string[]; a: number; diff: "Easy" | "Medium" | "Hard"; topic: string };
const QS: Q[] = [
  { q: "Time complexity of accessing an array element by index?", opts: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], a: 0, diff: "Easy", topic: "Array" },
  { q: "Which data structure uses LIFO?", opts: ["Queue", "Stack", "Deque", "Heap"], a: 1, diff: "Easy", topic: "Stack" },
  { q: "Which traversal visits root, left, right?", opts: ["Inorder", "Preorder", "Postorder", "Level order"], a: 1, diff: "Easy", topic: "Tree" },
  { q: "Best-case complexity of insertion sort?", opts: ["O(n²)", "O(n log n)", "O(n)", "O(1)"], a: 2, diff: "Medium", topic: "Sorting" },
  { q: "Worst-case complexity of quicksort?", opts: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"], a: 1, diff: "Medium", topic: "Sorting" },
  { q: "Binary search requires the array to be...?", opts: ["Sorted", "Unique", "Small", "Power of 2 size"], a: 0, diff: "Easy", topic: "Searching" },
  { q: "Which structure backs Dijkstra's shortest-path algorithm efficiently?", opts: ["Stack", "Hash Table", "Min-Heap / Priority Queue", "Linked List"], a: 2, diff: "Medium", topic: "Graph" },
  { q: "BFS uses which auxiliary data structure?", opts: ["Stack", "Queue", "Heap", "Trie"], a: 1, diff: "Easy", topic: "Graph" },
  { q: "Which trie operation is O(L) where L is word length?", opts: ["Insert only", "Search only", "Insert and search", "None"], a: 2, diff: "Medium", topic: "Trie" },
  { q: "Hash table collisions can be resolved by...", opts: ["Chaining", "Open addressing", "Both", "Neither"], a: 2, diff: "Medium", topic: "Hash Table" },
  { q: "Heap is most commonly implemented as a...", opts: ["Linked list", "Balanced BST", "Array", "Trie"], a: 2, diff: "Medium", topic: "Heap" },
  { q: "Removing the middle of a doubly linked list (with node ref) is...", opts: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], a: 0, diff: "Hard", topic: "Linked List" },
];

function Page() {
  const [i, setI] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = QS[i];
  const pick = (k: number) => {
    if (chosen !== null) return;
    setChosen(k);
    if (k === q.a) setScore((s) => s + 1);
  };
  const next = () => {
    if (i + 1 >= QS.length) { setDone(true); return; }
    setI(i + 1); setChosen(null);
  };
  const reset = () => { setI(0); setChosen(null); setScore(0); setDone(false); };

  return (
    <div>
      <PageHeader kicker="Quiz" title="Test Your DSA Knowledge"
        subtitle="Multiple-choice with instant feedback. Easy → Hard, mixed topics." />

      <Section className="pb-20">
        {!done ? (
          <div className="surface rounded-xl p-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs font-mono uppercase tracking-wider text-cyan">{q.topic} · {q.diff}</div>
              <div className="text-xs font-mono text-muted-foreground">{i + 1} / {QS.length} · Score: {score}</div>
            </div>
            <div className="h-1 bg-secondary rounded-full overflow-hidden mb-6">
              <div className="h-full bg-gradient-to-r from-cyan to-violet transition-all" style={{ width: `${((i) / QS.length) * 100}%` }} />
            </div>
            <h3 className="font-display font-bold text-xl mb-5">{q.q}</h3>
            <div className="space-y-2">
              {q.opts.map((o, k) => {
                const isCorrect = chosen !== null && k === q.a;
                const isWrong = chosen === k && k !== q.a;
                return (
                  <button key={k} onClick={() => pick(k)} disabled={chosen !== null}
                          className={`w-full text-left p-3 rounded-md border flex items-center justify-between transition ${
                            isCorrect ? "border-emerald bg-emerald/10" :
                            isWrong ? "border-rose bg-rose/10" :
                            chosen !== null ? "border-border opacity-50" :
                            "border-border hover:border-cyan hover:bg-cyan/5"
                          }`}>
                    <span>{o}</span>
                    {isCorrect && <Check className="h-4 w-4 text-emerald" />}
                    {isWrong && <X className="h-4 w-4 text-rose" />}
                  </button>
                );
              })}
            </div>
            {chosen !== null && (
              <div className="mt-5 flex justify-end">
                <button onClick={next} className="rounded-md bg-primary text-primary-foreground px-5 py-2 text-sm font-semibold">
                  {i + 1 >= QS.length ? "See results" : "Next question"}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="surface rounded-xl p-8 max-w-2xl mx-auto text-center">
            <div className="text-xs font-mono uppercase tracking-wider text-cyan mb-2">Results</div>
            <h2 className="text-5xl font-display font-bold text-gradient">{score} / {QS.length}</h2>
            <p className="mt-3 text-muted-foreground">
              {score === QS.length ? "Perfect — you crushed it!" :
                score >= QS.length * 0.7 ? "Strong! A few more reps and you're interview-ready." :
                "Keep practicing — review the visualizations and try again."}
            </p>
            <button onClick={reset} className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-5 py-2 text-sm font-semibold">
              <RotateCcw className="h-4 w-4" /> Retry
            </button>
          </div>
        )}
      </Section>
    </div>
  );
}
