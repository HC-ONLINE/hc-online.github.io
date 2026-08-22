---
title: "PermissionManager"
description: "RBAC authorization system built with Spring Boot and Spring Security, comparing stateless JWT authentication with stateful HTTP sessions."
subtitle: "Role-based and policy-oriented authorization"
stack: "Java 21, Spring Boot, Spring Security, JPA, MySQL, Docker"
github: "https://github.com/HC-ONLINE/PermissionManager"
---

## Overview

PermissionManager is a technical study focused on authorization and access control. It implements a Role-Based Access Control (RBAC) model and compares two authentication mechanisms within the same functional domain: stateless JWT and stateful HTTP sessions.

The project focuses on clearly separating authentication from authorization while examining the architectural trade-offs of each approach in a Spring Security backend application.

## Architecture

The same authorization domain is maintained across both implementations while the authentication mechanism changes by branch:

* `rbac-jwt` — stateless JWT authentication.
* `rbac-session` — stateful HTTP session authentication.

## Capabilities

### Authorization

* RBAC with `USER`, `SUPPORT` and `ADMIN` roles.
* Explicit permissions for user and audit operations.
* Ownership checks for user-owned resources.
* Method-level authorization using `@PreAuthorize`.
* Protection against deleting the last `ADMIN` user.
* Structured responses for denied authorization decisions.

### Authentication

* JWT generation and validation.
* Custom Bearer Token authentication filter.
* HTTP session-based authentication.
* Spring Security form login.
* Session invalidation and logout in the stateful implementation.

### Backend

* REST API built with Spring Boot.
* JPA/Hibernate persistence.
* DTO validation.
* Centralized exception handling.
* Seed data for users, roles and permissions.

## Architecture Comparison

The project uses two branches to examine the differences between stateless and stateful authentication.

| Aspect             | JWT                      | HTTP Sessions                              |
| ------------------ | ------------------------ | ------------------------------------------ |
| State              | Stateless                | Stateful                                   |
| Horizontal scaling | Simplified               | Requires shared state or sticky sessions   |
| Revocation         | Limited until expiration | Immediate                                  |
| Storage            | Client-side token        | Server-side session                        |
| Typical use case   | Distributed APIs         | Web applications requiring session control |

This separation makes it possible to compare the architectural decisions without changing the underlying authorization model.

## Engineering

* **Separation of concerns** — authentication, authorization, services and persistence are kept in separate layers.
* **Spring Security** — filter configuration, `SecurityFilterChain`, method-level authorization and CSRF protection in the session-based implementation.
* **RBAC model** — users, roles and permissions are represented through JPA entities.
* **Validation** — DTOs use Jakarta Validation to validate endpoint input.
* **Persistence** — MySQL for application execution and H2 for tests.
* **Containerization** — multi-stage Docker build and Docker Compose for the application and MySQL.
* **Testing** — JUnit, Mockito, MockMvc and Spring Security Test for authentication and authorization flows.

## Security

The project focuses on the boundary between authentication and authorization.

Implemented mechanisms include:

* Credential validation against the database.
* Protected endpoints through Spring Security.
* Role- and permission-based authorization.
* Ownership checks.
* CSRF protection in the session-based branch.
* Configurable JWT secrets through environment variables.
* Session invalidation during logout.

The project is intentionally a technical study and does not attempt to provide a complete production security configuration.

## Testing

Tests cover several security scenarios.

### JWT branch

* Successful login and token generation.
* Access without a token.
* Invalid or malformed tokens.
* Access with insufficient permissions.

### Session branch

* Successful and failed login.
* CSRF protection.
* Non-existent or inactive users.
* Access without a session.
* Authorization restrictions.

Testing uses MockMvc and Spring Security testing utilities.

## Current Limitations

* No active JWT revocation.
* No refresh token mechanism.
* No rate limiting.
* Audit data is currently mocked.
* Sessions are stored in memory.
* No CORS configuration.
* No custom frontend.
* No CI/CD pipeline.
* Some example credentials and configuration are intended for development only.

## Project Status

### Proof of Concept / Technical Study

PermissionManager is an educational and comparative project focused on backend architecture and application security.

It is not presented as a production-ready authorization product. Its primary purpose is to demonstrate how different authentication mechanisms can coexist with the same authorization model and how their trade-offs influence system design.

## What This Project Demonstrates

* REST API development with Spring Boot.
* Authentication and authorization with Spring Security.
* RBAC design.
* Separation of authentication and authorization.
* Comparison of stateless and stateful architectures.
* Relational persistence with JPA/Hibernate.
* Security-focused testing.
* Docker containerization.
* Backend architecture trade-off analysis.

## Visuals

<!-- IMAGE 01 — Architecture comparison -->

![PermissionManager architecture](/images/projects/permissionmanager/architecture.png)

*Comparison of stateless JWT and stateful HTTP session flows with the shared RBAC authorization engine.*

<!-- IMAGE 02 — JWT flow -->

![PermissionManager JWT flow](/images/projects/permissionmanager/jwt-flow.png)

*Complete JWT authentication flow: from login to the ALLOW/DENY authorization decision.*

<!-- IMAGE 03 — Comparison table -->

![PermissionManager comparison](/images/projects/permissionmanager/comparison.png)

*Comparison table of the two authentication mechanisms: JWT vs HTTP sessions.*

## Short Description

Technical study comparing stateless JWT and stateful HTTP sessions with an RBAC authorization engine in Spring Boot.

## Status

### Proof of Concept / Technical Study

PermissionManager is maintained as an educational and comparative project for studying backend architecture and application security. It is not presented as a production-ready authorization system.
