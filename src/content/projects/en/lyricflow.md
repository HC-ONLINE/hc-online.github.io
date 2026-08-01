---
title: "LyricFlow"
description: "Web music player with synchronized real-time lyrics and audio spectrum visualizer"
subtitle: "Web music player with synchronized real-time lyrics"
stack: "Next.js 16, React 19, Tailwind CSS 4, shadcn/ui, Web Audio API"
site: "https://lyric-flow-lime.vercel.app"
---

## The Problem It Solves

* Need for a web music player with synchronized real-time lyrics.
* Support for multiple lyric tracks (original, translation, etc.).
* Audio spectrum visualization with multiple modes and themes.

## Key Features

* Real-time synchronized lyrics display with binary search optimization.
* Multiple lyric tracks (original, translation, etc.) via `track_order`.
* Per-line styling (color, typography, shadows, gradients, transitions).
* Audio spectrum visualizer with 3 modes (bars, wave, mirror).
* 6 predefined visual themes + custom theme import via JSON.
* Per-song backgrounds (solid color, dynamic mode, image, or video).
* Playlist panel with search and navigation.
* Local file upload support (audio + JSON) directly from browser.
* Song import pipeline with LRCLIB integration.
* Automatic lyrics fetching and song.json generation.

## Technical Decision

* Separate playback logic from UI to facilitate testing and maintenance.
* Use Web Audio API for real-time audio spectrum visualization.
* Prioritize user experience with precise lyrics synchronization.
