# Custom HTML Document Viewer Plugin

## Portfolio Classification

Primary Category: Plugins

Secondary Categories:

- Appian Component Plugin
- Document Intelligence
- PDF Rendering
- Evidence Highlighting

Evidence Status: Partially Confirmed

Evidence Basis: Existing portfolio, KCC viewer materials, and Reconcile Document Viewer materials confirm the document viewer/highlighting pattern. Final plugin ownership/name needs confirmation.

## Hero Summary

Enterprise document intelligence component for rendering PDFs, overlaying bounding-box highlights, auto-scrolling to evidence, and helping reviewers connect AI answers or workflow decisions to exact source document regions.

## Project Context

Enterprise workflows often require users to review source documents before approving, rejecting, validating, or investigating a business decision. This becomes especially important in AI workflows where generated answers need source evidence.

The custom document viewer pattern appears across the old portfolio, KCC/DocBot, and Reconcile Document Viewer analysis.

## Problem

Native document viewing is often not enough when users need:

- exact source evidence
- coordinate-based highlights
- page-level navigation
- multi-section references
- active highlight navigation
- auto-scroll to relevant regions
- AI answer traceability

## My Role

Recommended positioning:

Designed and/or developed a custom Appian HTML document viewer component/plugin pattern for document rendering and evidence highlighting.

## Users and Stakeholders

- document reviewers
- claim reviewers
- compliance teams
- legal teams
- operations users
- AI workflow users
- auditors

## Solution Overview

The viewer renders documents and overlays BBox-based highlights on the exact areas that support a response, decision, or extracted field.

## Architecture and Technical Approach

Architecture elements:

- Appian-integrated HTML viewer
- PDF.js rendering
- Appian document URL input
- JSON/BBox metadata input
- highlight layer overlays
- target page handling
- toolbar controls
- previous/next highlight navigation
- zoom controls
- auto-scroll to selected evidence
- Appian value bridge for dynamic updates

## Key Features

- PDF rendering
- external and Appian document support
- bounding-box overlays
- evidence highlighting
- active highlight state
- auto-scroll to evidence
- page display
- zoom in/out
- multi-section reference support
- custom toolbar
- dynamic viewer dimensions

## UX and Product Decisions

- make evidence immediately visible
- reduce manual page searching
- support reviewer confidence
- connect AI-generated answers to source documents
- provide familiar PDF-style controls
- keep document navigation compact

## Business Value

- improves evidence traceability
- reduces review time
- supports audit requirements
- improves trust in AI outputs
- enables document intelligence workflows
- reusable across claims, compliance, legal, policy, and operations workflows

## Technologies and Appian Capabilities

- Appian Component Plugin
- HTML
- CSS
- JavaScript
- PDF.js
- BBox JSON
- Appian document references
- Appian value bridge
- Appian AI/document workflows

## Suggested Website Sections

1. Evidence review problem
2. Viewer architecture
3. BBox highlight system
4. Appian integration
5. AI/document intelligence use cases
6. Business value

## Suggested Visuals

- PDF viewer screenshot
- highlighted evidence region
- architecture flow from AI answer to highlight
- Appian value bridge diagram

## Final Portfolio Copy

Built an Appian-integrated HTML document viewer that renders PDFs through a JavaScript component and overlays BBox-based highlights on exact source evidence, enabling reviewers to jump directly from a business answer to the supporting page region.

## Confirmation Needed

- final plugin name
- implementation ownership level
- screenshots
- production/client usage
- accessibility behavior
