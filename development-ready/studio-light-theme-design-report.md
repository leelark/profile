# Studio Light Theme Design Report

## Scope

This report covers the current Studio Light refinement pass for the Astro portfolio implementation. The work is intentionally light-theme-only: no content changes, no route changes, no contact-form behavior changes, and no dark-theme selector changes.

## Pages and Sections Audited

Routes checked:

- `/profile/`: hero, delivery contribution, technical skills, credentials, domains, client footprint, contact CTA.
- `/profile/work/`: portfolio hero, workflow visual, project filters, project cards, project modal.
- `/profile/work/client-projects/`: category header and project explorer.
- `/profile/work/plugins/`: category header and project explorer.
- `/profile/work/innovative-projects/`: category header and project explorer.
- `/profile/work/accelerators/`: category header and project explorer.
- `/profile/key-works/`: key-work hero/system visual, featured strips, plugin tabs/cards, modal.
- `/profile/resume/`: experience, education, certifications, publication.
- `/profile/contact/`: contact cards, topic flow, Splitforms contact form, privacy note.
- `/profile/thanks/`: confirmation card and CTA.

Shared implementation checked:

- `BaseLayout.astro`: theme boot script, global background, nav, floating contact, footer.
- `NavControls.tsx`: persisted theme toggle and mobile menu.
- `ProjectExplorer.tsx`: filters, cards, project modal, project visual scenes.
- `FeaturedWorksShowcase.tsx`: key-work strips, plugin tabs/cards, modal.
- `ContactForm.astro`: Splitforms form markup and focusable fields.
- `global.css` and `resume.css`: token cascade, final light layers, motion, responsive behavior.

## Research Alignment

Research used for this pass:

- [Material Design color roles](https://m3.material.io/styles/color/roles): keep color roles semantic instead of page-specific hard-coding.
- [IBM Carbon themes](https://carbondesignsystem.com/elements/themes/overview/): layer surfaces with clear token roles rather than one flat background.
- [Microsoft Fluent color](https://fluent2.microsoft.design/color) and [Fluent motion](https://fluent2.microsoft.design/motion): use restrained color, elevation, and motion for hierarchy.
- [Apple Human Interface Guidelines color](https://developer.apple.com/design/human-interface-guidelines/color): maintain contrast and adapt surfaces between appearances.
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) and [Focus Appearance](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html): preserve visible focus, readable text, and non-color-only affordances.

Portfolio-specific interpretation:

- Studio Light should not mean pure white everywhere. It should use tinted near-neutral surfaces, soft lavender/blue/green/amber washes, and charcoal text.
- Purple remains the identity accent for active states, focus, selected tabs, and primary CTAs.
- Blue supports architecture/integration, green supports validated capability, and amber supports caution/confirmation contexts.
- Motion should feel quiet and precise; decorative background movement is reduced in light mode because pale surfaces expose motion more strongly.

## Diagnosis

Findings before implementation:

- `global.css` had multiple Studio Light layers. The active final token layer was near the end of the file, so earlier edits could be overridden.
- `resume.css` also had repeated light-theme passes and loads after `global.css`, requiring a final resume-only layer.
- Light mode was still too close to white in large backgrounds and form/card surfaces.
- Borders and grid lines were more visible in light mode than intended, especially around repeated cards and major panels.
- Project-modal side rails stayed visible at a width where the central modal became too narrow; this caused the modal hero copy and visual scene to compete.
- Project cards parse evidence status data but do not render an evidence badge. This is a separate product-spec gap and was not changed in this light-theme-only pass.

## Implementation

Changed files:

- `src/styles/global.css`
- `src/styles/resume.css`

Implemented:

- Added a final `Studio Light portfolio finish` layer scoped to `html[data-theme="light"]` and `[data-theme="light"]`.
- Replaced large pure-white surfaces with tinted light neutrals: soft canvas, panel, field, elevated, rim, line, and shadow tokens.
- Reduced global grid/background line strength and decorative layer opacity.
- Normalized shared light surfaces: nav, buttons, cards, project modal, work filters, key-work cards, contact form, thanks card, chips, and project visual scenes.
- Tightened border/shadow hierarchy so repeated elements remain scannable without harsh outlines.
- Strengthened light focus states for buttons, links, inputs, selects, and textareas.
- Added a final resume-only Studio Light layer because `resume.css` loads after global styles.
- Collapsed project modal side rails earlier in light mode at narrower widths, fixing the modal hero overlap without changing dark mode.
- Slowed low-value decorative motion in Studio Light while keeping reduced-motion behavior intact.

## QA Results

Automated checks:

- `esbuild src/scripts/global-three-background.ts --bundle --format=iife --target=es2020 --minify --outfile=public/global-three-background.js`: passed.
- `astro check`: 0 errors, 0 warnings, 0 hints.
- `astro build`: 11 pages built successfully.
- `npm run lint:motion`: passed.
- `npm run lint:home-revamp`: passed.
- `npm run lint:work-revamp`: passed.
- `npm run lint:work-ui`: passed after production build generated `dist/work/index.html`.
- `npm run lint:content`: passed with existing evidence-status warnings for four draft items.

Browser QA with Codex in-app browser:

- Checked light-mode routes: home, work, key works, resume, contact, thanks.
- Checked theme toggle: light to dark and back to light.
- Checked work filter interaction: Plugins filter.
- Checked project modal: opened HTML Viewer Component Plugin modal and fixed light-mode modal overlap.
- Checked contact form focus state on the Name field.
- Checked dark-mode home rendering after the light changes.

Saved QA screenshots:

- `output/light-theme-qa/home.png`
- `output/light-theme-qa/work.png`
- `output/light-theme-qa/key-works.png`
- `output/light-theme-qa/resume.png`
- `output/light-theme-qa/contact.png`
- `output/light-theme-qa/thanks.png`
- `output/light-theme-qa/work-modal-fixed.png`
- `output/light-theme-qa/contact-focus.png`
- `output/light-theme-qa/dark-home-protection.png`

## Current Status

Studio Light is now more balanced, premium, and aligned with the dark theme's enterprise visual language without copying dark mode literally. It uses tinted light surfaces, quieter borders, lower-motion backgrounds, stronger focus states, and more coherent card/modal/form treatment.

Dark theme remains protected because all new styling is scoped to `[data-theme="light"]` or `html[data-theme="light"]`.

## Remaining Non-Theme Gap

Project cards still do not visibly render an evidence badge even though evidence status is parsed in the data layer. This should be handled as a separate functionality/content-display task because it changes visible content structure, not only Studio Light styling.
