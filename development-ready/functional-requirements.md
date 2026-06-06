# Functional Requirements

## Product Goal

Create a premium personal portfolio website that works as:

- recruiter-facing profile
- hiring-manager case-study portfolio
- enterprise-client capability presentation
- Appian architecture and plugin showcase
- AI/product innovation portfolio
- reusable accelerator library

## Audience

Primary audiences:

- recruiters
- hiring managers
- enterprise Appian stakeholders
- technical architects
- AI/product stakeholders
- client delivery leaders

## Global Requirements

The website must:

- default to dark theme
- provide light theme option
- be fully responsive
- include refined animation without visual noise
- show complete portfolio content
- support filtered work browsing
- show project detail pages
- show profile, experience, education, certifications, publication, and skills
- include a working contact form
- preserve evidence and confidentiality rules
- load quickly
- be accessible

## Navigation Requirements

Primary navigation:

- Home
- Work
- Expertise
- Plugins and Accelerators
- About
- Resume
- Contact

Work filters:

- Featured
- Client Projects
- Plugins
- Innovative Projects
- Accelerators
- All Work

Mobile navigation:

- compact menu
- theme toggle accessible
- clear tap targets
- no hidden critical links

## Home Page Requirements

The home page must include:

1. Hero with name, positioning, and primary CTA.
2. Proof strip.
3. Featured case studies.
4. Expertise pillars.
5. Plugins and accelerators preview.
6. Appian Accelerate highlight.
7. Experience snapshot.
8. Certifications and publication.
9. Contact CTA.

Hero copy should position Leelark as an enterprise Appian architect and AI workflow designer.

## Work Page Requirements

The work page must include:

- category filters
- featured projects
- project card grid
- evidence status on each card
- tags
- role/domain metadata
- links to case studies

Project card fields:

- title
- category
- evidence status
- one-line summary
- role
- domain
- tags
- CTA

## Project Detail Requirements

Every project page must include:

1. Portfolio Classification
2. Hero Summary
3. Project Context
4. Problem
5. My Role
6. Users and Stakeholders
7. Solution Overview
8. Architecture and Technical Approach
9. Key Features
10. UX and Product Decisions
11. Business Value
12. Technologies and Appian Capabilities
13. Suggested Website Sections
14. Suggested Visuals
15. Final Portfolio Copy
16. Confirmation Needed

Public website behavior:

- show polished public content
- hide or private-label `Confirmation Needed` sections unless draft mode is used
- do not show internal evidence notes publicly unless they are rewritten as public-safe context

## Plugins and Accelerators Page Requirements

The page must show:

- plugin library
- accelerator catalog
- grouped accelerator categories
- component/plugin innovation positioning
- reusable value
- Appian integration value

Required accelerator groups:

- Enterprise UX and Data Entry
- Excel, Document, and File Automation
- Platform Health, Observability, and Performance
- Integration and Security
- Governance, Deployment, and Operating Model
- AI, Process Intelligence, and Transition Automation

## Expertise Page Requirements

The page must show capability pillars:

- Appian Architecture
- Workflow Automation
- AI and Document Intelligence
- Plugin Development
- Enterprise UX
- Integration Architecture
- Performance and Governance
- Product Thinking

Each pillar should link to relevant projects.

## About Page Requirements

The page must include:

- short professional bio
- long bio
- professional identity
- strengths
- domains
- working style
- selected highlights

## Resume Page Requirements

The page must include:

- experience timeline
- education
- certifications
- publication
- skills
- downloadable resume CTA if resume asset is available

## Contact Page Requirements

The page must include:

- direct professional CTA
- contact form using Splitforms
- professional links
- inquiry type field
- thank-you redirect
- accessibility-compliant labels

Do not ask for unnecessary personal data.

## Theme Requirements

Default:

- Executive Dark

Alternate:

- Studio Light

Theme behavior:

- default to dark
- allow user toggle
- persist preference
- keep both themes equally polished
- avoid purple overload

## Animation Requirements

Use animation for:

- hero entrance
- proof strip entrance
- project card reveal
- filter transitions
- theme toggle
- architecture diagram highlights
- mobile menu

Avoid:

- heavy parallax
- animated cursors
- bouncing cards
- typewriter effects
- scroll-jacking
- large moving gradients
- particle fields

## Contact Form Requirements

The form must POST to:

```text
https://splitforms.com/api/submit
```

Required hidden key:

```html
<input type="hidden" name="access_key" value="8897600acb7b48f09fb9d1f78895c3b6">
```

Required visible fields:

- name
- email
- inquiry type
- company or organization
- message

Recommended hidden fields:

- redirect to `/thanks`
- subject line
- source page

## Acceptance Criteria

The website is functionally ready when:

- every required route exists
- every project category is represented
- all project pages use the same structure
- all accelerator pages are discoverable
- contact form works
- theme toggle works
- mobile layout is stable
- no content overflows on mobile
- reduced motion works
- public-safe rules are respected
