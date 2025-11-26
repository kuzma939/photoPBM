'use client';

import Head from 'next/head';
import { useMemo, useRef, useState } from 'react';
import { useLanguage } from '../../Functions/useLanguage';

export default function Hero() {
  const { translateList } = useLanguage();
  const t = translateList('home', 'hero');

  return (
    <>
      <Head>
        <meta name="description" content="PBM — Professional photographer in Barcelona" />
        <meta name="keywords" content="photographer Barcelona, photo session, portrait, love story, professional photography" />
        <meta property="og:title" content="PBM — Photographer in Barcelona" />
        <meta property="og:description" content="Book your professional photoshoot in Barcelona with PBM." />
        <meta property="og:image" content="/hoom/hero2.avif" />
        <meta property="og:url" content="https://example.com" />
      </Head>

      {/* DESKTOP */}
      <div className="hidden lg:flex justify-center items-center mt-8 mb-8">
        <div className="w-screen px-0">
          <HeroSlider />
        </div>
      </div>

      {/* MOBILE/TABLET */}
      <section className="lg:hidden flex flex-col items-center justify-center text-center overflow-hidden px-4 mt-4 mb-4">
       

      <div className=" mb-6">
     
          <HeroSlider  compact />
        </div>
      </section>
    </>
  );
}

