import productImage1 from '../assets/images/products/1.webp';
import productImage2 from '../assets/images/products/2.webp';
import productImage3 from '../assets/images/products/3.webp';
import productImage4 from '../assets/images/products/4.webp';
import productImage5 from '../assets/images/products/5.webp';
import productImage6 from '../assets/images/products/6.webp';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  categorySlug: string;
  subcategorySlug: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Performance Training Tee',
    price: 32,
    image: productImage4,
    categorySlug: 'sport-clothing',
    subcategorySlug: 't-shirts',
  },
  {
    id: '2',
    name: 'Flex Training Shorts',
    price: 22,
    image: productImage6,
    categorySlug: 'sport-clothing',
    subcategorySlug: 'shorts',
  },
  {
    id: '3',
    name: 'Full-Zip Tracksuit',
    price: 59.99,
    image: productImage5,
    categorySlug: 'sport-clothing',
    subcategorySlug: 'tracksuits',
  },
  {
    id: '4',
    name: 'Classic Scrub Set',
    price: 49.99,
    image: productImage2,
    categorySlug: 'medical-clothing',
    subcategorySlug: 'scrubs',
  },
  {
    id: '5',
    name: 'Tailored Lab Coat',
    price: 55,
    image: productImage3,
    categorySlug: 'medical-clothing',
    subcategorySlug: 'lab-coats',
  },
  {
    id: '6',
    name: 'Breathable Scrub Cap',
    price: 12.99,
    image: productImage1,
    categorySlug: 'medical-clothing',
    subcategorySlug: 'scrub-caps',
  },
];