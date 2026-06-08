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

function expectRuleContains(path, selector, needles, label) {
  const source = read(path);
  const ruleStart = source.indexOf(`${selector} {`);
  const ruleEnd = ruleStart === -1 ? -1 : source.indexOf("\n  }", ruleStart);

  if (ruleStart === -1 || ruleEnd === -1) {
    failures.push(`${path}: missing ${label}`);
    return;
  }

  const rule = source.slice(ruleStart, ruleEnd);
  for (const needle of needles) {
    if (!rule.includes(needle)) failures.push(`${path}: missing ${label} ${needle}`);
  }
}

function expectRuleNotContains(path, selector, needles, label) {
  const source = read(path);
  const ruleStart = source.indexOf(`${selector} {`);
  const ruleEnd = ruleStart === -1 ? -1 : source.indexOf("\n  }", ruleStart);

  if (ruleStart === -1 || ruleEnd === -1) {
    failures.push(`${path}: missing ${label}`);
    return;
  }

  const rule = source.slice(ruleStart, ruleEnd);
  for (const needle of needles) {
    if (rule.includes(needle)) failures.push(`${path}: ${label} still contains ${needle}`);
  }
}

function rulesForSelector(source, selector) {
  const rules = [];
  let cursor = 0;

  while (cursor < source.length) {
    const ruleStart = source.indexOf(`${selector} {`, cursor);
    if (ruleStart === -1) break;

    const ruleEnd = source.indexOf("\n  }", ruleStart);
    if (ruleEnd === -1) break;

    rules.push(source.slice(ruleStart, ruleEnd));
    cursor = ruleEnd + 4;
  }

  return rules;
}

function expectAnyRuleContains(path, selector, needles, label) {
  const rules = rulesForSelector(read(path), selector);

  if (rules.length === 0) {
    failures.push(`${path}: missing ${label}`);
    return;
  }

  const hasRule = rules.some((rule) => needles.every((needle) => rule.includes(needle)));
  if (!hasRule) failures.push(`${path}: missing ${label}`);
}

function expectNoRuleContains(path, selector, needles, label) {
  const rules = rulesForSelector(read(path), selector);

  if (rules.length === 0) {
    failures.push(`${path}: missing ${label}`);
    return;
  }

  for (const rule of rules) {
    for (const needle of needles) {
      if (rule.includes(needle)) failures.push(`${path}: ${label} still contains ${needle}`);
    }
  }
}

expectContains("src/pages/work/index.astro", "work-page-section", "work page scene section");
expectContains("src/pages/work/index.astro", "work-depth-field", "work depth background field");
expectContains("src/pages/work/index.astro", "work-hero-stage", "work hero depth stage");
expectContains("src/pages/work/index.astro", "work-command-visual", "work command visual");
expectContains("src/pages/work/index.astro", "work-flow-label", "contextual work flow labels");

