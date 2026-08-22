---
title: "PixelPress"
description: "Full-stack web application for video game content publishing, built with Astro 7 and deployed using SSR on Cloudflare Workers."
subtitle: "Bilingual video game blog with SSR, admin panel, and edge computing"
stack: "Astro 7, TypeScript, React 19, Tailwind CSS 4, MDX, Zod, Cloudflare Workers, Cloudflare R2, Giscus, Web Crypto API"
site: "https://pixelpress.henriquezandres856.workers.dev/"
---

## Overview

**PixelPress** is a bilingual video game blog built with **Astro 7**, **TypeScript**, **Tailwind CSS v4**, and **MDX**, deployed using **SSR on Cloudflare Workers**.

The project includes a JWT-protected administration panel, rich-text editor, REST API, Cloudflare R2 image storage, Giscus comments, and an advertising system prepared for Google AdSense.

Content is stored as MDX files and validated using Zod schemas, while the application runs at the Cloudflare edge.

The project demonstrates the implementation of a full-stack web application combining frontend rendering, APIs, authentication, external storage, internationalization, and edge deployment.

## Context / Problem

**Technical objective:**

Build a specialized video game publishing platform capable of:

- SSR through edge computing.
- Spanish/English content.
- Browser-based administration.
- Rich-text content editing.
- External image storage.
- Third-party comments.
- Advertising integration.
- Version-controlled editorial content.

The repository does **not document a specific business problem or validated market metrics**. Therefore, PixelPress should primarily be presented as a technical and product-oriented editorial project rather than a validated SaaS product.

## Solution

PixelPress combines an SSR frontend, REST API layer, administrative interface, and external services.

### Main components

#### Frontend SSR

Astro generates blog pages on the server using Cloudflare Workers as runtime.

#### Content system

Articles are stored as MDX files separated by language and use Zod schemas for structure validation.

#### Administration panel

Includes authentication, dashboard, and rich-text editor for creating and modifying articles.

#### REST API

Provides endpoints for authentication, article management, and image uploads.

#### Storage

Images are stored in Cloudflare R2 via Workers bindings.

#### Internationalization

Content is available in Spanish and English through differentiated routes.

#### Integrations

- Giscus for comments.
- Google AdSense for advertising.
- Cloudflare R2 for images.

### Main flow

1. A visitor requests a page.
2. Cloudflare Workers executes Astro SSR.
3. Astro retrieves the corresponding MDX content.
4. Content is validated using the Zod-defined schema.
5. Astro generates the HTML and delivers it to the browser.
6. Giscus and AdSense load as external integrations.

For administration:

1. The administrator accesses `/admin`.
2. Authenticates via password.
3. The server generates a JWT.
4. The token is stored in a secure cookie.
5. Middleware protects administrative routes.
6. The editor allows generating structured content.
7. Images can be uploaded to Cloudflare R2.
8. Currently, the generated MDX must be downloaded and manually incorporated into the repository.

**This last step is an important architectural limitation.**

## Architecture

![PixelPress architecture diagram](/images/projects/pixelpress/architecture.png)

### Main relationships

- Astro SSR generates and serves pages.
- Middleware protects administrative routes.
- API routes handle authentication, posts, and uploads.
- Cloudflare R2 stores images.
- MDX keeps content versioned.
- Giscus provides comments through GitHub Discussions.
- AdSense provides the monetization mechanism.

## Technology Stack

| Technology         | Purpose                |
| ------------------ | ---------------------- |
| Astro 7            | Main framework and SSR |
| Cloudflare Workers | Edge runtime           |
| TypeScript         | Static typing          |
| React 19           | Admin editor           |
| Tailwind CSS 4     | Styling                |
| MDX                | Editorial content      |
| Zod                | Schema validation      |
| Cloudflare R2      | Image storage          |
| Web Crypto API     | JWT implementation     |
| Giscus             | Comments               |
| Google AdSense     | Advertising            |
| Wrangler           | Cloudflare tooling     |
| pnpm               | Package management     |

## Implemented Features

- Bilingual Spanish/English blog.
- Astro SSR.
- Cloudflare Workers deployment.
- MDX articles.
- Zod content validation.
- Server-side pagination.
- Categories.
- Featured posts.
- Draft support.
- Related posts.
- Automatic table of contents.
- Social sharing.
- Dark/light mode.
- View Transitions.
- Custom 404 and 500 pages.
- JWT authentication.
- Secure cookies.
- Protected admin routes.
- Admin dashboard.
- Rich-text editor.
- Cloudflare R2 image uploads.
- YouTube embeds.
- Advertisement markers.
- REST API.
- Giscus comments.
- Advertising system.
- Self-hosted fonts.
- Basic SEO.
- CLI tooling.

## Partial / Experimental Features

### Search

`SearchBar` exists along with the Fuse.js dependency, but search is not yet connected to a functional implementation.

### Newsletter

The UI exists, but there is no email provider integration.

### Editor

The editor works via `contentEditable` and generates downloadable MDX, but **there is no real server-side publishing**.

### Article deletion**

The DELETE endpoint exists, but it does not actually remove MDX files from the repository.

### Mobile navigation

The hamburger button exists, but the mobile menu is not fully implemented.

### Tiptap

Tiptap dependencies are installed but are not used by the current editor.

## Relevant Technical Decisions

### Astro SSR + Cloudflare Workers

SSR is used on edge rather than a fully static site.

**Advantage:** allows executing middleware and API routes alongside the frontend.

**Trade-off:** introduces dependency on the Cloudflare runtime and more complexity than a conventional static site.

### JWT via Web Crypto API

