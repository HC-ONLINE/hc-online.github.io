# Portfolio profesional

Portfolio técnico personal construido con **Astro + Tailwind CSS v4**, enfocado en backend, seguridad y arquitectura. Sitio 100% estático desplegado en GitHub Pages.

---

## Características

- **SSG con Astro** — sitio estático, sin servidor
- **Tailwind CSS v4** con tokens semánticos (CSS-first, sin `tailwind.config`)
- **JS mínimo en cliente** — solo para interactividad puntual: toggle de tema, menú móvil, formulario de contacto y copiar email
- **i18n manual (ES/EN)** sin librerías pesadas
- **Markdown como fuente de contenido** — colecciones tipadas (`sections`, `projects`, `pages`) validadas con Zod
- **Tema claro/oscuro/auto** con persistencia en `localStorage` y script anti-flash
- **Formulario de contacto** vía FormSubmit (sin backend propio)
- **GitHub Pages + GitHub Actions** con verificación automática de enlaces (linkinator)
- **Tipado estricto** — `astro/tsconfigs/strict` + `@astrojs/check`
- **SEO básico** — meta description, theme-color, favicon, `noindex` + canonical en el redirect raíz

## Estructura del proyecto

```text
/
├── src/
│   ├── components/
│   │   ├── Header.astro        # Nav fijo + switcher ES/EN + toggle de tema
│   │   ├── Footer.astro
│   │   ├── Hero.astro          # Presentación + CTAs + stats
│   │   ├── Skills.astro        # Bento grid de habilidades
│   │   ├── Projects.astro      # Proyectos destacados
│   │   ├── Experience.astro    # Timeline de experiencia + educación
│   │   ├── Philosophy.astro    # Principios técnicos y métricas
│   │   ├── Contact.astro       # Formulario (FormSubmit) + info de contacto
│   │   └── ThemeToggle.astro   # Toggle claro / oscuro / auto
│   ├── content/
│   │   ├── config.ts           # Schemas Zod: sections, projects, pages
│   │   ├── sections/           # Contenido del home por sección e idioma
│   │   │   ├── es/             # header, hero, skills, featured-projects,
│   │   │   │                   # experience, philosophy, contact, footer
│   │   │   └── en/
│   │   ├── projects/           # Proyectos por idioma
│   │   │   ├── es/             # 10 proyectos
│   │   │   └── en/             # 10 proyectos
│   │   └── pages/              # Páginas estáticas (projects por idioma)
│   ├── layouts/
│   │   └── BaseLayout.astro    # Header + Footer + script inline anti-flash de tema
│   ├── pages/
│   │   ├── index.astro         # Redirect instantáneo a /es (meta refresh 0)
│   │   ├── es/                 # index, projects, projects/[slug]
│   │   └── en/                 # mismo esquema en inglés
│   └── styles/
│       └── global.css          # Design tokens + estilos base + utilidades
├── public/
│   └── favicon.svg
├── .github/
│   └── workflows/
│       └── deploy.yml          # Build + deploy + verificación de links
├── astro.config.mjs            # Config para GitHub Pages
└── tsconfig.json               # Strict + aliases @components/@layouts/...
```

Alias de imports (tsconfig):

```jsonc
"@components/*"  // src/components/*
"@layouts/*"     // src/layouts/*
"@styles/*"      // src/styles/*
"@content/*"     // src/content/*
"@pages/*"       // src/pages/*
```

## Uso

### Desarrollo local

```bash
# Instalar dependencias
pnpm install

# Servidor de desarrollo
pnpm dev

# Build para producción
pnpm build

# Preview del build
pnpm preview

# Typecheck de Astro
pnpm astro check
```

## Agregar nuevo contenido

Hay **tres flujos** según el tipo de contenido:

### 1. Secciones del home

El contenido de cada sección vive en `src/content/sections/{lang}/<seccion>.md`. Edita el archivo y el componente ya existente lo renderiza. Ejemplo (`section.md` — contacto):

```markdown
---
title: "Contacto"
subtitle: "Cuéntame sobre tu proyecto"
formName: "Nombre"
formEmail: "Email"
formMessage: "Mensaje"
formSubmit: "Enviar mensaje"
contactLocation: "Santiago, Chile"
socials:
  - name: "GitHub"
    url: "https://github.com/tu-usuario"
    icon: "github"
---
```

Secciones disponibles por idioma: `header`, `hero`, `skills`, `featured-projects`, `experience`, `philosophy`, `contact`, `footer`. Cada una acepta un subconjunto distinto del schema (definido en `src/content/config.ts`).

### 2. Proyectos

Crea `src/content/projects/{lang}/<slug>.md` con el mismo slug en ambos idiomas. La página de detalle `/{lang}/projects/<slug>` y la tarjeta en el home se generan solas.

```markdown
---
title: "Nombre del proyecto"
description: "Resumen para el listado"
subtitle: "Subtítulo de la página de detalle"
stack: "Node.js, Express, PostgreSQL"
github: "https://github.com/tu-usuario/repo"
site: "https://demo.example.com"
---

# Contenido de la página de detalle

Aquí va el cuerpo markdown del proyecto.
```

### 3. Páginas estáticas

Si alguna vez se agrega una página independiente (hoy solo existen `projects`):

1. Crea el contenido en `src/content/pages/{lang}/<name>.md`
2. Crea la ruta correspondiente en `src/pages/{lang}/<name>.astro`
3. Mantén el mismo slug en ambos idiomas

