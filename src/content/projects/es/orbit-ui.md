---
title: "ORBIT-UI"
description: "Sistema de diseño CSS-first construido con Astro y Tailwind CSS v4, basado en tokens semánticos, componentes reutilizables y contratos de uso explícitos."
subtitle: "Sistema de diseño frontend y arquitectura de componentes"
stack: "Astro, Tailwind CSS v4, TypeScript, GitHub Actions, GitHub Pages"
github: "https://github.com/HC-ONLINE/ORBIT-UI"
site: "https://hc-online.github.io/ORBIT-UI/"
---

## 1. Resumen

ORBIT-UI es un sistema de diseño frontend construido con Astro y Tailwind CSS v4. El proyecto combina tokens de diseño semánticos, componentes reutilizables y reglas de composición explícitas para construir interfaces consistentes con una cantidad mínima de JavaScript del lado del cliente.

El proyecto prioriza la consistencia, el control de complejidad y la reutilización sobre la cantidad de componentes. Más que un catálogo visual, ORBIT-UI explora una arquitectura para construir y documentar sistemas de diseño frontend.

---

## 2. Problema y objetivos

Los proyectos frontend pueden acumular estilos duplicados, inconsistencias visuales y diferentes formas de resolver los mismos problemas a medida que crecen.

ORBIT-UI aborda este problema mediante:

- Tokens de diseño semánticos que representan significado visual.
- Componentes reutilizables con propiedades y estados definidos.
- Contratos explícitos que documentan usos válidos e inválidos.
- Implementación CSS-first para evitar JavaScript innecesario.
- Documentación integrada directamente en el proyecto.

El objetivo principal es explorar cómo una arquitectura de componentes y tokens puede mantener la consistencia sin convertir el sistema de diseño en una capa innecesariamente compleja.

---

## 3. Solución

ORBIT-UI se estructura alrededor de tres elementos principales:

### Tokens de diseño

Los tokens CSS representan significado visual en lugar de valores específicos.

Entre las categorías utilizadas se encuentran:

- Surface — fondos y contenedores.
- Text — jerarquía de contenido.
- Accent — elementos interactivos.
- Status — estados de retroalimentación.
- Typography — familias tipográficas.

Los tokens se definen mediante la configuración CSS-first de Tailwind CSS v4 y se consumen desde los componentes.

### Componentes

El sistema incluye 10 componentes base:

- Button
- Card
- Alert
- Badge
- NavLink
- Input
- Select
- Modal
- Table
- Tooltip

Los componentes definen variantes, estados y propiedades documentadas para reducir implementaciones inconsistentes.

### Documentación

La documentación forma parte del mismo proyecto y contiene:

- Principios del sistema.
- Tokens de diseño.
- Catálogo de componentes.
- Variantes y estados.
- Ejemplos de uso.
- Contratos y antipatrones.

---

## 4. Arquitectura

ORBIT-UI utiliza una arquitectura de tres capas:

```text
Design Tokens
     │
     ▼
UI Components
     │
     ▼
Documentation
```

![Diagrama de arquitectura de ORBIT-UI](/images/projects/orbit-ui/architecture.png)

### Capa de tokens

Define el lenguaje visual del sistema mediante variables CSS semánticas.

```css
--color-surface-main
--color-surface-elevated
--color-text-primary
--color-text-muted
--color-accent-primary
```

Los componentes consumen estos tokens en lugar de depender directamente de valores visuales específicos.

### Capa de componentes

Los componentes Astro utilizan los tokens mediante variantes, propiedades y estados documentados.

La mayoría de los componentes funcionan sin JavaScript de cliente. Modal utiliza la API nativa `<dialog>` con una mínima capa de interacción.

### Capa de documentación

Las páginas Astro documentan el comportamiento y uso de los componentes junto con ejemplos, contratos y antipatrones.

La documentación se construye y despliega junto con el sistema, manteniendo implementación y documentación dentro del mismo proyecto.

---

## 5. Stack tecnológico

| Tecnología      | Propósito                                     |
| --------------- | --------------------------------------------- |
| Astro           | Framework para generación del sitio           |
| Tailwind CSS v4 | Estilos utilitarios y configuración de tokens |
| TypeScript      | Tipado de propiedades de componentes          |
| Vite            | Herramienta de build utilizada por Astro      |
| pnpm            | Gestión de dependencias                       |
| GitHub Actions  | Automatización del build y despliegue         |
| GitHub Pages    | Hosting estático                              |

### Tipografía

- Inter
- JetBrains Mono

---

## 6. Funcionalidades implementadas

### Sistema de tokens

- 14 tokens de color organizados semánticamente.
- 2 tokens tipográficos.
- Categorías de Surface, Text, Accent, Status y Typography.
- Configuración CSS-first mediante `@theme`.

### Componentes

