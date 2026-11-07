import { FASTElement, customElement, observable } from '@microsoft/fast-element';
import { team, titles, TeamMember } from '../../content';
import { template } from './template';
import { styles } from './styles';

@customElement({ name: 'team-section', template, styles })
export class TeamSection extends FASTElement {
  titles = titles;

  @observable members: TeamMember[] = team;
}
