import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const keyWorksPage = fs.readFileSync(path.join(root, "src", "pages", "key-works.astro"), "utf8");
const oldPage = fs.readFileSync(path.join(root, "src", "pages", "plugins-and-accelerators.astro"), "utf8");
const layout = fs.readFileSync(path.join(root, "src", "layouts", "BaseLayout.astro"), "utf8");
const showcase = fs.readFileSync(path.join(root, "src", "components", "FeaturedWorksShowcase.tsx"), "utf8");
const globalStyles = fs.readFileSync(path.join(root, "src", "styles", "global.css"), "utf8");

const requiredPageText = [
  "<p class=\"eyebrow\">Enterprise Appian Delivery</p>",
  "<h1><span>Key Appian Work</span> Systems</h1>",
  "A focused portfolio view of reusable Appian plugins, audit foundations, decision flows, and platform diagnostics shaped into practical delivery systems.",
  "key-system-visual",
  "key-system-header",
  "Work Systems",
  "Reusable modules",
  "Audit & diagnostics",
  "Decisioning",
  "field-level-audit-framework",
  "color-picker-component-plugin",
  "appian-server-metrics-performance-triage",
  "no-claim-discount-poc",
  "knowledge-center-chatbot-docbot",
  "FeaturedWorksShowcase"
];

const requiredShowcaseText = [
  "Appian Plugin Portfolio",
  "key-plugin-tabs",
  "SAIL component plugin",
  "Smart service plugin",
  "key-plugin-showcase",
  "Locale Date/DateTime Picker",
  "Color Picker",
  "HTML Document Viewer",
  "Document Text Highlighter",
  "HTML Viewer",
  "HTML/DOCx to Accessible PDF",
  "Smart service plugin",
  "Accessible output",
  "key-plugin-orbit"
];

const failures = [];

for (const text of requiredPageText) {
  if (!keyWorksPage.includes(text)) {
    failures.push(`key works page missing: ${text}`);
  }
}

for (const text of requiredShowcaseText) {
  if (!showcase.includes(text)) {
    failures.push(`key works showcase missing: ${text}`);
  }
}

if (!layout.includes('{ path: "/key-works", label: "Key Works" }')) {
  failures.push("primary navigation does not point to /key-works");
}

if (!oldPage.includes('const targetPath = "/key-works"')) {
  failures.push("old plugins-and-accelerators route does not redirect to /key-works");
}

if (layout.includes("Reusable Assets")) {
  failures.push("old Reusable Assets navigation label is still present");
}

if (keyWorksPage.includes("Appian Plugins & Audit Assets")) {
  failures.push("old plugin-only page headline is still present");
}

for (const removedAiHeroText of [
  "Applied Appian + AI Work",
  "AI-assisted flows",
  "AI + diagnostics",
  "AI flows",
  "AI decision flow",
  "Knowledge AI"
]) {
  if (keyWorksPage.includes(removedAiHeroText)) {
    failures.push(`old AI-forward hero text still present: ${removedAiHeroText}`);
  }
}

for (const removedText of ["Featured flows", "Workflow flows", "key-flow-lab", "key-flow-grid", "FlowBoard"]) {
  if (showcase.includes(removedText) || keyWorksPage.includes(removedText) || globalStyles.includes(removedText)) {
    failures.push(`removed featured flows section still present: ${removedText}`);
  }
}

for (const removedHeroText of [
  "Featured works",
  "Featured Appian plugins",
  "Plugins + AI + Ops",
  "plugin works",
  "Enterprise work map",
  "Component layer",
  "Audit delta",
  "Field change trail",
  "Triage signals",
  "key-panel-slab",
  "key-panel-card",
  "key-hero-diagram",
  "key-diagram-card",
  "key-mini-window",
  "key-component-chips"
]) {
  if (keyWorksPage.includes(removedHeroText) || globalStyles.includes(removedHeroText)) {
    failures.push(`old hero treatment still present: ${removedHeroText}`);
  }
}

for (const removedPluginText of [
  "Plugin set",
  "Appian extensions for richer enterprise experiences.",
  "Component and smart service work across documents, localized inputs, embedded HTML, and accessible PDF generation.",
  "Component plugins with clear UI and handoff boundaries.",
  "Document viewers, highlighting, HTML surfaces, and controlled Appian event exchange.",
  "Reusable extensions built around real interface needs.",
  "Plugin portfolio summary",
  "Featured extensions",
  "Component plugins",
  "key-plugin-proof",
  "key-plugin-window",
  "key-plugin-system",
  "Extension layer",
  "key-plugin-system-node"
]) {
  if (showcase.includes(removedPluginText) || globalStyles.includes(removedPluginText)) {
    failures.push(`old plugin section treatment still present: ${removedPluginText}`);
  }
}

if (failures.length > 0) {
  console.error(`key_works_page_failures=${failures.length}`);
  for (const failure of failures) {
    console.error(`FAIL ${failure}`);
  }
  process.exit(1);
}

console.log("key_works_page=pass");
