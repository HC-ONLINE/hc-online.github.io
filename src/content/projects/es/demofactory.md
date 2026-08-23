---
title: "DemoFactory"
description: "Hub bilingüe de experiencias UI/UX con seis demos frontend independientes construidas con Astro, TypeScript y Tailwind CSS v4."
subtitle: "Arquitectura frontend content-driven y experiencias interactivas"
stack: "Astro 7.x, TypeScript, Tailwind CSS v4, MapLibre GL, Sharp"
github: "https://github.com/HC-ONLINE/DemoFactory"
site: "https://hc-online.github.io/DemoFactory/"
---

## 1. Resumen

DemoFactory es un hub bilingüe de experiencias UI/UX construido con Astro, TypeScript y Tailwind CSS v4. Reúne seis demos frontend independientes dentro de un único proyecto, manteniendo cada experiencia aislada a nivel de componentes, contenido y lógica interactiva.

El proyecto utiliza una arquitectura content-driven para separar el contenido localizado de la implementación visual mediante archivos Markdown en español e inglés.

Además de servir como portafolio de interfaces, DemoFactory explora cómo organizar múltiples experiencias frontend heterogéneas dentro de un mismo repositorio sin convertirlas en una aplicación monolítica.

## 2. Contexto / Problema

Un portafolio que contiene múltiples experiencias visuales puede terminar dependiendo de repositorios separados o de una aplicación con demasiadas dependencias compartidas.

DemoFactory aborda este problema mediante una arquitectura que permite:

- Mantener cada demo como una unidad independiente.
- Compartir únicamente la infraestructura necesaria.
- Separar contenido y presentación.
- Mantener versiones en español e inglés.
- Integrar experiencias interactivas sin requerir un backend.
- Desplegar todo el proyecto como un sitio estático.

El objetivo no es construir una plataforma empresarial, sino demostrar diferentes enfoques frontend dentro de una base técnica común.

## 3. Solución

La aplicación se estructura alrededor de un índice central de proyectos y componentes independientes para cada experiencia.

### Sistema de contenido

El contenido localizado se mantiene separado de la implementación visual:

```text
src/content/demos/
├── <demo>/
│   ├── es.md
│   └── en.md
```

Esto permite modificar textos, metadatos y traducciones sin modificar directamente los componentes de presentación.

### Aislamiento de demos

Cada experiencia mantiene sus propios componentes y lógica:

```text
src/components/
├── aeterna/
├── aura_weather/
├── elite-vows/
├── lumina/
├── nf-archive/
└── tech-nexus-consulting/
```

### Demos incluidas

- **Aeterna** — Experiencia narrativa basada en scroll y épocas históricas.
- **Aura Weather** — Aplicación meteorológica interactiva con mapas y creative coding.
- **Elite Vows** — Landing editorial para bodas.
- **Lumina** — Portafolio editorial con galería tipo bento.
- **NF Archive** — Experiencia visual basada en discografía musical.
- **Tech Nexus Consulting** — Landing B2B para consultoría tecnológica.

## 4. Arquitectura

DemoFactory utiliza una arquitectura estática y content-driven:

![Diagrama de arquitectura de DemoFactory](/images/projects/demofactory/architecture.png)

*Flujo general entre contenido Markdown, rutas bilingües, componentes aislados, scripts de cliente, generación estática y GitHub Pages.*

### Generación estática

Astro genera las páginas durante el proceso de build. La mayor parte de la interfaz se entrega como HTML generado, mientras que las experiencias que requieren interacción ejecutan JavaScript en el navegador.

### Contenido

Los textos y metadatos se mantienen fuera de los componentes mediante Markdown localizado.

### Componentes

Cada demo posee una estructura independiente y puede utilizar diferentes técnicas de implementación sin introducir dependencias innecesarias entre experiencias.

### Interactividad

Las funcionalidades dinámicas se ejecutan principalmente en el cliente. Aura Weather, por ejemplo, integra MapLibre, APIs meteorológicas, geolocalización y diferentes módulos de visualización.

## 5. Stack Tecnológico

### Frontend

| Tecnología           | Propósito                                 |
| -------------------- | ----------------------------------------- |
| Astro 7.x            | Framework principal y generación estática |
| TypeScript           | Lógica de aplicación y scripts de cliente |
| Tailwind CSS v4      | Sistema de estilos                        |
| MapLibre GL          | Mapa interactivo de Aura Weather          |
| CSS / Canvas / SVG   | Animaciones y efectos visuales            |
| Astro Assets / Sharp | Procesamiento y optimización de imágenes  |

### APIs externas

