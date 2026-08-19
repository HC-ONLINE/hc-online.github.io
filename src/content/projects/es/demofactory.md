---
title: "DemoFactory"
description: "Portafolio de proyectos UI/UX con demos interactivas de alta fidelidad"
subtitle: "Portafolio de proyectos UI/UX con demos interactivas de alta fidelidad"
stack: "Astro 7.x, TypeScript, Tailwind CSS v4, MapLibre GL, Sharp"
github: "https://github.com/HC-ONLINE/DemoFactory"
site: "https://hc-online.github.io/DemoFactory/"
---

# DemoFactory

## Resumen

DemoFactory es un **hub de demostraciones UI/UX de alta fidelidad** construido con Astro, TypeScript y Tailwind CSS v4. El proyecto reúne seis experiencias web independientes dentro de una misma aplicación, manteniendo cada demo aislada a nivel de componentes y contenido.

La arquitectura utiliza un enfoque **content-driven**, separando el contenido de las implementaciones visuales mediante archivos Markdown bilingües en español e inglés. El proyecto combina experiencias editoriales, interfaces corporativas, narrativas inmersivas y una aplicación de creative coding basada en datos meteorológicos reales.

Además de demostrar capacidad de diseño frontend, DemoFactory funciona como un ejercicio de arquitectura para organizar múltiples productos visuales independientes dentro de un único repositorio sin convertirlos en una aplicación monolítica.

## Contexto y objetivo

DemoFactory surge de la necesidad de construir y presentar diferentes demostraciones de interfaces sin crear un repositorio completamente independiente para cada experiencia.

El objetivo técnico es establecer una estructura común mínima que permita:

- Mantener cada demo visualmente y funcionalmente aislada.
- Compartir infraestructura común como layouts, estilos, tipografías y utilidades.
- Gestionar contenido de forma independiente al código de presentación.
- Soportar español e inglés mediante rutas y contenido paralelos.
- Incorporar experiencias interactivas avanzadas sin introducir un backend innecesario.
- Desplegar todo el conjunto como un sitio estático.

El resultado es una especie de **fábrica de demos frontend**, donde nuevas experiencias pueden incorporarse siguiendo una convención común.

## Solución

La aplicación está organizada alrededor de un índice principal que presenta las diferentes experiencias y de componentes independientes para cada demo.

Actualmente contiene **seis demos locales**:

- **Aeterna** — experiencia narrativa basada en scroll y diferentes épocas históricas.
- **Aura Weather** — aplicación meteorológica interactiva con mapa, partículas y creative coding.
- **Elite Vows** — landing editorial para una experiencia de boda.
- **Lumina** — portafolio editorial con galería tipo bento.
- **NF Archive** — experiencia visual centrada en una discografía musical.
- **Tech Nexus Consulting** — landing B2B orientada a servicios de consultoría tecnológica.

El índice también permite enlazar otras experiencias desarrolladas fuera del repositorio.

Cada demo cuenta con su propio componente principal, contenido localizado y ruta independiente, mientras que la infraestructura compartida se mantiene reducida para evitar acoplamiento entre proyectos.

## Arquitectura

DemoFactory utiliza una arquitectura **estática y content-driven**.

![Diagrama de arquitectura de DemoFactory](/images/projects/demofactory/architecture.png)

_Flujo content-driven: Markdown → rutas es/en → componentes aislados → capa compartida → scripts de cliente → SSG → GitHub Pages._

### Frontend

Astro se utiliza como framework principal y genera las páginas mediante **Static Site Generation (SSG)**.

La mayor parte de la aplicación se renderiza durante el build. Las funcionalidades interactivas se ejecutan exclusivamente en el navegador mediante scripts de cliente.

### Contenido

Los textos de las demos se mantienen separados de la implementación visual mediante Markdown.

La estructura permite mantener versiones:

```text
src/content/demos/<demo>/es.md
src/content/demos/<demo>/en.md
```

Esto permite modificar contenido sin tener que modificar directamente los componentes visuales.

### Aislamiento de demos

Cada experiencia dispone de su propio componente principal:

```text
src/components/
├── aeterna/
├── aura_weather/
├── elite-vows/
├── lumina/
├── nf-archive/
└── tech-nexus-consulting/
```

La decisión busca evitar que la lógica de una demo dependa de la implementación de otra.

## Stack tecnológico

### Frontend

- **Astro 7.0.6** — framework principal y generación estática.
- **TypeScript** — lógica de aplicación y scripts de cliente.
- **Tailwind CSS v4** — sistema de estilos.
- **MapLibre GL 5.24.0** — mapa interactivo utilizado por `aura_weather`.
- **CSS / Canvas / SVG** — animaciones, partículas y efectos visuales.
- **Astro Assets / Sharp** — procesamiento y optimización de imágenes.
- **Fuentes autoalojadas** — reducción de dependencias externas y control tipográfico.

### APIs externas

La demo meteorológica integra:

- **Open-Meteo** — datos meteorológicos.
- **Nominatim** — búsqueda y geocodificación.
- **OpenFreeMap** — tiles del mapa.

Estas integraciones no requieren claves API para el funcionamiento implementado.

### Infrastructure

- **GitHub Pages** — hosting estático.
- **GitHub Actions** — automatización del build y despliegue.
- **pnpm** — gestión de dependencias.
- **Node.js 22** — entorno de build.

No existe backend, base de datos ni servidor propio.

## Funcionalidades principales

### Hub bilingüe

El índice principal proporciona:

- Navegación entre demos.
- Soporte español/inglés.
- Grid de proyectos.
- Modo oscuro persistente.
- Imágenes optimizadas y responsive.
- Enlaces a proyectos externos.

### Aeterna

Experiencia narrativa basada en scroll que presenta diferentes épocas históricas.

![aeterna](/images/projects/demofactory/aeterna.png)

Incluye:

- 12 secciones cronológicas.
- Navegación mediante puntos.
- Detección de sección mediante `IntersectionObserver`.
- Indicador de época activo.
- Animaciones CSS.
- Sistema de partículas.
- Tipografías dedicadas.

### Aura Weather

Es la demo técnicamente más compleja del proyecto.

Integra un mapa interactivo con información meteorológica real y transforma los estados climáticos en una experiencia visual.

![aura_weather](/images/projects/demofactory/aura-weather.png)

Incluye:

- Mapa interactivo con MapLibre.
- Búsqueda de ciudades.
- Geolocalización.
- Datos meteorológicos mediante Open-Meteo.
- Caché temporal de resultados.
- Debounce en búsquedas.
- Soporte de teclado.
- Partículas de lluvia y nieve.
- Física y colisiones.
- Transiciones metaball.
- Gradientes interpolados.
- Seis estados climáticos.
- Modo de demostración.
- Internacionalización.

La lógica visual utiliza Canvas 2D y filtros SVG para producir los efectos sin introducir una dependencia de WebGL.

### Elite Vows

Landing editorial orientada a una experiencia de boda.

![elite-vows](/images/projects/demofactory/elite-vows.png)

Incluye:

- Hero con parallax.
- Timeline.
- Navegación móvil.
- Scroll suave.
- Animaciones reveal.
- Formulario RSVP simulado.

### Lumina

Portafolio editorial centrado en composición visual.

![lumina](/images/projects/demofactory/lumina.png)

Incluye:

- Galería tipo bento.
- Animaciones reveal.
- Diseño responsive.
- Sistema tipográfico orientado a contenido visual.

### NF Archive

Experiencia de navegación de una discografía.

![nf-archive](/images/projects/demofactory/nf-archive.png)

Incluye:

- Información estructurada de álbumes.
- Tracks.
- Estadísticas.
- Enlaces externos.
- Integración visual con una identidad musical.

### Tech Nexus Consulting

Landing B2B para una empresa ficticia de consultoría tecnológica.

![tech-nexus-consulting](/images/projects/demofactory/tech-nexus-consulting.png)

Incluye:

- Métricas.
- FAQ mediante elementos HTML nativos.
- Navegación mediante anclas.
- Scroll suave.
- Formulario de auditoría simulado.
- Diseño responsive.

