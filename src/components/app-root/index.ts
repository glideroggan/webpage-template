import { FASTElement, customElement } from '@microsoft/fast-element';
import { brandName, navLinks } from '../../content';
import { template } from './template';
import { styles } from './styles';

@customElement({ name: 'app-root', template, styles })
export class AppRoot extends FASTElement {
  brand = brandName;
  links = navLinks;
}
