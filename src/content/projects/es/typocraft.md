---
title: "TypoCraft"
description: "Editor interactivo de Markdown con previsualización en tiempo real que transforma el mismo contenido mediante tres sistemas tipográficos visualmente diferenciados"
subtitle: "Mismo contenido, tres experiencias de lectura completamente diferentes"
stack: "Astro 7.x, React 19, TypeScript 5.7, Tailwind CSS 4.x, Marked"
github: "https://github.com/HC-ONLINE/TypoCraft"
site: "https://hc-online.github.io/TypoCraft/"
---

## Resumen

TypoCraft es un editor interactivo de Markdown con previsualización en tiempo real que transforma el mismo contenido mediante tres sistemas tipográficos visualmente diferenciados: **Manuscript**, **Modernist** y **Deep Night**.

Cada tema combina tipografía, color, espaciado, composición y elementos decorativos diferentes para demostrar cómo las decisiones tipográficas pueden modificar radicalmente la percepción de un mismo contenido.

Construido con **Astro, React, TypeScript y Tailwind CSS**, el proyecto funciona completamente en el navegador y se despliega como contenido estático en GitHub Pages.

## Contexto / Problema

### Objetivo técnico

Construir un editor de Markdown basado en navegador capaz de renderizar contenido en tiempo real utilizando diferentes sistemas visuales y tipográficos.

### Objetivo de diseño

Explorar la relación entre **escritura y diseño**, demostrando que la presentación visual de un texto puede modificar significativamente su experiencia de lectura sin alterar su contenido.

TypoCraft no parte de un problema de negocio específico ni pretende ser un CMS o plataforma SaaS. Es principalmente una **demostración técnica y de diseño frontend**.

## Solución

TypoCraft utiliza una interfaz dividida en dos áreas:

- **Editor:** textarea para introducir Markdown, con numeración de líneas y estadísticas del contenido.
- **Preview:** representación HTML del Markdown actualizada en tiempo real.

El usuario puede cambiar entre tres temas sin perder el contenido:

### Manuscript

Sistema visual inspirado en publicaciones clásicas, con tipografía serif, fondo tipo pergamino, capitular y elementos ornamentales.

### Modernist

Diseño editorial contemporáneo basado en una composición limpia, una página A4 flotante, tipografía sans-serif y jerarquía visual minimalista.

### Deep Night

Interfaz oscura inspirada en entornos de desarrollo, con una ventana de navegador simulada y una estética cercana a los editores de código.

### Flujo

```text
Markdown del usuario
        ↓
Estado de React
        ↓
marked
        ↓
HTML generado
        ↓
Tema seleccionado
        ↓
Preview tipográfico
```

Todo el procesamiento ocurre localmente en el navegador.

## Arquitectura

TypoCraft utiliza una arquitectura frontend sencilla:

![Diagrama de arquitectura de TypoCraft](/images/projects/typocraft/architecture.png)

_Diagrama de la arquitectura: GitHub Pages, Astro build, React island, componentes, marked, CSS themes y output en navegador._

No existe backend, API, base de datos, autenticación ni almacenamiento remoto.

Astro genera el shell estático y React gestiona la interactividad de la aplicación mediante hidratación en cliente.

## Stack tecnológico

### Frontend

| Tecnología       | Función                                |
| ---------------- | -------------------------------------- |
| Astro 7.x        | Shell, routing y generación estática   |
| React 19         | Interactividad y gestión del estado    |
| TypeScript 5.7   | Tipado estático                        |
| Tailwind CSS 4.x | Sistema de estilos y responsive design |

### Procesamiento de Markdown

| Tecnología  | Función                       |
| ----------- | ----------------------------- |
| marked 18.x | Conversión de Markdown a HTML |

### Tipografía

- Epilogue
- Inter
- JetBrains Mono
- Crimson Pro
- Material Symbols

### Build y despliegue

- pnpm
- GitHub Actions
- GitHub Pages
- Vite

El pipeline automatiza el build y despliegue al realizar cambios en `main`.

## Funcionalidades implementadas

- Editor Markdown con preview en tiempo real.
- Tres sistemas visuales: Manuscript, Modernist y Deep Night.
- Cambio de tema sin pérdida de contenido.
- Numeración dinámica de líneas.
- Contador de caracteres.
- Contador de líneas.
- Layout responsive.
- Scrollbars personalizadas por tema.
- Renderizado Markdown con estilos específicos por tema.
- Capitular y elementos ornamentales en Manuscript.
- Composición A4 flotante en Modernist.
- Simulación de ventana de navegador en Deep Night.
- Indicador visual de "Live Render".
- Navegación adaptada para desktop y mobile.
- Despliegue automático mediante GitHub Actions.

### Código sin uso detectado

Existe una utilidad `cn()` en `lib/utils.ts`, pero no es utilizada por los componentes actuales.

También existen dependencias declaradas que no participan en la aplicación:

- `next`
- `shadcn`
- `@base-ui/react`
- `class-variance-authority`
- `tailwind-merge`
- `tw-animate-css`

Estas parecen corresponder a scaffolding previo y deberían eliminarse si el proyecto continúa evolucionando.

## Decisiones técnicas relevantes

### Astro + React

Astro se utiliza como shell estático y React únicamente para la interfaz interactiva.

**Ventaja:** mantiene el sitio estático y limita la ejecución de JavaScript a la parte interactiva.

**Trade-off:** la aplicación concentra prácticamente toda la experiencia en un único island de React, por lo que no explota completamente el modelo de islands de Astro.

### `marked`

Se utiliza para transformar Markdown en HTML en tiempo real.

**Ventaja:** API sencilla y procesamiento rápido.

