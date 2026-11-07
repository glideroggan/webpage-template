import { css } from '@microsoft/fast-element';

export const styles = css`
  :host {
    display: block;
  }

  .header {
    position: sticky;
    top: 0;
    z-index: 10;
    background: var(--bg-surface);
    border-bottom: 1px solid var(--border-base);
  }

  .bar {
    max-width: var(--content-width);
    margin: 0 auto;
    padding: var(--space-sm) var(--space-lg);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-xs) var(--space-lg);
  }

  .brand {
    font-family: var(--font-heading);
    font-size: var(--text-lg);
    font-weight: 700;
    color: var(--accent-text);
    text-decoration: none;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs) var(--space-lg);
  }

  nav a {
    color: var(--text-secondary);
    text-decoration: none;
    font-weight: 600;
  }

  nav a:hover {
    color: var(--accent-text);
  }

  a:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
    border-radius: var(--radius-sm);
  }

  .footer {
    padding: var(--space-xl) var(--space-lg);
    text-align: center;
    color: var(--text-muted);
    font-size: var(--text-sm);
  }

  .footer p {
    margin: 0;
  }

  @media (max-width: 600px) {
    .bar {
      padding: var(--space-xs) var(--space-md);
    }
  }
`;
