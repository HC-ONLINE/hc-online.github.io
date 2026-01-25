---
title: "Projects"
description: "Backend, security, and applied architecture"
---

# Featured Projects

A selection of projects where I apply security-by-design principles, robust backend development, and explicit architectural decisions. Each one solves a specific technical problem and includes documentation on trade-offs and operational decisions.

---

## ***CiberWebScan***

### *Passive Reconnaissance and Attack Surface Analysis (CLI — Python)*

A hybrid tool for passive reconnaissance, technology fingerprinting, and initial web application analysis, designed for ethical auditing and education.

### *The Problem It Solves*

* Maps the technical stack and exposure of web applications without intrusive interaction.
* Provides context (fingerprints, headers, exposed endpoints) prior to active testing.
* Minimizes false positives by providing structured evidence and confidence metrics.

### *Key Features*

* Modular CLI, suitable for pipelines and audits.
* Passive scraping and ethical collection (respects robots.txt, no active exploits).
* Analysis of security headers and policies (CSP, HSTS, cookies).
* Technology fingerprinting (servers, frameworks, libraries).
* Structured export to JSON/CSV for integration with other tools.

### *Technical Decision*

* Oriented toward modularity and testability: the CLI orchestrates independent components (scanner, fingerprint, exporter).
* Avoids coupling with web frameworks; favors lightweight libraries (HTTPX) and swappable components (optional Selenium for JS cases).
* Apache-2.0 license to facilitate educational and collaborative use.

**Stack**: Python, Typer (CLI), HTTPX, Selenium (optional), unit testing, and JSON/CSV exporters.

