import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Map, Boxes, GitBranch, Cpu, Zap, BookOpen, Trophy, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DSA Visualizer — Learn Data Structures & Algorithms Interactively" },
      { name: "description", content: "Interactive animations for arrays, linked lists, trees, graphs, sorting and searching. Perfect for students and interview prep." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div>
      <Hero />
      <Categories />
      <FeatureGrid />
      <RoadmapTeaser />
      <CTA />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden hero-gradient">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-24 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-mono">
            <Sparkles className="h-3 w-3 text-cyan" />
            <span className="text-muted-foreground">v1.0 — Interactive Edition</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="mt-5 text-5xl md:text-6xl font-display font-bold leading-[1.05]"
          >
            See <span className="text-gradient">algorithms</span><br/>
            move. Understand <br /> them <span className="text-gradient">forever.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
            className="mt-6 text-lg text-muted-foreground max-w-xl"
          >
            DSA Visualizer turns abstract Data Structures and Algorithms into intuitive animations you can play, pause, and step through. Built for students, beginners, and interview prep.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                      className="mt-8 flex flex-wrap gap-3">
            <Link to="/data-structures" className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan to-violet px-5 py-3 text-sm font-semibold text-background glow">
              Explore Data Structures <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/algorithms" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-5 py-3 text-sm font-semibold hover:bg-secondary">
              Explore Algorithms
            </Link>
            <Link to="/roadmap" className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-semibold hover:bg-secondary">
              <Map className="h-4 w-4" /> Learning Roadmap
            </Link>
          </motion.div>

          <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
            {[
              { n: "20+", l: "Visualizers" },
              { n: "100+", l: "Quiz Qs" },
              { n: "11", l: "Roadmap Steps" },
            ].map((s) => (
              <div key={s.l} className="surface rounded-lg p-3 text-center">
                <div className="text-2xl font-display font-bold text-gradient">{s.n}</div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
                className="relative aspect-square max-w-lg mx-auto w-full">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan/20 to-violet/20 blur-3xl" />
      <div className="relative surface rounded-3xl p-6 h-full flex flex-col gap-4">
        {/* Animated sort bars */}
        <div className="flex items-end gap-1.5 h-32">
          {[40, 70, 25, 90, 55, 35, 80, 60, 45, 75].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: i * 0.05, duration: 0.6, ease: "easeOut" }}
              className={`flex-1 rounded-t ${i === 3 ? "bg-violet" : i === 6 ? "bg-amber" : "bg-cyan/70"}`}
            />
          ))}
        </div>

        {/* Tree */}
        <svg viewBox="0 0 300 140" className="w-full h-32">
          <g stroke="currentColor" className="text-border" strokeWidth="1.5" fill="none">
            <line x1="150" y1="30" x2="80" y2="80" />
            <line x1="150" y1="30" x2="220" y2="80" />
            <line x1="80" y1="80" x2="50" y2="125" />
            <line x1="80" y1="80" x2="110" y2="125" />
            <line x1="220" y1="80" x2="190" y2="125" />
            <line x1="220" y1="80" x2="250" y2="125" />
          </g>
          {[
            { x: 150, y: 30, v: 8, c: "fill-violet" },
            { x: 80, y: 80, v: 3, c: "fill-cyan" },
            { x: 220, y: 80, v: 10, c: "fill-cyan" },
            { x: 50, y: 125, v: 1, c: "fill-emerald" },
            { x: 110, y: 125, v: 6, c: "fill-emerald" },
            { x: 190, y: 125, v: 9, c: "fill-emerald" },
            { x: 250, y: 125, v: 14, c: "fill-emerald" },
          ].map((n, i) => (
            <motion.g key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.08 }}>
              <circle cx={n.x} cy={n.y} r="14" className={n.c} />
              <text x={n.x} y={n.y + 4} textAnchor="middle" className="fill-background text-[11px] font-bold font-mono">{n.v}</text>
            </motion.g>
          ))}
        </svg>

        {/* Pseudo-code line */}
        <div className="mt-auto rounded-lg bg-background/60 border border-border p-3 font-mono text-xs">
          <div className="text-muted-foreground">// quicksort partition</div>
          <div><span className="text-violet">if</span> arr[j] &lt; <span className="text-amber">pivot</span>: swap(i, j)</div>
        </div>
      </div>
    </motion.div>
  );
}

