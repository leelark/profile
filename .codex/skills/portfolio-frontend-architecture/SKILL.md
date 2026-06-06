---
name: portfolio-frontend-architecture
description: Use when planning or reviewing portfolio frontend architecture, including Astro, React, TypeScript, Tailwind, Motion, GitHub Pages, GitHub Actions, routing, data modeling, component boundaries, SEO, security, performance, and technical solution design.
---

# Portfolio Frontend Architecture

## Core Rule

Design the website as a content-driven, statically optimized, responsive portfolio with selective frontend interactivity. Keep implementation aligned to the development-ready specs and public-safe content rules.

## First Files To Read

From repository root:

1. `development-ready/technical-solution-design.md`
2. `development-ready/content-data-architecture.md`
3. `development-ready/content-normalization-contract.md`
4. `development-ready/page-component-specification.md`
5. `development-ready/official-reference-links.md`
6. `development-ready/animation-interaction-specification.md`
7. `portfolio-content/strategy/visual-theme-design-system.md`

## Recommended Architecture

Use:

- Astro
- React
- TypeScript
- Tailwind CSS
- Motion for React
- static/content-driven data
- Splitforms for contact form
- GitHub Pages for hosting
- GitHub Actions for deployment

Use Astro static pages for content and React islands/components only for interactive UI.

## React Interactivity Budget

React islands/components are appropriate for:

- theme toggle
- mobile menu
- category filters
- search/sort if added
- animated reveals
- accordions
- contact form progressive enhancement

Avoid React-only rendering for static long-form case-study content.

## Data Model

Use typed data for:

- profile
- project summaries
- project details
- categories
- accelerators
- plugins
- experience
- skills
- certifications
- publication

Preserve evidence status and public-safe fields.

## Security Rules

- Do not store secrets in client code.
- Do not publish raw client data.
- Treat Splitforms access key as a public form key and lock it to the domain.
- Configure Astro `site` and `base` correctly for GitHub Pages.
- Do not expose private source paths in page UI.

## References

Read `references/architecture-checklist.md` before technical planning or implementation review.
