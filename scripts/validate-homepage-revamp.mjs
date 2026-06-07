import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (file) => readFileSync(join(root, file), "utf8");
const failures = [];

const index = read("src/pages/index.astro");
const css = read("src/styles/global.css");

const backupRoot = join(root, "backup");
const homepageBackups = existsSync(backupRoot)
  ? readdirSync(backupRoot).filter((name) => name.startsWith("homepage-"))
  : [];

if (homepageBackups.length === 0) {
  failures.push("backup/: missing homepage backup copy");
}

const requiredHomepageCopy = [
  "Leelark Saxena",
  "Enterprise Appian Architecture",
  "Solution Architect",
  "Lead Appian Developer",
  "Senior Appian Consultant",
  "Requirement Analysis",
  "Solution Blueprint",
  "Lead Appian Build",
  "AI + Integration Design",
  "Release Confidence",
  "Continuous Improvement",
  "Appian technical depth for delivery.",
  "Certification and research foundation.",
  "Enterprise contexts where Appian delivery patterns apply.",
  "Appian delivery across respected organizations.",
  "Bring clarity to your next Appian delivery."
];

for (const copy of requiredHomepageCopy) {
  if (!index.includes(copy)) {
    failures.push(`src/pages/index.astro: missing preserved homepage copy "${copy}"`);
  }
}

const requiredMarkupHooks = [
  "home-depth-section",
  "home-hero-copy-panel",
  "home-section-shell",
  "home-depth-layer",
  "home-section-orbit",
  "data-home-section"
];

for (const hook of requiredMarkupHooks) {
  if (!index.includes(hook)) {
    failures.push(`src/pages/index.astro: missing homepage revamp hook ${hook}`);
  }
}

const requiredCssHooks = [
  ".home-depth-section",
  ".home-hero-copy-panel",
  ".home-section-shell",
  ".home-depth-layer",
  ".home-section-orbit",
  "transform-style: preserve-3d",
  "perspective:",
  "home-depth-drift",
  "home-orbit-drift"
];

for (const hook of requiredCssHooks) {
  if (!css.includes(hook)) {
    failures.push(`src/styles/global.css: missing homepage depth styling ${hook}`);
  }
}

if (!/@media \(prefers-reduced-motion: reduce\)[\s\S]*\.home-depth-layer/.test(css)) {
  failures.push("src/styles/global.css: homepage depth layers are not covered by reduced-motion CSS");
}

const heroPanelBlock = css.match(/\.home-hero-copy-panel\s*\{([\s\S]*?)\n\s*\}/)?.[1] ?? "";
if (!heroPanelBlock.includes("border: 0")) {
  failures.push("src/styles/global.css: hero left copy panel should not render as a bordered box");
}

if (!heroPanelBlock.includes("background: transparent")) {
  failures.push("src/styles/global.css: hero left copy panel should keep the previous open background treatment");
}

if (!heroPanelBlock.includes("box-shadow: none")) {
  failures.push("src/styles/global.css: hero left copy panel should not have box shadow");
}

if (failures.length > 0) {
  console.error("Homepage revamp validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Homepage revamp validation passed.");
