---
title: "Proyectos"
description: "Backend, seguridad y arquitectura aplicada"
---

# Proyectos destacados

Una selección de proyectos donde aplico principios de seguridad por diseño, backend robusto y decisiones arquitectónicas explícitas. Cada uno resuelve un problema técnico concreto y contiene documentación sobre trade‑offs y decisiones operativas.

---

## ***CiberWebScan***

### *Reconocimiento pasivo y análisis de superficie de ataque (CLI — Python)*

Herramienta híbrida para reconocimiento pasivo, fingerprinting tecnológico y análisis inicial de aplicaciones web, pensada para auditoría ética y educación.

### *Qué resuelve*

- Obtener un mapa técnico y de exposición de aplicaciones web sin realizar interacción intrusiva.
- Proveer contexto (fingerprints, cabeceras, endpoints expuestos) previo a pruebas activas.
- Minimizar falsos positivos aportando evidencia estructurada y métricas de confianza.

### *Características clave*

- CLI modular, usable en pipelines y auditorías.
- Scraping pasivo y recolección ética (robots.txt, sin ejecución de acciones activas).
- Análisis de cabeceras y políticas de seguridad (CSP, HSTS, cookies).
- Fingerprinting de tecnologías (server, frameworks, libs).
- Exportación estructurada a JSON/CSV para integración con otras herramientas.

### *Decisión técnica*

- Orientado a modularidad y testabilidad: la CLI orquesta componentes independientes (scanner, fingerprint, exporter).
- Evita acoplarse a frameworks web; favorece librerías ligeras (HTTPX) y componentes intercambiables (Selenium opcional para casos de JS).
- Licencia Apache‑2.0 para facilitar uso educativo y colaborativo.

