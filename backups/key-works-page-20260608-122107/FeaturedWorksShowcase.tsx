import {
  ArrowUpRight,
  BadgeCheck,
  CalendarClock,
  ChartNoAxesCombined,
  Code2,
  FileCheck2,
  FileText,
  Highlighter,
  Palette,
  Plug,
  ShieldCheck,
  Sparkles,
  X
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ProjectModalContactRail,
  ProjectModalNavigationRail,
  ProjectReadout,
  type ProjectCardData
} from "./ProjectExplorer";

type FeaturedItem = {
  sourceSlug: string;
  eyebrow: string;
  label: string;
  summary: string;
  tone: "purple" | "blue" | "green" | "amber";
};

type Props = {
  projects: ProjectCardData[];
  pluginProjects: ProjectCardData[];
  spotlightItems: readonly FeaturedItem[];
};

type PluginKind = "sail" | "smart";
type PluginFilterId = "all" | PluginKind;
type PluginTone = FeaturedItem["tone"];
type PluginGlyph = "calendar" | "color" | "document" | "highlight" | "html" | "viewer";

type PluginMeta = {
  name: string;
  type: string;
  summary: string;
  badge: string;
  tone: PluginTone;
  glyph: PluginGlyph;
  icon: LucideIcon;
  kind: PluginKind;
};

const toneIcon = {
  purple: Plug,
  blue: ChartNoAxesCombined,
  green: ShieldCheck,
  amber: Sparkles
};

const pluginFilters: Array<{ id: PluginFilterId; label: string; icon: LucideIcon }> = [
  { id: "all", label: "All", icon: Plug },
  { id: "sail", label: "SAIL component plugin", icon: Code2 },
  { id: "smart", label: "Smart service plugin", icon: FileCheck2 }
];

const stageNodePlacements: CSSProperties[] = [
  { left: "7%", top: "23%" },
  { right: "7%", top: "27%" },
  { right: "8%", bottom: "24%" },
  { left: "8%", bottom: "25%" }
];

const pluginPresentation: Record<string, PluginMeta> = {
  "locale-date-datetime-picker-plugin": {
    name: "Locale Date/DateTime Picker",
    type: "SAIL component plugin",
    summary: "Locale-aware date input for consistent Appian form behavior.",
    badge: "Localized input",
    tone: "blue",
    glyph: "calendar",
    icon: CalendarClock,
    kind: "sail"
  },
  "color-picker-component-plugin": {
    name: "Color Picker",
    type: "SAIL component plugin",
    summary: "Reusable color input for branded, configurable Appian interfaces.",
    badge: "Color input",
    tone: "amber",
    glyph: "color",
    icon: Palette,
    kind: "sail"
  },
  "custom-html-document-viewer-plugin": {
    name: "HTML Document Viewer",
    type: "SAIL component plugin",
    summary: "Document viewing surface for records, review, and embedded content.",
    badge: "Document UI",
    tone: "green",
    glyph: "viewer",
    icon: FileText,
    kind: "sail"
  },
  "document-text-highlighter-plugin": {
    name: "Document Text Highlighter",
    type: "SAIL component plugin",
    summary: "Review aid for highlights, matches, and source context.",
    badge: "Review UX",
    tone: "amber",
    glyph: "highlight",
    icon: Highlighter,
    kind: "sail"
  },
  "html-viewer-component-plugin": {
    name: "HTML Viewer",
    type: "SAIL component plugin",
    summary: "Controlled HTML surface for richer Appian interface composition.",
    badge: "HTML surface",
    tone: "blue",
    glyph: "html",
    icon: Code2,
    kind: "sail"
  },
  "html-docx-accessible-pdf-plugin": {
    name: "HTML/DOCx to Accessible PDF",
    type: "Smart service plugin",
    summary: "Smart service path for accessible document output generation.",
    badge: "Accessible output",
    tone: "green",
    glyph: "document",
    icon: FileCheck2,
    kind: "smart"
  }
};

function pluginMeta(project: ProjectCardData): PluginMeta {
  return pluginPresentation[project.sourceSlug as keyof typeof pluginPresentation] ?? {
    name: project.title.replace(/\s+Plugin$/i, ""),
    type: project.category === "Plugins" ? "SAIL component plugin" : "Cross-listed plugin",
    summary: project.heroSummary || project.heroExcerpt,
    badge: "Reusable asset",
    tone: "purple",
    glyph: "html",
    icon: Plug,
    kind: "sail"
  };
}