[GitHub](https://github.com/HC-ONLINE/CiberWebScan)

---

## ***AccessManager***

### *Implementation Reference & Comparison: JWT vs. Sessions in Spring Security*

A reference project and reusable boilerplate that implements and documents concrete authentication alternatives (stateless JWT and stateful sessions) within a Spring Boot enterprise context.

### *The Problem It Solves*

* Provides correct, auditable authentication implementations for Java/Spring applications.
* Showcases operational trade-offs: revocation, rotation, scaling, attack surface, and session management.
* Offers a foundation with tests and configuration examples for teams needing to choose a strategy.

### *Key Features*

* Parallel implementations: JWT with best practices (signing, expiration) and traditional session management.
* Explicit Spring Security configurations with examples of revocation and CSRF protection.
* Integration tests and documentation of design decisions.

### *Technical Decision*

* Avoids dogmatism: each solution is evaluated by use case (auditing, compliance requirements, scaling).
* Designed for adaptation in enterprise environments with control over revocation and monitoring.

**Stack**: Java 21, Spring Boot 3, Spring Security, Maven.

[GitHub](https://github.com/HC-ONLINE/AccessManager)

---

## ***PermissionManager***

### *RBAC System with Explainable and Auditable Policies*

An authorization engine that combines roles and auditable policies; every access decision can be explained and reproduced for regulatory purposes.

### *The Problem It Solves*

* Prevents implicit or opaque access controls through deterministic and traceable evaluations.
* Facilitates auditing, reviews, and compliance (logging of decisions and motives).
* Provides an extensible base for enterprise RBAC models and attribute-based policies.

### *Key Features*

* Deterministic permission and policy evaluator (audit trail per evaluation).
* REST API for managing roles, permissions, and policies.
* Integration with Spring Security to apply decisions at runtime.
* Tests and examples of auditable policies.

### *Technical Decision*

* Does not treat authorization as a "black box": every verdict carries metadata (which rules were evaluated, inputs, and result).
* Designed for regulated environments where access explanation is a requirement.

**Stack**: Java 21, Spring Boot, Spring Security, PostgreSQL (example), Maven.

[GitHub](https://github.com/HC-ONLINE/PermissionManager)

---

## ***LexGuard PII-Scanner***

### *PII Detection and Correlation Engine for Automated Data Audits*

A Personally Identifiable Information (PII) detection and correlation engine designed to determine sensitive data exposure and assess leakage risks in repositories and flat files.

### *The Problem It Solves*

* Slow manual data audits and generic tools with high false-positive rates.
* Fragmented risk view: evaluates real exposure, not just regex matches.
* Identification of aggregated risks through cross-PII correlation (multiple sensitive data types coexisting).

### *Key Features*

* CLI-first: Designed to run in pipelines, automation scripts, and unattended environments.
* Rules first, AI as support: Deterministic rules and algorithmic validations (Luhn, prefixes, entropy). AI as a secondary layer to reduce false positives.
* Explainable risk: Every finding includes a clear breakdown of why it's considered risky and its confidence level.
* Fail-safe by default: When ambiguous, classifies as UNCERTAIN rather than generating critical false positives.
* Current detection: Colombian ID (Cédula de Ciudadanía), Colombian mobile phone, email, credit cards, and cross-PII correlation.
* Modular architecture: Extensible deterministic pipeline: ingestion → detection → validation → scoring → correlation → report.

### *Technical Decision*

* Architecture based on deterministic pipeline to ensure reproducibility and traceability.
* Not a DLP or SIEM: it's an audit and scanning tool that identifies exposure, doesn't remediate it.
* Region-specific algorithmic validations (Colombia) with extensibility options.
* Apache-2.0 license for enterprise and collaborative use.

**Stack**: Python 3.11+, Typer (CLI), algorithmic validations, JSON exporters.

[GitHub](https://github.com/HC-ONLINE/LexGuard)

---

## ***ModelRouter***

### *Asynchronous LLM Orchestrator with Resilience and Observability*

An asynchronous Gateway/API that unifies model providers, facilitates streaming (SSE), automatic fallback, and traceability for production AI integrations.

### *The Problem It Solves*

* Abstracts heterogeneous providers (Groq, OpenRouter, Ollama, etc.) to avoid vendor lock-in at the application level.
* Resilience: automatic fallback, retries, and circuit breakers across providers.
* Real observability: metrics, traces, and logs associated with each request/response and cost per call.

### *Key Features*

* Asynchronous API (FastAPI / async) with streaming support (SSE / chunked responses).
* Strategies for fallback, rate limiting, and provider prioritization.
* Instrumentation with OpenTelemetry or other adapters for metrics and traces.
* Extensible design to add new providers or routing policies.

### *Technical Decision*

* Separates orchestration logic from the provider adapter to facilitate testing and enable hot-switching.
* Prioritizes latency and observability: per-request telemetry for cost/effectiveness analysis.

**Stack**: Python, FastAPI, asyncio, SSE/streaming, OpenTelemetry, Docker containers.

[GitHub](https://github.com/HC-ONLINE/ModelRouter)

---

## ***ORBIT-UI***

### *CSS-first Design System (Astro + Tailwind)*

A lightweight and maintainable design system centered on semantic tokens and CSS-first components to reduce JavaScript dependency.

Site: [https://hc-online.github.io/ORBIT-UI/](https://hc-online.github.io/ORBIT-UI/)

### *The Problem It Solves*

* Visual consistency and shared tokens across technical projects.
* Minimizes JS logic in basic components to improve performance and maintainability.
* Provides a clear base of visual contracts (tokens and components) without the overhead of a heavy UI kit.

### *Key Features*

* Semantic tokens and adapted Tailwind utilities.
* Reusable components with a CSS-first focus (styles and accessibility).
* Live documentation and examples (Storybook/Docs-style).

### *Technical Decision*

* Prioritize simplicity: CSS and tokens over heavy JS frameworks.
* Favor interoperability and clear contracts between frontend and design.

**Stack**: Astro, Tailwind CSS v4, TypeScript (where applicable).

[GitHub](https://github.com/HC-ONLINE/ORBIT-UI)

---

## ***Common Philosophy***

All projects share:

* Security as a requirement, not an add-on.
* Justified and auditable dependencies.
* Purposeful testing (unit, integration, e2e where applicable).
* Technical documentation and explicit decisions.
* Modular design focused on maintenance and observability.
* Automation and CI/CD for quality and reproducible deployments.
