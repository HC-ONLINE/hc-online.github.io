---
title: "CiberWebScan"
description: "Passive reconnaissance and attack surface analysis for web applications"
subtitle: "Passive Reconnaissance and Attack Surface Analysis (CLI — Python)"
stack: "Python, Typer, HTTPX, BeautifulSoup4, Playwright, Selenium"
github: "https://github.com/HC-ONLINE/CiberWebScan"
---

## The Problem It Solves

* Maps the technical stack and exposure of web applications without intrusive interaction.
* Provides context (fingerprints, headers, exposed endpoints) prior to active testing.
* Minimizes false positives by providing structured evidence and confidence metrics.

## Key Features

* Modular CLI, suitable for pipelines and audits.
* Passive scraping and ethical collection (respects robots.txt, no active exploits).
* Analysis of security headers and policies (CSP, HSTS, cookies).
* Technology fingerprinting (servers, frameworks, libraries).
* Structured export to JSON/CSV for integration with other tools.
* SSL/TLS certificate analysis.
* CVE database cross-referencing.
* XSS detection, SQL injection testing, directory enumeration.
* Quick Scan with presets (low/medium/high).
* REST API (Beta, FastAPI) with Swagger/ReDoc.

## Technical Decision

* Oriented toward modularity and testability: the CLI orchestrates independent components (scanner, fingerprint, exporter).
* Avoids coupling with web frameworks; favors lightweight libraries (HTTPX) and swappable components (optional Selenium for JS cases).
* Apache-2.0 license to facilitate educational and collaborative use.
