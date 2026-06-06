# PDF Reconciliation Viewer Compatibility RCA

## Portfolio Classification

Primary Category: Accelerators

Secondary Categories:

- Appian Plugin Troubleshooting
- Document Intelligence
- PDF Viewer
- Browser Security
- Self-Managed Appian

Evidence Status: Confirmed

Evidence Basis: Appian Accelerate Reconcile Document Viewer deck. Remediation ownership and final implementation status need confirmation.

## Hero Summary

Browser-security and plugin-compatibility RCA for Appian PDF rendering and coordinate highlighting failures in self-managed environments.

## Project Context

The document viewer component rendered Appian PDF documents and highlighted specific coordinates on the rendered page. The capability depended on iframe behavior, postMessage communication, document URLs, coordinate APIs, and browser security boundaries.

## Problem

PDF highlight behavior failed in a self-managed Appian environment.

Potential causes included:

- iframe sandbox restrictions
- missing `allow-same-origin` behavior
- `null` execution origin
- blocked postMessage communication
- CSP behavior
- browser/network constraints
- plugin compatibility differences between environment types

## My Role

Appian plugin troubleshooting and compatibility analysis contributor.

Recommended role positioning:

Performed structured Appian plugin RCA to identify browser security boundaries affecting PDF coordinate highlighting and frame-to-parent communication.

## Users and Stakeholders

- document reviewers
- reconciliation users
- Appian developers
- platform administrators
- security teams
- plugin maintainers

## Solution Overview

The RCA examined how the PDF viewer interacted with Appian document URLs, iframe security, browser origin rules, postMessage behavior, CSP, and browser/network behavior.

## Architecture and Technical Approach

Architecture elements:

- Appian document URL rendering
- iframe-based PDF viewer
- sandboxed browser execution
- coordinate API
- bounding-box overlay
- postMessage communication
- parent-frame event handling
- CSP and origin validation

Diagnostic steps:

- inspect iframe sandbox configuration
- validate `window.location.origin`
- confirm postMessage failure mode
- review CSP behavior
- validate document network loading
- test browser behavior
- compare self-managed versus cloud constraints

## Key Features

- iframe sandbox inspection
- origin validation
- postMessage failure confirmation
- PDF coordinate overlay review
- CSP review
- cross-browser behavior analysis
- cloud versus self-managed compatibility framing

## UX and Product Decisions

- preserve reviewer trust in highlighted evidence
- make PDF overlay behavior explainable
- identify environmental compatibility constraints before redesigning the viewer
- treat failed evidence highlighting as a workflow reliability issue

## Business Value

- improves document review reliability
- clarifies plugin compatibility boundaries
- reduces support time for self-managed environments
- improves confidence in coordinate-based evidence highlighting
- supports document intelligence and reconciliation use cases

## Technologies and Appian Capabilities

- Appian
- PDF Viewer
- Appian Document URLs
- JavaScript
- iframe Sandbox
- postMessage
- CSP
- Coordinate Highlighting
- Browser Security

## Suggested Website Sections

1. PDF highlighting problem
2. Browser security constraints
3. postMessage communication model
4. RCA findings
5. Compatibility recommendations

## Suggested Visuals

- iframe/origin communication diagram
- PDF coordinate overlay flow
- cloud versus self-managed compatibility matrix
- troubleshooting checklist

## Final Portfolio Copy

Performed Appian PDF viewer compatibility RCA across iframe sandboxing, origin validation, postMessage behavior, CSP, and browser/network behavior to explain coordinate highlighting failures in self-managed environments.

## Confirmation Needed

- final remediation
- screenshots
- whether plugin change was required
- exact compatibility statement approved for public use
