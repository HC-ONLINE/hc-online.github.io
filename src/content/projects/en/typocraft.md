---
title: "TypoCraft"
description: "Interactive Markdown editor with real-time preview that transforms the same content through three distinct typographic systems"
subtitle: "Same content, three completely different reading experiences"
stack: "Astro 7.x, React 19, TypeScript 5.7, Tailwind CSS 4.x, Marked"
github: "https://github.com/HC-ONLINE/TypoCraft"
site: "https://hc-online.github.io/TypoCraft/"
---

## Overview

TypoCraft is an interactive Markdown editor with real-time preview that transforms the same content through three distinct typographic systems: **Manuscript, Modernist, and Deep Night**.

Each theme combines different typography, colors, spacing, composition, and decorative elements to demonstrate how typographic decisions can radically change the perception of identical content.

Built with **Astro, React, TypeScript, and Tailwind CSS**, the application runs entirely in the browser and is deployed as a static site on GitHub Pages.

## Context / Problem

### Technical Objective

Build a browser-based Markdown editor capable of rendering content in real time through multiple visual and typographic systems.

### Design Objective

Explore the relationship between **writing and visual design**, demonstrating how the presentation layer can significantly change the reading experience without changing the underlying content.

TypoCraft does not address a specific business problem or attempt to operate as a CMS or SaaS platform. It is primarily a **frontend design and technical exploration**.

## Solution

TypoCraft uses a split-pane interface:

- **Editor:** Markdown textarea with line numbers and content statistics.
- **Preview:** Live HTML rendering of the current Markdown content.

Users can switch between three themes without losing their content.

### Manuscript

A classical editorial system featuring serif typography, parchment-like backgrounds, drop caps, and decorative elements.

### Modernist

A clean contemporary editorial layout based on a floating A4 page, sans-serif typography, and minimal visual hierarchy.

### Deep Night

A dark interface inspired by developer environments, featuring a browser-window mockup and a code-editor aesthetic.

### Data flow

```text
User Markdown
     ↓
React State
     ↓
marked
     ↓
Generated HTML
     ↓
Selected Theme
     ↓
Typographic Preview
```

All processing occurs locally in the browser.

## Architecture

TypoCraft follows a lightweight client-side architecture:

![TypoCraft architecture diagram](/images/projects/typocraft/architecture.png)

_Architecture diagram: GitHub Pages, Astro build, React island, components, marked, CSS themes, and browser output._

There is no backend, API, database, authentication layer, or remote storage.

Astro provides the static application shell while React handles the interactive experience through client-side hydration.

## Technology Stack

### Frontend

| Technology       | Purpose                            |
| ---------------- | ---------------------------------- |
| Astro 7.x        | Static shell, routing, and build   |
| React 19         | Interactivity and state management |
| TypeScript 5.7   | Static typing                      |
| Tailwind CSS 4.x | Styling and responsive design      |

### Markdown Processing

| Technology  | Purpose                  |
| ----------- | ------------------------ |
| marked 18.x | Markdown-to-HTML parsing |

### Typography

- Epilogue
- Inter
- JetBrains Mono
- Crimson Pro
- Material Symbols

### Build & Deployment

- pnpm
- GitHub Actions
- GitHub Pages
- Vite

The deployment pipeline automatically builds and deploys the application when changes are pushed to `main`.

## Implemented Features

- Real-time Markdown editor and preview.
- Three visual systems: Manuscript, Modernist, and Deep Night.
- Theme switching without content loss.
- Dynamic line numbers.
- Character counter.
- Line counter.
- Responsive layout.
- Theme-specific custom scrollbars.
- Theme-specific Markdown rendering.
- Drop caps and decorative elements in Manuscript.
- Floating A4 composition in Modernist.
- Browser-window mockup in Deep Night.
- "Live Render" status indicator.
- Responsive theme navigation.
- Automated GitHub Actions deployment.

## Key Technical Decisions

### Astro + React

Astro provides the static shell while React is used for the interactive application.

**Advantage:** static delivery with JavaScript limited to the interactive portion.

**Trade-off:** the application concentrates most of its interaction inside a single React island, so Astro's island architecture is not fully leveraged.

### `marked`

Used to convert Markdown into HTML in real time.

**Advantage:** lightweight and straightforward API.

