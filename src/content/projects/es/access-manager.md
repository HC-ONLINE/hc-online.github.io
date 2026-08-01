---
title: "AccessManager"
description: "Comparativa y referencia de implementación: JWT vs sesiones en Spring Security"
subtitle: "Comparativa y referencia de implementación: JWT vs sesiones en Spring Security"
stack: "Java 21, Spring Boot 3, Spring Security, Maven"
github: "https://github.com/HC-ONLINE/AccessManager"
---

## Qué resuelve

- Proveer implementaciones correctas y auditables de autenticación en aplicaciones Java/Spring.
- Mostrar trade‑offs operacionales: revocación, rotación, escalado, superficie de ataque y gestión de sesiones.
- Ofrecer una base con tests y ejemplos de configuración para equipos que deben elegir una estrategia.

## Características clave

- Implementaciones paralelas: JWT con buenas prácticas (firma, expiración) y gestión tradicional por sesión.
- Configuraciones explícitas de Spring Security con ejemplos de revocación y protección CSRF.
- Tests de integración y documentación de decisiones de diseño.

## Decisión técnica

- No dogmatizar: cada solución se evalúa por caso de uso (auditoría, requisitos de cumplimiento, escalado).
- Ejemplos pensados para adaptarse en entornos empresariales con control sobre revocación y monitoreo.
