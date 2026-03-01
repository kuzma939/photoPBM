'use client';

import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { useLanguage } from '../../Functions/useLanguage';

const IMAGES = [
  { id: 1, src: '/1.avif' },
  { id: 2, src: '/2.avif' },
  { id: 4, src: '/4.avif' },
  { id: 6, src: '/6.avif' },
  { id: 7, src: '/7.avif' },
  { id: 8, src: '/8.avif' },
  { id: 10, src: '/10.avif' },
];

export default function Gallery() {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);
  const router = useRouter();
  const [isPaused, setIsPaused] = useState(false);

  const { translateList } = useLanguage();
  const menuItems = translateList('home', 'top_products');

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const setWidth = track.scrollWidth / 2;
    const duration = 35;

    tweenRef.current = gsap.fromTo(
      track,
      { x: 0 },
      {
        x: -setWidth,
        duration,
        repeat: -1,
        ease: 'none',
      }
    );

    return () => {
      tweenRef.current?.kill();
    };
  }, []);

  useEffect(() => {
    const tween = tweenRef.current;
    if (!tween) return;
    if (isPaused) tween.pause();
    else tween.play();
  }, [isPaused]);

  const duplicate = [...IMAGES, ...IMAGES];

  return (
    <>
      <Head>
        <link rel="preload" as="image" href={IMAGES[0]?.src || ''} type="image/avif" />
      </Head>

      <div className="gallery-container">
        <h2 className="gallery-title">
          {menuItems[0]}
        </h2>

        <section
          className="gallery-wrap"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div ref={trackRef} className="gallery-track" aria-label="Gallery carousel">
            <div className="gallery-set">
              {duplicate.map((img, idx) => (
                <div
                  key={`a-${img.id}-${idx}`}
                  className="gallery-card"
                  onClick={() => router.push(`/Gallery?product=${img.id}`)}
                  role="button"
                  aria-label={`Open photo ${img.id}`}
                >
                  <img
                    src={img.src}
                    alt={`Professional photography Barcelona - Portfolio ${img.id}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
            <div className="gallery-set" aria-hidden="true">
              {duplicate.map((img, idx) => (
                <div
                  key={`b-${img.id}-${idx}`}
                  className="gallery-card"
                  onClick={() => router.push(`/Gallery?product=${img.id}`)}
                  role="button"
                  aria-label={`Open photo ${img.id}`}
                >
                  <img
                    src={img.src}
                    alt=""
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        .gallery-container {
          width: 100%;
          padding: 0.5rem 0 1.25rem 0;
        }

        .gallery-title {
          font-size: clamp(1.5rem, 4vw, 2.25rem);
          font-weight: 800;
          margin: 0 0 0.75rem 0;
          text-align: center;
          letter-spacing: -0.02em;
        }

        .gallery-wrap {
          position: relative;
          width: 100%;
          height: min(52vh, 540px);
          overflow: hidden;
          margin-top: 0;
          mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
        }

        .gallery-track {
          display: flex;
          width: max-content;
          height: 100%;
          align-items: center;
          will-change: transform;
        }

        .gallery-set {
          display: flex;
          align-items: center;
          gap: clamp(0.75rem, 2vw, 1.25rem);
          padding: 0 1rem;
          flex-shrink: 0;
          height: 100%;
        }

        .gallery-card {
          flex: 0 0 auto;
          width: 28vmin;
          min-width: 280px;
          height: 28vmin;
          min-height: 280px;
          border-radius: 1rem;
          overflow: hidden;
          cursor: pointer;
          background: linear-gradient(145deg, rgba(190, 18, 60, 0.08), rgba(124, 58, 237, 0.08));
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.06);
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease;
        }

        .gallery-card:hover {
          transform: scale(1.04);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.18), 0 0 0 1px rgba(255, 255, 255, 0.08);
        }

        .gallery-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        @media (min-width: 1024px) {
          .gallery-card {
            width: 36vmin;
            min-width: 360px;
            height: 36vmin;
            min-height: 360px;
          }
        }
      `}</style>
    </>
  );
}
