import { css } from '@microsoft/fast-element';
import { sectionBase } from '../../styles/section-base';

export const styles = [
  sectionBase,
  css`
    .list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      gap: var(--space-lg);
      grid-template-columns: repeat(auto-fit, minmax(var(--card-min), 1fr));
    }

    .case {
      padding: var(--space-lg);
      background: var(--bg-surface);
      border: 1px solid var(--border-base);
      border-top: var(--border-accent) solid var(--accent-primary);
      border-radius: var(--radius-lg);
    }

    .customer {
      margin: 0 0 var(--space-2xs);
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--accent-text);
    }

    h3 {
      margin: 0 0 var(--space-xs);
      font-family: var(--font-heading);
      font-size: var(--text-xl);
    }

    .summary {
      margin: 0;
      color: var(--text-secondary);
    }
  `,
];
