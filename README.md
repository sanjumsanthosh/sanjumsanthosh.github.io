# sanjumsanthosh.github.io

Personal site — editorial/technical portfolio for backend, retrieval and applied-AI work.
Static Astro build, deployed to GitHub Pages from `main`.

## Local development

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # static output in dist/
npm run preview      # serve dist/ locally
```

## Structure

```
src/
  components/       Nav, Footer, ProjectCard, EvidenceStrip
  content/projects/ one Markdown file per case study
  data/archive.json generated — do not hand-edit
  layouts/Base.astro
  pages/            index, work/index, work/[slug], about
  styles/global.css design tokens + all styling
scripts/import-github.mjs   pulls public repos into archive.json
public/                     resume.pdf, favicon.svg, static assets
```

## Adding a project

1. Create `src/content/projects/<slug>.md`
2. Frontmatter:

```yaml
title: "Project name"
summary: "One sentence for the card."
year: "2026"
status: prototype        # shipped | prototype | internal
themes: ["agents"]       # agents | ai | ml | xr | 3d | tooling | learning-tools
stack: ["TypeScript"]
evidence: ["repo", "demo"]
links:
  repo: "https://github.com/..."
  demo: "https://..."
featured: true
order: 7
```

3. Body sections: `## Problem`, `## Approach`, `## What I built`, `## Evidence`, `## What I'd do next`

`order` controls the sequence everywhere. `featured: true` puts it on the home page.

## Screenshots

Drop an image in `public/covers/<slug>.png` and add `cover: "/covers/<slug>.png"` to the
frontmatter. Without a cover the card renders a hatched plate with the project's initial,
index and year — intentional, not a broken state.

## Archive

`npm run import:github` fetches all public repos and writes `src/data/archive.json`,
grouping them into agents / ml / data / web / systems. Repos listed in `FEATURED` at the top of
`scripts/import-github.mjs` are excluded because they already have a case study.

The deploy workflow runs this automatically, so the archive stays current without manual edits.

## Deploying

Push to `main`. `.github/workflows/deploy.yml` builds and publishes.

One-time setup on GitHub:
1. Repository → **Settings → Pages**
2. **Source: GitHub Actions**
3. Push, then watch the Actions run

## Content rules

- **Never publish internal Oracle detail.** No system names, ticket IDs, infra identifiers or
  credentials. The `agent-tooling` entry is written at architecture level on purpose.
- **No invention-disclosure content** — clearance is not established.
- Metrics are reported as *your own* production figures, not audited benchmarks.
- Where something is unverified, say so. `vision-inference-bench` states plainly that accuracy
  was not measured; that honesty is the point of the page.

## Accessibility & performance

Skip link, semantic landmarks, visible focus rings, `prefers-reduced-motion` respected,
no client JS except the work-page filter, fonts with `display=swap` and system fallbacks.
