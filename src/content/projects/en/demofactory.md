---
title: "DemoFactory"
description: "Bilingual hub of six independent UI/UX frontend demos built with Astro, TypeScript, and Tailwind CSS v4."
subtitle: "Content-driven frontend architecture and interactive web experiences"
stack: "Astro 7.x, TypeScript, Tailwind CSS v4, MapLibre GL, Sharp"
github: "https://github.com/HC-ONLINE/DemoFactory"
site: "https://hc-online.github.io/DemoFactory/"
---

## 1. Summary

DemoFactory is a bilingual hub of UI/UX experiences built with Astro, TypeScript, and Tailwind CSS v4. It brings six independent frontend demos together within a single project while keeping each experience isolated at the component, content, and interaction levels.

The project follows a content-driven architecture that separates localized content from visual implementation through Markdown files in Spanish and English.

Beyond serving as a portfolio of interfaces, DemoFactory explores how multiple heterogeneous frontend experiences can be organized within a single repository without turning them into a monolithic application.

## 2. Context / Problem

A portfolio containing multiple visual experiences can easily end up depending on separate repositories or a single application with excessive shared dependencies.

DemoFactory addresses this through an architecture that allows it to:

- Keep each demo as an independent unit.
- Share only the infrastructure that is actually required.
- Separate content from presentation.
- Maintain Spanish and English versions.
- Integrate interactive experiences without requiring a backend.
- Deploy the entire project as a static website.

The goal is not to build an enterprise platform, but to demonstrate different frontend approaches within a common technical foundation.

## 3. Solution

The application is organized around a central project index and independent components for each experience.

### Content System

Localized content is kept separate from visual implementation:

```text
src/content/demos/
├── <demo>/
│   ├── es.md
│   └── en.md
```

This makes it possible to update copy, metadata, and translations without directly modifying presentation components.

### Demo Isolation

Each experience maintains its own components and logic:

```text
src/components/
├── aeterna/
├── aura_weather/
├── elite-vows/
├── lumina/
├── nf-archive/
└── tech-nexus-consulting/
```

### Included Demos

- **Aeterna** — Scroll-driven narrative experience based on historical eras.
- **Aura Weather** — Interactive weather application combining maps and creative coding.
- **Elite Vows** — Editorial wedding landing page.
- **Lumina** — Editorial portfolio with a bento-style gallery.
- **NF Archive** — Visual discography experience.
- **Tech Nexus Consulting** — B2B technology consulting landing page.

## 4. Architecture

DemoFactory uses a static, content-driven architecture:

![DemoFactory architecture diagram](/images/projects/demofactory/architecture.png)

*General flow between Markdown content, bilingual routes, isolated components, client-side scripts, static generation, and GitHub Pages.*

### Static Generation

Astro generates the pages during the build process. Most of the interface is delivered as generated HTML, while experiences requiring interaction execute JavaScript in the browser.

### Content

Text and metadata are kept outside the components through localized Markdown files.

### Components

Each demo has an independent structure and can use different implementation techniques without introducing unnecessary dependencies between experiences.

### Interactivity

Dynamic functionality runs primarily on the client. Aura Weather, for example, integrates MapLibre, weather APIs, geolocation, and multiple visualization modules.

## 5. Technology Stack

### Frontend

| Technology           | Purpose                                   |
| -------------------- | ----------------------------------------- |
| Astro 7.x            | Primary framework and static generation   |
| TypeScript           | Application logic and client-side scripts |
| Tailwind CSS v4      | Styling system                            |
| MapLibre GL          | Interactive map for Aura Weather          |
| CSS / Canvas / SVG   | Animations and visual effects             |
| Astro Assets / Sharp | Image processing and optimization         |

### External APIs

| Service     | Purpose      |
| ----------- | ------------ |
| Open-Meteo  | Weather data |
| Nominatim   | Geocoding    |
| OpenFreeMap | Map tiles    |

### Infrastructure

| Technology     | Purpose               |
| -------------- | --------------------- |
| GitHub Pages   | Static hosting        |
| GitHub Actions | Build and deployment  |
| pnpm           | Dependency management |
| Node.js 22     | Build environment     |

## 6. Implemented Features

### Main Hub

- Project navigation.
- Spanish/English support.
- Responsive project grid.
- Persistent dark mode.
- Optimized responsive images.
- External project links.

### Aeterna

- 12 chronological sections.
- Point-based navigation.
- Section detection using `IntersectionObserver`.
- Active era indicator.
- Dedicated CSS animations.
- Particle system.
- Experience-specific typography.

### Aura Weather

- Interactive MapLibre map.
- City search.
- Geolocation.
- Weather data through Open-Meteo.
- Temporary caching.
- Debounced search.
- Keyboard support.
- Rain and snow particle systems.
- Physics and collision handling.
- Metaball transitions.
- Interpolated gradients.
- Six weather states.
- Demonstration mode.
- Internationalized interface.

### Elite Vows

- Parallax hero.
- Ceremony timeline.
- Mobile navigation.
- Anchor scrolling.
- Reveal animations.
- Simulated RSVP form.

### Lumina

- Bento-style gallery.
- Reveal animations.
- Responsive layouts.
- Typography-focused presentation.

### NF Archive

- Structured album data.
- Track information.
- Statistics.
- External links.
- Music-oriented visual identity.

### Tech Nexus Consulting

- Business metrics.
- Native HTML FAQ.
- Anchor navigation.
- Smooth scrolling.
- Simulated audit form.
- Responsive design.

## 7. Technical Decisions

### Content and Presentation Separation

Markdown contains localized content while Astro components control presentation.

**Advantage:** allows copy and translations to evolve without directly modifying the visual implementation.

