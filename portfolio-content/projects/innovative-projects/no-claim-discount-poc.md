# No Claim Discount POC

## Portfolio Classification

Primary Category: Innovative Projects

Secondary Categories:

- AI POC
- Insurance Workflow
- Evidence Verification
- Appian AI
- Human Review

Evidence Status: Confirmed

Evidence Basis: NCD workflow HTML demo content.

## Hero Summary

AI-assisted No Claim Discount evidence verification workflow that classifies uploaded documents, extracts policy fields, validates evidence consistency, routes exceptions to manual review, and sends outcome notifications.

## Project Context

No Claim Discount verification requires insurers to collect customer evidence, validate documents, review NCD years, check policy details, and decide whether evidence is approved, rejected, or requires more information.

## Problem

Manual NCD evidence review can be slow and inconsistent. Reviewers need to inspect documents, verify policy information, identify document types, check consistency, calculate discount impact, and notify customers.

## My Role

AI workflow designer and POC builder.

Recommended role positioning:

Designed an Appian AI workflow for NCD evidence request, submission, ingestion, classification, extraction, AI assessment, manual review, and final outcome notification.

## Users and Stakeholders

- insurance customers
- reviewers
- policy operations teams
- claims/underwriting teams
- customer service teams

## Solution Overview

The workflow supports:

1. reviewer-initiated evidence request
2. automated notification
3. customer upload through portal or email
4. OTP login
5. document ingestion
6. Appian AI classification
7. field extraction
8. AI assessment
9. manual review
10. approved / need more information / rejected outcome
11. email notification

## Architecture and Technical Approach

Architecture elements:

- reviewer request trigger
- email notification
- portal upload
- email attachment scraper
- tracking ID
- document ingestion engine
- Appian AI classification
- Appian AI extraction
- consistency validation
- manual review stage
- outcome notification

## Key Features

- reviewer request for NCD evidence
- batch-processing option
- email alert with portal upload link
- OTP login
- secure document upload
- email attachment ingest
- document parsing and storage
- classification:
  - NCD certificate
  - policy schedule
  - insurer letter
  - invalid document
- extraction:
  - policy number
  - holder name
  - insurer name
  - NCD years
  - expiry date
- AI assessment:
  - document consistency
  - normalization
  - evidence validation
  - recommendation and calculation
  - audit detail preparation
- manual review:
  - audit AI outputs
  - validate year and discount percentage
- outcome:
  - approved
  - need more info
  - rejected

## UX and Product Decisions

- make customer submission simple
- allow both portal and email-based submission
- keep reviewer in control for final validation
- provide AI assistance logs
- keep outcome states clear
- support audit detail preparation

## Business Value

- reduces manual evidence triage
- improves consistency of NCD document review
- speeds up evidence collection
- supports exception handling
- improves customer communication
- creates reusable insurance evidence workflow pattern

## Technologies and Appian Capabilities

- Appian
- Appian AI
- Document Classification
- Document Extraction
- Email Notification
- Portal Upload
- OTP Login
- Workflow Automation
- Manual Review

## Suggested Website Sections

1. NCD verification problem
2. Workflow lifecycle
3. AI classification and extraction
4. Human review
5. Outcome notification
6. Reusable insurance workflow value

## Suggested Visuals

- NCD workflow timeline
- AI classification card
- extraction result panel
- reviewer decision screen
- outcome states

## Final Portfolio Copy

Built an NCD evidence verification workflow using Appian AI to classify uploaded documents, extract policy fields, validate consistency, and route exceptions to manual review before notifying the customer.

## Confirmation Needed

- implementation status
- screenshots
- extraction accuracy
- processing time
- insurance/client confidentiality
