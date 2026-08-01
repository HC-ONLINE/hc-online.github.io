---
title: "DemoFactory"
description: "Portafolio de proyectos UI/UX con demos interactivas de alta fidelidad"
subtitle: "Portafolio de proyectos UI/UX con demos interactivas de alta fidelidad"
stack: "Astro 7.x, TypeScript, Tailwind CSS v4, MapLibre GL, Sharp"
github: "https://github.com/HC-ONLINE/DemoFactory"
site: "https://hc-online.github.io/DemoFactory/"
---

## Qué resuelve

- Necesidad de una estructura base para construir múltiples demos de sitios web dentro de un solo proyecto.
- Mantener cada demo aislada, organizada y fácil de escalar.
- Soporte de internacionalización (i18n) para español e inglés.

## Características clave

- Estructura aislada de demos (cada demo en su propia subcarpeta bajo `src/demos/`).
- Soporte de internacionalización (i18n) para español e inglés.
- Sistema de contenido basado en Markdown para textos de demo.
- Layout compartido y estilos globales entre demos.
- Manejo de rutas por idioma.
- Arquitectura escalable para añadir nuevas demos.

## Decisión técnica

- Priorizar el aislamiento entre demos para facilitar el mantenimiento y la escalabilidad.
- Usar Astro como framework base por su enfoque estático y rendimiento.
- Tailwind CSS v4 para estilos consistentes y reutilizables.
