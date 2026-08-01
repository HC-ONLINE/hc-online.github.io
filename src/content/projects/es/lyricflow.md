---
title: "LyricFlow"
description: "Reproductor de música web con letras sincronizadas en tiempo real y visualizador de espectro de audio"
subtitle: "Reproductor de música web con letras sincronizadas en tiempo real"
stack: "Next.js 16, React 19, Tailwind CSS 4, shadcn/ui, Web Audio API"
site: "https://lyric-flow-lime.vercel.app"
---

## Qué resuelve

- Necesidad de un reproductor de música web con letras sincronizadas en tiempo real.
- Soporte para múltiples pistas de letras (original, traducción, etc.).
- Visualización del espectro de audio con múltiples modos y temas.

## Características clave

- Letras sincronizadas en tiempo real con optimización de búsqueda binaria.
- Múltiples pistas de letras (original, traducción, etc.) mediante `track_order`.
- Estilo por línea (color, tipografía, sombras, gradientes, transiciones).
- Visualizador de espectro de audio con 3 modos (barras, onda, espejo).
- 6 temas visuales predefinidos + importación de tema personalizado vía JSON.
- Fondos por canción (color sólido, modo dinámico, imagen o video).
- Panel de playlist con búsqueda y navegación.
- Soporte de subida de archivos locales (audio + JSON) directamente desde el navegador.
- Pipeline de importación de canciones con integración LRCLIB.
- Obtención automática de letras y generación de song.json.

## Decisión técnica

- Separar la lógica de reproducción de la UI para facilitar testing y mantenimiento.
- Usar Web Audio API para el visualizador de espectro en tiempo real.
- Priorizar la experiencia de usuario con sincronización precisa de letras.
