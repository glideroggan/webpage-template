import { FASTElement, customElement, observable } from '@microsoft/fast-element';
import { cases, titles, Case } from '../../content';
import { template } from './template';
import { styles } from './styles';

@customElement({ name: 'cases-section', template, styles })
export class CasesSection extends FASTElement {
  titles = titles;

  @observable items: Case[] = cases;
}