**Trade-off:** no incorpora syntax highlighting y requiere una capa adicional de sanitización si el contenido llegara a almacenarse o compartirse.

### Theming basado en CSS

Los temas se aplican mediante clases y variables CSS.

**Ventaja:** permite modificar radicalmente la presentación sin alterar el contenido ni la lógica de Markdown.

**Trade-off:** agregar un nuevo tema requiere modificar manualmente varios componentes y las reglas CSS correspondientes.

### Sin persistencia

El contenido únicamente existe en el estado de la aplicación.

**Ventaja:** mantiene el proyecto simple y apropiado para una demo.

**Trade-off:** todo el contenido se pierde al recargar la página.

## Seguridad

La aplicación no dispone de backend ni transmite el contenido introducido por el usuario.

Por ello, la superficie de ataque es reducida.

### Consideración importante

El preview utiliza `dangerouslySetInnerHTML` para insertar el HTML generado por `marked`.

En el contexto actual esto no constituye un problema práctico porque el contenido permanece local. Sin embargo, **si TypoCraft incorporara persistencia, publicación o intercambio de documentos, debería incorporarse sanitización mediante DOMPurify o una alternativa equivalente**.

También sería recomendable incorporar análisis automatizado de dependencias en CI.

## Testing y calidad

Actualmente:

- No existen tests unitarios.
- No existen tests de integración.
- No existen tests E2E.
- No existe cobertura de código.
- No existe linting automatizado.
- CI ejecuta el build, pero no un proceso independiente de lint/type checking.

El build de Astro/TypeScript constituye actualmente el principal control automático de calidad.

## Experiencia de usuario

### Estructura

La interfaz ocupa prácticamente todo el viewport:

- Editor Markdown.
- Preview en tiempo real.
- Barra de navegación fija.
- Selector de tema.

### Responsive

**Desktop:** editor y preview aparecen lado a lado.

**Mobile:** ambos paneles pasan a una composición vertical.

La navegación también adapta el selector de temas para utilizar controles circulares en pantallas pequeñas.

### Interacción

Cada modificación del Markdown actualiza inmediatamente la previsualización.

El cambio de tema es instantáneo y mantiene intacto el contenido.

## Visuales

<!-- IMAGE 01 — Modernist -->

![Editor y preview con tema Modernist](/images/projects/typocraft/modernist.png)

_Vista completa con el tema Modernist: editor Markdown a la izquierda, preview con composición A4 flotante a la derecha._

<!-- IMAGE 02 — Manuscript -->

![Tema Manuscript con capitular y ornamentación](/images/projects/typocraft/manuscript.png)

_Vista del tema Manuscript mostrando la tipografía serif, el fondo tipo pergamino, la capitular decorativa y los elementos ornamentales._

<!-- IMAGE 03 — Deep Night -->

![Tema Deep Night con browser chrome mockup](/images/projects/typocraft/deepnight.png)

_Tema Deep Night con estética de editor de código, ventana de navegador simulada y paleta de colores oscura._

## Métricas

No existen métricas de rendimiento, Lighthouse, cobertura o bundle size verificadas en el proyecto.

Datos observables:

- 4 componentes React.
- 1 layout Astro.
- 1 página principal.
- 3 sistemas visuales.
- ~560 líneas de código TSX.
- ~187 líneas de CSS.
- Despliegue estático en GitHub Pages.

No recomendaría convertir estos datos en "métricas de rendimiento"; son únicamente indicadores de tamaño y estructura del proyecto.

## Estado actual

### Clasificación: Demo / Proof of Concept

La clasificación se justifica por:

- Versión `0.1.0`.
- Ausencia de persistencia.
- Ausencia de backend.
- Ausencia de tests.
- Dependencias sin utilizar.
- Sin exportación de contenido.
- Sin colaboración.
- Despliegue orientado a demo mediante GitHub Pages.

El proyecto cumple correctamente como **demostración de frontend, diseño tipográfico e interacción**, pero no debería presentarse actualmente como un editor Markdown listo para producción.

## Limitaciones

- El contenido se pierde al recargar.
- No existe exportación Markdown/HTML/PDF.
- No existe syntax highlighting.
- No existe colaboración.
- No existen tests.
- No existe linting en CI.
- Existen dependencias innecesarias.
- Los nuevos temas requieren modificaciones manuales.
- `dangerouslySetInnerHTML` no utiliza sanitización.
- Existe duplicación entre algunas variables CSS y estilos definidos en React.
- No existe persistencia local ni remota.

## Evolución futura

Posibles mejoras:

- Persistencia mediante `localStorage` o IndexedDB.
- Exportación a Markdown, HTML o PDF.
- Syntax highlighting mediante Shiki.
- Editor con división redimensionable.
- Búsqueda dentro del documento.
- Sistema configurable de temas.
- Creador visual de temas.
- Tests con Vitest/React Testing Library.
- Sanitización del HTML.
- Limpieza de dependencias.
- Análisis de vulnerabilidades automatizado en CI.

No existe actualmente un roadmap formal en el repositorio.

## Qué demuestra este proyecto

TypoCraft demuestra principalmente:

- **Arquitectura frontend con Astro + React.**
- **Gestión de estado en React.**
- **Integración de React mediante Astro Islands.**
- **Diseño responsive.**
- **Diseño de sistemas visuales mediante CSS.**
- **Theming avanzado mediante variables y clases.**
- **Procesamiento de Markdown en tiempo real.**
- **Diseño tipográfico y composición editorial.**
- **Componentización de interfaces.**
- **Automatización de build y despliegue mediante GitHub Actions.**
- **Despliegue estático en GitHub Pages.**
