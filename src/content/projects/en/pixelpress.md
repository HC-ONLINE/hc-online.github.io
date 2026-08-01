---
title: "PixelPress"
description: "Video game blog with news, reviews, and analysis of the gaming world"
subtitle: "Video game blog with news, reviews, and analysis (SSR)"
stack: "Astro 7.x, MDX, Tailwind CSS 4, Cloudflare Workers, R2, Giscus"
site: "https://pixelpress.henriquezandres856.workers.dev/"
---

## The Problem It Solves

* Blog platform for video game content with categories (reviews, news, guides, analysis, opinion).
* Featured post system.
* Comment integration and monetization.

## Key Features

* Blog with categories (reviews, news, guides, analysis, opinion).
* Featured post system.
* Dark/light theme toggle.
* Table of contents for articles.
* Ad integration (banner, sidebar, in-article).
* Giscus comment system (GitHub Discussions).
* Social sharing buttons (Twitter, Facebook, Reddit, WhatsApp).
* Search functionality (Fuse.js).
* Responsive design with mobile menu.
* i18n support (Spanish/English).
* R2 storage for media assets.
* Client-side routing with View Transitions.
* SEO optimization with Open Graph meta tags.

## Technical Decision

* Use Astro in SSR mode for dynamism and Cloudflare Workers for edge deployment.
* MDX for rich content with React components.
* Giscus for comments integrated with GitHub Discussions.