**Stack**: Python, Typer (CLI), HTTPX, Selenium (opcional), pruebas unitarias y exportadores JSON/CSV.  
[GitHub](https://github.com/HC-ONLINE/CiberWebScan)

---

## ***AccessManager***

### *Comparativa y referencia de implementación: JWT vs sesiones en Spring Security*

Proyecto de ejemplo y base reutilizable que implementa y documenta alternativas concretas de autenticación (stateless JWT y stateful sessions) en un contexto Spring Boot empresarial.

### *Qué resuelve*

- Proveer implementaciones correctas y auditables de autenticación en aplicaciones Java/Spring.
- Mostrar trade‑offs operacionales: revocación, rotación, escalado, superficie de ataque y gestión de sesiones.
- Ofrecer una base con tests y ejemplos de configuración para equipos que deben elegir una estrategia.

### *Características clave*

- Implementaciones paralelas: JWT con buenas prácticas (firma, expiración) y gestión tradicional por sesión.
- Configuraciones explícitas de Spring Security con ejemplos de revocación y protección CSRF.
- Tests de integración y documentación de decisiones de diseño.

### *Decisión técnica*

- No dogmatizar: cada solución se evalúa por caso de uso (auditoría, requisitos de cumplimiento, escalado).
- Ejemplos pensados para adaptarse en entornos empresariales con control sobre revocación y monitoreo.

**Stack**: Java 21, Spring Boot 3, Spring Security, Maven.  
[GitHub](https://github.com/HC-ONLINE/AccessManager)

---

## ***PermissionManager***

### *Sistema RBAC con políticas explicables y auditables*

Motor de autorización que combina roles y políticas auditables; cada decisión de acceso puede explicarse y reproducirse para fines regulatorios.

### *Qué resuelve*

- Evitar controles de acceso implícitos u opacos mediante evaluaciones determinísticas y trazables.
- Facilitar auditoría, revisiones y compliance (registro de decisiones y motivos).
- Proveer una base extensible para modelos RBAC empresariales y políticas basadas en atributos.

### *Características clave*

- Evaluador determinístico de permisos y políticas (audit trail por evaluación).
- API REST para gestión de roles, permisos y políticas.
- Integración con Spring Security para aplicar decisiones en tiempo de ejecución.
- Tests y ejemplos de políticas auditables.

### *Decisión técnica*

- No dejar autorización como "caja negra": cada veredicto lleva metadata (qué reglas se evaluaron, entradas y resultado).
- Diseñado para entornos regulados donde la explicación de acceso es un requisito.

**Stack**: Java 21, Spring Boot, Spring Security, PostgreSQL (ejemplo), Maven.  
[GitHub](https://github.com/HC-ONLINE/PermissionManager)

---

## ***LexGuard PII-Scanner***

### *Motor de detección y correlación de PII para auditorías de datos automatizadas*

Motor de detección y correlación de Información de Identificación Personal (PII) diseñado para determinar la exposición de datos sensibles y evaluar riesgos de fuga en repositorios y archivos planos.

### *Qué resuelve*

- Auditorías de datos manuales lentas y herramientas genéricas con altas tasas de falsos positivos.
- Visión fragmentada del riesgo: evalúa exposición real, no solo coincidencias de regex.
- Necesidad de gobernanza de datos explicable, integrable en CI/CD y lista para cumplimiento normativo.
- Identificación de riesgos agregados mediante correlación cross-PII (múltiples tipos de datos sensibles coexistiendo).

### *Características clave*

- CLI-first: Diseñado para ejecutarse en pipelines, scripts de automatización y entornos desatendidos.
- Rules first, IA como apoyo: Reglas deterministas y validaciones algorítmicas (Luhn, prefijos, entropía). IA como capa secundaria para reducir falsos positivos.
- Riesgo explicable: Cada hallazgo incluye un desglose claro de por qué se considera riesgoso y su nivel de confianza.
- Fail-safe por defecto: Ante ambigüedad, clasifica como UNCERTAIN antes que generar falsos positivos críticos.
- Detección actual: Cédula de Ciudadanía (Colombia), teléfono móvil (Colombia), correo electrónico, tarjetas de crédito, y correlación cross-PII.
- Arquitectura modular: Pipeline determinista extensible: ingestión → detección → validación → scoring → correlación → reporte.

### *Decisión técnica*

- Arquitectura basada en pipeline determinista para garantizar reproducibilidad y trazabilidad.
- No es un DLP ni un SIEM: es una herramienta de auditoría y escaneo que identifica exposición, no la remedia.
- Validaciones algorítmicas específicas por región (Colombia) con posibilidad de extensión.
- Licencia Apache-2.0 para uso empresarial y colaborativo.

**Stack**: Python 3.11+, Typer (CLI), validaciones algorítmicas, exportadores JSON.  
[GitHub](https://github.com/HC-ONLINE/LexGuard)

---

## ***ModelRouter***

### *Orquestador asíncrono de LLMs con resiliencia y observabilidad*

Gateway/API asíncrona que unifica proveedores de modelos, facilita streaming (SSE), fallback automático y trazabilidad para integraciones de IA en producción.

### *Qué resuelve*

- Abstracción de proveedores heterogéneos (Groq, OpenRouter, Ollama, etc.) evitando vendor‑lockin a nivel de aplicación.
- Resiliencia: fallback automático, retries y circuit breakers sobre proveedores.
- Observabilidad real: métricas, trazas y logs asociados a cada request/response y coste por llamada.

### *Características clave*

- API asíncrona (FastAPI / async) con soporte de streaming (SSE / chunked responses).
- Estrategias de fallback, rate limiting y priorización de proveedores.
- Instrumentación con OpenTelemetry u otros adaptadores para métricas y trazas.
- Diseño extensible para añadir nuevos proveedores o políticas de ruteo.

### *Decisión técnica*

- Separar la lógica de orquestación del adaptador del proveedor para facilitar testing y permitir switching en caliente.
- Priorizar latencia y observabilidad: telemetría por request para análisis de coste/efectividad.

**Stack**: Python, FastAPI, asyncio, SSE/streaming, OpenTelemetry, contenedores Docker.  
[GitHub](https://github.com/HC-ONLINE/ModelRouter)

---

## ***ORBIT-UI***

### *Design system CSS‑first (Astro + Tailwind)*

Sistema de diseño ligero y mantenible, centrado en tokens semánticos y componentes CSS‑first para reducir dependencia de JS.

Sitio: <https://hc-online.github.io/ORBIT-UI/>

### *Qué resuelve*

- Consistencia visual y tokens compartidos entre proyectos técnicos.
- Minimizar la lógica JS en componentes básicos para mejorar rendimiento y mantenibilidad.
- Proveer una base clara de contratos visuales (tokens y componentes) sin pretender ser un kit completo.

### *Características clave*

- Tokens semánticos y utilidades Tailwind adaptadas.
- Componentes reutilizables con enfoque CSS‑first (estilos y accesibilidad).
- Documentación y ejemplos Live en sitio (Storybook/Docs‑like).

### *Decisión técnica*

- Priorizar simplicidad: CSS y tokens antes que heavy JS frameworks.
- Favorecer interoperabilidad y contratos claros entre frontend y diseño.

**Stack**: Astro, Tailwind CSS v4, TypeScript (donde procede).  
[GitHub](https://github.com/HC-ONLINE/ORBIT-UI)

---

## ***Filosofía común***

Todos los proyectos comparten:

- Seguridad como requisito, no como añadido.
- Dependencias justificadas y auditables.
- Testing con propósito (unit, integration, e2e cuando aplica).
- Documentación técnica y decisiones explícitas.
- Diseño modular y enfocada a mantenimiento y observabilidad.
- Automatización y CI/CD para calidad y despliegues reproducibles.
