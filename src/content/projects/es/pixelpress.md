---
title: "PixelPress"
description: "Aplicación web full-stack para publicación de contenido sobre videojuegos, construida con Astro 7 y desplegada mediante SSR sobre Cloudflare Workers."
subtitle: "Blog de videojuegos bilingüe con SSR, panel administrativo y edge computing"
stack: "Astro 7, TypeScript, React 19, Tailwind CSS 4, MDX, Zod, Cloudflare Workers, Cloudflare R2, Giscus, Web Crypto API"
site: "https://pixelpress.henriquezandres856.workers.dev/"
---

## Resumen

**PixelPress** es un blog de videojuegos bilingüe construido con **Astro 7**, **TypeScript**, **Tailwind CSS v4** y **MDX**, desplegado sobre **Cloudflare Workers** mediante SSR en el edge.

El proyecto incorpora un panel de administración protegido mediante JWT, un editor rich-text, API REST para operaciones administrativas, almacenamiento de imágenes en Cloudflare R2, comentarios mediante Giscus y un sistema de anuncios preparado para Google AdSense.

El contenido se organiza como archivos MDX validados mediante Zod, mientras que el frontend se ejecuta en Cloudflare Workers.

El proyecto demuestra la construcción de una aplicación web full-stack en un único repositorio, combinando frontend, SSR, APIs, autenticación, almacenamiento externo, internacionalización y despliegue edge.

## Contexto / Problema

**Objetivo técnico:**

Construir una plataforma editorial especializada en videojuegos que permitiera:

- Renderizado SSR sobre edge computing.
- Contenido bilingüe español/inglés.
- Gestión de artículos desde un panel administrativo.
- Edición de contenido mediante interfaz rich-text.
- Almacenamiento externo de imágenes.
- Integración de comentarios sin desarrollar un sistema propio.
- Preparación para monetización mediante anuncios.
- Mantener el contenido versionado dentro del repositorio.

El repositorio **no documenta un problema de negocio concreto** ni métricas de usuarios. Por tanto, PixelPress debe presentarse principalmente como un proyecto técnico y de producto editorial, no como una solución SaaS validada comercialmente.

## Solución

PixelPress combina un frontend SSR con una capa API y servicios externos.

### Componentes principales

#### Frontend SSR

Astro genera las páginas del blog en servidor utilizando Cloudflare Workers como runtime.

#### Sistema de contenido

Los artículos se almacenan como archivos MDX separados por idioma y utilizan schemas de Zod para validar su estructura.

#### Panel administrativo

Incluye autenticación, dashboard y editor rich-text para crear y modificar artículos.

#### API REST

Proporciona endpoints para autenticación, gestión de artículos y subida de imágenes.

#### Almacenamiento

Las imágenes se almacenan en Cloudflare R2 mediante bindings de Workers.

#### Internacionalización

El contenido está disponible en español e inglés mediante rutas diferenciadas.

#### Integraciones

- Giscus para comentarios.
- Google AdSense para anuncios.
- Cloudflare R2 para imágenes.

### Flujo principal

1. El visitante solicita una página.
2. Cloudflare Workers ejecuta Astro SSR.
3. Astro obtiene el contenido MDX correspondiente.
4. El contenido es validado mediante el schema definido con Zod.
5. Astro genera el HTML y lo entrega al navegador.
6. Giscus y AdSense se cargan como integraciones externas.

Para administración:

1. El administrador accede a `/admin`.
2. Se autentica mediante contraseña.
3. El servidor genera un JWT.
4. El token se almacena en una cookie segura.
5. El middleware protege las rutas administrativas.
6. El editor permite generar contenido estructurado.
7. Las imágenes pueden subirse a Cloudflare R2.
8. Actualmente, el MDX generado debe descargarse y posteriormente incorporarse manualmente al repositorio.

**Esta última etapa es una limitación arquitectónica importante.**

## Arquitectura

![Diagrama de arquitectura de PixelPress](/images/projects/pixelpress/architecture.png)

### Relaciones principales

- Astro SSR genera y sirve las páginas.
- Middleware protege las rutas administrativas.
- Las API routes gestionan autenticación, posts y uploads.
- Cloudflare R2 almacena imágenes.
- MDX mantiene el contenido versionado.
- Giscus proporciona comentarios mediante GitHub Discussions.
- AdSense proporciona el mecanismo de monetización.

## Stack tecnológico

