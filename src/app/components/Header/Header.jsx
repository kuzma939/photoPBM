'use client';

import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaMoon, FaSun, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { useHeaderState } from '../../hooks/useHeader';
import { useLanguage } from '../../Functions/useLanguage';
import { useRouter } from 'next/navigation';
import location from '../../data/location';

const Header = React.memo(({ isDarkMode, toggleDarkMode }) => {
  const router = useRouter();

  const { translateList, language, setLanguage } = useLanguage();
  const menuItems = translateList('home', 'header');

  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const { isMenuOpen, toggleMenu, closeMenu } = useHeaderState();

  const toggleLanguage = () => {
    setLanguage(prev =>
      prev === 'EN' ? 'FR' : prev === 'FR' ? 'UA' : 'EN'
    );
  };

  const goToCatalog = () => {
    router.push('/GalleryLocationsPage');
  };

  const categories = [
    { name: 'All', path: 'all' },
    ...location.map(loc => ({
      name: loc.translations?.[language]?.name || loc.location,
      path: loc.location,
    })),
  ];

  const handleCategoryClick = (locationPath) => {
    router.push(`/GalleryLocationsPage?location=${locationPath}`);
    setIsCategoriesOpen(false);
    closeMenu();
  };

  return (
    <header
      className={`flex items-center justify-between px-4 py-1 shadow-md ${
        isDarkMode ? 'bg-black text-white shadow-gray-800' : 'bg-white text-black shadow-gray-300'
      }`}
      role="banner"
    >
      {/* Brand */}
      <div className="flex-shrink-0 ml-0 sm:ml-8">
        <Head>
          {/* Preload small logo for mobile */}
          <link
            rel="preload"
            as="image"
            href="/Logo.webp"
            type="image/avif"
            media="(max-width: 480px)"
          />
        </Head>

        <Link href="/" aria-label="Go to Home">
          <span className="flex items-center">
            <h1 className="sr-only">PBM — Pic Best Moments</h1>
            <Image
              src="/logo.jpg"
              alt="PBM Logo"
              width={80}
              height={40}
              priority
              className={`w-auto h-auto sm:w-16 md:w-18 lg:w-24 ${isDarkMode ? 'invert' : ''}`}
            />
          </span>
        </Link>
      </div>

      {/* Primary navigation (desktop) */}
      <nav aria-label="Main Navigation" className="flex items-center space-x-4 lg:space-x-6">
        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          aria-label="Open menu"
          aria-expanded={isMenuOpen ? 'true' : 'false'}
          className="lg:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <FaBars className="sm:xl md:text-2xl lg:text-3xl" />
        </button>

        <ul
          className="hidden lg:flex space-x-4 text-xs sm:text-sm md:text-base lg:text-lg"
          role="menubar"
        >
          <li className="min-w-[80px] text-center" role="none">
            <Link href="/" role="menuitem" aria-label={`Go to ${menuItems[0]} page`}>
              {menuItems[0]}
            </Link>
          </li>

          {/* Catalog + Categories dropdown */}
          <li
            className="relative flex items-center group"
            role="none"
            onMouseEnter={() => setIsCategoriesOpen(true)}
            onMouseLeave={(e) => {
              const relatedTarget = e.relatedTarget;
              if (!relatedTarget || !(relatedTarget instanceof Node) || !e.currentTarget.contains(relatedTarget)) {
                setTimeout(() => setIsCategoriesOpen(false), 300);
              }
            }}
          >
            {/* Catalog button */}
            <button
              onClick={goToCatalog}
              className="flex-grow text-left"
              role="menuitem"
              aria-label="Go to Catalog"
            >
              {menuItems[1]}
            </button>

            {/* Dropdown toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsCategoriesOpen(prev => !prev);
              }}
              className="ml-2 p-1"
              role="button"
              aria-label="Toggle categories list"
              aria-haspopup="true"
              aria-expanded={isCategoriesOpen}
            >
              <FaChevronDown className={`transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown list */}
            {isCategoriesOpen && (
              <ul
                className="absolute left-0 top-full mt-2 bg-white dark:bg-gray-800 rounded-md shadow-md p-2 w-56 z-50"
                role="menu"
                aria-label="Categories"
              >
                {categories.map((category) => (
                  <li key={category.path} role="none">
                    <button
                      onClick={() => handleCategoryClick(category.path)}
                      role="menuitem"
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li className="min-w-[80px] text-center" role="none">
            <Link href="/#about" role="menuitem" aria-label={`Learn more: ${menuItems[2]}`}>
              {menuItems[2]}
            </Link>
          </li>
          <li className="min-w-[80px] text-center" role="none">
            <Link href="/love-story" role="menuitem" aria-label={`Go to ${menuItems[3]} page`}>
              {menuItems[3]}
            </Link>
          </li>
          <li className="min-w-[80px] text-center" role="none">
            <Link href="/Conditions" role="menuitem" aria-label={`View ${menuItems[4]}`}>
              {menuItems[4]}
            </Link>
          </li>
          <li className="min-w-[80px] text-center" role="none">
            <Link href="/contact" role="menuitem" aria-label={`Go to ${menuItems[5]} page`}>
              {menuItems[5]}
            </Link>
          </li>
        </ul>
      </nav>

      {/* Right-side controls (desktop) */}
      <div className="hidden lg:flex items-center space-x-2">
        <button
          onClick={toggleLanguage}
          aria-label={`Switch language (current: ${language})`}
          className="p-1 sm:p-2 rounded-full border border-gray-300 hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-600 transition text-xs sm:text-sm md:text-base lg:text-lg"
        >
          {language === 'EN' ? '🇬🇧 EN' : language === 'FR' ? '🇫🇷 FR' : '🇺🇦 UA'}
        </button>

        <button
          onClick={() => toggleDarkMode(!isDarkMode)}
          aria-label="Toggle dark mode"
          className="p-1 sm:p-2 rounded-full border border-gray-300 hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-600 transition text-xs sm:text-sm md:text-base lg:text-lg"
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      {/* Backdrop for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          aria-hidden="true"
          onClick={closeMenu}
          role="presentation"
        />
      )}

      {/* Mobile drawer */}
      <nav
        className={`${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} fixed top-0 left-0 h-full w-1/2 sm:w-1/3 bg-white dark:bg-black shadow-lg z-50 transition-transform duration-300 ease-in-out lg:hidden`}
        aria-label="Mobile menu"
      >
        <button
          onClick={closeMenu}
          aria-label="Close menu"
          className="absolute top-4 right-4 text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 hover:text-gray-500"
        >
          <FaTimes />
        </button>

        {/* Controls */}
        <div className="flex items-center justify-start space-x-4 px-6 py-4 border-b border-gray-300 dark:border-gray-600">
          <button
            onClick={toggleLanguage}
            aria-label={`Switch language (current: ${language})`}
            className="p-1 sm:p-2 rounded-full border border-gray-300 hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-600 transition text-xs sm:text-sm md:text-base lg:text-lg"
          >
            {language === 'EN' ? '🇬🇧 EN' : language === 'FR' ? '🇫🇷 FR' : '🇺🇦 UA'}
          </button>

          <button
            onClick={() => toggleDarkMode(!isDarkMode)}
            aria-label="Toggle dark mode"
            className="p-1 sm:p-2 rounded-full border border-gray-300 hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-600 transition text-xs sm:text-sm md:text-base lg:text-lg"
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        {/* Menu list */}
        <ul className="flex flex-col items-start space-y-4 p-6 text-xs sm:text-sm md:text-base lg:text-lg" role="menubar">
          <li role="none">
            <Link href="/" role="menuitem" aria-label={`Go to ${menuItems[0]} page`}>
              {menuItems[0]}
            </Link>
          </li>

          {/* Catalog with categories (mobile) */}
          <li role="none" className="w-full">
            <button
              onClick={() => setIsCategoriesOpen(prev => !prev)}
              className="flex items-center justify-between w-full text-left"
              role="button"
              aria-haspopup="true"
              aria-expanded={isCategoriesOpen}
              aria-label="Toggle categories list"
            >
              {menuItems[1]}
              <FaChevronDown className={`ml-2 transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
            </button>

            {isCategoriesOpen && (
              <ul role="menu" aria-label="Categories" className="mt-2 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md p-2">
                {categories.map(category => (
                  <li key={category.path} role="none">
                    <button
                      onClick={() => handleCategoryClick(category.path)}
                      role="menuitem"
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md"
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li role="none">
            <Link href="/#about" role="menuitem" aria-label={`Learn more: ${menuItems[2]}`}>
              {menuItems[2]}
            </Link>
          </li>
          <li role="none">
            <Link href="/love-story" role="menuitem" aria-label={`Go to ${menuItems[3]} page`}>
              {menuItems[3]}
            </Link>
          </li>
          <li role="none">
            <Link href="/Conditions" role="menuitem" aria-label={`View ${menuItems[4]}`}>
              {menuItems[4]}
            </Link>
          </li>
          <li role="none">
            <Link href="/contact" role="menuitem" aria-label={`Go to ${menuItems[5]} page`}>
              {menuItems[5]}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
