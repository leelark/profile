import type { ProjectDetail } from "./content";
import { profile } from "./content";
import { canonicalUrl } from "./paths";

type StructuredData = Record<string, unknown>;

const personId = canonicalUrl("/#person");
const websiteId = canonicalUrl("/#website");

const knowsAbout = [
  "Appian",
  "Appian AI",
  "Appian Records",
  "SAIL",
  "Process Models",
  "Plugin Development",
  "Enterprise Workflow Automation",
  "Document Intelligence",
  "Integration Architecture",
  "Platform Governance"
];

function withContext(data: StructuredData): StructuredData {
  return {
    "@context": "https://schema.org",
    ...data
  };
}

export function personStructuredData(): StructuredData {
  return withContext({
    "@type": "Person",
    "@id": personId,
    name: profile.name,
    url: canonicalUrl("/"),
    email: "mailto:leelarksaxena1997@outlook.com",
    jobTitle: "Enterprise Appian Solution Architect",
    description: profile.homepageSummary,
    knowsAbout
  });
}

export function websiteStructuredData(): StructuredData {
  return withContext({
    "@type": "WebSite",
    "@id": websiteId,
    name: "Leelark Saxena Portfolio",
    url: canonicalUrl("/"),
    description: profile.homepageSummary,
    author: {
      "@id": personId
    }
  });
}

export function webPageStructuredData({
  type = "WebPage",
  name,
  description,
  path
}: {
  type?: "WebPage" | "ProfilePage" | "ContactPage" | "CollectionPage";
  name: string;
  description: string;
  path: string;
}): StructuredData {
  return withContext({
    "@type": type,
    name,
    description,
    url: canonicalUrl(path),
    isPartOf: {
      "@id": websiteId
    },
    about: {
      "@id": personId
    }
  });
}

export function breadcrumbStructuredData(items: Array<{ name: string; path: string }>): StructuredData {
  return withContext({
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.path)
    }))
  });
}

export function projectItemListStructuredData(projects: ProjectDetail[]): StructuredData {
  return withContext({
    "@type": "ItemList",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.title,
        description: project.heroExcerpt,
        genre: project.category
      }
    }))
  });
}

export function collectionPageStructuredData({
  name,
  description,
  path,
  projects,
  breadcrumbs
}: {
  name: string;
  description: string;
  path: string;
  projects: ProjectDetail[];
  breadcrumbs: Array<{ name: string; path: string }>;
}): StructuredData[] {
  return [
    webPageStructuredData({ type: "CollectionPage", name, description, path }),
    projectItemListStructuredData(projects),
    breadcrumbStructuredData(breadcrumbs)
  ];
}
