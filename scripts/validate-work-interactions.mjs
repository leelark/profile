import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const read = (path) => readFileSync(join(root, path), "utf8");
const failures = [];

const builtPages = [
  "dist/work/index.html",
  "dist/key-works/index.html"
];
const workSourcePages = [
  "src/pages/work/index.astro",
  "src/pages/work/client-projects.astro",
  "src/pages/work/plugins.astro",
  "src/pages/work/innovative-projects.astro",
  "src/pages/work/accelerators.astro"
];

for (const page of workSourcePages) {
  if (/data-reveal="section"[\s\S]{0,260}<ProjectExplorer/.test(read(page))) {
    failures.push(`${page}: interactive ProjectExplorer is wrapped in a hidden reveal container`);
  }
}

if (/data-reveal="section"[\s\S]{0,260}<FeaturedWorksShowcase/.test(read("src/pages/key-works.astro"))) {
  failures.push("src/pages/key-works.astro: interactive FeaturedWorksShowcase is wrapped in a hidden reveal container");
}

for (const page of builtPages) {
  const html = read(page);

  if (/class="[^"]*(project-card|key-work-strip|key-plugin-card)[^"]*"[^>]*style="[^"]*opacity:\s*0/i.test(html)) {
    failures.push(`${page}: interactive work cards are server-rendered hidden`);
  }

  if (/role="button"[\s\S]*?<button/i.test(html)) {
    failures.push(`${page}: clickable card contains nested button markup`);
  }
}

const projectExplorer = read("src/components/ProjectExplorer.tsx");

if (!projectExplorer.includes("createPortal(")) {
  failures.push("src/components/ProjectExplorer.tsx: project modal is not rendered through a body-level portal");
}

if (/initial=\{reduceMotion \? false : \{ opacity: 0, y: 14 \}\}/.test(projectExplorer)) {
  failures.push("src/components/ProjectExplorer.tsx: project cards use hidden initial Motion state");
}

if (/className="project-modal-system"[\s\S]{0,260}initial=\{\{ opacity: 0 \}\}/.test(projectExplorer)) {
  failures.push("src/components/ProjectExplorer.tsx: project modal content fades in from a hidden state");
}

const featuredWorks = read("src/components/FeaturedWorksShowcase.tsx");

if (!featuredWorks.includes("createPortal(")) {
  failures.push("src/components/FeaturedWorksShowcase.tsx: featured modal is not rendered through a body-level portal");
}

if (/className="project-modal-system"[\s\S]{0,260}initial=\{\{ opacity: 0 \}\}/.test(featuredWorks)) {
  failures.push("src/components/FeaturedWorksShowcase.tsx: featured modal content fades in from a hidden state");
}

if (failures.length > 0) {
  console.error("Work interaction validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Work interaction validation passed.");
