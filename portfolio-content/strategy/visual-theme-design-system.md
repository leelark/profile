# Portfolio Visual Theme Design System

## Purpose

This document defines the visual theme for the new Leelark Saxena portfolio website. It is a planning and design-content artifact only. It does not prescribe implementation code or framework choices.

The design goal is a premium, modern, executive-level portfolio experience that presents Leelark as an enterprise solution architect, Senior Appian Consultant, AI solution designer, plugin developer, product builder, and workflow automation specialist.

The website should feel precise, calm, architectural, and high-end. It should avoid the look of a generic developer portfolio, startup landing page, or visually loud AI template.

## Theme Principle

The portfolio should use a neutral black, white, graphite, and soft-gray foundation with a controlled designer purple accent system.

Dark theme is the default experience.

Light theme is a fully designed alternate mode, not a color inversion.

Purple should signal identity, focus, active states, AI/product innovation, and selected work. It should not dominate every section, background, card, or gradient.

## Theme Names

### Default Theme: Executive Dark

Executive Dark is the primary portfolio theme.

Design qualities:

- near-black background
- graphite surfaces
- soft neutral borders
- high-contrast white text
- restrained purple highlights
- premium enterprise feel
- minimal glare
- strong readability for case studies

Best used for:

- homepage
- featured work
- AI and innovation pages
- plugin and architecture showcases
- executive presentation mode

### Alternate Theme: Studio Light

Studio Light is the light theme option.

Design qualities:

- clean off-white background
- white and light-gray surfaces
- dark charcoal text
- deeper purple accents
- editorial readability
- calm consulting portfolio tone

Best used for:

- resume
- about page
- long-form case studies
- recruiter review
- print-friendly reading

### Accent Personality: Deep Purple

The designer color layer is a deep purple system. It should feel premium and technical, not playful or neon.

Purple usage:

- primary CTA highlight
- active navigation indicator
- selected category filter
- focus ring
- AI/project innovation markers
- featured case-study emphasis
- subtle diagram nodes
- small metric accents

Avoid using purple for:

- every background
- every card
- body text
- large gradients across entire pages
- all category labels
- warning or error states

## Color Strategy

### Neutral Foundation

The site should be built from a strong neutral foundation.

Black and graphite create authority in dark mode. White and soft gray create clarity in light mode. Purple sits above this foundation as a controlled identity accent.

### Black Scale

| Token | Value | Usage |
| --- | --- | --- |
| black-950 | `#050509` | darkest page background, hero base |
| black-900 | `#090A10` | default dark background |
| black-850 | `#0D0F18` | dark surface base |
| black-800 | `#131622` | elevated dark surface |
| black-750 | `#1A1E2B` | subtle dark border and divider |
| black-700 | `#252A38` | stronger dark border |

### White Scale

| Token | Value | Usage |
| --- | --- | --- |
| white-000 | `#FFFFFF` | pure white surfaces, light cards |
| white-050 | `#F8FAFC` | light page background |
| white-100 | `#EEF2F7` | light elevated background |
| white-150 | `#E8ECF2` | subtle border |
| white-200 | `#D8DEE8` | stronger border |

### Purple Scale

| Token | Value | Usage |
| --- | --- | --- |
| purple-950 | `#211033` | deepest purple surface tint |
| purple-900 | `#321652` | dark purple accent surface |
| purple-800 | `#4A2078` | deep purple border/fill |
| purple-700 | `#6230A3` | light-theme active accent |
| purple-600 | `#7C3AED` | primary brand accent |
| purple-500 | `#8B5CF6` | dark-theme interactive accent |
| purple-400 | `#A78BFA` | dark-theme hover and emphasis |
| purple-300 | `#C4B5FD` | dark-theme readable purple text |
| purple-100 | `#EDE9FE` | light purple tag surface |
| purple-050 | `#F5F3FF` | light purple background tint |

### Dark Theme Tokens

