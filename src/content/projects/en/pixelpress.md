---
title: "PixelPress"

description: "Bilingual editorial platform for video game content, built with Astro 7 and deployed using SSR on Cloudflare Workers."

subtitle: "Full-stack editorial platform with SSR, administration, MDX, and edge computing"

stack: "Astro 7, TypeScript, React 19, Tailwind CSS 4, MDX, Zod, Cloudflare Workers, Cloudflare R2, Giscus, Web Crypto API"

site: "https://pixelpress.henriquezandres856.workers.dev/"

---

## 1. Summary

**PixelPress** is a bilingual editorial platform focused on video game content. It is built with **Astro 7, TypeScript, React, Tailwind CSS 4, and MDX**, and deployed using **SSR on Cloudflare Workers**.

The project combines content publishing, an administration panel, JWT authentication, a REST API, image storage through Cloudflare R2, Giscus comments, and advertising integration.

Editorial content uses MDX and Zod schemas to maintain validated, version-controlled content through Git.

### Project Facts

| ~20        | ~15    | 12            | 16                      |
| ---------- | ------ | ------------- | ----------------------- |
| components | routes | demo articles | production dependencies |

---

## 2. Context & Objective

The technical objective was to build a specialized editorial platform combining:

- SSR through edge computing.
- Spanish and English content.
- Browser-based administration.
- Rich-text content editing.
- External image storage.
- Third-party comment integration.
- Advertising integration.
- Version-controlled editorial content.

The project is not based on validated business metrics or a documented commercial requirement. Therefore, PixelPress is presented primarily as a **technical and editorial product project**, rather than a validated SaaS product.

---

## 3. Solution

PixelPress combines an SSR frontend, API layer, administration panel, and external services.

### SSR Frontend

Astro generates pages through SSR using Cloudflare Workers as the runtime.

### Content System

Articles are stored as MDX files and organized by language. Content is validated using Zod schemas.

### Administration

The administration panel provides authentication, editorial management, and a rich-text editor for generating structured content.

Currently, the editor generates MDX files that must be manually incorporated into the repository. Therefore, the panel acts as an **administration and content-generation tool**, rather than a fully automated CMS.

### API

The application provides endpoints for:

- Authentication.
- Article management.
- Image uploads.

### Storage

Images are stored in Cloudflare R2 through Cloudflare Workers bindings.

### Internationalization

Spanish and English content use separate route structures.

### Publishing Flow

```text
Administrator
      ↓
Administration Panel
      ↓
JWT Authentication
      ↓
Content Editor
      ↓
Structured MDX
      ↓
Git Repository
      ↓
Build / Deploy
      ↓
Cloudflare Workers
````

### Reading Flow

```text
User
 ↓
Cloudflare
 ↓
Cloudflare Workers
 ↓
Astro SSR
 ↓
MDX Content
 ↓
Generated HTML
 ↓
