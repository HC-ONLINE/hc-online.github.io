---
title: "ORBIT-UI"
description: "CSS-first design system built with Astro and Tailwind CSS v4, based on semantic design tokens and components with explicit contracts."
subtitle: "Frontend design system and component architecture"
stack: "Astro, Tailwind CSS v4, TypeScript, GitHub Actions, GitHub Pages"
github: "https://github.com/HC-ONLINE/ORBIT-UI"
---

## Overview

ORBIT-UI is a frontend design system built with Astro and Tailwind CSS v4.

The project defines a collection of base components, semantic design tokens and explicit composition rules aimed at building consistent interfaces without introducing unnecessary JavaScript.

The system prioritizes complexity control and consistency over the number of available components.

## Architecture

ORBIT-UI is organized into three main layers:

```text
Tokens
   │
   ▼
UI Components
   │
   ▼
Documentation
```

**Semantic tokens** define the visual meaning of the system while remaining decoupled from specific components.

**Astro components** consume these tokens through documented variants, states and properties.

**Documentation** is part of the project itself and demonstrates components, contracts, states, variants and usage examples.

The application is generated as a static site with Astro and automatically deployed to GitHub Pages.

## Design System

### Semantic Tokens

ORBIT-UI uses semantic CSS variables to represent categories such as:

* Surface
* Text
* Accent
* Status
* Typography

Tokens are not directly tied to specific components.

This allows different components to share the same visual rules without creating dependencies between them.

The current system defines:

* 14 color tokens.
* 2 typography tokens.

### Components

The system includes base components for different interface requirements:

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

Table also includes specialized composition components:

* TableHead
* TableBody
* TableRow
* TableCell
* TableHeadCell

Components support variants, states and specific properties according to their documented contracts.

## CSS-first

One of the project's main design decisions is minimizing client-side JavaScript.

Most components are implemented through HTML and CSS using Tailwind CSS capabilities.

The only component requiring client-side JavaScript is Modal, which uses the native `<dialog>` API to control opening and closing.

This approach keeps base components lightweight and avoids introducing client-side logic when it is not required.

## Component Contracts

Each component explicitly documents how it should be used.

The documentation covers:

* Available variants.
* States.
* Properties.
* Valid combinations.
* Invalid or discouraged combinations.
* Anti-patterns.
* Usage examples.

The goal is to make the system more than a visual component collection: it provides a set of rules for maintaining interface consistency.

## Documentation

Documentation is integrated directly into the project through Astro pages.

It includes:

* System overview.
* Design token documentation.
* Component catalog.
* Individual component documentation.
* Variant and state examples.
* Composition guidelines.

The current site contains 13 documentation pages.

Documentation-as-code keeps explanations and implementations within the same repository.

## Accessibility

Components incorporate several accessibility foundations directly into their implementation.

These include:

* `aria-disabled`
* `aria-invalid`
* `aria-current`
* `aria-label`
* `aria-hidden`
* Semantic roles such as `alert` and `status`
* `disabled` and `invalid` states
* Semantic HTML for interactive elements

For example, NavLink automatically detects the active route and uses `aria-current`.

The system does not currently include automated accessibility auditing.

## Responsive Design

Components use Tailwind CSS responsive capabilities to adapt layouts and interfaces across different screen sizes.

The documentation site uses flexible layouts, grids and width constraints to maintain a consistent presentation.

Automated responsive testing has not yet been implemented.

## Technical Architecture

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

Astro is used as the static site generation framework.

The project uses Static Site Generation (SSG), allowing the site to be deployed without an application server.

### Tailwind CSS

Tailwind CSS v4 provides the utility classes used to build the components and supports semantic token definitions through `@theme`.

### TypeScript

Components use TypeScript for defining and validating their properties.

The project uses Astro's strict TypeScript configuration.

## Components and States

Examples of implemented component capabilities include:

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

* Multiple input types.
* Disabled and invalid states.
* ARIA attributes.

**Modal**

* Based on `<dialog>`.
* Slots for title, content and actions.
* Native API for opening and closing.

**Tooltip**

* Top
* Right
* Bottom
* Left
* Hover and focus support.

## Frontend Engineering

The project maintains a clear separation between:

* Design tokens.
* Components.
* Layouts.
* Documentation pages.

Components do not depend on global application state or a JavaScript framework to operate.

The architecture is designed to keep interfaces predictable and reduce unnecessary frontend complexity.

## Build and Deployment

ORBIT-UI is generated as a static site and deployed through GitHub Actions.

The deployment workflow is:

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

This allows changes pushed to the main branch to be automatically published.

## Current Status

**Active Development**

ORBIT-UI is a functional design system currently under active development.

It includes implemented components, integrated documentation and a public deployment.

Some areas are not yet implemented, including:

* Internationalization.
* Automated testing.
* Automated accessibility auditing.
* More advanced interactive components.
* Documentation search.

For this reason, the project is not presented as a complete enterprise design system, but as an implementation and exploration of frontend architecture.

## Future Development

Potential improvements include:

* Component testing.
* Accessibility testing.
* Completing internationalization.
* Adding components such as Dropdown, Tabs, Accordion, Toast and Skeleton.
* Documentation search.
* Improved responsive documentation.
* CSS bundle analysis.

## What This Project Demonstrates

ORBIT-UI demonstrates experience with:

* Design system architecture.
* Frontend development with Astro.
* Tailwind CSS v4.
* Semantic design tokens.
* Reusable components.
* TypeScript.
* CSS-first development.
* Accessibility foundations using HTML and ARIA.
* Static Site Generation.
* Documentation-as-code.
* Automated deployment with GitHub Actions.

The project demonstrates an approach focused not only on building interfaces, but on establishing reusable rules that maintain consistency and control frontend complexity.

## Visuals

<!-- IMAGE 01 — Overview -->

![ORBIT-UI Overview](/images/projects/orbit-ui/overview.png)

*Main design system page showing its structure, principles and navigation.*

<!-- IMAGE 02 — Tokens -->

![ORBIT-UI Design Tokens](/images/projects/orbit-ui/tokens.png)

*Semantic design token system used as the visual foundation for the components.*

<!-- IMAGE 03 — Components -->

![ORBIT-UI Components](/images/projects/orbit-ui/components.png)

*Component catalog and available variants.*

<!-- IMAGE 04 — Component Documentation -->

![ORBIT-UI Component Documentation](/images/projects/orbit-ui/card.png)

*Component documentation showing its contract, variants, states and usage rules.*

<!-- IMAGE 05 — Modal -->

![ORBIT-UI Modal](/images/projects/orbit-ui/modal.png)

*Modal interaction using the native `<dialog>` API.*
