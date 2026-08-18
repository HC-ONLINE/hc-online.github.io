---
title: "CiberWebScan"
description: "Herramienta de seguridad para automatizar el reconocimiento y evaluación controlada de aplicaciones web mediante fingerprinting tecnológico, análisis SSL/TLS, cabeceras de seguridad, scraping y pruebas activas con consentimiento explícito."
subtitle: "Reconocimiento y evaluación de aplicaciones web"
stack: "Python, Typer, HTTPX, Playwright, BeautifulSoup4, FastAPI, Pydantic"
github: "https://github.com/HC-ONLINE/CiberWebScan"
---

## Visión general

CiberWebScan centraliza distintas etapas de la evaluación de una aplicación web en una única herramienta modular. Permite comenzar con reconocimiento y análisis pasivo de tecnologías, configuración SSL/TLS, cabeceras y recursos, y extender el flujo a scraping y pruebas activas controladas.

| 94               | 1,308             | 7                 | 4                       |
| ---------------- | ----------------- | ----------------- | ----------------------- |
| archivos de test | funciones de test | módulos de ataque | formatos de exportación |

## Arquitectura

La herramienta separa las interfaces de entrada, la orquestación de servicios y los componentes especializados de análisis, scraping y pruebas.

![Diagrama de arquitectura de CiberWebScan](/images/projects/ciberwebscan/architecture.png)

## Capacidades

**Análisis y reconocimiento**

- Fingerprinting de tecnologías
- Análisis SSL/TLS
- Evaluación de cabeceras de seguridad
- Correlación con CVE
- Scraping estático y dinámico

**Pruebas activas controladas**

- XSS
- Inyección SQL
- Path traversal
- CSRF
- Enumeración de directorios
- Enumeración de subdominios
- Inyección de comandos OS

> Las pruebas activas están deshabilitadas por defecto y requieren consentimiento explícito antes de su ejecución, además de restricciones configurables sobre los objetivos.

## Ingeniería

- **Cliente HTTP** — Cliente centralizado con reintentos y backoff, rate limiting por dominio, comportamiento adaptativo AIMD, soporte de proxies, HTTP/2 y logging estructurado.
- **Arquitectura modular** — Los servicios orquestan analizadores, módulos de ataque y motores de scraping independientes, manteniendo la lógica central desacoplada de las capas CLI y API.
- **API REST** — API basada en FastAPI con autenticación mediante API key, rate limiting, configuración CORS, endpoints de salud y descarga temporal de resultados.
- **Configuración** — Configuración basada en Pydantic con perfiles YAML y anulación mediante variables de entorno.
- **Exportación** — Resultados disponibles en JSON, JSONL, CSV y HTML.
- **Calidad** — CI automatizado para Python 3.10–3.12 con pytest, Ruff, Pyright y pre-commit.

## Modelo de seguridad

CiberWebScan separa el análisis pasivo de las pruebas activas. Los módulos activos permanecen deshabilitados por defecto y requieren consentimiento explícito antes de ejecutarse. Las restricciones de objetivos y los niveles de intensidad configurables proporcionan controles adicionales para reducir ejecuciones no intencionadas.

**Limitaciones actuales**

- La API REST se encuentra en estado beta.
- Los tokens de descarga de la API se almacenan actualmente en memoria.
- La arquitectura de deep scan está planificada, pero no está completamente implementada.
- Algunas opciones de fingerprinting todavía no están completamente conectadas a la capa de orquestación.

## Visuales

<!-- IMAGE 01 — CLI screenshot -->

![CLI de CiberWebScan](/images/projects/ciberwebscan/cli-help.png)

_Ayuda de la CLI: comandos de análisis, scraping, pruebas activas y quick scan._

<!-- IMAGE 02 — HTML report -->

![Reporte HTML de CiberWebScan](/images/projects/ciberwebscan/report-html.png)

_Reporte HTML generado por un quick scan con el preset medium, incluyendo puntuación de riesgo y hallazgos del análisis._

<!-- IMAGE 03 — API / Swagger -->

![API REST de CiberWebScan](/images/projects/ciberwebscan/api-docs.png)

_Documentación interactiva de la API REST (`/docs`) con endpoints de análisis, scraping, pruebas activas y health checks._
