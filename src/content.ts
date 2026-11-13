// All page copy lives here, in Swedish placeholders, so components stay free of text and
// swapping in real content never touches a template.

export interface NavLink {
  label: string;
  href: string;
}

export const brandName = 'Ert företag';

export const navLinks: NavLink[] = [{ label: 'Exempel', href: '#exempel' }];

export const header = {
  themeLabel: 'Tema',
};

export const kit = {
  title: 'Exempel',
  lead: 'Så här ser rubriker, text, knappar, kort och formulärfält ut i det valda temat. Byt tema i menyn.',
  primaryLabel: 'Primär knapp',
  showDetails: 'Visa detaljer',
  hideDetails: 'Dölj detaljer',
  cardTitle: 'Ett kort',
  cardText: 'Kort har yta, kant, rundning och skugga från temats tokens.',
  cardDetails: 'Den här raden visas och döljs med den sekundära knappen.',
  fieldLabel: 'Namn',
  fieldPlaceholder: 'Förnamn Efternamn',
};
