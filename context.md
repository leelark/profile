# Portfolio Project Context

## Goal

Create a completely new premium personal portfolio website for Leelark Saxena. The site should showcase enterprise Appian experience, project leadership, AI solution design, plugin development, reusable accelerators, architecture capability, workflow automation, enterprise UX, and product thinking.

This repository currently stores the content and UX planning for that future website. It is not a website implementation repository yet.

## Target Positioning

Leelark Saxena should be positioned as:

- Enterprise Appian Solution Architect
- Senior Appian Consultant
- Technical Lead
- Appian Certified Lead Developer
- AI Solution Designer
- Plugin Developer
- Product Builder
- Workflow Automation Specialist
- Digital Transformation Consultant

## Target Website Personality

The website should feel:

- premium
- modern
- clean
- executive-level
- minimal
- enterprise-grade
- credible
- elegant
- technically deep
- product-minded

It should not feel like a generic developer template or a simple resume page.

## Visual Theme Direction

Default theme:

- Executive Dark
- near-black and graphite foundation
- white and soft-gray text
- restrained deep-purple identity accents
- premium enterprise presentation

Alternate theme:

- Studio Light
- off-white and white foundation
- charcoal text
- deeper purple interaction accents
- optimized for recruiter reading and long-form case studies

Detailed visual rules are documented in `portfolio-content/strategy/visual-theme-design-system.md`.

## Motion Direction

Animation should be premium, restrained, and content-led.

Use motion for:

- smooth theme switching
- subtle card and button feedback
- active navigation and filter states
- small section reveals
- timeline reveal
- architecture step highlighting

Avoid:

- heavy parallax
- animated cursors
- typewriter effects
- bouncing cards
- rotating cards
- glowing animated backgrounds
- scroll-jacking
- any motion that slows recruiter or client review

## Development Readiness

Development-ready specifications are stored in `development-ready/`.

Project-local reusable Codex skills are stored in `.codex/skills/`.

The continuous multi-agent development runbook and starter prompt are stored in `development-ready/ai-development-team-operating-model.md`.

Use `portfolio-frontend-implementation` only after the user explicitly requests actual website implementation.

Recommended future implementation stack:

- Astro
- React
- TypeScript
- Tailwind CSS
- Motion for React
- GitHub Pages
- GitHub Actions
- Splitforms contact form backend

The website should include a contact form that posts to `https://splitforms.com/api/submit` with the provided Splitforms access key documented in `development-ready/contact-form-specification.md`.

## Primary Portfolio Message

Enterprise Appian Architect building AI-powered workflows, reusable plugins, and scalable automation platforms.

## Supporting Message

I design and deliver enterprise Appian solutions across regulated workflows, document intelligence, claims automation, platform optimization, and custom component innovation.

## Content Sources Used

Safe content was synthesized from:

- the old portfolio codebase
- Appian Accelerate materials
- EBRD deck
- Knowledge Center Chatbot assets/export summaries
- ClaimRoute IQ export summaries
- No Claim Discount workflow demo
- KCC HTML viewer/landing material
- Appian Accelerate plugin/accelerator decks

Raw source exports are not copied into this repo when they may contain private client details, token-like constants, internal Appian object IDs, or other non-public material. This repository contains public-safe content drafts and redacted source summaries.

## Portfolio Categories

Client Projects:

- Appian Accelerate Program
- EBRD ASB Modernization
- Locale-Based Date and DateTime Picker Plugin
- Rapid2 / HSBC Horizon Scanning
- Field-Level Audit Framework
- Invesco AML and Change Management
- Invesco Reconciliation System
- Carlyle Bridge Module

Plugins:

- HTML Viewer Component Plugin
- Custom HTML Document Viewer Plugin
- Document Text Highlighter Plugin
- HTML/DOCx to Accessible PDF Plugin

Innovative Projects:

- ClaimRoute IQ
- Knowledge Center Chatbot / DocBot
- No Claim Discount POC
- GDS UK Passport Service POC
- Automobile Traceability
- Revenue Cycle Optimization

Accelerators:

- Appian Accelerate Accelerator Catalog
- Dynamic Editable Grid Accelerator
- Editable Paragraph Grid Patterns
- Formatted Excel Import/Export Accelerator
- Excel Merge / Large Export Accelerator
- Hierarchical Data Entry UX Redesign
- Document Merge Integrity RCA
- PDF Reconciliation Viewer Compatibility RCA
- Appian Health Check Risk Review Accelerator
- Appian Server Metrics Performance Triage Accelerator
- Appian Monitoring and Observability Accelerator
- Secure Snowflake Connectivity Accelerator
- Message Queue Consumption Modernization Accelerator
- Transaction Manager SQL Portability Accelerator
- Notification API Reliability Accelerator
- Device Access Audit and Login Telemetry Accelerator
- Appian Dependency Governance Accelerator
- Appian Deployment and DevOps Governance Accelerator
- Appian Cloud Operating Model Advisory
- Appian Best Practices Governance Review
- Process HQ Readiness Accelerator
- Appian AI Document Intelligence Enablement
- Enterprise Document Chatbot Improvement Accelerator
- Autonomous Client Transition and Knowledge Absorption

## Evidence Rules

Confirmed:
The reviewed material directly supports the project or feature.

Partially Confirmed:
The reviewed material supports related capability, but exact ownership/name/details need confirmation.

Needs Confirmation:
The user requested inclusion, but reviewed materials did not contain enough evidence. These can remain as planned portfolio content, but should not be published with strong factual claims until confirmed.
