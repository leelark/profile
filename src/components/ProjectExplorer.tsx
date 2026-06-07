import {
  Activity,
  ArrowUpRight,
  BadgeCheck,
  Barcode,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Building2,
  Cable,
  Car,
  ClipboardCheck,
  ClipboardList,
  Cpu,
  Database,
  FileCheck2,
  FileCode2,
  FileOutput,
  FileSearch,
  FileStack,
  FileText,
  GitBranch,
  Gauge,
  HeartPulse,
  Highlighter,
  Layers,
  MessageSquareText,
  Network,
  Palette,
  PanelTop,
  Plug,
  Route,
  Search,
  ServerCog,
  Shield,
  ShieldCheck,
  Sparkles,
  Target,
  UploadCloud,
  Workflow,
  X
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent } from "react";

export type ProjectCardData = {
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
  context: string;
  roleDetail: string;
  uxDecisions: string[];
  finalPortfolioCopy: string;
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

const modalRailItems = [
  { id: "overview", label: "Overview" },
  { id: "story", label: "Story" },
  { id: "value", label: "Value" },
  { id: "stack", label: "Stack" }
];

type VisualSceneNode = {
  label: string;
  icon: LucideIcon;
};

type VisualSceneVariant =
  | "claimsRouting"
  | "docbotScanner"
  | "accelerateOrbit"
  | "advisorPlatform"
  | "documentViewer"
  | "metricsConsole"
  | "auditLedger"
  | "documentBridge"
  | "amlControl"
  | "reconciliationBoard"
  | "horizonRadar"
  | "textHighlighter"
  | "htmlViewer"
  | "accessiblePdf"
  | "automobileTrace"
  | "ncdPolicy"
  | "revenueCycle"
  | "observabilityStream"
  | "fallback";

type VisualScene = {
  className: string;
  variant: VisualSceneVariant;
  kicker: string;
  caption: string;
  nodes: VisualSceneNode[];
  signals: string[];
  metrics: string[];
};

const categoryVisuals: Record<string, { icon: LucideIcon; label: string; color: string; accent: string }> = {
  "client-projects": { icon: BriefcaseBusiness, label: "Client delivery", color: "text-blueSignal", accent: "project-accent-blue" },
  plugins: { icon: Plug, label: "Plugin build", color: "text-accent", accent: "project-accent-purple" },
  "innovative-projects": { icon: Sparkles, label: "Innovation POC", color: "text-verified", accent: "project-accent-green" },
  accelerators: { icon: Workflow, label: "Accelerator", color: "text-caution", accent: "project-accent-amber" }
};

const focusIcons = [Database, Workflow, BrainCircuit, GitBranch, Activity, Cpu, FileText, Bot, Cable];

const workPriorityOrder = [
  "claimroute-iq",
  "knowledge-center-chatbot-docbot",
  "appian-accelerate-program",
  "ebrd-asb-modernization",
  "custom-html-document-viewer-plugin",
  "appian-server-metrics-performance-triage"
];

const workPriorityRank = new Map(workPriorityOrder.map((slug, index) => [slug, index]));

const projectVisualScenes: Record<string, VisualScene> = {
  "claimroute-iq": {
    className: "scene-claimroute",
    variant: "claimsRouting",
    kicker: "Claims intelligence",
    caption: "Claim intake, AI classification, eligibility checks, and reviewer routing in one governed flow.",
    nodes: [
      { label: "Claim intake", icon: ClipboardList },
      { label: "AI classification", icon: BrainCircuit },
      { label: "Eligibility check", icon: ShieldCheck },
      { label: "Reviewer route", icon: Route }
    ],
    signals: ["Claims", "AI review", "Eligibility"],
    metrics: ["FNOL", "Confidence", "Policy fit", "Human queue"]
  },
  "knowledge-center-chatbot-docbot": {
    className: "scene-docbot",
    variant: "docbotScanner",
    kicker: "Document answers",
    caption: "PDF knowledge, grounded responses, exact source passages, and feedback for trusted review.",
    nodes: [
      { label: "PDF corpus", icon: FileStack },
      { label: "Question", icon: MessageSquareText },
      { label: "Grounded answer", icon: Bot },
      { label: "Source passage", icon: FileSearch }
    ],
    signals: ["RAG", "Evidence", "Feedback"],
    metrics: ["DOCBOT", "Grounded answer", "Source page", "Reviewer feedback"]
  },
  "appian-accelerate-program": {
    className: "scene-accelerate",
    variant: "accelerateOrbit",
    kicker: "Accelerate advisory",
    caption: "Reusable advisory patterns across platform health, governance, performance, and enablement.",
    nodes: [
      { label: "Technical review", icon: Search },
      { label: "Governance pattern", icon: Shield },
      { label: "Reusable library", icon: Layers },
      { label: "Client guidance", icon: BriefcaseBusiness }
    ],
    signals: ["Advisory", "Governance", "Reuse"],
    metrics: ["Health", "Governance", "Performance", "Enablement"]
  },
  "ebrd-asb-modernization": {
    className: "scene-advisor-platform",
    variant: "advisorPlatform",
    kicker: "Platform modernization",
    caption: "Legacy advisory applications moved toward a cleaner services platform and integration model.",
    nodes: [
      { label: "Legacy apps", icon: Building2 },
      { label: "Unified service", icon: Workflow },
      { label: "Integration path", icon: Cable },
      { label: "Governed release", icon: BadgeCheck }
    ],
    signals: ["Modernization", "Finance", "Integration"],
    metrics: ["Legacy apps", "Service layer", "Integration", "Release control"]
  },
  "custom-html-document-viewer-plugin": {
    className: "scene-document-viewer",
    variant: "documentViewer",
    kicker: "Document viewer",
    caption: "PDF rendering, bounding-box evidence, auto-scroll behavior, and Appian event handoff.",
    nodes: [
      { label: "PDF render", icon: FileText },
      { label: "Evidence box", icon: Highlighter },
      { label: "Auto-scroll", icon: Route },
      { label: "Appian event", icon: Plug }
    ],
    signals: ["Viewer", "Highlights", "Events"],
    metrics: ["Page 04", "Bounding box", "Scroll sync", "Event bridge"]
  },
  "appian-server-metrics-performance-triage": {
    className: "scene-server-metrics",
    variant: "metricsConsole",
    kicker: "Metrics triage",
    caption: "Health Check exports converted into KPI signals, capacity views, and tuning guidance.",
    nodes: [
      { label: "Health Check", icon: FileCheck2 },
      { label: "KPI scoring", icon: Gauge },
      { label: "Capacity signal", icon: ServerCog },
      { label: "Tuning plan", icon: ClipboardCheck }
    ],
    signals: ["Metrics", "Capacity", "Triage"],
    metrics: ["CPU", "Heap", "Latency", "Queue"]
  },
  "field-level-audit-framework": {
    className: "scene-audit-framework",
    variant: "auditLedger",
    kicker: "Field audit",
    caption: "Field changes captured as JSON, compared by version, and presented as a readable audit trail.",
    nodes: [
      { label: "Field change", icon: FileCode2 },
      { label: "JSON trail", icon: Database },
      { label: "Version compare", icon: GitBranch },
      { label: "Audit record", icon: ShieldCheck }
    ],
    signals: ["Audit", "JSON", "Traceability"],
    metrics: ["Before", "After", "Actor", "Timestamp"]
  },
  "carlyle-bridge-module": {
    className: "scene-document-bridge",
    variant: "documentBridge",
    kicker: "Document bridge",
    caption: "Annex generation, validation, downstream upload, and response tracking in a finance workflow.",
    nodes: [
      { label: "Annex output", icon: FileOutput },
      { label: "Validation", icon: BadgeCheck },
      { label: "Upload", icon: UploadCloud },
      { label: "Response track", icon: Activity }
    ],
    signals: ["Finance", "Validation", "Upload"],
    metrics: ["Annex", "Validate", "Transmit", "Response"]
  },
  "invesco-aml-change-management": {
    className: "scene-aml-change",
    variant: "amlControl",
    kicker: "Controlled change",
    caption: "Change and AML workflow support with approvals, traceability, and operational control.",
    nodes: [
      { label: "Change request", icon: ClipboardList },
      { label: "AML check", icon: Shield },
      { label: "Approval path", icon: Route },
      { label: "Audit log", icon: FileCheck2 }
    ],
    signals: ["AML", "Change", "Controls"],
    metrics: ["Risk", "Approval", "Control", "Audit"]
  },
  "invesco-reconciliation-system": {
    className: "scene-reconciliation",
    variant: "reconciliationBoard",
    kicker: "Investment operations",
    caption: "Batch ingestion, Excel and CSV processing, SQL reconciliation, and dashboard reporting.",
    nodes: [
      { label: "SFTP batch", icon: UploadCloud },
      { label: "Excel / CSV", icon: FileText },
      { label: "SQL match", icon: Database },
      { label: "Dashboard", icon: Activity }
    ],
    signals: ["Reconcile", "SQL", "Reporting"],
    metrics: ["SFTP", "Excel", "SQL", "Breaks"]
  },
  "rapid2-hsbc-horizon-scanning": {
    className: "scene-horizon",
    variant: "horizonRadar",
    kicker: "Regulatory scanning",
    caption: "Regulatory alerts triaged, mapped, and followed through controlled workflow actions.",
    nodes: [
      { label: "Regulatory alert", icon: Search },
      { label: "Triage queue", icon: ClipboardList },
      { label: "Mapping", icon: Network },
      { label: "Follow-up", icon: BadgeCheck }
    ],
    signals: ["Regulatory", "Triage", "Mapping"],
    metrics: ["Alert", "Impact", "Owner", "Action"]
  },
  "document-text-highlighter-plugin": {
    className: "scene-text-highlighter",
    variant: "textHighlighter",
    kicker: "Text highlight",
    caption: "Coordinate-driven document highlights for page evidence, region focus, and Appian review.",
    nodes: [
      { label: "Coordinate input", icon: Target },
      { label: "Text region", icon: Highlighter },
      { label: "Document page", icon: FileSearch },
      { label: "Component output", icon: Plug }
    ],
    signals: ["Coordinates", "Highlight", "Review"],
    metrics: ["x1 y1", "x2 y2", "Page", "Region"]
  },
  "html-viewer-component-plugin": {
    className: "scene-html-viewer",
    variant: "htmlViewer",
    kicker: "Embedded HTML",
    caption: "Interactive HTML experiences embedded in Appian with value bridge events and workflow handoff.",
    nodes: [
      { label: "HTML view", icon: PanelTop },
      { label: "Interactive event", icon: FileCode2 },
      { label: "Value bridge", icon: Cable },
      { label: "Appian save", icon: Plug }
    ],
    signals: ["HTML", "Events", "SAIL"],
    metrics: ["HTML", "Click", "saveValue", "SAIL"]
  },
  "color-picker-component-plugin": {
    className: "scene-color-picker",
    variant: "fallback",
    kicker: "SAIL color input",
    caption: "Color selection, preview, validation, and Appian value binding for configurable interfaces.",
    nodes: [
      { label: "Palette", icon: Palette },
      { label: "Preview", icon: PanelTop },
      { label: "Validation", icon: BadgeCheck },
      { label: "SAIL save", icon: Plug }
    ],
    signals: ["Color", "Preview", "SAIL"],
    metrics: ["Hex", "Preview", "Validate", "saveInto"]
  },
  "html-docx-accessible-pdf-plugin": {
    className: "scene-accessible-pdf",
    variant: "accessiblePdf",
    kicker: "Accessible PDF",
    caption: "HTML and DOCX inputs transformed into structured, accessible PDF output for governed documents.",
    nodes: [
      { label: "HTML / DOCX", icon: FileCode2 },
      { label: "Transform", icon: Workflow },
      { label: "Accessible PDF", icon: FileOutput },
      { label: "Document control", icon: ShieldCheck }
    ],
    signals: ["PDF", "Accessibility", "Documents"],
    metrics: ["HTML", "DOCX", "Tags", "PDF"]
  },
  "automobile-traceability": {
    className: "scene-automobile",
    variant: "automobileTrace",
    kicker: "Manufacturing trace",
    caption: "Assembly data, barcode simulation, document evidence, and traceability dashboards.",
    nodes: [
      { label: "Assembly step", icon: Car },
      { label: "Barcode scan", icon: Barcode },
      { label: "Evidence doc", icon: FileText },
      { label: "Trace dashboard", icon: Activity }
    ],
    signals: ["Manufacturing", "Barcode", "Trace"],
    metrics: ["Station", "VIN", "Scan", "Trace"]
  },
  "no-claim-discount-poc": {
    className: "scene-ncd",
    variant: "ncdPolicy",
    kicker: "No-claim review",
    caption: "Evidence upload, policy extraction, consistency validation, and reviewer decision support.",
    nodes: [
      { label: "Evidence upload", icon: UploadCloud },
      { label: "Policy fields", icon: FileSearch },
      { label: "Consistency", icon: ShieldCheck },
      { label: "Decision review", icon: ClipboardCheck }
    ],
    signals: ["Insurance", "Extraction", "Decision"],
    metrics: ["Policy", "NCB", "Evidence", "Decision"]
  },
  "revenue-cycle-optimization": {
    className: "scene-revenue-cycle",
    variant: "revenueCycle",
    kicker: "Revenue cycle",
    caption: "Referral, pre-authorization, eligibility, denial, and reporting workflow signals.",
    nodes: [
      { label: "Referral intake", icon: HeartPulse },
      { label: "Pre-auth", icon: ClipboardCheck },
      { label: "Eligibility", icon: ShieldCheck },
      { label: "Denial report", icon: Activity }
    ],
    signals: ["Healthcare", "Eligibility", "Reporting"],
    metrics: ["Referral", "Auth", "Eligibility", "Denial"]
  },
  "appian-monitoring-observability-accelerator": {
    className: "scene-log-streaming",
    variant: "observabilityStream",
    kicker: "Log streaming",
    caption: "Platform logs and metrics mapped into stability hierarchy, dashboard, and triage actions.",
    nodes: [
      { label: "Log stream", icon: Activity },
      { label: "Metric catalog", icon: Database },
      { label: "Stability map", icon: Network },
      { label: "Triage action", icon: ServerCog }
    ],
    signals: ["Logs", "Metrics", "Observability"],
    metrics: ["Logs", "Metrics", "SLO", "Triage"]
  }
};

const projectSummaryOverrides: Record<string, string> = {
  "claimroute-iq": "Claims intelligence POC for intake, document classification, eligibility checks, reviewer routing, and support chatbot flow.",
  "knowledge-center-chatbot-docbot": "Appian-native document assistant for PDF answers, source passage evidence, and reviewer-friendly knowledge lookup.",
  "appian-accelerate-program": "Advisory and accelerator work for Appian architecture, governance, performance, integration reliability, and reusable delivery patterns.",
  "ebrd-asb-modernization": "Advisor-services modernization work for legacy Appian applications, unified platform design, integration reliability, and governed delivery.",
  "custom-html-document-viewer-plugin": "Document intelligence plugin for PDF rendering, evidence boxes, auto-scroll behavior, and Appian review events.",
  "appian-server-metrics-performance-triage": "Performance triage accelerator for Appian Health Check metrics, KPI scoring, capacity signals, and tuning guidance.",
  "field-level-audit-framework": "Reusable Appian audit framework for field-level JSON change capture, version comparison, and traceable record history.",
  "carlyle-bridge-module": "Finance workflow bridge for document annex generation, validation, downstream upload, and response tracking.",
  "invesco-aml-change-management": "Investment workflow support for change management and AML controls with approvals, traceability, and operational handoff.",
  "invesco-reconciliation-system": "Investment operations workflow for SFTP batch ingestion, Excel/CSV processing, SQL reconciliation, and dashboards.",
  "rapid2-hsbc-horizon-scanning": "Regulatory horizon-scanning platform for alert intake, triage, mapping, follow-up, and controlled workflow handling.",
  "document-text-highlighter-plugin": "Appian component plugin for coordinate-based document text and region highlighting in PDF/image review.",
  "color-picker-component-plugin": "Appian SAIL component plugin concept for visual color selection, preview, validation, and clean value binding.",
  "html-viewer-component-plugin": "Appian component plugin for embedding custom HTML experiences with event bridge and workflow handoff.",
  "html-docx-accessible-pdf-plugin": "Document conversion plugin for HTML/DOCX inputs, accessible PDF output, and governed document generation.",
  "automobile-traceability": "Manufacturing traceability POC for assembly data capture, barcode simulation, document evidence, and dashboards.",
  "no-claim-discount-poc": "Insurance POC for evidence upload, policy-field extraction, consistency validation, and reviewer decision support.",
  "revenue-cycle-optimization": "Healthcare workflow concept for referrals, pre-authorization, eligibility checks, denial handling, and reporting.",
  "appian-monitoring-observability-accelerator": "Observability accelerator for Appian logs, metric cataloging, stability hierarchy, dashboards, and triage actions."
};

const evidencePresentation: Record<string, { label: string; tone: string }> = {
  Confirmed: { label: "Evidence-backed", tone: "confirmed" },
  "Partially Confirmed": { label: "Draft from source material", tone: "partial" },
  "Needs Confirmation": { label: "Needs confirmation", tone: "needs" }
};

export default function ProjectExplorer({ projects, categories, showFilters = true, compact = false }: Props) {
  const [active, setActive] = useState("all");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  const filtered = useMemo(
    () => orderWorkCards(active === "all" ? projects : projects.filter((project) => project.categorySlug === active)),
    [active, projects]
  );
  const selectedProject = useMemo(
    () => projects.find((project) => project.slug === selectedSlug) ?? null,
    [projects, selectedSlug]
  );
  const filterCounts = useMemo(() => {
    const counts = new Map<string, number>([["all", projects.length]]);
    for (const category of categories) {
      counts.set(category.slug, projects.filter((project) => project.categorySlug === category.slug).length);
    }
    return counts;
  }, [categories, projects]);

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

  const filters = [{ slug: "all", label: "All Work" }, ...categories];

  return (
    <div className="space-y-7">
      {showFilters && (
        <div className="work-filter-bar" role="group" aria-label="Filter work by category">
          {filters.map((category) => {
            const selected = active === category.slug;
            const count = filterCounts.get(category.slug) ?? 0;
            return (
              <button
                key={category.slug}
                type="button"
                aria-pressed={selected}
                aria-label={`${category.label} work filter, ${count} items`}
                className={`work-filter-button ${selected ? "work-filter-button-active" : ""}`}
                onClick={() => setActive(category.slug)}
              >
                <span>{category.label}</span>
                <span className="work-filter-count">{count}</span>
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
            const evidence = evidenceBadge(project.evidenceStatus);
            const cardTags = uniqueItems(project.tags).slice(0, compact ? 2 : 3);
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
                    <span>{compactText(project.domain, 44)}</span>
                  </span>
                  <span className={`project-evidence-badge project-evidence-${evidence.tone}`}>
                    <BadgeCheck size={13} aria-hidden="true" />
                    <span>{evidence.label}</span>
                  </span>
                </div>

                <div className="project-card-heading">
                  <span className="project-card-mark" aria-hidden="true">
                    <Icon className={visual.color} size={24} />
                  </span>
                  <h3>{project.title}</h3>
                </div>
                <p className="project-card-summary">{cardSummary(project, compact)}</p>
                <div className="project-card-meta">
                  <BriefcaseBusiness size={14} aria-hidden="true" />
                  <span>{compactText(project.role, 76)}</span>
                </div>
                {cardTags.length > 0 && (
                  <div className="project-card-tags" aria-label={`${project.title} capability tags`}>
                    {cardTags.map((tag) => (
                      <span key={tag}>{compactText(tag, 34)}</span>
                    ))}
                  </div>
                )}

                <div className="project-card-action">
                  <span className="project-card-type">
                    <span>{visual.label}</span>
                  </span>
                  <span className="project-detail-button" aria-hidden="true">
                    <span>View details</span>
                    <span className="project-detail-icon" aria-hidden="true">
                      <ArrowUpRight size={15} />
                    </span>
                  </span>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          (() => {
            const titleId = `project-dialog-${selectedProject.slug}`;

            return (
          <motion.div
            className="project-modal-overlay"
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
              className="project-modal-system"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.16 }}
            >
              <ProjectModalNavigationRail />
              <div className="project-modal">
                <div className="project-modal-header">
                  <div className="project-modal-utility" aria-hidden="true">
                    <span className="project-modal-utility-line" />
                    <span>Portfolio detail</span>
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
                  <ProjectReadout project={selectedProject} titleId={titleId} />
                </div>
              </div>
              <ProjectModalContactRail />
            </motion.div>
          </motion.div>
            );
          })()
        )}
      </AnimatePresence>
    </div>
  );
}

function orderWorkCards(projects: ProjectCardData[]) {
  return projects
    .map((project, index) => ({ project, index }))
    .sort((left, right) => {
      const leftRank = workPriorityRank.get(left.project.sourceSlug);
      const rightRank = workPriorityRank.get(right.project.sourceSlug);

      if (leftRank !== undefined && rightRank !== undefined) return leftRank - rightRank;
      if (leftRank !== undefined) return -1;
      if (rightRank !== undefined) return 1;
      return left.index - right.index;
    })
    .map(({ project }) => project);
}

export function ProjectModalNavigationRail() {
  function scrollToSection(sectionId: string) {
    const section = document.querySelector(`[data-project-section="${sectionId}"]`);
    if (!section) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    section.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }

  return (
    <aside className="project-modal-side-rail project-modal-nav-rail" aria-label="Project detail navigation">
      <span className="project-modal-side-kicker">
        <Route size={14} aria-hidden="true" />
        Navigate
      </span>
      <div className="project-modal-rail-stack">
        {modalRailItems.map((item, index) => (
          <button
            type="button"
            className={index === 0 ? "is-active" : ""}
            key={item.id}
            aria-label={`Go to ${item.label} section`}
            onClick={() => scrollToSection(item.id)}
          >
            <b>{String(index + 1).padStart(2, "0")}</b>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}

export function ProjectModalContactRail() {
  return (
    <aside className="project-modal-side-rail project-modal-contact-rail" aria-label="Conversation shortcut">
      <span className="project-modal-side-kicker">
        <MessageSquareText size={14} aria-hidden="true" />
        Discuss
      </span>
      <p>Talk through delivery, architecture, or reusable Appian assets.</p>
      <a href="/profile/contact/">
        <span>Start conversation</span>
        <ArrowUpRight size={14} aria-hidden="true" />
      </a>
    </aside>
  );
}

export function ProjectReadout({ project, titleId }: { project: ProjectCardData; titleId?: string }) {
  const visual = categoryVisuals[project.categorySlug] ?? categoryVisuals["client-projects"];
  const Icon = visual.icon;
  const scene = projectVisualScenes[project.sourceSlug] ?? projectVisualSceneFromContent(project, Icon, visual.label);
  const functionality =
    project.sourceSlug === "appian-accelerate-program" && project.acceleratorHighlights.length > 0
      ? project.acceleratorHighlights
      : project.keyFeatures.length > 0
        ? project.keyFeatures
        : project.workflowSteps;
  const impact = project.businessValue.length > 0 ? project.businessValue : [project.heroSummary || project.heroExcerpt];
  const tech = capabilityItems(project);
  const decisionItems = uniqueItems(project.uxDecisions.length > 0 ? project.uxDecisions : project.keyFeatures).slice(0, 4);
  const summary = projectSummary(project, 300);
  const problem = project.problem || project.context || project.heroExcerpt;
  const solution = project.solution || project.architecture || summary;
  const role = project.roleDetail || workedOnText(project);
  const evidence = evidenceBadge(project.evidenceStatus);
  const snapshotChips = uniqueItems(project.tags.length > 0 ? project.tags : [visual.label, project.domain]).slice(0, 4);

  return (
    <div className={`project-case-layout ${visual.accent} project-category-${project.categorySlug}`}>
      <section className="project-case-hero" data-project-section="overview">
        <div className="project-case-hero-copy">
          <span className="project-case-icon" aria-hidden="true">
            <Icon className={visual.color} size={24} />
          </span>
          <div>
            <p className="project-case-eyebrow">{visual.label}</p>
            <h3 id={titleId}>{compactText(project.title, 86)}</h3>
            <p>{smartText(summary, 280)}</p>
            <div className="project-case-meta-grid" aria-label="Project metadata">
              <span className={`project-case-meta-item project-evidence-${evidence.tone}`}>
                <small>Evidence</small>
                <strong>{evidence.label}</strong>
              </span>
              <span className="project-case-meta-item">
                <small>Role</small>
                <strong>{compactText(project.role, 62)}</strong>
              </span>
              <span className="project-case-meta-item">
                <small>Domain</small>
                <strong>{compactText(project.domain, 62)}</strong>
              </span>
            </div>
            <div className="project-snapshot-chips" aria-label="Project summary tags">
              {snapshotChips.map((chip) => (
                <span key={chip}>{compactText(chip, 42)}</span>
              ))}
            </div>
          </div>
        </div>

        <ProjectVisualStory scene={scene} />
      </section>

      <section className="project-narrative-grid" data-project-section="story" aria-label={`${project.title} project story`}>
        <CaseTextBlock icon={Target} label="Problem" title="What needed solving" text={problem} />
        <CaseTextBlock icon={GitBranch} label="Solution" title="What was built" text={solution} />
        <CaseTextBlock icon={BadgeCheck} label="Contribution" title="My role" text={role} />
      </section>

      <div className="project-detail-columns" data-project-section="value">
        <CaseListBlock icon={Sparkles} label="Capabilities" title="What stands out" items={functionality} />
        <CaseListBlock icon={ShieldCheck} label="Portfolio value" title="Why it matters" items={impact} />
        <CaseListBlock icon={Route} label="Design choices" title="How it was shaped" items={decisionItems} />
      </div>

      <section className="project-tech-panel" data-project-section="stack">
        <div>
          <p className="project-case-eyebrow">Stack</p>
          <h3>Appian delivery capabilities</h3>
        </div>
        <div className="project-tech-list">
          {tech.map((item, index) => {
            const FocusIcon = focusIcons[index % focusIcons.length];
            return (
              <span key={item}>
                <FocusIcon size={14} aria-hidden="true" />
                <span>{compactText(item, 44)}</span>
              </span>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function ProjectVisualStory({ scene }: { scene: VisualScene }) {
  return (
    <div className={`project-visual-story ${scene.className} project-visual-${scene.variant}`} aria-hidden="true">
      <div className="project-visual-head">
        <strong>{scene.kicker}</strong>
        <span>{scene.caption}</span>
      </div>

      <div className="project-visual-stage">
        {renderProjectVisual(scene)}
      </div>

      <div className="project-visual-signals">
        {scene.signals.map((signal) => (
          <span key={signal}>{signal}</span>
        ))}
      </div>
    </div>
  );
}

function renderProjectVisual(scene: VisualScene) {
  switch (scene.variant) {
    case "claimsRouting":
      return <ClaimsRoutingVisual scene={scene} />;
    case "docbotScanner":
      return <DocbotScannerVisual scene={scene} />;
    case "accelerateOrbit":
      return <AccelerateOrbitVisual scene={scene} />;
    case "advisorPlatform":
      return <AdvisorPlatformVisual scene={scene} />;
    case "documentViewer":
      return <DocumentViewerVisual scene={scene} />;
    case "metricsConsole":
      return <MetricsConsoleVisual scene={scene} />;
    case "auditLedger":
      return <AuditLedgerVisual scene={scene} />;
    case "documentBridge":
      return <DocumentBridgeVisual scene={scene} />;
    case "amlControl":
      return <AmlControlVisual scene={scene} />;
    case "reconciliationBoard":
      return <ReconciliationBoardVisual scene={scene} />;
    case "horizonRadar":
      return <HorizonRadarVisual scene={scene} />;
    case "textHighlighter":
      return <TextHighlighterVisual scene={scene} />;
    case "htmlViewer":
      return <HtmlViewerVisual scene={scene} />;
    case "accessiblePdf":
      return <AccessiblePdfVisual scene={scene} />;
    case "automobileTrace":
      return <AutomobileTraceVisual scene={scene} />;
    case "ncdPolicy":
      return <NcdPolicyVisual scene={scene} />;
    case "revenueCycle":
      return <RevenueCycleVisual scene={scene} />;
    case "observabilityStream":
      return <ObservabilityStreamVisual scene={scene} />;
    default:
      return <FallbackVisual scene={scene} />;
  }
}

function sceneNode(scene: VisualScene, index: number): VisualSceneNode {
  return scene.nodes[index] ?? { label: scene.metrics[index] ?? scene.kicker, icon: Sparkles };
}

function metricText(scene: VisualScene, index: number, fallback: string) {
  return scene.metrics[index] ?? scene.signals[index] ?? fallback;
}

function SceneBadge({ scene, index, className = "" }: { scene: VisualScene; index: number; className?: string }) {
  const node = sceneNode(scene, index);
  const Icon = node.icon;
  return (
    <div className={`project-visual-badge ${className}`}>
      <Icon size={16} />
      <span>{node.label}</span>
    </div>
  );
}

function MiniBars({ count = 4 }: { count?: number }) {
  return (
    <div className="visual-mini-bars">
      {Array.from({ length: count }).map((_, index) => (
        <span key={index} />
      ))}
    </div>
  );
}

function MetricRibbon({ scene, from = 0, count = 3 }: { scene: VisualScene; from?: number; count?: number }) {
  return (
    <div className="visual-metric-ribbon">
      {scene.metrics.slice(from, from + count).map((metric, index) => (
        <span key={`${metric}-${index}`}>{metric}</span>
      ))}
    </div>
  );
}

function DataRows({
  rows,
  className = ""
}: {
  rows: Array<{ label: string; value: string; tone?: "a" | "b" | "c" }>;
  className?: string;
}) {
  return (
    <div className={`visual-data-rows ${className}`}>
      {rows.map((row) => (
        <span key={`${row.label}-${row.value}`} className={row.tone ? `visual-data-row-${row.tone}` : ""}>
          <b>{row.label}</b>
          <em>{row.value}</em>
        </span>
      ))}
    </div>
  );
}

function MotionDots({ count = 3, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`visual-motion-dots ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <i key={index} />
      ))}
    </div>
  );
}

function ClaimsRoutingVisual({ scene }: { scene: VisualScene }) {
  return (
    <div className="visual-claims-board">
      <DataRows
        className="visual-claims-data"
        rows={[
          { label: "Claim", value: "CLM-4821", tone: "a" },
          { label: "Type", value: "Motor", tone: "b" },
          { label: "SLA", value: "4h", tone: "c" }
        ]}
      />
      <div className="visual-claims-intake">
        <SceneBadge scene={scene} index={0} />
        <MiniBars count={3} />
      </div>
      <span className="visual-flow-line visual-flow-line-a" />
      <div className="visual-claims-core">
        <BrainCircuit size={28} />
        <strong>{metricText(scene, 1, "Confidence")}</strong>
        <span>92%</span>
      </div>
      <MotionDots count={4} className="visual-claims-particles" />
      <span className="visual-flow-line visual-flow-line-b" />
      <div className="visual-claims-routes">
        <SceneBadge scene={scene} index={2} />
        <SceneBadge scene={scene} index={3} />
      </div>
      <MetricRibbon scene={scene} from={0} count={4} />
    </div>
  );
}

function DocbotScannerVisual({ scene }: { scene: VisualScene }) {
  return (
    <div className="visual-docbot-card">
      <div className="visual-window-bar">
        <span className="visual-window-dots">
          <i />
          <i />
          <i />
        </span>
        <b>{metricText(scene, 0, "DOCBOT")}</b>
      </div>
      <span className="visual-scan-line" />
      <div className="visual-docbot-page">
        <span className="visual-doc-title" />
        <span className="visual-doc-line visual-doc-line-wide" />
        <span className="visual-doc-line" />
        <span className="visual-doc-line visual-doc-line-focus" />
        <span className="visual-doc-line visual-doc-line-short" />
        <div className="visual-doc-grid">
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className="visual-source-stack">
        <span>PDF-14</span>
        <span>Policy</span>
        <span>FAQ</span>
      </div>
      <div className="visual-answer-card">
        <span />
        <strong>{metricText(scene, 1, "Grounded answer")}</strong>
        <small>{metricText(scene, 2, "Source page")}</small>
      </div>
      <div className="visual-feedback-meter">
        <Bot size={14} />
        <b>Trust</b>
        <i />
      </div>
    </div>
  );
}

function AccelerateOrbitVisual({ scene }: { scene: VisualScene }) {
  return (
    <div className="visual-accelerate-orbit">
      <span className="visual-orbit-ring visual-orbit-ring-one" />
      <span className="visual-orbit-ring visual-orbit-ring-two" />
      <span className="visual-orbit-ring visual-orbit-ring-three" />
      <div className="visual-orbit-core">
        <Workflow size={28} />
        <strong>Accelerate</strong>
      </div>
      {[0, 1, 2, 3].map((index) => (
        <SceneBadge key={index} scene={scene} index={index} className={`visual-orbit-node visual-orbit-node-${index + 1}`} />
      ))}
      <DataRows
        className="visual-accelerate-scorecard"
        rows={[
          { label: "Review", value: "Pattern", tone: "a" },
          { label: "Asset", value: "Reusable", tone: "b" },
          { label: "Handoff", value: "Client", tone: "c" }
        ]}
      />
    </div>
  );
}

function AdvisorPlatformVisual({ scene }: { scene: VisualScene }) {
  return (
    <div className="visual-advisor-platform">
      <div className="visual-platform-map">
        <i />
        <i />
        <i />
      </div>
      <div className="visual-platform-row visual-platform-row-legacy">
        <SceneBadge scene={scene} index={0} />
        <span />
      </div>
      <div className="visual-platform-service">
        <SceneBadge scene={scene} index={1} />
        <MiniBars count={5} />
      </div>
      <div className="visual-platform-row visual-platform-row-release">
        <SceneBadge scene={scene} index={2} />
        <SceneBadge scene={scene} index={3} />
      </div>
    </div>
  );
}

function DocumentViewerVisual({ scene }: { scene: VisualScene }) {
  return (
    <div className="visual-document-viewer">
      <div className="visual-page-thumbs">
        <i />
        <i />
        <i />
      </div>
      <div className="visual-pdf-page">
        <span className="visual-page-tab">{metricText(scene, 0, "Page 04")}</span>
        <i className="visual-box visual-box-one" />
        <i className="visual-box visual-box-two" />
        <i className="visual-viewer-pulse" />
        <span className="visual-doc-line visual-doc-line-wide" />
        <span className="visual-doc-line" />
        <span className="visual-doc-line visual-doc-line-short" />
        <span className="visual-scroll-marker" />
      </div>
      <div className="visual-viewer-rail">
        <SceneBadge scene={scene} index={1} />
        <SceneBadge scene={scene} index={2} />
        <SceneBadge scene={scene} index={3} />
        <DataRows rows={[{ label: "x,y", value: "182,64", tone: "a" }, { label: "w,h", value: "210,38", tone: "b" }]} />
      </div>
    </div>
  );
}

function MetricsConsoleVisual({ scene }: { scene: VisualScene }) {
  return (
    <div className="visual-metrics-console">
      <div className="visual-metrics-alerts">
        <span>p95</span>
        <span>heap</span>
        <span>queue</span>
      </div>
      <div className="visual-gauge">
        <Gauge size={30} />
        <strong>78</strong>
        <small>{metricText(scene, 1, "KPI scoring")}</small>
      </div>
      <div className="visual-metric-bars">
        {scene.metrics.map((metric, index) => (
          <span key={metric} style={{ "--bar-h": `${34 + index * 14}%` } as CSSProperties}>
            <b>{metric}</b>
          </span>
        ))}
      </div>
      <SceneBadge scene={scene} index={3} className="visual-console-action" />
      <span className="visual-trend-line" />
    </div>
  );
}

function AuditLedgerVisual({ scene }: { scene: VisualScene }) {
  return (
    <div className="visual-audit-ledger">
      <div className="visual-ledger-code">
        <span>{"{"}</span>
        <b>{metricText(scene, 0, "Before")}: "Pending"</b>
        <b>{metricText(scene, 1, "After")}: "Approved"</b>
        <b>changedBy: "reviewer"</b>
        <span>{"}"}</span>
      </div>
      <div className="visual-ledger-timeline">
        {[0, 1, 2, 3].map((index) => (
          <SceneBadge key={index} scene={scene} index={index} className={`visual-ledger-row visual-ledger-row-${index + 1}`} />
        ))}
      </div>
      <span className="visual-audit-pulse" />
    </div>
  );
}

function DocumentBridgeVisual({ scene }: { scene: VisualScene }) {
  return (
    <div className="visual-document-bridge">
      <div className="visual-bridge-doc-stack">
        <FileText size={18} />
        <span />
        <span />
      </div>
      {[0, 1, 2, 3].map((index) => (
        <SceneBadge key={index} scene={scene} index={index} className={`visual-bridge-stop visual-bridge-stop-${index + 1}`} />
      ))}
      <span className="visual-bridge-track" />
      <span className="visual-bridge-packet" />
      <div className="visual-bridge-endpoint">
        <UploadCloud size={16} />
        <b>External system</b>
      </div>
    </div>
  );
}

function AmlControlVisual({ scene }: { scene: VisualScene }) {
  return (
    <div className="visual-aml-control">
      <div className="visual-risk-dial visual-risk-pulse">
        <Shield size={28} />
        <strong>{metricText(scene, 0, "Risk")}</strong>
      </div>
      <div className="visual-control-matrix">
        {scene.metrics.map((metric, index) => (
          <span key={metric} className={`visual-control-cell visual-control-cell-${index + 1}`}>
            {metric}
          </span>
        ))}
      </div>
      <SceneBadge scene={scene} index={2} className="visual-control-route" />
      <div className="visual-approval-ladder">
        <span>Maker</span>
        <span>Checker</span>
        <span>Audit</span>
      </div>
    </div>
  );
}

function ReconciliationBoardVisual({ scene }: { scene: VisualScene }) {
  return (
    <div className="visual-reconciliation-board">
      <div className="visual-source-stack">
        <SceneBadge scene={scene} index={0} />
        <SceneBadge scene={scene} index={1} />
      </div>
      <div className="visual-sql-core">
        <Database size={26} />
        <strong>{metricText(scene, 2, "SQL")}</strong>
      </div>
      <div className="visual-breaks-panel">
        <Activity size={18} />
        <b>{metricText(scene, 3, "Breaks")}</b>
        <MiniBars count={4} />
      </div>
      <div className="visual-match-table">
        <span><b>T+1</b><em>match</em></span>
        <span><b>FX</b><em>review</em></span>
        <span><b>Cash</b><em>clear</em></span>
      </div>
      <MotionDots count={3} className="visual-recon-dots" />
    </div>
  );
}

function HorizonRadarVisual({ scene }: { scene: VisualScene }) {
  return (
    <div className="visual-horizon-radar">
      <span className="visual-radar-grid" />
      <span className="visual-radar-sweep" />
      <SceneBadge scene={scene} index={0} className="visual-radar-alert visual-radar-alert-one" />
      <SceneBadge scene={scene} index={1} className="visual-radar-alert visual-radar-alert-two" />
      <SceneBadge scene={scene} index={3} className="visual-radar-alert visual-radar-alert-three" />
      <div className="visual-reg-feed">
        <span>FCA</span>
        <span>EU</span>
        <span>Policy</span>
      </div>
      <MotionDots count={4} className="visual-radar-pings" />
    </div>
  );
}

function TextHighlighterVisual({ scene }: { scene: VisualScene }) {
  return (
    <div className="visual-text-highlighter">
      <div className="visual-coordinate-ruler">
        {scene.metrics.map((metric) => (
          <span key={metric}>{metric}</span>
        ))}
      </div>
      <div className="visual-highlight-page">
        <span className="visual-doc-line visual-doc-line-wide" />
        <span className="visual-doc-line visual-doc-line-focus" />
        <span className="visual-doc-line" />
        <i className="visual-highlight-pulse" />
        <i className="visual-highlight-box visual-highlight-box-one" />
        <i className="visual-highlight-box visual-highlight-box-two" />
        <span className="visual-coordinate-crosshair" />
      </div>
      <SceneBadge scene={scene} index={3} className="visual-highlight-output" />
      <div className="visual-highlight-controls">
        <span>Page 2</span>
        <span>Region A</span>
      </div>
    </div>
  );
}

function HtmlViewerVisual({ scene }: { scene: VisualScene }) {
  return (
    <div className="visual-html-viewer">
      <div className="visual-browser-frame">
        <div className="visual-window-bar">
          <span className="visual-window-dots">
            <i />
            <i />
            <i />
          </span>
          <b>{metricText(scene, 0, "HTML")}</b>
        </div>
        <div className="visual-html-blocks">
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="visual-event-bridge">
        <SceneBadge scene={scene} index={1} />
        <i />
        <SceneBadge scene={scene} index={3} />
      </div>
      <div className="visual-dom-tree">
        <span>&lt;button&gt;</span>
        <span>onclick</span>
        <span>saveValue()</span>
      </div>
    </div>
  );
}

function AccessiblePdfVisual({ scene }: { scene: VisualScene }) {
  return (
    <div className="visual-accessible-pdf">
      <div className="visual-input-stack">
        <SceneBadge scene={scene} index={0} />
        <span>{metricText(scene, 1, "DOCX")}</span>
        <span>{metricText(scene, 0, "HTML")}</span>
      </div>
      <div className="visual-transform-core">
        <Workflow size={28} />
        <MiniBars count={3} />
      </div>
      <div className="visual-pdf-output">
        <FileOutput size={26} />
        <strong>{metricText(scene, 3, "PDF")}</strong>
        <small>{metricText(scene, 2, "Tags")}</small>
      </div>
      <DataRows
        className="visual-accessibility-tree"
        rows={[
          { label: "H1", value: "tagged", tone: "a" },
          { label: "Alt", value: "mapped", tone: "b" }
        ]}
      />
    </div>
  );
}

function AutomobileTraceVisual({ scene }: { scene: VisualScene }) {
  return (
    <div className="visual-auto-trace">
      <span className="visual-assembly-track" />
      <SceneBadge scene={scene} index={0} className="visual-auto-station visual-auto-station-one" />
      <div className="visual-car-chip">
        <Car size={30} />
        <strong>{metricText(scene, 1, "VIN")}</strong>
      </div>
      <div className="visual-barcode-scan">
        <Barcode size={28} />
        <span />
      </div>
      <SceneBadge scene={scene} index={3} className="visual-auto-station visual-auto-station-two" />
      <DataRows
        className="visual-vin-panel"
        rows={[
          { label: "VIN", value: "A92-44", tone: "a" },
          { label: "Batch", value: "Line 3", tone: "b" }
        ]}
      />
    </div>
  );
}

function NcdPolicyVisual({ scene }: { scene: VisualScene }) {
  return (
    <div className="visual-ncd-policy">
      <div className="visual-policy-card">
        <FileSearch size={24} />
        <strong>{metricText(scene, 0, "Policy")}</strong>
        <MiniBars count={4} />
      </div>
      <div className="visual-ncd-checks">
        {[1, 2, 3].map((index) => (
          <SceneBadge key={index} scene={scene} index={index} className={`visual-ncd-check visual-ncd-check-${index}`} />
        ))}
      </div>
      <div className="visual-decision-meter">
        <ShieldCheck size={18} />
        <b>Review ready</b>
        <i />
      </div>
    </div>
  );
}

function RevenueCycleVisual({ scene }: { scene: VisualScene }) {
  return (
    <div className="visual-revenue-cycle">
      <span className="visual-care-path" />
      {[0, 1, 2].map((index) => (
        <SceneBadge key={index} scene={scene} index={index} className={`visual-care-node visual-care-node-${index + 1}`} />
      ))}
      <div className="visual-denial-panel">
        <Activity size={18} />
        <b>{metricText(scene, 3, "Denial")}</b>
        <MiniBars count={3} />
      </div>
      <div className="visual-care-ledger">
        <span>Patient</span>
        <span>Payer</span>
        <span>Claim</span>
      </div>
    </div>
  );
}

function ObservabilityStreamVisual({ scene }: { scene: VisualScene }) {
  return (
    <div className="visual-observability-stream">
      <div className="visual-log-stream">
        {Array.from({ length: 6 }).map((_, index) => (
          <span key={index}>event.{index + 1} status=ok</span>
        ))}
      </div>
      <div className="visual-observability-stack">
        {[1, 2, 3].map((index) => (
          <SceneBadge key={index} scene={scene} index={index} className={`visual-observe-card visual-observe-card-${index}`} />
        ))}
      </div>
      <div className="visual-slo-panel">
        <span>99.9</span>
        <b>SLO</b>
        <MiniBars count={3} />
      </div>
    </div>
  );
}

function FallbackVisual({ scene }: { scene: VisualScene }) {
  return (
    <>
      <span className="project-visual-shape project-visual-shape-a" />
      <span className="project-visual-shape project-visual-shape-b" />
      <span className="project-visual-line project-visual-line-a" />
      <span className="project-visual-line project-visual-line-b" />
      {scene.nodes.map((node, index) => {
        const NodeIcon = node.icon;
        return (
          <div key={`${node.label}-${index}`} className={`project-visual-node project-visual-node-${index + 1}`}>
            <span>
              <NodeIcon size={index === 0 ? 24 : 20} />
            </span>
            <small>{node.label}</small>
          </div>
        );
      })}
    </>
  );
}

function CaseTextBlock({
  icon: Icon,
  label,
  title,
  text
}: {
  icon: LucideIcon;
  label: string;
  title: string;
  text: string;
}) {
  if (!text) return null;
  return (
    <section className="project-case-panel">
      <span className="project-case-card-icon" aria-hidden="true">
        <Icon size={18} />
      </span>
      <div>
        <p className="project-case-eyebrow">{label}</p>
        <h3>{title}</h3>
        <p>{smartText(text, 235)}</p>
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
  icon: LucideIcon;
  label: string;
  title: string;
  items: string[];
}) {
  if (items.length === 0) return null;
  return (
    <section className="project-case-panel project-case-panel-list">
      <span className="project-case-card-icon" aria-hidden="true">
        <Icon size={18} />
      </span>
      <div>
        <p className="project-case-eyebrow">{label}</p>
        <h3>{title}</h3>
        <ul className="project-case-list">
          {uniqueItems(items).slice(0, 5).map((item, index) => (
            <li key={item}>
              <span aria-hidden="true">
                <ListBulletIcon index={index} />
              </span>
              <p>{cleanListText(item, 132)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ListBulletIcon({ index }: { index: number }) {
  const icons = [Sparkles, BadgeCheck, Layers, Cpu, BrainCircuit];
  const Icon = icons[index % icons.length];
  return <Icon size={12} />;
}

function evidenceBadge(status: string) {
  return evidencePresentation[status] ?? { label: status || "Evidence status", tone: "partial" };
}

function projectVisualSceneFromContent(project: ProjectCardData, CategoryIcon: LucideIcon, visualLabel: string): VisualScene {
  const focus = uniqueItems([project.domain, ...project.tags, ...project.technologies]).slice(0, 3);
  return {
    className: `scene-${project.sourceSlug}`,
    variant: "fallback",
    kicker: compactText(project.title, 28),
    caption: smartText(project.heroSummary || project.finalPortfolioCopy || project.heroExcerpt, 130),
    nodes: [
      { label: compactText(visualLabel, 24), icon: CategoryIcon },
      { label: compactText(focus[0] ?? project.domain, 28), icon: Database },
      { label: compactText(focus[1] ?? "Workflow", 24), icon: Workflow },
      { label: compactText(focus[2] ?? "Delivery", 24), icon: BadgeCheck }
    ],
    signals: uniqueItems([project.category, project.domain, ...project.tags]).slice(0, 3).map((item) => compactText(item, 18)),
    metrics: uniqueItems([visualLabel, project.domain, ...project.tags]).slice(0, 4).map((item) => compactText(item, 18))
  };
}

function workedOnText(project: ProjectCardData) {
  const base = project.role ? `Worked as ${project.role}.` : "";
  const featureSummary = project.keyFeatures.length > 0 ? `Designed and implemented ${joinReadable(project.keyFeatures.slice(0, 3))}.` : "";
  const design = featureSummary || project.roleDetail || project.solution || project.architecture || project.heroSummary || project.heroExcerpt;
  return smartText(`${base} ${design}`, 320);
}

function joinReadable(items: string[]) {
  const cleaned = items.map((item) => compactText(item, 64).replace(/\.$/, ""));
  if (cleaned.length <= 1) return cleaned[0] ?? "";
  if (cleaned.length === 2) return `${cleaned[0]} and ${cleaned[1]}`;
  return `${cleaned.slice(0, -1).join(", ")}, and ${cleaned[cleaned.length - 1]}`;
}

function compactText(text: string, max = 92) {
  const normalized = normalizeCopy(text);
  if (normalized.length <= max) return normalized;
  const sliced = normalized.slice(0, max - 1);
  const boundary = sliced.lastIndexOf(" ");
  return sliced.slice(0, boundary > 42 ? boundary : max - 1).replace(/[.,;:\s]+$/, "");
}

function sentenceCase(text: string) {
  if (!text) return text;
  return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
}

function cleanListText(text: string, max = 118) {
  return sentenceCase(smartText(text, max).replace(/\.$/, ""));
}

function uniqueItems(items: string[]) {
  const seen = new Set<string>();
  return items
    .map((item) => compactText(item, 160).replace(/\.$/, ""))
    .filter((item) => item.length > 0)
    .filter((item) => {
      const key = item.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function normalizeCopy(text: string) {
  return text
    .replace(/(?:^|\s)\d+\.\s+/g, " ")
    .replace(/(?:^|\s)[*-]\s+/g, " ")
    .replace(/\s*\.\.\.\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function smartText(text: string, max = 180) {
  const normalized = normalizeCopy(text);
  if (normalized.length <= max) return normalized;

  const sentences = normalized.match(/[^.!?]+[.!?]+/g)?.map((sentence) => sentence.trim()) ?? [];
  const firstSentence = sentences[0];
  if (firstSentence && firstSentence.length <= max) return firstSentence;

  const softStops = [". ", "; ", ", ", " and ", " with ", " using ", " across ", " into "];
  for (const stop of softStops) {
    const index = normalized.lastIndexOf(stop, max);
    if (index > 72) {
      return normalized.slice(0, index).replace(/[.,;:\s]+$/, "");
    }
  }

  return compactText(normalized, max);
}

function cardSummary(project: ProjectCardData, compact = false) {
  const max = compact ? 150 : 190;
  return projectSummary(project, max);
}

function capabilityItems(project: ProjectCardData) {
  const source = project.technologies.length > 0 ? project.technologies : project.tags;
  return uniqueItems(source)
    .filter((item) => !/needs confirmation/i.test(item))
    .slice(0, 7)
    .map((item) => compactText(item, 44));
}

function projectSummary(project: ProjectCardData, max = 190) {
  return smartText(projectSummaryOverrides[project.sourceSlug] || project.heroSummary || project.finalPortfolioCopy || project.heroExcerpt, max);
}
