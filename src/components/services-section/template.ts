import { html, repeat, when } from '@microsoft/fast-element';
import type { Service } from '../../content';
import type { ServicesSection } from './index';

// Every html`` literal gets /*html*/ in front so the editor highlights and formats it.
// Inside repeat(), the callback gets (item, context): the component is context.parent
// and the item's position is context.index.
const cardTemplate = html<Service, ServicesSection>/*html*/`
  <li>
    <article class="card">
      <span class="number" aria-hidden="true">${(x, c) => c.index + 1}</span>
      <h3>${x => x.title}</h3>
      <p>${x => x.description}</p>
      ${when((x, c) => c.parent.expanded === c.index, html<Service, ServicesSection>/*html*/`
        <p class="details">${x => x.details}</p>
      `)}
      <button
        type="button"
        class="more"
        aria-expanded="${(x, c) => c.parent.expanded === c.index}"
        @click="${(x, c) => c.parent.toggle(c.index)}"
      >
        ${(x, c) => (c.parent.expanded === c.index ? c.parent.titles.readLess : c.parent.titles.readMore)}
      </button>
    </article>
  </li>
`;

export const template = html<ServicesSection>/*html*/`
  <div class="container">
    <h2>${x => x.titles.services}</h2>
    ${when(x => x.items.length === 0, html<ServicesSection>/*html*/`<p class="empty">${x => x.titles.empty}</p>`)}
    <ul class="grid">
      ${repeat(x => x.items, cardTemplate, { positioning: true })}
    </ul>
  </div>
`;
