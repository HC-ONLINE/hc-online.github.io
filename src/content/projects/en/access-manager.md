---
title: "AccessManager"
description: "Backend authentication study project built with Spring Boot and Spring Security, implementing and comparing stateless JWT authentication with stateful HTTP sessions."
subtitle: "Authentication architecture comparison with Spring Security"
stack: "Java, Spring Boot, Spring Security, JPA, MySQL, Docker"
github: "https://github.com/HC-ONLINE/AccessManager"
---

## Overview

AccessManager is a technical reference project focused on studying different authentication strategies for backend applications.

The same functional domain is implemented using two independent approaches:

- **JWT** — stateless authentication for API-oriented architectures.
- **HTTP Sessions** — stateful authentication for web applications.

Each implementation lives in its own branch with independent security configuration, authentication flow, tests and documentation.

The project is not intended to represent a production-ready authentication system. Its purpose is to make the trade-offs between both approaches concrete through executable implementations.

## Technical Problem

Choosing between JWT and HTTP sessions involves practical trade-offs around:

- horizontal scalability;
- credential revocation;
- state management;
- session auditing;
- client type;
- implementation complexity.

AccessManager implements both models within the same domain to make these trade-offs easier to evaluate in practice.

## Architecture

### JWT implementation

The `auth-jwt` branch uses a stateless architecture:

```text
HTTP Client
    ↓
POST /api/auth/login
    ↓
AuthController
    ↓
AuthenticationManager
    ↓
UserDetailsService
    ↓
MySQL

Valid credentials
    ↓
JwtUtil
    ↓
HS256 signed JWT

Protected request
    ↓
Authorization: Bearer <token>
    ↓
JwtRequestFilter
    ↓
Token validation
    ↓
SecurityContext
    ↓
ProtectedController
```

Authorization is handled through roles and Spring Security access restrictions.

### Session implementation

The `auth-session` branch uses a stateful architecture:

```text
Browser
    ↓
Login form
    ↓
Spring Security FilterChain
    ↓
AuthenticationManager
    ↓
UserDetailsService
    ↓
MySQL

Valid credentials
    ↓
HttpSession
    ↓
JSESSIONID cookie
    ↓
SecurityContext
    ↓
Protected page
```

This approach allows server-side session state to be invalidated immediately.

## Capabilities

### JWT authentication

- Email and password login.
- JWT generation and validation.
- HMAC-SHA256 signing.
- Custom token validation filter.
- Role-based authorization.
- Protected endpoints.
- Jakarta Validation for input validation.
- Security tests using MockMvc.

### Session authentication

- Thymeleaf login form.
- HTTP session-based authentication.
- CSRF protection.
- Logout with session invalidation.
- Protected page for authenticated users.
- User state management.
- BCrypt password migration.
- Integration tests using H2.

## Approach Comparison

| Aspect         | JWT                                     | HTTP Session                                 |
| -------------- | --------------------------------------- | -------------------------------------------- |
| Model          | Stateless                               | Stateful                                     |
| State          | Not stored server-side                  | Stored server-side                           |
| Scalability    | Well suited to distributed scenarios    | Requires shared-session strategy for scaling |
| Revocation     | Not immediate                           | Immediate                                    |
| Primary client | APIs / distributed applications         | Web applications                             |
| Credential     | Signed token                            | Session cookie                               |
| CSRF           | Not required for the implemented scheme | CSRF protection implemented                  |
| Complexity     | More token lifecycle responsibility     | Centralized session management               |

The project makes these trade-offs observable through working implementations rather than only theoretical comparisons.

## Engineering

- **Spring Security** — authentication, authorization, filters and CSRF protection.
- **Branch separation** — each authentication model can be executed and tested independently.
- **Layered architecture** — separation between controllers, services, security, persistence and domain models.
- **Persistence** — Spring Data JPA with MySQL.
- **Testing** — MockMvc, Spring Security Test, JUnit 5 and H2 for the session implementation.
- **Containerization** — multi-stage Dockerfile and Docker Compose for the application and database.
- **Validation** — Jakarta Validation DTOs in the JWT implementation.

## Technical Decisions

### Custom JWT filter

The implementation uses `JwtRequestFilter` and `JwtUtil` to make the token generation and validation process explicit.

This makes the internals of JWT authentication and Spring Security easier to study, although a production system could rely on abstractions such as OAuth2 Resource Server.

### Independent implementations

JWT and session authentication are not combined through feature flags. Each approach has its own branch.

This reduces coupling between fundamentally different security models and makes their configurations and tests easier to compare.

### BCrypt

Passwords are stored using BCrypt in both implementations.

The configured cost differs between the branches. This is part of the current state of the study project and should not be interpreted as a standardized production configuration.

## Security

### Implemented mechanisms

- BCrypt password hashing.
- HMAC-SHA256 signed JWTs.
- Token expiration validation.
- Role-based authorization.
- CSRF protection for session authentication.
- Session invalidation through logout.
- Input validation.
- Protected endpoints using Spring Security.

## Testing

The JWT implementation includes security tests using MockMvc.

The session implementation includes integration tests using an in-memory H2 database.

The tests primarily cover:

- authentication;
- access to protected resources;
- role-based authorization;
- authenticated and unauthenticated access;
- CSRF protection in the session implementation.

## Current Limitations

AccessManager is an educational and technical reference project, not a production-ready IAM system.

Current limitations include:

- No refresh tokens.
- No immediate JWT revocation.
- No rate limiting.
- No CORS configuration.
- No dedicated HTTP security header configuration.
- Sessions are stored in memory.
- No distributed session storage.
- No OAuth2 integration.
- No observability or metrics.
- No CI/CD pipeline.
- No OpenAPI documentation.
- Configuration contains values intended for demonstration environments.

These limitations are consistent with the project's comparative and educational purpose.

## Possible Evolution

The project documents potential extensions such as:

- refresh tokens;
- JWT revocation using Redis;
- rate limiting;
- OAuth2;
- concurrent session management;
- Remember Me;
- distributed session storage using Redis or JDBC.

It could also evolve toward a more production-oriented configuration through:

- externalized secret management;
- security headers;
- controlled CORS;
- structured logging;
- observability;
- CI/CD;
- Testcontainers;
- Flyway or Liquibase;
- OpenAPI documentation.

## What This Project Demonstrates

- Backend authentication design.
- Spring Security.
- JWT implementation.
- HTTP session management.
- Role-based authorization.
- CSRF protection.
- Layered architecture.
- JPA/Hibernate persistence.
- Security testing.
- Docker and Docker Compose.
- Architectural trade-off analysis.

## Visuals

<!-- IMAGE 01 — Architecture comparison -->

![AccessManager architecture comparison](/images/projects/accessmanager/architecture.png)

*Comparison of JWT and HTTP session authentication flows.*

<!-- IMAGE 02 — JWT flow -->

![AccessManager JWT authentication](/images/projects/accessmanager/jwt-flow.png)

*JWT authentication flow from login to protected resource access.*

<!-- IMAGE 03 — Session authentication -->

![AccessManager session authentication](/images/projects/accessmanager/session-login.png)

*HTTP session authentication implemented with Spring Security and Thymeleaf.*

## Short Description

Backend authentication study project comparing stateless JWT and stateful HTTP sessions using Spring Boot and Spring Security.

## Status

### Proof of Concept / Technical Study

AccessManager is maintained as a reference project for studying and comparing authentication architectures. It is not presented as a production-ready product.
