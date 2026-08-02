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

const RING_RADIUS = 20;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export default function HeroSlider({ slides, autoPlayInterval = 5000 }: HeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (!isPlaying) return;

    let startTime: number | null = null;
    let rafId: number;

    setProgress(0);

    const tick = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const pct = Math.min((elapsed / autoPlayInterval) * 100, 100);
      setProgress(pct);

      if (pct < 100) {
        rafId = requestAnimationFrame(tick);
      } else {
        setActiveIndex((prev) => (prev + 1) % slides.length);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [isPlaying, activeIndex, autoPlayInterval, slides.length]);

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

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 50;

    if (deltaX > threshold) {
      goPrev();
    } else if (deltaX < -threshold) {
      goNext();
    }
    touchStartX.current = null;
  };

  const dashOffset = RING_CIRCUMFERENCE * (1 - progress / 100);

  return (
    <section className="hero-slider">
      <div
        className="hero-track-wrapper"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
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
          <div className="hero-pause-wrapper">
            {isPlaying && (
              <svg className="hero-progress-ring" width="44" height="44" viewBox="0 0 44 44">
                <circle
                  className="hero-progress-ring-track"
                  cx="22"
                  cy="22"
                  r={RING_RADIUS}
                  fill="none"
                  strokeWidth="2"
                />
                <circle
                  className="hero-progress-ring-fill"
                  cx="22"
                  cy="22"
                  r={RING_RADIUS}
                  fill="none"
                  strokeWidth="2"
                  strokeDasharray={RING_CIRCUMFERENCE}
                  strokeDashoffset={dashOffset}
                  transform="rotate(-90 22 22)"
                />
              </svg>
            )}
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
          </div>
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