---
title: "PermissionManager"
description: "Sistema de autorización RBAC con Spring Boot y Spring Security que compara autenticación JWT stateless y sesiones HTTP stateful."
subtitle: "Autorización basada en roles y políticas"
stack: "Java 21, Spring Boot, Spring Security, JPA, MySQL, Docker"
github: "https://github.com/HC-ONLINE/PermissionManager"
---

## Visión general

PermissionManager es un proyecto de estudio técnico centrado en autorización y control de acceso. Implementa un modelo RBAC (Role-Based Access Control) y compara dos mecanismos de autenticación dentro del mismo dominio funcional: JWT stateless y sesiones HTTP stateful.

El objetivo es separar claramente la autenticación de la autorización y analizar los trade-offs de cada enfoque en una aplicación backend basada en Spring Security.

## Arquitectura

El mismo dominio de autorización se mantiene entre las dos implementaciones, mientras que el mecanismo de autenticación cambia según la rama:

* `rbac-jwt` — autenticación stateless mediante JWT.
* `rbac-session` — autenticación stateful mediante sesiones HTTP.

## Capacidades

### Autorización

* RBAC con roles `USER`, `SUPPORT` y `ADMIN`.
* Permisos explícitos para operaciones sobre usuarios y auditoría.
* Control de ownership para proteger recursos propios.
* Evaluación de autorización mediante `@PreAuthorize`.
* Protección del último usuario con rol `ADMIN`.
* Respuestas estructuradas ante decisiones de acceso denegado.

### Autenticación

* Generación y validación de JWT.
* Filtro personalizado para autenticación mediante Bearer Token.
* Autenticación basada en sesiones HTTP.
* Form login mediante Spring Security.
* Logout e invalidación de sesión en la implementación stateful.

### Backend

* API REST con Spring Boot.
* Persistencia mediante JPA/Hibernate.
* Validación de DTOs.
* Manejo centralizado de excepciones.
* Datos iniciales para usuarios, roles y permisos.

## Comparación de arquitecturas

El proyecto utiliza dos ramas para estudiar las diferencias entre los enfoques stateless y stateful.

| Aspecto                  | JWT                       | Sesiones HTTP                                |
| ------------------------ | ------------------------- | -------------------------------------------- |
| Estado                   | Stateless                 | Stateful                                     |
| Escalabilidad horizontal | Simplificada              | Requiere estado compartido o sticky sessions |
| Revocación               | Limitada hasta expiración | Inmediata                                    |
| Almacenamiento           | Token del lado cliente    | Sesión del lado servidor                     |
| Caso de uso              | APIs distribuidas         | Aplicaciones web con control de sesión       |

Esta separación permite comparar las decisiones arquitectónicas sin cambiar el modelo de autorización.

## Ingeniería

* **Separación de responsabilidades** — autenticación, autorización, servicios y persistencia se mantienen en capas independientes.
* **Spring Security** — configuración de filtros, `SecurityFilterChain`, autorización por método y protección CSRF en la implementación basada en sesiones.
* **Modelo RBAC** — usuarios, roles y permisos se representan mediante entidades JPA.
* **Validación** — DTOs con Jakarta Validation para controlar entradas en los endpoints.
* **Persistencia** — MySQL para ejecución y H2 para pruebas.
* **Containerización** — Docker multi-stage y Docker Compose para ejecutar la aplicación junto con MySQL.
* **Testing** — JUnit, Mockito, MockMvc y Spring Security Test para validar flujos de autenticación y autorización.

## Seguridad

El proyecto presta especial atención a los límites entre autenticación y autorización.

Entre los mecanismos implementados se encuentran:

* Validación de credenciales contra la base de datos.
* Protección de endpoints mediante Spring Security.
* Autorización basada en roles y permisos.
* Verificación de ownership.
* Protección CSRF en la rama basada en sesiones.
* Gestión configurable del secreto JWT mediante variables de entorno.
* Invalidación de sesiones durante logout.

El proyecto es deliberadamente un estudio técnico y no pretende representar una configuración de producción completa.

## Testing

Se incluyen pruebas para validar distintos escenarios de seguridad.

### Rama JWT

* Login válido y generación de token.
* Acceso sin token.
* Token inválido o malformado.
* Acceso con permisos insuficientes.

### Rama de sesiones

* Login válido e inválido.
* Protección CSRF.
* Usuarios inexistentes o inactivos.
* Acceso sin sesión.
* Restricciones de autorización.

Las pruebas utilizan MockMvc y las herramientas de testing de Spring Security.

## Limitaciones actuales

* No existe revocación activa de JWT.
* No hay refresh tokens.
* No existe rate limiting.
* La auditoría actualmente utiliza datos mock.
* Las sesiones se almacenan en memoria.
* No existe configuración de CORS.
* No incluye un frontend propio.
* No cuenta con CI/CD.
* Algunas configuraciones y credenciales de ejemplo son exclusivamente para desarrollo.

## Estado del proyecto

### Proof of Concept / Technical Study

PermissionManager es un proyecto educativo y comparativo orientado al estudio de arquitectura backend y seguridad de aplicaciones.

No se presenta como un producto de autorización listo para producción. Su principal objetivo es demostrar cómo diferentes mecanismos de autenticación pueden coexistir con un mismo modelo de autorización y cómo sus trade-offs afectan al diseño del sistema.

## Qué demuestra este proyecto

* Desarrollo de APIs REST con Spring Boot.
* Implementación de autenticación y autorización con Spring Security.
* Diseño RBAC.
* Separación entre authentication y authorization.
* Comparación de arquitecturas stateless y stateful.
* Persistencia relacional con JPA/Hibernate.
* Testing de flujos de seguridad.
* Containerización con Docker.
* Análisis de trade-offs de arquitectura backend.

## Visuales

<!-- IMAGE 01 — Comparación de arquitecturas -->

![PermissionManager arquitectura](/images/projects/permissionmanager/architecture.png)

*Comparacion de los flujos JWT stateless y sesiones HTTP stateful con el motor de autorizacion RBAC compartido.*

<!-- IMAGE 02 — JWT flow -->

![PermissionManager flujo JWT](/images/projects/permissionmanager/jwt-flow.png)

*Flujo completo de autenticacion JWT: desde el login hasta la decision de autorizacion ALLOW/DENY.*

<!-- IMAGE 03 — Comparison table -->

![PermissionManager comparacion](/images/projects/permissionmanager/comparison.png)

*Tabla comparativa de los dos mecanismos de autenticacion: JWT vs sesiones HTTP.*

## Descripción corta

Proyecto de estudio técnico que compara autenticación JWT stateless y sesiones HTTP stateful con un motor de autorización RBAC en Spring Boot.

## Estado

### Proof of Concept / Technical Study

PermissionManager se mantiene como proyecto educativo y comparativo para el estudio de arquitectura backend y seguridad. No se presenta como un sistema de autorización listo para producción.
