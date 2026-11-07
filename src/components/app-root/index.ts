import { FASTElement, customElement } from '@microsoft/fast-element';
import { brandName, navLinks } from '../../content';
import { template } from './template';
import { styles } from './styles';

@customElement({ name: 'app-root', template, styles })
export class AppRoot extends FASTElement {
  brand = brandName;
  links = navLinks;

  // The sections live in this shadow root, where the browser's own #fragment lookup does not
  // search, so the hash is resolved here.
  private readonly onHashChange = () => this.scrollToHash();

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('hashchange', this.onHashChange);
    // Wait for the first render so the target exists when a page is opened on /#contact.
    requestAnimationFrame(() => this.scrollToHash());
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('hashchange', this.onHashChange);
  }

  private scrollToHash(): void {
    const id = decodeURIComponent(location.hash.slice(1));
    if (!id) return;
    this.shadowRoot?.getElementById(id)?.scrollIntoView();
  }
}
