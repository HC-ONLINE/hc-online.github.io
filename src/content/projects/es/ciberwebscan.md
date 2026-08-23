---
title: "CiberWebScan"
description: "Herramienta de seguridad para automatizar el reconocimiento y evaluación controlada de aplicaciones web mediante fingerprinting tecnológico, análisis SSL/TLS, cabeceras de seguridad, scraping y pruebas activas con consentimiento explícito."
subtitle: "Reconocimiento y evaluación de aplicaciones web"
stack: "Python, Typer, HTTPX, Playwright, BeautifulSoup4, FastAPI, Pydantic"
github: "https://github.com/HC-ONLINE/CiberWebScan"
---

# CiberWebScan

## Herramienta modular para reconocimiento y evaluación controlada de aplicaciones web

**Stack:** Python · Typer · Rich · HTTPX · Playwright · BeautifulSoup4 · FastAPI · Pydantic
**Estado:** Beta
**Licencia:** Apache 2.0
**Repositorio:** <https://github.com/HC-ONLINE/CiberWebScan>

---

## 1. Resumen

CiberWebScan es una herramienta de seguridad desarrollada en Python que centraliza diferentes etapas de la evaluación de aplicaciones web en una arquitectura modular.

Combina reconocimiento pasivo, fingerprinting tecnológico, análisis SSL/TLS, evaluación de cabeceras de seguridad, scraping web estático y dinámico, correlación de tecnologías con vulnerabilidades conocidas y pruebas activas controladas.

El proyecto proporciona dos interfaces sobre los mismos motores de análisis:

* **CLI:** orientada a uso interactivo y automatización.
* **REST API:** orientada a integración programática.

Las pruebas activas permanecen deshabilitadas por defecto y requieren consentimiento explícito.

---

## 2. Problema

La evaluación de una aplicación web normalmente requiere combinar diferentes herramientas para reconocimiento, fingerprinting, análisis de configuración, extracción de información y pruebas de seguridad.

Esta fragmentación puede aumentar:

* El tiempo de configuración.
* El cambio de contexto entre herramientas.
* La duplicación de trabajo.
* La dificultad para correlacionar resultados.

CiberWebScan aborda este problema mediante una arquitectura que reúne estas capacidades bajo una misma interfaz y un modelo de resultados común.

---

## 3. Solución

La herramienta organiza el proceso en varios componentes especializados:

* **Fingerprinting:** identificación de frameworks, CMS, servidores y otras tecnologías.
* **SSL/TLS:** análisis de certificados, protocolos y suites criptográficas.
* **Security Headers:** evaluación de cabeceras como CSP, HSTS y X-Frame-Options.
* **CVE Correlation:** asociación de tecnologías detectadas con vulnerabilidades conocidas.
* **Scraping:** extracción estructurada mediante parsing estático o renderizado JavaScript.
* **Active Testing:** pruebas controladas para diferentes clases de vulnerabilidades.
* **Exportación:** generación de resultados en JSON, JSONL, CSV y HTML.

La CLI permite ejecutar estas capacidades individualmente o mediante un `quick scan` con diferentes niveles de intensidad.

---

## 4. Arquitectura

CiberWebScan utiliza una arquitectura modular por capas:

![Diagrama de arquitectura de CiberWebScan](/images/projects/ciberwebscan/architecture.png)

La separación permite incorporar o modificar analizadores sin acoplarlos directamente a las interfaces de usuario.

---

## 5. Capacidades implementadas

### Reconocimiento y análisis

* Fingerprinting tecnológico.
* Identificación de frameworks, CMS y servidores.
* Análisis de certificados SSL/TLS.
* Evaluación de protocolos y suites criptográficas.
* Análisis de cabeceras de seguridad.
* Correlación de tecnologías con CVE.
* Scraping estático.
* Scraping dinámico con renderizado JavaScript.
* Extracción estructurada de contenido.

### Pruebas activas controladas

El proyecto implementa módulos para:

* Cross-Site Scripting (XSS).
* SQL Injection.
* Path Traversal.
* CSRF.
* Enumeración de directorios.
* Enumeración de subdominios mediante DNS.
* Inyección de comandos OS.

Estas capacidades están destinadas exclusivamente a entornos autorizados.

### Infraestructura

* Cliente HTTP centralizado.
* Retry y backoff.
* Rate limiting por dominio.
* Soporte HTTP/2.
* Integración mediante proxies.
* Logging estructurado.
* Configuración mediante Pydantic y YAML.
* Restricciones configurables de objetivos e intensidad.

---

## 6. Stack tecnológico

| Tecnología               | Uso                                    |
| ------------------------ | -------------------------------------- |
| Python 3.10+             | Runtime y lógica principal             |
| Typer                    | CLI                                    |
| Rich                     | Presentación de resultados en terminal |
| HTTPX                    | Cliente HTTP y HTTP/2                  |
| BeautifulSoup4           | Parsing HTML estático                  |
| Playwright               | Renderizado y scraping dinámico        |
| pyOpenSSL / cryptography | Análisis SSL/TLS                       |
| Pydantic                 | Modelos y validación de configuración  |
| PyYAML                   | Perfiles de configuración              |
| orjson                   | Serialización JSON                     |
| FastAPI                  | REST API                               |
| Uvicorn                  | Servidor ASGI                          |
| pytest                   | Testing                                |
| Ruff                     | Linting y formateo                     |
| Pyright                  | Verificación estática de tipos         |
| GitHub Actions           | CI/CD                                  |

Las dependencias de la API se mantienen separadas de la instalación básica de la CLI.

---

