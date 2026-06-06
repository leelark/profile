# Implementation Checklist

## Required Routes

- `/`
- `/work`
- `/work/client-projects`
- `/work/plugins`
- `/work/innovative-projects`
- `/work/accelerators`
- `/work/[slug]`
- `/expertise`
- `/plugins-and-accelerators`
- `/about`
- `/resume`
- `/contact`
- `/thanks`

## Required Features

- Astro static pages
- dark default theme
- light theme option
- responsive navigation
- project filters
- project cards
- project detail pages
- accelerator catalog
- contact form
- reduced motion
- SEO metadata
- GitHub Pages deployment workflow

## Contact Form

- POST to `https://splitforms.com/api/submit`
- hidden access key present
- redirect to `/thanks`
- labels and validation present

## Build Verification

- lint
- type check
- build
- GitHub Pages build output
- responsive screenshots
- accessibility checks
- form smoke test
