---
title: "ModelRouter"
description: "API asíncrona para orquestar múltiples proveedores de LLM mediante una interfaz unificada, con streaming, fallback automático, control de disponibilidad y observabilidad."
subtitle: "Orquestación multi-proveedor de LLM e infraestructura backend resiliente"
stack: "Python, FastAPI, Pydantic, HTTPX, Redis, Docker, GitHub Actions"
github: "https://github.com/HC-ONLINE/ModelRouter"
---

## Visión general

ModelRouter es una API HTTP asíncrona construida con Python y FastAPI que centraliza el acceso a múltiples proveedores de modelos de lenguaje mediante una interfaz común.

El proyecto abstrae las diferencias entre proveedores y añade mecanismos de fallback, streaming en tiempo real, control de disponibilidad y estado compartido mediante Redis.

Actualmente integra cinco proveedores:

- Groq
- OpenRouter
- OpenAI
- Gemini
- Ollama

El proyecto se encuentra en **desarrollo activo** y funciona principalmente como una exploración de arquitectura e infraestructura para aplicaciones basadas en LLM.

## Problema

Integrar diferentes proveedores de LLM directamente desde una aplicación obliga a manejar APIs, formatos de respuesta, autenticación y condiciones de error diferentes.

ModelRouter aborda este problema mediante una capa intermedia que proporciona un contrato común para las solicitudes y respuestas.

Los objetivos principales son:

- Unificar el acceso a diferentes proveedores.
- Aislar las diferencias específicas de cada API.
- Cambiar automáticamente de proveedor cuando uno no está disponible.
- Soportar respuestas en streaming.
- Mantener estado compartido entre instancias mediante Redis.

## Arquitectura

ModelRouter utiliza una arquitectura por capas que separa la API HTTP, la orquestación, las decisiones de routing, los adaptadores de proveedores y la infraestructura.

![Diagrama representativo de la arquitectura de ModelRouter](/images/projects/modelrouter/architecture.png)

*Diagrama representativo de la arquitectura por capas de ModelRouter y flujo entre la API, el router, los adaptadores de proveedores y Redis.*

Los componentes principales son:

- **FastAPI** — capa HTTP y documentación OpenAPI.
- **Controllers** — validación y serialización de las solicitudes.
- **Orchestrator** — coordinación del ciclo de ejecución y timeouts.
- **Router** — selección de proveedor, fallback y control de disponibilidad.
- **Provider Adapters** — integración independiente con cada proveedor.
- **HTTP Client** — cliente asíncrono compartido mediante HTTPX.
- **Redis** — estado temporal compartido entre instancias.

## Capacidades

### Multi-provider

Los proveedores implementan un contrato común mediante adaptadores independientes.

Esto permite agregar o modificar integraciones sin acoplar la lógica principal a una API específica.

### Automatic fallback

El router puede cambiar al siguiente proveedor disponible cuando el proveedor seleccionado falla, está temporalmente bloqueado o alcanza determinadas condiciones de disponibilidad.

El sistema utiliza blacklist temporal y backoff exponencial para evitar reintentos continuos sobre proveedores con problemas.

### Streaming

El endpoint `/stream` utiliza **Server-Sent Events (SSE)** para enviar los fragmentos de la respuesta a medida que son generados.

```text
data: <chunk>
data: <chunk>
data: <chunk>
data: [DONE]
```

Esto permite que el cliente comience a procesar la respuesta sin esperar a que finalice toda la generación.

### API

La API expone actualmente cuatro endpoints principales:

- `GET /health`
- `GET /metrics`
- `POST /chat`
- `POST /stream`

Las solicitudes utilizan modelos Pydantic para validar mensajes y parámetros antes de llegar al sistema de routing.

## Redis y estado distribuido

Redis 7 se utiliza para mantener estado temporal relacionado con los proveedores:

- Blacklist temporal.
- Contadores de fallos.
- Estado de rate limiting.
- Coordinación entre instancias.

Redis no se utiliza actualmente como base de datos de conversaciones. El proyecto no dispone todavía de persistencia para historiales de chat.

## Observabilidad

El proyecto incorpora mecanismos básicos de observabilidad:

- Logging estructurado en JSON.
- Correlación mediante `request_id`.
- Métricas compatibles con Prometheus.
- Endpoint `/metrics`.
- Health checks.