**Trade-off:** some demos maintain their own data structures and conventions.

### One Demo = One Isolated Unit

Each experience maintains its own visual and interactive logic.

**Advantage:** allows different approaches to be explored without creating strong dependencies between demos.

**Trade-off:** some interface patterns may be duplicated.

### Static Site Generation

SSG is used because the project does not require authentication, a database, or a custom server.

**Advantage:** simple deployment, pre-generated HTML, and reduced infrastructure requirements.

**Trade-off:** dynamic functionality must run in the browser.

### Public APIs

Aura Weather uses public services that do not require API keys.

**Advantage:** no deployment secrets are required.

**Trade-off:** the application depends on third-party availability, limits, and usage policies.

### Dynamic Module Loading

Aura Weather dynamically loads specialized modules for selected interactive features.

**Advantage:** separates functionality and reduces the initial loading of features that are not always required.

**Trade-off:** requires careful module and dependency organization.

## 8. Security, UX and Accessibility

### Security

DemoFactory is a static application and does not manage accounts, sessions, or sensitive information.

- No custom backend.
- No database.
- No user-data persistence.
- No authentication.
- External links use `noopener noreferrer`.

A security improvement was identified in `aura_weather`, where some geocoding data is inserted using `innerHTML`. This should be replaced with safe DOM manipulation using `textContent` and explicit node creation.

A Content Security Policy would also be a reasonable improvement for a more demanding deployment.

### UX and Accessibility

The demos implement several interaction patterns:

- Responsive layouts.
- Mobile navigation.
- Smooth scrolling.
- Reveal animations.
- Parallax.
- Loading states.
- Visual feedback.
- Keyboard navigation.
- `aria-label`.
- `aria-expanded`.
- `aria-live`.

Accessibility coverage is not fully consistent across all experiences and remains an area for consolidation.

## 9. Testing and Quality

The project currently prioritizes frontend experimentation, visual implementation, and interaction design.

Current state:

- No automated test suite.
- No independent linting pipeline.
- No independent type-checking pipeline.
- CI/CD primarily focuses on build and deployment.

Current flow:

```text
pnpm install --frozen-lockfile
        ↓
pnpm run build
        ↓
GitHub Pages
```

DemoFactory is therefore not presented as a production application with complete automated test coverage.

## 10. Visual Evidence

### Aeterna

![Aeterna demo](/images/projects/demofactory/aeterna.png)

*Scroll-driven narrative experience with 12 chronological sections.*

### Aura Weather

![Aura Weather demo](/images/projects/demofactory/aura-weather.png)

*Interactive weather application with MapLibre, creative coding, and external weather data.*

### Elite Vows

![Elite Vows demo](/images/projects/demofactory/elite-vows.png)

*Editorial wedding landing page with parallax hero and ceremony timeline.*

### Lumina

![Lumina demo](/images/projects/demofactory/lumina.png)

*Photography portfolio with a bento-style gallery composition.*

### NF Archive

![NF Archive demo](/images/projects/demofactory/nf-archive.png)

*Visual experience based on discography and music-related content.*

### Tech Nexus Consulting

![Tech Nexus Consulting demo](/images/projects/demofactory/tech-nexus-consulting.png)

*B2B technology consulting landing page with metrics, services, and FAQ.*

## 11. Current Status, Limitations and Evolution

**Classification:** Demo / Portfolio Project

DemoFactory is a functional frontend project focused on demonstrating UI/UX design, interaction, creative coding, and static web architecture.

### Observable State

- 6 local demos.
- 10 projects displayed in the main index.
- 15 generated HTML pages.
- No automated test suite.

These metrics describe project size and activity, not quality.

### Limitations

- No backend.
- Simulated forms.
- No persistent data.
- No automated tests.
- Uneven accessibility coverage.
- Some duplicated UI patterns.
- Dependency on external APIs and services.
- No integrated observability or analytics.
- External API error handling can be improved.
- Some internal documentation needs synchronization with the implementation.

### Future Evolution

1. Add unit tests for Aura Weather logic.
2. Add E2E tests for critical interactions.
3. Integrate linting and type checking into CI.
4. Centralize content schemas.
5. Extract genuinely shared UI patterns.
6. Improve visible API error handling.
7. Remove unsafe `innerHTML` usage.
8. Centralize accessibility internationalization.
9. Update internal documentation.
10. Add formal performance measurements before publishing performance claims.

## 12. What This Project Demonstrates

DemoFactory demonstrates experience with:

- Frontend architecture with Astro.
- Static Site Generation.
- TypeScript.
- Tailwind CSS v4.
- Content-driven architectures.
- Route-based internationalization.
- External API integration.
- Interactive maps with MapLibre.
- Canvas and SVG.
- Particle systems.
- Complex animations and transitions.
- Responsive design.
- Asset optimization.
- CI/CD with GitHub Actions.
- Isolation of frontend experiences.

The project's main technical value is demonstrating the ability to turn very different visual concepts into functional experiences while maintaining a deliberately small shared infrastructure.

### Short Description

Bilingual hub of six UI/UX demos built with Astro, TypeScript, and Tailwind CSS v4, combining editorial experiences, B2B interfaces, and an interactive weather application using MapLibre and creative coding.

### Professional Description

DemoFactory is a frontend portfolio project that brings six independent UI/UX experiences together within a static, content-driven architecture. Built with Astro, TypeScript, and Tailwind CSS v4, it incorporates route-based internationalization, external API integration, interactive maps, and creative coding techniques including particle systems, Canvas, SVG, and metaball transitions. The project explores how heterogeneous frontend experiences can remain isolated within a single repository without introducing unnecessarily complex shared infrastructure.
