import { css } from '@microsoft/fast-element';
import { sectionBase } from '../../styles/section-base';

// Only tokens (var(--...)) here: no raw colours, sizes, borders, weights or fonts. The tokens
// are defined in index.html and reach into the shadow DOM because custom properties inherit.
// The only raw values are 0, 100%, grid fractions (1fr) and media-query breakpoints, which CSS
// cannot read from a token. The card look itself (.card) comes from sectionBase.
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
      height: 100%;
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

    .details {
      margin-top: var(--space-sm);
    }

    .more {
      margin-top: var(--space-md);
      padding: var(--space-2xs) var(--space-sm);
      font: inherit;
      font-size: var(--text-sm);
      font-weight: var(--weight-semibold);
      color: var(--accent-text);
      background: transparent;
      border: var(--border-width) solid var(--border-strong);
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: background var(--transition-fast);
    }

    .more:hover {
      background: var(--bg-surface-alt);
    }

    .more:focus-visible {
      outline: none;
      box-shadow: var(--focus-ring);
    }

    .empty {
      color: var(--text-muted);
    }
  `,
];
