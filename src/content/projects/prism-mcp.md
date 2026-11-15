---
title: "PRISM — agent memory for a job search"
summary: "An MCP server that gives an assistant a durable, structured memory of a career — plus read-only share tokens so a recruiter can see the public half."
year: "2026"
status: internal
themes: ["agents", "tooling"]
stack: ["Cloudflare Workers", "MCP", "Durable Objects", "KV"]
evidence: ["repo", "design"]
featured: true
order: 9
---

## Problem

Career research is a pile of half-facts: a professor who replied in March, a company you
shortlisted, a note that only makes sense next to the posting it came from. Chat history loses all
of it, so the same questions get re-asked and the same context gets rebuilt badly.

## Approach

Make the state addressable — one structured store, two audiences, and a hard split between them.

- **Admin surface** (`/mcp`) — 37 tools over universities, professors, companies, interests, job
  offers, projects, experience, education, skills, certifications and notes.
- **Guest surface** (`/guest/mcp`) — 8 read-only tools behind a short-lived `prism_…` share token,
  served by a separate Durable Object class where the write tools **do not exist**.
- **Routing by credential type, not path** — an admin key is rejected on the guest surface and a
  token is rejected on the admin one.

## What I built

- **36 + 1 tools** on the admin side, with notes as first-class objects that can be queried
  across the whole store by tag.
- **Share tokens with a real lifecycle** — `pending` → `active` → `expired` / `exhausted` /
  `revoked`, where the clock starts on first use, a never-opened token dies after 7 days, and only
  the **SHA-256 hash** is stored in KV.
- **An allowlisted projection** (`toPublicProfile`) so dislikes, notes, communication styles and GPA
  cannot leak into a recruiter's view even by accident.
- **Delta scoring** — `update_score(+2, reason)` accumulates prioritisation instead of overwriting it.

## Evidence

Private by design: it holds personal data and internal procedures, so there is no demo link and no
public site — the design decisions are the artefact. The interesting constraint was making
"read-only" structural rather than a permission check: the guest agent class simply has no writer.

## What I'd do next

Per-entity scoping (`share this project, not the profile`), and an audit trail per token so a
recruiter's access can be reviewed rather than just revoked.
