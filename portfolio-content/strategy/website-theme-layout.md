# Website Theme, Layout, Responsive UX, and Visual System

## Website Goal

Create a premium, modern, executive-level portfolio website that presents Leelark Saxena as an enterprise Appian architect, AI workflow designer, plugin developer, and product-minded solution consultant.

The website must feel like a high-end professional solution portfolio, not a generic resume template.

Detailed visual tokens, dark/light theme rules, purple accent usage, component styling, and QA checks are defined in [Portfolio Visual Theme Design System](visual-theme-design-system.md).

## Recommended Website Structure

Primary navigation:

- Home
- Work
- Expertise
- Plugins and Accelerators
- About
- Resume
- Contact

## Route Map

Recommended public routes:

- `/` - Home
- `/work` - All work with category filters
- `/work/client-projects` - Client Projects
- `/work/plugins` - Plugins
- `/work/innovative-projects` - Innovative Projects
- `/work/accelerators` - Accelerators
- `/work/[slug]` - Case study detail page
- `/expertise` - Expertise and capability areas
- `/plugins-and-accelerators` - Reusable assets and plugin library
- `/about` - Professional profile
- `/resume` - Experience, education, certifications, publication
- `/contact` - Contact and professional links

## Breakpoint Specs

Mobile:

- width: 320-767 px
- single-column layout
- sticky or compact top navigation
- horizontal scroll filters
- project cards stacked
- case-study diagrams converted to vertical steps

Tablet:

- width: 768-1023 px
- two-column cards
- reduced hero visual
- case-study summary and metadata can sit side by side

Desktop:

- width: 1024-1439 px
- 12-column layout
- project cards in 2 or 3 columns
- case-study content max width around 900 px

Wide desktop:

- width: 1440 px and above
- max content width around 1320 px
- hero uses strong left/right composition
- do not stretch text lines excessively

Homepage sections:

1. Hero
2. Proof strip
3. Featured case studies
4. Expertise pillars
5. Plugins and accelerators preview
6. Appian Accelerate advisory highlight
7. Experience snapshot
8. Certifications and publication
9. Contact CTA

Work page sections:

1. Work page hero
2. Category filters
3. Featured case studies
4. Client projects
5. Plugins
6. Innovative projects
7. Accelerators

Case study page sections:

1. Project hero
2. Executive snapshot
3. Problem and context
4. My role
5. Architecture
6. Key features
7. UX and product decisions
8. Business value
9. Technologies and Appian capabilities
10. Related projects

## Visual Direction

### Personality

- premium
- modern
- elegant
- enterprise-grade
- calm
- confident
- sophisticated
- technical
- product-focused

### Color System

Recommended palette:

- Default theme: Executive Dark, using near-black, graphite, white text, subtle borders, and restrained deep-purple accents.
- Alternate theme: Studio Light, using off-white, white surfaces, charcoal text, clear borders, and deeper purple accents.
- Neutral foundation: black, white, graphite, and soft gray should do most of the visual work.
- Designer accent: dark purple and violet should be used for identity, selected states, focus rings, featured moments, and AI/plugin innovation highlights.
- Supporting accent: enterprise blue for integrations, architecture, and data movement.
- Evidence accent: green for confirmed outcomes and validation.
- Caution accent: amber for needs-confirmation and publishing caveats.

Avoid:

- excessive purple gradients
- decorative blobs
- generic stock-portfolio colors
- low contrast
- one-note dark-blue theme
- mechanical color inversion between dark and light themes

## Typography

Use a modern professional sans-serif family.

Hierarchy:

- Hero title: large, direct, controlled.
- Page title: strong and compact.
- Section heading: readable, not oversized.
- Card title: concise.
- Body: high readability.
- Tags: compact.

No negative letter spacing. No viewport-scaled text. Text must remain readable on mobile.

## Layout System

Desktop:

- 12-column grid.
- max content width around 1200 to 1320 px.
- case-study reading width around 760 to 900 px.
- cards in 2 or 3 columns depending on content density.

Tablet:

- 2-column cards.
- simplified diagrams.
- sticky navigation optional.

Mobile:

- single column.
- filters become segmented controls.
- case-study sections become stacked.
- architecture diagrams become vertical flows.

## Homepage Layout Detail

### Hero

Left:

- headline
- subheadline
- primary CTA: View Work
- secondary CTA: Download Resume
- proof badges

Right:

- architecture/product visual
- workflow diagram
- AI document intelligence preview
- Appian platform map

Do not use a generic stock photo.

### Featured Work

Use large cards for:

- ClaimRoute IQ
- Knowledge Center Chatbot
- Appian Accelerate Program
- EBRD ASB Modernization
- Custom HTML Document Viewer
- Appian Server Metrics Performance Triage Accelerator

### Expertise

Use six compact capability blocks:

- Appian Architecture
- AI and Document Intelligence
- Workflow Automation
- Plugin Development
- Enterprise UX
- Performance and Governance

## Project Card Design

Each card should include:

- project title
- category
- evidence status
- short summary
- role
- domain
- tags
- CTA

Example:

ClaimRoute IQ
Innovative Project / AI Product
AI-powered claims workflow with document extraction, eligibility validation, reviewer routing, and claim route logging.
Tags: Appian AI, Claims, Workflow, Human Review

## Motion and Interaction

Motion goal:

- make the portfolio feel premium, responsive, and intentional
- guide attention through identity, proof, project value, architecture, and outcomes
- support recruiter scanning and enterprise stakeholder review without slowing the page down

Use:

- subtle card hover
- section fade and small vertical reveal
- active filter state
- timeline step reveal
- architecture step highlight
- theme toggle crossfade
- link underline transition
- button press and focus feedback

Recommended timing:

- buttons and links: 120 to 180 ms
- filters and navigation: 180 ms
- cards and accordions: 220 to 280 ms
- page or hero entrance: maximum 420 ms
- stagger between related items: 40 to 60 ms

Theme behavior:

- Executive Dark can use low-glare fades, graphite elevation, and subtle purple edge glow for active or featured states.
- Studio Light should use clean border, shadow, and color transitions with deeper purple selected states.
- Theme switching should transition background, text, borders, and surfaces smoothly without flashing.

Page examples:

- Home: hero role statement appears first, proof strip second, featured projects third.
- Work: filters transition quickly, project cards fade and shift in small groups.
- Case studies: metadata and executive snapshot appear before architecture and detail blocks.
- Plugins and accelerators: component rows and feature matrices reveal in stable groups.
- Resume: timeline items use minimal fade and shift so recruiter scanning remains fast.

Avoid:

- heavy parallax
- slow animations
- decorative motion
- animations that reduce readability
- animated cursors
- typewriter effects
- bouncing cards
- rotating cards
- glowing animated backgrounds
- excessive number counters
- scroll-jacking

Accessibility:

- support reduced motion
- do not hide important content behind animation
- do not animate focus rings away
- do not rely on motion to communicate status
- keep mobile motion shorter and simpler than desktop

## Responsive Strategy

Mobile homepage order:

1. Hero
2. Proof badges
3. Featured work
4. Expertise
5. Plugins
6. Experience
7. Certifications
8. Contact

Mobile case study:

- executive snapshot first
- architecture as vertical process
- accordions for technical detail
- sticky bottom CTA optional

## Accessibility Strategy

Must support:

- WCAG AA contrast
- keyboard focus states
- semantic headings
- descriptive links
- text alternatives for visuals
- reduced motion
- no color-only status indicators
- accessible project filters
- accessible card links

## Content Components

Recommended reusable content components:

- proof badge
- capability block
- project card
- case-study summary panel
- architecture flow
- role/responsibility panel
- business value block
- technology tag list
- evidence status badge
- related work card

## Required Component List

Navigation:

- primary nav
- mobile menu
- category filter bar
- breadcrumb for case studies

Homepage:

- hero
- proof badge row
- featured project grid
- expertise pillar grid
- plugin preview strip
- Appian Accelerate advisory highlight
- experience snapshot
- certification/publication block
- contact CTA

Work listing:

- category filter
- project card
- evidence status badge
- tag list
- search/sort optional

Case study:

- project hero
- metadata panel
- executive snapshot
- architecture flow
- feature list
- UX decisions block
- business value block
- technology tags
- confirmation/evidence note
- related projects

Profile/resume:

- timeline
- certification cards
- skill groups
- publication card
- contact methods

## Content Fields

Project card fields:

- title
- primary category
- secondary tags
- evidence status
- one-line summary
- domain
- role
- CTA

Case study fields:

- title
- hero summary
- category
- evidence status
- evidence basis
- project context
- problem
- my role
- users/stakeholders
- solution overview
- architecture
- key features
- UX/product decisions
- business value
- technologies
- suggested visuals
- final copy
- confirmation needed

## Page-Level Wireframe Notes

Home:

- first viewport must establish role, proof, and CTA
- featured work should appear before detailed biography
- keep hero text direct and senior

Work:

- show category tabs near top
- use evidence status labels on cards
- keep old portfolio work visible but not dominant

Plugins and Accelerators:

- split into component plugins, document intelligence, Excel/file automation, and UX accelerators
- cross-list client-specific plugins such as Locale Date/DateTime Picker

Case Study:

- use executive summary before technical detail
- show architecture flow before implementation bullet lists
- keep "Confirmation Needed" out of public UI unless site has a private draft mode

Resume:

- lead with current Lead Consultant role
- group certifications and publication near top, not buried at bottom

Contact:

- focus on professional channels
- remove non-professional social placeholders

## Visual Asset Inventory Needed

High-priority assets:

- professional headshot
- ClaimRoute IQ screenshot or sanitized mock
- KCC/DocBot screenshot or sanitized mock
- custom document viewer screenshot
- NCD workflow visual
- Appian Accelerate workstream diagram
- EBRD modernization diagram
- dynamic grid example
- formatted Excel workflow diagram
- field-level audit before/after example

Optional assets:

- resume PDF
- certification badges
- publication link preview
- GitHub/plugin cards

## Final Theme Statement

The visual system should support the message that Leelark can bridge enterprise architecture, Appian delivery, AI product thinking, plugin innovation, and user-centered workflow design.
