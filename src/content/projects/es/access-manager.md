---
title: "AccessManager"
description: "Proyecto de estudio de autenticación backend que implementa y compara JWT stateless y sesiones HTTP stateful con Spring Boot y Spring Security."
subtitle: "Comparación práctica de arquitecturas de autenticación"
stack: "Java 21, Spring Boot, Spring Security, JPA, MySQL, Docker"
github: "https://github.com/HC-ONLINE/AccessManager"
site: null
---

## 1. Resumen

AccessManager es un proyecto de estudio técnico orientado a comprender y comparar dos modelos de autenticación backend: JWT stateless y sesiones HTTP stateful.

El mismo dominio funcional se implementa mediante dos ramas independientes, cada una con su propia configuración de Spring Security, flujo de autenticación y pruebas.

El objetivo no es construir un sistema de autenticación listo para producción, sino convertir las diferencias entre ambos modelos en implementaciones ejecutables y comparables.

---

## 2. Contexto / Problema

Elegir un mecanismo de autenticación afecta decisiones posteriores de arquitectura relacionadas con gestión de estado, revocación de credenciales, escalabilidad, tipo de cliente y complejidad operativa.

AccessManager estudia estas diferencias dentro del mismo dominio funcional para evitar comparar conceptos únicamente de forma teórica.

El proyecto busca responder preguntas como:

- ¿Cómo cambia el flujo de autenticación entre JWT y sesiones?
- ¿Dónde se mantiene el estado autenticado?
- ¿Cómo se implementa la autorización en cada modelo?
- ¿Qué ventajas y limitaciones introduce cada estrategia?
- ¿Cómo cambia la configuración de Spring Security?

---

## 3. Solución

AccessManager implementa dos estrategias independientes.

### JWT — rama `auth-jwt`

- Autenticación stateless.
- Login mediante API REST.
- Generación y validación de JWT.
- Firma HMAC-SHA256.
- Filtro personalizado `JwtRequestFilter`.
- Validación de expiración.
- Autorización basada en roles.
- Endpoints protegidos.

### Sesiones HTTP — rama `auth-session`

- Autenticación stateful.
- Form login con Spring Security.
- Gestión de sesiones HTTP.
- Cookie `JSESSIONID`.
- Protección CSRF.
- Logout con invalidación de sesión.
- Páginas renderizadas mediante Thymeleaf.

### Dominio común

Ambas implementaciones utilizan:

- Gestión de usuarios.
- Roles y autorización.
- Recursos protegidos.
- Persistencia mediante JPA.
- Hash de contraseñas con BCrypt.

---

## 4. Arquitectura

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
MySQL
    ↓
Credenciales válidas
    ↓
JwtUtil
    ↓
JWT firmado con HMAC-SHA256
    ↓
Authorization: Bearer <token>
    ↓
JwtRequestFilter
    ↓
Validación del token
    ↓
SecurityContext
    ↓
Recurso protegido
````

### Flujo por sesiones

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
Credenciales válidas
    ↓
HttpSession
    ↓
JSESSIONID
    ↓
SecurityContext
    ↓
