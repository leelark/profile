---
name: portfolio-frontend-implementation
description: Use when the user explicitly asks to implement the Leelark Saxena portfolio frontend, including Astro scaffolding, React/TypeScript components, Tailwind theme, Motion animations, content rendering, GitHub Pages deployment, routes, contact form, and build verification.
---

# Portfolio Frontend Implementation

## Core Rule

Use this skill only when the user explicitly asks to implement or build the portfolio website. Do not use it for planning-only requests.

## First Files To Read

From repository root:

1. `AGENTS.md`
2. `context.md`
3. `development-ready/technical-solution-design.md`
4. `development-ready/functional-requirements.md`
5. `development-ready/content-data-architecture.md`
6. `development-ready/content-normalization-contract.md`
7. `development-ready/page-component-specification.md`
8. `development-ready/animation-interaction-specification.md`
9. `development-ready/contact-form-specification.md`
10. `development-ready/qa-accessibility-performance-seo.md`
11. `development-ready/official-reference-links.md`

## Build Principles

- Use Astro, React, TypeScript, Tailwind CSS, and Motion for React unless the user changes the stack.
- Keep content as static Astro pages where practical.
- Use React only for interactive islands/components.
- Implement dark theme as default and light theme as alternate.
- Use restrained motion and support reduced motion.
- Render all portfolio categories and project detail pages.
- Implement Splitforms contact form exactly from the specification.

## Implementation Order

1. Scaffold app only after explicit approval.
2. Configure Astro, TypeScript, Tailwind, linting, and routing.
3. Implement design tokens and theme toggle.
4. Build content data layer.
5. Build layout, cards, filters, and case-study pages.
6. Build contact form and `/thanks`.
7. Add SEO metadata and structured data.
8. Run QA and fix issues.

## Verification

Before completion, verify:

- app builds
- all routes resolve
- contact form renders required fields
- responsive layout works
- reduced motion works
- accessibility basics pass
- public-safe content rules hold
- GitHub Pages deployment settings are correct

## References

Read `references/implementation-checklist.md` before building.