**Trade-off:** no built-in syntax highlighting and requires sanitization if content is eventually stored or shared.

### CSS-based theming

Themes are applied using CSS classes and variables.

**Advantage:** allows substantial visual changes without modifying the Markdown content or core rendering logic.

**Trade-off:** adding a new theme currently requires manual changes across CSS and multiple components.

### No persistence

Content only exists in application state.

**Advantage:** keeps the demo simple.

**Trade-off:** content is lost when the page is refreshed.

## Security

The application has no backend and does not transmit user-entered content.

The attack surface is therefore limited.

### Important consideration

The preview uses `dangerouslySetInnerHTML` to render the HTML generated by `marked`.

This is acceptable for the current local-only implementation. If content sharing or persistence were introduced, HTML sanitization would become necessary.

## Testing & Quality

Currently:

- No unit tests.
- No integration tests.
- No E2E tests.
- No code coverage.
- No automated linting.
- CI does not run a separate type-checking or linting step.

The Astro build currently acts as the primary automated quality gate.

## User Experience

### Structure

TypoCraft uses a full-viewport interface composed of:

- Markdown editor.
- Live preview.
- Fixed navigation bar.
- Theme selector.

### Responsive

**Desktop:** editor and preview appear side by side.

**Mobile:** both panels switch to a vertically stacked layout.

The navigation also adapts the theme selector to use circular controls on smaller screens.

### Interaction

Each modification to the Markdown immediately updates the preview.

Theme changes happen instantly while preserving the current content.

## Visuals

<!-- IMAGE 01 — Modernist -->

![Editor and preview with Modernist theme](/images/projects/typocraft/modernist.png)

_Full view with the Modernist theme: Markdown editor on the left, floating A4 page preview on the right._

<!-- IMAGE 02 — Manuscript -->

![Manuscript theme with drop caps and ornamentation](/images/projects/typocraft/manuscript.png)

_Manuscript theme view showing serif typography, parchment-like background, decorative drop cap, and ornamental elements._

<!-- IMAGE 03 — Deep Night -->

![Deep Night theme with browser chrome mockup](/images/projects/typocraft/deepnight.png)

_Deep Night theme with code-editor aesthetic, simulated browser window, and dark color palette._

## Metrics

No verified performance, Lighthouse, bundle-size, coverage, or benchmark metrics were found in the repository.

Observable project data:

- 4 React components.
- 1 Astro layout.
- 1 main page.
- 3 visual systems.
- ~560 lines of TSX.
- ~187 lines of CSS.
- Static deployment through GitHub Pages.

## Current Status

### Classification: Demo / Proof of Concept

The classification is supported by:

- Version `0.1.0`.
- No persistence.
- No backend.
- No automated tests.
- Unused dependencies.
- No export functionality.
- No collaboration features.
- Demo-oriented GitHub Pages deployment.

The project is best presented as a **frontend, typography, and interaction showcase**, rather than a production-ready Markdown editor.

## Limitations

- Content is lost on refresh.
- No Markdown/HTML/PDF export.
- No syntax highlighting.
- No collaboration.
- No automated tests.
- No CI linting.
- Unused dependencies remain.
- New themes require manual implementation.
- HTML output is not sanitized.
- Some theme configuration is duplicated between React and CSS.
- No local or remote persistence.

## Future Evolution

Potential improvements include:

- Local persistence using `localStorage` or IndexedDB.
- Markdown, HTML, and PDF export.
- Syntax highlighting with Shiki.
- Resizable editor/preview panes.
- In-editor search.
- Configuration-driven theme system.
- Visual theme builder.
- Component testing with Vitest and React Testing Library.
- HTML sanitization.
- Dependency cleanup.
- Automated dependency vulnerability scanning.

No formal roadmap is currently documented in the repository.

## What This Project Demonstrates

TypoCraft demonstrates:

- **Astro + React frontend architecture.**
- **React state management.**
- **Astro Islands integration.**
- **Responsive interface design.**
- **CSS-based visual systems.**
- **Advanced theming with CSS variables and classes.**
- **Real-time Markdown processing.**
- **Typography and editorial composition.**
- **Reusable component architecture.**
- **Automated build and deployment with GitHub Actions.**
- **Static deployment through GitHub Pages.**
