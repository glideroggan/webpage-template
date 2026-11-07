import { FASTElement, customElement, observable } from '@microsoft/fast-element';
import { contact } from '../../content';
import { template } from './template';
import { styles } from './styles';

@customElement({ name: 'contact-section', template, styles })
export class ContactSection extends FASTElement {
  content = contact;

  @observable name: string = '';
  @observable email: string = '';
  @observable message: string = '';
  @observable sent: boolean = false;

  // The three fields share one handler: the input's `name` attribute says which one changed.
  updateField(event: Event): boolean {
    const input = event.target as HTMLInputElement | HTMLTextAreaElement;
    if (input.name === 'name') this.name = input.value;
    if (input.name === 'email') this.email = input.value;
    if (input.name === 'message') this.message = input.value;
    return true;
  }

  // A native <form @submit> is unreliable inside shadow DOM, so the button handles @click.
  // This demo sends nothing; replace the body with a real call when there is a backend.
  submit(): boolean {
    this.sent = true;
    this.name = '';
    this.email = '';
    this.message = '';
    return true;
  }
}
