---
title: "AgentBootCamp"
summary: "A dashboard and evaluation suite for adversarial agent QA — attack scenarios, simulated users, hallucination and ambiguity checks."
year: "2025–2026"
status: shipped
themes: ["agents", "ai"]
stack: ["Next.js", "TypeScript", "Supabase"]
evidence: ["repo", "demo", "award"]
links:
  repo: "https://github.com/sanjumsanthosh/AgentBootCamp"
  demo: "https://agent-boot-camp.vercel.app"
featured: true
order: 5
---

## Problem

Agent demos pass. Products fail. The gap is usually unmeasured: nobody wrote down
what "working" means, so nobody notices when a change makes it worse. Teams ship
an assistant, test the happy path by hand, and call it done.

## Approach

Make failure a first-class dataset. Define attack categories, generate adversarial
QA pairs, run them, and store the results so they can be compared across versions
instead of re-litigated in a thread.

## What I built

- A **Next.js/TypeScript dashboard** for structured agent-QA submissions and results
- **Attack-scenario categories** — adversarial security, simulated users,
  hallucination probing, ambiguity handling, API-failure resilience
- **Filtering and inspection** by team, category, feasibility and impact
- **QA-pair detail views** and exportable reports
- Supabase persistence so results survive the demo

I contributed the testing concepts behind the project as well as the dashboard —
the module framing (what to attack, not just that it failed) is what made the
results comparable.

## Evidence

Live: [agent-boot-camp.vercel.app](https://agent-boot-camp.vercel.app) ·
Source: [sanjumsanthosh/AgentBootCamp](https://github.com/sanjumsanthosh/AgentBootCamp)

The project was selected and awarded in the **AI Champions CX 2025 hackathon** at
Oracle.

## What I'd do next

Turn the stored results into a regression gate: a small fixed suite that must pass
before an agent change ships, with per-category thresholds rather than one pass
rate. Evaluation only matters when it blocks something.
