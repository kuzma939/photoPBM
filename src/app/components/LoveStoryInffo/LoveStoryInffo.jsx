
"use client";

import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useLanguage } from "../../Functions/useLanguage";
import products from "../../data/products";
import ThumbnailCarousel from "../ThumbnailCarousel/ThumbnailCarousel";

/* ───────────────────────── Helpers ───────────────────────── */

const spring = { type: "spring", stiffness: 260, damping: 24 };

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

// ReadMore: плавне розгортання довгих текстів
function ReadMore({ text, collapsedLines = 10 }) {
  const [open, setOpen] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const check = () => setIsOverflowing(el.scrollHeight > el.clientHeight + 4);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [text]);

  return (
    <div className="relative">
      <motion.div
        layout
        transition={spring}
        className={cx(
          "max-w-none text-base sm:text-lg md:text-xl leading-relaxed font-semibold",
          "text-gray-900 dark:text-gray-100",
          !open && "overflow-hidden"
        )}
        style={{ maxHeight: open ? undefined : `calc(${collapsedLines} * 1.75rem)` }}
        ref={ref}
      >
        <p className="whitespace-pre-line">{text}</p>
      </motion.div>

      {!open && isOverflowing && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/95 via-white/70 to-transparent dark:from-gray-900/95 dark:via-gray-900/70" />
      )}

      {isOverflowing && (
        <div className="flex pt-4">
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white
                       bg-gradient-to-r from-rose-700 via-pink-600 to-purple-700
                       hover:shadow-[0_0_24px_rgba(219,39,119,0.5)] hover:scale-105 active:scale-100
                       border-2 border-transparent hover:border-pink-400/50
                       transition-all duration-500"
          >
            {open ? "Read less" : "Read more"}
          </button>
        </div>
      )}
    </div>
  );
}

function LikeButton({ liked, count, onToggle }) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      animate={liked ? { scale: [1, 1.15, 1], rotate: [0, -8, 0] } : {}}
      transition={{ duration: 0.35 }}
      onClick={onToggle}
      className={cx(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition",
        liked
          ? "bg-rose-600 text-white hover:bg-rose-500"
          : "bg-white/70 text-gray-800 hover:bg-white backdrop-blur border border-black/10 dark:bg-white/10 dark:text-white dark:border-white/10 dark:hover:bg-white/15"
      )}
    >
      <span aria-hidden>❤️</span>
      {liked ? "Liked" : "Like"} <span className="opacity-80">({count})</span>
    </motion.button>
  );
}