| Semantic Token | Value | Usage |
| --- | --- | --- |
| bg-primary | `#07080D` | main page background |
| bg-secondary | `#0D0F18` | secondary page bands |
| surface-primary | `#131622` | cards, panels, project previews |
| surface-elevated | `#191D2A` | modals, sticky nav, highlighted blocks |
| border-subtle | `#1A1E2B` | quiet dividers |
| border-strong | `#252A38` | card outlines, input borders |
| text-primary | `#F5F7FA` | primary text |
| text-secondary | `#A7AFBF` | supporting text |
| text-muted | `#747E91` | metadata, captions |
| accent-primary | `#8B5CF6` | primary purple accent |
| accent-strong | `#A78BFA` | hover, readable dark-mode accent |
| accent-muted | `#321652` | subtle purple surface |
| focus-ring | `#C4B5FD` | keyboard focus |
| success | `#22C55E` | confirmed outcomes, validation |
| warning | `#F59E0B` | needs confirmation, caveats |
| danger | `#EF4444` | errors, blocked states |
| info | `#38BDF8` | integration, architecture, data flows |

### Light Theme Tokens

| Semantic Token | Value | Usage |
| --- | --- | --- |
| bg-primary | `#F8FAFC` | main page background |
| bg-secondary | `#EEF2F7` | secondary page bands |
| surface-primary | `#FFFFFF` | cards, panels, project previews |
| surface-elevated | `#F1F4F8` | modals, sticky nav, highlighted blocks |
| border-subtle | `#E8ECF2` | quiet dividers |
| border-strong | `#D8DEE8` | card outlines, input borders |
| text-primary | `#111827` | primary text |
| text-secondary | `#4B5565` | supporting text |
| text-muted | `#6B7280` | metadata, captions |
| accent-primary | `#6D28D9` | primary purple accent |
| accent-strong | `#4C1D95` | strong accent, active state |
| accent-muted | `#F1EAFF` | subtle purple surface |
| focus-ring | `#7C3AED` | keyboard focus |
| success | `#15803D` | confirmed outcomes, validation |
| warning | `#B45309` | needs confirmation, caveats |
| danger | `#B91C1C` | errors, blocked states |
| info | `#0284C7` | integration, architecture, data flows |

## Semantic Color Usage

### Purple

Use for:

- primary brand identity
- selected navigation item
- selected work filter
- focused input or interactive element
- "featured" indicator
- AI capability highlight
- plugin innovation highlight
- subtle diagram emphasis

Rules:

- Use purple text on dark backgrounds only when it is `purple-300` or lighter.
- Use purple text on light backgrounds only when it is `purple-700` or darker.
- Use one purple-filled CTA per page or major viewport.
- Use subtle purple borders more often than large purple fills.

### Blue

Use for:

- architecture
- integrations
- data flows
- enterprise systems
- workflow orchestration
- technical diagrams

Blue should support technical clarity without competing with purple identity.

### Green

Use for:

- evidence-backed outcomes
- validation
- completed states
- productivity gains
- confirmed results

Green should not be used for innovation branding.

### Amber

Use for:

- needs confirmation
- draft evidence
- caution notes
- publishing caveats
- content requiring review before public release

Amber must be paired with a text label. Do not rely on color alone.

### Red

Use only for:

- errors
- broken states
- unavailable content
- blocked actions

Red should never be used as a category color.

## Portfolio Category Visual Language

### Client Projects

Tone:

- restrained
- proof-led
- enterprise
- stakeholder-focused

Visual treatment:

- neutral cards
- blue or graphite metadata accents
- strong executive summary
- visible role and impact fields
- minimal decorative styling

Recommended accent:

- info blue for architecture and integration
- green only for confirmed business value

### Plugins

Tone:

- technical
- productized
- reusable
- component-focused

Visual treatment:

- structured capability panels
- version/evidence style labels
- API/component architecture diagrams
- reusable use-case matrix

Recommended accent:

- purple for innovation and Appian component identity
- blue for integration boundaries

### Innovative Projects

Tone:

- product-minded
- AI-aware
- experimental but credible
- solution-oriented

Visual treatment:

- richer hero visuals
- purple highlights allowed more frequently
- decision-flow diagrams
- outcome and productivity framing

Recommended accent:

- purple for AI/product positioning
- teal/green for productivity and successful decisioning

### Accelerators

Tone:

- repeatable
- reusable
- delivery-focused
- governance-aware

Visual treatment:

- pattern-library layout
- before/after workflow snapshots
- adoption guidance
- implementation benefits

Recommended accent:

- graphite, blue, and amber
- purple only when the accelerator is framed as productized innovation

