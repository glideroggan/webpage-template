import { html } from '@microsoft/fast-element';
import type { HeroSection } from './index';

export const template = html<HeroSection>/*html*/`
  <div class="container">
    <p class="eyebrow">${x => x.content.eyebrow}</p>
    <h1>${x => x.content.title}</h1>
    <p class="lead">${x => x.content.lead}</p>
    <div class="actions">
      <a class="button primary" href="${x => x.content.primaryCta.href}">${x => x.content.primaryCta.label}</a>
      <a class="button secondary" href="${x => x.content.secondaryCta.href}">${x => x.content.secondaryCta.label}</a>
    </div>
  </div>
`;
