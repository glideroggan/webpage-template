import { css } from '@microsoft/fast-element';
import { sectionBase } from '../../styles/section-base';

export const styles = [
  sectionBase,
  css`
    :host {
      background: var(--bg-surface-alt);
    }

    .grid {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      gap: var(--space-lg);
      grid-template-columns: repeat(auto-fit, minmax(var(--card-min-sm), 1fr));
    }

    .member {
      text-align: center;
    }

    .avatar {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--avatar-size);
      height: var(--avatar-size);
      margin-bottom: var(--space-md);
      border-radius: var(--radius-full);
      background: var(--accent-strong);
      color: var(--accent-on-strong);
      font-family: var(--font-heading);
      font-size: var(--text-2xl);
      font-weight: var(--weight-semibold);
    }

    h3 {
      margin: 0 0 var(--space-2xs);
      font-family: var(--font-heading);
      font-size: var(--text-lg);
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
