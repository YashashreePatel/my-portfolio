export type ReferenceTestimonial = {
  name: string;
  title: string;
  date: string;
  linkedin: string;
  signals: string[];
  quote: string[];
};

export const ReferenceTestimonials: ReferenceTestimonial[] = [
  {
    name: 'Jared Starkweather',
    title: 'Lead Engineer - Intelligent Infrastructure @ Upwork',
    date: 'June 2, 2026',
    linkedin: 'https://www.linkedin.com/in/jared-starkweather-6889b593/',
    signals: ['consistent', 'reliable', 'organized'],
    quote: [
      'During my time managing Yash, she stood out as one of the most consistent, reliable, and organized engineers in our organization.',
      'Yash is the kind of engineer every team hopes to have: she follows through on her commitments, delivers on time, communicates clearly, and holds herself to a high engineering standard. I could always trust that when Yash owned something, it would be handled thoughtfully and with care.',
      'She brings excellent attention to detail, genuine pride in her work, and a calm, dependable presence to the teams she supports. She was also highly adaptable, frequently moving between different projects and priorities while continuing to deliver strong results.',
      'I would highly recommend hiring Yash for any team looking for an engineer who is communicative, dependable, detail-oriented, and deeply committed to doing high-quality work.',
    ],
  },
  {
    name: 'Bolbi Liu',
    title: 'Founder @ AdsGency',
    date: 'March 11, 2024',
    linkedin: 'https://www.linkedin.com/in/bolbi-liu/',
    signals: ['driven', 'professional', 'trustworthy'],
    quote: [
      "Yasha has been an incredible asset to our company. She's driven, professional and trustworthy. Always on top of everything and delivering results whenever needed. I believe her technical skills will be very valuable to any future employers.",
    ],
  },
];
