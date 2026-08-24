---
title: "PixelPress"
description: "Plataforma editorial bilingüe para contenido sobre videojuegos, construida con Astro 7 y desplegada mediante SSR sobre Cloudflare Workers."
subtitle: "Plataforma editorial full-stack con SSR, administración, MDX y edge computing"
stack: "Astro 7, TypeScript, React 19, Tailwind CSS 4, MDX, Zod, Cloudflare Workers, Cloudflare R2, Giscus, Web Crypto API"
site: "https://pixelpress.henriquezandres856.workers.dev/"
---

## 1. Resumen

**PixelPress** es una plataforma editorial bilingüe orientada a contenido sobre videojuegos. Está construida con **Astro 7, TypeScript, React, Tailwind CSS 4 y MDX**, y desplegada mediante **SSR sobre Cloudflare Workers**.

El proyecto combina publicación de contenido, panel administrativo, autenticación mediante JWT, API REST, almacenamiento de imágenes en Cloudflare R2, comentarios mediante Giscus y preparación para monetización mediante anuncios.

El contenido editorial utiliza MDX y schemas de Zod para mantener una estructura validada y versionada mediante Git.

### Datos del proyecto

| ~20         | ~15   | 12             | 16                         |
| ----------- | ----- | -------------- | -------------------------- |
| componentes | rutas | artículos demo | dependencias de producción |

---

## 2. Contexto y Objetivo

El objetivo técnico fue construir una plataforma editorial especializada que combinara:

- Renderizado SSR sobre edge computing.
- Contenido en español e inglés.
- Administración desde navegador.
- Edición de contenido mediante interfaz rich-text.
- Almacenamiento externo de imágenes.
- Integración de comentarios mediante un servicio externo.
- Preparación para monetización mediante anuncios.
- Contenido versionado dentro del repositorio.

El proyecto no parte de métricas comerciales ni de una necesidad de negocio validada. Por ello, PixelPress se presenta como un **proyecto técnico y de producto editorial**, no como un SaaS comercial validado.

---

## 3. Solución

PixelPress combina un frontend SSR, una capa de API, un panel administrativo y servicios externos.

### Frontend SSR

Astro genera las páginas mediante SSR utilizando Cloudflare Workers como runtime.

### Sistema de contenido

Los artículos se almacenan como archivos MDX y se organizan por idioma. Los datos del contenido se validan mediante schemas de Zod.

### Administración

El panel administrativo permite autenticarse, gestionar información editorial y utilizar un editor rich-text para generar contenido estructurado.

Actualmente, el editor genera archivos MDX que deben incorporarse manualmente al repositorio. Por tanto, el panel funciona como una **herramienta de administración y generación de contenido**, no como un CMS con publicación completamente automatizada.

### API

La aplicación incluye endpoints para:

- Autenticación.
- Gestión de artículos.
- Subida de imágenes.

### Almacenamiento

Las imágenes se almacenan en Cloudflare R2 mediante bindings de Cloudflare Workers.

### Internacionalización

El contenido se mantiene en español e inglés mediante rutas diferenciadas.

### Flujo de publicación

```text
Administrador
     ↓
Panel administrativo
     ↓
Autenticación JWT
     ↓
Editor de contenido
     ↓
MDX estructurado
     ↓
Repositorio Git
     ↓
Build / Deploy
     ↓
Cloudflare Workers
````

### Flujo de lectura

```text
Usuario
   ↓
Cloudflare
   ↓
Cloudflare Workers
   ↓
Astro SSR
   ↓
Contenido MDX
   ↓
HTML generado
   ↓
