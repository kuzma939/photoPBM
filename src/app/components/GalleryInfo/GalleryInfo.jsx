"use client";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import photoTypes from "../../data/photoTypes";
import { useLanguage } from "../../Functions/useLanguage";

export default function GalleryInfo() {
  const { translateList, language } = useLanguage();
  const menuItems = translateList("home", "top_products");

  const searchParams = useSearchParams();
  
const typesWithAll = [
  { type: "All", label: { EN: "All", ES: "Todo", FR: "Tous" } },
  ...photoTypes
];


  //const initialType = searchParams.get("type") || photoTypes[0].type;
const initialType = searchParams.get("type") || "All";

  const [selectedType, setSelectedType] = useState(initialType);
  const [modalIndex, setModalIndex] = useState(null);
  const [currentImages, setCurrentImages] = useState([]);
  const descriptionRef = useRef(null);
  const banners = [
  "/Gothic/2Q2A0672.avif",
  "/Gothic/2Q2A0387.avif",
  "/Gothic/2Q2A0974.avif",
  "/4.avif",
  "/5.avif",
  "/6.avif",
  
];
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
  }, 5000); // кожні 5 секунд

  return () => clearInterval(interval);
}, []);


useEffect(() => {
  if (selectedType === "All") {
    // зібрати всі зображення з усіх типів
    const allImages = photoTypes.flatMap((item) => item.images || []);
    setCurrentImages(allImages);
  } else {
    const category = photoTypes.find((item) => item.type === selectedType);
    setCurrentImages(category?.images || []);
  }
}, [selectedType]);

  const openModal = (index) => {
    setModalIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalIndex(null);
    document.body.style.overflow = "auto";
  };

  const goNext = () => {
    setModalIndex((prev) => (prev + 1) % currentImages.length);
  };

  const goPrev = () => {
    setModalIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  };

  return (
    <>
      <div className="dark:bg-gray-800 bg-gray-100 text-black dark:text-white min-h-screen px-4 pb-12">

        {/* 🔹 Банер */}
        <div className="relative w-full h-[300px] sm:h-[450px] mb-8 overflow-hidden rounded-lg">
  {/* фон з fade transition */}
  {banners.map((src, index) => (
    <Image
      key={index}
      src={src}
      alt={`Professional photography Barcelona - Love story and couple photoshoot portfolio banner ${index + 1}`}
      fill
       className={`absolute object-cover transition-opacity duration-1000 ease-in-out ${
      index === currentBannerIndex
        ? "opacity-100 animate-slow-zoom z-10"
        : "opacity-0"
    }`}
    priority={index === 0}
     
    />
  ))}

  {/* затемнення + текст */}
<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
  <h1 className="text-3xl sm:text-5xl font-extrabold text-white drop-shadow-2xl tracking-tight">
    {language === "EN" ? "Gallery" : language === "ES" ? "Galería" : language === "FR" ? "Galerie" : "Gallery"}
  </h1>
</div>

</div>

        {/* 🔘 Кнопки типів */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
  {typesWithAll.map((item) => (
    <button
      key={item.type}
      onClick={() => setSelectedType(item.type)}
      className={`px-5 py-3 rounded-full border-2 font-bold text-base transition-all duration-500 ${
        selectedType === item.type
          ? "bg-gradient-to-r from-rose-700 via-pink-600 to-purple-700 text-white scale-105 border-pink-600 shadow-[0_0_20px_rgba(219,39,119,0.6)]"
          : "bg-white dark:bg-gray-700 text-black dark:text-white hover:bg-gradient-to-r hover:from-rose-700 hover:via-pink-600 hover:to-purple-700 hover:text-white hover:border-pink-600 border-gray-400 dark:border-gray-500"
      }`}
    >
      {item.label?.[language] || item.type}
    </button>
  ))}
</div>


        {/* 🖼️ Фото */}
        <div
          ref={descriptionRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4"
        >
          {currentImages.map((src, i) => (
            <div
              key={i}
              className="rounded shadow overflow-hidden cursor-pointer transform transition duration-500 hover:scale-105 hover:opacity-90"
              onClick={() => openModal(i)}
            >
              <Image
                src={src}
                alt={`Professional ${selectedType !== "All" ? selectedType.toLowerCase() : "photography"} Barcelona - Portfolio ${i + 1}`}
                width={300}
                height={400}
                className="object-cover w-full h-[400px] transition-opacity duration-700 opacity-0 animate-fade-in"
                onLoadingComplete={(img) => img.classList.remove("opacity-0")}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 🪟 Модальне вікно */}
      {modalIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <button
            className="absolute top-4 right-4 text-5xl font-bold text-white hover:text-transparent hover:bg-gradient-to-r hover:from-rose-700 hover:via-pink-600 hover:to-purple-700 hover:bg-clip-text transition-all duration-500 hover:drop-shadow-[0_0_20px_rgba(219,39,119,0.9)] hover:scale-125"
            onClick={closeModal}
            aria-label="Close modal"
          >
            &times;
          </button>
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-5xl font-bold hover:text-transparent hover:bg-gradient-to-r hover:from-rose-700 hover:via-pink-600 hover:to-purple-700 hover:bg-clip-text transition-all duration-500 hover:drop-shadow-[0_0_20px_rgba(219,39,119,0.9)] hover:scale-150"
            onClick={goPrev}
            aria-label="Previous"
          >
            &#10094;
          </button>
          <Image
            src={currentImages[modalIndex]}
            alt={`Professional ${selectedType !== "All" ? selectedType.toLowerCase() : "photography"} Barcelona - Full size portfolio ${modalIndex + 1}`}
            width={1000}
            height={800}
            className="max-w-full max-h-[90vh] object-contain"
          />
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-5xl font-bold hover:text-transparent hover:bg-gradient-to-r hover:from-rose-700 hover:via-pink-600 hover:to-purple-700 hover:bg-clip-text transition-all duration-500 hover:drop-shadow-[0_0_20px_rgba(219,39,119,0.9)] hover:scale-150"
            onClick={goNext}
            aria-label="Next"
          >
            &#10095;
          </button>
        </div>
      )}
    </>
  );
}
