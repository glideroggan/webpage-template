import { html, repeat } from '@microsoft/fast-element';
import type { AboutSection } from './index';

export const template = html<AboutSection>/*html*/`
  <div class="container layout">
    <div class="text">
      <h2>${x => x.content.title}</h2>
      ${repeat(x => x.content.paragraphs, html<string>/*html*/`<p>${x => x}</p>`)}
    </div>
    <dl class="facts">
      ${repeat(x => x.content.facts, html<{ value: string; label: string }>/*html*/`
        <div class="fact">
          <dt>${x => x.value}</dt>
          <dd>${x => x.label}</dd>
        </div>
      `)}
    </dl>
  </div>
`;
