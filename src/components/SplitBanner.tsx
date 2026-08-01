import { useNavigate } from 'react-router-dom';
import Button from './Button';
import './SplitBanner.css';

interface BannerItem {
  id: number;
  image: string;
  subtitle?: string;
  title: string;
  cta: { text: string; link: string };
}

interface SplitBannerProps {
  items: BannerItem[];
}

export default function SplitBanner({ items }: SplitBannerProps) {
  const navigate = useNavigate();

  return (
    <section id="split-banner" className="split-banner">
      {items.map((item) => (
        <div
          key={item.id}
          className="split-banner-item"
          style={{ backgroundImage: `url(${item.image})` }}
        >
          <div className="split-banner-content">
            {item.subtitle && <span className="split-banner-subtitle">{item.subtitle}</span>}
            <h2 className="split-banner-title">{item.title}</h2>
            <Button variant="primary" onClick={() => navigate(item.cta.link)}>
              {item.cta.text}
            </Button>
          </div>
        </div>
      ))}
    </section>
  );
}