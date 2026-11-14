/**
 * Pulls public repos from GitHub and writes src/data/archive.json
 * Repos already written up as case studies are excluded.
 *
 * Usage: npm run import:github
 */
import { writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

const USER = 'sanjumsanthosh';
const OUT = 'src/data/archive.json';

// Repos that have their own case study page (or are linked from one).
const FEATURED = new Set([
  'vislab',
  'SkillTerrain',
  'AgentBootCamp',
  'xr-pendulum-lab',
  'vision-inference-bench',
  'personal-vault-task-mcp',
  'google-workspace-skill',
  `${USER}.github.io`,
]);

// Repos that are noise rather than evidence.
const SKIP = new Set([
  'adrian-starter-bundle',
  'raja-shanmugha-assignments',
  'my-first-blog',
  'PIL-GIF',
  'images_labelled',
]);

const GROUPS = [
  { key: 'agents', re: /agent|mcp|llm|claude|codex|copilot|prompt|rag/i },
  { key: 'ml', re: /pytorch|tensorflow|vision|cnn|kaggle|dreambooth|nemo|rnn|autoencoder|neural|cancer|human-detection|cat-vs-dogs|notebook|opencv/i },
  { key: 'data', re: /data|sales|covid|analysis|sql|psql|sqlite|rabbit|event|stream/i },
  { key: 'web', re: /next|react|svelte|vite|web|html|css|ui|bookmark|anki|student|classifier|tab-opener|webgl/i },
];

function groupFor(repo) {
  const haystack = `${repo.name} ${repo.description ?? ''} ${(repo.topics ?? []).join(' ')}`;
  for (const g of GROUPS) if (g.re.test(haystack)) return g.key;
  return 'systems';
}

const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'sanjumsanthosh-portfolio-build',
};
if (process.env.GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
}

const res = await fetch(
  `https://api.github.com/users/${USER}/repos?per_page=100&sort=updated`,
  { headers }
);

if (!res.ok) {
  console.error(`GitHub API responded ${res.status}. Keeping existing archive.json.`);
  process.exit(0);
}

const repos = await res.json();

const archive = repos
  .filter((r) => !r.fork && !r.archived)
  .filter((r) => !FEATURED.has(r.name) && !SKIP.has(r.name))
  .map((r) => ({
    name: r.name,
    desc: r.description ?? null,
    lang: r.language ?? null,
    url: r.html_url,
    year: Number((r.pushed_at ?? r.created_at ?? '').slice(0, 4)) || null,
    group: groupFor(r),
  }))
  .sort((a, b) => (b.year ?? 0) - (a.year ?? 0) || a.name.localeCompare(b.name));

await mkdir(dirname(OUT), { recursive: true });
await writeFile(OUT, JSON.stringify(archive, null, 2) + '\n', 'utf8');

console.log(`Wrote ${archive.length} archive entries to ${OUT}`);