| Tecnología         | Función                            |
| ------------------ | ---------------------------------- |
| Astro 7            | Framework principal y SSR          |
| Cloudflare Workers | Runtime edge                       |
| TypeScript         | Tipado estático                    |
| React 19           | Editor administrativo              |
| Tailwind CSS 4     | Sistema de estilos                 |
| MDX                | Contenido editorial                |
| Zod                | Validación del contenido           |
| Cloudflare R2      | Almacenamiento de imágenes         |
| Web Crypto API     | Firma y validación JWT             |
| Giscus             | Sistema de comentarios             |
| Google AdSense     | Sistema de anuncios                |
| Wrangler           | Desarrollo y despliegue Cloudflare |
| pnpm               | Gestión de dependencias            |

## Funcionalidades implementadas

- Blog bilingüe español/inglés.
- SSR mediante Astro.
- Despliegue sobre Cloudflare Workers.
- Artículos MDX.
- Validación de contenido mediante Zod.
- Paginación server-side.
- Categorías.
- Artículos destacados.
- Borradores.
- Posts relacionados.
- Tabla de contenidos automática.
- Compartir artículos.
- Dark mode / Light mode.
- View Transitions.
- Página 404 personalizada.
- Página 500 personalizada.
- Panel administrativo.
- Autenticación mediante JWT.
- Cookies HttpOnly, Secure y SameSite.
- Middleware de protección.
- Dashboard administrativo.
- Editor rich-text.
- Subida de imágenes a Cloudflare R2.
- Inserción de vídeos de YouTube.
- Inserción de marcadores de anuncios.
- API REST para posts.
- Sistema de comentarios con Giscus.
- Sistema de anuncios con diferentes modos.
- Fuentes autoalojadas.
- SEO básico.
- Scripts CLI para creación de posts y subida a R2.

## Funcionalidades parciales / experimentales

### Búsqueda

Existe `SearchBar` y la dependencia Fuse.js, pero la búsqueda todavía no está conectada a una implementación funcional.

### Newsletter

La interfaz existe, pero no existe integración con un proveedor de email.

### Editor

El editor funciona mediante `contentEditable` y genera MDX descargable, pero **no existe publicación server-side real**.

### Eliminación de artículos

El endpoint DELETE existe, pero no elimina realmente los archivos MDX del repositorio.

### Navegación móvil

Existe el botón hamburger, pero el menú móvil no está completamente implementado.

### Tiptap

Existen dependencias de Tiptap, pero no son utilizadas por el editor actual.

## Decisiones técnicas relevantes

### Astro SSR + Cloudflare Workers

Se utiliza SSR sobre edge en lugar de un sitio completamente estático.

**Ventaja:** permite ejecutar middleware y API routes junto con el frontend.

**Trade-off:** introduce dependencia del runtime de Cloudflare y mayor complejidad que un sitio estático convencional.

### JWT mediante Web Crypto API

La autenticación utiliza `crypto.subtle` para implementar HS256 sin depender de una librería externa.

**Ventaja:** utiliza APIs nativas compatibles con Workers.

**Trade-off:** mantener criptografía manual aumenta la responsabilidad del proyecto frente a utilizar una librería especializada y ampliamente auditada.

### MDX como almacenamiento de contenido

Los artículos permanecen versionados dentro del repositorio.

**Ventaja:** historial mediante Git, estructura reproducible y validación mediante schemas.

**Trade-off:** el contenido no puede publicarse completamente desde el panel administrativo.

### Tailwind CSS v4 CSS-first

La configuración de Tailwind se realiza directamente mediante CSS.

**Ventaja:** reduce la configuración JavaScript específica de Tailwind.

**Trade-off:** requiere familiaridad con el nuevo modelo de configuración.

### i18n mediante rutas duplicadas

Se mantienen estructuras `/` y `/en/`.

**Ventaja:** control explícito sobre el contenido de cada idioma.

**Trade-off:** introduce duplicación y aumenta el coste de mantenimiento.

## Seguridad

### Implementado

- JWT firmado mediante HMAC-SHA256.
- Expiración de tokens.
- Cookies HttpOnly.
- Cookies Secure.
- SameSite=Strict.
- Middleware para proteger `/admin`.
- Protección de API routes.
- Validación de contenido MDX mediante Zod.

### Limitaciones identificadas

- Sin rate limiting en login.
- Sin protección CSRF explícita.
- Comparación directa de contraseñas.
- Sin validación suficiente del tamaño/tipo de archivos subidos.
- Sin refresh tokens.
- Posible exposición de detalles internos de errores.
- Gestión manual de JWT.

### Mejoras prioritarias

1. Rate limiting del login.
2. Comparación de credenciales timing-safe.
3. Validación estricta de uploads.
4. Eliminación de detalles internos de errores.
5. Tests automatizados para autenticación y API.

## Testing y calidad

Actualmente:

- No existen tests unitarios.
- No existen tests de integración.
- No existen tests E2E.
- No existe cobertura.
- No existe CI/CD.
- No existe una configuración completa de linting automatizado.

TypeScript utiliza configuración estricta, aunque el proyecto configura `ignoreBuildErrors: true`.

