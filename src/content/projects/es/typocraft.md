---
title: "TypoCraft"
description: "Experiencia editorial interactiva de Markdown que transforma el mismo contenido mediante tres sistemas tipográficos visualmente diferenciados."
subtitle: "Mismo contenido, tres experiencias de lectura completamente diferentes"
stack: "Astro 7.x, React 19, TypeScript 5.7, Tailwind CSS 4.x, Marked"
github: "https://github.com/HC-ONLINE/TypoCraft"
site: "https://hc-online.github.io/TypoCraft/"
---

## 1. Resumen

**TypoCraft** es una experiencia editorial interactiva que permite escribir contenido en Markdown y visualizarlo en tiempo real mediante tres sistemas tipográficos diferentes: **Manuscript**, **Modernist** y **Deep Night**.

El contenido permanece intacto mientras cambia completamente su presentación visual. Cada sistema combina diferentes tipografías, colores, espaciado, composición y elementos decorativos para demostrar cómo el diseño puede transformar la experiencia de lectura sin modificar el contenido.

Construido con **Astro, React, TypeScript y Tailwind CSS**, el proyecto funciona completamente en el navegador y se despliega como una aplicación estática mediante GitHub Pages.

| 3                 | 4                 | 1                | ~560          |
| ----------------- | ----------------- | ---------------- | ------------- |
| sistemas visuales | componentes React | página principal | líneas de TSX |

---

## 2. Objetivo

TypoCraft fue desarrollado como una exploración técnica y visual de la relación entre **contenido, tipografía e interfaz**.

El objetivo técnico era construir una aplicación capaz de:

- Editar Markdown directamente en el navegador.
- Renderizar el contenido en tiempo real.
- Mantener el mismo contenido al cambiar de tema.
- Aplicar sistemas visuales completamente diferentes mediante CSS.
- Mantener una arquitectura frontend ligera y estática.
- Adaptar la experiencia a desktop y dispositivos móviles.

No pretende ser un CMS ni una plataforma SaaS. El proyecto se centra en demostrar **desarrollo frontend, composición editorial, theming e interacción**.

---

## 3. Solución

La aplicación utiliza una interfaz dividida en dos áreas principales:

- **Editor:** permite introducir Markdown y muestra estadísticas del contenido.
- **Preview:** transforma inmediatamente el Markdown en HTML y aplica el sistema visual seleccionado.

El usuario puede cambiar entre tres experiencias:

### Manuscript

Sistema inspirado en publicaciones editoriales clásicas, utilizando tipografía serif, fondo tipo pergamino, capitulares y elementos ornamentales.

### Modernist

Composición editorial contemporánea basada en una página A4 flotante, tipografía sans-serif y una jerarquía visual minimalista.

### Deep Night

Interfaz oscura inspirada en herramientas de desarrollo, con una ventana de navegador simulada y una estética próxima a un editor de código.

### Flujo de procesamiento

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

---

## 4. Arquitectura

![Diagrama de arquitectura de TypoCraft](/images/projects/typocraft/architecture.png)

*Diagrama de la arquitectura: GitHub Pages, Astro, React, componentes, marked, sistemas CSS y navegador.*

TypoCraft utiliza una arquitectura frontend sin backend:

- **Astro** genera el shell estático.
- **React** gestiona el estado y la interacción.
- **marked** transforma Markdown en HTML.
- **CSS y Tailwind** proporcionan los sistemas visuales.
- **GitHub Pages** sirve la aplicación generada.

No existen API, base de datos, autenticación ni almacenamiento remoto.

Esta arquitectura mantiene el proyecto simple y adecuado para una experiencia interactiva estática.

---

## 5. Stack tecnológico

| Tecnología       | Uso                                  |
| ---------------- | ------------------------------------ |
| Astro 7.x        | Shell, routing y generación estática |
| React 19         | Interactividad y gestión del estado  |
| TypeScript 5.7   | Tipado estático                      |
| Tailwind CSS 4.x | Estilos y diseño responsive          |
| marked 18.x      | Procesamiento Markdown               |
| Vite             | Build                                |
| pnpm             | Gestión de paquetes                  |
| GitHub Actions   | Automatización del despliegue        |
| GitHub Pages     | Hosting estático                     |

### Tipografías

- Epilogue
- Inter
- JetBrains Mono
- Crimson Pro
- Material Symbols

---

## 6. Funcionalidades

- Editor Markdown con preview en tiempo real.
- Tres sistemas visuales: Manuscript, Modernist y Deep Night.
- Cambio de tema sin perder el contenido.
- Numeración dinámica de líneas.
- Contador de caracteres.
- Contador de líneas.
- Renderizado Markdown específico para cada tema.
- Scrollbars personalizadas.
- Capitulares y ornamentación en Manuscript.
- Composición A4 flotante en Modernist.
- Simulación de ventana de navegador en Deep Night.
- Indicador de renderizado en tiempo real.
- Diseño responsive.
- Navegación adaptada a desktop y mobile.
- Despliegue automatizado mediante GitHub Actions.

---

## 7. Decisiones técnicas

### Astro + React

Astro se utiliza como shell estático y React se reserva para la experiencia interactiva.

**Ventaja:** mantiene el despliegue estático y concentra JavaScript en la parte que realmente necesita interactividad.

**Trade-off:** gran parte de la experiencia interactiva reside en un único React island, por lo que el proyecto no explota completamente la arquitectura de islands de Astro.

### `marked`

