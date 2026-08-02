import HeroSlider from '../components/HeroSlider';
import SplitBanner from '../components/SplitBanner';
import heroImage1 from '../assets/images/sliders/1.webp';
import heroImage2 from '../assets/images/sliders/2.webp';
import sportBannerImage from '../assets/images/sliders/3.webp';
import medicalBannerImage from '../assets/images/sliders/5.webp';

const heroSlides = [
  {
    id: 1,
    image: heroImage1,
    title: 'BUILT FOR YOUR DAY',
    description: 'No trade-offs between comfort, durability, and value. Just gear that works as hard as you do.',
    primaryCta: { text: 'Shop', link: '/category/sport-clothing' },
    secondaryCta: { text: 'Explore more', link: '#split-banner' },
  },
  {
    id: 2,
    image: heroImage2,
    title: 'FIT TO FLY',
    description: 'Tailored to your measurements. Made to move with you, all day long.',
    primaryCta: { text: 'Shop', link: '/category/medical-clothing' },
  },
];

const splitBannerItems = [
  {
    id: 1,
    image: sportBannerImage,
    subtitle: 'Performance Wear',
    title: 'Sport Clothing',
    cta: { text: 'Shop Sport', link: '/category/sport-clothing' },
  },
  {
    id: 2,
    image: medicalBannerImage,
    subtitle: 'Comfort & Care',
    title: 'Medical Clothing',
    cta: { text: 'Shop Medical', link: '/category/medical-clothing' },
  },
];

export default function Hero() {
  return (
    <div className="page-fade-in">
      <HeroSlider slides={heroSlides} />
      <SplitBanner items={splitBannerItems} />
    </div>
  );
}