| Servicio    | Propósito            |
| ----------- | -------------------- |
| Open-Meteo  | Datos meteorológicos |
| Nominatim   | Geocodificación      |
| OpenFreeMap | Tiles del mapa       |

### Infraestructura

| Tecnología     | Propósito               |
| -------------- | ----------------------- |
| GitHub Pages   | Hosting estático        |
| GitHub Actions | Build y despliegue      |
| pnpm           | Gestión de dependencias |
| Node.js 22     | Entorno de build        |

## 6. Funcionalidades Implementadas

### Hub principal

- Navegación entre proyectos.
- Soporte español/inglés.
- Grid responsive.
- Modo oscuro persistente.
- Imágenes responsive optimizadas.
- Enlaces a proyectos externos.

### Aeterna

- 12 secciones cronológicas.
- Navegación mediante puntos.
- Detección de sección con `IntersectionObserver`.
- Indicador de época activa.
- Animaciones CSS.
- Sistema de partículas.
- Tipografía específica para la experiencia.

### Aura Weather

- Mapa interactivo con MapLibre.
- Búsqueda de ciudades.
- Geolocalización.
- Datos meteorológicos mediante Open-Meteo.
- Caché temporal.
- Debounce de búsquedas.
- Soporte de teclado.
- Sistemas de partículas de lluvia y nieve.
- Física y colisiones.
- Transiciones metaball.
- Gradientes interpolados.
- Seis estados climáticos.
- Modo de demostración.
- Interfaz internacionalizada.

### Elite Vows

- Hero con parallax.
- Timeline de ceremonia.
- Navegación móvil.
- Scroll por anclas.
- Animaciones reveal.
- Formulario RSVP simulado.

### Lumina

- Galería tipo bento.
- Animaciones reveal.
- Layout responsive.
- Presentación centrada en tipografía.

### NF Archive

- Datos estructurados de álbumes.
- Información de tracks.
- Estadísticas.
- Enlaces externos.
- Identidad visual musical.

### Tech Nexus Consulting

- Métricas de negocio.
- FAQ mediante HTML nativo.
- Navegación por anclas.
- Scroll suave.
- Formulario de auditoría simulado.
- Diseño responsive.

## 7. Decisiones Técnicas

### Separación de contenido y presentación

Markdown contiene el contenido localizado mientras los componentes Astro controlan la presentación.

**Ventaja:** facilita modificar textos y traducciones sin alterar la implementación visual.

**Trade-off:** algunas demos mantienen estructuras de datos y convenciones propias.

### Una demo = una unidad aislada

Cada experiencia mantiene su propia lógica visual e interactiva.

**Ventaja:** permite experimentar con diferentes enfoques sin crear dependencias fuertes entre demos.

**Trade-off:** algunos patrones de interfaz pueden repetirse.

### Static Site Generation

Se utiliza SSG porque el proyecto no necesita autenticación, base de datos ni servidor propio.

**Ventaja:** despliegue sencillo, HTML pre-generado y menor superficie de infraestructura.

**Trade-off:** las funcionalidades dinámicas deben ejecutarse en el navegador.

### APIs públicas

Aura Weather utiliza servicios públicos sin API keys.

**Ventaja:** no requiere gestionar secretos durante el despliegue.

**Trade-off:** existe dependencia de disponibilidad, límites y políticas de terceros.

### Carga dinámica de módulos

Aura Weather carga módulos especializados para determinadas funcionalidades interactivas.

**Ventaja:** permite separar la lógica y reducir la carga inicial de funcionalidades que no siempre son necesarias.

**Trade-off:** requiere una organización cuidadosa de módulos y dependencias.

## 8. Seguridad, UX y Accesibilidad

### Seguridad

DemoFactory es una aplicación estática y no administra cuentas, sesiones ni información sensible.

- Sin backend propio.
- Sin base de datos.
- Sin persistencia de usuarios.
- Sin autenticación.
- Enlaces externos protegidos mediante `noopener noreferrer`.

Durante la revisión se identificó un punto de mejora en `aura_weather`, donde algunos datos de geocodificación son insertados mediante `innerHTML`. Este código debería reemplazarse por manipulación segura del DOM utilizando `textContent` y creación explícita de nodos.

Una Content Security Policy también sería una mejora razonable para un despliegue más exigente.

### UX y accesibilidad

Las demos implementan diferentes patrones de interacción:

- Diseño responsive.
- Navegación móvil.
- Scroll suave.
- Animaciones reveal.
- Parallax.
- Estados de carga.
- Feedback visual.
- Navegación mediante teclado.
- `aria-label`.
- `aria-expanded`.
- `aria-live`.

La cobertura de accesibilidad no es completamente homogénea entre todas las experiencias y constituye un área pendiente de consolidación.

## 9. Testing y Calidad

