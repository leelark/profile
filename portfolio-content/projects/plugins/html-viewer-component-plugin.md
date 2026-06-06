# HTML Viewer Component Plugin

## Portfolio Classification

Primary Category: Plugins

Secondary Categories:

- Appian Component Plugin
- Custom HTML Rendering
- Enterprise UI Extension
- Document Intelligence Support

Evidence Status: Partially Confirmed

Evidence Basis: KCC materials confirm HTML Viewer plugin usage and custom Appian-compatible HTML rendering patterns. Exact plugin ownership and tracking features need confirmation.

## Hero Summary

Reusable Appian HTML viewer component pattern for rendering custom interactive HTML experiences inside Appian, supporting advanced landing pages, custom document viewers, Appian value bridging, and interactive UI behavior beyond standard Appian controls.

## Project Context

Some enterprise Appian experiences require custom HTML, JavaScript, scoped CSS, and advanced UI behavior that standard Appian components do not fully support. Examples include document viewers, AI landing pages, custom toolbars, rich dashboards, and embedded interaction workflows.

The Knowledge Center Chatbot material confirms use of an HTML Viewer plugin and compatibility adjustments for Appian's HTML injection model.

## Problem

Standard Appian UI components are powerful but may not support every interaction pattern needed for advanced document intelligence and custom HTML experiences.

Challenges include:

- rendering rich HTML safely inside Appian
- preventing CSS leakage into the host page
- handling Appian re-render behavior
- passing values between Appian and the embedded HTML
- supporting custom event behavior
- rendering complex document viewer interfaces

## My Role

Recommended positioning:

Designed or used an Appian HTML Viewer component/plugin pattern to enable custom HTML experiences inside Appian.

Needs confirmation:

- exact ownership of plugin development
- plugin name/version
- whether event tracking/input tracking was implemented as plugin capability

## Users and Stakeholders

- Appian application users
- business reviewers
- document reviewers
- Appian developers
- product owners
- AI workflow users

## Solution Overview

The component pattern allows custom HTML/CSS/JavaScript to render inside Appian while staying scoped, interactive, and compatible with Appian's rendering model.

## Architecture and Technical Approach

Known and recommended capabilities:

- HTML injected into Appian component area
- scoped CSS root wrapper
- avoidance of global `html`, `body`, and `:root` styling
- Appian-compatible link handling
- JavaScript initialization inside component scope
- Appian value bridge
- event handling
- custom rendering for PDF/document viewers
- custom landing-page rendering

## Key Features

- dynamic HTML rendering
- custom UI composition
- scoped CSS
- JavaScript interaction
- Appian value bridge
- support for PDF/document viewer components
- reusable rendering pattern
- compatibility with Appian host interface

Potential features to confirm:

- input tracking
- user interaction tracking
- event tracking
- component-level callback handling

## UX and Product Decisions

- keep custom HTML visually polished while embedded in Appian
- prevent host-page layout conflicts
- support responsive custom layouts
- avoid re-render loops
- create richer Appian experiences without leaving the platform

## Business Value

- extends Appian UI capability
- enables custom document intelligence interfaces
- supports product-quality Appian demos and POCs
- reduces limitations of native components for specialized workflows
- creates reusable advanced UI capability

## Technologies and Appian Capabilities

- Appian component plugin
- HTML
- CSS
- JavaScript
- Appian value bridge
- Appian interface embedding

## Suggested Website Sections

1. Appian UI limitation
2. HTML viewer architecture
3. Appian integration
4. Event/value bridge
5. Use cases
6. Reusability

## Suggested Visuals

- HTML viewer architecture
- Appian-to-HTML value flow
- embedded document viewer screenshot
- custom landing page screenshot

## Final Portfolio Copy

Created or used an Appian HTML Viewer component pattern to render complex interactive HTML experiences inside Appian, enabling custom landing pages, document viewers, AI-powered document workflows, and richer enterprise UI experiences beyond standard Appian components.

## Confirmation Needed

- exact plugin ownership
- event tracking details
- input tracking details
- version and deployment details
- screenshots
