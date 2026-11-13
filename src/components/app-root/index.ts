import { FASTElement, customElement, observable } from '@microsoft/fast-element';
import { brandName, header, navLinks } from '../../content';
import { applyTheme, storedTheme, themes } from '../../themes';
import { template } from './template';
import { styles } from './styles';

@customElement({ name: 'app-root', template, styles })
export class AppRoot extends FASTElement {
  brand = brandName;
  links = navLinks;
  header = header;
  themes = themes;

  // The theme the select shows; set from the stored pick before the first render.
  @observable theme: string = storedTheme();

  // The sections live in this shadow root, where the browser's own #fragment lookup does not
  // search, so the hash is resolved here.
  private readonly onHashChange = () => this.scrollToHash();

  // A click on a link whose hash is already current fires no hashchange, so it is handled here.
  // composedPath() also finds links inside the sections' own shadow roots.
  private readonly onClick = (event: Event) => {
    const link = event
      .composedPath()
      .find((node): node is HTMLAnchorElement => node instanceof HTMLAnchorElement);
    if (link && link.hash !== '' && link.hash === location.hash) this.scrollToHash();
  };

  connectedCallback(): void {
    super.connectedCallback();
    void this.showTheme(this.theme);
    window.addEventListener('hashchange', this.onHashChange);
    this.addEventListener('click', this.onClick);
    // Wait for the first render so the target exists when a page is opened on /#exempel.
    requestAnimationFrame(() => this.scrollToHash());
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('hashchange', this.onHashChange);
    this.removeEventListener('click', this.onClick);
  }

  pickTheme(event: Event): boolean {
    void this.showTheme((event.target as HTMLSelectElement).value);
    return true;
  }

  // The select follows what is actually shown, which is the default when a theme fails to load.
  private async showTheme(name: string): Promise<void> {
    this.theme = name;
    const shown = await applyTheme(name);
    if (shown !== null) this.theme = shown;
  }

  private scrollToHash(): void {
    const id = decodeURIComponent(location.hash.slice(1));
    if (!id) return;
    this.shadowRoot?.getElementById(id)?.scrollIntoView();
  }
}