Navegador
```

---

## 4. Arquitectura

![Diagrama de arquitectura de PixelPress](/images/projects/pixelpress/architecture.png)

*Arquitectura general de PixelPress con Astro SSR, Cloudflare Workers, MDX, API, autenticación, almacenamiento R2 e integraciones externas.*

### Componentes principales

- **Astro SSR** — Renderizado y routing.
- **Middleware** — Protección de rutas administrativas.
- **API Routes** — Autenticación, posts y uploads.
- **React** — Componentes interactivos y editor administrativo.
- **MDX** — Persistencia editorial versionada.
- **Zod** — Validación estructural del contenido.
- **Cloudflare R2** — Almacenamiento de imágenes.
- **Giscus** — Comentarios mediante GitHub Discussions.
- **Google AdSense** — Integración de publicidad.

---

## 5. Stack Tecnológico

| Tecnología         | Función                           |
| ------------------ | --------------------------------- |
| Astro 7            | Framework principal y SSR         |
| Cloudflare Workers | Runtime edge                      |
| TypeScript         | Tipado estático                   |
| React 19           | Componentes interactivos y editor |
| Tailwind CSS 4     | Estilos                           |
| MDX                | Contenido editorial               |
| Zod                | Validación de schemas             |
| Cloudflare R2      | Almacenamiento de imágenes        |
| Web Crypto API     | Implementación de JWT             |
| Giscus             | Comentarios                       |
| Google AdSense     | Publicidad                        |
| Wrangler           | Desarrollo y despliegue           |
| pnpm               | Gestión de dependencias           |

---

## 6. Funcionalidades Implementadas

### Contenido

- Blog bilingüe español/inglés.
- Artículos MDX.
- Categorías.
- Artículos destacados.
- Borradores.
- Artículos relacionados.
- Paginación server-side.
- Tabla de contenidos automática.
- Inserción de vídeos de YouTube.
- Compartir artículos.
- SEO básico.

### Administración

- Login administrativo.
- Autenticación mediante JWT.
- Cookies HttpOnly, Secure y SameSite.
- Middleware de protección.
- Dashboard administrativo.
- Editor rich-text.
- Generación de contenido MDX.
- Subida de imágenes a Cloudflare R2.

### Interfaz

- Diseño responsive.
- Dark mode / Light mode.
- View Transitions.
- Componentes reutilizables.
- Páginas 404 y 500 personalizadas.

### Integraciones

- Cloudflare R2.
- Giscus.
- Google AdSense.

### CLI

- Scripts para creación de posts.
- Scripts para subida de imágenes a R2.

### Funcionalidades parciales

- **Búsqueda:** existe `SearchBar` y la dependencia Fuse.js, pero la búsqueda todavía no está conectada a una implementación funcional.
- **Newsletter:** existe la interfaz, pero no hay integración con un proveedor de email.
- **Eliminación de artículos:** existe el endpoint DELETE, pero actualmente no elimina los archivos MDX del repositorio.
- **Navegación móvil:** existe el botón de menú, pero la implementación no está completa.
- **Tiptap:** existen dependencias instaladas, pero el editor actual utiliza `contentEditable`.

---

## 7. Decisiones Técnicas Relevantes

### Astro SSR + Cloudflare Workers

Se eligió SSR sobre edge computing para ejecutar frontend, middleware y API dentro del mismo entorno.

**Ventaja:** permite combinar renderizado, lógica de servidor y endpoints en Cloudflare Workers.

**Trade-off:** introduce dependencia del runtime de Cloudflare y mayor complejidad frente a un sitio completamente estático.

### JWT mediante Web Crypto API

La autenticación utiliza `crypto.subtle` para implementar HMAC-SHA256 sin incorporar una biblioteca criptográfica adicional.

**Ventaja:** utiliza APIs nativas compatibles con Workers.

**Trade-off:** implementar manualmente componentes de autenticación aumenta la responsabilidad de mantenimiento y requiere una revisión de seguridad más cuidadosa que una solución especializada.

### MDX como almacenamiento editorial

Los artículos permanecen dentro del repositorio y forman parte del historial de Git.

**Ventaja:** contenido versionado, reproducible y validable.

**Trade-off:** publicar contenido requiere modificar el repositorio y desplegar una nueva versión.

### Tailwind CSS 4

Se utiliza el modelo CSS-first de Tailwind CSS 4.

**Ventaja:** mantiene gran parte de la configuración directamente en CSS.

**Trade-off:** requiere trabajar con el nuevo modelo de configuración de Tailwind.

### Rutas independientes por idioma

El contenido español e inglés utiliza estructuras de rutas diferenciadas.

**Ventaja:** control explícito sobre el contenido de cada idioma.

**Trade-off:** aumenta el mantenimiento y puede introducir duplicación estructural.

---

## 8. Seguridad

### Controles implementados

- JWT firmado mediante HMAC-SHA256.
- Expiración de tokens.
- Cookies HttpOnly.
- Cookies Secure.
- SameSite=Strict.
- Middleware para proteger `/admin`.
- Protección de API routes.
- Validación de contenido mediante Zod.

### Limitaciones identificadas

- No existe rate limiting para login.
- No existe protección CSRF explícita documentada.
- Las credenciales requieren una comparación más robusta.
- La validación de uploads puede fortalecerse.
- No existen tests automatizados de autenticación.
- La gestión manual de JWT aumenta la superficie de mantenimiento.

### Prioridades

1. Añadir rate limiting al login.
2. Utilizar comparación timing-safe de credenciales.
3. Validar estrictamente tamaño y tipo de archivos.
4. Evitar exponer detalles internos en respuestas de error.
5. Añadir tests de autenticación y API.

---

## 9. Calidad y Estado Actual

### Testing

Actualmente no existen:

- Tests unitarios.
- Tests de integración.
- Tests E2E.
- Cobertura automatizada.
- Pipeline CI/CD.

TypeScript utiliza configuración estricta, aunque el proyecto mantiene `ignoreBuildErrors: true`.

Esto constituye **deuda técnica**, porque permite desplegar aunque existan errores de TypeScript.

### Estado

#### Clasificación: proof of concept

La base funcional del proyecto está implementada, pero todavía existen capacidades incompletas:

- Publicación completamente automatizada.
- Búsqueda.
- Newsletter.
- Navegación móvil completa.
- Eliminación real de artículos.
- Tests automatizados.
- CI/CD.
- Hardening de autenticación.

Por tanto, **no debe presentarse como una plataforma editorial terminada**, sino como un proyecto full-stack en desarrollo con una base funcional significativa.

### Datos observables

- ~20 componentes Astro/React.
- ~15 rutas considerando ambos idiomas.
- 12 artículos demo.
- 6 artículos en español.
- 6 artículos en inglés.
- 16 dependencias de producción.
- 10 dependencias de desarrollo.

Estas cifras describen el tamaño del proyecto, no su calidad ni rendimiento.

---

## 10. Evidencia Visual

### Homepage

![Homepage con artículo destacado y grid de artículos](/images/projects/pixelpress/homepage.png)

*Artículo destacado y grid de publicaciones organizadas por categoría.*

### Blog

![Listado del blog](/images/projects/pixelpress/blog.png)

*Listado de artículos con navegación y paginación.*

### Artículo

![Artículo individual](/images/projects/pixelpress/article.png)

*Vista individual con contenido MDX, tabla de contenidos, artículos relacionados, anuncios y comentarios.*

### Administración

![Panel de login](/images/projects/pixelpress/admin-login.png)

*Interfaz de autenticación del panel administrativo.*

### Arquitectura

![Diagrama de arquitectura de PixelPress](/images/projects/pixelpress/architecture.png)

*Arquitectura completa del sistema y sus integraciones.*

---

## 11. Limitaciones y Evolución

### Limitaciones actuales

- El editor no publica directamente en producción.
- La búsqueda todavía no está implementada.
- Newsletter sin proveedor de email.
- Sin tests automatizados.
- Sin CI/CD.
- Login sin rate limiting.
- Menú móvil incompleto.
- DELETE no elimina realmente los archivos MDX.
- Existen dependencias instaladas que actualmente no se utilizan.
- Las rutas bilingües requieren mantenimiento separado.

### Evolución prioritaria

1. Completar el flujo de publicación.
2. Implementar tests de autenticación y API.
3. Añadir rate limiting.
4. Fortalecer validación de uploads.
5. Implementar búsqueda reutilizando Fuse.js.
6. Completar navegación móvil.
7. Configurar CI/CD.
8. Automatizar sitemap y procesos editoriales.

La prioridad debe ser **completar las capacidades existentes antes de introducir nuevas tecnologías o patrones arquitectónicos**.
