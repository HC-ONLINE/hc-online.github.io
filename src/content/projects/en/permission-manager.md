---
title: "PermissionManager"
description: "RBAC authorization study built with Spring Boot and Spring Security, comparing stateless JWT authentication with stateful HTTP sessions."
subtitle: "Role-based and policy-oriented authorization"
stack: "Java 21, Spring Boot, Spring Security, JPA, MySQL, Docker"
github: "https://github.com/HC-ONLINE/PermissionManager"
site: null
---

## 1. Summary

PermissionManager is a technical study of authorization and access control built with Java 21, Spring Boot, and Spring Security.

The project implements a role-based authorization model (RBAC), permissions, ownership checks, and additional authorization rules while comparing two authentication mechanisms within the same domain: stateless JWT and stateful HTTP sessions.

The main objective is to demonstrate the separation between authentication and authorization and analyze how authentication decisions affect backend architecture.

---

## 2. Context / Problem

Authentication determines who a user is, while authorization determines what that user can do within a system.

In backend applications, mixing both responsibilities can lead to security logic that becomes difficult to maintain and test.

PermissionManager explores this separation through a common authorization domain and two different authentication mechanisms.

The project provides a practical study of:

- Stateless authentication using JWT.
- Stateful authentication using HTTP sessions.
- Role- and permission-based authorization.
- Ownership checks.
- Method-level security.
- Architectural differences between both approaches.

---

## 3. Solution

PermissionManager maintains a common authorization model and evaluates it through two independent authentication mechanisms.

### Authorization Model

Authorization decisions are represented through:

```text
decide(subject, resource, action, context)
        ↓
   ALLOW | DENY
````

Where:

- **subject** — Authenticated identity and roles.
- **resource** — Resource being accessed.
- **action** — Requested operation.
- **context** — Additional information such as ownership or special privileges.

### Roles

- **USER** — Basic permissions over allowed resources.
- **SUPPORT** — Support and audit-related access.
- **ADMIN** — User and configuration administration.

### JWT Authentication

The `rbac-jwt` branch implements:

- Stateless authentication.
- Bearer Token authentication.
- HMAC-SHA256 signed tokens.
- Expiration validation.
- Custom authentication filter.

### Session Authentication

The `rbac-session` branch implements:

- Stateful authentication.
- Spring Security form login.
- HTTP sessions.
- Session-based SecurityContext.
- CSRF protection.

---

## 4. Architecture

The project maintains the same authorization domain while changing the authentication mechanism.

![PermissionManager architecture](/images/projects/permissionmanager/architecture.png)

*Comparison of stateless JWT and stateful HTTP session flows using the shared authorization model.*

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
Database
    ↓
Valid credentials
    ↓
JwtUtil
    ↓
Signed JWT
    ↓
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
    ↓
Authorization decision
    ↓
ALLOW / DENY
```

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
Database
    ↓
Valid credentials
    ↓
HttpSession
    ↓
JSESSIONID cookie
    ↓
SecurityContext
    ↓
Protected resource
    ↓
Authorization decision
    ↓