// Story navigation & actions
function ActionsToolbar({ onPrev, onNext, onBack, onLike, liked, count, onShare, copied }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl border border-black/8 bg-white/80 p-4 shadow-[0_12px_48px_rgba(16,24,40,0.1)]
                 backdrop-blur dark:bg-white/10 dark:border-white/10"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={onPrev}
            className="rounded-full border border-pink-600/20 bg-white/70 px-4 py-2 text-sm font-semibold hover:bg-gradient-to-r hover:from-rose-700 hover:via-pink-600 hover:to-purple-700 hover:text-white hover:border-pink-600 active:bg-gradient-to-r active:from-rose-700 active:via-pink-600 active:to-purple-700 active:text-white active:border-pink-600 transition-all duration-500
                       dark:bg-white/10 dark:hover:bg-gradient-to-r dark:hover:from-rose-700 dark:hover:via-pink-600 dark:hover:to-purple-700 dark:active:bg-gradient-to-r dark:active:from-rose-700 dark:active:via-pink-600 dark:active:to-purple-700 dark:border-white/10"
          >
            ← Previous
          </button>
          <button
            onClick={onNext}
            className="rounded-full border border-pink-600/20 bg-white/70 px-4 py-2 text-sm font-semibold hover:bg-gradient-to-r hover:from-rose-700 hover:via-pink-600 hover:to-purple-700 hover:text-white hover:border-pink-600 active:bg-gradient-to-r active:from-rose-700 active:via-pink-600 active:to-purple-700 active:text-white active:border-pink-600 transition-all duration-500
                       dark:bg-white/10 dark:hover:bg-gradient-to-r dark:hover:from-rose-700 dark:hover:via-pink-600 dark:hover:to-purple-700 dark:active:bg-gradient-to-r dark:active:from-rose-700 dark:active:via-pink-600 dark:active:to-purple-700 dark:border-white/10"
          >
            Next →
          </button>
          <button
            onClick={onBack}
            className="rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gradient-to-r hover:from-rose-700 hover:via-pink-600 hover:to-purple-700 hover:shadow-[0_0_40px_rgba(219,39,119,0.9)] active:bg-gradient-to-r active:from-rose-700 active:via-pink-600 active:to-purple-700 active:shadow-[0_0_40px_rgba(219,39,119,0.9)] transition-all duration-500
                       dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gradient-to-r dark:hover:from-rose-700 dark:hover:via-pink-600 dark:hover:to-purple-700 dark:hover:text-white dark:active:bg-gradient-to-r dark:active:from-rose-700 dark:active:via-pink-600 dark:active:to-purple-700 dark:active:text-white"
          >
            ← Back to Gallery
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <LikeButton liked={liked} count={count} onToggle={onLike} />
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={onShare}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-700 via-pink-600 to-purple-700
                       px-4 py-2 text-sm font-semibold text-white hover:shadow-[0_0_40px_rgba(219,39,119,0.9)] active:shadow-[0_0_40px_rgba(219,39,119,0.9)] transition-all duration-500"
          >
            📤 {copied ? "Link Copied!" : "Share"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

/* ───────────────────────── Main Component ───────────────────────── */

export default function LoveStoryInffo() {
  const { language } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [likesMap, setLikesMap] = useState({});
  const [copied, setCopied] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const selectedProduct = selectedIndex !== null ? products[selectedIndex] : null;
const selId = selectedProduct?.id ?? null;
  // прогрес-бар
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.2 });

  // URL init
  useEffect(() => {
    const idFromUrl = searchParams.get("id");
    if (idFromUrl) {
      const index = products.findIndex((p) => String(p.id) === idFromUrl);
      if (index !== -1) {
        setSelectedIndex(index);
        setSelectedImage(products[index].image);
      }
    }
  }, [searchParams]);

  // Likes init
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("likesMap");
    if (saved) setLikesMap(JSON.parse(saved));
  }, []);

  // Клавіші
  useEffect(() => {
    if (selectedIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (lightboxOpen) setLightboxOpen(false);
        else handleClose();
      }
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedIndex, lightboxOpen]); // eslint-disable-line

  // Прелоад наступного/попереднього кадру
  useEffect(() => {
    if (selectedIndex == null) return;
    const next = products[(selectedIndex + 1) % products.length];
    const prev = products[(selectedIndex - 1 + products.length) % products.length];
    [next?.image, prev?.image].forEach((src) => {
      if (typeof src === "string") {
        const i = new window.Image();
        i.src = src;
      }
    });
  }, [selectedIndex]);

  const handleSelectProduct = useCallback(
    (index) => {
      const product = products[index];
      setSelectedIndex(index);
      setSelectedImage(product.image);
      router.replace(`?id=${product.id}`);
    },
    [router]
  );

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
    setSelectedImage(null);
    router.replace("/love-story");
    setCopied(false);
  }, [router]);

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    const nextIndex = (selectedIndex + 1) % products.length;
    handleSelectProduct(nextIndex);
  }, [selectedIndex, handleSelectProduct]);

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    const prevIndex = (selectedIndex - 1 + products.length) % products.length;
    handleSelectProduct(prevIndex);
  }, [selectedIndex, handleSelectProduct]);

  const handleLikeToggle = useCallback((id) => {
    setLikesMap((prev) => {
      const current = prev[id] || { count: 0, liked: false };
      const updated = {
        ...prev,
        [id]: {
          count: current.liked ? Math.max(0, current.count - 1) : current.count + 1,
          liked: !current.liked,
        },
      };
      if (typeof window !== "undefined") {
        localStorage.setItem("likesMap", JSON.stringify(updated));
      }
      return updated;
    });
  }, []);

  const handleShare = useCallback(async () => {
    if (!selectedProduct) return;
    const url = `${window.location.origin}/love-story?id=${selectedProduct.id}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title:
            selectedProduct.translations?.[language]?.name ||
            selectedProduct.title ||
            "Love Story",
          text: "Подивись цю історію 💞",
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }
    } catch {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  }, [language, selectedProduct]);

  const gridItems = useMemo(
    () =>
      products.map((p, i) => ({
        ...p,
        _name: p.translations?.[language]?.name || p.title,
        _desc: p.translations?.[language]?.description || p.description,
        _i: i,
      })),
    [language]
  );

  const tags = selectedProduct?.tags || ["Barcelona", "Candid", "Evening Light"];

  // Gallery within current story: list of images and prev/next
  const storyImages = useMemo(
    () => (selectedProduct ? [selectedProduct.image, ...(selectedProduct.images || [])] : []),
    [selectedProduct]
  );
  const currentImageIndex = selectedProduct && selectedImage != null
    ? storyImages.findIndex((img) => img === selectedImage || (typeof img === "string" && typeof selectedImage === "string" && img === selectedImage) || (img?.src && selectedImage?.src && img.src === selectedImage.src))
    : -1;
  const hasMultipleImages = storyImages.length > 1;
  const handlePrevImage = useCallback(() => {
    if (!hasMultipleImages || currentImageIndex <= 0) return;
    setSelectedImage(storyImages[currentImageIndex - 1]);
  }, [hasMultipleImages, currentImageIndex, storyImages]);
  const handleNextImage = useCallback(() => {
    if (!hasMultipleImages) return;
    const next = (currentImageIndex + 1) % storyImages.length;
    setSelectedImage(storyImages[next]);
  }, [hasMultipleImages, currentImageIndex, storyImages]);

  return (
    <main className="relative min-h-screen overflow-x-hidden px-4 sm:px-6 py-8 sm:py-12 text-black dark:text-white">
      {/* анімований фон */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_-10%,#ffe6f1_0%,transparent_60%),radial-gradient(1000px_600px_at_80%_0%,#e7f1ff_0%,transparent_55%),linear-gradient(180deg,#fff5ea, #f3efe7_35%,#efe7dc_100%)]
                        dark:bg-[radial-gradient(1200px_600px_at_20%_-10%,#3b0a2a_0%,transparent_60%),radial-gradient(1000px_600px_at_80%_0%,#0b1a35_0%,transparent_55%),linear-gradient(180deg,#0b0b10,#0b0b13_35%,#0f1115_100%)]" />
        <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay bg-[url('/noise.png')]" />
      </motion.div>

      {/* Hero header */}
      <motion.header
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-10 sm:mb-14 max-w-4xl text-center px-4"
      >
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-rose-600/90 dark:text-rose-400/90 mb-3">
          Barcelona · Love Stories
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-rose-700 via-pink-600 to-purple-700 bg-clip-text text-transparent drop-shadow-[0_4px_20px_rgba(219,39,119,0.25)]">
            Love Story Photography
          </span>
        </h1>
        <div className="mt-4 h-px w-16 mx-auto bg-gradient-to-r from-transparent via-pink-500/60 to-transparent" aria-hidden />
        <p className="text-sm sm:text-base font-medium text-gray-600 dark:text-gray-400 mt-4">
          📍 Barcelona, Spain
        </p>
        <p className="mt-3 text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Romantic sessions at Barcelona&apos;s most iconic spots — Gothic Quarter, Sagrada Família, Barceloneta Beach, Park Güell. Intimate moments, timeless memories. 💕
        </p>
      </motion.header>

      {/* Scroll progress */}
      <motion.div
        style={{ scaleX }}
        className="origin-left mx-auto mb-8 sm:mb-10 h-1.5 max-w-6xl rounded-full bg-gradient-to-r from-rose-700 via-pink-600 to-purple-700 shadow-[0_0_12px_rgba(219,39,119,0.3)]"
      />

      {/* Story cards grid */}
      <AnimatePresence mode="popLayout">
        {!selectedProduct && (
          <motion.section
            key="grid"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.4 }}
            className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 px-4"
          >
            {gridItems.map((product, idx) => (
              <motion.article
                key={product.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.45, delay: idx * 0.04 }}
                className="group relative cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl border border-black/8 bg-white/80
                           shadow-[0_8px_32px_rgba(16,24,40,0.08)] backdrop-blur
                           hover:shadow-[0_24px_64px_rgba(219,39,119,0.12)] hover:border-pink-400/20
                           hover:bg-white transition-all duration-500 ease-out
                           dark:bg-white/10 dark:border-white/10 dark:hover:bg-white/15 dark:hover:border-pink-500/20"
                onClick={() => handleSelectProduct(product._i)}
              >
                {/* Location badge — always visible */}
                <div className="absolute top-4 left-4 z-10 rounded-full bg-black/50 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-white/95">
                  📍 {product.location}
                </div>

                <div
                  className="relative aspect-[4/5] overflow-hidden"
                  role="button"
                  aria-label={product._name}
                >
                  <Image
                    src={product.image}
                    alt={`${product._name} - Love story photography ${product.location} Barcelona`}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    priority={idx < 4}
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition duration-300 group-hover:bg-black/30 group-hover:opacity-100">
                    <motion.span
                      initial={{ y: 6, opacity: 0 }}
                      className="rounded-full bg-white/95 dark:bg-gray-900/95 px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-lg"
                    >
                      View story →
                    </motion.span>
                  </div>

                  {/* Bottom: couple name */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent p-5 pt-12">
                    <p className="text-lg font-bold text-white drop-shadow-sm">{product._name}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.section>
        )}
      </AnimatePresence>
  

      {/* Детальна сторінка */}
      <AnimatePresence>
        
          
  
        {selectedProduct && (
  <motion.section
    key="detail"
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 16 }}
    transition={{ duration: 0.35 }}
    className="mx-auto mt-6 grid max-w-6xl grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-12"
  >
      {/* Sticky панель ДІЙ — ТЕПЕР В СЕКЦІЇ */}
    <div className="lg:col-span-12">
      <div className="sticky top-[88px] z-30">
        <ActionsToolbar
          onPrev={handlePrev}
          onNext={handleNext}
          onBack={handleClose}
          onLike={
            selectedProduct?.id
              ? () => handleLikeToggle(selectedProduct.id)
              : undefined
          }
          liked={selectedProduct?.id ? !!likesMap[selectedProduct.id]?.liked : false}
          count={selectedProduct?.id ? (likesMap[selectedProduct.id]?.count || 0) : 0}
          onShare={handleShare}
          copied={copied}
        />
      </div>
    </div>
         
    {/* Story title + location */}
    <div className="lg:col-span-12 text-center px-2">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-rose-800 via-pink-600 to-purple-800 dark:from-rose-200 dark:via-pink-300 dark:to-purple-200 bg-clip-text text-transparent">
        {selectedProduct.translations?.[language]?.name || selectedProduct.title}
      </h2>
      <div className="mt-3 h-px w-12 mx-auto bg-gradient-to-r from-transparent via-pink-400/70 to-transparent" aria-hidden />
      <p className="mt-3 text-sm sm:text-base font-semibold text-gray-600 dark:text-gray-400 flex items-center justify-center gap-1.5">
        <span aria-hidden>📍</span> {selectedProduct.location}
      </p>
    </div>

   
            {/* Фото з лайtбоксом (ліворуч) — обмежена висота для кращого балансу з текстом */}
            <div className="lg:col-span-7 lg:flex lg:items-start">
              <motion.div
                layout
                transition={spring}
                whileHover={{ scale: 1.01 }}
                className="sticky top-6 w-full rounded-3xl border border-black/10 bg-white/70 p-2
                           shadow-[0_25px_120px_rgba(16,24,40,0.18)] backdrop-blur
                           dark:bg-white/10 dark:border-white/10"
              >
                {/* «подиум» підсвітка внизу картки */}
                <div className="absolute inset-x-6 -bottom-6 h-12 blur-2xl rounded-full bg-black/10 opacity-20 pointer-events-none" />

                <motion.div
                  initial={{ opacity: 0, y: 12, clipPath: "inset(8% 8% 8% 8% round 24px)" }}
                  animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0% round 24px)" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative overflow-hidden rounded-2xl w-full h-[42vh] min-h-[280px] max-h-[420px] lg:h-[380px] lg:max-h-[420px]"
                >
                  {typeof selectedImage === "string" ? (
                    <Image
                      src={selectedImage}
                      alt={`${selectedProduct.translations?.[language]?.name || selectedProduct.title} - Love story photography ${selectedProduct.location} Barcelona`}
                      fill
                      className="object-cover cursor-zoom-in"
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      priority
                      onClick={() => setLightboxOpen(true)}
                    />
                  ) : (
                    <video
                      src={selectedImage?.src}
                      poster={selectedImage?.poster || "/default-poster.jpg"}
                      controls
                      className="h-full w-full rounded-2xl object-cover"
                    />
                  )}
                </motion.div>

                {/* м'який внутрішній край і карусель */}
                <div className="pt-3">
                  <div className="rounded-2xl ring-1 ring-black/5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)]">
                    <ThumbnailCarousel
                      images={[selectedProduct.image, ...(selectedProduct.images || [])]}
                      onImageSelect={(img) => setSelectedImage(img)}
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right column — story text, vertically centered */}
            <div className="lg:col-span-5 lg:flex lg:items-center">
              <div className="max-w-prose mx-auto lg:mx-0 w-full rounded-2xl border-l-4 border-rose-500/60 bg-gray-50/98 dark:bg-gray-800/95 dark:border-rose-400/50 pl-5 pr-4 py-5 shadow-[0_4px_24px_rgba(16,24,40,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
                <ReadMore
                  text={
                    selectedProduct.translations?.[language]?.description ||
                    selectedProduct.description ||
                    ""
                  }
                />
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Full-view lightbox with prev/next */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            <div
              className="relative flex items-center justify-center w-full h-full max-w-[92vw] max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={typeof selectedImage === "string" ? selectedImage : selectedImage?.src}
                src={typeof selectedImage === "string" ? selectedImage : selectedImage?.src}
                alt="Full size"
                initial={{ scale: 0.96, opacity: 0.9 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0.9 }}
                transition={{ duration: 0.2 }}
                className="max-h-[90vh] max-w-[85vw] rounded-xl shadow-2xl cursor-zoom-out object-contain"
              />

              {hasMultipleImages && (
                <>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 text-white text-5xl md:text-6xl font-extrabold drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] transition-all duration-500 hover:text-transparent hover:bg-gradient-to-r hover:from-rose-700 hover:via-pink-600 hover:to-purple-700 hover:bg-clip-text hover:drop-shadow-[0_0_24px_rgba(219,39,119,0.9)] hover:scale-125 active:scale-110"
                    aria-label="Previous image"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 text-white text-5xl md:text-6xl font-extrabold drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] transition-all duration-500 hover:text-transparent hover:bg-gradient-to-r hover:from-rose-700 hover:via-pink-600 hover:to-purple-700 hover:bg-clip-text hover:drop-shadow-[0_0_24px_rgba(219,39,119,0.9)] hover:scale-125 active:scale-110"
                    aria-label="Next image"
                  >
                    ›
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-white text-3xl md:text-4xl font-extrabold drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] transition-all duration-500 hover:text-transparent hover:bg-gradient-to-r hover:from-rose-700 hover:via-pink-600 hover:to-purple-700 hover:bg-clip-text hover:drop-shadow-[0_0_24px_rgba(219,39,119,0.9)] hover:scale-125 active:scale-110"
                aria-label="Close"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