El proyecto prioriza actualmente experimentación frontend, implementación visual e interacción.

Estado actual:

- Sin suite automatizada de tests.
- Sin pipeline independiente de linting.
- Sin pipeline independiente de type-checking.
- CI/CD centrado principalmente en build y despliegue.

Flujo actual:

```text
pnpm install --frozen-lockfile
        ↓
pnpm run build
        ↓
GitHub Pages
```

Por tanto, DemoFactory no se presenta como una aplicación de producción con cobertura automatizada completa.

## 10. Evidencia Visual

### Aeterna

![Demo Aeterna](/images/projects/demofactory/aeterna.png)

*Experiencia narrativa basada en scroll con 12 secciones cronológicas.*

### Aura Weather

![Demo Aura Weather](/images/projects/demofactory/aura-weather.png)

*Aplicación meteorológica interactiva con MapLibre, creative coding y datos meteorológicos externos.*

### Elite Vows

![Demo Elite Vows](/images/projects/demofactory/elite-vows.png)

*Landing editorial para bodas con hero parallax y timeline de ceremonia.*

### Lumina

![Demo Lumina](/images/projects/demofactory/lumina.png)

*Portafolio fotográfico con composición de galería tipo bento.*

### NF Archive

![Demo NF Archive](/images/projects/demofactory/nf-archive.png)

*Experiencia visual basada en discografía y contenido musical.*

### Tech Nexus Consulting

![Demo Tech Nexus Consulting](/images/projects/demofactory/tech-nexus-consulting.png)

*Landing B2B de consultoría tecnológica con métricas, servicios y FAQ.*

## 11. Estado Actual, Limitaciones y Evolución

**Clasificación:** Demo / Proyecto de Portafolio

DemoFactory es un proyecto frontend funcional orientado a demostrar diseño UI/UX, interacción, creative coding y arquitectura web estática.

### Estado observable

- 6 demos locales.
- 10 proyectos mostrados en el índice principal.
- 15 páginas HTML generadas.
- Sin suite automatizada de tests.

Estas métricas describen el tamaño y actividad del proyecto, no su calidad.

### Limitaciones

- Sin backend.
- Formularios simulados.
- Sin persistencia de datos.
- Sin tests automatizados.
- Cobertura de accesibilidad desigual.
- Algunos patrones de UI duplicados.
- Dependencia de APIs y servicios externos.
- Sin observabilidad ni analytics integrados.
- Manejo de errores externos mejorable.
- Algunos aspectos de la documentación interna necesitan sincronización con la implementación.

### Evolución prevista

1. Añadir tests unitarios para la lógica de Aura Weather.
2. Añadir tests E2E para interacciones críticas.
3. Integrar linting y type-checking en CI.
4. Centralizar schemas de contenido.
5. Extraer patrones de UI realmente compartidos.
6. Mejorar el manejo visible de errores de APIs.
7. Eliminar el uso inseguro de `innerHTML`.
8. Centralizar la internacionalización de elementos de accesibilidad.
9. Actualizar documentación interna.
10. Incorporar mediciones formales de rendimiento antes de publicar claims de rendimiento.

## 12. Qué Demuestra Este Proyecto

DemoFactory demuestra experiencia en:

- Arquitectura frontend con Astro.
- Static Site Generation.
- TypeScript.
- Tailwind CSS v4.
- Arquitecturas content-driven.
- Internacionalización basada en rutas.
- Integración de APIs externas.
- Mapas interactivos con MapLibre.
- Canvas y SVG.
- Sistemas de partículas.
- Animaciones y transiciones complejas.
- Responsive design.
- Optimización de assets.
- CI/CD con GitHub Actions.
- Aislamiento de experiencias frontend.

El principal valor técnico del proyecto está en demostrar la capacidad de convertir conceptos visuales muy diferentes en experiencias funcionales manteniendo una infraestructura común deliberadamente pequeña.

### Descripción corta

Hub bilingüe de seis demos UI/UX construido con Astro, TypeScript y Tailwind CSS v4, con experiencias editoriales, interfaces B2B y una aplicación meteorológica interactiva con MapLibre y creative coding.

### Descripción profesional

DemoFactory es un proyecto de portafolio frontend que reúne seis experiencias UI/UX independientes dentro de una arquitectura estática y content-driven. Construido con Astro, TypeScript y Tailwind CSS v4, incorpora internacionalización basada en rutas, integración de APIs externas, mapas interactivos y técnicas de creative coding como sistemas de partículas, Canvas, SVG y transiciones metaball. El proyecto explora cómo mantener experiencias frontend heterogéneas aisladas dentro de un único repositorio sin introducir una infraestructura común innecesariamente compleja.
