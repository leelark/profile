import {
  AppWindow,
  BadgeCheck,
  Bot,
  Boxes,
  Braces,
  BrainCircuit,
  Cable,
  ClipboardCheck,
  Code2,
  Cpu,
  Database,
  Gauge,
  Layers3,
  MonitorCog,
  Plug,
  Puzzle,
  Rows3,
  SearchCheck,
  Server,
  Workflow
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { CSSProperties } from "react";
import type { TechnicalSkill, TechnicalSkillGroup } from "@/lib/content";

type Props = {
  groups: TechnicalSkillGroup[];
  appianCapabilities?: TechnicalSkill[];
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
  HTML: Code2,
  CSS: Code2,
  Python: Code2,
  "Node.js": Server,
  PHP: Code2,
  Spring: Boxes,
  "C/C++": Braces,
  R: SearchCheck,
  SQL: Database,
  "MS SQL": Database,
  MySQL: Database,
  "REST APIs": Cable,
  "Web APIs": Cable,
  "Architecture Discovery": SearchCheck,
  "Solution Architecture": Layers3,
  Testing: ClipboardCheck,
  "Performance Review": Gauge,
  Governance: BadgeCheck,
  "Accelerator Design": Workflow,
  "Process Design": Workflow,
  "SAIL UI Interfaces": AppWindow,
  Records: Rows3,
  Integrations: Cable,
  "Appian AI Skills": BrainCircuit,
  "Appian AI Agents": Bot,
  "SAIL Component Plugin Development": Puzzle,
  "Smart Service Plugin Development": MonitorCog
};

export default function TechnicalSkillGrid({ groups, appianCapabilities = [], compact = false }: Props) {
  if (!compact) {
    const visibleGroups = groups.filter((group) => group.skills.length > 0);

    return (
      <div className="technology-showcase">
        {appianCapabilities.length > 0 && (
          <section className="appian-capability-showcase" aria-label="Appian-specific capabilities">
            <div className="appian-capability-orbit" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div>
              <p className="eyebrow">Appian-specific capabilities</p>
              <h3>Solution design, lead development, workflow orchestration, and platform extension.</h3>
              <p>
                Core delivery strengths across SAIL, records, process design, integrations, AI skills, AI agents, and custom plugin patterns.
              </p>
              <div className="appian-capability-grid">
                {appianCapabilities.map((skill) => {
                  const Icon = skillIcons[skill.name] ?? Workflow;
                  return (
                    <span className="appian-capability-token" key={skill.name}>
                      <Icon size={17} aria-hidden="true" />
                      <span>{skill.name}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        <div className="technology-group-grid" aria-label="Technical skill groups">
          {visibleGroups.map((group) => (
            <section className="technology-group-card" key={group.title}>
              <div className="technology-group-head">
                <h3>{group.title}</h3>
                <p>{group.summary}</p>
              </div>
              <div className="technology-token-list">
                {group.skills.map((skill, index) => {
                  const Icon = skillIcons[skill.name] ?? Code2;
                  return (
                    <span className="technology-token" key={skill.name} style={{ "--index": index } as CSSProperties}>
                      <Icon size={16} strokeWidth={2} aria-hidden="true" />
                      <span>
                        <strong>{skill.name}</strong>
                        <small>{skill.note}</small>
                      </span>
                    </span>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    );
  }

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
