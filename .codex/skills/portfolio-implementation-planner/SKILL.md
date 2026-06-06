---
name: portfolio-implementation-planner
description: Use when converting approved portfolio specs into development phases, tasks, milestones, acceptance criteria, dependency order, verification steps, and handoff plans before coding begins.
---

# Portfolio Implementation Planner

## Core Rule

Convert the portfolio strategy into sequenced development work without starting implementation unless the user explicitly asks to build. Keep each plan tied to acceptance criteria and verification.

## First Files To Read

From repository root:

1. `development-ready/sdlc-roadmap-and-backlog.md`
2. `development-ready/technical-solution-design.md`
3. `development-ready/functional-requirements.md`
4. `development-ready/page-component-specification.md`
5. `development-ready/qa-accessibility-performance-seo.md`

Conditional reads:

- Read `development-ready/contact-form-specification.md` when the plan touches contact, forms, `/thanks`, privacy, or Splitforms.
- Read `development-ready/animation-interaction-specification.md` when the plan touches animation, page transitions, card motion, filters, theme toggle, or reduced motion.

## Planning Workflow

1. Identify phase.
2. Identify affected pages/components/data.
3. Define tasks.
4. Define acceptance criteria.
5. Define verification.
6. Identify public-safe content checks.
7. Identify dependency order.
8. Produce a compact implementation plan.

## Phase Order

1. Foundation.
2. Content data layer.
3. Core pages.
4. Visual design and motion.
5. Contact and SEO.
6. QA and launch.

## Acceptance Criteria Pattern

Each task should define:

- user-visible outcome
- files or modules likely affected
- responsive requirement
- accessibility requirement
- content safety requirement
- verification command or review method

## References

Read `references/planning-template.md` when producing implementation plans.
