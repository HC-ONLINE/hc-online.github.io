---
title: "Principios técnicos"
description: "Criterios de diseño, arquitectura y desarrollo"
---

# Principios técnicos

Estos principios definen **cómo tomo decisiones técnicas**: desde arquitectura y dependencias hasta seguridad, testing y despliegue. No son ideales abstractos; son reglas aplicadas en proyectos reales.

---

## ***Principios fundamentales***

### *1. Seguridad por diseño*

La seguridad no se añade al final.  
Se diseña desde la arquitectura:

- Minimización de superficie de ataque
- Validación temprana y explícita
- Principio de mínimo privilegio
- Fallos seguros por defecto

---

### *2. Privacidad y uso responsable*

Recolectar, procesar y almacenar **solo lo estrictamente necesario**.

- Datos personales tratados como pasivo crítico
- Herramientas orientadas a auditoría ética y aprendizaje
- Evitar diseños que faciliten abuso o extracción masiva injustificada

---

### *3. Dependencias con justificación explícita*

Cada dependencia introduce riesgo operativo.

- No se añade una librería sin un beneficio claro y medible
- Preferencia por soluciones simples y auditables
- Menos dependencias > menor superficie de fallo y ataque

---

### *4. Observabilidad y trazabilidad*

Un sistema que no se puede observar no se puede operar ni asegurar.

- Logs estructurados
- Métricas relevantes
- Trazabilidad para debugging y auditorías reproducibles

---

### *5. Simplicidad mantenible*

La complejidad es una deuda técnica.

- Código legible antes que “clever”
- Refactorización continua
- Arquitecturas que se puedan explicar sin diagramas complejos

---

## ***Seguridad aplicada***

### *Evaluación de superficie de ataque*

Antes de proteger, hay que entender qué existe.

- Reconocimiento pasivo
- Análisis de configuraciones
- Detección de servicios expuestos
- Fingerprinting tecnológico controlado

---

### *Identidad y acceso (IAM)*

Autenticación y autorización son problemas distintos y críticos.

- JWT y sesiones según contexto
- RBAC con reglas explicables
- Auditoría de accesos
- Revocación y rotación de credenciales

---

## ***Backend robusto***

### *Diseño de APIs*

Una API es un contrato técnico y operativo.

- Semántica HTTP correcta
- Versionado desde el inicio
- Documentación OpenAPI
- Rate limiting y control de abuso

---

## ***Testing pragmático***

No busco cobertura perfecta. Busco **confianza real**.

- **Unitarios**: lógica de negocio
- **Integración**: contratos entre componentes
- **E2E**: flujos críticos
- **Seguridad**: autenticación y autorización cuando aplica

---

## ***DevOps y entrega continua***

- Automatización de builds y tests
- Contenedores para entornos reproducibles
- CI/CD con GitHub Actions
- Revisión de código como control de calidad obligatorio

---

## ***Responsabilidad profesional***

El impacto del software importa.

- Uso ético de herramientas de seguridad
- Protección explícita de datos sensibles
- Accesibilidad como requisito, no como extra

---

Estos principios guían todos mis [proyectos](projects).
