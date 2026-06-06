# Release Checklist

## Pre-Launch

- production domain configured
- SSL active
- preview reviewed
- GitHub Pages configured
- GitHub Actions deployment workflow configured
- Astro `site` and `base` configured correctly
- preview and production form submissions tested and received at the configured destination email
- Splitforms key locked to domain
- SEO metadata added
- sitemap and robots present
- Open Graph image present
- structured metadata reviewed
- browser matrix checked
- analytics configured
- analytics/privacy decisions finalized
- no public-safe violations
- accessibility QA passed
- responsive QA passed
- performance QA passed

## Rollback

- keep previous production deployment available
- redeploy previous stable build if needed
- disable form changes if needed
- document incident and fix before relaunch

## Post-Launch

- verify uptime
- verify form delivery
- check 404s
- check mobile layout
- monitor performance
- schedule quarterly content review
