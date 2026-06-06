# Hierarchical Data Entry UX Redesign

## Portfolio Classification

Primary Category: Accelerators

Secondary Categories:

- Enterprise UX
- Appian SAIL
- Timeout-Safe Workflow
- Complex Data Entry
- Progressive Disclosure

Evidence Status: Confirmed

Evidence Basis: Appian Accelerate UX redesign deck for hierarchical sample data entry.

## Hero Summary

Appian UX redesign pattern for complex hierarchical data entry, replacing long monolithic forms with summary-first navigation, expandable hierarchy, and atomic record actions.

## Project Context

The Sample Collection Plan workflow managed complex laboratory/sample data structures:

- multiple parent samples per plan
- hierarchy up to four levels deep
- extensive attributes per sample node
- legacy long-form entry
- 15-minute inactivity timeout risk

## Problem

The old experience created:

- excessive scrolling
- high cognitive load
- slow rendering
- form fatigue
- timeout-related data loss risk
- poor hierarchy visibility

## My Role

Enterprise UX and Appian accelerator designer.

Recommended role positioning:

Designed a summary-first Appian UX pattern that improves navigation, render performance, hierarchy clarity, and timeout resilience for complex multi-level data entry.

## Users and Stakeholders

- laboratory/sample collection users
- data-entry users
- reviewers
- business users
- Appian developers
- product owners

## Solution Overview

The redesigned pattern uses:

- parent sample summary grid
- child samples hidden by default
- targeted expansion
- visual hierarchy cues
- Appian record actions
- atomic persistence
- focused add/edit/delete workflows

## Architecture and Technical Approach

Architecture elements:

- read-only parent sample grid
- expandable row/detail behavior
- child hierarchy display
- record actions for add/edit/clone/delete
- atomic save actions
- reduced page render scope
- hierarchy-level styling

## Key Features

- summary-first parent view
- expand selected parent only
- four-level hierarchy support
- indentation for depth
- connector symbols for linkage
- folder icons for parent nodes
- subtle shading per level
- focused record actions
- timeout-safe atomic persistence

## Accelerator Workstream Detail

Source accelerator themes:

- data-entry UX redesign
- timeout-safe hierarchical entry
- progressive hierarchy grid
- parent-first summary experience

Detailed work captured:

- replace a single long monolithic form with a summary-first structure
- initially show only parent records in a read-only view
- hide child complexity until the user expands a specific parent
- support multi-level child hierarchy with visual depth cues
- use record actions for add, edit, clone, and delete flows
- reduce SAIL rendering load by limiting what appears at first page load
- reduce data-loss risk through smaller atomic updates
- preserve hierarchy clarity with indentation, connector cues, and level styling

Reusable pattern value:

- applies to sample hierarchies
- applies to regulatory or lab-style nested data
- applies to nested operational entities
- applies to any Appian workflow where large hierarchical forms cause timeout and rendering risk

## UX and Product Decisions

- show only parent samples first to reduce cognitive load
- reveal detail only when needed
- avoid wall-of-text forms
- use visual hierarchy cues
- use record actions for focused work
- persist smaller updates to reduce data-loss risk

## Business Value

- faster first-page load
- cleaner visual interface
- improved structural understanding
- reduced browser rendering overhead
- lower timeout-related data-loss risk
- improved user confidence
- reusable pattern for complex Appian hierarchies

## Technologies and Appian Capabilities

- Appian
- SAIL
- Grid Layout
- Record Actions
- Conditional Display
- Hierarchical Data Patterns
- Local Variables
- Process/Record Updates

## Suggested Website Sections

1. Complex hierarchy problem
2. Legacy long-form issue
3. Summary-first redesign
4. Record action model
5. Timeout resilience
6. Business value

## Suggested Visuals

- before/after layout
- hierarchy expansion diagram
- record action flow
- timeout-safe save model

## Final Portfolio Copy

Redesigned a complex hierarchical Appian data-entry flow into summary-first navigation with focused record actions, reducing render load, form fatigue, and timeout-related data loss.

## Confirmation Needed

- implemented outcome
- load-time improvement
- user feedback
- screenshots
