# Contact Form QA

## Required Checks

- `action="https://splitforms.com/api/submit"`
- `method="POST"`
- hidden access key present
- redirect to `/thanks`
- labels visible
- required fields validate
- email uses `type="email"`
- autocomplete set
- keyboard navigation works
- focus ring visible
- mobile layout fits
- production submission tested

## Privacy Copy

Include a note that users should not submit confidential client data, credentials, or sensitive project details.

## Splitforms Setup

- Lock key to production domain.
- Configure destination email.
- Enable spam protection.
- Test preview and production behavior.
