---
name: portfolio-contact-form
description: Use when designing, implementing after explicit approval, or reviewing the portfolio contact form, including Splitforms integration, form fields, accessibility, validation, redirect, spam/domain-lock setup, privacy note, thank-you page, and contact form QA.
---

# Portfolio Contact Form

## Core Rule

Use Splitforms for the contact form and preserve the user-provided access key exactly unless the user replaces it. Treat the Splitforms key as a public browser form key for this provider, but do not add private API secrets to client-side code. Implement the form only after explicit development approval.

## First Files To Read

From repository root:

1. `development-ready/contact-form-specification.md`
2. `development-ready/functional-requirements.md`
3. `development-ready/qa-accessibility-performance-seo.md`
4. `development-ready/official-reference-links.md`

## Required Base Form

```html
<form action="https://splitforms.com/api/submit" method="POST">
  <input type="hidden" name="access_key" value="8897600acb7b48f09fb9d1f78895c3b6">
</form>
```

## Required Fields

Visible:

- name
- email
- inquiry type
- company or organization
- message

Hidden:

- access_key
- redirect to `/thanks`
- subject
- source page

## Accessibility

Every field needs:

- visible label
- programmatic label
- required state where needed
- autocomplete where appropriate
- help/error text
- keyboard focus

## Launch Rules

Before production launch:

- lock the Splitforms key to the domain
- test a real production submission
- verify `/thanks`
- verify spam settings
- verify destination email

## References

Read `references/contact-qa.md` before contact implementation or review.
