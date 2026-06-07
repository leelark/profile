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
  Plug,
  Sparkles,
  Workflow,
  X
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";

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
  "client-projects": { icon: BriefcaseBusiness, label: "Client delivery", color: "text-blueSignal", accent: "project-accent-blue" },
  plugins: { icon: Plug, label: "Plugin build", color: "text-accent", accent: "project-accent-purple" },
  "innovative-projects": { icon: Sparkles, label: "Innovation POC", color: "text-verified", accent: "project-accent-green" },
  accelerators: { icon: Workflow, label: "Accelerator", color: "text-caution", accent: "project-accent-amber" }
};

const focusIcons = [Database, Workflow, BrainCircuit, GitBranch, Activity, Cpu, FileText, Bot, Cable];

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
                </div>

                <div className="project-card-mark" aria-hidden="true">
                  <Icon className={visual.color} size={30} />
                </div>
                <h3 className="mt-6 text-xl font-semibold leading-snug text-text">{project.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{compactText(project.heroExcerpt || project.heroSummary, compact ? 128 : 158)}</p>

                <div className="project-card-meta" aria-label={`${project.title} quick details`}>
                  <span>
                    <small>Role</small>
                    <strong>{compactText(project.role, 54)}</strong>
                  </span>
                  <span>
                    <small>Focus</small>
                    <strong>{compactText(project.tags[0] ?? project.category, 42)}</strong>
                  </span>
                </div>

                <div className="project-card-action">
                  <span className="project-card-type">
                    <Icon className={visual.color} size={15} aria-hidden="true" />
                    <span>{visual.label}</span>
                  </span>
                  <button
                    type="button"
                    className="project-detail-button"
                    onClick={(event) => {
                      event.stopPropagation();
                      openProject(project.slug, event.currentTarget);
                    }}
                  >
                    View work
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
          (() => {
            const visual = categoryVisuals[selectedProject.categorySlug] ?? categoryVisuals["client-projects"];
            const Icon = visual.icon;

            return (
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
                  <div className="project-modal-kicker">
                    <span aria-hidden="true">
                      <Icon className={visual.color} size={16} />
                    </span>
                    <p>{visual.label} / {selectedProject.domain}</p>
                  </div>
                  <h2 id={`project-dialog-${selectedProject.slug}`} className="mt-2 text-2xl font-semibold leading-tight text-text md:text-3xl">
                    {selectedProject.title}
                  </h2>
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
                <ProjectReadout project={selectedProject} />
              </div>
            </motion.div>
          </motion.div>
            );
          })()
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectReadout({ project }: { project: ProjectCardData }) {
  const visual = categoryVisuals[project.categorySlug] ?? categoryVisuals["client-projects"];
  const Icon = visual.icon;
  const functionality =
    project.sourceSlug === "appian-accelerate-program" && project.acceleratorHighlights.length > 0
      ? project.acceleratorHighlights
      : project.keyFeatures.length > 0
        ? project.keyFeatures
        : project.workflowSteps;
  const impact = project.businessValue.length > 0 ? project.businessValue : [project.heroSummary || project.heroExcerpt];
  const tech = project.technologies.length > 0 ? project.technologies : project.tags;

  return (
    <div className="project-case-layout">
      <section className={`project-case-overview ${visual.accent}`}>
        <span className="project-case-icon" aria-hidden="true">
          <Icon className={visual.color} size={24} />
        </span>
        <div>
          <p className="project-case-eyebrow">Overall</p>
          <h3>{compactText(project.title, 74)}</h3>
          <p>{compactText(project.heroSummary || project.heroExcerpt, 280)}</p>
        </div>
      </section>

      <div className="project-case-grid">
        <CaseTextBlock icon={Database} label="Use case" title="What it was for" text={project.problem || project.heroExcerpt} />
        <CaseTextBlock icon={GitBranch} label="My work" title="Designed and delivered" text={workedOnText(project)} />
        <CaseListBlock icon={Sparkles} label="Implemented" title="Key functionality" items={functionality} />
        <CaseListBlock icon={BadgeCheck} label="Impact" title="Value created" items={impact} />
      </div>

      <section className="project-tech-panel">
        <div>
          <p className="project-case-eyebrow">Tech</p>
          <h3>Technology and Appian capabilities</h3>
        </div>
        <div className="project-tech-list">
          {tech.slice(0, 8).map((item, index) => {
            const FocusIcon = focusIcons[index % focusIcons.length];
            return (
              <span key={item}>
                <FocusIcon size={14} aria-hidden="true" />
                <span>{item}</span>
              </span>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function CaseTextBlock({
  icon: Icon,
  label,
  title,
  text
}: {
  icon: typeof Database;
  label: string;
  title: string;
  text: string;
}) {
  if (!text) return null;
  return (
    <section className="project-case-card">
      <span className="project-case-card-icon" aria-hidden="true">
        <Icon size={18} />
      </span>
      <div>
        <p className="project-case-eyebrow">{label}</p>
        <h3>{title}</h3>
        <p>{compactText(text, 230)}</p>
      </div>
    </section>
  );
}

function CaseListBlock({
  icon: Icon,
  label,
  title,
  items
}: {
  icon: typeof Database;
  label: string;
  title: string;
  items: string[];
}) {
  if (items.length === 0) return null;
  return (
    <section className="project-case-card">
      <span className="project-case-card-icon" aria-hidden="true">
        <Icon size={18} />
      </span>
      <div>
        <p className="project-case-eyebrow">{label}</p>
        <h3>{title}</h3>
        <ul className="project-case-list">
          {items.slice(0, 5).map((item) => (
            <li key={item}>
              <span aria-hidden="true" />
              <p>{sentenceCase(compactText(item, 118))}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function workedOnText(project: ProjectCardData) {
  const base = project.role ? `Worked as ${project.role}.` : "";
  const featureSummary = project.keyFeatures.length > 0 ? `Designed and implemented ${joinReadable(project.keyFeatures.slice(0, 3))}.` : "";
  const design = featureSummary || project.solution || project.architecture || project.heroSummary || project.heroExcerpt;
  return compactText(`${base} ${design}`, 320);
}

function joinReadable(items: string[]) {
  const cleaned = items.map((item) => compactText(item, 64).replace(/\.$/, ""));
  if (cleaned.length <= 1) return cleaned[0] ?? "";
  if (cleaned.length === 2) return `${cleaned[0]} and ${cleaned[1]}`;
  return `${cleaned.slice(0, -1).join(", ")}, and ${cleaned[cleaned.length - 1]}`;
}

function compactText(text: string, max = 92) {
  const normalized = text
    .replace(/(?:^|\s)\d+\.\s+/g, " ")
    .replace(/(?:^|\s)[*-]\s+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (normalized.length <= max) return normalized;
  const sliced = normalized.slice(0, max - 1);
  const boundary = sliced.lastIndexOf(" ");
  return `${sliced.slice(0, boundary > 42 ? boundary : max - 1)}...`;
}

function sentenceCase(text: string) {
  if (!text) return text;
  return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
}
