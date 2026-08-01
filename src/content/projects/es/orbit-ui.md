---
title: "ORBIT-UI"
description: "Design system CSS-first construido con Astro y Tailwind CSS v4"
subtitle: "Design system CSS-first (Astro + Tailwind)"
stack: "Astro, Tailwind CSS v4, TypeScript"
github: "https://github.com/HC-ONLINE/ORBIT-UI"
site: "https://hc-online.github.io/ORBIT-UI/"
---

## Qué resuelve

- Consistencia visual y tokens compartidos entre proyectos técnicos.
- Minimizar la lógica JS en componentes básicos para mejorar rendimiento y mantenibilidad.
- Proveer una base clara de contratos visuales (tokens y componentes) sin pretender ser un kit completo.

## Características clave

- Tokens semánticos y utilidades Tailwind adaptadas.
- Componentes reutilizables con enfoque CSS‑first (estilos y accesibilidad).
- Documentación y ejemplos Live en sitio (Storybook/Docs‑like).
- Estados explícitos por componente (valid/invalid).
- Componentes: Card, Button, NavLink, Alert, Badge.
- Soporte dark mode via prefers-color-scheme.
- Generación de sitio estático (100% estático, cero JS runtime).

## Decisión técnica

- Priorizar simplicidad: CSS y tokens antes que heavy JS frameworks.
- Favorecer interoperabilidad y contratos claros entre frontend y diseño.
- No es un UI kit ni framework: se enfoca en tokens y contratos.