/* ===== SLIDER ===== */
function HeroSlider({ compact = false }) {
  const slides = useMemo(
    () => [
      { title: 'Barceloneta', description: 'Experience the mystical Highlands under twilight skies and misty lochs.', image: '/Barceloneta/10.avif', href: '/booking-info' },
      { title: 'Sagrada', description: 'Chase the Northern Lights under star-lit skies along scenic fjord roads.', image: '/Sagrada/3.avif', href: '/booking-info' },
      { title: 'New Zealand', description: 'Wander dramatic, mist-laden mountain paths that feel straight out of a dream.', image: 'https://images.unsplash.com/photo-1483982258113-b72862e6cff6?q=80&w=1170&auto=format&fit=crop', href: '/booking-info' },
      { title: 'Japan', description: 'Discover serene mountain temples shrouded in dusk and ancient forest trails.', image: '/Gothic/JAPAN/1.avif', href: '/booking-info' },
    ],
    []
  );

  const [current, setCurrent] = useState(0);
  const canPrev = current > 0;
  const canNext = current < slides.length - 1;
  const next = () => setCurrent(i => (i < slides.length - 1 ? i + 1 : i));
  const prev = () => setCurrent(i => (i > 0 ? i - 1 : i));

  const startX = useRef(null);
  const onTouchStart = (e) => (startX.current = e.changedTouches[0].clientX);
  const onTouchEnd = (e) => {
    const dx = (startX.current ?? 0) - e.changedTouches[0].clientX;
    if (dx > 40) next();
    if (dx < -40) prev();
    startX.current = null;
  };

  const windowSlides = slides.slice(current, current + 5);

  return (
    <section
      className={`relative mx-auto ${compact ? 'h-[46vw] min-h-[380px] max-h-[520px]' : 'h-[400px] md:h-[500px] lg:h-[600px]'} w-screen overflow-hidden rounded-none bg-[#f5f5f5] shadow-[0_30px_50px_#dbdbdb]`}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-label="Showcase slider"
    >
      <div className="slide relative w-full h-full">
        {windowSlides.map((s, i) => (
          <div
            key={s.title + i}
            className={`item pos-${i}`}
            style={{ backgroundImage: `url(${s.image})` }}
            role="img"
            aria-label={s.title}
          >
            <div className="content">
              <div className="name">{s.title}</div>
              <div className="des">{s.description}</div>
              <a className="seeMore" href={s.href}>
                <button className="cta">Book a Session</button>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* кнопки */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-4 button z-50">
        <button
          onClick={prev}
          disabled={!canPrev}
          className="prev w-5  h-6 md:w-10 md:h-9 rounded-md bg-black text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white hover:text-black transition"
        >
          ◁
        </button>
        <button
          onClick={next}
          disabled={!canNext}
          className="next w-5 h-6 md:w-10 md:h-9 rounded-md bg-black text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white hover:text-black transition"
        >
          ▷
        </button>
      </div>
<style jsx>{`
  .item {
    width: 200px;
    height: 250px;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    border-radius: 20px;
    box-shadow: 0 30px 50px #505050;
    background-position: 50% 50%;
    background-size: cover;
    display: inline-block;
    transition: all 0.5s;
  }

  /* ===== DESKTOP layout ===== */
  @media (min-width: 1024px) {
    .pos-0, .pos-1 {
      top: 0;
      left: 0;
      transform: none;
      width: 100%;
      height: 100%;
      border-radius: 20px;
    }
    .pos-2 { left: 50%; }
    .pos-3 { left: calc(50% + 220px); }
    .pos-4 { left: calc(50% + 440px); }
    .pos-5 { left: calc(50% + 660px); opacity: 0; }

    .content { display: none; }
    .pos-1 .content { display: block; }
  }

  /* ===== TEXT STYLES (universal) ===== */
  .content {
    position: absolute;
    top: 50%;
    left: 100px;
    width: 300px;
    transform: translate(0, -50%);
    color: #fff;
    font-family: system-ui;
    text-shadow: 0 4px 16px rgba(0,0,0,0.85), 0 0 8px rgba(0,0,0,0.5);
    z-index: 2;
  }

  .name {
    font-size: 40px;
    text-transform: uppercase;
    font-weight: 700;
    opacity: 0;
    animation: animate 1s forwards;
  }

  .des {
    margin-top: 10px;
    margin-bottom: 20px;
    opacity: 0;
    animation: animate 1s 0.3s forwards;
  }

  .cta {
    padding: 10px 20px;
    border: 1px solid rgba(255,255,255,0.4);
    border-radius: 10px;
    cursor: pointer;
    opacity: 0;
    background: rgba(0,0,0,0.85);
    color: #fff;
    transition: all 0.3s;
    animation: animate 1s 0.6s forwards;
  }

  .cta:hover {
    background: #fff;
    color: #000;
  }

  /* ===== MOBILE/TABLET ===== */
  @media (max-width: 1023px) {
    .item {
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      transform: none;
      border-radius: 0;
      box-shadow: none;
    }

    .item:not(.pos-0) { opacity: 0; pointer-events: none; }
    .pos-0 { opacity: 1; animation: fadeIn 0.6s ease; }

    .content {
      display: none;
      left: 0;
      right: 0;
      bottom: 0;
      top: auto;
      transform: none !important;
      padding: 8px 10px 14px;
      text-align: left;
      color: #fff;
      text-shadow: 0 2px 8px rgba(0,0,0,0.8);
      width: auto !important;
    }

    .pos-0 .content { display: block; }

    .name {
      font-size: 34px !important;
      line-height: 1.2 !important;
      font-weight: 600 !important;
      text-transform: none !important;
      letter-spacing: 0.3px !important;
      margin: 0 !important;
      opacity: 0;
      animation: animate 0.5s ease-out forwards;
    }

    .des {
      font-size: 26px !important;
      line-height: 1.3 !important;
      margin: 4px 0 10px !important;
      color: #f2f2f2 !important;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      opacity: 0;
      animation: animate 0.5s ease-out 0.12s forwards;
    }

    .cta {
      font-size: 16px !important;
      padding: 6px 10px !important;
      border-radius: 8px !important;
      background: rgba(0,0,0,0.9);
      color: #fff;
      border: 1px solid rgba(255,255,255,0.3);
    }

    .cta:hover {
      background: #fff;
      color: #000;
    }
  }

  @keyframes animate {
    from { opacity: 0; transform: translateY(18px); filter: blur(6px); }
    to { opacity: 1; transform: translateY(0); filter: blur(0); }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(.95); }
    to { opacity: 1; transform: scale(1); }
  }
`}</style>

    </section>
  );
}