expectContains("src/components/ProjectExplorer.tsx", "project-explorer-shell", "project explorer shell");
expectContains("src/components/ProjectExplorer.tsx", "work-filter-stage", "filter depth stage");
expectContains("src/components/ProjectExplorer.tsx", "setupWorkReveal", "scroll reveal setup");
expectContains("src/components/ProjectExplorer.tsx", "data-work-reveal", "scroll reveal markers");
expectContains("src/components/ProjectExplorer.tsx", "const modalRevealRoot = Boolean(scrollContainer);", "modal reveal root detection");
expectContains(
  "src/components/ProjectExplorer.tsx",
  "if (modalRevealRoot) {\n    for (const item of items) item.classList.add(\"is-visible\");",
  "immediate modal detail reveal"
);
expectContains("src/components/ProjectExplorer.tsx", "activeModalSection", "active modal section state");
expectContains("src/components/ProjectExplorer.tsx", "data-project-scroll-container", "modal scroll container");
expectContains("src/components/ProjectExplorer.tsx", "container.scrollTop = nextTop", "deterministic modal section navigation");
expectContains("src/components/ProjectExplorer.tsx", "const isAtModalBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 2", "bottom Stack active state");
expectContains("src/components/ProjectExplorer.tsx", "ProjectModalNavigationRail", "side modal navigation rail");
expectContains("src/components/ProjectExplorer.tsx", "aria-label={`Go to ${item.label} section`}", "side Stack navigation target");
expectNotContains("src/components/ProjectExplorer.tsx", "ProjectModalSectionTabs", "extra top modal section tabs");
expectNotContains("src/components/ProjectExplorer.tsx", "project-modal-section-tabs", "extra top modal section tabs markup");
expectNotContains("src/components/ProjectExplorer.tsx", "aria-label={`Show ${item.label} section`}", "extra top Stack navigation target");
expectContains("src/components/ProjectExplorer.tsx", "project-card-hitbox", "single card hitbox button");
expectContains("src/components/ProjectExplorer.tsx", "project-card-depth-light", "card depth light layer");
expectContains("src/components/ProjectExplorer.tsx", "project-modal-depth-plane", "modal depth planes");
expectContains("src/components/ProjectExplorer.tsx", "project-case-depth-line", "case readout depth line");
expectContains("src/components/ProjectExplorer.tsx", "project-visual-depth-grid", "detail visual depth grid layer");
expectContains("src/components/ProjectExplorer.tsx", "project-visual-flow-field", "detail visual flow field layer");
expectContains("src/components/ProjectExplorer.tsx", "project-visual-scan-sheen", "detail visual scan sheen layer");
expectContains("src/components/ProjectExplorer.tsx", "variant: \"colorPicker\"", "dedicated color picker visual scene");
expectContains("src/components/ProjectExplorer.tsx", "case \"colorPicker\"", "color picker visual renderer");
expectNotContains(
  "src/components/ProjectExplorer.tsx",
  "className: \"scene-color-picker\",\n    variant: \"fallback\"",
  "generic color picker visual scene"
);
expectNotContains("src/components/ProjectExplorer.tsx", "role=\"button\"", "card role button wrapper");
expectNotContains("src/components/ProjectExplorer.tsx", "handleCardKey", "manual article keyboard handler");

