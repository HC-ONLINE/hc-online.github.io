---
title: "LyricFlow"
description: "Reproductor de música web con letras sincronizadas en tiempo real, visualización de audio mediante Canvas y Web Audio API, múltiples estilos visuales y un pipeline CLI para importar música y letras."
subtitle: "Reproductor multimedia con letras sincronizadas y visualización de audio"
stack: "Next.js, React, TypeScript, Tailwind CSS, Web Audio API, Canvas"
---

## Visión general

LyricFlow es un reproductor de música web diseñado alrededor de una experiencia visual inmersiva. Sincroniza letras con el audio en tiempo real, muestra visualizaciones generadas mediante Web Audio API y Canvas, permite utilizar diferentes temas visuales y admite múltiples pistas de letra, incluyendo traducciones.

La aplicación funciona principalmente como un sitio estático: la música y sus metadatos se almacenan como archivos locales y no requiere un backend para la reproducción.

| 7           | 6              | 3                      | O(log n)         |
| ----------- | -------------- | ---------------------- | ---------------- |
| scripts CLI | temas visuales | modos de visualización | búsqueda de cues |

## Arquitectura

La aplicación utiliza una arquitectura frontend modular basada en Next.js y React. Un componente principal coordina el reproductor, mientras que el motor de letras, el visualizador, la playlist, los controles y los temas mantienen responsabilidades independientes.

El pipeline CLI funciona de forma independiente durante la preparación del contenido y utiliza LRCLIB para obtener letras sincronizadas.

![Diagrama de arquitectura de LyricFlow](/images/projects/lyricflow/architecture.png)

## Capacidades

### Reproducción y sincronización

- Reproducción de archivos MP3
- Sincronización de letras en tiempo real
- Búsqueda binaria sobre la línea de tiempo de cues
- Soporte para letras originales y traducciones
- Avance automático entre canciones
- Control de progreso y volumen

### Visualización

- Visualizador de audio basado en Canvas
- 3 modos de visualización: barras, onda y espejo
- Procesamiento mediante Web Audio API
- Transiciones entre modos
- Fondos por canción mediante imagen, video o color
- Sincronización del video de fondo con el audio

### Personalización

- 6 temas visuales predefinidos
- Rotación automática de temas
- Personalización de estilos por canción
- Tipografía, color, tamaño, sombra, stroke y alineación configurables
- Persistencia del tema mediante localStorage

### Gestión de contenido

- Playlist basada en JSON
- Búsqueda por título, artista y álbum
- Carga de archivos locales desde el navegador
- Importación de archivos LRC
- Pipeline CLI para procesamiento masivo de canciones
- Integración con LRCLIB durante la preparación del contenido

## Ingeniería

- **Motor de sincronización** — Utiliza un fast-path para mantener el cue actual y búsqueda binaria O(log n) cuando es necesario localizar un nuevo fragmento de letra.
- **Web Audio API** — El audio se conecta a un `AnalyserNode` para obtener datos utilizados por el visualizador en Canvas.
- **Arquitectura modular** — `LyricFlowPlayer` coordina componentes especializados para reproducción, letras, visualización, playlist y temas.
- **Contenido estático** — Las canciones y sus timelines se almacenan como JSON versionable, sin necesidad de una base de datos o backend.
- **Pipeline CLI** — Scripts independientes permiten importar canciones, procesar archivos LRC, obtener letras y preparar metadata antes del despliegue.
- **Responsive UI** — La interfaz utiliza Tailwind CSS y componentes reutilizables para adaptar la experiencia al viewport.

## Modelo técnico

LyricFlow separa la experiencia de reproducción de la preparación del contenido.

Durante la ejecución en el navegador, la aplicación trabaja con archivos estáticos y APIs nativas del navegador. LRCLIB no forma parte del flujo de reproducción: se utiliza durante el proceso offline de importación y preparación de las canciones.

Esto permite mantener el reproductor independiente de servicios externos durante la reproducción.

## Limitaciones actuales

- No existe backend ni base de datos para administrar canciones.
- Agregar contenido requiere modificar los archivos del proyecto y desplegar nuevamente.
- Actualmente no existen tests automatizados.
- Los errores de TypeScript no bloquean el build debido a `ignoreBuildErrors`.
- La importación de temas personalizados mediante `window.prompt()` tiene una UX limitada.
- La carga de archivos locales depende de que el usuario proporcione archivos con la estructura esperada.
- El modo de background dinámico está soportado por la arquitectura, pero actualmente no reacciona realmente al audio.
- No se ha configurado un pipeline de CI/CD.

## Visuales

<!-- IMAGE 01 — Reproductor principal -->

![Reproductor principal de LyricFlow](/images/projects/lyricflow/player.png)

_Interfaz principal con canción reproduciéndose, letras sincronizadas y visualizador de audio activo._

<!-- IMAGE 02 — Visualizador (barras) -->

![Visualizador de audio en modo barras](/images/projects/lyricflow/visualizer-bars.png)

_Visualización de audio en modo barras mediante Canvas y Web Audio API._

<!-- IMAGE 03 — Visualizador (wave) -->

![Visualizador de audio en modo wave](/images/projects/lyricflow/visualizer-wave.png)

_Visualización de audio en modo onda sinusoidal._

<!-- IMAGE 04 — Visualizador (mirror) -->

![Visualizador de audio en modo mirror](/images/projects/lyricflow/visualizer-mirror.png)

_Visualización de audio en modo espejo bilateral._

<!-- IMAGE 05 — Temas -->

![Selector de temas de LyricFlow](/images/projects/lyricflow/themes.png)

_Panel de selección de temas con las 6 opciones visuales predefinidas._
