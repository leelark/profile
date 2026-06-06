import {
  Activity,
  ArrowUpRight,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  ChevronDown,
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
import { type MouseEvent, useEffect, useMemo, useRef, useState } from "react";

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
  href: string;
  workflowSteps: string[];
  acceleratorHighlights: string[];
  parentProgram?: string;
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
  "client-projects": { icon: BriefcaseBusiness, label: "Enterprise delivery", color: "text-blueSignal", accent: "from-blueSignal/28" },
  plugins: { icon: Plug, label: "Component boundary", color: "text-accent", accent: "from-accent/30" },
  "innovative-projects": { icon: Sparkles, label: "AI product flow", color: "text-verified", accent: "from-verified/24" },
  accelerators: { icon: Workflow, label: "Accelerator pattern", color: "text-caution", accent: "from-caution/24" }
};

const stepIcons = [Database, Workflow, BrainCircuit, GitBranch, Activity, Cpu, FileText, Bot];

const evidenceLabels: Record<string, string> = {
  Confirmed: "Evidence-backed",
  "Partially Confirmed": "Source-backed draft",
  "Needs Confirmation": "Needs confirmation"
};

export default function ProjectExplorer({ projects, categories, showFilters = true, compact = false }: Props) {
  const [active, setActive] = useState("all");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
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
    setDetailOpen(false);
  }

  function handleProjectClick(event: MouseEvent<HTMLAnchorElement>, slug: string) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    openProject(slug, event.currentTarget);
  }

  function closeProject() {
    setSelectedSlug(null);
    setDetailOpen(false);
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
  const detailId = selectedProject ? `project-more-${selectedProject.slug}` : undefined;

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

      <motion.div layout className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" aria-live="polite">
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
                transition={{ duration: reduceMotion ? 0 : 0.18, delay: compact ? 0 : Math.min(index * 0.016, 0.1) }}
                className="project-card group"
                onClick={(event) => handleProjectClick(event, project.slug)}
                aria-label={`Open details for ${project.title}`}
              >
                <span className={`project-card-visual bg-gradient-to-br ${visual.accent} to-transparent`} aria-hidden="true">
                  <span className="project-card-visual-row">
                    {project.workflowSteps.slice(0, 4).map((step, stepIndex) => {
                      const StepIcon = stepIcons[stepIndex % stepIcons.length];
                      return (
                        <span className="project-card-node" key={step}>
                          <StepIcon size={14} />
                        </span>
                      );
                    })}
                  </span>
                  <span className="project-card-line" />
                </span>

                <span className="flex items-start justify-between gap-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-portfolio border border-border bg-elevated/78">
                    <Icon className={visual.color} size={21} aria-hidden="true" />
                  </span>
                  <span className="rounded-full border border-border bg-surface/70 px-3 py-1 text-xs font-bold uppercase text-muted">
                    {project.category}
                  </span>
                </span>

                <span className="mt-5 block text-xl font-semibold leading-snug text-text">{project.title}</span>
                <span className="mt-3 block text-sm font-semibold text-accent">{project.role}</span>
                {project.parentProgram && <span className="mt-2 block text-xs font-bold uppercase text-blueSignal">Linked to {project.parentProgram}</span>}
                <span className="mt-4 block text-sm leading-7 text-muted">{project.heroExcerpt}</span>

                <span className="mt-auto block pt-6">
                  <span className="mb-5 flex flex-wrap gap-2">
                    <span className="chip text-[0.72rem]">{evidenceLabels[project.evidenceStatus] ?? project.evidenceStatus}</span>
                    {project.tags.slice(0, 2).map((tag) => (
                      <span className="chip text-[0.72rem]" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </span>
                  <span className="project-card-action">
                    <span>View detail</span>
                    <ArrowUpRight size={16} aria-hidden="true" />
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-canvas/90 p-3 backdrop-blur-sm md:p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.16 }}
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
              initial={{ opacity: 0, y: reduceMotion ? 0 : 12, scale: reduceMotion ? 1 : 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : 12, scale: reduceMotion ? 1 : 0.985 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
            >
              <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-border bg-surface/96 p-5 backdrop-blur md:p-6">
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

              <div className="grid gap-6 p-5 lg:grid-cols-[0.95fr_1.05fr] md:p-6">
                <div className="grid gap-5">
                  <WorkflowMap project={selectedProject} reduceMotion={Boolean(reduceMotion)} />
                  <div className="purple-frame rounded-portfolio p-5">
                    <div className="flex items-center gap-3">
                      <Layers3 className="text-accent" size={22} aria-hidden="true" />
                      <p className="text-xs font-bold uppercase text-muted">Architecture snapshot</p>
                    </div>
                    <p className="mt-4 text-base leading-7 text-text">{selectedProject.heroSummary || selectedProject.heroExcerpt}</p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <MetaBlock label="Domain" value={selectedProject.domain} />
                      <MetaBlock label="Evidence" value={evidenceLabels[selectedProject.evidenceStatus] ?? selectedProject.evidenceStatus} />
                    </div>
                  </div>
                </div>

                <div className="grid content-start gap-5">
                  <DetailBlock title="Problem" text={selectedProject.problem || selectedProject.heroExcerpt} />
                  <DetailBlock title="Solution" text={selectedProject.solution || selectedProject.architecture} />
                  <button
                    type="button"
                    className="detail-disclosure"
                    aria-expanded={detailOpen}
                    aria-controls={detailId}
                    onClick={() => setDetailOpen((value) => !value)}
                  >
                    <span>View more detail</span>
                    <ChevronDown className={`transition ${detailOpen ? "rotate-180" : ""}`} size={18} aria-hidden="true" />
                  </button>

                  <AnimatePresence initial={false}>
                    {detailOpen && (
                      <motion.div
                        id={detailId}
                        className="grid gap-5 overflow-hidden rounded-portfolio border border-border bg-elevated/48 p-5"
                        initial={{ opacity: 0, y: reduceMotion ? 0 : -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: reduceMotion ? 0 : -4 }}
                        transition={{ duration: reduceMotion ? 0 : 0.18 }}
                      >
                        <ListBlock title="Key Features" items={selectedProject.keyFeatures} />
                        <ListBlock title="Business Value" items={selectedProject.businessValue} />
                        {selectedProject.acceleratorHighlights.length > 0 && (
                          <ListBlock title="Accelerator suite grouped here" items={selectedProject.acceleratorHighlights} />
                        )}
                        {selectedProject.parentProgram && <DetailBlock title="Program Link" text={`This workstream is part of the ${selectedProject.parentProgram} accelerator suite.`} />}
                        <div>
                          <p className="text-xs font-bold uppercase text-muted">Technology and Appian capabilities</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {selectedProject.technologies.slice(0, 8).map((item) => (
                              <span className="chip" key={item}>{item}</span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="modal-footer">
                <p className="text-sm leading-6 text-muted">Open the full case study for canonical routing, deeper sections, and direct sharing.</p>
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

function WorkflowMap({ project, reduceMotion }: { project: ProjectCardData; reduceMotion: boolean }) {
  const visual = categoryVisuals[project.categorySlug] ?? categoryVisuals["client-projects"];
  const Icon = visual.icon;
  const steps = project.workflowSteps.length > 0 ? project.workflowSteps : ["Requirement", "Design", "Build", "Review", "Optimize"];

  return (
    <div className={`workflow-map workflow-map-${project.categorySlug}`} aria-label={`${project.title} workflow diagram`}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-portfolio border border-border bg-surface/80">
            <Icon className={visual.color} size={21} aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-bold uppercase text-muted">{visual.label}</p>
            <p className="mt-1 text-sm font-semibold text-text">{project.domain}</p>
          </div>
        </div>
        <span className="rounded-full border border-border bg-surface/72 px-3 py-1 text-xs font-bold uppercase text-muted">
          {steps.length} stages
        </span>
      </div>
      <div className="workflow-stage-grid mt-6">
        {steps.map((step, index) => {
          const StepIcon = stepIcons[index % stepIcons.length];
          return (
            <motion.div
              className="workflow-stage"
              key={`${project.slug}-${step}`}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.18, delay: reduceMotion ? 0 : index * 0.035 }}
            >
              <span className="workflow-stage-icon">
                <StepIcon size={15} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[0.68rem] font-bold uppercase text-muted">0{index + 1}</span>
                <span className="mt-1 block text-sm font-semibold leading-snug text-text">{step}</span>
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
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
        {items.slice(0, 6).map((item) => (
          <li className="flex gap-2" key={item}>
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
