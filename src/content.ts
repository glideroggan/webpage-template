// All page copy lives here, in Swedish placeholders, so components stay free of text and
// swapping in real content never touches a template.

export interface NavLink {
  label: string;
  href: string;
}

export interface Service {
  title: string;
  description: string;
}

export interface Case {
  title: string;
  customer: string;
  summary: string;
}

export const brandName = 'Ert företag';

export const navLinks: NavLink[] = [
  { label: 'Tjänster', href: '#services' },
  { label: 'Om oss', href: '#about' },
  { label: 'Case', href: '#cases' },
  { label: 'Team', href: '#team' },
  { label: 'Kontakt', href: '#contact' },
];

export const titles = {
  services: 'Tjänster',
  cases: 'Case',
  team: 'Teamet',
  empty: 'Inget att visa ännu.',
};

export const hero = {
  eyebrow: 'Platshållare',
  title: 'Här står er viktigaste rubrik',
  lead: 'En kort mening som förklarar vad ni gör och för vem. Byt ut texten i src/content.ts.',
  primaryCta: { label: 'Kontakta oss', href: '#contact' },
  secondaryCta: { label: 'Se våra tjänster', href: '#services' },
};

export const services: Service[] = [
  { title: 'Tjänst ett', description: 'Kort beskrivning av tjänsten i en eller två meningar.' },
  { title: 'Tjänst två', description: 'Kort beskrivning av tjänsten i en eller två meningar.' },
  { title: 'Tjänst tre', description: 'Kort beskrivning av tjänsten i en eller två meningar.' },
];

export const about = {
  title: 'Om oss',
  paragraphs: [
    'Här berättar ni vilka ni är och vad ni brinner för. Två eller tre meningar räcker långt.',
    'Ett andra stycke kan beskriva hur ni arbetar och vad kunden kan förvänta sig.',
  ],
  facts: [
    { value: '00', label: 'år i branschen' },
    { value: '00', label: 'nöjda kunder' },
    { value: '00', label: 'genomförda projekt' },
  ],
};

export const cases: Case[] = [
  { title: 'Case ett', customer: 'Kund A', summary: 'Vad problemet var och vad ni levererade.' },
  { title: 'Case två', customer: 'Kund B', summary: 'Vad problemet var och vad ni levererade.' },
  { title: 'Case tre', customer: 'Kund C', summary: 'Vad problemet var och vad ni levererade.' },
];

export interface TeamMember {
  name: string;
  role: string;
}

export const team: TeamMember[] = [
  { name: 'Förnamn Efternamn', role: 'Roll eller titel' },
  { name: 'Förnamn Efternamn', role: 'Roll eller titel' },
  { name: 'Förnamn Efternamn', role: 'Roll eller titel' },
  { name: 'Förnamn Efternamn', role: 'Roll eller titel' },
];

export const contact = {
  title: 'Kontakt',
  lead: 'Berätta kort vad ni behöver hjälp med så hör vi av oss.',
  nameLabel: 'Namn',
  emailLabel: 'E-post',
  messageLabel: 'Meddelande',
  submitLabel: 'Skicka',
  thanks: 'Tack! Det här är bara en demo, inget har skickats.',
};
