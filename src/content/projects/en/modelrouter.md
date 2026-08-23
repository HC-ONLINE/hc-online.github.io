---
title: "ModelRouter"
description: "Asynchronous API for orchestrating multiple LLM providers through a unified interface, with streaming, automatic fallback, availability control, and observability."
subtitle: "Multi-provider LLM orchestration and backend infrastructure"
stack: "Python, FastAPI, Pydantic, HTTPX, Redis, Docker, GitHub Actions"
github: "https://github.com/HC-ONLINE/ModelRouter"
site: null
---

## 1. Overview

ModelRouter is an asynchronous HTTP API built with Python and FastAPI that provides a unified interface for interacting with multiple Large Language Model providers.

The project abstracts provider-specific differences through independent adapters and adds fallback mechanisms, streaming, availability control, and shared temporary state through Redis.

It currently integrates five providers:

- Groq
- OpenRouter
- OpenAI
- Gemini
- Ollama

The project is currently classified as **experimental / active development** and is primarily intended to explore backend architecture patterns for LLM-based infrastructure.

---

## 2. Problem

Integrating multiple LLM providers directly into an application requires handling different:

- APIs and request formats.
- Authentication mechanisms.
- Models and capabilities.
- Response formats.
- Error conditions and availability.
- Streaming mechanisms.

This increases coupling between the application and external providers and makes it harder to add providers or change availability strategies.

ModelRouter addresses this problem by introducing an intermediate layer that exposes a common contract to API consumers.

---

## 3. Solution

ModelRouter introduces an orchestration layer between clients and LLM providers.

The architecture separates:

- HTTP API.
- Validation and serialization.
- Orchestration.
- Routing decisions.
- Provider adapters.
- HTTP client.
- Shared temporary state.
- Observability.

Clients interact with a single contract while ModelRouter determines which provider to use and how to handle specific availability failures.

### Main flow

```text
Client
   │
   ▼
FastAPI
   │
   ▼
Controller
   │
   ▼
Orchestrator
   │
   ▼
Router
   │
   ├── Provider A
   ├── Provider B
   ├── Provider C
   └── ...
        │
        ▼
   External LLM API
        │
        ▼
   Response / Streaming
```

---

## 4. Architecture

ModelRouter uses a layered architecture to separate API responsibilities, orchestration logic, and external integrations.

![ModelRouter Architecture](/images/projects/modelrouter/architecture.png)

*Representative architecture showing the interaction between the API, orchestrator, router, provider adapters, HTTP client, and Redis.*

### Main layers

- **API:** FastAPI and OpenAPI documentation.
- **Controller:** request validation and response construction.
- **Orchestration:** execution coordination, timeouts, and request flow.
- **Routing:** provider selection, availability, and fallback.
- **Providers:** independent adapters for each LLM API.
- **Infrastructure:** HTTPX, Redis, and shared components.
- **Observability:** structured logging, metrics, and health checks.

Separating routing from provider adapters allows provider-selection policies to evolve without coupling them to external API implementations.

---

## 5. Implemented Capabilities

### Multi-provider orchestration

- Unified interface for five LLM providers.
- Independent provider adapters.
- Request and response normalization.
- Isolation of provider-specific API differences.

### Fallback and availability

- Availability-based provider selection.
- Temporary blocking of failing providers.
- Exponential backoff for retries.
- AIMD strategy for availability behavior.

### Streaming

- Server-Sent Events (SSE).
- Incremental response delivery.
- Stream completion signaling.
- Asynchronous connection handling.

### API

- `GET /health` — service health.
- `GET /metrics` — Prometheus-compatible metrics.
- `POST /chat` — non-streaming generation.
- `POST /stream` — SSE-based generation.

### Shared state

Redis is used to maintain temporary information related to:

- Provider failures.
- Temporary blocks.
- Counters.
- Availability-related state.
- Coordination between service instances.

### Observability

- Structured JSON logging.
- Request correlation through `request_id`.
- Prometheus-compatible metrics.
- Health checks.

---

## 6. Technology Stack

| Technology     | Purpose                        |
| -------------- | ------------------------------ |
| Python 3.11+   | Runtime                        |
| FastAPI        | Asynchronous HTTP API          |
| Pydantic       | Data validation and models     |
| HTTPX          | Asynchronous HTTP client       |
| Redis 7        | Shared temporary state         |
| pytest         | Testing                        |
| Black          | Formatting                     |
| Flake8         | Linting                        |
| MyPy           | Static type checking           |
| pre-commit     | Git hooks                      |
| Docker         | Containerization               |
| Docker Compose | Local development              |
| GitHub Actions | CI/CD                          |
| Trivy          | Docker image security scanning |

### Integrated providers

