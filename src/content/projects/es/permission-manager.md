---
title: "PermissionManager"
description: "Estudio técnico de autorización RBAC construido con Spring Boot y Spring Security, con comparación de autenticación JWT stateless y sesiones HTTP stateful."
subtitle: "Autorización basada en roles y políticas"
stack: "Java 21, Spring Boot, Spring Security, JPA, MySQL, Docker"
github: "https://github.com/HC-ONLINE/PermissionManager"
site: null
---

## 1. Resumen

PermissionManager es un estudio técnico de autorización y control de acceso construido con Java 21, Spring Boot y Spring Security.

El proyecto implementa un modelo de autorización basado en roles (RBAC), permisos, ownership y reglas adicionales, mientras compara dos mecanismos de autenticación dentro del mismo dominio: JWT stateless y sesiones HTTP stateful.

El objetivo principal es demostrar la separación entre autenticación y autorización y analizar cómo las decisiones de autenticación afectan la arquitectura del backend.

---

## 2. Contexto / Problema

La autenticación determina quién es un usuario, mientras que la autorización determina qué puede hacer dentro del sistema.

En aplicaciones backend, mezclar ambas responsabilidades puede generar lógica de seguridad difícil de mantener y probar.

PermissionManager explora esta separación mediante un dominio común de autorización y dos mecanismos de autenticación diferentes.

El proyecto permite estudiar en la práctica:

- Autenticación stateless mediante JWT.
- Autenticación stateful mediante sesiones HTTP.
- Autorización basada en roles y permisos.
- Verificaciones de ownership.
- Seguridad a nivel de método.
- Diferencias arquitectónicas entre ambos modelos.

---

## 3. Solución

PermissionManager mantiene un modelo de autorización común y permite evaluarlo utilizando dos mecanismos de autenticación independientes.

### Modelo de autorización

La lógica de autorización se representa mediante una decisión basada en:

