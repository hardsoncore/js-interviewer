---
applyTo: "src/assets/content/**/*.ts,src/assets/content/**/*.md"
description: "Use when adding or editing interview questions/answers or translations in the content catalogs"
---

# Content Authoring Instructions

## Goal

Keep interview content accurate, consistent, and correctly wired to the app data model.

## Required checks for question entries

When editing any questions.ts catalog:

- Preserve the existing question object schema and field names.
- Keep id values numeric and stable.
- Ensure answer points to an existing markdown file path.
- Keep tags as an array of strings and avoid accidental casing churn unless intentional.
- Keep category and level aligned with existing enum usage in that file.

Reference patterns:
- [src/assets/content/eng/questions.ts](src/assets/content/eng/questions.ts)
- [src/assets/content/rus/questions.ts](src/assets/content/rus/questions.ts)
- [src/assets/content/ukr/questions.ts](src/assets/content/ukr/questions.ts)

## Required checks for answer markdown files

- Keep file naming aligned with existing id-slug pattern used in each language folder.
- Match language folder and question catalog entry (eng/rus/ukr).
- Prefer clear, interview-ready explanations with practical examples when appropriate.

## HTML/Markdown Formatting Rules for Answers

The app relies on custom HTML elements instead of standard Markdown inside the `.md` answer files. When creating or modifying answers, **DO NOT use standard Markdown syntax** (like `###`, ` ``` `, or `**`). You MUST use these exact HTML tags:

- **Headings:** Use `<h3>` (main sections) and `<h4>` (sub-sections).
- **Paragraphs:** Wrap all standard text in `<p>...</p>`.
- **Code Blocks:** Wrap code snippets in `<code class="code">...</code>`.
- **Highlighting:** Use `<span class="accent">...</span>` or `<strong>...</strong>` for important terms.
- **Callouts:**
  - `<p class="info info--orange">...</p>` for warnings or critical notes.
  - `<p class="info info--blue">...</p>` for general tips or extra information.
- **Deep Dive:** Use `<p class="deep-dive">Углубленный конспект</p>` to mark the beginning of advanced/under-the-hood details.

## Cross-language consistency

- If you add or remove a question in one language, verify whether corresponding catalogs should be updated.
- Keep ids synchronized across language catalogs whenever equivalent questions exist.

## Validation

After content edits, run what is feasible:

- npm run lint
- npm test

If runtime validation is needed, use:

- npm run start

See [README.md](README.md) and [CONTRIBUTING.md](CONTRIBUTING.md) for project and contribution context.
