import { html, when } from '@microsoft/fast-element';
import type { KitSection } from './index';

// Every html`` literal gets /*html*/ in front so the editor highlights and formats it.
// The secondary button toggles the card's extra line: when() renders it only while showDetails is true.
export const template = html<KitSection>/*html*/`
  <div class="container">
    <h2>${x => x.kit.title}</h2>
    <p class="lead">${x => x.kit.lead}</p>

    <div class="actions">
      <button type="button" class="button primary">${x => x.kit.primaryLabel}</button>
      <button
        type="button"
        class="button secondary"
        aria-expanded="${x => x.showDetails}"
        aria-controls="card-details"
        @click="${x => x.toggleDetails()}"
      >
        ${x => (x.showDetails ? x.kit.hideDetails : x.kit.showDetails)}
      </button>
    </div>

    <div class="grid">
      <article class="card">
        <h3>${x => x.kit.cardTitle}</h3>
        <p>${x => x.kit.cardText}</p>
        <div id="card-details">
          ${when(x => x.showDetails, html<KitSection>/*html*/`<p class="details">${x => x.kit.cardDetails}</p>`)}
        </div>
      </article>

      <div class="field">
        <label for="name">${x => x.kit.fieldLabel}</label>
        <input id="name" type="text" autocomplete="name" placeholder="${x => x.kit.fieldPlaceholder}" />
      </div>
    </div>
  </div>
`;
