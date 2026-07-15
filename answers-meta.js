// Generates answers-meta.json: a map of answer file path -> last git commit date
// (YYYY-MM-DD). Runs at build time alongside git-version.js; CI checks out full
// history (fetch-depth: 0), so the dates survive deployment. Files without git
// history (uncommitted / shallow clone) get an empty string and are hidden by the app.

const { execFileSync } = require('child_process');
const { writeFileSync, readdirSync, existsSync } = require('fs');
const { join, sep } = require('path');

const CONTENT_ROOT = join('src', 'assets', 'content');
const LANGS = ['eng', 'rus', 'ukr'];

const meta = {};

for (const lang of LANGS) {
  const answersDir = join(CONTENT_ROOT, lang, 'answers');
  if (!existsSync(answersDir)) continue;

  for (const file of readdirSync(answersDir)) {
    if (!file.endsWith('.md')) continue;

    const diskPath = join(answersDir, file);
    let date = '';
    try {
      date = execFileSync('git', ['log', '-1', '--format=%cs', '--', diskPath], {
        encoding: 'utf8'
      }).trim();
    } catch {
      date = '';
    }

    // key must match the `answer` field in questions.ts: forward slashes, no `src/` prefix
    const key = diskPath.split(sep).join('/').replace(/^src\//, '');
    meta[key] = date;
  }
}

writeFileSync('answers-meta.json', JSON.stringify(meta, null, 2));
