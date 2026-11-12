import { html, repeat, when } from '@microsoft/fast-element';
import type { TeamMember } from '../../content';
import type { TeamSection } from './index';

const memberTemplate = html<TeamMember>/*html*/`
  <li class="card member">
    <span class="avatar" aria-hidden="true">${x => x.name.charAt(0)}</span>
    <h3>${x => x.name}</h3>
    <p>${x => x.role}</p>
  </li>
`;

export const template = html<TeamSection>/*html*/`
  <div class="container">
    <h2>${x => x.titles.team}</h2>
    ${when(x => x.members.length === 0, html<TeamSection>/*html*/`<p class="empty">${x => x.titles.empty}</p>`)}
    <ul class="grid">
      ${repeat(x => x.members, memberTemplate)}
    </ul>
  </div>
`;
