# SDLC Roadmap and Backlog

## Phase 0: Readiness

Deliverables:

- confirm project stack
- re-check official framework and provider documentation
- pin package versions during implementation planning
- confirm GitHub Pages hosting mode: user site, project site, or custom domain
- finalize content schema
- define routes
- confirm public-safe content rules
- confirm form provider settings
- confirm asset availability

Exit criteria:

- development-ready docs reviewed
- all required pages listed
- public-safe rules accepted

## Phase 1: Foundation

Tasks:

- scaffold Astro frontend app
- configure TypeScript
- configure Tailwind CSS
- define design tokens
- set up dark/light theme
- create routing shell
- create layout primitives

Acceptance:

- app runs locally
- header/footer render
- theme toggle works
- base responsive layout exists

## Phase 2: Content Data Layer

Tasks:

- define TypeScript content models
- normalize profile data
- normalize project summaries
- normalize project details
- create category maps
- create featured project lists

Acceptance:

- all project cards render from data
- all routes can resolve content by slug
- evidence status available in data

## Phase 3: Core Pages

Tasks:

- home page
- work page
- category pages
- project detail page
- expertise page
- plugins and accelerators page
- about page
- resume page
- contact page
- thanks page

Acceptance:

- all navigation links work
- all pages responsive
- all content represented

## Phase 4: Visual Design and Motion

Tasks:

- apply visual theme
- refine typography
- implement project cards
- implement filters
- implement Motion animations
- implement reduced-motion behavior
- add diagrams/placeholders

Acceptance:

- dark theme feels premium
- light theme polished
- animations are restrained
- mobile layout stable

## Phase 5: Contact and SEO

Tasks:

- implement Splitforms contact form
- add `/thanks`
- add metadata
- add Open Graph image
- add sitemap and robots
- add JSON-LD

Acceptance:

- form submits successfully
- metadata present
- SEO checks pass

## Phase 6: QA and Launch

Tasks:

- accessibility testing
- responsive testing
- performance testing
- browser testing
- content safety review
- production deployment

Acceptance:

- launch checklist complete
- public-safe review complete
- production URL verified

## Backlog Priorities

P0:

- routing
- content data model
- dark/light theme
- project card grid
- project detail pages
- contact form
- responsive QA

P1:

- animated transitions
- diagrams
- Open Graph images
- search/filter polish
- SEO structured data

P2:

- private draft mode
- MDX content rendering
- downloadable case-study PDF
- analytics dashboard
- blog/insights

## Definition of Done

A task is done when:

- it meets functional requirements
- it follows visual theme rules
- it is responsive
- it is accessible
- it does not expose sensitive content
- it is tested or verified
- it does not break existing pages
