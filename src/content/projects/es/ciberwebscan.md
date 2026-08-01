---
title: "CiberWebScan"
description: "Reconocimiento pasivo y análisis de superficie de ataque para aplicaciones web"
subtitle: "Reconocimiento pasivo y análisis de superficie de ataque (CLI — Python)"
stack: "Python, Typer, HTTPX, BeautifulSoup4, Playwright, Selenium"
github: "https://github.com/HC-ONLINE/CiberWebScan"
---

## Qué resuelve

- Obtener un mapa técnico y de exposición de aplicaciones web sin realizar interacción intrusiva.
- Proveer contexto (fingerprints, cabeceras, endpoints expuestos) previo a pruebas activas.
- Minimizar falsos positivos aportando evidencia estructurada y métricas de confianza.

## Características clave

- CLI modular, usable en pipelines y auditorías.
- Scraping pasivo y recolección ética (robots.txt, sin ejecución de acciones activas).
- Análisis de cabeceras y políticas de seguridad (CSP, HSTS, cookies).
- Fingerprinting de tecnologías (server, frameworks, libs).
- Exportación estructurada a JSON/CSV para integración con otras herramientas.
- Análisis de certificados SSL/TLS.
- Referencia cruzada con bases de datos CVE.
- Detección de XSS, testing de inyección SQL, enumeración de directorios.
- Quick Scan con presets (low/medium/high).
- API REST (Beta, FastAPI) con Swagger/ReDoc.

## Decisión técnica

- Orientado a modularidad y testabilidad: la CLI orquesta componentes independientes (scanner, fingerprint, exporter).
- Evita acoplarse a frameworks web; favorece librerías ligeras (HTTPX) y componentes intercambiables (Selenium opcional para casos de JS).
- Licencia Apache‑2.0 para facilitar uso educativo y colaborativo.
