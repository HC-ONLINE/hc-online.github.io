# Portfolio profesional

Portfolio técnico personal construido con **Astro + Tailwind CSS v4**, enfocado en backend, seguridad y arquitectura.

---

## Características

- **SSG puro** con Astro (sin JavaScript innecesario)
- **Tailwind CSS v4** con tokens semánticos
- **i18n manual** (ES/EN) sin librerías pesadas
- **Markdown** como fuente de contenido
- **GitHub Pages** ready
- **Tipado estricto** con TypeScript
- **SEO correcto** con URLs limpias
- **Rendimiento óptimo** (100% estático)

## Estructura del proyecto

```text
/
├── src/
│   ├── content/
│   │   ├── config.ts          # Definición de colecciones
│   │   └── pages/
│   │       ├── es/            # Contenido en español
│   │       │   ├── home.md
│   │       │   ├── projects.md
│   │       │   └── principles.md
│   │       └── en/            # Contenido en inglés
│   │           ├── home.md
│   │           ├── projects.md
│   │           └── principles.md
│   ├── layouts/
│   │   └── BaseLayout.astro   # Layout base con nav + footer
│   ├── pages/
│   │   ├── index.astro        # Redirect a /es
│   │   ├── es/                # Páginas en español
│   │   │   ├── index.astro
│   │   │   ├── projects.astro
│   │   │   └── principles.astro
│   │   └── en/                # Páginas en inglés
│   │       ├── index.astro
│   │       ├── projects.astro
│   │       └── principles.astro
│   └── styles/
│       └── global.css         # Tailwind + tokens + prose
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Actions workflow
└── astro.config.mjs           # Config para GitHub Pages
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
```

### Agregar nuevo contenido

1. Crea archivos `.md` en `src/content/pages/{lang}/`
2. Mantén el mismo slug en ambos idiomas
3. Crea las páginas correspondientes en `src/pages/{lang}/`

Ejemplo:

```markdown
---
title: "Título"
description: "Descripción"
---

# Contenido Markdown

Tu contenido aquí...
```

## i18n

### URLs

- `/es/` → Español (default)
- `/en/` → English

### Language Switcher

El switcher está integrado en el header y mantiene el contexto de la página actual.

Ejemplo: `/es/projects` → `/en/projects`

## Design Tokens

Tokens semánticos definidos en `src/styles/global.css`:

```css
--color-surface       /* Fondo principal */
--color-surface-muted /* Fondo secundario */
--color-border        /* Bordes */
--color-primary       /* Texto principal */
--color-muted         /* Texto secundario */
--color-accent        /* Enlaces y acentos */
```

Incluye soporte para dark mode automático vía `prefers-color-scheme`.

## Contenido Markdown

### Prose styling

Todo el contenido Markdown usa la clase `.prose` con estilos personalizados:

- Títulos jerárquicos
- Enlaces con hover states
- Listas bien espaciadas
- Code blocks con syntax highlighting
- Blockquotes estilizados

## Deploy a GitHub Pages

### Configuración

1. Actualiza `astro.config.mjs`:

   ```js
   export default defineConfig({
     site: 'https://tu-usuario.github.io',
     base: '/nombre-repo',
     output: 'static'
   });
   ```

2. En GitHub: Settings → Pages → Source: GitHub Actions

3. Push a `main`:

   ```bash
   git add .
   git commit -m "Deploy portfolio"
   git push origin main
   ```

### GitHub Actions

El workflow en `.github/workflows/deploy.yml`:

- Build automático en cada push a `main`
- Deploy a GitHub Pages
- Usa pnpm para velocidad óptima

## Tech Stack

- **Astro 5.x** - Framework SSG
- **Tailwind CSS v4** - Styling CSS-first
- **TypeScript** - Tipado estricto
- **pnpm** - Package manager
- **GitHub Actions** - CI/CD

## Ventajas de esta arquitectura

- **Sin runtime JavaScript** → Carga instantánea  
- **SEO-friendly** → URLs limpias y semánticas  
- **i18n determinístico** → Sin detección de browser  
- **Fácil mantenimiento** → Markdown + Git  
- **Type-safe** → TypeScript en todo el stack  
