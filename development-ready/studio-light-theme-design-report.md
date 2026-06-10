# Studio Light Theme Design Report

## Scope

This report covers a light-theme-only refinement pass for the existing Astro portfolio implementation. The goal is to make Studio Light feel premium, editorial, enterprise-grade, and as intentionally designed as Executive Dark without changing content, routing, form behavior, React interactions, or dark-theme styling.

## Current Implementation Inventory

Public routes checked:

- `/`: hero, operating model, technical skills, credentials, domains, enterprise client experience, contact CTA.
- `/work`: portfolio hero, animated workflow visual, filterable project explorer, project-card modal.
- `/work/client-projects`: category header and project explorer without filters.
- `/work/plugins`: category header and project explorer without filters.
- `/work/innovative-projects`: category header and project explorer without filters.
- `/work/accelerators`: category header and project explorer without filters.
- `/key-works`: key work hero, system visual, featured work strips, plugin filter lab, project modal.
- `/plugins-and-accelerators`: redirect to `/key-works`.
- `/resume`: experience, education, certifications, publication.
- `/contact`: contact header, contact detail cards, contact focus flow, Splitforms contact form, privacy note.
- `/thanks`: confirmation card and return CTA.

Shared surfaces checked:

- `BaseLayout.astro`: theme boot script, header, navigation, floating contact, footer, global background.
- `NavControls.tsx`: theme toggle, mobile nav, reduced-motion menu animation.
- `ProjectExplorer.tsx`: filters, project cards, modal, project readout, visual scenes.
- `FeaturedWorksShowcase.tsx`: key works, plugin tabs, plugin cards, modal.
- `TechnicalSkillGrid.tsx`: Appian capability and technical skill cards.
- `ContactForm.astro`: Splitforms POST and client-side progressive enhancement.
- `global.css` and `resume.css`: global theme tokens, route-specific component styles, Studio Light final cascade.

## Research Alignment

External references reviewed:

- WCAG 2.2 contrast, focus appearance, reflow, and target size: <https://www.w3.org/TR/WCAG22/>
- WCAG focus appearance explanation: <https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html>
- Fluent 2 accessibility and color foundations: <https://fluent2.microsoft.design/accessibility>, <https://fluent2.microsoft.design/color>
- Carbon theme token model: <https://carbondesignsystem.com/elements/themes/overview/>
- Material Design 3 color role guidance: <https://m3.material.io/styles/color/overview>
- Nielsen Norman Group visual hierarchy and visual complexity guidance: <https://www.nngroup.com/articles/visual-hierarchy-ux-definition/>, <https://www.nngroup.com/videos/managing-visual-complexity/>
- Product and portfolio references for restrained light systems: WorkOS, Linear, Retool, Stripe, Work & Co.
- Appian enterprise positioning references: <https://appian.com/products/platform/total-experience/web-portals>, <https://appian.com/learn/executive-series/architecting-the-modern-enterprise>

Research implications for this portfolio:

- Use semantic role tokens instead of page-by-page hard-coded colors.
- Keep light mode calm and readable: off-white canvas, white or near-white surfaces, charcoal text, visible borders.
- Use purple as a precise identity accent, not the dominant background color.
- Use blue for architecture and integration, green for evidence-backed signals, amber for caution or needs-confirmation.
- Preserve card affordances but avoid a dashboard-heavy or nested-card feel.
- Keep motion below the reading threshold: quick state feedback, subtle section reveal, no continuous decorative movement as the main visual personality.

## Light Theme Diagnosis

Strengths:

- Dark theme is isolated through default tokens and should remain protected if changes are scoped to `[data-theme="light"]`.
- Theme toggle is persisted through `localStorage` and does not require functional change.
- Most component colors already route through CSS variables, so a final light-only token layer can improve multiple pages at once.
- Focus-visible styles exist globally and can be strengthened for Studio Light.

Risks found:

- Studio Light has multiple cascade layers, including a large existing final override. This makes direct edits inside older blocks brittle.
- Current light palette is slightly too saturated and mist-heavy, so several sections read as tinted panels rather than editorial portfolio surfaces.
- Some card and control surfaces share the same visual weight, which weakens hierarchy on pages with many repeated cards.
- Continuous background, section, and resume motion can feel busier in light mode because pale surfaces reveal movement more strongly.
- Project modals, contact form fields, key-work strips, plugin tabs, and resume timeline need sharper border and text contrast in light mode.

## Design Direction

Studio Light should use:

- Canvas: soft off-white, not gray-blue heavy.
- Surfaces: white and very light neutral-lavender with clear border separation.
- Text: charcoal primary, slate secondary, no low-contrast pale gray.
- Accent: deep purple for focus, active state, selected tabs, and primary CTA.
- Architecture color: restrained blue.
- Evidence color: restrained green.
- Caution color: amber with text labels.
- Motion: fast, low-amplitude, and reduced further in light mode for decorative background layers.

The intended feel is an enterprise product and architecture portfolio: editorial, polished, readable, and evidence-led.

## Implementation Plan

1. Add a final `Studio Light governance layer` at the end of `src/styles/global.css`.
2. Override only `[data-theme="light"]` selectors and variables.
3. Tone down page backgrounds and decorative motion opacity.
4. Normalize light surfaces for nav, buttons, cards, modals, key works, contact, thanks, and repeated chips.
5. Strengthen light focus rings, form controls, active filters, and project-card affordances.
6. Add a final light-only resume layer in `src/styles/resume.css` to align the resume page with the same surface and contrast model.
7. Do not edit content, React logic, Splitforms behavior, routing, dark selectors, or component structure unless QA exposes a functional issue.

## QA Plan

Build and static checks:

- `npm run build`
- Existing validation scripts where relevant: content, motion, homepage, work UI, work revamp.

Browser QA with light theme enabled:

- Routes: `/`, `/work`, `/work/client-projects`, `/work/plugins`, `/work/innovative-projects`, `/work/accelerators`, `/key-works`, `/resume`, `/contact`, `/thanks`.
- Breakpoints: 390px, 768px, 1280px. Add 320px if overflow appears.
- Checks: no horizontal overflow, readable text, visible focus, usable nav and filters, cards not visually collapsed, contact form unchanged, modals readable, reduced-motion support intact.

Dark-theme protection:

- Check at least `/`, `/work`, `/key-works`, `/resume`, and `/contact` in dark after light refinements.
- Confirm dark theme variables are untouched by searching that new rules are scoped under `[data-theme="light"]`.

## Acceptance Criteria

- Light theme looks intentional across all public pages.
- Dark theme remains visually and functionally unchanged.
- Project filtering, modals, theme toggle, contact form, floating contact CTA, redirects, and resume layout still work.
- Body copy, controls, badges, and focus states meet practical WCAG AA expectations.
- Motion remains restrained and reduced-motion behavior still removes non-essential animation.
