---
title: "PixelPress"
description: "Blog de videojuegos con noticias, reseñas y análisis del mundo gaming"
subtitle: "Blog de videojuegos con noticias, reseñas y análisis (SSR)"
stack: "Astro 7.x, MDX, Tailwind CSS 4, Cloudflare Workers, R2, Giscus"
site: "https://pixelpress.henriquezandres856.workers.dev/"
---

## Qué resuelve

- Plataforma de blog para contenido de videojuegos con categorías (reseñas, noticias, guías, análisis, opinión).
- Sistema de publicaciones destacadas.
- Integración de comentarios y monetización.

## Características clave

- Blog con categorías (reseñas, noticias, guías, análisis, opinión).
- Sistema de publicaciones destacadas.
- Toggle de tema oscuro/claro.
- Tabla de contenidos para artículos.
- Integración de anuncios (banner, sidebar, en artículo).
- Sistema de comentarios Giscus (GitHub Discussions).
- Botones de compartir en redes sociales (Twitter, Facebook, Reddit, WhatsApp).
- Funcionalidad de búsqueda (Fuse.js).
- Diseño responsive con menú móvil.
- Soporte i18n (español/inglés).
- Almacenamiento R2 para assets multimedia.
- Routing del lado del cliente con View Transitions.
- Optimización SEO con meta tags Open Graph.

## Decisión técnica

- Usar Astro en modo SSR para dinamismo y Cloudflare Workers para despliegue edge.
- MDX para contenido rico con componentes React.
- Giscus para comentarios integrados con GitHub Discussions.
