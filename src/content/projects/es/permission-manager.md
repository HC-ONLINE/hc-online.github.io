---
title: "PermissionManager"
description: "Sistema RBAC con políticas explicables y auditables"
subtitle: "Sistema RBAC con políticas explicables y auditables"
stack: "Java 21, Spring Boot, Spring Security, PostgreSQL, Maven"
github: "https://github.com/HC-ONLINE/PermissionManager"
---

## Qué resuelve

- Evitar controles de acceso implícitos u opacos mediante evaluaciones determinísticas y trazables.
- Facilitar auditoría, revisiones y compliance (registro de decisiones y motivos).
- Proveer una base extensible para modelos RBAC empresariales y políticas basadas en atributos.

## Características clave

- Evaluador determinístico de permisos y políticas (audit trail por evaluación).
- API REST para gestión de roles, permisos y políticas.
- Integración con Spring Security para aplicar decisiones en tiempo de ejecución.
- Tests y ejemplos de políticas auditables.

## Decisión técnica

- No dejar autorización como "caja negra": cada veredicto lleva metadata (qué reglas se evaluaron, entradas y resultado).
- Diseñado para entornos regulados donde la explicación de acceso es un requisito.
