'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { useLanguage } from '../../Functions/useLanguage';

// твої фото з /public
const IMAGES = [
  { id: 1, src: '/1.avif' },
  { id: 2, src: '/2.avif' },
  // { id: 3, src: '/3.avif' },
  { id: 4, src: '/4.avif' },
  // { id: 5, src: '/5.avif' },
  { id: 6, src: '/6.avif' },
  { id: 7, src: '/7.avif' },
  { id: 8, src: '/8.avif' },
  // { id: 9, src: '/9.avif' },
  { id: 10, src: '/10.avif' },
];

export default function Gallery() {
  const boxesRef = useRef(null);
  const nextBtnRef = useRef(null);
  const prevBtnRef = useRef(null);
  const router = useRouter();
  const [isPaused, setIsPaused] = useState(false);

  const { translateList } = useLanguage();
  const menuItems = translateList('home', 'top_products');

  const images = useMemo(() => IMAGES.slice(0, 10), []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const boxes = gsap.utils.toArray('.box');
      if (!boxes.length) return;

      gsap.set(boxes, { yPercent: -50, willChange: 'transform' });

      // плавність “черги”
      const STAGGER = 0.12;

      // будуємо “безкінечний” цикл, але керуємо ним лише вручну
      const loop = gsap.timeline({ repeat: -1, paused: true, ease: 'none' });
      const shifts = [...boxes, ...boxes, ...boxes];

      shifts.forEach((BOX, index) => {
        const tl = gsap
          .timeline()
          .set(BOX, { xPercent: 250, rotateY: -45, opacity: 0, scale: 0.5 })
          .to(BOX, { opacity: 1, scale: 1, duration: 0.18 }, 0)
          .to(BOX, { opacity: 0, scale: 0.5, duration: 0.18 }, 0.82)
          .fromTo(BOX, { xPercent: 250 }, { xPercent: -350, duration: 1, ease: 'power1.inOut' }, 0)
          .fromTo(BOX, { rotateY: -45 }, { rotateY: 45, duration: 1, ease: 'power2.inOut' }, 0)
          .to(BOX, { z: 80, scale: 1.18, duration: 0.12, repeat: 1, yoyo: true }, 0.4)
          .fromTo(BOX, { zIndex: 1 }, { zIndex: boxes.length, duration: 0.5, repeat: 1, yoyo: true, ease: 'none' }, 0);

        loop.add(tl, index * STAGGER);
      });

      const cycle = STAGGER * boxes.length;      // повний цикл
      const step = 1 / boxes.length;             // крок на 1 картку

      // стартуємо з середини, щоб кадр одразу гарно виглядав
      loop.totalTime(cycle);

      const nudge = (dir = 1, dur = 0.5) => {
        const t = loop.totalTime();
        gsap.to(loop, {
          totalTime: t + dir * step * cycle,
          duration: dur,
          ease: 'power2.out',
          overwrite: true,
        });
      };

      const onNext = () => nudge(-1);
      const onPrev = () => nudge(1);

      nextBtnRef.current?.addEventListener('click', onNext);
      prevBtnRef.current?.addEventListener('click', onPrev);

      const onKey = (ev) => {
        if (ev.code === 'ArrowLeft' || ev.code === 'KeyA') onNext();
        if (ev.code === 'ArrowRight' || ev.code === 'KeyD') onPrev();
      };
      document.addEventListener('keydown', onKey);

      return () => {
        document.removeEventListener('keydown', onKey);
        nextBtnRef.current?.removeEventListener('click', onNext);
        prevBtnRef.current?.removeEventListener('click', onPrev);
        loop.kill();
      };
    }, boxesRef);

    return () => ctx.revert();
  }, []);

  // Auto-advance every 2 seconds
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      nextBtnRef.current?.click();
    }, 2000); // 2 seconds
    
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <>
      <Head>
        <link rel="preload" as="image" href={IMAGES[0]?.src || ''} type="image/avif" />
      </Head>

      <div className="gallery-container">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-0 text-center tracking-tight">
          {menuItems[0]}
        </h2>

        <section 
          className="gallery-wrap"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* кнопки по боках */}
          <svg width="0" height="0" style={{ position: 'absolute' }}>
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#be123c" />
                <stop offset="50%" stopColor="#db2777" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
          </svg>
          <button ref={prevBtnRef} className="nav-btn side left" aria-label="Previous">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button ref={nextBtnRef} className="nav-btn side right" aria-label="Next">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* сцена */}
          <div ref={boxesRef} className="boxes" aria-label="GSAP gallery">
            {[...images, ...images, ...images].map((img, idx) => (
              <div
                key={`${img.id}-${idx}`}
                className="box"
                style={{ ['--src']: `url(${img.src})` }}
                onClick={() => router.push(`/Gallery?product=${img.id}`)}
                role="button"
                aria-label={`Open photo ${img.id}`}
              >
                <img src={img.src} alt={`Professional photography Barcelona - Love story couple photoshoot portfolio ${img.id}`} loading="lazy" />
              </div>
            ))}
          </div>
        </section>
      </div>

      <style jsx>{`
        .boxes { will-change: transform; }
        .box   { will-change: transform; }

        .gallery-container {
          width: 100%;
          padding: 2rem 0;
        }

        .gallery-wrap {
          position: relative;
          width: 100%;
          height: min(70vh, 800px);
          overflow: hidden;
          background: transparent;
          margin-top: -1rem;
        }

        .boxes {
          height: 100%;
          width: 100%;
          position: absolute;
          inset: 0;
          overflow: hidden;
          transform-style: preserve-3d;
          perspective: 800px;
          touch-action: none;
        }

        .box {
          transform-style: preserve-3d;
          position: absolute;
          top: 50%;
          left: 50%;
          height: 20vmin;
          width: 20vmin;
          min-height: 200px;
          min-width: 200px;
          display: block;
          background: linear-gradient(135deg, rgba(190, 18, 60, 0.15), rgba(219, 39, 119, 0.15), rgba(124, 58, 237, 0.15));
          cursor: pointer;
          border-radius: 12px;
          overflow: hidden;
        }
        .box:nth-of-type(even) { 
          background: linear-gradient(135deg, rgba(124, 58, 237, 0.15), rgba(219, 39, 119, 0.15), rgba(190, 18, 60, 0.15));
        }

        .box::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          height: 100%;
          width: 100%;
          background-image: var(--src);
          background-size: cover;
          background-position: 50% 50%;
          transform: translate(-50%, -50%) rotate(180deg) translate(0, -100%) translate(0, -0.5vmin);
          opacity: 0.3;
        }
        .box::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          height: 100%;
          width: 100%;
          background: linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 50%);
          transform: translate(-50%, -50%) rotate(180deg) translate(0, -100%) translate(0, -0.5vmin) scale(1.01);
          z-index: 2;
        }
        .box img {
          position: absolute;
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .box:hover img {
          transform: scale(1.05);
        }
        .box:hover {
          box-shadow: 0 0 30px rgba(219, 39, 119, 0.5);
        }

        /* кнопки по боках */
        .nav-btn.side {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          background: transparent;
          border: none;
          color: #fff;
          width: auto;
          height: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.5s ease;
        }
        .nav-btn.side.left  { left: 1rem; }
        .nav-btn.side.right { right: 1rem; }

        .nav-btn.side:hover,
        .nav-btn.side:active {
          filter: drop-shadow(0 0 20px rgba(219, 39, 119, 0.9));
          transform: translateY(-50%) scale(1.4);
        }
        .nav-btn.side:hover svg,
        .nav-btn.side:active svg {
          stroke: url(#gradient);
        }
        .nav-btn svg { 
          width: 48px; 
          height: 48px; 
          stroke-width: 2.5;
          transition: all 0.5s ease;
        }
        .nav-btn.side:hover svg,
        .nav-btn.side:active svg {
          width: 64px;
          height: 64px;
          stroke-width: 3;
        }
      `}</style>
    </>
  );
}
