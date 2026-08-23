---
title: "AccessManager"
description: "Backend authentication study project implementing and comparing stateless JWT authentication with stateful HTTP sessions using Spring Boot and Spring Security."
subtitle: "Practical comparison of authentication architectures"
stack: "Java 21, Spring Boot, Spring Security, JPA, MySQL, Docker"
github: "https://github.com/HC-ONLINE/AccessManager"
site: null
---

## 1. Summary

AccessManager is a technical study project focused on understanding and comparing two backend authentication models: stateless JWT authentication and stateful HTTP sessions.

The same functional domain is implemented through two independent branches, each with its own Spring Security configuration, authentication flow, and tests.

The goal is not to build a production-ready authentication system, but to turn the differences between both models into executable and comparable implementations.

## 2. Context / Problem

Choosing an authentication mechanism affects architectural decisions related to state management, credential revocation, scalability, client type, and operational complexity.

AccessManager studies these differences within the same functional domain, avoiding a purely theoretical comparison.

The project explores questions such as:

- How does the authentication flow differ between JWT and sessions?
- Where is authenticated state maintained?
- How is authorization implemented in each model?
- What advantages and limitations does each strategy introduce?
- How does the Spring Security configuration change between approaches?

## 3. Solution

AccessManager implements two independent authentication strategies.

### JWT — `auth-jwt` branch

- Stateless authentication.
- REST API login.
- JWT generation and validation.
- HMAC-SHA256 signing.
- Custom `JwtRequestFilter`.
- Token expiration validation.
- Role-based authorization.
- Protected endpoints.

### HTTP Sessions — `auth-session` branch

- Stateful authentication.
- Spring Security form login.
- HTTP session management.
- `JSESSIONID` cookie.
- CSRF protection.
- Logout with session invalidation.
- Thymeleaf-rendered pages.

### Shared Domain

Both implementations include:

- User management.
- Roles and authorization.
- Protected resources.
- JPA persistence.
- BCrypt password hashing.

## 4. Architecture

### JWT Flow

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
    ↓
Valid credentials
    ↓
JwtUtil
    ↓
HMAC-SHA256 signed JWT
    ↓
Authorization: Bearer <token>
    ↓
JwtRequestFilter
    ↓
Token validation
    ↓
SecurityContext
    ↓
Protected resource
````

### Session Flow

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
    ↓
Valid credentials
    ↓
HttpSession
    ↓
JSESSIONID
    ↓
SecurityContext
    ↓
