import { html, repeat } from '@microsoft/fast-element';
import type { NavLink } from '../../content';
import type { AppRoot } from './index';

// The page is this list of sections, top to bottom. The id sits on the host element
// (not inside the section's shadow DOM) so the nav's #anchor links can find it.
export const template = html<AppRoot>/*html*/`
  <header class="header">
    <div class="bar">
      <a class="brand" href="#top">${x => x.brand}</a>
      <nav aria-label="Huvudmeny">
        <ul>
          ${repeat(x => x.links, html<NavLink>/*html*/`<li><a href="${x => x.href}">${x => x.label}</a></li>`)}
        </ul>
      </nav>
    </div>
  </header>
  <main id="top">
    <hero-section></hero-section>
    <services-section id="services"></services-section>
    <about-section id="about"></about-section>
    <cases-section id="cases"></cases-section>
    <team-section id="team"></team-section>
    <contact-section id="contact"></contact-section>
  </main>
  <footer class="footer">
    <p>${x => x.brand}. Platshållartext, byt ut i src/content.ts.</p>
  </footer>
`;
