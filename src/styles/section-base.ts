import { css } from '@microsoft/fast-element';

// Shared by every page section so spacing, width and headings stay identical. A component
// composes it with `styles: [sectionBase, css`...`]`.
export const sectionBase = css`
  :host {
    display: block;
    padding: var(--space-3xl) var(--space-lg);
    scroll-margin-top: 4rem;
  }

  .container {
    max-width: var(--content-width);
    margin: 0 auto;
  }

  h2 {
    margin: 0 0 var(--space-lg);
    font-family: var(--font-heading);
    font-size: var(--text-2xl);
    line-height: 1.2;
    color: var(--text-primary);
  }

  @media (max-width: 600px) {
    :host {
      padding: var(--space-2xl) var(--space-md);
    }
  }
`;