Página protegida
```

![Comparación de arquitectura de AccessManager](/images/projects/accessmanager/architecture.png)

*Comparación de los flujos de autenticación JWT y sesiones HTTP.*

La arquitectura mantiene ambas estrategias separadas para que sus configuraciones, flujos y pruebas puedan estudiarse de forma independiente.

---

## 5. Stack Tecnológico

| Tecnología      | Uso                                            |
| --------------- | ---------------------------------------------- |
| Java 21         | Lenguaje y runtime                             |
| Spring Boot     | Framework de aplicación                        |
| Spring Security | Autenticación y autorización                   |
| Spring Data JPA | Persistencia                                   |
| MySQL           | Base de datos                                  |
| H2              | Base de datos para pruebas                     |
| Maven           | Build y gestión del proyecto                   |
| JWT             | Autenticación stateless                        |
| Thymeleaf       | Renderizado server-side en la rama de sesiones |
| Docker          | Containerización                               |
| Docker Compose  | Entorno de ejecución                           |

### Seguridad

| Mecanismo    | JWT                          | Sesiones               |
| ------------ | ---------------------------- | ---------------------- |
| Estado       | Stateless                    | Stateful               |
| Credencial   | JWT                          | JSESSIONID             |
| CSRF         | No aplicable al mismo modelo | Implementado           |
| Autorización | Roles                        | Roles                  |
| Revocación   | Limitada por expiración      | Invalidación de sesión |

---

## 6. Funcionalidades Implementadas

### Autenticación

- Login mediante email y contraseña.
- Generación y validación de JWT.
- Autenticación mediante sesiones HTTP.
- Logout e invalidación de sesión.
- Protección de recursos autenticados.

### Autorización

- Roles de usuario.
- Control de acceso mediante Spring Security.
- Recursos protegidos.
- Validación de permisos durante las peticiones.

### Seguridad

- BCrypt para almacenamiento de contraseñas.
- Firma HMAC-SHA256 para JWT.
- Validación de expiración de tokens.
- Protección CSRF en la implementación basada en sesiones.
- Validación de entradas mediante Jakarta Validation.

### Infraestructura

- Persistencia con Spring Data JPA.
- MySQL para ejecución.
- H2 para pruebas.
- Docker y Docker Compose.

---

## 7. Decisiones Técnicas Relevantes

### Dos implementaciones independientes

JWT y sesiones se mantienen en ramas separadas en lugar de combinarlas mediante configuración dinámica.

**Ventaja:** permite comparar directamente configuraciones, flujos y pruebas sin introducir acoplamiento entre modelos diferentes.

**Trade-off:** requiere mantener dos implementaciones.

### Filtro JWT personalizado

La rama JWT utiliza `JwtRequestFilter` y `JwtUtil` para hacer explícitos los pasos de extracción, validación y procesamiento del token.

**Ventaja:** facilita estudiar cómo funciona la autenticación JWT dentro de Spring Security.

**Trade-off:** una implementación de producción podría utilizar soluciones estandarizadas como OAuth 2.0 Resource Server en lugar de mantener lógica JWT personalizada.

### BCrypt

Las contraseñas no se almacenan en texto plano y se procesan mediante BCrypt.

**Ventaja:** proporciona hashing específico para contraseñas y resistencia frente a ataques de fuerza bruta offline.

**Trade-off:** el coste computacional debe configurarse de acuerdo con los requisitos del sistema y la capacidad disponible.

### Sesiones HTTP para aplicaciones stateful

La rama de sesiones utiliza el modelo tradicional de autenticación gestionada por el servidor.

**Ventaja:** permite invalidar sesiones directamente y mantener control explícito sobre el estado autenticado.

**Trade-off:** una arquitectura distribuida requiere resolver el almacenamiento compartido de sesiones o utilizar mecanismos de afinidad.

---

## 8. Seguridad

### Mecanismos implementados

- Hash de contraseñas con BCrypt.
- JWT firmados mediante HMAC-SHA256.
- Validación de expiración.
- Autorización basada en roles.
- Protección CSRF en la rama de sesiones.
- Invalidación de sesiones durante logout.
- Validación de entradas.
- Protección de endpoints mediante Spring Security.

### Limitaciones de seguridad

El proyecto es un estudio técnico y no debe interpretarse como una configuración de seguridad endurecida para producción.

Actualmente no incluye:

- Refresh tokens.
- Revocación inmediata de JWT.
- Rate limiting.
- Gestión distribuida de sesiones.
- Integración OAuth2/OIDC.
- Gestión externa de secretos.
- Configuración específica de CORS.
- Configuración dedicada de cabeceras HTTP de seguridad.
- Observabilidad de seguridad avanzada.

Por tanto, las implementaciones sirven para estudiar los mecanismos y sus trade-offs, no como componentes listos para incorporarse directamente a un sistema crítico.

---

## 9. Testing y Calidad

El proyecto incluye pruebas orientadas principalmente a validar los flujos de seguridad.

### JWT

- Tests de autenticación.
- Tests de autorización.
- Validación de tokens.
- MockMvc.
- Spring Security Test.

### Sesiones

- Tests de login y logout.
- Validación de protección CSRF.
- Tests de gestión de sesiones.
- Integración con H2.

### Herramientas

- JUnit 5.
- MockMvc.
- Spring Security Test.
- H2.

No se presentan métricas de cobertura ni benchmarks porque no existen mediciones verificables suficientes para respaldar esos claims.

---

## 10. Evidencia Visual

### Comparación de arquitecturas

![Comparación de arquitectura de AccessManager](/images/projects/accessmanager/architecture.png)

*Flujo comparativo entre autenticación JWT y sesiones HTTP.*

### Autenticación JWT

![Autenticación JWT de AccessManager](/images/projects/accessmanager/jwt-flow.png)

*Flujo desde el login hasta el acceso a un recurso protegido mediante JWT.*

### Autenticación por sesiones

![Autenticación por sesiones de AccessManager](/images/projects/accessmanager/session-login.png)

*Autenticación stateful mediante Spring Security, sesiones HTTP y Thymeleaf.*

---

## 11. Estado y Limitaciones

**Clasificación:** Proof of Concept / Technical Study

AccessManager se mantiene como proyecto de referencia técnica y no como producto de producción.

### Limitaciones actuales

- No incluye refresh tokens.
- No existe revocación inmediata de JWT.
- Las sesiones utilizan almacenamiento en memoria.
- No existe almacenamiento distribuido de sesiones.
- No incluye rate limiting.
- No incluye OAuth2/OIDC.
- No existe pipeline CI/CD.
- No existe documentación OpenAPI.
- No existen métricas de rendimiento verificadas.
- La configuración está orientada a entornos de estudio y demostración.

Estas limitaciones son deliberadas en parte porque el objetivo principal del proyecto es estudiar mecanismos de autenticación y no construir una plataforma IAM completa.

---

## 12. Qué Demuestra Este Proyecto

AccessManager demuestra experiencia práctica en:

- Diseño de autenticación backend.
- Configuración de Spring Security.
- Implementación de JWT.
- Gestión de sesiones HTTP.
- Autorización basada en roles.
- Protección CSRF.
- Hashing de contraseñas.
- Arquitectura backend por capas.
- Persistencia con JPA/Hibernate.
- Testing de seguridad.
- Docker y Docker Compose.
- Análisis de trade-offs arquitectónicos.

El principal valor del proyecto no está en implementar JWT o sesiones de forma aislada, sino en **comparar ambas estrategias dentro del mismo dominio y entender cómo la elección del mecanismo de autenticación afecta el diseño del backend**.
