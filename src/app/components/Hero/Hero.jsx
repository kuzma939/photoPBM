'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useLanguage } from '../../Functions/useLanguage';
import Head from 'next/head';

const Hero = () => {
  const { translateList } = useLanguage();
  const menuItems = translateList('home', 'hero');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {/* SEO Meta Tags */}
      <Head>
        <meta name="description" content="PBM — Professional photographer in Barcelona" />
        <meta
          name="keywords"
          content="photographer Barcelona, photo session, portrait, love story, professional photography"
        />
        <meta property="og:title" content="PBM — Photographer in Barcelona" />
        <meta
          property="og:description"
          content="Book your professional photoshoot in Barcelona with PBM. Capture your best moments beautifully."
        />
        <meta property="og:image" content="/hoom/hero2.avif" />
        <meta property="og:url" content="https://example.com" />
      </Head>

      {/* Desktop version */}
      <div className="hidden lg:flex justify-center items-center gap-4 mt-8 mb-36">
        <div className="relative w-[400px] h-[500px]">
          <Image
            src="/1.avif"
            alt="Couple photoshoot at Barcelona landmark"
            width={400}
            height={500}
            className="rounded-lg object-cover shadow-2xl shadow-gray-800 dark:shadow-gray-400"
            priority
          />
        </div>

        <div className="relative w-[400px] h-[400px] rounded-full overflow-hidden">
          <Image
            src="/2.avif"
            alt="Barcelona photography location showcase"
            width={400}
            height={400}
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-4xl font-bold text-white bg-black bg-opacity-50">
            <span>PHOTOGRAPHER</span>
            <span className="mt-4">BARCELONA</span>
          </div>
        </div>

        <div className="relative w-[400px] h-[500px]">
          <Image
            src="/4.avif"
            alt="Family photoshoot at the beach in Barcelona"
            width={400}
            height={500}
            className="rounded-lg object-cover shadow-2xl shadow-gray-800 dark:shadow-gray-400"
            priority
          />
        </div>
      </div>

      {/* Mobile / Tablet version */}
      <section
        className="flex flex-row justify-center items-center gap-2 sm:gap-16 section-container overflow-hidden lg:hidden"
        aria-labelledby="hero-heading"
        role="banner"
      >
        {isClient && (
          <div className="relative w-[200px] max-w-[300px] h-auto flex-shrink-0 overflow-hidden">
            <video
              src="/hoom/baner.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-auto max-h-[400px] object-cover rounded-lg"
            />
          </div>
        )}

        <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left w-[40vw] sm:w-auto">
          <div className="relative w-[35vw] sm:w-[300px] lg:w-[350px] max-w-[600px] h-auto overflow-hidden">
            <Image
              src="/hoom/BannerMobile.avif"
              alt="PBM photography showcase banner"
              width={600}
              height={500}
              className="object-cover shadow-lg w-full h-auto rounded-lg"
              priority
            />
          </div>
          <h2 className="text-xl sm:text-5xl lg:text-7xl font-bold text-gray-700 dark:text-white ml-2 sm:ml-12 sm:mt-2">
            PBM
          </h2>
          <p className="text-xs sm:text-xl lg:text-3xl text-gray-600 dark:text-white ml-2 sm:ml-12 sm:mt-4">
            {menuItems[0]}
          </p>
          <p className="text-xs sm:text-xl lg:text-3xl text-gray-600 dark:text-white ml-2 sm:ml-16">
            {menuItems[2]}
          </p>
        </div>
      </section>
    </>
  );
};

export default Hero;
