import { css } from '@microsoft/fast-element';
import { sectionBase } from '../../styles/section-base';

export const styles = [
  sectionBase,
  css`
    .grid {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      gap: var(--space-lg);
      grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
    }

    .member {
      padding: var(--space-lg);
      text-align: center;
      background: var(--bg-surface);
      border: 1px solid var(--border-base);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);
    }

    .avatar {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 4rem;
      height: 4rem;
      margin-bottom: var(--space-md);
      border-radius: 50%;
      background: var(--accent-strong);
      color: var(--accent-on-strong);
      font-family: var(--font-heading);
      font-size: var(--text-2xl);
      font-weight: 600;
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
