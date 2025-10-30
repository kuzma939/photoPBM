
'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import ThumbnailCarousel from "../../components/ThumbnailCarousel/ThumbnailCarousel";
import { useLanguage } from "../../Functions/useLanguage";

const FottoLove = ({
  selectedProduct,
  onClose,
}) => {
  const { language } = useLanguage();
  const [currentImage, setCurrentImage] = useState(selectedProduct?.image || "/4.jpg");

  const translatedName =
    selectedProduct?.translations?.[language]?.name || selectedProduct?.name;

  const isVideo = (media) => typeof media === "object" && media?.type === "video";
  const getSrc = (media) => (typeof media === "string" ? media : media.src);
  const getPoster = (media) =>
    typeof media === "object" && media.poster ? media.poster : "/default-poster.jpg";

  useEffect(() => {
    setCurrentImage(selectedProduct?.image || "/4.jpg");
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
      <div className="relative w-full h-full max-w-5xl bg-gray-300 dark:bg-black rounded-lg shadow-lg overflow-y-auto p-4">
      
        <button
          className="absolute top-4 right-4 text-5xl text-black dark:text-white hover:text-red-500 transition z-[200]"
          onClick={onClose}
        >
          &times;
        </button>

       
        <div className="w-full max-w-4xl mx-auto">
          {isVideo(currentImage) ? (
            <video
              src={getSrc(currentImage)}
              poster={getPoster(currentImage)}
              controls
              className="rounded-lg w-full max-h-[700px] object-contain"
            />
          ) : (
            <Image
              src={getSrc(currentImage)}
              alt={translatedName}
              width={1200}
              height={1600}
              className="rounded-lg w-full max-h-[700px] object-contain"
            />
          )}

         
          <div className="mt-6">
            <ThumbnailCarousel
              images={selectedProduct.images}
              onImageSelect={(image) => setCurrentImage(image)}
              visibleThumbnails={5}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FottoLove;