**Esto debería considerarse deuda técnica**, porque permitir que el build ignore errores de TypeScript reduce la capacidad del proyecto para detectar problemas antes del despliegue.

## Experiencia de usuario

La interfaz utiliza una estética inspirada en videojuegos retro/pixel-art.

### Principales vistas

- Homepage.
- Blog.
- Categorías.
- Artículo individual.
- Login administrativo.
- Dashboard.
- Editor.
- Páginas 404/500.

### Responsive

- Grid adaptable.
- Sidebar oculta en móvil.
- Layout administrativo adaptable.
- Header responsive.

Sin embargo, el menú móvil todavía está incompleto.

## Métricas

No existen métricas de rendimiento o uso verificables suficientes para presentar como resultados.

Datos observables:

- ~20 componentes Astro/React.
- ~15 rutas considerando ambos idiomas.
- 12 artículos demo.
- 6 artículos en español.
- 6 artículos en inglés.
- 16 dependencias de producción.
- 10 dependencias de desarrollo.

No recomendaría convertir estos números en supuestos indicadores de calidad. Son simplemente métricas de tamaño del proyecto.

## Estado actual

### Clasificación: Active Development

El proyecto tiene una base funcional considerable, pero todavía presenta características incompletas:

- Publicación completamente automatizada.
- Búsqueda.
- Newsletter.
- Menú móvil.
- Eliminación real de posts.
- Tests.
- CI/CD.
- Hardening de autenticación.
- Integración completa de algunas dependencias instaladas.

Por tanto, **no lo presentaría como producto terminado**.

## Limitaciones principales

- El editor no publica directamente en producción.
- La búsqueda no está implementada.
- Newsletter sin backend.
- Sin tests.
- Sin CI/CD.
- Login sin rate limiting.
- Menú móvil incompleto.
- DELETE no elimina realmente contenido.
- Dependencias sin utilizar.
- Duplicación de rutas por idioma.
- Sitemap pendiente.
- Footer con enlaces genéricos.

## Evolución futura

Priorizaría las mejoras en este orden:

1. **Completar el flujo de publicación.**
2. **Añadir tests para autenticación y API.**
3. **Implementar rate limiting.**
4. **Validar correctamente los uploads.**
5. **Implementar búsqueda con Fuse.js**, reutilizando la dependencia existente.
6. **Completar navegación móvil.**
7. **Configurar CI/CD.**
8. Implementar newsletter.
9. Generar sitemap automáticamente.
10. Evaluar reemplazar `contentEditable` por Tiptap.

No introduciría nuevas tecnologías antes de resolver las capacidades incompletas que ya existen.

## Qué demuestra este proyecto

- Desarrollo full-stack con Astro.
- SSR sobre edge computing.
- Cloudflare Workers.
- Diseño de API REST.
- Autenticación JWT.
- Cookies seguras.
- Middleware de autorización.
- Web Crypto API.
- Gestión de contenido mediante MDX.
- Validación con Zod.
- Editor rich-text.
- Integración React + Astro.
- Cloudflare R2.
- Internacionalización.
- Tailwind CSS v4.
- Integración con servicios externos.
- Diseño de componentes reutilizables.
- Arquitectura orientada a contenido.

## Clasificación

### Active Development

Proyecto con una base funcional considerable pero con múltiples capacidades incompletas. No debe presentarse como un producto terminado ni como un CMS completamente operativo.

## Visuales

<!-- IMAGE 01 — Homepage -->

![Homepage con artículo destacado y grid de artículos](/images/projects/pixelpress/homepage.png)

_Visita principal con el artículo destacado (GTA VI) y el grid de los últimos artículos organizados por categoría._

<!-- IMAGE 02 — Blog -->

![Listado del blog con barra de búsqueda](/images/projects/pixelpress/blog.png)

_Página de listado completo del blog con barra de búsqueda, grid de artículos y paginación._

<!-- IMAGE 03 — Artículo -->

![Artículo individual con TOC, anuncios y comentarios](/images/projects/pixelpress/article.png)

_Vista de un artículo individual mostrando tabla de contenido, contenido MDX, anuncios integrados, artículos relacionados y botones de compartir._

<!-- IMAGE 04 — Admin Login -->

![Panel de login de administración](/images/projects/pixelpress/admin-login.png)

_Formulario de autenticación del panel administrativo con campo de contraseña y botón de inicio de sesión._

<!-- IMAGE 05 — Arquitectura -->

![Diagrama de arquitectura de PixelPress](/images/projects/pixelpress/architecture.png)

_Diagrama de la arquitectura completa: Cloudflare Workers, Astro SSR, MDX Content, JWT Auth, API Routes, Cloudflare R2, Browser, Giscus y AdSense._
