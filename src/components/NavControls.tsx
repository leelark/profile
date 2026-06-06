import { Menu, Moon, Sun, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

type NavLink = {
  href: string;
  label: string;
  current?: boolean;
};

type Props = {
  links: NavLink[];
};

export default function NavControls({ links }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = window.localStorage.getItem("theme");
    const next = saved === "light" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("theme", next);
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-portfolio border border-border bg-surface text-text transition hover:border-accent"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      >
        {theme === "dark" ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
      </button>

      <button
        type="button"
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-portfolio border border-border bg-surface text-text transition hover:border-accent md:hidden"
        onClick={() => setMenuOpen((value) => !value)}
        aria-expanded={menuOpen}
        aria-controls="mobile-nav"
        aria-label="Toggle navigation"
      >
        {menuOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute left-4 right-4 top-[72px] z-50 grid gap-2 rounded-portfolio border border-border bg-surface p-3 shadow-panel md:hidden"
          >
            {links.map((link) => (
              <a
                key={link.href}
                className={`rounded-portfolio px-4 py-3 text-sm font-semibold text-text hover:bg-elevated ${link.current ? "bg-elevated" : ""}`}
                href={link.href}
                aria-current={link.current ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
