# Portfolio Content Repository Instructions

This repository is the content and planning source for Leelark Saxena's new personal portfolio website.

## Scope

Use this repo for:

- portfolio content strategy
- profile and resume content
- project case-study copy
- plugin and accelerator content
- website layout and theme planning
- information architecture
- UX/UI direction
- accessibility and responsive strategy
- development-ready functional and technical specifications
- project-local Codex skills for portfolio SDLC work

Do not use this repo for:

- website implementation code
- framework scaffolding
- package installation
- deployment configuration
- secret storage
- browser/session/auth material

## Development Readiness

The development specification package lives in `development-ready/`.

Before implementation begins, read:

1. `context.md`
2. `development-ready/README.md`
3. `development-ready/technical-solution-design.md`
4. `development-ready/functional-requirements.md`
5. `development-ready/content-data-architecture.md`
6. `development-ready/content-normalization-contract.md`
7. `development-ready/page-component-specification.md`
8. `development-ready/contact-form-specification.md`

Project-local skills live in `.codex/skills/`.

Use these skills for future work:

- `portfolio-sdlc-orchestrator`
- `portfolio-content-system`
- `portfolio-design-system`
- `portfolio-frontend-architecture`
- `portfolio-frontend-implementation`
- `portfolio-implementation-planner`
- `portfolio-contact-form`
- `portfolio-qa-accessibility`
- `portfolio-release-operations`

## Recommended Implementation Direction

The current development plan recommends a frontend-only static portfolio stack:

- Astro
- TypeScript
- React
- Tailwind CSS
- Motion for React
- GitHub Pages hosting
- GitHub Actions deployment
- Splitforms contact form backend

Do not scaffold or implement the website unless the user explicitly requests development.

## Contact Form Requirement

The contact page must use Splitforms:

```html
<form action="https://splitforms.com/api/submit" method="POST">
  <input type="hidden" name="access_key" value="8897600acb7b48f09fb9d1f78895c3b6">
</form>
```

Before production launch, lock the Splitforms key to the production domain in the Splitforms dashboard and test a real submission.

## Content Principles

- Position Leelark as an Enterprise Appian Solution Architect, Senior Appian Consultant, Technical Lead, AI Solution Designer, Plugin Developer, Product Builder, Workflow Automation Specialist, and Digital Transformation Consultant.
- Keep the tone premium, modern, enterprise-grade, concise, and evidence-led.
- Prefer business value, architecture decisions, reusable patterns, and user outcomes over generic task lists.
- Maintain consistent project sections across every project, plugin, accelerator, and POC.
- Mark evidence status clearly:
  - Confirmed
  - Partially Confirmed
  - Needs Confirmation
- Do not publish unverified metrics as facts. Use "designed to", "intended to", or "expected to" until validated.
- Clean internal typos, object names, and implementation labels before public website use.
- Avoid exposing secrets, API keys, tokens, private Appian export internals, browser sessions, cookies, auth files, native pipes, or secret-store data.

## Project Categories

Use these primary portfolio categories:

- Client Projects
- Plugins
- Innovative Projects
- Accelerators

Secondary category tags may include:

- AI Product
- Appian Architecture
- Workflow Automation
- Document Intelligence
- Enterprise UX
- Performance and Governance
- Integration Architecture
- Proof of Concept

## Standard Page Structure

Each project content page should follow this structure:

1. Portfolio Classification, including `Primary Category`, `Secondary Categories`, `Evidence Status`, and `Evidence Basis`
2. Hero Summary
3. Project Context
4. Problem
5. My Role
6. Users and Stakeholders
7. Solution Overview
8. Architecture and Technical Approach
9. Key Features
10. UX and Product Decisions
11. Business Value
12. Technologies and Appian Capabilities
13. Suggested Website Sections
14. Suggested Visuals
15. Final Portfolio Copy
16. Confirmation Needed

## Review Requirements

Before using content for the final website:

- check that every page has consistent sections
- confirm client names can be used publicly
- confirm ownership level for sensitive client/advisory work
- confirm metrics before publishing them
- confirm screenshots can be shared
- confirm plugin names, version numbers, and implementation details