ALLOW / DENY
```

---

## 5. Technology Stack

| Technology      | Purpose                          |
| --------------- | -------------------------------- |
| Java 21         | Language and runtime             |
| Spring Boot     | Backend framework                |
| Spring Security | Authentication and authorization |
| Spring Data JPA | Persistence                      |
| Hibernate       | ORM                              |
| MySQL           | Application database             |
| H2              | Test database                    |
| Maven           | Build and dependency management  |
| Docker          | Containerization                 |
| Docker Compose  | Runtime environment              |

### Security

| Mechanism      | JWT                                    | Sessions        |
| -------------- | -------------------------------------- | --------------- |
| Authentication | Bearer Token                           | HTTP Session    |
| State          | Stateless                              | Stateful        |
| CSRF           | Not applicable to the token model used | Implemented     |
| Security       | Spring Security                        | Spring Security |
| Primary client | API                                    | Browser         |

---

## 6. Implemented Features

### Authorization

- RBAC with `USER`, `SUPPORT`, and `ADMIN` roles.
- Explicit permissions for protected operations.
- Ownership checks.
- Method-level authorization using `@PreAuthorize`.
- Protection against deleting the last `ADMIN` user.
- Structured responses for denied authorization decisions.

### JWT Authentication

- Email and password login.
- JWT generation and validation.
- Custom Bearer Token authentication filter.
- Expiration validation.
- Configurable JWT secrets through environment variables.

### Session Authentication

- Thymeleaf login form.
- HTTP session-based authentication.
- CSRF protection.
- Logout and session invalidation.
- Authenticated state management.

### Backend

- REST API built with Spring Boot.
- JPA/Hibernate persistence.
- DTO validation with Jakarta Validation.
- Centralized exception handling.
- Seed data for users, roles, and permissions.

---

## 7. Key Technical Decisions

### Branch Separation

JWT and session authentication are maintained in separate branches instead of combining both models through feature flags.

**Advantage:** enables direct comparison of configurations, flows, and tests without unnecessary coupling.

**Trade-off:** requires maintaining two implementations.

### Custom JWT Filter

The project uses `JwtRequestFilter` and `JwtUtil` to make token generation and validation explicit.

**Advantage:** makes JWT authentication and Spring Security internals easier to study.

**Trade-off:** a production application could use standard abstractions such as OAuth2 Resource Server.

### Policy-Based Authorization

The authorization logic considers subject, resource, action, and context instead of relying exclusively on roles.

**Advantage:** supports rules such as ownership and special privileges.

**Trade-off:** introduces more complexity than simple role-only authorization.

### BCrypt

Passwords are stored using BCrypt.

**Advantage:** avoids plaintext password storage and uses a password-oriented hashing algorithm.

**Trade-off:** computational cost must be balanced against the application's performance requirements.

---

## 8. Security

### Implemented Mechanisms

- Credential validation.
- BCrypt password hashing.
- Protected endpoints through Spring Security.
- Role- and permission-based authorization.
- Ownership checks.
- Method-level security.
- CSRF protection for session authentication.
- Externalized JWT secrets.
- Session invalidation during logout.

### Scope

The project is a technical study and **should not be considered a production-ready security implementation**.

It currently does not implement:

- Active JWT revocation.
- Refresh tokens.
- Rate limiting.
- Distributed session management.
- OAuth2.
- Production-specific CORS configuration.
- Centralized secret management.
- Complete persistent auditing.

---

## 9. Testing & Quality

The project includes tests focused primarily on security flows.

### JWT

- Successful login.
- Token generation.
- Access without a token.
- Invalid or malformed tokens.
- Access with insufficient permissions.

### Sessions

- Successful and failed login.
- CSRF protection.
- Non-existent or inactive users.
- Access without a session.
- Authorization restrictions.

### Testing Tools

- JUnit 5.
- Mockito.
- MockMvc.
- Spring Security Test.
- H2.

---

## 10. Visual Evidence

![PermissionManager architecture](/images/projects/permissionmanager/architecture.png)

*Overall architecture and authentication mechanism comparison.*

![PermissionManager JWT flow](/images/projects/permissionmanager/jwt-flow.png)

*JWT authentication flow from login to the authorization decision.*

![PermissionManager comparison](/images/projects/permissionmanager/comparison.png)

*Comparison between stateless JWT authentication and stateful HTTP session authentication.*

---

## 11. Status & Limitations

**Classification:** Proof of Concept / Technical Study

PermissionManager is maintained as a study and reference project focused on authentication, authorization, and backend architecture.

The goal is not to provide a complete IAM system, but to demonstrate through executable implementations how authentication and authorization can be separated and how different authentication models can be compared within the same domain.

### Current Limitations

- No active JWT revocation.
- No refresh tokens.
- No rate limiting.
- Sessions use in-memory storage.
- Audit data is limited/mocked.
- No CI/CD pipeline.
- No OpenAPI documentation.
- No OAuth2 integration.
- Some configurations are intended for demonstration environments.

---

## 12. Future Evolution

Potential extensions include:

1. Implement refresh tokens.
2. Add JWT revocation using Redis.
3. Implement rate limiting.
4. Add distributed session storage.
5. Integrate OAuth2/OIDC.
6. Add OpenAPI documentation.
7. Introduce CI/CD.
8. Implement observability and persistent auditing.
9. Fully externalize secrets.
10. Perform security hardening for production environments.
