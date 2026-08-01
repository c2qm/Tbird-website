import HeroSlider from '../components/HeroSlider';
import heroImage1 from '../assets/images/image1.webp';
import heroImage2 from '../assets/images/image2.webp';

const heroSlides = [
  {
    id: 1,
    image: heroImage1,
    title: 'BUILT FOR YOUR DAY',
    description: 'No trade-offs between comfort, durability, and value. Just gear that works as hard as you do.',
    primaryCta: { text: 'Shop', link: '/shop' },
    secondaryCta: { text: 'Explore more', link: '/explore' },
  },
  {
    id: 2,
    image: heroImage2,
    title: 'FIT TO FLY',
    description: 'Tailored to your measurements. Made to move with you, all day long.',
    primaryCta: { text: 'Shop', link: '/shop' },
  },
];

export default function Hero() {
  return <HeroSlider slides={heroSlides} />;
}