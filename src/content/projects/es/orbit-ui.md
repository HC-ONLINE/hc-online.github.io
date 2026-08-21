---
title: "ORBIT-UI"
description: "Design system CSS-first construido con Astro y Tailwind CSS v4, basado en tokens semánticos y componentes con contratos explícitos."
subtitle: "Design system frontend y arquitectura de componentes"
stack: "Astro, Tailwind CSS v4, TypeScript, GitHub Actions, GitHub Pages"
github: "https://github.com/HC-ONLINE/ORBIT-UI"
---

## Visión general

ORBIT-UI es un design system frontend construido con Astro y Tailwind CSS v4.

El proyecto define una colección de componentes base, tokens semánticos y reglas explícitas de composición orientadas a construir interfaces consistentes sin introducir JavaScript innecesario.

El sistema prioriza el control de complejidad y la consistencia sobre la cantidad de componentes disponibles.

## Arquitectura

ORBIT-UI está organizado en tres capas principales:

```text
Tokens
   │
   ▼
UI Components
   │
   ▼
Documentation
```

Los **tokens semánticos** definen el significado visual del sistema y permanecen desacoplados de componentes concretos.

Los **componentes Astro** utilizan estos tokens mediante variantes, estados y propiedades documentadas.

La **documentación** forma parte del propio proyecto y muestra los componentes, sus contratos, estados, variantes y ejemplos de uso.

La aplicación se genera como un sitio estático mediante Astro y se despliega automáticamente en GitHub Pages.

## Sistema de diseño

### Tokens semánticos

ORBIT-UI utiliza variables CSS semánticas para representar categorías como:

* Surface
* Text
* Accent
* Status
* Typography

Los tokens no están vinculados directamente a componentes específicos.

Esto permite que diferentes componentes compartan las mismas reglas visuales sin crear dependencias entre ellos.

Actualmente se definen:

* 14 tokens de color.
* 2 tokens de tipografía.

### Componentes

El sistema incluye componentes base para diferentes necesidades de interfaz:

* Button
* Card
* Alert
* Badge
* NavLink
* Input
* Select
* Modal
* Table
* Tooltip

Table utiliza además componentes especializados para su composición:

* TableHead
* TableBody
* TableRow
* TableCell
* TableHeadCell

Los componentes contemplan variantes, estados y propiedades específicas según su contrato.

## CSS-first

Una de las decisiones principales del proyecto es minimizar la dependencia de JavaScript del lado del cliente.

La mayoría de los componentes se resuelven mediante HTML y CSS, utilizando las capacidades de Tailwind CSS.

El único componente que requiere JavaScript del cliente es Modal, que utiliza la API nativa `<dialog>` para controlar su apertura y cierre.

Este enfoque permite mantener los componentes base ligeros y evita introducir lógica cliente cuando no es necesaria.

## Contratos de componentes

Cada componente documenta explícitamente cómo debe utilizarse.

La documentación incluye aspectos como:

* Variantes disponibles.
* Estados.
* Propiedades.
* Combinaciones válidas.
* Combinaciones no recomendadas.
* Antipatrones.
* Ejemplos de uso.

Este enfoque busca que el sistema no sea únicamente una colección visual de componentes, sino un conjunto de reglas para mantener consistencia en las interfaces que lo utilizan.

## Documentación

La documentación está integrada directamente en el proyecto mediante páginas Astro.

Incluye:

* Overview del sistema.
* Catálogo de tokens.
* Catálogo de componentes.
* Documentación individual de componentes.
* Ejemplos de variantes y estados.
* Reglas de composición.

Actualmente el sitio contiene 13 páginas de documentación.

La documentación como código permite mantener las explicaciones y las implementaciones dentro del mismo repositorio.

## Accesibilidad

Los componentes incorporan diferentes fundamentos de accesibilidad directamente en su implementación.

Entre ellos:

* `aria-disabled`
* `aria-invalid`
* `aria-current`
* `aria-label`
* `aria-hidden`
* Roles semánticos como `alert` y `status`
* Soporte para estados `disabled` e `invalid`
* Elementos interactivos mediante HTML semántico

El componente NavLink, por ejemplo, identifica automáticamente la ruta activa y utiliza `aria-current`.

El sistema todavía no cuenta con una auditoría automatizada de accesibilidad.

## Responsive design

Los componentes utilizan las capacidades responsive de Tailwind CSS para adaptar layouts e interfaces a diferentes tamaños de pantalla.

El sitio de documentación utiliza layouts flexibles, grids y restricciones de ancho para mantener una presentación consistente.

No se han incorporado tests automatizados específicos para validar el comportamiento responsive.

## Arquitectura técnica

