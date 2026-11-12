import { html, repeat } from '@microsoft/fast-element';
import type { Case } from '../../content';
import type { CasesSection } from './index';

const caseTemplate = html<Case>/*html*/`
  <li class="card">
    <p class="customer">${x => x.customer}</p>
    <h3>${x => x.title}</h3>
    <p class="summary">${x => x.summary}</p>
  </li>
`;

export const template = html<CasesSection>/*html*/`
  <div class="container">
    <h2>${x => x.titles.cases}</h2>
    <ul class="list">
      ${repeat(x => x.items, caseTemplate)}
    </ul>
  </div>
`;
