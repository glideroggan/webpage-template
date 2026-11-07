import { html, when } from '@microsoft/fast-element';
import type { ContactSection } from './index';

export const template = html<ContactSection>/*html*/`
  <div class="container">
    <h2>${x => x.content.title}</h2>
    <p class="lead">${x => x.content.lead}</p>
    ${when(x => x.sent, html<ContactSection>/*html*/`
      <p class="thanks" role="status">${x => x.content.thanks}</p>
    `)}
    <div class="form">
      <label>
        <span>${x => x.content.nameLabel}</span>
        <input type="text" name="name" autocomplete="name" :value="${x => x.name}" @input="${(x, c) => x.updateField(c.event)}">
      </label>
      <label>
        <span>${x => x.content.emailLabel}</span>
        <input type="email" name="email" autocomplete="email" :value="${x => x.email}" @input="${(x, c) => x.updateField(c.event)}">
      </label>
      <label class="wide">
        <span>${x => x.content.messageLabel}</span>
        <textarea name="message" rows="5" :value="${x => x.message}" @input="${(x, c) => x.updateField(c.event)}"></textarea>
      </label>
      <button type="button" class="submit" @click="${x => x.submit()}">${x => x.content.submitLabel}</button>
    </div>
  </div>
`;
