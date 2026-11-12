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

  // A click on a link whose hash is already current fires no hashchange, so it is handled here.
  // composedPath() also finds links inside the sections' own shadow roots (the hero buttons).
  private readonly onClick = (event: Event) => {
    const link = event
      .composedPath()
      .find((node): node is HTMLAnchorElement => node instanceof HTMLAnchorElement);
    if (link && link.hash !== '' && link.hash === location.hash) this.scrollToHash();
  };

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('hashchange', this.onHashChange);
    this.addEventListener('click', this.onClick);
    // Wait for the first render so the target exists when a page is opened on /#contact.
    requestAnimationFrame(() => this.scrollToHash());
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('hashchange', this.onHashChange);
    this.removeEventListener('click', this.onClick);
  }

  private scrollToHash(): void {
    const id = decodeURIComponent(location.hash.slice(1));
    if (!id) return;
    this.shadowRoot?.getElementById(id)?.scrollIntoView();
  }
}
