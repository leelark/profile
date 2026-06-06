# Excel Merge / Large Export Accelerator

## Portfolio Classification

Primary Category: Accelerators

Secondary Categories:

- Appian Performance
- Excel Automation
- Reporting
- Architecture Options Analysis
- Heap Optimization

Evidence Status: Confirmed

Evidence Basis: Appian Accelerate Excel merge / large export deck.

## Hero Summary

Scalable design patterns for merging analytics charts and large transactional Excel exports while reducing Appian heap pressure and improving export reliability.

## Project Context

The work related to an Appian application used to track and manage activities across clinical trials. Leadership users needed Excel exports that included both raw transactional data and visual analytics such as charts.

## Problem

Large Excel exports can cause performance and memory issues. In the reviewed scenario:

- transactional data was around 90K rows and 20 columns
- exports were generated in 20K row batches
- chart data was added through a template sheet
- SQL to Excel plugin loaded large datasets into memory
- heap memory exhaustion caused server restarts
- heavy Excel templates and sheet cloning increased memory footprint

## My Role

Performance/architecture solution contributor.

Recommended role positioning:

Evaluated multiple Appian Excel merge/export strategies and designed scalable alternatives to reduce heap pressure, preserve charts/styles, and support large transactional data exports.

## Users and Stakeholders

- business leadership users
- group heads
- cluster heads
- reporting users
- Appian support teams
- platform owners

## Solution Overview

Several solution options were evaluated:

1. Off-peak full export plus incremental updates.
2. Client-side browser merge using JavaScript libraries.
3. XML and ZIP reconstruction.
4. JSON to Excel plugin converter.

## Architecture and Technical Approach

### Option 1: Off-Peak Full Export and Incremental Updates

Run heavy exports during non-working hours, save the generated document as a base analytics file, and append lightweight delta updates during business hours.

### Option 2: Browser-Side Merge

Generate smaller Excel files in Appian and merge them client-side using JavaScript libraries such as xlsx/jszip.

### Option 3: XML and ZIP Reconstruction

Generate graph and transaction Excel files separately, unzip components, inject worksheet XML, update workbook relationships and content types, then rebuild the final Excel ZIP.

### Option 4: JSON to Excel Converter

Use a JSON-to-Excel plugin for smaller or medium datasets, but avoid for very large datasets due to performance and heap limitations.

## Key Features

- large transactional export strategy
- charted analytics export
- heap exhaustion analysis
- off-peak scheduling
- incremental updates
- browser-side workbook merge
- XML/ZIP reconstruction
- plugin limitation analysis
- performance-focused design comparison

## Accelerator Workstream Detail

Source accelerator theme:

- merge analytics charts and transactional Excel data
- handle large export volume without exhausting Appian heap
- preserve charts, styles, workbook structure, and data integrity

Options analyzed:

- off-peak full export with incremental daytime updates
- browser-side merge using JavaScript libraries
- XML and ZIP reconstruction of workbook internals
- JSON-to-Excel plugin conversion for smaller or medium datasets

Technical risks reviewed:

- heap exhaustion from large in-memory workbook generation
- heavy templates and sheet cloning
- large transactional dataset exports
- chart generation from actual data points
- batch insert and staging-table behavior
- plugin limits for high-volume export

Recommended framing:

- show this as architecture options analysis, not only Excel automation
- emphasize performance, memory pressure, reliability, and user-facing download simplicity
- note that the final selected option and measured outcome require confirmation before public publishing

## UX and Product Decisions

- keep leadership export experience simple
- avoid making users wait for heavy runtime processing where possible
- preserve charts and styles
- reduce failure risk during business hours
- provide reliable downloadable output

## Business Value

- reduces platform memory risk
- improves export reliability
- supports leadership reporting
- keeps charts and transactional data together
- avoids server instability caused by large plugin memory use
- provides clear architecture tradeoffs

## Technologies and Appian Capabilities

- Appian
- SQL to Excel plugin
- Export SQL to Excel
- DSE to Excel
- JavaScript
- xlsx/jszip concepts
- XML
- ZIP reconstruction
- Appian Solutions Plugin
- Add Document to Zip
- SQL indexing
- staging tables

## Suggested Website Sections

1. Reporting/export challenge
2. Performance problem
3. Options evaluated
4. Recommended architecture
5. Business value
6. Lessons learned

## Suggested Visuals

- option comparison matrix
- heap pressure diagram
- Excel merge pipeline
- before/after export strategy

## Final Portfolio Copy

Evaluated and designed scalable Excel merge patterns for charted analytics and large transactional exports, reducing heap pressure through batching, browser-side merge, or XML/ZIP reconstruction.

## Confirmation Needed

- final selected solution
- performance result
- implementation status
- screenshots
