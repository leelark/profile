import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const read = (path) => readFileSync(join(root, path), "utf8");
const failures = [];

function expectContains(path, needle, label) {
  if (!read(path).includes(needle)) failures.push(`${path}: missing ${label}`);
}

function expectNotContains(path, needle, label) {
  if (read(path).includes(needle)) failures.push(`${path}: still contains ${label}`);
}

expectContains("src/pages/work/index.astro", "work-page-section", "work page scene section");
expectContains("src/pages/work/index.astro", "work-depth-field", "work depth background field");
expectContains("src/pages/work/index.astro", "work-hero-stage", "work hero depth stage");
expectContains("src/pages/work/index.astro", "work-command-visual", "work command visual");

expectContains("src/components/ProjectExplorer.tsx", "project-explorer-shell", "project explorer shell");
expectContains("src/components/ProjectExplorer.tsx", "work-filter-stage", "filter depth stage");
expectContains("src/components/ProjectExplorer.tsx", "project-card-hitbox", "single card hitbox button");
expectContains("src/components/ProjectExplorer.tsx", "project-card-depth-light", "card depth light layer");
expectContains("src/components/ProjectExplorer.tsx", "project-modal-depth-plane", "modal depth planes");
expectContains("src/components/ProjectExplorer.tsx", "project-case-depth-line", "case readout depth line");
expectNotContains("src/components/ProjectExplorer.tsx", "role=\"button\"", "card role button wrapper");
expectNotContains("src/components/ProjectExplorer.tsx", "handleCardKey", "manual article keyboard handler");

expectContains("src/styles/global.css", ".work-page-section", "work scene CSS");
expectContains("src/styles/global.css", ".work-depth-layer", "work depth layer CSS");
expectContains("src/styles/global.css", ".work-command-visual", "work command visual CSS");
expectContains("src/styles/global.css", ".project-card-hitbox", "project card hitbox CSS");
expectContains("src/styles/global.css", ".project-modal-depth-plane", "modal depth plane CSS");
expectContains("src/styles/global.css", "@keyframes work-depth-drift", "work depth animation");
expectContains("src/styles/global.css", "@keyframes work-card-scroll-depth", "progressive card scroll animation");
expectContains("src/styles/global.css", "prefers-reduced-motion: reduce", "reduced motion support");
expectContains("src/styles/global.css", ".work-depth-layer,\n    .work-command-visual", "reduced motion work reset");

if (failures.length > 0) {
  console.error("Work revamp validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Work revamp validation passed.");
