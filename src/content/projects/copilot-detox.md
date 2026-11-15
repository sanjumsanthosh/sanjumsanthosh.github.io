---
title: "Copilot Detox"
summary: "A single-file Bash CLI that hands you a Python drill, locks AI out of the editor while you solve it, then has Copilot grade the result."
year: "2026"
status: shipped
themes: ["learning-tools", "tooling"]
stack: ["Bash", "GitHub Copilot CLI", "gh"]
evidence: ["repo", "demo"]
links:
  repo: "https://github.com/sanjumsanthosh/Copilot-Detox"
  demo: "https://sanjumsanthosh.github.io/Copilot-Detox/"
featured: true
order: 7
---

## Problem

I noticed I was getting faster at shipping and slower at starting. Every blank function
became a prompt, and the part of me that turns a fuzzy problem into working code was
quietly going unused. "Use AI less" is advice, not a practice — so I built the practice.

## Approach

Split the loop so AI sets and grades the work but never touches the keyboard.

- **Generate** — `gh copilot suggest` writes a structured challenge: title, description,
  requirements, starter code.
- **Withhold** — the editor opens on starter code with no completion, no chat, no Copilot.
  The tool's only job during this phase is to stay out of the way.
- **Review** — on submit, the question and your solution go to Copilot with a strict-reviewer
  prompt that returns a score, edge cases, style notes and one concrete fix.

## What I built

- A **394-line Bash CLI**, one file, zero runtime dependencies beyond `gh`.
- **Per-attempt snapshots** — every submission keeps `attempt_N.py` plus its review, so attempt
  three sits next to attempt one.
- **Session state as plain files** under `~/.copilot-detox/`: `question.md`, `solution.py`,
  `meta.json`, reviews. No database, no daemon.
- **Score tracking** — `detox stats` reports sessions, completion and average score;
  `detox clean 30 --yes` prunes old ones.

## Evidence

The docs are the evidence here: a landing page that types out a real session, and a README that
documents the actual failure modes — GNU-only `grep -oP` / `sed -i` / `date -Iseconds`, so macOS
is not yet supported, and `detox clean --days 30` was broken in the original argument parser.

Source: [sanjumsanthosh/Copilot-Detox](https://github.com/sanjumsanthosh/Copilot-Detox) ·
[docs](https://sanjumsanthosh.github.io/Copilot-Detox/)

## What I'd do next

Port the shell to BSD userland so macOS works, and add a `--topic` flag so a week of practice can
be aimed at one weak area instead of randomised.