- Button con variantes y estados.
- Card con diferentes variantes de presentación.
- Alert para estados de información y feedback.
- Badge para estados semánticos.
- NavLink con detección de ruta activa y `aria-current`.
- Input con estados disabled e invalid.
- Select con validación.
- Modal basado en `<dialog>`.
- Table mediante composición de elementos semánticos.
- Tooltip con diferentes posiciones y soporte hover/focus.

### Documentación

- Catálogo de componentes.
- Documentación individual.
- Ejemplos de variantes y estados.
- Guías de composición.
- Documentación de antipatrones.
- Fragmentos de código reutilizables.

---

## 7. Decisiones técnicas

### Arquitectura CSS-first

La mayoría de los componentes se implementan mediante HTML y CSS, utilizando JavaScript únicamente cuando la interacción lo requiere.

**Beneficio:** reduce el JavaScript de cliente y mantiene los componentes base simples.

**Trade-off:** las interacciones más complejas requieren incorporar lógica adicional y actualmente no forman parte del sistema.

### Tokens semánticos

Los tokens representan significado visual, por ejemplo:

```css
--color-text-muted
```

en lugar de valores específicos como:

```css
--color-gray-400
```

**Beneficio:** permite modificar el lenguaje visual del sistema sin acoplarlo a componentes individuales.

**Trade-off:** los desarrolladores deben comprender la semántica de los tokens para utilizarlos correctamente.

### Componentes con contratos explícitos

Los componentes documentan variantes, estados, usos válidos y antipatrones.

**Beneficio:** el sistema define reglas de composición además de estilos.

**Trade-off:** requiere mayor disciplina y documentación que una colección de componentes sin restricciones.

### Documentation-as-Code

La documentación vive dentro del mismo proyecto y se genera mediante Astro.

**Beneficio:** implementación, ejemplos y documentación evolucionan juntos.

**Trade-off:** la documentación depende del sistema de build utilizado por el proyecto.

---

## 8. Accesibilidad y calidad

ORBIT-UI incorpora fundamentos de accesibilidad directamente en los componentes mediante:

- HTML semántico.
- `aria-current`.
- `aria-invalid`.
- `aria-label`.
- `aria-hidden`.
- `aria-disabled`.
- Roles semánticos cuando son apropiados.
- Estados interactivos documentados.

El proyecto todavía no cuenta con una suite automatizada de tests de componentes, regresión visual o auditoría de accesibilidad.

Esto se considera una limitación actual y no se presenta como una garantía de accesibilidad completa.

---

## 9. Evidencia visual

### Overview

![ORBIT-UI Overview](/images/projects/orbit-ui/overview.png)

*Página principal del sistema mostrando su estructura, principios y navegación.*

### Design Tokens

![ORBIT-UI Design Tokens](/images/projects/orbit-ui/tokens.png)

*Sistema de tokens semánticos utilizado como base visual de los componentes.*

### Componentes

![ORBIT-UI Components](/images/projects/orbit-ui/components.png)

*Catálogo de componentes y variantes disponibles.*

### Documentación de componentes

![ORBIT-UI Component Documentation](/images/projects/orbit-ui/card.png)

*Documentación de un componente mostrando variantes, estados, contratos y reglas de uso.*

### Modal

![ORBIT-UI Modal](/images/projects/orbit-ui/modal.png)

*Interacción de Modal mediante la API nativa `<dialog>`.*

---

## 10. Estado actual y limitaciones

**Estado:** Desarrollo activo.

ORBIT-UI es un sistema de diseño funcional con componentes implementados, documentación integrada y despliegue público.

Actualmente no incluye:

- Suite automatizada de tests de componentes.
- Auditoría automatizada de accesibilidad.
- Testing de regresión visual.
- Componentes interactivos avanzados como Tabs, Dropdown o Toast.
- Búsqueda dentro de la documentación.
- Internacionalización.
- Estrategia formal de versionado de componentes.
- Exportación de tokens para otros frameworks.

Por su alcance actual, el proyecto se presenta como una implementación y exploración de arquitectura de sistemas de diseño frontend, no como un design system empresarial completo.

---

## 11. Qué demuestra este proyecto

ORBIT-UI demuestra experiencia en:

- Arquitectura de sistemas de diseño.
- Desarrollo frontend con Astro.
- Tailwind CSS v4 y configuración `@theme`.
- Diseño y organización de tokens semánticos.
- Arquitectura de componentes reutilizables.
- TypeScript para contratos de componentes.
- Desarrollo CSS-first.
- HTML semántico y fundamentos de accesibilidad.
- Documentación-as-code.
- Generación de sitios estáticos.
- Automatización de build y despliegue con GitHub Actions.

El principal valor técnico del proyecto está en demostrar que un sistema de diseño puede definir no solo componentes visuales, sino también reglas de composición y un lenguaje visual reutilizable.
