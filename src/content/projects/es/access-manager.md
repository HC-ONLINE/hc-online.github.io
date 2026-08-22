---
title: "AccessManager"
description: "Proyecto de estudio de autenticación backend con Spring Boot y Spring Security que implementa y compara autenticación stateless mediante JWT y autenticación stateful mediante sesiones HTTP."
subtitle: "Comparación de arquitecturas de autenticación con Spring Security"
stack: "Java, Spring Boot, Spring Security, JPA, MySQL, Docker"
github: "https://github.com/HC-ONLINE/AccessManager"
---

## Visión general

AccessManager es un proyecto de referencia técnica orientado al estudio de diferentes estrategias de autenticación en aplicaciones backend.

El mismo dominio funcional se implementa mediante dos enfoques independientes:

- **JWT** — autenticación stateless orientada a APIs.
- **Sesiones HTTP** — autenticación stateful orientada a aplicaciones web.

Cada implementación se mantiene en una rama independiente, con su propia configuración de seguridad, flujo de autenticación, tests y documentación.

El objetivo no es presentar un sistema de autenticación listo para producción, sino materializar los trade-offs entre ambos enfoques dentro de un entorno controlado.

## Problema técnico

La elección entre JWT y sesiones HTTP implica compromisos reales relacionados con:

- escalabilidad horizontal;
- revocación de credenciales;
- gestión del estado;
- auditoría de sesiones;
- tipo de cliente;
- complejidad de implementación.

AccessManager implementa ambos modelos sobre el mismo dominio para facilitar su comparación práctica en lugar de limitarse a una comparación conceptual.

## Arquitectura

### Implementación JWT

La rama `auth-jwt` utiliza una arquitectura stateless:

```text
Cliente HTTP
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

Credenciales válidas
    ↓
JwtUtil
    ↓
JWT firmado con HS256

Request protegida
    ↓
Authorization: Bearer <token>
    ↓
JwtRequestFilter
    ↓
Validación del token
    ↓
SecurityContext
    ↓
ProtectedController
```

La autorización se realiza mediante roles y restricciones declaradas con Spring Security.

### Implementación mediante sesiones

La rama `auth-session` utiliza un modelo stateful:

```text
Navegador
    ↓
Login mediante formulario
    ↓
Spring Security FilterChain
    ↓
AuthenticationManager
    ↓
UserDetailsService
    ↓
MySQL

Credenciales válidas
    ↓
HttpSession
    ↓
Cookie JSESSIONID
    ↓
SecurityContext
    ↓
Página protegida
```

Este enfoque permite invalidar la sesión inmediatamente y mantener el estado de autenticación en el servidor.

## Capacidades

### Autenticación JWT

- Login mediante email y contraseña.
- Generación y validación de tokens JWT.
- Firma HMAC-SHA256.
- Filtro personalizado para validar tokens.
- Autorización basada en roles.
- Endpoints protegidos.
- Validación de entrada mediante Jakarta Validation.
- Tests de seguridad con MockMvc.

### Autenticación mediante sesiones

- Formulario de login con Thymeleaf.
- Autenticación mediante sesiones HTTP.
- Protección CSRF.
- Logout con invalidación de sesión.
- Página protegida para usuarios autenticados.
- Gestión del estado del usuario.
- Migración de contraseñas a BCrypt.
- Tests de integración con H2.

## Comparación de enfoques

| Aspecto           | JWT                                    | Sesión HTTP                                 |
| ----------------- | -------------------------------------- | ------------------------------------------- |
| Modelo            | Stateless                              | Stateful                                    |
| Estado            | No almacenado en el servidor           | Almacenado en el servidor                   |
| Escalabilidad     | Adecuado para escenarios distribuidos  | Requiere estrategia de sesiones compartidas |
| Revocación        | No inmediata                           | Inmediata                                   |
| Cliente principal | APIs / aplicaciones distribuidas       | Aplicaciones web                            |
| Credencial        | Token firmado                          | Cookie de sesión                            |
| CSRF              | No requerido para el esquema utilizado | Protección CSRF implementada                |
| Complejidad       | Mayor responsabilidad sobre tokens     | Gestión centralizada de sesiones            |

La implementación permite observar estos trade-offs directamente sobre código ejecutable.

## Ingeniería

- **Spring Security** — configuración de autenticación, autorización, filtros y protección CSRF.
- **Separación por ramas** — cada modelo de autenticación es independiente y puede ejecutarse y probarse por separado.
- **Arquitectura en capas** — separación entre controladores, servicios, seguridad, persistencia y modelo.
- **Persistencia** — Spring Data JPA con MySQL.
- **Testing** — MockMvc, Spring Security Test, JUnit 5 y H2 para la implementación basada en sesiones.
- **Containerización** — Dockerfile multi-stage y Docker Compose para aplicación y base de datos.
- **Validación** — DTOs con Jakarta Validation en la implementación JWT.

