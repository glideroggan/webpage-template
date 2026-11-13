import { css } from '@microsoft/fast-element';

// The header reads --header-bg and --header-text, which every theme sets, so each theme decides its bar.
// The brand, the link and the select all use --header-text on --header-bg: one pair to keep at 4.5:1.
export const styles = css`
  :host {
    display: block;
  }

  .header {
    position: sticky;
    top: 0;
    z-index: var(--z-header);
    background: var(--header-bg);
    color: var(--header-text);
    /*
     * A hairline, so a bar close to the page colour still reads as a bar. Drawn as an inset shadow, so a
     * theme with a thicker --border-width does not make its header taller.
     */
    box-shadow: inset 0 calc(-1 * var(--border-width)) 0 var(--border-base);
  }

  .bar {
    max-width: var(--content-width);
    margin: 0 auto;
    padding: var(--space-sm) var(--space-lg);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-xs) var(--space-lg);
    /* One line height for the whole bar, so its height does not depend on the theme's body leading. */
    line-height: var(--leading-snug);
  }

  .brand {
    margin-right: auto;
    font-family: var(--font-brand);
    font-size: var(--brand-size);
    /* A theme may give the brand a bigger size; line-height 1 keeps the bar from growing with it. */
    line-height: 1;
    font-weight: var(--weight-bold);
    color: var(--header-text);
    text-decoration: none;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs) var(--space-lg);
  }

  nav a {
    display: inline-block;
    padding-block: var(--space-2xs);
    color: var(--header-text);
    text-decoration: none;
    font-weight: var(--weight-semibold);
  }

  nav a:hover {
    text-decoration: underline;
  }

  .theme {
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    font-size: var(--text-sm);
    font-weight: var(--weight-semibold);
  }

  select {
    /* A fixed height with the border inside, so a theme's thicker border does not grow the bar. */
    box-sizing: border-box;
    height: var(--space-xl);
    font: inherit;
    padding: var(--space-2xs) var(--space-xs);
    color: var(--header-text);
    background: var(--header-bg);
    border: var(--border-width) solid var(--header-text);
    border-radius: var(--radius-md);
    cursor: pointer;
  }

  /* The open list is drawn by the browser on a page-coloured surface, so it uses the page's text colours. */
  option {
    color: var(--text-primary);
    background: var(--bg-surface);
  }

  /* The focus ring is drawn in the header text colour, which is the colour that contrasts with the bar. */
  a:focus-visible,
  select:focus-visible {
    outline: var(--border-width-strong) solid var(--header-text);
    outline-offset: var(--border-width-strong);
  }

  a:focus-visible {
    border-radius: var(--radius-sm);
  }

  @media (max-width: 600px) {
    .bar {
      padding: var(--space-xs) var(--space-md);
    }

    /* Big enough to hit with a thumb. */
    nav a {
      display: inline-flex;
      align-items: center;
      min-height: var(--touch-target);
    }

    select {
      min-height: var(--touch-target);
    }

    /* The select wraps to a second row; right-aligned, it lines up with the menu link above it. */
    .theme {
      margin-left: auto;
    }
  }
`;
