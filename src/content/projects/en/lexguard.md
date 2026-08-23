---
title: "LexGuard"
description: "Python proof of concept for detecting potential personal data in text using rule-based and deterministic analysis."
subtitle: "Sensitive data detection in text"
stack: "Python"
github: "https://github.com/HC-ONLINE/LexGuard"
---

## 1. Summary

LexGuard is a Python proof of concept for exploring the automated detection of potential personally identifiable information (PII) within text.

The project implements a deterministic analysis workflow based on predefined rules and patterns. Its purpose is not to provide a complete data protection system, but to validate a programmatic approach to the problem and explore an extensible architecture for future privacy and security tooling.

## 2. Context / Problem

Personal data can unintentionally appear in documents, text files, or system inputs. Manually identifying this information does not scale well and makes it harder to introduce privacy controls early in the data-processing lifecycle.

LexGuard explores how a first layer of identification can be automated through deterministic rules that analyze text and flag potential matches for further review.

An important assumption of the project is that pattern detection is not the same as contextual understanding. Therefore, results should be treated as indicators rather than definitive decisions about whether information is personal data.

## 3. Solution

LexGuard processes text files through a deterministic analysis pipeline consisting of:

1. Content ingestion.
2. Detection rule execution.
3. Potential match identification.
4. Result processing.
5. Structured output generation.

The architecture separates input processing from detection mechanisms, allowing new rules to be introduced without completely redesigning the analysis workflow.

![LexGuard architecture diagram](/images/projects/lexguard/architecture.png)

## 4. Architecture

The system follows a deterministic flow:

```text
Input
  │
  ▼
Ingestion
  │
  ▼
Detection Rules
  │
  ▼
Matches
  │
  ▼
Analysis
  │
  ▼
Structured Output
```

### Detection

Rules analyze the input content for patterns associated with potential personal data.

### Separation of Responsibilities

Detection logic is kept separate from input processing, allowing the rule set to grow without turning the entire pipeline into a monolithic implementation.

### Deterministic Processing

The same input and rule set produce reproducible results, making the system easier to inspect and debug.

## 5. Technology Stack

| Technology | Purpose                                     |
| ---------- | ------------------------------------------- |
| Python     | Pipeline implementation and detection logic |

The project intentionally uses a small technology stack because its primary goal is to validate the detection approach and architectural separation rather than build a complete platform.

## 6. Implemented Features

* Text file processing.
* Potential personal-data detection using predefined patterns.
* Extensible detection rules.
* Deterministic processing.
* Structured results.
* Separation between ingestion and detection logic.
* Command-line interface.
* Workflow designed to support additional detection categories.

## 7. Technical Decisions

### Rule-Based Detection

The project uses predefined detection patterns instead of machine learning models.

**Advantage:** deterministic, interpretable, and easy to debug.

**Trade-off:** unable to reliably identify information that depends on context or does not match the predefined patterns.

### Extensible Architecture

Detection rules are separated from the main processing workflow.

**Advantage:** new detectors can be introduced without redesigning the entire pipeline.

**Trade-off:** each new category requires dedicated rules that must be created and maintained.

### Python Implementation

Python was selected to keep the prototype simple and fast to develop.

**Advantage:** low experimentation cost and a strong ecosystem for text processing.

**Trade-off:** the current implementation does not include the optimizations, testing, and operational controls required to justify it as a high-volume production detection service.

## 8. Security and Privacy

LexGuard should be considered a **detection tool**, not a protection mechanism.

The system identifies potential matches for personal information, but it does not guarantee complete detection of personal data or that every match actually represents personal information.

Therefore:

* Results may contain false positives.
* False negatives are possible.
* Pattern-based rules do not provide contextual understanding.
* Results require validation before being used for privacy or compliance decisions.
* The project does not implement storage, anonymization, or automatic deletion of detected data.

The main security consideration is avoiding the interpretation of detection results as a guarantee of complete coverage.

## 9. Testing & Quality

The current project does not include an automated quality infrastructure.

Currently:

* No automated test suite.
* No CI/CD pipeline.
* No automated linting.
* No automated type checking.

Because the project is a proof of concept, these capabilities were outside the initial scope.

Turning the project into a maintainable detection tool would require tests for individual detection rules, edge cases, and scenarios designed to measure false positives and false negatives.

## 10. Usage Workflow

LexGuard is designed as a command-line tool.

The conceptual workflow is:

```text
Text File
    │
    ▼
LexGuard
    │
    ├── Detection Rules
    │
    ▼
Detected Matches
    │
    ▼
Structured Result
```

There is currently no web interface or backend associated with the project.

## 11. Status & Limitations

**Classification:** Proof of Concept — Completed

LexGuard is considered a completed proof of concept and is not presented as a production product.

Main limitations include:

* Limited PII category coverage.
* Dependence on predefined patterns.
* No contextual analysis.
* Potential false positives and false negatives.
* No automated tests.
* No CI/CD pipeline.
* No REST API.
* No web interface.
* No anonymization or automatic remediation.
* No coverage guarantees for regulatory or compliance scenarios.

These limitations are an important part of the project's outcome: they demonstrate where a deterministic approach becomes insufficient and where additional techniques would be required.

## 12. Evolution & What It Demonstrates

A reasonable evolution path would include:

1. Expanding detection categories.
2. Adding dedicated tests for each detection rule.
3. Measuring false positives and false negatives.
4. Adding contextual validation through NLP.
5. Supporting JSON and CSV inputs.
6. Adding JSON, CSV, and HTML outputs.
7. Exposing the analysis through a REST API.
8. Adding anonymization or redaction mechanisms.
9. Introducing CI/CD and automated quality checks.

### What It Demonstrates

LexGuard demonstrates:

* Automation of privacy-related analysis.
* Programmatic text processing.
* Deterministic rule design.
* Extensible architecture.
* Separation of responsibilities.
* Understanding of the limitations of pattern-only detection.
* Python-based security and privacy tooling.

The main technical value of the project is not implementation complexity, but demonstrating how the problem was decomposed into a reproducible and extensible pipeline while explicitly identifying the limitations of the selected approach.