## Decisiones técnicas

### JWT mediante filtro personalizado

La implementación utiliza `JwtRequestFilter` y `JwtUtil` para hacer explícito el proceso de generación y validación del token.

Esto permite estudiar el funcionamiento interno de JWT y Spring Security, aunque un sistema de producción podría utilizar abstracciones como OAuth2 Resource Server.

### Dos implementaciones independientes

JWT y sesiones no se combinan mediante feature flags. Cada enfoque dispone de una rama independiente.

Esto reduce el acoplamiento entre modelos de seguridad y permite comparar sus configuraciones y tests de forma directa.

### BCrypt

Las contraseñas se almacenan utilizando BCrypt en ambas implementaciones.

La configuración de coste no es idéntica entre las ramas, una diferencia que forma parte del estado actual del proyecto y no debe interpretarse como una configuración de producción estandarizada.

## Seguridad

### Mecanismos implementados

- Password hashing mediante BCrypt.
- JWT firmado mediante HMAC-SHA256.
- Validación de expiración de tokens.
- Autorización basada en roles.
- Protección CSRF para autenticación mediante sesiones.
- Invalidación de sesiones mediante logout.
- Validación de datos de entrada.
- Restricción de endpoints mediante Spring Security.

## Testing

La implementación JWT incluye tests de seguridad utilizando MockMvc.

La implementación basada en sesiones incluye tests de integración utilizando H2 en memoria.

Los tests cubren principalmente:

- autenticación;
- acceso a recursos protegidos;
- autorización por roles;
- comportamiento de usuarios autenticados y no autenticados;
- protección CSRF en la implementación basada en sesiones.

## Limitaciones actuales

AccessManager es un proyecto educativo y de referencia técnica, no un sistema IAM preparado para producción.

Entre sus limitaciones actuales:

- No implementa refresh tokens.
- No existe revocación inmediata de JWT.
- No incluye rate limiting.
- No incluye configuración de CORS.
- No implementa headers de seguridad HTTP específicos.
- Las sesiones se almacenan en memoria.
- No existe almacenamiento distribuido de sesiones.
- No incluye OAuth2.
- No incluye observabilidad o métricas.
- No dispone de CI/CD.
- No cuenta con documentación OpenAPI.
- La configuración incluida contiene valores orientados al entorno de demostración.

Estas limitaciones son coherentes con el propósito comparativo del proyecto.

## Evolución posible

El proyecto documenta posibles extensiones como:

- refresh tokens;
- revocación de JWT mediante Redis;
- rate limiting;
- OAuth2;
- gestión de sesiones concurrentes;
- Remember Me;
- almacenamiento distribuido de sesiones mediante Redis o JDBC.

También podría evolucionar hacia una configuración más cercana a producción mediante:

- configuración externa de secretos;
- headers de seguridad;
- CORS controlado;
- logging estructurado;
- observabilidad;
- CI/CD;
- Testcontainers;
- Flyway o Liquibase;
- documentación OpenAPI.

## Qué demuestra este proyecto

- Diseño de autenticación backend.
- Spring Security.
- Implementación de JWT.
- Gestión de sesiones HTTP.
- Autorización basada en roles.
- Protección CSRF.
- Arquitectura en capas.
- Persistencia con JPA/Hibernate.
- Testing de seguridad.
- Docker y Docker Compose.
- Análisis de trade-offs arquitectónicos.

## Visuales

<!-- IMAGE 01 — Comparación de arquitecturas -->

![AccessManager architecture comparison](/images/projects/accessmanager/architecture.png)

*Comparación de los flujos de autenticación JWT y sesiones HTTP.*

<!-- IMAGE 02 — JWT flow -->

![AccessManager JWT authentication](/images/projects/accessmanager/jwt-flow.png)

*Flujo de autenticación JWT desde el login hasta el acceso a un recurso protegido.*

<!-- IMAGE 03 — Session authentication -->

![AccessManager session authentication](/images/projects/accessmanager/session-login.png)

*Implementación de autenticación mediante sesión HTTP utilizando Spring Security y Thymeleaf.*

## Descripción corta

Proyecto de estudio de autenticación backend que compara JWT stateless y sesiones HTTP stateful mediante Spring Boot y Spring Security.

## Estado

### Proof of Concept / Technical Study

AccessManager se mantiene como proyecto de referencia para estudiar y comparar arquitecturas de autenticación. No se presenta como un producto de producción.
