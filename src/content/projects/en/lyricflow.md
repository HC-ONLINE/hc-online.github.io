---
title: "LyricFlow"
description: "Web music player with real-time synchronized lyrics, Canvas and Web Audio API visualization, multiple visual themes, and a CLI pipeline for importing music and lyrics."
subtitle: "Multimedia player with synchronized lyrics and audio visualization"
stack: "Next.js, React, TypeScript, Tailwind CSS, Web Audio API, Canvas"
---

## Overview

LyricFlow is a web music player built around an immersive visual listening experience. It synchronizes lyrics with audio in real time, renders audio visualizations using Web Audio API and Canvas, provides multiple visual themes, and supports multiple lyric tracks including translations.

The application primarily operates as a static frontend: music and metadata are stored as local files and no backend is required for playback.

| 7           | 6             | 3                   | O(log n)   |
| ----------- | ------------- | ------------------- | ---------- |
| CLI scripts | visual themes | visualization modes | cue lookup |

## Architecture

The application uses a modular frontend architecture based on Next.js and React. A central component coordinates the player while the lyric engine, visualizer, playlist, controls, and theme system maintain separate responsibilities.

The CLI pipeline operates independently during content preparation and uses LRCLIB to retrieve synchronized lyrics.

![LyricFlow architecture diagram](/images/projects/lyricflow/architecture.png)

## Capabilities

### Playback and synchronization

- MP3 playback
- Real-time lyric synchronization
- Binary search over the cue timeline
- Support for original lyrics and translations
- Automatic track advancement
- Progress and volume controls

### Visualization

- Canvas-based audio visualizer
- 3 visualization modes: bars, waveform, and mirror
- Web Audio API processing
- Transitions between visualization modes
- Per-song image, video, or solid-color backgrounds
- Background video synchronized with audio playback

### Customization

- 6 predefined visual themes
- Automatic theme rotation
- Per-song styling
- Configurable typography, colors, size, shadows, strokes, and alignment
- Theme persistence through localStorage

### Content management

- JSON-based playlist
- Search by title, artist, and album
- Local file loading directly in the browser
- LRC file import
- CLI pipeline for bulk song processing
- LRCLIB integration during content preparation

## Engineering

- **Synchronization engine** — Uses a fast-path to retain the current cue and binary search O(log n) when a new lyric segment must be located.
- **Web Audio API** — Connects the audio element to an `AnalyserNode` to generate data consumed by the Canvas visualizer.
- **Modular architecture** — `LyricFlowPlayer` coordinates specialized components for playback, lyrics, visualization, playlist management, and themes.
- **Static content** — Songs and their timelines are stored as version-controlled JSON files without requiring a database or backend.
- **CLI pipeline** — Independent scripts handle song imports, LRC processing, lyric retrieval, and metadata preparation before deployment.
- **Responsive UI** — Tailwind CSS and reusable components provide adaptive layouts across viewport sizes.

## Technical Model

LyricFlow separates playback from content preparation.

At runtime, the browser works with static files and native browser APIs. LRCLIB is not part of the playback flow; it is used offline during the song import and preparation process.

This keeps the player independent from external services during playback.

## Current Limitations

- No backend or database for managing songs.
- Adding content requires modifying the project files and redeploying.
- No automated test suite is currently implemented.
- TypeScript build errors are not blocking builds because `ignoreBuildErrors` is enabled.
- Custom theme import through `window.prompt()` provides a limited UX.
- Local file loading depends on the expected file structure being provided by the user.
- Dynamic backgrounds are supported by the architecture but currently do not react to audio data.
- No CI/CD pipeline is currently configured.

## Visuals

<!-- IMAGE 01 — Main player -->

![LyricFlow main player](/images/projects/lyricflow/player.png)

_Main interface with a song playing, synchronized lyrics and active audio visualizer._

<!-- IMAGE 02 — Visualizer (bars) -->

![Audio visualizer in bars mode](/images/projects/lyricflow/visualizer-bars.png)

_Canvas and Web Audio API audio visualization in bars mode._

<!-- IMAGE 03 — Visualizer (wave) -->

![Audio visualizer in wave mode](/images/projects/lyricflow/visualizer-wave.png)

_Audio visualization in sinusoidal wave mode._

<!-- IMAGE 04 — Visualizer (mirror) -->

![Audio visualizer in mirror mode](/images/projects/lyricflow/visualizer-mirror.png)

_Audio visualization in bilateral mirror mode._

<!-- IMAGE 05 — Themes -->

![LyricFlow visual themes](/images/projects/lyricflow/themes.png)

_Visual theme selector panel with the 6 predefined options._
