---
title: "CiberWebScan"
description: "Security tool for automating the reconnaissance and controlled assessment of web applications through technology fingerprinting, SSL/TLS analysis, security headers, scraping and active testing with explicit consent."
subtitle: "Web application reconnaissance and assessment"
stack: "Python, Typer, HTTPX, Playwright, BeautifulSoup4, FastAPI, Pydantic"
github: "https://github.com/HC-ONLINE/CiberWebScan"
---

# CiberWebScan

## Modular toolkit for web application reconnaissance and controlled security assessment

**Stack:** Python · Typer · Rich · HTTPX · Playwright · BeautifulSoup4 · FastAPI · Pydantic
**Status:** Beta
**License:** Apache 2.0
**Repository:** <https://github.com/HC-ONLINE/CiberWebScan>

---

## 1. Overview

CiberWebScan is a Python-based security toolkit that centralizes multiple stages of web application assessment within a modular architecture.

It combines passive reconnaissance, technology fingerprinting, SSL/TLS analysis, security header evaluation, static and dynamic web scraping, technology-to-CVE correlation, and controlled active security testing.

The project provides two interfaces over the same underlying analysis engines:

* **CLI:** designed for interactive use and automation.
* **REST API:** designed for programmatic integration.

Active testing is disabled by default and requires explicit consent.

---

## 2. Problem

Web application security assessment commonly requires several specialized tools for reconnaissance, fingerprinting, configuration analysis, information extraction, and active testing.

This fragmentation can increase:

* Configuration time.
* Context switching.
* Duplicate work.
* The difficulty of correlating results between tools.

CiberWebScan addresses this problem by bringing these capabilities together under a unified interface and common result model.

---

## 3. Solution

The toolkit organizes its capabilities into specialized components:

* **Fingerprinting:** identification of frameworks, CMS platforms, servers, and other technologies.
* **SSL/TLS:** analysis of certificates, protocols, and cipher suites.
* **Security Headers:** evaluation of headers such as CSP, HSTS, and X-Frame-Options.
* **CVE Correlation:** association of discovered technologies with known vulnerabilities.
* **Scraping:** structured extraction using static parsing or JavaScript rendering.
* **Active Testing:** controlled testing for several vulnerability classes.
* **Export:** generation of JSON, JSONL, CSV, and HTML results.

The CLI can execute individual capabilities or combine them through `quick scan` presets with different intensity levels.

---

## 4. Architecture

CiberWebScan follows a modular layered architecture:

![CiberWebScan architecture diagram](/images/projects/ciberwebscan/architecture.png)

This separation allows individual analyzers and testing modules to evolve without being tightly coupled to the user interfaces.

---

## 5. Implemented Capabilities

### Reconnaissance and Analysis

* Technology fingerprinting.
* Framework, CMS, and server identification.
* SSL/TLS certificate analysis.
* Protocol and cipher-suite evaluation.
* Security header analysis.
* Technology-to-CVE correlation.
* Static web scraping.
* Dynamic scraping with JavaScript rendering.
* Structured content extraction.

### Controlled Active Testing

The project implements modules for:

* Cross-Site Scripting (XSS).
* SQL Injection.
* Path Traversal.
* CSRF.
* Directory Enumeration.
* DNS-based Subdomain Enumeration.
* OS Command Injection.

These capabilities are intended exclusively for authorized environments.

### Infrastructure

* Centralized HTTP client.
* Retry and backoff.
* Per-domain rate limiting.
* HTTP/2 support.
* Proxy integration.
* Structured logging.
* Pydantic and YAML-based configuration.
* Configurable target restrictions and scan intensity.

---

## 6. Technology Stack

| Technology               | Purpose                             |
| ------------------------ | ----------------------------------- |
| Python 3.10+             | Runtime and core implementation     |
| Typer                    | CLI                                 |
| Rich                     | Terminal output and formatting      |
| HTTPX                    | HTTP client and HTTP/2              |
| BeautifulSoup4           | Static HTML parsing                 |
| Playwright               | Dynamic rendering and scraping      |
| pyOpenSSL / cryptography | SSL/TLS analysis                    |
| Pydantic                 | Configuration models and validation |
| PyYAML                   | Configuration profiles              |
| orjson                   | JSON serialization                  |
| FastAPI                  | REST API                            |
| Uvicorn                  | ASGI server                         |
| pytest                   | Automated testing                   |
| Ruff                     | Linting and formatting              |
| Pyright                  | Static type checking                |
| GitHub Actions           | CI/CD                               |