expectContains("src/styles/global.css", ".work-page-section", "work scene CSS");
expectContains("src/styles/global.css", ".work-depth-layer", "work depth layer CSS");
expectContains("src/styles/global.css", ".work-command-visual", "work command visual CSS");
expectContains("src/styles/global.css", ".work-command-module", "contextual command module CSS");
expectContains("src/styles/global.css", ".work-reveal-ready [data-work-reveal]", "scroll reveal CSS");
expectContains("src/styles/global.css", ".project-visual-depth-grid", "detail visual premium depth grid CSS");
expectContains("src/styles/global.css", ".project-visual-flow-field", "detail visual premium flow field CSS");
expectContains("src/styles/global.css", ".project-visual-scan-sheen", "detail visual premium scan sheen CSS");
expectContains("src/styles/global.css", ".project-modal-header-top", "modal header top row CSS");
expectAnyRuleContains(
  "src/styles/global.css",
  ".project-modal-header",
  ["grid-template-columns: minmax(0, 1fr);", "justify-content: stretch;", "justify-items: stretch;"],
  "full-width modal header grid"
);
expectAnyRuleContains(
  "src/styles/global.css",
  ".project-modal-header-top",
  ["width: 100%;", "justify-self: stretch;"],
  "full-width modal header controls"
);
expectAnyRuleContains(
  "src/styles/global.css",
  ".project-modal-header-top > button",
  ["margin-left: auto;"],
  "right-aligned modal close button"
);
expectContains(
  "src/styles/global.css",
  "@media (max-width: 860px) {\n    .project-modal-overlay {\n      overflow: auto;",
  "mobile-only modal rail collapse"
);
expectNotContains("src/styles/global.css", ".project-modal-section-tabs", "extra top modal section tabs CSS");
expectNotContains(
  "src/styles/global.css",
  "@media (max-width: 1180px) {\n    .project-modal-overlay {\n      overflow: auto;",
  "desktop side rail collapse"
);
expectContains("src/styles/global.css", ".visual-color-picker", "dedicated color picker visual CSS");
expectContains("src/styles/global.css", "@keyframes project-flow-rail", "detail visual flow rail animation");
expectContains("src/styles/global.css", "@keyframes project-visual-sheen", "detail visual scan sheen animation");
expectAnyRuleContains(
  "src/styles/global.css",
  ".project-visual-depth-grid",
  ["opacity: 0.24;"],
  "subtle detail visual depth grid"
);
expectAnyRuleContains(
  "src/styles/global.css",
  ".project-visual-flow-field",
  ["opacity: 0.34;"],
  "subtle detail visual flow rails"
);
expectAnyRuleContains(
  "src/styles/global.css",
  ".project-visual-story",
  ["backdrop-filter: none;", "transform: none;"],
  "crisp detail visual container"
);
expectAnyRuleContains(
  "src/styles/global.css",
  ".project-modal-system",
  ["perspective: none;", "transform-style: flat;"],
  "crisp project modal shell"
);
expectNoRuleContains(
  "src/styles/global.css",
  ".project-modal-system",
  ["perspective: 1600px;", "transform-style: preserve-3d;"],
  "crisp project modal shell"
);
expectAnyRuleContains(
  "src/styles/global.css",
  ".project-modal-overlay .project-modal",
  ["transform: none;"],
  "crisp project modal panel"
);
expectNoRuleContains(
  "src/styles/global.css",
  ".project-modal-overlay .project-modal",
  ["transform: translateZ("],
  "crisp project modal panel"
);
expectAnyRuleContains(
  "src/styles/global.css",
  ".project-case-layout",
  ["transform-style: flat;"],
  "crisp project case layout"
);
expectNoRuleContains(
  "src/styles/global.css",
  ".project-case-layout",
  ["transform-style: preserve-3d;"],
  "crisp project case layout"
);
expectAnyRuleContains(
  "src/styles/global.css",
  ".project-case-depth-line",
  ["transform: none;"],
  "crisp project case depth line"
);
expectNoRuleContains(
  "src/styles/global.css",
  ".project-case-depth-line",
  ["translateZ("],
  "crisp project case depth line"
);
expectNoRuleContains(
  "src/styles/global.css",
  ".project-visual-story",
  ["blur(", "rotateY("],
  "crisp detail visual container"
);
expectAnyRuleContains(
  "src/styles/global.css",
  ".project-visual-head strong",
  ["font-size: 1rem;", "font-weight: 820;", "text-shadow: none;"],
  "clear detail visual heading text"
);
expectAnyRuleContains(
  "src/styles/global.css",
  ".project-visual-badge",
  ["font-size: 0.76rem;", "background: rgb(var(--color-surface) / 0.94);", "text-shadow: none;"],
  "clear detail visual badge text"
);
expectAnyRuleContains(
  "src/styles/global.css",
  ".project-visual-node small",
  ["font-size: 0.76rem;", "font-weight: 780;", "text-shadow: none;"],
  "clear detail visual node labels"
);
expectAnyRuleContains(
  "src/styles/global.css",
  ".visual-data-rows em",
  ["font-size: 0.72rem;", "font-weight: 780;", "text-shadow: none;"],
  "clear detail visual data values"
);
expectAnyRuleContains(
  "src/styles/global.css",
  ".visual-window-bar b",
  ["font-size: 0.68rem;", "font-weight: 780;", "text-shadow: none;"],
  "clear detail visual window labels"
);
expectAnyRuleContains(
  "src/styles/global.css",
  ".visual-source-stack span",
  ["font-size: 0.64rem;", "font-weight: 780;", "background: rgb(var(--color-surface) / 0.94);", "text-shadow: none;"],
  "clear DocBot source chips"
);
expectAnyRuleContains(
  "src/styles/global.css",
  ".visual-answer-card",
  ["background: rgb(var(--color-surface) / 0.94);"],
  "clear DocBot answer card"
);
expectAnyRuleContains(
  "src/styles/global.css",
  ".visual-answer-card strong",
  ["font-size: 0.72rem;", "font-weight: 820;", "text-shadow: none;"],
  "clear DocBot answer text"
);
expectAnyRuleContains(
  "src/styles/global.css",
  ".visual-answer-card small",
  ["font-size: 0.68rem;", "font-weight: 680;", "text-shadow: none;"],
  "clear DocBot source text"
);
expectAnyRuleContains(
  "src/styles/global.css",
  ".visual-feedback-meter b",
  ["font-size: 0.64rem;", "font-weight: 780;", "text-shadow: none;"],
  "clear DocBot trust label"
);
expectNoRuleContains(
  "src/styles/global.css",
  ".project-visual-head strong",
  ["text-shadow: 0 1px 10px"],
  "clear detail visual heading text"
);
expectNoRuleContains(
  "src/styles/global.css",
  ".project-visual-badge",
  ["text-shadow: 0 1px 10px"],
  "clear detail visual badge text"
);
expectNoRuleContains(
  "src/styles/global.css",
  ".project-visual-node small",
  ["text-shadow: 0 1px 10px"],
  "clear detail visual node labels"
);
expectNoRuleContains(
  "src/styles/global.css",
  ".visual-data-rows em",
  ["text-shadow: 0 1px 10px"],
  "clear detail visual data values"
);
expectNoRuleContains(
  "src/styles/global.css",
  ".visual-window-bar b",
  ["text-shadow: 0 1px 10px"],
  "clear detail visual window labels"
);
expectContains("src/styles/global.css", "grid-template-rows: auto auto minmax(7.25rem, 1fr) auto", "aligned card row structure");
expectNotContains(
  "src/styles/global.css",
  ".project-card-heading {\n    min-height: 78px;\n    align-items: flex-start;",
  "top-aligned project card heading override"
);
expectContains(
  "src/styles/global.css",
  ".project-card-heading h3 {\n    display: -webkit-box;\n    min-height: 0;",
  "natural-height project card title alignment"
);
expectRuleContains(
  "src/styles/global.css",
  ".project-card-type",
  [
    "font-weight: 560;",
    "letter-spacing: 0.01em;",
    "backdrop-filter: blur(10px) saturate(1.05);",
    "font-synthesis-weight: none;"
  ],
  "refined project-card type chip"
);
expectNotContains(
  "src/styles/global.css",
  ".project-card-action > span {\n    font-size: 0.76rem;\n    font-weight: 820;",
  "broad heavy footer span override"
);
expectRuleContains(
  "src/styles/global.css",
  ".project-card-action > .project-card-type",
  ["font-weight: 560;", "letter-spacing: 0.01em;"],
  "card-action chip typography override"
);
expectAnyRuleContains(
  "src/styles/global.css",
  ".work-reveal-ready [data-work-reveal].is-visible",
  ["opacity: 1;", "transform: none;"],
  "settled reveal state"
);
expectAnyRuleContains(
  "src/styles/global.css",
  'body[data-route="/work"] .work-reveal-ready .project-card[data-work-reveal].is-visible',
  ["opacity: 1 !important;", "transform: none !important;"],
  "fixed project cards after reveal"
);
expectNotContains(
  "src/styles/global.css",
  "transform: translate3d(0, 0, var(--card-depth, 0));",
  "persistent card depth after reveal"
);
expectNotContains("src/styles/global.css", "@keyframes work-card-scroll-depth", "continuous project-card float keyframes");
expectContains("src/styles/global.css", ".project-card-hitbox", "project card hitbox CSS");
expectContains("src/styles/global.css", ".project-modal-depth-plane", "modal depth plane CSS");
expectContains("src/styles/global.css", ".project-modal-overlay .project-modal::-webkit-scrollbar", "designed modal scrollbar");
expectContains("src/styles/global.css", "scrollbar-gutter: stable", "stable modal scrollbar gutter");
expectContains("src/styles/global.css", "@keyframes work-depth-drift", "work depth animation");
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
