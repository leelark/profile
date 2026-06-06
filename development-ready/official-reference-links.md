# Official Reference Links

## Purpose

These official references were checked on June 6, 2026 while updating the development-ready portfolio plan to a frontend-only GitHub-hosted stack. Re-check these links before implementation because framework versions, deployment behavior, and security guidance can change.

## Framework and Runtime

- Astro docs: https://docs.astro.build/
- Astro pages and routing: https://docs.astro.build/en/basics/astro-pages/
- Astro content collections: https://docs.astro.build/en/guides/content-collections/
- Astro React integration: https://docs.astro.build/en/guides/integrations-guide/react/
- React versions: https://react.dev/versions
- React with TypeScript: https://react.dev/learn/typescript

## Styling and Motion

- Tailwind CSS docs: https://tailwindcss.com/docs
- Tailwind CSS with Astro: https://docs.astro.build/en/guides/styling/#tailwind
- Motion for React: https://motion.dev/react
- Motion docs: https://motion.dev/docs

## GitHub Hosting and Deployment

- Astro deploy to GitHub Pages: https://docs.astro.build/en/guides/deploy/github/
- GitHub Pages documentation: https://docs.github.com/en/pages
- GitHub Pages custom domains: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages
- GitHub Pages HTTPS: https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https
- GitHub Actions documentation: https://docs.github.com/en/actions

## Forms

- Splitforms HTML contact form: https://splitforms.com/forms/html
- Splitforms FAQ: https://splitforms.com/faq

## Notes For Developers

- Prefer current official documentation over memory.
- Verify Astro, React, Tailwind, Motion, GitHub Pages, and GitHub Actions docs before implementation.
- Pin package versions during implementation.
- Configure Astro `site` and `base` correctly for either a user site, project site, or custom domain.
- Treat user-provided form keys as public form keys unless the provider states otherwise, but lock the key to the production domain in the Splitforms dashboard.
