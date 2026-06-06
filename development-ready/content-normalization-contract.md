# Content Normalization Contract

## Purpose

This contract defines how the Markdown content in `portfolio-content/` should be converted into the website data layer during implementation.

## Content Types

### ProjectDetail

Use for:

- client project pages
- plugin pages
- innovative project pages
- accelerator detail pages

Required headings:

1. `# Title`
2. `## Portfolio Classification`
3. `## Hero Summary`
4. `## Project Context`
5. `## Problem`
6. `## My Role`
7. `## Users and Stakeholders`
8. `## Solution Overview`
9. `## Architecture and Technical Approach`
10. `## Key Features`
11. `## UX and Product Decisions`
12. `## Business Value`
13. `## Technologies and Appian Capabilities`
14. `## Suggested Website Sections`
15. `## Suggested Visuals`
16. `## Final Portfolio Copy`
17. `## Confirmation Needed`

### AcceleratorCatalog

Use for:

- `portfolio-content/projects/accelerators/accelerator-catalog.md`

This is a special catalog page, not a ProjectDetail page. It should power the accelerator library overview and group navigation.

Required fields:

- title
- primary category
- secondary categories
- evidence status
- evidence basis
- purpose
- public-safe publishing rules
- accelerator groups
- recommended website treatment
- featured accelerator recommendations
- portfolio positioning
- final portfolio copy
- confirmation needed

## Field Mapping

| Markdown Heading | Data Field |
| --- | --- |
| `# Title` | `title` |
| `Primary Category:` | `category` |
| `Secondary Categories:` | `secondaryCategories` |
| `Evidence Status:` | `evidenceStatus` |
| `Evidence Basis:` | `evidenceBasis` |
| `## Hero Summary` | `heroSummary` |
| `## Project Context` | `projectContext` |
| `## Problem` | `problem` |
| `## My Role` | `myRole` |
| `## Users and Stakeholders` | `usersAndStakeholders` |
| `## Solution Overview` | `solutionOverview` |
| `## Architecture and Technical Approach` | `architectureAndTechnicalApproach` |
| `## Key Features` | `keyFeatures` |
| `## UX and Product Decisions` | `uxAndProductDecisions` |
| `## Business Value` | `businessValue` |
| `## Technologies and Appian Capabilities` | `technologiesAndAppianCapabilities` |
| `## Suggested Website Sections` | `suggestedWebsiteSections` |
| `## Suggested Visuals` | `suggestedVisuals` |
| `## Final Portfolio Copy` | `finalPortfolioCopy` |
| `## Confirmation Needed` | `confirmationNeeded` |

## Slug Rules

Default slug:

- derive from Markdown file name
- remove `.md`
- keep kebab-case

Examples:

- `claimroute-iq.md` becomes `claimroute-iq`
- `appian-server-metrics-performance-triage.md` becomes `appian-server-metrics-performance-triage`

Do not derive public slugs from source deck names, client ticket numbers, or internal IDs.

## Featured and Order Rules

If no frontmatter exists, define featured/order in a typed data override file during implementation.

Required override fields:

- `slug`
- `featured`
- `recommendedOrder`
- `domain`
- `role`
- `tags`
- `publicVisibility`

Recommended visibility values:

- `public`
- `draft`
- `private`
- `needs-confirmation`

## Evidence Status Enum

Allowed values:

- `Confirmed`
- `Partially Confirmed`
- `Needs Confirmation`

Do not use combined values such as `Confirmed and Partially Confirmed`.

If a catalog or group contains mixed evidence, set the page-level status to `Partially Confirmed` and explain mixed confidence in `Evidence Basis`.

## Draft and Public Rendering

Public mode:

- hide `Confirmation Needed`
- hide raw `Evidence Basis` when sensitive
- avoid raw source filenames
- avoid internal notes

Draft mode:

- show evidence basis
- show confirmation needed
- show content warnings
- show public-safe review notes

## Validation Failures

Treat these as errors before launch:

- missing title
- missing primary category
- missing evidence status
- invalid evidence status enum
- missing hero summary
- missing final portfolio copy
- public page with `Needs Confirmation` status
- raw credential-like string outside the approved Splitforms key
- private key material
- internal environment/server/object identifiers

Treat these as warnings:

- missing suggested visuals
- missing tags
- missing featured/order override
- long project summary
- unconfirmed screenshots

## Implementation Note

The first implementation can use manually curated TypeScript data instead of automated Markdown parsing. If automation is added, it must follow this contract.
