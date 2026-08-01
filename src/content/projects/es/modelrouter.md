---
title: "ModelRouter"
description: "Orquestador asíncrono de LLMs con resiliencia y observabilidad"
subtitle: "Orquestador asíncrono de LLMs con resiliencia y observabilidad"
stack: "Python, FastAPI, asyncio, httpx, Redis, SSE, Docker"
github: "https://github.com/HC-ONLINE/ModelRouter"
---

## Qué resuelve

- Abstracción de proveedores heterogéneos (Groq, OpenRouter, Ollama, etc.) evitando vendor‑lockin a nivel de aplicación.
- Resiliencia: fallback automático, retries y circuit breakers sobre proveedores.
- Observabilidad real: métricas, trazas y logs asociados a cada request/response y coste por llamada.

## Características clave

- API asíncrona (FastAPI / async) con soporte de streaming (SSE / chunked responses).
- Estrategias de fallback, rate limiting y priorización de proveedores.
- Instrumentación con Prometheus para métricas y trazas.
- Logging estructurado y métricas por request.
- Despliegue con Docker y docker-compose.
- Arquitectura de adaptadores para proveedores (hot-swappable).

## Decisión técnica

- Separar la lógica de orquestación del adaptador del proveedor para facilitar testing y permitir switching en caliente.
- Priorizar latencia y observabilidad: telemetría por request para análisis de coste/efectividad.
