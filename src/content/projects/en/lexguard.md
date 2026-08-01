---
title: "LexGuard PII-Scanner"
description: "PII Detection and Correlation Engine for Automated Data Audits"
subtitle: "PII Detection and Correlation Engine for Automated Data Audits"
stack: "Python 3.11+, Typer, pydantic, python-magic, regex"
github: "https://github.com/HC-ONLINE/LexGuard"
---

## The Problem It Solves

* Slow manual data audits and generic tools with high false-positive rates.
* Fragmented risk view: evaluates real exposure, not just regex matches.
* Identification of aggregated risks through cross-PII correlation (multiple sensitive data types coexisting).

## Key Features

* CLI-first: Designed to run in pipelines, automation scripts, and unattended environments.
* Rules first, AI as support: Deterministic rules and algorithmic validations (Luhn, prefixes, entropy). AI as a secondary layer to reduce false positives.
* Explainable risk: Every finding includes a clear breakdown of why it's considered risky and its confidence level.
* Fail-safe by default: When ambiguous, classifies as UNCERTAIN rather than generating critical false positives.
* Current detection: Colombian ID (Cédula de Ciudadanía), Colombian mobile phone, email, credit cards, and cross-PII correlation.
* Modular architecture: Extensible deterministic pipeline: ingestion → detection → validation → scoring → correlation → report.

## Technical Decision

* Architecture based on deterministic pipeline to ensure reproducibility and traceability.
* Not a DLP or SIEM: it's an audit and scanning tool that identifies exposure, doesn't remediate it.
* Region-specific algorithmic validations (Colombia) with extensibility options.
* Apache-2.0 license for enterprise and collaborative use.
* Designed for compliance with Ley 1581 de Colombia.