```markdown
---
title: "Título de la página"
description: "Descripción para SEO"
---

# Contenido markdown...
```

## i18n

### URLs

- `/es/` → Español (default; la raíz redirige instantáneamente a `/es`)
- `/en/` → English

### Language Switcher

El switcher está integrado en el header y mantiene el contexto de la página actual:

- `/es/projects` → `/en/projects`
- `/es/projects/access-manager` → `/en/projects/access-manager`

## Design Tokens

Tokens semánticos definidos en `src/styles/global.css`:

### Paleta base

```css
/* Fondos */
--color-bg-primary       /* Fondo principal (#0a0a0f) */
--color-bg-secondary     /* Fondo secundario */
--color-bg-tertiary      /* Superficies elevadas */
--color-bg-card          /* Tarjetas */
--color-bg-card-hover    /* Hover de tarjetas / items activos */

/* Texto */
--color-text-primary
--color-text-secondary
--color-text-muted
--color-text-accent

/* Acentos */
--color-accent-cyan
--color-accent-cyan-dim
--color-accent-green
--color-accent-purple
--color-accent-gradient  /* Gradiente azul (#3b82f6 → #60a5fa) */

/* Bordes y superficies */
--color-border
--color-border-accent
--color-surface-glass    /* Fondo de glass-morphism */
```

### Variables por tema

`:root.dark` / `:root.light` definen: `--color-surface`, `--color-surface-muted`, `--color-primary`, `--color-muted`, `--color-accent`, `--color-accent-hover`, `--color-border`.

### Otros tokens

```css
--font-heading  /* Inter */
--font-body     /* Inter */
--font-mono     /* JetBrains Mono */
--section-padding
--transition-fast / --transition-base / --transition-slow
--shadow-glow / --shadow-glow-strong / --shadow-card
```

### Gradientes de marca

El acento neón `#00f5d4 → #00ff88` se usa en `.gradient-text` (títulos de sección, números 01–05, hero, logo) y en los botones neon. La clase utilitaria `.gradient-text` está definida en `global.css`.

### Dark mode

El tema se controla con clases `.dark` / `.light` en `<html>` (default: auto → oscuro):

- `ThemeToggle.astro` persiste la preferencia en `localStorage` (`theme = auto | light | dark`)
- `BaseLayout.astro` incluye un script inline que aplica el tema antes del render (sin flash)
- Al no persistir nada, se sigue la preferencia del sistema

## Contenido Markdown

El contenido se renderiza con `astro:content`:

- Las **páginas de detalle de proyectos** usan `src/pages/{lang}/projects/[slug].astro` (render de `projects/{lang}/<slug>.md`)
- **Nota:** no hay plugin `@tailwindcss/typography` ni estilos `.prose` dedicados; el markdown se renderiza con la tipografía base del sitio. Integrar el plugin de prose queda como mejora futura si se desea estilizar el cuerpo de las páginas de detalle.

## Deploy a GitHub Pages

### Configuración

Config real en `astro.config.mjs`:

```js
export default defineConfig({
  site: 'https://HC-ONLINE.github.io',
  base: '/',        // user-site; repos de proyecto usarían '/nombre-repo'
  output: 'static'
});
```

1. En GitHub: Settings → Pages → Source: **GitHub Actions**
2. Haz push a `main` (o dispara manualmente con **workflow_dispatch**):

```bash
git add .
git commit -m "Deploy portfolio"
git push origin main
```

### Workflow (.github/workflows/deploy.yml)

- **build**: checkout → pnpm 8 + Node 20 → `pnpm install` → `pnpm build` → upload del artifact (`./dist`)
- **deploy**: `actions/deploy-pages` en el environment `github-pages`
- **verify-links**: espera 30s a que el deploy esté activo, luego ejecuta `linkinator` de forma recursiva sobre `https://hc-online.github.io` (con `--verbosity error`) y reporta enlaces rotos
  - Excluidos del chequeo: linkedin.com, twitter.com / x.com, ORBIT-UI/ y DemoFactory/

### Redirect raíz

`src/pages/index.astro` redirige `/` → `/es` de forma instantánea (GitHub Pages no soporta redirects HTTP reales):

- `<meta http-equiv="refresh" content="0;url=/es">`
- respaldo con `window.location.replace()`
- `noindex` + canonical hacia `/es`

## Tech Stack

- **Astro 5.16.x** — SSG
- **Tailwind CSS v4.1** — Styling CSS-first (plugin Vite `@tailwindcss/vite`)
- **TypeScript 5.9** — Tipado estricto + `@astrojs/check`
- **pnpm** — Package manager
- **GitHub Actions + linkinator** — CI/CD con verificación de enlaces
- **FormSubmit** — Backend del formulario de contacto

> Sin scripts de test ni lint por el momento.

## Ventajas de esta arquitectura

- **Carga rápida** — 100% estático con JS selectivo (solo interactividad)
- **Contenido editable** — todo el sitio se modifica desde Markdown tipado
- **i18n determinístico** — rutas ES/EN explícitas, sin detección de browser
- **Type-safe** — TypeScript estricto en todo el stack
- **CI con verificación de links** — los enlaces rotos se detectan en cada deploy
- **Sin backend propio** — el formulario usa FormSubmit; deploy estático puro