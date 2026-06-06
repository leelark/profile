# Technical Solution Design

## Recommended Stack

Primary recommendation:

- Astro
- React
- TypeScript
- Tailwind CSS
- Motion for React
- Static/content-driven data
- GitHub Pages hosting
- GitHub Actions deployment
- Splitforms contact form backend

## Stack Positioning

This portfolio should be a complete frontend-only static website. It should not require a backend server, database, server functions, SSR runtime, or private API layer.

Astro should be used as the static site framework because the portfolio is content-heavy, SEO-sensitive, and route-heavy. Astro can generate static HTML pages for every route while still allowing React components where interactivity is needed.

React should be used for interactive UI:

- theme toggle
- mobile navigation
- project filters
- animated cards
- accordions
- Motion-powered interactions
- contact form progressive enhancement if needed

TypeScript should be used for the content data model, route data, project schemas, and component props.

Tailwind CSS should implement the dark/light design system, responsive layout, tokens, and component styling.

Motion for React should power restrained animations in React islands/components where CSS transitions are not enough.

GitHub Pages should host the final static output. GitHub Actions should build and deploy the site from the GitHub repository.

Splitforms should handle contact form submissions through standard frontend HTML form POST.

## Why This Stack Fits

Astro fits the portfolio because it can:

- build static HTML pages for GitHub Pages
- support content-heavy Markdown/MDX-style case studies
- provide strong SEO foundations
- keep client JavaScript small
- use React only where needed
- generate route-level pages without a backend

React and TypeScript support reusable interactive components and type-safe portfolio data.

Tailwind CSS supports the planned token-driven dark/light theme, responsive layout, and precise component styling.

Motion for React supports the restrained animation system already documented in the visual theme plan.

GitHub Pages and GitHub Actions fit the user's hosting requirement: the site will live in GitHub and deploy from the repository.

Splitforms supports the required no-backend contact form flow using standard HTML form submission.

## Architecture Overview

Recommended architecture:

```text
portfolio-content markdown
        |
        v
content normalization layer
        |
        v
typed portfolio data model
        |
        v
Astro static pages
        |
        v
React islands for interactive UI
        |
        v
static dist output
        |
        v
GitHub Pages via GitHub Actions
```

## Build and Rendering Strategy

Use static build output for:

- home
- work listing
- category pages
- project detail pages
- expertise
- about
- resume
- plugins and accelerators
- contact
- thanks

Use Astro pages/layouts for:

- static routes
- SEO metadata
- case-study rendering
- profile/resume pages
- project detail pages
- content collection rendering

Use React components only for:

- theme toggle
- category filter interactions
- search/sort if added
- animated reveals
- mobile navigation
- contact form progressive enhancement
- local UI state such as accordions

Avoid React-only SPA routing because GitHub Pages is static hosting and the portfolio needs crawlable, direct-linkable pages.

## Proposed Routes

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

## GitHub Pages Route Requirements

Implementation must account for GitHub Pages path behavior.

If using a user/organization site repository:

- URL shape: `https://<username>.github.io/`
- Astro `site` should point to that URL.
- `base` can usually remain `/`.

If using a project repository:

- URL shape: `https://<username>.github.io/<repo>/`
- Astro `base` must match the repository path.
- Internal links and asset paths must respect the configured base path.

If using a custom domain:

- configure GitHub Pages custom domain
- add the `CNAME` file if needed
- update Astro `site`
- remove project `base` when the custom domain serves from root

## Content Source Model

Source of truth:

- `portfolio-content/`

Implementation should transform content into a typed data layer. The content can be imported from Markdown/MDX/content collections or manually normalized into TypeScript data modules during implementation.

Recommended approach for first build:

- keep existing Markdown as editorial source
- use Astro content collections or typed data modules
- preserve links back to source Markdown during development
- avoid introducing a CMS in the first version

Future option:

- migrate richer case-study content to MDX if embedded diagrams or custom case-study components are needed

## Styling Architecture

Use the visual system defined in:

- `portfolio-content/strategy/visual-theme-design-system.md`
- `development-ready/animation-interaction-specification.md`

Theme requirements:

- dark theme default
- light theme option
- theme toggle in header
- persisted user preference
- no mechanical inversion
- no purple-heavy visual overload

CSS/token strategy:

- define semantic CSS variables for dark and light themes
- map Tailwind utilities to semantic variables where practical
- keep colors centralized
- do not hard-code colors inside individual components except for documented one-off visuals

## Motion Architecture

Use Motion for React for:

- page entrance inside interactive regions
- section reveal when implemented as a React island
- project card hover
- filter transitions
- mobile menu
- theme toggle icon transition
- architecture diagram reveal

Use CSS transitions for:

- static Astro-rendered page transitions where possible
- color
- border
- background
- focus
- link underline

Respect reduced motion:

- disable scroll reveals
- remove stagger
- remove scale motion
- keep state changes immediate

## Contact Form Architecture

Use Splitforms standard POST form:

```html
<form action="https://splitforms.com/api/submit" method="POST">
  <input type="hidden" name="access_key" value="8897600acb7b48f09fb9d1f78895c3b6">
</form>
```

Implementation must add:

- name field
- email field
- company field
- role or inquiry type field
- message field
- hidden redirect field to `/thanks`
- honeypot field if supported
- required attributes
- autocomplete attributes
- accessible labels
- validation/help text

The access key appears in the HTML by design for this provider. Lock it to the production domain in the Splitforms dashboard before launch.

## SEO and Metadata Architecture

Every static page should include:

- title
- description
- canonical URL
- Open Graph title
- Open Graph description
- Open Graph image
- structured metadata where appropriate

Recommended JSON-LD:

- Person
- WebSite
- CreativeWork for major case studies
- BreadcrumbList for project pages

## Security and Privacy Architecture

Rules:

- do not store private secrets in frontend source code
- do not publish raw client assets
- sanitize screenshots
- do not expose private logs
- do not include Appian object IDs
- do not include private key material
- do not include unverified metrics as facts
- lock Splitforms key to domain
- add spam prevention supported by Splitforms
- remember GitHub Pages is public static hosting

## Deployment Recommendation

Primary target:

- GitHub Pages

Deployment method:

- GitHub Actions

Why:

- matches the required GitHub hosting direction
- supports static frontend hosting
- keeps source and deployment in one GitHub repository
- supports custom domains and HTTPS
- supports repeatable builds from committed source

Build output:

- `dist`

Expected deployment flow:

1. Push to main branch.
2. GitHub Actions installs dependencies.
3. GitHub Actions builds the Astro site.
4. GitHub Pages deploys the static output.
5. Production site is served from GitHub Pages or a configured custom domain.

## Non-Goals For First Build

Do not include in the first implementation unless explicitly requested:

- backend API
- server runtime
- database
- user authentication
- CMS
- analytics-heavy tracking
- blog engine
- admin panel
- complex 3D scene
- animation-heavy hero that delays content

## Build Acceptance Criteria

The first implementation is technically complete when:

- all planned routes exist as static pages
- all portfolio content categories are represented
- project detail pages render consistently
- theme toggle works
- contact form submits to Splitforms
- `/thanks` page exists
- responsive behavior works from 320 px upward
- accessibility checks pass
- reduced motion is supported
- GitHub Pages deployment works
- performance and SEO targets are met