## Decisiones técnicas relevantes

### Separación de contenido y presentación

El contenido se mantiene en Markdown mientras que la presentación permanece en componentes Astro.

Esto permite modificar textos, traducciones y metadatos sin alterar la implementación visual.

**Trade-off:** cada demo mantiene su propia estructura de datos, por lo que existe cierta duplicación de interfaces y convenciones.

### Una demo = una unidad aislada

Cada experiencia dispone de su propio componente y lógica.

Esto facilita experimentar con diferentes arquitecturas visuales sin introducir dependencias innecesarias entre demos.

**Trade-off:** algunos patrones de interfaz, como menús móviles o animaciones reveal, se repiten entre proyectos.

### SSG en lugar de backend

El proyecto no necesita autenticación, base de datos ni servidor porque su objetivo principal es presentar experiencias frontend.

El uso de SSG permite:

- Hosting gratuito.
- Menor superficie de ataque.
- HTML pre-renderizado.
- Despliegues sencillos.
- Ausencia de secretos de servidor.

La contrapartida es que las funcionalidades dinámicas deben ejecutarse en el navegador.

### APIs públicas sin autenticación

`aura_weather` utiliza servicios gratuitos sin API keys para evitar una infraestructura adicional.

Se complementa con caché y debounce para reducir solicitudes innecesarias.

La principal limitación es la dependencia de disponibilidad y políticas de uso de servicios externos.

### Imports dinámicos

La demo meteorológica carga módulos especializados dinámicamente para separar funcionalidades como:

- mapa,
- partículas,
- metaballs,
- gradientes,
- clima.

Esto permite mantener parte de la funcionalidad fuera del bundle inicial.

### Optimización de recursos

Las imágenes se procesan mediante las herramientas de Astro y se sirven en formatos optimizados.

Las fuentes principales se alojan localmente y se utilizan imports dinámicos para determinadas funcionalidades interactivas.

## Seguridad

DemoFactory no maneja cuentas, sesiones ni información sensible.

Al tratarse de un sitio principalmente estático:

- No existen credenciales de backend.
- No existe base de datos.
- No existe almacenamiento de información de usuarios.
- No existe autenticación.
- Los enlaces externos utilizan `noopener noreferrer`.

Durante la revisión se identificó una mejora pendiente en `aura_weather`: determinados resultados provenientes del servicio de geocodificación se insertan mediante `innerHTML`. Aunque el origen sea un servicio externo, la práctica debería sustituirse por creación segura de nodos DOM y `textContent`.

También sería razonable incorporar una política CSP si el proyecto evoluciona hacia un despliegue más exigente.

## Calidad y testing

El proyecto actualmente prioriza la experimentación visual y la construcción de demos.

El repositorio no contiene una suite automatizada de tests ni scripts independientes de linting o type checking.

El pipeline de CI/CD ejecuta principalmente:

```text
pnpm install --frozen-lockfile
        ↓
pnpm run build
        ↓
GitHub Pages
```

Por tanto, no se debe presentar el proyecto como una aplicación con cobertura automatizada completa.

Esta es una de las áreas principales de mejora si DemoFactory evolucionara hacia una plataforma frontend de producción.

## UX y accesibilidad

Las demos implementan diferentes patrones de interacción:

- Responsive design.
- Navegación móvil.
- Scroll suave.
- Animaciones reveal.
- Parallax.
- Estados de carga.
- Feedback visual.
- Navegación por secciones.
- Controles de teclado.
- `aria-label`.
- `aria-expanded`.
- `aria-live`.

La accesibilidad no es completamente homogénea entre todas las demos. Algunas etiquetas compartidas permanecen en español incluso dentro de la versión inglesa, por lo que existe margen para centralizar la internacionalización de atributos accesibles.

## CI/CD

El proyecto utiliza GitHub Actions para automatizar el despliegue.