Protected page
```

![AccessManager architecture comparison](/images/projects/accessmanager/architecture.png)

*Comparison of JWT and HTTP session authentication flows.*

The architecture keeps both strategies separate so their configurations, flows, and tests can be studied independently.

## 5. Technology Stack

| Technology      | Purpose                                     |
| --------------- | ------------------------------------------- |
| Java 21         | Language and runtime                        |
| Spring Boot     | Application framework                       |
| Spring Security | Authentication and authorization            |
| Spring Data JPA | Persistence                                 |
| MySQL           | Database                                    |
| H2              | Test database                               |
| Maven           | Build and project management                |
| JWT             | Stateless authentication                    |
| Thymeleaf       | Server-side rendering in the session branch |
| Docker          | Containerization                            |
| Docker Compose  | Runtime environment                         |

### Security

| Mechanism     | JWT                              | Sessions             |
| ------------- | -------------------------------- | -------------------- |
| State         | Stateless                        | Stateful             |
| Credential    | JWT                              | JSESSIONID           |
| CSRF          | Not applicable to the same model | Implemented          |
| Authorization | Roles                            | Roles                |
| Revocation    | Limited by expiration            | Session invalidation |

## 6. Implemented Features

### Authentication

- Email and password login.
- JWT generation and validation.
- HTTP session-based authentication.
- Logout and session invalidation.
- Protected authenticated resources.

### Authorization

- User roles.
- Access control through Spring Security.
- Protected resources.
- Permission checks during requests.

### Security

- BCrypt password hashing.
- HMAC-SHA256 JWT signing.
- Token expiration validation.
- CSRF protection in the session-based implementation.
- Jakarta Validation for input validation.

### Infrastructure

- Spring Data JPA persistence.
- MySQL runtime database.
- H2 test database.
- Docker and Docker Compose.

## 7. Key Technical Decisions

### Independent Implementations

JWT and session authentication are maintained in separate branches instead of being combined through dynamic configuration.

**Advantage:** allows configurations, flows, and tests to be compared directly without coupling fundamentally different security models.

**Trade-off:** requires maintaining two implementations.

### Custom JWT Filter

The JWT branch uses `JwtRequestFilter` and `JwtUtil` to make token extraction, validation, and processing explicit.

**Advantage:** makes the JWT authentication flow inside Spring Security easier to study.

**Trade-off:** a production implementation could use standardized solutions such as OAuth 2.0 Resource Server instead of maintaining custom JWT logic.

### BCrypt

Passwords are not stored in plaintext and are processed using BCrypt.

**Advantage:** provides password-specific hashing designed to make offline brute-force attacks more expensive.

**Trade-off:** the computational cost must be configured according to system requirements and available resources.

### HTTP Sessions for Stateful Applications

The session branch uses the traditional server-managed authentication model.

**Advantage:** provides direct session invalidation and explicit control over authenticated state.

**Trade-off:** distributed architectures require shared session storage or another mechanism for coordinating session state.

## 8. Security

### Implemented Mechanisms

- BCrypt password hashing.
- HMAC-SHA256 signed JWTs.
- Token expiration validation.
- Role-based authorization.
- CSRF protection in the session branch.
- Session invalidation during logout.
- Input validation.
- Protected endpoints using Spring Security.

### Security Limitations

The project is a technical study and should not be interpreted as a hardened production security configuration.

It currently does not include:

- Refresh tokens.
- Immediate JWT revocation.
- Rate limiting.
- Distributed session management.
- OAuth2/OIDC integration.
- External secret management.
- Dedicated CORS configuration.
- Dedicated HTTP security header configuration.
- Advanced security observability.

The implementations are therefore intended to study authentication mechanisms and their trade-offs, not to be directly deployed as components of a critical production system.

## 9. Testing & Quality

The project includes tests primarily focused on validating security flows.

### JWT

- Authentication tests.
- Authorization tests.
- Token validation.
- MockMvc.
- Spring Security Test.

### Sessions

- Login and logout tests.
- CSRF protection validation.
- Session management tests.
- H2 integration.

### Tools

- JUnit 5.
- MockMvc.
- Spring Security Test.
- H2.

No coverage or benchmark claims are presented because there are not enough verified measurements to support them.

## 10. Visual Evidence

### Architecture Comparison

![AccessManager architecture comparison](/images/projects/accessmanager/architecture.png)

*Comparison between JWT and HTTP session authentication flows.*

### JWT Authentication

![AccessManager JWT authentication](/images/projects/accessmanager/jwt-flow.png)

*Authentication flow from login to protected resource access using JWT.*

### Session Authentication

![AccessManager session authentication](/images/projects/accessmanager/session-login.png)

*Stateful authentication using Spring Security, HTTP sessions, and Thymeleaf.*

## 11. Status & Limitations

**Classification:** Proof of Concept / Technical Study

AccessManager is maintained as a technical reference project rather than a production product.

### Current Limitations

- No refresh tokens.
- No immediate JWT revocation.
- Sessions use in-memory storage.
- No distributed session storage.
- No rate limiting.
- No OAuth2/OIDC integration.
- No CI/CD pipeline.
- No OpenAPI documentation.
- No verified performance metrics.
- Configuration is intended for study and demonstration environments.

Some of these limitations are intentional because the primary objective is to study authentication mechanisms rather than build a complete IAM platform.

## 12. What This Project Demonstrates

AccessManager demonstrates practical experience with:

- Backend authentication design.
- Spring Security configuration.
- JWT implementation.
- HTTP session management.
- Role-based authorization.
- CSRF protection.
- Password hashing.
- Layered backend architecture.
- JPA/Hibernate persistence.
- Security testing.
- Docker and Docker Compose.
- Architectural trade-off analysis.

The main value of the project is not implementing JWT or sessions in isolation, but **comparing both strategies within the same domain and understanding how the authentication mechanism affects backend architecture, scalability, state management, and access control**.
