import { html, repeat } from '@microsoft/fast-element';
import type { NavLink } from '../../content';
import type { Theme } from '../../themes';
import type { AppRoot } from './index';

// The page: a header with the brand, the menu and the theme select, then the sections. The id sits on
// the section's host element; app-root scrolls to it on hashchange, because the browser's #anchor
// lookup does not search shadow roots.
export const template = html<AppRoot>/*html*/`
  <header class="header">
    <div class="bar">
      <a class="brand" href="#top">${x => x.brand}</a>
      <nav aria-label="Huvudmeny">
        <ul>
          ${repeat(x => x.links, html<NavLink>/*html*/`<li><a href="${x => x.href}">${x => x.label}</a></li>`)}
        </ul>
      </nav>
      <label class="theme">
        <span>${x => x.header.themeLabel}</span>
        <select @change="${(x, c) => x.pickTheme(c.event)}">
          ${repeat(x => x.themes, html<Theme, AppRoot>/*html*/`
            <option value="${x => x.name}" :selected="${(x, c) => c.parent.theme === x.name}">${x => x.label}</option>
          `)}
        </select>
      </label>
    </div>
  </header>
  <main id="top">
    <kit-section id="exempel"></kit-section>
  </main>
`;
