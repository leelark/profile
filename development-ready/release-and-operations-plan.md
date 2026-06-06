# Release and Operations Plan

## Deployment Target

Recommended:

- GitHub Pages

Deployment method:

- GitHub Actions

Repository requirement:

- GitHub repository containing the frontend source and deployment workflow

## Environments

Recommended environments:

- local development
- preview deployment
- production

Preview deployment should be used for:

- design review
- mobile QA
- content review
- contact form test
- SEO preview

Production should be used only after:

- public-safe content review
- contact form domain lock
- accessibility QA
- performance QA

## Domain and Form Setup

Before launch:

- configure production domain
- lock Splitforms access key to production domain
- configure destination email
- configure spam protection
- verify `/thanks`
- submit test form

## Analytics

Recommended lightweight analytics:

- privacy-focused static-site analytics if approved
- GitHub traffic insights for repository-level visibility

Do not add:

- excessive session recording
- invasive tracking
- heatmaps without a privacy decision

## Monitoring

Post-launch checks:

- production build success
- page load speed
- form submissions
- 404 routes
- GitHub Actions deployment status
- GitHub Pages availability
- broken links
- mobile layout
- uptime

## Content Maintenance

Update cadence:

- review content quarterly
- update project confirmation statuses as evidence improves
- add new projects using standard page structure
- refresh certifications and experience changes
- verify framework/deployment docs before major upgrades

## Launch Checklist

- production domain configured
- SSL active
- GitHub Pages configured
- GitHub Actions deployment workflow configured
- Astro `site` and `base` configured correctly
- preview and production form submissions tested and received at the configured destination email
- `/thanks` page present
- SEO metadata present
- sitemap generated
- robots file reviewed
- Open Graph image present
- analytics configured
- no sensitive data published
- accessibility QA complete
- performance QA complete
- responsive QA complete

## Rollback Plan

If production issue occurs:

- redeploy previous stable build
- disable new contact form changes if needed
- keep a known-good preview deployment
- document issue and fix before relaunch

## Post-Launch Backlog

Potential enhancements:

- blog or insights section
- downloadable resume PDF
- sanitized architecture diagrams
- project thumbnail image set
- richer case-study visuals
- private draft mode for unconfirmed projects
- MDX migration for rich content
- analytics dashboard
