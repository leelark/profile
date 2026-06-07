import {
  Activity,
  ArrowUpRight,
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
import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent } from "react";

type ProjectCardData = {
  sourceSlug: string;
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
  accelerators: { icon: Workflow, label: "Appian Accelerate", color: "text-caution", accent: "project-accent-amber" }
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

  function handleCardKey(event: ReactKeyboardEvent<HTMLElement>, slug: string) {
    if (event.key !== "Enter" && event.key !== " ") return;
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

    function handleKeyDown(event: globalThis.KeyboardEvent) {
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
                aria-label={`${category.label} work filter`}
                className={`work-filter-button ${selected ? "work-filter-button-active" : ""}`}
                onClick={() => setActive(category.slug)}
              >
                <span>{category.label}</span>
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
              <motion.article
                layout={!reduceMotion}
                key={project.slug}
                initial={false}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.14, delay: compact ? 0 : Math.min(index * 0.01, 0.06) }}
                className={`project-card group ${visual.accent}`}
                role="button"
                tabIndex={0}
                onClick={(event) => openProject(project.slug, event.currentTarget)}
                onKeyDown={(event) => handleCardKey(event, project.slug)}
                aria-label={`Open portfolio snapshot for ${project.title}`}
              >
                <div className="project-card-top">
                  <span className="domain-marker">
                    <Icon className={visual.color} size={21} aria-hidden="true" />
                    <span>{compactText(project.domain, 44)}</span>
                  </span>
                  <span className="project-category-mark">{visual.label}</span>
                </div>

                <h3 className="mt-6 text-xl font-semibold leading-snug text-text">{project.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{compactText(project.heroExcerpt, compact ? 148 : 190)}</p>

                <div className="project-flow-mini" aria-label={`${project.title} delivery flow`}>
                  {project.workflowSteps.slice(0, 4).map((step) => (
                    <span key={`${project.slug}-${step}`}>
                      <i aria-hidden="true" />
                      <b>{step}</b>
                    </span>
                  ))}
                </div>

                <div className="project-card-action">
                  <span>{evidenceLabels[project.evidenceStatus] ?? project.evidenceStatus}</span>
                  <button
                    type="button"
                    className="project-detail-button"
                    onClick={(event) => {
                      event.stopPropagation();
                      openProject(project.slug, event.currentTarget);
                    }}
                  >
                    View Details
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </button>
                </div>
              </motion.article>
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
                    {selectedProject.category} / {selectedProject.domain}
                  </p>
                  <h2 id={`project-dialog-${selectedProject.slug}`} className="mt-2 text-2xl font-semibold leading-tight text-text md:text-3xl">
                    {selectedProject.title}
                  </h2>
                  <p className="mt-2 text-sm font-semibold text-muted">{evidenceLabels[selectedProject.evidenceStatus] ?? selectedProject.evidenceStatus}</p>
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
                <ProjectMap project={selectedProject} />
                {selectedProject.sourceSlug === "appian-accelerate-program" ? (
                  <AccelerateProgramView project={selectedProject} />
                ) : (
                  <ProjectReadout project={selectedProject} />
                )}
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

function ProjectReadout({ project }: { project: ProjectCardData }) {
  return (
    <div className="project-detail-stack">
      <div className="modal-summary-panel">
        <div className="flex items-center gap-3">
          <Layers3 className="text-accent" size={22} aria-hidden="true" />
          <p className="text-xs font-bold uppercase text-muted">Architect view</p>
        </div>
        <p className="mt-4 text-base leading-7 text-text">{compactText(project.heroSummary || project.heroExcerpt, 360)}</p>
      </div>

      <div className="project-readout-grid">
        <DetailBlock title="Problem" text={project.problem || project.heroExcerpt} />
        <DetailBlock title="Solution" text={project.solution || project.heroSummary} />
        <DetailBlock title="Architecture" text={project.architecture} />
      </div>

      <div className="project-visual-panels">
        <ListBlock title="Highlights" items={project.keyFeatures} />
        <ListBlock title="Business value" items={project.businessValue} />
      </div>

      <div>
        <p className="text-xs font-bold uppercase text-muted">Technology and Appian capabilities</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.technologies.slice(0, 7).map((item) => (
            <span className="chip" key={item}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function AccelerateProgramView({ project }: { project: ProjectCardData }) {
  const contributionCards = [
    { title: "Server Side Metrics Evaluation", copy: "Performance and capacity signals translated into an architect review path.", icon: Activity },
    { title: "Log Streaming", copy: "Operational telemetry framed for observability, triage, and platform stewardship.", icon: Cable },
    { title: "Import / Export Formatted Excel", copy: "Excel movement patterns shaped for controlled Appian workflow usage.", icon: FileText },
    { title: "Accelerator Workstreams", copy: "Governance, AI readiness, deployment, integration, and UX patterns grouped under Appian Accelerate.", icon: Workflow }
  ];

  return (
    <div className="project-detail-stack accelerate-program-view">
      <section className="modal-summary-panel">
        <div className="flex items-center gap-3">
          <Workflow className="text-caution" size={22} aria-hidden="true" />
          <p className="text-xs font-bold uppercase text-muted">What is Appian Accelerate Program</p>
        </div>
        <p className="mt-4 text-base leading-7 text-text">
          A focused Appian program for turning recurring client platform, governance, automation, and enablement needs into structured
          architect-led workstreams.
        </p>
      </section>

      <section>
        <p className="text-xs font-bold uppercase text-muted">Solution Architect Contributions</p>
        <div className="accelerate-contribution-grid mt-4">
          {contributionCards.map((item) => {
            const Icon = item.icon;
            return (
              <article className="accelerate-contribution-card" key={item.title}>
                <span aria-hidden="true">
                  <Icon size={18} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="accelerate-workstream-river" aria-label="Appian Accelerate Program workstreams">
        {project.acceleratorHighlights.slice(0, 12).map((item, index) => (
          <span key={item} style={{ "--step": index } as CSSProperties}>
            {item}
          </span>
        ))}
      </section>
    </div>
  );
}

function DetailBlock({ title, text }: { title: string; text: string }) {
  if (!text) return null;
  return (
    <section className="detail-block">
      <h3>{title}</h3>
      <p>{compactText(text, 260)}</p>
    </section>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <section className="detail-block">
      <h3>{title}</h3>
      <ul className="detail-list">
        {items.slice(0, 4).map((item) => (
          <li key={item}>
            <span aria-hidden="true" />
            <p>{compactText(item, 130)}</p>
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
