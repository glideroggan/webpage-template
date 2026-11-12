# AGENTS.md

Rules for AI agents (and people) working in this repo. It is a landing-page starter: TypeScript, esbuild and
FAST Element (web components). Page copy is Swedish placeholder text.

## Commands

| Command | What it does |
|---------|--------------|
| `npm install` | Install dependencies |
| `npm run dev` | Dev server with live reload on http://127.0.0.1:5080 (loopback only). Start it only when you need to look at the page. |
| `npm run build` | Clean, type-check, bundle into `dist/` |
| `npm run typecheck` | `tsc --noEmit` only |
| `npm run screens` | Screenshots of `dist/` into `screens/` (build first) |
| `npm run check:links` | Playwright check on `dist/`: every menu link (read from the page, clicked once and again), hero buttons, the brand link and a direct `/#contact` load scroll to their section (build first) |

Done means `npm run build` passes, and `npm run check:links` too when you touched navigation or `app-root`.

## Layout

```
index.html            tokens (CSS custom properties) + <app-root>
src/main.ts           imports every component file, which registers it
src/content.ts        all page copy, typed
src/styles/           shared CSS, e.g. section-base.ts
src/components/<name>/index.ts      class: state and behaviour
src/components/<name>/template.ts   markup
src/components/<name>/styles.ts     CSS
styles/<name>/        example styles for the workshop (mockup + tokens.css); not part of the build
```

`services-section` is the reference component. Read all three of its files before writing a new one.

## Adding a section (do exactly this)

1. Copy the folder `src/components/services-section/` to `src/components/<name>-section/`.
2. In `index.ts` change the `name` in `@customElement` to `<name>-section` (must contain a dash), the class
   name, and the data it reads.
3. Put the copy in `src/content.ts` as a typed export (the list data, and the heading in the `titles` object).
   Components never contain page text; they expose the content as a field (`titles = titles;`) and the
   template reads it (`${x => x.titles.team}`).
4. Import the new component in `src/main.ts` (`import './components/<name>-section';`). Without this
   line the tag is an unknown element and renders nothing.
5. Add `<<name>-section id="<name>"></<name>-section>` to the list in
   `src/components/app-root/template.ts`, and a link to `navLinks` in `content.ts` if it should be in the menu.
6. Run `npm run build`. Fix every error; do not silence the compiler.

## FAST Element rules

1. **Folder per component**: `index.ts` + `template.ts` + `styles.ts`. `index.ts` imports the other two.
2. **`/*html*/` before every `html` tagged template**, including nested `when(...)`, `repeat(...)` and helper
   constants: `html<MyComponent>/*html*/`...``. The editor then highlights and formats the markup.
3. **Conditionals use `when()`**, not ternaries that return markup.
4. **Lists use `repeat()`**. Inside it the callback is `(item, context)`: the component is `context.parent`,
   the position is `context.index` (pass `{ positioning: true }` to use it).
5. **Change an array by assigning a new one** (`this.items = [...]`). `push` and `splice` do not notify FAST.
6. **Every event handler in a template must return `true`** unless it deliberately blocks the default
   behaviour. FAST calls `preventDefault()` on any other return value, `undefined` included, which breaks
   links, checkboxes and typing. A handler that deliberately blocks the default may return `false`, with a comment saying why.
7. **Form inputs that are cleared from code use property bindings** (`:value="${x => x.name}"`), not the
   `value=` attribute, which is only read once.
8. **`<form @submit>` is unreliable in shadow DOM**: use `type="button"` plus `@click` (see `contact-section`).
9. **State is `@observable` (or `@attr` for values set from HTML)**. Plain fields do not update the view.
10. **Hash links are resolved by `app-root`.** The sections live inside its shadow root, where the browser's #fragment lookup does not search, so `app-root/index.ts` scrolls to the id on `hashchange`, on load, and when a link to the current hash is clicked again. Put the `id` on the section's host element (`<services-section id="services">`) in `app-root/template.ts`; never rely on native anchor scrolling. `npm run check:links` verifies it.
11. Components are shadow DOM. Global CSS does not reach in; tokens (custom properties) do.

## Styling rules

- **Never hard-code a colour, size, spacing, border width, radius, font, weight, line height or shadow in a
  component.** Use tokens from `index.html`: `var(--space-md)`, `var(--text-secondary)`, `var(--radius-lg)`,
  `var(--border-width)`, `var(--weight-semibold)`, `var(--font-heading)` and so on. A new value becomes a token
  in `index.html` first; a new colour also gets a dark value in the `prefers-color-scheme: dark` block.
  The only raw values are `100%`, grid fractions (`1fr`) and media-query breakpoints (CSS cannot read a token there).
- The base look is neutral on purpose (system fonts, grey surfaces, a blue accent). Applying a style starts with
  the token values in `index.html`; component changes it needs still use tokens only. See `styles/README.md`.
- `--accent-primary` is only for borders, rings and large shapes. Small text and button fills use
  `--accent-text` / `--accent-strong`, which keep at least 4.5:1 contrast.
- Compose shared CSS: `export const styles = [sectionBase, css`...`];`.
- Responsive: mobile works first (375 px). Use `auto-fit` grids and one `@media (max-width: 600px)` block per component.
- Light and dark must both work. Check both with `npm run screens`.
- Every interactive element needs a visible `:focus-visible` style and must be reachable by keyboard.

## Do not

- Add a framework, a CSS library or a second UI pattern.
- Commit `node_modules/`, `dist/`, `.env` files or secrets.
- Put real people's data, customer data or private text in the repo. Use placeholders.
- Add a logo file or other brand assets that are not public.
