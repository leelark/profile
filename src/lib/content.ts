import { excerpt, renderMarkdown, slugify, splitBullets, splitParagraphs, stripMarkdown } from "./markdown";

export type ProjectCategory = "Client Projects" | "Plugins" | "Innovative Projects" | "Accelerators";
export type CategorySlug = "client-projects" | "plugins" | "innovative-projects" | "accelerators";
export type EvidenceStatus = "Confirmed" | "Partially Confirmed" | "Needs Confirmation";
export type PublicVisibility = "public" | "needs-confirmation";

export type ContentSection = {
  title: string;
  body: string;
  html: string;
};

export type ProjectDetail = {
  slug: string;
  publicSlug: string;
  title: string;
  category: ProjectCategory;
  categorySlug: CategorySlug;
  secondaryCategories: string[];
  evidenceStatus: EvidenceStatus;
  evidenceBasis: string;
  heroSummary: string;
  heroExcerpt: string;
  finalPortfolioCopy: string;
  role: string;
  domain: string;
  tags: string[];
  featured: boolean;
  recommendedOrder: number;
  publicVisibility: PublicVisibility;
  sourcePath: string;
  sections: ContentSection[];
  keyFeatures: string[];
  businessValue: string[];
  technologies: string[];
  confirmationNeeded: string[];
};

export type ProjectCardPayload = {
  sourceSlug: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  categorySlug: CategorySlug;
  evidenceStatus: EvidenceStatus;
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

export type Profile = {
  name: string;
  primaryRole: string;
  heroCopy: string;
  shortBio: string;
  longBio: string;
  strengths: string[];
  domains: string[];
  homepageSummary: string;
  aboutClosingCopy: string;
};

export type ExpertiseArea = {
  title: string;
  summary: string;
  capabilities: string[];
};

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  positioning: string;
  resumeCopy: string;
  responsibilities: string[];
  representativeWork: string[];
};

export type EducationItem = {
  institution: string;
  qualification: string;
  year: string;
  score?: string;
};

export type Certification = {
  title: string;
  score?: string;
  websiteCopy: string;
};

export type TechnicalSkill = {
  name: string;
  note: string;
};

export type TechnicalSkillGroup = {
  title: string;
  summary: string;
  skills: TechnicalSkill[];
};

const projectModules = import.meta.glob<string>("../../portfolio-content/projects/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true
});

import profileDetailRaw from "../../portfolio-content/profile/profile-detail.md?raw";
import expertiseRaw from "../../portfolio-content/profile/expertise-skills-certifications.md?raw";
import experienceRaw from "../../portfolio-content/profile/education-experience.md?raw";
import contactRaw from "../../portfolio-content/profile/contact-and-links.md?raw";

export const categoryLabels: Record<CategorySlug, ProjectCategory> = {
  "client-projects": "Client Projects",
  plugins: "Plugins",
  "innovative-projects": "Innovative Projects",
  accelerators: "Accelerators"
};

export const categoryDescriptions: Record<CategorySlug, string> = {
  "client-projects": "Enterprise client delivery, advisory, workflow modernization, and Appian architecture work.",
  plugins: "Custom Appian component and plugin innovation for document, HTML, PDF, and interaction-heavy use cases.",
  "innovative-projects": "Product-style POCs across claims, knowledge discovery, government services, decisioning, and workflow automation.",
  accelerators: "Appian Accelerate Program workstreams spanning advisory reviews, platform health, observability, file automation, governance, integration, and AI readiness."
};

const featuredSlugs = [
  "claimroute-iq",
  "knowledge-center-chatbot-docbot",
  "appian-accelerate-program",
  "ebrd-asb-modernization",
  "custom-html-document-viewer-plugin",
  "appian-server-metrics-performance-triage"
];

const featuredAcceleratorSlugs = [
  "appian-server-metrics-performance-triage",
  "appian-monitoring-observability-accelerator"
];

export const standaloneAcceleratorSlugs = [
  "appian-server-metrics-performance-triage",
  "appian-monitoring-observability-accelerator"
];

