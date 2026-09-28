# Internee.pk design brief

## Direction
Dark-first career platform redesign grounded in the supplied Internee.pk PRD and design system. The page should feel energetic, practical, credible, and optimistic without becoming a generic SaaS template.

## Design movement
Flat utility-first product marketing: strong type, high contrast, bright green action moments, rounded containers, and proof-rich modules that help a learner move from discovery to action.

## Core principles
- Make the path to a practical internship obvious in the first viewport.
- Use proof (partners, outcomes, certificates, progress) to build confidence.
- Prefer calm hierarchy over decoration; no heavy shadows or glossy effects.
- Treat every repeated pattern as structured data so future APIs can replace local content.
- Keep interaction restrained, functional, and keyboard friendly.

## Color philosophy
Charcoal `#171717` is the canonical canvas. Brand green `#43A724` marks action, progress, and selected states. A lighter green `#41A223` is reserved for links and inline emphasis. White surfaces are used for controls where contrast and familiarity matter. Muted ink and border colors are derived neutrals rather than arbitrary accents.

## Layout paradigm
Mobile-first, section-led storytelling with a max-width container, generous vertical rhythm, responsive grids, and compact proof cards. Desktop expands into split layouts; mobile stacks content while preserving the primary CTA order.

## Signature elements
- Green pill CTAs and outlined secondary actions.
- A hero with a framed, code-inspired progress panel rather than stock photography.
- Internship cards with category, duration, level, and outcome badges.
- Progress bars and milestone numbers for learning journey proof.
- Small uppercase eyebrows and oversized outcome statements.

## Interaction philosophy
Every interactive element should expose its state: active, expanded, focused, loading, success, or error. Menus use real buttons and links; dropdowns close on Escape; forms explain their state inline. No autoplay or layout-shifting animation.

## Animation
150–220ms transitions, small opacity/translate reveals, and subtle hover/focus emphasis. All non-essential motion is disabled under `prefers-reduced-motion`.

## Typography system
Outfit is loaded from Google Fonts with `font-display: swap`. Hero headlines use a tight, bold clamp range. Body copy stays compact and readable with 1.6 line-height. Eyebrows and metadata use tracked uppercase labels.

## Brand essence and voice
Internee.pk is practical, encouraging, and outcome-oriented. Copy should sound like a capable mentor: direct, positive, and specific about what learners gain.

## Wordmark / logo
A compact lime pathway mark paired with the Internee.pk wordmark. The mark uses two filled rounded rectangles and a rising connector to suggest progress from first task to career outcome. The same symbol is used in the header and favicon.

## Signature brand color
`#43A724`.

## Delivery decisions
This is a static React/Vite homepage MVP. Links to authenticated or backend-powered destinations remain integration targets. The newsletter uses a local service boundary with explicit demo feedback; no submission is claimed to be persisted without an endpoint.
