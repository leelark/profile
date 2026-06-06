# EBRD ASB Modernization

## Portfolio Classification

Primary Category: Client Projects

Secondary Categories:

- Enterprise Appian Modernization
- Workflow Architecture
- Integration Troubleshooting
- Appian 24.1

Evidence Status: Partially Confirmed

Evidence Basis: EBRD deck confirms modernization context, ASB direction, EGP/BAS background, Appian 24.1, Monarch integration challenge, and plugin usage. Specific implementation ownership needs confirmation.

## Hero Summary

Modernization support for EBRD's legacy EGP and BAS Appian applications into ASB, a unified Appian 24.1 advisor-services platform with modern UI, synced records, task management, workflow design, and Monarch integration considerations.

## Project Context

The European Bank for Reconstruction and Development supports SME growth across multiple regions. The legacy landscape included two separate Appian applications:

- EGP: Enterprise Growth Programme
- BAS: Business Advisory Services

EGP supports SME growth through international advisory services, with focus areas such as strategy, management, and operations. BAS supports SMEs through local consultants, with focus areas such as marketing, finance, and business planning.

The original applications were built around 2010 using early Appian versions. They used process-centric patterns, older interfaces, JavaScript-based validation techniques, and separate handling for EGP and BAS workflows.

## Problem

The client needed to modernize older Appian applications into a unified platform that could support modern workflow, task management, data architecture, and user experience expectations.

Key challenges:

- legacy process-centric architecture
- outdated interfaces
- separate EGP and BAS workflows
- JavaScript-based validation patterns
- complex integration with Monarch
- multiple integration middle layers
- difficult issue tracing across distributed flows
- record relation action visibility issues
- script-management dependency

## My Role

Appian consultant / solution contributor.

Recommended portfolio positioning:

Supported Appian modernization analysis and architecture discussions for moving legacy EGP/BAS applications into ASB, a modern Advisor Services Business application using Appian 24.1, synced records, modern UI patterns, and task/workflow management.

## Users and Stakeholders

- EBRD advisory service teams
- SME advisory program users
- workflow/task owners
- Appian application users
- integration support teams
- platform/application administrators
- business operations stakeholders

## Solution Overview

The modernization direction was to consolidate EGP and BAS into ASB, a unified Advisor Services Business application.

Target state:

- Appian 24.1
- database-centric design
- modern Appian UIs
- synced record types
- task and workflow management
- supporting script-management application
- integration with legacy Monarch system

## Architecture and Technical Approach

### Legacy System

The existing EGP and BAS applications were older Appian applications using process-centric design and JavaScript-based validation.

### Modern Platform

The new ASB approach used:

- modern Appian UI
- database-centric data model
- synced records
- task-centric workflow design
- improved application structure

### Integration Architecture

The Monarch integration introduced complexity because data passed through multiple middle layers. This made troubleshooting harder and required clear diagnostic thinking around:

- data flow
- error visibility
- integration ownership
- middle-layer behavior
- Appian process state
- downstream response handling

### Supporting Applications

Database scripts were managed through a separate script-management application.

### Plugins

Known plugin usage:

- Regex
- SFTP
- Sort Utilities
- UTF8 to Low ASCII

## Key Features

- EGP/BAS consolidation into ASB.
- modernized Appian UI approach.
- synced record type usage.
- task and workflow management.
- Monarch integration support.
- script-management support.
- plugin dependency awareness.

## UX and Product Decisions

The modernization should emphasize:

- reduced legacy UI friction
- clearer task ownership
- record-centric user journeys
- consistent workflow navigation
- simplified validation patterns
- better troubleshooting visibility

## Business Value

The modernization supports:

- unified advisory service operations
- reduced fragmentation between EGP and BAS
- more maintainable Appian architecture
- modern UI and workflow experience
- better task management
- stronger foundation for future enhancements
- improved supportability for integrations

## Technologies and Appian Capabilities

- Appian 24.1
- Synced Record Types
- Process Models
- Task Management
- Appian UIs
- SFTP
- Regex
- Sort Utilities
- UTF8 to Low ASCII
- Legacy integration with Monarch
- Script-management application

## Suggested Website Sections

1. Legacy challenge
2. Modernization goal
3. EGP/BAS to ASB consolidation
4. Architecture direction
5. Monarch integration complexity
6. Workflow/task management
7. Business value

## Suggested Visuals

- legacy EGP/BAS split versus unified ASB
- Monarch integration flow
- task/workflow architecture diagram
- before/after architecture comparison

## Final Portfolio Copy

Supported modernization of EBRD's legacy EGP and BAS Appian landscape into ASB, a unified Appian 24.1 advisor-services platform. The work centered on moving from older process-centric patterns to a database-centric, synced-record architecture with modern task and workflow management, while navigating Monarch integration complexity, script governance, plugin dependencies, and record-action visibility issues.

## Confirmation Needed

- Confirm exact modules personally delivered.
- Confirm personal responsibility for integration troubleshooting.
- Confirm whether EBRD name can be used publicly.
- Confirm measurable business impact.
