import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

export type ProcedureCard = {
  n: string;
  title: string;
  desc: string;
  to: string;
  img: string;
};

export default function ProceduresCarousel({ cards }: { cards: ProcedureCard[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [pages, setPages] = useState(1);

  const gap = 24;

  const measure = () => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('.clinic-card') as HTMLElement | null;
    if (!card) return;
    const visible = Math.max(
      1,
      Math.floor((el.clientWidth + gap) / (card.offsetWidth + gap)),
    );
    setPages(Math.max(1, cards.length - visible + 1));
  };

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [cards.length]);

  const stepSize = () => {
    const el = trackRef.current;
    const card = el?.querySelector('.clinic-card') as HTMLElement | null;
    return card ? card.offsetWidth + gap : 0;
  };

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const step = stepSize();
    if (!step) return;
    setActive(Math.max(0, Math.min(Math.round(el.scrollLeft / step), pages - 1)));
  };

  const scrollTo = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: index * stepSize(), behavior: 'smooth' });
    setActive(index);
  };

  const stepBy = (dir: -1 | 1) => {
    scrollTo(Math.max(0, Math.min(active + dir, pages - 1)));
  };

  return (
    <div className="clinic-carousel">
      <div className="clinic-track" ref={trackRef} onScroll={onScroll}>
        {cards.map((s) => (
          <article className="clinic-card" key={s.n}>
            <Link to={s.to} className="clinic-card-media" aria-label={s.title}>
              <img src={s.img} alt="" loading="lazy" />
            </Link>
            <div className="clinic-card-body">
              <span className="clinic-card-n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <Link to={s.to} className="clinic-card-link">
                Learn more <ArrowUpRight size={15} />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="clinic-controls">
        <div className="clinic-dots" role="tablist" aria-label="Carousel position">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={active === i}
              className={active === i ? 'clinic-dot is-active' : 'clinic-dot'}
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <div className="clinic-arrows">
          <button
            type="button"
            className="clinic-arrow"
            onClick={() => stepBy(-1)}
            disabled={active <= 0}
            aria-label="Previous"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            className="clinic-arrow"
            onClick={() => stepBy(1)}
            disabled={active >= pages - 1}
            aria-label="Next"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
