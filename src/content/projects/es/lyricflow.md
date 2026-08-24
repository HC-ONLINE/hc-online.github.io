---
title: "LyricFlow"
description: "Reproductor de música web con letras sincronizadas en tiempo real, visualización de audio mediante Canvas y Web Audio API, múltiples temas visuales y un pipeline CLI para preparar contenido."
subtitle: "Reproductor multimedia con letras sincronizadas y visualización de audio"
stack: "Next.js, React, TypeScript, Tailwind CSS, Web Audio API, Canvas"
github: "https://github.com/HC-ONLINE/LyricFlow"
site: "https://lyric-flow-lime.vercel.app"
---

## 1. Resumen

LyricFlow es un reproductor de música web orientado a una experiencia visual inmersiva. Sincroniza letras con el audio en tiempo real, genera visualizaciones mediante Web Audio API y Canvas, permite cambiar entre diferentes temas visuales y soporta múltiples pistas de letras, incluyendo traducciones.

La aplicación está diseñada para funcionar principalmente como frontend estático, sin requerir un backend para la reproducción. El contenido musical y sus metadatos se preparan mediante un pipeline CLI que permite importar canciones, procesar archivos LRC y obtener letras sincronizadas desde LRCLIB.

El proyecto se centra en frontend multimedia, sincronización en tiempo real, procesamiento de audio en el navegador y creative coding.

---

## 2. Contexto y objetivo

Los reproductores de música suelen separar la reproducción de audio de la experiencia visual. LyricFlow explora cómo combinar reproducción, letras sincronizadas, visualización de audio y personalización visual dentro de una misma interfaz.

Los objetivos principales fueron:

- Sincronizar letras con la posición actual del audio.
- Analizar el audio directamente en el navegador.
- Generar visualizaciones mediante Canvas.
- Mantener una arquitectura frontend modular.
- Separar la preparación del contenido de la experiencia de reproducción.
- Evitar la necesidad de un backend para el funcionamiento principal.

---

## 3. Solución

LyricFlow combina dos partes principales:

### Reproductor web

- Reproducción de archivos MP3.
- Sincronización de letras mediante una línea de tiempo de cues.
- Búsqueda binaria para localizar el cue activo.
- Visualización de audio mediante `AnalyserNode`.
- Tres modos de visualización: barras, onda y espejo.
- Sistema de temas visuales.
- Fondos por canción mediante imagen, vídeo o color.
- Playlist basada en JSON.
- Soporte para letras originales y traducciones.

### Pipeline CLI

El contenido se prepara antes del despliegue mediante comandos independientes:

- `songs:import`
- `songs:import-lrc`
- `songs:fetch-lyrics`
- `songs:generate`
- `check-missing-timelines`
- `inject-background`

El pipeline puede procesar contenido local y, cuando se utiliza la integración con LRCLIB, consultar la API para obtener letras sincronizadas.

### Flujo de contenido

