---
title: "ModelRouter"
description: "Asynchronous LLM Orchestrator with Resilience and Observability"
subtitle: "Asynchronous LLM Orchestrator with Resilience and Observability"
stack: "Python, FastAPI, asyncio, httpx, Redis, SSE, Docker"
github: "https://github.com/HC-ONLINE/ModelRouter"
---

## The Problem It Solves

* Abstracts heterogeneous providers (Groq, OpenRouter, Ollama, etc.) to avoid vendor lock-in at the application level.
* Resilience: automatic fallback, retries, and circuit breakers across providers.
* Real observability: metrics, traces, and logs associated with each request/response and cost per call.

## Key Features

* Asynchronous API (FastAPI / async) with streaming support (SSE / chunked responses).
* Strategies for fallback, rate limiting, and provider prioritization.
* Instrumentation with Prometheus for metrics and traces.
* Structured logging and per-request metrics.
* Docker and docker-compose deployment.
* Provider adapter architecture (hot-swappable).

## Technical Decision

* Separates orchestration logic from the provider adapter to facilitate testing and enable hot-switching.
* Prioritizes latency and observability: per-request telemetry for cost/effectiveness analysis.