export const mergedAcceleratorSlugs = [
  "appian-ai-document-intelligence-enablement",
  "appian-best-practices-governance-review",
  "appian-cloud-operating-model-advisory",
  "appian-dependency-governance-accelerator",
  "appian-deployment-devops-governance",
  "appian-health-check-risk-review",
  "autonomous-client-transition-knowledge-absorption",
  "device-access-audit-accelerator",
  "document-merge-integrity-rca",
  "dynamic-editable-grid-accelerator",
  "editable-paragraph-grid-accelerator",
  "enterprise-document-chatbot-improvement-accelerator",
  "excel-merge-large-export",
  "formatted-excel-import-export",
  "hierarchical-data-entry-ux-redesign",
  "message-queue-consumption-modernization",
  "notification-api-reliability-accelerator",
  "pdf-reconciliation-viewer-compatibility-rca",
  "process-hq-readiness-accelerator",
  "secure-snowflake-connectivity-accelerator",
  "transaction-manager-sql-portability-accelerator"
];

const categoryOrder: Record<ProjectCategory, number> = {
  "Client Projects": 10,
  Plugins: 20,
  "Innovative Projects": 30,
  Accelerators: 40
};

const publicProjectTitles: Record<string, string> = {
  "ebrd-asb-modernization": "Advisor Services Platform Modernization",
  "rapid2-hsbc-horizon-scanning": "Regulatory Horizon Scanning Platform",
  "invesco-aml-change-management": "Investment Management AML and Change Management",
  "invesco-reconciliation-system": "Investment Operations Reconciliation System",
  "carlyle-bridge-module": "Finance Document Bridge Module",
  "field-level-audit-framework": "Field-Level Audit Framework",
  "appian-server-metrics-performance-triage": "Server Side Metrics Evaluation",
  "appian-monitoring-observability-accelerator": "Log Streaming",
  "formatted-excel-import-export": "Import / Export Formatted Excel"
};

const publicProjectSlugs: Record<string, string> = {
  "ebrd-asb-modernization": "advisor-services-platform-modernization",
  "rapid2-hsbc-horizon-scanning": "regulatory-horizon-scanning-platform",
  "invesco-aml-change-management": "investment-management-aml-change-management",
  "invesco-reconciliation-system": "investment-operations-reconciliation-system",
  "carlyle-bridge-module": "finance-document-bridge-module"
};

const publicTextReplacements: Array<[RegExp, string]> = [
  [/\bEuropean Bank for Reconstruction and Development\b/g, "regional development finance institution"],
  [/\bEBRD's\b/g, "the development finance institution's"],
  [/\bEBRD\b/g, "development finance institution"],
  [/\bRAPID2\b/g, "regulatory horizon-scanning platform"],
  [/\bRapid2\b/g, "regulatory horizon-scanning platform"],
  [/\bHSBC's\b/g, "the global banking client's"],
  [/\bHSBC\b/g, "global banking client"],
  [/\bInvesco\b/g, "investment management client"],
  [/\bCarlyle\b/g, "major investment firm"],
  [/\bASB\b/g, "advisor-services platform"],
  [/\bMonarch\b/g, "external enterprise system"],
  [/\bREGMAP\b/g, "regulatory mapping integration"],
  [/\blegacy EGP and BAS Appian applications\b/g, "legacy advisor-service Appian applications"],
  [/\bEGP and BAS\b/g, "legacy advisory applications"],
  [/\bEGP\/BAS\b/g, "legacy advisory applications"],
  [/\bEGP\b/g, "legacy advisory application"],
  [/\bBAS\b/g, "legacy advisory application"]
];

function publicText(value: string) {
  return publicTextReplacements.reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), value);
}

function headingSection(source: string, heading: string) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = source.match(new RegExp(`(?:^|\\n)## ${escaped}\\s*\\n([\\s\\S]*?)(?=\\n## |$)`));
  return match?.[1]?.trim() ?? "";
}

