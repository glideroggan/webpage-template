# Styles: mockups for inspiration

Each of the four workshop styles is already a theme in the starter: pick it in the "Tema" select in the header.
Its colours and fonts live in `src/themes/<name>.css`. These folders hold a one-page mockup of each style
(`index.html`, open it straight in the browser, no build needed) that shows where the layout could go.

The mockup's layout (tilted postcards, ruled columns, a terminal hero) is optional: take as much of it as your
team wants, or keep the starter's layout and only use the theme.

| Folder | Style | Theme file | Mode |
|--------|-------|------------|------|
| [vykort/](vykort/index.html) | Postcards: a travel scrapbook with tilted cards, tickets and a route timeline | `src/themes/vykort.css` | Light only |
| [redaktionell/](redaktionell/index.html) | Magazine: masthead, cover story, ruled columns, a serif display face | `src/themes/redaktionell.css` | Light only |
| [pipeline/](pipeline/index.html) | Developer-first: a terminal hero, pipeline stages, a changelog | `src/themes/pipeline.css` | Dark only |
| [gladje/](gladje/index.html) | Playful: big shapes, stickers, hard shadows, a speech-bubble contact | `src/themes/gladje.css` | Light only |

The mockups are made-up copy with no photos and no logo. They are not part of the build.

## Workshop step

1. Open the four `index.html` files and switch between the themes in the starter. Pick one (or mix two).
2. Ask your AI tool, for example:

   > Make the starter look like `styles/vykort/index.html`. Keep the theme in `src/themes/vykort.css` and follow
   > AGENTS.md: tokens only in component CSS, new sections copied from `kit-section`.

   Or make your own theme: see "Lägg till ett eget tema" in the main README.
3. Run `npm run build`, `npm run check:links` and `npm run screens`, and look at the screenshots in the
   `screens/` folder.

Small text must stay readable: at least 4.5:1 contrast against its background, and input borders at least 3:1.