```text
decide(subject, resource, action, context)
        ↓
   ALLOW | DENY
````

Donde:

- **subject** — identidad autenticada y sus roles.
- **resource** — recurso sobre el que se solicita acceso.
- **action** — operación solicitada.
- **context** — información adicional como ownership o privilegios especiales.

### Roles

- **USER** — permisos básicos sobre recursos permitidos.
- **SUPPORT** — acceso relacionado con soporte y auditoría.
- **ADMIN** — administración de usuarios y configuración.

### Autenticación JWT

La rama `rbac-jwt` implementa:

- Autenticación stateless.
- Bearer Token.
- Tokens firmados mediante HMAC-SHA256.
- Validación de expiración.
- Filtro personalizado de autenticación.

### Autenticación mediante sesiones

La rama `rbac-session` implementa:

- Autenticación stateful.
- Form login de Spring Security.
- HTTP sessions.
- SecurityContext basado en sesión.
- Protección CSRF.

---

## 4. Arquitectura

El proyecto mantiene el mismo dominio de autorización mientras cambia el mecanismo de autenticación.

![Arquitectura de PermissionManager](/images/projects/permissionmanager/architecture.png)

*Comparación de los flujos JWT stateless y sesiones HTTP stateful con el modelo de autorización compartido.*

### Flujo JWT

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

### Flujo de sesión

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

## 5. Stack Tecnológico

| Tecnología      | Propósito                       |
| --------------- | ------------------------------- |
| Java 21         | Lenguaje y runtime              |
| Spring Boot     | Framework backend               |
| Spring Security | Autenticación y autorización    |
| Spring Data JPA | Persistencia                    |
| Hibernate       | ORM                             |
| MySQL           | Base de datos de aplicación     |
| H2              | Base de datos para pruebas      |
| Maven           | Build y gestión de dependencias |
| Docker          | Containerización                |
| Docker Compose  | Entorno de ejecución            |

### Seguridad

| Mecanismo         | JWT                                    | Sesiones        |
| ----------------- | -------------------------------------- | --------------- |
| Autenticación     | Bearer Token                           | HTTP Session    |
| Estado            | Stateless                              | Stateful        |
| CSRF              | No aplica al modelo de token utilizado | Implementado    |
| Seguridad         | Spring Security                        | Spring Security |
| Cliente principal | API                                    | Navegador       |

---

## 6. Funcionalidades Implementadas

### Autorización

- RBAC con roles `USER`, `SUPPORT` y `ADMIN`.
- Permisos explícitos para operaciones protegidas.
- Verificaciones de ownership.
- Autorización a nivel de método mediante `@PreAuthorize`.
- Protección contra eliminación del último usuario `ADMIN`.
- Respuestas estructuradas para accesos denegados.

### Autenticación JWT

- Login mediante email y contraseña.
- Generación y validación de JWT.
- Filtro personalizado para Bearer Tokens.
- Validación de expiración.
- Secretos configurables mediante variables de entorno.

### Autenticación mediante sesiones

- Formulario de login con Thymeleaf.
- Autenticación basada en HTTP sessions.
- Protección CSRF.
- Logout e invalidación de sesión.
- Gestión del estado autenticado.

### Backend

- API REST con Spring Boot.
- Persistencia mediante JPA/Hibernate.
- Validación de DTOs con Jakarta Validation.
- Manejo centralizado de excepciones.
- Datos iniciales para usuarios, roles y permisos.

---

## 7. Decisiones Técnicas Relevantes

### Separación por ramas

JWT y sesiones HTTP se mantienen en ramas independientes en lugar de combinar ambos modelos mediante feature flags.

**Ventaja:** permite comparar configuraciones, flujos y pruebas sin introducir acoplamiento innecesario.

**Trade-off:** requiere mantener dos implementaciones.

### Filtro JWT personalizado

El proyecto utiliza `JwtRequestFilter` y `JwtUtil` para hacer explícitos los procesos de generación y validación de tokens.

**Ventaja:** facilita el estudio de los internals de autenticación JWT y Spring Security.

**Trade-off:** en una aplicación real podría ser preferible utilizar abstracciones estándar como OAuth2 Resource Server.

### Autorización basada en políticas

La lógica de autorización considera subject, resource, action y context en lugar de depender exclusivamente del rol.

**Ventaja:** permite expresar reglas como ownership y privilegios específicos.

**Trade-off:** aumenta la complejidad frente a una autorización basada únicamente en roles.

### BCrypt

Las contraseñas se almacenan utilizando BCrypt.

**Ventaja:** evita almacenar contraseñas en texto plano y utiliza hashing diseñado para credenciales.

**Trade-off:** el coste computacional debe equilibrarse con los requisitos de rendimiento del sistema.

---

## 8. Seguridad

### Mecanismos implementados

- Validación de credenciales.
- BCrypt para contraseñas.
- Protección de endpoints mediante Spring Security.
- Autorización basada en roles y permisos.
- Verificaciones de ownership.
- Seguridad a nivel de método.
- Protección CSRF para autenticación mediante sesiones.
- Secretos JWT mediante configuración externa.
- Invalidación de sesión durante logout.

### Alcance

El proyecto es un estudio técnico y **no debe considerarse una implementación de seguridad lista para producción**.

No implementa actualmente:

- Revocación activa de JWT.
- Refresh tokens.
- Rate limiting.
- Gestión distribuida de sesiones.
- OAuth2.
- CORS específico para un entorno de producción.
- Gestión centralizada de secretos.
- Auditoría persistente completa.

---

## 9. Testing y Calidad

El proyecto incluye pruebas enfocadas principalmente en los flujos de seguridad.

### JWT

- Login exitoso.
- Generación de tokens.
- Acceso sin token.
- Tokens inválidos o malformados.
- Acceso con permisos insuficientes.

### Sesiones

- Login exitoso y fallido.
- Protección CSRF.
- Usuarios inexistentes o inactivos.
- Acceso sin sesión.
- Restricciones de autorización.

### Herramientas

- JUnit 5.
- Mockito.
- MockMvc.
- Spring Security Test.
- H2.

---

## 10. Evidencia Visual

![Arquitectura de PermissionManager](/images/projects/permissionmanager/architecture.png)

*Arquitectura general y comparación de los mecanismos de autenticación.*

![Flujo JWT de PermissionManager](/images/projects/permissionmanager/jwt-flow.png)

*Flujo de autenticación JWT desde el login hasta la decisión de autorización.*

![Comparación de PermissionManager](/images/projects/permissionmanager/comparison.png)

*Comparación entre autenticación stateless mediante JWT y autenticación stateful mediante sesiones HTTP.*

---

## 11. Estado y Limitaciones

**Clasificación:** Proof of Concept / Technical Study

PermissionManager está concebido como un proyecto de estudio y referencia sobre autenticación, autorización y arquitectura backend.

El objetivo no es proporcionar un sistema IAM completo, sino demostrar mediante código ejecutable cómo separar autenticación y autorización y cómo comparar diferentes modelos de autenticación dentro del mismo dominio.

### Limitaciones actuales

- No existe revocación activa de JWT.
- No existen refresh tokens.
- No existe rate limiting.
- Las sesiones utilizan almacenamiento en memoria.
- Los datos de auditoría son limitados/mocked.
- No existe CI/CD.
- No existe documentación OpenAPI.
- No existe integración OAuth2.
- Algunas configuraciones están orientadas al entorno de demostración.

---

## 12. Evolución Futura

Las posibles extensiones del proyecto incluyen:

1. Implementar refresh tokens.
2. Agregar revocación de JWT mediante Redis.
3. Implementar rate limiting.
4. Añadir almacenamiento distribuido de sesiones.
5. Integrar OAuth2/OIDC.
6. Añadir documentación OpenAPI.
7. Incorporar CI/CD.
8. Implementar observabilidad y auditoría persistente.
9. Externalizar completamente los secretos.
10. Realizar hardening de seguridad para un entorno de producción.
