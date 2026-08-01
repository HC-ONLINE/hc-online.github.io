---
title: "AccessManager"
description: "Implementation Reference & Comparison: JWT vs. Sessions in Spring Security"
subtitle: "Implementation Reference & Comparison: JWT vs. Sessions in Spring Security"
stack: "Java 21, Spring Boot 3, Spring Security, Maven"
github: "https://github.com/HC-ONLINE/AccessManager"
---

## The Problem It Solves

* Provides correct, auditable authentication implementations for Java/Spring applications.
* Showcases operational trade-offs: revocation, rotation, scaling, attack surface, and session management.
* Offers a foundation with tests and configuration examples for teams needing to choose a strategy.

## Key Features

* Parallel implementations: JWT with best practices (signing, expiration) and traditional session management.
* Explicit Spring Security configurations with examples of revocation and CSRF protection.
* Integration tests and documentation of design decisions.

## Technical Decision

* Avoids dogmatism: each solution is evaluated by use case (auditing, compliance requirements, scaling).
* Designed for adaptation in enterprise environments with control over revocation and monitoring.
