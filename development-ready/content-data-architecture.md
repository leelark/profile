# Content Data Architecture

## Content Source

The source of truth for content is:

- `portfolio-content/`

The development implementation should not treat old codebase files, ZIP exports, or binary decks as runtime content. Those have already been analyzed and converted into public-safe Markdown.

## Content Types

### Profile

Source folder:

- `portfolio-content/profile/`

Content includes:

- profile detail
- education and experience
- expertise, skills, certifications, publication
- contact and professional links

### Project

Source folders:

- `portfolio-content/projects/client-projects/`
- `portfolio-content/projects/plugins/`
- `portfolio-content/projects/innovative-projects/`
- `portfolio-content/projects/accelerators/`

Primary categories:

- Client Projects
- Plugins
- Innovative Projects
- Accelerators

### Strategy

Source folder:

- `portfolio-content/strategy/`

Use for:

- content model
- category rules
- website theme and layout
- visual design system
- publish readiness

### Source Summaries

Source folder:

- `portfolio-content/source-copies/`

Use for internal evidence only, not public page copy.

## Recommended Data Model

### Project Summary Shape

```ts
type ProjectCategory =
  | "Client Projects"
  | "Plugins"
  | "Innovative Projects"
  | "Accelerators";

type EvidenceStatus =
  | "Confirmed"
  | "Partially Confirmed"
  | "Needs Confirmation";

type ProjectSummary = {
  slug: string;
  title: string;
  category: ProjectCategory;
  secondaryCategories: string[];
  evidenceStatus: EvidenceStatus;
  evidenceBasis: string;
  heroSummary: string;
  domain?: string;
  role: string;
  tags: string[];
  featured: boolean;
  recommendedOrder: number;
};
```

### Project Detail Shape

```ts
type ProjectDetail = ProjectSummary & {
  projectContext: string;
  problem: string;
  myRole: string;
  usersAndStakeholders: string[];
  solutionOverview: string;
  architectureAndTechnicalApproach: string;
  keyFeatures: string[];
  uxAndProductDecisions: string[];
  businessValue: string[];
  technologiesAndAppianCapabilities: string[];
  suggestedWebsiteSections: string[];
  suggestedVisuals: string[];
  finalPortfolioCopy: string;
  confirmationNeeded: string[];
};
```

### Accelerator Catalog Shape

Use this special type for `portfolio-content/projects/accelerators/accelerator-catalog.md`. It is not a normal project detail page.

```ts
type AcceleratorCatalog = {
  slug: "accelerator-catalog";
  title: string;
  category: "Accelerators";
  secondaryCategories: string[];
  evidenceStatus: "Partially Confirmed";
  evidenceBasis: string;
  purpose: string;
  publicSafePublishingRules: string[];
  acceleratorGroups: {
    title: string;
    items: { title: string; slug: string }[];
  }[];
  featuredAccelerators: string[];
  portfolioPositioning: string[];
  finalPortfolioCopy: string;
  confirmationNeeded: string[];
};
```

### Profile Shape

```ts
type Profile = {
  name: string;
  primaryRole: string;
  secondaryRoles: string[];
  heroCopy: string;
  shortBio: string;
  longBio: string;
  strengths: string[];
  domains: string[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: Certification[];
  publications: Publication[];
  links: ContactLink[];
};
```

## Route Data Mapping

| Route | Data |
| --- | --- |
| `/` | profile, featured projects, expertise pillars, proof strip |
| `/work` | all project summaries |
| `/work/client-projects` | client project summaries |
| `/work/plugins` | plugin summaries |
| `/work/innovative-projects` | innovative project summaries |
| `/work/accelerators` | accelerator summaries |
| `/work/[slug]` | project detail |
| `/expertise` | skills, expertise pillars, linked projects |
| `/plugins-and-accelerators` | plugin pages and accelerator catalog |
| `/about` | profile detail |
| `/resume` | experience, education, certifications, publication |
| `/contact` | contact links and Splitforms form |

## Featured Project Rules

Homepage featured projects:

1. ClaimRoute IQ
2. Knowledge Center Chatbot / DocBot
3. Appian Accelerate Program
4. EBRD ASB Modernization
5. Custom HTML Document Viewer Plugin
6. Appian Server Metrics Performance Triage Accelerator

Featured accelerator library items:

1. Appian Server Metrics Performance Triage Accelerator
2. Appian Monitoring and Observability Accelerator
3. Dynamic Editable Grid Accelerator
4. Formatted Excel Import/Export Accelerator
5. Appian Dependency Governance Accelerator
6. Appian AI Document Intelligence Enablement

## Evidence Handling

Public rendering rules:

- `Confirmed`: can be presented confidently if no confidentiality issue remains.
- `Partially Confirmed`: use careful language and avoid strong implementation claims.
- `Needs Confirmation`: keep out of public site or render only in draft/private mode.

Draft mode can show:

- evidence basis
- confirmation needed
- private notes

Public mode should hide:

- confirmation needed
- internal source names where sensitive
- raw evidence notes

## Content Normalization Rules

Detailed normalization rules are defined in `development-ready/content-normalization-contract.md`.

When converting Markdown into website data:

- keep headings consistent
- generate slugs from file names
- normalize categories exactly
- preserve evidence status
- convert bullet lists into arrays where useful
- keep long narrative fields as rich text or MDX
- do not invent metrics
- do not expose source paths publicly

## Search and Filter Data

Project cards should support filtering by:

- primary category
- secondary category
- tags
- evidence status
- featured
- domain
- role

Optional search fields:

- title
- summary
- tags
- technologies
- business value

## Public-Safe Validation

Before content is published:

- scan for client names not approved for publication
- scan for raw environment names
- scan for tokens and keys
- scan for raw Appian object IDs
- scan for source ZIP names
- scan for internal ticket labels
- scan for unverified metrics

## Content Build Output

Implementation can generate:

- `allProjects`
- `featuredProjects`
- `projectsByCategory`
- `allAccelerators`
- `featuredAccelerators`
- `allPlugins`
- `expertisePillars`
- `profile`
- `resumeTimeline`

The actual file names and module layout should be decided during implementation.
