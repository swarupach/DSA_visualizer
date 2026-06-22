import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Binary, Search, Moon, Sun } from "lucide-react";
import { useEffect } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/data-structures", label: "Data Structures" },
  { to: "/algorithms", label: "Algorithms" },
  { to: "/comparison", label: "Linear vs Non-Linear" },
  { to: "/complexity", label: "Complexity" },
  { to: "/roadmap", label: "Roadmap" },
  { to: "/interview", label: "Interview" },
  { to: "/quiz", label: "Quiz" },
  { to: "/glossary", label: "Glossary" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.remove("light");
    else root.classList.add("light");
  }, [dark]);

  return (
    <header className="sticky top-0 z-50 surface border-b border-border/60">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-cyan to-violet glow">
              <Binary className="h-5 w-5 text-background" />
            </span>
            <span className="text-gradient">DSA Visualizer</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="px-3 py-1.5 text-sm rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                activeProps={{ className: "px-3 py-1.5 text-sm rounded-md text-foreground bg-secondary" }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link to="/search" className="hidden sm:grid h-9 w-9 place-items-center rounded-md border border-border hover:bg-secondary" aria-label="Search">
              <Search className="h-4 w-4" />
            </Link>
            <button
              onClick={() => setDark((d) => !d)}
              className="grid h-9 w-9 place-items-center rounded-md border border-border hover:bg-secondary"
              aria-label="Toggle theme"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setOpen((o) => !o)}
              className="lg:hidden grid h-9 w-9 place-items-center rounded-md border border-border"
              aria-label="Menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden pb-4 flex flex-col gap-1 animate-in fade-in">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-secondary"
                activeProps={{ className: "px-3 py-2 rounded-md text-sm bg-secondary text-foreground" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
