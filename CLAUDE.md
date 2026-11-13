# CLAUDE.md

Read [AGENTS.md](AGENTS.md) first: it holds the commands, layout, the step-by-step recipes for adding a
section and a theme, and the FAST Element and styling rules. They apply to you in full.

Short version:

- Tokens only in component CSS (`var(--...)`). The default theme's tokens are in `index.html`; every other
  theme is one file `src/themes/<name>.css` plus one line in `src/themes/index.ts`.
- `src/components/kit-section/` is the reference component. Copy it for a new section, register it in
  `src/main.ts`, place it in `src/components/app-root/template.ts`, copy goes in `src/content.ts`.
- `/*html*/` before every `html` template; every template event handler returns `true`.
- Run `npm run build` before you say you are done, and `npm run check:links` when you touched `app-root` or a
  theme. Do not start the dev server unless you need to see the page.
