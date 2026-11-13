import { css } from '@microsoft/fast-element';

// Shared by every page section so spacing, width, headings and cards stay identical. A component
// composes it with `styles: [sectionBase, css`...`]`.
export const sectionBase = css`
  :host {
    display: block;
    padding: var(--space-2xl) var(--space-lg);
    scroll-margin-top: var(--header-offset);
  }

  .container {
    max-width: var(--content-width);
    margin: 0 auto;
  }

  /* The one card look. A section adds only what is its own. */
  .card {
    /* The page's global box-sizing rule does not reach into shadow DOM. */
    box-sizing: border-box;
    padding: var(--space-lg);
    background: var(--bg-surface);
    border: var(--border-width) solid var(--border-base);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
  }

  h2 {
    margin: 0 0 var(--space-md);
    font-family: var(--font-heading);
    font-size: var(--text-2xl);
    line-height: var(--leading-snug);
    color: var(--text-primary);
  }

  @media (max-width: 600px) {
    :host {
      padding: var(--space-xl) var(--space-md);
    }
  }
`;