## 7. Decisiones técnicas relevantes

### Arquitectura modular

Cada capacidad de análisis se implementa como un componente independiente.

**Ventaja:** facilita añadir nuevos analizadores y módulos sin modificar directamente el núcleo de orquestación.

**Trade-off:** aumenta el número de componentes que deben mantenerse y probarse.

### CLI + REST API

Ambas interfaces utilizan los mismos motores internos.

Esto permite mantener una única implementación de las capacidades de seguridad mientras se ofrecen dos formas de interacción:

* CLI para investigadores, pentesters y automatización local.
* API para integración con otras aplicaciones.

La API permanece en beta y sus contratos pueden evolucionar.

### Pruebas activas con consentimiento

Las pruebas activas están separadas del reconocimiento pasivo y requieren una habilitación explícita.

Esta decisión reduce el riesgo de ejecutar accidentalmente pruebas intrusivas contra objetivos no autorizados.

### Dependencias opcionales

FastAPI y sus dependencias asociadas no son necesarias para utilizar la CLI.

Esto mantiene una instalación más ligera para quienes solo necesitan las capacidades locales de análisis.

---

## 8. Seguridad y uso responsable

CiberWebScan está diseñado para evaluación de seguridad autorizada, investigación y propósitos educativos.

Las principales salvaguardas incluyen:

* Pruebas activas deshabilitadas por defecto.
* Consentimiento explícito para habilitar ataques.
* Restricciones configurables de objetivos.
* Niveles de intensidad.
* Rate limiting para reducir impacto sobre el objetivo.
* Soporte de proxies para integrar el tráfico con herramientas de seguridad.

El usuario debe contar con autorización antes de evaluar cualquier sistema que no controle directamente y cumplir con las leyes y políticas aplicables.

---

## 9. Testing y calidad

El proyecto cuenta con una suite extensa de pruebas automatizadas y herramientas de análisis estático.

Datos observables del proyecto:

* **94 archivos de test**
* **1.308 funciones de test**
* Tests unitarios, de integración y pruebas lentas.
* Soporte para pruebas asíncronas.
* Reportes de cobertura en diferentes formatos.
* Ruff para calidad y consistencia del código.
* Pyright para verificación estática.
* GitHub Actions para automatización del pipeline.

El objetivo de esta infraestructura no es demostrar que el scanner detecta todas las vulnerabilidades, sino mantener controlada la evolución del código y reducir regresiones.

---

## 10. Evidencia visual

### CLI

![CLI de CiberWebScan](/images/projects/ciberwebscan/cli-help.png)

*Interfaz de ayuda de la CLI con comandos de análisis, scraping, pruebas activas y quick scan.*

### Reporte HTML

![Reporte HTML de CiberWebScan](/images/projects/ciberwebscan/report-html.png)

*Reporte generado por un quick scan, con hallazgos y evaluación de riesgo.*

### REST API

![API REST de CiberWebScan](/images/projects/ciberwebscan/api-docs.png)

*Documentación interactiva de la API mediante Swagger UI.*

### Arquitectura

![Arquitectura de CiberWebScan](/images/projects/ciberwebscan/architecture.png)

*Separación entre interfaces, orquestación, motores de análisis, pruebas activas, scraping y exportación.*

---

## 11. Estado y limitaciones

### Estado actual: Beta

El proyecto dispone de una base funcional amplia, pero no se presenta como una plataforma de seguridad lista para producción.

Limitaciones conocidas:

* La REST API continúa en beta y sus contratos pueden cambiar.
* La arquitectura de deep scan no está completamente implementada.
* Algunas capacidades de fingerprinting todavía requieren integración adicional con la orquestación.
* Los tokens temporales de descarga de resultados no utilizan almacenamiento persistente.
* No existe almacenamiento persistente de resultados de escaneo.
* No existe un sistema completo de auditoría de actividades de escaneo.
* No existe actualmente una arquitectura de escaneo distribuido.
* La personalización de los reportes HTML es limitada.

Estas limitaciones forman parte explícita del alcance actual del proyecto.

---

## 12. Evolución futura

Las siguientes mejoras representan posibles líneas de evolución:

1. Completar la arquitectura de deep scan.
2. Incorporar almacenamiento persistente de resultados.
3. Implementar auditoría de actividades.
4. Mejorar la personalización de reportes.
5. Ampliar los módulos de detección.
6. Añadir escaneo distribuido.
7. Fortalecer autenticación y autorización de la API.
8. Completar la documentación de la API.
9. Incorporar formatos como SARIF y PDF.
10. Añadir programación y gestión de escaneos.

Estas mejoras no forman parte del estado actual y no se presentan como funcionalidades existentes.

---

## 13. Qué demuestra este proyecto

CiberWebScan demuestra experiencia práctica en:

* Diseño de arquitectura modular.
* Desarrollo de herramientas CLI con Python.
* Desarrollo de APIs REST con FastAPI.
* Cliente HTTP y comunicación HTTP/2.
* Scraping estático y dinámico.
* Fingerprinting tecnológico.
* Análisis SSL/TLS.
* Evaluación de cabeceras de seguridad.
* Automatización de pruebas de seguridad.
* Diseño de salvaguardas para operaciones activas.
* Configuración y validación con Pydantic.
* Exportación y generación de reportes.
* Testing automatizado.
* Análisis estático y CI/CD.
* Documentación de decisiones técnicas y trade-offs.

El valor principal del proyecto no está únicamente en la cantidad de funcionalidades, sino en haberlas organizado dentro de una arquitectura común, con separación de responsabilidades y controles explícitos para las operaciones activas.
