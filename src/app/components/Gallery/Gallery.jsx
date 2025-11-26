'use client';

import { useEffect, useMemo, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { useLanguage } from '../../Functions/useLanguage';

// твої фото з /public
const IMAGES = [
  { id: 1, src: '/1.avif' },
  { id: 2, src: '/2.avif' },
  { id: 3, src: '/3.avif' },
  { id: 4, src: '/4.avif' },
  { id: 5, src: '/5.avif' },
  { id: 6, src: '/6.avif' },
  { id: 7, src: '/7.avif' },
  { id: 8, src: '/8.avif' },
  { id: 9, src: '/9.avif' },
  { id: 10, src: '/10.avif' },
];

export default function Gallery() {
  const boxesRef = useRef(null);
  const nextBtnRef = useRef(null);
  const prevBtnRef = useRef(null);
  const router = useRouter();

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

  return (
    <>
      <Head>
        <link rel="preload" as="image" href={IMAGES[0]?.src || ''} type="image/avif" />
      </Head>

      <section className="gallery-wrap">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-16 text-center">
          {menuItems[0]}
        </h2>

        {/* кнопки по боках */}
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
          {images.map((img) => (
            <div
              key={img.id}
              className="box"
              style={{ ['--src']: `url(${img.src})` }}
              onClick={() => router.push(`/Gallery?product=${img.id}`)}
              role="button"
              aria-label={`Open photo ${img.id}`}
            >
              <img src={img.src} alt={`Photo ${img.id}`} loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        .boxes { will-change: transform; }
        .box   { will-change: transform; }

        .gallery-wrap {
          position: relative;
          width: 100%;
          height: min(70vh, 800px);
          overflow: hidden;
          background: transparent;
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
          background: hsl(90, 80%, 70%);
          cursor: pointer;
        }
        .box:nth-of-type(even) { background: hsl(90, 80%, 40%); }

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
          opacity: 0.75;
        }
        .box::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          height: 100%;
          width: 100%;
          background: linear-gradient(hsl(0,0%,10%) 50%, transparent);
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
        }

        /* кнопки по боках */
        .nav-btn.side {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          background: rgba(0,0,0,0.55);
          border: 1px solid rgba(255,255,255,0.35);
          color: #fff;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all .25s ease;
          backdrop-filter: blur(4px);
        }
        .nav-btn.side.left  { left: 1rem; }
        .nav-btn.side.right { right: 1rem; }

        .nav-btn.side:hover {
          background: rgba(255,255,255,0.9);
          color: #000;
          transform: translateY(-50%) scale(1.08);
        }
        .nav-btn svg { width: 22px; height: 22px; }
      `}</style>
    </>
  );
}
