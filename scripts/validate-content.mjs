import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const projectRoot = path.join(root, "portfolio-content", "projects");
const categories = {
  "client-projects": "Client Projects",
  plugins: "Plugins",
  "innovative-projects": "Innovative Projects",
  accelerators: "Accelerators"
};
const requiredSections = [
  "Portfolio Classification",
  "Hero Summary",
  "Project Context",
  "Problem",
  "My Role",
  "Solution Overview",
  "Architecture and Technical Approach",
  "Key Features",
  "Business Value",
  "Technologies and Appian Capabilities",
  "Final Portfolio Copy"
];

const failures = [];
const warnings = [];
let count = 0;

for (const [folder, category] of Object.entries(categories)) {
  const dir = path.join(projectRoot, folder);
  for (const file of fs.readdirSync(dir).filter((name) => name.endsWith(".md"))) {
    const fullPath = path.join(dir, file);
    const source = fs.readFileSync(fullPath, "utf8");
    count += 1;

    if (!source.includes(`Primary Category: ${category}`)) {
      failures.push(`${file}: expected category ${category}`);
    }

    for (const section of requiredSections) {
      if (!source.includes(`## ${section}`)) {
        if (file === "accelerator-catalog.md") {
          continue;
        }
        failures.push(`${file}: missing section ${section}`);
      }
    }

    const evidence = source.match(/^Evidence Status:\s*(.+)$/m)?.[1]?.trim();
    if (!["Confirmed", "Partially Confirmed", "Needs Confirmation"].includes(evidence ?? "")) {
      failures.push(`${file}: invalid or missing evidence status`);
    }

    if (evidence === "Needs Confirmation") {
      warnings.push(`${file}: evidence status needs confirmation before public launch`);
    }
  }
}

console.log(`projects_checked=${count}`);
console.log(`warnings=${warnings.length}`);
for (const warning of warnings) {
  console.log(`WARNING ${warning}`);
}

if (failures.length > 0) {
  console.error(`failures=${failures.length}`);
  for (const failure of failures) {
    console.error(`FAIL ${failure}`);
  }
  process.exit(1);
}

console.log("content_validation=pass");