```text
GitHub Pages
      │
      ▼
Astro Static Build
      │
      ├── Pages
      │
      ├── Layouts
      │
      ├── UI Components
      │
      └── Semantic Tokens
             │
             ▼
        Tailwind CSS
```

### Astro

Astro se utiliza como framework de generación estática.

El proyecto utiliza Static Site Generation (SSG), por lo que las páginas pueden desplegarse sin un servidor de aplicación.

### Tailwind CSS

Tailwind CSS v4 proporciona las utilities utilizadas para construir los componentes y permite definir los tokens semánticos mediante `@theme`.

### TypeScript

Los componentes utilizan TypeScript para definir y validar sus propiedades.

El proyecto utiliza la configuración estricta proporcionada por Astro.

## Componentes y estados

Algunos ejemplos de las capacidades implementadas:

**Button**

* Primary
* Secondary
* Disabled

**Card**

* Default
* Muted
* Interactive
* Disabled
* Comfortable
* Compact

**Alert**

* Info
* Success
* Warning
* Error

**Badge**

* Neutral
* Success
* Warning
* Error

**Input**

* Diferentes tipos de entrada.
* Estados disabled e invalid.
* Atributos ARIA.

**Modal**

* Basado en `<dialog>`.
* Slots para título, contenido y acciones.
* Apertura y cierre mediante la API nativa.

**Tooltip**

* Top
* Right
* Bottom
* Left
* Soporte para hover y focus.

## Ingeniería frontend

El proyecto utiliza una separación clara entre:

* Tokens de diseño.
* Componentes.
* Layouts.
* Páginas de documentación.

Los componentes no dependen de un estado global ni de un framework JavaScript para funcionar.

La arquitectura está orientada a mantener las interfaces predecibles y reducir la complejidad innecesaria.

## Build y despliegue

ORBIT-UI se genera como un sitio estático y se despliega mediante GitHub Actions.

El workflow de despliegue:

```text
Push to main
     │
     ▼
Install dependencies
     │
     ▼
Astro build
     │
     ▼
GitHub Pages
```

Esto permite publicar automáticamente las modificaciones realizadas sobre la rama principal.

## Estado actual

**Active Development**

ORBIT-UI es un design system funcional en desarrollo activo.

Actualmente cuenta con componentes implementados, documentación integrada y despliegue público.

Algunas áreas todavía no están implementadas, entre ellas:

* Sistema de internacionalización.
* Tests automatizados.
* Auditoría automatizada de accesibilidad.
* Componentes interactivos más avanzados.
* Sistema de búsqueda para la documentación.

Por este motivo, el proyecto no se presenta como un design system empresarial completo, sino como una implementación y exploración de arquitectura frontend.

## Evolución futura

Entre las posibles mejoras se encuentran:

* Incorporar testing de componentes.
* Añadir pruebas de accesibilidad.
* Completar internacionalización.
* Incorporar componentes como Dropdown, Tabs, Accordion, Toast y Skeleton.
* Añadir búsqueda dentro de la documentación.
* Mejorar la documentación responsive.
* Incorporar análisis del bundle CSS.

## Qué demuestra

ORBIT-UI demuestra experiencia en:

* Arquitectura de design systems.
* Desarrollo frontend con Astro.
* Tailwind CSS v4.
* Diseño basado en tokens semánticos.
* Componentes reutilizables.
* TypeScript.
* Diseño CSS-first.
* Accesibilidad mediante HTML y ARIA.
* Static Site Generation.
* Documentación como código.
* Automatización de despliegues con GitHub Actions.

El proyecto refleja un enfoque orientado no solo a construir interfaces, sino a establecer reglas reutilizables para mantener consistencia y controlar la complejidad del frontend.

## Visuales

<!-- IMAGE 01 — Overview -->

![ORBIT-UI Overview](/images/projects/orbit-ui/overview.png)

*Página principal del design system mostrando su estructura, principios y navegación.*

<!-- IMAGE 02 — Tokens -->

![ORBIT-UI Design Tokens](/images/projects/orbit-ui/tokens.png)

*Sistema de tokens semánticos utilizado como base visual de los componentes.*

<!-- IMAGE 03 — Componentes -->

![ORBIT-UI Components](/images/projects/orbit-ui/components.png)

*Catálogo de componentes y variantes disponibles en el sistema.*

<!-- IMAGE 04 — Component Documentation -->

![ORBIT-UI Component Documentation](/images/projects/orbit-ui/card.png)

*Documentación de un componente con contrato, variantes, estados y reglas de uso.*

<!-- IMAGE 05 — Modal -->

![ORBIT-UI Modal](/images/projects/orbit-ui/modal.png)

*Interacción del componente Modal utilizando la API nativa `<dialog>`.*