| Provider   | Integration   |
| ---------- | ------------- |
| Groq       | API adapter   |
| OpenRouter | API adapter   |
| OpenAI     | API adapter   |
| Gemini     | API adapter   |
| Ollama     | Local adapter |

---

## 7. Key Technical Decisions

### Adapter Pattern

Each provider is implemented through an independent adapter.

**Advantage:** reduces coupling with external APIs and allows new providers to be added without directly modifying orchestration logic.

**Trade-off:** every integration requires a provider-specific implementation to maintain and test.

### Router separated from providers

Provider selection and fallback policies are separated from provider adapters.

**Advantage:** availability policies can evolve without modifying external integrations.

**Trade-off:** introduces an additional decision-making layer.

### Shared state through Redis

Temporary availability state is kept outside the main application process.

**Advantage:** allows selected state to be shared between multiple service instances.

**Trade-off:** introduces an external dependency and requires Redis availability management.

### Asynchronous architecture

FastAPI and HTTPX enable concurrent request handling and streaming without blocking the main application flow.

**Advantage:** well suited for services that spend time waiting for external provider responses.

**Trade-off:** requires careful handling of errors, timeouts, and cancellation in asynchronous code.

---

## 8. Security

### Implemented mechanisms

- API key authentication.
- Input validation with Pydantic.
- Credential management through environment variables.
- Sensitive information sanitization in logs.
- Docker image vulnerability scanning with Trivy.

### Current limitations

ModelRouter is not presented as a production-hardened LLM gateway.

Currently:

- Authentication is basic.
- No multi-user access control.
- No dedicated CORS configuration.
- No application-level rate limiting independent of provider limits.
- No cryptographic request signing or verification.
- No complete audit logging system.

These limitations are part of the project's current experimental scope.

---

## 9. Testing and Quality

The project includes an automated test suite focused on validating orchestration logic, provider adapters, and core components.

### Observable metrics

- 14 test files.
- 61 tests.
- Unit and integration tests.
- Provider adapter mocking.
- Static type checking.
- Automated linting and formatting.
- Docker image builds.
- Security scanning in CI.

### Pipeline

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

These metrics reflect the project's level of automation and quality control, but should not be interpreted as guarantees of correct behavior across all external providers.

---

## 10. Developer Experience

Although ModelRouter is primarily a backend service, its interface is designed to simplify integration.

### API

- Swagger UI at `/docs`.
- OpenAPI specification.
- Structured JSON responses.
- SSE-based streaming.
- Request correlation IDs.
- Health checks.
- Metrics endpoint.

### Local development

- Environment-based configuration.
- Docker Compose.
- Clearly defined external dependencies.
- Modular project structure.

The goal is to allow client applications to integrate with ModelRouter without needing to understand the implementation details of each LLM provider.

---

## 11. Visual Evidence

### Streaming

![ModelRouter Streaming](/images/projects/modelrouter/streaming.png)

*Incremental response delivered through Server-Sent Events.*

### API

![ModelRouter API Documentation](/images/projects/modelrouter/api-docs.png)

*Interactive API documentation generated through Swagger/OpenAPI.*

### Observability

![ModelRouter Metrics](/images/projects/modelrouter/metrics.png)

*Metrics exposed through the Prometheus-compatible endpoint.*

---

## 12. Current Status and Limitations

### Current status: Experimental / Active Development

ModelRouter is primarily an exploration of backend architecture and infrastructure for LLM-based applications.

It currently does not include:

- Persistent conversation storage.
- Relational database integration.
- Frontend interface.
- End-to-end tests against real providers.
- Advanced user and credential management.
- Multi-user access control.
- Application-level rate limiting.
- Audit logging.
- Distributed tracing.

These limitations define the current scope and prevent the project from being presented as a production-ready LLM gateway.

---

## 13. Evolution and Demonstrated Skills

### Future evolution

Potential future improvements include:

1. PostgreSQL-based conversation persistence.
2. Additional LLM providers.
3. Grafana-based observability dashboard.
4. More detailed provider-level metrics.
5. Advanced credential management.
6. Multi-user authentication and authorization.
7. Integration and end-to-end testing.
8. Configurable rate limiting.
9. Audit logging.
10. Distributed tracing.

### What This Project Demonstrates

ModelRouter demonstrates practical experience in:

- Asynchronous backend development.
- FastAPI and REST API design.
- Multi-provider LLM integration.
- Server-Sent Events.
- Adapter Pattern.
- Fallback and resilience strategies.
- Shared state management with Redis.
- Prometheus-based observability.
- Docker containerization.
- GitHub Actions CI/CD.
- Automated testing.
- Static analysis and code quality.
- Decoupled infrastructure design.

The project's main technical value lies in separating **providers, routing policies, and transport concerns**, allowing different availability strategies to be explored without coupling the application to a specific LLM API.
