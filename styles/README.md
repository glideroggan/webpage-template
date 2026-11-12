# Styles: pick one and ask your AI tool to apply it

The starter itself is deliberately plain: system fonts, grey surfaces, one blue accent. These four folders are
examples of where you could take it. Each has:

- `index.html`: a one-page mockup of the style. Open it straight in the browser (no build needed).
- `tokens.css`: the style's colours and fonts, plus the starter's own token names mapped onto them.

The tokens give you the colours and fonts. The mockup's layout (tilted postcards, ruled columns, a terminal hero)
is optional: take as much of it as your team wants, or keep the starter's layout and only change the tokens.

| Folder | Style | Mode |
|--------|-------|------|
| [vykort/](vykort/index.html) | Postcards: a travel scrapbook with tilted cards, tickets and a route timeline | Light only |
| [redaktionell/](redaktionell/index.html) | Magazine: masthead, cover story, ruled columns, a serif display face | Light only |
| [pipeline/](pipeline/index.html) | Developer-first: a terminal hero, pipeline stages, a changelog | Dark only |
| [gladje/](gladje/index.html) | Playful: big shapes, stickers, hard shadows, a speech-bubble contact | Light only |

The starter supports both light and dark mode, so the other mode needs its own values (part of the step below).
The mockups are made-up copy with no photos and no logo. They are not part of the build.

## Workshop step

1. Open the four `index.html` files and pick one (or mix two).
2. Ask your AI tool, for example:

   > Apply the style in `styles/vykort/` to the starter. Put the values from `tokens.css` into the token block in
   > `index.html`, add its font link, and give the dark-mode block matching values. Keep the starter's menu and
   > sections. If you also change the layout to look like `styles/vykort/index.html`, follow AGENTS.md: tokens only
   > in component CSS.

3. Run `npm run build`, `npm run check:links` and `npm run screens`, and look at the four screenshots in the
   `screens/` folder (375 and 1280 px, light and dark).

Small text must stay readable: at least 4.5:1 contrast against its background in both modes, and input borders
at least 3:1.
