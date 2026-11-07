import { FASTElement, customElement } from '@microsoft/fast-element';
import { hero } from '../../content';
import { template } from './template';
import { styles } from './styles';

@customElement({ name: 'hero-section', template, styles })
export class HeroSection extends FASTElement {
  content = hero;
}
