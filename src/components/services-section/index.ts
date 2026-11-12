import { FASTElement, customElement, observable } from '@microsoft/fast-element';
import { services, titles, Service } from '../../content';
import { template } from './template';
import { styles } from './styles';

// The reference component. A new section copies this folder: index.ts holds state and
// behaviour, template.ts the markup, styles.ts the CSS. The tag name must contain a dash.
@customElement({ name: 'services-section', template, styles })
export class ServicesSection extends FASTElement {
  titles = titles;

  // Assign a new array to change it: FAST only notices reassignment, not splice or push.
  @observable items: Service[] = services;

  // Which card shows its details, or -1. Demonstrates a click handler, when() and an aria state.
  @observable expanded: number = -1;

  toggle(index: number): boolean {
    this.expanded = this.expanded === index ? -1 : index;
    // Return true so the browser keeps its default behaviour: FAST calls preventDefault()
    // on any handler result that is not exactly true.
    return true;
  }
}
