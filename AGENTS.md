# AGENTS.md

Rules for AI agents (and people) working in this repo. It is a page starter with a theme switcher: TypeScript,
esbuild and FAST Element (web components). Page copy is Swedish placeholder text. The page is a header (brand,
one menu link, a "Tema" select) and one "Exempel" block with each kit element; the select swaps the theme.

## Commands

| Command | What it does |
|---------|--------------|
| `npm install` | Install dependencies |
| `npm run dev` | Dev server with live reload on http://127.0.0.1:5080 (loopback only). Start it only when you need to look at the page. |
| `npm run build` | Clean, type-check, bundle into `dist/` |
| `npm run typecheck` | `tsc --noEmit` only |
| `npm run screens` | Screenshots of `dist/` into `screens/<theme>-<width>-<mode>.png`: every theme at 375 and 1280 px in each mode it supports, plus Tab focus on the select and the primary button (`<theme>-focus-<select\|button>-1280-light.png`) (build first) |
| `npm run check:links` | Playwright check on `dist/`: every menu link (read from the page, clicked once and again), the brand link and a direct `/#exempel` load reach their target, and every theme in the select changes the background, header and kit button and survives a reload (build first) |

Done means `npm run build` passes, and `npm run check:links` too when you touched navigation, `app-root`, a theme
or `src/themes/index.ts`.

## Layout

```
index.html            the default theme's tokens (CSS custom properties) + <app-root>
src/main.ts           imports every component file, which registers it
src/content.ts        all page copy, typed
src/themes/index.ts   the theme list and applyTheme(): inject the theme's CSS, set data-theme, remember it
src/themes/<name>.css one theme: tokens under :root[data-theme="<name>"], its font @import, its color-scheme
src/styles/           shared CSS, e.g. section-base.ts
src/components/<name>/index.ts      class: state and behaviour
src/components/<name>/template.ts   markup
src/components/<name>/styles.ts     CSS
styles/<name>/        mockup pages for the workshop's styles, for inspiration; not part of the build
```

`kit-section` is the reference component. Read all three of its files before writing a new one.

## Adding a theme

1. Copy a file in `src/themes/` (for example `vykort.css`) to `src/themes/<name>.css`. The name is lowercase
   letters only.
2. In the copy, change the selector to `:root[data-theme="<name>"]`, the font `@import` and `color-scheme`
   (`light` or `dark`). Set every colour token, `--header-bg` and `--header-text` included, so the theme looks
   the same whatever mode the system is in.
3. Add one line to `themes` in `src/themes/index.ts`: `{ name: '<name>', label: 'Visningsnamn' },`.
4. Check contrast (below), then `npm run build`, `npm run check:links` and `npm run screens` (add the theme to
   `SHOTS` in `screenshots.mjs` and to `THEMES` in `check-links.mjs`).

## Adding a section (do exactly this)

1. Copy the folder `src/components/kit-section/` to `src/components/<name>-section/`.
2. In `index.ts` change the `name` in `@customElement` to `<name>-section` (must contain a dash), the class
   name, and the data it reads.
3. Put the copy in `src/content.ts` as a typed export, like `kit`. Components never contain page text; they
   expose the content as a field (`kit = kit;`) and the template reads it (`${x => x.kit.title}`).
4. Import the new component in `src/main.ts` (`import './components/<name>-section';`). Without this
   line the tag is an unknown element and renders nothing.
5. Add `<<name>-section id="<name>"></<name>-section>` inside `<main>` in
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
8. **`<form @submit>` is unreliable in shadow DOM**: use `type="button"` plus `@click` (see the buttons in `kit-section`).
9. **State is `@observable` (or `@attr` for values set from HTML)**. Plain fields do not update the view.
10. **Hash links are resolved by `app-root`.** The sections live inside its shadow root, where the browser's #fragment lookup does not search, so `app-root/index.ts` scrolls to the id on `hashchange`, on load, and when a link to the current hash is clicked again. Put the `id` on the section's host element (`<kit-section id="exempel">`) in `app-root/template.ts`; never rely on native anchor scrolling. `npm run check:links` verifies it.
11. Components are shadow DOM. Global CSS does not reach in; tokens (custom properties) do.

## Styling rules

- **Never hard-code a colour, size, spacing, border width, radius, font, weight, line height or shadow in a
  component.** Use tokens from `index.html`: `var(--space-md)`, `var(--text-secondary)`, `var(--radius-lg)`,
  `var(--border-width)`, `var(--weight-semibold)`, `var(--font-heading)` and so on. A new value becomes a token
  in `index.html` first; a new colour also gets a dark value in the `prefers-color-scheme: dark` block and a
  value in every `src/themes/*.css`.
  The only raw values are `0`, `100%`, grid fractions (`1fr`) and media-query breakpoints (CSS cannot read a token there).
- Cards share one look: give the element `class="card"` and it gets padding, surface, border, radius and shadow from
  `src/styles/section-base.ts`. A section's own CSS adds only what is specific to it.
- The default theme (Timesheet's tokens and its Manrope font) is in `index.html` and follows the system's light or
  dark mode. Every other theme is one file in `src/themes/`; components never check which theme is active.
- The header uses `--header-bg` and `--header-text` only; every theme sets both.
- Accent text and button fills use `--accent-text` / `--accent-strong`, which keep at least 4.5:1
  contrast.
- Contrast: text at least 4.5:1 against its background, input borders at least 3:1, in every theme and mode.
  Check a new colour pair with a short node script (WCAG relative luminance) before using it.
- Compose shared CSS: `export const styles = [sectionBase, css`...`];`.
- Responsive: mobile works first (375 px). Use `auto-fit` grids and one `@media (max-width: 600px)` block per component.
- Light and dark must both work in the default theme. Check every theme with `npm run screens`.
- Every interactive element needs a visible `:focus-visible` style and must be reachable by keyboard. Use
  `box-shadow: var(--focus-ring)` (opaque, at least 3:1 against the page); in the header, an outline in
  `--header-text`.

## Do not

- Add a framework, a CSS library or a second UI pattern.
- Commit `node_modules/`, `dist/`, `.env` files or secrets.
- Put real people's data, customer data or private text in the repo. Use placeholders.
- Add a logo file or other brand assets that are not public.
