---
title: "ModelRouter"
description: "Asynchronous API for orchestrating multiple LLM providers through a unified interface, with streaming, automatic fallback, availability control and observability."
subtitle: "Multi-provider LLM orchestration and resilient backend infrastructure"
stack: "Python, FastAPI, Pydantic, HTTPX, Redis, Docker, GitHub Actions"
github: "https://github.com/HC-ONLINE/ModelRouter"
---

## Overview

ModelRouter is an asynchronous HTTP API built with Python and FastAPI that provides a unified interface for interacting with multiple Large Language Model providers.

The project abstracts provider-specific APIs and adds automatic fallback, real-time streaming, availability management and shared state through Redis.

It currently integrates five providers:

- Groq
- OpenRouter
- OpenAI
- Gemini
- Ollama

The project is in **active development** and primarily serves as an architectural and infrastructure exploration for LLM-based applications.

## Problem

Integrating multiple LLM providers directly into an application requires handling different APIs, request formats, authentication mechanisms and failure conditions.

ModelRouter addresses this through an intermediate layer that provides a common contract for requests and responses.

The main goals are:

- Provide a unified interface for multiple providers.
- Isolate provider-specific API differences.
- Automatically switch providers when one becomes unavailable.
- Support real-time response streaming.
- Maintain shared provider state across instances through Redis.

## Architecture

ModelRouter uses a layered architecture that separates the HTTP API, orchestration, routing decisions, provider adapters and infrastructure.

![Representative ModelRouter architecture diagram](/images/projects/modelrouter/architecture.png)

_Representative layered architecture showing the flow between the API, router, provider adapters and Redis._

Main components include:

- **FastAPI** — HTTP layer and OpenAPI documentation.
- **Controllers** — request validation and response serialization.
- **Orchestrator** — execution coordination and timeout management.
- **Router** — provider selection, fallback and availability control.
- **Provider Adapters** — isolated provider integrations.
- **HTTP Client** — shared asynchronous HTTPX client.
- **Redis** — shared temporary state.

## Capabilities

### Multi-provider

Providers implement a common contract through independent adapters.

This allows integrations to be added or modified without coupling the core application logic to a specific provider API.

### Automatic fallback

The router can switch to another available provider when the selected provider fails, is temporarily blocked or reaches configured availability limits.

Temporary blacklisting and exponential backoff help prevent continuous retries against unavailable providers.

### Streaming

The `/stream` endpoint uses **Server-Sent Events (SSE)** to deliver generated content as it becomes available.

```text
data: <chunk>
data: <chunk>
data: <chunk>
data: [DONE]
```

This allows clients to process generated content without waiting for the complete response.

### API

The API currently exposes four main endpoints:

- `GET /health`
- `GET /metrics`
- `POST /chat`
- `POST /stream`

Requests use Pydantic models to validate messages and parameters before reaching the routing layer.

## Redis and Distributed State

Redis 7 is used for temporary provider-related state:

- Temporary blacklists.
- Failure counters.
- Rate-limiting state.
- Coordination between application instances.

Redis is not currently used as a conversation database. The project does not yet persist chat histories.

## Observability

The project includes basic observability mechanisms:

- Structured JSON logging.
- Request correlation through `request_id`.
- Prometheus-compatible metrics.
- `/metrics` endpoint.
- Health checks.

This separates LLM generation logic from the operational concerns of running the service.

## Security

ModelRouter includes several basic API security mechanisms:

- API key authentication.
- Pydantic input validation.
- Environment-based credential management.
- Sensitive information sanitization in logs.
- Docker image vulnerability scanning with Trivy.

The current implementation is not intended to be presented as a hardened production LLM gateway. Authentication remains simple, with further work required around secret management, CORS and multi-user access control.

## Docker and Infrastructure

The project includes a multi-stage Docker image and a Docker Compose environment consisting of:

```text
ModelRouter
     │
     └── Redis 7
```

The application container runs as a non-root user and includes health checks to support service operation.

## CI/CD and Quality

GitHub Actions automates several development stages:

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

The repository currently includes:

- 14 test files.
- 61 tests.
- Static type checking.
- Automated linting and formatting.
- Docker image builds.
- Security scanning in CI.

## Technical Decisions

### Adapter Pattern

Each provider is implemented through an independent adapter.

This reduces coupling between the application and external APIs and makes it possible to extend the system with additional providers.

### Router + fallback

Provider selection is separated from the HTTP layer and provider-specific integrations.

This allows availability and fallback policies to evolve without modifying the controllers.

### Shared state with Redis

Redis keeps temporary provider state outside the application process.

This is more suitable for a multi-instance architecture than relying exclusively on local process state.

### Asynchronous architecture

FastAPI and HTTPX allow concurrent request handling and streaming without blocking the main application flow.

## Current Status

### Experimental / Active Development

ModelRouter is a technical infrastructure and architecture experiment.

It currently does not include:

- Persistent conversation storage.
- A relational database.
- A frontend.
- End-to-end tests against real providers.
- Advanced user and credential management.
- All guarantees required for a production LLM gateway.

These areas remain potential future improvements.

## Future Development

Potential future improvements include:

- PostgreSQL-based conversation persistence.
- Additional LLM providers.
- Grafana observability dashboard.
- More comprehensive provider-level metrics.
- Advanced credential management.
- Multi-user authentication.
- Integration and end-to-end testing.

## What This Project Demonstrates

ModelRouter demonstrates experience with:

- Asynchronous backend development.
- FastAPI and REST APIs.
- Multi-provider LLM integration.
- Server-Sent Events.
- Adapter-based architecture.
- Fallback and resilience strategies.
- Redis and distributed state.
- Prometheus observability.
- Docker.
- GitHub Actions.
- Testing and code quality.
- Basic API security.

The primary purpose of the project is to demonstrate how an infrastructure layer can decouple an application from specific LLM providers while introducing resilience mechanisms around them.

## Visuals

<!-- IMAGE 01 — Streaming -->

![Representative ModelRouter streaming output](/images/projects/modelrouter/streaming.png)

_Representative streaming response delivered through Server-Sent Events._

<!-- IMAGE 02 — API -->

![ModelRouter API documentation](/images/projects/modelrouter/api-docs.png)

_Interactive API documentation through Swagger/OpenAPI._

<!-- IMAGE 03 — Observability -->

![Representative ModelRouter metrics](/images/projects/modelrouter/metrics.png)

_Representative metrics exposed through the Prometheus-compatible endpoint._
