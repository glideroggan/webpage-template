# CLAUDE.md

Read [AGENTS.md](AGENTS.md) first: it holds the commands, layout, the step-by-step recipe for adding a
section, and the FAST Element and styling rules. They apply to you in full.

Short version:

- Tokens only in component CSS (`var(--...)`), defined in `index.html`.
- Copy `src/components/services-section/` for a new section, register it in `src/main.ts`, place it in
  `src/components/app-root/template.ts`, copy goes in `src/content.ts`.
- `/*html*/` before every `html` template; every template event handler returns `true`.
- Run `npm run build` before you say you are done. Do not start the dev server unless you need to see the page.