Se utiliza para transformar Markdown en HTML durante la edición.

**Ventaja:** API sencilla y procesamiento directo en el navegador.

**Trade-off:** el HTML generado requiere sanitización si en el futuro el contenido deja de ser exclusivamente local o comienza a almacenarse, compartirse o publicarse.

### Theming mediante CSS

Los sistemas visuales se implementan mediante clases y variables CSS.

**Ventaja:** permite modificar radicalmente la presentación sin modificar el contenido ni el flujo principal de procesamiento.

**Trade-off:** actualmente agregar un nuevo sistema visual requiere modificar componentes y estilos asociados.

### Sin persistencia

El contenido permanece únicamente en el estado de la aplicación.

**Ventaja:** mantiene la arquitectura simple y sin dependencias externas.

**Trade-off:** el contenido se pierde al recargar la página.

---

## 8. Seguridad y calidad

### Seguridad

La aplicación no dispone de backend ni transmite el contenido introducido por el usuario.

El preview utiliza `dangerouslySetInnerHTML` para insertar el HTML generado por `marked`. En la arquitectura actual, el contenido permanece local y no existe persistencia ni intercambio remoto.

Si el proyecto incorporara almacenamiento, publicación o intercambio de documentos, sería necesario incorporar sanitización de HTML antes de renderizar contenido no confiable.

### Calidad actual

Actualmente no existen:

- Tests unitarios.
- Tests de integración.
- Tests E2E.
- Cobertura automatizada.
- Linting automatizado.

GitHub Actions automatiza actualmente el proceso de build y despliegue.

Estas capacidades forman parte de la evolución técnica pendiente y no representan funcionalidades implementadas actualmente.

---

## 9. Experiencia de usuario

La interfaz ocupa prácticamente todo el viewport y está organizada alrededor de dos elementos principales:

- Editor Markdown.
- Preview en tiempo real.

### Desktop

El editor y la previsualización se muestran lado a lado.

### Mobile

Los paneles pasan a una composición vertical y los controles de selección de tema se adaptan al espacio disponible.

### Interacción

Cada modificación del Markdown actualiza inmediatamente la previsualización.

El cambio de tema es instantáneo y conserva el contenido actual.

La principal característica de UX es que **el usuario puede experimentar con distintas decisiones visuales sin modificar el contenido que está escribiendo**.

---

## 10. Evidencia visual

<!-- IMAGE 01 — Modernist -->

![Editor y preview con tema Modernist](/images/projects/typocraft/modernist.png)

*Vista completa del sistema Modernist: editor Markdown a la izquierda y composición A4 flotante a la derecha.*

<!-- IMAGE 02 — Manuscript -->

![Tema Manuscript con capitular y ornamentación](/images/projects/typocraft/manuscript.png)

*Vista del sistema Manuscript mostrando tipografía serif, fondo tipo pergamino, capitular decorativa y elementos ornamentales.*

<!-- IMAGE 03 — Deep Night -->

![Tema Deep Night con browser chrome mockup](/images/projects/typocraft/deepnight.png)

*Vista del sistema Deep Night con estética de editor de código, ventana de navegador simulada y composición oscura.*

---

## 11. Estado actual

### Clasificación: Demo / Proof of Concept

TypoCraft cumple actualmente como demostración de:

- Desarrollo frontend con Astro y React.
- Diseño de sistemas visuales.
- Procesamiento de Markdown en tiempo real.
- Diseño editorial y tipográfico.
- Responsive design.
- Integración de React mediante Astro Islands.
- Automatización de build y despliegue.

No se presenta como un editor Markdown de producción porque actualmente no incluye persistencia, exportación, colaboración ni una suite de pruebas automatizadas.

---

## 12. Limitaciones y evolución

### Limitaciones actuales

- El contenido se pierde al recargar.
- No existe exportación Markdown, HTML o PDF.
- No existe syntax highlighting.
- No existe colaboración.
- No existen tests automatizados.
- No existe linting independiente en CI.
- Existen dependencias que deben revisarse.
- Los nuevos temas requieren implementación manual.
- El HTML generado no se sanitiza.
- Parte de la configuración visual está duplicada entre React y CSS.

### Evolución propuesta

1. Añadir persistencia local mediante `localStorage` o IndexedDB.
2. Incorporar exportación Markdown, HTML y PDF.
3. Añadir syntax highlighting.
4. Permitir redimensionar editor y preview.
5. Incorporar búsqueda dentro del documento.
6. Convertir los temas en una configuración más declarativa.
7. Añadir tests automatizados.
8. Incorporar sanitización de HTML.
9. Revisar y eliminar dependencias innecesarias.
10. Añadir análisis automatizado de vulnerabilidades al pipeline.

La evolución debe priorizar la mejora de las capacidades existentes antes de introducir nuevas tecnologías.

---

## 13. Qué demuestra el proyecto

TypoCraft demuestra experiencia práctica en:

- **Arquitectura frontend con Astro + React.**
- **Gestión de estado en React.**
- **Astro Islands.**
- **Diseño responsive.**
- **Sistemas visuales mediante CSS.**
- **Theming mediante variables y clases.**
- **Procesamiento de Markdown en tiempo real.**
- **Diseño tipográfico y composición editorial.**
- **Componentización de interfaces.**
- **Automatización con GitHub Actions.**
- **Despliegue estático en GitHub Pages.**
- **Separación entre contenido, lógica de procesamiento y presentación visual.**
