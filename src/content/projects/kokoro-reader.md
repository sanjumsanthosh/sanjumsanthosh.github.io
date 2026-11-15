---
title: "Kokoro Reader"
summary: "An offline macOS reader that narrates long Markdown with Kokoro-82M, keeps every clip on disk, and never sends a document anywhere."
year: "2026"
status: shipped
themes: ["tooling", "ai"]
stack: ["Rust", "Tauri 2", "TypeScript", "Kokoro-82M"]
evidence: ["repo", "demo"]
links:
  repo: "https://github.com/sanjumsanthosh/kokoro-reader"
  demo: "https://sanjumsanthosh.github.io/kokoro-reader/"
featured: true
order: 8
---

## Problem

Agent output is long, and I was skimming instead of reading. Text-to-speech services solved the
reading problem and created a data problem: design docs, internal notes and unfinished drafts all
got shipped to someone else's API. I wanted the convenience without the upload.

## Approach

Run the model locally, and treat a document as sections that can each be narrated once and cached.

- **Kokoro-82M in Rust** — inference in the app process through `kokoro-en`, 24 kHz fp32, one
  download and then no network.
- **Two layers per document** — `source.md` for what you read, `narration.txt` for what is spoken,
  aligned by section so clicking a paragraph plays that paragraph.
- **Cache as a first-class object** — each section's WAV is synthesised once; the queue shows
  cached, queued, caching and failed, grouped per article with a retry that only redoes what broke.

## What I built

- A **Tauri app** where the webview owns interaction and **Rust owns the facts**: project metadata,
  file deletion, real disk accounting, inference.
- **Playback that matches the text** — three voices, 0.5–2.0× speed, per-section restart, jump to
  marker, 5-second seek, plus highlight-follows-audio.
- **Storage that tells the truth** — models, audio cache, project files and app data measured
  physically, with shared WAV files counted once rather than per article.
- **Guard rails as constants**: 2 MB document cap, 510 tokens per sentence, 2 GB cache ceiling.

## Evidence

43 Rust tests and 24 frontend tests pass, and the packaged macOS build was exercised end to end.
The interesting design work was making the numbers honest: an earlier version reported cache size
per article, which double-counted shared clips.

Source: [sanjumsanthosh/kokoro-reader](https://github.com/sanjumsanthosh/kokoro-reader) ·
[project page](https://sanjumsanthosh.github.io/kokoro-reader/)

## What I'd do next

Windows and Linux builds, EPUB import, and pronunciation overrides so identifiers like `kubectl`
and `OAuth` are spoken the way a person would say them.
