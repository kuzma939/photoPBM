
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
          "prose dark:prose-invert prose-p:my-3 prose-li:my-1 max-w-none text-[15px]/7 sm:text-[16px]/8",
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
        <div className="flex pt-3">
          <button
            onClick={() => setOpen((v) => !v)}
            className="ml-auto inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium
                       bg-white/60 backdrop-blur border-black/10 hover:bg-white dark:bg-white/5
                       dark:hover:bg-white/10 dark:border-white/10 transition"
          >
            {open ? "Згорнути" : "Читати більше"}
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

// Повноширинна панель дій
function ActionsToolbar({ onPrev, onNext, onBack, onLike, liked, count, onShare, copied }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl border border-black/10 bg-white/70 p-4 shadow-[0_20px_80px_rgba(16,24,40,0.16)]
                 backdrop-blur dark:bg-white/10 dark:border-white/10"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={onPrev}
            className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-semibold hover:bg-white transition
                       dark:bg-white/10 dark:hover:bg-white/15 dark:border-white/10"
          >
            ← Previous
          </button>
          <button
            onClick={onNext}
            className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-semibold hover:bg-white transition
                       dark:bg-white/10 dark:hover:bg-white/15 dark:border-white/10"
          >
            Next →
          </button>
          <button
            onClick={onBack}
            className="rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 transition
                       dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white"
          >
            ← Back to Gallery
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <LikeButton liked={liked} count={count} onToggle={onLike} />
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={onShare}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-600 to-indigo-600
                       px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition"
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

  return (
    <main className="relative min-h-screen overflow-x-hidden px-4 py-10 text-black dark:text-white">
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

      {/* Заголовок */}
      <motion.header
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-4 max-w-5xl text-center"
      >
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight drop-shadow-[0_10px_30px_rgba(199,70,255,0.15)]">
          <span className="bg-gradient-to-r from-rose-600 via-fuchsia-600 to-indigo-600 bg-clip-text text-transparent">
            Love Story
          </span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-gray-700/90 dark:text-gray-300/90">
          Explore our couples’ romantic journeys captured across Europe — intimate moments, timeless frames, and living emotions.
        </p>
      </motion.header>

      {/* Прогрес-бар скролу */}
      <motion.div
        style={{ scaleX }}
        className="origin-left mx-auto mb-6 h-1 max-w-6xl rounded-full bg-gradient-to-r from-rose-500 via-fuchsia-600 to-indigo-600"
      />

      {/* Сітка карток (коли не вибрано продукт) */}
      <AnimatePresence mode="popLayout">
        {!selectedProduct && (
          <motion.section
            key="grid"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.4 }}
            className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {gridItems.map((product, idx) => (
              <motion.article
                key={product.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.45, delay: idx * 0.04 }}
                className="group relative cursor-pointer overflow-hidden rounded-3xl border border-black/10 bg-white/70
                           shadow-[0_10px_40px_rgba(16,24,40,0.10)] backdrop-blur
                           hover:shadow-[0_25px_80px_rgba(16,24,40,0.18)] hover:bg-white transition
                           dark:bg-white/10 dark:hover:bg-white/15 dark:border-white/10"
                onClick={() => handleSelectProduct(product._i)}
              >
                <div
  className="relative aspect-[4/5] overflow-hidden"
  role="button"
  aria-label={product._name}
>
  <Image
    src={product.image}
    alt={product._name}
    fill
    className="object-cover transition-transform duration-500 group-hover:scale-[1.07]"
    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
    priority={idx < 4}
  />

  {/* Center hint on hover */}
  <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 
                  transition duration-300 group-hover:bg-black/35 group-hover:opacity-100">
    <motion.div
      initial={{ y: 8, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      className="rounded-full px-4 py-2 text-sm font-semibold text-white/95 
                 ring-1 ring-white/40 backdrop-blur-md bg-white/10"
    >
      Click to view details
    </motion.div>
  </div>

  {/* Bottom info on hover */}
  <div className="absolute inset-x-0 bottom-0 p-4 pointer-events-none">
    <div className="rounded-xl bg-gradient-to-t from-black/70 to-transparent p-4 text-white 
                    opacity-0 translate-y-2 transition duration-300 group-hover:opacity-100 group-hover:translate-y-0">
      <div className="text-sm/5 opacity-90">{product.location}</div>
      <div className="text-lg font-semibold">{product._name}</div>
    </div>
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
    className="mx-auto mt-2 grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-12"
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
         
    {/* Ім'я + локація по центру */}
    <div className="lg:col-span-12 text-center">
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
        {selectedProduct.translations?.[language]?.name || selectedProduct.title}
      </h2>
      <p className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-300 italic">
        📍 {selectedProduct.location}
      </p>
    </div>

   
            {/* Фото з лайtбоксом (ліворуч) */}
            <div className="lg:col-span-7">
              <motion.div
                layout
                transition={spring}
                whileHover={{ scale: 1.01 }}
                className="relative sticky top-6 rounded-3xl border border-black/10 bg-white/70 p-2
                           shadow-[0_25px_120px_rgba(16,24,40,0.18)] backdrop-blur
                           dark:bg-white/10 dark:border-white/10"
              >
                {/* «подиум» підсвітка внизу картки */}
                <div className="absolute inset-x-6 -bottom-6 h-12 blur-2xl rounded-full bg-black/10 opacity-20 pointer-events-none" />

                <motion.div
                  initial={{ opacity: 0, y: 12, clipPath: "inset(8% 8% 8% 8% round 24px)" }}
                  animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0% round 24px)" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden rounded-2xl"
                >
                  {typeof selectedImage === "string" ? (
                    <Image
                      src={selectedImage}
                      alt={
                        selectedProduct.translations?.[language]?.name ||
                        selectedProduct.title || "Love photo"
                      }
                      width={1600}
                      height={1600}
                      className="h-full w-full object-cover cursor-zoom-in"
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

            {/* Праворуч — лише опис */}
            <div className="lg:col-span-5">
              <div className="max-w-prose mx-auto lg:mx-0">
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

      {/* Зум-лайтбокс */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            <motion.img
              src={typeof selectedImage === "string" ? selectedImage : selectedImage?.src}
              alt="zoom"
              initial={{ scale: 0.96 }} animate={{ scale: 1 }} exit={{ scale: 0.96 }}
              className="max-h-[90vh] max-w-[92vw] rounded-xl shadow-2xl cursor-zoom-out"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
