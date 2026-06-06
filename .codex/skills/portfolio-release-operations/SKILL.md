---
name: portfolio-release-operations
description: Use when planning or reviewing portfolio release operations, including GitHub Pages hosting, GitHub Actions deployment, environments, domain setup, Splitforms production setup, analytics, monitoring, launch checklist, rollback, and maintenance.
---

# Portfolio Release Operations

## Core Rule

Do not launch until content safety, contact form, accessibility, performance, SEO, and responsive checks are complete.

## First Files To Read

From repository root:

1. `development-ready/release-and-operations-plan.md`
2. `development-ready/qa-accessibility-performance-seo.md`
3. `development-ready/contact-form-specification.md`
4. `development-ready/official-reference-links.md`

## Deployment Recommendation

Use GitHub Pages with GitHub Actions unless the user selects another host.

Recommended environments:

- local
- preview
- production

## Launch Gate

Before production:

- domain configured
- SSL active
- GitHub Pages configured
- GitHub Actions deployment workflow configured
- Astro `site` and `base` configured for the target GitHub Pages URL
- Splitforms key domain-locked
- preview and production form submissions tested and received at the configured destination email
- `/thanks` exists
- metadata present
- sitemap generated
- robots reviewed
- analytics configured
- analytics/privacy decisions finalized
- no sensitive data published
- accessibility QA complete
- performance QA complete
- responsive QA complete

## Maintenance

Review quarterly:

- profile updates
- project evidence status
- certifications
- dependencies
- contact form delivery
- analytics
- privacy decisions
- broken links

## References

Read `references/release-checklist.md` for launch and rollback details.
