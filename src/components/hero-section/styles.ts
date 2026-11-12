import { css } from '@microsoft/fast-element';
import { sectionBase } from '../../styles/section-base';

export const styles = [
  sectionBase,
  css`
    :host {
      background: var(--hero-gradient);
      padding-top: calc(var(--space-3xl) + var(--space-xl));
      padding-bottom: var(--space-3xl);
    }

    .eyebrow {
      margin: 0 0 var(--space-sm);
      font-family: var(--font-heading);
      font-size: var(--text-sm);
      font-weight: var(--weight-semibold);
      letter-spacing: var(--tracking-wide);
      text-transform: uppercase;
      color: var(--accent-text);
    }

    h1 {
      margin: 0 0 var(--space-md);
      max-width: var(--heading-width);
      font-family: var(--font-heading);
      font-size: var(--text-hero);
      line-height: var(--leading-tight);
      color: var(--text-primary);
    }

    .lead {
      margin: 0 0 var(--space-xl);
      max-width: var(--text-width);
      font-size: var(--text-lg);
      color: var(--text-secondary);
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-md);
    }

    .button {
      display: inline-block;
      padding: var(--space-sm) var(--space-lg);
      border-radius: var(--radius-md);
      font-family: var(--font-heading);
      font-weight: var(--weight-semibold);
      text-decoration: none;
      border: var(--border-width-strong) solid var(--accent-strong);
      transition: background var(--transition-fast);
    }

    .button:focus-visible {
      outline: none;
      box-shadow: var(--focus-ring);
    }

    .primary {
      background: var(--accent-strong);
      color: var(--accent-on-strong);
    }

    .primary:hover {
      background: var(--accent-strong-hover);
      border-color: var(--accent-strong-hover);
    }

    .secondary {
      background: transparent;
      color: var(--accent-text);
    }

    .secondary:hover {
      background: var(--bg-surface-alt);
    }

    @media (max-width: 600px) {
      :host {
        padding-top: var(--space-3xl);
        padding-bottom: var(--space-3xl);
      }
    }
  `,
];
