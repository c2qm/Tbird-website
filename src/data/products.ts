import productImage1 from '../assets/images/products/product-1.jpg';
import productImage2 from '../assets/images/products/product-2.jpg';
import productImage3 from '../assets/images/products/product-3.jpg';
import productImage4 from '../assets/images/products/product-4.jpg';
import productImage5 from '../assets/images/products/product-5.jpg';
import productImage6 from '../assets/images/products/product-6.jpg';

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
    price: 25,
    image: productImage1,
    categorySlug: 'sport-clothing',
    subcategorySlug: 't-shirts',
  },
  {
    id: '2',
    name: 'Flex Training Shorts',
    price: 30,
    image: productImage2,
    categorySlug: 'sport-clothing',
    subcategorySlug: 'shorts',
  },
  {
    id: '3',
    name: 'Full-Zip Tracksuit',
    price: 60,
    image: productImage3,
    categorySlug: 'sport-clothing',
    subcategorySlug: 'tracksuits',
  },
  {
    id: '4',
    name: 'Classic Scrub Set',
    price: 40,
    image: productImage4,
    categorySlug: 'medical-clothing',
    subcategorySlug: 'scrubs',
  },
  {
    id: '5',
    name: 'Tailored Lab Coat',
    price: 55,
    image: productImage5,
    categorySlug: 'medical-clothing',
    subcategorySlug: 'lab-coats',
  },
  {
    id: '6',
    name: 'Breathable Scrub Cap',
    price: 12,
    image: productImage6,
    categorySlug: 'medical-clothing',
    subcategorySlug: 'scrub-caps',
  },
];