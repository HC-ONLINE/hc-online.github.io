---
title: "DemoFactory"
description: "UI/UX project portfolio with high-fidelity interactive demos"
subtitle: "UI/UX project portfolio with high-fidelity interactive demos"
stack: "Astro 7.x, TypeScript, Tailwind CSS v4, MapLibre GL, Sharp"
github: "https://github.com/HC-ONLINE/DemoFactory"
site: "https://hc-online.github.io/DemoFactory/"
---

## The Problem It Solves

* Need for a base structure to build multiple website demos within a single project.
* Keeping each demo isolated, organized, and easy to scale.
* Internationalization (i18n) support for Spanish and English.

## Key Features

* Isolated demo structure (each demo in its own subfolder under `src/demos/`).
* Internationalization (i18n) support for Spanish and English.
* Markdown-based content system for demo texts.
* Shared layout and global styles across demos.
* Route-based language handling.
* Scalable architecture for adding new demos.

## Technical Decision

* Prioritize isolation between demos to facilitate maintenance and scalability.
* Use Astro as the base framework for its static approach and performance.
* Tailwind CSS v4 for consistent and reusable styles.
