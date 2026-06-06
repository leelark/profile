import { ArrowUpRight, BriefcaseBusiness, Layers3, Plug, Sparkles, Workflow, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { type MouseEvent, useEffect, useMemo, useRef, useState } from "react";

type ProjectCardData = {
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  heroExcerpt: string;
  heroSummary: string;
  role: string;
  domain: string;
  tags: string[];
  href: string;
  keyFeatures: string[];
  businessValue: string[];
  technologies: string[];
  problem: string;
  solution: string;
  architecture: string;
};

type Category = {
  slug: string;
  label: string;
};

type Props = {
  projects: ProjectCardData[];
  categories: Category[];
  showFilters?: boolean;
  compact?: boolean;
};

const categoryVisuals: Record<string, { icon: typeof BriefcaseBusiness; label: string; color: string }> = {
  "client-projects": { icon: BriefcaseBusiness, label: "Client architecture", color: "text-blueSignal" },
  plugins: { icon: Plug, label: "Component innovation", color: "text-accent" },
  "innovative-projects": { icon: Sparkles, label: "AI product thinking", color: "text-verified" },
  accelerators: { icon: Workflow, label: "Reusable accelerator", color: "text-caution" }
};

export default function ProjectExplorer({ projects, categories, showFilters = true, compact = false }: Props) {
  const [active, setActive] = useState("all");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  const filtered = useMemo(
    () => (active === "all" ? projects : projects.filter((project) => project.categorySlug === active)),
    [active, projects]
  );
  const selectedProject = useMemo(
    () => projects.find((project) => project.slug === selectedSlug) ?? null,
    [projects, selectedSlug]
  );

  function openProject(slug: string, trigger?: HTMLElement) {
    lastFocusRef.current = trigger ?? (document.activeElement as HTMLElement | null);
    setSelectedSlug(slug);
  }

  function handleProjectClick(event: MouseEvent<HTMLAnchorElement>, slug: string) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    openProject(slug, event.currentTarget);
  }

  function closeProject() {
    setSelectedSlug(null);
    window.setTimeout(() => lastFocusRef.current?.focus(), 0);
  }

  useEffect(() => {
    if (!selectedProject) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeProject();
      }

      if (event.key !== "Tab" || !modalRef.current) return;

      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  const tabs = [{ slug: "all", label: "All Work" }, ...categories];

  return (
    <div className="space-y-7">
      {showFilters && (
        <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Work filters">
          {tabs.map((category) => {
            const selected = active === category.slug;
            return (
              <button
                key={category.slug}
                id={`project-tab-${category.slug}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="project-results"
                className={`relative min-h-11 overflow-hidden rounded-portfolio border px-4 text-sm font-bold transition ${
                  selected ? "border-accent text-white" : "border-border bg-surface/72 text-muted hover:border-accent hover:text-text"
                }`}
                onClick={() => setActive(category.slug)}
              >
                {selected && (
                  <motion.span
                    layoutId="active-project-filter"
                    className="absolute inset-0 bg-gradient-to-r from-[#341539] via-[#5b1c71] to-[#6f277e]"
                    transition={{ duration: reduceMotion ? 0 : 0.2 }}
                  />
                )}
                <span className="relative">{category.label}</span>
              </button>
            );
          })}
        </div>
      )}

      <motion.div
        id="project-results"
        role={showFilters ? "tabpanel" : undefined}
        aria-labelledby={showFilters ? `project-tab-${active}` : undefined}
        layout
        className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => {
            const visual = categoryVisuals[project.categorySlug] ?? categoryVisuals["client-projects"];
            const Icon = visual.icon;
            return (
              <motion.a
                layout
                key={project.slug}
                href={project.href}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : 4 }}
                transition={{ duration: reduceMotion ? 0 : 0.18, delay: compact ? 0 : Math.min(index * 0.018, 0.12) }}
                className="group flex min-h-[300px] flex-col justify-between rounded-portfolio border border-border bg-surface/78 p-5 text-left shadow-panel transition hover:-translate-y-1 hover:border-accent/60 hover:bg-elevated/82 md:p-6"
                onClick={(event) => handleProjectClick(event, project.slug)}
                aria-label={`Open details for ${project.title}`}
              >
                <span>
                  <span className="mb-5 flex items-start justify-between gap-4">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-portfolio border border-border bg-accentSoft">
                      <Icon className={visual.color} size={22} aria-hidden="true" />
                    </span>
                    <span className="rounded-full border border-accent/35 bg-accentSoft px-3 py-1 text-xs font-bold uppercase text-muted">
                      {project.category}
                    </span>
                  </span>
                  <span className="block text-xl font-semibold leading-snug text-text">{project.title}</span>
                  <span className="mt-3 block text-sm font-semibold text-accent">{project.role}</span>
                  <span className="mt-4 block text-sm leading-7 text-muted">{project.heroExcerpt}</span>
                </span>

                <span className="mt-6 block">
                  <span className="mb-5 flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span className="chip text-[0.72rem]" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </span>
                  <span className="flex items-center justify-between gap-4 border-t border-border pt-5">
                    <span className="text-sm font-bold text-text transition group-hover:text-accent">View detail</span>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-portfolio border border-border bg-accentSoft text-text transition group-hover:border-accent">
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </span>
                  </span>
                </span>
              </motion.a>
            );
          })}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-canvas/90 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.16 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeProject();
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                event.preventDefault();
                closeProject();
              }
            }}
          >
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`project-dialog-${selectedProject.slug}`}
              className="max-h-[86vh] w-[min(100%-24px,960px)] overflow-y-auto rounded-portfolio border border-border bg-surface shadow-panel"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 12, scale: reduceMotion ? 1 : 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : 12, scale: reduceMotion ? 1 : 0.98 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
            >
              <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-border bg-surface/94 p-5 backdrop-blur md:p-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-accent">{selectedProject.category}</p>
                  <h2 id={`project-dialog-${selectedProject.slug}`} className="mt-2 text-2xl font-semibold leading-tight text-text md:text-3xl">
                    {selectedProject.title}
                  </h2>
                  <p className="mt-2 text-sm font-semibold text-muted">{selectedProject.role}</p>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-portfolio border border-border bg-elevated text-text hover:border-accent"
                  onClick={closeProject}
                  aria-label="Close project detail"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>

              <div className="grid gap-6 p-5 md:grid-cols-[0.9fr_1.1fr] md:p-6">
                <div className="purple-frame rounded-portfolio p-5">
                  <div className="flex items-center gap-3">
                    <Layers3 className="text-accent" size={24} aria-hidden="true" />
                    <p className="text-xs font-bold uppercase text-muted">Architecture snapshot</p>
                  </div>
                  <p className="mt-4 text-base leading-7 text-text">{selectedProject.heroSummary || selectedProject.heroExcerpt}</p>
                  <div className="mt-5 grid gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase text-muted">Domain</p>
                      <p className="mt-1 text-sm font-semibold text-text">{selectedProject.domain}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-muted">Focus</p>
                      <p className="mt-1 text-sm font-semibold text-text">{selectedProject.tags.slice(0, 3).join(" / ")}</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-5">
                  <DetailBlock title="Problem" text={selectedProject.problem || selectedProject.heroExcerpt} />
                  <DetailBlock title="Solution" text={selectedProject.solution || selectedProject.architecture} />
                  <ListBlock title="Key Features" items={selectedProject.keyFeatures} />
                  <ListBlock title="Business Value" items={selectedProject.businessValue} />
                  <div>
                    <p className="text-xs font-bold uppercase text-muted">Technology and Appian capabilities</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedProject.technologies.slice(0, 8).map((item) => (
                        <span className="chip" key={item}>{item}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-border p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
                <p className="text-sm text-muted">Full case-study page remains available for direct sharing and SEO.</p>
                <a className="quiet-button" href={selectedProject.href}>
                  Open full case study
                  <ArrowUpRight className="ml-2" size={16} aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DetailBlock({ title, text }: { title: string; text: string }) {
  if (!text) return null;
  return (
    <div>
      <p className="text-xs font-bold uppercase text-muted">{title}</p>
      <p className="mt-2 text-sm leading-7 text-muted">{text}</p>
    </div>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div>
      <p className="text-xs font-bold uppercase text-muted">{title}</p>
      <ul className="mt-2 grid gap-2 text-sm leading-6 text-muted">
        {items.slice(0, 4).map((item) => (
          <li className="flex gap-2" key={item}>
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
