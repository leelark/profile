# Field-Level Audit Framework

## Portfolio Classification

Primary Category: Client Projects

Secondary Categories:

- Reusable Appian Framework
- Compliance
- Audit
- Appian Architecture

Evidence Status: Confirmed

Evidence Basis: Existing old portfolio codebase project page.

Source Tag: Existing old portfolio project

## Hero Summary

Reusable Appian audit framework for capturing field-level changes as JSON across flat, nested, and multi-value CDTs, with runtime version comparison and compliance-grade traceability.

## Project Context

Enterprise applications need to track who changed what, when, and why. Field-level audit becomes especially important in regulated workflows where users update complex forms and records.

The existing portfolio describes this as an HSBC Audit Module.

## Problem

Standard audit approaches may not capture enough detail for complex Appian data structures. Teams need a reusable approach for auditing:

- flat CDTs
- nested CDTs
- multi-value fields
- hierarchical fields
- screen/action context
- version comparison

## My Role

Designed a generic field-level audit module for Appian applications.

Responsibilities:

- design generic audit approach
- support JSON audit trail
- compare old and new field values
- handle nested and multi-value data
- support runtime version generation and comparison
- support screen/action capture

## Users and Stakeholders

- compliance teams
- application users
- auditors
- Appian developers
- support teams
- business reviewers

## Solution Overview

The solution captures changes at the field level and stores them in a JSON-based audit structure. It supports version comparison and can be applied across multiple CDT structures.

## Architecture and Technical Approach

Architecture elements:

- old/new value comparison
- JSON audit generation
- reusable expression rules
- CDT-aware field parsing
- hierarchical field support
- multi-value field handling
- metadata capture
- runtime version comparison

## Key Features

- audit flat CDTs
- audit fields with multiple values
- audit hierarchical fields
- record version runtime generation
- record version comparison
- additional information capture
- screen capture
- action capture
- single-row audit for multiple fields

## UX and Product Decisions

- make audit history understandable to reviewers
- support version comparison rather than raw logs only
- preserve action and screen context
- reduce implementation effort for future applications

## Business Value

- improves compliance traceability
- reduces duplicate audit implementation
- supports regulated application workflows
- enables detailed version review
- improves confidence in user-change history

## Technologies and Appian Capabilities

- Appian
- SAIL
- CDTs
- Expression Rules
- JSON
- Process Models
- MySQL
- Audit Trail Patterns

## Suggested Website Sections

1. Audit challenge
2. Generic framework design
3. JSON audit model
4. CDT and hierarchy support
5. Version comparison
6. Compliance value

## Suggested Visuals

- old value/new value comparison
- JSON audit trail example
- version comparison mockup
- architecture flow

## Final Portfolio Copy

Designed a reusable Appian audit framework that captures field-level changes as JSON across flat, nested, and multi-value CDTs. The module supports runtime version comparison, action metadata, and compliance-grade traceability across applications.

## Confirmation Needed

- adoption across applications
- performance considerations
- sample screenshot
- measurable audit efficiency improvement
