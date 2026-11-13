import { css } from '@microsoft/fast-element';
import { sectionBase } from '../../styles/section-base';

// Only tokens (var(--...)) here: no raw colours, sizes, borders, weights or fonts. The tokens
// are defined in index.html and in the theme files, and reach into the shadow DOM because custom
// properties inherit. The only raw values are 0, 100%, grid fractions (1fr) and media-query
// breakpoints, which CSS cannot read from a token. The card look itself (.card) comes from sectionBase.
export const styles = [
  sectionBase,
  css`
    .lead {
      max-width: var(--text-width);
      margin: 0 0 var(--space-lg);
      color: var(--text-secondary);
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-sm);
      margin-bottom: var(--space-xl);
    }

    .button {
      padding: var(--space-xs) var(--space-md);
      font: inherit;
      font-weight: var(--weight-semibold);
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: background var(--transition-fast), box-shadow var(--transition-fast);
    }

    .primary {
      color: var(--accent-on-strong);
      background: var(--accent-strong);
      border: var(--border-width) solid var(--accent-strong);
    }

    .primary:hover {
      background: var(--accent-strong-hover);
      border-color: var(--accent-strong-hover);
      box-shadow: var(--shadow-md);
    }

    .secondary {
      color: var(--text-primary);
      background: var(--bg-surface);
      border: var(--border-width) solid var(--border-strong);
    }

    .secondary:hover {
      background: var(--bg-surface-alt);
    }

    .button:focus-visible,
    input:focus-visible {
      outline: none;
      box-shadow: var(--focus-ring);
    }

    .grid {
      display: grid;
      gap: var(--space-lg);
      grid-template-columns: repeat(auto-fit, minmax(var(--card-min), 1fr));
      align-items: start;
    }

    h3 {
      margin: 0 0 var(--space-xs);
      font-family: var(--font-heading);
      font-size: var(--text-xl);
      color: var(--text-primary);
    }

    .card p {
      margin: 0;
      color: var(--text-secondary);
    }

    .details {
      margin-top: var(--space-sm);
    }

    .field {
      display: grid;
      gap: var(--space-2xs);
    }

    label {
      font-size: var(--text-sm);
      font-weight: var(--weight-semibold);
      color: var(--text-primary);
    }

    input {
      width: 100%;
      box-sizing: border-box;
      padding: var(--space-xs) var(--space-sm);
      font: inherit;
      color: var(--text-primary);
      background: var(--bg-surface);
      border: var(--border-width) solid var(--border-strong);
      border-radius: var(--radius-md);
    }

    input::placeholder {
      color: var(--text-muted);
    }
  `,
];
