export interface Subcategory {
  slug: string;
  name: string;
}

export interface Category {
  slug: string;
  name: string;
  subcategories: Subcategory[];
}

export const categories: Category[] = [
  {
    slug: 'sport-clothing',
    name: 'Sport Clothing',
    subcategories: [
      { slug: 't-shirts', name: 'T-Shirts' },
      { slug: 'shorts', name: 'Shorts' },
      { slug: 'tracksuits', name: 'Tracksuits' },
    ],
  },
  {
    slug: 'medical-clothing',
    name: 'Medical Clothing',
    subcategories: [
      { slug: 'scrubs', name: 'Scrubs' },
      { slug: 'lab-coats', name: 'Lab Coats' },
      { slug: 'scrub-caps', name: 'Scrub Caps' },
    ],
  },
];