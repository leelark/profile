# Page and Component Specification

## Global Layout

Every page should include:

- header
- primary navigation
- theme toggle
- main content landmark
- footer
- contact CTA where appropriate

Header requirements:

- sticky or top-fixed only if it does not reduce mobile readability
- active route indicator
- accessible theme toggle
- mobile menu

Footer requirements:

- name and role
- quick links
- professional links
- copyright
- public-safe note optional

## Core Components

### Header

Responsibilities:

- show site identity
- show primary navigation
- show theme toggle
- support mobile navigation

States:

- default
- active route
- mobile open
- focus
- hover

### Theme Toggle

Responsibilities:

- default to dark
- switch to light
- persist user preference
- remain keyboard accessible
- respect reduced motion

### Project Card

Required fields:

- title
- category
- evidence status
- one-line summary
- role
- domain
- tags
- CTA

Interaction:

- hover border or elevation
- focus ring
- whole-card link or explicit CTA

### Evidence Badge

Labels:

- Evidence-backed
- Draft from source material
- Needs confirmation
- Confidential details sanitized

Rules:

- never color-only
- use accessible text
- keep label compact

### Category Filter

Filters:

- Featured
- Client Projects
- Plugins
- Innovative Projects
- Accelerators
- All Work

Mobile:

- horizontal scroll or segmented layout
- no clipping
- selected state clear

### Expertise Pillar

Fields:

- title
- summary
- capabilities
- related projects

### Case Study Hero

Fields:

- title
- category
- evidence status
- hero summary
- role
- domain
- tags
- primary CTA

### Architecture Section

Used for:

- workflow diagrams
- integration diagrams
- AI/document intelligence diagrams
- accelerator patterns

Mobile:

- collapse into vertical steps

### Contact Form

Fields:

- name
- email
- inquiry type
- company
- message

Hidden:

- access key
- redirect
- subject
- source page

## Home Page Layout

Sections:

1. Hero
2. Proof strip
3. Featured case studies
4. Expertise pillars
5. Plugins and accelerators preview
6. Appian Accelerate advisory highlight
7. Experience snapshot
8. Certifications and publication
9. Contact CTA

Hero content:

- "Leelark Saxena"
- "Enterprise Appian Architect and AI Workflow Designer"
- short value statement
- CTA to Work
- CTA to Contact

## Work Page Layout

Sections:

1. Work hero
2. Category filters
3. Featured work
4. All work grid
5. Contact CTA

Behavior:

- filter by category
- preserve card layout stability
- no layout jumps

## Case Study Page Layout

Sections:

1. Case study hero
2. Executive snapshot
3. Problem and context
4. My role
5. Architecture and technical approach
6. Key features
7. UX and product decisions
8. Business value
9. Technologies
10. Suggested visuals or visual placeholder
11. Related projects

Draft-only sections:

- evidence basis
- confirmation needed

## Plugins and Accelerators Page Layout

Sections:

1. Page hero
2. Plugin library
3. Accelerator catalog
4. Accelerator category groups
5. Featured reusable assets
6. Related Appian Accelerate case study
7. Contact CTA

## About Page Layout

Sections:

1. Profile hero
2. Short bio
3. Long bio
4. Professional identity
5. Strengths
6. Domains
7. Working style
8. CTA

## Resume Page Layout

Sections:

1. Resume hero
2. Experience timeline
3. Education
4. Certifications
5. Publication
6. Skills
7. Download/contact CTA

## Contact Page Layout

Sections:

1. Contact hero
2. Inquiry context
3. Contact form
4. Professional links
5. Privacy note

## Visual Requirements

- no nested cards
- no decorative blobs or orbs
- no one-note purple palette
- 8 px radius for cards and buttons
- stable dimensions for cards and controls
- all text must wrap correctly
- body text must remain readable on mobile

## Interaction Requirements

- accessible keyboard navigation
- clear focus ring
- hover states on desktop
- touch-friendly controls on mobile
- reduced-motion support
- no scroll-jacking