## Typography System

### Recommended Font Direction

Primary sans-serif:

- Inter
- Geist
- Satoshi
- Manrope

Technical mono:

- JetBrains Mono
- IBM Plex Mono
- Geist Mono

Design rule:

- Use one primary sans-serif family and one mono family.
- Do not mix too many typefaces.
- Do not use negative letter spacing.
- Do not scale typography directly with viewport width.

### Type Hierarchy

| Level | Desktop Size | Mobile Size | Weight | Usage |
| --- | --- | --- | --- | --- |
| Hero title | 56-72 px | 38-46 px | 650-750 | homepage only |
| Page title | 44-56 px | 32-40 px | 650-750 | page headers |
| Section heading | 28-36 px | 24-30 px | 600-700 | major sections |
| Subsection heading | 20-24 px | 18-22 px | 600 | case-study sections |
| Card title | 18-22 px | 17-20 px | 600 | project cards |
| Body | 16-18 px | 16 px | 400-450 | main copy |
| Small/meta | 13-14 px | 13-14 px | 450-550 | labels, tags, metadata |
| Mono label | 12-13 px | 12-13 px | 500 | technical tags |

### Readability Rules

- Body line height should be 1.55 to 1.7.
- Headings should be compact but readable.
- Long-form case-study text should use a content width of 760 to 900 px.
- Avoid full-width paragraphs on wide screens.
- Buttons and tags must handle long words and project names without overflow.

## Spacing System

Use an 8 px foundation with smaller 4 px increments where useful.

| Token | Value | Usage |
| --- | --- | --- |
| space-1 | 4 px | tight icon/text spacing |
| space-2 | 8 px | tags, compact controls |
| space-3 | 12 px | small card internal spacing |
| space-4 | 16 px | normal component spacing |
| space-5 | 24 px | card padding, section rhythm |
| space-6 | 32 px | group spacing |
| space-7 | 48 px | section spacing |
| space-8 | 64 px | major page sections |
| space-9 | 96 px | hero and large transitions |

Rules:

- Use more vertical space around high-value sections.
- Keep repeated project cards denser than hero and narrative sections.
- Maintain stable card heights where comparison is important.
- Do not make every section a floating card.

## Radius, Borders, and Elevation

### Border Radius

| Element | Radius |
| --- | --- |
| Buttons | 8 px |
| Project cards | 8 px |
| Tags and chips | 999 px only for compact pill labels |
| Inputs | 8 px |
| Modals | 10-12 px |
| Large feature panels | 8-12 px |

Rules:

- Prefer 8 px or less for cards and core controls.
- Avoid overly rounded portfolio-template styling.
- Do not put cards inside cards.

### Borders

Dark theme:

- subtle borders should be visible without glowing
- use border-subtle for dividers and border-strong for cards

Light theme:

- borders should prevent white-on-white ambiguity
- use shadow sparingly

### Shadows and Glow

Dark theme:

- use soft elevation and subtle purple glow only on active or featured elements
- avoid neon edges

Light theme:

- use low-opacity neutral shadows
- use purple tint only for selected and featured states

Suggested glow rules:

- dark purple glow: `rgba(124, 58, 237, 0.20)` to `rgba(124, 58, 237, 0.28)`
- light purple glow: `rgba(124, 58, 237, 0.10)` to `rgba(124, 58, 237, 0.16)`
- do not apply glow to every card

## Layout System

### Desktop

- Use a 12-column grid.
- Page max width: 1200 to 1320 px.
- Case-study reading width: 760 to 900 px.
- Project card grids: 2 or 3 columns depending on content density.
- Keep summary, role, impact, and evidence visible near the top of each case study.

### Tablet

- Use 2-column project grids.
- Keep filters visible near the top.
- Convert complex architecture diagrams into simpler grouped blocks.
- Reduce hero visual complexity.

### Mobile

- Use a single-column layout.
- Keep primary CTA and project category filters easy to reach.
- Buttons should be at least 44 px tall.
- Project metadata should stack under the title.
- Tags should wrap cleanly.
- Architecture diagrams should collapse into vertical step flows.
- Avoid horizontal overflow in project titles, plugin names, and technical tags.

## Navigation Design

Primary navigation:

- Home
- Work
- Expertise
- Plugins and Accelerators
- About
- Resume
- Contact

Navigation behavior:

- Desktop uses a calm top navigation.
- Mobile uses a compact menu with clear tap targets.
- Active page uses a subtle purple underline, left border, or small indicator.
- Do not use large purple nav blocks.
- Theme toggle appears in the header and remains visible but not dominant.

Theme toggle:

- Default is dark.
- User preference should persist.
- If system preference is detected, still treat dark as the intentional default unless the user changes it.
- Use icon plus accessible label.
- Toggle state must be keyboard operable.

## Component Design

### Buttons

Primary button:

- one per major viewport
- purple or neutral-black with purple edge depending on context
- used for "View Featured Work", "Download Resume", or "Contact"

Secondary button:

- transparent or neutral surface
- subtle border
- used for supporting actions

Tertiary button:

- text or icon button
- used for filters, sort, and low-priority actions

Button rules:

- minimum height 44 px
- clear focus ring
- no text overflow
- do not use purple-filled buttons for every action

### Project Cards

Required card content:

- project title
- category
- evidence status
- one-line value proposition
- domain
- role
- key capabilities
- CTA

Visual hierarchy:

1. title
2. one-line value proposition
3. category and evidence status
4. role/domain
5. capability tags
6. CTA

Card styling:

- dark theme: graphite surface with soft border
- light theme: white surface with clear border
- featured cards can use a subtle purple or blue edge
- evidence status should be visible but not visually louder than the title

### Category Filters

Filters:

- Featured
- Client Projects
- Plugins
- Innovative Projects
- Accelerators
- All Work

Behavior:

- selected state uses purple accent
- unselected state remains neutral
- mobile filters can scroll horizontally
- category names should not wrap awkwardly

### Evidence Status Badges

Recommended labels:

- Evidence-backed
- Draft from source material
- Needs confirmation
- Confidential details sanitized

Rules:

- every badge needs text, not color alone
- needs confirmation uses amber
- evidence-backed uses green
- sanitized uses blue or graphite
- draft uses neutral gray

### Tags

Tag types:

- technology tags
- domain tags
- role tags
- capability tags
- Appian capability tags

Visual treatment:

- neutral by default
- selected or featured tags may use purple tint
- technical tags can use mono type
- tags must wrap without layout shift

### Architecture Diagrams

Diagram principles:

- use clear nodes and connectors
- show system boundaries
- distinguish user, Appian layer, AI/service layer, integration layer, and document/data layer
- use blue for integrations and data movement
- use purple for AI or plugin innovation
- use green for outcomes or validation

Mobile behavior:

- diagrams become stacked step cards or accordion sections
- connectors become numbered vertical steps

### Case Study Hero

Required content:

- project name
- category
- one-line positioning
- role
- context
- evidence status
- key capabilities
- primary CTA or anchor links

Visual treatment:

- strong title
- calm metadata
- optional architecture visual or product screenshot
- dark theme can use graphite and purple accent
- light theme should remain editorial and crisp

### Proof Strip

Purpose:

- quickly establish credibility for recruiters and enterprise stakeholders

Content examples:

- Lead Consultant
- Senior Appian Consultant
- Appian L3 Certified
- Plugin Developer
- AI Workflow Designer
- Enterprise Workflow Automation
- Research Publication

Visual treatment:

- compact badges
- neutral border
- limited purple accents
- no large decorative cards

### Resume Timeline

Visual treatment:

- clean vertical timeline
- current role highlighted subtly
- Appian, architecture, AI, and product ownership callouts
- avoid dense paragraph blocks

## Page Treatment Guidelines

### Home Page

Goal:

- establish Leelark's professional positioning immediately.

Visual approach:

- dark theme default
- strong typography
- concise hero copy
- visible proof strip
- featured projects above long biography
- restrained purple identity accents

Homepage hierarchy:

1. identity and role statement
2. high-value CTA
3. proof strip
4. featured case studies
5. expertise pillars
6. plugins and accelerators preview
7. experience and certifications
8. contact CTA

### Work Page

Goal:

- help recruiters, clients, and hiring managers quickly understand the range and depth of work.

Visual approach:

