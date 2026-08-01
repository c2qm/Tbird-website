import SplitBanner from '../components/SplitBanner';
import image1 from '../assets/images/image1.webp';
import image2 from '../assets/images/image2.webp';

const splitItems = [
  {
    id: 1,
    image: image1,
    title: 'Windrunner Trail Hoodie',
    cta: { text: 'Shop', link: '/shop' },
  },
  {
    id: 2,
    image: image2,
    subtitle: 'TBird Essentials',
    title: 'Built to move, made to last.',
    cta: { text: 'Shop', link: '/shop' },
  },
];

export default function SplitBannerSection() {
  return <SplitBanner items={splitItems} />;
}