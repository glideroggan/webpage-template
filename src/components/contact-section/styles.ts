import { css } from '@microsoft/fast-element';
import { sectionBase } from '../../styles/section-base';

export const styles = [
  sectionBase,
  css`
    :host {
      background: var(--bg-surface-alt);
    }

    .lead {
      margin: 0 0 var(--space-xl);
      max-width: var(--text-width);
      color: var(--text-secondary);
    }

    .thanks {
      margin: 0 0 var(--space-lg);
      padding: var(--space-md);
      border-radius: var(--radius-md);
      background: var(--bg-surface);
      border: var(--border-width) solid var(--accent-primary);
      color: var(--text-primary);
    }

    .form {
      display: grid;
      gap: var(--space-md);
      grid-template-columns: 1fr 1fr;
      max-width: var(--form-width);
    }

    label {
      display: grid;
      gap: var(--space-2xs);
      font-weight: var(--weight-semibold);
      color: var(--text-secondary);
    }

    .wide,
    .submit {
      grid-column: 1 / -1;
    }

    input,
    textarea {
      font: inherit;
      color: var(--text-primary);
      background: var(--bg-surface);
      border: var(--border-width) solid var(--border-strong);
      border-radius: var(--radius-md);
      padding: var(--space-sm);
    }

    input:focus-visible,
    textarea:focus-visible {
      outline: none;
      border-color: var(--accent-primary);
      box-shadow: var(--focus-ring);
    }

    .submit {
      justify-self: start;
      padding: var(--space-sm) var(--space-xl);
      font-family: var(--font-heading);
      font-size: var(--text-base);
      font-weight: var(--weight-semibold);
      color: var(--accent-on-strong);
      background: var(--accent-strong);
      border: none;
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: background var(--transition-fast);
    }

    .submit:hover {
      background: var(--accent-strong-hover);
    }

    .submit:focus-visible {
      outline: none;
      box-shadow: var(--focus-ring);
    }

    @media (max-width: 600px) {
      .form {
        grid-template-columns: 1fr;
      }
    }
  `,
];
