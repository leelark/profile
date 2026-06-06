# QA, Accessibility, Performance, and SEO

## Accessibility Targets

Target:

- WCAG 2.2 AA

Prioritize:

- keyboard navigation
- visible focus
- contrast
- form labels
- reduced motion
- semantic landmarks
- heading structure
- mobile tap targets

## Accessibility Checklist

Global:

- skip-to-content link
- one `main` landmark per page
- logical heading order
- descriptive links
- visible focus
- no color-only status
- reduced motion support

Navigation:

- keyboard operable
- active page announced visually and semantically
- mobile menu accessible
- theme toggle labeled

Forms:

- visible labels
- required fields identified
- error/help text connected to fields
- `type="email"` for email
- autocomplete attributes
- accessible submit button

Project cards:

- link text meaningful
- evidence status not color-only
- card content does not overflow

## Responsive QA

Test widths:

- 320 px
- 375 px
- 390 px
- 430 px
- 768 px
- 1024 px
- 1280 px
- 1440 px

Check:

- no horizontal overflow
- nav usable
- filters usable
- project cards stack correctly
- tags wrap
- buttons fit
- diagrams collapse
- forms fit
- hero content does not cover next section

## Performance Targets

Targets:

- Lighthouse Performance: 90+
- Lighthouse Accessibility: 95+
- Lighthouse Best Practices: 95+
- Lighthouse SEO: 95+

Core Web Vitals targets:

- LCP under 2.5 s
- CLS under 0.1
- INP under 200 ms

Performance rules:

- static render content-heavy pages
- optimize images
- avoid large animation libraries beyond Motion
- lazy-load non-critical visuals
- keep React islands/components limited to interactive UI
- avoid large JS for static case studies
- avoid heavy background effects

## SEO Requirements

Every page:

- unique title
- unique meta description
- canonical URL
- Open Graph metadata
- Twitter/social image if available

Structured data:

- Person on home/about
- WebSite on home
- BreadcrumbList on project pages
- CreativeWork or Article-style metadata for case studies where appropriate

Content SEO:

- use clear H1
- use descriptive section headings
- expose case-study summaries as text
- avoid hiding critical content behind animation

## Content Integrity QA

Check:

- no raw client-sensitive data
- no private Appian object IDs
- no raw logs
- no unverified metrics
- all categories consistent
- all project pages present
- all accelerator pages linked
- all evidence statuses present
- all confirmation-needed items handled before public launch

## Visual QA

Check:

- dark theme default
- light theme polished
- purple not overused
- no decorative blobs
- no nested cards
- card radius restrained
- text fits in buttons/cards
- mobile hero readable
- project grids aligned

## Contact Form QA

Check:

- Splitforms action URL correct
- access key present
- method POST
- redirect to `/thanks`
- required fields work
- form submits in production
- spam/domain settings configured

## Browser QA

Target:

- latest Chrome
- latest Edge
- latest Firefox
- latest Safari
- iOS Safari
- Android Chrome

## Pre-Launch Gate

Do not launch until:

- all public-safe checks pass
- content review complete
- form tested
- responsive QA complete
- accessibility QA complete
- performance targets met
- SEO metadata present
- analytics/privacy decisions finalized
