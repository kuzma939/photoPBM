'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "../../Functions/useLanguage";

const ProductBanner = ({
  selectedProduct,
  onClose,
}) => {
  const { language } = useLanguage();
  const images = selectedProduct?.images || [selectedProduct?.image || "/4.jpg"];

  const [currentIndex, setCurrentIndex] = useState(0);

  const currentMedia = images[currentIndex];

  const isVideo = (media) => typeof media === "object" && media?.type === "video";
  const getSrc = (media) => (typeof media === "string" ? media : media.src);
  const getPoster = (media) =>
    typeof media === "object" && media.poster ? media.poster : "/default-poster.jpg";

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const goNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
      <div className="relative w-full h-full max-w-5xl bg-gray-300 dark:bg-black rounded-lg shadow-lg overflow-hidden p-4">
        {/* Закрити */}
        <button
          className="absolute top-4 right-4 text-5xl text-black dark:text-white hover:text-red-500 transition z-[200]"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Головне фото/відео */}
        <div className="w-full h-full flex items-center justify-center relative">
          {/* ← Кнопка */}
          {images.length > 1 && (
            <button
              onClick={goPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full z-20 hover:bg-opacity-70"
            >
              &larr;
            </button>
          )}

          {/* Фото або відео */}
          <div className="w-screen h-screen flex justify-center items-center bg-weith">
  {isVideo(currentMedia) ? (
    <video
      src={getSrc(currentMedia)}
      poster={getPoster(currentMedia)}
      controls
      className="w-full h-full object-contain"
    />
  ) : (
    <Image
      src={getSrc(currentMedia)}
      alt="Product"
      fill // ❗️цей проп робить зображення повністю заповненим
      className="object-contain"
      priority
    />
  )}
</div>


          {/* → Кнопка */}
          {images.length > 1 && (
            <button
              onClick={goNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full z-20 hover:bg-opacity-70"
            >
              &rarr;
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductBanner;
