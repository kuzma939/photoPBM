'use client';

import Head from 'next/head';
import { useMemo, useRef, useState, useEffect } from 'react';
import { useLanguage } from '../../Functions/useLanguage';

export default function Hero() {
  const { translateList } = useLanguage();
  const t = translateList('home', 'hero');
  
  // Translation indices:
  // t[0] = title, t[1] = book now (unused here)
  // t[2] = "Book Your Barcelona Session"
  // t[3] = "Barceloneta Beach", t[4] = "Sagrada Família", t[5] = "Gothic Quarter", t[6] = "Park Güell"
  // t[7-10] = descriptions for each location

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
      <div className="hidden lg:flex justify-center items-center mb-8">
        <div className="w-screen px-0">
          <HeroSlider />
        </div>
      </div>

      {/* MOBILE/TABLET */}
      <section className="lg:hidden flex flex-col items-center justify-center text-center overflow-hidden px-4 mb-4">
       

      <div className=" mb-6">
     
          <HeroSlider  compact />
        </div>
      </section>
    </>
  );
}

/* ===== SLIDER ===== */
function HeroSlider({ compact = false }) {
  const { translateList } = useLanguage();
  const t = translateList('home', 'hero');
  
  const slides = useMemo(
    () => [
      { 
        title: t[3], // 'Barceloneta Beach'
        description: t[7], // Beach description
        image: '/Barceloneta/10.avif', 
        href: '/contact' 
      },
      { 
        title: t[4], // 'Sagrada Família'
        description: t[8], // Sagrada description
        image: '/Sagrada/3.avif', 
        href: '/contact' 
      },
      { 
        title: t[5], // 'Gothic Quarter'
        description: t[9], // Gothic Quarter description
        image: '/Gothic/JAPAN/1.avif', 
        href: '/contact' 
      },
      { 
        title: t[6], // 'Park Güell'
        description: t[10], // Park Güell description
        image: 'https://images.unsplash.com/photo-1483982258113-b72862e6cff6?q=80&w=1170&auto=format&fit=crop', 
        href: '/contact' 
      },
    ],
    [t]
  );

  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const next = () => setCurrent(i => (i < slides.length - 1 ? i + 1 : 0)); // Loop back to start
  const prev = () => setCurrent(i => (i > 0 ? i - 1 : slides.length - 1)); // Loop to end
  
  // Auto-advance every 4 seconds
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrent(i => (i < slides.length - 1 ? i + 1 : 0));
    }, 3000); // 3 seconds
    
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

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
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Showcase slider"
    >
      <div className="slide relative w-full h-full">
        {windowSlides.map((s, i) => (
          <div
            key={s.title + i}
            className={`item pos-${i}`}
            style={{ backgroundImage: `url(${s.image})` }}
            role="img"
            aria-label={`${s.title} - Professional couple photography in Barcelona - ${s.description.slice(0, 60)}...`}
          >
            <div className="content">
              <div className="name">{s.title}</div>
              <div className="des">{s.description}</div>
              <a className="seeMore" href={s.href}>
                <button className="cta">{t[2]}</button>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Dots */}
      <div className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-50">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === current 
                ? 'bg-white w-8 shadow-lg' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* кнопки - Left button */}
      <button
        onClick={prev}
        className="prev absolute top-[35%] -translate-y-1/2 left-2 md:left-6 text-white hover:text-transparent hover:bg-gradient-to-r hover:from-rose-700 hover:via-pink-600 hover:to-purple-700 hover:bg-clip-text active:text-transparent active:bg-gradient-to-r active:from-rose-700 active:via-pink-600 active:to-purple-700 active:bg-clip-text transition-all duration-500 hover:drop-shadow-[0_0_20px_rgba(219,39,119,0.9)] active:drop-shadow-[0_0_20px_rgba(219,39,119,0.9)] hover:scale-125 active:scale-125 z-50 flex items-center justify-center text-5xl md:text-6xl font-extrabold"
      >
        ‹
      </button>
      
      {/* кнопки - Right button */}
      <button
        onClick={next}
        className="next absolute top-[35%] -translate-y-1/2 right-2 md:right-6 text-white hover:text-transparent hover:bg-gradient-to-r hover:from-rose-700 hover:via-pink-600 hover:to-purple-700 hover:bg-clip-text active:text-transparent active:bg-gradient-to-r active:from-rose-700 active:via-pink-600 active:to-purple-700 active:bg-clip-text transition-all duration-500 hover:drop-shadow-[0_0_20px_rgba(219,39,119,0.9)] active:drop-shadow-[0_0_20px_rgba(219,39,119,0.9)] hover:scale-125 active:scale-125 z-50 flex items-center justify-center text-5xl md:text-6xl font-extrabold"
      >
        ›
      </button>
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
    font-weight: 800;
    opacity: 0;
    animation: animate 1s forwards;
    letter-spacing: 0.02em;
    color: #fff !important;
    background: none !important;
    -webkit-text-fill-color: #fff !important;
    text-shadow: 0 4px 20px rgba(190, 18, 60, 0.8), 
                 0 2px 10px rgba(219, 39, 119, 0.6),
                 0 0 40px rgba(124, 58, 237, 0.5),
                 0 4px 16px rgba(0,0,0,0.85);
  }

  .des {
    margin-top: 10px;
    margin-bottom: 20px;
    opacity: 0;
    animation: animate 1s 0.3s forwards;
    font-weight: 600;
  }

  .cta {
    padding: 10px 20px;
    border: 2px solid rgba(255,255,255,0.6);
    border-radius: 10px;
    cursor: pointer;
    opacity: 0;
    background: linear-gradient(135deg, #be123c, #db2777, #7c3aed);
    color: #fff !important;
    font-weight: 700;
    letter-spacing: 0.03em;
    transition: all 0.3s;
    animation: animate 1s 0.6s forwards;
  }

  .cta:hover {
    background: linear-gradient(135deg, #7c3aed, #db2777, #be123c) !important;
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(219, 39, 119, 0.5);
    border-color: rgba(255,255,255,0.9);
    color: #fff !important;
    -webkit-text-fill-color: #fff !important;
    background-clip: border-box !important;
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
      font-weight: 800 !important;
      text-transform: none !important;
      letter-spacing: 0.5px !important;
      margin: 0 !important;
      opacity: 0;
      animation: animate 0.5s ease-out forwards;
      color: #fff !important;
      background: none !important;
      -webkit-text-fill-color: #fff !important;
      text-shadow: 0 3px 15px rgba(190, 18, 60, 0.8), 
                   0 2px 8px rgba(219, 39, 119, 0.6),
                   0 0 30px rgba(124, 58, 237, 0.5),
                   0 2px 8px rgba(0,0,0,0.8) !important;
    }

    .des {
      font-size: 26px !important;
      line-height: 1.3 !important;
      font-weight: 600 !important;
      margin: 4px 0 10px !important;
      color: #ffffff !important;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      opacity: 0;
      animation: animate 0.5s ease-out 0.12s forwards;
    }

    .cta {
      font-size: 16px !important;
      padding: 8px 14px !important;
      border-radius: 8px !important;
      background: linear-gradient(135deg, #be123c, #db2777, #7c3aed) !important;
      color: #fff !important;
      font-weight: 700 !important;
      letter-spacing: 0.5px !important;
      border: 2px solid rgba(255,255,255,0.5);
    }

    .cta:hover {
      background: linear-gradient(135deg, #7c3aed, #db2777, #be123c) !important;
      color: #fff !important;
      -webkit-text-fill-color: #fff !important;
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(219, 39, 119, 0.5);
      border-color: rgba(255,255,255,0.9);
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
