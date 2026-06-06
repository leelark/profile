# Contact Form Specification

## Purpose

The portfolio must include a professional contact form that lets recruiters, hiring managers, enterprise clients, and Appian stakeholders contact Leelark.

The form should use Splitforms as the submission backend.

## Required Form Action

```html
<form action="https://splitforms.com/api/submit" method="POST">
  <input type="hidden" name="access_key" value="8897600acb7b48f09fb9d1f78895c3b6">
</form>
```

## Recommended Full Field Set

Visible fields:

- `name`
- `email`
- `company`
- `inquiry_type`
- `message`

Recommended inquiry types:

- Recruiter / Hiring
- Enterprise Appian Consulting
- AI Workflow or Document Intelligence
- Plugin or Accelerator Discussion
- Speaking / Research / Other

Hidden fields:

- `access_key`
- `redirect`
- `subject`
- `source`

Recommended redirect:

```html
<input type="hidden" name="redirect" value="/thanks">
```

Recommended subject:

```html
<input type="hidden" name="subject" value="Portfolio contact form submission">
```

## Accessibility Requirements

Every input must have:

- visible label
- programmatic label
- required indication where needed
- error/help text
- autocomplete where possible
- keyboard focus

Recommended autocomplete:

- `name`: `autocomplete="name"`
- `email`: `autocomplete="email"`
- `company`: `autocomplete="organization"`

## Validation Requirements

Client-side:

- name required
- email required and type email
- inquiry type required
- message required
- reasonable max length on message

Server/provider-side:

- Splitforms handles submission validation
- enable spam protections in Splitforms dashboard
- lock access key to production domain

## Privacy Note

Recommended copy:

"Your message will be sent securely through the portfolio contact form provider. Please avoid sharing confidential client data, credentials, or sensitive project details in this form."

## UX Requirements

The contact form should:

- be visually calm and premium
- use the same dark/light theme tokens
- show clear field hierarchy
- avoid asking for unnecessary information
- provide a clear submit button
- show a success path through `/thanks`
- show a non-JavaScript fallback through standard form submission

## Splitforms Key Handling

The access key is included in the HTML because Splitforms forms submit directly from the browser. Before launch:

- lock the key to the production domain in the Splitforms dashboard
- configure destination email
- configure spam protection
- test the form in preview and production
- verify the `/thanks` redirect

Do not add private API secrets to client-side code.

## Suggested Contact Page Copy

Headline:

"Let us discuss Appian architecture, AI workflows, plugins, or enterprise automation."

Supporting copy:

"Use the form for consulting, hiring, project collaboration, Appian advisory work, plugin discussions, or AI-enabled workflow design."

Submit button:

"Send Message"

Success page title:

"Message Sent"

Success page copy:

"Thanks for reaching out. I will review your message and respond through the email address you provided."

## QA Checklist

- form action is correct
- method is POST
- access key hidden field is present
- redirect field points to `/thanks`
- all required fields enforce validation
- labels are accessible
- keyboard navigation works
- focus states are visible
- mobile layout does not overflow
- test submission reaches Splitforms
- domain locking is configured before public launch
