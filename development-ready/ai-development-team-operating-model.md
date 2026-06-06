# AI Development Team Operating Model

## Purpose

This document defines the coordinated AI software development team for building the Leelark Saxena portfolio website from this repository.

It is designed for a continuous development run where the lead agent coordinates specialist subagents across planning, architecture, implementation, content, design, QA, accessibility, release, and GitHub Pages deployment.

## Target Outcome

Build and launch a premium, modern, responsive, animated, static frontend portfolio website at:

- `https://leelark.github.io/profile`

Repository:

- `https://github.com/leelark/profile`

GitHub Pages mode:

- Project site
- Required Astro `base`: `/profile/`
- Required Astro `site`: `https://leelark.github.io`

## Core Stack

- Astro
- React
- TypeScript
- Tailwind CSS
- Motion for React
- Static/content-driven data
- GitHub Pages
- GitHub Actions
- Splitforms contact form backend

The site must remain frontend-only. Do not add a backend server, database, private API layer, SSR runtime, or paid hosting dependency unless the user explicitly changes the architecture.

## Continuous Delivery Rule

The lead agent should keep working until one of these occurs:

- the user explicitly says stop, pause, or only report status
- a safety gate requires user approval
- a required external credential/dashboard action cannot be completed from the local environment
- a destructive or externally visible action is required and has not been approved
- a verified blocker makes further progress impossible

The lead agent must not stop just because a phase is complete. After each phase, it should run verification, commit if appropriate, update status, and move to the next phase.

## Safety Boundaries

Even in continuous mode, stop and ask for explicit approval before:

- force-pushing
- deleting existing remote history
- changing DNS, CNAME, custom domain, GitHub Pages settings, or Splitforms dashboard settings
- deploying production changes if deployment was not already authorized
- submitting a real production contact form test
- publishing unapproved client-sensitive content, screenshots, metrics, ownership claims, source exports, internal Appian IDs, environment names, logs, or credential-like strings
- enabling analytics or third-party tracking
- adding a paid service

Approval must name the exact action, destination, expected side effect, and rollback path.

## Team Structure

### 1. SDLC Orchestrator

Owns:

- phase sequencing
- subagent dispatch
- workstream boundaries
- review gates
- status updates
- commit cadence
- blocker handling
- final integration

Uses:

- `portfolio-sdlc-orchestrator`
- `portfolio-implementation-planner`
- `superpowers:dispatching-parallel-agents`
- `superpowers:subagent-driven-development`
- `superpowers:verification-before-completion`

Primary rule:

- Coordinate the team. Do not personally make every decision if a specialist subagent can independently inspect and report.

### 2. Product and Content Lead

Owns:

- profile content
- education and experience content
- expertise, skills, certifications, and publication content
- project summaries
- project detail content
- evidence status
- public-safe publishing review
- category and featured project mapping

Uses:

- `portfolio-content-system`

Must verify:

- every public page has a clean title, category, summary, and evidence status
- `Needs Confirmation` content is hidden, softened, or clearly marked before public launch
- no private client material or unverified metrics are published as facts

### 3. Frontend Architecture Lead

Owns:

- Astro architecture
- route structure
- static generation strategy
- React island boundaries
- TypeScript content models
- content import strategy
- GitHub Pages `site` and `base`
- SEO architecture
- performance architecture

Uses:

- `portfolio-frontend-architecture`

Must verify:

- all long-form content pages are statically rendered
- React is used only for interactive UI
- `/profile/` base-path behavior works for links, assets, redirects, and contact form thank-you flow

### 4. Astro Implementation Lead

Owns:

- Astro scaffold
- project structure
- layouts
- routes
- content data layer
- page templates
- static build output

Uses:

- `portfolio-frontend-implementation`

Must build:

- `/`
- `/work`
- `/work/client-projects`
- `/work/plugins`
- `/work/innovative-projects`
- `/work/accelerators`
- `/work/[slug]`
- `/expertise`
- `/plugins-and-accelerators`
- `/about`
- `/resume`
- `/contact`
- `/thanks`

### 5. Design System and UI Lead

Owns:

- Executive Dark default theme
- Studio Light alternate theme
- Tailwind token system
- typography
- layout rhythm
- responsive grids
- project cards
- case-study page visual hierarchy
- premium enterprise visual tone

Uses:

- `portfolio-design-system`

Must enforce:

- dark theme default
- light theme fully polished
- restrained deep-purple accent
- no one-note purple-heavy palette
- no nested cards
- no decorative gradient orbs, blobs, or bokeh
- stable dimensions for cards, controls, grids, and toolbars
- accessible contrast in both themes

### 6. Motion and Interaction Lead

Owns:

- theme toggle animation
- mobile navigation
- project filters
- project card transitions
- accordions or disclosure panels
- section reveals
- reduced-motion behavior

Uses:

- `portfolio-design-system`
- `portfolio-frontend-implementation`

Must enforce:

- restrained Motion for React usage
- no scroll-jacking
- no animated cursor
- no typewriter effects
- no heavy parallax
- no animation that delays recruiter scanning or client review

### 7. Contact Form Lead

Owns:

- Splitforms contact form
- accessible labels and errors
- validation
- no-JavaScript fallback
- `/thanks` redirect
- privacy copy
- spam and domain-lock launch requirements

Uses:

- `portfolio-contact-form`

Required form:

```html
<form action="https://splitforms.com/api/submit" method="POST">
  <input type="hidden" name="access_key" value="8897600acb7b48f09fb9d1f78895c3b6">
</form>
```

### 8. Accessibility, SEO, and Performance Lead

Owns:

- WCAG 2.2 AA
- keyboard navigation
- focus states
- semantic headings
- image alt text
- reduced motion
- Lighthouse targets
- Core Web Vitals
- metadata
- canonical URLs
- Open Graph
- JSON-LD
- sitemap
- robots

Uses:

- `portfolio-qa-accessibility`

Targets:

- Lighthouse Performance: 90+
- Lighthouse Accessibility: 95+
- Lighthouse Best Practices: 95+
- Lighthouse SEO: 95+
- LCP under 2.5 s
- CLS under 0.1
- INP under 200 ms

### 9. Browser QA Lead

Owns:

- local browser verification
- desktop screenshots
- mobile screenshots
- interaction checks
- overflow checks
- visual polish checks
- theme switching checks

Must test:

- 320 px
- 375 px
- 390 px
- 430 px
- 768 px
- 1024 px
- 1280 px
- 1440 px

### 10. Release and Operations Lead

Owns:

- GitHub Actions workflow
- GitHub Pages deployment
- preview build
- production launch checklist
- rollback plan
- post-launch checks

Uses:

- `portfolio-release-operations`

Must verify:

- GitHub Actions build is green
- GitHub Pages serves from `/profile/`
- production URL works
- internal links work under `/profile/`
- assets load under `/profile/`
- `/contact` and `/thanks` work under `/profile/`

## Subagent Coordination Rules

The lead agent should use subagents aggressively but with clean ownership.

Use subagents for independent workstreams such as:

- content normalization
- design review
- architecture review
- route/page implementation
- component implementation
- contact form review
- accessibility review
- SEO/performance review
- release review

Do not let multiple subagents edit the same files at the same time.

Recommended pattern:

1. Lead agent defines a phase and file ownership map.
2. Lead agent dispatches specialist subagents with narrow assignments.
3. Subagents return payload-only findings or patches.
4. Lead agent integrates changes.
5. Lead agent runs verification.
6. Lead agent commits.
7. Lead agent moves to the next phase.

Subagent assignments must include:

- exact scope
- exact files or directories
- allowed edits
- disallowed edits
- expected output
- verification command if relevant
- explicit instruction not to spawn child agents unless specifically asked

## Phase Plan

### Phase 0: Readiness

Goal:

- confirm implementation is authorized
- confirm GitHub Pages project-site target
- confirm official docs
- confirm public-safe rules
- confirm content structure

Subagents:

- Frontend Architecture Lead
- Product and Content Lead
- Release and Operations Lead

Exit criteria:

- stack confirmed
- `/profile/` base confirmed
- content safety rules accepted
- route list confirmed
- launch gates known

### Phase 1: Foundation

Goal:

- scaffold Astro frontend
- configure TypeScript, Tailwind, React, Motion
- set up lint/type/build scripts
- configure Astro `site` and `base`
- add GitHub Actions build/deploy workflow

Subagents:

- Frontend Architecture Lead
- Astro Implementation Lead
- Release and Operations Lead

Exit criteria:

- app runs locally
- build succeeds
- deploy workflow exists
- base-path config exists

### Phase 2: Content Data Layer

Goal:

- convert `portfolio-content/` into typed portfolio data
- create schemas/models for profile, projects, categories, skills, experience, certifications, and accelerators

Subagents:

- Product and Content Lead
- Frontend Architecture Lead

Exit criteria:

- every public project has a slug, category, title, summary, evidence status, and route
- hidden/draft content is not exposed publicly
- typecheck passes

### Phase 3: Core Pages

Goal:

- implement all required pages and routes
- render content from typed data
- create reusable layouts and components

Subagents:

- Astro Implementation Lead
- Design System and UI Lead
- Product and Content Lead

Exit criteria:

- every route renders
- navigation works
- all categories are represented
- project detail pages follow the standard structure

### Phase 4: Premium Design and Motion

Goal:

- implement final visual system
- polish both themes
- implement responsive UI
- add restrained animations

Subagents:

- Design System and UI Lead
- Motion and Interaction Lead
- Browser QA Lead

Exit criteria:

- dark theme is default
- light theme is complete
- animation supports reduced motion
- mobile layouts are stable
- no overlap, overflow, or unreadable text

### Phase 5: Contact, SEO, and Metadata

Goal:

- implement Splitforms contact
- implement `/thanks`
- implement SEO metadata, Open Graph, JSON-LD, sitemap, and robots

Subagents:

- Contact Form Lead
- Accessibility, SEO, and Performance Lead
- Release and Operations Lead

Exit criteria:

- form markup is correct
- `/thanks` works under `/profile/`
- metadata exists on every page
- sitemap and robots are generated

### Phase 6: Full QA

Goal:

- run accessibility, responsive, performance, SEO, browser, content-safety, and link checks

Subagents:

- Accessibility, SEO, and Performance Lead
- Browser QA Lead
- Product and Content Lead

Exit criteria:

- build passes
- typecheck/lint pass
- browser QA passes
- accessibility gates pass
- performance targets pass or documented remediation exists
- public-safe content review passes

### Phase 7: Launch

Goal:

- deploy to GitHub Pages
- verify production URL
- verify rollback path

Subagents:

- Release and Operations Lead
- Accessibility, SEO, and Performance Lead

Exit criteria:

- `https://leelark.github.io/profile` loads
- GitHub Actions is green
- internal links and assets work
- launch checklist is complete

## Master Prompt To Start Development

Copy and paste this prompt into a fresh Codex session from the repository root.

```text
You are the lead AI SDLC Orchestrator for the Leelark Saxena portfolio website.

Working directory:
C:\Users\leelark.saxena\Documents\Profile

Repository:
https://github.com/leelark/profile

Target production URL:
https://leelark.github.io/profile

I explicitly authorize you to start actual frontend website development in this repository now. Convert this planning/content repository into a complete Astro-based frontend portfolio website while preserving the existing planning/content documentation.

Primary objective:
Build and launch a premium, modern, responsive, animated, executive-level personal portfolio website for Leelark Saxena. The site must showcase enterprise Appian architecture, Senior Appian Consultant experience, technical leadership, AI solution design, plugin development, accelerators, client projects, innovative POCs, experience, education, skills, certifications, publication, and contact information.

Use this stack:
- Astro
- React
- TypeScript
- Tailwind CSS
- Motion for React
- Static/content-driven data
- GitHub Pages
- GitHub Actions
- Splitforms contact form backend

GitHub Pages configuration:
- This is a project site.
- Configure Astro `site` as `https://leelark.github.io`.
- Configure Astro `base` as `/profile/`.
- Ensure links, assets, redirects, sitemap, robots, Open Graph URLs, contact thank-you redirect, and GitHub Actions deployment all work under `/profile/`.

Required first reads:
1. `AGENTS.md`
2. `context.md`
3. `development-ready/README.md`
4. `development-ready/ai-development-team-operating-model.md`
5. `development-ready/technical-solution-design.md`
6. `development-ready/functional-requirements.md`
7. `development-ready/content-data-architecture.md`
8. `development-ready/content-normalization-contract.md`
9. `development-ready/page-component-specification.md`
10. `development-ready/contact-form-specification.md`
11. `development-ready/animation-interaction-specification.md`
12. `development-ready/qa-accessibility-performance-seo.md`
13. `development-ready/release-and-operations-plan.md`
14. `portfolio-content/README.md`
15. `portfolio-content/strategy/visual-theme-design-system.md`
16. `portfolio-content/strategy/website-theme-layout.md`
17. `portfolio-content/strategy/publish-readiness-checklist.md`

Use project-local skills:
- `portfolio-sdlc-orchestrator`
- `portfolio-content-system`
- `portfolio-design-system`
- `portfolio-frontend-architecture`
- `portfolio-frontend-implementation`
- `portfolio-implementation-planner`
- `portfolio-contact-form`
- `portfolio-qa-accessibility`
- `portfolio-release-operations`

