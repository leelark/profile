# Transaction Manager SQL Portability Accelerator

## Portfolio Classification

Primary Category: Accelerators

Secondary Categories:

- Database Portability
- Appian Process Reliability
- SQL Server
- Integration Architecture
- Technical Remediation

Evidence Status: Confirmed

Evidence Basis: Appian Accelerate transaction-manager SQL portability document. Kafka-specific behavior needs confirmation separately.

## Hero Summary

Database portability accelerator for adapting transaction-manager SQL assets to SQL Server while preserving Appian-facing process behavior and data semantics.

## Project Context

Appian process designs sometimes depend on transaction-manager database scripts, seed data, views, functions, and stored procedures. When a script is moved across database platforms, small syntax differences can break deployment or change behavior.

## Problem

The original transaction-manager SQL script required adaptation for SQL Server because of:

- unsupported boolean datatype assumptions
- default literal differences
- constraint and index syntax differences
- identity seed conflicts
- invalid function return behavior
- stored procedure compatibility issues
- pagination and date handling differences
- Appian-facing output equivalence concerns

## My Role

Database portability and Appian process reliability contributor.

Recommended role positioning:

Analyzed and adapted transaction-manager database assets for SQL Server compatibility while preserving expected Appian integration behavior.

## Users and Stakeholders

- Appian developers
- database teams
- integration teams
- process owners
- QA teams
- deployment teams

## Solution Overview

The accelerator defined a portability approach for converting schema, seed data, functions, stored procedures, indexes, and behavior notes into a SQL Server-compatible form.

## Architecture and Technical Approach

Architecture elements:

- transaction reference tables
- process-state records
- seed data
- indexes
- functions
- stored procedures
- Appian process interaction points
- SQL Server execution constraints

Technical approach:

- replace unsupported datatypes
- normalize default values
- restructure indexes and constraints
- align identity behavior
- preserve function/procedure outputs
- use SQL Server-compatible date and pagination behavior
- document Appian impact for each change

## Key Features

- SQL compatibility matrix
- fixed script approach
- schema and seed-data adaptation
- procedure and function behavior preservation
- Appian impact notes
- deployment safety considerations
- process reliability framing

## UX and Product Decisions

- keep Appian process behavior stable despite database change
- make database remediation understandable to Appian and database teams
- document safe defaults and behavior differences

## Business Value

- reduces deployment failures
- improves database migration safety
- preserves Appian process reliability
- creates clearer handoff between Appian and database teams
- reduces regression risk during platform modernization

## Technologies and Appian Capabilities

- Appian
- SQL Server
- Stored Procedures
- Views
- Functions
- Indexes
- Process Models
- Transaction Management

## Suggested Website Sections

1. SQL portability challenge
2. Compatibility matrix
3. Appian impact analysis
4. Remediation approach
5. Deployment reliability value

## Suggested Visuals

- database portability matrix
- transaction lifecycle diagram
- before/after script compatibility summary
- Appian process integration map

## Final Portfolio Copy

Adapted transaction-manager SQL assets for SQL Server compatibility, preserving Appian-facing process behavior while resolving datatype, constraint, identity, function, and stored-procedure portability issues.

## Confirmation Needed

- final deployment target
- final QA outcome
- whether Kafka-related behavior should be included publicly
