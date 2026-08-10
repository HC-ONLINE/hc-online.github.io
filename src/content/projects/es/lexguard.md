---
title: "LexGuard"
description: "Motor de detección y correlación de PII para auditorías de datos automatizadas"
subtitle: "Motor de detección y correlación de PII para auditorías de datos automatizadas"
stack: "Python 3.11+, Typer, pydantic, python-magic, regex"
github: "https://github.com/HC-ONLINE/LexGuard"
---

## Qué resuelve

- Auditorías de datos manuales lentas y herramientas genéricas con altas tasas de falsos positivos.
- Visión fragmentada del riesgo: evalúa exposición real, no solo coincidencias de regex.
- Necesidad de gobernanza de datos explicable, integrable en CI/CD y lista para cumplimiento normativo.
- Identificación de riesgos agregados mediante correlación cross-PII (múltiples tipos de datos sensibles coexistiendo).

## Características clave

- CLI-first: Diseñado para ejecutarse en pipelines, scripts de automatización y entornos desatendidos.
- Rules first, IA como apoyo: Reglas deterministas y validaciones algorítmicas (Luhn, prefijos, entropía). IA como capa secundaria para reducir falsos positivos.
- Riesgo explicable: Cada hallazgo incluye un desglose claro de por qué se considera riesgoso y su nivel de confianza.
- Fail-safe por defecto: Ante ambigüedad, clasifica como UNCERTAIN antes que generar falsos positivos críticos.
- Detección actual: Cédula de Ciudadanía (Colombia), teléfono móvil (Colombia), correo electrónico, tarjetas de crédito, y correlación cross-PII.
- Arquitectura modular: Pipeline determinista extensible: ingestión → detección → validación → scoring → correlación → reporte.

## Decisión técnica

- Arquitectura basada en pipeline determinista para garantizar reproducibilidad y trazabilidad.
- No es un DLP ni un SIEM: es una herramienta de auditoría y escaneo que identifica exposición, no la remedia.
- Validaciones algorítmicas específicas por región (Colombia) con posibilidad de extensión.
- Licencia Apache-2.0 para uso empresarial y colaborativo.
- Diseñado para cumplimiento con Ley 1581 de Colombia.
