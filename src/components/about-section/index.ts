import { FASTElement, customElement } from '@microsoft/fast-element';
import { about } from '../../content';
import { template } from './template';
import { styles } from './styles';

@customElement({ name: 'about-section', template, styles })
export class AboutSection extends FASTElement {
  content = about;
}