export default function FeaturedWorksShowcase({
  projects,
  pluginProjects,
  spotlightItems
}: Props) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const shouldReduceMotion = Boolean(reduceMotion);
  const [activePluginFilter, setActivePluginFilter] = useState<PluginFilterId>("all");
  const [activeSpotlightSlug, setActiveSpotlightSlug] = useState(spotlightItems[0]?.sourceSlug ?? "");

  const projectBySource = useMemo(() => {
    const map = new Map<string, ProjectCardData>();
    for (const project of projects) {
      map.set(project.sourceSlug, project);
    }
    return map;
  }, [projects]);

  const selectedProject = useMemo(
    () => projects.find((project) => project.slug === selectedSlug) ?? null,
    [projects, selectedSlug]
  );

  const activeSpotlight = useMemo(
    () => spotlightItems.find((item) => item.sourceSlug === activeSpotlightSlug) ?? spotlightItems[0],
    [activeSpotlightSlug, spotlightItems]
  );

  const pluginCounts = useMemo(() => {
    const counts: Record<PluginFilterId, number> = { all: pluginProjects.length, sail: 0, smart: 0 };
    for (const project of pluginProjects) {
      counts[pluginMeta(project).kind] += 1;
    }
    return counts;
  }, [pluginProjects]);

  const filteredPluginProjects = useMemo(
    () => (
      activePluginFilter === "all"
        ? pluginProjects
        : pluginProjects.filter((project) => pluginMeta(project).kind === activePluginFilter)
    ),
    [activePluginFilter, pluginProjects]
  );

  function projectFor(sourceSlug: string) {
    return projectBySource.get(sourceSlug);
  }

  function openProject(project: ProjectCardData | undefined, trigger?: HTMLElement) {
    if (!project) return;
    lastFocusRef.current = trigger ?? (document.activeElement as HTMLElement | null);
    setSelectedSlug(project.slug);
  }

  function closeProject() {
    setSelectedSlug(null);
    window.setTimeout(() => lastFocusRef.current?.focus(), 0);
  }

  useEffect(() => {
    if (!selectedProject) return;
    const previousOverflow = document.body.style.overflow;
    const previousModalState = document.documentElement.dataset.modalState;
    document.body.style.overflow = "hidden";
    document.documentElement.dataset.modalState = "open";
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
      if (previousModalState) {
        document.documentElement.dataset.modalState = previousModalState;
      } else {
        delete document.documentElement.dataset.modalState;
      }
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  return (
    <>
      <motion.section
        className={`key-stage key-active-${activeSpotlight?.tone ?? "blue"}`}
        aria-label="Featured work overview"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.42, ease: [0.19, 1, 0.22, 1] }}
      >
        <div className="key-stage-visual" aria-hidden="true">
          <span className="key-stage-depth-panel key-stage-depth-panel-a"></span>
          <span className="key-stage-depth-panel key-stage-depth-panel-b"></span>
          <span className="key-stage-scanline"></span>
          <div className="key-stage-header">
            <span>Work map</span>
            <b>Appian delivery systems</b>
            <i />
            <i />
            <i />
          </div>
          <span className="key-stage-orbit key-stage-orbit-one"></span>
          <span className="key-stage-orbit key-stage-orbit-two"></span>
          <div className="key-stage-core">
            <Sparkles size={24} />
            <span>Key Works</span>
            <small>Delivery map</small>
          </div>
          {spotlightItems.slice(0, 4).map((item, index) => {
            const Icon = toneIcon[item.tone];
            return (
              <span
                className={`key-stage-node key-stage-node-${index + 1} key-tone-${item.tone}${activeSpotlight?.sourceSlug === item.sourceSlug ? " is-active" : ""}`}
                key={item.sourceSlug}
                style={stageNodePlacements[index]}
              >
                <Icon size={17} />
                <b>{item.eyebrow}</b>
              </span>
            );
          })}
          <span className="key-stage-line key-stage-line-one"></span>
          <span className="key-stage-line key-stage-line-two"></span>
          <span className="key-stage-line key-stage-line-three"></span>
          <div className="key-stage-signal-board">
            <span>
              <b>Plugins</b>
              <i></i>
            </span>
            <span>
              <b>Audit</b>
              <i></i>
            </span>
            <span>
              <b>Diagnostics</b>
              <i></i>
            </span>
          </div>
          <div className="key-stage-flow-stack">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className="key-stage-list">
          {spotlightItems.map((item, index) => {
            const project = projectFor(item.sourceSlug);
            const Icon = toneIcon[item.tone];
            return (
              <motion.article
                key={item.sourceSlug}
                className={`key-work-strip key-tone-${item.tone}${activeSpotlight?.sourceSlug === item.sourceSlug ? " is-active" : ""}`}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 22, scale: 0.985 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.32 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.34,
                  ease: [0.19, 1, 0.22, 1],
                  delay: shouldReduceMotion ? 0 : index * 0.045
                }}
                onMouseEnter={() => setActiveSpotlightSlug(item.sourceSlug)}
                onFocusCapture={() => setActiveSpotlightSlug(item.sourceSlug)}
              >
                <span className="key-work-icon" aria-hidden="true">
                  <Icon size={18} />
                </span>
                <div>
                  <p>{item.eyebrow}</p>
                  <h2>{project?.title ?? item.label}</h2>
                  <span>{item.summary}</span>
                </div>
                <button type="button" className="key-detail-button" onClick={(event) => openProject(project, event.currentTarget)}>
                  <span>View details</span>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </button>
              </motion.article>
            );
          })}
        </div>
      </motion.section>

      <motion.section
        className="key-plugin-lab"
        aria-label="Appian plugin portfolio"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.16 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.42, ease: [0.19, 1, 0.22, 1] }}
      >
        <div className="key-plugin-brief">
          <div className="key-section-copy">
            <h2>Appian Plugin Portfolio</h2>
          </div>
          <div className="key-plugin-tabs" role="group" aria-label="Filter Appian plugins by type">
            {pluginFilters.map((filter) => {
              const Icon = filter.icon;
              const isActive = activePluginFilter === filter.id;
              return (
                <button
                  type="button"
                  className={`key-plugin-tab${isActive ? " is-active" : ""}`}
                  key={filter.id}
                  aria-pressed={isActive}
                  onClick={() => setActivePluginFilter(filter.id)}
                >
                  <Icon size={14} aria-hidden="true" />
                  <span>{filter.label}</span>
                  <b>{pluginCounts[filter.id]}</b>
                </button>
              );
            })}
          </div>
        </div>

        <div className="key-plugin-showcase">
          <div className="key-plugin-rack" data-count={filteredPluginProjects.length} data-filter={activePluginFilter} aria-live="polite">
            {filteredPluginProjects.map((project, index) => {
              const meta = pluginMeta(project);
              const Icon = meta.icon;
              return (
                <motion.button
                  type="button"
                  className={`key-plugin-card key-plugin-card-${meta.tone} key-plugin-visual-${meta.glyph}`}
                  key={project.slug}
                  layout
                  initial={false}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.34,
                    ease: [0.19, 1, 0.22, 1],
                    delay: shouldReduceMotion ? 0 : index * 0.035
                  }}
                  onClick={(event) => openProject(project, event.currentTarget)}
                  aria-label={`View details for ${meta.name}`}
                >
                  <span className="key-plugin-card-top">
                    <span className="key-plugin-orbit" aria-hidden="true">
                      <span>
                        <Icon size={18} />
                      </span>
                      <i></i>
                      <b></b>
                    </span>
                  </span>
                  <span className="key-plugin-copy">
                    <span>{meta.type}</span>
                    <strong>{meta.name}</strong>
                    <small>{meta.summary}</small>
                  </span>
                  <span className="key-plugin-card-footer">
                    <span className="key-plugin-chip">{meta.badge}</span>
                    <span className="key-plugin-action">
                      <span>View</span>
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.section>

      {typeof document !== "undefined" &&
        selectedProject &&
        createPortal(
          <motion.div
            className="project-modal-overlay"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.14 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeProject();
            }}
          >
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`featured-dialog-${selectedProject.slug}`}
              className="project-modal-system"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.16 }}
            >
              <span className="project-modal-depth-plane project-modal-depth-plane-a" aria-hidden="true" />
              <span className="project-modal-depth-plane project-modal-depth-plane-b" aria-hidden="true" />
              <ProjectModalNavigationRail />
              <div className="project-modal">
                <div className="project-modal-header">
                  <div>
                    <div className="project-modal-kicker">
                      <span aria-hidden="true">
                        <BadgeCheck size={16} />
                      </span>
                      <p>Featured work / {selectedProject.domain}</p>
                    </div>
                    <h2 id={`featured-dialog-${selectedProject.slug}`} className="mt-2 text-2xl font-semibold leading-tight text-text md:text-3xl">
                      {selectedProject.title}
                    </h2>
                  </div>
                  <button
                    ref={closeRef}
                    type="button"
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-portfolio border border-border bg-elevated text-text hover:border-accent"
                    onClick={closeProject}
                    aria-label="Close featured work details"
                  >
                    <X size={18} aria-hidden="true" />
                  </button>
                </div>

                <div className="project-modal-body">
                  <ProjectReadout project={selectedProject} />
                </div>
              </div>
              <ProjectModalContactRail />
            </motion.div>
          </motion.div>,
          document.body
        )}
    </>
  );
}