function allSections(source: string) {
  const matches = [...source.matchAll(/(?:^|\n)##\s+(.+)\s*\n([\s\S]*?)(?=\n##\s+|$)/g)];
  const skippedPublicSections = new Set(["Evidence Basis", "Confirmation Needed"]);
  return matches.map((match) => ({
    title: match[1].trim(),
    body: publicText(match[2]).trim(),
    html: renderMarkdown(publicText(match[2]))
  })).filter((section) => !skippedPublicSections.has(section.title));
}

function firstHeading(source: string) {
  return source.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? "Untitled";
}

function field(source: string, name: string) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return source.match(new RegExp(`^${escaped}:\\s*(.+)$`, "m"))?.[1]?.trim() ?? "";
}

function categorySlug(category: ProjectCategory): CategorySlug {
  const entry = Object.entries(categoryLabels).find(([, label]) => label === category);
  return (entry?.[0] ?? "client-projects") as CategorySlug;
}

function categoryFromPath(path: string): ProjectCategory {
  if (path.includes("/plugins/")) return "Plugins";
  if (path.includes("/innovative-projects/")) return "Innovative Projects";
  if (path.includes("/accelerators/")) return "Accelerators";
  return "Client Projects";
}

function slugFromPath(path: string) {
  return path.split(/[\\/]/).pop()?.replace(/\.md$/, "") ?? slugify(path);
}

function roleFor(project: { category: ProjectCategory; slug: string; title: string }) {
  if (project.category === "Plugins") return "Plugin Developer and Component Designer";
  if (project.category === "Accelerators") return "Solution Architect, Appian Accelerate Program";
  if (project.slug.includes("claimroute") || project.slug.includes("knowledge-center")) return "AI Solution Designer and Product Builder";
  if (project.slug.includes("accelerate")) return "Lead Consultant and Appian Accelerate Contributor";
  return "Appian Solution Consultant and Technical Lead";
}

function domainFor(project: { category: ProjectCategory; slug: string; secondaryCategories: string[] }) {
  if (project.slug.includes("claim")) return "Insurance and claims automation";
  if (project.slug.includes("knowledge") || project.slug.includes("chatbot")) return "Enterprise knowledge management";
  if (project.slug.includes("ebrd")) return "Finance advisory workflow";
  if (project.slug.includes("invesco")) return "Investment management";
  if (project.slug.includes("hsbc") || project.slug.includes("rapid")) return "Banking and regulatory workflow";
  if (project.category === "Plugins") return "Appian component innovation";
  if (project.slug.includes("server-metrics")) return "Appian Accelerate Program";
  if (project.slug.includes("monitoring") || project.slug.includes("observability")) return "Appian Accelerate Program";
  if (project.slug.includes("formatted-excel")) return "Appian Accelerate Program";
  if (project.category === "Accelerators") return "Appian Accelerate Program";
  return project.secondaryCategories[0] ?? "Enterprise workflow automation";
}

function tagsFor(project: {
  category: ProjectCategory;
  secondaryCategories: string[];
  keyFeatures: string[];
  technologies: string[];
}) {
  const combined = [...project.secondaryCategories, ...project.technologies.slice(0, 4), ...project.keyFeatures.slice(0, 2)];
  const seen = new Set<string>();
  return combined
    .map((tag) => stripMarkdown(tag).replace(/\.$/, ""))
    .filter((tag) => tag.length > 2)
    .filter((tag) => {
      const key = tag.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 7);
}

function workflowStepsFor(project: { category: ProjectCategory; slug: string }) {
  if (project.slug === "appian-accelerate-program") {
    return ["Requirement signal", "Technical review", "Accelerator pattern", "Client guidance", "Reusable library"];
  }

  if (project.slug.includes("server-metrics")) {
    return ["Health Check export", "Python analysis", "KPI scoring", "Capacity view", "Remediation plan"];
  }

  if (project.slug.includes("monitoring") || project.slug.includes("observability")) {
    return ["Log stream", "Metric catalog", "Stability hierarchy", "Dashboard map", "Triage action"];
  }

  if (project.slug.includes("claimroute")) {
    return ["Claim intake", "AI classification", "Routing decision", "Human review", "Resolution workflow"];
  }

  if (project.slug.includes("knowledge") || project.slug.includes("chatbot")) {
    return ["Question", "Knowledge index", "AI response", "Source evidence", "Feedback loop"];
  }

  if (project.slug.includes("document") || project.slug.includes("viewer") || project.slug.includes("pdf")) {
    return ["Document input", "Viewer layer", "Evidence mapping", "User action", "Appian save"];
  }

  if (project.category === "Plugins") {
    return ["Appian interface", "Component plugin", "Event bridge", "Data capture", "Workflow handoff"];
  }

  if (project.category === "Accelerators") {
    return ["Accelerate intake", "Architect review", "Workstream design", "Client enablement", "Adoption path"];
  }

  if (project.category === "Innovative Projects") {
    return ["Opportunity", "Product model", "Decision logic", "Workflow UX", "Outcome review"];
  }

  return ["Requirements", "Records model", "Process model", "Integration", "Governance"];
}

function parseProject(path: string, raw: string): ProjectDetail {
  const slug = slugFromPath(path);
  const publicSlug = publicProjectSlugs[slug] ?? slug;
  const title = publicProjectTitles[slug] ?? publicText(firstHeading(raw));
  const category = (field(raw, "Primary Category") as ProjectCategory) || categoryFromPath(path);
  const secondaryCategories = splitBullets(
    publicText(raw.match(/^Secondary Categories:\s*\n([\s\S]*?)(?=^Evidence Status:)/m)?.[1] ?? "")
  );
  const evidenceStatus = ((field(raw, "Evidence Status") || "Needs Confirmation") as EvidenceStatus);
  const evidenceBasis = field(raw, "Evidence Basis");
  const heroSummary = publicText(headingSection(raw, "Hero Summary") || headingSection(raw, "Final Portfolio Copy"));
  const finalPortfolioCopy = publicText(headingSection(raw, "Final Portfolio Copy") || heroSummary);
  const keyFeatures = splitBullets(publicText(headingSection(raw, "Key Features")));
  const businessValue = splitBullets(publicText(headingSection(raw, "Business Value")));
  const technologies = splitBullets(publicText(headingSection(raw, "Technologies and Appian Capabilities")));
  const confirmationNeeded = splitBullets(publicText(headingSection(raw, "Confirmation Needed")));
  const projectSeed = { category, slug, title, secondaryCategories };
  const role = roleFor(projectSeed);
  const domain = domainFor(projectSeed);
  const tags = tagsFor({ category, secondaryCategories, keyFeatures, technologies });
  const recommendedOrder =
    featuredSlugs.includes(slug) ? featuredSlugs.indexOf(slug) + 1 : categoryOrder[category] + title.localeCompare("Z");

  return {
    slug,
    publicSlug,
    title,
    category,
    categorySlug: categorySlug(category),
    secondaryCategories,
    evidenceStatus,
    evidenceBasis,
    heroSummary: stripMarkdown(heroSummary),
    heroExcerpt: excerpt(heroSummary || finalPortfolioCopy, 210),
    finalPortfolioCopy,
    role,
    domain,
    tags,
    featured: featuredSlugs.includes(slug),
    recommendedOrder,
    publicVisibility: evidenceStatus === "Needs Confirmation" ? "needs-confirmation" : "public",
    sourcePath: path,
    sections: allSections(raw).filter((section) => section.title !== "Portfolio Classification"),
    keyFeatures,
    businessValue,
    technologies,
    confirmationNeeded
  };
}

function sectionHtml(source: string, heading: string) {
  return renderMarkdown(headingSection(source, heading));
}

function sectionPlain(source: string, heading: string) {
  return stripMarkdown(headingSection(source, heading));
}

function labelBlock(source: string, label: string) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = source.match(new RegExp(`^${escaped}:\\s*\\n\\n?([\\s\\S]*?)(?=\\n[A-Z][A-Za-z /]+:\\s*\\n|\\n### |\\n## |$)`, "m"));
  return stripMarkdown(match?.[1] ?? "");
}

export const profile: Profile = {
  name: "Leelark Saxena",
  primaryRole: sectionPlain(profileDetailRaw, "Portfolio Role"),
  heroCopy: sectionPlain(profileDetailRaw, "Hero Profile Copy"),
  shortBio: sectionPlain(profileDetailRaw, "Short Bio"),
  longBio: sectionPlain(profileDetailRaw, "Long Bio"),
  strengths: splitBullets(headingSection(profileDetailRaw, "Professional Strengths")),
  domains: splitBullets(headingSection(profileDetailRaw, "Domains")),
  homepageSummary: sectionPlain(profileDetailRaw, "Homepage Profile Summary"),
  aboutClosingCopy: sectionPlain(profileDetailRaw, "About Page Closing Copy")
};

const expertiseAreaOverrides: Record<string, Partial<ExpertiseArea>> = {
  "Enterprise Solution Architecture": {
    summary: "I shape Appian solutions around business outcomes, process clarity, data structure, controls, and delivery sequencing.",
    capabilities: ["requirements to solution scope", "process and data architecture", "security and governance model", "delivery roadmap"]
  },
  "Workflow Automation": {
    summary: "I build enterprise workflows that move work from intake to resolution with clear tasks, routing, exceptions, and traceability.",
    capabilities: ["intake to resolution flow", "task routing and exceptions", "reporting and traceability", "operational handoff"]
  },
  "AI and Document Intelligence": {
    summary: "I use AI where it improves document handling, decision support, evidence review, and knowledge discovery inside governed workflows.",
    capabilities: ["document extraction", "classification and routing", "evidence-backed review", "human approval controls"]
  },
  "Plugin Engineering": {
    summary: "I extend Appian with custom component and smart service plugin patterns for document, HTML, highlighting, and event-driven use cases.",
    capabilities: ["custom SAIL component plugins", "custom smart service plugins", "document viewer patterns", "value bridge and events"]
  },
  "Platform Health and Governance": {
    summary: "I support platform reviews through metrics, logs, performance triage, deployment control, and reusable governance guidance.",
    capabilities: ["health check review", "metrics and log analysis", "performance triage", "governance review"]
  }
};

export const expertiseAreas: ExpertiseArea[] = [
  {
    title: "Enterprise Solution Architecture",
    sourceTitle: "Enterprise Appian Architecture"
  },
  {
    title: "Workflow Automation",
    sourceTitle: "Workflow Automation"
  },
  {
    title: "AI and Document Intelligence",
    sourceTitle: "AI Solution Design"
  },
  {
    title: "Plugin Engineering",
    sourceTitle: "Plugin and Component Development"
  },
  {
    title: "Integration and Data Modeling",
    sourceTitle: ""
  },
  {
    title: "Platform Health and Governance",
    sourceTitle: "Performance, Platform Health, and Governance"
  }
].map(({ title, sourceTitle }) => {
  if (!sourceTitle) {
    return {
      title,
      summary:
        "I connect Appian records, database design, APIs, SQL, reporting, integrations, and operational data flows into reliable enterprise systems.",
      capabilities: [
        "data modeling",
        "record-centric design",
        "SQL and stored procedures",
        "REST and Web APIs",
        "integration design",
        "reporting and reconciliation"
      ]
    };
  }

  const body = expertiseRaw.match(new RegExp(`(?:^|\\n)### ${sourceTitle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\n([\\s\\S]*?)(?=\\n### |\\n## |$)`))?.[1] ?? "";
  const summary = body.match(/^Content for website:\s*\n\n([\s\S]*?)(?=^Capabilities:)/m)?.[1] ?? body;
  const override = expertiseAreaOverrides[title];
  return {
    title,
    summary: override?.summary ?? stripMarkdown(summary),
    capabilities: override?.capabilities ?? splitBullets(body.match(/^Capabilities:\s*\n([\s\S]*)/m)?.[1] ?? "")
  };
});

export const skills = {
  primary: splitBullets(expertiseRaw.match(/^Primary Skills:\s*\n([\s\S]*?)(?=^Secondary Skills:)/m)?.[1] ?? ""),
  secondary: splitBullets(expertiseRaw.match(/^Secondary Skills:\s*\n([\s\S]*?)(?=^Integration and Automation:)/m)?.[1] ?? ""),
  integrationAndAutomation: splitBullets(expertiseRaw.match(/^Integration and Automation:\s*\n([\s\S]*?)(?=\n## |$)/m)?.[1] ?? "")
};

export const technicalSkillGroups: TechnicalSkillGroup[] = [
  {
    title: "Engineering",
    summary: "Application logic, plugin development, UI implementation, backend services, and programming fundamentals.",
    skills: [
      { name: "JavaScript", note: "components and browser behavior" },
      { name: "Java", note: "plugins and backend logic" },
      { name: "HTML", note: "semantic interface structure" },
      { name: "CSS", note: "responsive interface styling" },
      { name: "Node.js", note: "tooling and services" },
      { name: "PHP", note: "web application foundation" },
      { name: "Spring", note: "Java service framework" },
      { name: "C/C++", note: "programming foundation" },
      { name: "R", note: "analysis foundation" }
    ]
  },
  {
    title: "Database",
    summary: "Relational database design and SQL Server delivery support for Appian-backed applications.",
    skills: [
      { name: "MSSQL", note: "queries and data operations" },
      { name: "MS SQL Server", note: "enterprise relational database" }
    ]
  },
  {
    title: "Delivery and Governance",
    summary: "Requirements, testing, performance review, deployment control, platform health, and reusable accelerator design.",
    skills: [
      { name: "Architecture Discovery", note: "scope and process clarity" },
      { name: "Solution Architecture", note: "architecture and delivery model" },
      { name: "Testing", note: "validation and quality control" },
      { name: "Performance Review", note: "logs, metrics, triage" },
      { name: "Governance", note: "dependencies and standards" },
      { name: "Accelerator Design", note: "reusable delivery assets" }
    ]
  }
];

function parseExperience(company: string): ExperienceItem {
  const body = experienceRaw.match(new RegExp(`(?:^|\\n)### ${company.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\n([\\s\\S]*?)(?=\\n### |\\n## |$)`))?.[1] ?? "";
  return {
    company,
    role: field(body, "Role"),
    period: field(body, "Period"),
    positioning: stripMarkdown(body.match(/^Portfolio Positioning:\s*\n\n([\s\S]*?)(?=^Recommended Resume Copy:)/m)?.[1] ?? ""),
    resumeCopy: stripMarkdown(body.match(/^Recommended Resume Copy:\s*\n\n([\s\S]*?)(?=^Key Responsibilities:|^Representative Work:|$)/m)?.[1] ?? ""),
    responsibilities: splitBullets(body.match(/^Key Responsibilities:\s*\n\n([\s\S]*?)(?=^Representative Work:|$)/m)?.[1] ?? ""),
    representativeWork: splitBullets(body.match(/^Representative Work:\s*\n\n([\s\S]*?)(?=^### |^## |$)/m)?.[1] ?? "")
  };
}

export const experience = [
  parseExperience("Yexle Pvt. Limited"),
  parseExperience("Coforge DPA Pvt. Limited"),
  parseExperience("Persistent Systems Ltd")
].filter((item) => item.company && item.role);

export const timeline = splitParagraphs(headingSection(experienceRaw, "Website Timeline Copy"));

export const education: EducationItem[] = [
  { institution: "LNCT Group of Colleges", qualification: "Bachelor of Engineering, Computer Science", year: "2019", score: "CGPA: 8.63" },
  { institution: "Vindhyachal Academy", qualification: "HSSC, 12th", year: "2015", score: "Aggregate: 86.80%" },
  { institution: "Vindhyachal Academy", qualification: "SSC, 10th", year: "2013", score: "CGPA: 8.8" }
];

export const certifications: Certification[] = [
  {
    title: "Appian Level 3 / Appian Certified Lead Developer",
    score: "≈ 92%",
    websiteCopy: labelBlock(expertiseRaw.match(/^### Appian Level 3[\s\S]*?(?=^### Appian Level 2)/m)?.[0] ?? "", "Website Copy")
  },
  {
    title: "Appian Level 2",
    score: "82.5%",
    websiteCopy: labelBlock(expertiseRaw.match(/^### Appian Level 2[\s\S]*?(?=^### Appian Level 1)/m)?.[0] ?? "", "Website Copy")
  },
  {
    title: "Appian Level 1",
    score: "85.2%",
    websiteCopy: labelBlock(expertiseRaw.match(/^### Appian Level 1[\s\S]*?(?=^## Research Publication)/m)?.[0] ?? "", "Website Copy")
  }
];

export const publication = {
  title: field(headingSection(expertiseRaw, "Research Publication"), "Title"),
  publication: field(headingSection(expertiseRaw, "Research Publication"), "Publication"),
  websiteCopy: labelBlock(headingSection(expertiseRaw, "Research Publication"), "Website Copy"),
  publicNote: "International Journal of Computer Applications, Volume 181, Number 22, October 2018, pages 44-50.",
  citation: "Leelark Sharan Saxena. Effective Penetration Testing Approach for Modern Web Application Vulnerabilities. International Journal of Computer Applications 181(22), 44-50, October 2018.",
  doi: "10.5120/ijca2018917958",
  url: "https://www.ijcaonline.org/archives/volume181/number22/30021-2018917958/",
  detailsNeeded: splitBullets(headingSection(headingSection(expertiseRaw, "Research Publication"), "Publication Details Needed Before Website Launch"))
};

export const clientShowcase = ["Invesco", "Carlyle", "HSBC", "KPMG", "EBRD", "Genpact"];

export const appianCapabilityShowcase: TechnicalSkill[] = [
  { name: "Process Design", note: "workflow structure" },
  { name: "SAIL UI Interfaces", note: "user experience" },
  { name: "Records", note: "data-backed views" },
  { name: "Database Modeling", note: "relational data design" },
  { name: "Integrations", note: "system connectivity" },
  { name: "Web APIs", note: "service exposure" },
  { name: "Appian AI Skills", note: "classification and extraction" },
  { name: "Appian AI Agents", note: "reasoning workflows" },
  { name: "SAIL Component Plugin Development", note: "custom interface extension" },
  { name: "Smart Service Plugin Development", note: "process extension" }
];

export const contact = {
  phone: field(headingSection(contactRaw, "Contact Details"), "Phone"),
  location: field(headingSection(contactRaw, "Contact Details"), "Location"),
  email: field(headingSection(contactRaw, "Contact Details"), "Email"),
  headline: sectionPlain(contactRaw, "Contact Page Headline"),
  intro: sectionPlain(contactRaw, "Contact Page Intro"),
  inquiryTypes: splitBullets(headingSection(contactRaw, "Inquiry Types"))
};

export const allProjects = Object.entries(projectModules)
  .map(([path, raw]) => parseProject(path, raw))
  .sort((a, b) => a.recommendedOrder - b.recommendedOrder || a.title.localeCompare(b.title));

export const draftProjects = allProjects.filter((project) => project.publicVisibility !== "public");
export const projects = allProjects.filter((project) => project.slug !== "accelerator-catalog" && project.publicVisibility === "public");
export const acceleratorCatalog = allProjects.find((project) => project.slug === "accelerator-catalog");
export const acceleratorSuiteProjects = projects.filter((project) => mergedAcceleratorSlugs.includes(project.slug));
export const standaloneAccelerators = projects.filter((project) => standaloneAcceleratorSlugs.includes(project.slug));
export const portfolioProjects = projects.filter(
  (project) => project.category !== "Accelerators" || standaloneAcceleratorSlugs.includes(project.slug)
);
export const featuredProjects = featuredSlugs
  .map((slug) => portfolioProjects.find((project) => project.slug === slug))
  .filter((project): project is ProjectDetail => Boolean(project));
export const featuredAccelerators = featuredAcceleratorSlugs
  .map((slug) => standaloneAccelerators.find((project) => project.slug === slug))
  .filter((project): project is ProjectDetail => Boolean(project));
export const projectsByCategory = Object.fromEntries(
  Object.entries(categoryLabels).map(([slug, label]) => [slug, projects.filter((project) => project.category === label)])
) as Record<CategorySlug, ProjectDetail[]>;
export const portfolioProjectsByCategory = Object.fromEntries(
  Object.entries(categoryLabels).map(([slug, label]) => [slug, portfolioProjects.filter((project) => project.category === label)])
) as Record<CategorySlug, ProjectDetail[]>;

export const stats = [
  { label: "Experience", value: "6+ years" },
  { label: "Portfolio items", value: `${portfolioProjects.length}` },
  { label: "Accelerator suite", value: `${acceleratorSuiteProjects.length}+` },
  { label: "Core focus", value: "Appian delivery" }
];

export const renderedProfile = {
  longBio: sectionHtml(profileDetailRaw, "Long Bio"),
  aboutClosingCopy: renderMarkdown(profile.aboutClosingCopy)
};

export function projectToCard(project: ProjectDetail): ProjectCardPayload {
  const plainSection = (title: string) => stripMarkdown(project.sections.find((section) => section.title === title)?.body ?? "");

  return {
    sourceSlug: project.slug,
    slug: project.publicSlug,
    title: project.title,
    category: project.category,
    categorySlug: project.categorySlug,
    evidenceStatus: project.evidenceStatus,
    heroExcerpt: project.heroExcerpt,
    heroSummary: project.heroSummary,
    role: project.role,
    domain: project.domain,
    tags: project.tags,
    workflowSteps: workflowStepsFor(project),
    acceleratorHighlights:
      project.slug === "appian-accelerate-program"
        ? [...standaloneAccelerators, ...acceleratorSuiteProjects].slice(0, 12).map((item) => item.title)
        : [],
    keyFeatures: project.keyFeatures.slice(0, 6),
    businessValue: project.businessValue.slice(0, 5),
    technologies: project.technologies.slice(0, 8),
    context: plainSection("Project Context"),
    roleDetail: plainSection("My Role"),
    uxDecisions: splitBullets(project.sections.find((section) => section.title === "UX and Product Decisions")?.body ?? "").slice(0, 5),
    finalPortfolioCopy: stripMarkdown(project.finalPortfolioCopy),
    problem: plainSection("Problem"),
    solution: plainSection("Solution Overview"),
    architecture: plainSection("Architecture and Technical Approach")
  };
}
