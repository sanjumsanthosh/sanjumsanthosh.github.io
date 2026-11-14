---
title: "XR Pendulum Lab"
summary: "One physics implementation in C++17, running natively and in the browser via WebAssembly, rendered with Three.js and driven by WebXR controllers."
year: "2026"
status: prototype
themes: ["xr", "3d"]
stack: ["C++17", "Emscripten", "WebAssembly", "Three.js", "WebXR"]
evidence: ["repo"]
links:
  repo: "https://github.com/sanjumsanthosh/xr-pendulum-lab"
featured: true
order: 4
---

## Problem

Physics simulations are the classic case where the interesting part — the model —
gets stranded in one runtime. Write it in C++ and you get a desktop binary; write
it in JavaScript and you get a browser toy; write it twice and the two versions
drift until neither is trustworthy.

I wanted a pendulum whose behaviour is identical on the command line and in a
headset, so the simulation could be tested without a renderer.

## Approach

Keep the physics as the single source of truth, and treat every runtime as a thin
shell over it. No reimplementation, no "close enough" port.

## What I built

- A **shared C++17 physics core** consuming the same parameters in both runtimes
- A **native CLI** harness for headless runs and quick numerical checks
- **Emscripten/WebAssembly** bindings so the browser runs the identical code
- **Three.js** rendering with editable physical parameters exposed in the UI
- **Drag/release interaction** — grab the bob, pull it out of equilibrium, let go
- **WebXR session and controller** integration for a spatial view of the same scene

## Evidence

Source: [sanjumsanthosh/xr-pendulum-lab](https://github.com/sanjumsanthosh/xr-pendulum-lab).
Native and WebAssembly physics were validated against each other, and desktop
browser controls were tested. WebXR session handling is implemented; headset
interaction testing is still outstanding — I would not call the XR path finished.

## What I'd do next

Headset testing, then extend from a single pendulum to a coupled system where the
learner can change parameters and watch the phase relationship change. That is
where a spatial view earns its keep over a graph.
