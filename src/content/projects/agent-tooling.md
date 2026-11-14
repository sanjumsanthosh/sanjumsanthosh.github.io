---
title: "Agent tooling — MCP servers and permissioned tool use"
summary: "A set of MCP servers and a sanitized look at the internal agent harness I built: scoped tools, guardrails, audit transcripts and human handoff."
year: "2026"
status: internal
themes: ["agents"]
stack: ["TypeScript", "Python", "MCP", "OAuth 2.0 + PKCE", "Cloudflare Workers/KV"]
evidence: ["repo", "writeup"]
links:
  repo: "https://github.com/sanjumsanthosh/personal-vault-task-mcp"
featured: true
order: 3
sanitized: true
---

## Problem

An LLM with shell access is not a colleague. The useful version of agentic
software engineering is narrower and harder: give the agent the specific
operations a task needs, keep it inside the caller's existing permissions, make
every action auditable after the fact, and hand back to a human at the point
where judgement is required.

Most of my work on this is internal, so this page describes the architecture
rather than the system.

## Approach

Four constraints shaped everything: **scope**, **permissions**, **evidence**, and
**failure handling**. Tools are granted per workspace, not globally. Authorization
is revalidated per call rather than trusted from a session that started an hour
ago. Every run emits a transcript. And the failure paths — stalled runs,
half-finished edits, duplicate work — are treated as the actual product.

## What I built

- A **ticket-native harness** where an incoming ticket routes into a developer or
  QA flow, each in an isolated multi-repository workspace with build context
  staged automatically
- **Workspace-scoped MCP tools** for ticket, git and pull-request operations, with
  controlled secret placement so credentials never enter the model's context
- **Permissioned remote MCP** over Streamable HTTP with OAuth 2.0 authorization-code
  flow and S256 PKCE, browser consent, scoped opaque bearer access, and session
  revalidation on every tool call
- **Guardrails and review gates** — validation, explicit human handoff, and live
  structured transcripts that an operator can watch and audit
- **Public MCP servers** as the open, reproducible part of the same toolkit:
  [personal-vault-task-mcp](https://github.com/sanjumsanthosh/personal-vault-task-mcp)
  (Obsidian task operations with dry-run safety) and
  [PRISM](https://github.com/sanjumsanthosh) (a typed knowledge graph served over MCP)

## Evidence

Public repositories: personal-vault-task-mcp, google-workspace-skill, PRISM.
The internal harness is described here at architecture level; details are available
on request where confidentiality allows.

## What I'd do next

Better evaluation of agent output quality — not "did it finish", but "was the
change correct and would a reviewer have accepted it". That is the part of this
space that is still mostly unmeasured.
