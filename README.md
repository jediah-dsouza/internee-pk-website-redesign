# Internee.pk React Redesign

A dark-first React/Vite homepage redesign for Internee.pk

## Features
- Responsive semantic homepage for students, job seekers, and instructors.
- Desktop and mobile navigation with a keyboard-operable Resources dropdown and Escape handling.
- Data-driven internship discovery across six tracks with asynchronous loading, empty, error, retry, and success states.
- Accessible testimonial carousel with Previous/Next controls, keyboard arrows, indicators, looping behavior, and reduced-motion-safe CSS transitions.
- Proof, progress, Task Portal, instructor, career tools, how-it-works, and testimonial sections.
- Accessible newsletter validation with idle, loading, success, and error feedback.
- SEO metadata, canonical URL, Open Graph/Twitter tags, Organization JSON-LD, favicon, and route manifest.
- Mobile-first layout from 320px to large desktop with reduced-motion support.

## Run locally
```bash
pnpm install
pnpm dev
```

The dev server listens on `http://localhost:3000` and the Webdev Preview uses the same port.

## Build and test
```bash
pnpm build
pnpm test
pnpm test:watch
```

Testing uses **Vitest**, **React Testing Library**, **@testing-library/user-event**, and **jest-dom**. The suite covers navigation, internship loading states, the carousel controls and keyboard behavior, newsletter validation/submission, and homepage smoke rendering.

## Architecture
```text
src/
├── App.jsx                    # Page composition, header, newsletter, and section shell
├── components/
│   ├── Carousel.jsx           # Accessible controlled-by-state testimonial carousel
│   └── InternshipExplorer.jsx # Async loading UI with success/empty/error/retry states
├── data/content.js            # Navigation and repeated homepage content
├── services/
│   ├── internshipService.js   # Local async data source; replaceable with a real API
│   └── newsletter.js           # Newsletter integration boundary
├── test/setup.js              # Vitest + jest-dom setup
├── App.test.jsx               # User-behavior component tests
├── main.jsx                   # React/Vite entry
└── styles.css                 # Design tokens, responsive layout, component states
public/
├── logo.svg
└── manus-routes.json
```

### Carousel behavior
The testimonial carousel lives in `src/components/Carousel.jsx`. It keeps the active slide in React state, loops from the first/last slide, provides named Previous/Next buttons and keyboard-accessible dots, supports ArrowLeft/ArrowRight when the carousel viewport is focused, and uses a transform transition that is neutralized by the global reduced-motion media query. Slides remain in the DOM with `aria-hidden` on inactive content and no autoplay is used.

### Dynamic loading behavior
`src/services/internshipService.js` exposes `loadInternships()`, currently backed by a short local asynchronous delay. `InternshipExplorer` owns the loading state and maps the result to a populated grid, an empty message, an error alert with retry, or intentional skeletons. The service is deliberately isolated so a future API can replace the local source without changing the UI contract. It does not claim to be a production backend.

## Decisions and limitations
- The source materials do not include a newsletter API contract. The form therefore simulates a short request through `src/services/newsletter.js`; it does not claim to persist a subscription. Replace that function with the real endpoint when available.
- Authenticated pages and job listings remain integration-target links using the supplied destination intent. The MVP focuses on the public homepage.
- The hero dashboard visual is a lightweight CSS illustration to avoid shipping oversized stock media and to preserve the design system's flat, minimal depth.
- Canonical and social URLs use the intended production origin from the supplied source; update them if the deployment domain changes.
