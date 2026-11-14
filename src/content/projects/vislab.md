---
title: "vislab"
summary: "A browser playground for building interactive visual explanations — edit code, run it sandboxed, and probe the result."
year: "2026"
status: prototype
themes: ["learning-tools", "3d"]
stack: ["JavaScript", "q5.js", "Canvas", "Sandboxed iframes"]
evidence: ["repo", "writeup"]
links:
  repo: "https://github.com/sanjumsanthosh/vislab"
featured: true
order: 1
---

## Problem

Most of what I want to explain is spatial — a vector field, a pendulum, a camera
projection — and prose is a bad medium for it. The tools that could explain it
either require a full 3D pipeline before you can draw anything, or give you a
notebook where the output is a static image.

I wanted the shortest path from *"I have an idea about how this moves"* to *"someone
can drag it and see."*

## Approach

Build the loop, not the content. The playground had to make the edit → run →
inspect cycle fast enough that I'd actually use it while thinking, and safe enough
that arbitrary learner code couldn't take the page down.

## What I built

- An **in-browser editor** with a sandboxed iframe runtime, so a broken sketch
  fails in its own frame instead of the page
- **q5.js canvas preview** with live reload on edit
- **Tweakpane controls** bound to sketch parameters, so numbers become sliders
- **Console capture** surfaced inside the playground, because most learning
  happens when something breaks
- **Probe points** — click the canvas and read the value at that coordinate
- **Tutorial helpers** and node-system primitives that give a sketch structure
  without a framework
- Formula and colour helpers to keep the interesting part of a sketch short

## Evidence

The repository is the artifact: [sanjumsanthosh/vislab](https://github.com/sanjumsanthosh/vislab).

## What I'd do next

Persist sketches to a shareable URL, add a small gallery of finished
explanations, and replace the ad-hoc probe UI with a proper inspector panel.
The larger idea — generating these scenes from a description and keeping them
editable afterwards — is the research direction I keep circling back to.
