---
title: "DemoFactory"
description: "UI/UX project portfolio with high-fidelity interactive demos"
subtitle: "UI/UX project portfolio with high-fidelity interactive demos"
stack: "Astro 7.x, TypeScript, Tailwind CSS v4, MapLibre GL, Sharp"
github: "https://github.com/HC-ONLINE/DemoFactory"
site: "https://hc-online.github.io/DemoFactory/"
---

# DemoFactory

## Overview

DemoFactory is a **high-fidelity UI/UX demo hub** built with Astro, TypeScript, and Tailwind CSS v4. The project brings six independent web experiences together within a single application while keeping each demo isolated at the component and content level.

The architecture follows a **content-driven approach**, separating presentation content from visual implementations through bilingual Markdown files in Spanish and English.

The project combines editorial experiences, corporate interfaces, immersive storytelling, and a creative-coding weather application driven by real external data.

Beyond visual design, DemoFactory serves as an architectural exercise for organizing multiple independent frontend experiences within a single repository without turning them into a tightly coupled monolithic application.

## Context and Objective

DemoFactory was created to provide a common environment for building and presenting different UI/UX experiences without requiring a completely independent repository for every demo.

The technical objectives were to:

- Keep each demo visually and functionally isolated.
- Share a minimal common infrastructure.
- Separate content from presentation logic.
- Support Spanish and English through parallel routes and content.
- Build advanced interactive experiences without introducing an unnecessary backend.
- Deploy the complete project as a static website.

The result is a **frontend demo factory** where additional experiences can follow a common structural convention while remaining independent.

## Solution

The application is organized around a central project index and independent components for each demo.

The repository currently contains **six local demos**:

- **Aeterna** — scroll-driven narrative experience based on historical eras.
- **Aura Weather** — interactive weather application combining maps and creative coding.
- **Elite Vows** — editorial wedding landing page.
- **Lumina** — editorial portfolio with a bento-style gallery.
- **NF Archive** — visual discography experience.
- **Tech Nexus Consulting** — B2B technology consulting landing page.

The index can also link to additional experiences hosted outside the repository.

Each demo has its own main component, localized content, and route, while shared infrastructure remains intentionally small.

## Architecture

DemoFactory uses a **static, content-driven architecture**.

![DemoFactory architecture diagram](/images/projects/demofactory/architecture.png)

_Content-driven flow: Markdown → es/en routes → isolated demo components → shared layer → client scripts → SSG → GitHub Pages._

### Frontend

Astro is used as the primary framework with **Static Site Generation (SSG)**.

Most of the application is rendered during the build process, while interactive functionality runs in the browser through client-side scripts.

### Content

Demo content is kept outside the visual components using Markdown.

```text
src/content/demos/<demo>/es.md
src/content/demos/<demo>/en.md
```

This makes it possible to update copy and localized content without modifying the visual implementation.

### Demo Isolation

Each experience has its own component structure:

```text
src/components/
├── aeterna/
├── aura_weather/
├── elite-vows/
├── lumina/
├── nf-archive/
└── tech-nexus-consulting/
```

This approach limits coupling and allows each demo to evolve independently.

## Technology Stack

### Frontend

- **Astro 7.0.6** — primary framework and static site generation.
- **TypeScript** — application and client-side logic.
- **Tailwind CSS v4** — styling system.
- **MapLibre GL 5.24.0** — interactive mapping for `aura_weather`.
- **CSS / Canvas / SVG** — animations, particles, and visual effects.
- **Astro Assets / Sharp** — image processing and optimization.
- **Self-hosted fonts** — improved control over typography and external dependencies.

### External APIs

The weather demo integrates:

- **Open-Meteo** — weather data.
- **Nominatim** — geocoding.
- **OpenFreeMap** — map tiles.

The implemented integrations do not require API keys.

### Infrastructure

- **GitHub Pages** — static hosting.
- **GitHub Actions** — automated build and deployment.
- **pnpm** — package management.
- **Node.js 22** — build environment.

There is no custom backend or database.

## Main Features

### Bilingual Demo Hub

The main index provides:

- Project navigation.
- Spanish/English support.
- Responsive project grid.
- Persistent dark mode.
- Optimized responsive images.
- Links to external projects.