function Categories() {
  const cats = [
    { to: "/data-structures", icon: Boxes, title: "Data Structures", desc: "Arrays, Linked Lists, Stacks, Queues, Trees, Graphs, Heaps, Tries, Hash Tables.", color: "from-cyan to-cyan/30" },
    { to: "/algorithms", icon: Cpu, title: "Algorithms", desc: "Sorting, Searching, BFS, DFS — fully animated step-by-step.", color: "from-violet to-violet/30" },
    { to: "/roadmap", icon: Map, title: "Learning Roadmap", desc: "11-step interactive timeline from arrays to advanced problem solving.", color: "from-emerald to-emerald/30" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-3 gap-5">
      {cats.map((c, i) => (
        <motion.div key={c.to} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
          <Link to={c.to} className="group surface rounded-2xl p-6 block hover:border-cyan/60 transition h-full">
            <div className={`inline-grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${c.color} mb-4`}>
              <c.icon className="h-6 w-6 text-background" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2">{c.title}</h3>
            <p className="text-sm text-muted-foreground">{c.desc}</p>
            <div className="mt-4 inline-flex items-center gap-1 text-sm text-cyan group-hover:gap-2 transition-all">
              Explore <ArrowRight className="h-4 w-4" />
            </div>
          </Link>
        </motion.div>
      ))}
    </section>
  );
}

function FeatureGrid() {
  const features = [
    { icon: Zap, title: "Animated Operations", desc: "Play, pause, step through insertions, deletions, traversals." },
    { icon: BookOpen, title: "Complexity Cheat Sheet", desc: "Best, average, worst case for every structure & algo." },
    { icon: GitBranch, title: "Linear vs Non-Linear", desc: "Side-by-side comparison with visual diagrams." },
    { icon: Trophy, title: "Quizzes & Interview Prep", desc: "MCQs, common questions, tips, and strategies." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-3xl font-display font-bold mb-8">Everything you need to <span className="text-gradient">learn DSA</span></h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((f) => (
          <div key={f.title} className="surface rounded-xl p-5">
            <f.icon className="h-6 w-6 text-cyan mb-3" />
            <h4 className="font-display font-semibold mb-1">{f.title}</h4>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function RoadmapTeaser() {
  const steps = ["Arrays", "Linked Lists", "Stacks", "Queues", "Priority Queues", "Trees", "Heaps", "Hash Tables", "Graphs", "Algorithms", "Problem Solving"];
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="surface rounded-2xl p-8">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-cyan mb-2">The Path</div>
            <h2 className="text-3xl font-display font-bold">11 steps to DSA mastery</h2>
          </div>
          <Link to="/roadmap" className="inline-flex items-center gap-2 text-sm text-cyan">
            See full roadmap <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {steps.map((s, i) => (
            <div key={s} className="shrink-0 surface rounded-lg px-4 py-3 min-w-[140px]">
              <div className="text-[10px] font-mono text-cyan">STEP {i + 1}</div>
              <div className="text-sm font-semibold">{s}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="relative overflow-hidden rounded-3xl surface p-10 text-center hero-gradient">
        <h2 className="text-3xl md:text-4xl font-display font-bold">Ready to <span className="text-gradient">visualize</span> your way to mastery?</h2>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">Jump into your first visualization and let the animations do the teaching.</p>
        <div className="mt-6 flex justify-center gap-3 flex-wrap">
          <Link to="/data-structures" className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan to-violet px-5 py-3 text-sm font-semibold text-background">
            Start Learning <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/quiz" className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-semibold">
            Take the Quiz
          </Link>
        </div>
      </div>
    </section>
  );
}
