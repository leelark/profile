import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

const legacyProjectSlugs = [
  "ebrd-asb-modernization",
  "rapid2-hsbc-horizon-scanning",
  "invesco-aml-change-management",
  "invesco-reconciliation-system",
  "carlyle-bridge-module"
];
const mergedAcceleratorSlugs = [
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
const excludedProjectSlugs = [...legacyProjectSlugs, ...mergedAcceleratorSlugs];
const basePath = "/profile/";
const excludedSitemapPaths = [`${basePath}thanks/`];

export default defineConfig({
  site: "https://leelark.github.io",
  base: basePath,
  output: "static",
  trailingSlash: "always",
  integrations: [
    react(),
    sitemap({
      filter: (page) =>
        !excludedSitemapPaths.some((path) => page.includes(path)) &&
        !excludedProjectSlugs.some((slug) => page.includes(`${basePath}work/${slug}/`))
    })
  ],
  vite: {
    build: {
      assetsInlineLimit: 0
    }
  }
});