Esto permite separar la lógica de generación de LLM de las necesidades operativas del servicio.

## Seguridad

ModelRouter incorpora varias medidas básicas de seguridad:

- Autenticación mediante API key.
- Validación de entrada con Pydantic.
- Gestión de credenciales mediante variables de entorno.
- Sanitización de información sensible en los logs.
- Escaneo de vulnerabilidades de la imagen Docker mediante Trivy.

La implementación actual no pretende ser un gateway de LLM endurecido para producción. La autenticación es simple y existen aspectos pendientes relacionados con gestión de secretos, CORS y control multiusuario.

## Docker e infraestructura

El proyecto incluye una imagen Docker multi-stage y un entorno Docker Compose compuesto por:

```text
ModelRouter
     │
     └── Redis 7
```

El contenedor de aplicación utiliza un usuario no root y health checks para facilitar su ejecución como servicio.

## CI/CD y calidad

GitHub Actions automatiza diferentes etapas del desarrollo:

```text
Quality
   ├── Black
   ├── Flake8
   └── MyPy

Tests
   └── pytest

Build
   ├── Docker
   └── Trivy
```

El repositorio cuenta actualmente con:

- 14 archivos de pruebas.
- 61 tests.
- Validación de tipos.
- Linting y formato automatizados.
- Construcción de imágenes Docker.
- Escaneo de seguridad en CI.

## Decisiones técnicas

### Adapter Pattern

Cada proveedor se implementa mediante un adaptador independiente.

Esto reduce el acoplamiento entre la aplicación y las APIs externas y permite extender el sistema incorporando nuevos proveedores.

### Router + fallback

La selección de proveedor está separada de la lógica HTTP y de las integraciones específicas.

Esto permite aplicar políticas de disponibilidad y fallback sin modificar los controllers.

### Estado compartido con Redis

El uso de Redis permite mantener información temporal de los proveedores fuera del proceso de la aplicación.

Esto resulta más adecuado para una arquitectura con múltiples instancias que depender exclusivamente del estado local.

### Arquitectura asíncrona

FastAPI y HTTPX permiten manejar solicitudes concurrentes y streaming sin bloquear el flujo principal de la aplicación.

## Estado actual

### Experimental / Active Development

ModelRouter es un proyecto técnico de infraestructura y experimentación arquitectónica.

Actualmente no incluye:

- Persistencia de conversaciones.
- Base de datos relacional.
- Frontend.
- Tests end-to-end contra proveedores reales.
- Gestión avanzada de usuarios y credenciales.
- Todas las garantías necesarias para considerarlo un gateway de LLM de producción.

Estas áreas forman parte de posibles evoluciones futuras.

## Evolución futura

Entre las posibles mejoras se encuentran:

- Persistencia de conversaciones mediante PostgreSQL.
- Integración con más proveedores.
- Dashboard de observabilidad con Grafana.
- Métricas más completas por proveedor.
- Gestión avanzada de credenciales.
- Autenticación multiusuario.
- Tests de integración y end-to-end.

## Qué demuestra

ModelRouter permite demostrar experiencia en:

- Desarrollo backend asíncrono.
- FastAPI y APIs REST.
- Integración de múltiples proveedores de LLM.
- Server-Sent Events.
- Diseño basado en adapters.
- Fallback y resiliencia.
- Redis y estado distribuido.
- Observabilidad con Prometheus.
- Docker.
- GitHub Actions.
- Testing y calidad de código.
- Seguridad básica de APIs.

El objetivo principal del proyecto es demostrar cómo construir una capa de infraestructura que desacople una aplicación de los proveedores concretos de LLM y permita introducir mecanismos de resiliencia alrededor de ellos.

## Visuales

<!-- IMAGE 01 — Streaming -->

![Salida representativa de streaming en ModelRouter](/images/projects/modelrouter/streaming.png)

*Respuesta representativa en streaming mediante Server-Sent Events.*

<!-- IMAGE 02 — API -->

![Documentación de la API de ModelRouter](/images/projects/modelrouter/api-docs.png)

*Documentación interactiva de la API mediante Swagger/OpenAPI.*

<!-- IMAGE 03 — Observabilidad -->

![Métricas representativas de ModelRouter](/images/projects/modelrouter/metrics.png)

*Métricas representativas expuestas mediante el endpoint compatible con Prometheus.*