Browser
```

---

## 4. Architecture

![PixelPress architecture diagram](/images/projects/pixelpress/architecture.png)

*Overall PixelPress architecture including Astro SSR, Cloudflare Workers, MDX, API routes, authentication, R2 storage, and external integrations.*

### Main Components

- **Astro SSR** — Rendering and routing.
- **Middleware** — Administrative route protection.
- **API Routes** — Authentication, posts, and uploads.
- **React** — Interactive components and administration editor.
- **MDX** — Version-controlled editorial storage.
- **Zod** — Content schema validation.
- **Cloudflare R2** — Image storage.
- **Giscus** — Comments through GitHub Discussions.
- **Google AdSense** — Advertising integration.

---

## 5. Technology Stack

| Technology         | Purpose                               |
| ------------------ | ------------------------------------- |
| Astro 7            | Main framework and SSR                |
| Cloudflare Workers | Edge runtime                          |
| TypeScript         | Static typing                         |
| React 19           | Interactive components and editor     |
| Tailwind CSS 4     | Styling                               |
| MDX                | Editorial content                     |
| Zod                | Schema validation                     |
| Cloudflare R2      | Image storage                         |
| Web Crypto API     | JWT implementation                    |
| Giscus             | Comments                              |
| Google AdSense     | Advertising                           |
| Wrangler           | Cloudflare development and deployment |
| pnpm               | Package management                    |

---

## 6. Implemented Features

### Content

- Bilingual Spanish/English blog.
- MDX articles.
- Categories.
- Featured posts.
- Draft support.
- Related posts.
- Server-side pagination.
- Automatic table of contents.
- YouTube embeds.
- Social sharing.
- Basic SEO.

### Administration

- Administration login.
- JWT authentication.
- HttpOnly, Secure, and SameSite cookies.
- Protected middleware.
- Administration dashboard.
- Rich-text editor.
- MDX content generation.
- Cloudflare R2 image uploads.

### Interface

- Responsive design.
- Dark mode / Light mode.
- View Transitions.
- Reusable components.
- Custom 404 and 500 pages.

### Integrations

- Cloudflare R2.
- Giscus.
- Google AdSense.

### CLI

- Post creation scripts.
- R2 image upload scripts.

### Partial Features

- **Search:** `SearchBar` and Fuse.js are present, but search is not yet connected to a functional implementation.
- **Newsletter:** the UI exists, but no email provider is integrated.
- **Article deletion:** the DELETE endpoint exists, but does not currently remove MDX files from the repository.
- **Mobile navigation:** the menu button exists, but the implementation is incomplete.
- **Tiptap:** Tiptap dependencies are installed, but the current editor uses `contentEditable`.

---

## 7. Key Technical Decisions

### Astro SSR + Cloudflare Workers

SSR was selected to run the frontend, middleware, and API within the same edge environment.

**Advantage:** combines rendering, server-side logic, and API endpoints within Cloudflare Workers.

**Trade-off:** introduces Cloudflare runtime dependency and more complexity than a fully static site.

### JWT with Web Crypto API

Authentication uses `crypto.subtle` to implement HMAC-SHA256 without an additional cryptographic library.

**Advantage:** uses native APIs compatible with Workers.

**Trade-off:** manually maintaining authentication components increases maintenance responsibility and requires careful security review.

### MDX as Editorial Storage

Articles remain inside the repository and are versioned through Git.

**Advantage:** versioned, reproducible, and schema-validated content.

**Trade-off:** publishing content requires repository changes and a new deployment.

### Tailwind CSS 4

The CSS-first configuration model of Tailwind CSS 4 is used.

**Advantage:** keeps much of the configuration directly within CSS.

**Trade-off:** requires familiarity with Tailwind's newer configuration model.

### Separate Language Routes

Spanish and English content use separate route structures.

**Advantage:** explicit control over each language's content.

**Trade-off:** increases maintenance and can introduce structural duplication.

---

## 8. Security

### Implemented Controls

- JWT signed using HMAC-SHA256.
- Token expiration.
- HttpOnly cookies.
- Secure cookies.
- SameSite=Strict.
- Middleware protecting `/admin`.
- API route protection.
- Content validation through Zod.

### Identified Limitations

- No login rate limiting.
- No explicitly documented CSRF protection.
- Credentials require a stronger comparison mechanism.
- Upload validation can be strengthened.
- No automated authentication tests.
- Manual JWT management increases maintenance responsibility.

### Priorities

1. Add login rate limiting.
2. Use timing-safe credential comparison.
3. Strictly validate upload size and file types.
4. Avoid exposing internal error details.
5. Add authentication and API tests.

---

## 9. Quality & Current Status

### Testing

Currently there are no:

- Unit tests.
- Integration tests.
- E2E tests.
- Automated coverage.
- CI/CD pipeline.

TypeScript uses strict configuration, although the project keeps `ignoreBuildErrors: true`.

This represents **technical debt**, because deployment can proceed despite TypeScript errors.

### Status

#### Classification: proof of concept

The project's main functional foundation is implemented, but several capabilities remain incomplete:

- Fully automated publishing.
- Search.
- Newsletter.
- Complete mobile navigation.
- Actual article deletion.
- Automated testing.
- CI/CD.
- Authentication hardening.

Therefore, **PixelPress should not be presented as a finished editorial platform**, but as an actively developed full-stack project with a substantial functional foundation.

### Observable Project Facts

- ~20 Astro/React components.
- ~15 routes across both languages.
- 12 demo articles.
- 6 Spanish articles.
- 6 English articles.
- 16 production dependencies.
- 10 development dependencies.

These figures describe project size rather than quality or performance.

---

## 10. Visual Evidence

### Homepage

![Homepage with featured article and article grid](/images/projects/pixelpress/homepage.png)

*Featured article and article grid organized by category.*

### Blog

![Blog listing](/images/projects/pixelpress/blog.png)

*Article listing with navigation and pagination.*

### Article

![Individual article](/images/projects/pixelpress/article.png)

*Individual article view with MDX content, table of contents, related articles, advertisements, and comments.*

### Administration

![Administration login](/images/projects/pixelpress/admin-login.png)

*Administration authentication interface.*

### Architecture

![PixelPress architecture diagram](/images/projects/pixelpress/architecture.png)

*Complete system architecture and external integrations.*

---

## 11. Limitations & Future Evolution

### Current Limitations

- The editor does not publish directly to production.
- Search is not yet implemented.
- Newsletter has no email provider.
- No automated tests.
- No CI/CD.
- Login has no rate limiting.
- Mobile menu is incomplete.
- DELETE does not actually remove MDX files.
- Some installed dependencies are currently unused.
- Bilingual routes require separate maintenance.

### Priority Improvements

1. Complete the publishing workflow.
2. Implement authentication and API tests.
3. Add rate limiting.
4. Strengthen upload validation.
5. Implement search by reusing Fuse.js.
6. Complete mobile navigation.
7. Configure CI/CD.
8. Automate sitemap and editorial processes.

The priority should be to **complete existing capabilities before introducing new technologies or architectural patterns**.
