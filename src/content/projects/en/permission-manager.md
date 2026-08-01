---
title: "PermissionManager"
description: "RBAC System with Explainable and Auditable Policies"
subtitle: "RBAC System with Explainable and Auditable Policies"
stack: "Java 21, Spring Boot, Spring Security, PostgreSQL, Maven"
github: "https://github.com/HC-ONLINE/PermissionManager"
---

## The Problem It Solves

* Prevents implicit or opaque access controls through deterministic and traceable evaluations.
* Facilitates auditing, reviews, and compliance (logging of decisions and motives).
* Provides an extensible base for enterprise RBAC models and attribute-based policies.

## Key Features

* Deterministic permission and policy evaluator (audit trail per evaluation).
* REST API for managing roles, permissions, and policies.
* Integration with Spring Security to apply decisions at runtime.
* Tests and examples of auditable policies.

## Technical Decision

* Does not treat authorization as a "black box": every verdict carries metadata (which rules were evaluated, inputs, and result).
* Designed for regulated environments where access explanation is a requirement.
