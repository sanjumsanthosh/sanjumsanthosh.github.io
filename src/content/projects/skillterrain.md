---
title: "SkillTerrain"
summary: "A readiness-mapping tool that turns skills, projects and evidence into interactive heatmaps against a target role."
year: "2026"
status: shipped
themes: ["tooling", "ai"]
stack: ["Svelte", "TypeScript"]
evidence: ["repo", "demo"]
links:
  repo: "https://github.com/sanjumsanthosh/SkillTerrain"
  demo: "https://sanjumsanthosh.github.io/SkillTerrain/"
featured: true
order: 2
---

## Problem

Job descriptions and personal evidence live in different shapes. A posting asks
for "distributed systems, 5+ years, Kafka"; my actual proof is a migration, an
event pipeline and a debugging story. Comparing the two by hand produces the usual
result: a vague feeling of fit and no idea which gap matters.

## Approach

Treat readiness as a mapping problem with visible edges. Every target requirement
gets scored against evidence, the evidence points back at something real, and the
distance between them is drawn rather than described.

## What I built

- A **typed data model** for skills, projects, evidence and role requirements, so
  the same evidence can satisfy several requirements without being duplicated
- **Interactive heatmaps** that show strength, transferability and gap in one
  view instead of three lists
- **Gap prioritisation** — which missing thing unlocks the most requirements
- A static build deployed on GitHub Pages, so it runs without a backend

## Evidence

Live: [sanjumsanthosh.github.io/SkillTerrain](https://sanjumsanthosh.github.io/SkillTerrain/) ·
Source: [sanjumsanthosh/SkillTerrain](https://github.com/sanjumsanthosh/SkillTerrain)

## What I'd do next

Let a job posting be pasted in and parsed into requirements, and export the
resulting map as the matching section of a tailored résumé. The interesting
part is not the scoring — it is keeping the evidence honest as the map changes.
