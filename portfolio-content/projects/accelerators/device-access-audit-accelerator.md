# Device Access Audit and Login Telemetry Accelerator

## Portfolio Classification

Primary Category: Accelerators

Secondary Categories:

- Security
- Audit
- Login Telemetry
- Appian Monitoring
- Identity Provider Integration

Evidence Status: Confirmed

Evidence Basis: Appian Accelerate event logging of device information deck.

## Public-Safe Note

Do not publish raw login records, IP addresses, user-agent strings, identity-provider URLs, compliance signals, or user-level access details. Use only sanitized architecture and decision-model summaries.

## Hero Summary

Security and audit accelerator for enriching Appian login visibility through native audit parsing and optional identity-provider sign-in log correlation.

## Project Context

Security and compliance teams often need more than username and timestamp information. They may need to understand device category, browser, operating system, location signals, compliance posture, or identity-provider context.

## Problem

Appian-native login audit data can expose user-agent and IP information, but it does not always provide:

- reliable device names
- managed-device status
- compliance posture
- strong security context
- identity-provider risk signals
- complete device attribution

## My Role

Security/audit discovery and telemetry architecture contributor.

Recommended role positioning:

Assessed Appian login telemetry options and designed a decision model for native audit parsing versus identity-provider enrichment.

## Users and Stakeholders

- security teams
- compliance teams
- platform owners
- Appian administrators
- support teams
- audit teams

## Solution Overview

The accelerator defines two levels of telemetry:

1. Native Appian audit parsing for lightweight analytics.
2. Identity-provider sign-in log correlation for security-grade device metadata.

## Architecture and Technical Approach

Architecture elements:

- Appian login audit CSV
- user-agent parsing
- IP and timestamp extraction
- device/browser/OS inference
- optional identity-provider API integration
- sign-in log correlation
- compliance and managed-device enrichment
- audit reporting model

## Key Features

- discovery question set
- native telemetry option
- identity-provider enrichment option
- user-agent parsing
- desktop/mobile detection
- security-grade metadata decision matrix
- audit reporting recommendations

## UX and Product Decisions

- make audit outputs explainable to security and support users
- distinguish inferred device data from authoritative identity-provider data
- avoid overstating what native logs can prove
- preserve privacy and compliance boundaries

## Business Value

- improves access auditing
- clarifies device visibility limitations
- supports security investigations
- creates a practical telemetry roadmap
- helps teams decide when identity-provider integration is justified

## Technologies and Appian Capabilities

- Appian
- Login Audit Logs
- User-Agent Parsing
- Identity Provider APIs
- Security Monitoring
- Audit Reporting
- Compliance Review

## Suggested Website Sections

1. Access telemetry challenge
2. Native audit parsing model
3. Identity-provider enrichment option
4. Decision matrix
5. Security and audit value

## Suggested Visuals

- telemetry pipeline
- native versus identity-provider comparison
- login audit enrichment model
- security decision matrix

## Final Portfolio Copy

Designed an Appian access-audit accelerator that compares native login-audit parsing with identity-provider enrichment to improve device visibility, audit context, and security investigation readiness.

## Confirmation Needed

- final selected option
- identity provider used, if approved for public mention
- reporting screenshots