- category filters at top
- featured work first
- consistent project cards
- visible evidence status
- strong grouping by Client Projects, Plugins, Innovative Projects, and Accelerators

### Case Study Page

Goal:

- present each project as enterprise solution work, not just a task list.

Visual approach:

- executive summary before technical detail
- architecture and decisioning sections near the top
- business value and role clearly visible
- consistent section order across all project pages
- confirmation notes remain private or draft-only

### Plugins and Accelerators Page

Goal:

- position reusable components as productized engineering assets.

Visual approach:

- product-library structure
- capability cards
- reuse scenarios
- Appian integration framing
- version/status/evidence labels

### Expertise Page

Goal:

- show capability depth across architecture, Appian, AI, UX/product thinking, and delivery leadership.

Visual approach:

- capability pillars
- proof links to projects
- skill clusters
- certification and publication callouts

### Resume Page

Goal:

- support recruiter scanning and interview preparation.

Visual approach:

- clean light-mode-compatible reading surface
- concise experience timeline
- certifications and publication near the top
- downloadable resume action
- no decorative distraction

### Contact Page

Goal:

- create a professional close with clear next steps.

Visual approach:

- minimal
- direct
- role-specific prompts
- professional links only

## Motion and Animation System

### Motion Purpose

Animation should make the portfolio feel premium, responsive, and intentionally designed. It should guide attention through content, clarify hierarchy, and make interactions feel polished.

Animation should not become the personality of the site. The content, project evidence, architecture thinking, and product judgment should remain the main focus.

### Motion Personality

The motion language should feel:

- quiet
- confident
- precise
- fast
- subtle
- executive-level
- content-led
- technically polished

It should not feel:

- playful
- elastic
- flashy
- gamified
- noisy
- startup-template-like

### Motion Principles

Quiet confidence:

- Use animation to clarify structure, not to entertain.
- Let important content arrive smoothly without delaying reading.

Fast feedback:

- Buttons, links, filters, and cards should respond immediately.
- Most interaction feedback should complete under 200 ms.

Layered depth:

- Use opacity, small vertical movement, slight scale, and subtle border changes.
- Avoid heavy shadows, large zooms, or dramatic movement.

Theme-aware motion:

- Executive Dark can use softer fades, graphite elevation, and restrained purple edge glows.
- Studio Light should use cleaner shadow transitions, border changes, and crisp color crossfades.

Content-first sequencing:

- Reveal identity, role, proof, and project value before decorative details.
- Case studies should reveal executive summary and evidence before long technical sections.

### Motion Tokens

| Token | Value | Usage |
| --- | --- | --- |
| motion-instant | 80 ms | reduced-motion state changes, immediate feedback |
| motion-fast | 120 ms | button hover, press, link underline |
| motion-base | 180 ms | filter selection, nav active state, tag transition |
| motion-slow | 280 ms | card reveal, accordion open, section content reveal |
| motion-page | 420 ms | page entrance, hero sequence, theme crossfade maximum |
| delay-stagger-tight | 40 ms | compact list reveal |
| delay-stagger-base | 60 ms | card or metric reveal |
| move-xs | 4 px | link, badge, small control movement |
| move-sm | 8 px | section reveal, card entrance |
| move-md | 16 px | hero entrance maximum |
| scale-press | 0.98 | button press |
| scale-hover | 1.01 to 1.015 | card or CTA hover maximum |

### Easing Rules

Standard ease:

- use for most UI transitions
- should feel direct and controlled
- recommended behavior: quick start, smooth finish

Emphasized ease:

- use for page and section entrance
- should feel premium but not slow
- recommended behavior: crisp arrival with a refined finish

Exit ease:

- use for closing menus, drawers, tooltips, and temporary UI
- should complete quickly

Avoid:

- bounce easing
- elastic easing
- spring effects that overshoot
- slow cinematic easing on everyday controls

### Page-Level Animation

Homepage:

- Hero title and role statement should fade in first.
- Proof strip should appear immediately after the hero copy.
- Featured project cards can reveal with a small stagger.
- Purple accents should animate as subtle underline, edge, or glow changes, not large moving gradients.

Work page:

- Category filters should transition quickly between selected states.
- Project cards should reveal in small groups, not one-by-one across the whole page.
- Sorting or filtering should use a clean fade and slight vertical shift.
- Preserve scroll position and avoid jarring layout jumps.