API dependencies are kept separate from the base CLI installation.

---

## 7. Key Technical Decisions

### Modular Engine Architecture

Each analysis capability is implemented as an independent component.

**Advantage:** new analyzers and testing modules can be added without directly modifying the orchestration core.

**Trade-off:** a larger number of components must be maintained and tested.

### CLI + REST API

Both interfaces use the same underlying engines.

This allows the project to maintain a single implementation of its security capabilities while supporting two interaction models:

* CLI for researchers, penetration testers, and local automation.
* API for integration with external applications.

The API remains in beta and its contracts may evolve.

### Consent-Based Active Testing

Active testing is separated from passive reconnaissance and requires explicit enablement.

This reduces the risk of accidentally executing intrusive tests against unauthorized or production targets.

### Optional Dependencies

FastAPI and its associated dependencies are not required for CLI-only installations.

This keeps the base installation lighter for users who only need local analysis capabilities.

---

## 8. Security and Responsible Use

CiberWebScan is designed for authorized security assessment, research, and educational purposes.

The main safeguards include:

* Active testing disabled by default.
* Explicit consent required to enable attacks.
* Configurable target restrictions.
* Configurable scan intensity.
* Rate limiting to reduce potential target impact.
* Proxy support for integration with security tooling.

Users must obtain appropriate authorization before testing systems they do not directly control and must comply with applicable laws and policies.

---

## 9. Testing and Quality

The project includes an extensive automated test suite and static analysis tooling.

Observable project metrics include:

* **94 test files**
* **1,308 test functions**
* Unit, integration, and slow test markers.
* Asynchronous test support.
* Coverage reports in multiple formats.
* Ruff for code quality and consistency.
* Pyright for static verification.
* GitHub Actions for CI automation.

These metrics should be interpreted as indicators of engineering and regression-control effort, not as proof that the scanner detects every vulnerability.

---

## 10. Visual Evidence

### CLI

![CiberWebScan CLI](/images/projects/ciberwebscan/cli-help.png)

*CiberWebScan CLI help showing analysis, scraping, active testing, and quick scan commands.*

### HTML Report

![CiberWebScan HTML Report](/images/projects/ciberwebscan/report-html.png)

*Generated quick-scan report containing findings and risk evaluation.*

### REST API

![CiberWebScan REST API](/images/projects/ciberwebscan/api-docs.png)

*Interactive REST API documentation through Swagger UI.*

### Architecture

![CiberWebScan Architecture](/images/projects/ciberwebscan/architecture.png)

*Separation between interfaces, orchestration, analysis engines, active testing, scraping, and export layers.*

---

## 11. Current Status and Limitations

### Current status: Beta

The project has a substantial functional foundation, but it is not presented as a production-ready security platform.

Known limitations include:

* The REST API remains in beta and its contracts may change.
* The deep-scan architecture is not fully implemented.
* Some fingerprinting capabilities still require additional orchestration integration.
* Temporary result-download tokens do not use persistent storage.
* Scan results are not currently stored persistently.
* A complete scan activity audit system is not currently implemented.
* Distributed scanning is not currently supported.
* HTML report customization remains limited.

These limitations are explicitly part of the current project scope.

---

## 12. Future Evolution

Potential future improvements include:

1. Completing the deep-scan architecture.
2. Adding persistent result storage.
3. Implementing scan activity auditing.
4. Improving report customization.
5. Expanding vulnerability detection modules.
6. Adding distributed scanning.
7. Strengthening REST API authentication and authorization.
8. Completing API documentation.
9. Adding formats such as SARIF and PDF.
10. Adding scan scheduling and management.

These items represent future directions rather than currently implemented functionality.

---

## 13. What This Project Demonstrates

CiberWebScan demonstrates practical experience in:

* Modular architecture design.
* Python CLI development.
* REST API development with FastAPI.
* HTTP client design and HTTP/2 communication.
* Static and dynamic web scraping.
* Technology fingerprinting.
* SSL/TLS analysis.
* Security header evaluation.
* Automated security testing.
* Safety controls for active operations.
* Configuration and validation with Pydantic.
* Result export and report generation.
* Automated testing.
* Static analysis and CI/CD.
* Technical documentation and trade-off analysis.

The main value of the project is not simply the number of implemented features, but how those capabilities are organized within a common architecture with clear separation of responsibilities and explicit controls around active testing.
