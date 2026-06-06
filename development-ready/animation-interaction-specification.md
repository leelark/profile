# Animation and Interaction Specification

## Motion Goal

The portfolio should feel polished, modern, and sleek without becoming flashy. Motion should support content hierarchy, guide attention, and reinforce the premium enterprise identity.

## Motion Personality

Use motion that feels:

- quiet
- confident
- precise
- fast
- premium
- content-led

Avoid motion that feels:

- playful
- gimmicky
- over-animated
- distracting
- startup-template-like

## Timing Tokens

| Token | Value | Use |
| --- | --- | --- |
| instant | 80 ms | reduced-motion state changes |
| fast | 120 ms | button hover, link underline |
| base | 180 ms | filter, nav, tag state |
| slow | 280 ms | card reveal, accordion |
| page | 420 ms | page or hero entrance |

## Page Motion

Home:

- hero title and role fade in first
- proof strip appears second
- featured project cards reveal in small groups
- avoid delaying the CTA

Work:

- filters transition quickly
- cards fade and shift slightly
- preserve layout stability

Case study:

- metadata and executive snapshot appear before deep content
- architecture sections can reveal as the user scrolls
- long paragraphs should not animate

Plugins and accelerators:

- category groups reveal as stable sections
- feature matrices can reveal by group

Resume:

- timeline items use minimal fade and shift
- avoid slowing recruiter scanning

Contact:

- keep animation minimal
- use clear focus and submit feedback

## Component Motion

Buttons:

- hover background or border transition
- press scale 0.98
- no bounce

Cards:

- translateY maximum 2 px
- border or shadow change
- no rotation
- no 3D tilt

Links:

- underline draw or color transition
- complete under 160 ms

Theme toggle:

- icon crossfade or subtle rotate
- color transition 180 to 240 ms
- no white flash during dark/light switch

Mobile menu:

- short slide/fade
- trap focus if modal-style
- close on route change

Architecture diagrams:

- highlight active step if useful
- no continuous connector animation
- mobile becomes vertical steps

## Reduced Motion

When reduced motion is requested:

- disable scroll reveal
- disable stagger
- disable scaling
- disable animated glow
- disable parallax
- keep state changes under 80 ms
- preserve focus and selected states

## Performance Rules

Animate:

- opacity
- transform
- color
- border color
- background color

Avoid animating:

- width
- height where possible
- top
- left
- heavy box-shadow
- blur
- large screenshots

## Prohibited Patterns

Do not use:

- scroll-jacking
- animated cursors
- typewriter hero
- particle fields
- decorative blobs
- heavy parallax
- bouncing cards
- rotating cards
- excessive counters
- large moving purple gradients

## QA Checklist

- motion supports hierarchy
- hero role statement is visible quickly
- cards remain readable
- filters do not jump
- theme toggle does not flash
- reduced motion works
- focus is never hidden
- mobile motion is shorter than desktop
- no page feels motion-dominated
