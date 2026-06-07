import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const read = (path) => readFileSync(join(root, path), "utf8");
const failures = [];

const expectContains = (file, needle, label) => {
  const content = read(file);
  if (!content.includes(needle)) {
    failures.push(`${file}: missing ${label}`);
  }
};

const expectNotContains = (file, needle, label) => {
  const content = read(file);
  if (content.includes(needle)) {
    failures.push(`${file}: still contains ${label}`);
  }
};

expectContains("src/layouts/BaseLayout.astro", "initPortfolioMotion", "global motion initializer");
expectContains("src/layouts/BaseLayout.astro", "[data-reveal], [data-home-reveal], [data-reveal-group]", "shared reveal selector");
expectContains("src/layouts/BaseLayout.astro", "IntersectionObserver", "scroll reveal observer");
expectContains("src/layouts/BaseLayout.astro", "threshold: 0.01", "low reveal threshold for tall sections");
expectContains("src/layouts/BaseLayout.astro", "prefers-reduced-motion: reduce", "reduced-motion branch");

expectContains("src/styles/global.css", "--motion-entrance-ease: cubic-bezier(0.19, 1, 0.22, 1)", "reference-inspired entrance easing");
expectContains("src/styles/global.css", "--section-flow-opacity", "shared section flow opacity token");
expectContains("src/styles/global.css", ".section-band::before", "section flow background layer");
expectContains("src/styles/global.css", ".section-band > .shell", "section content z-index safety");
expectContains("src/styles/global.css", "section-flow-drift", "section flow animation");
expectContains("src/styles/global.css", ".section-band::after", "section rail background layer");
expectContains("src/styles/global.css", ".motion-ready [data-reveal]", "global reveal hidden state");
expectContains("src/styles/global.css", "[data-reveal-group].is-visible", "group reveal visible state");
expectContains("src/styles/global.css", "@media (prefers-reduced-motion: reduce)", "reduced-motion CSS");
expectContains("src/styles/global.css", ".section-band::before,\n  .section-band::after", "reduced-motion section flow disable");
expectContains("src/styles/resume.css", "resume-section-flow-drift", "resume section flow animation");
expectContains("src/styles/resume.css", ".resume-page-minimal .resume-section::after", "resume section rail layer");

for (const page of [
  "src/pages/index.astro",
  "src/pages/key-works.astro",
  "src/pages/work/index.astro",
  "src/pages/work/client-projects.astro",
  "src/pages/work/plugins.astro",
  "src/pages/work/innovative-projects.astro",
  "src/pages/work/accelerators.astro",
  "src/pages/resume.astro",
  "src/pages/contact.astro",
  "src/pages/thanks.astro"
]) {
  expectContains(page, "data-reveal", "page-level reveal annotations");
}

expectContains("src/components/ProjectExplorer.tsx", "initial={false}", "hydration-safe project card motion");
expectContains("src/components/FeaturedWorksShowcase.tsx", "initial={false}", "hydration-safe featured card motion");
expectNotContains("src/components/ProjectExplorer.tsx", "initial={reduceMotion ? false : { opacity: 0, y: 14 }}", "hidden project card initial state");
expectNotContains("src/components/FeaturedWorksShowcase.tsx", "initial={reduceMotion ? false : { opacity: 0, y: 14 }}", "hidden featured card initial state");
expectNotContains("src/styles/resume.css", "animation: resume-minimal-rise", "load-only resume entrance animation");

if (failures.length > 0) {
  console.error("Motion system validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Motion system validation passed.");