```text
Audio + Metadata
      ↓
CLI Pipeline
      ↓
LRCLIB (opcional)
      ↓
public/songs/<slug>/
      ├── audio.mp3
      ├── song.json
      └── background.* (opcional)
      ↓
Next.js / React
      ↓
Audio Element
      ├── Web Audio API
      ├── Canvas Visualizer
      └── Lyrics Engine
````

---

## 4. Arquitectura

La aplicación utiliza una arquitectura frontend modular basada en Next.js y React.

![Diagrama de arquitectura de LyricFlow](/images/projects/lyricflow/architecture.png)

*Arquitectura del reproductor, componentes React, procesamiento de audio, visualizador Canvas y pipeline CLI.*

### Componentes principales

- **LyricFlowPlayer** — Orquesta el reproductor y sus principales estados.
- **LyricsDisplay** — Renderiza las letras y el estado de sincronización.
- **AudioVisualizer** — Procesa datos del `AnalyserNode` y renderiza Canvas.
- **PlaylistPanel** — Gestiona la navegación y selección de canciones.
- **PlayerControls** — Controla reproducción, seek, volumen y navegación.
- **ThemeSelector** — Gestiona la selección de temas.

### Hooks principales

- **useLyricEngine** — Gestiona el estado del reproductor y la sincronización de letras.
- **usePlayerTheme** — Gestiona la selección y persistencia del tema.

---

## 5. Stack tecnológico

### Frontend

| Tecnología              | Propósito               |
| ----------------------- | ----------------------- |
| Next.js 16 / App Router | Framework y routing     |
| React 19                | Componentes y estado    |
| TypeScript 5.7          | Tipado estático         |
| Tailwind CSS 4          | Estilos                 |
| shadcn/ui + Base UI     | Componentes de interfaz |
| Lucide React            | Iconografía             |

### Audio y visualización

| Tecnología     | Propósito                             |
| -------------- | ------------------------------------- |
| Web Audio API  | Análisis del audio                    |
| `AnalyserNode` | Obtención de datos para visualización |
| Canvas 2D      | Renderizado del visualizador          |

### Contenido y herramientas

| Tecnología | Propósito                         |
| ---------- | --------------------------------- |
| LRCLIB API | Obtención de letras sincronizadas |
| JSON       | Metadatos y timelines             |
| LRC        | Formato de entrada de letras      |
| pnpm       | Gestión de dependencias           |
| Vercel     | Despliegue                        |

---

## 6. Funcionalidades implementadas

### Reproducción y letras

- Reproducción de MP3.
- Controles de reproducción y progreso.
- Sincronización de letras en tiempo real.
- Soporte para letras originales y traducciones.
- Avance automático entre canciones.
- Búsqueda binaria sobre la línea de tiempo de cues.
- Carga de archivos locales mediante `URL.createObjectURL`.

### Visualización

- Visualizador basado en Canvas.
- Modos barras, onda y espejo.
- Procesamiento mediante Web Audio API.
- Fondos por canción mediante imagen, vídeo o color.
- Vídeo de fondo sincronizado con la reproducción.
- Configuración de opacidad.

### Personalización

- 6 temas visuales predefinidos:

  - Cosmic Night
  - Solar Flare
  - Deep Ocean
  - Forest Noir
  - Neon Tokyo
  - Arctic Minimal
- Rotación automática de temas.
- Estilos personalizados por canción.
- Persistencia de preferencias mediante `localStorage`.
- Importación de temas personalizados mediante JSON.

### Gestión de contenido

- Playlist basada en JSON.
- Búsqueda por título, artista y álbum.
- Importación de archivos LRC.
- Procesamiento masivo mediante CLI.
- Integración con LRCLIB.
- Asociación automática de fondos durante la importación.

---

## 7. Decisiones técnicas

### Búsqueda binaria para sincronización

La posición activa de la letra se obtiene mediante búsqueda binaria sobre una línea de tiempo ordenada.

**Ventaja:** reduce la búsqueda del cue activo a O(log n).

**Trade-off:** requiere mantener los cues ordenados y gestionar correctamente los límites de la línea de tiempo.

### Web Audio API + Canvas

El visualizador utiliza APIs nativas del navegador en lugar de una biblioteca especializada.

**Ventaja:** control directo sobre el procesamiento y renderizado.

**Trade-off:** la implementación de los modos de visualización y su optimización queda bajo responsabilidad de la aplicación.

### Contenido estático

Las canciones y sus metadatos se almacenan como archivos versionables.

**Ventaja:** elimina la necesidad de una base de datos y simplifica el despliegue.

**Trade-off:** añadir contenido requiere modificar los archivos del proyecto y realizar un nuevo despliegue.

### Separación del pipeline CLI

La preparación del contenido está separada del reproductor.

**Ventaja:** permite procesar y validar contenido antes de incorporarlo al frontend.

**Trade-off:** las actualizaciones de contenido requieren ejecutar el pipeline y volver a desplegar.

### Formato JSON propio

LyricFlow utiliza un formato JSON propio para representar metadatos, timelines, estilos y fondos.

**Ventaja:** permite adaptar la estructura a las necesidades específicas del reproductor.

**Trade-off:** formatos externos como LRC necesitan ser convertidos antes de utilizarse directamente.

---

## 8. Seguridad y calidad

LyricFlow no dispone de backend ni de cuentas de usuario. El contenido musical incluido en la aplicación se sirve como archivos del frontend.

### Seguridad

- No existen credenciales de backend.
- No existe una base de datos de usuarios.
- No existe una capa de autenticación.
- Los archivos locales se procesan mediante `URL.createObjectURL`.
- Los archivos seleccionados localmente no se cargan al servidor.
- LRCLIB se utiliza durante la preparación del contenido, no como dependencia necesaria para reproducir una canción ya preparada.
- Las preferencias del usuario se almacenan localmente mediante `localStorage`.

El despliegue utiliza Vercel Analytics, por lo que no debe interpretarse que la aplicación no realiza ninguna comunicación externa.

### Calidad actual

Actualmente el proyecto presenta deuda técnica:

- Sin tests unitarios.
- Sin tests de integración.
- Sin tests E2E.
- Sin cobertura automatizada.
- `ignoreBuildErrors` habilitado para TypeScript.
- Sin pipeline CI/CD.

El uso de `ignoreBuildErrors` es particularmente relevante porque permite desplegar aunque existan errores de TypeScript. Para un proyecto de producción debería eliminarse.

---

## 9. Experiencia de usuario

LyricFlow utiliza una interfaz de pantalla completa orientada a la reproducción.

### Desktop

- Área principal de reproducción.
- Letras sincronizadas.
- Visualizador Canvas.
- Panel lateral de playlist.
- Controles inferiores.

### Mobile

- Distribución vertical.
- Controles adaptados a pantallas pequeñas.
- Playlist mediante panel superpuesto.

### Interacciones

- Resaltado de letras sincronizado con el audio.
- Cambio de tema sin detener la reproducción.
- Carga de archivos locales sin recargar la página.
- Avance automático de canciones.
- Atajos de teclado.

---

## 10. Evidencia visual

### Reproductor principal

![Reproductor principal de LyricFlow](/images/projects/lyricflow/player.png)

*Interfaz principal con reproducción, letras sincronizadas y visualizador activo.*

### Visualizador — barras

![Visualizador de audio en modo barras](/images/projects/lyricflow/visualizer-bars.png)

*Visualización de frecuencia mediante Canvas y Web Audio API.*

### Visualizador — wave

![Visualizador de audio en modo wave](/images/projects/lyricflow/visualizer-wave.png)

*Visualización del audio mediante una representación de onda.*

### Visualizador — mirror

![Visualizador de audio en modo mirror](/images/projects/lyricflow/visualizer-mirror.png)

*Visualización bilateral del espectro de audio.*

### Temas

![Selector de temas de LyricFlow](/images/projects/lyricflow/themes.png)

*Selector de los seis temas visuales disponibles.*

---

## 11. Estado actual

### Clasificación: Demo / Proof of Concept

LyricFlow está orientado principalmente a demostrar capacidades de frontend multimedia y creative coding.

Actualmente:

- No existe backend.
- No existe gestión persistente de canciones.
- El contenido se administra mediante archivos.
- No existe una suite de tests automatizados.
- TypeScript puede ignorar errores durante el build.
- No existe CI/CD.
- El despliegue está orientado principalmente a demostración.

Por tanto, **no debe presentarse como una plataforma de streaming de música lista para producción**.

### Limitaciones principales

- No existe backend ni base de datos.
- El contenido requiere actualización mediante archivos.
- No existe autenticación.
- No existe colaboración entre usuarios.
- No existe reproducción offline dedicada.
- La importación de temas tiene una UX básica.
- Los fondos de vídeo no reaccionan directamente al análisis del audio.
- No existe aplicación móvil nativa.

---

## 12. Evolución prevista

Las mejoras más relevantes serían:

1. Eliminar `ignoreBuildErrors` y reforzar TypeScript.
2. Incorporar tests unitarios y E2E para reproducción y sincronización.
3. Configurar CI/CD.
4. Mejorar la importación de temas mediante carga de archivos.
5. Evaluar una arquitectura backend si el proyecto requiere cuentas, playlists persistentes o gestión remota de contenido.
6. Mejorar la experiencia móvil.

Estas mejoras son una posible evolución técnica, no funcionalidades actualmente implementadas.

---

## 13. Competencias demostradas y referencias

### Competencias

- Arquitectura frontend con Next.js y React.
- Desarrollo TypeScript.
- Web Audio API.
- Canvas 2D.
- Sincronización de datos en tiempo real.
- Implementación de búsqueda binaria.
- Gestión de estado mediante hooks.
- Diseño de sistemas de temas.
- Procesamiento de archivos locales.
- Integración con APIs externas.
- Desarrollo de herramientas CLI.
- Diseño responsive.
- Creative coding.