Authentication uses `crypto.subtle` to implement HS256 without relying on an external library.

**Advantage:** uses native APIs compatible with Workers.

**Trade-off:** maintaining manual cryptography increases the project's responsibility compared to using a specialized and widely-audited library.

### MDX as content storage

Articles remain versioned within the repository.

**Advantage:** Git history, reproducible structure, and schema validation.

**Trade-off:** content cannot be fully published from the administration panel.

### Tailwind CSS v4 CSS-first

Tailwind configuration is done directly through CSS.

**Advantage:** reduces JavaScript-specific Tailwind configuration.

**Trade-off:** requires familiarity with the new configuration model.

### i18n via duplicated routes

Structures `/` and `/en/` are maintained.

**Advantage:** explicit control over content for each language.

**Trade-off:** introduces duplication and increases maintenance cost.

## Security

### Implemented

- JWT signed via HMAC-SHA256.
- Token expiration.
- HttpOnly cookies.
- Secure cookies.
- SameSite=Strict.
- Middleware to protect `/admin`.
- API route protection.
- MDX content validation via Zod.

### Identified Limitations

- No login rate limiting.
- No explicit CSRF protection.
- Direct password comparison.
- Insufficient upload size/type validation.
- No refresh tokens.
- Possible exposure of internal error details.
- Manual JWT management.

### Priority Improvements

1. Login rate limiting.
2. Timing-safe credential comparison.
3. Strict upload validation.
4. Removal of internal error details.
5. Automated tests for authentication and API.

## Testing and Quality

Currently:

- No unit tests.
- No integration tests.
- No E2E tests.
- No coverage.
- No CI/CD.
- No complete automated linting configuration.

TypeScript uses strict configuration, although the project configures `ignoreBuildErrors: true`.

**This should be considered technical debt**, because allowing the build to ignore TypeScript errors reduces the project's ability to detect issues before deployment.

## User Experience

The interface uses an aesthetic inspired by retro/pixel-art video games.

### Main views

- Homepage.
- Blog.
- Categories.
- Individual article.
- Admin login.
- Dashboard.
- Editor.
- 404/500 pages.

### Responsive

- Adaptive grid.
- Sidebar hidden on mobile.
- Adaptive admin layout.
- Responsive header.

However, the mobile menu is still incomplete.

## Metrics

No verified performance or usage metrics are sufficient to present as results.

Observable data:

- ~20 Astro/React components.
- ~15 routes considering both languages.
- 12 demo articles.
- 6 Spanish articles.
- 6 English articles.
- 16 production dependencies.
- 10 development dependencies.

I would not recommend converting these numbers into assumed quality indicators. They are simply project size metrics.

## Current Status

### Classification: Active Development

The project has a considerable functional foundation but still presents incomplete features:

- Fully automated publishing.
- Search.
- Newsletter.
- Mobile menu.
- Real post deletion.
- Tests.
- CI/CD.
- Authentication hardening.
- Complete integration of some installed dependencies.

Therefore, **it should not be presented as a finished product**.

## Main Limitations

- The editor does not publish directly to production.
- Search is not implemented.
- Newsletter without backend.
- No tests.
- No CI/CD.
- Login without rate limiting.
- Incomplete mobile menu.
- DELETE does not actually remove content.
- Unused dependencies.
- Route duplication by language.
- Sitemap pending.
- Footer with generic links.

## Future Evolution

I would prioritize improvements in this order:

1. **Complete the publishing flow.**
2. **Add tests for authentication and API.**
3. **Implement rate limiting.**
4. **Properly validate uploads.**
5. **Implement search with Fuse.js**, reusing the existing dependency.
6. **Complete mobile navigation.**
7. **Set up CI/CD.**
8. Implement newsletter.
9. Generate sitemap automatically.
10. Evaluate replacing `contentEditable` with Tiptap.

I would not introduce new technologies before resolving the incomplete capabilities that already exist.

## What This Project Demonstrates

- Full-stack development with Astro.
- SSR on edge computing.
- Cloudflare Workers.
- REST API design.
- JWT authentication.
- Secure cookies.
- Authorization middleware.
- Web Crypto API.
- Content management via MDX.
- Validation with Zod.
- Rich-text editor.
- React + Astro integration.
- Cloudflare R2.
- Internationalization.
- Tailwind CSS v4.
- Third-party service integration.
- Reusable component design.
- Content-oriented architecture.

## Classification

### Active Development

Project with a considerable functional foundation but with multiple incomplete capabilities. It should not be presented as a finished product or as a fully operational CMS.

## Visuals

<!-- IMAGE 01 — Homepage -->

![Homepage with featured article and article grid](/images/projects/pixelpress/homepage.png)

_Main visit with the featured article (GTA VI) and the grid of latest articles organized by category._

<!-- IMAGE 02 — Blog -->

![Blog listing with search bar](/images/projects/pixelpress/blog.png)

_Full blog listing page with search bar, article grid, and pagination._

<!-- IMAGE 03 — Article -->

![Individual article with TOC, ads, and comments](/images/projects/pixelpress/article.png)

_Individual article view showing table of contents, MDX content, integrated ads, related articles, and share buttons._

<!-- IMAGE 04 — Admin Login -->

![Admin login panel](/images/projects/pixelpress/admin-login.png)

_Administration panel authentication form with password field and login button._

<!-- IMAGE 05 — Architecture -->

![PixelPress architecture diagram](/images/projects/pixelpress/architecture.png)

_Full architecture diagram: Cloudflare Workers, Astro SSR, MDX Content, JWT Auth, API Routes, Cloudflare R2, Browser, Giscus, and AdSense._
