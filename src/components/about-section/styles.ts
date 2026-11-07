import { css } from '@microsoft/fast-element';
import { sectionBase } from '../../styles/section-base';

export const styles = [
  sectionBase,
  css`
    :host {
      background: var(--bg-surface-alt);
    }

    .layout {
      display: grid;
      gap: var(--space-2xl);
      grid-template-columns: 1.4fr 1fr;
      align-items: start;
    }

    .text p {
      margin: 0 0 var(--space-md);
      max-width: 40rem;
      color: var(--text-secondary);
    }

    .facts {
      margin: 0;
      display: grid;
      gap: var(--space-md);
    }

    .fact {
      padding: var(--space-lg);
      background: var(--bg-surface);
      border: 1px solid var(--border-base);
      border-radius: var(--radius-lg);
    }

    dt {
      font-family: var(--font-heading);
      font-size: var(--text-3xl);
      font-weight: 700;
      color: var(--accent-text);
    }

    dd {
      margin: 0;
      color: var(--text-muted);
    }

    @media (max-width: 800px) {
      .layout {
        grid-template-columns: 1fr;
      }
    }
  `,
];
