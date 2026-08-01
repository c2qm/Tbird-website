import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import IconButton from './IconButton';
import SliderDots from './SliderDots';
import './HeroSlider.css';

interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
  primaryCta: { text: string; link: string };
  secondaryCta?: { text: string; link: string };
}

interface HeroSliderProps {
  slides: Slide[];
  autoPlayInterval?: number;
}

export default function HeroSlider({ slides, autoPlayInterval = 5000 }: HeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % slides.length);
      }, autoPlayInterval);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, slides.length, autoPlayInterval]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleCtaClick = (link: string) => {
    if (link.startsWith('#')) {
      const target = document.querySelector(link);
      target?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(link);
    }
  };

  return (
    <section className="hero-slider">
      <div className="hero-track-wrapper">
        <div
          className="hero-track"
          style={{
            width: `${slides.length * 100}%`,
            transform: `translateX(-${activeIndex * (100 / slides.length)}%)`,
          }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="hero-slide"
              style={{
                width: `${100 / slides.length}%`,
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="hero-overlay" />

              <div className="hero-content">
                <h1 className="hero-title">{slide.title}</h1>
                <p className="hero-description">{slide.description}</p>
                <div className="hero-actions">
                  <Button variant="primary" onClick={() => handleCtaClick(slide.primaryCta.link)}>
                    {slide.primaryCta.text}
                  </Button>
                  {slide.secondaryCta && (
                    <Button variant="secondary" onClick={() => handleCtaClick(slide.secondaryCta!.link)}>
                      {slide.secondaryCta.text}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-controls">
        <SliderDots total={slides.length} activeIndex={activeIndex} onDotClick={goToSlide} />

        <div className="hero-nav-buttons">
          <IconButton
            ariaLabel={isPlaying ? 'Pause slider' : 'Play slider'}
            onClick={togglePlay}
            icon={
              isPlaying ? (
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                  <polygon points="6 4 20 12 6 20" />
                </svg>
              )
            }
          />
          <IconButton
            ariaLabel="Previous slide"
            onClick={goPrev}
            icon={
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            }
          />
          <IconButton
            ariaLabel="Next slide"
            onClick={goNext}
            icon={
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            }
          />
        </div>
      </div>
    </section>
  );
}