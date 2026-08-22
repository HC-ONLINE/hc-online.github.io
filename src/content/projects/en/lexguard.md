---
title: "LexGuard"
description: "Proof of concept for detecting and analyzing personally identifiable information (PII) in text using rule-based detection and automated processing."
subtitle: "Sensitive data detection in text"
stack: "Python"
github: "https://github.com/HC-ONLINE/LexGuard"
---

## Overview

LexGuard is a proof of concept focused on exploring the automated detection of personally identifiable information (PII) within text.

The project experiments with text analysis and detection patterns to identify potential sensitive data, providing a foundation for security and privacy-oriented analysis tools.

## Problem

Sensitive information can appear unintentionally in documents, text, or system inputs. Detecting it manually is difficult to scale and makes it harder to introduce privacy controls early in the data-processing lifecycle.

LexGuard explores how this identification process can be automated through programmatic text analysis and configurable detection rules.

## Solution

The project implements a text analysis workflow that processes input, applies detection mechanisms, and produces results for potentially sensitive elements.

The implementation is intended for experimentation and technical validation rather than as a production-ready data protection system.

## Capabilities

- Automated detection of potential personal information.
- Pattern-based text analysis.
- Identification of different categories of sensitive information.
- Structured detection results.
- Separation between detection logic and input processing.
- Extensible approach for adding new detection rules.

## Engineering

- **Rule-based detection** — Pattern-based mechanisms for identifying potential PII.
- **Text processing** — Programmatic analysis of content to locate relevant matches.
- **Extensible architecture** — Detection mechanisms are separated to facilitate the addition of new rules.
- **Python** — Used to implement the prototype and its processing logic.

## Architecture

The analysis pipeline processes text files through a deterministic flow: ingestion, detection, validation, scoring, and report generation.

![LexGuard architecture diagram](/images/projects/lexguard/architecture.png)

## Security and privacy

The project focuses directly on identifying sensitive information and exploring mechanisms that can support privacy-oriented analysis.

Rule-based detection alone cannot guarantee complete identification of personal information or correctly understand every contextual case. Results should therefore be treated as indicators that require additional validation in real-world scenarios.

## Current status

LexGuard is no longer under active development and should be considered a **Proof of Concept (POC)**.

The main objective was to validate the technical approach for PII detection and explore a possible architecture for future privacy and security tooling.

It is not presented as a production system or as a complete regulatory compliance solution.

## Limitations

- Potential false positives and false negatives.
- Limited coverage of information categories.
- Dependence on predefined detection rules and patterns.
- No advanced contextual validation.
- Not currently designed as a production service.
- No complete system for managing, storing, or anonymizing detected data.

## What this project demonstrates

- Automation of privacy- and security-related tasks.
- Programmatic text processing.
- Design of extensible detection mechanisms.
- Understanding of the limitations of purely rule-based approaches.
- Exploration of sensitive-data protection concepts.

## Classification

**Proof of Concept — Completed**

Experimental project used to explore automated PII detection. It is not currently under active development.
