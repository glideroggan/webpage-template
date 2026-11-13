import { FASTElement, customElement, observable } from '@microsoft/fast-element';
import { kit } from '../../content';
import { template } from './template';
import { styles } from './styles';

// The reference component. A new section copies this folder: index.ts holds state and
// behaviour, template.ts the markup, styles.ts the CSS. The tag name must contain a dash.
// It shows one of each kit element (heading, text, buttons, a card, a form field), all styled
// from tokens only, so a theme change restyles every one of them.
@customElement({ name: 'kit-section', template, styles })
export class KitSection extends FASTElement {
  // Copy comes from content.ts; the template reads it from this field.
  kit = kit;

  // State that the view shows must be @observable: a plain field would not update the template.
  @observable showDetails: boolean = false;

  toggleDetails(): boolean {
    this.showDetails = !this.showDetails;
    // Return true so the browser keeps its default behaviour: FAST calls preventDefault()
    // on any handler result that is not exactly true.
    return true;
  }
}
