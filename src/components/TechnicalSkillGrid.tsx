import {
  AppWindow,
  BadgeCheck,
  Boxes,
  Braces,
  BrainCircuit,
  Cable,
  ClipboardCheck,
  Code2,
  Cpu,
  Database,
  FileSpreadsheet,
  FileText,
  Gauge,
  Layers3,
  Plug,
  SearchCheck,
  Server,
  ShieldCheck,
  Workflow
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { TechnicalSkillGroup } from "@/lib/content";

type Props = {
  groups: TechnicalSkillGroup[];
  compact?: boolean;
};

const skillIcons: Record<string, LucideIcon> = {
  Appian: AppWindow,
  "Workflow Automation": Workflow,
  "Data Modeling": Database,
  "Appian AI": BrainCircuit,
  "Custom SAIL Plugin": Plug,
  "Custom Smart Service Plugin": Cpu,
  JavaScript: Code2,
  Java: Braces,
  "HTML/CSS": Code2,
  "Node.js": Server,
  PHP: Code2,
  Spring: Boxes,
  "C/C++": Braces,
  R: SearchCheck,
  SQL: Database,
  "MS SQL Server": Database,
  MySQL: Database,
  "REST APIs": Cable,
  "Web APIs": Cable,
  SFTP: ShieldCheck,
  "Excel/CSV Automation": FileSpreadsheet,
  "PDF Processing": FileText,
  "Requirement Analysis": SearchCheck,
  "Solution Design": Layers3,
  Testing: ClipboardCheck,
  "Performance Review": Gauge,
  Governance: BadgeCheck,
  "Accelerator Design": Workflow
};

export default function TechnicalSkillGrid({ groups, compact = false }: Props) {
  return (
    <div className={`skill-board ${compact ? "skill-board-compact" : ""}`}>
      {groups.map((group) => (
        <section className="skill-group" key={group.title} aria-label={group.title}>
          <div className="skill-group-head">
            <h3>{group.title}</h3>
            <p>{group.summary}</p>
          </div>
          <div className="skill-grid">
            {group.skills.map((skill) => {
              const Icon = skillIcons[skill.name] ?? Code2;
              return (
                <article className="skill-tile" key={skill.name}>
                  <span className="skill-tile-icon" aria-hidden="true">
                    <Icon size={18} strokeWidth={2} />
                  </span>
                  <span>
                    <span className="skill-tile-name">{skill.name}</span>
                    <span className="skill-tile-note">{skill.note}</span>
                  </span>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
