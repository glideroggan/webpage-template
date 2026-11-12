import { css } from '@microsoft/fast-element';
import { sectionBase } from '../../styles/section-base';

// Only tokens (var(--...)) here: no raw colours, sizes, borders, weights or fonts. The tokens
// are defined in index.html and reach into the shadow DOM because custom properties inherit.
// The only raw values are 100% and media-query breakpoints, which CSS cannot read from a token.
export const styles = [
  sectionBase,
  css`
    .grid {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      gap: var(--space-lg);
      grid-template-columns: repeat(auto-fit, minmax(var(--card-min), 1fr));
    }

    .card {
      width: 100%;
      height: 100%;
      text-align: left;
      font: inherit;
      color: inherit;
      cursor: pointer;
      padding: var(--space-lg);
      background: var(--bg-surface);
      border: var(--border-width) solid var(--border-base);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);
      transition: box-shadow var(--transition-fast), border-color var(--transition-fast);
    }

    .card:hover {
      box-shadow: var(--shadow-md);
      border-color: var(--border-strong);
    }

    .card:focus-visible {
      outline: none;
      box-shadow: var(--focus-ring);
    }

    .card.selected {
      border-color: var(--accent-primary);
      box-shadow: var(--shadow-md);
    }

    .number {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--badge-size);
      height: var(--badge-size);
      margin-bottom: var(--space-md);
      border-radius: var(--radius-full);
      background: var(--accent-strong);
      color: var(--accent-on-strong);
      font-family: var(--font-heading);
      font-weight: var(--weight-semibold);
    }

    h3 {
      margin: 0 0 var(--space-xs);
      font-family: var(--font-heading);
      font-size: var(--text-xl);
    }

    p {
      margin: 0;
      color: var(--text-secondary);
    }

    .empty {
      color: var(--text-muted);
    }
  `,
];
