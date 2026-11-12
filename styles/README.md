# Styles: pick one and ask your AI tool to apply it

The starter itself is deliberately plain: system fonts, grey surfaces, one blue accent. These four folders are
examples of where you could take it. Each has:

- `index.html`: a one-page mockup of the style. Open it straight in the browser (no build needed).
- `tokens.css`: the style's palette and type, plus the starter's own token names mapped onto them.

| Folder | Style |
|--------|-------|
| [vykort/](vykort/index.html) | Postcards: a travel scrapbook with tilted cards, tickets and a route timeline |
| [redaktionell/](redaktionell/index.html) | Magazine: masthead, cover story, ruled columns, a serif display face |
| [pipeline/](pipeline/index.html) | Developer-first and dark: a terminal hero, pipeline stages, a changelog |
| [gladje/](gladje/index.html) | Playful: big shapes, stickers, hard shadows, a speech-bubble contact |

The mockups are made-up copy with no photos and no logo. They are not part of the build.

## Workshop step

1. Open the four `index.html` files and pick one (or mix two).
2. Ask your AI tool, for example:

   > Apply the style in `styles/vykort/` to the starter. Put the values from `tokens.css` into the token block in
   > `index.html`, add its font link, and give the dark-mode block matching values. Then change the section
   > components so they look like `styles/vykort/index.html`. Follow AGENTS.md: tokens only in component CSS.

3. Run `npm run build`, `npm run check:links` and `npm run screens`, and look at the screenshots in light and dark.

Small text must stay readable: at least 4.5:1 contrast against its background in both modes.