Case study page:

- Hero metadata appears first.
- Executive snapshot appears next.
- Architecture and value blocks can reveal as the user scrolls.
- Diagrams can highlight one step at a time only when it improves understanding.
- Do not animate long paragraphs.

Plugins and accelerators page:

- Feature matrices can reveal by row or group.
- Component previews can use subtle hover emphasis.
- Reuse scenarios should appear as stable, scannable content.

Resume and about pages:

- Timeline items can fade in with a small vertical shift.
- Certification and publication blocks should remain calm and readable.
- Avoid motion that makes recruiter scanning slower.

Contact page:

- Keep animation minimal.
- Use a simple CTA hover, focus ring, and link underline transition.

### Component-Level Microinteractions

Buttons:

- hover: border or background shift in 120 to 180 ms
- press: slight scale to 0.98
- focus: visible focus ring with no delayed animation
- avoid: bouncing, large lift, glow on every button

Links:

- underline or accent line can draw from left to right
- transition should complete within 160 ms
- link color should remain readable throughout transition

Project cards:

- hover: border brightens, card lifts by 1 to 2 px, optional subtle shadow
- featured card: restrained purple or blue edge
- avoid: card rotation, 3D tilt, large zoom, animated background

Category filters:

- selected state transitions in 180 ms
- selected filter can use purple background tint or underline
- unselected filters remain neutral

Evidence badges:

- no decorative animation
- status should be immediately readable
- color and text must remain stable

Theme toggle:

- icon can crossfade or rotate subtly
- color transition should complete in 180 to 240 ms
- page background, text, borders, and surfaces should crossfade smoothly
- do not flash white during dark-to-light transition

Architecture diagrams:

- step highlight can fade or move subtly
- connectors should not animate continuously
- animated diagram states should support the explanation, not distract from it

Accordions:

- open/close in 220 to 280 ms
- combine height, opacity, and small movement if implementation supports it safely
- avoid bounce and excessive delay

Metrics and proof badges:

- use fade and slight movement
- avoid counting animations unless the metric is verified and genuinely meaningful
- do not animate unconfirmed numbers

### Theme-Specific Motion

Executive Dark:

- use low-glare fades
- use subtle purple edge glow only on active, focused, or featured elements
- prefer graphite elevation over bright shadow
- keep motion understated to preserve executive tone

Studio Light:

- use crisp border and shadow transitions
- use deeper purple for selected states
- avoid washed-out low-contrast hover states
- keep transitions clean and editorial

### Motion by Portfolio Goal

Recruiter scanning:

- use fast section reveal and stable layouts
- avoid anything that slows reading of role, experience, and project summaries

Enterprise client review:

- use motion to clarify architecture, process flow, and business value
- avoid playful or experimental effects

Appian and technical stakeholder review:

- use diagram highlighting, capability grouping, and component hover states
- avoid hiding implementation details behind animation

AI/product stakeholder review:

- use motion to show decision flow, knowledge discovery, routing, or evidence highlighting
- keep the interaction credible and restrained

### Reduced Motion Rules

When reduced motion is requested:

- disable scroll reveals
- disable staggered entrance sequences
- disable scale movement
- disable animated glows
- disable parallax
- keep theme changes near-instant or under 80 ms
- preserve hover, focus, active, and selected states
- keep all content visible without animation

### Performance Rules

Preferred animated properties:

- opacity
- transform
- color transitions where contrast remains stable
- border color
- background color

Avoid animating:

- width
- height where possible
- top
- left
- large box-shadow changes
- layout-heavy filters
- blur-heavy effects

Rules:

- cap simultaneous animated elements in a viewport
- avoid continuous background animation
- do not use animation that causes layout shift
- do not animate large screenshots or diagrams unnecessarily

### Motion Patterns to Avoid

Avoid:

- large purple gradients
- glowing blobs or orbs
- particle fields
- animated cursors
- typewriter effects
- heavy parallax
- scroll-jacking
- rotating 3D cards
- bouncing cards
- novelty loaders
- excessive number counters
- animations that delay content scanning

### Motion QA Checklist

Before implementation or visual production, verify:

- motion supports content hierarchy
- hero animation does not delay the role statement
- project cards remain readable while animating
- filters do not create layout jumps
- theme toggle does not flash or reduce contrast
- reduced-motion mode removes non-essential movement
- keyboard focus is never hidden or delayed
- mobile animations are shorter and simpler than desktop
- no page feels dominated by motion
- animation style remains aligned with premium enterprise positioning

## Responsive Content Strategy

Desktop:

- show richer metadata and supporting visuals
- use 2 or 3-column project grids
- keep case-study summaries beside hero visuals where useful

Tablet:

- simplify visual density
- preserve category filters
- reduce diagram complexity

Mobile:

- place title, role, category, and CTA before secondary visuals
- use stacked project cards
- keep proof and evidence badges visible
- convert comparison tables into stacked rows
- avoid fixed-height text containers

## Accessibility Strategy

### Contrast

Minimum target:

- WCAG AA for all text and controls
- Prefer AAA for body copy in dark theme

Contrast priorities:

- body text
- navigation
- project titles
- CTA buttons
- tags and badges
- focus states
- form labels

### Keyboard Use

Required:

- visible focus ring
- logical tab order
- accessible theme toggle
- skip-to-content link
- keyboard-friendly filters
- keyboard-friendly accordions if used

### Color Independence

Do not rely on color alone for:

- category
- evidence status
- active selection
- errors
- confirmation status

Use:

- text labels
- icons where useful
- border style
- status wording

### Motion Sensitivity

Required:

- reduced-motion preference support
- no essential information hidden behind animation
- no constantly moving background

## Visual Asset Direction

Recommended assets:

- professional headshot
- sanitized project screenshots
- architecture diagrams
- product workflow visuals
- plugin component visuals
- case-study thumbnails

Rules:

- visuals must help explain the actual work
- avoid generic stock imagery
- avoid dark blurred abstract backgrounds
- avoid decorative orbs and blobs
- avoid purely atmospheric AI images
- use sanitized mockups where client confidentiality applies

## Theme Examples by Page

### Home in Executive Dark

Background:

- `bg-primary`

Hero:

- near-black base
- white title
- purple accent on a short phrase or underline
- proof badges on graphite surface

Featured projects:

- graphite cards
- one purple-accented featured card
- category badges using semantic colors

### Work in Executive Dark

Background:

- dark page background with neutral surfaces

Filters:

- selected filter uses purple
- other filters use neutral border

Cards:

- category edge color
- evidence status visible
- no heavy gradients

### Case Study in Studio Light

Background:

- off-white

Content:

- white reading surfaces
- dark text
- purple for anchors and selected state
- blue for architecture diagrams

### Resume in Studio Light

Background:

- off-white

Timeline:

- clean dark text
- subtle dividers
- current role highlighted with purple edge

## Do and Do Not

Do:

- make dark mode feel intentional and premium
- make light mode equally polished
- use purple as a precise identity accent
- maintain readable long-form case studies
- keep project evidence and role visible
- use category colors sparingly and consistently
- keep navigation simple
- design for recruiter scanning and enterprise credibility

Do not:

- cover the site in purple gradients
- use decorative blobs or orbs
- make every section a card
- use low-contrast gray text
- hide the project value behind visuals
- rely on color alone
- make light mode a mechanical inversion
- use oversized hero typography inside compact panels

## Design QA Checklist

Before implementation or visual production, verify:

- dark theme is the default
- light theme is fully specified
- black, white, graphite, and gray are the base of the system
- purple is used as accent, not dominant color
- every category has distinct but restrained visual treatment
- every project card has category and evidence status
- all text meets contrast requirements
- focus states are visible in both themes
- mobile cards do not overflow
- tags wrap cleanly
- buttons are at least 44 px tall on touch devices
- case-study diagrams collapse cleanly on mobile
- confirmation and confidential notes are not accidentally published
- motion respects reduced-motion settings
- screenshots and visuals are sanitized before public use

## Final Visual Direction Statement

The finished portfolio should feel like a premium enterprise product and architecture portfolio: dark by default, readable in light mode, neutral at its foundation, and sharpened by a restrained deep-purple identity system. The visual design should support the real message of the portfolio: Leelark can connect Appian delivery, enterprise architecture, AI-enabled workflow design, plugin innovation, and product-minded problem solving into credible business solutions.
