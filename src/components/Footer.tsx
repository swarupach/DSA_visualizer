import { Link } from "@tanstack/react-router";
import { Binary, Github, Twitter, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-card/40 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 font-display font-bold text-lg">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-cyan to-violet">
              <Binary className="h-5 w-5 text-background" />
            </span>
            <span className="text-gradient">DSA Visualizer</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Interactive visualizations for students, beginners, and interview prep. Learn DSA by seeing it move.
          </p>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-3">Learn</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/data-structures" className="hover:text-foreground">Data Structures</Link></li>
            <li><Link to="/algorithms" className="hover:text-foreground">Algorithms</Link></li>
            <li><Link to="/roadmap" className="hover:text-foreground">Roadmap</Link></li>
            <li><Link to="/complexity" className="hover:text-foreground">Complexity Cheat Sheet</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-3">Practice</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/quiz" className="hover:text-foreground">DSA Quiz</Link></li>
            <li><Link to="/interview" className="hover:text-foreground">Interview Prep</Link></li>
            <li><Link to="/glossary" className="hover:text-foreground">Glossary</Link></li>
            <li><Link to="/comparison" className="hover:text-foreground">Linear vs Non-Linear</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-3">Connect</h4>
          <div className="flex gap-2">
            {[Github, Twitter, Linkedin, Mail].map((Icon, i) => (
              <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-md border border-border hover:bg-secondary">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">hello@dsavisualizer.dev</p>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} DSA Visualizer · Built for learners everywhere
      </div>
    </footer>
  );
}