Use subagents aggressively and properly:
- Spawn specialist subagents for independent workstreams.
- Use subagents for architecture review, content normalization, design review, implementation slices, contact form review, accessibility/SEO/performance QA, browser QA, and release review.
- Keep subagent assignments narrow, self-contained, and file-scoped.
- Do not let multiple subagents edit the same files at the same time.
- Collect subagent outputs explicitly, sanitize them, integrate them, verify, then continue.
- Subagents must not spawn child agents unless explicitly assigned to manage agents.

Operate as a 24x7 continuous AI software development team:
- Keep working until the portfolio website is implemented, verified, committed, and ready for GitHub Pages launch.
- Do not stop after planning.
- Do not stop after scaffolding.
- Do not stop after one page or one component.
- After each completed phase, run verification, commit useful progress, update status, and proceed to the next phase.
- If interrupted, resume from the latest git status, roadmap phase, and verification state.
- Provide concise progress updates while working.

Stop only for these conditions:
- I explicitly say stop or pause.
- A destructive action needs approval.
- A production/external side effect needs approval.
- A secret, private client detail, raw source export, Appian internal object ID, environment name, log, credential-like value, or unapproved metric would be published.
- Splitforms dashboard/domain-lock setup requires manual user action.
- GitHub Pages or DNS settings require manual user action.
- A blocker cannot be resolved locally.

Destructive/external actions requiring approval:
- force push
- deleting files not created by this implementation
- changing remote history
- changing GitHub Pages settings
- changing DNS/custom domain/CNAME
- submitting a real production contact form test
- enabling analytics/tracking
- deploying production if the workflow has not already been authorized
- publishing client-sensitive content

Build requirements:
- Preserve existing docs and content.
- Add the Astro app structure in this repository.
- Implement all required routes:
  - `/`
  - `/work`
  - `/work/client-projects`
  - `/work/plugins`
  - `/work/innovative-projects`
  - `/work/accelerators`
  - `/work/[slug]`
  - `/expertise`
  - `/plugins-and-accelerators`
  - `/about`
  - `/resume`
  - `/contact`
  - `/thanks`
- Render content from typed data derived from `portfolio-content/`.
- Support dark theme by default and polished light theme as an option.
- Use restrained Motion for React interactions.
- Support reduced motion.
- Use Splitforms for the contact form:
  `<form action="https://splitforms.com/api/submit" method="POST">`
  `<input type="hidden" name="access_key" value="8897600acb7b48f09fb9d1f78895c3b6">`
- Do not add a backend, database, private API, SSR runtime, or paid hosting dependency.

Quality gates:
- `npm run build` passes.
- typecheck passes.
- lint passes if configured.
- all routes resolve.
- all internal links work under `/profile/`.
- responsive QA passes at 320, 375, 390, 430, 768, 1024, 1280, and 1440 px.
- keyboard navigation works.
- focus states are visible.
- forms have accessible labels and validation.
- reduced motion works.
- Lighthouse targets are met or remediation is documented:
  - Performance 90+
  - Accessibility 95+
  - Best Practices 95+
  - SEO 95+
- public-safe content review passes.
- no obsolete stack references return as implementation guidance.
- GitHub Actions workflow builds the Astro site for GitHub Pages.

Commit strategy:
- Commit after meaningful working milestones.
- Use clear commit messages.
- Keep the working tree clean after each phase.
- Do not push destructive changes without approval.

Begin now:
1. Inspect the repo.
2. Create an implementation phase plan.
3. Dispatch subagents for readiness, architecture, content, design, and release checks.
4. Scaffold the Astro frontend.
5. Continue through all phases until the site is build-ready and launch-ready, stopping only for the approval/blocker conditions above.
```

## Short Prompt Variant

Use this only if the session already has all project context loaded.

```text
Start full frontend development for the Leelark portfolio now. Use `development-ready/ai-development-team-operating-model.md` as the controlling runbook. Build the Astro/React/TypeScript/Tailwind/Motion static site for GitHub Pages at `https://leelark.github.io/profile` with Astro `site: "https://leelark.github.io"` and `base: "/profile/"`. Use the project-local portfolio skills and specialist subagents across architecture, content, design, implementation, contact, QA, accessibility, SEO, release, and browser verification. Continue until implemented, verified, committed, and launch-ready unless I explicitly stop you or a safety gate requires approval.
```