```text
Push a main
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

Esto permite que las modificaciones del repositorio puedan convertirse automáticamente en una nueva versión publicada del sitio.

## Métricas verificables

Durante la revisión del repositorio se identificaron:

- **6 demos locales**.
- **10 proyectos mostrados en el índice**, considerando demos locales y enlaces externos.
- **15 páginas HTML generadas** en el build: índice + seis demos × dos idiomas.
- **35 commits** registrados durante el periodo analizado.
- Desarrollo concentrado durante julio de 2026.
- `aura_weather/App.astro` con aproximadamente 900 líneas.
- Hoja de estilos de `aeterna` con aproximadamente 1.288 líneas.
- 0 suites de tests automatizados.
- 0 scripts independientes de lint/typecheck.

No se incluyen métricas de rendimiento como FPS, Lighthouse o tamaño de bundle porque no fueron medidas formalmente en el repositorio.

## Limitaciones actuales

DemoFactory es una demostración frontend y no pretende ser una plataforma de producción.

Sus principales limitaciones son:

- No existe backend.
- Los formularios son simulaciones.
- No existe persistencia de datos.
- No hay suite automatizada de tests.
- La cobertura de accesibilidad no es uniforme.
- Algunas demos duplican patrones de UI.
- Las APIs meteorológicas dependen de terceros.
- No existe observabilidad o analytics integrados.
- Parte de la documentación interna quedó desactualizada respecto a la estructura final.
- Algunas funcionalidades requieren mejoras de manejo de errores.

Estas limitaciones son coherentes con el objetivo principal del proyecto: **demostrar capacidades de frontend, interacción y arquitectura de experiencias web**.

## Evolución futura

Las mejoras técnicas más relevantes serían:

1. Incorporar tests unitarios para la lógica de `aura_weather`.
2. Añadir pruebas E2E para las interacciones principales.
3. Integrar linting y type checking en CI.
4. Centralizar los schemas de contenido.
5. Extraer componentes de UI repetidos entre demos.
6. Mejorar el manejo visible de errores de APIs.
7. Sustituir manipulaciones DOM mediante `innerHTML`.
8. Centralizar la internacionalización de atributos de accesibilidad.
9. Actualizar la documentación para reflejar la estructura real del proyecto.
10. Incorporar mediciones reales de rendimiento antes de publicar métricas.

## Qué demuestra este proyecto

DemoFactory demuestra principalmente capacidad para:

- Diseñar y estructurar experiencias frontend independientes.
- Trabajar con **Astro y generación estática**.
- Utilizar **TypeScript** en aplicaciones frontend.
- Implementar sistemas visuales con **Tailwind CSS v4**.
- Diseñar arquitecturas **content-driven**.
- Implementar internacionalización mediante rutas y contenido.
- Integrar APIs externas.
- Trabajar con mapas interactivos mediante MapLibre.
- Implementar creative coding con Canvas y SVG.
- Crear sistemas de partículas y animaciones complejas.
- Optimizar imágenes y recursos frontend.
- Diseñar interfaces responsive.
- Implementar CI/CD mediante GitHub Actions.
- Separar experimentación visual de infraestructura compartida.

Más que un simple conjunto de landing pages, el proyecto demuestra la capacidad de **convertir diferentes conceptos visuales en experiencias web funcionales manteniendo una estructura técnica común**.

## Descripción corta

**DemoFactory** es un hub bilingüe de seis demos UI/UX de alta fidelidad construido con Astro, TypeScript y Tailwind CSS v4. Incluye experiencias editoriales, interfaces corporativas y una aplicación meteorológica interactiva con MapLibre, partículas, Canvas, metaballs y APIs externas.

## Tecnologías

`Astro` · `TypeScript` · `Tailwind CSS v4` · `MapLibre GL` · `Canvas 2D` · `SVG` · `Open-Meteo` · `Nominatim` · `OpenFreeMap` · `GitHub Actions` · `GitHub Pages` · `pnpm`

## Estado

**Demo / Portfolio Project**

Proyecto desarrollado para explorar y demostrar diferentes enfoques de UI/UX, interacción frontend, creative coding y arquitectura estática.

No debe presentarse como un SaaS ni como una aplicación de producción.
