# AGENTS

## Project focus

This repository is primarily a content-driven interview preparation app. Prioritize high-quality question and answer updates over framework-level refactors.

- Main stack: Angular 13 + Ionic 6 + Capacitor 3
- Primary contribution area: interview content in src/assets/content
- Keep framework/build-tool migrations out of scope unless explicitly requested

See project overview in [README.md](README.md) and contribution scope in [CONTRIBUTING.md](CONTRIBUTING.md).

## Quick start commands

Run from repository root:

- Install dependencies: npm install
- Start dev server: npm run start
- Lint: npm run lint
- Unit tests: npm test
- E2E tests: npm run e2e
- Build web app: npm run build
- Build Android APK: npm run build-apk

## Where to work

- App code: [src/app](src/app)
- Question catalogs: [src/assets/content/eng/questions.ts](src/assets/content/eng/questions.ts), [src/assets/content/rus/questions.ts](src/assets/content/rus/questions.ts), [src/assets/content/ukr/questions.ts](src/assets/content/ukr/questions.ts)
- Answer markdown files: [src/assets/content](src/assets/content) under each language folder
- Question loading logic: [src/app/services/questions.service.ts](src/app/services/questions.service.ts)

## Content update rules

- Keep each question object shape consistent with existing entries in questions.ts.
- Ensure the answer field points to an existing markdown file in the matching language folder.
- Preserve category and level enum usage patterns already present in questions.ts.
- Prefer additive changes and typo/accuracy fixes over broad rewrites.
- If adding a new question id in one language catalog, keep ids aligned across language catalogs when translations are available.

## Style and lint expectations

- Respect Angular ESLint rules in [.eslintrc.json](.eslintrc.json).
- Keep line length and ordering conventions aligned with [tslint.json](tslint.json).
- Avoid introducing noisy console logging.

## PR and commit guidance

Follow conventional commit prefixes documented in [CONTRIBUTING.md](CONTRIBUTING.md):

- feat: new questions/features
- fix: content or correctness fixes
- docs: documentation/translations
- chore: maintenance

## Agent behavior

- Make minimal, targeted edits.
- Do not modify generated build output in [www](www) unless explicitly asked.
- Do not upgrade Angular/Ionic/Capacitor versions unless explicitly asked.
- After code changes, run relevant validation commands for touched areas when feasible.
