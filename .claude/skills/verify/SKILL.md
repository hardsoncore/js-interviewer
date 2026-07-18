---
name: verify
description: How to build, launch and drive js-interviewer to verify a change end-to-end
---

# Verifying js-interviewer changes

## Launch

`npm start` runs `git-version.js` + `answers-meta.js` then `ng serve` on port 4200.
The user often already has it running — check first (`lsof -nP -iTCP:4200 -sTCP:LISTEN`);
if it serves "JS-interviewer App", reuse it (hot reload picks up changes). Otherwise
start it in the background and wait for "Compiled successfully" (~60s cold).

## Drive

Use the chrome-devtools MCP tools. Router uses hash location, so deep-link URLs look like:

- `http://localhost:4200/#/tabs/quiz` (+ `/answer-structure`)
- `http://localhost:4200/#/tabs/questions` (+ `/question-info?questionId=N`)
- `http://localhost:4200/#/tabs/profile` (+ `/how-to-learn`)

Deep-link reloads work (hash routing). Ionic keeps the leaving page in the DOM during
back-transitions — a snapshot taken right after a click may show both pages; screenshot
or re-snapshot after the animation to see the final state.

## Gotchas

- Dark theme = `dark` class on `<body>` (ThemeService). For a quick visual check,
  toggle it via `evaluate_script` and remove it afterwards — it isn't persisted.
- Console always shows one pre-existing warning about the deprecated
  `apple-mobile-web-app-capable` meta tag — ignore it.
- `npm run lint` has 2 pre-existing a11y errors in quiz.page.html (click-events-have-key-events).
