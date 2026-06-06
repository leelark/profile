import {
  Activity,
  BadgeCheck,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Cable,
  Cpu,
  Database,
  FileText,
  GitBranch,
  Layers3,
  Plug,
  Sparkles,
  Workflow,
  X
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

type ProjectCardData = {
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  evidenceStatus: string;
  heroExcerpt: string;
  heroSummary: string;
  role: string;
  domain: string;
  tags: string[];
  workflowSteps: string[];
  acceleratorHighlights: string[];
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

const categoryVisuals: Record<string, { icon: typeof BriefcaseBusiness; label: string; color: string; accent: string }> = {
  "client-projects": { icon: BriefcaseBusiness, label: "Enterprise delivery", color: "text-blueSignal", accent: "project-accent-blue" },
  plugins: { icon: Plug, label: "Plugin extension", color: "text-accent", accent: "project-accent-purple" },
  "innovative-projects": { icon: Sparkles, label: "Product concept", color: "text-verified", accent: "project-accent-green" },
  accelerators: { icon: Workflow, label: "Reusable pattern", color: "text-caution", accent: "project-accent-amber" }
};

const mapIcons = [Database, Workflow, Layers3, BadgeCheck];
const focusIcons = [Database, Workflow, BrainCircuit, GitBranch, Activity, Cpu, FileText, Bot, Cable];

const evidenceLabels: Record<string, string> = {
  Confirmed: "Evidence-backed",
  "Partially Confirmed": "Source-backed draft",
  "Needs Confirmation": "Needs confirmation"
};

export default function ProjectExplorer({ projects, categories, showFilters = true, compact = false }: Props) {
  const [active, setActive] = useState("all");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  const counts = useMemo(() => {
    const next: Record<string, number> = { all: projects.length };
    projects.forEach((project) => {
      next[project.categorySlug] = (next[project.categorySlug] ?? 0) + 1;
    });
    return next;
  }, [projects]);

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

  const filters = [{ slug: "all", label: "All Work" }, ...categories];

  return (
    <div className="space-y-7">
      {showFilters && (
        <div className="work-filter-bar" role="group" aria-label="Filter work by category">
          {filters.map((category) => {
            const selected = active === category.slug;
            return (
              <button
                key={category.slug}
                type="button"
                aria-pressed={selected}
                className={`work-filter-button ${selected ? "work-filter-button-active" : ""}`}
                onClick={() => setActive(category.slug)}
              >
                <span>{category.label}</span>
                <span className="work-filter-count">{counts[category.slug] ?? 0}</span>
              </button>
            );
          })}
        </div>
      )}

      <motion.div layout={!reduceMotion} className={`project-grid ${compact ? "project-grid-compact" : ""}`} aria-live="polite">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => {
            const visual = categoryVisuals[project.categorySlug] ?? categoryVisuals["client-projects"];
            const Icon = visual.icon;
            return (
              <motion.button
                layout={!reduceMotion}
                key={project.slug}
                type="button"
                initial={false}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.14, delay: compact ? 0 : Math.min(index * 0.01, 0.06) }}
                className={`project-card group ${visual.accent}`}
                onClick={(event) => openProject(project.slug, event.currentTarget)}
                aria-label={`Open portfolio snapshot for ${project.title}`}
              >
                <span className="project-card-top">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-portfolio border border-border bg-elevated/78">
                    <Icon className={visual.color} size={21} aria-hidden="true" />
                  </span>
                  <span className="project-card-category">{project.category}</span>
                </span>

                <span className="mt-5 block text-xl font-semibold leading-snug text-text">{project.title}</span>
                <span className="mt-3 block text-sm leading-7 text-muted">{project.heroExcerpt}</span>

                <span className="mt-5 grid gap-2 text-left sm:grid-cols-2">
                  <MetaPill label="Role" value={project.role} />
                  <MetaPill label="Domain" value={project.domain} />
                </span>

                <span className="mt-auto block pt-5">
                  <span className="mb-5 flex flex-wrap gap-2">
                    <span className="chip text-[0.72rem]">{evidenceLabels[project.evidenceStatus] ?? project.evidenceStatus}</span>
                    {project.tags.slice(0, 2).map((tag) => (
                      <span className="chip text-[0.72rem]" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </span>
                  <span className="project-card-action">
                    <span>Project snapshot</span>
                    <Layers3 size={16} aria-hidden="true" />
                  </span>
                </span>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-canvas/90 p-3 backdrop-blur-sm md:p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.14 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeProject();
            }}
          >
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`project-dialog-${selectedProject.slug}`}
              className="project-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.16 }}
            >
              <div className="project-modal-header">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-accent">
                    {selectedProject.category} / {evidenceLabels[selectedProject.evidenceStatus] ?? selectedProject.evidenceStatus}
                  </p>
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
                  aria-label="Close project snapshot"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>

              <div className="project-modal-body">
                <div className="grid gap-5">
                  <ProjectMap project={selectedProject} />
                  <div className="modal-summary-panel">
                    <div className="flex items-center gap-3">
                      <Layers3 className="text-accent" size={22} aria-hidden="true" />
                      <p className="text-xs font-bold uppercase text-muted">Portfolio context</p>
                    </div>
                    <p className="mt-4 text-base leading-7 text-text">{selectedProject.heroSummary || selectedProject.heroExcerpt}</p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <MetaBlock label="Domain" value={selectedProject.domain} />
                      <MetaBlock label="Evidence" value={evidenceLabels[selectedProject.evidenceStatus] ?? selectedProject.evidenceStatus} />
                    </div>
                  </div>
                </div>

                <div className="project-detail-stack">
                  <DetailBlock title="Problem" text={selectedProject.problem || selectedProject.heroExcerpt} />
                  <DetailBlock title="Solution" text={selectedProject.solution || selectedProject.heroSummary} />
                  <DetailBlock title="Architecture" text={selectedProject.architecture} />
                  <ListBlock title="Key features" items={selectedProject.keyFeatures} />
                  <ListBlock title="Business value" items={selectedProject.businessValue} />
                  {selectedProject.acceleratorHighlights.length > 0 && (
                    <ListBlock title="Accelerator capability groups" items={selectedProject.acceleratorHighlights} />
                  )}
                  <div>
                    <p className="text-xs font-bold uppercase text-muted">Technology and Appian capabilities</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedProject.technologies.slice(0, 10).map((item) => (
                        <span className="chip" key={item}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectMap({ project }: { project: ProjectCardData }) {
  const visual = categoryVisuals[project.categorySlug] ?? categoryVisuals["client-projects"];
  const Icon = visual.icon;
  const mapItems = [
    { label: "Need", text: project.problem || project.heroExcerpt },
    { label: "Solution", text: project.solution || project.heroSummary },
    { label: "Platform", text: project.architecture || project.technologies.slice(0, 3).join(", ") },
    { label: "Value", text: project.businessValue[0] || project.heroExcerpt }
  ];
  const focusItems = project.workflowSteps.length > 0 ? project.workflowSteps : project.tags.slice(0, 5);

  return (
    <div className={`project-map ${visual.accent}`} aria-label={`${project.title} portfolio map`}>
      <div className="project-map-head">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-portfolio border border-border bg-surface/80">
            <Icon className={visual.color} size={21} aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-bold uppercase text-muted">{visual.label}</p>
            <p className="mt-1 text-sm font-semibold text-text">{project.domain}</p>
          </div>
        </div>
      </div>
      <div className="project-map-grid">
        {mapItems.map((item, index) => {
          const MapIcon = mapIcons[index % mapIcons.length];
          return (
            <div className="project-map-node" key={item.label}>
              <span className="project-map-icon" aria-hidden="true">
                <MapIcon size={16} />
              </span>
              <span>
                <span className="block text-[0.68rem] font-bold uppercase text-muted">{item.label}</span>
                <span className="mt-1 block text-sm font-semibold leading-snug text-text">{compactText(item.text, 82)}</span>
              </span>
            </div>
          );
        })}
      </div>
      <div className="project-focus-strip">
        {focusItems.slice(0, 6).map((item, index) => {
          const FocusIcon = focusIcons[index % focusIcons.length];
          return (
            <span className="project-focus-pill" key={`${project.slug}-${item}`}>
              <FocusIcon size={14} aria-hidden="true" />
              <span>{item}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

function MetaPill({ label, value }: { label: string; value: string }) {
  return (
    <span className="project-meta-pill">
      <span>{label}</span>
      <strong>{value}</strong>
    </span>
  );
}

function MetaBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase text-muted">{label}</p>
      <p className="mt-1 text-sm font-semibold text-text">{value}</p>
    </div>
  );
}

function DetailBlock({ title, text }: { title: string; text: string }) {
  if (!text) return null;
  return (
    <section className="detail-block">
      <h3>{title}</h3>
      <p>{text}</p>
    </section>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <section className="detail-block">
      <h3>{title}</h3>
      <ul className="detail-list">
        {items.slice(0, 7).map((item) => (
          <li key={item}>
            <span aria-hidden="true" />
            <p>{item}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function compactText(text: string, max = 92) {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= max) return normalized;
  const sliced = normalized.slice(0, max - 1);
  const boundary = sliced.lastIndexOf(" ");
  return `${sliced.slice(0, boundary > 42 ? boundary : max - 1)}...`;
}
