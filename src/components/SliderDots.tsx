import './SliderDots.css';

interface SliderDotsProps {
  total: number;
  activeIndex: number;
  onDotClick: (index: number) => void;
}

export default function SliderDots({ total, activeIndex, onDotClick }: SliderDotsProps) {
  return (
    <div className="slider-dots">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          className={`dot ${i === activeIndex ? 'active' : ''}`}
          onClick={() => onDotClick(i)}
          aria-label={`Go to slide ${i + 1}`}
        />
      ))}
    </div>
  );
}