### Aeterna

A scroll-driven narrative experience covering different historical eras.

![aeterna](/images/projects/demofactory/aeterna.png)

Features include:

- 12 chronological sections.
- Point-based navigation.
- `IntersectionObserver` section detection.
- Live era indicator.
- Dedicated CSS animations.
- Decorative particle system.
- Dedicated typography.

### Aura Weather

The most technically complex demo in the project.

It combines an interactive map with real weather data and transforms different weather conditions into a visual creative-coding experience.

![aura_weather](/images/projects/demofactory/aura-weather.png)

Features include:

- Interactive MapLibre map.
- City search.
- Geolocation.
- Open-Meteo weather data.
- Temporary result caching.
- Debounced search.
- Keyboard support.
- Rain and snow particle systems.
- Physics and collision handling.
- Metaball transitions.
- Interpolated gradients.
- Six weather states.
- Demonstration mode.
- Internationalized UI.

The visual system relies on Canvas 2D and SVG filters rather than introducing a WebGL framework.

### Elite Vows

An editorial wedding landing page featuring:

![elite-vows](/images/projects/demofactory/elite-vows.png)

- Parallax hero.
- Ceremony timeline.
- Mobile navigation.
- Smooth anchor scrolling.
- Reveal animations.
- Simulated RSVP form.

### Lumina

An editorial portfolio focused on visual composition.

![lumina](/images/projects/demofactory/lumina.png)

It includes:

- Bento-style gallery.
- Reveal animations.
- Responsive layouts.
- Typography-focused presentation.

### NF Archive

A visual discography experience featuring:

![nf-archive](/images/projects/demofactory/nf-archive.png)

- Structured album data.
- Track information.
- Statistics.
- External links.
- Music-oriented visual identity.

### Tech Nexus Consulting

A B2B technology consulting landing page featuring:

![tech-nexus-consulting](/images/projects/demofactory/tech-nexus-consulting.png)

- Business metrics.
- Native HTML FAQ.
- Anchor navigation.
- Smooth scrolling.
- Simulated audit form.
- Responsive design.

## Key Technical Decisions

### Content and Presentation Separation

Markdown is used for demo content while Astro components handle presentation.

This allows copy and translations to evolve without directly modifying the UI implementation.

**Trade-off:** individual demos maintain some duplicated data structures and conventions.

### One Demo = One Isolated Unit

Each experience owns its main component and interactive logic.

This makes it possible to experiment with different visual architectures without creating unnecessary dependencies between demos.

**Trade-off:** certain UI patterns, such as mobile navigation and reveal animations, are duplicated across experiences.

### Static Site Generation

The project does not require authentication, a database, or a custom server because its primary purpose is frontend presentation and experimentation.

SSG provides:

- Free hosting.
- A reduced attack surface.
- Pre-rendered HTML.
- Simple deployments.
- No server-side secrets.

The trade-off is that dynamic functionality must run in the browser.

### Public APIs Without API Keys

The weather application uses free services that do not require API keys in the implemented architecture.

Caching and debouncing are used to reduce unnecessary requests.

The main limitation is dependency on third-party availability and usage policies.

### Dynamic Module Loading

The weather application dynamically loads specialized modules for functionality such as:

- mapping,
- particles,
- metaballs,
- gradients,
- weather handling.

This provides a degree of code splitting for the interactive experience.

### Resource Optimization

Images are processed through Astro's asset pipeline and served in optimized formats.

Primary fonts are self-hosted, while dynamic imports are used for selected interactive modules.

## Security

DemoFactory does not manage user accounts, sessions, or sensitive information.

Because it is primarily a static application:

- There are no backend credentials.
- There is no database.
- There is no user-data persistence.
- There is no authentication layer.
- External links use `noopener noreferrer`.

One security improvement identified during the project review concerns `aura_weather`: some geocoding results are inserted into the DOM using `innerHTML`. Even though the data comes from an external service, this should be replaced with safe DOM manipulation and `textContent`.

A Content Security Policy would also be a reasonable future improvement for a more security-focused deployment.

## Testing and Quality

The project currently prioritizes frontend experimentation, visual implementation, and interaction design.

There is no automated test suite or independent lint/type-check pipeline configured in the repository.

The CI/CD pipeline primarily performs:

```text
pnpm install --frozen-lockfile
        ↓
pnpm run build
        ↓
GitHub Pages
```

Therefore, the project should not be presented as a fully tested production application.

Automated testing and stronger CI validation would be appropriate if the project were later transformed into a production-grade platform.

## UX and Accessibility

The demos implement several modern interaction patterns:

- Responsive layouts.
- Mobile navigation.
- Smooth scrolling.
- Reveal animations.
- Parallax.
- Loading states.
- Visual feedback.
- Section navigation.
- Keyboard interaction.
- `aria-label`.
- `aria-expanded`.
- `aria-live`.

Accessibility is not completely uniform across every demo. Some shared accessibility labels remain fixed in Spanish, leaving room for a more centralized internationalization strategy.

## CI/CD

Deployment is automated through GitHub Actions.

```text
Push to main
    ↓
GitHub Actions
    ↓
Node.js 22
    ↓
pnpm install
    ↓
Astro build
    ↓
GitHub Pages
```

This allows repository changes to be automatically converted into a new static deployment.

## Verifiable Metrics

The repository review identified:

- **6 local demos**.
- **10 projects displayed in the main index**, including local and external projects.
- **15 generated HTML pages**: index + six demos × two languages.
- **35 commits** during the analyzed development period.
- Development concentrated in July 2026.
- `aura_weather/App.astro` at approximately 900 lines.
- `aeterna` stylesheet at approximately 1,288 lines.
- No automated test suite.
- No independent lint/type-check scripts.

Performance metrics such as FPS, Lighthouse scores, bundle size, and coverage are intentionally not presented because they were not formally measured in the repository.

## Current Limitations

DemoFactory is a frontend demonstration project rather than a production platform.

Current limitations include:

- No backend.
- Simulated forms.
- No persistent user data.
- No automated test suite.
- Inconsistent accessibility coverage between demos.
- Some duplicated UI patterns.
- Dependency on external weather and mapping services.
- No integrated observability or analytics.
- Some internal documentation no longer fully reflects the final implementation.
- Incomplete visible error handling for external APIs.

These limitations are consistent with the project's main purpose: **demonstrating frontend engineering, interaction design, creative coding, and static architecture**.

## Future Improvements

The most relevant technical improvements would be:

1. Add unit tests for `aura_weather` logic.
2. Add E2E tests for critical interactions.
3. Integrate linting and type checking into CI.
4. Centralize content schemas.
5. Extract reusable UI patterns shared between demos.
6. Improve visible API error handling.
7. Replace unsafe `innerHTML` usage.
8. Centralize accessibility internationalization.
9. Update internal documentation to match the actual structure.
10. Add formal performance measurements before publishing performance claims.

## What This Project Demonstrates

DemoFactory demonstrates the ability to:

- Build independent frontend experiences.
- Work with **Astro and static generation**.
- Use **TypeScript** for frontend applications.
- Build styling systems with **Tailwind CSS v4**.
- Design **content-driven architectures**.
- Implement route-based internationalization.
- Integrate external APIs.
- Build interactive maps with MapLibre.
- Implement creative coding with Canvas and SVG.
- Develop particle systems and complex animations.
- Optimize frontend assets.
- Build responsive interfaces.
- Implement CI/CD with GitHub Actions.
- Keep experimentation isolated from shared infrastructure.

More importantly, the project demonstrates the ability to **turn different visual concepts into functional web experiences while maintaining a consistent technical foundation**.

## Short Description

**DemoFactory** is a bilingual hub of six high-fidelity UI/UX demos built with Astro, TypeScript, and Tailwind CSS v4. It combines editorial experiences, corporate interfaces, and an interactive weather application using MapLibre, Canvas, particles, metaballs, and external APIs.

## Technologies

`Astro` · `TypeScript` · `Tailwind CSS v4` · `MapLibre GL` · `Canvas 2D` · `SVG` · `Open-Meteo` · `Nominatim` · `OpenFreeMap` · `GitHub Actions` · `GitHub Pages` · `pnpm`

## Status

**Demo / Portfolio Project**

A frontend project created to explore and demonstrate UI/UX design, frontend interaction, creative coding, and static web architecture.

It should not be presented as a SaaS product or production platform.
