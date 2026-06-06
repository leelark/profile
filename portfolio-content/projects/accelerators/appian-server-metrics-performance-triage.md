# Appian Server Metrics Performance Triage Accelerator

## Portfolio Classification

Primary Category: Accelerators

Secondary Categories:

- Performance Engineering
- Server Metrics
- Appian Health Check
- Python Analysis
- Platform Optimization

Evidence Status: Confirmed

Evidence Basis: Appian Accelerate server metrics evaluation documents, analysis notebooks/scripts, chart outputs, and supporting reports. Raw logs, server names, environment names, and private metrics are not copied.

## Hero Summary

Performance triage accelerator that converts raw Appian Health Check server metrics into readable capacity, workload, and tuning insights using a repeatable Python/Jupyter analysis workflow.

## Project Context

Appian performance reviews often start with raw Health Check support files and server metrics. Those files can be difficult for stakeholders to interpret without structured analysis, visualizations, thresholds, and executive summaries.

## Problem

Teams needed a repeatable way to analyze:

- memory utilization
- swap behavior
- CPU utilization
- engine idle time
- engine other time
- Java work queue behavior
- work poller saturation
- read/write ratio
- topology and node behavior
- warning and critical thresholds
- workload pressure over time

## My Role

Performance triage and platform analysis contributor.

Recommended role positioning:

Developed and used a repeatable Appian server metrics analysis workflow that converted raw Health Check exports into executive-grade performance insights and remediation recommendations.

## Users and Stakeholders

- platform owners
- Appian administrators
- support teams
- architects
- performance reviewers
- client stakeholders

## Solution Overview

The accelerator uses a repeatable analysis toolkit and report structure to process Health Check metrics, produce charts, calculate KPI-style scores, and explain platform risk in business-readable terms.

## Architecture and Technical Approach

Architecture elements:

- Health Check support bundle
- system metrics CSV parsing
- performance monitor database parsing
- engine call summary parsing
- engine call details parsing
- work poller summary parsing
- topology parsing
- KPI scoring logic
- chart generation
- customer-facing report template

Analysis themes:

- memory and swap pressure
- CPU utilization
- engine utilization
- engine idle and other time
- Java work queue backlog
- work poller completion times
- thread concurrency behavior
- threshold-based grading

## Key Features

- Python/Jupyter analysis workflow
- reusable metric readers
- KPI scoring approach
- warning/critical thresholds
- R/Y/G executive grading
- platform trend charts
- sanitized chart outputs
- remediation-oriented reporting

## UX and Product Decisions

- turn raw metrics into understandable visuals
- separate executive summary from detailed analysis
- use consistent threshold language
- avoid exposing raw environment data
- make recommendations actionable for delivery and platform teams

## Business Value

- shortens performance diagnosis
- connects metrics to platform risk
- supports capacity planning
- improves remediation prioritization
- creates repeatable analysis for multiple environments
- enables clearer client-facing performance communication

## Technologies and Appian Capabilities

- Appian Health Check
- Server Metrics
- Python
- Jupyter Notebooks
- CSV Analysis
- Performance Monitoring
- Charting
- KPI Scoring
- Platform Optimization

## Suggested Website Sections

1. Raw metrics challenge
2. Analysis toolkit
3. KPI and threshold model
4. Example sanitized charts
5. Remediation value

## Suggested Visuals

- sanitized CPU chart
- sanitized memory chart
- engine idle chart
- Java work queue chart
- work poller chart
- performance triage workflow

## Final Portfolio Copy

Built a repeatable Appian server metrics triage workflow using Python and Health Check exports to analyze CPU, memory, swap, engine behavior, Java work queue, work poller pressure, and workload trends for platform optimization.

## Confirmation Needed

- which sanitized charts can be published
- which metrics can be quoted
- final remediation outcomes
- whether source scripts should be referenced publicly
